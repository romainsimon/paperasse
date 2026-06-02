# Formats de sortie

Conventions pour produire des livrables (PV, convocations, déclarations,
courriers) cohérents avec les usages administratifs français et avec le reste du
repo paperasse.

## Convention de dates

- **Données structurées** (JSON, noms de fichiers, journaux internes, frontmatter) :
  `YYYY-MM-DD`
- **Documents à destination des membres, dirigeants, administrations** (courriers,
  PV, convocations, déclarations, statuts) : `JJ/MM/AAAA`

Exemple : un PV daté du 15/06/2026 dans le corps du document, mais nommé
`pv-2026-06-15-ag-ordinaire.pdf` sur le système de fichiers.

## Convention de noms de fichiers

```
{type}-{YYYY-MM-DD}-{descriptif-court}.{ext}
```

Exemples :

- `pv-2026-06-15-ag-ordinaire.pdf`
- `convocation-2026-05-30-ag-ordinaire.pdf`
- `statuts-2026-06-15-v2.pdf`
- `recepisse-prefecture-2026-06-20-modification-statuts.pdf`
- `temoin-joafe-2026-07-05-modification-objet.pdf`

## Structure type d'un document

### En-tête

```
{Nom de l'association}
{Sigle si existant}
Association loi 1901 — RNA {W…}
{SIRET le cas échéant}
Siège social : {adresse complète}
```

### Pied de page

```
{Nom association} — RNA {W…} — Page {n/total}
```

### Identifiant document

En haut à droite : type + date + numéro d'ordre (si série) :

```
PV n° 2026-03 — AG ordinaire du 15/06/2026
```

## Structure type d'un PV

Voir [`../templates/pv-ag-ordinaire.md`](../templates/pv-ag-ordinaire.md) pour le
gabarit complet. Sections obligatoires :

1. En-tête (cf. ci-dessus) ;
2. Titre du PV ;
3. Convocation : date d'envoi, mode ;
4. Date, heure, lieu de la séance ;
5. Bureau de séance : président, secrétaire, scrutateurs ;
6. Quorum : présents + représentés / total + statut ;
7. Ordre du jour ;
8. Délibérations : pour chaque résolution, texte exact, vote détaillé, résultat ;
9. Clôture : heure de levée de séance ;
10. Signatures.

## Structure type d'une convocation

```
{En-tête}

Objet : Convocation à l'Assemblée Générale {ordinaire / extraordinaire} du {JJ/MM/AAAA}

{Madame, Monsieur,}

Conformément à l'article {X} des statuts de l'association, vous êtes convié·e à
l'Assemblée Générale {…} qui se tiendra :

— le {jour} {JJ/MM/AAAA} à {hh}h{mm},
— {adresse précise ou modalités de visioconférence},
— ordre du jour ci-après.

Ordre du jour :

1. {résolution 1}
2. {résolution 2}
3. {…}
4. Questions diverses

En cas d'empêchement, vous pouvez vous faire représenter par un autre membre à
jour de cotisation à l'aide du formulaire de pouvoir joint (limite : {N} pouvoirs
par membre).

Documents joints : rapports, projet de résolution, formulaire de pouvoir.

Le {JJ/MM/AAAA},
{Président·e en exercice}
```

## Structure type d'une déclaration de modification (papier)

CERFA 13972*03 + courrier d'accompagnement à la préfecture :

```
{En-tête association}

À l'attention de Monsieur le Préfet de {département}
{adresse préfecture}

{Ville}, le {JJ/MM/AAAA}

Objet : Déclaration de modification — Association {nom} (RNA {W…})

Madame, Monsieur le Préfet,

Conformément à l'article 5 de la loi du 1er juillet 1901, j'ai l'honneur de
porter à votre connaissance les modifications suivantes intervenues dans le
fonctionnement de notre association :

{nature de la modification — exemple : modification de l'objet, changement de
président, transfert de siège}

Sont joints à la présente :

— le formulaire CERFA 13972*03 renseigné et signé ;
— le procès-verbal de l'AG{E} du {JJ/MM/AAAA} actant la décision ;
{— les nouveaux statuts datés et signés (pour modification statutaire) ;}

Je vous prie d'agréer, Madame, Monsieur le Préfet, l'expression de ma considération
distinguée.

{Signature}
{Nom Prénom du signataire}
{Fonction}
```

## Format JSON interne (journal du secrétariat)

```json
{
  "version": 1,
  "association_rna": "W751234567",
  "evenements": [
    {
      "date": "2026-06-15",
      "type": "ag-ordinaire",
      "decisions": [
        {"resolution": "approbation comptes 2025", "vote": {"pour": 87, "contre": 2, "abstention": 5}, "resultat": "adoptee"},
        {"resolution": "election bureau", "vote": {"pour": 92, "contre": 0, "abstention": 2}, "resultat": "adoptee"}
      ],
      "documents": ["pv-2026-06-15-ag-ordinaire.pdf"]
    },
    {
      "date": "2026-06-20",
      "type": "declaration-prefecture",
      "objet": "Renouvellement du bureau",
      "voie": "le-compte-asso",
      "recepisse": "recepisse-2026-06-20-modification-dirigeants.pdf"
    }
  ]
}
```

Ce JSON peut alimenter automatiquement un rapport d'activité annuel et tracer
les délais de 3 mois.

## Format de réponse vers l'utilisateur

Suivre la structure standard de [`../SKILL.md`](../SKILL.md) section « Répondre »
(Faits / Cadre juridique / Analyse / Calculs-délais / Risques / Actions).

Pour les questions courtes (« est-ce que je dois publier au JOAFE pour un
changement de trésorier ? ») : réponse en 2-4 phrases, citation de l'article,
action concrète. Pas besoin de remplir toutes les sections.

Pour les questions complexes (mémoire d'AG, dissolution, contentieux) : structure
complète, plusieurs niveaux de risque, recommandation expresse d'un professionnel
si pertinent.
