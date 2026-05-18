# Revenus du capital (IPP belge)

<!-- last_updated: 2026-05-15 -->

Base légale : art. 17 à 22 (revenus mobiliers), art. 269 à 313 CIR 92.
Voir `data/precompte-mobilier.json` pour les taux et seuils.

## Précompte mobilier (PM) — principe libératoire

En Belgique, les revenus mobiliers (dividendes, intérêts) sont soumis au **précompte mobilier (PM)**, retenu à la source par l'établissement financier ou la société distributrice. Le PM est **libératoire** : une fois retenu, le contribuable n'est pas obligé de déclarer ces revenus dans sa déclaration IPP (art. 313 CIR 92).

**Taux PM standard** : 30 % (art. 269 §1, 1° CIR 92).

**Différence avec le PFU français** : le PM belge est un prélèvement définitif libératoire, pas une option à exercer chaque année. Il n'existe pas d'alternative "option barème" générale pour les revenus mobiliers belges (sauf exception limitée pour certains dividendes sous VVPR bis/ter).

## Types de revenus et taux PM

### Dividendes (taux général : 30 %)

- PM de 30 % sur les dividendes distribués par des sociétés belges ou étrangères (art. 269 §1, 1° CIR 92).
- **Dividendes étrangers** : le PM est retenu à la source dans le pays d'origine ET en Belgique (retenue complémentaire via l'établissement financier belge). Conventions fiscales bilatérales applicables.

### Régimes réduits pour PME — VVPR bis (art. 269 §2 CIR 92)

Taux réduit pour dividendes distribués par des PME sur des **nouvelles actions émises après le 1er juillet 2013** (apport en numéraire) :

| Exercice de distribution | Taux PM |
|--------------------------|---------|
| Dividendes du 1er exercice après apport | 30 % (taux normal) |
| Dividendes du 2e exercice après apport | **20 %** |
| Dividendes du 3e exercice et suivants après apport | **15 %** |

**Conditions VVPR bis** :
- PME au sens de l'art. 1:24 §1 à 6 CSA (Code des Sociétés et des Associations)
- Actions nominatives uniquement
- Actions nouvelles émises contre apport en numéraire
- Actions détenues en pleine propriété depuis l'émission

**Base légale** : art. 269 §2 CIR 92.

### VVPRter — bonus de liquidation (art. 269 §1, 2° CIR 92)

Taux réduit de **10 %** sur les boni de liquidation distribués via une **réserve de liquidation** constituée préalablement par une PME.

**Mécanisme** :
1. La société constitue une réserve de liquidation (cotisation distincte de 10 % payée immédiatement — art. 219quater CIR 92).
2. Si la réserve est distribuée comme dividende après **5 ans** d'attente → PM 5 % (total 15 % avec la cotisation initiale).
3. Si distribuée à la liquidation de la société → PM 0 % (la cotisation de 10 % est définitive).

**Base légale** : art. 269 §1, 2° et art. 184quater CIR 92.

### Intérêts (taux général : 30 %)

- PM de 30 % sur les intérêts d'obligations, comptes à terme, bons de caisse, etc.
- **Pas d'abattement** — contrairement aux dividendes sous certains régimes.

### Livret d'épargne réglementé — exonération partielle (art. 21, 5° CIR 92)

Les intérêts de livrets d'épargne belges réglementés bénéficient d'une **exonération annuelle de 1 020 €** par contribuable (montant 2025, indexé annuellement).

- Fraction exonérée : 1 020 € par contribuable (pas par compte — total de tous les livrets).
- Au-delà de 1 020 € : PM 15 % sur la fraction excédentaire.
- **Condition** : livret réglementé auprès d'un établissement belge (taux de base + prime de fidélité selon AR).

**Base légale** : art. 21, 5° et art. 269 §1, 5° CIR 92.

## Assurance-vie (branche 21 et branche 23)

### Branche 21 (fonds à taux garanti)

- Taxe sur les primes : 2 % à la souscription.
- Intérêts : exonérés de PM si contrat conservé **au moins 8 ans** ET preneur = assuré (art. 21, 9° CIR 92).
- En cas de rachat avant 8 ans : PM 30 % sur les intérêts.

### Branche 23 (fonds liés)

- Taxe sur les primes : 2 %.
- Pas de rendement garanti — pas de PM (les plus-values ne sont généralement pas imposables pour les particuliers en bonne gestion).

**Absence d'équivalent PEA/PER** : il n'existe pas en Belgique de produit équivalent au PEA (Plan d'Épargne en Actions) ou au PER (Plan d'Épargne Retraite) français. L'épargne retraite passe par l'épargne-pension (art. 145¹ CIR 92) et l'épargne à long terme (art. 145¹⁰ CIR 92) — voir `data/epargne-pension-elt.json`.

## Plus-values mobilières des particuliers

En règle générale, les **plus-values sur actions** réalisées par des particuliers dans le cadre de la **gestion normale du patrimoine privé** ne sont **pas imposables** en Belgique (art. 90, 1° CIR 92 — absence de disposition spécifique taxant ces gains).

**Exceptions** :
- Plus-values sur actions réalisées dans un contexte **spéculatif** ou en dehors de la gestion normale → imposables à 33 % (art. 90, 1° CIR 92 — revenus divers).
- Plus-values internes (vente à une société liée — art. 90, 9° CIR 92) → imposables à 16,5 %.
- Grandes participations (> 25 %) cédées à une société étrangère → régime spécifique (art. 90, 9° bis CIR 92).

## Obligations déclaratives

### PM libératoire — pas de déclaration obligatoire

Les revenus soumis au PM belge ne doivent pas être déclarés dans la déclaration IPP (art. 313 CIR 92) sauf :

1. **Option de déclaration volontaire** : si le contribuable est non-imposable ou à faible TMI, il peut déclarer volontairement des revenus mobiliers pour récupérer l'excédent de PM (utile si TMI < 30 %). L'administration recalcule alors l'IPP sur ces revenus et rembourse la différence.
2. **Revenus mobiliers étrangers** non soumis au PM belge : à déclarer obligatoirement en cadre VII de la déclaration IPP (art. 307 §1 CIR 92).
3. **Dividendes exonérés (VVPR bis/ter)** : PM réduit déjà retenu à la source — pas de déclaration spécifique requise.

### Comptes étrangers et structures étrangères

- Obligation de déclaration de tout compte bancaire étranger (art. 307 §1, al. 4 CIR 92) auprès de la BNB (Banque Nationale de Belgique) — distinct de la déclaration IPP.
- Constructions juridiques étrangères (trusts, fondations privées…) : déclaration obligatoire dans la déclaration IPP (cadre XIII).

## Pièges fréquents

1. **Croire que les dividendes belges sont à 15 %** : le taux standard est 30 %. Le 15 % VVPR bis ne s'applique qu'aux nouvelles actions PME à partir du 3e exercice.
2. **Oublier l'exonération 1 020 € livret d'épargne** : PM 15 % seulement sur la fraction excédentaire — ne pas déclarer ni payer le PM sur la partie exonérée.
3. **Confondre PM et précompte professionnel** : deux prélèvements distincts sur des revenus différents.
4. **Revenus mobiliers étrangers non déclarés** : le PM libératoire ne s'applique qu'aux revenus soumis au PM belge. Les intérêts et dividendes de comptes étrangers doivent être déclarés en cadre VII.
5. **Oublier la taxe sur primes assurance-vie 2 %** dans les simulations de rendement branche 21.
6. **Plus-values sur actions = toujours exonérées** : faux si le contexte est spéculatif → vérifier la qualification avant d'affirmer l'exonération.

## Tableau récapitulatif des taux PM

| Revenu | Taux PM | Base légale |
|--------|---------|-------------|
| Dividendes (général) | 30 % | art. 269 §1, 1° CIR 92 |
| Dividendes VVPR bis (2e exercice) | 20 % | art. 269 §2 CIR 92 |
| Dividendes VVPR bis (3e exercice+) | 15 % | art. 269 §2 CIR 92 |
| Bonus liquidation (VVPRter, après 5 ans) | 5 % (+ 10 % cotisation préalable) | art. 269 §1, 2° CIR 92 |
| Intérêts (général) | 30 % | art. 269 §1, 1° CIR 92 |
| Intérêts livret épargne (fraction > 1 020 €) | 15 % | art. 269 §1, 5° CIR 92 |
| Intérêts livret épargne (≤ 1 020 €) | 0 % (exonéré) | art. 21, 5° CIR 92 |
| Intérêts branche 21 (contrat ≥ 8 ans) | 0 % (exonéré) | art. 21, 9° CIR 92 |
| Intérêts branche 21 (contrat < 8 ans) | 30 % | art. 269 §1, 1° CIR 92 |

## Références CIR 92 / Fisconetplus

| Règle | Article CIR 92 |
|-------|---------------|
| Revenus mobiliers — définition | art. 17 à 22 |
| Exonération intérêts livret épargne | art. 21, 5° |
| Exonération branche 21 (8 ans) | art. 21, 9° |
| PM libératoire | art. 313 |
| Taux PM général (30 %) | art. 269 §1, 1° |
| VVPR bis — taux réduits dividendes | art. 269 §2 |
| VVPRter — boni liquidation | art. 269 §1, 2° |
| Réserve de liquidation | art. 184quater |
| Cotisation réserve liquidation | art. 219quater |
| Plus-values spéculatives | art. 90, 1° |
| Plus-values participations importantes | art. 90, 9° bis |
| Déclaration revenus étrangers | art. 307 §1 |
| Déclaration comptes étrangers (BNB) | art. 307 §1, al. 4 |

Source : Fisconetplus.be — https://www.fisconetplus.be
SPF Finances : https://finances.belgium.be/fr/particuliers/revenus/revenus-mobiliers
