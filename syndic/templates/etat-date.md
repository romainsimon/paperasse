# État au {{date}}

*Document établi à l'occasion de la mutation du lot — usage notarial courant en Belgique*
*Il n'existe pas d'obligation légale de délivrer un état daté standardisé en droit belge (contrairement au droit français). Ce document est établi selon l'usage notarial courant et adressé au notaire instrumentant ou au futur acquéreur, dans un délai de 15 jours ouvrés à compter de la demande.*

---

**ASSOCIATION DES COPROPRIÉTAIRES (ACP)**
**{{copro.name}}**
{{copro.address}}

---

**Établi le** : {{date}}
**À l'occasion de la mutation du lot n°** : {{lot}}
**Vendeur** : {{nom_vendeur}}
**Acquéreur** : {{nom_acquereur}} *(si connu)*
**Notaire instrumentant** : {{nom_notaire}}, {{adresse_notaire}}

---

## 1. Sommes pouvant rester dues par le vendeur

### 1.1 Charges ordinaires dues (appels de fonds)

| Période | Montant appelé | Montant versé | Solde |
|---------|---------------:|-------------:|------:|
{{#pour chaque période}}
| {{periode}} | {{appele}} EUR | {{verse}} EUR | {{solde}} EUR |
{{/pour}}
| **Total** | | | **{{total_charges_ordinaires}} EUR** |

### 1.2 Appels de fonds pour travaux votés

| Opération | Montant appelé | Montant versé | Solde |
|-----------|---------------:|-------------:|------:|
{{#pour chaque opération travaux}}
| {{description}} | {{appele}} EUR | {{verse}} EUR | {{solde}} EUR |
{{/pour}}
| **Total** | | | **{{total_travaux}} EUR** |

### 1.3 Cotisations au fonds de réserve

| | Montant |
|--|--------:|
| Cotisations appelées | {{cotisations_appelees}} EUR |
| Cotisations versées | {{cotisations_versees}} EUR |
| **Solde** | **{{solde_fonds_reserve}} EUR** |

*Les cotisations au fonds de réserve sont acquises à l'ACP et ne donnent pas lieu à remboursement au copropriétaire vendeur (art. 3.89 Cc belge).*

### 1.4 Total des sommes restant dues par le vendeur

| | Montant |
|--|--------:|
| **Total des sommes restant dues par le vendeur** | **{{total_du_vendeur}} EUR** |

## 2. Sommes dont l'ACP pourrait être débitrice envers le vendeur

| Nature | Montant |
|--------|--------:|
| Avances remboursables | {{avances}} EUR |
| Trop-perçu sur régularisation | {{trop_percu}} EUR |
| **Total des sommes dues au vendeur** | **{{total_du_acp}} EUR** |

## 3. Sommes qui seront dues par l'acquéreur

### 3.1 Appels de fonds restants de l'exercice en cours

| Période | Montant | Exigibilité |
|---------|--------:|------------|
{{#pour chaque appel restant}}
| {{periode}} | {{montant}} EUR | {{date}} |
{{/pour}}

### 3.2 Cotisations fonds de réserve restantes

| | Montant |
|--|--------:|
| Cotisation périodique | {{cotisation_periode}} EUR |
| Périodes restantes | {{nb_periodes}} |

## 4. Travaux votés non encore facturés

| Description | Montant voté | Quote-part lot | État |
|-------------|------------:|---------------:|------|
| {{travaux}} | {{montant}} EUR | {{qp}} EUR | {{en cours / à lancer}} |

## 5. Litiges et procédures en cours

| | |
|--|--|
| Procédures judiciaires en cours | {{procedures}} |
| Copropriétaires débiteurs | {{nb_debiteurs}} pour {{montant_impayes}} EUR |

## 6. Informations complémentaires

| | |
|--|--|
| Budget ordinaire en cours | {{budget}} EUR |
| Quote-part annuelle du lot (charges ordinaires) | {{qp_annuelle}} EUR |
| Fonds de réserve (solde global) | {{solde_fonds_global}} EUR |
| Dernier exercice approuvé | {{dernier_exercice}} |
| Prochaine AG | {{prochaine_ag}} |

---

Le syndic,
{{syndic_nom}}

---

*Ce document est établi sous la responsabilité du syndic sur la base des données comptables disponibles. Il n'a pas valeur d'audit comptable. Le notaire instrumentaire vérifiera la concordance des informations avec les pièces comptables de l'ACP.*
