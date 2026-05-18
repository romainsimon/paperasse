# Plan Comptable Minimum Normalisé (PCMN)

> **Données complètes** : `data/pcmn_2026.json` contient les comptes avec libellés.
> Ce fichier ne contient qu'un résumé structuré pour référence rapide.
>
> **Source** : Commission des Normes Comptables (CNC-CBN) — AR du 12 septembre 1983 portant exécution de la loi du 17 juillet 1975 relative à la comptabilité des entreprises.
> Consultez le plan complet sur https://www.cnc-cbn.be/fr/normes/plan-comptable-minimum-normalise

`last_updated: 2026-05-15`

## Structure des Classes

| Classe | Nature | Bilan/Résultat |
|--------|--------|----------------|
| 1 | Fonds propres, provisions, dettes > 1 an | Bilan (passif) |
| 2 | Frais d'établissement, actifs immobilisés, créances > 1 an | Bilan (actif) |
| 3 | Stocks et commandes en cours | Bilan (actif) |
| 4 | Créances et dettes à un an au plus | Bilan (actif/passif) |
| 5 | Placements de trésorerie et valeurs disponibles | Bilan (actif) |
| 6 | Charges | Résultat |
| 7 | Produits | Résultat |

---

## Comptes les plus utilisés (TPE/PME)

### Classe 1 — Fonds propres, provisions et dettes à long terme

- **100** Capital souscrit
- **101** Capital non appelé (-)
- **11** Primes d'émission
- **13** Réserves (130 légale, 131 indisponibles, 132 immunisées, 133 disponibles)
- **14** Bénéfice (Perte) reporté(e)
- **15** Subsides en capital
- **17** Dettes à long terme — établissements de crédit (170 emprunts hypothécaires, 173 autres, 175 financières)
- **185** Dettes de location-financement
- **19** Provisions pour risques et charges (190 pensions, 195 litiges, 199 autres)

### Classe 2 — Frais d'établissement et actifs immobilisés

- **20** Frais d'établissement (200 constitution, 201 émission d'emprunts)
- **21** Immobilisations incorporelles (210 R&D, 211 brevets/licences, 212 goodwill)
- **22** Terrains et constructions (220 terrains, 221 constructions)
- **23** Installations, machines et outillage
- **24** Mobilier et matériel roulant (240 mobilier de bureau, 241 matériel informatique, 243 véhicules)
- **25** Immobilisations en location-financement
- **28** Amortissements et réductions de valeur (-) (280 frais d'établissement, 281 incorporelles, 282 terrains/constructions, 283 installations, 284 mobilier/matériel)
- **29** Créances à plus d'un an

### Classe 4 — Créances et dettes à court terme

**Actif (créances) :**
- **400** Clients
- **401** Effets à recevoir
- **404** Créances commerciales douteuses
- **409** Réductions de valeur sur créances commerciales (-)
- **410** TVA à récupérer
- **411** Précomptes récupérables
- **416** Créances diverses — compte courant associé (débiteur)
- **470** Charges à reporter (régularisation actif)
- **472** Produits acquis

**Passif (dettes) :**
- **440** Fournisseurs
- **441** Effets à payer
- **450** ISOC à payer
- **451** TVA à payer
- **452** Précompte professionnel à verser
- **453** Précompte mobilier à verser
- **454** Rémunérations à payer
- **455** ONSS à payer
- **456** Compte courant associé (créditeur)
- **489** Dividendes à payer
- **492** Charges à imputer (régularisation passif)
- **493** Produits à reporter

### Classe 5 — Placements de trésorerie et valeurs disponibles

- **550** Banque — compte courant
- **551** Banque — compte épargne
- **57** Caisses
- **58** Virements internes

### Classe 6 — Charges

**Achats (60) :**
- **600** Achats de matières premières
- **604** Achats de services et biens divers (sous-traitance)
- **609** Remises et ristournes sur achats (-)

**Services et biens divers (61) :**
- **610** Loyers et charges locatives
- **611** Entretien et réparations (locaux)
- **612** Eau, gaz, électricité
- **613/614** Assurances et primes d'assurance
- **615** Frais de bureau (fournitures)
- **616** Frais de transport sur achats
- **617** Frais de téléphone et internet
- **618** Hébergement web, licences logiciels (SaaS)
- **619** Autres services et biens divers

**Rémunérations et charges sociales (62) :**
- **620** Rémunérations du personnel
- **621** Charges ONSS patronales (~25%)
- **622** Rémunérations des dirigeants
- **623** Autres charges de personnel
- **624** Avantages en nature (véhicule, logement)

**Amortissements et provisions (63) :**
- **630** Dotations aux amortissements sur frais d'établissement et immobilisations
- **631** Réductions de valeur sur stocks
- **634** Provisions pour risques et charges
- **635** Provisions pour pensions et charges similaires

**Autres charges d'exploitation (64) :**
- **640** Taxes et impôts directs (précompte immobilier)
- **641** Taxes diverses
- **643** Moins-values sur actifs immobilisés
- **644** Cotisations caisse de pension, assurance-groupe
- **649** Charges d'exploitation diverses

**Charges financières (65) :**
- **650** Charges d'intérêts
- **653** Charges d'escompte
- **654** Différences de change (pertes)
- **659** Autres charges financières

**Charges exceptionnelles (66) :**
- **660** Amortissements et réductions de valeur exceptionnels
- **663** Moins-values sur réalisation d'actifs immobilisés
- **664** Autres charges exceptionnelles

**Impôts sur le résultat (67) :**
- **670** ISOC dû — exercice courant
- **671** Cotisation minimale d'ISOC
- **672** Impôt sur les bénéfices des exercices antérieurs

### Classe 7 — Produits

**Chiffre d'affaires (70) :**
- **700** Ventes de marchandises
- **701** Prestations de services
- **706** Rabais, remises et ristournes accordés (-)

**Autres produits d'exploitation (74) :**
- **740** Subsides d'exploitation et montants compensatoires
- **741** Subsides en capital — quote-part de l'exercice
- **743** Plus-values réalisées sur actifs immobilisés
- **744** Produits des débiteurs douteux recouvrés
- **745** Reprises de provisions d'exploitation
- **749** Autres produits d'exploitation

**Produits financiers (75) :**
- **750** Produits des immobilisations financières (dividendes)
- **751** Produits des actifs circulants (intérêts)
- **754** Différences de change (gains)
- **755** Subsides en intérêts
- **759** Autres produits financiers

**Produits exceptionnels (76) :**
- **760** Reprises d'amortissements et réductions de valeur
- **763** Plus-values sur réalisation d'actifs immobilisés
- **764** Autres produits exceptionnels

**Régularisations fiscales (77) :**
- **77** Régularisations d'impôts et reprises de provisions pour impôts

---

## Spécificités belges du PCMN

### Différences clés avec le PCG français

| Concept | France (PCG) | Belgique (PCMN) |
|---------|-------------|-----------------|
| Client | 411 | 400 |
| Fournisseur | 401 | 440 |
| TVA déductible | 44562/44566 | 410 |
| TVA collectée | 44571 | 451 |
| ISOC/IS | 444/695 | 450 (dette) / 670 (charge) |
| Précompte professionnel | — | 452 |
| ONSS à payer | 431 (URSSAF) | 455 |
| Compte courant associé | 455/4558 | 416 (actif) / 456 (passif) |
| Dividendes à payer | 457 | 489 |
| Banque | 512 | 550 |

### Seuil d'immobilisation

En Belgique, le seuil minimal d'immobilisation est défini par la politique comptable de l'entreprise (généralement 250 EUR ou 500 EUR HT). Les biens en dessous du seuil choisi sont comptabilisés en charge (classe 6).

### Comptes annuels BNB

Les comptes annuels belges sont déposés à la Centrale des Bilans de la Banque Nationale de Belgique (BNB) selon trois schémas :
- **Schéma complet** : grandes entreprises et groupes
- **Schéma abrégé** : PME (petites sociétés au sens art. 1:24 CSA)
- **Schéma micro** : micro-entreprises (art. 1:25 CSA)

Dépôt : https://cri.nbb.be/
