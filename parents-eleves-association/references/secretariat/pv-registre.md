# Procès-verbaux et registre des décisions

## Procès-verbaux

### Cadre

La loi 1901 n'impose **pas** la rédaction de PV. En pratique, ils sont **nécessaires** :

- preuve opposable aux tiers (préfecture, banque, administration fiscale, juge) ;
- justificatif obligatoire pour toute **déclaration de modification** (statuts,
  dirigeants, dissolution) — la préfecture exige le PV de l'AG ayant adopté la
  décision ;
- archive interne de la vie démocratique de l'association.

### Contenu minimal d'un PV d'AG

1. Identité : nom de l'association, RNA, siège ;
2. Type d'AG (ordinaire, extraordinaire, mixte) ;
3. Date, heure, lieu (ou modalités si tenue à distance) ;
4. Mention de la convocation : date d'envoi, mode (e-mail, courrier, affichage) ;
5. Bureau de séance : président, secrétaire, scrutateurs éventuels ;
6. Membres : nombre total à jour de cotisation, nombre présents, nombre représentés,
   total présents + représentés, quorum constaté ;
7. Ordre du jour rappelé ;
8. Pour chaque résolution :
   - texte exact de la résolution ;
   - voix pour / contre / abstentions ;
   - mention « adoptée » ou « rejetée » ;
9. Annexes : feuille d'émargement signée, pouvoirs reçus, rapports présentés ;
10. Signatures : président de séance + secrétaire de séance (scrutateurs si
    désignés).

### Contenu minimal d'un PV de CA ou de bureau

1. Date, heure, lieu ;
2. Convocation (par qui, date) ;
3. Présents, absents excusés, absents non excusés, représentés ;
4. Quorum constaté ;
5. ODJ ;
6. Pour chaque délibération : exposé synthétique, décision, vote ;
7. Signatures : président + secrétaire (au minimum).

### Délai et diffusion

- **Rédaction** : dans un délai raisonnable (recommandé : 15 jours).
- **Signature** : avant diffusion (ne jamais diffuser un PV non signé sauf à
  préciser « projet de PV »).
- **Diffusion aux membres** : selon modalités statutaires (e-mail, courrier,
  affichage, plateforme).
- **Conservation** : voir [archives.md](archives.md).

### Forme

- format libre ;
- en français ;
- numérotation conseillée (« PV de l'AGO du JJ/MM/AAAA », n° d'ordre annuel) ;
- support papier ou électronique (signature électronique acceptable depuis loi
  2000-230 du 13/03/2000 et règlement eIDAS).

## Registre des décisions

### Statut juridique actuel

L'article 5 du décret du 16 août 1901 imposait la tenue d'un « **registre spécial**
sur lequel devaient être consignés les changements survenus dans
l'administration ainsi que les modifications apportées aux statuts ».

Cet article a été **abrogé par l'ordonnance n° 2015-904 du 23 juillet 2015**
(« portant simplification du régime des associations et des fondations »),
article 1er. Source : Légifrance, version consolidée du décret du 16/08/1901.

**Conséquence** : depuis le **23/07/2015**, plus aucune obligation légale de tenir
un registre spécial pour les associations loi 1901 en France métropolitaine.

### Pratique recommandée malgré l'abrogation

Tenir un **registre des décisions** (sous forme papier ou numérique) reste
**fortement recommandé** :

- centralise la chronologie de la vie de l'association (succession des AG, CA,
  bureaux, élections, modifications statutaires, déclarations préfecture) ;
- facilite la production de pièces lors d'un contrôle (URSSAF, fisc, mairie pour
  une subvention) ou d'un changement de dirigeant ;
- permet à un nouveau bureau de comprendre l'histoire de l'association.

### Format conseillé

Un classeur ou répertoire numérique structuré chronologiquement :

```
registre/
├── YYYY/
│   ├── YYYY-MM-DD-ag-ordinaire.pdf
│   ├── YYYY-MM-DD-ca.pdf
│   ├── YYYY-MM-DD-bureau.pdf
│   ├── YYYY-MM-DD-recepisse-prefecture.pdf
│   └── YYYY-MM-DD-temoin-joafe.pdf
└── statuts/
    ├── YYYY-MM-DD-statuts-vN.pdf  (version + date d'adoption)
    └── YYYY-MM-DD-rapport-activite.pdf
```

Plus une **table des matières** (`registre/index.md` ou tableur) listant les PV
avec : date, type, décisions principales, lien vers le fichier.

### Régimes particuliers

- **Associations cultuelles** régies par la loi du 9 décembre 1905 et par la loi
  1901 modifiée : obligations spécifiques (compte annuel, déclaration des
  ressources étrangères depuis la loi 2021-1109 du 24/08/2021). Hors-périmètre de
  ce skill.
- **Alsace-Moselle** (Code civil local) : régime distinct, registre des
  associations tenu par le tribunal judiciaire. Voir [alsace-moselle.md](alsace-moselle.md).

## Modèles de PV

Voir les templates :

- [`../templates/pv-ag-constitutive.md`](../templates/pv-ag-constitutive.md)
- [`../templates/pv-ag-ordinaire.md`](../templates/pv-ag-ordinaire.md)
- [`../templates/pv-ag-extraordinaire.md`](../templates/pv-ag-extraordinaire.md)
- [`../templates/pv-ag-dissolution.md`](../templates/pv-ag-dissolution.md)

## Erreurs fréquentes

1. PV non signé → inopposable. Toujours signer (papier ou signature électronique).
2. PV signé uniquement par le président alors que les statuts exigent
   président + secrétaire de séance → vice de forme.
3. Décision actée hors ODJ → décision attaquable.
4. Vote non détaillé (pas de mention pour/contre/abstention) → contestation possible.
5. PV diffusé avant signature → version finale différente en circulation → confusion.
6. Modifications a posteriori sans nouveau vote → falsification, faute pénale
   possible.
7. Annexes manquantes (pouvoirs, feuille d'émargement) → preuve fragilisée en cas
   de contestation.
