import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Jt as s,Kt as c,Lt as l,Nt as u,St as ee,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gt as v,hn as y,ln as b,mn as x,mt as S,on as C,pn as w,qt as T,tn as E,vt as D,zn as O}from"./_router-chunk-H0-n0SZI.js";import{A as k,At as A,B as j,J as te,K as M,Nt as N,R as ne,W as P,Y as re,jt as F,r as I,t as ie,xt as L}from"./locale.service-Bf8_ncMo.js";import{l as ae,n as oe}from"./snackbar.component-ICe8-MWg.js";import{i as se,n as ce,r as le}from"./payment-provider-Bx4b7190.js";import{t as ue}from"./app-shell.component-CR4uAChA.js";import{t as de}from"./store.service-ZF4OfoGo.js";import{n as fe,t as R}from"./v2-page.styles-Blvl6ZBZ.js";import{t as z}from"./pager-DPeF-1nO.js";import{C as B,S as V,T as pe,a as me,n as he,o as ge,t as _e,w as H}from"./ui-CQhTckzj.js";var ve=(e,t)=>({shown:e,total:t}),U=e=>({name:e}),ye=(e,t)=>({paid:e,expected:t}),be=(e,t)=>({count:e,amount:t}),W=e=>({receipt:e}),xe=e=>({year:e}),Se=(e,t)=>({date:e,name:t}),Ce=e=>({reason:e}),we=(e,t,n)=>({receipt:e,amount:t,period:n}),Te=e=>({scoop:e}),Ee=(e,t)=>t.link.id,G=(e,t)=>t.id,De=(e,t)=>t.member.id,Oe=(e,t)=>t.scoopId;function ke(e,n){if(e&1){let e=l();a(0,`button`,35),t(`click`,function(){p(e);let t=d();return o(t.openEnroll())}),g(1),a(2,`span`,30),u(3,`ui-icon`,36),r()()}if(e&2){let e=d();_(),x(` `,e.t()(`cotisations.enroll.open`)),_(2),f(`size`,20)}}function Ae(e,n){if(e&1){let e=l();a(0,`button`,52),t(`click`,function(){p(e);let t=d(2).$implicit,n=d(3);return o(n.cancelLink(t.link))}),u(1,`ui-icon`,53),r()}if(e&2){let e=d(2).$implicit,t=d(3);f(`title`,t.t()(`cotisations.link.cancel`)),S(`aria-label`,t.t()(`cotisations.link.cancel`)+` · `+e.name),_(),f(`size`,18)}}function je(e,n){if(e&1){let e=l();a(0,`button`,49),t(`click`,function(){p(e);let t=d().$implicit,n=d(3);return o(n.openLink(t.link))}),u(1,`ui-icon`,50),r(),D(2,Ae,2,3,`button`,51)}if(e&2){let e=d().$implicit,t=d(3);f(`title`,t.t()(`cotisations.link.copy`)),S(`aria-label`,t.t()(`cotisations.link.copy`)+` · `+e.name),_(),f(`size`,18),_(),m(t.canManage()?2:-1)}}function Me(e,t){if(e&1&&(a(0,`tr`)(1,`td`,44),g(2),r(),a(3,`td`,45),g(4),r(),a(5,`td`,46),g(6),r(),a(7,`td`)(8,`span`,47),g(9),r()(),a(10,`td`,45),g(11),r(),a(12,`td`)(13,`span`,48),D(14,je,3,4),r()()()),e&2){let e=t.$implicit,n=d(3);_(2),w(e.name),_(2),w(e.link.period),_(2),x(``,n.nf.format(e.link.amount),` FCFA`),_(2),b(`background`,e.tone.bg)(`color`,e.tone.fg),_(),w(n.t()(e.statusKey)),_(2),w(n.fmtDate(e.link.expiresAt)),_(3),m(e.live?14:-1)}}function Ne(t,n){if(t&1&&(a(0,`div`,40)(1,`table`,42)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`,43),g(9),r(),a(10,`th`),g(11),r(),a(12,`th`),g(13),r(),a(14,`th`,43),g(15),r()()(),a(16,`tbody`),h(17,Me,15,10,`tr`,null,Ee),r()()()),t&2){let t=d(2);_(5),w(t.t()(`cotisations.col.member`)),_(2),w(t.t()(`cotisations.links.col.period`)),_(2),w(t.t()(`cotisations.links.col.amount`)),_(2),w(t.t()(`cotisations.links.col.status`)),_(2),w(t.t()(`cotisations.links.col.expires`)),_(2),w(t.t()(`cotisations.row.actions`)),_(2),e(t.linkRows())}}function Pe(e,t){if(e&1&&(a(0,`div`,41)(1,`span`,54),u(2,`ui-icon`,17),r(),a(3,`p`,55),g(4),r(),a(5,`p`,56),g(6),r()()),e&2){let e=d(2);_(2),f(`size`,26),_(2),w(e.t()(`cotisations.links.empty.title`)),_(2),w(e.t()(`cotisations.links.empty.text`))}}function Fe(e,t){if(e&1&&(a(0,`p`,37),u(1,`ui-icon`,38),g(2),r(),a(3,`section`,39),D(4,Ne,19,6,`div`,40)(5,Pe,7,3,`div`,41),r()),e&2){let e=d();_(),f(`size`,18),_(),x(``,e.t()(e.aggregator?`cotisations.links.aggregatorOn`:`cotisations.links.aggregatorOff`),` `),_(2),m(e.linkRows().length?4:5)}}function Ie(e,n){if(e&1){let e=l();a(0,`button`,66),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.state.set(t.id))}),g(1),a(2,`span`,14),g(3),r()()}if(e&2){let e=n.$implicit,t=d(2);v(`on`,t.state()===e.id),S(`aria-checked`,t.state()===e.id),_(),x(` `,e.label),_(),v(`zero`,!e.count),_(),w(t.nf.format(e.count))}}function Le(e,n){if(e&1){let e=l();a(0,`ui-select`,67),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.orgFilter.set(t))}),r()}if(e&2){let e=d(2);f(`label`,e.t()(`cotisations.filter.org`))(`options`,e.orgFilterOptions())(`value`,e.orgFilter())}}function Re(e,t){if(e&1&&(a(0,`span`,81),g(1),r(),a(2,`span`,82),u(3,`span`),r()),e&2){let e=d().$implicit,t=d(3);_(),w(t.t()(`cotisations.row.paidOf`,T(5,ye,t.nf.format(e.dues.paid),t.nf.format(e.dues.expected)))),_(2),b(`width`,t.pct(e.dues),`%`)(`background`,e.dues.balance?`var(--v2-soleil)`:`var(--v2-vert-pousse)`)}}function ze(e,t){if(e&1&&(a(0,`span`,27),g(1),r()),e&2){let e=d(4);_(),w(e.t()(`cotisations.row.nothingDue`))}}function Be(e,n){if(e&1){let e=l();a(0,`button`,49),t(`click`,function(t){p(e);let n=d().$implicit,r=d(3);return t.stopPropagation(),o(r.openPay(n.member.id))}),u(1,`ui-icon`,83),r()}if(e&2){let e=d().$implicit,t=d(3);f(`title`,t.t()(`cotisations.row.pay`)),S(`aria-label`,t.t()(`cotisations.row.payFor`,c(3,U,e.name))),_(),f(`size`,18)}}function Ve(e,n){if(e&1){let e=l();a(0,`tr`,72),t(`click`,function(){let t=p(e).$implicit,n=d(3);return o(n.detailId.set(t.member.id))}),a(1,`td`)(2,`span`,73)(3,`span`,74),g(4),r(),a(5,`span`,2)(6,`span`,75),g(7),r(),a(8,`span`,76),g(9),r()()()(),a(10,`td`,77),g(11),r(),a(12,`td`,77),g(13),r(),a(14,`td`)(15,`span`,47),g(16),r()(),a(17,`td`),D(18,Re,4,8)(19,ze,2,1,`span`,27),r(),a(20,`td`,78),g(21),r(),a(22,`td`)(23,`span`,48),D(24,Be,2,5,`button`,79),a(25,`button`,49),t(`click`,function(t){let n=p(e).$implicit,r=d(3);return t.stopPropagation(),o(r.detailId.set(n.member.id))}),u(26,`ui-icon`,80),r()()()()}if(e&2){let e=n.$implicit,t=d(3);_(3),b(`background`,t.state_[e.dues.state].bg)(`color`,t.state_[e.dues.state].fg),_(),w(t.initials(e.name)),_(3),w(e.name),_(),v(`zero`,!e.member.phone),_(),w(t.store.phone(e.member.phone)||`—`),_(),f(`title`,e.scoop),_(),x(` `,e.scoop,` `),_(),v(`zero`,!e.orgName),f(`title`,e.orgName),_(),x(` `,e.orgName||t.t()(`cotisations.filter.individual`),` `),_(2),b(`background`,t.state_[e.dues.state].bg)(`color`,t.state_[e.dues.state].fg),_(),w(t.t()(t.state_[e.dues.state].label)),_(2),m(e.dues.expected?18:19),_(2),b(`color`,e.dues.balance?`var(--v2-erreur-fg)`:null),v(`zero`,!e.dues.balance),_(),x(` `,t.nf.format(e.dues.balance),` FCFA `),_(3),m(t.canManage()&&e.rule?24:-1),_(),f(`title`,t.t()(`common.view`)),S(`aria-label`,t.t()(`cotisations.row.view`,c(30,U,e.name))),_(),f(`size`,18)}}function He(t,n){if(t&1&&(a(0,`div`,40)(1,`table`,68)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`),g(9),r(),a(10,`th`),g(11),r(),a(12,`th`,69),g(13),r(),a(14,`th`,43),g(15),r(),a(16,`th`,43),g(17),r()()(),a(18,`tbody`),h(19,Ve,27,32,`tr`,70,De),r()()(),u(21,`ui-pagination`,71)),t&2){let t=d(2);_(5),w(t.t()(`cotisations.col.member`)),_(2),w(t.t()(`cotisations.col.scoop`)),_(2),w(t.t()(`cotisations.col.org`)),_(2),w(t.t()(`cotisations.col.state`)),_(2),w(t.t()(`cotisations.col.paid`)),_(2),w(t.t()(`cotisations.col.balance`)),_(2),w(t.t()(`cotisations.row.actions`)),_(2),e(t.pager.items()),_(2),f(`pager`,t.pager)}}function Ue(e,t){if(e&1&&(a(0,`p`,55),g(1),r(),a(2,`p`,56),g(3),r()),e&2){let e=d(3);_(),x(` `,e.t()(`cotisations.empty.filtered.title`),` `),_(2),w(e.t()(`cotisations.empty.filtered.text`))}}function We(e,t){if(e&1&&(a(0,`p`,55),g(1),r(),a(2,`p`,56),g(3),r()),e&2){let e=d(3);_(),x(` `,e.t()(`cotisations.empty.noMembers.title`),` `),_(2),w(e.t()(`cotisations.empty.noMembers.text`))}}function Ge(e,t){if(e&1&&(a(0,`div`,41)(1,`span`,54),u(2,`ui-icon`,84),r(),D(3,Ue,4,2)(4,We,4,2),r()),e&2){let e=d(2);_(2),f(`size`,26),_(),m(e.rows().length?3:4)}}function Ke(n,i){if(n&1){let e=l();a(0,`div`,57)(1,`label`,58),u(2,`ui-icon`,59),a(3,`input`,60),t(`input`,function(t){p(e);let n=d();return o(n.q.set(t.target.value))}),r()(),a(4,`div`,61),h(5,Ie,4,7,`button`,62,G),r(),D(7,Le,1,3,`ui-select`,63),r(),a(8,`p`,64),g(9),r(),a(10,`section`,65),D(11,He,22,8)(12,Ge,5,2,`div`,41),r()}if(n&2){let t=d();_(2),f(`size`,20),_(),f(`placeholder`,t.t()(`cotisations.search.placeholder`))(`value`,t.q()),S(`aria-label`,t.t()(`cotisations.search.aria`)),_(),S(`aria-label`,t.t()(`cotisations.filter.aria`)),_(),e(t.stateButtons()),_(2),m(t.orgFilterOptions().length>2?7:-1),_(2),x(` `,t.t()(t.shown().length>1?`cotisations.count.autre`:`cotisations.count.un`,T(8,ve,t.nf.format(t.shown().length),t.nf.format(t.rows().length))),` `),_(2),m(t.shown().length?11:12)}}function qe(e,n){if(e&1){let e=l();a(0,`button`,66),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.pStatus.set(t.id))}),g(1),a(2,`span`,14),g(3),r()()}if(e&2){let e=n.$implicit,t=d(2);v(`on`,t.pStatus()===e.id),S(`aria-checked`,t.pStatus()===e.id),_(),x(` `,e.label),_(),v(`zero`,!e.count),_(),w(t.nf.format(e.count))}}function Je(e,t){if(e&1&&(a(0,`span`,97),g(1),r(),a(2,`span`,98),g(3),r()),e&2){let e=d().$implicit,t=d(3);_(),x(``,t.nf.format(e.amount),` FCFA`),_(2),w(t.t()(`cotisations.journal.reversalTag`))}}function Ye(e,t){if(e&1&&(a(0,`span`,94),g(1),r()),e&2){let e=d(4);_(),w(e.t()(`cotisations.sheet.history.voidTag`))}}function Xe(e,t){if(e&1&&g(0),e&2){let e=d().$implicit,t=d(3);x(` `,t.nf.format(e.amount),` FCFA `)}}function Ze(e,n){if(e&1){let e=l();a(0,`button`,52),t(`click`,function(t){p(e);let n=d().$implicit,r=d(3);return t.stopPropagation(),o(r.openVoid(n.id))}),u(1,`ui-icon`,53),r()}if(e&2){let e=d().$implicit,t=d(3);f(`title`,t.t()(`cotisations.row.void`)),S(`aria-label`,t.t()(`cotisations.journal.void`,c(3,W,e.receipt))),_(),f(`size`,18)}}function Qe(e,n){if(e&1){let e=l();a(0,`tr`,72),t(`click`,function(){let t=p(e).$implicit,n=d(3);return o(n.receiptId.set(t.id))}),a(1,`td`,89),g(2),r(),a(3,`td`)(4,`span`,90),g(5),r()(),a(6,`td`)(7,`span`,91),g(8),r(),a(9,`span`,92),g(10),r()(),a(11,`td`,93),g(12),r(),a(13,`td`,78),D(14,Je,4,2)(15,Ye,2,1,`span`,94)(16,Xe,1,1),r(),a(17,`td`)(18,`span`,95),g(19),r()(),a(20,`td`,96),g(21),r(),a(22,`td`)(23,`span`,48),D(24,Ze,2,5,`button`,51),a(25,`button`,49),t(`click`,function(t){let n=p(e).$implicit,r=d(3);return t.stopPropagation(),o(r.receiptId.set(n.id))}),u(26,`ui-icon`,15),r()()()()}if(e&2){let e=n.$implicit,t=d(3);v(`voided`,!!e.voided||!!e.reversalOf),_(2),x(` `,t.fmtDate(e.paidAt),` `),_(3),w(e.receipt),_(3),w(t.memberName(e.memberId)),_(2),w(t.scoopName(e.scoopId)),_(2),w(e.period),_(2),m(e.reversalOf?14:e.voided?15:16),_(5),w(t.t()(t.methodKey(e.method))),_(2),w(e.recordedBy),_(3),m(t.canManage()&&!e.voided&&!e.reversalOf?24:-1),_(),f(`title`,t.t()(`cotisations.receipt.title`)),S(`aria-label`,t.t()(`cotisations.receipt.view`,c(14,W,e.receipt))),_(),f(`size`,18)}}function $e(t,n){if(t&1&&(a(0,`div`,40)(1,`table`,87)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`),g(9),r(),a(10,`th`),g(11),r(),a(12,`th`,43),g(13),r(),a(14,`th`),g(15),r(),a(16,`th`),g(17),r(),a(18,`th`,43),g(19),r()()(),a(20,`tbody`),h(21,Qe,27,16,`tr`,88,G),r()()(),u(23,`ui-pagination`,71)),t&2){let t=d(2);_(5),w(t.t()(`cotisations.journal.col.date`)),_(2),w(t.t()(`cotisations.journal.col.receipt`)),_(2),w(t.t()(`cotisations.journal.col.member`)),_(2),w(t.t()(`cotisations.journal.col.period`)),_(2),w(t.t()(`cotisations.journal.col.amount`)),_(2),w(t.t()(`cotisations.journal.col.method`)),_(2),w(t.t()(`cotisations.journal.col.by`)),_(2),w(t.t()(`cotisations.row.actions`)),_(2),e(t.journalPager.items()),_(2),f(`pager`,t.journalPager)}}function et(e,t){if(e&1&&(a(0,`div`,41)(1,`span`,54),u(2,`ui-icon`,15),r(),a(3,`p`,55),g(4),r()()),e&2){let e=d(2);_(2),f(`size`,26),_(2),w(e.t()(`cotisations.journal.empty`))}}function tt(n,i){if(n&1){let e=l();a(0,`div`,85)(1,`label`,58),u(2,`ui-icon`,59),a(3,`input`,60),t(`input`,function(t){p(e);let n=d();return o(n.pq.set(t.target.value))}),r()(),a(4,`ui-select`,86),t(`valueChange`,function(t){p(e);let n=d();return o(n.pMethod.set(t))}),r(),a(5,`div`,61),h(6,qe,4,7,`button`,62,G),r()(),a(8,`p`,64),g(9),r(),a(10,`section`,65),D(11,$e,24,9)(12,et,5,2,`div`,41),r()}if(n&2){let t=d();_(2),f(`size`,20),_(),f(`placeholder`,t.t()(`cotisations.journal.search`))(`value`,t.pq()),S(`aria-label`,t.t()(`cotisations.journal.search`)),_(),f(`label`,t.t()(`cotisations.journal.col.method`))(`options`,t.methodOptions())(`value`,t.pMethod()),_(),S(`aria-label`,t.t()(`cotisations.journal.col.receipt`)),_(),e(t.payStatusButtons()),_(3),x(` `,t.t()(`cotisations.journal.total`,T(10,be,t.nf.format(t.journalTotals().count),t.nf.format(t.journalTotals().amount))),` `),_(2),m(t.journal().length?11:12)}}function nt(e,t){if(e&1&&(a(0,`p`,110),g(1),r(),a(2,`p`,111),g(3),r()),e&2){let e=d().$implicit,t=d(3);_(),x(` `,e.summary,` `),_(2),x(` `,t.t()(`cotisations.rule.since`,c(2,xe,e.startYear??``)),` `)}}function rt(e,t){if(e&1&&(a(0,`span`,47),g(1),r()),e&2){let e=d().$implicit,t=d(3);b(`background`,e.confirmed?`var(--v2-sauge)`:`var(--v2-attente-bg)`)(`color`,e.confirmed?`var(--v2-vert-pousse)`:`var(--v2-attente-fg)`),_(),x(` `,e.confirmed?t.t()(`cotisations.rule.confirmed`):t.t()(`cotisations.rule.toConfirm`),` `)}}function it(e,t){if(e&1&&(a(0,`span`,108),g(1),r()),e&2){let e=d(4);_(),w(e.t()(`cotisations.rules.missing`))}}function at(e,n){if(e&1){let e=l();a(0,`button`,112),t(`click`,function(){p(e);let t=d().$implicit,n=d(3);return o(n.openRule(t.scoopId))}),u(1,`ui-icon`,113),g(2),r()}if(e&2){let e=d().$implicit,t=d(3);_(),f(`size`,18),_(),x(``,e.summary?t.t()(`cotisations.rule.edit`):t.t()(`cotisations.rule.define`),` `)}}function ot(e,t){if(e&1&&(a(0,`div`,101)(1,`div`,102)(2,`span`,103),u(3,`ui-icon`,16),r(),a(4,`div`,104)(5,`p`,105),g(6),r(),D(7,nt,4,4),r()(),a(8,`div`,106),D(9,rt,2,5,`span`,107)(10,it,2,1,`span`,108),D(11,at,3,2,`button`,109),r()()),e&2){let e=t.$implicit,n=d(3);_(2),b(`background`,e.summary?`var(--v2-foret)`:`var(--v2-erreur-bg)`)(`color`,e.summary?`var(--v2-citron)`:`var(--v2-erreur-fg)`),_(),f(`size`,20),_(2),f(`title`,e.scoop),_(),x(` `,e.scoop,` `),_(),m(e.summary?7:-1),_(2),m(e.summary?9:10),_(2),m(n.canManage()?11:-1)}}function st(t,n){if(t&1&&(a(0,`div`,99),h(1,ot,12,10,`div`,101,Oe),r()),t&2){let t=d(2);_(),e(t.rules())}}function ct(e,t){if(e&1&&(a(0,`p`,100),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`cotisations.rules.none`))}}function lt(e,t){if(e&1&&D(0,st,3,0,`div`,99)(1,ct,2,1,`p`,100),e&2){let e=d();m(+!e.rules().length)}}function ut(e,n){if(e&1){let e=l();a(0,`ui-text-field`,127),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.payOther.set(t))}),r()}if(e&2){let e=d(),t=d();f(`placeholder`,e.rule?.periodicity===`mensuelle`?t.t()(`ui.field.ph.month`):``)(`label`,t.t()(`cotisations.payDialog.otherLabel`))(`hint`,t.t()(e.rule?.periodicity===`mensuelle`?`cotisations.payDialog.otherHint.mensuelle`:`cotisations.payDialog.otherHint.annuelle`))(`value`,t.payOther())}}function dt(e,n){if(e&1){let e=l();a(0,`button`,66),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.payMethod.set(t))}),g(1),r()}if(e&2){let e=n.$implicit,t=d(2);v(`on`,t.payMethod()===e),S(`aria-checked`,t.payMethod()===e),_(),x(` `,t.t()(t.methodKey(e)),` `)}}function ft(e,n){if(e&1){let e=l();a(0,`ui-text-field`,128),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.payReference.set(t))}),r()}if(e&2){let e=d(2);f(`label`,e.t()(`cotisations.payDialog.reference`))(`optional`,e.t()(`cotisations.optional`))(`hint`,e.t()(`cotisations.payDialog.referenceHint`))(`value`,e.payReference())}}function pt(n,i){if(n&1){let e=l();a(0,`ui-modal`,114),t(`closed`,function(){p(e);let t=d();return o(t.payId.set(null))}),a(1,`div`,115)(2,`div`)(3,`p`,116),g(4),r(),a(5,`ui-select`,117),t(`valueChange`,function(t){p(e);let n=d();return o(n.choosePeriod(t))}),r()(),D(6,ut,1,4,`ui-text-field`,118),a(7,`ui-text-field`,119),t(`valueChange`,function(t){p(e);let n=d();return n.payAmount.set(t),o(n.payError.set(``))}),r(),a(8,`div`)(9,`p`,116),g(10),r(),a(11,`div`,120),h(12,dt,2,4,`button`,62,E),r()(),D(14,ft,1,4,`ui-text-field`,121),a(15,`ui-text-field`,122),t(`valueChange`,function(t){p(e);let n=d();return o(n.payDate.set(t))}),r(),a(16,`ui-text-field`,123),t(`valueChange`,function(t){p(e);let n=d();return o(n.payNote.set(t))}),r(),a(17,`p`,124),u(18,`ui-icon`,125),g(19),r()(),a(20,`button`,28),t(`click`,function(){p(e);let t=d();return o(t.payId.set(null))}),g(21),r(),a(22,`button`,28),t(`click`,function(){p(e);let t=d();return o(t.submitLink())}),u(23,`ui-icon`,17),g(24),r(),a(25,`button`,126),t(`click`,function(){p(e);let t=d();return o(t.submitPay())}),g(26),a(27,`span`,30),u(28,`ui-icon`,31),r()()()}if(n&2){let t=d();f(`open`,!0)(`title`,t.t()(`cotisations.payDialog.title`))(`description`,t.t()(`cotisations.payDialog.description`,c(29,U,i.name)))(`width`,560)(`closeLabel`,t.t()(`common.close`)),_(4),w(t.t()(`cotisations.payDialog.period`)),_(),f(`label`,t.t()(`cotisations.payDialog.period`))(`options`,t.periodOptions())(`value`,t.payPeriod()),_(),m(t.payPeriod()===t.other?6:-1),_(),f(`label`,t.t()(`cotisations.payDialog.amount`))(`hint`,t.t()(`cotisations.payDialog.amountHint`))(`value`,t.payAmount())(`error`,t.payError()),_(3),w(t.t()(`cotisations.payDialog.method`)),_(),S(`aria-label`,t.t()(`cotisations.payDialog.method`)),_(),e(t.methods),_(2),m(t.payMethod()===`espèces`?-1:14),_(),f(`label`,t.t()(`cotisations.payDialog.date`))(`hint`,t.t()(`cotisations.payDialog.dateHint`))(`value`,t.payDate()),_(),f(`label`,t.t()(`cotisations.payDialog.note`))(`value`,t.payNote()),_(2),f(`size`,16),_(),x(``,t.t()(`cotisations.payDialog.footer`),` `),_(2),x(` `,t.t()(`cotisations.cancel`),` `),_(2),f(`size`,18),_(),x(``,t.t()(`cotisations.payDialog.createLink`),` `),_(2),x(` `,t.t()(`cotisations.payDialog.submit`),` `),_(2),f(`size`,18)}}function mt(e,t){if(e&1&&(a(0,`a`,140),u(1,`ui-icon`,142),g(2),r()),e&2){let e=d(),t=d();f(`href`,e.mail,C),_(),f(`size`,18),_(),w(t.t()(`cotisations.link.email`))}}function ht(e,n){if(e&1){let e=l();a(0,`ui-modal`,129),t(`closed`,function(){p(e);let t=d();return o(t.linkShown.set(null))}),a(1,`div`,22)(2,`dl`,130)(3,`div`)(4,`dt`),g(5),r(),a(6,`dd`),g(7),r()(),a(8,`div`)(9,`dt`),g(10),r(),a(11,`dd`),g(12),r()(),a(13,`div`)(14,`dt`),g(15),r(),a(16,`dd`),g(17),r()()(),a(18,`p`,131),g(19),r(),a(20,`div`,132)(21,`button`,133),t(`click`,function(){let t=p(e),n=d();return o(n.copyLink(t.url))}),u(22,`ui-icon`,50),g(23),r(),a(24,`button`,134),t(`click`,function(){let t=p(e),n=d();return o(n.copyLink(t.message))}),u(25,`ui-icon`,135),g(26),r(),a(27,`a`,136),u(28,`ui-icon`,137),g(29),r(),a(30,`a`,138),u(31,`ui-icon`,139),g(32),r(),D(33,mt,3,3,`a`,140),r(),a(34,`p`,141),u(35,`ui-icon`,38),g(36),r()(),a(37,`button`,126),t(`click`,function(){p(e);let t=d();return o(t.linkShown.set(null))}),g(38),a(39,`span`,30),u(40,`ui-icon`,31),r()()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`cotisations.link.title`,c(27,U,e.name)))(`description`,t.t()(`cotisations.link.description`))(`width`,600)(`closeLabel`,t.t()(`common.close`)),_(5),w(t.t()(`cotisations.links.col.period`)),_(2),w(e.link.period),_(3),w(t.t()(`cotisations.links.col.amount`)),_(2),x(``,t.nf.format(e.link.amount),` FCFA`),_(3),w(t.t()(`cotisations.links.col.expires`)),_(2),w(t.fmtDate(e.link.expiresAt)),_(2),w(e.url),_(3),f(`size`,18),_(),x(``,t.linkCopied()?t.t()(`cotisations.link.copied`):t.t()(`cotisations.link.copy`),` `),_(2),f(`size`,18),_(),x(``,t.t()(`cotisations.link.copyMessage`),` `),_(),f(`href`,e.whatsapp,C),_(),f(`size`,18),_(),w(t.t()(`cotisations.link.whatsapp`)),_(),f(`href`,e.sms,C),_(),f(`size`,18),_(),w(t.t()(`cotisations.link.sms`)),_(),m(e.mail?33:-1),_(2),f(`size`,18),_(),w(t.t()(t.aggregator?`cotisations.links.aggregatorOn`:`cotisations.links.aggregatorOff`)),_(2),x(` `,t.t()(`cotisations.link.done`)),_(2),f(`size`,18)}}function gt(e,n){if(e&1){let e=l();a(0,`ui-select`,143),t(`valueChange`,function(t){p(e);let n=d();return n.enrollScoop.set(t),o(n.enrollPick.set(``))}),r()}if(e&2){let e=d();f(`label`,e.t()(`documents.add.scoop`))(`options`,e.enrollScoops())(`value`,e.enrollScoop())}}function _t(e,n){if(e&1){let e=l();a(0,`li`)(1,`label`,144)(2,`input`,145),t(`change`,function(){let t=p(e).$implicit,n=d(2);return o(n.enrollPick.set(t.id))}),r(),a(3,`span`,146),g(4),r(),a(5,`span`,147),g(6),r()()()}if(e&2){let e=n.$implicit,t=d(2);_(2),f(`checked`,t.enrollPick()===e.id),_(2),y(``,e.firstName,` `,e.lastName),_(2),w(e.orgName||t.t()(`cotisations.filter.individual`))}}function vt(t,n){if(t&1&&(a(0,`ul`,25),h(1,_t,7,4,`li`,null,G),r()),t&2){let t=d();S(`aria-label`,t.t()(`cotisations.enroll.listAria`)),_(),e(t.enrollCandidates())}}function yt(e,t){if(e&1&&(a(0,`p`,26),g(1),r()),e&2){let e=d();_(),w(e.t()(`cotisations.enroll.none`))}}function bt(e,t){if(e&1&&(a(0,`div`)(1,`dt`),g(2),r(),a(3,`dd`),g(4),r()()),e&2){let e=d(),t=d();_(2),w(t.t()(`cotisations.receipt.reference`)),_(2),w(e.p.reference)}}function xt(e,t){if(e&1&&(a(0,`div`)(1,`dt`),g(2),r(),a(3,`dd`),g(4),r()()),e&2){let e=d(),t=d();_(2),w(t.t()(`cotisations.receipt.note`)),_(2),w(e.p.note)}}function St(e,t){if(e&1&&(a(0,`p`,154),g(1),r()),e&2){let e=t,n=d(2);_(),y(` `,n.t()(`cotisations.receipt.voided`,T(2,Se,n.fmtDate(e.at),e.by)),` · `,n.t()(`cotisations.sheet.history.reason`,c(5,Ce,e.reason)),` `)}}function Ct(e,n){if(e&1){let e=l();a(0,`button`,159),t(`click`,function(){p(e);let t=d(),n=d();return o(n.openVoid(t.p.id))}),g(1),r()}if(e&2){let e=d(2);_(),x(` `,e.t()(`cotisations.sheet.void`),` `)}}function wt(e,n){if(e&1){let e=l();a(0,`ui-modal`,148),t(`closed`,function(){p(e);let t=d();return o(t.receiptId.set(null))}),a(1,`div`,149)(2,`div`,150)(3,`div`)(4,`p`,3),g(5),r(),a(6,`p`,55),g(7),r()(),a(8,`span`,90),g(9),r()(),a(10,`div`,151)(11,`p`,3),g(12),r(),a(13,`p`,152),g(14),r()(),a(15,`dl`,153)(16,`div`)(17,`dt`),g(18),r(),a(19,`dd`),g(20),r()(),a(21,`div`)(22,`dt`),g(23),r(),a(24,`dd`),g(25),r()(),a(26,`div`)(27,`dt`),g(28),r(),a(29,`dd`),g(30),r()(),a(31,`div`)(32,`dt`),g(33),r(),a(34,`dd`),g(35),r()(),a(36,`div`)(37,`dt`),g(38),r(),a(39,`dd`),g(40),r()(),D(41,bt,5,2,`div`),D(42,xt,5,2,`div`),r(),D(43,St,2,7,`p`,154),a(44,`p`,155),g(45),r()(),u(46,`div`,156),D(47,Ct,2,1,`button`,157),a(48,`button`,126),t(`click`,function(){let t=p(e),n=d();return o(n.printReceipt(t))}),g(49),a(50,`span`,30),u(51,`ui-icon`,158),r()()()}if(e&2){let e,t=n,r=d();f(`open`,!0)(`title`,r.t()(`cotisations.receipt.title`))(`description`,r.t()(`cotisations.receipt.number`,c(35,W,t.p.receipt)))(`width`,560)(`closeLabel`,r.t()(`common.close`)),_(),v(`is-void`,!!t.p.voided),_(4),x(` `,r.t()(`cotisations.receipt.coop`),` `),_(2),w(t.scoop),_(2),w(t.p.receipt),_(),b(`background`,t.p.voided?`var(--v2-lin)`:`var(--v2-sauge)`),_(2),x(` `,r.t()(`cotisations.receipt.amount`),` `),_(),b(`color`,t.p.voided?`var(--v2-gris-texte)`:`var(--v2-vert-pousse)`)(`text-decoration`,t.p.voided?`line-through`:null),_(),x(` `,r.nf.format(t.p.amount),` FCFA `),_(4),w(r.t()(`cotisations.receipt.from`)),_(2),w(t.member),_(3),w(r.t()(`cotisations.receipt.period`)),_(2),w(t.p.period),_(3),w(r.t()(`cotisations.receipt.date`)),_(2),w(r.fmtDate(t.p.paidAt)),_(3),w(r.t()(`cotisations.receipt.method`)),_(2),w(r.t()(r.methodKey(t.p.method))),_(3),w(r.t()(`cotisations.receipt.by`)),_(2),w(t.p.recordedBy),_(),m(t.p.reference?41:-1),_(),m(t.p.note?42:-1),_(),m((e=t.p.voided)?43:-1,e),_(2),x(` `,r.t()(`cotisations.receipt.footer`),` `),_(2),m(r.canManage()&&!t.p.voided?47:-1),_(2),x(` `,r.t()(`cotisations.receipt.print`),` `),_(2),f(`size`,18)}}function Tt(e,n){if(e&1){let e=l();a(0,`ui-modal`,160),t(`closed`,function(){p(e);let t=d();return o(t.voidId.set(null))}),a(1,`p`,161),g(2),r(),a(3,`label`,162),g(4),r(),a(5,`textarea`,163),t(`input`,function(t){p(e);let n=d();return o(n.voidReason.set(t.target.value))}),r(),a(6,`p`,164),g(7),r(),a(8,`button`,28),t(`click`,function(){p(e);let t=d();return o(t.voidId.set(null))}),g(9),r(),a(10,`button`,165),t(`click`,function(){let t=p(e),n=d();return o(n.submitVoid(t.id))}),g(11),r()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`cotisations.voidDialog.title`))(`description`,t.t()(`cotisations.voidDialog.description`))(`width`,540)(`closeLabel`,t.t()(`common.close`)),_(2),y(` `,t.t()(`cotisations.voidDialog.option`,s(14,we,e.receipt,t.nf.format(e.amount),e.period)),` · `,t.memberName(e.memberId),` `),_(2),w(t.t()(`cotisations.voidDialog.reason`)),_(),f(`placeholder`,t.t()(`cotisations.voidDialog.reasonHint`))(`value`,t.voidReason()),_(2),w(t.t()(`cotisations.voidDialog.reasonHint`)),_(2),x(` `,t.t()(`cotisations.voidDialog.back`),` `),_(),f(`disabled`,t.voidReason().trim().length<3),_(),x(` `,t.t()(`cotisations.voidDialog.submit`),` `)}}function Et(e,n){if(e&1){let e=l();a(0,`div`)(1,`p`,116),g(2),r(),a(3,`div`,173)(4,`ui-select`,174),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.rMonth.set(t))}),r(),a(5,`ui-text-field`,175),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.rDay.set(t))}),r()(),a(6,`p`,176),g(7),r()()}if(e&2){let e=d(2);_(2),w(e.t()(`cotisations.ruleDialog.dueDate`)),_(2),f(`label`,e.t()(`cotisations.ruleDialog.dueMonth`))(`options`,e.monthOptions())(`value`,e.rMonth()),_(),f(`label`,e.t()(`cotisations.ruleDialog.dueDay`))(`maxlength`,2)(`value`,e.rDay())(`error`,e.rErr().day??``),_(2),w(e.t()(`cotisations.ruleDialog.dueHint`))}}function K(e,t){if(e&1&&(a(0,`p`,168),g(1),r()),e&2){let e=d(2);_(),x(` `,e.t()(`cotisations.ruleDialog.monthlyHint`),` `)}}function Dt(e,n){if(e&1){let e=l();a(0,`ui-modal`,166),t(`closed`,function(){p(e);let t=d();return o(t.ruleFor.set(null))}),a(1,`div`,167)(2,`ui-text-field`,119),t(`valueChange`,function(t){p(e);let n=d();return o(n.rAmount.set(t))}),r(),a(3,`div`)(4,`p`,116),g(5),r(),a(6,`div`,120)(7,`button`,66),t(`click`,function(){p(e);let t=d();return o(t.rPeriodicity.set(`annuelle`))}),g(8),r(),a(9,`button`,66),t(`click`,function(){p(e);let t=d();return o(t.rPeriodicity.set(`mensuelle`))}),g(10),r()()(),D(11,Et,8,9,`div`)(12,K,2,1,`p`,168),a(13,`ui-text-field`,169),t(`valueChange`,function(t){p(e);let n=d();return o(n.rYear.set(t))}),r(),a(14,`label`,170)(15,`input`,171),t(`change`,function(t){p(e);let n=d();return o(n.rConfirmed.set(t.target.checked))}),r(),a(16,`span`),g(17),a(18,`span`,172),g(19),r()()()(),a(20,`button`,28),t(`click`,function(){p(e);let t=d();return o(t.ruleFor.set(null))}),g(21),r(),a(22,`button`,126),t(`click`,function(){let t=p(e),n=d();return o(n.submitRule(t.id))}),g(23),a(24,`span`,30),u(25,`ui-icon`,31),r()()()}if(e&2){let e=d();f(`open`,!0)(`title`,e.t()(`cotisations.ruleDialog.titleScoop`,c(30,Te,n.name)))(`description`,e.t()(`cotisations.ruleDialog.description`))(`width`,600)(`closeLabel`,e.t()(`common.close`)),_(2),f(`label`,e.t()(`cotisations.ruleDialog.amount`))(`hint`,e.t()(`cotisations.ruleDialog.amountHint`))(`value`,e.rAmount())(`error`,e.rErr().amount??``),_(3),w(e.t()(`cotisations.ruleDialog.periodicity`)),_(),S(`aria-label`,e.t()(`cotisations.ruleDialog.periodicity`)),_(),v(`on`,e.rPeriodicity()===`annuelle`),S(`aria-checked`,e.rPeriodicity()===`annuelle`),_(),x(` `,e.t()(`cotisations.periodicity.annuelle`),` `),_(),v(`on`,e.rPeriodicity()===`mensuelle`),S(`aria-checked`,e.rPeriodicity()===`mensuelle`),_(),x(` `,e.t()(`cotisations.periodicity.mensuelle`),` `),_(),m(e.rPeriodicity()===`annuelle`?11:12),_(2),f(`label`,e.t()(`cotisations.ruleDialog.startYear`))(`maxlength`,4)(`value`,e.rYear())(`error`,e.rErr().year??``),_(2),f(`checked`,e.rConfirmed()),_(2),w(e.t()(`cotisations.ruleDialog.confirmed`)),_(2),w(e.t()(`cotisations.ruleDialog.confirmedHint`)),_(2),x(` `,e.t()(`cotisations.cancel`),` `),_(2),x(` `,e.t()(`cotisations.ruleDialog.submit`),` `),_(2),f(`size`,18)}}var Ot=[`à jour`,`en retard`,`jamais payé`,`non exigible`],q={"à jour":{label:`cotisations.state.à jour`,...R.succes},"en retard":{label:`cotisations.state.en retard`,...R.erreur},"jamais payé":{label:`cotisations.state.jamais payé`,...R.attente},"non exigible":{label:`cotisations.state.non exigible`,...R.neutre}},J=`__tous`,Y=`__autre`,X=()=>{let e=new Date;return`${e.getFullYear()}-${String(e.getMonth()+1).padStart(2,`0`)}-${String(e.getDate()).padStart(2,`0`)}`},Z=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),Q=`__individuel`,$=e=>!!e.voided||!!e.reversalOf,kt=class e{constructor(){this.store=O(de),this.locale=O(ie),this.snackbar=O(oe),this.t=this.locale.t,this.nf=P,this.initials=fe,this.fmtDate=j,this.state_=q,this.methods=k,this.other=Y,this.q=i(``),this.state=i(J),this.orgFilter=i(J),this.detailId=i(null),this.canManage=n(()=>this.store.can(`contribution.manage`)),this.rows=n(()=>{let e=this.store.state(),t=e.session,n=F(e.payments,t),r=N(e.contributionRules,t),i=new Map(e.scoops.map(e=>[e.id,e.name])),a=new Date().toISOString();return M(A(e.members,t)).map(t=>{let o=r.find(e=>e.scoopId===t.scoopId);return{member:t,name:`${t.firstName} ${t.lastName}`,scoop:i.get(t.scoopId)??t.scoopId,orgId:t.orgId??``,orgName:t.orgId?e.orgs.find(e=>e.id===t.orgId)?.name??``:``,dues:te(t,o,n,a),rule:o}}).sort((e,t)=>t.dues.balance-e.dues.balance||e.name.localeCompare(t.name))}),this.totals=n(()=>{let e=this.store.state(),t=e.session,n=M(A(e.members,t)),r=F(e.payments,t),i=N(e.contributionRules,t),a=new Date().toISOString(),o=0,s=0,c=0,l=new Map;for(let e of n)l.set(e.scoopId,[...l.get(e.scoopId)??[],e]);for(let[e,t]of l){let n=re(t,i.find(t=>t.scoopId===e),r,a);o+=n.expected,s+=n.collected,c+=n.late}return{expected:o,collected:s,late:c,members:n.length,rate:o?Math.round(s/o*100):0}}),this.stats=n(()=>{let e=this.t(),t=this.totals();return[{label:e(`cotisations.kpi.expected`),value:`${P.format(t.expected)} F`,sub:e(t.members>1?`cotisations.kpi.expectedSub.autre`:`cotisations.kpi.expectedSub.un`,{count:P.format(t.members)}),icon:`account_balance_wallet`,bg:``,fg:``},{label:e(`cotisations.kpi.collected`),value:`${P.format(t.collected)} F`,sub:e(`cotisations.kpi.collectedSub`),icon:`check_circle`,...R.succes},{label:e(`cotisations.kpi.rate`),value:`${t.rate} %`,sub:e(`cotisations.kpi.rateSub`),icon:`trending_up`,...R.info},{label:e(`cotisations.kpi.late`),value:P.format(t.late),sub:e(t.late===0?`cotisations.kpi.lateSub.zero`:t.late>1?`cotisations.kpi.lateSub.autre`:`cotisations.kpi.lateSub.un`),icon:`warning`,...t.late?R.erreur:R.succes}]}),this.rules=n(()=>{let e=this.store.state(),t=N(e.contributionRules,e.session);return L(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session).map(e=>e.id).map(n=>{let r=t.find(e=>e.scoopId===n);return{scoopId:n,scoop:e.scoops.find(e=>e.id===n)?.name??n,summary:r?this.ruleSummary(r):``,confirmed:!!r?.confirmed,startYear:r?.startYear??null}}).sort((e,t)=>Number(!!e.summary)-Number(!!t.summary)||e.scoop.localeCompare(t.scoop))}),this.confirmedRules=n(()=>this.rules().filter(e=>e.confirmed).length),this.stateButtons=n(()=>{let e=this.t(),t=this.searched();return[{id:J,label:e(`cotisations.filter.all`),count:t.length},...Ot.map(n=>({id:n,label:e(q[n].label),count:t.filter(e=>e.dues.state===n).length}))]}),this.searched=n(()=>{let e=Z(this.q().trim()),t=this.orgFilter();return this.rows().filter(n=>(!e||Z(`${n.name} ${n.scoop} ${n.orgName}`).includes(e))&&(t===J||(t===Q?!n.orgId:n.orgId===t)))}),this.orgFilterOptions=n(()=>{let e=this.rows(),t=[...new Set(e.map(e=>e.orgId).filter(Boolean))],n=new Map(e.map(e=>[e.orgId,e.orgName]));return[{value:J,label:this.t()(`cotisations.filter.allOrgs`),hint:P.format(e.length)},{value:Q,label:this.t()(`cotisations.filter.individual`),hint:P.format(e.filter(e=>!e.orgId).length)},...t.map(t=>({value:t,label:n.get(t)||t,hint:P.format(e.filter(e=>e.orgId===t).length)})).sort((e,t)=>e.label.localeCompare(t.label))]}),this.shown=n(()=>{let e=this.state();return this.searched().filter(t=>e===J||t.dues.state===e)}),this.pager=z(()=>this.shown()),this.detail=n(()=>{let e=this.detailId(),t=e?this.rows().find(t=>t.member.id===e):null;if(!t)return null;let n=this.t(),r=this.store.state().payments.filter(e=>e.memberId===t.member.id).sort((e,t)=>t.paidAt.localeCompare(e.paidAt)),i=q[t.dues.state],a=[...t.dues.lines].sort((e,t)=>t.period.localeCompare(e.period));return{title:t.name,subtitle:[t.member.village,t.scoop].filter(Boolean).join(` · `),icon:`account_balance_wallet`,badges:[{label:n(i.label),bg:i.bg,fg:i.fg}],kpis:[H(n(`cotisations.sheet.expected`),t.dues.expected,`account_balance_wallet`,R.info,`${P.format(t.dues.expected)} F`),H(n(`cotisations.sheet.paid`),t.dues.paid,`check_circle`,R.succes,`${P.format(t.dues.paid)} F`),H(n(`cotisations.sheet.balance`),t.dues.balance,`payments`,t.dues.balance?R.erreur:R.succes,`${P.format(t.dues.balance)} F`)],facts:[B(n(`cotisations.col.scoop`),t.scoop,`apartment`),B(n(`producteurs.col.phone`),this.store.phone(t.member.phone)||null,`call`),B(n(`cooperatives.fiche.detail.joined`),t.member.joinedAt?j(t.member.joinedAt):null,`calendar_today`),B(n(`cotisations.detail.rule`),t.rule?this.ruleSummary(t.rule):n(`cotisations.sheet.noRule`),`gavel`,{wide:!0})],sections:[{title:n(`cotisations.detail.lines`),icon:`event_note`,count:a.length||null,empty:n(`cotisations.sheet.due.none`),items:a.slice(0,8).map(e=>{let t=Math.max(0,e.expected-e.paid);return{label:e.period,sub:n(`cotisations.sheet.due.line`,{paid:P.format(e.paid),expected:P.format(e.expected)}),badge:t?{label:n(`cotisations.sheet.due.left`,{amount:P.format(t)}),...R.erreur}:{label:n(`cotisations.sheet.due.done`),...R.succes}}}),more:Math.max(0,a.length-8)},{title:n(`cotisations.sheet.history.title`),icon:`receipt_long`,count:r.length||null,empty:n(`cotisations.sheet.history.none`),items:r.slice(0,8).map(e=>({label:`${P.format(e.amount)} FCFA · ${n(`cotisations.sheet.history.receipt`,{receipt:e.receipt})}`,sub:`${n(`cotisations.sheet.history.period`,{period:e.period})} · ${n(this.methodKey(e.method))} · ${j(e.paidAt)}`,...e.voided?{badge:{label:n(`cotisations.sheet.history.voidTag`),...R.neutre}}:e.reversalOf?{badge:{label:n(`cotisations.journal.reversalTag`),...R.attente}}:{}})),more:Math.max(0,r.length-8)}],link:null}}),this.payId=i(null),this.payPeriod=i(``),this.payOther=i(``),this.payAmount=i(``),this.payMethod=i(`espèces`),this.payNote=i(``),this.payError=i(``),this.payDate=i(X()),this.payFor=n(()=>{let e=this.payId();return e?this.rows().find(t=>t.member.id===e)??null:null}),this.periodOptions=n(()=>{let e=this.payFor(),t=this.t();return e?[...e.dues.lines.filter(e=>e.expected>e.paid).map(e=>({value:e.period,label:t(`cotisations.payDialog.periodLeft`,{period:e.period,amount:P.format(e.expected-e.paid)})})),{value:Y,label:t(`cotisations.payDialog.periodOther`)}]:[]}),this.aggregator=ce(),this.payReference=i(``),this.linkShown=i(null),this.linkCopied=i(!1),this.sharedLink=n(()=>{let e=this.linkShown();if(!e)return null;let t=typeof window>`u`?``:window.location.origin,n=this.store.state().members.find(t=>t.id===e.link.memberId),r=se(e.link.token,t),i=le({name:e.name,scoop:e.scoop,amount:P.format(e.link.amount),period:e.link.period,url:r}),a=(n?.phone??``).replace(/\D/g,``);return{...e,url:r,message:i,whatsapp:`https://wa.me/${a?a.length===9?`221${a}`:a:``}?text=${encodeURIComponent(i)}`,sms:`sms:${a?`+${a.length===9?`221${a}`:a}`:``}?body=${encodeURIComponent(i)}`,mail:n?.email?`mailto:${n.email}?subject=${encodeURIComponent(this.t()(`cotisations.link.mailSubject`))}&body=${encodeURIComponent(i)}`:``}}),this.linkRows=n(()=>{let e=this.store.state(),t=e.session,n=new Map(e.members.map(e=>[e.id,`${e.firstName} ${e.lastName}`])),r=Date.now();return e.paymentLinks.filter(e=>L([e],t).length>0).map(e=>{let t=e.status===`en attente`&&Date.parse(e.expiresAt)<r?`expiré`:e.status,i=t===`payé`?R.succes:t===`en attente`?R.info:t===`expiré`?R.attente:R.neutre;return{link:e,name:n.get(e.memberId)??e.memberId,live:t===`en attente`,tone:i,statusKey:`cotisations.link.status.${t}`}}).sort((e,t)=>t.link.createdAt.localeCompare(e.link.createdAt))}),this.enrollOpen=i(!1),this.enrollScoop=i(``),this.enrollQuery=i(``),this.enrollPick=i(``),this.canEnroll=n(()=>this.store.can(`member.manage`)),this.enrollScoops=n(()=>{let e=this.store.state();return e.scoops.filter(t=>!t.archived&&L([{scoopId:t.id}],e.session).length).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name}))}),this.enrollCandidates=n(()=>{let e=this.store.state(),t=new Set(e.members.filter(e=>e.status!==`sorti`).map(e=>e.producerId)),n=Z(this.enrollQuery().trim());return e.producers.filter(e=>e.scoopId===this.enrollScoop()&&!e.mergedInto&&!t.has(e.id)).filter(e=>!n||Z(`${e.firstName} ${e.lastName} ${e.code}`).includes(n)).map(t=>({id:t.id,firstName:t.firstName,lastName:t.lastName,orgName:t.orgId?e.orgs.find(e=>e.id===t.orgId)?.name??``:``})).sort((e,t)=>e.lastName.localeCompare(t.lastName)).slice(0,50)}),this.tab=i(`members`),this.pq=i(``),this.pMethod=i(``),this.pStatus=i(`all`),this.payments=n(()=>{let e=this.store.state();return[...F(e.payments,e.session)].sort((e,t)=>t.paidAt.localeCompare(e.paidAt))}),this.memberNames=n(()=>new Map(this.store.state().members.map(e=>[e.id,`${e.firstName} ${e.lastName}`]))),this.journalBase=n(()=>{let e=Z(this.pq().trim()),t=this.pMethod();return this.payments().filter(n=>(!t||n.method===t)&&(!e||Z(`${this.memberName(n.memberId)} ${n.receipt}`).includes(e)))}),this.payStatusButtons=n(()=>{let e=this.t(),t=this.journalBase();return[{id:`all`,label:e(`cotisations.journal.status.all`),count:t.length},{id:`valid`,label:e(`cotisations.journal.status.valid`),count:t.filter(e=>!$(e)).length},{id:`voided`,label:e(`cotisations.journal.status.voided`),count:t.filter($).length}]}),this.methodOptions=n(()=>[{value:``,label:this.t()(`cotisations.journal.methodAll`)},...k.map(e=>({value:e,label:this.t()(this.methodKey(e))}))]),this.journal=n(()=>{let e=this.pStatus();return this.journalBase().filter(t=>e===`all`||(e===`voided`?$(t):!$(t)))}),this.journalTotals=n(()=>{let e=this.journal().filter(e=>!$(e));return{count:e.length,amount:e.reduce((e,t)=>e+t.amount,0)}}),this.journalPager=z(()=>this.journal()),this.receiptId=i(null),this.receipt=n(()=>{let e=this.receiptId(),t=e?this.store.state().payments.find(t=>t.id===e):null;return t?{p:t,member:this.memberName(t.memberId),scoop:this.scoopName(t.scoopId)}:null}),this.voidId=i(null),this.voidReason=i(``),this.voidPay=n(()=>{let e=this.voidId();return e?this.store.state().payments.find(t=>t.id===e)??null:null}),this.ruleFor=i(null),this.rAmount=i(``),this.rPeriodicity=i(`annuelle`),this.rMonth=i(`03`),this.rDay=i(`31`),this.rYear=i(String(new Date().getFullYear())),this.rConfirmed=i(!1),this.rErr=i({}),this.ruleScoop=n(()=>{let e=this.ruleFor();return e?{id:e,name:this.scoopName(e)}:null}),this.monthOptions=n(()=>Array.from({length:12},(e,t)=>{let n=String(t+1).padStart(2,`0`);return{value:n,label:this.locale.formatDate(`2000-${n}-15T12:00:00Z`,{month:`long`})}}))}pct(e){return e.expected?Math.min(100,Math.round(e.paid/e.expected*100)):0}methodKey(e){return`cotisations.method.${e}`}ruleSummary(e){let t=P.format(e.amount);if(e.periodicity===`mensuelle`)return this.t()(`cotisations.rule.summary.mensuelle`,{amount:t});let n=this.locale.formatDate(`2000-${e.dueDate}T12:00:00Z`,{day:`numeric`,month:`long`});return this.t()(`cotisations.rule.summary.annuelle`,{amount:t,date:n})}submitLink(){let e=this.payFor();if(!e)return;let t=Number(this.payAmount());if(!t||t<=0){this.payError.set(this.t()(`cotisations.ruleDialog.invalidAmount`));return}let n=this.payPeriod()===Y?this.payOther().trim():this.payPeriod(),r=I.createPaymentLink({memberId:e.member.id,amount:t,period:n});r.ok?(this.payId.set(null),this.openLink(this.store.state().paymentLinks.find(e=>e.id===r.id))):this.snackbar.error(r.error)}openLink(e){let t=this.store.state().members.find(t=>t.id===e.memberId),n=this.store.state().scoops.find(t=>t.id===e.scoopId)?.name??``;this.linkCopied.set(!1),this.linkShown.set({link:e,name:t?`${t.firstName} ${t.lastName}`:``,scoop:n})}async copyLink(e){try{await navigator.clipboard.writeText(e)}catch{this.snackbar.error(this.t()(`cotisations.link.copyFailed`));return}this.linkCopied.set(!0),this.snackbar.success(this.t()(`cotisations.link.copiedToast`)),setTimeout(()=>this.linkCopied.set(!1),2500)}cancelLink(e){let t=I.cancelPaymentLink(e.id);t.ok?this.snackbar.success(this.t()(`cotisations.link.cancelled`)):this.snackbar.error(t.error)}openEnroll(){this.enrollScoop.set(this.enrollScoops()[0]?.value??``),this.enrollQuery.set(``),this.enrollPick.set(``),this.enrollOpen.set(!0)}submitEnroll(){let e=I.enrollProducerAsMember(this.enrollPick());e.ok?(this.enrollOpen.set(!1),this.snackbar.success(this.t()(`cotisations.enroll.done`))):this.snackbar.error(e.error)}openPay(e){this.payReference.set(``),this.payId.set(e),this.payOther.set(``),this.payNote.set(``),this.payMethod.set(`espèces`),this.payError.set(``),this.payDate.set(X()),this.choosePeriod(this.periodOptions()[0]?.value??Y)}choosePeriod(e){this.payPeriod.set(e);let t=this.payFor(),n=t?.dues.lines.find(t=>t.period===e);this.payAmount.set(n?String(n.expected-n.paid):t?.rule?String(t.rule.amount):``)}submitPay(){let e=this.payFor();if(!e)return;let t=Number(this.payAmount());if(!t||t<=0){this.payError.set(this.t()(`cotisations.ruleDialog.invalidAmount`));return}let n=this.payPeriod()===Y?this.payOther().trim():this.payPeriod(),r=this.payDate(),i=I.recordPayment({memberId:e.member.id,amount:t,period:n,method:this.payMethod(),note:this.payNote(),...this.payMethod()!==`espèces`&&this.payReference().trim()?{reference:this.payReference().trim()}:{},...r&&r!==X()?{paidAt:`${r}T12:00:00.000Z`}:{}});i.ok?(this.payId.set(null),this.receiptId.set(i.id),this.snackbar.success(`${this.t()(`cotisations.payDialog.toast`,{receipt:i.receipt})} · ${this.t()(`cotisations.payDialog.toastDetail`,{name:e.name,amount:P.format(t),period:n})}`)):this.snackbar.error(this.locale.tNow(i.error))}memberName(e){return this.memberNames().get(e)??e}scoopName(e){return this.store.state().scoops.find(t=>t.id===e)?.name??e}printReceipt(e){let t=this.t(),n=e=>e.replace(/[&<>"]/g,e=>({"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`})[e]),r=(e,t)=>`<div><dt>${n(e)}</dt><dd>${n(t)}</dd></div>`,i=`<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>${n(t(`cotisations.receipt.number`,{receipt:e.p.receipt}))}</title>
<style>
  body{font-family:"Plus Jakarta Sans",system-ui,sans-serif;color:#0E1A14;margin:40px;}
  .card{max-width:560px;margin:auto;border:2px solid #0F3D2A;border-radius:20px;padding:28px;}
  .top{display:flex;justify-content:space-between;align-items:flex-start;gap:16px}
  .brand{font-weight:800;color:#0F3D2A;font-size:20px}.sub{color:#5B6660;font-size:13px}
  .no{background:#0F3D2A;color:#C6F05A;border-radius:10px;padding:6px 12px;font-family:monospace;font-weight:700}
  h1{font-size:22px;margin:22px 0 4px}.amount{margin:18px 0;padding:18px;border-radius:16px;background:#EEF3E4;text-align:center;font-size:34px;font-weight:800;color:#2E7D32}
  dl{display:grid;grid-template-columns:1fr 1fr;gap:12px 20px;margin:0}dt{font-size:12px;color:#5B6660}dd{margin:2px 0 0;font-weight:800}
  .void{margin-top:16px;padding:12px;border-radius:12px;background:#FFE0E0;color:#B3261E;font-weight:700}
  .sign{margin-top:36px;display:flex;justify-content:flex-end}.sign div{width:220px;border-top:1px solid #B9C0BB;padding-top:6px;text-align:center;font-size:12px;color:#5B6660}
  .foot{margin-top:24px;font-size:11px;color:#5B6660;text-align:center}
  ${e.p.voided?`.amount{background:#E6E2D6;color:#5B6660;text-decoration:line-through}`:``}
</style></head><body><div class="card">
<div class="top"><div><div class="brand">Mbay Diaay</div><div class="sub">${n(e.scoop)}</div></div><span class="no">${n(e.p.receipt)}</span></div>
<h1>${n(t(`cotisations.receipt.title`))}</h1>
<div class="amount">${n(P.format(e.p.amount))} FCFA</div>
<dl>${r(t(`cotisations.receipt.from`),e.member)}${r(t(`cotisations.receipt.period`),e.p.period)}${r(t(`cotisations.receipt.date`),j(e.p.paidAt))}${r(t(`cotisations.receipt.method`),t(this.methodKey(e.p.method)))}${r(t(`cotisations.receipt.by`),e.p.recordedBy)}${e.p.note?r(t(`cotisations.receipt.note`),e.p.note):``}</dl>
${e.p.voided?`<div class="void">${n(t(`cotisations.receipt.voided`,{date:j(e.p.voided.at),name:e.p.voided.by}))} · ${n(e.p.voided.reason)}</div>`:``}
<div class="sign"><div>${n(t(`cotisations.receipt.signature`))}</div></div>
<p class="foot">${n(t(`cotisations.receipt.footer`))}</p>
</div><script>window.onload=()=>{window.print();}<\/script></body></html>`,a=window.open(``,`_blank`,`width=720,height=900`);a?(a.document.write(i),a.document.close()):this.snackbar.error(this.t()(`common.exportError`))}openVoid(e){this.receiptId.set(null),this.voidReason.set(``),this.voidId.set(e)}submitVoid(e){let t=this.voidPay(),n=I.voidPayment(e,this.voidReason());n.ok?(this.voidId.set(null),this.snackbar.success(`${this.t()(`cotisations.voidDialog.done`)} · ${this.t()(`cotisations.voidDialog.doneDetail`,{receipt:t?.receipt??``})}`)):this.snackbar.error(this.locale.tNow(n.error))}openRule(e){let t=this.store.state(),n=N(t.contributionRules,t.session).find(t=>t.scoopId===e);this.rAmount.set(n?String(n.amount):``),this.rPeriodicity.set(n?.periodicity??`annuelle`);let[r,i]=(n?.dueDate??`03-31`).split(`-`);this.rMonth.set(r??`03`),this.rDay.set(String(Number(i??`31`))),this.rYear.set(String(n?.startYear??new Date().getFullYear())),this.rConfirmed.set(n?.confirmed??!1),this.rErr.set({}),this.ruleFor.set(e)}submitRule(e){let t=this.t(),n=Number(this.rAmount()),r=Number(this.rDay()),i=Number(this.rYear()),a={};if(n>0||(a.amount=t(`cotisations.ruleDialog.invalidAmount`)),this.rPeriodicity()===`annuelle`&&!(Number.isInteger(r)&&r>=1&&r<=31)&&(a.day=t(`cotisations.ruleDialog.invalidDay`)),/^\d{4}$/.test(this.rYear().trim())||(a.year=t(`cotisations.ruleDialog.invalidYear`)),this.rErr.set(a),Object.keys(a).length)return;let o=I.setContributionRule(e,{amount:n,periodicity:this.rPeriodicity(),dueDate:this.rPeriodicity()===`annuelle`?`${this.rMonth()}-${String(r).padStart(2,`0`)}`:`12-31`,startYear:i,confirmed:this.rConfirmed()});o.ok?(this.ruleFor.set(null),this.snackbar.success(t(`cotisations.ruleDialog.saved`))):this.snackbar.error(this.locale.tNow(o.error))}exportCsv(){let e=this.shown();try{ne(`cotisations.csv`,[[`Membre`,`Coopérative`,`État`,`Attendu (FCFA)`,`Payé (FCFA)`,`Reste (FCFA)`],...e.map(e=>[e.name,e.scoop,e.dues.state,e.dues.expected,e.dues.paid,e.dues.balance])])}catch{this.snackbar.error(this.t()(`common.exportError`));return}I.audit(`Export cotisations`,`Cotisations`,`${e.length} lignes (CSV)`),this.snackbar.success(`${this.t()(`cotisations.exported`)} · ${this.t()(e.length>1?`cotisations.exportedCount.autre`:`cotisations.exportedCount.un`,{count:P.format(e.length)})}`)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=ee({type:e,selectors:[[`app-cotisations-page`]],decls:60,vars:62,consts:[[`perm`,`contribution.read`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`flex`,`flex-wrap`,`gap-3`],[`type`,`button`,1,`btn`,`btn-primary`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`,`disabled`],[`name`,`csv`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[`role`,`tablist`,1,`seg`,`tabs`,`mt-6`],[`type`,`button`,`role`,`tab`,3,`click`],[`name`,`group`,3,`size`],[1,`n`],[`name`,`receipt_long`,3,`size`],[`name`,`gavel`,3,`size`],[`name`,`link`,3,`size`],[3,`closed`,`view`],[`icon`,`payments`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`link`,`tone`,`brand`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`person_add`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`space-y-4`,`pb-6`],[`leadingIcon`,`apartment`,3,`label`,`options`,`value`],[`icon`,`search`,3,`valueChange`,`label`,`value`],[1,`people`],[1,`rounded-[16px]`,`px-4`,`py-3`,`text-[13px]`,`font-medium`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-gris-texte)`],[1,`sub`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`icon`,`receipt_long`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`tone`,`danger`,`icon`,`close`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`gavel`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`name`,`person_add`,3,`size`],[1,`notice`,`mt-6`],[`name`,`info`,3,`size`],[1,`card`,`mt-4`,`overflow-hidden`],[1,`overflow-x-auto`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[1,`tbl`,`min-w-[860px]`],[1,`text-right`],[1,`font-bold`],[1,`tabular-nums`],[1,`text-right`,`font-extrabold`,`tabular-nums`],[1,`badge`],[1,`flex`,`justify-end`,`gap-2`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`content_copy`,3,`size`],[`type`,`button`,1,`act`,`act-danger`,3,`title`],[`type`,`button`,1,`act`,`act-danger`,3,`click`,`title`],[`name`,`close`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`leadingIcon`,`hub`,1,`min-w-[220px]`,3,`label`,`options`,`value`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[`type`,`button`,`role`,`radio`,3,`click`],[`leadingIcon`,`hub`,1,`min-w-[220px]`,3,`valueChange`,`label`,`options`,`value`],[1,`tbl`,`min-w-[980px]`],[1,`w-[220px]`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`,`tabular-nums`],[1,`max-w-48`,`truncate`,`font-medium`,3,`title`],[1,`whitespace-nowrap`,`text-right`,`font-extrabold`,`tabular-nums`],[`type`,`button`,1,`act`,3,`title`],[`name`,`visibility`,3,`size`],[1,`block`,`text-[13px]`,`font-bold`,`tabular-nums`],[`aria-hidden`,`true`,1,`meter`,`mt-1.5`],[`name`,`payments`,3,`size`],[`name`,`account_balance_wallet`,3,`size`],[1,`toolbar`,`card`,`mt-4`],[`variant`,`compact`,`leadingIcon`,`payments`,1,`min-w-[200px]`,3,`valueChange`,`label`,`options`,`value`],[1,`tbl`,`min-w-[920px]`],[1,`row-link`,3,`voided`],[1,`whitespace-nowrap`,`font-medium`,`tabular-nums`],[1,`receipt-no`],[1,`block`,`max-w-52`,`truncate`,`font-bold`],[1,`sub`,`block`,`max-w-52`,`truncate`],[1,`font-semibold`,`tabular-nums`],[1,`badge`,2,`background`,`var(--v2-lin)`,`color`,`var(--v2-gris-texte)`],[1,`badge`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-ardoise)`],[1,`font-medium`],[1,`block`],[1,`badge`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`rules`,`mt-4`],[1,`card`,`sub`,`mt-4`,`p-6`],[1,`rule`,`card`],[1,`flex`,`items-start`,`gap-3`],[1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-[12px]`],[1,`min-w-0`,`flex-1`],[1,`truncate`,`text-[15px]`,`font-extrabold`,3,`title`],[1,`mt-4`,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-2`],[1,`badge`,3,`background`,`color`],[1,`badge`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`40px`],[1,`mt-1`,`text-[13px]`,`font-semibold`,2,`color`,`var(--v2-ardoise)`],[1,`sub`,`mt-0.5`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`40px`,3,`click`],[`name`,`edit`,3,`size`],[`icon`,`payments`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-4`,`pb-4`],[1,`lbl`],[`leadingIcon`,`calendar_today`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[`preset`,`period`,3,`placeholder`,`label`,`hint`,`value`],[`preset`,`amount`,3,`valueChange`,`label`,`hint`,`value`,`error`],[`role`,`radiogroup`,1,`seg`,`seg-form`,`mt-2`],[`icon`,`receipt_long`,3,`label`,`optional`,`hint`,`value`],[`type`,`date`,`icon`,`calendar_today`,3,`valueChange`,`label`,`hint`,`value`],[`preset`,`note`,3,`valueChange`,`label`,`value`],[1,`sub`,`flex`,`items-center`,`gap-2`],[`name`,`fact_check`,3,`size`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`preset`,`period`,3,`valueChange`,`placeholder`,`label`,`hint`,`value`],[`icon`,`receipt_long`,3,`valueChange`,`label`,`optional`,`hint`,`value`],[`icon`,`link`,`tone`,`brand`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`rc-grid`],[1,`break-all`,`rounded-[14px]`,`px-4`,`py-3`,`text-[14px]`,`font-bold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`,`user-select`,`all`],[1,`grid`,`gap-3`,`sm:grid-cols-2`],[`type`,`button`,1,`btn`,`btn-primary`,`justify-center`,3,`click`],[`type`,`button`,1,`btn`,`btn-ghost`,`justify-center`,3,`click`],[`name`,`description`,3,`size`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`btn`,`btn-ghost`,`justify-center`,3,`href`],[`name`,`public`,3,`size`],[1,`btn`,`btn-ghost`,`justify-center`,3,`href`],[`name`,`call`,3,`size`],[1,`btn`,`btn-ghost`,`justify-center`,`sm:col-span-2`,3,`href`],[1,`notice`],[`name`,`mail`,3,`size`],[`leadingIcon`,`apartment`,3,`valueChange`,`label`,`options`,`value`],[1,`person`],[`type`,`radio`,`name`,`enroll`,3,`change`,`checked`],[1,`min-w-0`,`flex-1`,`truncate`],[1,`sub`,`shrink-0`],[`icon`,`receipt_long`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`receipt`],[1,`flex`,`items-center`,`justify-between`,`gap-3`],[1,`mt-5`,`rounded-[18px]`,`p-5`,`text-center`],[1,`mt-1`,`text-[36px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`rc-grid`,`mt-5`],[1,`mt-4`,`rounded-[14px]`,`px-4`,`py-3`,`text-[13px]`,`font-bold`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[1,`sub`,`mt-5`,`border-t`,`pt-4`,`text-center`,2,`border-color`,`var(--v2-separateur)`],[`aria-hidden`,`true`,1,`h-4`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,2,`color`,`var(--v2-erreur-fg)`],[`name`,`download`,3,`size`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,2,`color`,`var(--v2-erreur-fg)`,3,`click`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`mb-4`,`rounded-[16px]`,`px-4`,`py-3`,`text-[14px]`,`font-bold`,2,`background`,`var(--v2-creme)`],[`for`,`void-reason`,1,`lbl`],[`id`,`void-reason`,`rows`,`3`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[1,`sub`,`mb-4`,`mt-1.5`],[`modal-footer`,``,`type`,`button`,1,`btn`,2,`background`,`var(--v2-erreur-fg)`,`color`,`var(--v2-blanc)`,3,`click`,`disabled`],[`icon`,`gavel`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-5`,`pb-5`],[1,`sub`,`rounded-[14px]`,`px-4`,`py-3`,2,`background`,`var(--v2-creme)`],[`preset`,`period`,3,`valueChange`,`label`,`maxlength`,`value`,`error`],[1,`check`],[`type`,`checkbox`,3,`change`,`checked`],[1,`sub`,`block`],[1,`mt-2`,`grid`,`gap-3`,`sm:grid-cols-[1fr_140px]`],[`leadingIcon`,`calendar_month`,3,`valueChange`,`label`,`options`,`value`],[`type`,`number`,`inputmode`,`numeric`,`placeholder`,`31`,3,`valueChange`,`label`,`maxlength`,`value`,`error`],[1,`sub`,`mt-1.5`]],template:function(e,n){if(e&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),g(4),r(),a(5,`h1`,4),g(6),r(),a(7,`p`,5),g(8),r()(),a(9,`div`,6),D(10,ke,4,2,`button`,7),a(11,`button`,8),t(`click`,function(){return n.exportCsv()}),u(12,`ui-icon`,9),g(13),r()()(),u(14,`ui-stat-cards`,10),a(15,`div`,11)(16,`button`,12),t(`click`,function(){return n.tab.set(`members`)}),u(17,`ui-icon`,13),g(18),a(19,`span`,14),g(20),r()(),a(21,`button`,12),t(`click`,function(){return n.tab.set(`payments`)}),u(22,`ui-icon`,15),g(23),a(24,`span`,14),g(25),r()(),a(26,`button`,12),t(`click`,function(){return n.tab.set(`rules`)}),u(27,`ui-icon`,16),g(28),a(29,`span`,14),g(30),r()(),a(31,`button`,12),t(`click`,function(){return n.tab.set(`links`)}),u(32,`ui-icon`,17),g(33),a(34,`span`,14),g(35),r()()(),D(36,Fe,6,3),D(37,Ke,13,11),D(38,tt,13,13),D(39,lt,2,1),a(40,`ui-detail-modal`,18),t(`closed`,function(){return n.detailId.set(null)}),r(),D(41,pt,29,31,`ui-modal`,19),D(42,ht,41,29,`ui-modal`,20),a(43,`ui-modal`,21),t(`closed`,function(){return n.enrollOpen.set(!1)}),a(44,`div`,22),D(45,gt,1,3,`ui-select`,23),a(46,`ui-text-field`,24),t(`valueChange`,function(e){return n.enrollQuery.set(e)}),r(),D(47,vt,3,1,`ul`,25)(48,yt,2,1,`p`,26),a(49,`p`,27),g(50),r()(),a(51,`button`,28),t(`click`,function(){return n.enrollOpen.set(!1)}),g(52),r(),a(53,`button`,29),t(`click`,function(){return n.submitEnroll()}),g(54),a(55,`span`,30),u(56,`ui-icon`,31),r()()(),D(57,wt,52,37,`ui-modal`,32),D(58,Tt,12,18,`ui-modal`,33),D(59,Dt,26,32,`ui-modal`,34),r()),e&2){let e,t,r,i,a;f(`area`,n.t()(`cotisations.area`)),_(4),w(n.t()(`cotisations.eyebrow`)),_(2),x(` `,n.t()(`cotisations.title`),` `),_(2),x(` `,n.t()(`cotisations.description`),` `),_(2),m(n.canEnroll()?10:-1),_(),f(`disabled`,!n.shown().length),_(),f(`size`,22),_(),x(``,n.t()(`cotisations.export`),` `),_(),f(`stats`,n.stats()),_(),S(`aria-label`,n.t()(`cotisations.tab.aria`)),_(),v(`on`,n.tab()===`members`),S(`aria-selected`,n.tab()===`members`),_(),f(`size`,18),_(),w(n.t()(`cotisations.tab.members`)),_(2),w(n.nf.format(n.rows().length)),_(),v(`on`,n.tab()===`payments`),S(`aria-selected`,n.tab()===`payments`),_(),f(`size`,18),_(),w(n.t()(`cotisations.tab.payments`)),_(2),w(n.nf.format(n.payments().length)),_(),v(`on`,n.tab()===`rules`),S(`aria-selected`,n.tab()===`rules`),_(),f(`size`,18),_(),w(n.t()(`cotisations.tab.rules`)),_(),v(`zero`,!n.rules().length),_(),w(n.rules().length),_(),v(`on`,n.tab()===`links`),S(`aria-selected`,n.tab()===`links`),_(),f(`size`,18),_(),w(n.t()(`cotisations.tab.links`)),_(),v(`zero`,!n.linkRows().length),_(),w(n.linkRows().length),_(),m(n.tab()===`links`?36:-1),_(),m(n.tab()===`members`?37:-1),_(),m(n.tab()===`payments`?38:-1),_(),m(n.tab()===`rules`?39:-1),_(),f(`view`,n.detail()),_(),m((e=n.payFor())?41:-1,e),_(),m((t=n.sharedLink())?42:-1,t),_(),f(`open`,n.enrollOpen())(`title`,n.t()(`cotisations.enroll.title`))(`description`,n.t()(`cotisations.enroll.description`))(`width`,640)(`closeLabel`,n.t()(`common.close`)),_(2),m(n.enrollScoops().length>1?45:-1),_(),f(`label`,n.t()(`cotisations.enroll.search`))(`value`,n.enrollQuery()),_(),m(n.enrollCandidates().length?47:48),_(3),w(n.t()(`cotisations.enroll.rule`)),_(2),w(n.t()(`cotisations.cancel`)),_(),f(`disabled`,!n.enrollPick()),_(),x(` `,n.t()(`cotisations.enroll.submit`)),_(2),f(`size`,18),_(),m((r=n.receipt())?57:-1,r),_(),m((i=n.voidPay())?58:-1,i),_(),m((a=n.ruleScoop())?59:-1,a)}},dependencies:[ue,V,ae,pe,me,ge,he,_e],styles:[`.mono[_ngcontent-%COMP%] {
    font-family: var(--%NS%v2-font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .card[_ngcontent-%COMP%] {
    border-radius: 24px;
    border: 1px solid var(--%NS%v2-bord-carte);
    background: var(--%NS%v2-blanc);
  }
  .sub[_ngcontent-%COMP%] {
    font-size: 13px;
    font-weight: 500;
    color: var(--%NS%v2-gris-texte);
  }
  .badge[_ngcontent-%COMP%] {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 999px;
    padding: 3px 10px 3px 8px;
    font-size: 12px;
    font-weight: 800;
    white-space: nowrap;
  }
  .zero[_ngcontent-%COMP%] {
    color: var(--%NS%v2-gris-trait) !important;
  }
  .btn[_ngcontent-%COMP%] {
    display: inline-flex;
    height: 48px;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    padding: 0 18px;
    font-size: 15px;
    font-weight: 800;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }
  .btn[_ngcontent-%COMP%]:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .btn[_ngcontent-%COMP%]:focus-visible {
    outline: 2px solid var(--%NS%v2-foret);
    outline-offset: 2px;
  }
  .btn-primary[_ngcontent-%COMP%] {
    padding: 0 6px 0 18px;
    background: var(--%NS%v2-foret);
    color: var(--%NS%v2-blanc);
  }
  .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
    background: var(--%NS%v2-foret-clair);
  }
  .btn-ghost[_ngcontent-%COMP%] {
    border: 1.5px solid var(--%NS%v2-gris-trait);
    background: var(--%NS%v2-blanc);
    color: var(--%NS%v2-encre);
  }
  .btn-ghost[_ngcontent-%COMP%]:hover:not(:disabled) {
    border-color: var(--%NS%v2-gris-texte);
  }
  
  .btn-chip[_ngcontent-%COMP%] {
    display: grid;
    height: 36px;
    width: 36px;
    place-items: center;
    border-radius: 12px;
    background: var(--%NS%v2-citron);
    color: var(--%NS%v2-foret);
  }
  .toolbar[_ngcontent-%COMP%] {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 20px;
  }
  .search[_ngcontent-%COMP%] {
    display: flex;
    flex: 1 1 260px;
    min-width: 0;
    height: 48px;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    background: var(--%NS%v2-creme);
    padding: 0 14px;
    color: var(--%NS%v2-gris-texte);
  }
  .search[_ngcontent-%COMP%]:focus-within {
    box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);
  }
  .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
    background: transparent;
    font-size: 15px;
    font-weight: 600;
    color: var(--%NS%v2-encre);
    outline: none;
  }
  .seg[_ngcontent-%COMP%] {
    display: flex;
    max-width: 100%;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    border-radius: 14px;
    background: var(--%NS%v2-creme);
    padding: 4px;
  }
  .seg[_ngcontent-%COMP%]::-webkit-scrollbar {
    display: none;
  }
  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    border-radius: 10px;
    padding: 9px 14px;
    font-size: 14px;
    font-weight: 700;
    color: var(--%NS%v2-gris-texte);
    cursor: pointer;
  }
  .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {
    color: var(--%NS%v2-encre);
  }
  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {
    background: var(--%NS%v2-blanc);
    color: var(--%NS%v2-foret);
    box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);
  }
  .seg[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
    border-radius: 999px;
    padding: 1px 7px;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);
    color: var(--%NS%v2-ardoise);
  }
  .seg[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {
    background: transparent;
  }
  .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
    background: var(--%NS%v2-foret);
    color: var(--%NS%v2-blanc);
  }
  .act[_ngcontent-%COMP%] {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 12px;
    border: 1px solid var(--%NS%v2-bord-carte);
    background: var(--%NS%v2-blanc);
    color: var(--%NS%v2-ardoise);
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }
  .act[_ngcontent-%COMP%]:hover, 
   .row-link[_ngcontent-%COMP%]:hover   .act[_ngcontent-%COMP%] {
    border-color: var(--%NS%v2-foret);
    background: var(--%NS%v2-foret);
    color: var(--%NS%v2-citron);
  }
  .act[_ngcontent-%COMP%]:focus-visible {
    outline: 2px solid var(--%NS%v2-foret);
    outline-offset: 2px;
  }
  .tbl[_ngcontent-%COMP%] {
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
  .tbl[_ngcontent-%COMP%]   thead[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
    font-family: var(--%NS%v2-font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--%NS%v2-gris-texte);
  }
  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
    padding: 12px;
    white-space: nowrap;
  }
  .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
    padding: 12px;
  }
  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:first-child, 
   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
    padding-left: 20px;
  }
  .tbl[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]:last-child, 
   .tbl[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:last-child {
    padding-right: 20px;
  }
  .tbl[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%] {
    border-top: 1px solid var(--%NS%v2-separateur);
  }
  .row-link[_ngcontent-%COMP%] {
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  .row-link[_ngcontent-%COMP%]:hover {
    background: var(--%NS%v2-creme);
  }
  .row-link[_ngcontent-%COMP%]:focus-visible {
    outline: 2px solid var(--%NS%v2-foret);
    outline-offset: -2px;
  }
  .avatar[_ngcontent-%COMP%] {
    display: grid;
    height: 36px;
    width: 36px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 999px;
    background: var(--%NS%v2-sauge);
    color: var(--%NS%v2-foret);
    font-size: 12px;
    font-weight: 800;
  }
  
  .sec-card[_ngcontent-%COMP%] {
    border-radius: 24px;
    border: 1px solid var(--%NS%v2-bord-carte);
    background: var(--%NS%v2-blanc);
    overflow: hidden;
  }
  .sec-head[_ngcontent-%COMP%] {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
  }
  .sec-head[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%] {
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .sec-head[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
    border-radius: 999px;
    background: var(--%NS%v2-creme);
    padding: 1px 9px;
    font-size: 12px;
    font-weight: 800;
    color: var(--%NS%v2-ardoise);
  }
  .sec-ico[_ngcontent-%COMP%] {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 10px;
    background: var(--%NS%v2-sauge);
    color: var(--%NS%v2-foret);
  }
  .facts[_ngcontent-%COMP%] {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    border-top: 1px solid var(--%NS%v2-separateur);
  }
  .fact[_ngcontent-%COMP%] {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    gap: 12px;
    border-bottom: 1px solid var(--%NS%v2-separateur);
    padding: 14px 20px;
  }
  .fact-ico[_ngcontent-%COMP%] {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 10px;
    background: var(--%NS%v2-creme);
    color: var(--%NS%v2-foret);
  }
  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {
    font-size: 12px;
    font-weight: 600;
    color: var(--%NS%v2-gris-texte);
  }
  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
    margin-top: 2px;
    overflow-wrap: anywhere;
    font-size: 15px;
    font-weight: 800;
  }
  .reveal[_ngcontent-%COMP%] {
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 800;
    color: var(--%NS%v2-foret);
    background: var(--%NS%v2-sauge);
    cursor: pointer;
  }
  .reveal[_ngcontent-%COMP%]:hover {
    background: var(--%NS%v2-foret);
    color: var(--%NS%v2-citron);
  }
  .lbl[_ngcontent-%COMP%] {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--%NS%v2-ardoise);
  }
  .area[_ngcontent-%COMP%] {
    width: 100%;
    min-height: 104px;
    border-radius: 16px;
    border: 1.5px solid var(--%NS%v2-gris-trait);
    background: var(--%NS%v2-blanc);
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 600;
    color: var(--%NS%v2-encre);
  }
  .area[_ngcontent-%COMP%]::placeholder {
    color: var(--%NS%v2-gris-texte);
    font-weight: 500;
  }
  .area[_ngcontent-%COMP%]:focus-visible {
    outline: none;
    border: 2px solid var(--%NS%v2-foret);
    box-shadow: var(--%NS%v2-halo);
  }
  .check[_ngcontent-%COMP%] {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
    margin-top: 2px;
    height: 20px;
    width: 20px;
    accent-color: var(--%NS%v2-foret);
    cursor: pointer;
  }
  .act-danger[_ngcontent-%COMP%]:hover {
    border-color: var(--%NS%v2-erreur-fg);
    background: var(--%NS%v2-erreur-bg);
    color: var(--%NS%v2-erreur-fg);
  }
  .btn-danger[_ngcontent-%COMP%] {
    background: var(--%NS%v2-erreur-fg);
    color: var(--%NS%v2-blanc);
  }
  .btn-danger[_ngcontent-%COMP%]:hover:not(:disabled) {
    background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, black);
  }
  .btn-citron[_ngcontent-%COMP%] {
    padding: 0 18px;
    background: var(--%NS%v2-citron);
    color: var(--%NS%v2-foret);
  }
  .btn-citron[_ngcontent-%COMP%]:hover:not(:disabled) {
    background: color-mix(in oklab, var(--%NS%v2-citron) 85%, white);
  }
  .notice[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 18px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 700;
  }
  .rise[_ngcontent-%COMP%] {
    animation: _ngcontent-%COMP%_v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;
  }
  @keyframes _ngcontent-%COMP%_v2-rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .rise[_ngcontent-%COMP%] {
      animation: none;
    }
  }`,`.meter[_ngcontent-%COMP%] {
        display: block;
        height: 6px;
        width: 100%;
        overflow: hidden;
        border-radius: 999px;
        background: var(--%NS%v2-lin);
      }
      .meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
        display: block;
        height: 100%;
        border-radius: 999px;
        transition: width 0.4s cubic-bezier(0.32, 0.72, 0, 1);
      }
      .rules[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
        gap: 10px;
      }
      .rule[_ngcontent-%COMP%] {
        border-radius: 18px;
        border: 1px solid var(--%NS%v2-bord-carte);
        padding: 14px 16px;
      }
      .tabs[_ngcontent-%COMP%] {
        width: fit-content;
        max-width: 100%;
      }
      .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        padding: 11px 16px;
        font-size: 15px;
      }
      .receipt-no[_ngcontent-%COMP%] {
        border-radius: 10px;
        background: var(--%NS%v2-foret);
        padding: 4px 10px;
        font-family: var(--%NS%v2-font-mono);
        font-size: 12px;
        font-weight: 700;
        color: var(--%NS%v2-citron);
        white-space: nowrap;
      }
      tr.voided[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
        color: var(--%NS%v2-gris-texte);
      }
      tr.voided[_ngcontent-%COMP%]   .receipt-no[_ngcontent-%COMP%] {
        background: var(--%NS%v2-lin);
        color: var(--%NS%v2-gris-texte);
        text-decoration: line-through;
      }
      .act-danger[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-erreur-fg);
        background: var(--%NS%v2-erreur-bg);
        color: var(--%NS%v2-erreur-fg);
      }
      .rc-grid[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 14px 20px;
      }
      .rc-grid[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 600;
        color: var(--%NS%v2-gris-texte);
      }
      .rc-grid[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
        margin-top: 2px;
        font-size: 15px;
        font-weight: 800;
      }
      .area[_ngcontent-%COMP%] {
        width: 100%;
        border-radius: 16px;
        border: 1.5px solid var(--%NS%v2-gris-trait);
        background: var(--%NS%v2-blanc);
        padding: 12px 16px;
        font-size: 15px;
        font-weight: 600;
        color: var(--%NS%v2-encre);
      }
      .area[_ngcontent-%COMP%]:focus-visible {
        outline: none;
        border: 2px solid var(--%NS%v2-foret);
        box-shadow: var(--%NS%v2-halo);
      }
      .check[_ngcontent-%COMP%] {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        margin-top: 2px;
        height: 20px;
        width: 20px;
        accent-color: var(--%NS%v2-foret);
        cursor: pointer;
      }
      .lbl[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--%NS%v2-ardoise);
      }
      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        flex: 1;
        justify-content: center;
      }`]})}};export{kt as default};