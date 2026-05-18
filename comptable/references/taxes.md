# Impôts et Taxes des Entreprises en Belgique

`last_updated: 2026-05-15`

## Impôt des Sociétés (ISOC)

### Taux d'ISOC (2026)

| Situation | Taux |
|-----------|------|
| Taux normal | **25%** (art. 215 al. 1 CIR 92) |
| Taux réduit PME | **20%** sur les premiers 100 000 € de bénéfice imposable (art. 215 al. 2 CIR 92) |

**Conditions pour le taux réduit PME (20%) :**
- Petite société au sens du CSA (art. 1:24)
- Pas cotée en bourse
- Au moins un dirigeant reçoit une rémunération minimale de 45 000 € (ou égale au résultat imposable si celui-ci est inférieur)
- Capital détenu à 50%+ par des personnes physiques (condition principale)

### Calcul du Résultat Fiscal

```
Résultat comptable
+ Réintégrations (DNA — Dépenses Non Admises, art. 74 CIR 92)
- Déductions (RDT, revenus définitivement taxés, art. 202 CIR 92)
- Déductions pour investissements
- Pertes fiscales antérieures reportées
= Résultat fiscal imposable
```

### Dépenses Non Admises (DNA) — art. 74 CIR 92

| Charge | Règle |
|--------|-------|
| Amendes et pénalités fiscales | Non admises |
| ISOC lui-même | Non admis |
| Cotisations patronales de voiture (taxe CO2) | Partiellement non admise |
| Dépenses somptuaires (chasse, pêche, yachts) | Non admises |
| Avantages anormaux et bénévoles | Non admis |
| Frais de voiture | Déductibilité limitée (50% à 100% selon émissions CO2) |
| Intérêts compte courant excessifs | Partie excessive non admise |

### Revenus Définitivement Taxés (RDT) — art. 202 CIR 92

Exonération des dividendes reçus de filiales belges ou étrangères qualifiées :
- **Condition de participation** : au moins 10% du capital ou valeur d'acquisition ≥ 2 500 000 €
- **Durée de détention** : au moins 12 mois en pleine propriété
- **Quotité déductible** : 100% (exonération totale des dividendes qualifiés)

Cette déduction RDT évite la double imposition économique des dividendes dans les groupes.

### Versements Anticipés (VA) — ISOC

**4 versements trimestriels :**

| Versement | Échéance | Bonification accordée |
|-----------|----------|-----------------------|
| VA1 | **10 avril** | 9% × 3/12 = 2,25% |
| VA2 | **10 juillet** | 9% × 2/12 = 1,50% |
| VA3 | **10 octobre** | 9% × 1/12 = 0,75% |
| VA4 | **20 décembre** | 0% |

**Bonification totale si paiement anticipé suffisant : 6,75%** (réduit l'ISOC dû).

**Accroissement si pas de versements anticipés ou insuffisants : 9%** de l'ISOC dû (majoré sur la cotisation de base).

> Exemple : ISOC dû = 10 000 €. Sans VA → accroissement de 900 € → ISOC total = 10 900 €.
> Si VA suffisants → bonification de 675 € → ISOC total = 9 325 €.

**Dispense de VA :** Première année civile d'activité d'une nouvelle société (dispense d'accroissement pour les 3 premiers exercices selon art. 218 CIR 92).

### Comptabilisation ISOC

**Versement anticipé :**
```
  Débit 450 ISOC à payer             X XXX,XX
  Crédit 550 Banque                  X XXX,XX
```

**Charge ISOC en fin d'exercice :**
```
  Débit 670 ISOC dû — exercice      X XXX,XX
  Crédit 450 ISOC à payer            X XXX,XX
```

### Déclaration ISOC 275

La déclaration ISOC se dépose via **Tax-on-web entreprises** (https://www.taxonweb.be) dans un délai de **7 mois après la clôture de l'exercice**.

Pour un exercice clos au 31/12/N : délai = **31 juillet N+1** (en pratique, la date exacte est fixée annuellement par arrêté royal).

Formulaire : **275** (déclaration à l'ISOC) — remplace la liasse fiscale française 2065/2033.

Dépôt obligatoirement électronique via Tax-on-web ou Biztax.

### Report des Pertes Fiscales

**En avant (illimité) :**
- Report sur bénéfices futurs sans limitation de montant ni de durée
- Pas de plafonnement belge contrairement à la règle française

**Pas de carry-back en Belgique :**
La législation belge ne prévoit pas de report en arrière des pertes (contrairement à la France).

---

## Précompte Professionnel (PP)

Le précompte professionnel est une retenue à la source effectuée par l'employeur sur les rémunérations des travailleurs et dirigeants.

**Taux :** Variable selon le barème progressif IPP (Impôt des Personnes Physiques).

**Paiement :** Mensuel, au plus tard le **15 du mois suivant** le paiement des rémunérations (via Intervat ou virement référencé).

**Comptabilisation :**
```
Salaires bruts :
  Débit 620 Rémunérations           X XXX,XX
  Crédit 452 Précompte prof. à verser  XXX,XX
  Crédit 454 Rémunérations à payer  X XXX,XX

Cotisations ONSS patronales :
  Débit 621 Charges ONSS            X XXX,XX
  Crédit 455 ONSS à payer           X XXX,XX
```

---

## Précompte Mobilier

Retenue à la source sur les revenus de capitaux mobiliers (dividendes, intérêts).

**Taux standard :** 30% sur les dividendes distribués (art. 269 CIR 92).

**Taux réduit dividendes PME (VVPR bis) :** 15% après 2 ans / 20% après 1 an de détention des nouvelles actions (art. 269 §2 CIR 92).

**Comptabilisation de la distribution de dividendes :**
```
Décision AG :
  Débit 14 Bénéfice reporté         X XXX,XX
  Crédit 489 Dividendes à payer     X XXX,XX

Paiement (après PM 30%) :
  Débit 489 Dividendes à payer      X XXX,XX
  Crédit 453 Précompte mobilier       XXX,XX
  Crédit 550 Banque                 X XXX,XX
```

---

## Cotisation Distincte sur Avantages Anormaux

En Belgique, les **avantages anormaux ou bénévoles** accordés à des tiers non-résidents (ou à certains bénéficiaires sans lien commercial justifié) sont soumis à une cotisation distincte (art. 219 CIR 92) de **100%** sur le montant non justifié.

---

## Impôt des Personnes Physiques (IPP) — Dirigeants

Les dirigeants d'entreprise sont imposés à l'IPP sur leurs rémunérations.

**Barème IPP 2026 (revenus 2025) :**

| Tranche | Taux |
|---------|------|
| 0 — 15 820 € | 25% |
| 15 821 — 27 920 € | 40% |
| 27 921 — 48 320 € | 45% |
| > 48 320 € | 50% |

Plus les centimes additionnels communaux (en moyenne 7-8% de l'IPP).

**Déclaration IPP :** Via Tax-on-web (https://www.taxonweb.be), généralement juin-juillet de l'année suivante.

---

## Taxe sur les Véhicules

**Taxe de mise en circulation (TMC) :** Taxe unique à l'immatriculation, perçue par les régions.

**Taxe de circulation (TC) :** Taxe annuelle sur possession du véhicule, perçue par les régions.

**Cotisation patronale CO2 :** Pour les véhicules de société mis à disposition, cotisation trimestrielle calculée sur les émissions CO2 (art. 38 §3quater CIR 92). Non déductible ISOC.

**Avantage de toute nature (ATN) voiture :** L'utilisation privée d'un véhicule de société donne lieu à un ATN imposable à l'IPP du bénéficiaire, calculé selon la formule : `(CO2 référence / CO2 voiture) × valeur catalogue × 6/7 × %utilisation privée`.

---

## Crédits et Déductions Fiscales Belges

### Déduction pour Investissements (DPI)

**Taux de base :** Variable selon exercice et type d'investissement.
**Petites sociétés (art. 68 CIR 92) :** Majoré — vérifier le taux en vigueur auprès du SPF Finances.

**Investissements éligibles :**
- Immobilisations corporelles ou incorporelles nouvellement acquises
- Affectées à l'activité professionnelle en Belgique
- Amortissables

### Déduction des Intérêts Notionnels (anciens exercices)

Ce régime a été supprimé (dernier exercice d'application progressivement réduit). Il permettait de déduire un intérêt fictif sur les fonds propres.

### Déduction INNOVATION (patent box)

Déduction de **85%** des revenus nets provenant de brevets et droits de propriété intellectuelle développés (art. 205/1 à 205/4 CIR 92).

---

## Obligations Déclaratives

### Fiches fiscales (281.xx)

Les rémunérations versées à des tiers (dirigeants, travailleurs, prestataires) doivent faire l'objet de fiches fiscales annuelles :
- **Fiche 281.10** : rémunérations des travailleurs
- **Fiche 281.20** : rémunérations des dirigeants d'entreprise
- **Fiche 281.50** : commissions, courtages, honoraires

**Délai :** Avant le 1er mars de l'année suivante (via Belcotax-on-web).

### Déclaration ISOC 275

| Clôture | Délai dépôt |
|---------|-------------|
| 31/12 | 31 juillet N+1 (en principe) |
| Autre date | 7 mois après la clôture |

Dépôt via : Tax-on-web entreprises (https://www.taxonweb.be) ou mandataire fiscal.

---

## Ressources

- **SPF Finances** : https://finances.belgium.be
- **Tax-on-web** : https://www.taxonweb.be
- **Fisconetplus (législation fiscale belge)** : https://www.fisconetplus.be
- **CIR 92 (Code des Impôts sur les Revenus 1992)** : texte coordonné sur fisconetplus.be
