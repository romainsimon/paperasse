# Note de Crédit (Avoir)

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
│  NOTE DE CRÉDIT N° {{avoir.number}}                             │
│  Date : {{avoir.date}}                                          │
│                                                                 │
│  En référence à la facture N° {{invoice.number}}                │
│  du {{invoice.date}}                                            │
│                                                                 │
│  Client :                                                       │
│  {{client.name}}                                                │
│  {{client.address}}                                             │
│  BCE : {{client.bce}}                                           │
│  TVA : BE{{client.bce}}                                         │
│                                                                 │
│  Motif : {{avoir.reason}}                                       │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Désignation               Qté    PU HTVA     Montant HTVA     │
│  ─────────────────────────────────────────────────────────────  │
│  {{line.description}}      {{n}}  {{pu}} EUR  -{{total}} EUR    │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│                              Total HTVA :    -{{total_ht}} EUR  │
│                              TVA (21%) :     -{{tva}} EUR       │
│                              Total TVAC :    -{{total_ttc}} EUR │
│                                                                 │
│  OU (si franchise TVA art. 56bis CTVA) :                        │
│                              Total :         -{{total}} EUR     │
│  TVA non applicable — article 56bis du Code de la TVA          │
│                                                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  Cette note de crédit sera déduite de votre prochaine facture   │
│  / remboursée par virement.                                     │
│                                                                 │
│  Facture électronique transmise via Peppol                      │
│  (ID Peppol : 0208:{{company.bce}})                             │
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

## Taux TVA belges applicables

| Taux | Domaine d'application |
|------|----------------------|
| **21%** | Taux standard (biens et services en général) |
| **12%** | Produits alimentaires transformés, restauration, certains travaux immobiliers |
| **6%** | Produits alimentaires de base, médicaments, livres, travaux de rénovation résidentielle |
| **0%** | Journaux quotidiens, certaines opérations intracommunautaires et exportations |

## Règles

- La note de crédit **doit toujours référencer** la facture d'origine (numéro + date)
- Les montants sont en **négatif** (ou clairement identifiés comme rectification)
- La note de crédit suit la **même séquence de numérotation** que les factures (ou une séquence préfixée NC-)
- Une note de crédit ne peut **pas être antidatée** : la date doit être celle de l'émission effective
- En Belgique, le terme officiel est **note de crédit** ; le terme "avoir" est également compris et utilisé couramment
- **Peppol B2B** : depuis le 1er janvier 2026, les notes de crédit B2B doivent également être transmises via Peppol au format UBL 2.1 / Peppol BIS 3.0 (AR du 29 octobre 2024)
