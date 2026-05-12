# Installation manuelle

Cette page concerne les installations manuelles de Paperasse, notamment quand un agent télécharge les dossiers depuis GitHub au lieu de cloner le repo complet.

## Pourquoi cette vérification existe

Paperasse partage certaines ressources entre plusieurs skills avec des liens symboliques. Par exemple :

- `comptable/data` pointe vers `../data`
- `comptable/scripts` pointe vers `../scripts`
- `comptable/templates` pointe vers `../templates`
- `comptable/integrations` pointe vers `../integrations`
- `comptable/company.example.json` pointe vers `../company.example.json`
- `controleur-fiscal/data` et `commissaire-aux-comptes/data` pointent vers `../data`
- `controleur-fiscal/company.example.json` et `commissaire-aux-comptes/company.example.json` pointent vers `../company.example.json`

Un clone Git complet préserve ces liens. En revanche, certains installateurs qui téléchargent les dossiers skill par skill via l'API GitHub peuvent transformer les liens en petits fichiers texte contenant seulement `../data`, `../scripts`, etc. Le skill semble alors installé, mais les workflows qui lisent les données, scripts, templates ou intégrations échouent.

## Installation Codex

Depuis la racine du repo Paperasse cloné :

```bash
mkdir -p ~/.codex/skills
cp -R comptable controleur-fiscal commissaire-aux-comptes fiscaliste notaire syndic ~/.codex/skills/
cp -R data scripts templates integrations company.example.json ~/.codex/skills/
```

Cette structure garde les dossiers partagés au même niveau que les dossiers de skills, ce qui permet aux liens relatifs comme `../data` de rester valides.

## Vérification

Après installation, vérifiez que les chemins partagés sont bien des liens symboliques ou de vrais dossiers, pas des fichiers texte :

```bash
ls -l ~/.codex/skills/comptable/data \
  ~/.codex/skills/comptable/scripts \
  ~/.codex/skills/comptable/templates \
  ~/.codex/skills/comptable/integrations \
  ~/.codex/skills/comptable/company.example.json
```

Si la sortie affiche des fichiers réguliers de quelques octets au lieu de liens symboliques ou de dossiers, l'installation est incomplète. Recréez alors les liens ou réinstallez depuis un clone Git complet.
