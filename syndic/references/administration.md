# Administration de la Copropriété

## Setup Guidé (première utilisation ou ajout d'une copropriété)

Si le répertoire `copros/` n'existe pas ou est vide, le créer et lancer le setup pour la première copropriété. Si `copros/` existe déjà, le setup ajoute une nouvelle copropriété au portefeuille.

### Étape 0 : Combien de copropriétés ?

Demander :
1. Combien de copropriétés gérez-vous ?
2. On les configure une par une. Commençons par la première.

### Étape 1 : Identité de la copropriété

Demander :
1. Nom de la copropriété (ex: "Résidence Les Tilleuls")
2. Adresse complète
3. Numéro d'immatriculation RNC (si connu)
4. Date de création du syndicat
5. Nombre total de lots (principaux + annexes)

Le slug est généré automatiquement à partir du nom (ex: "Les Oliviers" → `les-oliviers`).

### Étape 2 : Exercice comptable

Demander :
1. Date de début de l'exercice (souvent 1er janvier ou 1er juillet)
2. Date de fin de l'exercice
3. Budget prévisionnel en cours

### Étape 3 : Type de syndic

Demander :
1. Syndic professionnel, bénévole, ou coopératif ?
2. Nom du syndic / cabinet
3. Date d'échéance du mandat

Si l'utilisateur indique une transition souhaitée (ex: professionnel vers bénévole), mentionner immédiatement que le changement de syndic nécessite un vote en AG à la majorité de l'art. 25 (avec passerelle art. 25-1). Renvoyer vers [references/transition.md](transition.md) pour le détail de la procédure.

### Étape 4 : Conseil syndical

Demander :
1. Membres du conseil syndical (noms, rôles)
2. Date de la dernière AG
3. Prochaine AG prévue

### Étape 5 : Informations bancaires

Demander :
1. Banque et numéro de compte séparé (obligatoire, art. 18, II loi 1965)
2. Signataires autorisés

### Étape 6 : Intégration Qonto (optionnel)

Demander :
1. Utilisez-vous Qonto pour le compte bancaire de cette copropriété ?
2. Si oui, demander les clés API (QONTO_ID et QONTO_API_SECRET)
3. Les clés sont écrites dans `.env` (pas dans le fichier JSON de la copro)
4. Activer `qonto.enabled: true` dans le fichier JSON de la copro
5. Tester la connexion

Si le syndic gère plusieurs copros avec des comptes Qonto distincts, utiliser des noms de variables différents par copro (`QONTO_OLIVIERS_ID`, `QONTO_CEDRES_ID`, etc.).

### Récapitulatif et validation

Afficher le fichier JSON généré (ex: `copros/les-oliviers.json`) et demander confirmation. Proposer de corriger les erreurs.

Si l'utilisateur gère plusieurs copropriétés, proposer d'enchaîner sur la suivante.

### Structure du répertoire copros/

```
copros/
├── les-oliviers.json
├── reserve-badine.json
└── parc-des-cedres.json
```

Chaque fichier est autonome et contient toutes les informations d'une copropriété. Le slug (nom de fichier sans extension) sert d'identifiant unique.

## Fiche Synthétique (art. 8-2 loi 1965)

**Obligatoire depuis la loi ALUR.** Le syndic doit l'établir et la mettre à jour chaque année.

Contenu obligatoire :
- Identification du syndicat (nom, adresse, immatriculation)
- Organisation juridique (type de syndic, contrat en cours)
- Données techniques (nombre de lots, date de construction, type de chauffage)
- Données financières (budget, charges moyennes par lot, impayés, emprunts)
- Données sur le bâti (DPE, diagnostic technique global si réalisé)

Voir template : [templates/fiche-synthetique.md](../templates/fiche-synthetique.md)

## Carnet d'Entretien (art. 18 loi 1965)

**Obligatoire.** Tenu par le syndic, accessible à tout copropriétaire.

Contenu :
- Adresse de l'immeuble
- Identité du syndic en exercice
- Contrats d'assurance en cours
- Contrats d'entretien et de maintenance (ascenseur, chauffage, nettoyage)
- Année de réalisation des travaux importants et identité des entreprises
- Échéancier du fonds de travaux
- Diagnostic technique global (DTG) le cas échéant
- Diagnostics techniques réalisés (DPE collectif, amiante, plomb, etc.)

## Extranet Copropriétaires

**Obligatoire depuis la loi ALUR** (art. 18, II de la loi 1965).

Le syndic doit mettre à disposition un espace en ligne sécurisé donnant accès :
- Au règlement de copropriété et à l'état descriptif de division
- Aux PV des 3 dernières AG
- Aux contrats en cours
- À la fiche synthétique
- Au carnet d'entretien
- Au budget prévisionnel et aux comptes
- Aux appels de fonds

## Archives

**Obligation de conservation :**

| Document | Durée |
|----------|-------|
| PV d'AG | Indéfinie (recommandé : perpétuel) |
| Contrats | 5 ans après expiration |
| Comptabilité | 10 ans |
| Factures | 10 ans |
| Correspondance importante | 5 ans |
| Documents de construction | Vie de l'immeuble |

**Transmission lors du changement de syndic :** Voir [references/transition.md](transition.md)

## Assurances

Le syndic doit souscrire et maintenir :
- **Assurance multirisques immeuble** (obligatoire, art. 9-1 loi 1965)
- **Responsabilité civile du syndicat**
- **Responsabilité civile du syndic non professionnel** (recommandé)

Vérifications annuelles :
- Adéquation de la valeur assurée
- Franchises et exclusions
- Mise en concurrence (au moins tous les 3 ans, bonne pratique)
