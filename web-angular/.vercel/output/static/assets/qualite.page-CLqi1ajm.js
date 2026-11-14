import{$t as e,F as t,Ft as n,It as r,Nt as i,St as a,Vt as o,Wt as s,en as c,fn as l,ft as u,gt as d,ln as f,mn as p,pn as m,zn as h}from"./_router-chunk-H0-n0SZI.js";import{n as g}from"./index-B8S1FFME.js";import{l as _}from"./snackbar.component-ICe8-MWg.js";import{W as v,t as y,xt as b}from"./locale.service-Bf8_ncMo.js";import{n as x,t as S}from"./quality-nav-HarGX9_L.js";import{t as C}from"./app-shell.component-CR4uAChA.js";import{t as w}from"./store.service-ZF4OfoGo.js";import{n as T}from"./ui-CQhTckzj.js";import{t as E}from"./v2-page.styles-Blvl6ZBZ.js";var D=(e,t)=>t.to;function O(e,t){if(e&1&&(r(0,`a`,8)(1,`div`,9)(2,`span`,10),i(3,`ui-icon`,11),n(),r(4,`span`,12)(5,`span`,13),l(6),n(),r(7,`span`,14),l(8),n()()(),r(9,`div`)(10,`p`,15),l(11),n(),r(12,`p`,16),l(13),n()(),r(14,`span`,17),l(15),i(16,`ui-icon`,18),n()()),e&2){let e=t.$implicit,n=o();s(`routerLink`,e.to),u(2),f(`background`,e.bg)(`color`,e.fg),u(),s(`name`,e.icon)(`size`,24),u(2),d(`zero`,!e.count),u(),m(n.nf.format(e.count)),u(2),m(n.t()(`qualite.v2.hub.toTreat`)),u(3),m(n.t()(e.label)),u(2),m(n.t()(e.desc)),u(2),m(n.t()(`qualite.v2.hub.open`)),u(),s(`size`,18)}}var k={"/dashboard/qualite/doublons":{label:`qualite.nav.doublons`,desc:`qualite.v2.hub.doublons`,icon:`group`,...E.info},"/dashboard/qualite/alertes":{label:`qualite.nav.alertes`,desc:`qualite.v2.hub.alertes`,icon:`warning`,...E.attente},"/dashboard/qualite/corrections":{label:`qualite.nav.corrections`,desc:`qualite.v2.hub.corrections`,icon:`edit`,...E.culture}},A=class o{constructor(){this.store=h(w),this.locale=h(y),this.t=this.locale.t,this.nf=v,this.hubPerm=t(()=>[...new Set(S.map(e=>e.perm))]),this.sections=t(()=>{let e=this.store.state().session?.permissions??[],t=x(this.store.state()),n={"/dashboard/qualite/doublons":t.doublons,"/dashboard/qualite/alertes":t.alertes,"/dashboard/qualite/corrections":t.corrections};return S.filter(t=>e.includes(t.perm)).map(e=>({to:e.to,count:n[e.to]??0,...k[e.to]}))}),this.stats=t(()=>{let e=this.t(),t=this.store.state(),n=b(t.producers.filter(e=>!e.mergedInto),t.session),r=n.length||1,i=e=>n.filter(t=>t.quality===e).length,a=e=>`${Math.round(e/r*100)} %`,o=e(`qualite.v2.hub.sharesSub`,{count:v.format(n.length)});return[{label:e(`dashboard.quality.validated`),value:a(i(`validé`)),sub:`${v.format(i(`validé`))} · ${o}`,icon:`task_alt`,bg:``,fg:``},{label:e(`dashboard.quality.toVerify`),value:v.format(i(`à vérifier`)),sub:a(i(`à vérifier`)),icon:`warning`,...E.attente},{label:e(`dashboard.quality.duplicate`),value:v.format(i(`doublon`)),sub:a(i(`doublon`)),icon:`group`,...E.info},{label:e(`dashboard.quality.invalid`),value:v.format(i(`invalide`)),sub:a(i(`invalide`)),icon:`close`,...E.erreur}]})}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=a({type:o,selectors:[[`app-qualite-page`]],decls:14,vars:7,consts:[[3,`perm`,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mono`,`mt-8`,2,`color`,`var(--v2-gris-texte)`],[1,`rise`,`mt-3`,3,`stats`],[1,`queues`,`mt-8`],[1,`queue`,3,`routerLink`],[1,`flex`,`items-start`,`justify-between`,`gap-3`],[1,`q-ico`],[3,`name`,`size`],[1,`text-right`],[1,`q-count`,`block`],[1,`sub`],[1,`text-[19px]`,`font-extrabold`,`tracking-[-0.01em]`],[1,`sub`,`mt-1`,`text-[14px]`],[1,`q-go`,`mt-auto`],[`name`,`arrow_forward`,3,`size`]],template:function(t,a){t&1&&(r(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),l(3),n(),r(4,`h1`,3),l(5),n(),r(6,`p`,4),l(7),n()(),r(8,`h2`,5),l(9),n(),i(10,`ui-stat-cards`,6),r(11,`div`,7),c(12,O,17,15,`a`,8,D),n()()),t&2&&(s(`perm`,a.hubPerm())(`area`,a.t()(`qualite.header.title`)),u(3),m(a.t()(`qualite.header.eyebrow`)),u(2),p(` `,a.t()(`qualite.header.title`),` `),u(2),p(` `,a.t()(`qualite.hub.intro`),` `),u(2),p(` `,a.t()(`qualite.v2.hub.sharesTitle`),` `),u(),s(`stats`,a.stats()),u(2),e(a.sections()))},dependencies:[C,_,g,T],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.queues[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 16px;
      }
      .queue[_ngcontent-%COMP%] {
        display: flex;
        flex-direction: column;
        gap: 14px;
        border-radius: 24px;
        border: 1px solid var(--%NS%v2-bord-carte);
        background: var(--%NS%v2-blanc);
        padding: 22px;
        transition:
          transform 0.2s ease,
          box-shadow 0.2s ease,
          border-color 0.2s ease;
      }
      .queue[_ngcontent-%COMP%]:hover {
        transform: translateY(-2px);
        border-color: var(--%NS%v2-gris-trait);
        box-shadow: var(--%NS%v2-ombre-flottant);
      }
      .queue[_ngcontent-%COMP%]:focus-visible {
        outline: 2px solid var(--%NS%v2-foret);
        outline-offset: 3px;
      }
      .q-ico[_ngcontent-%COMP%] {
        display: grid;
        height: 48px;
        width: 48px;
        place-items: center;
        border-radius: 14px;
      }
      .q-count[_ngcontent-%COMP%] {
        font-size: 40px;
        font-weight: 800;
        line-height: 1;
        letter-spacing: -0.03em;
        font-variant-numeric: tabular-nums;
      }
      .q-go[_ngcontent-%COMP%] {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 800;
        color: var(--%NS%v2-foret);
      }
      .queue[_ngcontent-%COMP%]:hover   .q-go[_ngcontent-%COMP%] {
        gap: 10px;
      }`]})}};export{A as default};