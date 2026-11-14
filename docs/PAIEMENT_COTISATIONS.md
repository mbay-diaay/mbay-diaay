# Paiement des cotisations : liens de paiement et agrégateur

État au 13/11/2026 : **côté web en démonstration seulement**. Aucun agrégateur de paiement n'est relié, et l'API
serveur n'a pas encore ces routes. Ce document fixe le contrat pour la suite.

## Règles métier (déjà appliquées côté web)

- **Seul un membre cotise** : un paiement ou un lien de paiement est refusé pour un candidat, un suspendu ou un sorti.
- **Un producteur devient membre** par l'action « Inscrire un membre » (écran Cotisations, droit `member.manage`) ;
  il reste individuel ou dans son GIE. L'écran Cotisations montre le GIE (ou « Individuel ») et filtre dessus.
- **Paiement manuel** (espèces, mobile money, virement) : saisi par un responsable (`contribution.manage`), avec une
  référence de transaction facultative. Reçu numéroté créé, annulation par contre-écriture avec motif.
- **Lien de paiement** : généré pour une période et un montant, valable 7 jours, à usage unique. Un nouveau lien pour la
  même période annule l'ancien. On le copie, ou on l'envoie par WhatsApp, SMS ou e-mail (jamais envoyé tout seul).

## Raccordement à un agrégateur (à faire)

Fournisseurs envisagés : Wave, Orange Money, PayTech, CinetPay. Le choix et le contrat commercial sont à décider.

1. `POST /v1/scoops/:scoopId/payment-links` (`contribution.manage`) : `{ memberId, period, amount }` → `{ id, token,
   expiresAt }`. Refuse un non-membre.
2. `GET /v1/public/payment-links/:token` (public, limité) : coopérative, prénom + initiale, période, montant, état.
3. `POST /v1/public/payment-links/:token/checkout` (public, limité) : crée la transaction chez l'agrégateur et renvoie
   l'adresse de paiement où rediriger le membre.
4. `POST /v1/payments/webhook/:provider` (public) : confirmation de l'agrégateur. **La signature est contrôlée** (secret
   du fournisseur, dans l'environnement) ; seule cette route règle le lien : enregistre la cotisation (méthode
   « mobile money », référence du fournisseur), marque le lien « payé », une seule fois (idempotent sur la référence).
5. Côté web : `VITE_PAYMENT_PROVIDER=<id>` active le bouton « Payer en ligne » de la page `/payer/:token`.

## Sécurité

- Le jeton du lien est le seul secret : 28 caractères tirés au hasard, expiration 7 jours, jamais affiché ailleurs.
- La page publique ne montre ni téléphone, ni adresse, ni nom de famille complet.
- Le navigateur du membre ne règle jamais un lien : seul le serveur, après contrôle de la signature de l'agrégateur.
- Les montants viennent du lien créé par le responsable, jamais d'un paramètre de la page.
- En démonstration, le paiement simulé n'existe que si `VITE_DEMO_MODE=true` et qu'aucun agrégateur n'est relié.
