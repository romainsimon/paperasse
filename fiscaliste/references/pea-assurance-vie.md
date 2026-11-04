# PEA et Assurance-Vie (fiscalité des rachats)

Voir `data/pea-assurance-vie.json` pour les taux et seuils.

> **Note** : la fiscalité de la transmission de l'assurance-vie (au décès) est couverte par le skill `notaire`. Ce document ne couvre que la fiscalité des rachats de vivant.

## PEA (Plan d'Épargne en Actions)

### Plafonds de versement

| Plan | Plafond |
|------|---------|
| PEA classique | 150 000 € |
| PEA-PME | 225 000 €, plafond commun avec le PEA : PEA + PEA-PME ≤ 225 000 €, dont PEA ≤ 150 000 € (art. L. 221-32-1 CMF) |
| PEA jeune (enfant majeur rattaché) | 20 000 € |

Les plafonds concernent les **versements**, pas la valeur du plan. Un plan peut dépasser 150 000 € de valorisation grâce aux gains.

### Fiscalité selon ancienneté du plan

#### Avant 5 ans

- **Tout retrait entraîne la clôture** du plan
- Imposition des gains : 12,8 % IR (ou barème sur option globale) + PS produits de placement, 17,2 % pour un retrait en 2025 puis **18,6 % à compter du 01/01/2026** (LFSS 2026), soit PFU 31,4 %

**Exceptions** (BOI-ANNX-000072, version du 30/07/2024 ; BOI-RPPM-RCM-40-50-40) : deux cas évitent la clôture, avec des effets différents.
- **Création ou reprise d'entreprise** (par le titulaire, son conjoint ou partenaire, un ascendant ou un descendant), sommes affectées dans les 3 mois : pas de clôture, gain **exonéré d'IR**, prélèvements sociaux dus, mais **plus aucun versement possible** ensuite.
- **Licenciement, invalidité ou mise à la retraite anticipée** du titulaire, de son conjoint ou partenaire, ou liquidation judiciaire de la société dont les titres figurent au plan : pas de clôture et versements toujours possibles, mais le gain reste **imposable** (12,8 % ou barème sur option, plus PS). Déclaration en 3VT (2042 C) dans les deux cas de retrait imposable.

#### Après 5 ans

- **Retraits libres** sans clôture du plan
- **EXONÉRATION TOTALE d'IR** sur les gains
- **Prélèvements sociaux** dus sur les gains à chaque retrait, au taux applicable à la date du retrait :
  - **Retraits avant le 01/01/2026** : 17,2 %
  - **Retraits à partir du 01/01/2026** : **18,6 %** (LFSS 2026, art. 12, modifiant L. 136-7 CSS) sur le gain constaté au retrait, sous réserve des « taux historiques » ci-dessous
- Référence : les gains PEA sont qualifiés de "produits de placement" (PS prélevés à la source au moment du retrait), pas de "revenus du patrimoine"

### Taux historiques PS

Pour un plan ouvert avant 2018, la fraction du gain acquise avant le 01/01/2018 (et, pour les plans qui avaient moins de 5 ans à cette date, la fraction acquise pendant les 5 premières années du plan, au plus tard fin 2022) reste taxée aux taux en vigueur lors de son acquisition (« taux historiques », LFSS 2018 art. 8, V-C). La LFSS 2026 (art. 12, II-2°) exclut en outre de la hausse à 18,6 % ces produits « acquis ou constatés avant le 1er janvier 2026 » ; la portée exacte de cette clause n'est pas encore commentée au BOFiP (BOI-RPPM-PSOC). Calcul par couches fait par l'établissement : ne pas le reconstituer à la main, lire le relevé.

### Composition éligible

- Actions européennes (UE + EEE)
- OPCVM investis à 75% minimum en actions européennes
- Certaines ETF européens (vérifier l'éligibilité)

**Non éligibles** : actions américaines, asiatiques, obligations, or, crypto.

### Arbitrage PEA vs assurance-vie

| Critère | PEA | AV |
|---------|-----|-----|
| Exonération IR | **Oui** après 5 ans | Non (abattement seulement) |
| PS sur gains | 17,2 % puis 18,6 % à partir du 01/01/2026, à chaque retrait | 17,2 % inchangé (cas exclu de la hausse LFSS 2026) |
| Composition | Actions EUR uniquement | Libre (actions, obligations, fonds €) |
| Retrait avant échéance | Clôture avant 5 ans | Libre à tout moment |
| Transmission | Dans succession classique | Régime spécifique (voir notaire) |
| Plafond | 150 000 € | Aucun |

**Stratégie de cumul** :
- PEA pour la performance actions européennes (fiscalité imbattable après 5 ans)
- AV pour la diversification (fonds €, UC mondiales) et la transmission

## Assurance-Vie : fiscalité des rachats

### Principe de proportionnalité

**Un rachat partiel NE retire PAS que du capital non imposable.** Il retire une fraction **proportionnelle** de gains et de capital.

**Formule** :
```
quote_part_gains_imposable = (gains_totaux / valeur_totale_contrat) × montant_racheté
```

**Exemple** :
- Contrat : versements 80 000 € + gains 20 000 € = valeur totale 100 000 €
- Rachat de 10 000 €
- Quote-part gains imposable = (20 000 / 100 000) × 10 000 = **2 000 €**
- 8 000 € sont du capital (non imposable), 2 000 € sont du gain (imposable)

**Piège classique** : croire qu'un rachat de 10 000 € sur un contrat avec 20 000 € de gains retire d'abord du capital (0 imposable). Non.

### Abattement annuel après 8 ans

Voir `data/pea-assurance-vie.json` → `assurance_vie_rachats.abattement_annuel_apres_8_ans`.

| Situation | Abattement annuel |
|-----------|-------------------|
| Célibataire, veuf, divorcé | 4 600 € |
| Couple (imposition commune) | 9 200 € |

**Condition** : 8 ans d'ancienneté du **contrat** (pas des versements).

**Mécanique** : l'abattement s'applique sur la quote-part de gains imposable, pas sur le montant racheté.

**Renouvelable** : chaque année civile (pas glissant sur 12 mois).

### Taux d'imposition selon date des versements

#### Versements avant le 27 septembre 2017

Taux dégressif selon ancienneté du contrat. Prélèvement libératoire (PFL) optionnel :

| Ancienneté du contrat | PFL | Barème (option) |
|-----------------------|-----|-----------------|
| < 4 ans | 35% | Barème |
| 4-8 ans | 15% | Barème |
| > 8 ans | 7,5% (après abattement) | Barème (après abattement) |

#### Versements après le 27 septembre 2017

**Règle** : PFU 30 % sur les gains (12,8 % IR + 17,2 % PS, l'assurance-vie restant à 17,2 % après la LFSS 2026), avec un taux d'IR réduit à 7,5 % selon l'ancienneté du contrat et le montant des **primes** versées (pas l'encours).

| Situation | Taux |
|-----------|------|
| Contrat < 8 ans | 12,8 % IR + 17,2 % PS (30 %) |
| Contrat ≥ 8 ans, primes nettes ≤ 150 000 € | 7,5 % IR (après abattement de 4 600 / 9 200 €) + 17,2 % PS (24,7 %) ; cases 2VV |
| Contrat ≥ 8 ans, primes nettes > 150 000 € | 7,5 % sur la fraction des produits correspondant à 150 000 € de primes, 12,8 % au-delà (case 2WW) ; PS 17,2 % sur tout |

**Seuil 150 000 €** (art. 200 A, 1-B-2° et art. 125-0 A, II-2°-b CGI ; BOI-RPPM-RCM-20-15 § 140 à 190) :
- **seuil personnel**, par bénéficiaire du rachat, et non par foyer : dans un couple, chacun a son propre seuil de 150 000 € (co-souscription : en principe la totalité des primes du contrat est retenue pour chaque co-souscripteur ; par tolérance, la moitié pour les époux et partenaires de Pacs, § 170) ;
- apprécié sur les **primes versées non remboursées au 31 décembre de l'année qui précède le rachat**, tous contrats d'assurance-vie et de capitalisation du bénéficiaire confondus, français ou étrangers, quel que soit leur régime ;
- fraction des produits à 7,5 % = produits × (150 000 € − primes antérieures au 27/09/2017 non remboursées) / primes postérieures au 27/09/2017 non remboursées (§ 190).

### Option barème

**Avantageuse si TMI ≤ 11%** — le barème peut être meilleur que le PFU après 8 ans (car abattement annuel + taux IR faible).

Option **globale** pour l'année (tous les revenus de capitaux mobiliers et plus-values). Irrévocable jusqu'aux revenus 2025 ; la LFI 2026 (loi n° 2026-103, art. 126 ; art. 200 A CGI) a supprimé ce caractère irrévocable (brochure IR 2026, nouveautés).

### Contrats très anciens (avant 1983)

Régime de faveur pour les contrats souscrits **avant le 1er janvier 1983** : exonération totale d'IR sur les gains.

Extrêmement rare — à vérifier si le contrat est très ancien.

## Stratégies courantes

### 1. Rachats après 8 ans optimisés

Fractionner les rachats pour rester dans l'abattement annuel (9 200 € couple).

Exemple : besoin de 50 000 € sur 5 ans → 10 000 € par an optimise l'abattement (si gains ≤ abattement par rachat).

### 2. Arbitrage UC vs fonds €

- Fonds € : rendement faible mais sécurité + PS au fil de l'eau (CSG/CRDS en année N sur les intérêts crédités)
- UC : rendement potentiel + PS uniquement au rachat (pas au fil de l'eau)

### 3. Ouvrir un contrat tôt pour prendre date

L'ancienneté compte. Un contrat ouvert avec 100 € prend date → 8 ans plus tard, l'abattement est disponible.

## Déclaration

### Rachats PEA

- Retrait ou rachat **avant 5 ans**, avec clôture ou sans clôture (licenciement, invalidité, retraite anticipée) : gain net en case **3VT** de la 2042 C (« Gain sur retrait ou rachat du PEA ou du PEA-PME avant expiration de la 5e année ») ; retrait pour création d'entreprise exonéré d'IR : rien en 3VT
- **Après 5 ans** : rien à déclarer, PS prélevés par l'établissement

### Rachats AV (2042 millésime 2026, cadre 2)

- Produits des primes versées **avant le 27/09/2017**, contrat ≥ 8 ans : 2DH (produits soumis au prélèvement libératoire), 2CH (autres produits, imposés au barème)
- Produits des primes versées **depuis le 27/09/2017**, contrat ≥ 8 ans : **2VV** (fraction imposable à 7,5 %, primes ≤ 150 000 €) et **2WW** (fraction à 12,8 %, primes > 150 000 €)
- Contrat < 8 ans : primes versées avant le 27/09/2017 en 2XX (produits soumis au prélèvement libératoire) ou 2YY (autres produits) ; primes versées depuis le 27/09/2017 en 2ZZ (2042 millésime 2026 ; vérifier l'IFU de l'assureur)
- **2CG et 2BH ne déclarent pas le gain** : elles signalent les revenus déjà soumis aux prélèvements sociaux par l'assureur (2CG sans CSG déductible, 2BH avec CSG déductible si option barème), pour éviter une seconde perception des PS
- Attestation annuelle (IFU) de l'assureur requise

## Pièges fréquents

1. **Oublier la proportionnalité** → surévaluer ce qu'on peut retirer "sans impôt"
2. **8 ans du versement** au lieu du contrat → mauvais calcul
3. **Seuil 150 000 €** : personnel (par bénéficiaire, pas par foyer ni par contrat), apprécié sur les primes non remboursées au 31/12 N-1, tous contrats du bénéficiaire confondus
4. **Option barème globale** : elle engage tous les revenus du capital de l'année (plus irrévocable depuis la LFI 2026)
5. **Retrait PEA avant 5 ans** pour un petit besoin → clôture automatique (sauf les deux cas d'exception, aux effets différents)
6. **PEA composé d'actions non éligibles** → régularisation DGFIP possible

## Références CGI / BOFiP

- PEA : art. 163 quinquies D CGI, art. L. 221-30 Code monétaire et financier
- Assurance-vie fiscalité rachats : art. 125-0 A CGI
- Abattement annuel AV : art. 125-0 A-I-2° CGI
- Seuil 150 000 € : art. 200 A, 1-B-2° CGI (renvoi au b du 2 du II de l'art. 125-0 A)
- PEA-PME : art. L. 221-32-1 CMF
- BOFiP : BOI-RPPM-RCM-40-50 et BOI-ANNX-000072 (PEA, tableau des retraits), BOI-RPPM-RCM-20-10-20-50 et BOI-RPPM-RCM-20-15 (AV, seuil de 150 000 €)
