import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gn as v,gt as y,hn as b,ln as x,mn as S,mt as C,nn as w,pn as T,pt as E,qt as D,vt as O,zn as k}from"./_router-chunk-H0-n0SZI.js";import{n as ee}from"./index-B8S1FFME.js";import{l as A,n as j}from"./snackbar.component-ICe8-MWg.js";import{H as M,U as N,V as P,W as F,t as I,xt as L}from"./locale.service-Bf8_ncMo.js";import{t as R}from"./app-shell.component-CR4uAChA.js";import{t as z}from"./store.service-ZF4OfoGo.js";import{t as B}from"./pager-DPeF-1nO.js";import{n as V,t as H}from"./v2-page.styles-Blvl6ZBZ.js";import{T as U,a as W,n as G,o as K}from"./ui-CQhTckzj.js";var q=e=>({total:e}),J=e=>({count:e}),Y=e=>({name:e}),te=e=>[`/dashboard/producteurs`,e],X=(e,t)=>({name:e,date:t}),Z=e=>({fields:e}),Q=(e,t)=>t.value,ne=(e,t)=>t.id,re=(e,t)=>e=>e.field;function ie(e,n){if(e&1){let e=c();a(0,`button`,24),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.patchF({status:t.value}))}),g(1),a(2,`span`,25),g(3),r()()}if(e&2){let e=n.$implicit,t=d();y(`on`,t.f().status===e.value),C(`aria-checked`,t.f().status===e.value),_(),S(` `,t.pillLabel(e)),_(),y(`zero`,!e.count),_(),T(e.count)}}function ae(e,n){if(e&1){let e=c();a(0,`button`,26),t(`click`,function(){p(e);let t=d();return o(t.resetFilters())}),l(1,`ui-icon`,27),g(2),r()}if(e&2){let e=d();_(),f(`size`,14),_(),b(``,e.t()(`qualite.corrections.reset`),` (`,e.activeFilters(),`) `)}}function oe(e,n){if(e&1){let e=c();a(0,`tr`,33),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.openDialog(t.id))}),a(1,`td`)(2,`span`,34)(3,`span`,35),g(4),r(),a(5,`span`,36)(6,`span`,37),g(7),r(),a(8,`span`,38),g(9),r()()()(),a(10,`td`)(11,`span`,39),g(12),r(),a(13,`span`,40),g(14),r()(),a(15,`td`,41),g(16),r(),a(17,`td`,42),g(18),r(),a(19,`td`,43),g(20),r(),a(21,`td`)(22,`span`,44),g(23),r()(),a(24,`td`)(25,`span`,45)(26,`button`,46),t(`click`,function(t){let n=p(e).$implicit,r=d(2);return t.stopPropagation(),o(r.openDialog(n.id))}),l(27,`ui-icon`,47),r()()()()}if(e&2){let e=n.$implicit,t=d(2);_(4),T(t.initials(t.producerName(e.producerId))),_(3),T(t.producerName(e.producerId)),_(2),T(t.producerCode(e.producerId)),_(3),T(t.t()(`qualite.v2.corr.changes`,s(17,J,e.changes.length))),_(2),T(t.changeFields(e)),_(),f(`title`,e.motif),_(),S(` `,e.motif,` `),_(2),T(e.requester),_(2),S(` `,t.fmtDateTime(e.requestedAt),` `),_(2),x(`background`,t.tone[e.status].bg)(`color`,t.tone[e.status].fg),_(),T(t.statusText(e.status)),_(3),f(`title`,t.t()(`qualite.corrections.examine`)),C(`aria-label`,t.t()(`qualite.v2.corr.examine`,s(19,Y,t.producerName(e.producerId)))),_(),f(`size`,18)}}function se(t,n){if(t&1&&(a(0,`div`,28)(1,`table`,29)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`),g(9),r(),a(10,`th`),g(11),r(),a(12,`th`),g(13),r(),a(14,`th`),g(15),r(),a(16,`th`,30),g(17),r()()(),a(18,`tbody`),h(19,oe,28,21,`tr`,31,ne),r()()(),l(21,`ui-pagination`,32)),t&2){let t=d();_(5),T(t.t()(`qualite.corrections.col.producer`)),_(2),T(t.t()(`qualite.corrections.col.changes`)),_(2),T(t.t()(`qualite.corrections.col.motif`)),_(2),T(t.t()(`qualite.corrections.col.requester`)),_(2),T(t.t()(`qualite.corrections.col.date`)),_(2),T(t.t()(`qualite.corrections.col.status`)),_(2),T(t.t()(`organisations.col.actions`)),_(2),e(t.pager.items()),_(2),f(`pager`,t.pager)}}function ce(e,t){if(e&1&&(a(0,`div`,22)(1,`span`,48),l(2,`ui-icon`,49),r(),a(3,`p`,50),g(4),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),T(e.t()(`qualite.corrections.empty`))}}function le(e,n){if(e&1){let e=c();a(0,`div`,53)(1,`span`,35),g(2),r(),a(3,`span`,64)(4,`a`,65),t(`click`,function(){p(e);let t=d(2);return o(t.closeDialog())}),g(5),r(),a(6,`span`,66),g(7),r()(),a(8,`span`,44),g(9),r()()}if(e&2){let e=n,t=d(),r=d();_(2),T(r.initials(e.firstName+` `+e.lastName)),_(2),f(`routerLink`,s(11,te,e.id)),_(),b(``,e.firstName,` `,e.lastName),_(2),b(``,e.code,` · `,r.t()(`qualite.corrections.dialog.requestedBy`,D(13,X,t.requester,r.fmtDateTime(t.requestedAt)))),_(),x(`background`,r.tone[t.status].bg)(`color`,r.tone[t.status].fg),_(),T(r.statusText(t.status))}}function ue(e,t){if(e&1&&(a(0,`div`,55)(1,`span`,67),g(2),r(),a(3,`span`,68)(4,`span`,69),g(5),r(),l(6,`ui-icon`,70),a(7,`span`,71),g(8),r()()()),e&2){let e=t.$implicit,n=d(2);_(2),T(e.field),_(3),T(n.showVal(e.field,e.from)),_(),f(`size`,16),_(2),T(n.showVal(e.field,e.to))}}function de(e,t){if(e&1&&(a(0,`p`,58),l(1,`ui-icon`,72),g(2),r()),e&2){let e=d(),n=d();_(),f(`size`,18),_(),S(``,n.t()(`qualite.corrections.dialog.motifWarn`,s(3,Z,e.changes.map(E(2,re,t)).join(`, `))),` `)}}function fe(e,n){if(e&1){let e=c();a(0,`div`)(1,`label`,73),g(2),r(),a(3,`p`,74),g(4),r(),a(5,`textarea`,75),t(`input`,function(t){p(e);let n=d(2);return o(n.decisionComment.set(t.target.value))}),r()()}if(e&2){let e=d(2);_(2),T(e.t()(`qualite.corrections.dialog.decisionLabel`)),_(2),T(e.t()(`qualite.corrections.dialog.decisionHint`)),_(),f(`placeholder`,e.t()(`qualite.corrections.dialog.decisionPlaceholder`))(`value`,e.decisionComment())}}function pe(e,t){if(e&1&&(a(0,`span`,78),g(1),r()),e&2){let e=d(2);_(),S(`« `,e.decisionComment,` »`)}}function me(e,t){if(e&1&&(a(0,`p`,76),l(1,`ui-icon`,77),a(2,`span`),g(3),O(4,pe,2,1,`span`,78),r()()),e&2){let e=d(),t=d();x(`background`,t.tone[e.status].bg)(`color`,t.tone[e.status].fg),_(),f(`name`,e.status===`approuvée`?`task_alt`:`close`)(`size`,18),_(2),v(` `,t.statusText(e.status),` `,t.t()(`qualite.corrections.dialog.decidedBy`,s(10,Y,e.decidedBy??``)),` `,t.fmtDateTime(e.decidedAt??``),` `),_(),m(e.decisionComment?4:-1)}}function he(e,n){if(e&1){let e=c();a(0,`div`,62)(1,`button`,79),t(`click`,function(){p(e);let t=d(2);return o(t.decide(!1))}),g(2),r(),a(3,`button`,80),t(`click`,function(){p(e);let t=d(2);return o(t.decide(!0))}),g(4),a(5,`span`,81),l(6,`ui-icon`,82),r()()()}if(e&2){let e=d(2);_(),f(`disabled`,e.decisionComment().trim().length<3),_(),S(` `,e.t()(`qualite.corrections.dialog.refuse`),` `),_(2),S(` `,e.t()(`qualite.corrections.dialog.approve`)),_(2),f(`size`,18)}}function ge(e,n){if(e&1){let e=c();a(0,`button`,83),t(`click`,function(){p(e);let t=d(2);return o(t.closeDialog())}),g(1),r()}if(e&2){let e=d(2);_(),S(` `,e.t()(`common.close`),` `)}}function _e(n,i){if(n&1){let e=c();a(0,`ui-modal`,51),t(`closed`,function(){p(e);let t=d();return o(t.closeDialog())}),a(1,`div`,52),O(2,le,10,16,`div`,53),a(3,`div`,54),h(4,ue,9,4,`div`,55,w),r(),a(6,`div`)(7,`p`,56),g(8),r(),a(9,`p`,57),g(10),r()(),O(11,de,3,5,`p`,58),O(12,fe,6,4,`div`)(13,me,5,12,`p`,59),a(14,`p`,60),g(15),a(16,`a`,61),t(`click`,function(){p(e);let t=d();return o(t.closeDialog())}),g(17),r(),g(18,`. `),r()(),O(19,he,7,4,`div`,62)(20,ge,2,1,`button`,63),r()}if(n&2){let t,n=i,r=d();f(`open`,!0)(`title`,r.t()(`qualite.corrections.dialog.title`))(`description`,r.t()(`qualite.corrections.dialog.description`))(`width`,680)(`closeLabel`,r.t()(`common.close`)),_(2),m((t=r.openProd())?2:-1,t),_(2),e(n.changes),_(4),T(r.t()(`qualite.corrections.dialog.motif`)),_(2),S(`« `,n.motif,` »`),_(),m(r.motifWarn(n)?11:-1),_(),m(n.status===`en attente`?12:13),_(3),S(` `,r.t()(`qualite.corrections.dialog.trace`),` `),_(2),T(r.t()(`qualite.corrections.dialog.auditLink`)),_(2),m(n.status===`en attente`?19:20)}}var $=`__all`,ve=864e5,ye={Téléphone:N,CNI:M},be={"en attente":`qualite.corrections.statusValue.en attente`,approuvée:`qualite.corrections.statusValue.approuvée`,refusée:`qualite.corrections.statusValue.refusée`},xe={"en attente":H.attente,approuvée:H.succes,refusée:H.erreur},Se=class o{constructor(){this.store=k(z),this.locale=k(I),this.t=this.locale.t,this.ALL=$,this.nf=F,this.fmtDateTime=P,this.tone=xe,this.initials=V,this.snackbar=k(j),this.f=i({status:`en attente`,scoop:$,field:$,q:``}),this.sort=i(`recent`),this.openId=i(void 0),this.decisionComment=i(``),this.scoped=n(()=>{let e=this.store.state();return new Set(L(e.producers,e.session).map(e=>e.id))}),this.prodMap=n(()=>{let e=this.store.state();return new Map(e.producers.map(e=>[e.id,e]))}),this.fields=n(()=>{let e=this.store.state();return[...new Set(e.corrections.flatMap(e=>e.changes.map(e=>e.field)))].sort()}),this.scoops=n(()=>this.store.state().scoops),this.counts=n(()=>{let e=this.store.state(),t=this.scoped(),n=e.corrections.filter(e=>t.has(e.producerId));return{pending:n.filter(e=>e.status===`en attente`).length,approved:n.filter(e=>e.status===`approuvée`).length,refused:n.filter(e=>e.status===`refusée`).length,total:n.length}}),this.statusPills=n(()=>{let e=this.counts();return[{value:$,labelKey:`qualite.common.all`,count:e.total,tone:`neutral`},{value:`en attente`,labelKey:`qualite.corrections.status.en attente`,count:e.pending,tone:`warning`},{value:`approuvée`,labelKey:`qualite.corrections.status.approuvée`,count:e.approved,tone:`success`},{value:`refusée`,labelKey:`qualite.corrections.status.refusée`,count:e.refused,tone:`danger`}]}),this.rows=n(()=>{let e=this.store.state(),t=this.scoped(),n=this.prodMap(),{status:r,scoop:i,field:a,q:o}=this.f(),s=this.sort(),c=o.trim().toLowerCase();return e.corrections.filter(e=>t.has(e.producerId)).filter(e=>r===$||e.status===r).filter(e=>a===$||e.changes.some(e=>e.field===a)).filter(e=>i===$||n.get(e.producerId)?.scoopId===i).filter(e=>{if(!c)return!0;let t=n.get(e.producerId);return`${t?.code??``} ${t?.firstName??``} ${t?.lastName??``}`.toLowerCase().includes(c)}).sort((e,t)=>s===`recent`?t.requestedAt.localeCompare(e.requestedAt):e.requestedAt.localeCompare(t.requestedAt))}),this.activeFilters=n(()=>{let{scoop:e,field:t,q:n}=this.f();return(e===$?0:1)+(t===$?0:1)+ +!!n.trim()}),this.scoopOptions=n(()=>{let e=this.store.state(),t=L(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session);return[{value:$,label:this.t()(`qualite.corrections.scoopAll`)},...t.map(e=>({value:e.id,label:e.name}))]}),this.fieldOptions=n(()=>[{value:$,label:this.t()(`qualite.v2.corr.fieldAll`)},...this.fields().map(e=>({value:e,label:e}))]),this.sortOptions=n(()=>[{value:`recent`,label:this.t()(`qualite.corrections.sort.recent`)},{value:`old`,label:this.t()(`qualite.corrections.sort.old`)}]),this.stats=n(()=>{let e=this.t(),t=this.counts(),n=this.store.state(),r=this.scoped(),i=n.corrections.filter(e=>r.has(e.producerId)),a=i.filter(e=>e.status===`en attente`).sort((e,t)=>e.requestedAt.localeCompare(t.requestedAt)),o=a[0]?Math.max(0,Math.floor((Date.now()-new Date(a[0].requestedAt).getTime())/ve)):null,s=new Map;for(let e of i)for(let t of e.changes)s.set(t.field,(s.get(t.field)??0)+1);let c=[...s].sort((e,t)=>t[1]-e[1])[0];return[{label:e(`qualite.v2.corr.stat.pending`),value:F.format(t.pending),sub:o===null?e(`qualite.v2.corr.stat.pendingNone`):e(`qualite.v2.corr.stat.pendingSub`,{days:o}),icon:`edit`,bg:``,fg:``},{label:e(`qualite.v2.corr.stat.approved`),value:F.format(t.approved),sub:e(`qualite.v2.corr.stat.approvedSub`),icon:`task_alt`,...H.succes},{label:e(`qualite.v2.corr.stat.refused`),value:F.format(t.refused),sub:e(`qualite.v2.corr.stat.refusedSub`),icon:`close`,...H.erreur},{label:e(`qualite.v2.corr.stat.field`),value:c?F.format(c[1]):`—`,sub:c?.[0]??`—`,icon:`analytics`,...H.culture}]}),this.open=n(()=>{let e=this.openId();if(e)return this.store.state().corrections.find(t=>t.id===e)}),this.openProd=n(()=>{let e=this.open();if(e)return this.prodMap().get(e.producerId)}),this.pager=B(()=>this.rows())}patchF(e){this.f.set({...this.f(),...e})}setStatusFilter(e){this.patchF({status:e})}resetFilters(){this.patchF({scoop:$,field:$,q:``})}prodOf(e){return this.prodMap().get(e)}producerName(e){let t=this.prodOf(e);return t?`${t.firstName} ${t.lastName}`:this.t()(`qualite.common.notProvided`)}producerCode(e){return this.prodOf(e)?.code??``}changeFields(e){return e.changes.map(e=>e.field).join(`, `)}showVal(e,t){if(e===`Téléphone`&&t&&this.store.can(`contact.read`))return t;let n=ye[e];return n?t?n(t):this.t()(`qualite.common.notProvided`):t||this.t()(`qualite.common.notProvided`)}motifWarn(e){let t={téléphone:[`téléphone`,`numero`,`numéro`,`phone`],âge:[`âge`,`age`,`ans`,`identité`,`cni`],nom:[`nom`,`patronyme`,`orthograph`],"statut d'adhésion":[`adhésion`,`membre`,`statut`]},n=e.changes.map(e=>e.field.toLowerCase()),r=e.motif.toLowerCase();return!n.every(e=>(Object.entries(t).find(([t])=>e.includes(t))?.[1]??[e]).some(e=>r.includes(e)))}openDialog(e){this.openId.set(e),this.decisionComment.set(``)}closeDialog(){this.openId.set(void 0),this.decisionComment.set(``)}pillLabel(e){return this.t()(e.labelKey)}statusText(e){return this.t()(be[e])}decide(e){let t=this.open();if(!t)return;let n=this.decisionComment().trim();!e&&n.length<3||(this.store.actions.decideCorrection(t.id,e,n||`Approuvée après vérification du justificatif.`),this.closeDialog(),e?this.snackbar.success(this.t()(`qualite.v2.corr.approved`)):this.snackbar.info(this.t()(`qualite.v2.corr.refused`)))}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-qualite-corrections-page`]],decls:31,vars:26,consts:[[`perm`,`correction.manage`,3,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`rise`,`mt-8`,3,`stats`],[1,`card`,`mt-6`,`p-2`],[1,`toolbar`,`p-0`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[1,`mt-2`,`grid`,`gap-2`,`sm:grid-cols-3`],[`variant`,`compact`,`leadingIcon`,`apartment`,3,`valueChange`,`label`,`options`,`value`],[`variant`,`compact`,`leadingIcon`,`edit`,3,`valueChange`,`label`,`options`,`value`],[`variant`,`compact`,`leadingIcon`,`event_note`,3,`valueChange`,`label`,`options`,`value`],[1,`mt-4`,`flex`,`flex-wrap`,`items-center`,`gap-2`],[`aria-live`,`polite`,1,`sub`],[1,`tabular-nums`,2,`color`,`var(--v2-encre)`],[`type`,`button`,1,`reveal`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[`icon`,`edit`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[`type`,`button`,1,`reveal`,3,`click`],[`name`,`close`,3,`size`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[920px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`],[1,`min-w-0`],[1,`block`,`truncate`,`font-bold`],[1,`mono`,`block`,2,`color`,`var(--v2-gris-texte)`],[1,`block`,`font-bold`],[1,`sub`,`block`,`max-w-48`,`truncate`],[1,`max-w-64`,`truncate`,2,`color`,`var(--v2-ardoise)`,3,`title`],[1,`font-medium`],[1,`whitespace-nowrap`,`tabular-nums`,2,`color`,`var(--v2-gris-texte)`],[1,`badge`],[1,`flex`,`justify-end`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`task_alt`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[`icon`,`edit`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-4`,`pb-5`],[1,`flex`,`items-center`,`gap-3`,`rounded-[18px]`,`p-3`,2,`background`,`var(--v2-creme)`],[1,`grid`,`gap-2`],[1,`chg`],[1,`lbl`],[1,`mt-1`,`text-[15px]`,`font-semibold`],[1,`notice`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`notice`,3,`background`,`color`],[1,`sub`],[`routerLink`,`/dashboard/audit`,1,`font-bold`,`underline`,`underline-offset-4`,3,`click`],[`modal-footer`,``,1,`contents`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`font-extrabold`,`underline-offset-4`,`hover:underline`,3,`click`,`routerLink`],[1,`sub`,`block`],[1,`font-extrabold`],[1,`flex`,`flex-wrap`,`items-center`,`gap-2`,`tabular-nums`],[1,`from`],[`name`,`arrow_forward`,2,`color`,`var(--v2-gris-texte)`,3,`size`],[1,`to`],[`name`,`warning`,3,`size`],[`for`,`decision`,1,`lbl`],[1,`sub`,`mt-1`],[`id`,`decision`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[1,`notice`],[3,`name`,`size`],[1,`block`,`font-semibold`],[`type`,`button`,1,`btn`,`btn-danger`,3,`click`,`disabled`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),g(3),r(),a(4,`h1`,3),g(5),r(),a(6,`p`,4),g(7),r()(),l(8,`ui-stat-cards`,5),a(9,`div`,6)(10,`div`,7)(11,`label`,8),l(12,`ui-icon`,9),a(13,`input`,10),t(`input`,function(e){return i.patchF({q:e.target.value})}),r()(),a(14,`div`,11),h(15,ie,4,7,`button`,12,Q),r()(),a(17,`div`,13)(18,`ui-select`,14),t(`valueChange`,function(e){return i.patchF({scoop:e})}),r(),a(19,`ui-select`,15),t(`valueChange`,function(e){return i.patchF({field:e})}),r(),a(20,`ui-select`,16),t(`valueChange`,function(e){return i.sort.set(e)}),r()()(),a(21,`div`,17)(22,`p`,18)(23,`b`,19),g(24),r(),g(25),r(),O(26,ae,3,3,`button`,20),r(),a(27,`section`,21),O(28,se,22,8)(29,ce,5,2,`div`,22),r(),O(30,_e,21,13,`ui-modal`,23),r()),n&2){let t;f(`area`,i.t()(`qualite.corrections.area`)),_(3),T(i.t()(`qualite.header.title`)),_(2),S(` `,i.t()(`qualite.nav.corrections`),` `),_(2),S(` `,i.t()(`qualite.corrections.description`),` `),_(),f(`stats`,i.stats()),_(4),f(`size`,20),_(),f(`placeholder`,i.t()(`qualite.corrections.searchPlaceholder`))(`value`,i.f().q),C(`aria-label`,i.t()(`qualite.corrections.searchAria`)),_(),C(`aria-label`,i.t()(`qualite.corrections.col.status`)),_(),e(i.statusPills()),_(3),f(`label`,i.t()(`qualite.corrections.scoopLabel`))(`options`,i.scoopOptions())(`value`,i.f().scoop),_(),f(`label`,i.t()(`qualite.corrections.fieldLabel`))(`options`,i.fieldOptions())(`value`,i.f().field),_(),f(`label`,i.t()(`qualite.corrections.sortAria`))(`options`,i.sortOptions())(`value`,i.sort()),_(4),T(i.nf.format(i.rows().length)),_(),S(` `,i.t()(`qualite.corrections.ofTotal`,s(24,q,i.nf.format(i.counts().total))),` `),_(),m(i.activeFilters()>0?26:-1),_(2),m(i.rows().length?28:29),_(2),m((t=i.open())?30:-1,t)}},dependencies:[R,A,U,W,ee,K,G],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.chg[_ngcontent-%COMP%] {
        display: grid;
        gap: 6px;
        border-radius: 16px;
        border: 1px solid var(--%NS%v2-bord-carte);
        padding: 12px 14px;
      }
      @media (min-width: 640px) {
        .chg[_ngcontent-%COMP%] {
          grid-template-columns: 9rem 1fr;
          align-items: center;
        }
      }
      .from[_ngcontent-%COMP%] {
        border-radius: 8px;
        background: var(--%NS%v2-lin);
        padding: 2px 8px;
        color: var(--%NS%v2-gris-texte);
        text-decoration: line-through;
      }
      .to[_ngcontent-%COMP%] {
        border-radius: 8px;
        background: var(--%NS%v2-sauge);
        padding: 2px 8px;
        font-weight: 800;
        color: var(--%NS%v2-vert-pousse);
      }`]})}};export{Se as default};