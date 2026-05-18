---
name: syndic
metadata:
  last_updated: 2026-05-18
includes:
  - data/**
  - templates/**
  - integrations/**
  - copros.example.json
description: |
  Gère un parc de copropriétés en Belgique avec vue portfolio consolidée. Couvre
  administration, comptabilité ACP (plan comptable CNC-CBN), assemblées générales
  (convocation, PV, notification), appels de fonds, travaux, fournisseurs, recouvrement
  d'impayés et transition de syndic. Maîtrise les majorités (art. 3.87-3.88 Code civil belge),
  le fonds de réserve (art. 3.89, min. 5%), l'hypothèque légale ACP (art. 3.93) et la
  personnalité morale de l'Association des Copropriétaires (ACP). Intégration Qonto pour
  le rapprochement bancaire. Utilisé pour toute question liée à la copropriété, au syndic
  bénévole ou coopératif, charges, tantièmes, AG, ou au droit belge de la copropriété
  (art. 3.69-3.94 Code civil belge, ex-art. 577-2 à 577-14).
---

# Syndic de Copropriété — Belgique

## Prérequis : copros/

**À chaque conversation**, vérifier `copros/*.json` :

- Fichiers présents → lire tous les JSON, afficher le tableau de bord (voir [references/formats.md](references/formats.md)), demander quelle copro
- Rien ou seulement `copros.example.json` → lancer le **setup guidé** : [references/administration.md](references/administration.md)

**Ne jamais donner de conseil sans copro sélectionnée.** L'utilisateur désigne une copro par nom, slug, ou "toutes" pour la vue portfolio.

Structure : un JSON par copro dans `copros/`. Schéma complet dans `copros.example.json`.

## Cadre Légal Belge

- **Texte de base** : art. 3.69 à 3.94 Code civil belge (Boek 3/Livre 3, en vigueur depuis le 1er septembre 2021, ex-art. 577-2 à 577-14 Cc)
- **Réforme ACP** : Loi du 2 juin 2010 (introduction de la personnalité morale ACP)
- **Entité juridique** : l'Association des Copropriétaires (ACP) est une **personne morale** (art. 3.84 §1 Cc) — contrairement au syndicat français qui n'a pas de personnalité morale distincte
- **Référentiel comptable** : plan comptable ACP selon les recommandations de la Commission des Normes Comptables (CNC-CBN)
- **Pas d'équivalent RNC** en Belgique — l'ACP peut être inscrite à la BCE si elle atteint certains seuils

## Workflow

### 0. Échéances (automatique)

Lire [references/calendrier.md](references/calendrier.md). Consolider les échéances de toutes les copros, trier par date.

🔴 < 7 jours | 🟠 7-14 jours | 🟡 15-30 jours

### 1. Router la demande

| Domaine | Référence |
|---------|-----------|
| Administration, setup, BCE, fiche synthétique | [references/administration.md](references/administration.md) |
| Comptabilité ACP, écritures, clôture, annexes | [references/comptabilite-copro.md](references/comptabilite-copro.md) |
| Budget prévisionnel, appels de fonds, régularisation | [references/budget-appels.md](references/budget-appels.md) |
| AG : convocation, PV, notification | [references/assemblee-generale.md](references/assemblee-generale.md) |
| Majorités : art. 3.87-3.88 Cc belge | [references/majorites.md](references/majorites.md) |
| Fournisseurs, contrats, mise en concurrence | [references/fournisseurs.md](references/fournisseurs.md) |
| Travaux, DIU, aides régionales (primes rénovation) | [references/travaux.md](references/travaux.md) |
| Impayés, recouvrement, hypothèque légale | [references/contentieux.md](references/contentieux.md) |
| Assurance, sinistres, convention ASSURALIA | [references/assurance-sinistres.md](references/assurance-sinistres.md) |
| Vente de lot, état des charges, cession | [references/mutations.md](references/mutations.md) |
| Changement de syndic, reprise archives | [references/transition.md](references/transition.md) |
| Journal de gestion, traçabilité | [references/journal-gestion.md](references/journal-gestion.md) |
| Cadre légal (art. 3.69-3.94 Cc, loi 2010) | [references/loi-acp.md](references/loi-acp.md) |
| Intégration bancaire Qonto | [references/integration-qonto.md](references/integration-qonto.md) |
| Formats de sortie, dashboard | [references/formats.md](references/formats.md) |

### 2. Collecter le contexte

Identifier la copro concernée, puis poser les questions propres au domaine (détails dans chaque fichier de référence).

### 3. Répondre

Structure de réponse :

```
## Copropriété
[Nom]

## Faits
[Documenté et certain]

## Analyse
[Traitement juridique/comptable, articles Code civil belge]

## Calculs
[Si applicable : tantièmes, charges, appels]

## Risques
[Points d'attention]

## Actions
[Tâches concrètes, ordre chronologique]
```

Omettre les sections vides. Ajouter `## Limites` quand un professionnel est nécessaire.

## Règles de Majorité (art. 3.87-3.88 Code civil belge)

| Objet | Majorité requise |
|-------|-----------------|
| Actes conservatoires, gestion journalière | Syndic seul (art. 3.89) |
| **Désignation / révocation du syndic**, décisions ordinaires de gestion, travaux conservatoires ou imposés par la loi | **Majorité absolue** des voix présents/représentés (art. 3.87 §6) |
| Modification des statuts (usage/jouissance/administration des parties communes), travaux affectant les parties communes, seuil de mise en concurrence | **2/3 des voix** (art. 3.88 §1) |
| Modification de l'acte de base, reconstruction de l'immeuble ou démolition pour cause d'insalubrité | **4/5 des voix** (art. 3.88 §1) |
| Modification de la répartition des quotes-parts | **Unanimité** (art. 3.88 §1) |
| Dissolution de l'ACP | **4/5 des voix** ou décision judiciaire (art. 3.93) |
| 2ème AG si double quorum non atteint à la 1ère | Délibère valablement quel que soit le nombre de voix présentes/représentées (art. 3.87 §5) |

> ⚠️ La désignation et la révocation du syndic se votent à la **majorité absolue** (art. 3.87 §6), **pas** aux 4/5. Une transition de syndic professionnel → bénévole ne requiert donc pas de majorité qualifiée, sauf si elle s'accompagne d'une modification des statuts (2/3) ou de l'acte de base (4/5).
>
> Certains règlements de copropriété imposent contractuellement une majorité renforcée (ex. 3/4) : toujours vérifier le règlement de la copropriété concernée.

**Double quorum 1ère AG** : plus de la moitié des copropriétaires *et* au moins la moitié des quotes-parts représentés (art. 3.87 §5).

## Checklists

Copier et suivre la checklist appropriée pour les opérations complexes.

### Préparation AG annuelle

```
AG — {{copro.name}} — {{date}}
- [ ] Clôturer les comptes de l'exercice
- [ ] Préparer les annexes comptables ACP
- [ ] Calculer les régularisations par copropriétaire
- [ ] Préparer le projet de budget N+1
- [ ] Collecter les devis pour travaux à voter
- [ ] Rédiger l'ordre du jour (résolutions + majorités requises)
- [ ] Préparer le projet de contrat syndic (si renouvellement)
- [ ] Envoyer convocations (recommandé avec AR, min. 15 jours avant AG — art. 3.87 §2 Cc)
- [ ] Joindre : comptes, annexes, budget, devis, contrat syndic, formulaire vote par procuration
- [ ] Vérifier : quorum (> 50% des quotes-parts), chaque résolution a sa majorité
```

### Clôture comptable

```
Clôture — {{copro.name}} — Exercice {{dates}}
- [ ] Toutes les factures enregistrées
- [ ] Rapprochement bancaire (solde comptable = relevé)
- [ ] Contrôle comptes copropriétaires (charges communes, fonds de réserve)
- [ ] Provisions pour charges à payer
- [ ] Calcul régularisation (réel vs budget)
- [ ] Affectation du résultat
- [ ] État financier : fonds opérationnel (charges courantes)
- [ ] État financier : fonds de réserve (travaux — art. 3.89 Cc)
- [ ] Compte de gestion général par catégorie de charges
- [ ] Budget vs réalisé (écarts justifiés)
- [ ] Vérification : total provisions = total charges réparties
- [ ] Vérification : fonds de réserve ≥ 5% du budget ordinaire (art. 3.89 Cc)
```

### Recouvrement impayés

```
Recouvrement — Lot {{n}} — {{montant}} EUR
- [ ] Relance amiable (email/courrier simple)
- [ ] Mise en demeure recommandée (art. 3.90 Cc) → délai raisonnable
- [ ] Si pas de réponse : saisie-arrêt ou action judiciaire via ACP (personne morale)
- [ ] Vérifier : hypothèque légale ACP (art. 3.93 Cc) — exercice en cours + 2 échus
- [ ] Frais de justice à charge du débiteur selon arrêt judiciaire
- [ ] Mise à jour du registre des impayés
```

### Vente de lot (mutation)

```
Mutation — Lot {{n}} — Vendeur → Acquéreur
- [ ] Renseignements à communiquer au notaire instrumentant (art. 577-11/3.91 Cc)
- [ ] État des charges : appels de fonds en cours, arriérés éventuels
- [ ] Documents joints : acte de base, règlement de copropriété, PV AG des 3 dernières années
- [ ] DIU (Dossier d'Intervention Ultérieure) transmis
- [ ] Compte vendeur vérifié (arriérés → opposition via notaire)
- [ ] Registre des copropriétaires mis à jour
- [ ] Acquéreur informé (modalités de paiement, prochain appel de fonds)
```

### Changement de syndic (pro → bénévole)

```
Transition — {{copro.name}} — Syndic sortant : {{nom}}
- [ ] Phase 1 AUDIT : récupérer comptes, inventorier contrats, évaluer situation
- [ ] Phase 2 CONSULTATION : présenter aux copropriétaires, recueillir soutien
- [ ] Phase 3 JURIDIQUE : candidat confirmé, assurance RC, contrat rédigé
- [ ] Phase 4 AG : résolutions inscrites (désignation/révocation syndic = majorité absolue ; 2/3 si modification des statuts), recommandé AR 15j
- [ ] Phase 4 AG : vote obtenu, PV rédigé, notification aux copropriétaires (max 30 jours — art. 3.92 §3 Cc) ; délai de recours 4 mois à dater de l'AG
- [ ] Phase 5 ARCHIVES : notification syndic sortant, réception archives (30 jours)
- [ ] Phase 5 ARCHIVES : vérifier concordance trésorerie (solde transmis = solde réel)
- [ ] Phase 6 MISE EN PLACE : compte bancaire séparé au nom de l'ACP (art. 3.89 §3 Cc), transfert fonds
- [ ] Phase 6 MISE EN PLACE : fournisseurs + copropriétaires informés, mise à jour BCE si applicable
```

### Sinistre (dégât des eaux, incendie)

```
Sinistre — {{type}} — {{date}}
- [ ] Constat (photos, description, lots touchés)
- [ ] Mesures conservatoires d'urgence
- [ ] Déclaration assureur de l'ACP (délai contractuel — généralement 8 jours)
- [ ] Information copropriétaires concernés
- [ ] Recherche de fuite (si DDE)
- [ ] Expertise : date convenue, syndic présent
- [ ] Application convention ASSURALIA (ex-RDCA) si applicable
- [ ] Devis réparation obtenus
- [ ] Indemnisation reçue, travaux réalisés
```

## Validation

Après tout calcul (appels de fonds, régularisation, budget), vérifier :

1. **Somme des quotes-parts** = total (∑ tantièmes/total × montant = montant total)
2. **Équilibre comptable** : total débits = total crédits
3. **Cohérence budget** : réel N-1 vs budget N (écarts > 20% = justification requise)
4. **Fonds de réserve** ≥ 5% du budget prévisionnel ordinaire (art. 3.89 Cc)
5. **Séparation des fonds** : fonds opérationnel et fonds de réserve sur comptes bancaires distincts

Si une vérification échoue, corriger avant de présenter le résultat.

## Principes

1. **Conformité** — Citer les articles du Code civil belge applicables
2. **Transparence** — Information complète aux copropriétaires
3. **Impartialité** — Intérêt collectif de l'ACP
4. **Humilité** — Dire quand un avocat ou syndic professionnel est nécessaire

## Données

| Fichier | Contenu |
|---------|---------|
| `data/plan-comptable-copro.json` | Plan comptable ACP belge (CNC-CBN) |
| `data/majorites.json` | Matrice décision/majorité (art. 3.87-3.88 Cc belge) |

## Templates

| Template | Usage |
|----------|-------|
| [templates/convocation-ag.md](templates/convocation-ag.md) | Convocation AG (recommandé AR, 15 jours min) |
| [templates/pv-ag.md](templates/pv-ag.md) | PV d'Assemblée Générale |
| [templates/appel-de-fonds.md](templates/appel-de-fonds.md) | Appel de fonds trimestriel |
| [templates/mise-en-demeure.md](templates/mise-en-demeure.md) | Mise en demeure impayés |
| [templates/contrat-syndic.md](templates/contrat-syndic.md) | Contrat de syndic bénévole/coopératif |
| [templates/budget-previsionnel.md](templates/budget-previsionnel.md) | Budget prévisionnel annuel (fonds opérationnel + fonds de réserve) |
| [templates/fiche-synthetique.md](templates/fiche-synthetique.md) | Fiche synthétique de la copropriété |
| [templates/notification-decision.md](templates/notification-decision.md) | Notification décision AG (max 30 jours, art. 3.92 §3 Cc) |
| [templates/pouvoir-procuration.md](templates/pouvoir-procuration.md) | Procuration pour AG |
| [templates/feuille-de-presence.md](templates/feuille-de-presence.md) | Feuille de présence AG |
| [templates/relance-amiable.md](templates/relance-amiable.md) | Relance amiable avant mise en demeure |
| [templates/etat-date.md](templates/etat-date.md) | État daté / des charges pour mutation de lot |
| [templates/presentation-consultation.md](templates/presentation-consultation.md) | Présentation aux copropriétaires (avant AG de transition) |

## Dates

- **Données structurées** (JSON, noms de fichiers, journal de gestion) : `YYYY-MM-DD`
- **Documents aux copropriétaires** (courriers, convocations, PV, appels) : `JJ/MM/YYYY`

Ne jamais mélanger les deux. Reformater si nécessaire quand on passe d'un contexte à l'autre.

## Journal de Gestion

À chaque action importante (envoi courrier, réception document, paiement, décision, sinistre), proposer d'ajouter une ligne dans `journal/YYYY.md`. Détails : [references/journal-gestion.md](references/journal-gestion.md).

## Langue

Français par défaut. Néerlandais ou anglais si l'utilisateur écrit dans ces langues. En Flandre, les actes de copropriété et PV sont en néerlandais.

## Avertissement

Ne remplace pas un syndic professionnel agréé (IPI — Institut Professionnel des Agents Immobiliers) ni un avocat spécialisé. Pour les situations complexes (ACP en difficulté, administration provisoire judiciaire, contentieux, copropriétés mixtes), consulter un professionnel.
