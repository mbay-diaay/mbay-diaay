import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gt as v,hn as y,ln as b,mn as x,mt as S,pn as C,qt as ee,vt as w,zn as T}from"./_router-chunk-H0-n0SZI.js";import{n as E}from"./index-B8S1FFME.js";import{l as te,n as ne}from"./snackbar.component-ICe8-MWg.js";import{W as D,n as re,t as ie,xt as O}from"./locale.service-Bf8_ncMo.js";import{t as k}from"./app-shell.component-CR4uAChA.js";import{t as A}from"./store.service-ZF4OfoGo.js";import{t as j}from"./pager-DPeF-1nO.js";import{t as M}from"./v2-page.styles-Blvl6ZBZ.js";import{T as N,a as P,n as F,o as I}from"./ui-CQhTckzj.js";var L=e=>({count:e}),R=e=>({type:e}),z=e=>[`/dashboard/producteurs`,e],B=e=>({n:e}),V=(e,t)=>({n:e,status:t}),H=(e,t)=>t.id;function U(e,n){if(e&1){let e=c();a(0,`button`,18),t(`click`,function(){let t=p(e).$implicit,n=d();return n.status.set(t.id),o(n.selected.set([]))}),g(1),a(2,`span`,19),g(3),r()()}if(e&2){let e=n.$implicit,t=d();v(`on`,t.status()===e.id),S(`aria-checked`,t.status()===e.id),_(),x(` `,e.label),_(),v(`zero`,!e.count),_(),C(t.nf.format(e.count))}}function ae(e,n){if(e&1){let e=c();a(0,`input`,27),t(`change`,function(t){p(e);let n=d(2);return o(n.togglePage(t.target.checked))}),r()}if(e&2){let e=d(2);f(`checked`,e.allPageSelected()),S(`aria-label`,e.t()(`qualite.alertes.selectAll`))}}function W(e,n){if(e&1){let e=c();a(0,`input`,27),t(`change`,function(){p(e);let t=d().$implicit,n=d(2);return o(n.toggle(t.id))}),r()}if(e&2){let e=d().$implicit,t=d(2);f(`checked`,t.selected().includes(e.id)),S(`aria-label`,t.t()(`qualite.alertes.selectOne`,s(2,R,e.type)))}}function G(e,n){if(e&1){let e=c();a(0,`button`,37),t(`click`,function(){p(e);let t=d().$implicit,n=d(2);return o(n.openDecision([t.id],`résolu`))}),l(1,`ui-icon`,38),r(),a(2,`button`,39),t(`click`,function(){p(e);let t=d().$implicit,n=d(2);return o(n.openDecision([t.id],`rejeté`))}),l(3,`ui-icon`,40),r()}if(e&2){let e=d(3);f(`title`,e.t()(`qualite.alertes.resolve`)),S(`aria-label`,e.t()(`qualite.alertes.resolve`)),_(),f(`size`,18),_(),f(`title`,e.t()(`qualite.alertes.reject`)),S(`aria-label`,e.t()(`qualite.alertes.reject`)),_(),f(`size`,18)}}function K(e,t){if(e&1&&(a(0,`a`,36),l(1,`ui-icon`,41),r()),e&2){let e=d(3);f(`routerLink`,s(4,z,t))(`title`,e.t()(`qualite.v2.alertes.open`)),S(`aria-label`,e.t()(`qualite.v2.alertes.open`)),_(),f(`size`,18)}}function q(e,n){if(e&1){let e=c();a(0,`tr`,28),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.canDecide()&&n.toggle(t.id))}),a(1,`td`,28),t(`click`,function(e){return e.stopPropagation()}),w(2,W,1,4,`input`,23),r(),a(3,`td`)(4,`span`,29),g(5),r(),a(6,`span`,30),g(7),r()(),a(8,`td`)(9,`span`,31),g(10),r(),a(11,`span`,32),g(12),r()(),a(13,`td`,33),g(14),r(),a(15,`td`)(16,`span`,34),g(17),r()(),a(18,`td`)(19,`span`,34),g(20),r()(),a(21,`td`,28),t(`click`,function(e){return e.stopPropagation()}),a(22,`span`,35),w(23,G,4,6),w(24,K,2,6,`a`,36),r()()()}if(e&2){let e,t=n.$implicit,r=d(2);v(`row-link`,r.canDecide()),_(2),m(r.canDecide()?2:-1),_(3),C(t.type),_(),f(`title`,t.detail),_(),C(t.detail),_(3),C(r.entityName(t)),_(2),C(r.t()(t.entity===`producteur`?`qualite.alertes.entity.producteur`:`qualite.alertes.entity.parcelle`)),_(2),C(t.enumerator),_(2),b(`background`,r.sev[t.severity].bg)(`color`,r.sev[t.severity].fg),_(),C(r.t()(r.sev[t.severity].label)),_(2),b(`background`,r.stat[t.status].bg)(`color`,r.stat[t.status].fg),_(),C(r.t()(r.stat[t.status].label)),_(3),m(r.canDecide()&&(t.status===`ouvert`||t.status===`en vérification`)?23:-1),_(),m((e=r.ownerOf(t))?24:-1,e)}}function J(t,n){if(t&1&&(a(0,`div`,20)(1,`table`,21)(2,`thead`)(3,`tr`)(4,`th`,22),w(5,ae,1,2,`input`,23),r(),a(6,`th`),g(7),r(),a(8,`th`),g(9),r(),a(10,`th`),g(11),r(),a(12,`th`),g(13),r(),a(14,`th`),g(15),r(),a(16,`th`,24),g(17),r()()(),a(18,`tbody`),h(19,q,25,21,`tr`,25,H),r()()(),l(21,`ui-pagination`,26)),t&2){let t=d();_(5),m(t.canDecide()?5:-1),_(2),C(t.t()(`qualite.alertes.col.type`)),_(2),C(t.t()(`qualite.alertes.col.entity`)),_(2),C(t.t()(`qualite.alertes.col.enumerator`)),_(2),C(t.t()(`qualite.alertes.col.severity`)),_(2),C(t.t()(`qualite.alertes.col.status`)),_(2),C(t.t()(`organisations.col.actions`)),_(2),e(t.pager.items()),_(2),f(`pager`,t.pager)}}function oe(e,t){if(e&1&&(a(0,`div`,15)(1,`span`,42),l(2,`ui-icon`,43),r(),a(3,`p`,44),g(4),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),C(e.t()(`qualite.alertes.empty`))}}function se(e,n){if(e&1){let e=c();a(0,`div`,16)(1,`span`,45),g(2),r(),a(3,`button`,46),t(`click`,function(){p(e);let t=d();return o(t.selected.set([]))}),g(4),r(),a(5,`button`,47),t(`click`,function(){p(e);let t=d();return o(t.openDecision(t.selected(),`en vérification`))}),l(6,`ui-icon`,41),g(7),r(),a(8,`button`,48),t(`click`,function(){p(e);let t=d();return o(t.openDecision(t.selected(),`rejeté`))}),l(9,`ui-icon`,40),g(10),r(),a(11,`button`,49),t(`click`,function(){p(e);let t=d();return o(t.openDecision(t.selected(),`résolu`))}),l(12,`ui-icon`,38),g(13),r()()}if(e&2){let e=d();S(`aria-label`,e.t()(`qualite.alertes.selected`,s(9,B,e.selected().length))),_(2),C(e.t()(`qualite.alertes.selected`,s(11,B,e.selected().length))),_(2),x(` `,e.t()(`qualite.alertes.deselect`),` `),_(2),f(`size`,16),_(),x(``,e.t()(`qualite.alertes.verifyShort`),` `),_(2),f(`size`,16),_(),x(``,e.t()(`qualite.alertes.reject`),` `),_(2),f(`size`,16),_(),x(``,e.t()(`qualite.alertes.resolve`),` `)}}function ce(e,t){if(e&1&&(a(0,`li`,52)(1,`span`,58),g(2),r(),a(3,`span`,34),g(4),r()()),e&2){let e=t.$implicit,n=d(2);_(2),y(``,e.type,` · `,n.entityName(e)),_(),b(`background`,n.sev[e.severity].bg)(`color`,n.sev[e.severity].fg),_(),C(n.t()(n.sev[e.severity].label))}}function le(e,t){e&1&&(a(0,`span`,57),l(1,`ui-icon`,38),r()),e&2&&(_(),f(`size`,18))}function ue(n,i){if(n&1){let e=c();a(0,`ui-modal`,50),t(`closed`,function(){p(e);let t=d();return o(t.pending.set(null))}),a(1,`ul`,51),h(2,ce,5,7,`li`,52,H),r(),a(4,`label`,53),g(5),r(),a(6,`textarea`,54),t(`input`,function(t){p(e);let n=d();return o(n.comment.set(t.target.value))}),r(),a(7,`button`,55),t(`click`,function(){p(e);let t=d();return o(t.pending.set(null))}),g(8),r(),a(9,`button`,56),t(`click`,function(){p(e);let t=d();return o(t.confirmDecision())}),g(10),w(11,le,2,1,`span`,57),r()()}if(n&2){let t=i,n=d();f(`tone`,t.status===`rejeté`?`danger`:`default`)(`open`,!0)(`title`,n.t()(`qualite.alertes.dialog.title`,ee(16,V,t.ids.length,n.t()(n.stat[t.status].label))))(`description`,n.t()(`qualite.alertes.dialog.description`))(`width`,580)(`closeLabel`,n.t()(`common.close`)),_(2),e(n.pendingAlerts()),_(3),C(n.t()(`qualite.common.comment`)),_(),f(`placeholder`,n.t()(`qualite.alertes.dialog.commentPlaceholder`))(`value`,n.comment()),_(2),x(` `,n.t()(`common.cancel`),` `),_(),v(`btn-danger`,t.status===`rejeté`)(`btn-primary`,t.status!==`rejeté`),_(),x(` `,n.t()(`qualite.alertes.dialog.submit`),` `),_(),m(t.status===`rejeté`?-1:11)}}var Y=[`ouvert`,`en vérification`,`résolu`,`rejeté`],X={ouvert:{label:`qualite.alertes.statusValue.ouvert`,tab:`qualite.alertes.status.ouvert`,...M.attente},"en vérification":{label:`qualite.alertes.statusValue.en vérification`,tab:`qualite.alertes.status.en vérification`,...M.info},résolu:{label:`qualite.alertes.statusValue.résolu`,tab:`qualite.alertes.status.résolu`,...M.succes},rejeté:{label:`qualite.alertes.statusValue.rejeté`,tab:`qualite.alertes.status.rejeté`,...M.neutre}},Z={élevée:{label:`qualite.alertes.severity.élevée`,...M.erreur},moyenne:{label:`qualite.alertes.severity.moyenne`,...M.attente},faible:{label:`qualite.alertes.severity.faible`,...M.neutre}},Q={élevée:0,moyenne:1,faible:2},$=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),de=class o{constructor(){this.store=T(A),this.locale=T(ie),this.snackbar=T(ne),this.t=this.locale.t,this.nf=D,this.stat=X,this.sev=Z,this.q=i(``),this.status=i(`ouvert`),this.severity=i(``),this.selected=i([]),this.comment=i(``),this.pending=i(null),this.canDecide=n(()=>this.store.can(`alert.manage`)),this.mine=n(()=>{let e=this.store.state(),t=new Set(O(e.producers,e.session).map(e=>e.id)),n=new Set(e.plots.filter(e=>t.has(e.producerId)).map(e=>e.id));return e.alerts.filter(e=>t.has(e.entityId)||n.has(e.entityId))}),this.names=n(()=>{let e=this.store.state();return{producer:new Map(e.producers.map(e=>[e.id,`${e.firstName} ${e.lastName}`])),plot:new Map(e.plots.map(e=>[e.id,{code:e.code,owner:e.producerId}]))}}),this.base=n(()=>{let e=$(this.q().trim()),t=this.severity();return this.mine().filter(n=>(!t||n.severity===t)&&(!e||$(`${n.type} ${n.detail} ${n.enumerator} ${this.entityName(n)}`).includes(e)))}),this.statusButtons=n(()=>{let e=this.t(),t=this.base();return[...Y.map(n=>({id:n,label:e(X[n].tab),count:t.filter(e=>e.status===n).length})),{id:`__all`,label:e(`qualite.common.all`),count:t.length}]}),this.severityOptions=n(()=>[{value:``,label:this.t()(`qualite.v2.alertes.severityAll`)},...[`élevée`,`moyenne`,`faible`].map(e=>({value:e,label:this.t()(Z[e].label)}))]),this.rows=n(()=>{let e=this.status();return this.base().filter(t=>e===`__all`||t.status===e).sort((e,t)=>Q[e.severity]-Q[t.severity]||e.id.localeCompare(t.id))}),this.pager=j(()=>this.rows()),this.stats=n(()=>{let e=this.t(),t=this.mine(),n=e=>t.filter(t=>t.status===e).length,r=t.filter(e=>e.status===`ouvert`),i=new Map;for(let e of r)i.set(e.type,(i.get(e.type)??0)+1);let a=[...i].sort((e,t)=>t[1]-e[1])[0];return[{label:e(`qualite.v2.alertes.stat.open`),value:D.format(r.length),sub:e(`qualite.v2.alertes.stat.openSub`,{count:r.filter(e=>e.severity===`élevée`).length}),icon:`warning`,bg:``,fg:``},{label:e(`qualite.v2.alertes.stat.verify`),value:D.format(n(`en vérification`)),sub:e(`qualite.v2.alertes.stat.verifySub`),icon:`visibility`,...M.info},{label:e(`qualite.v2.alertes.stat.resolved`),value:D.format(n(`résolu`)),sub:e(`qualite.v2.alertes.stat.resolvedSub`,{count:n(`rejeté`)}),icon:`task_alt`,...M.succes},{label:e(`qualite.v2.alertes.stat.top`),value:a?D.format(a[1]):`—`,sub:a?.[0]??`—`,icon:`analytics`,...M.attente}]}),this.allPageSelected=n(()=>{let e=this.pager.items().map(e=>e.id);return e.length>0&&e.every(e=>this.selected().includes(e))}),this.pendingAlerts=n(()=>{let e=this.pending();return e?this.mine().filter(t=>e.ids.includes(t.id)):[]})}entityName(e){let t=this.names();if(e.entity===`producteur`)return t.producer.get(e.entityId)??e.entityId;let n=t.plot.get(e.entityId);return n?`${n.code} · ${t.producer.get(n.owner)??``}`:e.entityId}ownerOf(e){return e.entity===`producteur`?e.entityId:this.names().plot.get(e.entityId)?.owner??null}toggle(e){this.selected.update(t=>t.includes(e)?t.filter(t=>t!==e):[...t,e])}togglePage(e){let t=this.pager.items().map(e=>e.id);this.selected.update(n=>e?[...new Set([...n,...t])]:n.filter(e=>!t.includes(e)))}openDecision(e,t){this.comment.set(``),this.pending.set({ids:[...e],status:t})}confirmDecision(){let e=this.pending();if(e){try{this.store.actions.updateAlerts(e.ids,e.status,this.comment().trim())}catch(e){this.snackbar.error(e instanceof re?this.locale.tNow(e.key):String(e));return}this.pending.set(null),this.selected.update(t=>t.filter(t=>!e.ids.includes(t))),this.snackbar.success(this.t()(`qualite.alertes.dialog.updated`,{n:e.ids.length}))}}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-qualite-alertes-page`]],decls:24,vars:19,consts:[[`perm`,`alert.manage`,3,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`variant`,`compact`,`leadingIcon`,`warning`,1,`min-w-[200px]`,3,`valueChange`,`label`,`options`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[`role`,`region`,1,`bulk`,`mt-4`],[`icon`,`fact_check`,3,`tone`,`open`,`title`,`description`,`width`,`closeLabel`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[960px]`],[1,`w-10`],[`type`,`checkbox`,3,`checked`],[1,`text-right`],[3,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[`type`,`checkbox`,3,`change`,`checked`],[3,`click`],[1,`block`,`font-bold`],[1,`sub`,`block`,`max-w-[320px]`,`truncate`,3,`title`],[1,`block`,`font-semibold`],[1,`sub`,`block`],[1,`font-medium`],[1,`badge`],[1,`flex`,`justify-end`,`gap-2`],[1,`act`,3,`routerLink`,`title`],[`type`,`button`,1,`act`,`act-ok`,3,`click`,`title`],[`name`,`check`,3,`size`],[`type`,`button`,1,`act`,`act-danger`,3,`click`,`title`],[`name`,`close`,3,`size`],[`name`,`visibility`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`task_alt`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`flex-1`,`text-[14px]`,`font-extrabold`],[`type`,`button`,1,`b`,2,`color`,`var(--v2-blanc)`,3,`click`],[`type`,`button`,1,`b`,2,`background`,`var(--v2-info-bg)`,`color`,`var(--v2-info-fg)`,3,`click`],[`type`,`button`,1,`b`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`,3,`click`],[`type`,`button`,1,`b`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`,3,`click`],[`icon`,`fact_check`,3,`closed`,`tone`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`mb-4`,`max-h-48`,`overflow-y-auto`,`rounded-[16px]`,`border`,2,`border-color`,`var(--v2-bord-carte)`],[1,`flex`,`items-center`,`justify-between`,`gap-3`,`border-t`,`px-4`,`py-2.5`,`text-[14px]`,`first:border-t-0`,2,`border-color`,`var(--v2-separateur)`],[`for`,`alert-comment`,1,`lbl`],[`id`,`alert-comment`,1,`area`,`mb-5`,`mt-2`,3,`input`,`placeholder`,`value`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,3,`click`],[1,`btn-chip`],[1,`min-w-0`,`truncate`,`font-bold`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),g(3),r(),a(4,`h1`,3),g(5),r(),a(6,`p`,4),g(7),r()(),l(8,`ui-stat-cards`,5),a(9,`div`,6)(10,`label`,7),l(11,`ui-icon`,8),a(12,`input`,9),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),a(13,`ui-select`,10),t(`valueChange`,function(e){return i.severity.set(e)}),r(),a(14,`div`,11),h(15,U,4,7,`button`,12,H),r()(),a(17,`p`,13),g(18),r(),a(19,`section`,14),w(20,J,22,8)(21,oe,5,2,`div`,15),r(),w(22,se,14,13,`div`,16),w(23,ue,12,19,`ui-modal`,17),r()),n&2){let t;f(`area`,i.t()(`qualite.alertes.area`)),_(3),C(i.t()(`qualite.header.title`)),_(2),x(` `,i.t()(`qualite.alertes.area`),` `),_(2),x(` `,i.t()(`qualite.alertes.description`),` `),_(),f(`stats`,i.stats()),_(3),f(`size`,20),_(),f(`placeholder`,i.t()(`qualite.alertes.searchPlaceholder`))(`value`,i.q()),S(`aria-label`,i.t()(`qualite.alertes.searchAria`)),_(),f(`label`,i.t()(`qualite.alertes.filter.severity`))(`options`,i.severityOptions())(`value`,i.severity()),_(),S(`aria-label`,i.t()(`qualite.alertes.status.aria`)),_(),e(i.statusButtons()),_(3),x(` `,i.t()(`qualite.v2.alertes.count`,s(17,L,i.nf.format(i.rows().length))),` `),_(2),m(i.rows().length?20:21),_(2),m(i.selected().length?22:-1),_(),m((t=i.pending())?23:-1,t)}},dependencies:[k,te,N,P,E,I,F],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.bulk[_ngcontent-%COMP%] {
        position: sticky;
        bottom: 16px;
        z-index: 20;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        border-radius: 20px;
        background: var(--%NS%v2-foret);
        padding: 10px 10px 10px 18px;
        color: var(--%NS%v2-blanc);
        box-shadow: var(--%NS%v2-ombre-flottant);
      }
      .bulk[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {
        display: inline-flex;
        height: 40px;
        align-items: center;
        gap: 6px;
        border-radius: 12px;
        padding: 0 14px;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
      }
      .tbl[_ngcontent-%COMP%]   input[type="checkbox"][_ngcontent-%COMP%] {
        height: 18px;
        width: 18px;
        accent-color: var(--%NS%v2-foret);
        cursor: pointer;
      }
      .act-ok[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-vert-pousse);
        background: var(--%NS%v2-sauge);
        color: var(--%NS%v2-vert-pousse);
      }`]})}};export{de as default};