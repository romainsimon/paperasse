# TVA - Taxe sur la Valeur Ajoutée

## Taux de TVA en France (2026)

| Taux | Application |
|------|-------------|
| 20% | Taux normal - majorité des biens et services |
| 10% | Taux intermédiaire - restauration, travaux rénovation, transports |
| 5,5% | Taux réduit - produits alimentaires, livres, énergie, spectacles |
| 2,1% | Taux super-réduit - médicaments remboursables, presse |

### Taux spéciaux DOM

| Territoire | Normal | Réduit |
|------------|--------|--------|
| Guadeloupe, Martinique, Réunion | 8,5% | 2,1% |
| Guyane, Mayotte | Exonéré | Exonéré |

---

## Régimes de TVA

### 1. Franchise en Base

**Seuils (2026):**
- Services: 37 500 € (tolérance 41 250 €)
- Ventes de marchandises: 85 000 € (tolérance 93 500 €)
- Activités mixtes: seuils cumulatifs

**Caractéristiques:**
- Pas de TVA collectée ni facturée
- Pas de TVA déductible
- Mention obligatoire sur factures: "TVA non applicable, art. 293 B du CGI"

**Dépassement du seuil:**
- TVA applicable dès le 1er jour du mois de dépassement
- Devenir redevable immédiatement
- Demander un numéro de TVA intracommunautaire

### 2. Régime Réel Simplifié

**Seuils (2026):**
- Services: 37 500 € à 254 000 €
- Ventes: 85 000 € à 840 000 €

**Obligations:**
- Déclaration annuelle CA12 (avant le 2ème jour ouvré suivant le 1er mai)
- Acomptes semestriels (juillet et décembre)
- Acompte juillet = 55% de la TVA N-1
- Acompte décembre = 40% de la TVA N-1

**Comptabilisation des acomptes:**
```
Versement acompte:
  Débit 44581 TVA - Acomptes régime simplifié
  Crédit 512 Banque

Régularisation annuelle (TVA à payer):
  Débit 44571 TVA collectée
  Crédit 44566 TVA déductible sur ABS
  Crédit 44562 TVA déductible sur immobilisations
  Crédit 44581 TVA - Acomptes
  Crédit 44551 TVA à décaisser (solde)
```

### 3. Régime Réel Normal

**Seuils:**
- Services: > 254 000 €
- Ventes: > 840 000 €
- Ou sur option

**Obligations:**
- Déclaration mensuelle CA3 (avant le 24 du mois suivant)
- Déclaration trimestrielle si TVA annuelle < 4 000 €

**Écriture mensuelle:**
```
Débit 44571 TVA collectée
Crédit 44566 TVA déductible sur ABS
Crédit 44562 TVA déductible sur immobilisations
Crédit 44551 TVA à décaisser
```

### 4. Mini-Réel

Option pour être au réel normal pour la TVA tout en restant au réel simplifié pour l'IS/IR.

---

## TVA Intracommunautaire

### Achats Intracommunautaires (B2B)

**Principe:** Autoliquidation - l'acheteur français déclare et déduit la TVA.

**Écriture:**
```
Achat intracommunautaire 1000€:
  Débit 604/607 Achats             1 000,00
  Débit 4452 TVA due intracom        200,00
  Crédit 401 Fournisseur           1 000,00
  Crédit 4452 TVA due intracom       200,00
```

Note: La TVA due et la TVA déductible s'annulent si droit à déduction total.

**Déclaration:**
- Ligne 3B de la CA3: acquisitions intracommunautaires
- DEB (Déclaration d'Échanges de Biens) si > 460 000 €/an

### Ventes Intracommunautaires (B2B)

**Principe:** Exonération avec droit à déduction.

**Conditions:**
- Client assujetti avec numéro TVA intracom valide
- Bien expédié hors de France vers autre État membre
- Preuve du transport

**Mention facture:** "Exonération de TVA, art. 262 ter I du CGI"

**Vérification numéro TVA:** https://ec.europa.eu/taxation_customs/vies/

### Prestations de Services Intra-UE (B2B)

**Règle générale:** TVA due dans le pays du preneur (client).

**Écriture (prestation reçue):**
```
Prestation service intra-UE 500€:
  Débit 604 Achats prestations       500,00
  Débit 4452 TVA due intracom        100,00
  Crédit 401 Fournisseur             500,00
  Crédit 4452 TVA due intracom       100,00
```

**Déclaration:**
- Ligne 2A de la CA3: services
- DES (Déclaration Européenne de Services)

---

## TVA Import/Export

### Importations (hors UE)

**Depuis 01/01/2022:** Autoliquidation obligatoire pour les assujettis.

**Écriture:**
```
Importation marchandises 2000€:
  Débit 607 Achats marchandises    2 000,00
  Débit 44566 TVA déductible         400,00
  Crédit 401 Fournisseur           2 000,00
  Crédit 4452 TVA import             400,00
```

### Exportations (hors UE)

**Principe:** Exonération totale avec droit à déduction.

**Conditions:**
- Sortie effective du territoire UE
- Justificatifs douaniers (DAU, EX-A)

**Mention facture:** "Exonération de TVA, art. 262 I du CGI"

---

## TVA sur les Encaissements vs Débits

### Services (par défaut: encaissements)

La TVA est exigible à l'encaissement du prix.

**Option pour les débits:** Possible, la TVA devient exigible à la facturation.

### Livraisons de Biens (débits)

La TVA est exigible à la livraison/facturation.

### Comptabilisation TVA sur encaissements

Entre la facturation et le paiement, la TVA collectée n'est pas encore exigible.
Elle est logée dans un compte d'attente, subdivision du 4458 « TVA à régulariser » :
44580 ou 44574 « TVA collectée sur les encaissements » sont les deux conventions
répandues (le PCG autorise les subdivisions du 445, aucune des deux n'est imposée).

**Ne pas utiliser 44587** : ce compte est réservé à la TVA sur factures à établir
en clôture d'exercice (contrepartie 418), voir `closing.md`. Ce n'est pas le compte
d'attente du flux courant.

**À la facturation:**
```
  Débit 411 Client                          1 200,00
  Crédit 706 Prestations                    1 000,00
  Crédit 44574 TVA sur encaissements          200,00   (attente, non exigible)
```

**À l'encaissement:**
```
  Débit 512 Banque                          1 200,00
  Crédit 411 Client                         1 200,00

  Débit 44574 TVA sur encaissements           200,00
  Crédit 44571 TVA collectée                  200,00   (exigibilité)
```

---

## TVA et E-commerce (OSS/IOSS)

### Ventes B2C Intra-UE

**Seuil unique:** 10 000 € de ventes B2C intra-UE par an.

**En dessous du seuil:** TVA française applicable.

**Au-dessus du seuil:**
- TVA du pays du consommateur
- Inscription au guichet OSS (One Stop Shop) ou immatriculation dans chaque pays

### OSS (One Stop Shop)

Guichet unique pour déclarer et payer la TVA due dans d'autres États membres.

- Déclaration trimestrielle
- Paiement centralisé
- Pas d'immatriculation dans chaque pays

### IOSS (Import One Stop Shop)

Pour les ventes de biens < 150 € importés de pays tiers vers des consommateurs UE.

---

## Régularisations et Crédits de TVA

### Crédit de TVA

Quand TVA déductible > TVA collectée.

**Options:**
1. Report sur déclarations suivantes
2. Demande de remboursement (minimum 150 € annuel, 760 € trimestriel)

**Demande de remboursement:**
- Formulaire 3519
- Joindre relevé des factures d'achats

### Régularisation TVA Immobilisations

**Période de régularisation:**
- Biens meubles: 5 ans
- Immeubles: 20 ans

**Cas de régularisation:**
- Cession du bien
- Changement d'affectation
- Modification du coefficient de déduction

---

## Factures et Mentions Obligatoires TVA

### Mentions relatives à la TVA

1. **Numéro de TVA intracommunautaire** du vendeur
2. **Numéro de TVA intracommunautaire** de l'acheteur (si applicable)
3. **Taux de TVA** applicable
4. **Montant HT** par taux
5. **Montant de TVA** par taux
6. **Montant TTC**

### Mentions d'exonération

| Situation | Mention obligatoire |
|-----------|---------------------|
| Franchise en base | "TVA non applicable, art. 293 B du CGI" |
| Export | "Exonération de TVA, art. 262 I du CGI" |
| Livraison intra-UE | "Exonération de TVA, art. 262 ter I du CGI" |
| Autoliquidation services | "Autoliquidation" |

---

## Erreurs Fréquentes

### 1. Oubli d'autoliquidation

Achat intra-UE ou import sans autoliquidation = TVA non déductible.

### 2. TVA sur acomptes

- **Biens:** TVA exigible à la livraison, pas à l'acompte
- **Services:** TVA exigible à l'encaissement de l'acompte

### 3. Déduction TVA non admise

TVA non déductible sur:
- Véhicules de tourisme (sauf véhicules utilitaires)
- Carburant essence (déductible à 80%)
- Gazole (déductible à 100%)
- Cadeaux > 73 € TTC par bénéficiaire/an
- Dépenses de logement pour dirigeants
- Services liés à des opérations exonérées sans droit à déduction

### 4. Facture non conforme

TVA non déductible si la facture ne comporte pas les mentions obligatoires.

---

## Calendrier TVA

### Régime Réel Normal (mensuel)

| Période | Échéance CA3 |
|---------|--------------|
| Janvier | 24 février |
| Février | 24 mars |
| Mars | 24 avril |
| ... | 24 du mois suivant |
| Décembre | 24 janvier N+1 |

### Régime Réel Simplifié

| Échéance | Date |
|----------|------|
| Acompte 1 | 15-24 juillet |
| Acompte 2 | 15-24 décembre |
| CA12 annuelle | 2ème jour ouvré après le 1er mai |
