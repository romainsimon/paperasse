# Formats de Sortie (Belgique)

`last_updated: 2026-05-15`

## Écriture Comptable (PCMN)

```
Date: JJ/MM/AAAA
Libellé: [Description]
Journal: [AC/VE/BQ/OD]

  Débit   | Crédit  | Compte | Libellé
----------|---------|--------|--------
  XXX,XX  |         | 6XXXXX | [Intitulé PCMN]
          | XXX,XX  | 4XXXXX | [Intitulé PCMN]
```

## Journal Entries JSON (comptes PCMN)

```json
{
  "num": 1,
  "date": "2025-03-06",
  "journal": "BQ",
  "ref": "QTO-001",
  "label": "Achat fournitures bureau",
  "lines": [
    { "account": "615", "debit": 100.00, "credit": 0 },
    { "account": "550", "debit": 0, "credit": 100.00 }
  ]
}
```

**Comptes fréquents (PCMN) :**

| Usage | Compte PCMN |
|-------|-------------|
| Banque principale | 550 |
| Clients | 400 |
| Fournisseurs | 440 |
| TVA à récupérer | 410 |
| TVA à payer | 451 |
| ISOC à payer | 450 |
| Précompte professionnel | 452 |
| ONSS à payer | 455 |
| Prestations de services (CA) | 701 |
| Ventes marchandises (CA) | 700 |
| Achats services/sous-traitance | 604 |
| Services et biens divers | 61X |
| Rémunérations personnel | 620 |
| Rémunérations dirigeants | 622 |
| Charges ONSS patronales | 621 |
| Dotations aux amortissements | 630 |
| ISOC — charge exercice | 670 |

## Facture Belge (Mentions Obligatoires)

```
[Dénomination sociale]
[Forme juridique] — BCE [0xxx.xxx.xxx]
[Adresse siège social]
TVA BE[0xxx.xxx.xxx]
IBAN : BE[XX XXXX XXXX XXXX]  |  BIC : [XXXXXXXX]

FACTURE
N° : F-YYYY-NNN
Date : JJ/MM/AAAA
Date d'échéance : JJ/MM/AAAA

CLIENT :
[Dénomination client]
BCE [0xxx.xxx.xxx]  (ou numéro TVA si assujetti)
[Adresse client]

DESCRIPTION
─────────────────────────────────────────────────────
 Qté  │ Désignation           │ P.U. HTVA │ Total HTVA
──────┼───────────────────────┼───────────┼──────────
  1   │ [Prestation]          │  X XXX,XX │  X XXX,XX
──────┴───────────────────────┴───────────┴──────────
                               Total HTVA :  X XXX,XX
                               TVA 21%    :    XXX,XX
                               Total TVAC :  X XXX,XX

Catégorie : Prestation de services
Conditions de paiement : [délai]
Pénalités de retard : [taux]% + indemnité forfaitaire de 40 EUR

[Mention TVA si applicable]
```

**Numéro TVA belge :** Format `BE0xxx.xxx.xxx` (espace tous les 3 chiffres après BE0).

**BCE (numéro d'entreprise) :** Format `0xxx.xxx.xxx` (9 chiffres).

**IBAN belge :** Format `BE` + 14 chiffres (ex : `BE68 5390 0754 7034`).

## Mentions TVA Belges sur Factures

| Situation | Mention |
|-----------|---------|
| Franchise art. 56bis CTVA | *"Régime particulier de franchise — TVA non applicable"* |
| Exportation | *"Exonération de TVA — exportation, art. 39 CTVA"* |
| Livraison intracommunautaire | *"Exonération de TVA — livraison intracommunautaire, art. 39bis CTVA"* |
| Autoliquidation services intra-UE | *"Autoliquidation — TVA due par le preneur, art. 51 §2 CTVA"* |
| Cocontractant (construction) | *"Autoliquidation — régime cocontractant, art. 20 AR n°1"* |

## Facture Électronique Belge (Peppol / Mercurius)

Depuis le 1er janvier 2026, la facture électronique structurée est obligatoire pour les transactions B2B entre assujettis belges.

**Format standard :** Peppol BIS 3.0 (UBL 2.1 conforme EN 16931).

**Identifiant Peppol belge :** `0208:[numéro BCE sans points]` (ex : `0208:0123456789`).

**Réseau belge :** Mercurius — la plateforme de routage Peppol belge connectée aux réseaux gouvernementaux et privés.

**Structure minimale XML Peppol BIS 3.0 :**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>
  <cbc:ID>F-2026-001</cbc:ID>
  <cbc:IssueDate>2026-09-15</cbc:IssueDate>
  <cbc:DueDate>2026-10-15</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>

  <!-- Vendeur -->
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0208">0123456789</cbc:EndpointID>  <!-- BCE sans points -->
      <cac:PartyName><cbc:Name>Ma SRL</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Rue de la Loi 1</cbc:StreetName>
        <cbc:CityName>Bruxelles</cbc:CityName>
        <cbc:PostalZone>1000</cbc:PostalZone>
        <cac:Country><cbc:IdentificationCode>BE</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>BE0123456789</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>
  <!-- ... acheteur, lignes, totaux ... -->
</Invoice>
```

**Codes TypeCode :**

| Code | Type |
|------|------|
| 380 | Facture |
| 381 | Note de crédit (avoir) |
| 386 | Facture d'acompte |

## Liste de Risques

```
CRITIQUE: [Risque majeur, action immédiate]
ATTENTION: [Risque modéré, à traiter]
INFO: [Point de vigilance]
```

## Livre-Journal Normalisé Belge

Il n'existe pas en Belgique de format FEC standardisé comme en France. Le livre-journal belge est une obligation de tenue d'un registre chronologique des opérations (art. 3, loi du 17 juillet 1975).

**Format d'export recommandé (lisible et archivable) :**

```
LIVRE-JOURNAL — [Dénomination] — BCE [0xxx.xxx.xxx] — Exercice [YYYY]
Généré le : JJ/MM/AAAA

Num  | Date       | Journal | Réf.      | Libellé                | Compte | Débit      | Crédit
-----|------------|---------|-----------|------------------------|--------|------------|----------
0001 | 2025-01-15 | BQ      | QTO-001   | Paiement Hetzner       | 618    |     29,00  |
0001 | 2025-01-15 | BQ      | QTO-001   | Paiement Hetzner       | 550    |            |     29,00
...
     |            |         |           | TOTAL DÉBIT            |        | XX XXX,XX  |
     |            |         |           | TOTAL CRÉDIT           |        |            | XX XXX,XX
     |            |         |           | ÉQUILIBRE              |        |      0,00  |
```

**Conservation :** 10 ans (art. 7 de la loi du 17 juillet 1975).
