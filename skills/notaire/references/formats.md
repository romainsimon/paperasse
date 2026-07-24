# Formats de Sortie

## Calcul de Frais de Notaire

```
FRAIS D'ACQUISITION — [Adresse du bien]
══════════════════════════════════════════

Prix de vente                          XXX XXX,XX EUR

DROITS DE MUTATION (DMTO)
  Taxe départementale (X,XX%)            X XXX,XX EUR
  Taxe communale (1,20%)                 X XXX,XX EUR
  Prélèvement État (2,37% dept.)           XXX,XX EUR
  ─────────────────────────────────────────────────────
  Total DMTO                            XX XXX,XX EUR

ÉMOLUMENTS DU NOTAIRE
  Tranche 0 - 6 500 (3,945%)              XXX,XX EUR
  Tranche 6 501 - 17 000 (1,627%)         XXX,XX EUR
  Tranche 17 001 - 60 000 (1,085%)        XXX,XX EUR
  Tranche > 60 000 (0,814%)               XXX,XX EUR
  ─────────────────────────────────────────────────────
  Total émoluments HT                    X XXX,XX EUR
  TVA (20%)                                XXX,XX EUR
  Total émoluments TTC                   X XXX,XX EUR

CONTRIBUTION DE SÉCURITÉ IMMOBILIÈRE
  CSI (0,10%)                              XXX,XX EUR

DÉBOURS (estimation)
  État hypothécaire, cadastre, etc.        XXX,XX EUR

══════════════════════════════════════════
TOTAL FRAIS D'ACQUISITION              XX XXX,XX EUR
soit X,XX% du prix de vente
══════════════════════════════════════════
```

## Calcul de Droits de Succession

```
DROITS DE SUCCESSION — [Nom du défunt]
══════════════════════════════════════════

Actif brut de succession            XXX XXX,XX EUR
Passif déductible                   -XX XXX,XX EUR
─────────────────────────────────────────────────────
Actif net de succession             XXX XXX,XX EUR

PART DE [Héritier]
  Part brute (X/X)                  XXX XXX,XX EUR
  Abattement ([lien])              -XXX XXX,XX EUR
  ─────────────────────────────────────────────────────
  Part nette taxable                XXX XXX,XX EUR

  Droits :
    Tranche 0 - 8 072 (5%)              XXX,XX EUR
    Tranche 8 073 - 12 109 (10%)        XXX,XX EUR
    ...
  ─────────────────────────────────────────────────────
  Total droits                       XX XXX,XX EUR

══════════════════════════════════════════
TOTAL DROITS DE SUCCESSION           XX XXX,XX EUR
Émoluments notaire (estimation)       X XXX,XX EUR
══════════════════════════════════════════
```

## Calcul de Plus-Value Immobilière

```
PLUS-VALUE IMMOBILIÈRE
══════════════════════════════════════════

Prix de cession                     XXX XXX,XX EUR
Prix d'acquisition                  XXX XXX,XX EUR
  + Frais d'acquisition (7,5%)      XX XXX,XX EUR
  + Travaux (15% forfait ou réel)   XX XXX,XX EUR
─────────────────────────────────────────────────────
Prix d'acquisition corrigé          XXX XXX,XX EUR

Plus-value brute                     XX XXX,XX EUR

Durée de détention : XX ans

Abattement IR (XX%)                 -XX XXX,XX EUR
Plus-value nette IR                  XX XXX,XX EUR
IR (19%)                              X XXX,XX EUR

Abattement PS (XX%)                 -XX XXX,XX EUR
Plus-value nette PS                  XX XXX,XX EUR
PS (17,2%)                            X XXX,XX EUR

Surtaxe (si PV > 50 000)               XXX,XX EUR

══════════════════════════════════════════
TOTAL IMPÔT SUR LA PLUS-VALUE        X XXX,XX EUR
══════════════════════════════════════════
```

## Projet d'Acte

Pour les projets d'actes, utiliser les templates dans `templates/` ou générer un acte avec la structure suivante :

```
[PROJET — À SOUMETTRE AU NOTAIRE INSTRUMENTAIRE]

══════════════════════════════════════════
[TYPE D'ACTE]
══════════════════════════════════════════

ENTRE LES SOUSSIGNÉS :

[Partie 1 — nom, né(e) le, à, demeurant]

ET

[Partie 2 — nom, né(e) le, à, demeurant]

IL A ÉTÉ CONVENU CE QUI SUIT :

ARTICLE 1 — OBJET
[...]

[...]

══════════════════════════════════════════
⚠️ CE DOCUMENT EST UN PROJET DE TRAVAIL.
Il ne constitue pas un acte authentique.
Seul un notaire en exercice peut authentifier cet acte.
══════════════════════════════════════════
```

## Liste de Risques

```
🔴 CRITIQUE: [Risque majeur — action requise avant signature]
🟠 ATTENTION: [Risque modéré — à vérifier]
🟡 INFO: [Point de vigilance — recommandation]
```
