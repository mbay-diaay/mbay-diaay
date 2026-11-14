import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,L as c,Ln as l,Lt as u,Nt as d,St as f,Vt as p,Wt as m,Yn as h,_t as g,en as _,fn as v,ft as y,ln as b,mn as x,pn as S,tn as C,vt as w,zn as T}from"./_router-chunk-H0-n0SZI.js";import{n as E}from"./index-B8S1FFME.js";import{l as D,n as O}from"./snackbar.component-ICe8-MWg.js";import{$ as ee,B as k,Q as A,W as j,X as M,Z as N,et as P,t as F,xt as I}from"./locale.service-Bf8_ncMo.js";import{t as L}from"./app-shell.component-CR4uAChA.js";import{t as R}from"./store.service-ZF4OfoGo.js";import{o as z,t as B}from"./ui-CQhTckzj.js";import{t as V}from"./v2-page.styles-Blvl6ZBZ.js";var H=e=>[`/dashboard/reunions`,e],U=e=>[`/dashboard/dossiers`,e],W=e=>({amount:e}),te=(e,t)=>t.kind+t.refId+t.date;function G(e,n){if(e&1){let e=u();a(0,`ui-text-field`,35),t(`valueChange`,function(t){let n=h(e).$implicit,r=p();return o(r.patchDelay(n,t))}),r()}if(e&2){let e=n.$implicit,t=p();m(`label`,t.t()(t.delayField[e].label))(`icon`,t.delayField[e].icon)(`placeholder`,t.t()(`rappels.daysPh`))(`hint`,t.t()(t.delayField[e].hint))(`value`,t.draft()[e])(`error`,t.fieldError(e))}}function K(e,n){if(e&1){let e=u();a(0,`label`,22)(1,`input`,15),t(`change`,function(t){let n=h(e).$implicit,r=p();return o(r.toggleChannel(n,t.target.checked))}),r(),d(2,`ui-icon`,36),v(3),r()}if(e&2){let e=n.$implicit,t=p();y(),m(`checked`,t.draft().channels.includes(e)),y(),m(`name`,t.channelStyle[e].icon)(`size`,18),y(),x(``,t.t()(t.channelStyle[e].label),` `)}}function q(e,t){if(e&1&&(a(0,`p`,23),d(1,`ui-icon`,37),v(2),r()),e&2){let e=p();y(),m(`size`,16),y(),S(e.t()(`rappels.err.channels`))}}function J(e,n){if(e&1){let e=u();a(0,`button`,38),t(`click`,function(){h(e);let t=p();return o(t.useDefaults())}),d(1,`ui-icon`,39),v(2),r()}if(e&2){let e=p();y(),m(`size`,18),y(),S(e.t()(`rappels.useDefaults`))}}function Y(e,t){if(e&1&&(a(0,`p`,34),v(1),r()),e&2){let e=p();y(),S(e.t()(`rappels.preview.pickScoop`))}}function X(e,t){if(e&1&&(a(0,`a`,44),v(1),r()),e&2){let e=p().$implicit;m(`routerLink`,s(2,H,e.refId)),y(),S(e.title)}}function Z(e,t){if(e&1&&(a(0,`a`,44),v(1),r()),e&2){let e=p().$implicit;m(`routerLink`,s(2,U,e.refId)),y(),S(e.title)}}function Q(e,t){if(e&1&&(a(0,`span`,45),v(1),r()),e&2){let e=p().$implicit,t=p(2);y(),S(t.t()(`rappels.preview.contributionText`,s(1,W,t.nf.format(+e.title))))}}function ne(e,t){if(e&1&&(a(0,`div`,40)(1,`span`,41),d(2,`ui-icon`,36),r(),a(3,`span`,42)(4,`span`,43),v(5),r(),w(6,X,2,4,`a`,44)(7,Z,2,4,`a`,44)(8,Q,2,3,`span`,45),a(9,`span`,17),v(10),r()()()),e&2){let e=t.$implicit,n=p(2);y(),b(`background`,n.previewStyle[e.kind].bg)(`color`,n.previewStyle[e.kind].fg),y(),m(`name`,n.previewStyle[e.kind].icon)(`size`,18),y(3),S(n.t()(n.previewStyle[e.kind].label)),y(),g(e.kind===`meeting`||e.kind===`decision`?6:e.kind===`dossier`?7:8),y(4),S(n.fmtDate(e.date))}}function re(e,t){if(e&1&&(a(0,`p`,34),v(1),r()),e&2){let e=p(2);y(),S(e.draft().enabled?e.t()(`rappels.preview.none`):e.t()(`rappels.preview.disabled`))}}function ie(t,n){if(t&1&&_(0,ne,11,9,`div`,40,te,!1,re,2,1,`p`,34),t&2){let t=p();e(t.preview())}}var ae={dossierPendingDays:{label:`rappels.field.dossier`,hint:`rappels.field.dossierHint`,icon:`folder_shared`},meetingNoticeDays:{label:`rappels.field.meeting`,hint:`rappels.field.meetingHint`,icon:`event`},contributionDueDays:{label:`rappels.field.contribution`,hint:`rappels.field.contributionHint`,icon:`payments`},decisionDueDays:{label:`rappels.field.decision`,hint:`rappels.field.decisionHint`,icon:`gavel`}},oe={app:{label:`rappels.channel.app`,icon:`notifications`},sms:{label:`rappels.channel.sms`,icon:`call`},email:{label:`rappels.channel.email`,icon:`mail`}},se={meeting:{label:`rappels.preview.meeting`,icon:`event`,...V.info},decision:{label:`rappels.preview.decision`,icon:`gavel`,...V.attente},dossier:{label:`rappels.preview.dossier`,icon:`folder_shared`,...V.culture},contribution:{label:`rappels.preview.contribution`,icon:`payments`,...V.succes}},$=e=>({...e,dossierPendingDays:String(e.dossierPendingDays),meetingNoticeDays:String(e.meetingNoticeDays),contributionDueDays:String(e.contributionDueDays),decisionDueDays:String(e.decisionDueDays)}),ce=class o{constructor(){this.store=T(R),this.locale=T(F),this.t=this.locale.t,this.snackbar=T(O),this.nf=j,this.fmtDate=k,this.defaultKey=`*`,this.delayFields=N,this.delayField=ae,this.channels=M,this.channelStyle=oe,this.previewStyle=se,this.consolidated=n(()=>this.store.state().session?.scope.kind===`consolidé`),this.targetOptions=n(()=>{let e=this.store.state(),t=I(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session),n=t=>e.reminderSettings[t]?this.t()(`rappels.badge.own`):``;return[...this.consolidated()?[{value:`*`,label:this.t()(`rappels.defaults`),icon:`public`}]:[],...t.map(e=>({value:e.id,label:e.name,hint:n(e.id)}))]}),this.target=i(``),this.draft=i($(P({},null))),this.tried=i(!1),this.ownSettings=n(()=>!!this.store.state().reminderSettings[this.target()]),this.parsed=n(()=>{let e=this.draft(),t=e=>e.trim()===``?NaN:Number(e);return{...e,dossierPendingDays:t(e.dossierPendingDays),meetingNoticeDays:t(e.meetingNoticeDays),contributionDueDays:t(e.contributionDueDays),decisionDueDays:t(e.decisionDueDays)}}),this.issues=n(()=>ee(this.parsed())),this.channelsMissing=n(()=>this.issues().includes(`channels`)),this.preview=n(()=>{let e=this.target();if(!e||e===`*`||this.issues().some(e=>e!==`channels`))return[];let t=this.store.state();return A({scoopId:e,settings:this.parsed(),nowIso:new Date().toISOString(),meetings:t.meetings,dossiers:t.dossiers,rules:t.contributionRules})}),l(()=>{let e=this.targetOptions();c(()=>{e.some(e=>e.value===this.target())||this.target.set(e[0]?.value??``)})}),l(()=>{let e=this.target();c(()=>{this.draft.set($(this.current(e))),this.tried.set(!1)})})}current(e){let t=this.store.state().reminderSettings;return P(t,e===`*`?null:e)}fieldError(e){return!this.tried()||!this.issues().includes(e)?``:this.t()(`rappels.err.days`,{min:1,max:90})}patch(e){this.draft.update(t=>({...t,...e}))}patchDelay(e,t){this.draft.update(n=>({...n,[e]:t}))}toggleChannel(e,t){this.draft.update(n=>({...n,channels:t?M.filter(t=>t===e||n.channels.includes(t)):n.channels.filter(t=>t!==e)}))}save(){if(this.tried.set(!0),this.issues().length)return;let e=this.target(),t=this.store.actions.setReminderSettings(e===`*`?null:e,this.parsed());t.ok?this.snackbar.success(this.locale.tNow(`rappels.saved`)):this.snackbar.error(t.error)}useDefaults(){let e=this.store.actions.clearReminderSettings(this.target());e.ok?(this.draft.set($(this.current(this.target()))),this.snackbar.success(this.locale.tNow(`rappels.defaultsRestored`))):this.snackbar.error(e.error)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=f({type:o,selectors:[[`app-rappels-page`]],decls:57,vars:28,consts:[[`perm`,`notification.configure`,3,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`toolbar`,`card`,`mt-6`],[`leadingIcon`,`apartment`,1,`min-w-[280px]`,`flex-1`,3,`valueChange`,`label`,`options`,`value`],[1,`badge`],[1,`layout`,`mt-4`],[1,`sec-card`],[1,`sec-head`],[1,`sec-ico`],[`name`,`tune`,3,`size`],[1,`space-y-6`,`border-t`,`p-5`,2,`border-color`,`var(--v2-separateur)`],[1,`switch`],[`type`,`checkbox`,3,`change`,`checked`],[1,`block`,`text-[15px]`,`font-extrabold`],[1,`sub`,`block`],[1,`delays`],[`type`,`number`,`inputmode`,`numeric`,3,`label`,`icon`,`placeholder`,`hint`,`value`,`error`],[1,`lbl`],[1,`channels`,`mt-2`],[1,`check`],[`role`,`alert`,1,`mt-1.5`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[1,`notice`],[`name`,`info`,3,`size`],[1,`flex`,`flex-wrap`,`justify-end`,`gap-2`],[`type`,`button`,1,`btn`,`btn-ghost`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`name`,`notifications_active`,3,`size`],[1,`n`],[1,`border-t`,2,`border-color`,`var(--v2-separateur)`],[1,`sub`,`p-5`],[`type`,`number`,`inputmode`,`numeric`,3,`valueChange`,`label`,`icon`,`placeholder`,`hint`,`value`,`error`],[3,`name`,`size`],[`name`,`warning`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`undo`,3,`size`],[1,`preview-item`],[1,`preview-ico`],[1,`min-w-0`,`flex-1`],[1,`mono`,`block`,2,`color`,`var(--v2-gris-texte)`],[1,`block`,`truncate`,`font-bold`,`underline-offset-4`,`hover:underline`,3,`routerLink`],[1,`block`,`font-bold`]],template:function(n,i){n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),v(3),r(),a(4,`h1`,3),v(5),r(),a(6,`p`,4),v(7),r()(),a(8,`div`,5)(9,`ui-select`,6),t(`valueChange`,function(e){return i.target.set(e)}),r(),a(10,`span`,7),v(11),r()(),a(12,`div`,8)(13,`section`,9)(14,`div`,10)(15,`h2`)(16,`span`,11),d(17,`ui-icon`,12),r(),v(18),r()(),a(19,`div`,13)(20,`label`,14)(21,`input`,15),t(`change`,function(e){return i.patch({enabled:e.target.checked})}),r(),a(22,`span`)(23,`span`,16),v(24),r(),a(25,`span`,17),v(26),r()()(),a(27,`div`,18),_(28,G,1,6,`ui-text-field`,19,C),r(),a(30,`fieldset`)(31,`legend`,20),v(32),r(),a(33,`div`,21),_(34,K,4,4,`label`,22,C),r(),w(36,q,3,2,`p`,23),r(),a(37,`p`,24),d(38,`ui-icon`,25),v(39),r(),a(40,`div`,26),w(41,J,3,2,`button`,27),a(42,`button`,28),t(`click`,function(){return i.save()}),v(43),a(44,`span`,29),d(45,`ui-icon`,30),r()()()()(),a(46,`section`,9)(47,`div`,10)(48,`h2`)(49,`span`,11),d(50,`ui-icon`,31),r(),v(51),a(52,`span`,32),v(53),r()()(),a(54,`div`,33),w(55,Y,2,1,`p`,34)(56,ie,3,1),r()()()()),n&2&&(m(`area`,i.t()(`rappels.title`)),y(3),S(i.t()(`rappels.eyebrow`)),y(2),S(i.t()(`rappels.title`)),y(2),S(i.t()(`rappels.description`)),y(2),m(`label`,i.t()(`rappels.target`))(`options`,i.targetOptions())(`value`,i.target()),y(),b(`background`,i.ownSettings()?`var(--v2-citron)`:`var(--v2-lin)`)(`color`,i.ownSettings()?`var(--v2-foret)`:`var(--v2-gris-texte)`),y(),x(` `,i.target()===i.defaultKey?i.t()(`rappels.badge.default`):i.ownSettings()?i.t()(`rappels.badge.own`):i.t()(`rappels.badge.inherited`),` `),y(6),m(`size`,18),y(),S(i.t()(`rappels.settings`)),y(3),m(`checked`,i.draft().enabled),y(3),S(i.t()(`rappels.enabled`)),y(2),S(i.draft().enabled?i.t()(`rappels.enabledOn`):i.t()(`rappels.enabledOff`)),y(2),e(i.delayFields),y(4),S(i.t()(`rappels.channels`)),y(2),e(i.channels),y(2),g(i.tried()&&i.channelsMissing()?36:-1),y(2),m(`size`,18),y(),S(i.t()(`rappels.noAutoApproval`)),y(2),g(i.ownSettings()&&i.target()!==i.defaultKey?41:-1),y(2),x(` `,i.t()(`rappels.save`)),y(2),m(`size`,18),y(5),m(`size`,18),y(),S(i.t()(`rappels.preview.title`)),y(2),S(i.nf.format(i.preview().length)),y(2),g(i.target()===i.defaultKey?55:56))},dependencies:[L,D,E,z,B],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.layout[_ngcontent-%COMP%] {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .layout[_ngcontent-%COMP%] {
          grid-template-columns: minmax(0, 1fr) 380px;
          align-items: start;
        }
      }
      .delays[_ngcontent-%COMP%] {
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      }
      .channels[_ngcontent-%COMP%] {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }
      .channels[_ngcontent-%COMP%]   .check[_ngcontent-%COMP%] {
        flex: 1 1 160px;
      }
      .switch[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 14px;
        border-radius: 18px;
        background: var(--%NS%v2-creme);
        padding: 14px 16px;
        cursor: pointer;
      }
      .switch[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        height: 22px;
        width: 22px;
        accent-color: var(--%NS%v2-foret);
        cursor: pointer;
      }
      .preview-item[_ngcontent-%COMP%] {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 18px;
      }
      .preview-item[_ngcontent-%COMP%]:first-child {
        border-top: none;
      }
      .preview-ico[_ngcontent-%COMP%] {
        display: grid;
        height: 36px;
        width: 36px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 12px;
      }`]})}};export{ce as default};