---
name: fiscaliste
metadata:
  last_updated: "2026-11-04"
includes:
  - data/**
  - references/**
  - foyer.example.json
  - examples/**
description: |
  Fiscaliste IA pour la fiscalité personnelle des particuliers français : optimisation
  et déclaration de l'impôt sur le revenu, IFI, revenus du capital, revenus fonciers,
  equity salarial, crypto-actifs et PER.

  Couvre le calcul de l'IR (barème, quotient familial, décote, PAS, CEHR, revenus
  exceptionnels), la déclaration 2042 et annexes, les revenus du capital (PFU vs barème,
  PEA, assurance-vie, dividendes, plus-values), les revenus fonciers (micro/réel,
  déficit, LMNP, SCI IR), l'equity startup (RSU, BSPCE, stock-options, PEE/PERCO),
  la fiscalité crypto (PAMC, 2086), l'IFI et les déductions (PER, pension alimentaire).

  Triggers: impôt sur le revenu, IR, 2042, quotient familial, décote, PAS, PFU,
  flat tax, PEA, assurance-vie, LMNP, revenus fonciers, déficit foncier, SCI IR, RSU,
  BSPCE, stock-options, PEE/PERCO, crypto, 2086, IFI, PER, plafond PER, niche fiscale,
  optimisation fiscale, simulation IR, TMI, compte étranger, 3916, 3916-bis, 8UU.

  Hors scope : succession/donation (notaire), IS/SASU/arbitrage dividende-salaire/SCI IS
  (comptable).
---

# Fiscaliste IA

Conseil fiscal pour les particuliers français. Posture : trouver la solution fiscale
optimale **dans le cadre légal**, pas minimiser à tout prix. Miroir du skill
`controleur-fiscal` (qui cherche les failles côté DGFIP).

## Règle Absolue

**Ne jamais donner de chiffre sans expliquer la séquence de calcul.**

Face à une question fiscale :
- Si l'utilisateur fournit des chiffres → calculer étape par étape en montrant chaque
  intermédiaire (revenu brut → RNI → quotient → impôt brut → décote → impôt net).
- Si l'utilisateur ne fournit pas de chiffres → expliquer la logique et identifier
  quelles valeurs il faut aller chercher.

**Ne jamais inventer un barème.** Utiliser exclusivement les valeurs inlinées ci-dessous
pour les revenus 2025 (déclaration 2026). Pour toute autre année, renvoyer à impots.gouv.fr.

## Fraîcheur des Données

**Vérifier `metadata.last_updated` dans le frontmatter.** Si > 6 mois :

```
⚠️ SKILL POTENTIELLEMENT OBSOLÈTE
Dernière MAJ: [date] — Vérifier les barèmes de la dernière loi de finances.
```

**Sources de vérification** : impots.gouv.fr, bofip.impots.gouv.fr, service-public.fr, legifrance.gouv.fr.

## Valeurs de Référence — Revenus 2025 (déclaration 2026)

### Barème IR (par part)

| Tranche | Taux |
|---------|------|
| 0 € à 11 600 € | 0 % |
| 11 600 € à 29 579 € | 11 % |
| 29 579 € à 84 577 € | 30 % |
| 84 577 € à 181 917 € | 41 % |
| > 181 917 € | 45 % |

*Tranches LFI 2026 (revenus 2025, indexation +0,9 %). Source : art. 197 CGI.*

### Quotient familial

- **Plafond du gain par demi-part supplémentaire : 1 807 €** (enfant à charge)
- Parent isolé (case T) : avantage des deux premières demi-parts (part du premier enfant) limité à 4 262 € (art. 197, I-2 CGI ; 4 262 € / 2 par quart de part en résidence alternée)
- Veuf avec enfant à charge : demi-parts plafonnées à 1 807 € chacune, plus une réduction d'impôt complémentaire de 2 011 € au maximum quand le plafonnement s'applique (art. 197, I-2 CGI)

### Décote (plancher à 0)

- **Célibataire** : si impôt brut < 1 982 € → décote = 897 − 0,4525 × impôt brut
- **Couple** : si impôt brut < 3 277 € → décote = 1 483 − 0,4525 × impôt brut

### Abattements

| Revenu | Case 2042 | Abattement |
|--------|-----------|------------|
| Salaires | 1AJ/1BJ | 10 % (min 509 €, max 14 555 €) ou frais réels |
| Pensions / retraites | 1AS/1BS | 10 % (min 454 € par pensionné, max 4 439 € par foyer) |
| Sortie en capital de PER (part des versements déduits) | 1AI/1BI | **Aucun abattement** : barème, pas de 10 % (art. 158, 5-b quinquies ; voir [references/per.md](references/per.md)) |
| Rémunération gérant art. 62 (gérant majoritaire SARL/EURL à l'IS) | 1GB/1HB | **10 %** — même déduction que les salaires (plancher/plafond communs) ou frais réels 1AK ; montant net de cotisations, CSG non déductible et CRDS réintégrées. Voir [references/remuneration-dirigeants.md](references/remuneration-dirigeants.md). |
| **Chômage (ARE)** | 1AP/1BP | **10 %** — l'ARE est un revenu de remplacement imposé selon les règles des traitements et salaires (BOI-RSA-BASE-30-50-20) ; l'abattement de 10 % s'applique sur le total salaires + ARE. Se déclare en 1AP/1BP (pas en 1AJ), mais bénéficie bien de l'abattement. |
| Dividendes (option barème) | 2DC | 40 % |
| Dividendes (PFU) | 2DC | Aucun |
| Micro-BNC | 5HQ (activité professionnelle) / 5KU (non professionnelle) — 5TE seulement en versement libératoire | 34 % (plafond 77 700 €) |
| Micro-foncier (nu) | 4BE | 30 % (plafond 15 000 €) |
| Micro-BIC LMNP longue durée (autres locations meublées) | 5NI | 50 % (plafond 77 700 € en 2025, 83 600 € pour 2026-2028) |
| Micro-BIC LMNP meublé tourisme non classé | 5NH | 30 % (plafond 15 000 €) |
| Micro-BIC LMNP meublé tourisme classé, chambres d'hôtes | 5NG | 50 % (plafond 77 700 € en 2025, 83 600 € pour 2026-2028) |

### PFU et prélèvements sociaux

La LFSS 2026 (loi n° 2025-1403 du 30/12/2025, art. 12) a porté la CSG sur les revenus du capital de 9,2 % à 10,6 %, soit un total PS de 17,2 % à 18,6 %, **avec deux dates d'entrée en vigueur distinctes** selon la nature du revenu :

*Note : ce +1,4 pt est juridiquement une hausse du taux de CSG sur les revenus du capital (art. L. 136-8, I, 2° CSS : « 9,2 % » remplacé par « 10,6 % ») — l'article 12 ne crée pas de contribution nouvelle. Cette hausse de CSG est présentée comme "Contribution Financière pour l'Autonomie" (CFA — label de l'amendement gouv. n° 1104 adopté le 04/12/2025, sans existence statutaire dans le code) et le surplus est affecté en totalité à la CNSA (branche autonomie) : l'art. 12, I, 1° a) porte la fraction CNSA de l'art. L. 131-8, 3° bis, c) CSS de 2,08 % à 3,48 % (soit exactement +1,4 pt). La CADES ne reçoit rien du surplus : elle perçoit 0,45 % dans les deux clés, sur les revenus à 10,6 % (L. 131-8, 3° bis : 6,67 % branche vieillesse + 0,45 % CADES + 3,48 % CNSA) comme sur les revenus restés à 9,2 % (nouveau 3° quater : 6,67 % + 0,45 % + 2,08 %). Sources : [amendement n° 1104 et exposé sommaire](https://www.assemblee-nationale.fr/dyn/17/amendements/2141/AN/1104) ; [art. 12 LFSS 2026 (JO)](https://www.legifrance.gouv.fr/jorf/article_jo/JORFARTI000053226452) ; [art. L. 131-8 CSS consolidé](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053538201) ; [art. L. 136-8 CSS consolidé](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000053278668). Ce skill continue de parler de "hausse de CSG/PS" — le tableau ci-dessous reste la référence pour savoir à quels revenus elle s'applique.*

| Catégorie | Base CSS | PS revenus 2025 (déclaration 2026) | PS revenus 2026+ | PFU effectif 2025 |
|---|---|---|---|---|
| **Revenus du patrimoine** : PV mobilières (CTO), crypto, LMNP | L. 136-6 CSS | **18,6 %** | 18,6 % | **31,4 %** |
| **Produits de placement** : dividendes, intérêts, gains PEA à la sortie, PER capital | L. 136-7 CSS | 17,2 % | **18,6 % (à partir du 01/01/2026)** | 30 % |
| **Dividendes et intérêts non prélevés à la source** (établissement payeur hors de France sans 2778-DIV, PS établis par voie de rôle) | L. 136-6 CSS | **18,6 %** | 18,6 % | **31,4 %** |
| **Cas restés à 17,2 %** (art. L. 136-8, IV CSS) : assurance-vie et capitalisation, revenus fonciers (nu, SCPI), PV immobilières, épargne logement (PEL/CEL), PEP | L. 136-8 IV | 17,2 % | 17,2 % | 30 % (AV < 8 ans) |

**Conséquence pratique** : pour la déclaration 2026 (revenus 2025), une PV mobilière sur compte-titres est imposée à **31,4 % au PFU** (12,8 % IR + 18,6 % PS), alors qu'un dividende encaissé en 2025 reste à **30 %** (12,8 % IR + 17,2 % PS). Le passage à 18,6 % pour les dividendes interviendra sur les encaissements 2026.

- **CSG déductible : 6,8 %** — **uniquement si option barème** ; déduite l'année même pour les revenus dont les PS sont prélevés à la source (dividendes, intérêts), l'année suivante pour les PS par voie de rôle (plus-values)
- **Option barème globale** : concerne TOUS les revenus du capital de l'année

### PER (versements 2025, déclaration 2026)

- **Plafond personnalisé : 10 %** des revenus d'activité de l'année N-1 (2024) nets de frais (salaires et ARE après abattement 10 %, BIC, BNC, BA), retenus dans la limite de 8 PASS de N-1 ; **le PASS de référence est celui de l'année qui précède le versement** (art. 163 quatervicies CGI ; brochure IR 2026, charges déductibles)
- **Versements 2025 : plancher 4 637 €, plafond 37 094 €** (10 % et 80 % du PASS 2024 = 46 368 €)
- **Versements 2026 : plancher 4 710 €, plafond 37 680 €** (PASS 2025 = 47 100 €) ; versements 2027 : 4 806 € et 38 448 € (PASS 2026 = 48 060 €)
- **Report** : plafonds non utilisés des 3 années précédentes (2022 à 2024 pour les versements 2025) ; **5 ans pour les reliquats nés à partir de 2026** (LFI 2026, art. 9 et 10 ; BOI-IR-BASE-20-50-30 § 80) : les versements 2026 n'utilisent que les reliquats 2023 à 2025, la fenêtre complète de cinq ans n'est atteinte qu'en 2031. Imputation sur le plafond de l'année d'abord, puis sur les reliquats du plus ancien au plus récent
- **Mutualisation couple** : case 6QR sur la 2042 ; sans objet l'année qui suit les 70 ans d'un conjoint
- **70 ans et plus** : versements non déductibles à compter du 01/01/2026 (LFI 2026, art. 9)
- **RFR** : le versement déduit est réintégré dans le RFR (art. 1417, IV CGI) : sans effet sur la CEHR, la CDHR et les seuils de CSG sur l'ARE ou les pensions

### IFI

- **Seuil d'assujettissement : 1 300 000 €** (patrimoine immobilier net au 1er janvier)
- **Abattement résidence principale : 30 %** sur la valeur vénale
- **Barème** : 0 % (0-800 k€), 0,5 % (800 k€-1,3 M€), 0,7 % (1,3-2,57 M€), 1 % (2,57-5 M€), 1,25 % (5-10 M€), 1,5 % (>10 M€)
- **Décote d'entrée** (1,3-1,4 M€) : 17 500 − 1,25 % × patrimoine net
- **Plafonnement 75 %** : IR + IFI + PS ≤ 75 % des revenus N-1 (revenus exonérés compris)

### CEHR (Contribution Exceptionnelle Hauts Revenus)

Base : RFR, pas RNI. S'ajoute à l'IR net. Art. 223 sexies CGI.

| Situation | Tranche 3 % | Tranche 4 % |
|-----------|-------------|-------------|
| Célibataire | 250 000 € — 500 000 € | > 500 000 € |
| Couple | 500 000 € — 1 000 000 € | > 1 000 000 € |

### CDHR (Contribution Différentielle sur les Hauts Revenus)

Mécanisme **distinct de la CEHR** : impose un **plancher d'imposition à 20 %** d'un revenu de référence retraité. Art. 224 CGI, créé par l'art. 10 LFI 2025 (loi n° 2025-127 du 14/02/2025) pour les revenus 2025, prorogé et modifié par l'art. 2 LFI 2026 (loi n° 2026-103) : due jusqu'à l'année pour laquelle le projet de loi d'approbation des comptes constate un déficit du budget général sous 3 % du PIB (BOI-IR-CDHR-10 du 30/06/2026).

Seuils de revenu de référence : > 250 000 € (personne seule) / > 500 000 € (couple), avec une décote jusqu'à 330 000 € / 660 000 €. CDHR = 20 % × revenu de référence − décote − (IR retraité + CEHR + prélèvements libératoires + 1 500 € par personne à charge + 12 500 € pour un couple), si positif. Le revenu de référence n'intègre pas l'abattement de 50 % sur les gains d'actions gratuites ni l'abattement de 40 % sur les dividendes.

Calcul automatique par l'administration après dépôt de la 2042. Acompte de 95 % à verser entre le 1er et le 15 décembre de l'année des revenus via le service "Gérer mon prélèvement à la source" sur impots.gouv.fr ; pénalité de 20 % en cas de défaut, de retard ou d'acompte inférieur de plus de 20 % au dû. Acompte et pénalités reconduits pour les revenus 2026 (LFI 2026, art. 2).

Détail dans [references/cas-speciaux.md](references/cas-speciaux.md) section CDHR.

### Crypto (PAMC)

- **Exonération totale** si cessions annuelles ≤ **305 €** (seuil en montant brut, pas en PV)
- Au-delà : imposition **PFU 31,4 %** (12,8 % IR + 18,6 % PS, LFSS 2026, PV mobilière = revenu du patrimoine) sur TOUTE la PV (pas seulement l'excédent), pour les cessions réalisées dès 2025
- Formulaire 2086 obligatoire dès 1 € de cession > 305 €

### Assurance-vie — rachats après 8 ans

- **Abattement annuel** : 4 600 € (célibataire) / **9 200 € (couple)** — sur la quote-part de gains imposable
- **Seuil 150 000 €** de primes nettes : **seuil personnel** (par bénéficiaire du rachat, pas par foyer : chaque conjoint a le sien), apprécié sur les primes non remboursées au 31 décembre de l'année précédant le rachat, tous contrats du bénéficiaire confondus (BOI-RPPM-RCM-20-15 § 140 à 190). Au-delà : 12,8 % d'IR au lieu de 7,5 % sur la fraction correspondante (PS 17,2 % dans tous les cas, l'AV étant exclue de la hausse LFSS 2026)

### Fiches précises

Pour les détails (exemples chiffrés, conditions, cas particuliers), voir les fichiers
`references/*.md`. Les fichiers `data/*.json` contiennent les mêmes valeurs en format
machine.

## Principes

1. **Cadre légal** — Optimisation uniquement dans le respect du CGI et de la doctrine BOFiP.
2. **Séparation** — Distinguer IR, prélèvements sociaux, CEHR. Les confondre sous-estime la charge réelle.
3. **Séquence** — Toujours dérouler le calcul de haut en bas (brut → net → imposable → impôt → net à payer).
4. **Nuance** — Pas de "c'est toujours avantageux". Tout dépend du TMI, de l'horizon, de la situation familiale.
5. **Humilité** — Dire quand un conseiller fiscal ou un avocat fiscaliste en exercice est nécessaire (situations complexes, contentieux, non-résidents).
6. **Traçabilité** — Citer l'article du CGI ou le BOFiP pour chaque règle appliquée.

## Calcul déterministe

Pour vérifier un calcul d'IR plutôt que de le faire à la main, utiliser le script
`scripts/calc_ir.py` :

```bash
# Depuis un foyer.json
python fiscaliste/scripts/calc_ir.py --foyer foyer.json

# En direct
python fiscaliste/scripts/calc_ir.py --rni 45000 --parts 1
python fiscaliste/scripts/calc_ir.py --rni 126000 --parts 3 --parts-base 2
```

Le script applique : abattement de 10 % sur les salaires et l'ARE **par déclarant** (plancher et plafond pour chaque membre du foyer), abattement de 10 % sur les pensions (minimum par pensionné, maximum par foyer ; plancher jamais supérieur au revenu), barème 2025, quotient familial avec plafonnement (enfants en résidence alternée décomptés après ceux à charge exclusive), décote, IR forfaitaire du PFU (12,8 %, art. 200 A CGI) sauf option barème, PS différenciés selon la nature du revenu (18,6 % sur revenus du patrimoine dès 2025 ; 17,2 % sur produits de placement 2025 ; PS sur les revenus fonciers et l'assurance-vie non calculés, taux maintenu à 17,2 %), CEHR (RFR incluant les versements PER déduits, art. 1417, IV CGI). Il **ne traite pas** les réductions/crédits (à retrancher manuellement) ni les régimes spéciaux (revenus exceptionnels, non-résidents). Pour la CDHR (plancher 20 % sur RFR > 250/500 k€), voir [references/cas-speciaux.md](references/cas-speciaux.md) — calculée automatiquement par l'administration.

**Réductions, crédits et solde** (exception à la phrase précédente) : si le foyer.json contient le bloc `reductions_credits` (et/ou `prelevement_a_la_source`), le script poursuit au-delà de l'impôt après décote : réductions dons (75 % / 66 %, limite de 20 %, excédent reportable), Pinel (fraction annuelle selon l'année, la durée et la prorogation), scolarité, crédits emploi à domicile et garde d'enfants, plafonnement global des niches (10 000 € / 18 000 €, art. 200-0 A), IR 12,8 % du PFU, impôt net, puis **solde** après retenue à la source, acomptes et **avance RICI de janvier** (art. 1665 bis). Ordre d'imputation de l'art. 197, I-5. Sans ces blocs, la sortie est inchangée. Détails : [references/deductions-reductions-credits.md](references/deductions-reductions-credits.md).

Pour la fraîcheur des données : `python fiscaliste/scripts/update_data.py`.

## Workflow Obligatoire

### 1. Identifier l'Opération

| Domaine | Référence |
|---------|-----------|
| **Déclaration annuelle 2042 (workflow complet)** | [references/declaration-workflow.md](references/declaration-workflow.md) |
| Calcul / simulation IR | [references/ir-mecanisme.md](references/ir-mecanisme.md) |
| Rémunération des gérants art. 62 (gérant majoritaire SARL/EURL à l'IS, case 1GB, acomptes) | [references/remuneration-dirigeants.md](references/remuneration-dirigeants.md) |
| Prélèvement à la source (PAS, modulation, acompte crédits) | [references/prelevement-a-la-source.md](references/prelevement-a-la-source.md) |
| Quotient familial, décote, plafonnement | [references/quotient-familial.md](references/quotient-familial.md) |
| Revenus du capital (PFU, dividendes, PV mobilières) | [references/revenus-capital.md](references/revenus-capital.md) |
| PEA et assurance-vie (rachats) | [references/pea-assurance-vie.md](references/pea-assurance-vie.md) |
| Revenus fonciers, LMNP, SCI à l'IR | [references/revenus-fonciers-lmnp.md](references/revenus-fonciers-lmnp.md) |
| Equity salarial (RSU, BSPCE, SO, PEE) | [references/equity-salarial.md](references/equity-salarial.md) |
| Crypto-actifs | [references/crypto.md](references/crypto.md) |
| IFI | [references/ifi.md](references/ifi.md) |
| PER et épargne retraite | [references/per.md](references/per.md) |
| Déductions / réductions / crédits | [references/deductions-reductions-credits.md](references/deductions-reductions-credits.md) |
| Départ de France, non-résidents (année du départ, taux minimum, foncier, PS 7,5 %, ex-RP, exit tax) | [references/non-residents.md](references/non-residents.md) |
| Cas particuliers (revenus exceptionnels, CEHR, DOM, impatriation) | [references/cas-speciaux.md](references/cas-speciaux.md) |
| Comptes, assurance-vie et comptes crypto à l'étranger (3916 / 3916-bis, 8UU / 8TT) | [references/comptes-etrangers.md](references/comptes-etrangers.md) |
| **Sources officielles (CGI, BOFiP, simulateurs DGFIP)** | [references/sources-officielles.md](references/sources-officielles.md) |

**Redirections (hors scope) :**
- Succession, donation, démembrement → skill `notaire`
- IS, arbitrage salaire/dividende SASU, SCI à l'IS → skill `comptable`

### 2. Collecter le Contexte

Si un fichier `foyer.json` existe à la racine du projet, le lire pour obtenir le contexte
automatiquement. Voir [foyer.example.json](foyer.example.json) pour la structure.

Des **scénarios illustratifs** sont fournis dans [`examples/`](examples/README.md) : couple 2 enfants, célibataire RSU + crypto, LMNP + foncier, IFI + CEHR, non-résident.

**Si une information critique manque, la demander explicitement.** Ne pas faire de suppositions.

### 3. Calculer — Séquence IR Standard

1. Revenus bruts par catégorie → application des abattements → revenu net catégoriel
2. Somme des revenus nets catégoriels → revenu brut global
3. Déductions (PER, pension alimentaire, CSG déductible) → RNI
4. RNI ÷ nombre de parts → quotient
5. Barème progressif sur le quotient → impôt par part
6. × nombre de parts → impôt brut
7. Plafonnement du gain QF (si enfants à charge) : **toujours comparer gain réel vs gain max (N × 1 807 €)**
8. Décote (si impôt brut < seuil)
9. Réductions d'impôt (Pinel, dons, FCPI…) → impôt après réductions
10. Crédits d'impôt (garde d'enfant, emploi à domicile) → impôt net final
11. Prélèvements sociaux sur revenus du capital (ajout séparé, pas inclus dans IR)
12. CEHR si RFR > seuils

### 4. Restituer

Format de sortie structuré :
- **Faits** (situation déclarée par l'utilisateur)
- **Hypothèses** (valeurs supposées ou à vérifier)
- **Calculs** (chaque étape numérotée avec le chiffre intermédiaire)
- **Résultat** (impôt net, PS, CEHR, total)
- **Checklist à vérifier sur impots.gouv.fr** pour l'année concernée
- **Pistes d'optimisation** (si pertinent) avec chiffrage comparatif

## Rappels Obligatoires par Sujet

Ces points sont systématiquement vérifiés par les utilisateurs exigeants — ne jamais les omettre.

### Pour toute simulation IR

- Vérifier le plafonnement QF : calculer l'impôt avec et sans les enfants, puis comparer
  le gain réel au plafond théorique (nb_demi_parts × 1 807 €).
- Utiliser les tranches 2025 inlinées ci-dessus (11 600 / 29 579 / 84 577 / 181 917).
- Tester la décote (seuil 1 982 € célib / 3 277 € couple) même si non applicable.

### Pour un PER

- Rappeler que c'est un **report d'imposition**, pas une exonération.
- TMI sortie < TMI entrée = gain ; TMI sortie ≥ TMI entrée = neutre ou perte.
- **Priorité : saturer l'abondement employeur PEE/PERCO avant PER** si l'option existe
  (l'abondement est quasi-toujours plus rentable qu'une défiscalisation PER).

### Pour des RSU

- Demander la date de l'AGE et le caractère qualifiant du plan : le régime en dépend (voir `references/equity-salarial.md`). Cas courant : plan qualifiant, AGE après le 31/12/2017. Pour une société étrangère, c'est la date d'autorisation du plan par l'organe habilité, pas celle du sous-plan français (BOI-RSA-ES-20-20-10-20 § 460).
- Rien n'est dû au vesting : le gain d'acquisition est imposé l'année de la **cession** (ou donation, mise en location ; art. 80 quaterdecies CGI).
- **Période de conservation** : une vente pendant la période de conservation prévue par le plan (au moins deux ans cumulés acquisition + conservation, C. com. L. 225-197-1) fait imposer le gain en salaire de droit commun (BOI-RSA-ES-20-20-20 § 10). Vérifier la date de fin de conservation de chaque lot.
- Plan qualifiant, fraction ≤ 300 000 €/an par attributaire : **barème après abattement de 50 %** (2042 C cases 1TZ + 1WZ), **PS 18,6 %** sur le gain avant abattement, **ni CSG d'activité ni contribution salariale** ; CSG déductible l'année suivante à hauteur de 3,4 % du gain (6,8 points au prorata du gain imposé).
- Fraction > 300 000 € ou AGA attribuées depuis le 28/09/2012 sur AGE antérieure au 08/08/2015 : **salaire** (case 1TT), CSG/CRDS 9,7 %, contribution salariale 10 %. Plan non qualifiant : salaire ordinaire l'année du vesting, via la paie (1AJ), sans contribution de 10 %.
- PV de cession ultérieure = **distincte**, imposée au **PFU 31,4 %** (12,8 % IR + 18,6 % PS, LFSS 2026 : PV mobilière = revenu du patrimoine) pour les cessions réalisées dès 2025, ou barème sur option globale (à comparer les années à faible revenu).
- Toujours distinguer ces deux phases dans la réponse ; identifier les lots cédés (lot par lot si individualisables, sinon au prorata) quand RSU, ESPP et achats se mêlent.
- RFR : le gain compte avant abattement de 50 % pour la CEHR ; après abattement pour la CDHR.
- Quotient pour revenus exceptionnels : seulement si le gain est exceptionnel par nature et par montant (moyenne des trois années précédentes) ; le BOFiP exclut les revenus « réalisés dans le cadre normal de l'activité professionnelle » (BOI-IR-LIQ-20-30-20 § 50), demande à motiver, à chiffrer avec et sans.
- **ESPP** (plan d'achat avec décote, non qualifié) : la décote est un salaire l'année de l'achat (paie, 1AJ), sans abattement ni seuil de 300 000 € ni contribution de 10 % ; la plus-value ultérieure est une PV mobilière calculée sur la valeur réelle au jour de l'achat.

### Pour un LMNP

- Micro-BIC **longue durée** : abattement **50 %**, plafond **77 700 €** (revenus 2025 ; **83 600 €** pour 2026-2028, BOI-BAREME-000044).
- Micro-BIC **meublé tourisme non classé** : abattement **30 %**, plafond 15 000 € (Loi Le Meur ; inchangé 2026-2028).
- Micro-BIC **meublé tourisme classé** : abattement 50 %, plafond 77 700 € (83 600 € pour 2026-2028).
- Plafond apprécié sur N-1 ou N-2 : le réel devient obligatoire après **deux années consécutives** de dépassement.
- Seuil LMP : recettes > **23 000 €** ET recettes > autres revenus d'activité du foyer, **pensions et rentes viagères comprises** (art. 155 IV 2 CGI, renvoi à l'art. 79).
- Amortissements au réel : plafonnés au loyer diminué des autres charges, ils **ne peuvent ni créer ni accroître un déficit** (art. 39 C ; BOI-BIC-CHAMP-40-20 § 57).
- Déficit LMNP au réel : **non imputable sur le revenu global** (reportable 10 ans sur les seuls revenus de location meublée non professionnelle).
- **Revente** : les amortissements admis en déduction au réel sont retranchés du prix d'acquisition pour la plus-value (art. 150 VB, III, cessions depuis le 15/02/2025), sauf ceux des dépenses de construction, reconstruction, agrandissement ou amélioration (art. 150 VB, III, 1er alinéa) ; les travaux faits soi-même et les matériaux achetés ne majorent jamais le prix d'acquisition (seules les factures d'entreprise, ou le forfait de 15 % après plus de cinq ans).
- PS sur le résultat LMNP : 18,6 % dès les revenus 2025 (revenus du patrimoine) ; revenus fonciers nus : 17,2 %.

### Pour un déficit foncier (régime réel)

- **Les loyers bruts compensent d'abord les intérêts d'emprunt** (BOI-RFPI-BASE-30-20 § 110). Ne jamais isoler les intérêts du déficit avant d'avoir vérifié s'ils sont couverts par les loyers : seul l'**excédent des intérêts sur les loyers** est cantonné aux revenus fonciers.
- Le reste du déficit s'impute sur le revenu global dans la limite de **10 700 €** (rehaussée, sur option, du montant des travaux de rénovation énergétique faisant passer le logement de E/F/G à A-D payés jusqu'au 31/12/2027, dans la limite de **21 400 €**) ; l'excédent se reporte 10 ans sur les revenus fonciers. Si le revenu global est insuffisant, le solde forme un déficit global reportable 6 ans.
- L'imputation sur le revenu global suppose de **louer nu jusqu'au 31 décembre de la 3e année qui suit l'imputation**, sinon réintégration. Cases 2042 : 4BA (bénéfice), 4BB (déficit sur revenus fonciers), 4BC (déficit sur revenu global), 4BD (déficits antérieurs).
- Voir l'exemple chiffré de [references/revenus-fonciers-lmnp.md](references/revenus-fonciers-lmnp.md).

### Pour un arbitrage PFU vs barème

- Chiffrer les deux scénarios systématiquement.
- Rappeler que l'option barème est **globale** (tous revenus du capital de l'année). Elle était irrévocable jusqu'aux revenus 2025 ; la LFI 2026 (loi n° 2026-103, art. 126 ; art. 200 A CGI) a supprimé ce caractère irrévocable (brochure IR 2026, nouveautés).
- À TMI ≤ 11 % : barème souvent meilleur (abattement 40 % dividendes + CSG déductible 6,8 %).
- À TMI ≥ 30 % : PFU souvent meilleur.

### Pour l'IFI

- Appliquer l'abattement 30 % sur la résidence principale avant sommation.
- Tester la décote d'entrée 1,3-1,4 M€.
- Vérifier le plafonnement 75 % (IR + IFI + PS ≤ 75 % des revenus N-1, revenus exonérés compris).

### Pour les crypto

- Rappeler l'exonération si cessions annuelles ≤ 305 € (montant brut, pas la PV).
- Au-delà : imposition sur TOUT (pas seulement l'excédent).

## Limites à Signaler

- Les barèmes, plafonds et seuils changent chaque loi de finances → toujours vérifier pour l'année concernée.
- Les situations complexes (non-résidents, revenus étrangers, régimes spéciaux DOM-TOM, contentieux) peuvent déroger aux règles générales et nécessitent un avocat fiscaliste.
- Ce skill est un guide de raisonnement, pas un substitut à un conseiller fiscal pour les décisions importantes.
- Les chiffres fournis sont indicatifs — seul l'avis d'imposition de la DGFIP fait foi.
