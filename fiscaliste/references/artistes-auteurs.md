# Artistes-auteurs — impôt sur le revenu, micro-BNC, régularisation fiscale

*Revenus 2025 (déclaration 2026) et revenus 2026. Textes consultés le 06/11/2026 : CGI art. 93 1 quater, 102 ter, 151-0, 241, 1727, 1728, 1729, 1758 A ; LPF L. 169 ; BOI-BNC-SECT-20-10-20, BOI-BNC-CHAMP-10-10-20-20, BOI-BNC-DECLA-20-10 ; formulaire 2042 C PRO 2026. Données machine : [`data/artistes-auteurs-2026.json`](../data/artistes-auteurs-2026.json) (sections `impot_revenu` et `regularisation`). Calcul : `scripts/calc_artiste_auteur.py` (cotisations + RAAP + IR estimé au TMI).*

Ce fichier traite le volet **fiscal** (IR) du conseil à un artiste-auteur. Le volet **social** (affiliation URSSAF, cotisations, RAAP, droits), la **TVA** (franchise des auteurs, taux, plateformes) et le champ du régime sont dans le skill `comptable` (`references/artistes-auteurs*.md`). Ne jamais donner un montant sans la séquence : recettes → bénéfice (−34 % ou frais réels) → assiette sociale (+15 %) → cotisations → RAAP → IR.

## 1. Deux portes d'entrée selon QUI verse les droits

| Situation | Régime IR par défaut | Cases |
|---|---|---|
| Droits **intégralement déclarés par des tiers** tenus à la déclaration de l'art. 241 (éditeurs, SACEM, SACD, producteurs…) | **Traitements et salaires** (CGI 93, 1 quater) : abattement 10 % sur (brut − cotisations sociales obligatoires), ou frais réels | 2042 : **1GF / 1HF / 1IF / 1JF** (frais réels : 1AK à 1DK) |
| Droits **non déclarés par des tiers** : plateformes d'abonnement, autoédition, ventes directes | **BNC** (micro-BNC ou déclaration contrôlée) | 2042 C PRO (voir §3) |

Texte (93, 1 quater) : « Lorsqu'ils sont intégralement déclarés par les tiers, les produits de droits d'auteur perçus par les auteurs des œuvres de l'esprit mentionnées à l'article L. 112-2 du code de la propriété intellectuelle sont […] soumis à l'impôt sur le revenu selon les règles prévues en matière de traitements et salaires. »

L'auteur en TS peut **opter pour les BNC** (via la 2042 C PRO) ; l'option vaut pour l'année et les deux suivantes.

**Patreon, Substack, autoédition : BNC a priori — et voici pourquoi.** Ces recettes viennent de l'**autoédition** : l'auteur assure lui-même l'édition et la vente de ses œuvres et est imposable en BNC « pour l'ensemble des profits qu'il réalise » (BOI-BNC-CHAMP-10-10-20-20). Ce ne sont pas des droits versés par un débiteur. Le § 50 de BOI-BNC-SECT-20-10-20 ne fonde **pas** cette conclusion : il traite des droits de **source étrangère** et admet de ne pas les priver, « pour ce seul motif, du bénéfice du régime spécial » (le régime TS). Ne pas le citer à l'appui du BNC. Point ouvert : une plateforme étrangère qui transmet des données DAC7 est-elle un « tiers déclarant » au sens de l'art. 241 ? Aucune position administrative connue.

## 2. Micro-BNC (CGI 102 ter)

| Paramètre | Valeur |
|---|---|
| Seuil de recettes HT (N-1 ou N-2) — revenus 2023 à 2025 | **77 700 €** |
| Seuil — revenus 2026 à 2028 (décret n° 2026-562 du 29/06/2026) | **83 600 €** |
| Abattement forfaitaire pour frais | **34 %** (minimum 305 €) |
| Maintien du micro après dépassement | les deux premières années de dépassement |

**Pluralité d'activités BNC** (102 ter, 6 a ; BOI-BNC-DECLA-20-10 §170-180) : les recettes des différentes activités BNC sont totalisées pour apprécier le seuil ; dépassement = exclusion du micro pour l'ensemble. Les droits imposés en TS ne comptent pas, sauf option BNC. Un auteur en BNC avec une micro-entreprise de conseil additionne les deux (marge en général large, contrairement aux plafonds de TVA).

**Retenue de TVA de l'art. 285 bis — plus une cause d'exclusion.** Le 102 ter, 6 **en vigueur** n'exclut plus les auteurs soumis à la retenue de TVA (« b. (Abrogé) »). La fiche DGFiP 2026 « petites entreprises » le mentionne encore : elle est en retard sur le code. Appliquer le code, signaler la fiche. https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000047622381

**Déclaration contrôlée** : formulaire 2035 ; option au titre de 2026 possible jusqu'au 20/05/2027, reconduction tacite. Utile si les frais réels dépassent 34 % des recettes (mais le réel coûte alors plus cher socialement si les frais sont inférieurs).

## 3. Cases de la 2042 C PRO 2026 (revenus 2025)

| Situation | Déclarant 1 / 2 / personne à charge |
|---|---|
| Micro-BNC **professionnel** — recettes brutes encaissées, abattement 34 % appliqué par l'administration | **5HQ / 5IQ / 5JQ** |
| Déclaration contrôlée (bénéfice 2035) | 5QC / 5RC / 5SC |
| Micro-entrepreneur ayant opté pour le versement libératoire (BNC) | 5TE / 5UE / 5VE |
| BNC **non professionnels**, micro | 5KU / 5LU / 5MU |
| Droits d'auteur en traitements et salaires (2042) | 1GF / 1HF / 1IF / 1JF |

Activité habituelle et lucrative = BNC **professionnels** (5HQ…) ; « non professionnels » (5KU) réservés aux activités occasionnelles.

## 4. Versement libératoire (CGI 151-0)

Taux **2,2 %** des recettes BNC, payé avec les cotisations. Trois conditions **cumulatives** : (1) relever du micro (50-0 ou 102 ter) ; (2) RFR N-2 ≤ limite supérieure de la 2e tranche **par part** (revenus 2026 : RFR 2024 ≤ 29 315 €/part, +50 % par demi-part, +25 % par quart) ; (3) être soumis au micro-social (CSS L. 613-7). Un artiste-auteur relève de L. 382-1, pas du micro-social : le versement libératoire ne couvre que les recettes de la **micro-entreprise**, pas les droits d'auteur (lecture des textes, à confirmer). Option avant le 30 septembre N pour N+1.

## 5. Séquence de calcul (micro-BNC, sans tiers déclarant)

1. Recettes brutes encaissées dans l'année (relevés de plateforme, virements).
2. Bénéfice imposable = recettes × 0,66.
3. Ajout aux autres revenus du foyer → barème (quotient familial, décote : voir `ir-mecanisme.md`).
4. Pas de prélèvements sociaux « patrimoine » : cotisations du régime artistes-auteurs (voir `comptable`), dont une fraction de CSG déductible.
5. Ordre de grandeur : 19 000 € de recettes → ~12 500 € imposables → ~1 400 € d'IR à 11 % de TMI, ~3 800 € à 30 %. Toujours montrer la séquence.

## 6. TVA — rappel minimal (détail dans `comptable`)

Les auteurs relèvent d'**une seule franchise** (CGI 293 B, I bis) à **deux plafonds**, chacun comparé à sa propre catégorie : œuvres et cession de droits (50 000 / 55 000 €), autres opérations — formation, conseil (35 000 / 38 500 €) ; pas de cumul avec le droit commun de 37 500 €. Effet croisé incertain : lecture prudente du 293 B, II. Le taux de 10 % (279 g) ne vise que les cessions de droits ; livraisons de livres, y compris numériques : 5,5 % (278-0 bis A 3°). Qualification de l'abonnement Patreon : ouverte. → `comptable/references/artistes-auteurs-tva.md`.

## 7. Régulariser des droits d'auteur non déclarés — côté IR

**Cas typique** : revenus de plateforme encaissés un ou deux ans sans rien déclarer, par croyance que la plateforme « s'occupe des déclarations comme un éditeur ». **Posture** : régularisation spontanée, avant tout contrôle, régime légal le moins coûteux, jamais de dissimulation.

| Élément | Règle | Texte |
|---|---|---|
| Impôt | recalcul de l'IR de chaque année non prescrite | — |
| Majoration — omission, **retard ou défaut** de déclaration d'IR | **10 %** (portée à 20 % en cas de dépôt tardif après mise en demeure) ; **écartée** si correction spontanée ou dans les 30 jours d'une demande de l'administration | 1758 A, I et II a |
| Articulation avec le 1728 | le 1758 A **exclut le 10 % du 1728, 1 a** (III). Restent ceux du **1728, 1 b et c** : **40 %** après mise en demeure restée sans effet, **80 %** en cas d'activité occulte (cités au 1758 A, II b) | 1758 A, III ; 1728 |
| Manquement délibéré / manœuvres frauduleuses | 40 % / 80 % | 1729 |
| Intérêt de retard | **0,20 %/mois** depuis le 1er juillet N+1 | 1727 |
| Réduction de moitié de l'intérêt | dépôt **spontané avant l'expiration du délai de reprise** de l'administration, bonne foi, **paiement des droits simples avec la déclaration** (pour un impôt de rôle : au plus tard à la date limite de l'avis d'imposition) ; ou plan de règlement accepté par le comptable public | 1727, V |
| Prescription | fin de la 3e année suivant celle de l'imposition (revenus 2023 → 31/12/2026) ; 10 ans si activité occulte | LPF L. 169 |

Sources : [1727](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051213330), [1758 A](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000033815281). Le choix entre 1758 A et 1728 dépend de la situation (déclaration déposée incomplète ou non déposée) : à faire valider.

### Procédure

1. **Année en cours de déclaration** (revenus 2025 en 2026) : service « Corriger ma déclaration » sur impots.gouv, du 29/07 au 30/11/2026.
2. **Déclaration papier** « ANNULE ET REMPLACE » : uniquement **avant la date limite de dépôt**. Passé cette date, il faut une **réclamation** (messagerie sécurisée ou courrier). https://www.impots.gouv.fr/particulier/questions/je-veux-corriger-la-declaration-que-jai-deja-deposee-comment-proceder
3. **Années antérieures non prescrites** : 2042 + 2042 C PRO rectificatives par réclamation, année par année.
4. **Pièces** : relevés de versements de la plateforme (export, API), relevés bancaires, total par année civile.
5. **Courrier** (facultatif, utile) : bonne foi, demande d'application du 1727 V, délai de paiement si besoin.

### Payer en plusieurs fois

Chemin sur impots.gouv : « J'ai un problème concernant le paiement de mon impôt > J'ai des difficultés pour payer » (https://www.impots.gouv.fr/particulier/delai-de-paiement). Délais « à titre exceptionnel » ; formulaire 4805-S-SD + RIB + justificatifs ; réponse sous 2 mois (4 si complexe), silence = rejet ; recours au conciliateur fiscal départemental. Un plan accepté maintient la réduction de 50 % de l'intérêt (1727 V). Le volet **URSSAF** est dans `comptable`.

### Ordre des opérations

1. Reconstituer les encaissements par année civile (plateforme + banque).
2. Trancher le régime avec un expert-comptable (artiste-auteur, BNC ou TS, TVA).
3. Affiliation / déclaration URSSAF artistes-auteurs pour les années concernées (skill `comptable`).
4. Déclarations rectificatives IR année par année, avec courrier.
5. Demandes d'échéancier (URSSAF, fisc) si nécessaire.
6. Provisionner une fraction des encaissements courants (ordre de grandeur 25 à 30 % selon régime et tranche).

À éviter : attendre un contrôle (DAC7 et autres échanges d'informations), mélanger les années, emprunter pour payer alors que des échéanciers existent.

## 8. Avertissement

Lecture de textes à date, sans garantie. Chaque contribuable reste responsable de ses déclarations ; faire valider par un expert-comptable, un avocat fiscaliste ou l'administration par écrit (rescrit).
