# Avoir (Note de Crédit)

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
│  AVOIR N° {{avoir.number}}                                      │
│  Date : {{avoir.date}}                                          │
│                                                                 │
│  En référence à la facture N° {{invoice.number}}                │
│  du {{invoice.date}}                                            │
│                                                                 │
│  Client :                                                       │
│  {{client.name}}                                                │
│  {{client.address}}                                             │
│  SIREN : {{client.siren}}                                       │
│                                                                 │
│  Motif : {{avoir.reason}}                                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Désignation               Qté    PU HT      Montant HT        │
│  ─────────────────────────────────────────────────────────────  │
│  {{line.description}}      {{n}}  {{pu}} EUR  -{{total}} EUR    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                              Total HT :     -{{total_ht}} EUR   │
│                              TVA (20%) :    -{{tva}} EUR        │
│                              Total TTC :    -{{total_ttc}} EUR  │
│                                                                 │
│  OU (si franchise en base) :                                    │
│                              Total :        -{{total}} EUR      │
│  TVA non applicable, article 293 B du Code général des impôts  │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Cet avoir sera déduit de votre prochaine facture               │
│  / remboursé par virement.                                      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Motifs courants

| Motif | Détail |
|-------|--------|
| Retour de marchandise | Biens retournés par le client |
| Erreur de facturation | Montant, quantité ou désignation incorrecte |
| Geste commercial | Remise accordée après facturation |
| Annulation | Prestation non réalisée |
| Réduction de prix | Rabais, remise, ristourne |

## Règles

- L'avoir **doit toujours référencer** la facture d'origine (numéro + date)
- Les montants sont en **négatif** (ou clairement identifiés comme rectification)
- L'avoir suit la **même séquence de numérotation** que les factures (ou une séquence préfixée AV-)
- Un avoir ne peut **pas être antidaté** : la date doit être celle de l'émission effective
