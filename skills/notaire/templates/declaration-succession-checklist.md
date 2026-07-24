# Checklist — Déclaration de Succession

Aide à la préparation de la déclaration de succession (formulaires 2705, 2705-S, 2706).

**Délai** : 6 mois à compter du décès (12 mois si décès hors métropole).
**Pénalité** : intérêts de retard 0,2%/mois + majoration 10% si dépôt tardif > 6 mois.

---

## 1. Informations sur le défunt

- [ ] Acte de décès
- [ ] Date du décès : {{defunt.date_deces}}
- [ ] Lieu du décès : {{defunt.lieu_deces}}
- [ ] Dernier domicile : {{defunt.domicile}}
- [ ] Nom : {{defunt.nom}}
- [ ] Prénom : {{defunt.prenom}}
- [ ] Date de naissance : {{defunt.date_naissance}}
- [ ] Lieu de naissance : {{defunt.lieu_naissance}}
- [ ] Nationalité : {{defunt.nationalite}}
- [ ] Profession : {{defunt.profession}}
- [ ] Situation matrimoniale : {{defunt.situation_matrimoniale}}
- [ ] Régime matrimonial : {{defunt.regime_matrimonial}}

---

## 2. Héritiers et légataires

### Conjoint survivant

- [ ] Nom : {{conjoint.nom}}
- [ ] Date de naissance : {{conjoint.date_naissance}}
- [ ] Régime matrimonial : {{conjoint.regime}}
- [ ] Option choisie : 1/4 PP / Usufruit totalité / Donation entre époux
- [ ] **Exonéré de droits** (art. 796-0 bis CGI)

### Enfants

| # | Nom | Prénom | Date naissance | Lien | Abattement |
|---|-----|--------|----------------|------|:----------:|
| 1 | {{enfant_1.nom}} | {{enfant_1.prenom}} | {{enfant_1.date_naissance}} | Enfant | 100 000 EUR |
| 2 | {{enfant_2.nom}} | {{enfant_2.prenom}} | {{enfant_2.date_naissance}} | Enfant | 100 000 EUR |
| 3 | | | | | |

### Autres héritiers / légataires

| # | Nom | Prénom | Lien | Abattement |
|---|-----|--------|------|:----------:|
| | | | Frère/soeur | 15 932 EUR |
| | | | Neveu/nièce | 7 967 EUR |
| | | | Autre | 1 594 EUR |

---

## 3. Dispositions de dernières volontés

- [ ] Interrogation FCDDV effectuée
- [ ] Testament : ☐ Oui ☐ Non
  - Type : ☐ Olographe ☐ Authentique ☐ Mystique
  - Détenu par : {{testament.notaire}}
  - Legs : {{testament.legs}}
- [ ] Donation entre époux : ☐ Oui ☐ Non
  - Date : {{dee.date}}
  - Contenu : {{dee.contenu}}
- [ ] Donations antérieures (< 15 ans) :
  | Date | Bénéficiaire | Montant | Abattement utilisé |
  |------|-------------|---------|:-------------------:|
  | | | | |

---

## 4. Actif de la succession

### Immeubles (formulaire 2706)

| # | Adresse | Cadastre | Nature | Valeur vénale |
|---|---------|----------|--------|:-------------:|
| 1 | {{immo_1.adresse}} | {{immo_1.cadastre}} | {{immo_1.nature}} | {{immo_1.valeur}} EUR |
| 2 | | | | |

**Méthode d'évaluation** : comparables DVF, estimation notaire, ou expertise.

### Comptes bancaires

| # | Banque | N° compte | Solde au décès |
|---|--------|-----------|:--------------:|
| 1 | {{banque_1.nom}} | {{banque_1.numero}} | {{banque_1.solde}} EUR |
| 2 | | | |

- [ ] Interrogation FICOBA effectuée par le notaire

### Valeurs mobilières

| # | Nature | Dépositaire | Valeur au décès |
|---|--------|-------------|:---------------:|
| 1 | {{titre_1.nature}} | {{titre_1.depositaire}} | {{titre_1.valeur}} EUR |
| 2 | | | |

### Assurance-vie

| # | Compagnie | N° contrat | Capital | Bénéficiaire | Primes avant/après 70 ans |
|---|-----------|-----------|:-------:|-------------|:-------------------------:|
| 1 | {{av_1.compagnie}} | {{av_1.numero}} | {{av_1.capital}} EUR | {{av_1.beneficiaire}} | {{av_1.regime}} |

- [ ] Interrogation AGIRA effectuée par le notaire
- [ ] **Rappel** : hors succession (art. L132-12 C. ass.), régime fiscal spécifique (art. 990 I ou 757 B CGI)

### Mobilier

- [ ] Inventaire réalisé : ☐ Oui (montant : {{mobilier.inventaire}} EUR) ☐ Non (forfait 5%)
- [ ] Forfait 5% de l'actif brut : {{mobilier.forfait}} EUR
- [ ] **Valeur retenue** : {{mobilier.valeur}} EUR

### Véhicules

| # | Marque / Modèle | Immatriculation | Valeur Argus |
|---|----------------|-----------------|:------------:|
| 1 | | | EUR |

### Autres actifs

| # | Nature | Valeur |
|---|--------|:------:|
| | Créances détenues | EUR |
| | Parts sociales | EUR |
| | Fonds de commerce | EUR |
| | Autres | EUR |

### TOTAL ACTIF BRUT : {{actif.total}} EUR

---

## 5. Passif déductible

| # | Nature | Montant | Justificatif |
|---|--------|:-------:|-------------|
| 1 | Frais funéraires | EUR | Factures (ou forfait 1 500 EUR) |
| 2 | Emprunt immobilier | EUR | Attestation banque |
| 3 | Impôts dus (IR, TF) | EUR | Avis d'imposition |
| 4 | Factures impayées | EUR | Factures |
| 5 | Frais de dernière maladie | EUR | Factures |

### TOTAL PASSIF : {{passif.total}} EUR

---

## 6. Calcul des droits

```
Actif brut                    {{actif.total}} EUR
- Passif déductible          -{{passif.total}} EUR
─────────────────────────────────────────────────
= ACTIF NET                   {{actif_net}} EUR
```

### Droits par héritier

| Héritier | Part | Abattement | Net taxable | Droits |
|----------|:----:|:----------:|:-----------:|:------:|
| {{conjoint.nom}} (conjoint) | {{conjoint.part}} EUR | **Exonéré** | 0 EUR | **0 EUR** |
| {{enfant_1.nom}} | {{enfant_1.part}} EUR | 100 000 EUR | {{enfant_1.taxable}} EUR | {{enfant_1.droits}} EUR |
| {{enfant_2.nom}} | {{enfant_2.part}} EUR | 100 000 EUR | {{enfant_2.taxable}} EUR | {{enfant_2.droits}} EUR |
| **TOTAL** | | | | **{{droits.total}} EUR** |

---

## 7. Émoluments du notaire (estimation)

| Acte | Montant estimé |
|------|:--------------:|
| Acte de notoriété | 68 EUR TTC |
| Déclaration de succession | EUR TTC |
| Attestation immobilière | EUR TTC |
| Partage (si applicable) | EUR TTC |
| Débours | EUR |
| Droit de partage 2,5% (si partage) | EUR |
| **TOTAL ESTIMÉ** | **EUR** |

---

## 8. Pièces à joindre

### Obligatoires

- [ ] Acte de décès (copie intégrale)
- [ ] Livret de famille du défunt
- [ ] Actes de naissance des héritiers
- [ ] Pièces d'identité des héritiers
- [ ] Contrat de mariage (si applicable)
- [ ] Testament (si existant)
- [ ] Donation entre époux (si existante)
- [ ] Titre(s) de propriété des immeubles
- [ ] Derniers avis d'imposition (IR, IFI, taxe foncière)
- [ ] Relevés de comptes bancaires au jour du décès
- [ ] Relevés de valeurs mobilières au jour du décès
- [ ] Attestation(s) d'assurance-vie
- [ ] Factures de frais funéraires
- [ ] Tableau d'amortissement des emprunts

### Si applicable

- [ ] Jugement de divorce (si le défunt était divorcé)
- [ ] Attestation PACS (si partenaire)
- [ ] PV d'inventaire du mobilier
- [ ] Estimation d'expert (bijoux, œuvres d'art)
- [ ] Bilans de sociétés (si parts sociales)
- [ ] Acte de donation antérieure (< 15 ans)

---

## 9. Délais et prochaines étapes

| Action | Date limite | Fait ? |
|--------|-----------|:------:|
| Déclaration de succession | {{delai.declaration}} (6 mois) | ☐ |
| Paiement des droits | {{delai.paiement}} (au dépôt) | ☐ |
| Attestation immobilière | Dès que possible | ☐ |
| Publication au SPF | Après signature | ☐ |
| Mutation des comptes bancaires | Après acte de notoriété | ☐ |
| Partage | Pas de délai légal | ☐ |

---

⚠️ **CE DOCUMENT EST UN PROJET DE TRAVAIL.**
Il ne constitue pas une déclaration de succession officielle.
La déclaration doit être établie par un notaire et déposée au service des impôts des entreprises (SIE) du domicile du défunt.
