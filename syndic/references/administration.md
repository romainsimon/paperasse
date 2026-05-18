# Administration de l'ACP

`last_updated: 2026-05-15`

## Setup Guidé (première utilisation ou ajout d'une copropriété)

Si le répertoire `copros/` n'existe pas ou est vide, le créer et lancer le setup pour la première copropriété. Si `copros/` existe déjà, le setup ajoute une nouvelle copropriété au portefeuille.

### Étape 0 : Combien de copropriétés ?

Demander :
1. Combien de copropriétés (ACP) gérez-vous ?
2. On les configure une par une. Commençons par la première.

### Étape 1 : Identité de l'ACP

Demander :
1. Nom de l'ACP / de la copropriété (ex : "Résidence Les Tilleuls")
2. Adresse complète (rue, numéro, code postal, commune, région)
3. Numéro BCE (Banque-Carrefour des Entreprises) — si l'ACP est immatriculée (format : 0xxx.xxx.xxx)
4. Date de création de l'ACP (date de la première vente d'un lot)
5. Nombre total de lots (principaux + caves/garages)

Le slug est généré automatiquement à partir du nom (ex : "Les Oliviers" → `les-oliviers`).

### Étape 2 : Exercice comptable

Demander :
1. Date de début de l'exercice (souvent 1er janvier ou 1er juillet)
2. Date de fin de l'exercice
3. Budget ordinaire en cours

### Étape 3 : Type de syndic

Demander :
1. Syndic professionnel (agréé IPI), bénévole, ou collectif ?
2. Nom du syndic / cabinet
3. Date d'échéance du mandat

Si l'utilisateur indique une transition souhaitée (ex : professionnel vers bénévole), mentionner que le changement de syndic nécessite un vote en AG à la majorité ordinaire (art. 3.84 Cc belge). Renvoyer vers [references/transition.md](transition.md) pour le détail de la procédure.

### Étape 4 : Conseil de gérance

Demander :
1. L'ACP dispose-t-elle d'un conseil de gérance ?
2. Si oui : membres (noms, rôles)
3. Date de la dernière AG
4. Prochaine AG prévue

### Étape 5 : Informations bancaires

Demander :
1. Banque et numéro de compte courant séparé au nom de l'ACP (obligatoire, art. 3.89 Cc belge)
2. IBAN belge (format : BE XX XXXX XXXX XXXX)
3. Compte épargne séparé pour le fonds de réserve (obligatoire)
4. Signataires autorisés

### Étape 6 : Intégration Qonto (optionnel)

Demander :
1. Utilisez-vous Qonto pour le compte bancaire de cette ACP ? (Qonto est disponible en Belgique)
2. Si oui, demander les clés API (QONTO_ID et QONTO_API_SECRET)
3. Les clés sont écrites dans `.env` (pas dans le fichier JSON de la copro)
4. Activer `qonto.enabled: true` dans le fichier JSON de la copro
5. Tester la connexion

Si le syndic gère plusieurs ACP avec des comptes Qonto distincts, utiliser des noms de variables différents par ACP (`QONTO_OLIVIERS_ID`, `QONTO_CEDRES_ID`, etc.).

### Récapitulatif et validation

Afficher le fichier JSON généré (ex : `copros/les-oliviers.json`) et demander confirmation. Proposer de corriger les erreurs.

Si l'utilisateur gère plusieurs ACP, proposer d'enchaîner sur la suivante.

### Structure du répertoire copros/

```
copros/
├── les-oliviers.json
├── reserve-badine.json
└── parc-des-cedres.json
```

Chaque fichier est autonome et contient toutes les informations d'une ACP. Le slug (nom de fichier sans extension) sert d'identifiant unique.

## Fiche de l'ACP

Le syndic doit établir et maintenir à jour une fiche récapitulative de chaque ACP. Il n'existe pas en Belgique d'obligation légale équivalente à la fiche synthétique française, mais cette pratique est fortement recommandée.

Contenu recommandé :
- Identification de l'ACP (nom, adresse, BCE si applicable)
- Données juridiques (statuts, acte de base, date création)
- Organisation (type de syndic, conseil de gérance, contrat en cours)
- Données techniques (nombre de lots, date de construction, type de chauffage)
- Données financières (budget, charges moyennes par lot, état fonds de réserve, impayés)
- Assurances (police incendie, RC ACP, numéros de contrat, assureur)
- PEB collectif (si réalisé)

Voir template : [templates/fiche-synthetique.md](../templates/fiche-synthetique.md)

## Carnet d'Entretien de l'Immeuble

Recommandé (pas d'obligation légale stricte en Belgique, mais prévu souvent dans les statuts).

Contenu :
- Adresse de l'immeuble
- Identité du syndic en exercice
- Contrats d'assurance en cours (incendie, RC ACP)
- Contrats d'entretien et de maintenance (ascenseur, chauffage, nettoyage)
- Année de réalisation des travaux importants et identité des entreprises
- État du fonds de réserve et échéancier de cotisation
- Contrôles réglementaires réalisés (PEB, ascenseur, chaufferie, électricité)
- DIU (Dossier d'Intervention Ultérieure) — voir [references/travaux.md](travaux.md)

## Archives

**Conservation recommandée :**

| Document | Durée |
|----------|-------|
| PV d'AG | Indéfinie (recommandé : perpétuel) |
| Acte de base et statuts | Vie de l'immeuble |
| Contrats | 5 ans après expiration |
| Comptabilité | 10 ans |
| Factures | 10 ans |
| Correspondance importante | 5 ans |
| Documents de construction / DIU | Vie de l'immeuble |
| Dossiers sinistres | 10 ans après clôture |

**Transmission lors du changement de syndic :** Voir [references/transition.md](transition.md)

## Assurances

Le syndic doit souscrire et maintenir pour le compte de l'ACP :
- **Assurance incendie immeuble** (obligatoire, art. 3.88 Cc belge) — inclut RC ACP
- **Responsabilité civile de l'ACP** (souvent intégrée à la police incendie)
- **Responsabilité civile du syndic non professionnel** (recommandé pour syndic bénévole)

Vérifications annuelles :
- Adéquation de la valeur assurée (reconstruction)
- Franchises et exclusions
- Mise en concurrence (au moins tous les 3 ans, bonne pratique)

## Pouvoirs du Syndic (art. 3.88 Cc belge)

### Pouvoirs propres (sans autorisation AG)

Le syndic peut, sans autorisation préalable de l'AG :
- Accomplir tous les actes d'administration conservatoire et de gestion courante
- Engager des dépenses urgentes pour la conservation de l'immeuble
- Représenter l'ACP en justice (en demandant et en défendant)
- Recouvrer les charges impayées

### Pouvoirs soumis à autorisation AG

Le syndic doit obtenir l'autorisation de l'AG pour :
- Engager des dépenses importantes hors budget ordinaire
- Conclure des contrats supérieurs aux seuils définis dans les statuts
- Agir en justice pour des montants importants (selon statuts)
- Contracter un emprunt au nom de l'ACP
- Aliéner des biens communs

### Délégation au conseil de gérance

L'AG peut déléguer certains pouvoirs de contrôle et de décision au conseil de gérance (art. 3.87 Cc belge). La portée de cette délégation est définie dans les statuts ou dans la décision d'AG.
