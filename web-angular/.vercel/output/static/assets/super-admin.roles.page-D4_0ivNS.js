import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,bn as h,en as g,fn as _,ft as v,hn as y,mn as b,pn as x,vn as S,vt as C,yn as w,zn as T}from"./_router-chunk-H0-n0SZI.js";import{n as E}from"./index-B8S1FFME.js";import{l as ee,n as D}from"./snackbar.component-ICe8-MWg.js";import{V as O,W as k,at as A,h as j,it as M,t as N}from"./locale.service-Bf8_ncMo.js";import{a as P,l as F,r as I,s as L,t as R,u as z}from"./roles-CdyuUIAw.js";import{t as B}from"./app-shell.component-CR4uAChA.js";import{n as V,t as H}from"./role-permissions-editor.component-DF_ld69x.js";import{t as U}from"./v2-page.styles-Blvl6ZBZ.js";import{t as W}from"./store.service-ZF4OfoGo.js";import{T as G,n as K,o as q}from"./ui-CQhTckzj.js";var J=e=>({name:e}),Y=e=>({count:e}),X=(e,t)=>t.id;function Z(e,t){if(e&1&&(a(0,`span`,25),_(1),r()),e&2){let e=d().$implicit;v(),x(e.detail)}}function Q(e,t){if(e&1&&(a(0,`li`)(1,`span`,22),l(2,`ui-icon`,23),r(),a(3,`span`,2)(4,`span`,24),_(5),r(),C(6,Z,2,1,`span`,25),a(7,`span`,26),_(8),r()()()),e&2){let e=t.$implicit,n=d();v(2),f(`size`,18),v(3),y(``,e.action,` · `,e.entity),v(),m(e.detail?6:-1),v(2),y(``,e.user,` · `,n.fmtDateTime(e.at))}}function te(e,t){if(e&1&&(a(0,`li`,19),_(1),r()),e&2){let e=d();v(),x(e.t()(`superadmin.roles.recentNone`))}}function ne(e,t){if(e&1&&(a(0,`p`,31),l(1,`ui-icon`,32),_(2),r()),e&2){let e=d(3);v(),f(`size`,16),v(),x(e.t()(`errors.roles.reassignRequired`))}}function re(e,n){if(e&1){let e=c();a(0,`ui-select`,30),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.reassignTo.set(t))}),r(),C(1,ne,3,2,`p`,31)}if(e&2){let e=d(),t=d();f(`label`,t.t()(`superadmin.roles.delete.reassign`))(`options`,t.reassignOptions(e))(`value`,t.reassignTo())(`placeholder`,t.t()(`superadmin.roles.delete.reassignPh`)),v(),m(t.deleteTried()&&!t.reassignTo()?1:-1)}}function ie(e,n){if(e&1){let e=c();a(0,`ui-modal`,27),t(`closed`,function(){p(e);let t=d();return o(t.deleting.set(null))}),C(1,re,2,5),a(2,`button`,28),t(`click`,function(){p(e);let t=d();return o(t.deleting.set(null))}),_(3),r(),a(4,`button`,29),t(`click`,function(){let t=p(e),n=d();return o(n.confirmDelete(t))}),_(5),r()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`superadmin.roles.delete.title`,s(9,J,e.name)))(`description`,t.holders(e.id)?t.t()(`superadmin.roles.delete.descriptionUsed`,s(11,Y,t.holders(e.id))):t.t()(`superadmin.roles.delete.descriptionEmpty`))(`width`,560)(`closeLabel`,t.t()(`common.close`)),v(),m(t.holders(e.id)?1:-1),v(2),x(t.t()(`common.cancel`)),v(),f(`disabled`,t.saving()),v(),x(t.t()(`superadmin.roles.delete.confirm`))}}var $=new Set([`Droits du rôle modifiés`,`Droits par défaut rétablis`,`Rôle créé`,`Rôle modifié`,`Rôle supprimé`]),ae=class o{constructor(){this.store=T(W),this.locale=T(N),this.t=this.locale.t,this.snackbar=T(D),this.fmtDateTime=O,this.selectedRole=i(`admin`),this.saving=i(!1),this.formOpen=i(!1),this.editedRoleId=i(null),this.deleting=i(null),this.reassignTo=i(``),this.deleteTried=i(!1),this.editedRole=n(()=>this.store.state().customRoles.find(e=>e.id===this.editedRoleId())??null),this.recentChanges=n(()=>this.store.state().audit.filter(e=>$.has(e.action)||e.action===`Rôle modifié`).slice(0,6)),this.stats=n(()=>{let e=this.t(),t=this.store.state(),n=new Set(t.customRoles.map(e=>e.id)),r=M.filter(e=>{let n=t.rolePermissions[e]??[],r=A[e];return n.length!==r.length||n.some(e=>!r.includes(e))}).length,i=t.audit.filter(e=>$.has(e.action)).length;return[{label:e(`superadmin.roles.stat.roles`),value:k.format(this.store.allRoles().length),sub:e(`superadmin.roles.stat.rolesSub`,{custom:k.format(n.size)}),icon:`admin_panel_settings`,bg:``,fg:``},{label:e(`superadmin.roles.stat.modified`),value:k.format(r),sub:e(`superadmin.roles.stat.modifiedSub`),icon:`tune`,...U.attente},{label:e(`superadmin.roles.stat.accounts`),value:k.format(t.users.length),sub:e(`superadmin.roles.stat.accountsSub`,{count:k.format(t.users.filter(e=>n.has(e.role)).length)}),icon:`group`,...U.info},{label:e(`superadmin.roles.stat.journal`),value:k.format(i),sub:e(`superadmin.roles.stat.journalSub`),icon:`history`,...U.culture}]}),j()&&this.reload()}async reload(){try{let e=await P();this.store.actions.replaceRolePermissionsFromApi(Object.fromEntries(e.items.map(e=>[e.role,e.permissions])),e.customRoles)}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`))}}holders(e){return this.store.state().users.filter(t=>t.role===e).length}reassignOptions(e){return this.store.allRoles().filter(t=>t!==e.id&&t!==`superadmin`&&this.store.roleScoped(t)===e.scoped).map(e=>({value:e,label:this.store.roleLabel(e)}))}openCreate(){this.editedRoleId.set(null),this.formOpen.set(!0)}openEdit(e){this.editedRoleId.set(e),this.formOpen.set(!0)}askDelete(e){let t=this.store.state().customRoles.find(t=>t.id===e);t&&(this.reassignTo.set(``),this.deleteTried.set(!1),this.deleting.set(t))}async submitForm(e){let t=this.editedRole();this.saving.set(!0);try{if(j()){if(t)await F(t.id,e);else{let t=await R(e);await this.reload(),this.selectedRole.set(t.id),this.done(`superadmin.roles.created`,e.name);return}await this.reload()}else if(t){let n=this.store.actions.updateRole(t.id,e);if(!n.ok){this.snackbar.error(n.error);return}}else{let t=this.store.actions.createRole(e);if(!t.ok){this.snackbar.error(t.error);return}this.selectedRole.set(t.id),this.done(`superadmin.roles.created`,e.name);return}this.done(`superadmin.roles.updated`,e.name)}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`))}finally{this.saving.set(!1)}}done(e,t){this.formOpen.set(!1),this.snackbar.success(this.locale.tNow(e,{name:t}))}async confirmDelete(e){this.deleteTried.set(!0);let t=this.holders(e.id);if(t&&!this.reassignTo())return;let n=this.reassignTo()||null;this.saving.set(!0);try{if(j())await I(e.id,n),await this.reload();else{let t=this.store.actions.deleteRole(e.id,n);if(!t.ok){this.snackbar.error(t.error);return}}this.deleting.set(null),this.selectedRole.set(`admin`),this.snackbar.success(t?this.locale.tNow(`superadmin.roles.deletedMoved`,{name:e.name,count:t}):this.locale.tNow(`superadmin.roles.deleted`,{name:e.name}))}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`))}finally{this.saving.set(!1)}}async savePermissions(e){if(j()){this.saving.set(!0);try{await z(e.role,e.permissions),await this.reload()}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`));return}finally{this.saving.set(!1)}}else{let t=this.store.actions.setRolePermissions(e.role,e.permissions);if(!t.ok){this.snackbar.error(t.error);return}}this.snackbar.success(this.locale.tNow(`roles.saved`,{role:this.store.roleLabel(e.role)}))}async resetRole(e){if(j())try{await L(e),await this.reload()}catch{this.snackbar.error(this.locale.tNow(`errors.roles.api`));return}else{let t=this.store.actions.resetRolePermissions(e);if(!t.ok){this.snackbar.error(t.error);return}}this.snackbar.success(this.locale.tNow(`roles.resetDone`,{role:this.store.roleLabel(e)}))}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-super-admin-roles-page`]],decls:31,vars:21,consts:[[`perm`,`role.configure`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,`inline-flex`,`items-center`,`gap-1.5`,2,`color`,`var(--v2-gris-texte)`],[`name`,`lock`,3,`size`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`add`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[1,`mt-6`,3,`selectedRoleChange`,`save`,`reset`,`edit`,`remove`,`matrix`,`editable`,`busy`,`selectedRole`],[1,`sec-card`,`mt-6`],[1,`sec-head`],[1,`sec-ico`],[`name`,`history`,3,`size`],[`routerLink`,`/dashboard/audit`,1,`btn`,`btn-ghost`,2,`height`,`40px`],[`name`,`arrow_forward`,3,`size`],[1,`recent`,`border-t`,2,`border-color`,`var(--v2-separateur)`],[1,`sub`],[3,`openChange`,`submitted`,`open`,`role`,`busy`],[`tone`,`danger`,`icon`,`close`,3,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-[12px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`admin_panel_settings`,3,`size`],[1,`block`,`font-bold`],[1,`block`,`truncate`,`text-[13px]`,`font-medium`],[1,`sub`,`block`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`,`disabled`],[`leadingIcon`,`admin_panel_settings`,3,`valueChange`,`label`,`options`,`value`,`placeholder`],[`role`,`alert`,1,`mt-1.5`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[`name`,`warning`,3,`size`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),l(4,`ui-icon`,4),_(5),r(),a(6,`h1`,5),_(7),r(),a(8,`p`,6),_(9),r()(),a(10,`button`,7),t(`click`,function(){return i.openCreate()}),_(11),a(12,`span`,8),l(13,`ui-icon`,9),r()()(),l(14,`ui-stat-cards`,10),a(15,`app-role-permissions-editor`,11),w(`selectedRoleChange`,function(e){return S(i.selectedRole,e)||(i.selectedRole=e),e}),t(`save`,function(e){return i.savePermissions(e)})(`reset`,function(e){return i.resetRole(e)})(`edit`,function(e){return i.openEdit(e)})(`remove`,function(e){return i.askDelete(e)}),r(),a(16,`section`,12)(17,`div`,13)(18,`h2`)(19,`span`,14),l(20,`ui-icon`,15),r(),_(21),r(),a(22,`a`,16),_(23),l(24,`ui-icon`,17),r()(),a(25,`ol`,18),g(26,Q,9,6,`li`,null,X,!1,te,2,1,`li`,19),r()(),a(29,`app-role-form-dialog`,20),w(`openChange`,function(e){return S(i.formOpen,e)||(i.formOpen=e),e}),t(`submitted`,function(e){return i.submitForm(e)}),r(),C(30,ie,6,13,`ui-modal`,21),r()),n&2){let t;f(`area`,i.t()(`superadmin.roles.title`)),v(4),f(`size`,14),v(),x(i.t()(`superadmin.eyebrow`)),v(2),x(i.t()(`superadmin.roles.title`)),v(2),x(i.t()(`superadmin.roles.description`)),v(2),b(` `,i.t()(`superadmin.roles.new`)),v(2),f(`size`,20),v(),f(`stats`,i.stats()),v(),f(`matrix`,i.store.state().rolePermissions)(`editable`,!0)(`busy`,i.saving()),h(`selectedRole`,i.selectedRole),v(5),f(`size`,18),v(),x(i.t()(`superadmin.roles.recent`)),v(2),x(i.t()(`nav.item.audit`)),v(),f(`size`,18),v(2),e(i.recentChanges()),v(3),h(`open`,i.formOpen),f(`role`,i.editedRole())(`busy`,i.saving()),v(),m((t=i.deleting())?30:-1,t)}},dependencies:[B,ee,G,V,H,E,q,K],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.recent[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
        display: flex;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 20px;
      }
      .recent[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {
        border-top: none;
      }`]})}};export{ae as default};