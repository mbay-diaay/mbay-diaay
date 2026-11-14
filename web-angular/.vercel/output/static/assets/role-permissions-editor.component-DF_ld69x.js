import{$t as e,Bt as t,F as n,Ft as r,Gt as i,Hn as a,It as o,Jn as s,Kt as c,L as l,Ln as u,Lt as d,M as f,Nt as p,St as m,Vt as h,Wt as g,Yn as _,_t as v,en as y,fn as b,ft as x,gt as S,hn as C,j as w,k as T,ln as ee,mn as E,mt as D,pn as O,qt as te,tn as k,vt as A,zn as j}from"./_router-chunk-H0-n0SZI.js";import{T as M,o as N,t as P}from"./ui-CQhTckzj.js";import{l as F}from"./snackbar.component-ICe8-MWg.js";import{at as I,ct as L,dt as R,it as z,ot as B,st as V,t as H}from"./locale.service-Bf8_ncMo.js";import{t as U}from"./store.service-ZF4OfoGo.js";import{t as W}from"./role-access-preview.component-D5f0INIR.js";var G=e=>({name:e});function K(e,t){if(e&1&&(o(0,`p`,20),p(1,`ui-icon`,21),b(2),r()),e&2){let e=h(2);x(),g(`size`,16),x(),O(e.t()(`superadmin.roles.form.scopeLocked`))}}function q(e,n){if(e&1){let e=d();o(0,`fieldset`)(1,`legend`,12),b(2),r(),o(3,`div`,13)(4,`button`,14),t(`click`,function(){_(e);let t=h();return s(t.scoped.set(!0))}),o(5,`span`,15),p(6,`ui-icon`,16),r(),o(7,`span`)(8,`span`,17),b(9),r(),o(10,`span`,18),b(11),r()()(),o(12,`button`,14),t(`click`,function(){_(e);let t=h();return s(t.scoped.set(!1))}),o(13,`span`,15),p(14,`ui-icon`,19),r(),o(15,`span`)(16,`span`,17),b(17),r(),o(18,`span`,18),b(19),r()()()(),A(20,K,3,2,`p`,20),r()}if(e&2){let e=h();x(2),O(e.t()(`superadmin.roles.form.scope`)),x(2),S(`on`,e.scoped()),g(`disabled`,e.scopeLocked()),D(`aria-checked`,e.scoped()),x(2),g(`size`,18),x(3),O(e.t()(`superadmin.roles.form.scopeScoop`)),x(2),O(e.t()(`superadmin.roles.form.scopeScoopHint`)),x(),S(`on`,!e.scoped()),g(`disabled`,e.scopeLocked()),D(`aria-checked`,!e.scoped()),x(2),g(`size`,18),x(3),O(e.t()(`superadmin.roles.form.scopeAll`)),x(2),O(e.t()(`superadmin.roles.form.scopeAllHint`)),x(),v(e.scopeLocked()?20:-1)}}function J(e,n){if(e&1){let e=d();o(0,`ui-select`,22),t(`valueChange`,function(t){_(e);let n=h();return s(n.copyFrom.set(t))}),r()}if(e&2){let e=h();g(`label`,e.t()(`superadmin.roles.form.copyFrom`))(`options`,e.copyOptions())(`value`,e.copyFrom())}}var Y=``,X=class e{constructor(){this.open=w(!1),this.role=T(null),this.busy=T(!1),this.lockScope=T(!1),this.ceiling=T(null),this.copySources=T(null),this.submitted=f(),this.store=j(U),this.t=j(H).t,this.name=a(``),this.description=a(``),this.scoped=a(!0),this.copyFrom=a(Y),this.tried=a(!1),this.scopeLocked=n(()=>{let e=this.role();return!!e&&this.store.state().users.some(t=>t.role===e.id)}),this.copyOptions=n(()=>[{value:Y,label:this.t()(`superadmin.roles.form.copyNone`)},...this.store.allRoles().filter(e=>e!==B).filter(e=>!this.copySources()||this.copySources().includes(e)).map(e=>({value:e,label:this.store.roleLabel(e),hint:String((this.store.state().rolePermissions[e]??[]).length)}))]),this.previewPermissions=n(()=>{let e=this.role()?.id??(this.copyFrom()||null),t=e?this.store.state().rolePermissions[e]??[]:[],n=this.ceiling();return n?t.filter(e=>n.includes(e)):[...t]}),this.errors=n(()=>{if(!this.tried())return{};let e=this.name().trim();return e.length<3||e.length>60?{name:this.t()(`errors.roles.name`)}:{}}),u(()=>{let e=this.open(),t=this.role();l(()=>{e&&(this.name.set(t?.name??``),this.description.set(t?.description??``),this.scoped.set(t?.scoped??!0),this.copyFrom.set(Y),this.tried.set(!1))})})}submit(){this.tried.set(!0),Object.keys(this.errors()).length||this.submitted.emit({name:this.name().trim().replace(/\s+/g,` `),description:this.description().trim(),scoped:this.lockScope()?!0:this.scoped(),copyFrom:this.copyFrom()||null})}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=m({type:e,selectors:[[`app-role-form-dialog`]],inputs:{open:[1,`open`],role:[1,`role`],busy:[1,`busy`],lockScope:[1,`lockScope`],ceiling:[1,`ceiling`],copySources:[1,`copySources`]},outputs:{open:`openChange`,submitted:`submitted`},decls:18,vars:27,consts:[[`icon`,`admin_panel_settings`,`tone`,`brand`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`space-y-5`],[`icon`,`admin_panel_settings`,3,`valueChange`,`label`,`placeholder`,`maxlength`,`value`,`error`],[`for`,`role-description`,1,`lbl`],[2,`text-transform`,`none`,`font-weight`,`600`],[`id`,`role-description`,`maxlength`,`240`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[`leadingIcon`,`file_export`,3,`label`,`options`,`value`],[3,`bare`,`permissions`,`scoped`,`hint`,`emptyText`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`],[1,`lbl`],[`role`,`radiogroup`,1,`scopes`,`mt-2`],[`type`,`button`,`role`,`radio`,1,`scope`,3,`click`,`disabled`],[1,`scope-ico`],[`name`,`apartment`,3,`size`],[1,`block`,`text-[15px]`,`font-extrabold`],[1,`block`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`name`,`public`,3,`size`],[1,`mt-2`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-semibold`,2,`color`,`var(--v2-gris-texte)`],[`name`,`lock`,3,`size`],[`leadingIcon`,`file_export`,3,`valueChange`,`label`,`options`,`value`]],template:function(e,n){e&1&&(o(0,`ui-modal`,0),t(`closed`,function(){return n.open.set(!1)}),o(1,`div`,1)(2,`ui-text-field`,2),t(`valueChange`,function(e){return n.name.set(e)}),r(),o(3,`div`)(4,`label`,3),b(5),o(6,`span`,4),b(7),r()(),o(8,`textarea`,5),t(`input`,function(e){return n.description.set(e.target.value)}),r()(),A(9,q,21,16,`fieldset`),A(10,J,1,3,`ui-select`,6),p(11,`app-role-access-preview`,7),r(),o(12,`button`,8),t(`click`,function(){return n.open.set(!1)}),b(13),r(),o(14,`button`,9),t(`click`,function(){return n.submit()}),b(15),o(16,`span`,10),p(17,`ui-icon`,11),r()()()),e&2&&(g(`open`,n.open())(`title`,n.role()?n.t()(`superadmin.roles.form.editTitle`,c(25,G,n.role().name)):n.t()(`superadmin.roles.form.createTitle`))(`description`,n.role()?n.t()(`superadmin.roles.form.editDescription`):n.t()(`superadmin.roles.form.createDescription`))(`width`,660)(`closeLabel`,n.t()(`common.close`)),x(2),g(`label`,n.t()(`superadmin.roles.form.name`))(`placeholder`,n.t()(`superadmin.roles.form.namePh`))(`maxlength`,60)(`value`,n.name())(`error`,n.errors().name??``),x(3),E(``,n.t()(`superadmin.roles.form.description`),` `),x(2),E(`(`,n.t()(`superadmin.roles.form.optional`),`)`),x(),g(`placeholder`,n.t()(`superadmin.roles.form.descriptionPh`))(`value`,n.description()),x(),v(n.lockScope()?-1:9),x(),v(n.role()?-1:10),x(),g(`bare`,!0)(`permissions`,n.previewPermissions())(`scoped`,n.lockScope()?!0:n.scoped())(`hint`,n.role()?n.t()(`roles.access.hintEdit`):n.t()(`roles.access.hintCreate`))(`emptyText`,n.role()?n.t()(`roles.access.none`):n.t()(`roles.access.noneCreate`)),x(2),O(n.t()(`common.cancel`)),x(),g(`disabled`,n.busy()),x(),E(` `,n.role()?n.t()(`superadmin.roles.form.save`):n.t()(`superadmin.roles.form.create`)),x(2),g(`size`,18))},dependencies:[F,M,W,N,P],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.scopes[_ngcontent-%COMP%] {
      display: grid;
      gap: 10px;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    }
    .scope[_ngcontent-%COMP%] {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      border-radius: 18px;
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      padding: 14px 16px;
      text-align: left;
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .scope[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-foret);
    }
    .scope.on[_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-foret);
      background: var(--%NS%v2-sauge);
    }
    .scope[_ngcontent-%COMP%]:disabled {
      cursor: not-allowed;
      opacity: 0.55;
    }
    .scope[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .scope-ico[_ngcontent-%COMP%] {
      display: grid;
      height: 36px;
      width: 36px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-foret);
    }
    .scope.on[_ngcontent-%COMP%]   .scope-ico[_ngcontent-%COMP%] {
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
      min-height: 88px;
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
      border-color: var(--%NS%v2-foret);
      box-shadow: 0 0 0 3px color-mix(in oklab, var(--%NS%v2-foret) 18%, transparent);
    }`]})}},Z=(e,t)=>({count:e,total:t}),Q=e=>({count:e}),ne=()=>[],$=(e,t)=>t.key;function re(e,t){if(e&1&&(o(0,`span`,25),b(1),r()),e&2){let e=h(3);x(),O(e.t()(`roles.custom`))}}function ie(e,n){if(e&1){let e=d();o(0,`button`,19),t(`click`,function(){let t=_(e).$implicit,n=h(2);return s(n.selectedRole.set(t))}),o(1,`span`,20),p(2,`ui-icon`,21),r(),o(3,`span`,22)(4,`span`,23),b(5),r(),o(6,`span`,24),b(7),r()(),A(8,re,2,1,`span`,25),r()}if(e&2){let e=n.$implicit,t=h(2);S(`on`,e===t.selectedRole()),D(`aria-current`,e===t.selectedRole()?`true`:null),x(2),g(`name`,e===t.lockedRole?`lock`:t.store.roleScoped(e)?`apartment`:`public`)(`size`,20),x(3),O(t.store.roleLabel(e)),x(2),C(``,t.t()(`roles.count`,c(10,Q,(t.matrix()[e]??i(9,ne)).length)),` · `,t.t()(`roles.accounts`,c(12,Q,t.accountsOf(e)))),x(),v(t.isModified(e)?8:-1)}}function ae(e,t){if(e&1&&(o(0,`p`,18),b(1),r()),e&2){let e=h(2);x(),O(e.t()(`roles.noCustom`))}}function oe(t,n){if(t&1&&(o(0,`p`,16),b(1),r(),y(2,ie,9,14,`button`,17,k,!1,ae,2,1,`p`,18)),t&2){let t=n.$implicit,r=h();x(),O(r.t()(t.title)),x(),e(t.roles)}}function se(e,t){e&1&&(o(0,`p`,8),b(1),r()),e&2&&(x(),O(t))}function ce(e,n){if(e&1){let e=d();o(0,`button`,26),t(`click`,function(){_(e);let t=h();return s(t.reset.emit(t.selectedRole()))}),p(1,`ui-icon`,27),b(2),r()}if(e&2){let e=h();x(),g(`size`,18),x(),E(``,e.t()(`roles.resetDefault`),` `)}}function le(e,n){if(e&1){let e=d();o(0,`button`,26),t(`click`,function(){_(e);let t=h();return s(t.edit.emit(t.selectedRole()))}),p(1,`ui-icon`,28),b(2),r(),o(3,`button`,29),t(`click`,function(){_(e);let t=h();return s(t.remove.emit(t.selectedRole()))}),p(4,`ui-icon`,30),b(5),r()}if(e&2){let e=h();x(),g(`size`,18),x(),O(e.t()(`roles.edit`)),x(2),g(`size`,18),x(),O(e.t()(`roles.delete`))}}function ue(e,t){if(e&1&&(o(0,`p`,12),p(1,`ui-icon`,31),b(2),r()),e&2){let e=h();x(),g(`size`,18),x(),O(e.t()(`roles.lockedNotice`))}}function de(e,t){if(e&1&&(o(0,`p`,12),p(1,`ui-icon`,32),b(2),r()),e&2){let e=h();x(),g(`size`,18),x(),O(e.t()(`roles.readOnlyNotice`))}}function fe(e,n){if(e&1){let e=d();o(0,`button`,40),t(`click`,function(){_(e);let t=h().$implicit,n=h();return s(n.toggleGroup(t.permissions))}),b(1),r()}if(e&2){let e=h().$implicit,t=h();x(),E(` `,t.groupFull(e.permissions)?t.t()(`roles.group.none`):t.t()(`roles.group.all`),` `)}}function pe(e,n){if(e&1){let e=d();o(0,`label`,41)(1,`input`,42),t(`change`,function(t){let n=_(e).$implicit,r=h(2);return s(r.toggle(n,t.target.checked))}),r(),o(2,`span`,5)(3,`span`,43),b(4),r(),o(5,`span`,44),b(6),r()()()}if(e&2){let e=n.$implicit,t=h(2);S(`on`,t.has(e))(`locked`,!t.canToggle(e)),x(),g(`checked`,t.has(e))(`disabled`,!t.canToggle(e)),x(3),O(t.t()(t.permissionLabel(e))),x(2),O(e)}}function me(t,n){if(t&1&&(o(0,`section`,14)(1,`div`,33)(2,`h3`,34),b(3),r(),o(4,`span`,35)(5,`span`,36),b(6),r(),A(7,fe,2,1,`button`,37),r()(),o(8,`div`,38),y(9,pe,7,8,`label`,39,k),r()()),t&2){let t=n.$implicit,r=h();x(3),O(r.t()(r.groupLabel(t.key))),x(2),ee(`background`,r.groupCount(t.permissions)?`var(--v2-sauge)`:`var(--v2-lin)`)(`color`,r.groupCount(t.permissions)?`var(--v2-vert-pousse)`:`var(--v2-gris-texte)`),x(),C(` `,r.groupCount(t.permissions),` / `,t.permissions.length,` `),x(),v(r.canEdit()?7:-1),x(2),e(t.permissions)}}function he(e,n){if(e&1){let e=d();o(0,`div`,15)(1,`span`,45),b(2),r(),o(3,`span`,10)(4,`button`,46),t(`click`,function(){_(e);let t=h();return s(t.discard())}),b(5),r(),o(6,`button`,47),t(`click`,function(){_(e);let t=h();return s(t.save.emit({role:t.selectedRole(),permissions:t.draft()}))}),b(7),o(8,`span`,48),p(9,`ui-icon`,49),r()()()()}if(e&2){let e=h();D(`aria-label`,e.t()(`roles.bar.aria`)),x(2),O(e.t()(`roles.bar.changes`,c(6,Q,e.changes()))),x(3),O(e.t()(`roles.bar.discard`)),x(),g(`disabled`,e.busy()),x(),E(` `,e.t()(`roles.bar.save`)),x(2),g(`size`,18)}}var ge=class t{constructor(){this.matrix=T.required(),this.editable=T(!1),this.busy=T(!1),this.onlyRoles=T(null),this.ceiling=T(null),this.selectedRole=w(`admin`),this.save=f(),this.reset=f(),this.edit=f(),this.remove=f(),this.store=j(U),this.locale=j(H),this.t=this.locale.t,this.lockedRole=B,this.isBuiltIn=R,this.draft=a([]),this.listedRoles=n(()=>this.onlyRoles()?.slice()??this.store.allRoles()),this.roleBlocks=n(()=>this.onlyRoles()?[{key:`coop`,title:`roles.block.coop`,roles:this.listedRoles()}]:[{key:`builtIn`,title:`roles.block.builtIn`,roles:z},{key:`custom`,title:`roles.block.custom`,roles:this.listedRoles().filter(e=>!R(e))}]),this.visibleGroups=n(()=>{let e=this.ceiling();return V.map(t=>({key:t.key,permissions:e?t.permissions.filter(t=>e.includes(t)):t.permissions})).filter(e=>e.permissions.length)}),this.totalPermissions=n(()=>this.visibleGroups().reduce((e,t)=>e+t.permissions.length,0)),this.selectedDescription=n(()=>this.store.state().customRoles.find(e=>e.id===this.selectedRole())?.description??``),this.isLocked=n(()=>this.selectedRole()===B),this.canEdit=n(()=>this.editable()&&!this.isLocked()),this.changes=n(()=>{let e=this.matrix()[this.selectedRole()]??[],t=this.draft();return t.filter(t=>!e.includes(t)).length+e.filter(e=>!t.includes(e)).length}),u(()=>{let e=this.matrix()[this.selectedRole()]??[];l(()=>this.draft.set([...e]))}),u(()=>{let e=this.listedRoles();l(()=>{e.includes(this.selectedRole())||this.selectedRole.set(e[0]??`admin`)})})}accountsOf(e){return this.store.state().users.filter(t=>t.role===e).length}isModified(e){if(!R(e))return!1;let t=this.matrix()[e]??[],n=I[e];return t.length!==n.length||t.some(e=>!n.includes(e))}has(e){return this.draft().includes(e)}canToggle(e){let t=this.ceiling();return this.canEdit()&&!L.includes(e)&&(!t||t.includes(e))}toggle(e,t){this.canToggle(e)&&this.draft.update(n=>t?[...new Set([...n,e])]:n.filter(t=>t!==e))}groupCount(e){return e.filter(e=>this.has(e)).length}groupFull(e){return e.filter(e=>!L.includes(e)).every(e=>this.has(e))}toggleGroup(e){let t=!this.groupFull(e);for(let n of e)this.toggle(n,t)}discard(){this.draft.set([...this.matrix()[this.selectedRole()]??[]])}groupLabel(e){return`permgroup.${e}`}permissionLabel(e){return`perm.${e}`}static{this.ɵfac=function(e){return new(e||t)}}static{this.ɵcmp=m({type:t,selectors:[[`app-role-permissions-editor`]],hostAttrs:[1,`block`],inputs:{matrix:[1,`matrix`],editable:[1,`editable`],busy:[1,`busy`],onlyRoles:[1,`onlyRoles`],ceiling:[1,`ceiling`],selectedRole:[1,`selectedRole`]},outputs:{selectedRole:`selectedRoleChange`,save:`save`,reset:`reset`,edit:`edit`,remove:`remove`},decls:24,vars:17,consts:[[1,`layout`],[1,`roles`,`card`,`p-2`],[1,`min-w-0`,`space-y-4`],[1,`card`,`p-5`],[1,`flex`,`flex-wrap`,`items-start`,`justify-between`,`gap-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-1`,`text-[22px]`,`font-extrabold`,`tracking-[-0.02em]`],[1,`mt-1`,`max-w-xl`,`text-[14px]`,`font-medium`],[1,`sub`,`mt-1`],[1,`flex`,`flex-wrap`,`gap-2`],[`type`,`button`,1,`btn`,`btn-ghost`],[1,`notice`,`mt-4`],[3,`permissions`,`scoped`],[1,`card`,`overflow-hidden`],[`role`,`region`,1,`bar`],[1,`mono`,`px-3`,`pb-1`,`pt-3`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`role-btn`,3,`on`],[1,`sub`,`px-3`,`pb-3`],[`type`,`button`,1,`role-btn`,3,`click`],[1,`role-ico`],[3,`name`,`size`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`text-[14px]`,`font-extrabold`],[1,`sub`,`block`],[1,`badge`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`history`,3,`size`],[`name`,`edit`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`color`,`var(--v2-erreur-fg)`,3,`click`],[`name`,`close`,3,`size`],[`name`,`lock`,3,`size`],[`name`,`info`,3,`size`],[1,`group-head`],[1,`text-[16px]`,`font-extrabold`],[1,`flex`,`items-center`,`gap-2`],[1,`badge`],[`type`,`button`,1,`bulk`],[1,`perm-grid`],[1,`perm`,3,`on`,`locked`],[`type`,`button`,1,`bulk`,3,`click`],[1,`perm`],[`type`,`checkbox`,3,`change`,`checked`,`disabled`],[1,`block`],[1,`code`],[1,`text-[14px]`,`font-bold`],[`type`,`button`,1,`btn`,`discard`,3,`click`],[`type`,`button`,1,`btn`,`btn-citron`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`]],template:function(t,n){if(t&1&&(o(0,`div`,0)(1,`nav`,1),y(2,oe,5,2,null,null,$),r(),o(4,`div`,2)(5,`section`,3)(6,`div`,4)(7,`div`,5)(8,`p`,6),b(9),r(),o(10,`h2`,7),b(11),r(),A(12,se,2,1,`p`,8),o(13,`p`,9),b(14),r()(),o(15,`span`,10),A(16,ce,3,2,`button`,11),A(17,le,6,4),r()(),A(18,ue,3,2,`p`,12)(19,de,3,2,`p`,12),r(),p(20,`app-role-access-preview`,13),y(21,me,11,8,`section`,14,$),A(23,he,10,8,`div`,15),r()()),t&2){let t;x(),D(`aria-label`,n.t()(`roles.list.aria`)),x(),e(n.roleBlocks()),x(7),O(n.store.roleScoped(n.selectedRole())?n.t()(`roles.scope.scoop`):n.t()(`roles.scope.all`)),x(2),O(n.store.roleLabel(n.selectedRole())),x(),v((t=n.selectedDescription())?12:-1,t),x(2),C(``,n.t()(`roles.selected`,te(12,Z,n.draft().length,n.totalPermissions())),` · `,n.t()(`roles.accounts`,c(15,Q,n.accountsOf(n.selectedRole())))),x(2),v(n.editable()&&!n.isLocked()&&n.isModified(n.selectedRole())?16:-1),x(),v(n.editable()&&!n.isBuiltIn(n.selectedRole())?17:-1),x(),v(n.isLocked()?18:n.editable()?-1:19),x(2),g(`permissions`,n.draft())(`scoped`,n.store.roleScoped(n.selectedRole())),x(),e(n.visibleGroups()),x(2),v(n.canEdit()&&n.changes()>0?23:-1)}},dependencies:[F,W],styles:[`.mono[_ngcontent-%COMP%] {
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
      @media (min-width: 1024px) {
        .layout[_ngcontent-%COMP%] {
          grid-template-columns: 300px minmax(0, 1fr);
          align-items: start;
        }
        .roles[_ngcontent-%COMP%] {
          position: sticky;
          top: 88px;
        }
      }
      .role-btn[_ngcontent-%COMP%] {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 12px;
        border-radius: 16px;
        padding: 12px 14px;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .role-btn[_ngcontent-%COMP%]:hover {
        background: var(--%NS%v2-creme);
      }
      .role-btn.on[_ngcontent-%COMP%] {
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-blanc);
      }
      .role-btn.on[_ngcontent-%COMP%]   .sub[_ngcontent-%COMP%] {
        color: color-mix(in oklab, var(--%NS%v2-blanc) 72%, transparent);
      }
      .role-btn[_ngcontent-%COMP%]:focus-visible {
        outline: 2px solid var(--%NS%v2-foret);
        outline-offset: 2px;
      }
      .role-ico[_ngcontent-%COMP%] {
        display: grid;
        height: 38px;
        width: 38px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 12px;
        background: var(--%NS%v2-sauge);
        color: var(--%NS%v2-foret);
      }
      .role-btn.on[_ngcontent-%COMP%]   .role-ico[_ngcontent-%COMP%] {
        background: var(--%NS%v2-citron);
      }
      .group-head[_ngcontent-%COMP%] {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        border-bottom: 1px solid var(--%NS%v2-separateur);
        padding: 14px 18px;
      }
      .perm-grid[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
      }
      .perm[_ngcontent-%COMP%] {
        display: flex;
        min-height: 52px;
        align-items: center;
        gap: 12px;
        border-bottom: 1px solid var(--%NS%v2-separateur);
        padding: 10px 18px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .perm[_ngcontent-%COMP%]:hover {
        background: var(--%NS%v2-creme);
      }
      .perm.on[_ngcontent-%COMP%] {
        background: color-mix(in oklab, var(--%NS%v2-sauge) 60%, transparent);
      }
      .perm.locked[_ngcontent-%COMP%] {
        cursor: not-allowed;
        opacity: 0.6;
      }
      .perm[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        height: 20px;
        width: 20px;
        flex-shrink: 0;
        accent-color: var(--%NS%v2-foret);
        cursor: inherit;
      }
      .perm[_ngcontent-%COMP%]   .code[_ngcontent-%COMP%] {
        display: block;
        font-family: var(--%NS%v2-font-mono);
        font-size: 11px;
        font-weight: 600;
        color: var(--%NS%v2-gris-texte);
      }
      .bulk[_ngcontent-%COMP%] {
        border-radius: 10px;
        padding: 6px 10px;
        font-size: 13px;
        font-weight: 800;
        color: var(--%NS%v2-foret);
        cursor: pointer;
      }
      .bulk[_ngcontent-%COMP%]:hover {
        background: var(--%NS%v2-sauge);
      }
      .discard[_ngcontent-%COMP%] {
        border: 1.5px solid color-mix(in oklab, var(--%NS%v2-blanc) 40%, transparent);
        background: transparent;
        color: var(--%NS%v2-blanc);
      }
      .discard[_ngcontent-%COMP%]:hover {
        background: color-mix(in oklab, var(--%NS%v2-blanc) 12%, transparent);
      }
      .bar[_ngcontent-%COMP%] {
        position: sticky;
        bottom: 12px;
        z-index: 5;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        border-radius: 20px;
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-blanc);
        padding: 12px 14px 12px 20px;
        box-shadow: var(--%NS%v2-ombre-flottant);
      }`]})}};export{X as n,ge as t};