import{Bt as e,F as t,Ft as n,Hn as r,It as i,Jn as a,Kt as o,L as s,Ln as c,Lt as l,Nt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,bn as g,fn as _,ft as v,gt as y,j as b,k as x,mn as S,mt as C,pn as w,vn as T,vt as E,yn as D,zn as O}from"./_router-chunk-H0-n0SZI.js";import{t as k,xt as A}from"./locale.service-Bf8_ncMo.js";import{t as j}from"./store.service-ZF4OfoGo.js";import{l as M,n as N}from"./snackbar.component-ICe8-MWg.js";import{O as P,T as F,o as I,t as L}from"./ui-CQhTckzj.js";var R=e=>({name:e}),z=e=>({date:e}),B=e=>({email:e});function V(e,t){if(e&1&&(i(0,`p`,8),_(1),n()),e&2){let e=f(),t=f();v(),w(t.t()(`tech.code.emailText`,o(1,B,e.email)))}}function H(t,r){if(t&1){let t=l();i(0,`button`,13),e(`click`,function(){m(t);let e=f(),n=f();return a(n.sendByEmail(e))}),u(1,`ui-icon`,14),_(2),n()}if(t&2){let e=f(2);v(),p(`size`,18),v(),S(``,e.t()(`tech.code.sendEmail`),` `)}}function U(t,r){if(t&1){let t=l();i(0,`ui-modal`,1),e(`closed`,function(){m(t);let e=f();return a(e.view.set(null))}),i(1,`div`,2)(2,`span`,3),_(3),n(),i(4,`button`,4),e(`click`,function(){let e=m(t),n=f();return a(n.copy(e.code))}),u(5,`ui-icon`,5),_(6),n(),i(7,`p`,6),u(8,`ui-icon`,7),_(9),n(),E(10,V,2,3,`p`,8),n(),E(11,H,3,2,`button`,9),i(12,`button`,10),e(`click`,function(){m(t);let e=f();return a(e.view.set(null))}),_(13),i(14,`span`,11),u(15,`ui-icon`,12),n()()()}if(t&2){let e=r,t=f();p(`open`,!0)(`title`,t.t()(`tech.code.title`,o(16,R,e.name)))(`description`,t.t()(`tech.code.description`))(`width`,560)(`closeLabel`,t.t()(`common.close`)),v(2),C(`aria-label`,t.t()(`tech.code.aria`)),v(),w(t.grouped()),v(2),p(`name`,t.copied()?`check`:`content_copy`)(`size`,18),v(),S(``,t.copied()?t.t()(`tech.code.copied`):t.t()(`tech.code.copy`),` `),v(2),p(`size`,18),v(),w(t.t()(`tech.code.rules`,o(18,z,t.expiry()))),v(),h(e.email?10:-1),v(),h(e.email?11:-1),v(2),S(` `,t.t()(`tech.code.done`)),v(2),p(`size`,18)}}var W=class e{constructor(){this.view=b(null),this.store=O(j),this.locale=O(k),this.snackbar=O(N),this.t=this.locale.t,this.copied=r(!1),this.grouped=t(()=>{let e=this.view()?.code??``;return`${e.slice(0,4)} ${e.slice(4)}`}),this.expiry=t(()=>{let e=this.view()?.expiresAt;return e?new Intl.DateTimeFormat(this.locale.locale()===`wo`?`fr-SN`:`fr-FR`,{dateStyle:`long`,timeStyle:`short`}).format(new Date(e)):``})}async copy(e){try{await navigator.clipboard.writeText(e)}catch{this.snackbar.error(this.t()(`tech.code.copyFailed`));return}this.copied.set(!0),this.snackbar.success(this.t()(`tech.code.copiedToast`)),setTimeout(()=>this.copied.set(!1),2500)}sendByEmail(e){let t=this.store.actions.sendTechnicianCodeByEmail(e.userId,e.code);t.ok?this.snackbar.success(this.t()(`tech.code.sent`,{email:t.email})):this.snackbar.error(t.error)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=d({type:e,selectors:[[`app-technician-code-dialog`]],inputs:{view:[1,`view`]},outputs:{view:`viewChange`},decls:1,vars:1,consts:[[`icon`,`lock`,`tone`,`brand`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`lock`,`tone`,`brand`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`space-y-4`,`pb-6`],[1,`code`],[`type`,`button`,1,`btn`,`btn-ghost`,`w-full`,`justify-center`,3,`click`],[3,`name`,`size`],[1,`notice`],[`name`,`info`,3,`size`],[1,`sub`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`mail`,3,`size`]],template:function(e,t){if(e&1&&E(0,U,16,20,`ui-modal`,0),e&2){let e;h((e=t.view())?0:-1,e)}},dependencies:[M,F],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.code[_ngcontent-%COMP%] {
        display: block;
        border-radius: 20px;
        background: var(--%NS%v2-sauge);
        padding: 22px 16px;
        text-align: center;
        font-family: var(--%NS%v2-font-mono);
        font-size: 40px;
        font-weight: 800;
        letter-spacing: 0.18em;
        color: var(--%NS%v2-foret);
        user-select: all;
      }`]})}};function G(e,t){if(e&1&&(i(0,`p`,24),u(1,`ui-icon`,25),_(2),n()),e&2){let e=f(2);v(),p(`size`,16),v(),w(e.err().sex)}}function K(t,r){if(t&1){let t=l();i(0,`h3`,13),u(1,`ui-icon`,14),_(2),n(),i(3,`div`,15)(4,`ui-text-field`,16),e(`valueChange`,function(e){m(t);let n=f();return n.firstName.set(e),a(n.clear(`firstName`))}),n(),i(5,`ui-text-field`,17),e(`valueChange`,function(e){m(t);let n=f();return n.lastName.set(e),a(n.clear(`lastName`))}),n(),i(6,`ui-text-field`,18),e(`valueChange`,function(e){m(t);let n=f();return n.email.set(e),a(n.clear(`email`))}),n(),i(7,`ui-text-field`,19),e(`valueChange`,function(e){m(t);let n=f();return n.phone.set(e),a(n.clear(`phone`))}),n(),i(8,`ui-text-field`,20),e(`valueChange`,function(e){m(t);let n=f();return n.age.set(e),a(n.clear(`age`))}),n(),i(9,`div`,21)(10,`p`,22),_(11),n(),i(12,`div`,23)(13,`button`,3),e(`click`,function(){m(t);let e=f();return e.sex.set(`F`),a(e.clear(`sex`))}),_(14),n(),i(15,`button`,3),e(`click`,function(){m(t);let e=f();return e.sex.set(`H`),a(e.clear(`sex`))}),_(16),n()(),E(17,G,3,2,`p`,24),n()()}if(t&2){let e=f();v(),p(`size`,18),v(),w(e.t()(`tech.dialog.section.identity`)),v(2),p(`label`,e.t()(`tech.dialog.firstName`))(`value`,e.firstName())(`error`,e.err().firstName??``),v(),p(`label`,e.t()(`tech.dialog.lastName`))(`value`,e.lastName())(`error`,e.err().lastName??``),v(),p(`label`,e.t()(`tech.dialog.email`))(`optional`,e.t()(`cooperatives.form.regionOptional`))(`hint`,e.t()(`tech.dialog.emailHint`))(`value`,e.email())(`error`,e.err().email??``),v(),p(`label`,e.t()(`tech.dialog.phone`))(`value`,e.phone())(`error`,e.err().phone??``),v(),p(`label`,e.t()(`adherents.add.age`))(`hint`,e.t()(`tech.dialog.ageHint`))(`value`,e.age())(`error`,e.err().age??``),v(3),w(e.t()(`adherents.add.sex`)),v(),C(`aria-label`,e.t()(`adherents.add.sex`)),v(),y(`on`,e.sex()===`F`),C(`aria-checked`,e.sex()===`F`),v(),w(e.t()(`adherents.add.female`)),v(),y(`on`,e.sex()===`H`),C(`aria-checked`,e.sex()===`H`),v(),w(e.t()(`adherents.add.male`)),v(),h(e.err().sex?17:-1)}}function q(e,t){if(e&1&&(i(0,`p`,24),u(1,`ui-icon`,25),_(2),n()),e&2){let e=f(3);v(),p(`size`,16),v(),w(e.err().pick)}}function J(e,t){if(e&1&&(i(0,`p`,28),_(1),n()),e&2){let e=f(3);v(),w(e.t()(`tech.dialog.pickHint`))}}function Y(t,r){if(t&1){let t=l();i(0,`p`,22),_(1),n(),i(2,`ui-select`,27),e(`valueChange`,function(e){m(t);let n=f(2);return a(n.pick(e))}),n(),E(3,q,3,2,`p`,24)(4,J,2,1,`p`,28)}if(t&2){let e=f(2);v(),w(e.t()(`tech.dialog.pick`)),v(),p(`label`,e.t()(`tech.dialog.pick`))(`options`,e.techOptions())(`value`,e.pickId()),v(),h(e.err().pick?3:4)}}function X(e,t){if(e&1&&(i(0,`p`,26),_(1),n()),e&2){let e=f(2);v(),w(e.t()(`tech.dialog.noneExisting`))}}function Z(e,t){if(e&1&&(i(0,`h3`,13),u(1,`ui-icon`,6),_(2),n(),E(3,Y,5,5)(4,X,2,1,`p`,26)),e&2){let e=f();v(),p(`size`,18),v(),w(e.t()(`tech.dialog.section.pick`)),v(),h(e.techOptions().length?3:4)}}function Q(t,r){if(t&1){let t=l();i(0,`ui-check-list`,30),e(`valueChange`,function(e){m(t);let n=f(2);return a(n.orgIds.set(e))}),n(),i(1,`p`,28),_(2),n()}if(t&2){let e=f(2);p(`label`,e.t()(`tech.dialog.section.orgs`))(`options`,e.orgOptions())(`value`,e.orgIds()),v(2),w(e.t()(`tech.dialog.orgsHint`))}}function $(e,t){if(e&1&&(i(0,`p`,29),_(1),n()),e&2){let e=f(2);v(),w(e.t()(`tech.dialog.orgsNone`))}}function ee(e,t){if(e&1&&E(0,Q,3,4)(1,$,2,1,`p`,29),e&2){let e=f();h(+!e.orgOptions().length)}}var te=class a{constructor(){this.open=b(!1),this.scoopId=x(null),this.store=O(j),this.locale=O(k),this.snackbar=O(N),this.t=this.locale.t,this.mode=r(`new`),this.firstName=r(``),this.lastName=r(``),this.email=r(``),this.phone=r(``),this.age=r(``),this.sex=r(``),this.pickId=r(``),this.scoopIds=r([]),this.orgIds=r([]),this.err=r({}),this.codeView=r(null),this.scoopOptions=t(()=>{let e=this.store.state();return A(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,...e.code?{hint:e.code}:{}}))}),this.orgOptions=t(()=>{let e=this.scoopIds(),t=this.store.state();return t.orgs.filter(t=>e.includes(t.scoopId)).sort((e,t)=>e.name.localeCompare(t.name)).map(n=>({value:n.id,label:n.name,...e.length>1?{hint:t.scoops.find(e=>e.id===n.scoopId)?.name??``}:{}}))}),this.technicians=t(()=>{let e=this.store.state(),t=new Set(this.scoopOptions().map(e=>e.value));return e.users.filter(e=>e.role===`technicien`).filter(e=>(e.scoopIds??(e.scoopId?[e.scoopId]:[])).some(e=>t.has(e))).sort((e,t)=>e.name.localeCompare(t.name))}),this.techOptions=t(()=>this.technicians().map(e=>({value:e.id,label:e.name,icon:`person`,hint:this.t()(`tech.dialog.scoopsCount`,{count:(e.scoopIds??[]).length||1})}))),c(()=>{this.open()&&s(()=>this.reset())})}reset(){let e=this.scoopId();this.mode.set(`new`),this.firstName.set(``),this.lastName.set(``),this.email.set(``),this.phone.set(``),this.age.set(``),this.sex.set(``),this.pickId.set(``),this.scoopIds.set(e?[e]:[]),this.orgIds.set([]),this.err.set({})}setMode(e){this.mode.set(e),this.err.set({}),e===`new`?this.scoopIds.set(this.scoopId()?[this.scoopId()]:[]):this.pickId()&&this.pick(this.pickId())}pick(e){this.pickId.set(e);let t=this.technicians().find(t=>t.id===e),n=t?.scoopIds??(t?.scoopId?[t.scoopId]:[]),r=this.scoopId();this.scoopIds.set([...new Set([...n,...r?[r]:[]])]),this.clear(`pick`)}clear(e){this.err.update(t=>{let{[e]:n,...r}=t;return r})}submit(){let e=this.t(),t={};if(this.scoopIds().length||(t.scoops=e(`errors.technician.scoops`)),this.mode()===`new`){this.firstName().trim()||(t.firstName=e(`errors.technician.name`)),this.lastName().trim()||(t.lastName=e(`errors.technician.name`)),this.email().trim()&&!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())&&(t.email=e(`errors.technician.email`)),this.phone().replace(/\D/g,``).length<9&&(t.phone=e(`errors.technician.phone`)),this.sex()||(t.sex=e(`errors.technician.sex`));let n=Number(this.age().trim());(!this.age().trim()||!Number.isInteger(n)||n<15||n>100)&&(t.age=e(`errors.technician.age`))}else this.pickId()||(t.pick=e(`errors.technician.notFound`));if(this.err.set(t),Object.keys(t).length)return;if(this.mode()===`new`){let t=`${this.firstName().trim()} ${this.lastName().trim()}`,n=this.store.actions.createTechnician({name:t,email:this.email(),phone:this.phone(),sex:this.sex(),age:Number(this.age().trim()),scoopIds:this.scoopIds(),orgIds:this.orgIds().filter(e=>this.orgOptions().some(t=>t.value===e))});if(!n.ok){let t=this.locale.tNow(n.error);t===e(`errors.technician.emailTaken`)?this.err.set({email:t}):t===e(`errors.technician.phoneTaken`)?this.err.set({phone:t}):this.snackbar.error(t);return}this.open.set(!1),this.codeView.set({userId:n.userId,name:t,code:n.code,expiresAt:n.expiresAt,email:this.email().trim()});return}let n=this.technicians().find(e=>e.id===this.pickId()),r=this.store.actions.setTechnicianScoops(this.pickId(),this.scoopIds());r.ok?(this.open.set(!1),this.snackbar.success(e(`tech.dialog.saved`,{name:n?.name??``}))):this.snackbar.error(this.locale.tNow(r.error))}static{this.ɵfac=function(e){return new(e||a)}}static{this.ɵcmp=d({type:a,selectors:[[`app-technician-dialog`]],inputs:{open:[1,`open`],scoopId:[1,`scoopId`]},outputs:{open:`openChange`},decls:22,vars:27,consts:[[`icon`,`person_add`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`pb-6`],[`role`,`radiogroup`,1,`modes`],[`type`,`button`,`role`,`radio`,1,`mode`,3,`click`],[1,`ico`],[`name`,`person_add`,3,`size`],[`name`,`group`,3,`size`],[1,`mt-6`,3,`valueChange`,`label`,`options`,`value`,`error`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`chip`],[3,`name`,`size`],[3,`viewChange`,`view`],[1,`sec`],[`name`,`person`,3,`size`],[1,`grid`,`gap-5`,`sm:grid-cols-2`],[`preset`,`firstName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`lastName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`email`,1,`sm:col-span-2`,3,`valueChange`,`label`,`optional`,`hint`,`value`,`error`],[`preset`,`phone`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`age`,3,`valueChange`,`label`,`hint`,`value`,`error`],[1,`sm:col-span-2`],[1,`lbl`],[`role`,`radiogroup`,1,`modes`,`mt-2`],[1,`field-err`],[`name`,`warning`,3,`size`],[1,`rounded-[16px]`,`px-4`,`py-3`,`text-[13px]`,`font-medium`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-gris-texte)`],[`leadingIcon`,`person`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[1,`mt-1.5`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-6`,`rounded-[16px]`,`px-4`,`py-3`,`text-[13px]`,`font-medium`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-gris-texte)`],[1,`mt-6`,3,`valueChange`,`label`,`options`,`value`]],template:function(t,r){t&1&&(i(0,`ui-modal`,0),e(`closed`,function(){return r.open.set(!1)}),i(1,`div`,1)(2,`div`,2)(3,`button`,3),e(`click`,function(){return r.setMode(`new`)}),i(4,`span`,4),u(5,`ui-icon`,5),n(),_(6),n(),i(7,`button`,3),e(`click`,function(){return r.setMode(`existing`)}),i(8,`span`,4),u(9,`ui-icon`,6),n(),_(10),n()(),E(11,K,18,31)(12,Z,5,3),i(13,`ui-check-list`,7),e(`valueChange`,function(e){return r.scoopIds.set(e),r.clear(`scoops`)}),n(),E(14,ee,2,1),n(),i(15,`button`,8),e(`click`,function(){return r.open.set(!1)}),_(16),n(),i(17,`button`,9),e(`click`,function(){return r.submit()}),_(18),i(19,`span`,10),u(20,`ui-icon`,11),n()()(),i(21,`app-technician-code-dialog`,12),D(`viewChange`,function(e){return T(r.codeView,e)||(r.codeView=e),e}),n()),t&2&&(p(`open`,r.open())(`title`,r.t()(`tech.dialog.title`))(`description`,r.t()(`tech.dialog.description`))(`width`,680)(`closeLabel`,r.t()(`common.close`)),v(2),C(`aria-label`,r.t()(`tech.dialog.mode.aria`)),v(),y(`on`,r.mode()===`new`),C(`aria-checked`,r.mode()===`new`),v(2),p(`size`,18),v(),S(``,r.t()(`tech.dialog.mode.new`),` `),v(),y(`on`,r.mode()===`existing`),C(`aria-checked`,r.mode()===`existing`),v(2),p(`size`,18),v(),S(``,r.t()(`tech.dialog.mode.existing`),` `),v(),h(r.mode()===`new`?11:12),v(2),p(`label`,r.t()(`tech.dialog.section.scoops`))(`options`,r.scoopOptions())(`value`,r.scoopIds())(`error`,r.err().scoops??``),v(),h(r.mode()===`new`?14:-1),v(2),w(r.t()(`producteurs.index.cancel`)),v(2),S(` `,r.mode()===`new`?r.t()(`tech.dialog.submitNew`):r.t()(`tech.dialog.submitExisting`),` `),v(2),p(`name`,r.mode()===`new`?`mail`:`check`)(`size`,18),v(),g(`view`,r.codeView))},dependencies:[P,M,F,I,W,L],styles:[`.sec[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 24px 0 12px;
      font-size: 14px;
      font-weight: 800;
      color: var(--%NS%v2-foret);
    }
    .modes[_ngcontent-%COMP%] {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 8px;
    }
    .mode[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      border: 1.5px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      padding: 12px 14px;
      text-align: left;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
    }
    .mode[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .mode.on[_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-foret);
      background: var(--%NS%v2-sauge);
      padding: 11.5px 13.5px;
    }
    .mode[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .mode[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {
      display: grid;
      height: 34px;
      width: 34px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 10px;
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-foret);
    }
    .mode.on[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {
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
    .field-err[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-erreur-fg);
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
    .chip[_ngcontent-%COMP%] {
      display: grid;
      height: 36px;
      width: 36px;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }`]})}};export{W as n,te as t};