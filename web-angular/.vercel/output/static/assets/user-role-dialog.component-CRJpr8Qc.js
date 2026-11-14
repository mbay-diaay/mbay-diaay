import{Bt as e,F as t,Ft as n,Hn as r,It as i,Jn as a,Kt as o,L as s,Ln as c,Lt as l,Nt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,fn as g,ft as _,gt as ee,j as v,k as y,ln as b,mn as x,mt as S,pn as C,vt as w,zn as T}from"./_router-chunk-H0-n0SZI.js";import{O as E,T as D,l as O,o as k,t as A}from"./ui-CQhTckzj.js";import{l as j,n as M}from"./snackbar.component-ICe8-MWg.js";import{ft as N,h as P,lt as F,ot as I,t as L}from"./locale.service-Bf8_ncMo.js";import{n as R}from"./client-DTyi8Au-.js";import{t as z}from"./store.service-ZF4OfoGo.js";function B(e={}){return R(O(`/users`,e))}function V(e){return R(`/users`,{method:`POST`,body:e})}function H(e){return R(`/users/${e}/toggle-active`,{method:`POST`,body:{}})}function U(e,t){return R(`/users/${e}`,{method:`PATCH`,body:t})}function W(e,t){return R(`/users/${e}/delete`,{method:`POST`,body:{confirmEmail:t}})}var G=e=>({name:e}),K=e=>({count:e}),q=e=>({email:e});function J(t,r){if(t&1){let t=l();i(0,`ui-modal`,6),e(`closed`,function(){m(t);let e=f(2);return a(e.toggleOpen.set(!1))}),i(1,`button`,7),e(`click`,function(){m(t);let e=f(2);return a(e.toggleOpen.set(!1))}),g(2),n(),i(3,`button`,8),e(`click`,function(){m(t);let e=f(2);return a(e.confirmToggle())}),g(4),n()()}if(t&2){let e=f(2);p(`open`,!0)(`tone`,e.user().active?`danger`:`default`)(`title`,e.user().active?e.t()(`utilisateurs.v2.deactivateTitle`,o(14,G,e.user().name)):e.t()(`utilisateurs.v2.reactivateTitle`,o(16,G,e.user().name)))(`description`,e.user().active?e.t()(`utilisateurs.v2.deactivateText`):e.t()(`utilisateurs.v2.reactivateText`))(`icon`,e.user().active?`block`:`how_to_reg`)(`width`,540)(`closeLabel`,e.t()(`common.close`)),_(2),C(e.t()(`common.cancel`)),_(),ee(`btn-danger`,e.user().active)(`btn-primary`,!e.user().active),p(`disabled`,e.busy()),_(),x(` `,e.user().active?e.t()(`utilisateurs.action.deactivate`):e.t()(`utilisateurs.action.reactivate`),` `)}}function Y(e,t){if(e&1&&(i(0,`p`,15),u(1,`ui-icon`,17),g(2),n()),e&2){let e=f(3);_(),p(`size`,18),_(),C(e.t()(`utilisateurs.delete.preferDeactivate`))}}function X(t,r){if(t&1){let t=l();i(0,`ui-modal`,9),e(`closed`,function(){m(t);let e=f(2);return a(e.deleteOpen.set(!1))}),i(1,`ul`,10)(2,`li`,11),u(3,`ui-icon`,12),g(4),n(),i(5,`li`,11),u(6,`ui-icon`,12),g(7),n(),i(8,`li`,11),u(9,`ui-icon`,13),g(10),n()(),i(11,`ui-text-field`,14),e(`valueChange`,function(e){m(t);let n=f(2);return a(n.confirmEmail.set(e))}),n(),w(12,Y,3,2,`p`,15),i(13,`button`,7),e(`click`,function(){m(t);let e=f(2);return a(e.deleteOpen.set(!1))}),g(14),n(),i(15,`button`,16),e(`click`,function(){m(t);let e=f(2);return a(e.confirmDelete())}),u(16,`ui-icon`,3),g(17),n()()}if(t&2){let e=f(2);p(`open`,!0)(`title`,e.t()(`utilisateurs.delete.title`,o(21,G,e.user().name)))(`description`,e.t()(`utilisateurs.delete.text`))(`width`,560)(`closeLabel`,e.t()(`common.close`)),_(3),p(`size`,18),_(),C(e.t()(`utilisateurs.delete.point.login`)),_(2),p(`size`,18),_(),C(e.t()(`utilisateurs.delete.point.devices`,o(23,K,e.deviceCount()))),_(2),p(`size`,18),_(),C(e.t()(`utilisateurs.delete.point.audit`)),_(),p(`label`,e.t()(`utilisateurs.delete.confirmLabel`))(`hint`,e.t()(`utilisateurs.delete.confirmHint`,o(25,q,e.user().email)))(`placeholder`,e.user().email)(`value`,e.confirmEmail())(`error`,e.deleteTried()&&!e.emailMatches()?e.t()(`errors.users.confirmEmail`):``),_(),h(e.user().active?12:-1),_(2),C(e.t()(`common.cancel`)),_(),p(`disabled`,e.busy()),_(),p(`size`,18),_(),C(e.t()(`utilisateurs.delete.confirm`))}}function Z(t,r){if(t&1){let t=l();i(0,`button`,0),e(`click`,function(e){m(t);let n=f();return e.stopPropagation(),a(n.toggleOpen.set(!0))}),u(1,`ui-icon`,1),n(),i(2,`button`,2),e(`click`,function(e){m(t);let n=f();return e.stopPropagation(),a(n.openDelete())}),u(3,`ui-icon`,3),n(),w(4,J,5,18,`ui-modal`,4),w(5,X,18,27,`ui-modal`,5)}if(t&2){let e=f();b(`color`,e.user().active?`var(--v2-erreur-fg)`:`var(--v2-foret)`),p(`title`,e.user().active?e.t()(`utilisateurs.action.deactivate`):e.t()(`utilisateurs.action.reactivate`)),S(`aria-label`,(e.user().active?e.t()(`utilisateurs.action.deactivate`):e.t()(`utilisateurs.action.reactivate`))+` · `+e.user().name),_(),p(`name`,e.user().active?`block`:`how_to_reg`)(`size`,18),_(),p(`title`,e.t()(`utilisateurs.action.delete`)),S(`aria-label`,e.t()(`utilisateurs.action.delete`)+` · `+e.user().name),_(),p(`size`,18),_(),h(e.toggleOpen()?4:-1),_(),h(e.deleteOpen()?5:-1)}}var Q=class e{constructor(){this.user=y.required(),this.store=T(z),this.snackbar=T(M),this.locale=T(L),this.t=this.locale.t,this.toggleOpen=r(!1),this.deleteOpen=r(!1),this.confirmEmail=r(``),this.deleteTried=r(!1),this.busy=r(!1),this.allowed=t(()=>{let e=this.user(),t=this.store.state().session?.email.toLowerCase();return this.store.can(`user.manage`)&&e.email.toLowerCase()!==t&&(!F.includes(e.role)||this.store.can(`role.configure`))}),this.deviceCount=t(()=>this.store.state().devices.filter(e=>e.userId===this.user().id).length),this.emailMatches=t(()=>this.confirmEmail().trim().toLowerCase()===this.user().email.toLowerCase())}openDelete(){this.confirmEmail.set(``),this.deleteTried.set(!1),this.deleteOpen.set(!0)}async confirmToggle(){let e=this.user();this.busy.set(!0);try{P()&&await H(e.id);let t=this.store.actions.toggleUser(e.id);if(!t.ok){this.snackbar.error(t.error);return}this.toggleOpen.set(!1),this.snackbar.success(this.locale.tNow(t.active?`utilisateurs.toast.reactivated`:`utilisateurs.toast.deactivated`))}catch{this.snackbar.error(this.locale.tNow(`errors.users.api`))}finally{this.busy.set(!1)}}async confirmDelete(){if(this.deleteTried.set(!0),!this.emailMatches())return;let e=this.user(),t=this.confirmEmail().trim();this.busy.set(!0);try{P()&&await W(e.id,t);let n=this.store.actions.deleteUser(e.id,t);if(!n.ok){this.snackbar.error(n.error);return}this.deleteOpen.set(!1),this.snackbar.success(this.locale.tNow(`utilisateurs.toast.deleted`,{name:e.name}))}catch{this.snackbar.error(this.locale.tNow(`errors.users.api`))}finally{this.busy.set(!1)}}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=d({type:e,selectors:[[`app-account-actions`]],hostAttrs:[1,`contents`],inputs:{user:[1,`user`]},decls:1,vars:1,consts:[[`type`,`button`,1,`act`,3,`click`,`title`],[3,`name`,`size`],[`type`,`button`,1,`act`,`act-danger`,3,`click`,`title`],[`name`,`delete_forever`,3,`size`],[3,`open`,`tone`,`title`,`description`,`icon`,`width`,`closeLabel`],[`tone`,`danger`,`icon`,`delete_forever`,3,`open`,`title`,`description`,`width`,`closeLabel`],[3,`closed`,`open`,`tone`,`title`,`description`,`icon`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,3,`click`,`disabled`],[`tone`,`danger`,`icon`,`delete_forever`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`mb-4`,`space-y-1.5`,`text-[14px]`,`font-medium`],[1,`flex`,`items-start`,`gap-2`],[`name`,`close`,2,`color`,`var(--v2-erreur-fg)`,3,`size`],[`name`,`history`,2,`color`,`var(--v2-foret)`,3,`size`],[`preset`,`email`,3,`valueChange`,`label`,`hint`,`placeholder`,`value`,`error`],[1,`notice`,`mt-4`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`,`disabled`],[`name`,`info`,3,`size`]],template:function(e,t){e&1&&w(0,Z,6,11),e&2&&h(t.allowed()?0:-1)},dependencies:[j,D,A],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`]})}},te=e=>({name:e});function ne(t,r){if(t&1){let t=l();i(0,`ui-check-list`,11),e(`valueChange`,function(e){m(t);let n=f(3);return a(n.scoopIds.set(e))}),n()}if(t&2){let e=f(3);p(`label`,e.t()(`roles.dialog.scoops`))(`options`,e.scoopOptions())(`value`,e.scoopIds())(`error`,e.showErrors()&&!e.scoopIds().length?e.t()(`errors.roles.scoopRequired`):``)}}function re(e,t){if(e&1&&(i(0,`p`,13),u(1,`ui-icon`,14),g(2),n()),e&2){let e=f(4);_(),p(`size`,16),_(),x(``,e.t()(`errors.roles.scoopRequired`),` `)}}function ie(t,r){if(t&1){let t=l();i(0,`ui-select`,12),e(`valueChange`,function(e){m(t);let n=f(3);return a(n.scoopIds.set([e]))}),n(),w(1,re,3,2,`p`,13)}if(t&2){let e=f(3);p(`label`,e.t()(`roles.dialog.scoop`))(`options`,e.scoopOptions())(`value`,e.scoopIds()[0]??``)(`placeholder`,e.t()(`roles.dialog.scoopPh`)),_(),h(e.showErrors()&&!e.scoopIds().length?1:-1)}}function $(e,t){if(e&1&&w(0,ne,1,4,`ui-check-list`,10)(1,ie,2,5),e&2){let e=f(2);h(+!e.manyScoops())}}function ae(e,t){if(e&1&&(i(0,`p`,4),u(1,`ui-icon`,15),g(2),n()),e&2){let e=f(2);_(),p(`size`,18),_(),x(``,e.t()(`roles.dialog.consolidated`),` `)}}function oe(e,t){if(e&1&&(i(0,`p`,5),u(1,`ui-icon`,14),g(2),n()),e&2){let e=f(2);_(),p(`size`,18),_(),x(``,e.t()(`roles.dialog.superWarning`),` `)}}function se(t,r){if(t&1){let t=l();i(0,`ui-modal`,1),e(`closed`,function(){m(t);let e=f();return a(e.open.set(!1))}),i(1,`div`,2)(2,`ui-select`,3),e(`valueChange`,function(e){m(t);let n=f();return a(n.pickRole(e))}),n(),w(3,$,2,1)(4,ae,3,2,`p`,4),w(5,oe,3,2,`p`,5),n(),i(6,`button`,6),e(`click`,function(){m(t);let e=f();return a(e.open.set(!1))}),g(7),n(),i(8,`button`,7),e(`click`,function(){let e=m(t),n=f();return a(n.submit(e))}),g(9),i(10,`span`,8),u(11,`ui-icon`,9),n()()()}if(t&2){let e=f();p(`open`,e.open())(`title`,e.t()(`roles.dialog.title`,o(15,te,r.name)))(`description`,e.t()(`roles.dialog.description`))(`width`,620)(`closeLabel`,e.t()(`common.close`)),_(2),p(`label`,e.t()(`roles.dialog.role`))(`options`,e.roleOptions())(`value`,e.role())(`placeholder`,e.t()(`roles.dialog.rolePh`)),_(),h(e.scoped()?3:4),_(2),h(e.role()===e.lockedRole?5:-1),_(2),C(e.t()(`common.cancel`)),_(),p(`disabled`,e.busy()),_(),x(` `,e.t()(`roles.dialog.submit`)),_(2),p(`size`,18)}}var ce=class e{constructor(){this.open=v(!1),this.user=y(null),this.store=T(z),this.snackbar=T(M),this.locale=T(L),this.t=this.locale.t,this.lockedRole=I,this.role=r(``),this.scoopIds=r([]),this.showErrors=r(!1),this.busy=r(!1),this.roleOptions=t(()=>this.store.assignableRoleIds(this.scoopIds()).map(e=>({value:e,label:this.store.roleLabel(e),icon:e===`superadmin`?`lock`:this.store.roleScoped(e)?`apartment`:`public`}))),this.scoopOptions=t(()=>this.store.state().scoops.filter(e=>!e.archived).map(e=>({value:e.id,label:e.name}))),this.manyScoops=t(()=>{let e=this.role();return e!==``&&N(e)}),this.scoped=t(()=>{let e=this.role();return e!==``&&this.store.roleScoped(e)}),c(()=>{let e=this.open(),t=this.user();s(()=>{e&&t&&(this.role.set(t.role),this.scoopIds.set(t.scoopIds??(t.scoopId?[t.scoopId]:[])),this.showErrors.set(!1))})})}pickRole(e){let t=e;this.role.set(t),N(t)||this.scoopIds.update(e=>e.slice(0,1)),this.store.roleScoped(t)||this.scoopIds.set([])}async submit(e){let t=this.role();if(!t)return;if(this.scoped()&&!this.scoopIds().length){this.showErrors.set(!0);return}let n=this.scoped()?this.scoopIds():[];if(P()){this.busy.set(!0);try{await U(e.id,{role:t,scoopId:n[0]??null})}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`));return}finally{this.busy.set(!1)}}let r=this.store.actions.setUserRole(e.id,t,n);r.ok?(this.snackbar.success(this.locale.tNow(`roles.dialog.saved`,{name:e.name,role:this.store.roleLabel(t)})),this.open.set(!1)):this.snackbar.error(r.error)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=d({type:e,selectors:[[`app-user-role-dialog`]],inputs:{open:[1,`open`],user:[1,`user`]},outputs:{open:`openChange`},decls:1,vars:1,consts:[[`icon`,`admin_panel_settings`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`admin_panel_settings`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`space-y-5`],[`leadingIcon`,`admin_panel_settings`,3,`valueChange`,`label`,`options`,`value`,`placeholder`],[1,`flex`,`items-start`,`gap-2`,`rounded-[14px]`,`p-3`,`text-[14px]`,`font-medium`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`flex`,`items-start`,`gap-2`,`rounded-[14px]`,`p-3`,`text-[14px]`,`font-medium`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`],[3,`label`,`options`,`value`,`error`],[3,`valueChange`,`label`,`options`,`value`,`error`],[`leadingIcon`,`apartment`,3,`valueChange`,`label`,`options`,`value`,`placeholder`],[`role`,`alert`,1,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[`name`,`warning`,3,`size`],[`name`,`public`,3,`size`]],template:function(e,t){if(e&1&&w(0,se,12,17,`ui-modal`,0),e&2){let e;h((e=t.user())?0:-1,e)}},dependencies:[E,j,D,k],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`]})}};export{B as i,Q as n,V as r,ce as t};