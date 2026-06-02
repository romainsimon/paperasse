# Setup guidé — premier événement

Aucun fichier `evenements/*.json` n'est présent (ou seul `evenement.example.json` figure). Procéder au setup guidé.

## Étape 1 — Identifier l'association

Si un fichier `association.json` est présent à la racine du dossier de travail (renseigné par `secretaire-association` ou `tresorier-association`), le réutiliser. Sinon, demander à l'utilisateur :

- nom de l'association ;
- forme (loi 1901) ;
- n° RNA (W________) ;
- SIRET (si applicable) ;
- adresse du siège ;
- nom du président / présidente ;
- école rattachée (nom, type, ville) ;
- contrat RC (assureur, n° police, dates de validité, plafonds).

## Étape 2 — Cadrer l'événement à venir

Poser les questions pour pré-remplir le JSON :

- slug court (`kermesse-2026`, `videgrenier-automne-26`) ;
- nom complet ;
- date (date unique ou intervalle) ;
- heure début / heure fin ;
- lieu (adresse précise) ;
- statut du lieu (école, salle municipale, voie publique, terrain privé) ;
- format (kermesse, vide-grenier, tombola seule, marché de Noël, fête de fin d'année, bal, autre) ;
- effectif attendu (visiteurs + bénévoles + prestataires) ;
- composantes : buvette ? tombola ? musique ? structures démontables ? activité sportive ? restauration ? ;
- bénéficiaire des recettes (si applicable) ;
- chef de projet et référent sécurité désignés.

## Étape 3 — Créer le JSON

Écrire `evenements/{slug}.json` sur le modèle de [`evenement.example.json`](../evenement.example.json). Champs requis :

```json
{
  "slug": "kermesse-2026",
  "name": "Kermesse de fin d'année 2026",
  "date": "2026-06-27",
  "lieu": {
    "nom": "École Maria Montessori",
    "adresse": "12 rue des Lilas, 75011 Paris",
    "type_erp": "R",
    "categorie_erp": "5"
  },
  "format": "kermesse",
  "effectif_attendu": 250,
  "composantes": {
    "buvette": true,
    "tombola_payante": true,
    "loto": false,
    "vide_grenier": false,
    "musique": true,
    "structure_demontable_sup_16m2": false,
    "activite_sportive": false,
    "restauration": true
  },
  "association": "ape-montessori-11",
  "chef_de_projet": "Marie Dupont",
  "referent_securite": "Jean Martin",
  "beneficiaire_recettes": "Sortie de fin d'année maternelles",
  "rc_attestation": {
    "assureur": "MAIF",
    "n_police": "0000-0000-0000",
    "date_validite": "2026-12-31"
  },
  "journal": []
}
```

## Étape 4 — Calendrier automatique

À partir du JSON, générer la liste des **démarches à engager** avec délais rétro-planifiés (voir [calendrier-evenementiel.md](calendrier-evenementiel.md) si présent, sinon dériver de la matrice `data/autorisations-par-format.json`).

Présenter la liste à l'utilisateur, classer par échéance, et valider les responsables internes.

## Étape 5 — Workflow standard

Une fois le JSON créé et le calendrier dressé, basculer dans le workflow normal du skill (cf. `SKILL.md` § Workflow).
