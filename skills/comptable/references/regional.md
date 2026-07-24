# Spécificités Régionales - DOM-TOM & Alsace-Moselle

## DOM-TOM (Départements et Régions d'Outre-Mer)

### Guadeloupe, Martinique, Réunion

#### TVA

| Taux | Application |
|------|-------------|
| 8,5% | Taux normal (vs 20% en métropole) |
| 2,1% | Taux réduit |
| 1,75% | Taux particulier (presse) |
| 1,05% | Taux super-réduit |

#### Octroi de Mer

Taxe spécifique aux DOM sur les importations et productions locales.

**Taux:** Variable selon produit et département (0% à 60%)
**Déclaration:** Mensuelle auprès de la douane

**Comptabilisation:**
```
Achat avec octroi de mer:
  Débit 607 Achats marchandises      X XXX,XX
  Débit 6353 Octroi de mer             XXX,XX
  Crédit 401 Fournisseur             X XXX,XX
```

#### Impôt sur les Sociétés - Abattements

**Abattement de 50%** sur les bénéfices pour certaines activités:
- Limité à 150 000 €/an
- Secteurs éligibles: industrie, BTP, transport, tourisme, audiovisuel, énergies renouvelables

**Conditions:**
- Siège et activité principale dans les DOM
- Effectif minimum de 3 salariés (selon secteur)

#### ~~Exonérations ZFA (Zone Franche d'Activité)~~ — REMPLACÉ par ZFANG depuis 2019

> ⚠️ La ZFA est éteinte. Le dispositif applicable depuis le 1er janvier 2019 est la **ZFANG** (art. 19 Loi de finances 2018). Ne pas appliquer les anciens taux ZFA.

#### ZFANG — Zone Franche d'Activité Nouvelle Génération

**Base légale :** Art. 44 quaterdecies CGI (abattement IS/IR) — Art. 1466 F CGI (CFE) — Art. 49 ZB-ZC annexe III CGI (modalités) — Loi n°2018-1317 du 28 décembre 2018, art. 19

**Source BOFiP :** BOI-BIC-CHAMP-80-10-85 (consulté 2026-05-08 via https://bofip.impots.gouv.fr/bofip/11833-PGP.html)

**Durée du dispositif :** jusqu'au 31 décembre 2030 (abrogation au 1er janvier 2031)

##### Abattement IS / IR (bénéfices)

Deux régimes selon le secteur d'activité. Les taux sont **fixes** (pas de dégressivité annuelle contrairement à l'ancienne ZFA) :

| Régime | Abattement | Plafond bénéfice abattu/an |
|--------|-----------|---------------------------|
| **Standard** (droit commun) | **50%** | 150 000 € |
| **Majoré** (secteurs prioritaires) | **80%** | 300 000 € (dont 150 000 € max sur base standard) |
| **Mayotte uniquement** 2025-2029 | **100%** | — (temporaire, régime exceptionnel) |

**Secteurs prioritaires** (régime majoré 80%) applicables à La Réunion :
- Recherche et développement
- Technologies de l'information et de la communication (TIC)
- Tourisme (hôtellerie, restauration inclus)
- Agro-nutrition
- Environnement et énergies renouvelables
- BTP
- Réparation navale, édition de jeux électroniques

**Régime standard (50%)** : activités commerciales, industrielles, artisanales, agricoles (BIC/BA) hors secteurs exclus.

##### Conditions cumulatives d'éligibilité

1. **Taille** : effectif < 250 salariés ET CA < 50 millions €
2. **Activité principale** : exercée dans un DOM, secteur éligible
3. **Régime fiscal** : régime réel (IS ou IR) ou micro
4. **Localisation** : exploitation physique située dans la ZFANG

**Secteurs exclus :**
- Professions libérales BNC (médecins, avocats, experts-comptables…)
- Activités financières et assurances
- Sièges sociaux intragroupes sans activité propre
- Sidérurgie, charbon, lignite
- Jeux d'argent et de hasard
- Achat-revente sans transformation (négoce pur)

##### CFE (Cotisation Foncière des Entreprises) — Art. 1466 F CGI

Exonération totale possible — **soumise à délibération de la collectivité**. Vérifier que la commune a adopté la délibération avant d'annoncer l'exonération au client.

##### CVAE

Exonération proportionnelle à la fraction de valeur ajoutée bénéficiant de l'abattement ZFANG.

##### Taxe Foncière

Exonération possible sur délibération des collectivités (non automatique).

##### Cumul

**Compatible avec :**
- Crédit Impôt Recherche (CIR)
- Déduction art. 217 undecies CGI (investissements outre-mer)

**Incompatible (option irrévocable requise) :**
- Art. 44 sexies CGI (entreprises nouvelles)
- Art. 44 terdecies CGI (ZRR)
- Art. 44 sexdecies CGI (zones de revitalisation des commerces)
- Art. 73 B CGI (jeunes agriculteurs)

##### Comptabilisation de l'abattement

L'abattement ZFANG ne génère pas d'écriture comptable — il s'applique extra-comptablement lors du calcul IS :

```
Bénéfice fiscal avant ZFANG :       200 000 €
Abattement 80% (secteur prioritaire): -160 000 €  → plafonné à 300 000 €/an
Base IS imposable :                   40 000 €
IS à 15% (PME, < 42 500 €) :          6 000 €
```

##### Obligations déclaratives

- **Formulaire 2082-SD** (CERFA 14043) à joindre obligatoirement à la déclaration de résultats (2065 IS ou 2031/2035 IR)
- Le 2082-SD détaille : CA, effectifs, exploitations concernées, bénéfices par exploitation, taux appliqué, répartitions
- Conserver les justificatifs d'éligibilité (secteur, siège social, effectifs, CA)

#### Cotisations Sociales

**Réduction LODEOM** (Loi pour le Développement Économique des Outre-Mer):
- Réduction renforcée des charges patronales
- Conditions: salaire ≤ 1,3 à 2,5 SMIC selon le cas

---

### Guyane et Mayotte

#### TVA

**Exonération totale** - Pas de TVA applicable.

Les entreprises ne facturent pas de TVA et ne peuvent pas déduire de TVA.

**Mention sur factures:** "TVA non applicable - Article 294 du CGI"

#### Octroi de Mer

S'applique comme dans les autres DOM.

#### Impôt sur les Sociétés

Mêmes abattements que Guadeloupe/Martinique/Réunion (50%).

---

### Saint-Pierre-et-Miquelon, Saint-Barthélemy, Saint-Martin

#### Statut fiscal particulier

Ces collectivités ont une **autonomie fiscale**.

**Saint-Barthélemy:**
- Pas d'impôt sur le revenu
- Pas de TVA
- Fiscalité propre votée par la collectivité

**Saint-Martin:**
- Autonomie fiscale depuis 2007
- Compétence propre en matière fiscale

**Saint-Pierre-et-Miquelon:**
- Fiscalité spécifique
- Pas de TVA
- Droits de douane particuliers

⚠️ **Attention:** Consulter un expert local pour ces territoires.

---

## Alsace-Moselle (Départements 57, 67, 68)

### Droit Local Alsacien-Mosellan

Héritage du droit allemand (1871-1918), certaines dispositions spécifiques subsistent.

### Registre du Commerce

**Livre foncier (Grundbuch)** au lieu du cadastre classique.
- Tenu par le tribunal judiciaire
- Inscription constitutive des droits réels

### Faillites et Procédures Collectives

Procédure de faillite civile pour les particuliers (non applicable aux entreprises).

### Assurance Maladie - Régime Local

**Cotisation supplémentaire** pour le régime local d'Alsace-Moselle:

| Cotisation | Taux |
|------------|------|
| Part salariale | 1,30% |
| Part patronale | 0% |

**Avantage:** Remboursements supérieurs (90% au lieu de 70% pour consultations).

### Jours Fériés Supplémentaires

2 jours fériés supplémentaires:
- **Vendredi Saint** (vendredi avant Pâques)
- **26 décembre** (Saint-Étienne)

Impact sur le calcul des congés et heures travaillées.

### Taxe d'Apprentissage

**Taux réduit:** 0,44% (vs 0,68% en métropole)

### Associations

**Régime local des associations:**
- Inscription au registre du tribunal
- Capacité juridique élargie (propriété immobilière sans autorisation)

### Clauses Particulières Contrats de Travail

- Délai de préavis parfois différent
- Clause de non-concurrence encadrée différemment
- Certaines dispositions du Code du travail non applicables

---

## Tableau Récapitulatif TVA

| Territoire | Normal | Réduit | Particularité |
|------------|--------|--------|---------------|
| Métropole | 20% | 5,5% / 10% | Standard |
| Guadeloupe | 8,5% | 2,1% | + Octroi de mer |
| Martinique | 8,5% | 2,1% | + Octroi de mer |
| Réunion | 8,5% | 2,1% | + Octroi de mer |
| Guyane | 0% | 0% | Exonéré |
| Mayotte | 0% | 0% | Exonéré |
| St-Pierre-et-Miquelon | 0% | 0% | Autonomie fiscale |
| Saint-Barthélemy | 0% | 0% | Autonomie fiscale |
| Saint-Martin | N/A | N/A | Autonomie fiscale |

---

## Corse

### TVA

Taux spécifiques pour certains produits:

| Produit | Taux Corse | Taux Métropole |
|---------|------------|----------------|
| Produits pétroliers | 13% | 20% |
| Matériaux construction | 10% | 20% |
| Ventes à consommer sur place | 10% | 10% |

### Crédit d'Impôt Corse

**Crédit d'impôt pour investissements:**
- Taux: 20% des investissements productifs
- Secteurs: industrie, artisanat, hôtellerie, agriculture
- Plafond: 300 000 € par période de 3 ans

### Exonérations Zonées

**Zone Franche Urbaine (ZFU):**
- Exonération IS progressive sur 5 ans
- Exonération CFE
- Conditions d'implantation et d'emploi local

---

## Points d'Attention

### Facturation Inter-Régions

**DOM vers Métropole:**
- Considéré comme exportation
- TVA: Exonération avec droit à déduction

**Métropole vers DOM:**
- Considéré comme importation pour le DOM
- Octroi de mer applicable

### Déclarations

Les déclarations fiscales suivent généralement le régime métropolitain avec adaptations:
- Mêmes formulaires (2065, 2031, CA3...)
- Taux différents à appliquer
- Lignes spécifiques pour DOM/TOM

### Recommandation

Pour les opérations complexes impliquant ces territoires:
1. Vérifier le régime fiscal applicable
2. Consulter les services fiscaux locaux
3. Faire valider par un expert-comptable connaissant le droit local

⚠️ **Ce document est un résumé.** Les régimes fiscaux ultramarins et locaux sont complexes et évolutifs. Toujours vérifier les dispositions en vigueur.
