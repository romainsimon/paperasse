---
name: fiscaliste
metadata:
  last_updated: 2026-11-04
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
  optimisation fiscale, simulation IR, TMI.

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
| **Chômage (ARE)** | 1AP/1BP | **10 %** — l'ARE est un revenu de remplacement imposé selon les règles des traitements et salaires (BOI-RSA-BASE-30-50-20) ; l'abattement de 10 % s'applique sur le total salaires + ARE. Se déclare en 1AP/1BP (pas en 1AJ), mais bénéficie bien de l'abattement. |
| Dividendes (option barème) | 2DC | 40 % |
| Dividendes (PFU) | 2DC | Aucun |
| Micro-BNC | 5HQ (activité professionnelle) / 5KU (non professionnelle) — 5TE seulement en versement libératoire | 34 % (plafond 77 700 €) |
| Micro-foncier (nu) | 4BE | 30 % (plafond 15 000 €) |
| Micro-BIC LMNP longue durée | 5NI | 50 % (plafond 77 700 €) |
| Micro-BIC LMNP meublé tourisme non classé | 5NH | 30 % (plafond 15 000 €) |
| Micro-BIC LMNP meublé tourisme classé | 5NG | 50 % (plafond 77 700 €) |

### PFU et prélèvements sociaux

La LFSS 2026 (loi n° 2025-1403 du 30/12/2025, art. 12) a porté la CSG sur les revenus du capital de 9,2 % à 10,6 %, soit un total PS de 17,2 % à 18,6 %, **avec deux dates d'entrée en vigueur distinctes** selon la nature du revenu :

| Catégorie | Base CSS | PS revenus 2025 (déclaration 2026) | PS revenus 2026+ | PFU effectif 2025 |
|---|---|---|---|---|
| **Revenus du patrimoine** : PV mobilières (CTO), crypto, LMNP | L. 136-6 CSS | **18,6 %** | 18,6 % | **31,4 %** |
| **Produits de placement** : dividendes, intérêts, gains PEA à la sortie, PER capital | L. 136-7 CSS | 17,2 % | **18,6 % (à partir du 01/01/2026)** | 30 % |
| **Dividendes et intérêts non prélevés à la source** (établissement payeur hors de France sans 2778-DIV, PS établis par voie de rôle) | L. 136-6 CSS | **18,6 %** | 18,6 % | **31,4 %** |
| **Cas restés à 17,2 %** (art. L. 136-8, IV CSS) : assurance-vie et capitalisation, revenus fonciers (nu, SCPI), PV immobilières, épargne logement (PEL/CEL), PEP | L. 136-8 IV | 17,2 % | 17,2 % | 30 % (AV < 8 ans) |

**Conséquence pratique** : pour la déclaration 2026 (revenus 2025), une PV mobilière sur compte-titres est imposée à **31,4 % au PFU** (12,8 % IR + 18,6 % PS), alors qu'un dividende encaissé en 2025 reste à **30 %** (12,8 % IR + 17,2 % PS). Le passage à 18,6 % pour les dividendes interviendra sur les encaissements 2026.

- **CSG déductible : 6,8 %** — **uniquement si option barème** ; déduite l'année même pour les revenus dont les PS sont prélevés à la source (dividendes, intérêts), l'année suivante pour les PS par voie de rôle (plus-values)
- **Option barème globale** : concerne TOUS les revenus du capital de l'année

### PER (versements 2025)

- **Plancher de déduction : 4 710 €** (10 % × PASS 2025 = 47 100 €)
- **Plafond de déduction : 37 680 €** (10 % × 8 × PASS 2025)
- **Plafond personnalisé : 10 %** des revenus professionnels N-1 (après abattement 10 %)
- **Report** : plafonds non utilisés des 3 années précédentes mobilisables (FIFO ancien en premier)
- **Mutualisation couple** : case à cocher sur 2042

### IFI

- **Seuil d'assujettissement : 1 300 000 €** (patrimoine immobilier net au 1er janvier)
- **Abattement résidence principale : 30 %** sur la valeur vénale
- **Barème** : 0 % (0-800 k€), 0,5 % (800 k€-1,3 M€), 0,7 % (1,3-2,57 M€), 1 % (2,57-5 M€), 1,25 % (5-10 M€), 1,5 % (>10 M€)
- **Décote d'entrée** (1,3-1,4 M€) : 17 500 − 1,25 % × patrimoine net
- **Plafonnement 75 %** : IR + IFI + PS ≤ 75 % des revenus N-1

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
- **Seuil 150 000 €** de versements nets (tous contrats AV du foyer) : au-delà, PFU 30 % sur la fraction

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

Pour la fraîcheur des données : `python fiscaliste/scripts/update_data.py`.

## Workflow Obligatoire

### 1. Identifier l'Opération

| Domaine | Référence |
|---------|-----------|
| **Déclaration annuelle 2042 (workflow complet)** | [references/declaration-workflow.md](references/declaration-workflow.md) |
| Calcul / simulation IR | [references/ir-mecanisme.md](references/ir-mecanisme.md) |
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
| Cas particuliers (non-résidents, revenus exceptionnels, CEHR) | [references/cas-speciaux.md](references/cas-speciaux.md) |
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

- Gain d'acquisition = **SALAIRE** (case 1TT), abattement 10 % applicable sur le total salaires.
- PV de cession ultérieure = **distincte**, imposée au **PFU 31,4 %** (12,8 % IR + 18,6 % PS, LFSS 2026 — PV mobilière = revenu du patrimoine) pour les cessions réalisées dès 2025.
- Toujours distinguer ces deux phases dans la réponse.
- Mentionner la contribution salariale 10 % si plan qualifiant.
- CSG 9,7 % sur le gain d'acquisition RSU.
- Envisager le quotient pour revenus exceptionnels si le vesting est massif vs salaire habituel.

### Pour un LMNP

- Micro-BIC **longue durée** : abattement **50 %**, plafond **77 700 €**.
- Micro-BIC **meublé tourisme non classé** : abattement **30 %**, plafond 15 000 € (Loi Le Meur).
- Micro-BIC **meublé tourisme classé** : abattement 50 %, plafond 77 700 €.
- Seuil LMP : recettes > **23 000 €** ET > 50 % des autres revenus pro du foyer.
- Déficit LMNP au réel : **non imputable sur le revenu global** (reportable 10 ans sur BIC non pro).

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
- Vérifier le plafonnement 75 % (IR + IFI + PS ≤ 75 % des revenus N-1).

### Pour les crypto

- Rappeler l'exonération si cessions annuelles ≤ 305 € (montant brut, pas la PV).
- Au-delà : imposition sur TOUT (pas seulement l'excédent).

## Limites à Signaler

- Les barèmes, plafonds et seuils changent chaque loi de finances → toujours vérifier pour l'année concernée.
- Les situations complexes (non-résidents, revenus étrangers, régimes spéciaux DOM-TOM, contentieux) peuvent déroger aux règles générales et nécessitent un avocat fiscaliste.
- Ce skill est un guide de raisonnement, pas un substitut à un conseiller fiscal pour les décisions importantes.
- Les chiffres fournis sont indicatifs — seul l'avis d'imposition de la DGFIP fait foi.
