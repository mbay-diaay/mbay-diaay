import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Lt as s,Nt as c,St as l,Vt as u,Wt as d,Yn as f,_t as p,en as m,fn as h,ft as g,gt as _,ln as v,mn as y,mt as b,pn as x,vt as S,zn as C}from"./_router-chunk-H0-n0SZI.js";import{R as w,Tt as T,V as E,W as D,r as O,t as k}from"./locale.service-Bf8_ncMo.js";import{l as A,n as ee}from"./snackbar.component-ICe8-MWg.js";import{t as te}from"./app-shell.component-CR4uAChA.js";import{t as j}from"./store.service-ZF4OfoGo.js";import{t as M}from"./pager-DPeF-1nO.js";import{n as N,t as P}from"./v2-page.styles-Blvl6ZBZ.js";import{C as F,S as I,a as L,n as R,o as z,t as B}from"./ui-CQhTckzj.js";var V=(e,t)=>t.key,H=(e,t)=>t.id;function U(e,n){if(e&1){let e=s();a(0,`button`,30),t(`click`,function(){let t=f(e).$implicit,n=u();return o(n.family.set(t.key))}),h(1),a(2,`span`,16),h(3),r()()}if(e&2){let e=n.$implicit,t=u();_(`on`,t.family()===e.key),d(`title`,t.t()(e.hint)),b(`aria-checked`,t.family()===e.key),g(),y(` `,t.t()(e.label)),g(),_(`zero`,!t.familyCount(e.key)),g(),x(t.nf.format(t.familyCount(e.key)))}}function W(e,n){if(e&1){let e=s();a(0,`button`,31),t(`click`,function(){f(e);let t=u();return o(t.reset())}),c(1,`ui-icon`,32),h(2),r()}if(e&2){let e=u();g(),d(`size`,14),g(),y(``,e.t()(`audit.reset`),` `)}}function G(e,t){if(e&1&&(a(0,`span`,44),h(1),r()),e&2){let e=u(3);b(`aria-label`,e.t()(`audit.sensitiveAria`)),g(),x(e.t()(`audit.sheet.sensitive`))}}function K(e,n){if(e&1){let e=s();a(0,`tr`,38),t(`click`,function(){let t=f(e).$implicit,n=u(2);return o(n.detailId.set(t.id))}),a(1,`td`,39),h(2),r(),a(3,`td`)(4,`span`,40)(5,`span`,41),c(6,`ui-icon`,42),r(),a(7,`span`,43),h(8),r(),S(9,G,2,2,`span`,44),r()(),a(10,`td`)(11,`span`,45)(12,`span`,46),h(13),r(),a(14,`span`,47),h(15),r()()(),a(16,`td`,48),h(17),r(),a(18,`td`,49),h(19),r(),a(20,`td`)(21,`span`,50)(22,`button`,51),t(`click`,function(t){let n=f(e).$implicit,r=u(2);return t.stopPropagation(),o(r.detailId.set(n.id))}),c(23,`ui-icon`,52),r()()()()}if(e&2){let e=n.$implicit,t=u(2),r=t.fam(e);_(`sensitive`,t.isSensitive(e)),g(2),y(` `,t.fmtDateTime(e.at),` `),g(3),v(`background`,r.bg)(`color`,r.fg),g(),d(`name`,r.icon)(`size`,16),g(2),x(e.action),g(),p(t.isSensitive(e)?9:-1),g(4),x(t.initials(e.user)),g(2),x(e.user),g(),d(`title`,e.entity),g(),y(` `,e.entity,` `),g(),d(`title`,e.detail),g(),y(` `,e.detail||`—`,` `),g(3),d(`title`,t.t()(`common.view`)),b(`aria-label`,t.t()(`common.viewDetail`)),g(),d(`size`,18)}}function q(t,n){if(t&1&&(a(0,`div`,33)(1,`table`,34)(2,`thead`)(3,`tr`)(4,`th`),h(5),r(),a(6,`th`),h(7),r(),a(8,`th`),h(9),r(),a(10,`th`),h(11),r(),a(12,`th`),h(13),r(),a(14,`th`,35),h(15),r()()(),a(16,`tbody`),m(17,K,24,20,`tr`,36,H),r()()(),c(19,`ui-pagination`,37)),t&2){let t=u();g(5),x(t.t()(`audit.col.date`)),g(2),x(t.t()(`audit.col.action`)),g(2),x(t.t()(`audit.col.user`)),g(2),x(t.t()(`audit.col.entity`)),g(2),x(t.t()(`audit.col.detail`)),g(2),x(t.t()(`organisations.col.actions`)),g(2),e(t.pager.items()),g(2),d(`pager`,t.pager)}}function J(e,t){if(e&1&&(a(0,`div`,28)(1,`span`,53),c(2,`ui-icon`,12),r(),a(3,`p`,54),h(4),r(),a(5,`p`,55),h(6),r()()),e&2){let e=u();g(2),d(`size`,26),g(2),x(e.t()(`audit.empty.title`)),g(2),x(e.t()(`audit.empty.text`))}}var Y=/Révélation|Export|Sauvegarde|Restauration|Téléchargement|Fusion|Révocation|Déconnexion forcée/i,X=[{key:`sensibles`,label:`audit.family.sensibles`,hint:`audit.family.sensibles.hint`,test:Y,icon:`warning`,...P.erreur},{key:`qualite`,label:`audit.family.qualite`,hint:`audit.family.qualite.hint`,test:/doublon|fusion|alerte|correction|parcelle|reprise|classement|approbation|refus/i,icon:`fact_check`,...P.attente},{key:`donnees`,label:`audit.family.donnees`,hint:`audit.family.donnees.hint`,test:/Import|Modification|Qualification|Référentiel/i,icon:`dataset`,...P.info},{key:`admin`,label:`audit.family.admin`,hint:`audit.family.admin.hint`,test:/utilisateur|appareil|liaison|compte|Réactivation|Désactivation|Déconnexion forcée|Révocation|Renommage|Resynchronisation|correspondance/i,icon:`manage_accounts`,...P.culture},{key:`connexions`,label:`audit.family.connexions`,hint:`audit.family.connexions.hint`,test:/Connexion/i,icon:`logout`,...P.neutre}],Z=e=>X.find(t=>t.test.test(e.action))??X[2],Q=`__all`,$=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),ne=class o{constructor(){this.store=C(j),this.locale=C(k),this.snackbar=C(ee),this.t=this.locale.t,this.nf=D,this.fmtDateTime=E,this.initials=N,this.families=X,this.all=Q,this.perms=[`audit.read`,`audit.read.scoop`],this.q=i(``),this.family=i(Q),this.user=i(Q),this.from=i(``),this.to=i(``),this.desc=i(!0),this.detailId=i(null),this.description=n(()=>this.t()(this.store.state().session?.permissions.includes(`audit.read`)?`audit.description.platform`:`audit.description.scoop`)),this.rows=n(()=>T(this.store.state().audit,this.store.state().session)),this.base=n(()=>{let e=$(this.q().trim()),t=this.user(),n=this.from(),r=this.to();return this.rows().filter(i=>(t===Q||i.user===t)&&(!n||i.at.slice(0,10)>=n)&&(!r||i.at.slice(0,10)<=r)&&(!e||$(`${i.action} ${i.user} ${i.entity} ${i.detail}`).includes(e)))}),this.shown=n(()=>{let e=this.family(),t=this.desc()?-1:1;return this.base().filter(t=>e===Q||Z(t).key===e).sort((e,n)=>t*e.at.localeCompare(n.at))}),this.pager=M(()=>this.shown()),this.filtered=n(()=>!!this.q().trim()||this.family()!==Q||this.user()!==Q||!!this.from()||!!this.to()),this.userOptions=n(()=>[{value:Q,label:this.t()(`audit.family.all`)},...[...new Set(this.rows().map(e=>e.user))].sort((e,t)=>e.localeCompare(t)).map(e=>({value:e,label:e}))]),this.stats=n(()=>{let e=this.t(),t=this.rows(),n=this.shown(),r=[...t].sort((e,t)=>t.at.localeCompare(e.at))[0];return[{label:e(`audit.kpi.entries`),value:D.format(n.length),sub:e(`audit.kpi.entriesOf`,{total:D.format(t.length)}),icon:`receipt_long`,bg:``,fg:``},{label:e(`audit.kpi.users`),value:D.format(new Set(n.map(e=>e.user)).size),sub:e(`audit.kpi.usersSub`),icon:`group`,...P.info},{label:e(`audit.kpi.sensitive`),value:D.format(n.filter(e=>Y.test(e.action)).length),sub:e(`audit.kpi.sensitiveSub`),icon:`warning`,...P.erreur},{label:e(`audit.kpi.last`),value:r?E(r.at).split(`,`)[0]:`—`,sub:r?`${r.action} · ${r.user}`:e(`audit.kpi.none`),icon:`event_note`,...P.succes}]}),this.detail=n(()=>{let e=this.detailId(),t=e?this.rows().find(t=>t.id===e):null;if(!t)return null;let n=this.t(),r=Z(t),i=this.rows().filter(e=>e.id!==t.id&&e.entity===t.entity).sort((e,t)=>t.at.localeCompare(e.at));return{title:t.action,subtitle:n(`audit.sheet.sentence`,{user:t.user,action:t.action,entity:t.entity,date:E(t.at)}),icon:r.icon,badges:[{label:n(r.label),bg:r.bg,fg:r.fg},...this.isSensitive(t)?[{label:n(`audit.sheet.sensitive`),...P.erreur}]:[]],kpis:[],facts:[F(n(`audit.sheet.when`),E(t.at),`calendar_today`),F(n(`audit.sheet.who`),t.user,`person`),F(n(`audit.sheet.object`),t.entity,`description`,{wide:!0}),F(n(`audit.sheet.what`),t.detail||null,`fact_check`,{wide:!0})],sections:[{title:n(`audit.sheet.related`),icon:`event_note`,count:i.length,empty:n(`audit.sheet.noRelated`),items:i.slice(0,8).map(e=>({label:e.action,sub:`${E(e.at)} · ${e.user}`,initials:N(e.user)})),more:Math.max(0,i.length-8)}],link:null}})}familyCount(e){return this.base().filter(t=>Z(t).key===e).length}fam(e){return Z(e)}isSensitive(e){return Y.test(e.action)}reset(){this.q.set(``),this.family.set(Q),this.user.set(Q),this.from.set(``),this.to.set(``)}exportCsv(){let e=this.shown();try{w(`journal_audit_${new Date().toISOString().slice(0,10)}.csv`,[[`Date`,`Utilisateur`,`Action`,`Entité`,`Détail`],...e.map(e=>[e.at,e.user,e.action,e.entity,e.detail])])}catch{this.snackbar.error(this.t()(`common.exportError`));return}O.audit(`Export`,`Journal d'audit`,`${e.length} entrées (CSV)`),this.snackbar.success(`${this.t()(`audit.exported`)} · ${this.t()(e.length>1?`audit.exportedCount.autre`:`audit.exportedCount.un`,{count:D.format(e.length)})}`)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=l({type:o,selectors:[[`app-audit-page`]],decls:42,vars:34,consts:[[3,`perm`,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`,`disabled`],[`name`,`download`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[1,`card`,`mt-6`,`p-2`],[1,`toolbar`,`p-0`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[`type`,`button`,`role`,`radio`,3,`on`,`title`],[1,`filters`,`mt-2`],[`variant`,`compact`,`leadingIcon`,`person`,3,`valueChange`,`label`,`options`,`value`],[`type`,`date`,`icon`,`calendar_today`,3,`valueChange`,`label`,`value`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`52px`,3,`click`],[`name`,`event_note`,3,`size`],[1,`mt-4`,`flex`,`flex-wrap`,`items-center`,`gap-2`],[`aria-live`,`polite`,1,`sub`],[1,`tabular-nums`,2,`color`,`var(--v2-encre)`],[`type`,`button`,1,`reveal`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`closed`,`view`],[`type`,`button`,`role`,`radio`,3,`click`,`title`],[`type`,`button`,1,`reveal`,3,`click`],[`name`,`close`,3,`size`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[900px]`],[1,`text-right`],[1,`row-link`,3,`sensitive`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`whitespace-nowrap`,`font-medium`,`tabular-nums`],[1,`flex`,`items-center`,`gap-2.5`],[1,`fam`],[3,`name`,`size`],[1,`font-bold`],[1,`badge`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[1,`flex`,`items-center`,`gap-2`],[1,`avatar`,2,`height`,`28px`,`width`,`28px`,`font-size`,`10px`],[1,`font-medium`],[1,`max-w-56`,`truncate`,`font-medium`,3,`title`],[1,`max-w-64`,`truncate`,2,`color`,`var(--v2-gris-texte)`,3,`title`],[1,`flex`,`justify-end`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`]],template:function(n,i){n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),h(4),r(),a(5,`h1`,4),h(6),r(),a(7,`p`,5),h(8),r()(),a(9,`button`,6),t(`click`,function(){return i.exportCsv()}),c(10,`ui-icon`,7),h(11),r()(),c(12,`ui-stat-cards`,8),a(13,`div`,9)(14,`div`,10)(15,`label`,11),c(16,`ui-icon`,12),a(17,`input`,13),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),a(18,`div`,14)(19,`button`,15),t(`click`,function(){return i.family.set(i.all)}),h(20),a(21,`span`,16),h(22),r()(),m(23,U,4,8,`button`,17,V),r()(),a(25,`div`,18)(26,`ui-select`,19),t(`valueChange`,function(e){return i.user.set(e)}),r(),a(27,`ui-text-field`,20),t(`valueChange`,function(e){return i.from.set(e)}),r(),a(28,`ui-text-field`,20),t(`valueChange`,function(e){return i.to.set(e)}),r(),a(29,`button`,21),t(`click`,function(){return i.desc.set(!i.desc())}),c(30,`ui-icon`,22),h(31),r()()(),a(32,`div`,23)(33,`p`,24)(34,`b`,25),h(35),r(),h(36),r(),S(37,W,3,2,`button`,26),r(),a(38,`section`,27),S(39,q,20,7)(40,J,7,3,`div`,28),r(),a(41,`ui-detail-modal`,29),t(`closed`,function(){return i.detailId.set(null)}),r()()),n&2&&(d(`perm`,i.perms)(`area`,i.t()(`audit.area`)),g(4),x(i.t()(`audit.eyebrow`)),g(2),y(` `,i.t()(`audit.title`),` `),g(2),y(` `,i.description(),` `),g(),d(`disabled`,!i.shown().length),g(),d(`size`,20),g(),y(``,i.t()(`audit.export`),` `),g(),d(`stats`,i.stats()),g(4),d(`size`,20),g(),d(`placeholder`,i.t()(`audit.search.placeholder`))(`value`,i.q()),b(`aria-label`,i.t()(`audit.search.aria`)),g(),b(`aria-label`,i.t()(`audit.col.action`)),g(),_(`on`,i.family()===i.all),b(`aria-checked`,i.family()===i.all),g(),y(` `,i.t()(`audit.family.all`)),g(2),x(i.nf.format(i.base().length)),g(),e(i.families),g(3),d(`label`,i.t()(`audit.filter.user`))(`options`,i.userOptions())(`value`,i.user()),g(),d(`label`,i.t()(`audit.filter.from`))(`value`,i.from()),g(),d(`label`,i.t()(`audit.filter.to`))(`value`,i.to()),g(),b(`aria-label`,i.t()(`audit.sort.toggle`)),g(),d(`size`,18),g(),y(``,i.desc()?i.t()(`audit.sort.desc`):i.t()(`audit.sort.asc`),` `),g(4),x(i.nf.format(i.shown().length)),g(),y(` `,i.t()(i.shown().length>1?`audit.count.autre`:`audit.count.un`),` `),g(),p(i.filtered()?37:-1),g(2),p(i.shown().length?39:40),g(2),d(`view`,i.detail()))},dependencies:[te,I,A,L,z,R,B],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.filters[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 8px;
        align-items: end;
      }
      .fam[_ngcontent-%COMP%] {
        display: grid;
        height: 32px;
        width: 32px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 10px;
      }
      tr.sensitive[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]:first-child {
        box-shadow: inset 3px 0 0 var(--%NS%v2-erreur-fg);
      }`]})}};export{ne as default};