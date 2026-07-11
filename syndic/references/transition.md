# Transition de Syndic

## Changement de Syndic : Vue d'Ensemble

Le changement de syndic se décide en AG à la majorité de l'art. 25 (avec passerelle art. 25-1).

### Scénarios

1. **Syndic professionnel → syndic professionnel** : remplacement par un autre cabinet
2. **Syndic professionnel → syndic bénévole** : un copropriétaire prend la gestion
3. **Syndic professionnel → syndic coopératif** : le conseil syndical assure collectivement la gestion
4. **Syndic bénévole/coopératif → syndic professionnel** : retour à un professionnel

## Checklist Complète : Transition Syndic Pro → Bénévole

Copier et suivre cette checklist. Adapter les dates selon l'échéancier réel.

```
Transition syndic — {{copro.name}}
Syndic sortant : {{nom_cabinet}} (fin mandat : {{date_fin}})
Candidat bénévole : {{nom_candidat}} (lot {{n}})
AG prévue : {{date_ag}}

══════════════════════════════════════════════════════════════
PHASE 1 — ÉTAT DES LIEUX (6 mois avant l'AG)
══════════════════════════════════════════════════════════════

⚠️ Le syndic sortant n'est PAS obligé de tout transmettre avant le vote.
   Seuls les documents accessibles aux copropriétaires sont disponibles.

Sources accessibles AVANT le vote :
- Extranet copropriétaires (obligatoire ALUR) : PV des 3 dernières AG,
  règlement, carnet d'entretien, budget, comptes, fiche synthétique
- Annexes comptables présentées à la dernière AG (5 annexes)
- Contrats affichés ou communiqués (assurance, maintenance)

Ce qui ne sera accessible qu'APRÈS le vote (phase 5, art. 18-2) :
- Grand livre, journal, balance complète
- Liste complète des copropriétaires avec coordonnées
- Détail des contrats (conditions, préavis)
- Clés, codes, accès plateformes
- Dossiers contentieux

- [ ] Récupérer le contrat de syndic en cours (disponible sur extranet ou demande)
- [ ] Noter : date fin mandat, préavis de non-renouvellement, pénalités éventuelles
- [ ] Consulter les comptes sur l'extranet (dernière AG) : budget, charges, impayés
- [ ] Lire les PV des 3 dernières AG (résolutions, travaux votés, contentieux mentionnés)
- [ ] Identifier les contrats fournisseurs visibles (assurance, nettoyage, chauffage)
- [ ] Vérifier la fiche synthétique (art. 8-2) : état financier global, impayés, fonds travaux
- [ ] Informer le conseil syndical du projet

══════════════════════════════════════════════════════════════
PHASE 2 — CONSULTATION DES COPROPRIÉTAIRES (3-4 mois avant l'AG)
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
      Art. 25 = majorité de TOUS les copropriétaires (présents ou non)
      Seuil = tantièmes_total / 2 + 1 = {{tantiemes_total}} / 2 + 1 = {{seuil}} tantièmes
      Si échec mais ≥ 1/3 obtenu ({{tantiemes_total / 3}}), passerelle art. 25-1

══════════════════════════════════════════════════════════════
PHASE 3 — PRÉPARATION JURIDIQUE (2-3 mois avant l'AG)
══════════════════════════════════════════════════════════════

- [ ] Confirmer que le candidat est bien copropriétaire (art. 17-1)
- [ ] Candidat : souscrire assurance RC syndic bénévole (devis + souscription)
- [ ] Rédiger le contrat de syndic bénévole (conforme décret 26 mars 2015)
      → Template : templates/contrat-syndic.md
- [ ] Préparer le budget de transition (frais compte bancaire, assurance RC, outils)
- [ ] Préparer la comparaison de coûts (honoraires actuels vs coûts bénévole)

══════════════════════════════════════════════════════════════
PHASE 4 — ASSEMBLÉE GÉNÉRALE
══════════════════════════════════════════════════════════════

LRAR #1 : CONVOCATION (21 jours min avant l'AG)
- [ ] Inscrire résolution : non-renouvellement syndic sortant (art. 25)
- [ ] Inscrire résolution : élection syndic bénévole (art. 25, passerelle 25-1)
- [ ] Inscrire résolution : approbation du contrat de syndic
- [ ] Inscrire résolution : désignation signataires du compte bancaire
- [ ] Joindre au courrier :
      • Projet de contrat de syndic (obligatoire, art. 11 décret 1967)
      • Formulaire de vote par correspondance (templates/vote-par-correspondance.md)
      • Pouvoir / procuration (templates/pouvoir-procuration.md)
      • Comptes + 5 annexes + budget prévisionnel
      • Devis travaux (si applicable)
- [ ] LRAR #1 envoyée le : ___/___/___
- [ ] Date AR reçu (ou première présentation) : ___/___/___
      → Délai 21 jours court à compter du lendemain de la première présentation

JOUR DE L'AG
- [ ] Feuille de présence signée (templates/feuille-de-presence.md)
- [ ] Bureau élu (président ≠ syndic, secrétaire, scrutateurs)
- [ ] Vote non-renouvellement : ___ pour / ___ contre / ___ abstention
- [ ] Vote élection bénévole : ___ pour / ___ contre / ___ abstention
- [ ] Si art. 25 non atteint mais ≥ 1/3 des voix : second vote immédiat (art. 25-1)
- [ ] PV rédigé et signé (templates/pv-ag.md)

LRAR #2 : NOTIFICATION DU PV (sous 1 mois après l'AG)
- [ ] Identifier les absents non représentés + opposants + abstentionnistes
- [ ] LRAR #2 envoyée le : ___/___/___ (templates/notification-decision.md)
- [ ] Date AR reçu : ___/___/___
      → Délai de contestation : 2 mois à compter de cette date (art. 42 loi 1965)
- [ ] Date limite de contestation : ___/___/___

══════════════════════════════════════════════════════════════
PHASE 5 — TRANSMISSION DES ARCHIVES (3 mois max, art. 18-2)
══════════════════════════════════════════════════════════════

⚠️ C'est MAINTENANT que le syndic sortant doit tout transmettre.
   Délai : 3 mois à compter de la cessation de ses fonctions.

LRAR #3 : NOTIFICATION AU SYNDIC SORTANT
- [ ] LRAR #3 envoyée le : ___/___/___ (notification fin de mandat + demande transmission)
- [ ] Date AR reçu : ___/___/___
- [ ] Date limite transmission (3 mois) : ___/___/___

RÉCEPTION DES DOCUMENTS (cocher au fur et à mesure)
- [ ] Situation de trésorerie (soldes bancaires, placements, rapprochement)
- [ ] Comptabilité complète (grand livre, journal, balance, factures en cours)
- [ ] État des impayés par copropriétaire (montants, ancienneté)
- [ ] Documents administratifs :
      • Règlement de copropriété + état descriptif de division
      • Tous les PV d'AG (pas seulement les 3 derniers)
      • Carnet d'entretien
      • Fiche synthétique
- [ ] Liste complète des copropriétaires (noms, lots, tantièmes, coordonnées)
- [ ] Contrats en cours :
      • Assurance multirisques (n° contrat, échéance, franchise)
      • Maintenance (nettoyage, chauffage, ascenseur, espaces verts)
      • Énergie (EDF, gaz, eau)
      • Autres (interphone, portail, désinsectisation, extincteurs)
      • Pour chaque contrat : échéance, préavis de résiliation, clause de révision
- [ ] Clés et codes :
      • Clés locaux communs, machinerie, local technique
      • Codes portail, digicode, interphone
      • Identifiants extranet, banque en ligne, RNC
- [ ] Dossiers contentieux et sinistres en cours
- [ ] Compte bancaire : transfert fonds ou changement signataire

VÉRIFICATION
- [ ] Solde bancaire transmis = solde sur relevé bancaire du jour : OUI / NON
- [ ] Liste des copropriétaires cohérente avec le règlement : OUI / NON
- [ ] Tous les contrats reçus avec leurs conditions : OUI / NON
- [ ] Écarts identifiés : _______________________________________________

SI REFUS OU RETARD DE TRANSMISSION :
- [ ] LRAR #4 : mise en demeure (rappel art. 18-2, délai 30 jours)
      Envoyée le : ___/___/___
- [ ] Si toujours pas de réponse : saisine tribunal judiciaire (référé)
      → Astreinte possible (montant par jour de retard)
      → Responsabilité civile du syndic sortant engagée

══════════════════════════════════════════════════════════════
PHASE 6 — MISE EN PLACE (dans le mois suivant la prise de fonction)
══════════════════════════════════════════════════════════════

- [ ] Ouvrir le compte bancaire séparé au nom du syndicat (art. 18, II loi 1965)
- [ ] Transférer les fonds depuis l'ancien compte
- [ ] Informer tous les fournisseurs :
      • Nouveau contact syndic (nom, téléphone, email)
      • Nouvelles coordonnées bancaires (si changement de banque)
      • Courrier type à chaque fournisseur
- [ ] Informer les copropriétaires :
      • Coordonnées du nouveau syndic
      • Nouvelles modalités de paiement des charges
      • IBAN pour les virements
- [ ] Mettre à jour l'immatriculation RNC (dans les 2 mois suivant l'AG ayant approuvé les comptes, art. R. 711-10 CCH)
      → https://www.registre-coproprietes.gouv.fr
- [ ] Reprendre la comptabilité :
      • Rapprochement bancaire au jour du changement
      • Vérifier concordance avec les documents transmis
      • Ouvrir les comptes dans le plan comptable copro
- [ ] Mettre en place l'extranet copropriétaires (obligation ALUR)
- [ ] Émettre le premier appel de fonds au nom du nouveau syndic

TRANSITION TERMINÉE ✓
Date de prise de fonction effective : ___/___/___
```

## Processus Détaillé

### Phase 1 : Préparation (3-6 mois avant l'AG)

1. **Consulter le contrat de syndic en cours**
   - Date d'échéance du mandat
   - Clause de non-renouvellement (préavis à respecter)
   - Pénalités éventuelles

2. **Informer le conseil syndical**
   - Présenter le projet de changement
   - Obtenir l'accord du conseil (recommandé)

3. **Si syndic bénévole : identifier le candidat**
   - Doit être copropriétaire
   - Disponibilité suffisante
   - Compétences de gestion (ou accompagnement)
   - Souscrire une assurance RC (recommandé)

4. **Si syndic coopératif : préparer le conseil syndical**
   - Les membres du conseil assument collectivement la gestion
   - Le président du conseil syndical est le syndic de fait
   - Répartir les tâches entre les membres

5. **Préparer le contrat de syndic**
   - Le contrat type est fixé par décret (décret du 26 mars 2015)
   - Adapter au type de syndic (bénévole ou coopératif)
   - Définir la rémunération (bénévole : souvent gratuit ou symbolique)
   - Fixer la durée du mandat (1 à 3 ans)

Voir template : [templates/contrat-syndic.md](../templates/contrat-syndic.md)

### Phase 2 : Assemblée Générale

**Résolutions à inscrire à l'ordre du jour :**

1. Non-renouvellement du syndic sortant (art. 25)
2. Élection du nouveau syndic (art. 25, avec passerelle art. 25-1)
3. Approbation du contrat de syndic
4. Si syndic coopératif : adoption du mode coopératif (art. 17-1-1)
5. Fixation de la rémunération (le cas échéant)
6. Mandats de signature bancaire

**Le projet de contrat de syndic doit être joint à la convocation** (art. 11 décret 1967).

### Phase 3 : Transition (dans les 3 mois suivant l'AG)

#### Transmission des archives (art. 18-2 loi 1965)

Le syndic sortant est **obligé** de transmettre au nouveau syndic, dans un délai de **3 mois** à compter de la cessation de ses fonctions :

**Documents à transmettre :**

1. **Situation de trésorerie**
   - Soldes bancaires au jour du changement
   - État des placements
   - Rapprochement bancaire à date

2. **Comptabilité**
   - Grand livre, journal, balance
   - Factures en cours et à venir
   - Appels de fonds émis et encaissements reçus
   - État des impayés par copropriétaire

3. **Documents administratifs**
   - Règlement de copropriété et état descriptif de division
   - PV de toutes les AG
   - Carnet d'entretien
   - Fiche synthétique
   - Liste des copropriétaires (noms, tantièmes, coordonnées)

4. **Contrats en cours**
   - Tous les contrats (assurance, maintenance, énergie)
   - Échéanciers et préavis
   - Garanties et cautions

5. **Clés et codes**
   - Clés des locaux communs, machineries, locaux techniques
   - Codes d'accès (portail, digicode, interphone)
   - Accès aux plateformes en ligne (extranet, banque, RNC)

6. **Contentieux**
   - Dossiers de procédures en cours
   - Sinistres et dossiers d'assurance en cours
   - Courriers d'avocats

7. **Banque**
   - Clôture du compte séparé ancien
   - Transfert des fonds vers le nouveau compte
   - Ou changement de signataire si même banque

#### En cas de refus de transmission

Si le syndic sortant ne transmet pas les archives dans le délai de 3 mois :
1. Mise en demeure par LRAR
2. Si pas de réponse : saisine du tribunal judiciaire (référé)
3. Astreinte possible (montant par jour de retard)
4. Le syndic sortant engage sa responsabilité civile

### Phase 4 : Mise en place

1. **Ouvrir le compte bancaire séparé** (obligatoire, art. 18, II loi 1965)
   - Compte au nom du syndicat des copropriétaires
   - Signataire : le syndic (ou le président du conseil syndical en coopératif)

2. **Informer les fournisseurs** du changement de syndic
   - Nouveau contact pour la facturation
   - Nouvelles coordonnées bancaires pour les prélèvements

3. **Informer les copropriétaires**
   - Coordonnées du nouveau syndic
   - Nouvelles modalités de paiement
   - Accès à l'extranet

4. **Mettre à jour l'immatriculation RNC**
   - Dans les 2 mois suivant le changement
   - Sur https://www.registre-coproprietes.gouv.fr

5. **Reprendre la comptabilité**
   - État de rapprochement au jour du changement
   - Vérifier la concordance avec les documents transmis
   - Identifier les écarts éventuels

## Syndic Bénévole : Spécificités (art. 17-1 loi 1965)

**Conditions** :
- Être copropriétaire (ou représentant légal d'une personne morale copropriétaire)
- Être élu en AG (art. 25)
- Contrat de syndic conforme au contrat type

**Avantages** :
- Économie des honoraires de syndic professionnel
- Proximité avec l'immeuble et les copropriétaires
- Réactivité accrue

**Inconvénients** :
- Charge de travail importante
- Responsabilité personnelle
- Nécessité de compétences variées (juridique, comptable, technique)

**Recommandations** :
- Souscrire une assurance RC syndic bénévole
- S'appuyer sur le conseil syndical
- Utiliser des outils de gestion (logiciel comptable, extranet)
- Consulter un avocat pour les situations complexes

## Syndic Coopératif : Spécificités (art. 17-1-1 loi 1965)

**Principe** : le conseil syndical assure collectivement les fonctions de syndic. Le président du conseil syndical est le syndic de droit.

**Conditions** :
- Vote en AG à la majorité de l'art. 25
- Le conseil syndical doit être composé d'au moins 3 membres

**Fonctionnement** :
- Répartition des tâches entre les membres
- Décisions collégiales du conseil syndical
- Le président signe les actes et représente le syndicat
- Pas de rémunération (sauf vote AG)
- Soumis au contrat type de syndic
