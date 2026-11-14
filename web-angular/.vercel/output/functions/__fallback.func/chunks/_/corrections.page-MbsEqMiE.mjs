import { i as inject, R as Router, e as effect, ɵ as __defineComponent, Z as __domElementStart, g as __text, $ as __domElementEnd } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
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

var _a;
var CorrectionsRedirectPage = (_a = class {
  constructor() {
    this.router = inject(Router);
    effect(() => {
      this.router.navigateByUrl("/dashboard/qualite/corrections", { replaceUrl: true });
    });
  }
}, _a.\u0275fac = function CorrectionsRedirectPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-corrections-redirect-page"]],
  decls: 2,
  vars: 0,
  consts: [[
    1,
    "p-8",
    "text-sm",
    "text-muted-foreground"
  ]],
  template: function CorrectionsRedirectPage_Template(rf, ctx) {
    if (rf & 1) {
      __domElementStart(0, "p", 0);
      __text(1, "Redirection\u2026");
      __domElementEnd();
    }
  },
  encapsulation: 2
}), _a);

export { CorrectionsRedirectPage as default };
//# sourceMappingURL=corrections.page-MbsEqMiE.mjs.map
