# Formats de Sortie

`last_updated: 2026-05-15`

## Tableau de Bord Portfolio

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PORTEFEUILLE SYNDIC — {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────┬──────┬──────────┬──────────┬──────────┬───────────┐
│ ACP              │ Lots │ Budget   │ Impayés  │ Fds Rés. │ Proch. AG │
├──────────────────┼──────┼──────────┼──────────┼──────────┼───────────┤
│ {{acp.name}}     │  XXX │ XX XXX € │  X XXX € │ XX XXX € │ DD/MM     │
│ ...              │  ... │      ... │      ... │      ... │ ...       │
├──────────────────┼──────┼──────────┼──────────┼──────────┼───────────┤
│ TOTAL            │  XXX │ XX XXX € │  X XXX € │ XX XXX € │           │
└──────────────────┴──────┴──────────┴──────────┴──────────┴───────────┘

PROCHAINES ÉCHÉANCES (toutes ACP, triées par date)
DD/MM — {{acp}} : {{action}} (dans X jours)
DD/MM — {{acp}} : {{action}} (dans X jours)
DD/MM — {{acp}} : {{action}} (dans X jours)

ALERTES
{{acp}} : X copropriétaires en impayé (X XXX EUR, > 3 mois)
{{acp}} : Contrat {{fournisseur}} arrive à échéance dans 30 jours
```

Si une seule ACP, ne pas afficher le tableau comparatif. Afficher directement les échéances et alertes de cette ACP.

## Appel de Fonds

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPEL DE FONDS — {{trimestre}} {{année}}
ACP {{acp.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Copropriétaire : {{nom}}
Lot(s) : {{lots}} ({{quotes_parts}} millièmes / {{total_millièmes}})

┌─────────────────────────────────┬──────────┐
│ Poste                           │ Montant  │
├─────────────────────────────────┼──────────┤
│ Charges ordinaires (quote-part) │   XXX,XX │
│ Fonds de réserve (art. 3.89)   │    XX,XX │
│ Travaux votés (si applicable)  │   XXX,XX │
├─────────────────────────────────┼──────────┤
│ TOTAL À RÉGLER                  │   XXX,XX │
└─────────────────────────────────┴──────────┘

Date d'exigibilité : {{date}}
Virement SEPA : IBAN {{iban}} / BIC {{bic}}
Référence : {{lot}}-{{trimestre}}-{{année}}

Tous montants en EUR (TVA incluse dans les charges).
```

## Budget Ordinaire

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET ORDINAIRE — Exercice {{exercice}}
ACP {{acp.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────┬──────────┬──────────┬────────┐
│ Poste                    │ Réel N-1 │ Budget N │ Écart  │
├──────────────────────────┼──────────┼──────────┼────────┤
│ Nettoyage                │ X XXX,XX │ X XXX,XX │   +X%  │
│ Espaces verts            │ X XXX,XX │ X XXX,XX │   +X%  │
│ Chauffage                │ X XXX,XX │ X XXX,XX │   +X%  │
│ Eau                      │ X XXX,XX │ X XXX,XX │   +X%  │
│ Électricité              │ X XXX,XX │ X XXX,XX │   +X%  │
│ Assurance incendie       │ X XXX,XX │ X XXX,XX │   +X%  │
│ Honoraires syndic        │ X XXX,XX │ X XXX,XX │   +X%  │
│ Entretien / réparations  │ X XXX,XX │ X XXX,XX │   +X%  │
│ Contrats maintenance     │ X XXX,XX │ X XXX,XX │   +X%  │
│ Frais administratifs     │   XXX,XX │   XXX,XX │   +X%  │
│ Frais bancaires          │    XX,XX │    XX,XX │   +X%  │
│ Imprévus                 │     0,00 │   XXX,XX │    —   │
├──────────────────────────┼──────────┼──────────┼────────┤
│ TOTAL                    │XX XXX,XX │XX XXX,XX │   +X%  │
└──────────────────────────┴──────────┴──────────┴────────┘

Charges par lot (moyenne) : {{total / nb_lots}} EUR
Fonds de réserve (5% min.) : {{fonds_reserve}} EUR (art. 3.89 Cc belge)
```

## Décompte Annuel

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
DÉCOMPTE ANNUEL — Exercice {{exercice}}
Copropriétaire : {{nom}}
ACP : {{acp.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────────────────────┬──────────┐
│ Charges réelles (votre QP) │ X XXX,XX │
│ Appels de fonds versés     │ X XXX,XX │
├────────────────────────────┼──────────┤
│ SOLDE                      │  ±XXX,XX │
└────────────────────────────┴──────────┘

Avoir → déduit du prochain appel de fonds
Complément dû → à régler avant le {{date}}

Quote-part : {{quotes_parts}} millièmes / {{total_millièmes}} totaux
```

## État des Impayés

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAT DES IMPAYÉS — Au {{date}}
ACP : {{acp.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────┬───────────┬──────────┬──────────┬──────────┐
│ Lot         │ Montant   │ Ancienneté│ Relance  │ Statut   │
├─────────────┼───────────┼──────────┼──────────┼──────────┤
│ {{lot}}     │ X XXX,XX  │ X mois   │ MED/INJ  │ [statut] │
└─────────────┴───────────┴──────────┴──────────┴──────────┘

Total impayés : XX XXX,XX EUR
% du budget : XX%
```

## Synthèse de Vote AG

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉSOLUTION N°{{n}} — {{objet}}
ACP : {{acp.name}} — AG du {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Majorité requise : {{majorité ordinaire / 3/4 / 4/5 / unanimité}}
Quotes-parts totales de l'ACP : {{total}} millièmes
Quotes-parts représentées : {{représentés}} millièmes

┌──────────────┬─────────────┬─────────┐
│              │  Millièmes  │    %    │
├──────────────┼─────────────┼─────────┤
│ Pour         │      X XXX  │   XX%   │
│ Contre       │      X XXX  │   XX%   │
│ Abstention   │        XXX  │    X%   │
├──────────────┼─────────────┼─────────┤
│ Représentés  │      X XXX  │  100%   │
└──────────────┴─────────────┴─────────┘

Résultat : ADOPTÉE / REJETÉE
Note : {{explication si borderline ou 2e AG requise}}
```

## Suivi Recommandés Centralisé

Tableau de suivi de tous les recommandés envoyés. Essentiel pour le respect des délais légaux belges.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SUIVI RECOMMANDÉS — {{acp.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────┬────────────┬──────────────────┬──────────────────────┬───────────────┬────────────┬──────────────────────────┐
│ #  │ Date envoi │ Destinataire     │ Objet                │ N° suivi bpost│ Date AR    │ Délai qui court          │
├────┼────────────┼──────────────────┼──────────────────────┼───────────────┼────────────┼──────────────────────────┤
│  1 │ YYYY-MM-DD │ {{destinataire}} │ {{objet}}            │ {{n_suivi}}   │ YYYY-MM-DD │ {{delai}} jours (art. X) │
└────┴────────────┴──────────────────┴──────────────────────┴───────────────┴────────────┴──────────────────────────┘

Délais clés en droit belge :
- Convocation AG : 15 jours minimum avant la date de l'AG (art. 3.85 Cc belge)
- Notification PV : contestation 4 mois à compter de la réception (art. 3.86 Cc belge)
- Mise en demeure : 15–30 jours pour régulariser (pratique)
- Transmission archives (changement syndic) : 30 jours (art. 3.84 §5 Cc belge)
```

## Évolution des Charges Pluriannuelle

Suivi des charges sur N années pour détecter les dérives.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉVOLUTION DES CHARGES — {{acp.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────┬──────────┬──────────┬──────────┬──────────┬──────────┐
│ Poste                │ N-3      │ N-2      │ N-1      │ N        │ Tendance │
├──────────────────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ Nettoyage            │ X XXX €  │ X XXX €  │ X XXX €  │ X XXX €  │ +X%/an   │
│ Chauffage            │ X XXX €  │ X XXX €  │ X XXX €  │ X XXX €  │ variable │
│ Assurance            │ X XXX €  │ X XXX €  │ X XXX €  │ X XXX €  │ +X%/an   │
│ Eau                  │ X XXX €  │ X XXX €  │ X XXX €  │ X XXX €  │ +X%/an   │
│ Électricité          │ X XXX €  │ X XXX €  │ X XXX €  │ X XXX €  │ stable   │
│ ...                  │          │          │          │          │          │
├──────────────────────┼──────────┼──────────┼──────────┼──────────┼──────────┤
│ TOTAL                │XX XXX €  │XX XXX €  │XX XXX €  │XX XXX €  │ +X%/an   │
│ Charge moy./lot      │ X XXX €  │ X XXX €  │ X XXX €  │ X XXX €  │          │
└──────────────────────┴──────────┴──────────┴──────────┴──────────┴──────────┘

ALERTES
- {{poste}} : +XX% sur 3 ans (à mettre en concurrence)
- {{poste}} : très variable (comparer à l'indice santé belge ou indice Agoria)
```

Source : factures fournisseurs, annexe 3 (budget vs réalisé), PV d'AG.

## Audit Fournisseurs

Tableau de synthèse pour l'audit annuel des fournisseurs.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
AUDIT FOURNISSEURS — {{acp.name}} — {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────┬──────────────┬─────────────────┬──────────┬─────────┬──────────────┬──────────────────────────┐
│ #  │ Fournisseur  │ Prestation      │ Coût/an  │ % budg. │ Concurrence? │ Piste d'optimisation     │
├────┼──────────────┼─────────────────┼──────────┼─────────┼──────────────┼──────────────────────────┤
│  1 │ {{nom}}      │ {{prestation}}  │ X XXX €  │   XX%   │ Oui/Non      │ {{piste}}                │
└────┴──────────────┴─────────────────┴──────────┴─────────┴──────────────┴──────────────────────────┘

BCE fournisseur : 0xxx.xxx.xxx (vérifiable sur kbopub.economie.fgov.be)
Règle : tout fournisseur > 5% du budget et non mis en concurrence depuis 3 ans = alerte.

Économies identifiées : {{total}} EUR/an
```
