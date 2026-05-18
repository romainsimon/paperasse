# Arborescence des fichiers

Convention de nommage et rangement pour tous les fichiers comptables.

`last_updated: 2026-05-15`

## Structure

```
data/
├── transactions/              # Transactions récupérées par les connecteurs (auto)
│   ├── qonto-main.json        # Format : qonto-{slug-compte}.json
│   ├── stripe-saas.json       # Format : stripe-{id-compte}.json
│   ├── stripe-boutique.json
│   └── stripe-summary.json    # Résumé généré automatiquement
├── imports/                   # Relevés bancaires importés manuellement
│   ├── bnp/                   # Un dossier par banque (slug du nom)
│   │   ├── releve-2025-01.csv
│   │   ├── releve-2025-02.csv
│   │   └── ...
│   └── ing/
│       └── releve-2025-01.ofx
├── factures/                  # Factures fournisseurs et clients
│   ├── fournisseurs/
│   │   └── 2025/
│   │       ├── 2025-01-15_hetzner_29.00.pdf
│   │       ├── 2025-02-10_ovh_15.00.pdf
│   │       └── ...
│   └── clients/
│       └── 2025/
│           ├── F-2025-001_client-a_290.00.pdf
│           └── ...
├── journal-entries.json       # Journal comptable consolidé (PCMN)
├── pcmn_2026.json             # Plan Comptable Minimum Normalisé (open data CNC-CBN)
├── nomenclature-isoc.csv      # Nomenclature déclaration ISOC 275
└── sources.json               # Métadonnées des sources de données

output/                        # Fichiers générés (états financiers, exports, PDFs)
├── bilan.md
├── compte-de-resultat.md
├── balance.md
├── livre-journal-YYYY.txt     # Export livre-journal normalisé belge (art. 3 loi comptable)
└── pdf/
    ├── bilan.pdf
    ├── compte-de-resultat.pdf
    └── ...
```

## Conventions de nommage

### Transactions automatiques (`data/transactions/`)

Générées par les connecteurs, ne pas modifier manuellement.

| Source | Nom du fichier | Exemple |
|--------|---------------|---------|
| Qonto | `qonto-{slug}.json` | `qonto-main.json` |
| Stripe | `stripe-{id}.json` | `stripe-saas.json` |

Le `slug` et `id` viennent de `company.json` (champ `id` dans `banks` et `stripe_accounts`).

### Imports manuels (`data/imports/`)

Un dossier par banque, nommé avec le slug du nom (minuscules, tirets).

| Format | Nommage | Exemple |
|--------|---------|---------|
| Relevé mensuel | `releve-YYYY-MM.{csv,ofx,xlsx}` | `releve-2025-03.csv` |
| Relevé trimestriel | `releve-YYYY-T{1,2,3,4}.csv` | `releve-2025-T1.csv` |
| Relevé annuel | `releve-YYYY.csv` | `releve-2025.csv` |
| Export brut | `export-YYYY-MM-DD.csv` | `export-2025-12-31.csv` |

### Factures fournisseurs (`data/factures/fournisseurs/`)

Rangées par année, nommées par date, fournisseur et montant.

```
YYYY-MM-DD_{fournisseur}_{montant}.pdf
```

Exemples :
- `2025-01-15_hetzner_29.00.pdf`
- `2025-03-01_anthropic_450.00.pdf`
- `2025-10-01_amazon_599.00.pdf`

### Factures clients (`data/factures/clients/`)

Rangées par année, nommées par numéro de facture, client et montant.

```
{numero}_{client}_{montant}.pdf
```

Exemples :
- `F-2025-001_client-a_290.00.pdf`
- `F-2025-002_client-b_540.00.pdf`

### Fichiers générés (`output/`)

Ne pas modifier manuellement. Régénérés à chaque exécution des scripts.

**Export livre-journal :** En Belgique, il n'existe pas de format standardisé équivalent au FEC français. L'obligation comptable belge est de tenir un livre-journal chronologique (art. 3 de la loi du 17 juillet 1975 relative à la comptabilité des entreprises). Le fichier `livre-journal-YYYY.txt` est un export du journal dans un format lisible et archivable.

## Fichiers de référence clés

| Fichier | Contenu | Usage |
|---------|---------|-------|
| `data/pcmn_2026.json` | Plan Comptable Minimum Normalisé complet | Référence comptes PCMN |
| `data/nomenclature-isoc.csv` | Nomenclature déclaration ISOC 275 (SPF Finances) | Mapping comptes → lignes déclaration |
| `data/journal-entries.json` | Journal comptable consolidé | Source vérité écritures |
| `data/sources.json` | Métadonnées des connecteurs et imports | Configuration et traçabilité |

## Règles

1. **Ne jamais modifier les fichiers dans `data/transactions/`**. Ils sont régénérés par `npm run fetch`.
2. **Les imports manuels dans `data/imports/` ne sont pas supprimés**. Ils servent de pièces justificatives.
3. **Le dossier `output/` peut être vidé et régénéré** à tout moment avec les scripts.
4. **Pas de secrets dans les fichiers**. Les clés API sont dans `.env`, pas dans les noms de fichiers ni les données.
5. **Tout en minuscules, tirets pour séparer les mots**. Pas d'espaces, pas de caractères spéciaux dans les noms de fichiers.
6. **Conservation 10 ans** des pièces justificatives (art. 7 loi comptable 17 juillet 1975 et art. L123-22 C.com. belge).
