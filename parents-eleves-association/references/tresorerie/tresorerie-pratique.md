# Trésorerie pratique

Conseils opérationnels pour le trésorier bénévole d'une APE ou d'une petite association.

## Comptes bancaires

### Choix de la banque

- **Banques traditionnelles** (Crédit Mutuel, Crédit Agricole, BNP…) : offres associatives souvent gratuites mais procédures lourdes (pouvoirs à formaliser en agence à chaque renouvellement de bureau).
- **Néobanques pro adaptées aux associations** (Qonto Asso, Helios, Hello Asso compte, Crédit Coop) : tarifs transparents, double signature paramétrable, intégration comptable, mais vigilance sur la stabilité tarifaire et la possibilité d'encaissement de chèques.

**Critères clés** :

- **Double signature** pour les paiements > seuil interne (recommandation : 1 000 EUR).
- **Cartes** : carte trésorier avec plafond ; éventuelle carte président subordonnée.
- **Encaissement** : virement (gratuit, traçable, à privilégier), chèque (si l'établissement l'accepte), espèces (caisse à éviter au-delà de 1 500 EUR / opération — vérifier le seuil légal).
- **Coût** : viser < 15 EUR / mois pour une petite asso.

### Pouvoirs bancaires

À jour à chaque renouvellement du bureau. Documents à produire à la banque :

- Statuts à jour.
- Récépissé RNA et publication JOAFE.
- PV d'AG actant l'élection du bureau.
- Délibération du bureau désignant les signataires (président + trésorier classiquement).
- Pièce d'identité de chaque signataire.

## Caisse

Si caisse physique (recettes kermesse en espèces, par exemple) :

- **Tenue d'un livre de caisse** journalier (date, motif, recette, dépense, solde).
- **Décompte** signé contradictoirement par deux personnes après chaque manifestation.
- **Versement** des espèces sur le compte bancaire dans les **48 heures** (limite à fixer dans le règlement intérieur).
- Limite légale de paiement en espèces : **1 000 EUR** pour un débiteur professionnel domicilié fiscalement en France, hors particuliers (art. L. 112-6 CMF) — à vérifier au cas par cas.

## Pièces justificatives

Toute écriture doit être appuyée par une pièce justificative numérotée :

- **Recettes** : talon de chèque, copie virement, ticket de caisse, bulletin de don, reçu CERFA, convention de subvention, copie d'avis de virement.
- **Dépenses** : facture (au nom de l'association — jamais d'une personne physique), note de frais avec justificatifs, contrat de prestation.

**Délai de conservation** : **10 ans** pour les pièces comptables (art. L. 123-22 C. com. appliqué par analogie aux associations tenant une comptabilité d'engagement) ; **3 ans** pour les pièces fiscales (sauf si rectification). Conservation papier ou numérique avec valeur probante (PDF signé / horodaté / archivé selon norme NF Z42-013 pour les très grandes associations).

## Cotisations

- **Tarification** : grille votée en AG ou par le bureau sur délégation. Distinguer membre actif, membre bienfaiteur, famille, etc.
- **Suivi** : tableau `cotisations.csv` avec date d'appel, mode de règlement, date d'encaissement, reçu n°.
- **Reçu** : reçu simple (non fiscal) sauf si l'association est éligible et que la cotisation est sans contrepartie significative — voir [dons-mecenat.md](dons-mecenat.md).
- **Cotisations impayées** : relance amiable, puis abandon en exercice N+2 par décision du bureau (passage en compte 654 si la créance a été constatée à l'engagement).

## Notes de frais des bénévoles

Deux options :

1. **Remboursement effectif** : sur présentation des justificatifs (tickets de carburant, péages, repas). Barème indemnités kilométriques : utiliser le **barème fiscal des bénévoles** (publié chaque année au BOFIP — barème spécifique, plus bas que le barème salariés). Comptabiliser en **6251** (frais de mission) ou **6256** (missions et réceptions).
2. **Abandon de frais avec reçu fiscal** : le bénévole signe une note de frais, joint les justificatifs, puis renonce expressément au remboursement par mention « je renonce au remboursement, à porter en don ». L'association émet un reçu CERFA pour le montant abandonné. Comptabilisation : débit 6258 / crédit 758 (ou directement débit / crédit dans la classe appropriée).

Le bénévole se déduit ensuite le montant à 66 % (ou 75 % selon éligibilité).

## Budget prévisionnel

Outil de pilotage et pièce obligatoire pour toute demande de subvention.

Format standard (CERFA 12156\*06 et Le Compte Asso) :

```
CHARGES                          PRODUITS
60 Achats                        70 Ventes
   Petites fournitures             Prestations (706)
61 Services extérieurs           74 Subventions
   Locations, entretien             État, collectivités
62 Autres services ext.          75 Autres produits
   Honoraires, comm., dépl.        756 Cotisations
63 Impôts et taxes                  758 Dons manuels
64 Charges de personnel          76 Produits financiers
   (si salariés)                 77 Produits exceptionnels
65 Autres charges courantes      78 Reprises sur amortissements/provisions
   657 Aides financières         79 Transferts de charges
66 Charges financières
67 Charges exceptionnelles       86/87 Contributions volontaires en nature
68 Dotations amortissements          (hors bilan)
```

Le budget prévisionnel doit s'**équilibrer en charges et en produits**. Différence éventuelle = autofinancement à dégager (réserves) ou résultat prévisionnel à annoncer.

## Contrôle interne minimal

- **Séparation des fonctions** : celui qui engage la dépense ≠ celui qui paie. Idéalement président engage, trésorier paie. Si association trop petite, double signature systématique.
- **Vérification croisée** : un membre du bureau autre que le trésorier (le commissaire aux comptes statutaire bénévole, par exemple) vérifie les comptes une fois par an avant l'AG.
- **Inventaire annuel** : matériel pédagogique, mobilier, stock kermesse.
- **Rapprochement bancaire mensuel** : minimum. À conserver.

## Outils logiciels recommandés (non exhaustif)

| Outil | Coût | Notes |
|-------|------|-------|
| Tableur (LibreOffice, Excel) | Gratuit | OK pour les très petites assos en comptabilité de trésorerie. Risque d'erreur élevé au-delà de 200 écritures/an. |
| **AssoConnect**, **HelloAsso Compta**, **Dolibarr ASSO** | Gratuit ou freemium | Conformes ANC 2018-06, intègrent appels de cotisation, dons en ligne, billetterie. |
| **EBP Compta Associations**, **Quadra** | Payant | Pour assos dépassant 100 000 EUR de budget ou avec CAC. |

Le skill ne recommande pas un outil en particulier ; il aide à structurer les écritures selon le PCG associatif quel que soit l'outil retenu.
