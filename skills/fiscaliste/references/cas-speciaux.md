# Cas particuliers

## Non-résidents fiscaux

### Définition résidence fiscale

Un contribuable est résident fiscal français si l'un de ces critères est rempli (article 4 B CGI) :
- Foyer ou lieu de séjour principal en France
- Exercice d'une activité professionnelle principale en France
- Centre des intérêts économiques en France

**La nationalité n'est pas un critère.**

### Règles applicables aux non-résidents

- Imposés uniquement sur les **revenus de source française** (article 164 A CGI)
- Taux minimum : 20% sur la fraction ≤ 27 519 € et 30% au-delà (revenus 2025)
- Pas de quotient familial au-delà de 2 parts
- Pas de décote
- Application des conventions fiscales bilatérales (crédit d'impôt, exonérations)

**Ce skill ne couvre PAS la fiscalité des non-résidents en détail.** Pour les cas complexes, orienter vers un avocat fiscaliste spécialisé en fiscalité internationale.

## Revenus exceptionnels : quotient

### Mécanisme

Lissage fiscal pour éviter qu'un revenu ponctuel ne fasse franchir artificiellement plusieurs tranches.

**Formule** :
```
Impôt_supplémentaire = [IR(revenu_ordinaire + revenu_exceptionnel / coefficient) − IR(revenu_ordinaire)] × coefficient
```

**Coefficient par défaut : 4**. Peut être différent selon la nature du revenu.

### Revenus éligibles

- Prime exceptionnelle (non pérennisable)
- Indemnité de départ volontaire ou licenciement (fraction imposable)
- Gratification de fin d'activité
- Vesting RSU massif (exceptionnellement élevé vs revenus habituels)
- Régularisation d'arriérés de salaire
- Plus-value de cession d'entreprise (cas spécifiques)

### Conditions d'application

- Revenu > **moyenne des revenus imposables des 3 années précédentes**
- Caractère exceptionnel avéré (non récurrent)
- Demande expresse du contribuable sur la déclaration

### Nuance critique

**Inutile si foyer déjà au TMI 45%** : le taux marginal ne change pas avec la division par 4.

**Très utile si** :
- TMI habituel 30% et revenu exceptionnel fait passer à 41%
- TMI habituel 11% et revenu exceptionnel fait passer à 30% ou 41%

### Exemple

Foyer célibataire, RNI habituel 40 000 € (TMI 30%), vesting RSU 80 000 € imposé comme salaire.

**Sans quotient** :
- RNI total : 120 000 €
- Impôt approximatif : ~32 000 €

**Avec quotient (coefficient 4)** :
- Revenu fractionné : 40 000 + 80 000/4 = 60 000 €
- Impôt sur 60 000 € : ~12 000 €
- Impôt sur 40 000 € : ~5 100 €
- Supplément × 4 : (12 000 − 5 100) × 4 = 27 600 €
- Impôt total : 5 100 + 27 600 = ~32 700 €

Dans cet exemple, peu de gain car le revenu ordinaire est déjà en tranche 30%. L'intérêt est marginal.

**Règle** : chiffrer systématiquement les deux scénarios avant de recommander le quotient.

## CEHR (Contribution Exceptionnelle Hauts Revenus)

Voir `data/bareme-ir-2025.json` → `cehr`. Base légale : art. 223 sexies CGI.

### Seuils (revenus 2025)

| Situation | Tranche 3% | Tranche 4% |
|-----------|-----------|-----------|
| Célibataire | 250 000 € à 500 000 € | > 500 000 € |
| Couple | 500 000 € à 1 000 000 € | > 1 000 000 € |

**Base de calcul : RFR** (pas RNI). Le RFR inclut des éléments exonérés d'IR normal (certains revenus capital, abattements réintégrés).

### À ne pas oublier

- S'ajoute à l'IR net (ne se déduit pas)
- Lissage possible sur la moyenne des 2 années précédentes (article 223 sexies CGI)

## CDHR (Contribution Différentielle sur les Hauts Revenus)

Voir `data/bareme-ir-2025.json` → `cdhr`.

Mécanisme **distinct de la CEHR** : impose un **plancher d'imposition à 20 %** sur les foyers à hauts RFR. À ne jamais confondre avec la CEHR (les deux peuvent s'appliquer simultanément sur un même foyer).

### Base légale

- Art. 224 CGI, créé par l'**art. 10 de la LFI 2025** (loi n° 2025-127 du 14/02/2025)
- **Pérennisée par la LFI 2026** jusqu'au retour du déficit public sous 3 % du PIB (donc applicable aux revenus 2025+ jusqu'à condition de fin)

### Seuils RFR

| Situation | Seuil de déclenchement |
|---|---|
| Célibataire, veuf, séparé, divorcé | RFR > 250 000 € |
| Couple marié ou pacsé (imposition commune) | RFR > 500 000 € |

### Mécanisme

La CDHR s'applique lorsque le **taux moyen d'imposition** (IR + CEHR, après réductions et crédits d'impôt) reste **inférieur à 20 % du RFR retraité**. Elle vient combler la différence pour atteindre ce plancher de 20 %.

Calcul automatique par l'administration après dépôt de la 2042. Pas de case spécifique à remplir manuellement.

### Distinction CEHR vs CDHR

| Critère | CEHR (art. 223 sexies CGI) | CDHR (art. 224 CGI) |
|---|---|---|
| Nature | Surtaxe additionnelle | Plancher d'imposition |
| Taux | 3 % à 4 % selon tranche RFR | 0 à 20 % selon écart au plancher |
| Mode de calcul | Direct sur le RFR | Différentiel (complète si IR + CEHR < 20 % RFR) |
| Application | Tous les foyers > seuils | Uniquement si IR effectif < 20 % du RFR |

Les deux peuvent s'appliquer simultanément : la CEHR est toujours due au-delà des seuils, la CDHR ne se déclenche qu'en cas de fort poids des revenus PFU (faiblement imposés à 12,8 % IR).

### Calendrier

- **Acompte** : 95 % du montant estimé à verser entre le **1er et le 15 décembre** de l'année des revenus, via le service "Prélèvement à la source" sur impots.gouv.fr
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

Article 167 bis CGI — imposition immédiate des plus-values latentes sur titres détenus lors du départ à l'étranger, si :
- Résidence fiscale française pendant au moins 6 ans sur les 10 dernières années
- Détention de titres > seuils (plusieurs catégories de seuils)

Sursis de paiement possible dans certains cas. Régime complexe.

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
- CSG prélevée à taux réduit à la source
- La fraction de CSG prélevée à taux réduit n'est pas déductible du revenu imposable

**Pourquoi 1AP et pas 1AJ ?** L'ARE n'est pas un revenu d'*activité* mais de *remplacement* : la distinction compte pour les calculs fondés sur les seuls revenus d'activité (plafond de déduction PER, certaines prestations sociales), pas pour l'abattement de 10 %.

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
| IFI | 6 ans (cas général) |
| Tous impôts | **10 ans** en cas d'activité occulte ou fraude |
| TVA | 3 ans |

**Conservation des documents** : minimum 6 ans (conseil : 10 ans pour couvrir tous les cas).

## PUMA (Protection universelle maladie) — cotisation subsidiaire maladie

Concerne les personnes **affiliées à l'assurance maladie française** qui tirent peu ou pas de revenus d'activité professionnelle mais disposent d'un **patrimoine générateur de revenus du capital significatifs**.

### Conditions d'assujettissement cumulatives

- Rattachement à un régime d'assurance maladie français
- Revenus d'activité professionnelle **< 20 % du PASS** (≈ 9 420 € pour 2025)
- Revenus du capital (RCM, PV, revenus fonciers) > **50 % du PASS** (≈ 23 550 € pour 2025)

### Calcul

Assiette = revenus du patrimoine − abattement (50 % du PASS).
Taux : **6,5 %** appliqué à l'assiette (taux plafonné à 8 × PASS = ~376 k€ de base pour 2025).

Recouvrement : URSSAF, pas DGFIP. Avis distinct de l'avis IR.

### À vérifier systématiquement

- Retraités avec patrimoine significatif (dividendes, loyers) → potentiellement concernés
- Rentiers avant retraite → souvent concernés
- Personnes en congé sabbatique avec revenus du capital → vérifier

### Nuance

- **Non déductible** de l'IR (contrairement à la CSG sur revenus d'activité)
- Cumul avec les prélèvements sociaux 17,2 % sur les mêmes revenus du capital (pas de double comptage, mais additionne à la pression fiscale globale)

**Piège fréquent** : oublier la PUMA dans la simulation globale d'un FIRE / rentier → sous-estimation de ~6,5 % sur les revenus du capital hors seuil.

## Régularisation spontanée

**Intérêt** : réduction des pénalités si le contribuable rectifie avant contrôle.

- Intérêts de retard : 0,2%/mois
- Pas de majoration si régularisation spontanée et bonne foi

**Quand envisager** : oubli de déclaration (crypto, revenus étrangers, plus-values). Orienter vers un avocat fiscaliste pour les cas significatifs (régularisation structurée).

## Références CGI / BOFiP

- Résidence fiscale : art. 4 B CGI
- Non-résidents : art. 164 A à 165 CGI
- Revenus exceptionnels : art. 163-0 A CGI
- CEHR : art. 223 sexies CGI
- Exit tax : art. 167 bis CGI
- Impatriation : art. 155 B CGI
- Droit de reprise : LPF (Livre des Procédures Fiscales)
- PUMA / cotisation subsidiaire maladie : art. L. 380-2 CSS
- BOFiP : BOI-INT (conventions internationales), BOI-IR-LIQ
