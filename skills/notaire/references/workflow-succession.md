# Workflow de Succession

Guide d'exécution complet pour le traitement d'une succession, du décès au partage final.

---

## Vue d'ensemble

```
Phase 1 : Urgences (0-30 jours)
  1. Constatation du décès et premières démarches
  2. Recherche de testament et dispositions de dernières volontés
  3. Acte de notoriété (identification des héritiers)

Phase 2 : Inventaire (1-3 mois)
  4. Inventaire du patrimoine (actif et passif)
  5. Option du conjoint survivant
  6. Acceptation ou renonciation des héritiers

Phase 3 : Déclarations (0-6 mois)
  7. Déclaration de succession (formulaires 2705/2706)
  8. Paiement des droits de succession
  9. Attestation immobilière

Phase 4 : Règlement (6-24 mois)
  10. Indivision ou partage
  11. Acte de partage et liquidation
  12. Clôture du dossier
```

---

## Phase 1 : Urgences (0-30 jours)

### Étape 1 : Constatation du décès et premières démarches

**Dans les 24 heures :**
- Certificat de décès délivré par le médecin
- Déclaration de décès en mairie du lieu de décès (dans les 24h)

**Dans la première semaine :**
- Contacter un notaire (choisi par la famille ou notaire habituel du défunt)
- Informer les organismes : banque(s), assurances, employeur, caisses de retraite, Sécurité sociale, CAF
- Les comptes bancaires sont bloqués dès que la banque est informée du décès

**Droit au logement du conjoint survivant** (art. 763 C. civ.) :
- Jouissance gratuite du logement conjugal pendant **1 an** (de plein droit)
- Le conjoint doit être informé de son droit viager d'habitation (art. 764 C. civ.) : à exercer dans l'année du décès

**Provision pour frais urgents** :
- Déblocage possible jusqu'à **5 000 EUR** sur les comptes du défunt pour frais d'obsèques (art. L312-1-4 CMF)

### Étape 2 : Recherche de testament et dispositions

**Le notaire interroge le FCDDV** (Fichier Central des Dispositions de Dernières Volontés) :
- Testament authentique (déposé chez un notaire)
- Testament olographe (peut être déposé ou non)
- Donation entre époux (donation au dernier vivant)
- Mandat de protection future

**Types de testament et effets :**

| Type | Validité | Effet |
|------|----------|-------|
| Olographe | Écrit, daté, signé de la main du testateur | Doit être vérifié par le notaire |
| Authentique | Dicté au notaire + 2 témoins | Force probante renforcée |
| Mystique | Remis clos au notaire + 2 témoins | Rare |

**Si pas de testament** : dévolution légale selon l'ordre des héritiers (voir [references/succession.md](succession.md)).

**Si testament** : vérifier qu'il respecte la réserve héréditaire. Si la quotité disponible est dépassée, les héritiers réservataires peuvent demander la **réduction** des legs excessifs.

### Étape 3 : Acte de notoriété

**Base légale** : art. 730-1 Code civil

**Objectif** : Constater officiellement qui sont les héritiers.

**Contenu de l'acte de notoriété :**
- Identité du défunt (état civil complet)
- Date et lieu du décès
- Régime matrimonial du défunt
- Liste des héritiers (lien de parenté, état civil)
- Existence ou non d'un testament
- Existence ou non d'une donation entre époux
- Droits de chaque héritier (en pleine propriété et/ou usufruit)

**Pièces nécessaires :**
- Acte de décès
- Livret de famille du défunt
- Actes de naissance des héritiers
- Contrat de mariage (si applicable)
- Testament (si existant)
- Pièces d'identité des héritiers

**Émolument fixe** : 56,60 EUR HT + TVA 20%

**L'acte de notoriété permet aux héritiers de :**
- Débloquer les comptes bancaires
- Transférer les contrats d'assurance
- Effectuer les démarches administratives

---

## Phase 2 : Inventaire (1-3 mois)

### Étape 4 : Inventaire du patrimoine

**Objectif** : Dresser la liste complète de l'actif et du passif.

#### Actif

| Poste | Source de vérification |
|-------|----------------------|
| Immeubles | Titre de propriété, SPF, cadastre |
| Comptes bancaires | FICOBA (interrogé par le notaire) |
| Valeurs mobilières (actions, obligations) | Banque, dépositaire |
| Assurance-vie | AGIRA (interrogé par le notaire) |
| Véhicules | Carte grise |
| Meubles meublants | Inventaire sur place ou forfait 5% |
| Bijoux, objets d'art | Estimation par expert |
| Créances détenues par le défunt | Documents du défunt |
| Fonds de commerce / parts sociales | Expert-comptable, notaire |

**Pour les immeubles, estimer la valeur vénale :**

```bash
# Rechercher les transactions comparables
# 1. Géocoder l'adresse
curl "https://api-adresse.data.gouv.fr/search/?q=ADRESSE&limit=1"
# → citycode, latitude, longitude

# 2. Chercher les ventes dans la commune
curl "https://apidf-preprod.cerema.fr/dvf_opendata/mutations/?code_insee=XXXXX&page_size=50"
```

**Forfait mobilier** (art. 764 CGI) :
- À défaut d'inventaire : les meubles sont évalués forfaitairement à **5% de l'actif brut**
- L'inventaire est souvent préférable si le mobilier vaut moins de 5%
- L'inventaire doit être fait par un notaire, commissaire-priseur ou huissier

#### Passif déductible

| Poste | Justificatif | Base légale |
|-------|-------------|-------------|
| Frais funéraires | Factures (forfait 1 500 EUR sans justif.) | art. 775 CGI |
| Emprunts immobiliers | Tableau d'amortissement, attestation banque | art. 768 CGI |
| Impôts dus (IR, taxe foncière) | Avis d'imposition | art. 768 CGI |
| Factures impayées | Factures | art. 768 CGI |
| Frais de dernière maladie | Factures hôpital, pharmacie | art. 775 CGI |

### Étape 5 : Option du conjoint survivant

**Base légale** : art. 757 à 767 Code civil

**Si enfants communs** (choix dans les 3 mois, ou 4 mois si mis en demeure) :

| Option | Avantage | Inconvénient |
|--------|----------|-------------|
| **1/4 en pleine propriété** | Part définitive, liberté totale | Part plus faible |
| **Usufruit de la totalité** | Usage de tous les biens, revenus | Pas de vente sans accord des nus-propriétaires |

**Si enfants non communs** : pas de choix, le conjoint reçoit 1/4 en pleine propriété uniquement.

**Si donation entre époux** : les options sont élargies (voir [references/succession.md](succession.md)).

**Conversion de l'usufruit en rente** : tout héritier ou le conjoint peut demander la conversion (art. 759-762 C. civ.). L'accord de tous est nécessaire, ou décision judiciaire.

### Étape 6 : Acceptation ou renonciation

**Base légale** : art. 768 à 808 Code civil

| Option | Effet | Délai |
|--------|-------|-------|
| **Acceptation pure et simple** | L'héritier est tenu du passif sur ses biens propres | Pas de délai (mais prescription 10 ans) |
| **Acceptation à concurrence de l'actif net** | L'héritier n'est tenu que dans la limite de l'actif reçu | Requiert inventaire dans les 2 mois |
| **Renonciation** | L'héritier est réputé n'avoir jamais été héritier | Déclaration au greffe du TJ |

**Délai de réflexion** : l'héritier dispose de **4 mois** après le décès pendant lesquels il ne peut être contraint de prendre parti. Passé ce délai, il peut être mis en demeure par un créancier ou un cohéritier (délai supplémentaire de 2 mois pour répondre).

**Prescription** : l'option se prescrit par **10 ans** à compter du décès. Passé ce délai, l'héritier est réputé avoir renoncé.

---

## Phase 3 : Déclarations (0-6 mois)

### Étape 7 : Déclaration de succession

**Base légale** : art. 800 à 810 CGI

**Délai** : **6 mois** à compter du décès (12 mois si décès hors métropole).

**Formulaires :**

| Formulaire CERFA | Contenu |
|-----------------|---------|
| **2705** (n°11277) | Déclaration principale : état civil, héritiers, actif mobilier |
| **2705-S** (n°12322) | Suite : détail des biens, passif déductible |
| **2706** (n°10486) | Immeubles : désignation et évaluation de chaque immeuble |

**Calcul des droits** : voir [references/succession.md](succession.md) pour les barèmes complets.

**Étapes du calcul :**

```
1. Actif brut total (immobilier + mobilier + financier)
2. - Passif déductible (dettes, frais funéraires)
3. = Actif net de succession
4. Répartition entre héritiers (selon dévolution légale ou testamentaire)
5. Par héritier :
   a. Part brute
   b. - Abattement (selon le lien de parenté)
   c. = Part nette taxable
   d. Appliquer le barème progressif
   e. = Droits de succession
```

**Utiliser le template** : `templates/declaration-succession-checklist.md`

### Étape 8 : Paiement des droits

**Base légale** : art. 1701 et suivants CGI

| Mode | Conditions | Base légale |
|------|-----------|-------------|
| **Comptant** | Au dépôt de la déclaration | art. 1701 CGI |
| **Fractionné** | 3 versements sur 1 an (ou 10 sur 3 ans si > 50% immeubles) | art. 1717 CGI |
| **Différé** | Nue-propriété : report jusqu'à réunion de l'usufruit | art. 1717 CGI |

**Pénalités de retard** :
- Intérêts : 0,2% par mois de retard (art. 1727 CGI)
- Majoration de 10% si dépôt tardif > 6 mois (art. 1728 CGI)

### Étape 9 : Attestation immobilière

**Base légale** : Décret n°55-22 du 4 janvier 1955, art. 28-3°

**Obligatoire** pour chaque immeuble de la succession. Publiée au Service de Publicité Foncière.

**Contenu** :
- Identification du défunt et des héritiers
- Désignation de l'immeuble (références cadastrales, adresse)
- Droits de chaque héritier sur l'immeuble (pleine propriété, usufruit, nue-propriété)

**Émoluments** : barème proportionnel sur la valeur de l'immeuble (voir [references/tarifs-emoluments.md](tarifs-emoluments.md)).

---

## Phase 4 : Règlement (6-24 mois)

### Étape 10 : Indivision ou partage

**Indivision** (art. 815 et suivants C. civ.) :
- Les héritiers sont copropriétaires indivis des biens
- Gestion : actes conservatoires (seul), actes d'administration (majorité 2/3), actes de disposition (unanimité)
- Chaque indivisaire peut demander le partage à tout moment (sauf convention d'indivision)

**Convention d'indivision** :
- Durée maximale : **5 ans** renouvelable
- Fixe les règles de gestion et de répartition des revenus
- Requiert l'accord unanime

### Étape 11 : Acte de partage

**Objectif** : Attribuer à chaque héritier des biens déterminés en sortie d'indivision.

**Principes du partage :**
- **Égalité en valeur** : chaque héritier reçoit des biens équivalant à ses droits
- **Attribution préférentielle** (art. 831 C. civ.) : le conjoint survivant ou un héritier copropriétaire peut demander l'attribution de certains biens (entreprise, logement, exploitation agricole)
- **Soulte** : si un héritier reçoit plus que sa part, il verse une compensation aux autres

**Droit de partage** : **2,5%** de l'actif net partagé (art. 746 CGI).

**Émoluments** : barème proportionnel sur l'actif net (voir [references/tarifs-emoluments.md](tarifs-emoluments.md)).

### Étape 12 : Clôture du dossier

**Actions finales :**
- Publication de l'attestation immobilière au SPF
- Mutation des comptes bancaires et titres
- Transfert des contrats d'assurance
- Changement du propriétaire au cadastre
- Notification aux locataires (si biens loués)
- Clôture des comptes du défunt
- Radiation au FCDDV si nécessaire

---

## Délais récapitulatifs

| Action | Délai | Conséquence du retard |
|--------|-------|-----------------------|
| Déclaration de décès | 24h | Amende |
| Acte de notoriété | 1-2 semaines | Comptes bancaires bloqués |
| Option conjoint survivant | 3-4 mois | Réputé avoir choisi l'usufruit |
| Acceptation/renonciation | 4 mois (incompressible) puis 2 mois si mis en demeure | Prescription 10 ans |
| Déclaration de succession | **6 mois** | Intérêts 0,2%/mois + majoration 10% |
| Attestation immobilière | Dès que possible | Pas de sanction mais blocage des actes |
| Partage | Pas de délai légal | Indivision continue |

---

## Cas Spéciaux

### Succession internationale

**Règlement UE 650/2012** (applicable depuis le 17 août 2015) :
- Loi applicable : loi du dernier domicile habituel du défunt
- Possibilité de choisir par testament la loi de sa nationalité (professio juris)
- Le certificat successoral européen facilite la preuve des droits des héritiers dans tous les pays de l'UE

### Concubins (ni mariés, ni pacsés)

- **Aucun droit successoral légal** (pas héritier)
- Peut hériter par testament uniquement
- **Droits de succession : 60%** (taux maximum, aucun abattement sauf 1 594 EUR)
- Conseil : recommander le PACS (exonération totale) ou l'assurance-vie (hors succession)

### Assurance-vie

- **Hors succession** (art. L132-12 Code des assurances)
- Clause bénéficiaire : vérifier qui est désigné
- Primes versées avant 70 ans : abattement 152 500 EUR/bénéficiaire (art. 990 I CGI)
- Primes versées après 70 ans : abattement global 30 500 EUR (art. 757 B CGI)
- Attention aux primes manifestement excessives (réintégration possible dans la succession)

### Démembrement de propriété au décès

- Si le défunt était usufruitier : l'usufruit s'éteint, le nu-propriétaire récupère la pleine propriété **sans droits supplémentaires**
- Si le défunt était nu-propriétaire : la nue-propriété entre dans la succession

### Héritier mineur

- Le mineur hérite mais ne gère pas
- Administration légale par les parents (ou tuteur)
- Acceptation à concurrence de l'actif net : **de plein droit** pour les mineurs
- Actes de disposition : autorisation du juge des tutelles nécessaire

### Renonciation au profit d'un héritier

- On ne peut pas renoncer "au profit de" quelqu'un
- La renonciation profite à tous les héritiers du même ordre
- Pour transmettre sa part à un héritier spécifique : accepter puis donner (attention aux droits)
