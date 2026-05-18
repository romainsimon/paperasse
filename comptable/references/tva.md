# TVA — Taxe sur la Valeur Ajoutée (Belgique)

`last_updated: 2026-05-15`

Base légale : **Code de la TVA (CTVA)**, loi du 3 juillet 1969. Administration : SPF Finances, via le portail **Intervat** (https://intervat.minfin.fgov.be).

## Taux de TVA en Belgique (2026)

| Taux | Application |
|------|-------------|
| **21%** | Taux normal — majorité des biens et services |
| **12%** | Taux intermédiaire — produits phytopharmaceutiques, certains travaux immobiliers (logement social), charbons, margarine, restauration (repas chauds) |
| **6%** | Taux réduit — produits alimentaires de base, livres (y.c. numériques), médicaments non remboursables, logement social, travaux de rénovation logements > 10 ans, transport de personnes, eau, services funéraires |
| **0%** | Exportations hors UE, livraisons intracommunautaires (B2B), certaines opérations spécifiques |

> Vérifiez toujours le taux applicable sur https://finances.belgium.be — les taux réduits font l'objet de conditions précises.

---

## Régimes de TVA

### 1. Franchise de la Taxe — art. 56bis CTVA

**Seuil (2026) : 25 000 € de chiffre d'affaires annuel** (depuis 2025).

**Caractéristiques :**
- Pas de TVA collectée ni facturée
- Pas de TVA déductible
- Mention obligatoire sur factures : *"Régime particulier de franchise — TVA non applicable"*
- Déclaration client-listing annuel toujours applicable si CA > 0

**Dépassement du seuil :**
- TVA applicable à partir du 1er janvier de l'année suivante (si dépassement constaté en cours d'année)
- En cas de dépassement exceptionnel > 10% du seuil, assujettissement immédiat
- Demander un numéro de TVA belge (format BE0xxx.xxx.xxx) via le formulaire **604A** (SPF Finances)

### 2. Régime Trimestriel (PME)

**Seuil :** CA annuel ≤ 2 500 000 € TVAC.

**Obligations :**
- Déclaration TVA trimestrielle via Intervat
- Dépôt et paiement : **20 du mois suivant** la fin du trimestre
  - T1 (janv-mars) → 20 avril
  - T2 (avr-juin) → 20 juillet
  - T3 (juil-sept) → 20 octobre
  - T4 (oct-déc) → 20 janvier N+1

**Acomptes mensuels :** Facultatifs pour les assujettis trimestriels, mais obligatoires si la TVA annuelle dépasse certains montants (vérifier arrêté royal en vigueur).

### 3. Régime Mensuel

**Seuil :** CA annuel > 2 500 000 € TVAC.

**Aussi sur option :** Les assujettis trimestriels peuvent opter pour la déclaration mensuelle (intérêt si crédit de TVA structurel).

**Obligations :**
- Déclaration TVA mensuelle via Intervat
- Dépôt et paiement : **20 du mois suivant**
  - Janvier → 20 février
  - Février → 20 mars
  - ...
  - Décembre → 20 janvier N+1

**Écriture mensuelle :**
```
Centralisation TVA :
  Débit 451 TVA à payer               XX XXX,XX
  Crédit 410 TVA à récupérer          XX XXX,XX
  Crédit/Débit 550 Banque (solde)      X XXX,XX
```

---

## TVA Intracommunautaire

### Achats Intracommunautaires (B2B)

**Principe :** Autoliquidation — l'acheteur belge déclare et déduit la TVA belge (art. 51 §2 CTVA).

**Écriture :**
```
Achat intracommunautaire 1 000 € (TVA 21%) :
  Débit 604/61X Achats               1 000,00
  Débit 410 TVA à récupérer            210,00
  Crédit 440 Fournisseur             1 000,00
  Crédit 451 TVA à payer               210,00
```

La TVA due et la TVA déductible s'annulent si droit à déduction total.

**Déclaration :**
- Grille 86 de la déclaration TVA belge : acquisitions intracommunautaires

### Ventes Intracommunautaires (B2B)

**Principe :** Exonération avec droit à déduction (art. 39bis CTVA).

**Conditions :**
- Client assujetti avec numéro TVA intracom valide (vérification VIES obligatoire)
- Bien expédié vers un autre État membre (preuve de transport)

**Mention facture :** *"Exonération de TVA — livraison intracommunautaire, art. 39bis CTVA"*

**Vérification numéro TVA :** https://ec.europa.eu/taxation_customs/vies/

### Prestations de Services Intra-UE (B2B)

**Règle générale :** TVA due dans le pays du preneur (client) — autoliquidation par le client.

**Mention facture :** *"Autoliquidation — TVA due par le preneur, art. 51 §2 CTVA"*

**Déclaration :**
- État récapitulatif intracommunautaire (état client IC) : déclaration mensuelle ou trimestrielle des prestations B2B intra-UE via Intervat

---

## TVA Import/Export

### Importations (hors UE)

**Autoliquidation :** L'assujetti belge déclare la TVA à l'importation (report sur déclaration TVA, pas de paiement douanier immédiat pour les opérateurs agréés).

**Écriture :**
```
Importation 2 000 € (TVA 21%) :
  Débit 600/604 Achats               2 000,00
  Débit 410 TVA à récupérer            420,00
  Crédit 440 Fournisseur             2 000,00
  Crédit 451 TVA à payer               420,00
```

### Exportations (hors UE)

**Principe :** Exonération totale avec droit à déduction (art. 39 CTVA).

**Mention facture :** *"Exonération de TVA — exportation, art. 39 CTVA"*

---

## TVA sur Encaissements vs Débits

### Services (par défaut : débits)

En Belgique, la TVA sur les prestations de services est en principe **exigible lors de la facturation** (régime des débits), contrairement à la France.

**Exception :** Les acomptes reçus avant facturation rendent la TVA exigible à la date de l'encaissement de l'acompte.

### Livraisons de Biens

La TVA est exigible à la livraison du bien.

---

## TVA et E-commerce (OSS/IOSS)

### Ventes B2C Intra-UE

**Seuil unique UE :** 10 000 € de ventes B2C intra-UE par an.

**En dessous du seuil :** TVA belge applicable.

**Au-dessus du seuil :**
- TVA du pays du consommateur
- Inscription au guichet OSS (One Stop Shop) ou immatriculation dans chaque pays
- Déclaration OSS via MyMinfin (guichet OSS belge)

### IOSS (Import One Stop Shop)

Pour les ventes de biens < 150 € importés de pays tiers vers des consommateurs UE.

---

## Listing TVA Annuel (Obligation belge spécifique)

**Obligation :** Tout assujetti belge doit transmettre **annuellement** la liste des clients assujettis à la TVA belge auxquels il a fourni des biens ou services pour un montant > **250 € par an**.

**Délai :** **31 mars** de l'année suivante.

**Transmission :** Via Intervat (listing clients annuel).

**Contenu :** Pour chaque client : numéro de TVA belge, montant total des opérations, montant de TVA.

**Sanctions :** Amende administrative en cas de non-dépôt ou dépôt tardif.

---

## Crédits de TVA

Quand TVA déductible > TVA collectée.

**Options :**
1. Report sur déclarations suivantes
2. Remboursement trimestriel (si mensuel) ou annuel (si trimestriel)
3. Remboursement mensuel sur demande (assujettis mensuels remplissant les conditions)

**Demande de remboursement :** Via la déclaration TVA (case à cocher dans Intervat). Traitement par le Centre de Contrôle TVA compétent.

---

## Régularisation TVA sur Immobilisations

**Période de révision belge :**
- Biens meubles : **5 ans** (1/5 par an)
- Immeubles : **15 ans** (1/15 par an)

**Cas de révision :**
- Cession du bien
- Changement d'affectation (usage privé/usage professionnel)
- Modification du prorata de déduction

---

## Facture Électronique (Peppol / Mercurius)

**Obligation e-facturation B2B belge depuis le 1er janvier 2026 :**
Toute facture entre assujettis belges doit être émise au format électronique structuré via le réseau **Peppol** (format Peppol BIS 3.0 ou UBL 2.1 conforme EN 16931).

**Réseau belge :** Mercurius (plateforme de routage Peppol connectée à la plateforme B2B du gouvernement belge).

**Numéro de routage Peppol :** Basé sur le numéro BCE (format : `0208:0xxx.xxx.xxx`).

**Obligation progressive :**
- Grandes entreprises : depuis 2026
- PME : selon calendrier SPF Finances (vérifier arrêté royal)

**Mention facture (numéro TVA belge) :** Format `BE0xxx.xxx.xxx`

---

## Mentions Relatives à la TVA sur Factures Belges

1. **Numéro de TVA belge** de l'émetteur : `BE0xxx.xxx.xxx`
2. **Numéro de TVA** du client (si assujetti)
3. **Taux de TVA** applicable
4. **Montant HTVA** par taux
5. **Montant de TVA** par taux
6. **Montant TVAC** (Total TTC)

### Mentions d'exonération

| Situation | Mention obligatoire |
|-----------|---------------------|
| Franchise (art. 56bis CTVA) | *"Régime particulier de franchise — TVA non applicable"* |
| Exportation | *"Exonération de TVA — exportation, art. 39 CTVA"* |
| Livraison intracommunautaire | *"Exonération de TVA — livraison intracommunautaire, art. 39bis CTVA"* |
| Autoliquidation services | *"Autoliquidation — TVA due par le preneur, art. 51 §2 CTVA"* |
| Cocontractant (construction) | *"Autoliquidation — régime cocontractant, art. 20 AR n°1"* |

---

## Erreurs Fréquentes

### 1. Oubli d'autoliquidation intracommunautaire

Achat intra-UE ou import sans autoliquidation = TVA non déductible et amende.

### 2. Seuil franchise

Surveiller le CA mensuel cumulé pour ne pas dépasser 25 000 € sans immatriculation.

### 3. Listing annuel oublié

L'absence de listing TVA annuel est sanctionnée même si la TVA elle-même est correcte.

### 4. TVA non déductible en Belgique

TVA non récupérable sur :
- Véhicules de tourisme (récupération limitée à **50%** — art. 45 §2 CTVA)
- Frais de restaurant (TVA non déductible en principe)
- Dépenses de logement personnel
- Cadeaux > 50 € par bénéficiaire et par an (TVAC)
- Tabac, alcool (certaines restrictions)

---

## Calendrier TVA Belge

### Régime Mensuel

| Période | Dépôt Intervat | Paiement |
|---------|---------------|---------|
| Mois M | 20 du mois M+1 | 20 du mois M+1 |

### Régime Trimestriel

| Trimestre | Dépôt | Paiement |
|-----------|-------|---------|
| T1 (janv-mars) | 20 avril | 20 avril |
| T2 (avr-juin) | 20 juillet | 20 juillet |
| T3 (juil-sept) | 20 octobre | 20 octobre |
| T4 (oct-déc) | 20 janvier N+1 | 20 janvier N+1 |

### Listing TVA Annuel

| Obligation | Délai |
|------------|-------|
| Listing clients assujettis (> 250 €/client) | 31 mars N+1 |

### État Récapitulatif Intracommunautaire (état client IC)

| Régime TVA | Fréquence |
|-----------|-----------|
| Mensuel | Mensuel (20 du mois suivant) |
| Trimestriel | Trimestriel (20 du mois suivant le trimestre) |
