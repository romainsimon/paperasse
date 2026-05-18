# Equity salarial — stock-options et warrants sur actions (IPP belge)

<!-- last_updated: 2026-05-15 -->

Base légale : loi du 26 mars 1999 relative au plan belge d'action pour l'emploi (régime stock-options) ; art. 42 à 43 loi du 26 mars 1999 ; art. 36 CIR 92 (ATN) ; art. 171 CIR 92 (taxation distincte).
Voir `data/atn-vehicules-be.json` pour les ATN connexes.

> **Note** : les mécanismes RSU et BSPCE sont propres au droit fiscal français et **n'existent pas** en tant que tels en Belgique. Le droit belge connaît les **stock-options sur actions** (régime loi du 26 mars 1999) et les **warrants sur actions** (régime distinct). Les plans d'actionnariat mis en place par des multinationales (souvent qualifiés de "RSU" ou "restricted stock units") sont traités selon le régime des avantages de toute nature (ATN) en Belgique si les actions sont allouées gratuitement.

---

## 1. Stock-options — régime loi du 26 mars 1999

### Principe

Le régime belge des stock-options a été instauré par la **loi du 26 mars 1999**. Les options sur actions d'entreprise attribuées à des travailleurs ou dirigeants sont imposées **à l'octroi** (et non à l'exercice), sur la base d'un avantage forfaitaire.

### Moment d'imposition : à l'octroi

L'avantage imposable est calculé **lors de l'offre des options** (pas lors de l'exercice ni lors de la vente des actions). L'acceptation par le bénéficiaire dans les 60 jours de l'offre déclenche l'imposition.

**Avantage imposable forfaitaire** :

```
ATN = 18 % × valeur des actions sous-jacentes à la date d'offre
```

Si des conditions restrictives s'appliquent (incessibilité pendant plus de 3 ans, conditions de performance, risque de perte substantielle) :

```
ATN = 9 % × valeur des actions sous-jacentes (taux réduit)
```

**Base légale** : art. 42 à 43 loi du 26 mars 1999.

### Imposition de l'ATN

L'ATN (avantage de toute nature) est imposé **comme rémunération professionnelle** :
- Soumis à l'IPP au barème progressif (art. 36 CIR 92)
- Soumis au précompte professionnel (PP) retenu par l'employeur
- Soumis aux cotisations ONSS (salariales et patronales)

### Avantage du régime belge vs exercice

En imposant à l'octroi sur une base forfaitaire (18 % ou 9 %), le bénéficiaire peut réaliser ultérieurement une **plus-value totalement exonérée** si la valeur de l'action monte entre l'offre et l'exercice/vente, pour autant que la plus-value relève de la gestion normale du patrimoine privé.

**Risque** : si l'action perd de la valeur, l'ATN a été imposé sur une base supérieure à la plus-value réelle → l'impôt ne sera pas remboursé.

### Exercice des options

L'exercice des options (achat des actions au prix d'exercice) n'est **pas un événement imposable** en lui-même dans le cadre du régime loi 1999 — l'imposition a eu lieu à l'octroi.

### Cession des actions

La plus-value de cession des actions (valeur vente − valeur d'exercice) est **exonérée** pour un particulier en gestion normale du patrimoine (pas d'imposition sur les plus-values mobilières en Belgique).

Si l'administration considère la transaction spéculative ou hors gestion normale → 33 % (art. 90, 1° CIR 92).

### Déclaration

L'employeur déclare l'ATN sur la fiche fiscale 281.10 (case 250 ou case ATN spécifique). Pré-rempli dans Tax-on-web.

---

## 2. Warrants sur actions

### Nature et distinction

Les **warrants** sont des instruments financiers donnant le droit (mais pas l'obligation) d'acquérir des actions à un prix déterminé (prix d'exercice). Contrairement aux stock-options loi 1999, les warrants sont des valeurs mobilières cotées ou non.

### Régime fiscal selon la structure

| Structure | Moment d'imposition | Base imposable | Taux |
|-----------|--------------------|-----------------|----|
| Warrants attribués comme rémunération | À l'attribution | Valeur intrinsèque + valeur temps | Barème IPP + ONSS |
| Warrants souscrits par le travailleur à valeur réelle | À l'exercice (gain d'exercice) | Prix de marché − prix d'exercice | Barème IPP si salariat |
| Warrants exercés et actions cédées | À la cession (plus-value) | Plus-value nette | Exonéré (gestion normale) |

**Point d'attention** : si les warrants sont attribués à titre gratuit ou à un prix inférieur à leur valeur réelle, l'avantage est un ATN imposable à l'IPP.

---

## 3. Actions gratuites allouées par multinationales (type "RSU")

En Belgique, les actions allouées gratuitement dans le cadre de plans internationaux (souvent appelés RSU dans la documentation des entreprises américaines) sont traitées comme des **avantages de toute nature (ATN)** imposables au moment de l'acquisition définitive des droits (vesting).

### Moment d'imposition

**Au vesting** : la valeur de marché des actions à la date d'acquisition définitive constitue un ATN imposable.

```
ATN = valeur de marché des actions à la date de vesting × nombre d'actions
```

### Imposition

- Barème IPP progressif (comme un salaire)
- PP retenu par l'employeur (si employeur belge)
- Cotisations ONSS (salariales et patronales)

### Cession ultérieure des actions

La plus-value entre la valeur au vesting et le prix de cession est, en principe, **exonérée** pour un particulier en gestion normale du patrimoine privé.

**Risque de requalification spéculative** : ventes très rapides après vesting, grandes quantités, marchés volatils — l'administration peut argumenter le caractère spéculatif.

### Différence avec le régime français RSU (AGA)

| Critère | RSU/AGA France | Belgique (actions gratuites) |
|---------|---------------|------------------------------|
| Moment d'imposition | Au vesting (gain d'acquisition = salaire) | Au vesting (ATN = salaire) |
| Régime PV de cession | PFU ou barème | Exonérée (gestion normale) |
| Cotisations sociales | CSG/CRDS + contribution salariale 10% | ONSS (13,07 % salarié + ~25 % patronal) |
| Mécanisme de lissage | Quotient revenus exceptionnels (art. 163-0 A CGI) | Quotient revenus exceptionnels (art. 171 CIR 92) |

### Revenus exceptionnels : quotient (art. 171 CIR 92)

Un vesting important peut faire franchir artificiellement des tranches supérieures du barème IPP. Le **quotient pour revenus exceptionnels** (art. 171 CIR 92) permet de lisser l'imposition :

```
IPP_exceptionnel = [IPP(revenus_ordinaires + ATN_exceptionnel / 4) − IPP(revenus_ordinaires)] × 4
```

**À appliquer systématiquement** si l'ATN vesting dépasse significativement le revenu annuel ordinaire du contribuable.

**Conditions** : le revenu exceptionnel doit avoir un caractère non récurrent et dépasser la moyenne des revenus imposables des 3 années précédentes.

---

## 4. Épargne salariale — équivalents belges

Il n'existe pas en Belgique d'équivalent direct au PEE (Plan d'Épargne Entreprise) ou au PERCO français. Les mécanismes belges d'épargne dans le cadre de l'entreprise sont :

| Mécanisme | Avantage fiscal | Base légale |
|-----------|----------------|------------|
| **EIP (Engagement Individuel de Pension)** | Déductible IS pour la société, 2e pilier | art. 52, 3° bis CIR 92 |
| **PLCI (Pension Libre Complémentaire pour Indépendants)** | Déductible à 100 % (frais pro) | art. 52, 7° CIR 92 |
| **Épargne-pension individuelle** | Réduction 30 % (max 1 050 €) ou 25 % (max 1 350 €) — revenus 2025 | art. 145¹ CIR 92 |
| **Épargne à long terme (ELT)** | Réduction 30 % (max 2 450 €) | art. 145¹⁰ CIR 92 |

Voir `data/epargne-pension-elt.json` pour les détails.

---

## Pièges fréquents

1. **Appliquer le régime RSU/BSPCE français à un plan belge** : les deux systèmes diffèrent fondamentalement (moment d'imposition, cotisations sociales, plus-values).
2. **Oublier le PP sur l'ATN vesting** : l'employeur doit retenir le PP sur la valeur des actions allouées à la date de vesting.
3. **Croire que la plus-value de cession est imposable** : pour un particulier en gestion normale, elle est exonérée en Belgique.
4. **Ne pas appliquer le quotient art. 171** sur un vesting massif → surcharge fiscale évitable.
5. **Confondre stock-options loi 1999 et warrants** : le moment et la base d'imposition diffèrent.
6. **Oublier les cotisations ONSS** sur les ATN : l'ONSS patronal (~25 %) représente un coût significatif pour l'employeur sur les plans d'actionnariat.

## Références légales / Fisconetplus

| Règle | Source |
|-------|--------|
| Stock-options — régime fiscal | Loi du 26 mars 1999, art. 42-43 |
| ATN — définition et imposition | art. 36 CIR 92 |
| Revenus exceptionnels — quotient | art. 171 CIR 92 |
| Plus-values spéculatives | art. 90, 1° CIR 92 |
| Épargne-pension | art. 145¹ CIR 92 |
| ELT | art. 145¹⁰ CIR 92 |

Source : Fisconetplus.be — https://www.fisconetplus.be
SPF Finances : https://finances.belgium.be/fr/entreprises/personnel-et-remuneration/avantages-de-toute-nature
Loi du 26 mars 1999 : https://www.ejustice.just.fgov.be
