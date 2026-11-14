# Facture

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│  {{company.name}}                                               │
│  {{company.legal_form}} au capital de {{company.capital}} EUR   │
│  {{company.address}}                                            │
│  SIRET : {{company.siret}}                                      │
│  RCS : {{company.rcs}}                                          │
│  TVA intracom : {{company.tva_intracom}}                        │
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
│  SIREN : {{client.siren}}                                       │
│  TVA intracom : {{client.tva_intracom}}                         │
│                                                                 │
│  Catégorie : {{invoice.category}}                               │
│  Adresse de livraison : {{invoice.delivery_address}}            │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Désignation               Qté    PU HT      Montant HT        │
│  ─────────────────────────────────────────────────────────────  │
│  {{line.description}}      {{n}}  {{pu}} EUR  {{total}} EUR     │
│  {{line.description}}      {{n}}  {{pu}} EUR  {{total}} EUR     │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                              Total HT :     {{total_ht}} EUR    │
│                              TVA (20%) :    {{tva}} EUR         │
│                              Total TTC :    {{total_ttc}} EUR   │
│                                                                 │
│  OU (si franchise en base) :                                    │
│                              Total :        {{total}} EUR       │
│  TVA non applicable, article 293 B du Code général des impôts  │
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
│  En cas de retard de paiement, une pénalité de {{penalty}}%     │
│  sera appliquée, ainsi qu'une indemnité forfaitaire de          │
│  recouvrement de 40 EUR (art. L441-10 et D441-5 C.com).        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Placeholders

| Placeholder | Source | Obligatoire |
|------------|--------|-------------|
| `company.*` | company.json | Oui |
| `client.*` | Fourni par l'utilisateur | Oui |
| `client.siren` | Fourni par l'utilisateur | Oui (B2B, à partir de sept. 2026) |
| `invoice.number` | Séquence auto (company.json invoicing) | Oui |
| `invoice.date` | Date du jour ou fournie | Oui |
| `invoice.due_date` | Calculée depuis payment.default_terms | Oui |
| `invoice.category` | "Prestation de services" / "Livraison de biens" / "Mixte" | Oui (à partir de sept. 2026) |
| `invoice.delivery_address` | Fourni si différent de client.address | Conditionnel (2026) |
| `line.*` | Fourni par l'utilisateur | Oui |
| `payment.*` | company.json payment | Oui |
| `penalty` | company.json payment.late_penalty_rate ou taux légal | Oui |

## Mentions spéciales à ajouter selon le contexte

| Contexte | Mention |
|----------|---------|
| Franchise TVA | "TVA non applicable, article 293 B du Code général des impôts" |
| Autoliquidation intra-UE | "Autoliquidation - TVA due par le preneur, article 283-2 du CGI" |
| Export hors UE | "Exonération de TVA, article 262 I du CGI" |
| Livraison intra-UE | "Exonération de TVA, article 262 ter I du CGI" |
| Sous-traitance BTP | "Autoliquidation, article 283 2 nonies du CGI" |
| Escompte | "Escompte de X% pour paiement anticipé sous Y jours" |
| Acompte | "Facture d'acompte. Solde à facturer : {{restant}} EUR" |
