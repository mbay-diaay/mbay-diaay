import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Ln as c,Lt as l,Nt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,bn as ee,en as g,fn as _,ft as v,gt as te,hn as y,k as b,ln as x,mn as S,mt as ne,nn as C,on as re,pn as w,qt as T,rr as E,t as D,tn as O,vn as k,vt as A,yn as ie,zn as j}from"./_router-chunk-H0-n0SZI.js";import{n as ae}from"./rxjs-interop-U_NminAK.js";import{n as oe}from"./index-B8S1FFME.js";import{At as M,B as N,V as se,W as P,_ as F,g as I,kt as L,n as R,t as z,v as B}from"./locale.service-Bf8_ncMo.js";import{n as V,r as H,t as U}from"./meeting-form-dialog.component-utJyaaPO.js";import{t as W}from"./app-shell.component-CR4uAChA.js";import{t as G}from"./store.service-ZF4OfoGo.js";import{l as K,n as q}from"./snackbar.component-ICe8-MWg.js";import{E as ce,T as J,n as le,t as ue}from"./ui-CQhTckzj.js";import{n as de,t as Y}from"./v2-page.styles-Blvl6ZBZ.js";var fe=e=>({date:e}),pe=(e,t)=>({by:e,date:t}),me=(e,t)=>t.id;function he(e,n){if(e&1){let e=l();a(0,`button`,22),t(`click`,function(){m(e);let t=f();return o(t.openAdd())}),u(1,`ui-icon`,23),_(2),r()}if(e&2){let e=f();v(),p(`size`,18),v(),w(e.t()(`decisions.add`))}}function ge(e,t){if(e&1&&(a(0,`span`,28),u(1,`ui-icon`,34),_(2),r()),e&2){let e=f().$implicit,t=f();te(`late`,t.isLate(e)),v(),p(`size`,16),v(),y(``,t.t()(`decisions.due`,s(5,fe,t.fmtDate(e.dueDate))),``,t.isLate(e)?` · `+t.t()(`decisions.late`):``,` `)}}function _e(e,t){if(e&1&&(a(0,`span`,31),_(1),r()),e&2){let e=f(2);v(),w(e.t()(`decisions.noDue`))}}function ve(e,t){if(e&1&&(a(0,`p`,32),_(1),a(2,`span`,35),_(3),r()()),e&2){let e=f().$implicit,t=f();v(),S(` `,e.closingNote,` `),v(2),w(t.t()(`decisions.closedBy`,T(2,pe,e.closedBy??``,e.closedAt?t.fmtDate(e.closedAt):``)))}}function ye(e,n){if(e&1){let e=l();a(0,`button`,22),t(`click`,function(){m(e);let t=f(2).$implicit,n=f();return o(n.start(t))}),u(1,`ui-icon`,37),_(2),r()}if(e&2){let e=f(3);v(),p(`size`,18),v(),w(e.t()(`decisions.start`))}}function be(e,n){if(e&1){let e=l();a(0,`span`,33),A(1,ye,3,2,`button`,5),a(2,`button`,22),t(`click`,function(){m(e);let t=f().$implicit,n=f();return o(n.openClose(t))}),u(3,`ui-icon`,36),_(4),r()()}if(e&2){let e=f().$implicit,t=f();v(),h(e.status===`ouverte`?1:-1),v(2),p(`size`,18),v(),w(t.t()(`decisions.close`))}}function xe(e,t){if(e&1&&(a(0,`article`,7)(1,`div`,24)(2,`p`,25),_(3),r(),a(4,`span`,26),_(5),r()(),a(6,`p`,27)(7,`span`,28),u(8,`ui-icon`,29),_(9),r(),A(10,ge,3,7,`span`,30)(11,_e,2,1,`span`,31),r(),A(12,ve,4,5,`p`,32)(13,be,5,3,`span`,33),r()),e&2){let e=t.$implicit,n=f();v(3),w(e.text),v(),x(`background`,n.statusStyle[e.status].bg)(`color`,n.statusStyle[e.status].fg),v(),w(n.t()(n.statusStyle[e.status].label)),v(3),p(`size`,16),v(),w(e.ownerName),v(),h(e.dueDate?10:11),v(2),h(e.status===`clôturée`?12:n.canManage()?13:-1)}}function Se(e,t){if(e&1&&(a(0,`p`,8),_(1),r()),e&2){let e=f();v(),w(e.meeting().status===`tenue`?e.t()(`decisions.empty`):e.t()(`decisions.notHeld`))}}function Ce(e,t){e&1&&(a(0,`p`,14),u(1,`ui-icon`,38),_(2),r()),e&2&&(v(),p(`size`,16),v(),w(t))}function we(e,t){if(e&1&&(a(0,`p`,14),u(1,`ui-icon`,38),_(2),r()),e&2){let e=f(2);v(),p(`size`,16),v(),w(e.t()(`errors.decision.closingNote`))}}function Te(e,n){if(e&1){let e=l();a(0,`ui-modal`,39),t(`closed`,function(){m(e);let t=f();return o(t.closing.set(null))}),a(1,`label`,40),_(2),r(),a(3,`textarea`,41),t(`input`,function(t){m(e);let n=f();return o(n.note.set(t.target.value))}),r(),A(4,we,3,2,`p`,14),a(5,`p`,42),_(6),r(),a(7,`button`,17),t(`click`,function(){m(e);let t=f();return o(t.closing.set(null))}),_(8),r(),a(9,`button`,18),t(`click`,function(){let t=m(e),n=f();return o(n.submitClose(t))}),_(10),a(11,`span`,19),u(12,`ui-icon`,20),r()()()}if(e&2){let e=f();p(`open`,!0)(`title`,e.t()(`decisions.closeTitle`))(`description`,n.text)(`width`,580)(`closeLabel`,e.t()(`common.close`)),v(2),w(e.t()(`decisions.field.note`)),v(),p(`placeholder`,e.t()(`decisions.field.notePh`))(`value`,e.note()),v(),h(e.noteTried()&&e.note().trim().length<5?4:-1),v(2),w(e.t()(`decisions.closeLocked`)),v(2),w(e.t()(`common.cancel`)),v(2),w(e.t()(`decisions.closeSubmit`)),v(2),p(`size`,18)}}var Ee={ouverte:{label:`decisions.status.ouverte`,...Y.attente},"en cours":{label:`decisions.status.enCours`,...Y.info},clôturée:{label:`decisions.status.cloturee`,...Y.succes}},De=class o{constructor(){this.meeting=b.required(),this.store=j(G),this.snackbar=j(q),this.locale=j(z),this.t=this.locale.t,this.fmtDate=N,this.statusStyle=Ee,this.canManage=n(()=>this.store.can(`decision.manage`)),this.canAdd=n(()=>this.canManage()&&this.meeting().status===`tenue`),this.decisions=n(()=>{let e=e=>+(e.status===`clôturée`);return[...this.meeting().decisions].sort((t,n)=>e(t)-e(n)||(t.dueDate??`9999`).localeCompare(n.dueDate??`9999`))}),this.addOpen=i(!1),this.text=i(``),this.owner=i(``),this.dueDate=i(``),this.addTried=i(!1),this.closing=i(null),this.note=i(``),this.noteTried=i(!1),this.addErrors=n(()=>{if(!this.addTried())return{};let e=this.t(),t={};return this.text().trim().length<5&&(t.text=e(`errors.decision.text`)),this.owner().trim().length<3&&(t.owner=e(`errors.decision.owner`)),t})}isLate(e){return e.status!==`clôturée`&&!!e.dueDate&&e.dueDate<new Date().toISOString().slice(0,10)}openAdd(){this.text.set(``),this.owner.set(``),this.dueDate.set(``),this.addTried.set(!1),this.addOpen.set(!0)}submitAdd(){if(this.addTried.set(!0),Object.keys(this.addErrors()).length)return;let e=this.store.actions.addMeetingDecision(this.meeting().id,{text:this.text(),ownerName:this.owner(),dueDate:this.dueDate()||null});e.ok?(this.snackbar.success(this.locale.tNow(`decisions.added`)),this.addOpen.set(!1)):this.snackbar.error(e.error)}start(e){let t=this.store.actions.setDecisionStatus(this.meeting().id,e.id,`en cours`);t.ok?this.snackbar.success(this.locale.tNow(`decisions.started`)):this.snackbar.error(t.error)}openClose(e){this.note.set(``),this.noteTried.set(!1),this.closing.set(e)}submitClose(e){if(this.noteTried.set(!0),this.note().trim().length<5)return;let t=this.store.actions.setDecisionStatus(this.meeting().id,e.id,`clôturée`,this.note());t.ok?(this.snackbar.success(this.locale.tNow(`decisions.closed`)),this.closing.set(null)):this.snackbar.error(t.error)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=d({type:o,selectors:[[`app-meeting-decisions`]],hostAttrs:[1,`block`],inputs:{meeting:[1,`meeting`]},decls:29,vars:26,consts:[[1,`sec-card`],[1,`sec-head`],[1,`sec-ico`],[`name`,`gavel`,3,`size`],[1,`n`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`40px`],[1,`border-t`,2,`border-color`,`var(--v2-separateur)`],[1,`decision`],[1,`sub`,`p-5`],[`icon`,`gavel`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-4`,`sm:grid-cols-2`],[1,`sm:col-span-2`],[`for`,`decision-text`,1,`lbl`],[`id`,`decision-text`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[`role`,`alert`,1,`mt-1.5`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[`preset`,`firstName`,3,`valueChange`,`label`,`placeholder`,`value`,`error`],[`type`,`date`,`icon`,`calendar_today`,3,`valueChange`,`label`,`optional`,`placeholder`,`value`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`icon`,`task_alt`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`40px`,3,`click`],[`name`,`add`,3,`size`],[1,`flex`,`flex-wrap`,`items-start`,`justify-between`,`gap-2`],[1,`min-w-0`,`flex-1`,`text-[15px]`,`font-bold`],[1,`badge`],[1,`sub`,`flex`,`flex-wrap`,`items-center`,`gap-x-4`,`gap-y-1`],[1,`inline-flex`,`items-center`,`gap-1.5`],[`name`,`person`,3,`size`],[1,`inline-flex`,`items-center`,`gap-1.5`,3,`late`],[1,`zero`],[1,`closing`],[1,`flex`,`flex-wrap`,`gap-2`],[`name`,`schedule`,3,`size`],[1,`sub`,`block`],[`name`,`task_alt`,3,`size`],[`name`,`progress_activity`,3,`size`],[`name`,`warning`,3,`size`],[`icon`,`task_alt`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`for`,`decision-note`,1,`lbl`],[`id`,`decision-note`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[1,`sub`,`mt-3`]],template:function(n,i){if(n&1&&(a(0,`section`,0)(1,`div`,1)(2,`h2`)(3,`span`,2),u(4,`ui-icon`,3),r(),_(5),a(6,`span`,4),_(7),r()(),A(8,he,3,2,`button`,5),r(),a(9,`div`,6),g(10,xe,14,10,`article`,7,me,!1,Se,2,1,`p`,8),r()(),a(13,`ui-modal`,9),t(`closed`,function(){return i.addOpen.set(!1)}),a(14,`div`,10)(15,`div`,11)(16,`label`,12),_(17),r(),a(18,`textarea`,13),t(`input`,function(e){return i.text.set(e.target.value)}),r(),A(19,Ce,3,2,`p`,14),r(),a(20,`ui-text-field`,15),t(`valueChange`,function(e){return i.owner.set(e)}),r(),a(21,`ui-text-field`,16),t(`valueChange`,function(e){return i.dueDate.set(e)}),r()(),a(22,`button`,17),t(`click`,function(){return i.addOpen.set(!1)}),_(23),r(),a(24,`button`,18),t(`click`,function(){return i.submitAdd()}),_(25),a(26,`span`,19),u(27,`ui-icon`,20),r()()(),A(28,Te,13,13,`ui-modal`,21)),n&2){let t,n;v(4),p(`size`,18),v(),w(i.t()(`decisions.title`)),v(2),w(i.meeting().decisions.length),v(),h(i.canAdd()?8:-1),v(2),e(i.decisions()),v(3),p(`open`,i.addOpen())(`title`,i.t()(`decisions.addTitle`))(`description`,i.t()(`decisions.addDescription`))(`width`,620)(`closeLabel`,i.t()(`common.close`)),v(4),w(i.t()(`decisions.field.text`)),v(),p(`placeholder`,i.t()(`decisions.field.textPh`))(`value`,i.text()),v(),h((t=i.addErrors().text)?19:-1,t),v(),p(`label`,i.t()(`decisions.field.owner`))(`placeholder`,i.t()(`decisions.field.ownerPh`))(`value`,i.owner())(`error`,i.addErrors().owner??``),v(),p(`label`,i.t()(`decisions.field.due`))(`optional`,i.t()(`decisions.optional`))(`placeholder`,i.t()(`decisions.field.duePh`))(`value`,i.dueDate()),v(2),w(i.t()(`common.cancel`)),v(2),w(i.t()(`decisions.addSubmit`)),v(2),p(`size`,18),v(),h((n=i.closing())?28:-1,n)}},dependencies:[K,J,ue],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.decision[_ngcontent-%COMP%] {
        display: grid;
        gap: 8px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 16px 20px;
      }
      .decision[_ngcontent-%COMP%]:first-child {
        border-top: none;
      }
      .late[_ngcontent-%COMP%] {
        color: var(--%NS%v2-erreur-fg);
        font-weight: 800;
      }
      .closing[_ngcontent-%COMP%] {
        border-radius: 14px;
        background: var(--%NS%v2-creme);
        padding: 10px 12px;
        font-size: 14px;
        font-weight: 600;
      }`]})}},Oe=e=>({label:e,link:`/dashboard/reunions`}),ke=e=>({reason:e}),X=e=>({name:e}),Z=(e,t)=>({by:e,date:t}),Ae=(e,t)=>({present:e,absent:t}),je=e=>({rate:e}),Me=(e,t)=>({present:e,total:t}),Q=(e,t)=>t.id;function Ne(e,n){if(e&1){let e=l();a(0,`button`,39),t(`click`,function(){m(e);let t=f(3);return o(t.openEditDialog())}),u(1,`ui-icon`,40),_(2),r()}if(e&2){let e=f(3);v(),p(`size`,18),v(),S(``,e.t()(`reunions.detail.edit`),` `)}}function Pe(e,n){if(e&1){let e=l();a(0,`button`,41),t(`click`,function(){m(e);let t=f(3);return o(t.openHoldDialog())}),u(1,`ui-icon`,42),_(2),r()}if(e&2){let e=f(3);v(),p(`size`,18),v(),S(``,e.t()(`reunions.detail.hold`),` `)}}function Fe(e,n){if(e&1){let e=l();a(0,`div`,3),A(1,Ne,3,2,`button`,35),A(2,Pe,3,2,`button`,36),a(3,`button`,37),t(`click`,function(){m(e);let t=f(2);return o(t.openCancelDialog())}),u(4,`ui-icon`,38),_(5),r()()}if(e&2){let e=f(),t=f();v(),h(t.canEditMeeting(e)?1:-1),v(),h(t.isPast(e.date)?2:-1),v(2),p(`size`,18),v(),S(``,t.t()(`reunions.detail.cancel`),` `)}}function Ie(e,t){if(e&1&&(a(0,`p`,4),u(1,`ui-icon`,43),_(2),r()),e&2){let e=f(),t=f();v(),p(`size`,18),v(),S(``,t.t()(`reunions.detail.cancelledReason`,s(2,ke,e.cancelReason??``)),` `)}}function Le(e,t){if(e&1&&(a(0,`li`)(1,`span`,44),_(2),r(),a(3,`span`,45),_(4),r()()),e&2){let e=t.$implicit,n=t.$index;v(2),w(n+1),v(2),w(e)}}function Re(e,t){if(e&1&&(a(0,`li`,14),_(1),r()),e&2){let e=f(2);v(),S(` `,e.t()(`reunions.detail.agendaNone`),` `)}}function ze(e,t){if(e&1&&(a(0,`a`,46),_(1),a(2,`span`,27),u(3,`ui-icon`,47),r()(),a(4,`p`,48),_(5),r()),e&2){let e=f(),t=f();p(`href`,e.onlineUrl,re),v(),S(` `,t.t()(`reunions.detail.join`)),v(2),p(`size`,18),v(2),w(e.onlineUrl)}}function Be(e,t){if(e&1&&(a(0,`li`,49),_(1),r()),e&2){let e=t.$implicit;v(),w(e)}}function Ve(t,n){if(t&1&&(a(0,`ul`,17),g(1,Be,2,1,`li`,49,O),r()),t&2){let t=f(2);v(),e(t.convokedNames())}}function He(e,t){if(e&1&&(a(0,`p`,18),_(1),r()),e&2){let e=f(2);v(),w(e.t()(`reunions.detail.convokedNone`))}}function Ue(e,t){if(e&1&&(a(0,`p`,57),u(1,`ui-icon`,43),_(2),r()),e&2){let e=f(4);v(),p(`size`,16),v(),S(``,e.t()(`reunions.minutes.emptyText`),` `)}}function We(e,t){if(e&1&&(a(0,`p`,58),_(1),r()),e&2){let e=f(3),t=f();v(),w(t.t()(`reunions.minutes.author`,s(1,X,e.minutes?.authorName??``)))}}function Ge(e,t){if(e&1&&(a(0,`p`,59),u(1,`ui-icon`,63),_(2),r()),e&2){let e=f(4);v(),p(`size`,18),v(),w(e.t()(`reunions.minutes.authorCannotValidate`))}}function Ke(e,n){if(e&1){let e=l();a(0,`label`,54),_(1),r(),a(2,`p`,55),_(3),r(),a(4,`textarea`,56),t(`input`,function(t){m(e);let n=f(3);return o(n.minutesDraft=t.target.value)}),r(),A(5,Ue,3,2,`p`,57),A(6,We,2,3,`p`,58),A(7,Ge,3,2,`p`,59),a(8,`div`,60)(9,`button`,61),t(`click`,function(){m(e);let t=f(3);return o(t.saveMinutesDraft())}),_(10),r(),a(11,`button`,62),t(`click`,function(){m(e);let t=f(3);return o(t.openValidateConfirm())}),_(12),a(13,`span`,27),u(14,`ui-icon`,28),r()()()}if(e&2){let e=f(2),t=f();v(),w(t.t()(`reunions.minutes.text`)),v(2),w(t.t()(`reunions.minutes.textHint`)),v(),p(`value`,t.minutesDraft),v(),h(t.minutesTried()&&!t.minutesDraft.trim()?5:-1),v(),h(e.minutes?.authorName?6:-1),v(),h(t.isMinutesAuthor()?7:-1),v(3),S(` `,t.t()(`reunions.minutes.save`),` `),v(),p(`disabled`,!t.minutesDraft.trim()||t.isMinutesAuthor()),v(),S(` `,t.t()(`reunions.minutes.validate`)),v(2),p(`size`,18)}}function qe(e,t){if(e&1&&(a(0,`p`,58),_(1),r()),e&2){let e=f(3),t=f();v(),w(t.t()(`reunions.minutes.author`,s(1,X,e.minutes.authorName)))}}function Je(e,t){if(e&1&&(a(0,`p`,65),u(1,`ui-icon`,42),_(2),r(),a(3,`p`,58),_(4),r()),e&2){let e=f(3),t=f();v(),p(`size`,18),v(),S(` `,t.t()(`reunions.minutes.validatedBy`,T(3,Z,e.minutes.validatedBy??``,e.minutes.validatedAt?t.fmtDate(e.minutes.validatedAt):``)),` `),v(2),w(t.t()(`reunions.minutes.lockedNote`))}}function $(e,t){if(e&1&&(a(0,`p`,64),_(1),r(),A(2,qe,2,3,`p`,58),A(3,Je,5,6)),e&2){let e=f(2);v(),w(e.minutes.text),v(),h(e.minutes.authorName?2:-1),v(),h(e.minutes.status===`validé`?3:-1)}}function Ye(e,t){if(e&1&&(a(0,`p`,53),_(1),r()),e&2){let e=f(3);v(),w(e.t()(`reunions.minutes.readonlyNone`))}}function Xe(e,t){if(e&1&&(a(0,`section`,8)(1,`div`,9)(2,`h2`)(3,`span`,10),u(4,`ui-icon`,50),r(),_(5),r(),a(6,`span`,51),_(7),r()(),a(8,`div`,52),A(9,Ke,15,10)(10,$,4,3)(11,Ye,2,1,`p`,53),r()()),e&2){let e=f(),t=f();v(4),p(`size`,18),v(),S(``,t.t()(`reunions.minutes.title`),` `),v(),x(`background`,t.minutesTone(e).bg)(`color`,t.minutesTone(e).fg),v(),w(t.minutesStatusLabel(e)),v(2),h(t.minutesEditable()?9:e.minutes?10:11)}}function Ze(e,t){if(e&1&&u(0,`app-meeting-decisions`,19),e&2){let e=f();p(`meeting`,e)}}function Qe(e,t){if(e&1&&(a(0,`span`,71)(1,`span`,72),_(2),r(),_(3),r()),e&2){let e=t.$implicit,n=f(4);v(2),w(n.initials(e.firstName+` `+e.lastName)),v(),y(``,e.firstName,` `,e.lastName)}}function $e(t,n){if(t&1&&(a(0,`p`,69),_(1),r(),a(2,`div`,70),g(3,Qe,4,3,`span`,71,Q),r()),t&2){let t=f(3);v(),w(t.t()(`reunions.attendance.presentList`)),v(2),e(t.present())}}function et(e,t){if(e&1&&(a(0,`section`,8)(1,`div`,9)(2,`h2`)(3,`span`,10),u(4,`ui-icon`,15),r(),_(5),r()(),a(6,`div`,52)(7,`p`,66),_(8),r(),a(9,`span`,67),u(10,`span`),r(),a(11,`p`,68),_(12),r(),A(13,$e,5,1),r()()),e&2){let e=f(2);v(4),p(`size`,18),v(),S(``,e.t()(`reunions.attendance.sectionTitle`),` `),v(3),S(` `,e.t()(`reunions.attendance.summary`,T(7,Ae,e.stats().present,e.stats().absent)),` `),v(2),x(`width`,e.stats().rate,`%`),v(2),S(` `,e.t()(`reunions.attendance.rate`,s(10,je,e.stats().rate)),` `),v(),h(e.present().length?13:-1)}}function tt(e,t){if(e&1&&(a(0,`li`),u(1,`span`,73),a(2,`span`,45)(3,`span`,74),_(4),r(),a(5,`span`,75),_(6),r()()()),e&2){let e=t.$implicit,n=f(2);v(4),w(n.historyLabel(e.action)),v(2),w(n.t()(`reunions.detail.historyBy`,T(2,Z,e.by,n.fmtDateTime(e.at))))}}function nt(e,n){if(e&1){let e=l();a(0,`li`)(1,`label`)(2,`input`,80),t(`change`,function(t){let n=m(e).$implicit,r=f(3);return o(r.toggleHold(n.id,t))}),r(),a(3,`span`,81),_(4),r(),_(5),r()()}if(e&2){let e=n.$implicit,t=f(3);v(2),p(`checked`,t.holdPresentIds().includes(e.id)),v(2),w(t.initials(e.firstName+` `+e.lastName)),v(),y(` `,e.firstName,` `,e.lastName,` `)}}function rt(n,i){if(n&1){let e=l();a(0,`div`,76)(1,`p`,77),_(2),r(),a(3,`button`,78),t(`click`,function(){m(e);let t=f(2);return o(t.toggleHoldAll())}),_(4),r()(),a(5,`ul`,79),g(6,nt,6,4,`li`,null,Q),r()}if(n&2){let t=f(2);v(2),S(` `,t.t()(`reunions.attendance.counter`,T(3,Me,t.holdPresentIds().length,t.scoopMembers().length)),` `),v(2),S(` `,t.holdAllSelected()?t.t()(`reunions.attendance.uncheckAll`):t.t()(`reunions.attendance.checkAll`),` `),v(),ne(`aria-label`,t.t()(`reunions.attendance.listAria`)),v(),e(t.scoopMembers())}}function it(e,t){if(e&1&&(a(0,`p`,24),_(1),r()),e&2){let e=f(2);v(),w(e.t()(`reunions.attendance.noMembers`))}}function at(e,t){if(e&1&&(a(0,`p`,33),u(1,`ui-icon`,43),_(2),r()),e&2){let e=f(2);v(),p(`size`,18),v(),S(``,e.t()(`reunions.minutes.confirmUnsaved`),` `)}}function ot(n,i){if(n&1){let e=l();a(0,`ui-detail-hero`,2),A(1,Fe,6,4,`div`,3),r(),A(2,Ie,3,4,`p`,4),u(3,`ui-stat-cards`,5),a(4,`div`,6)(5,`div`,7)(6,`section`,8)(7,`div`,9)(8,`h2`)(9,`span`,10),u(10,`ui-icon`,11),r(),_(11),a(12,`span`,12),_(13),r()()(),a(14,`ol`,13),g(15,Le,5,2,`li`,null,C,!1,Re,2,1,`li`,14),r()(),a(18,`section`,8)(19,`div`,9)(20,`h2`)(21,`span`,10),u(22,`ui-icon`,15),r(),_(23),r()(),a(24,`p`,16),_(25),r(),A(26,ze,6,4),A(27,Ve,3,0,`ul`,17)(28,He,2,1,`p`,18),r(),A(29,Xe,12,8,`section`,8),A(30,Ze,1,1,`app-meeting-decisions`,19),r(),a(31,`div`,7),A(32,et,14,12,`section`,8),a(33,`section`,8)(34,`div`,9)(35,`h2`)(36,`span`,10),u(37,`ui-icon`,20),r(),_(38),a(39,`span`,12),_(40),r()()(),a(41,`ol`,21),g(42,tt,7,5,`li`,null,C),r()()()(),a(44,`app-meeting-form-dialog`,22),ie(`openChange`,function(t){m(e);let n=f();return k(n.editOpen,t)||(n.editOpen=t),o(t)}),t(`notify`,function(t){m(e);let n=f();return o(n.onMeetingFormNotify(t))}),r(),a(45,`ui-modal`,23),t(`closed`,function(){m(e);let t=f();return o(t.closeHoldDialog())}),A(46,rt,8,6)(47,it,2,1,`p`,24),a(48,`button`,25),t(`click`,function(){m(e);let t=f();return o(t.closeHoldDialog())}),_(49),r(),a(50,`button`,26),t(`click`,function(){m(e);let t=f();return o(t.submitHoldMeeting())}),_(51),a(52,`span`,27),u(53,`ui-icon`,28),r()()(),a(54,`ui-modal`,29),t(`closed`,function(){m(e);let t=f();return o(t.closeCancelDialog())}),a(55,`label`,30),_(56),r(),a(57,`textarea`,31),t(`input`,function(t){m(e);let n=f();return o(n.cancelReasonText=t.target.value)}),r(),a(58,`button`,25),t(`click`,function(){m(e);let t=f();return o(t.closeCancelDialog())}),_(59),r(),a(60,`button`,32),t(`click`,function(){m(e);let t=f();return o(t.submitCancelMeeting())}),_(61),r()(),a(62,`ui-modal`,23),t(`closed`,function(){m(e);let t=f();return o(t.closeValidateConfirm())}),A(63,at,3,2,`p`,33),a(64,`button`,25),t(`click`,function(){m(e);let t=f();return o(t.closeValidateConfirm())}),_(65),r(),a(66,`button`,34),t(`click`,function(){m(e);let t=f();return o(t.confirmValidateMinutes())}),_(67),a(68,`span`,27),u(69,`ui-icon`,28),r()()()}if(n&2){let t=i,n=f();p(`crumb`,s(57,Oe,n.t()(`reunions.title`)))(`title`,t.title)(`eyebrow`,n.t()(n.MEETING_KIND_LABEL[t.kind]))(`badges`,n.heroBadges())(`meta`,n.heroMeta())(`backLabel`,n.t()(`reunions.detail.back`)),v(),h(n.canManage()&&t.status===`planifiée`?1:-1),v(),h(t.status===`annulée`?2:-1),v(),p(`stats`,n.kpis()),v(7),p(`size`,18),v(),w(n.t()(`reunions.detail.agenda`)),v(2),w(t.agenda.length),v(2),e(t.agenda),v(7),p(`size`,18),v(),S(``,n.t()(`reunions.detail.convoked`),` `),v(2),y(``,n.t()(n.modeKey(t)),``,t.place&&t.mode!==`en ligne`?` · `+t.place:``),v(),h(t.onlineUrl?26:-1),v(),h(n.convokedNames().length?27:28),v(2),h(t.status===`tenue`?29:-1),v(),h(t.status===`annulée`?-1:30),v(2),h(t.status===`tenue`?32:-1),v(5),p(`size`,18),v(),w(n.t()(`reunions.detail.history`)),v(2),w(t.history.length),v(2),e(n.historyReversed(t)),v(2),ee(`open`,n.editOpen),p(`meeting`,t),v(),p(`open`,n.holdOpen())(`title`,n.t()(`reunions.attendance.title`))(`description`,n.t()(`reunions.attendance.description`))(`width`,600)(`closeLabel`,n.t()(`common.close`)),v(),h(n.scoopMembers().length?46:47),v(3),S(` `,n.t()(`producteurs.index.cancel`),` `),v(),p(`disabled`,!n.holdPresentIds().length),v(),S(` `,n.t()(`reunions.attendance.submit`)),v(2),p(`size`,18),v(),p(`open`,n.cancelOpen())(`title`,n.t()(`reunions.cancel.title`))(`description`,n.t()(`reunions.cancel.description`))(`width`,540)(`closeLabel`,n.t()(`common.close`)),v(2),w(n.t()(`reunions.cancel.reason`)),v(),p(`placeholder`,n.t()(`reunions.cancel.reasonHint`))(`value`,n.cancelReasonText),v(2),S(` `,n.t()(`reunions.cancel.keep`),` `),v(),p(`disabled`,n.cancelReasonText.trim().length<3),v(),S(` `,n.t()(`reunions.cancel.submit`),` `),v(),p(`open`,n.validateConfirmOpen())(`title`,n.t()(`reunions.minutes.confirmTitle`))(`description`,n.t()(`reunions.minutes.confirmDescription`))(`width`,520)(`closeLabel`,n.t()(`common.close`)),v(),h(n.minutesDirty()?63:-1),v(2),S(` `,n.t()(`producteurs.index.cancel`),` `),v(2),S(` `,n.t()(`reunions.minutes.confirmSubmit`)),v(2),p(`size`,18)}}function st(e,t){if(e&1&&(a(0,`div`,1)(1,`span`,82),u(2,`ui-icon`,83),r(),a(3,`h1`,84),_(4),r(),a(5,`p`,53),_(6),r(),a(7,`a`,85),_(8),r()()),e&2){let e=f();v(2),p(`size`,26),v(2),w(e.t()(`reunions.detail.notFound.title`)),v(2),w(e.t()(`reunions.detail.notFound.text`)),v(2),w(e.t()(`reunions.detail.back`))}}var ct=864e5,lt=class e{constructor(){this.route=j(D),this.store=j(G),this.locale=j(z),this.t=this.locale.t,this.fmtDateTime=se,this.fmtDate=N,this.MEETING_KIND_LABEL=V,this.MEETING_STATUS_LABEL=H,this.initials=de,this.snackbar=j(q),this.HISTORY_LABEL={créée:`reunions.detail.history.créée`,modifiée:`reunions.detail.history.modifiée`,tenue:`reunions.detail.history.tenue`,annulée:`reunions.detail.history.annulée`,"procès-verbal enregistré":`reunions.detail.history.procès-verbal enregistré`,"procès-verbal validé":`reunions.detail.history.procès-verbal validé`,"décision ajoutée":`reunions.detail.history.décision ajoutée`,"décision en cours":`reunions.detail.history.décision en cours`,"décision clôturée":`reunions.detail.history.décision clôturée`},this.id=ae(this.route.paramMap.pipe(E(e=>e.get(`id`)??``)),{initialValue:``}),this.meeting=n(()=>{let e=this.id(),t=this.store.state(),n=t.meetings.find(t=>t.id===e);if(n)return L([n],t.session).length===1?n:void 0}),this.canManage=n(()=>this.store.can(`meeting.manage`)),this.stats=n(()=>{let e=this.meeting();if(!e)return{present:0,absent:0,rate:0};let t=this.store.state().session,n=M(this.store.state().members,t).filter(t=>t.scoopId===e.scoopId&&t.status===`membre`),r=Math.max(n.length,e.presentIds.length),i=I(e,r);return{present:i.present,absent:Math.max(i.total-i.present,0),rate:i.rate}}),this.scoopMembers=n(()=>{let e=this.meeting();if(!e)return[];let t=this.store.state().session;return[...M(this.store.state().members,t).filter(t=>t.scoopId===e.scoopId&&t.status===`membre`)].sort((e,t)=>`${e.lastName} ${e.firstName}`.localeCompare(`${t.lastName} ${t.firstName}`,`fr`))}),this.minutesEditable=n(()=>{let e=this.meeting();return!!(e&&this.store.can(`minutes.manage`)&&F(e))}),this.isMinutesAuthor=n(()=>{let e=this.meeting()?.minutes?.authorEmail?.toLowerCase(),t=this.store.state().session?.email.toLowerCase();return!!e&&e===t}),this.minutesDraft=``,this.minutesTried=i(!1),this.validateConfirmOpen=i(!1),this.holdOpen=i(!1),this.holdPresentIds=i([]),this.cancelOpen=i(!1),this.cancelReasonText=``,this.editOpen=i(!1),this.holdAllSelected=n(()=>{let e=this.scoopMembers(),t=this.holdPresentIds();return e.length>0&&t.length===e.length}),this.convokedNames=n(()=>{let e=this.meeting(),t=this.store.state();return e?.audience?[...e.audience.orgIds.map(e=>t.orgs.find(t=>t.id===e)?.name).filter(e=>!!e),...e.audience.staffIds.map(e=>t.users.find(t=>t.id===e)?.name).filter(e=>!!e),...e.audience.others]:[]}),this.present=n(()=>{let e=this.meeting();return e?this.store.state().members.filter(t=>e.presentIds.includes(t.id)):[]}),this.heroBadges=n(()=>{let e=this.meeting();if(!e)return[];let t=this.t();return[{label:t(H[e.status]),tone:{planifiée:`light`,tenue:`citron`,annulée:`danger`}[e.status]},...e.status===`tenue`?[{label:`${t(`reunions.minutes.title`)} : ${this.minutesStatusLabel(e)}`,tone:e.minutes?.status===`validé`?`glass`:`warn`}]:[]]}),this.heroMeta=n(()=>{let e=this.meeting();return e?[{icon:`calendar_today`,text:this.locale.formatDate(e.date,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`,hour:`2-digit`,minute:`2-digit`})},{icon:e.mode===`en ligne`?`public`:`location_on`,text:e.mode===`en ligne`?this.t()(`reunions.form.mode.online`):e.place},{icon:`apartment`,text:this.scoopName(e.scoopId)}]:[]}),this.kpis=n(()=>{let e=this.meeting();if(!e)return[];let t=this.t(),n=this.stats(),r=Math.ceil((new Date(e.date).getTime()-Date.now())/ct);return[{label:t(`reunions.quick.agenda`),value:P.format(e.agenda.length),sub:t(V[e.kind]),icon:`fact_check`,bg:``,fg:``},e.status===`planifiée`&&r>=0?{label:t(`reunions.quick.daysLeft`),value:P.format(r),sub:N(e.date),icon:`calendar_today`,...Y.attente}:{label:t(`reunions.quick.present`),value:P.format(n.present),sub:t(`reunions.attendance.summary`,{present:n.present,absent:n.absent}),icon:`group`,...Y.succes},{label:t(`reunions.quick.rate`),value:e.status===`tenue`?`${n.rate} %`:`—`,sub:t(`reunions.attendance.sectionTitle`),icon:`trending_up`,...Y.info},{label:t(`reunions.minutes.title`),value:e.minutes?this.minutesStatusLabel(e):`—`,sub:e.minutes?.validatedAt?N(e.minutes.validatedAt):e.minutes?t(H[e.status]):this.minutesStatusLabel(e),icon:`description`,...this.minutesTone(e)}]}),c(()=>{let e=this.meeting();e&&(this.minutesDraft=e.minutes?.text??``)})}historyReversed(e){return[...e.history].reverse()}historyLabel(e){let t=this.HISTORY_LABEL[e];return t?this.t()(t):e}modeKey(e){return e.mode===`en ligne`?`reunions.form.mode.online`:e.mode===`mixte`?`reunions.form.mode.mixed`:`reunions.form.mode.onsite`}scoopName(e){return this.store.state().scoops.find(t=>t.id===e)?.name??``}minutesStatusLabel(e){let t=this.t();return e.minutes?t(e.minutes.status===`validé`?`reunions.minutes.status.validé`:`reunions.minutes.status.brouillon`):t(`reunions.minutes.status.none`)}canEditMeeting(e){return B(e)}openEditDialog(){this.editOpen.set(!0)}onMeetingFormNotify(e){this.flash(e.kind,e.text)}minutesDirty(){let e=this.meeting();return this.minutesDraft.trim()!==(e?.minutes?.text??``).trim()}openHoldDialog(){this.holdOpen.set(!0),this.holdPresentIds.set([])}closeHoldDialog(){this.holdOpen.set(!1),this.holdPresentIds.set([])}toggleHold(e,t){let n=t.target.checked;this.holdPresentIds.update(t=>{let r=new Set(t);return n?r.add(e):r.delete(e),[...r]})}toggleHoldAll(){let e=this.scoopMembers();this.holdAllSelected()?this.holdPresentIds.set([]):this.holdPresentIds.set(e.map(e=>e.id))}submitHoldMeeting(){let e=this.meeting();if(!e)return;let t=this.holdPresentIds();try{let n=this.store.actions.holdMeeting(e.id,t);if(!n.ok){this.flash(`error`,this.locale.tNow(n.error));return}this.flash(`success`,this.t()(`reunions.attendance.done`)),this.closeHoldDialog()}catch(e){this.flash(`error`,this.errMsg(e))}}openCancelDialog(){this.cancelOpen.set(!0),this.cancelReasonText=``}closeCancelDialog(){this.cancelOpen.set(!1),this.cancelReasonText=``}submitCancelMeeting(){let e=this.meeting();if(!e)return;let t=this.cancelReasonText.trim();try{let n=this.store.actions.cancelMeeting(e.id,t);if(!n.ok){this.flash(`error`,this.locale.tNow(n.error));return}this.flash(`success`,this.t()(`reunions.cancel.done`)),this.closeCancelDialog()}catch(e){this.flash(`error`,this.errMsg(e))}}saveMinutesDraft(){let e=this.meeting();if(e&&(this.minutesTried.set(!0),this.minutesDraft.trim()))try{let t=this.store.actions.saveMinutes(e.id,this.minutesDraft);if(!t.ok){this.flash(`error`,this.locale.tNow(t.error));return}this.flash(`success`,this.t()(`reunions.minutes.saved`))}catch(e){this.flash(`error`,this.errMsg(e))}}openValidateConfirm(){this.minutesTried.set(!0),this.minutesDraft.trim()&&this.validateConfirmOpen.set(!0)}closeValidateConfirm(){this.validateConfirmOpen.set(!1)}confirmValidateMinutes(){let e=this.meeting();if(e)try{if(this.minutesDirty()){let t=this.store.actions.saveMinutes(e.id,this.minutesDraft);if(!t.ok){this.flash(`error`,this.locale.tNow(t.error));return}}let t=this.store.actions.validateMinutes(e.id);if(!t.ok){this.flash(`error`,this.locale.tNow(t.error));return}this.closeValidateConfirm(),this.flash(`success`,this.t()(`reunions.minutes.validated`))}catch(e){this.flash(`error`,this.errMsg(e))}}flash(e,t){e===`success`?this.snackbar.success(t):this.snackbar.error(t)}isPast(e){return e<=new Date().toISOString()}minutesTone(e){return e.minutes?.status===`validé`?Y.succes:e.minutes?Y.attente:Y.neutre}errMsg(e){return e instanceof R?this.locale.tNow(e.key):e instanceof Error?e.message:String(e)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=d({type:e,selectors:[[`app-reunion-detail-page`]],decls:3,vars:2,consts:[[`perm`,`meeting.read`,3,`area`],[1,`card`,`mx-auto`,`mt-16`,`flex`,`max-w-lg`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[`icon`,`event`,3,`crumb`,`title`,`eyebrow`,`badges`,`meta`,`backLabel`],[`hero-actions`,``,1,`flex`,`flex-wrap`,`gap-2`],[1,`notice`,`mt-4`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[1,`rise`,`mt-6`,3,`stats`],[1,`grid-main`,`mt-6`],[1,`grid`,`gap-4`],[1,`sec-card`],[1,`sec-head`],[1,`sec-ico`],[`name`,`fact_check`,3,`size`],[1,`n`],[1,`agenda`],[1,`sub`,2,`font-weight`,`500`],[`name`,`group`,3,`size`],[1,`sub`,2,`font-weight`,`600`],[1,`mt-4`,`flex`,`flex-wrap`,`gap-2`],[1,`sub`,`mt-3`,2,`font-weight`,`500`],[3,`meeting`],[`name`,`event_note`,3,`size`],[1,`timeline`],[3,`openChange`,`notify`,`open`,`meeting`],[`icon`,`task_alt`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`sub`,`mb-4`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`for`,`cancel-reason`,1,`lbl`],[`id`,`cancel-reason`,1,`area`,`mb-5`,`mt-2`,3,`input`,`placeholder`,`value`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`,`disabled`],[1,`notice`,`mb-5`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`44px`],[`type`,`button`,1,`btn`,`btn-citron`,2,`height`,`44px`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`44px`,`color`,`var(--v2-erreur-fg)`,3,`click`],[`name`,`close`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`44px`,3,`click`],[`name`,`edit`,3,`size`],[`type`,`button`,1,`btn`,`btn-citron`,2,`height`,`44px`,3,`click`],[`name`,`task_alt`,3,`size`],[`name`,`warning`,3,`size`],[1,`num`],[1,`min-w-0`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`btn`,`btn-primary`,`mt-3`,`inline-flex`,3,`href`],[`name`,`public`,3,`size`],[1,`sub`,`mt-2`,`break-all`],[1,`rounded-full`,`px-3`,`py-1.5`,`text-[13px]`,`font-bold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`description`,3,`size`],[1,`badge`],[1,`border-t`,`p-5`,2,`border-color`,`var(--v2-separateur)`],[1,`sub`],[`for`,`minutes`,1,`lbl`],[1,`sub`,`mt-1`],[`id`,`minutes`,1,`area`,`big`,`mt-2`,3,`input`,`value`],[1,`mt-1.5`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[1,`sub`,`mt-2`],[1,`notice`,`mt-3`],[1,`mt-4`,`flex`,`flex-wrap`,`justify-end`,`gap-2`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[`name`,`info`,3,`size`],[1,`minutes`],[1,`notice`,`mt-3`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-vert-pousse)`],[1,`text-[15px]`,`font-extrabold`],[`aria-hidden`,`true`,1,`meter`,`mt-2`],[1,`sub`,`mt-1.5`],[1,`lbl`,`mt-4`],[1,`people`,`mt-2`],[1,`person-chip`],[1,`i`],[`aria-hidden`,`true`,1,`dot`],[1,`block`,`font-bold`],[1,`sub`,`block`],[1,`mb-3`,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-2`],[`aria-live`,`polite`,1,`text-[14px]`,`font-extrabold`,`tabular-nums`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`40px`,3,`click`],[1,`checklist`,`mb-4`],[`type`,`checkbox`,3,`change`,`checked`],[1,`avatar`,2,`height`,`32px`,`width`,`32px`,`font-size`,`11px`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`event`,3,`size`],[1,`text-[22px]`,`font-extrabold`],[`routerLink`,`/dashboard/reunions`,1,`btn`,`btn-ghost`,`mt-2`]],template:function(e,t){if(e&1&&(a(0,`app-shell`,0),A(1,ot,70,59)(2,st,9,4,`div`,1),r()),e&2){let e;p(`area`,t.t()(`reunions.detail.area`)),v(),h((e=t.meeting())?1:2,e)}},dependencies:[W,De,ce,K,U,J,oe,le],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.grid-main[_ngcontent-%COMP%] {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main[_ngcontent-%COMP%] {
          grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr);
          align-items: start;
        }
      }
      .agenda[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 20px;
        font-size: 15px;
        font-weight: 700;
      }
      .num[_ngcontent-%COMP%] {
        display: grid;
        height: 30px;
        width: 30px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 999px;
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-citron);
        font-size: 12px;
        font-weight: 800;
      }
      .minutes[_ngcontent-%COMP%] {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        border-radius: 18px;
        background: var(--%NS%v2-creme);
        padding: 16px 18px;
        font-size: 15px;
        line-height: 1.6;
      }
      .area.big[_ngcontent-%COMP%] {
        min-height: 260px;
        line-height: 1.6;
      }
      .meter[_ngcontent-%COMP%] {
        display: block;
        height: 8px;
        overflow: hidden;
        border-radius: 999px;
        background: var(--%NS%v2-lin);
      }
      .meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: var(--%NS%v2-vert-pousse);
      }
      .people[_ngcontent-%COMP%] {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .person-chip[_ngcontent-%COMP%] {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        border-radius: 999px;
        background: var(--%NS%v2-sauge);
        padding: 3px 10px 3px 3px;
        font-size: 13px;
        font-weight: 700;
      }
      .person-chip[_ngcontent-%COMP%]   .i[_ngcontent-%COMP%] {
        display: grid;
        height: 24px;
        width: 24px;
        place-items: center;
        border-radius: 999px;
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-citron);
        font-size: 10px;
        font-weight: 800;
      }
      .timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
        display: flex;
        gap: 14px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 20px;
      }
      .dot[_ngcontent-%COMP%] {
        margin-top: 5px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--%NS%v2-foret);
        box-shadow: 0 0 0 4px var(--%NS%v2-sauge);
      }
      .checklist[_ngcontent-%COMP%] {
        max-height: 46vh;
        overflow-y: auto;
        border-radius: 18px;
        border: 1px solid var(--%NS%v2-bord-carte);
      }
      .checklist[_ngcontent-%COMP%]   label[_ngcontent-%COMP%] {
        display: flex;
        min-height: 52px;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 8px 14px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .checklist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child   label[_ngcontent-%COMP%] {
        border-top: none;
      }
      .checklist[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]:hover {
        background: var(--%NS%v2-creme);
      }
      .checklist[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        height: 20px;
        width: 20px;
        accent-color: var(--%NS%v2-foret);
      }`]})}};export{lt as default};