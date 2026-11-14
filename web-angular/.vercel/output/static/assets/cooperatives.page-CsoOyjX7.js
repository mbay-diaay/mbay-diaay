import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,P as u,St as d,Vt as f,Wt as p,Xt as ee,Yn as m,_t as h,en as g,fn as _,ft as v,gt as y,ln as b,mn as x,mt as S,pn as C,rn as w,vt as T,xn as te,zn as E}from"./_router-chunk-H0-n0SZI.js";import{n as D}from"./index-B8S1FFME.js";import{l as O,n as k}from"./snackbar.component-ICe8-MWg.js";import{B as ne,S as A,W as j,b as re,t as M,x as N,xt as P}from"./locale.service-Bf8_ncMo.js";import{n as F,t as I}from"./scoop-account-D8Hf4f5D.js";import{t as L}from"./app-shell.component-CR4uAChA.js";import{t as R}from"./store.service-ZF4OfoGo.js";import{D as z,T as B,a as V,t as H}from"./ui-CQhTckzj.js";import{t as U}from"./pager-DPeF-1nO.js";var W=e=>[`/dashboard/cooperatives`,e],G=e=>({name:e}),K=(e,t)=>t.key,q=(e,t)=>t.label,J=(e,t)=>t.id,Y=(e,t)=>t.scoop.id;function X(e,n){if(e&1){let e=c();a(0,`button`,49),t(`click`,function(){m(e);let t=f();return o(t.openCreate())}),_(1),a(2,`span`,46),l(3,`ui-icon`,50),r()()}if(e&2){let e=f();v(),x(` `,e.t()(`cooperatives.new`),` `),v(2),p(`size`,20)}}function ie(e,t){if(e&1&&(a(0,`span`,53),_(1),r()),e&2){let e=f().$implicit;v(),C(e.title)}}function ae(e,t){e&1&&l(0,`ui-icon`,54),e&2&&p(`size`,16)}function oe(e,t){if(e&1&&(a(0,`span`,51),l(1,`ui-icon`,47),a(2,`span`,52),_(3),r(),T(4,ie,2,1,`span`,53),r(),T(5,ae,1,1,`ui-icon`,54)),e&2){let e=t.$implicit,n=t.$index,r=t.$count;b(`background`,e.key===`faitiere`?`var(--v2-foret)`:e.bg)(`color`,e.key===`faitiere`?`var(--v2-citron)`:e.fg),v(),p(`name`,e.icon)(`size`,14),v(2),C(e.value),v(),h(e.key===`faitiere`?-1:4),v(),h(n===r-1?-1:5)}}function se(e,t){e&1&&(a(0,`span`,62),l(1,`ui-icon`,63),r()),e&2&&(v(),p(`size`,18))}function ce(e,t){if(e&1&&(a(0,`li`,55)(1,`span`,56)(2,`span`,57),l(3,`ui-icon`,47),r(),a(4,`span`,58),_(5),r()(),a(6,`span`,59),_(7),a(8,`span`,60),_(9),r()(),a(10,`span`,61),_(11),r(),T(12,se,2,1,`span`,62),r()),e&2){let e=t.$implicit,n=t.$index,r=t.$count;y(`level-hero`,e.key===`faitiere`),v(2),b(`background`,e.bg)(`color`,e.fg),v(),p(`name`,e.icon)(`size`,20),v(),b(`color`,e.key===`faitiere`?`var(--v2-citron)`:`var(--v2-ardoise)`),v(),C(e.title),v(),y(`zero`,e.zero),v(),x(` `,e.value),v(2),C(e.unit),v(),b(`opacity`,.75),v(),C(e.sub),v(),h(n===r-1?-1:12)}}function le(e,t){if(e&1&&(a(0,`div`,64)(1,`span`,65),l(2,`ui-icon`,47),r(),a(3,`div`,66)(4,`span`,67),_(5),r(),a(6,`span`,68),l(7,`ui-icon`,47),r()(),a(8,`span`,69),_(9),r(),a(10,`span`,70),_(11),r()()),e&2){let e=t.$implicit,n=t.$index;b(`background`,n===0?`var(--v2-foret)`:e.bg)(`border-color`,n===0?`var(--v2-foret)`:`transparent`)(`color`,n===0?`var(--v2-blanc)`:e.fg),v(),b(`color`,n===0?`var(--v2-citron)`:e.fg),v(),p(`name`,e.icon)(`size`,120),v(2),b(`opacity`,n===0?.8:1),v(),C(e.label),v(),b(`background`,n===0?`var(--v2-citron)`:e.fg)(`color`,n===0?`var(--v2-foret)`:e.bg),v(),p(`name`,e.icon)(`size`,20),v(2),C(e.value),v(),b(`opacity`,.75),v(),C(e.sub)}}function ue(e,n){if(e&1){let e=c();a(0,`button`,71),t(`click`,function(){let t=m(e).$implicit,n=f();return o(n.filter.set(t.id))}),_(1),a(2,`span`,72),_(3),r()()}if(e&2){let e=n.$implicit,t=f();y(`on`,t.filter()===e.id),S(`aria-selected`,t.filter()===e.id),v(),x(` `,e.label),v(2),C(e.count)}}function de(e,t){if(e&1&&(a(0,`div`,30)(1,`span`,73),l(2,`ui-icon`,21),r(),a(3,`p`,74),_(4),r()()),e&2){let e=f();v(2),p(`size`,26),v(2),x(` `,e.rows().length?e.t()(`cooperatives.empty.filtered`):e.t()(`cooperatives.empty.none`),` `)}}function fe(e,t){if(e&1&&(a(0,`span`,83),l(1,`ui-icon`,106),_(2),r()),e&2){let e=f().$implicit;v(),p(`size`,15),v(),x(``,e.place,` `)}}function pe(e,n){if(e&1){let e=c();a(0,`button`,109),t(`click`,function(){m(e);let t=f(3).$implicit,n=f(2);return o(n.restore(t.scoop.id))}),l(1,`ui-icon`,113),_(2),r()}if(e&2){let e=f(5);v(),p(`size`,18),v(),x(``,e.t()(`cooperatives.row.restore`),` `)}}function me(e,n){if(e&1){let e=c();a(0,`button`,114),t(`click`,function(){m(e);let t=f(3).$implicit,n=f(2);return o(n.askArchive(t.scoop.id))}),l(1,`ui-icon`,115),_(2),r()}if(e&2){let e=f(5);v(),p(`size`,18),v(),x(``,e.t()(`cooperatives.row.archive`),` `)}}function he(e,n){if(e&1){let e=c();a(0,`button`,109),t(`click`,function(){m(e);let t=f(2).$implicit,n=f(2);return o(n.openEdit(t.scoop.id))}),l(1,`ui-icon`,110),_(2),r(),T(3,pe,3,2,`button`,111)(4,me,3,2,`button`,112)}if(e&2){let e=f(2).$implicit,t=f(2);v(),p(`size`,18),v(),x(``,t.t()(`cooperatives.row.edit`),` `),v(),h(e.scoop.archived?3:4)}}function ge(e,t){if(e&1&&(a(0,`div`,87)(1,`a`,107),l(2,`ui-icon`,108),_(3),r(),T(4,he,5,3),r()),e&2){let e=f().$implicit,t=f(2);v(),p(`routerLink`,s(4,W,e.scoop.id)),v(),p(`size`,18),v(),C(t.t()(`cooperatives.row.open`)),v(),h(t.canManage()?4:-1)}}function _e(e,t){if(e&1&&(a(0,`span`,89),l(1,`ui-icon`,115),_(2),r()),e&2){let e=f(3);v(),p(`size`,14),v(),C(e.t()(`cooperatives.status.archived`))}}function ve(e,t){if(e&1&&(a(0,`span`,90),l(1,`ui-icon`,116),_(2),r()),e&2){let e=f(3);v(),p(`size`,14),v(),C(e.t()(`cooperatives.status.active`))}}function ye(e,t){if(e&1&&(a(0,`span`,91),l(1,`ui-icon`,117),_(2),r()),e&2){let e=f(3);v(),p(`size`,14),v(),C(e.t()(`cooperatives.badge.new`))}}function be(e,t){if(e&1&&(a(0,`span`,92),_(1),r()),e&2){let e=f().$implicit;v(),C(e.scoop.code)}}function xe(e,t){e&1&&(a(0,`span`,62),l(1,`ui-icon`,63),r()),e&2&&(v(),p(`size`,18))}function Se(e,t){if(e&1&&(a(0,`li`,94)(1,`span`,118)(2,`span`,119),l(3,`ui-icon`,47),r(),a(4,`span`,120),_(5),r()(),a(6,`span`,121),_(7),a(8,`span`,122),_(9),r()(),a(10,`span`,123),_(11),r(),T(12,xe,2,1,`span`,62),r()),e&2){let e=t.$implicit,n=t.$index,r=t.$count;v(2),b(`background`,e.bg)(`color`,e.fg),v(),p(`name`,e.icon)(`size`,17),v(2),C(e.title),v(),y(`zero`,e.zero),v(),x(` `,e.value),v(2),C(e.unit),v(2),C(e.sub),v(),h(n===r-1?-1:12)}}function Ce(e,t){if(e&1&&(a(0,`span`,51),_(1),r()),e&2){let e=f().$implicit,t=f(2);b(`background`,t.account(e.account).bg)(`color`,t.account(e.account).fg),v(),C(t.t()(t.account(e.account).label))}}function we(n,i){if(n&1){let e=c();a(0,`article`,78)(1,`div`,79)(2,`a`,80)(3,`span`,81),_(4),r(),a(5,`span`,7)(6,`span`,82),_(7),r(),T(8,fe,3,2,`span`,83),r()(),a(9,`div`,84)(10,`button`,85),t(`click`,function(t){let n=m(e).$implicit,r=f(2);return o(r.toggleMenu(n.scoop.id,t))}),l(11,`ui-icon`,86),r(),T(12,ge,5,6,`div`,87),r()(),a(13,`div`,88),T(14,_e,3,2,`span`,89)(15,ve,3,2,`span`,90),T(16,ye,3,2,`span`,91),T(17,be,2,1,`span`,92),r(),a(18,`ol`,93),g(19,Se,13,13,`li`,94,K),r(),a(21,`div`,95)(22,`div`,96)(23,`span`,97),_(24),r(),a(25,`span`,98),_(26),r()(),a(27,`div`,99),l(28,`span`),r()(),a(29,`div`,100)(30,`span`,101),_(31),r(),a(32,`span`,102)(33,`span`,103),_(34),r(),a(35,`span`,104),_(36),r()(),T(37,Ce,2,5,`span`,105),r()()}if(n&2){let t=i.$implicit,n=f(2);y(`archived`,t.scoop.archived),v(2),p(`routerLink`,s(26,W,t.scoop.id)),v(2),C(t.mono),v(3),C(t.scoop.name),v(),h(t.place?8:-1),v(2),y(`on`,n.menuFor()===t.scoop.id),S(`aria-label`,n.t()(`cooperatives.row.actions`,s(28,G,t.scoop.name)))(`aria-expanded`,n.menuFor()===t.scoop.id),v(),p(`size`,22),v(),h(n.menuFor()===t.scoop.id?12:-1),v(2),h(t.scoop.archived?14:15),v(2),h(t.isNew?16:-1),v(),h(t.scoop.code?17:-1),v(),S(`aria-label`,n.t()(`cooperatives.structure.aria`)),v(),e(t.structure),v(5),C(n.t()(`cooperatives.card.quality`)),v(2),x(``,t.quality,` %`),v(2),b(`width`,t.quality,`%`)(`background`,t.quality>=70?`var(--v2-vert-pousse)`:`var(--v2-soleil)`),v(3),C(t.managerInitials||`—`),v(3),C(t.manager?.name??n.t()(`cooperatives.account.none`)),v(2),C(t.manager?.email??n.t()(`cooperatives.fiche.managerNone`)),v(),h(t.manager?37:-1)}}function Te(t,n){if(t&1&&(a(0,`div`,75),g(1,we,38,30,`article`,76,Y),r(),l(3,`ui-pagination`,77)),t&2){let t=f();v(),e(t.pager.items()),v(2),p(`pager`,t.pager)}}function Ee(e,t){if(e&1&&(a(0,`span`,104),_(1),r()),e&2){let e=f().$implicit;v(),C(e.place)}}function De(e,t){if(e&1&&(a(0,`span`,89),_(1),r()),e&2){let e=f(3);v(),C(e.t()(`cooperatives.status.archived`))}}function Oe(e,t){if(e&1&&(a(0,`span`,90),_(1),r()),e&2){let e=f(3);v(),C(e.t()(`cooperatives.status.active`))}}function ke(e,t){if(e&1&&(a(0,`span`,147),_(1),r()),e&2){let e=f().$implicit,t=f(2);b(`background`,t.account(e.account).bg)(`color`,t.account(e.account).fg),v(),C(t.t()(t.account(e.account).label))}}function Ae(e,n){if(e&1){let e=c();a(0,`button`,151),t(`click`,function(){m(e);let t=f(2).$implicit,n=f(2);return o(n.restore(t.scoop.id))}),l(1,`ui-icon`,113),r()}if(e&2){let e=f(2).$implicit,t=f(2);S(`aria-label`,t.t()(`cooperatives.row.restore`)+` · `+e.scoop.name)(`title`,t.t()(`cooperatives.row.restore`)),v(),p(`size`,18)}}function je(e,n){if(e&1){let e=c();a(0,`button`,152),t(`click`,function(){m(e);let t=f(2).$implicit,n=f(2);return o(n.askArchive(t.scoop.id))}),l(1,`ui-icon`,115),r()}if(e&2){let e=f(2).$implicit,t=f(2);S(`aria-label`,t.t()(`cooperatives.row.archive`)+` · `+e.scoop.name)(`title`,t.t()(`cooperatives.row.archive`)),v(),p(`size`,18)}}function Me(e,n){if(e&1){let e=c();a(0,`button`,148),t(`click`,function(){m(e);let t=f().$implicit,n=f(2);return o(n.openEdit(t.scoop.id))}),l(1,`ui-icon`,110),r(),T(2,Ae,2,3,`button`,149)(3,je,2,3,`button`,150)}if(e&2){let e=f().$implicit,t=f(2);S(`aria-label`,t.t()(`cooperatives.row.edit`)+` · `+e.scoop.name)(`title`,t.t()(`cooperatives.row.edit`)),v(),p(`size`,18),v(),h(e.scoop.archived?2:3)}}function Ne(e,n){if(e&1&&(a(0,`tr`,130)(1,`td`,132)(2,`span`,133)(3,`span`,134),_(4),r(),a(5,`span`,7)(6,`span`,135),_(7),r(),T(8,Ee,2,1,`span`,104),r()()(),a(9,`td`,136),T(10,De,2,1,`span`,89)(11,Oe,2,1,`span`,90),r(),a(12,`td`,137),_(13),r(),a(14,`td`,138),_(15),r(),a(16,`td`,137),_(17),r(),a(18,`td`,136)(19,`span`,118)(20,`span`,139),l(21,`span`),r(),a(22,`span`,140),_(23),r()()(),a(24,`td`,132)(25,`span`,141),_(26),r(),T(27,ke,2,5,`span`,142),r(),a(28,`td`,143),t(`click`,function(e){return e.stopPropagation()}),a(29,`span`,144)(30,`a`,145),l(31,`ui-icon`,146),r(),T(32,Me,4,4),r()()()),e&2){let e=n.$implicit,t=f(2);p(`routerLink`,s(26,W,e.scoop.id)),v(4),C(e.mono),v(3),C(e.scoop.name),v(),h(e.place?8:-1),v(2),h(e.scoop.archived?10:11),v(2),y(`zero`,!e.gie),v(),x(` `,t.nf.format(e.gie),` `),v(),y(`zero`,!e.producers),v(),x(` `,t.nf.format(e.producers),` `),v(),y(`zero`,!e.members),v(),x(` `,t.nf.format(e.members),` `),v(4),b(`width`,e.quality,`%`)(`background`,e.quality>=70?`var(--v2-vert-pousse)`:`var(--v2-soleil)`),v(2),x(``,e.quality,` %`),v(3),C(e.manager?.name??`—`),v(),h(e.manager?27:-1),v(3),p(`routerLink`,s(28,W,e.scoop.id)),S(`aria-label`,t.t()(`cooperatives.row.open`)+` · `+e.scoop.name)(`title`,t.t()(`cooperatives.row.open`)),v(),p(`size`,18),v(),h(t.canManage()?32:-1)}}function Pe(t,n){if(t&1&&(a(0,`div`,124)(1,`table`,125)(2,`thead`)(3,`tr`,8)(4,`th`,126),_(5),r(),a(6,`th`,127),_(7),r(),a(8,`th`,128),_(9),r(),a(10,`th`,128),_(11),r(),a(12,`th`,128),_(13),r(),a(14,`th`,127),_(15),r(),a(16,`th`,126),_(17),r(),a(18,`th`,129),_(19),r()()(),a(20,`tbody`),g(21,Ne,33,30,`tr`,130,Y),r()()(),l(23,`ui-pagination`,131)),t&2){let t=f();v(5),C(t.t()(`cooperatives.col.name`)),v(2),C(t.t()(`cooperatives.col.status`)),v(2),x(` `,t.t()(`cooperatives.structure.gie`),` `),v(2),x(` `,t.t()(`cooperatives.col.producers`),` `),v(2),x(` `,t.t()(`cooperatives.col.members`),` `),v(2),C(t.t()(`cooperatives.card.quality`)),v(2),C(t.t()(`cooperatives.col.manager`)),v(2),x(` `,t.t()(`cooperatives.col.actions`),` `),v(2),e(t.pager.items()),v(2),p(`pager`,t.pager)}}function Fe(e,t){e&1&&(a(0,`span`,38),_(1),r()),e&2&&(v(),C(t))}function Ie(e,t){if(e&1&&(a(0,`span`,39),_(1),r()),e&2){let e=f();v(),C(e.t()(`cooperatives.form.codeWaiting`))}}function Z(e,n){if(e&1){let e=c();a(0,`div`,42)(1,`p`,153),l(2,`ui-icon`,154),_(3),r(),a(4,`p`,155),_(5),r(),a(6,`div`,156)(7,`ui-text-field`,157,2),t(`valueChange`,function(t){m(e);let n=f();return o(n.patch(`managerFirstName`,t))}),r(),a(9,`ui-text-field`,158,3),t(`valueChange`,function(t){m(e);let n=f();return o(n.patch(`managerLastName`,t))}),r()(),a(11,`ui-text-field`,159,4),t(`valueChange`,function(t){m(e);let n=f();return o(n.patch(`managerEmail`,t))}),r()()}if(e&2){let e=f();v(2),p(`size`,20),v(),x(``,e.t()(`cooperatives.form.manager`),` `),v(2),C(e.t()(`cooperatives.form.managerHint`)),v(2),p(`label`,e.t()(`cooperatives.form.managerFirstName`))(`value`,e.form().managerFirstName)(`error`,e.errors().managerFirstName??``),v(2),p(`label`,e.t()(`cooperatives.form.managerLastName`))(`value`,e.form().managerLastName)(`error`,e.errors().managerLastName??``),v(2),p(`label`,e.t()(`cooperatives.form.managerEmail`))(`value`,e.form().managerEmail)(`error`,e.errors().managerEmail??``)}}function Le(e,t){if(e&1&&(a(0,`p`,161),l(1,`ui-icon`,164),_(2),r()),e&2){let e=f();v(),p(`size`,18),v(),x(``,e.accounts,` `)}}function Re(e,n){if(e&1){let e=c();a(0,`a`,165),t(`click`,function(){m(e);let t=f(2);return o(t.archiveTarget.set(null))}),_(1),a(2,`span`,46),l(3,`ui-icon`,166),r()()}if(e&2){let e=f(2);v(),x(` `,e.t()(`cooperatives.blocked.submit`)),v(2),p(`size`,20)}}function ze(e,n){if(e&1){let e=c();a(0,`button`,167),t(`click`,function(){m(e);let t=f(),n=f();return o(n.confirmArchive(t.id))}),l(1,`ui-icon`,115),_(2),r()}if(e&2){let e=f(2);v(),p(`size`,20),v(),x(``,e.t()(`cooperatives.archive.submit`),` `)}}function Be(e,n){if(e&1){let e=c();a(0,`ui-modal`,160),t(`closed`,function(){m(e);let t=f();return o(t.archiveTarget.set(null))}),T(1,Le,3,2,`p`,161),a(2,`div`,43)(3,`button`,44),t(`click`,function(){m(e);let t=f();return o(t.archiveTarget.set(null))}),_(4),r(),T(5,Re,4,2,`a`,162)(6,ze,3,2,`button`,163),r()()}if(e&2){let e=n,t=f();p(`open`,!0)(`title`,e.blocked?t.t()(`cooperatives.blocked.title`):t.t()(`cooperatives.archive.title`))(`description`,e.description)(`icon`,e.blocked?`warning`:`archive`)(`width`,520)(`closeLabel`,t.t()(`cooperatives.blocked.close`)),v(),h(e.blocked?-1:1),v(3),x(` `,t.t()(`cooperatives.form.cancel`),` `),v(),h(e.blocked?5:6)}}var Q=`mbd.cooperatives.view`,$=[`name`,`commune`,`managerFirstName`,`managerLastName`,`managerEmail`],Ve={active:{label:`cooperatives.badge.active`,bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`},invited:{label:`cooperatives.badge.invited`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},expired:{label:`cooperatives.badge.expired`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`},closed:{label:`cooperatives.badge.closed`,bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`},none:{label:`cooperatives.account.none`,bg:`var(--v2-lin)`,fg:`var(--v2-gris-texte)`}},He=class s{constructor(){this.store=E(R),this.locale=E(M),this.snackbar=E(k),this.t=this.locale.t,this.nf=j,this.perms=[`scoop.manage`,`org.read`],this.q=i(``),this.filter=i(`tous`),this.view=i(Ue()),this.menuFor=i(null),this.createOpen=i(!1),this.archiveTarget=i(null),this.canManage=n(()=>this.store.can(`scoop.manage`)),this.rows=n(()=>{let e=this.store.state(),t=e.session,n=Date.now(),r=n-7776e6,i=e.scoops.filter(e=>P([{scoopId:e.id}],t).length===1),a=this.t();return i.map(t=>{let i=e.producers.filter(e=>e.scoopId===t.id&&!e.mergedInto),o=e.members.filter(e=>e.scoopId===t.id&&e.status===`membre`).length,s=e.orgs.filter(e=>e.scoopId===t.id),c=s.length,l=s.filter(e=>e.type===`GIE`).length,u=F(e.users,t.id),d=I(u,n),f=i.length?Math.round(i.filter(e=>e.quality===`validé`).length/i.length*100):0;return{scoop:t,producers:i.length,members:o,manager:u,account:d,quality:f,pending:!t.archived&&(d===`invited`||d===`expired`),isNew:!!t.createdAt&&new Date(t.createdAt).getTime()>=r,mono:(t.code??t.name.replace(/[^A-Za-zÀ-ÿ]/g,``).slice(0,3)).toUpperCase().slice(0,4),place:[t.commune===t.name?``:t.commune,t.region].filter(Boolean).join(`, `),managerInitials:u?u.name.split(` `).map(e=>e[0]).slice(0,2).join(``).toUpperCase():``,gie:l,structure:[{key:`scoop`,icon:`diversity_3`,title:a(`cooperatives.structure.scoop`),value:j.format(o),zero:o===0,unit:a(`cooperatives.structure.membersUnit`),sub:a(`cooperatives.structure.scoopSub`),bg:`var(--v2-foret)`,fg:`var(--v2-citron)`},{key:`gie`,icon:`hub`,title:a(`cooperatives.structure.gie`),value:j.format(l),zero:l===0,unit:c>l?a(`cooperatives.structure.orgsUnit`,{count:c}):``,sub:a(`cooperatives.structure.gieSub`),bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},{key:`producers`,icon:`agriculture`,title:a(`cooperatives.structure.producers`),value:j.format(i.length),zero:i.length===0,unit:``,sub:a(`cooperatives.structure.producersSub`),bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`}]}})}),this.stats=n(()=>{let e=this.t(),t=this.rows(),n=t.filter(e=>!e.scoop.archived),r=t.filter(e=>e.isNew).length;return[{label:e(`cooperatives.kpi.active`),value:j.format(n.length),sub:r?e(`cooperatives.kpi.activeNew`,{count:r}):e(`cooperatives.kpi.activeSub`,{total:t.length}),icon:`diversity_3`,bg:``,fg:``},{label:e(`cooperatives.kpi.pending`),value:j.format(t.filter(e=>e.pending).length),sub:e(`cooperatives.kpi.pendingSub`),icon:`mark_email_unread`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`},{label:e(`cooperatives.kpi.members`),value:j.format(t.reduce((e,t)=>e+t.members,0)),sub:e(`cooperatives.kpi.membersSub`),icon:`group`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},{label:e(`cooperatives.kpi.archived`),value:j.format(t.length-n.length),sub:e(`cooperatives.kpi.archivedSub`),icon:`archive`,bg:`var(--v2-culture-bg)`,fg:`var(--v2-culture-fg)`}]}),this.network=n(()=>{let e=this.t(),t=this.rows().filter(e=>!e.scoop.archived),n=t.reduce((e,t)=>e+t.gie,0),r=t.reduce((e,t)=>e+t.producers,0);return[{key:`faitiere`,icon:`account_balance`,title:e(`cooperatives.network.faitiere`),value:e(`cooperatives.network.faitiereName`),zero:!1,unit:``,sub:e(`cooperatives.network.faitiereSub`),bg:`var(--v2-citron)`,fg:`var(--v2-foret)`},{key:`scoops`,icon:`diversity_3`,title:e(`cooperatives.structure.scoop`),value:j.format(t.length),zero:t.length===0,unit:``,sub:e(`cooperatives.structure.scoopSub`),bg:`var(--v2-foret)`,fg:`var(--v2-citron)`},{key:`gie`,icon:`hub`,title:e(`cooperatives.structure.gie`),value:j.format(n),zero:n===0,unit:``,sub:e(`cooperatives.structure.gieSub`),bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},{key:`producers`,icon:`agriculture`,title:e(`cooperatives.structure.producers`),value:j.format(r),zero:r===0,unit:``,sub:e(`cooperatives.structure.producersSub`),bg:`var(--v2-sauge)`,fg:`var(--v2-vert-pousse)`}]}),this.filterButtons=n(()=>{let e=this.t(),t=this.rows();return[{id:`tous`,label:e(`cooperatives.filter.all`),count:t.length},{id:`active`,label:e(`cooperatives.filter.active`),count:t.filter(e=>!e.scoop.archived).length},{id:`archived`,label:e(`cooperatives.filter.archived`),count:t.filter(e=>!!e.scoop.archived).length},{id:`pending`,label:e(`cooperatives.filter.pending`),count:t.filter(e=>e.pending).length}]}),this.shown=n(()=>{let e=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),t=e(this.q().trim()),n=this.filter();return this.rows().filter(r=>{let i=n===`tous`||n===`active`&&!r.scoop.archived||n===`archived`&&!!r.scoop.archived||n===`pending`&&r.pending,a=!t||e(`${r.scoop.name} ${r.scoop.code??``} ${r.scoop.commune} ${r.manager?.name??``}`).includes(t);return i&&a})}),this.countLabel=n(()=>{let e=this.shown().length;return this.t()(e>1?`cooperatives.count.autre`:`cooperatives.count.un`,{count:e,total:this.rows().length})}),this.emptyForm={name:``,commune:``,code:``,region:``,managerFirstName:``,managerLastName:``,managerEmail:``},this.form=i({...this.emptyForm}),this.errors=i({}),this.fields=u(H),this.formMode=i(`create`),this.editId=i(null),this.shownCode=n(()=>{let e=this.form();return this.formMode()===`edit`?e.code:N(e.name,this.store.state().scoops.map(e=>e.code))}),this.fmtDate=ne,this.pager=U(()=>this.shown())}account(e){return Ve[e]}setView(e){this.view.set(e);try{window.localStorage.setItem(Q,e)}catch{}}toggleMenu(e,t){t.stopPropagation(),this.menuFor.update(t=>t===e?null:e)}onDocumentClick(e){this.menuFor()&&!e.target.closest?.(`[data-card-menu]`)&&this.menuFor.set(null)}openCreate(){this.formMode.set(`create`),this.editId.set(null),this.form.set({...this.emptyForm}),this.errors.set({}),this.createOpen.set(!0)}openEdit(e){this.menuFor.set(null);let t=this.store.state().scoops.find(t=>t.id===e);t&&(this.formMode.set(`edit`),this.editId.set(e),this.form.set({...this.emptyForm,name:t.name,commune:t.commune,code:t.code??``,region:t.region??``}),this.errors.set({}),this.createOpen.set(!0))}submitForm(){this.formMode()===`edit`?this.submitEdit():this.submitCreate()}showIssues(e){let t={};for(let n of e)t[n.field===`code`?`name`:n.field]??=this.t()(n.key);this.errors.set(t);let n=$.findIndex(e=>t[e]);this.fields()[[0,1,3,4,5][n]??0]?.focus(),this.snackbar.error(t[$[n]])}submitEdit(){let e=this.editId();if(!e)return;let t=this.store.state(),n=this.input(),r=A(n,t.scoops,[],{checkManager:!1,ignore:e});if(r.length)return this.showIssues(r);let i=this.store.actions.updateScoop(e,{name:n.name,commune:n.commune,code:n.code,region:n.region??``});i.ok?(this.createOpen.set(!1),this.snackbar.success(this.t()(`cooperatives.edit.done`))):this.snackbar.error(this.t()(i.error))}patch(e,t){this.form.update(n=>({...n,[e]:t})),e in this.errors()&&this.errors.update(t=>({...t,[e]:void 0}))}input(){let e=this.form();return{name:e.name,commune:e.commune,code:this.shownCode(),region:e.region,manager:{firstName:e.managerFirstName,lastName:e.managerLastName,email:e.managerEmail}}}submitCreate(){let e=this.store.state(),t=this.input(),n=[...e.users.map(e=>e.email),...e.members.map(e=>e.email)].filter(Boolean),r=A(t,e.scoops,n);if(r.length)return this.showIssues(r);let i=this.store.actions.createScoop(t);i.ok?(this.createOpen.set(!1),this.snackbar.success(this.t()(`cooperatives.create.done`,{email:t.manager.email.trim()}))):this.snackbar.error(this.t()(i.error))}askArchive(e){this.menuFor.set(null);let t=this.store.state(),n=t.scoops.find(t=>t.id===e);if(!n)return;let r=this.t(),i=re(e,t.dossiers).length;if(i){this.archiveTarget.set({id:e,blocked:!0,description:r(i>1?`cooperatives.blocked.description.autre`:`cooperatives.blocked.description.un`,{name:n.name,count:i}),accounts:``});return}let a=t.users.filter(t=>t.active&&t.role!==`admin`&&(t.scoopId===e||t.scoopIds?.length===1&&t.scoopIds[0]===e)).length;this.archiveTarget.set({id:e,blocked:!1,description:r(`cooperatives.archive.description`,{name:n.name}),accounts:a?r(a>1?`cooperatives.archive.accounts.autre`:`cooperatives.archive.accounts.un`,{count:a}):r(`cooperatives.archive.noAccounts`)})}confirmArchive(e){let t=this.store.actions.archiveScoop(e);if(this.archiveTarget.set(null),!t.ok){this.snackbar.error(this.t()(t.error));return}let n=t.closedAccounts;this.snackbar.success(`${this.t()(`cooperatives.archive.done`)} · ${this.t()(n>1?`cooperatives.archive.doneAccounts.autre`:`cooperatives.archive.doneAccounts.un`,{count:n})}`)}restore(e){this.menuFor.set(null);let t=this.store.actions.restoreScoop(e);t.ok?this.snackbar.success(this.t()(`cooperatives.restore.done`)):this.snackbar.error(this.t()(t.error))}static{this.ɵfac=function(e){return new(e||s)}}static{this.ɵcmp=d({type:s,selectors:[[`app-cooperatives-page`]],viewQuery:function(e,t){e&1&&te(t.fields,H,5),e&2&&ee()},hostBindings:function(e,n){e&1&&t(`click`,function(e){return n.onDocumentClick(e)},w)},decls:63,vars:52,consts:[[`f_name`,``],[`f_commune`,``],[`f_managerFirstName`,``],[`f_managerLastName`,``],[`f_managerEmail`,``],[3,`perm`,`area`],[1,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`],[1,`mt-8`],[`icon`,`account_balance`,`storageKey`,`mbd.cooperatives.network`,3,`title`,`subtitle`],[`collapsible-summary`,``,1,`flex`,`flex-wrap`,`items-center`,`gap-2`],[1,`network`],[1,`level`,`level-lg`,3,`level-hero`],[1,`mt-4`,`grid`,`grid-cols-1`,`gap-4`,`sm:grid-cols-2`,`xl:grid-cols-4`],[1,`card`,`stat`,`flex`,`flex-col`,`p-5`,3,`background`,`border-color`,`color`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`tablist`,1,`seg`],[`type`,`button`,`role`,`tab`,3,`on`],[`role`,`radiogroup`,1,`seg`,`seg-icons`],[`type`,`button`,`role`,`radio`,3,`click`],[`name`,`grid_view`,3,`size`],[`name`,`view_list`,3,`size`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`closed`,`open`,`title`,`description`,`icon`,`closeLabel`],[`id`,`create-scoop`,`novalidate`,``,1,`space-y-5`,`pb-4`,3,`submit`],[`preset`,`scoopName`,3,`valueChange`,`label`,`value`,`error`],[1,`grid`,`gap-5`,`sm:grid-cols-2`],[`preset`,`commune`,3,`valueChange`,`label`,`value`,`error`],[1,`code-label`],[`aria-live`,`polite`,1,`code-box`],[1,`code-chip`],[1,`code-empty`],[1,`code-hint`],[`preset`,`region`,3,`valueChange`,`label`,`optional`,`value`],[1,`rounded-[20px]`,`p-5`,2,`background`,`var(--v2-creme)`],[`modal-footer`,``,1,`contents`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`type`,`submit`,`form`,`create-scoop`,1,`btn`,`btn-primary`],[1,`chip`],[3,`name`,`size`],[`tone`,`danger`,3,`open`,`title`,`description`,`icon`,`width`,`closeLabel`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`name`,`add_business`,3,`size`],[1,`badge`],[1,`font-extrabold`],[1,`font-semibold`,`opacity-80`],[`name`,`chevron_right`,2,`color`,`var(--v2-gris-trait)`,3,`size`],[1,`level`,`level-lg`],[1,`flex`,`items-center`,`gap-2.5`],[1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-[12px]`],[1,`mono`],[1,`mt-3`,`block`,`text-[28px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`ml-1.5`,`text-[13px]`,`font-semibold`,`opacity-70`],[1,`mt-1.5`,`block`,`text-[12.5px]`,`font-medium`,`leading-snug`],[`aria-hidden`,`true`,1,`link-arrow`],[`name`,`chevron_right`,3,`size`],[1,`card`,`stat`,`flex`,`flex-col`,`p-5`],[`aria-hidden`,`true`,1,`watermark`],[1,`relative`,`flex`,`items-center`,`justify-between`,`gap-3`],[1,`text-[14px]`,`font-bold`],[1,`grid`,`size-10`,`place-items-center`,`rounded-[12px]`],[1,`relative`,`mt-3`,`text-[34px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`relative`,`mt-2`,`truncate`,`text-[13px]`,`font-medium`],[`type`,`button`,`role`,`tab`,3,`click`],[1,`n`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`text-[15px]`,`font-semibold`,2,`color`,`var(--v2-ardoise)`],[1,`mt-3`,`grid`,`gap-4`,`md:grid-cols-2`,`2xl:grid-cols-3`],[1,`card`,`coop`,3,`archived`],[3,`pager`],[1,`card`,`coop`],[1,`flex`,`items-start`,`gap-4`,`p-5`,`pb-4`],[1,`coop-link`,`flex`,`min-w-0`,`flex-1`,`items-start`,`gap-4`,`rounded-[14px]`,3,`routerLink`],[`aria-hidden`,`true`,1,`monogram`],[1,`block`,`text-[17px]`,`font-extrabold`,`leading-snug`,`tracking-[-0.01em]`],[1,`sub`,`mt-0.5`,`flex`,`items-center`,`gap-1`,`truncate`],[`data-card-menu`,``,1,`relative`],[`type`,`button`,`aria-haspopup`,`menu`,1,`menu-btn`,3,`click`],[`name`,`more_horiz`,3,`size`],[`role`,`menu`,1,`menu`],[1,`flex`,`flex-wrap`,`gap-2`,`px-5`],[1,`badge`,2,`background`,`var(--v2-lin)`,`color`,`var(--v2-gris-texte)`],[1,`badge`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-vert-pousse)`],[1,`badge`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[1,`badge`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-ardoise)`,`font-family`,`var(--v2-font-mono)`],[1,`structure`,`mt-4`,`px-5`],[1,`level`],[1,`mt-4`,`px-5`],[1,`flex`,`items-center`,`justify-between`,`text-[13px]`,`font-semibold`],[2,`color`,`var(--v2-ardoise)`],[1,`font-extrabold`,`tabular-nums`],[1,`bar`,`mt-1.5`],[1,`mt-auto`,`flex`,`items-center`,`gap-3`,`border-t`,`px-5`,`py-4`,2,`border-color`,`var(--v2-separateur)`,`margin-top`,`18px`],[1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`text-[14px]`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`badge`,3,`background`,`color`],[`name`,`location_on`,3,`size`],[`role`,`menuitem`,3,`routerLink`],[`name`,`open_in_new`,3,`size`],[`type`,`button`,`role`,`menuitem`,3,`click`],[`name`,`edit`,3,`size`],[`type`,`button`,`role`,`menuitem`],[`type`,`button`,`role`,`menuitem`,2,`color`,`var(--v2-erreur-fg)`],[`name`,`unarchive`,3,`size`],[`type`,`button`,`role`,`menuitem`,2,`color`,`var(--v2-erreur-fg)`,3,`click`],[`name`,`archive`,3,`size`],[`name`,`check_circle`,3,`size`],[`name`,`north_east`,3,`size`],[1,`flex`,`items-center`,`gap-2`],[1,`grid`,`size-8`,`shrink-0`,`place-items-center`,`rounded-[10px]`],[1,`mono`,2,`color`,`var(--v2-ardoise)`],[1,`mt-2`,`block`,`text-[22px]`,`font-extrabold`,`leading-none`,`tracking-[-0.02em]`,`tabular-nums`],[1,`ml-1`,`text-[12px]`,`font-semibold`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-1`,`block`,`text-[11.5px]`,`font-medium`,`leading-snug`,2,`color`,`var(--v2-gris-texte)`],[1,`card`,`mt-3`,`overflow-x-auto`],[1,`w-full`,`min-w-[820px]`,`text-left`,`text-[14px]`],[1,`px-5`,`py-3`,`font-bold`],[1,`px-3`,`py-3`,`font-bold`],[1,`px-2.5`,`py-3`,`text-right`,`font-bold`],[1,`py-3`,`pl-2`,`pr-4`,`text-right`,`font-bold`],[`tabindex`,`0`,1,`row`,2,`border-top`,`1px solid var(--v2-separateur)`,3,`routerLink`],[1,`px-4`,`pb-4`,3,`pager`],[1,`px-5`,`py-3.5`],[1,`flex`,`items-center`,`gap-3`],[`aria-hidden`,`true`,1,`monogram`,2,`height`,`40px`,`width`,`40px`,`border-radius`,`12px`,`font-size`,`12px`],[1,`block`,`truncate`,`font-bold`],[1,`px-3`,`py-3.5`],[1,`px-3`,`py-3.5`,`text-right`,`font-semibold`,`tabular-nums`],[1,`px-3`,`py-3.5`,`text-right`,`font-extrabold`,`tabular-nums`],[1,`bar`,`w-14`],[1,`whitespace-nowrap`,`text-[13px]`,`font-bold`,`tabular-nums`],[1,`block`,`max-w-[160px]`,`truncate`,`font-semibold`],[1,`badge`,`mt-1`,3,`background`,`color`],[1,`py-3.5`,`pl-2`,`pr-4`,3,`click`],[1,`actions`],[1,`act`,3,`routerLink`],[`name`,`visibility`,3,`size`],[1,`badge`,`mt-1`],[`type`,`button`,1,`act`,3,`click`],[`type`,`button`,1,`act`,`act-ok`],[`type`,`button`,1,`act`,`act-danger`],[`type`,`button`,1,`act`,`act-ok`,3,`click`],[`type`,`button`,1,`act`,`act-danger`,3,`click`],[1,`flex`,`items-center`,`gap-2`,`text-[15px]`,`font-extrabold`],[`name`,`person_add`,3,`size`],[1,`sub`,`mt-1`],[1,`mt-4`,`grid`,`gap-5`,`sm:grid-cols-2`],[`preset`,`firstName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`lastName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`email`,1,`mt-5`,3,`valueChange`,`label`,`value`,`error`],[`tone`,`danger`,3,`closed`,`open`,`title`,`description`,`icon`,`width`,`closeLabel`],[1,`mb-4`,`flex`,`items-center`,`gap-2`,`rounded-[14px]`,`p-3`,`text-[14px]`,`font-semibold`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`routerLink`,`/dashboard/dossiers`,1,`btn`,`btn-primary`],[`type`,`button`,1,`btn`,`btn-danger`],[`name`,`person`,3,`size`],[`routerLink`,`/dashboard/dossiers`,1,`btn`,`btn-primary`,3,`click`],[`name`,`arrow_forward`,3,`size`],[`type`,`button`,1,`btn`,`btn-danger`,3,`click`]],template:function(n,i){if(n&1){let e=c();a(0,`app-shell`,5)(1,`header`,6)(2,`div`,7)(3,`p`,8),_(4),r(),a(5,`h1`,9),_(6),r(),a(7,`p`,10),_(8),r()(),T(9,X,4,2,`button`,11),r(),a(10,`section`,12)(11,`ui-collapsible`,13)(12,`div`,14),g(13,oe,6,9,null,null,K),r(),a(15,`ol`,15),g(16,ce,13,19,`li`,16,K),r()()(),a(18,`section`,17),g(19,le,12,23,`div`,18,q),r(),a(21,`div`,19)(22,`label`,20),l(23,`ui-icon`,21),a(24,`input`,22),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),a(25,`div`,23),g(26,ue,4,5,`button`,24,J),r(),a(28,`div`,25)(29,`button`,26),t(`click`,function(){return i.setView(`grid`)}),l(30,`ui-icon`,27),r(),a(31,`button`,26),t(`click`,function(){return i.setView(`list`)}),l(32,`ui-icon`,28),r()()(),a(33,`p`,29),_(34),r(),T(35,de,5,2,`div`,30)(36,Te,4,1)(37,Pe,24,9),a(38,`ui-modal`,31),t(`closed`,function(){return i.createOpen.set(!1)}),a(39,`form`,32),t(`submit`,function(t){return m(e),t.preventDefault(),o(i.submitForm())}),a(40,`ui-text-field`,33,0),t(`valueChange`,function(e){return i.patch(`name`,e)}),r(),a(42,`div`,34)(43,`ui-text-field`,35,1),t(`valueChange`,function(e){return i.patch(`commune`,e)}),r(),a(45,`div`)(46,`p`,36),_(47),r(),a(48,`div`,37),T(49,Fe,2,1,`span`,38)(50,Ie,2,1,`span`,39),r(),a(51,`p`,40),_(52),r()()(),a(53,`ui-text-field`,41),t(`valueChange`,function(e){return i.patch(`region`,e)}),r(),T(54,Z,13,12,`div`,42),r(),a(55,`div`,43)(56,`button`,44),t(`click`,function(){return i.createOpen.set(!1)}),_(57),r(),a(58,`button`,45),_(59),a(60,`span`,46),l(61,`ui-icon`,47),r()()()(),T(62,Be,7,9,`ui-modal`,48),r()}if(n&2){let t,n;p(`perm`,i.perms)(`area`,i.t()(`cooperatives.area`)),v(4),C(i.t()(`cooperatives.eyebrow`)),v(2),x(` `,i.t()(`cooperatives.title`),` `),v(2),x(` `,i.t()(`cooperatives.description`),` `),v(),h(i.canManage()?9:-1),v(2),p(`title`,i.t()(`cooperatives.network.title`))(`subtitle`,i.t()(`cooperatives.network.subtitle`)),v(2),e(i.network()),v(3),e(i.network()),v(2),S(`aria-label`,i.t()(`cooperatives.title`)),v(),e(i.stats()),v(4),p(`size`,20),v(),p(`placeholder`,i.t()(`cooperatives.search.placeholder`))(`value`,i.q()),S(`aria-label`,i.t()(`cooperatives.search.aria`)),v(),S(`aria-label`,i.t()(`cooperatives.title`)),v(),e(i.filterButtons()),v(2),S(`aria-label`,i.t()(`cooperatives.view.aria`)),v(),y(`on`,i.view()===`grid`),S(`aria-checked`,i.view()===`grid`)(`title`,i.t()(`cooperatives.view.grid`))(`aria-label`,i.t()(`cooperatives.view.grid`)),v(),p(`size`,20),v(),y(`on`,i.view()===`list`),S(`aria-checked`,i.view()===`list`)(`title`,i.t()(`cooperatives.view.list`))(`aria-label`,i.t()(`cooperatives.view.list`)),v(),p(`size`,20),v(2),C(i.countLabel()),v(),h(i.shown().length===0?35:i.view()===`grid`?36:37),v(3),p(`open`,i.createOpen())(`title`,i.formMode()===`edit`?i.t()(`cooperatives.edit.title`):i.t()(`cooperatives.create.title`))(`description`,i.formMode()===`edit`?i.t()(`cooperatives.edit.description`):i.t()(`cooperatives.create.description`))(`icon`,i.formMode()===`edit`?`edit`:`add_business`)(`closeLabel`,i.t()(`cooperatives.form.cancel`)),v(2),p(`label`,i.t()(`cooperatives.form.name`))(`value`,i.form().name)(`error`,i.errors().name??``),v(3),p(`label`,i.t()(`cooperatives.form.commune`))(`value`,i.form().commune)(`error`,i.errors().commune??``),v(4),C(i.t()(`cooperatives.form.code`)),v(2),h((t=i.shownCode())?49:50,t),v(3),C(i.formMode()===`edit`?i.t()(`cooperatives.form.codeKept`):i.t()(`cooperatives.form.codeAuto`)),v(),p(`label`,i.t()(`cooperatives.form.region`))(`optional`,i.t()(`cooperatives.form.regionOptional`))(`value`,i.form().region),v(),h(i.formMode()===`create`?54:-1),v(3),x(` `,i.t()(`cooperatives.form.cancel`),` `),v(2),x(` `,i.formMode()===`edit`?i.t()(`cooperatives.edit.submit`):i.t()(`cooperatives.create.submit`),` `),v(2),p(`name`,i.formMode()===`edit`?`check`:`mark_email_unread`)(`size`,20),v(),h((n=i.archiveTarget())?62:-1,n)}},dependencies:[V,D,L,O,B,H,z],styles:[`
    .code-label[_ngcontent-%COMP%] {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--%NS%v2-ardoise);
    }
    .code-box[_ngcontent-%COMP%] {
      display: flex;
      height: 52px;
      align-items: center;
      margin-top: 8px;
      border-radius: 16px;
      border: 1.5px dashed var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-creme);
      padding: 0 14px;
    }
    .code-chip[_ngcontent-%COMP%] {
      border-radius: 10px;
      background: var(--%NS%v2-foret);
      padding: 5px 12px;
      font-family: var(--%NS%v2-font-mono);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.08em;
      color: var(--%NS%v2-citron);
    }
    .code-empty[_ngcontent-%COMP%] {
      font-size: 14px;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    .code-hint[_ngcontent-%COMP%] {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    .mono[_ngcontent-%COMP%] {
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
    .stat[_ngcontent-%COMP%] {
      position: relative;
      overflow: hidden;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat[_ngcontent-%COMP%]:hover {
      transform: translateY(-2px);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .watermark[_ngcontent-%COMP%] {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition: transform 0.35s ease;
    }
    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {
      transform: rotate(-4deg) scale(1.06);
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
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .btn-primary[_ngcontent-%COMP%] {
      padding: 0 6px 0 18px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .btn-primary[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    .btn-ghost[_ngcontent-%COMP%] {
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-encre);
    }
    .btn-ghost[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .btn-danger[_ngcontent-%COMP%] {
      background: var(--%NS%v2-erreur-fg);
      color: var(--%NS%v2-blanc);
    }
    .btn-danger[_ngcontent-%COMP%]:hover {
      background: color-mix(in oklab, var(--%NS%v2-erreur-fg) 85%, var(--%NS%v2-encre));
    }
    .chip[_ngcontent-%COMP%] {
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
    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .seg-icons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
      padding: 9px 11px;
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
    .coop[_ngcontent-%COMP%] {
      position: relative;
      display: flex;
      flex-direction: column;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease,
        border-color 0.2s ease;
    }
    .coop[_ngcontent-%COMP%]:hover {
      transform: translateY(-2px);
      border-color: var(--%NS%v2-gris-trait);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .coop.archived[_ngcontent-%COMP%] {
      background: var(--%NS%v2-creme);
    }
    .monogram[_ngcontent-%COMP%] {
      display: grid;
      height: 52px;
      width: 52px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 16px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
      font-family: var(--%NS%v2-font-mono);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.04em;
    }
    .archived[_ngcontent-%COMP%]   .monogram[_ngcontent-%COMP%] {
      background: var(--%NS%v2-gris-trait);
      color: var(--%NS%v2-blanc);
    }
    
    .structure[_ngcontent-%COMP%] {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 8px;
    }
    .level[_ngcontent-%COMP%] {
      position: relative;
      border-radius: 16px;
      background: var(--%NS%v2-creme);
      padding: 12px;
    }
    
    .zero[_ngcontent-%COMP%] {
      color: var(--%NS%v2-gris-trait) !important;
    }
    
    .network[_ngcontent-%COMP%] {
      display: grid;
      grid-template-columns: minmax(0, 1fr);
      gap: 16px;
    }
    @media (min-width: 640px) {
      .network[_ngcontent-%COMP%] {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }
    @media (min-width: 1280px) {
      .network[_ngcontent-%COMP%] {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .level-lg[_ngcontent-%COMP%] {
      padding: 20px;
      border-radius: 24px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
    }
    .level-hero[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    @media (max-width: 1279px) {
      .network[_ngcontent-%COMP%]   .link-arrow[_ngcontent-%COMP%] {
        display: none;
      }
    }
    .network[_ngcontent-%COMP%]   .link-arrow[_ngcontent-%COMP%] {
      right: -19px;
    }
    .link-arrow[_ngcontent-%COMP%] {
      position: absolute;
      right: -14px;
      top: 50%;
      z-index: 1;
      display: grid;
      height: 22px;
      width: 22px;
      place-items: center;
      transform: translateY(-50%);
      border-radius: 999px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-gris-texte);
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
    }
    .menu-btn[_ngcontent-%COMP%] {
      display: grid;
      height: 40px;
      width: 40px;
      place-items: center;
      border-radius: 12px;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
    }
    .menu-btn[_ngcontent-%COMP%]:hover, 
   .menu-btn.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-encre);
    }
    .menu[_ngcontent-%COMP%] {
      position: absolute;
      right: 0;
      top: calc(100% + 6px);
      z-index: 30;
      width: 220px;
      border-radius: 16px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      padding: 6px;
      box-shadow: var(--%NS%v2-ombre-modale);
    }
    .menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%], 
   .menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 10px;
      border-radius: 10px;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover, 
   .menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-sauge);
    }
    
    .actions[_ngcontent-%COMP%] {
      display: flex;
      justify-content: flex-end;
      gap: 4px;
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
    .act[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-foret);
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .act-danger[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-erreur-fg);
      background: var(--%NS%v2-erreur-bg);
      color: var(--%NS%v2-erreur-fg);
    }
    .act-ok[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-vert-pousse);
      background: var(--%NS%v2-sauge);
      color: var(--%NS%v2-vert-pousse);
    }
    .act[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .row[_ngcontent-%COMP%] {
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .row[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
    }
    .btn[_ngcontent-%COMP%]:focus-visible, 
   .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, 
   .coop-link[_ngcontent-%COMP%]:focus-visible, 
   .menu-btn[_ngcontent-%COMP%]:focus-visible, 
   .menu[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible, 
   .menu[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, 
   .row[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .stat[_ngcontent-%COMP%], 
   .stat[_ngcontent-%COMP%]:hover, 
   .coop[_ngcontent-%COMP%], 
   .coop[_ngcontent-%COMP%]:hover, 
   .watermark[_ngcontent-%COMP%] {
        transition: none;
        transform: none;
      }
    }`]})}};function Ue(){try{return typeof window<`u`&&window.localStorage.getItem(Q)===`list`?`list`:`grid`}catch{return`grid`}}export{He as default};