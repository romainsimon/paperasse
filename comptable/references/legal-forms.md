# Formes Juridiques des Entreprises en France

## Tableau Comparatif

| Critère | EI | EURL | SASU | SARL | SAS |
|---------|----|----- |------|------|-----|
| Associés | 1 | 1 | 1 | 2-100 | 2+ |
| Capital min. | - | 1 € | 1 € | 1 € | 1 € |
| Responsabilité | Illimitée* | Limitée | Limitée | Limitée | Limitée |
| Imposition défaut | IR | IR | IS | IS | IS |
| Option possible | IS | IS | IR (5 ans) | IR (5 ans) | IR (5 ans) |
| Dirigeant | Exploitant | Gérant | Président | Gérant(s) | Président |
| Régime social dirigeant | TNS | TNS | Assimilé salarié | TNS (majoritaire) / AS (minoritaire) | Assimilé salarié |

*Depuis 2022, patrimoine professionnel séparé par défaut.

---

## Entreprise Individuelle (EI)

### Caractéristiques

- Pas de personnalité morale distincte
- Patrimoine professionnel séparé (depuis 2022)
- Imposition IR catégorie BIC ou BNC
- Option IS possible (irréversible)

### Régime Fiscal

**Micro-entreprise (auto-entrepreneur):**
- Plafonds 2026 : 203 100 € (ventes) / 83 600 € (services)
- Versement libératoire possible
- Comptabilité ultra-simplifiée

**Réel:**
- BIC réel simplifié ou normal
- BNC déclaration contrôlée

### Régime Social

- TNS (Travailleur Non Salarié)
- Cotisations URSSAF sur bénéfice
- Base minimum si déficit

### Comptes Spécifiques

- **108** Compte de l'exploitant
- **644** Rémunération du travail de l'exploitant
- **646** Cotisations sociales personnelles

### Écritures Courantes

**Prélèvement personnel:**
```
  Débit 108 Compte de l'exploitant    X XXX,XX
  Crédit 512 Banque                   X XXX,XX
```

**Cotisations sociales:**
```
  Débit 646 Cotisations personnelles  X XXX,XX
  Crédit 512 Banque                   X XXX,XX
```

---

## EURL (Entreprise Unipersonnelle à Responsabilité Limitée)

### Caractéristiques

- SARL à associé unique
- Responsabilité limitée aux apports
- Personnalité morale distincte

### Régime Fiscal

**Défaut:** IR (transparence fiscale)
**Option:** IS (irrévocable après 5 ans)

### Régime Social du Gérant

| Qualité | Régime |
|---------|--------|
| Gérant associé unique | TNS |
| Gérant non associé | Assimilé salarié |

### Rémunération du Gérant Associé Unique

**Option IR:**
- Pas de rémunération déductible
- Résultat imposé directement à l'IR de l'associé

**Option IS:**
- Rémunération déductible du résultat
- Imposée à l'IR de l'associé (traitements et salaires)

**Écriture (EURL à l'IS):**
```
Rémunération gérant:
  Débit 641 Rémunérations             X XXX,XX
  Crédit 455 Compte courant associé   X XXX,XX
```

---

## SASU (Société par Actions Simplifiée Unipersonnelle)

### Caractéristiques

- SAS à actionnaire unique
- Grande liberté statutaire
- Responsabilité limitée aux apports
- Personnalité morale distincte

### Régime Fiscal

**Défaut:** IS
**Option:** IR (5 exercices maximum, conditions)

**Conditions option IR:**
- Moins de 5 ans d'existence
- < 50 salariés
- CA ou total bilan < 10 M€
- Non cotée
- Détenue à 50%+ par personnes physiques

### Régime Social du Président

- **Toujours assimilé salarié** (même si actionnaire unique)
- Affiliation régime général
- Pas de cotisations si non rémunéré
- Cotisations patronales et salariales si rémunéré

### Rémunération vs Dividendes

| | Rémunération | Dividendes |
|---|-------------|------------|
| Déductible IS | Oui | Non |
| Cotisations sociales | Oui (~80%) | PFU ou prélèvements sociaux (17,2%) |
| Protection sociale | Oui | Non |
| Trésorerie nécessaire | Oui | Bénéfice distribuable |

### Écritures Courantes

**Rémunération président:**
```
  Débit 641 Rémunérations personnel    X XXX,XX
  Crédit 421 Personnel - rémunérations X XXX,XX

Charges sociales:
  Débit 645 Charges sociales          X XXX,XX
  Crédit 431 Sécurité sociale         X XXX,XX
```

**Distribution dividendes:**
```
Décision AG:
  Débit 120 Résultat de l'exercice    X XXX,XX
  Crédit 457 Dividendes à payer       X XXX,XX

Paiement (après PFU):
  Débit 457 Dividendes à payer        X XXX,XX
  Crédit 4423 Retenues à la source        XXX,XX
  Crédit 512 Banque                   X XXX,XX
```

---

## SARL (Société à Responsabilité Limitée)

### Caractéristiques

- 2 à 100 associés
- Responsabilité limitée aux apports
- Parts sociales (non librement cessibles)

### Régime Fiscal

**Défaut:** IS
**Option IR:** Possible (5 ans max, conditions SARL de famille)

### Régime Social des Gérants

| Qualité du gérant | Régime |
|-------------------|--------|
| Majoritaire (>50% parts) | TNS |
| Égalitaire (50%) | TNS |
| Minoritaire (<50%) | Assimilé salarié |

**Cogérance:** Parts de tous les co-gérants et conjoints/pacsés/enfants mineurs cumulées.

### Dividendes Gérant Majoritaire

**Particularité:** Dividendes soumis à cotisations sociales TNS au-delà de 10% du capital + compte courant + primes d'émission.

```
Si dividendes > 10% × (capital + CC + primes):
  → Part excédentaire = assiette cotisations TNS
```

---

## SAS (Société par Actions Simplifiée)

### Caractéristiques

- 2+ actionnaires
- Très grande liberté statutaire
- Actions librement cessibles (sauf clause)
- Responsabilité limitée aux apports

### Régime Fiscal

- Identique SASU (IS par défaut, option IR possible)

### Organes de Direction

- **Président** (obligatoire)
- **Directeur général** (optionnel)
- Autres organes prévus par statuts

### Régime Social

Tous les dirigeants mandataires sociaux = assimilés salariés.

---

## Compte Courant d'Associé (455)

### Définition

Sommes mises à disposition de la société par les associés:
- Apports non rémunérés par des parts/actions
- Rémunérations non prélevées
- Remboursement de frais en attente

### Règles Fiscales

**Intérêts versés:**
- Déductibles si taux ≤ taux fiscal (taux BCE + 2 points)
- Excédent = réintégration fiscale

**Convention de compte courant:** Recommandée (taux, remboursement, garanties).

### Écritures

**Apport en compte courant:**
```
  Débit 512 Banque                    X XXX,XX
  Crédit 455 Compte courant associé   X XXX,XX
```

**Remboursement:**
```
  Débit 455 Compte courant associé    X XXX,XX
  Crédit 512 Banque                   X XXX,XX
```

**Intérêts courus:**
```
  Débit 6615 Intérêts comptes courants   XXX,XX
  Crédit 4558 Intérêts courus            XXX,XX
```

---

## Capital Social

### Apports

| Type | Contrepartie | Libération |
|------|--------------|------------|
| Numéraire | Parts/actions | 20% (SARL) ou 50% (SAS) à la création, solde 5 ans |
| Nature | Parts/actions | 100% immédiate |
| Industrie | Parts (SARL) | Pas dans le capital, droits de vote |

### Écritures de Constitution

**Promesse d'apport:**
```
  Débit 4561 Apports en société      XX XXX,XX
  Crédit 101 Capital social          XX XXX,XX
```

**Libération:**
```
  Débit 512 Banque                   XX XXX,XX
  Crédit 4561 Apports en société     XX XXX,XX
```

### Réduction et Augmentation

**Augmentation de capital:**
- Apports nouveaux
- Incorporation de réserves
- Conversion de créances (compte courant)

**Réduction de capital:**
- Absorption de pertes
- Remboursement aux associés

---

## Affectation du Résultat

### Ordre d'affectation

1. **Report à nouveau débiteur** (absorption des pertes antérieures)
2. **Réserve légale** (5% jusqu'à 10% du capital)
3. **Réserves statutaires** (si prévues)
4. **Dividendes**
5. **Report à nouveau** (solde)

### Écriture Type

```
Affectation bénéfice:
  Débit 120 Résultat (bénéfice)      XX XXX,XX
  Crédit 1061 Réserve légale          X XXX,XX
  Crédit 457 Dividendes               X XXX,XX
  Crédit 110 Report à nouveau         X XXX,XX
```

---

## Obligations Légales par Forme

### SARL / EURL

- Rapport de gestion (sauf petit EURL)
- Approbation des comptes (6 mois après clôture)
- Dépôt des comptes au greffe
- PV d'AG

### SAS / SASU

- Approbation des comptes (6 mois après clôture)
- Dépôt des comptes au greffe
- PV de décision de l'associé unique ou AG
- Rapport de gestion si seuils dépassés

**Seuils dispense rapport de gestion:**
- Total bilan ≤ 4 M€
- CA HT ≤ 8 M€
- Salariés ≤ 50
