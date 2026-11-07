import { DestroyRef, Injectable, inject, signal } from "@angular/core";
import { actions, can, getState, subscribeToStore, type State } from "@/lib/store";
import type { Permission } from "@/lib/permissions";

/**
 * Angular port of the React app's src/lib/store.ts subscription layer.
 * The store itself (state, `actions`, business logic — ~3000 lines) is
 * copied verbatim into src/lib/store.ts; only its React-specific `useStore()`
 * hook (useSyncExternalStore) doesn't carry over. This service is the
 * replacement: same `subscribeToStore`/`getState` primitives, exposed as an
 * Angular signal instead of a hook.
 */
@Injectable({ providedIn: "root" })
export class StoreService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly stateSignal = signal<State>(getState());
  readonly state = this.stateSignal.asReadonly();

  /** Same `actions` object the React app calls (store.ts `actions.*`) — mutates the shared store directly. */
  readonly actions = actions;

  constructor() {
    const unsubscribe = subscribeToStore(() => this.stateSignal.set(getState()));
    this.destroyRef.onDestroy(unsubscribe);
  }

  can(permission: Permission): boolean {
    return can(this.state().session, permission);
  }
}
