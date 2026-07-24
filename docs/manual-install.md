# Installation manuelle

Cette page concerne les installations manuelles de Paperasse, notamment quand un agent télécharge les dossiers depuis GitHub au lieu de cloner le repo complet.

## Pourquoi cette vérification existe

Paperasse partage certaines ressources entre plusieurs skills avec des liens symboliques. Les dossiers de skills vivent sous `skills/` (requis pour la découverte par Claude Code / Cowork). Par exemple :

- `skills/comptable/data` pointe vers `../../data`
- `skills/comptable/scripts` pointe vers `../../scripts`
- `skills/comptable/templates` pointe vers `../../templates`
- `skills/comptable/integrations` pointe vers `../../integrations`
- `skills/comptable/company.example.json` pointe vers `../../company.example.json`
- `skills/controleur-fiscal/data` et `skills/commissaire-aux-comptes/data` pointent vers `../../data`
- `skills/controleur-fiscal/company.example.json` et `skills/commissaire-aux-comptes/company.example.json` pointent vers `../../company.example.json`
- `skills/notaire/scripts/fetch_notaire_data.py` et `test_fetch_notaire_data.py` pointent vers `../../../scripts/...`

Un clone Git complet préserve ces liens. En revanche, certains installateurs qui téléchargent les dossiers skill par skill via l'API GitHub peuvent transformer les liens en petits fichiers texte contenant seulement `../../data`, `../../scripts`, etc. Le skill semble alors installé, mais les workflows qui lisent les données, scripts, templates ou intégrations échouent.

## Installation Codex

Depuis la racine du repo Paperasse cloné, copiez le dossier `skills/` et les dossiers partagés ensemble, en préservant leur imbrication relative (ne pas aplatir les dossiers de skills au même niveau que `data`, `scripts`, etc., sinon les liens relatifs à deux niveaux comme `../../data` pointeront au mauvais endroit) :

```bash
mkdir -p ~/.codex/skills/paperasse
cp -R skills data scripts templates integrations company.example.json ~/.codex/skills/paperasse/
```

Les skills se trouvent alors sous `~/.codex/skills/paperasse/skills/<nom>/`, avec les dossiers partagés à `~/.codex/skills/paperasse/data`, etc. — exactement la même structure que dans le repo, donc les liens relatifs (`../../data`, `../../../scripts/...`) restent valides.

## Vérification

Après installation, vérifiez que les chemins partagés sont bien des liens symboliques ou de vrais dossiers, pas des fichiers texte :

```bash
ls -l ~/.codex/skills/paperasse/skills/comptable/data \
  ~/.codex/skills/paperasse/skills/comptable/scripts \
  ~/.codex/skills/paperasse/skills/comptable/templates \
  ~/.codex/skills/paperasse/skills/comptable/integrations \
  ~/.codex/skills/paperasse/skills/comptable/company.example.json
```

Si la sortie affiche des fichiers réguliers de quelques octets au lieu de liens symboliques ou de dossiers, l'installation est incomplète. Recréez alors les liens ou réinstallez depuis un clone Git complet.
