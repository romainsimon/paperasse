#!/usr/bin/env node

/**
 * Lecture stricte de factures électroniques au format CII (Factur-X / EN 16931)
 *
 * Extrait les données structurées d'une facture reçue au format CII et les
 * retourne dans le même format JSON qu'attend generate-facturx.js, avec en plus
 * le détail de la ventilation TVA (tax_breakdown).
 *
 * Contrat de sortie
 *   - Toute anomalie est une ERREUR BLOQUANTE : le script imprime la liste des
 *     erreurs et sort en code 1, sans émettre de facture.
 *   - Aucune valeur n'est inventée : ni null ni 0 de repli sur un champ
 *     obligatoire absent, illisible ou incohérent.
 *   - Code de sortie 0 = les contrôles ci-dessous sont passés. C'est la seule
 *     condition dans laquelle la sortie peut alimenter un import comptable.
 *
 * Contrôles effectués
 *   1. Profil : BT-24 doit commencer par « urn:cen.eu:en16931:2017 ». Les
 *      profils Factur-X MINIMUM et BASIC WL sont refusés : ils ne portent
 *      aucune ligne de facture (et, pour MINIMUM, pas de ventilation TVA).
 *   2. Champs obligatoires EN 16931 : BT-1, BT-2, BT-3, BT-5, BT-24, BT-27,
 *      BT-44, identité du vendeur (SIREN, SIRET ou n° de TVA), au moins une
 *      ligne, au moins une ventilation TVA, et pour chaque ligne BT-129,
 *      BT-146, BT-131, BT-153.
 *      BT-3 est restreint aux types que ce script sait classer (380, 381, 384,
 *      386, 389) : un code inconnu est refusé, jamais rangé en facture.
 *   3. Types : dates au format 102 (AAAAMMJJ) et existantes au calendrier ;
 *      montants au format décimal EN 16931 (point décimal, pas de texte).
 *   4. Rapprochement arithmétique, tolérance 1 centime : BR-CO-10, BR-CO-13,
 *      BR-CO-14, BR-CO-15, BR-CO-16, plus le contrôle du montant de TVA par
 *      catégorie (BR-S-09 pour la catégorie S, TVA nulle imposée par BR-E-09,
 *      BR-Z-09, BR-AE-09, BR-IC-09, BR-G-09 et BR-O-09 pour les autres) et la
 *      couverture de la base HT totale par les bases de la ventilation.
 *
 * Limites connues (assumées, jamais compensées par une valeur devinée)
 *   - Pas de validation XSD, pas de Schematron : aucune dépendance XML dans ce
 *     dépôt. Les contrôles sont ceux listés ci-dessus, pas la totalité des
 *     règles EN 16931 ; un document non conforme au schéma peut donc passer ces
 *     contrôles métier. Pour une conformité complète, passer par un validateur
 *     dédié ou par une plateforme agréée.
 *   - Les sous-lignes du profil EXTENDED (lignes imbriquées) ne sont pas lues :
 *     le découpage des lignes est alors faux et les rapprochements de totaux
 *     rejettent la facture (constaté sur un exemplaire réel).
 *   - Format UBL non supporté.
 *
 * Usage :
 *   node scripts/parse-einvoice.js --invoice output/F-2026-001.xml
 *   node scripts/parse-einvoice.js --invoice output/F-2026-001.xml --json
 *
 * Formats supportés :
 *   - XML CII (Cross-Industry Invoice, EN 16931 / Factur-X)
 *
 * Format UBL (réseau Peppol) : non supporté.
 *
 * Pour extraire le XML embarqué d'un Factur-X PDF, utilisez pdfdetach
 * (fourni par le paquet poppler-utils) :
 *   pdfdetach -savefile factur-x.xml votre-facture.pdf
 *   node scripts/parse-einvoice.js --invoice factur-x.xml
 *
 * Hypothèses du parseur :
 *   - Les noms d'éléments CII ne sont pas auto-imbriqués (ex : pas de
 *     <ram:SellerTradeParty> dans un <ram:SellerTradeParty>).
 *   - Le séparateur décimal est le point (.) — requis par la norme EN 16931.
 *   - Pour un usage en production sur des CII arbitraires, préférer un
 *     parseur XML dédié (ex : fast-xml-parser).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Helpers d'extraction XML
// Ciblés sur le schéma CII EN 16931 — pas un parseur XML générique.
// ---------------------------------------------------------------------------

// Les préfixes de namespace ne sont pas normatifs : un même élément s'écrit
// <rsm:ExchangedDocument> chez un émetteur et <ExchangedDocument> chez un autre
// qui déclare un namespace par défaut. Les deux formes sont acceptées.
function nsPattern(name) {
  const separator = name.indexOf(':');
  if (separator === -1) return name;
  return `(?:${name.slice(0, separator)}:)?${name.slice(separator + 1)}`;
}

// Contenu texte de la première occurrence d'un tag (avec ou sans attributs).
function tag(xml, name) {
  const n = nsPattern(name);
  const m = xml.match(new RegExp(`<${n}[^>]*>([^<]*)<\\/${n}>`));
  return m ? unescapeXml(m[1].trim()) : null;
}

// Contenu texte d'un tag portant un attribut précis (ex: schemeID="0002").
// Gère les guillemets simples et doubles.
function tagAttr(xml, name, attr, value) {
  const n = nsPattern(name);
  const re = new RegExp(`<${n}[^>]*${attr}=["']${value}["'][^>]*>([^<]*)<\\/${n}>`);
  const m = xml.match(re);
  return m ? unescapeXml(m[1].trim()) : null;
}

// Premier sous-bloc délimité par un tag (avec attributs éventuels).
// Suppose que le tag n'est pas auto-imbriqué (voir en-tête).
function block(xml, name) {
  const n = nsPattern(name);
  const re = new RegExp(`<${n}[\\s>][\\s\\S]*?<\\/${n}>`);
  const m = xml ? xml.match(re) : null;
  return m ? m[0] : null;
}

// Toutes les occurrences non-chevauchantes d'un bloc délimité par un tag.
function allBlocks(xml, name) {
  const blocks = [];
  const n = nsPattern(name);
  const re = new RegExp(`<${n}[\\s>][\\s\\S]*?<\\/${n}>`, 'g');
  let m;
  while ((m = re.exec(xml)) !== null) blocks.push(m[0]);
  return blocks;
}

// &amp; est décodé en DERNIER : sinon « &amp;lt; » donnerait « < » (double
// décodage) au lieu de « &lt; ».
function unescapeXml(str) {
  return str
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

// ---------------------------------------------------------------------------
// Lecture stricte des valeurs
//
// Chaque helper reçoit un descriptif de champ { id, label, required } et pousse
// une erreur dans `errors` plutôt que de fabriquer une valeur de repli.
// ---------------------------------------------------------------------------

function missing(field, errors) {
  if (field.required) {
    errors.push({ id: `${field.id}_MISSING`, message: `${field.label} : absent` });
  }
  return null;
}

// Texte obligatoire (ou optionnel si required n'est pas positionné).
function readText(value, field, errors) {
  if (value === null || value === undefined || value === '') return missing(field, errors);
  return value;
}

// Date CII au format 102 (AAAAMMJJ) vers ISO (AAAA-MM-JJ).
// Refuse toute autre longueur, tout caractère non numérique, et toute date
// inexistante au calendrier (ex : 20260231).
function parseDate102(raw, field, errors) {
  if (!raw) return missing(field, errors);
  if (!/^\d{8}$/.test(raw)) {
    errors.push({ id: `${field.id}_INVALID`, message: `${field.label} : format 102 (AAAAMMJJ) attendu, reçu « ${raw} »` });
    return null;
  }
  const year = Number(raw.slice(0, 4));
  const month = Number(raw.slice(4, 6));
  const day = Number(raw.slice(6, 8));
  const dt = new Date(Date.UTC(year, month - 1, day));
  if (dt.getUTCFullYear() !== year || dt.getUTCMonth() !== month - 1 || dt.getUTCDate() !== day) {
    errors.push({ id: `${field.id}_INVALID`, message: `${field.label} : date inexistante au calendrier (${raw})` });
    return null;
  }
  return `${raw.slice(0, 4)}-${raw.slice(4, 6)}-${raw.slice(6, 8)}`;
}

// Montant ou quantité en virgule fixe. EN 16931 impose le point décimal :
// « 12abc », « 1,5 » ou « 1e5 » sont des erreurs, pas des valeurs à corriger.
// Le signe est accepté car xs:decimal l'autorise.
function parseDecimal(raw, field, errors) {
  if (raw === null || raw === undefined || raw === '') return missing(field, errors);
  const value = String(raw).trim();
  if (!/^[-+]?\d+(\.\d+)?$/.test(value)) {
    errors.push({ id: `${field.id}_INVALID`, message: `${field.label} : valeur décimale invalide « ${raw} »` });
    return null;
  }
  return Number(value);
}

// ---------------------------------------------------------------------------
// Détection du format à partir de l'espace de noms XML
// ---------------------------------------------------------------------------

function detectFormat(xml) {
  if (xml.includes('CrossIndustryInvoice')) return 'cii';
  if (xml.includes('urn:oasis:names:specification:ubl:schema:xsd:Invoice')) return 'ubl';
  return null;
}

// ---------------------------------------------------------------------------
// Contrôle du profil (BT-24)
//
// Les profils EN 16931 portent l'identifiant CEN. Les profils Factur-X
// MINIMUM (urn:factur-x.eu:1p0:minimum) et BASIC WL (…:1p0:basicwl) ne le
// portent pas : ce sont des jeux de données comptables partiels, sans aucune
// ligne de facture, hors norme EN 16931.
// ---------------------------------------------------------------------------

const EN16931_PROFILE_PREFIX = 'urn:cen.eu:en16931:2017';

function checkProfile(xml, errors) {
  const context = block(xml, 'rsm:ExchangedDocumentContext') || '';
  const guideline = block(context, 'ram:GuidelineSpecifiedDocumentContextParameter') || '';
  const profileId = tag(guideline, 'ram:ID');

  if (!profileId) {
    errors.push({ id: 'BT-24_MISSING', message: 'Profil (BT-24) absent : conformité EN 16931 invérifiable' });
    return;
  }
  if (!profileId.startsWith(EN16931_PROFILE_PREFIX)) {
    errors.push({
      id: 'BT-24_PROFILE',
      message: `Profil non EN 16931 : « ${profileId} ». Les profils Factur-X MINIMUM et BASIC WL ne portent aucune ligne de facture : inexploitables pour une écriture comptable.`,
    });
  }
}

// ---------------------------------------------------------------------------
// Parsing CII — Cross-Industry Invoice (EN 16931 / Factur-X)
//
// Structure de référence :
//   rsm:CrossIndustryInvoice
//     rsm:ExchangedDocumentContext   → profil (BT-24)
//     rsm:ExchangedDocument          → numéro, type, date, notes
//     rsm:SupplyChainTradeTransaction
//       ram:IncludedSupplyChainTradeLineItem (N lignes)
//       ram:ApplicableHeaderTradeAgreement
//         ram:SellerTradeParty       → vendeur
//         ram:BuyerTradeParty        → acheteur
//       ram:ApplicableHeaderTradeDelivery
//       ram:ApplicableHeaderTradeSettlement
//         ram:InvoiceCurrencyCode
//         ram:ApplicableTradeTax     → ventilation TVA (N blocs, un par taux)
//         ram:SpecifiedTradePaymentTerms → échéance, conditions
//         ram:SpecifiedTradeSettlementHeaderMonetarySummation → totaux
//
// L'ordre des blocs n'est pas supposé : chaque bloc est cherché par son nom.
// ---------------------------------------------------------------------------

// N° TVA intracommunautaire : le tiers peut porter plusieurs
// SpecifiedTaxRegistration (VA, FC…) — chercher celui de schemeID « VA » dans
// tous les blocs, pas seulement dans le premier.
function findVatNumber(partyBlock) {
  for (const registration of allBlocks(partyBlock, 'ram:SpecifiedTaxRegistration')) {
    const vat = tagAttr(registration, 'ram:ID', 'schemeID', 'VA');
    if (vat) return vat;
  }
  return null;
}

// Types de document (BT-3, UNTDID 1001) que ce script sait classer pour une
// écriture. EN 16931 en autorise d'autres : ils sont refusés plutôt que
// devinés, un code inconnu ne doit pas devenir une facture ordinaire.
const SUPPORTED_TYPE_CODES = {
  380: 'invoice', // facture
  381: 'credit_note', // avoir
  384: 'invoice', // facture rectificative
  386: 'invoice', // facture d'acompte
  389: 'invoice', // facture auto-facturée
};

function parseDocument(xml, errors) {
  const exchangedDoc = block(xml, 'rsm:ExchangedDocument') || '';
  const number = readText(tag(exchangedDoc, 'ram:ID'), { id: 'BT-1', label: 'Numéro de facture (BT-1)', required: true }, errors);
  const typeCode = readText(tag(exchangedDoc, 'ram:TypeCode'), { id: 'BT-3', label: 'Type de document (BT-3)', required: true }, errors);
  // hasOwn plutôt qu'un accès direct : un TypeCode valant « constructor »
  // remonterait sinon une propriété héritée d'Object.
  const type = typeCode !== null && Object.hasOwn(SUPPORTED_TYPE_CODES, typeCode) ? SUPPORTED_TYPE_CODES[typeCode] : null;
  if (typeCode !== null && type === null) {
    errors.push({
      id: 'BT-3_UNSUPPORTED',
      message: `Type de document (BT-3) « ${typeCode} » non pris en charge : codes UNTDID 1001 acceptés ${Object.keys(SUPPORTED_TYPE_CODES).join(', ')}`,
    });
  }
  const date = parseDate102(tag(exchangedDoc, 'udt:DateTimeString'), { id: 'BT-2', label: "Date d'émission (BT-2)", required: true }, errors);

  // La catégorie d'opération (biens/services/mixte) est stockée dans une note
  // identifiée par SubjectCode AAK — obligation 2026, art. 242 nonies A CGI.
  let category = null;
  for (const noteXml of allBlocks(exchangedDoc, 'ram:IncludedNote')) {
    if (noteXml.includes('AAK')) {
      const content = tag(noteXml, 'ram:Content');
      if (content === 'Livraison de biens') category = 'goods';
      else if (content === 'Prestation de services') category = 'services';
      else if (content === 'Mixte') category = 'mixed';
    }
  }

  return { number, type, typeCode, date, category };
}

// Identifiant légal français porté par SpecifiedLegalOrganization/ID sous
// l'ICD 0002 (ISO 6523) : SIRET sur 14 chiffres, SIREN sur 9. L'identifiant est
// facultatif dans EN 16931, mais s'il est présent il doit être exploitable :
// une valeur tronquée ou alphanumérique est une erreur, pas une donnée à
// réinterpréter, et un SIREN n'est jamais restitué comme un SIRET.
function parseLegalId(partyBlock, field, errors) {
  const legalOrg = block(partyBlock, 'ram:SpecifiedLegalOrganization') || '';
  const rawId = tagAttr(legalOrg, 'ram:ID', 'schemeID', '0002');
  if (rawId === null) return { siret: null, siren: null };
  if (/^\d{14}$/.test(rawId)) return { siret: rawId, siren: rawId.slice(0, 9) };
  if (/^\d{9}$/.test(rawId)) return { siret: null, siren: rawId };

  errors.push({
    id: `${field.id}_INVALID`,
    message: `${field.label} : SIREN (9 chiffres) ou SIRET (14 chiffres) attendu, reçu « ${rawId} »`,
  });
  return { siret: null, siren: null };
}

function parseSeller(agreement, errors) {
  const sellerBlock = block(agreement, 'ram:SellerTradeParty') || '';
  const name = readText(tag(sellerBlock, 'ram:Name'), { id: 'BT-27', label: 'Nom du vendeur (BT-27)', required: true }, errors);
  const { siret, siren } = parseLegalId(sellerBlock, { id: 'BT-30', label: 'Identifiant légal du vendeur (BT-30, schemeID 0002)' }, errors);
  const vat = findVatNumber(sellerBlock);

  // Le vendeur doit être identifiable. BR-CO-26 accepte aussi l'identifiant
  // vendeur BT-29, que ce script ne lit pas : le contrôle est donc plus strict
  // que la règle, d'où un identifiant propre plutôt que le numéro BR-CO-26.
  if (!siret && !siren && !vat) {
    errors.push({
      id: 'VENDEUR_NON_IDENTIFIABLE',
      message: 'Vendeur non identifiable : ni SIREN/SIRET (schemeID 0002) ni n° de TVA intracommunautaire',
    });
  }

  const addressBlock = block(sellerBlock, 'ram:PostalTradeAddress') || '';
  return {
    name,
    siret,
    siren,
    vat,
    address: tag(addressBlock, 'ram:LineOne'),
    postcode: tag(addressBlock, 'ram:PostcodeCode'),
    city: tag(addressBlock, 'ram:CityName'),
  };
}

function parseBuyer(agreement, errors) {
  const buyerBlock = block(agreement, 'ram:BuyerTradeParty') || '';
  const name = readText(tag(buyerBlock, 'ram:Name'), { id: 'BT-44', label: "Nom de l'acheteur (BT-44)", required: true }, errors);
  const { siret, siren } = parseLegalId(buyerBlock, { id: 'BT-47', label: "Identifiant légal de l'acheteur (BT-47, schemeID 0002)" }, errors);
  const addressBlock = block(buyerBlock, 'ram:PostalTradeAddress') || '';

  return { name, siret, siren, address: tag(addressBlock, 'ram:LineOne'), vat: findVatNumber(buyerBlock) };
}

// Seule la catégorie S est taxée dans EN 16931 : son montant de TVA se calcule
// depuis un taux (BR-S-09). Pour toutes les autres (E exonéré, Z taux zéro,
// AE autoliquidation, K intracommunautaire, G export, O hors champ), les règles
// BR-E-09, BR-Z-09, BR-AE-09, BR-IC-09, BR-G-09 et BR-O-09 imposent un montant
// de TVA nul.
const RATED_VAT_CATEGORIES = ['S'];

// Ventilation TVA (N blocs, un par taux ou par catégorie).
// Les codes catégorie sont définis dans UNCL5305 (UN/EDIFACT).
// Exemples courants : S = standard, E = exonéré, K = intracom, Z = taux zéro.
function parseTaxBreakdown(settlement, errors) {
  const taxBlocks = allBlocks(settlement, 'ram:ApplicableTradeTax');
  if (taxBlocks.length === 0) {
    errors.push({ id: 'BG-23_MISSING', message: 'Aucune ventilation TVA (BG-23) : ventilation obligatoire' });
    return [];
  }

  return taxBlocks.map((tb, i) => {
    const position = `Ventilation TVA ${i + 1}`;
    const categoryCode = readText(tag(tb, 'ram:CategoryCode'), { id: `BT-118_${i + 1}`, label: `${position} : catégorie (BT-118)`, required: true }, errors);
    // Le taux est obligatoire pour les catégories taxées ; pour les autres il
    // peut être absent (exonération, autoliquidation…).
    const rateRaw = tag(tb, 'ram:RateApplicablePercent');
    const rate = rateRaw === null && !RATED_VAT_CATEGORIES.includes(categoryCode)
      ? null
      : parseDecimal(rateRaw, { id: `BT-119_${i + 1}`, label: `${position} : taux (BT-119)`, required: true }, errors);

    const entry = {
      category_code: categoryCode,
      rate: rate === null ? null : rate / 100,
      basis_amount: parseDecimal(tag(tb, 'ram:BasisAmount'), { id: `BT-116_${i + 1}`, label: `${position} : base (BT-116)`, required: true }, errors),
      tax_amount: parseDecimal(tag(tb, 'ram:CalculatedAmount'), { id: `BT-117_${i + 1}`, label: `${position} : montant (BT-117)`, required: true }, errors),
    };
    const reasonCode = tag(tb, 'ram:ExemptionReasonCode');
    const reason = tag(tb, 'ram:ExemptionReason');
    if (reasonCode) entry.exemption_reason_code = reasonCode;
    if (reason) entry.exemption_reason = reason;
    return entry;
  });
}

function parseLines(tradeTransaction, errors) {
  const lineBlocks = allBlocks(tradeTransaction, 'ram:IncludedSupplyChainTradeLineItem');
  if (lineBlocks.length === 0) {
    errors.push({ id: 'BG-25_MISSING', message: 'Aucune ligne de facture (BG-25) : au moins une ligne est obligatoire' });
    return [];
  }

  return lineBlocks.map((lineXml, i) => {
    const position = `Ligne ${i + 1}`;
    const description = readText(tag(lineXml, 'ram:Name'), { id: `BT-153_${i + 1}`, label: `${position} : désignation (BT-153)`, required: true }, errors);
    const quantity = parseDecimal(tag(lineXml, 'ram:BilledQuantity'), { id: `BT-129_${i + 1}`, label: `${position} : quantité (BT-129)`, required: true }, errors);

    // L'unité est dans l'attribut unitCode de BilledQuantity.
    // C62 = "pièce" (unité générique UN/ECE Rec 20) — omis dans la sortie.
    const unitMatch = lineXml.match(new RegExp(`<${nsPattern('ram:BilledQuantity')}[^>]*unitCode="([^"]+)"`));
    const unitCode = unitMatch ? unitMatch[1] : null;

    // Le prix unitaire est le prix NET (après remise). Sur une ligne avec
    // remise, GrossPriceProductTradePrice (prix catalogue) précède
    // NetPriceProductTradePrice — cibler le bloc net. Aucun repli sur la ligne
    // entière : sans prix net (BT-146), la ligne est refusée.
    const netPriceBlock = block(lineXml, 'ram:NetPriceProductTradePrice');
    const unitPrice = parseDecimal(netPriceBlock && tag(netPriceBlock, 'ram:ChargeAmount'), { id: `BT-146_${i + 1}`, label: `${position} : prix unitaire net (BT-146)`, required: true }, errors);
    const total = parseDecimal(tag(lineXml, 'ram:LineTotalAmount'), { id: `BT-131_${i + 1}`, label: `${position} : total HT (BT-131)`, required: true }, errors);

    return {
      description,
      quantity,
      ...(unitCode && unitCode !== 'C62' ? { unit: unitCode } : {}),
      unit_price: unitPrice,
      total,
    };
  });
}

function parseTotals(settlement, currency, errors) {
  const summation = block(settlement, 'ram:SpecifiedTradeSettlementHeaderMonetarySummation') || '';
  const required = (id, label) => ({ id, label, required: true });
  const optional = (id, label) => ({ id, label, required: false });

  // BT-110 (devise de facturation) peut coexister avec BT-111 (devise de
  // déclaration TVA) : cibler celui qui porte la devise de la facture.
  const taxTotalRaw = tagAttr(summation, 'ram:TaxTotalAmount', 'currencyID', currency) ?? tag(summation, 'ram:TaxTotalAmount');

  return {
    lineTotal: parseDecimal(tag(summation, 'ram:LineTotalAmount'), required('BT-106', 'Somme des lignes (BT-106)'), errors),
    allowanceTotal: parseDecimal(tag(summation, 'ram:AllowanceTotalAmount'), optional('BT-107', 'Total des remises (BT-107)'), errors) ?? 0,
    chargeTotal: parseDecimal(tag(summation, 'ram:ChargeTotalAmount'), optional('BT-108', 'Total des frais (BT-108)'), errors) ?? 0,
    taxBasisTotal: parseDecimal(tag(summation, 'ram:TaxBasisTotalAmount'), required('BT-109', 'Base HT totale (BT-109)'), errors),
    taxTotal: parseDecimal(taxTotalRaw, required('BT-110', 'Total TVA (BT-110)'), errors),
    grandTotal: parseDecimal(tag(summation, 'ram:GrandTotalAmount'), required('BT-112', 'Total TTC (BT-112)'), errors),
    prepaid: parseDecimal(tag(summation, 'ram:TotalPrepaidAmount'), optional('BT-113', 'Acomptes versés (BT-113)'), errors) ?? 0,
    rounding: parseDecimal(tag(summation, 'ram:RoundingAmount'), optional('BT-114', "Écart d'arrondi (BT-114)"), errors) ?? 0,
    duePayable: parseDecimal(tag(summation, 'ram:DuePayableAmount'), required('BT-115', 'Montant à payer (BT-115)'), errors),
  };
}

// Contrôle de la ventilation TVA : c'est ici qu'une facture arithmétiquement
// fausse mais cohérente de bout en bout est attrapée (base 200 à 20 % annoncée
// avec 30 EUR de TVA, totaux alignés sur 30).
function checkVatBreakdown(taxBreakdown, taxBasisTotal, errors) {
  const cents = (n) => Math.round(n * 100);

  taxBreakdown.forEach((entry, i) => {
    const position = `Ventilation TVA ${i + 1}`;
    if (entry.basis_amount === null || entry.tax_amount === null) return;

    if (RATED_VAT_CATEGORIES.includes(entry.category_code)) {
      if (entry.rate === null) return; // absence déjà signalée
      const expected = entry.basis_amount * entry.rate;
      if (Math.abs(cents(entry.tax_amount) - cents(expected)) > 1) {
        errors.push({
          id: `BR-S-09_${i + 1}`,
          message: `${position} : TVA de ${entry.tax_amount.toFixed(2)} pour une base de ${entry.basis_amount.toFixed(2)} au taux de ${(entry.rate * 100).toFixed(2)}% (attendu ${expected.toFixed(2)})`,
        });
      }
      return;
    }

    if (cents(entry.tax_amount) !== 0) {
      errors.push({
        id: `BR-CAT-09_${i + 1}`,
        message: `${position} : montant de TVA non nul (${entry.tax_amount.toFixed(2)}) pour la catégorie « ${entry.category_code} », qui impose une TVA à 0`,
      });
    }
  });

  // Contrôle de cohérence : les bases déclarées par catégorie doivent couvrir
  // exactement la base HT totale. Agrégat plus faible que BR-S-08 et ses
  // équivalents par catégorie, qui rapprochent base par base et taux par taux.
  if (taxBasisTotal === null || taxBreakdown.some(e => e.basis_amount === null)) return;
  const sumOfBases = taxBreakdown.reduce((acc, e) => acc + e.basis_amount, 0);
  if (Math.abs(cents(sumOfBases) - cents(taxBasisTotal)) > 1) {
    errors.push({
      id: 'COHERENCE_BASES',
      message: `Somme des bases de la ventilation TVA (BT-116) : ${sumOfBases.toFixed(2)} au lieu de la base HT totale (BT-109) ${taxBasisTotal.toFixed(2)}`,
    });
  }
}

// Rapprochement arithmétique EN 16931, tolérance 1 centime.
// Les montants déjà signalés comme absents ou invalides (null) sont ignorés :
// l'erreur correspondante est déjà dans la liste.
function reconcile(totals, lines, taxBreakdown, errors) {
  const cents = (n) => Math.round(n * 100);
  const check = (id, label, left, right) => {
    if (left === null || right === null) return;
    if (Math.abs(cents(left) - cents(right)) > 1) {
      errors.push({ id, message: `${label} : ${left.toFixed(2)} au lieu de ${right.toFixed(2)}` });
    }
  };
  const sum = (values) => (values.some(v => v === null) ? null : values.reduce((acc, v) => acc + v, 0));

  check('BR-CO-10', 'Somme des lignes (BT-106) incohérente avec le total des lignes', totals.lineTotal, sum(lines.map(l => l.total)));
  check('BR-CO-14', 'Total TVA (BT-110) incohérent avec la ventilation TVA', totals.taxTotal, sum(taxBreakdown.map(t => t.tax_amount)));
  check('BR-CO-13', 'Base HT totale (BT-109) incohérente avec BT-106 - BT-107 + BT-108', totals.taxBasisTotal,
    totals.lineTotal === null ? null : totals.lineTotal - totals.allowanceTotal + totals.chargeTotal);
  check('BR-CO-15', 'Total TTC (BT-112) incohérent avec BT-109 + BT-110', totals.grandTotal,
    totals.taxBasisTotal === null || totals.taxTotal === null ? null : totals.taxBasisTotal + totals.taxTotal);
  check('BR-CO-16', 'Montant à payer (BT-115) incohérent avec BT-112 - BT-113 + BT-114', totals.duePayable,
    totals.grandTotal === null ? null : totals.grandTotal - totals.prepaid + totals.rounding);

  checkVatBreakdown(taxBreakdown, totals.taxBasisTotal, errors);
}

// Assemble la sortie JSON. Format identique à l'entrée de generate-facturx.js,
// avec en plus :
//   seller        → émetteur de la facture reçue
//   tax_breakdown → ventilation TVA détaillée (multi-taux)
function buildInvoice(parts) {
  const { doc, seller, buyer, currency, dueDate, paymentTerms, taxBreakdown, lines, totals } = parts;

  // Taux unique : renseigné seulement si toutes les lignes imposables (S)
  // partagent le même taux — sinon null (voir tax_breakdown).
  const standardRows = taxBreakdown.filter(r => r.category_code === 'S');
  const uniqueRates = [...new Set(standardRows.map(r => r.rate))];
  const tvaRate = uniqueRates.length === 1 ? uniqueRates[0] : null;

  // Présence d'une catégorie non taxée (exonération, autoliquidation, export…).
  // Ne pas confondre avec la franchise en base art. 293 B CGI, qui utilise
  // ExemptionReasonCode = "VATEX-FR-FRANCHISE" — vérifier tax_breakdown.
  const tvaExempt = taxBreakdown.some(r => !RATED_VAT_CATEGORIES.includes(r.category_code));

  return {
    number: doc.number,
    date: doc.date,
    due_date: dueDate,
    type: doc.type,
    type_code: doc.typeCode,
    ...(doc.category ? { category: doc.category } : {}),
    seller: {
      name: seller.name,
      ...(seller.siren ? { siren: seller.siren } : {}),
      ...(seller.siret ? { siret: seller.siret } : {}),
      ...(seller.address ? { address: seller.address } : {}),
      ...(seller.postcode ? { postcode: seller.postcode } : {}),
      ...(seller.city ? { city: seller.city } : {}),
      ...(seller.vat ? { tva_intracom: seller.vat } : {}),
    },
    client: {
      name: buyer.name,
      ...(buyer.siren ? { siren: buyer.siren } : {}),
      ...(buyer.siret ? { siret: buyer.siret } : {}),
      ...(buyer.address ? { address: buyer.address } : {}),
      ...(buyer.vat ? { tva_intracom: buyer.vat } : {}),
    },
    currency,
    totals: {
      ht: totals.taxBasisTotal,
      tva: totals.taxTotal,
      ttc: totals.grandTotal,
      due_payable: totals.duePayable,
      ...(tvaRate !== null ? { tva_rate: tvaRate } : {}),
      tva_exempt: tvaExempt,
    },
    tax_breakdown: taxBreakdown,
    lines,
    ...(paymentTerms ? { payment: { terms: paymentTerms } } : {}),
    _format: 'cii-en16931',
  };
}

function parseCII(xml) {
  const errors = [];

  checkProfile(xml, errors);
  const doc = parseDocument(xml, errors);

  const tradeTransaction = block(xml, 'rsm:SupplyChainTradeTransaction') || '';
  const agreement = block(tradeTransaction, 'ram:ApplicableHeaderTradeAgreement') || '';
  const settlement = block(tradeTransaction, 'ram:ApplicableHeaderTradeSettlement') || '';

  const seller = parseSeller(agreement, errors);
  const buyer = parseBuyer(agreement, errors);

  const currency = readText(tag(settlement, 'ram:InvoiceCurrencyCode'), { id: 'BT-5', label: 'Devise de facturation (BT-5)', required: true }, errors);
  const paymentTermsBlock = block(settlement, 'ram:SpecifiedTradePaymentTerms') || '';
  const dueDate = parseDate102(tag(paymentTermsBlock, 'udt:DateTimeString'), { id: 'BT-9', label: "Date d'échéance (BT-9)", required: false }, errors);

  const taxBreakdown = parseTaxBreakdown(settlement, errors);
  const lines = parseLines(tradeTransaction, errors);
  const totals = parseTotals(settlement, currency, errors);
  reconcile(totals, lines, taxBreakdown, errors);

  const invoice = buildInvoice({
    doc,
    seller,
    buyer,
    currency,
    dueDate,
    paymentTerms: tag(paymentTermsBlock, 'ram:Description'),
    taxBreakdown,
    lines,
    totals,
  });

  return { invoice, errors };
}

// ---------------------------------------------------------------------------
// Affichage humain
// ---------------------------------------------------------------------------

// Formate un taux TVA en pourcentage sans zéro inutile (ex : 0.021 → "2.1%").
function formatRate(rate) {
  const pct = rate * 100;
  return `${parseFloat(pct.toFixed(4))}%`;
}

function printHuman(invoice) {
  const amount = (n) => (n !== null && n !== undefined ? `${n.toFixed(2)} ${invoice.currency}` : '-');
  const categoryLabels = { goods: 'Livraison de biens', services: 'Prestation de services', mixed: 'Mixte' };

  console.log('\n━━━ Facture parsée ━━━\n');
  console.log(`  Numéro      : ${invoice.number}`);
  console.log(`  Type        : ${invoice.type === 'credit_note' ? 'Avoir' : 'Facture'} (TypeCode ${invoice.type_code})`);
  console.log(`  Date        : ${invoice.date}`);
  console.log(`  Échéance    : ${invoice.due_date || '-'}`);
  if (invoice.category) console.log(`  Catégorie   : ${categoryLabels[invoice.category] || invoice.category}`);
  console.log(`  Format      : ${invoice._format}`);

  console.log('\n  Vendeur');
  console.log(`    Nom       : ${invoice.seller.name}`);
  console.log(`    SIREN     : ${invoice.seller.siren || '-'}`);
  console.log(`    SIRET     : ${invoice.seller.siret || '-'}`);
  if (invoice.seller.address) console.log(`    Adresse   : ${invoice.seller.address}`);
  if (invoice.seller.tva_intracom) console.log(`    N° TVA    : ${invoice.seller.tva_intracom}`);

  console.log('\n  Acheteur');
  console.log(`    Nom       : ${invoice.client.name}`);
  console.log(`    SIREN     : ${invoice.client.siren || '-'}`);
  if (invoice.client.address) console.log(`    Adresse   : ${invoice.client.address}`);
  if (invoice.client.tva_intracom) console.log(`    N° TVA    : ${invoice.client.tva_intracom}`);

  console.log('\n  Montants');
  console.log(`    Total HT  : ${amount(invoice.totals.ht)}`);
  invoice.tax_breakdown.forEach(tb => {
    const label = tb.category_code === 'S'
      ? `TVA ${formatRate(tb.rate)}`
      : `TVA (${tb.category_code}${tb.exemption_reason ? ' — ' + tb.exemption_reason : ''})`;
    console.log(`    ${label.padEnd(18)}: base ${amount(tb.basis_amount)}, TVA ${amount(tb.tax_amount)}`);
  });
  console.log(`    Total TTC : ${amount(invoice.totals.ttc)}`);
  console.log(`    À payer   : ${amount(invoice.totals.due_payable)}`);

  console.log(`\n  Lignes (${invoice.lines.length})`);
  invoice.lines.forEach((l, i) => {
    const unit = l.unit ? ` ${l.unit}` : '';
    console.log(`    ${i + 1}. ${l.description} — ${l.quantity}${unit} × ${l.unit_price.toFixed(2)} = ${l.total.toFixed(2)} ${invoice.currency}`);
  });

  if (invoice.payment && invoice.payment.terms) {
    console.log(`\n  Paiement    : ${invoice.payment.terms}`);
  }

  console.log('');
}

function printErrors(errors) {
  console.error(`\n❌ Facture refusée — ${errors.length} erreur(s) :\n`);
  errors.forEach(e => console.error(`   [${e.id}] ${e.message}`));
  console.error('\nAucune donnée n\'est émise : cette facture ne doit pas alimenter un import comptable.\n');
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

// Lit le fichier et s'assure qu'il s'agit bien d'un CII exploitable.
// Sort en code 1 avec un message explicite sinon.
function readCiiFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`Fichier introuvable : ${filePath}`);
    process.exit(1);
  }

  const ext = path.extname(filePath).toLowerCase();
  if (ext === '.pdf') {
    console.error('Les fichiers PDF ne sont pas supportés directement.');
    console.error("Extrayez d'abord le XML embarqué avec pdfdetach (poppler-utils) :");
    console.error('  pdfdetach -savefile factur-x.xml ' + path.basename(filePath));
    console.error('  node scripts/parse-einvoice.js --invoice factur-x.xml');
    process.exit(1);
  }

  const xml = fs.readFileSync(filePath, 'utf8');
  if (!xml.trim()) {
    console.error('Fichier vide.');
    process.exit(1);
  }

  const format = detectFormat(xml);
  if (!format) {
    console.error('Format non reconnu : ni CII ni UBL détecté.');
    console.error('Vérifiez que le fichier est bien une facture électronique EN 16931.');
    process.exit(1);
  }

  if (format === 'ubl') {
    console.error('Format UBL non supporté (utilisé sur le réseau Peppol).');
    console.error('Ce parser traite les factures CII (Factur-X, échanges domestiques FR).');
    process.exit(1);
  }

  return xml;
}

function main() {
  const args = process.argv.slice(2);
  const invoiceIdx = args.indexOf('--invoice');
  const jsonOutput = args.includes('--json');

  if (invoiceIdx === -1 || !args[invoiceIdx + 1]) {
    console.error('Usage: node scripts/parse-einvoice.js --invoice <fichier.xml>');
    console.error('Options:');
    console.error('  --json   Sortie JSON uniquement (pour intégration CI/agent)');
    process.exit(1);
  }

  const { invoice, errors } = parseCII(readCiiFile(args[invoiceIdx + 1]));

  if (errors.length > 0) {
    if (jsonOutput) console.log(JSON.stringify({ ok: false, errors }, null, 2));
    else printErrors(errors);
    process.exit(1);
  }

  if (jsonOutput) {
    console.log(JSON.stringify(invoice, null, 2));
  } else {
    printHuman(invoice);
  }
}

main();
