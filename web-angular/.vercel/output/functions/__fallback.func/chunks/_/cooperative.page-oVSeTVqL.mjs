import { i as inject, R as Router, A as ActivatedRoute, e as effect, ɵ as __defineComponent, f as __elementStart, g as __text, h as __elementEnd, n as __property } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, q as scoopIdsOf, r as isConsolidated } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { map } from 'rxjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'rxjs/operators';
import 'node:module';
import 'node:async_hooks';
import './lucide-angular-RJABeBQ2.mjs';

var _a;
var CooperativePage = (_a = class {
  constructor() {
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.perms = [
      "member.read",
      "scoop.manage",
      "org.read"
    ];
    this.scoopQuery = toSignal(this.route.queryParamMap.pipe(map((m) => m.get("scoop"))), { initialValue: null });
    effect(() => {
      const session = this.store.state().session;
      if (!session) return;
      const scoopQ = this.scoopQuery();
      if (scoopQ) {
        this.router.navigate(["/dashboard/cooperatives", scoopQ], {
          replaceUrl: true,
          queryParams: {}
        });
        return;
      }
      const ids = [...scoopIdsOf(session)];
      const only = !isConsolidated(session) && ids.length === 1 ? ids[0] : void 0;
      if (only) this.router.navigate(["/dashboard/cooperatives", only], { replaceUrl: true });
      else this.router.navigate(["/dashboard/cooperatives"], { replaceUrl: true });
    });
  }
}, _a.\u0275fac = function CooperativePage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-cooperative-page"]],
  decls: 3,
  vars: 2,
  consts: [[
    3,
    "perm",
    "area"
  ], [
    1,
    "text-sm",
    "text-muted-foreground"
  ]],
  template: function CooperativePage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "p", 1);
      __text(2, "Redirection\u2026");
      __elementEnd()();
    }
    if (rf & 2) __property("perm", ctx.perms)("area", ctx.t()("cooperatives.fiche.area"));
  },
  dependencies: [AppShellComponent],
  encapsulation: 2
}), _a);

export { CooperativePage as default };
//# sourceMappingURL=cooperative.page-oVSeTVqL.mjs.map
