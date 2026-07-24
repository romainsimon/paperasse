# Mutations de Lots (Vente)

## Vue d'Ensemble

Lors de la vente d'un lot de copropriété, le syndic intervient à plusieurs étapes :
1. Pré-état daté (avant le compromis)
2. État daté (après le compromis, avant l'acte authentique)
3. Opposition éventuelle (art. 20)
4. Notification de la mutation

## Pré-état Daté

### Définition

Document d'information remis à l'acquéreur **avant la signature du compromis** (art. L721-2 CCH). Le vendeur ou son agent demande ces informations au syndic.

### Contenu obligatoire

1. Montant des charges courantes du budget prévisionnel et des charges hors budget (quote-part du lot)
2. Sommes susceptibles d'être dues au syndicat par l'acquéreur
3. État global des impayés de la copropriété
4. Fonds de travaux (montant de la part du lot et montant global)
5. Nombre de copropriétaires ayant engagé une procédure art. 29-1A

### Documents à joindre

- Fiche synthétique (art. 8-2)
- Règlement de copropriété et état descriptif de division
- PV des 3 dernières AG
- Carnet d'entretien
- DTG (si réalisé)
- DPE collectif (si réalisé)
- Conclusions de l'audit énergétique (si réalisé)

### Facturation

Le pré-état daté **ne peut pas être facturé** au vendeur. Il fait partie des missions normales du syndic (inclus dans le forfait de gestion courante, décret du 26 mars 2015).

## État Daté (art. 5 décret 1967)

### Définition

Document comptable détaillé établi par le syndic **après la signature du compromis**, à la demande du notaire. C'est le document de référence pour le partage des charges entre vendeur et acquéreur.

### Contenu (3 parties)

**Partie 1 : Sommes pouvant rester dues par le vendeur**
- Provisions sur charges courantes (appelées, versées, solde)
- Provisions sur travaux votés (appelées, versées, solde)
- Cotisations fonds de travaux
- Impayés éventuels

**Partie 2 : Sommes dont le syndicat pourrait être débiteur envers le vendeur**
- Avances versées
- Trop-perçu sur régularisation

**Partie 3 : Sommes qui seront dues par l'acquéreur**
- Provisions des trimestres restants de l'exercice
- Cotisations fonds de travaux restantes

Voir template : [templates/etat-date.md](../templates/etat-date.md)

### Facturation

L'état daté **peut être facturé** au vendeur, dans la limite du plafond fixé par décret : **380 EUR TTC** maximum (art. 10-1 al. 7 loi 1965, décret du 21 février 2020).

### Délai

Pas de délai légal strict, mais la pratique recommande **15 jours** après la demande du notaire. Un retard peut bloquer la vente.

## Opposition (art. 20 loi 1965)

### Principe

Le syndic peut **faire opposition au versement du prix de vente** pour garantir le paiement des charges dues par le vendeur.

### Conditions

1. Le vendeur a des **charges impayées**
2. L'opposition doit être notifiée au notaire **dans les 15 jours** suivant la notification de la mutation au syndic
3. L'opposition porte sur les sommes dues par le vendeur (charges, provisions, appels travaux)

### Procédure

1. Le notaire notifie le projet de mutation au syndic (LRAR ou voie électronique)
2. Le syndic vérifie le compte du vendeur
3. Si des sommes sont dues :
   - Le syndic notifie l'opposition au notaire dans les 15 jours
   - Le notaire retient les sommes sur le prix de vente
   - Le notaire verse au syndicat les sommes dues avant de libérer le solde au vendeur
4. Si aucune somme n'est due : pas d'opposition, le notaire verse le prix au vendeur

### Attention

- L'opposition n'est **pas automatique**. Le syndic doit agir dans les 15 jours.
- Passé ce délai, le syndic perd son droit d'opposition.
- L'opposition est **limitée aux sommes exigibles** à la date de la mutation.

## Notification de Mutation

### Obligations

Le notaire notifie la mutation au syndic (art. 6 décret 1967). Le syndic doit ensuite :

1. **Mettre à jour le registre des copropriétaires** (nom, adresse, lot, tantièmes)
2. **Transférer le compte copropriétaire** (solde du vendeur → acquéreur)
3. **Informer l'acquéreur** des modalités de paiement des charges
4. **Mettre à jour le RNC** si nécessaire

### Répartition des charges

**Principe** : le transfert des charges s'opère au jour de la signature de l'acte authentique (et non du compromis).

| Charges | Qui paie |
|---------|---------|
| Provisions appelées avant la vente | Vendeur |
| Provisions appelées après la vente | Acquéreur |
| Régularisation de l'exercice en cours | Au prorata temporis (vendeur et acquéreur) |
| Travaux votés avant la vente | Vendeur (même si les appels sont postérieurs) |
| Fonds de travaux (cotisations passées) | Acquises au syndicat, non remboursables |

### Fonds de travaux et mutation

Les cotisations au fonds de travaux sont **définitivement acquises au syndicat** (art. 14-2 al. 4). Elles ne sont ni remboursées au vendeur ni transférées à l'acquéreur. L'acquéreur commence à cotiser à partir de la date de mutation.

## Checklist Mutation

```
Mutation — Lot {{n}} — Vendeur : {{vendeur}} → Acquéreur : {{acquereur}}
- [ ] Pré-état daté transmis (gratuit)
- [ ] Documents obligatoires joints (fiche synthétique, PV AG, règlement, etc.)
- [ ] État daté établi et transmis au notaire (max 380 EUR TTC)
- [ ] Vérification compte vendeur (impayés ?)
- [ ] Opposition notifiée si impayés (délai : 15 jours après notification)
- [ ] Mutation notifiée par le notaire
- [ ] Registre copropriétaires mis à jour
- [ ] Compte copropriétaire transféré
- [ ] Acquéreur informé (modalités paiement, prochain appel)
```
