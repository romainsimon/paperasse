# Journal de Gestion

## Pourquoi

Le journal de gestion est le registre chronologique de toutes les actions du syndic. Il sert de :
- **Preuve** en cas de litige (dates d'envoi, relances, décisions)
- **Mémoire** pour le conseil syndical et le successeur
- **Traçabilité** pour les copropriétaires (transparence)

Aucun logiciel de syndic ne le fait bien. Un fichier markdown par année est plus fiable et plus durable.

## Structure

```
journal/
├── 2025.md
├── 2026.md
└── 2027.md
```

Un fichier par année. Classé par mois, du plus ancien au plus récent dans chaque fichier.

## Format

```markdown
# Journal de gestion — 2026

## Janvier

- **2026-01-02** : Envoi appel de fonds T1 (24 copropriétaires, total 7 350 EUR)
- **2026-01-15** : Réception facture Mellano (nettoyage janvier, 395,47 EUR)
- **2026-01-20** : Relance amiable lot 7 (impayé 1 400 EUR, email)

## Février

- **2026-02-03** : Réception devis Giordano espaces verts 2026 (2 100 EUR/an)
- **2026-02-10** : Appel DEM Énergie (panne chaufferie, intervention prévue 12/02)
- **2026-02-12** : Intervention DEM Énergie (remplacement vanne, 280 EUR)
```

**Format de date** : toujours `YYYY-MM-DD` dans le journal (tri chronologique, pas d'ambiguïté). Dans les documents destinés aux copropriétaires (courriers, convocations), utiliser le format français `JJ/MM/YYYY`.

## Quoi logger

| Action | Exemple |
|--------|---------|
| Envoi de courrier (email, LRAR) | Envoi LRAR mise en demeure lot 7 (n° suivi 1A XXX) |
| Réception de document | Réception AR LRAR convocation AG (lot 12, signé 15/03) |
| Appel téléphonique | Appel Veolia (contestation facture, interlocuteur M. Dupont) |
| Paiement effectué | Règlement facture Mellano février (395,47 EUR, virement) |
| Paiement reçu | Paiement lot 7 reçu (1 400 EUR, virement, solde impayé) |
| Devis reçu | Réception devis ravalement ABC Façades (42 000 EUR) |
| Décision | Décision conseil syndical : mise en concurrence assurance |
| Sinistre | DDE lot 8 vers lot 4, déclaration assureur envoyée |
| Intervention | Intervention plombier Y2A (fuite palier 2e, 180 EUR) |
| AG / Réunion | AG annuelle tenue (18 présents/représentés sur 24) |
| Contrat | Signature contrat nettoyage Propnet (début 01/07) |
| Relance | Relance amiable lot 14 (impayé T3, 350 EUR) |

## Quoi NE PAS logger

- Analyses et réflexions (→ fichiers dédiés dans `comptabilite/` ou `notes/`)
- Données brutes (→ `data/transactions/`)
- Détails comptables (→ comptabilité)

## Règle pour le skill

**À chaque action importante effectuée par le skill (envoi courrier, calcul appel de fonds, déclaration sinistre, etc.), proposer d'ajouter une ligne au journal de gestion.**

Format : `- **YYYY-MM-DD** : [description courte de l'action]`

Si le fichier `journal/YYYY.md` n'existe pas, le créer avec le header `# Journal de gestion — YYYY`.
