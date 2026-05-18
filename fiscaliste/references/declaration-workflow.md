# Workflow de Déclaration IPP belge (Tax-on-web)

<!-- last_updated: 2026-05-15 -->

Guide d'exécution complet pour la déclaration annuelle IPP d'un contribuable belge (revenus 2025, exercice d'imposition 2026).

Ce workflow couvre les étapes de la déclaration, de la collecte des documents à la vérification de l'avertissement-extrait de rôle (AER), en passant par les choix déclaratifs sur Tax-on-web.

---

## Vue d'ensemble

```
Phase 1 : Préparation
  1. Collecte des justificatifs et fiches fiscales
  2. Vérification du pré-remplissage MyMinfin
  3. Identification des catégories de revenus

Phase 2 : Choix déclaratifs
  4. Option de globalisation revenus mobiliers (rarement avantageuse)
  5. Frais professionnels : forfait vs frais réels
  6. Épargne-pension et ELT

Phase 3 : Saisie dans Tax-on-web
  7. Déclaration principale — cadres I à XVIII
  8. Vérification des données pré-remplies

Phase 4 : Vérification et suivi
  9. Simulation avant dépôt
  10. Vérification de l'avertissement-extrait de rôle (AER)
```

---

## Phase 1 : Préparation

### Étape 1 : Collecte des justificatifs et fiches fiscales

**Objectif** : rassembler TOUS les documents permettant de remplir la déclaration.

**Documents par source** :

| Source | Document | Usage |
|--------|----------|-------|
| Employeur | Fiche fiscale 281.10 | Rémunérations (case 250), PP retenu (case 286), ATN (case 288) |
| ONEm | Attestation fiscale allocations chômage | Case 250 / case revenus de remplacement |
| INAMI | Attestation indemnités maladie | Case revenus de remplacement |
| Caisse de pension | Attestation pension complémentaire | Cadre IV pensions |
| Banque / courtier | Relevé de compte, attestation PM retenu | Revenus mobiliers étrangers (cadre VII) |
| Compagnie assurance | Relevé contrat branche 21/23 | Rachats éventuels |
| Notaire / régie | Acte de vente immobilière | Plus-values immobilières (cadre XVI) |
| SPF Finances | Revenu cadastral (disponible sur MyMinfin) | Cadre III revenus immobiliers |
| Organisme épargne-pension | Attestation 281.60 | Cadre IX — épargne-pension |
| Organisme ELT | Attestation 281.61 | Cadre IX — épargne à long terme |
| Association agréée | Reçu fiscal (attestation 281.71) | Cadre X — dons |
| Crèche / garderie | Attestation frais garde enfant | Cadre X — frais garde |
| Exchange crypto | Historique transactions | Cadre XV (si revenus imposables) |

**Contrôle** : vérifier que toutes les fiches fiscales 281.xx sont disponibles sur **MyMinfin** (myminfin.be) et correspondent aux justificatifs reçus. Les oublis fréquents : comptes étrangers, revenus immobiliers locatifs à usage professionnel, ATN véhicule, pensions complémentaires.

### Étape 2 : Vérification du pré-remplissage MyMinfin

Tax-on-web pré-remplit automatiquement une partie de la déclaration sur la base des fiches fiscales transmises par les employeurs, organismes de pension, banques, etc.

**Actions obligatoires** :
- Vérifier chaque donnée pré-remplie avec la fiche fiscale correspondante
- Compléter les revenus **non transmis automatiquement** : revenus étrangers, revenus immobiliers locatifs à usage professionnel, crypto imposables
- Corriger toute discordance avant de valider

**MyMinfin** (myminfin.be) donne accès à :
- Toutes les fiches fiscales 281.xx reçues par le SPF Finances
- Le revenu cadastral des immeubles possédés
- L'historique des déclarations et avertissements-extraits de rôle
- Le simulateur IPP officiel

### Étape 3 : Identification des catégories de revenus

**Objectif** : catégoriser chaque revenu pour savoir dans quel cadre de la déclaration le reporter.

| Catégorie | Cadre Tax-on-web | Fiche fiscale |
|-----------|-----------------|---------------|
| Rémunérations salariales | Cadre IV | 281.10 |
| Rémunérations de dirigeants | Cadre XVI (ou IV selon) | 281.20 |
| Pensions (légale 1er pilier) | Cadre IV | 281.11 |
| Pensions complémentaires (2e pilier) | Cadre IV | 281.11 / 281.32 |
| Allocations chômage | Cadre IV (revenus de remplacement) | Attestation ONEm |
| Indemnités maladie | Cadre IV (revenus de remplacement) | Attestation INAMI |
| Revenus immobiliers (RC) | Cadre III | Données SPF AGDP |
| Revenus locatifs à usage professionnel | Cadre III | Contrat + loyers |
| Dividendes et intérêts étrangers | Cadre VII | Relevé banque |
| Gains de cession d'entreprise | Cadre XVI | Acte |
| Épargne-pension | Cadre IX | 281.60 |
| Épargne à long terme (ELT) | Cadre IX | 281.61 |
| Dons à institutions agréées | Cadre X | 281.71 |
| Frais garde d'enfant | Cadre X | Attestation garderie |
| Revenus divers spéculatifs (crypto) | Cadre XV | Export exchanges |
| Constructions juridiques | Cadre XIII | Documentation |
| Comptes à l'étranger | Cadre XIII (déclaration BNB) | Relevés étrangers |

---

## Phase 2 : Choix déclaratifs

### Étape 4 : Option de globalisation des revenus mobiliers

En Belgique, le **précompte mobilier (PM) est libératoire** (art. 313 CIR 92) : les revenus mobiliers soumis au PM belge n'ont pas à être déclarés.

**Option de globalisation** : le contribuable peut choisir de déclarer volontairement ses revenus mobiliers soumis au PM belge pour demander la régularisation au barème IPP. Cette option peut être favorable si le TMI IPP du contribuable est inférieur au taux PM (30 %).

**Règle d'orientation** :

| TMI IPP effectif | Option globalisante |
|-----------------|---------------------|
| 0 % (non imposable) | Potentiellement favorable — récupère le PM retenu |
| 25 % | Potentiellement favorable — vérifier cas par cas |
| 40 % ou plus | Défavorable — PM libératoire à 30 % plus intéressant |

**Note importante** : l'option de globalisation est **rarement avantageuse** car elle expose tous les revenus mobiliers au barème IPP. À chiffrer précisément avant de l'exercer.

**Revenus mobiliers étrangers** : eux doivent toujours être déclarés (cadre VII) — pas de PM libératoire belge sur ces revenus.

### Étape 5 : Frais professionnels — forfait vs frais réels

**Salariés** :
- **Forfait** : 30 % des rémunérations nettes (après ONSS), maximum 5 930 € (revenus 2025). Appliqué automatiquement par Tax-on-web.
- **Frais réels** : si les frais réels documentés dépassent le forfait. Déclaration dans le cadre IV avec justificatifs. Frais admissibles : frais de déplacement domicile-travail, frais de formation, frais de bureau si télétravail structurel, etc.

**Dirigeants d'entreprise** :
- **Forfait** : 3 % des rémunérations nettes, maximum 2 890 € (revenus 2025).
- **Frais réels** : peu fréquent en pratique (plafond forfait très bas, incitation à opter pour le réel si charges importantes).

**Règle** : opter pour les frais réels uniquement si ceux-ci sont clairement documentés et dépassent le forfait. Le risque de contrôle est plus élevé avec les frais réels.

### Étape 6 : Épargne-pension et ELT

**Épargne-pension** (art. 145¹ CIR 92) :
- Versements déclarés automatiquement via fiche 281.60
- Réduction d'impôt : 30 % si versement ≤ 1 050 € ; 25 % si versement entre 1 050 € et 1 350 € (revenus 2025)
- Vérifier le montant exact versé avant validation

**Épargne à long terme (ELT)** (art. 145¹⁰ CIR 92) :
- Remboursement de capital d'emprunt hypothécaire qualifié + assurance-vie liée
- Réduction d'impôt : 30 % sur les versements, maximum 2 450 € de base (plafond net d'impôt selon les revenus)
- Attestation 281.61 nécessaire

---

## Phase 3 : Saisie dans Tax-on-web

### Étape 7 : Structure de la déclaration IPP — cadres I à XVIII

La déclaration IPP belge est organisée en cadres numérotés. Les principaux :

| Cadre | Contenu |
|-------|---------|
| **Cadre I** | Renseignements personnels, situation familiale, personnes à charge |
| **Cadre II** | Immeubles (habitation propre — région) |
| **Cadre III** | Revenus immobiliers fédéraux (RC biens non habitation propre, revenus locatifs pro) |
| **Cadre IV** | Revenus professionnels (salaires, pensions, revenus de remplacement, profits, bénéfices) |
| **Cadre V** | Rémunérations de travailleurs (onglet salarié détaillé) |
| **Cadre VI** | Profits (professions libérales, indépendants) |
| **Cadre VII** | Revenus mobiliers (dividendes et intérêts étrangers non soumis au PM belge) |
| **Cadre VIII** | Revenus divers (sous-location, droits d'auteur partiellement) |
| **Cadre IX** | Épargne à long terme et épargne-pension |
| **Cadre X** | Dons, frais de garde d'enfant, sécurité habitation, autres réductions |
| **Cadre XII** | Chèque-habitat régional (déductions régionales — Wallonie/Bruxelles) |
| **Cadre XIII** | Comptes et constructions juridiques à l'étranger |
| **Cadre XIV** | Revenus exonérés (conventions fiscales internationales) |
| **Cadre XV** | Revenus divers imposables (spéculatifs — crypto, plus-values spéculatives) |
| **Cadre XVI** | Plus-values immobilières imposables, revenus de dirigeants spécifiques |
| **Cadre XVII** | Acomptes provisionnels versés |
| **Cadre XVIII** | Profits de cessation, revenus exceptionnels |

**Points d'attention systématiques** :
- Vérifier le cadre I : personnes à charge (enfants, ascendants), situation familiale — détermine les quotités exemptées
- Enfants en garde alternée : option de répartition à cocher dans cadre I (art. 132bis CIR 92)
- Comptes étrangers : obligation déclarative cadre XIII + BNB (séparément)
- Revenus immobiliers locatifs à usage professionnel : à saisir manuellement dans cadre III (non pré-rempli)

### Étape 8 : Vérification des données pré-remplies

**Avant de valider** :
- Comparer chaque case pré-remplie avec la fiche fiscale 281 correspondante
- Vérifier le PP retenu (case 286 de la fiche 281.10) — doit correspondre aux retenues effectives
- Vérifier l'ATN véhicule si applicable (case 288) — souvent pré-rempli mais peut être erroné
- Contrôler les montants d'épargne-pension (281.60) et ELT (281.61)

---

## Phase 4 : Vérification et suivi

### Étape 9 : Simulation avant dépôt

**Outils** :
- **Simulateur IPP MyMinfin** : https://myminfin.be (section "Simulateur fiscal")
- Avertissement-extrait de rôle N-1 à titre de comparaison
- Checklist ci-dessous

**Checklist pré-validation** :

- [ ] Situation familiale et personnes à charge correctement renseignées (cadre I)
- [ ] Quotités exemptées cohérentes avec le nombre d'enfants à charge
- [ ] Enfants en garde alternée : option de répartition choisie si applicable
- [ ] Frais professionnels : forfait ou réel correctement sélectionné
- [ ] Revenus immobiliers déclarés (habitation secondaire, locatif)
- [ ] Revenus mobiliers étrangers déclarés en cadre VII si non soumis au PM belge
- [ ] Épargne-pension dans les limites (≤ 1 350 €) — vérifier taux 30 % vs 25 %
- [ ] ELT déclaré avec attestation 281.61
- [ ] Dons à institutions agréées (min 40 €, max 10 % des revenus) — réduction 45 %
- [ ] Frais garde d'enfant déclarés (cadre X) — réduction 45 %
- [ ] Comptes étrangers déclarés (cadre XIII + BNB séparément)
- [ ] Crypto spéculative déclarée cadre XV si applicable
- [ ] Acomptes provisionnels repris au cadre XVII
- [ ] Additionnels communaux : commune correctement renseignée

### Étape 10 : Vérification de l'avertissement-extrait de rôle (AER)

**Objectif** : contrôler que l'AER reçu (automne suivant le dépôt) correspond à la simulation.

L'**AER (avertissement-extrait de rôle)** est le document officiel envoyé par le SPF Finances après traitement de la déclaration. Il indique :
- L'IPP total dû
- Les additionnels communaux
- Le PP déjà retenu
- Le solde à payer ou à rembourser

**Points à contrôler** :
- IPP net cohérent avec la simulation pré-dépôt
- Additionnels communaux au taux correct (vérifier la commune)
- PP crédité exact (correspond à la case 286 de la fiche 281.10)
- Solde à payer ou montant à rembourser

**Délai de paiement** : le solde est à payer dans les **2 mois** suivant l'envoi de l'AER. Un délai de paiement peut être demandé en cas de difficultés.

**En cas de désaccord** : réclamation à introduire auprès du SPF Finances dans le délai légal (6 mois à partir de la date d'envoi de l'AER).

---

## Calendrier type (revenus 2025 → exercice d'imposition 2026)

| Date | Action |
|------|--------|
| Décembre 2025 | Versement épargne-pension / ELT avant le 31/12 |
| Décembre 2025 | Dons à institutions agréées avant le 31/12 |
| Janvier-mars 2026 | Réception des fiches fiscales 281.xx et attestations |
| Avril-mai 2026 | Ouverture de Tax-on-web pour la déclaration revenus 2025 |
| **Mi-juillet 2026** | Date limite déclaration papier |
| **Fin juillet 2026** | Date limite déclaration via Tax-on-web (contribuable lui-même) |
| **Fin octobre 2026** | Date limite déclaration via mandataire (expert-comptable, comptable) |
| Automne 2026 | Réception de l'avertissement-extrait de rôle (AER) |
| Dans les 2 mois de l'AER | Paiement du solde (si solde à payer) |
| 10 avril 2026 | VA1 — premier acompte provisionnel (si applicable) |
| 10 juillet 2026 | VA2 — deuxième acompte provisionnel |
| 10 octobre 2026 | VA3 — troisième acompte provisionnel |
| 20 décembre 2026 | VA4 — quatrième acompte provisionnel |

**Note** : les dates limites Tax-on-web sont fixées par arrêté royal chaque année. Vérifier sur finances.belgium.be.

---

## Pièges fréquents

1. **Ne pas vérifier les données pré-remplies** : Tax-on-web pré-remplit sur base des fiches 281 mais des erreurs sont possibles (ATN erroné, PP incorrect, montant épargne-pension inexact).
2. **Oublier de déclarer un compte étranger** à la BNB : amende distincte de 1 250 € à 6 250 €, indépendamment de l'IPP.
3. **Confondre PM libératoire et déclaration obligatoire** : les revenus mobiliers belges soumis au PM ne se déclarent pas (en principe) ; les revenus étrangers doivent l'être.
4. **Passer à côté de la réduction 45 % sur les dons** : seuil minimum 40 €, montant maximum 10 % des revenus nets — vérifier l'attestation 281.71.
5. **Oublier les acomptes provisionnels au cadre XVII** : sans les reprendre, ils ne sont pas crédités et génèrent un solde fantôme à payer.
6. **Mauvaise commune déclarée** : les additionnels communaux (6 % à 9 %) varient selon la commune de résidence au 1er janvier.
7. **Revenus crypto spéculatifs non déclarés** : le cadre XV est obligatoire si les gains sont imposables (art. 90, 1° CIR 92).
8. **Revenus locatifs à usage professionnel oubliés** : non pré-remplis par Tax-on-web — à saisir manuellement.

---

## Références CIR 92 / Fisconetplus

| Règle | Article CIR 92 |
|-------|---------------|
| Obligation déclarative | art. 305 à 310 |
| PM libératoire (pas de déclaration) | art. 313 |
| Quotités exemptées | art. 131 à 134 |
| Épargne-pension — réduction | art. 145¹ |
| ELT — réduction | art. 145¹⁰ |
| Dons — réduction 45 % | art. 145³³ |
| Frais garde enfant — réduction 45 % | art. 145³⁴ et s. |
| Déclaration comptes étrangers | art. 307 §1, al. 4 |
| Délai de réclamation | art. 371 |

Source : Tax-on-web — https://www.taxonweb.be
MyMinfin — https://www.myminfin.be
Fisconetplus : https://www.fisconetplus.be
SPF Finances : https://finances.belgium.be/fr/particuliers/declaration
