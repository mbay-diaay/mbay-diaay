import{$t as e,Bt as t,F as n,Ft as r,Gt as i,Hn as a,It as o,Jn as s,Jt as ee,Kt as c,Lt as l,Nt as u,St as te,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gn as v,gt as y,ln as b,mn as x,mt as S,nn as C,pn as w,qt as T,tn as ne,vt as E,wn as re,zn as D}from"./_router-chunk-H0-n0SZI.js";import{Ct as ie,M as ae,Mt as O,N as k,P as A,R as j,St as M,V as N,W as P,t as F}from"./locale.service-Bf8_ncMo.js";import{l as I,n as L}from"./snackbar.component-ICe8-MWg.js";import{t as R}from"./workbook-DRfzSQbC.js";import{t as z}from"./app-shell.component-CR4uAChA.js";import{t as B}from"./store.service-ZF4OfoGo.js";import{a as V,o as H}from"./ui-CQhTckzj.js";import{t as U}from"./pager-DPeF-1nO.js";var W=()=>[`report.generate`,`report.read`,`report.download`],G=e=>({count:e}),K=(e,t,n)=>({rows:e,when:t,who:n}),q=(e,t)=>({shown:e,total:t}),J=e=>({rows:e}),oe=(e,t)=>t.label,se=(e,t)=>t.value,Y=(e,t)=>t.id;function ce(e,t){if(e&1&&(o(0,`div`,13)(1,`span`,14),u(2,`ui-icon`,15),r(),o(3,`div`,16)(4,`span`,17),g(5),r(),o(6,`span`,18),u(7,`ui-icon`,15),r()(),o(8,`span`,19),g(9),r(),o(10,`span`,20),g(11),r()()),e&2){let e=t.$implicit,n=t.$index;b(`background`,n===0?null:e.bg)(`border-color`,n===0?null:`transparent`),y(`hero`,n===0),_(),b(`color`,n===0?`var(--v2-citron)`:e.fg),_(),f(`name`,e.icon)(`size`,120),_(2),b(`color`,n===0?`color-mix(in oklab, var(--v2-blanc) 78%, transparent)`:e.fg),_(),w(e.label),_(),b(`background`,n===0?`var(--v2-citron)`:e.fg)(`color`,n===0?`var(--v2-foret)`:e.bg),_(),f(`name`,e.icon)(`size`,20),_(),b(`font-size`,e.small?22:34,`px`)(`color`,n===0?null:e.fg),_(),w(e.value),_(),b(`color`,n===0?`color-mix(in oklab, var(--v2-blanc) 65%, transparent)`:e.fg)(`opacity`,n===0?null:.75),_(),w(e.sub)}}function le(e,n){if(e&1){let e=l();o(0,`button`,49),t(`click`,function(){let t=p(e).$implicit,n=d(2);return s(n.setCategory(t.value))}),u(1,`ui-icon`,15),g(2),o(3,`span`,50),g(4),r()()}if(e&2){let e=n.$implicit,t=d(2);y(`on`,t.category()===e.value),S(`aria-selected`,t.category()===e.value),_(),f(`name`,e.icon)(`size`,16),_(),w(e.value===`all`?t.t()(`rapports.studio.all`):e.label),_(2),w(e.hint)}}function ue(e,t){if(e&1&&(o(0,`p`,29),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`rapports.emptyCat`))}}function de(e,t){e&1&&(o(0,`span`,56),u(1,`ui-icon`,66),r()),e&2&&(_(),f(`size`,18))}function fe(e,t){if(e&1&&(o(0,`span`,57),u(1,`ui-icon`,67),g(2),r()),e&2){let e=d().$implicit,t=d(3);S(`title`,t.t()(`rapports.studio.popularHint`,c(3,G,t.usage().get(e.id)??0))),_(),f(`size`,14),_(),x(``,t.t()(`rapports.studio.popular`),` `)}}function pe(e,n){if(e&1){let e=l();o(0,`button`,54),t(`click`,function(){let t=p(e).$implicit,n=d(3);return s(n.selectedId.set(t.id))}),o(1,`span`,55),u(2,`ui-icon`,15),r(),E(3,de,2,1,`span`,56)(4,fe,3,5,`span`,57),o(5,`span`,58),u(6,`ui-icon`,15),r(),o(7,`span`,59)(8,`span`,60),g(9),r(),o(10,`span`,61),g(11),r()(),o(12,`span`,62)(13,`span`,63),u(14,`ui-icon`,15),g(15),r(),o(16,`span`,64),u(17,`ui-icon`,65),g(18,`CSV · Excel `),r()()()}if(e&2){let e=n.$implicit,t=d(3);y(`on`,t.selectedId()===e.id),S(`aria-selected`,t.selectedId()===e.id),_(),b(`color`,t.cat(e.category).fg),_(),f(`name`,t.cat(e.category).icon)(`size`,96),_(),m(t.selectedId()===e.id?3:e.id===t.popularId()?4:-1),_(2),b(`background`,t.cat(e.category).fg)(`color`,t.cat(e.category).bg),_(),f(`name`,t.cat(e.category).icon)(`size`,24),_(3),w(t.t()(e.nameKey)),_(2),w(t.t()(e.descriptionKey)),_(2),b(`background`,t.cat(e.category).bg)(`color`,t.cat(e.category).fg),_(),f(`name`,t.cat(e.category).icon)(`size`,14),_(),x(``,t.t()(t.cat(e.category).label),` `),_(2),f(`size`,15)}}function me(t,n){if(t&1&&(o(0,`div`,51),h(1,pe,19,24,`button`,52,Y),r(),u(3,`ui-pagination`,53)),t&2){let t=d(2);S(`aria-label`,t.t()(`rapports.studio.catalogue`)),_(),e(t.reportPager.items()),_(2),f(`pager`,t.reportPager)}}function he(e,t){if(e&1&&(o(0,`p`,36),u(1,`ui-icon`,15),g(2),r()),e&2){let e=t,n=d(2);_(),b(`color`,n.cat(e.category).fg),f(`name`,n.cat(e.category).icon)(`size`,18),_(),x(` `,n.t()(e.nameKey),` `)}}function ge(e,t){if(e&1&&(o(0,`p`,37),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`rapports.generateNeedSelect`))}}function _e(e,n){if(e&1){let e=l();o(0,`button`,68),t(`click`,function(){let t=p(e).$implicit,n=d(2);return s(n.period.set(t.id))}),g(1),r()}if(e&2){let e=n.$implicit,t=d(2);y(`on`,t.period()===e.id),S(`aria-checked`,t.period()===e.id),_(),x(` `,t.t()(e.label),` `)}}function ve(n,i){if(n&1){let e=l();o(0,`div`,8)(1,`section`,21)(2,`h2`,22),g(3),r(),o(4,`div`,23)(5,`label`,24),u(6,`ui-icon`,25),o(7,`input`,26),t(`input`,function(t){p(e);let n=d();return s(n.query.set(t.target.value))}),r()(),o(8,`div`,27),h(9,le,5,7,`button`,28,se),r()(),E(11,ue,2,1,`p`,29)(12,me,4,2),r(),o(13,`aside`,30)(14,`div`,31)(15,`span`,32),u(16,`ui-icon`,33),r(),o(17,`h2`,34),g(18),r()(),o(19,`div`,35)(20,`p`,3),g(21),r(),E(22,he,3,5,`p`,36)(23,ge,2,1,`p`,37),r(),o(24,`div`,38)(25,`div`,39)(26,`span`,40),g(27),r(),o(28,`ui-select`,41),t(`valueChange`,function(t){p(e);let n=d();return s(n.scoop.set(t))}),r()(),o(29,`div`,39)(30,`span`,40),g(31),r(),o(32,`ui-select`,41),t(`valueChange`,function(t){p(e);let n=d();return s(n.campaign.set(t))}),r()(),o(33,`div`,39)(34,`span`,42),g(35),r(),o(36,`div`,43),h(37,_e,2,4,`button`,44,Y),r()()(),o(39,`p`,45),u(40,`ui-icon`,46),o(41,`span`),g(42),r()(),o(43,`button`,47),t(`click`,function(){p(e);let t=d();return s(t.run())}),o(44,`span`),g(45),r(),o(46,`span`,48),u(47,`ui-icon`,15),r()()()()}if(n&2){let t,n=d();_(3),w(n.t()(`rapports.studio.catalogue`)),_(3),f(`size`,20),_(),f(`placeholder`,n.t()(`rapports.studio.search`))(`value`,n.query()),S(`aria-label`,n.t()(`rapports.studio.search`)),_(),S(`aria-label`,n.t()(`rapports.studio.category`)),_(),e(n.categoryOptions()),_(2),m(n.filtered().length===0?11:12),_(5),f(`size`,22),_(2),x(` `,n.t()(`rapports.studio.configure`),` `),_(3),w(n.t()(`rapports.selected`)),_(),m((t=n.selected())?22:23,t),_(5),w(n.t()(`rapports.field.scoop`)),_(),f(`options`,n.scoopOptions())(`value`,n.scoop())(`label`,n.t()(`rapports.field.scoop`)),_(3),w(n.t()(`rapports.field.campaign`)),_(),f(`options`,n.campaignOptions())(`value`,n.campaign())(`label`,n.t()(`rapports.field.campaign`)),_(3),w(n.t()(`rapports.field.period`)),_(2),e(n.periods),_(3),f(`size`,16),_(2),w(n.summary()),_(),f(`disabled`,!n.selectedId()||n.busy()),_(2),w(n.busy()?n.t()(`rapports.generating`):n.t()(`rapports.studio.generate`)),_(2),y(`spin`,n.busy()),f(`name`,n.busy()?`progress_activity`:`arrow_forward`)(`size`,22)}}function ye(e,t){if(e&1&&(o(0,`p`,9),u(1,`ui-icon`,69),g(2),r()),e&2){let e=d();_(),f(`size`,20),_(),x(``,e.t()(`rapports.noGenerate`),` `)}}function be(e,n){if(e&1){let e=l();o(0,`div`,75)(1,`button`,82),t(`click`,function(){p(e);let t=d(),n=d();return s(n.download(t,`CSV`))}),u(2,`ui-icon`,83),g(3),r(),o(4,`button`,84),t(`click`,function(){p(e);let t=d(),n=d();return s(n.download(t,`Excel`))}),u(5,`ui-icon`,65),g(6),r()()}if(e&2){let e=d(2);_(2),f(`size`,18),_(),x(``,e.t()(`rapports.csv`),` `),_(2),f(`size`,18),_(),x(``,e.t()(`rapports.excel`),` `)}}function xe(e,t){if(e&1&&(o(0,`span`,76),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`rapports.downloadDenied`))}}function Se(e,t){if(e&1&&(o(0,`span`,79),g(1),r()),e&2){let e=d(),t=d();_(),w(t.t()(`rapports.result.truncated`,T(1,q,t.nf.format(t.previewLimit),t.nf.format(e.rows.length))))}}function Ce(e,t){if(e&1&&(o(0,`p`,80),g(1),r()),e&2){let e=d(2);_(),w(e.t()(`rapports.result.empty`))}}function we(e,t){if(e&1&&(o(0,`th`,87),g(1),r()),e&2){let e=t.$implicit;_(),x(` `,e,` `)}}function Te(e,t){if(e&1&&(o(0,`td`,89),g(1),r()),e&2){let e=t.$implicit;_(),x(` `,e,` `)}}function Ee(t,n){if(t&1&&(o(0,`tr`,88),h(1,Te,2,1,`td`,89,C),r()),t&2){let t=n.$implicit;_(),e(t)}}function De(t,n){if(t&1&&(o(0,`div`,81)(1,`table`,85)(2,`thead`,86)(3,`tr`),h(4,we,2,1,`th`,87,ne),r()(),o(6,`tbody`),h(7,Ee,3,0,`tr`,88,C),r()()()),t&2){let t=d(),n=d();_(4),e(t.header),_(3),e(n.previewRows(t))}}function Oe(e,t){if(e&1&&(o(0,`section`,10)(1,`div`,70)(2,`div`,2)(3,`p`,71),g(4),r(),o(5,`h2`,72),g(6),r(),o(7,`p`,73),g(8),r(),o(9,`p`,74),g(10),r()(),E(11,be,7,4,`div`,75)(12,xe,2,1,`span`,76),r(),o(13,`div`,77)(14,`h3`,78),g(15),r(),E(16,Se,2,4,`span`,79),r(),E(17,Ce,2,1,`p`,80)(18,De,9,0,`div`,81),r()),e&2){let e=t,n=d();_(4),w(n.t()(`rapports.result.title`)),_(2),x(` `,e.name,` `),_(2),x(` `,e.scopeLabel,` `),_(2),x(` `,n.t()(`rapports.result.meta`,ee(8,K,n.nf.format(e.rows.length),n.fmtDateTime(e.generatedAt),e.generatedBy)),` `),_(),m(n.canDownload()?11:12),_(4),w(n.t()(`rapports.result.preview`)),_(),m(e.rows.length>n.previewLimit?16:-1),_(),m(e.rows.length===0?17:18)}}function ke(e,t){if(e&1&&(o(0,`p`,91),u(1,`ui-icon`,92),g(2),r()),e&2){let e=d(2);_(),f(`size`,22),_(),x(``,e.t()(`rapports.history.empty`),` `)}}function Ae(e,n){if(e&1){let e=l();o(0,`button`,82),t(`click`,function(){p(e);let t=d().$implicit,n=d(3);return s(n.download(t,`CSV`))}),u(1,`ui-icon`,83),g(2),r(),o(3,`button`,101),t(`click`,function(){p(e);let t=d().$implicit,n=d(3);return s(n.download(t,`Excel`))}),u(4,`ui-icon`,65),g(5),r()}if(e&2){let e=d().$implicit,t=d(3);S(`aria-label`,t.t()(`rapports.csv`)+` · `+e.name),_(),f(`size`,18),_(),x(``,t.t()(`rapports.csv`),` `),_(),S(`aria-label`,t.t()(`rapports.excel`)+` · `+e.name),_(),f(`size`,18),_(),x(``,t.t()(`rapports.excel`),` `)}}function X(e,n){if(e&1){let e=l();o(0,`li`,95)(1,`span`,96),u(2,`ui-icon`,97),r(),o(3,`span`,98)(4,`span`,99),g(5),r(),o(6,`span`,100),g(7),r()(),o(8,`span`,75)(9,`button`,82),t(`click`,function(){let t=p(e).$implicit,n=d(3);return s(n.openResult(t))}),u(10,`ui-icon`,69),g(11),r(),E(12,Ae,6,6),r()()}if(e&2){let e=n.$implicit,t=n.$index,r=d(3);b(`border-top`,t===0?`none`:`1px solid var(--v2-separateur)`),_(2),f(`size`,22),_(3),w(e.name),_(2),v(` `,e.scopeLabel,` · `,r.fmtDateTime(e.generatedAt),` · `,r.t()(`rapports.history.rows`,c(10,J,r.nf.format(e.rows.length))),` `),_(3),f(`size`,18),_(),x(``,r.t()(`rapports.result.open`),` `),_(),m(r.canDownload()?12:-1)}}function je(t,n){if(t&1&&(o(0,`ul`,93),h(1,X,13,12,`li`,94,Y),r(),u(3,`ui-pagination`,53)),t&2){let t=d(2);_(),e(t.historyPager.items()),_(2),f(`pager`,t.historyPager)}}function Me(e,t){if(e&1&&(o(0,`section`,11)(1,`h2`,90),g(2),r(),E(3,ke,3,2,`p`,91)(4,je,4,1),r()),e&2){let e=d();_(2),x(` `,e.t()(`rapports.history.title`),` `),_(),m(e.history().length===0?3:4)}}var Z={producteurs:{label:`rapports.cat.producteurs`,icon:`agriculture`,bg:`var(--v2-sauge)`,fg:`var(--v2-foret)`},agriculture:{label:`rapports.cat.agriculture`,icon:`potted_plant`,bg:`var(--v2-culture-bg)`,fg:`var(--v2-culture-fg)`},finances:{label:`rapports.cat.finances`,icon:`account_balance_wallet`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`},gouvernance:{label:`rapports.cat.gouvernance`,icon:`gavel`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},qualite:{label:`rapports.cat.qualite`,icon:`verified`,bg:`var(--v2-succes-bg)`,fg:`var(--v2-succes-fg)`}},Q=40,$=(e,t)=>`${e.name.toLowerCase().replace(/[^a-z0-9]+/g,`_`)}_${e.generatedAt.slice(0,10)}.${t}`,Ne=class t{constructor(){this.store=D(B),this.locale=D(F),this.snackbar=D(L),this.document=D(re),this.t=this.locale.t,this.fmtDateTime=N,this.nf=P,this.categories=ae,this.previewLimit=Q,this.periods=[{id:`campaign`,label:`rapports.field.period.campaign`},{id:`h1`,label:`rapports.field.period.h1`},{id:`h2`,label:`rapports.field.period.h2`}],this.scoop=a(``),this.campaign=a(``),this.period=a(`campaign`),this.category=a(`all`),this.query=a(``),this.selectedId=a(null),this.busy=a(!1),this.preview=a(null),this.session=n(()=>this.store.state().session),this.canGenerate=n(()=>this.store.can(`report.generate`)),this.canRead=n(()=>this.store.can(`report.read`)),this.canDownload=n(()=>this.store.can(`report.download`)),this.campaigns=n(()=>[...new Set(this.store.state().plots.map(e=>e.campaign))].sort()),this.visibleScoops=n(()=>{let e=this.session(),t=this.store.state().scoops;if(M(e))return t;let n=ie(e);return t.filter(e=>n.has(e.id))}),this.catalogue=n(()=>k(this.session())),this.filtered=n(()=>{let e=this.category(),t=e=>e.normalize(`NFD`).replace(/[\u0300-\u036f]/g,``).toLowerCase(),n=t(this.query().trim()),r=this.t();return this.catalogue().filter(i=>(e===`all`||i.category===e)&&(!n||t(`${r(i.nameKey)} ${r(i.descriptionKey)}`).includes(n)))}),this.stats=n(()=>{let e=this.t(),t=this.history(),n=Date.now()-2592e6,r=t.filter(e=>new Date(e.generatedAt).getTime()>=n).length,i=this.store.state().audit.filter(e=>e.action===`Téléchargement de rapport`).length,a=t[0],o=new Set(this.catalogue().map(e=>e.category)).size;return[{label:e(`rapports.studio.available`),value:String(this.catalogue().length),sub:e(`rapports.studio.availableSub`,{count:o}),icon:`summarize`,bg:`var(--v2-sauge)`,fg:`var(--v2-foret)`,small:!1},{label:e(`rapports.studio.generatedLabel`),value:String(t.length),sub:e(`rapports.studio.generatedSub`,{count:r}),icon:`lab_profile`,bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`,small:!1},{label:e(`rapports.studio.downloads`),value:String(i),sub:e(`rapports.studio.downloadsSub`),icon:`download`,bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`,small:!1},{label:e(`rapports.studio.lastLabel`),value:a?N(a.generatedAt):`—`,sub:a?a.name:e(`rapports.studio.lastNone`),icon:`history`,bg:`var(--v2-culture-bg)`,fg:`var(--v2-culture-fg)`,small:!0}]}),this.selected=n(()=>{let e=this.selectedId();return e?this.catalogue().find(t=>t.id===e):void 0}),this.history=n(()=>this.canRead()?O(this.store.state().reports,this.session()):[]),this.appliedScopeName=n(()=>A(this.session(),this.store.state().scoops)),this.summary=n(()=>{let e=this.store.state().scoops,t=this.scoop(),n=t?e.find(e=>e.id===t)?.name??t:this.visibleScoops().length>1?`${this.visibleScoops().length} coopératives`:this.appliedScopeName(),r=this.campaign()||this.t()(`rapports.field.allCampaigns`),i=this.periods.find(e=>e.id===this.period()).label;return`${n} · ${r} · ${this.t()(i)}`}),this.scoopOptions=n(()=>{let e=this.visibleScoops(),t={value:``,label:e.length>1?this.t()(`rapports.field.allMine`):this.appliedScopeName(),icon:`diversity_3`,hint:e.length>1?String(e.length):void 0};return e.length>1?[t,...e.map(e=>({value:e.id,label:e.name}))]:[t]}),this.campaignOptions=n(()=>[{value:``,label:this.t()(`rapports.field.allCampaigns`),icon:`calendar_today`},...this.campaigns().map(e=>({value:e,label:e}))]),this.categoryOptions=n(()=>[{value:`all`,label:this.t()(`rapports.studio.allCategories`),icon:`summarize`,hint:String(this.catalogue().length)},...this.categories.filter(e=>this.countIn(e)>0).map(e=>({value:e,label:this.t()(Z[e].label),icon:Z[e].icon,hint:String(this.countIn(e))}))]),this.usage=n(()=>{let e=new Map;for(let t of this.history())e.set(t.reportId,(e.get(t.reportId)??0)+1);return e}),this.popularId=n(()=>{let e=null,t=0;for(let[n,r]of this.usage())r>t&&([e,t]=[n,r]);return e}),this.reportPager=U(()=>this.filtered()),this.historyPager=U(()=>this.history())}cat(e){return Z[e]}countIn(e){return this.catalogue().filter(t=>t.category===e).length}previewRows(e){return e.rows.slice(0,Q)}setCategory(e){this.category.set(e);let t=this.selectedId();t&&e!==`all`&&!this.catalogue().some(n=>n.id===t&&n.category===e)&&this.selectedId.set(null)}openResult(e){this.preview.set(e),this.scrollToResult()}run(){let e=this.selectedId();e&&!this.busy()&&(this.busy.set(!0),window.setTimeout(()=>{let t=this.store.actions.generateReport(e,{scoopId:this.scoop()||void 0,campaign:this.campaign()||void 0});this.busy.set(!1),t.ok?(this.preview.set(t.report),this.snackbar.success(this.t()(`rapports.ready`,{name:t.report.name})),this.scrollToResult()):this.snackbar.error(this.t()(t.error))},500))}async download(e,t){let n=this.store.actions.downloadReport(e.id,t);if(!n.ok){this.snackbar.error(this.t()(n.error));return}let r=[e.name,`Périmètre : ${e.scopeLabel}`,`Édité le ${e.generatedAt.slice(0,10)}`];t===`CSV`?j($(e,`csv`),[r,e.header,...e.rows]):await R($(e,`xlsx`),[{name:`Rapport`,rows:[r,e.header,...e.rows]}]),this.snackbar.success(this.t()(`rapports.studio.downloaded`,{format:t}))}scrollToResult(){setTimeout(()=>this.document.getElementById(`rapport-resultat`)?.scrollIntoView({behavior:`smooth`,block:`start`}),50)}static{this.ɵfac=function(e){return new(e||t)}}static{this.ɵcmp=te({type:t,selectors:[[`app-rapports-page`]],decls:18,vars:11,consts:[[3,`perm`,`area`],[1,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-8`,`grid`,`grid-cols-1`,`gap-4`,`sm:grid-cols-2`,`xl:grid-cols-4`],[1,`card`,`stat`,`relative`,`flex`,`flex-col`,`overflow-hidden`,`p-5`,3,`hero`,`background`,`border-color`],[1,`mt-8`,`grid`,`items-start`,`gap-5`,`lg:grid-cols-[minmax(0,1fr)_300px]`],[1,`card`,`sub`,`mt-8`,`flex`,`items-center`,`gap-3`,`p-6`],[`id`,`rapport-resultat`,`aria-labelledby`,`result-title`,1,`card`,`mt-8`,`overflow-hidden`],[`aria-labelledby`,`history-title`,1,`mt-8`],[1,`sub`,`mt-6`],[1,`card`,`stat`,`relative`,`flex`,`flex-col`,`overflow-hidden`,`p-5`],[`aria-hidden`,`true`,1,`watermark`],[3,`name`,`size`],[1,`relative`,`flex`,`items-center`,`justify-between`,`gap-3`],[1,`text-[14px]`,`font-bold`],[1,`grid`,`size-10`,`place-items-center`,`rounded-[12px]`],[1,`relative`,`mt-3`,`truncate`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`relative`,`mt-2`,`truncate`,`text-[13px]`,`font-medium`],[`aria-labelledby`,`catalogue-title`],[`id`,`catalogue-title`,1,`sr-only`],[1,`toolbar`,`card`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`tablist`,1,`tabs`],[`type`,`button`,`role`,`tab`,1,`tab`,3,`on`],[1,`card`,`sub`,`mt-5`,`p-6`],[`aria-labelledby`,`config-title`,1,`card`,`p-6`,`lg:sticky`,`lg:top-24`],[1,`flex`,`items-center`,`gap-3`],[1,`grid`,`size-11`,`place-items-center`,`rounded-[14px]`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[`name`,`tune`,3,`size`],[`id`,`config-title`,1,`text-[18px]`,`font-extrabold`,`tracking-[-0.02em]`],[1,`mt-5`,`rounded-[16px]`,`p-4`,2,`background`,`var(--v2-creme)`],[1,`mt-1`,`flex`,`items-center`,`gap-2`,`text-[15px]`,`font-extrabold`],[1,`sub`,`mt-1`],[1,`mt-5`,`space-y-4`],[1,`space-y-2`],[1,`label`],[3,`valueChange`,`options`,`value`,`label`],[`id`,`period-label`,1,`label`],[`role`,`radiogroup`,`aria-labelledby`,`period-label`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[1,`sub`,`mt-5`,`flex`,`items-start`,`gap-2`],[`name`,`location_on`,1,`mt-0.5`,3,`size`],[`type`,`button`,1,`generate`,`mt-5`,3,`click`,`disabled`],[`aria-hidden`,`true`,1,`chip`],[`type`,`button`,`role`,`tab`,1,`tab`,3,`click`],[1,`n`],[`role`,`listbox`,1,`mt-5`,`grid`,`gap-4`,`sm:grid-cols-2`,`2xl:grid-cols-3`],[`type`,`button`,`role`,`option`,1,`card`,`report`,`overflow-hidden`,3,`on`],[3,`pager`],[`type`,`button`,`role`,`option`,1,`card`,`report`,`overflow-hidden`,3,`click`],[`aria-hidden`,`true`,1,`watermark`,`wm-report`],[`aria-hidden`,`true`,1,`tick`],[1,`badge`,`badge-hot`],[1,`relative`,`grid`,`size-12`,`place-items-center`,`rounded-[14px]`],[1,`relative`,`min-w-0`],[1,`block`,`pr-8`,`text-[16px]`,`font-extrabold`,`leading-snug`,`tracking-[-0.01em]`],[1,`sub`,`mt-1`,`block`],[1,`relative`,`mt-auto`,`flex`,`items-center`,`justify-between`,`gap-2`,`border-t`,`pt-3`,2,`border-color`,`var(--v2-separateur)`],[1,`badge`],[1,`inline-flex`,`items-center`,`gap-1`,`text-[12px]`,`font-bold`,2,`color`,`var(--v2-gris-texte)`],[`name`,`table_view`,3,`size`],[`name`,`check`,3,`size`],[`name`,`north_east`,3,`size`],[`type`,`button`,`role`,`radio`,3,`click`],[`name`,`visibility`,3,`size`],[1,`flex`,`flex-wrap`,`items-start`,`justify-between`,`gap-4`,`p-6`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[1,`mono`,2,`color`,`var(--v2-citron)`],[`id`,`result-title`,1,`mt-1`,`text-[24px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`],[1,`mt-1`,`text-[14px]`,`font-medium`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 75%, transparent)`],[1,`mt-1`,`text-[13px]`,`font-medium`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 60%, transparent)`],[1,`flex`,`flex-wrap`,`gap-2`],[1,`text-[13px]`,`font-semibold`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 70%, transparent)`],[1,`flex`,`items-center`,`justify-between`,`gap-3`,`px-6`,`py-4`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`],[1,`sub`,`px-6`,`pb-6`],[1,`max-h-[480px]`,`overflow-auto`,`border-t`,2,`border-color`,`var(--v2-separateur)`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`download`,3,`size`],[`type`,`button`,1,`btn`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`,3,`click`],[1,`w-full`,`min-w-[40rem]`,`text-left`,`text-[14px]`],[1,`sticky`,`top-0`,`z-10`,2,`background`,`var(--v2-creme)`],[1,`mono`,`whitespace-nowrap`,`px-4`,`py-3`,2,`color`,`var(--v2-gris-texte)`],[2,`border-top`,`1px solid var(--v2-separateur)`],[1,`whitespace-nowrap`,`px-4`,`py-2.5`,`font-medium`,`tabular-nums`],[`id`,`history-title`,1,`text-[20px]`,`font-extrabold`,`tracking-[-0.02em]`],[1,`card`,`sub`,`mt-4`,`flex`,`items-center`,`gap-3`,`p-6`],[`name`,`folder_open`,3,`size`],[1,`card`,`mt-4`,`overflow-hidden`],[1,`flex`,`flex-wrap`,`items-center`,`gap-4`,`px-5`,`py-4`,3,`border-top`],[1,`flex`,`flex-wrap`,`items-center`,`gap-4`,`px-5`,`py-4`],[1,`grid`,`size-11`,`shrink-0`,`place-items-center`,`rounded-[14px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`lab_profile`,3,`size`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`text-[15px]`,`font-bold`],[1,`sub`,`block`,`truncate`],[`type`,`button`,1,`btn`,`btn-forest`,3,`click`]],template:function(t,n){if(t&1&&(o(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),g(4),r(),o(5,`h1`,4),g(6),r(),o(7,`p`,5),g(8),r()()(),o(9,`section`,6),h(10,ce,12,29,`div`,7,oe),r(),E(12,ve,48,28,`div`,8)(13,ye,3,2,`p`,9),E(14,Oe,19,12,`section`,10),E(15,Me,5,2,`section`,11),o(16,`p`,12),g(17),r()()),t&2){let t;f(`perm`,i(10,W))(`area`,n.t()(`rapports.area`)),_(4),w(n.t()(`rapports.area`)),_(2),x(` `,n.t()(`rapports.studio.title`),` `),_(2),x(` `,n.t()(`rapports.studio.subtitle`),` `),_(),S(`aria-label`,n.t()(`rapports.studio.stats`)),_(),e(n.stats()),_(2),m(n.canGenerate()?12:13),_(2),m((t=n.preview())?14:-1,t),_(),m(n.canRead()?15:-1),_(2),w(n.t()(`rapports.foot`))}},dependencies:[V,z,I,H],styles:[`.mono[_ngcontent-%COMP%] {
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
    
    
    .tabs[_ngcontent-%COMP%] {
      display: flex;
      gap: 2px;
      overflow-x: auto;
      scrollbar-width: none;
      scroll-snap-type: x proximity;
      border-radius: 14px;
      background: var(--%NS%v2-creme);
      padding: 4px;
    }
    .tabs[_ngcontent-%COMP%]::-webkit-scrollbar {
      display: none;
    }
    .tab[_ngcontent-%COMP%] {
      display: inline-flex;
      flex: 1 0 auto;
      scroll-snap-align: start;
      justify-content: center;
      align-items: center;
      gap: 5px;
      white-space: nowrap;
      border-radius: 10px;
      padding: 9px 7px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .tab[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-encre);
    }
    .tab.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);
    }
    .tab[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      border-radius: 999px;
      padding: 0 6px;
      font-size: 11px;
      font-variant-numeric: tabular-nums;
      background: color-mix(in oklab, var(--%NS%v2-gris-trait) 45%, transparent);
      color: var(--%NS%v2-ardoise);
    }
    .tab.on[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .tab[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .stat[_ngcontent-%COMP%] {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat[_ngcontent-%COMP%]:hover {
      transform: translateY(-2px);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .hero[_ngcontent-%COMP%] {
      border-color: var(--%NS%v2-foret);
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
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
    .badge-hot[_ngcontent-%COMP%] {
      position: absolute;
      right: 14px;
      top: 14px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .watermark[_ngcontent-%COMP%] {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition:
        transform 0.35s ease,
        opacity 0.35s ease;
    }
    .hero[_ngcontent-%COMP%]   .watermark[_ngcontent-%COMP%] {
      opacity: 0.16;
    }
    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%], 
   .report[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {
      transform: rotate(-4deg) scale(1.06);
      opacity: 0.18;
    }
    .wm-report[_ngcontent-%COMP%] {
      right: -14px;
      bottom: auto;
      top: -18px;
      opacity: 0.09;
    }
    
    .toolbar[_ngcontent-%COMP%] {
      display: flex;
      flex-direction: column;
      gap: 8px;
      padding: 8px;
      border-radius: 20px;
    }
    .search[_ngcontent-%COMP%] {
      display: flex;
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
    .search[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {
      color: var(--%NS%v2-gris-texte);
      font-weight: 500;
    }
    .report[_ngcontent-%COMP%] {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 20px;
      text-align: left;
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        box-shadow 0.2s ease,
        transform 0.2s ease;
    }
    .report[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-trait);
      transform: translateY(-2px);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .report.on[_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-foret);
      padding: 19px;
      box-shadow: var(--%NS%v2-halo);
    }
    .tick[_ngcontent-%COMP%] {
      position: absolute;
      right: 16px;
      top: 16px;
      display: grid;
      height: 28px;
      width: 28px;
      place-items: center;
      border-radius: 999px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .label[_ngcontent-%COMP%] {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--%NS%v2-ardoise);
    }
    .seg[_ngcontent-%COMP%] {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      gap: 4px;
      border-radius: 16px;
      padding: 4px;
      background: var(--%NS%v2-creme);
    }
    .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
      border-radius: 12px;
      padding: 10px 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
    }
    .seg[_ngcontent-%COMP%]   button.on[_ngcontent-%COMP%] {
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-foret);
      box-shadow: 0 1px 3px color-mix(in oklab, var(--%NS%v2-foret) 15%, transparent);
    }
    .btn[_ngcontent-%COMP%] {
      display: inline-flex;
      height: 44px;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      padding: 0 14px;
      font-size: 14px;
      font-weight: 800;
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .btn-ghost[_ngcontent-%COMP%] {
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-encre);
    }
    .btn-ghost[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .btn-forest[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .btn-forest[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    .generate[_ngcontent-%COMP%] {
      display: flex;
      height: 60px;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-radius: 20px;
      background: var(--%NS%v2-foret);
      padding: 0 8px 0 22px;
      font-size: 16px;
      font-weight: 800;
      color: var(--%NS%v2-blanc);
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .generate[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    .generate[_ngcontent-%COMP%]:disabled {
      background: var(--%NS%v2-lin);
      color: var(--%NS%v2-gris-texte);
      cursor: not-allowed;
    }
    .chip[_ngcontent-%COMP%] {
      display: grid;
      height: 44px;
      width: 44px;
      place-items: center;
      border-radius: 14px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }
    .generate[_ngcontent-%COMP%]:disabled   .chip[_ngcontent-%COMP%] {
      background: var(--%NS%v2-gris-trait);
      color: var(--%NS%v2-blanc);
    }
    .spin[_ngcontent-%COMP%] {
      animation: _ngcontent-%COMP%_spin 0.9s linear infinite;
    }
    @keyframes _ngcontent-%COMP%_spin {
      to {
        transform: rotate(360deg);
      }
    }
    .report[_ngcontent-%COMP%]:focus-visible, 
   .seg[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]:focus-visible, 
   .btn[_ngcontent-%COMP%]:focus-visible, 
   .generate[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .watermark[_ngcontent-%COMP%], 
   .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%], 
   .report[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {
        transition: none;
        transform: rotate(-12deg);
      }
      .report[_ngcontent-%COMP%], 
   .report[_ngcontent-%COMP%]:hover {
        transition: none;
        transform: none;
      }
      .spin[_ngcontent-%COMP%] {
        animation: none;
      }
    }`]})}};export{Ne as default};