# Setup guidé — `association.json` + profil communication

À utiliser à la première conversation, ou si seul `association.example.json` existe à la
racine du projet, ou si le profil communication n'est pas encore connu.

## Objectif

Disposer de deux jeux d'informations :

1. **`association.json` (partagé entre skills APE)** — identité, siège, instances, membres,
   exercice social, agréments. Modèle : `association.example.json` à la racine du repo.
2. **Profil communication (propre à ce skill)** — canaux actifs, hébergeurs, conformité
   RGPD (registre, politique de confidentialité, autorisations image, charte canaux).
   Stocké séparément (`communication-parents/profil-comm.json` non versionné, ou repris
   en mémoire de session si l'utilisateur ne souhaite pas écrire de fichier).

## §1. Identification — alimente `association.json`

Si `association.json` n'existe pas, proposer à l'utilisateur de le créer à partir du
modèle partagé `association.example.json`. Champs à recueillir prioritairement pour la
communication :

- `identite.nom`, `identite.sigle`, `identite.regime` (loi-1901 / -RUP / -1908).
- `identifiants.rna` (W + 9 chiffres), `identifiants.siret` si attribué.
- `siege.adresse`, `siege.code_postal`, `siege.ville`.
- `instances.dirigeants_actuels` (au minimum : Président·e, Trésorier·e, Secrétaire).
- `exercice_social` (utile pour planifier la newsletter et l'AG).

## §2. Profil communication — propre au skill

À recueillir lors de la première conversation :

### Référents

- DPO ou référent données : prénom, nom, mail (ou « pas de DPO formel, président·e tient
  le rôle de référent »).
- Référent communication : prénom, nom, mail.

### Canaux actifs

- Site web : URL + hébergeur + pays.
- Mail asso : adresse + hébergeur.
- Mailing : plateforme utilisée + indication UE oui/non.
- Réseaux sociaux : liste des canaux.
- Messageries privées (WhatsApp / Signal / autre) : nombre de groupes, finalité.

### Conformité

- Registre des traitements à jour : oui / non + date de dernière révision.
- Politique de confidentialité publiée : oui / non + URL.
- Autorisations image en place : oui / non + date du dernier formulaire diffusé.
- Charte des canaux de discussion : oui / non.
- Procédure violation : oui / non.

### Cas particuliers

- Activités impliquant la santé d'enfants (sorties, péri) : oui / non.
- Captation vidéo régulière (livestream événements) : oui / non.
- Partenariats médias (presse locale, mairie) : oui / non.
- Sous-traitants hors UE : lister.

## Format `profil-comm.json` (optionnel)

Si l'utilisateur souhaite persister le profil :

```json
{
  "referents": {
    "dpo_ou_referent": {
      "designation_formelle": false,
      "prenom": "Prénom",
      "nom": "Nom",
      "mail": "..."
    },
    "communication": {"prenom": "Prénom", "nom": "Nom", "mail": "..."}
  },
  "canaux": {
    "site_web": {"url": "https://...", "hebergeur": "Infomaniak", "pays_hebergeur": "CH"},
    "mail_asso": {"adresse": "contact@asso.fr", "hebergeur": "Infomaniak"},
    "mailing": {"plateforme": "Brevo", "ue": true},
    "reseaux_sociaux": ["facebook", "instagram"],
    "messageries_privees": [
      {"type": "whatsapp", "nb_groupes": 4, "finalite": "coordination_classes"}
    ]
  },
  "conformite": {
    "registre_traitements_a_jour": false,
    "date_derniere_revision_registre": null,
    "politique_confidentialite_publiee": false,
    "url_politique_confidentialite": null,
    "autorisations_image": {
      "format_en_place": "v1_3_cercles",
      "date_derniere_diffusion": "2025-09-01"
    },
    "charte_canaux": false,
    "procedure_violation": false
  },
  "cas_particuliers": {
    "donnees_sante_enfants": true,
    "captation_video_reguliere": false,
    "partenariats_medias": ["journal municipal"],
    "sous_traitants_hors_ue": ["WhatsApp (Meta, US, CCT en place)"]
  }
}
```

Ce fichier **ne doit pas être versionné** (PII potentielle). À ajouter au `.gitignore`
local du projet utilisateur (`profil-comm.json`).

## §3. Recommandations initiales

À partir des réponses, dresser une liste de priorités sur 3 mois :

- Registre non à jour → ouvrir une fiche par traitement (modèle dans
  `references/registre-traitements.md`).
- Politique de confidentialité non publiée → générer à partir du modèle
  `references/politique-confidentialite.md`.
- Pas de charte WhatsApp / Signal → générer à partir du modèle
  `references/canaux-diffusion.md`.
- Autorisations image > 12 mois sans révision → re-diffuser (modèle
  `references/modele-autorisation-image.md`).
- Sous-traitant hors UE non documenté → vérifier les clauses contractuelles types (CCT)
  et l'inscrire au registre.

Présenter sous forme de plan d'action mensuel, pas une liste de 30 actions à la fois.
