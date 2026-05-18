# Checklist — Déclaration de Succession (Belgique)

Aide à la préparation de la déclaration de succession en droit belge.

**Délais légaux :**
- **5 mois** à compter du décès si le décès a eu lieu en **Belgique**
- **6 mois** à compter du décès si le décès a eu lieu dans un **État membre de l'UE** (hors Belgique)
- **12 mois** à compter du décès si le décès a eu lieu **hors de l'UE**

**Pénalités en cas de dépôt tardif :** intérêts de retard + majoration selon les règles régionales applicables.

**Autorité compétente pour le dépôt :**
- **Région flamande** : Vlabel (Vlaamse Belastingdienst) — bureau compétent selon l'arrondissement du dernier domicile du défunt
- **Région wallonne** : Receveur de l'enregistrement compétent selon le dernier domicile du défunt
- **Région de Bruxelles-Capitale** : Receveur de l'enregistrement de Bruxelles

*(La compétence régionale est déterminée par la région où le défunt avait sa résidence fiscale au jour du décès.)*

---

## 1. Informations sur le défunt

- [ ] Acte de décès
- [ ] Date du décès : {{defunt.date_deces}}
- [ ] Lieu du décès : {{defunt.lieu_deces}}
- [ ] Dernier domicile : {{defunt.domicile}}
- [ ] Région de résidence fiscale : {{defunt.region}} *(Flandre / Wallonie / Bruxelles)*
- [ ] Nom : {{defunt.nom}}
- [ ] Prénom : {{defunt.prenom}}
- [ ] Date de naissance : {{defunt.date_naissance}}
- [ ] Lieu de naissance : {{defunt.lieu_naissance}}
- [ ] Nationalité : {{defunt.nationalite}}
- [ ] Numéro de registre national : {{defunt.registre_national}}
- [ ] Situation matrimoniale : {{defunt.situation_matrimoniale}}
- [ ] Régime matrimonial : {{defunt.regime_matrimonial}}

---

## 2. Héritiers et légataires

### Conjoint survivant / cohabitant légal survivant

- [ ] Nom : {{conjoint.nom}}
- [ ] Date de naissance : {{conjoint.date_naissance}}
- [ ] Régime matrimonial / cohabitation légale : {{conjoint.regime}}
- [ ] Option choisie : 1/4 PP / Usufruit totalité / Institution contractuelle (donation entre époux)
- [ ] Taux préférentiels applicables entre conjoints / cohabitants légaux (selon région)

### Exonération logement familial

- [ ] **Région flamande** : exonération totale des droits de succession sur la valeur du logement familial, entre époux et cohabitants légaux
- [ ] **Région wallonne** : exonération totale des droits de succession sur la valeur du logement familial, entre époux et cohabitants légaux
- [ ] **Région de Bruxelles-Capitale** : abattement sur la valeur du logement familial jusqu'à **250 000 EUR**, entre époux et cohabitants légaux

### Enfants

| # | Nom | Prénom | Date naissance | Lien | Remarque |
|---|-----|--------|----------------|------|---------|
| 1 | {{enfant_1.nom}} | {{enfant_1.prenom}} | {{enfant_1.date_naissance}} | Enfant | Taux ligne directe selon région |
| 2 | {{enfant_2.nom}} | {{enfant_2.prenom}} | {{enfant_2.date_naissance}} | Enfant | Taux ligne directe selon région |
| 3 | | | | | |

### Autres héritiers / légataires

| # | Nom | Prénom | Lien | Taux applicable |
|---|-----|--------|------|:---------------:|
| | | | Frère/sœur | Taux intermédiaire (selon région) |
| | | | Neveu/nièce | Taux intermédiaire (selon région) |
| | | | Autre / tiers | Taux maximum (selon région) |

**Barèmes régionaux indicatifs :**

| Région | Ligne directe + conjoint | Autres proches | Tiers |
|--------|:------------------------:|:--------------:|:-----:|
| **Flandre (Vlabel)** | 3 % / 9 % / 27 % (progressif) | taux intermédiaires | 55 % |
| **Wallonie** | 3 % à 30 % (progressif) | 3 % à 65 % | 30 % à 80 % |
| **Bruxelles** | 3 % à 30 % (progressif) | 3 % à 65 % | 40 % à 80 % |

*(Se référer à data/abattements-succession-be.json pour les barèmes complets et à jour)*

---

## 3. Dispositions de dernières volontés

- [ ] Interrogation du **Registre Central des Testaments (RCT)** (Fednot) effectuée
- [ ] Testament : ☐ Oui ☐ Non
  - Type : ☐ Olographe ☐ Authentique ☐ International
  - Détenu par : {{testament.notaire}}
  - Legs : {{testament.legs}}
- [ ] Institution contractuelle (donation entre époux) : ☐ Oui ☐ Non
  - Date : {{dee.date}}
  - Contenu : {{dee.contenu}}
- [ ] Donations antérieures (< 3 ans — rappel fiscal) :

  | Date | Bénéficiaire | Montant | Enregistrée ? |
  |------|-------------|---------|:-------------:|
  | | | | ☐ Oui ☐ Non |

> **Rappel fiscal belge** : Les donations mobilières non enregistrées effectuées dans les **3 ans** précédant le décès sont réintégrées dans la masse successorale.

---

## 4. Actif de la succession

### Immeubles

| # | Adresse | Cadastre | Nature | Valeur vénale |
|---|---------|----------|--------|:-------------:|
| 1 | {{immo_1.adresse}} | {{immo_1.cadastre}} | {{immo_1.nature}} | {{immo_1.valeur}} EUR |
| 2 | | | | |

**Méthode d'évaluation** : valeur vénale au jour du décès (comparables de ventes récentes, estimation notariale, expertise).

### Comptes bancaires

| # | Banque | N° compte (IBAN) | Solde au décès |
|---|--------|:----------------:|:--------------:|
| 1 | {{banque_1.nom}} | {{banque_1.numero}} | {{banque_1.solde}} EUR |
| 2 | | | |

- [ ] Consultation du **Point de Contact Central (PCC)** de la Banque Nationale de Belgique effectuée par le notaire *(équivalent belge du FICOBA français)*

### Valeurs mobilières

| # | Nature | Dépositaire | Valeur au décès |
|---|--------|-------------|:---------------:|
| 1 | {{titre_1.nature}} | {{titre_1.depositaire}} | {{titre_1.valeur}} EUR |
| 2 | | | |

### Assurance-vie

| # | Compagnie | N° contrat | Capital | Bénéficiaire |
|---|-----------|-----------|:-------:|-------------|
| 1 | {{av_1.compagnie}} | {{av_1.numero}} | {{av_1.capital}} EUR | {{av_1.beneficiaire}} |

- [ ] Interrogation **Assuralia** effectuée par le notaire *(pour détecter les contrats d'assurance-vie belges)*
- [ ] **Rappel** : les assurances-vie peuvent être soumises aux droits de succession en Belgique selon les modalités du contrat et la région — vérifier avec le notaire

### Mobilier

- [ ] Inventaire réalisé : ☐ Oui (montant : {{mobilier.inventaire}} EUR) ☐ Non (forfait 15%)
- [ ] Forfait 15% de l'actif mobilier brut : {{mobilier.forfait}} EUR *(taux forfaitaire belge — différent du forfait français de 5%)*
- [ ] **Valeur retenue** : {{mobilier.valeur}} EUR

### Véhicules

| # | Marque / Modèle | Immatriculation | Valeur |
|---|----------------|-----------------|:------:|
| 1 | | | EUR |

### Autres actifs

| # | Nature | Valeur |
|---|--------|:------:|
| | Créances détenues | EUR |
| | Parts sociales (SRL, SA, etc.) | EUR |
| | Fonds de commerce | EUR |
| | Autres | EUR |

### TOTAL ACTIF BRUT : {{actif.total}} EUR

---

## 5. Passif déductible

| # | Nature | Montant | Justificatif |
|---|--------|:-------:|-------------|
| 1 | Frais funéraires | EUR | Factures (déductibles sans plafond légal fixe — raisonnables) |
| 2 | Emprunt hypothécaire | EUR | Attestation de solde restant dû |
| 3 | Impôts dus (IPP, précompte, etc.) | EUR | Avis d'imposition |
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

### Droits par héritier (selon région)

| Héritier | Part | Base imposable | Taux/Barème | Droits estimés |
|----------|:----:|:--------------:|:-----------:|:--------------:|
| {{conjoint.nom}} (conjoint) | {{conjoint.part}} EUR | Voir exonération logement familial | Taux préférentiel | {{conjoint.droits}} EUR |
| {{enfant_1.nom}} | {{enfant_1.part}} EUR | {{enfant_1.taxable}} EUR | Ligne directe | {{enfant_1.droits}} EUR |
| {{enfant_2.nom}} | {{enfant_2.part}} EUR | {{enfant_2.taxable}} EUR | Ligne directe | {{enfant_2.droits}} EUR |
| **TOTAL** | | | | **{{droits.total}} EUR** |

*(Le calcul précis des droits est effectué par le notaire ou l'autorité fiscale régionale compétente.)*

---

## 7. Émoluments du notaire (estimation)

| Acte | Montant estimé |
|------|:--------------:|
| Acte de notoriété | EUR TTC |
| Déclaration de succession | EUR TTC |
| Attestation immobilière | EUR TTC |
| Partage (si applicable) | EUR TTC |
| Débours | EUR |
| Droit de partage (si partage) | EUR |
| **TOTAL ESTIMÉ** | **EUR** |

*(Émoluments fixés par l'arrêté royal du 16 décembre 1950 et ses modifications)*

---

## 8. Pièces à joindre

### Obligatoires

- [ ] Acte de décès (copie conforme)
- [ ] Acte de notoriété établi par le notaire
- [ ] Actes de naissance des héritiers
- [ ] Pièces d'identité des héritiers (carte d'identité belge ou passeport)
- [ ] Contrat de mariage (si applicable)
- [ ] Acte de cohabitation légale (si applicable)
- [ ] Testament (si existant)
- [ ] Institution contractuelle / donation entre époux (si existante)
- [ ] Titre(s) de propriété des immeubles
- [ ] Derniers avis d'imposition (IPP, précompte immobilier)
- [ ] Relevés de comptes bancaires au jour du décès
- [ ] Relevés de valeurs mobilières au jour du décès
- [ ] Attestation(s) d'assurance-vie
- [ ] Factures de frais funéraires
- [ ] Tableau d'amortissement des emprunts hypothécaires

### Si applicable

- [ ] Jugement de divorce (si le défunt était divorcé)
- [ ] Déclaration de dissolution de cohabitation légale (si applicable)
- [ ] Procès-verbal d'inventaire du mobilier
- [ ] Estimation d'expert (bijoux, œuvres d'art)
- [ ] Bilans et statuts des sociétés (si parts sociales)
- [ ] Actes de donation antérieure (< 3 ans — rappel fiscal)

---

## 9. Délais et prochaines étapes

| Action | Date limite | Fait ? |
|--------|-----------|:------:|
| Déclaration de succession | {{delai.declaration}} (5/6/12 mois selon lieu du décès) | ☐ |
| Paiement des droits | Au moment du dépôt | ☐ |
| Attestation immobilière | Dès que possible | ☐ |
| Transcription à la Sécurité Juridique | Après signature | ☐ |
| Mutation des comptes bancaires | Après acte de notoriété | ☐ |
| Partage | Pas de délai légal | ☐ |

---

⚠️ **CE DOCUMENT EST UN PROJET DE TRAVAIL.**
Il ne constitue pas une déclaration de succession officielle.
La déclaration de succession doit être établie par un notaire et déposée auprès de l'autorité fiscale régionale compétente : Vlabel (Flandre) ou le receveur de l'enregistrement (Wallonie / Bruxelles).
