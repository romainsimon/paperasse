# Cas particuliers (IPP belge)

<!-- last_updated: 2026-05-15 -->

Base légale : CIR 92, art. 227 et s. (impôt des non-résidents) ; conventions préventives de double imposition.
Source administrative : Fisconetplus.be ; SPF Finances — finances.belgium.be.

## Non-résidents — Impôt des Non-Résidents (INR)

### Définition de la résidence fiscale belge

Un contribuable est **résident fiscal belge** si son **domicile fiscal** ou son **siège de fortune** se trouve en Belgique (art. 2 §1, 1° CIR 92).

- **Domicile fiscal** : lieu où le contribuable est établi de façon stable avec sa famille (présomption réfragable liée à l'adresse d'inscription au Registre national).
- **Siège de fortune** : lieu depuis lequel le contribuable gère l'ensemble de ses avoirs (critère subsidiaire si pas de foyer familial stable).

**La nationalité n'est pas un critère.**

**Présomption légale** : l'inscription au Registre national belge crée une présomption de résidence fiscale belge (art. 2 §1, 1°, al. 2 CIR 92). Cette présomption est réfragable par la preuve d'une résidence effective à l'étranger.

### Impôt des Non-Résidents (INR — Personnes Physiques)

Les non-résidents belges qui perçoivent des **revenus de source belge** sont soumis à l'**Impôt des Non-Résidents (INR/PP)** (art. 227 et s. CIR 92), et non à l'IPP.

**Revenus de source belge imposables à l'INR** :
- Rémunérations de travail effectué en Belgique
- Revenus immobiliers situés en Belgique (RC ou loyers)
- Dividendes et intérêts distribués par des sociétés belges (sous réserve de conventions)
- Pensions liées à une activité exercée en Belgique
- Revenus d'activité professionnelle exercée en Belgique

**Règles spécifiques INR** :
- Pas de quotités exemptées (en principe), sauf si au moins 75 % des revenus sont de source belge
- Pas de déductions personnelles (épargne-pension, pension alimentaire), sauf conditions spécifiques
- Application des conventions fiscales bilatérales (élimination de la double imposition)
- Taux minimum : 25 % sur les revenus professionnels nets

**Ce skill ne couvre PAS la fiscalité des non-résidents en détail.** Pour les cas complexes (expatriation, revenus mixtes belge/étranger), orienter vers un conseiller fiscal spécialisé en fiscalité internationale.

## Revenus étrangers et conventions préventives de double imposition

### Principes belges

La Belgique applique le principe de **mondialité** pour les résidents : les résidents fiscaux belges sont en principe imposables sur l'ensemble de leurs revenus mondiaux (art. 5 CIR 92).

Les **conventions préventives de double imposition (CPDI)** bilatérales conclues par la Belgique prévoient, selon les cas :
- **Méthode d'exemption** : le revenu étranger est exonéré en Belgique (mais peut influencer le taux effectif — exemption avec réserve de progressivité).
- **Méthode d'imputation** : le revenu est imposé en Belgique, mais un crédit d'impôt est accordé pour l'impôt payé à l'étranger, limité à l'impôt belge correspondant.

### Méthodes selon les conventions

| Méthode | Effet en Belgique |
|---------|------------------|
| Exemption totale | Revenu exonéré à l'IPP belge |
| Exemption avec réserve de progressivité | Revenu inclus pour calculer le taux effectif belge, puis exonéré |
| Imputation ordinaire | Revenu imposé en Belgique ; crédit d'impôt = impôt étranger (plafonné à l'impôt belge) |

### Déclaration des revenus étrangers

- Revenus immobiliers étrangers : cadre III de la déclaration IPP (Tax-on-web)
- Revenus mobiliers étrangers (dividendes, intérêts étrangers non soumis au PM belge) : **cadre VII** de la déclaration IPP
- Revenus professionnels étrangers : cadres IV/V/VI selon la nature
- Comptes bancaires étrangers : déclaration obligatoire à la **Banque Nationale de Belgique (BNB)** via MyMinfin (art. 307 §1, al. 4 CIR 92)

**Zone complexe** — renvoyer vers un conseiller fiscal pour les cas significatifs (expatriation partielle, revenus locatifs étrangers, retraites de l'étranger, frontaliers).

## Revenus exceptionnels : quotient (art. 171 CIR 92)

### Mécanisme

Lissage fiscal pour éviter qu'un revenu ponctuel ne fasse franchir artificiellement plusieurs tranches du barème IPP.

**Formule** :
```
IPP_supplémentaire = [IPP(revenu_ordinaire + revenu_exceptionnel / 4) − IPP(revenu_ordinaire)] × 4
```

**Coefficient par défaut : 4.**

### Revenus éligibles

- Indemnité de départ volontaire ou licenciement (fraction imposable)
- Arriérés de rémunérations (salaires non perçus en temps voulu)
- Prime exceptionnelle non récurrente
- Revenus de remplacement en capital (certaines liquidations de pension)
- Bénéfices ou profits de cessation d'activité
- ATN vesting massif (actions gratuites, stock-options — voir `references/equity-salarial.md`)

### Conditions d'application

- Revenu exceptionnel > **moyenne des revenus imposables des 3 années précédentes**
- Caractère non récurrent avéré
- Application automatique via Tax-on-web si les conditions sont remplies et les revenus déclarés correctement

### Exemple

Salarié, revenu ordinaire net imposable = 35 000 €, arriéré exceptionnel = 60 000 €.

**Sans quotient** :
- Base taxable (après quotité 10 910 €) = 84 090 €
- Impôt estimé : tranche 50 % sur fraction > 48 320 €

**Avec quotient (coefficient 4)** :
```
Revenu fractionné : 35 000 + 60 000 / 4 = 50 000 €
IPP sur 50 000 € (après quotité) ≈ X
IPP sur 35 000 € (après quotité) ≈ Y
Supplément × 4 = (X − Y) × 4
```

**Règle** : chiffrer systématiquement les deux scénarios dans Tax-on-web avant de conclure.

## Splitting fiscal entre conjoints — imposition commune

Les époux et cohabitants légaux font l'objet d'une **imposition commune** (art. 126 CIR 92). Leurs revenus sont regroupés pour calculer l'IPP global du ménage.

**Mécanismes propres à l'imposition commune** :
- **Quotient conjugal** (art. 87 CIR 92) : transfert automatique jusqu'à 30 % des revenus professionnels du conjoint le mieux rémunéré, plafonné à 13 490 € (revenus 2025), si le conjoint faible a des revenus < 30 % du total ménage. Non indexé, supprimé progressivement dès l'exercice 2027.
- Déclaration unique Tax-on-web pour le ménage (deux parties, une déclaration).
- Chaque conjoint conserve ses propres déductions personnelles (épargne-pension, dons) dans ses rubriques.

**Situations particulières** :
- **Année du mariage / cohabitation légale** : imposition commune pour l'année entière (principe) ; option d'imposition séparée possible.
- **Année de séparation / divorce** : imposition séparée à partir de l'année de la séparation de fait durable.
- **Année du décès** : déclaration commune jusqu'à la date du décès ; déclaration séparée pour le conjoint survivant pour le reste de l'année.

## Expatriés belges

### Départ de Belgique

Le départ de Belgique implique la **perte de la résidence fiscale belge** et le transfert de l'obligation IPP illimitée vers l'INR. La date de départ du Registre national est un indice, mais c'est la réalité de l'établissement à l'étranger qui prime.

**Obligations lors du départ** :
- Déclaration IPP pour la période de résidence (du 1er janvier jusqu'à la date de départ)
- Signalement du départ au bureau de contrôle IPP local

Il n'existe **pas d'exit tax belge** générale sur les plus-values latentes lors du départ (contrairement à la France, art. 167 bis CGI). Certains régimes spécifiques (trusts, structures complexes) peuvent impliquer des obligations déclaratives à la sortie.

### Retour en Belgique

- Réintégration dans le régime IPP dès le retour au Registre national.
- Les revenus perçus durant la période d'absence sont en principe hors champ IPP belge (sous réserve de conventions).
- Pas de régime d'impatriation général en Belgique comparable au régime français (art. 155 B CGI). Il existe un **régime spécial d'imposition pour cadres étrangers et chercheurs** (circulaire administrative, en voie de révision législative) — hors scope, renvoyer vers un conseiller spécialisé.

## Situations transfrontalières

### Frontaliers travaillant en Belgique

Les travailleurs résidant à l'étranger et travaillant en Belgique sont soumis à l'INR belge sur leurs revenus d'activité exercée en Belgique, sauf convention bilatérale d'exemption.

Les conventions entre la Belgique et ses voisins (France, Luxembourg, Pays-Bas, Allemagne) prévoient des règles spécifiques pour les frontaliers — notamment des jours de télétravail autorisés sans modification du pays d'imposition (règle des 25 jours avec la France, par exemple).

**Point d'attention** : la multiplication du télétravail post-COVID a complexifié les situations transfrontalières. Les règles évoluent fréquemment.

### Double résidence fiscale

Si un contribuable est potentiellement résident dans deux pays, les **règles de départage (tie-breaker)** des conventions (modèle OCDE) s'appliquent dans l'ordre :
1. Foyer d'habitation permanent
2. Centre des intérêts vitaux
3. Séjour habituel
4. Nationalité
5. Accord amiable entre administrations

## Droit de reprise SPF Finances / AGFisc

Délai pendant lequel l'administration fiscale peut rectifier l'IPP :

| Situation | Délai de reprise |
|-----------|-----------------|
| Cas ordinaire | 3 ans à partir du 1er janvier de l'exercice d'imposition |
| Fraude fiscale | 7 ans (ou 10 ans si fraude grave avec intention frauduleuse) |
| Actifs à l'étranger non déclarés | 10 ans |
| Constructions juridiques (cadre XV) non déclarées | 10 ans |

**Conservation des documents** : minimum 7 ans recommandé ; 10 ans pour couvrir les cas de fraude présumée.

## Acomptes provisionnels

Les contribuables dont les revenus ne sont pas (ou insuffisamment) soumis au PP doivent verser des **acomptes provisionnels** (art. 157 à 168 CIR 92) pour éviter une majoration fiscale :

| Date | Acompte |
|------|---------|
| 10 avril | VA1 |
| 10 juillet | VA2 |
| 10 octobre | VA3 |
| 20 décembre | VA4 |

**Concernés** : indépendants, dirigeants à revenus variables, rentiers, contribuables avec revenus étrangers ou immobiliers importants.

**Majoration en l'absence d'acomptes** : calculée sur base du taux de référence BCE majoré (art. 157 CIR 92) — à chiffrer systématiquement si revenus non soumis au PP.

## Régularisation spontanée

**Intérêt** : réduction des pénalités si le contribuable rectifie avant contrôle.

- Intérêts de retard : 7 % par an (taux 2025, indexé)
- Pas de majoration si régularisation spontanée et bonne foi
- Régularisation fiscale permanente (DLU quater — Direction de Ruling) pour avoirs non déclarés antérieurs

**Quand envisager** : oubli de déclaration (crypto, revenus étrangers, comptes étrangers, constructions juridiques). Orienter vers un conseiller fiscal pour les régularisations significatives.

## Références CIR 92 / Fisconetplus

| Règle | Source |
|-------|--------|
| Résidence fiscale belge | art. 2 §1, 1° CIR 92 |
| Mondialité de l'imposition | art. 5 CIR 92 |
| Impôt des non-résidents | art. 227 à 248 CIR 92 |
| Imposition commune | art. 126 à 131 CIR 92 |
| Quotient conjugal | art. 87 CIR 92 |
| Revenus exceptionnels (quotient) | art. 171 CIR 92 |
| Acomptes provisionnels | art. 157 à 168 CIR 92 |
| Déclaration comptes étrangers (BNB) | art. 307 §1, al. 4 CIR 92 |
| Constructions juridiques | art. 307 §1/1 CIR 92 |
| Délais de reprise | art. 354 à 358 CIR 92 |

Source : Fisconetplus.be — https://www.fisconetplus.be
SPF Finances : https://finances.belgium.be/fr/particuliers
Conventions fiscales belges : https://finances.belgium.be/fr/conventions-preventives-de-double-imposition
