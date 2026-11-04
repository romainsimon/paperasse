#!/usr/bin/env python3
"""
Calculateur IR déterministe pour revenus 2025 (déclaration 2026).

Usage:
    # Calcul direct
    python fiscaliste/scripts/calc_ir.py --parts 1 --rni 45000

    # Via fichier foyer.json
    python fiscaliste/scripts/calc_ir.py --foyer foyer.example.json

    # Sortie JSON
    python fiscaliste/scripts/calc_ir.py --parts 2 --rni 90000 --json

Couvre :
    - Abattement 10 % salaires et pensions (salaires : plancher et plafond par
      déclarant, CGI art. 83, 3° ; pensions : plancher par pensionné, plafond
      par foyer, CGI art. 158, 5-a ; plancher limité au revenu)
    - Barème progressif tranche par tranche
    - Quotient familial (avec plafonnement ; enfants en résidence alternée
      décomptés après les enfants à charge exclusive)
    - Décote célibataire / couple
    - PS par nature de revenu, aux taux du millésime (revenus 2025, LFSS 2026) :
      18,6 % revenus du patrimoine (PV mobilières, crypto, résultat LMNP, RCM
      sans PS à la source) / 17,2 % produits de placement 2025 (dividendes,
      intérêts) / 17,2 % revenus fonciers nets
    - IR forfaitaire du PFU : 12,8 % des revenus du capital (CGI art. 200 A),
      ou option globale pour le barème (options_fiscales.revenus_capital,
      case 2OP : dividendes après abattement de 40 %, intérêts, PV mobilières ;
      CSG déductible de 6,8 % des dividendes et intérêts de la ligne 2BH
      déduite l'année même). Option distincte pour les actifs numériques
      (options_fiscales.crypto, case 3CN, art. 200 C)
    - Résultat LMNP au réel (lmnp_reel_resultat) : au barème et aux PS des
      revenus du patrimoine, jamais à l'IR forfaitaire de 12,8 %
    - CEHR (RFR incluant les versements PER déduits et l'abattement de 40 %,
      CGI art. 1417, IV)

Ne couvre PAS :
    - Réductions / crédits d'impôt sans bloc reductions_credits dans le
      foyer.json (voir la section « Réductions, crédits d'impôt » plus bas)
    - Régimes spéciaux (revenus exceptionnels, non-résidents : refusés, DOM-TOM)
    - Abattement pour durée de détention des PV mobilières au barème (titres
      acquis avant 2018) : non appliqué, l'IR est alors surestimé (saisir la
      plus-value brute : l'abattement ne réduit pas la base des PS)
    - Option crypto au barème avant les revenus 2023 (refusée, art. 200 C)
    - CSG déductible reportée sur l'année suivante (PV mobilières, crypto au
      barème, RCM sans PS à la source) : à saisir en csg_deductible_n1 l'année
      suivante
    - Contrôle du plafond PER, CDHR, assurance-vie
    - IFI (script distinct à créer si besoin)

Les valeurs viennent du millésime de l'année de revenus :
data/revenus-AAAA/bareme-ir.json et data/revenus-AAAA/pfu-prelevements-sociaux.json.
L'année courante, avec ou sans --annee, se lit dans les fichiers data/*.json à la
racine (le dossier de l'année courante n'en contient que des liens). Un foyer.json
multi-année (clé "annees") est calculé pour --annee, ou pour sa dernière année par
défaut. --bareme / --pfu restent disponibles pour forcer un fichier précis.
Les réductions, crédits et le solde ne sont calculés que pour les années dont le
millésime porte parametres_calcul_rici ; les autres années sont refusées.

    python fiscaliste/scripts/calc_ir.py --foyer foyer.json --annee 2023
"""

import argparse
import json
import sys
from pathlib import Path

REPO_ROOT = Path(__file__).parent.parent
DATA_DIR = REPO_ROOT / "data"
DEFAULT_BAREME = DATA_DIR / "bareme-ir-2025.json"
DEFAULT_PFU = DATA_DIR / "pfu-prelevements-sociaux.json"
DEFAULT_NICHES = DATA_DIR / "niches-fiscales.json"


def fichiers_millesime(annee):
    """Fichiers de données d'une année de revenus. L'année courante se lit à la racine, ce
    qui marche aussi quand une installation n'a pas conservé les liens de son dossier.
    Échoue si le millésime n'existe pas : calculer une année avec les règles d'une autre
    est l'erreur que les millésimes évitent."""
    if annee is None or annee == load_json(DEFAULT_BAREME)["_meta"]["revenus"]:
        return {"bareme": DEFAULT_BAREME, "pfu": DEFAULT_PFU, "niches": DEFAULT_NICHES}
    path = DATA_DIR / f"revenus-{annee}"
    if not path.is_dir():
        disponibles = sorted(p.name.removeprefix("revenus-") for p in DATA_DIR.glob("revenus-*") if p.is_dir())
        sys.exit(f"Millésime revenus-{annee} absent. Années disponibles : {', '.join(disponibles)}")
    return {"bareme": path / "bareme-ir.json", "pfu": path / "pfu-prelevements-sociaux.json",
            "niches": path / "niches-fiscales.json"}


def annee_du_foyer(foyer, annee):
    """Pour un foyer multi-année, l'année demandée ou la plus récente ; None pour un foyer mono-année."""
    annees = foyer.get("annees")
    if not annees:
        return None
    if annee is None:
        return max(int(a) for a in annees)
    if str(annee) not in annees:
        sys.exit(f"Le foyer ne contient pas l'année {annee} (années : {', '.join(sorted(annees))})")
    return annee


def foyer_de_l_annee(foyer, annee):
    """Vue mono-année d'un foyer multi-année. La situation peut changer d'une année à l'autre
    (mariage, naissance) : la section foyer de l'année complète celle du foyer, et les blocs
    de l'année (revenus, reductions_credits, options_fiscales...) remplacent ceux du foyer."""
    if annee is None:
        return foyer
    donnees = foyer["annees"][str(annee)]
    vue = {k: v for k, v in foyer.items() if k != "annees"}
    vue.update({k: v for k, v in donnees.items() if k != "declaration_deposee"})
    vue["foyer"] = {**foyer.get("foyer", {}), **donnees.get("foyer", {})}
    vue.setdefault("revenus", {})
    return vue


def load_json(path):
    with open(path) as f:
        return json.load(f)


# ─────────────────────────────────────────────────────
# Abattement salaires / pensions
# ─────────────────────────────────────────────────────

def abattement_salaires(brut_1aj, bareme):
    cfg = bareme["abattement_salaires_10pct"]
    abatt = max(cfg["minimum"], min(cfg["maximum"], brut_1aj * cfg["taux"]))
    # Le plancher ne peut excéder le revenu : net jamais négatif
    abatt = min(abatt, brut_1aj)
    return round(brut_1aj - abatt)


def abattement_pensions(pensions_par_declarant, bareme):
    """Pensions nettes du foyer (CGI art. 158, 5-a).

    Le minimum s'apprécie par pensionné, limité au montant de sa pension ;
    le maximum s'applique au total du foyer.
    """
    cfg = bareme["abattement_pensions_10pct"]
    abatt_par_declarant = [
        min(brut, max(cfg["minimum"], brut * cfg["taux"]))
        for brut in pensions_par_declarant if brut
    ]
    abatt = min(cfg["maximum"], sum(abatt_par_declarant))
    return round(sum(pensions_par_declarant) - abatt)


# ─────────────────────────────────────────────────────
# Barème progressif (tranche par tranche, sur 1 part)
# ─────────────────────────────────────────────────────

def impot_par_part(quotient, tranches):
    """Calcule l'impôt sur un quotient (1 part) en appliquant les tranches."""
    impot = 0.0
    for t in tranches:
        taux = t["taux"]
        # cas "jusqu_a" (première tranche à 0%)
        if "jusqu_a" in t and "de" not in t:
            borne_basse = 0
            borne_haute = t["jusqu_a"]
        elif "au_dela" in t:
            borne_basse = t["au_dela"]
            borne_haute = float("inf")
        else:
            borne_basse = t["de"]
            borne_haute = t["a"]

        if quotient <= borne_basse:
            break
        base = min(quotient, borne_haute) - borne_basse
        impot += base * taux

    return impot


# ─────────────────────────────────────────────────────
# Décote
# ─────────────────────────────────────────────────────

def decote(impot_brut, parts, bareme):
    """Applique la décote si éligible. Retourne le montant de décote."""
    cfg = bareme["decote"]
    if parts <= 1:
        seuil = cfg["seuil_celibataire"]
        plafond = cfg["plafond_celibataire"]
    else:
        seuil = cfg["seuil_couple"]
        plafond = cfg["plafond_couple"]

    if impot_brut >= seuil:
        return 0.0
    return max(0.0, plafond - 0.4525 * impot_brut)


# ─────────────────────────────────────────────────────
# Quotient familial avec plafonnement
# ─────────────────────────────────────────────────────

def impot_avec_qf(rni, parts_total, parts_base, bareme):
    """
    Applique le QF avec plafonnement.
    - parts_total : parts foyer (ex: couple + 2 enfants = 3)
    - parts_base : parts foyer sans enfants (ex: couple = 2, célib = 1)
    """
    tranches = bareme["bareme_ir"]["tranches"]
    plafond_demi = bareme["quotient_familial"]["plafond_gain_par_demi_part"]

    # Impôt avec toutes les parts
    impot_total = impot_par_part(rni / parts_total, tranches) * parts_total
    # Impôt sans les enfants (référence)
    impot_sans = impot_par_part(rni / parts_base, tranches) * parts_base

    gain_reel = impot_sans - impot_total
    nb_demi_parts = (parts_total - parts_base) * 2
    gain_max = nb_demi_parts * plafond_demi

    if gain_reel > gain_max:
        # Plafonné : impôt = impôt_sans_enfants − gain_max
        impot_brut = impot_sans - gain_max
        qf_plafonne = True
    else:
        impot_brut = impot_total
        qf_plafonne = False

    return {
        "impot_brut": round(impot_brut),
        "impot_total_parts": round(impot_total),
        "impot_base_parts": round(impot_sans),
        "gain_qf_reel": round(gain_reel),
        "gain_qf_max": round(gain_max),
        "qf_plafonne": qf_plafonne,
    }


# ─────────────────────────────────────────────────────
# CEHR
# ─────────────────────────────────────────────────────

def cehr(rfr, parts_base, bareme):
    cfg = bareme["cehr"]
    seuils = cfg["seuils_couple"] if parts_base >= 2 else cfg["seuils_celibataire"]
    total = 0.0
    for t in seuils:
        taux = t["taux"]
        if "au_dela" in t:
            if rfr > t["au_dela"]:
                total += (rfr - t["au_dela"]) * taux
        else:
            if rfr > t["de"]:
                base = min(rfr, t["a"]) - t["de"]
                total += base * taux
    return round(total)


# ─────────────────────────────────────────────────────
# PS sur revenus du capital
# ─────────────────────────────────────────────────────

def ps_capital(base_patrimoine, base_placement, pfu_data, base_foncier=0):
    """PS par nature de revenu, aux taux du millésime (revenus 2025 : LFSS 2026).

    - Revenus du patrimoine (PV mobilières CTO, crypto, résultat LMNP, RCM sans
      PS à la source) : 18,6 % dès les revenus 2025.
    - Produits de placement (dividendes, intérêts) : 17,2 % pour les
      encaissements 2025 (18,6 % à partir du 01/01/2026).
    - Revenus fonciers nets : 17,2 % (CSG maintenue à 9,2 %, art. L. 136-8, IV CSS).
    """
    ps = pfu_data["prelevements_sociaux"]
    # Les clés portent l'année de revenus du millésime (taux_revenus_du_patrimoine_2025…).
    annee = pfu_data["_meta"]["revenus"]
    taux = {
        "patrimoine": ps[f"taux_revenus_du_patrimoine_{annee}"]["valeur"],
        "placement": ps[f"taux_produits_de_placement_{annee}"]["valeur"],
        "foncier": ps["taux_inchanges_17_2"]["valeur"],
    }
    bases = {"patrimoine": base_patrimoine, "placement": base_placement, "foncier": base_foncier}
    detail: dict = {k: {"base": bases[k], "taux": taux[k], "montant": round(bases[k] * taux[k])}
                    for k in bases}
    detail["total"] = sum(detail[k]["montant"] for k in bases)
    return detail


# ─────────────────────────────────────────────────────
# Orchestration
# ─────────────────────────────────────────────────────

def calc(rni, parts, parts_base, bareme, rfr=None, base_ps_patrimoine=0,
         base_ps_placement=0, pfu_data=None, base_pfu_ir=0, base_ps_foncier=0,
         options=None, avertissements=None):
    qf = impot_avec_qf(rni, parts, parts_base, bareme)
    dec = decote(qf["impot_brut"], parts_base, bareme)
    impot_apres_decote = max(0, qf["impot_brut"] - round(dec))

    if (base_ps_patrimoine or base_ps_placement or base_ps_foncier) and pfu_data:
        ps_detail = ps_capital(base_ps_patrimoine, base_ps_placement, pfu_data, base_ps_foncier)
    else:
        ps_detail = None
    ps = ps_detail["total"] if ps_detail else 0
    cehr_montant = cehr(rfr, parts_base, bareme) if rfr else 0
    ir_pfu = round(base_pfu_ir * pfu_data["pfu"]["taux_ir"]) if base_pfu_ir and pfu_data else 0

    result = {
        "rni": rni,
        "parts": parts,
        "parts_base": parts_base,
        "quotient_par_part": round(rni / parts),
        "impot_brut_apres_qf": qf["impot_brut"],
        "qf_details": {
            "gain_qf_reel": qf["gain_qf_reel"],
            "gain_qf_max": qf["gain_qf_max"],
            "plafonne": qf["qf_plafonne"],
        },
        "decote": round(dec),
        "impot_apres_decote": impot_apres_decote,
        "ir_pfu": {"base": base_pfu_ir, "montant": ir_pfu},
        "prelevements_sociaux": ps,
        "ps_details": ps_detail,
        "cehr": cehr_montant,
        "total_a_payer": impot_apres_decote + ir_pfu + ps + cehr_montant,
        "_note": "Avant réductions et crédits d'impôt. Les additionner manuellement.",
    }
    if options is not None:
        result["options_fiscales"] = options
        result["rfr_approx"] = rfr
    if avertissements:
        result["_avertissements"] = avertissements
    return result


def from_foyer(foyer, bareme, pfu_data):
    """Déduit les paramètres à partir d'un foyer.json (mono-année, voir foyer_de_l_annee)."""
    f = foyer["foyer"]
    r = foyer["revenus"]
    d = foyer.get("deductions", {})

    # Parts
    situation = f.get("situation", "celibataire")
    parts_base = 2 if situation in ("marie", "pacse") else 1
    enfants = f.get("nb_enfants_charge", 0)
    enfants_alternee = f.get("nb_enfants_alternee", 0)
    # Les 2 premiers enfants = 0,5 part chacun ; à partir du 3e = 1 part
    demi_parts_enfants = 0.5 * min(enfants, 2) + 1.0 * max(0, enfants - 2)
    # Résidence alternée : décomptés après les enfants à charge exclusive ;
    # 0,25 part pour le 1er ou le 2e enfant à charge, 0,5 à partir du 3e
    rangs_alt = range(enfants + 1, enfants + enfants_alternee + 1)
    demi_parts_alt = sum(0.25 if rang <= 2 else 0.5 for rang in rangs_alt)
    parts = parts_base + demi_parts_enfants + demi_parts_alt

    # Revenu net catégoriel salaires + ARE (abattement 10 %).
    # L'ARE est un revenu de remplacement imposé selon les règles des T&S
    # (BOI-RSA-BASE-30-50-20) : même abattement 10 % que les salaires.
    # Plancher et plafond s'appliquent à chaque membre du foyer (CGI art. 83, 3°) :
    # l'abattement se calcule déclarant par déclarant, ARE comprise.
    # revenus_chomage = ARE du déclarant 1 (champ historique).
    traitements_par_declarant = [
        r.get("salaires_declarant1", 0) + r.get("revenus_chomage_declarant1", r.get("revenus_chomage", 0)),
        r.get("salaires_declarant2", 0) + r.get("revenus_chomage_declarant2", 0),
    ]
    net_salaires = sum(abattement_salaires(t, bareme) for t in traitements_par_declarant if t)

    pensions_par_declarant = [r.get("pensions_declarant1", 0), r.get("pensions_declarant2", 0)]
    net_pensions = abattement_pensions(pensions_par_declarant, bareme) if any(pensions_par_declarant) else 0

    # Cases 1AI/1BI — sorties en CAPITAL d'un PER (PERIN, PERO, PERECO), part correspondant
    # aux versements DÉDUITS à l'entrée. Imposables au barème comme des pensions
    # mais SANS abattement de 10 % (brochure pratique IR, rubrique pensions).
    # Les intégrer à `pensions_declarant*` surestime l'abattement et sous-estime le RNI.
    pensions_sans_abattement = (
        r.get("pensions_capital_per_declarant1", 0)
        + r.get("pensions_capital_per_declarant2", 0)
    )

    # Revenus fonciers : déjà au net (micro post-abattement / réel post-charges).
    fonciers = r.get("revenus_fonciers_reels", 0) + r.get("revenus_fonciers_micro", 0)
    # LMNP au réel : résultat BIC non professionnel après amortissements, positif
    # seulement. Imposé au barème, et soumis aux PS des revenus du patrimoine.
    lmnp = max(0, r.get("lmnp_reel_resultat", 0))

    # Revenus du capital et options (art. 200 A, 2 et 200 C CGI)
    avertissements = []
    opt = foyer.get("options_fiscales", {})
    dividendes = r.get("dividendes_bruts", 0)
    interets = r.get("interets_rcm", 0)
    pv_mobilieres = r.get("plus_values_mobilieres", 0)
    crypto = r.get("crypto_plus_values", 0)
    # Option globale pour le barème (case 2OP) : dividendes, intérêts et plus-values
    # mobilières de l'année. Elle ne couvre pas les actifs numériques, qui ont leur
    # propre option (case 3CN, art. 200 C ; notice 2086).
    option_capital = opt.get("revenus_capital", "pfu")
    option_crypto = opt.get("crypto", "pfu")
    for nom, valeur in (("revenus_capital", option_capital), ("crypto", option_crypto)):
        if valeur not in ("pfu", "bareme"):
            sys.exit(f"options_fiscales.{nom} = {valeur!r} : valeurs possibles \"pfu\" ou \"bareme\"")
    # Dividendes et intérêts payés sans PS à l'encaissement (établissement payeur hors
    # de France, sans formulaire 2778) : PS établis par voie de rôle au titre des
    # revenus du patrimoine (18,6 % pour les revenus 2025), et CSG déductible
    # seulement l'année suivante.
    rcm_sans_ps_source = r.get("rcm_sans_ps_a_la_source", False)
    if not isinstance(rcm_sans_ps_source, bool):
        sys.exit(f"revenus.rcm_sans_ps_a_la_source = {rcm_sans_ps_source!r} : booléen JSON attendu (true ou false)")
    # L'option pour le barème des actifs numériques vaut pour les cessions réalisées
    # depuis le 01/01/2023 (art. 200 C CGI, issu de la LF 2022) : pas avant.
    annee_revenus = bareme["_meta"]["revenus"]
    if option_crypto == "bareme" and annee_revenus < 2023:
        sys.exit(f"options_fiscales.crypto = \"bareme\" : option ouverte aux cessions réalisées depuis le "
                 f"01/01/2023 (art. 200 C CGI), pas aux revenus {annee_revenus}.")

    # Revenus imposables au barème
    revenu_global = net_salaires + net_pensions + pensions_sans_abattement + fonciers + lmnp
    abattement_40 = 0
    csg_ded_annee = 0
    if option_capital == "bareme" and pfu_data:
        abattement_40 = round(dividendes * pfu_data["dividendes_option_bareme"]["abattement"])
        revenu_global += dividendes - abattement_40 + interets + pv_mobilieres
        # CSG déductible (6,8 %) des dividendes et intérêts dont les PS ont été prélevés
        # à la source (ligne 2BH) : déduite automatiquement du revenu global de l'année
        # même (brochure IR 2026, RCM, p. 132). Celle des plus-values et des PS établis
        # par voie de rôle ne se déduit que l'année suivante.
        if not rcm_sans_ps_source:
            csg_ded_annee = round((dividendes + interets)
                                  * pfu_data["prelevements_sociaux"]["dont_csg_deductible_si_bareme"])
        if pv_mobilieres:
            avertissements.append(
                "Option barème : plus-values mobilières imposées sans abattement pour durée de "
                "détention (titres acquis avant 2018, art. 150-0 D, 1 ter et 1 quater), non géré : "
                "si les titres y ouvrent droit, l'IR calculé est surestimé (l'abattement ne réduit "
                "que la base de l'IR, pas celle des PS). La CSG déductible (6,8 %) des plus-values "
                "se déduira du revenu global de l'année suivante.")
        if rcm_sans_ps_source and (dividendes or interets):
            avertissements.append(
                "Option barème : la CSG déductible (6,8 %) des dividendes et intérêts sans PS "
                "à la source se déduira du revenu global de l'année suivante.")
    elif option_capital == "bareme":
        sys.exit("Option barème : fichier PFU / PS du millésime introuvable (abattement de 40 % et CSG déductible).")
    if option_capital == "bareme" and option_crypto == "pfu" and crypto:
        avertissements.append(
            "La case 2OP ne couvre pas les actifs numériques : plus-values crypto laissées au PFU "
            "(12,8 %). Pour les imposer au barème, options_fiscales.crypto = \"bareme\" (case 3CN).")
    if option_crypto == "bareme":
        revenu_global += crypto
        if crypto:
            avertissements.append(
                "Crypto au barème (case 3CN) : la CSG déductible (6,8 %) se déduira du revenu "
                "global de l'année suivante.")

    # Déductions (PER + pension alimentaire + CSG déductible)
    per = d.get("per_declarant1", 0) + d.get("per_declarant2", 0)
    pension_alim = d.get("pension_alimentaire_enfant_majeur", 0)
    csg_ded = d.get("csg_deductible_n1", 0)
    rni = max(0, revenu_global - per - pension_alim - csg_ded - csg_ded_annee)

    # Bases PS, séparées par nature (LFSS 2026) :
    # - produits de placement (dividendes, intérêts) : 17,2 % sur les encaissements 2025
    # - revenus du patrimoine (PV mobilières, crypto, LMNP, RCM sans PS à la source) :
    #   18,6 % dès les revenus 2025
    # - revenus fonciers nets : 17,2 %
    base_ps_placement = dividendes + interets
    base_ps_patrimoine = pv_mobilieres + crypto + lmnp
    if rcm_sans_ps_source:
        base_ps_patrimoine += base_ps_placement
        base_ps_placement = 0
    base_ps_foncier = max(0, fonciers)

    # IR forfaitaire du PFU (12,8 %, CGI art. 200 A ; art. 200 C pour les actifs
    # numériques) sur les revenus du capital restés hors barème. Le LMNP n'en fait
    # jamais partie : il est au barème.
    base_pfu_ir = 0
    if option_capital == "pfu":
        base_pfu_ir += dividendes + interets + pv_mobilieres
    if option_crypto == "pfu":
        base_pfu_ir += crypto

    # RFR approximatif (CGI art. 1417, IV ; brochure IR 2026, p. 335) : RNI + revenus
    # taxés au PFU + versements PER déduits (IV-1°-a) + abattement de 40 % des
    # dividendes au barème.
    rfr_approx = rni + base_pfu_ir + per + abattement_40

    return calc(
        rni=rni,
        parts=parts,
        parts_base=parts_base,
        bareme=bareme,
        rfr=rfr_approx,
        base_ps_patrimoine=base_ps_patrimoine,
        base_ps_placement=base_ps_placement,
        pfu_data=pfu_data,
        base_pfu_ir=base_pfu_ir,
        base_ps_foncier=base_ps_foncier,
        options={"revenus_capital": option_capital, "crypto": option_crypto},
        avertissements=avertissements,
    )


# ─────────────────────────────────────────────────────
# Réductions, crédits d'impôt, plafonnement global, solde
# ─────────────────────────────────────────────────────
#
# Étape facultative, activée par les blocs `reductions_credits` et/ou
# `prelevement_a_la_source` du foyer.json. Ordre d'imputation (CGI art. 197, I-5 ;
# brochure IR 2026, fiche de calculs p. 382) :
#   impôt du barème après décote − réductions (dans la limite de cet impôt)
#   + impositions à taux proportionnel (IR 12,8 % du PFU)
#   + excédent du plafonnement global (art. 200-0 A)
#   − crédits d'impôt et prélèvement forfaitaire déjà versé (restituables)
#   = impôt net. La CEHR et les PS s'ajoutent à part.
# Solde = impôt net + CEHR − retenue à la source − acomptes + avance RICI
# perçue en janvier (art. 1665 bis) + avance immédiate services à la personne,
# plus le solde des PS.
#
# Paramètres : data/niches-fiscales.json (parametres_calcul_rici,
# plafonnement_global, frais_scolarite), du millésime de l'année calculée.

def reduction_dons(rc, rni, cfg):
    """Réduction dons (art. 200) : 75 % puis 66 % dans la limite de 20 % du revenu imposable."""
    d75_avant = rc.get("dons_aide_personnes_avant_14_10", 0)
    d75_depuis = rc.get("dons_aide_personnes_depuis_14_10", 0)
    retenu_avant = min(d75_avant, cfg["plafond_75_avant_14_10_2025"])
    retenu_depuis = min(d75_depuis, max(0, cfg["plafond_75_depuis_14_10_2025"] - retenu_avant))
    base_75 = retenu_avant + retenu_depuis
    excedent_75 = d75_avant + d75_depuis - base_75

    # Reports antérieurs imputés avant les versements de l'année (les plus anciens d'abord)
    reports = rc.get("dons_reports_anterieurs", 0)
    base_66 = reports + rc.get("dons_interet_general", 0) + excedent_75
    limite = rni * cfg["limite_revenu_imposable"]
    retenu_66 = min(base_66, limite)

    return {
        "base_75": base_75,
        "base_66": base_66,
        "limite_20pct": round(limite),
        "retenu_66": round(retenu_66),
        "excedent_reportable": round(base_66 - retenu_66),
        "montant": round(base_75 * cfg["taux_aide_personnes"] + retenu_66 * cfg["taux_interet_general"]),
    }


def fraction_pinel(inv, cfg):
    """Fraction annuelle de la réduction Pinel (art. 199 novovicies) pour un investissement."""
    manquants = [c for c in ("prix_revient", "engagement_ans", "annee_investissement") if c not in inv]
    if manquants:
        raise ValueError(f"Investissement Pinel incomplet : champ(s) manquant(s) {', '.join(manquants)}")
    engagement = str(inv["engagement_ans"])
    if engagement not in ("6", "9"):
        raise ValueError(f"Engagement Pinel de {engagement} ans : seuls 6 ou 9 ans sont possibles")
    periode = inv.get("periode", "initiale")
    rangs = {"initiale": 0, "prorogation_1": 1, "prorogation_2": 2}
    if periode not in rangs:
        raise ValueError(f"Période Pinel « {periode} » inconnue : initiale, prorogation_1 ou prorogation_2")
    rang = rangs[periode]
    if engagement == "9" and rang == 2:
        raise ValueError("Un engagement Pinel de 9 ans n'a qu'une prorogation (prorogation_2 réservée aux engagements de 6 ans)")
    annee = inv["annee_investissement"]
    if not 2014 <= annee <= 2024:
        raise ValueError(f"Investissement Pinel en {annee} hors période 2014-2024 (art. 199 novovicies)")
    if annee <= 2022 or inv.get("taux_maintenu", False):
        tranche = "2014-2022"
    else:
        tranche = str(annee)
    zone = "outre_mer" if inv.get("outre_mer", False) else "metropole"
    taux = cfg["taux"][zone][tranche][engagement][rang]

    base = inv["prix_revient"]
    if inv.get("surface_m2"):
        base = min(base, inv["surface_m2"] * cfg["plafond_prix_m2"])
    base = min(base, cfg["plafond_base_annuel"])
    duree = cfg["duree_imputation_ans"][engagement if rang == 0 else "prorogation"]
    return round(base * taux / duree)


def credit_emploi_domicile(ed, nb_enfants, nb_enfants_alternee, cfg):
    """Crédit emploi d'un salarié à domicile (art. 199 sexdecies)."""
    depenses = max(0, ed.get("depenses", 0) - ed.get("aides", 0))
    if ed.get("invalidite", False):
        plafond = cfg["plafond_invalidite"]
    else:
        premiere = ed.get("premiere_annee_emploi_direct", False)
        base = cfg["plafond_premiere_annee_emploi_direct"] if premiere else cfg["plafond_base"]
        maxi = cfg["plafond_premiere_annee_majore_max"] if premiere else cfg["plafond_majore_max"]
        nb_majorations = nb_enfants + 0.5 * nb_enfants_alternee + ed.get("personnes_plus_65_ans", 0)
        plafond = min(maxi, base + nb_majorations * cfg["majoration_par_personne"])
    retenu = min(depenses, plafond)
    return {"retenu": round(retenu), "plafond": round(plafond),
            "montant": round(retenu * cfg["taux_credit"])}


def credit_garde_enfants(enfants, cfg):
    """Crédit frais de garde des enfants de moins de 6 ans (art. 200 quater B)."""
    retenu = 0
    for e in enfants:
        plafond = cfg["plafond_par_enfant_alternee"] if e.get("alternee", False) else cfg["plafond_par_enfant"]
        retenu += min(max(0, e.get("depenses", 0) - e.get("aides", 0)), plafond)
    return {"retenu": round(retenu), "montant": round(retenu * cfg["taux_credit"])}


def reduction_scolarite(sco, niches):
    """Réduction frais de scolarité (art. 199 quater F), divisée par deux en résidence alternée."""
    total = 0.0
    for niveau, c in niches["frais_scolarite"]["cases"].items():
        total += sco.get(niveau, 0) * c["reduction_par_enfant"]
        total += sco.get(f"{niveau}_alternee", 0) * c["reduction_par_enfant"] / 2
    return round(total)


def imputer(impot_bareme, reductions, impot_proportionnel, credits):
    """Impôt après réductions (plafonnées à l'impôt du barème), taux proportionnels et crédits."""
    reductions_imputees = min(impot_bareme, reductions)
    return impot_bareme - reductions_imputees + impot_proportionnel - credits, reductions_imputees


def impot_proportionnel(foyer, result, pfu_data):
    """IR forfaitaire du PFU (12,8 %, art. 200 A), repris du calcul principal s'il le fournit."""
    if isinstance(result.get("ir_pfu"), dict):
        return result["ir_pfu"]["montant"]
    if "ir_pfu_12_8" in result:
        return result["ir_pfu_12_8"]
    if foyer.get("options_fiscales", {}).get("revenus_capital", "pfu") != "pfu" or not pfu_data:
        return 0
    r = foyer["revenus"]
    base = (r.get("dividendes_bruts", 0) + r.get("interets_rcm", 0)
            + r.get("plus_values_mobilieres", 0) + r.get("crypto_plus_values", 0))
    return round(base * pfu_data["pfu"]["taux_ir"])


def reductions_credits(foyer, result, niches, pfu_data):
    """Passe de l'impôt après décote à l'impôt net, puis au solde à payer ou à rembourser."""
    cfg = niches["parametres_calcul_rici"]
    plaf = niches["plafonnement_global"]
    rc = foyer.get("reductions_credits", {})
    pas = foyer.get("prelevement_a_la_source", {})
    f = foyer["foyer"]

    # Réductions : dans le plafond global (10 000 €), dans le plafond majoré
    # (18 000 €, outre-mer et SOFICA), hors plafond.
    dons = reduction_dons(rc, result["rni"], cfg["dons"])
    pinel_metro = rc.get("pinel_reductions_annuelles", 0)
    pinel_om = rc.get("pinel_outre_mer_reductions_annuelles", 0)
    for inv in rc.get("pinel_investissements", []):
        if inv.get("outre_mer", False):
            pinel_om += fraction_pinel(inv, cfg["pinel"])
        else:
            pinel_metro += fraction_pinel(inv, cfg["pinel"])
    scolarite = reduction_scolarite(rc.get("scolarite", {}), niches)

    red_10k = pinel_metro + rc.get("autres_reductions_dans_plafond", 0)
    red_18k = pinel_om + rc.get("autres_reductions_plafond_18000", 0)
    red_hors = dons["montant"] + scolarite + rc.get("autres_reductions_hors_plafond", 0)

    # Crédits : emploi à domicile et garde entrent dans le plafond global
    emploi = credit_emploi_domicile(rc.get("emploi_domicile", {}), f.get("nb_enfants_charge", 0),
                                    f.get("nb_enfants_alternee", 0), cfg["emploi_a_domicile"])
    garde = credit_garde_enfants(rc.get("garde_enfants", []), cfg["garde_enfants_moins_6_ans"])
    cred_10k = emploi["montant"] + garde["montant"] + rc.get("autres_credits_dans_plafond", 0)
    cred_hors = rc.get("autres_credits_hors_plafond", 0)
    pfnl = rc.get("prelevement_forfaitaire_deja_verse", 0)

    impot_bareme = round(result["impot_apres_decote"])
    ir_prop = impot_proportionnel(foyer, result, pfu_data)
    reductions_total = red_10k + red_18k + red_hors
    credits_total = cred_10k + cred_hors + pfnl

    # Plafonnement global (art. 200-0 A) : l'avantage est mesuré par différence
    # entre l'impôt calculé sans et avec les avantages plafonnés.
    net_tout, reductions_imputees = imputer(impot_bareme, reductions_total, ir_prop, credits_total)
    net_sans_10k, _ = imputer(impot_bareme, reductions_total - red_10k, ir_prop, credits_total - cred_10k)
    net_sans_plafonnes, _ = imputer(impot_bareme, red_hors, ir_prop, cred_hors + pfnl)
    avantages_10k = net_sans_10k - net_tout
    avantages_18k = net_sans_plafonnes - net_sans_10k
    excedent_10k = max(0, avantages_10k - plaf["plafond_metropole"])
    excedent_18k = max(0, min(avantages_10k, plaf["plafond_metropole"]) + avantages_18k
                       - plaf["plafond_investissements_outre_mer"])
    excedent_plafonnement = excedent_10k + excedent_18k

    impot_net = net_tout + excedent_plafonnement

    # Solde (art. 1665 bis : l'avance de janvier est reprise à la liquidation)
    cehr_montant = result["cehr"]
    ps = result["prelevements_sociaux"]
    solde_ir = (impot_net + cehr_montant
                - pas.get("retenue_a_la_source", 0) - pas.get("acomptes_ir", 0)
                + pas.get("avance_rici_percue", 0)
                + rc.get("emploi_domicile", {}).get("avance_immediate_percue", 0))
    solde_ps = ps - pas.get("acomptes_ps", 0)

    return {
        "impot_bareme_apres_decote": impot_bareme,
        "reductions": {
            "dons": dons,
            "pinel": pinel_metro,
            "pinel_outre_mer": pinel_om,
            "scolarite": scolarite,
            "autres_dans_plafond": rc.get("autres_reductions_dans_plafond", 0),
            "autres_plafond_18000": rc.get("autres_reductions_plafond_18000", 0),
            "autres_hors_plafond": rc.get("autres_reductions_hors_plafond", 0),
            "total": reductions_total,
            "imputees": reductions_imputees,
            "perdues": reductions_total - reductions_imputees,
        },
        "impot_proportionnel": ir_prop,
        "plafonnement_global": {
            "avantages_plafond_10000": avantages_10k,
            "avantages_plafond_18000": avantages_18k,
            "excedent_reintegre": excedent_plafonnement,
        },
        "impot_avant_credits": impot_bareme - reductions_imputees + ir_prop + excedent_plafonnement,
        "credits": {
            "emploi_domicile": emploi,
            "garde_enfants": garde,
            "autres_dans_plafond": rc.get("autres_credits_dans_plafond", 0),
            "autres_hors_plafond": cred_hors,
            "prelevement_forfaitaire_deja_verse": pfnl,
            "total": credits_total,
        },
        "impot_net": impot_net,
        "cehr": cehr_montant,
        "solde": {
            "impot_sur_le_revenu": solde_ir,
            "prelevements_sociaux": solde_ps,
            "total": solde_ir + solde_ps,
            "sens": "à payer" if solde_ir + solde_ps > 0 else ("à rembourser" if solde_ir + solde_ps < 0 else "nul"),
        },
        "_note": "Solde > 0 : à payer ; < 0 : remboursement. Seuils de recouvrement et de "
                 "restitution non appliqués. PS limités à ceux que calcule le script.",
    }


def afficher_reductions_credits(rc):
    red = rc["reductions"]
    cred = rc["credits"]
    plaf = rc["plafonnement_global"]
    print(f"  Impôt du barème après décote .... {rc['impot_bareme_apres_decote']:>10} €")
    if red["dons"]["montant"]:
        print(f"    └ réduction dons .............. {red['dons']['montant']:>10} €")
        if red["dons"]["excedent_reportable"]:
            print(f"      (excédent > 20 % reportable 5 ans : {red['dons']['excedent_reportable']} €)")
    if red["pinel"] or red["pinel_outre_mer"]:
        print(f"    └ réduction Pinel ............. {red['pinel'] + red['pinel_outre_mer']:>10} €")
    if red["scolarite"]:
        print(f"    └ réduction scolarité ......... {red['scolarite']:>10} €")
    autres = red["autres_dans_plafond"] + red["autres_plafond_18000"] + red["autres_hors_plafond"]
    if autres:
        print(f"    └ autres réductions ........... {autres:>10} €")
    print(f"  Réductions imputées ............. {-red['imputees']:>10} €")
    if red["perdues"]:
        print(f"    └ non imputées (perdues) ...... {red['perdues']:>10} €")
    if rc["impot_proportionnel"]:
        print(f"  Impôt proportionnel (PFU 12,8%) . {rc['impot_proportionnel']:>10} €")
    if plaf["excedent_reintegre"]:
        print(f"  Plafonnement global des niches .. {plaf['excedent_reintegre']:>10} €")
    print(f"  Impôt avant crédits ............. {rc['impot_avant_credits']:>10} €")
    if cred["emploi_domicile"]["montant"]:
        print(f"    └ crédit emploi à domicile .... {cred['emploi_domicile']['montant']:>10} €")
    if cred["garde_enfants"]["montant"]:
        print(f"    └ crédit garde d'enfants ...... {cred['garde_enfants']['montant']:>10} €")
    if cred["prelevement_forfaitaire_deja_verse"]:
        print(f"    └ prélèvement forfaitaire versé {cred['prelevement_forfaitaire_deja_verse']:>10} €")
    print(f"  Crédits et imputations .......... {-cred['total']:>10} €")
    print(f"  IMPÔT SUR LE REVENU NET ......... {rc['impot_net']:>10} €")
    s = rc["solde"]
    print(f"  Solde IR (+ CEHR, − PAS, + avance) {s['impot_sur_le_revenu']:>9} €")
    if s["prelevements_sociaux"]:
        print(f"  Solde PS ........................ {s['prelevements_sociaux']:>10} €")
    print(f"  ─────────────────────────────────────────────────")
    libelle = f"SOLDE {s['sens'].upper()} "
    print(f"  {libelle:.<32} {abs(s['total']):>10} €")
    print()


def main():
    p = argparse.ArgumentParser(description="Calculateur IR déterministe, par année de revenus")
    p.add_argument("--rni", type=float, help="Revenu net imposable (après abattements et déductions)")
    p.add_argument("--parts", type=float, help="Nombre de parts fiscales")
    p.add_argument("--parts-base", type=float, help="Parts hors enfants (1 célib, 2 couple)")
    p.add_argument("--rfr", type=float, help="RFR pour CEHR (optionnel)")
    p.add_argument("--base-ps-patrimoine", type=float, default=0,
                   help="Base PS revenus du patrimoine (PV mobilières, crypto) : 18,6 %% dès 2025")
    p.add_argument("--base-ps-placement", type=float, default=0,
                   help="Base PS produits de placement (dividendes, intérêts) : 17,2 %% en 2025")
    p.add_argument("--base-ps", type=float, default=0,
                   help="(déprécié) alias de --base-ps-placement, comportement 17,2 %% historique")
    p.add_argument("--base-pfu", type=float, default=0,
                   help="Revenus du capital soumis à l'IR forfaitaire du PFU (12,8 %%)")
    p.add_argument("--foyer", type=str, help="Chemin vers un foyer.json")
    p.add_argument("--annee", type=int, help="Année de revenus (millésime data/revenus-AAAA/)")
    p.add_argument("--bareme", type=str, help="Fichier barème explicite (prioritaire sur --annee)")
    p.add_argument("--pfu", type=str, help="Fichier PFU / PS explicite (prioritaire sur --annee)")
    p.add_argument("--json", action="store_true", help="Sortie JSON")
    args = p.parse_args()

    foyer = load_json(args.foyer) if args.foyer else None
    annee_foyer = annee_du_foyer(foyer, args.annee) if foyer else None
    annee = args.annee if args.annee is not None else annee_foyer
    if foyer and annee_foyer is None:
        # Foyer mono-année : _meta.annee_revenus choisit le millésime, comme "annees" pour un multi-année.
        annee_meta = (foyer.get("_meta") or {}).get("annee_revenus")
        if annee_meta is not None:
            if annee is None:
                annee = int(annee_meta)
            elif annee != int(annee_meta):
                sys.exit(f"Le foyer porte _meta.annee_revenus = {annee_meta}, mais --annee {annee} est demandé : "
                         "calculer une année avec les règles d'une autre est l'erreur que les millésimes évitent.")
    foyer = foyer_de_l_annee(foyer, annee_foyer) if foyer else None

    fichiers = fichiers_millesime(annee)
    bareme = load_json(args.bareme or fichiers["bareme"])
    pfu_path = args.pfu or fichiers["pfu"]
    pfu_data = load_json(pfu_path) if Path(pfu_path).exists() else None

    if foyer:
        residence = foyer["foyer"].get("residence_fiscale", "FR")
        if residence not in ("FR", "", None) or "non_resident" in foyer:
            sys.exit("Non-résident : calcul non pris en charge par ce script (taux minimum de l'art. 197 A, "
                     "retenue à la source de l'art. 119 bis, 2, prélèvements sociaux propres aux non-résidents). "
                     "Voir references/non-residents.md.")
        result = from_foyer(foyer, bareme, pfu_data)
    else:
        if args.rni is None or args.parts is None:
            p.error("--rni et --parts requis sauf si --foyer est utilisé")
        parts_base = args.parts_base if args.parts_base else (2.0 if args.parts >= 2 else 1.0)
        result = calc(
            rni=args.rni,
            parts=args.parts,
            parts_base=parts_base,
            bareme=bareme,
            rfr=args.rfr,
            base_ps_patrimoine=args.base_ps_patrimoine,
            base_ps_placement=args.base_ps_placement + args.base_ps,
            pfu_data=pfu_data,
            base_pfu_ir=args.base_pfu,
        )
    if foyer and ("reductions_credits" in foyer or "prelevement_a_la_source" in foyer):
        niches = load_json(fichiers["niches"])
        if "parametres_calcul_rici" not in niches:
            sys.exit(f"Réductions, crédits et solde non disponibles pour les revenus {annee} : "
                     f"{fichiers['niches'].name} de ce millésime ne porte pas parametres_calcul_rici. "
                     "Retirer reductions_credits et prelevement_a_la_source pour obtenir l'impôt avant réductions.")
        result["reductions_credits"] = reductions_credits(foyer, result, niches, pfu_data)

    if args.json:
        print(json.dumps(result, indent=2, ensure_ascii=False))
    else:
        print()
        print(f"  RNI ............................. {result['rni']:>10} €")
        print(f"  Parts ........................... {result['parts']:>10}")
        print(f"  Quotient par part ............... {result['quotient_par_part']:>10} €")
        print(f"  Impôt brut (après QF) ........... {result['impot_brut_apres_qf']:>10} €")
        qf = result["qf_details"]
        if qf["gain_qf_reel"]:
            status = "PLAFONNE" if qf["plafonne"] else "non plafonné"
            print(f"    └ gain QF réel / max .......... {qf['gain_qf_reel']:>6} / {qf['gain_qf_max']} € ({status})")
        print(f"  Décote .......................... {-result['decote']:>10} €")
        print(f"  Impôt après décote .............. {result['impot_apres_decote']:>10} €")
        if result["ir_pfu"]["montant"]:
            print(f"  IR forfaitaire PFU 12,8% ........ {result['ir_pfu']['montant']:>10} €")
        if result["prelevements_sociaux"]:
            det = result.get("ps_details") or {}
            pat = det.get("patrimoine", {})
            pla = det.get("placement", {})
            if pat.get("base"):
                print(f"  PS {pat['taux']*100:.1f}% revenus patrimoine ...... {pat['montant']:>10} €")
            if pla.get("base"):
                print(f"  PS {pla['taux']*100:.1f}% produits placement ...... {pla['montant']:>10} €")
            fon = det.get("foncier", {})
            if fon.get("base"):
                print(f"  PS {fon['taux']*100:.1f}% revenus fonciers ........ {fon['montant']:>10} €")
            print(f"  PS total revenus capital ........ {result['prelevements_sociaux']:>10} €")
        if result["cehr"]:
            print(f"  CEHR ............................ {result['cehr']:>10} €")
        print(f"  ─────────────────────────────────────────────────")
        print(f"  TOTAL (avant réductions/crédits)  {result['total_a_payer']:>10} €")
        print()
        for a in result.get("_avertissements", []):
            print(f"  ! {a}")
        if result.get("_avertissements"):
            print()
        if "reductions_credits" in result:
            afficher_reductions_credits(result["reductions_credits"])


if __name__ == "__main__":
    main()
