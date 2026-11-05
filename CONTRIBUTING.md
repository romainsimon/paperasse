# Contribuer à Paperasse

Vous avez un métier de la paperasse que vous aimeriez voir automatisé ? Les contributions sont les bienvenues.

## Ajouter un nouveau skill

1. Fork le repo
2. Créez un dossier au nom du métier en français (minuscules, tirets)
3. Ajoutez un `SKILL.md` avec frontmatter (name, description, last_updated)
4. Ajoutez un dossier `references/` avec les textes de loi et barèmes pertinents
5. Si possible, ajoutez des evals dans un dossier `evals/` (voir les skills existants pour le format)
6. Faites une PR

## Ajouter un millésime fiscal (nouvelle année de revenus)

Les données du skill `fiscaliste` sont rangées par année de revenus dans
`fiscaliste/data/revenus-AAAA/`. Les fichiers `fiscaliste/data/*.json` à la racine restent
ceux de l'**année courante** (on les modifie comme avant) ; le dossier de l'année courante n'en
contient que des liens. Pour passer à une nouvelle année après la LFI / LFSS (exemple 2025 → 2026) :

1. Figer l'année qui s'achève : remplacer les liens de `revenus-2025/` par des copies
   (`cp -L`), qui ne bougeront plus.
2. Mettre à jour les fichiers de la racine pour 2026 (`git mv bareme-ir-2025.json bareme-ir-2026.json`),
   avec `_meta.revenus` / `_meta.declaration` ; les clés suffixées par l'année
   (`taux_revenus_du_patrimoine_AAAA`…) prennent la nouvelle année.
3. Créer `revenus-2026/` avec des liens vers les fichiers de la racine (`bareme-ir.json` →
   `../bareme-ir-2026.json`).
4. Dans `fiscaliste/data/sources.json`, passer les entrées 2025 en `"file": "revenus-2025/…"`,
   `"update_frequency": "fige"`, et ajouter les entrées 2026. Mettre à jour les valeurs inlinées
   dans `fiscaliste/SKILL.md`.
5. Une valeur non encore publiée ou non vérifiée porte `"a_verifier": true` et une
   `note_verification` : jamais une valeur supposée.

Un `git diff --no-index fiscaliste/data/revenus-2025 fiscaliste/data/revenus-2026` montre alors
exactement ce que la loi de finances a changé.

## Convention de nommage

Noms de dossiers en français, en minuscules, avec tirets :

- `comptable` (expert-comptable)
- `controleur-fiscal` (contrôleur fiscal / simulation DGFIP)
- `commissaire-aux-comptes` (commissaire aux comptes)
- `notaire` (notaire)
- `avocat` (avocat d'affaires)
- `drh` (DRH / ressources humaines)

## Doctrine : skill = métier, pas outil

Un skill représente un **métier** (ou un rôle professionnel identifiable) et doit être **self-contained** : un utilisateur qui invoque `comptable` s'attend à ce qu'il couvre tout ce que fait un comptable, sans devoir combiner plusieurs skills.

**Critère de décision** pour un nouveau skill : « est-ce qu'un humain se présente avec cette casquette sur le marché du travail ? » Si oui → skill. Sinon → module partagé.

Les **canaux, APIs, outils transverses** (guichet unique INPI, API Entreprise, portails URSSAF/DGFiP, etc.) ne sont pas des skills. Ce sont des briques utilisées par plusieurs métiers.

### Code partagé via symlinks

Pour éviter la duplication tout en gardant les skills self-contained, le code partagé vit à la racine du repo et les skills le référencent par symlink :

```
paperasse/
├── integrations/
│   └── guichet-unique/        # client API INPI, soumission formalités
├── data/
│   └── formes-juridiques.json # codes INPI partagés
├── scripts/
│   └── submit-depot-comptes.js
├── comptable/
│   ├── SKILL.md
│   ├── integrations/guichet-unique -> ../../integrations/guichet-unique
│   └── data/formes-juridiques.json -> ../../data/formes-juridiques.json
└── notaire/
    ├── SKILL.md
    └── integrations/guichet-unique -> ../../integrations/guichet-unique
```

**Chevauchement ≠ duplication** : si `notaire` et un futur `avocat` font tous les deux des modifications statutaires, c'est fidèle à la réalité (les deux professions le font). La *logique* est partagée via les symlinks, le *framing métier* diffère dans chaque `SKILL.md` (le notaire rédige un acte authentique, l'avocat un acte SSP).

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
last_updated: "2026-03-25"
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
