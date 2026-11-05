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
| Locaux loués meublés (LMP) | Exonérés sous des critères propres à l'IFI (art. 975, V, 1°) : recettes > 23 000 €, bénéfice commercial net (après amortissements) > 50 % des revenus nets d'activité du foyer (ce bénéfice compris), et profession principale, en général exclue pour un salarié à plein temps (BOI-PAT-IFI-30-10-10-10 § 60 ; BOI-PAT-IFI-30-10-10-30 § 20). Le statut LMP à l'IR ne suffit pas |
| Location longue durée bail rural | Exonération partielle sous conditions |

**Conditions "actifs professionnels"** (art. 975 CGI ; brochure IR 2026, IFI) :
- Entreprise individuelle : activité industrielle, commerciale, artisanale, agricole ou libérale exercée à titre de profession principale par le propriétaire ou un membre du foyer, biens nécessaires à cette profession
- Société : activité professionnelle principale exercée dans la société ; pour une société à l'IS, fonction de direction, rémunération normale représentant plus de la moitié des revenus professionnels et détention d'au moins 25 % des droits de vote, avec des dérogations (BOI-PAT-IFI-30-10-30-20)

**Foyer IFI** : couple marié, pacsé ou concubins notoires et enfants mineurs ; un enfant majeur rattaché à l'IR forme son propre foyer IFI.

## Passif déductible

### Dettes déductibles

- Emprunts immobiliers (capital restant dû au 1er janvier)
- Dettes liées à travaux sur immeubles taxables
- Impositions dues à raison des biens au 1er janvier : taxes foncières de l'année, taxe sur les locaux vacants, droits de mutation à titre gratuit afférents à des actifs taxables, et **l'IFI théorique de l'année lui-même** (calculé sur le patrimoine net avant sa propre déduction, ligne 9GH de la 2042-IFI) ; l'IFI de l'année précédente, déjà payé, n'est plus une dette (art. 974, I, 4° CGI ; BOI-PAT-IFI-20-40-10)

### Dettes déductibles partiellement : prêts in fine et sans terme (art. 974, II CGI)

Pour un emprunt **in fine** contracté pour l'achat d'un bien imposable, le passif admis suit un **amortissement fictif** :

`passif admis = capital emprunté − capital × années écoulées depuis la souscription / durée totale (en années)`, soit `capital × années restantes / durée totale`.

Exemple : 300 000 € in fine sur 10 ans, 4 ans écoulés → 300 000 × 6 / 10 = 180 000 € déductibles (et non 300 000 €).

Pour un prêt **sans terme** : capital diminué de **1/20 par année écoulée** depuis la souscription.

### Dettes NON déductibles

- Dettes personnelles non liées à l'immobilier, dettes afférentes à des biens totalement exonérés
- Prêts familiaux (art. 974, III CGI) :
  - **exclus sans dérogation** s'ils viennent du redevable, de son conjoint, partenaire de PACS, concubin notoire ou de ses enfants mineurs (directement ou via une société interposée) ;
  - **déductibles** s'ils viennent d'un ascendant, d'un descendant (hors enfant mineur), d'un frère ou d'une sœur, ou d'une société que le redevable contrôle, seul ou conjointement avec son foyer fiscal ou son cercle familial (art. 150-0 B ter, III, 2° ; BOI-PAT-IFI-20-40-30 § 50), **à condition de justifier du caractère normal du prêt** (terme, échéances, montant, remboursements effectifs).

### Plafonnement du passif

Si la **valeur vénale du patrimoine taxable** dépasse 5 M€ **et** que les dettes dépassent 60 % de cette valeur, la fraction des dettes au-delà de ce seuil de 60 % n'est déductible qu'à hauteur de 50 %, sauf dettes dont le redevable justifie qu'elles n'ont pas un objectif principalement fiscal (art. 974 IV CGI). Exemple : patrimoine taxable de 6 M€, dettes de 4 M€ → 3,6 M€ déductibles en totalité + 50 % × 0,4 M€ = 3,8 M€.

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

**Règle des 75%** (art. 979 CGI) : le total IR + IFI + PS ne peut pas dépasser 75% des revenus de l'année N-1.

Si dépassement → l'IFI est **réduit de l'excédent** (ni imputable sur un autre impôt, ni restituable).

**Revenus pris en compte** : revenus mondiaux nets de frais professionnels de l'année précédente, **y compris les revenus exonérés d'IR et les produits soumis à un prélèvement libératoire** (art. 979 CGI ; brochure IR 2026, IFI). Les plus-values y sont retenues sans abattement ni exonération, celle de la résidence principale comprise, et les moins-values immobilières ne sont pas déduites ; n'y figurent pas les revenus des logements dont le propriétaire se réserve la jouissance (loyers fictifs de la résidence principale) et les gains non réalisés (BOI-PAT-IFI-40-30-10 § 160 à 190). Exemple : 75 000 € de revenus + 5 000 € de plus-value exonérée → seuil = 75 % × 80 000 = 60 000 €.

## Évaluation des biens

### Résidence principale

Valeur vénale au 1er janvier, **moins abattement 30%**.

### Biens locatifs

Valeur vénale — possible décote pour location en cours (bail en place réduit la valeur marchande d'environ 10-20%).

### Parts de SCI / SCPI

Valeur des parts × fraction immobilière. Possible décote pour illiquidité.

### Biens démembrés

- **Principe (art. 968 CGI)** : l'**usufruitier** (ou le titulaire d'un droit d'usage ou d'habitation accordé à titre personnel) **déclare la valeur en pleine propriété** du bien, quelle que soit la date du démembrement ; le nu-propriétaire ne déclare rien. Pas d'abattement pour démembrement.
- **Exceptions limitatives (art. 968, 1° à 3°)** — imposition répartie entre usufruitier et nu-propriétaire selon le barème de l'art. 669 :
  1. usufruit constitué en application des art. 757, 767, 1094 ou 1098 C. civ. (usufruit **légal** du conjoint survivant notamment). L'usufruit **conventionnel** (art. 1094-1 C. civ., donation entre époux) reste imposé en pleine propriété chez l'usufruitier ;
  2. **vente** de la nue-propriété avec réserve d'usufruit, si l'acquéreur n'est pas une personne visée à l'art. 751 CGI ;
  3. **donation ou legs** de la nue-propriété avec réserve d'usufruit à l'État, aux collectivités, à un établissement public ou à une association reconnue d'utilité publique.

## Déclaration

- Déclaration 2042-IFI (annexes 1 à 6), déposée avec la déclaration de revenus, case 0IF cochée sur la 2042 ; 2042-IFI-COV si aucune déclaration de revenus n'est déposée
- Date limite : même que la déclaration IR ; avis en août, paiement au 15 septembre

### Documents à préparer

- Évaluation de chaque bien (expertise, estimation, comparables DVF)
- Relevés bancaires emprunts au 1er janvier
- Attestations SCPI / SCI
- Tableau d'amortissement des emprunts in fine

## Pièges fréquents

1. **Oublier l'abattement 30% RP** — perte directe
2. **Exclure un bien LMP du patrimoine taxable** sans vérifier les critères propres à l'IFI (art. 975, V : bénéfice net > 50 % des revenus d'activité, profession principale) : risque de rappel
3. **Emprunt in fine sans amortissement fictif** (art. 974, II) — redressement probable
4. **Évaluer la RP au prix d'achat** au lieu de la valeur vénale actuelle — source de sous-déclaration
5. **Omettre les SCPI en assurance-vie** — fraction immobilière imposable
6. **Oublier le plafonnement 75%** — l'IFI peut être réduit si revenus faibles par rapport au patrimoine

## Sanctions

- Défaut ou retard de déclaration : intérêts de retard 0,2%/mois + majoration 10% à 40% selon gravité
- Sous-évaluation > 10% : redressement + majoration 10%
- Manquement délibéré : majoration 40%
- Manœuvres frauduleuses : majoration 80%

**Délai de reprise** : jusqu'au 31/12 de la **3e année** suivant celle de l'imposition lorsque la déclaration a été déposée et révèle suffisamment l'exigibilité (art. L 180 LPF) ; **6 ans** sinon, notamment en cas de défaut de déclaration (art. L 186 LPF).

## Références CGI / BOFiP

- Champ IFI : art. 964 à 983 CGI
- Résidence principale : art. 973-I CGI
- Biens professionnels : art. 975 CGI
- Passif déductible : art. 974 CGI
- Plafonnement : art. 979 CGI, BOI-PAT-IFI-40-30-10
- Barème : art. 977 CGI
- BOFiP : BOI-PAT-IFI
