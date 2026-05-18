# Procédures détaillées d'audit — Réviseur d'entreprises

last_updated: 2026-05-15

## 1. Procédures analytiques (ISA 520)

### Ratios à calculer

| Ratio | Formule | Seuil d'alerte |
|-------|---------|----------------|
| Marge nette | Résultat net / CA | < 10% ou variation > 20% |
| Ratio charges externes / CA | Charges ext. / CA | > 60% |
| Trésorerie / Passif CT | Tréso / Dettes CT | < 1 (risque liquidité) |
| Compte courant / Capitaux propres | Compte courant associé / CP | > 50% (dépendance associé) |
| Immobilisations / Total actif | Immo nettes / Actif | Variation significative |

### Analyse de tendance (premier exercice)

Pas de comparatif N-1. Comparer aux données sectorielles :
- SaaS B2C micro-entreprise : marge nette 30-50%
- Ratio charges hosting/CA : 15-30%
- Ratio frais bancaires/CA : 3-5%

## 2. Contrôle des immobilisations (ISA 500, ISA 540)

### Vérification des acquisitions

Pour chaque immobilisation :
1. Facture d'achat (montant, date, fournisseur)
2. Mise en service effective
3. Critère d'immobilisation : valeur > 500 HTVA (ou choix de méthode)
4. Compte PCMN correct (24 pour matériel informatique)

### Vérification des amortissements (art. 61 CIR 92)

```
Dotation = Valeur brute x (1 / Durée) x (Nb jours / 365)
```

Vérifier :
- [ ] Base amortissable = Coût d'acquisition TVAC (si franchise TVA) ou HTVA (si TVA récupérable)
- [ ] Date de début = Date de mise en service (pas date d'achat)
- [ ] Durée conforme aux usages (3 ans matériel info, 5 ans mobilier)
- [ ] Prorata temporis en jours (pas en mois)

## 3. Contrôle du compte courant d'associé

### Pièces justificatives requises

Pour chaque mouvement au crédit du compte courant associé :

**Charges pré-constitution / engagements société en formation (art. 2:2 CSA) :**
- [ ] Facture originale au nom de l'associé
- [ ] Date antérieure à la date de création de la société (immatriculation BCE)
- [ ] Nature liée à l'activité de la société
- [ ] Reprise prévue dans l'acte constitutif ou dans un PV d'assemblée dans les 6 mois
- [ ] Mention dans les statuts ou dans l'état des actes accomplis

**Charges bureau à domicile (art. 49 CIR 92) :**
- [ ] Bail ou titre de propriété
- [ ] Calcul de la quote-part surface professionnelle
- [ ] Factures des charges : copropriété, électricité, internet, assurance, précompte immobilier
- [ ] Prorata temporis si exercice < 12 mois

**Charges payées sur compte personnel :**
- [ ] Relevé bancaire personnel montrant le débit
- [ ] Facture au nom de la société (ou justifiant l'usage professionnel)
- [ ] Pas de doublon avec les charges déjà comptabilisées via le compte bancaire pro

### Contrôle croisé

```
Total compte courant associé balance = somme (charges pré-constitution)
                                     + somme (charges bureau domicile)
                                     + somme (charges perso post-création)
```

Réconcilier avec les justificatifs (factures, relevés bancaires personnels).

## 4. Contrôle des revenus (cycle ventes)

### Plateforme de paiement -> Comptabilité

Pour chaque source de revenus :

1. **Exhaustivité** : CA plateforme = CA comptabilisé en 70x (PCMN)
   ```
   CA brut plateforme - Remboursements = CA net comptabilisé
   ```

2. **Coupure** : seul le CA sur la période de l'exercice
   - Ventes avant le début de l'exercice -> pas de produit comptable
   - Payouts incluant du CA hors exercice -> solde créditeur compte clients possible

3. **Frais de plateforme** :
   ```
   CA brut (700/701 PCMN)
   - Commissions (61x PCMN)
   - Chargebacks (654 PCMN)
   - Frais divers (61x PCMN)
   = Payout net -> 550 (via 400)
   ```

4. **PCA** : pour les abonnements annuels chevauchant la clôture
   - Calculer la part exercice suivant au prorata du nombre de jours
   - Passer en 493 (Produits perçus d'avance — PCMN)

### Cessions d'actifs

1. Justificatif de la transaction
2. Calcul EUR si transaction en devises (taux BCE)
3. Frais de plateforme en 61x (PCMN)
4. Comptabilisation en 763 (Plus-values sur réalisation d'actifs — PCMN)

### Commissions et revenus annexes

1. Contrat ou accord justifiant la commission
2. Preuve de paiement
3. Classification appropriée (PCMN — 74x activités annexes)
4. TVA : vérifier si autoliquidation nécessaire (art. 51 §2 CTVA — prestataire étranger)

## 5. Contrôle des charges (cycle achats)

### Sondage par catégorie

Pour chaque catégorie de charges significative (> seuil de signification) :

| Compte PCMN | Test |
|-------------|------|
| 604 (Achats sous-traitance) | Sondage 3-5 factures |
| 61x (SaaS/hosting) | Sondage 5-8 factures |
| 61x (Bureau domicile) | 100% (convention) |
| 627+61x (Banque+Plateforme) | Réconciliation relevés |
| 61x (Domaines) | Sondage 3 factures |

Pour chaque facture sondée :
- [ ] Facture originale existante
- [ ] Date dans l'exercice (ou pré-constitution si compte courant)
- [ ] Montant correspondant à l'écriture
- [ ] Nature en lien avec l'activité sociale
- [ ] Compte PCMN approprié

### Test de cut-off charges

Vérifier les dernières factures du mois de clôture et les premières du mois suivant :
- Pas de charge de l'exercice suivant comptabilisée sur l'exercice
- Pas de charge de l'exercice omise (charges à payer — 44x PCMN)
- Cas spécial des abonnements mensuels chevauchant la clôture

## 6. Contrôle de l'ISOC

### Vérification du calcul

```
Résultat comptable
+ Réintégrations (dont ISOC si non déductible — art. 198 §1, 1° CIR 92)
- Déductions (RDT, déduction pour investissement, etc.)
= Résultat fiscal (base imposable ISOC)
```

**Point d'attention** : le résultat comptable est-il AVANT ou APRÈS ISOC ?
- Si avant ISOC -> résultat fiscal = résultat comptable (pas de réintégration)
- Si après ISOC -> réintégrer l'ISOC au résultat fiscal

### Conditions taux réduit PME — 20% (art. 215 al. 2 CIR 92)

- [ ] Petite société au sens du CSA
- [ ] Bénéfice imposable ≤ 100 000 € (proraté si exercice < 12 mois)
- [ ] Capital entièrement libéré
- [ ] Capital détenu à 50%+ par des personnes physiques
- [ ] Rémunération dirigeant ≥ 45 000 € ou = au bénéfice imposable si inférieur
- [ ] Seuil proraté si exercice < 12 mois : 100 000 x (nb jours / 365)

### Écriture comptable ISOC (PCMN)

```
D 6700 (Impôt des sociétés)    X
    C 450 (État — Impôts et taxes)    X
```

### Conventions réglementées / conflits d'intérêts (art. 5:76 CSA pour SRL / art. 7:96 CSA pour SA)

Vérifier que les conventions conclues entre la société et ses administrateurs, gérants ou actionnaires significatifs ont fait l'objet de la procédure de conflit d'intérêts requise par le CSA.
- Rapport spécial du réviseur requis dans les cas prévus par le CSA
- Registre des décisions de l'organe d'administration à consulter

## 7. Procédures de validation finale (ISA 560, ISA 570, ISA 580)

### Lettre d'affirmation (ISA 580)

L'associé unique / dirigeant confirme :
- [ ] Exhaustivité des informations communiquées au réviseur
- [ ] Absence de fraude ou irrégularités connues
- [ ] Pas de litiges en cours non révélés
- [ ] Pas d'engagements hors bilan non mentionnés
- [ ] Exactitude des informations relatives aux parties liées

### Événements postérieurs à la clôture (ISA 560)

Période : de la clôture à la date du rapport du réviseur.

Vérifier :
- [ ] Pas de perte de client majeur
- [ ] Pas de litige significatif survenu
- [ ] Pas de dépréciation d'actif nécessaire
- [ ] Continuité d'exploitation non compromise (ISA 570)
- [ ] Pas de modification significative du cadre réglementaire applicable

### Cohérence d'ensemble

- [ ] Tous les documents sont datés et cohérents entre eux
- [ ] Pas de contradiction entre les différentes pièces
- [ ] Les annexes aux comptes annuels (PCMN) reflètent fidèlement les opérations
- [ ] L'approbation des comptes est correctement formulée
- [ ] Les comptes annuels sont conformes au schéma de dépôt BNB applicable (complet / abrégé / micro)
- [ ] La déclaration ISOC (formulaire 275) est cohérente avec les comptes annuels

### Références entité belge

| Concept français | Équivalent belge |
|-----------------|-----------------|
| RCS | BCE (Banque-Carrefour des Entreprises) |
| SIREN/SIRET | Numéro d'entreprise BCE (10 chiffres) |
| PCG | PCMN (Plan Comptable Minimum Normalisé) |
| FEC | Livre-journal normalisé / balance comptable |
| NEP | ISA / ISRS |
| CNCC | IRE (Institut des Réviseurs d'Entreprises) |
| Commissaire aux comptes | Réviseur d'entreprises |
| Commission Départementale | Commission de conciliation fiscale |
| DGFIP | SPF Finances / AGFisc |
| SASU / EURL / SAS / SARL | SRL / SA / SNC / SCS |
| Art. L. 823-10 C. com. | Art. 3:72 CSA (nomination réviseur) |
| Art. L. 210-6 C. com. | Art. 2:2 CSA (engagements société en formation) |
| Art. L. 227-10 C. com. | Art. 5:76 CSA (SRL) / Art. 7:96 CSA (SA) (conflits d'intérêts) |
| Formulaires 2033/2572 | Déclaration ISOC 275 + comptes annuels BNB |
| Conservation dossier 10 ans | Conservation dossier 7 ans (art. 34, loi 7 déc. 2016) |
| IS 15% PME | ISOC 20% PME (art. 215 al. 2 CIR 92, plafond 100 000 €) |
| Franchise TVA 36 800 € | Franchise TVA 25 000 € CA (art. 56bis CTVA) |
