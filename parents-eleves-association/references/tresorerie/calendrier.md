# Calendrier type — trésorier d'association

Échéances à intégrer au workflow heartbeat. Les dates dépendent de la date de clôture de l'exercice (calée souvent sur l'année scolaire pour une APE : 01/09 — 31/08).

## Cycle annuel — exercice calé sur l'année scolaire (01/09 N → 31/08 N+1)

| Échéance | Tâche | Référence |
|----------|-------|-----------|
| **Au fil de l'eau** | Saisie des écritures (banque, caisse, dons, cotisations, factures fournisseurs). Sauvegarde mensuelle. | ANC 2018-06 |
| **31/08** | Clôture de l'exercice. Inventaire physique (matériel, stocks). | Statuts |
| **Septembre — octobre** | Travaux de clôture : amortissements, fonds dédiés, contributions volontaires en nature, rapprochement bancaire final. | [anc-2018-06.md](anc-2018-06.md) |
| **Octobre — décembre** | Rédaction du rapport financier, du projet de budget, de la convocation à l'AG (délai statutaire, souvent 15 jours). | Statuts |
| **Avant le 28/02 (au plus tard)** | **AG ordinaire d'approbation des comptes** (usage : dans les 6 mois de la clôture, sauf statuts contraires). Vote des comptes, affectation du résultat, quitus, élection du bureau si renouvellement. | Statuts |
| **Dans les 3 mois de l'approbation** | Si subventions publiques ou dons défiscalisés > **153 000 EUR** sur l'exercice : **publication des comptes annuels + rapport CAC sur le portail DILA** | Art. L. 612-4 C. com. |
| **Dans les 3 mois de toute modification statutaire ou de bureau** | Déclaration via **Le Compte Asso** (e-modification) — non assurée par le trésorier mais à connaître. | Loi 1901, art. 5 |
| **Avant le 3 mai N+1** | Si revenus patrimoniaux (foncier, mobilier, dividendes, agricole) : déclaration **2070-SD** et paiement IS au taux réduit. Échéance = 2e jour ouvré après le 1er mai. | Art. 206-5 CGI |
| **15 du mois suivant le versement** | Déclaration et paiement de la taxe sur les salaires (si due) — formulaire 2502 ou 2501. | Art. 1679 CGI |
| **Janvier** | Envoi du **récapitulatif annuel des dons** aux donateurs (en vue de leur déclaration de revenus). Bonne pratique non obligatoire. | — |
| **6 mois après la fin de l'exercice de réalisation d'un projet subventionné** | Dépôt du **compte rendu financier CERFA 15059\*02** auprès des autorités versantes. | Décret 6 juin 2001 |

## Échéances liées à des événements ponctuels

| Événement | Tâche | Délai |
|-----------|-------|-------|
| Modification des statuts (objet, siège, dénomination) | E-modification via Le Compte Asso, mise à jour des comptes bancaires, des conventions | 3 mois |
| Changement de président, trésorier, secrétaire | E-modification, mise à jour des pouvoirs bancaires (signatures), mise à jour des conventions de subvention | 3 mois |
| Dépassement d'un seuil (153 000 EUR, ou un seuil statutaire) | Désignation CAC (AG ou bureau selon statuts), inscription du CAC au registre des bénéficiaires effectifs si applicable | Avant la clôture de l'exercice en cours |
| Réception d'un don ouvrant droit à reçu fiscal | Émission du reçu CERFA 11580\*05, inscription au registre des reçus | Sans délai légal mais usuellement avant le 31/01 pour la déclaration de revenus du donateur |
| Réception d'une subvention publique > 23 000 EUR | Signature de la convention si pas déjà faite | Avant versement |
| Manifestation exceptionnelle (kermesse, vide-grenier, loto) | Comptabilisation distincte ; vérifier qu'on reste dans la limite des 6 manifestations exonérées par exercice | À chaque manifestation |
| Embauche d'un salarié | Déclaration préalable à l'embauche (DPAE), inscription au CEA (Chèque Emploi Associatif) ou contrat formel, déclaration de la masse salariale dans la prochaine taxe sur les salaires | 8 jours avant le 1er jour de travail |
| Dissolution | AG extraordinaire, désignation d'un liquidateur, dévolution de l'actif, déclaration de dissolution via Le Compte Asso, publication JOAFE | Dans les 3 mois de la dissolution |

## Affichage workflow heartbeat

Le trésorier IA doit afficher en début de chaque conversation :

```
⏰ PROCHAINES ÉCHÉANCES (90 jours)
━━━━━━━━━━━━━━━━━━━━━━
🔴 J+5  - [Tâche très imminente]
🟠 J+10 - [Tâche imminente]
🟡 J+25 - [Tâche moyennement urgente]
🟢 J+70 - [Tâche à anticiper]
```

Adapter dynamiquement à partir de `fiscal_year.end` et `ag.approbation_comptes_deadline`.
