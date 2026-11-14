import { i as inject, A as ActivatedRoute, F as signal, c as computed, ɵ as __defineComponent, d as RouterLink, f as __elementStart, g as __text, h as __elementEnd, j as __conditionalCreate, b as __element, H as __listener, m as __repeaterCreate, n as __property, o as __advance, p as __textInterpolate, q as __textInterpolate1, s as __conditional, u as __attribute, z as __classProp, v as __repeater, r as __pureFunction1, V as __repeaterTrackByIdentity, L as __getCurrentView, w as __nextContext, N as __textInterpolate2, O as __restoreView, P as __resetView, t as __styleProp, T as __textInterpolate3, x as __pureFunction2 } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { S as SnackbarService, I as IconComponent } from './snackbar.component-sjBBVJT0.mjs';
import { t as toSignal } from './rxjs-interop-wN9yU0Tj.mjs';
import { L as LocaleService, h as fmtDate, y as LIBRARY_KINDS, z as scopedLibrary, j as nf, i as inScope, n as nf1, o as actions } from './locale.service-c0QhtcVY.mjs';
import { K as KIND_KEY } from './dossier-labels-BFr3d5AP.mjs';
import { A as AppShellComponent } from './app-shell.component-CFzK6QAu.mjs';
import { G as GlobalFiltersComponent } from './global-filters.component-ncvklAvP.mjs';
import { T as TONE } from './v2-page.styles-DN_FuKKd.mjs';
import { S as StoreService } from './store.service-C18USU1m.mjs';
import { e as detailFact, f as DetailModalComponent, l as FileSlotsComponent, M as ModalComponent, S as SelectComponent, g as StatCardsComponent } from './ui-DDO8FoUF.mjs';
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
import 'clsx';
import 'tailwind-merge';
import 'date-fns';
import 'date-fns/locale';

var _a;
var _c0 = (a0) => ({ mb: a0 });
var _c1 = (a0) => ({ count: a0 });
var _c2 = (a0) => ({ date: a0 });
var _c3 = (a0, a1) => ({
  name: a0,
  date: a1
});
var _c4 = (a0) => ({ name: a0 });
var _c5 = (a0) => ["/dashboard/reunions", a0];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.kind;
function DocumentsPage_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = __getCurrentView();
    __elementStart(0, "button", 36);
    __listener("click", function DocumentsPage_Conditional_9_Template_button_click_0_listener() {
      __restoreView(_r1);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.openAdd());
    });
    __text(1);
    __elementStart(2, "span", 33);
    __element(3, "ui-icon", 37);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("documents.add"), " ");
    __advance(2);
    __property("size", 20);
  }
}
function DocumentsPage_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = __getCurrentView();
    __elementStart(0, "button", 13);
    __listener("click", function DocumentsPage_For_22_Template_button_click_0_listener() {
      const libraryKind_r4 = __restoreView(_r3).$implicit;
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.kind.set(libraryKind_r4));
    });
    __text(1);
    __elementStart(2, "span", 14);
    __text(3);
    __elementEnd()();
  }
  if (rf & 2) {
    const libraryKind_r4 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.kind() === libraryKind_r4);
    __attribute("aria-checked", ctx_r1.kind() === libraryKind_r4);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.GROUP_KEY[libraryKind_r4]));
    __advance();
    __classProp("zero", !ctx_r1.countKind(libraryKind_r4));
    __advance();
    __textInterpolate(ctx_r1.countKind(libraryKind_r4));
  }
}
function DocumentsPage_Conditional_23_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 40);
    __text(1);
    __elementEnd();
    __elementStart(2, "p", 41);
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("documents.empty.title"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.canUpload() ? ctx_r1.t()("documents.empty.manage") : ctx_r1.t()("documents.empty.read"), " ");
  }
}
function DocumentsPage_Conditional_23_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = __getCurrentView();
    __elementStart(0, "p", 40);
    __text(1);
    __elementEnd();
    __elementStart(2, "button", 42);
    __listener("click", function DocumentsPage_Conditional_23_Conditional_4_Template_button_click_2_listener() {
      __restoreView(_r5);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.resetFilters());
    });
    __text(3);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("documents.empty.filtered"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("documents.empty.reset"), " ");
  }
}
function DocumentsPage_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 16)(1, "span", 38);
    __element(2, "ui-icon", 39);
    __elementEnd();
    __conditionalCreate(3, DocumentsPage_Conditional_23_Conditional_3_Template, 4, 2)(4, DocumentsPage_Conditional_23_Conditional_4_Template, 4, 2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("name", ctx_r1.mine().length ? "search" : "folder_open")("size", 26);
    __advance();
    __conditional(ctx_r1.mine().length === 0 ? 3 : 4);
  }
}
function DocumentsPage_Conditional_24_For_2_For_10_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 56);
    __element(1, "ui-icon", 64);
    __text(2);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __property("title", ctx_r1.t()("documents.sensitive.title"));
    __advance();
    __property("size", 13);
    __advance();
    __textInterpolate1("", ctx_r1.t()("documents.sensitive.pill"), " ");
  }
}
function DocumentsPage_Conditional_24_For_2_For_10_Conditional_12_Template(rf, ctx) {
  if (rf & 1) __text(0);
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __textInterpolate1(" \xB7 ", ctx_r1.t()("documents.linkedTo", __pureFunction1(1, _c4, ctx)), " ");
  }
}
function DocumentsPage_Conditional_24_For_2_For_10_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "a", 59);
    __element(1, "ui-icon", 65);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(4);
    __property("routerLink", __pureFunction1(4, _c5, ctx.id))("title", ctx_r1.t()("documents.actions.meeting"));
    __attribute("aria-label", ctx_r1.t()("documents.actions.meeting"));
    __advance();
    __property("size", 18);
  }
}
function DocumentsPage_Conditional_24_For_2_For_10_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = __getCurrentView();
    __elementStart(0, "button", 62);
    __listener("click", function DocumentsPage_Conditional_24_For_2_For_10_Conditional_15_Template_button_click_0_listener() {
      __restoreView(_r8);
      const doc_r7 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.download(doc_r7));
    });
    __element(1, "ui-icon", 66);
    __elementEnd();
  }
  if (rf & 2) {
    const doc_r7 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("documents.actions.download"));
    __attribute("aria-label", ctx_r1.t()("documents.actions.download") + " : " + doc_r7.name);
    __advance();
    __property("size", 18);
  }
}
function DocumentsPage_Conditional_24_For_2_For_10_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = __getCurrentView();
    __elementStart(0, "button", 67);
    __listener("click", function DocumentsPage_Conditional_24_For_2_For_10_Conditional_16_Template_button_click_0_listener() {
      __restoreView(_r9);
      const doc_r7 = __nextContext().$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.removeId.set(doc_r7.id));
    });
    __element(1, "ui-icon", 68);
    __elementEnd();
  }
  if (rf & 2) {
    const doc_r7 = __nextContext().$implicit;
    const ctx_r1 = __nextContext(3);
    __property("title", ctx_r1.t()("documents.actions.remove"));
    __attribute("aria-label", ctx_r1.t()("documents.actions.remove") + " : " + doc_r7.name);
    __advance();
    __property("size", 18);
  }
}
function DocumentsPage_Conditional_24_For_2_For_10_Template(rf, ctx) {
  var _a2, _b, _c;
  if (rf & 1) {
    const _r6 = __getCurrentView();
    __elementStart(0, "li", 49);
    __listener("click", function DocumentsPage_Conditional_24_For_2_For_10_Template_li_click_0_listener() {
      const doc_r7 = __restoreView(_r6).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.detailId.set(doc_r7.id));
    });
    __elementStart(1, "span", 50);
    __element(2, "ui-icon", 51);
    __elementEnd();
    __elementStart(3, "span", 52)(4, "span", 53)(5, "span", 54);
    __text(6);
    __elementEnd();
    __elementStart(7, "span", 55);
    __text(8);
    __elementEnd();
    __conditionalCreate(9, DocumentsPage_Conditional_24_For_2_For_10_Conditional_9_Template, 3, 3, "span", 56);
    __elementEnd();
    __elementStart(10, "span", 57);
    __text(11);
    __conditionalCreate(12, DocumentsPage_Conditional_24_For_2_For_10_Conditional_12_Template, 1, 3);
    __elementEnd()();
    __elementStart(13, "span", 58);
    __listener("click", function DocumentsPage_Conditional_24_For_2_For_10_Template_span_click_13_listener($event) {
      return $event.stopPropagation();
    });
    __conditionalCreate(14, DocumentsPage_Conditional_24_For_2_For_10_Conditional_14_Template, 2, 6, "a", 59);
    __conditionalCreate(15, DocumentsPage_Conditional_24_For_2_For_10_Conditional_15_Template, 2, 3, "button", 60);
    __conditionalCreate(16, DocumentsPage_Conditional_24_For_2_For_10_Conditional_16_Template, 2, 3, "button", 61);
    __elementStart(17, "button", 62);
    __listener("click", function DocumentsPage_Conditional_24_For_2_For_10_Template_button_click_17_listener() {
      const doc_r7 = __restoreView(_r6).$implicit;
      const ctx_r1 = __nextContext(3);
      return __resetView(ctx_r1.detailId.set(doc_r7.id));
    });
    __element(18, "ui-icon", 63);
    __elementEnd()()();
  }
  if (rf & 2) {
    let tmp_34_0;
    let tmp_35_0;
    const doc_r7 = ctx.$implicit;
    const ctx_r1 = __nextContext(3);
    const isReplaced_r10 = ((_a2 = doc_r7.lifecycle) != null ? _a2 : "en vigueur") === "remplac\xE9";
    __classProp("old", isReplaced_r10);
    __advance();
    __styleProp("background", isReplaced_r10 ? "var(--v2-lin)" : ctx_r1.styleOf(doc_r7.kind).bg)("color", isReplaced_r10 ? "var(--v2-gris-texte)" : ctx_r1.styleOf(doc_r7.kind).fg);
    __advance();
    __property("size", 18);
    __advance(3);
    __styleProp("color", isReplaced_r10 ? "var(--v2-gris-texte)" : null);
    __property("title", doc_r7.name);
    __advance();
    __textInterpolate(doc_r7.name);
    __advance();
    __styleProp("background", isReplaced_r10 ? "var(--v2-lin)" : "var(--v2-sauge)")("color", isReplaced_r10 ? "var(--v2-gris-texte)" : "var(--v2-vert-pousse)");
    __advance();
    __textInterpolate2(" ", isReplaced_r10 ? ctx_r1.t()("documents.version.replaced") : ctx_r1.t()("documents.version.current"), " \xB7 v", (_b = doc_r7.version) != null ? _b : 1, " ");
    __advance();
    __conditional(doc_r7.sensitive ? 9 : -1);
    __advance(2);
    __textInterpolate3(" ", ctx_r1.formatSize(doc_r7.sizeKb), " \xB7 ", ctx_r1.t()("documents.version.effect", __pureFunction1(28, _c2, ctx_r1.fmtDate((_c = doc_r7.effectiveAt) != null ? _c : doc_r7.uploadedAt))), " \xB7 ", ctx_r1.t()("documents.addedBy", __pureFunction2(30, _c3, doc_r7.uploadedBy, ctx_r1.fmtDate(doc_r7.uploadedAt))), " ");
    __advance();
    __conditional((tmp_34_0 = ctx_r1.linkName(doc_r7)) ? 12 : -1, tmp_34_0);
    __advance(2);
    __conditional((tmp_35_0 = ctx_r1.meetingOf(doc_r7)) ? 14 : -1, tmp_35_0);
    __advance();
    __conditional(ctx_r1.canDownload() ? 15 : -1);
    __advance();
    __conditional(ctx_r1.canManage() ? 16 : -1);
    __advance();
    __property("title", ctx_r1.t()("common.view"));
    __attribute("aria-label", ctx_r1.t()("documents.row.view", __pureFunction1(33, _c4, doc_r7.name)));
    __advance();
    __property("size", 18);
  }
}
function DocumentsPage_Conditional_24_For_2_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "section", 43)(1, "div", 44)(2, "span", 45);
    __element(3, "ui-icon", 39);
    __elementEnd();
    __elementStart(4, "h2", 46);
    __text(5);
    __elementEnd();
    __elementStart(6, "span", 47);
    __text(7);
    __elementEnd()();
    __elementStart(8, "ul");
    __repeaterCreate(9, DocumentsPage_Conditional_24_For_2_For_10_Template, 19, 35, "li", 48, _forTrack0);
    __elementEnd()();
  }
  if (rf & 2) {
    const group_r11 = ctx.$implicit;
    const ctx_r1 = __nextContext(2);
    __attribute("aria-labelledby", "group-" + group_r11.kind);
    __advance(2);
    __styleProp("background", ctx_r1.kindStyle[group_r11.kind].bg)("color", ctx_r1.kindStyle[group_r11.kind].fg);
    __advance();
    __property("name", ctx_r1.kindStyle[group_r11.kind].icon)("size", 20);
    __advance();
    __property("id", "group-" + group_r11.kind);
    __advance();
    __textInterpolate1(" ", ctx_r1.t()(ctx_r1.GROUP_KEY[group_r11.kind]), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()(group_r11.docs.length > 1 ? "documents.group.count.autre" : "documents.group.count.un", __pureFunction1(10, _c1, group_r11.docs.length)), " ");
    __advance(2);
    __repeater(group_r11.docs);
  }
}
function DocumentsPage_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 17);
    __repeaterCreate(1, DocumentsPage_Conditional_24_For_2_Template, 11, 12, "section", 43, _forTrack1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __repeater(ctx_r1.groups());
  }
}
function DocumentsPage_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = __getCurrentView();
    __elementStart(0, "div")(1, "p", 22);
    __text(2);
    __elementEnd();
    __elementStart(3, "ui-select", 69);
    __listener("valueChange", function DocumentsPage_Conditional_29_Template_ui_select_valueChange_3_listener($event) {
      __restoreView(_r12);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.addScoop.set($event));
    });
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __textInterpolate(ctx_r1.t()("documents.add.scoop"));
    __advance();
    __property("label", ctx_r1.t()("documents.add.scoop"))("options", ctx_r1.addScoops())("value", ctx_r1.addScoop());
  }
}
function DocumentsPage_For_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = __getCurrentView();
    __elementStart(0, "button", 13);
    __listener("click", function DocumentsPage_For_39_Template_button_click_0_listener() {
      const option_r14 = __restoreView(_r13).$implicit;
      const ctx_r1 = __nextContext();
      ctx_r1.addLinkType.set(option_r14.id);
      return __resetView(ctx_r1.addLinkId.set(""));
    });
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const option_r14 = ctx.$implicit;
    const ctx_r1 = __nextContext();
    __classProp("on", ctx_r1.addLinkType() === option_r14.id);
    __attribute("aria-checked", ctx_r1.addLinkType() === option_r14.id);
    __advance();
    __textInterpolate(ctx_r1.t()(option_r14.label));
  }
}
function DocumentsPage_Conditional_40_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = __getCurrentView();
    __elementStart(0, "ui-select", 72);
    __listener("valueChange", function DocumentsPage_Conditional_40_Conditional_0_Template_ui_select_valueChange_0_listener($event) {
      __restoreView(_r15);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.addLinkId.set($event));
    });
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __property("label", ctx_r1.t()("documents.add.link.target"))("options", ctx_r1.linkOptions())("value", ctx_r1.addLinkId());
  }
}
function DocumentsPage_Conditional_40_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 71);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("documents.add.link.none"));
  }
}
function DocumentsPage_Conditional_40_Template(rf, ctx) {
  if (rf & 1) __conditionalCreate(0, DocumentsPage_Conditional_40_Conditional_0_Template, 1, 3, "ui-select", 70)(1, DocumentsPage_Conditional_40_Conditional_1_Template, 2, 1, "p", 71);
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __conditional(ctx_r1.linkOptions().length ? 0 : 1);
  }
}
function DocumentsPage_Conditional_42_Conditional_4_Template(rf, ctx) {
  var _a2;
  if (rf & 1) {
    const _r16 = __getCurrentView();
    __elementStart(0, "div", 74)(1, "button", 13);
    __listener("click", function DocumentsPage_Conditional_42_Conditional_4_Template_button_click_1_listener() {
      __restoreView(_r16);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.replace.set(true));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 13);
    __listener("click", function DocumentsPage_Conditional_42_Conditional_4_Template_button_click_3_listener() {
      __restoreView(_r16);
      const ctx_r1 = __nextContext(2);
      return __resetView(ctx_r1.replace.set(false));
    });
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const duplicateDoc_r17 = __nextContext();
    const ctx_r1 = __nextContext();
    __advance();
    __classProp("on", ctx_r1.replace());
    __attribute("aria-checked", ctx_r1.replace());
    __advance();
    __textInterpolate2(" ", ctx_r1.t()("documents.add.replaceVersion"), " (v", ((_a2 = duplicateDoc_r17.version) != null ? _a2 : 1) + 1, ") ");
    __advance();
    __classProp("on", !ctx_r1.replace());
    __attribute("aria-checked", !ctx_r1.replace());
    __advance();
    __textInterpolate1(" ", ctx_r1.t()("documents.add.newName"), " ");
  }
}
function DocumentsPage_Conditional_42_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "p", 75);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext(2);
    __advance();
    __textInterpolate(ctx_r1.t()("documents.add.keepBothOnly"));
  }
}
function DocumentsPage_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "div", 26)(1, "p", 73);
    __element(2, "ui-icon", 64);
    __text(3);
    __elementEnd();
    __conditionalCreate(4, DocumentsPage_Conditional_42_Conditional_4_Template, 5, 9, "div", 74)(5, DocumentsPage_Conditional_42_Conditional_5_Template, 2, 1, "p", 75);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance(2);
    __property("size", 18);
    __advance();
    __textInterpolate1("", ctx_r1.t()("documents.add.duplicateWarn"), " ");
    __advance();
    __conditional(ctx_r1.canManage() ? 4 : 5);
  }
}
function DocumentsPage_Conditional_49_Template(rf, ctx) {
  if (rf & 1) {
    __elementStart(0, "span", 30);
    __text(1);
    __elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __advance();
    __textInterpolate(ctx_r1.t()("documents.add.sensitiveWarn"));
  }
}
function DocumentsPage_Conditional_56_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = __getCurrentView();
    __elementStart(0, "ui-modal", 76);
    __listener("closed", function DocumentsPage_Conditional_56_Template_ui_modal_closed_0_listener() {
      __restoreView(_r18);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.removeId.set(null));
    });
    __elementStart(1, "button", 31);
    __listener("click", function DocumentsPage_Conditional_56_Template_button_click_1_listener() {
      __restoreView(_r18);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.removeId.set(null));
    });
    __text(2);
    __elementEnd();
    __elementStart(3, "button", 77);
    __listener("click", function DocumentsPage_Conditional_56_Template_button_click_3_listener() {
      const docToRemove_r19 = __restoreView(_r18);
      const ctx_r1 = __nextContext();
      return __resetView(ctx_r1.submitRemove(docToRemove_r19.id));
    });
    __text(4);
    __elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = __nextContext();
    __property("open", true)("title", ctx_r1.t()("documents.remove.title"))("description", ctx_r1.t()("documents.remove.description", __pureFunction1(7, _c4, ctx.name)))("width", 520)("closeLabel", ctx_r1.t()("common.close"));
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("documents.add.cancel"), " ");
    __advance(2);
    __textInterpolate1(" ", ctx_r1.t()("documents.remove.submit"), " ");
  }
}
var GROUP_KEY = {
  statuts: "documents.group.statuts",
  r\u00E8glement: "documents.group.reglement",
  "proc\xE8s-verbal": "documents.group.pv",
  convention: "documents.group.convention",
  justificatif: "documents.group.justificatif",
  autre: "documents.group.autre"
};
var KIND_STYLE = {
  statuts: {
    icon: "gavel",
    ...TONE.info
  },
  r\u00E8glement: {
    icon: "menu_book",
    ...TONE.culture
  },
  "proc\xE8s-verbal": {
    icon: "event_note",
    ...TONE.succes
  },
  convention: {
    icon: "description",
    ...TONE.attente
  },
  justificatif: {
    icon: "fact_check",
    ...TONE.neutre
  },
  autre: {
    icon: "folder_open",
    ...TONE.neutre
  }
};
var MAX_KB = 5120;
var DocumentsPage = (_a = class {
  constructor() {
    this.store = inject(StoreService);
    this.locale = inject(LocaleService);
    this.snackbar = inject(SnackbarService);
    this.t = this.locale.t;
    this.fmtDate = fmtDate;
    this.GROUP_KEY = GROUP_KEY;
    this.kindStyle = KIND_STYLE;
    this.libraryKinds = [...LIBRARY_KINDS];
    this.maxMb = MAX_KB / 1024;
    this.route = inject(ActivatedRoute);
    this.scoopFilter = toSignal(this.route.queryParamMap.pipe(map((m) => m.get("scoop"))), { initialValue: null });
    this.q = signal("", ...[]);
    this.kind = signal("all", ...[]);
    this.detailId = signal(null, ...[]);
    this.removeId = signal(null, ...[]);
    this.canManage = computed(() => this.store.can("library.manage"), ...[]);
    this.canUpload = computed(() => this.store.can("library.upload") || this.store.can("library.manage"), ...[]);
    this.canDownload = computed(() => this.store.can("document.download"), ...[]);
    this.mine = computed(() => {
      const s = this.store.state();
      const scoop = this.scoopFilter();
      return scopedLibrary(s.documents, s.session).filter((d) => !scoop || d.scoopId === scoop);
    }, ...[]);
    this.matching = computed(() => {
      const needle = this.q().trim().toLowerCase();
      return this.mine().filter((d) => !needle || d.name.toLowerCase().includes(needle));
    }, ...[]);
    this.shown = computed(() => {
      const k = this.kind();
      return this.matching().filter((d) => k === "all" || d.kind === k);
    }, ...[]);
    this.groups = computed(() => this.libraryKinds.map((k) => ({
      kind: k,
      docs: this.shown().filter((d) => d.kind === k).sort((a, b) => {
        var _a2, _b;
        return Number(((_a2 = a.lifecycle) != null ? _a2 : "en vigueur") === "remplac\xE9") - Number(((_b = b.lifecycle) != null ? _b : "en vigueur") === "remplac\xE9") || b.uploadedAt.localeCompare(a.uploadedAt);
      })
    })).filter((x) => x.docs.length), ...[]);
    this.stats = computed(() => {
      const t = this.t();
      const all = this.mine();
      const current = all.filter((d) => {
        var _a2;
        return ((_a2 = d.lifecycle) != null ? _a2 : "en vigueur") === "en vigueur";
      }).length;
      const sensitive = all.filter((d) => d.sensitive).length;
      return [
        {
          label: t("documents.stat.total"),
          value: nf.format(all.length),
          sub: t("documents.stat.totalSub", { count: new Set(all.map((d) => d.kind)).size }),
          icon: "folder_open",
          bg: "",
          fg: ""
        },
        {
          label: t("documents.stat.current"),
          value: nf.format(current),
          sub: t("documents.stat.currentSub"),
          icon: "check_circle",
          ...TONE.succes
        },
        {
          label: t("documents.stat.replaced"),
          value: nf.format(all.length - current),
          sub: t("documents.stat.replacedSub"),
          icon: "event_note",
          ...TONE.info
        },
        {
          label: t("documents.stat.sensitive"),
          value: nf.format(sensitive),
          sub: t("documents.stat.sensitiveSub"),
          icon: "warning",
          ...sensitive ? TONE.erreur : TONE.neutre
        }
      ];
    }, ...[]);
    this.detail = computed(() => {
      var _a2, _b, _c, _d;
      const id = this.detailId();
      const d = id ? this.mine().find((x) => x.id === id) : null;
      if (!d) return null;
      const t = this.t();
      const old = ((_a2 = d.lifecycle) != null ? _a2 : "en vigueur") === "remplac\xE9";
      const kind = d.kind;
      const versions = this.mine().filter((x) => x.scoopId === d.scoopId && x.kind === d.kind && x.name.toLowerCase() === d.name.toLowerCase()).sort((a, b) => {
        var _a3, _b2;
        return ((_a3 = b.version) != null ? _a3 : 1) - ((_b2 = a.version) != null ? _b2 : 1);
      });
      const mtg = this.meetingOf(d);
      return {
        title: d.name,
        subtitle: t(GROUP_KEY[kind]),
        icon: KIND_STYLE[kind].icon,
        badges: [
          old ? {
            label: t("documents.version.replaced"),
            ...TONE.neutre
          } : {
            label: t("documents.version.current"),
            ...TONE.succes
          },
          {
            label: t("documents.version.label", { n: (_b = d.version) != null ? _b : 1 }),
            ...TONE.info
          },
          ...d.sensitive ? [{
            label: t("documents.sensitive.pill"),
            ...TONE.erreur
          }] : []
        ],
        kpis: [],
        facts: [
          detailFact(t("documents.quick.kind"), t(GROUP_KEY[kind]), KIND_STYLE[kind].icon),
          detailFact(t("documents.quick.size"), this.formatSize(d.sizeKb), "description"),
          detailFact(t("documents.quick.effect"), fmtDate((_c = d.effectiveAt) != null ? _c : d.uploadedAt), "calendar_today"),
          detailFact(t("documents.quick.addedBy"), `${d.uploadedBy} \xB7 ${fmtDate(d.uploadedAt)}`, "badge"),
          ...this.linkName(d) ? [detailFact(t("documents.quick.linked"), this.linkName(d), "link", { wide: true })] : [],
          detailFact(t("documents.quick.scoop"), (_d = this.store.state().scoops.find((c) => c.id === d.scoopId)) == null ? void 0 : _d.name, "apartment", { wide: true })
        ],
        sections: [{
          title: t("documents.quick.version"),
          icon: "event_note",
          count: versions.length,
          empty: "\u2014",
          items: versions.map((v) => {
            var _a3, _b2, _c6;
            return {
              label: t("documents.version.label", { n: (_a3 = v.version) != null ? _a3 : 1 }),
              sub: `${fmtDate((_b2 = v.effectiveAt) != null ? _b2 : v.uploadedAt)} \xB7 ${v.uploadedBy}`,
              badge: ((_c6 = v.lifecycle) != null ? _c6 : "en vigueur") === "remplac\xE9" ? {
                label: t("documents.version.replaced"),
                ...TONE.neutre
              } : {
                label: t("documents.version.current"),
                ...TONE.succes
              }
            };
          }),
          more: 0
        }],
        link: mtg ? ["/dashboard/reunions", mtg.id] : null
      };
    }, ...[]);
    this.addOpen = signal(false, ...[]);
    this.addScoop = signal("", ...[]);
    this.addKind = signal("statuts", ...[]);
    this.addFile = signal(null, ...[]);
    this.addSensitive = signal(false, ...[]);
    this.addLinkType = signal("scoop", ...[]);
    this.addLinkId = signal("", ...[]);
    this.linkTypes = [
      {
        id: "scoop",
        label: "documents.add.link.scoop"
      },
      {
        id: "org",
        label: "documents.add.link.org"
      },
      {
        id: "technicien",
        label: "documents.add.link.technicien"
      },
      {
        id: "personnel",
        label: "documents.add.link.personnel"
      }
    ];
    this.linkOptions = computed(() => {
      const state = this.store.state();
      const scoop = this.addScoop();
      const type = this.addLinkType();
      if (type === "org") return state.orgs.filter((org) => org.scoopId === scoop).sort((first, second) => first.name.localeCompare(second.name)).map((org) => ({
        value: org.id,
        label: org.name
      }));
      if (type === "scoop") return [];
      return state.users.filter((user) => {
        var _a2;
        return user.scoopId === scoop || ((_a2 = user.scoopIds) == null ? void 0 : _a2.includes(scoop));
      }).filter((user) => type === "technicien" ? user.role === "technicien" : user.role !== "technicien" && ![
        "admin",
        "superadmin",
        "faitiere"
      ].includes(user.role)).sort((first, second) => first.name.localeCompare(second.name)).map((user) => ({
        value: user.id,
        label: user.name,
        ...type === "personnel" ? { hint: this.store.roleLabel(user.role) } : {}
      }));
    }, ...[]);
    this.replace = signal(true, ...[]);
    this.addScoops = computed(() => {
      const s = this.store.state();
      return inScope(s.scoops.filter((c) => !c.archived).map((c) => ({
        ...c,
        scoopId: c.id
      })), s.session).sort((a, b) => a.name.localeCompare(b.name)).map((c) => ({
        value: c.id,
        label: c.name
      }));
    }, ...[]);
    this.kindOptions = computed(() => this.libraryKinds.map((k) => ({
      value: k,
      label: this.t()(GROUP_KEY[k]),
      icon: KIND_STYLE[k].icon
    })), ...[]);
    this.addSlot = computed(() => [{
      id: "file",
      label: this.t()(GROUP_KEY[this.addKind()]),
      hint: this.t()("documents.add.choose"),
      icon: KIND_STYLE[this.addKind()].icon,
      required: true
    }], ...[]);
    this.addFiles = computed(() => {
      const f = this.addFile();
      return f ? [{
        key: "file",
        name: f.name,
        sizeKb: f.sizeKb,
        slot: "file"
      }] : [];
    }, ...[]);
    this.duplicate = computed(() => {
      var _a2;
      const f = this.addFile();
      if (!f) return null;
      return (_a2 = this.store.state().documents.find((d) => {
        var _a3;
        return d.ownerType === "scoop" && d.scoopId === this.addScoop() && d.name.toLowerCase() === f.name.trim().toLowerCase() && ((_a3 = d.lifecycle) != null ? _a3 : "en vigueur") === "en vigueur";
      })) != null ? _a2 : null;
    }, ...[]);
    this.toRemove = computed(() => {
      var _a2;
      const id = this.removeId();
      return id ? (_a2 = this.mine().find((d) => d.id === id)) != null ? _a2 : null : null;
    }, ...[]);
  }
  /** Style d'un type ; un type hors bibliothèque retombe sur « autre ». */
  styleOf(kind) {
    var _a2;
    return (_a2 = KIND_STYLE[kind]) != null ? _a2 : KIND_STYLE.autre;
  }
  countKind(k) {
    return this.matching().filter((d) => d.kind === k).length;
  }
  meetingOf(d) {
    if (d.kind !== "proc\xE8s-verbal") return void 0;
    return this.store.state().meetings.find((m) => {
      var _a2;
      return ((_a2 = m.minutes) == null ? void 0 : _a2.documentId) === d.id;
    });
  }
  formatSize(kb) {
    return kb >= 1024 ? this.t()("documents.size.mb", { n: nf1.format(kb / 1024) }) : this.t()("documents.size.kb", { n: nf1.format(Math.max(1, Math.round(kb))) });
  }
  resetFilters() {
    this.kind.set("all");
    this.q.set("");
  }
  download(d) {
    const r = actions.downloadDocument(d.id);
    if (!r.ok) {
      this.snackbar.error(this.locale.tNow(r.error));
      return;
    }
    const blob = new Blob([`${this.t()("documents.demoFile", {
      name: d.name,
      kind: this.t()(KIND_KEY[d.kind])
    })}
`], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${d.name}.txt`;
    a.click();
    URL.revokeObjectURL(a.href);
  }
  /** Nom de ce à quoi le document est lié ; vide si c'est toute la coopérative. */
  linkName(doc) {
    var _a2, _b, _c, _d;
    if (!doc.link) return "";
    const state = this.store.state();
    return doc.link.type === "org" ? (_b = (_a2 = state.orgs.find((org) => org.id === doc.link.id)) == null ? void 0 : _a2.name) != null ? _b : "" : (_d = (_c = state.users.find((user) => user.id === doc.link.id)) == null ? void 0 : _c.name) != null ? _d : "";
  }
  openAdd() {
    var _a2, _b;
    const scoop = this.scoopFilter();
    this.addScoop.set(scoop && this.addScoops().some((o) => o.value === scoop) ? scoop : (_b = (_a2 = this.addScoops()[0]) == null ? void 0 : _a2.value) != null ? _b : "");
    this.addKind.set(this.kind() === "all" ? "statuts" : this.kind());
    this.addFile.set(null);
    this.addSensitive.set(false);
    this.addLinkType.set("scoop");
    this.addLinkId.set("");
    this.replace.set(true);
    this.addOpen.set(true);
  }
  pickFile(files) {
    const file = files[0];
    if (!file) return;
    const sizeKb = Math.ceil(file.size / 1024);
    if (sizeKb > MAX_KB) {
      this.snackbar.error(this.t()("documents.add.tooBig", {
        size: this.formatSize(sizeKb),
        mb: this.maxMb
      }));
      return;
    }
    this.addFile.set({
      name: file.name,
      sizeKb,
      mime: file.type || "application/octet-stream"
    });
  }
  submitAdd() {
    const f = this.addFile();
    if (!f) return;
    const dup = this.duplicate();
    const name = dup && !(this.replace() && this.canManage()) ? f.name.replace(/(\.[^.]+)?$/, (ext) => {
      var _a2;
      return ` (${((_a2 = dup.version) != null ? _a2 : 1) + 1})${ext}`;
    }) : f.name;
    const res = actions.addLibraryDocument(this.addScoop(), {
      kind: this.addKind(),
      name,
      sizeKb: f.sizeKb,
      mime: f.mime,
      sensitive: this.addSensitive(),
      ...this.addLinkType() !== "scoop" ? { link: {
        type: this.addLinkType(),
        id: this.addLinkId()
      } } : {},
      replaceExisting: !!dup && this.replace() && this.canManage()
    });
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.addOpen.set(false);
    this.snackbar.success(this.t()("documents.added"));
  }
  submitRemove(id) {
    const res = actions.removeLibraryDocument(id);
    if (!res.ok) {
      this.snackbar.error(this.locale.tNow(res.error));
      return;
    }
    this.removeId.set(null);
    this.snackbar.success(this.t()("documents.removed"));
  }
}, _a.\u0275fac = function DocumentsPage_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275cmp = /* @__PURE__ */ __defineComponent({
  type: _a,
  selectors: [["app-documents-page"]],
  decls: 57,
  vars: 50,
  consts: [
    [
      "perm",
      "library.read",
      3,
      "area"
    ],
    [
      1,
      "rise",
      "flex",
      "flex-wrap",
      "items-end",
      "justify-between",
      "gap-x-6",
      "gap-y-4"
    ],
    [1, "min-w-0"],
    [
      1,
      "mono",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      1,
      "mt-2",
      "text-[30px]",
      "font-extrabold",
      "leading-[1.05]",
      "tracking-[-0.03em]",
      "sm:text-[38px]"
    ],
    [
      1,
      "mt-2",
      "max-w-2xl",
      "text-[16px]",
      "font-medium",
      2,
      "color",
      "var(--v2-gris-texte)"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-primary"
    ],
    [
      1,
      "rise",
      "mt-8",
      3,
      "stats"
    ],
    [
      1,
      "toolbar",
      "card",
      "mt-6"
    ],
    [1, "search"],
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
      "role",
      "radiogroup",
      1,
      "seg"
    ],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "click"
    ],
    [1, "n"],
    [
      "type",
      "button",
      "role",
      "radio",
      3,
      "on"
    ],
    [
      1,
      "card",
      "mt-4",
      "flex",
      "flex-col",
      "items-center",
      "gap-3",
      "p-10",
      "text-center"
    ],
    [
      1,
      "mt-4",
      "grid",
      "gap-4"
    ],
    [
      3,
      "closed",
      "view"
    ],
    [
      "icon",
      "upload_file",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      1,
      "grid",
      "gap-5",
      "pb-5",
      "pt-1"
    ],
    [
      1,
      "grid",
      "gap-5",
      "sm:grid-cols-2"
    ],
    [1, "lbl"],
    [
      1,
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "leadingIcon",
      "options",
      "value"
    ],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "seg-form",
      "mt-2"
    ],
    [
      "accept",
      "image/*,application/pdf,.doc,.docx",
      3,
      "added",
      "removed",
      "slots",
      "files",
      "multiple",
      "hint"
    ],
    [
      1,
      "rounded-[18px]",
      "p-4",
      2,
      "background",
      "var(--v2-attente-bg)",
      "color",
      "var(--v2-attente-fg)"
    ],
    [1, "check"],
    [
      "type",
      "checkbox",
      3,
      "change",
      "checked"
    ],
    [
      1,
      "sub",
      "block"
    ],
    [
      1,
      "mt-1",
      "block",
      "text-[13px]",
      "font-bold",
      2,
      "color",
      "var(--v2-erreur-fg)"
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
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      3,
      "click",
      "disabled"
    ],
    [1, "btn-chip"],
    [
      "name",
      "check",
      3,
      "size"
    ],
    [
      "tone",
      "danger",
      "icon",
      "close",
      3,
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-primary",
      3,
      "click"
    ],
    [
      "name",
      "upload_file",
      3,
      "size"
    ],
    [
      1,
      "grid",
      "size-14",
      "place-items-center",
      "rounded-[16px]",
      2,
      "background",
      "var(--v2-sauge)",
      "color",
      "var(--v2-foret)"
    ],
    [
      3,
      "name",
      "size"
    ],
    [
      1,
      "text-[16px]",
      "font-extrabold"
    ],
    [
      1,
      "sub",
      "max-w-md"
    ],
    [
      "type",
      "button",
      1,
      "btn",
      "btn-ghost",
      3,
      "click"
    ],
    [
      1,
      "card",
      "overflow-hidden"
    ],
    [1, "group-head"],
    [1, "kind-ico"],
    [
      1,
      "min-w-0",
      "flex-1",
      "text-[17px]",
      "font-extrabold",
      "tracking-[-0.01em]",
      3,
      "id"
    ],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-creme)",
      "color",
      "var(--v2-ardoise)"
    ],
    [
      1,
      "doc",
      "row-link",
      3,
      "old"
    ],
    [
      1,
      "doc",
      "row-link",
      3,
      "click"
    ],
    [
      1,
      "kind-ico",
      2,
      "height",
      "36px",
      "width",
      "36px"
    ],
    [
      "name",
      "description",
      3,
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
      "gap-1.5"
    ],
    [
      1,
      "truncate",
      "font-bold",
      3,
      "title"
    ],
    [1, "badge"],
    [
      1,
      "badge",
      2,
      "background",
      "var(--v2-erreur-bg)",
      "color",
      "var(--v2-erreur-fg)",
      3,
      "title"
    ],
    [
      1,
      "sub",
      "mt-0.5",
      "block",
      "truncate"
    ],
    [
      1,
      "flex",
      "shrink-0",
      "items-center",
      "gap-2",
      3,
      "click"
    ],
    [
      1,
      "act",
      3,
      "routerLink",
      "title"
    ],
    [
      "type",
      "button",
      1,
      "act",
      3,
      "title"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger",
      3,
      "title"
    ],
    [
      "type",
      "button",
      1,
      "act",
      3,
      "click",
      "title"
    ],
    [
      "name",
      "visibility",
      3,
      "size"
    ],
    [
      "name",
      "warning",
      3,
      "size"
    ],
    [
      "name",
      "event",
      3,
      "size"
    ],
    [
      "name",
      "download",
      3,
      "size"
    ],
    [
      "type",
      "button",
      1,
      "act",
      "act-danger",
      3,
      "click",
      "title"
    ],
    [
      "name",
      "close",
      3,
      "size"
    ],
    [
      "leadingIcon",
      "apartment",
      1,
      "mt-2",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      "leadingIcon",
      "link",
      1,
      "mt-3",
      "block",
      3,
      "label",
      "options",
      "value"
    ],
    [
      1,
      "sub",
      "mt-3"
    ],
    [
      "leadingIcon",
      "link",
      1,
      "mt-3",
      "block",
      3,
      "valueChange",
      "label",
      "options",
      "value"
    ],
    [
      1,
      "flex",
      "items-center",
      "gap-2",
      "text-[14px]",
      "font-bold"
    ],
    [
      "role",
      "radiogroup",
      1,
      "seg",
      "seg-form",
      "mt-3"
    ],
    [
      1,
      "mt-2",
      "text-[13px]",
      "font-semibold"
    ],
    [
      "tone",
      "danger",
      "icon",
      "close",
      3,
      "closed",
      "open",
      "title",
      "description",
      "width",
      "closeLabel"
    ],
    [
      "modal-footer",
      "",
      "type",
      "button",
      1,
      "btn",
      2,
      "background",
      "var(--v2-erreur-fg)",
      "color",
      "var(--v2-blanc)",
      3,
      "click"
    ]
  ],
  template: function DocumentsPage_Template(rf, ctx) {
    if (rf & 1) {
      __elementStart(0, "app-shell", 0)(1, "header", 1)(2, "div", 2)(3, "p", 3);
      __text(4);
      __elementEnd();
      __elementStart(5, "h1", 4);
      __text(6);
      __elementEnd();
      __elementStart(7, "p", 5);
      __text(8);
      __elementEnd()();
      __conditionalCreate(9, DocumentsPage_Conditional_9_Template, 4, 2, "button", 6);
      __elementEnd();
      __element(10, "ui-stat-cards", 7);
      __elementStart(11, "div", 8)(12, "label", 9);
      __element(13, "ui-icon", 10);
      __elementStart(14, "input", 11);
      __listener("input", function DocumentsPage_Template_input_input_14_listener($event) {
        return ctx.q.set($event.target.value);
      });
      __elementEnd()();
      __element(15, "app-global-filters");
      __elementStart(16, "div", 12)(17, "button", 13);
      __listener("click", function DocumentsPage_Template_button_click_17_listener() {
        return ctx.kind.set("all");
      });
      __text(18);
      __elementStart(19, "span", 14);
      __text(20);
      __elementEnd()();
      __repeaterCreate(21, DocumentsPage_For_22_Template, 4, 7, "button", 15, __repeaterTrackByIdentity);
      __elementEnd()();
      __conditionalCreate(23, DocumentsPage_Conditional_23_Template, 5, 3, "div", 16)(24, DocumentsPage_Conditional_24_Template, 3, 0, "div", 17);
      __elementStart(25, "ui-detail-modal", 18);
      __listener("closed", function DocumentsPage_Template_ui_detail_modal_closed_25_listener() {
        return ctx.detailId.set(null);
      });
      __elementEnd();
      __elementStart(26, "ui-modal", 19);
      __listener("closed", function DocumentsPage_Template_ui_modal_closed_26_listener() {
        return ctx.addOpen.set(false);
      });
      __elementStart(27, "div", 20)(28, "div", 21);
      __conditionalCreate(29, DocumentsPage_Conditional_29_Template, 4, 4, "div");
      __elementStart(30, "div")(31, "p", 22);
      __text(32);
      __elementEnd();
      __elementStart(33, "ui-select", 23);
      __listener("valueChange", function DocumentsPage_Template_ui_select_valueChange_33_listener($event) {
        return ctx.addKind.set($event);
      });
      __elementEnd()()();
      __elementStart(34, "div")(35, "p", 22);
      __text(36);
      __elementEnd();
      __elementStart(37, "div", 24);
      __repeaterCreate(38, DocumentsPage_For_39_Template, 2, 4, "button", 15, _forTrack0);
      __elementEnd();
      __conditionalCreate(40, DocumentsPage_Conditional_40_Template, 2, 1);
      __elementEnd();
      __elementStart(41, "ui-file-slots", 25);
      __listener("added", function DocumentsPage_Template_ui_file_slots_added_41_listener($event) {
        return ctx.pickFile($event.files);
      })("removed", function DocumentsPage_Template_ui_file_slots_removed_41_listener() {
        return ctx.addFile.set(null);
      });
      __elementEnd();
      __conditionalCreate(42, DocumentsPage_Conditional_42_Template, 6, 3, "div", 26);
      __elementStart(43, "label", 27)(44, "input", 28);
      __listener("change", function DocumentsPage_Template_input_change_44_listener($event) {
        return ctx.addSensitive.set($event.target.checked);
      });
      __elementEnd();
      __elementStart(45, "span");
      __text(46);
      __elementStart(47, "span", 29);
      __text(48);
      __elementEnd();
      __conditionalCreate(49, DocumentsPage_Conditional_49_Template, 2, 1, "span", 30);
      __elementEnd()()();
      __elementStart(50, "button", 31);
      __listener("click", function DocumentsPage_Template_button_click_50_listener() {
        return ctx.addOpen.set(false);
      });
      __text(51);
      __elementEnd();
      __elementStart(52, "button", 32);
      __listener("click", function DocumentsPage_Template_button_click_52_listener() {
        return ctx.submitAdd();
      });
      __text(53);
      __elementStart(54, "span", 33);
      __element(55, "ui-icon", 34);
      __elementEnd()()();
      __conditionalCreate(56, DocumentsPage_Conditional_56_Template, 5, 9, "ui-modal", 35);
      __elementEnd();
    }
    if (rf & 2) {
      let tmp_38_0;
      let tmp_47_0;
      __property("area", ctx.t()("documents.area"));
      __advance(4);
      __textInterpolate(ctx.t()("documents.eyebrow"));
      __advance(2);
      __textInterpolate1(" ", ctx.t()("documents.title"), " ");
      __advance(2);
      __textInterpolate1(" ", ctx.t()("documents.description"), " ");
      __advance();
      __conditional(ctx.canUpload() ? 9 : -1);
      __advance();
      __property("stats", ctx.stats());
      __advance(3);
      __property("size", 20);
      __advance();
      __property("placeholder", ctx.t()("documents.search.placeholder"))("value", ctx.q());
      __attribute("aria-label", ctx.t()("documents.search.aria"));
      __advance(2);
      __attribute("aria-label", ctx.t()("documents.filters"));
      __advance();
      __classProp("on", ctx.kind() === "all");
      __attribute("aria-checked", ctx.kind() === "all");
      __advance();
      __textInterpolate1(" ", ctx.t()("documents.filter.all"));
      __advance();
      __classProp("zero", !ctx.matching().length);
      __advance();
      __textInterpolate(ctx.matching().length);
      __advance();
      __repeater(ctx.libraryKinds);
      __advance(2);
      __conditional(ctx.shown().length === 0 ? 23 : 24);
      __advance(2);
      __property("view", ctx.detail());
      __advance();
      __property("open", ctx.addOpen())("title", ctx.t()("documents.add.title"))("description", ctx.t()("documents.add.description"))("width", 640)("closeLabel", ctx.t()("common.close"));
      __advance(3);
      __conditional(ctx.addScoops().length > 1 ? 29 : -1);
      __advance(3);
      __textInterpolate(ctx.t()("documents.add.kind"));
      __advance();
      __property("label", ctx.t()("documents.add.kind"))("leadingIcon", ctx.kindStyle[ctx.addKind()].icon)("options", ctx.kindOptions())("value", ctx.addKind());
      __advance(3);
      __textInterpolate(ctx.t()("documents.add.link"));
      __advance();
      __attribute("aria-label", ctx.t()("documents.add.link"));
      __advance();
      __repeater(ctx.linkTypes);
      __advance(2);
      __conditional(ctx.addLinkType() !== "scoop" ? 40 : -1);
      __advance();
      __property("slots", ctx.addSlot())("files", ctx.addFiles())("multiple", false)("hint", ctx.t()("documents.add.fileHint", __pureFunction1(48, _c0, ctx.maxMb)));
      __advance();
      __conditional((tmp_38_0 = ctx.duplicate()) ? 42 : -1, tmp_38_0);
      __advance(2);
      __property("checked", ctx.addSensitive());
      __advance(2);
      __textInterpolate1(" ", ctx.t()("documents.add.sensitive"), " ");
      __advance(2);
      __textInterpolate(ctx.t()("documents.add.sensitiveHint"));
      __advance();
      __conditional(ctx.addSensitive() && !ctx.store.can("identity.read_full") ? 49 : -1);
      __advance(2);
      __textInterpolate1(" ", ctx.t()("documents.add.cancel"), " ");
      __advance();
      __property("disabled", !ctx.addFile() || !ctx.addScoop() || ctx.addLinkType() !== "scoop" && !ctx.addLinkId());
      __advance();
      __textInterpolate1(" ", ctx.t()("documents.add.submit"), " ");
      __advance(2);
      __property("size", 18);
      __advance();
      __conditional((tmp_47_0 = ctx.toRemove()) ? 56 : -1, tmp_47_0);
    }
  },
  dependencies: [
    AppShellComponent,
    DetailModalComponent,
    FileSlotsComponent,
    GlobalFiltersComponent,
    IconComponent,
    ModalComponent,
    RouterLink,
    SelectComponent,
    StatCardsComponent
  ],
  styles: [".mono[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n  }\n  .card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n  }\n  .sub[_ngcontent-%COMP%] {\n    font-size: 13px;\n    font-weight: 500;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .badge[_ngcontent-%COMP%] {\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 999px;\n    padding: 3px 10px 3px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    white-space: nowrap;\n  }\n  .zero[_ngcontent-%COMP%] {\n    color: var(--%NS%v2-gris-trait) !important;\n  }\n  .btn[_ngcontent-%COMP%] {\n    display: inline-flex;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 16px;\n    padding: 0 18px;\n    font-size: 15px;\n    font-weight: 800;\n    white-space: nowrap;\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .btn[_ngcontent-%COMP%]:disabled {\n    cursor: not-allowed;\n    opacity: 0.5;\n  }\n  .btn[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .btn-primary[_ngcontent-%COMP%] {\n    padding: 0 6px 0 18px;\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: var(--%NS%v2-foret-clair);\n  }\n  .btn-ghost[_ngcontent-%COMP%] {\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-encre);\n  }\n  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {\n    border-color: var(--%NS%v2-gris-texte);\n  }\n  \n  .btn-chip[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    place-items: center;\n    border-radius: 12px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .toolbar[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 8px;\n    padding: 8px;\n    border-radius: 20px;\n  }\n  .search[_ngcontent-%COMP%] {\n    display: flex;\n    flex: 1 1 260px;\n    min-width: 0;\n    height: 48px;\n    align-items: center;\n    gap: 10px;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 0 14px;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .search[_ngcontent-%COMP%]:focus-within {\n    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);\n  }\n  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    background: transparent;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n    outline: none;\n  }\n  .seg[_ngcontent-%COMP%] {\n    display: flex;\n    max-width: 100%;\n    gap: 4px;\n    overflow-x: auto;\n    scrollbar-width: none;\n    border-radius: 14px;\n    background: var(--%NS%v2-creme);\n    padding: 4px;\n  }\n  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {\n    display: none;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    display: inline-flex;\n    flex-shrink: 0;\n    align-items: center;\n    gap: 7px;\n    white-space: nowrap;\n    border-radius: 10px;\n    padding: 9px 14px;\n    font-size: 14px;\n    font-weight: 700;\n    color: var(--%NS%v2-gris-texte);\n    cursor: pointer;\n  }\n  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {\n    color: var(--%NS%v2-encre);\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-foret);\n    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);\n  }\n  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    padding: 1px 7px;\n    font-size: 12px;\n    font-variant-numeric: tabular-nums;\n    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);\n    color: var(--%NS%v2-ardoise);\n  }\n  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {\n    background: transparent;\n  }\n  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-blanc);\n  }\n  .act[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 12px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    color: var(--%NS%v2-ardoise);\n    cursor: pointer;\n    transition:\n      background-color 0.15s ease,\n      color 0.15s ease,\n      border-color 0.15s ease;\n  }\n  .act[_ngcontent-%COMP%]:hover, \n   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {\n    border-color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .act[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: 2px;\n  }\n  .tbl[_ngcontent-%COMP%] {\n    width: 100%;\n    text-align: left;\n    font-size: 14px;\n  }\n  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    font-family: var(--%NS%v2-font-mono);\n    font-size: 11px;\n    font-weight: 700;\n    letter-spacing: 0.08em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n    padding: 12px;\n    white-space: nowrap;\n  }\n  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n    padding: 12px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {\n    padding-left: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, \n   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {\n    padding-right: 20px;\n  }\n  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .row-link[_ngcontent-%COMP%] {\n    cursor: pointer;\n    transition: background-color 0.15s ease;\n  }\n  .row-link[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-creme);\n  }\n  .row-link[_ngcontent-%COMP%]:focus-visible {\n    outline: 2px solid var(--%NS%v2-foret);\n    outline-offset: -2px;\n  }\n  .avatar[_ngcontent-%COMP%] {\n    display: grid;\n    height: 36px;\n    width: 36px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 999px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n    font-size: 12px;\n    font-weight: 800;\n  }\n  \n  .sec-card[_ngcontent-%COMP%] {\n    border-radius: 24px;\n    border: 1px solid var(--%NS%v2-bord-carte);\n    background: var(--%NS%v2-blanc);\n    overflow: hidden;\n  }\n  .sec-head[_ngcontent-%COMP%] {\n    display: flex;\n    flex-wrap: wrap;\n    align-items: center;\n    gap: 10px;\n    padding: 16px 20px;\n  }\n  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {\n    min-width: 0;\n    flex: 1;\n    display: flex;\n    align-items: center;\n    gap: 8px;\n    font-size: 17px;\n    font-weight: 800;\n    letter-spacing: -0.01em;\n  }\n  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {\n    border-radius: 999px;\n    background: var(--%NS%v2-creme);\n    padding: 1px 9px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-ardoise);\n  }\n  .sec-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-sauge);\n    color: var(--%NS%v2-foret);\n  }\n  .facts[_ngcontent-%COMP%] {\n    display: grid;\n    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));\n    border-top: 1px solid var(--%NS%v2-separateur);\n  }\n  .fact[_ngcontent-%COMP%] {\n    display: flex;\n    min-width: 0;\n    align-items: flex-start;\n    gap: 12px;\n    border-bottom: 1px solid var(--%NS%v2-separateur);\n    padding: 14px 20px;\n  }\n  .fact-ico[_ngcontent-%COMP%] {\n    display: grid;\n    height: 34px;\n    width: 34px;\n    flex-shrink: 0;\n    place-items: center;\n    border-radius: 10px;\n    background: var(--%NS%v2-creme);\n    color: var(--%NS%v2-foret);\n  }\n  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 600;\n    color: var(--%NS%v2-gris-texte);\n  }\n  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    overflow-wrap: anywhere;\n    font-size: 15px;\n    font-weight: 800;\n  }\n  .reveal[_ngcontent-%COMP%] {\n    margin-left: 8px;\n    display: inline-flex;\n    align-items: center;\n    gap: 4px;\n    border-radius: 8px;\n    padding: 2px 8px;\n    font-size: 12px;\n    font-weight: 800;\n    color: var(--%NS%v2-foret);\n    background: var(--%NS%v2-sauge);\n    cursor: pointer;\n  }\n  .reveal[_ngcontent-%COMP%]:hover {\n    background: var(--%NS%v2-foret);\n    color: var(--%NS%v2-citron);\n  }\n  .lbl[_ngcontent-%COMP%] {\n    font-size: 12px;\n    font-weight: 700;\n    letter-spacing: 0.06em;\n    text-transform: uppercase;\n    color: var(--%NS%v2-ardoise);\n  }\n  .area[_ngcontent-%COMP%] {\n    width: 100%;\n    min-height: 104px;\n    border-radius: 16px;\n    border: 1.5px solid var(--%NS%v2-gris-trait);\n    background: var(--%NS%v2-blanc);\n    padding: 12px 16px;\n    font-size: 15px;\n    font-weight: 600;\n    color: var(--%NS%v2-encre);\n  }\n  .area[_ngcontent-%COMP%]::placeholder {\n    color: var(--%NS%v2-gris-texte);\n    font-weight: 500;\n  }\n  .area[_ngcontent-%COMP%]:focus-visible {\n    outline: none;\n    border: 2px solid var(--%NS%v2-foret);\n    box-shadow: var(--%NS%v2-halo);\n  }\n  .check[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: flex-start;\n    gap: 10px;\n    font-size: 14px;\n    font-weight: 600;\n    cursor: pointer;\n  }\n  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n    margin-top: 2px;\n    height: 20px;\n    width: 20px;\n    accent-color: var(--%NS%v2-foret);\n    cursor: pointer;\n  }\n  .act-danger[_ngcontent-%COMP%]:hover {\n    border-color: var(--%NS%v2-erreur-fg);\n    background: var(--%NS%v2-erreur-bg);\n    color: var(--%NS%v2-erreur-fg);\n  }\n  .btn-danger[_ngcontent-%COMP%] {\n    background: var(--%NS%v2-erreur-fg);\n    color: var(--%NS%v2-blanc);\n  }\n  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);\n  }\n  .btn-citron[_ngcontent-%COMP%] {\n    padding: 0 18px;\n    background: var(--%NS%v2-citron);\n    color: var(--%NS%v2-foret);\n  }\n  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {\n    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);\n  }\n  .notice[_ngcontent-%COMP%] {\n    display: flex;\n    align-items: center;\n    gap: 10px;\n    border-radius: 18px;\n    padding: 12px 16px;\n    font-size: 14px;\n    font-weight: 700;\n  }\n  .rise[_ngcontent-%COMP%] {\n    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;\n  }\n  @keyframes _ngcontent-%COMP%_v2-rise {\n    from {\n      opacity: 0;\n      transform: translateY(10px);\n    }\n  }\n  @media (prefers-reduced-motion: reduce) {\n    .rise[_ngcontent-%COMP%] {\n      animation: none;\n    }\n  }", ".group-head[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 12px;\n        padding: 16px 20px;\n      }\n      .kind-ico[_ngcontent-%COMP%] {\n        display: grid;\n        height: 40px;\n        width: 40px;\n        flex-shrink: 0;\n        place-items: center;\n        border-radius: 12px;\n      }\n      .doc[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: center;\n        gap: 14px;\n        border-top: 1px solid var(--%NS%v2-separateur);\n        padding: 12px 20px;\n      }\n      .doc.old[_ngcontent-%COMP%] {\n        background: color-mix(in oklab, var(--%NS%v2-creme) 55%, transparent);\n      }\n      .act-danger[_ngcontent-%COMP%]:hover {\n        border-color: var(--%NS%v2-erreur-fg);\n        background: var(--%NS%v2-erreur-bg);\n        color: var(--%NS%v2-erreur-fg);\n      }\n      .lbl[_ngcontent-%COMP%] {\n        font-size: 12px;\n        font-weight: 700;\n        letter-spacing: 0.06em;\n        text-transform: uppercase;\n        color: var(--%NS%v2-ardoise);\n      }\n      .check[_ngcontent-%COMP%] {\n        display: flex;\n        align-items: flex-start;\n        gap: 10px;\n        font-size: 14px;\n        font-weight: 600;\n        cursor: pointer;\n      }\n      .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n        margin-top: 2px;\n        height: 20px;\n        width: 20px;\n        accent-color: var(--%NS%v2-foret);\n        cursor: pointer;\n      }\n      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n        flex: 1;\n        justify-content: center;\n      }"]
}), _a);

export { DocumentsPage as default };
//# sourceMappingURL=documents.page-C2VCziKc.mjs.map
