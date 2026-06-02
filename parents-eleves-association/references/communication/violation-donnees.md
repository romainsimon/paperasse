# Violation de données — notification

Référence : RGPD art. 33-34.

## Définition (art. 4.12)

Une **violation de données à caractère personnel** est une violation de la sécurité
entraînant, de manière accidentelle ou illicite, la destruction, la perte, l'altération,
la divulgation non autorisée de données, ou l'accès non autorisé.

## Exemples APE

- Mail collectif envoyé en TO/CC au lieu de BCC, exposant 80 adresses.
- Tableur Excel des adhérents partagé par erreur sur un Drive public.
- Téléphone du président volé avec des fiches enfants non chiffrées.
- Compte de la plateforme mailing compromis, envoi malveillant.
- Captures d'un PAI enfant publiées sur un groupe WhatsApp ouvert.

## Procédure d'urgence (« kit incident »)

1. **Heure H** — Identifier les faits, la nature, l'étendue.
2. **H + 1 h** — Bureau alerté, désigner un référent.
3. **H + 4 h** — Contenir : changer mots de passe, fermer un accès, retirer une
   publication.
4. **H + 24 h** — Évaluer le risque pour les personnes.
5. **H + 72 h max** — Notifier la CNIL si risque pour les droits et libertés.
6. **Sans délai après évaluation** — Notifier les personnes si risque élevé.
7. **À froid** — Bilan en CA, mise à jour des procédures, mise à jour du registre.

## Notification CNIL (art. 33)

À réaliser dans **72 h** sauf si la violation n'est **pas** susceptible d'engendrer un
risque pour les droits et libertés.

Téléservice : https://notifications.cnil.fr/notifications/index

Contenu de la notification :

- Nature de la violation, catégories et nombre de personnes concernées, catégories et
  nombre de fichiers concernés.
- Coordonnées du DPO ou du référent.
- Conséquences probables.
- Mesures prises ou proposées pour atténuer la violation.

Si toutes les informations ne sont pas disponibles dans les 72 h : notifier dans le délai
avec les éléments connus, puis compléter ensuite (art. 33.4).

## Notification aux personnes concernées (art. 34)

Obligatoire si la violation engendre un **risque élevé**. Forme : claire et simple,
permettant à la personne de comprendre l'incident et d'agir.

Contenu :

- Nature de la violation.
- Coordonnées du référent.
- Conséquences probables.
- Mesures prises.
- Recommandations pour la personne (changer son mot de passe, surveiller un compte).

Exceptions (art. 34.3) : chiffrement rendant les données inintelligibles, mesures
postérieures rendant le risque non probable, effort disproportionné (communication
publique alors).

## Registre des violations

Tenir un journal interne de **toutes** les violations, qu'elles aient été notifiées ou
non, avec :

- Date / heure / détection.
- Nature et faits.
- Personnes concernées (catégories + nombre).
- Évaluation du risque (faible / élevé).
- Décisions de notification (CNIL oui/non, personnes oui/non, motifs).
- Mesures correctives.
- Suite donnée.

À conserver pendant 5 ans minimum.

## Bonnes pratiques préventives

- Mailing exclusivement via une plateforme (jamais BCC manuel > 30).
- Pas de tableurs adhérents en clair sur un Drive grand public.
- 2FA sur les comptes plateformes (mail asso, mailing, RS).
- Suppression effective des comptes lors du départ d'un bénévole.
- Sauvegardes chiffrées, restauration testée annuellement.
- Charte de canal : interdiction de partager des données sensibles sur WhatsApp.

## En cas de doute sur la notification

- Si données non sensibles, échelle limitée, contention rapide → souvent pas de
  notification CNIL, mais journaliser.
- Si mineurs concernés, données sensibles, ou échelle > 100 personnes → notification
  recommandée par prudence.
- Si presse ou autorités impliquées → notifier systématiquement et obtenir un conseil
  juridique.
