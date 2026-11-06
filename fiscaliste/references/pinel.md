# Pinel : location, plafonds, prorogation et remise en cause

Ce fichier couvre les conditions à respecter **pendant** l'engagement de location d'un investissement Pinel (art. 199 novovicies CGI) : mise en location, plafonds de loyer et de ressources, prorogation, remise en cause et déclaration. Le dispositif est fermé aux investissements réalisés après le 31/12/2024, mais les engagements de location en cours (12 ans au plus avec les prorogations) restent soumis à ces conditions.

Les taux de réduction (initiaux et de prorogation) figurent dans `data/niches-fiscales.json` → `parametres_calcul_rici.pinel`. Le départ à l'étranger est traité dans [non-residents.md](non-residents.md) § 4.

Doctrine de référence : BOI-IR-RICI-360 (Duflot et Pinel), qui renvoie sur plusieurs points au BOI-IR-RICI-230 (Scellier).

## 1. Mise en location

| Condition | Règle | Source |
|---|---|---|
| Délai | Location nue dans les **12 mois** suivant l'achèvement, ou l'acquisition si elle est postérieure | BOI-IR-RICI-360-20-20 § 1 |
| Durée | 6 ou 9 ans sur option, **de date à date** à compter de la prise d'effet du bail initial | même BOI § 10 |
| Usage | Location non meublée, habitation principale du locataire (une seule habitation principale possible) | même BOI, renvoi au BOI-IR-RICI-230-20-20 § 60 à 90 |
| Locataire proche | Depuis les investissements 2015, un ascendant ou un descendant peut être locataire s'il ne fait pas partie du foyer fiscal du bailleur, plafonds de loyer et de ressources respectés | BOI-IR-RICI-360-20-20 § 55 |
| Vacance | En cas de congé, relouer aussitôt. Vacance admise si le bailleur prouve des diligences concrètes (annonces, agence) et des conditions non dissuasives, mais relocation effective au plus tard **12 mois** après réception de la lettre de congé | BOI-IR-RICI-230-20-20 § 40 |
| Vacance en fin d'engagement | Pas de remise en cause si la vacance survient moins de 12 mois avant le terme, logement en état d'être loué, ni occupé par le bailleur ou son foyer, ni prêté, ni vendu avant le terme | même BOI § 50 |

La règle de la CAF qui exclut l'aide au logement quand on loue à un parent n'est pas une condition fiscale du Pinel. Elle ne doit pas être présentée comme telle.

## 2. Plafond de loyer

### Calcul

Plafond mensuel hors charges = plafond au m² de la zone × coefficient × surface retenue (BOI-IR-RICI-360-20-30 du 10/03/2026, § 120) :
- **Coefficient** = 0,7 + 19 / S, arrondi à la deuxième décimale, plafonné à 1,2. Le plafond au m² obtenu après coefficient est arrondi au centime (exemples du § 130).
- **Surface retenue S** = surface habitable (R. 111-2 CCH) + **moitié des annexes** réservées à l'usage exclusif du locataire et d'au moins 1,80 m de hauteur (caves, balcons, loggias, vérandas, celliers…), cette moitié étant **limitée à 8 m²** par logement. Les terrasses ne comptent que si elles sont accessibles en étage ou aménagées sur un ouvrage enterré ou à moitié enterré (toit d'un parking souterrain par exemple), et dans la limite de 9 m². Une terrasse en rez-de-jardin posée sur la terre n'est pas une annexe (BOI-IR-RICI-230-20-20 § 340). Sources : BOI-IR-RICI-230-20-20 § 320 à 360, auquel renvoie le BOI-IR-RICI-360-20-30 § 30.
- **Parkings et garages** : ce ne sont pas des annexes, leur surface est exclue (même BOI § 350).
- **Loyer comparé** : si le parking (situé dans le même immeuble ou la même résidence) est loué **dans le même bail** que le logement, c'est le **loyer total** qui est comparé au plafond, sans pouvoir isoler la part du parking (§ 440). Avec **deux baux distincts**, le loyer du parking peut être écarté si l'emplacement est physiquement séparé, si le locataire est libre de ne pas le louer et si son loyer est normal (§ 450).

### Zone et barème à retenir

- **Zone** : en principe celle de l'arrêté du 1er août 2014 applicable à la date de réalisation de l'investissement (BOI-IR-RICI-360-20-30 § 23 à 28), ou celle de l'arrêté du 29/04/2009 pour un investissement réalisé du 01/09 au 30/09/2014 (§ 26). Si la commune a changé de zone pendant l'engagement, on retient pour le plafond de loyer la version en vigueur **à la conclusion ou au renouvellement du bail** (§ 29). Pour un bail conclu ou renouvelé depuis le 06/09/2025, c'est la version issue de l'arrêté du 05/09/2025. Le ministère publie la liste des communes du zonage en vigueur (ecologie.gouv.fr, « Zonage A, B, C »), à consulter pour les baux plus récents que cette version du BOFiP.
- **Modulation préfectorale** : le préfet de région peut réduire le plafond au m² dans certaines communes, pour les investissements réalisés après l'entrée en vigueur de son arrêté. Il faut alors retenir le plafond réduit (BOI-IR-RICI-360-20-30 § 110 à 120). En Île-de-France, l'arrêté n° 2014087-0001 du 28/03/2014 (en vigueur le 01/10/2014) a réduit le plafond dans des communes de zone A bis et de zone A (14,21 €/m² à Aubervilliers, zone A bis, selon l'exemple du § 117), montants ensuite actualisés. La liste des communes modulées et leurs plafonds actualisés sont publiés sur ecologie.gouv.fr (rubrique Dispositif Pinel, § 117). **Vérifier ce point avant tout calcul.**
- Le plafond au m² est celui de **l'année de conclusion ou de renouvellement du bail**, publié chaque année au BOI-BAREME-000017 (§ 150 pour la métropole, § 160 pour l'outre-mer).

| Plafond métropole, €/m²/mois hors charges | A bis | A | B1 | B2 et C |
|---|---|---|---|---|
| Baux conclus ou renouvelés en 2025 (BOI-BAREME-000017 du 17/02/2025) | 19,51 | 14,49 | 11,68 | 10,15 |
| Baux conclus ou renouvelés en 2026 (BOI-BAREME-000017 du 10/03/2026) | 19,71 | 14,64 | 11,80 | 10,26 |

Outre-mer 2026 : 12,21 € (départements d'outre-mer, Saint-Martin, Saint-Pierre-et-Miquelon) et 14,46 € (Polynésie française, Nouvelle-Calédonie, Wallis-et-Futuna).

Vérifier le barème sur le BOFiP plutôt que sur un site secondaire, où des écarts de quelques centimes circulent.

### Exemple

Bail conclu en 2026, zone A, commune non soumise à modulation, appartement de 42 m² habitables avec une cave de 6 m² et un parking loué dans le même bail, loyer de 725 € hors charges parking compris :
- S = 42 + 6 / 2 = 45 m² (la moitié de la cave, 3 m², reste sous la limite de 8 m²).
- coefficient = 0,7 + 19 / 45 = 1,1222, arrondi à 1,12.
- plafond au m² = 14,64 × 1,12 = 16,40 €.
- plafond mensuel = 16,40 × 45 = **738,00 €**, à comparer au loyer hors charges **parking compris** : 725 € est conforme.

Sans la cave (S = 42 m², coefficient 1,15, soit 16,84 €/m²), le plafond tomberait à 707,28 € et le loyer de 725 € le dépasserait : les annexes changent souvent le résultat.

## 3. Plafond de ressources du locataire

- **Revenu retenu** : revenu fiscal de référence du foyer du locataire de l'**avant-dernière année** précédant la signature du bail (N-2). Celui de N-1 est admis s'il est inférieur et que le locataire produit l'avis correspondant à la signature (BOI-IR-RICI-230-40-10 § 320 et 330, auquel renvoie le BOI-IR-RICI-360-20-30 § 250).
- **Moment du contrôle** : à la signature du bail uniquement. Une hausse ultérieure des revenus du locataire ne remet pas en cause la réduction (§ 320).
- **Composition du foyer** : celle de la date de signature. Plusieurs cotitulaires formant des foyers fiscaux distincts doivent chacun respecter le plafond, mais les **concubins** sont appréciés **globalement** (§ 350 et 360).
- **Barème** : celui de l'année de conclusion du bail, au BOI-BAREME-000017 § 270 (métropole) et § 280 (outre-mer). Pour les ressources, la zone s'apprécie à la date de conclusion du bail (BOI-IR-RICI-360-20-30 § 160).

| Plafond métropole, baux 2026 (BOI-BAREME-000017 du 10/03/2026, § 270) | A bis | A | B1 | B2 et C |
|---|---|---|---|---|
| Personne seule | 44 344 € | 44 344 € | 36 144 € | 32 530 € |
| Couple | 66 276 € | 66 276 € | 48 268 € | 43 439 € |
| Personne seule ou couple, 1 personne à charge | 86 878 € | 79 666 € | 58 043 € | 52 239 € |
| Personne seule ou couple, 2 personnes à charge | 103 727 € | 95 427 € | 70 073 € | 63 066 € |
| Personne seule ou couple, 3 personnes à charge | 123 415 € | 112 968 € | 82 432 € | 74 189 € |
| Personne seule ou couple, 4 personnes à charge | 138 874 € | 127 122 € | 92 900 € | 83 611 € |
| Majoration par personne à charge à partir de la 5e | 15 471 € | 14 164 € | 10 364 € | 9 325 € |

Beaucoup de tableaux en ligne ne précisent pas leur année. Par exemple, 41 855 € (personne seule, zone A) est le plafond **2023** (BOI-BAREME-000017 du 08/06/2023), pas celui de 2026.

## 4. Points que la doctrine Pinel ne tranche pas

1. **Révision annuelle du loyer (IRL) en cours de bail.** Deux lectures coexistent.
   - Lecture stricte : le loyer ne doit pas dépasser les plafonds « pendant toute la période couverte par l'engagement de location, le cas échéant prorogé » (BOI-IR-RICI-360-20-30 § 1), et le « dépassement du plafond de loyer pendant la période d'engagement de location » est un cas de remise en cause **sans aucune exception** (BOI-IR-RICI-230-60 § 20, auquel renvoie le BOI-IR-RICI-360-40 § 10).
   - Lecture souple : le respect des plafonds « est apprécié à la date de conclusion du bail ou de renouvellement du bail au cours de la période de location prorogée » (BOI-IR-RICI-360-60 § 190). Dans un dispositif voisin, l'exemple chiffré du BOI-IR-RICI-400-20-30 du 06/03/2025 (Loc'Avantages, § 270) applique la révision IRL en cours de bail sans la confronter au plafond de l'année et ne revérifie le plafond qu'à la reconduction.
   - Aucun texte ne compare un loyer révisé au plafond de l'année de révision. **Conseil** : limiter la hausse au plafond de l'année de révision, ce qui coûte en général quelques euros et met à l'abri d'une remise en cause sans exception.
2. **Reconduction tacite du bail.** Les textes Pinel visent les baux « conclus ou renouvelés » (BOI-IR-RICI-360-20-30 § 10 et 20). Ceux de Loc'Avantages visent les baux « conclus, reconduits ou renouvelés » (BOI-IR-RICI-400-20-30). Une lecture a contrario en déduit qu'en Pinel une reconduction tacite ne déclenche pas de nouveau contrôle des plafonds. Elle est **fragile** : le barème 2026 lui-même (BOI-BAREME-000017) écrit « baux conclus ou renouvelés » pour Loc'Avantages, où la reconduction déclenche pourtant un contrôle. Prudence identique à celle du point 1.

## 5. Prorogation

Source : BOI-IR-RICI-360-60 du 22/08/2024.

- **Investissements concernés** : Pinel réalisés du 01/09/2014 au 31/12/2024, pas le Duflot (§ 10 et 20). Durée totale de 12 ans au plus.
- **Durée** : 2 périodes triennales après un engagement initial de 6 ans, une seule après 9 ans (§ 120). Chaque période se compte de date à date depuis le terme de la précédente (§ 130).
- **Complément de réduction** : taux dans `data/niches-fiscales.json` (par exemple 6 % puis 3 % pour un investissement 2014-2022 avec engagement de 6 ans, § 40), calculé sur la même base que la réduction initiale (§ 50). Il s'impute **par tiers** sur l'impôt de l'année de la prorogation et des deux suivantes. L'excédent sur l'impôt n'est ni reportable ni remboursable (§ 60).
- **Condition préalable** : aucun cas de remise en cause sur la période précédente (§ 30).
- **Démarche** : la prorogation doit être exercée au titre de l'année au cours de laquelle se termine la période concernée. Elle **ne peut être ni tacite, ni anticipée, ni rétroactive** (§ 270). Une personne physique joint à la déclaration des revenus de cette année une **note sur modèle de l'administration** (identité, logement, loyer, copie du bail en cas de changement de locataire, avis d'impôt N-2 du locataire, engagement de location prorogé, § 310 à 330) L'engagement prorogé est constaté au dépôt de la déclaration des revenus de l'année du terme de la période initiale (§ 110). La rubrique « engagement de location prorogé » de la 2042-RICI n'est à remplir que la première année (brochure pratique IR 2024, 2042-RICI).
- **Plafonds** : les conditions et plafonds de la période initiale continuent de s'appliquer (§ 170). En cas de **prorogation sans changement de locataire**, les plafonds **ne sont pas réappréciés**. Un nouveau bail conclu pendant la prorogation suit le barème de son année (§ 190).
- **Vacance autour du terme** : si le locataire part moins de 12 mois avant le terme de la période initiale et que le bailleur proroge, le délai de 12 mois pour relouer court depuis le départ du locataire. À défaut, le complément de prorogation est repris, la réduction de la période initiale restant acquise si les conditions de la vacance en fin d'engagement sont remplies (§ 180, renvoi au BOI-IR-RICI-230-20-20 § 50).
- **Non-résidents** : pour un investissement réalisé depuis le 01/01/2019, le transfert du domicile fiscal hors de France n'empêche pas la prorogation (§ 15). Le complément s'impute alors sur l'impôt du non-résident, sans remboursement de l'excédent. Pour un investissement antérieur, voir [non-residents.md](non-residents.md) § 4.

## 6. Remise en cause

- **Cas** : absence ou retard de mise en location, interruption au-delà de la vacance admise, utilisation du logement par le propriétaire, location à une personne non autorisée, changement d'affectation, dépassement du plafond de loyer, cession pendant l'engagement, locataire ascendant ou descendant qui devient membre du foyer fiscal du bailleur (BOI-IR-RICI-360-40 § 10 et 20, renvoi au BOI-IR-RICI-230-60 § 10 à 30).
- **Exceptions**, limitées à certains cas :

| Cas | Exceptions | Source |
|---|---|---|
| Absence de location, location hors délai, interruption trop longue | Invalidité de 2e ou 3e catégorie (art. L. 341-4 CSS), licenciement ou décès du contribuable ou de l'un des membres du couple soumis à imposition commune. Le licenciement ne compte pas si une retraite à taux plein est possible (art. L. 1237-5 C. trav.) | BOI-IR-RICI-230-60 § 10 |
| Utilisation par le propriétaire, location à une personne non autorisée, dépassement du plafond de loyer | **Aucune** | BOI-IR-RICI-230-60 § 20 |
| Changement d'affectation | Seulement s'il est imputable au locataire, si le bailleur a accompli des diligences concrètes et sans location à un ascendant ou un descendant | même § 20, renvoi au BOI-IR-RICI-230-20-20 § 90 |
| Vente | Les trois exceptions du § 10 | BOI-IR-RICI-360-40 § 20 |
| Mise en indivision, cession de ses droits par un indivisaire | Remise en cause « en tout état de cause », seule tolérance pour d'ex-époux qui restent en indivision | même § 20 |
| Donation, transmission | Seulement le décès d'un membre du couple. Le conjoint survivant attributaire ou usufruitier peut reprendre l'engagement, pas celui qui devient indivisaire | même § 20 |

- **Modalités** (BOI-IR-RICI-360-40 § 50) :
  - conditions initiales non remplies : l'impôt de **chaque année** où la réduction a été imputée est majoré de son montant.
  - condition qui cesse d'être remplie pendant l'engagement : l'impôt de **l'année de l'événement** est majoré du **montant total** de la réduction obtenue, dans le délai de reprise (31/12 de la 3e année suivante).
  - dans les deux cas : intérêt de retard (art. 1727 CGI) et majoration de l'art. 1758 A CGI, ou majorations de l'art. 1729 en cas de manquement délibéré ou de manœuvres frauduleuses.
  - vacance de plus de 12 mois : reprise au titre de l'année où expire ce délai de 12 mois.

## 7. Déclaration

- Réduction et reports sur la **2042-RICI**. Les codes de cases dépendent de l'année d'achèvement ou de réalisation et changent chaque année : lire la 2042-RICI et la brochure de l'année plutôt que des codes figés.
- Contribuable devenu non-résident, investissement réalisé depuis le 01/01/2019 alors qu'il était domicilié en France : **cocher la case 7QH** pour continuer à bénéficier de la réduction (brochure pratique IR 2024, 2042-RICI, Pinel).
- Justificatifs (engagement de location, bail, avis d'impôt du locataire, calcul de surface) à tenir à la disposition de l'administration.

## Pièges fréquents

1. Oublier de vérifier si la commune est soumise à une modulation préfectorale du plafond.
2. Calculer le plafond sur la seule surface habitable et oublier la moitié du balcon ou de la cave (jusqu'à 8 m²), ou au contraire y ajouter le parking.
3. Comparer au plafond le loyer hors parking alors que le parking est loué dans le même bail.
4. Appliquer le barème de l'année d'investissement au lieu de celui de l'année de conclusion du bail, ou ignorer un changement de zone intervenu avant la conclusion ou le renouvellement du bail.
5. Reprendre un tableau de plafonds de ressources sans vérifier son année.
6. Contrôler les ressources sur l'année N-1 par défaut : le principe est N-2.
7. Croire qu'une hausse des revenus du locataire en cours de bail fait perdre la réduction.
8. Oublier la case 7QH après une expatriation.

## Sources

- CGI, art. 199 novovicies
- BOI-IR-RICI-360-20-20 (conditions de mise en location), 360-20-30 du 10/03/2026 (plafonds), 360-40 (remise en cause), 360-60 du 22/08/2024 (prorogation)
- BOI-IR-RICI-230-20-20 (surface, vacance, parking), 230-40-10 (ressources du locataire), 230-60 (remise en cause)
- BOI-BAREME-000017 du 10/03/2026 (barèmes 2026) et versions antérieures
- BOI-IR-RICI-400-20-30 du 06/03/2025 (Loc'Avantages, pour l'analogie du § 4)
- Arrêté du 1er août 2014 modifié (zonage A/B/C), notamment par l'arrêté du 05/09/2025
- Arrêté du préfet de la région Île-de-France n° 2014087-0001 du 28/03/2014 (modulation des plafonds de loyer)
- Brochure pratique IR 2024, 2042-RICI, investissements Pinel (case 7QH, engagement de location prorogé)
