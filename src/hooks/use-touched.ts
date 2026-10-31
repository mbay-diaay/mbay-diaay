import { useState } from "react";

/**
 * Une erreur de saisie ne s'affiche qu'après la première modification ou la sortie du champ : un formulaire vierge
 * ne montre pas de rouge. `touch()` à chaque changement et à la sortie du champ.
 */
export function useTouched() {
  const [touched, setTouched] = useState(false);
  return { touched, touch: () => setTouched(true), reset: () => setTouched(false) };
}
