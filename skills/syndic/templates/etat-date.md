# État Daté

*Établi en application de l'article 5 du décret n67-223 du 17 mars 1967*

---

**SYNDICAT DES COPROPRIÉTAIRES**
**{{copro.name}}**
{{copro.address}}
Immatriculation RNC : {{immatriculation}}

---

**Établi le** : {{date}}
**À l'occasion de la mutation du lot n** : {{lot}}
**Vendeur** : {{nom_vendeur}}
**Acquéreur** : {{nom_acquereur}} *(si connu)*
**Notaire** : {{nom_notaire}}, {{adresse_notaire}}

---

## 1. Sommes pouvant rester dues par le vendeur

### 1.1 Provisions exigibles du budget prévisionnel (art. 14-1)

| Trimestre | Montant appelé | Montant versé | Solde |
|-----------|---------------:|-------------:|------:|
{{#pour chaque trimestre}}
| {{trimestre}} | {{appele}} EUR | {{verse}} EUR | {{solde}} EUR |
{{/pour}}
| **Total** | | | **{{total_provisions}} EUR** |

### 1.2 Provisions exigibles pour travaux (art. 14-2)

| Opération | Montant appelé | Montant versé | Solde |
|-----------|---------------:|-------------:|------:|
{{#pour chaque opération travaux}}
| {{description}} | {{appele}} EUR | {{verse}} EUR | {{solde}} EUR |
{{/pour}}
| **Total** | | | **{{total_travaux}} EUR** |

### 1.3 Cotisations au fonds de travaux (art. 14-2)

| | Montant |
|--|--------:|
| Cotisations appelées | {{cotisations_appelees}} EUR |
| Cotisations versées | {{cotisations_versees}} EUR |
| **Solde** | **{{solde_fonds_travaux}} EUR** |

*Les cotisations au fonds de travaux sont acquises au syndicat et ne donnent pas lieu à remboursement par le syndicat au copropriétaire vendeur (art. 14-2 al. 4).*

### 1.4 Charges impayées

| | Montant |
|--|--------:|
| **Total des sommes restant dues par le vendeur** | **{{total_du_vendeur}} EUR** |

## 2. Sommes dont le syndicat pourrait être débiteur envers le vendeur

| Nature | Montant |
|--------|--------:|
| Avances (art. 45-1 décret) | {{avances}} EUR |
| Trop-perçu sur régularisation | {{trop_percu}} EUR |
| **Total des sommes dues au vendeur** | **{{total_du_syndicat}} EUR** |

## 3. Sommes qui seront dues par l'acquéreur

### 3.1 Provisions restantes de l'exercice en cours

| Trimestre | Montant | Exigibilité |
|-----------|--------:|------------|
{{#pour chaque trimestre restant}}
| {{trimestre}} | {{montant}} EUR | {{date}} |
{{/pour}}

### 3.2 Cotisations fonds de travaux restantes

| | Montant |
|--|--------:|
| Cotisation trimestrielle | {{cotisation_trim}} EUR |
| Trimestres restants | {{nb_trimestres}} |

## 4. État des procédures en cours

| | |
|--|--|
| Procédures judiciaires en cours | {{procedures}} |
| Copropriétaires débiteurs (art. 20) | {{nb_debiteurs}} pour {{montant_impayes}} EUR |

## 5. Informations complémentaires

| | |
|--|--|
| Budget prévisionnel en cours | {{budget}} EUR |
| Quote-part annuelle du lot (charges courantes) | {{qp_annuelle}} EUR |
| Fonds de travaux (solde global) | {{solde_fonds_global}} EUR |
| Dernier exercice approuvé | {{dernier_exercice}} |
| Prochain AG | {{prochaine_ag}} |

---

Le syndic,
{{syndic_nom}}

---

*Ce document est établi sous la responsabilité du syndic. Il n'a pas valeur d'audit comptable. Le notaire instrumentaire vérifiera la concordance des informations avec les pièces comptables.*
