import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gt as v,ln as y,mn as b,mt as x,pn as S,rr as C,t as w,vt as T,zn as E}from"./_router-chunk-H0-n0SZI.js";import{n as D}from"./rxjs-interop-U_NminAK.js";import{l as O}from"./snackbar.component-ICe8-MWg.js";import{W as k,t as A,xt as j}from"./locale.service-Bf8_ncMo.js";import{t as ee}from"./app-shell.component-CR4uAChA.js";import{t as M}from"./store.service-ZF4OfoGo.js";import{t as N}from"./pager-DPeF-1nO.js";import{n as P,t as F}from"./v2-page.styles-Blvl6ZBZ.js";import{C as I,S as L,a as R,n as z,w as B}from"./ui-CQhTckzj.js";import{t as V}from"./global-filters.component-BaLKxEEO.js";var H=e=>({count:e}),U=e=>({name:e}),W=(e,t)=>t.id;function G(e,n){if(e&1){let e=c();a(0,`button`,16),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.type.set(t.id))}),g(1),a(2,`span`,17),g(3),r()()}if(e&2){let e=n.$implicit,t=d();v(`on`,t.type()===e.id),x(`aria-checked`,t.type()===e.id),_(),b(` `,e.label),_(),v(`zero`,!e.count),_(),S(t.nf.format(e.count))}}function K(e,t){if(e&1&&(a(0,`span`,35),g(1),r()),e&2){let e=d().$implicit,t=d(2);_(),S(t.nf.format(e.toVerify))}}function q(e,t){e&1&&(a(0,`span`,36),g(1,`0`),r())}function J(e,n){if(e&1){let e=c();a(0,`tr`,23),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.detailId.set(t.id))}),a(1,`td`,24)(2,`span`,25)(3,`span`,26),l(4,`ui-icon`,27),r(),a(5,`span`,28)(6,`span`,29),g(7),r(),a(8,`span`,30),g(9),r()()()(),a(10,`td`)(11,`span`,31),g(12),r()(),a(13,`td`,32),g(14),r(),a(15,`td`,33),g(16),r(),a(17,`td`,34),g(18),r(),a(19,`td`,20),T(20,K,2,1,`span`,35)(21,q,2,0,`span`,36),r(),a(22,`td`)(23,`span`,37)(24,`button`,38),t(`click`,function(t){let n=p(e).$implicit,r=d(2);return t.stopPropagation(),o(r.detailId.set(n.id))}),l(25,`ui-icon`,39),r()()()()}if(e&2){let e=n.$implicit,t=d(2);_(3),y(`background`,e.tone.bg)(`color`,e.tone.fg),_(),f(`size`,18),_(3),S(e.name),_(),v(`zero`,!e.village),_(),S(e.village||`—`),_(2),y(`background`,e.tone.bg)(`color`,e.tone.fg),_(),S(e.type??t.t()(`organisations.filter.toQualify`)),_(),f(`title`,e.scoop),_(),b(` `,e.scoop,` `),_(),v(`zero`,!e.producers),_(),b(` `,t.nf.format(e.producers),` `),_(),v(`zero`,!e.plots),_(),b(` `,t.nf.format(e.plots),` `),_(2),m(e.toVerify?20:21),_(4),f(`title`,t.t()(`common.view`)),x(`aria-label`,t.t()(`organisations.view.aria`,s(26,U,e.name))),_(),f(`size`,18)}}function Y(t,n){if(t&1&&(a(0,`div`,18)(1,`table`,19)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`),g(9),r(),a(10,`th`,20),g(11),r(),a(12,`th`,20),g(13),r(),a(14,`th`,20),g(15),r(),a(16,`th`,20),g(17),r()()(),a(18,`tbody`),h(19,J,26,28,`tr`,21,W),r()()(),l(21,`ui-pagination`,22)),t&2){let t=d();_(5),S(t.t()(`organisations.col.org`)),_(2),S(t.t()(`organisations.col.type`)),_(2),S(t.t()(`organisations.col.scoop`)),_(2),S(t.t()(`organisations.col.producers`)),_(2),S(t.t()(`organisations.col.plots`)),_(2),S(t.t()(`producteurs.quality.à vérifier`)),_(2),S(t.t()(`organisations.col.actions`)),_(2),e(t.pager.items()),_(2),f(`pager`,t.pager)}}function X(e,t){if(e&1&&(a(0,`div`,14)(1,`span`,40),l(2,`ui-icon`,8),r(),a(3,`p`,41),g(4),r(),a(5,`p`,42),g(6),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),S(e.t()(`organisations.empty.none`)),_(2),S(e.t()(`organisations.empty.noneHint`))}}var Z=`__aucun`,Q=`__tous`,$=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),te=e=>e?e===`GIE`?F.info:F.culture:F.attente,ne=class o{constructor(){this.store=E(M),this.locale=E(A),this.route=E(w),this.t=this.locale.t,this.nf=k,this.q=i(``),this.type=i(Q),this.detailId=i(null),this.scoopFilter=D(this.route.queryParamMap.pipe(C(e=>e.get(`scoop`)??``)),{initialValue:``}),this.all=n(()=>{let e=this.store.state(),t=this.scoopFilter(),n=new Map,r=new Map,i=new Map;for(let t of e.producers)t.mergedInto||(n.set(t.orgId,(n.get(t.orgId)??0)+1),t.quality===`à vérifier`&&r.set(t.orgId,(r.get(t.orgId)??0)+1),i.set(t.id,t.orgId));let a=new Map;for(let t of e.plots){let e=i.get(t.producerId);e&&a.set(e,(a.get(e)??0)+1)}let o=new Map(e.scoops.map(e=>[e.id,e.name]));return j(e.orgs,e.session).filter(e=>!t||e.scoopId===t).map(e=>({id:e.id,name:e.name,type:e.type,village:e.village,scoop:o.get(e.scoopId)??e.scoopId,tone:te(e.type),producers:n.get(e.id)??0,plots:a.get(e.id)??0,toVerify:r.get(e.id)??0})).sort((e,t)=>t.producers-e.producers)}),this.typeButtons=n(()=>{let e=this.t(),t=this.all(),n=new Map,r=0;for(let e of t)e.type?n.set(e.type,(n.get(e.type)??0)+1):r++;return[{id:Q,label:e(`producteurs.index.qualityAll`),count:t.length},...[...n].sort((e,t)=>t[1]-e[1]).map(([e,t])=>({id:e,label:e,count:t})),...r?[{id:Z,label:e(`organisations.filter.toQualify`),count:r}]:[]]}),this.shown=n(()=>{let e=$(this.q().trim()),t=this.type();return this.all().filter(n=>(t===Q||(t===Z?!n.type:n.type===t))&&(!e||$(`${n.name} ${n.village} ${n.type??``}`).includes(e)))}),this.pager=N(()=>this.shown()),this.stats=n(()=>{let e=this.t(),t=this.all(),n=t.reduce((e,t)=>e+t.producers,0),r=t.reduce((e,t)=>e+t.plots,0),i=t.reduce((e,t)=>e+t.toVerify,0),a=new Set(t.map(e=>e.type).filter(Boolean)).size,o=t.filter(e=>!e.type).length;return[{label:e(`organisations.stat.total`),value:k.format(t.length),sub:e(`organisations.stat.totalSub`,{count:a}),icon:`hub`,bg:``,fg:``},{label:e(`organisations.stat.producers`),value:k.format(n),sub:e(`organisations.stat.producersSub`,{avg:k.format(Math.round(n/(t.length||1)))}),icon:`agriculture`,...F.succes},{label:e(`organisations.stat.plots`),value:k.format(r),sub:e(`organisations.stat.plotsSub`,{count:k.format(i)}),icon:`landscape`,...F.info},{label:e(`organisations.stat.toQualify`),value:k.format(o),sub:e(`organisations.stat.toQualifySub`),icon:`warning`,...F.attente}]}),this.detail=n(()=>{let e=this.detailId(),t=e?this.all().find(t=>t.id===e):null;if(!t)return null;let n=this.t(),r=this.store.state().members.filter(e=>e.orgId===t.id).sort((e,t)=>`${e.lastName}${e.firstName}`.localeCompare(`${t.lastName}${t.firstName}`)),i=e=>e===`membre`?F.succes:e===`candidat`?F.info:e===`suspendu`?F.attente:F.neutre;return{title:t.name,subtitle:[t.village,t.scoop].filter(Boolean).join(` · `),icon:`hub`,badges:[{label:t.type??n(`organisations.filter.toQualify`),...t.tone}],kpis:[B(n(`organisations.col.producers`),t.producers,`agriculture`,F.succes),B(n(`organisations.col.plots`),t.plots,`landscape`,F.info),B(n(`organisations.col.toVerify`),t.toVerify,`warning`,F.attente)],facts:[I(n(`organisations.col.type`),t.type??n(`organisations.filter.toQualify`),`hub`,{tone:t.type?void 0:F.attente}),I(n(`producteurs.col.village`),t.village,`location_on`),I(n(`organisations.col.scoop`),t.scoop,`apartment`,{wide:!0})],sections:[{title:n(`cooperatives.fiche.detail.orgMembers`),icon:`group`,count:r.length,empty:n(`cooperatives.fiche.detail.orgMembersEmpty`),items:r.slice(0,8).map(e=>({label:`${e.firstName} ${e.lastName}`,sub:e.village,initials:P(`${e.firstName} ${e.lastName}`),badge:{label:n(`cooperatives.fiche.status.${e.status}`),...i(e.status)}})),more:Math.max(0,r.length-8)}],link:[`/dashboard/organisations`,t.id]}})}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-organisations-page`]],decls:23,vars:15,consts:[[`perm`,`org.read`,3,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`closed`,`view`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[820px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`max-w-[280px]`],[1,`flex`,`items-center`,`gap-3`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-[10px]`],[`name`,`hub`,3,`size`],[1,`min-w-0`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`badge`],[1,`max-w-44`,`truncate`,`font-medium`,3,`title`],[1,`text-right`,`font-extrabold`,`tabular-nums`],[1,`text-right`,`font-semibold`,`tabular-nums`],[1,`badge`,`tabular-nums`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`zero`,`font-semibold`,`tabular-nums`],[1,`flex`,`justify-end`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`]],template:function(n,i){n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),g(3),r(),a(4,`h1`,3),g(5),r(),a(6,`p`,4),g(7),r()(),l(8,`ui-stat-cards`,5),a(9,`div`,6)(10,`label`,7),l(11,`ui-icon`,8),a(12,`input`,9),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),a(13,`div`,10),h(14,G,4,7,`button`,11,W),r(),l(16,`app-global-filters`),r(),a(17,`p`,12),g(18),r(),a(19,`section`,13),T(20,Y,22,8)(21,X,7,3,`div`,14),r(),a(22,`ui-detail-modal`,15),t(`closed`,function(){return i.detailId.set(null)}),r()()),n&2&&(f(`area`,i.t()(`organisations.area`)),_(3),S(i.t()(`organisations.eyebrow`)),_(2),b(` `,i.t()(`organisations.title`),` `),_(2),b(` `,i.t()(`organisations.lead`),` `),_(),f(`stats`,i.stats()),_(3),f(`size`,20),_(),f(`placeholder`,i.t()(`organisations.search`))(`value`,i.q()),x(`aria-label`,i.t()(`organisations.search`)),_(),x(`aria-label`,i.t()(`organisations.col.type`)),_(),e(i.typeButtons()),_(4),b(` `,i.t()(i.shown().length>1?`organisations.count.autre`:`organisations.count.un`,s(13,H,i.nf.format(i.shown().length))),` `),_(2),m(i.shown().length?20:21),_(2),f(`view`,i.detail()))},dependencies:[V,ee,O,L,R,z],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`]})}};export{ne as default};