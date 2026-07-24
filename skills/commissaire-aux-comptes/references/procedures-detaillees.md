# Procédures détaillées d'audit CAC

## 1. Procédures analytiques

### Ratios à calculer

| Ratio | Formule | Seuil d'alerte |
|-------|---------|----------------|
| Marge nette | Résultat net / CA | < 10% ou variation > 20% |
| Ratio charges externes / CA | Charges ext. / CA | > 60% |
| Trésorerie / Passif CT | Tréso / Dettes CT | < 1 (risque liquidité) |
| Compte courant / Capitaux propres | 455 / CP | > 50% (dépendance associé) |
| Immobilisations / Total actif | Immo nettes / Actif | Variation significative |

### Analyse de tendance (premier exercice)

Pas de comparatif N-1. Comparer aux données sectorielles :
- SaaS B2C micro-entreprise : marge nette 30-50%
- Ratio charges hosting/CA : 15-30%
- Ratio frais bancaires/CA : 3-5%

## 2. Contrôle des immobilisations

### Vérification des acquisitions

Pour chaque immobilisation :
1. Facture d'achat (montant, date, fournisseur)
2. Mise en service effective
3. Critère d'immobilisation : valeur > 500 HT (ou choix de méthode)
4. Compte PCG correct (2183 pour matériel informatique)

### Vérification des amortissements

```
Dotation = Valeur brute x (1 / Durée) x (Nb jours / 365)
```

Vérifier :
- [ ] Base amortissable = Coût d'acquisition TTC (si franchise TVA) ou HT (si TVA récupérable)
- [ ] Date de début = Date de mise en service (pas date d'achat)
- [ ] Durée conforme aux usages (3 ans matériel info, 5 ans mobilier)
- [ ] Prorata temporis en jours (pas en mois)

## 3. Contrôle du compte courant d'associé (455)

### Pièces justificatives requises

Pour chaque mouvement au crédit du 455 :

**Charges pré-constitution :**
- [ ] Facture originale au nom de l'associé
- [ ] Date antérieure à la date de création de la société
- [ ] Nature liée à l'activité de la société
- [ ] Reprise dans les 6 mois de l'immatriculation
- [ ] Mention dans les statuts ou PV (état des actes accomplis)

**Charges bureau à domicile :**
- [ ] Bail ou titre de propriété
- [ ] Calcul de la quote-part surface professionnelle
- [ ] Factures des charges : copropriété, électricité, internet, assurance, taxe foncière
- [ ] Prorata temporis si exercice < 12 mois

**Charges payées sur compte personnel :**
- [ ] Relevé bancaire personnel montrant le débit
- [ ] Facture au nom de la société (ou justifiant l'usage pro)
- [ ] Pas de doublon avec les charges déjà comptabilisées via le compte bancaire pro

### Contrôle croisé

```
Total 455 balance = somme (charges pré-constitution)
                  + somme (charges bureau domicile)
                  + somme (charges perso post-création)
```

Réconcilier avec les justificatifs (factures, relevés bancaires personnels).

## 4. Contrôle des revenus (cycle ventes)

### Plateforme de paiement -> Comptabilité

Pour chaque source de revenus :

1. **Exhaustivité** : CA plateforme = CA comptabilisé en 706/707
   ```
   CA brut plateforme - Remboursements = CA net comptabilisé
   ```

2. **Coupure** : seul le CA sur la période de l'exercice
   - Ventes avant le début de l'exercice -> pas de produit comptable
   - Payouts incluant du CA hors exercice -> solde 411 créditeur possible

3. **Frais de plateforme** :
   ```
   CA brut (706/707)
   - Commissions (6278)
   - Chargebacks (654)
   - Frais divers (627)
   = Payout net -> 512 (via 411)
   ```

4. **PCA** : pour les abonnements annuels chevauchant la clôture
   - Calculer la part exercice suivant au prorata du nombre de jours
   - Passer en 487 (Produits constatés d'avance)

### Cessions d'actifs

1. Justificatif de la transaction
2. Calcul EUR si transaction en devises
3. Frais de plateforme en 622
4. Comptabilisation en 775 (Produits des cessions d'éléments d'actif)

### Commissions et revenus annexes

1. Contrat ou accord justifiant la commission
2. Preuve de paiement
3. Classification appropriée (708 activités annexes)
4. TVA : vérifier si autoliquidation nécessaire (prestataire étranger)

## 5. Contrôle des charges (cycle achats)

### Sondage par catégorie

Pour chaque catégorie de charges significative (> seuil de signification) :

| Compte | Test |
|--------|------|
| 604 (Achats sous-traitance) | Sondage 3-5 factures |
| 6135 (SaaS/hosting) | Sondage 5-8 factures |
| 6132 (Bureau domicile) | 100% (convention) |
| 627+6278 (Banque+Plateforme) | Réconciliation relevés |
| 651 (Domaines) | Sondage 3 factures |

Pour chaque facture sondée :
- [ ] Facture originale existante
- [ ] Date dans l'exercice (ou pré-constitution si 455)
- [ ] Montant correspondant à l'écriture
- [ ] Nature en lien avec l'activité sociale
- [ ] Compte PCG approprié

### Test de cut-off charges

Vérifier les dernières factures du mois de clôture et les premières du mois suivant :
- Pas de charge de l'exercice suivant comptabilisée sur l'exercice
- Pas de charge de l'exercice omise (charges à payer)
- Cas spécial des abonnements mensuels chevauchant la clôture

## 6. Contrôle de l'IS

### Vérification du calcul

```
Résultat comptable
+ Réintégrations (dont IS si non déductible)
- Déductions
= Résultat fiscal
```

**Point d'attention** : le résultat comptable est-il AVANT ou APRÈS IS ?
- Si avant IS -> résultat fiscal = résultat comptable (pas de réintégration)
- Si après IS -> réintégrer l'IS au résultat fiscal

### Conditions taux réduit PME (15%)

- [ ] CA HT < 10 000 000
- [ ] Capital entièrement libéré
- [ ] Capital détenu à 75%+ par personnes physiques
- [ ] Seuil proraté si exercice < 12 mois : 42 500 x (nb jours / 365)
- [ ] Résultat fiscal <= seuil proraté -> 100% au taux réduit

### Écriture comptable IS

```
D 695 (IS)    X
    C 444 (État IS)    X
```

## 7. Procédures de validation finale

### Lettre d'affirmation

L'associé unique / dirigeant confirme :
- [ ] Exhaustivité des informations communiquées
- [ ] Absence de fraude ou irrégularités connues
- [ ] Pas de litiges en cours non révélés
- [ ] Pas d'engagements hors bilan non mentionnés

### Événements postérieurs à la clôture

Période : de la clôture à la date de l'audit.

Vérifier :
- [ ] Pas de perte de client majeur
- [ ] Pas de litige significatif survenu
- [ ] Pas de dépréciation d'actif nécessaire
- [ ] Continuité d'exploitation non compromise

### Cohérence d'ensemble

- [ ] Tous les documents sont datés et cohérents entre eux
- [ ] Pas de contradiction entre les différentes pièces
- [ ] Les notes annexes reflètent fidèlement les opérations
- [ ] L'approbation des comptes est correctement formulée
