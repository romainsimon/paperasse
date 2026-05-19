# Paperasse BE — Contexte projet pour Claude Code

## C'est quoi ce repo ?

Fork belge de [romainsimon/paperasse](https://github.com/romainsimon/paperasse).
**Repo : https://github.com/braingnac/paperasse-be**

Collection de skills Markdown pour agents IA spécialisés dans la **bureaucratie belge** : comptabilité, fiscalité, facturation, notariat, audit, copropriété.

## Différences clés avec le repo français d'origine

| Domaine | France (original) | Belgique (ce fork) |
|---|---|---|
| Comptabilité | PCG (Plan Comptable Général) | PCMN (Plan Comptable Minimum Normalisé) |
| Impôt sociétés | IS | ISOC |
| Impôt personnes | IR | IPP |
| Contrôle fiscal | DGFIP | SPF Finances |
| Audit | NEP (CNCC) | ISA/ISRS (IRE) |
| Expertise comptable | Ordre des EC | IEC |
| Registre entreprises | SIREN/SIRET/RCS | Numéro BCE/KBO |
| Codes activité | NAF | NACE-BEL |
| TVA standard | 20% | 21% |
| Facturation électronique | Plateformes agréées (DGFIP) | Peppol |
| Copropriété | Loi 1965 | Loi 1994 (ACP) |
| Références légales | CGI, BOFiP, LPF | CIR 92, CTVA, Fisconetplus |
| Formes juridiques | SAS/SASU/SARL/EURL | SA/SRL/SNC/SCS |
| Données ouvertes | data.gouv.fr | statbel.fgov.be, fisconetplus.be |

## Les 6 skills (dossiers)

- `comptable/` — Expert-comptable IEC, PCMN, TVA belge, ISOC, dépôt BCE
- `controleur-fiscal/` — Simulation contrôle SPF Finances
- `reviseur-entreprises/` — Réviseur IRE, audit ISA/ISRS
- `fiscaliste/` — IPP, précompte mobilier, VVPR bis, EIP, crypto
- `notaire/` — Frais notaire, successions régionales, donations, SRL patrimoniale
- `syndic/` — ACP, AG, appels de fonds, loi 1994

## Structure du repo

```
paperasse-be/
├── CLAUDE.md               ← ce fichier
├── README.md
├── CONTRIBUTING.md
├── marketplace.json        ← manifeste des skills (country: BE)
├── company.example.json    ← exemple config société belge (SRL, BCE, TVA 21%)
├── package.json
├── .env.example            ← Qonto + Stripe API keys
├── data/                   ← données partagées (PCMN, barèmes, sources)
├── scripts/                ← Node.js : calc, FEC, états financiers, PDFs
├── templates/              ← formulaires belges (ISOC 275, TVA, dépôt BCE)
├── integrations/           ← Qonto fetch, Stripe fetch
├── evals/                  ← runner d'évaluation des skills
└── assets/                 ← banner.jpg
```

## Conventions importantes

- Les skills sont **self-contained** : chaque dossier doit fonctionner sans dépendre d'un autre skill
- Le code partagé vit à la racine et est référencé par **symlinks** depuis chaque skill
- Chaque `SKILL.md` a un frontmatter avec `name`, `description`, `last_updated`, `includes`
- Les skills de plus de 6 mois affichent un avertissement de fraîcheur
- `company.json` (copie locale de `company.example.json`) est lu automatiquement par tous les skills

## Git workflow

- **`origin`** → `braingnac/paperasse-be` (notre fork belge)
- **`upstream`** → `romainsimon/paperasse` (repo français d'origine)
- **NE PAS** faire `git merge upstream/master` en aveugle — ça écraserait les adaptations belges
- Pour récupérer des améliorations upstream : `git fetch upstream` puis `git cherry-pick <hash>`

## Ce qui a déjà été fait

- [x] Adaptation des fichiers racine : README, CONTRIBUTING, marketplace.json, company.example.json, package.json
- [x] Adaptation des SKILL.md individuels (les 6 skills)
- [x] Mise à jour des références légales dans `data/` et `references/`
- [x] Mise à jour des templates (formulaires belges)
- [x] Mise à jour des evals avec des cas de test belges
- [x] Revue juridique (Opus) + vérification valeurs 2025 contre sources officielles
- [x] Exécution du runner d'évaluation (`evals/run_evals.py`) pour valider le comportement des skills

## Références utiles

- CIR 92 : https://fisconetplus.be
- CTVA belge : https://fisconetplus.be
- BCE/KBO : https://kbopub.economie.fgov.be
- PCMN : Commission des Normes Comptables https://www.cnc-cbn.be
- Barèmes IPP : https://finances.belgium.be
- SPF Finances : https://finances.belgium.be
- IRE (réviseurs) : https://www.ibr-ire.be
- IEC (experts-comptables) : https://www.iec-iab.be
- Peppol Belgique : https://www.mercurius.be
