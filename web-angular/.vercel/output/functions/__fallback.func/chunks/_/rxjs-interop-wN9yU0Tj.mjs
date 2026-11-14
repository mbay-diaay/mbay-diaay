import { i as inject, ag as DestroyRef, F as signal, ah as RuntimeError, c as computed } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) destroyRef = inject(DestroyRef);
  const destroyed$ = new Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    return destroyRef.onDestroy(subscriber.next.bind(subscriber));
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}
function toSignal(source, options) {
  var _a, _b;
  const cleanupRef = !(options == null ? void 0 : options.manualCleanup) ? (_b = (_a = options == null ? void 0 : options.injector) == null ? void 0 : _a.get(DestroyRef)) != null ? _b : inject(DestroyRef) : null;
  const equal = makeToSignalEqual(options == null ? void 0 : options.equal);
  let state;
  if (options == null ? void 0 : options.requireSync) state = signal({ kind: 0 }, { equal });
  else state = signal({
    kind: 1,
    value: options == null ? void 0 : options.initialValue
  }, { equal });
  let destroyUnregisterFn;
  const sub = source.subscribe({
    next: (value) => state.set({
      kind: 1,
      value
    }),
    error: (error) => {
      state.set({
        kind: 2,
        error
      });
      destroyUnregisterFn == null ? void 0 : destroyUnregisterFn();
    },
    complete: () => {
      destroyUnregisterFn == null ? void 0 : destroyUnregisterFn();
    }
  });
  if ((options == null ? void 0 : options.requireSync) && state().kind === 0) throw new RuntimeError(601, false);
  destroyUnregisterFn = cleanupRef == null ? void 0 : cleanupRef.onDestroy(sub.unsubscribe.bind(sub));
  return computed(() => {
    const current = state();
    switch (current.kind) {
      case 1:
        return current.value;
      case 2:
        throw current.error;
      case 0:
        throw new RuntimeError(601, false);
    }
  }, { equal: options == null ? void 0 : options.equal });
}
function makeToSignalEqual(userEquality = Object.is) {
  return (a, b) => a.kind === 1 && b.kind === 1 && userEquality(a.value, b.value);
}

export { takeUntilDestroyed as a, toSignal as t };
//# sourceMappingURL=rxjs-interop-wN9yU0Tj.mjs.map
