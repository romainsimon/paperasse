# Billetterie associative

## Pourquoi tenir une billetterie ?

Toute manifestation à entrée payante ou avec ventes (buvette, restauration, tombola, vide-grenier) génère une **traçabilité financière** nécessaire pour :

- la **comptabilité** de l'association (plan comptable associatif — règlement ANC 2018-06) ;
- la **transparence** envers les adhérents (présentation en AG) ;
- l'évaluation du **seuil de franchise des impôts commerciaux** (78 596 € pour 2026 — re-vérifier annuellement contre BOFIP) ;
- la **preuve fiscale** en cas de contrôle (durée de conservation art. L. 102 B LPF).

## Choix du support

### Billets pré-imprimés (souche + volant)

- Billets **numérotés** en série continue.
- Mention obligatoire : nom de l'asso, manifestation, prix, date.
- Registre tenu en parallèle : numéros vendus, numéros annulés, numéros invendus.
- Avantage : pas de dépendance technique. Adapté aux petits événements.
- Inconvénient : laborieux, sensible aux erreurs, faux possibles.

### Billetterie électronique (HelloAsso, AssoConnect, Weezevent, etc.)

- Génération automatique de billets numérotés ou QR-code.
- Reporting financier automatisé.
- Paiement en ligne (CB, prélèvement).
- Avantage : traçabilité totale, intégration comptable.
- Vérifier le statut RGPD du prestataire et la conservation des données des participants.

## Tenue du registre billetterie

Quelle que soit la solution :

| Donnée | Pourquoi |
|--------|----------|
| Numéro de série | Identification unique |
| Catégorie / tarif | Adulte, enfant, gratuit, tarif réduit |
| Mode de paiement | Espèces, CB, chèque, en ligne |
| Date et heure d'émission | Recoupement avec comptage flux |
| Vendu / annulé / invendu | Réconciliation comptable |

À l'issue de la manifestation, totaux croisés : **registre billetterie = recettes encaissées**. Tout écart doit être documenté (erreur, vol, fraude).

## Comptabilité de l'événement

### Distinguer les natures de recettes

| Recette | Nature | Compte (PCA) | Reçu fiscal CERFA 11580 possible ? |
|---------|--------|--------------|-------------------------------------|
| Cotisation adhérent | Membres | 756 | Oui (associations d'intérêt général uniquement) — voir skill `tresorier-association` |
| Don manuel sans contrepartie | Mécénat | 754 | Oui |
| Billet d'entrée à la manifestation | Vente | 706 ou 708 | **NON** (contrepartie reçue) |
| Buvette | Vente de marchandises | 707 | NON |
| Restauration | Vente de marchandises | 707 | NON |
| Vente d'objets (tombola, brocante interne) | Vente | 707 | NON |
| Recette tombola payante | Recette exceptionnelle | 758 (ou 706 selon convention) | NON |
| Subvention publique | Subvention | 74 | NON |
| Sponsoring privé | Recette commerciale ou mécénat selon contrepartie | 758 ou 754 | Oui si mécénat (sans contrepartie significative) |

⚠️ **Pas de reçu fiscal pour un billet d'entrée, un repas, ou une boisson**. Le don avec contrepartie n'ouvre droit qu'à la fraction « pure don » (la partie excédant la valeur de la contrepartie).

### Comptabilité de caisse pendant l'événement

- **Fond de caisse** initial pointé et signé.
- **Bordereau de caisse** tenu en continu : entrée → catégorie de recette.
- **Pointages intermédiaires** toutes les 2 h : versement de la grosse coupure au coffre intermédiaire (sécurité antivol).
- **Clôture de caisse** : décompte par dénomination, signature contradictoire (au moins 2 personnes).
- Comparaison **registre billetterie / fond de caisse final / bordereau** : tout écart documenté.

## Conservation

| Document | Durée minimale |
|----------|-----------------|
| Billets souches | 6 ans (fiscal, art. L. 102 B LPF) |
| Registre billetterie | 6 ans |
| Bordereaux de caisse | 6 ans |
| Factures et justificatifs | 10 ans (comptable, art. L. 123-22 C. com. par analogie ; règlement ANC 2018-06) |
| PV tombola (autorisation L. 322-3) | 10 ans recommandé |

## Seuil de franchise des impôts commerciaux

Pour 2026, une association exonérée par défaut d'IS, TVA et CET peut accepter des **recettes commerciales accessoires** jusqu'à **78 596 €** par année civile (montant à **re-vérifier annuellement** sur BOFIP BOI-IS-CHAMP-10-50-10-20). Au-delà, fiscalisation possible des activités commerciales (et nécessité d'une comptabilisation sectorisée).

La franchise s'apprécie sur **l'ensemble des recettes commerciales** de l'asso, pas seulement la kermesse. Voir le skill `tresorier-association` pour la doctrine fiscale (gestion désintéressée, règle des 4 P, sectorisation).

## RGPD billetterie en ligne

Si la billetterie collecte des données personnelles (nom, mail, téléphone) :

- **base légale** : exécution contractuelle (vente du billet) ;
- **information** : mention au moment de l'achat (finalité, destinataire, durée, droits) ;
- **durée de conservation** : limitée à la finalité (généralement 1 an après l'événement, sauf nécessité comptable pour les factures) ;
- **prestataire** : DPA (data processing agreement) ou contrat de sous-traitance si la plateforme conserve les données ;
- **droits des personnes** : accès, rectification, effacement, opposition — voir skill `communication-parents`.

## Sources

Voir [sources.md](sources.md) pour les bases légales fiscales et BOFIP. Voir aussi le skill `tresorier-association` pour le détail du plan comptable et de la franchise commerciale.
