# Mécanisme de l'Impôt sur le Revenu (IR)

## Séquence de calcul (à dérouler intégralement)

L'IR ne s'applique pas directement au revenu global. Il suit une séquence stricte :

```
1. Revenus bruts par catégorie
   ↓ abattements spécifiques (10% salaires, 10% pensions, 40% dividendes si barème…)
2. Revenus nets catégoriels
   ↓ somme
3. Revenu brut global
   ↓ déductions (PER, pension alimentaire, CSG déductible N-1)
4. Revenu Net Imposable (RNI)
   ↓ ÷ nombre de parts
5. Quotient
   ↓ application du barème progressif
6. Impôt par part
   ↓ × nombre de parts
7. Impôt brut
   ↓ plafonnement du gain QF
8. Impôt après QF
   ↓ décote (si impôt brut < seuil)
9. Impôt après décote
   ↓ − réductions d'impôt
10. Impôt après réductions
    ↓ − crédits d'impôt (+ remboursement si excédent)
11. Impôt net

+ Prélèvements sociaux (séparés, sur revenus du capital)
+ CEHR (si RFR > seuils)
= Charge fiscale totale
```

**Ne jamais sauter d'étape.** Chaque intermédiaire doit être chiffré.

## Point critique : terminologie des salaires

La confusion la plus fréquente concerne le "salaire net imposable".

| Terme | Où on le trouve | Valeur |
|-------|----------------|--------|
| Salaire brut | Bulletin de salaire — haut de fiche | Avant cotisations |
| Salaire net | Bulletin de salaire — versé sur le compte | Après cotisations, mais AVANT CSG non déductible |
| **Salaire net imposable (1AJ)** | **Bulletin de salaire — ligne dédiée** | **Base déclarée en 1AJ** |
| RNI (après abattement) | Avis d'imposition | 1AJ × 0,9 (plage standard) |

**Règle** : passer la valeur **1AJ** dans `irpp_calculer_ir` ou dans les simulations. Si l'utilisateur donne la "valeur nette après abattement" ou "le RNI", remonter : `1AJ ≈ RNI ÷ 0,9`.

**En cas de doute, demander** : "Le chiffre que vous me donnez est-il celui du bulletin de salaire (case 1AJ) ou de l'avis d'imposition (RNI) ?"

## Abattements par catégorie de revenu

| Revenu | Case 2042 | Abattement | Source |
|--------|-----------|-----------|--------|
| Salaires | 1AJ/1BJ | 10% (min 509 €, max 14 555 €) ou frais réels | data/bareme-ir-2025.json |
| Pensions / retraites | 1AS/1BS | 10% (min 450 €, max 4 446 €) par foyer | data/bareme-ir-2025.json |
| Allocations chômage (ARE) | 1AP/1BP | **10 %** (revenu de remplacement imposé selon les règles des T&S, BOI-RSA-BASE-30-50-20 ; l'abattement porte sur le total salaires + ARE, plafond commun 14 555 €) | — |
| Dividendes (option barème) | 2DC | 40% | data/pfu-prelevements-sociaux.json |
| Dividendes (PFU) | 2DC | Aucun abattement | — |
| BNC régime normal | 5QC | Aucun abattement | — |
| Micro-BNC | 5TE | 34% (plafond 77 700 €) | — |

**Précision** : l'ARE se déclare en 1AP/1BP (revenu de remplacement), **pas** dans les salaires 1AJ — mais elle bénéficie quand même de l'abattement de 10 % comme les salaires (BOI-RSA-BASE-30-50-20). La distinction de case n'enlève donc PAS l'abattement ; elle compte pour les calculs qui distinguent revenus d'activité et de remplacement (l'ARE n'est pas un revenu d'activité, ex. plafond PER).

**Précision AGA/OGA** : la majoration de 25 % du bénéfice pour non-adhésion à un organisme de gestion agréé (AGA/OGA) est **supprimée** (LF 2021, art. 34 ; art. 158-7 CGI). Extinction progressive (coefficients 1,20 / 1,15 / 1,10) puis disparition totale depuis l'imposition des revenus 2023. Tous les BNC en déclaration contrôlée se déclarent en 5QC/5RC, adhérent ou non, sans distinction. La réduction d'impôt pour frais de comptabilité qui accompagnait l'adhésion (art. 199 quater B) est elle aussi **abrogée** par la LF 2025 (dernière application : revenus 2024).

## Revenus partiellement exonérés — apprentis, stagiaires, étudiants

Deux régimes distincts, deux articles différents. S'appliquent aux enfants mineurs à charge comme aux majeurs rattachés.

| Type | Article | Conditions | Plafond 2025 |
|------|---------|------------|--------------|
| Apprentis (contrat d'apprentissage L. 6221-1 CT) et stagiaires (L. 124-6 Code éduc.) | art. 81 bis CGI | Contrat formel requis | SMIC annuel = **21 622 €** |
| Jobs étudiants | art. 81, 36° CGI | ≤ 25 ans au 1er janvier ; activité exercée pendant l'année scolaire/universitaire **ou** durant les congés scolaires/universitaires. **Sur option du contribuable** | 3 × SMIC mensuel = **5 405 €** |

**Hors champ** : le contrat de professionnalisation n'ouvre pas droit à l'exonération art. 81 bis — la rémunération est imposable en totalité (souvent confondu avec le contrat d'apprentissage).

**Mécanique de déclaration** :
- **En ligne** : saisir le montant **total** perçu par ligne employeur, puis cocher la case dédiée ("Salaires d'apprentis exonérés" ou "Indemnités de stage exonérées" ou case équivalente étudiants) — le système reporte automatiquement max(0, total − plafond) en 1AJ/1BJ/1CJ.
- **Papier** : reporter en 1AJ/1BJ/1CJ uniquement le montant excédant le plafond (le calcul est à la charge du contribuable).

Si un même employeur verse à la fois des revenus étudiants et d'autres revenus, **dupliquer la ligne** pour déclarer séparément les deux natures.

**Valeurs SMIC** : revalorisées au 1er janvier, et en cours d'année si l'indice des prix à la consommation national atteint +2% par rapport au niveau ayant déclenché la dernière revalorisation ([art. L3231-5 CT](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000006902835)).

## Application du barème progressif

Utiliser `data/bareme-ir-2025.json` — champ `bareme_ir.tranches`.

**Méthode par part** :
1. Diviser le RNI par le nombre de parts → quotient
2. Appliquer le barème progressif tranche par tranche sur le quotient
3. Multiplier le résultat par le nombre de parts → impôt brut

**Exemple (revenus 2025, célibataire, RNI = 40 000 €, 1 part)** :
- Quotient = 40 000 €
- Tranche 0-11 600 € : 0 €
- Tranche 11 600-29 579 € : (29 579 - 11 600) × 11% = 17 979 × 11% = 1 977,69 €
- Tranche 29 579-40 000 € : (40 000 - 29 579) × 30% = 10 421 × 30% = 3 126,30 €
- Impôt brut = 1 977,69 + 3 126,30 = **5 103,99 €**

## Décote

Mécanisme de lissage pour les contribuables à faible impôt. Utiliser `data/bareme-ir-2025.json` — champ `decote`.

**Formules (revenus 2025)** :
- Célibataire : si impôt_brut < 1 982 € → décote = 897 − 0,4525 × impôt_brut
- Couple : si impôt_brut < 3 277 € → décote = 1 483 − 0,4525 × impôt_brut

**La décote ne peut pas rendre l'impôt négatif** (plancher à 0).

Elle crée une zone de taux marginal effectif élevé : quand le revenu augmente, la décote baisse, donc le taux effectif marginal est supérieur au taux du barème.

## CEHR (Contribution Exceptionnelle Hauts Revenus)

S'applique sur le **RFR** (revenu fiscal de référence), pas le RNI. S'ajoute à l'IR net.

Voir `data/bareme-ir-2025.json` — champ `cehr`.

Ne jamais oublier dans les simulations hauts revenus : 3% à 4% sur la fraction au-delà des seuils.

## Revenus exceptionnels : quotient

Distinct du quotient familial. Permet de lisser fiscalement un revenu ponctuel exceptionnel (vesting RSU, prime exceptionnelle, indemnité de départ).

**Mécanisme** :
1. Diviser le revenu exceptionnel par un coefficient (généralement 4)
2. Ajouter au revenu ordinaire
3. Calculer l'impôt supplémentaire
4. Multiplier ce supplément par le coefficient

**Nuance clé** : si le foyer est déjà au TMI maximum (45%), le mécanisme ne procure aucun avantage. Le bénéfice existe uniquement si le revenu exceptionnel ferait franchir une ou plusieurs tranches.

À mentionner systématiquement en cas de vesting RSU important, cession d'entreprise, indemnité de départ.

## Prélèvement à la source (PAS)

Mécanisme de collecte en temps réel — pas d'imposition supplémentaire.

**Points souvent mal compris** :
- **Taux personnalisé** : calculé par la DGFIP sur N-2 puis N-1. Peut être individualisé au sein du couple.
- **Taux neutre** : appliqué par défaut si le salarié ne communique pas son taux (équivalent célibataire sans enfant). Peut entraîner sur/sous-prélèvement.
- **Acomptes** : pour les revenus hors salaires (fonciers, BNC, dividendes), prélevés directement (mensuels ou trimestriels).
- **Régularisation** : en N+1 lors de la déclaration. Si les revenus changent fortement (vesting, chômage, départ retraite), actualiser le taux en cours d'année sur impots.gouv.fr.
- **Impact cash-flow** : un vesting RSU en fin d'année peut déclencher un solde à payer significatif en N+1.

## Références CGI / BOFiP

- Barème IR : art. 197 CGI
- Quotient familial : art. 194-195 CGI
- Décote : art. 197-4° CGI
- Exonérations apprentis / stagiaires : art. 81 bis CGI
- Exonérations jobs étudiants : art. 81, 36° CGI
- Abattement 10% salaires : art. 83-3° CGI
- CEHR : art. 223 sexies CGI
- Revenus exceptionnels : art. 163-0 A CGI
- PAS : art. 204 A à 204 N CGI
