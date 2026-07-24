# Numérotation et Conservation des Factures

## Numérotation

Base légale : article 242 nonies A, I-5° du CGI.

### Règles

1. **Séquence chronologique continue** : chaque facture a un numéro unique, dans un ordre croissant sans rupture
2. **Pas de trous** : les numéros se suivent sans interruption (F-001, F-002, F-003...)
3. **Pas de doublons** : un numéro ne peut être utilisé qu'une seule fois
4. **Basée sur une ou plusieurs séries** : possibilité d'utiliser des séries distinctes si justifié (par activité, par point de vente)

### Formats recommandés

| Format | Exemple | Avantage |
|--------|---------|----------|
| Année + séquence | F-2026-001 | Simple, lisible, reset annuel |
| Année-mois + séquence | F-202609-001 | Classement mensuel |
| Préfixe activité + séquence | SAS-2026-001 | Multi-activités |
| Séquence pure | 00001 | Le plus simple |

**Recommandation** : `F-YYYY-NNN` (ex : F-2026-001). Le préfixe F distingue les factures des avoirs (AV-2026-001).

### Séries multiples

Autorisées si justifiées par l'organisation (multi-établissements, multi-activités). Chaque série doit être :
- Clairement identifiable
- Chronologique et continue dans sa propre séquence
- Documentée dans la politique de numérotation

### Avoirs

Les avoirs (notes de crédit) peuvent suivre :
- **La même séquence** que les factures (recommandé pour la simplicité)
- **Une séquence séparée** avec préfixe (AV-2026-001)

Dans les deux cas, la séquence doit être chronologique et continue.

### Erreurs de numérotation

- **Ne jamais supprimer** une facture émise. En cas d'erreur, émettre un avoir.
- **Ne jamais réutiliser** un numéro annulé.
- Si un trou est constaté, le documenter (lettre interne, note dans le journal).

## Conservation

### Durée

| Type de document | Durée de conservation | Base légale |
|-----------------|----------------------|-------------|
| Factures émises et reçues | **10 ans** (comptable) | Art. L123-22 C.com |
| Factures émises et reçues | **6 ans** (fiscal) | Art. L102 B du LPF |
| Pièces justificatives | **10 ans** | Art. L123-22 C.com |

**En pratique** : conserver 10 ans pour couvrir les deux obligations.

### Format de conservation

Depuis la réforme 2026 :
- Les factures électroniques doivent être conservées **en format informatique** pendant au moins 6 ans
- L'impression papier d'une facture électronique n'a pas de valeur probante
- Le format de conservation doit garantir **l'intégrité** et **la lisibilité** du document

### Garanties d'authenticité et d'intégrité

Trois méthodes acceptées (art. 289, VII du CGI) :

1. **Signature électronique qualifiée** (ou cachet électronique qualifié)
2. **Piste d'audit fiable** : procédure documentée liant facture, livraison et paiement
3. **Échange de données informatisé** (EDI) avec liste récapitulative

Pour les factures transmises via une PA, la PA assure généralement l'intégrité et la conservation.

### Organisation des archives

Structure recommandée :

```
archives/
├── YYYY/
│   ├── emises/
│   │   ├── F-YYYY-001-client-montant.pdf
│   │   ├── F-YYYY-002-client-montant.pdf
│   │   └── ...
│   ├── recues/
│   │   ├── fournisseur-YYYY-MM-DD-montant.pdf
│   │   └── ...
│   └── avoirs/
│       ├── AV-YYYY-001-client-montant.pdf
│       └── ...
```

### Contrôle fiscal

En cas de contrôle, l'administration peut demander :
- L'ensemble des factures émises et reçues sur la période contrôlée
- Le fichier des écritures comptables (FEC)
- Les pièces justificatives

Les factures électroniques doivent être restituables dans leur format d'origine. Un PDF imprimé puis scanné n'est pas recevable si l'original est un Factur-X.
