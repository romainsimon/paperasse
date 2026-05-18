# Checklist de Conformité Facturation Électronique B2B Belge

## Informations entreprise

```
Entreprise : {{company.name}}
BCE        : {{company.bce}}
N° TVA     : BE{{company.bce}}
Forme      : {{company.legal_form}}
Régime TVA : {{regime_tva}}
Taille     : {{taille}} (micro / PME / grande entreprise)
```

## Contexte réglementaire belge

La facturation électronique B2B est obligatoire en Belgique depuis le **1er janvier 2026** (AR du 29 octobre 2024, transposant la directive DAC7 et la réforme belge). Le format requis est **UBL 2.1 / Peppol BIS 3.0**, transmis via le réseau **Peppol**.

---

## Étape 1 : Mentions obligatoires sur chaque facture (art. 5 AR du 29 juin 1992 + CTVA)

```
- [ ] Numéro séquentiel unique (numérotation continue, sans trous)
- [ ] Date de facturation
- [ ] Nom et adresse complète du fournisseur
- [ ] Numéro BCE du fournisseur (format 0xxx.xxx.xxx)
- [ ] Numéro TVA du fournisseur (format BE0xxx.xxx.xxx)
- [ ] Nom et adresse complète du client
- [ ] Numéro BCE/TVA du client (si assujetti à la TVA — format BE0xxx.xxx.xxx)
- [ ] Description des biens ou services fournis
- [ ] Date de livraison / d'exécution de la prestation (si différente de la date de facturation)
- [ ] Base d'imposition par taux TVA (montant HTVA)
- [ ] Taux TVA applicable (21%, 12%, 6% ou 0%)
- [ ] Montant TVA dû
- [ ] Montant total TVAC
- [ ] IBAN belge (BE + 14 chiffres) et BIC pour le paiement
- [ ] Mention d'exonération si applicable (ex. : "TVA non applicable — art. 56bis CTVA"
       ou "Exonération TVA — art. 44 CTVA" ou "Autoliquidation — art. 51 § 2 CTVA")
- [ ] Mention Peppol (B2B obligatoire depuis 01/01/2026) :
       "Facture électronique transmise via Peppol (ID : 0208:{{company.bce}})"
```

---

## Étape 2 : Vérification du numéro TVA belge

```
- [ ] Format correct : BE0xxx.xxx.xxx (BE + 10 chiffres dont premier = 0)
- [ ] Numéro TVA fournisseur vérifié sur https://www.e-services.minfin.fgov.be/vatAss/
- [ ] Numéro TVA client vérifié (VIES pour clients intra-UE : https://ec.europa.eu/taxation_customs/vies/)
- [ ] Numéro BCE cohérent avec le numéro TVA (identiques sauf préfixe BE)
```

---

## Étape 3 : Conformité Peppol B2B (obligatoire depuis 01/01/2026)

```
- [ ] Inscription sur le réseau Peppol via un Access Point (AP) certifié
- [ ] Identifiant Peppol configuré : scheme 0208 + numéro BCE (ex. : 0208:0123456789)
- [ ] Format UBL 2.1 / Peppol BIS 3.0 vérifié et validé
- [ ] Test d'émission effectué avant mise en production
- [ ] Test de réception effectué (votre AP reçoit les factures entrantes)
- [ ] Fournisseurs principaux informés de votre identifiant Peppol de réception
- [ ] Logiciel de facturation compatible Peppol (ou prestataire intermédiaire)
- [ ] Notes de crédit (avoirs) également transmises via Peppol
```

---

## Étape 4 : Listing TVA annuel (obligation belge spécifique)

```
- [ ] Listing TVA annuel établi pour tous les clients assujettis belges
       dont le CA annuel dépasse 250 EUR (hors TVA)
- [ ] Listing transmis à l'administration via Intervat (https://intervat.minfin.fgov.be)
       avant le 31 mars de l'année suivante
- [ ] Clients non-assujettis (particuliers) exclus du listing
- [ ] Clients intra-UE : déclaration Intrastat si applicable (seuil 1,5 M EUR)
```

---

## Étape 5 : Conservation et archivage électronique probant

```
- [ ] Durée de conservation : 10 ans (loi du 17 juillet 1975 sur la comptabilité des entreprises)
- [ ] Archivage électronique probant : garantie d'intégrité, d'authenticité et de lisibilité
       (pas de simple scan — les fichiers Peppol UBL constituent l'original)
- [ ] Factures reçues conservées dans leur format d'origine (UBL/XML)
- [ ] Factures émises conservées avec preuve de transmission Peppol
- [ ] Accès aux factures archivées garanti pendant toute la durée légale
- [ ] Numérotation continue vérifiable (absence de trous dans la séquence)
```

> En Belgique, il n'existe pas de "Piste d'Audit Fiable" (PAF) au sens français. L'obligation équivalente est l'**archivage électronique probant** : les factures électroniques Peppol (UBL) garantissent par nature l'intégrité et l'authenticité requises.

---

## Étape 6 : Déclaration TVA périodique

```
- [ ] Régime mensuel ou trimestriel identifié
- [ ] Déclaration TVA transmise via Intervat dans les délais
       (le 20 du mois suivant la période pour les déclarants mensuels ;
        le 20 du mois suivant le trimestre pour les déclarants trimestriels)
- [ ] Paiement TVA effectué dans les mêmes délais (compte BE53 6792 0030 0054)
- [ ] Déclaration de liste intracommunautaire (listing IC) si opérations intra-UE
```

---

## Vérification finale

```
- [ ] Toutes les mentions obligatoires CTVA présentes sur les factures émises
- [ ] Numéro TVA belge format BE0xxx.xxx.xxx vérifié
- [ ] Peppol actif et testé (émission + réception)
- [ ] Listing TVA annuel préparé (clients assujettis > 250 EUR)
- [ ] Conservation 10 ans en archivage électronique probant assurée
- [ ] Numérotation séquentielle continue et sans trous
- [ ] Notes de crédit conformes et référencées à la facture d'origine
```
