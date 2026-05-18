# Déclaration ISOC 275 — Impôt des Sociétés

**{{company.name}}** — Exercice du {{company.fiscal_year.start_formatted}} au {{company.fiscal_year.end_formatted}}

---

> Ce brouillon de travail est à encoder dans Tax-on-web entreprises via https://www.tax-on-web.be
> La déclaration définitive doit être transmise par voie électronique dans les 7 mois après la clôture de l'exercice.

---

## 1. Identification

| Champ | Valeur |
|---|---|
| Dénomination sociale | {{company.name}} |
| Numéro BCE | {{company.bce}} |
| Adresse du siège | {{company.address}} |
| Code NACE | {{company.nace}} |
| Exercice du ... au ... | {{company.fiscal_year.start_formatted}} au {{company.fiscal_year.end_formatted}} |
| Durée (en mois) | .......... |

---

## 2. Bilan (PCMN)

### Actif

| Classe PCMN | Libellé | Brut | Amort./Réduc. val. | Net |
|---|---|---:|---:|---:|
| **Classe 2** | **Actif immobilisé** | | | |
| 20 | Frais d'établissement | | | |
| 21 | Immobilisations incorporelles | | | |
| 22–27 | Immobilisations corporelles | | | |
| 28 | Immobilisations financières | | | |
| | **Total actif immobilisé** | | | |
| **Classe 3** | **Stocks et commandes en cours** | | | |
| 30–39 | Stocks | | | |
| | **Total stocks** | | | |
| **Classe 4** | **Créances à un an au plus** | | | |
| 40 | Créances commerciales | | | |
| 41 | Autres créances | | | |
| 49 | Comptes de régularisation actif | | | |
| | **Total créances** | | | |
| **Classe 5** | **Trésorerie** | | | |
| 50–58 | Valeurs disponibles | | | |
| | **Total actif** | | | |

### Passif

| Classe PCMN | Libellé | Montant |
|---|---|---:|
| **Classe 1** | **Capitaux propres** | |
| 10 | Capital | |
| 11 | Primes d'émission | |
| 13 | Réserves | |
| 14 | Bénéfice (perte) reporté(e) | |
| 15 | Subsides en capital | |
| | **Total capitaux propres** | |
| **Classe 1** | **Provisions et impôts différés** | |
| 16 | Provisions pour risques et charges | |
| **Classe 4** | **Dettes** | |
| 42–43 | Dettes financières | |
| 44 | Dettes commerciales | |
| 45 | Dettes fiscales, salariales, sociales | |
| 48 | Comptes de régularisation passif | |
| | **Total dettes** | |
| | **Total passif** | |

---

## 3. Compte de Résultats (PCMN)

| Classe PCMN | Libellé | Montant |
|---|---|---:|
| **Classe 7** | **Produits** | |
| 70 | Chiffre d'affaires | |
| 71 | Variation de stocks | |
| 72 | Production immobilisée | |
| 74 | Subsides d'exploitation | |
| 75 | Autres produits d'exploitation | |
| 76 | Produits financiers | |
| 77 | Produits exceptionnels | |
| | **Total produits** | |
| **Classe 6** | **Charges** | |
| 60 | Achats de marchandises et matières | |
| 61 | Services et biens divers | |
| 62 | Rémunérations et charges sociales | |
| 63 | Amortissements et réductions de valeur | |
| 64 | Autres charges d'exploitation | |
| 65 | Charges financières | |
| 67 | Charges exceptionnelles | |
| 67/68 | Impôts sur le résultat | |
| | **Total charges** | |
| | **Résultat de l'exercice** | |

---

## 4. DNA — Dépenses Non Admises (art. 74 CIR 92)

| Élément | Base légale | Montant |
|---|---|---:|
| Amendes, pénalités, confiscations | Art. 53, 6° CIR 92 | .......... |
| Frais de voiture au-delà du taux de déductibilité | Art. 66 CIR 92 | .......... |
| Avantages en nature non justifiés (sans fiche 281) | Art. 57 CIR 92 | .......... |
| Rémunérations excessives | Art. 53, 10° CIR 92 | .......... |
| Charges non justifiées par fiches individuelles | Art. 57 CIR 92 | .......... |
| Taxes non déductibles (précompte mobilier non récupérable, etc.) | | .......... |
| Dépenses pour activités sportives/récréatives au-delà du plafond | Art. 53, 7° CIR 92 | .......... |
| **Total DNA** | | **..........** |

---

## 5. Déductions (art. CIR 92)

| Élément | Base légale | Montant |
|---|---|---:|
| RDT — Revenus Définitivement Taxés (dividendes qualifiants 100%) | Art. 202 CIR 92 | .......... |
| DPI — Déduction pour Investissement | Art. 68 ss CIR 92 | .......... |
| Intérêts notionnels (déduction pour capital à risque) | Art. 205bis CIR 92 | .......... |
| Pertes antérieures reportées | Art. 206 CIR 92 | .......... |
| Revenus exonérés (subsides en capital, etc.) | | .......... |
| **Total déductions** | | **..........** |

---

## 6. Calcul de l'ISOC

| Étape | Montant |
|---|---:|
| Résultat comptable | .......... |
| + DNA (dépenses non admises) | .......... |
| - Déductions | .......... |
| **= Base imposable** | **..........** |
| | |
| **Taux applicable** | |
| Taux normal 25% (art. 215 al. 1 CIR 92) | .......... |
| Taux réduit 20% PME (art. 215 al. 2 CIR 92) — si bénéfice ≤ 100 000 EUR | .......... |
| **ISOC brut** | **..........** |
| | |
| **Cotisation distincte** | |
| Cotisation 10% réserve de liquidation (VVPRter — art. 184quater CIR 92) | .......... |
| | |
| **Total impôt dû** | **..........** |

### Conditions taux réduit PME (20%, art. 215 al. 2 CIR 92)

- [ ] La société est une PME (critères art. 1:24 CSA : CA≤9M EUR, bilan≤4,5M EUR, effectif≤50 ; au moins 2/3)
- [ ] Au moins un gérant/administrateur personne physique est rémunéré ≥ 45 000 EUR (ou ≥ au résultat imposable si celui-ci est inférieur)
- [ ] La société n'est pas une société de placement, holding pure ou analogue
- [ ] Taux réduit applicable sur la tranche jusqu'à 100 000 EUR

---

## 7. Versements Anticipés

| Versement | Date limite | Bonification | Montant versé |
|---|---|---|---:|
| VA1 | 10 avril | 9% | .......... |
| VA2 | 10 juillet | 7.5% | .......... |
| VA3 | 10 octobre | 6% | .......... |
| VA4 | 20 décembre | 4.5% | .......... |
| **Total VA** | | | **..........** |

> **Bonification** : si les VA sont suffisants, bonification de 6,75% sur le montant de la bonification théorique (taux applicable à l'exercice d'imposition — à vérifier au Moniteur belge).
> **Accroissement** : si les VA sont insuffisants ou absents, accroissement de 9% calculé sur la différence entre l'impôt dû et les VA effectués (art. 218 CIR 92).

---

## 8. Solde à Payer / Remboursement

| | Montant |
|---|---:|
| ISOC brut | .......... |
| - Total versements anticipés | .......... |
| - Précompte mobilier imputable | .......... |
| - Précompte immobilier imputable | .......... |
| **= Solde à payer (ou à rembourser)** | **..........** |

---

## Vérification

- [ ] Bilan actif = bilan passif
- [ ] Résultat compte de résultats = résultat bilan (classe 14)
- [ ] Base imposable cohérente (résultat + DNA - déductions)
- [ ] Taux PME vérifié (conditions art. 215 al. 2 CIR 92)
- [ ] VA encodés dans Tax-on-web et cohérents avec les relevés SPF Finances
- [ ] Fiches 281 établies pour toutes les rémunérations et avantages (art. 57 CIR 92)
- [ ] Déclaration ISOC 275 transmise dans les 7 mois après la clôture
