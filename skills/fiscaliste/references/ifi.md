# IFI (Impôt sur la Fortune Immobilière)

Voir `data/ifi-bareme.json` pour les tranches et paramètres.

## Principe

Impôt annuel sur le patrimoine **immobilier net** du foyer fiscal au **1er janvier**.

**Condition d'assujettissement** : patrimoine immobilier net > 1 300 000 €.

**Particularité** : une fois le seuil franchi, le barème s'applique à partir de **800 000 €** (pas à partir de 1 300 000 €). Mécanisme de décote entre 1 300 000 € et 1 400 000 € pour lisser l'entrée.

## Assiette taxable

### Actif immobilier (à inclure)

- Biens immobiliers détenus directement (résidences, locatifs, terrains)
- Parts de sociétés civiles (SCI, SCPI) à hauteur de la fraction immobilière
- Parts de SCPI en direct ou via assurance-vie (fraction immobilière)
- Immeubles affectés à l'activité professionnelle **du foyer** s'ils ne constituent pas l'outil de travail
- Droits démembrés (usufruit ou pleine propriété, selon le cas)

### Exonérations principales

| Bien | Régime |
|------|--------|
| Résidence principale | **Abattement 30%** sur la valeur vénale |
| Biens professionnels | Exonération totale si outil de travail (conditions strictes) |
| Bois, forêts, parts GFA | Exonération partielle (25% imposable) sous engagement 30 ans |
| LMP | Exonéré comme bien professionnel sous conditions de recettes et de revenus |
| Location longue durée bail rural | Exonération partielle sous conditions |

**Conditions "biens professionnels"** (article 885 O bis CGI) :
- Fonction de direction effective
- Rémunération > 50% des revenus professionnels du foyer
- Détention > seuil minimum de participation

## Passif déductible

### Dettes déductibles

- Emprunts immobiliers (capital restant dû au 1er janvier)
- Dettes liées à travaux sur immeubles taxables
- Impôts afférents à l'immobilier : taxe foncière, IFI N-1, droits de succession/donation

### Dettes NON déductibles

- Dettes personnelles non liées à l'immobilier
- Emprunts in fine → **amortissement fictif** appliqué (déduction limitée selon un calendrier théorique)
- Emprunts familiaux sans formalisme (acte non enregistré, pas d'intérêt réel) — article 885 T bis CGI

### Plafonnement du passif

Si le passif total dépasse 60% de la valeur des biens ET > 5 M€, la fraction au-delà n'est déductible qu'à hauteur de 50%.

## Calcul du barème

Voir `data/ifi-bareme.json` → `tranches`.

| Tranche patrimoine net | Taux |
|------------------------|------|
| 0 à 800 000 € | 0% |
| 800 000 à 1 300 000 € | 0,5% |
| 1 300 000 à 2 570 000 € | 0,7% |
| 2 570 000 à 5 000 000 € | 1,0% |
| 5 000 000 à 10 000 000 € | 1,25% |
| > 10 000 000 € | 1,5% |

### Décote d'entrée

Entre 1 300 000 € et 1 400 000 € : formule `17 500 − 1,25% × valeur_patrimoine_net`.

Évite un effet de seuil brutal à 1 300 000 €.

## Plafonnement global IR + IFI + PS

**Règle des 75%** : le total IR + IFI + PS ne peut pas dépasser 75% des revenus de l'année N-1.

Si dépassement → l'IFI est **réduit de l'excédent**.

**Stratégie** : optimiser les revenus pris en compte (certains revenus exonérés ne comptent pas) pour maximiser le plafonnement.

## Évaluation des biens

### Résidence principale

Valeur vénale au 1er janvier, **moins abattement 30%**.

### Biens locatifs

Valeur vénale — possible décote pour location en cours (bail en place réduit la valeur marchande d'environ 10-20%).

### Parts de SCI / SCPI

Valeur des parts × fraction immobilière. Possible décote pour illiquidité.

### Biens démembrés

- **Usufruit** : valeur pleine propriété × quote-part de l'usufruit selon barème fiscal (article 669 CGI)
- **Nue-propriété** : pas d'IFI (sauf cas spécifiques : donation avec réserve d'usufruit, nue-propriété issue de démembrement fiscal → règles particulières)

**Exception art. 885 G CGI** : dans certains cas (démembrement volontaire ultérieur), l'usufruitier et le nu-propriétaire sont chacun imposables à hauteur de leur quote-part.

## Déclaration

- Déclaration 2042-IFI jointe à la 2042
- Annexes : 2042-IFI-K (évaluation des biens)
- Date limite : même que la déclaration IR

### Documents à préparer

- Évaluation de chaque bien (expertise, estimation, comparables DVF)
- Relevés bancaires emprunts au 1er janvier
- Attestations SCPI / SCI
- Tableau d'amortissement des emprunts in fine

## Pièges fréquents

1. **Oublier l'abattement 30% RP** — perte directe
2. **Inclure un LMP en patrimoine taxable** — alors qu'il peut être exonéré comme bien professionnel
3. **Emprunt in fine sans amortissement fictif** — redressement probable
4. **Évaluer la RP au prix d'achat** au lieu de la valeur vénale actuelle — source de sous-déclaration
5. **Omettre les SCPI en assurance-vie** — fraction immobilière imposable
6. **Oublier le plafonnement 75%** — l'IFI peut être réduit si revenus faibles par rapport au patrimoine

## Sanctions

- Défaut ou retard de déclaration : intérêts de retard 0,2%/mois + majoration 10% à 40% selon gravité
- Sous-évaluation > 10% : redressement + majoration 10%
- Manquement délibéré : majoration 40%
- Manœuvres frauduleuses : majoration 80%

**Délai de reprise** : 6 ans pour l'IFI (contre 3 ans pour l'IR dans certains cas).

## Références CGI / BOFiP

- Champ IFI : art. 964 à 983 CGI
- Résidence principale : art. 973-I CGI
- Biens professionnels : art. 975 CGI
- Passif déductible : art. 974 CGI
- Plafonnement : art. 979 CGI
- Barème : art. 977 CGI
- BOFiP : BOI-PAT-IFI
