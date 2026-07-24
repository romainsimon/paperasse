# Plan Comptable Général (PCG)

> **Données complètes** : `data/pcg_YYYY.json` contient les 800+ comptes avec libellés.
> Ce fichier ne contient qu'un résumé structuré pour référence rapide.

## Structure des Classes

| Classe | Nature | Bilan/Résultat |
|--------|--------|----------------|
| 1 | Capitaux | Bilan (passif) |
| 2 | Immobilisations | Bilan (actif) |
| 3 | Stocks | Bilan (actif) |
| 4 | Tiers | Bilan (actif/passif) |
| 5 | Financiers | Bilan (actif) |
| 6 | Charges | Résultat |
| 7 | Produits | Résultat |

---

## Comptes les plus utilisés (TPE/PME)

### Classe 1 — Capitaux
- **101** Capital social
- **106** Réserves (1061 légale, 1068 autres)
- **110/119** Report à nouveau (créditeur/débiteur)
- **120/129** Résultat de l'exercice (bénéfice/perte)
- **145** Amortissements dérogatoires
- **164** Emprunts auprès des établissements de crédit

### Classe 2 — Immobilisations
- **205** Concessions, brevets, licences, logiciels
- **2183** Matériel de bureau et informatique
- **2184** Mobilier
- **2801–2818** Amortissements correspondants

### Classe 4 — Tiers
- **401** Fournisseurs
- **411** Clients
- **421** Personnel — rémunérations dues
- **431** Sécurité sociale
- **444** État — impôt sur les bénéfices
- **4456** TVA déductible (44562 sur immo, 44566 sur ABS)
- **4457** TVA collectée (44571)
- **44551** TVA à décaisser
- **44583** Remboursement de TVA demandé
- **455** Associés — comptes courants (4551 principal, 4558 intérêts)
- **486** Charges constatées d'avance
- **487** Produits constatés d'avance

### Classe 5 — Financiers
- **512** Banques (5121 euros, 5124 devises)
- **580** Virements internes

### Classe 6 — Charges
- **604** Achats d'études et prestations de services
- **606** Achats non stockés (6061 énergie, 6063 petit équipement, 6064 fournitures admin)
- **6132** Locations immobilières (bureau)
- **6135** Locations mobilières (SaaS, hosting)
- **614** Charges locatives et de copropriété
- **6161** Assurance multirisques
- **6181** Documentation générale
- **622** Honoraires et intermédiaires (6226 honoraires)
- **6231** Publicité, annonces
- **625** Déplacements, missions, réceptions
- **626** Frais postaux et télécommunications
- **627** Services bancaires (6278 commissions)
- **635** Autres impôts (6351 CFE)
- **641** Rémunérations du personnel
- **645** Charges sociales (6451 URSSAF)
- **651** Redevances, licences, noms de domaine
- **654** Pertes sur créances irrécouvrables
- **661** Charges d'intérêts
- **666** Pertes de change
- **6711** Pénalités sur marchés
- **6712** Pénalités, amendes fiscales
- **675** Valeurs comptables des éléments cédés
- **6811** Dotations aux amortissements
- **695** Impôts sur les bénéfices

### Classe 7 — Produits
- **706** Prestations de services
- **707** Ventes de marchandises
- **7082** Commissions et courtages
- **7088** Autres produits d'activités annexes
- **741** Subventions d'exploitation
- **765** Escomptes obtenus
- **766** Gains de change
- **775** Produits des cessions d'éléments d'actif
- **781** Reprises sur amortissements et provisions
- **791** Transferts de charges d'exploitation
