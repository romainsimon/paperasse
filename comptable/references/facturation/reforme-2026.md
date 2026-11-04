# Réforme de la Facturation Électronique 2026

## Textes de référence

- Loi n° 2022-1726 du 30 décembre 2022 (loi de finances 2023)
- Loi n° 2023-1322 du 29 décembre 2023 (report de calendrier)
- Ordonnance n° 2021-1190 du 15 septembre 2021
- Décret n° 2022-1299 du 7 octobre 2022
- Article 289 bis du Code général des impôts

## Calendrier

### Phase 1 : 1er septembre 2026

| Obligation | Qui |
|-----------|-----|
| **Réception** de factures électroniques | **Toutes** les entreprises assujetties TVA |
| **Émission** de factures électroniques | Grandes entreprises (GE) et ETI |
| **E-reporting** | GE et ETI |

### Phase 2 : 1er septembre 2027

| Obligation | Qui |
|-----------|-----|
| **Émission** de factures électroniques | PME et micro-entreprises |
| **E-reporting** | PME et micro-entreprises |

### Déterminer la taille de l'entreprise

Critères cumulatifs (2 sur 3 dépassés pendant 2 exercices consécutifs) :

| Catégorie | Effectif | CA (HT) | Total bilan |
|-----------|----------|---------|-------------|
| Micro-entreprise | < 10 | < 900 000 EUR | < 450 000 EUR |
| PME | < 250 | < 50 M EUR | < 43 M EUR |
| ETI | < 5 000 | < 1 500 M EUR | < 2 000 M EUR |
| Grande entreprise | >= 5 000 | >= 1 500 M EUR | >= 2 000 M EUR |

**En pratique** : la grande majorité des utilisateurs de Paperasse sont des TPE/PME/micro. Échéance émission = **1er septembre 2027**. Échéance réception = **1er septembre 2026**.

## Qui est concerné

**Toutes les entreprises assujetties à la TVA établies en France**, y compris :
- Les entreprises en **franchise en base de TVA** (art. 293 B du CGI) : elles sont assujetties, elles ne collectent simplement pas
- Les auto-entrepreneurs
- Les entreprises individuelles
- Les sociétés (SASU, SAS, SARL, EURL, SA, SCI, etc.)

### Opérations concernées

- Livraisons de biens entre assujettis en France
- Prestations de services entre assujettis en France
- Acomptes liés à ces opérations

### Opérations exclues

- Prestations de santé (art. 261, 4° du CGI)
- Enseignement (art. 261, 4° du CGI)
- Opérations immobilières exonérées
- Opérations bancaires et d'assurance (art. 261 C du CGI)
- Activités associatives exonérées

### Territoires concernés

| Territoire | TVA applicable | E-facturation |
|-----------|---------------|---------------|
| France métropolitaine | Oui | Oui |
| Guadeloupe, Martinique, Réunion | Oui (taux spécifiques) | Oui |
| Guyane, Mayotte | Non | Non |
| Saint-Pierre-et-Miquelon, Saint-Barthélemy, Saint-Martin | Non | Non |
| Nouvelle-Calédonie, Polynésie française | Non | Non |

## Architecture du système

### Les trois acteurs

```
Entreprise A ──→ PA émettrice ──→ PA réceptrice ──→ Entreprise B
                      │                  │
                      └──────┬───────────┘
                             ▼
                      PPF (annuaire +
                      concentrateur)
                             │
                             ▼
                         DGFiP
```

### Portail Public de Facturation (PPF)

Le PPF devait initialement servir de plateforme d'émission/réception gratuite pour tous. **Ce rôle a été abandonné en octobre 2024.** Le PPF ne sert plus qu'à :

1. **Annuaire central** : identifie la PA de chaque entreprise pour le routage
2. **Concentrateur fiscal** : collecte les données de facturation, transaction et paiement transmises par les PA, et les relaie à la DGFiP

**Les entreprises ne peuvent pas utiliser le PPF pour émettre ou recevoir des factures.**

### Plateformes Agréées (PA, anciennement PDP)

Les PA sont des opérateurs privés immatriculés par la DGFiP. Elles assurent :
- L'émission et la réception des factures électroniques
- L'extraction et la transmission des données à l'administration (via le PPF)
- La conformité des formats (Factur-X, UBL, CII)
- Le suivi des statuts de traitement des factures

**Toute entreprise doit choisir une PA** pour émettre et recevoir des factures électroniques. Voir [plateformes-agreees.md](plateformes-agreees.md) pour le comparatif.

### PEPPOL

Réseau européen d'interopérabilité entre PA. La DGFiP est l'Autorité PEPPOL France. 74 prestataires français connectés (déc. 2025). PEPPOL n'est pas obligatoire pour les PA (elles peuvent s'interconnecter par conventions bilatérales), mais il facilite l'interopérabilité, notamment pour les échanges intra-UE.

## Nouvelles mentions obligatoires (à partir de sept. 2026)

En plus des mentions existantes (voir [mentions-obligatoires.md](mentions-obligatoires.md)), les factures devront comporter :

| Mention | Détail |
|---------|--------|
| **SIREN du client** | Obligatoire pour les transactions B2B domestiques |
| **Catégorie d'opération** | Livraison de biens / prestation de services / mixte |
| **Adresse de livraison** | Si différente de l'adresse de facturation |
| **Option pour les débits** | Si TVA exigible à la facturation (et non à l'encaissement) |

## Conservation

Les factures électroniques doivent être conservées **6 ans** à compter de la date d'établissement, **en format informatique** (pas de simple impression papier). Un cachet électronique qualifié est recommandé pour authentifier l'origine et garantir l'intégrité.

## Sanctions

Le non-respect des obligations de facturation électronique expose à :
- **Amende de 50 EUR par facture** non émise au format électronique, plafond 15 000 EUR par année civile (art. 1737, III CGI, version en vigueur au 21/02/2026)
- **Amende de 500 EUR par transmission** manquante en e-reporting, plafond 15 000 EUR par année civile (art. 1788 D, I et II CGI)
- **Plateforme agréée défaillante** : 750 EUR par transmission, plafond 100 000 EUR par année civile (art. 1788 D, III et IV CGI)
- **Plateforme agréée, transmission des données de facturation** (art. 289 E) : amende de 50 EUR par facture, plafond 45 000 EUR par année civile (art. 1737, IV CGI, version en vigueur au 21/02/2026)
- À surveiller : au 01/01/2027, les art. 1737 et 1788 D ne sont pas abrogés mais modifiés (ordonnance n° 2025-1247 du 17/12/2025, ordonnance n° 2026-671 du 27/07/2026, art. 2) pour renvoyer aux articles du CIBS issus de la recodification de la TVA ; revérifier les renvois avant toute citation en 2027.
- **Tolérance première infraction** : pas d'amende (émission, e-reporting) pour la première infraction de l'année en cours et des trois précédentes, si régularisation spontanée ou dans les 30 jours d'une première demande de l'administration
- **Défaut de plateforme agréée pour la réception** : amende de 500 EUR si l'entreprise n'a pas choisi de plateforme dans les trois mois suivant une mise en demeure de l'administration, puis 1 000 EUR par nouvelle période de trois mois sans régularisation (art. 1737, IV bis CGI ; FAQ impots.gouv.fr « J'approfondis la facturation électronique », version du 01/09/2026, question 2.5)
- **Phase de démarrage** : la DGFiP annonce ne pas appliquer les sanctions aux entreprises en difficulté mais engagées dans une trajectoire sérieuse et documentée de mise en conformité ; ce n'est ni un report ni une suspension de l'obligation (guide pratique DGFiP de démarrage au 1er septembre 2026, p. 2 et question 29 : https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/guide_pratique_facturation_electronique.pdf)
- Sanctions fiscales classiques en cas de défaut de facturation (50% du montant de la transaction, art. 1737 du CGI)
