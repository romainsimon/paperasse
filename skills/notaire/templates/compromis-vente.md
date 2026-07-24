# Compromis de Vente (Promesse Synallagmatique de Vente)

[PROJET — À SOUMETTRE AU NOTAIRE INSTRUMENTAIRE]

---

## ENTRE LES SOUSSIGNÉS

### LE VENDEUR

**Nom** : {{vendeur.nom}}
**Prénom** : {{vendeur.prenom}}
**Né(e) le** : {{vendeur.date_naissance}} à {{vendeur.lieu_naissance}}
**Nationalité** : {{vendeur.nationalite}}
**Demeurant** : {{vendeur.adresse}}
**Situation matrimoniale** : {{vendeur.situation_matrimoniale}}
**Régime matrimonial** : {{vendeur.regime_matrimonial}} (contrat reçu par Maître {{vendeur.notaire_mariage}} le {{vendeur.date_contrat_mariage}})

Ci-après dénommé « le Vendeur »,

### L'ACQUÉREUR

**Nom** : {{acquereur.nom}}
**Prénom** : {{acquereur.prenom}}
**Né(e) le** : {{acquereur.date_naissance}} à {{acquereur.lieu_naissance}}
**Nationalité** : {{acquereur.nationalite}}
**Demeurant** : {{acquereur.adresse}}
**Situation matrimoniale** : {{acquereur.situation_matrimoniale}}
**Régime matrimonial** : {{acquereur.regime_matrimonial}}

Ci-après dénommé « l'Acquéreur »,

---

## IL A ÉTÉ CONVENU CE QUI SUIT

### ARTICLE 1 — OBJET

Le Vendeur s'engage à vendre à l'Acquéreur, qui s'engage à acquérir, le bien immobilier ci-après désigné, aux prix, charges et conditions ci-après.

### ARTICLE 2 — DÉSIGNATION DU BIEN

**Nature** : {{bien.nature}} (appartement / maison / terrain / local commercial)
**Adresse** : {{bien.adresse}}
**Commune** : {{bien.commune}} ({{bien.code_postal}})
**Département** : {{bien.departement}}
**Étage** : {{bien.etage}} (si applicable)
**Références cadastrales** : Section {{bien.section}}, parcelle n°{{bien.parcelle}}, lieudit {{bien.lieudit}}
**Contenance cadastrale** : {{bien.contenance}} m²
**Surface habitable** : {{bien.surface_habitable}} m²
**Surface loi Carrez** : {{bien.surface_carrez}} m² (si copropriété)
**Nombre de pièces** : {{bien.nb_pieces}}

**Désignation des lots de copropriété** (si applicable) :
- Lot n°{{lot.numero}} : {{lot.description}}, {{lot.tantiemes}}/{{copropriete.tantiemes_total}} tantièmes

**Annexes et dépendances incluses** :
- {{bien.annexes}} (cave, parking, garage, jardin, etc.)

### ARTICLE 3 — ORIGINE DE PROPRIÉTÉ

Le Vendeur est propriétaire du bien pour l'avoir acquis de {{origine.vendeur_precedent}} aux termes d'un acte reçu par Maître {{origine.notaire}} le {{origine.date}}, publié au service de la publicité foncière de {{origine.spf}} le {{origine.date_publication}}, volume {{origine.volume}}, numéro {{origine.numero}}.

### ARTICLE 4 — PRIX

Le présent bien est vendu au prix de **{{prix.montant}} EUR** ({{prix.montant_lettres}} euros).

Ce prix sera payé comptant le jour de la signature de l'acte authentique, par virement bancaire sur le compte séquestre du notaire.

### ARTICLE 5 — DÉPÔT DE GARANTIE

L'Acquéreur verse ce jour au Vendeur (ou au notaire séquestre) un dépôt de garantie de **{{depot_garantie.montant}} EUR** ({{depot_garantie.pourcentage}}% du prix), qui s'imputera sur le prix le jour de la vente.

Ce dépôt de garantie sera :
- Conservé par Maître {{notaire.nom}}, notaire à {{notaire.ville}}, en qualité de séquestre
- Restitué à l'Acquéreur en cas de rétractation dans le délai légal ou de non-réalisation d'une condition suspensive
- Acquis au Vendeur à titre de dommages et intérêts forfaitaires en cas de défaillance de l'Acquéreur

### ARTICLE 6 — CONDITIONS SUSPENSIVES

La présente vente est consentie sous les conditions suspensives suivantes :

**6.1. Obtention de prêt**

L'Acquéreur déclare avoir l'intention de recourir à un ou plusieurs emprunts pour financer l'acquisition.

Caractéristiques du prêt recherché :
- Montant maximum : {{pret.montant}} EUR
- Durée maximum : {{pret.duree}} ans
- Taux d'intérêt maximum (hors assurance) : {{pret.taux_max}}%

L'Acquéreur s'engage à déposer une ou plusieurs demandes de prêt dans un délai de **10 jours** à compter de la signature des présentes. La condition suspensive d'obtention de prêt doit être réalisée au plus tard le **{{pret.date_limite}}**.

En cas de non-obtention du prêt, l'Acquéreur devra produire une ou plusieurs attestations de refus.

**6.2. Absence de préemption**

La vente est subordonnée à la non-exercice du droit de préemption par :
- La commune au titre du droit de préemption urbain
- La SAFER (si applicable)
- Le locataire en place (si applicable)

**6.3. Absence de servitude non révélée**

La vente est subordonnée à l'absence de servitude d'urbanisme ou d'utilité publique non révélée par le Vendeur et de nature à rendre le bien impropre à sa destination.

**6.4. Situation hypothécaire**

La vente est subordonnée à ce que l'état hypothécaire ne révèle pas d'inscription ou de charge grevant le bien et non susceptible d'être levée au jour de la signature de l'acte authentique.

### ARTICLE 7 — DÉLAI DE RÉTRACTATION

Conformément à l'article L271-1 du Code de la construction et de l'habitation, l'Acquéreur dispose d'un délai de **dix jours** à compter du lendemain de la notification des présentes pour exercer sa faculté de rétractation.

La rétractation doit être notifiée au Vendeur par lettre recommandée avec accusé de réception. L'Acquéreur n'a pas à motiver sa décision. Le dépôt de garantie lui sera restitué dans un délai de vingt-et-un jours.

### ARTICLE 8 — JOUISSANCE

L'Acquéreur aura la jouissance du bien par la prise de possession réelle le jour de la signature de l'acte authentique, après paiement intégral du prix et des frais.

### ARTICLE 9 — ÉTAT DU BIEN

Le bien est vendu dans l'état où il se trouve au jour des présentes, l'Acquéreur déclarant le connaître pour l'avoir visité.

Le Vendeur déclare qu'à sa connaissance, le bien n'est affecté d'aucun vice caché.

### ARTICLE 10 — CHARGES ET CONDITIONS

Le bien est vendu :
- Libre de toute location (ou : avec le bail consenti à {{locataire.nom}}, en date du {{locataire.date_bail}})
- Libre de toute occupation
- Avec les servitudes actives et passives y attachées

### ARTICLE 11 — URBANISME

Le Vendeur déclare :
- Que le bien se situe en zone **{{urbanisme.zone}}** du PLU de la commune
- Qu'aucun arrêté de péril ou d'insalubrité n'a été pris
- Qu'aucune procédure d'expropriation n'est en cours
- Que les travaux réalisés ont fait l'objet des autorisations nécessaires

### ARTICLE 12 — DIAGNOSTICS TECHNIQUES

Le Dossier de Diagnostic Technique (DDT) est annexé aux présentes et comprend :
- [ ] DPE (Diagnostic de Performance Énergétique)
- [ ] Amiante (si construction avant 01/07/1997)
- [ ] Plomb — CREP (si construction avant 01/01/1949)
- [ ] Électricité (si installation > 15 ans)
- [ ] Gaz (si installation > 15 ans)
- [ ] Termites (si zone déclarée)
- [ ] ERP (État des Risques et Pollutions)
- [ ] Assainissement (si non raccordé)
- [ ] Bruit (si zone PEB)
- [ ] Surface loi Carrez (si copropriété)
- [ ] Audit énergétique (si DPE E, F ou G et maison)

### ARTICLE 13 — FRAIS

Tous les frais, droits et émoluments de l'acte authentique sont à la charge de l'Acquéreur, conformément à l'usage.

### ARTICLE 14 — DATE LIMITE DE SIGNATURE

L'acte authentique de vente devra être signé au plus tard le **{{date_limite_acte}}** devant Maître {{notaire.nom}}, notaire à {{notaire.ville}}.

### ARTICLE 15 — ÉLECTION DE DOMICILE

Pour l'exécution des présentes, les parties font élection de domicile en l'étude de Maître {{notaire.nom}}, notaire à {{notaire.ville}}, {{notaire.adresse}}.

---

Fait à {{lieu_signature}}, le {{date_signature}}, en {{nb_exemplaires}} exemplaires originaux.

**Le Vendeur** : _________________________ (signature précédée de la mention "Lu et approuvé")

**L'Acquéreur** : _________________________ (signature précédée de la mention "Lu et approuvé")

---

⚠️ **CE DOCUMENT EST UN PROJET DE TRAVAIL.**
Il ne constitue pas un acte authentique. Seul un notaire en exercice peut instrumenter la vente.
Les parties sont invitées à faire vérifier ce document par leur notaire avant signature.
