# Liasse Fiscale — Régime Simplifié (2033)

**{{company.name}}** — Exercice du {{company.fiscal_year.start_formatted}} au {{company.fiscal_year.end_formatted}}

---

> Ce document sert de brouillon de travail pour préparer la liasse fiscale.
> La version définitive doit être transmise via EDI-TDFC sur impots.gouv.fr.

---

## Formulaire 2065-SD — Déclaration de Résultat

| Case | Libellé | Montant |
|---|---|---:|
| **Identification** | | |
| | Dénomination | {{company.name}} |
| | SIREN | {{company.siren}} |
| | Adresse | {{company.address}} |
| | Activité | {{company.naf}} |
| | Exercice du ... au ... | {{company.fiscal_year.start_formatted}} au {{company.fiscal_year.end_formatted}} |
| | Durée (en mois) | .......... |
| **Résultat fiscal** | | |
| 1 | Résultat comptable (bénéfice ou perte) | .......... |
| 2 | Réintégrations extra-comptables | .......... |
| 3 | Déductions extra-comptables | .......... |
| 4 | **Résultat fiscal** (1 + 2 - 3) | .......... |
| **Impôt** | | |
| 5 | IS au taux réduit de 15% (max 42 500 EUR prorata) | .......... |
| 6 | IS au taux normal de 25% | .......... |
| 7 | **Total IS brut** | .......... |
| 8 | Acomptes versés | .......... |
| 9 | Crédits d'impôt | .......... |
| 10 | **IS net à payer (ou crédit)** | .......... |

### Conditions du taux réduit PME (15%)

- [ ] CA HT < 10 000 000 EUR (prorata si exercice court)
- [ ] Capital entièrement libéré
- [ ] Capital détenu à 75%+ par des personnes physiques
- [ ] Bénéfice imposé au taux réduit plafonné à 42 500 EUR (prorata si exercice court)

### Réintégrations courantes

| Élément | Base légale | Montant |
|---|---|---:|
| Amendes et pénalités | Art. 39-2 CGI | .......... |
| Taxe sur véhicules de société (ex-TVS) | Art. 39-4 CGI | .......... |
| Charges somptuaires | Art. 39-4 CGI | .......... |
| Amortissements excédentaires véhicules | Art. 39-4 CGI | .......... |
| **Total réintégrations** | | **..........** |

### Déductions courantes

| Élément | Base légale | Montant |
|---|---|---:|
| Produits non imposables | | .......... |
| Déficits antérieurs reportés | Art. 209-I CGI | .......... |
| **Total déductions** | | **..........** |

---

## 2033-A — Bilan Simplifié

### Actif

| Case | Libellé | Brut | Amort. | Net |
|---|---|---:|---:|---:|
| AA | Immobilisations incorporelles | | | |
| AB | Immobilisations corporelles | | | |
| | dont matériel informatique | | | |
| AX | Total actif immobilisé | | | |
| | | | | |
| BB | Stocks et en-cours | | | |
| BH | Créances clients | | | |
| BJ | Autres créances | | | |
| BN | Disponibilités | | | |
| BP | Charges constatées d'avance | | | |
| BT | **Total actif** | | | |

### Passif

| Case | Libellé | Montant |
|---|---|---:|
| DA | Capital social | |
| DC | Réserve légale | |
| DF | Report à nouveau | |
| DI | Résultat de l'exercice | |
| DL | Total capitaux propres | |
| | | |
| DN | Provisions | |
| DQ | Emprunts | |
| DS | Fournisseurs | |
| DT | Dettes fiscales et sociales | |
| DV | Compte courant d'associé | |
| DW | Produits constatés d'avance | |
| DX | **Total passif** | |

---

## 2033-B — Compte de Résultat Simplifié

| Case | Libellé | Montant |
|---|---|---:|
| FA | Ventes de marchandises | |
| FB | Production vendue (biens) | |
| FC | Production vendue (services) | |
| FD | Chiffre d'affaires net (FA+FB+FC) | |
| FE | Production stockée | |
| FF | Production immobilisée | |
| FG | Subventions d'exploitation | |
| FH | Autres produits | |
| FI | **Total produits d'exploitation** | |
| | | |
| FJ | Achats de marchandises | |
| FK | Variation de stocks (marchandises) | |
| FL | Achats de matières et fournitures | |
| FM | Variation de stocks (matières) | |
| FN | Autres charges externes | |
| FO | Impôts et taxes | |
| FP | Salaires et traitements | |
| FQ | Charges sociales | |
| FR | Dotations aux amortissements | |
| FS | Dotations aux provisions | |
| FT | Autres charges | |
| FU | **Total charges d'exploitation** | |
| FV | **Résultat d'exploitation** (FI-FU) | |
| | | |
| FW | Produits financiers | |
| FX | Charges financières | |
| FY | **Résultat financier** (FW-FX) | |
| | | |
| GA | Produits exceptionnels | |
| GB | Charges exceptionnelles | |
| GC | **Résultat exceptionnel** (GA-GB) | |
| | | |
| GD | IS | |
| GE | **Résultat net** | |

---

## 2033-C — Immobilisations, Amortissements, Plus-Values

### Tableau des immobilisations

| Libellé | Valeur début | Acquisitions | Cessions | Valeur fin |
|---|---:|---:|---:|---:|
| Immo. incorporelles | | | | |
| Immo. corporelles | | | | |
| dont matériel informatique | | | | |
| **Total** | | | | |

### Tableau des amortissements

| Libellé | Cumul début | Dotation | Reprises (cessions) | Cumul fin |
|---|---:|---:|---:|---:|
| Immo. incorporelles | | | | |
| Immo. corporelles | | | | |
| **Total** | | | | |

---

## 2033-D — Provisions, Déficits Reportés

### Provisions

| Nature | Montant début | Dotation | Reprise | Montant fin |
|---|---:|---:|---:|---:|
| Provisions pour risques | | | | |
| Provisions pour charges | | | | |
| **Total** | | | | |

### Déficits antérieurs

| Exercice | Montant | Imputé | Reporté |
|---|---:|---:|---:|
| | | | |
| **Total** | | | |

---

## Vérification

- [ ] 2033-A actif = 2033-A passif
- [ ] 2033-B résultat net = 2033-A résultat de l'exercice (case DI)
- [ ] 2033-C valeur fin = 2033-A immobilisations brutes
- [ ] 2033-C amort. fin = 2033-A amortissements
- [ ] 2065 résultat fiscal cohérent avec 2033-B + réintégrations/déductions
- [ ] IS calculé = 2065 case 7
