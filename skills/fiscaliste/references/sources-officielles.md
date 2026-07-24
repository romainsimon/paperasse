# Sources officielles

Registre des URL, articles CGI et doctrines BOFiP à citer dans les réponses. L'objectif : qu'un utilisateur puisse vérifier **chaque règle** invoquée par le skill.

## Règle de traçabilité

Pour chaque règle appliquée dans une réponse, citer :
1. **L'article du CGI** (source de droit positif)
2. **La doctrine BOFiP** applicable (interprétation administrative opposable)
3. **La page service-public.fr** correspondante si elle existe (vulgarisation)

Si une règle ne peut pas être sourcée, **le dire explicitement** et inviter à vérifier sur impots.gouv.fr.

## Sites officiels

| Site | URL | Contenu |
|------|-----|---------|
| **impots.gouv.fr** | https://www.impots.gouv.fr | Déclaration, paiement, messagerie DGFIP, documents |
| **BOFiP-Impôts** | https://bofip.impots.gouv.fr | Doctrine administrative opposable (BOI) |
| **Légifrance** | https://www.legifrance.gouv.fr | Texte officiel du CGI et des lois de finances |
| **service-public.fr** | https://www.service-public.fr/particuliers/vosdroits | Vulgarisation officielle |
| **data.gouv.fr** | https://www.data.gouv.fr | Jeux de données publiques (barèmes, statistiques) |

## Simulateurs officiels

| Simulateur | URL | Usage |
|-----------|-----|-------|
| **IR / IFI (année en cours)** | https://simulateur-ir-ifi.impots.gouv.fr/calcul_impot/2026/ | Simulation revenus 2025 |
| **IR simplifié** | https://www.impots.gouv.fr/simulateurs | Liste des simulateurs officiels |
| **Plus-value immobilière** | https://www.impots.gouv.fr/simulateur-de-plus-value-immobiliere | Calcul PV immo nette |

**Note** : le simulateur IR/IFI 2026 n'expose pas d'API JSON publique. Pour les évaluations automatisées de ce skill, il peut servir d'**oracle manuel** (lancer la simulation, comparer avec nos calculs).

## Articles CGI essentiels

### IR — mécanisme général

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| Barème progressif | art. 197 | BOI-IR-LIQ-20 |
| Quotient familial | art. 193 à 196 B | BOI-IR-LIQ-10-20-20 |
| Décote | art. 197-I-4 | BOI-IR-LIQ-20-20-40 |
| CEHR | art. 223 sexies | BOI-IR-CHR |
| Quotient revenus exceptionnels | art. 163-0 A | BOI-IR-LIQ-20-30 |
| Prélèvement à la source | art. 204 A et s. | BOI-IR-PAS |

### Revenus catégoriels

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| Traitements et salaires — abattement 10 % | art. 83-3° | BOI-RSA-BASE-30 |
| Pensions — abattement 10 % | art. 158-5-a | BOI-RSA-PENS-30 |
| Revenus fonciers — micro | art. 32 | BOI-RFPI-DECLA-20 |
| Revenus fonciers — régime réel | art. 28 et s. | BOI-RFPI-BASE |
| Déficit foncier | art. 156-I-3° | BOI-RFPI-BASE-30 |
| LMNP / LMP | art. 155 IV, art. 151 septies | BOI-BIC-CHAMP-40 |

### Revenus du capital

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| PFU (flat tax) | art. 200 A | BOI-RPPM-RCM-30 |
| Option barème globale | art. 200 A-2 | BOI-RPPM-RCM-20 |
| Abattement 40 % dividendes | art. 158-3° | BOI-RPPM-RCM-20-10-20 |
| Plus-values mobilières | art. 150-0 A à 150-0 D | BOI-RPPM-PVBMI |
| PEA | art. 157-5° bis | BOI-RPPM-RCM-40-50 |
| Assurance-vie — rachats | art. 125-0 A, 200 A | BOI-RPPM-RCM-20-10-20-50 |
| CSG déductible 6,8 % | art. 154 quinquies-II | BOI-IR-BASE-20-20 |
| Prélèvements sociaux | art. L. 136-1 et s. CSS | BOI-RPPM-PSOC |
| Crypto — PAMC | art. 150 VH bis | BOI-RPPM-PVBMC |

### Equity salarial

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| RSU — gain d'acquisition | art. 80 quaterdecies | BOI-RSA-ES-20 |
| Stock-options | art. 80 bis | BOI-RSA-ES-10 |
| BSPCE | art. 163 bis G | BOI-RSA-ES-30 |
| PEE | art. L. 3332-1 C. trav. | BOI-RSA-ES-10-10 |

### Épargne retraite

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| PER individuel — déduction | art. 163 quatervicies | BOI-IR-BASE-20-50-20 |
| Plafond de déduction | art. 163 quatervicies-I-2 | idem |
| Sortie en capital — part capital | art. 158-5-b bis | idem |
| Mutualisation couple | art. 163 quatervicies-I-2° | idem |

### IFI

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| Assujettissement, seuil 1,3 M€ | art. 964 et s. | BOI-PAT-IFI-10 |
| Abattement 30 % résidence principale | art. 973 | BOI-PAT-IFI-20-20-20 |
| Barème | art. 977 | BOI-PAT-IFI-40 |
| Plafonnement 75 % | art. 979 | BOI-PAT-IFI-40-30 |

### Déductions, réductions et crédits

| Règle | Article CGI | BOFiP |
|-------|------------|-------|
| Plafonnement global 10 000 € | art. 200-0 A | BOI-IR-LIQ-20-20-10 |
| Dons aux œuvres | art. 200 | BOI-IR-RICI-250 |
| Emploi à domicile | art. 199 sexdecies | BOI-IR-RICI-150 |
| Garde d'enfant hors domicile | art. 200 quater B | BOI-IR-RICI-300 |
| Pinel | art. 199 novovicies | BOI-IR-RICI-360 |
| FCPI / FIP | art. 199 terdecies-0 A | BOI-IR-RICI-100 |
| Pension alimentaire | art. 156-II-2° | BOI-IR-BASE-20-30 |

## Ouvrages de doctrine DGFIP (référence annuelle)

- **Précis de fiscalité** (DGFIP, annuel) : https://www.impots.gouv.fr/documentation
- **Brochure pratique IR** (Direction Générale des Finances Publiques, annuelle) : notice 2042

## Lois de finances (vérifier chaque année)

- LFI de l'année N : fixe le barème des revenus N-1 (indexation PLF)
- LFSS de l'année N : fixe les taux de prélèvements sociaux applicables aux revenus encaissés à partir du 1er janvier N
- **Attention aux dates d'application** : une LFI votée fin N-1 s'applique aux revenus N-1 (déclarés en N) ; une LFSS votée fin N-1 s'applique aux encaissements à partir du 1er janvier N.

## Lien MEDEF / cabinets — ne JAMAIS citer comme source primaire

Les publications de cabinets d'avocats, fédérations professionnelles ou éditeurs (Dalloz, Lamy, Francis Lefebvre) **n'ont pas valeur opposable**. Les utiliser uniquement comme pédagogie ou piste d'investigation — jamais comme justification d'une règle.

**Source opposable** = CGI + BOFiP + jurisprudence publiée (Conseil d'État, Cour de cassation).

## Vérification automatisée

Pour un eval du skill qui teste une règle :
1. Citer l'article CGI dans l'output attendu
2. Si la règle vient uniquement de BOFiP, citer l'identifiant BOI
3. Ne jamais citer un simulateur comme source d'une règle (il applique les règles, il ne les crée pas)
