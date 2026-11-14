import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,a as h,en as g,fn as _,ft as v,gt as y,ln as b,mn as x,mt as S,pn as C,qt as w,vt as T,zn as E}from"./_router-chunk-H0-n0SZI.js";import{B as D,Dt as ee,E as te,W as O,nt as k,t as A,xt as j}from"./locale.service-Bf8_ncMo.js";import{l as ne,n as re}from"./snackbar.component-ICe8-MWg.js";import{t as M}from"./app-shell.component-CR4uAChA.js";import{t as N}from"./store.service-ZF4OfoGo.js";import{t as P}from"./pager-DPeF-1nO.js";import{n as F,t as I}from"./v2-page.styles-Blvl6ZBZ.js";import{C as L,S as R,T as z,a as B,f as V,n as H,o as U,t as W,w as G}from"./ui-CQhTckzj.js";var K=(e,t)=>({shown:e,total:t}),q=e=>({mb:e}),ie=e=>({count:e}),J=e=>({name:e}),Y=(e,t)=>t.id;function ae(e,n){if(e&1){let e=c();a(0,`button`,44),t(`click`,function(){p(e);let t=d();return o(t.openNew())}),_(1),a(2,`span`,45),l(3,`ui-icon`,46),r()()}if(e&2){let e=d();v(),x(` `,e.t()(`dossiers.new`),` `),v(2),f(`size`,20)}}function oe(e,n){if(e&1){let e=c();a(0,`button`,27),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.view.set(t.id))}),_(1),a(2,`span`,39),_(3),r()()}if(e&2){let e=n.$implicit,t=d();y(`on`,t.view()===e.id),S(`aria-checked`,t.view()===e.id),v(),x(` `,e.label),v(),y(`zero`,!e.count),v(),C(e.count)}}function se(e,t){if(e&1&&(a(0,`span`,57),_(1),r()),e&2){let e=d(3);v(),C(e.t()(`dossiers.row.duplicate`))}}function ce(e,n){if(e&1){let e=c();a(0,`tr`,52),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.detailId.set(t.id))}),a(1,`td`)(2,`span`,53)(3,`span`,54),_(4),r(),a(5,`span`,2)(6,`span`,55),_(7),r(),a(8,`span`,56),_(9),T(10,se,2,1,`span`,57),r()()()(),a(11,`td`,58),_(12),r(),a(13,`td`,59),_(14),r(),a(15,`td`,60),_(16),r(),a(17,`td`,61),_(18),r(),a(19,`td`)(20,`span`,62),_(21),r()(),a(22,`td`)(23,`span`,63)(24,`button`,64),t(`click`,function(t){let n=p(e).$implicit,r=d(2);return t.stopPropagation(),o(r.detailId.set(n.id))}),l(25,`ui-icon`,65),r()()()()}if(e&2){let e=n.$implicit,t=d(2);v(3),b(`background`,t.status[e.status].bg)(`color`,t.status[e.status].fg),v(),C(t.initials(t.name(e))),v(3),C(t.name(e)),v(2),x(` `,e.draft.village||t.t()(`dossiers.row.noVillage`),` `),v(),m(e.possibleDuplicateOf?10:-1),v(),f(`title`,t.scoopName(e.scoopId)),v(),x(` `,t.scoopName(e.scoopId),` `),v(2),C(e.createdBy),v(2),x(` `,t.fmtDate(e.updatedAt),` `),v(),b(`color`,t.ageDays(e)>14&&t.isOpen(e)?`var(--v2-erreur-fg)`:null),v(),x(` `,t.t()(t.ageDays(e)>1?`dossiers.age.days.autre`:`dossiers.age.days.un`,s(23,ie,t.ageDays(e))),` `),v(2),b(`background`,t.status[e.status].bg)(`color`,t.status[e.status].fg),v(),C(t.t()(t.statusKey(e.status))),v(3),f(`title`,t.t()(`common.view`)),S(`aria-label`,t.t()(`dossiers.view.aria`,s(25,J,t.name(e)))),v(),f(`size`,18)}}function le(t,n){if(t&1&&(a(0,`div`,47)(1,`table`,48)(2,`thead`)(3,`tr`)(4,`th`),_(5),r(),a(6,`th`),_(7),r(),a(8,`th`),_(9),r(),a(10,`th`),_(11),r(),a(12,`th`,49),_(13),r(),a(14,`th`),_(15),r(),a(16,`th`,49),_(17),r()()(),a(18,`tbody`),g(19,ce,26,27,`tr`,50,Y),r()()(),l(21,`ui-pagination`,51)),t&2){let t=d();v(5),C(t.t()(`dossiers.col.future`)),v(2),C(t.t()(`dossiers.col.scoop`)),v(2),C(t.t()(`dossiers.col.tech`)),v(2),C(t.t()(`dossiers.col.updated`)),v(2),C(t.t()(`dossiers.col.age`)),v(2),C(t.t()(`dossiers.col.status`)),v(2),C(t.t()(`dossiers.col.actions`)),v(2),e(t.pager.items()),v(2),f(`pager`,t.pager)}}function ue(e,t){if(e&1&&(a(0,`p`,69),_(1),r()),e&2){let e=d(2);v(),x(` `,e.canCreate()?e.t()(`dossiers.empty.create`):e.t()(`dossiers.empty.readonly`),` `)}}function de(e,t){if(e&1&&(a(0,`div`,16)(1,`span`,66),l(2,`ui-icon`,67),r(),a(3,`p`,68),_(4),r(),T(5,ue,2,1,`p`,69),r()),e&2){let e=d();v(2),f(`size`,26),v(2),x(` `,e.mine().length?e.t()(`dossiers.empty.filtered`):e.t()(`dossiers.empty.title`),` `),v(),m(e.mine().length?-1:5)}}function fe(e,n){if(e&1){let e=c();a(0,`div`)(1,`p`,25),_(2),r(),a(3,`ui-select`,70),t(`valueChange`,function(t){p(e);let n=d();return o(n.setScoop(t))}),r()()}if(e&2){let e=d();v(2),C(e.t()(`dossiers.new.scoop`)),v(),f(`label`,e.t()(`dossiers.new.scoop`))(`options`,e.scoopOptions())(`value`,e.form().scoopId)}}function pe(e,t){if(e&1&&(a(0,`p`,34),l(1,`ui-icon`,71),_(2),r()),e&2){let e=d();v(),f(`size`,16),v(),C(e.err(`orgId`))}}function me(e,t){if(e&1&&(a(0,`span`,39),_(1),r()),e&2){let e=d();v(),C(e.files().length)}}function he(e,t){if(e&1&&(a(0,`p`,34),l(1,`ui-icon`,71),_(2),r()),e&2){let e=d();v(),f(`size`,16),v(),C(e.err(`pièces`))}}function ge(e,n){if(e&1){let e=c();a(0,`button`,72),t(`click`,function(){p(e);let t=d();return o(t.submitNew(!0))}),_(1),a(2,`span`,45),l(3,`ui-icon`,73),r()()}if(e&2){let e=d();v(),x(` `,e.t()(`dossiers.new.submitNow`),` `),v(2),f(`size`,18)}}var X=[`soumis`,`en examen`],_e=[`brouillon`,`complément demandé`,`approuvé`,`refusé`],ve={brouillon:`dossiers.filter.brouillon`,"complément demandé":`dossiers.filter.complément demandé`,approuvé:`dossiers.filter.approuvé`,refusé:`dossiers.filter.refusé`},Z={brouillon:I.neutre,soumis:I.attente,"en examen":I.info,"complément demandé":I.culture,approuvé:I.succes,refusé:I.erreur},ye=864e5,Q=5120,$=e=>({scoopId:e,firstName:``,lastName:``,sex:`F`,age:``,phone:``,cni:``,village:``,orgId:``,createMember:!0}),be=class o{constructor(){this.router=E(h),this.snackbar=E(re),this.store=E(N),this.locale=E(A),this.t=this.locale.t,this.nf=O,this.fmtDate=D,this.initials=F,this.status=Z,this.perms=[`dossier.create`,`dossier.review`],this.q=i(``),this.view=i(`tous`),this.newOpen=i(!1),this.detailId=i(null),this.form=i($(``)),this.issues=i([]),this.files=i([]),this.maxMb=Q/1024,this.mine=n(()=>ee(this.store.state().dossiers,this.store.state().session)),this.canCreate=n(()=>this.store.can(`dossier.create`)),this.createScoops=n(()=>{let e=this.store.state().session;return this.store.state().scoops.filter(t=>j([{scoopId:t.id}],e).length===1)}),this.scoopOptions=n(()=>this.createScoops().map(e=>({value:e.id,label:e.name}))),this.filterButtons=n(()=>{let e=this.t(),t=this.mine(),n=e=>t.filter(e).length,r=[{id:`tous`,label:e(`dossiers.filter.all`),count:t.length},{id:`a-traiter`,label:e(`dossiers.filter.toProcess`),count:n(e=>X.includes(e.status))}];for(let t of _e)r.push({id:t,label:e(ve[t]),count:n(e=>e.status===t)});return r}),this.stats=n(()=>{let e=this.t(),t=this.mine(),n=e=>t.filter(t=>e.includes(t.status)).length;return[{label:e(`dossiers.stat.total`),value:O.format(t.length),sub:e(`dossiers.stat.totalSub`,{count:n([`brouillon`])}),icon:`folder_shared`,bg:``,fg:``},{label:e(`dossiers.stat.toProcess`),value:O.format(n(X)),sub:e(`dossiers.stat.toProcessSub`),icon:`fact_check`,...I.attente},{label:e(`dossiers.stat.complement`),value:O.format(n([`complément demandé`])),sub:e(`dossiers.stat.complementSub`),icon:`mark_email_unread`,...I.culture},{label:e(`dossiers.stat.approved`),value:O.format(n([`approuvé`])),sub:e(`dossiers.stat.approvedSub`,{count:n([`refusé`])}),icon:`task_alt`,...I.succes}]}),this.shown=n(()=>{let e=this.q().trim().toLowerCase(),t=this.view();return this.mine().filter(n=>{let r=t===`tous`||(t===`a-traiter`?X.includes(n.status):n.status===t),i=!e||`${n.draft.firstName} ${n.draft.lastName} ${n.createdBy}`.toLowerCase().includes(e);return r&&i}).sort((e,t)=>e.updatedAt.localeCompare(t.updatedAt))}),this.pager=P(()=>this.shown()),this.detail=n(()=>{let e=this.detailId(),t=e?this.mine().find(t=>t.id===e):null;if(!t)return null;let n=this.t(),r=this.store.state().orgs.find(e=>e.id===t.draft.orgId),i=[...t.history].sort((e,t)=>t.at.localeCompare(e.at)),a=t.decision?`${n(t.decision.approved?`dossiers.status.approuvé`:`dossiers.status.refusé`)} · ${D(t.decision.at)} · ${t.decision.by}`:null;return{title:this.name(t),subtitle:[t.draft.village,this.scoopName(t.scoopId)].filter(Boolean).join(` · `),icon:`folder_shared`,badges:[{label:n(this.statusKey(t.status)),...Z[t.status]},...t.possibleDuplicateOf?[{label:n(`dossiers.row.duplicate`),bg:`var(--v2-bloquant-bg)`,fg:`var(--v2-bloquant-fg)`}]:[]],kpis:[G(n(`dossiers.quick.documents`),t.documentIds.length,`description`,I.info),G(n(`dossiers.quick.waiting`),this.ageDays(t),`calendar_today`,this.ageDays(t)>14&&this.isOpen(t)?I.erreur:I.attente),G(n(`dossiers.quick.events`),t.history.length,`event_note`,I.culture)],facts:[L(n(`dossiers.new.sex`),n(t.draft.sex===`F`?`dossiers.new.female`:`dossiers.new.male`),`person`),L(n(`producteurs.col.age`),t.draft.age===null?null:n(`cooperatives.fiche.detail.ageValue`,{count:t.draft.age}),`calendar_today`),L(n(`producteurs.col.phone`),this.store.phone(t.draft.phone)||null,`call`),L(n(`producteurs.col.village`),t.draft.village,`location_on`),L(n(`producteurs.col.organisation`),r?.name,`hub`),L(n(`dossiers.quick.member`),n(t.draft.createMember?`dossiers.quick.yes`:`dossiers.quick.no`),`group`),L(n(`dossiers.quick.createdBy`),t.createdBy,`badge`),L(n(`dossiers.quick.createdAt`),D(t.createdAt),`event_note`),L(n(`dossiers.quick.submittedAt`),t.submittedAt?D(t.submittedAt):null,`upload_file`),L(n(`dossiers.quick.decision`),a,`gavel`,{wide:!0})],sections:[{title:n(`dossiers.quick.history`),icon:`event_note`,count:i.length||null,empty:n(`dossiers.quick.historyEmpty`),items:i.slice(0,8).map(e=>({label:n(`dossiers.event.${e.action}`),sub:`${D(e.at)} · ${e.by}${e.comment?` · ${e.comment}`:``}`})),more:Math.max(0,i.length-8)}],link:[`/dashboard/dossiers`,t.id]}}),this.orgOptions=n(()=>this.store.state().orgs.filter(e=>e.scoopId===this.form().scoopId).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,...e.village?{hint:e.village}:{}}))),this.fileSlots=n(()=>{let e=this.t(),t={cni:`badge`,photo:`account_circle`,justificatif:`description`,autre:`folder_open`};return te.map(n=>({id:n,label:e(this.kindKey(n)),hint:e(`dossiers.new.kindHint.${n}`),icon:t[n],sensitive:n===`cni`}))}),this.slotFiles=n(()=>this.files().map(e=>({key:e.key,name:e.name,sizeKb:e.sizeKb,slot:e.kind})))}name(e){return`${e.draft.firstName} ${e.draft.lastName}`.trim()||`${this.t()(`dossiers.row.noFirstName`)} ${this.t()(`dossiers.row.noLastName`)}`}ageDays(e){return Math.max(0,Math.floor((Date.now()-new Date(e.submittedAt??e.createdAt).getTime())/ye))}isOpen(e){return e.status!==`approuvé`&&e.status!==`refusé`}scoopName(e){return this.store.state().scoops.find(t=>t.id===e)?.name??e}statusKey(e){return`dossiers.status.${e}`}kindKey(e){return`dossiers.kind.${e}`}err(e){return this.issues().find(t=>t.field===e)?.message??``}setField(e,t){this.form.update(n=>({...n,[e]:t})),this.issues.update(t=>t.filter(t=>t.field!==e))}setScoop(e){this.form.update(t=>({...t,scoopId:e,orgId:``}))}setOrg(e){let t=this.store.state().orgs.find(t=>t.id===e);this.form.update(n=>({...n,orgId:e,village:n.village.trim()?n.village:t?.village??``})),this.issues.update(e=>e.filter(e=>e.field!==`orgId`&&(e.field!==`village`||!t?.village)))}openNew(){this.form.set($(this.createScoops()[0]?.id??``)),this.issues.set([]),this.files.set([]),this.newOpen.set(!0)}addFiles(e,t){for(let n of t){let t=Math.ceil(n.size/1024);t>Q?this.snackbar.error(this.t()(`dossiers.new.tooBig`,{name:n.name,mb:this.maxMb})):this.files.update(r=>[...r,{key:`${Date.now()}-${r.length}-${n.name}`,name:n.name,sizeKb:t,mime:n.type||`application/octet-stream`,kind:e}])}this.issues.update(e=>e.filter(e=>e.field!==`pièces`))}removeFile(e){this.files.update(t=>t.filter(t=>t.key!==e))}canDraft(){let e=this.form();return!!(e.firstName.trim()&&e.lastName.trim()&&e.scoopId)}draft(){let e=this.form(),t=e.age.trim()===``?null:Number(e.age);return{firstName:e.firstName.trim(),lastName:e.lastName.trim(),sex:e.sex,age:Number.isFinite(t)?t:null,phone:e.phone.trim(),cni:e.cni.replace(/\s/g,``),village:e.village.trim(),orgId:e.orgId,createMember:e.createMember}}submitNew(e){let t=this.draft();if(e){let e=k(t,this.files().length);if(e.length){this.issues.set(e),this.snackbar.error(this.t()(`dossiers.detail.edit.fixFields`));return}}else if(!this.canDraft()){this.issues.set(k(t,1).filter(e=>e.field===`firstName`||e.field===`lastName`));return}let n=this.store.actions.createDossier(this.form().scoopId,t);if(!n.ok){this.snackbar.error(this.locale.tNow(n.error));return}for(let e of this.files()){let t=this.store.actions.addDocument(n.id,{kind:e.kind,name:e.name,sizeKb:e.sizeKb,mime:e.mime});t.ok||this.snackbar.error(this.locale.tNow(t.error))}let r=this.t()(`dossiers.new.done`);if(e){let e=this.store.actions.submitDossier(n.id);r=e.ok?e.possibleDuplicateOf?`${this.t()(`dossiers.detail.edit.submitted`)} · ${this.t()(`dossiers.detail.edit.duplicateFlagged`)}`:this.t()(`dossiers.detail.edit.submitted`):this.locale.tNow(e.error)}this.newOpen.set(!1),this.snackbar.success(r),this.router.navigate([`/dashboard/dossiers`,n.id])}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-dossiers-page`]],decls:73,vars:79,consts:[[3,`perm`,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`closed`,`view`],[`icon`,`folder_shared`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`pb-6`,`pt-2`],[1,`sec`],[`name`,`person`,3,`size`],[1,`grid`,`gap-5`,`sm:grid-cols-2`],[`preset`,`firstName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`lastName`,3,`valueChange`,`label`,`value`,`error`],[1,`lbl`],[`role`,`radiogroup`,1,`seg`,`seg-form`,`mt-2`],[`type`,`button`,`role`,`radio`,3,`click`],[`preset`,`age`,3,`valueChange`,`label`,`value`,`error`],[`name`,`call`,3,`size`],[`preset`,`phone`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`cni`,3,`valueChange`,`label`,`hint`,`value`,`error`],[`name`,`hub`,3,`size`],[`leadingIcon`,`hub`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[1,`field-err`],[`preset`,`village`,3,`valueChange`,`label`,`value`,`error`],[1,`check`,`mt-5`],[`type`,`checkbox`,3,`change`,`checked`],[`name`,`upload_file`,3,`size`],[1,`n`],[`accept`,`image/*,application/pdf`,3,`added`,`removed`,`slots`,`files`,`hint`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`,`disabled`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`add`,3,`size`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[880px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`flex`,`items-center`,`gap-1.5`,`truncate`],[1,`badge`,`dup`],[1,`max-w-52`,`truncate`,`font-medium`,3,`title`],[1,`font-medium`],[1,`whitespace-nowrap`,`font-medium`,`tabular-nums`],[1,`whitespace-nowrap`,`text-right`,`font-extrabold`,`tabular-nums`],[1,`badge`],[1,`flex`,`justify-end`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`folder_open`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[`leadingIcon`,`apartment`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[`name`,`warning`,3,`size`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`name`,`arrow_forward`,3,`size`]],template:function(n,i){n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),_(4),r(),a(5,`h1`,4),_(6),r(),a(7,`p`,5),_(8),r()(),T(9,ae,4,2,`button`,6),r(),l(10,`ui-stat-cards`,7),a(11,`div`,8)(12,`label`,9),l(13,`ui-icon`,10),a(14,`input`,11),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),a(15,`div`,12),g(16,oe,4,7,`button`,13,Y),r()(),a(18,`p`,14),_(19),r(),a(20,`section`,15),T(21,le,22,8)(22,de,6,3,`div`,16),r(),a(23,`ui-detail-modal`,17),t(`closed`,function(){return i.detailId.set(null)}),r(),a(24,`ui-modal`,18),t(`closed`,function(){return i.newOpen.set(!1)}),a(25,`div`,19)(26,`h3`,20),l(27,`ui-icon`,21),_(28),r(),a(29,`div`,22)(30,`ui-text-field`,23),t(`valueChange`,function(e){return i.setField(`firstName`,e)}),r(),a(31,`ui-text-field`,24),t(`valueChange`,function(e){return i.setField(`lastName`,e)}),r(),a(32,`div`)(33,`p`,25),_(34),r(),a(35,`div`,26)(36,`button`,27),t(`click`,function(){return i.setField(`sex`,`F`)}),_(37),r(),a(38,`button`,27),t(`click`,function(){return i.setField(`sex`,`H`)}),_(39),r()()(),a(40,`ui-text-field`,28),t(`valueChange`,function(e){return i.setField(`age`,e)}),r()(),a(41,`h3`,20),l(42,`ui-icon`,29),_(43),r(),a(44,`div`,22)(45,`ui-text-field`,30),t(`valueChange`,function(e){return i.setField(`phone`,e)}),r(),a(46,`ui-text-field`,31),t(`valueChange`,function(e){return i.setField(`cni`,e)}),r()(),a(47,`h3`,20),l(48,`ui-icon`,32),_(49),r(),a(50,`div`,22),T(51,fe,4,4,`div`),a(52,`div`)(53,`p`,25),_(54),r(),a(55,`ui-select`,33),t(`valueChange`,function(e){return i.setOrg(e)}),r(),T(56,pe,3,2,`p`,34),r(),a(57,`ui-text-field`,35),t(`valueChange`,function(e){return i.setField(`village`,e)}),r()(),a(58,`label`,36)(59,`input`,37),t(`change`,function(e){return i.setField(`createMember`,e.target.checked)}),r(),a(60,`span`),_(61),r()(),a(62,`h3`,20),l(63,`ui-icon`,38),_(64),T(65,me,2,1,`span`,39),r(),a(66,`ui-file-slots`,40),t(`added`,function(e){return i.addFiles(e.slot,e.files)})(`removed`,function(e){return i.removeFile(e)}),r(),T(67,he,3,2,`p`,34),r(),a(68,`button`,41),t(`click`,function(){return i.newOpen.set(!1)}),_(69),r(),a(70,`button`,42),t(`click`,function(){return i.submitNew(!1)}),_(71),r(),T(72,ge,4,2,`button`,43),r()()),n&2&&(f(`perm`,i.perms)(`area`,i.t()(`dossiers.area`)),v(4),C(i.t()(`dossiers.eyebrow`)),v(2),x(` `,i.t()(`dossiers.title`),` `),v(2),x(` `,i.store.can(`dossier.review`)?i.t()(`dossiers.description.reviewer`):i.t()(`dossiers.description.creator`),` `),v(),m(i.canCreate()?9:-1),v(),f(`stats`,i.stats()),v(3),f(`size`,20),v(),f(`placeholder`,i.t()(`dossiers.search.placeholder`))(`value`,i.q()),S(`aria-label`,i.t()(`dossiers.search.aria`)),v(),S(`aria-label`,i.t()(`dossiers.filter.group`)),v(),e(i.filterButtons()),v(3),x(` `,i.t()(`dossiers.count`,w(74,K,i.nf.format(i.shown().length),i.nf.format(i.mine().length))),` `),v(2),m(i.shown().length?21:22),v(2),f(`view`,i.detail()),v(),f(`open`,i.newOpen())(`title`,i.t()(`dossiers.new.title`))(`description`,i.t()(`dossiers.new.draftHint`))(`width`,780)(`closeLabel`,i.t()(`common.close`)),v(3),f(`size`,18),v(),x(``,i.t()(`dossiers.new.section.identity`),` `),v(2),f(`label`,i.t()(`dossiers.new.firstName`))(`value`,i.form().firstName)(`error`,i.err(`firstName`)),v(),f(`label`,i.t()(`dossiers.new.lastName`))(`value`,i.form().lastName)(`error`,i.err(`lastName`)),v(3),C(i.t()(`dossiers.new.sex`)),v(),S(`aria-label`,i.t()(`dossiers.new.sex`)),v(),y(`on`,i.form().sex===`F`),S(`aria-checked`,i.form().sex===`F`),v(),x(` `,i.t()(`dossiers.new.female`),` `),v(),y(`on`,i.form().sex===`H`),S(`aria-checked`,i.form().sex===`H`),v(),x(` `,i.t()(`dossiers.new.male`),` `),v(),f(`label`,i.t()(`dossiers.detail.info.age`))(`value`,i.form().age)(`error`,i.err(`age`)),v(2),f(`size`,18),v(),x(``,i.t()(`dossiers.new.section.contact`),` `),v(2),f(`label`,i.t()(`dossiers.detail.info.phone`))(`value`,i.form().phone)(`error`,i.err(`phone`)),v(),f(`label`,i.t()(`dossiers.detail.info.cni`))(`hint`,i.t()(`dossiers.detail.edit.cniHint`))(`value`,i.form().cni)(`error`,i.err(`cni`)),v(2),f(`size`,18),v(),x(``,i.t()(`dossiers.new.section.attach`),` `),v(2),m(i.createScoops().length>1?51:-1),v(3),C(i.t()(`dossiers.detail.info.org`)),v(),f(`label`,i.t()(`dossiers.detail.info.org`))(`options`,i.orgOptions())(`value`,i.form().orgId),v(),m(i.err(`orgId`)?56:-1),v(),f(`label`,i.t()(`dossiers.detail.info.village`))(`value`,i.form().village)(`error`,i.err(`village`)),v(2),f(`checked`,i.form().createMember),v(2),C(i.t()(`dossiers.detail.edit.createMember`)),v(2),f(`size`,18),v(),x(``,i.t()(`dossiers.new.section.pieces`),` `),v(),m(i.files().length?65:-1),v(),f(`slots`,i.fileSlots())(`files`,i.slotFiles())(`hint`,i.t()(`dossiers.new.filesHint`,s(77,q,i.maxMb))),v(),m(i.err(`pièces`)?67:-1),v(2),x(` `,i.t()(`common.cancel`),` `),v(),f(`disabled`,!i.canDraft()),v(),x(` `,i.t()(`dossiers.new.submit`),` `),v(),m(i.store.can(`dossier.submit`)?72:-1))},dependencies:[M,V,ne,z,R,B,U,H,W],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.lbl[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--%NS%v2-ardoise);
      }
      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        flex: 1;
        justify-content: center;
      }
      .dup[_ngcontent-%COMP%] {
        background: var(--%NS%v2-bloquant-bg);
        color: var(--%NS%v2-bloquant-fg);
      }
      .sec[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 26px 0 14px;
        font-size: 14px;
        font-weight: 800;
        color: var(--%NS%v2-foret);
      }
      .sec[_ngcontent-%COMP%]:first-child {
        margin-top: 4px;
      }
      .sec[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
        border-radius: 999px;
        background: var(--%NS%v2-foret);
        padding: 1px 8px;
        font-size: 12px;
        color: var(--%NS%v2-citron);
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
      .check[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .check[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        height: 20px;
        width: 20px;
        accent-color: var(--%NS%v2-foret);
        cursor: pointer;
      }`]})}};export{be as default};