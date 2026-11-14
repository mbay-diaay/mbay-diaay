import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,Qt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,en as g,fn as _,ft as v,ln as y,mn as b,pn as x,qt as ee,vt as S,zn as C}from"./_router-chunk-H0-n0SZI.js";import{n as w}from"./index-B8S1FFME.js";import{l as T,n as E}from"./snackbar.component-ICe8-MWg.js";import{R as D,V as O,W as k,a as A,i as j,o as M,r as N,t as P}from"./locale.service-Bf8_ncMo.js";import{a as F,n as I,o as L,t as R}from"./workbook-DRfzSQbC.js";import{t as z}from"./app-shell.component-CR4uAChA.js";import{t as B}from"./store.service-ZF4OfoGo.js";import{t as V}from"./v2-page.styles-Blvl6ZBZ.js";import{T as H,n as U}from"./ui-CQhTckzj.js";var W=(e,t)=>({date:e,user:t}),G=e=>({file:e}),K=e=>({date:e}),q=(e,t)=>t.key,J=(e,t)=>t.label;function Y(e,t){if(e&1&&(a(0,`p`,6),l(1,`ui-icon`,33),_(2),r()),e&2){let e=f();v(),p(`size`,18),v(),b(``,e.t()(`sauvegarde.notice.noNominatif`),` `)}}function X(e,t){if(e&1&&(a(0,`p`,6),l(1,`ui-icon`,33),_(2),r()),e&2){let e=f();v(),p(`size`,18),v(),b(``,e.t()(`sauvegarde.notice.noCni`),` `)}}function Z(e,n){if(e&1){let e=c();a(0,`li`,18)(1,`span`,11),l(2,`ui-icon`,34),r(),a(3,`span`,35),_(4),r(),a(5,`span`,36),_(6),r(),a(7,`button`,37),t(`click`,function(){let t=m(e).$implicit,n=f();return o(n.exportCsv(t.key))}),l(8,`ui-icon`,15),_(9),r()()}if(e&2){let e=n.$implicit,t=f();v(2),p(`size`,18),v(2),x(e.label),v(2),x(t.nf.format(e.n)),v(2),p(`size`,16),v(),b(``,t.t()(`sauvegarde.export.csvButton`),` `)}}function Q(e,t){if(e&1&&_(0),e&2){let e=t,n=f();b(` `,n.t()(`sauvegarde.backup.last`,ee(1,W,n.fmtDateTime(e.at),e.user)),` `)}}function te(e,t){if(e&1&&_(0),e&2){let e=f();b(` `,e.t()(`sauvegarde.backup.none`),` `)}}function ne(e,t){if(e&1&&(a(0,`tr`)(1,`td`,44),_(2),r(),a(3,`td`,45),_(4),r(),a(5,`td`,46),_(6),r()()),e&2){let e=t.$implicit,n=f(2);v(2),x(e.label),v(2),x(n.nf.format(e.now)),v(),y(`color`,e.after===e.now?null:`var(--v2-attente-fg)`),v(),b(` `,n.nf.format(e.after),` `)}}function re(n,i){if(n&1){let e=c();a(0,`ui-modal`,38),t(`closed`,function(){m(e);let t=f();return o(t.pending.set(null))}),a(1,`div`,39)(2,`table`,40)(3,`thead`)(4,`tr`),l(5,`th`),a(6,`th`,41),_(7),r(),a(8,`th`,41),_(9),r()()(),a(10,`tbody`),g(11,ne,7,5,`tr`,null,J),r()()(),a(13,`button`,42),t(`click`,function(){m(e);let t=f();return o(t.pending.set(null))}),_(14),r(),a(15,`button`,43),t(`click`,function(){m(e);let t=f();return o(t.confirmRestore())}),_(16),r()()}if(n&2){let t=i,n=f();p(`open`,!0)(`title`,n.t()(`sauvegarde.confirm.title`,s(9,G,t.file)))(`description`,n.t()(`sauvegarde.confirm.description`,s(11,K,n.fmtDateTime(t.snap.exportedAt))))(`width`,560)(`closeLabel`,n.t()(`common.close`)),v(7),x(n.t()(`sauvegarde.confirm.current`)),v(2),x(n.t()(`sauvegarde.confirm.after`)),v(2),e(t.rows),v(3),b(` `,n.t()(`sauvegarde.confirm.cancel`),` `),v(2),b(` `,n.t()(`sauvegarde.confirm.action`),` `)}}var $=[...F],ie=class s{constructor(){this.store=C(B),this.locale=C(P),this.t=this.locale.t,this.fmtDateTime=O,this.nf=k,this.snackbar=C(E),this.pending=i(null),this.stats=n(()=>{let e=this.t(),t=this.currentCounts();return[{label:e(`sauvegarde.volume.producteurs`),value:k.format(t.producers),sub:`${k.format(t.orgs)} ${e(`sauvegarde.volume.organisations`).toLowerCase()}`,icon:`agriculture`,bg:``,fg:``},{label:e(`sauvegarde.volume.parcelles`),value:k.format(t.plots),sub:e(`sauvegarde.export.single`),icon:`landscape`,...V.succes},{label:e(`sauvegarde.volume.alertes`),value:k.format(t.alerts),sub:`${k.format(t.cases)} ${e(`sauvegarde.volume.doublons`).toLowerCase()}`,icon:`warning`,...V.attente},{label:e(`sauvegarde.volume.journal`),value:k.format(t.audit),sub:this.lastBackup()?e(`sauvegarde.backup.last`,{date:O(this.lastBackup().at),user:this.lastBackup().user}):e(`sauvegarde.backup.none`),icon:`receipt_long`,...V.info}]}),this.EXTRA=[{key:`alertes`,labelKey:`sauvegarde.extra.alertes`},{key:`doublons`,labelKey:`sauvegarde.extra.doublons`},{key:`corrections`,labelKey:`sauvegarde.extra.corrections`},{key:`journal`,labelKey:`sauvegarde.extra.journal`}],this.nominatif=n(()=>j(this.store.state().session,`producer.export_nominatif`)),this.cni=n(()=>j(this.store.state().session,`identity.read_full`)),this.lastBackup=n(()=>this.store.state().audit.find(e=>e.action===`Sauvegarde complète`)),this.exportRows=n(()=>{let e=this.store.state(),t={orgs:e.orgs.length,producers:e.producers.filter(e=>!e.mergedInto).length,plots:e.plots.length,alertes:e.alerts.length,doublons:e.cases.length,corrections:e.corrections.length,journal:e.audit.length},n={organisations:t.orgs,producteurs:t.producers,parcelles:t.plots},r=[];for(let e of $)r.push({key:e,label:L[e].label,n:n[e]});for(let e of this.EXTRA)r.push({key:e.key,label:this.t()(e.labelKey),n:t[e.key]});return r})}extraRows(e){let t=A(),n=new Map(t.producers.map(e=>[e.id,e.code])),r=new Map(t.plots.map(e=>[e.id,e.code]));return e===`alertes`?[[`Type`,`Sévérité`,`Concerne`,`Code`,`Statut`,`Enquêteur`,`Détail`,`Commentaire`],...t.alerts.map(e=>[e.type,e.severity,e.entity,(e.entity===`parcelle`?r.get(e.entityId):n.get(e.entityId))??``,e.status,e.enumerator,e.detail,e.comment??``])]:e===`doublons`?[[`Cas`,`Fiche A`,`Fiche B`,`Score`,`Statut`,`Signaux`,`Commentaire`],...t.cases.map(e=>[e.id.toUpperCase(),n.get(e.aId)??``,n.get(e.bId)??``,e.score,e.status,e.signals.map(e=>e.label).join(` | `),e.comment??``])]:e===`corrections`?[[`Producteur`,`Demandeur`,`Date`,`Champs`,`Motif`,`Statut`,`Décision`],...t.corrections.map(e=>[n.get(e.producerId)??``,e.requester,e.requestedAt,e.changes.map(e=>e.field).join(`, `),e.motif,e.status,e.decisionComment??``])]:[[`Date`,`Utilisateur`,`Action`,`Entité`,`Détail`],...t.audit.map(e=>[e.at,e.user,e.action,e.entity,e.detail])]}async exportAll(){let e=A(),t={nominatif:this.nominatif(),cni:this.cni()},n=[...$.map(n=>({name:L[n].sheet,rows:I(n,e,t)})),...this.EXTRA.map(e=>({name:this.frExtraLabel(e.key),rows:this.extraRows(e.key)}))],r=()=>new Date().toISOString().slice(0,10);try{await R(`mbay_diaay_export_${r()}.xlsx`,n)}catch{this.snackbar.error(this.t()(`common.exportError`));return}N.audit(t.nominatif?`Export nominatif`:`Export anonymisé`,`Toutes les données`,`Classeur Excel complet`),this.snackbar.success(`${this.t()(`sauvegarde.exportAll.done`)} · ${this.t()(`sauvegarde.exportAll.doneHint`)}`)}frExtraLabel(e){return{alertes:`Alertes`,doublons:`Doublons`,corrections:`Demandes de correction`,journal:`Journal d'audit`}[e]}exportCsv(e){let t=A(),n={nominatif:this.nominatif(),cni:this.cni()},r=()=>new Date().toISOString().slice(0,10),i=$.includes(e);D(`${e}_${r()}.csv`,i?I(e,t,n):this.extraRows(e)),N.audit(i&&n.nominatif?`Export nominatif`:`Export`,i?L[e].label:this.frExtraLabel(e),`CSV`)}backup(){let e=N.exportSnapshot(),t=document.createElement(`a`);t.href=URL.createObjectURL(new Blob([JSON.stringify(e)],{type:`application/json`})),t.download=`mbay_diaay_sauvegarde_${new Date().toISOString().slice(0,10)}.json`,t.click(),URL.revokeObjectURL(t.href),this.snackbar.success(`${this.t()(`sauvegarde.backup.done`)} · ${this.t()(`sauvegarde.backup.doneHint`)}`)}async onRestoreFile(e){let t=e.target,n=t.files?.[0];if(n)try{let e=JSON.parse(await n.text());if(!M(e))throw Error(this.t()(`sauvegarde.restore.notBackup`));let t=e.data,r=this.currentCounts(),i=this.t();this.pending.set({file:n.name,snap:e,rows:[{label:i(`sauvegarde.volume.organisations`),now:r.orgs,after:t.orgs.length},{label:i(`sauvegarde.volume.producteurs`),now:r.producers,after:t.producers.filter(e=>!e.mergedInto).length},{label:i(`sauvegarde.volume.parcelles`),now:r.plots,after:t.plots.length},{label:i(`sauvegarde.volume.alertes`),now:r.alerts,after:t.alerts.length},{label:i(`sauvegarde.volume.doublons`),now:r.cases,after:t.cases.length},{label:i(`sauvegarde.volume.journal`),now:r.audit,after:t.audit.length}]})}catch(e){this.snackbar.error(`${this.t()(`sauvegarde.restore.failed`)} : ${e instanceof Error?e.message:this.t()(`sauvegarde.restore.unreadable`)}`)}finally{t.value=``}}confirmRestore(){let e=this.pending();e&&(N.restoreSnapshot(e.snap),this.pending.set(null),this.snackbar.success(this.t()(`sauvegarde.restore.done`)))}currentCounts(){let e=this.store.state();return{orgs:e.orgs.length,producers:e.producers.filter(e=>!e.mergedInto).length,plots:e.plots.length,alerts:e.alerts.length,cases:e.cases.length,audit:e.audit.length}}static{this.ɵfac=function(e){return new(e||s)}}static{this.ɵcmp=d({type:s,selectors:[[`app-donnees-page`]],decls:67,vars:29,consts:[[`fileInput`,``],[`perm`,`data.backup`,3,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`notice`,`mt-4`,2,`background`,`var(--v2-info-bg)`,`color`,`var(--v2-info-fg)`],[1,`rise`,`mt-8`,3,`stats`],[1,`grid-main`,`mt-6`],[1,`sec-card`],[1,`sec-head`],[1,`sec-ico`],[`name`,`table_view`,3,`size`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`download`,3,`size`],[1,`sub`,`border-t`,`px-5`,`py-3`,2,`border-color`,`var(--v2-separateur)`],[1,`lbl`,`px-5`,`pb-2`,`pt-3`],[1,`ent`],[1,`grid`,`gap-4`],[`name`,`archive`,3,`size`],[1,`border-t`,`p-5`,2,`border-color`,`var(--v2-separateur)`],[1,`sub`],[`type`,`button`,1,`btn`,`btn-primary`,`mt-4`,3,`click`],[1,`sub`,`mt-3`,`flex`,`items-center`,`gap-1.5`],[`name`,`event_note`,3,`size`],[1,`sec-ico`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`upload_file`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`,`mt-4`,3,`click`],[`type`,`file`,`accept`,`.json,application/json`,1,`sr-only`,3,`change`],[1,`sub`,`mt-3`],[`routerLink`,`/dashboard/imports`,1,`font-bold`,`underline`,`underline-offset-4`],[`tone`,`danger`,`icon`,`upload_file`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`name`,`info`,3,`size`],[`name`,`description`,3,`size`],[1,`min-w-0`,`flex-1`,`font-bold`],[1,`sub`,`tabular-nums`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`38px`,`padding`,`0 12px`,3,`click`],[`tone`,`danger`,`icon`,`upload_file`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`mb-5`,`overflow-hidden`,`rounded-[16px]`,`border`,2,`border-color`,`var(--v2-bord-carte)`],[1,`cmp`,`w-full`],[1,`text-right`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`],[1,`font-semibold`],[1,`text-right`,`tabular-nums`],[1,`text-right`,`font-extrabold`,`tabular-nums`]],template:function(n,i){if(n&1){let e=c();a(0,`app-shell`,1)(1,`header`,2)(2,`p`,3),_(3),r(),a(4,`h1`,4),_(5),r(),a(6,`p`,5),_(7),r()(),S(8,Y,3,2,`p`,6),S(9,X,3,2,`p`,6),l(10,`ui-stat-cards`,7),a(11,`div`,8)(12,`section`,9)(13,`div`,10)(14,`h2`)(15,`span`,11),l(16,`ui-icon`,12),r(),_(17),r(),a(18,`button`,13),t(`click`,function(){return i.exportAll()}),_(19),a(20,`span`,14),l(21,`ui-icon`,15),r()()(),a(22,`p`,16),_(23),r(),a(24,`p`,17),_(25),r(),a(26,`ul`),g(27,Z,10,5,`li`,18,q),r()(),a(29,`div`,19)(30,`section`,9)(31,`div`,10)(32,`h2`)(33,`span`,11),l(34,`ui-icon`,20),r(),_(35),r()(),a(36,`div`,21)(37,`p`,22),_(38),r(),a(39,`button`,23),t(`click`,function(){return i.backup()}),_(40),a(41,`span`,14),l(42,`ui-icon`,15),r()(),a(43,`p`,24),l(44,`ui-icon`,25),S(45,Q,1,4)(46,te,1,1),r()()(),a(47,`section`,9)(48,`div`,10)(49,`h2`)(50,`span`,26),l(51,`ui-icon`,27),r(),_(52),r()(),a(53,`div`,21)(54,`p`,22),_(55),r(),a(56,`button`,28),t(`click`,function(){m(e);let t=u(60);return o(t.click())}),l(57,`ui-icon`,27),_(58),r(),a(59,`input`,29,0),t(`change`,function(e){return i.onRestoreFile(e)}),r(),a(61,`p`,30),_(62),a(63,`a`,31),_(64),r(),_(65),r()()()()(),S(66,re,17,13,`ui-modal`,32),r()}if(n&2){let t,n;p(`area`,i.t()(`sauvegarde.area`)),v(3),x(i.t()(`sauvegarde.eyebrow`)),v(2),b(` `,i.t()(`sauvegarde.title`),` `),v(2),b(` `,i.t()(`sauvegarde.description`),` `),v(),h(i.nominatif()?-1:8),v(),h(i.nominatif()&&!i.cni()?9:-1),v(),p(`stats`,i.stats()),v(6),p(`size`,18),v(),b(``,i.t()(`sauvegarde.export.title`),` `),v(2),b(` `,i.t()(`sauvegarde.export.all`)),v(2),p(`size`,18),v(2),b(` `,i.t()(`sauvegarde.export.description`),` `),v(2),x(i.t()(`sauvegarde.export.single`)),v(2),e(i.exportRows()),v(7),p(`size`,18),v(),b(``,i.t()(`sauvegarde.backup.title`),` `),v(3),x(i.t()(`sauvegarde.backup.description`)),v(2),b(` `,i.t()(`sauvegarde.backup.download`)),v(2),p(`size`,18),v(2),p(`size`,16),v(),h((t=i.lastBackup())?45:46,t),v(6),p(`size`,18),v(),b(``,i.t()(`sauvegarde.restore.title`),` `),v(3),x(i.t()(`sauvegarde.restore.description`)),v(2),p(`size`,18),v(),b(``,i.t()(`sauvegarde.restore.choose`),` `),v(4),b(` `,i.t()(`sauvegarde.restore.importHintBefore`),` `),v(2),x(i.t()(`sauvegarde.restore.importLink`)),v(),b(``,i.t()(`sauvegarde.restore.importHintAfter`),` `),v(),h((n=i.pending())?66:-1,n)}},dependencies:[z,T,H,w,U],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.grid-main[_ngcontent-%COMP%] {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main[_ngcontent-%COMP%] {
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          align-items: start;
        }
      }
      .ent[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 10px 20px;
      }
      .cmp[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], 
   .cmp[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 8px 12px;
        text-align: left;
        font-size: 14px;
      }
      .cmp[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
        font-family: var(--%NS%v2-font-mono);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--%NS%v2-gris-texte);
        border-top: none;
      }`]})}};export{ie as default};