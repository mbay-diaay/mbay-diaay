import { i as inject, R as Router, A as ActivatedRoute, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, b as __element, H as __listener, g as __text, j as __conditionalCreate, h as __elementEnd, n as __property, o as __advance, z as __classProp, q as __textInterpolate1, s as __conditional, w as __nextContext, p as __textInterpolate, m as __repeaterCreate, v as __repeater, L as __getCurrentView, G as __controlCreate, V as __repeaterTrackByIdentity, u as __attribute, r as __pureFunction1, J as __control, O as __restoreView, P as __resetView, a5 as __classMap, x as __pureFunction2, M as __pureFunction0 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { n as cn, P as PaginationComponent, F as FormsModule, h as NgSelectOption, ɵ as _NgSelectMultipleOption, D as DefaultValueAccessor, i as SelectControlValueAccessor, N as NgControlStatus, a as NgModel, j as UiButtonComponent, c as UiPageHeaderComponent, d as UiPillComponent } from './ui-DDO8FoUF.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { M as MapPin, o as CalendarRange, N as Network, p as UserRound, q as CircleQuestionMark, A as ArrowRight, G as Gauge, r as Sprout, e as LucideAngularModule, f as LucideAngularComponent } from './lucide-angular-RJABeBQ2.mjs';
import { L as LocaleService, j as nf, a2 as CROP_FAMILIES, O as ORG_TYPES, V as VILLAGES, o as actions, a as ageAtMost } from './locale.service-c0QhtcVY.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { c as createPager } from './pager-CsQ8gi_F.mjs';
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
import './snackbar.component-sjBBVJT0.mjs';
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
var _c0 = (a0) => ({ name: a0 });
var _c1 = (a0) => ({ n: a0 });
var _c2 = (a0, a1) => ({
  n: a0,
  total: a1
});
var _c3 = () => ({ vue: "a-qualifier" });
var _forTrack0 = ($index, $item) => $item.name;
var _forTrack1 = ($index, $item) => $item.key;
var _forTrack2 = ($index, $item) => $item.village;
function ReferentielsPage_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 6);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __textInterpolate(ctx_r0.aliases().length);
  }
}
function ReferentielsPage_Conditional_12_For_18_For_6_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "option", 24);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const family_r4 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __property("ngValue", family_r4);
    __advance();
    __textInterpolate(ctx_r0.t()(ctx_r0.FAMILY_LABEL[family_r4]));
  }
}
function ReferentielsPage_Conditional_12_For_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = __getCurrentView();
    __elementStart(0, "tr")(1, "td", 21);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 22)(4, "select", 23);
    __controlCreate();
    __listener("ngModelChange", function ReferentielsPage_Conditional_12_For_18_Template_select_ngModelChange_4_listener($event) {
      const crop_r3 = __restoreView(_r2).$implicit;
      const ctx_r0 = __nextContext(2);
      return __resetView(ctx_r0.onFamilyChange(crop_r3.name, $event));
    });
    __repeaterCreate(5, ReferentielsPage_Conditional_12_For_18_For_6_Template, 2, 2, "option", 24, __repeaterTrackByIdentity);
    __elementEnd()();
    __elementStart(7, "td", 25);
    __text(8);
    __elementEnd();
    __elementStart(9, "td", 26);
    __text(10);
    __elementEnd()();
  }
  if (rf & 2) {
    const crop_r3 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __advance(2);
    __textInterpolate(crop_r3.name);
    __advance(2);
    __property("ngModel", crop_r3.family);
    __attribute("aria-label", ctx_r0.t()("referentiels.cultures.familyOf", __pureFunction1(5, _c0, crop_r3.name)));
    __control();
    __advance();
    __repeater(ctx_r0.cropFamilies);
    __advance(3);
    __textInterpolate1(" ", ctx_r0.nf.format(ctx_r0.producerCountForCrop(crop_r3.name)), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.nf.format(ctx_r0.plotCountForCrop(crop_r3.name)), " ");
  }
}
function ReferentielsPage_Conditional_12_Conditional_24_For_2_For_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "option", 32);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const crop_r7 = ctx.$implicit;
    __property("value", crop_r7.name);
    __advance();
    __textInterpolate(crop_r7.name);
  }
}
function ReferentielsPage_Conditional_12_Conditional_24_For_2_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "li", 27)(1, "span", 28);
    __text(2);
    __elementEnd();
    __element(3, "lucide-angular", 29);
    __elementStart(4, "select", 30);
    __controlCreate();
    __listener("ngModelChange", function ReferentielsPage_Conditional_12_Conditional_24_For_2_Template_select_ngModelChange_4_listener($event) {
      const alias_r6 = __restoreView(_r5).$implicit;
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.setAliasChoice(alias_r6, $event));
    });
    __elementStart(5, "option", 31);
    __text(6);
    __elementEnd();
    __repeaterCreate(7, ReferentielsPage_Conditional_12_Conditional_24_For_2_For_8_Template, 2, 2, "option", 32, _forTrack0);
    __elementEnd();
    __elementStart(9, "ui-button", 33);
    __listener("click", function ReferentielsPage_Conditional_12_Conditional_24_For_2_Template_ui_button_click_9_listener() {
      const alias_r6 = __restoreView(_r5).$implicit;
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.validateAlias(alias_r6));
    });
    __text(10);
    __elementEnd()();
  }
  if (rf & 2) {
    const alias_r6 = ctx.$implicit;
    const ctx_r0 = __nextContext(3);
    __advance(2);
    __textInterpolate1("\xAB ", alias_r6, " \xBB");
    __advance();
    __property("img", ctx_r0.icons.arrowRight);
    __advance();
    __property("ngModel", (_a2 = ctx_r0.aliasChoice()[alias_r6]) != null ? _a2 : "");
    __attribute("aria-label", ctx_r0.t()("referentiels.noms.cropFor", __pureFunction1(7, _c0, alias_r6)));
    __control();
    __advance(2);
    __textInterpolate(ctx_r0.t()("referentiels.noms.choose"));
    __advance();
    __repeater(ctx_r0.cropRefs());
    __advance(2);
    __property("disabled", !ctx_r0.aliasChoice()[alias_r6]);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.noms.validate"), " ");
  }
}
function ReferentielsPage_Conditional_12_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "ul", 17);
    __repeaterCreate(1, ReferentielsPage_Conditional_12_Conditional_24_For_2_Template, 11, 9, "li", 27, __repeaterTrackByIdentity);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __repeater(ctx_r0.aliases());
  }
}
function ReferentielsPage_Conditional_12_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 20);
    __element(1, "lucide-angular", 34);
    __elementStart(2, "div", 35);
    __text(3);
    __elementEnd();
    __elementStart(4, "p", 36);
    __text(5);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(2);
    __advance();
    __property("img", ctx_r0.icons.help);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.noms.empty"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("referentiels.noms.emptyDesc"));
  }
}
function ReferentielsPage_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 7)(1, "section")(2, "p", 9);
    __text(3);
    __elementEnd();
    __elementStart(4, "div", 10)(5, "table", 11)(6, "thead", 12)(7, "tr")(8, "th", 13);
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 14);
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 15);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 16);
    __text(15);
    __elementEnd()()();
    __elementStart(16, "tbody", 17);
    __repeaterCreate(17, ReferentielsPage_Conditional_12_For_18_Template, 11, 7, "tr", null, _forTrack0);
    __elementEnd()()();
    __element(19, "ui-pagination", 18);
    __elementEnd();
    __elementStart(20, "section")(21, "p", 9);
    __text(22);
    __elementEnd();
    __elementStart(23, "div", 19);
    __conditionalCreate(24, ReferentielsPage_Conditional_12_Conditional_24_Template, 3, 0, "ul", 17)(25, ReferentielsPage_Conditional_12_Conditional_25_Template, 6, 3, "div", 20);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance(3);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.cultures.intro"), " ");
    __advance(6);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.cultures.col.crop"), " ");
    __advance(2);
    __textInterpolate(ctx_r0.t()("referentiels.cultures.col.family"));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.cultures.col.producers"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.cultures.col.plots"), " ");
    __advance(2);
    __repeater(ctx_r0.cropPager.items());
    __advance(2);
    __property("pager", ctx_r0.cropPager);
    __advance(3);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.noms.intro"), " ");
    __advance(2);
    __conditional(ctx_r0.aliases().length ? 24 : 25);
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span");
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const rule_r9 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1("", ctx_r0.t()(rule_r9.after), ".");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span");
    __text(1, ".");
    __elementEnd();
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span");
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const rule_r9 = __nextContext().$implicit;
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.currently", __pureFunction1(1, _c1, ctx_r0.nf.format(ctx_r0.ruleSavedCount(rule_r9)))), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "div", 45)(1, "p", 46)(2, "span");
    __text(3);
    __elementEnd();
    __elementStart(4, "input", 47);
    __controlCreate();
    __listener("ngModelChange", function ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Template_input_ngModelChange_4_listener($event) {
      const rule_r9 = __restoreView(_r8).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.setRuleDraft(rule_r9.key, $event));
    });
    __elementEnd();
    __elementStart(5, "span", 48);
    __text(6);
    __elementEnd();
    __conditionalCreate(7, ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Conditional_7_Template, 2, 1, "span")(8, ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Conditional_8_Template, 2, 0, "span");
    __elementEnd();
    __elementStart(9, "div", 49)(10, "span");
    __text(11);
    __conditionalCreate(12, ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Conditional_12_Template, 2, 3, "span");
    __elementEnd();
    __elementStart(13, "ui-button", 33);
    __listener("click", function ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Template_ui_button_click_13_listener() {
      const rule_r9 = __restoreView(_r8).$implicit;
      const ctx_r0 = __nextContext(4);
      return __resetView(ctx_r0.saveRule(rule_r9.key));
    });
    __text(14);
    __elementEnd()()();
  }
  if (rf & 2) {
    const rule_r9 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(3);
    __textInterpolate(ctx_r0.t()(rule_r9.before));
    __advance();
    __property("ngModel", ctx_r0.ruleDraft()[rule_r9.key]);
    __attribute("aria-label", ctx_r0.t()(rule_r9.before) + " (" + rule_r9.unit + ")");
    __control();
    __advance(2);
    __textInterpolate(rule_r9.unit);
    __advance();
    __conditional(rule_r9.after ? 7 : 8);
    __advance(3);
    __classMap(ctx_r0.ruleResultClass(rule_r9));
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.rule.result", __pureFunction1(11, _c1, ctx_r0.nf.format(ctx_r0.ruleDraftCount(rule_r9)))), " ");
    __advance();
    __conditional(ctx_r0.ruleNumberOk(rule_r9) && ctx_r0.ruleDraftNum(rule_r9) !== ctx_r0.seuils()[rule_r9.key] ? 12 : -1);
    __advance();
    __property("disabled", !ctx_r0.canSaveRule(rule_r9));
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.save"), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 43);
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 44);
    __repeaterCreate(3, ReferentielsPage_Conditional_13_For_2_Case_12_For_4_Template, 15, 13, "div", 45, _forTrack1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.regles.intro"), " ");
    __advance(2);
    __repeater(ctx_r0.ruleDefs);
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_13_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span");
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.currently", __pureFunction1(1, _c1, ctx_r0.nf.format(ctx_r0.youthSavedCount()))), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_13_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 53);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.jeune.error"), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = __getCurrentView();
    __elementStart(0, "p", 43);
    __text(1);
    __elementEnd();
    __elementStart(2, "div", 50)(3, "div", 51)(4, "span");
    __text(5);
    __elementEnd();
    __elementStart(6, "input", 52);
    __controlCreate();
    __listener("ngModelChange", function ReferentielsPage_Conditional_13_For_2_Case_13_Template_input_ngModelChange_6_listener($event) {
      __restoreView(_r10);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.youthDraft.set($event));
    });
    __elementEnd();
    __elementStart(7, "span");
    __text(8);
    __elementEnd()();
    __elementStart(9, "div", 49)(10, "span");
    __text(11);
    __conditionalCreate(12, ReferentielsPage_Conditional_13_For_2_Case_13_Conditional_12_Template, 2, 3, "span");
    __elementEnd();
    __elementStart(13, "ui-button", 33);
    __listener("click", function ReferentielsPage_Conditional_13_For_2_Case_13_Template_ui_button_click_13_listener() {
      __restoreView(_r10);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.saveYouth());
    });
    __text(14);
    __elementEnd()();
    __conditionalCreate(15, ReferentielsPage_Conditional_13_For_2_Case_13_Conditional_15_Template, 2, 1, "p", 53);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.jeune.intro"), " ");
    __advance(4);
    __textInterpolate(ctx_r0.t()("referentiels.jeune.before"));
    __advance();
    __property("ngModel", ctx_r0.youthDraft());
    __attribute("aria-label", ctx_r0.t()("referentiels.jeune.aria"));
    __control();
    __advance(2);
    __textInterpolate(ctx_r0.t()("referentiels.jeune.after"));
    __advance(2);
    __classMap(ctx_r0.youthResultClass());
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.jeune.result", __pureFunction2(12, _c2, ctx_r0.nf.format(ctx_r0.youthLiveCount()), ctx_r0.nf.format(ctx_r0.youthTotal()))), " ");
    __advance();
    __conditional(ctx_r0.youthOk() && ctx_r0.youthNum() !== ctx_r0.youthMax() ? 12 : -1);
    __advance();
    __property("disabled", !ctx_r0.canSaveYouth());
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.save"), " ");
    __advance();
    __conditional(!ctx_r0.youthOk() && ctx_r0.youthDraft() ? 15 : -1);
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_14_For_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "li", 54)(1, "ui-pill", 60);
    __text(2);
    __elementEnd();
    __elementStart(3, "span", 57);
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const type_r11 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __textInterpolate(ctx_r0.t()(ctx_r0.ORG_TYPE_LABEL[type_r11]));
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.types.orgCount", __pureFunction1(2, _c1, ctx_r0.nf.format(ctx_r0.orgsByType(type_r11)))), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_14_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 58);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(4);
    __property("queryParams", __pureFunction0(2, _c3));
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.types.qualify"), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 43);
    __text(1);
    __elementEnd();
    __elementStart(2, "section", 50)(3, "ul", 17);
    __repeaterCreate(4, ReferentielsPage_Conditional_13_For_2_Case_14_For_5_Template, 5, 4, "li", 54, __repeaterTrackByIdentity);
    __elementStart(6, "li", 54)(7, "ui-pill", 55);
    __text(8);
    __elementEnd();
    __elementStart(9, "span", 56)(10, "span", 57);
    __text(11);
    __elementEnd();
    __conditionalCreate(12, ReferentielsPage_Conditional_13_For_2_Case_14_Conditional_12_Template, 2, 3, "a", 58);
    __elementEnd()()();
    __elementStart(13, "p", 59);
    __text(14);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.types.intro"), " ");
    __advance(3);
    __repeater(ctx_r0.orgTypes);
    __advance(4);
    __textInterpolate(ctx_r0.t()("referentiels.types.toQualify"));
    __advance(3);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.types.orgCount", __pureFunction1(5, _c1, ctx_r0.nf.format(ctx_r0.orgsMissingType()))), " ");
    __advance();
    __conditional(ctx_r0.orgsMissingType() > 0 ? 12 : -1);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.types.scoops", __pureFunction1(7, _c1, ctx_r0.scoopsCount())), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_15_For_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 64);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 65);
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 66);
    __text(6);
    __elementEnd()();
  }
  if (rf & 2) {
    const campaign_r12 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __textInterpolate(campaign_r12);
    __advance(2);
    __textInterpolate1(" ", ctx_r0.nf.format(ctx_r0.producersInCampaign(campaign_r12)), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.nf.format(ctx_r0.plotsInCampaign(campaign_r12)), " ");
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 43);
    __text(1);
    __elementEnd();
    __elementStart(2, "section", 61)(3, "table", 11)(4, "thead", 12)(5, "tr")(6, "th", 13);
    __text(7);
    __elementEnd();
    __elementStart(8, "th", 62);
    __text(9);
    __elementEnd();
    __elementStart(10, "th", 63);
    __text(11);
    __elementEnd()()();
    __elementStart(12, "tbody", 17);
    __repeaterCreate(13, ReferentielsPage_Conditional_13_For_2_Case_15_For_14_Template, 7, 3, "tr", null, __repeaterTrackByIdentity);
    __elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.campagnes.intro"), " ");
    __advance(6);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.campagnes.col.campaign"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.campagnes.col.producers"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.campagnes.col.plots"), " ");
    __advance(2);
    __repeater(ctx_r0.campaignNames());
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_16_For_20_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "tr")(1, "td", 72);
    __text(2);
    __elementEnd();
    __elementStart(3, "td", 73);
    __text(4);
    __elementEnd();
    __elementStart(5, "td", 65);
    __text(6);
    __elementEnd();
    __elementStart(7, "td", 65);
    __text(8);
    __elementEnd()();
  }
  if (rf & 2) {
    const row_r14 = ctx.$implicit;
    const ctx_r0 = __nextContext(4);
    __advance(2);
    __textInterpolate(row_r14.village);
    __advance(2);
    __textInterpolate(row_r14.commune);
    __advance(2);
    __textInterpolate(ctx_r0.nf.format(row_r14.o));
    __advance(2);
    __textInterpolate(ctx_r0.nf.format(row_r14.n));
  }
}
function ReferentielsPage_Conditional_13_For_2_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "p", 43);
    __text(1);
    __elementEnd();
    __elementStart(2, "section", 50)(3, "div", 67)(4, "h3", 14);
    __text(5);
    __elementEnd();
    __elementStart(6, "input", 68);
    __controlCreate();
    __listener("ngModelChange", function ReferentielsPage_Conditional_13_For_2_Case_16_Template_input_ngModelChange_6_listener($event) {
      __restoreView(_r13);
      const ctx_r0 = __nextContext(3);
      return __resetView(ctx_r0.locQ.set($event));
    });
    __elementEnd()();
    __elementStart(7, "table", 69)(8, "thead", 70)(9, "tr")(10, "th", 71);
    __text(11);
    __elementEnd();
    __elementStart(12, "th", 14);
    __text(13);
    __elementEnd();
    __elementStart(14, "th", 62);
    __text(15);
    __elementEnd();
    __elementStart(16, "th", 62);
    __text(17);
    __elementEnd()()();
    __elementStart(18, "tbody", 17);
    __repeaterCreate(19, ReferentielsPage_Conditional_13_For_2_Case_16_For_20_Template, 9, 4, "tr", null, _forTrack2);
    __elementEnd()();
    __element(21, "ui-pagination", 18);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext(3);
    __advance();
    __textInterpolate1(" ", ctx_r0.t()("referentiels.localites.intro"), " ");
    __advance(4);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.localites.count", __pureFunction1(10, _c1, ctx_r0.localiteRows().length)), " ");
    __advance();
    __property("placeholder", ctx_r0.t()("referentiels.localites.search"))("ngModel", ctx_r0.locQ());
    __attribute("aria-label", ctx_r0.t()("referentiels.localites.search"));
    __control();
    __advance(5);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.localites.col.village"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.localites.col.commune"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.localites.col.orgs"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r0.t()("referentiels.localites.col.producers"), " ");
    __advance(2);
    __repeater(ctx_r0.localitePager.items());
    __advance(2);
    __property("pager", ctx_r0.localitePager);
  }
}
function ReferentielsPage_Conditional_13_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 37)(1, "div", 38)(2, "span", 39);
    __element(3, "lucide-angular", 5);
    __elementEnd();
    __elementStart(4, "div", 40)(5, "h2", 14);
    __text(6);
    __elementEnd();
    __elementStart(7, "p", 41);
    __text(8);
    __elementEnd()()();
    __elementStart(9, "div", 42)(10, "p", 43);
    __text(11);
    __elementEnd();
    __conditionalCreate(12, ReferentielsPage_Conditional_13_For_2_Case_12_Template, 5, 1)(13, ReferentielsPage_Conditional_13_For_2_Case_13_Template, 16, 15)(14, ReferentielsPage_Conditional_13_For_2_Case_14_Template, 15, 9)(15, ReferentielsPage_Conditional_13_For_2_Case_15_Template, 15, 4)(16, ReferentielsPage_Conditional_13_For_2_Case_16_Template, 22, 12);
    __elementEnd()();
  }
  if (rf & 2) {
    let tmp_15_0;
    const block_r15 = ctx.$implicit;
    const ctx_r0 = __nextContext(2);
    __advance(3);
    __property("img", block_r15.icon);
    __advance(3);
    __textInterpolate(block_r15.title);
    __advance(2);
    __textInterpolate(block_r15.summary);
    __advance(3);
    __textInterpolate(ctx_r0.t()(block_r15.purpose));
    __advance();
    __conditional((tmp_15_0 = block_r15.key) === "regles" ? 12 : tmp_15_0 === "jeune" ? 13 : tmp_15_0 === "types" ? 14 : tmp_15_0 === "campagnes" ? 15 : tmp_15_0 === "localites" ? 16 : -1);
  }
}
function ReferentielsPage_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 8);
    __repeaterCreate(1, ReferentielsPage_Conditional_13_For_2_Template, 17, 5, "section", 37, _forTrack1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = __nextContext();
    __advance();
    __repeater(ctx_r0.regleBlocks());
  }
}
var SECTIONS = [
  "cultures",
  "noms",
  "regles",
  "jeune",
  "localites",
  "campagnes",
  "types"
];
var VIEW_OF = {
  cultures: "cultures",
  noms: "cultures",
  regles: "regles",
  jeune: "regles",
  localites: "regles",
  campagnes: "regles",
  types: "regles"
};
var FAMILY_LABEL = {
  Bulbes: "referentiels.family.bulbes",
  Feuilles: "referentiels.family.feuilles",
  "Fruits-l\xE9gumes": "referentiels.family.fruitsLegumes",
  Racines: "referentiels.family.racines",
  "Arbres fruitiers": "referentiels.family.arbresFruitiers",
  "C\xE9r\xE9ales et l\xE9gumineuses": "referentiels.family.cerealesLegumineuses",
  Autres: "referentiels.family.autres"
};
var ORG_TYPE_LABEL = {
  GIE: "referentiels.orgType.gie",
  Section: "referentiels.orgType.section",
  Association: "referentiels.orgType.association",
  Groupement: "referentiels.orgType.groupement",
  Individuel: "referentiels.orgType.individuel",
  "Membre direct": "referentiels.orgType.membreDirect"
};
var RULE_DEFS = [
  {
    key: "gpsPrecisionMax",
    before: "referentiels.rule.gps",
    unit: "m",
    hits: (p, v) => p.gpsPrecision > v
  },
  {
    key: "areaGapPct",
    before: "referentiels.rule.gap",
    after: "referentiels.rule.gap.after",
    unit: "%",
    hits: (p, v) => Math.abs((p.measured - p.declared) / p.declared) * 100 > v
  },
  {
    key: "minAreaM2",
    before: "referentiels.rule.min",
    unit: "m\xB2",
    hits: (p, v) => p.measured * 1e4 < v
  },
  {
    key: "maxAreaHa",
    before: "referentiels.rule.max",
    unit: "ha",
    hits: (p, v) => p.measured > v
  }
];
var ReferentielsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.t = this.locale.t;
    this.nf = nf;
    this.FAMILY_LABEL = FAMILY_LABEL;
    this.ORG_TYPE_LABEL = ORG_TYPE_LABEL;
    this.cropFamilies = CROP_FAMILIES;
    this.orgTypes = ORG_TYPES;
    this.ruleDefs = RULE_DEFS;
    this.icons = {
      sprout: Sprout,
      gauge: Gauge,
      arrowRight: ArrowRight,
      help: CircleQuestionMark,
      user: UserRound,
      network: Network,
      calendar: CalendarRange,
      map: MapPin
    };
    this.router = inject(Router);
    this.route = inject(ActivatedRoute);
    this.sectionParam = toSignal(this.route.queryParamMap.pipe(map((m) => {
      const s2 = m.get("section");
      return SECTIONS.includes(s2) ? s2 : null;
    })), { initialValue: null });
    this.aliasChoice = signal({}, ...[]);
    this.ruleDraft = signal({}, ...[]);
    this.youthDraft = signal("", ...[]);
    this.locQ = signal("", ...[]);
    this.mainView = computed(() => {
      const sec = this.sectionParam();
      if (sec) return VIEW_OF[sec];
      return "cultures";
    }, ...[]);
    this.cropRefs = computed(() => this.store.state().cropRefs, ...[]);
    this.aliases = computed(() => this.store.state().cropAliases, ...[]);
    this.seuils = computed(() => this.store.state().seuils, ...[]);
    this.plots = computed(() => this.store.state().plots, ...[]);
    this.producers = computed(() => this.store.state().producers, ...[]);
    this.youthMax = computed(() => this.store.state().youthMaxAge, ...[]);
    this.scoopsCount = computed(() => this.store.state().scoops.length, ...[]);
    this.campaignNames = computed(() => [...new Set(this.store.state().campaigns.map((c) => c.name))], ...[]);
    this.localiteRows = computed(() => {
      const scoops = this.store.state().scoops;
      const producers = this.producers();
      const orgs = this.store.state().orgs;
      const q = this.locQ().trim().toLowerCase();
      return VILLAGES.filter((v) => v.toLowerCase().includes(q)).map((v) => {
        var _a2, _b;
        return {
          village: v,
          commune: (_b = (_a2 = scoops.find((s2) => s2.commune === v)) == null ? void 0 : _a2.commune) != null ? _b : v,
          n: producers.filter((p) => p.village === v && !p.mergedInto).length,
          o: orgs.filter((o) => o.village === v).length
        };
      });
    }, ...[]);
    this.regleBlocks = computed(() => {
      const t = this.t();
      const s2 = this.store.state();
      const youth = s2.youthMaxAge;
      const orgs = s2.orgs;
      const missing = orgs.filter((o) => !o.type).length;
      return [
        {
          key: "regles",
          title: t("referentiels.regles.title"),
          summary: t("referentiels.regles.summary"),
          purpose: "referentiels.purpose.regles",
          icon: Gauge
        },
        {
          key: "jeune",
          title: t("referentiels.jeune.title"),
          summary: t("referentiels.jeune.summary", { n: youth }),
          purpose: "referentiels.purpose.jeune",
          icon: UserRound
        },
        {
          key: "types",
          title: t("referentiels.types.title"),
          summary: orgs.some((o) => !o.type) ? t("referentiels.types.summaryMissing", {
            n: ORG_TYPES.length,
            m: missing
          }) : t("referentiels.types.summary", { n: ORG_TYPES.length }),
          purpose: "referentiels.purpose.types",
          icon: Network
        },
        {
          key: "campagnes",
          title: t("referentiels.campagnes.title"),
          summary: t("referentiels.campagnes.summary", { n: s2.campaigns.length }),
          purpose: "referentiels.purpose.campagnes",
          icon: CalendarRange
        },
        {
          key: "localites",
          title: t("referentiels.localites.title"),
          summary: t("referentiels.localites.summary", { n: VILLAGES.length }),
          purpose: "referentiels.purpose.localites",
          icon: MapPin
        }
      ];
    }, ...[]);
    this.cropPager = createPager(() => this.cropRefs());
    this.localitePager = createPager(() => this.localiteRows());
    const s = this.store.state();
    const draft = {};
    for (const r of RULE_DEFS) draft[r.key] = String(s.seuils[r.key]);
    this.ruleDraft.set(draft);
    this.youthDraft.set(String(s.youthMaxAge));
  }
  goMain(v) {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { section: v === "regles" ? "regles" : null },
      queryParamsHandling: "merge",
      replaceUrl: true
    });
  }
  producerCountForCrop(name) {
    return this.producers().filter((p) => p.crops.some((c) => c.crop === name)).length;
  }
  plotCountForCrop(name) {
    return this.plots().filter((p) => p.crop === name).length;
  }
  onFamilyChange(crop, family) {
    actions.setCropFamily(crop, family);
  }
  setAliasChoice(alias, crop) {
    this.aliasChoice.update((m) => ({
      ...m,
      [alias]: crop
    }));
  }
  validateAlias(alias) {
    const crop = this.aliasChoice()[alias];
    if (!crop) return;
    actions.attachAlias(alias, crop);
    this.aliasChoice.update((m) => {
      const n = { ...m };
      delete n[alias];
      return n;
    });
  }
  setRuleDraft(key, val) {
    this.ruleDraft.update((d) => ({
      ...d,
      [key]: val
    }));
  }
  ruleDraftNum(rule) {
    return Number(this.ruleDraft()[rule.key].replace(",", "."));
  }
  ruleNumberOk(rule) {
    const n = this.ruleDraftNum(rule);
    return Number.isFinite(n) && n > 0;
  }
  ruleHits(rule, value) {
    return this.plots().filter((p) => rule.hits(p, value)).length;
  }
  ruleDraftCount(rule) {
    return this.ruleNumberOk(rule) ? this.ruleHits(rule, this.ruleDraftNum(rule)) : this.ruleSavedCount(rule);
  }
  ruleSavedCount(rule) {
    return this.ruleHits(rule, this.seuils()[rule.key]);
  }
  ruleResultClass(rule) {
    const n = this.ruleDraftNum(rule);
    const saved = this.seuils()[rule.key];
    return cn("text-sm", this.ruleNumberOk(rule) && n !== saved ? "font-medium text-warning-fg" : "text-muted-foreground");
  }
  canSaveRule(rule) {
    const n = this.ruleDraftNum(rule);
    return this.ruleNumberOk(rule) && n !== this.seuils()[rule.key];
  }
  saveRule(key) {
    const n = Number(this.ruleDraft()[key].replace(",", "."));
    if (!Number.isFinite(n) || n <= 0) return;
    actions.setSeuil(key, n);
  }
  youthNum() {
    return Number(this.youthDraft());
  }
  youthOk() {
    const v = this.youthDraft();
    return /^\d{2}$/.test(v) && this.youthNum() >= 18 && this.youthNum() <= 60;
  }
  youthTotal() {
    return this.producers().filter((p) => !p.mergedInto).length;
  }
  youthCount(max) {
    return this.producers().filter((p) => !p.mergedInto && ageAtMost(p.age, max)).length;
  }
  youthLiveCount() {
    return this.youthOk() ? this.youthCount(this.youthNum()) : this.youthCount(this.youthMax());
  }
  youthSavedCount() {
    return this.youthCount(this.youthMax());
  }
  youthResultClass() {
    return cn("text-sm", this.youthOk() && this.youthNum() !== this.youthMax() ? "font-medium text-warning-fg" : "text-muted-foreground");
  }
  canSaveYouth() {
    return this.youthOk() && this.youthNum() !== this.youthMax();
  }
  saveYouth() {
    if (!this.canSaveYouth()) return;
    actions.setYouthMaxAge(this.youthNum());
  }
  orgsByType(type) {
    return this.store.state().orgs.filter((o) => o.type === type).length;
  }
  orgsMissingType() {
    return this.store.state().orgs.filter((o) => !o.type).length;
  }
  producersInCampaign(name) {
    return this.producers().filter((p) => p.crops.some((x) => x.campaign === name)).length;
  }
  plotsInCampaign(name) {
    return this.plots().filter((p) => p.campaign === name).length;
  }
}, _a.\u0275fac = function ReferentielsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-referentiels-page"]],
  decls: 14,
  vars: 18,
  consts: [
    [
      "perm",
      "config.manage",
      3,
      "area"
    ],
    [
      3,
      "eyebrow",
      "title",
      "description"
    ],
    [
      1,
      "mb-4",
      "flex",
      "flex-wrap",
      "gap-2"
    ],
    [
      "type",
      "button",
      1,
      "rounded-md",
      "border",
      "px-3",
      "py-2",
      "text-sm",
      "font-medium",
      3,
      "click"
    ],
    [
      1,
      "inline-flex",
      "items-center",
      "gap-2"
    ],
    [
      1,
      "size-4",
      3,
      "img"
    ],
    [
      1,
      "rounded-full",
      "bg-primary",
      "px-1.5",
      "text-[11px]",
      "text-primary-foreground"
    ],
    [
      1,
      "grid",
      "items-start",
      "gap-6",
      "xl:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]"
    ],
    [
      1,
      "mx-auto",
      "max-w-4xl",
      "space-y-6"
    ],
    [
      1,
      "mb-3",
      "max-w-3xl",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "overflow-x-auto",
      "rounded-md",
      "border"
    ],
    [
      1,
      "w-full",
      "text-sm"
    ],
    [
      1,
      "border-b",
      "bg-muted",
      "text-left",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "py-3",
      "font-semibold"
    ],
    [1, "font-semibold"],
    [
      1,
      "hidden",
      "text-right",
      "font-semibold",
      "sm:table-cell"
    ],
    [
      1,
      "hidden",
      "pr-4",
      "text-right",
      "font-semibold",
      "sm:table-cell"
    ],
    [1, "divide-y"],
    [
      1,
      "px-4",
      "pb-4",
      3,
      "pager"
    ],
    [
      1,
      "rounded-md",
      "border",
      "p-2"
    ],
    [
      1,
      "px-4",
      "py-10",
      "text-center",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "py-2",
      "font-medium"
    ],
    [
      1,
      "pr-4",
      "sm:pr-0"
    ],
    [
      1,
      "flex",
      "h-9",
      "w-full",
      "min-w-40",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-2",
      "text-sm",
      "sm:w-56",
      3,
      "ngModelChange",
      "ngModel"
    ],
    [3, "ngValue"],
    [
      1,
      "hidden",
      "text-right",
      "tabular",
      "text-muted-foreground",
      "sm:table-cell"
    ],
    [
      1,
      "hidden",
      "pr-4",
      "text-right",
      "tabular",
      "text-muted-foreground",
      "sm:table-cell"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-3",
      "px-3",
      "py-3"
    ],
    [
      1,
      "w-40",
      "font-medium"
    ],
    [
      1,
      "size-4",
      "text-muted-foreground",
      3,
      "img"
    ],
    [
      1,
      "h-9",
      "w-56",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-2",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel"
    ],
    ["value", ""],
    [3, "value"],
    [
      "size",
      "sm",
      1,
      "h-9",
      3,
      "click",
      "disabled"
    ],
    [
      1,
      "mx-auto",
      "mb-2",
      "size-10",
      "opacity-50",
      3,
      "img"
    ],
    [
      1,
      "font-semibold",
      "text-foreground"
    ],
    [
      1,
      "mt-1",
      "text-sm"
    ],
    [
      1,
      "surface",
      "overflow-hidden"
    ],
    [
      1,
      "flex",
      "items-start",
      "gap-3",
      "border-b",
      "bg-muted/30",
      "px-4",
      "py-3"
    ],
    [
      1,
      "grid",
      "size-9",
      "shrink-0",
      "place-items-center",
      "rounded-md",
      "bg-primary-soft",
      "text-primary"
    ],
    [1, "min-w-0"],
    [
      1,
      "truncate",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "px-4",
      "pb-4",
      "pt-3"
    ],
    [
      1,
      "mb-3",
      "text-sm",
      "text-muted-foreground"
    ],
    [
      1,
      "max-w-3xl",
      "space-y-3"
    ],
    [
      1,
      "rounded-md",
      "border",
      "p-3",
      "sm:p-4"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-x-1.5",
      "gap-y-2",
      "text-sm",
      "leading-snug"
    ],
    [
      "inputmode",
      "decimal",
      1,
      "h-9",
      "w-24",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-2",
      "tabular",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel"
    ],
    [1, "font-medium"],
    [
      1,
      "mt-3",
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-2"
    ],
    [
      1,
      "rounded-md",
      "border",
      "p-5"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "gap-2",
      "text-sm"
    ],
    [
      "inputmode",
      "numeric",
      1,
      "h-9",
      "w-20",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-2",
      "tabular",
      "text-sm",
      3,
      "ngModelChange",
      "ngModel"
    ],
    [
      1,
      "mt-2",
      "text-xs",
      "text-danger-fg"
    ],
    [
      1,
      "flex",
      "items-center",
      "justify-between",
      "py-2.5",
      "text-sm"
    ],
    ["tone", "warning"],
    [
      1,
      "flex",
      "items-center",
      "gap-3"
    ],
    [
      1,
      "tabular",
      "text-muted-foreground"
    ],
    [
      "routerLink",
      "/dashboard/organisations",
      1,
      "text-xs",
      "font-semibold",
      "text-primary",
      "hover:underline",
      3,
      "queryParams"
    ],
    [
      1,
      "mt-4",
      "text-xs",
      "text-muted-foreground"
    ],
    ["tone", "brand"],
    [
      1,
      "surface",
      "max-w-3xl",
      "overflow-x-auto"
    ],
    [
      1,
      "text-right",
      "font-semibold"
    ],
    [
      1,
      "pr-4",
      "text-right",
      "font-semibold"
    ],
    [
      1,
      "px-4",
      "py-2.5",
      "font-medium"
    ],
    [
      1,
      "text-right",
      "tabular"
    ],
    [
      1,
      "pr-4",
      "text-right",
      "tabular"
    ],
    [
      1,
      "flex",
      "flex-wrap",
      "items-center",
      "justify-between",
      "gap-3"
    ],
    [
      1,
      "w-56",
      "rounded-md",
      "border",
      "border-input",
      "bg-background",
      "px-3",
      "py-1.5",
      "text-sm",
      3,
      "ngModelChange",
      "placeholder",
      "ngModel"
    ],
    [
      1,
      "mt-4",
      "w-full",
      "text-sm"
    ],
    [
      1,
      "text-left",
      "text-xs",
      "text-muted-foreground"
    ],
    [
      1,
      "py-2",
      "font-semibold"
    ],
    [
      1,
      "py-2",
      "font-medium"
    ],
    [1, "text-muted-foreground"]
  ],
  template: function ReferentielsPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0);
      __element(1, "ui-page-header", 1);
      __elementStart(2, "div", 2)(3, "button", 3);
      __listener("click", function ReferentielsPage_Template_button_click_3_listener() {
        return ctx.goMain("cultures");
      });
      __elementStart(4, "span", 4);
      __element(5, "lucide-angular", 5);
      __text(6);
      __conditionalCreate(7, ReferentielsPage_Conditional_7_Template, 2, 1, "span", 6);
      __elementEnd()();
      __elementStart(8, "button", 3);
      __listener("click", function ReferentielsPage_Template_button_click_8_listener() {
        return ctx.goMain("regles");
      });
      __elementStart(9, "span", 4);
      __element(10, "lucide-angular", 5);
      __text(11);
      __elementEnd()()();
      __conditionalCreate(12, ReferentielsPage_Conditional_12_Template, 26, 8, "div", 7)(13, ReferentielsPage_Conditional_13_Template, 3, 0, "div", 8);
      __elementEnd();
    }
    if (rf & 2) {
      __property("area", ctx.t()("referentiels.area"));
      __advance();
      __property("eyebrow", ctx.t()("referentiels.eyebrow"))("title", ctx.t()("referentiels.title"))("description", ctx.t()("referentiels.description"));
      __advance(2);
      __classProp("border-primary", ctx.mainView() === "cultures")("bg-primary-soft", ctx.mainView() === "cultures");
      __advance(2);
      __property("img", ctx.icons.sprout);
      __advance();
      __textInterpolate1(" ", ctx.t()("referentiels.view.cultures"), " ");
      __advance();
      __conditional(ctx.aliases().length ? 7 : -1);
      __advance();
      __classProp("border-primary", ctx.mainView() === "regles")("bg-primary-soft", ctx.mainView() === "regles");
      __advance(2);
      __property("img", ctx.icons.gauge);
      __advance();
      __textInterpolate1(" ", ctx.t()("referentiels.view.regles"), " ");
      __advance();
      __conditional(ctx.mainView() === "cultures" ? 12 : 13);
    }
  },
  dependencies: [
    PaginationComponent,
    FormsModule,
    NgSelectOption,
    _NgSelectMultipleOption,
    DefaultValueAccessor,
    SelectControlValueAccessor,
    NgControlStatus,
    NgModel,
    RouterLink,
    LucideAngularModule,
    LucideAngularComponent,
    AppShellComponent,
    UiButtonComponent,
    UiPageHeaderComponent,
    UiPillComponent
  ],
  encapsulation: 2
}), _a);

export { ReferentielsPage as default };
//# sourceMappingURL=referentiels.page-CDw122B9.mjs.map
