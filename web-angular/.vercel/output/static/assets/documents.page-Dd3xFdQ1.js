import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gn as v,gt as y,hn as b,ln as x,mn as S,mt as C,pn as w,qt as ee,rr as te,t as T,tn as E,vt as D,zn as O}from"./_router-chunk-H0-n0SZI.js";import{n as ne}from"./rxjs-interop-U_NminAK.js";import{l as re,n as ie}from"./snackbar.component-ICe8-MWg.js";import{n as ae}from"./index-B8S1FFME.js";import{B as k,D as oe,G as A,Ot as j,W as M,r as N,t as P,xt as F}from"./locale.service-Bf8_ncMo.js";import{t as I}from"./dossier-labels-DBBTp4HU.js";import{t as L}from"./app-shell.component-CR4uAChA.js";import{t as R}from"./global-filters.component-BaLKxEEO.js";import{t as z}from"./v2-page.styles-Blvl6ZBZ.js";import{t as B}from"./store.service-ZF4OfoGo.js";import{C as V,S as H,T as U,f as W,n as G,o as K}from"./ui-CQhTckzj.js";var q=e=>({mb:e}),se=e=>({count:e}),ce=e=>({date:e}),le=(e,t)=>({name:e,date:t}),J=e=>({name:e}),ue=e=>[`/dashboard/reunions`,e],Y=(e,t)=>t.id,de=(e,t)=>t.kind;function fe(e,n){if(e&1){let e=c();a(0,`button`,36),t(`click`,function(){p(e);let t=d();return o(t.openAdd())}),g(1),a(2,`span`,33),l(3,`ui-icon`,37),r()()}if(e&2){let e=d();_(),S(` `,e.t()(`documents.add`),` `),_(2),f(`size`,20)}}function pe(e,n){if(e&1){let e=c();a(0,`button`,13),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.kind.set(t))}),g(1),a(2,`span`,14),g(3),r()()}if(e&2){let e=n.$implicit,t=d();y(`on`,t.kind()===e),C(`aria-checked`,t.kind()===e),_(),S(` `,t.t()(t.GROUP_KEY[e])),_(),y(`zero`,!t.countKind(e)),_(),w(t.countKind(e))}}function me(e,t){if(e&1&&(a(0,`p`,40),g(1),r(),a(2,`p`,41),g(3),r()),e&2){let e=d(2);_(),w(e.t()(`documents.empty.title`)),_(2),S(` `,e.canUpload()?e.t()(`documents.empty.manage`):e.t()(`documents.empty.read`),` `)}}function he(e,n){if(e&1){let e=c();a(0,`p`,40),g(1),r(),a(2,`button`,42),t(`click`,function(){p(e);let t=d(2);return o(t.resetFilters())}),g(3),r()}if(e&2){let e=d(2);_(),w(e.t()(`documents.empty.filtered`)),_(2),S(` `,e.t()(`documents.empty.reset`),` `)}}function ge(e,t){if(e&1&&(a(0,`div`,16)(1,`span`,38),l(2,`ui-icon`,39),r(),D(3,me,4,2)(4,he,4,2),r()),e&2){let e=d();_(2),f(`name`,e.mine().length?`search`:`folder_open`)(`size`,26),_(),m(e.mine().length===0?3:4)}}function _e(e,t){if(e&1&&(a(0,`span`,56),l(1,`ui-icon`,64),g(2),r()),e&2){let e=d(4);f(`title`,e.t()(`documents.sensitive.title`)),_(),f(`size`,13),_(),S(``,e.t()(`documents.sensitive.pill`),` `)}}function ve(e,t){if(e&1&&g(0),e&2){let e=d(4);S(` · `,e.t()(`documents.linkedTo`,s(1,J,t)),` `)}}function ye(e,t){if(e&1&&(a(0,`a`,59),l(1,`ui-icon`,65),r()),e&2){let e=d(4);f(`routerLink`,s(4,ue,t.id))(`title`,e.t()(`documents.actions.meeting`)),C(`aria-label`,e.t()(`documents.actions.meeting`)),_(),f(`size`,18)}}function be(e,n){if(e&1){let e=c();a(0,`button`,62),t(`click`,function(){p(e);let t=d().$implicit,n=d(3);return o(n.download(t))}),l(1,`ui-icon`,66),r()}if(e&2){let e=d().$implicit,t=d(3);f(`title`,t.t()(`documents.actions.download`)),C(`aria-label`,t.t()(`documents.actions.download`)+` : `+e.name),_(),f(`size`,18)}}function xe(e,n){if(e&1){let e=c();a(0,`button`,67),t(`click`,function(){p(e);let t=d().$implicit,n=d(3);return o(n.removeId.set(t.id))}),l(1,`ui-icon`,68),r()}if(e&2){let e=d().$implicit,t=d(3);f(`title`,t.t()(`documents.actions.remove`)),C(`aria-label`,t.t()(`documents.actions.remove`)+` : `+e.name),_(),f(`size`,18)}}function Se(e,n){if(e&1){let e=c();a(0,`li`,49),t(`click`,function(){let t=p(e).$implicit,n=d(3);return o(n.detailId.set(t.id))}),a(1,`span`,50),l(2,`ui-icon`,51),r(),a(3,`span`,52)(4,`span`,53)(5,`span`,54),g(6),r(),a(7,`span`,55),g(8),r(),D(9,_e,3,3,`span`,56),r(),a(10,`span`,57),g(11),D(12,ve,1,3),r()(),a(13,`span`,58),t(`click`,function(e){return e.stopPropagation()}),D(14,ye,2,6,`a`,59),D(15,be,2,3,`button`,60),D(16,xe,2,3,`button`,61),a(17,`button`,62),t(`click`,function(){let t=p(e).$implicit,n=d(3);return o(n.detailId.set(t.id))}),l(18,`ui-icon`,63),r()()()}if(e&2){let e,t,r=n.$implicit,i=d(3),a=(r.lifecycle??`en vigueur`)===`remplacé`;y(`old`,a),_(),x(`background`,a?`var(--v2-lin)`:i.styleOf(r.kind).bg)(`color`,a?`var(--v2-gris-texte)`:i.styleOf(r.kind).fg),_(),f(`size`,18),_(3),x(`color`,a?`var(--v2-gris-texte)`:null),f(`title`,r.name),_(),w(r.name),_(),x(`background`,a?`var(--v2-lin)`:`var(--v2-sauge)`)(`color`,a?`var(--v2-gris-texte)`:`var(--v2-vert-pousse)`),_(),b(` `,a?i.t()(`documents.version.replaced`):i.t()(`documents.version.current`),` · v`,r.version??1,` `),_(),m(r.sensitive?9:-1),_(2),v(` `,i.formatSize(r.sizeKb),` · `,i.t()(`documents.version.effect`,s(28,ce,i.fmtDate(r.effectiveAt??r.uploadedAt))),` · `,i.t()(`documents.addedBy`,ee(30,le,r.uploadedBy,i.fmtDate(r.uploadedAt))),` `),_(),m((e=i.linkName(r))?12:-1,e),_(2),m((t=i.meetingOf(r))?14:-1,t),_(),m(i.canDownload()?15:-1),_(),m(i.canManage()?16:-1),_(),f(`title`,i.t()(`common.view`)),C(`aria-label`,i.t()(`documents.row.view`,s(33,J,r.name))),_(),f(`size`,18)}}function Ce(t,n){if(t&1&&(a(0,`section`,43)(1,`div`,44)(2,`span`,45),l(3,`ui-icon`,39),r(),a(4,`h2`,46),g(5),r(),a(6,`span`,47),g(7),r()(),a(8,`ul`),h(9,Se,19,35,`li`,48,Y),r()()),t&2){let t=n.$implicit,r=d(2);C(`aria-labelledby`,`group-`+t.kind),_(2),x(`background`,r.kindStyle[t.kind].bg)(`color`,r.kindStyle[t.kind].fg),_(),f(`name`,r.kindStyle[t.kind].icon)(`size`,20),_(),f(`id`,`group-`+t.kind),_(),S(` `,r.t()(r.GROUP_KEY[t.kind]),` `),_(2),S(` `,r.t()(t.docs.length>1?`documents.group.count.autre`:`documents.group.count.un`,s(10,se,t.docs.length)),` `),_(2),e(t.docs)}}function we(t,n){if(t&1&&(a(0,`div`,17),h(1,Ce,11,12,`section`,43,de),r()),t&2){let t=d();_(),e(t.groups())}}function Te(e,n){if(e&1){let e=c();a(0,`div`)(1,`p`,22),g(2),r(),a(3,`ui-select`,69),t(`valueChange`,function(t){p(e);let n=d();return o(n.addScoop.set(t))}),r()()}if(e&2){let e=d();_(2),w(e.t()(`documents.add.scoop`)),_(),f(`label`,e.t()(`documents.add.scoop`))(`options`,e.addScoops())(`value`,e.addScoop())}}function Ee(e,n){if(e&1){let e=c();a(0,`button`,13),t(`click`,function(){let t=p(e).$implicit,n=d();return n.addLinkType.set(t.id),o(n.addLinkId.set(``))}),g(1),r()}if(e&2){let e=n.$implicit,t=d();y(`on`,t.addLinkType()===e.id),C(`aria-checked`,t.addLinkType()===e.id),_(),w(t.t()(e.label))}}function De(e,n){if(e&1){let e=c();a(0,`ui-select`,72),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.addLinkId.set(t))}),r()}if(e&2){let e=d(2);f(`label`,e.t()(`documents.add.link.target`))(`options`,e.linkOptions())(`value`,e.addLinkId())}}function Oe(e,t){if(e&1&&(a(0,`p`,71),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`documents.add.link.none`))}}function ke(e,t){if(e&1&&D(0,De,1,3,`ui-select`,70)(1,Oe,2,1,`p`,71),e&2){let e=d();m(+!e.linkOptions().length)}}function Ae(e,n){if(e&1){let e=c();a(0,`div`,74)(1,`button`,13),t(`click`,function(){p(e);let t=d(2);return o(t.replace.set(!0))}),g(2),r(),a(3,`button`,13),t(`click`,function(){p(e);let t=d(2);return o(t.replace.set(!1))}),g(4),r()()}if(e&2){let e=d(),t=d();_(),y(`on`,t.replace()),C(`aria-checked`,t.replace()),_(),b(` `,t.t()(`documents.add.replaceVersion`),` (v`,(e.version??1)+1,`) `),_(),y(`on`,!t.replace()),C(`aria-checked`,!t.replace()),_(),S(` `,t.t()(`documents.add.newName`),` `)}}function X(e,t){if(e&1&&(a(0,`p`,75),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`documents.add.keepBothOnly`))}}function je(e,t){if(e&1&&(a(0,`div`,26)(1,`p`,73),l(2,`ui-icon`,64),g(3),r(),D(4,Ae,5,9,`div`,74)(5,X,2,1,`p`,75),r()),e&2){let e=d();_(2),f(`size`,18),_(),S(``,e.t()(`documents.add.duplicateWarn`),` `),_(),m(e.canManage()?4:5)}}function Me(e,t){if(e&1&&(a(0,`span`,30),g(1),r()),e&2){let e=d();_(),w(e.t()(`documents.add.sensitiveWarn`))}}function Ne(e,n){if(e&1){let e=c();a(0,`ui-modal`,76),t(`closed`,function(){p(e);let t=d();return o(t.removeId.set(null))}),a(1,`button`,31),t(`click`,function(){p(e);let t=d();return o(t.removeId.set(null))}),g(2),r(),a(3,`button`,77),t(`click`,function(){let t=p(e),n=d();return o(n.submitRemove(t.id))}),g(4),r()()}if(e&2){let e=d();f(`open`,!0)(`title`,e.t()(`documents.remove.title`))(`description`,e.t()(`documents.remove.description`,s(7,J,n.name)))(`width`,520)(`closeLabel`,e.t()(`common.close`)),_(2),S(` `,e.t()(`documents.add.cancel`),` `),_(2),S(` `,e.t()(`documents.remove.submit`),` `)}}var Z={statuts:`documents.group.statuts`,règlement:`documents.group.reglement`,"procès-verbal":`documents.group.pv`,convention:`documents.group.convention`,justificatif:`documents.group.justificatif`,autre:`documents.group.autre`},Q={statuts:{icon:`gavel`,...z.info},règlement:{icon:`menu_book`,...z.culture},"procès-verbal":{icon:`event_note`,...z.succes},convention:{icon:`description`,...z.attente},justificatif:{icon:`fact_check`,...z.neutre},autre:{icon:`folder_open`,...z.neutre}},$=5120,Pe=class o{constructor(){this.store=O(B),this.locale=O(P),this.snackbar=O(ie),this.t=this.locale.t,this.fmtDate=k,this.GROUP_KEY=Z,this.kindStyle=Q,this.libraryKinds=[...oe],this.maxMb=$/1024,this.route=O(T),this.scoopFilter=ne(this.route.queryParamMap.pipe(te(e=>e.get(`scoop`))),{initialValue:null}),this.q=i(``),this.kind=i(`all`),this.detailId=i(null),this.removeId=i(null),this.canManage=n(()=>this.store.can(`library.manage`)),this.canUpload=n(()=>this.store.can(`library.upload`)||this.store.can(`library.manage`)),this.canDownload=n(()=>this.store.can(`document.download`)),this.mine=n(()=>{let e=this.store.state(),t=this.scoopFilter();return j(e.documents,e.session).filter(e=>!t||e.scoopId===t)}),this.matching=n(()=>{let e=this.q().trim().toLowerCase();return this.mine().filter(t=>!e||t.name.toLowerCase().includes(e))}),this.shown=n(()=>{let e=this.kind();return this.matching().filter(t=>e===`all`||t.kind===e)}),this.groups=n(()=>this.libraryKinds.map(e=>({kind:e,docs:this.shown().filter(t=>t.kind===e).sort((e,t)=>Number((e.lifecycle??`en vigueur`)===`remplacé`)-Number((t.lifecycle??`en vigueur`)===`remplacé`)||t.uploadedAt.localeCompare(e.uploadedAt))})).filter(e=>e.docs.length)),this.stats=n(()=>{let e=this.t(),t=this.mine(),n=t.filter(e=>(e.lifecycle??`en vigueur`)===`en vigueur`).length,r=t.filter(e=>e.sensitive).length;return[{label:e(`documents.stat.total`),value:M.format(t.length),sub:e(`documents.stat.totalSub`,{count:new Set(t.map(e=>e.kind)).size}),icon:`folder_open`,bg:``,fg:``},{label:e(`documents.stat.current`),value:M.format(n),sub:e(`documents.stat.currentSub`),icon:`check_circle`,...z.succes},{label:e(`documents.stat.replaced`),value:M.format(t.length-n),sub:e(`documents.stat.replacedSub`),icon:`event_note`,...z.info},{label:e(`documents.stat.sensitive`),value:M.format(r),sub:e(`documents.stat.sensitiveSub`),icon:`warning`,...r?z.erreur:z.neutre}]}),this.detail=n(()=>{let e=this.detailId(),t=e?this.mine().find(t=>t.id===e):null;if(!t)return null;let n=this.t(),r=(t.lifecycle??`en vigueur`)===`remplacé`,i=t.kind,a=this.mine().filter(e=>e.scoopId===t.scoopId&&e.kind===t.kind&&e.name.toLowerCase()===t.name.toLowerCase()).sort((e,t)=>(t.version??1)-(e.version??1)),o=this.meetingOf(t);return{title:t.name,subtitle:n(Z[i]),icon:Q[i].icon,badges:[r?{label:n(`documents.version.replaced`),...z.neutre}:{label:n(`documents.version.current`),...z.succes},{label:n(`documents.version.label`,{n:t.version??1}),...z.info},...t.sensitive?[{label:n(`documents.sensitive.pill`),...z.erreur}]:[]],kpis:[],facts:[V(n(`documents.quick.kind`),n(Z[i]),Q[i].icon),V(n(`documents.quick.size`),this.formatSize(t.sizeKb),`description`),V(n(`documents.quick.effect`),k(t.effectiveAt??t.uploadedAt),`calendar_today`),V(n(`documents.quick.addedBy`),`${t.uploadedBy} · ${k(t.uploadedAt)}`,`badge`),...this.linkName(t)?[V(n(`documents.quick.linked`),this.linkName(t),`link`,{wide:!0})]:[],V(n(`documents.quick.scoop`),this.store.state().scoops.find(e=>e.id===t.scoopId)?.name,`apartment`,{wide:!0})],sections:[{title:n(`documents.quick.version`),icon:`event_note`,count:a.length,empty:`—`,items:a.map(e=>({label:n(`documents.version.label`,{n:e.version??1}),sub:`${k(e.effectiveAt??e.uploadedAt)} · ${e.uploadedBy}`,badge:(e.lifecycle??`en vigueur`)===`remplacé`?{label:n(`documents.version.replaced`),...z.neutre}:{label:n(`documents.version.current`),...z.succes}})),more:0}],link:o?[`/dashboard/reunions`,o.id]:null}}),this.addOpen=i(!1),this.addScoop=i(``),this.addKind=i(`statuts`),this.addFile=i(null),this.addSensitive=i(!1),this.addLinkType=i(`scoop`),this.addLinkId=i(``),this.linkTypes=[{id:`scoop`,label:`documents.add.link.scoop`},{id:`org`,label:`documents.add.link.org`},{id:`technicien`,label:`documents.add.link.technicien`},{id:`personnel`,label:`documents.add.link.personnel`}],this.linkOptions=n(()=>{let e=this.store.state(),t=this.addScoop(),n=this.addLinkType();return n===`org`?e.orgs.filter(e=>e.scoopId===t).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name})):n===`scoop`?[]:e.users.filter(e=>e.scoopId===t||e.scoopIds?.includes(t)).filter(e=>n===`technicien`?e.role===`technicien`:e.role!==`technicien`&&![`admin`,`superadmin`,`faitiere`].includes(e.role)).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,...n===`personnel`?{hint:this.store.roleLabel(e.role)}:{}}))}),this.replace=i(!0),this.addScoops=n(()=>{let e=this.store.state();return F(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name}))}),this.kindOptions=n(()=>this.libraryKinds.map(e=>({value:e,label:this.t()(Z[e]),icon:Q[e].icon}))),this.addSlot=n(()=>[{id:`file`,label:this.t()(Z[this.addKind()]),hint:this.t()(`documents.add.choose`),icon:Q[this.addKind()].icon,required:!0}]),this.addFiles=n(()=>{let e=this.addFile();return e?[{key:`file`,name:e.name,sizeKb:e.sizeKb,slot:`file`}]:[]}),this.duplicate=n(()=>{let e=this.addFile();return e?this.store.state().documents.find(t=>t.ownerType===`scoop`&&t.scoopId===this.addScoop()&&t.name.toLowerCase()===e.name.trim().toLowerCase()&&(t.lifecycle??`en vigueur`)===`en vigueur`)??null:null}),this.toRemove=n(()=>{let e=this.removeId();return e?this.mine().find(t=>t.id===e)??null:null})}styleOf(e){return Q[e]??Q.autre}countKind(e){return this.matching().filter(t=>t.kind===e).length}meetingOf(e){if(e.kind===`procès-verbal`)return this.store.state().meetings.find(t=>t.minutes?.documentId===e.id)}formatSize(e){return e>=1024?this.t()(`documents.size.mb`,{n:A.format(e/1024)}):this.t()(`documents.size.kb`,{n:A.format(Math.max(1,Math.round(e)))})}resetFilters(){this.kind.set(`all`),this.q.set(``)}download(e){let t=N.downloadDocument(e.id);if(!t.ok){this.snackbar.error(this.locale.tNow(t.error));return}let n=new Blob([`${this.t()(`documents.demoFile`,{name:e.name,kind:this.t()(I[e.kind])})}\n`],{type:`text/plain`}),r=document.createElement(`a`);r.href=URL.createObjectURL(n),r.download=`${e.name}.txt`,r.click(),URL.revokeObjectURL(r.href)}linkName(e){if(!e.link)return``;let t=this.store.state();return e.link.type===`org`?t.orgs.find(t=>t.id===e.link.id)?.name??``:t.users.find(t=>t.id===e.link.id)?.name??``}openAdd(){let e=this.scoopFilter();this.addScoop.set(e&&this.addScoops().some(t=>t.value===e)?e:this.addScoops()[0]?.value??``),this.addKind.set(this.kind()===`all`?`statuts`:this.kind()),this.addFile.set(null),this.addSensitive.set(!1),this.addLinkType.set(`scoop`),this.addLinkId.set(``),this.replace.set(!0),this.addOpen.set(!0)}pickFile(e){let t=e[0];if(!t)return;let n=Math.ceil(t.size/1024);n>$?this.snackbar.error(this.t()(`documents.add.tooBig`,{size:this.formatSize(n),mb:this.maxMb})):this.addFile.set({name:t.name,sizeKb:n,mime:t.type||`application/octet-stream`})}submitAdd(){let e=this.addFile();if(!e)return;let t=this.duplicate(),n=t&&!(this.replace()&&this.canManage())?e.name.replace(/(\.[^.]+)?$/,e=>` (${(t.version??1)+1})${e}`):e.name,r=N.addLibraryDocument(this.addScoop(),{kind:this.addKind(),name:n,sizeKb:e.sizeKb,mime:e.mime,sensitive:this.addSensitive(),...this.addLinkType()===`scoop`?{}:{link:{type:this.addLinkType(),id:this.addLinkId()}},replaceExisting:!!t&&this.replace()&&this.canManage()});r.ok?(this.addOpen.set(!1),this.snackbar.success(this.t()(`documents.added`))):this.snackbar.error(this.locale.tNow(r.error))}submitRemove(e){let t=N.removeLibraryDocument(e);t.ok?(this.removeId.set(null),this.snackbar.success(this.t()(`documents.removed`))):this.snackbar.error(this.locale.tNow(t.error))}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-documents-page`]],decls:57,vars:50,consts:[[`perm`,`library.read`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[`type`,`button`,`role`,`radio`,3,`on`],[1,`card`,`mt-4`,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[1,`mt-4`,`grid`,`gap-4`],[3,`closed`,`view`],[`icon`,`upload_file`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-5`,`pb-5`,`pt-1`],[1,`grid`,`gap-5`,`sm:grid-cols-2`],[1,`lbl`],[1,`mt-2`,`block`,3,`valueChange`,`label`,`leadingIcon`,`options`,`value`],[`role`,`radiogroup`,1,`seg`,`seg-form`,`mt-2`],[`accept`,`image/*,application/pdf,.doc,.docx`,3,`added`,`removed`,`slots`,`files`,`multiple`,`hint`],[1,`rounded-[18px]`,`p-4`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`check`],[`type`,`checkbox`,3,`change`,`checked`],[1,`sub`,`block`],[1,`mt-1`,`block`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`tone`,`danger`,`icon`,`close`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`name`,`upload_file`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[3,`name`,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[1,`card`,`overflow-hidden`],[1,`group-head`],[1,`kind-ico`],[1,`min-w-0`,`flex-1`,`text-[17px]`,`font-extrabold`,`tracking-[-0.01em]`,3,`id`],[1,`badge`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-ardoise)`],[1,`doc`,`row-link`,3,`old`],[1,`doc`,`row-link`,3,`click`],[1,`kind-ico`,2,`height`,`36px`,`width`,`36px`],[`name`,`description`,3,`size`],[1,`min-w-0`,`flex-1`],[1,`flex`,`flex-wrap`,`items-center`,`gap-1.5`],[1,`truncate`,`font-bold`,3,`title`],[1,`badge`],[1,`badge`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`,3,`title`],[1,`sub`,`mt-0.5`,`block`,`truncate`],[1,`flex`,`shrink-0`,`items-center`,`gap-2`,3,`click`],[1,`act`,3,`routerLink`,`title`],[`type`,`button`,1,`act`,3,`title`],[`type`,`button`,1,`act`,`act-danger`,3,`title`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[`name`,`warning`,3,`size`],[`name`,`event`,3,`size`],[`name`,`download`,3,`size`],[`type`,`button`,1,`act`,`act-danger`,3,`click`,`title`],[`name`,`close`,3,`size`],[`leadingIcon`,`apartment`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[`leadingIcon`,`link`,1,`mt-3`,`block`,3,`label`,`options`,`value`],[1,`sub`,`mt-3`],[`leadingIcon`,`link`,1,`mt-3`,`block`,3,`valueChange`,`label`,`options`,`value`],[1,`flex`,`items-center`,`gap-2`,`text-[14px]`,`font-bold`],[`role`,`radiogroup`,1,`seg`,`seg-form`,`mt-3`],[1,`mt-2`,`text-[13px]`,`font-semibold`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,1,`btn`,2,`background`,`var(--v2-erreur-fg)`,`color`,`var(--v2-blanc)`,3,`click`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),g(4),r(),a(5,`h1`,4),g(6),r(),a(7,`p`,5),g(8),r()(),D(9,fe,4,2,`button`,6),r(),l(10,`ui-stat-cards`,7),a(11,`div`,8)(12,`label`,9),l(13,`ui-icon`,10),a(14,`input`,11),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),l(15,`app-global-filters`),a(16,`div`,12)(17,`button`,13),t(`click`,function(){return i.kind.set(`all`)}),g(18),a(19,`span`,14),g(20),r()(),h(21,pe,4,7,`button`,15,E),r()(),D(23,ge,5,3,`div`,16)(24,we,3,0,`div`,17),a(25,`ui-detail-modal`,18),t(`closed`,function(){return i.detailId.set(null)}),r(),a(26,`ui-modal`,19),t(`closed`,function(){return i.addOpen.set(!1)}),a(27,`div`,20)(28,`div`,21),D(29,Te,4,4,`div`),a(30,`div`)(31,`p`,22),g(32),r(),a(33,`ui-select`,23),t(`valueChange`,function(e){return i.addKind.set(e)}),r()()(),a(34,`div`)(35,`p`,22),g(36),r(),a(37,`div`,24),h(38,Ee,2,4,`button`,15,Y),r(),D(40,ke,2,1),r(),a(41,`ui-file-slots`,25),t(`added`,function(e){return i.pickFile(e.files)})(`removed`,function(){return i.addFile.set(null)}),r(),D(42,je,6,3,`div`,26),a(43,`label`,27)(44,`input`,28),t(`change`,function(e){return i.addSensitive.set(e.target.checked)}),r(),a(45,`span`),g(46),a(47,`span`,29),g(48),r(),D(49,Me,2,1,`span`,30),r()()(),a(50,`button`,31),t(`click`,function(){return i.addOpen.set(!1)}),g(51),r(),a(52,`button`,32),t(`click`,function(){return i.submitAdd()}),g(53),a(54,`span`,33),l(55,`ui-icon`,34),r()()(),D(56,Ne,5,9,`ui-modal`,35),r()),n&2){let t,n;f(`area`,i.t()(`documents.area`)),_(4),w(i.t()(`documents.eyebrow`)),_(2),S(` `,i.t()(`documents.title`),` `),_(2),S(` `,i.t()(`documents.description`),` `),_(),m(i.canUpload()?9:-1),_(),f(`stats`,i.stats()),_(3),f(`size`,20),_(),f(`placeholder`,i.t()(`documents.search.placeholder`))(`value`,i.q()),C(`aria-label`,i.t()(`documents.search.aria`)),_(2),C(`aria-label`,i.t()(`documents.filters`)),_(),y(`on`,i.kind()===`all`),C(`aria-checked`,i.kind()===`all`),_(),S(` `,i.t()(`documents.filter.all`)),_(),y(`zero`,!i.matching().length),_(),w(i.matching().length),_(),e(i.libraryKinds),_(2),m(i.shown().length===0?23:24),_(2),f(`view`,i.detail()),_(),f(`open`,i.addOpen())(`title`,i.t()(`documents.add.title`))(`description`,i.t()(`documents.add.description`))(`width`,640)(`closeLabel`,i.t()(`common.close`)),_(3),m(i.addScoops().length>1?29:-1),_(3),w(i.t()(`documents.add.kind`)),_(),f(`label`,i.t()(`documents.add.kind`))(`leadingIcon`,i.kindStyle[i.addKind()].icon)(`options`,i.kindOptions())(`value`,i.addKind()),_(3),w(i.t()(`documents.add.link`)),_(),C(`aria-label`,i.t()(`documents.add.link`)),_(),e(i.linkTypes),_(2),m(i.addLinkType()===`scoop`?-1:40),_(),f(`slots`,i.addSlot())(`files`,i.addFiles())(`multiple`,!1)(`hint`,i.t()(`documents.add.fileHint`,s(48,q,i.maxMb))),_(),m((t=i.duplicate())?42:-1,t),_(2),f(`checked`,i.addSensitive()),_(2),S(` `,i.t()(`documents.add.sensitive`),` `),_(2),w(i.t()(`documents.add.sensitiveHint`)),_(),m(i.addSensitive()&&!i.store.can(`identity.read_full`)?49:-1),_(2),S(` `,i.t()(`documents.add.cancel`),` `),_(),f(`disabled`,!i.addFile()||!i.addScoop()||i.addLinkType()!==`scoop`&&!i.addLinkId()),_(),S(` `,i.t()(`documents.add.submit`),` `),_(2),f(`size`,18),_(),m((n=i.toRemove())?56:-1,n)}},dependencies:[L,H,W,R,re,U,ae,K,G],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.group-head[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 20px;
      }
      .kind-ico[_ngcontent-%COMP%] {
        display: grid;
        height: 40px;
        width: 40px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 12px;
      }
      .doc[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 14px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 20px;
      }
      .doc.old[_ngcontent-%COMP%] {
        background: color-mix(in oklab, var(--%NS%v2-creme) 55%, transparent);
      }
      .act-danger[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-erreur-fg);
        background: var(--%NS%v2-erreur-bg);
        color: var(--%NS%v2-erreur-fg);
      }
      .lbl[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--%NS%v2-ardoise);
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
      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        flex: 1;
        justify-content: center;
      }`]})}};export{Pe as default};