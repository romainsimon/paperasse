# Mutations de Lots (Vente)

`last_updated: 2026-05-15`

## Vue d'Ensemble

Lors de la vente d'un lot de copropriété en Belgique, le syndic intervient à plusieurs étapes :
1. Renseignements préalables à la vente (avant le compromis)
2. État des charges (avant l'acte authentique)
3. Information du notaire instrumentant
4. Notification de la mutation et mise à jour des données ACP

**Fondement légal principal** : art. 3.80 et 3.81 du Code civil belge.

## Renseignements Préalables à la Vente

### Définition

Informations communiquées à l'acquéreur potentiel **avant la signature du compromis de vente** ou de la promesse de vente. En Belgique, c'est généralement le notaire ou l'agence immobilière qui collecte ces informations auprès du syndic pour le compte du vendeur.

### Contenu recommandé

1. Montant des charges ordinaires et extraordinaires en cours (quote-part du lot)
2. Arriérés de charges éventuellement dus par le vendeur
3. État global de la trésorerie de l'ACP (impayés, fonds de réserve)
4. Travaux votés et non encore exécutés — appels à venir
5. Procédures judiciaires en cours impliquant l'ACP ou le lot

### Documents à joindre (selon statuts et pratique)

- Statuts de la copropriété (acte de base + règlement de copropriété) — disponibles à la Conservation des hypothèques
- PV des 3 dernières AG
- Carnet d'entretien (si tenu)
- DIU (Dossier d'Intervention Ultérieure) — obligatoire à transmettre à l'acquéreur
- PEB (certificat de performance énergétique) — obligatoire à la vente selon les régions (Flandre : EPC, Bruxelles : PEB, Wallonie : PEB)
- Rapport d'inspection électrique (obligatoire pour installations de plus de 25 ans ou non conformes)

### Facturation

Les renseignements préalables peuvent faire l'objet d'une facturation au vendeur, dans les limites prévues par les statuts ou l'accord entre les parties. Il n'existe pas en Belgique de plafond légal réglementé comme en France.

## État des Charges (avant l'acte authentique)

### Définition

Document comptable détaillé établi par le syndic à la demande du notaire, **avant la signature de l'acte authentique**. C'est le document de référence pour le partage des charges entre vendeur et acquéreur.

### Contenu

**Partie 1 : Sommes dues par le vendeur à l'ACP**
- Appels de fonds ordinaires (appelés, versés, solde)
- Appels de fonds travaux votés (appelés, versés, solde)
- Cotisations fonds de réserve
- Arriérés éventuels et intérêts de retard

**Partie 2 : Sommes dont l'ACP pourrait être débitrice envers le vendeur**
- Avances versées en excès
- Avoir sur décompte de l'exercice en cours

**Partie 3 : Sommes qui seront dues par l'acquéreur**
- Appels de fonds des trimestres restants de l'exercice
- Cotisations fonds de réserve restantes

Voir template : [templates/etat-date.md](../templates/etat-date.md)

### Facturation

Le syndic peut facturer l'établissement de l'état des charges au vendeur. Le montant est librement négocié en Belgique (pas de plafond légal national, contrairement à la France).

### Délai

Pas de délai légal strict, mais la pratique recommande de répondre dans les **15 jours** suivant la demande du notaire. Un retard peut bloquer la vente et engager la responsabilité du syndic.

## Solidarité de l'Acquéreur (art. 3.81 Cc belge)

En droit belge, **l'acquéreur est solidairement responsable** des dettes du vendeur envers l'ACP à la date de la vente.

**Conséquences pratiques :**
- Le notaire a l'obligation légale de s'informer auprès du syndic de l'état des dettes du vendeur
- L'acquéreur peut retenir sur le prix de vente les sommes dues à l'ACP (pratique courante)
- Le notaire retient les sommes dues sur le produit de la vente avant de les reverser au vendeur
- Cette solidarité protège l'ACP sans nécessiter de procédure d'opposition formelle (contrairement au droit français)

## Notification de Mutation

### Obligations

Le notaire notifie la mutation au syndic après signature de l'acte authentique. Le syndic doit ensuite :

1. **Mettre à jour le registre des copropriétaires** (nom, adresse, lot, quotes-parts)
2. **Transférer le compte copropriétaire** (solde du vendeur → acquéreur si applicable)
3. **Informer l'acquéreur** des modalités de paiement des charges, de l'IBAN pour les virements, et du rythme des appels de fonds
4. **Mettre à jour le fichier JSON** de la copro (données Paperasse)

### Répartition des charges

**Principe** : le transfert des charges s'opère au jour de la signature de l'acte authentique.

| Charges | Qui paie |
|---------|---------|
| Appels de fonds appelés avant la vente | Vendeur |
| Appels de fonds appelés après la vente | Acquéreur |
| Décompte de l'exercice en cours | Au prorata temporis selon convention notariale |
| Travaux votés avant la vente | En principe le vendeur (selon accord dans l'acte) |
| Fonds de réserve (cotisations passées) | Acquises à l'ACP, non remboursables au vendeur |

### Fonds de réserve et mutation

Les cotisations au fonds de réserve sont **définitivement acquises à l'ACP** (art. 3.89 Cc belge). Elles ne sont ni remboursées au vendeur ni transférées à l'acquéreur. L'acquéreur cotise à partir de la date de mutation.

Toutefois, **dans l'acte de vente**, vendeur et acquéreur peuvent librement convenir d'un ajustement du prix de vente pour tenir compte du fonds de réserve existant — cette convention est entre les parties et n'affecte pas l'ACP.

## Contenu de l'Acte de Vente (obligations spécifiques Belgique)

L'acte authentique de vente d'un lot de copropriété doit en Belgique contenir ou référencer :
- La description précise du lot (avec référence à l'acte de base et à l'état descriptif de division)
- La quote-part dans les parties communes
- La mention que l'acquéreur a pris connaissance des statuts de la copropriété (acte de base, règlement de copropriété, ROI)
- L'état des charges et dettes à la date de la vente
- Les travaux votés et non encore exécutés
- Les procédures judiciaires en cours

**Pas de certificat « loi Carrez » en Belgique** : contrairement au droit français (loi Carrez du 18 décembre 1996), il n'existe pas en Belgique d'obligation légale de mentionner la superficie privative dans le contrat de vente d'un lot de copropriété. La superficie peut figurer dans l'acte de base ou dans l'acte de vente à titre indicatif, mais ne constitue pas une donnée légalement opposable dont l'inexactitude permettrait à l'acquéreur d'agir en réduction du prix.

**PEB obligatoire** : le certificat PEB du logement privatif doit être annexé à l'acte de vente ou au moins avoir été communiqué à l'acquéreur avant la signature du compromis, sous peine de sanctions régionales.

**Rapport d'inspection électrique** : si l'installation électrique est non conforme, la mention de non-conformité doit figurer dans l'acte ; l'acquéreur dispose d'un délai pour mise en conformité.

**DIU** : le Dossier d'Intervention Ultérieure doit être remis à l'acquéreur lors de la vente. Le notaire mentionne généralement sa remise dans l'acte.

## Notification au Syndic après la Vente

Le notaire notifie la mutation au syndic, en principe dans les **15 jours** suivant la signature de l'acte authentique. Cette notification permet au syndic de :
- Mettre à jour le registre des copropriétaires
- Transférer le compte copropriétaire
- Informer l'acquéreur des modalités de paiement

En pratique, le notaire belge contacte le syndic avant et après la signature. Le délai de 15 jours est une pratique recommandée ; aucun délai légal strict n'est prévu par le Code civil belge pour cette notification, mais un retard peut engager la responsabilité du notaire si l'ACP subit un préjudice.

## Checklist Mutation

```
Mutation — Lot {{n}} — Vendeur : {{vendeur}} → Acquéreur : {{acquereur}}
- [ ] Renseignements préalables transmis au notaire / vendeur
- [ ] Documents joints (PV AG, statuts, DIU, PEB si disponible)
- [ ] État des charges établi et transmis au notaire
- [ ] Vérification arriérés du vendeur
- [ ] Confirmation solidarité acquéreur / retenue sur prix de vente si impayés
- [ ] Mutation notifiée par le notaire (acte authentique signé)
- [ ] Registre copropriétaires mis à jour
- [ ] Compte copropriétaire transféré dans le système
- [ ] Acquéreur informé (modalités paiement, IBAN, prochain appel)
- [ ] DIU remis à l'acquéreur (confirmation)
```
