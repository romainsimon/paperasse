# Formats de Facturation Électronique (Belgique)

`last_updated: 2026-05-15`

## Contexte belge

Depuis le 1er janvier 2026, la facturation électronique B2B est obligatoire en Belgique. Le format imposé est **Peppol BIS 3.0** (UBL 2.1 conforme EN 16931), transmis via le réseau **Peppol** (hub belge : Mercurius).

Contrairement à la France (Factur-X / CII), la Belgique a adopté le standard **UBL** (Universal Business Language) comme format principal.

---

## Le standard Peppol BIS 3.0 (UBL)

| Élément | Détail |
|---------|--------|
| Standard | Peppol BIS Billing 3.0 |
| Format XML | UBL 2.1 (ISO/IEC 19845) |
| Norme européenne | EN 16931 (directive 2014/55/UE) |
| Réseau de transmission | Peppol |
| Hub belge | Mercurius (https://mercurius.belgium.be) |
| Identifiant émetteur/récepteur | `0208:[numéro BCE sans points]` |

### Structure minimale XML Peppol BIS 3.0

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2"
         xmlns:cbc="urn:oasis:names:specification:ubl:schema:xsd:CommonBasicComponents-2"
         xmlns:cac="urn:oasis:names:specification:ubl:schema:xsd:CommonAggregateComponents-2">

  <!-- Profil Peppol BIS 3.0 -->
  <cbc:CustomizationID>urn:cen.eu:en16931:2017#compliant#urn:fdc:peppol.eu:2017:poacc:billing:3.0</cbc:CustomizationID>
  <cbc:ProfileID>urn:fdc:peppol.eu:2017:poacc:billing:01:1.0</cbc:ProfileID>

  <!-- En-tête -->
  <cbc:ID>F-2026-001</cbc:ID>
  <cbc:IssueDate>2026-09-15</cbc:IssueDate>
  <cbc:DueDate>2026-10-15</cbc:DueDate>
  <cbc:InvoiceTypeCode>380</cbc:InvoiceTypeCode>
  <cbc:DocumentCurrencyCode>EUR</cbc:DocumentCurrencyCode>

  <!-- Vendeur (émetteur) -->
  <cac:AccountingSupplierParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0208">0123456789</cbc:EndpointID>
      <cac:PartyName><cbc:Name>Ma SRL</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Rue de la Loi 1</cbc:StreetName>
        <cbc:CityName>Bruxelles</cbc:CityName>
        <cbc:PostalZone>1000</cbc:PostalZone>
        <cac:Country><cbc:IdentificationCode>BE</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyLegalEntity>
        <cbc:RegistrationName>Ma SRL</cbc:RegistrationName>
        <cbc:CompanyID schemeID="0208">0123456789</cbc:CompanyID>
      </cac:PartyLegalEntity>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>BE0123456789</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingSupplierParty>

  <!-- Acheteur (récepteur) -->
  <cac:AccountingCustomerParty>
    <cac:Party>
      <cbc:EndpointID schemeID="0208">0987654321</cbc:EndpointID>
      <cac:PartyName><cbc:Name>Client SA</cbc:Name></cac:PartyName>
      <cac:PostalAddress>
        <cbc:StreetName>Avenue Louise 50</cbc:StreetName>
        <cbc:CityName>Bruxelles</cbc:CityName>
        <cbc:PostalZone>1050</cbc:PostalZone>
        <cac:Country><cbc:IdentificationCode>BE</cbc:IdentificationCode></cac:Country>
      </cac:PostalAddress>
      <cac:PartyTaxScheme>
        <cbc:CompanyID>BE0987654321</cbc:CompanyID>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:PartyTaxScheme>
    </cac:Party>
  </cac:AccountingCustomerParty>

  <!-- Totaux TVA -->
  <cac:TaxTotal>
    <cbc:TaxAmount currencyID="EUR">210.00</cbc:TaxAmount>
    <cac:TaxSubtotal>
      <cbc:TaxableAmount currencyID="EUR">1000.00</cbc:TaxableAmount>
      <cbc:TaxAmount currencyID="EUR">210.00</cbc:TaxAmount>
      <cac:TaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>21</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:TaxCategory>
    </cac:TaxSubtotal>
  </cac:TaxTotal>

  <!-- Montants -->
  <cac:LegalMonetaryTotal>
    <cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
    <cbc:TaxExclusiveAmount currencyID="EUR">1000.00</cbc:TaxExclusiveAmount>
    <cbc:TaxInclusiveAmount currencyID="EUR">1210.00</cbc:TaxInclusiveAmount>
    <cbc:PayableAmount currencyID="EUR">1210.00</cbc:PayableAmount>
  </cac:LegalMonetaryTotal>

  <!-- Ligne de facture -->
  <cac:InvoiceLine>
    <cbc:ID>1</cbc:ID>
    <cbc:InvoicedQuantity unitCode="HUR">10</cbc:InvoicedQuantity>
    <cbc:LineExtensionAmount currencyID="EUR">1000.00</cbc:LineExtensionAmount>
    <cac:Item>
      <cbc:Description>Développement application web</cbc:Description>
      <cbc:Name>Prestation de services</cbc:Name>
      <cac:ClassifiedTaxCategory>
        <cbc:ID>S</cbc:ID>
        <cbc:Percent>21</cbc:Percent>
        <cac:TaxScheme><cbc:ID>VAT</cbc:ID></cac:TaxScheme>
      </cac:ClassifiedTaxCategory>
    </cac:Item>
    <cac:Price>
      <cbc:PriceAmount currencyID="EUR">100.00</cbc:PriceAmount>
    </cac:Price>
  </cac:InvoiceLine>
</Invoice>
```

---

## Codes TypeCode (types de document)

| Code | Type de document |
|------|-----------------|
| 380 | Facture |
| 381 | Note de crédit (avoir) |
| 386 | Facture d'acompte |
| 389 | Autofacturation |

## Codes TVA (catégories)

| Code | Signification | Taux belge |
|------|---------------|------------|
| S | Standard (imposable) | 21%, 12%, 6% |
| Z | Zéro (taux zéro) | 0% |
| E | Exonéré | Export, livraisons IC |
| AE | Autoliquidation | Services intra-UE B2B |
| O | Hors champ | Opérations non soumises |

---

## Identifiant Peppol belge

L'identifiant Peppol d'une entreprise belge est dérivé de son numéro BCE :

```
Format : 0208:[numéro BCE sans points]
Exemple : 0208:0123456789
```

Le schéma `0208` est le code pays Peppol pour la Belgique (numéro BCE).

---

## Prestataires Peppol belges agréés

Pour transmettre des factures Peppol, l'entreprise doit passer par un prestataire connecté au réseau Peppol :

| Prestataire | Site | Notes |
|-------------|------|-------|
| Clearfacts | clearfacts.be | Comptabilité + Peppol |
| Unifiedpost | unifiedpost.com | Plateforme documentaire |
| Isabel | isabel.eu | Services financiers |
| Qonto | qonto.com | Banque + Peppol belge |
| Paiements.online | paiements.online | Spécialiste B2B |
| Odoo | odoo.com | ERP avec connecteur Peppol |

---

## Validation d'une facture Peppol

Un document Peppol BIS 3.0 peut être validé avec :

- **Schémas XSD officiels** UBL 2.1 (OASIS)
- **Règles Schematron** EN 16931 + Peppol BIS 3.0
- **Validateur en ligne** : https://www.mercurius.belgium.be (portail de test)
- **Validateur Peppol** : https://peppol.helger.com/en-index.html (outil communautaire)

---

## Bibliothèques open source pour générer du Peppol UBL

### Node.js

| Lib | Repo | Fonctionnalité |
|-----|------|----------------|
| **peppol-js** | Diverses | Génère UBL Peppol BIS 3.0 |
| **xmlbuilder2** | github.com/oozcitak/xmlbuilder2 | Construction XML générique |

### Python

| Lib | Repo | Fonctionnalité |
|-----|------|----------------|
| **peppol-validation** | Communauté | Validation Peppol |
| **lxml** | Standard | Génération et validation XML |

### Workflow de génération

```
1. Données facture (company.json + données client BCE + lignes)
     ↓
2. Générer le XML UBL Peppol BIS 3.0
     ↓
3. Valider contre les schémas XSD + Schematron
     ↓
4. Transmettre au prestataire Peppol (API ou portail)
     ↓
5. Le prestataire route via Mercurius vers la PA du client
```

---

## Comparaison avec la France (Factur-X)

| Aspect | Belgique | France |
|--------|----------|--------|
| Format | UBL 2.1 (Peppol BIS 3.0) | Factur-X (PDF/A-3 + XML CII) |
| Réseau | Peppol / Mercurius | Plateformes Agréées (PA) + PPF |
| Obligation B2B | 01/01/2026 | 01/09/2026 (réception) / 2027 (émission PME) |
| Identifiant | Numéro BCE (0208:...) | SIRET (0002:...) |
| Hub gouvernemental | Mercurius.belgium.be | PPF (impots.gouv.fr) |

> En Belgique, les factures PDF simples restent techniquement valables pour le B2C et les situations hors champ Peppol, mais le Peppol est obligatoire pour le B2B domestique depuis le 01/01/2026.
