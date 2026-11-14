var _a;
var PAYMENT_PROVIDER = ((_a = {
  }["VITE_PAYMENT_PROVIDER"]) == null ? void 0 : _a.trim()) || null;
var aggregatorConnected = () => PAYMENT_PROVIDER !== null;
var paymentLinkUrl = (token, origin) => `${origin}/payer/${token}`;
var PAYMENT_CHANNELS = [
  {
    id: "wave",
    label: "Wave",
    logos: ["/brand/paiement/wave.png"],
    wordmark: false
  },
  {
    id: "orange-money",
    label: "Orange Money",
    logos: ["/brand/paiement/orange-money.svg"],
    wordmark: true
  },
  {
    id: "mixx",
    label: "Mixx by Yas",
    logos: ["/brand/paiement/mixx.png"],
    wordmark: false
  },
  {
    id: "carte",
    label: "Carte bancaire",
    logos: ["/brand/paiement/visa.svg", "/brand/paiement/mastercard.svg"],
    wordmark: false
  }
];
var paymentLinkMessage = (input) => `Bonjour ${input.name}, voici le lien pour payer votre cotisation ${input.period} (${input.amount} FCFA) \xE0 ${input.scoop} : ${input.url}`;

export { PAYMENT_CHANNELS as P, aggregatorConnected as a, paymentLinkMessage as b, paymentLinkUrl as p };
//# sourceMappingURL=payment-provider-9TEL3wMl.mjs.map
