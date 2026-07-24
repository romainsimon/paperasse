# Setup facturation (première utilisation)

Ce setup se lance si `company.json` n'existe pas ou si les champs de facturation ne sont pas configurés.

**Principe : inférer un maximum, demander un minimum.** L'API SIRENE donne presque tout.

## Si company.json existe déjà (configuré par le skill comptable)

Le fichier contient déjà les informations de base (identité, TVA, banques). Compléter les champs facturation :

### Étape 1 : Vérifier les champs existants

Confirmer que les champs suivants sont présents et corrects :
- `name`, `siren`, `siret`, `address`, `legal_form`
- `president` (nom, titre)
- `tax.regime_tva`

### Étape 2 : Numérotation

> Comment numérotez-vous vos factures ?

Proposer le format par défaut : `F-YYYY-NNN` (ex : F-2026-001).

Si l'utilisateur a déjà des factures existantes :
> Quel est le **dernier numéro de facture** émis ?

Configurer dans company.json :

```json
"invoicing": {
  "prefix": "F",
  "separator": "-",
  "year_format": "YYYY",
  "next_number": 1,
  "avoir_prefix": "AV"
}
```

### Étape 3 : Plateforme agréée

> Avez-vous déjà choisi une **plateforme agréée** pour la facturation électronique ?

Si non, guider le choix (voir [plateformes-agreees.md](plateformes-agreees.md)) :
- Si Qonto → recommander Qonto
- Si auto-entrepreneur → recommander Indy
- Sinon → recommander Pennylane ou Indy

Configurer dans company.json :

```json
"einvoicing": {
  "pa": "qonto",
  "pa_name": "Qonto",
  "reception_ready": false,
  "emission_ready": false,
  "ereporting_ready": false
}
```

### Étape 4 : Conditions de paiement par défaut

> Quel est votre **délai de paiement** habituel ?

Proposer les options courantes :
- À réception (net 0)
- 30 jours (net 30)
- 30 jours fin de mois
- 45 jours fin de mois
- 60 jours

> Quels **moyens de paiement** acceptez-vous ?

Configurer dans company.json :

```json
"payment": {
  "default_terms": "net_30",
  "default_terms_label": "30 jours date de facture",
  "methods": ["virement"],
  "bank_details": {
    "iban": "",
    "bic": ""
  },
  "late_penalty_rate": 0.0,
  "recovery_fee": 40
}
```

Notes :
- `late_penalty_rate` : si 0, appliquer le taux légal (3x le taux d'intérêt légal de la BCE, 12,21% en 2026). Ne pas laisser vide.
- `recovery_fee` : indemnité forfaitaire de recouvrement, fixée à 40 EUR par la loi (art. D441-5 C.com).

### Étape 5 : Coordonnées bancaires (pour mention sur facture)

> Souhaitez-vous faire figurer vos **coordonnées bancaires** sur les factures ?

Si oui, demander IBAN et BIC. Les stocker dans `payment.bank_details`.

### Étape 6 : Récapitulatif

Afficher le résumé de la configuration facturation :

```
Configuration facturation :
  Numérotation : F-YYYY-NNN (prochain : F-2026-001)
  Plateforme agréée : [PA choisie]
  Délai paiement : [délai]
  Moyens de paiement : [moyens]
  Pénalités retard : [taux]% + 40 EUR forfaitaire
  IBAN sur facture : [oui/non]

  Conformité e-facturation :
  ⬜ Réception : à configurer sur [PA]
  ⬜ Émission : échéance [date]
  ⬜ E-reporting : échéance [date]
```

## Si company.json n'existe pas

Renvoyer vers le setup guidé général ([../setup.md](../setup.md)), puis revenir ici pour les champs facturation.
