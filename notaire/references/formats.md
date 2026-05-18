# Formats de Sortie

Formats de calcul et de présentation adaptés au droit belge.

**last_updated: 2026-05-15**

## Calcul de Frais d'Acquisition

```
FRAIS D'ACQUISITION — [Adresse du bien] — [Région]
══════════════════════════════════════════

Prix de vente                          XXX XXX,XX EUR

DROITS D'ENREGISTREMENT RÉGIONAUX
  Région : [Flandre / Wallonie / Bruxelles]
  Taux applicable : X,XX%
  Base taxable (après abattement éventuel) : XXX XXX,XX EUR
  ─────────────────────────────────────────────────────
  Total droits d'enregistrement        XX XXX,XX EUR

DROIT HYPOTHÉCAIRE (si emprunt)
  Capital garanti                      XXX XXX,XX EUR
  Droit hypothécaire (1%)               X XXX,XX EUR

ÉMOLUMENTS DU NOTAIRE (AR du 16 décembre 1950)
  Tranche 0 - 7 500 (4,56%)               XXX,XX EUR
  Tranche 7 501 - 17 500 (2,85%)          XXX,XX EUR
  Tranche 17 501 - 30 000 (2,28%)         XXX,XX EUR
  Tranche 30 001 - 45 495 (1,71%)         XXX,XX EUR
  Tranche 45 496 - 64 095 (1,14%)         XXX,XX EUR
  Tranche 64 096 - 250 000 (0,57%)        XXX,XX EUR
  Tranche > 250 000 (0,057%)               XX,XX EUR
  ─────────────────────────────────────────────────────
  Total émoluments HT                    X XXX,XX EUR
  TVA (21%)                                XXX,XX EUR
  Total émoluments TTC                   X XXX,XX EUR

DÉBOURS (estimation)
  État hypothécaire AGDP, cadastre, etc.   XXX,XX EUR

══════════════════════════════════════════
TOTAL FRAIS D'ACQUISITION              XX XXX,XX EUR
soit X,XX% du prix de vente
══════════════════════════════════════════
Source : https://www.notaire.be/fr/achat-vente-2/achat/frais-notaires
```

## Calcul de Droits de Succession

```
DROITS DE SUCCESSION — [Nom du défunt] — [Région]
══════════════════════════════════════════

Actif brut de succession            XXX XXX,XX EUR
Passif déductible                   -XX XXX,XX EUR
─────────────────────────────────────────────────────
Actif net de succession             XXX XXX,XX EUR

PART DE [Héritier] — [Lien de parenté]
  Part brute (X/X)                  XXX XXX,XX EUR

  Barème [Région] en [ligne directe / entre époux / ...] :
    Tranche 0 - XX XXX (X%)             XXX,XX EUR
    Tranche XX XXX - XX XXX (X%)      X XXX,XX EUR
    ...
  ─────────────────────────────────────────────────────
  Total droits                       XX XXX,XX EUR

  [Si habitation familiale : indiquer l'exonération applicable]

══════════════════════════════════════════
TOTAL DROITS DE SUCCESSION           XX XXX,XX EUR
Émoluments notaire (estimation)        XXX,XX EUR
══════════════════════════════════════════
Base légale : VCF (Flandre) / CDE (Wallonie) / CWCF (Bruxelles)
```

## Calcul de Plus-Value Immobilière

```
PLUS-VALUE IMMOBILIÈRE (art. 90 CIR 92)
══════════════════════════════════════════

Type de bien : [terrain à bâtir / immeuble bâti / habitation propre]
Date d'acquisition : JJ/MM/AAAA
Date de cession : JJ/MM/AAAA
Durée de détention : XX ans XX mois

Prix de cession                     XXX XXX,XX EUR
Prix d'acquisition                  XXX XXX,XX EUR
  × Coefficient d'indexation (XXXX) ×       X,XXX
  Prix d'acquisition indexé          XX XXX,XX EUR
  + Frais d'acquisition réels        XX XXX,XX EUR
  + Travaux (si justifiés)           XX XXX,XX EUR
─────────────────────────────────────────────────────
Prix d'acquisition corrigé          XXX XXX,XX EUR

Plus-value brute                     XX XXX,XX EUR

──── RÉGIME APPLICABLE ────

[Si terrain à bâtir vendu dans les 8 ans]
  Taux : 33% (art. 90, 8° CIR 92)
  Impôt dû :                         XX XXX,XX EUR

[Si immeuble bâti vendu dans les 5 ans, hors habitation propre]
  Taux : 16,5% (art. 90, 10° CIR 92)
  Impôt dû :                         XX XXX,XX EUR

[Si habitation propre occupée personnellement]
  EXONÉRÉ (art. 90, 10° in fine CIR 92)
  Impôt dû :                              0,00 EUR

[Si cession > 8 ans (terrain) ou > 5 ans (bâti), gestion normale]
  EXONÉRÉ — hors champ d'application
  Impôt dû :                              0,00 EUR

══════════════════════════════════════════
TOTAL IMPÔT SUR LA PLUS-VALUE        X XXX,XX EUR
(à déclarer cadre XV de la déclaration IPP)
══════════════════════════════════════════
IMPORTANT : En Belgique, il n'existe pas d'abattements progressifs
par année de détention. L'impôt s'applique au taux fixe sur la
totalité de la plus-value si le bien est vendu dans le délai légal.
```

## Projet d'Acte

Pour les projets d'actes, utiliser les templates dans `templates/` ou générer un acte avec la structure suivante :

```
[PROJET — À SOUMETTRE AU NOTAIRE INSTRUMENTAIRE]

══════════════════════════════════════════
[TYPE D'ACTE]
══════════════════════════════════════════

ENTRE LES SOUSSIGNÉS :

[Partie 1 — nom, prénom(s), né(e) le, à, domicilié(e) à,
            numéro national : XX.XX.XX-XXX.XX]

ET

[Partie 2 — nom, prénom(s), né(e) le, à, domicilié(e) à,
            numéro national : XX.XX.XX-XXX.XX]

IL A ÉTÉ CONVENU CE QUI SUIT :

ARTICLE 1 — OBJET
[...]

[...]

══════════════════════════════════════════
⚠️ CE DOCUMENT EST UN PROJET DE TRAVAIL.
Il ne constitue pas un acte authentique belge.
Seul un notaire inscrit à la Chambre Nationale des Notaires
peut authentifier cet acte.
Références légales : Code civil belge, CSA, codes fiscaux régionaux.
══════════════════════════════════════════
```

## Compromis de Vente (structure belge)

```
COMPROMIS DE VENTE
══════════════════════════════════════════
[ou : OFFRE D'ACHAT ACCEPTÉE]

VENDEUR(S) : [identité complète + numéro national]
ACQUÉREUR(S) : [identité complète + numéro national]

BIEN : [adresse complète, références cadastrales, section, numéro]
RÉGION : [Flandre / Wallonie / Bruxelles]

PRIX : XXX XXX EUR (en chiffres et en lettres)
ACOMPTE : XX XXX EUR (séquestré chez le notaire [nom] à [adresse])

DIAGNOSTICS JOINTS :
  □ Certificat PEB (Performance Énergétique)
  □ Attestation du sol (région concernée)
  □ Contrôle électrique (si applicable)
  □ Asbestattest / attestation amiante (Flandre, si applicable)
  □ Autres : [...]

CONDITIONS SUSPENSIVES :
  □ Obtention d'un crédit hypothécaire de XXX EUR dans un délai de XX jours
  □ Absence de préemption (délai XX jours)
  □ Autre : [...]

DATE LIMITE DE SIGNATURE DE L'ACTE AUTHENTIQUE : JJ/MM/AAAA

NOTE : En Belgique, il n'existe pas de délai légal de rétractation
pour les particuliers lors d'une vente immobilière (contrairement
au délai SRU de 10 jours en France).
══════════════════════════════════════════
```

## Liste de Risques

```
🔴 CRITIQUE: [Risque majeur — action requise avant signature]
🟠 ATTENTION: [Risque modéré — à vérifier]
🟡 INFO: [Point de vigilance — recommandation]
```

## Références Légales Belges à Citer

| Domaine | Référence |
|---------|-----------|
| Code civil belge | art. X.XX Cc belge (Livre 1 à 8) |
| Code des Sociétés et des Associations | art. X:XX CSA |
| Code des Impôts sur les Revenus | art. XX CIR 92 |
| Droits d'enregistrement Flandre | art. X.X.X VCF (Vlaamse Codex Fiscaliteit) |
| Droits d'enregistrement Wallonie | art. XX CDE (Code des droits d'enregistrement wallon) |
| Droits d'enregistrement Bruxelles | art. XX CWCF (Code bruxellois) |
| Tarifs notariaux | AR du 16 décembre 1950 |
| Loi Breyne (VEFA) | Loi du 9 juillet 1971 |
| Documentation patrimoniale | AGDP — SPF Finances |
