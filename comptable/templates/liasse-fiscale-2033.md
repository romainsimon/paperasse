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

Numéros de ligne du formulaire n° 2033-A-SD (millésime 2026). Pour l'actif : ligne de la colonne « Brut » / ligne de la colonne « Amortissements – Provisions » ; la colonne « Net » n'a pas de numéro.

### Actif

| Ligne | Libellé | Brut | Amort. | Net |
|---|---|---:|---:|---:|
| 010 / 012 | Fonds commercial | | | |
| 014 / 016 | Autres immobilisations incorporelles | | | |
| 028 / 030 | Immobilisations corporelles | | | |
| | dont matériel informatique | | | |
| 040 / 042 | Immobilisations financières | | | |
| 044 / 048 | Total I (actif immobilisé) | | | |
| | | | | |
| 050 / 052 | Matières premières, approvisionnements, en-cours de production | | | |
| 060 / 062 | Marchandises | | | |
| 064 / 066 | Avances et acomptes versés sur commandes | | | |
| 068 / 070 | Clients et comptes rattachés | | | |
| 072 / 074 | Autres créances | | | |
| 080 / 082 | Valeurs mobilières de placement | | | |
| 084 / 086 | Disponibilités | | | |
| 092 / 094 | Charges constatées d'avance | | | |
| 096 / 098 | Total II (actif circulant) | | | |
| 110 / 112 | **Total général (I + II)** | | | |

### Passif

| Ligne | Libellé | Montant |
|---|---|---:|
| 120 | Capital social ou individuel | |
| 126 | Réserve légale | |
| 132 | Autres réserves | |
| 134 | Report à nouveau | |
| 136 | Résultat de l'exercice | |
| 142 | Total I (capitaux propres) | |
| | | |
| 154 | Total II (provisions pour risques et charges) | |
| 156 | Emprunts et dettes assimilées | |
| 166 | Fournisseurs et comptes rattachés | |
| 172 | Dettes fiscales et sociales (dont TVA : case 169) | |
| 173 | Comptes courants d'associés | |
| 175 | Autres dettes | |
| 174 | Produits constatés d'avance | |
| 176 | Total III (dettes) | |
| 180 | **Total général (I + II + III)** | |

---

## 2033-B — Compte de Résultat Simplifié

Numéros de ligne du formulaire n° 2033-B-SD (millésime 2026). Les sous-totaux sans numéro (chiffre d'affaires net, résultat financier, résultat exceptionnel) ne figurent pas sur le formulaire : ils servent au contrôle.

### A. Résultat comptable

| Ligne | Libellé | Montant |
|---|---|---:|
| 210 | Ventes de marchandises | |
| 214 | Production vendue (biens) | |
| 218 | Production vendue (services) | |
| | Chiffre d'affaires net (210 + 214 + 218) | |
| 222 | Production stockée | |
| 224 | Production immobilisée | |
| 226 | Subventions d'exploitation reçues | |
| 230 | Autres produits | |
| 232 | **Total des produits d'exploitation hors TVA (I)** | |
| | | |
| 234 | Achats de marchandises | |
| 236 | Variation de stocks (marchandises) | |
| 238 | Achats de matières premières et autres approvisionnements | |
| 240 | Variation de stock (matières premières et approvisionnements) | |
| 242 | Autres charges externes | |
| 244 | Impôts, taxes et versements assimilés (dont CFE et CVAE : case 243) | |
| 250 | Rémunérations du personnel | |
| 252 | Cotisations sociales | |
| 254 | Dotations aux amortissements | |
| 256 | Dotations aux dépréciations | |
| 262 | Autres charges | |
| 264 | **Total des charges d'exploitation (II)** | |
| 270 | **Résultat d'exploitation** (I - II) | |
| | | |
| 280 | Produits financiers (III) | |
| 294 | Charges financières (V) | |
| | Résultat financier (280 - 294) | |
| | | |
| 290 | Produits exceptionnels (IV) | |
| 300 | Charges exceptionnelles (VI) | |
| | Résultat exceptionnel (290 - 300) | |
| | | |
| 306 | Impôt sur les bénéfices (VII) | |
| 310 | **Bénéfice ou perte** : produits (I + III + IV) - charges (II + V + VI + VII) | |

### B. Résultat fiscal

| Ligne | Libellé | Montant |
|---|---|---:|
| 312 / 314 | Report du bénéfice comptable (col. 1) ou du déficit comptable (col. 2) | |
| 316 | Rémunérations et avantages personnels non déductibles | |
| 318 | Amortissements excédentaires (art. 39-4 CGI) et autres amortissements non déductibles | |
| 322 | Provisions non déductibles | |
| 324 | Impôts et taxes non déductibles | |
| 330 | Divers à réintégrer | |
| 350 | Divers à déduire | |
| 352 / 354 | Résultat fiscal avant imputation des déficits antérieurs : bénéfice (col. 1) ou déficit (col. 2) | |
| 360 | Déficits antérieurs imputés sur le résultat (entreprises à l'IS uniquement) | |
| 370 / 372 | **Résultat fiscal après imputation des déficits** : bénéfice (col. 1) ou déficit (col. 2) | |

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

## 2033-E — Valeur ajoutée (si chiffre d'affaires > 152 500 € HT)

Le tableau n° 2033-E-SD est à fournir lorsque le chiffre d'affaires de l'exercice, ramené le cas échéant à douze mois, dépasse 152 500 € hors taxes (notice n° 2033-NOT-SD). En dessous, il n'est pas à remplir.

Les tableaux n° 2033-F-SD (composition du capital) et 2033-G-SD (filiales et participations) concernent les sociétés : une entreprise individuelle n'a pas à les servir.

---

## Vérification

- [ ] 2033-A actif = 2033-A passif
- [ ] 2033-B bénéfice ou perte (ligne 310) = 2033-A résultat de l'exercice (ligne 136)
- [ ] 2033-C valeur fin = 2033-A immobilisations brutes
- [ ] 2033-C amort. fin = 2033-A amortissements
- [ ] 2065 résultat fiscal cohérent avec 2033-B + réintégrations/déductions
- [ ] IS calculé = 2065 case 7
