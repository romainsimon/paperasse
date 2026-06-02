# Archives associatives

## Cadre

Les associations loi 1901 ne sont **pas soumises** au régime des archives publiques
(Code du patrimoine, livre II) sauf cas particulier (associations gérant un service
public, ARUP exerçant une mission d'intérêt général, etc.). Elles relèvent du
**régime des archives privées**.

En revanche, certaines durées de conservation sont imposées par :

- **Code de commerce** pour les pièces comptables ;
- **Code général des impôts** et **livre des procédures fiscales** pour les
  documents fiscaux ;
- **Code du travail** pour les documents sociaux et salariaux ;
- **Code civil** (prescriptions extinctives).

## Durées de conservation recommandées

### Documents fondateurs (durée illimitée)

À conserver tant que l'association existe, et au minimum **10 ans après
dissolution** :

- statuts originaux signés et chaque version ultérieure ;
- récépissés de déclaration en préfecture (création, modifications, dissolution) ;
- témoins de parution JOAFE ;
- PV de l'AG constitutive ;
- PV de toutes les AGE (modifications statutaires).

### Vie de l'association (durée longue)

- PV des AGO : **10 ans minimum** (utile en cas de contentieux portant sur les
  comptes ou les décisions de gestion) ;
- PV de CA et de bureau : **5 ans minimum** ;
- registre des membres / fichier d'adhérents : durée d'adhésion + **3 ans**
  (recommandation CNIL pour les associations) ;
- rapports moraux, d'activité, financiers : **10 ans minimum**.

### Documents comptables et fiscaux

| Document | Durée | Base |
|----------|-------|------|
| Livres et pièces comptables (factures, justificatifs, bilans, comptes de résultat) | **10 ans** | art. L. 123-22 C. com. |
| Documents fiscaux (déclarations, avis d'imposition) | **6 ans** | art. L. 102 B LPF |
| Documents relatifs à la TVA | **6 ans** (10 ans sur papier en pratique) | art. L. 102 B LPF |
| Documents sociaux (URSSAF, retraite, prévoyance) | **3 à 6 ans selon nature** | LPF / Code SS |
| Reçus fiscaux émis (art. 200, 238 bis CGI) | **6 ans** | art. L. 102 B LPF + art. 1740 A CGI |
| Bulletins de paie (employeur) | **5 ans** | art. L. 3243-4 C. trav. |
| Contrats de travail | **5 ans après fin de contrat** | art. L. 1471-1 C. trav. |

### Subventions publiques

Les pièces justificatives des subventions doivent être conservées **au moins
10 ans** après la date d'octroi (durée de prescription des actions en
remboursement de subvention indûment versée). Certaines conventions imposent une
durée plus longue — vérifier au cas par cas.

### Contrats

- contrats en cours : pendant toute leur durée + **5 ans après** ;
- contrats d'assurance : **2 ans après** résiliation (prescription biennale) +
  durée des sinistres pendants ;
- contrats avec collectivités publiques : **10 ans après** clôture (prescription
  quadriennale + sécurité).

### Données personnelles

Voir aussi skill `communication-parents`. Règle générale (CNIL) :

- **données des adhérents** : pendant la durée d'adhésion + **3 ans** maximum ;
- **données des dirigeants** : pendant la durée du mandat + **6 ans** (cohérent
  avec la durée de prescription de la responsabilité civile et fiscale) ;
- **données des donateurs** : pendant la durée nécessaire à l'émission du reçu
  fiscal + **6 ans** (CGI) ;
- **données des prospects / contacts** : **3 ans** à compter du dernier contact
  actif.

## Modalités d'archivage

### Support

- papier ou électronique (la loi 2000-230 du 13 mars 2000 a consacré la valeur
  probatoire de l'écrit électronique sous conditions de fiabilité) ;
- pour les actes engageant juridiquement l'association (PV de modification
  statutaire, dissolution), conservation des **originaux signés** recommandée
  (papier ou signature électronique qualifiée eIDAS).

### Sécurité

- copie de sauvegarde sur un support distinct du support principal ;
- accès restreint aux dirigeants en exercice et au liquidateur en cas de
  dissolution ;
- protection contre l'incendie, l'humidité, le vol (papier) ; chiffrement et
  sauvegardes (numérique) ;
- registre **d'index** facilitant la recherche.

### Transmission lors du changement de dirigeants

À chaque renouvellement (notamment lors d'un **changement de président**) :

1. **inventaire** des archives transmises ;
2. **PV de remise** signé entre sortant et entrant ;
3. mise à jour des accès numériques (Le Compte Asso, comptes bancaires, espace
   fiscal, drive partagé).

### Après dissolution

Le **liquidateur** est responsable de la conservation des archives jusqu'à
l'extinction des prescriptions (au minimum 10 ans). Recommandations :

- désigner formellement le dépositaire (un dirigeant final, un avocat, un cabinet
  comptable, ou l'organisme dévolutaire) ;
- consigner dans le PV de clôture la localisation des archives et l'identité du
  dépositaire ;
- pour les ARUP, possibilité de dépôt aux **Archives nationales** (procédure via
  le ministère de l'Intérieur).

## Cas particuliers

### Associations cultuelles (loi 1905)

Obligations comptables spécifiques (art. 21 loi 1905, art. 19-2 et suivants
modifiés par la loi 2021-1109 du 24/08/2021). Conservation à aligner sur les
obligations fiscales et le contrôle préfectoral. Hors-périmètre détaillé du skill.

### Associations exerçant une mission de service public

Régies en partie par le Code du patrimoine : leurs archives, le cas échéant, sont
susceptibles d'être réintégrées aux archives publiques. Cas rare → renvoyer vers un
archiviste public ou un avocat.

## Index documentaire recommandé

Structurer l'archive ainsi :

```
archives/
├── 01-fondateurs/
│   ├── statuts/
│   ├── pv-ag-constitutive/
│   ├── recepisses-prefecture/
│   └── joafe/
├── 02-ag/
│   ├── YYYY/
│   │   ├── convocation-YYYY-MM-DD.pdf
│   │   ├── pv-YYYY-MM-DD.pdf
│   │   ├── feuille-emargement.pdf
│   │   └── rapports/
├── 03-ca-bureau/
│   └── YYYY/
├── 04-comptabilite/
│   └── YYYY/
├── 05-subventions/
├── 06-contrats/
├── 07-rh/
└── 08-membres/
```

Un **fichier `index.md`** à la racine documente la convention et la dernière mise à
jour.

## Erreurs fréquentes

1. Mélanger documents fondateurs et documents courants → perte de pièces critiques.
2. Stocker uniquement sur le PC personnel d'un dirigeant → perte en cas de panne
   ou de départ.
3. Détruire à 5 ans des pièces comptables (durée 10 ans) → impossibilité de
   répondre à un contrôle fiscal portant sur l'exercice N-9.
4. Ne pas faire de PV de remise lors du changement de président → pertes,
   contestations.
5. Conserver indéfiniment les données personnelles des adhérents → infraction
   RGPD.
6. Ne pas désigner de dépositaire post-dissolution → archives perdues, contentieux
   sans preuves.
