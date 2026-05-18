# Workflow de Vente Immobilière

Guide d'exécution complet pour une vente immobilière en Belgique, de l'offre d'achat à la remise des clés.

**last_updated: 2026-05-15**

---

## Vue d'ensemble

```
Phase 1 : Préparation (Vendeur)
  1. Évaluation du bien (AGDP, comparables)
  2. Constitution du dossier de diagnostics obligatoires (PEB, sol, électricité, etc.)
  3. Rassemblement des pièces (titre, urbanisme, copropriété)

Phase 2 : Avant-contrat
  4. Offre d'achat (unilatérale) ou compromis de vente (bilatéral)
  5. Conditions suspensives
  6. Notification du droit de préemption (si applicable)

Phase 3 : Période entre compromis et acte (2-4 mois)
  7. Purge des conditions suspensives
  8. Vérifications notariales (AGDP, urbanisme, servitudes)
  9. Calcul des frais et prorata (charges, précompte immobilier)

Phase 4 : Acte définitif
  10. Signature de l'acte authentique
  11. Transcription à l'AGDP
  12. Remise des fonds et des clés
```

**Point clé belge** : il n'existe **pas de délai légal de rétractation** en Belgique pour les particuliers lors d'une vente immobilière (contrairement au délai SRU de 10 jours en France). Une fois le compromis signé, les deux parties sont liées.

---

## Phase 1 : Préparation (Vendeur)

### Étape 1 : Évaluation du bien

**Objectif** : Estimer la valeur vénale du bien.

**Sources de données en Belgique :**
- **AGDP** (Administration générale de la Documentation Patrimoniale — SPF Finances) : données des mutations foncières ; partiellement accessibles via le portail patrimoniumdocumentatie.be
- Annonces immobilières comparables (Immoweb, Logic-Immo, ERA, etc.)
- Estimation par un agent immobilier agréé **IPI** (Institut Professionnel des Agents Immobiliers)
- Expertise par un expert immobilier (recommandé pour les biens > 300 000 EUR ou atypiques)

**Critères de comparaison :**
- Type de bien identique (appartement / maison)
- Surface comparable (± 20%)
- Même secteur géographique et même commune
- Transactions des 2 dernières années
- État comparable (rénové, à rénover, neuf)

**Résultat** : Fourchette de prix au m² et prix estimé.

### Étape 2 : Constitution du dossier de diagnostics obligatoires

**Objectif** : Commander les diagnostics obligatoires selon la région et les caractéristiques du bien.

Consulter [references/immobilier.md](immobilier.md) section "Diagnostics Obligatoires" pour la liste complète.

**Déterminer les diagnostics requis selon la région :**

| Question | Si oui → Diagnostic requis |
|----------|---------------------|
| Bien situé en Flandre ? | PEB (EPC) obligatoire + Asbestattest si avant 2001 + Bodemattest |
| Bien situé en Wallonie ? | PEB obligatoire + attestation sol si antécédents de pollution |
| Bien situé à Bruxelles ? | PEB obligatoire + certificat de contrôle sol selon BSSP |
| Installation électrique non conforme ? | Contrôle électrique (toutes régions) |
| Citerne à mazout souterraine ? | Certificat de citerne (surtout Wallonie) |

**Géoportails environnementaux :**
- Flandre : geopunt.be
- Wallonie : géoportail.wallonie.be
- Bruxelles : urbis.irisnet.be / environment.brussels

**Délai** : Commander les diagnostics 2 à 4 semaines avant la mise en vente. Le PEB est toujours obligatoire et doit être obtenu avant l'affichage de l'annonce.

### Étape 3 : Rassemblement des pièces

**Pièces du vendeur :**

| Document | Source |
|----------|--------|
| Titre de propriété | Archives du notaire ou AGDP |
| Pièce d'identité en cours de validité + numéro national | Vendeur |
| Dernier avis de précompte immobilier | Vendeur |
| Dossier diagnostics complet (PEB, sol, électricité, etc.) | Experts certifiés régionaux |
| Documents de copropriété (si applicable) | Syndic |
| PV des 3 dernières AG (copropriété) | Syndic |
| Règlement de copropriété et acte de base | Syndic |
| Décompte des charges (2 dernières années) | Syndic |
| État des dettes du copropriétaire vendeur | Syndic |
| Montant du fonds de réserve | Syndic |

**Vérifications à lancer :**

```bash
# Vérifier la parcelle cadastrale (Belgique)
# Source : CadGIS — https://eservices.minfin.fgov.be/ecad/
# Ou : SPW/CadMap en Wallonie, GIS Flandre, Urban Brussels

# Vérifier le zonage urbanistique régional
# Flandre : omgevingsloket.be
# Wallonie : géoportail.wallonie.be
# Bruxelles : nova.brussels / urbis.irisnet.be
```

---

## Phase 2 : Avant-contrat

### Étape 4 : Offre d'achat ou compromis de vente

**En Belgique, deux étapes sont possibles :**

**a) Offre d'achat** (unilatérale) :
- L'acquéreur fait une offre écrite au vendeur
- Si le vendeur accepte par écrit, il y a formation du contrat (offre + acceptation = contrat)
- L'offre d'achat acceptée vaut compromis si elle contient tous les éléments essentiels
- **Attention** : le vendeur qui accepte est lié immédiatement (il ne peut pas se rétracter sans indemniser l'acquéreur)

**b) Compromis de vente** (bilatéral, plus sécurisant) :
- Signé simultanément par le vendeur et l'acquéreur (souvent chez le notaire ou l'agent immobilier)
- Plus complet et sécurisé que l'offre d'achat

**Éléments obligatoires du compromis / de l'offre acceptée :**

1. **Identification des parties** : nom, prénom, date et lieu de naissance, adresse, numéro national, situation matrimoniale, régime matrimonial
2. **Désignation du bien** : adresse, description, références cadastrales (section, numéro, superficie cadastrale)
3. **Prix et modalités de paiement** : prix net vendeur, modalités de financement
4. **Conditions suspensives** (voir liste ci-dessous)
5. **Acompte** : généralement 5% à 10% du prix (séquestré chez le notaire)
6. **Date limite de signature de l'acte authentique**
7. **Diagnostics obligatoires annexés** (PEB au minimum)
8. **Documents de copropriété annexés** (si applicable)
9. **Mention de l'attestation du sol et des éventuels risques environnementaux**

**Conditions suspensives standard :**

| Condition | Délai usuel | Remarque |
|-----------|------------|----------|
| Obtention d'un crédit hypothécaire | 45 à 60 jours | Condition la plus fréquente |
| Absence de servitude non révélée | À la signature | — |
| Absence de préemption | Délai régional applicable | — |
| Résultat favorable d'une étude de sol | Variable | Si antécédents de pollution |
| État hypothécaire libre | À la signature | — |

**Utiliser le template** : `templates/compromis-vente.md`

### Étape 5 : Pas de délai de rétractation légal en Belgique

**Point fondamental** : en Belgique, il n'existe **pas de délai légal de rétractation** pour les particuliers lors d'une vente immobilière.

- Une fois le compromis signé (ou l'offre d'achat acceptée), les deux parties sont irrévocablement liées
- Seule une condition suspensive non réalisée permet à l'une des parties de se dégager sans pénalité
- En dehors des conditions suspensives : la partie qui se rétracte peut devoir verser des dommages et intérêts (généralement équivalents à l'acompte, soit 10% du prix)

**Différence avec la France** : en France, l'acquéreur bénéficie d'un délai de rétractation de 10 jours après la notification du compromis (art. L271-1 CCH français). Ce délai n'existe pas en droit belge.

### Étape 6 : Droit de préemption

**Envoi de la notification par le notaire** selon la région et le type de bien.

| Préempteur | Région | Délai de réponse |
|-----------|--------|------------------|
| Commune (zones d'action prioritaire) | Bruxelles (SAU) | Délai légal selon décision |
| SRWBE / communes | Wallonie | Délai légal selon périmètre |
| Vlaamse Grondenbank / Agentschap | Flandre | Délai légal selon type de bien |
| Locataire (congé pour vente) | Toutes régions | Selon code régional du bail |

**Silence = renonciation** (dans les délais légaux applicables).

---

## Phase 3 : Période entre compromis et acte (2-4 mois)

### Étape 7 : Purge des conditions suspensives

**Prêt hypothécaire** (condition suspensive la plus fréquente) :
- L'acquéreur dépose ses demandes de crédit dans les délais convenus
- Obtenir une offre de crédit dans le délai convenu (45-60 jours)
- Le notaire vérifie la conformité de l'offre (montant, taux, durée)
- Si refus de crédit : l'acquéreur fournit les lettres de refus des établissements de crédit consultés
- La condition suspensive de prêt permet à l'acquéreur de se retirer sans pénalité si le crédit est refusé

**Non-préemption** :
- Le notaire vérifie les réponses des autorités compétentes
- Le silence pendant le délai légal vaut renonciation

### Étape 8 : Vérifications notariales

**Le notaire effectue les vérifications suivantes :**

| Vérification | Source | Objectif |
|-------------|--------|----------|
| État hypothécaire | AGDP (bureau de la conservation des hypothèques) | Vérifier l'absence d'inscriptions grevant le bien |
| Urbanisme | Plans régionaux (PRAS/Plan de secteur/Gewestplan) + permis | Conformité du bien, destination urbanistique |
| Servitudes | AGDP + plans régionaux | Servitudes légales et conventionnelles |
| Situation cadastrale | CadGIS / CadMap | Conformité des références et surfaces |
| Situation locative | Vendeur | Vérifier les baux en cours |
| Conformité des travaux | Commune | Permis d'urbanisme, conformité |
| Origine de propriété | Archives notariales | Chaîne de propriété (en général 30 ans) |
| Sol | Attestation régionale disponible | Absence de pollution du sol |

```bash
# Vérifier le zonage urbanistique en Belgique
# Flandre : https://omgevingsloket.be
# Wallonie : https://geoportail.wallonie.be
# Bruxelles : https://nova.brussels / https://urbis.irisnet.be
```

### Étape 9 : Calcul des frais et prorata

**Calcul des droits d'enregistrement** : voir [references/immobilier.md](immobilier.md) et [references/tarifs-emoluments.md](tarifs-emoluments.md).

**Prorata du précompte immobilier** :
```
Quote-part vendeur = PI annuel × (Nb jours du 1er janvier à la date de vente / 365)
Quote-part acquéreur = PI annuel × (Nb jours de la date de vente au 31 décembre / 365)
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
4. Signature des parties et du notaire instrumentant
5. Apposition du sceau du notaire

**Documents à préparer pour le jour J :**

| Pour l'acquéreur | Pour le vendeur |
|-----------------|-----------------|
| Pièce d'identité | Pièce d'identité |
| Offre de crédit acceptée | Titre de propriété original |
| Attestation d'assurance solde restant dû | Dernier avis de précompte immobilier |
| Fonds (virement séquestré chez le notaire) | Clés |
| | Relevé de compteurs (eau, électricité, gaz) |
| | Attestation de conformité électrique (si applicable) |

### Étape 11 : Transcription à l'AGDP

**Le notaire transcrit l'acte à l'Administration générale de la Documentation Patrimoniale (AGDP).**

| Point | Détail |
|-------|--------|
| Délai de transcription | 15 jours à 2 mois après la signature (délai réglementaire) |
| Coût | Frais de transcription inclus dans les débours |
| Effet | Le transfert de propriété est opposable aux tiers à compter de la transcription |

### Étape 12 : Remise des fonds et des clés

**Flux financier :**

```
Acquéreur → Notaire (séquestre) → Ventilation :
  → Vendeur : prix net vendeur (prix - remboursement emprunt vendeur)
  → AGDP : droits d'enregistrement régionaux
  → Administration régionale : droits d'enregistrement
  → Banque vendeur : capital restant dû + frais de mainlevée d'hypothèque
  → Syndic : prorata charges copropriété
  → Agent immobilier : commission (si applicable)
  → Notaire : émoluments + débours
```

**Délai de remise des fonds au vendeur** : généralement 2 à 5 jours ouvrés après la signature (délai de comptabilisation des fonds).

---

## Délais récapitulatifs

| Étape | Délai |
|-------|-------|
| Mise en vente → Offre / Compromis | Variable (semaines à mois) |
| Compromis → Acte définitif | **2 à 4 mois** (usuel) |
| Acte → Transcription AGDP | 15 jours à 2 mois |
| Condition suspensive prêt | 45 à 60 jours |
| Droit de préemption | Délai légal régional applicable |
| Total : compromis → transcription | **3 à 6 mois** |

**Rappel** : pas de délai de rétractation légal en Belgique pour les particuliers. Les délais de réflexion sont conventionnels (négociés dans le compromis).

---

## Cas Spéciaux

### Vente en copropriété

**Documents supplémentaires obligatoires (Code civil belge, art. 3.94) :**
- Acte de base et règlement de copropriété
- Règlement d'ordre intérieur
- PV des 3 dernières assemblées générales
- Décompte des charges des 2 dernières années
- État des impayés du copropriétaire vendeur et de la copropriété
- Montant du fonds de réserve
- Travaux votés et programmés

**Attestation du syndic** : le notaire est tenu de demander une attestation au syndic avant la signature de l'acte authentique.

### Vente d'un bien loué

- Le locataire a un droit de préemption (selon le code régional du bail applicable)
- L'acquéreur est tenu de respecter le bail en cours
- Le délai de préavis pour congé pour vente est fixé par le code régional du bail (en principe 6 mois)

### Vente par une SRL

- Décision de cession en assemblée générale (selon statuts de la SRL)
- Plus-value : régime ISOC (impôt des sociétés) — pas d'abattement pour durée de détention
- PV d'AG autorisant la vente à joindre à l'acte
- Vérifier la situation à la BCE (Banque-Carrefour des Entreprises)

### Vendeur non-résident

- Les non-résidents sont imposables en Belgique sur les plus-values réalisées sur des immeubles situés en Belgique (art. 228 §2, 9° CIR 92)
- Vérifier les conventions préventives de double imposition
- Le notaire informe le vendeur de ses obligations déclaratives (déclaration IPP non-résident en Belgique)

### Bien en indivision

- Accord unanime des indivisaires requis (sauf partage judiciaire)
- Chaque indivisaire peut demander le partage en justice (art. 3.70 Cc belge)
- Droit de préemption entre coindivisaires en cas de vente d'une quote-part (art. 3.74 Cc belge)

### Vente Loi Breyne (immeuble en construction)

- Application obligatoire de la Loi Breyne du 9 juillet 1971
- Paiement échelonné selon l'avancement des travaux (tranches réglementées)
- Garantie financière d'achèvement obligatoire
- Pas de délai légal de rétractation (contrairement à la VEFA française)
- TVA 21% (ou 6% si démolition-reconstruction sous conditions)
