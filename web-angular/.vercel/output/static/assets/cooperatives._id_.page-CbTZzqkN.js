import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kn as s,Kt as c,Lt as l,Nt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,bn as ee,en as g,fn as _,ft as v,gt as y,hn as b,ln as x,mn as S,mt as C,pn as w,qn as te,rr as ne,t as T,tn as E,vn as re,vt as D,yn as ie,zn as O}from"./_router-chunk-H0-n0SZI.js";import{n as ae}from"./rxjs-interop-U_NminAK.js";import{l as oe,n as se}from"./snackbar.component-ICe8-MWg.js";import{n as ce}from"./index-B8S1FFME.js";import{B as k,I as le,J as ue,V as A,W as j,t as M}from"./locale.service-Bf8_ncMo.js";import{n as N,t as P}from"./scoop-account-D8Hf4f5D.js";import{t as F}from"./app-shell.component-CR4uAChA.js";import{t as I}from"./store.service-ZF4OfoGo.js";import{t as L}from"./pager-DPeF-1nO.js";import{S as R,a as z}from"./ui-CQhTckzj.js";import{t as B}from"./technician-dialog.component-Cy8Hz7s1.js";var V=e=>[e],H=e=>({date:e}),U=e=>[`/dashboard/reunions`,e],W=e=>({name:e}),de=e=>({count:e}),G=(e,t)=>t.id,K=(e,t)=>t.label;function fe(e,t){if(e&1&&(a(0,`span`,19),u(1,`ui-icon`,39),_(2),r()),e&2){let e=f(2);v(),p(`size`,14),v(),w(e.t()(`cooperatives.status.archived`))}}function pe(e,t){if(e&1&&(a(0,`span`,20),u(1,`ui-icon`,40),_(2),r()),e&2){let e=f(2);v(),p(`size`,14),v(),w(e.t()(`cooperatives.status.active`))}}function me(e,t){if(e&1&&(a(0,`span`,21),u(1,`ui-icon`,41),_(2),r()),e&2){let e=f(2);v(),p(`size`,14),v(),w(e.t()(`cooperatives.badge.new`))}}function he(e,t){if(e&1&&(a(0,`span`,22),_(1),r()),e&2){let e=f();v(),w(e.code)}}function ge(e,t){if(e&1&&(a(0,`span`,24),u(1,`ui-icon`,42),_(2),r()),e&2){let e=f(),t=f();v(),p(`size`,16),v(),w(t.t()(`cooperatives.fiche.created`,c(2,H,t.fmtDate(e.createdAt))))}}function _e(e,t){if(e&1&&(a(0,`span`,34),_(1),r()),e&2){let e=t;v(),b(``,e.email,``,e.phone?` · `+e.phone:``)}}function ve(e,t){if(e&1&&(a(0,`span`,43),_(1),r()),e&2){let e=f(2);x(`background`,e.account(e.manager().state).bg)(`color`,e.account(e.manager().state).fg),v(),w(e.t()(e.account(e.manager().state).label))}}function ye(e,t){if(e&1&&(a(0,`span`,46),_(1),r()),e&2){let e=f().$implicit;v(),w(e.count)}}function be(e,n){if(e&1){let e=l();a(0,`button`,44),t(`click`,function(){let t=m(e).$implicit,n=f(2);return o(n.tab.set(t.id))}),u(1,`ui-icon`,45),_(2),D(3,ye,2,1,`span`,46),r()}if(e&2){let e=n.$implicit,t=f(2);y(`on`,t.tab()===e.id),C(`aria-selected`,t.tab()===e.id),v(),p(`name`,e.icon)(`size`,18),v(),S(``,e.label,` `),v(),h(e.count===null?-1:3)}}function xe(e,t){if(e&1&&(a(0,`div`,81)(1,`span`,82),u(2,`ui-icon`,45),r(),a(3,`div`,83)(4,`span`,84),_(5),r(),a(6,`span`,85),u(7,`ui-icon`,45),r()(),a(8,`span`,86),_(9),r(),a(10,`span`,87),_(11),r()()),e&2){let e=t.$implicit,n=t.$index;x(`background`,n===0?`var(--v2-foret)`:e.bg)(`border-color`,n===0?`var(--v2-foret)`:`transparent`)(`color`,n===0?`var(--v2-blanc)`:e.fg),v(),x(`color`,n===0?`var(--v2-citron)`:e.fg),v(),p(`name`,e.icon)(`size`,120),v(2),x(`opacity`,n===0?.8:1),v(),w(e.label),v(),x(`background`,n===0?`var(--v2-citron)`:e.fg)(`color`,n===0?`var(--v2-foret)`:e.bg),v(),p(`name`,e.icon)(`size`,20),v(2),w(e.value),v(2),w(e.sub)}}function Se(e,t){if(e&1&&(a(0,`li`,62)(1,`span`,88),u(2,`span`,89),_(3),r(),a(4,`span`,90),_(5),r()()),e&2){let e=t.$implicit,n=f(4);v(2),x(`background`,e.color),v(),w(e.label),v(),y(`zero`,!e.n),v(),w(n.nf.format(e.n))}}function Ce(e,t){if(e&1&&(a(0,`li`)(1,`div`,91)(2,`span`),_(3),r(),a(4,`span`,90),_(5),a(6,`span`,92),_(7),r()()(),a(8,`div`,93),u(9,`span`),r()()),e&2){let e=t.$implicit,n=f(4);v(3),w(e.label),v(),y(`zero`,!e.n),v(),S(``,n.nf.format(e.n),` `),v(2),S(`· `,e.pct,` %`),v(2),x(`width`,e.pct,`%`)(`background`,e.color)}}function we(e,t){if(e&1&&(a(0,`div`,94)(1,`dt`),_(2),r(),a(3,`dd`),_(4),r()()),e&2){let e=t.$implicit,n=t.$index;x(`border-top`,n===0?`none`:`1px solid var(--v2-separateur)`),v(2),w(e.label),v(),y(`zero`,!e.known),v(),w(e.value)}}function Te(e,t){if(e&1&&(a(0,`li`)(1,`a`,95)(2,`span`,96),u(3,`ui-icon`,45),r(),a(4,`span`,97),_(5),r(),a(6,`span`,98),_(7),r(),u(8,`ui-icon`,99),r()()),e&2){let e=t.$implicit,n=f(4);v(),p(`routerLink`,e.to),v(),x(`background`,e.fg)(`color`,e.bg),v(),p(`name`,e.icon)(`size`,20),v(2),w(e.label),v(),y(`zero`,!e.n),v(),w(n.nf.format(e.n)),v(),p(`size`,18)}}function Ee(e,t){if(e&1&&(a(0,`li`)(1,`a`,95)(2,`span`,100)(3,`span`,101),_(4),r(),a(5,`span`,102),_(6),r()(),a(7,`span`,31)(8,`span`,103),_(9),r(),a(10,`span`,104),u(11,`ui-icon`,25),_(12),r()(),u(13,`ui-icon`,99),r()()),e&2){let e=t.$implicit;v(),p(`routerLink`,c(7,U,e.id)),v(3),w(e.day),v(2),w(e.month),v(3),w(e.title),v(2),p(`size`,14),v(),w(e.place),v(),p(`size`,18)}}function De(e,t){if(e&1&&(a(0,`li`,80),_(1),r()),e&2){let e=f(4);v(),S(` `,e.t()(`dashboard.meetings.empty`),` `)}}function Oe(n,i){if(n&1){let e=l();a(0,`section`,49),g(1,xe,12,21,`div`,50,K),r(),a(3,`div`,51)(4,`section`,52)(5,`div`,53)(6,`h2`,54),_(7),r(),u(8,`ui-icon`,55),r(),a(9,`div`,56)(10,`div`,57)(11,`div`,58)(12,`span`,59),_(13),a(14,`span`,60),_(15,` %`),r()()()(),a(16,`ul`,61),g(17,Se,6,6,`li`,62,K),r()()(),a(19,`section`,63)(20,`div`,53)(21,`h2`,64),_(22),r(),u(23,`ui-icon`,65),r(),a(24,`ul`,66),g(25,Ce,10,9,`li`,null,K),r()(),a(27,`section`,67)(28,`div`,53)(29,`h2`,68),_(30),r(),u(31,`ui-icon`,69),r(),a(32,`dl`,70),g(33,we,5,6,`div`,71,K),r()()(),a(35,`div`,72)(36,`section`,73)(37,`h2`,74),_(38),r(),a(39,`ul`,75),g(40,Te,9,12,`li`,null,K),r()(),a(42,`section`,76)(43,`div`,53)(44,`h2`,77),_(45),r(),a(46,`button`,78),t(`click`,function(){m(e);let t=f(3);return o(t.tab.set(`reunions`))}),_(47),u(48,`ui-icon`,79),r()(),a(49,`ul`,75),g(50,Ee,14,9,`li`,null,G,!1,De,2,1,`li`,80),r()()()}if(n&2){let t=f(3);v(),e(t.stats()),v(6),w(t.t()(`dashboard.quality.title`)),v(),p(`size`,22),v(2),x(`background`,t.quality().ring),C(`aria-label`,t.quality().pct+` % `+t.t()(`dashboard.quality.ring`)),v(3),w(t.quality().pct),v(4),e(t.quality().rows),v(5),w(t.t()(`cooperatives.fiche.compo.title`)),v(),p(`size`,22),v(2),e(t.composition()),v(5),w(t.t()(`cooperatives.fiche.info.title`)),v(),p(`size`,22),v(2),e(t.info()),v(5),w(t.t()(`cooperatives.fiche.pending.title`)),v(2),e(t.pending()),v(5),w(t.t()(`dashboard.meetings.title`)),v(2),S(` `,t.t()(`cooperatives.fiche.reunions.all`),` `),v(),p(`size`,16),v(2),e(t.upcoming())}}function ke(e,n){if(e&1){let e=l();a(0,`button`,112),t(`click`,function(){let t=m(e).$implicit,n=f(4);return o(n.orgFilter.set(t.id))}),_(1),a(2,`span`,46),_(3),r()()}if(e&2){let e=n.$implicit,t=f(4);y(`on`,t.orgFilter()===e.id),C(`aria-checked`,t.orgFilter()===e.id),v(),S(` `,e.label),v(),y(`zero`,!e.count),v(),w(e.count)}}function Ae(e,t){if(e&1&&(a(0,`span`,43),_(1),r()),e&2){let e=f().$implicit;x(`background`,e.type===`GIE`?`var(--v2-info-bg)`:`var(--v2-creme)`)(`color`,e.type===`GIE`?`var(--v2-info-fg)`:`var(--v2-ardoise)`),v(),w(e.type)}}function je(e,t){if(e&1&&(a(0,`span`,129),_(1),r()),e&2){let e=f(6);v(),w(e.t()(`cooperatives.fiche.gie.toQualify`))}}function Me(e,n){if(e&1){let e=l();a(0,`tr`,122),t(`click`,function(){let t=m(e).$implicit,n=f(5);return o(n.openDetail(`org`,t.id))}),a(1,`td`,123)(2,`span`,124)(3,`span`,125),u(4,`ui-icon`,126),r(),a(5,`span`,127),_(6),r()()(),a(7,`td`,128),D(8,Ae,2,5,`span`,35)(9,je,2,1,`span`,129),r(),a(10,`td`,130),_(11),r(),a(12,`td`,131),_(13),r(),a(14,`td`,132),_(15),r(),a(16,`td`,133)(17,`span`,134)(18,`button`,135),t(`click`,function(t){let n=m(e).$implicit,r=f(5);return t.stopPropagation(),o(r.openDetail(`org`,n.id))}),u(19,`ui-icon`,136),r()()()()}if(e&2){let e=n.$implicit,t=f(5);v(4),p(`size`,18),v(2),w(e.name),v(2),h(e.type?8:9),v(3),w(e.village||`—`),v(),y(`zero`,!e.producers),v(),S(` `,t.nf.format(e.producers),` `),v(),y(`zero`,!e.members),v(),S(` `,t.nf.format(e.members),` `),v(3),p(`title`,t.t()(`common.view`)),C(`aria-label`,t.t()(`cooperatives.fiche.view.aria`,c(13,W,e.name))),v(),p(`size`,18)}}function Ne(t,n){if(t&1&&(a(0,`div`,113)(1,`table`,114)(2,`thead`)(3,`tr`,115)(4,`th`,116),_(5),r(),a(6,`th`,117),_(7),r(),a(8,`th`,117),_(9),r(),a(10,`th`,118),_(11),r(),a(12,`th`,118),_(13),r(),a(14,`th`,119),_(15),r()()(),a(16,`tbody`),g(17,Me,20,15,`tr`,120,G),r()()(),u(19,`ui-pagination`,121)),t&2){let t=f(4);v(5),w(t.t()(`cooperatives.fiche.gie.col.name`)),v(2),w(t.t()(`cooperatives.fiche.gie.col.type`)),v(2),w(t.t()(`cooperatives.fiche.gie.col.village`)),v(2),S(` `,t.t()(`cooperatives.fiche.gie.col.producers`),` `),v(2),S(` `,t.t()(`cooperatives.fiche.gie.col.members`),` `),v(2),S(` `,t.t()(`cooperatives.col.actions`),` `),v(2),e(t.orgPager.items()),v(2),p(`pager`,t.orgPager)}}function Pe(e,t){if(e&1&&(a(0,`p`,111),_(1),r()),e&2){let e=f(4);v(),S(` `,e.orgCount()?e.t()(`cooperatives.fiche.gie.empty.filtered`):e.t()(`cooperatives.fiche.gie.empty.text`),` `)}}function Fe(n,i){if(n&1){let e=l();a(0,`section`,47)(1,`div`,105)(2,`label`,106),u(3,`ui-icon`,107),a(4,`input`,108),t(`input`,function(t){m(e);let n=f(3);return o(n.gieQ.set(t.target.value))}),r()(),a(5,`div`,109),g(6,ke,4,7,`button`,110,G),r()(),D(8,Ne,20,7)(9,Pe,2,1,`p`,111),r()}if(n&2){let t=f(3);v(3),p(`size`,20),v(),p(`placeholder`,t.t()(`cooperatives.fiche.gie.search.placeholder`))(`value`,t.gieQ()),C(`aria-label`,t.t()(`cooperatives.fiche.gie.search.aria`)),v(),C(`aria-label`,t.t()(`cooperatives.fiche.tab.orgs`)),v(),e(t.orgFilters()),v(2),h(t.orgs().length?8:9)}}function Ie(e,n){if(e&1){let e=l();a(0,`button`,112),t(`click`,function(){let t=m(e).$implicit,n=f(4);return o(n.memberFilter.set(t.id))}),_(1),a(2,`span`,46),_(3),r()()}if(e&2){let e=n.$implicit,t=f(4);y(`on`,t.memberFilter()===e.id),C(`aria-checked`,t.memberFilter()===e.id),v(),S(` `,e.label),v(),y(`zero`,!e.count),v(),w(e.count)}}function Le(e,t){if(e&1&&(a(0,`span`,140),_(1),r()),e&2){let e=f().$implicit;v(),w(e.phone)}}function Re(e,t){if(e&1&&(a(0,`span`,43),_(1),r()),e&2){let e=f().$implicit;x(`background`,e.due.bg)(`color`,e.due.fg),v(),w(e.dueLabel)}}function ze(e,t){e&1&&(a(0,`span`,92),_(1,`—`),r())}function Be(e,n){if(e&1){let e=l();a(0,`tr`,122),t(`click`,function(){let t=m(e).$implicit,n=f(5);return o(n.openDetail(`member`,t.id))}),a(1,`td`,116)(2,`span`,124)(3,`span`,138),_(4),r(),a(5,`span`,16)(6,`span`,139),_(7),r(),D(8,Le,2,1,`span`,140),r()()(),a(9,`td`,141),_(10),r(),a(11,`td`,117)(12,`span`,43),_(13),r()(),a(14,`td`,142),_(15),r(),a(16,`td`,117),D(17,Re,2,5,`span`,35)(18,ze,2,0,`span`,92),r(),a(19,`td`,133)(20,`span`,134)(21,`button`,135),t(`click`,function(t){let n=m(e).$implicit,r=f(5);return t.stopPropagation(),o(r.openDetail(`member`,n.id))}),u(22,`ui-icon`,136),r()()()()}if(e&2){let e=n.$implicit,t=f(5);v(4),w(e.initials),v(3),w(e.name),v(),h(e.phone?8:-1),v(2),w(e.village||`—`),v(2),x(`background`,e.status.bg)(`color`,e.status.fg),v(),w(t.t()(e.status.label)),v(2),w(e.joined),v(2),h(e.due?17:18),v(4),p(`title`,t.t()(`common.view`)),C(`aria-label`,t.t()(`cooperatives.fiche.view.aria`,c(14,W,e.name))),v(),p(`size`,18)}}function Ve(t,n){if(t&1&&(a(0,`div`,113)(1,`table`,137)(2,`thead`)(3,`tr`,115)(4,`th`,116),_(5),r(),a(6,`th`,117),_(7),r(),a(8,`th`,117),_(9),r(),a(10,`th`,117),_(11),r(),a(12,`th`,117),_(13),r(),a(14,`th`,119),_(15),r()()(),a(16,`tbody`),g(17,Be,23,16,`tr`,120,G),r()()(),u(19,`ui-pagination`,121)),t&2){let t=f(4);v(5),S(` `,t.t()(`cooperatives.fiche.membres.col.name`),` `),v(2),w(t.t()(`cooperatives.fiche.gie.col.village`)),v(2),S(` `,t.t()(`cooperatives.fiche.membres.col.status`),` `),v(2),w(t.t()(`cooperatives.fiche.membres.joined`)),v(2),S(` `,t.t()(`cooperatives.fiche.membres.col.dues`),` `),v(2),S(` `,t.t()(`cooperatives.col.actions`),` `),v(2),e(t.memberPager.items()),v(2),p(`pager`,t.memberPager)}}function He(e,t){if(e&1&&(a(0,`p`,111),_(1),r()),e&2){let e=f(4);v(),S(` `,e.t()(`cooperatives.fiche.membres.empty.filtered`),` `)}}function Ue(n,i){if(n&1){let e=l();a(0,`section`,47)(1,`div`,105)(2,`label`,106),u(3,`ui-icon`,107),a(4,`input`,108),t(`input`,function(t){m(e);let n=f(3);return o(n.memberQ.set(t.target.value))}),r()(),a(5,`div`,109),g(6,Ie,4,7,`button`,110,G),r()(),D(8,Ve,20,7)(9,He,2,1,`p`,111),r()}if(n&2){let t=f(3);v(3),p(`size`,20),v(),p(`placeholder`,t.t()(`cooperatives.fiche.membres.search.placeholder`))(`value`,t.memberQ()),C(`aria-label`,t.t()(`cooperatives.fiche.membres.search.aria`)),v(),C(`aria-label`,t.t()(`cooperatives.fiche.membres.col.status`)),v(),e(t.memberFilters()),v(2),h(t.members().length?8:9)}}function We(e,n){if(e&1){let e=l();a(0,`div`,143)(1,`button`,146),t(`click`,function(){m(e);let t=f(4);return o(t.techOpen.set(!0))}),_(2),a(3,`span`,147),u(4,`ui-icon`,148),r()()()}if(e&2){let e=f(4);v(2),S(` `,e.t()(`tech.add`),` `),v(2),p(`size`,18)}}function Ge(e,t){if(e&1&&(a(0,`span`,151),_(1),r()),e&2){let e=f(6);v(),w(e.t()(`tech.status.invited`))}}function Ke(e,t){if(e&1&&(a(0,`span`,43),_(1),r()),e&2){let e=f().$implicit,t=f(5);x(`background`,e.active?`var(--v2-sauge)`:`var(--v2-lin)`)(`color`,e.active?`var(--v2-vert-pousse)`:`var(--v2-gris-texte)`),v(),S(` `,e.active?t.t()(`cooperatives.fiche.techniciens.active`):t.t()(`cooperatives.fiche.techniciens.closed`),` `)}}function qe(e,n){if(e&1){let e=l();a(0,`button`,153),t(`click`,function(t){m(e);let n=f().$implicit,r=f(5);return t.stopPropagation(),o(r.removeTech(n.id,n.name))}),u(1,`ui-icon`,154),r()}if(e&2){let e=f().$implicit,t=f(5);p(`title`,t.t()(`tech.remove`)),C(`aria-label`,t.t()(`tech.removeAria`,c(3,W,e.name))),v(),p(`size`,18)}}function Je(e,n){if(e&1){let e=l();a(0,`tr`,122),t(`click`,function(){let t=m(e).$implicit,n=f(5);return o(n.openDetail(`tech`,t.id))}),a(1,`td`,116)(2,`span`,124)(3,`span`,149),_(4),r(),a(5,`span`,16)(6,`span`,139),_(7),r(),a(8,`span`,150),_(9),r()()()(),a(10,`td`,142),_(11),r(),a(12,`td`,117)(13,`span`,151),_(14),r()(),a(15,`td`,117),D(16,Ge,2,1,`span`,151)(17,Ke,2,5,`span`,35),r(),a(18,`td`,133)(19,`span`,134),D(20,qe,2,5,`button`,152),a(21,`button`,135),t(`click`,function(t){let n=m(e).$implicit,r=f(5);return t.stopPropagation(),o(r.openDetail(`tech`,n.id))}),u(22,`ui-icon`,136),r()()()()}if(e&2){let e=n.$implicit,t=f(5);v(4),w(e.initials),v(3),w(e.name),v(2),w(e.email),v(),y(`zero`,!e.phone),v(),S(` `,e.phone||`—`,` `),v(3),S(` `,t.t()(e.scoops>1?`cooperatives.fiche.techniciens.scoops.autre`:`cooperatives.fiche.techniciens.scoops.un`,c(12,de,e.scoops)),` `),v(2),h(e.invited?16:17),v(4),h(t.canManageTech()?20:-1),v(),p(`title`,t.t()(`common.view`)),C(`aria-label`,t.t()(`cooperatives.fiche.view.aria`,c(14,W,e.name))),v(),p(`size`,18)}}function Ye(t,n){if(t&1&&(a(0,`div`,144)(1,`div`,113)(2,`table`,137)(3,`thead`)(4,`tr`,115)(5,`th`,116),_(6),r(),a(7,`th`,117),_(8),r(),a(9,`th`,117),_(10),r(),a(11,`th`,117),_(12),r(),a(13,`th`,119),_(14),r()()(),a(15,`tbody`),g(16,Je,23,16,`tr`,120,G),r()()(),u(18,`ui-pagination`,121),r()),t&2){let t=f(4);v(6),S(` `,t.t()(`cooperatives.fiche.membres.col.name`),` `),v(2),w(t.t()(`cooperatives.fiche.detail.phone`)),v(2),w(t.t()(`cooperatives.fiche.detail.scoops`)),v(2),S(` `,t.t()(`cooperatives.fiche.membres.col.status`),` `),v(2),S(` `,t.t()(`cooperatives.col.actions`),` `),v(2),e(t.techPager.items()),v(2),p(`pager`,t.techPager)}}function Xe(e,t){if(e&1&&(a(0,`div`,145)(1,`span`,155),u(2,`ui-icon`,156),r(),a(3,`p`,157),_(4),r(),a(5,`p`,158),_(6),r()()),e&2){let e=f(4);v(2),p(`size`,26),v(2),S(` `,e.t()(`cooperatives.fiche.techniciens.empty.title`),` `),v(2),S(` `,e.t()(`cooperatives.fiche.techniciens.empty.text`),` `)}}function Ze(e,t){if(e&1&&(a(0,`section`,48),D(1,We,5,2,`div`,143),D(2,Ye,19,6,`div`,144)(3,Xe,7,3,`div`,145),r()),e&2){let e=f(3);v(),h(e.canManageTech()?1:-1),v(),h(e.technicians().length?2:3)}}function Qe(e,n){if(e&1){let e=l();a(0,`button`,161),t(`click`,function(){let t=m(e).$implicit,n=f(4);return o(n.openDetail(`meeting`,t.id))}),a(1,`span`,162)(2,`span`,101),_(3),r(),a(4,`span`,163),_(5),r()(),a(6,`span`,31)(7,`span`,103),_(8),r(),a(9,`span`,150),_(10),r()(),a(11,`span`,43),_(12),r(),a(13,`span`,164),u(14,`ui-icon`,136),r()()}if(e&2){let e=n.$implicit,t=n.$index,r=f(4);x(`border-top`,t===0?`none`:`1px solid var(--v2-separateur)`),C(`aria-label`,r.t()(`cooperatives.fiche.view.aria`,c(20,W,e.title))),v(),x(`background`,e.past?`var(--v2-creme)`:`var(--v2-foret)`)(`color`,e.past?`var(--v2-ardoise)`:`var(--v2-blanc)`),v(2),w(e.day),v(),x(`color`,e.past?`var(--v2-gris-texte)`:`var(--v2-citron)`),v(),w(e.month),v(3),w(e.title),v(2),b(``,e.when,` · `,e.place),v(),x(`background`,e.status.bg)(`color`,e.status.fg),v(),w(r.t()(e.status.label)),v(2),p(`size`,18)}}function $e(e,t){if(e&1&&(a(0,`p`,160),_(1),r()),e&2){let e=f(4);v(),w(e.t()(`cooperatives.fiche.reunions.empty.text`))}}function et(t,n){if(t&1&&(a(0,`section`,47),g(1,Qe,15,22,`button`,159,G,!1,$e,2,1,`p`,160),u(4,`ui-pagination`,121),r()),t&2){let t=f(3);v(),e(t.meetingPager.items()),v(3),p(`pager`,t.meetingPager)}}function q(e,n){if(e&1){let e=l();a(0,`button`,182),t(`click`,function(){let t=m(e).$implicit,n=f(5);return o(n.openDetail(`member`,t.id))}),a(1,`span`,183),_(2),r(),a(3,`span`,184),_(4),r(),a(5,`span`,185),_(6),r(),a(7,`span`,164),u(8,`ui-icon`,136),r()()}if(e&2){let e=n.$implicit,t=f(5);C(`aria-label`,t.t()(`cooperatives.fiche.view.aria`,c(5,W,e.name))),v(2),w(e.initials),v(2),w(e.name),v(2),w(e.owes),v(2),p(`size`,18)}}function tt(e,t){if(e&1&&(a(0,`p`,111),_(1),r()),e&2){let e=f(5);v(),w(e.t()(`cooperatives.fiche.cot.late.none`))}}function nt(t,n){if(t&1&&(a(0,`div`,166)(1,`div`,167)(2,`span`,168),u(3,`ui-icon`,169),r(),a(4,`p`,170),_(5),r(),a(6,`p`,171),_(7),r()(),a(8,`div`,172)(9,`span`,82),u(10,`ui-icon`,40),r(),a(11,`p`,173),_(12),r(),a(13,`p`,174),_(14),r()(),a(15,`div`,175)(16,`span`,82),u(17,`ui-icon`,176),r(),a(18,`p`,173),_(19),r(),a(20,`p`,174),_(21),r()()(),a(22,`section`,177)(23,`div`,178)(24,`h2`,179),_(25),r(),a(26,`a`,180),_(27),u(28,`ui-icon`,79),r()(),g(29,q,9,7,`button`,181,G,!1,tt,2,1,`p`,111),u(32,`ui-pagination`,121),r()),t&2){let t=f(4);v(3),p(`size`,110),v(2),S(` `,t.t()(`cooperatives.fiche.cot.rule`),` `),v(2),S(` `,t.dues().ruleLabel,` `),v(3),p(`size`,110),v(2),S(` `,t.t()(`cooperatives.fiche.cot.collected`),` `),v(2),S(` `,t.dues().collected,` `),v(3),p(`size`,110),v(2),S(` `,t.t()(`cooperatives.fiche.cot.expected`),` `),v(2),S(` `,t.dues().remaining,` `),v(4),w(t.t()(`cooperatives.fiche.cot.late.title`)),v(2),S(``,t.t()(`cooperatives.fiche.cot.open`),` `),v(),p(`size`,16),v(),e(t.latePager.items()),v(3),p(`pager`,t.latePager)}}function rt(e,t){if(e&1&&(a(0,`p`,165),_(1),r()),e&2){let e=f(4);v(),w(e.t()(`cooperatives.fiche.cot.noRule`))}}function it(e,t){if(e&1&&(a(0,`section`,48),D(1,nt,33,14)(2,rt,2,1,`p`,165),r()),e&2){let e=f(3);v(),h(e.dues().rule?1:2)}}function at(e,t){if(e&1&&(a(0,`div`,38),D(1,Oe,53,15),D(2,Fe,10,6,`section`,47),D(3,Ue,10,6,`section`,47),D(4,Ze,4,2,`section`,48),D(5,et,5,2,`section`,47),D(6,it,3,1,`section`,48),r()),e&2){let e=t.$implicit;v(),h(e===`apercu`?1:-1),v(),h(e===`gie`?2:-1),v(),h(e===`membres`?3:-1),v(),h(e===`techniciens`?4:-1),v(),h(e===`reunions`?5:-1),v(),h(e===`cotisations`?6:-1)}}function ot(t,n){if(t&1&&(a(0,`section`,4),te(),a(1,`svg`,5),u(2,`path`,6)(3,`path`,7)(4,`path`,8),r(),s(),a(5,`nav`,9)(6,`a`,10),_(7),r(),u(8,`ui-icon`,11),a(9,`span`,12),_(10),r()(),a(11,`div`,13)(12,`div`,14)(13,`span`,15),_(14),r(),a(15,`div`,16)(16,`h1`,17),_(17),r(),a(18,`div`,18),D(19,fe,3,2,`span`,19)(20,pe,3,2,`span`,20),D(21,me,3,2,`span`,21),D(22,he,2,1,`span`,22),r(),a(23,`p`,23)(24,`span`,24),u(25,`ui-icon`,25),_(26),r(),D(27,ge,3,4,`span`,24),a(28,`span`,24),u(29,`ui-icon`,26),_(30),r()()()(),a(31,`a`,27),u(32,`ui-icon`,28),_(33),r()(),a(34,`div`,29)(35,`span`,30),_(36),r(),a(37,`span`,31)(38,`span`,32),_(39),r(),a(40,`span`,33),_(41),r(),D(42,_e,2,2,`span`,34),r(),D(43,ve,2,5,`span`,35),r()(),a(44,`div`,36),g(45,be,4,7,`button`,37,G),r(),g(47,at,7,6,`div`,38,E)),t&2){let t,r=n,i=f();v(5),C(`aria-label`,i.t()(`cooperatives.fiche.crumb`)),v(2),w(i.t()(`cooperatives.fiche.crumb`)),v(),p(`size`,16),v(2),w(r.name),v(4),w(i.mono()),v(3),S(` `,r.name,` `),v(2),h(r.archived?19:20),v(2),h(i.isNew()?21:-1),v(),h(r.code?22:-1),v(3),p(`size`,16),v(),w(i.place()),v(),h(r.createdAt?27:-1),v(2),p(`size`,16),v(),b(``,i.t()(`cooperatives.network.faitiere`),` `,i.t()(`cooperatives.network.faitiereName`)),v(2),p(`size`,18),v(),S(``,i.t()(`cooperatives.fiche.back`),` `),v(3),w(i.manager().initials||`—`),v(3),w(i.t()(`cooperatives.fiche.manager`)),v(2),w(i.manager().user?.name??i.t()(`cooperatives.fiche.managerNone`)),v(),h((t=i.manager().user)?42:-1,t),v(),h(i.manager().user?43:-1),v(),C(`aria-label`,i.t()(`cooperatives.fiche.tabs.aria`)),v(),e(i.tabs()),v(2),e(c(23,V,i.tab()))}}function st(e,t){if(e&1&&(a(0,`div`,1)(1,`span`,186),u(2,`ui-icon`,187),r(),a(3,`h1`,188),_(4),r(),a(5,`p`,92),_(6),r(),a(7,`a`,189),_(8),u(9,`ui-icon`,79),r()()),e&2){let e=f();v(2),p(`size`,26),v(2),w(e.t()(`cooperatives.fiche.notFound.title`)),v(2),w(e.t()(`cooperatives.fiche.notFound.text`)),v(2),S(``,e.t()(`cooperatives.fiche.back`),` `),v(),p(`size`,16)}}var ct={active:{label:`cooperatives.badge.active`,bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},invited:{label:`cooperatives.badge.invited`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},expired:{label:`cooperatives.badge.expired`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`},closed:{label:`cooperatives.badge.closed`,bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`},none:{label:`cooperatives.account.none`,bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`}},J={membre:{label:`cooperatives.fiche.status.membre`,bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},candidat:{label:`cooperatives.fiche.status.candidat`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},suspendu:{label:`cooperatives.fiche.status.suspendu`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`},sorti:{label:`cooperatives.fiche.status.sorti`,bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`}},Y={planifiée:{label:`cooperatives.fiche.meeting.planned`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},tenue:{label:`cooperatives.fiche.meeting.held`,bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},annulée:{label:`cooperatives.fiche.meeting.cancelled`,bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`}},X={"à jour":{bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},"en retard":{bg:`var(--v2-erreur-bg)`,fg:`var(--v2-erreur-fg)`},"jamais payé":{bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`}},Z=8,Q=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),$=e=>e.split(` `).filter(Boolean).map(e=>e[0]).slice(0,2).join(``).toUpperCase(),lt=class e{constructor(){this.route=O(T),this.store=O(I),this.locale=O(M),this.t=this.locale.t,this.snackbar=O(se),this.nf=j,this.fmtDate=k,this.perms=[`scoop.manage`,`org.read`],this.tab=i(`apercu`),this.gieQ=i(``),this.memberQ=i(``),this.memberFilter=i(`tous`),this.orgFilter=i(`tous`),this.orgTypes=n(()=>{let e=new Map,t=0;for(let n of this.base().orgs)n.type?e.set(n.type,(e.get(n.type)??0)+1):t++;let n=[...e].sort((e,t)=>t[1]-e[1]).map(([e,t])=>({id:e,label:e,count:t}));return t&&n.push({id:`aucun`,label:this.t()(`cooperatives.fiche.gie.toQualify`),count:t}),n}),this.memberFilters=n(()=>{let e=this.t(),t=this.base().members,n=e=>t.filter(t=>e.includes(t.status)).length;return[{id:`tous`,label:e(`cooperatives.fiche.filter.allAdherents`),count:t.length},{id:`membre`,label:e(`cooperatives.fiche.filter.active`),count:n([`membre`])},{id:`candidat`,label:e(`cooperatives.fiche.filter.candidates`),count:n([`candidat`])},{id:`autres`,label:e(`cooperatives.fiche.filter.others`),count:n([`suspendu`,`sorti`])}]}),this.orgFilters=n(()=>[{id:`tous`,label:this.t()(`cooperatives.fiche.filter.allOrgs`),count:this.base().orgs.length},...this.orgTypes()]),this.id=ae(this.route.paramMap.pipe(ne(e=>e.get(`id`)??``)),{initialValue:``}),this.scoop=n(()=>this.store.state().scoops.find(e=>e.id===this.id())),this.mono=n(()=>{let e=this.scoop();return e?(e.code??e.name.replace(/[^A-Za-zÀ-ÿ]/g,``).slice(0,3)).toUpperCase().slice(0,4):``}),this.place=n(()=>{let e=this.scoop();return e?[e.commune,e.region].filter(Boolean).join(`, `):``}),this.isNew=n(()=>{let e=this.scoop();return!!e?.createdAt&&Date.now()-new Date(e.createdAt).getTime()<7776e6}),this.manager=n(()=>{let e=N(this.store.state().users,this.id());return{user:e,state:P(e,Date.now()),initials:e?$(e.name):``}}),this.base=n(()=>{let e=this.store.state(),t=this.id();return{producers:e.producers.filter(e=>e.scoopId===t&&!e.mergedInto),members:e.members.filter(e=>e.scoopId===t),orgs:e.orgs.filter(e=>e.scoopId===t),technicians:e.users.filter(e=>e.role===`technicien`&&(e.scoopIds?.includes(t)||e.scoopId===t)),meetings:e.meetings.filter(e=>e.scoopId===t).sort((e,t)=>t.date.localeCompare(e.date))}}),this.orgCount=n(()=>this.base().orgs.length),this.tabs=n(()=>{let e=this.t(),t=this.base(),n=e=>e.replace(/\s*\(\d+\)/,``);return[{id:`apercu`,icon:`space_dashboard`,label:e(`cooperatives.fiche.tab.apercu`),count:null},{id:`gie`,icon:`hub`,label:this.orgTypes().length?`${e(`cooperatives.fiche.tab.orgs`)} (${this.orgTypes().map(e=>e.label).join(`, `)})`:e(`cooperatives.fiche.tab.orgs`),count:t.orgs.length},{id:`membres`,icon:`group`,label:e(`cooperatives.fiche.tab.adherents`),count:t.members.length},{id:`techniciens`,icon:`person`,label:n(e(`cooperatives.fiche.tab.techniciens`,{count:0})),count:t.technicians.length},{id:`reunions`,icon:`event`,label:n(e(`cooperatives.fiche.tab.reunions`,{count:0})),count:t.meetings.length},{id:`cotisations`,icon:`payments`,label:n(e(`cooperatives.fiche.tab.cotisations`,{count:0})),count:null}]}),this.stats=n(()=>{let e=this.t(),t=this.base(),n=t.members.filter(e=>e.status===`membre`).length,r=t.technicians.filter(e=>e.active).length,i=this.orgTypes().map(e=>`${e.count} ${e.label===e.label.toUpperCase()?e.label:e.label.toLowerCase()}`).join(` · `);return[{label:e(`cooperatives.card.producers`),value:j.format(t.producers.length),sub:e(`cooperatives.structure.producersSub`),icon:`agriculture`,bg:``,fg:``},{label:e(`cooperatives.fiche.kpi.adherents`),value:j.format(t.members.length),sub:e(`cooperatives.fiche.kpi.adherentsSub`,{count:n}),icon:`group`,bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},{label:e(`cooperatives.fiche.kpi.orgs`),value:j.format(t.orgs.length),sub:i||e(`cooperatives.fiche.gie.empty.title`),icon:`hub`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},{label:e(`cooperatives.fiche.kpi.techniciansTotal`),value:j.format(t.technicians.length),sub:e(`cooperatives.fiche.kpi.techniciansSub`,{count:r}),icon:`person`,bg:`var(--v2-culture-bg)`,fg:`var(--v2-culture-fg)`}]}),this.quality=n(()=>{let e=this.base().producers,t=this.t(),n=[{label:t(`dashboard.quality.validated`),n:e.filter(e=>e.quality===`validé`).length,color:`var(--v2-vert-pousse)`},{label:t(`dashboard.quality.toVerify`),n:e.filter(e=>e.quality===`à vérifier`).length,color:`var(--v2-soleil)`},{label:t(`dashboard.quality.duplicate`),n:e.filter(e=>e.quality===`doublon`).length,color:`var(--v2-info-fg)`},{label:t(`dashboard.quality.invalid`),n:e.filter(e=>e.quality===`invalide`).length,color:`var(--v2-erreur-fg)`}],r=e.length||1,i=0,a=n.map(e=>{let t=i/r*100;return i+=e.n,`${e.color} ${t}% ${i/r*100}%`});return{rows:n,pct:Math.round(n[0].n/r*100),ring:e.length?`conic-gradient(${a.join(`, `)})`:`var(--v2-lin)`}}),this.composition=n(()=>{let e=this.t(),t=this.base().producers,n=t.length||1,r=this.store.state().youthMaxAge,i=t.filter(e=>e.sex===`F`).length,a=t.filter(e=>le(e.age,r)).length,o=t.filter(e=>e.handicap).length;return[{label:e(`cooperatives.fiche.compo.women`),n:i,pct:Math.round(i/n*100),color:`var(--v2-chart-2)`},{label:e(`cooperatives.fiche.compo.youth`,{age:r}),n:a,pct:Math.round(a/n*100),color:`var(--v2-foret)`},{label:e(`cooperatives.fiche.compo.handicap`),n:o,pct:Math.round(o/n*100),color:`var(--v2-soleil)`}]}),this.info=n(()=>{let e=this.t(),t=this.scoop(),n=e(`cooperatives.fiche.info.none`);return[{label:e(`cooperatives.fiche.info.code`),value:t?.code??n,known:!!t?.code},{label:e(`cooperatives.fiche.info.commune`),value:t?.commune||n,known:!!t?.commune},{label:e(`cooperatives.fiche.info.region`),value:t?.region||n,known:!!t?.region},{label:e(`cooperatives.fiche.info.created`),value:t?.createdAt?k(t.createdAt):n,known:!!t?.createdAt},{label:e(`cooperatives.network.faitiere`),value:e(`cooperatives.network.faitiereName`),known:!0},{label:e(`cooperatives.fiche.info.villages`),value:j.format(new Set(this.base().producers.map(e=>e.village).filter(Boolean)).size),known:!0}]}),this.pending=n(()=>{let e=this.store.state(),t=this.t(),n=this.id(),r=new Set(this.base().producers.map(e=>e.id)),i=new Map(e.plots.map(e=>[e.id,e.producerId])),a=e.dossiers.filter(e=>e.scoopId===n&&(e.status===`soumis`||e.status===`en examen`)).length,o=e.corrections.filter(e=>e.status===`en attente`&&r.has(e.producerId)).length,s=e.alerts.filter(e=>e.status===`ouvert`&&r.has(e.entity===`producteur`?e.entityId:i.get(e.entityId)??``)).length;return[{label:t(`cooperatives.fiche.pending.dossiers`),n:a,icon:`folder_shared`,to:`/dashboard/dossiers`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},{label:t(`cooperatives.fiche.pending.corrections`),n:o,icon:`edit`,to:`/dashboard/qualite/corrections`,bg:`var(--v2-culture-bg)`,fg:`var(--v2-culture-fg)`},{label:t(`cooperatives.fiche.pending.alerts`),n:s,icon:`warning`,to:`/dashboard/qualite/alertes`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`}]}),this.upcoming=n(()=>{let e=new Date().toISOString();return this.base().meetings.filter(t=>t.status===`planifiée`&&t.date>=e).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,3).map(e=>this.meetingView(e))}),this.meetings=n(()=>this.base().meetings.map(e=>this.meetingView(e))),this.orgs=n(()=>{let e=this.base(),t=Q(this.gieQ().trim()),n=this.store.state().members;return e.orgs.map(t=>({id:t.id,name:t.name,type:t.type,village:t.village,producers:e.producers.filter(e=>e.orgId===t.id).length,members:n.filter(e=>e.orgId===t.id&&e.status===`membre`).length})).filter(e=>!t||Q(`${e.name} ${e.village}`).includes(t)).filter(e=>{let t=this.orgFilter();return t===`tous`||(t===`aucun`?!e.type:e.type===t)}).sort((e,t)=>t.producers-e.producers)}),this.duesOf=n(()=>{let e=this.store.state(),t=e.contributionRules.find(e=>e.scoopId===this.id()),n=new Date().toISOString();return{rule:t,map:new Map(this.base().members.map(r=>[r.id,ue(r,t,e.payments,n)]))}}),this.members=n(()=>{let e=Q(this.memberQ().trim()),{map:t}=this.duesOf();return this.base().members.filter(t=>!e||Q(`${t.firstName} ${t.lastName} ${t.village}`).includes(e)).filter(e=>{let t=this.memberFilter();return t===`tous`||(t===`autres`?e.status===`suspendu`||e.status===`sorti`:e.status===t)}).sort((e,t)=>`${e.lastName}${e.firstName}`.localeCompare(`${t.lastName}${t.firstName}`)).map(e=>{let n=t.get(e.id),r=n&&n.state!==`non exigible`?X[n.state]??null:null;return{id:e.id,name:`${e.firstName} ${e.lastName}`,initials:$(`${e.firstName} ${e.lastName}`),phone:this.store.phone(e.phone),village:e.village,status:J[e.status]??J.membre,joined:e.joinedAt?k(e.joinedAt):`—`,due:r,dueLabel:n?n.state===`en retard`||n.state===`jamais payé`?`${n.state} · ${j.format(n.balance)} FCFA`:n.state:``}})}),this.technicians=n(()=>this.base().technicians.map(e=>({id:e.id,name:e.name,email:e.email,phone:this.store.phone(e.phone),initials:$(e.name),active:e.active,invited:!!e.invited||!!e.activation,scoops:e.scoopIds?.length??1}))),this.techOpen=i(!1),this.canManageTech=n(()=>this.store.can(`user.manage`)||this.store.can(`technician.invite`)),this.coopId=n(()=>this.id()),this.dues=n(()=>{let{rule:e,map:t}=this.duesOf(),n=this.base().members;if(!e)return{rule:null,ruleLabel:``,collected:``,remaining:``,late:[]};let r=0,i=0,a=[];for(let e of n){let n=t.get(e.id);if(n&&(r+=n.paid,i+=n.balance,n.state===`en retard`||n.state===`jamais payé`)){let t=`${e.firstName} ${e.lastName}`;a.push({id:e.id,name:t,initials:$(t),owes:`${j.format(n.balance)} FCFA`,balance:n.balance})}}return a.sort((e,t)=>t.balance-e.balance),{rule:e,ruleLabel:`${j.format(e.amount)} FCFA · ${e.periodicity}`,collected:`${j.format(r)} FCFA`,remaining:`${j.format(i)} FCFA`,late:a}}),this.orgPager=L(()=>this.orgs()),this.memberPager=L(()=>this.members()),this.techPager=L(()=>this.technicians()),this.meetingPager=L(()=>this.meetings()),this.latePager=L(()=>this.dues().late),this.detailTarget=i(null),this.detail=n(()=>{let e=this.detailTarget();if(!e)return null;let t=this.store.state(),n=this.t(),r=e=>e==null||e===``,i=(e,t,n,i={})=>({label:e,value:r(t)?`—`:t,icon:n,muted:r(t),wide:i.wide??!1,tone:i.tone}),a=(e,t,n,r,i)=>({label:e,value:i??j.format(t),icon:n,tone:r,muted:t===0}),o=e=>({label:n(e.label),bg:e.bg,fg:e.fg}),s=e=>J[e]??J.membre,c={bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},l={bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},u={bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`},d={bg:`var(--v2-culture-bg)`,fg:`var(--v2-culture-fg)`},f={bg:`var(--v2-erreur-bg)`,fg:`var(--v2-erreur-fg)`};if(e.kind===`org`){let r=t.orgs.find(t=>t.id===e.id);if(!r)return null;let f=t.members.filter(e=>e.orgId===r.id).sort((e,t)=>`${e.lastName}${e.firstName}`.localeCompare(`${t.lastName}${t.firstName}`)),p=this.base().producers.filter(e=>e.orgId===r.id).length,m=f.filter(e=>e.status===`membre`).length;return{title:r.name,subtitle:this.scoop()?.name??``,icon:`hub`,badges:[r.type?{label:r.type,...r.type===`GIE`?l:d}:{label:n(`cooperatives.fiche.gie.toQualify`),...u}],kpis:[a(n(`cooperatives.fiche.detail.producers`),p,`agriculture`,c),a(n(`cooperatives.fiche.detail.registered`),f.length,`group`,l),a(n(`cooperatives.fiche.detail.activeMembers`),m,`task_alt`,d)],facts:[i(n(`cooperatives.fiche.detail.type`),r.type??n(`cooperatives.fiche.gie.toQualify`),`hub`),i(n(`cooperatives.fiche.detail.village`),r.village,`location_on`)],sections:[{title:n(`cooperatives.fiche.detail.orgMembers`),icon:`group`,count:f.length,empty:n(`cooperatives.fiche.detail.orgMembersEmpty`),items:f.slice(0,Z).map(e=>({label:`${e.firstName} ${e.lastName}`,sub:e.village,initials:$(`${e.firstName} ${e.lastName}`),badge:o(s(e.status))})),more:Math.max(0,f.length-Z)}],link:[`/dashboard/organisations`,r.id]}}if(e.kind===`member`){let r=t.members.find(t=>t.id===e.id);if(!r)return null;let l=this.duesOf().map.get(r.id),u=r.orgId?t.orgs.find(e=>e.id===r.orgId):null,d=[...r.history].sort((e,t)=>t.at.localeCompare(e.at)),p=l&&l.state!==`non exigible`?X[l.state]:void 0;return{title:`${r.firstName} ${r.lastName}`,subtitle:[r.village,u?.name].filter(Boolean).join(` · `),icon:`person`,badges:[o(s(r.status)),...p&&l?[{label:l.state,...p}]:[]],kpis:l?[a(n(`cooperatives.fiche.detail.paid`),l.paid,`check_circle`,c,`${j.format(l.paid)} F`),a(n(`cooperatives.fiche.detail.balance`),l.balance,`payments`,l.balance>0?f:c,`${j.format(l.balance)} F`)]:[],facts:[i(n(`cooperatives.fiche.detail.phone`),this.store.phone(r.phone),`call`),i(n(`cooperatives.fiche.detail.email`),r.email,`mail`),i(n(`cooperatives.fiche.detail.org`),u?.name??n(`cooperatives.fiche.detail.direct`),`hub`),i(n(`cooperatives.fiche.detail.joined`),r.joinedAt?k(r.joinedAt):null,`calendar_today`),i(n(`cooperatives.fiche.detail.age`),r.age===null?null:n(`cooperatives.fiche.detail.ageValue`,{count:r.age}),`person`),i(n(`cooperatives.fiche.detail.dues`),l&&l.state!==`non exigible`?l.state:null,`account_balance_wallet`,{tone:p})],sections:[{title:n(`cooperatives.fiche.detail.history`),icon:`event_note`,count:d.length||null,empty:n(`cooperatives.fiche.detail.historyEmpty`),items:d.slice(0,Z).map(e=>({label:e.action,sub:`${k(e.at)} · ${e.by}`})),more:Math.max(0,d.length-Z)}],link:r.producerId?[`/dashboard/producteurs`,r.producerId]:null}}if(e.kind===`tech`){let r=t.users.find(t=>t.id===e.id);if(!r)return null;let o=t.scoops.filter(e=>r.scoopIds?.includes(e.id)||r.scoopId===e.id),s=r.active?{label:n(`cooperatives.fiche.techniciens.active`),...c}:{label:n(`cooperatives.fiche.techniciens.closed`),bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`};return{title:r.name,subtitle:r.email,icon:`person`,badges:[s],kpis:[a(n(`cooperatives.fiche.detail.scoops`),o.length,`apartment`,l)],facts:[i(n(`cooperatives.fiche.detail.email`),r.email,`mail`,{wide:!0}),i(n(`cooperatives.fiche.detail.phone`),this.store.phone(r.phone),`call`),i(n(`cooperatives.fiche.detail.account`),s.label,`account_circle`,{tone:s})],sections:[{title:n(`cooperatives.fiche.detail.scoops`),icon:`apartment`,count:o.length,empty:`—`,items:o.map(e=>({label:e.name,sub:[e.commune,e.region].filter(Boolean).join(`, `),initials:(e.code??e.name).slice(0,3).toUpperCase()})),more:0}],link:null}}let p=t.meetings.find(t=>t.id===e.id);if(!p)return null;let m=this.meetingView(p);return{title:p.title,subtitle:`${this.locale.formatDate(p.date,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`})} · ${p.place}`,icon:`event`,badges:[o(m.status),{label:p.kind,...d}],kpis:[a(n(`cooperatives.fiche.detail.agendaPoints`),p.agenda.length,`fact_check`,l),...p.status===`tenue`?[a(n(`cooperatives.fiche.detail.present`),p.presentIds.length,`group`,c)]:[],...p.status===`planifiée`&&!m.past?[a(n(`cooperatives.fiche.detail.daysLeft`),Math.ceil((new Date(p.date).getTime()-Date.now())/864e5),`calendar_today`,u)]:[]],facts:[i(n(`cooperatives.fiche.detail.date`),m.when,`calendar_today`),i(n(`cooperatives.fiche.detail.place`),p.place,`location_on`),...p.cancelReason?[i(n(`cooperatives.fiche.detail.cancelReason`),p.cancelReason,`warning`,{wide:!0})]:[]],sections:[{title:n(`cooperatives.fiche.detail.agenda`),icon:`fact_check`,count:null,empty:n(`cooperatives.fiche.detail.agendaEmpty`),items:p.agenda.map((e,t)=>({label:e,index:t+1})),more:0}],link:[`/dashboard/reunions`,p.id]}})}account(e){return ct[e]}meetingView(e){return{id:e.id,title:e.title,place:e.place,past:e.date<new Date().toISOString(),when:A(e.date),day:this.locale.formatDate(e.date,{day:`2-digit`}),month:this.locale.formatDate(e.date,{month:`short`}).replace(`.`,``),status:Y[e.status]??Y.planifiée}}removeTech(e,t){let n=this.store.state().users.find(t=>t.id===e),r=(n?.scoopIds??(n?.scoopId?[n.scoopId]:[])).filter(e=>e!==this.id()),i=this.store.actions.setTechnicianScoops(e,r);i.ok?this.snackbar.success(this.t()(`tech.removed`,{name:t})):this.snackbar.error(this.locale.tNow(i.error))}openDetail(e,t){this.detailTarget.set({kind:e,id:t})}closeDetail(){this.detailTarget.set(null)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=d({type:e,selectors:[[`app-cooperative-detail-page`]],decls:5,vars:6,consts:[[3,`perm`,`area`],[1,`card`,`rise`,`mx-auto`,`mt-16`,`flex`,`max-w-lg`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`closed`,`view`],[3,`openChange`,`open`,`scoopId`],[1,`hero`,`rise`,`p-6`,`sm:p-8`],[`viewBox`,`0 0 320 220`,`aria-hidden`,`true`,1,`pointer-events-none`,`absolute`,`-right-16`,`-top-10`,`h-72`,`w-[30rem]`,`opacity-[0.06]`],[`d`,`M10 120 Q160 60 310 110`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`d`,`M30 168 Q170 108 310 156`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`d`,`M60 212 Q180 160 310 200`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[1,`crumb`,`relative`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-semibold`],[`routerLink`,`/dashboard/cooperatives`],[`name`,`chevron_right`,2,`opacity`,`0.5`,3,`size`],[`aria-current`,`page`,2,`color`,`var(--v2-citron)`],[1,`relative`,`mt-6`,`flex`,`flex-wrap`,`items-start`,`justify-between`,`gap-6`],[1,`flex`,`min-w-0`,`items-start`,`gap-5`],[`aria-hidden`,`true`,1,`hero-mono`],[1,`min-w-0`],[1,`text-[28px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[34px]`],[1,`mt-3`,`flex`,`flex-wrap`,`gap-2`],[1,`badge`,2,`background`,`var(--v2-lin)`,`color`,`var(--v2-gris-texte)`],[1,`badge`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`],[1,`badge`,2,`background`,`var(--v2-blanc)`,`color`,`var(--v2-foret)`],[1,`badge`,2,`background`,`color-mix(in oklab, var(--v2-blanc) 12%, transparent)`,`color`,`var(--v2-blanc)`,`font-family`,`var(--v2-font-mono)`],[1,`mt-3`,`flex`,`flex-wrap`,`items-center`,`gap-x-4`,`gap-y-1`,`text-[14px]`,`font-medium`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 75%, transparent)`],[1,`inline-flex`,`items-center`,`gap-1.5`],[`name`,`location_on`,3,`size`],[`name`,`account_balance`,3,`size`],[`routerLink`,`/dashboard/cooperatives`,1,`ghost-dark`],[`name`,`arrow_forward`,2,`transform`,`rotate(180deg)`,3,`size`],[1,`relative`,`mt-6`,`flex`,`flex-wrap`,`items-center`,`gap-4`,`rounded-[20px]`,`p-4`,2,`background`,`color-mix(in oklab, var(--v2-blanc) 8%, transparent)`],[1,`grid`,`size-12`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[14px]`,`font-extrabold`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`],[1,`min-w-0`,`flex-1`],[1,`mono`,`block`,2,`color`,`var(--v2-citron)`],[1,`mt-0.5`,`block`,`truncate`,`text-[16px]`,`font-extrabold`],[1,`block`,`truncate`,`text-[13px]`,`font-medium`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 70%, transparent)`],[1,`badge`,3,`background`,`color`],[`role`,`tablist`,1,`tabs`,`rise`,`mt-6`,2,`animation-delay`,`0.08s`],[`type`,`button`,`role`,`tab`,1,`tab`,3,`on`],[`role`,`tabpanel`,1,`panel`],[`name`,`archive`,3,`size`],[`name`,`check_circle`,3,`size`],[`name`,`north_east`,3,`size`],[`name`,`calendar_today`,3,`size`],[1,`badge`],[`type`,`button`,`role`,`tab`,1,`tab`,3,`click`],[3,`name`,`size`],[1,`n`],[1,`card`,`mt-6`,`overflow-hidden`],[1,`mt-6`],[1,`mt-6`,`grid`,`grid-cols-1`,`gap-4`,`sm:grid-cols-2`,`xl:grid-cols-4`],[1,`card`,`stat`,`flex`,`flex-col`,`p-5`,3,`background`,`border-color`,`color`],[1,`mt-4`,`grid`,`gap-4`,`lg:grid-cols-3`],[`aria-labelledby`,`q-title`,1,`card`,`lift`,`p-6`],[1,`flex`,`items-center`,`justify-between`],[`id`,`q-title`,1,`h2`],[`name`,`verified`,2,`color`,`var(--v2-vert-pousse)`,3,`size`],[1,`mt-5`,`flex`,`items-center`,`gap-5`],[`role`,`img`,1,`ring`,`grid`,`size-[116px]`,`shrink-0`,`place-items-center`,`rounded-full`],[1,`grid`,`size-[88px]`,`place-items-center`,`rounded-full`,`text-center`,2,`background`,`var(--v2-blanc)`],[1,`text-[24px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`],[1,`text-[14px]`],[1,`min-w-0`,`flex-1`,`space-y-2`],[1,`flex`,`items-center`,`justify-between`,`gap-2`,`text-[13px]`],[`aria-labelledby`,`compo-title`,1,`card`,`lift`,`p-6`],[`id`,`compo-title`,1,`h2`],[`name`,`group`,2,`color`,`var(--v2-foret-clair)`,3,`size`],[1,`mt-5`,`space-y-4`],[`aria-labelledby`,`info-title`,1,`card`,`lift`,`p-6`],[`id`,`info-title`,1,`h2`],[`name`,`description`,2,`color`,`var(--v2-foret-clair)`,3,`size`],[1,`info`,`mt-4`],[1,`flex`,`items-center`,`justify-between`,`gap-4`,`py-2.5`,3,`border-top`],[1,`mt-4`,`grid`,`gap-4`,`lg:grid-cols-2`],[`aria-labelledby`,`todo-title`,1,`card`,`p-6`],[`id`,`todo-title`,1,`h2`],[1,`mt-4`,`space-y-2`],[`aria-labelledby`,`next-title`,1,`card`,`p-6`],[`id`,`next-title`,1,`h2`],[`type`,`button`,1,`link`,3,`click`],[`name`,`arrow_forward`,3,`size`],[1,`sub`,`rounded-[16px]`,`p-4`,2,`background`,`var(--v2-creme)`],[1,`card`,`stat`,`flex`,`flex-col`,`p-5`],[`aria-hidden`,`true`,1,`watermark`],[1,`relative`,`flex`,`items-center`,`justify-between`,`gap-3`],[1,`text-[14px]`,`font-bold`],[1,`grid`,`size-10`,`place-items-center`,`rounded-[12px]`],[1,`relative`,`mt-3`,`text-[34px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`relative`,`mt-2`,`truncate`,`text-[13px]`,`font-medium`,2,`opacity`,`0.75`],[1,`flex`,`items-center`,`gap-2`,`font-semibold`],[1,`size-2.5`,`rounded-full`],[1,`font-extrabold`,`tabular-nums`],[1,`flex`,`items-center`,`justify-between`,`text-[14px]`,`font-semibold`],[1,`sub`],[1,`bar`,`mt-1.5`],[1,`flex`,`items-center`,`justify-between`,`gap-4`,`py-2.5`],[1,`row-link`,`flex`,`items-center`,`gap-4`,`rounded-[16px]`,`p-3`,3,`routerLink`],[1,`grid`,`size-11`,`shrink-0`,`place-items-center`,`rounded-[14px]`],[1,`min-w-0`,`flex-1`,`text-[14px]`,`font-bold`],[1,`text-[24px]`,`font-extrabold`,`tracking-[-0.03em]`,`tabular-nums`],[`name`,`arrow_forward`,1,`go`,3,`size`],[1,`grid`,`w-14`,`shrink-0`,`place-items-center`,`rounded-[14px]`,`py-2`,`text-center`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[1,`text-[20px]`,`font-extrabold`,`leading-none`],[1,`mono`,`mt-1`,2,`color`,`var(--v2-citron)`,`font-size`,`10px`],[1,`block`,`truncate`,`text-[15px]`,`font-bold`],[1,`sub`,`flex`,`items-center`,`gap-1`,`truncate`],[1,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-3`,`p-5`],[1,`search`,`min-w-[240px]`,`flex-1`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`chips`],[`type`,`button`,`role`,`radio`,1,`chip`,3,`on`],[1,`sub`,`px-5`,`pb-6`],[`type`,`button`,`role`,`radio`,1,`chip`,3,`click`],[1,`overflow-x-auto`],[1,`w-full`,`min-w-[640px]`,`text-left`,`text-[14px]`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`px-5`,`py-3`],[1,`px-3`,`py-3`],[1,`px-3`,`py-3`,`text-right`],[1,`px-5`,`py-3`,`text-right`],[1,`row`,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row`,`row-link`,3,`click`],[1,`px-5`,`py-3.5`],[1,`flex`,`items-center`,`gap-3`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-[10px]`,2,`background`,`var(--v2-info-bg)`,`color`,`var(--v2-info-fg)`],[`name`,`hub`,3,`size`],[1,`font-bold`],[1,`px-3`,`py-3.5`],[1,`badge`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`px-3`,`py-3.5`,`font-medium`],[1,`px-3`,`py-3.5`,`text-right`,`font-extrabold`,`tabular-nums`],[1,`px-3`,`py-3.5`,`text-right`,`font-semibold`,`tabular-nums`],[1,`px-5`,`py-2.5`],[1,`flex`,`justify-end`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`w-full`,`min-w-[720px]`,`text-left`,`text-[14px]`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`,`tabular-nums`],[1,`px-3`,`py-3`,`font-medium`],[1,`px-3`,`py-3`,`font-medium`,`tabular-nums`],[1,`mb-4`,`flex`,`justify-end`],[1,`card`,`overflow-hidden`],[1,`card`,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`grid`,`size-9`,`place-items-center`,`rounded-[12px]`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`],[`name`,`person_add`,3,`size`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[1,`sub`,`block`,`truncate`],[1,`badge`,2,`background`,`var(--v2-info-bg)`,`color`,`var(--v2-info-fg)`],[`type`,`button`,1,`act`,`act-danger`,`mr-2`,3,`title`],[`type`,`button`,1,`act`,`act-danger`,`mr-2`,3,`click`,`title`],[`name`,`close`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`person`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[`type`,`button`,1,`row-link`,`flex`,`w-full`,`items-center`,`gap-4`,`px-5`,`py-4`,`text-left`,3,`border-top`],[1,`sub`,`p-6`],[`type`,`button`,1,`row-link`,`flex`,`w-full`,`items-center`,`gap-4`,`px-5`,`py-4`,`text-left`,3,`click`],[1,`grid`,`w-14`,`shrink-0`,`place-items-center`,`rounded-[14px]`,`py-2`,`text-center`],[1,`mono`,`mt-1`,2,`font-size`,`10px`],[`aria-hidden`,`true`,1,`act`],[1,`card`,`sub`,`p-6`],[1,`grid`,`grid-cols-1`,`gap-4`,`md:grid-cols-3`],[1,`card`,`stat`,`p-5`],[`aria-hidden`,`true`,1,`watermark`,2,`color`,`var(--v2-foret)`],[`name`,`description`,3,`size`],[1,`relative`,`text-[14px]`,`font-bold`,2,`color`,`var(--v2-ardoise)`],[1,`relative`,`mt-2`,`text-[26px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`],[1,`card`,`stat`,`p-5`,2,`background`,`var(--v2-sauge)`,`border-color`,`transparent`,`color`,`var(--v2-vert-pousse)`],[1,`relative`,`text-[14px]`,`font-bold`],[1,`relative`,`mt-2`,`text-[26px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`card`,`stat`,`p-5`,2,`background`,`var(--v2-attente-bg)`,`border-color`,`transparent`,`color`,`var(--v2-attente-fg)`],[`name`,`payments`,3,`size`],[1,`card`,`mt-4`,`overflow-hidden`],[1,`flex`,`items-center`,`justify-between`,`gap-3`,`p-5`],[1,`h2`],[`routerLink`,`/dashboard/cotisations`,1,`link`],[`type`,`button`,1,`row`,`row-link`,`flex`,`w-full`,`items-center`,`gap-4`,`px-5`,`py-3`,`text-left`],[`type`,`button`,1,`row`,`row-link`,`flex`,`w-full`,`items-center`,`gap-4`,`px-5`,`py-3`,`text-left`,3,`click`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[1,`min-w-0`,`flex-1`,`truncate`,`font-bold`],[1,`text-[14px]`,`font-extrabold`,`tabular-nums`,2,`color`,`var(--v2-erreur-fg)`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`warning`,3,`size`],[1,`text-[22px]`,`font-extrabold`],[`routerLink`,`/dashboard/cooperatives`,1,`link`,`mt-2`]],template:function(e,n){if(e&1&&(a(0,`app-shell`,0),D(1,ot,49,25)(2,st,10,5,`div`,1),a(3,`ui-detail-modal`,2),t(`closed`,function(){return n.closeDetail()}),r(),a(4,`app-technician-dialog`,3),ie(`openChange`,function(e){return re(n.techOpen,e)||(n.techOpen=e),e}),r()()),e&2){let e;p(`perm`,n.perms)(`area`,n.t()(`cooperatives.fiche.area`)),v(),h((e=n.scoop())?1:2,e),v(2),p(`view`,n.detail()),v(),ee(`open`,n.techOpen),p(`scoopId`,n.coopId())}},dependencies:[ce,F,oe,R,z,B],styles:[`.mono[_ngcontent-%COMP%] {
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
    .h2[_ngcontent-%COMP%] {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.02em;
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

    
    @keyframes _ngcontent-%COMP%_rise {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    @keyframes _ngcontent-%COMP%_grow {
      from {
        transform: scaleX(0);
      }
      to {
        transform: scaleX(1);
      }
    }
    @keyframes _ngcontent-%COMP%_ring-in {
      from {
        opacity: 0;
        transform: rotate(-90deg) scale(0.9);
      }
      to {
        opacity: 1;
        transform: rotate(0) scale(1);
      }
    }
    .rise[_ngcontent-%COMP%] {
      animation: _ngcontent-%COMP%_rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%] {
      animation: _ngcontent-%COMP%_rise 0.4s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(2) {
      animation-delay: 0.05s;
    }
    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(3) {
      animation-delay: 0.1s;
    }
    .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]:nth-child(4) {
      animation-delay: 0.15s;
    }
    .ring[_ngcontent-%COMP%] {
      animation: _ngcontent-%COMP%_ring-in 0.7s cubic-bezier(0.32, 0.72, 0, 1) both;
    }

    .hero[_ngcontent-%COMP%] {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .hero-mono[_ngcontent-%COMP%] {
      display: grid;
      height: 76px;
      width: 76px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 22px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
      font-family: var(--%NS%v2-font-mono);
      font-size: 20px;
      font-weight: 700;
      transition: transform 0.3s ease;
    }
    .hero[_ngcontent-%COMP%]:hover   .hero-mono[_ngcontent-%COMP%] {
      transform: rotate(-4deg) scale(1.04);
    }
    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);
      cursor: pointer;
      transition: color 0.15s ease;
    }
    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-citron);
    }
    .ghost-dark[_ngcontent-%COMP%] {
      display: inline-flex;
      height: 44px;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      border: 1.5px solid color-mix(in oklab, var(--%NS%v2-blanc) 25%, transparent);
      padding: 0 14px;
      font-size: 14px;
      font-weight: 800;
      color: var(--%NS%v2-blanc);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .ghost-dark[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-citron);
      background: color-mix(in oklab, var(--%NS%v2-blanc) 10%, transparent);
    }

    .tabs[_ngcontent-%COMP%] {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      border-radius: 18px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      padding: 6px;
    }
    .tabs[_ngcontent-%COMP%]::-webkit-scrollbar {
      display: none;
    }
    .tab[_ngcontent-%COMP%] {
      display: inline-flex;
      flex: 1 0 auto;
      justify-content: center;
      align-items: center;
      gap: 7px;
      white-space: nowrap;
      border-radius: 12px;
      padding: 10px 11px;
      font-size: 14px;
      font-weight: 700;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .tab[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-encre);
      background: var(--%NS%v2-creme);
    }
    .tab.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .tab[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      border-radius: 999px;
      padding: 0 7px;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-ardoise);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .tab.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }

    .stat[_ngcontent-%COMP%] {
      position: relative;
      overflow: hidden;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat[_ngcontent-%COMP%]:hover {
      transform: translateY(-3px);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .watermark[_ngcontent-%COMP%] {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition:
        transform 0.35s ease,
        opacity 0.35s ease;
    }
    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {
      transform: rotate(-4deg) scale(1.08);
      opacity: 0.18;
    }
    .lift[_ngcontent-%COMP%] {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
    }
    .lift[_ngcontent-%COMP%]:hover {
      transform: translateY(-2px);
      border-color: var(--%NS%v2-gris-trait);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }

    .search[_ngcontent-%COMP%] {
      display: flex;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 14px;
      background: var(--%NS%v2-creme);
      padding: 0 14px;
      color: var(--%NS%v2-gris-texte);
      transition: box-shadow 0.15s ease;
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
    .row[_ngcontent-%COMP%] {
      border-top: 1px solid var(--%NS%v2-separateur);
    }
    .row-link[_ngcontent-%COMP%] {
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .row-link[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
    }
    .row-link[_ngcontent-%COMP%]   .go[_ngcontent-%COMP%] {
      color: var(--%NS%v2-gris-trait);
      transition:
        transform 0.2s ease,
        color 0.2s ease;
    }
    .row-link[_ngcontent-%COMP%]:hover   .go[_ngcontent-%COMP%] {
      transform: translateX(3px);
      color: var(--%NS%v2-foret);
    }
    .link[_ngcontent-%COMP%] {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 700;
      color: var(--%NS%v2-foret-clair);
      cursor: pointer;
    }
    .link[_ngcontent-%COMP%]:hover {
      text-decoration: underline;
    }
    .bar[_ngcontent-%COMP%] {
      height: 8px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--%NS%v2-lin);
    }
    .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
      display: block;
      height: 100%;
      border-radius: 999px;
      transform-origin: left;
      animation: _ngcontent-%COMP%_grow 0.8s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .zero[_ngcontent-%COMP%] {
      color: var(--%NS%v2-gris-trait) !important;
    }
    
    .act[_ngcontent-%COMP%] {
      display: grid;
      height: 34px;
      width: 34px;
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
    .act-danger[_ngcontent-%COMP%]:hover, 
   .row-link[_ngcontent-%COMP%]:hover   .act-danger[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-erreur-fg);
      background: var(--%NS%v2-erreur-bg);
      color: var(--%NS%v2-erreur-fg);
    }
    .btn[_ngcontent-%COMP%] {
      display: inline-flex;
      height: 48px;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      font-size: 15px;
      font-weight: 800;
      cursor: pointer;
    }
    .btn-primary[_ngcontent-%COMP%] {
      padding: 0 6px 0 18px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .btn-primary[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    
    .chips[_ngcontent-%COMP%] {
      display: flex;
      gap: 4px;
      overflow-x: auto;
      scrollbar-width: none;
      border-radius: 14px;
      background: var(--%NS%v2-creme);
      padding: 4px;
    }
    .chips[_ngcontent-%COMP%]::-webkit-scrollbar {
      display: none;
    }
    .chip[_ngcontent-%COMP%] {
      display: inline-flex;
      flex-shrink: 0;
      align-items: center;
      gap: 6px;
      white-space: nowrap;
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .chip[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-encre);
    }
    .chip.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);
    }
    .chip[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      border-radius: 999px;
      padding: 0 7px;
      font-size: 12px;
      font-variant-numeric: tabular-nums;
      background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);
      color: var(--%NS%v2-ardoise);
    }
    .chip.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .chip[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .info[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {
      font-size: 13px;
      font-weight: 600;
      color: var(--%NS%v2-gris-texte);
    }
    .info[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
      font-size: 14px;
      font-weight: 700;
      text-align: right;
    }
    .tab[_ngcontent-%COMP%]:focus-visible, 
   .link[_ngcontent-%COMP%]:focus-visible, 
   .ghost-dark[_ngcontent-%COMP%]:focus-visible, 
   .row-link[_ngcontent-%COMP%]:focus-visible, 
   .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .rise[_ngcontent-%COMP%], 
   .panel[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%], 
   .ring[_ngcontent-%COMP%], 
   .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
        animation: none;
      }
      .stat[_ngcontent-%COMP%], 
   .stat[_ngcontent-%COMP%]:hover, 
   .lift[_ngcontent-%COMP%], 
   .lift[_ngcontent-%COMP%]:hover, 
   .watermark[_ngcontent-%COMP%], 
   .hero-mono[_ngcontent-%COMP%], 
   .row-link[_ngcontent-%COMP%]   .go[_ngcontent-%COMP%] {
        transition: none;
        transform: none;
      }
      .watermark[_ngcontent-%COMP%] {
        transform: rotate(-12deg);
      }
    }`]})}};export{lt as default};