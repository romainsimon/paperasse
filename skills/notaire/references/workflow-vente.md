# Workflow de Vente Immobilière

Guide d'exécution complet pour une vente immobilière, du mandat de vente à la remise des clés.

---

## Vue d'ensemble

```
Phase 1 : Préparation (Vendeur)
  1. Évaluation du bien (DVF, comparables)
  2. Constitution du dossier de diagnostics (DDT)
  3. Rassemblement des pièces (titre, urbanisme, copropriété)

Phase 2 : Avant-contrat
  4. Rédaction du compromis de vente
  5. Notification du droit de rétractation (10 jours)
  6. Notification du droit de préemption (DIA)

Phase 3 : Période entre compromis et acte (2-3 mois)
  7. Purge des conditions suspensives
  8. Vérifications notariales (hypothèques, urbanisme, servitudes)
  9. Calcul des frais et prorata (charges, taxe foncière)

Phase 4 : Acte définitif
  10. Signature de l'acte authentique
  11. Publication au service de publicité foncière
  12. Remise des fonds et des clés
```

---

## Phase 1 : Préparation (Vendeur)

### Étape 1 : Évaluation du bien

**Objectif** : Estimer la valeur vénale du bien.

**Sources de données :**

```bash
# 1. Consulter les transactions comparables via DVF
# API Cerema — transactions dans la même commune
curl "https://apidf-preprod.cerema.fr/dvf_opendata/mutations/?code_insee=XXXXX&page_size=50"

# 2. Géocoder l'adresse pour obtenir le code INSEE
curl "https://api-adresse.data.gouv.fr/search/?q=ADRESSE&limit=1"
# → Récupérer properties.citycode (code INSEE)

# 3. Chercher les ventes récentes dans un périmètre
curl "https://apidf-preprod.cerema.fr/dvf_opendata/mutations/?in_bbox=LON_MIN,LAT_MIN,LON_MAX,LAT_MAX&page_size=50"
```

**Critères de comparaison :**
- Type de bien identique (appartement/maison)
- Surface comparable (± 20%)
- Même secteur géographique
- Transactions des 2 dernières années
- État comparable (rénové, à rénover)

**Résultat** : Fourchette de prix au m² et prix estimé.

### Étape 2 : Constitution du DDT (Dossier de Diagnostics Techniques)

**Objectif** : Commander les diagnostics obligatoires selon les caractéristiques du bien.

Consulter [references/immobilier.md](immobilier.md) section "Diagnostics Obligatoires" pour la matrice complète.

**Déterminer les diagnostics requis :**

| Question | Si oui → Diagnostic |
|----------|---------------------|
| Le bien est-il en copropriété ? | Loi Carrez (surface privative) |
| Le permis de construire est-il antérieur au 01/07/1997 ? | Amiante (DAPP) |
| Le bien est-il antérieur au 01/01/1949 ? | Plomb (CREP) |
| L'installation électrique a-t-elle plus de 15 ans ? | Électricité |
| L'installation gaz a-t-elle plus de 15 ans ? | Gaz |
| Le bien est-il en zone termites (arrêté préfectoral) ? | Termites |
| Le bien est-il en zone à risques ? | ERP |
| Le bien est-il non raccordé au tout-à-l'égout ? | Assainissement |
| Le bien est-il proche d'un aéroport (PEB) ? | Bruit |
| Le DPE est-il classé E, F ou G (maison) ? | Audit énergétique |

**Vérifier les risques automatiquement :**

```bash
# Obtenir le rapport de risques complet (pour l'ERP)
curl "https://www.georisques.gouv.fr/api/v1/resultats_rapport_risque?latlon=LON,LAT"

# Ou avec l'adresse directement
curl "https://www.georisques.gouv.fr/api/v1/resultats_rapport_risque?adresse=ADRESSE"
```

**Le DPE est TOUJOURS obligatoire.** Validité : 10 ans.

**Délai** : Commander les diagnostics 2 à 4 semaines avant la mise en vente. Certains diagnostics ont une validité courte (termites : 6 mois, ERP : 6 mois).

### Étape 3 : Rassemblement des pièces

**Pièces du vendeur :**

| Document | Source |
|----------|--------|
| Titre de propriété | Archives du notaire ou SPF |
| Pièce d'identité en cours de validité | Vendeur |
| Livret de famille (si changement d'état civil) | Vendeur |
| Dernière taxe foncière | Vendeur |
| DDT complet | Diagnostiqueur certifié |
| Relevé de charges de copropriété (3 dernières années) | Syndic |
| PV des 3 dernières AG | Syndic |
| Règlement de copropriété | Syndic |
| Carnet d'entretien de l'immeuble | Syndic |
| Fiche synthétique de la copropriété | Syndic |
| Plan pluriannuel de travaux | Syndic |
| État daté (montant des charges impayées) | Syndic |

**Vérifications à lancer :**

```bash
# Vérifier la parcelle cadastrale
curl "https://apicarto.ign.fr/api/cadastre/parcelle?code_insee=XXXXX&section=XX&numero=XXXX"

# Vérifier le zonage PLU
# Utiliser la géométrie de la parcelle obtenue ci-dessus
curl "https://apicarto.ign.fr/api/gpu/zone-urba?geom=GEOJSON_GEOMETRY"
```

---

## Phase 2 : Avant-contrat

### Étape 4 : Rédaction du compromis de vente

**Objectif** : Formaliser l'accord entre vendeur et acquéreur.

**Éléments obligatoires du compromis :**

1. **Identification des parties** : nom, prénom, date et lieu de naissance, adresse, situation matrimoniale, régime matrimonial
2. **Désignation du bien** : adresse, description, références cadastrales, surface (Carrez si copropriété)
3. **Prix et modalités de paiement** : prix net vendeur, modalités de financement
4. **Conditions suspensives** (voir liste ci-dessous)
5. **Dépôt de garantie** : généralement 5% à 10% du prix (séquestré chez le notaire)
6. **Date limite de signature de l'acte authentique**
7. **DDT complet annexé**
8. **Documents de copropriété annexés** (si applicable)

**Conditions suspensives standard :**

| Condition | Délai usuel | Base légale |
|-----------|------------|-------------|
| Obtention de prêt | 45 à 60 jours | art. L313-41 Code de la consommation |
| Absence de servitude non révélée | À la signature | — |
| Absence de préemption (DPU, SAFER) | 2 mois | art. L213-2 C. urb. |
| Obtention du permis de construire | 2 à 3 mois (si projet de travaux) | — |
| Résultat d'une étude de sol | Variable | — |
| État hypothécaire libre | À la signature | — |

**Utiliser le template** : `templates/compromis-vente.md`

### Étape 5 : Délai de rétractation

**Base légale** : art. L271-1 Code de la construction et de l'habitation

| Point | Détail |
|-------|--------|
| Délai | **10 jours calendaires** (jours fériés compris) |
| Point de départ | Lendemain de la notification du compromis (remise en main propre, LRAR, ou voie électronique) |
| Bénéficiaire | L'acquéreur uniquement (pas le vendeur) |
| Exercice | Lettre recommandée avec accusé de réception |
| Effet | Restitution intégrale du dépôt de garantie sous 21 jours |
| Pas de motif | L'acquéreur n'a pas à justifier sa rétractation |

**Attention** : si le 10e jour tombe un samedi, dimanche ou jour férié, le délai est prolongé au premier jour ouvrable suivant.

### Étape 6 : Droit de préemption

**Envoi de la DIA (Déclaration d'Intention d'Aliéner) par le notaire.**

| Préempteur | Notification | Délai de réponse | Base légale |
|-----------|-------------|------------------|-------------|
| Commune (DPU) | DIA au maire | 2 mois | art. L213-2 C. urb. |
| SAFER | Notification par notaire | 2 mois | art. L143-8 C. rural |
| Locataire | Congé pour vente | 2 premiers mois du préavis | art. 15-II loi 6/7/1989 |

**Silence = renonciation.** Passé le délai de 2 mois sans réponse, la vente peut se poursuivre librement.

---

## Phase 3 : Période entre compromis et acte (2-3 mois)

### Étape 7 : Purge des conditions suspensives

**Prêt bancaire** (condition suspensive la plus fréquente) :
- L'acquéreur doit déposer ses demandes de prêt dans les 10 jours suivant le compromis
- Obtenir une offre de prêt dans le délai convenu (45-60 jours)
- Le notaire vérifie la conformité de l'offre (montant, taux, durée)
- Si refus de prêt : l'acquéreur fournit les lettres de refus de 2 banques minimum

**Non-préemption** :
- Le notaire vérifie la réponse de la commune et/ou de la SAFER
- Silence de 2 mois = renonciation

### Étape 8 : Vérifications notariales

**Le notaire (ou le skill) effectue les vérifications suivantes :**

| Vérification | Source | Objectif |
|-------------|--------|----------|
| État hypothécaire | Service de publicité foncière (SPF) | Vérifier l'absence d'inscriptions grevant le bien |
| Urbanisme | PLU + certificat d'urbanisme | Conformité du bien, absence d'emplacement réservé |
| Servitudes | SPF + PLU + GPU | Servitudes d'utilité publique et conventionnelles |
| Situation cadastrale | Cadastre | Conformité des références et surfaces |
| Situation locative | Vendeur | Vérifier les baux en cours |
| Conformité des travaux | Mairie | Permis de construire, DAACT |
| Origine de propriété | Archives notariales | Chaîne de propriété sur 30 ans |

```bash
# Vérifier le zonage et les servitudes via GPU
curl "https://apicarto.ign.fr/api/gpu/zone-urba?geom=GEOJSON_POINT"
curl "https://apicarto.ign.fr/api/gpu/prescription-surf?geom=GEOJSON_POINT"
curl "https://apicarto.ign.fr/api/gpu/assiette-sup-s?geom=GEOJSON_POINT"
```

### Étape 9 : Calcul des frais et prorata

**Calcul des frais de notaire** : voir SKILL.md section "Frais de notaire" et [references/tarifs-emoluments.md](tarifs-emoluments.md).

**Prorata de la taxe foncière** :
```
Quote-part vendeur = Taxe annuelle × (Nb jours du 1er janvier à la date de vente / 365)
Quote-part acquéreur = Taxe annuelle × (Nb jours de la date de vente au 31 décembre / 365)
```

**Prorata des charges de copropriété** :
- Charges courantes : prorata au jour de la vente
- Provisions pour travaux votés : à la charge de celui qui est copropriétaire au moment de l'appel de fonds (sauf convention contraire)

**Plus-value du vendeur** : calculer si applicable. Voir [references/plus-value.md](plus-value.md).

---

## Phase 4 : Acte définitif

### Étape 10 : Signature de l'acte authentique

**Déroulement de la signature :**

1. Lecture intégrale de l'acte par le notaire (obligation légale)
2. Échange des consentements
3. Remise des clés
4. Signature des parties et du notaire
5. Apposition du sceau

**Documents à préparer pour le jour J :**

| Pour l'acquéreur | Pour le vendeur |
|-----------------|-----------------|
| Pièce d'identité | Pièce d'identité |
| Offre de prêt acceptée | Titre de propriété original |
| Attestation d'assurance emprunteur | Dernière taxe foncière |
| Fonds (virement séquestré chez le notaire) | Clés |
| | Relevé de compteurs (eau, électricité, gaz) |

### Étape 11 : Publication au SPF

**Le notaire publie l'acte au Service de Publicité Foncière (ex-Conservation des hypothèques).**

| Point | Détail |
|-------|--------|
| Délai de publication | 1 à 3 mois après la signature |
| Coût | CSI 0,10% du prix |
| Effet | Le transfert de propriété est opposable aux tiers |

### Étape 12 : Remise des fonds et des clés

**Flux financier :**

```
Acquéreur → Notaire (séquestre) → Ventilation :
  → Vendeur : prix net vendeur (prix - remboursement emprunt vendeur)
  → SPF : CSI
  → Trésor public : DMTO
  → Banque vendeur : capital restant dû + mainlevée d'hypothèque
  → Syndic : prorata charges
  → Agence immobilière : commission (si applicable)
```

**Délai de remise des fonds au vendeur** : généralement 2 à 5 jours ouvrés après la signature (temps de comptabiliser les fonds).

---

## Délais récapitulatifs

| Étape | Délai |
|-------|-------|
| Mise en vente → Compromis | Variable (semaines à mois) |
| Compromis → Fin rétractation | 10 jours |
| DIA → Réponse préemption | 2 mois |
| Compromis → Offre de prêt | 45-60 jours |
| Compromis → Acte définitif | **2 à 3 mois** (usuel) |
| Acte → Publication SPF | 1 à 3 mois |
| Total : compromis → publication | **3 à 6 mois** |

---

## Cas Spéciaux

### Vente en copropriété

**Documents supplémentaires obligatoires (loi ALUR) :**
- Fiche synthétique de la copropriété
- Carnet d'entretien de l'immeuble
- PV des 3 dernières AG
- Montant des charges courantes et travaux votés
- Diagnostic technique global (si réalisé)
- Plan pluriannuel de travaux
- Montant du fonds de travaux
- Impayés du copropriétaire vendeur et globaux

**Délai Carrez** : l'acquéreur peut agir en diminution de prix si la surface est inférieure de plus de 5% à celle annoncée (action dans l'année suivant la vente).

### Vente d'un bien loué

- Le locataire a un droit de préemption (congé pour vente)
- L'acquéreur est tenu de respecter le bail en cours
- Le congé doit être donné au moins 6 mois avant l'échéance du bail (location nue)

### Vente par une SCI

- Décision de cession en assemblée générale (selon statuts)
- Si SCI à l'IR : plus-value des particuliers
- Si SCI à l'IS : plus-value professionnelle
- PV d'AG autorisant la vente à joindre

### Vendeur non-résident

- Représentant fiscal obligatoire si plus-value > 150 000 EUR et résidence hors UE/EEE
- Prélèvement de 19% + PS par le notaire
- Vérifier les conventions fiscales bilatérales

### Bien en indivision

- Accord unanime des indivisaires requis (sauf bien < 2/3 de l'indivision avec autorisation judiciaire)
- Ou vente judiciaire (art. 815-5-1 C. civ.) à la demande d'un indivisaire détenant au moins 2/3
- Droit de préemption des coindivisaires (art. 815-14 C. civ.)
