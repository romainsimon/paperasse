---
name: parents-eleves-association
metadata:
  last_updated: 2026-07-16
includes:
  - data/**
  - templates/**
  - association.example.json
  - evenement.example.json
description: |
  Couvre tout l'écosystème d'une association de parents d'élèves française (loi 1901,
  loi locale 1908 pour l'Alsace-Moselle). Trésorerie (ANC 2018-06, franchise 81 051 EUR
  2026, reçus fiscaux art. 200 / 238 bis CGI, mécénat Coluche 75 %, seuil CAC 153 k EUR),
  secrétariat (statuts, RNA/JOAFE, AG, PV, instances, Le Compte Asso, dissolution),
  représentation parents (élections art. D111-10 à D111-15, conseil d'école, CA EPLE,
  conseil de classe), événementiel (loteries L. 322-1+ CSP, buvettes L. 3334-2,
  vide-greniers L. 310-2 C. com., ERP, SACEM/SPRE, conventions locaux scolaires),
  communication (RGPD art. 6/7/8/13/30/32/33, loi 1978 art. 7-1, droit à l'image,
  autorisation parentale, registre traitements, AIPD) et cadre juridique de l'enseignement
  quand l'école est Montessori (statut hors contrat / sous contrat, art. L. 441-1+ et
  loi Gatel 2018-266, socle commun, instruction obligatoire, nom « Montessori » non
  protégé). Utilisé par les bénévoles d'une APE/APEEE/APEL et par les parents élus
  en conseil d'école ou CA.
---

# Association de parents d'élèves

Skill consolidé pour tout ce qui concerne le fonctionnement d'une association de parents d'élèves (APE) : gouvernance, comptabilité, événementiel, représentation parents, communication, et cadre juridique de l'école quand elle est Montessori (statut hors contrat / sous contrat).

## Prérequis : `association.json`

**À chaque conversation**, vérifier la présence d'un `association.json` à la racine du projet :

- Fichier présent → le lire, afficher l'identité de l'association (nom, sigle, RNA, exercice, bureau), router selon la demande.
- Fichier absent ou seulement `association.example.json` → lancer le **setup guidé** depuis [references/secretariat/statuts.md](references/secretariat/statuts.md) et [references/tresorerie/setup.md](references/tresorerie/setup.md). Demander : nom, sigle, objet, RNA, date de déclaration, exercice social, bureau (président, secrétaire, trésorier), régime fiscal.

**Ne jamais donner de conseil opérationnel** (écriture comptable, convocation AG, autorisation de tombola, modèle d'autorisation d'image…) **sans `association.json` validé**.

Schéma complet : [`association.example.json`](association.example.json) (identité, siège, identifiants, déclaration, instances, exercice, membres, comptabilité, fiscal/social, reçu fiscal, subventions, banques, agréments, Le Compte Asso).

Schéma événement unitaire : [`evenement.example.json`](evenement.example.json) (un JSON par événement géré : kermesse, tombola, vide-grenier, loto, fête, marché de Noël).

## Workflow

### 0. Échéances (automatique)

Consolider les échéances de l'association depuis [references/tresorerie/calendrier.md](references/tresorerie/calendrier.md) (AG d'approbation des comptes, déclaration dirigeants Le Compte Asso, rescrit fiscal mécénat) et [references/evenementiel/calendrier-evenementiel.md](references/evenementiel/calendrier-evenementiel.md) (kermesse, vide-grenier saisonnier, marché de Noël) et [references/representation/elections.md](references/representation/elections.md) (élections parents d'élèves, calendrier ministériel).

🔴 < 7 jours | 🟠 7-14 jours | 🟡 15-30 jours

### 1. Router la demande

| Domaine | Référence principale |
|---------|---------------------|
| **Trésorerie** : écritures, ANC 2018-06, plan comptable, clôture | [references/tresorerie/anc-2018-06.md](references/tresorerie/anc-2018-06.md) |
| **Trésorerie** : fiscalité, franchise impôts commerciaux, TVA, IS | [references/tresorerie/fiscalite.md](references/tresorerie/fiscalite.md) |
| **Trésorerie** : dons, mécénat, reçus fiscaux, loi Coluche | [references/tresorerie/dons-mecenat.md](references/tresorerie/dons-mecenat.md) |
| **Trésorerie** : subventions publiques, seuil 153 k EUR, convention | [references/tresorerie/subventions.md](references/tresorerie/subventions.md) |
| **Secrétariat** : loi 1901, statuts, objet, fondation | [references/secretariat/loi-1901.md](references/secretariat/loi-1901.md), [references/secretariat/statuts.md](references/secretariat/statuts.md) |
| **Secrétariat** : RNA, JOAFE, déclaration préfecture | [references/secretariat/declaration-rna-joafe.md](references/secretariat/declaration-rna-joafe.md) |
| **Secrétariat** : AG, convocation, PV, registre | [references/secretariat/assemblee-generale.md](references/secretariat/assemblee-generale.md), [references/secretariat/pv-registre.md](references/secretariat/pv-registre.md) |
| **Secrétariat** : CA, bureau, instances | [references/secretariat/instances.md](references/secretariat/instances.md) |
| **Secrétariat** : règlement intérieur, dissolution, archives | [references/secretariat/reglement-interieur.md](references/secretariat/reglement-interieur.md), [references/secretariat/dissolution.md](references/secretariat/dissolution.md), [references/secretariat/archives.md](references/secretariat/archives.md) |
| **Secrétariat** : SIRET, Le Compte Asso | [references/secretariat/siret.md](references/secretariat/siret.md), [references/secretariat/le-compte-asso.md](references/secretariat/le-compte-asso.md) |
| **Secrétariat** : Alsace-Moselle (loi 1908) | [references/secretariat/alsace-moselle.md](references/secretariat/alsace-moselle.md) |
| **Représentation** : cadre légal D111-1+, élections | [references/representation/cadre-legal.md](references/representation/cadre-legal.md), [references/representation/elections.md](references/representation/elections.md) |
| **Représentation** : conseil d'école, CA, conseil de classe | [references/representation/conseil-ecole.md](references/representation/conseil-ecole.md), [references/representation/conseil-administration.md](references/representation/conseil-administration.md), [references/representation/conseil-classe.md](references/representation/conseil-classe.md) |
| **Représentation** : droits parents, public/privé/hors contrat | [references/representation/droits-parents.md](references/representation/droits-parents.md), [references/representation/public-vs-prive.md](references/representation/public-vs-prive.md) |
| **Événementiel** : loteries, tombolas, lotos | [references/evenementiel/loteries-tombolas.md](references/evenementiel/loteries-tombolas.md) |
| **Événementiel** : buvettes, zones protégées, licences | [references/evenementiel/buvette-temporaire.md](references/evenementiel/buvette-temporaire.md) |
| **Événementiel** : vide-grenier, registre vendeurs | [references/evenementiel/vide-grenier.md](references/evenementiel/vide-grenier.md) |
| **Événementiel** : ERP, sécurité, capacité | [references/evenementiel/erp-securite.md](references/evenementiel/erp-securite.md) |
| **Événementiel** : SACEM/SPRE, droits musique | [references/evenementiel/sacem-spre.md](references/evenementiel/sacem-spre.md) |
| **Événementiel** : convention locaux scolaires, mairie | [references/evenementiel/locaux-scolaires.md](references/evenementiel/locaux-scolaires.md), [references/evenementiel/autorisations-mairie.md](references/evenementiel/autorisations-mairie.md) |
| **Événementiel** : assurance, billetterie, kermesse | [references/evenementiel/assurance-evenementielle.md](references/evenementiel/assurance-evenementielle.md), [references/evenementiel/billetterie.md](references/evenementiel/billetterie.md), [references/evenementiel/checklist-kermesse.md](references/evenementiel/checklist-kermesse.md) |
| **Communication** : RGPD, base légale, registre | [references/communication/rgpd.md](references/communication/rgpd.md), [references/communication/registre-traitements.md](references/communication/registre-traitements.md) |
| **Communication** : loi 1978, art. 7-1, seuil 15 ans | [references/communication/loi-1978.md](references/communication/loi-1978.md) |
| **Communication** : droit à l'image, autorisation parentale | [references/communication/droit-image.md](references/communication/droit-image.md), [references/communication/modele-autorisation-image.md](references/communication/modele-autorisation-image.md) |
| **Communication** : canaux, newsletter, crise, AIPD | [references/communication/canaux-diffusion.md](references/communication/canaux-diffusion.md), [references/communication/newsletter.md](references/communication/newsletter.md), [references/communication/communication-crise.md](references/communication/communication-crise.md), [references/communication/aipd.md](references/communication/aipd.md) |
| **Communication** : droits personnes, violation, politique conf. | [references/communication/droits-personnes.md](references/communication/droits-personnes.md), [references/communication/violation-donnees.md](references/communication/violation-donnees.md), [references/communication/politique-confidentialite.md](references/communication/politique-confidentialite.md) |
| **École Montessori** : cadre juridique, statut hors contrat / sous contrat, loi Gatel, socle commun, nom non protégé | [references/pedagogie/cadre-juridique.md](references/pedagogie/cadre-juridique.md) |

### 2. Vérifier les sources

Toute affirmation chiffrée (seuils, taux, dates limites) doit citer un texte officiel daté. Index des sources : `references/<domaine>/sources.md` dans chaque domaine.

### 3. Fraîcheur (automatique)

`last_updated: 2026-07-16`. Si plus de 6 mois, vérifier en ligne :

- **Trésorerie** : seuil franchise impôts commerciaux (BOFIP, indexé annuellement), seuils mécénat (CGI), barèmes ANC.
- **Représentation** : note de service ministérielle élections parents d'élèves (annuelle).
- **Événementiel** : seuils loteries (L. 322-1+ CSP), zones protégées (révision communale).
- **Communication** : positions CNIL, jurisprudence droit à l'image.
- **Pédagogie** : agréments AMF/AMI, contrôles État écoles hors contrat.

## Templates

| Domaine | Templates disponibles |
|---------|----------------------|
| **Secrétariat** | [statuts modèle](templates/secretariat/statuts-modele.md), [convocation AG](templates/secretariat/convocation-ag.md), [PV AG constitutive](templates/secretariat/pv-ag-constitutive.md) / [ordinaire](templates/secretariat/pv-ag-ordinaire.md) / [extraordinaire](templates/secretariat/pv-ag-extraordinaire.md) / [dissolution](templates/secretariat/pv-ag-dissolution.md), [pouvoir AG](templates/secretariat/pouvoir-ag.md), [déclaration dirigeants](templates/secretariat/declaration-dirigeants.md) |
| **Représentation** | [profession de foi](templates/representation/profession-de-foi.md), [PV conseil d'école](templates/representation/pv-conseil-ecole.md), [tract information parents](templates/representation/tract-information-parents.md) |
| **Événementiel** | [tombola](templates/evenementiel/), [buvette](templates/evenementiel/), [vente au déballage](templates/evenementiel/), [registre vendeurs](templates/evenementiel/), [GN 6](templates/evenementiel/), [convention locaux scolaires](templates/evenementiel/), [affichage buvette](templates/evenementiel/), [bilan d'événement](templates/evenementiel/) |

## Données structurées

- [`data/evenementiel/groupes-boissons.json`](data/evenementiel/groupes-boissons.json) — groupes de boissons après ord. 2015-1682 (groupes I et III)
- [`data/evenementiel/categories-erp.json`](data/evenementiel/categories-erp.json) — catégories ERP (5e à 1re) et seuils
- [`data/evenementiel/autorisations-par-format.json`](data/evenementiel/autorisations-par-format.json) — matrice format ↔ autorisations
- [`data/evenementiel/zones-protegees-csp.json`](data/evenementiel/zones-protegees-csp.json) — zones protégées L. 3334-2 (à compléter par arrêté préfectoral local)

## Avertissement légal

Ce skill **ne remplace pas** :

- un **avocat** pour les contentieux et les questions de responsabilité du bureau (loi 1901 art. 6, mandat),
- un **expert-comptable** inscrit pour la tenue des comptes lorsque le seuil 153 k EUR est dépassé ou si les statuts l'imposent,
- un **commissaire aux comptes** pour la certification des comptes annuels,
- un **délégué à la protection des données (DPO)** pour les analyses d'impact RGPD complexes (AIPD),
- une **éducatrice/un éducateur Montessori formé(e) AMI/AMF/ISMM** pour le conseil pédagogique direct aux enfants.

Le skill fournit le cadre légal, les modèles et les calculs déterministes. Les décisions engageant l'association restent prises par le bureau et l'AG, sous leur responsabilité.

## Sources officielles

Toutes les références citent les textes en vigueur au 2026-07-16 :

- **Loi 1901** (1er juillet 1901) + décret 16 août 1901 — [Légifrance](https://www.legifrance.gouv.fr/loda/id/LEGITEXT000006069570)
- **Loi 1908 Alsace-Moselle** — articles 21 à 79 du Code civil local
- **CGI** : art. 200, 238 bis, 206-5, 261-7, 261-D 1°bis, 1655 ter, 1681 sexies
- **Code de l'éducation** : D111-1 à D111-15, D411-1+, R421-14 à R421-53, L. 441-1+, L. 442-1 à L. 442-21
- **CSP** : L. 3334-2 (zones protégées), L. 322-1 à L. 322-9 (loteries)
- **C. com.** : L. 310-2 (vide-greniers), L. 612-4 (CAC > 153 k EUR)
- **RGPD** : règlement 2016/679 (art. 6, 7, 8, 13, 14, 15-22, 28, 30, 32, 33-35, 83)
- **Loi 1978 « Informatique et Libertés »** : art. 7-1 (seuil 15 ans, France)
- **ANC règlement 2018-06** (comptabilité associations) — modifié par règlement ANC 2022-09
- **Loi Gatel n° 2018-266** (établissements scolaires hors contrat)
- **Loi Coluche 1988** + dernière revalorisation 14/10/2025 (plafond 2 000 EUR à 75 %)
- **BOFIP** : franchise impôts commerciaux 81 051 EUR (MAJ 16/04/2025)
- **Jurisprudence** : Cass. 1re civ. 2000, 2007, 2022 (double autorité parentale et image)
