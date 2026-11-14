import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,bn as h,en as g,fn as _,ft as v,gt as y,ln as b,mn as x,mt as S,pn as C,tn as w,vn as T,vt as E,yn as D,zn as O}from"./_router-chunk-H0-n0SZI.js";import{W as k,h as A,ot as j,t as M}from"./locale.service-Bf8_ncMo.js";import{l as N,n as P}from"./snackbar.component-ICe8-MWg.js";import{a as F,s as I}from"./ui-CQhTckzj.js";import{a as L}from"./roles-CdyuUIAw.js";import{i as R,n as z,t as B}from"./user-role-dialog.component-CRJpr8Qc.js";import{n as V,t as H}from"./v2-page.styles-Blvl6ZBZ.js";import{t as U}from"./app-shell.component-CR4uAChA.js";import{t as W}from"./pager-DPeF-1nO.js";import{t as G}from"./store.service-ZF4OfoGo.js";var K=e=>({name:e}),q=(e,t)=>t.id;function J(e,n){if(e&1){let e=c();a(0,`button`,9),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.roleFilter.set(t))}),_(1),a(2,`span`,10),_(3),r()()}if(e&2){let e=n.$implicit,t=d();y(`on`,t.roleFilter()===e),S(`aria-checked`,t.roleFilter()===e),v(),x(` `,t.store.roleLabel(e)),v(),y(`zero`,!t.countOf(e)),v(),C(t.nf.format(t.countOf(e)))}}function Y(e,t){e&1&&l(0,`ui-icon`,3),e&2&&f(`size`,14)}function X(e,n){if(e&1){let e=c();a(0,`tr`,24),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.openRole(t))}),a(1,`td`)(2,`span`,25)(3,`span`,26),_(4),r(),a(5,`span`,27)(6,`span`,28),_(7),r(),a(8,`span`,29),_(9),r()()()(),a(10,`td`)(11,`span`,30),E(12,Y,1,1,`ui-icon`,3),_(13),r()(),a(14,`td`,31),_(15),r(),a(16,`td`)(17,`span`,30),_(18),r()(),a(19,`td`,32),t(`click`,function(e){return e.stopPropagation()}),a(20,`span`,33)(21,`button`,34),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.openRole(t))}),l(22,`ui-icon`,35),r(),l(23,`app-account-actions`,36),r()()()}if(e&2){let e=n.$implicit,t=d(2);v(3),b(`background`,t.tone(e.role).bg)(`color`,t.tone(e.role).fg),v(),C(t.initials(e.name)),v(3),C(e.name),v(2),C(e.email),v(2),b(`background`,t.tone(e.role).bg)(`color`,t.tone(e.role).fg),v(),m(e.role===t.lockedRole?12:-1),v(),x(` `,t.store.roleLabel(e.role),` `),v(2),C(t.scopeLabel(e)),v(2),b(`background`,e.active?t.toneSuccess.bg:t.toneNeutral.bg)(`color`,e.active?t.toneSuccess.fg:t.toneNeutral.fg),v(),C(e.active?t.t()(`utilisateurs.state.active`):t.t()(`utilisateurs.state.inactive`)),v(3),f(`title`,t.t()(`utilisateurs.v2.changeRole`)),S(`aria-label`,t.t()(`utilisateurs.v2.changeRoleFor`,s(23,K,e.name))),v(),f(`size`,18),v(),f(`user`,e)}}function Z(t,n){if(t&1&&(a(0,`div`,19)(1,`table`,20)(2,`thead`)(3,`tr`)(4,`th`),_(5),r(),a(6,`th`),_(7),r(),a(8,`th`),_(9),r(),a(10,`th`),_(11),r(),a(12,`th`,21),_(13),r()()(),a(14,`tbody`),g(15,X,24,25,`tr`,22,q),r()()(),l(17,`ui-pagination`,23)),t&2){let t=d();v(5),C(t.t()(`utilisateurs.col.name`)),v(2),C(t.t()(`utilisateurs.col.role`)),v(2),C(t.t()(`utilisateurs.col.scope`)),v(2),C(t.t()(`utilisateurs.col.state`)),v(2),C(t.t()(`utilisateurs.v2.col.actions`)),v(2),e(t.pager.items()),v(2),f(`pager`,t.pager)}}function Q(e,t){if(e&1&&(a(0,`p`,17),_(1),r()),e&2){let e=d();v(),C(e.t()(`utilisateurs.v2.empty`))}}var $=`tous`,ee=class o{constructor(){this.store=O(G),this.locale=O(M),this.t=this.locale.t,this.snackbar=O(P),this.nf=k,this.all=$,this.lockedRole=j,this.initials=V,this.toneSuccess=H.succes,this.toneNeutral=H.neutre,this.roleFilter=i($),this.query=i(``),this.roleOpen=i(!1),this.roleUserId=i(null),this.users=n(()=>this.store.state().users),this.shown=n(()=>{let e=this.query().trim().toLowerCase(),t=this.roleFilter();return this.users().filter(n=>(t===$||n.role===t)&&(!e||`${n.name} ${n.email}`.toLowerCase().includes(e)))}),this.pager=W(()=>this.shown()),this.roleUser=n(()=>this.users().find(e=>e.id===this.roleUserId())??null),A()&&this.loadFromApi()}async loadFromApi(){try{let[e,t]=await Promise.all([I(R),L()]);this.store.actions.replaceUsersFromApi(e),this.store.actions.replaceRolePermissionsFromApi(Object.fromEntries(t.items.map(e=>[e.role,e.permissions])),t.customRoles)}catch{this.snackbar.error(this.locale.tNow(`utilisateurs.v2.loadError`))}}countOf(e){return this.users().filter(t=>t.role===e).length}tone(e){return e===`superadmin`?{bg:`var(--v2-citron)`,fg:`var(--v2-foret)`}:this.store.roleScoped(e)?H.culture:H.info}scopeLabel(e){let t=e.scoopIds??(e.scoopId?[e.scoopId]:[]);return t.length?t.map(e=>this.store.state().scoops.find(t=>t.id===e)?.name??e).join(`, `):this.t()(`utilisateurs.scopeAll`)}openRole(e){this.roleUserId.set(e.id),this.roleOpen.set(!0)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-super-admin-comptes-page`]],decls:27,vars:19,consts:[[`perm`,`role.configure`,3,`area`],[1,`rise`],[1,`mono`,`inline-flex`,`items-center`,`gap-1.5`,2,`color`,`var(--v2-gris-texte)`],[`name`,`lock`,3,`size`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`card`,`mt-6`,`p-4`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[`role`,`radiogroup`,1,`chips`,`mt-3`],[`type`,`button`,`role`,`radio`,1,`chip`,3,`click`],[1,`n`],[`type`,`button`,`role`,`radio`,1,`chip`,3,`on`],[1,`toolbar`,`card`,`mt-4`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[1,`card`,`mt-4`,`overflow-hidden`],[1,`sub`,`p-8`,`text-center`],[3,`openChange`,`open`,`user`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[760px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`],[1,`min-w-0`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`badge`],[1,`max-w-56`,`truncate`,`font-medium`],[3,`click`],[1,`flex`,`justify-end`,`gap-2`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`admin_panel_settings`,3,`size`],[3,`user`]],template:function(n,i){n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),l(3,`ui-icon`,3),_(4),r(),a(5,`h1`,4),_(6),r(),a(7,`p`,5),_(8),r()(),a(9,`section`,6)(10,`p`,7),_(11),r(),a(12,`div`,8)(13,`button`,9),t(`click`,function(){return i.roleFilter.set(i.all)}),_(14),a(15,`span`,10),_(16),r()(),g(17,J,4,7,`button`,11,w),r()(),a(19,`div`,12)(20,`label`,13),l(21,`ui-icon`,14),a(22,`input`,15),t(`input`,function(e){return i.query.set(e.target.value)}),r()()(),a(23,`section`,16),E(24,Z,18,6)(25,Q,2,1,`p`,17),r(),a(26,`app-user-role-dialog`,18),D(`openChange`,function(e){return T(i.roleOpen,e)||(i.roleOpen=e),e}),r()()),n&2&&(f(`area`,i.t()(`superadmin.accounts.title`)),v(3),f(`size`,14),v(),C(i.t()(`superadmin.eyebrow`)),v(2),C(i.t()(`superadmin.accounts.title`)),v(2),C(i.t()(`superadmin.accounts.description`)),v(3),C(i.t()(`superadmin.accounts.byRole`)),v(),S(`aria-label`,i.t()(`superadmin.accounts.byRole`)),v(),y(`on`,i.roleFilter()===i.all),S(`aria-checked`,i.roleFilter()===i.all),v(),x(` `,i.t()(`utilisateurs.v2.allRoles`)),v(2),C(i.nf.format(i.users().length)),v(),e(i.store.allRoles()),v(4),f(`size`,20),v(),f(`placeholder`,i.t()(`utilisateurs.v2.search`))(`value`,i.query()),S(`aria-label`,i.t()(`utilisateurs.v2.search`)),v(2),m(i.shown().length?24:25),v(2),h(`open`,i.roleOpen),f(`user`,i.roleUser()))},dependencies:[z,U,N,F,B],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.chips[_ngcontent-%COMP%] {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }
      .chip[_ngcontent-%COMP%] {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1.5px solid var(--%NS%v2-gris-trait);
        background: var(--%NS%v2-blanc);
        padding: 7px 12px;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
      }
      .chip[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-foret);
      }
      .chip.on[_ngcontent-%COMP%] {
        border-color: var(--%NS%v2-foret);
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-blanc);
      }
      .chip[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
        border-radius: 999px;
        background: var(--%NS%v2-creme);
        padding: 1px 8px;
        color: var(--%NS%v2-foret);
      }
      .chip[_ngcontent-%COMP%]   .n.zero[_ngcontent-%COMP%] {
        color: var(--%NS%v2-gris-texte);
      }
      .chip[_ngcontent-%COMP%]:focus-visible {
        outline: 2px solid var(--%NS%v2-foret);
        outline-offset: 2px;
      }`]})}};export{ee as default};