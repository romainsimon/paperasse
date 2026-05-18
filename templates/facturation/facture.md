# Facture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  {{company.name}}                                               │
│  {{company.legal_form}}                                         │
│  {{company.address}}                                            │
│  BCE : {{company.bce}}                                          │
│  TVA : BE{{company.bce}}                                        │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  FACTURE N° {{invoice.number}}                                  │
│  Date : {{invoice.date}}                                        │
│  Échéance : {{invoice.due_date}}                                │
│                                                                 │
│  Client :                                                       │
│  {{client.name}}                                                │
│  {{client.address}}                                             │
│  BCE : {{client.bce}}                                           │
│  TVA : BE{{client.bce}}                                         │
│                                                                 │
│  Catégorie : {{invoice.category}}                               │
│  Adresse de livraison : {{invoice.delivery_address}}            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Désignation               Qté    PU HTVA     Montant HTVA     │
│  ─────────────────────────────────────────────────────────────  │
│  {{line.description}}      {{n}}  {{pu}} EUR  {{total}} EUR     │
│  {{line.description}}      {{n}}  {{pu}} EUR  {{total}} EUR     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                              Total HTVA :    {{total_ht}} EUR   │
│                              TVA (21%) :     {{tva}} EUR        │
│                              Total TVAC :    {{total_ttc}} EUR  │
│                                                                 │
│  OU (si franchise TVA art. 56bis CTVA) :                        │
│                              Total :         {{total}} EUR      │
│  TVA non applicable — article 56bis du Code de la TVA          │
│                                                                 │
│  OU (si autoliquidation intra-UE) :                             │
│  Autoliquidation — TVA due par le cocontractant                 │
│  (art. 51 § 2 CTVA / art. 44 CTVA si exonéré)                  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Conditions de règlement :                                      │
│  {{payment.terms_label}}                                        │
│  Mode de paiement : {{payment.methods}}                         │
│                                                                 │
│  Coordonnées bancaires :                                        │
│  IBAN : {{payment.iban}}                                        │
│  BIC : {{payment.bic}}                                          │
│                                                                 │
│  En cas de retard de paiement, des intérêts de retard au        │
│  taux légal belge (publié semestriellement au Moniteur belge)   │
│  seront dus de plein droit, ainsi qu'une indemnité forfaitaire  │
│  de recouvrement de 40 EUR (loi du 2 août 2002, art. 6).       │
│                                                                 │
│  Facture électronique transmise via Peppol                      │
│  (ID Peppol : 0208:{{company.bce}})                             │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Placeholders

| Placeholder | Source | Obligatoire |
|------------|--------|-------------|
| `company.*` | company.json | Oui |
| `company.bce` | company.json | Oui — format 0xxx.xxx.xxx |
| `client.*` | Fourni par l'utilisateur | Oui |
| `client.bce` | Fourni par l'utilisateur | Oui (B2B assujetti à la TVA) |
| `invoice.number` | Séquence auto (company.json invoicing) | Oui — numérotation séquentielle unique |
| `invoice.date` | Date du jour ou fournie | Oui |
| `invoice.due_date` | Calculée depuis payment.default_terms | Oui |
| `invoice.category` | "Prestation de services" / "Livraison de biens" / "Mixte" | Oui (Peppol B2B) |
| `invoice.delivery_address` | Fourni si différent de client.address | Conditionnel |
| `line.*` | Fourni par l'utilisateur | Oui |
| `payment.*` | company.json payment | Oui |
| `payment.iban` | company.json — format BE + 14 chiffres | Oui |

## Taux TVA belges applicables

| Taux | Domaine d'application |
|------|----------------------|
| **21%** | Taux standard (biens et services en général) |
| **12%** | Produits alimentaires transformés, restauration, certains travaux immobiliers |
| **6%** | Produits alimentaires de base, médicaments, livres, travaux de rénovation résidentielle |
| **0%** | Journaux quotidiens, certaines opérations intracommunautaires et exportations |

## Mentions spéciales à ajouter selon le contexte

| Contexte | Mention |
|----------|---------|
| Franchise TVA (art. 56bis CTVA) | "TVA non applicable — article 56bis du Code de la TVA" |
| Autoliquidation intra-UE | "Autoliquidation — TVA due par le cocontractant (art. 51 § 2 CTVA)" |
| Export hors UE | "Exonération de TVA — art. 39 CTVA" |
| Livraison intracommunautaire | "Exonération de TVA — art. 39bis CTVA" |
| Exonération secteur spécifique | "Exonération de TVA — art. 44 CTVA" |
| Escompte | "Escompte de X% pour paiement anticipé sous Y jours" |
| Acompte | "Facture d'acompte. Solde à facturer : {{restant}} EUR" |
| Peppol B2B (obligatoire depuis 01/01/2026) | "Facture électronique transmise via Peppol (ID : 0208:{{company.bce}})" |

> **Peppol B2B** : depuis le 1er janvier 2026 (AR du 29 octobre 2024), la facturation électronique B2B est obligatoire en Belgique. Le format requis est UBL 2.1 / Peppol BIS 3.0. L'identifiant Peppol d'une société belge est construit sur la base de son numéro BCE (scheme 0208).
