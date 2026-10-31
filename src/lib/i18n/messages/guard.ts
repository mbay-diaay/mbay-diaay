/** Garde commune des actions (`checkAccess`) : refus de droit, de périmètre et de session. */
export const guard = {
  "errors.guard.noSession": "Connectez-vous pour continuer.",
  "errors.guard.notAllowed": "Votre rôle ne permet pas cette action.",
  "errors.guard.outOfScope": "Cette coopérative est hors de votre périmètre.",
} as const;
