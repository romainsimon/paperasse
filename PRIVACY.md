# Politique de confidentialité

*Dernière mise à jour : 10 novembre 2026*

Paperasse est un ensemble de skills et de scripts open source pour agents IA. Il n'a **ni serveur, ni compte, ni télémétrie**.

## Ce que Paperasse collecte

Rien. Paperasse ne reçoit, ne collecte et ne conserve aucune donnée. Aucune statistique d'usage n'est envoyée.

## Ce qui reste sur votre machine

Les skills lisent les fichiers que vous leur fournissez : le contexte de votre entreprise (`company.json` : raison sociale, SIREN, adresse, coordonnées bancaires), votre foyer fiscal, vos relevés bancaires, vos factures et votre FEC. Les scripts écrivent leurs résultats localement (`data/transactions/`, `data/invoices/`, `output/`). Vous pouvez les supprimer à tout moment.

## Services tiers

Certains scripts appellent des services tiers, uniquement quand vous lancez la commande concernée : Qonto, Stripe et Pennylane avec vos propres clés (désactivés par défaut), et des API publiques françaises pour la recherche d'adresses, de parcelles, de risques, de ventes immobilières, d'entreprises et d'actes de décès. La liste complète, avec les données envoyées à chacun, est dans la section [Données et services externes](README.md#données-et-services-externes) du README. Ces services appliquent leur propre politique de confidentialité.

## L'agent et le modèle d'IA

Ce que votre agent envoie au modèle d'IA (vos questions, les fichiers qu'il lit) dépend de l'agent et du fournisseur que vous utilisez, et de leur politique de confidentialité, pas de Paperasse.

## Contact

Pour toute question : ouvrez une issue sur https://github.com/romainsimon/paperasse/issues.

---

## Privacy policy (English summary)

Paperasse has no server, no account and no telemetry: it receives, collects and retains no data. Skills read files you provide and scripts write their output on your machine. Some scripts call third-party services only when you run them (Qonto, Stripe and Pennylane with your own keys, off by default, and French public APIs), listed in the README. What your agent sends to its AI model is governed by your agent and model provider. Contact: GitHub issues.
