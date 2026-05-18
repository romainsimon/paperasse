# Numérotation et Conservation des Factures (Belgique)

`last_updated: 2026-05-15`

Base légale : **art. 53 CTVA** (numérotation) ; **loi du 17 juillet 1975** relative à la comptabilité des entreprises (conservation).

---

## Numérotation

### Règles

1. **Séquence chronologique continue** : chaque facture a un numéro unique, dans un ordre croissant sans rupture
2. **Pas de trous** : les numéros se suivent sans interruption (F-001, F-002, F-003...)
3. **Pas de doublons** : un numéro ne peut être utilisé qu'une seule fois
4. **Séries distinctes possibles** : si justifié par l'organisation (par activité, par établissement)

### Formats recommandés

| Format | Exemple | Avantage |
|--------|---------|----------|
| Année + séquence | F-2026-001 | Simple, lisible, remise à zéro annuelle |
| Année-mois + séquence | F-202609-001 | Classement mensuel |
| Préfixe activité + séquence | SRL-2026-001 | Multi-activités |
| Séquence pure | 00001 | Le plus simple |

**Recommandation** : `F-YYYY-NNN` (ex : F-2026-001). Le préfixe F distingue les factures des avoirs (AV-2026-001).

### Séries multiples

Autorisées si justifiées par l'organisation (multi-établissements, multi-activités). Chaque série doit être :
- Clairement identifiable par un préfixe distinct
- Chronologique et continue dans sa propre séquence
- Documentée dans la politique de numérotation interne

### Avoirs (notes de crédit)

Les avoirs peuvent suivre :
- **La même séquence** que les factures (avec type de document distinct)
- **Une séquence séparée** avec préfixe (AV-2026-001)

Dans les deux cas, la séquence doit être chronologique et continue.

### Erreurs de numérotation

- **Ne jamais supprimer** une facture émise. En cas d'erreur, émettre un avoir (note de crédit).
- **Ne jamais réutiliser** un numéro annulé.
- Si un trou est constaté, le documenter (note interne, mention dans le journal).

---

## Conservation

### Durée légale

| Type de document | Durée de conservation | Base légale |
|-----------------|----------------------|-------------|
| Factures émises et reçues | **10 ans** | Art. 7 loi du 17 juillet 1975 |
| Livres comptables | **10 ans** | Art. 7 loi du 17 juillet 1975 |
| Contrats, correspondance | **10 ans** | Art. 7 loi du 17 juillet 1975 |

> En pratique, conserver 10 ans pour tous les documents justificatifs. Ce délai court à partir du dernier jour de l'exercice auquel ils se rapportent.

### Format de conservation

**Factures électroniques (Peppol/UBL) :**
- Conservation **en format informatique** pendant au moins 10 ans
- L'impression papier d'une facture électronique n'a pas de valeur probante équivalente
- Le format de conservation doit garantir **l'intégrité** et **la lisibilité** du document original

**Factures papier :**
- Conservation physique ou numérisation (avec garanties d'authenticité)
- La numérisation doit être certifiée conforme si elle remplace l'original

### Garanties d'authenticité et d'intégrité

L'authenticité des factures peut être garantie par :

1. **Signature électronique qualifiée** (ou cachet électronique qualifié conforme eIDAS)
2. **Piste d'audit fiable** : procédure documentée liant facture, bon de commande, bon de livraison et paiement
3. **Réseau Peppol** : le réseau Peppol garantit l'intégrité de la transmission via son infrastructure de certificats

Pour les factures transmises via un prestataire Peppol agréé, le prestataire assure généralement l'intégrité et l'archivage.

### Organisation des archives

Structure recommandée :

```
data/factures/
├── clients/
│   └── YYYY/
│       ├── F-YYYY-001_client-a_1210.00.pdf
│       ├── F-YYYY-002_client-b_605.00.xml   (Peppol UBL)
│       └── ...
├── fournisseurs/
│   └── YYYY/
│       ├── YYYY-MM-DD_fournisseur_montant.pdf
│       └── ...
└── avoirs/
    └── YYYY/
        ├── AV-YYYY-001_client-a_121.00.pdf
        └── ...
```

### Contrôle fiscal en Belgique

En cas de contrôle TVA, l'administration (SPF Finances / AGFisc) peut demander :
- L'ensemble des factures émises et reçues sur la période contrôlée
- Les livres et journaux comptables (livre-journal, grand livre, balance)
- Les pièces justificatives correspondantes
- Les déclarations TVA Intervat et les listings annuels

**Délai de prescription TVA :** 3 ans en règle générale, 7 ans en cas de fraude ou d'absence de déclaration.

Les factures électroniques doivent être restituables dans leur format d'origine (XML UBL pour les factures Peppol). Un PDF imprimé depuis un XML Peppol ne remplace pas le XML original.

---

## Facture électronique Peppol — spécificités conservation

| Aspect | Règle |
|--------|-------|
| Format à conserver | XML UBL 2.1 original (Peppol BIS 3.0) |
| Durée | 10 ans |
| Qui conserve | L'entreprise ET le prestataire Peppol (double conservation recommandée) |
| Preuve de transmission | Accusé de réception Peppol (log de routage Mercurius) |
