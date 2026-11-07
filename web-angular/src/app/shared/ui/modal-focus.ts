const FOCUSABLE =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Éléments focusables visibles dans un conteneur modal. */
export function focusableIn(root: HTMLElement): HTMLElement[] {
  return Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
    (el) => !el.hasAttribute("disabled") && el.offsetParent !== null,
  );
}

/** Focus le premier focusable, sinon le conteneur lui-même. */
export function focusInitial(root: HTMLElement): void {
  const items = focusableIn(root);
  const target = items[0] ?? root;
  if (!root.hasAttribute("tabindex")) root.tabIndex = -1;
  target.focus({ preventScroll: true });
}

/** Trap Tab first↔last ; retourne true si l’événement a été géré. */
export function trapTabKey(root: HTMLElement, event: KeyboardEvent): boolean {
  if (event.key !== "Tab") return false;
  const items = focusableIn(root);
  if (items.length === 0) {
    event.preventDefault();
    root.focus({ preventScroll: true });
    return true;
  }
  const first = items[0]!;
  const last = items[items.length - 1]!;
  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus({ preventScroll: true });
    return true;
  }
  if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus({ preventScroll: true });
    return true;
  }
  return false;
}

let bodyLockCount = 0;
let previousOverflow = "";

export function lockBodyScroll(): void {
  if (typeof document === "undefined") return;
  if (bodyLockCount === 0) {
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  }
  bodyLockCount += 1;
}

export function unlockBodyScroll(): void {
  if (typeof document === "undefined") return;
  bodyLockCount = Math.max(0, bodyLockCount - 1);
  if (bodyLockCount === 0) {
    document.body.style.overflow = previousOverflow;
  }
}
