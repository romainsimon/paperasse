# Déductions, réductions et crédits d'impôt (IPP belge)

<!-- last_updated: 2026-05-15 -->

Base légale : CIR 92, art. 104 à 116 (déductions), art. 145¹ et s. (réductions d'impôt fédérales).
Voir `data/niches-fiscales.json` pour les paramètres chiffrés.

## Distinction fondamentale

| Mécanisme | S'applique sur | Remboursable si excédent ? | Ordre dans le calcul |
|-----------|---------------|---------------------------|----------------------|
| **Déduction** | Revenu imposable (avant calcul de l'impôt) | Non applicable | Étape 4 (avant barème) |
| **Réduction** | Impôt calculé | Non — plancher 0 € | Étape 8 (après barème) |
| **Crédit d'impôt** | Impôt calculé | Oui — remboursé si excédent | Étape 8 bis |

**Conséquence pratique** : une déduction de 1 000 € à TMI 50 % économise 500 €. Une réduction de 1 000 € économise 1 000 €. Un crédit de 1 000 € économise 1 000 € et est remboursable si l'impôt est inférieur à 1 000 €.

**Note belge importante** : contrairement à la France, il n'existe pas en Belgique de **plafonnement global des niches fiscales** unique (pas d'équivalent au plafond français de 10 000 €). Chaque dispositif a ses propres plafonds individuels.

---

## Déductions (agissent sur le revenu imposable)

### Pensions alimentaires (art. 104 CIR 92)

- Les pensions alimentaires versées à des **personnes dont le contribuable n'assume pas les charges** (ex-conjoint, enfant majeur, ascendant dans le besoin) sont déductibles à hauteur de **80 %** du montant versé.
- La fraction non déductible (20 %) reste à charge du contribuable sans avantage fiscal.
- **Conditions** : pension versée en exécution d'une obligation légale (jugement, convention homologuée), preuve des versements effectifs.
- **Limite** : la déduction est plafonnée si le bénéficiaire est à charge du contribuable (pas de déduction + prise en charge simultanée).

**Base légale** : art. 104 CIR 92.

**Exemple** : pension alimentaire versée = 1 000 €/mois → déduction annuelle = 12 000 × 80 % = **9 600 €**.

### Frais professionnels (forfait ou réels)

- **Salariés** : forfait automatique 30 % (max 5 930 €, revenus 2025) ou frais réels documentés si supérieurs.
- **Dirigeants** : forfait 3 % (max 2 890 €) ou frais réels.
- **Indépendants** : frais réels uniquement (toutes charges professionnelles réelles et documentées).

Voir `references/ipp-mecanisme.md` pour le détail.

### Épargne-pension et ELT (déduction de base imposable régionale)

L'épargne-pension et l'ELT agissent comme des **réductions d'impôt fédérales** (pas des déductions stricto sensu du revenu imposable) — voir ci-dessous.

---

## Réductions d'impôt fédérales (agissent sur l'impôt calculé)

### Épargne-pension (art. 145¹ CIR 92)

| Versement annuel | Taux de réduction | Réduction max |
|-----------------|-------------------|---------------|
| ≤ 1 050 € | **30 %** | 315 € |
| 1 050 € à 1 350 € | **25 %** | 337,50 € |

**Règle pratique** (revenus 2025) : si versement = 1 050 €, réduction = 315 € (30 % × 1 050). Si versement = 1 350 €, réduction = 337,50 € (25 % × 1 350). Le passage de 1 050 € à 1 050,01 € fait basculer **tout** le versement au taux 25 % ; entre 1 050,01 € et 1 260 €, l'avantage est *inférieur* aux 315 € de l'option basse (piège fiscal).

**Produits éligibles** : contrat d'assurance épargne-pension ou fonds de pension réglementés (banques et assureurs agréés par la FSMA).

**Attestation** : fiche fiscale 281.60 fournie par l'organisme.

**Base légale** : art. 145¹ CIR 92.

### Épargne à long terme (ELT) (art. 145¹⁰ CIR 92)

- **Taux** : 30 % sur les versements éligibles.
- **Plafond** : 2 450 € de versements maximum (indexé), net d'impôt selon les revenus professionnels nets.
- **Produits éligibles** :
  - Remboursement de capital d'emprunt hypothécaire (hors habitation propre depuis 2015 — critères régionaux)
  - Primes d'assurance-vie liée à l'emprunt (assurance solde restant dû)
  - Contrats d'assurance-vie pure (branche 21) qualifiés

**Attestation** : fiche fiscale 281.61.

**Base légale** : art. 145¹⁰ CIR 92.

**Attention** : l'ELT et l'épargne-pension sont soumis à la **taxe sur les sommes constituées** de 10 % lors du rachat (à 60 ans ou à la maturité). Cela doit être intégré dans le calcul du rendement net.

### Dons à des institutions agréées (art. 145³³ CIR 92)

- **Taux** : **45 %** de réduction sur les dons à des institutions agréées par le SPF Finances.
- **Montant minimum** : **40 €** par institution et par an (pas de réduction en dessous).
- **Plafond** : **10 %** des revenus nets recueillis, plafond absolu à vérifier (indexé).
- **Attestation** : fiche fiscale 281.71 fournie par l'institution agréée.

**Exemple** : don de 500 € à une institution agréée → réduction = 500 × 45 % = **225 €**.

**Base légale** : art. 145³³ CIR 92.

**Liste des institutions agréées** : https://finances.belgium.be/fr/particuliers/avantages_fiscaux/liberalites

### Frais de garde d'enfant (art. 145³⁴ et s. CIR 92)

- **Taux** : **45 %** des dépenses déclarées.
- **Conditions** :
  - Enfant de moins de **14 ans** (ou 21 ans si handicapé).
  - Garde par une institution ou personne agréée (crèche, garderie, accueil extrascolaire agréé ONE/Kind en Gezin).
  - Maximum **14,40 €/jour** de garde par enfant (montant 2025, indexé).
- **Attestation** : fournie par la structure d'accueil agréée.

**Base légale** : art. 145³⁴ CIR 92.

### Sécurité habitation (art. 145³¹ bis CIR 92)

- **Taux** : **50 %** des dépenses pour l'installation de systèmes de sécurité ou de détection d'incendie dans la résidence propre.
- **Plafond** : montant des dépenses plafonné — vérifier le montant actualisé.
- **Conditions** : travaux réalisés par un entrepreneur agréé, factures à conserver.

### Bonus à l'emploi fiscal (crédit d'impôt remboursable)

- Réduction d'impôt **remboursable** pour les travailleurs à bas salaires.
- Calculée automatiquement par le système (déjà intégrée dans le calcul PP et régularisée via Tax-on-web).
- **Base légale** : art. 289ter CIR 92.

---

## Avantages fiscaux régionaux

Depuis la 6e réforme de l'État, certaines réductions d'impôt ont été régionalisées. Elles s'appliquent à la part régionale de l'IPP et varient selon la Région de résidence (Wallonie, Flandre, Bruxelles-Capitale).

### Chèque-habitat wallon

- Déduction régionale pour l'emprunt hypothécaire sur l'habitation propre (Wallonie uniquement).
- Montant de base selon les revenus du foyer ; majoré par enfant à charge.
- Annoncé en extinction progressive — vérifier le calendrier actualisé.
- Déclaration en cadre XII de Tax-on-web.

### Réduction flamande (woonbonus)

- Anciennement applicable en Flandre, **supprimée depuis l'exercice 2021**.
- Plus aucun avantage fiscal régional flamand sur l'emprunt hypothécaire pour les nouveaux contrats depuis 2020.

### Bruxelles

- Réduction pour emprunt hypothécaire sur habitation propre en Région bruxelloise — régime spécifique, vérifier via Tax-on-web.

---

## Pas d'équivalents belges à certains dispositifs français

Les dispositifs suivants **n'existent pas** en droit fiscal belge :

| Dispositif français | Situation en Belgique |
|--------------------|----------------------|
| Pinel / Denormandie | Aucun équivalent — investissement locatif non défiscalisé |
| FCPI / FIP | Aucun équivalent |
| Emploi à domicile (crédit 50 %) | Partiellement remplacé par les titres-services (déductibilité limitée) |
| IFI | N'existe pas — aucune taxe sur la fortune en Belgique |
| PER (déduction revenus) | Remplacé par épargne-pension (réduction 30/25 %) et ELT (réduction 30 %) |
| Girardin / Malraux | Aucun équivalent |
| Crédit d'impôt transition énergétique | Primes régionales directes (primes Énergie, RENoVAS) — pas de crédit IPP |

---

## Titres-services

Les titres-services (aide à domicile, ménage, repassage) permettent une **déduction fiscale limitée** :
- Prix d'achat du titre-service : **9 €** (dont une partie subventionnée par la Région).
- Déductibilité fiscale : **non** directement en IPP (contrairement au crédit d'impôt emploi à domicile français).
- Les Régions gèrent les subventions directement — l'avantage est intégré dans le prix subventionné.

---

## Ordre d'application (après calcul de l'impôt brut)

```
Impôt brut (barème progressif sur revenu taxable)
  ↓ − réductions d'impôt fédérales (épargne-pension, ELT, dons, frais garde, etc.)
  Plancher 0 € — l'excédent de réduction est perdu (sauf quotités exemptées enfants remboursables)
Impôt fédéral réduit
  ↓ + additionnels communaux (6 % à 9 %)
IPP total
  ↓ − précompte professionnel déjà retenu
= Solde à payer ou à rembourser
```

**Crédits d'impôt remboursables** (bonus à l'emploi, quotités excédentaires pour enfants — art. 134 §2) : peuvent générer un remboursement même si l'impôt est à 0.

---

## Stratégies d'optimisation belges

### 1. Maximiser l'épargne-pension jusqu'à 1 050 € (taux 30 %)

Passer de 1 050 € à 1 050,01 € fait basculer au taux 25 % — ne pas dépasser 1 050 € sauf si le versement dépasse 1 260 € (seuil au-delà duquel l'option haute redevient avantageuse).

### 2. Combiner épargne-pension et ELT

Un foyer peut combiner les deux plafonds (1 050/1 350 € + 2 450 €) — ce sont des plafonds indépendants.

### 3. Dons : seuil minimum 40 € par institution

En dessous de 40 € par institution et par an, la réduction n'est pas accordée. Regrouper les dons sur un petit nombre d'institutions agréées.

### 4. Frais de garde : vérifier l'agrément ONE/Kind en Gezin

Seule la garde par une structure agréée ouvre droit à la réduction. Vérifier l'agrément avant d'inclure dans la déclaration.

### 5. Pensions alimentaires : conserver les preuves de paiement

L'administration peut demander la preuve des versements effectifs. Virer par virement bancaire avec mention de la référence du jugement.

---

## Pièges fréquents

1. **Confondre réduction et crédit** : un excédent de réduction d'impôt est perdu (sauf cas de crédit remboursable). Ne pas confondre avec le crédit d'impôt bonus à l'emploi (remboursable).
2. **Passer le seuil 1 050 € épargne-pension sans calculer** : le taux passe à 25 % sur tout le versement.
3. **Oublier le seuil minimum de 40 €** pour les dons : en dessous, zéro réduction.
4. **Frais garde enfant : enfant ≥ 14 ans** (non handicapé) : plus éligible — vérifier l'âge.
5. **ELT et taxe finale 10 %** : oublier cette taxe lors du rachat dans les simulations de rendement.
6. **Avantages régionaux variables** : les plafonds et conditions du chèque-habitat wallon ou des dispositifs bruxellois évoluent chaque année — vérifier sur Tax-on-web.

---

## Références CIR 92 / Fisconetplus

| Règle | Article CIR 92 |
|-------|---------------|
| Pensions alimentaires déductibles (80 %) | art. 104 |
| Épargne-pension — réduction 30/25 % | art. 145¹ |
| ELT — réduction 30 % | art. 145¹⁰ |
| Dons — réduction 45 % | art. 145³³ |
| Frais garde enfant — réduction 45 % | art. 145³⁴ |
| Sécurité habitation — réduction 50 % | art. 145³¹ bis |
| Bonus à l'emploi fiscal (crédit remboursable) | art. 289ter |
| Quotités exemptées enfants remboursables | art. 134 §2 |

Source : Fisconetplus.be — https://www.fisconetplus.be
SPF Finances (avantages fiscaux) : https://finances.belgium.be/fr/particuliers/avantages_fiscaux
Institutions agréées pour dons : https://finances.belgium.be/fr/particuliers/avantages_fiscaux/liberalites
