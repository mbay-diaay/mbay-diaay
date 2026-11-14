import { aa as input, i as inject, c as computed, ɵ as __defineComponent, d as RouterLink, aO as __projectionDef, j as __conditionalCreate, s as __conditional, aP as __projection, f as __elementStart, b as __element, h as __elementEnd, g as __text, w as __nextContext, o as __advance, n as __property, p as __textInterpolate, r as __pureFunction1, q as __textInterpolate1 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { v as ShieldAlert, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { L as LocaleService } from './locale.service-c0QhtcVY.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';

var _a;
var _c0 = ["*"];
var _c1 = (a0) => ({ what: a0 });
var _c2 = (a0) => ["/dashboard", a0];
function AppShellComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) __projection(0);
}
function AppShellComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 0)(1, "div", 1);
    __element(2, "lucide-angular", 2);
    __elementEnd();
    __elementStart(3, "h2", 3);
    __text(4);
    __elementEnd();
    __elementStart(5, "p", 4);
    __text(6);
    __elementEnd();
    __elementStart(7, "a", 5);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(2);
    __property("img", ctx_r0.shieldAlert)("size", 24);
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.forbidden.title"));
    __advance(2);
    __textInterpolate(ctx_r0.t()("shell.forbidden.body", __pureFunction1(6, _c1, ctx_r0.area())));
    __advance();
    __property("routerLink", __pureFunction1(8, _c2, ctx.role));
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("shell.forbidden.back"), " ");
  }
}
var AppShellComponent = (_a = class {
  constructor() {
    this.perm = input.required(...[]);
    this.area = input.required(...[]);
    this.store = inject(StoreService);
    this.t = inject(LocaleService).t;
    this.shieldAlert = ShieldAlert;
    this.session = computed(() => this.store.state().session, ...[]);
    this.allowed = computed(() => {
      const session = this.session();
      if (!session) return false;
      const perm = this.perm();
      return (Array.isArray(perm) ? perm : [perm]).some((p) => session.permissions.includes(p));
    }, ...[]);
  }
}, _a.\u0275fac = function AppShellComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-shell"]],
  hostAttrs: [1, "block"],
  inputs: {
    perm: [1, "perm"],
    area: [1, "area"]
  },
  ngContentSelectors: _c0,
  decls: 2,
  vars: 1,
  consts: [
    [
      1,
      "mx-auto",
      "mt-16",
      "max-w-lg",
      "rounded-[24px]",
      "border",
      "p-8",
      "text-center",
      2,
      "border-color",
      "var(--v2-bord-carte)",
      "background",
      "var(--v2-blanc)"
    ],
    [
      1,
      "mx-auto",
      "mb-4",
      "grid",
      "size-12",
      "place-items-center",
      "rounded-[14px]",
      2,
      "background",
      "var(--v2-attente-fg)",
      "color",
      "var(--v2-attente-bg)"
    ],
    [
      3,
      "img",
      "size"
    ],
    [
      1,
      "text-[22px]",
      "font-extrabold",
      "tracking-[-0.02em]"
    ],
    [
      1,
      "mt-2",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-6",
      "inline-block",
      "cursor-pointer",
      "font-bold",
      "underline-offset-4",
      "hover:underline",
      2,
      "color",
      "var(--v2-foret-clair)",
      3,
      "routerLink"
    ]
  ],
  template: function AppShellComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef();
      __conditionalCreate(0, AppShellComponent_Conditional_0_Template, 1, 0)(1, AppShellComponent_Conditional_1_Template, 9, 10, "div", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      __conditional(ctx.allowed() ? 0 : (tmp_0_0 = ctx.session()) ? 1 : -1, tmp_0_0);
    }
  },
  dependencies: [
    RouterLink,
    LucideAngularModule,
    LucideAngularComponent
  ],
  encapsulation: 2
}), _a);

export { AppShellComponent as A };
//# sourceMappingURL=app-shell.component-CFzK6QAu.mjs.map
