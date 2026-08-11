# PEA et Assurance-Vie (fiscalité des rachats)

Voir `data/pea-assurance-vie.json` pour les taux et seuils.

> **Note** : la fiscalité de la transmission de l'assurance-vie (au décès) est couverte par le skill `notaire`. Ce document ne couvre que la fiscalité des rachats de vivant.

## PEA (Plan d'Épargne en Actions)

### Plafonds de versement

| Plan | Plafond |
|------|---------|
| PEA classique | 150 000 € |
| PEA-PME | Variable (à vérifier) — plafond combiné avec PEA ≤ 225 000 € |
| PEA jeune (enfant majeur rattaché) | 20 000 € |

Les plafonds concernent les **versements**, pas la valeur du plan. Un plan peut dépasser 150 000 € de valorisation grâce aux gains.

### Fiscalité selon ancienneté du plan

#### Avant 5 ans

- **Tout retrait entraîne la clôture** du plan
- Imposition des gains au **PFU 30%** (ou barème sur option globale)

**Exceptions** (clôture sans pénalité) :
- Licenciement, invalidité, mise à la retraite
- Création/reprise d'entreprise (réinvestissement dans les 3 mois)

#### Après 5 ans

- **Retraits libres** sans clôture du plan
- **EXONÉRATION TOTALE d'IR** sur les gains
- **Prélèvements sociaux** dus sur les gains à chaque retrait, au taux applicable à la date du retrait :
  - **Retraits avant le 01/01/2026** : 17,2 %
  - **Retraits à partir du 01/01/2026** : **18,6 %** (LFSS 2026, art. 12, modifiant L. 136-7 CSS) — applicable sur la **totalité du gain au retrait**, y compris la fraction acquise avant 2026
- Référence : les gains PEA sont qualifiés de "produits de placement" (PS prélevés à la source au moment du retrait), pas de "revenus du patrimoine"

### Taux historiques PS

Les gains acquis avant certaines dates peuvent bénéficier de taux PS historiques plus faibles (par couches, selon l'historique des taux). Point technique rarement exploité manuellement — le PEA applique automatiquement la règle.

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

**Règle** : PFU 30% sur les gains, avec modulation selon encours et ancienneté.

| Situation | Taux |
|-----------|------|
| Contrat < 8 ans | PFU 30% (12,8% IR + 17,2% PS) |
| Contrat ≥ 8 ans, encours < 150 000 € | PFU 24,7% (7,5% IR + 17,2% PS) après abattement |
| Contrat ≥ 8 ans, encours ≥ 150 000 € | PFU 30% sur la fraction au-delà de 150 000 € de **versements nets** |

**Seuil 150 000 €** : s'apprécie sur l'ensemble des contrats AV du foyer, au moment du rachat.

### Option barème

**Avantageuse si TMI ≤ 11%** — le barème peut être meilleur que le PFU après 8 ans (car taux IR faible).

Option **globale** et irrévocable pour l'année.

**Important** : l'abattement annuel (4 600 EUR / 9 200 EUR après 8 ans) s'applique **aussi bien au PFU qu'au barème** — ce n'est pas un avantage propre à l'option barème. La comparaison PFU vs barème se fait donc à abattement égal : seul le taux d'IR marginal diffère (7,5% sous PFU vs TMI sous barème).

### Contrats très anciens (avant 1983)

Régime de faveur pour les contrats souscrits **avant le 1er janvier 1983** : exonération totale d'IR sur les gains.

Extrêmement rare — à vérifier si le contrat est très ancien.

## PV Latentes au Décès — Fiscalité Spécifique

> **Périmètre** : ce qui suit concerne la fiscalité au décès de l'assuré. La transmission successorale AV (990 I / 757 B) est couverte par le skill `notaire`.

**Le décès n'est pas un fait générateur de l'IR.** Les gains non réalisés au moment du décès ne sont jamais soumis à la fiscalité des rachats au titre de l'IR — mais, pour les UC, les **prélèvements sociaux restent dus** (voir ci-dessous).

| Support | Sort des gains latents au décès |
|---------|----------------------------------|
| Unités de compte (UC) | **IR** définitivement exonéré (le décès n'est pas un rachat) — mais **PS dus** sur les gains constatés au dénouement, nets des PS déjà acquittés le cas échéant |
| Fonds en euros | PS déjà prélevés annuellement (au fil de l'eau) ; IR jamais dû (pas de rachat) |

**Attention — piège fréquent : les PV latentes en UC ne sont PAS exonérées de prélèvements sociaux au décès.** Depuis la LFSS 2010 (art. L136-7 II 3° CSS), l'assureur prélève les PS sur les gains constatés en UC lors du dénouement par décès et les déduit du capital avant versement aux bénéficiaires. Le Conseil d'État a confirmé la validité de ce mécanisme (CE 18/02/2026, n° 504077). **Seul l'IR est définitivement évité — pas les PS.**

**Conséquence** : un contrat AV avec 300 000 EUR de PV latentes en UC transmet ces gains sans IR (12,8%), mais l'assureur prélève environ 51 600 EUR de PS (17,2%) avant versement du capital aux bénéficiaires. La fiscalité successorale (990 I ou 757 B) s'applique ensuite sur le capital net de ces PS.

Point souvent mal compris : **seul l'IR est purgé au décès sur les PV latentes en UC — les PS restent dus**. C'est différent des fonds en euros, où les PS ont déjà été prélevés au fil de l'eau (rien à prélever de plus au décès), et différent aussi du régime des cryptoactifs (voir `crypto.md`), où IR et PS sont tous deux purgés au décès — ne pas transposer ce raisonnement à l'assurance-vie en UC.

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

- Pas de déclaration spécifique tant que le plan n'est pas clôturé
- À la clôture : 2042 case 3VT (gains PEA imposables)
- PS prélevés par l'établissement

### Rachats AV

- 2042 case 2CG (gains imposables au PFU)
- 2042 case 2BH (gains imposables au barème si option)
- Attestation annuelle de l'assureur requise

## Pièges fréquents

1. **Oublier la proportionnalité** → surévaluer ce qu'on peut retirer "sans impôt"
2. **8 ans du versement** au lieu du contrat → mauvais calcul
3. **Seuil 150 000 € en global** (tous contrats AV du foyer), pas par contrat
4. **Option barème irrévocable** pour l'année
5. **Retrait PEA avant 5 ans** pour un petit besoin → clôture automatique
6. **PEA composé d'actions non éligibles** → régularisation DGFIP possible

## Références CGI / BOFiP

- PEA : art. 163 quinquies D CGI, art. L. 221-30 Code monétaire et financier
- Assurance-vie fiscalité rachats : art. 125-0 A CGI
- Abattement annuel AV : art. 125-0 A-I-2° CGI
- Seuil 150 000 € : art. 125-0 A-I-2° bis CGI
- BOFiP : BOI-RPPM-RCM-40-50 (PEA) et BOI-RPPM-RCM-20-10-20-50 (AV)
