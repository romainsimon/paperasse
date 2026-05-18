# Transition de Syndic

`last_updated: 2026-05-15`

## Changement de Syndic : Vue d'Ensemble

Le changement de syndic se décide en AG à la **majorité ordinaire** (art. 3.84 Cc belge). En Belgique, il n'existe pas de mécanisme de passerelle au sens du droit français (art. 25-1), mais si le quorum n'est pas atteint à la 1ère AG, une 2e AG peut délibérer valablement quel que soit le nombre de présents (voir [references/majorites.md](majorites.md)).

### Scénarios

1. **Syndic professionnel → syndic professionnel** : remplacement par un autre cabinet agréé IPI
2. **Syndic professionnel → syndic bénévole** : un copropriétaire prend la gestion
3. **Syndic professionnel → syndic collectif** : le conseil de gérance assure collectivement la gestion
4. **Syndic bénévole / collectif → syndic professionnel** : retour à un professionnel agréé IPI

## Checklist Complète : Transition Syndic Pro → Bénévole

Copier et suivre cette checklist. Adapter les dates selon l'échéancier réel.

```
Transition syndic — {{acp.name}}
Syndic sortant : {{nom_cabinet}} (fin mandat : {{date_fin}})
Candidat bénévole : {{nom_candidat}} (lot {{n}})
AG prévue : {{date_ag}}

══════════════════════════════════════════════════════════════
PHASE 1 — ÉTAT DES LIEUX (3–6 mois avant l'AG)
══════════════════════════════════════════════════════════════

⚠️ Le syndic sortant n'est PAS obligé de tout transmettre avant le vote.
   Seuls les documents accessibles aux copropriétaires sont disponibles.

Sources accessibles AVANT le vote :
- Espace copropriétaires en ligne (si existant) : PV des AG, statuts,
  budget, comptes, carnet d'entretien
- Contrats affichés ou communiqués (assurance, maintenance)
- Données disponibles lors des dernières AG

Ce qui ne sera accessible qu'APRÈS le vote (phase 5, art. 3.84 §5 Cc belge) :
- Grand livre, journal, balance complète
- Liste complète des copropriétaires avec coordonnées
- Détail des contrats (conditions, préavis)
- Clés, codes, accès plateformes
- Dossiers contentieux

- [ ] Récupérer le contrat de syndic en cours
- [ ] Noter : date fin mandat, préavis de non-renouvellement, pénalités éventuelles
- [ ] Consulter les comptes présentés à la dernière AG : budget, charges, impayés
- [ ] Lire les PV des 3 dernières AG (résolutions, travaux votés, contentieux mentionnés)
- [ ] Identifier les contrats fournisseurs visibles (assurance, nettoyage, chauffage)
- [ ] Vérifier l'état du fonds de réserve (solde, compte bancaire séparé)
- [ ] Informer le conseil de gérance du projet

══════════════════════════════════════════════════════════════
PHASE 2 — CONSULTATION DES COPROPRIÉTAIRES (2–3 mois avant l'AG)
══════════════════════════════════════════════════════════════

- [ ] Présenter le projet aux copropriétaires (courrier ou réunion informelle)
- [ ] Expliquer les avantages : économie honoraires ({{montant}}/an), transparence, réactivité
- [ ] Présenter le candidat bénévole (lot, disponibilité, compétences)
- [ ] Recueillir les questions et inquiétudes
- [ ] Préparer les réponses aux objections courantes :
      • "Qui va gérer la comptabilité ?" → outils numériques + skill Paperasse
      • "Et si le bénévole déménage ?" → nouveau vote en AG, retour pro possible
      • "Quelle responsabilité ?" → assurance RC syndic bénévole
      • "Et les contrats en cours ?" → continuent, juste changement d'interlocuteur
- [ ] Compter les voix probables
      Majorité ordinaire = majorité des voix des présents/représentés
      (plus de la moitié des quotes-parts des présents)
      Si quorum insuffisant à la 1ère AG → 2e AG dans 15 jours

══════════════════════════════════════════════════════════════
PHASE 3 — PRÉPARATION JURIDIQUE (1–2 mois avant l'AG)
══════════════════════════════════════════════════════════════

- [ ] Confirmer que le candidat est bien copropriétaire
- [ ] Candidat : souscrire assurance RC syndic bénévole (devis + souscription)
- [ ] Préparer le budget de transition (frais compte bancaire, assurance RC, outils)
- [ ] Préparer la comparaison de coûts (honoraires actuels vs coûts bénévole)
- [ ] Rédiger la convention de gestion / contrat de syndic bénévole si les statuts le prévoient
      → Template : templates/contrat-syndic.md

══════════════════════════════════════════════════════════════
PHASE 4 — ASSEMBLÉE GÉNÉRALE
══════════════════════════════════════════════════════════════

RECOMMANDÉ #1 : CONVOCATION (15 jours min avant l'AG)
- [ ] Inscrire résolution : non-renouvellement syndic sortant
- [ ] Inscrire résolution : élection syndic bénévole (majorité ordinaire)
- [ ] Inscrire résolution : désignation signataires du compte bancaire ACP
- [ ] Joindre au courrier :
      • Comptes + annexes + budget ordinaire
      • Procuration / pouvoir (templates/pouvoir-procuration.md)
      • Devis travaux (si applicable)
- [ ] Recommandé #1 envoyé le : ___/___/___
- [ ] Date AR reçu (ou première présentation) : ___/___/___
      → Délai 15 jours court à compter de la date d'envoi

JOUR DE L'AG
- [ ] Feuille de présence signée (templates/feuille-de-presence.md)
- [ ] Vérification quorum (≥ 50% des quotes-parts représentées)
- [ ] Si quorum insuffisant : constater et convoquer 2e AG dans 15 jours min
- [ ] Bureau élu (président ≠ syndic, secrétaire)
- [ ] Vote non-renouvellement : ___ pour / ___ contre / ___ abstention
- [ ] Vote élection bénévole : ___ pour / ___ contre / ___ abstention
- [ ] PV rédigé et signé (templates/pv-ag.md)

RECOMMANDÉ #2 : NOTIFICATION DU PV (sous 30 jours après l'AG)
- [ ] Identifier tous les copropriétaires (présents, représentés, absents)
- [ ] Recommandé #2 envoyé le : ___/___/___ (templates/notification-decision.md)
- [ ] Date AR reçu : ___/___/___
      → Délai de contestation : 4 mois à compter de cette date (art. 3.86 Cc belge)
- [ ] Date limite de contestation : ___/___/___

══════════════════════════════════════════════════════════════
PHASE 5 — TRANSMISSION DES ARCHIVES (30 jours max, art. 3.84 §5 Cc belge)
══════════════════════════════════════════════════════════════

⚠️ C'est MAINTENANT que le syndic sortant doit tout transmettre.
   Délai : 30 jours à compter de la cessation de ses fonctions.

RECOMMANDÉ #3 : NOTIFICATION AU SYNDIC SORTANT
- [ ] Recommandé #3 envoyé le : ___/___/___ (notification fin de mandat + demande transmission)
- [ ] Date AR reçu : ___/___/___
- [ ] Date limite transmission (30 jours) : ___/___/___

RÉCEPTION DES DOCUMENTS (cocher au fur et à mesure)
- [ ] Situation de trésorerie (soldes bancaires, compte fonds de réserve, rapprochement)
- [ ] Comptabilité complète (grand livre, journal, balance, factures en cours)
- [ ] État des impayés par copropriétaire (montants, ancienneté)
- [ ] Documents administratifs :
      • Statuts (acte de base + règlement de copropriété + ROI)
      • Tous les PV d'AG (pas seulement les 3 derniers)
      • Carnet d'entretien
      • DIU (Dossier d'Intervention Ultérieure)
- [ ] Liste complète des copropriétaires (noms, lots, quotes-parts, coordonnées)
- [ ] Contrats en cours :
      • Assurance incendie immeuble (n° contrat, échéance, franchise, assureur)
      • Maintenance (nettoyage, chauffage, ascenseur, espaces verts)
      • Energie (Engie, Luminus, TotalEnergies, eau SWDE/Vivaqua/De Watergroep)
      • Autres (interphone, portail, désinsectisation, extincteurs)
      • Pour chaque contrat : échéance, préavis de résiliation, clause de révision
- [ ] Clés et codes :
      • Clés locaux communs, machinerie, local technique
      • Codes portail, digicode, interphone
      • Identifiants banque en ligne, plateforme de gestion
- [ ] Dossiers contentieux et sinistres en cours
- [ ] Comptes bancaires : coordonnées compte courant + compte fonds de réserve
      Transfert des fonds ou changement de signataire

VÉRIFICATION
- [ ] Solde bancaire transmis = solde sur relevé bancaire du jour : OUI / NON
- [ ] Fonds de réserve sur compte séparé vérifié : OUI / NON
- [ ] Liste des copropriétaires cohérente avec les statuts : OUI / NON
- [ ] Tous les contrats reçus avec leurs conditions : OUI / NON
- [ ] Écarts identifiés : _______________________________________________

SI REFUS OU RETARD DE TRANSMISSION :
- [ ] Recommandé #4 : mise en demeure (rappel art. 3.84 §5 Cc belge, délai 30 jours)
      Envoyé le : ___/___/___
- [ ] Si toujours pas de réponse : saisine du Juge de Paix (référé)
      → Astreinte possible (montant par jour de retard)
      → Responsabilité civile du syndic sortant engagée

══════════════════════════════════════════════════════════════
PHASE 6 — MISE EN PLACE (dans le mois suivant la prise de fonction)
══════════════════════════════════════════════════════════════

- [ ] Ouvrir le compte bancaire courant séparé au nom de l'ACP (art. 3.89 Cc belge)
      IBAN belge : BE XX XXXX XXXX XXXX
- [ ] Ouvrir le compte épargne séparé pour le fonds de réserve
- [ ] Transférer les fonds depuis les anciens comptes
- [ ] Informer tous les fournisseurs :
      • Nouveau contact syndic (nom, téléphone, email)
      • Nouvelles coordonnées bancaires (si changement de banque)
      • Courrier type à chaque fournisseur
- [ ] Informer les copropriétaires :
      • Coordonnées du nouveau syndic
      • Nouvelles modalités de paiement des charges
      • IBAN pour les virements SEPA
- [ ] Reprendre la comptabilité :
      • Rapprochement bancaire au jour du changement
      • Vérifier concordance avec les documents transmis
      • Ouvrir les comptes dans le plan comptable ACP belge
- [ ] Émettre le premier appel de fonds au nom du nouveau syndic

TRANSITION TERMINÉE
Date de prise de fonction effective : ___/___/___
```

## Syndic Bénévole : Spécificités

**Conditions** :
- Être copropriétaire (ou représentant légal d'une personne morale copropriétaire)
- Être élu en AG à la majorité ordinaire (art. 3.84 Cc belge)
- Les statuts peuvent préciser des conditions supplémentaires

**Avantages** :
- Économie des honoraires de syndic professionnel
- Proximité avec l'immeuble et les copropriétaires
- Réactivité accrue

**Inconvénients** :
- Charge de travail importante
- Responsabilité personnelle (responsabilité contractuelle envers l'ACP)
- Nécessité de compétences variées (juridique, comptable, technique)

**Recommandations** :
- Souscrire une assurance RC syndic bénévole
- S'appuyer sur le conseil de gérance
- Utiliser des outils de gestion (Paperasse, comptabilité dédiée)
- Consulter un avocat spécialisé en droit de la copropriété pour les situations complexes

## Syndic Collectif : Spécificités

**Principe** : plusieurs copropriétaires (ou membres du conseil de gérance) assurent collectivement les fonctions de syndic.

**Conditions** :
- Vote en AG à la majorité ordinaire
- Organisation interne définie (répartition des tâches, signataires)

**Fonctionnement** :
- Répartition des tâches entre les membres (comptabilité, suivi travaux, relations fournisseurs)
- Désignation d'un représentant légal qui signe les actes et représente l'ACP
- Décisions collégiales recommandées pour les actes importants

## Syndic Professionnel Agréé IPI

En Belgique, le syndic professionnel doit être agréé par l'**IPI** (Institut Professionnel des Agents Immobiliers, loi du 11 février 2013). L'agrément implique :
- Une formation initiale reconnue
- Une assurance RC professionnelle obligatoire
- Le respect du code de déontologie IPI
- Une formation continue

Vérifier l'agrément d'un syndic professionnel : https://ipi.be/annuaire
