# Revenus du capital (RCM, dividendes, plus-values mobilières)

## PFU vs barème : l'arbitrage fondamental

Les revenus mobiliers (dividendes, intérêts, plus-values de titres) sont soumis au choix :

| Régime | Taux 2025 | Caractéristiques |
|--------|-----------|------------------|
| **PFU (flat tax)** | **30 % pour dividendes / intérêts ; 31,4 % pour PV mobilières et crypto** (voir tableau ci-dessous) | Par défaut. Pas d'abattement. Pas de CSG déductible. |
| **Barème progressif** | Selon TMI | Sur option **globale** (tous les revenus du capital de l'année). Abattement 40% sur dividendes. CSG déductible 6,8% en N+1. |

### Taux PS différenciés (LFSS 2026)

La LFSS 2026 (loi n° 2025-1403 du 30/12/2025, art. 12) modifie le taux de CSG (9,2 % → 10,6 %, soit total PS 17,2 % → 18,6 %) avec **deux dates d'entrée en vigueur distinctes** :

| Catégorie | PS revenus 2025 | PS revenus 2026+ | Base CSS |
|---|---|---|---|
| Revenus du patrimoine (PV mobilières, crypto, LMNP) | **18,6 %** | 18,6 % | L. 136-6 |
| Produits de placement (dividendes, intérêts, PEA à la sortie, PER) | 17,2 % | **18,6 % à partir du 01/01/2026** | L. 136-7 |
| AV, foncier nu, SCPI, PEL/CEL anciens, livrets réglementés | 17,2 % | 17,2 % (inchangé) | n/a |

Voir `data/pfu-prelevements-sociaux.json` pour les taux exacts.

### Règles d'orientation rapide

| TMI | Recommandation | Raison |
|-----|---------------|--------|
| 0% ou 11% | Barème | Tranche basse + abattement 40% dividendes + CSG déductible |
| 30% | À chiffrer | Selon composition : dividendes (abattement 40%) vs intérêts/PV (pas d'abattement) |
| 41% ou 45% | PFU | Flat tax 12,8% < TMI 41%/45% |

**Règle absolue** : l'option barème est **globale et irrévocable pour l'année**. Elle engage TOUS les revenus du capital du foyer. Ne jamais recommander sans avoir vérifié la composition complète.

### Exemple de calcul comparatif

Foyer célibataire, TMI 30%, **dividendes 10 000 € encaissés en 2025** :

**Sous PFU** (dividende = produit de placement, PS 17,2 % en 2025) :
- IR : 10 000 × 12,8% = 1 280 €
- PS : 10 000 × 17,2% = 1 720 €
- Total : 3 000 €

**Sous barème** :
- Assiette IR : 10 000 × (1 − 0,40) = 6 000 €
- IR : 6 000 × 30% = 1 800 €
- PS : 10 000 × 17,2% = 1 720 €
- CSG déductible N+1 : 10 000 × 6,8% × 30% (économie) = 204 € (N+1)
- Total net : 3 520 − 204 = **3 316 €**

→ Ici, PFU avantageux (3 000 € < 3 316 €) malgré l'abattement 40%.

Mais si le même foyer a aussi **5 000 € de PV mobilière réalisée en 2025** (revenu du patrimoine, PS 18,6 %) :
- PFU : 5 000 × 31,4 % = 1 570 €
- Barème : 5 000 × 30% IR + 5 000 × 18,6% PS = 2 430 €
- → PFU toujours plus favorable, mais l'écart se resserre

**Attention** : à partir des revenus 2026, le dividende passera aussi à 18,6 % PS (PFU effectif 31,4 %).

## Types de revenus du capital

### Dividendes (case 2DC)

- Par défaut : PFU 30 % en 2025 (12,8 % IR + 17,2 % PS), passe à 31,4 % à compter des dividendes encaissés en 2026
- Option barème : abattement 40 % puis IR barème + PS (17,2 % en 2025, 18,6 % à partir de 2026)
- **Dividendes étrangers** : peuvent avoir été soumis à une retenue à la source dans le pays d'origine — crédit d'impôt possible sous convention fiscale

### Intérêts, RCM (case 2TR)

- Obligations, crowdfunding immobilier (intérêts), livrets fiscalisés, comptes à terme
- Soumis au PFU par défaut ou barème sur option
- **Pas d'abattement** — contrairement aux dividendes
- **Crowdfunding immobilier** : imposé comme RCM, pas comme revenus fonciers, même si sous-jacent immobilier
- **Livrets réglementés** (Livret A, LDDS, LEP) : exonérés d'IR et de PS → à ne pas confondre

### Plus-values mobilières (case 3VG)

- Gain net de cession de titres (actions, parts sociales, OPC)
- PFU par défaut ou barème sur option
- Voir `data/plus-values-mobilieres-crypto.json` pour détails
- **Abattements durée de détention** : uniquement pour titres acquis **avant 2018** ET option barème
- **Abattement dirigeant retraite** : 500 000 € forfaitaires sous conditions strictes (cession de titres, départ en retraite)

### Crypto-actifs

Régime distinct : méthode PAMC (prix acquisition moyen pondéré) sur l'ensemble du portefeuille, formulaire 2086, seuil d'exonération cessions < 305 €/an. Détail dans la section crypto listée depuis SKILL.md.

## Prélèvements sociaux : couche distincte de l'IR

**À ne jamais confondre avec l'IR.** Les PS sont prélevés en plus sur la quasi-totalité des revenus du capital.

- Composition : CSG + CRDS + prélèvement de solidarité
- Taux différencié depuis la LFSS 2026 (voir table en haut du document) : 18,6 % pour les revenus du patrimoine dès 2025, 17,2 % puis 18,6 % au 01/01/2026 pour les produits de placement, 17,2 % inchangé pour AV/foncier nu/SCPI/PEL-CEL anciens
- **Sous PFU** : PS inclus dans le taux global (30 % ou 31,4 % selon la nature du revenu)
- **Sous barème** : PS séparés de l'IR (mais CSG 6,8 % déductible en N+1)

**Cas restant à 17,2 % de manière permanente** (exclus de la hausse LFSS 2026) :
- Assurance-vie et contrats de capitalisation
- Revenus fonciers (foncier nu, SCPI)
- CEL/PEL ouverts avant le 31/12/2017
- PEP
- Livrets réglementés (Livret A, LDDS, LEP : totalement exonérés)

### CSG déductible

- Montant : 6,8% de la base
- **Condition** : uniquement sous option barème progressif
- **Zéro déductible sous PFU**
- Imputée en N+1 sur le RNI → économie = CSG déductible × TMI N+1

## Enveloppes fiscales spécifiques

**PEA** : exonération IR après 5 ans. PS dus à chaque retrait : **17,2 % pour les retraits effectués avant le 01/01/2026**, **18,6 % à partir du 01/01/2026** (sur la totalité du gain, y compris la fraction acquise avant cette date). Cf. art. L. 136-7 CSS.

**AV** : abattement annuel après 8 ans, fiscalité selon date des versements. PS **17,2 % inchangés** (cas exclu de la hausse LFSS 2026).

Règles complètes (retrait avant/après 5 ans PEA, abattements AV par tranche de versement, 152 500 € succession AV) dans la section PEA/AV listée depuis SKILL.md.

## Pièges fréquents

1. **Confondre IR et PS** dans une simulation — conduit à sous-estimer la charge d'environ 17 points.
2. **Oublier l'option barème globale** — choisir le barème pour les dividendes implique le barème aussi pour les intérêts et PV mobilières.
3. **CSG déductible sous PFU** — elle n'existe pas.
4. **Abattement 40% sous PFU** — n'existe que sous barème.
5. **Retenue à la source étrangère** — créditer contre l'IR français (conventions fiscales) — à ne pas oublier.

## Références CGI / BOFiP / CSS

- PFU : art. 200 A CGI
- Option barème : art. 200 A-2 CGI
- Abattement dividendes 40% : art. 158-3° CGI
- Plus-values mobilières : art. 150-0 A à 150-0 D CGI
- Prélèvements sociaux : art. L. 136-1 et s. CSS
- Différenciation revenus du patrimoine vs produits de placement : art. L. 136-6 et L. 136-7 CSS
- LFSS 2026 (hausse CSG) : loi n° 2025-1403 du 30/12/2025, art. 12 (modifie L. 136-8 CSS)
- BOFiP : BOI-RPPM-RCM (dividendes/RCM) et BOI-RPPM-PVBMI (PV mobilières)
