# Prélèvement à la source (PAS)

Depuis 2019, l'IR est prélevé **en temps réel** sur les revenus, et non plus en N+1 sur les revenus de N−1.

Deux mécanismes selon la nature du revenu :

| Mécanisme | Revenus concernés | Acteur du prélèvement |
|-----------|-------------------|----------------------|
| **Retenue à la source** | Salaires, pensions, allocations chômage | Employeur / Pôle emploi / caisse de retraite |
| **Acompte contemporain** | BIC, BNC, BA, revenus fonciers, pensions alimentaires reçues, rentes viagères à titre onéreux | DGFIP par prélèvement bancaire mensuel ou trimestriel |

## Taux de prélèvement

### Taux personnalisé (par défaut)

Calculé par la DGFIP sur la base de la **dernière déclaration**. Formule approximative :

```
taux PAS = IR de référence / revenus d'activité de l'année de référence
```

Transmis à l'employeur chaque septembre. Recalculé en septembre de chaque année après déclaration.

### Taux individualisé (couples)

Sur option (case à cocher déclaration 2042) : deux taux distincts pour les conjoints, au prorata de leurs revenus respectifs.

**Effet total inchangé**, mais évite qu'un conjoint à revenu faible paie le taux calculé sur les revenus combinés.

**À recommander si** : forte disparité de revenus entre conjoints (ex : +50 k€ vs +20 k€).

### Taux neutre (non personnalisé)

Sur option (si confidentialité vis-à-vis de l'employeur). Basé sur la grille officielle d'un célibataire sans enfant.

**Attention** : si le taux neutre est **inférieur** au taux personnalisé, le contribuable doit verser la différence directement à la DGFIP (complément mensuel).

## Modulation du taux en cours d'année

Possible si :
- **Baisse de revenus** : modulation à la baisse autorisée dès que l'écart estimé dépasse 5 % (seuil 2023+, anciennement 10 %).
- **Hausse de revenus** : modulation à la hausse autorisée sans seuil minimum.
- **Changement de situation familiale** : mariage, PACS, naissance, divorce, décès → à signaler dans les **60 jours** (art. 204 I CGI).

Procédure : espace impots.gouv.fr → "Gérer mon prélèvement à la source" → "Actualiser suite à une hausse ou une baisse de vos revenus". On saisit une **estimation de tous les revenus du foyer pour l'année en cours** (toutes catégories) ; l'administration recalcule un **nouveau taux** affiché avant validation. Le taux modulé n'est donc PAS le taux issu de la dernière déclaration : il dépend de l'estimation saisie.

Cas fréquent (perte d'emploi → ARE) : un taux personnalisé calculé sur une année d'activité élevée reste appliqué jusqu'au septembre suivant. Pour récupérer la trésorerie immédiatement plutôt que d'attendre la mise à jour de septembre, faire une modulation à la baisse. L'**ARE bénéficie de l'abattement de 10 %** (revenu de remplacement, BOI-RSA-BASE-30-50-20) : saisir le **net imposable** sans retrancher soi-même le 10 % (le système l'applique).

**Pénalité si modulation à la baisse excessive** (majoration 10 % si écart > 10 % et non justifié). Si reprise d'emploi en cours d'année, refaire une modulation à la hausse (sans seuil, sans pénalité).

## Régularisation annuelle

Le PAS est un **acompte**, pas un solde définitif. La déclaration d'avril-juin N+1 aboutit à :

1. Calcul de l'IR définitif sur les revenus N
2. Comparaison avec le total prélevé à la source en N
3. **Solde à payer** (prélevé en septembre N+1, étalé si > 300 €) **ou** **remboursement** (crédité automatiquement en juillet-août N+1)

## Crédits et réductions d'impôt : acompte de janvier

Problème classique : les crédits/réductions (emploi à domicile, garde d'enfant, dons, Pinel) ne sont pas intégrés au taux PAS. Pour éviter l'avance de trésorerie, la DGFIP verse un **acompte de 60 %** mi-janvier, basé sur les dépenses de N−2.

**Ajustement en été N+1** :
- Si les dépenses N sont ≥ N−2 → rien à rembourser, reliquat versé en août
- Si les dépenses N sont < N−2 → **remboursement de l'excédent à la DGFIP** (prélèvement septembre N+1)

**Option renoncement** : possibilité de renoncer à l'acompte en décembre N (espace impots.gouv.fr) si on sait qu'on ne refera pas la dépense.

## Acompte contemporain : calage et modulation

Pour les indépendants, fonciers, pensions :
- Prélèvement **mensuel** (par défaut) ou **trimestriel** (sur option)
- Fondé sur la dernière déclaration disponible
- Possibilité de **reporter un paiement** (jusqu'à 3 fois par an en mensuel, 1 fois en trimestriel) si difficulté passagère
- Modulation possible si écart réel > 5 %

## Cas particuliers

### Primo-déclarant / démarrage d'activité

Première année : aucun taux historique → taux neutre appliqué. Possibilité d'anticiper l'acompte en déclarant une estimation de revenus.

### Mariage / PACS en cours d'année

- Option "imposition commune" (par défaut) : taux recalculé sur base foyer
- Option "individualisé" : chaque conjoint conserve son taux

### Changement d'employeur

Le nouvel employeur applique le taux transmis par la DGFIP (via la DSN). Pas de démarche du contribuable sauf taux neutre choisi.

### Expatriation

Départ en cours d'année → prélèvement s'arrête à la sortie. Revenus de source française continuent d'être prélevés selon le régime non-résident.

### Indemnités de départ / rupture conventionnelle

Fraction imposable soumise au PAS au taux en vigueur. Peut faire exploser le prélèvement mensuel → envisager modulation à la baisse après l'indemnité si baisse durable des revenus.

## Pièges fréquents

1. **Ne pas signaler un changement familial** : taux PAS inadapté pendant des mois → régul lourde.
2. **Modulation à la baisse trop agressive** : pénalité 10 % si écart > 10 % non justifié.
3. **Oublier de renoncer à l'acompte crédits d'impôt** : remboursement à faire en N+1 si la dépense n'a pas été reconduite.
4. **Confondre "PAS" et "impôt payé"** : le PAS est un acompte ; le solde (ou le remboursement) vient en N+1 après déclaration.
5. **Primo-déclarant au taux neutre** : souvent **supérieur** au taux personnalisé pour un célibataire à revenu modeste → vérifier et demander le taux personnalisé après la 1re déclaration.

## Formulaires et démarches

- Déclaration annuelle : 2042 — le PAS est pré-rempli depuis 2020
- Espace impots.gouv.fr → "Gérer mon prélèvement à la source" : taux, modulation, acomptes, renoncement
- Attestation de taux : téléchargeable à tout moment dans l'espace particulier

## Références CGI / BOFiP

- Mise en place du PAS : art. 204 A à 204 N CGI
- Signalement changement familial : art. 204 I CGI
- Acompte crédit d'impôt : art. 1665 bis CGI
- Pénalité modulation abusive : art. 1729 G CGI
- BOFiP : BOI-IR-PAS
