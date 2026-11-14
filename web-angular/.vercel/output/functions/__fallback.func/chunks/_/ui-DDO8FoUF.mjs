import { I as IconComponent, U as UiModalA11yDirective, N as NgTemplateOutlet, l as lockBodyScroll, f as focusInitial, t as trapTabKey, u as unlockBodyScroll } from './snackbar.component-sjBBVJT0.mjs';
import { aa as input, i as inject, F as signal, D as DOCUMENT$1, ag as DestroyRef, ac as afterNextRender, ɵ as __defineComponent, m as __repeaterCreate, j as __conditionalCreate, v as __repeater, o as __advance, s as __conditional, af as output, c as computed, f as __elementStart, g as __text, h as __elementEnd, u as __attribute, p as __textInterpolate, z as __classProp, r as __pureFunction1, aO as __projectionDef, aQ as __declareLet, aR as __storeLet, a3 as ElementRef, ab as viewChild, e as effect, a8 as untracked, H as __listener, b as __element, n as __property, t as __styleProp, q as __textInterpolate1, X as __viewQuerySignal, Y as __queryAdvance, d as RouterLink, V as __repeaterTrackByIdentity, y as __template, a5 as __classMap, k as __namespaceSVG, l as __namespaceHTML, aP as __projection, Z as __domElementStart, aS as __domListener, $ as __domElementEnd, aj as __domProperty, ad as __domElement, ae as model, w as __nextContext, L as __getCurrentView, aT as __readContextLet, N as __textInterpolate2, G as __controlCreate, J as __control, C as __reference, aB as InjectionToken, aU as ApplicationRef, ax as ChangeDetectorRef, aV as EventEmitter, a4 as isPlatformBrowser, a2 as PLATFORM_ID, x as __pureFunction2, B as __elementContainer, aW as getDOM, aX as booleanAttribute, a6 as __repeaterTrackByIndex, aG as isPromise, am as __directiveInject, as as Renderer2, an as __defineDirective, aY as __getInheritedFactory, aZ as __InheritDefinitionFeature, a_ as __ProvidersFeature, ap as __NgOnChangesFeature, al as Injector, a$ as __ControlFeature, aq as __defineNgModule, ar as __defineInjector, b0 as forwardRef, aE as __defineService, O as __restoreView, P as __resetView, S as __resolveDocument, E as __templateRefExtractor, b1 as __resolveWindow, ah as RuntimeError } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { L as LocaleService, j as nf } from './locale.service-c0QhtcVY.mjs';
import { w as Plus, x as ChevronRight, y as ChevronLeft, e as LucideAngularModule, f as LucideAngularComponent, X } from './lucide-angular-RJABeBQ2.mjs';
import { Subscription, Subject, from, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { format, isSameDay, isSameMonth, isToday, endOfDay, startOfDay, endOfMonth, startOfMonth, startOfWeek, addDays, addMonths, addWeeks } from 'date-fns';
import { fr } from 'date-fns/locale';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j, _k, _l, _m, _n, _o, _p, _q, _r, _s, _t, _u, _v, _w;
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
var _c0$18 = ["*"];
var VARIANTS = {
  default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
  destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
  outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
  secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
  ghost: "hover:bg-accent hover:text-accent-foreground",
  link: "text-primary underline-offset-4 hover:underline"
};
var SIZES = {
  default: "h-9 px-4 py-2 pointer-coarse:h-touch",
  sm: "h-8 rounded-md px-3 text-xs pointer-coarse:h-touch pointer-coarse:text-sm",
  lg: "h-10 rounded-md px-8",
  icon: "h-9 w-9 pointer-coarse:size-touch"
};
var UiButtonComponent = (_a = class {
  constructor() {
    this.variant = input("default", ...[]);
    this.size = input("default", ...[]);
    this.type = input("button", ...[]);
    this.disabled = input(false, ...[]);
    this.className = input("", { });
    this.ariaLabel = input(void 0, ...[]);
    this.classes = computed(() => cn("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", VARIANTS[this.variant()], SIZES[this.size()], this.className()), ...[]);
  }
  /** Remonte le clic ; le parent peut aussi écouter (click) sur ui-button grâce à contents. */
  onClick(_event) {
  }
}, _a.\u0275fac = function UiButtonComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["ui-button"]],
  hostAttrs: [1, "contents"],
  inputs: {
    variant: [1, "variant"],
    size: [1, "size"],
    type: [1, "type"],
    disabled: [1, "disabled"],
    className: [
      1,
      "class",
      "className"
    ],
    ariaLabel: [1, "ariaLabel"]
  },
  ngContentSelectors: _c0$18,
  decls: 2,
  vars: 5,
  consts: [[
    3,
    "click",
    "type",
    "disabled"
  ]],
  template: function UiButtonComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef();
      __domElementStart(0, "button", 0);
      __domListener("click", function UiButtonComponent_Template_button_click_0_listener($event) {
        return ctx.onClick($event);
      });
      __projection(1);
      __domElementEnd();
    }
    if (rf & 2) {
      __classMap(ctx.classes());
      __domProperty("type", ctx.type())("disabled", ctx.disabled());
      __attribute("aria-label", ctx.ariaLabel() || null);
    }
  },
  encapsulation: 2
}), _a);
var _c0$17 = ["canvas"];
function UiChartComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "div", 1);
    __domElement(1, "canvas", 3, 0);
    __domElementEnd();
  }
}
function UiChartComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "div", 2);
    __text(1, "\u2026");
    __domElementEnd();
  }
}
var UiChartComponent = (_b = class {
  constructor() {
    this.type = input.required(...[]);
    this.data = input.required(...[]);
    this.options = input({}, ...[]);
    this.browser = isPlatformBrowser(inject(PLATFORM_ID));
    this.document = inject(DOCUMENT$1);
    this.canvas = viewChild("canvas", ...[]);
    this.chart = null;
    this.ready = false;
    if (!this.browser) return;
    afterNextRender(() => {
      this.ready = true;
      this.render();
    });
    effect(() => {
      this.type();
      this.data();
      this.options();
      if (this.ready) this.render();
    });
  }
  ngOnDestroy() {
    var _a2;
    (_a2 = this.chart) == null ? void 0 : _a2.destroy();
    this.chart = null;
  }
  async render() {
    var _a2, _b2;
    const el = (_a2 = this.canvas()) == null ? void 0 : _a2.nativeElement;
    if (!el || !this.browser) return;
    const { Chart, BarController, BarElement, CategoryScale, LinearScale, PieController, DoughnutController, ArcElement, Tooltip, Legend } = await import('chart.js');
    Chart.register(BarController, BarElement, CategoryScale, LinearScale, PieController, DoughnutController, ArcElement, Tooltip, Legend);
    (_b2 = this.chart) == null ? void 0 : _b2.destroy();
    this.chart = new Chart(el, {
      type: this.type(),
      data: this.resolveCssColors(this.data()),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        ...this.options()
      }
    });
  }
  /** Remplace `var(--token)` par la valeur calculée sur `:root`. */
  resolveCssColors(data) {
    const resolve = (value) => {
      if (typeof value === "string" && value.includes("var(")) return cssVar(this.document, value);
      if (Array.isArray(value)) return value.map((v) => resolve(v));
      return value;
    };
    return {
      ...data,
      datasets: data.datasets.map((ds) => {
        const next = { ...ds };
        for (const key of [
          "backgroundColor",
          "borderColor",
          "hoverBackgroundColor",
          "hoverBorderColor"
        ]) if (key in next) next[key] = resolve(next[key]);
        return next;
      })
    };
  }
}, _b.\u0275fac = function UiChartComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _b)();
}, _b.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _b,
  selectors: [["ui-chart"]],
  viewQuery: function UiChartComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.canvas, _c0$17, 5);
    if (rf & 2) __queryAdvance();
  },
  hostAttrs: [
    1,
    "block",
    "h-full",
    "w-full",
    "min-h-0"
  ],
  inputs: {
    type: [1, "type"],
    data: [1, "data"],
    options: [1, "options"]
  },
  decls: 2,
  vars: 1,
  consts: [
    ["canvas", ""],
    [
      1,
      "relative",
      "h-full",
      "w-full",
      "min-h-0"
    ],
    [
      1,
      "grid",
      "h-full",
      "min-h-40",
      "place-items-center",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "absolute",
      "inset-0",
      "!h-full",
      "!w-full"
    ]
  ],
  template: function UiChartComponent_Template(rf, ctx) {
    if (rf & 1) __conditionalCreate(0, UiChartComponent_Conditional_0_Template, 3, 0, "div", 1)(1, UiChartComponent_Conditional_1_Template, 2, 0, "div", 2);
    if (rf & 2) __conditional(ctx.browser ? 0 : 1);
  },
  encapsulation: 2
}), _b);
function cssVar(doc, raw) {
  const match = raw.match(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/);
  if (!match) return raw;
  const [, name, fallback] = match;
  return getComputedStyle(doc.documentElement).getPropertyValue(name).trim() || (fallback == null ? void 0 : fallback.trim()) || raw;
}
var _c0$16 = (a0) => ({ count: a0 });
var _forTrack0$8 = ($index, $item) => $item.value;
function CheckListComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 3)(1, "label", 9);
    __element(2, "ui-icon", 10);
    __elementStart(3, "input", 11);
    __listener("input", function CheckListComponent_Conditional_7_Template_input_input_3_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.q.set($event.target.value));
    });
    __elementEnd()();
    __elementStart(4, "button", 12);
    __listener("click", function CheckListComponent_Conditional_7_Template_button_click_4_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.toggleAll());
    });
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 18);
    __advance();
    __property("placeholder", ctx_r1.t()("ui.checklist.search"))("value", ctx_r1.q());
    __attribute("aria-label", ctx_r1.t()("ui.checklist.search"));
    __advance(2);
    __textInterpolate(ctx_r1.allVisibleOn() ? ctx_r1.t()("ui.checklist.none") : ctx_r1.t()("ui.checklist.all"));
  }
}
function CheckListComponent_For_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 15);
  if (rf & 2) {
    const option_r4 = __nextContext().$implicit;
    __property("name", option_r4.icon)("size", 18);
  }
}
function CheckListComponent_For_10_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 17);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r4 = __nextContext().$implicit;
    __advance();
    __textInterpolate(option_r4.hint);
  }
}
function CheckListComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "label", 13)(1, "input", 14);
    __listener("change", function CheckListComponent_For_10_Template_input_change_1_listener($event) {
      const option_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.toggle(option_r4.value, $event.target.checked));
    });
    __elementEnd();
    __conditionalCreate(2, CheckListComponent_For_10_Conditional_2_Template, 1, 2, "ui-icon", 15);
    __elementStart(3, "span", 16);
    __text(4);
    __elementEnd();
    __conditionalCreate(5, CheckListComponent_For_10_Conditional_5_Template, 2, 1, "span", 17);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.value().includes(option_r4.value));
    __advance();
    __property("checked", ctx_r1.value().includes(option_r4.value));
    __advance();
    __conditional(option_r4.icon ? 2 : -1);
    __advance(2);
    __textInterpolate(option_r4.label);
    __advance();
    __conditional(option_r4.hint ? 5 : -1);
  }
}
function CheckListComponent_ForEmpty_11_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 6);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("ui.checklist.empty"));
  }
}
function CheckListComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 7);
    __element(1, "ui-icon", 18);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("id", ctx_r1.errorId);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r1.error());
  }
}
function CheckListComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 8);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.hint());
  }
}
var nextId$5 = 0;
var CheckListComponent = (_c = class {
  constructor() {
    this.label = input.required(...[]);
    this.options = input.required(...[]);
    this.value = input([], ...[]);
    this.hint = input("", ...[]);
    this.error = input("", ...[]);
    this.valueChange = output();
    this.t = inject(LocaleService).t;
    this.errorId = `cl-${nextId$5++}-error`;
    this.q = signal("", ...[]);
    this.visible = computed(() => {
      const norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      const q = norm(this.q().trim());
      return q ? this.options().filter((o) => norm(o.label).includes(q)) : this.options();
    }, ...[]);
    this.allVisibleOn = computed(() => this.visible().length > 0 && this.visible().every((o) => this.value().includes(o.value)), ...[]);
  }
  toggle(v, on) {
    const set = new Set(this.value());
    if (on) set.add(v);
    else set.delete(v);
    this.valueChange.emit(this.options().map((o) => o.value).filter((x) => set.has(x)));
  }
  toggleAll() {
    const set = new Set(this.value());
    const on = !this.allVisibleOn();
    for (const o of this.visible()) if (on) set.add(o.value);
    else set.delete(o.value);
    this.valueChange.emit(this.options().map((o) => o.value).filter((x) => set.has(x)));
  }
}, _c.\u0275fac = function CheckListComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _c)();
}, _c.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _c,
  selectors: [["ui-check-list"]],
  hostAttrs: [1, "block"],
  inputs: {
    label: [1, "label"],
    options: [1, "options"],
    value: [1, "value"],
    hint: [1, "hint"],
    error: [1, "error"]
  },
  outputs: { valueChange: "valueChange" },
  decls: 14,
  vars: 12,
  consts: [
    [1, "legend"],
    [1, "count"],
    [1, "box"],
    [1, "tools"],
    [1, "list"],
    [
      1,
      "opt",
      3,
      "on"
    ],
    [
      1,
      "px-4",
      "py-3",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "role",
      "alert",
      1,
      "error",
      3,
      "id"
    ],
    [1, "hint"],
    [1, "filter"],
    [
      "name",
      "search",
      3,
      "size"
    ],
    [
      "type",
      "search",
      3,
      "input",
      "placeholder",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "bulk",
      3,
      "click"
    ],
    [1, "opt"],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
    ],
    [
      2,
      "color",
      "var(--v2-foret)",
      3,
      "name",
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "truncate"
    ],
    [
      1,
      "shrink-0",
      "text-[12px]",
      "font-bold",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ]
  ],
  template: function CheckListComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "fieldset")(1, "legend", 0)(2, "span");
      __text(3);
      __elementEnd();
      __elementStart(4, "span", 1);
      __text(5);
      __elementEnd()();
      __elementStart(6, "div", 2);
      __conditionalCreate(7, CheckListComponent_Conditional_7_Template, 6, 5, "div", 3);
      __elementStart(8, "div", 4);
      __repeaterCreate(9, CheckListComponent_For_10_Template, 6, 6, "label", 5, _forTrack0$8, false, CheckListComponent_ForEmpty_11_Template, 2, 1, "p", 6);
      __elementEnd()();
      __conditionalCreate(12, CheckListComponent_Conditional_12_Template, 3, 3, "p", 7)(13, CheckListComponent_Conditional_13_Template, 2, 1, "p", 8);
      __elementEnd();
    }
    if (rf & 2) {
      __attribute("aria-describedby", ctx.error() ? ctx.errorId : null);
      __advance(3);
      __textInterpolate(ctx.label());
      __advance();
      __classProp("zero", !ctx.value().length);
      __advance();
      __textInterpolate(ctx.t()("ui.checklist.selected", __pureFunction1(10, _c0$16, ctx.value().length)));
      __advance();
      __classProp("invalid", !!ctx.error());
      __advance();
      __conditional(ctx.options().length > 6 ? 7 : -1);
      __advance(2);
      __repeater(ctx.visible());
      __advance(3);
      __conditional(ctx.error() ? 12 : ctx.hint() ? 13 : -1);
    }
  },
  dependencies: [IconComponent],
  styles: [".legend[_ngcontent-%COMP%] {\n      display: flex;\n      width: 100%;\n      align-items: center;\n      justify-content: space-between;\n      gap: 8px;\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .count[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      background: var(--%NS%v2-foret);\n      padding: 2px 9px;\n      font-size: 12px;\n      letter-spacing: 0;\n      text-transform: none;\n      color: var(--%NS%v2-citron);\n    }\n    .count.zero[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-lin);\n      color: var(--%NS%v2-gris-texte);\n    }\n    .box[_ngcontent-%COMP%] {\n      margin-top: 8px;\n      overflow: hidden;\n      border-radius: 18px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n    }\n    .box.invalid[_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-erreur-fg);\n    }\n    .tools[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 8px;\n      border-bottom: 1px solid var(--%NS%v2-separateur);\n      padding: 8px;\n    }\n    .filter[_ngcontent-%COMP%] {\n      display: flex;\n      min-width: 0;\n      flex: 1;\n      height: 40px;\n      align-items: center;\n      gap: 8px;\n      border-radius: 12px;\n      background: var(--%NS%v2-creme);\n      padding: 0 12px;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      min-width: 0;\n      flex: 1;\n      background: transparent;\n      font-size: 14px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      outline: none;\n    }\n    .filter[_ngcontent-%COMP%]:focus-within {\n      box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n    }\n    .bulk[_ngcontent-%COMP%] {\n      flex-shrink: 0;\n      border-radius: 10px;\n      padding: 8px 10px;\n      font-size: 13px;\n      font-weight: 800;\n      color: var(--%NS%v2-foret);\n      cursor: pointer;\n    }\n    .bulk[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-sauge);\n    }\n    .bulk[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n    }\n    .list[_ngcontent-%COMP%] {\n      max-height: 260px;\n      overflow-y: auto;\n      overscroll-behavior: contain;\n    }\n    .opt[_ngcontent-%COMP%] {\n      display: flex;\n      min-height: 48px;\n      align-items: center;\n      gap: 12px;\n      border-top: 1px solid var(--%NS%v2-separateur);\n      padding: 8px 14px;\n      font-size: 14px;\n      font-weight: 600;\n      cursor: pointer;\n    }\n    .opt[_ngcontent-%COMP%]:first-child {\n      border-top: none;\n    }\n    .opt[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n    }\n    .opt.on[_ngcontent-%COMP%] {\n      background: color-mix(in oklab, var(--%NS%v2-sauge) 70%, transparent);\n    }\n    .opt[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      height: 20px;\n      width: 20px;\n      flex-shrink: 0;\n      accent-color: var(--%NS%v2-foret);\n      cursor: pointer;\n    }\n    .hint[_ngcontent-%COMP%] {\n      margin-top: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .error[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 6px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-erreur-fg);\n    }"]
}), _c);
var _c0$15 = ["*"];
_d = class {
}, _d.\u0275fac = function UiChipRailComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _d)();
}, _d.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _d,
  selectors: [["ui-chip-rail"]],
  hostAttrs: [
    "role",
    "group",
    1,
    "relative",
    "block",
    "min-w-0"
  ],
  ngContentSelectors: _c0$15,
  decls: 2,
  vars: 0,
  consts: [[
    1,
    "chip-rail-track",
    "-mx-1",
    "flex",
    "gap-2",
    "overflow-x-auto",
    "overscroll-x-contain",
    "px-1",
    "pb-1",
    "[scrollbar-width:thin]",
    "snap-x",
    "snap-mandatory",
    "md:flex-wrap",
    "md:overflow-visible",
    "md:pb-0"
  ]],
  template: function UiChipRailComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef();
      __domElementStart(0, "div", 0);
      __projection(1);
      __domElementEnd();
    }
  },
  styles: ['[_nghost-%COMP%]::after {\n      content: "";\n      pointer-events: none;\n      position: absolute;\n      inset-block: 0;\n      inset-inline-end: 0;\n      width: 1.75rem;\n      background: linear-gradient(to left, var(--%NS%sem-surface), transparent);\n      opacity: 0.9;\n    }\n    @media (min-width: 768px) {\n      [_nghost-%COMP%]::after {\n        display: none;\n      }\n    }']
});
var _c0$14 = [[[
  "",
  "collapsible-summary",
  ""
]], "*"];
var _c1$8 = ["[collapsible-summary]", "*"];
function CollapsibleComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 1);
    __element(1, "ui-icon", 12);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __property("name", ctx_r0.icon())("size", 20);
  }
}
function CollapsibleComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 4);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.subtitle());
  }
}
var nextId$4 = 0;
var CollapsibleComponent = (_e = class {
  constructor() {
    this.title = input.required(...[]);
    this.subtitle = input("", ...[]);
    this.icon = input(null, ...[]);
    this.defaultOpen = input(true, ...[]);
    this.storageKey = input("", ...[]);
    this.panelId = `collapsible-${nextId$4++}`;
    this.open = signal(true, ...[]);
    afterNextRender(() => {
      let stored = null;
      try {
        stored = this.storageKey() ? window.localStorage.getItem(this.storageKey()) : null;
      } catch {
      }
      this.open.set(stored === null ? this.defaultOpen() : stored === "1");
    });
  }
  toggle() {
    const next = !this.open();
    this.open.set(next);
    if (!this.storageKey()) return;
    try {
      window.localStorage.setItem(this.storageKey(), next ? "1" : "0");
    } catch {
    }
  }
}, _e.\u0275fac = function CollapsibleComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _e)();
}, _e.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _e,
  selectors: [["ui-collapsible"]],
  hostAttrs: [1, "block"],
  inputs: {
    title: [1, "title"],
    subtitle: [1, "subtitle"],
    icon: [1, "icon"],
    defaultOpen: [1, "defaultOpen"],
    storageKey: [1, "storageKey"]
  },
  ngContentSelectors: _c1$8,
  decls: 17,
  vars: 11,
  consts: [
    [
      "type",
      "button",
      1,
      "head",
      3,
      "click"
    ],
    [
      1,
      "grid",
      "size-10",
      "shrink-0",
      "place-items-center",
      "rounded-[12px]",
      2,
      "background",
      "var(--v2-foret)",
      "color",
      "var(--v2-citron)"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "block",
      "text-[18px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.02em]"
    ],
    [
      1,
      "mt-0.5",
      "block",
      "text-[13px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "toggle"
    ],
    [
      "name",
      "keyboard_arrow_down",
      1,
      "chev",
      3,
      "size"
    ],
    [1, "summary"],
    [1, "clip"],
    [1, "pt-3"],
    [
      "role",
      "region",
      1,
      "panel",
      3,
      "id"
    ],
    [1, "pt-4"],
    [
      3,
      "name",
      "size"
    ]
  ],
  template: function CollapsibleComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c0$14);
      __elementStart(0, "div")(1, "button", 0);
      __listener("click", function CollapsibleComponent_Template_button_click_1_listener() {
        return ctx.toggle();
      });
      __conditionalCreate(2, CollapsibleComponent_Conditional_2_Template, 2, 2, "span", 1);
      __elementStart(3, "span", 2)(4, "span", 3);
      __text(5);
      __elementEnd();
      __conditionalCreate(6, CollapsibleComponent_Conditional_6_Template, 2, 1, "span", 4);
      __elementEnd();
      __elementStart(7, "span", 5);
      __element(8, "ui-icon", 6);
      __elementEnd()();
      __elementStart(9, "div", 7)(10, "div", 8)(11, "div", 9);
      __projection(12);
      __elementEnd()()();
      __elementStart(13, "div", 10)(14, "div", 8)(15, "div", 11);
      __projection(16, 1);
      __elementEnd()()()();
    }
    if (rf & 2) {
      __classProp("open", ctx.open());
      __advance();
      __attribute("aria-expanded", ctx.open())("aria-controls", ctx.panelId);
      __advance();
      __conditional(ctx.icon() ? 2 : -1);
      __advance(3);
      __textInterpolate(ctx.title());
      __advance();
      __conditional(ctx.subtitle() ? 6 : -1);
      __advance(2);
      __property("size", 22);
      __advance();
      __attribute("aria-hidden", ctx.open());
      __advance(4);
      __property("id", ctx.panelId);
      __attribute("inert", ctx.open() ? null : "");
    }
  },
  dependencies: [IconComponent],
  styles: [".head[_ngcontent-%COMP%] {\n      display: flex;\n      width: 100%;\n      align-items: center;\n      gap: 12px;\n      border-radius: 18px;\n      padding: 4px;\n      text-align: left;\n      cursor: pointer;\n    }\n    .head[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 4px;\n    }\n    .toggle[_ngcontent-%COMP%] {\n      display: grid;\n      height: 36px;\n      width: 36px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-ardoise);\n      transition:\n        background-color 0.2s ease,\n        color 0.2s ease;\n    }\n    .head[_ngcontent-%COMP%]:hover   .toggle[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .chev[_ngcontent-%COMP%] {\n      transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);\n    }\n    .open[_ngcontent-%COMP%]   .chev[_ngcontent-%COMP%] {\n      transform: rotate(180deg);\n    }\n    .summary[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-rows: 1fr;\n      opacity: 1;\n      transition:\n        grid-template-rows 0.3s cubic-bezier(0.32, 0.72, 0, 1),\n        opacity 0.2s ease;\n    }\n    .open[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%] {\n      grid-template-rows: 0fr;\n      opacity: 0;\n    }\n    .panel[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-rows: 0fr;\n      opacity: 0;\n      transition:\n        grid-template-rows 0.35s cubic-bezier(0.32, 0.72, 0, 1),\n        opacity 0.25s ease;\n    }\n    .open[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%] {\n      grid-template-rows: 1fr;\n      opacity: 1;\n    }\n    .clip[_ngcontent-%COMP%] {\n      min-height: 0;\n      overflow: hidden;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .chev[_ngcontent-%COMP%], \n   .summary[_ngcontent-%COMP%], \n   .panel[_ngcontent-%COMP%] {\n        transition: none;\n      }\n    }"]
}), _e);
var _c0$13 = [[[
  "",
  "hero-actions",
  ""
]], [[
  "",
  "hero-extra",
  ""
]]];
var _c1$7 = ["[hero-actions]", "[hero-extra]"];
var _forTrack0$7 = ($index, $item) => $item.label;
var _forTrack1$3 = ($index, $item) => $item.text;
function DetailHeroComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 12);
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __property("name", ctx_r0.icon())("size", 32);
  }
}
function DetailHeroComponent_Conditional_15_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __textInterpolate1(" ", ctx_r0.mono(), " ");
  }
}
function DetailHeroComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 14);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.eyebrow());
  }
}
function DetailHeroComponent_Conditional_20_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 12);
  if (rf & 2) {
    const badge_r2 = __nextContext().$implicit;
    __property("name", badge_r2.icon)("size", 14);
  }
}
function DetailHeroComponent_Conditional_20_For_2_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    __elementStart(0, "span", 21);
    __conditionalCreate(1, DetailHeroComponent_Conditional_20_For_2_Conditional_1_Template, 1, 2, "ui-icon", 12);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const badge_r2 = ctx.$implicit;
    __classMap("t-" + ((_a2 = badge_r2.tone) != null ? _a2 : "glass"));
    __classProp("is-mono", badge_r2.mono);
    __advance();
    __conditional(badge_r2.icon ? 1 : -1);
    __advance();
    __textInterpolate1(" ", badge_r2.label, " ");
  }
}
function DetailHeroComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16);
    __repeaterCreate(1, DetailHeroComponent_Conditional_20_For_2_Template, 3, 6, "span", 20, _forTrack0$7);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __repeater(ctx_r0.badges());
  }
}
function DetailHeroComponent_Conditional_21_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 22);
    __element(1, "ui-icon", 12);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const metaItem_r3 = ctx.$implicit;
    __advance();
    __property("name", metaItem_r3.icon)("size", 16);
    __advance();
    __textInterpolate(metaItem_r3.text);
  }
}
function DetailHeroComponent_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 17);
    __repeaterCreate(1, DetailHeroComponent_Conditional_21_For_2_Template, 3, 3, "span", 22, _forTrack1$3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __repeater(ctx_r0.meta());
  }
}
function DetailHeroComponent_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 19);
    __element(1, "ui-icon", 23);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __property("routerLink", ctx_r0.crumb().link);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r0.backLabel(), " ");
  }
}
var DetailHeroComponent = (_f = class {
  constructor() {
    this.crumb = input.required(...[]);
    this.title = input.required(...[]);
    this.eyebrow = input("", ...[]);
    this.mono = input("", ...[]);
    this.icon = input(null, ...[]);
    this.badges = input([], ...[]);
    this.meta = input([], ...[]);
    this.backLabel = input("", ...[]);
  }
}, _f.\u0275fac = function DetailHeroComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _f)();
}, _f.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _f,
  selectors: [["ui-detail-hero"]],
  hostAttrs: [1, "block"],
  inputs: {
    crumb: [1, "crumb"],
    title: [1, "title"],
    eyebrow: [1, "eyebrow"],
    mono: [1, "mono"],
    icon: [1, "icon"],
    badges: [1, "badges"],
    meta: [1, "meta"],
    backLabel: [1, "backLabel"]
  },
  ngContentSelectors: _c1$7,
  decls: 26,
  vars: 12,
  consts: [
    [
      1,
      "hero",
      "p-6",
      "sm:p-8"
    ],
    [
      "viewBox",
      "0 0 320 220",
      "aria-hidden",
      "true",
      1,
      "pointer-events-none",
      "absolute",
      "-right-16",
      "-top-10",
      "h-72",
      "w-[30rem]",
      "opacity-[0.06]"
    ],
    [
      "d",
      "M10 120 Q160 60 310 110",
      "fill",
      "none",
      "stroke",
      "currentColor",
      "stroke-width",
      "22",
      "stroke-linecap",
      "round"
    ],
    [
      "d",
      "M30 168 Q170 108 310 156",
      "fill",
      "none",
      "stroke",
      "currentColor",
      "stroke-width",
      "22",
      "stroke-linecap",
      "round"
    ],
    [
      "d",
      "M60 212 Q180 160 310 200",
      "fill",
      "none",
      "stroke",
      "currentColor",
      "stroke-width",
      "22",
      "stroke-linecap",
      "round"
    ],
    [
      "aria-label",
      "Fil d'Ariane",
      1,
      "crumb",
      "relative",
      "flex",
      "items-center",
      "gap-1.5",
      "text-[13px]",
      "font-semibold"
    ],
    [3, "routerLink"],
    [
      "name",
      "chevron_right",
      2,
      "opacity",
      "0.5",
      3,
      "size"
    ],
    [
      "aria-current",
      "page",
      1,
      "truncate",
      2,
      "color",
      "var(--v2-citron)"
    ],
    [
      1,
      "relative",
      "mt-6",
      "flex",
      "flex-wrap",
      "items-start",
      "justify-between",
      "gap-6"
    ],
    [
      1,
      "flex",
      "min-w-0",
      "items-start",
      "gap-5"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "mono"
    ],
    [
      3,
      "name",
      "size"
    ],
    [1, "min-w-0"],
    [
      1,
      "text-[12px]",
      "font-bold",
      "uppercase",
      "tracking-[0.08em]",
      2,
      "color",
      "var(--v2-citron)",
      "font-family",
      "var(--v2-font-mono)"
    ],
    [
      1,
      "text-[26px]",
      "font-extrabold",
      "leading-[1.08]",
      "tracking-[-0.03em]",
      "sm:text-[34px]"
    ],
    [
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "items-center",
      "gap-x-4",
      "gap-y-1",
      "text-[14px]",
      "font-medium",
      2,
      "color",
      "color-mix(in oklab, var(--v2-blanc) 75%, transparent)"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2"
    ],
    [
      1,
      "back",
      3,
      "routerLink"
    ],
    [
      1,
      "badge",
      3,
      "class",
      "is-mono"
    ],
    [1, "badge"],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-1.5"
    ],
    [
      "name",
      "arrow_forward",
      2,
      "transform",
      "rotate(180deg)",
      3,
      "size"
    ]
  ],
  template: function DetailHeroComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c0$13);
      __elementStart(0, "section", 0);
      __namespaceSVG();
      __elementStart(1, "svg", 1);
      __element(2, "path", 2)(3, "path", 3)(4, "path", 4);
      __elementEnd();
      __namespaceHTML();
      __elementStart(5, "nav", 5)(6, "a", 6);
      __text(7);
      __elementEnd();
      __element(8, "ui-icon", 7);
      __elementStart(9, "span", 8);
      __text(10);
      __elementEnd()();
      __elementStart(11, "div", 9)(12, "div", 10)(13, "span", 11);
      __conditionalCreate(14, DetailHeroComponent_Conditional_14_Template, 1, 2, "ui-icon", 12)(15, DetailHeroComponent_Conditional_15_Template, 1, 1);
      __elementEnd();
      __elementStart(16, "div", 13);
      __conditionalCreate(17, DetailHeroComponent_Conditional_17_Template, 2, 1, "p", 14);
      __elementStart(18, "h1", 15);
      __text(19);
      __elementEnd();
      __conditionalCreate(20, DetailHeroComponent_Conditional_20_Template, 3, 0, "div", 16);
      __conditionalCreate(21, DetailHeroComponent_Conditional_21_Template, 3, 0, "p", 17);
      __elementEnd()();
      __elementStart(22, "div", 18);
      __projection(23);
      __conditionalCreate(24, DetailHeroComponent_Conditional_24_Template, 3, 3, "a", 19);
      __elementEnd()();
      __projection(25, 1);
      __elementEnd();
    }
    if (rf & 2) {
      __advance(6);
      __property("routerLink", ctx.crumb().link);
      __advance();
      __textInterpolate(ctx.crumb().label);
      __advance();
      __property("size", 16);
      __advance(2);
      __textInterpolate(ctx.title());
      __advance(4);
      __conditional(ctx.icon() ? 14 : 15);
      __advance(3);
      __conditional(ctx.eyebrow() ? 17 : -1);
      __advance();
      __classProp("mt-1", !!ctx.eyebrow());
      __advance();
      __textInterpolate(ctx.title());
      __advance();
      __conditional(ctx.badges().length ? 20 : -1);
      __advance();
      __conditional(ctx.meta().length ? 21 : -1);
      __advance(3);
      __conditional(ctx.backLabel() ? 24 : -1);
    }
  },
  dependencies: [IconComponent, RouterLink],
  styles: [".hero[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: hidden;\n      border-radius: 28px;\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n      animation: _ngcontent-%COMP%_hero-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n    }\n    .mono[_ngcontent-%COMP%] {\n      display: grid;\n      height: 72px;\n      width: 72px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 22px;\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n      font-family: var(--%NS%v2-font-mono);\n      font-size: 20px;\n      font-weight: 700;\n      transition: transform 0.3s ease;\n    }\n    .hero[_ngcontent-%COMP%]:hover   .mono[_ngcontent-%COMP%] {\n      transform: rotate(-4deg) scale(1.04);\n    }\n    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);\n      transition: color 0.15s ease;\n    }\n    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {\n      color: var(--%NS%v2-citron);\n    }\n    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible, \n   .back[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-citron);\n      outline-offset: 3px;\n      border-radius: 6px;\n    }\n    .back[_ngcontent-%COMP%] {\n      display: inline-flex;\n      height: 44px;\n      align-items: center;\n      gap: 8px;\n      border-radius: 14px;\n      border: 1.5px solid color-mix(in oklab, var(--%NS%v2-blanc) 25%, transparent);\n      padding: 0 14px;\n      font-size: 14px;\n      font-weight: 800;\n      color: var(--%NS%v2-blanc);\n      white-space: nowrap;\n      transition:\n        background-color 0.15s ease,\n        border-color 0.15s ease;\n    }\n    .back[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-citron);\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 10%, transparent);\n    }\n    .badge[_ngcontent-%COMP%] {\n      display: inline-flex;\n      align-items: center;\n      gap: 4px;\n      border-radius: 999px;\n      padding: 3px 10px 3px 8px;\n      font-size: 12px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n    .t-citron[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .t-light[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-foret);\n    }\n    .t-glass[_ngcontent-%COMP%] {\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 12%, transparent);\n      color: var(--%NS%v2-blanc);\n    }\n    .t-warn[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-attente-bg);\n      color: var(--%NS%v2-attente-fg);\n    }\n    .t-danger[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-erreur-bg);\n      color: var(--%NS%v2-erreur-fg);\n    }\n    .is-mono[_ngcontent-%COMP%] {\n      font-family: var(--%NS%v2-font-mono);\n    }\n    @keyframes _ngcontent-%COMP%_hero-rise {\n      from {\n        opacity: 0;\n        transform: translateY(10px);\n      }\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .hero[_ngcontent-%COMP%], \n   .mono[_ngcontent-%COMP%] {\n        animation: none;\n        transition: none;\n      }\n    }"]
}), _f);
var _c0$12 = [
  [[
    "",
    "modal-badges",
    ""
  ]],
  "*",
  [[
    "",
    "modal-footer",
    ""
  ]]
];
var _c1$6 = [
  "[modal-badges]",
  "*",
  "[modal-footer]"
];
function ModalComponent_Conditional_0_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 12);
    __element(1, "ui-icon", 13);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __styleProp("background", ctx_r1.tone() === "danger" ? "var(--v2-erreur-fg)" : ctx_r1.tone() === "brand" ? "var(--v2-citron)" : "var(--v2-foret)")("color", ctx_r1.tone() === "danger" ? "var(--v2-erreur-bg)" : ctx_r1.tone() === "brand" ? "var(--v2-foret)" : "var(--v2-citron)");
    __advance();
    __property("name", ctx_r1.icon())("size", 24);
  }
}
function ModalComponent_Conditional_0_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 7);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("id", ctx_r1.descId);
    __advance();
    __textInterpolate(ctx_r1.description());
  }
}
function ModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 1);
    __listener("click", function ModalComponent_Conditional_0_Template_div_click_0_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.onBackdrop($event));
    });
    __elementStart(1, "section", 2);
    __listener("dismiss", function ModalComponent_Conditional_0_Template_section_dismiss_1_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closed.emit());
    });
    __elementStart(2, "header", 3);
    __conditionalCreate(3, ModalComponent_Conditional_0_Conditional_3_Template, 2, 6, "span", 4);
    __elementStart(4, "div", 5)(5, "h2", 6);
    __text(6);
    __elementEnd();
    __conditionalCreate(7, ModalComponent_Conditional_0_Conditional_7_Template, 2, 2, "p", 7);
    __projection(8);
    __elementEnd();
    __elementStart(9, "button", 8);
    __listener("click", function ModalComponent_Conditional_0_Template_button_click_9_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closed.emit());
    });
    __element(10, "ui-icon", 9);
    __elementEnd()();
    __elementStart(11, "div", 10);
    __projection(12, 1);
    __elementEnd();
    __elementStart(13, "footer", 11);
    __projection(14, 2);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __styleProp("max-width", ctx_r1.width(), "px");
    __classProp("brand", ctx_r1.tone() === "brand");
    __attribute("aria-labelledby", ctx_r1.titleId)("aria-describedby", ctx_r1.description() ? ctx_r1.descId : null);
    __advance(2);
    __conditional(ctx_r1.icon() ? 3 : -1);
    __advance(2);
    __property("id", ctx_r1.titleId);
    __advance();
    __textInterpolate(ctx_r1.title());
    __advance();
    __conditional(ctx_r1.description() ? 7 : -1);
    __advance(2);
    __attribute("aria-label", ctx_r1.closeLabel());
    __advance();
    __property("size", 22);
    __advance();
    __classProp("pt-6", ctx_r1.tone() === "brand");
  }
}
var nextId$3 = 0;
var ModalComponent = (_g = class {
  constructor() {
    this.open = input(false, ...[]);
    this.title = input.required(...[]);
    this.description = input("", ...[]);
    this.icon = input(null, ...[]);
    this.tone = input("default", ...[]);
    this.width = input(620, ...[]);
    this.closeLabel = input("Fermer", ...[]);
    this.closed = output();
    this.uid = nextId$3++;
    this.titleId = `modal-${this.uid}-title`;
    this.descId = `modal-${this.uid}-desc`;
  }
  onBackdrop(e) {
    if (e.target === e.currentTarget) this.closed.emit();
  }
}, _g.\u0275fac = function ModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _g)();
}, _g.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _g,
  selectors: [["ui-modal"]],
  inputs: {
    open: [1, "open"],
    title: [1, "title"],
    description: [1, "description"],
    icon: [1, "icon"],
    tone: [1, "tone"],
    width: [1, "width"],
    closeLabel: [1, "closeLabel"]
  },
  outputs: { closed: "closed" },
  ngContentSelectors: _c1$6,
  decls: 1,
  vars: 1,
  consts: [
    [1, "backdrop"],
    [
      1,
      "backdrop",
      3,
      "click"
    ],
    [
      "role",
      "dialog",
      "aria-modal",
      "true",
      "uiModalA11y",
      "",
      1,
      "sheet",
      3,
      "dismiss"
    ],
    [
      1,
      "head",
      "flex",
      "items-start",
      "gap-4",
      "px-6",
      "pb-4",
      "pt-6",
      "sm:px-8",
      "sm:pt-7"
    ],
    [
      1,
      "grid",
      "size-12",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]",
      3,
      "background",
      "color"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "text-[22px]",
      "font-extrabold",
      "leading-tight",
      "tracking-[-0.02em]",
      3,
      "id"
    ],
    [
      1,
      "desc",
      "mt-1.5",
      "text-[14px]",
      "font-medium",
      "leading-relaxed",
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "id"
    ],
    [
      "type",
      "button",
      1,
      "close",
      "shrink-0",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [
      1,
      "min-h-0",
      "flex-1",
      "overflow-y-auto",
      "px-6",
      "pb-2",
      "sm:px-8"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "justify-end",
      "gap-3",
      "border-t",
      "px-6",
      "py-5",
      "sm:px-8",
      2,
      "border-color",
      "var(--v2-separateur)"
    ],
    [
      1,
      "grid",
      "size-12",
      "shrink-0",
      "place-items-center",
      "rounded-[14px]"
    ],
    [
      3,
      "name",
      "size"
    ]
  ],
  template: function ModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c0$12);
      __conditionalCreate(0, ModalComponent_Conditional_0_Template, 15, 14, "div", 0);
    }
    if (rf & 2) __conditional(ctx.open() ? 0 : -1);
  },
  dependencies: [IconComponent, UiModalA11yDirective],
  styles: [".backdrop[_ngcontent-%COMP%] {\n      position: fixed;\n      inset: 0;\n      z-index: 120;\n      display: flex;\n      align-items: flex-end;\n      justify-content: center;\n      background: color-mix(in oklab, var(--%NS%v2-encre) 45%, transparent);\n      padding: 0;\n      animation: _ngcontent-%COMP%_fade 0.18s ease both;\n    }\n    @media (min-width: 640px) {\n      .backdrop[_ngcontent-%COMP%] {\n        align-items: center;\n        padding: 24px;\n      }\n    }\n    .sheet[_ngcontent-%COMP%] {\n      display: flex;\n      max-height: calc(100dvh - 24px);\n      width: 100%;\n      flex-direction: column;\n      border-radius: 28px 28px 0 0;\n      background: var(--%NS%v2-blanc);\n      color: var(--%NS%v2-encre);\n      font-family: var(--%NS%v2-font);\n      box-shadow: var(--%NS%v2-ombre-modale);\n      animation: _ngcontent-%COMP%_rise 0.26s cubic-bezier(0.32, 0.72, 0, 1) backwards;\n    }\n    @media (min-width: 640px) {\n      .sheet[_ngcontent-%COMP%] {\n        max-height: calc(100dvh - 48px);\n        border-radius: 32px;\n      }\n    }\n    \n    .sheet.brand[_ngcontent-%COMP%] {\n      overflow: hidden;\n    }\n    .brand[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-blanc);\n      padding-bottom: 22px;\n    }\n    .brand[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] {\n      color: color-mix(in oklab, var(--%NS%v2-blanc) 72%, transparent) !important;\n    }\n    .brand[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-blanc);\n      background: color-mix(in oklab, var(--%NS%v2-blanc) 10%, transparent);\n    }\n    .brand[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-citron);\n      color: var(--%NS%v2-foret);\n    }\n    .brand[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:focus-visible {\n      outline-color: var(--%NS%v2-citron);\n    }\n    .close[_ngcontent-%COMP%] {\n      display: grid;\n      height: 40px;\n      width: 40px;\n      place-items: center;\n      border-radius: 12px;\n      color: var(--%NS%v2-gris-texte);\n      cursor: pointer;\n    }\n    .close[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-encre);\n    }\n    .close[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    @keyframes _ngcontent-%COMP%_fade {\n      from {\n        opacity: 0;\n      }\n    }\n    @keyframes _ngcontent-%COMP%_rise {\n      from {\n        opacity: 0;\n        transform: translateY(16px) scale(0.98);\n      }\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .backdrop[_ngcontent-%COMP%], \n   .sheet[_ngcontent-%COMP%] {\n        animation: none;\n      }\n    }"]
}), _g);
var _c0$11 = [[[
  "",
  "detail-body",
  ""
]], [[
  "",
  "detail-actions",
  ""
]]];
var _c1$5 = ["[detail-body]", "[detail-actions]"];
var _c2$4 = (a0) => ({ count: a0 });
var _forTrack0$6 = ($index, $item) => $item.label;
var _forTrack1$2 = ($index, $item) => $item.title;
function DetailModalComponent_Conditional_0_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 11);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const badge_r3 = ctx.$implicit;
    __styleProp("background", badge_r3.bg)("color", badge_r3.fg);
    __advance();
    __textInterpolate(badge_r3.label);
  }
}
function DetailModalComponent_Conditional_0_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 2);
    __repeaterCreate(1, DetailModalComponent_Conditional_0_Conditional_1_For_2_Template, 2, 5, "span", 10, _forTrack0$6);
    __elementEnd();
  }
  if (rf & 2) {
    const detail_r4 = __nextContext();
    __advance();
    __repeater(detail_r4.badges);
  }
}
function DetailModalComponent_Conditional_0_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 13);
    __element(1, "ui-icon", 14);
    __elementStart(2, "p", 15);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 16);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const kpi_r5 = ctx.$implicit;
    __styleProp("background", kpi_r5.tone.bg)("color", kpi_r5.tone.fg);
    __advance();
    __property("name", kpi_r5.icon)("size", 64);
    __advance();
    __styleProp("opacity", kpi_r5.muted ? 0.45 : 1);
    __advance();
    __textInterpolate(kpi_r5.value);
    __advance(2);
    __textInterpolate(kpi_r5.label);
  }
}
function DetailModalComponent_Conditional_0_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 3);
    __repeaterCreate(1, DetailModalComponent_Conditional_0_Conditional_2_For_2_Template, 6, 10, "div", 12, _forTrack0$6);
    __elementEnd();
  }
  if (rf & 2) {
    const detail_r4 = __nextContext();
    __advance();
    __repeater(detail_r4.kpis);
  }
}
function DetailModalComponent_Conditional_0_For_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 11);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const fact_r6 = __nextContext().$implicit;
    __styleProp("background", fact_r6.tone.bg)("color", fact_r6.tone.fg);
    __advance();
    __textInterpolate(fact_r6.value);
  }
}
function DetailModalComponent_Conditional_0_For_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const fact_r6 = __nextContext().$implicit;
    __textInterpolate1(" ", fact_r6.value, " ");
  }
}
function DetailModalComponent_Conditional_0_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 17)(1, "span", 18);
    __element(2, "ui-icon", 19);
    __elementEnd();
    __elementStart(3, "div", 20)(4, "dt");
    __text(5);
    __elementEnd();
    __elementStart(6, "dd", 21);
    __conditionalCreate(7, DetailModalComponent_Conditional_0_For_5_Conditional_7_Template, 2, 5, "span", 10)(8, DetailModalComponent_Conditional_0_For_5_Conditional_8_Template, 1, 1);
    __elementEnd()()();
  }
  if (rf & 2) {
    const fact_r6 = ctx.$implicit;
    __classProp("wide", fact_r6.wide);
    __advance(2);
    __property("name", fact_r6.icon)("size", 18);
    __advance(3);
    __textInterpolate(fact_r6.label);
    __advance();
    __classProp("zero", fact_r6.muted);
    __advance();
    __conditional(fact_r6.tone && !fact_r6.muted ? 7 : 8);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 23);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const section_r7 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.nf.format(section_r7.count));
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 27);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r8 = __nextContext().$implicit;
    __advance();
    __textInterpolate(item_r8.initials);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 28);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r8 = __nextContext().$implicit;
    __advance();
    __textInterpolate(item_r8.index);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 31);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r8 = __nextContext().$implicit;
    __advance();
    __textInterpolate(item_r8.sub);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 33);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r8 = __nextContext().$implicit;
    __styleProp("background", item_r8.badge.bg)("color", item_r8.badge.fg);
    __advance();
    __textInterpolate(item_r8.badge.label);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li");
    __conditionalCreate(1, DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_1_Template, 2, 1, "span", 27)(2, DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_2_Template, 2, 1, "span", 28);
    __elementStart(3, "span", 29)(4, "span", 30);
    __text(5);
    __elementEnd();
    __conditionalCreate(6, DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_6_Template, 2, 1, "span", 31);
    __elementEnd();
    __conditionalCreate(7, DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Conditional_7_Template, 2, 5, "span", 32);
    __elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    __advance();
    __conditional(item_r8.initials ? 1 : item_r8.index ? 2 : -1);
    __advance(4);
    __textInterpolate(item_r8.label);
    __advance();
    __conditional(item_r8.sub ? 6 : -1);
    __advance();
    __conditional(item_r8.badge ? 7 : -1);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 26);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const section_r7 = __nextContext(2).$implicit;
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("common.detail.more", __pureFunction1(1, _c2$4, section_r7.more)));
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 25);
    __repeaterCreate(1, DetailModalComponent_Conditional_0_For_7_Conditional_4_For_2_Template, 8, 4, "li", null, __repeaterTrackByIndex);
    __elementEnd();
    __conditionalCreate(3, DetailModalComponent_Conditional_0_For_7_Conditional_4_Conditional_3_Template, 2, 3, "p", 26);
  }
  if (rf & 2) {
    const section_r7 = __nextContext().$implicit;
    __advance();
    __repeater(section_r7.items);
    __advance(2);
    __conditional(section_r7.more > 0 ? 3 : -1);
  }
}
function DetailModalComponent_Conditional_0_For_7_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 24);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const section_r7 = __nextContext().$implicit;
    __advance();
    __textInterpolate(section_r7.empty);
  }
}
function DetailModalComponent_Conditional_0_For_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "h3", 22);
    __element(1, "ui-icon", 19);
    __text(2);
    __conditionalCreate(3, DetailModalComponent_Conditional_0_For_7_Conditional_3_Template, 2, 1, "span", 23);
    __elementEnd();
    __conditionalCreate(4, DetailModalComponent_Conditional_0_For_7_Conditional_4_Template, 4, 1)(5, DetailModalComponent_Conditional_0_For_7_Conditional_5_Template, 2, 1, "p", 24);
  }
  if (rf & 2) {
    const section_r7 = ctx.$implicit;
    __advance();
    __property("name", section_r7.icon)("size", 18);
    __advance();
    __textInterpolate1(" ", section_r7.title, " ");
    __advance();
    __conditional(section_r7.count !== null ? 3 : -1);
    __advance();
    __conditional(section_r7.items.length ? 4 : 5);
  }
}
function DetailModalComponent_Conditional_0_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 9);
    __text(1);
    __elementStart(2, "span", 34);
    __element(3, "ui-icon", 35);
    __elementEnd()();
  }
  if (rf & 2) {
    const detail_r4 = __nextContext();
    const ctx_r1 = __nextContext();
    __property("routerLink", detail_r4.link);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("common.openFull"), " ");
    __advance(2);
    __property("size", 18);
  }
}
function DetailModalComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "ui-modal", 1);
    __listener("closed", function DetailModalComponent_Conditional_0_Template_ui_modal_closed_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closed.emit());
    });
    __conditionalCreate(1, DetailModalComponent_Conditional_0_Conditional_1_Template, 3, 0, "div", 2);
    __conditionalCreate(2, DetailModalComponent_Conditional_0_Conditional_2_Template, 3, 0, "div", 3);
    __elementStart(3, "dl", 4);
    __repeaterCreate(4, DetailModalComponent_Conditional_0_For_5_Template, 9, 8, "div", 5, _forTrack0$6);
    __elementEnd();
    __repeaterCreate(6, DetailModalComponent_Conditional_0_For_7_Template, 6, 5, null, null, _forTrack1$2);
    __projection(8);
    __element(9, "div", 6);
    __elementStart(10, "div", 7);
    __projection(11, 1);
    __elementEnd();
    __elementStart(12, "button", 8);
    __listener("click", function DetailModalComponent_Conditional_0_Template_button_click_12_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.closed.emit());
    });
    __text(13);
    __elementEnd();
    __conditionalCreate(14, DetailModalComponent_Conditional_0_Conditional_14_Template, 4, 3, "a", 9);
    __elementEnd();
  }
  if (rf & 2) {
    const detail_r4 = ctx;
    const ctx_r1 = __nextContext();
    __property("open", true)("title", detail_r4.title)("description", detail_r4.subtitle)("icon", detail_r4.icon)("width", ctx_r1.width())("closeLabel", ctx_r1.t()("common.close"));
    __advance();
    __conditional(detail_r4.badges.length ? 1 : -1);
    __advance();
    __conditional(detail_r4.kpis.length ? 2 : -1);
    __advance();
    __classProp("mt-4", detail_r4.kpis.length);
    __advance();
    __repeater(detail_r4.facts);
    __advance(2);
    __repeater(detail_r4.sections);
    __advance(7);
    __textInterpolate(ctx_r1.t()("common.close"));
    __advance();
    __conditional(detail_r4.link ? 14 : -1);
  }
}
var DetailModalComponent = (_h = class {
  constructor() {
    this.view = input(null, ...[]);
    this.width = input(600, ...[]);
    this.closed = output();
    this.t = inject(LocaleService).t;
    this.nf = nf;
  }
}, _h.\u0275fac = function DetailModalComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _h)();
}, _h.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _h,
  selectors: [["ui-detail-modal"]],
  inputs: {
    view: [1, "view"],
    width: [1, "width"]
  },
  outputs: { closed: "closed" },
  ngContentSelectors: _c1$5,
  decls: 1,
  vars: 1,
  consts: [
    [
      "tone",
      "brand",
      3,
      "open",
      "title",
      "description",
      "icon",
      "width",
      "closeLabel"
    ],
    [
      "tone",
      "brand",
      3,
      "closed",
      "open",
      "title",
      "description",
      "icon",
      "width",
      "closeLabel"
    ],
    [
      "modal-badges",
      "",
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [1, "kpis"],
    [1, "facts"],
    [
      1,
      "fact",
      3,
      "wide"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "h-4"
    ],
    [
      "modal-footer",
      "",
      1,
      "contents"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "click"
    ],
    [
      "modal-footer",
      "",
      1,
      "btn",
      "btn-primary",
      3,
      "routerLink"
    ],
    [
      1,
      "badge",
      3,
      "background",
      "color"
    ],
    [1, "badge"],
    [
      1,
      "kpi",
      3,
      "background",
      "color"
    ],
    [1, "kpi"],
    [
      1,
      "kpi-ico",
      3,
      "name",
      "size"
    ],
    [1, "kpi-value"],
    [1, "kpi-label"],
    [1, "fact"],
    [
      "aria-hidden",
      "true",
      1,
      "fact-ico"
    ],
    [
      3,
      "name",
      "size"
    ],
    [1, "min-w-0"],
    [1, "tabular-nums"],
    [
      1,
      "sec-title",
      "mb-2",
      "mt-6"
    ],
    [
      1,
      "n",
      "tabular-nums"
    ],
    [
      1,
      "sub",
      "rounded-[16px]",
      "px-4",
      "py-3",
      2,
      "background",
      "var(--v2-creme)"
    ],
    [1, "dlist"],
    [
      1,
      "sub",
      "mt-2"
    ],
    [1, "avatar"],
    [
      1,
      "avatar",
      "step"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "block",
      "truncate",
      "font-bold"
    ],
    [
      1,
      "sub",
      "block",
      "truncate"
    ],
    [
      1,
      "badge",
      "shrink-0",
      3,
      "background",
      "color"
    ],
    [
      1,
      "badge",
      "shrink-0"
    ],
    [
      1,
      "grid",
      "size-9",
      "place-items-center",
      "rounded-[12px]",
      2,
      "background",
      "var(--v2-citron)",
      "color",
      "var(--v2-foret)"
    ],
    [
      "name",
      "arrow_forward",
      3,
      "size"
    ]
  ],
  template: function DetailModalComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c0$11);
      __conditionalCreate(0, DetailModalComponent_Conditional_0_Template, 15, 12, "ui-modal", 0);
    }
    if (rf & 2) {
      let tmp_0_0;
      __conditional((tmp_0_0 = ctx.view()) ? 0 : -1, tmp_0_0);
    }
  },
  dependencies: [
    RouterLink,
    IconComponent,
    ModalComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", "\n  .kpis[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));\n    gap: 10px;\n  }\n  .kpi[_ngcontent-%COMP%] {\n    position: relative;\n    overflow: hidden;\n    border-radius: 18px;\n    padding: 14px 16px;\n  }\n  .kpi[_ngcontent-%COMP%]   .kpi-ico[_ngcontent-%COMP%] {\n    position: absolute;\n    right: -6px;\n    bottom: -10px;\n    opacity: 0.14;\n  }\n  .kpi-value[_ngcontent-%COMP%] {\n    font-size: 26px;\n    font-weight: 800;\n    line-height: 1;\n    letter-spacing: -0.03em;\n    font-variant-numeric: tabular-nums;\n  }\n  .kpi-label[_ngcontent-%COMP%] {\n    margin-top: 6px;\n    font-size: 12px;\n    font-weight: 700;\n  }\n  .sec-title[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 13px;\n    font-weight: 800;\n    color: var(--%NS%v2-encre);\n  }\n  .sec-title[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 8px;\n    font-size: 12px;\n    color: var(--%NS%v2-ardoise);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(2, minmax(0, 1fr));\n    overflow: hidden;\n    border-radius: 18px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: center;\n    gap: 12px;\n    border-top: 1px solid var(--%NS%v2-separateur);\n    padding: 12px 14px;\n  }\n  .fact[_ngcontent-%COMP%]:nth-child(-n + 2) {\n    border-top: none;\n  }\n  .fact[_ngcontent-%COMP%]:nth-child(even) {\n    border-left: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact.wide[_ngcontent-%COMP%] {\n    grid-column: 1 / -1;\n    border-left: none;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 1px;\n    overflow-wrap: anywhere;\n    font-size: 14px;\n    font-weight: 800;\n  }\n  .dlist[_ngcontent-%COMP%] {\n    overflow: hidden;\n    border-radius: 18px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n  }\n  .dlist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 12px;\n    border-top: 1px solid var(--%NS%v2-separateur);\n    padding: 10px 14px;\n    font-size: 14px;\n  }\n  .dlist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {\n    border-top: none;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 32px;\n    width: 32px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 11px;\n    font-weight: 800;\n  }\n  .step[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  @media (max-width: 520px) {\n    .facts[_ngcontent-%COMP%] {\n      grid-template-columns: 1fr;\n    }\n    .fact[_ngcontent-%COMP%]:nth-child(2) {\n      border-top: 1px solid var(--%NS%v2-separateur);\n    }\n    .fact[_ngcontent-%COMP%]:nth-child(even) {\n      border-left: none;\n    }\n  }"]
}), _h);
var NONE = "\u2014";
var isEmpty = (v) => v === null || v === void 0 || v === "";
function detailFact(label, value, icon, opts = {}) {
  var _a2;
  return {
    label,
    value: isEmpty(value) ? NONE : value,
    icon,
    muted: isEmpty(value),
    wide: (_a2 = opts.wide) != null ? _a2 : false,
    tone: opts.tone
  };
}
function detailKpi(label, n, icon, tone, display) {
  return {
    label,
    value: display != null ? display : nf.format(n),
    icon,
    tone,
    muted: n === 0
  };
}
var _c0$10 = ["panel"];
var _c1$4 = ["*", [[
  "",
  "actions",
  ""
]]];
var _c2$3 = ["*", "[actions]"];
function UiDialogComponent_Conditional_0_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "h2", 4);
    __text(1);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __domProperty("id", ctx_r1.titleId);
    __advance();
    __textInterpolate(ctx_r1.title());
  }
}
function UiDialogComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __domElementStart(0, "div", 1)(1, "div", 2);
    __domListener("click", function UiDialogComponent_Conditional_0_Template_div_click_1_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.dismiss());
    });
    __domElementEnd();
    __domElementStart(2, "div", 3, 0);
    __conditionalCreate(4, UiDialogComponent_Conditional_0_Conditional_4_Template, 2, 2, "h2", 4);
    __domElementStart(5, "div", 5);
    __projection(6);
    __domElementEnd();
    __domElementStart(7, "div", 6);
    __projection(8, 1);
    __domElementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __attribute("aria-modal", true)("aria-labelledby", ctx_r1.titleId);
    __advance(2);
    __conditional(ctx_r1.title() ? 4 : -1);
  }
}
var UiDialogComponent = (_i = class {
  constructor() {
    this.open = model(false, ...[]);
    this.title = input("", ...[]);
    this.closed = output();
    this.titleId = `dlg-${Math.random().toString(36).slice(2, 9)}`;
    this.panel = viewChild("panel", ...[]);
    this.previous = null;
    this.locked = false;
    effect(() => {
      if (this.open()) {
        this.previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (!this.locked) {
          lockBodyScroll();
          this.locked = true;
        }
        setTimeout(() => {
          var _a2;
          const el = (_a2 = this.panel()) == null ? void 0 : _a2.nativeElement;
          if (el) focusInitial(el);
        }, 0);
      } else this.release();
    });
  }
  onKeydown(event) {
    var _a2;
    if (!this.open()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      this.dismiss();
      return;
    }
    const el = (_a2 = this.panel()) == null ? void 0 : _a2.nativeElement;
    if (el) trapTabKey(el, event);
  }
  dismiss() {
    this.open.set(false);
    this.closed.emit();
  }
  release() {
    var _a2;
    if (this.locked) {
      unlockBodyScroll();
      this.locked = false;
    }
    (_a2 = this.previous) == null ? void 0 : _a2.focus({ preventScroll: true });
    this.previous = null;
  }
}, _i.\u0275fac = function UiDialogComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _i)();
}, _i.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _i,
  selectors: [["ui-dialog"]],
  viewQuery: function UiDialogComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.panel, _c0$10, 5);
    if (rf & 2) __queryAdvance();
  },
  hostBindings: function UiDialogComponent_HostBindings(rf, ctx) {
    if (rf & 1) __listener("keydown", function UiDialogComponent_keydown_HostBindingHandler($event) {
      return ctx.onKeydown($event);
    }, __resolveDocument);
  },
  inputs: {
    open: [1, "open"],
    title: [1, "title"]
  },
  outputs: {
    open: "openChange",
    closed: "closed"
  },
  ngContentSelectors: _c2$3,
  decls: 1,
  vars: 1,
  consts: [
    ["panel", ""],
    [
      1,
      "fixed",
      "inset-0",
      "z-50",
      "flex",
      "items-end",
      "justify-center",
      "sm:items-center"
    ],
    [
      1,
      "absolute",
      "inset-0",
      "bg-black/40",
      3,
      "click"
    ],
    [
      "role",
      "dialog",
      "tabindex",
      "-1",
      1,
      "relative",
      "z-10",
      "max-h-[90vh]",
      "w-full",
      "overflow-y-auto",
      "rounded-t-lg",
      "border",
      "bg-card",
      "p-5",
      "shadow-lg",
      "sm:max-w-md",
      "sm:rounded-lg"
    ],
    [
      1,
      "text-lg",
      "font-semibold",
      3,
      "id"
    ],
    [1, "mt-3"],
    [
      1,
      "mt-5",
      "flex",
      "flex-wrap",
      "justify-end",
      "gap-2"
    ]
  ],
  template: function UiDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c1$4);
      __conditionalCreate(0, UiDialogComponent_Conditional_0_Template, 9, 3, "div", 1);
    }
    if (rf & 2) __conditional(ctx.open() ? 0 : -1);
  },
  encapsulation: 2
}), _i);
var _c0$9 = ["*"];
_j = class {
}, _j.\u0275fac = function UiEmptyComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _j)();
}, _j.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _j,
  selectors: [["ui-empty"]],
  ngContentSelectors: _c0$9,
  decls: 2,
  vars: 0,
  consts: [[
    1,
    "px-4",
    "py-10",
    "text-center",
    "text-muted-foreground"
  ]],
  template: function UiEmptyComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef();
      __domElementStart(0, "div", 0);
      __projection(1);
      __domElementEnd();
    }
  },
  encapsulation: 2
});
/**
* @license Angular v22.2.4
* (c) 2010-2026 Google LLC. https://angular.dev/
* License: MIT
*/
var BaseControlValueAccessor = /* @__PURE__ */ (() => {
  const _BaseControlValueAccessor = class _BaseControlValueAccessor {
    constructor(_renderer, _elementRef) {
      __publicField(this, "_renderer");
      __publicField(this, "_elementRef");
      __publicField(this, "onChange", (_) => {
      });
      __publicField(this, "onTouched", () => {
      });
      this._renderer = _renderer;
      this._elementRef = _elementRef;
    }
    setProperty(key, value) {
      this._renderer.setProperty(this._elementRef.nativeElement, key, value);
    }
    registerOnTouched(fn) {
      this.onTouched = fn;
    }
    registerOnChange(fn) {
      this.onChange = fn;
    }
    setDisabledState(isDisabled) {
      this.setProperty("disabled", isDisabled);
    }
  };
  __publicField(_BaseControlValueAccessor, "\u0275fac", function BaseControlValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseControlValueAccessor)(__directiveInject(Renderer2), __directiveInject(ElementRef));
  });
  __publicField(_BaseControlValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({ type: _BaseControlValueAccessor }));
  let BaseControlValueAccessor2 = _BaseControlValueAccessor;
  return BaseControlValueAccessor2;
})();
var BuiltInControlValueAccessor = /* @__PURE__ */ (() => {
  const _BuiltInControlValueAccessor = class _BuiltInControlValueAccessor extends BaseControlValueAccessor {
  };
  __publicField(_BuiltInControlValueAccessor, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275BuiltInControlValueAccessor_BaseFactory = void 0;
    return function BuiltInControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275BuiltInControlValueAccessor_BaseFactory || (\u0275BuiltInControlValueAccessor_BaseFactory = __getInheritedFactory(_BuiltInControlValueAccessor)))(__ngFactoryType__ || _BuiltInControlValueAccessor);
    };
  })());
  __publicField(_BuiltInControlValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _BuiltInControlValueAccessor,
    features: [__InheritDefinitionFeature]
  }));
  let BuiltInControlValueAccessor2 = _BuiltInControlValueAccessor;
  return BuiltInControlValueAccessor2;
})();
var NG_VALUE_ACCESSOR = /* @__PURE__ */ new InjectionToken("");
var CHECKBOX_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => CheckboxControlValueAccessor),
  multi: true
};
var CheckboxControlValueAccessor = /* @__PURE__ */ (() => {
  const _CheckboxControlValueAccessor = class _CheckboxControlValueAccessor extends BuiltInControlValueAccessor {
    writeValue(value) {
      this.setProperty("checked", value);
    }
  };
  __publicField(_CheckboxControlValueAccessor, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275CheckboxControlValueAccessor_BaseFactory = void 0;
    return function CheckboxControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275CheckboxControlValueAccessor_BaseFactory || (\u0275CheckboxControlValueAccessor_BaseFactory = __getInheritedFactory(_CheckboxControlValueAccessor)))(__ngFactoryType__ || _CheckboxControlValueAccessor);
    };
  })());
  __publicField(_CheckboxControlValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _CheckboxControlValueAccessor,
    selectors: [
      [
        "input",
        "type",
        "checkbox",
        "formControlName",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "checkbox",
        "formControl",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "checkbox",
        "ngModel",
        "",
        3,
        "ngNoCva",
        ""
      ]
    ],
    hostBindings: function CheckboxControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("change", function CheckboxControlValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target.checked);
      })("blur", function CheckboxControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    },
    standalone: false,
    features: [__ProvidersFeature([CHECKBOX_VALUE_ACCESSOR]), __InheritDefinitionFeature]
  }));
  let CheckboxControlValueAccessor2 = _CheckboxControlValueAccessor;
  return CheckboxControlValueAccessor2;
})();
var DEFAULT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => DefaultValueAccessor),
  multi: true
};
function _isAndroid() {
  const userAgent = getDOM() ? getDOM().getUserAgent() : "";
  return /android (\d+)/.test(userAgent.toLowerCase());
}
var COMPOSITION_BUFFER_MODE = /* @__PURE__ */ new InjectionToken("");
var DefaultValueAccessor = /* @__PURE__ */ (() => {
  const _DefaultValueAccessor = class _DefaultValueAccessor extends BaseControlValueAccessor {
    constructor(renderer, elementRef, _compositionMode) {
      super(renderer, elementRef);
      __publicField(this, "_compositionMode");
      __publicField(this, "_composing", false);
      this._compositionMode = _compositionMode;
      if (this._compositionMode == null) this._compositionMode = !_isAndroid();
    }
    writeValue(value) {
      const normalizedValue = value == null ? "" : value;
      this.setProperty("value", normalizedValue);
    }
    _handleInput(value) {
      if (!this._compositionMode || this._compositionMode && !this._composing) this.onChange(value);
    }
    _compositionStart() {
      this._composing = true;
    }
    _compositionEnd(value) {
      this._composing = false;
      this._compositionMode && this.onChange(value);
    }
  };
  __publicField(_DefaultValueAccessor, "\u0275fac", function DefaultValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DefaultValueAccessor)(__directiveInject(Renderer2), __directiveInject(ElementRef), __directiveInject(COMPOSITION_BUFFER_MODE, 8));
  });
  __publicField(_DefaultValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _DefaultValueAccessor,
    selectors: [
      [
        "input",
        "formControlName",
        "",
        3,
        "type",
        "checkbox",
        3,
        "ngNoCva",
        ""
      ],
      [
        "textarea",
        "formControlName",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "formControl",
        "",
        3,
        "type",
        "checkbox",
        3,
        "ngNoCva",
        ""
      ],
      [
        "textarea",
        "formControl",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "ngModel",
        "",
        3,
        "type",
        "checkbox",
        3,
        "ngNoCva",
        ""
      ],
      [
        "textarea",
        "ngModel",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "",
        "ngDefaultControl",
        ""
      ]
    ],
    hostBindings: function DefaultValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("input", function DefaultValueAccessor_input_HostBindingHandler($event) {
        return ctx._handleInput($event.target.value);
      })("blur", function DefaultValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      })("compositionstart", function DefaultValueAccessor_compositionstart_HostBindingHandler() {
        return ctx._compositionStart();
      })("compositionend", function DefaultValueAccessor_compositionend_HostBindingHandler($event) {
        return ctx._compositionEnd($event.target.value);
      });
    },
    standalone: false,
    features: [__ProvidersFeature([DEFAULT_VALUE_ACCESSOR]), __InheritDefinitionFeature]
  }));
  let DefaultValueAccessor2 = _DefaultValueAccessor;
  return DefaultValueAccessor2;
})();
function isEmptyInputValue(value) {
  return value == null || lengthOrSize(value) === 0;
}
function lengthOrSize(value) {
  if (value == null) return null;
  else if (Array.isArray(value) || typeof value === "string") return value.length;
  else if (value instanceof Set) return value.size;
  return null;
}
var NG_VALIDATORS = /* @__PURE__ */ new InjectionToken("");
var NG_ASYNC_VALIDATORS = /* @__PURE__ */ new InjectionToken("");
var EMAIL_REGEXP = /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
var Validators = class {
  static min(min) {
    return minValidator(min);
  }
  static max(max) {
    return maxValidator(max);
  }
  static required(control) {
    return requiredValidator(control);
  }
  static requiredTrue(control) {
    return requiredTrueValidator(control);
  }
  static email(control) {
    return emailValidator(control);
  }
  static minLength(minLength) {
    return minLengthValidator(minLength);
  }
  static maxLength(maxLength) {
    return maxLengthValidator(maxLength);
  }
  static pattern(pattern) {
    return patternValidator(pattern);
  }
  static nullValidator(control) {
    return nullValidator();
  }
  static compose(validators) {
    return compose(validators);
  }
  static composeAsync(validators) {
    return composeAsync(validators);
  }
};
function minValidator(min) {
  return (control) => {
    if (control.value == null || min == null) return null;
    const value = parseFloat(control.value);
    return !isNaN(value) && value < min ? { "min": {
      "min": min,
      "actual": control.value
    } } : null;
  };
}
function maxValidator(max) {
  return (control) => {
    if (control.value == null || max == null) return null;
    const value = parseFloat(control.value);
    return !isNaN(value) && value > max ? { "max": {
      "max": max,
      "actual": control.value
    } } : null;
  };
}
function requiredValidator(control) {
  return isEmptyInputValue(control.value) ? { "required": true } : null;
}
function requiredTrueValidator(control) {
  return control.value === true ? null : { "required": true };
}
function emailValidator(control) {
  if (isEmptyInputValue(control.value)) return null;
  return EMAIL_REGEXP.test(control.value) ? null : { "email": true };
}
function minLengthValidator(minLength) {
  return (control) => {
    var _a2, _b2;
    const length = (_b2 = (_a2 = control.value) == null ? void 0 : _a2.length) != null ? _b2 : lengthOrSize(control.value);
    if (length === null || length === 0) return null;
    return length < minLength ? { "minlength": {
      "requiredLength": minLength,
      "actualLength": length
    } } : null;
  };
}
function maxLengthValidator(maxLength) {
  return (control) => {
    var _a2, _b2;
    const length = (_b2 = (_a2 = control.value) == null ? void 0 : _a2.length) != null ? _b2 : lengthOrSize(control.value);
    if (length !== null && length > maxLength) return { "maxlength": {
      "requiredLength": maxLength,
      "actualLength": length
    } };
    return null;
  };
}
function patternValidator(pattern) {
  if (!pattern) return nullValidator;
  let regex;
  let regexStr;
  if (typeof pattern === "string") {
    regexStr = "";
    if (pattern.charAt(0) !== "^") regexStr += "^";
    regexStr += pattern;
    if (pattern.charAt(pattern.length - 1) !== "$") regexStr += "$";
    regex = new RegExp(regexStr);
  } else {
    regexStr = pattern.toString();
    regex = pattern;
  }
  return (control) => {
    if (isEmptyInputValue(control.value)) return null;
    const value = control.value;
    return regex.test(value) ? null : { "pattern": {
      "requiredPattern": regexStr,
      "actualValue": value
    } };
  };
}
function nullValidator(control) {
  return null;
}
function isPresent(o) {
  return o != null;
}
function toObservable(value) {
  return isPromise(value) ? from(value) : value;
}
function mergeErrors(arrayOfErrors) {
  let res = {};
  arrayOfErrors.forEach((errors) => {
    res = errors != null ? {
      ...res,
      ...errors
    } : res;
  });
  return Object.keys(res).length === 0 ? null : res;
}
function executeValidators(control, validators) {
  return validators.map((validator) => validator(control));
}
function isValidatorFn(validator) {
  return !validator.validate;
}
function normalizeValidators(validators) {
  return validators.map((validator) => {
    return isValidatorFn(validator) ? validator : (c) => validator.validate(c);
  });
}
function compose(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    return mergeErrors(executeValidators(control, presentValidators));
  };
}
function composeValidators(validators) {
  return validators != null ? compose(normalizeValidators(validators)) : null;
}
function composeAsync(validators) {
  if (!validators) return null;
  const presentValidators = validators.filter(isPresent);
  if (presentValidators.length == 0) return null;
  return function(control) {
    const observables = executeValidators(control, presentValidators).map(toObservable);
    return forkJoin(observables).pipe(map(mergeErrors));
  };
}
function composeAsyncValidators(validators) {
  return validators != null ? composeAsync(normalizeValidators(validators)) : null;
}
function mergeValidators(controlValidators, dirValidator) {
  if (controlValidators === null) return [dirValidator];
  return Array.isArray(controlValidators) ? [...controlValidators, dirValidator] : [controlValidators, dirValidator];
}
function getControlValidators(control) {
  return control._rawValidators;
}
function getControlAsyncValidators(control) {
  return control._rawAsyncValidators;
}
function makeValidatorsArray(validators) {
  if (!validators) return [];
  return Array.isArray(validators) ? validators : [validators];
}
function hasValidator(validators, validator) {
  return Array.isArray(validators) ? validators.includes(validator) : validators === validator;
}
function addValidators(validators, currentValidators) {
  const current = makeValidatorsArray(currentValidators);
  makeValidatorsArray(validators).forEach((v) => {
    if (!hasValidator(current, v)) current.push(v);
  });
  return current;
}
function removeValidators(validators, currentValidators) {
  return makeValidatorsArray(currentValidators).filter((v) => !hasValidator(validators, v));
}
var AbstractControlDirective = class {
  constructor() {
    __publicField(this, "_composedValidatorFn");
    __publicField(this, "_composedAsyncValidatorFn");
    __publicField(this, "_rawValidators", []);
    __publicField(this, "_rawAsyncValidators", []);
    __publicField(this, "_onDestroyCallbacks", []);
  }
  get value() {
    return this.control ? this.control.value : null;
  }
  get valid() {
    return this.control ? this.control.valid : null;
  }
  get invalid() {
    return this.control ? this.control.invalid : null;
  }
  get pending() {
    return this.control ? this.control.pending : null;
  }
  get disabled() {
    return this.control ? this.control.disabled : null;
  }
  get enabled() {
    return this.control ? this.control.enabled : null;
  }
  get errors() {
    return this.control ? this.control.errors : null;
  }
  get pristine() {
    return this.control ? this.control.pristine : null;
  }
  get dirty() {
    return this.control ? this.control.dirty : null;
  }
  get touched() {
    return this.control ? this.control.touched : null;
  }
  get status() {
    return this.control ? this.control.status : null;
  }
  get untouched() {
    return this.control ? this.control.untouched : null;
  }
  get statusChanges() {
    return this.control ? this.control.statusChanges : null;
  }
  get valueChanges() {
    return this.control ? this.control.valueChanges : null;
  }
  get path() {
    return null;
  }
  _setValidators(validators) {
    this._rawValidators = validators || [];
    this._composedValidatorFn = composeValidators(this._rawValidators);
  }
  _setAsyncValidators(validators) {
    this._rawAsyncValidators = validators || [];
    this._composedAsyncValidatorFn = composeAsyncValidators(this._rawAsyncValidators);
  }
  get validator() {
    return this._composedValidatorFn || null;
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn || null;
  }
  _registerOnDestroy(fn) {
    this._onDestroyCallbacks.push(fn);
  }
  _invokeOnDestroyCallbacks() {
    this._onDestroyCallbacks.forEach((fn) => fn());
    this._onDestroyCallbacks = [];
  }
  reset(value = void 0) {
    var _a2;
    (_a2 = this.control) == null ? void 0 : _a2.reset(value);
  }
  hasError(errorCode, path) {
    return this.control ? this.control.hasError(errorCode, path) : false;
  }
  getError(errorCode, path) {
    return this.control ? this.control.getError(errorCode, path) : null;
  }
};
var ControlContainer = class extends AbstractControlDirective {
  constructor() {
    super(...arguments);
    __publicField(this, "name");
  }
  get formDirective() {
    return null;
  }
  get path() {
    return null;
  }
};
var VALID = "VALID";
var INVALID = "INVALID";
var PENDING = "PENDING";
var DISABLED = "DISABLED";
var ControlEvent = class {
};
var ValueChangeEvent = class extends ControlEvent {
  constructor(value, source) {
    super();
    __publicField(this, "value");
    __publicField(this, "source");
    this.value = value;
    this.source = source;
  }
};
var PristineChangeEvent = class extends ControlEvent {
  constructor(pristine, source) {
    super();
    __publicField(this, "pristine");
    __publicField(this, "source");
    this.pristine = pristine;
    this.source = source;
  }
};
var TouchedChangeEvent = class extends ControlEvent {
  constructor(touched, source) {
    super();
    __publicField(this, "touched");
    __publicField(this, "source");
    this.touched = touched;
    this.source = source;
  }
};
var StatusChangeEvent = class extends ControlEvent {
  constructor(status, source) {
    super();
    __publicField(this, "status");
    __publicField(this, "source");
    this.status = status;
    this.source = source;
  }
};
var FormSubmittedEvent = class extends ControlEvent {
  constructor(source) {
    super();
    __publicField(this, "source");
    this.source = source;
  }
};
var FormResetEvent = class extends ControlEvent {
  constructor(source) {
    super();
    __publicField(this, "source");
    this.source = source;
  }
};
function pickValidators(validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.validators : validatorOrOpts) || null;
}
function coerceToValidator(validator) {
  return Array.isArray(validator) ? composeValidators(validator) : validator || null;
}
function pickAsyncValidators(asyncValidator, validatorOrOpts) {
  return (isOptionsObj(validatorOrOpts) ? validatorOrOpts.asyncValidators : asyncValidator) || null;
}
function coerceToAsyncValidator(asyncValidator) {
  return Array.isArray(asyncValidator) ? composeAsyncValidators(asyncValidator) : asyncValidator || null;
}
function isOptionsObj(validatorOrOpts) {
  return validatorOrOpts != null && !Array.isArray(validatorOrOpts) && typeof validatorOrOpts === "object";
}
function assertControlPresent(parent, isGroup, key) {
  const controls = parent.controls;
  if (!(Object.keys(controls) ).length) throw new RuntimeError(1e3, "");
  if (!hasOwnControl(controls, key)) throw new RuntimeError(1001, "");
}
function assertAllValuesPresent(control, isGroup, value) {
  control._forEachChild((_, key) => {
    if (value[key] === void 0) throw new RuntimeError(-1002, "");
  });
}
var AbstractControl = class {
  constructor(validators, asyncValidators) {
    __publicField(this, "_pendingDirty", false);
    __publicField(this, "_hasOwnPendingAsyncValidator", null);
    __publicField(this, "_pendingTouched", false);
    __publicField(this, "_onCollectionChange", () => {
    });
    __publicField(this, "_updateOn");
    __publicField(this, "_hasRequired", signal(false, ...[]));
    __publicField(this, "_parent", null);
    __publicField(this, "_asyncValidationSubscription");
    __publicField(this, "_composedValidatorFn");
    __publicField(this, "_composedAsyncValidatorFn");
    __publicField(this, "_rawValidators");
    __publicField(this, "_rawAsyncValidators");
    __publicField(this, "value");
    __publicField(this, "_status", computed(() => this.statusReactive(), ...[]));
    __publicField(this, "statusReactive", signal(void 0, ...[]));
    __publicField(this, "errors");
    __publicField(this, "_pristine", computed(() => this.pristineReactive(), ...[]));
    __publicField(this, "pristineReactive", signal(true, ...[]));
    __publicField(this, "_touched", computed(() => this.touchedReactive(), ...[]));
    __publicField(this, "touchedReactive", signal(false, ...[]));
    __publicField(this, "_events", new Subject());
    __publicField(this, "events", this._events.asObservable());
    __publicField(this, "valueChanges");
    __publicField(this, "statusChanges");
    __publicField(this, "_onDisabledChange", []);
    this._assignValidators(validators);
    this._assignAsyncValidators(asyncValidators);
  }
  get validator() {
    return this._composedValidatorFn;
  }
  set validator(validatorFn) {
    this._rawValidators = this._composedValidatorFn = validatorFn;
    this._updateHasRequiredValidator();
  }
  get asyncValidator() {
    return this._composedAsyncValidatorFn;
  }
  set asyncValidator(asyncValidatorFn) {
    this._rawAsyncValidators = this._composedAsyncValidatorFn = asyncValidatorFn;
  }
  get parent() {
    return this._parent;
  }
  get status() {
    return untracked(this.statusReactive);
  }
  set status(v) {
    untracked(() => this.statusReactive.set(v));
  }
  get valid() {
    return this.status === VALID;
  }
  get invalid() {
    return this.status === INVALID;
  }
  get pending() {
    return this.status === PENDING;
  }
  get disabled() {
    return this.status === DISABLED;
  }
  get enabled() {
    return this.status !== DISABLED;
  }
  get pristine() {
    return untracked(this.pristineReactive);
  }
  set pristine(v) {
    untracked(() => this.pristineReactive.set(v));
  }
  get dirty() {
    return !this.pristine;
  }
  get touched() {
    return untracked(this.touchedReactive);
  }
  set touched(v) {
    untracked(() => this.touchedReactive.set(v));
  }
  get untouched() {
    return !this.touched;
  }
  get updateOn() {
    return this._updateOn ? this._updateOn : this.parent ? this.parent.updateOn : "change";
  }
  setValidators(validators) {
    this._assignValidators(validators);
  }
  setAsyncValidators(validators) {
    this._assignAsyncValidators(validators);
  }
  addValidators(validators) {
    this.setValidators(addValidators(validators, this._rawValidators));
  }
  addAsyncValidators(validators) {
    this.setAsyncValidators(addValidators(validators, this._rawAsyncValidators));
  }
  removeValidators(validators) {
    this.setValidators(removeValidators(validators, this._rawValidators));
  }
  removeAsyncValidators(validators) {
    this.setAsyncValidators(removeValidators(validators, this._rawAsyncValidators));
  }
  hasValidator(validator) {
    return hasValidator(this._rawValidators, validator);
  }
  hasAsyncValidator(validator) {
    return hasValidator(this._rawAsyncValidators, validator);
  }
  clearValidators() {
    this.validator = null;
  }
  clearAsyncValidators() {
    this.asyncValidator = null;
  }
  markAsTouched(opts = {}) {
    var _a2, _b2;
    const changed = this.touched === false;
    this.touched = true;
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    if (!opts.onlySelf) (_b2 = this._parent) == null ? void 0 : _b2.markAsTouched({
      ...opts,
      sourceControl
    });
    if (changed && opts.emitEvent !== false) this._events.next(new TouchedChangeEvent(true, sourceControl));
  }
  markAllAsDirty(opts = {}) {
    this.markAsDirty({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsDirty(opts));
  }
  markAllAsTouched(opts = {}) {
    this.markAsTouched({
      onlySelf: true,
      emitEvent: opts.emitEvent,
      sourceControl: this
    });
    this._forEachChild((control) => control.markAllAsTouched(opts));
  }
  markAsUntouched(opts = {}) {
    var _a2, _b2;
    const changed = this.touched === true;
    this.touched = false;
    this._pendingTouched = false;
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    this._forEachChild((control) => {
      control.markAsUntouched({
        onlySelf: true,
        emitEvent: opts.emitEvent,
        sourceControl
      });
    });
    if (!opts.onlySelf) (_b2 = this._parent) == null ? void 0 : _b2._updateTouched(opts, sourceControl);
    if (changed && opts.emitEvent !== false) this._events.next(new TouchedChangeEvent(false, sourceControl));
  }
  markAsDirty(opts = {}) {
    var _a2, _b2;
    const changed = this.pristine === true;
    this.pristine = false;
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    if (!opts.onlySelf) (_b2 = this._parent) == null ? void 0 : _b2.markAsDirty({
      ...opts,
      sourceControl
    });
    if (changed && opts.emitEvent !== false) this._events.next(new PristineChangeEvent(false, sourceControl));
  }
  markAsPristine(opts = {}) {
    var _a2, _b2;
    const changed = this.pristine === false;
    this.pristine = true;
    this._pendingDirty = false;
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    this._forEachChild((control) => {
      control.markAsPristine({
        onlySelf: true,
        emitEvent: opts.emitEvent
      });
    });
    if (!opts.onlySelf) (_b2 = this._parent) == null ? void 0 : _b2._updatePristine(opts, sourceControl);
    if (changed && opts.emitEvent !== false) this._events.next(new PristineChangeEvent(true, sourceControl));
  }
  markAsPending(opts = {}) {
    var _a2, _b2;
    this.status = PENDING;
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    if (opts.emitEvent !== false) {
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.statusChanges.emit(this.status);
    }
    if (!opts.onlySelf) (_b2 = this._parent) == null ? void 0 : _b2.markAsPending({
      ...opts,
      sourceControl
    });
  }
  disable(opts = {}) {
    var _a2;
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = DISABLED;
    this.errors = null;
    this._forEachChild((control) => {
      control.disable({
        ...opts,
        onlySelf: true
      });
    });
    this._updateValue();
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    this._updateAncestors({
      ...opts,
      skipPristineCheck
    }, this);
    this._onDisabledChange.forEach((changeFn) => changeFn(true));
  }
  enable(opts = {}) {
    const skipPristineCheck = this._parentMarkedDirty(opts.onlySelf);
    this.status = VALID;
    this._forEachChild((control) => {
      control.enable({
        ...opts,
        onlySelf: true
      });
    });
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
    this._updateAncestors({
      ...opts,
      skipPristineCheck
    }, this);
    this._onDisabledChange.forEach((changeFn) => changeFn(false));
  }
  _updateAncestors(opts, sourceControl) {
    var _a2, _b2, _c6;
    if (!opts.onlySelf) {
      (_a2 = this._parent) == null ? void 0 : _a2.updateValueAndValidity(opts);
      if (!opts.skipPristineCheck) (_b2 = this._parent) == null ? void 0 : _b2._updatePristine({}, sourceControl);
      (_c6 = this._parent) == null ? void 0 : _c6._updateTouched({}, sourceControl);
    }
  }
  setParent(parent) {
    this._parent = parent;
  }
  getRawValue() {
    return this.value;
  }
  updateValueAndValidity(opts = {}) {
    var _a2, _b2;
    this._setInitialStatus();
    this._updateValue();
    if (this.enabled) {
      const shouldHaveEmitted = this._cancelExistingSubscription();
      this.errors = this._runValidator();
      this.status = this._calculateStatus();
      if (this.status === VALID || this.status === PENDING) this._runAsyncValidator(shouldHaveEmitted, opts.emitEvent);
    }
    const sourceControl = (_a2 = opts.sourceControl) != null ? _a2 : this;
    if (opts.emitEvent !== false) {
      this._events.next(new ValueChangeEvent(this.value, sourceControl));
      this._events.next(new StatusChangeEvent(this.status, sourceControl));
      this.valueChanges.emit(this.value);
      this.statusChanges.emit(this.status);
    }
    if (!opts.onlySelf) (_b2 = this._parent) == null ? void 0 : _b2.updateValueAndValidity({
      ...opts,
      sourceControl
    });
  }
  _updateTreeValidity(opts = { emitEvent: true }) {
    this._forEachChild((ctrl) => ctrl._updateTreeValidity(opts));
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: opts.emitEvent
    });
  }
  _setInitialStatus() {
    this.status = this._allControlsDisabled() ? DISABLED : VALID;
  }
  _runValidator() {
    return this.validator ? this.validator(this) : null;
  }
  _runAsyncValidator(shouldHaveEmitted, emitEvent) {
    if (this.asyncValidator) {
      this.status = PENDING;
      this._hasOwnPendingAsyncValidator = {
        emitEvent: emitEvent !== false,
        shouldHaveEmitted: shouldHaveEmitted !== false
      };
      const obs = toObservable(this.asyncValidator(this));
      this._asyncValidationSubscription = obs.subscribe((errors) => {
        this._hasOwnPendingAsyncValidator = null;
        this.setErrors(errors, {
          emitEvent,
          shouldHaveEmitted
        });
      });
    }
  }
  _cancelExistingSubscription() {
    var _a2, _b2, _c6;
    if (this._asyncValidationSubscription) {
      this._asyncValidationSubscription.unsubscribe();
      const shouldHaveEmitted = (_c6 = ((_a2 = this._hasOwnPendingAsyncValidator) == null ? void 0 : _a2.emitEvent) || ((_b2 = this._hasOwnPendingAsyncValidator) == null ? void 0 : _b2.shouldHaveEmitted)) != null ? _c6 : false;
      this._hasOwnPendingAsyncValidator = null;
      return shouldHaveEmitted;
    }
    return false;
  }
  setErrors(errors, opts = {}) {
    this.errors = errors;
    this._updateControlsErrors(opts.emitEvent !== false, this, opts.shouldHaveEmitted);
  }
  get(path) {
    let currPath = path;
    if (currPath == null) return null;
    if (!Array.isArray(currPath)) currPath = currPath.split(".");
    if (currPath.length === 0) return null;
    return currPath.reduce((control, name) => control && control._find(name), this);
  }
  getError(errorCode, path) {
    const control = path ? this.get(path) : this;
    return (control == null ? void 0 : control.errors) ? control.errors[errorCode] : null;
  }
  hasError(errorCode, path) {
    return !!this.getError(errorCode, path);
  }
  get root() {
    let x = this;
    while (x._parent) x = x._parent;
    return x;
  }
  _updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted) {
    this.status = this._calculateStatus();
    if (emitEvent) this.statusChanges.emit(this.status);
    if (emitEvent || shouldHaveEmitted) this._events.next(new StatusChangeEvent(this.status, changedControl));
    if (this._parent) this._parent._updateControlsErrors(emitEvent, changedControl, shouldHaveEmitted);
  }
  _initObservables() {
    this.valueChanges = new EventEmitter();
    this.statusChanges = new EventEmitter();
  }
  _calculateStatus() {
    if (this._allControlsDisabled()) return DISABLED;
    if (this.errors) return INVALID;
    if (this._hasOwnPendingAsyncValidator || this._anyControlsHaveStatus(PENDING)) return PENDING;
    if (this._anyControlsHaveStatus(INVALID)) return INVALID;
    return VALID;
  }
  _anyControlsHaveStatus(status) {
    return this._anyControls((control) => control.status === status);
  }
  _anyControlsDirty() {
    return this._anyControls((control) => control.dirty);
  }
  _anyControlsTouched() {
    return this._anyControls((control) => control.touched);
  }
  _updatePristine(opts, changedControl) {
    var _a2;
    const newPristine = !this._anyControlsDirty();
    const changed = this.pristine !== newPristine;
    this.pristine = newPristine;
    if (!opts.onlySelf) (_a2 = this._parent) == null ? void 0 : _a2._updatePristine(opts, changedControl);
    if (changed) this._events.next(new PristineChangeEvent(this.pristine, changedControl));
  }
  _updateTouched(opts = {}, changedControl) {
    var _a2;
    this.touched = this._anyControlsTouched();
    this._events.next(new TouchedChangeEvent(this.touched, changedControl));
    if (!opts.onlySelf) (_a2 = this._parent) == null ? void 0 : _a2._updateTouched(opts, changedControl);
  }
  _registerOnCollectionChange(fn) {
    this._onCollectionChange = fn;
  }
  _setUpdateStrategy(opts) {
    if (isOptionsObj(opts) && opts.updateOn != null) this._updateOn = opts.updateOn;
  }
  _parentMarkedDirty(onlySelf) {
    var _a2;
    return !onlySelf && !!((_a2 = this._parent) == null ? void 0 : _a2.dirty) && !this._parent._anyControlsDirty();
  }
  _find(name) {
    return null;
  }
  _assignValidators(validators) {
    this._rawValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedValidatorFn = coerceToValidator(this._rawValidators);
    this._updateHasRequiredValidator();
  }
  _assignAsyncValidators(validators) {
    this._rawAsyncValidators = Array.isArray(validators) ? validators.slice() : validators;
    this._composedAsyncValidatorFn = coerceToAsyncValidator(this._rawAsyncValidators);
  }
  _updateHasRequiredValidator() {
    untracked(() => this._hasRequired.set(this.hasValidator(Validators.required)));
  }
};
function hasOwnControl(controls, name) {
  return Object.hasOwn(controls, name);
}
function isNativeFormElement(element) {
  return element.tagName === "INPUT" || element.tagName === "SELECT" || element.tagName === "TEXTAREA";
}
function setNativeDomProperty(renderer, element, name, value) {
  switch (name) {
    case "name":
      renderer.setAttribute(element, name, value);
      break;
    case "disabled":
    case "readonly":
    case "required":
      if (value) renderer.setAttribute(element, name, "");
      else renderer.removeAttribute(element, name);
      break;
    case "max":
    case "min":
    case "minLength":
    case "maxLength":
      if (value !== void 0) renderer.setAttribute(element, name, value.toString());
      else renderer.removeAttribute(element, name);
  }
}
var ReactiveValidationError = class {
  constructor({ kind, context, control }) {
    __publicField(this, "kind");
    __publicField(this, "context");
    __publicField(this, "control");
    __publicField(this, "message");
    this.kind = kind;
    this.context = context;
    this.control = control;
  }
};
function toInteger(value) {
  return typeof value === "number" ? value : parseInt(value, 10);
}
function toFloat(value) {
  return typeof value === "number" ? value : parseFloat(value);
}
var AbstractValidatorDirective = /* @__PURE__ */ (() => {
  const _AbstractValidatorDirective = class _AbstractValidatorDirective {
    constructor() {
      __publicField(this, "_validator", nullValidator);
      __publicField(this, "_onChange");
      __publicField(this, "_enabled");
    }
    ngOnChanges(changes) {
      var _a2;
      if (this.inputName in changes) {
        const input2 = this.normalizeInput(changes[this.inputName].currentValue);
        this._enabled = this.enabled(input2);
        this._validator = this._enabled ? this.createValidator(input2) : nullValidator;
        (_a2 = this._onChange) == null ? void 0 : _a2.call(this);
      }
    }
    validate(control) {
      return this._validator(control);
    }
    registerOnValidatorChange(fn) {
      this._onChange = fn;
    }
    enabled(input2) {
      return input2 != null;
    }
  };
  __publicField(_AbstractValidatorDirective, "\u0275fac", function AbstractValidatorDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AbstractValidatorDirective)();
  });
  __publicField(_AbstractValidatorDirective, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _AbstractValidatorDirective,
    features: [__NgOnChangesFeature]
  }));
  let AbstractValidatorDirective2 = _AbstractValidatorDirective;
  return AbstractValidatorDirective2;
})();
var MAX_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => MaxValidator),
  multi: true
};
var MaxValidator = /* @__PURE__ */ (() => {
  const _MaxValidator = class _MaxValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "max");
      __publicField(this, "inputName", "max");
      __publicField(this, "normalizeInput", (input2) => toFloat(input2));
      __publicField(this, "createValidator", (max) => maxValidator(max));
    }
  };
  __publicField(_MaxValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275MaxValidator_BaseFactory = void 0;
    return function MaxValidator_Factory(__ngFactoryType__) {
      return (\u0275MaxValidator_BaseFactory || (\u0275MaxValidator_BaseFactory = __getInheritedFactory(_MaxValidator)))(__ngFactoryType__ || _MaxValidator);
    };
  })());
  __publicField(_MaxValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _MaxValidator,
    selectors: [
      [
        "input",
        "type",
        "number",
        "max",
        "",
        "formControlName",
        ""
      ],
      [
        "input",
        "type",
        "number",
        "max",
        "",
        "formControl",
        ""
      ],
      [
        "input",
        "type",
        "number",
        "max",
        "",
        "ngModel",
        ""
      ]
    ],
    hostVars: 1,
    hostBindings: function MaxValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("max", ctx._enabled ? ctx.max : null);
    },
    inputs: { max: "max" },
    standalone: false,
    features: [__ProvidersFeature([MAX_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let MaxValidator2 = _MaxValidator;
  return MaxValidator2;
})();
var MIN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => MinValidator),
  multi: true
};
var MinValidator = /* @__PURE__ */ (() => {
  const _MinValidator = class _MinValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "min");
      __publicField(this, "inputName", "min");
      __publicField(this, "normalizeInput", (input2) => toFloat(input2));
      __publicField(this, "createValidator", (min) => minValidator(min));
    }
  };
  __publicField(_MinValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275MinValidator_BaseFactory = void 0;
    return function MinValidator_Factory(__ngFactoryType__) {
      return (\u0275MinValidator_BaseFactory || (\u0275MinValidator_BaseFactory = __getInheritedFactory(_MinValidator)))(__ngFactoryType__ || _MinValidator);
    };
  })());
  __publicField(_MinValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _MinValidator,
    selectors: [
      [
        "input",
        "type",
        "number",
        "min",
        "",
        "formControlName",
        ""
      ],
      [
        "input",
        "type",
        "number",
        "min",
        "",
        "formControl",
        ""
      ],
      [
        "input",
        "type",
        "number",
        "min",
        "",
        "ngModel",
        ""
      ]
    ],
    hostVars: 1,
    hostBindings: function MinValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("min", ctx._enabled ? ctx.min : null);
    },
    inputs: { min: "min" },
    standalone: false,
    features: [__ProvidersFeature([MIN_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let MinValidator2 = _MinValidator;
  return MinValidator2;
})();
var REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => RequiredValidator),
  multi: true
};
var CHECKBOX_REQUIRED_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => CheckboxRequiredValidator),
  multi: true
};
var RequiredValidator = /* @__PURE__ */ (() => {
  const _RequiredValidator = class _RequiredValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "required");
      __publicField(this, "inputName", "required");
      __publicField(this, "normalizeInput", booleanAttribute);
      __publicField(this, "createValidator", (input2) => requiredValidator);
    }
    enabled(input2) {
      return input2;
    }
  };
  __publicField(_RequiredValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275RequiredValidator_BaseFactory = void 0;
    return function RequiredValidator_Factory(__ngFactoryType__) {
      return (\u0275RequiredValidator_BaseFactory || (\u0275RequiredValidator_BaseFactory = __getInheritedFactory(_RequiredValidator)))(__ngFactoryType__ || _RequiredValidator);
    };
  })());
  __publicField(_RequiredValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _RequiredValidator,
    selectors: [
      [
        "",
        "required",
        "",
        "formControlName",
        "",
        3,
        "type",
        "checkbox"
      ],
      [
        "",
        "required",
        "",
        "formControl",
        "",
        3,
        "type",
        "checkbox"
      ],
      [
        "",
        "required",
        "",
        "ngModel",
        "",
        3,
        "type",
        "checkbox"
      ]
    ],
    hostVars: 1,
    hostBindings: function RequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("required", ctx._enabled ? "" : null);
    },
    inputs: { required: "required" },
    standalone: false,
    features: [__ProvidersFeature([REQUIRED_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let RequiredValidator2 = _RequiredValidator;
  return RequiredValidator2;
})();
var CheckboxRequiredValidator = /* @__PURE__ */ (() => {
  const _CheckboxRequiredValidator = class _CheckboxRequiredValidator extends RequiredValidator {
    constructor() {
      super(...arguments);
      __publicField(this, "createValidator", (input2) => requiredTrueValidator);
    }
  };
  __publicField(_CheckboxRequiredValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275CheckboxRequiredValidator_BaseFactory = void 0;
    return function CheckboxRequiredValidator_Factory(__ngFactoryType__) {
      return (\u0275CheckboxRequiredValidator_BaseFactory || (\u0275CheckboxRequiredValidator_BaseFactory = __getInheritedFactory(_CheckboxRequiredValidator)))(__ngFactoryType__ || _CheckboxRequiredValidator);
    };
  })());
  __publicField(_CheckboxRequiredValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _CheckboxRequiredValidator,
    selectors: [
      [
        "input",
        "type",
        "checkbox",
        "required",
        "",
        "formControlName",
        ""
      ],
      [
        "input",
        "type",
        "checkbox",
        "required",
        "",
        "formControl",
        ""
      ],
      [
        "input",
        "type",
        "checkbox",
        "required",
        "",
        "ngModel",
        ""
      ]
    ],
    hostVars: 1,
    hostBindings: function CheckboxRequiredValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("required", ctx._enabled ? "" : null);
    },
    standalone: false,
    features: [__ProvidersFeature([CHECKBOX_REQUIRED_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let CheckboxRequiredValidator2 = _CheckboxRequiredValidator;
  return CheckboxRequiredValidator2;
})();
var EMAIL_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => EmailValidator),
  multi: true
};
var EmailValidator = /* @__PURE__ */ (() => {
  const _EmailValidator = class _EmailValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "email");
      __publicField(this, "inputName", "email");
      __publicField(this, "normalizeInput", booleanAttribute);
      __publicField(this, "createValidator", (input2) => emailValidator);
    }
    enabled(input2) {
      return input2;
    }
  };
  __publicField(_EmailValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275EmailValidator_BaseFactory = void 0;
    return function EmailValidator_Factory(__ngFactoryType__) {
      return (\u0275EmailValidator_BaseFactory || (\u0275EmailValidator_BaseFactory = __getInheritedFactory(_EmailValidator)))(__ngFactoryType__ || _EmailValidator);
    };
  })());
  __publicField(_EmailValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _EmailValidator,
    selectors: [
      [
        "",
        "email",
        "",
        "formControlName",
        ""
      ],
      [
        "",
        "email",
        "",
        "formControl",
        ""
      ],
      [
        "",
        "email",
        "",
        "ngModel",
        ""
      ]
    ],
    inputs: { email: "email" },
    standalone: false,
    features: [__ProvidersFeature([EMAIL_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let EmailValidator2 = _EmailValidator;
  return EmailValidator2;
})();
var MIN_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => MinLengthValidator),
  multi: true
};
var MinLengthValidator = /* @__PURE__ */ (() => {
  const _MinLengthValidator = class _MinLengthValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "minlength");
      __publicField(this, "inputName", "minlength");
      __publicField(this, "normalizeInput", (input2) => toInteger(input2));
      __publicField(this, "createValidator", (minlength) => minLengthValidator(minlength));
    }
  };
  __publicField(_MinLengthValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275MinLengthValidator_BaseFactory = void 0;
    return function MinLengthValidator_Factory(__ngFactoryType__) {
      return (\u0275MinLengthValidator_BaseFactory || (\u0275MinLengthValidator_BaseFactory = __getInheritedFactory(_MinLengthValidator)))(__ngFactoryType__ || _MinLengthValidator);
    };
  })());
  __publicField(_MinLengthValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _MinLengthValidator,
    selectors: [
      [
        "",
        "minlength",
        "",
        "formControlName",
        ""
      ],
      [
        "",
        "minlength",
        "",
        "formControl",
        ""
      ],
      [
        "",
        "minlength",
        "",
        "ngModel",
        ""
      ]
    ],
    hostVars: 1,
    hostBindings: function MinLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("minlength", ctx._enabled ? ctx.minlength : null);
    },
    inputs: { minlength: "minlength" },
    standalone: false,
    features: [__ProvidersFeature([MIN_LENGTH_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let MinLengthValidator2 = _MinLengthValidator;
  return MinLengthValidator2;
})();
var MAX_LENGTH_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => MaxLengthValidator),
  multi: true
};
var MaxLengthValidator = /* @__PURE__ */ (() => {
  const _MaxLengthValidator = class _MaxLengthValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "maxlength");
      __publicField(this, "inputName", "maxlength");
      __publicField(this, "normalizeInput", (input2) => toInteger(input2));
      __publicField(this, "createValidator", (maxlength) => maxLengthValidator(maxlength));
    }
  };
  __publicField(_MaxLengthValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275MaxLengthValidator_BaseFactory = void 0;
    return function MaxLengthValidator_Factory(__ngFactoryType__) {
      return (\u0275MaxLengthValidator_BaseFactory || (\u0275MaxLengthValidator_BaseFactory = __getInheritedFactory(_MaxLengthValidator)))(__ngFactoryType__ || _MaxLengthValidator);
    };
  })());
  __publicField(_MaxLengthValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _MaxLengthValidator,
    selectors: [
      [
        "",
        "maxlength",
        "",
        "formControlName",
        ""
      ],
      [
        "",
        "maxlength",
        "",
        "formControl",
        ""
      ],
      [
        "",
        "maxlength",
        "",
        "ngModel",
        ""
      ]
    ],
    hostVars: 1,
    hostBindings: function MaxLengthValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("maxlength", ctx._enabled ? ctx.maxlength : null);
    },
    inputs: { maxlength: "maxlength" },
    standalone: false,
    features: [__ProvidersFeature([MAX_LENGTH_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let MaxLengthValidator2 = _MaxLengthValidator;
  return MaxLengthValidator2;
})();
var PATTERN_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: /* @__PURE__ */ forwardRef(() => PatternValidator),
  multi: true
};
var PatternValidator = /* @__PURE__ */ (() => {
  const _PatternValidator = class _PatternValidator extends AbstractValidatorDirective {
    constructor() {
      super(...arguments);
      __publicField(this, "pattern");
      __publicField(this, "inputName", "pattern");
      __publicField(this, "normalizeInput", (input2) => input2);
      __publicField(this, "createValidator", (input2) => patternValidator(input2));
    }
  };
  __publicField(_PatternValidator, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275PatternValidator_BaseFactory = void 0;
    return function PatternValidator_Factory(__ngFactoryType__) {
      return (\u0275PatternValidator_BaseFactory || (\u0275PatternValidator_BaseFactory = __getInheritedFactory(_PatternValidator)))(__ngFactoryType__ || _PatternValidator);
    };
  })());
  __publicField(_PatternValidator, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _PatternValidator,
    selectors: [
      [
        "",
        "pattern",
        "",
        "formControlName",
        ""
      ],
      [
        "",
        "pattern",
        "",
        "formControl",
        ""
      ],
      [
        "",
        "pattern",
        "",
        "ngModel",
        ""
      ]
    ],
    hostVars: 1,
    hostBindings: function PatternValidator_HostBindings(rf, ctx) {
      if (rf & 2) __attribute("pattern", ctx._enabled ? ctx.pattern : null);
    },
    inputs: { pattern: "pattern" },
    standalone: false,
    features: [__ProvidersFeature([PATTERN_VALIDATOR]), __InheritDefinitionFeature]
  }));
  let PatternValidator2 = _PatternValidator;
  return PatternValidator2;
})();
var \u0275FORM_CONTROL_INTEGRATION = /* @__PURE__ */ new InjectionToken("");
var CALL_SET_DISABLED_STATE = /* @__PURE__ */ new InjectionToken("", { factory: () => setDisabledStateDefault });
var setDisabledStateDefault = "always";
function controlPath(name, parent) {
  return [...parent.path, name];
}
function setUpControlValueAccessor(control, dir, callSetDisabledState = setDisabledStateDefault) {
  var _a2, _b2;
  setUpValidators(control, dir);
  dir.valueAccessor.writeValue(control.value);
  if (control.disabled || callSetDisabledState === "always") (_b2 = (_a2 = dir.valueAccessor).setDisabledState) == null ? void 0 : _b2.call(_a2, control.disabled);
  setUpViewChangePipeline(control, dir);
  setUpModelChangePipeline(control, dir);
  setUpBlurPipeline(control, dir);
  setUpDisabledChangeHandler(control, dir);
}
function registerOnValidatorChange(validators, onChange) {
  validators.forEach((validator) => {
    if (validator.registerOnValidatorChange) validator.registerOnValidatorChange(onChange);
  });
}
function setUpDisabledChangeHandler(control, dir) {
  if (dir.valueAccessor.setDisabledState) {
    const onDisabledChange = (isDisabled) => {
      dir.valueAccessor.setDisabledState(isDisabled);
    };
    control.registerOnDisabledChange(onDisabledChange);
    dir._registerOnDestroy(() => {
      control._unregisterOnDisabledChange(onDisabledChange);
    });
  }
}
function setUpValidators(control, dir) {
  const validators = getControlValidators(control);
  if (dir.validator !== null) control.setValidators(mergeValidators(validators, dir.validator));
  else if (typeof validators === "function") control.setValidators([validators]);
  const asyncValidators = getControlAsyncValidators(control);
  if (dir.asyncValidator !== null) control.setAsyncValidators(mergeValidators(asyncValidators, dir.asyncValidator));
  else if (typeof asyncValidators === "function") control.setAsyncValidators([asyncValidators]);
  const onValidatorChange = () => control.updateValueAndValidity();
  registerOnValidatorChange(dir._rawValidators, onValidatorChange);
  registerOnValidatorChange(dir._rawAsyncValidators, onValidatorChange);
}
function setUpViewChangePipeline(control, dir) {
  dir.valueAccessor.registerOnChange((newValue) => {
    control._pendingValue = newValue;
    control._pendingChange = true;
    control._pendingDirty = true;
    if (control.updateOn === "change") updateControl(control, dir);
  });
}
function setUpBlurPipeline(control, dir) {
  dir.valueAccessor.registerOnTouched(() => {
    control._pendingTouched = true;
    if (control.updateOn === "blur" && control._pendingChange) updateControl(control, dir);
    if (control.updateOn !== "submit") control.markAsTouched();
  });
}
function updateControl(control, dir) {
  if (control._pendingDirty) control.markAsDirty();
  control.setValue(control._pendingValue, { emitModelToViewChange: false });
  dir.viewToModelUpdate(control._pendingValue);
  control._pendingChange = false;
}
function setUpModelChangePipeline(control, dir) {
  const onChange = (newValue, emitModelEvent) => {
    dir.valueAccessor.writeValue(newValue);
    if (emitModelEvent) dir.viewToModelUpdate(newValue);
  };
  control.registerOnChange(onChange);
  dir._registerOnDestroy(() => {
    control._unregisterOnChange(onChange);
  });
}
function setUpFormContainer(control, dir) {
  setUpValidators(control, dir);
}
function isPropertyUpdated(changes, viewModel) {
  if (!Object.hasOwn(changes, "model")) return false;
  const change = changes["model"];
  if (change.isFirstChange()) return true;
  return !Object.is(viewModel, change.currentValue);
}
function isBuiltInAccessor(valueAccessor) {
  return Object.getPrototypeOf(valueAccessor.constructor) === BuiltInControlValueAccessor;
}
function syncPendingControls(form, directives) {
  form._syncPendingControls();
  directives.forEach((dir) => {
    const control = dir.control;
    if (control.updateOn === "submit" && control._pendingChange) {
      dir.viewToModelUpdate(control._pendingValue);
      control._pendingChange = false;
    }
  });
}
function selectValueAccessor(dir, valueAccessors) {
  if (!valueAccessors) return null;
  let defaultAccessor = void 0;
  let builtinAccessor = void 0;
  let customAccessor = void 0;
  valueAccessors.forEach((v) => {
    if (v.constructor === DefaultValueAccessor) defaultAccessor = v;
    else if (isBuiltInAccessor(v)) builtinAccessor = v;
    else customAccessor = v;
  });
  if (customAccessor) return customAccessor;
  if (builtinAccessor) return builtinAccessor;
  if (defaultAccessor) return defaultAccessor;
  return null;
}
var NG_CONTROL_INTEGRATION_PROVIDER = {
  provide: \u0275FORM_CONTROL_INTEGRATION,
  useFactory: () => {
    const control = inject(NgControl, { self: true });
    return {
      setParseErrors: (source) => {
        control.setParseErrorSource(source);
      },
      set onReset(callback) {
        control.onReset = callback;
      }
    };
  }
};
var NgControl = class extends AbstractControlDirective {
  constructor(injector, renderer, rawValueAccessors) {
    var _a2, _b2;
    super();
    __publicField(this, "_parent", null);
    __publicField(this, "name", null);
    __publicField(this, "valueAccessor", null);
    __publicField(this, "isCustomControlBased", false);
    __publicField(this, "userOnReset");
    __publicField(this, "resetSubscription");
    __publicField(this, "isNativeFormElement", false);
    __publicField(this, "rawValueAccessors");
    __publicField(this, "_selectedValueAccessor", null);
    __publicField(this, "parseErrorsValidator", null);
    __publicField(this, "renderer");
    __publicField(this, "injector");
    __publicField(this, "requiredValidatorViaDi");
    __publicField(this, "subscription");
    __publicField(this, "customControlBindings", null);
    this.injector = injector;
    this.renderer = renderer;
    this.rawValueAccessors = rawValueAccessors;
    (_b2 = (_a2 = this.injector) == null ? void 0 : _a2.get(DestroyRef)) == null ? void 0 : _b2.onDestroy(() => {
      var _a3;
      this.removeParseErrorsValidator(this.control);
      (_a3 = this.subscription) == null ? void 0 : _a3.unsubscribe();
    });
  }
  set onReset(callback) {
    var _a2, _b2;
    this.userOnReset = callback;
    (_a2 = this.resetSubscription) == null ? void 0 : _a2.unsubscribe();
    this.resetSubscription = void 0;
    if (this.control) {
      this.resetSubscription = this.control.events.subscribe((event) => {
        var _a3;
        if (event instanceof FormResetEvent && this.control) (_a3 = this.userOnReset) == null ? void 0 : _a3.call(this, this.control.value);
      });
      (_b2 = this.subscription) == null ? void 0 : _b2.add(this.resetSubscription);
    }
  }
  get selectedValueAccessor() {
    var _a2;
    return (_a2 = this._selectedValueAccessor) != null ? _a2 : this._selectedValueAccessor = selectValueAccessor(this, this.rawValueAccessors);
  }
  setupCustomControl() {
    var _a2, _b2, _c6;
    (_a2 = this.subscription) == null ? void 0 : _a2.unsubscribe();
    const cdr = (_b2 = this.injector) == null ? void 0 : _b2.get(ChangeDetectorRef);
    if (!this.control || !cdr) return;
    const markForCheck = cdr.markForCheck.bind(cdr);
    this.subscription = new Subscription();
    this.subscription.add(this.control.valueChanges.subscribe(markForCheck));
    this.subscription.add(this.control.statusChanges.subscribe(markForCheck));
    (_c6 = this.resetSubscription) == null ? void 0 : _c6.unsubscribe();
    this.resetSubscription = void 0;
    if (this.userOnReset) {
      this.resetSubscription = this.control.events.subscribe((event) => {
        var _a3;
        if (event instanceof FormResetEvent && this.control) (_a3 = this.userOnReset) == null ? void 0 : _a3.call(this, this.control.value);
      });
      this.subscription.add(this.resetSubscription);
    }
    if (this.parseErrorsValidator) this.control.addValidators(this.parseErrorsValidator);
  }
  ngControlCreate(host) {
    var _a2, _b2;
    if (!((_b2 = (_a2 = host.nativeElement).hasAttribute) == null ? void 0 : _b2.call(_a2, "ngNoCva")) && (this.rawValueAccessors && this.rawValueAccessors.length > 0 || this.valueAccessor !== null) || !host.customControl) return;
    this.isCustomControlBased = true;
    host.listenToCustomControlModel((value) => {
      var _a3, _b3;
      (_a3 = this.control) == null ? void 0 : _a3.markAsDirty();
      (_b3 = this.control) == null ? void 0 : _b3.setValue(value, { emitModelToViewChange: false });
      this.viewToModelUpdate(value);
    });
    host.listenToCustomControlOutput("touch", () => {
      var _a3;
      (_a3 = this.control) == null ? void 0 : _a3.markAsTouched();
    });
    this.customControlBindings = {};
    this.isNativeFormElement = isNativeFormElement(host.nativeElement);
    this.requiredValidatorViaDi = this._rawValidators.find((v) => v instanceof RequiredValidator);
  }
  ngControlUpdate(host, bindRequired) {
    if (!this.isCustomControlBased) return;
    const control = this.control;
    const bindings = this.customControlBindings;
    if (!Object.is(bindings.value, control.value)) {
      bindings.value = control.value;
      host.setCustomControlModelInput(control.value);
    }
    this.bindControlProperty(host, bindings, "touched", control.touched);
    this.bindControlProperty(host, bindings, "dirty", control.dirty);
    this.bindControlProperty(host, bindings, "valid", control.valid);
    this.bindControlProperty(host, bindings, "invalid", control.invalid);
    this.bindControlProperty(host, bindings, "pending", control.pending);
    this.bindControlProperty(host, bindings, "disabled", control.disabled);
    if (this.shouldBindRequired) this.bindControlProperty(host, bindings, "required", this.isRequired);
    const errorObject = control.errors;
    if (bindings.errors !== errorObject) {
      bindings.errors = errorObject;
      const errorArray = this._convertErrors(errorObject);
      host.setInputOnDirectives("errors", errorArray);
    }
  }
  get isRequired() {
    var _a2, _b2, _c6;
    return (_c6 = ((_a2 = this.requiredValidatorViaDi) == null ? void 0 : _a2._enabled) || ((_b2 = this.control) == null ? void 0 : _b2._hasRequired())) != null ? _c6 : false;
  }
  get shouldBindRequired() {
    return true;
  }
  bindControlProperty(host, bindings, name, value) {
    if (bindings[name] === value) return;
    bindings[name] = value;
    const wasSet = host.setInputOnDirectives(name, value);
    if (this.isNativeFormElement && !wasSet && (name === "disabled" || name === "required") && this.renderer) setNativeDomProperty(this.renderer, host.nativeElement, name, value);
  }
  _convertErrors(errors) {
    if (errors === null) return [];
    const control = this.control;
    return Object.entries(errors).map(([kind, context]) => {
      return new ReactiveValidationError({
        context,
        kind,
        control
      });
    });
  }
  setParseErrorSource(parseErrors) {
    if (parseErrors === void 0) return;
    let convertedErrors = null;
    const convertedParseErrors = computed(() => {
      const rawErrors = parseErrors();
      if (rawErrors.length === 0) return null;
      return rawErrors.reduce((acc, err) => {
        acc[err.kind] = err;
        return acc;
      }, {});
    }, ...[]);
    this.parseErrorsValidator = (() => convertedErrors).bind(this);
    effect(() => {
      var _a2;
      convertedErrors = convertedParseErrors();
      (_a2 = this.control) == null ? void 0 : _a2.updateValueAndValidity({ emitEvent: false });
    }, { injector: this.injector });
  }
  removeParseErrorsValidator(control) {
    if (this.parseErrorsValidator) {
      control == null ? void 0 : control.removeValidators(this.parseErrorsValidator);
      control == null ? void 0 : control.updateValueAndValidity({ emitEvent: false });
    }
  }
};
var AbstractControlStatus = class {
  constructor(cd) {
    __publicField(this, "_cd");
    this._cd = cd;
  }
  get isTouched() {
    var _a2, _b2, _c6, _d2, _e2;
    (_c6 = (_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2._touched) == null ? void 0 : _c6.call(_b2);
    return !!((_e2 = (_d2 = this._cd) == null ? void 0 : _d2.control) == null ? void 0 : _e2.touched);
  }
  get isUntouched() {
    var _a2, _b2;
    return !!((_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2.untouched);
  }
  get isPristine() {
    var _a2, _b2, _c6, _d2, _e2;
    (_c6 = (_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2._pristine) == null ? void 0 : _c6.call(_b2);
    return !!((_e2 = (_d2 = this._cd) == null ? void 0 : _d2.control) == null ? void 0 : _e2.pristine);
  }
  get isDirty() {
    var _a2, _b2;
    return !!((_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2.dirty);
  }
  get isValid() {
    var _a2, _b2, _c6, _d2, _e2;
    (_c6 = (_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2._status) == null ? void 0 : _c6.call(_b2);
    return !!((_e2 = (_d2 = this._cd) == null ? void 0 : _d2.control) == null ? void 0 : _e2.valid);
  }
  get isInvalid() {
    var _a2, _b2;
    return !!((_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2.invalid);
  }
  get isPending() {
    var _a2, _b2;
    return !!((_b2 = (_a2 = this._cd) == null ? void 0 : _a2.control) == null ? void 0 : _b2.pending);
  }
  get isSubmitted() {
    var _a2, _b2, _c6;
    (_b2 = (_a2 = this._cd) == null ? void 0 : _a2._submitted) == null ? void 0 : _b2.call(_a2);
    return !!((_c6 = this._cd) == null ? void 0 : _c6.submitted);
  }
};
var NgControlStatus = /* @__PURE__ */ (() => {
  const _NgControlStatus = class _NgControlStatus extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }
  };
  __publicField(_NgControlStatus, "\u0275fac", function NgControlStatus_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgControlStatus)(__directiveInject(NgControl, 2));
  });
  __publicField(_NgControlStatus, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgControlStatus,
    selectors: [
      [
        "",
        "formControlName",
        ""
      ],
      [
        "",
        "ngModel",
        ""
      ],
      [
        "",
        "formControl",
        ""
      ]
    ],
    hostVars: 14,
    hostBindings: function NgControlStatus_HostBindings(rf, ctx) {
      if (rf & 2) __classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending);
    },
    standalone: false,
    features: [__InheritDefinitionFeature]
  }));
  let NgControlStatus2 = _NgControlStatus;
  return NgControlStatus2;
})();
var NgControlStatusGroup = /* @__PURE__ */ (() => {
  const _NgControlStatusGroup = class _NgControlStatusGroup extends AbstractControlStatus {
    constructor(cd) {
      super(cd);
    }
  };
  __publicField(_NgControlStatusGroup, "\u0275fac", function NgControlStatusGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgControlStatusGroup)(__directiveInject(ControlContainer, 10));
  });
  __publicField(_NgControlStatusGroup, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgControlStatusGroup,
    selectors: [
      [
        "",
        "formGroupName",
        ""
      ],
      [
        "",
        "formArrayName",
        ""
      ],
      [
        "",
        "ngModelGroup",
        ""
      ],
      [
        "",
        "formGroup",
        ""
      ],
      [
        "",
        "formArray",
        ""
      ],
      [
        "form",
        3,
        "ngNoForm",
        ""
      ],
      [
        "",
        "ngForm",
        ""
      ]
    ],
    hostVars: 16,
    hostBindings: function NgControlStatusGroup_HostBindings(rf, ctx) {
      if (rf & 2) __classProp("ng-untouched", ctx.isUntouched)("ng-touched", ctx.isTouched)("ng-pristine", ctx.isPristine)("ng-dirty", ctx.isDirty)("ng-valid", ctx.isValid)("ng-invalid", ctx.isInvalid)("ng-pending", ctx.isPending)("ng-submitted", ctx.isSubmitted);
    },
    standalone: false,
    features: [__InheritDefinitionFeature]
  }));
  let NgControlStatusGroup2 = _NgControlStatusGroup;
  return NgControlStatusGroup2;
})();
var FormGroup = class extends AbstractControl {
  constructor(controls, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    __publicField(this, "controls");
    this.controls = controls;
    this._initObservables();
    this._setUpdateStrategy(validatorOrOpts);
    this._setUpControls();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
  }
  registerControl(name, control) {
    const existingControl = this._find(name);
    if (existingControl) return existingControl;
    this.controls[name] = control;
    control.setParent(this);
    control._registerOnCollectionChange(this._onCollectionChange);
    return control;
  }
  addControl(name, control, options = {}) {
    this.registerControl(name, control);
    this.updateValueAndValidity({ emitEvent: options.emitEvent });
    this._onCollectionChange();
  }
  removeControl(name, options = {}) {
    const existingControl = this._find(name);
    if (existingControl) existingControl._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    this.updateValueAndValidity({ emitEvent: options.emitEvent });
    this._onCollectionChange();
  }
  setControl(name, control, options = {}) {
    const existingControl = this._find(name);
    if (existingControl) existingControl._registerOnCollectionChange(() => {
    });
    delete this.controls[name];
    if (control) this.registerControl(name, control);
    this.updateValueAndValidity({ emitEvent: options.emitEvent });
    this._onCollectionChange();
  }
  contains(controlName) {
    var _a2;
    return ((_a2 = this._find(controlName)) == null ? void 0 : _a2.enabled) === true;
  }
  setValue(value, options = {}) {
    untracked(() => {
      assertAllValuesPresent(this, true, value);
      Object.keys(value).forEach((name) => {
        assertControlPresent(this, true, name);
        this.controls[name].setValue(value[name], {
          onlySelf: true,
          emitEvent: options.emitEvent
        });
      });
      this.updateValueAndValidity(options);
    });
  }
  patchValue(value, options = {}) {
    if (value == null) return;
    Object.keys(value).forEach((name) => {
      const existingControl = this._find(name);
      if (existingControl) existingControl.patchValue(value[name], {
        onlySelf: true,
        emitEvent: options.emitEvent
      });
    });
    this.updateValueAndValidity(options);
  }
  reset(value = {}, options = {}) {
    this._forEachChild((control, name) => {
      control.reset(value ? value[name] : null, {
        ...options,
        onlySelf: true
      });
    });
    this._updatePristine(options, this);
    this._updateTouched(options, this);
    this.updateValueAndValidity(options);
    if ((options == null ? void 0 : options.emitEvent) !== false) this._events.next(new FormResetEvent(this));
  }
  getRawValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      acc[name] = control.getRawValue();
      return acc;
    });
  }
  _syncPendingControls() {
    let subtreeUpdated = this._reduceChildren(false, (updated, child) => {
      return child._syncPendingControls() ? true : updated;
    });
    if (subtreeUpdated) this.updateValueAndValidity({ onlySelf: true });
    return subtreeUpdated;
  }
  _forEachChild(cb) {
    Object.keys(this.controls).forEach((key) => {
      const control = this.controls[key];
      control && cb(control, key);
    });
  }
  _setUpControls() {
    this._forEachChild((control) => {
      control.setParent(this);
      control._registerOnCollectionChange(this._onCollectionChange);
    });
  }
  _updateValue() {
    this.value = this._reduceValue();
  }
  _anyControls(condition) {
    for (const [controlName, control] of Object.entries(this.controls)) if (this.contains(controlName) && condition(control)) return true;
    return false;
  }
  _reduceValue() {
    return this._reduceChildren({}, (acc, control, name) => {
      if (control.enabled || this.disabled) acc[name] = control.value;
      return acc;
    });
  }
  _reduceChildren(initValue, fn) {
    let res = initValue;
    this._forEachChild((control, name) => {
      res = fn(res, control, name);
    });
    return res;
  }
  _allControlsDisabled() {
    for (const controlName of Object.keys(this.controls)) if (this.controls[controlName].enabled) return false;
    return Object.keys(this.controls).length > 0 || this.disabled;
  }
  _find(name) {
    return hasOwnControl(this.controls, name) ? this.controls[name] : null;
  }
};
var formDirectiveProvider$2 = {
  provide: ControlContainer,
  useExisting: /* @__PURE__ */ forwardRef(() => NgForm)
};
var resolvedPromise$1 = /* @__PURE__ */ (() => Promise.resolve())();
var NgForm = /* @__PURE__ */ (() => {
  const _NgForm = class _NgForm extends ControlContainer {
    constructor(validators, asyncValidators, callSetDisabledState) {
      super();
      __publicField(this, "callSetDisabledState");
      __publicField(this, "_submitted", computed(() => this.submittedReactive(), ...[]));
      __publicField(this, "submittedReactive", signal(false, ...[]));
      __publicField(this, "_directives", /* @__PURE__ */ new Set());
      __publicField(this, "form");
      __publicField(this, "ngSubmit", new EventEmitter());
      __publicField(this, "options");
      this.callSetDisabledState = callSetDisabledState;
      this.form = new FormGroup({}, composeValidators(validators), composeAsyncValidators(asyncValidators));
    }
    get submitted() {
      return untracked(this.submittedReactive);
    }
    ngAfterViewInit() {
      this._setUpdateStrategy();
    }
    get formDirective() {
      return this;
    }
    get control() {
      return this.form;
    }
    get path() {
      return [];
    }
    get controls() {
      return this.form.controls;
    }
    addControl(dir) {
      resolvedPromise$1.then(() => {
        dir.control = this._findContainer(dir.path).registerControl(dir.name, dir.control);
        dir._setupWithForm(this.callSetDisabledState);
        dir.control.updateValueAndValidity({ emitEvent: false });
        this._directives.add(dir);
      });
    }
    getControl(dir) {
      return this.form.get(dir.path);
    }
    removeControl(dir) {
      resolvedPromise$1.then(() => {
        var _a2;
        (_a2 = this._findContainer(dir.path)) == null ? void 0 : _a2.removeControl(dir.name);
        this._directives.delete(dir);
      });
    }
    addFormGroup(dir) {
      resolvedPromise$1.then(() => {
        const container = this._findContainer(dir.path);
        const group = new FormGroup({});
        setUpFormContainer(group, dir);
        container.registerControl(dir.name, group);
        group.updateValueAndValidity({ emitEvent: false });
      });
    }
    removeFormGroup(dir) {
      resolvedPromise$1.then(() => {
        var _a2, _b2;
        (_b2 = (_a2 = this._findContainer(dir.path)) == null ? void 0 : _a2.removeControl) == null ? void 0 : _b2.call(_a2, dir.name);
      });
    }
    getFormGroup(dir) {
      return this.form.get(dir.path);
    }
    updateModel(dir, value) {
      resolvedPromise$1.then(() => {
        this.form.get(dir.path).setValue(value);
      });
    }
    setValue(value) {
      this.control.setValue(value);
    }
    onSubmit($event) {
      var _a2;
      this.submittedReactive.set(true);
      syncPendingControls(this.form, this._directives);
      this.ngSubmit.emit($event);
      this.form._events.next(new FormSubmittedEvent(this.control));
      return ((_a2 = $event == null ? void 0 : $event.target) == null ? void 0 : _a2.method) === "dialog";
    }
    onReset() {
      this.resetForm();
    }
    resetForm(value = void 0) {
      this.form.reset(value);
      this.submittedReactive.set(false);
    }
    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) this.form._updateOn = this.options.updateOn;
    }
    _findContainer(path) {
      path.pop();
      return path.length ? this.form.get(path) : this.form;
    }
  };
  __publicField(_NgForm, "\u0275fac", function NgForm_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgForm)(__directiveInject(NG_VALIDATORS, 10), __directiveInject(NG_ASYNC_VALIDATORS, 10), __directiveInject(CALL_SET_DISABLED_STATE, 8));
  });
  __publicField(_NgForm, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgForm,
    selectors: [
      [
        "form",
        3,
        "ngNoForm",
        "",
        3,
        "formGroup",
        "",
        3,
        "formArray",
        ""
      ],
      ["ng-form"],
      [
        "",
        "ngForm",
        ""
      ]
    ],
    hostBindings: function NgForm_HostBindings(rf, ctx) {
      if (rf & 1) __listener("submit", function NgForm_submit_HostBindingHandler($event) {
        return ctx.onSubmit($event);
      })("reset", function NgForm_reset_HostBindingHandler() {
        return ctx.onReset();
      });
    },
    inputs: { options: [
      0,
      "ngFormOptions",
      "options"
    ] },
    outputs: { ngSubmit: "ngSubmit" },
    exportAs: ["ngForm"],
    standalone: false,
    features: [__ProvidersFeature([formDirectiveProvider$2]), __InheritDefinitionFeature]
  }));
  let NgForm2 = _NgForm;
  return NgForm2;
})();
function removeListItem(list, el) {
  const index = list.indexOf(el);
  if (index > -1) list.splice(index, 1);
}
function isFormControlState(formState) {
  return typeof formState === "object" && formState !== null && Object.keys(formState).length === 2 && "value" in formState && "disabled" in formState;
}
var FormControl = class FormControl2 extends AbstractControl {
  constructor(formState = null, validatorOrOpts, asyncValidator) {
    super(pickValidators(validatorOrOpts), pickAsyncValidators(asyncValidator, validatorOrOpts));
    __publicField(this, "defaultValue", null);
    __publicField(this, "_onChange", []);
    __publicField(this, "_pendingValue");
    __publicField(this, "_pendingChange", false);
    this._applyFormState(formState);
    this._setUpdateStrategy(validatorOrOpts);
    this._initObservables();
    this.updateValueAndValidity({
      onlySelf: true,
      emitEvent: !!this.asyncValidator
    });
    if (isOptionsObj(validatorOrOpts) && (validatorOrOpts.nonNullable || validatorOrOpts.initialValueIsDefault)) {
      if (isFormControlState(formState)) this.defaultValue = formState.value;
      else this.defaultValue = formState;
    }
  }
  setValue(value, options = {}) {
    untracked(() => {
      this.value = this._pendingValue = value;
      if (this._onChange.length && options.emitModelToViewChange !== false) this._onChange.forEach((changeFn) => changeFn(this.value, options.emitViewToModelChange !== false));
      this.updateValueAndValidity(options);
    });
  }
  patchValue(value, options = {}) {
    this.setValue(value, options);
  }
  reset(formState = this.defaultValue, options = {}) {
    this._applyFormState(formState);
    this.markAsPristine(options);
    this.markAsUntouched(options);
    this.setValue(this.value, options);
    if (options.overwriteDefaultValue) this.defaultValue = this.value;
    this._pendingChange = false;
    if ((options == null ? void 0 : options.emitEvent) !== false) this._events.next(new FormResetEvent(this));
  }
  _updateValue() {
  }
  _anyControls(condition) {
    return false;
  }
  _allControlsDisabled() {
    return this.disabled;
  }
  registerOnChange(fn) {
    this._onChange.push(fn);
  }
  _unregisterOnChange(fn) {
    removeListItem(this._onChange, fn);
  }
  registerOnDisabledChange(fn) {
    this._onDisabledChange.push(fn);
  }
  _unregisterOnDisabledChange(fn) {
    removeListItem(this._onDisabledChange, fn);
  }
  _forEachChild(cb) {
  }
  _syncPendingControls() {
    if (this.updateOn === "submit") {
      if (this._pendingDirty) this.markAsDirty();
      if (this._pendingTouched) this.markAsTouched();
      if (this._pendingChange) {
        this.setValue(this._pendingValue, {
          onlySelf: true,
          emitModelToViewChange: false
        });
        return true;
      }
    }
    return false;
  }
  _applyFormState(formState) {
    if (isFormControlState(formState)) {
      this.value = this._pendingValue = formState.value;
      formState.disabled ? this.disable({
        onlySelf: true,
        emitEvent: false
      }) : this.enable({
        onlySelf: true,
        emitEvent: false
      });
    } else this.value = this._pendingValue = formState;
  }
};
var AbstractFormGroupDirective = /* @__PURE__ */ (() => {
  const _AbstractFormGroupDirective = class _AbstractFormGroupDirective extends ControlContainer {
    constructor() {
      super(...arguments);
      __publicField(this, "_parent");
    }
    ngOnInit() {
      this._checkParentType();
      this.formDirective.addFormGroup(this);
    }
    ngOnDestroy() {
      var _a2;
      (_a2 = this.formDirective) == null ? void 0 : _a2.removeFormGroup(this);
    }
    get control() {
      return this.formDirective.getFormGroup(this);
    }
    get path() {
      return controlPath(this.name == null ? this.name : this.name.toString(), this._parent);
    }
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    _checkParentType() {
    }
  };
  __publicField(_AbstractFormGroupDirective, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275AbstractFormGroupDirective_BaseFactory = void 0;
    return function AbstractFormGroupDirective_Factory(__ngFactoryType__) {
      return (\u0275AbstractFormGroupDirective_BaseFactory || (\u0275AbstractFormGroupDirective_BaseFactory = __getInheritedFactory(_AbstractFormGroupDirective)))(__ngFactoryType__ || _AbstractFormGroupDirective);
    };
  })());
  __publicField(_AbstractFormGroupDirective, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _AbstractFormGroupDirective,
    standalone: false,
    features: [__InheritDefinitionFeature]
  }));
  let AbstractFormGroupDirective2 = _AbstractFormGroupDirective;
  return AbstractFormGroupDirective2;
})();
var modelGroupProvider = {
  provide: ControlContainer,
  useExisting: /* @__PURE__ */ forwardRef(() => NgModelGroup)
};
var NgModelGroup = /* @__PURE__ */ (() => {
  const _NgModelGroup = class _NgModelGroup extends AbstractFormGroupDirective {
    constructor(parent, validators, asyncValidators) {
      super();
      __publicField(this, "name", "");
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    _checkParentType() {
      if (!(this._parent instanceof _NgModelGroup) && !(this._parent instanceof NgForm) && false) ;
    }
  };
  __publicField(_NgModelGroup, "\u0275fac", function NgModelGroup_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgModelGroup)(__directiveInject(ControlContainer, 5), __directiveInject(NG_VALIDATORS, 10), __directiveInject(NG_ASYNC_VALIDATORS, 10));
  });
  __publicField(_NgModelGroup, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgModelGroup,
    selectors: [[
      "",
      "ngModelGroup",
      ""
    ]],
    inputs: { name: [
      0,
      "ngModelGroup",
      "name"
    ] },
    exportAs: ["ngModelGroup"],
    standalone: false,
    features: [__ProvidersFeature([modelGroupProvider]), __InheritDefinitionFeature]
  }));
  let NgModelGroup2 = _NgModelGroup;
  return NgModelGroup2;
})();
var formControlBinding$1 = {
  provide: NgControl,
  useExisting: /* @__PURE__ */ forwardRef(() => NgModel)
};
var resolvedPromise = /* @__PURE__ */ (() => Promise.resolve())();
var NgModel = /* @__PURE__ */ (() => {
  const _NgModel = class _NgModel extends NgControl {
    constructor(parent, validators, asyncValidators, valueAccessors, _changeDetectorRef, callSetDisabledState, injector, renderer) {
      super(injector, renderer, valueAccessors);
      __publicField(this, "_changeDetectorRef");
      __publicField(this, "callSetDisabledState");
      __publicField(this, "control", new FormControl());
      __publicField(this, "_registered", false);
      __publicField(this, "_ngModelInjector");
      __publicField(this, "viewModel");
      __publicField(this, "name", "");
      __publicField(this, "isDisabled");
      __publicField(this, "model");
      __publicField(this, "options");
      __publicField(this, "update", new EventEmitter());
      this._changeDetectorRef = _changeDetectorRef;
      this.callSetDisabledState = callSetDisabledState;
      this._parent = parent;
      this._setValidators(validators);
      this._setAsyncValidators(asyncValidators);
    }
    ngOnChanges(changes) {
      if (!this._registered && false) ;
      this._checkForErrors();
      if (!this._registered || "name" in changes) {
        if (this._registered) {
          this._checkName();
          if (this.formDirective) {
            const oldName = changes["name"].previousValue;
            this.formDirective.removeControl({
              name: oldName,
              path: this._getPath(oldName)
            });
          }
        }
        this._setUpControl();
      }
      if ("isDisabled" in changes) this._updateDisabled(changes);
      if (isPropertyUpdated(changes, this.viewModel)) {
        this._updateValue(this.model);
        this.viewModel = this.model;
      }
    }
    ngOnDestroy() {
      var _a2;
      (_a2 = this.formDirective) == null ? void 0 : _a2.removeControl(this);
    }
    \u0275ngControlCreate(host) {
      super.ngControlCreate(host);
    }
    \u0275ngControlUpdate(host) {
      super.ngControlUpdate(host, false);
    }
    get shouldBindRequired() {
      return false;
    }
    get path() {
      return this._getPath(this.name);
    }
    get formDirective() {
      return this._parent ? this._parent.formDirective : null;
    }
    viewToModelUpdate(newValue) {
      this.viewModel = newValue;
      this.update.emit(newValue);
    }
    _setUpControl() {
      this._setUpdateStrategy();
      this._isStandalone() ? this._setUpStandalone() : this.formDirective.addControl(this);
      this._registered = true;
    }
    _setUpdateStrategy() {
      if (this.options && this.options.updateOn != null) this.control._updateOn = this.options.updateOn;
    }
    _isStandalone() {
      return !this._parent || !!(this.options && this.options.standalone);
    }
    _setUpStandalone() {
      var _a2;
      if (!this.isCustomControlBased) {
        (_a2 = this.valueAccessor) != null ? _a2 : this.valueAccessor = this.selectedValueAccessor;
        setUpControlValueAccessor(this.control, this, this.callSetDisabledState);
      } else this.setupCustomControl();
      this.control.updateValueAndValidity({ emitEvent: false });
    }
    _setupWithForm(callSetDisabledState) {
      var _a2;
      if (!this.isCustomControlBased) {
        (_a2 = this.valueAccessor) != null ? _a2 : this.valueAccessor = this.selectedValueAccessor;
        setUpControlValueAccessor(this.control, this, callSetDisabledState);
      } else this.setupCustomControl();
    }
    _checkForErrors() {
      this._checkName();
    }
    _checkName() {
      if (this.options && this.options.name) this.name = this.options.name;
      if (!this._isStandalone() && !this.name && false) ;
    }
    _updateValue(value) {
      resolvedPromise.then(() => {
        var _a2;
        this.control.setValue(value, { emitViewToModelChange: false });
        (_a2 = this._changeDetectorRef) == null ? void 0 : _a2.markForCheck();
      });
    }
    _updateDisabled(changes) {
      const disabledValue = changes["isDisabled"].currentValue;
      const isDisabled = disabledValue !== 0 && booleanAttribute(disabledValue);
      resolvedPromise.then(() => {
        var _a2;
        if (isDisabled && !this.control.disabled) this.control.disable();
        else if (!isDisabled && this.control.disabled) this.control.enable();
        (_a2 = this._changeDetectorRef) == null ? void 0 : _a2.markForCheck();
      });
    }
    _getPath(controlName) {
      return this._parent ? controlPath(controlName, this._parent) : [controlName];
    }
  };
  __publicField(_NgModel, "ngAcceptInputType_isDisabled");
  __publicField(_NgModel, "\u0275fac", function NgModel_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgModel)(__directiveInject(ControlContainer, 9), __directiveInject(NG_VALIDATORS, 10), __directiveInject(NG_ASYNC_VALIDATORS, 10), __directiveInject(NG_VALUE_ACCESSOR, 10), __directiveInject(ChangeDetectorRef, 8), __directiveInject(CALL_SET_DISABLED_STATE, 8), __directiveInject(Injector, 8), __directiveInject(Renderer2, 8));
  });
  __publicField(_NgModel, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgModel,
    selectors: [[
      "",
      "ngModel",
      "",
      3,
      "formControlName",
      "",
      3,
      "formControl",
      ""
    ]],
    inputs: {
      name: "name",
      isDisabled: [
        0,
        "disabled",
        "isDisabled"
      ],
      model: [
        0,
        "ngModel",
        "model"
      ],
      options: [
        0,
        "ngModelOptions",
        "options"
      ]
    },
    outputs: { update: "ngModelChange" },
    exportAs: ["ngModel"],
    standalone: false,
    features: [
      __ProvidersFeature([formControlBinding$1, NG_CONTROL_INTEGRATION_PROVIDER]),
      __InheritDefinitionFeature,
      __NgOnChangesFeature,
      __ControlFeature(null)
    ]
  }));
  let NgModel2 = _NgModel;
  return NgModel2;
})();
var \u0275NgNoValidate = /* @__PURE__ */ (() => {
  const _\u0275NgNoValidate = class _\u0275NgNoValidate {
  };
  __publicField(_\u0275NgNoValidate, "\u0275fac", function \u0275NgNoValidate_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275NgNoValidate)();
  });
  __publicField(_\u0275NgNoValidate, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _\u0275NgNoValidate,
    selectors: [[
      "form",
      3,
      "ngNoForm",
      "",
      3,
      "ngNativeValidate",
      ""
    ]],
    hostAttrs: ["novalidate", ""],
    standalone: false
  }));
  let \u0275NgNoValidate2 = _\u0275NgNoValidate;
  return \u0275NgNoValidate2;
})();
var NUMBER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => NumberValueAccessor),
  multi: true
};
var NumberValueAccessor = /* @__PURE__ */ (() => {
  const _NumberValueAccessor = class _NumberValueAccessor extends BuiltInControlValueAccessor {
    writeValue(value) {
      const normalizedValue = value == null ? "" : value;
      this.setProperty("value", normalizedValue);
    }
    registerOnChange(fn) {
      this.onChange = (value) => {
        fn(value == "" ? null : parseFloat(value));
      };
    }
  };
  __publicField(_NumberValueAccessor, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275NumberValueAccessor_BaseFactory = void 0;
    return function NumberValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275NumberValueAccessor_BaseFactory || (\u0275NumberValueAccessor_BaseFactory = __getInheritedFactory(_NumberValueAccessor)))(__ngFactoryType__ || _NumberValueAccessor);
    };
  })());
  __publicField(_NumberValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NumberValueAccessor,
    selectors: [
      [
        "input",
        "type",
        "number",
        "formControlName",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "number",
        "formControl",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "number",
        "ngModel",
        "",
        3,
        "ngNoCva",
        ""
      ]
    ],
    hostBindings: function NumberValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("input", function NumberValueAccessor_input_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("blur", function NumberValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    },
    standalone: false,
    features: [__ProvidersFeature([NUMBER_VALUE_ACCESSOR]), __InheritDefinitionFeature]
  }));
  let NumberValueAccessor2 = _NumberValueAccessor;
  return NumberValueAccessor2;
})();
var RADIO_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => RadioControlValueAccessor),
  multi: true
};
var RadioControlRegistry = /* @__PURE__ */ (() => {
  const _RadioControlRegistry = class _RadioControlRegistry {
    constructor() {
      __publicField(this, "_accessors", []);
    }
    add(control, accessor) {
      this._accessors.push([control, accessor]);
    }
    remove(accessor) {
      for (let i = this._accessors.length - 1; i >= 0; --i) if (this._accessors[i][1] === accessor) {
        this._accessors.splice(i, 1);
        return;
      }
    }
    select(accessor) {
      this._accessors.forEach((c) => {
        if (this._isSameGroup(c, accessor) && c[1] !== accessor) c[1].fireUncheck(accessor.value);
      });
    }
    _isSameGroup(controlPair, accessor) {
      if (!controlPair[0].control) return false;
      return controlPair[0]._parent === accessor._control._parent && controlPair[1].name === accessor.name;
    }
  };
  __publicField(_RadioControlRegistry, "\u0275fac", function RadioControlRegistry_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioControlRegistry)();
  });
  __publicField(_RadioControlRegistry, "\u0275prov", /* @__PURE__ */ __defineService({
    token: _RadioControlRegistry,
    factory: _RadioControlRegistry.\u0275fac
  }));
  let RadioControlRegistry2 = _RadioControlRegistry;
  return RadioControlRegistry2;
})();
var RadioControlValueAccessor = /* @__PURE__ */ (() => {
  var _a2;
  const _RadioControlValueAccessor = class _RadioControlValueAccessor extends BuiltInControlValueAccessor {
    constructor(renderer, elementRef, _registry, _injector) {
      super(renderer, elementRef);
      __publicField(this, "_registry");
      __publicField(this, "_injector");
      __publicField(this, "_state");
      __publicField(this, "_control");
      __publicField(this, "_fn");
      __publicField(this, "setDisabledStateFired", false);
      __publicField(this, "onChange", () => {
      });
      __publicField(this, "name");
      __publicField(this, "formControlName");
      __publicField(this, "value");
      __publicField(this, "callSetDisabledState", (_a2 = inject(CALL_SET_DISABLED_STATE, { optional: true })) != null ? _a2 : setDisabledStateDefault);
      this._registry = _registry;
      this._injector = _injector;
    }
    ngOnChanges(changes) {
      var _a3;
      const control = (_a3 = this._control) == null ? void 0 : _a3.control;
      if (changes["value"] && control) this.writeValue(control.value);
    }
    ngOnInit() {
      this._control = this._injector.get(NgControl);
      this._checkName();
      this._registry.add(this._control, this);
    }
    ngOnDestroy() {
      this._registry.remove(this);
    }
    writeValue(value) {
      this._state = value === this.value;
      this.setProperty("checked", this._state);
    }
    registerOnChange(fn) {
      this._fn = fn;
      this.onChange = () => {
        fn(this.value);
        this._registry.select(this);
      };
    }
    setDisabledState(isDisabled) {
      if (this.setDisabledStateFired || isDisabled || this.callSetDisabledState === "whenDisabledForLegacyCode") this.setProperty("disabled", isDisabled);
      this.setDisabledStateFired = true;
    }
    fireUncheck(value) {
      this.writeValue(value);
    }
    _checkName() {
      if (this.name && this.formControlName && this.name !== this.formControlName && false) ;
      if (!this.name && this.formControlName) this.name = this.formControlName;
    }
  };
  __publicField(_RadioControlValueAccessor, "\u0275fac", function RadioControlValueAccessor_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RadioControlValueAccessor)(__directiveInject(Renderer2), __directiveInject(ElementRef), __directiveInject(RadioControlRegistry), __directiveInject(Injector));
  });
  __publicField(_RadioControlValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _RadioControlValueAccessor,
    selectors: [
      [
        "input",
        "type",
        "radio",
        "formControlName",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "radio",
        "formControl",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "radio",
        "ngModel",
        "",
        3,
        "ngNoCva",
        ""
      ]
    ],
    hostBindings: function RadioControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("change", function RadioControlValueAccessor_change_HostBindingHandler() {
        return ctx.onChange();
      })("blur", function RadioControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    },
    inputs: {
      name: "name",
      formControlName: "formControlName",
      value: "value"
    },
    standalone: false,
    features: [
      __ProvidersFeature([RADIO_VALUE_ACCESSOR]),
      __InheritDefinitionFeature,
      __NgOnChangesFeature
    ]
  }));
  let RadioControlValueAccessor2 = _RadioControlValueAccessor;
  return RadioControlValueAccessor2;
})();
var RANGE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => RangeValueAccessor),
  multi: true
};
var RangeValueAccessor = /* @__PURE__ */ (() => {
  const _RangeValueAccessor = class _RangeValueAccessor extends BuiltInControlValueAccessor {
    writeValue(value) {
      this.setProperty("value", parseFloat(value));
    }
    registerOnChange(fn) {
      this.onChange = (value) => {
        fn(value == "" ? null : parseFloat(value));
      };
    }
  };
  __publicField(_RangeValueAccessor, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275RangeValueAccessor_BaseFactory = void 0;
    return function RangeValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275RangeValueAccessor_BaseFactory || (\u0275RangeValueAccessor_BaseFactory = __getInheritedFactory(_RangeValueAccessor)))(__ngFactoryType__ || _RangeValueAccessor);
    };
  })());
  __publicField(_RangeValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _RangeValueAccessor,
    selectors: [
      [
        "input",
        "type",
        "range",
        "formControlName",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "range",
        "formControl",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "input",
        "type",
        "range",
        "ngModel",
        "",
        3,
        "ngNoCva",
        ""
      ]
    ],
    hostBindings: function RangeValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("change", function RangeValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("input", function RangeValueAccessor_input_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("blur", function RangeValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    },
    standalone: false,
    features: [__ProvidersFeature([RANGE_VALUE_ACCESSOR]), __InheritDefinitionFeature]
  }));
  let RangeValueAccessor2 = _RangeValueAccessor;
  return RangeValueAccessor2;
})();
var SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => SelectControlValueAccessor),
  multi: true
};
function _buildValueString$1(id, value) {
  if (id == null) return `${value}`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId$1(valueString) {
  return valueString.split(":")[0];
}
var SelectControlValueAccessor = /* @__PURE__ */ (() => {
  const _SelectControlValueAccessor = class _SelectControlValueAccessor extends BuiltInControlValueAccessor {
    constructor() {
      super(...arguments);
      __publicField(this, "value");
      __publicField(this, "_optionMap", /* @__PURE__ */ new Map());
      __publicField(this, "_idCounter", 0);
      __publicField(this, "_compareWith", Object.is);
      __publicField(this, "appRefInjector", inject(ApplicationRef).injector);
      __publicField(this, "destroyRef", inject(DestroyRef));
      __publicField(this, "cdr", inject(ChangeDetectorRef));
      __publicField(this, "_queuedWrite", false);
    }
    set compareWith(fn) {
      this._compareWith = fn;
    }
    _writeValueAfterRender() {
      if (this._queuedWrite || this.appRefInjector.destroyed) return;
      this._queuedWrite = true;
      afterNextRender({ write: () => {
        if (this.destroyRef.destroyed) return;
        this._queuedWrite = false;
        this.writeValue(this.value);
      } }, { injector: this.appRefInjector });
    }
    writeValue(value) {
      this.cdr.markForCheck();
      this.value = value;
      const valueString = _buildValueString$1(this._getOptionId(value), value);
      this.setProperty("value", valueString);
    }
    registerOnChange(fn) {
      this.onChange = (valueString) => {
        this.value = this._getOptionValue(valueString);
        fn(this.value);
      };
    }
    _registerOption() {
      return (this._idCounter++).toString();
    }
    _getOptionId(value) {
      for (const id of this._optionMap.keys()) if (this._compareWith(this._optionMap.get(id), value)) return id;
      return null;
    }
    _getOptionValue(valueString) {
      const id = _extractId$1(valueString);
      return this._optionMap.has(id) ? this._optionMap.get(id) : valueString;
    }
  };
  __publicField(_SelectControlValueAccessor, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275SelectControlValueAccessor_BaseFactory = void 0;
    return function SelectControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275SelectControlValueAccessor_BaseFactory || (\u0275SelectControlValueAccessor_BaseFactory = __getInheritedFactory(_SelectControlValueAccessor)))(__ngFactoryType__ || _SelectControlValueAccessor);
    };
  })());
  __publicField(_SelectControlValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _SelectControlValueAccessor,
    selectors: [
      [
        "select",
        "formControlName",
        "",
        3,
        "multiple",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "select",
        "formControl",
        "",
        3,
        "multiple",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "select",
        "ngModel",
        "",
        3,
        "multiple",
        "",
        3,
        "ngNoCva",
        ""
      ]
    ],
    hostBindings: function SelectControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("change", function SelectControlValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target.value);
      })("blur", function SelectControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    },
    inputs: { compareWith: "compareWith" },
    standalone: false,
    features: [__ProvidersFeature([SELECT_VALUE_ACCESSOR]), __InheritDefinitionFeature]
  }));
  let SelectControlValueAccessor2 = _SelectControlValueAccessor;
  return SelectControlValueAccessor2;
})();
var NgSelectOption = /* @__PURE__ */ (() => {
  const _NgSelectOption = class _NgSelectOption {
    constructor(_element, _renderer, _select) {
      __publicField(this, "_element");
      __publicField(this, "_renderer");
      __publicField(this, "_select");
      __publicField(this, "id");
      this._element = _element;
      this._renderer = _renderer;
      this._select = _select;
      if (this._select) this.id = this._select._registerOption();
    }
    set ngValue(value) {
      if (this._select == null) return;
      this._select._optionMap.set(this.id, value);
      this._setElementValue(_buildValueString$1(this.id, value));
      this._select._writeValueAfterRender();
    }
    set value(value) {
      var _a2;
      this._setElementValue(value);
      (_a2 = this._select) == null ? void 0 : _a2._writeValueAfterRender();
    }
    _setElementValue(value) {
      this._renderer.setProperty(this._element.nativeElement, "value", value);
    }
    ngOnDestroy() {
      var _a2, _b2;
      (_a2 = this._select) == null ? void 0 : _a2._optionMap.delete(this.id);
      (_b2 = this._select) == null ? void 0 : _b2._writeValueAfterRender();
    }
  };
  __publicField(_NgSelectOption, "\u0275fac", function NgSelectOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSelectOption)(__directiveInject(ElementRef), __directiveInject(Renderer2), __directiveInject(SelectControlValueAccessor, 9));
  });
  __publicField(_NgSelectOption, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _NgSelectOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    },
    standalone: false
  }));
  let NgSelectOption2 = _NgSelectOption;
  return NgSelectOption2;
})();
var NEGATIVE_ZERO = /* @__PURE__ */ Symbol("negativeZero");
var SELECT_MULTIPLE_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: /* @__PURE__ */ forwardRef(() => SelectMultipleControlValueAccessor),
  multi: true
};
function _buildValueString(id, value) {
  if (id == null) return `${value}`;
  if (typeof value === "string") value = `'${value}'`;
  if (value && typeof value === "object") value = "Object";
  return `${id}: ${value}`.slice(0, 50);
}
function _extractId(valueString) {
  return valueString.split(":")[0];
}
var SelectMultipleControlValueAccessor = /* @__PURE__ */ (() => {
  const _SelectMultipleControlValueAccessor = class _SelectMultipleControlValueAccessor extends BuiltInControlValueAccessor {
    constructor() {
      super(...arguments);
      __publicField(this, "value");
      __publicField(this, "_optionMap", /* @__PURE__ */ new Map());
      __publicField(this, "_idCounter", 0);
      __publicField(this, "_compareWith", Object.is);
    }
    set compareWith(fn) {
      this._compareWith = fn;
    }
    writeValue(value) {
      this.value = value;
      let optionSelectedStateSetter;
      if (Array.isArray(value)) {
        const ids = this._getOptionIds(value);
        optionSelectedStateSetter = (opt, id) => {
          opt._setSelected(ids.has(id));
        };
      } else optionSelectedStateSetter = (opt) => {
        opt._setSelected(false);
      };
      this._optionMap.forEach(optionSelectedStateSetter);
    }
    registerOnChange(fn) {
      this.onChange = (element) => {
        const selected = [];
        const selectedOptions = element.selectedOptions;
        if (selectedOptions !== void 0) {
          const options = selectedOptions;
          for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            const val = this._getOptionValue(opt.value);
            selected.push(val);
          }
        } else {
          const options = element.options;
          for (let i = 0; i < options.length; i++) {
            const opt = options[i];
            if (opt.selected) {
              const val = this._getOptionValue(opt.value);
              selected.push(val);
            }
          }
        }
        this.value = selected;
        fn(selected);
      };
    }
    _registerOption(value) {
      const id = (this._idCounter++).toString();
      this._optionMap.set(id, value);
      return id;
    }
    _getOptionIds(values) {
      if (this._compareWith !== Object.is || values.length < 2) return new Set(values.map((value) => this._getOptionId(value)).filter((id) => id !== null));
      const remainingValues = /* @__PURE__ */ new Set();
      values.forEach((value) => remainingValues.add(value === 0 && Object.is(value, -0) ? NEGATIVE_ZERO : value));
      const ids = /* @__PURE__ */ new Set();
      for (const [id, option] of this._optionMap) {
        if (remainingValues.size === 0) break;
        const optionValue = option._value;
        const value = optionValue === 0 && Object.is(optionValue, -0) ? NEGATIVE_ZERO : optionValue;
        if (remainingValues.delete(value)) ids.add(id);
      }
      return ids;
    }
    _getOptionId(value) {
      for (const id of this._optionMap.keys()) if (this._compareWith(this._optionMap.get(id)._value, value)) return id;
      return null;
    }
    _getOptionValue(valueString) {
      const id = _extractId(valueString);
      return this._optionMap.has(id) ? this._optionMap.get(id)._value : valueString;
    }
  };
  __publicField(_SelectMultipleControlValueAccessor, "\u0275fac", /* @__PURE__ */ (() => {
    let \u0275SelectMultipleControlValueAccessor_BaseFactory = void 0;
    return function SelectMultipleControlValueAccessor_Factory(__ngFactoryType__) {
      return (\u0275SelectMultipleControlValueAccessor_BaseFactory || (\u0275SelectMultipleControlValueAccessor_BaseFactory = __getInheritedFactory(_SelectMultipleControlValueAccessor)))(__ngFactoryType__ || _SelectMultipleControlValueAccessor);
    };
  })());
  __publicField(_SelectMultipleControlValueAccessor, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _SelectMultipleControlValueAccessor,
    selectors: [
      [
        "select",
        "multiple",
        "",
        "formControlName",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "select",
        "multiple",
        "",
        "formControl",
        "",
        3,
        "ngNoCva",
        ""
      ],
      [
        "select",
        "multiple",
        "",
        "ngModel",
        "",
        3,
        "ngNoCva",
        ""
      ]
    ],
    hostBindings: function SelectMultipleControlValueAccessor_HostBindings(rf, ctx) {
      if (rf & 1) __listener("change", function SelectMultipleControlValueAccessor_change_HostBindingHandler($event) {
        return ctx.onChange($event.target);
      })("blur", function SelectMultipleControlValueAccessor_blur_HostBindingHandler() {
        return ctx.onTouched();
      });
    },
    inputs: { compareWith: "compareWith" },
    standalone: false,
    features: [__ProvidersFeature([SELECT_MULTIPLE_VALUE_ACCESSOR]), __InheritDefinitionFeature]
  }));
  let SelectMultipleControlValueAccessor2 = _SelectMultipleControlValueAccessor;
  return SelectMultipleControlValueAccessor2;
})();
var \u0275NgSelectMultipleOption = /* @__PURE__ */ (() => {
  const _\u0275NgSelectMultipleOption = class _\u0275NgSelectMultipleOption {
    constructor(_element, _renderer, _select) {
      __publicField(this, "_element");
      __publicField(this, "_renderer");
      __publicField(this, "_select");
      __publicField(this, "id");
      __publicField(this, "_value");
      this._element = _element;
      this._renderer = _renderer;
      this._select = _select;
      if (this._select) this.id = this._select._registerOption(this);
    }
    set ngValue(value) {
      if (this._select == null) return;
      this._value = value;
      this._setElementValue(_buildValueString(this.id, value));
      this._select.writeValue(this._select.value);
    }
    set value(value) {
      if (this._select) {
        this._value = value;
        this._setElementValue(_buildValueString(this.id, value));
        this._select.writeValue(this._select.value);
      } else this._setElementValue(value);
    }
    _setElementValue(value) {
      this._renderer.setProperty(this._element.nativeElement, "value", value);
    }
    _setSelected(selected) {
      this._renderer.setProperty(this._element.nativeElement, "selected", selected);
    }
    ngOnDestroy() {
      if (this._select) {
        this._select._optionMap.delete(this.id);
        this._select.writeValue(this._select.value);
      }
    }
  };
  __publicField(_\u0275NgSelectMultipleOption, "\u0275fac", function \u0275NgSelectMultipleOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275NgSelectMultipleOption)(__directiveInject(ElementRef), __directiveInject(Renderer2), __directiveInject(SelectMultipleControlValueAccessor, 9));
  });
  __publicField(_\u0275NgSelectMultipleOption, "\u0275dir", /* @__PURE__ */ __defineDirective({
    type: _\u0275NgSelectMultipleOption,
    selectors: [["option"]],
    inputs: {
      ngValue: "ngValue",
      value: "value"
    },
    standalone: false
  }));
  let \u0275NgSelectMultipleOption2 = _\u0275NgSelectMultipleOption;
  return \u0275NgSelectMultipleOption2;
})();
var \u0275InternalFormsSharedModule = /* @__PURE__ */ (() => {
  const _\u0275InternalFormsSharedModule = class _\u0275InternalFormsSharedModule {
  };
  __publicField(_\u0275InternalFormsSharedModule, "\u0275fac", function \u0275InternalFormsSharedModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _\u0275InternalFormsSharedModule)();
  });
  __publicField(_\u0275InternalFormsSharedModule, "\u0275mod", /* @__PURE__ */ __defineNgModule({
    type: _\u0275InternalFormsSharedModule,
    declarations: [
      \u0275NgNoValidate,
      NgSelectOption,
      \u0275NgSelectMultipleOption,
      DefaultValueAccessor,
      NumberValueAccessor,
      RangeValueAccessor,
      CheckboxControlValueAccessor,
      SelectControlValueAccessor,
      SelectMultipleControlValueAccessor,
      RadioControlValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      RequiredValidator,
      MinLengthValidator,
      MaxLengthValidator,
      PatternValidator,
      CheckboxRequiredValidator,
      EmailValidator,
      MinValidator,
      MaxValidator
    ],
    exports: [
      \u0275NgNoValidate,
      NgSelectOption,
      \u0275NgSelectMultipleOption,
      DefaultValueAccessor,
      NumberValueAccessor,
      RangeValueAccessor,
      CheckboxControlValueAccessor,
      SelectControlValueAccessor,
      SelectMultipleControlValueAccessor,
      RadioControlValueAccessor,
      NgControlStatus,
      NgControlStatusGroup,
      RequiredValidator,
      MinLengthValidator,
      MaxLengthValidator,
      PatternValidator,
      CheckboxRequiredValidator,
      EmailValidator,
      MinValidator,
      MaxValidator
    ]
  }));
  __publicField(_\u0275InternalFormsSharedModule, "\u0275inj", /* @__PURE__ */ __defineInjector({}));
  let \u0275InternalFormsSharedModule2 = _\u0275InternalFormsSharedModule;
  return \u0275InternalFormsSharedModule2;
})();
var FormsModule = /* @__PURE__ */ (() => {
  const _FormsModule = class _FormsModule {
    static withConfig(opts) {
      var _a2;
      return {
        ngModule: _FormsModule,
        providers: [{
          provide: CALL_SET_DISABLED_STATE,
          useValue: (_a2 = opts.callSetDisabledState) != null ? _a2 : setDisabledStateDefault
        }]
      };
    }
  };
  __publicField(_FormsModule, "\u0275fac", function FormsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormsModule)();
  });
  __publicField(_FormsModule, "\u0275mod", /* @__PURE__ */ __defineNgModule({
    type: _FormsModule,
    declarations: [
      NgModel,
      NgModelGroup,
      NgForm
    ],
    exports: [
      \u0275InternalFormsSharedModule,
      NgModel,
      NgModelGroup,
      NgForm
    ]
  }));
  __publicField(_FormsModule, "\u0275inj", /* @__PURE__ */ __defineInjector({ imports: [\u0275InternalFormsSharedModule] }));
  let FormsModule2 = _FormsModule;
  return FormsModule2;
})();
var OPTIONS = { weekStartsOn: 1 };
function monthGrid(date) {
  const first = startOfWeek(startOfMonth(date), OPTIONS);
  return Array.from({ length: 42 }, (_, i) => addDays(first, i));
}
function weekDays(date) {
  const first = startOfWeek(date, OPTIONS);
  return Array.from({ length: 7 }, (_, i) => addDays(first, i));
}
function eventsOnDay(events, day) {
  const from2 = startOfDay(day).getTime();
  const to = endOfDay(day).getTime();
  return events.filter((e) => e.start.getTime() <= to && Math.max(e.end.getTime(), e.start.getTime()) >= from2).sort((a, b) => a.start.getTime() - b.start.getTime());
}
function groupByDay(events) {
  const sorted = [...events].sort((a, b) => a.start.getTime() - b.start.getTime());
  const groups = [];
  for (const e of sorted) {
    const last = groups[groups.length - 1];
    if (last && isSameDay(last.day, e.start)) last.events.push(e);
    else groups.push({
      day: startOfDay(e.start),
      events: [e]
    });
  }
  return groups;
}
function shiftDate(date, view, direction) {
  if (view === "month" || view === "list") return addMonths(date, direction);
  if (view === "week") return addWeeks(date, direction);
  return addDays(date, direction);
}
function visibleRange(date, view) {
  if (view === "week") {
    const days = weekDays(date);
    return {
      from: startOfDay(days[0]),
      to: endOfDay(days[6])
    };
  }
  if (view === "day") return {
    from: startOfDay(date),
    to: endOfDay(date)
  };
  return {
    from: startOfMonth(date),
    to: endOfMonth(date)
  };
}
function eventsInRange(events, from2, to) {
  return events.filter((e) => e.start.getTime() <= to.getTime() && e.end.getTime() >= from2.getTime());
}
var _c0$8 = (a0) => ({ count: a0 });
var _c1$3 = (a0) => ({ date: a0 });
var _c2$2 = (a0) => ({ locale: a0 });
var _c3 = (a0, a1) => ({
  date: a0,
  count: a1
});
var _c4 = (a0) => ({
  $implicit: a0,
  compact: false
});
var _c5 = (a0) => ({
  $implicit: a0,
  compact: true
});
var _forTrack0$5 = ($index, $item) => $item[0];
var _forTrack1$1 = ($index, $item) => $item.getTime();
var _forTrack2 = ($index, $item) => $item.toISOString();
var _forTrack3 = ($index, $item) => $item.id;
var _forTrack4 = ($index, $item) => $item.day.toISOString();
function UiEventCalendarComponent_For_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 16);
    __listener("click", function UiEventCalendarComponent_For_15_Template_button_click_0_listener() {
      const viewOption_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.calendarView.set(viewOption_r2));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const viewOption_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    __classProp("bg-card", ctx_r2.calendarView() === viewOption_r2)("shadow-sm", ctx_r2.calendarView() === viewOption_r2)("text-foreground", ctx_r2.calendarView() === viewOption_r2)("text-muted-foreground", ctx_r2.calendarView() !== viewOption_r2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()(ctx_r2.labelForView(viewOption_r2)), " ");
  }
}
function UiEventCalendarComponent_Conditional_16_For_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "option", 19);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const categoryOption_r5 = ctx.$implicit;
    __property("ngValue", categoryOption_r5[0]);
    __advance();
    __textInterpolate(categoryOption_r5[1]);
  }
}
function UiEventCalendarComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "label", 15)(1, "span", 17);
    __text(2);
    __elementEnd();
    __elementStart(3, "select", 18);
    __controlCreate();
    __listener("ngModelChange", function UiEventCalendarComponent_Conditional_16_Template_select_ngModelChange_3_listener($event) {
      __restoreView(_r4);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.category.set($event));
    });
    __elementStart(4, "option", 19);
    __text(5);
    __elementEnd();
    __repeaterCreate(6, UiEventCalendarComponent_Conditional_16_For_7_Template, 2, 2, "option", 19, _forTrack0$5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r2.t()("calendrier.filter.label"));
    __advance();
    __property("ngModel", ctx_r2.category());
    __control();
    __advance();
    __property("ngValue", ctx_r2.allToken);
    __advance();
    __textInterpolate(ctx_r2.t()("calendrier.filter.all"));
    __advance();
    __repeater(ctx_r2.categories());
  }
}
function UiEventCalendarComponent_Conditional_17_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_Conditional_17_ng_container_0_Template, 1, 0, "ng-container", 20);
  if (rf & 2) {
    __nextContext();
    const monthTpl_r6 = __reference(22);
    __property("ngTemplateOutlet", monthTpl_r6);
  }
}
function UiEventCalendarComponent_Conditional_18_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_Conditional_18_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_Conditional_18_ng_container_0_Template, 1, 0, "ng-container", 20);
  if (rf & 2) {
    __nextContext();
    const weekTpl_r7 = __reference(24);
    __property("ngTemplateOutlet", weekTpl_r7);
  }
}
function UiEventCalendarComponent_Conditional_19_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_Conditional_19_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_Conditional_19_ng_container_0_Template, 1, 0, "ng-container", 20);
  if (rf & 2) {
    __nextContext();
    const dayTpl_r8 = __reference(26);
    __property("ngTemplateOutlet", dayTpl_r8);
  }
}
function UiEventCalendarComponent_Conditional_20_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_Conditional_20_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_Conditional_20_ng_container_0_Template, 1, 0, "ng-container", 20);
  if (rf & 2) {
    __nextContext();
    const listTpl_r9 = __reference(28);
    __property("ngTemplateOutlet", listTpl_r9);
  }
}
function UiEventCalendarComponent_ng_template_21_For_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 23);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const weekday_r10 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.cap(ctx_r2.format(weekday_r10, "EEE", __pureFunction1(1, _c2$2, ctx_r2.frLocale))));
  }
}
function UiEventCalendarComponent_ng_template_21_For_6_For_5_Template(rf, ctx) {
  if (rf & 1) __element(0, "span");
  if (rf & 2) {
    const event_r13 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __classMap(ctx_r2.cn("size-1.5 rounded-full", ctx_r2.toneStyle(event_r13.tone).dot));
  }
}
function UiEventCalendarComponent_ng_template_21_For_6_For_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 39);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const event_r14 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __classMap(ctx_r2.cn(ctx_r2.toneStyle(event_r14.tone).card, event_r14.muted ? "opacity-60 line-through" : ""));
    __advance();
    __textInterpolate1(" ", event_r14.title, " ");
  }
}
function UiEventCalendarComponent_ng_template_21_For_6_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 38);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const day_r12 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("calendrier.more", __pureFunction1(1, _c0$8, ctx_r2.dayEvents(day_r12).length - 2)), " ");
  }
}
function UiEventCalendarComponent_ng_template_21_For_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = __getCurrentView();
    __elementStart(0, "button", 32);
    __listener("click", function UiEventCalendarComponent_ng_template_21_For_6_Template_button_click_0_listener() {
      const day_r12 = __restoreView(_r11).$implicit;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.selected.set(day_r12));
    });
    __elementStart(1, "span", 33);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 34);
    __repeaterCreate(4, UiEventCalendarComponent_ng_template_21_For_6_For_5_Template, 1, 2, "span", 35, _forTrack3);
    __elementEnd();
    __elementStart(6, "span", 36);
    __repeaterCreate(7, UiEventCalendarComponent_ng_template_21_For_6_For_8_Template, 2, 3, "span", 37, _forTrack3);
    __conditionalCreate(9, UiEventCalendarComponent_ng_template_21_For_6_Conditional_9_Template, 2, 3, "span", 38);
    __elementEnd()();
  }
  if (rf & 2) {
    const day_r12 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __classMap(ctx_r2.cn("flex min-h-14 flex-col items-stretch gap-1 border-b border-r p-1 text-left transition-colors last:border-r-0 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:min-h-24 md:p-1.5", ctx_r2.outOfMonth(day_r12) ? "bg-muted/40 text-muted-foreground" : "", ctx_r2.isSel(day_r12) ? "bg-primary-soft" : ""));
    __attribute("aria-pressed", ctx_r2.isSameDay(day_r12, ctx_r2.selected()))("aria-label", ctx_r2.dayEvents(day_r12).length === 0 ? ctx_r2.t()("calendrier.dayCell", __pureFunction1(8, _c1$3, ctx_r2.fmtLong(day_r12))) : ctx_r2.t()("calendrier.dayCell.events.autre", __pureFunction2(10, _c3, ctx_r2.fmtLong(day_r12), ctx_r2.dayEvents(day_r12).length)));
    __advance();
    __classMap(ctx_r2.cn(ctx_r2.isTodayDay(day_r12) ? "bg-primary font-semibold text-primary-foreground" : ""));
    __advance();
    __textInterpolate1(" ", day_r12.getDate(), " ");
    __advance(2);
    __repeater(ctx_r2.dayEvents(day_r12).slice(0, 4));
    __advance(3);
    __repeater(ctx_r2.dayEvents(day_r12).slice(0, 2));
    __advance(2);
    __conditional(ctx_r2.dayEvents(day_r12).length > 2 ? 9 : -1);
  }
}
function UiEventCalendarComponent_ng_template_21_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = __getCurrentView();
    __elementStart(0, "ui-button", 40);
    __listener("click", function UiEventCalendarComponent_ng_template_21_Conditional_11_Template_ui_button_click_0_listener() {
      __restoreView(_r15);
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.emitDayCreate(ctx_r2.selected()));
    });
    __element(1, "lucide-angular", 9);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __property("img", ctx_r2.icons.plus);
    __advance();
    __textInterpolate1(" ", ctx_r2.t()("calendrier.addOnDay"), " ");
  }
}
function UiEventCalendarComponent_ng_template_21_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 30);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("calendrier.empty.day"));
  }
}
function UiEventCalendarComponent_ng_template_21_Conditional_13_For_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_ng_template_21_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_ng_template_21_Conditional_13_For_2_ng_container_0_Template, 1, 0, "ng-container", 41);
  if (rf & 2) {
    const event_r16 = ctx.$implicit;
    __nextContext(3);
    const eventCard_r17 = __reference(30);
    __property("ngTemplateOutlet", eventCard_r17)("ngTemplateOutletContext", __pureFunction1(2, _c4, event_r16));
  }
}
function UiEventCalendarComponent_ng_template_21_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 31);
    __repeaterCreate(1, UiEventCalendarComponent_ng_template_21_Conditional_13_For_2_Template, 1, 4, "ng-container", null, _forTrack3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __repeater(ctx_r2.dayEvents(ctx_r2.selected()));
  }
}
function UiEventCalendarComponent_ng_template_21_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 21)(1, "div", 22);
    __repeaterCreate(2, UiEventCalendarComponent_ng_template_21_For_3_Template, 2, 3, "div", 23, _forTrack1$1);
    __elementEnd();
    __elementStart(4, "div", 24);
    __repeaterCreate(5, UiEventCalendarComponent_ng_template_21_For_6_Template, 10, 13, "button", 25, _forTrack2);
    __elementEnd()();
    __elementStart(7, "section", 26)(8, "div", 27)(9, "h3", 28);
    __text(10);
    __elementEnd();
    __conditionalCreate(11, UiEventCalendarComponent_ng_template_21_Conditional_11_Template, 3, 2, "ui-button", 29);
    __elementEnd();
    __conditionalCreate(12, UiEventCalendarComponent_ng_template_21_Conditional_12_Template, 2, 1, "p", 30)(13, UiEventCalendarComponent_ng_template_21_Conditional_13_Template, 3, 0, "div", 31);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance(2);
    __repeater(ctx_r2.weekHead());
    __advance(3);
    __repeater(ctx_r2.monthCells());
    __advance(2);
    __attribute("aria-label", ctx_r2.t()("calendrier.selectedDay", __pureFunction1(4, _c1$3, ctx_r2.fmtWeekdayDay(ctx_r2.selected()))));
    __advance(3);
    __textInterpolate1(" ", ctx_r2.t()("calendrier.selectedDay", __pureFunction1(6, _c1$3, ctx_r2.fmtWeekdayDay(ctx_r2.selected()))), " ");
    __advance();
    __conditional(ctx_r2.dayCreateEnabled() ? 11 : -1);
    __advance();
    __conditional(ctx_r2.dayEvents(ctx_r2.selected()).length === 0 ? 12 : 13);
  }
}
function UiEventCalendarComponent_ng_template_23_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 46);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(3);
    __advance();
    __textInterpolate(ctx_r2.t()("calendrier.empty.day"));
  }
}
function UiEventCalendarComponent_ng_template_23_For_2_Conditional_4_For_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_ng_template_23_For_2_Conditional_4_For_2_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_ng_template_23_For_2_Conditional_4_For_2_ng_container_0_Template, 1, 0, "ng-container", 41);
  if (rf & 2) {
    const event_r18 = ctx.$implicit;
    __nextContext(4);
    const eventCard_r17 = __reference(30);
    __property("ngTemplateOutlet", eventCard_r17)("ngTemplateOutletContext", __pureFunction1(2, _c5, event_r18));
  }
}
function UiEventCalendarComponent_ng_template_23_For_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 31);
    __repeaterCreate(1, UiEventCalendarComponent_ng_template_23_For_2_Conditional_4_For_2_Template, 1, 4, "ng-container", null, _forTrack3);
    __elementEnd();
  }
  if (rf & 2) {
    const day_r19 = __nextContext().$implicit;
    const ctx_r2 = __nextContext(2);
    __advance();
    __repeater(ctx_r2.dayEvents(day_r19));
  }
}
function UiEventCalendarComponent_ng_template_23_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 44)(1, "h3", 45);
    __text(2);
    __elementEnd();
    __conditionalCreate(3, UiEventCalendarComponent_ng_template_23_For_2_Conditional_3_Template, 2, 1, "p", 46)(4, UiEventCalendarComponent_ng_template_23_For_2_Conditional_4_Template, 3, 0, "div", 31);
    __elementEnd();
  }
  if (rf & 2) {
    const day_r19 = ctx.$implicit;
    const ctx_r2 = __nextContext(2);
    __classProp("border-primary", ctx_r2.isTodayDay(day_r19));
    __attribute("aria-label", ctx_r2.cap(ctx_r2.fmtWeekdayDay(day_r19)));
    __advance(2);
    __textInterpolate1(" ", ctx_r2.cap(ctx_r2.format(day_r19, "EEE d", __pureFunction1(5, _c2$2, ctx_r2.frLocale))), " ");
    __advance();
    __conditional(ctx_r2.dayEvents(day_r19).length === 0 ? 3 : 4);
  }
}
function UiEventCalendarComponent_ng_template_23_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 42);
    __repeaterCreate(1, UiEventCalendarComponent_ng_template_23_For_2_Template, 5, 7, "section", 43, _forTrack2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __repeater(ctx_r2.weekCells());
  }
}
function UiEventCalendarComponent_ng_template_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 30);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("calendrier.empty.day"));
  }
}
function UiEventCalendarComponent_ng_template_25_Conditional_2_For_2_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_ng_template_25_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_ng_template_25_Conditional_2_For_2_ng_container_0_Template, 1, 0, "ng-container", 41);
  if (rf & 2) {
    const event_r20 = ctx.$implicit;
    __nextContext(3);
    const eventCard_r17 = __reference(30);
    __property("ngTemplateOutlet", eventCard_r17)("ngTemplateOutletContext", __pureFunction1(2, _c4, event_r20));
  }
}
function UiEventCalendarComponent_ng_template_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 31);
    __repeaterCreate(1, UiEventCalendarComponent_ng_template_25_Conditional_2_For_2_Template, 1, 4, "ng-container", null, _forTrack3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __repeater(ctx_r2.dayEvents(ctx_r2.cursorDate()));
  }
}
function UiEventCalendarComponent_ng_template_25_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 47);
    __conditionalCreate(1, UiEventCalendarComponent_ng_template_25_Conditional_1_Template, 2, 1, "p", 30)(2, UiEventCalendarComponent_ng_template_25_Conditional_2_Template, 3, 0, "div", 31);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __conditional(ctx_r2.dayEvents(ctx_r2.cursorDate()).length === 0 ? 1 : 2);
  }
}
function UiEventCalendarComponent_ng_template_27_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 48);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("calendrier.empty.period"));
  }
}
function UiEventCalendarComponent_ng_template_27_Conditional_1_For_2_For_5_ng_container_0_Template(rf, ctx) {
  if (rf & 1) __elementContainer(0);
}
function UiEventCalendarComponent_ng_template_27_Conditional_1_For_2_For_5_Template(rf, ctx) {
  if (rf & 1) __template(0, UiEventCalendarComponent_ng_template_27_Conditional_1_For_2_For_5_ng_container_0_Template, 1, 0, "ng-container", 41);
  if (rf & 2) {
    const event_r21 = ctx.$implicit;
    __nextContext(4);
    const eventCard_r17 = __reference(30);
    __property("ngTemplateOutlet", eventCard_r17)("ngTemplateOutletContext", __pureFunction1(2, _c4, event_r21));
  }
}
function UiEventCalendarComponent_ng_template_27_Conditional_1_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section")(1, "h3", 45);
    __text(2);
    __elementEnd();
    __elementStart(3, "div", 31);
    __repeaterCreate(4, UiEventCalendarComponent_ng_template_27_Conditional_1_For_2_For_5_Template, 1, 4, "ng-container", null, _forTrack3);
    __elementEnd()();
  }
  if (rf & 2) {
    const group_r22 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance(2);
    __textInterpolate1(" ", ctx_r2.cap(ctx_r2.format(group_r22.day, "EEEE d MMMM", __pureFunction1(1, _c2$2, ctx_r2.frLocale))), " ");
    __advance(2);
    __repeater(group_r22.events);
  }
}
function UiEventCalendarComponent_ng_template_27_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 49);
    __repeaterCreate(1, UiEventCalendarComponent_ng_template_27_Conditional_1_For_2_Template, 6, 3, "section", null, _forTrack4);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __repeater(ctx_r2.listGroups());
  }
}
function UiEventCalendarComponent_ng_template_27_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, UiEventCalendarComponent_ng_template_27_Conditional_0_Template, 2, 1, "p", 48)(1, UiEventCalendarComponent_ng_template_27_Conditional_1_Template, 3, 0, "div", 49);
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __conditional(ctx_r2.listGroups().length === 0 ? 0 : 1);
  }
}
function UiEventCalendarComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = __getCurrentView();
    __elementStart(0, "button", 50);
    __listener("click", function UiEventCalendarComponent_ng_template_29_Template_button_click_0_listener() {
      const e_r24 = __restoreView(_r23).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.eventClick.emit(e_r24));
    });
    __elementStart(1, "span", 51);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 52);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const e_r24 = ctx.$implicit;
    const compact_r25 = ctx.compact;
    const ctx_r2 = __nextContext();
    __classMap(ctx_r2.cn(compact_r25 ? "py-1 text-xs" : "py-2 text-sm", ctx_r2.toneStyle(e_r24.tone).card, e_r24.muted ? "opacity-60 line-through" : ""));
    __advance(2);
    __textInterpolate(e_r24.title);
    __advance(2);
    __textInterpolate(ctx_r2.eventSubtitle(e_r24));
  }
}
var VIEWS = [
  "month",
  "week",
  "day",
  "list"
];
var VIEW_LABEL = {
  month: "calendrier.view.month",
  week: "calendrier.view.week",
  day: "calendrier.view.day",
  list: "calendrier.view.list"
};
var TONE$1 = {
  primary: {
    card: "border-l-primary bg-primary-soft text-foreground",
    dot: "bg-primary"
  },
  info: {
    card: "border-l-info bg-info-bg text-info-fg",
    dot: "bg-info"
  },
  success: {
    card: "border-l-success bg-success-bg text-success-fg",
    dot: "bg-success"
  },
  warning: {
    card: "border-l-warning bg-warning-bg text-warning-fg",
    dot: "bg-warning"
  },
  danger: {
    card: "border-l-danger bg-danger-bg text-danger-fg",
    dot: "bg-danger"
  },
  neutral: {
    card: "border-l-border-strong bg-muted text-muted-foreground",
    dot: "bg-border-strong"
  }
};
var ALL = "__all";
var UiEventCalendarComponent = (_k = class {
  constructor() {
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.cn = cn;
    this.format = format;
    this.frLocale = fr;
    this.isSameDay = isSameDay;
    this.icons = {
      chevronLeft: ChevronLeft,
      chevronRight: ChevronRight,
      plus: Plus
    };
    this.views = VIEWS;
    this.allToken = ALL;
    this.events = input.required(...[]);
    this.categories = input([], ...[]);
    this.defaultView = input("month", ...[]);
    this.defaultDate = input(void 0, ...[]);
    this.className = input("", { });
    this.eventClick = output();
    this.dayCreateEnabled = input(false, ...[]);
    this.dayCreate = output();
    this.calendarView = signal("month", ...[]);
    this.cursorDate = signal(/* @__PURE__ */ new Date(), ...[]);
    this.selected = signal(/* @__PURE__ */ new Date(), ...[]);
    this.category = signal(ALL, ...[]);
    this.shown = computed(() => {
      const cat = this.category();
      const list = this.events();
      return cat === ALL ? list : list.filter((e) => e.category === cat);
    }, ...[]);
    this.range = computed(() => visibleRange(this.cursorDate(), this.calendarView()), ...[]);
    this.inPeriod = computed(() => eventsInRange(this.shown(), this.range().from, this.range().to), ...[]);
    this.title = computed(() => {
      const d = this.cursorDate();
      const v = this.calendarView();
      if (v === "day") return this.cap(format(d, "EEEE d MMMM yyyy", { locale: fr }));
      if (v === "week") {
        const days = weekDays(d);
        return this.t()("calendrier.weekOf", {
          from: format(days[0], "d MMMM", { locale: fr }),
          to: format(days[6], "d MMMM yyyy", { locale: fr })
        });
      }
      return this.cap(format(d, "MMMM yyyy", { locale: fr }));
    }, ...[]);
    this.monthCells = computed(() => monthGrid(this.cursorDate()), ...[]);
    this.weekHead = computed(() => weekDays(this.cursorDate()), ...[]);
    this.weekCells = computed(() => weekDays(this.cursorDate()), ...[]);
    this.listGroups = computed(() => groupByDay(this.inPeriod()), ...[]);
  }
  ngOnInit() {
    this.calendarView.set(this.defaultView());
    const initial = this.defaultDate();
    if (initial) {
      const d = new Date(initial);
      this.cursorDate.set(d);
      this.selected.set(d);
    }
  }
  labelForView(v) {
    return VIEW_LABEL[v];
  }
  toneStyle(tone) {
    return TONE$1[tone];
  }
  cap(s) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }
  fmtLong(d) {
    return format(d, "EEEE d MMMM yyyy", { locale: fr });
  }
  fmtWeekdayDay(d) {
    return format(d, "EEEE d MMMM", { locale: fr });
  }
  outOfMonth(day) {
    return !isSameMonth(day, this.cursorDate());
  }
  isSel(day) {
    return isSameDay(day, this.selected());
  }
  isTodayDay(day) {
    return isToday(day);
  }
  dayEvents(day) {
    return eventsOnDay(this.shown(), day);
  }
  eventSubtitle(e) {
    var _a2;
    if (isSameDay(e.start, e.end)) {
      const time = format(e.start, "HH:mm", { locale: fr });
      const sub = (_a2 = e.subtitle) == null ? void 0 : _a2.trim();
      return sub ? `${time} \xB7 ${sub}` : time;
    }
    return this.t()("calendrier.multiDay", {
      from: format(e.start, "d MMM", { locale: fr }),
      to: format(e.end, "d MMM", { locale: fr })
    });
  }
  go(direction) {
    const next = shiftDate(this.cursorDate(), this.calendarView(), direction);
    this.cursorDate.set(next);
    this.selected.set(next);
  }
  today() {
    const now = /* @__PURE__ */ new Date();
    this.cursorDate.set(now);
    this.selected.set(now);
  }
  emitDayCreate(day) {
    this.dayCreate.emit(day);
  }
}, _k.\u0275fac = function UiEventCalendarComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _k)();
}, _k.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _k,
  selectors: [["ui-event-calendar"]],
  inputs: {
    events: [1, "events"],
    categories: [1, "categories"],
    defaultView: [1, "defaultView"],
    defaultDate: [1, "defaultDate"],
    className: [
      1,
      "class",
      "className"
    ],
    dayCreateEnabled: [1, "dayCreateEnabled"]
  },
  outputs: {
    eventClick: "eventClick",
    dayCreate: "dayCreate"
  },
  decls: 31,
  vars: 15,
  consts: [
    ["monthTpl", ""],
    ["weekTpl", ""],
    ["dayTpl", ""],
    ["listTpl", ""],
    ["eventCard", ""],
    ["role", "region"],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-1"
    ],
    [
      "variant",
      "outline",
      "size",
      "icon",
      3,
      "click",
      "ariaLabel"
    ],
    [
      1,
      "size-4",
      3,
      "img"
    ],
    [
      "variant",
      "outline",
      3,
      "click"
    ],
    [
      "aria-live",
      "polite",
      1,
      "min-w-0",
      "flex-1",
      "text-lg",
      "font-semibold"
    ],
    [
      1,
      "ml-2",
      "text-sm",
      "font-normal",
      "text-muted-foreground"
    ],
    [
      "role",
      "group",
      1,
      "inline-flex",
      "rounded-md",
      "border",
      "border-input",
      "bg-muted/30",
      "p-0.5"
    ],
    [
      "type",
      "button",
      1,
      "rounded",
      "px-2.5",
      "py-1",
      "text-xs",
      "font-medium",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      3,
      "bg-card",
      "shadow-sm",
      "text-foreground",
      "text-muted-foreground"
    ],
    [
      1,
      "flex",
      "flex-col",
      "gap-1",
      "text-sm",
      "sm:w-56"
    ],
    [
      "type",
      "button",
      1,
      "rounded",
      "px-2.5",
      "py-1",
      "text-xs",
      "font-medium",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      3,
      "click"
    ],
    [1, "font-medium"],
    [
      1,
      "h-9",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "text-sm",
      "shadow-sm",
      "focus-visible:outline-none",
      "focus-visible:ring-1",
      "focus-visible:ring-ring",
      3,
      "ngModelChange",
      "ngModel"
    ],
    [3, "ngValue"],
    [4, "ngTemplateOutlet"],
    [
      1,
      "surface",
      "overflow-hidden"
    ],
    [
      1,
      "grid",
      "grid-cols-7",
      "border-b",
      "bg-muted",
      "text-center",
      "text-xs",
      "font-medium",
      "text-muted-foreground"
    ],
    [1, "py-2"],
    [
      1,
      "grid",
      "grid-cols-7"
    ],
    [
      "type",
      "button",
      3,
      "class"
    ],
    [
      1,
      "surface",
      "mt-3",
      "p-4"
    ],
    [
      1,
      "mb-3",
      "flex",
      "items-center",
      "justify-between",
      "gap-2"
    ],
    [
      1,
      "text-sm",
      "font-semibold"
    ],
    [
      "type",
      "button",
      "variant",
      "outline",
      "size",
      "sm"
    ],
    [
      1,
      "text-sm",
      "text-muted-foreground"
    ],
    [1, "space-y-2"],
    [
      "type",
      "button",
      3,
      "click"
    ],
    [
      1,
      "grid",
      "size-6",
      "place-items-center",
      "rounded-full",
      "text-xs",
      "tabular"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "flex",
      "flex-wrap",
      "gap-0.5",
      "md:hidden"
    ],
    [3, "class"],
    [
      "aria-hidden",
      "true",
      1,
      "hidden",
      "space-y-0.5",
      "md:block"
    ],
    [
      1,
      "block",
      "truncate",
      "rounded",
      "border-l-2",
      "px-1",
      "text-[11px]",
      3,
      "class"
    ],
    [
      1,
      "block",
      "text-[11px]",
      "text-muted-foreground"
    ],
    [
      1,
      "block",
      "truncate",
      "rounded",
      "border-l-2",
      "px-1",
      "text-[11px]"
    ],
    [
      "type",
      "button",
      "variant",
      "outline",
      "size",
      "sm",
      3,
      "click"
    ],
    [
      4,
      "ngTemplateOutlet",
      "ngTemplateOutletContext"
    ],
    [
      1,
      "grid",
      "gap-3",
      "md:grid-cols-7"
    ],
    [
      1,
      "surface",
      "min-w-0",
      "p-3",
      3,
      "border-primary"
    ],
    [
      1,
      "surface",
      "min-w-0",
      "p-3"
    ],
    [
      1,
      "mb-2",
      "text-xs",
      "font-semibold",
      "uppercase",
      "tracking-wider",
      "text-muted-foreground"
    ],
    [
      1,
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "surface",
      "p-4"
    ],
    [
      1,
      "surface",
      "p-5",
      "text-sm",
      "text-muted-foreground"
    ],
    [1, "space-y-4"],
    [
      "type",
      "button",
      1,
      "block",
      "w-full",
      "rounded-md",
      "border-l-4",
      "px-2.5",
      "text-left",
      "transition-colors",
      "hover:brightness-95",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      3,
      "click"
    ],
    [
      1,
      "block",
      "truncate",
      "font-medium"
    ],
    [
      1,
      "block",
      "truncate",
      "text-xs",
      "opacity-80"
    ]
  ],
  template: function UiEventCalendarComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7)(3, "ui-button", 8);
      __listener("click", function UiEventCalendarComponent_Template_ui_button_click_3_listener() {
        return ctx.go(-1);
      });
      __element(4, "lucide-angular", 9);
      __elementEnd();
      __elementStart(5, "ui-button", 10);
      __listener("click", function UiEventCalendarComponent_Template_ui_button_click_5_listener() {
        return ctx.today();
      });
      __text(6);
      __elementEnd();
      __elementStart(7, "ui-button", 8);
      __listener("click", function UiEventCalendarComponent_Template_ui_button_click_7_listener() {
        return ctx.go(1);
      });
      __element(8, "lucide-angular", 9);
      __elementEnd()();
      __elementStart(9, "h2", 11);
      __text(10);
      __elementStart(11, "span", 12);
      __text(12);
      __elementEnd()();
      __elementStart(13, "div", 13);
      __repeaterCreate(14, UiEventCalendarComponent_For_15_Template, 2, 9, "button", 14, __repeaterTrackByIdentity);
      __elementEnd()();
      __conditionalCreate(16, UiEventCalendarComponent_Conditional_16_Template, 8, 4, "label", 15);
      __conditionalCreate(17, UiEventCalendarComponent_Conditional_17_Template, 1, 1, "ng-container")(18, UiEventCalendarComponent_Conditional_18_Template, 1, 1, "ng-container")(19, UiEventCalendarComponent_Conditional_19_Template, 1, 1, "ng-container")(20, UiEventCalendarComponent_Conditional_20_Template, 1, 1, "ng-container");
      __elementEnd();
      __template(21, UiEventCalendarComponent_ng_template_21_Template, 14, 8, "ng-template", null, 0, __templateRefExtractor)(23, UiEventCalendarComponent_ng_template_23_Template, 3, 0, "ng-template", null, 1, __templateRefExtractor)(25, UiEventCalendarComponent_ng_template_25_Template, 3, 1, "ng-template", null, 2, __templateRefExtractor)(27, UiEventCalendarComponent_ng_template_27_Template, 2, 1, "ng-template", null, 3, __templateRefExtractor)(29, UiEventCalendarComponent_ng_template_29_Template, 5, 4, "ng-template", null, 4, __templateRefExtractor);
    }
    if (rf & 2) {
      __classMap(ctx.cn("space-y-3", ctx.className()));
      __attribute("aria-label", ctx.t()("calendrier.region"));
      __advance(3);
      __property("ariaLabel", ctx.t()("calendrier.prev"));
      __advance();
      __property("img", ctx.icons.chevronLeft);
      __advance(2);
      __textInterpolate(ctx.t()("calendrier.today"));
      __advance();
      __property("ariaLabel", ctx.t()("calendrier.next"));
      __advance();
      __property("img", ctx.icons.chevronRight);
      __advance(2);
      __textInterpolate1(" ", ctx.title(), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("calendrier.count.autre", __pureFunction1(13, _c0$8, ctx.inPeriod().length)), " ");
      __advance();
      __attribute("aria-label", ctx.t()("calendrier.views.aria"));
      __advance();
      __repeater(ctx.views);
      __advance(2);
      __conditional(ctx.categories().length > 0 ? 16 : -1);
      __advance();
      __conditional(ctx.calendarView() === "month" ? 17 : ctx.calendarView() === "week" ? 18 : ctx.calendarView() === "day" ? 19 : 20);
    }
  },
  dependencies: [
    NgTemplateOutlet,
    FormsModule,
    NgSelectOption,
    \u0275NgSelectMultipleOption,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    LucideAngularModule,
    LucideAngularComponent,
    UiButtonComponent
  ],
  encapsulation: 2
}), _k);
var FIELD_PRESETS = {
  firstName: {
    placeholder: "ui.field.ph.firstName",
    icon: "person",
    autocomplete: "given-name",
    maxlength: 60
  },
  lastName: {
    placeholder: "ui.field.ph.lastName",
    autocomplete: "family-name",
    maxlength: 60
  },
  age: {
    placeholder: "ui.field.ph.age",
    icon: "calendar_today",
    type: "number",
    inputmode: "numeric",
    maxlength: 3
  },
  phone: {
    placeholder: "ui.field.ph.phone",
    icon: "call",
    type: "tel",
    inputmode: "tel",
    autocomplete: "tel",
    maxlength: 20
  },
  cni: {
    placeholder: "ui.field.ph.cni",
    icon: "badge",
    inputmode: "numeric",
    autocomplete: "off",
    maxlength: 20
  },
  village: {
    placeholder: "ui.field.ph.village",
    icon: "location_on",
    maxlength: 80
  },
  commune: {
    placeholder: "ui.field.ph.commune",
    icon: "location_on",
    maxlength: 80
  },
  region: {
    placeholder: "ui.field.ph.region",
    icon: "landscape",
    maxlength: 80
  },
  email: {
    placeholder: "ui.field.ph.email",
    icon: "mail",
    type: "email",
    inputmode: "email",
    autocomplete: "email",
    maxlength: 120
  },
  amount: {
    placeholder: "ui.field.ph.amount",
    icon: "payments",
    type: "number",
    inputmode: "numeric"
  },
  note: {
    placeholder: "ui.field.ph.note",
    icon: "edit",
    maxlength: 200
  },
  scoopName: {
    placeholder: "ui.field.ph.scoopName",
    icon: "apartment",
    maxlength: 120
  },
  scoopCode: {
    placeholder: "ui.field.ph.scoopCode",
    maxlength: 5
  },
  period: {
    placeholder: "ui.field.ph.period",
    icon: "calendar_today",
    inputmode: "numeric",
    maxlength: 7
  },
  meetingTitle: {
    placeholder: "ui.field.ph.meetingTitle",
    icon: "event",
    maxlength: 120
  },
  place: {
    placeholder: "ui.field.ph.place",
    icon: "location_on",
    maxlength: 120
  },
  agendaItem: {
    placeholder: "ui.field.ph.agendaItem",
    maxlength: 160
  }
};
var _c0$7 = (a0) => ({ name: a0 });
var _forTrack0$4 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.key;
function FileSlotsComponent_For_2_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 9);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("ui.files.required"));
  }
}
function FileSlotsComponent_For_2_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 10);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r2.t()("ui.files.sensitive"));
  }
}
function FileSlotsComponent_For_2_Conditional_12_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "li", 14);
    __element(1, "ui-icon", 15);
    __elementStart(2, "span", 16);
    __text(3);
    __elementEnd();
    __elementStart(4, "span", 17);
    __text(5);
    __elementEnd();
    __elementStart(6, "button", 18);
    __listener("click", function FileSlotsComponent_For_2_Conditional_12_For_2_Template_button_click_6_listener() {
      const file_r5 = __restoreView(_r4).$implicit;
      const ctx_r2 = __nextContext(3);
      return __resetView(ctx_r2.removed.emit(file_r5.key));
    });
    __element(7, "ui-icon", 19);
    __elementEnd()();
  }
  if (rf & 2) {
    const file_r5 = ctx.$implicit;
    const ctx_r2 = __nextContext(3);
    __advance();
    __property("size", 16);
    __advance();
    __property("title", file_r5.name);
    __advance();
    __textInterpolate(file_r5.name);
    __advance(2);
    __textInterpolate1("", file_r5.sizeKb, " Ko");
    __advance();
    __attribute("aria-label", ctx_r2.t()("ui.files.remove", __pureFunction1(6, _c0$7, file_r5.name)));
    __advance();
    __property("size", 16);
  }
}
function FileSlotsComponent_For_2_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 12);
    __repeaterCreate(1, FileSlotsComponent_For_2_Conditional_12_For_2_Template, 8, 8, "li", 14, _forTrack1);
    __elementEnd();
  }
  if (rf & 2) {
    __nextContext();
    const mine_r6 = __readContextLet(0);
    __advance();
    __repeater(mine_r6);
  }
}
function FileSlotsComponent_For_2_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = __getCurrentView();
    __elementStart(0, "label", 13);
    __element(1, "ui-icon", 20);
    __text(2);
    __elementStart(3, "input", 21);
    __listener("change", function FileSlotsComponent_For_2_Conditional_13_Template_input_change_3_listener($event) {
      __restoreView(_r7);
      const slot_r2 = __nextContext().$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onPick($event, slot_r2.id));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const slot_r2 = __nextContext().$implicit;
    const mine_r6 = __readContextLet(0);
    const ctx_r2 = __nextContext();
    __attribute("for", ctx_r2.uid + slot_r2.id);
    __advance();
    __property("size", 18);
    __advance();
    __textInterpolate1(" ", mine_r6.length ? ctx_r2.t()("ui.files.addAnother") : ctx_r2.t()("ui.files.add"), " ");
    __advance();
    __property("id", ctx_r2.uid + slot_r2.id)("accept", ctx_r2.accept())("multiple", ctx_r2.multiple());
  }
}
function FileSlotsComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __declareLet(0);
    __elementStart(1, "div", 3);
    __listener("dragover", function FileSlotsComponent_For_2_Template_div_dragover_1_listener($event) {
      const slot_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      $event.preventDefault();
      return __resetView(ctx_r2.over.set(slot_r2.id));
    })("dragleave", function FileSlotsComponent_For_2_Template_div_dragleave_1_listener() {
      __restoreView(_r1);
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.over.set(null));
    })("drop", function FileSlotsComponent_For_2_Template_div_drop_1_listener($event) {
      const slot_r2 = __restoreView(_r1).$implicit;
      const ctx_r2 = __nextContext();
      return __resetView(ctx_r2.onDrop($event, slot_r2.id));
    });
    __elementStart(2, "div", 4)(3, "span", 5);
    __element(4, "ui-icon", 6);
    __elementEnd();
    __elementStart(5, "div", 7)(6, "p", 8);
    __text(7);
    __conditionalCreate(8, FileSlotsComponent_For_2_Conditional_8_Template, 2, 1, "span", 9);
    __conditionalCreate(9, FileSlotsComponent_For_2_Conditional_9_Template, 2, 1, "span", 10);
    __elementEnd();
    __elementStart(10, "p", 11);
    __text(11);
    __elementEnd()()();
    __conditionalCreate(12, FileSlotsComponent_For_2_Conditional_12_Template, 3, 0, "ul", 12);
    __conditionalCreate(13, FileSlotsComponent_For_2_Conditional_13_Template, 4, 6, "label", 13);
    __elementEnd();
  }
  if (rf & 2) {
    const slot_r2 = ctx.$implicit;
    const ctx_r2 = __nextContext();
    const mine_r8 = __storeLet(ctx_r2.filesOf(slot_r2.id));
    __advance();
    __classProp("filled", mine_r8.length)("over", ctx_r2.over() === slot_r2.id);
    __advance(3);
    __property("name", mine_r8.length ? "check_circle" : slot_r2.icon)("size", 20);
    __advance(3);
    __textInterpolate1(" ", slot_r2.label, " ");
    __advance();
    __conditional(slot_r2.required && !mine_r8.length ? 8 : -1);
    __advance();
    __conditional(slot_r2.sensitive ? 9 : -1);
    __advance(2);
    __textInterpolate(slot_r2.hint);
    __advance();
    __conditional(mine_r8.length ? 12 : -1);
    __advance();
    __conditional(ctx_r2.multiple() || !mine_r8.length ? 13 : -1);
  }
}
function FileSlotsComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 2);
    __element(1, "ui-icon", 22);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate1("", ctx_r2.hint(), " ");
  }
}
var nextId$2 = 0;
var FileSlotsComponent = (_l = class {
  constructor() {
    this.slots = input.required(...[]);
    this.files = input([], ...[]);
    this.accept = input("", ...[]);
    this.multiple = input(true, ...[]);
    this.hint = input("", ...[]);
    this.added = output();
    this.removed = output();
    this.t = inject(LocaleService).t;
    this.uid = `fs-${nextId$2++}-`;
    this.over = signal(null, ...[]);
  }
  filesOf(slot) {
    return this.files().filter((f) => f.slot === slot);
  }
  onPick(ev, slot) {
    var _a2;
    const input2 = ev.target;
    if ((_a2 = input2.files) == null ? void 0 : _a2.length) this.added.emit({
      slot,
      files: Array.from(input2.files)
    });
    input2.value = "";
  }
  onDrop(ev, slot) {
    var _a2;
    ev.preventDefault();
    this.over.set(null);
    const files = (_a2 = ev.dataTransfer) == null ? void 0 : _a2.files;
    if (files == null ? void 0 : files.length) this.added.emit({
      slot,
      files: Array.from(files)
    });
  }
}, _l.\u0275fac = function FileSlotsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _l)();
}, _l.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _l,
  selectors: [["ui-file-slots"]],
  hostAttrs: [1, "block"],
  inputs: {
    slots: [1, "slots"],
    files: [1, "files"],
    accept: [1, "accept"],
    multiple: [1, "multiple"],
    hint: [1, "hint"]
  },
  outputs: {
    added: "added",
    removed: "removed"
  },
  decls: 4,
  vars: 1,
  consts: [
    [1, "slots"],
    [
      1,
      "slot",
      3,
      "filled",
      "over"
    ],
    [
      1,
      "mt-3",
      "flex",
      "items-center",
      "gap-2",
      "text-[12.5px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "slot",
      3,
      "dragover",
      "dragleave",
      "drop"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-3"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "ico"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-1.5",
      "text-[14px]",
      "font-extrabold"
    ],
    [
      1,
      "tag",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [
      1,
      "tag",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)"
    ],
    [
      1,
      "mt-0.5",
      "text-[12.5px]",
      "font-medium",
      "leading-snug",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [1, "files"],
    [1, "drop"],
    [1, "file"],
    [
      "name",
      "description",
      2,
      "color",
      "var(--v2-foret)",
      3,
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "truncate",
      "font-bold",
      3,
      "title"
    ],
    [
      1,
      "shrink-0",
      "tabular-nums",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "type",
      "button",
      1,
      "rm",
      3,
      "click"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [
      "name",
      "upload_file",
      3,
      "size"
    ],
    [
      "type",
      "file",
      1,
      "sr-only",
      3,
      "change",
      "id",
      "accept",
      "multiple"
    ],
    [
      "name",
      "help",
      3,
      "size"
    ]
  ],
  template: function FileSlotsComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0);
      __repeaterCreate(1, FileSlotsComponent_For_2_Template, 14, 13, "div", 1, _forTrack0$4);
      __elementEnd();
      __conditionalCreate(3, FileSlotsComponent_Conditional_3_Template, 3, 2, "p", 2);
    }
    if (rf & 2) {
      __advance();
      __repeater(ctx.slots());
      __advance(2);
      __conditional(ctx.hint() ? 3 : -1);
    }
  },
  dependencies: [IconComponent],
  styles: [".slots[_ngcontent-%COMP%] {\n      display: grid;\n      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n      gap: 12px;\n    }\n    .slot[_ngcontent-%COMP%] {\n      display: flex;\n      flex-direction: column;\n      border-radius: 20px;\n      border: 1.5px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      padding: 14px;\n      transition:\n        border-color 0.15s ease,\n        background-color 0.15s ease;\n    }\n    .slot.filled[_ngcontent-%COMP%] {\n      border-color: color-mix(in oklab, var(--%NS%v2-vert-pousse) 45%, transparent);\n    }\n    .slot.over[_ngcontent-%COMP%] {\n      border-color: var(--%NS%v2-foret);\n      background: var(--%NS%v2-sauge);\n    }\n    .ico[_ngcontent-%COMP%] {\n      display: grid;\n      height: 40px;\n      width: 40px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 12px;\n      background: var(--%NS%v2-sauge);\n      color: var(--%NS%v2-foret);\n    }\n    .filled[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n    }\n    .tag[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 2px 8px;\n      font-size: 11px;\n      font-weight: 800;\n      white-space: nowrap;\n    }\n    .drop[_ngcontent-%COMP%] {\n      display: flex;\n      margin-top: 12px;\n      min-height: 52px;\n      align-items: center;\n      justify-content: center;\n      gap: 8px;\n      border-radius: 14px;\n      border: 1.5px dashed var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-creme);\n      padding: 10px 12px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-foret);\n      cursor: pointer;\n      transition:\n        border-color 0.15s ease,\n        background-color 0.15s ease;\n    }\n    .drop[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-foret);\n    }\n    .drop[_ngcontent-%COMP%]:focus-within {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .files[_ngcontent-%COMP%] {\n      margin-top: 10px;\n      display: grid;\n      gap: 6px;\n    }\n    .file[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 10px;\n      border-radius: 12px;\n      background: var(--%NS%v2-creme);\n      padding: 6px 6px 6px 10px;\n      font-size: 13px;\n    }\n    .rm[_ngcontent-%COMP%] {\n      display: grid;\n      height: 28px;\n      width: 28px;\n      flex-shrink: 0;\n      place-items: center;\n      border-radius: 8px;\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n    }\n    .rm[_ngcontent-%COMP%]:hover {\n      background: var(--%NS%v2-erreur-bg);\n      color: var(--%NS%v2-erreur-fg);\n    }\n    .rm[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n    }"]
}), _l);
function UiKpiTileComponent_Conditional_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __domElement(0, "span", 5);
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __classProp("bg-warning", ctx_r0.tone() === "warning")("bg-danger", ctx_r0.tone() === "danger");
  }
}
function UiKpiTileComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "div");
    __conditionalCreate(1, UiKpiTileComponent_Conditional_5_Conditional_1_Template, 1, 4, "span", 4);
    __text(2);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __classMap(ctx_r0.subClass());
    __advance();
    __conditional(ctx_r0.tone() !== "neutral" ? 1 : -1);
    __advance();
    __textInterpolate1(" ", ctx_r0.sub(), " ");
  }
}
var UiKpiTileComponent = (_m = class {
  constructor() {
    this.label = input.required(...[]);
    this.value = input.required(...[]);
    this.sub = input(void 0, ...[]);
    this.tone = input("neutral", ...[]);
    this.subClass = computed(() => cn("mt-1.5 flex items-center gap-1.5 text-xs", this.tone() === "warning" ? "text-warning-fg" : this.tone() === "danger" ? "text-danger-fg" : "text-muted-foreground"), ...[]);
  }
}, _m.\u0275fac = function UiKpiTileComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _m)();
}, _m.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _m,
  selectors: [["ui-kpi-tile"]],
  inputs: {
    label: [1, "label"],
    value: [1, "value"],
    sub: [1, "sub"],
    tone: [1, "tone"]
  },
  decls: 6,
  vars: 3,
  consts: [
    [
      1,
      "surface",
      "p-4"
    ],
    [
      1,
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "mt-1",
      "text-2xl",
      "font-semibold",
      "tabular"
    ],
    [3, "class"],
    [
      "aria-hidden",
      "true",
      1,
      "size-1.5",
      "rounded-full",
      3,
      "bg-warning",
      "bg-danger"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "size-1.5",
      "rounded-full"
    ]
  ],
  template: function UiKpiTileComponent_Template(rf, ctx) {
    if (rf & 1) {
      __domElementStart(0, "div", 0)(1, "div", 1);
      __text(2);
      __domElementEnd();
      __domElementStart(3, "div", 2);
      __text(4);
      __domElementEnd();
      __conditionalCreate(5, UiKpiTileComponent_Conditional_5_Template, 3, 4, "div", 3);
      __domElementEnd();
    }
    if (rf & 2) {
      __advance(2);
      __textInterpolate(ctx.label());
      __advance(2);
      __textInterpolate(ctx.value());
      __advance();
      __conditional(ctx.sub() ? 5 : -1);
    }
  },
  encapsulation: 2
}), _m);
var _c0$6 = [[[
  "",
  "actions",
  ""
]]];
var _c1$2 = ["[actions]"];
function UiPageHeaderComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "div", 2);
    __text(1);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.eyebrow());
  }
}
function UiPageHeaderComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "p", 4);
    __text(1);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r0.description(), " ");
  }
}
var UiPageHeaderComponent = (_n = class {
  constructor() {
    this.eyebrow = input(void 0, ...[]);
    this.title = input.required(...[]);
    this.description = input(void 0, ...[]);
  }
}, _n.\u0275fac = function UiPageHeaderComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _n)();
}, _n.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _n,
  selectors: [["ui-page-header"]],
  inputs: {
    eyebrow: [1, "eyebrow"],
    title: [1, "title"],
    description: [1, "description"]
  },
  ngContentSelectors: _c1$2,
  decls: 8,
  vars: 3,
  consts: [
    [
      1,
      "mb-8",
      "flex",
      "flex-col",
      "gap-5",
      "md:flex-row",
      "md:items-end",
      "md:justify-between"
    ],
    [
      1,
      "min-w-0",
      "max-w-3xl"
    ],
    [
      1,
      "eyebrow",
      "mb-2"
    ],
    [
      1,
      "text-2xl",
      "font-semibold",
      "tracking-tight",
      "text-foreground",
      "md:text-[1.75rem]"
    ],
    [
      1,
      "mt-2",
      "max-w-2xl",
      "text-sm",
      "leading-relaxed",
      "text-muted-foreground",
      "md:text-[0.9375rem]"
    ],
    [
      1,
      "flex",
      "shrink-0",
      "flex-wrap",
      "gap-2"
    ]
  ],
  template: function UiPageHeaderComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c0$6);
      __domElementStart(0, "div", 0)(1, "div", 1);
      __conditionalCreate(2, UiPageHeaderComponent_Conditional_2_Template, 2, 1, "div", 2);
      __domElementStart(3, "h1", 3);
      __text(4);
      __domElementEnd();
      __conditionalCreate(5, UiPageHeaderComponent_Conditional_5_Template, 2, 1, "p", 4);
      __domElementEnd();
      __domElementStart(6, "div", 5);
      __projection(7);
      __domElementEnd()();
    }
    if (rf & 2) {
      __advance(2);
      __conditional(ctx.eyebrow() ? 2 : -1);
      __advance(2);
      __textInterpolate1(" ", ctx.title(), " ");
      __advance();
      __conditional(ctx.description() ? 5 : -1);
    }
  },
  encapsulation: 2
}), _n);
var PAGE_SIZES = [
  10,
  25,
  50,
  100
];
function pageWindow(total, query = {}, defaultLimit = 10) {
  var _a2, _b2;
  const limit = Math.min(Math.max((_a2 = query.limit) != null ? _a2 : defaultLimit, 1), 200);
  const pages = Math.max(1, Math.ceil(total / limit));
  const page = Math.min(Math.max((_b2 = query.page) != null ? _b2 : 1, 1), pages);
  return {
    total,
    page,
    limit,
    pages,
    skip: (page - 1) * limit
  };
}
function paginate(all, query = {}, defaultLimit = 10) {
  const { skip, ...meta } = pageWindow(all.length, query, defaultLimit);
  return {
    ...meta,
    items: all.slice(skip, skip + meta.limit)
  };
}
function withPage(path, query = {}) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) if (value !== void 0 && value !== "") params.set(key, String(value));
  const qs = params.toString();
  return qs ? `${path}?${qs}` : path;
}
async function fetchAllPages(fetchPage) {
  const items = [];
  for (let page = 1; ; page++) {
    const res = await fetchPage({
      page,
      limit: 200
    });
    items.push(...res.items);
    if (res.page >= res.pages) return items;
  }
}
var _c0$5 = ["trigger"];
var _c1$1 = ["filterInput"];
var _c2$1 = ["panel"];
var _forTrack0$3 = ($index, $item) => $item.value;
function SelectComponent_Conditional_3_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 4);
  if (rf & 2) __property("name", ctx)("size", 20);
}
function SelectComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 5);
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __property("name", ctx_r0.leadingIcon())("size", 20);
  }
}
function SelectComponent_Conditional_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "label", 10);
    __element(1, "ui-icon", 14);
    __elementStart(2, "input", 15, 2);
    __listener("input", function SelectComponent_Conditional_8_Conditional_2_Template_input_input_2_listener($event) {
      __restoreView(_r3);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.onQuery($event.target.value));
    })("keydown", function SelectComponent_Conditional_8_Conditional_2_Template_input_keydown_2_listener($event) {
      __restoreView(_r3);
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.onListKey($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("size", 18);
    __advance();
    __property("placeholder", ctx_r0.t()("ui.select.search"))("value", ctx_r0.query());
    __attribute("aria-label", ctx_r0.t()("ui.select.search"))("aria-controls", ctx_r0.ids.list);
  }
}
function SelectComponent_Conditional_8_For_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 17);
  if (rf & 2) {
    const option_r6 = __nextContext().$implicit;
    __property("name", option_r6.icon)("size", 19);
  }
}
function SelectComponent_Conditional_8_For_5_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 18);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r6 = __nextContext().$implicit;
    __advance();
    __textInterpolate(option_r6.hint);
  }
}
function SelectComponent_Conditional_8_For_5_Conditional_5_Template(rf, ctx) {
  if (rf & 1) __element(0, "ui-icon", 19);
  if (rf & 2) __property("size", 18);
}
function SelectComponent_Conditional_8_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "li", 16);
    __listener("mouseenter", function SelectComponent_Conditional_8_For_5_Template_li_mouseenter_0_listener() {
      const \u0275$index_28_r5 = __restoreView(_r4).$index;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.active.set(\u0275$index_28_r5));
    })("click", function SelectComponent_Conditional_8_For_5_Template_li_click_0_listener() {
      const option_r6 = __restoreView(_r4).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.choose(option_r6));
    });
    __conditionalCreate(1, SelectComponent_Conditional_8_For_5_Conditional_1_Template, 1, 2, "ui-icon", 17);
    __elementStart(2, "span", 6);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, SelectComponent_Conditional_8_For_5_Conditional_4_Template, 2, 1, "span", 18);
    __conditionalCreate(5, SelectComponent_Conditional_8_For_5_Conditional_5_Template, 1, 1, "ui-icon", 19);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r6 = ctx.$implicit;
    const \u0275$index_28_r5 = ctx.$index;
    const ctx_r0 = __nextContext(2);
    __classProp("active", \u0275$index_28_r5 === ctx_r0.active())("selected", option_r6.value === ctx_r0.value());
    __property("id", ctx_r0.ids.option + \u0275$index_28_r5);
    __attribute("aria-selected", option_r6.value === ctx_r0.value());
    __advance();
    __conditional(option_r6.icon ? 1 : -1);
    __advance(2);
    __textInterpolate(option_r6.label);
    __advance();
    __conditional(option_r6.hint ? 4 : -1);
    __advance();
    __conditional(option_r6.value === ctx_r0.value() ? 5 : -1);
  }
}
function SelectComponent_Conditional_8_ForEmpty_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 13);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r0.t()("ui.select.empty"));
  }
}
function SelectComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "div", 9, 1);
    __conditionalCreate(2, SelectComponent_Conditional_8_Conditional_2_Template, 4, 5, "label", 10);
    __elementStart(3, "ul", 11);
    __listener("keydown", function SelectComponent_Conditional_8_Template_ul_keydown_3_listener($event) {
      __restoreView(_r2);
      const ctx_r0 = __nextContext();
      return __resetView(ctx_r0.onListKey($event));
    });
    __repeaterCreate(4, SelectComponent_Conditional_8_For_5_Template, 6, 10, "li", 12, _forTrack0$3, false, SelectComponent_Conditional_8_ForEmpty_6_Template, 2, 1, "li", 13);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __styleProp("left", ctx_r0.place().left, "px")("width", ctx_r0.place().width, "px")("top", ctx_r0.place().top, "px")("bottom", ctx_r0.place().bottom, "px")("max-height", ctx_r0.place().maxHeight, "px");
    __advance(2);
    __conditional(ctx_r0.searchable() ? 2 : -1);
    __advance();
    __property("id", ctx_r0.ids.list);
    __attribute("aria-labelledby", ctx_r0.ids.trigger)("aria-activedescendant", ctx_r0.activeId());
    __advance();
    __repeater(ctx_r0.visible());
  }
}
var nextId$1 = 0;
var SelectComponent = (_o = class {
  constructor() {
    this.options = input.required(...[]);
    this.value = input("", ...[]);
    this.label = input("", ...[]);
    this.placeholder = input("", ...[]);
    this.leadingIcon = input(null, ...[]);
    this.variant = input("default", ...[]);
    this.align = input("left", ...[]);
    this.drop = input("down", ...[]);
    this.searchFrom = input(8, ...[]);
    this.valueChange = output();
    this.t = inject(LocaleService).t;
    this.host = inject(ElementRef);
    this.destroyRef = inject(DestroyRef);
    this.triggerRef = viewChild("trigger", ...[]);
    this.filterRef = viewChild("filterInput", ...[]);
    this.uid = nextId$1++;
    this.ids = {
      trigger: `sel-${this.uid}`,
      list: `sel-${this.uid}-list`,
      option: `sel-${this.uid}-opt-`
    };
    this.open = signal(false, ...[]);
    this.place = signal({
      left: 0,
      width: 240,
      top: 0,
      bottom: null,
      maxHeight: 340
    }, ...[]);
    this.panelRef = viewChild("panel", ...[]);
    this.query = signal("", ...[]);
    this.active = signal(0, ...[]);
    this.current = computed(() => this.options().find((o) => o.value === this.value()), ...[]);
    this.searchable = computed(() => this.options().length >= this.searchFrom(), ...[]);
    this.visible = computed(() => {
      const norm = (v) => v.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
      const q = norm(this.query().trim());
      return q ? this.options().filter((o) => norm(o.label).includes(q)) : this.options();
    }, ...[]);
    this.activeId = computed(() => this.open() && this.visible().length ? this.ids.option + this.active() : null, ...[]);
    afterNextRender(() => {
      const onScroll = (e) => this.onScroll(e);
      window.addEventListener("scroll", onScroll, true);
      this.destroyRef.onDestroy(() => window.removeEventListener("scroll", onScroll, true));
    });
    effect(() => {
      if (!this.open()) return;
      untracked(() => {
        const i = this.visible().findIndex((o) => o.value === this.value());
        this.active.set(Math.max(0, i));
        queueMicrotask(() => {
          var _a2;
          return (_a2 = this.filterRef()) == null ? void 0 : _a2.nativeElement.focus({ preventScroll: true });
        });
      });
    });
  }
  toggle() {
    if (!this.open()) this.measure();
    this.open.update((o) => !o);
    if (!this.open()) this.query.set("");
  }
  /**
  * Place la liste sous le champ, ou au-dessus quand la place manque en bas (ou si `drop="up"`).
  * Largeur : celle du champ (240 px au moins), alignée à droite si `align="right"`.
  */
  measure() {
    var _a2;
    (_a2 = this.triggerRef()) == null ? void 0 : _a2.nativeElement;
    return;
  }
  correct() {
    var _a2, _b2;
    const panel = (_a2 = this.panelRef()) == null ? void 0 : _a2.nativeElement;
    if (!panel) return;
    const p = this.place();
    const rect = panel.getBoundingClientRect();
    const dx = rect.left - p.left;
    const dy = p.top !== null ? rect.top - p.top : rect.bottom - (window.innerHeight - ((_b2 = p.bottom) != null ? _b2 : 0));
    if (Math.abs(dx) < 1 && Math.abs(dy) < 1) return;
    this.place.set({
      ...p,
      left: p.left - dx,
      top: p.top !== null ? p.top - dy : null,
      bottom: p.bottom !== null ? p.bottom + dy : null
    });
  }
  /** Défilement de la page : la liste suivrait mal le champ, on la ferme (sauf défilement dans la liste). */
  onScroll(e) {
    var _a2;
    if (!this.open()) return;
    const panel = (_a2 = this.panelRef()) == null ? void 0 : _a2.nativeElement;
    if (panel && e.target instanceof Node && panel.contains(e.target)) return;
    this.close(false);
  }
  choose(o) {
    this.valueChange.emit(o.value);
    this.close(true);
  }
  onQuery(v) {
    this.query.set(v);
    this.active.set(0);
  }
  onTriggerKey(e) {
    if (!this.open() && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      e.preventDefault();
      this.measure();
      this.open.set(true);
      return;
    }
    if (this.open()) this.onListKey(e);
  }
  onListKey(e) {
    const n = this.visible().length;
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (n) this.active.update((i) => (i + 1) % n);
        break;
      case "ArrowUp":
        e.preventDefault();
        if (n) this.active.update((i) => (i - 1 + n) % n);
        break;
      case "Home":
        e.preventDefault();
        this.active.set(0);
        break;
      case "End":
        e.preventDefault();
        this.active.set(Math.max(0, n - 1));
        break;
      case "Enter": {
        e.preventDefault();
        const o = this.visible()[this.active()];
        if (o) this.choose(o);
        break;
      }
      case "Escape":
        e.preventDefault();
        this.close(true);
        break;
      case "Tab":
        this.close(false);
    }
  }
  onDocumentClick(e) {
    if (this.open() && !this.host.nativeElement.contains(e.target)) this.close(false);
  }
  close(refocus) {
    var _a2;
    this.open.set(false);
    this.query.set("");
    if (refocus) (_a2 = this.triggerRef()) == null ? void 0 : _a2.nativeElement.focus();
  }
}, _o.\u0275fac = function SelectComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _o)();
}, _o.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _o,
  selectors: [["ui-select"]],
  viewQuery: function SelectComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.triggerRef, _c0$5, 5)(ctx.filterRef, _c1$1, 5)(ctx.panelRef, _c2$1, 5);
    if (rf & 2) __queryAdvance(3);
  },
  hostAttrs: [
    1,
    "relative",
    "block"
  ],
  hostBindings: function SelectComponent_HostBindings(rf, ctx) {
    if (rf & 1) __listener("click", function SelectComponent_click_HostBindingHandler($event) {
      return ctx.onDocumentClick($event);
    }, __resolveDocument)("resize", function SelectComponent_resize_HostBindingHandler() {
      return ctx.close(false);
    }, __resolveWindow);
  },
  inputs: {
    options: [1, "options"],
    value: [1, "value"],
    label: [1, "label"],
    placeholder: [1, "placeholder"],
    leadingIcon: [1, "leadingIcon"],
    variant: [1, "variant"],
    align: [1, "align"],
    drop: [1, "drop"],
    searchFrom: [1, "searchFrom"]
  },
  outputs: { valueChange: "valueChange" },
  decls: 9,
  vars: 16,
  consts: [
    ["trigger", ""],
    ["panel", ""],
    ["filterInput", ""],
    [
      "type",
      "button",
      "aria-haspopup",
      "listbox",
      1,
      "trigger",
      3,
      "click",
      "keydown",
      "id"
    ],
    [
      2,
      "color",
      "var(--v2-foret)",
      3,
      "name",
      "size"
    ],
    [
      2,
      "color",
      "var(--v2-gris-texte)",
      3,
      "name",
      "size"
    ],
    [
      1,
      "min-w-0",
      "flex-1",
      "truncate"
    ],
    [
      "name",
      "keyboard_arrow_down",
      1,
      "chevron",
      3,
      "size"
    ],
    [
      1,
      "panel",
      "floating",
      3,
      "left",
      "width",
      "top",
      "bottom",
      "max-height"
    ],
    [
      1,
      "panel",
      "floating"
    ],
    [1, "filter"],
    [
      "role",
      "listbox",
      "tabindex",
      "-1",
      1,
      "list",
      3,
      "keydown",
      "id"
    ],
    [
      "role",
      "option",
      1,
      "option",
      3,
      "id",
      "active",
      "selected"
    ],
    [1, "empty"],
    [
      "name",
      "search",
      3,
      "size"
    ],
    [
      "type",
      "text",
      3,
      "input",
      "keydown",
      "placeholder",
      "value"
    ],
    [
      "role",
      "option",
      1,
      "option",
      3,
      "mouseenter",
      "click",
      "id"
    ],
    [
      3,
      "name",
      "size"
    ],
    [1, "hint"],
    [
      "name",
      "check",
      3,
      "size"
    ]
  ],
  template: function SelectComponent_Template(rf, ctx) {
    var _a2, _b2, _c6, _d2, _e2;
    if (rf & 1) {
      __elementStart(0, "div")(1, "button", 3, 0);
      __listener("click", function SelectComponent_Template_button_click_1_listener() {
        return ctx.toggle();
      })("keydown", function SelectComponent_Template_button_keydown_1_listener($event) {
        return ctx.onTriggerKey($event);
      });
      __conditionalCreate(3, SelectComponent_Conditional_3_Template, 1, 2, "ui-icon", 4)(4, SelectComponent_Conditional_4_Template, 1, 2, "ui-icon", 5);
      __elementStart(5, "span", 6);
      __text(6);
      __elementEnd();
      __element(7, "ui-icon", 7);
      __elementEnd();
      __conditionalCreate(8, SelectComponent_Conditional_8_Template, 7, 15, "div", 8);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_8_0;
      __classProp("compact", ctx.variant() === "compact")("open", ctx.open());
      __advance();
      __classProp("open", ctx.open());
      __property("id", ctx.ids.trigger);
      __attribute("aria-expanded", ctx.open())("aria-controls", ctx.ids.list)("aria-label", ctx.label() ? ctx.label() + " : " + ((_b2 = (_a2 = ctx.current()) == null ? void 0 : _a2.label) != null ? _b2 : ctx.placeholder() || ctx.t()("ui.select.placeholder")) : null);
      __advance(2);
      __conditional((tmp_8_0 = (_c6 = ctx.current()) == null ? void 0 : _c6.icon) ? 3 : ctx.leadingIcon() ? 4 : -1, tmp_8_0);
      __advance(2);
      __styleProp("color", ctx.current() ? null : "var(--v2-gris-texte)");
      __advance();
      __textInterpolate1(" ", (_e2 = (_d2 = ctx.current()) == null ? void 0 : _d2.label) != null ? _e2 : ctx.placeholder() || ctx.t()("ui.select.placeholder"), " ");
      __advance();
      __property("size", 22);
      __advance();
      __conditional(ctx.open() ? 8 : -1);
    }
  },
  dependencies: [IconComponent],
  styles: [".trigger[_ngcontent-%COMP%] {\n      display: flex;\n      height: 52px;\n      width: 100%;\n      align-items: center;\n      gap: 10px;\n      border-radius: 16px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding: 0 12px 0 16px;\n      text-align: left;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      cursor: pointer;\n      transition:\n        border-color 0.15s ease,\n        box-shadow 0.15s ease;\n    }\n    .trigger[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    .trigger[_ngcontent-%COMP%]:focus-visible, \n   .trigger.open[_ngcontent-%COMP%] {\n      outline: none;\n      border: 2px solid var(--%NS%v2-foret);\n      padding-left: 15.5px;\n      box-shadow: var(--%NS%v2-halo);\n    }\n    .compact[_ngcontent-%COMP%]   .trigger[_ngcontent-%COMP%] {\n      height: 48px;\n      border-radius: 14px;\n      border-color: transparent;\n      background: var(--%NS%v2-creme);\n    }\n    .chevron[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-gris-texte);\n      transition: transform 0.2s ease;\n    }\n    .open[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {\n      transform: rotate(180deg);\n    }\n    .panel[_ngcontent-%COMP%] {\n      position: absolute;\n      left: 0;\n      right: 0;\n      top: calc(100% + 8px);\n      z-index: 70;\n      min-width: 240px;\n      border-radius: 18px;\n      border: 1px solid var(--%NS%v2-bord-carte);\n      background: var(--%NS%v2-blanc);\n      padding: 6px;\n      box-shadow: var(--%NS%v2-ombre-modale);\n      animation: _ngcontent-%COMP%_drop 0.16s ease both;\n    }\n    .panel.right[_ngcontent-%COMP%] {\n      left: auto;\n    }\n    \n    .panel.up[_ngcontent-%COMP%] {\n      top: auto;\n      bottom: calc(100% + 8px);\n    }\n    @keyframes _ngcontent-%COMP%_drop {\n      from {\n        opacity: 0;\n        transform: translateY(-4px);\n      }\n      to {\n        opacity: 1;\n        transform: translateY(0);\n      }\n    }\n    .filter[_ngcontent-%COMP%] {\n      display: flex;\n      height: 42px;\n      align-items: center;\n      gap: 8px;\n      margin-bottom: 4px;\n      border-radius: 12px;\n      background: var(--%NS%v2-creme);\n      padding: 0 12px;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n      min-width: 0;\n      flex: 1;\n      background: transparent;\n      font-size: 14px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      outline: none;\n    }\n    \n    .panel.floating[_ngcontent-%COMP%] {\n      position: fixed;\n      right: auto;\n      bottom: auto;\n      top: auto;\n      display: flex;\n      flex-direction: column;\n    }\n    .panel.floating[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {\n      max-height: none;\n      min-height: 0;\n      flex: 1;\n    }\n    .list[_ngcontent-%COMP%] {\n      max-height: 280px;\n      overflow-y: auto;\n      overscroll-behavior: contain;\n    }\n    .option[_ngcontent-%COMP%] {\n      display: flex;\n      min-height: 44px;\n      align-items: center;\n      gap: 10px;\n      border-radius: 12px;\n      padding: 8px 10px;\n      font-size: 14px;\n      font-weight: 600;\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n    }\n    .option.active[_ngcontent-%COMP%] {\n      background: var(--%NS%v2-sauge);\n      color: var(--%NS%v2-encre);\n    }\n    .option.selected[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-foret);\n      font-weight: 800;\n    }\n    .hint[_ngcontent-%COMP%] {\n      border-radius: 999px;\n      padding: 1px 8px;\n      font-size: 12px;\n      font-weight: 700;\n      font-variant-numeric: tabular-nums;\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-gris-texte);\n    }\n    .empty[_ngcontent-%COMP%] {\n      padding: 12px;\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .panel[_ngcontent-%COMP%] {\n        animation: none;\n      }\n      .chevron[_ngcontent-%COMP%] {\n        transition: none;\n      }\n    }"]
}), _o);
var _c0$4 = (a0) => ({ page: a0 });
var _forTrack0$2 = ($index, $item) => $item.kind === "page" ? $item.page : $item.key;
function PaginationComponent_Conditional_1_For_11_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __elementStart(0, "button", 9);
    __listener("click", function PaginationComponent_Conditional_1_For_11_Conditional_0_Template_button_click_0_listener() {
      __restoreView(_r4);
      const slot_r5 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.pager().setPage(slot_r5.page));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const slot_r5 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(2);
    const pageResult_r3 = __readContextLet(0);
    __attribute("aria-current", slot_r5.page === pageResult_r3.page ? "page" : null)("aria-label", ctx_r1.t()("common.pager.page", __pureFunction1(3, _c0$4, slot_r5.page)));
    __advance();
    __textInterpolate1(" ", slot_r5.page, " ");
  }
}
function PaginationComponent_Conditional_1_For_11_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 8);
    __text(1, "\u2026");
    __elementEnd();
  }
}
function PaginationComponent_Conditional_1_For_11_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, PaginationComponent_Conditional_1_For_11_Conditional_0_Template, 2, 5, "button", 7)(1, PaginationComponent_Conditional_1_For_11_Conditional_1_Template, 2, 0, "span", 8);
  if (rf & 2) {
    const slot_r5 = ctx.$implicit;
    __conditional(slot_r5.kind === "page" ? 0 : 1);
  }
}
function PaginationComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "nav", 0)(1, "p", 1)(2, "b");
    __text(3);
    __elementEnd();
    __text(4);
    __elementStart(5, "b");
    __text(6);
    __elementEnd()();
    __elementStart(7, "div", 2)(8, "button", 3);
    __listener("click", function PaginationComponent_Conditional_1_Template_button_click_8_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      const pageResult_r3 = __readContextLet(0);
      return __resetView(ctx_r1.pager().setPage(pageResult_r3.page - 1));
    });
    __element(9, "ui-icon", 4);
    __elementEnd();
    __repeaterCreate(10, PaginationComponent_Conditional_1_For_11_Template, 2, 1, null, null, _forTrack0$2);
    __elementStart(12, "button", 3);
    __listener("click", function PaginationComponent_Conditional_1_Template_button_click_12_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      const pageResult_r3 = __readContextLet(0);
      return __resetView(ctx_r1.pager().setPage(pageResult_r3.page + 1));
    });
    __element(13, "ui-icon", 5);
    __elementEnd()();
    __elementStart(14, "ui-select", 6);
    __listener("valueChange", function PaginationComponent_Conditional_1_Template_ui_select_valueChange_14_listener($event) {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.pager().setSize(+$event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    const pageResult_r3 = __readContextLet(0);
    __attribute("aria-label", ctx_r1.t()("common.pager.label"));
    __advance(3);
    __textInterpolate2("", ctx_r1.from(), "\u2013", ctx_r1.to());
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("common.pager.of"), " ");
    __advance(2);
    __textInterpolate(pageResult_r3.total);
    __advance(2);
    __property("disabled", pageResult_r3.page <= 1);
    __attribute("aria-label", ctx_r1.t()("common.pager.prev"));
    __advance();
    __property("size", 20);
    __advance();
    __repeater(ctx_r1.slots());
    __advance(2);
    __property("disabled", pageResult_r3.page >= pageResult_r3.pages);
    __attribute("aria-label", ctx_r1.t()("common.pager.next"));
    __advance();
    __property("size", 20);
    __advance();
    __property("label", ctx_r1.t()("common.pager.size"))("options", ctx_r1.sizeOptions())("value", "" + pageResult_r3.limit);
  }
}
var PaginationComponent = (_p = class {
  constructor() {
    this.pager = input.required(...[]);
    this.sizes = input(PAGE_SIZES, ...[]);
    this.t = inject(LocaleService).t;
    this.minSize = computed(() => Math.min(...this.sizes()), ...[]);
    this.from = computed(() => {
      const r = this.pager().result();
      return r.total === 0 ? 0 : (r.page - 1) * r.limit + 1;
    }, ...[]);
    this.to = computed(() => {
      const r = this.pager().result();
      return Math.min(r.page * r.limit, r.total);
    }, ...[]);
    this.sizeOptions = computed(() => this.sizes().map((size) => ({
      value: String(size),
      label: this.t()("common.pager.sizeOption", { size })
    })), ...[]);
    this.slots = computed(() => {
      const { page, pages } = this.pager().result();
      const keep = new Set([
        1,
        pages,
        page - 1,
        page,
        page + 1
      ].filter((p) => p >= 1 && p <= pages));
      if (keep.has(3) || page <= 3) keep.add(2);
      if (keep.has(pages - 2) || page >= pages - 2) keep.add(pages - 1);
      const sorted = [...keep].filter((p) => p >= 1 && p <= pages).sort((a, b) => a - b);
      const out = [];
      sorted.forEach((p, i) => {
        if (i > 0 && p - sorted[i - 1] > 1) out.push({
          kind: "gap",
          key: `gap-${p}`
        });
        out.push({
          kind: "page",
          page: p
        });
      });
      return out;
    }, ...[]);
  }
}, _p.\u0275fac = function PaginationComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _p)();
}, _p.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _p,
  selectors: [["ui-pagination"]],
  hostAttrs: [1, "block"],
  inputs: {
    pager: [1, "pager"],
    sizes: [1, "sizes"]
  },
  decls: 2,
  vars: 2,
  consts: [
    [1, "bar"],
    [
      "aria-live",
      "polite",
      1,
      "range"
    ],
    [1, "nav"],
    [
      "type",
      "button",
      1,
      "btn",
      3,
      "click",
      "disabled"
    ],
    [
      "name",
      "chevron_left",
      3,
      "size"
    ],
    [
      "name",
      "chevron_right",
      3,
      "size"
    ],
    [
      "variant",
      "compact",
      "align",
      "right",
      "drop",
      "up",
      1,
      "size",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "type",
      "button",
      1,
      "btn"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "gap"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      3,
      "click"
    ]
  ],
  template: function PaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      __declareLet(0);
      __conditionalCreate(1, PaginationComponent_Conditional_1_Template, 15, 14, "nav", 0);
    }
    if (rf & 2) {
      const pageResult_r6 = __storeLet(ctx.pager().result());
      __advance();
      __conditional(pageResult_r6.total > ctx.minSize() ? 1 : -1);
    }
  },
  dependencies: [IconComponent, SelectComponent],
  styles: [".bar[_ngcontent-%COMP%] {\n      display: flex;\n      flex-wrap: wrap;\n      align-items: center;\n      justify-content: space-between;\n      gap: 12px;\n      padding-top: 16px;\n    }\n    .range[_ngcontent-%COMP%] {\n      font-size: 13px;\n      font-weight: 600;\n      color: var(--%NS%v2-gris-texte);\n      font-variant-numeric: tabular-nums;\n    }\n    .range[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {\n      color: var(--%NS%v2-encre);\n      font-weight: 800;\n    }\n    .nav[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 4px;\n    }\n    .btn[_ngcontent-%COMP%] {\n      display: grid;\n      min-width: 38px;\n      height: 38px;\n      place-items: center;\n      border-radius: 12px;\n      padding: 0 8px;\n      font-size: 14px;\n      font-weight: 700;\n      font-variant-numeric: tabular-nums;\n      color: var(--%NS%v2-ardoise);\n      cursor: pointer;\n      transition:\n        background-color 0.15s ease,\n        color 0.15s ease;\n    }\n    .btn[_ngcontent-%COMP%]:hover:not(:disabled):not([aria-current]) {\n      background: var(--%NS%v2-creme);\n      color: var(--%NS%v2-encre);\n    }\n    .btn[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-foret);\n      outline-offset: 2px;\n    }\n    .btn[_ngcontent-%COMP%]:disabled {\n      cursor: not-allowed;\n      opacity: 0.35;\n    }\n    .btn[aria-current][_ngcontent-%COMP%] {\n      background: var(--%NS%v2-foret);\n      color: var(--%NS%v2-citron);\n      cursor: default;\n    }\n    .gap[_ngcontent-%COMP%] {\n      min-width: 24px;\n      text-align: center;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .size[_ngcontent-%COMP%] {\n      width: 150px;\n    }"]
}), _p);
var _c0$3 = (a0, a1) => ({
  current: a0,
  total: a1
});
var _forTrack0$1 = ($index, $item) => $item.src;
function PhotoSlideshowComponent_For_1_Template(rf, ctx) {
  if (rf & 1) __domElement(0, "img", 2);
  if (rf & 2) {
    const photo_r1 = ctx.$implicit;
    const \u0275$index_1_r2 = ctx.$index;
    const ctx_r2 = __nextContext();
    __styleProp("object-position", photo_r1.position);
    __classProp("active", \u0275$index_1_r2 === ctx_r2.index());
    __domProperty("src", photo_r1.src);
    __attribute("fetchpriority", \u0275$index_1_r2 === 0 ? "high" : "low")("loading", \u0275$index_1_r2 === 0 ? "eager" : "lazy");
  }
}
function PhotoSlideshowComponent_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = __getCurrentView();
    __domElementStart(0, "button", 4);
    __domListener("click", function PhotoSlideshowComponent_Conditional_2_For_2_Template_button_click_0_listener() {
      const \u0275$index_7_r5 = __restoreView(_r4).$index;
      const ctx_r2 = __nextContext(2);
      return __resetView(ctx_r2.goTo(\u0275$index_7_r5));
    });
    __domElementEnd();
  }
  if (rf & 2) {
    const \u0275$index_7_r5 = ctx.$index;
    const ctx_r2 = __nextContext(2);
    __classProp("active", \u0275$index_7_r5 === ctx_r2.index());
    __attribute("aria-label", ctx_r2.t()("ui.slideshow.goTo", __pureFunction2(4, _c0$3, \u0275$index_7_r5 + 1, ctx_r2.photos().length)))("aria-current", \u0275$index_7_r5 === ctx_r2.index() || null);
  }
}
function PhotoSlideshowComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __domElementStart(0, "div", 1);
    __repeaterCreate(1, PhotoSlideshowComponent_Conditional_2_For_2_Template, 1, 7, "button", 3, _forTrack0$1);
    __domElementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = __nextContext();
    __advance();
    __repeater(ctx_r2.photos());
  }
}
var PhotoSlideshowComponent = (_q = class {
  constructor() {
    this.photos = input.required(...[]);
    this.interval = input(7e3, ...[]);
    this.t = inject(LocaleService).t;
    this.index = signal(0, ...[]);
    this.document = inject(DOCUMENT$1);
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      var _a2;
      if ((_a2 = this.document.defaultView) == null ? void 0 : _a2.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      this.start();
      const onVisibility = () => this.document.hidden ? this.stop() : this.start();
      this.document.addEventListener("visibilitychange", onVisibility);
      destroyRef.onDestroy(() => {
        this.stop();
        this.document.removeEventListener("visibilitychange", onVisibility);
      });
    });
  }
  goTo(i) {
    this.index.set(i);
    if (this.timer) {
      this.stop();
      this.start();
    }
  }
  start() {
    this.stop();
    this.timer = setInterval(() => this.index.update((i) => (i + 1) % this.photos().length), this.interval());
  }
  stop() {
    clearInterval(this.timer);
    this.timer = void 0;
  }
}, _q.\u0275fac = function PhotoSlideshowComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _q)();
}, _q.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _q,
  selectors: [["ui-photo-slideshow"]],
  hostAttrs: [
    1,
    "block",
    "overflow-hidden"
  ],
  inputs: {
    photos: [1, "photos"],
    interval: [1, "interval"]
  },
  decls: 3,
  vars: 1,
  consts: [
    [
      "alt",
      "",
      "decoding",
      "async",
      1,
      "slide",
      3,
      "active",
      "src",
      "object-position"
    ],
    [
      1,
      "absolute",
      "bottom-5",
      "right-6",
      "z-10",
      "flex",
      "items-center",
      "gap-2"
    ],
    [
      "alt",
      "",
      "decoding",
      "async",
      1,
      "slide",
      3,
      "src"
    ],
    [
      "type",
      "button",
      1,
      "dot",
      3,
      "active"
    ],
    [
      "type",
      "button",
      1,
      "dot",
      3,
      "click"
    ]
  ],
  template: function PhotoSlideshowComponent_Template(rf, ctx) {
    if (rf & 1) {
      __repeaterCreate(0, PhotoSlideshowComponent_For_1_Template, 1, 7, "img", 0, _forTrack0$1);
      __conditionalCreate(2, PhotoSlideshowComponent_Conditional_2_Template, 3, 0, "div", 1);
    }
    if (rf & 2) {
      __repeater(ctx.photos());
      __advance(2);
      __conditional(ctx.photos().length > 1 ? 2 : -1);
    }
  },
  styles: [".slide[_ngcontent-%COMP%] {\n      position: absolute;\n      inset: 0;\n      width: 100%;\n      height: 100%;\n      object-fit: cover;\n      opacity: 0;\n      transform: scale(1.06);\n      transition:\n        opacity 1.4s ease,\n        transform 9s linear;\n    }\n    .slide.active[_ngcontent-%COMP%] {\n      opacity: 1;\n      transform: scale(1);\n    }\n    .dot[_ngcontent-%COMP%] {\n      height: 6px;\n      width: 6px;\n      border-radius: 999px;\n      cursor: pointer;\n      background: color-mix(in oklab, var(--%NS%v2-blanc, #fff) 45%, transparent);\n      transition:\n        width 0.3s ease,\n        background-color 0.3s ease;\n    }\n    .dot.active[_ngcontent-%COMP%] {\n      width: 22px;\n      background: var(--%NS%v2-blanc, #fff);\n    }\n    .dot[_ngcontent-%COMP%]:focus-visible {\n      outline: 2px solid var(--%NS%v2-blanc, #fff);\n      outline-offset: 3px;\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .slide[_ngcontent-%COMP%] {\n        transition: opacity 0.3s ease;\n        transform: none;\n      }\n      .slide.active[_ngcontent-%COMP%] {\n        transform: none;\n      }\n    }"]
}), _q);
var _c0$2 = ["*"];
var TONE = {
  success: "bg-success-bg text-success-fg",
  warning: "bg-warning-bg text-warning-fg",
  danger: "bg-danger-bg text-danger-fg",
  info: "bg-info-bg text-info-fg",
  neutral: "bg-muted text-muted-foreground border border-border",
  brand: "bg-primary-soft text-primary",
  ochre: "bg-ochre-soft text-ochre-text"
};
var DOT = {
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  neutral: "bg-border-strong",
  brand: "bg-primary",
  ochre: "bg-ochre"
};
var Q_TONE = {
  valid\u00E9: "success",
  "\xE0 v\xE9rifier": "warning",
  doublon: "info",
  invalide: "danger"
};
var UiPillComponent = (_r = class {
  constructor() {
    this.tone = input("neutral", ...[]);
    this.className = input("", { });
    this.classes = computed(() => cn("inline-flex items-center gap-1.5 max-w-full whitespace-normal sm:whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold", TONE[this.tone()], this.className()), ...[]);
    this.dotClass = computed(() => cn("size-1.5 shrink-0 rounded-full", DOT[this.tone()]), ...[]);
  }
}, _r.\u0275fac = function UiPillComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _r)();
}, _r.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _r,
  selectors: [["ui-pill"]],
  inputs: {
    tone: [1, "tone"],
    className: [
      1,
      "class",
      "className"
    ]
  },
  ngContentSelectors: _c0$2,
  decls: 3,
  vars: 4,
  consts: [["aria-hidden", "true"]],
  template: function UiPillComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef();
      __domElementStart(0, "span");
      __domElement(1, "span", 0);
      __projection(2);
      __domElementEnd();
    }
    if (rf & 2) {
      __classMap(ctx.classes());
      __advance();
      __classMap(ctx.dotClass());
    }
  },
  encapsulation: 2
}), _r);
_s = class {
  constructor() {
    this.q = input.required(...[]);
    this.tone = computed(() => Q_TONE[this.q()], ...[]);
  }
}, _s.\u0275fac = function UiQualityPillComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _s)();
}, _s.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _s,
  selectors: [["ui-quality-pill"]],
  inputs: { q: [1, "q"] },
  decls: 2,
  vars: 2,
  consts: [[3, "tone"]],
  template: function UiQualityPillComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "ui-pill", 0);
      __text(1);
      __elementEnd();
    }
    if (rf & 2) {
      __property("tone", ctx.tone());
      __advance();
      __textInterpolate(ctx.q());
    }
  },
  dependencies: [UiPillComponent],
  encapsulation: 2
});
var _c0$1 = ["panel"];
var _c1 = ["*", [[
  "",
  "sheetFooter",
  ""
]]];
var _c2 = ["*", "[sheetFooter]"];
function UiSheetComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "div", 1)(1, "div", 2);
    __listener("click", function UiSheetComponent_Conditional_0_Template_div_click_1_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.close());
    });
    __elementEnd();
    __elementStart(2, "div", 3, 0)(4, "div", 4)(5, "h2", 5);
    __text(6);
    __elementEnd();
    __elementStart(7, "button", 6);
    __listener("click", function UiSheetComponent_Conditional_0_Template_button_click_7_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.close());
    });
    __element(8, "lucide-angular", 7);
    __elementEnd()();
    __elementStart(9, "div", 8);
    __projection(10);
    __elementEnd();
    __elementStart(11, "div", 9);
    __projection(12, 1);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __classMap(ctx_r1.panelClasses());
    __attribute("aria-labelledby", ctx_r1.titleId);
    __advance(3);
    __property("id", ctx_r1.titleId);
    __advance();
    __textInterpolate1(" ", ctx_r1.title(), " ");
    __advance();
    __attribute("aria-label", ctx_r1.t()("common.close"));
    __advance();
    __property("img", ctx_r1.icons.x);
  }
}
_t = class {
  constructor() {
    this.open = model(false, ...[]);
    this.title = input.required(...[]);
    this.side = input("right", ...[]);
    this.closed = output();
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.titleId = `sheet-${Math.random().toString(36).slice(2, 9)}`;
    this.icons = { x: X };
    this.panel = viewChild("panel", ...[]);
    this.previous = null;
    this.locked = false;
    effect(() => {
      if (this.open()) {
        this.previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        if (!this.locked) {
          lockBodyScroll();
          this.locked = true;
        }
        setTimeout(() => {
          var _a2;
          const el = (_a2 = this.panel()) == null ? void 0 : _a2.nativeElement;
          if (el) focusInitial(el);
        }, 0);
      } else this.release();
    });
  }
  onKeydown(event) {
    var _a2;
    if (!this.open()) return;
    if (event.key === "Escape") {
      event.preventDefault();
      this.close();
      return;
    }
    const el = (_a2 = this.panel()) == null ? void 0 : _a2.nativeElement;
    if (el) trapTabKey(el, event);
  }
  panelClasses() {
    const s = this.side();
    if (s === "bottom") return "inset-x-0 bottom-0 max-h-[90vh] w-full rounded-t-xl border-t mbay-animate-sheet-panel-bottom";
    if (s === "left") return "inset-y-0 left-0 h-full w-full max-w-[min(100%,24rem)] border-r mbay-animate-sheet-panel-left";
    return "inset-y-0 right-0 h-full w-full max-w-[min(100%,24rem)] border-l mbay-animate-sheet-panel-right";
  }
  close() {
    this.open.set(false);
    this.closed.emit();
  }
  release() {
    var _a2;
    if (this.locked) {
      unlockBodyScroll();
      this.locked = false;
    }
    (_a2 = this.previous) == null ? void 0 : _a2.focus({ preventScroll: true });
    this.previous = null;
  }
}, _t.\u0275fac = function UiSheetComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _t)();
}, _t.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _t,
  selectors: [["ui-sheet"]],
  viewQuery: function UiSheetComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.panel, _c0$1, 5);
    if (rf & 2) __queryAdvance();
  },
  hostBindings: function UiSheetComponent_HostBindings(rf, ctx) {
    if (rf & 1) __listener("keydown", function UiSheetComponent_keydown_HostBindingHandler($event) {
      return ctx.onKeydown($event);
    }, __resolveDocument);
  },
  inputs: {
    open: [1, "open"],
    title: [1, "title"],
    side: [1, "side"]
  },
  outputs: {
    open: "openChange",
    closed: "closed"
  },
  ngContentSelectors: _c2,
  decls: 1,
  vars: 1,
  consts: [
    ["panel", ""],
    [
      "role",
      "presentation",
      1,
      "fixed",
      "inset-0",
      "z-50",
      "md:hidden"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "absolute",
      "inset-0",
      "bg-black/80",
      "mbay-animate-sheet-overlay",
      3,
      "click"
    ],
    [
      "role",
      "dialog",
      "aria-modal",
      "true",
      "tabindex",
      "-1",
      1,
      "absolute",
      "flex",
      "max-h-[95vh]",
      "flex-col",
      "bg-background",
      "shadow-lg"
    ],
    [
      1,
      "flex",
      "items-start",
      "justify-between",
      "gap-3",
      "border-b",
      "px-4",
      "py-3",
      "sm:px-6"
    ],
    [
      1,
      "text-lg",
      "font-semibold",
      "text-foreground",
      3,
      "id"
    ],
    [
      "type",
      "button",
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-md",
      "text-muted-foreground",
      "hover:bg-muted",
      "hover:text-foreground",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "pointer-coarse:size-10",
      3,
      "click"
    ],
    [
      1,
      "size-4",
      3,
      "img"
    ],
    [
      1,
      "min-h-0",
      "flex-1",
      "overflow-y-auto",
      "px-4",
      "py-4",
      "sm:px-6"
    ],
    [
      1,
      "border-t",
      "px-4",
      "py-4",
      "sm:px-6"
    ]
  ],
  template: function UiSheetComponent_Template(rf, ctx) {
    if (rf & 1) {
      __projectionDef(_c1);
      __conditionalCreate(0, UiSheetComponent_Conditional_0_Template, 13, 7, "div", 1);
    }
    if (rf & 2) __conditional(ctx.open() ? 0 : -1);
  },
  dependencies: [LucideAngularModule, LucideAngularComponent],
  encapsulation: 2
});
var _forTrack0 = ($index, $item) => $item.label;
function StatCardsComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 2)(1, "span", 3);
    __element(2, "ui-icon", 4);
    __elementEnd();
    __elementStart(3, "div", 5)(4, "span", 6);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 7);
    __element(7, "ui-icon", 4);
    __elementEnd()();
    __elementStart(8, "span", 8);
    __text(9);
    __elementEnd();
    __elementStart(10, "span", 9);
    __text(11);
    __elementEnd()();
  }
  if (rf & 2) {
    const stat_r1 = ctx.$implicit;
    const \u0275$index_3_r2 = ctx.$index;
    __styleProp("background", \u0275$index_3_r2 === 0 ? "var(--v2-foret)" : stat_r1.bg)("color", \u0275$index_3_r2 === 0 ? "var(--v2-blanc)" : stat_r1.fg);
    __advance();
    __styleProp("color", \u0275$index_3_r2 === 0 ? "var(--v2-citron)" : stat_r1.fg);
    __advance();
    __property("name", stat_r1.icon)("size", 120);
    __advance(2);
    __styleProp("opacity", \u0275$index_3_r2 === 0 ? 0.8 : 1);
    __advance();
    __textInterpolate(stat_r1.label);
    __advance();
    __styleProp("background", \u0275$index_3_r2 === 0 ? "var(--v2-citron)" : stat_r1.fg)("color", \u0275$index_3_r2 === 0 ? "var(--v2-foret)" : stat_r1.bg);
    __advance();
    __property("name", stat_r1.icon)("size", 20);
    __advance(2);
    __textInterpolate(stat_r1.value);
    __advance();
    __styleProp("opacity", 0.75);
    __advance();
    __textInterpolate(stat_r1.sub);
  }
}
var StatCardsComponent = (_u = class {
  constructor() {
    this.stats = input.required(...[]);
  }
}, _u.\u0275fac = function StatCardsComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _u)();
}, _u.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _u,
  selectors: [["ui-stat-cards"]],
  hostAttrs: [1, "block"],
  inputs: { stats: [1, "stats"] },
  decls: 3,
  vars: 2,
  consts: [
    [
      1,
      "grid",
      "grid-cols-1",
      "gap-4",
      "sm:grid-cols-2",
      "xl:grid-cols-4"
    ],
    [
      1,
      "stat",
      "flex",
      "flex-col",
      "p-5",
      3,
      "background",
      "color"
    ],
    [
      1,
      "stat",
      "flex",
      "flex-col",
      "p-5"
    ],
    [
      "aria-hidden",
      "true",
      1,
      "watermark"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "relative",
      "flex",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      1,
      "text-[14px]",
      "font-bold"
    ],
    [
      1,
      "grid",
      "size-10",
      "place-items-center",
      "rounded-[12px]"
    ],
    [
      1,
      "relative",
      "mt-3",
      "text-[34px]",
      "font-extrabold",
      "leading-none",
      "tracking-[-0.03em]",
      "tabular-nums"
    ],
    [
      1,
      "relative",
      "mt-2",
      "text-[13px]",
      "font-medium",
      "leading-snug"
    ]
  ],
  template: function StatCardsComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "div", 0);
      __repeaterCreate(1, StatCardsComponent_For_2_Template, 12, 21, "div", 1, _forTrack0);
      __elementEnd();
    }
    if (rf & 2) {
      __classProp("five", ctx.stats().length === 5);
      __advance();
      __repeater(ctx.stats());
    }
  },
  dependencies: [IconComponent],
  styles: [".stat[_ngcontent-%COMP%] {\n      position: relative;\n      overflow: hidden;\n      border-radius: 24px;\n      border: 1px solid transparent;\n      transition:\n        transform 0.2s ease,\n        box-shadow 0.2s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover {\n      transform: translateY(-2px);\n      box-shadow: var(--%NS%v2-ombre-flottant);\n    }\n    .watermark[_ngcontent-%COMP%] {\n      pointer-events: none;\n      position: absolute;\n      right: -18px;\n      bottom: -26px;\n      opacity: 0.12;\n      transform: rotate(-12deg);\n      transition: transform 0.35s ease;\n    }\n    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {\n      transform: rotate(-4deg) scale(1.06);\n    }\n    \n    @media (min-width: 1280px) {\n      .five[_ngcontent-%COMP%] {\n        grid-template-columns: repeat(5, minmax(0, 1fr));\n      }\n    }\n    @media (prefers-reduced-motion: reduce) {\n      .stat[_ngcontent-%COMP%], \n   .watermark[_ngcontent-%COMP%] {\n        transition: none;\n      }\n    }"]
}), _u);
_v = class {
  constructor() {
    this.title = input.required(...[]);
    this.description = input("", ...[]);
    this.hint = input("\xC9cran en cours de portage Angular \u2014 structure et droits align\xE9s sur React ; contenu d\xE9tail \xE0 suivre.", ...[]);
  }
}, _v.\u0275fac = function UiStubPageComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _v)();
}, _v.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _v,
  selectors: [["ui-stub-page"]],
  inputs: {
    title: [1, "title"],
    description: [1, "description"],
    hint: [1, "hint"]
  },
  decls: 3,
  vars: 3,
  consts: [[
    3,
    "title",
    "description"
  ], [
    1,
    "surface",
    "p-6",
    "text-sm",
    "text-muted-foreground"
  ]],
  template: function UiStubPageComponent_Template(rf, ctx) {
    if (rf & 1) {
      __element(0, "ui-page-header", 0);
      __elementStart(1, "div", 1);
      __text(2);
      __elementEnd();
    }
    if (rf & 2) {
      __property("title", ctx.title())("description", ctx.description());
      __advance(2);
      __textInterpolate1(" ", ctx.hint(), " ");
    }
  },
  dependencies: [UiPageHeaderComponent],
  encapsulation: 2
});
var _c0 = ["field"];
function TextFieldComponent_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 2);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.optional());
  }
}
function TextFieldComponent_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 4);
    __element(1, "ui-icon", 8);
    __elementEnd();
  }
  if (rf & 2) {
    __advance();
    __property("name", ctx)("size", 20);
  }
}
function TextFieldComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 6);
    __element(1, "ui-icon", 9);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __property("id", ctx_r0.errorId);
    __advance();
    __property("size", 16);
    __advance();
    __textInterpolate(ctx_r0.error());
  }
}
function TextFieldComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 7);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __property("id", ctx_r0.hintId);
    __advance();
    __textInterpolate(ctx_r0.hint());
  }
}
var nextId = 0;
var TextFieldComponent = (_w = class {
  constructor() {
    this.label = input.required(...[]);
    this.value = input("", ...[]);
    this.placeholder = input("", ...[]);
    this.type = input(null, ...[]);
    this.hint = input("", ...[]);
    this.error = input("", ...[]);
    this.optional = input("", ...[]);
    this.icon = input(null, ...[]);
    this.autocomplete = input("", ...[]);
    this.inputmode = input("", ...[]);
    this.maxlength = input(null, ...[]);
    this.preset = input(null, ...[]);
    this.valueChange = output();
    this.t = inject(LocaleService).t;
    this.eff = computed(() => {
      var _a2, _b2, _c6, _d2, _e2, _f2;
      const p = this.preset() ? FIELD_PRESETS[this.preset()] : null;
      return {
        type: (_b2 = (_a2 = this.type()) != null ? _a2 : p == null ? void 0 : p.type) != null ? _b2 : "text",
        placeholder: this.placeholder() || (p ? this.t()(p.placeholder) : ""),
        icon: (_d2 = (_c6 = this.icon()) != null ? _c6 : p == null ? void 0 : p.icon) != null ? _d2 : null,
        autocomplete: this.autocomplete() || (p == null ? void 0 : p.autocomplete) || "",
        inputmode: this.inputmode() || (p == null ? void 0 : p.inputmode) || "",
        maxlength: (_f2 = (_e2 = this.maxlength()) != null ? _e2 : p == null ? void 0 : p.maxlength) != null ? _f2 : null
      };
    }, ...[]);
    this.uid = nextId++;
    this.inputId = `tf-${this.uid}`;
    this.hintId = `tf-${this.uid}-hint`;
    this.errorId = `tf-${this.uid}-error`;
    this.describedBy = computed(() => this.error() ? this.errorId : this.hint() ? this.hintId : null, ...[]);
    this.field = viewChild("field", ...[]);
  }
  focus() {
    var _a2;
    (_a2 = this.field()) == null ? void 0 : _a2.nativeElement.focus();
  }
}, _w.\u0275fac = function TextFieldComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _w)();
}, _w.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _w,
  selectors: [["ui-text-field"]],
  viewQuery: function TextFieldComponent_Query(rf, ctx) {
    if (rf & 1) __viewQuerySignal(ctx.field, _c0, 5);
    if (rf & 2) __queryAdvance();
  },
  hostAttrs: [1, "block"],
  inputs: {
    label: [1, "label"],
    value: [1, "value"],
    placeholder: [1, "placeholder"],
    type: [1, "type"],
    hint: [1, "hint"],
    error: [1, "error"],
    optional: [1, "optional"],
    icon: [1, "icon"],
    autocomplete: [1, "autocomplete"],
    inputmode: [1, "inputmode"],
    maxlength: [1, "maxlength"],
    preset: [1, "preset"]
  },
  outputs: { valueChange: "valueChange" },
  decls: 9,
  vars: 16,
  consts: [
    ["field", ""],
    [
      1,
      "label",
      3,
      "for"
    ],
    [1, "optional"],
    [1, "box"],
    [
      "aria-hidden",
      "true",
      1,
      "icon"
    ],
    [
      3,
      "input",
      "id",
      "type",
      "placeholder",
      "value"
    ],
    [
      "role",
      "alert",
      1,
      "error",
      3,
      "id"
    ],
    [
      1,
      "hint",
      3,
      "id"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ]
  ],
  template: function TextFieldComponent_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "label", 1);
      __text(1);
      __conditionalCreate(2, TextFieldComponent_Conditional_2_Template, 2, 1, "span", 2);
      __elementEnd();
      __elementStart(3, "div", 3);
      __conditionalCreate(4, TextFieldComponent_Conditional_4_Template, 2, 2, "span", 4);
      __elementStart(5, "input", 5, 0);
      __listener("input", function TextFieldComponent_Template_input_input_5_listener($event) {
        return ctx.valueChange.emit($event.target.value);
      });
      __elementEnd()();
      __conditionalCreate(7, TextFieldComponent_Conditional_7_Template, 3, 3, "p", 6)(8, TextFieldComponent_Conditional_8_Template, 2, 2, "p", 7);
    }
    if (rf & 2) {
      let tmp_4_0;
      __property("for", ctx.inputId);
      __advance();
      __textInterpolate1(" ", ctx.label(), " ");
      __advance();
      __conditional(ctx.optional() ? 2 : -1);
      __advance(2);
      __conditional((tmp_4_0 = ctx.eff().icon) ? 4 : -1, tmp_4_0);
      __advance();
      __classProp("with-icon", !!ctx.eff().icon);
      __property("id", ctx.inputId)("type", ctx.eff().type)("placeholder", ctx.eff().placeholder)("value", ctx.value());
      __attribute("autocomplete", ctx.eff().autocomplete || null)("inputmode", ctx.eff().inputmode || null)("maxlength", ctx.eff().maxlength || null)("aria-invalid", ctx.error() ? true : null)("aria-describedby", ctx.describedBy());
      __advance(2);
      __conditional(ctx.error() ? 7 : ctx.hint() ? 8 : -1);
    }
  },
  dependencies: [IconComponent],
  styles: ['.label[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: baseline;\n      gap: 6px;\n      font-size: 12px;\n      font-weight: 700;\n      letter-spacing: 0.06em;\n      text-transform: uppercase;\n      color: var(--%NS%v2-ardoise);\n    }\n    .optional[_ngcontent-%COMP%] {\n      text-transform: none;\n      letter-spacing: 0;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .box[_ngcontent-%COMP%] {\n      position: relative;\n      margin-top: 8px;\n    }\n    .icon[_ngcontent-%COMP%] {\n      pointer-events: none;\n      position: absolute;\n      inset: 0 auto 0 0;\n      display: grid;\n      width: 48px;\n      place-items: center;\n      color: var(--%NS%v2-gris-texte);\n    }\n    input[_ngcontent-%COMP%] {\n      height: 52px;\n      width: 100%;\n      border-radius: 16px;\n      border: 1.5px solid var(--%NS%v2-gris-trait);\n      background: var(--%NS%v2-blanc);\n      padding: 0 16px;\n      font-size: 15px;\n      font-weight: 600;\n      color: var(--%NS%v2-encre);\n      transition:\n        border-color 0.15s ease,\n        box-shadow 0.15s ease;\n    }\n    input.with-icon[_ngcontent-%COMP%] {\n      padding-left: 48px;\n    }\n    input[_ngcontent-%COMP%]::placeholder {\n      color: var(--%NS%v2-gris-texte);\n      font-weight: 500;\n      opacity: 0.8;\n    }\n    input[_ngcontent-%COMP%]:hover {\n      border-color: var(--%NS%v2-gris-texte);\n    }\n    input[_ngcontent-%COMP%]:focus-visible {\n      outline: none;\n      border: 2px solid var(--%NS%v2-foret);\n      box-shadow: var(--%NS%v2-halo);\n    }\n    input[aria-invalid="true"][_ngcontent-%COMP%] {\n      border: 2px solid var(--%NS%v2-erreur-fg);\n    }\n    .hint[_ngcontent-%COMP%] {\n      margin-top: 6px;\n      font-size: 13px;\n      font-weight: 500;\n      color: var(--%NS%v2-gris-texte);\n    }\n    .error[_ngcontent-%COMP%] {\n      display: flex;\n      align-items: center;\n      gap: 6px;\n      margin-top: 6px;\n      font-size: 13px;\n      font-weight: 700;\n      color: var(--%NS%v2-erreur-fg);\n    }']
}), _w);

export { CollapsibleComponent as C, DefaultValueAccessor as D, FormsModule as F, ModalComponent as M, NgControlStatus as N, PaginationComponent as P, SelectComponent as S, TextFieldComponent as T, UiChartComponent as U, NgModel as a, UiDialogComponent as b, UiPageHeaderComponent as c, UiPillComponent as d, detailFact as e, DetailModalComponent as f, StatCardsComponent as g, NgSelectOption as h, SelectControlValueAccessor as i, UiButtonComponent as j, detailKpi as k, FileSlotsComponent as l, DetailHeroComponent as m, cn as n, UiKpiTileComponent as o, UiEventCalendarComponent as p, CheckListComponent as q, paginate as r, fetchAllPages as s, PhotoSlideshowComponent as t, withPage as w, ɵNgSelectMultipleOption as ɵ };
//# sourceMappingURL=ui-DDO8FoUF.mjs.map
