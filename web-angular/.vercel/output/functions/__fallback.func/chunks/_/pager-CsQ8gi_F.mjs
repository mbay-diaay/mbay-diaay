import { F as signal, c as computed, b3 as linkedSignal } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { r as paginate } from './ui-DDO8FoUF.mjs';

function createPager(source, size = 10) {
  const limit = signal(size, ...[]);
  const count = computed(() => source().length, ...[]);
  const page = linkedSignal({
    source: count,
    computation: () => 1
  });
  const result = computed(() => paginate(source(), {
    page: page(),
    limit: limit()
  }), ...[]);
  return {
    result,
    items: computed(() => result().items),
    setPage: (p) => page.set(p),
    setSize: (s) => {
      limit.set(s);
      page.set(1);
    }
  };
}

export { createPager as c };
//# sourceMappingURL=pager-CsQ8gi_F.mjs.map
