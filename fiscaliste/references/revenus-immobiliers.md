# Revenus immobiliers (IPP belge)

<!-- last_updated: 2026-05-15 -->

Base légale : art. 7 à 16 CIR 92 (revenus immobiliers), art. 90, 8° et 90, 10° CIR 92 (plus-values immobilières).
Voir `data/revenus-immobiliers-be.json` pour les paramètres et coefficients.

> **Note** : en Belgique, il n'existe PAS de régime LMNP/LMP (loueur meublé non professionnel/professionnel). La location meublée ou non meublée relève du même régime de revenu cadastral pour les particuliers (à usage privé). Ce document couvre le régime belge des revenus immobiliers pour les particuliers.

## Principe fondamental : le revenu cadastral (RC)

En Belgique, les **revenus immobiliers** des particuliers ne sont généralement **pas imposés sur les loyers réels** perçus, mais sur une base forfaitaire : le **revenu cadastral (RC)**.

Le RC est une valeur locative nette forfaitaire fixée par l'administration (SPF Finances — AGDP), indexée annuellement. Il représente le revenu fictif que le bien pourrait générer en location en 1975 (valeur de base), réactualisé par un coefficient d'indexation.

**Coefficient d'indexation 2025** : **2,1763** (à vérifier chaque année via Fisconetplus).

## Catégories de revenus immobiliers

### 1. Habitation propre — exonération

L'**habitation propre** du contribuable (la résidence dans laquelle il habite effectivement) est **exonérée d'IPP fédéral** depuis l'exercice d'imposition 2015 (art. 12 §3 CIR 92). La compétence fiscale a été transférée aux régions, qui accordent des avantages spécifiques (chèque-habitat wallon, réduction flamande, etc.).

**Conséquence** : le RC de l'habitation propre n'est plus à déclarer en IPP fédéral.

### 2. Immeuble non donné en location — base RC indexé

Pour les **immeubles bâtis non loués** (résidence secondaire, bien vacant), la base imposable est :

```
Base imposable = RC indexé × 1,40
```

- RC indexé = RC cadastral de base × coefficient d'indexation (2,1763 en 2025)
- Majoration de 40 % pour la mise à disposition fictive

**Exemple** : RC non indexé = 500 € → RC indexé = 500 × 2,1763 = 1 088 € → Base imposable = 1 088 × 1,40 = **1 523 €**

**Terrains non bâtis** non loués : base = RC indexé (sans majoration × 1,40).

**Base légale** : art. 7 §1, 1° et art. 13 CIR 92.

### 3. Immeuble loué à usage privé (particulier locataire)

Pour les **immeubles loués à des personnes physiques pour usage d'habitation** (non affectés à l'activité professionnelle du locataire) :

```
Base imposable = RC indexé × 1,40
```

Même formule que le bien non loué — le loyer réel **n'est pas pris en compte** si le locataire utilise le bien à titre privé.

**Conséquence** : si le loyer réel est élevé, le propriétaire est imposé sur une base forfaitaire souvent inférieure aux loyers effectivement perçus → avantage fiscal réel pour les bailleurs.

**Base légale** : art. 7 §1, 2°, a) CIR 92.

### 4. Immeuble loué à usage professionnel (locataire professionnel)

Si le locataire est une **société, un indépendant ou une profession libérale** et utilise le bien pour son activité professionnelle, les loyers réels sont imposés :

```
Base imposable = loyers bruts + avantages locatifs − forfait déductible de 40 %
```

- **Forfait déductible** : 40 % des loyers et avantages locatifs (entretien, frais propriétaire), plafonné à **2/3 du RC revalorisé** (RC × coefficient légal).
- Si les charges réelles du propriétaire dépassent ce forfait, pas de possibilité de déduire les charges réelles (système forfaitaire).

**Base légale** : art. 7 §1, 2°, b) et art. 13 CIR 92.

**Piège** : si un indépendant loue un bien à son propre nom à sa société (société dont il est dirigeant), l'administration peut requalifier la location en rémunération de dirigeant au-delà d'un certain seuil de loyer.

### 5. Terrains et immeubles non bâtis loués

- Loyers réels moins les impôts y afférents (précompte immobilier) : base imposable.
- Pas de forfait 40 % pour les terrains non bâtis.

## Précompte immobilier

Le **précompte immobilier (PI)** est un impôt régional calculé sur le RC indexé × coefficient PI. Il est dû par le propriétaire et n'est pas inclus dans la base IPP (il constitue une charge déductible pour les immeubles loués à usage professionnel — art. 14 CIR 92).

Ne pas confondre PI et IPP sur revenus immobiliers : deux impositions distinctes.

## Plus-values immobilières

### Habitation propre occupée depuis plus de 5 ans

**Exonérée** — aucune plus-value imposable (art. 90, 8° CIR 92).

### Terrains — vente dans les 8 ans de l'acquisition

Plus-value imposable au taux de **33 %** si le terrain est revendu dans les **8 ans** de son acquisition (art. 90, 8° CIR 92).

Si revendu après 8 ans : exonérée.

### Immeubles bâtis (hors habitation propre) — vente dans les 5 ans de l'acquisition

Plus-value imposable au taux de **16,5 %** si l'immeuble est revendu dans les **5 ans** (art. 90, 10° CIR 92).

Si revendu après 5 ans : exonérée.

### Plus-values spéculatives (33 %)

Si l'administration qualifie l'opération de **spéculative** (achat-revente rapide à profit, opérations répétées), la plus-value est imposable à **33 %** (art. 90, 1° CIR 92) quel que soit le délai.

**Indices de spéculation** : achats-reventes multiples et répétés, financement intégralement par emprunt, absence de projet de résidence, marge bénéficiaire élevée sur courte période.

### Absence d'abattements progressifs

**Il n'existe PAS en Belgique de système d'abattements progressifs** pour durée de détention comparable au régime français (où les abattements augmentent au fil des années). En Belgique, le principe est binaire : la plus-value est soit exonérée (délai écoulé), soit taxée au taux fixe.

### Calcul de la plus-value imposable

```
Plus-value = Prix de vente − (Prix d'acquisition + frais d'acquisition + dépenses d'amélioration)
```

- Prix d'acquisition : augmenté de 25 % forfaitairement (ou frais réels documentés si supérieurs).
- Dépenses d'amélioration : travaux de construction/rénovation prouvés par factures.

## Tableau récapitulatif

| Situation | Base imposable IPP | Taux PV immo |
|-----------|-------------------|-------------|
| Habitation propre (occupée) | Exonérée (fédéral) | Exonérée |
| Résidence secondaire / bien vacant | RC indexé × 1,40 | 16,5 % si cession < 5 ans |
| Bien loué à usage privé | RC indexé × 1,40 | 16,5 % si cession < 5 ans |
| Bien loué à usage professionnel | Loyers réels − 40 % forfait | 16,5 % si cession < 5 ans |
| Terrain non bâti (loué ou non) | RC indexé (ou loyers réels) | 33 % si cession < 8 ans |
| Plus-value spéculative | — | 33 % |
| Cession après délai (bâti 5 ans, terrain 8 ans) | — | Exonérée |

## Formulaires Tax-on-web

| Situation | Cadre Tax-on-web |
|-----------|----------------|
| Revenus immobiliers (RC) | Cadre III |
| Revenus locatifs à usage professionnel | Cadre III (loyers réels) |
| Plus-values immobilières imposables | Cadre XVI |

## Pièges fréquents

1. **Oublier de déclarer les revenus d'une résidence secondaire** : même non louée, le RC indexé × 1,40 est imposable.
2. **Confondre usage privé et professionnel du locataire** : le régime de la base imposable diffère totalement.
3. **Appliquer des abattements progressifs à la française** : ils n'existent pas en Belgique — le délai de détention fonctionne de manière binaire.
4. **Oublier le plafond du forfait 40 %** (plafonné à 2/3 du RC revalorisé) pour la location à usage professionnel.
5. **Négliger la requalification spéculative** pour les achats-reventes répétés.
6. **Confondre précompte immobilier et IPP immobilier** : deux impôts distincts — le PI ne libère pas de l'IPP.

## Références CIR 92 / Fisconetplus

| Règle | Article CIR 92 |
|-------|---------------|
| Définition revenus immobiliers | art. 7 à 11 |
| Exonération habitation propre | art. 12 §3 |
| Base RC indexé × 1,40 | art. 7 §1, 2°, a) |
| Location usage professionnel — loyers réels | art. 7 §1, 2°, b) |
| Forfait charges 40 % (locatif pro) | art. 13 |
| Précompte immobilier déductible | art. 14 |
| Plus-values bâtis (16,5 %) | art. 90, 10° |
| Plus-values terrains (33 %) | art. 90, 8° |
| Plus-values spéculatives (33 %) | art. 90, 1° |

Source : Fisconetplus.be — https://www.fisconetplus.be
SPF Finances : https://finances.belgium.be/fr/particuliers/habitation
