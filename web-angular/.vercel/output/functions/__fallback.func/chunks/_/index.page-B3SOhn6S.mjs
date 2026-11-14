import { i as inject, R as Router, c as computed, e as effect, ɵ as __defineComponent } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'rxjs';
import 'rxjs/operators';
import 'node:module';
import 'node:async_hooks';
import './locale.service-c0QhtcVY.mjs';

var _a;
var RootRedirectPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.router = inject(Router);
    this.role = computed(() => {
      var _a2, _b;
      return (_b = (_a2 = this.store.state().session) == null ? void 0 : _a2.role) != null ? _b : null;
    }, ...[]);
    effect(() => {
      const role = this.role();
      if (role) this.router.navigate(["/dashboard", role], { replaceUrl: true });
    });
  }
}, _a.\u0275fac = function RootRedirectPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-root-redirect-page"]],
  decls: 0,
  vars: 0,
  template: function RootRedirectPage_Template(rf, ctx) {
  },
  encapsulation: 2
}), _a);

export { RootRedirectPage as default };
//# sourceMappingURL=index.page-B3SOhn6S.mjs.map
