# Mécanisme de l'Impôt des Personnes Physiques (IPP)

<!-- last_updated: 2026-05-15 -->

Base légale : Code des Impôts sur les Revenus 1992 (CIR 92), art. 1 à 178/1.
Source administrative : Fisconetplus.be — rubrique IPP.
Déclaration : Tax-on-web (formulaire IPP annuel).

## Séquence de calcul (à dérouler intégralement)

L'IPP ne s'applique pas directement au revenu brut. Il suit une séquence stricte :

```
1. Revenus bruts catégoriels
   ↓ déduction des frais professionnels (forfait ou réels)
2. Revenus nets catégoriels
   ↓ somme
3. Somme des revenus nets
   ↓ déductions (pensions alimentaires 80%, épargne-pension, ELT)
4. Revenu imposable
   ↓ quotités exemptées (base 10 910 € + suppléments enfants)
5. Revenu taxable (= imposable − quotités exemptées)
   ↓ application du barème progressif par tranches
6. Impôt de base (sur tranche taxable)
   ↓ − réductions d'impôt fédérales (dons 45%, frais garde 45%...)
7. IPP fédéral après réductions
   ↓ + additionnels communaux (6% à 9% selon commune)
8. IPP total dû
   ↓ − précompte professionnel déjà retenu par l'employeur
= Solde à payer ou à rembourser
```

**Ne jamais sauter d'étape.** Chaque intermédiaire doit être chiffré.

## Barème progressif IPP (revenus 2025)

Voir `data/bareme-ipp-2025.json` → `tranches`.

| Tranche de revenu net imposable | Taux |
|---------------------------------|------|
| 0 à 15 820 € | 25 % |
| 15 820 à 27 920 € | 40 % |
| 27 920 à 48 320 € | 45 % |
| Au-delà de 48 320 € | 50 % |

**Base légale** : art. 130 CIR 92.

Le barème s'applique sur la fraction **taxable** du revenu, soit le revenu imposable diminué des quotités exemptées (voir ci-dessous).

## Frais professionnels par catégorie

| Catégorie | Forfait | Plafond forfait (revenus 2025) |
|-----------|---------|-----------------|
| Salariés | 30 % | 5 930 € |
| Pensionnés | 3 % | — | 2 890 € |
| Dirigeants d'entreprise | 3 % | — | 2 890 € |
| Indépendants | Frais réels uniquement | — | — |

**Base légale** : art. 51 et 66 à 89 CIR 92.

**Option frais réels** : le contribuable peut toujours déclarer ses frais réels et documentés à la place du forfait, si ceux-ci dépassent le forfait.

**Point critique — terminologie** :

| Terme | Source | Valeur |
|-------|--------|--------|
| Salaire brut imposable | Fiche de paie | Avant cotisations ONSS |
| Salaire net après ONSS | Fiche de paie | Après cotisations salariales |
| **Revenu net imposable (case 250)** | **Fiche fiscale 281.10** | **Après cotisations ONSS — base de déclaration** |
| Revenu après forfait frais | Tax-on-web | Case 250 × 0,70 (en dessous du plafond) |

**Règle** : utiliser la valeur de la **fiche fiscale 281.10** (case 250 ou case de rémunération correspondante). Si l'utilisateur donne le salaire brut, soustraire les cotisations ONSS salariales (~13,07 %) avant d'appliquer le forfait frais.

## Quotités exemptées

Les quotités exemptées réduisent la base taxable. Elles ne sont PAS un diviseur (pas de quotient familial à la française) — ce sont des montants fixes qui s'appliquent à la tranche basse du barème (25 %).

**Base légale** : art. 131 à 134 CIR 92.

Voir `data/bareme-ipp-2025.json` → `quotites_exemptees`.

### Quotité de base

| Situation | Montant exempté |
|-----------|----------------|
| Tout contribuable | 10 910 € |

### Suppléments pour enfants à charge

| Nombre d'enfants à charge | Supplément cumulé (total exemption enfants) |
|---------------------------|---------------------------------------------|
| 1 enfant | + 1 690 € |
| 2 enfants | + 4 340 € |
| 3 enfants | + 9 770 € |
| 4 enfants | + 15 820 € |
| Par enfant supplémentaire (5e, 6e…) | + 6 050 € par enfant |

**Enfants handicapés** : comptent pour 2 enfants (art. 132, al. 1er, 3° CIR 92).

**Enfants en garde alternée** : répartition par moitié entre les deux parents (art. 132bis CIR 92).

### Autres suppléments

| Situation | Supplément |
|-----------|-----------|
| Contribuable handicapé | + 1 690 € |
| Enfant de moins de 3 ans sans déduction frais garde | + 590 € |
| Personne à charge autre qu'enfant (ascendant, collatéral dans le besoin) | + 1 690 € |

### Mécanique d'application

La quotité exemptée s'applique à la **tranche basse** (25 %) :

```
Économie d'impôt = quotité exemptée × 25 %
```

Exemple : contribuable avec 2 enfants → exemption totale = 10 910 + 4 340 = 15 250 € → économie = 15 250 × 25 % = **3 812,50 €**.

Si la quotité exemptée excède l'impôt dû (revenus faibles), la fraction excédentaire liée aux enfants est **partiellement remboursable** (crédit d'impôt — art. 134 §2 CIR 92).

## Quotient conjugal (art. 87 CIR 92)

Le quotient conjugal **n'est pas** le quotient familial français. Il s'agit d'un **transfert de revenus** entre époux/cohabitants légaux, pas d'un diviseur.

**Condition** : un des conjoints a des revenus professionnels nets inférieurs à 30 % de la somme des revenus professionnels nets du ménage.

**Mécanisme** : transfert automatique d'une fraction des revenus du conjoint le mieux rémunéré vers le conjoint à faibles revenus, jusqu'à concurrence de **30 %** des revenus professionnels nets du ménage.

**Plafond** : le transfert ne peut pas dépasser **13 490 €** par an (revenus 2025 ; plafond non indexé, dispositif supprimé progressivement dès l'exercice 2027).

**Effet** : lisse les taux marginaux entre conjoints, réduisant la charge fiscale globale du ménage. Ne s'applique que si la taxation commune est plus favorable.

**Base légale** : art. 87 CIR 92.

## Additionnels communaux

Les communes peuvent lever un additionnel à l'IPP (centimes additionnels). Taux variant généralement entre **6 % et 9 %** de l'IPP de base selon la commune.

**Calcul** :
```
Additionnels = IPP fédéral (après réductions) × taux communal
```

**Exemples** : Bruxelles-Ville 7,99 %, Ixelles 8,67 %, Anvers 8,5 % — à vérifier pour chaque commune via Tax-on-web.

Les additionnels communaux sont calculés et prélevés automatiquement par l'administration fédérale (SPF Finances / AGFisc) et redistribués aux communes.

## Précompte professionnel (PP)

Le PP est retenu à la source par l'employeur sur chaque paie. **Différence fondamentale avec le PAS français** : en Belgique, le PP est **définitif** pour la grande majorité des contribuables (salariés avec revenus simples). Le PP n'est pas un simple acompte — il constitue le paiement complet pour les cas standard.

La déclaration Tax-on-web permet de vérifier et régulariser, mais pour les ménages à revenus simples, le précompte prélevé par l'employeur suffit sans régularisation.

Voir `references/precompte-professionnel.md` pour le détail du mécanisme.

## Revenus exceptionnels : quotient (art. 171 CIR 92)

Lissage fiscal pour éviter qu'un revenu ponctuel (indemnité de départ, prime exceptionnelle, revenus arriérés) ne fasse franchir artificiellement des tranches supérieures.

**Mécanisme** :
```
Impôt_supplémentaire = [IPP(revenu_ordinaire + revenu_exceptionnel / 4) − IPP(revenu_ordinaire)] × 4
```

**Revenus éligibles** : indemnités de départ, arriérés de salaire, revenu de remplacement en capital, bénéfice ou profit de cessation d'activité.

**Base légale** : art. 171 CIR 92.

## Exemple de calcul complet

**Cas** : salarié célibataire sans enfant, revenu net imposable (case 250) = 40 000 €, commune à 7 % d'additionnels.

```
1. Revenu brut net catégoriel (case 250) = 40 000 €
2. Frais professionnels (forfait 30%, plafond 5 930 €) = 5 930 €
3. Revenu professionnel net = 40 000 − 5 930 = 34 070 €
4. Déductions = 0 (aucune pension alim., pas d'épargne-pension)
5. Revenu imposable = 34 070 €
6. Quotité exemptée = 10 910 €
7. Revenu taxable = 34 070 − 10 910 = 23 160 €

Barème :
   - 0 à 15 820 € : 15 820 × 25 % = 3 955 €
   - 15 820 à 23 160 € : 7 340 × 40 % = 2 936 €
   - Total impôt de base = 6 891 €

8. Réductions d'impôt fédérales = 0
9. IPP fédéral = 7 191 €
10. Additionnels communaux (7 %) = 7 191 × 7 % = 503,37 €
11. IPP total = 7 191 + 503,37 = 7 694,37 €
    − PP retenu par l'employeur (estimé)
    = solde à payer ou à rembourser
```

## Références CIR 92 / Fisconetplus

| Règle | Article CIR 92 |
|-------|---------------|
| Barème progressif | art. 130 |
| Quotités exemptées de base | art. 131 |
| Suppléments enfants à charge | art. 132 |
| Enfants handicapés (double comptage) | art. 132, al. 1, 3° |
| Enfants garde alternée | art. 132bis |
| Crédit d'impôt quotités excédentaires | art. 134 §2 |
| Quotient conjugal | art. 87 |
| Frais professionnels forfait | art. 51 |
| Revenus exceptionnels (quotient) | art. 171 |
| Réductions d'impôt fédérales | art. 145¹ et s. |
| Précompte professionnel | art. 270 à 275 |

Source : Fisconetplus.be — https://www.fisconetplus.be
