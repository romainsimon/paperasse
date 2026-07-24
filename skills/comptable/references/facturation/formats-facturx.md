# Formats de Facturation Électronique

## Les trois formats acceptés

La réforme impose l'utilisation de formats structurés. Un simple PDF n'est pas conforme.

| Format | Standard | Structure | Usage principal |
|--------|----------|-----------|----------------|
| **Factur-X** | FR/DE (EN 16931) | PDF/A-3 + XML CII embarqué | France, Allemagne |
| **UBL** (Universal Business Language) | ISO/IEC 19845 | XML pur | Europe (standard OASIS) |
| **CII** (Cross Industry Invoice) | UN/CEFACT | XML pur | International |

## Factur-X

Factur-X est le format privilégié en France. C'est un **PDF/A-3 contenant un fichier XML embarqué** au format CII (Cross Industry Invoice).

### Avantages

- **Lisible par un humain** : le PDF s'ouvre comme n'importe quelle facture
- **Lisible par une machine** : le XML embarqué permet le traitement automatisé
- **Hybride** : compatible avec les process papier existants ET l'automatisation

### Profils Factur-X

Factur-X définit plusieurs profils, du plus simple au plus complet :

| Profil | Données | Usage |
|--------|---------|-------|
| **Minimum** | Identifiants, montant total, TVA globale | Archivage, conformité minimale |
| **Basic WL** | + Détail vendeur/acheteur, conditions paiement | Petites entreprises |
| **Basic** | + Lignes de facture | Usage courant |
| **EN 16931** (Comfort) | Conforme norme européenne complète | Standard recommandé |
| **Extended** | + Champs optionnels métier | Besoins spécifiques |

**Recommandation** : utiliser le profil **EN 16931** (Comfort) pour la conformité complète avec la réforme française.

### Structure XML CII

Le XML embarqué dans un Factur-X suit la structure CII (rsm:CrossIndustryInvoice) :

```xml
<?xml version="1.0" encoding="UTF-8"?>
<rsm:CrossIndustryInvoice
  xmlns:rsm="urn:un:unece:uncefact:data:standard:CrossIndustryInvoice:100"
  xmlns:ram="urn:un:unece:uncefact:data:standard:ReusableAggregateBusinessInformationEntity:100"
  xmlns:udt="urn:un:unece:uncefact:data:standard:UnqualifiedDataType:100">

  <!-- En-tête -->
  <rsm:ExchangedDocumentContext>
    <ram:GuidelineSpecifiedDocumentContextParameter>
      <ram:ID>urn:cen.eu:en16931:2017</ram:ID>
    </ram:GuidelineSpecifiedDocumentContextParameter>
  </rsm:ExchangedDocumentContext>

  <!-- Document -->
  <rsm:ExchangedDocument>
    <ram:ID>F-2026-001</ram:ID>                    <!-- Numéro facture -->
    <ram:TypeCode>380</ram:TypeCode>                <!-- 380=facture, 381=avoir -->
    <ram:IssueDateTime>                             <!-- Date émission -->
      <udt:DateTimeString format="102">20260915</udt:DateTimeString>
    </ram:IssueDateTime>
  </rsm:ExchangedDocument>

  <rsm:SupplyChainTradeTransaction>
    <!-- Vendeur -->
    <ram:ApplicableHeaderTradeAgreement>
      <ram:SellerTradeParty>
        <ram:Name>DevStudio SASU</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">12345678900014</ram:ID>  <!-- SIRET -->
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:LineOne>5 rue de la Paix</ram:LineOne>
          <ram:PostcodeCode>75002</ram:PostcodeCode>
          <ram:CityName>Paris</ram:CityName>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
        <ram:SpecifiedTaxRegistration>
          <ram:ID schemeID="VA">FR12345678901</ram:ID>  <!-- TVA intracom -->
        </ram:SpecifiedTaxRegistration>
      </ram:SellerTradeParty>

      <!-- Acheteur -->
      <ram:BuyerTradeParty>
        <ram:Name>Client SAS</ram:Name>
        <ram:SpecifiedLegalOrganization>
          <ram:ID schemeID="0002">98765432100014</ram:ID>
        </ram:SpecifiedLegalOrganization>
        <ram:PostalTradeAddress>
          <ram:CountryID>FR</ram:CountryID>
        </ram:PostalTradeAddress>
      </ram:BuyerTradeParty>
    </ram:ApplicableHeaderTradeAgreement>

    <!-- Livraison -->
    <ram:ApplicableHeaderTradeDelivery/>

    <!-- Paiement et totaux -->
    <ram:ApplicableHeaderTradeSettlement>
      <ram:InvoiceCurrencyCode>EUR</ram:InvoiceCurrencyCode>

      <ram:SpecifiedTradeSettlementHeaderMonetarySummation>
        <ram:LineTotalAmount>1500.00</ram:LineTotalAmount>    <!-- Total HT -->
        <ram:TaxBasisTotalAmount>1500.00</ram:TaxBasisTotalAmount>
        <ram:TaxTotalAmount currencyID="EUR">0.00</ram:TaxTotalAmount>
        <ram:GrandTotalAmount>1500.00</ram:GrandTotalAmount>  <!-- Total TTC -->
        <ram:DuePayableAmount>1500.00</ram:DuePayableAmount>
      </ram:SpecifiedTradeSettlementHeaderMonetarySummation>
    </ram:ApplicableHeaderTradeSettlement>
  </rsm:SupplyChainTradeTransaction>
</rsm:CrossIndustryInvoice>
```

### Codes TypeCode courants

| Code | Type de document |
|------|-----------------|
| 380 | Facture |
| 381 | Avoir (note de crédit) |
| 384 | Facture rectificative |
| 386 | Facture d'acompte |
| 389 | Autofacturation |

## UBL (Universal Business Language)

Format XML pur, standard OASIS. Utilisé dans de nombreux pays européens. Pas de composante PDF.

```xml
<Invoice xmlns="urn:oasis:names:specification:ubl:schema:xsd:Invoice-2">
  <ID>F-2026-001</ID>
  <IssueDate>2026-09-15</IssueDate>
  <InvoiceTypeCode>380</InvoiceTypeCode>
  <!-- ... -->
</Invoice>
```

## Bibliothèques open source

Pour générer des Factur-X en local (sans dépendre d'une PA) :

### Node.js

| Lib | Repo | Fonctionnalité |
|-----|------|----------------|
| **node-zugferd** | github.com/jslno/node-zugferd | Génère XML ZUGFeRD/Factur-X + embed dans PDF/A |
| **facturx** | github.com/stafyniaksacha/facturx | Génère Factur-X PDF-A/3 depuis PDF + XML |

### Python

| Lib | Repo | Fonctionnalité |
|-----|------|----------------|
| **factur-x** (Akretion) | github.com/akretion/factur-x | Référence, licence BSD, génère et parse Factur-X |
| **factur-x-ng** | github.com/invoice-x/factur-x-ng | Fork avec interfaces haut niveau |

### Workflow de génération locale

```
1. Données facture (company.json + données client + lignes)
     ↓
2. Générer le XML CII conforme EN 16931
     ↓
3. Générer le PDF de la facture (lisible humain)
     ↓
4. Embarquer le XML dans le PDF → Factur-X (PDF/A-3)
     ↓
5. Déposer le Factur-X sur la PA choisie pour transmission
```

## Validation

Un Factur-X peut être validé avec :
- Les schémas XSD officiels CII
- Les règles Schematron EN 16931
- Les outils en ligne de l'AIFE (Agence pour l'Informatique Financière de l'État)
