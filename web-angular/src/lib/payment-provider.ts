/**
 * Paiement en ligne des cotisations : point de raccordement à un agrégateur (Wave, Orange Money, PayTech, CinetPay…).
 *
 * Aucun agrégateur n'est relié pour l'instant. Quand il le sera :
 * 1. `VITE_PAYMENT_PROVIDER` prend son identifiant (par exemple `paytech`) ;
 * 2. le serveur crée la transaction chez l'agrégateur depuis le lien de paiement et y redirige le membre ;
 * 3. l'agrégateur confirme par un rappel signé (webhook) ; seul le serveur, après contrôle de la signature, appelle
 *    le règlement du lien (`settlePaymentLink`) : jamais le navigateur du membre.
 *
 * Tant qu'aucun agrégateur n'est relié, le lien montre le montant à payer et la démonstration propose un paiement
 * simulé ; en production, un paiement se saisit à la main (espèces, mobile money, virement) depuis l'écran Cotisations.
 */
export const PAYMENT_PROVIDER: string | null =
  (import.meta.env["VITE_PAYMENT_PROVIDER"] as string | undefined)?.trim() || null;

/** Vrai quand un agrégateur de paiement est relié. */
export const aggregatorConnected = (): boolean => PAYMENT_PROVIDER !== null;

/** Adresse publique d'un lien de paiement : courte, pour tenir dans un SMS ou un message WhatsApp. */
export const paymentLinkUrl = (token: string, origin: string): string => `${origin}/payer/${token}`;

/**
 * Moyens de paiement proposés au membre. Chacun s'active quand l'agrégateur qui le porte est relié ; tant que ce n'est
 * pas fait, le choix reste visible et le paiement répond « moyen de paiement non configuré ».
 *
 * Logos officiels servis en local (CSP `img-src 'self'`), dans `public/brand/paiement/` :
 * Wave (icône de wave.com), Orange Money (Wikimedia Commons « Logo Orange Money.svg »), Mixx by Yas, ex-Free Money
 * (icône de l'application « My Free », App Store), Visa et Mastercard (Wikimedia Commons).
 */
export interface PaymentChannel {
  id: "wave" | "orange-money" | "mixx" | "carte";
  label: string;
  /** Un ou deux logos (la carte montre Visa et Mastercard). */
  logos: readonly string[];
  /** Logo large (texte compris) : affiché plus grand, sans libellé dessous. */
  wordmark: boolean;
}
export const PAYMENT_CHANNELS: readonly PaymentChannel[] = [
  { id: "wave", label: "Wave", logos: ["/brand/paiement/wave.png"], wordmark: false },
  { id: "orange-money", label: "Orange Money", logos: ["/brand/paiement/orange-money.svg"], wordmark: true },
  { id: "mixx", label: "Mixx by Yas", logos: ["/brand/paiement/mixx.png"], wordmark: false },
  { id: "carte", label: "Carte bancaire", logos: ["/brand/paiement/visa.svg", "/brand/paiement/mastercard.svg"], wordmark: false },
];

/** Message prêt à envoyer au membre (WhatsApp, SMS, e-mail). */
export const paymentLinkMessage = (input: {
  name: string;
  scoop: string;
  amount: string;
  period: string;
  url: string;
}): string =>
  `Bonjour ${input.name}, voici le lien pour payer votre cotisation ${input.period} (${input.amount} FCFA) à ${input.scoop} : ${input.url}`;
