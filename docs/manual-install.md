# Installation manuelle

Cette page concerne les installations sans agentskill.sh ni marketplace, par exemple pour Codex.

## Chaque skill est autonome

Chaque dossier de skill contient tout ce dont il a besoin : ses données, ses scripts, ses templates et ses intégrations. Les ressources communes sont copiées dans chaque skill qui les utilise (la source reste à la racine du repo, voir CONTRIBUTING.md). Il n'y a plus de liens symboliques à préserver : copier un dossier suffit.

## Installation Codex

Depuis la racine du repo Paperasse cloné :

```bash
mkdir -p ~/.codex/skills
cp -R comptable controleur-fiscal commissaire-aux-comptes fiscaliste notaire syndic ~/.codex/skills/
```

## Vérification

```bash
ls ~/.codex/skills/comptable/data ~/.codex/skills/comptable/scripts
```

Les dossiers doivent lister des fichiers (par exemple `pcg_2026.json`, `calc.js`).
