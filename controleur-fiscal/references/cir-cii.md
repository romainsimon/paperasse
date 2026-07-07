# CIR / CII — Textes et grille de contrôle

## Base légale

### CIR — Crédit d'Impôt Recherche (art. 244 quater B CGI)

**Taux :** 30% des dépenses de R&D (5% au-delà de 100 M€)
**Plafond :** Pas de plafond de dépenses
**Bénéficiaires :** Toutes entreprises imposées d'après leur bénéfice réel
**Déclaration :** Imprimé 2069-A, à joindre à la liasse fiscale

**Dépenses éligibles :**
- Salaires et charges sociales des chercheurs et techniciens de recherche
- **Pour les TNS** (gérant majoritaire, entrepreneur individuel) : rémunération effectivement versée + cotisations sociales obligatoires (SSI/ex-RSI) — calcul équivalent au salaire + charges patronales pour un salarié
- **Forfait de fonctionnement : 43% des dépenses de personnel pour les dépenses exposées jusqu'au 14/02/2025, puis 40% pour les dépenses exposées à compter du 15/02/2025** (LF 2025, art. 244 quater B CGI ; BOI-BIC-RICI-10-10-20-20 § 40, BOFiP ACTU-2025-00105), applicable aussi sur la base TNS
- Amortissement des matériels et équipements de recherche
- Sous-traitance agréée CIR (organismes de recherche publics ou entreprises titulaires de l'**agrément MESR/DRARI**)
  - L'agrément CIR couvre la sous-traitance pour le CIR **et** pour le CII
  - Sans agrément : seules les dépenses de matériel et de personnel propres à l'entreprise donneur d'ordre sont déductibles
- ~~Frais de brevets (prise, maintenance, défense) et veille technologique (plafond 60 000 €/an)~~ : **exclus des dépenses éligibles au CIR pour les dépenses exposées à compter du 15/02/2025** (LF 2025, art. 244 quater B CGI) — restent éligibles uniquement pour les dépenses exposées jusqu'au 14/02/2025

**Critères Frascati (BOI-BIC-RICI-10-10-10-20) :**

Les 5 critères issus du Manuel de Frascati (OCDE) sont **cumulatifs** : une activité doit les satisfaire **tous simultanément** pour être éligible au CIR. Un seul critère manquant suffit à exclure l'activité.

| Critère | Ce que ça signifie concrètement | Ce qui ne suffit pas |
|---------|--------------------------------|----------------------|
| **Nouveauté** | L'activité apporte quelque chose d'inconnu au corpus scientifique ou technique du domaine | Nouveau pour l'entreprise mais déjà connu ailleurs |
| **Créativité** | La démarche n'est pas triviale, elle ne découle pas mécaniquement de l'état de l'art | Assembler des briques existantes sans difficulté conceptuelle |
| **Incertitude** | Le résultat final n'est pas garanti a priori ; il existe un risque d'échec technique | Un développement dont on sait dès le départ qu'il va aboutir |
| **Méthode systématique** | L'activité est planifiée, budgétée, organisée en phases avec suivi | Du tâtonnement informel sans documentation |
| **Transférabilité** | Les résultats peuvent être reproduits, publiés ou partagés (pas un savoir-faire purement tacite) | Un savoir-faire non documenté, personnel et non transmissible |

⚠️ **Point de contrôle clé** : le vérificateur (ou le MESR consulté) examine chaque activité déclarée en CIR contre ces 5 critères. En pratique, **l'incertitude** et la **nouveauté** sont les deux critères les plus contestés sur les dossiers logiciels.

### CII — Crédit d'Impôt Innovation (art. 244 quater B bis CGI)

**Taux :** 20% des dépenses d'innovation (60% Outre-mer)
**Plafond de dépenses :** 400 000 €/an
**Bénéficiaires :** PME au sens communautaire UNIQUEMENT (< 250 salariés, CA < 50 M€ ou bilan < 43 M€)
**Déclaration :** Imprimé 2069-A bis

**Dépenses éligibles :**
- Salaires et charges sociales du personnel affecté au prototype
- **Pour les TNS** : rémunération effectivement versée + cotisations sociales obligatoires (SSI/ex-RSI), au prorata du temps consacré au prototype
- **Pas de forfait de fonctionnement** (contrairement au CIR) — ni pour les salariés, ni pour les TNS
- Dotations aux amortissements des immobilisations affectées
- Sous-traitance à des entreprises titulaires de l'**agrément CII** (distinct de l'agrément CIR)
  - L'agrément CII est instruit en ligne (pas par la DRARI) : https://demarche.numerique.gouv.fr/commencer/demande-d-agrement-cii-credit-d-impot-innovation
  - ⚠️ L'agrément CII ne garantit pas l'éligibilité du projet lors d'un contrôle fiscal — contrairement à un rescrit, il atteste uniquement du statut du sous-traitant
  - Sans agrément CII ni agrément CIR : seules les dépenses de matériel et de personnel propres au donneur d'ordre sont déductibles
- Prestations de conseil pour la protection de la propriété intellectuelle

**Objet :** Réalisation d'opérations de conception de prototypes ou installations pilotes de produits nouveaux — distincts des produits existants sur le marché.

---

## Distinctions critiques CIR vs CII

| Aspect | CIR | CII |
|--------|-----|-----|
| Objet | Lever une incertitude scientifique/technique | Concevoir un produit nouveau pour le marché |
| Preuve requise | Critères Frascati, état de l'art, échecs documentés | Analyse concurrentielle, nouveauté marché |
| Forfait opératoire | **43% des charges de personnel (40% depuis le 15/02/2025)** | **Aucun forfait** |
| Bénéficiaires | Toutes entreprises | **PME uniquement** |
| Plafond de dépenses | Illimité | **400 000 €/an** |
| Taux | 30% | 20% |

---

## Grille de contrôle — Axe CIR

### 1. Éligibilité formelle
- [ ] Société imposée au régime réel (IS ou IR BIC)
- [ ] Dépôt de l'imprimé 2069-A dans les délais
- [ ] Existence d'un dossier justificatif (non obligatoire à déposer, mais exigible sur demande)

### 2. Nature des activités
- [ ] Les activités relèvent-elles de la R&D au sens Frascati ?
- [ ] Incertitude scientifique/technique documentée (pas de solution connue a priori)
- [ ] État de l'art conduit avec références (littérature, concurrents, standards)
- [ ] Approches alternatives testées et échecs documentés (commits, rapports, benchmarks)
- [ ] Résultats transférables / reproductibles

⚠️ **Piège fréquent** : Le développement d'un logiciel standard n'est pas R&D. Seule la partie qui lève une incertitude technique est éligible (ex : algorithme non trivial, pas l'UI).

### 3. Calcul des dépenses
- [ ] **Salariés** : Heures déclarées × taux horaire justifié (fiches de paie)
- [ ] **TNS** : Rémunération effectivement versée + cotisations SSI obligatoires, au prorata des heures R&D ; justificatifs = relevés de compte ou déclarations SSI
- [ ] **Forfait 43%/40%** : Applicable aux dépenses de personnel (salariés et TNS) — 43% pour les dépenses exposées jusqu'au 14/02/2025, 40% à compter du 15/02/2025 (LF 2025)
- [ ] Pas de double comptage avec le CII (même heure = un seul crédit)
- [ ] **Sous-traitance CIR** : le prestataire dispose-t-il de l'**agrément MESR/DRARI** ?
  - L'agrément CIR couvre la sous-traitance pour le CIR **et** pour le CII
  - Avec agrément CIR : dépenses de sous-traitance éligibles dans la limite globale de **3× le montant total des autres dépenses de R&D** retenues pour le calcul du crédit (et non un multiple des seules dépenses de personnel interne)
  - Sans agrément : seules les dépenses de **matériel et de personnel propres** à l'entreprise donneur d'ordre sont déductibles

### 4. Justification des heures
- [ ] Relevés de temps ou agenda nominatif
- [ ] Cohérence avec les livrables, jalons ou outils de suivi de projet (ex : commits Git pour un projet logiciel, rapports d'essais pour un projet industriel)
- [ ] Distinction claire R&D (CIR) vs Innovation produit (CII)
- [ ] **Crédibilité du volume horaire TNS** : le vérificateur rapporte les heures déclarées au nombre de jours ouvrés de la période et vérifie la compatibilité avec l'activité globale de l'entreprise
  - Un volume impliquant plus de ~9h/jour sur l'ensemble de la période est suspect
  - Croiser avec le CA facturé sur la même période : si le dirigeant déclare 100% de son temps en R&D, qui a produit le chiffre d'affaires ?
  - Croiser avec les autres charges d'exploitation (déplacements, réunions clients, admin) qui impliquent du temps non-R&D
  - Pour les projets logiciels : l'historique des commits Git donne une indication de temporalité — vérifier que l'activité de développement est globalement cohérente avec la période déclarée (présence de commits sur la durée, pas absence totale sur des mois entiers) ; il ne s'agit pas d'une vérification jour par jour, un développeur ne commite pas nécessairement chaque jour travaillé. L'entreprise peut également produire cet historique proactivement comme pièce justificative à l'appui de son dossier

---

## Grille de contrôle — Axe CII

### 1. Éligibilité PME
- [ ] Effectif < 250 salariés
- [ ] CA annuel < 50 M€ OU total bilan < 43 M€
- [ ] Critères vérifiés sur la période de calcul (pas forcément l'exercice fiscal)

### 2. Nouveauté du produit pour le marché
- [ ] Analyse concurrentielle fournie (tableau des solutions existantes)
- [ ] Le produit est nouveau pour le marché (pas seulement pour l'entreprise)
- [ ] Distinctif des produits existants sur au moins une caractéristique substantielle
- [ ] Reconnaissance extérieure éventuelle (labels, certifications, prix innovation)

⚠️ **Piège fréquent** : Un produit nouveau "pour l'entreprise" mais existant chez la concurrence n'est pas éligible CII.

### 3. Calcul des dépenses
- [ ] **Salariés** : Salaires + charges sociales patronales, au prorata des heures prototype
- [ ] **TNS** : Rémunération effectivement versée + cotisations SSI obligatoires, au prorata des heures prototype
- [ ] **Aucun forfait de fonctionnement** — ni pour les salariés, ni pour les TNS
- [ ] Base ≤ 400 000 €/an
- [ ] Immobilisations : amortissement prorata temporis sur la période de prototype uniquement
- [ ] **Sous-traitance CII** : le prestataire dispose-t-il d'un **agrément CII** ou d'un **agrément CIR** (qui couvre aussi le CII) ?
  - L'agrément CII est distinct de l'agrément CIR ; il est instruit en ligne, pas par la DRARI
  - ⚠️ L'agrément CII ne garantit pas l'éligibilité du projet lors d'un contrôle fiscal — il atteste uniquement du statut du sous-traitant (≠ rescrit)
  - Sans aucun agrément : seules les dépenses de **matériel et de personnel propres** au donneur d'ordre sont déductibles

### 4. Justification des heures (CII)
- [ ] Relevés de temps ou agenda nominatif au prorata des heures consacrées au prototype
- [ ] Cohérence avec les livrables, jalons ou outils de suivi de projet
- [ ] **Crédibilité du volume horaire TNS** : même contrôle que pour le CIR — rapporter les heures au nombre de jours ouvrés (~9h/jour max), croiser avec le CA et les autres activités de l'entreprise sur la même période ; pour les projets logiciels, l'historique des commits Git permet de vérifier la cohérence globale de la temporalité, pas une vérification jour par jour

### 6. Périmètre prototype
- [ ] Les dépenses concernent bien la phase prototype/pilote (pas la production)
- [ ] Outillage et infrastructure de développement : éligibles uniquement si dédiés au prototype, non mutualisés
  - Mutualisé entre plusieurs projets → non éligible
  - Dédié au prototype → éligible au prorata
- [ ] Tests et validation : éligibles si liés à la démonstration du prototype

### 7. Ventilation CIR / CII sur un même projet

Un même projet peut légitimement donner lieu à la fois à du CIR et du CII, à condition que les deux phases soient clairement distinctes :
- La phase **R&D** (lever une incertitude technique) → CIR
- La phase **prototype** (concrétiser un produit nouveau pour le marché) → CII

C'est une situation courante sur les projets logiciels innovants. Le vérificateur accepte ce montage si la ventilation des heures entre les deux phases est documentée et cohérente.

**Règle de non-cumul :**
- [ ] Une même heure ne peut pas être comptée en CIR ET en CII simultanément
- [ ] Un même salarié peut contribuer aux deux phases, mais ses heures doivent être ventilées de façon exclusive entre CIR et CII

---

## Chefs de redressement typiques CIR/CII

### Redressement 1 : Forfait opératoire appliqué à tort sur le CII

**Base légale** : Art. 244 quater B bis CGI — le CII ne prévoit pas de forfait de fonctionnement.

**Fait** : L'entreprise applique un forfait de fonctionnement (par exemple 43% ou 40%, par analogie avec le taux CIR en vigueur sur la période) sur les dépenses de personnel CII.

**Calcul** : Base CII redressée = Dépenses de personnel déclarées / (1 + taux de forfait appliqué à tort)
Crédit CII redressé = Base corrigée × 20%

**Risque** : 🔴 Élevé — erreur systématique sur le mécanisme légal

---

### Redressement 2 : Double comptage CIR/CII

**Base légale** : Art. 244 quater B et 244 quater B bis CGI — les dépenses ne peuvent être prises en compte qu'une seule fois.

**Fait** : Des heures de personnel ventilées à la fois en CIR et en CII.

**Calcul** : Réintégration du doublon dans le crédit le moins favorable (ou le plus récent si délai dépassé).

**Risque** : 🔴 Élevé

---

### Redressement 3 : Activité non éligible CIR (développement standard)

**Base légale** : Art. 244 quater B CGI + BOI-BIC-RICI-10-10-10-20

**Fait** : Développement d'une interface utilisateur ou fonctionnalité sans incertitude technique documentée, comptabilisé en CIR.

**Calcul** : Réintégration des heures non éligibles × taux horaire × 1,43 (dépenses jusqu'au 14/02/2025) ou × 1,40 (dépenses à compter du 15/02/2025) — forfait de fonctionnement inclus

**Risque** : 🟡 Moyen — dépend de la qualité du dossier justificatif

---

### Redressement 4 : Dépassement plafond CII

**Base légale** : Art. 244 quater B bis CGI — plafond 400 000 € de dépenses éligibles.

**Fait** : Base CII déclarée supérieure à 400 000 €.

**Calcul** : Crédit plafonné à 400 000 × 20% = 80 000 €.

**Risque** : 🔴 Élevé si dépassement significatif

---

### Redressement 5 : Sous-traitance sans agrément incluse dans la base CIR ou CII

**Base légale** : Art. 244 quater B CGI (CIR) et art. 244 quater B bis CGI (CII) — la sous-traitance n'est éligible que si le prestataire est titulaire d'un agrément.

**Fait** : L'entreprise inclut des factures de sous-traitance dans sa base CIR ou CII alors que le prestataire ne détient ni agrément CIR (MESR/DRARI) ni agrément CII.

**Calcul** :
- Réintégration de la totalité des dépenses de sous-traitance non agréée
- La base retenue est ramenée aux seules dépenses de matériel et de personnel propres à l'entreprise
- CIR : le forfait de fonctionnement (43% jusqu'au 14/02/2025, 40% à compter du 15/02/2025) s'applique sur la base corrigée
- CII : pas de forfait, base corrigée × 20%

**Risque** : 🔴 Élevé — le défaut d'agrément est un critère objectif, non susceptible d'interprétation

**Note** : Pour le CII, posséder l'agrément CII ne garantit pas l'éligibilité du projet lors du contrôle — le vérificateur peut rejeter les dépenses même si l'agrément est en règle.

---

### Redressement 6 : Outillage et infrastructure mutualisés déclarés à 100% en CII

**Fait** : Coûts d'outillage ou d'infrastructure de développement mutualisés entre plusieurs projets, déclarés à 100% dans la base CII.

**Calcul** : Application d'un prorata "projets CII / total projets" ou exclusion totale si non quantifiable.

**Risque** : 🟡 Moyen

---

## Procédure de contrôle sur pièces CIR/CII

La DGFIP peut exercer un droit de contrôle spécifique :

1. **Demande de dossier justificatif** : l'entreprise a **30 jours** pour fournir le dossier
2. **Contrôle de l'affectation à la recherche** : ce contrôle relève des agents du **Ministère de l'Enseignement Supérieur et de la Recherche (MESR)**, sur le fondement de l'**art. L. 45 B LPF** — le vérificateur peut les saisir pour avis technique sur l'éligibilité scientifique
3. **Avis du MESR non contraignant** mais le vérificateur s'y conforme généralement
4. **Délai de prescription** : identique au droit commun IS (3 ans, L. 169 LPF)

## Références BOFiP

| Référence | Objet |
|-----------|-------|
| BOI-BIC-RICI-10-10 | CIR — Présentation générale |
| BOI-BIC-RICI-10-10-10-20 | CIR — Définition des activités de R&D |
| BOI-BIC-RICI-10-10-20-20 | CIR — Dépenses éligibles (forfait 43%/40%) |
| BOI-BIC-RICI-10-10-45 | CII — Régime PME |
| BOI-BIC-RICI-10-10-45-10 | CII — Dépenses éligibles (pas de forfait) |
| BOFiP ACTU-2025-00105 | LF 2025 — Baisse du forfait de fonctionnement CIR (43% → 40%) et suppression des frais de brevets / veille technologique des dépenses éligibles, pour les dépenses exposées à compter du 15/02/2025 |
