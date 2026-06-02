# Canaux de diffusion — mail, messageries, RS

Comment constituer et maintenir des canaux conformes RGPD pour une APE.

## Mailing parents

### Constitution de la liste

- **Opt-in dédié** : case à cocher distincte au moment de l'adhésion, *non pré-cochée*
  (CJUE, Planet49, C-673/17). Libellé clair : « J'accepte de recevoir la newsletter
  de l'APE [Nom] (1 à 2 envois par mois). Je peux me désabonner à tout moment via le
  lien en bas de chaque message. »
- **Trace** : date, canal, IP/preuve d'horodatage, version du libellé. Conserver tant
  que la personne est abonnée.
- **Source unique** : ne **pas** importer la liste du carnet de l'école, ni les
  coordonnées récupérées dans le cadre d'une autre finalité (sortie ponctuelle,
  événement passé) sans réinviter à un opt-in.

### Mentions obligatoires de chaque message

- Identité du responsable (« APE [Nom] »).
- Adresse de réponse opérationnelle (pas une no-reply à l'aveugle).
- **Lien de désinscription** dans chaque message, fonctionnel en 1 clic.
- Lien vers la politique de confidentialité.
- Mentions éditoriales si la newsletter est éligible LCEN (voir [newsletter.md](newsletter.md)).

### Outils

Privilégier des plateformes UE et conformes art. 28 RGPD :

| Outil | Pays | DPA art. 28 | Notes |
|-------|------|-------------|-------|
| Brevo (ex-Sendinblue) | FR | https://www.brevo.com/legal/termsofuse/ | DPA accessible, hébergement UE |
| Mailjet | FR | https://www.mailjet.com/legal/dpa/ | Hébergement UE |
| Sendinblue / Mailjet via HelloAsso | FR | inclus dans CGU HelloAsso | |
| Mailchimp | US | DPA via CCT | Acceptable, transferts US à documenter |
| Outlook / Gmail en BCC | — | — | Non recommandé : pas de désinscription auto, fuites BCC fréquentes |

**Règle d'or** : ne jamais envoyer un mailing à plus de 30 destinataires en BCC. Utiliser
une vraie plateforme.

### Désinscription

- Lien de désinscription effectif en 1 clic, sans authentification supplémentaire (EDPB
  05/2020).
- Après désinscription : suppression de l'adresse de la liste **et** marquage en base de
  données pour ne pas la rajouter par erreur lors d'un futur import.
- Conserver la trace du désabonnement (date) pour démontrer le respect en cas de contrôle.

## Groupes WhatsApp / Signal / Messenger

### Préalable

Un numéro de portable est une donnée à caractère personnel. Ouvrir un groupe et y
ajouter des numéros sans accord = traitement sans base légale.

### Avant d'ouvrir un groupe

1. Annoncer aux parents le projet de groupe (objet, finalité, modération).
2. Recueillir un **opt-in explicite** par mail ou formulaire.
3. Publier une **charte du groupe** (voir modèle ci-dessous).
4. Désigner un ou deux administrateurs identifiés.

### Modèle de charte de groupe

```
CHARTE DU GROUPE [Nom] — [WhatsApp / Signal]

Objet : coordination des parents de la classe de [niveau], année [AAAA/AAAA].
Administrateurs : [Prénom Nom], [Prénom Nom].
Adhésion : sur invitation, après accord écrit du parent.
Retrait : sur simple demande à un administrateur, sans justification.

Règles :
1. Sujets : exclusivement les activités de l'APE et la coordination logistique.
2. Pas de partage de coordonnées tierces, ni de photos d'enfants sans accord
   préalable des deux parents.
3. Pas de propos politiques, religieux, commerciaux, ni de propos visant
   l'établissement, les enseignants ou les autres parents.
4. Pas de partage d'informations relatives à la santé d'un enfant tiers.
5. Modération : l'administrateur peut retirer un message non conforme et, après
   un rappel, exclure un membre.
6. Sécurité : le groupe utilise un chiffrement de bout en bout. Les messages
   restent néanmoins potentiellement consultables par les membres ; éviter les
   sujets sensibles.

Données traitées : numéro de portable, prénom et nom affichés, contenu des
messages, présence dans le groupe.
Sous-traitant : [WhatsApp Inc. / Signal Foundation] — hébergement potentiellement
hors UE (CCT applicables).
Conservation : tant que la personne est membre du groupe.
Droits : retrait à tout moment, accès aux données via la fonction « exporter mes
données » de l'application.

Référent données : [mail].
```

### Risques propres aux messageries

- **Fuite** : une capture d'écran peut sortir du groupe à tout moment.
- **Hébergement hors UE** : WhatsApp et Messenger (Meta) hébergent aux US.
  Acceptable si les CCT sont en place et si on n'y traite pas de données sensibles.
- **Pression collective** : un parent peut se sentir contraint d'accepter. Toujours
  formuler l'invitation comme facultative.

## Site web associatif

### Hébergeur

Privilégier un hébergeur UE (OVHcloud, Infomaniak, Gandi, Scaleway, Hetzner). Hébergeur
français = simplification administrative en cas de contrôle CNIL.

### Pages obligatoires

- Mentions légales (LCEN art. 6 III) : nom de l'association, RNA, adresse,
  directeur de la publication, hébergeur (nom + adresse + téléphone).
- Politique de confidentialité (voir [politique-confidentialite.md](politique-confidentialite.md)).
- Bannière cookies si traceurs non strictement nécessaires.

### Bonnes pratiques

- HTTPS systématique (Let's Encrypt gratuit).
- Pas de tracker tiers (Google Analytics → préférer Matomo en mode exempté).
- Pas de plug-in social tiers qui charge en silence des cookies (boutons « partager »
  qui exposent l'IP).

## Réseaux sociaux

- Distinguer un **compte associatif** (administré collégialement, 2FA, mots de passe
  partagés via gestionnaire) et un compte personnel.
- Au moins deux administrateurs (continuité en cas d'absence).
- Vérifier avant chaque publication : autorisation image cercle 3 pour les visages
  identifiables.
- Ne pas réagir aux commentaires sensibles depuis le compte officiel sans validation
  du bureau (voir [communication-crise.md](communication-crise.md)).
- Désactiver le tagging libre quand la plateforme le permet (Facebook / Instagram).

## Hébergement des données — préférence UE

| Type | Préférence |
|------|------------|
| Mail associatif | UE (Gandi, Infomaniak, OVH) |
| Site web | UE (OVH, Infomaniak, Scaleway, Gandi) |
| Stockage documents bureau | UE (Nextcloud auto-hébergé ou cloud UE) |
| Mailing | UE (Brevo, Mailjet) |
| Adhésion / billetterie | UE (HelloAsso, AssoConnect) |
| Données de santé (PAI, allergies) | **HDS** (Hébergeur Données de Santé certifié) si stockage durable ; à défaut, papier sécurisé et destruction rapide |

Pour les solutions hors UE (Google Workspace, Microsoft 365) : vérifier que les CCT
sont signées, que l'option « stockage UE » est activée (si dispo), et que les
journaux d'accès sont consultables.

## Cas particuliers

- **Groupes Telegram** : déconseillés par défaut (par défaut sans chiffrement E2E sur
  les groupes), à moins d'usage parfaitement compris des membres.
- **Discord** : hébergé US, à éviter pour un public de mineurs.
- **Liste de diffusion type Sympa / Mailman auto-hébergée** : excellent en termes de
  contrôle, plus exigeant en gestion.
