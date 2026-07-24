# Workflow de Donation

Guide d'exécution complet pour la préparation et la réalisation d'une donation.

---

## Vue d'ensemble

```
Phase 1 : Préparation (1-4 semaines)
  1. Définition des objectifs et conseil
  2. Choix de la forme de donation
  3. Évaluation des biens
  4. Vérification des donations antérieures (rappel fiscal 15 ans)

Phase 2 : Rédaction (1-2 semaines)
  5. Rédaction de l'acte de donation
  6. Calcul des droits de donation
  7. Choix du paiement des droits (donateur ou donataire)

Phase 3 : Signature et formalités (1-4 semaines)
  8. Signature de l'acte
  9. Publicité foncière (si immeuble)
  10. Déclaration fiscale et paiement des droits
```

---

## Phase 1 : Préparation (1-4 semaines)

### Étape 1 : Définition des objectifs et conseil

**Questions à poser au donateur :**

1. **Quel est l'objectif ?**
   - Transmission anticipée (aider un enfant à acheter, financer des études)
   - Optimisation fiscale (utiliser les abattements tous les 15 ans)
   - Protection du conjoint (donation entre époux)
   - Organisation de la succession (donation-partage pour éviter les conflits)
   - Aide à la création d'entreprise (Pacte Dutreil)

2. **Quel est le patrimoine global du donateur ?**
   - S'assurer qu'il conserve assez pour vivre (obligation alimentaire, art. 205 C. civ.)
   - Vérifier la quotité disponible (ne pas empiéter sur la réserve héréditaire)

3. **Quels sont les donataires envisagés ?**
   - Enfants (abattement 100 000 EUR)
   - Petits-enfants (abattement 31 865 EUR)
   - Conjoint/partenaire PACS (abattement 80 724 EUR)
   - Tiers (abattement 1 594 EUR, taux 60%)

4. **Le donateur veut-il conserver un droit sur le bien ?**
   - Donation en pleine propriété : transfert total
   - Donation avec réserve d'usufruit : le donateur conserve l'usage et les revenus
   - Donation avec clause de retour : le bien revient au donateur si le donataire décède avant lui

### Étape 2 : Choix de la forme de donation

| Forme | Quand l'utiliser | Acte notarié | Base légale |
|-------|------------------|:------------:|-------------|
| **Donation simple** | Un donateur, un donataire, un ou plusieurs biens | Oui (si immeuble) | Art. 931 C. civ. |
| **Donation-partage** | Un donateur, plusieurs donataires (enfants), répartition définitive | Oui | Art. 1075 à 1080 C. civ. |
| **Donation entre époux** | Protection du conjoint survivant | Oui | Art. 1091 à 1099-1 C. civ. |
| **Donation en démembrement** | Transmission avec conservation de l'usufruit | Oui | Art. 578 et 669 CGI |
| **Don manuel** | Somme d'argent, meubles, valeurs mobilières (remise matérielle) | Non | Jurisprudence |
| **Don familial de sommes d'argent** | Somme d'argent, ligne directe, donateur < 80 ans | Non | Art. 790 G CGI |
| **Pacte Dutreil** | Transmission d'entreprise (75% d'exonération) | Oui | Art. 787 B et 787 C CGI |

**Donation simple vs donation-partage :**

| | Donation simple | Donation-partage |
|--|----------------|-----------------|
| Nombre de donataires | 1 ou plusieurs | Obligatoirement plusieurs (tous les héritiers présomptifs) |
| Évaluation au partage | Valeur au jour du **décès** du donateur | Valeur au jour de la **donation** |
| Rapport à succession | Oui (sauf hors part) | Non (partage définitif) |
| Avantage | Simplicité | Fixe la valeur, évite les contestations |
| Risque | Réévaluation défavorable au décès | Tous les enfants doivent participer |

### Étape 3 : Évaluation des biens

**Somme d'argent** : valeur nominale.

**Bien immobilier** : valeur vénale au jour de la donation.

```bash
# Chercher des comparables DVF
python scripts/fetch_notaire_data.py geocode "ADRESSE"
python scripts/fetch_notaire_data.py dvf --code-insee XXXXX --limit 20
```

Méthodes d'évaluation :
- Comparaison avec les transactions DVF récentes
- Estimation par un agent immobilier
- Expertise par un expert immobilier (recommandé pour les biens > 200 000 EUR)

**Valeurs mobilières** : cours de bourse au jour de la donation (ou estimation pour les titres non cotés).

**Parts de SCI** : valeur vénale = (actif net réévalué de la SCI) x (% de parts), avec une éventuelle décote d'illiquidité (10-20%).

**En cas de démembrement** (barème art. 669 CGI) :

| Âge du donateur | Usufruit | Nue-propriété |
|-----------------|----------|---------------|
| < 21 ans | 90% | 10% |
| 21-30 ans | 80% | 20% |
| 31-40 ans | 70% | 30% |
| 41-50 ans | 60% | 40% |
| 51-60 ans | 50% | 50% |
| 61-70 ans | 40% | 60% |
| 71-80 ans | 30% | 70% |
| 81-90 ans | 20% | 80% |
| 91 ans et + | 10% | 90% |

**Piège** : plus le donateur est jeune, plus l'usufruit est cher (et donc la nue-propriété est faible). Le moment optimal pour donner la nue-propriété est quand le donateur a 60-70 ans.

### Étape 4 : Vérification des donations antérieures

**Rappel fiscal de 15 ans** (art. 784 CGI) :

Toutes les donations consenties par le même donateur au même donataire au cours des **15 années précédentes** sont rappelées pour le calcul des droits.

**Ce que cela signifie concrètement :**
- Les abattements se reconstituent tous les 15 ans
- Exemple : un parent donne 100 000 EUR à son enfant en 2010. En 2025 (15 ans après), l'abattement de 100 000 EUR est de nouveau disponible.
- Si une donation de 50 000 EUR a été faite il y a 8 ans, il reste 50 000 EUR d'abattement disponible.

**Vérification obligatoire :**
- Interroger le donateur sur toutes les donations antérieures
- Vérifier au FCDDV (pour les donations notariées)
- Vérifier les formulaires 2735 déposés (dons manuels)

---

## Phase 2 : Rédaction (1-2 semaines)

### Étape 5 : Rédaction de l'acte de donation

**Templates disponibles :**
- [templates/donation-simple.md](../templates/donation-simple.md) — Donation simple
- [templates/donation-entre-epoux.md](../templates/donation-entre-epoux.md) — Donation au dernier vivant

**Clauses importantes à discuter avec le donateur :**

| Clause | Effet | Recommandation |
|--------|-------|----------------|
| **Réserve d'usufruit** | Le donateur conserve l'usage et les revenus | Standard pour les immeubles |
| **Clause de retour conventionnel** | Le bien revient au donateur si le donataire décède avant lui | Recommandé pour les donations à un enfant |
| **Interdiction d'aliéner** | Le donataire ne peut pas vendre le bien | Doit être limitée dans le temps et justifiée |
| **Clause d'exclusion de communauté** | Le bien donné reste propre au donataire en cas de divorce | Très recommandé |
| **Clause d'inaliénabilité** | Le bien ne peut pas être saisi par les créanciers du donataire | Limitée dans le temps |
| **Rapport / Hors part** | Avancement de part (rapportable) ou hors part (sur la QD) | Par défaut rapportable. Hors part si le donateur veut avantager un héritier |

### Étape 6 : Calcul des droits de donation

**Calcul :**

```
Valeur des biens donnés
- Abattement applicable (selon le lien de parenté)
= Base taxable
x Barème progressif (selon le lien de parenté)
= Droits de donation
```

Voir [references/donation.md](donation.md) pour les barèmes complets.

**Abattements principaux (rappel) :**

| Lien | Abattement | Renouvellement |
|------|:----------:|:--------------:|
| Parent → enfant | 100 000 EUR | 15 ans |
| Grand-parent → petit-enfant | 31 865 EUR | 15 ans |
| Époux / partenaire PACS | 80 724 EUR | 15 ans |
| Frère / soeur | 15 932 EUR | 15 ans |
| Neveu / nièce | 7 967 EUR | 15 ans |
| Don familial de sommes d'argent | 31 865 EUR (cumulable) | 15 ans |
| Handicapé | 159 325 EUR (cumulable) | 15 ans |

### Étape 7 : Prise en charge des droits

**Qui paie les droits ?**

- Par défaut : le **donataire** paie les droits
- Le **donateur** peut prendre en charge les droits (prise en charge des droits). Dans ce cas, la prise en charge n'est **pas** considérée comme une donation supplémentaire (art. 1712 CGI).

**Avantage de la prise en charge par le donateur** : le donataire reçoit le bien net de droits, le coût réel pour le donateur est plus élevé mais les droits ne s'appliquent pas sur les droits.

---

## Phase 3 : Signature et formalités (1-4 semaines)

### Étape 8 : Signature de l'acte

**Acte notarié obligatoire pour :**
- Toute donation portant sur un **bien immobilier** (art. 931 C. civ.)
- Toute **donation-partage** (art. 1075 C. civ.)
- Toute donation avec **réserve d'usufruit**

**Pas d'acte notarié nécessaire pour :**
- Le **don manuel** (somme d'argent, meubles, valeurs mobilières remis de la main à la main)
- Le **don familial de sommes d'argent** (art. 790 G CGI)

**Lors de la signature :**
- Présence du donateur et du donataire (ou de leurs représentants)
- Si le donataire est mineur : présence des deux parents ou du tuteur
- L'acceptation du donataire doit être expresse (art. 932 C. civ.)
- Si le donateur est marié sous le régime de la communauté : consentement du conjoint nécessaire pour les biens communs

### Étape 9 : Publicité foncière (si immeuble)

**Obligatoire** pour toute donation portant sur un bien immobilier.

Le notaire publie l'acte au **Service de Publicité Foncière (SPF)** dans les 2 mois suivant la signature.

**Coût** :
- CSI (contribution de sécurité immobilière) : 0,10% de la valeur du bien
- Taxe de publicité foncière : variable selon le type de donation

### Étape 10 : Déclaration fiscale et paiement des droits

**Donation notariée** :
- Le notaire se charge de la déclaration et du paiement des droits
- Formulaire 2676 déposé au SIE (Service des Impôts des Entreprises)
- Droits payables au moment du dépôt

**Don manuel ou don familial** :
- Le donataire doit déclarer dans le mois suivant la révélation du don
- Formulaire **2735** (cerfa n°11278) à déposer au SIE du domicile du donataire
- Ou formulaire **2734** pour les dons > 15 000 EUR avec option pour le paiement différé

**Paiement fractionné** (art. 1717 CGI) :
- Possible si les droits > 5 000 EUR
- 3 versements semestriels (ou 10 si > 50% immeubles)
- Intérêts au taux légal

---

## Cas Spéciaux

### Donation et résidence principale

La donation de la résidence principale ne bénéficie d'**aucun abattement spécifique**. Seuls les abattements liés au lien de parenté s'appliquent.

Si le donateur se réserve l'usufruit, il conserve le droit d'habiter le logement.

### Donation et SCI

Donner des parts de SCI plutôt que l'immeuble directement permet :
- D'appliquer une **décote d'illiquidité** (10-20% sur la valeur des parts)
- De fractionner la transmission (donner par tranches de 100 000 EUR tous les 15 ans)
- De conserver le contrôle via la gérance (même avec des parts minoritaires)

### Pacte Dutreil (transmission d'entreprise)

**Exonération de 75%** de la valeur des parts ou de l'entreprise (art. 787 B et 787 C CGI).

**Conditions :**
1. Engagement collectif de conservation des titres (2 ans minimum)
2. Engagement individuel de conservation par le donataire (4 ans après la fin de l'engagement collectif)
3. Exercice d'une fonction de direction par un des signataires pendant l'engagement collectif et les 3 ans suivants

**Calcul :** droits calculés sur 25% de la valeur seulement, avec réduction de 50% si le donateur a moins de 70 ans.

### Don manuel et don familial : formalités

**Don manuel** (art. 757 CGI) :
- Remise matérielle d'un bien meuble (argent, chèque, virement, bijoux, meubles, titres)
- Déclaration sur formulaire 2735 dans le mois suivant la révélation
- Mêmes abattements et barème que la donation notariée

**Don familial de sommes d'argent** (art. 790 G CGI) :
- Abattement spécifique de **31 865 EUR** (cumulable avec l'abattement classique)
- Conditions : donateur < 80 ans, donataire majeur, en ligne directe (ou neveu/nièce)
- Déclaration sur formulaire 2735
- Exemple : un parent de 65 ans peut donner 131 865 EUR à un enfant majeur en franchise de droits (100 000 + 31 865)

### Donation et divorce

Si le donataire divorce après la donation :
- Bien propre (séparation de biens ou clause d'exclusion de communauté) : le bien reste au donataire
- Bien commun (communauté sans clause d'exclusion) : le bien entre dans la communauté et sera partagé

**Recommandation systématique** : insérer une **clause d'exclusion de communauté** dans l'acte de donation.

---

## Délais récapitulatifs

| Action | Délai | Conséquence du retard |
|--------|-------|-----------------------|
| Déclaration don manuel (formulaire 2735) | 1 mois après révélation | Pénalités de retard |
| Publication au SPF (si immeuble) | 2 mois après signature | Inopposabilité aux tiers |
| Paiement des droits | Au moment du dépôt | Intérêts 0,2%/mois |
| Rappel fiscal | 15 ans | L'abattement se reconstitue |

---

⚠️ **CE DOCUMENT EST UN GUIDE DE TRAVAIL.**
Il ne constitue pas un conseil juridique personnalisé. Chaque situation patrimoniale est unique. Consulter un notaire pour toute donation, en particulier si elle porte sur un bien immobilier, si elle implique un démembrement, ou si le donateur a des héritiers réservataires.
