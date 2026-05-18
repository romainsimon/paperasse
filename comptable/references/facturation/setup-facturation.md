# Setup Facturation (première utilisation) — Belgique

`last_updated: 2026-05-15`

Ce setup se lance si `company.json` n'existe pas ou si les champs de facturation ne sont pas configurés.

**Principe : inférer un maximum, demander un minimum.** La BCE donne presque tout.

---

## Si company.json existe déjà (configuré par le skill comptable)

Le fichier contient déjà les informations de base (identité BCE, TVA, banques). Compléter les champs facturation :

### Étape 1 : Vérifier les champs existants

Confirmer que les champs suivants sont présents et corrects :
- `name`, `bce`, `address`, `legal_form` (SRL/SA/SNC...)
- `vat_number` (format BE0xxx.xxx.xxx)
- `dirigeant` (nom, titre)
- `tax.regime_tva` (franchise / trimestriel / mensuel)

**Note BCE** : Le numéro d'entreprise est au format `0xxx.xxx.xxx`. Le numéro TVA belge est dérivé : `BE` + BCE sans points. Stocker sans espaces/points dans `company.json` (`"bce": "0123456789"`).

### Étape 2 : Numérotation

> Comment numérotez-vous vos factures ?

Proposer le format par défaut : `F-YYYY-NNN` (ex : F-2026-001).

Si l'utilisateur a déjà des factures existantes :
> Quel est le **dernier numéro de facture** émis ?

Configurer dans `company.json` :

```json
"invoicing": {
  "prefix": "F",
  "separator": "-",
  "year_format": "YYYY",
  "next_number": 1,
  "avoir_prefix": "AV"
}
```

### Étape 3 : Prestataire Peppol (e-facturation B2B)

Depuis le 01/01/2026, la facturation électronique B2B est obligatoire en Belgique.

> Avez-vous déjà configuré la **facturation électronique Peppol** ?

Si non :
> Pour émettre et recevoir des factures électroniques en Belgique, vous avez besoin d'un prestataire Peppol connecté au réseau Mercurius.
>
> Votre identifiant Peppol est : `0208:[BCE sans points]` (ex : `0208:0123456789`)
>
> **Prestataires recommandés** :
> - Qonto (si déjà votre banque)
> - Clearfacts (spécialiste belge)
> - Unifiedpost
> - Isabel
> - Billit

Guider le choix selon [plateformes-agreees.md](plateformes-agreees.md).

Configurer dans `company.json` :

```json
"einvoicing": {
  "peppol_id": "0208:0123456789",
  "provider": "qonto",
  "provider_name": "Qonto",
  "reception_ready": false,
  "emission_ready": false
}
```

### Étape 4 : Conditions de paiement par défaut

> Quel est votre **délai de paiement** habituel ?

Options courantes (loi belge du 2 août 2002 sur les retards de paiement) :
- À réception (net 0)
- 30 jours (net 30) — délai légal par défaut B2B
- 30 jours fin de mois
- 60 jours (maximum légal B2B avec accord exprès)

> Quels **moyens de paiement** acceptez-vous ?

Configurer dans `company.json` :

```json
"payment": {
  "default_terms": "net_30",
  "default_terms_label": "30 jours date de facture",
  "methods": ["virement"],
  "bank_details": {
    "iban": "BE68 5390 0754 7034",
    "bic": "BNAGBEBB"
  },
  "late_penalty_rate": 0.0,
  "recovery_fee": 40
}
```

Notes :
- `late_penalty_rate` : si 0, appliquer le taux légal belge (taux BCE + 8 points, fixé semestriellement par le SPF Économie). Ne pas laisser vide.
- `recovery_fee` : indemnité forfaitaire de recouvrement, fixée à **40 EUR** par la loi belge du 2 août 2002 (applicable aux B2B).

### Étape 5 : Coordonnées bancaires (IBAN belge)

> Souhaitez-vous faire figurer vos **coordonnées bancaires** sur les factures ?

Si oui, demander IBAN (format belge `BE` + 14 chiffres) et BIC. Les stocker dans `payment.bank_details`.

L'IBAN belge est toujours au format : `BE` + 2 chiffres de contrôle + 12 chiffres (ex : `BE68 5390 0754 7034`).

### Étape 6 : Récapitulatif

Afficher le résumé de la configuration facturation :

```
Configuration facturation — [company.name]
  Numéro BCE : [0xxx.xxx.xxx]
  Numéro TVA : [BE0xxx.xxx.xxx]
  Numérotation : F-YYYY-NNN (prochain : F-2026-001)
  Prestataire Peppol : [prestataire]
  Identifiant Peppol : 0208:[BCE sans points]
  Délai paiement : [délai]
  Moyens de paiement : [moyens]
  Pénalités retard : taux légal (BCE + 8 pts) + 40 EUR forfaitaire
  IBAN sur facture : [IBAN belge]

  Conformité e-facturation Peppol :
  ⬜ Réception : à configurer sur [prestataire]
  ⬜ Émission : obligatoire depuis 01/01/2026
```

---

## Si company.json n'existe pas

Renvoyer vers le setup guidé général ([../setup.md](../setup.md)), puis revenir ici pour les champs facturation.

---

## Ressources

- **Mercurius** (hub Peppol belge) : https://mercurius.belgium.be
- **BCE** (recherche entreprises) : https://kbopub.economie.fgov.be
- **SPF Finances** (TVA, Intervat) : https://finances.belgium.be
- **Intervat** (activation TVA formulaire 604A) : https://intervat.minfin.fgov.be
