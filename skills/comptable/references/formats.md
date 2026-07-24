# Formats de Sortie

## Écriture Comptable

```
Date: JJ/MM/AAAA
Libellé: [Description]
Journal: [AC/VE/BA/OD]

  Débit   | Crédit  | Compte | Libellé
----------|---------|--------|--------
  XXX,XX  |         | 6XXXXX | [Intitulé]
          | XXX,XX  | 4XXXXX | [Intitulé]
```

## Journal Entries JSON

```json
{
  "num": 1,
  "date": "2025-03-06",
  "journal": "BQ",
  "ref": "QTO-001",
  "label": "Achat fournitures",
  "lines": [
    { "account": "606", "debit": 100.00, "credit": 0 },
    { "account": "5121", "debit": 0, "credit": 100.00 }
  ]
}
```

## Liste de Risques

```
🔴 CRITIQUE: [Risque majeur, action immédiate]
🟠 ATTENTION: [Risque modéré, à traiter]
🟡 INFO: [Point de vigilance]
```
