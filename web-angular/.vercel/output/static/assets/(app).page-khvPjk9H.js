import{$n as e,$t as t,Bt as n,F as r,Ft as i,Gt as ee,Hn as a,It as o,Jn as s,Kt as c,L as te,Ln as l,Lt as u,Mn as ne,N as d,Nt as f,Pt as p,Qt as m,St as h,Tn as g,Un as re,Vt as _,Wt as v,Xt as ie,Yn as y,_t as b,a as x,dn as ae,en as S,et as C,fn as w,ft as T,gt as E,hn as D,ht as oe,k as O,ln as k,mn as A,mt as j,n as se,nn as ce,o as le,on as M,pn as N,rn as ue,rr as de,tn as P,un as fe,vt as F,xn as pe,zn as I}from"./_router-chunk-H0-n0SZI.js";import{d as me,h as he,i as ge,l as _e,m as ve,r as ye,t as be,u as xe}from"./snackbar.component-ICe8-MWg.js";import{n as L}from"./index-B8S1FFME.js";import{n as Se}from"./rxjs-interop-U_NminAK.js";import{$ as Ce,G as we,K as R,Q as Te,U as Ee,lt as De,p as Oe,q as z,wt as ke}from"./lucide-angular-Tekzrdar.js";/* empty css                        */import{Ct as Ae,Dt as je,U as Me,V as Ne,a as Pe,d as Fe,h as Ie,i as B,r as V,t as H,u as Le,wt as Re,xt as U}from"./locale.service-Bf8_ncMo.js";import{n as ze}from"./client-DTyi8Au-.js";import{r as Be}from"./auth-BG-Udl8p.js";import{n as Ve}from"./quality-nav-HarGX9_L.js";import{t as W}from"./store.service-ZF4OfoGo.js";import{n as G,t as K}from"./nav-DOfHqmfG.js";async function He(){if(!Ie())return V.restoreSession(),Pe().session!==null;if(!Fe())return V.logout(),!1;try{let e=await ze(`/me`);return V.login(e.name,e.email,e.role,e.permissions),!0}catch{return Le(),V.logout(),!1}}var Ue=e=>[e],We=()=>[],q=(e,t)=>t.id,J=(e,t)=>t.to,Ge=(e,t)=>t.labelKey;function Ke(e,t){e&1&&f(0,`div`,2)}function qe(e,t){e&1&&f(0,`span`,7)}function Je(e,t){if(e&1&&(o(0,`a`,5),f(1,`ui-icon`,6),F(2,qe,1,0,`span`,7),i()),e&2){let e=t.$implicit,n=_(4);E(`active`,n.isActive(e)),v(`routerLink`,n.linkFor(e)),j(`aria-current`,n.isActive(e)?`page`:null)(`aria-label`,n.t()(e.labelKey))(`title`,n.t()(e.labelKey)),T(),v(`name`,n.iconOf(e))(`size`,22),T(),b(n.badge()(e.to)>0?2:-1)}}function Ye(e,n){if(e&1&&(F(0,Ke,1,0,`div`,2),o(1,`div`,3),S(2,Je,3,9,`a`,4,J),i()),e&2){let e=n.$implicit,r=n.$index,i=_(3);b(r!==0&&!e.soon?0:-1),T(2),t(e.soon?ee(1,We):i.allowedItems(e))}}function Xe(e,n){if(e&1&&S(0,Ye,4,2,null,null,q),e&2){let e=_(2);t(e.visibleGroups())}}function Ze(e,t){if(e&1&&(o(0,`p`,11),w(1),i()),e&2){let e=_().$implicit,t=_(3);E(`section-super`,e.section===`superadmin`),T(),N(t.t()(e.section===`modules`?`shell.nav.modules`:e.section===`superadmin`?`nav.group.superadmin`:`shell.nav.tools`))}}function Qe(e,t){if(e&1&&(o(0,`span`,15),w(1),i()),e&2){let e=_().$implicit,t=_(5);T(),N(t.badge()(e.to))}}function $e(e,t){if(e&1&&(o(0,`a`,13),f(1,`ui-icon`,6),o(2,`span`,14),w(3),i(),F(4,Qe,2,1,`span`,15),i()),e&2){let e=t.$implicit,n=_(5);E(`active`,n.isActive(e)),v(`routerLink`,n.linkFor(e)),j(`aria-current`,n.isActive(e)?`page`:null),T(),v(`name`,n.iconOf(e))(`size`,22),T(2),N(n.t()(e.labelKey)),T(),b(n.badge()(e.to)>0?4:-1)}}function et(e,n){if(e&1&&(o(0,`div`,3),S(1,$e,5,8,`a`,12,J),i()),e&2){let e=_(),n=e.$implicit,r=e.$index,i=_(3);E(`mt-1`,r!==0&&!n.section),T(),t(i.allowedItems(n))}}function tt(e,t){if(e&1&&(o(0,`span`,20),f(1,`ui-icon`,25),o(2,`span`,26),w(3),i()()),e&2){let e=_(5);j(`title`,e.t()(`modules.state.soon`)),T(),v(`size`,15),T(2),N(e.t()(`modules.state.soon`))}}function nt(e,t){if(e&1&&(o(0,`span`,15),w(1),i()),e&2){let e=_(2).$implicit,t=_(3);T(),N(t.pending(e))}}function rt(e,t){if(e&1&&(o(0,`span`,27)(1,`span`,14),w(2),i()()),e&2){let e=_().$implicit,t=_(5);T(2),N(t.t()(e.labelKey))}}function it(e,t){if(e&1&&(o(0,`span`,15),w(1),i()),e&2){let e=_(2).$implicit,t=_(5);T(),N(t.badge()(e.to))}}function at(e,t){if(e&1&&(o(0,`a`,29)(1,`span`,14),w(2),i(),F(3,it,2,1,`span`,15),i()),e&2){let e=_().$implicit,t=_(5);E(`active`,t.isActive(e)),v(`routerLink`,t.linkFor(e)),j(`aria-current`,t.isActive(e)?`page`:null),T(2),N(t.t()(e.labelKey)),T(),b(t.badge()(e.to)>0?3:-1)}}function ot(e,t){if(e&1&&F(0,rt,3,1,`span`,27)(1,at,4,6,`a`,28),e&2){let e=_(2).$implicit;b(+!e.soon)}}function st(e,r){if(e&1){let e=u();o(0,`div`,16)(1,`button`,17),n(`click`,function(){y(e);let t=_().$implicit,n=_(3);return s(n.toggle(t))}),f(2,`ui-icon`,6),o(3,`span`,18)(4,`span`,19),w(5),i()(),F(6,tt,4,3,`span`,20),F(7,nt,2,1,`span`,15),f(8,`ui-icon`,21),i(),o(9,`div`,22)(10,`div`,23)(11,`div`,24),S(12,ot,2,1,null,null,Ge),i()()()()}if(e&2){let e=_().$implicit,n=_(3);E(`open`,n.isOpen(e))(`super`,e.id===`superadmin`),T(),E(`current`,n.hasActive(e)),j(`aria-expanded`,n.isOpen(e))(`aria-controls`,n.panelId(e)),T(),v(`name`,e.icon)(`size`,22),T(2),E(`opacity-60`,e.soon),T(),N(n.t()(e.labelKey)),T(),b(e.soon?6:-1),T(),b(!n.isOpen(e)&&n.pending(e)>0?7:-1),T(),v(`size`,20),T(),v(`id`,n.panelId(e)),j(`inert`,n.isOpen(e)?null:``),T(3),t(n.allowedItems(e))}}function ct(e,t){if(e&1&&(F(0,Ze,2,3,`p`,8),F(1,et,3,2,`div`,9)(2,st,14,18,`div`,10)),e&2){let e=t.$implicit,n=_(3);b(e.section&&e.section!==n.previousSection(e)?0:-1),T(),b(e.flat?1:2)}}function lt(e,n){if(e&1&&S(0,ct,3,2,null,null,q),e&2){let e=_(2);t(e.visibleGroups())}}function ut(e,t){if(e&1&&(o(0,`div`,1),F(1,Xe,2,0)(2,lt,2,0),i()),e&2){let e=t.$implicit;E(`px-3`,!e)(`px-2.5`,e),T(),b(e?1:2)}}var dt=`mbd.nav`,ft=[`/dashboard/cooperative`,`/dashboard/cooperatives`,`/dashboard/organisations`,`/dashboard/producteurs`,`/dashboard/dossiers`,`/dashboard/personnel`,`/dashboard/techniciens`,`/dashboard/cotisations`,`/dashboard/reunions`,`/dashboard/documents`,`/dashboard/rappels`],pt=K.flatMap(e=>e.items),mt=e=>e.map(e=>pt.find(t=>t.to===e)).filter(e=>!!e),Y=e=>pt.filter(t=>t.soon&&t.module===e),X=e=>K.find(t=>t.group===e)?.items.filter(e=>!e.soon)??[],ht={"/":`space_dashboard`,"/dashboard/rapports":`analytics`,"/dashboard/cooperative":`home_work`,"/dashboard/cooperatives":`diversity_3`,"/dashboard/personnel":`manage_accounts`,"/dashboard/producteurs":`agriculture`,"/dashboard/dossiers":`folder_shared`,"/dashboard/organisations":`hub`,"/dashboard/cotisations":`payments`,"/dashboard/reunions":`event`,"/dashboard/documents":`description`,"/dashboard/rappels":`notifications_active`,"/dashboard/techniciens":`badge`,"/dashboard/roles-cooperative":`admin_panel_settings`,"/dashboard/qualite":`verified`,"/dashboard/utilisateurs":`manage_accounts`,"/dashboard/comptes":`link`,"/dashboard/appareils":`devices`,"/dashboard/referentiels":`dataset`,"/dashboard/imports":`upload_file`,"/dashboard/donnees":`database`,"/dashboard/audit":`history`,"/dashboard/super-admin/roles":`admin_panel_settings`,"/dashboard/super-admin/comptes":`manage_accounts`},gt=[{id:`pilotage`,labelKey:`nav.group.pilotage`,icon:`space_dashboard`,items:X(`Pilotage`),soon:!1,flat:!0,defaultOpen:!0},{id:`superadmin`,section:`superadmin`,labelKey:`nav.group.superadmin`,icon:`lock`,items:X(`Super administration`),soon:!1,defaultOpen:!0},{id:`m1`,section:`modules`,labelKey:`modules.administratif.name`,icon:`badge`,items:mt(ft),soon:!1,defaultOpen:!0},{id:`m2`,section:`modules`,labelKey:`modules.commercial.name`,icon:`storefront`,items:Y(`commercial`),soon:!0,defaultOpen:!1},{id:`m3`,section:`modules`,labelKey:`modules.exploitation.name`,icon:`query_stats`,items:Y(`exploitation`),soon:!0,defaultOpen:!1},{id:`m4`,section:`modules`,labelKey:`modules.agronomique.name`,icon:`potted_plant`,items:Y(`agronomique`),soon:!0,defaultOpen:!1},{id:`m5`,section:`modules`,labelKey:`modules.sig.name`,icon:`pin_drop`,items:Y(`sig`),soon:!0,defaultOpen:!1},{id:`qualite`,section:`tools`,labelKey:`nav.item.qualite`,icon:`verified`,items:mt([`/dashboard/qualite`]),soon:!1,flat:!0,defaultOpen:!0},{id:`admin`,section:`tools`,labelKey:`nav.group.administration`,icon:`tune`,items:X(`Administration`),soon:!1,defaultOpen:!1}];function _t(){if(typeof window>`u`)return{};try{let e=window.localStorage.getItem(dt),t=e?JSON.parse(e):{};return!t||typeof t!=`object`?{}:Object.fromEntries(Object.entries(t).filter(([,e])=>typeof e==`boolean`))}catch{return{}}}function vt(e){if(typeof window<`u`)try{window.localStorage.setItem(dt,JSON.stringify(e))}catch{}}var yt=class e{constructor(){this.session=O.required(),this.path=O.required(),this.badge=O.required(),this.collapsed=O(!1),this.t=I(H).t,this.stored=a(_t()),this.visibleGroups=r(()=>gt.filter(e=>this.allowedItems(e).length>0)),l(()=>{this.path();let e=te(this.stored),t=gt.filter(t=>!t.flat&&e[t.id]===!1&&te(()=>this.hasActive(t)));if(t.length===0)return;let n={...e,...Object.fromEntries(t.map(e=>[e.id,!0]))};this.stored.set(n),vt(n)})}allowedItems(e){if(e.soon)return e.items;let t=this.session();return e.items.filter(e=>!e.soon&&G(t,e))}previousSection(e){let t=this.visibleGroups(),n=t.indexOf(e);return n>0?t[n-1].section:void 0}iconOf(e){return ht[e.to]??`dataset`}panelId(e){return`nav-${e.id}`}linkFor(e){return e.to===`/`?[`/dashboard`,this.session().role]:e.to}isActive(e){if(!e.to)return!1;let t=this.path().split(/[?#]/)[0]??``;if(e.to===`/`)return t===`/`||t===`/dashboard/${this.session().role}`;if(e.to===`/dashboard/cooperative`){let n=Ae(this.session());return t===e.to||[...n].some(e=>t===`/dashboard/cooperatives/${e}`||t.startsWith(`/dashboard/cooperatives/${e}/`))}return t===e.to||t.startsWith(`${e.to}/`)}hasActive(e){return this.allowedItems(e).some(e=>this.isActive(e))}isOpen(e){return e.flat?!0:this.stored()[e.id]??(this.hasActive(e)||e.defaultOpen)}pending(e){let t=this.badge();return this.allowedItems(e).reduce((e,n)=>e+t(n.to),0)}toggle(e){let t={...this.stored(),[e.id]:!this.isOpen(e)};this.stored.set(t),vt(t)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=h({type:e,selectors:[[`app-sidebar-nav`]],hostAttrs:[1,`flex`,`min-h-0`,`flex-1`,`flex-col`],inputs:{session:[1,`session`],path:[1,`path`],badge:[1,`badge`],collapsed:[1,`collapsed`]},decls:2,vars:2,consts:[[1,`fade`,`min-h-0`,`flex-1`,`overflow-y-auto`,`overflow-x-hidden`,`overscroll-contain`,`pb-4`,3,`px-3`,`px-2.5`],[1,`fade`,`min-h-0`,`flex-1`,`overflow-y-auto`,`overflow-x-hidden`,`overscroll-contain`,`pb-4`],[`aria-hidden`,`true`,1,`mx-3`,`my-2`,`h-px`,2,`background`,`var(--v2-foret-trait)`],[1,`space-y-0.5`],[1,`rail-item`,3,`active`,`routerLink`],[1,`rail-item`,3,`routerLink`],[3,`name`,`size`],[`aria-hidden`,`true`,1,`dot`],[1,`section`,3,`section-super`],[1,`space-y-0.5`,3,`mt-1`],[1,`module`,3,`open`,`super`],[1,`section`],[1,`row`,3,`active`,`routerLink`],[1,`row`,3,`routerLink`],[1,`flex-1`,`truncate`],[1,`badge`],[1,`module`],[`type`,`button`,1,`row`,3,`click`],[1,`flex`,`min-w-0`,`flex-1`,`items-center`,`gap-2`],[1,`truncate`],[1,`soon`],[`name`,`chevron_right`,1,`chevron`,3,`size`],[1,`panel`,3,`id`],[1,`panel-inner`],[1,`tree`],[`name`,`schedule`,3,`size`],[1,`sr-only`],[`aria-disabled`,`true`,1,`leaf`,`leaf-soon`],[1,`leaf`,3,`active`,`routerLink`],[1,`leaf`,3,`routerLink`]],template:function(e,n){e&1&&S(0,ut,3,5,`div`,0,P),e&2&&t(c(0,Ue,n.collapsed()))},dependencies:[L,_e],styles:[`[_nghost-%COMP%] {
      --%NS%muted-ink: color-mix(in oklab, var(--%NS%v2-blanc) 72%, transparent);
      --%NS%guide: color-mix(in oklab, var(--%NS%v2-blanc) 16%, transparent);
    }
    .fade[_ngcontent-%COMP%] {
      animation: _ngcontent-%COMP%_nav-fade 0.22s ease both;
    }
    @keyframes _ngcontent-%COMP%_nav-fade {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    
    .row[_ngcontent-%COMP%] {
      position: relative;
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: 14px;
      padding: 10px 12px;
      font-size: 14px;
      font-weight: 600;
      text-align: left;
      color: var(--%NS%muted-ink);
      cursor: pointer;
      transition:
        background-color 0.18s ease,
        color 0.18s ease;
    }
    .row[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-carte);
      color: var(--%NS%v2-blanc);
    }
    .row.active[_ngcontent-%COMP%] {
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
      font-weight: 800;
    }
    .row.current[_ngcontent-%COMP%] {
      color: var(--%NS%v2-blanc);
    }
    
    .module[_ngcontent-%COMP%] {
      margin-top: 4px;
      border-radius: 18px;
      transition:
        background-color 0.3s ease,
        padding 0.3s ease;
    }
    .module.open[_ngcontent-%COMP%] {
      background: color-mix(in oklab, var(--%NS%v2-blanc) 5%, transparent);
      padding-bottom: 6px;
    }
    .module.open[_ngcontent-%COMP%]    > .row[_ngcontent-%COMP%]:hover {
      background: color-mix(in oklab, var(--%NS%v2-blanc) 6%, transparent);
    }
    .section[_ngcontent-%COMP%] {
      margin: 20px 12px 6px;
      font-family: var(--%NS%v2-font-mono);
      font-size: 10.5px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: color-mix(in oklab, var(--%NS%v2-blanc) 42%, transparent);
    }
    
    .section-super[_ngcontent-%COMP%] {
      color: var(--%NS%v2-citron);
    }
    .module.super[_ngcontent-%COMP%] {
      border: 1.5px solid color-mix(in oklab, var(--%NS%v2-citron) 55%, transparent);
    }
    .chevron[_ngcontent-%COMP%] {
      transition: transform 0.28s cubic-bezier(0.32, 0.72, 0, 1);
      opacity: 0.7;
    }
    .open[_ngcontent-%COMP%]    > .row[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {
      transform: rotate(90deg);
    }

    
    .panel[_ngcontent-%COMP%] {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition:
        grid-template-rows 0.3s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.22s ease;
    }
    .open[_ngcontent-%COMP%]    > .panel[_ngcontent-%COMP%] {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .panel-inner[_ngcontent-%COMP%] {
      min-height: 0;
      overflow: hidden;
    }
    .tree[_ngcontent-%COMP%] {
      margin: 2px 0 4px 31px;
    }

    
    .leaf[_ngcontent-%COMP%] {
      position: relative;
      display: flex;
      align-items: center;
      gap: 8px;
      border-radius: 10px;
      padding: 8px 12px;
      font-size: 13.5px;
      font-weight: 600;
      color: var(--%NS%muted-ink);
      cursor: pointer;
      transition:
        background-color 0.18s ease,
        color 0.18s ease;
    }
    .leaf[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-blanc);
      background: color-mix(in oklab, var(--%NS%v2-foret-carte) 70%, transparent);
    }
    .leaf.active[_ngcontent-%COMP%] {
      color: var(--%NS%v2-citron);
      font-weight: 800;
      background: color-mix(in oklab, var(--%NS%v2-blanc) 8%, transparent);
    }

    .row[_ngcontent-%COMP%]:focus-visible, 
   .leaf[_ngcontent-%COMP%]:focus-visible, 
   .rail-item[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-citron);
      outline-offset: 2px;
    }

    
    .rail-item[_ngcontent-%COMP%] {
      position: relative;
      display: flex;
      justify-content: center;
      border-radius: 14px;
      padding: 11px 0;
      color: var(--%NS%muted-ink);
      cursor: pointer;
      transition:
        background-color 0.18s ease,
        color 0.18s ease;
    }
    .rail-item[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-carte);
      color: var(--%NS%v2-blanc);
    }
    .rail-item.active[_ngcontent-%COMP%] {
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }

    .soon[_ngcontent-%COMP%] {
      display: grid;
      flex-shrink: 0;
      place-items: center;
      color: color-mix(in oklab, var(--%NS%v2-blanc) 50%, transparent);
    }
    .leaf-soon[_ngcontent-%COMP%], 
   .leaf-soon[_ngcontent-%COMP%]:hover {
      cursor: not-allowed;
      background: none;
      color: color-mix(in oklab, var(--%NS%v2-blanc) 38%, transparent);
    }
    .badge[_ngcontent-%COMP%] {
      border-radius: 999px;
      background: var(--%NS%v2-citron);
      padding: 1px 7px;
      font-size: 11px;
      font-weight: 800;
      color: var(--%NS%v2-foret);
      font-variant-numeric: tabular-nums;
    }
    .row.active[_ngcontent-%COMP%]   .badge[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .dot[_ngcontent-%COMP%] {
      position: absolute;
      top: 7px;
      right: 14px;
      height: 8px;
      width: 8px;
      border-radius: 999px;
      background: var(--%NS%v2-citron);
      box-shadow: 0 0 0 2px var(--%NS%v2-foret);
    }

    @media (prefers-reduced-motion: reduce) {
      .fade[_ngcontent-%COMP%] {
        animation: none;
      }
      .panel[_ngcontent-%COMP%], 
   .chevron[_ngcontent-%COMP%] {
        transition: none;
      }
    }`]})}},bt=[`qInput`],xt=e=>({q:e}),St=(e,t)=>t.to,Ct=(e,t)=>t.id;function wt(e,t){if(e&1&&(o(0,`p`,8),w(1),i()),e&2){let e=_(2);T(),N(e.t()(`shell.palette.hint`))}}function Tt(e,t){if(e&1){let e=u();o(0,`button`,12),n(`click`,function(){let t=y(e).$implicit,n=_(4);return s(n.goPage(t))}),f(1,`lucide-angular`,13),o(2,`span`),w(3),i()()}if(e&2){let e=t.$implicit,n=_(4);T(),v(`img`,e.icon),T(2),N(n.t()(e.labelKey))}}function Et(e,n){if(e&1&&(o(0,`div`,10),w(1),i(),S(2,Tt,4,2,`button`,11,St)),e&2){let e=_(3);T(),A(` `,e.t()(`shell.palette.pages`),` `),T(),t(e.pageItems())}}function Dt(e,t){if(e&1&&(o(0,`span`),w(1),i()),e&2){let e=_().$implicit,t=_(4);T(),A(` · `,t.store.phone(e.phone))}}function Ot(e,t){if(e&1){let e=u();o(0,`button`,16),n(`click`,function(){let t=y(e).$implicit,n=_(4);return s(n.goProducer(t.id))}),o(1,`span`,17),w(2),i(),o(3,`span`,18),w(4),F(5,Dt,2,1,`span`),i()()}if(e&2){let e=t.$implicit,n=_(4);T(2),D(``,e.firstName,` `,e.lastName),T(2),D(` `,e.code,` · `,e.village,` `),T(),b(n.showPhoneHit()(e)?5:-1)}}function kt(e,n){if(e&1&&(o(0,`div`,14),w(1),i(),S(2,Ot,6,5,`button`,15,Ct)),e&2){let e=_(3);T(),A(` `,e.t()(`shell.palette.producers`),` `),T(),t(e.producerHits())}}function At(e,t){if(e&1){let e=u();o(0,`button`,12),n(`click`,function(){let t=y(e).$implicit,n=_(4);return s(n.goOrg(t.id))}),o(1,`span`,19),w(2),i(),o(3,`span`,20),w(4),i()()}if(e&2){let e=t.$implicit;T(2),N(e.name),T(2),N(e.village)}}function jt(e,n){if(e&1&&(o(0,`div`,14),w(1),i(),S(2,At,5,2,`button`,11,Ct)),e&2){let e=_(3);T(),A(` `,e.t()(`shell.palette.orgs`),` `),T(),t(e.orgHits())}}function Mt(e,t){if(e&1&&(F(0,Et,4,1),F(1,kt,4,1),F(2,jt,4,1)),e&2){let e=_(2);b(e.pageItems().length>0?0:-1),T(),b(e.producerHits().length>0?1:-1),T(),b(e.orgHits().length>0?2:-1)}}function Nt(e,t){if(e&1&&(o(0,`p`,9),w(1),i()),e&2){let e=_(2);T(),A(` `,e.t()(`shell.palette.empty`,c(1,xt,e.q())),` `)}}function Pt(e,t){if(e&1){let e=u();o(0,`div`,2),n(`click`,function(t){y(e);let n=_();return s(n.closeFromBackdrop(t))}),o(1,`div`,3),n(`click`,function(e){return e.stopPropagation()}),o(2,`h2`,4),w(3),i(),o(4,`div`,5)(5,`input`,6,0),n(`input`,function(t){y(e);let n=_();return s(n.onQuery(t.target.value))}),i()(),o(7,`div`,7),F(8,wt,2,1,`p`,8),F(9,Mt,3,3)(10,Nt,2,3,`p`,9),i()()()}if(e&2){let e=_();T(3),N(e.t()(`shell.palette.title`)),T(2),v(`placeholder`,e.t()(`shell.palette.placeholder`))(`value`,e.q()),j(`aria-label`,e.t()(`shell.palette.placeholder`)),T(3),b(!e.q().trim()&&e.pageItems().length>0?8:-1),T(),b(e.hasAnyResults()?9:e.q().trim()?10:-1)}}var Z=e=>e.toLowerCase().normalize(`NFD`).replace(/[\u0300-\u036f]/g,``),Q=e=>e.replace(/\D/g,``),$=class e{constructor(){this.router=I(x),this.store=I(W),this.destroyRef=I(g),this.injector=I(ne),this.localeService=I(H),this.qInput=d(`qInput`),this.t=this.localeService.t,this.maskPhone=Me,this.open=a(!1),this.q=a(``),this.session=r(()=>this.store.state().session),this.needle=r(()=>Z(this.q().trim())),this.byPhone=r(()=>{let e=this.session(),t=this.q();if(!e||!B(e,`producer.edit`))return``;let n=Q(t);return n.length>=4?n:``}),this.pageItems=r(()=>{let e=this.session(),t=this.needle();if(!e)return[];let n=e=>!t||Z(e).includes(t),r=this.t();return K.flatMap(e=>e.items).filter(t=>!t.soon&&G(e,t)&&n(r(t.labelKey)))}),this.producerHits=r(()=>{let e=this.session(),t=this.needle(),n=this.byPhone();if(!e||!t)return[];let r=e=>!t||Z(e).includes(t),i=this.store.state().producers.filter(e=>!e.mergedInto);return U(i,e).filter(e=>r(`${e.firstName} ${e.lastName} ${e.code} ${e.village}`)||!!n&&Q(e.phone).includes(n)).slice(0,8)}),this.showPhoneHit=r(()=>{let e=this.byPhone();return t=>!!e&&Q(t.phone).includes(e)}),this.orgHits=r(()=>{let e=this.session(),t=this.needle();if(!e||!t)return[];let n=e=>!t||Z(e).includes(t);return U(this.store.state().orgs,e).filter(e=>n(`${e.name} ${e.village}`)).slice(0,6)}),this.hasAnyResults=r(()=>this.pageItems().length>0||this.producerHits().length>0||this.orgHits().length>0),C(()=>{let e=e=>{(e.metaKey||e.ctrlKey)&&e.key.toLowerCase()===`k`&&(e.preventDefault(),this.toggle())};document.addEventListener(`keydown`,e),this.destroyRef.onDestroy(()=>document.removeEventListener(`keydown`,e))})}show(){this.open.set(!0),this.focusInputSoon()}toggle(){let e=!this.open();this.open.set(e),e?this.focusInputSoon():this.q.set(``)}onQuery(e){this.q.set(e)}closeFromBackdrop(e){e.target===e.currentTarget&&this.close()}close(){this.open.set(!1),this.q.set(``)}focusInputSoon(){C(()=>{let e=this.qInput()?.nativeElement;e?.focus(),e?.select()},{injector:this.injector})}onEscape(){this.open()&&this.close()}goPage(e){this.close(),this.router.navigateByUrl(e.to)}goProducer(e){this.close(),this.router.navigate([`/dashboard/producteurs`,e])}goOrg(e){this.close(),this.router.navigate([`/dashboard/organisations`,e])}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=h({type:e,selectors:[[`app-command-palette`]],viewQuery:function(e,t){e&1&&pe(t.qInput,bt,5),e&2&&ie()},hostBindings:function(e,t){e&1&&n(`keydown.escape`,function(){return t.onEscape()},ue)},decls:1,vars:1,consts:[[`qInput`,``],[`role`,`presentation`,1,`fixed`,`inset-0`,`z-[100]`,`flex`,`items-start`,`justify-center`,`bg-black/40`,`p-3`,`pt-6`,`sm:items-center`,`sm:pt-0`],[`role`,`presentation`,1,`fixed`,`inset-0`,`z-[100]`,`flex`,`items-start`,`justify-center`,`bg-black/40`,`p-3`,`pt-6`,`sm:items-center`,`sm:pt-0`,3,`click`],[`role`,`dialog`,`aria-modal`,`true`,`aria-labelledby`,`cmd-palette-title`,1,`flex`,`max-h-[min(70vh,32rem)]`,`w-full`,`max-w-lg`,`flex-col`,`overflow-hidden`,`rounded-lg`,`border`,`bg-popover`,`text-popover-foreground`,`shadow-lg`,3,`click`],[`id`,`cmd-palette-title`,1,`sr-only`],[1,`border-b`,`px-3`,`py-2`],[`type`,`search`,1,`w-full`,`rounded-md`,`border-0`,`bg-transparent`,`px-2`,`py-2`,`text-sm`,`outline-none`,`ring-0`,`placeholder:text-muted-foreground`,`focus:ring-0`,3,`input`,`placeholder`,`value`],[1,`flex-1`,`overflow-y-auto`,`p-2`,`text-sm`],[1,`px-2`,`py-2`,`text-xs`,`text-muted-foreground`],[1,`px-2`,`py-6`,`text-center`,`text-muted-foreground`],[1,`px-2`,`py-1.5`,`text-[11px]`,`font-semibold`,`uppercase`,`tracking-wide`,`text-muted-foreground`],[`type`,`button`,1,`flex`,`w-full`,`items-center`,`gap-2`,`rounded-sm`,`px-2`,`py-2`,`text-left`,`hover:bg-muted`],[`type`,`button`,1,`flex`,`w-full`,`items-center`,`gap-2`,`rounded-sm`,`px-2`,`py-2`,`text-left`,`hover:bg-muted`,3,`click`],[1,`size-4`,`shrink-0`,`text-muted-foreground`,3,`img`],[1,`mt-2`,`px-2`,`py-1.5`,`text-[11px]`,`font-semibold`,`uppercase`,`tracking-wide`,`text-muted-foreground`],[`type`,`button`,1,`flex`,`w-full`,`flex-col`,`gap-0.5`,`rounded-sm`,`px-2`,`py-2`,`text-left`,`hover:bg-muted`,`sm:flex-row`,`sm:items-center`],[`type`,`button`,1,`flex`,`w-full`,`flex-col`,`gap-0.5`,`rounded-sm`,`px-2`,`py-2`,`text-left`,`hover:bg-muted`,`sm:flex-row`,`sm:items-center`,3,`click`],[1,`font-medium`],[1,`text-xs`,`text-muted-foreground`,`sm:ml-auto`],[1,`flex-1`],[1,`text-xs`,`text-muted-foreground`]],template:function(e,t){e&1&&F(0,Pt,11,6,`div`,1),e&2&&b(t.open()?0:-1)},dependencies:[ve,z,R],encapsulation:2})}},Ft=class e{constructor(){this._items=a([]),this.items=this._items.asReadonly(),this.count=r(()=>this._items().length),this.dismissTimers=new Map,this.defaultDuration=4500}static{this.nextId=1}show(t){let{durationMs:n=this.defaultDuration,...r}=t,i=e.nextId++;if(this._items.update(e=>[...e,{...r,id:i}]),n>0&&typeof document<`u`){let e=setTimeout(()=>this.dismiss(i),n);this.dismissTimers.set(i,e)}}success(e,t,n){this.show({tone:`success`,titleKey:e,titleParams:n,descriptionKey:t?.key,descriptionParams:t?.params})}error(e,t,n){this.show({tone:`error`,titleKey:e,titleParams:n,descriptionKey:t?.key,descriptionParams:t?.params})}dismiss(e){let t=this.dismissTimers.get(e);t!==void 0&&(clearTimeout(t),this.dismissTimers.delete(e)),this._items.update(t=>t.filter(t=>t.id!==e))}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵprov=re({token:e,factory:e.ɵfac,providedIn:`root`})}},It=(e,t)=>t.id;function Lt(e,t){if(e&1&&(o(0,`p`,6),w(1),i()),e&2){let e=_().$implicit,t=_();T(),A(` `,t.t()(e.descriptionKey,e.descriptionParams),` `)}}function Rt(e,t){if(e&1){let e=u();o(0,`div`,2)(1,`div`,3)(2,`div`,4)(3,`p`,5),w(4),i(),F(5,Lt,2,1,`p`,6),i(),o(6,`button`,7),n(`click`,function(){let t=y(e).$implicit,n=_();return s(n.toast.dismiss(t.id))}),f(7,`lucide-angular`,8),i()()()}if(e&2){let e=t.$implicit,n=_();oe(n.panelClass(e)),T(4),A(` `,n.t()(e.titleKey,e.titleParams),` `),T(),b(e.descriptionKey?5:-1),T(),j(`aria-label`,n.t()(`common.close`)),T(),v(`img`,n.iconClose)}}var zt=class e{constructor(){this.toast=I(Ft),this.locale=I(H),this.t=this.locale.t,this.iconClose=ke}panelClass(e){let t=`rounded-lg border p-3 shadow-lg backdrop-blur-sm transition-[transform,opacity]`;return e.tone===`success`?`${t} border-success/30 bg-success-bg text-success-fg`:`${t} border-danger/30 bg-danger-bg text-danger-fg`}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=h({type:e,selectors:[[`app-toast-host`]],decls:3,vars:0,consts:[[`aria-live`,`polite`,`aria-relevant`,`additions`,1,`pointer-events-none`,`fixed`,`bottom-0`,`right-0`,`z-[100]`,`flex`,`max-w-[100vw]`,`flex-col`,`gap-2`,`p-4`,`sm:max-w-sm`,`sm:p-6`],[`role`,`status`,1,`pointer-events-auto`,`mbay-animate-toast-in`,3,`class`],[`role`,`status`,1,`pointer-events-auto`,`mbay-animate-toast-in`],[1,`flex`,`gap-3`],[1,`min-w-0`,`flex-1`],[1,`text-sm`,`font-semibold`,`leading-snug`],[1,`mt-1`,`text-xs`,`leading-relaxed`,`opacity-90`],[`type`,`button`,1,`grid`,`size-8`,`shrink-0`,`place-items-center`,`rounded-md`,`text-muted-foreground`,`hover:bg-background/80`,`hover:text-foreground`,`focus-visible:outline-none`,`focus-visible:ring-2`,`focus-visible:ring-ring`,3,`click`],[1,`size-4`,3,`img`]],template:function(e,n){e&1&&(o(0,`div`,0),S(1,Rt,8,6,`div`,1,It),i()),e&2&&(T(),t(n.toast.items()))},dependencies:[z,R],encapsulation:2})}},Bt=e=>({rail:e}),Vt=()=>({rail:!1}),Ht=e=>[`/dashboard`,e],Ut=(e,t)=>t.id;function Wt(e,t){e&1&&f(0,`div`,7)}function Gt(e,n){if(e&1&&(o(0,`div`,1)(1,`div`,3),f(2,`div`,4)(3,`div`,5),o(4,`div`,6),S(5,Wt,1,0,`div`,7,ce),i(),o(7,`p`,8),f(8,`lucide-angular`,9),w(9),i()()()),e&2){let e=_();j(`aria-label`,e.t()(`shell.logout.loading`)),T(5),t(e.skeletonCards),T(3),v(`img`,e.icons.loader)(`size`,16),T(),A(` `,e.t()(`shell.logout.loading`),` `)}}function Kt(e,t){if(e&1&&(o(0,`div`,2),f(1,`lucide-angular`,9),w(2),i()),e&2){let e=_();T(),v(`img`,e.icons.loader)(`size`,16),T(),A(` `,e.t()(`shell.loading`),` `)}}function qt(e,t){}function Jt(e,t){if(e&1){let e=u();o(0,`div`,13)(1,`div`,48),n(`click`,function(){y(e);let t=_(2);return s(t.mobileOpen.set(!1))}),i(),o(2,`div`,49),n(`dismiss`,function(){y(e);let t=_(2);return s(t.mobileOpen.set(!1))}),p(3,12),i()()}if(e&2){let e=_(2),t=m(5);T(2),j(`aria-label`,e.t()(`shell.openMenu`)),T(),v(`ngTemplateOutlet`,t)(`ngTemplateOutletContext`,ee(3,Vt))}}function Yt(e,t){if(e&1&&(o(0,`span`,31),w(1),i()),e&2){let e=_(2);T(),N(e.unreadCount())}}function Xt(e,t){if(e&1){let e=u();o(0,`button`,54),n(`click`,function(){y(e);let t=_(3);return s(t.markAllRead())}),w(1),i()}if(e&2){let e=_(3);T(),N(e.t()(`shell.notif.markAll`))}}function Zt(e,t){if(e&1&&f(0,`span`,60),e&2){let e=_(4);j(`aria-label`,e.t()(`shell.notif.unread`))}}function Qt(e,t){if(e&1){let e=u();o(0,`li`)(1,`a`,55),n(`click`,function(){y(e);let t=_(3);return s(t.topMenu.set(null))}),o(2,`span`,56),f(3,`ui-icon`,57),i(),o(4,`span`,19)(5,`span`,58),w(6),i(),o(7,`span`,59),w(8),i()(),F(9,Zt,1,1,`span`,60),i()()}if(e&2){let e=t.$implicit,n=_(3);T(),v(`routerLink`,e.to),T(),k(`background`,e.bg)(`color`,e.fg),T(),v(`name`,e.icon)(`size`,20),T(3),N(e.title),T(2),N(e.body),T(),b(n.isRead(e.id)?-1:9)}}function $t(e,n){if(e&1&&(o(0,`div`,35)(1,`div`,50)(2,`p`,51),w(3),i(),F(4,Xt,2,1,`button`,52),i(),o(5,`ul`,53),S(6,Qt,10,10,`li`,null,Ut),i()()),e&2){let e=_(2);j(`aria-label`,e.t()(`shell.notif.title`)),T(3),N(e.t()(`shell.notif.title`)),T(),b(e.unreadCount()>0?4:-1),T(2),t(e.notifications())}}function en(e,t){if(e&1){let e=u();o(0,`div`,36)(1,`div`,61)(2,`p`,51),w(3),i(),o(4,`p`,62),w(5),i()(),o(6,`button`,63),n(`click`,function(){y(e);let t=_(2);return t.topMenu.set(null),s(t.openPalette())}),f(7,`ui-icon`,64),o(8,`span`,65),w(9),i(),o(10,`kbd`,66),w(11),i()(),o(12,`div`,67),f(13,`ui-icon`,68),o(14,`span`,65),w(15),i(),o(16,`span`,69),w(17),i()(),o(18,`div`,67),f(19,`ui-icon`,70),o(20,`span`,65),w(21),i(),o(22,`span`,69),w(23),i()(),o(24,`div`,71)(25,`p`,72),f(26,`ui-icon`,73),w(27),i(),o(28,`a`,74),f(29,`ui-icon`,75),w(30),i(),o(31,`a`,76),f(32,`ui-icon`,77),w(33),i()()()}if(e&2){let e=_(2);j(`aria-label`,e.t()(`shell.help.title`)),T(3),N(e.t()(`shell.help.title`)),T(2),N(e.t()(`shell.help.intro`)),T(2),v(`size`,20),T(2),N(e.t()(`shell.help.search`)),T(2),A(``,e.modKey(),` K`),T(2),v(`size`,20),T(2),N(e.t()(`shell.help.guide`)),T(2),N(e.t()(`modules.state.soon`)),T(2),v(`size`,20),T(2),N(e.t()(`shell.help.faq`)),T(2),N(e.t()(`modules.state.soon`)),T(3),v(`size`,20),T(),A(` `,e.t()(`shell.help.contact`),` `),T(),v(`href`,`mailto:`+e.cradesc.email,M),T(),v(`size`,16),T(),A(` `,e.cradesc.email,` `),T(),v(`href`,`tel:`+e.cradesc.phoneHref,M),T(),v(`size`,16),T(),A(` `,e.cradesc.phone,` `)}}function tn(e,t){if(e&1){let e=u();o(0,`button`,86),n(`click`,function(){let t=y(e).$implicit,n=_(3);return s(n.localeService.setLocale(t))}),w(1),i()}if(e&2){let e=t.$implicit,n=_(3);E(`on`,n.localeService.locale()===e),j(`aria-checked`,n.localeService.locale()===e),T(),A(` `,e.toUpperCase(),` `)}}function nn(e,t){if(e&1){let e=u();o(0,`a`,87),n(`click`,function(){y(e);let t=_(3);return s(t.topMenu.set(null))}),f(1,`ui-icon`,88),o(2,`span`,65),w(3),i()()}if(e&2){let e=_(3);T(),v(`size`,20),T(2),N(e.t()(`nav.item.utilisateurs`))}}function rn(e,t){if(e&1){let e=u();o(0,`a`,89),n(`click`,function(){y(e);let t=_(3);return s(t.topMenu.set(null))}),f(1,`ui-icon`,90),o(2,`span`,65),w(3),i()()}if(e&2){let e=_(3);T(),v(`size`,20),T(2),N(e.t()(`nav.item.referentiels`))}}function an(e,r){if(e&1){let e=u();o(0,`div`,37)(1,`p`,78),w(2),i(),o(3,`div`,79),f(4,`ui-icon`,80),o(5,`span`,65),w(6),i(),o(7,`span`,81),S(8,tn,2,4,`button`,82,P),i()(),o(10,`button`,83),n(`click`,function(){y(e);let t=_(2);return s(t.toggleCollapsed())}),f(11,`ui-icon`,57),o(12,`span`,65),w(13),i()(),F(14,nn,4,2,`a`,84),F(15,rn,4,2,`a`,85),i()}if(e&2){let e=_(2);j(`aria-label`,e.t()(`shell.settings.title`)),T(2),N(e.t()(`shell.settings.title`)),T(2),v(`size`,20),T(2),N(e.t()(`shell.settings.language`)),T(),j(`aria-label`,e.t()(`shell.settings.language`)),T(),t(e.locales),T(3),v(`name`,e.collapsed()?`left_panel_open`:`left_panel_close`)(`size`,20),T(2),N(e.collapsed()?e.t()(`shell.sidebar.expand`):e.t()(`shell.sidebar.collapse`)),T(),b(e.canSee(`user.manage`)?14:-1),T(),b(e.canSee(`config.manage`)?15:-1)}}function on(e,t){if(e&1){let e=u();o(0,`div`,45)(1,`div`,91)(2,`span`,92),w(3),i(),o(4,`div`,93)(5,`div`,94),w(6),i(),o(7,`div`,95),w(8),i()()(),f(9,`div`,96),o(10,`button`,97),n(`click`,function(){y(e);let t=_(2);return s(t.logout())}),f(11,`lucide-angular`,18),w(12),i()()}if(e&2){let e=_(2);T(3),N(e.initials()),T(3),N(e.session().name),T(2),D(` `,e.store.roleLabel(e.session().role),` · `,e.scopeLabel(),` `),T(3),v(`img`,e.icons.logOut)(`size`,18),T(),A(` `,e.t()(`shell.logout`),` `)}}function sn(e,t){if(e&1){let e=u();o(0,`div`,10)(1,`aside`,11),p(2,12),i(),F(3,Jt,4,4,`div`,13),o(4,`div`,14)(5,`header`,15)(6,`div`,16)(7,`button`,17),n(`click`,function(){y(e);let t=_();return s(t.mobileOpen.set(!0))}),f(8,`lucide-angular`,18),i(),o(9,`div`,19)(10,`span`,20),f(11,`lucide-angular`,21),o(12,`span`,22),w(13),i()()(),o(14,`div`,23)(15,`button`,24),n(`click`,function(){y(e);let t=_();return s(t.openPalette())}),f(16,`lucide-angular`,25),o(17,`span`,26),w(18),i(),o(19,`kbd`,27),w(20),i()(),o(21,`div`,28)(22,`button`,29),n(`click`,function(t){y(e);let n=_();return s(n.toggleTop(`notif`,t))}),f(23,`ui-icon`,30),F(24,Yt,2,1,`span`,31),i(),o(25,`button`,32),n(`click`,function(t){y(e);let n=_();return s(n.toggleTop(`help`,t))}),f(26,`ui-icon`,33),i(),o(27,`button`,32),n(`click`,function(t){y(e);let n=_();return s(n.toggleTop(`settings`,t))}),f(28,`ui-icon`,34),i(),F(29,$t,8,3,`div`,35),F(30,en,34,20,`div`,36),F(31,an,16,10,`div`,37),i(),o(32,`div`,38)(33,`button`,39),n(`click`,function(t){y(e);let n=_();return s(n.toggleAccountMenu(t))}),o(34,`span`,40),w(35),i(),o(36,`span`,41)(37,`span`,42),w(38),i(),o(39,`span`,43),w(40),i()(),f(41,`lucide-angular`,44),i(),F(42,on,13,7,`div`,45),i()()()(),o(43,`main`,46),f(44,`router-outlet`),i()()(),f(45,`app-command-palette`)(46,`app-toast-host`)(47,`ui-snackbar`,47)}if(e&2){let e=_(),t=m(5);T(),k(`width`,e.collapsed()?84:272,`px`),T(),v(`ngTemplateOutlet`,t)(`ngTemplateOutletContext`,c(43,Bt,e.collapsed())),T(),b(e.mobileOpen()?3:-1),T(4),j(`aria-label`,e.t()(`shell.openMenu`)),T(),v(`img`,e.icons.menu)(`size`,22),T(3),v(`img`,e.icons.scope)(`size`,14),T(2),N(e.scopeLabel()),T(2),j(`aria-label`,e.t()(`shell.searchAria`)),T(),v(`img`,e.icons.search)(`size`,18),T(2),N(e.t()(`shell.searchAria`)),T(2),A(``,e.modKey(),` K`),T(2),E(`on`,e.topMenu()===`notif`),j(`aria-label`,e.t()(`shell.notif.title`))(`aria-expanded`,e.topMenu()===`notif`),T(),v(`size`,22),T(),b(e.unreadCount()>0?24:-1),T(),E(`on`,e.topMenu()===`help`),j(`aria-label`,e.t()(`shell.help.title`))(`aria-expanded`,e.topMenu()===`help`),T(),v(`size`,22),T(),E(`on`,e.topMenu()===`settings`),j(`aria-label`,e.t()(`shell.settings.title`))(`aria-expanded`,e.topMenu()===`settings`),T(),v(`size`,22),T(),b(e.topMenu()===`notif`?29:-1),T(),b(e.topMenu()===`help`?30:-1),T(),b(e.topMenu()===`settings`?31:-1),T(2),j(`aria-label`,e.t()(`shell.accountAria`))(`aria-expanded`,e.accountMenuOpen()),T(2),A(` `,e.initials(),` `),T(3),N(e.session().name),T(2),N(e.store.roleLabel(e.session().role)),T(),v(`img`,e.icons.chevronDown)(`size`,16),T(),b(e.accountMenuOpen()?42:-1)}}function cn(e,t){if(e&1&&f(0,`app-sidebar-nav`,103),e&2){let e=_().rail,n=_();v(`session`,t)(`path`,n.path())(`badge`,n.badgeFn)(`collapsed`,e)}}function ln(e,t){if(e&1&&(o(0,`span`,107)(1,`span`,108),w(2),i(),o(3,`span`,109),w(4),i(),o(5,`span`,110),w(6),i()()),e&2){let e=_(2);T(2),N(e.t()(`auth.cradesc.carriedBy`)),T(2),N(e.cradesc.acronym),T(2),N(e.cradesc.urlLabel)}}function un(e,t){if(e&1){let e=u();o(0,`nav`,98)(1,`div`,99)(2,`a`,100),f(3,`ui-brand-logo`,101),i(),o(4,`button`,102),n(`click`,function(){y(e);let t=_();return s(t.toggleCollapsed())}),f(5,`ui-icon`,57),i()(),F(6,cn,1,4,`app-sidebar-nav`,103),o(7,`div`,104)(8,`a`,105),f(9,`img`,106),F(10,ln,7,3,`span`,107),i()()()}if(e&2){let e,n=t.rail,r=_();T(),E(`justify-between`,!n)(`flex-col`,n)(`gap-3`,n)(`px-5`,!n)(`px-2`,n),T(),v(`routerLink`,c(27,Ht,r.session().role)),j(`aria-label`,r.brand.name),T(),v(`size`,n?34:40)(`wordmark`,!n),T(),j(`aria-label`,n?r.t()(`shell.sidebar.expand`):r.t()(`shell.sidebar.collapse`))(`title`,n?r.t()(`shell.sidebar.expand`):r.t()(`shell.sidebar.collapse`))(`aria-expanded`,!n),T(),v(`name`,n?`left_panel_open`:`left_panel_close`)(`size`,22),T(),b((e=r.session())?6:-1,e),T(2),E(`justify-center`,n),v(`href`,r.cradesc.url,M),j(`aria-label`,r.t()(`auth.cradesc.visit`))(`title`,n?r.cradesc.acronym:null),T(),v(`src`,r.cradesc.emblem),T(),b(n?-1:10)}}var dn=`mbd.sidebar.collapsed`,fn=null;function pn(){return fn||=He().then(()=>void 0),fn}var mn=class t{isRead(e){return this.readIds().has(e)}markAllRead(){this.readIds.set(new Set(this.notifications().map(e=>e.id)))}canSee(e){return B(this.session(),e)}toggleTop(e,t){t.stopPropagation(),this.accountMenuOpen.set(!1),this.topMenu.update(t=>t===e?null:e)}constructor(){this.palette=d($),this.store=I(W),this.localeService=I(H),this.router=I(x),this.destroyRef=I(g),this.t=this.localeService.t,this.brand=xe,this.cradesc=me,this.skeletonCards=[0,1,2,3,4,5],this.icons={menu:Ce,search:De,chevronDown:Oe,logOut:we,loader:Ee,scope:Te},this.ready=a(!1),this.loggingOut=a(!1),this.session=r(()=>this.store.state().session),this.path=Se(this.router.events.pipe(e(e=>e instanceof se),de(e=>e.urlAfterRedirects)),{initialValue:this.router.url}),this.modKey=a(`Ctrl`),this.mobileOpen=a(!1),this.collapsed=a(!1),this.accountMenuOpen=a(!1),this.topMenu=a(null),this.locales=[`fr`,`wo`],this.readIds=a(new Set),this.notifications=r(()=>{let e=this.store.state(),t=e.session;if(!t)return[];let n=this.t(),r=[];if(B(t,`dossier.review`)||B(t,`dossier.create`)){let i=je(e.dossiers,t).filter(e=>e.status===`soumis`||e.status===`en examen`).sort((e,t)=>e.updatedAt.localeCompare(t.updatedAt));if(i.length){let e=Math.max(0,Math.floor((Date.now()-new Date(i[0].updatedAt).getTime())/864e5));r.push({id:`dossiers-${i.length}`,icon:`folder_shared`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`,title:n(`shell.notif.dossiers`,{count:i.length}),body:n(`shell.notif.dossiersBody`,{days:e}),to:`/dashboard/dossiers`})}}if(B(t,`alert.manage`)||B(t,`quality.review`)){let t=e.alerts.filter(e=>e.status===`ouvert`);if(t.length){let e=t.filter(e=>e.severity===`élevée`).length;r.push({id:`alertes-${t.length}`,icon:`warning`,bg:e?`var(--v2-erreur-bg)`:`var(--v2-attente-bg)`,fg:e?`var(--v2-erreur-fg)`:`var(--v2-attente-fg)`,title:n(`shell.notif.alerts`,{count:this.localeService.formatNumber(t.length)}),body:n(`shell.notif.alertsBody`,{critical:e}),to:`/dashboard/qualite/alertes`})}}if(B(t,`meeting.read`)){let t=new Date().toISOString(),i=e.meetings.filter(e=>e.status===`planifiée`&&e.date>=t).sort((e,t)=>e.date.localeCompare(t.date))[0];i&&r.push({id:`reunion-${i.id}`,icon:`event_upcoming`,bg:`var(--v2-sauge)`,fg:`var(--v2-foret)`,title:n(`shell.notif.meeting`,{title:i.title}),body:n(`shell.notif.meetingBody`,{date:Ne(i.date),place:i.place}),to:`/dashboard/reunions/${i.id}`})}return B(t,`data.backup`)&&r.push({id:`sauvegarde-nuit`,icon:`task_alt`,bg:`var(--v2-succes-bg)`,fg:`var(--v2-succes-fg)`,title:n(`shell.notif.backup`),body:n(`shell.notif.backupBody`),to:`/dashboard/donnees`}),r}),this.unreadCount=r(()=>this.notifications().filter(e=>!this.readIds().has(e.id)).length),this.scopeLabel=r(()=>{let e=this.session();return e?e.scope.kind===`consolidé`?this.t()(`shell.scope.consolidated`):Re(e,this.store.state().scoops):``}),this.initials=r(()=>{let e=this.session();return e?e.name.split(` `).map(e=>e[0]).slice(0,2).join(``):``}),this.badgeFn=e=>{let t=this.session();if(!t||e!==`/dashboard/qualite`)return 0;let n=Ve(this.store.state());return(B(t,`quality.review`)?n.doublons:0)+(B(t,`alert.manage`)?n.alertes:0)+(B(t,`correction.manage`)?n.corrections:0)},C(()=>{typeof navigator<`u`&&/Mac|iPhone|iPad/.test(navigator.userAgent)&&this.modKey.set(`⌘`);try{this.collapsed.set(window.localStorage.getItem(dn)===`1`)}catch{}pn().finally(()=>this.ready.set(!0));let e=e=>{let t=e.target;t instanceof Element&&(t.closest(`[data-account-menu]`)||this.accountMenuOpen.set(!1),t.closest(`[data-top-menu]`)||this.topMenu.set(null))};document.addEventListener(`click`,e),this.destroyRef.onDestroy(()=>document.removeEventListener(`click`,e))}),l(()=>{this.ready()&&!this.session()&&this.router.navigateByUrl(`/login`)}),l(()=>{this.path(),this.mobileOpen.set(!1),this.accountMenuOpen.set(!1),this.topMenu.set(null)});let t=setInterval(()=>{let e=this.session();e&&Date.now()>e.expiresAt&&this.logout()},15e3);this.destroyRef.onDestroy(()=>clearInterval(t))}toggleCollapsed(){let e=!this.collapsed();this.collapsed.set(e);try{window.localStorage.setItem(dn,e?`1`:`0`)}catch{}}toggleAccountMenu(e){e.stopPropagation(),this.topMenu.set(null),this.accountMenuOpen.update(e=>!e)}logout(){this.loggingOut()||(this.accountMenuOpen.set(!1),this.loggingOut.set(!0),window.setTimeout(()=>{Be(),this.store.actions.logout(),this.router.navigateByUrl(`/login`).finally(()=>this.loggingOut.set(!1))},450))}openPalette(){this.palette()?.show()}static{this.ɵfac=function(e){return new(e||t)}}static{this.ɵcmp=h({type:t,selectors:[[`app-layout`]],viewQuery:function(e,t){e&1&&pe(t.palette,$,5),e&2&&ie()},decls:6,vars:1,consts:[[`sidebarContent`,``],[`role`,`status`,1,`charte-v2`,`fixed`,`inset-0`,`z-[200]`,`flex`,`flex-col`],[1,`charte-v2`,`flex`,`min-h-screen`,`items-center`,`justify-center`,`gap-2`,`text-sm`,`font-semibold`,2,`color`,`var(--v2-gris-texte)`],[1,`mx-auto`,`flex`,`w-full`,`max-w-[1400px]`,`flex-1`,`flex-col`,`gap-4`,`px-4`,`py-10`,`md:px-10`],[1,`h-8`,`w-64`,`animate-pulse`,`rounded-[12px]`,2,`background`,`var(--v2-lin)`],[1,`h-4`,`w-full`,`max-w-md`,`animate-pulse`,`rounded`,2,`background`,`var(--v2-lin)`],[1,`mt-4`,`grid`,`gap-4`,`sm:grid-cols-2`,`xl:grid-cols-3`],[1,`h-32`,`animate-pulse`,`rounded-[24px]`,2,`background`,`var(--v2-lin)`],[1,`mt-auto`,`flex`,`items-center`,`justify-center`,`gap-2`,`pb-8`,`text-sm`,`font-semibold`,2,`color`,`var(--v2-gris-texte)`],[`aria-hidden`,`true`,1,`animate-spin`,3,`img`,`size`],[1,`charte-v2`,`flex`,`min-h-screen`],[1,`sidebar`,`sticky`,`top-0`,`z-30`,`hidden`,`h-svh`,`shrink-0`,`self-start`,`lg:block`],[3,`ngTemplateOutlet`,`ngTemplateOutletContext`],[1,`fixed`,`inset-0`,`z-50`,`flex`,`lg:hidden`],[1,`flex`,`min-w-0`,`flex-1`,`flex-col`],[1,`sticky`,`top-0`,`z-40`,`border-b`,`backdrop-blur`,2,`border-color`,`var(--v2-lin)`,`background`,`color-mix(in oklab, var(--v2-creme) 88%, transparent)`],[1,`flex`,`h-16`,`items-center`,`gap-2`,`px-3`,`sm:gap-3`,`sm:px-5`,`md:h-[72px]`,`md:px-10`],[`type`,`button`,1,`icon-btn`,`grid`,`shrink-0`,`lg:hidden`,2,`color`,`var(--v2-ardoise)`,3,`click`],[3,`img`,`size`],[1,`min-w-0`,`flex-1`],[1,`inline-flex`,`max-w-full`,`items-center`,`gap-2`,`truncate`,`rounded-full`,`px-3`,`py-1.5`,`text-[11px]`,`font-bold`,`uppercase`,`tracking-[0.08em]`,2,`font-family`,`var(--v2-font-mono)`,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`shrink-0`,3,`img`,`size`],[1,`truncate`],[1,`flex`,`shrink-0`,`items-center`,`gap-2`],[`type`,`button`,1,`top-btn`,`inline-flex`,`h-11`,`items-center`,`gap-2`,`rounded-[14px]`,`border`,`px-3`,`text-sm`,`font-semibold`,`xl:w-72`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`,`color`,`var(--v2-gris-texte)`,3,`click`],[`aria-hidden`,`true`,1,`shrink-0`,3,`img`,`size`],[1,`hidden`,`flex-1`,`truncate`,`text-left`,`xl:inline`],[1,`hidden`,`shrink-0`,`rounded-[8px]`,`border`,`px-1.5`,`py-0.5`,`text-[11px]`,`font-bold`,`xl:inline`,2,`font-family`,`var(--v2-font-mono)`,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-creme)`],[`data-top-menu`,``,1,`relative`,`flex`,`items-center`,`gap-1`],[`type`,`button`,`aria-haspopup`,`dialog`,1,`round-btn`,3,`click`],[`name`,`notifications`,3,`size`],[1,`count`],[`type`,`button`,`aria-haspopup`,`dialog`,1,`round-btn`,`hidden`,`sm:grid`,3,`click`],[`name`,`help`,3,`size`],[`name`,`settings`,3,`size`],[`role`,`dialog`,1,`pop`,`w-[360px]`],[`role`,`dialog`,1,`pop`,`w-[340px]`,`p-2`],[`role`,`dialog`,1,`pop`,`w-[320px]`,`p-2`],[`data-account-menu`,``,1,`relative`],[`type`,`button`,`aria-haspopup`,`menu`,1,`top-btn`,`flex`,`max-w-[12rem]`,`shrink-0`,`items-center`,`gap-2.5`,`rounded-[14px]`,`border`,`border-transparent`,`p-1`,`pr-2`,`text-left`,`sm:max-w-[14rem]`,`xl:max-w-[17rem]`,3,`click`],[1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[13px]`,`font-extrabold`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[1,`hidden`,`min-w-0`,`leading-tight`,`xl:block`],[1,`block`,`truncate`,`text-sm`,`font-bold`,2,`color`,`var(--v2-encre)`],[1,`block`,`truncate`,`text-xs`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`hidden`,`shrink-0`,`xl:block`,2,`color`,`var(--v2-gris-texte)`,3,`img`,`size`],[`role`,`menu`,1,`absolute`,`right-0`,`top-full`,`z-[60]`,`mt-2`,`w-72`,`rounded-[16px]`,`border`,`p-1.5`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`,`box-shadow`,`var(--v2-ombre-modale)`],[1,`mx-auto`,`w-full`,`max-w-[1400px]`,`flex-1`,`px-4`,`py-7`,`md:px-10`,`md:py-10`],[1,`charte-v2-snack`],[1,`absolute`,`inset-0`,2,`background`,`color-mix(in oklab, var(--v2-encre) 50%, transparent)`,3,`click`],[`role`,`dialog`,`aria-modal`,`true`,`uiModalA11y`,``,1,`relative`,`flex`,`h-full`,`w-[288px]`,`max-w-[85vw]`,`flex-col`,2,`box-shadow`,`var(--v2-ombre-modale)`,3,`dismiss`],[1,`flex`,`items-center`,`justify-between`,`gap-3`,`px-4`,`pb-2`,`pt-4`],[1,`text-[16px]`,`font-extrabold`,`tracking-[-0.01em]`],[`type`,`button`,1,`pop-link`,`text-[13px]`],[1,`max-h-[60vh]`,`overflow-y-auto`,`px-2`,`pb-2`],[`type`,`button`,1,`pop-link`,`text-[13px]`,3,`click`],[1,`notif`,3,`click`,`routerLink`],[1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-[12px]`],[3,`name`,`size`],[1,`block`,`text-[14px]`,`font-bold`,`leading-snug`],[1,`block`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-1.5`,`size-2`,`shrink-0`,`rounded-full`,2,`background`,`var(--v2-vert-pousse)`],[1,`px-3`,`pb-2`,`pt-3`],[1,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`pop-item`,3,`click`],[`name`,`search`,3,`size`],[1,`flex-1`],[1,`kbd`],[`aria-disabled`,`true`,1,`pop-item`,`is-soon`],[`name`,`menu_book`,3,`size`],[1,`soon-pill`],[`name`,`quiz`,3,`size`],[1,`mx-2`,`mt-2`,`rounded-[16px]`,`p-3`,2,`background`,`var(--v2-sauge)`],[1,`flex`,`items-center`,`gap-2`,`text-[14px]`,`font-bold`],[`name`,`support_agent`,3,`size`],[1,`pop-link`,`mt-2`,`flex`,`items-center`,`gap-2`,`text-[13px]`,3,`href`],[`name`,`mail`,3,`size`],[1,`pop-link`,`mt-1`,`flex`,`items-center`,`gap-2`,`text-[13px]`,3,`href`],[`name`,`call`,3,`size`],[1,`px-3`,`pb-2`,`pt-3`,`text-[16px]`,`font-extrabold`,`tracking-[-0.01em]`],[1,`pop-item`,`cursor-default`,`hover:bg-transparent`],[`name`,`language`,3,`size`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`type`,`button`,1,`pop-item`,`hidden`,`lg:flex`,3,`click`],[`routerLink`,`/dashboard/utilisateurs`,1,`pop-item`],[`routerLink`,`/dashboard/referentiels`,1,`pop-item`],[`type`,`button`,`role`,`radio`,3,`click`],[`routerLink`,`/dashboard/utilisateurs`,1,`pop-item`,3,`click`],[`name`,`manage_accounts`,3,`size`],[`routerLink`,`/dashboard/referentiels`,1,`pop-item`,3,`click`],[`name`,`dataset`,3,`size`],[1,`flex`,`items-center`,`gap-3`,`px-3`,`py-3`],[1,`grid`,`size-11`,`shrink-0`,`place-items-center`,`rounded-full`,`text-sm`,`font-extrabold`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[1,`min-w-0`],[1,`truncate`,`font-bold`],[1,`truncate`,`text-xs`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`my-1`,`h-px`,2,`background`,`var(--v2-separateur)`],[`type`,`button`,`role`,`menuitem`,1,`menu-item`,2,`color`,`var(--v2-erreur-fg)`,3,`click`],[1,`flex`,`h-full`,`flex-col`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[1,`flex`,`shrink-0`,`items-center`,`pb-5`,`pt-5`],[1,`rounded-[10px]`,3,`routerLink`],[`variant`,`inverse`,3,`size`,`wordmark`],[`type`,`button`,1,`icon-btn`,`rail-toggle`,`hidden`,`lg:grid`,3,`click`],[3,`session`,`path`,`badge`,`collapsed`],[1,`mt-auto`,`shrink-0`,`border-t`,`p-3`,`pb-[max(0.75rem,env(safe-area-inset-bottom))]`,2,`border-color`,`var(--v2-foret-trait)`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`cradesc-card`,`flex`,`items-center`,`gap-3`,`rounded-[16px]`,`p-2`,2,`background`,`var(--v2-blanc)`,`color`,`var(--v2-encre)`,3,`href`],[`alt`,``,`width`,`48`,`height`,`42`,1,`h-9`,`w-auto`,`shrink-0`,3,`src`],[1,`min-w-0`,`leading-tight`],[1,`block`,`text-[10px]`,`font-bold`,`uppercase`,`tracking-[0.08em]`,2,`font-family`,`var(--v2-font-mono)`,`color`,`var(--v2-foret-clair)`],[1,`block`,`text-[15px]`,`font-extrabold`,2,`color`,`var(--v2-terre)`],[1,`block`,`truncate`,`text-[11px]`,`font-semibold`,2,`color`,`var(--v2-foret-clair)`]],template:function(e,t){e&1&&(F(0,Gt,10,4,`div`,1)(1,Kt,3,3,`div`,2)(2,qt,0,0)(3,sn,48,45),fe(4,un,11,29,`ng-template`,null,0,ae)),e&2&&b(t.loggingOut()?0:t.ready()?t.session()?3:2:1)},dependencies:[ve,he,L,le,z,R,yt,$,zt,ge,ye,_e,be],styles:[`
    .icon-btn[_ngcontent-%COMP%] {
      height: 40px;
      width: 40px;
      place-items: center;
      border-radius: 12px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .rail-toggle[_ngcontent-%COMP%] {
      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);
    }
    .rail-toggle[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-carte);
      color: var(--%NS%v2-blanc);
    }
    .top-btn[_ngcontent-%COMP%] {
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .top-btn[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-trait);
    }
    .icon-btn[_ngcontent-%COMP%]:focus-visible, 
   .top-btn[_ngcontent-%COMP%]:focus-visible, 
   .menu-item[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .rail-toggle[_ngcontent-%COMP%]:focus-visible, 
   .cradesc-card[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-citron);
      outline-offset: 2px;
    }
    .menu-item[_ngcontent-%COMP%] {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 10px;
      border-radius: 12px;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .menu-item[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-sauge);
    }
    .round-btn[_ngcontent-%COMP%] {
      position: relative;
      display: grid;
      height: 44px;
      width: 44px;
      place-items: center;
      border-radius: 14px;
      color: var(--%NS%v2-ardoise);
      cursor: pointer;
      transition: background-color 0.15s ease, color 0.15s ease;
    }
    .round-btn[_ngcontent-%COMP%]:hover, 
   .round-btn.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-foret);
      box-shadow: inset 0 0 0 1px var(--%NS%v2-bord-carte);
    }
    .round-btn[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .count[_ngcontent-%COMP%] {
      position: absolute;
      top: 5px;
      right: 4px;
      min-width: 18px;
      height: 18px;
      border-radius: 999px;
      padding: 0 5px;
      font-size: 11px;
      font-weight: 800;
      line-height: 18px;
      text-align: center;
      background: var(--%NS%v2-erreur-fg);
      color: var(--%NS%v2-blanc);
      box-shadow: 0 0 0 2px var(--%NS%v2-creme);
    }
    .pop[_ngcontent-%COMP%] {
      position: absolute;
      right: 0;
      top: calc(100% + 10px);
      z-index: 60;
      max-width: calc(100vw - 24px);
      border-radius: 20px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-encre);
      box-shadow: var(--%NS%v2-ombre-modale);
      animation: _ngcontent-%COMP%_pop-in 0.18s ease both;
    }
    @keyframes _ngcontent-%COMP%_pop-in {
      from { opacity: 0; transform: translateY(-6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .notif[_ngcontent-%COMP%] {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      border-radius: 14px;
      padding: 10px;
      cursor: pointer;
    }
    .notif[_ngcontent-%COMP%]:hover, 
   .pop-item[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-sauge);
    }
    .pop-item[_ngcontent-%COMP%] {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: 12px;
      padding: 10px 12px;
      text-align: left;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .pop-item.is-soon[_ngcontent-%COMP%] {
      cursor: not-allowed;
      color: var(--%NS%v2-gris-texte);
    }
    .pop-item.is-soon[_ngcontent-%COMP%]:hover {
      background: none;
    }
    .pop-link[_ngcontent-%COMP%] {
      font-weight: 700;
      color: var(--%NS%v2-foret-clair);
      cursor: pointer;
    }
    .pop-link[_ngcontent-%COMP%]:hover {
      text-decoration: underline;
    }
    .soon-pill[_ngcontent-%COMP%] {
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 700;
      background: var(--%NS%v2-lin);
      color: var(--%NS%v2-gris-texte);
    }
    .kbd[_ngcontent-%COMP%] {
      border-radius: 8px;
      border: 1px solid var(--%NS%v2-bord-carte);
      padding: 1px 6px;
      font-family: var(--%NS%v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      background: var(--%NS%v2-creme);
    }
    .seg[_ngcontent-%COMP%] {
      display: inline-flex;
      gap: 2px;
      border-radius: 10px;
      padding: 2px;
      background: var(--%NS%v2-creme);
    }
    .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
      border-radius: 8px;
      padding: 3px 9px;
      font-size: 12px;
      font-weight: 800;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
    }
    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    @media (prefers-reduced-motion: reduce) {
      .pop[_ngcontent-%COMP%] { animation: none; }
    }
    .sidebar[_ngcontent-%COMP%] {
      transition: width 0.25s cubic-bezier(0.32, 0.72, 0, 1);
    }
    @media (prefers-reduced-motion: reduce) {
      .sidebar[_ngcontent-%COMP%] {
        transition: none;
      }
    }`]})}},hn=class e{static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=h({type:e,selectors:[[`app-layout-page`]],decls:1,vars:0,template:function(e,t){e&1&&f(0,`app-layout`)},dependencies:[mn],encapsulation:2})}};export{hn as default};