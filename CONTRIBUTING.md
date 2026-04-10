# Contribuer à Paperasse

Vous avez un métier de la paperasse que vous aimeriez voir automatisé ? Les contributions sont les bienvenues.

## Ajouter un nouveau skill

1. Fork le repo
2. Créez un dossier au nom du métier en français (minuscules, tirets)
3. Ajoutez un `SKILL.md` avec frontmatter (name, description, last_updated)
4. Ajoutez un dossier `references/` avec les textes de loi et barèmes pertinents
5. Si possible, ajoutez des evals dans un dossier `evals/` (voir les skills existants pour le format)
6. Faites une PR

## Convention de nommage

Noms de dossiers en français, en minuscules, avec tirets :

- `comptable` (expert-comptable)
- `controleur-fiscal` (contrôleur fiscal / simulation DGFIP)
- `commissaire-aux-comptes` (commissaire aux comptes)
- `notaire` (notaire)
- `avocat` (avocat d'affaires)
- `drh` (DRH / ressources humaines)

## Structure d'un skill

```
mon-skill/
├── SKILL.md              # Instructions pour l'agent (obligatoire)
├── references/           # Textes de loi, barèmes, données de référence
│   ├── texte-de-loi.md
│   └── bareme.md
└── evals/                # Tests automatisés (recommandé)
    ├── evals.json
    └── files/            # Fichiers de test (company.json, FEC, etc.)
```

## SKILL.md : frontmatter

```yaml
---
name: Mon Skill
description: Description courte du skill
last_updated: 2026-03-25
includes:
  - data/**
  - company.example.json
---
```

- `name` : nom affiché
- `description` : une ligne
- `last_updated` : date de dernière mise à jour (les skills de plus de 6 mois affichent un avertissement)
- `includes` : fichiers à inclure depuis la racine du repo (pour les données partagées)

## Evals

Chaque skill devrait avoir des evals qui vérifient les réponses de l'agent. Format : un fichier `evals.json` avec des cas de test (question + critères de validation). Voir `comptable/evals/` pour un exemple complet.

Boucle de validation recommandée :

```bash
# Planifier uniquement les skills impactés par la branche
uv run --project evals python evals/run_evals.py --changed-only --plan-only

# Exécuter les evals concernées en réutilisant le cache
uv run --project evals python evals/run_evals.py --changed-only --reuse-cache
```

## Licence

En contribuant, vous acceptez que votre contribution soit publiée sous licence MIT.
