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

### Ressources partagées : source à la racine, copies dans les skills

Les ressources communes à plusieurs skills vivent à la racine du repo : `data/`, `scripts/`, `integrations/`, `templates/`, `company.example.json`. Chaque skill qui en a besoin en contient une **copie réelle**, pour rester autonome : le répertoire de plugins Claude refuse les liens symboliques dans les dossiers de skills, et un skill zippé seul doit fonctionner.

- Modifiez toujours la **source à la racine**, jamais la copie dans un skill.
- Lancez ensuite `npm run sync:skills` pour mettre les copies à jour, et committez les deux.
- `npm run test:skills` échoue si une copie a divergé de sa source.

La liste des copies est dans `scripts/sync-skill-copies.js` : `data/` dans comptable, controleur-fiscal et commissaire-aux-comptes ; `scripts/`, `integrations/` et `templates/` dans comptable ; `company.example.json` dans ces trois skills ; les scripts notaire dans `notaire/scripts/` ; le millésime 2025 du fiscaliste (`fiscaliste/data/revenus-2025/`) copié depuis `fiscaliste/data/`.

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
- `description` : 1024 caractères maximum, mots-clés « Triggers » compris. L'app Claude refuse de synchroniser la marketplace au-delà (#128). Vérifiez avec `npm run test:skills`.
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
