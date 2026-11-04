# Cas particuliers

## Non-résidents fiscaux

Départ de France, année du départ (2042 + 2042-NR), taux minimum 20 % / 30 % (art. 197 A CGI) et option pour le taux moyen, non-résidents « Schumacker », revenus fonciers et prélèvements sociaux (7,5 % pour les affiliés à un régime de sécurité sociale de l'EEE, de la Suisse ou du Royaume-Uni), Pinel après le départ, vente de l'ancienne résidence principale et exit tax : voir [non-residents.md](non-residents.md).

Critères du domicile fiscal : article 4 B CGI (foyer ou lieu de séjour principal, activité professionnelle principale, centre des intérêts économiques). La nationalité n'est pas un critère. Les conventions fiscales priment sur le droit interne : pour les cas complexes (double résidence, revenus d'activité, dirigeants), orienter vers un avocat fiscaliste spécialisé en fiscalité internationale.

## Revenus exceptionnels : quotient

### Mécanisme

Lissage fiscal pour éviter qu'un revenu ponctuel ne fasse franchir artificiellement plusieurs tranches.

**Formule** :
```
Impôt_supplémentaire = [IR(revenu_ordinaire + revenu_exceptionnel / coefficient) − IR(revenu_ordinaire)] × coefficient
```

**Coefficient : toujours 4 pour les revenus exceptionnels** (art. 163-0 A CGI ; brochure IR 2026, « Divers »). Pour les revenus différés (arriérés de salaire, rappels de pension), le coefficient est le nombre d'années civiles d'échéance normale plus un.

### Revenus éligibles

- Prime exceptionnelle (non pérennisable)
- Indemnité de départ volontaire, de licenciement, de mise à la retraite ou de préretraite (fraction imposable) : **sans condition de montant** pour ces indemnités de rupture
- Gratification de fin d'activité
- Gain d'acquisition d'actions gratuites ou gain de levée d'options imposé au barème, exceptionnellement élevé par rapport aux revenus habituels
- Régularisation d'arriérés de salaire ou de pension (revenus différés)

Sont **exclus** les revenus taxés à un taux proportionnel (PFU 12,8 %, plus-values mobilières ou crypto non soumises à l'option barème).

### Conditions d'application

- Revenu exceptionnel > **moyenne des revenus nets imposables des 3 années précédentes** (sauf indemnités de rupture du contrat de travail, dispensées de cette condition)
- Caractère exceptionnel avéré (non récurrent par nature)
- Demande expresse du contribuable : montant en ligne 0XX de la 2042 C, avec sa nature et son année de perception

### Nuance critique

**Inutile si foyer déjà au TMI 45%** : le taux marginal ne change pas avec la division par 4.

**Très utile si** :
- TMI habituel 30% et revenu exceptionnel fait passer à 41%
- TMI habituel 11% et revenu exceptionnel fait passer à 30% ou 41%

### Exemple

Foyer célibataire, RNI habituel 40 000 € (TMI 30%), vesting RSU 80 000 € imposé comme salaire.

**Sans quotient** (barème revenus 2025, 1 part) :
- RNI total : 120 000 €
- Impôt : 33 001 € (dont 35 423 € taxés à 41 %)

**Avec quotient (coefficient 4)** :
- Revenu fractionné : 40 000 + 80 000/4 = 60 000 €
- Impôt sur 60 000 € : 11 104 €
- Impôt sur 40 000 € : 5 104 €
- Supplément × 4 : (11 104 − 5 104) × 4 = 24 000 €
- Impôt total : 5 104 + 24 000 = 29 104 €

Gain : environ 3 900 €, parce que le quart du revenu exceptionnel (20 000 €) reste dans la tranche à 30 % au lieu de faire monter 35 423 € dans la tranche à 41 %. Le gain est nul si le revenu ordinaire est déjà dans la dernière tranche, et il ne joue que sur l'IR : la CEHR est calculée sur le RFR sans quotient ; pour la CDHR, les revenus exceptionnels au sens de l'art. 163-0 A sont retenus pour le quart de leur montant (art. 224 CGI ; brochure IR 2026, « Divers », CDHR, note 2).

**Règle** : chiffrer systématiquement les deux scénarios avant de recommander le quotient.

## CEHR (Contribution Exceptionnelle Hauts Revenus)

Voir `data/bareme-ir-2025.json` → `cehr`. Base légale : art. 223 sexies CGI.

### Seuils (revenus 2025)

| Situation | Tranche 3% | Tranche 4% |
|-----------|-----------|-----------|
| Célibataire | 250 000 € à 500 000 € | > 500 000 € |
| Couple | 500 000 € à 1 000 000 € | > 1 000 000 € |

**Base de calcul : RFR** (pas RNI), retenu **sans application du quotient** des revenus exceptionnels (art. 223 sexies, I CGI). Le RFR inclut des éléments exonérés d'IR normal (revenus au PFU, abattements réintégrés dont les cotisations PER déduites, art. 1417, IV CGI).

### À ne pas oublier

- S'ajoute à l'IR net (ne se déduit pas) ; le quotient des revenus exceptionnels allège l'IR, pas la CEHR
- **Lissage** (art. 223 sexies, II CGI ; brochure IR 2026, case 8TD) : si le RFR de l'année est au moins égal à 1,5 fois la moyenne des RFR des deux années précédentes, si chacun de ces deux RFR est resté sous le seuil d'assujettissement (250 000 € ou 500 000 €), et si les revenus passibles de l'IR en France ont excédé la moitié du RFR mondial de chacune de ces deux années (sinon cocher 8TD : calcul de droit commun), la fraction du RFR qui dépasse cette moyenne est divisée par deux pour le calcul, puis la contribution supplémentaire obtenue est multipliée par deux. Cas d'usage : une année isolée de grosses cessions. Mariage, Pacs, divorce, séparation ou décès dans l'année ou les deux années précédentes : les RFR retenus sont ceux des foyers successifs auxquels le contribuable a appartenu, et le lissage passe par une réclamation (brochure IR 2026, « Divers », p. 326).

## CDHR (Contribution Différentielle sur les Hauts Revenus)

Voir `data/bareme-ir-2025.json` → `cdhr`.

Mécanisme **distinct de la CEHR** : impose un **plancher d'imposition à 20 %** sur les foyers à hauts RFR. À ne jamais confondre avec la CEHR (les deux peuvent s'appliquer simultanément sur un même foyer).

### Base légale

- **Art. 224 CGI**, créé par l'art. 10 de la LFI 2025 (loi n° 2025-127 du 14/02/2025 ; revenus 2025, première année d'application), prorogé et modifié par la LFI 2026 (loi n° 2026-103 du 19/02/2026, art. 2) : applicable jusqu'à l'imposition des revenus de l'année pour laquelle le projet de loi d'approbation des comptes constate un déficit du budget général inférieur à 3 % du PIB (brochure IR 2026, nouveautés ; BOFiP ACTU-2026-00104)
- Doctrine : BOI-IR-CDHR-10 (version du 30/06/2026)

### Seuils de revenu de référence

| Situation | Seuil de déclenchement | Zone de décote |
|---|---|---|
| Célibataire, veuf, séparé, divorcé | > 250 000 € | jusqu'à 330 000 € |
| Couple marié ou pacsé (imposition commune) | > 500 000 € | jusqu'à 660 000 € |

### Mécanisme (BOI-IR-CDHR-10 § 100 à 370 ; brochure IR 2026, « Divers »)

```
CDHR = 20 % × RREF − décote − (IR retraité + CEHR + prélèvements libératoires + 1 500 € par personne à charge + 12 500 € si imposition commune)
```
(retenue si positive)

- **RREF** (revenu de référence) : le RFR calculé sans le quotient, dans lequel les revenus exceptionnels taxés au quotient sont retenus pour le quart, et diminué des abattements réintégrés dans le RFR autres que les abattements pour durée de détention : l'abattement de 40 % sur les dividendes, l'abattement de 50 % sur les gains d'acquisition d'actions gratuites (art. 200 A, 3) et l'abattement fixe des dirigeants n'y sont donc pas réintégrés.
- **IR retraité** : IR après réductions et crédits, majoré de certains crédits et réductions d'impôt réintégrés, diminué des trois quarts de l'impôt afférent aux revenus exceptionnels taxés au quotient.
- **Décote** : si le RREF est inférieur ou égal à 330 000 € (personne seule) ou 660 000 € (couple), la cotisation de 20 % est diminuée de la différence, si elle est positive, entre cette cotisation et 82,5 % × (RREF − 250 000 € ou 500 000 €).

Un foyer dont les revenus sont surtout des salaires au barème dépasse en général le plancher de 20 % et n'en paie rien ; la CDHR touche ceux dont l'IR effectif est faible au regard du RFR (revenus au PFU à 12,8 %, dividendes, plus-values, abattements importants). Elle est calculée par l'administration après dépôt de la 2042 ; les cases 8KD à 8KG servent à ventiler les revenus exceptionnels et les revenus à taux proportionnel.

### Distinction CEHR vs CDHR

| Critère | CEHR (art. 223 sexies CGI) | CDHR (art. 224 CGI) |
|---|---|---|
| Nature | Surtaxe additionnelle | Plancher d'imposition |
| Taux | 3 % à 4 % selon tranche RFR | 0 à 20 % selon écart au plancher |
| Mode de calcul | Direct sur le RFR | Différentiel (complète si IR + CEHR < 20 % RFR) |
| Application | Tous les foyers > seuils | Uniquement si IR effectif < 20 % du RFR |

Les deux peuvent s'appliquer simultanément : la CEHR est toujours due au-delà des seuils, la CDHR ne se déclenche qu'en cas de fort poids des revenus PFU (faiblement imposés à 12,8 % IR).

### Calendrier

- **Acompte** : 95 % du montant estimé, à verser entre le **1er et le 15 décembre** de l'année des revenus (du 1er au 15 décembre 2025 pour les revenus 2025), via le service « Gérer mon prélèvement à la source » sur impots.gouv.fr ; reporté dans les cases 8HR / 8HS de la déclaration préremplie et déduit de la contribution due
- **Pénalité de 20 %** en cas de défaut ou de retard de paiement de l'acompte, ou si l'acompte versé s'avère inférieur de plus de 20 % à 95 % de la contribution finalement due (LFI 2025, art. 10, III-C)
- **Revenus 2026** : l'acompte et les pénalités sont reconduits (LFI 2026, art. 2) ; dates exactes de l'acompte 2026 à confirmer sur impots.gouv.fr
- **Solde** : calculé automatiquement par l'administration après dépôt de la 2042 au printemps suivant

### Cas typiques touchés

- Dirigeants à fort revenu PFU dividendes (TMI effectif IR ~12,8 % alors que RFR > 250 k€)
- Business angels avec PV mobilières importantes
- Cadres exécutifs à fort RSU/BSPCE l'année de vesting/cession

### Source officielle

[impots.gouv.fr — Contribution Différentielle sur les Hauts Revenus](https://www.impots.gouv.fr/actualite/contribution-differentielle-sur-les-hauts-revenus-cdhr)

## Revenus étrangers et conventions fiscales

### Principes

- France applique le principe de **mondialité** pour les résidents : imposition sur l'ensemble des revenus (y compris étrangers)
- **Conventions fiscales bilatérales** peuvent prévoir :
  - Exonération en France (méthode de l'exemption)
  - Imposition en France avec crédit d'impôt pour l'impôt payé à l'étranger (méthode de l'imputation)

### Méthodes courantes

| Méthode | Effet |
|---------|-------|
| Exemption totale | Revenu non imposé en France |
| Exemption avec taux effectif | Revenu inclus pour le calcul du taux, mais non imposé |
| Imputation | Revenu imposé en France, crédit d'impôt = impôt payé à l'étranger (limité à l'impôt français correspondant) |

### À vérifier

- La convention fiscale **entre la France et le pays de source** du revenu
- Formulaire 2047 pour déclarer les revenus étrangers (annexe à la 2042)
- Crédits d'impôt étrangers : reports, limitations

**Zone complexe** — renvoyer vers un avocat fiscaliste pour les cas significatifs (expatriation partielle, revenus locatifs étrangers, retraites étrangères).

## Expatriation et retour en France

### Exit tax

Article 167 bis CGI — imposition des plus-values latentes sur titres lors du transfert du domicile fiscal hors de France (6 ans de domicile sur les 10 dernières années ; participations ≥ 50 % des bénéfices sociaux ou valeur globale > 800 000 €). Seuils, sursis, dégrèvement et formulaires 2074-ETD / 2074-ETS : voir [non-residents.md](non-residents.md) § 7.

### Retour en France

Régime d'**impatriation** (article 155 B CGI) : exonération partielle de l'impôt pour les impatriés sous conditions strictes. Durée 8 ans max.

**Hors scope ce skill** — renvoyer vers un avocat fiscaliste spécialisé.

## DOM-TOM

Régimes spéciaux :
- Réduction d'impôt de 30% à 40% dans les DOM (plafonnée)
- Revenus de source DOM : régime spécifique
- Investissement Girardin : mécanismes distincts

**Hors scope ce skill** pour le détail. Signaler la spécificité et renvoyer vers la documentation locale / BOFiP dédié.

## Allocations chômage et revenus de remplacement

Déclarées case **1AP / 1BP** (pas 1AJ). Bien vérifier le pré-rempli France Travail.

**Points critiques** :
- **Abattement 10 % applicable** : l'ARE est un revenu de remplacement imposé selon les règles des traitements et salaires (BOI-RSA-BASE-30-50-20). La déduction forfaitaire de 10 % s'applique sur le total salaires + ARE (plafond commun 14 555 €/membre). La déclarer en 1AP au lieu de 1AJ ne supprime PAS l'abattement.
- **CSG/CRDS sur l'ARE** (art. L. 136-8, II et III CSS ; brochure IR 2026, « Divers », tableau des contributions sociales) : assiette 98,25 % de l'allocation ; CSG à 6,2 % (taux normal), 3,8 % (taux réduit) ou exonération, selon le RFR des deux années précédentes (le taux normal ne s'applique que si le RFR a dépassé le seuil du taux réduit deux années consécutives : RFR 2022 et 2023 pour les allocations de 2025) ; CRDS 0,5 %. Un ancien cadre relève en général du taux normal de 6,2 %.
- **CSG déductible : 3,8 points** dans tous les cas (taux normal comme taux réduit), déjà retranchés du net imposable prérempli. Le prélèvement ne peut pas ramener l'allocation sous le SMIC brut (écrêtement, France Travail).
- **ARCE** (aide à la reprise ou à la création d'entreprise, 60 % des droits ARE restants versés en deux fois) : imposable comme l'ARE dans la catégorie des traitements et salaires, soumise à CSG/CRDS ; case et éligibilité au quotient à vérifier sur la notice 2042 de l'année (non vérifié). Seule l'aide NACRE est exclue des revenus imposables.

**Pourquoi 1AP et pas 1AJ ?** L'ARE n'est pas un revenu d'*activité* mais de *remplacement* : la distinction sert au prélèvement à la source et aux calculs fondés sur les seuls revenus d'activité (certaines prestations sociales), pas à l'abattement de 10 %. Elle compte en revanche pour le **plafond de déduction PER** de l'année suivante, comme les salaires (brochure IR 2026, charges déductibles : les « allocations de chômage » figurent parmi les revenus retenus).

## Professions médicales conventionnées secteur 1

Deux déductions forfaitaires spécifiques aux médecins conventionnés secteur 1
en déclaration contrôlée (BOI-BNC-SECT-40) :

- **Déduction Groupe III (2 %)** : forfait de 2 % des recettes brutes couvrant
  représentation, réception, prospection, cadeaux professionnels, travaux de
  recherche, blanchissage et petits déplacements (§ 120). Alternative au réel :
  non cumulable avec la déduction des frais réels de ces mêmes catégories.
- **Déduction complémentaire (3 %)** : 3 % calculés sur les recettes
  conventionnelles (§ 160).

Depuis la disparition du régime AGA/OGA (majoration supprimée depuis les
revenus 2023, réduction frais de comptabilité abrogée par la LF 2025), ces
forfaits constituent le principal avantage catégoriel restant pour les
médecins secteur 1. Vérifier les conditions à jour dans BOI-BNC-SECT-40 avant
application.

## Situations matrimoniales particulières

### Année du mariage / PACS

- **Imposition commune** pour l'année entière (depuis 2011)
- Ou imposition séparée sur option (cases dédiées)
- À chiffrer : selon situation des conjoints, l'une peut être plus favorable

### Année de séparation / divorce

- **Imposition séparée** pour l'année entière depuis la séparation (principe)
- Enfants à charge : attribution selon accord ou garde principale
- Case T (parent isolé) possible pour celui qui assume seul les enfants

### Année du décès d'un conjoint

- Imposition commune jusqu'au décès (du 1er janvier à la date de décès)
- Imposition individuelle du conjoint survivant pour la fin de l'année
- Deux déclarations séparées à faire

## Droit de reprise DGFIP

Délai pendant lequel la DGFIP peut redresser :

| Impôt | Délai standard |
|-------|----------------|
| IR | 3 ans (jusqu'au 31 décembre de la 3e année suivant celle de l'imposition) |
| IFI | 3 ans si la déclaration déposée révèle suffisamment l'exigibilité (LPF art. L. 180) ; 6 ans sinon (LPF art. L. 186) |
| Tous impôts | **10 ans** en cas d'activité occulte ou fraude |
| IR / IS | **10 ans** sur les revenus liés à un compte, un contrat ou un compte d'actifs numériques étranger non déclaré (art. L. 169 LPF ; pour les comptes, si le total des soldes a excédé 50 000 € dans l'année — voir [comptes-etrangers.md](comptes-etrangers.md)) |
| TVA | 3 ans |

**Conservation des documents** : minimum 6 ans (conseil : 10 ans pour couvrir tous les cas).

## PUMA (Protection universelle maladie) — cotisation subsidiaire maladie

Concerne les personnes **affiliées à l'assurance maladie française** qui tirent peu ou pas de revenus d'activité professionnelle mais disposent d'un **patrimoine générateur de revenus du capital significatifs**.

### Conditions d'assujettissement cumulatives (art. L. 380-2 CSS)

- Rattachement à l'assurance maladie française (art. L. 160-1 CSS)
- Revenus d'activité professionnelle de l'année **< 20 % du PASS** (9 420 € pour 2025, 9 612 € pour 2026) ; pour une personne mariée ou pacsée, les revenus d'activité **de l'autre membre du couple** doivent aussi rester sous ce seuil
- **Aucune pension de retraite ou d'invalidité, aucune rente, aucune allocation de chômage perçue dans l'année**, ni par la personne ni par l'autre membre du couple : une année avec de l'ARE, même un seul mois, n'est pas assujettie
- Revenus du capital (revenus fonciers, RCM, plus-values, BIC et BNC non professionnels, au sens de l'art. 1417, IV CGI) > **50 % du PASS** (23 550 € pour 2025, 24 030 € pour 2026)

### Calcul (art. D. 380-1 CSS)

```
cotisation = 6,5 % × (A − 0,5 × PASS) × (1 − R / (0,2 × PASS))
```
- A = revenus du capital de l'année, retenus dans la limite de 8 PASS (376 800 € pour 2025, 384 480 € pour 2026)
- R = revenus d'activité (le taux décroît linéairement et s'annule quand R atteint 20 % du PASS)
- PASS de l'année des revenus

Recouvrement : URSSAF, l'année suivante, d'après les données transmises par la DGFiP. Avis distinct de l'avis IR.

### À vérifier systématiquement

- Retraités : **non concernés** dès qu'une pension de retraite est perçue dans l'année
- Rentiers avant retraite (FIRE) sans ARE ni pension → souvent concernés
- Année de fin de droits au chômage : l'année où les derniers jours d'ARE sont versés reste exemptée ; la première année civile entière sans ARE ni pension devient assujettie
- Personnes en congé sabbatique avec revenus du capital → vérifier (salaire résiduel sous 20 % du PASS ?)

### Nuance

- **Non déductible** de l'IR (contrairement à la CSG sur revenus d'activité)
- Cumul avec les prélèvements sociaux sur les mêmes revenus du capital (18,6 % sur les revenus mobiliers dès 2025 ou 2026 selon leur nature, 17,2 % sur les revenus fonciers et l'assurance-vie) : pas de double comptage, mais la pression globale s'additionne

**Piège fréquent** : oublier la PUMA dans la simulation globale d'un FIRE / rentier → sous-estimation de ~6,5 % sur les revenus du capital hors seuil.

## Régularisation spontanée

**Intérêt** : réduction des pénalités si le contribuable rectifie avant contrôle.

- Intérêts de retard : 0,2%/mois
- Pas de majoration si régularisation spontanée et bonne foi

**Quand envisager** : oubli de déclaration (crypto, revenus étrangers, plus-values). Orienter vers un avocat fiscaliste pour les cas significatifs (régularisation structurée).

## Références CGI / BOFiP

- Résidence fiscale : art. 4 B CGI
- Non-résidents : art. 164 A à 165 et 197 A CGI (détail : [non-residents.md](non-residents.md))
- Revenus exceptionnels : art. 163-0 A CGI
- CEHR : art. 223 sexies CGI
- Exit tax : art. 167 bis CGI
- Impatriation : art. 155 B CGI
- Droit de reprise : LPF (Livre des Procédures Fiscales)
- PUMA / cotisation subsidiaire maladie : art. L. 380-2 CSS
- BOFiP : BOI-INT (conventions internationales), BOI-IR-LIQ
