# Formes Juridiques des Sociétés en Belgique

`last_updated: 2026-05-15`

Base légale : **Code des Sociétés et des Associations (CSA)**, loi du 23 mars 2019. Administration : **Banque-Carrefour des Entreprises (BCE)** — numéro d'entreprise format `0xxx.xxx.xxx`.

## Tableau Comparatif

| Critère | SRL | SA | SNC | SCS | SC (coopérative) |
|---------|-----|----|-----|-----|-----------------|
| Associés | 1+ | 1+ | 2+ | 2+ (1 commandité, 1+ commanditaires) | 3+ |
| Capital minimum | Aucun* | **61 500 €** | Aucun | Aucun | Aucun* |
| Responsabilité | Limitée aux apports | Limitée aux apports | Illimitée et solidaire | Commandités : illimitée / Commanditaires : limitée | Limitée aux apports |
| Imposition défaut | ISOC | ISOC | IPP (transparence) ou ISOC | IPP ou ISOC | ISOC |
| Dirigeant | Gérant | Administrateur / CEO | Gérant(s) | Gérant(s) (commandités) | Administrateur |
| Régime social dirigeant | Indépendant (INASTI) | Indépendant (INASTI) sauf dirigeant salarié | Indépendant | Indépendant | Indépendant |

*SRL et SC : capital minimal librement fixé par les fondateurs, mais soumis au test d'adéquation des fonds propres (plan financier).

---

## SRL (Société à Responsabilité Limitée)

### Caractéristiques

- Forme juridique la plus utilisée par les PME belges depuis le CSA 2019
- Remplace l'ancienne SPRL (Société Privée à Responsabilité Limitée)
- **Pas de capital minimum** : les fondateurs fixent librement le capital, mais doivent établir un plan financier démontrant l'adéquation des fonds propres (art. 5:4 CSA)
- Parts sociales non librement cessibles sans agrément des associés
- Responsabilité limitée aux apports
- Personnalité morale distincte

### Constitution

- **Acte constitutif** : notarié ou sous seing privé (avec apports en numéraire uniquement pour l'acte sous seing privé)
- **Plan financier** : obligatoire, remis au notaire — engage la responsabilité des fondateurs pendant 3 ans en cas de faillite
- **Dépôt au greffe du TRE** (Tribunal de l'Entreprise) via la BCE
- **Numéro BCE** : attribué lors de l'enregistrement (format `0xxx.xxx.xxx`)

### Activation TVA

Demande d'assujettissement à la TVA via le formulaire **604A** (ou formulaire **604B** pour une entreprise existante) auprès du Centre de Contrôle TVA compétent, ou via l'intermédiaire d'un guichet d'entreprises agréé.

### Régime Fiscal

- **Défaut :** ISOC (Impôt des Sociétés)
- Taux réduit 20% possible si conditions remplies (art. 215 al. 2 CIR 92)

### Dirigeant (Gérant)

- Toujours statut d'**indépendant** (INASTI)
- Rémunération déductible à l'ISOC si justifiée
- Pas de cotisations ONSS (régime indépendant — INASTI)

### Écritures Courantes

**Rémunération gérant :**
```
  Débit 622 Rémunérations dirigeants    X XXX,XX
  Crédit 452 Précompte prof. à verser     XXX,XX
  Crédit 454 Rémunérations à payer     X XXX,XX
```

**Distribution dividendes :**
```
Décision AG :
  Débit 14 Bénéfice reporté            X XXX,XX
  Crédit 489 Dividendes à payer        X XXX,XX

Paiement (après PM 30%) :
  Débit 489 Dividendes à payer         X XXX,XX
  Crédit 453 Précompte mobilier          XXX,XX
  Crédit 550 Banque                    X XXX,XX
```

---

## SA (Société Anonyme)

### Caractéristiques

- Adaptée aux structures plus grandes, aux levées de fonds et à l'accueil d'investisseurs
- **Capital minimum : 61 500 €** entièrement souscrit, libéré à 25% minimum lors de la constitution
- Actions librement cessibles (sauf clause)
- Personnalité morale distincte

### Constitution

- **Acte notarié obligatoire**
- Plan financier obligatoire
- Enregistrement BCE, dépôt au greffe du TRE

### Gouvernance

- **Conseil d'administration** (minimum 3 membres, ou 1 si actionnaire unique) OU **Administrateur unique**
- Système moniste ou dualiste (conseil de surveillance + directoire)

### Régime Social du Dirigeant

- Administrateurs : statut indépendant (INASTI) sur leurs jetons de présence et rémunérations de mandat
- Directeur salarié : possible (contrat de travail + cotisations ONSS)

---

## SNC (Société en Nom Collectif)

### Caractéristiques

- Tous les associés sont commerçants
- Responsabilité illimitée et solidaire : les associés répondent sur leur patrimoine personnel
- Parts non librement cessibles
- Pas de capital minimum

### Régime Fiscal

- **Par défaut :** Transparence fiscale — les bénéfices sont imposés à l'IPP des associés
- **Option ISOC** possible (irrévocable)

---

## SCS (Société en Commandite Simple)

### Caractéristiques

- Deux catégories d'associés :
  - **Commandités** : responsabilité illimitée et solidaire, gèrent la société
  - **Commanditaires** : responsabilité limitée aux apports, pas de gestion
- Utile pour les structures avec investisseurs passifs

---

## SC (Société Coopérative)

### Caractéristiques

- Minimum **3 associés**
- Finalité sociale ou économique collective
- Possibilité d'agrément comme **entreprise sociale agréée (ESA)**
- Responsabilité limitée aux apports

---

## Banque-Carrefour des Entreprises (BCE)

### Rôle de la BCE

La BCE remplace le SIREN/SIRET/RCS français. Elle attribue à chaque entité juridique un **numéro d'entreprise unique** au format `0xxx.xxx.xxx`.

| Concept français | Équivalent belge |
|-----------------|-----------------|
| SIREN | Numéro BCE (9 chiffres, format 0xxx.xxx.xxx) |
| SIRET | Numéro d'unité d'établissement BCE (même numéro + suffixe) |
| Extrait Kbis | **Extrait BCE** (téléchargeable sur https://kbopub.economie.fgov.be) |
| RCS (Registre Commerce) | Registre BCE + dépôt au greffe TRE |
| INPI | BCE (guichets d'entreprises agréés) |

**Consultation publique BCE :** https://kbopub.economie.fgov.be (informations légales, statuts, comptes annuels)

---

## Compte Courant d'Associé (456)

### Définition

Sommes mises à disposition de la société par les associés ou gérants :
- Avances de fonds
- Rémunérations non prélevées
- Remboursement de frais professionnels en attente

### Règles Fiscales

**Intérêts versés :**
- Déductibles à l'ISOC dans la limite du taux du marché
- Au-delà → avantage anormal et bénévole (art. 79 CIR 92)

**Convention recommandée** : convention de compte courant définissant le taux d'intérêt, les conditions de remboursement.

### Écritures

**Apport en compte courant :**
```
  Débit 550 Banque                      X XXX,XX
  Crédit 456 Compte courant associé     X XXX,XX
```

**Remboursement :**
```
  Débit 456 Compte courant associé      X XXX,XX
  Crédit 550 Banque                     X XXX,XX
```

**Intérêts courus :**
```
  Débit 650 Charges d'intérêts            XXX,XX
  Crédit 456 Compte courant associé       XXX,XX
```

---

## Capital Social

### Apports (SRL sans capital minimum)

| Type | Contrepartie | Libération |
|------|--------------|------------|
| Numéraire | Parts sociales | Librement fixée (minimum légal prudentiel selon plan financier) |
| Nature | Parts sociales | 100% immédiate + rapport de réviseur si > 6 200 € |
| Industrie | Possible dans SRL (art. 5:39 CSA) | Droits de vote, pas de valeur bilan |

### Écritures de Constitution

**Promesse d'apport :**
```
  Débit 416 Créances s/ associés        XX XXX,XX
  Crédit 100 Capital souscrit           XX XXX,XX
```

**Libération :**
```
  Débit 550 Banque                      XX XXX,XX
  Crédit 416 Créances s/ associés       XX XXX,XX
```

---

## Affectation du Résultat (Belgique)

### Ordre d'affectation (SRL)

1. **Réserve légale** : 5% du bénéfice jusqu'à 10% du capital souscrit (art. 5:190 CSA)
2. **Réserves statutaires** (si prévues)
3. **Dividendes** (après test de liquidité et solvabilité — art. 5:142 CSA)
4. **Report à nouveau**

### Test Double Bilan (distribution en SRL)

Avant toute distribution, les gérants vérifient :
1. **Test du bilan** : l'actif net ne peut devenir inférieur aux réserves indisponibles
2. **Test de liquidité** : la société peut continuer à payer ses dettes dans les 12 mois suivants

### Écriture Type

```
Affectation bénéfice (compte 14) :
  Débit 14 Bénéfice reporté            XX XXX,XX
  Crédit 130 Réserve légale             X XXX,XX
  Crédit 489 Dividendes à payer         X XXX,XX
  Crédit 14 Report à nouveau            X XXX,XX
```

---

## Obligations Légales par Forme

### SRL

- Approbation des comptes en AG (6 mois après clôture)
- Dépôt des comptes annuels à la **Centrale des Bilans BNB** (https://cri.nbb.be) dans les 7 mois après clôture
- PV d'AG (décision de l'associé unique ou procès-verbal d'AG)
- Rapport de gestion si grande entreprise

### SA

- Même obligations que SRL
- Rapport de rémunération si cotée ou grande entreprise

**Seuils petite société (schéma abrégé, art. 1:24 CSA) :**
- Total bilan ≤ 4 500 000 €
- CA net ≤ 9 000 000 €
- Effectif ≤ 50 (moyens annuels)

2 critères sur 3 dépassés → grande société → schéma complet.

### Dépôt BCE — Extrait

L'extrait BCE (équivalent belge du Kbis) est téléchargeable gratuitement sur https://kbopub.economie.fgov.be et comporte : numéro d'entreprise, dénomination, forme juridique, siège, date de constitution, objet social, dirigeants.
