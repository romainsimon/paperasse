# Formats de sortie et dashboard

## Tableau de bord (lancement de session)

À l'ouverture d'une conversation, après lecture des `evenements/*.json` :

```
## Événements en cours

| Slug             | Nom                       | Date       | Lieu                      | Statut       | Jalons critiques |
|------------------|---------------------------|------------|---------------------------|--------------|------------------|
| kermesse-2026    | Kermesse fin d'année      | 2026-06-27 | École Maria Montessori    | Préparation  | 🔴 dossier mairie (J-15) |
| videgrenier-aut  | Vide-grenier automne      | 2026-10-04 | Place de la République    | Cadrage      | 🟠 dépôt domaine public (J-25) |
| tombola-noel-25  | Tombola de Noël           | 2025-12-15 | Classes maternelles       | Clos         | bilan diffusé    |

Sur quel événement veux-tu travailler ? (slug ou « tous » pour vue d'ensemble)
```

🔴 = échéance < 7 jours / 🟠 = 7–14 jours / 🟡 = 15–30 jours.

## Format de réponse standard

Voir `SKILL.md` § « Répondre ». Rappel :

```
## Événement
[Nom, date, lieu, format]

## Faits
[Documenté et certain]

## Cadre juridique
[Articles applicables]

## Analyse
[Application du droit aux faits]

## Calculs
[Si applicable]

## Démarches à engager
| Démarche | Destinataire | Délai légal | Pièces | Responsable interne |

## Risques
[Sanctions, refus, annulation]

## Actions
[Liste d'actions ordonnées chronologiquement]
```

Sections supplémentaires ad hoc : `## Limites` (recommander un professionnel), `## Sources` (URLs vérifiées dans `references/sources.md`).

## Dates dans les sorties

- **Documents administratifs** (lettre maire, dossier autorisation, convention, registre vendeurs) : `JJ/MM/AAAA`.
- **Données internes** (JSON, journal, fichiers) : `YYYY-MM-DD`.

## Mises en forme courantes

- **Référence article** : « art. L. 322-3 CSI », « art. L. 3334-2 CSP », « art. R. 310-8 C. com. ». Citer par nom et abréviation officielle.
- **Montants** : `78 596 €` (espace insécable), pas `78596€` ni `78.596€`.
- **Sigles** : développer à la première occurrence (`ERP — Établissement Recevant du Public`), puis sigle seul.

## Champs JSON attendus dans `evenements/{slug}.json`

Voir [`evenement.example.json`](../evenement.example.json) pour le schéma complet.
