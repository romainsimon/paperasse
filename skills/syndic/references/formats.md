# Formats de Sortie

## Tableau de Bord Portfolio

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📊 PORTEFEUILLE SYNDIC — {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────┬──────┬──────────┬──────────┬──────────┬───────────┐
│ Copropriété      │ Lots │ Budget   │ Impayés  │ Fonds Tx │ Proch. AG │
├──────────────────┼──────┼──────────┼──────────┼──────────┼───────────┤
│ {{copro.name}}   │  XXX │ XX XXX € │  X XXX € │ XX XXX € │ DD/MM     │
│ ...              │  ... │      ... │      ... │      ... │ ...       │
├──────────────────┼──────┼──────────┼──────────┼──────────┼───────────┤
│ TOTAL            │  XXX │ XX XXX € │  X XXX € │ XX XXX € │           │
└──────────────────┴──────┴──────────┴──────────┴──────────┴───────────┘

⏰ PROCHAINES ÉCHÉANCES (toutes copros, triées par date)
🔴 DD/MM — {{copro}} : {{action}} (dans X jours)
🟠 DD/MM — {{copro}} : {{action}} (dans X jours)
🟡 DD/MM — {{copro}} : {{action}} (dans X jours)

⚠️ ALERTES
🔴 {{copro}} : X copropriétaires en impayé (X XXX €, > 3 mois)
🟡 {{copro}} : Contrat {{fournisseur}} arrive à échéance dans 30 jours
```

Si une seule copropriété, ne pas afficher le tableau comparatif. Afficher directement les échéances et alertes de cette copropriété.

## Appel de Fonds

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
APPEL DE FONDS — {{trimestre}} {{année}}
Copropriété {{copro.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Copropriétaire : {{nom}}
Lot(s) : {{lots}} ({{tantièmes}} tantièmes / {{total_tantièmes}})

┌─────────────────────────────────┬──────────┐
│ Poste                           │ Montant  │
├─────────────────────────────────┼──────────┤
│ Provisions charges courantes    │   XXX,XX │
│ Fonds de travaux (art. 14-2)   │    XX,XX │
│ Travaux votés (si applicable)  │   XXX,XX │
├─────────────────────────────────┼──────────┤
│ TOTAL À RÉGLER                  │   XXX,XX │
└─────────────────────────────────┴──────────┘

Date d'exigibilité : {{date}}
Virement : IBAN {{iban}} / BIC {{bic}}
Référence : {{lot}}-{{trimestre}}-{{année}}
```

## Budget Prévisionnel

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
BUDGET PRÉVISIONNEL — Exercice {{exercice}}
Copropriété {{copro.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────┬──────────┬──────────┬────────┐
│ Poste                    │ Réel N-1 │ Budget N │ Écart  │
├──────────────────────────┼──────────┼──────────┼────────┤
│ Nettoyage                │ X XXX,XX │ X XXX,XX │   +X%  │
│ Espaces verts            │ X XXX,XX │ X XXX,XX │   +X%  │
│ Chauffage                │ X XXX,XX │ X XXX,XX │   +X%  │
│ Eau                      │ X XXX,XX │ X XXX,XX │   +X%  │
│ Électricité              │ X XXX,XX │ X XXX,XX │   +X%  │
│ Assurance                │ X XXX,XX │ X XXX,XX │   +X%  │
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
Fonds de travaux (5% min.) : {{fonds_travaux}} EUR
```

## Régularisation Annuelle

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉGULARISATION — Exercice {{exercice}}
Copropriétaire : {{nom}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────────────────────────────┬──────────┐
│ Charges réelles (votre QP) │ X XXX,XX │
│ Provisions versées         │ X XXX,XX │
├────────────────────────────┼──────────┤
│ SOLDE                      │  ±XXX,XX │
└────────────────────────────┴──────────┘

☐ Trop-perçu → déduit du prochain appel
☐ Complément dû → à régler avant le {{date}}
```

## État des Impayés

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ÉTAT DES IMPAYÉS — Au {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌─────────────┬───────────┬──────────┬──────────┬──────────┐
│ Lot         │ Montant   │ Ancienneté│ Relance  │ Statut   │
├─────────────┼───────────┼──────────┼──────────┼──────────┤
│ {{lot}}     │ X XXX,XX  │ X mois   │ MED/INJ  │ 🔴/🟡/🟢 │
└─────────────┴───────────┴──────────┴──────────┴──────────┘

Total impayés : XX XXX,XX EUR
% du budget : XX%
```

## Synthèse de Vote AG

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
RÉSOLUTION N°{{n}} — {{objet}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Majorité requise : {{art. 24/25/26/unanimité}}
Quorum/seuil : {{seuil}} voix

┌──────────┬─────────┬─────────┐
│          │  Voix   │    %    │
├──────────┼─────────┼─────────┤
│ Pour     │  X XXX  │   XX%   │
│ Contre   │  X XXX  │   XX%   │
│ Abstention│    XXX  │    X%   │
├──────────┼─────────┼─────────┤
│ Total    │  X XXX  │  100%   │
└──────────┴─────────┴─────────┘

Résultat : ✅ ADOPTÉE / ❌ REJETÉE
Passerelle art. 25-1 : applicable / non applicable
```

## Suivi LRAR Centralisé

Tableau de suivi de tous les recommandés envoyés. Essentiel pour le respect des délais légaux.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📮 SUIVI LRAR — {{copro.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────┬────────────┬──────────────────┬──────────────────────┬───────────────┬────────────┬──────────────────────────┐
│ #  │ Date envoi │ Destinataire     │ Objet                │ N° suivi      │ Date AR    │ Délai qui court          │
├────┼────────────┼──────────────────┼──────────────────────┼───────────────┼────────────┼──────────────────────────┤
│  1 │ YYYY-MM-DD │ {{destinataire}} │ {{objet}}            │ {{n_suivi}}   │ YYYY-MM-DD │ {{delai}} jours (art. X) │
└────┴────────────┴──────────────────┴──────────────────────┴───────────────┴────────────┴──────────────────────────┘

Délais courants :
- Convocation AG : 21 jours à compter du lendemain de la 1ère présentation (art. 9 décret 1967)
- Notification PV : contestation 2 mois à compter de la réception (art. 42)
- Mise en demeure : 30 jours pour régulariser
- Transmission archives : 3 mois à compter de la cessation (art. 18-2)
```

## Évolution des Charges Pluriannuelle

Suivi des charges sur N années pour détecter les dérives.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📈 ÉVOLUTION DES CHARGES — {{copro.name}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

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

⚠️ ALERTES
- {{poste}} : +XX% sur 3 ans (à mettre en concurrence)
- {{poste}} : très variable (écart min/max > 100%)
```

Source : factures fournisseurs, annexe 3 (budget vs réalisé), PV d'AG.

## Audit Fournisseurs

Tableau de synthèse pour l'audit annuel des fournisseurs.

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔍 AUDIT FOURNISSEURS — {{copro.name}} — {{date}}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌────┬──────────────┬─────────────────┬──────────┬─────────┬──────────────┬──────────────────────────┐
│ #  │ Fournisseur  │ Prestation      │ Coût/an  │ % budg. │ Concurrence? │ Piste d'optimisation     │
├────┼──────────────┼─────────────────┼──────────┼─────────┼──────────────┼──────────────────────────┤
│  1 │ {{nom}}      │ {{prestation}}  │ X XXX €  │   XX%   │ Oui/Non      │ {{piste}}                │
└────┴──────────────┴─────────────────┴──────────┴─────────┴──────────────┴──────────────────────────┘

Règle : tout fournisseur > 5% du budget et non mis en concurrence depuis 3 ans = alerte.

Économies identifiées : {{total}} EUR/an
```
