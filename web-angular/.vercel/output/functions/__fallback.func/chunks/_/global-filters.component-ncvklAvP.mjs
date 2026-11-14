import { aa as input, i as inject, R as Router, A as ActivatedRoute, c as computed, ɵ as __defineComponent, j as __conditionalCreate, s as __conditional, o as __advance, L as __getCurrentView, f as __elementStart, H as __listener, h as __elementEnd, w as __nextContext, n as __property, O as __restoreView, P as __resetView } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, i as inScope } from './locale.service-c0QhtcVY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { S as SelectComponent } from './ui-DDO8FoUF.mjs';
import { map } from 'rxjs';

var _a;
function GlobalFiltersComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-select", 2);
    __listener("valueChange", function GlobalFiltersComponent_Conditional_0_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.patch("scoop", $event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("label", ctx_r1.t()("shell.filters.scoopLabel"))("options", ctx_r1.scoopOptions())("value", ctx_r1.scoop());
  }
}
function GlobalFiltersComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "ui-select", 3);
    __listener("valueChange", function GlobalFiltersComponent_Conditional_1_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r3);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.patch("campagne", $event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("label", ctx_r1.t()("shell.filters.campaignLabel"))("options", ctx_r1.campaignOptions())("value", ctx_r1.campagne());
  }
}
function leafRoute(route) {
  let r = route;
  while (r.firstChild) r = r.firstChild;
  return r;
}
var GlobalFiltersComponent = (_a = class {
  constructor() {
    var _a2, _b;
    this.campaign = input(false, ...[]);
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.store = inject(StoreService);
    this.t = inject(LocaleService).t;
    this.leaf = leafRoute(this.route);
    this.params = toSignal(this.leaf.queryParamMap.pipe(map((m) => {
      var _a3, _b2;
      return {
        scoop: (_a3 = m.get("scoop")) != null ? _a3 : "",
        campagne: (_b2 = m.get("campagne")) != null ? _b2 : ""
      };
    })), { initialValue: {
      scoop: (_a2 = this.leaf.snapshot.queryParamMap.get("scoop")) != null ? _a2 : "",
      campagne: (_b = this.leaf.snapshot.queryParamMap.get("campagne")) != null ? _b : ""
    } });
    this.scoop = computed(() => this.params().scoop, ...[]);
    this.campagne = computed(() => this.params().campagne, ...[]);
    this.scoops = computed(() => {
      const s = this.store.state();
      return inScope(s.scoops.filter((c) => !c.archived).map((c) => ({
        ...c,
        scoopId: c.id
      })), s.session).sort((a, b) => a.name.localeCompare(b.name));
    }, ...[]);
    this.showScoop = computed(() => this.scoops().length > 1, ...[]);
    this.scoopOptions = computed(() => [{
      value: "",
      label: this.t()("shell.filters.scoopAll")
    }, ...this.scoops().map((c) => ({
      value: c.id,
      label: c.name
    }))], ...[]);
    this.campaignOptions = computed(() => [{
      value: "",
      label: this.t()("shell.filters.campaignAll")
    }, ...[...this.store.state().campaigns].sort((a, b) => b.start.localeCompare(a.start)).map((c) => ({
      value: c.name,
      label: c.name
    }))], ...[]);
  }
  patch(key, value) {
    this.router.navigate([], {
      relativeTo: this.leaf,
      queryParams: { [key]: value || null },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
}, _a.\u0275fac = function GlobalFiltersComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-global-filters"]],
  hostAttrs: [1, "contents"],
  inputs: { campaign: [1, "campaign"] },
  decls: 2,
  vars: 2,
  consts: [
    [
      "variant",
      "compact",
      "leadingIcon",
      "apartment",
      1,
      "min-w-[220px]",
      "flex-1",
      3,
      "label",
      "options",
      "value"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "calendar_month",
      1,
      "min-w-[200px]",
      "flex-1",
      3,
      "label",
      "options",
      "value"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "apartment",
      1,
      "min-w-[220px]",
      "flex-1",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "variant",
      "compact",
      "leadingIcon",
      "calendar_month",
      1,
      "min-w-[200px]",
      "flex-1",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ]
  ],
  template: function GlobalFiltersComponent_Template(rf, ctx) {
    if (rf & 1) {
      __conditionalCreate(0, GlobalFiltersComponent_Conditional_0_Template, 1, 3, "ui-select", 0);
      __conditionalCreate(1, GlobalFiltersComponent_Conditional_1_Template, 1, 3, "ui-select", 1);
    }
    if (rf & 2) {
      __conditional(ctx.showScoop() ? 0 : -1);
      __advance();
      __conditional(ctx.campaign() ? 1 : -1);
    }
  },
  dependencies: [SelectComponent],
  encapsulation: 2
}), _a);

export { GlobalFiltersComponent as G };
//# sourceMappingURL=global-filters.component-ncvklAvP.mjs.map
