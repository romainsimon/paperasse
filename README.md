<p align="center">
  <img src="assets/banner.jpg" alt="Paperasse" width="100%">
</p>

<h1 align="center">Paperasse</h1>

<p align="center">
  <b>Des skills pour agents IA spécialisés dans la bureaucratie française.</b>
</p>

<p align="center">
  <i>Parce que quelqu'un devait le faire, et ce quelqu'un n'a pas besoin de pause café.</i>
</p>

<p align="center">
  <a href="https://github.com/romainsimon/paperasse/stargazers"><img src="https://img.shields.io/github/stars/romainsimon/paperasse" alt="GitHub stars"></a>
  <img src="https://img.shields.io/badge/evals-89%25_with_skill_%7C_78%25_without_%7C_%2B11%25_delta-brightgreen" alt="Evals: 89% with skill | 78% without | +11% delta">
  <a href="https://github.com/romainsimon/paperasse/blob/master/LICENSE"><img src="https://img.shields.io/github/license/romainsimon/paperasse?style=flat&color=blue" alt="License"></a>
</p>

<br />

---

## Qu'est-ce que Paperasse ?

<b>Paperasse est une collection de skills pour agents IA ([Claude Code](https://claude.com/product/claude-code), [Claude Cowork](https://claude.com/product/cowork), [Codex](https://openai.com/codex/), [Mistral Vibe](https://vibe.mistral.ai), [Cursor](https://cursor.com), [Windsurf](https://windsurf.com), [Cline](https://cline.bot), [Aider](https://aider.chat)) spécialisés dans la comptabilité, la fiscalité, le notariat et l'audit des entreprises françaises.</b>

Chaque skill transforme votre agent en copilote expert d'un métier de la paperasse : comptabilité (PCG, TVA, IS, clôture annuelle, FEC, liasse fiscale), contrôle fiscal, audit CAC, droit notarial (immobilier, succession, donation), et gestion de copropriété (AG, charges, travaux, impayés). Il connaît les textes (CGI, BOFiP, NEP, loi 1965), les formulaires, les échéances, et ne se trompe pas de case dans la liasse fiscale.

Les skills sont du Markdown. Ils fonctionnent avec tout agent ou outil capable de lire des fichiers. Paperasse inclut aussi des connecteurs pour récupérer automatiquement vos transactions bancaires (Qonto) et paiements (Stripe).

---

## Installation rapide

### Option 1 : installation via agentskill.sh (recommandé)

Installe les skills depuis le registre [agentskill.sh](https://agentskill.sh/skillsets/paperasse).
Pas besoin de cloner le repo et permet d'avoir tous les skills maintenus à jour automatiquement.

Copiez-collez ces instructions dans votre agent IA :

```
Suis les instructions pour installer le skillset Paperasse depuis https://agentskill.sh/skillsets/paperasse
Lance ensuite le setup pour la gestion de toute ma paperasse
```

### Option 2 : installation via GitHub

Copiez-collez ces instructions dans votre agent IA :

```
Installe tous les skills du repo github https://github.com/romainsimon/paperasse
Lance ensuite le setup pour la gestion de toute ma paperasse
```

L'agent va cloner le repo, installer les skills, et lancer le setup guidé qui vous posera quelques questions (nom de votre société, régime TVA, comptes bancaires) pour configurer votre environnement.

---

## Les 5 skills

| Skill | Rôle | Ce qu'il fait |
|-------|------|---------------|
| **`comptable`** | Expert-Comptable | Écritures comptables (800+ comptes PCG), TVA, IS/IR, clôture annuelle complète en 12 étapes, FEC, liasse fiscale, PDFs, rapprochement bancaire |
| **`controleur-fiscal`** | Contrôleur Fiscal | Simulation de contrôle DGFIP sur 8 axes, chefs de redressement avec base légale et montants |
| **`commissaire-aux-comptes`** | Commissaire aux Comptes | Audit NEP en 7 phases, validation croisée bilan/CR/liasse, opinion motivée |
| **`notaire`** | Notaire | Frais de notaire, plus-value immobilière, successions, donations, SCI, PACS, diagnostics, conseil patrimonial |
| **`syndic`** | Syndic de Copropriété | Gestion d'un parc de copropriétés : AG, appels de fonds, comptabilité (décret 2005), travaux, fournisseurs, impayés, transition de syndic |

---

## Exemples d'utilisation

```
> Voici mes transactions bancaires. Catégorise-les et génère les écritures.

> Fais la clôture annuelle de ma société pour l'exercice 2025.

> Simule un contrôle fiscal sur mes comptes 2025.

> Audite mes comptes annuels avant approbation.

> Calcule les frais de notaire pour un appartement à 350 000 EUR à Paris.

> Ma mère est décédée, nous sommes 3 enfants. Calcule les droits de succession.

> Rédige les statuts d'une SCI familiale pour gérer un immeuble locatif.

> Prépare la convocation de l'AG annuelle pour ma copropriété.

> Donne-moi un tableau de bord de toutes mes copropriétés.

> Le copropriétaire du lot 7 n'a pas payé depuis 6 mois. Que faire ?
```

---

## Workflow : de zéro à la clôture annuelle

Vous pouvez lancer le workflow complet de clôture annuelle en copiant-collant le prompt suivant :

```
Fais la clôture annuelle de ma société
```

Les 4 skills s'enchaînent pour couvrir tout le cycle comptable :

1. **Comptabilité courante** (`comptable`) : classification des dépenses, écritures, TVA, rapprochement bancaire
2. **Clôture annuelle** (`comptable`) : cut-off, amortissements, provisions, IS, FEC, liasse fiscale, PDFs
3. **Audit** (`commissaire-aux-comptes`) : vérification du FEC, contrôle croisé bilan/CR/liasse, opinion
4. **Contrôle fiscal** (`controleur-fiscal`) : simulation DGFIP sur 8 axes, chefs de redressement

---

## Intégrations (Qonto, Stripe)

Des connecteurs pour récupérer automatiquement les transactions bancaires et les paiements. Configuration dans `company.json`, clés API en variables d'environnement.

```bash
npm run fetch          # Récupère Qonto + Stripe
npm run fetch:qonto    # Qonto seulement
npm run fetch:stripe   # Stripe seulement
```

Supporte plusieurs comptes Stripe et Stripe Connect. Voir `integrations/` pour le détail de la configuration.

---

## Scripts et templates

Le repo inclut des scripts Node.js et des templates pour la génération de documents :

```bash
npm run closing    # Génère tout d'un coup (états financiers + FEC + PDFs)
```

| Script / Template | Génère |
|-------------------|--------|
| `generate-statements.js` | Bilan, Compte de résultat, Balance |
| `generate-fec.js` | FEC 18 colonnes (art. L. 47 A-I LPF) |
| `generate-pdfs.js` | PDFs professionnels avec en-tête société |
| `templates/2065-sd.html` | Formulaire 2065-SD (Déclaration IS) |
| `templates/liasse-fiscale-2033.md` | Liasse fiscale 2033 (brouillon) |
| `templates/approbation-comptes.md` | PV d'approbation des comptes |
| `templates/declaration-confidentialite.html` | Déclaration de confidentialité |
| `templates/depot-greffe-checklist.md` | Checklist dépôt au greffe |

Prérequis : `npm install`, puis `cp company.example.json company.json` et remplir vos informations.

---

## Garde-fous

- **Contexte entreprise** : chaque skill vérifie les informations minimales (raison sociale, SIREN, forme juridique, régime TVA) avant de procéder. Si `company.json` existe, il est lu automatiquement. Sinon, le skill pose les questions.

- **Échéances fiscales** : le skill comptable affiche les prochaines échéances à chaque conversation (acomptes IS, TVA, etc.).

- **Fraîcheur des données** : chaque skill a une date `last_updated`. S'il a plus de 6 mois, l'agent vérifie les chiffres en ligne avant de répondre. Le législateur français change les règles plus souvent que vous changez de mot de passe. Contrairement à votre mot de passe, ça peut coûter cher.

- **Données open source** : PCG complet et nomenclature de la liasse fiscale issus de [data.gouv.fr](https://www.data.gouv.fr). APIs publiques pour le BOFiP et l'annuaire des entreprises (Sirene). Sources documentées dans `data/sources.json`.

---

## Installation manuelle (par plateforme)

Les skills sont du Markdown. Ils marchent partout où un agent peut lire des fichiers.

| Plateforme | Où copier les skills |
|------------|---------------------|
| **Claude Code** | `~/.claude/skills/` |
| **Cursor** | `~/.cursor/skills/` |
| **Windsurf** | `~/.windsurf/skills/` |
| **Codex** | `~/.codex/skills/` |
| **Mistral Vibe** | `~/.vibe/skills/` |
| **Cline** | `~/.cline/skills/` |
| **Aider** | `~/.aider/skills/` |

---

## Evals

Chaque skill est évalué automatiquement avec et sans le SKILL.md pour mesurer sa valeur ajoutée. Le runner utilise `claude --bare` en isolation, un grading LLM-as-judge, et une exécution parallèle (~20 min pour la suite complète).

```bash
# Lancer les evals
uv run --project evals python evals/run_evals.py

# Un seul skill
uv run --project evals python evals/run_evals.py --skill notaire

# Voir les résultats dans le navigateur
python evals/generate_review.py evals-workspace/iteration-xxx/
```

**Derniers résultats** (claude-sonnet-4-6, grading haiku) :

| Skill | With Skill | Without Skill | Delta |
|-------|-----------|--------------|-------|
| commissaire-aux-comptes | 100% | 75% | **+25%** |
| notaire | 96% | 92% | +4% |
| controleur-fiscal | 91% | 87% | +4% |
| comptable | 89% | 85% | +4% |
| syndic | 83% | 68% | **+16%** |
| **Aggregate** | **89%** | **78%** | **+11%** |

Le format `evals.json` est compatible avec le [framework officiel anthropics/skills](https://github.com/anthropics/skills/tree/main/skills/skill-creator).

---

## Avertissement légal

**Ces skills ne remplacent pas un expert-comptable inscrit à l'Ordre, un commissaire aux comptes certifié, ou un notaire en exercice.** Ils sont conçus comme outils d'aide à la décision et de préparation.

Pour les situations complexes (litiges, montages fiscaux, contrôles en cours), consultez un professionnel avec une assurance RC Pro et un numéro SIRET.

---

## Contribuer

Vous avez un métier de la paperasse que vous aimeriez voir automatisé ? Consultez le [guide de contribution](CONTRIBUTING.md).

---

## Remerciements

- **L'administration française** — Pour avoir créé un système si complexe qu'il nécessite une IA pour le comprendre
- **Le Plan Comptable Général** — 800 comptes, vraiment ?
- **Le Code Général des Impôts** — 2 000 articles, et ils en rajoutent chaque année
- **La CNCC** — Pour les NEP, ces documents que personne ne lit mais que tout le monde cite
- **data.gouv.fr** — Pour les données ouvertes qui alimentent les skills

---

<p align="center">
  <i>La paperasse, c'est comme le cholestérol : y'en a du bon et du mauvais, mais surtout y'en a trop.</i>
  <br>
  — Personne de célèbre, jamais
</p>

---

<a href="https://www.star-history.com/?repos=romainsimon%2Fpaperasse&type=date&legend=bottom-right">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/image?repos=romainsimon/paperasse&type=date&theme=dark&legend=top-left" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/image?repos=romainsimon/paperasse&type=date&legend=top-left" />
   <img alt="Star History Chart" src="https://api.star-history.com/image?repos=romainsimon/paperasse&type=date&legend=top-left" />
 </picture>
</a>

---

<p align="center">
  Fait avec des 🥐 et beaucoup de ☕ quelque part en France | <a href="LICENSE">Licence MIT</a>
</p>
