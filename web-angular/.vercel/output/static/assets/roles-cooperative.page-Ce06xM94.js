import{Bt as e,F as t,Ft as n,Hn as r,It as i,Jn as a,Kt as o,L as s,Ln as c,Lt as l,Nt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,bn as g,fn as _,ft as v,mn as y,pn as b,vn as x,vt as S,yn as C,zn as w}from"./_router-chunk-H0-n0SZI.js";import{C as T,h as E,t as D,ut as O,w as k,xt as A}from"./locale.service-Bf8_ncMo.js";import{l as j,n as M}from"./snackbar.component-ICe8-MWg.js";import{c as N,d as P,i as F,n as I,o as L}from"./roles-CdyuUIAw.js";import{t as R}from"./app-shell.component-CR4uAChA.js";import{n as z,t as B}from"./role-permissions-editor.component-DF_ld69x.js";import{t as V}from"./store.service-ZF4OfoGo.js";import{T as H,o as U}from"./ui-CQhTckzj.js";var W=e=>({name:e}),G=e=>({count:e});function K(t,r){if(t&1){let t=l();i(0,`div`,9)(1,`ui-select`,16),e(`valueChange`,function(e){m(t);let n=f();return a(n.scoopId.set(e))}),n()()}if(t&2){let e=f();v(),p(`label`,e.t()(`coop.roles.scoop`))(`options`,e.scoopOptions())(`value`,e.scoopId())}}function q(t,r){if(t&1){let t=l();i(0,`app-role-permissions-editor`,17),C(`selectedRoleChange`,function(e){m(t);let n=f();return x(n.selectedRole,e)||(n.selectedRole=e),a(e)}),e(`save`,function(e){m(t);let n=f();return a(n.savePermissions(e))})(`edit`,function(e){m(t);let n=f();return a(n.openEdit(e))})(`remove`,function(e){m(t);let n=f();return a(n.askDelete(e))}),n()}if(t&2){let e=f();p(`matrix`,e.store.state().rolePermissions)(`editable`,!0)(`busy`,e.saving())(`onlyRoles`,e.coopRoles())(`ceiling`,e.ceiling()),g(`selectedRole`,e.selectedRole)}}function J(e,t){if(e&1&&(i(0,`section`,13)(1,`span`,18),u(2,`ui-icon`,19),n(),i(3,`p`,20),_(4),n()()),e&2){let e=f();v(2),p(`size`,26),v(2),b(e.t()(`coop.roles.empty`))}}function Y(e,t){if(e&1&&(i(0,`p`,25),u(1,`ui-icon`,26),_(2),n()),e&2){let e=f(3);v(),p(`size`,16),v(),b(e.t()(`errors.roles.reassignRequired`))}}function X(t,r){if(t&1){let t=l();i(0,`ui-select`,24),e(`valueChange`,function(e){m(t);let n=f(2);return a(n.reassignTo.set(e))}),n(),S(1,Y,3,2,`p`,25)}if(t&2){let e=f(),t=f();p(`label`,t.t()(`superadmin.roles.delete.reassign`))(`options`,t.reassignOptions(e))(`value`,t.reassignTo())(`placeholder`,t.t()(`superadmin.roles.delete.reassignPh`)),v(),h(t.deleteTried()&&!t.reassignTo()?1:-1)}}function Z(t,r){if(t&1){let t=l();i(0,`ui-modal`,21),e(`closed`,function(){m(t);let e=f();return a(e.deleting.set(null))}),S(1,X,2,5),i(2,`button`,22),e(`click`,function(){m(t);let e=f();return a(e.deleting.set(null))}),_(3),n(),i(4,`button`,23),e(`click`,function(){let e=m(t),n=f();return a(n.confirmDelete(e))}),_(5),n()()}if(t&2){let e=r,t=f();p(`open`,!0)(`title`,t.t()(`superadmin.roles.delete.title`,o(9,W,e.name)))(`description`,t.holders(e.id)?t.t()(`superadmin.roles.delete.descriptionUsed`,o(11,G,t.holders(e.id))):t.t()(`superadmin.roles.delete.descriptionEmpty`))(`width`,560)(`closeLabel`,t.t()(`common.close`)),v(),h(t.holders(e.id)?1:-1),v(2),b(t.t()(`common.cancel`)),v(),p(`disabled`,t.saving()),v(),b(t.t()(`superadmin.roles.delete.confirm`))}}var Q=class a{constructor(){this.store=w(V),this.locale=w(D),this.t=this.locale.t,this.snackbar=w(M),this.scoopId=r(``),this.selectedRole=r(`admin`),this.saving=r(!1),this.formOpen=r(!1),this.editedRoleId=r(null),this.deleting=r(null),this.reassignTo=r(``),this.deleteTried=r(!1),this.scoopOptions=t(()=>{let e=this.store.state();return A(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,...e.code?{hint:e.code}:{}}))}),this.ceiling=t(()=>O(this.store.state().session?.permissions??[])),this.copySources=t(()=>[...k,...this.coopRoles()]),this.coopRoles=t(()=>this.store.state().customRoles.filter(e=>e.scoopId===this.scoopId()).map(e=>e.id)),this.editedRole=t(()=>this.store.state().customRoles.find(e=>e.id===this.editedRoleId())??null),c(()=>{let e=this.scoopOptions();s(()=>{e.some(e=>e.value===this.scoopId())||this.scoopId.set(e[0]?.value??``)})}),c(()=>{let e=this.scoopId();e&&E()&&this.reload(e)})}async reload(e){try{let t=await L(e),n=this.store.state().customRoles.filter(t=>t.scoopId!==e);this.store.actions.replaceRolePermissionsFromApi({...this.store.state().rolePermissions,...Object.fromEntries(t.items.map(e=>[e.role,e.permissions]))},[...n,...t.customRoles])}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`))}}holders(e){return this.store.state().users.filter(t=>t.role===e).length}reassignOptions(e){return[...T,...this.coopRoles()].filter(t=>t!==e.id&&t!==`gestionnaire`).map(e=>({value:e,label:this.store.roleLabel(e)}))}openCreate(){this.editedRoleId.set(null),this.formOpen.set(!0)}openEdit(e){this.editedRoleId.set(e),this.formOpen.set(!0)}askDelete(e){let t=this.store.state().customRoles.find(t=>t.id===e);t&&(this.reassignTo.set(``),this.deleteTried.set(!1),this.deleting.set(t))}async submitForm(e){let t=this.editedRole(),n=this.scoopId();this.saving.set(!0);try{if(E()){if(t)await P(n,t.id,e);else{let t=await I(n,e);await this.reload(n),this.selectedRole.set(t.id)}}else if(t){let n=this.store.actions.updateRole(t.id,e);if(!n.ok){this.snackbar.error(n.error);return}}else{let t=this.store.actions.createRole({...e,scoopId:n});if(!t.ok){this.snackbar.error(t.error);return}this.selectedRole.set(t.id)}this.formOpen.set(!1),this.snackbar.success(t?this.locale.tNow(`superadmin.roles.updated`,{name:e.name}):this.locale.tNow(`coop.roles.created`,{name:e.name}))}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`))}finally{this.saving.set(!1)}}async confirmDelete(e){if(this.deleteTried.set(!0),this.holders(e.id)&&!this.reassignTo())return;let t=this.reassignTo()||null;this.saving.set(!0);try{if(E())await F(this.scoopId(),e.id,t),await this.reload(this.scoopId());else{let n=this.store.actions.deleteRole(e.id,t);if(!n.ok){this.snackbar.error(n.error);return}}this.deleting.set(null),this.snackbar.success(this.locale.tNow(`superadmin.roles.deleted`,{name:e.name}))}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`))}finally{this.saving.set(!1)}}async savePermissions(e){if(E()){this.saving.set(!0);try{await N(this.scoopId(),e.role,e.permissions),await this.reload(this.scoopId())}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`));return}finally{this.saving.set(!1)}}else{let t=this.store.actions.setRolePermissions(e.role,e.permissions);if(!t.ok){this.snackbar.error(t.error);return}}this.snackbar.success(this.locale.tNow(`roles.saved`,{role:this.store.roleLabel(e.role)}))}static{this.ɵfac=function(e){return new(e||a)}}static{this.ɵcmp=d({type:a,selectors:[[`app-roles-cooperative-page`]],decls:21,vars:18,consts:[[`perm`,`subrole.manage`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`add`,3,`size`],[1,`toolbar`,`card`,`mt-6`],[1,`notice`,`mt-6`],[`name`,`info`,3,`size`],[1,`mt-4`,3,`matrix`,`editable`,`busy`,`onlyRoles`,`ceiling`,`selectedRole`],[1,`card`,`mt-4`,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`openChange`,`submitted`,`open`,`role`,`busy`,`lockScope`,`ceiling`,`copySources`],[`tone`,`danger`,`icon`,`close`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`leadingIcon`,`apartment`,1,`min-w-[280px]`,`flex-1`,3,`valueChange`,`label`,`options`,`value`],[1,`mt-4`,3,`selectedRoleChange`,`save`,`edit`,`remove`,`matrix`,`editable`,`busy`,`onlyRoles`,`ceiling`,`selectedRole`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`admin_panel_settings`,3,`size`],[1,`sub`,`max-w-md`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`,`disabled`],[`leadingIcon`,`admin_panel_settings`,3,`valueChange`,`label`,`options`,`value`,`placeholder`],[`role`,`alert`,1,`mt-1.5`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[`name`,`warning`,3,`size`]],template:function(t,r){if(t&1&&(i(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),_(4),n(),i(5,`h1`,4),_(6),n(),i(7,`p`,5),_(8),n()(),i(9,`button`,6),e(`click`,function(){return r.openCreate()}),_(10),i(11,`span`,7),u(12,`ui-icon`,8),n()()(),S(13,K,2,3,`div`,9),i(14,`p`,10),u(15,`ui-icon`,11),_(16),n(),S(17,q,1,6,`app-role-permissions-editor`,12)(18,J,5,2,`section`,13),i(19,`app-role-form-dialog`,14),C(`openChange`,function(e){return x(r.formOpen,e)||(r.formOpen=e),e}),e(`submitted`,function(e){return r.submitForm(e)}),n(),S(20,Z,6,13,`ui-modal`,15),n()),t&2){let e;p(`area`,r.t()(`coop.roles.title`)),v(4),b(r.t()(`coop.roles.eyebrow`)),v(2),b(r.t()(`coop.roles.title`)),v(2),b(r.t()(`coop.roles.description`)),v(),p(`disabled`,!r.scoopId()),v(),y(` `,r.t()(`coop.roles.new`)),v(2),p(`size`,20),v(),h(r.scoopOptions().length>1?13:-1),v(2),p(`size`,18),v(),b(r.t()(`coop.roles.ceiling`)),v(),h(r.coopRoles().length?17:18),v(2),g(`open`,r.formOpen),p(`role`,r.editedRole())(`busy`,r.saving())(`lockScope`,!0)(`ceiling`,r.ceiling())(`copySources`,r.copySources()),v(),h((e=r.deleting())?20:-1,e)}},dependencies:[R,j,H,z,B,U],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`]})}};export{Q as default};