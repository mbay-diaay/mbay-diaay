import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,a as h,en as g,fn as _,ft as v,gt as y,hn as b,ln as x,mn as S,mt as C,pn as w,rr as T,t as E,tn as D,vt as O,zn as k}from"./_router-chunk-H0-n0SZI.js";import{n as A}from"./rxjs-interop-U_NminAK.js";import{l as ee,n as te}from"./snackbar.component-ICe8-MWg.js";import{n as ne}from"./index-B8S1FFME.js";import{B as re,G as j,I as M,R as N,W as P,n as F,r as I,t as L,vt as R,xt as z,z as B}from"./locale.service-Bf8_ncMo.js";import{t as V}from"./app-shell.component-CR4uAChA.js";import{t as H}from"./pager-DPeF-1nO.js";import{t as U}from"./plot-map.component-DCd5n385.js";import{n as W,t as G}from"./v2-page.styles-Blvl6ZBZ.js";import{t as K}from"./store.service-ZF4OfoGo.js";import{E as q,T as J,a as Y,n as X}from"./ui-CQhTckzj.js";var ie=e=>({label:e,link:`/dashboard/organisations`}),ae=e=>[`/dashboard/producteurs`,e],oe=e=>({name:e}),Z=(e,t)=>t.id;function se(e,t){if(e&1&&(a(0,`div`,1)(1,`span`,2),l(2,`ui-icon`,3),r(),a(3,`h1`,4),_(4),r(),a(5,`p`,5),_(6),r(),a(7,`a`,6),_(8),r()()),e&2){let e=d();v(2),f(`size`,26),v(2),S(` `,e.org()?e.t()(`organisations.detail.outOfScope`):e.t()(`organisations.detail.notFound`),` `),v(2),S(` `,e.org()?e.t()(`organisations.detail.outOfScopeHint`):e.t()(`organisations.detail.notFoundHint`),` `),v(2),w(e.t()(`organisations.title`))}}function ce(e,n){if(e&1){let e=c();a(0,`button`,26),t(`click`,function(){p(e);let t=d(3);return o(t.openType())}),l(1,`ui-icon`,27),_(2),r()}if(e&2){let e=d(),t=d(2);v(),f(`size`,18),v(),S(``,e.type?t.t()(`organisations.detail.changeType`):t.t()(`organisations.detail.qualifyOrg`),` `)}}function le(e,n){if(e&1){let e=c();a(0,`button`,28),t(`click`,function(){p(e);let t=d(3);return o(t.exportProducers())}),l(1,`ui-icon`,29),_(2),r()}if(e&2){let e=d(3);v(),f(`size`,18),v(),S(``,e.t()(`organisations.detail.exportMembers`),` `)}}function ue(e,n){if(e&1){let e=c();a(0,`tr`,40),t(`click`,function(){let t=p(e).$implicit,n=d(5);return o(n.openProducer(t.id))}),a(1,`td`)(2,`span`,41)(3,`span`,42),_(4),r(),a(5,`span`,43)(6,`span`,44),_(7),r(),a(8,`span`,45),_(9),r()()()(),a(10,`td`,46),_(11),r(),a(12,`td`,47),_(13),r(),a(14,`td`)(15,`span`,48),_(16),r()(),a(17,`td`)(18,`span`,48),_(19),r()(),a(20,`td`)(21,`span`,49)(22,`a`,50),t(`click`,function(e){return e.stopPropagation()}),l(23,`ui-icon`,51),r()()()()}if(e&2){let e=n.$implicit,t=d(5);v(3),x(`background`,e.sex===`F`?`var(--v2-culture-bg)`:`var(--v2-sauge)`)(`color`,e.sex===`F`?`var(--v2-culture-fg)`:`var(--v2-foret)`),v(),w(t.initials(e.firstName+` `+e.lastName)),v(3),b(``,e.firstName,` `,e.lastName),v(2),w(e.code),v(2),b(` `,t.t()(e.sex===`F`?`producteurs.sex.F`:`producteurs.sex.H`),` · `,t.fmtAge(e.age),` `),v(2),w(e.village),v(2),x(`background`,e.status===`membre`?`var(--v2-culture-bg)`:`var(--v2-lin)`)(`color`,e.status===`membre`?`var(--v2-culture-fg)`:`var(--v2-gris-texte)`),v(),w(t.t()(e.status===`membre`?`producteurs.status.membre`:`producteurs.status.recensé`)),v(2),x(`background`,t.quality[e.quality].bg)(`color`,t.quality[e.quality].fg),v(),w(t.t()(t.quality[e.quality].label)),v(3),f(`routerLink`,s(25,ae,e.id))(`title`,t.t()(`common.view`)),C(`aria-label`,t.t()(`organisations.v2.open`,s(27,oe,e.firstName+` `+e.lastName))),v(),f(`size`,18)}}function de(t,n){if(t&1&&(a(0,`div`,35)(1,`table`,36)(2,`thead`)(3,`tr`)(4,`th`),_(5),r(),a(6,`th`),_(7),r(),a(8,`th`),_(9),r(),a(10,`th`),_(11),r(),a(12,`th`),_(13),r(),a(14,`th`,37),_(15),r()()(),a(16,`tbody`),g(17,ue,24,29,`tr`,38,Z),r()()(),l(19,`ui-pagination`,39)),t&2){let t=d(4);v(5),w(t.t()(`organisations.v2.col.producer`)),v(2),w(t.t()(`organisations.v2.col.sexAge`)),v(2),w(t.t()(`organisations.detail.col.village`)),v(2),w(t.t()(`organisations.v2.col.status`)),v(2),w(t.t()(`organisations.v2.col.quality`)),v(2),w(t.t()(`organisations.col.actions`)),v(2),e(t.producerPager.items()),v(2),f(`pager`,t.producerPager)}}function fe(e,t){if(e&1&&(a(0,`p`,34),_(1),r()),e&2){let e=d(4);v(),S(` `,e.producers().length?e.t()(`organisations.detail.noMatch`):e.t()(`organisations.v2.empty.producers`),` `)}}function pe(e,n){if(e&1){let e=c();a(0,`section`,18)(1,`div`,30)(2,`label`,31),l(3,`ui-icon`,32),a(4,`input`,33),t(`input`,function(t){p(e);let n=d(3);return o(n.q.set(t.target.value))}),r()()(),O(5,de,20,7)(6,fe,2,1,`p`,34),r()}if(e&2){let e=d(3);v(3),f(`size`,20),v(),f(`placeholder`,e.t()(`organisations.detail.search`))(`value`,e.q()),C(`aria-label`,e.t()(`organisations.detail.search`)),v(),m(e.shownProducers().length?5:6)}}function me(e,t){if(e&1&&(a(0,`tr`)(1,`td`)(2,`span`,41)(3,`span`,42),_(4),r(),a(5,`span`,43)(6,`span`,44),_(7),r(),a(8,`span`,54),_(9),r()()()(),a(10,`td`,47),_(11),r(),a(12,`td`)(13,`span`,48),_(14),r()(),a(15,`td`,55),_(16),r()()),e&2){let e=t.$implicit,n=d(5);v(4),w(n.initials(e.firstName+` `+e.lastName)),v(3),b(``,e.firstName,` `,e.lastName),v(),y(`zero`,!e.phone),v(),w(n.store.phone(e.phone)||`—`),v(2),w(e.village||`—`),v(2),x(`background`,n.memberTone(e.status).bg)(`color`,n.memberTone(e.status).fg),v(),w(n.t()(n.memberKey(e.status))),v(),y(`zero`,!e.joinedAt),v(),S(` `,e.joinedAt?n.fmtDate(e.joinedAt):`—`,` `)}}function he(t,n){if(t&1&&(a(0,`div`,35)(1,`table`,53)(2,`thead`)(3,`tr`)(4,`th`),_(5),r(),a(6,`th`),_(7),r(),a(8,`th`),_(9),r(),a(10,`th`),_(11),r()()(),a(12,`tbody`),g(13,me,17,15,`tr`,null,Z),r()()(),l(15,`ui-pagination`,39)),t&2){let t=d(4);v(5),w(t.t()(`cooperatives.fiche.membres.col.name`)),v(2),w(t.t()(`organisations.detail.col.village`)),v(2),w(t.t()(`organisations.v2.col.status`)),v(2),w(t.t()(`organisations.v2.col.joined`)),v(2),e(t.memberPager.items()),v(2),f(`pager`,t.memberPager)}}function ge(e,t){if(e&1&&(a(0,`p`,52),_(1),r()),e&2){let e=d(4);v(),w(e.t()(`organisations.v2.empty.members`))}}function _e(e,t){if(e&1&&(a(0,`section`,18),O(1,he,16,5)(2,ge,2,1,`p`,52),r()),e&2){let e=d(3);v(),m(e.members().length?1:2)}}function ve(e,t){if(e&1&&(a(0,`section`,58)(1,`div`,61),l(2,`app-plot-map`,62),r()()),e&2){let e=d(5);v(2),f(`plots`,e.plots())(`selectedId`,e.selectedPlot()??e.plots()[0].id)(`onSelect`,e.selectPlot)}}function ye(e,n){if(e&1){let e=c();a(0,`tr`,63),t(`click`,function(){let t=p(e).$implicit,n=d(5);return o(n.selectPlot(t.id))})(`keydown.enter`,function(){let t=p(e).$implicit,n=d(5);return o(n.selectPlot(t.id))}),a(1,`td`)(2,`span`,64),_(3),r()(),a(4,`td`,65),_(5),r(),a(6,`td`,66),_(7),r(),a(8,`td`)(9,`span`,48),_(10),r()()()}if(e&2){let e=n.$implicit,t=d(5);y(`font-bold`,t.selectedPlot()===e.id),v(3),w(e.code),v(2),w(e.crop),v(2),S(` `,t.nf1.format(e.measured),` ha `),v(2),x(`background`,t.plotTone(e.status).bg)(`color`,t.plotTone(e.status).fg),v(),w(e.status)}}function be(t,n){if(t&1&&(a(0,`div`,56),O(1,ve,3,3,`section`,58),a(2,`section`,58)(3,`div`,35)(4,`table`,59)(5,`thead`)(6,`tr`)(7,`th`),_(8),r(),a(9,`th`),_(10),r(),a(11,`th`,37),_(12),r(),a(13,`th`),_(14),r()()(),a(15,`tbody`),g(16,ye,11,10,`tr`,60,Z),r()()(),l(18,`ui-pagination`,39),r()()),t&2){let t=d(4);v(),m(t.store.can(`map.read`)?1:-1),v(7),w(t.t()(`organisations.v2.col.plot`)),v(2),w(t.t()(`organisations.v2.col.crop`)),v(2),w(t.t()(`organisations.v2.col.measured`)),v(2),w(t.t()(`organisations.v2.col.state`)),v(2),e(t.plotPager.items()),v(2),f(`pager`,t.plotPager)}}function xe(e,t){if(e&1&&(a(0,`p`,57),_(1),r()),e&2){let e=d(4);v(),w(e.t()(`organisations.v2.empty.plots`))}}function Q(e,t){if(e&1&&O(0,be,19,6,`div`,56)(1,xe,2,1,`p`,57),e&2){let e=d(3);m(+!e.plots().length)}}function Se(e,n){if(e&1){let e=c();a(0,`button`,67),t(`click`,function(){let t=p(e).$implicit,n=d(3);return o(n.pickType.set(t))}),_(1),r()}if(e&2){let e=n.$implicit,t=d(3);y(`on`,t.pickType()===e),C(`aria-checked`,t.pickType()===e),v(),S(` `,t.locale.tEnum(`organisations.type`,e),` `)}}function Ce(n,i){if(n&1){let e=c();a(0,`ui-detail-hero`,7),O(1,ce,3,2,`button`,8),r(),l(2,`ui-stat-cards`,9),a(3,`div`,10)(4,`div`,11)(5,`button`,12),t(`click`,function(){p(e);let t=d(2);return o(t.tab.set(`producers`))}),l(6,`ui-icon`,13),_(7),a(8,`span`,14),_(9),r()(),a(10,`button`,12),t(`click`,function(){p(e);let t=d(2);return o(t.tab.set(`members`))}),l(11,`ui-icon`,15),_(12),a(13,`span`,14),_(14),r()(),a(15,`button`,12),t(`click`,function(){p(e);let t=d(2);return o(t.tab.set(`plots`))}),l(16,`ui-icon`,16),_(17),a(18,`span`,14),_(19),r()()(),O(20,le,3,2,`button`,17),r(),O(21,pe,7,5,`section`,18),O(22,_e,3,1,`section`,18),O(23,Q,2,1),a(24,`ui-modal`,19),t(`closed`,function(){p(e);let t=d(2);return o(t.typeOpen.set(!1))}),a(25,`div`,20),g(26,Se,2,4,`button`,21,D),r(),a(28,`button`,22),t(`click`,function(){p(e);let t=d(2);return o(t.typeOpen.set(!1))}),_(29),r(),a(30,`button`,23),t(`click`,function(){let t=p(e),n=d(2);return o(n.saveType(t.id))}),_(31),a(32,`span`,24),l(33,`ui-icon`,25),r()()()}if(n&2){let t=i,n=d(2);f(`crumb`,s(47,ie,n.t()(`organisations.title`)))(`title`,t.name)(`mono`,n.initials(t.name))(`badges`,n.heroBadges())(`meta`,n.heroMeta())(`backLabel`,n.t()(`organisations.title`)),v(),m(n.store.can(`org.manage`)?1:-1),v(),f(`stats`,n.stats()),v(2),C(`aria-label`,n.t()(`organisations.v2.tabs.aria`)),v(),y(`on`,n.tab()===`producers`),C(`aria-selected`,n.tab()===`producers`),v(),f(`size`,18),v(),w(n.t()(`organisations.v2.tab.producers`)),v(),y(`zero`,!n.producers().length),v(),w(n.producers().length),v(),y(`on`,n.tab()===`members`),C(`aria-selected`,n.tab()===`members`),v(),f(`size`,18),v(),w(n.t()(`organisations.v2.tab.members`)),v(),y(`zero`,!n.members().length),v(),w(n.members().length),v(),y(`on`,n.tab()===`plots`),C(`aria-selected`,n.tab()===`plots`),v(),f(`size`,18),v(),w(n.t()(`organisations.v2.tab.plots`)),v(),y(`zero`,!n.plots().length),v(),w(n.plots().length),v(),m(n.tab()===`producers`&&n.producers().length?20:-1),v(),m(n.tab()===`producers`?21:-1),v(),m(n.tab()===`members`?22:-1),v(),m(n.tab()===`plots`?23:-1),v(),f(`open`,n.typeOpen())(`title`,t.type?n.t()(`organisations.detail.changeType`):n.t()(`organisations.detail.qualifyOrg`))(`description`,n.t()(`organisations.detail.dialogHint`))(`width`,560)(`closeLabel`,n.t()(`common.close`)),v(),C(`aria-label`,n.t()(`organisations.detail.chooseType`)),v(),e(n.orgTypes),v(3),S(` `,n.t()(`common.cancel`),` `),v(),f(`disabled`,!n.pickType()),v(),S(` `,n.t()(`organisations.detail.save`)),v(2),f(`size`,18)}}function we(e,t){if(e&1&&O(0,Ce,34,49),e&2){let e,t=d();m((e=t.org())?0:-1,e)}}var Te={validé:{label:`producteurs.quality.validé`,...G.succes},"à vérifier":{label:`producteurs.quality.à vérifier`,...G.attente},doublon:{label:`producteurs.quality.doublon`,...G.info},invalide:{label:`producteurs.quality.invalide`,...G.erreur}},Ee={relevée:G.info,validée:G.succes,"à reprendre":G.attente,chevauchement:G.erreur},De={membre:G.succes,candidat:G.info,suspendu:G.attente,sorti:G.neutre},$=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),Oe=class e{constructor(){this.route=k(E),this.router=k(h),this.snackbar=k(te),this.store=k(K),this.locale=k(L),this.t=this.locale.t,this.nf1=j,this.fmtAge=B,this.fmtDate=re,this.initials=W,this.quality=Te,this.orgTypes=R,this.tab=i(`producers`),this.q=i(``),this.selectedPlot=i(void 0),this.selectPlot=e=>this.selectedPlot.set(e),this.typeOpen=i(!1),this.pickType=i(null),this.id=A(this.route.paramMap.pipe(T(e=>e.get(`id`)??``)),{initialValue:``}),this.org=n(()=>this.store.state().orgs.find(e=>e.id===this.id())),this.inScopeOrg=n(()=>{let e=this.org();return!!e&&z([e],this.store.state().session).length===1}),this.producers=n(()=>this.store.state().producers.filter(e=>e.orgId===this.id()&&!e.mergedInto).sort((e,t)=>`${e.lastName}${e.firstName}`.localeCompare(`${t.lastName}${t.firstName}`))),this.shownProducers=n(()=>{let e=$(this.q().trim());return this.producers().filter(t=>!e||$(`${t.firstName} ${t.lastName} ${t.code} ${t.village}`).includes(e))}),this.members=n(()=>this.store.state().members.filter(e=>e.orgId===this.id()).sort((e,t)=>`${e.lastName}${e.firstName}`.localeCompare(`${t.lastName}${t.firstName}`))),this.plots=n(()=>{let e=new Set(this.producers().map(e=>e.id));return this.store.state().plots.filter(t=>e.has(t.producerId))}),this.producerPager=H(()=>this.shownProducers()),this.memberPager=H(()=>this.members()),this.plotPager=H(()=>this.plots()),this.stats=n(()=>{let e=this.t(),t=this.producers(),n=this.plots(),r=new Set(n.map(e=>e.id)),i=new Set(t.map(e=>e.id)),a=this.store.state().alerts.filter(e=>(i.has(e.entityId)||r.has(e.entityId))&&(e.status===`ouvert`||e.status===`en vérification`)).length,o=t.filter(e=>e.sex===`F`).length,s=this.store.state().youthMaxAge,c=t.filter(e=>M(e.age,s)).length,l=n.reduce((e,t)=>e+(t.measured||0),0),u=n.reduce((e,t)=>e+(t.declared||0),0),d=t.filter(e=>e.quality!==`validé`).length;return[{label:e(`organisations.col.producers`),value:P.format(t.length),sub:e(`organisations.v2.stat.producersSub`,{women:P.format(o),men:P.format(t.length-o)}),icon:`agriculture`,bg:``,fg:``},{label:e(`organisations.detail.youth`,{age:s}),value:P.format(c),sub:e(`producteurs.index.stat.shareSub`,{pct:t.length?Math.round(c/t.length*100):0}),icon:`grass`,...G.attente},{label:e(`organisations.detail.measuredArea`),value:`${j.format(l)} ha`,sub:e(`organisations.v2.stat.areaSub`,{declared:j.format(u)}),icon:`square_foot`,...G.succes},{label:e(`organisations.col.toVerify`),value:P.format(d),sub:e(`organisations.v2.stat.toVerifySub`,{alerts:a}),icon:`warning`,...d?G.erreur:G.succes}]}),this.heroBadges=n(()=>{let e=this.org();return e?[e.type?{label:this.locale.tEnum(`organisations.type`,e.type),tone:`citron`,icon:`hub`}:{label:this.t()(`organisations.toQualify`),tone:`warn`,icon:`warning`}]:[]}),this.heroMeta=n(()=>{let e=this.org();return e?[...e.village?[{icon:`location_on`,text:e.village}]:[],{icon:`apartment`,text:this.scoopName(e.scoopId)},{icon:`landscape`,text:`${P.format(this.plots().length)} ${this.t()(`organisations.v2.tab.plots`).toLowerCase()}`}]:[]})}scoopName(e){return this.store.state().scoops.find(t=>t.id===e)?.name??``}plotTone(e){return Ee[e]??G.neutre}memberTone(e){return De[e]??G.neutre}memberKey(e){return`cooperatives.fiche.status.${e}`}openProducer(e){this.router.navigate([`/dashboard/producteurs`,e])}openType(){this.pickType.set(this.org()?.type??null),this.typeOpen.set(!0)}saveType(e){let t=this.pickType();if(t){try{I.qualifyOrgs([e],t)}catch(e){this.snackbar.error(e instanceof F?this.locale.tNow(e.key):String(e));return}this.typeOpen.set(!1),this.snackbar.success(this.t()(`organisations.detail.typeAssigned`,{type:this.locale.tEnum(`organisations.type`,t)}))}}exportProducers(){let e=this.org();if(!e)return;let t=this.store.can(`producer.export_nominatif`),n=t?[`Code`,`Prénom`,`Nom`,`Sexe`,`Âge`,`Village`,`Statut`,`Qualité`]:[`Code`,`Sexe`,`Âge`,`Village`,`Statut`,`Qualité`],r=this.producers().map(e=>t?[e.code,e.firstName,e.lastName,e.sex,e.age??``,e.village,e.status,e.quality]:[e.code,e.sex,e.age??``,e.village,e.status,e.quality]);try{N(`organisation_${e.name.toLowerCase().replace(/[^a-z0-9]+/g,`_`)}.csv`,[n,...r])}catch{this.snackbar.error(this.t()(`common.exportError`));return}I.audit(t?`Export nominatif`:`Export anonymisé`,`Organisation ${e.name}`,`${r.length} lignes (CSV)`),this.snackbar.success(`${this.t()(`organisations.exported`)} · ${this.t()(`organisations.detail.exportedHint`)}`)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=u({type:e,selectors:[[`app-organisation-detail-page`]],decls:3,vars:2,consts:[[`perm`,`producer.read`,3,`area`],[1,`card`,`mx-auto`,`mt-16`,`flex`,`max-w-lg`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`hub`,3,`size`],[1,`text-[22px]`,`font-extrabold`],[1,`sub`],[`routerLink`,`/dashboard/organisations`,1,`btn`,`btn-ghost`,`mt-2`],[3,`crumb`,`title`,`mono`,`badges`,`meta`,`backLabel`],[`hero-actions`,``,`type`,`button`,1,`btn`,`btn-citron`],[1,`rise`,`mt-6`,3,`stats`],[1,`mt-6`,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-3`],[`role`,`tablist`,1,`seg`,`tabs`],[`type`,`button`,`role`,`tab`,3,`click`],[`name`,`agriculture`,3,`size`],[1,`n`],[`name`,`group`,3,`size`],[`name`,`landscape`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`],[1,`sec-card`,`mt-4`],[`icon`,`hub`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`role`,`radiogroup`,1,`types`,`pb-5`],[`type`,`button`,`role`,`radio`,1,`type`,3,`on`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`hero-actions`,``,`type`,`button`,1,`btn`,`btn-citron`,3,`click`],[`name`,`edit`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`download`,3,`size`],[1,`sec-head`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[1,`sub`,`border-t`,`px-5`,`py-6`,2,`border-color`,`var(--v2-separateur)`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[720px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`],[1,`min-w-0`],[1,`block`,`truncate`,`font-bold`],[1,`mono`,`block`,2,`color`,`var(--v2-gris-texte)`],[1,`whitespace-nowrap`,`font-medium`],[1,`font-medium`],[1,`badge`],[1,`flex`,`justify-end`],[1,`act`,3,`click`,`routerLink`,`title`],[`name`,`visibility`,3,`size`],[1,`sub`,`px-5`,`py-6`],[1,`tbl`,`min-w-[600px]`],[1,`sub`,`block`,`tabular-nums`],[1,`font-medium`,`tabular-nums`],[1,`mt-4`,`grid`,`gap-4`,`xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]`],[1,`card`,`sub`,`mt-4`,`p-6`],[1,`sec-card`],[1,`tbl`,`min-w-[520px]`],[`tabindex`,`0`,1,`row-link`,3,`font-bold`],[1,`map`],[`basemap`,`sat`,3,`plots`,`selectedId`,`onSelect`],[`tabindex`,`0`,1,`row-link`,3,`click`,`keydown.enter`],[1,`mono`,2,`color`,`var(--v2-foret)`],[1,`font-semibold`],[1,`text-right`,`font-extrabold`,`tabular-nums`],[`type`,`button`,`role`,`radio`,1,`type`,3,`click`]],template:function(e,t){e&1&&(a(0,`app-shell`,0),O(1,se,9,4,`div`,1)(2,we,1,1),r()),e&2&&(f(`area`,t.t()(`organisations.detail.area`)),v(),m(!t.org()||!t.inScopeOrg()?1:2))},dependencies:[V,q,ee,J,Y,U,ne,X],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.tabs[_ngcontent-%COMP%] {
        width: fit-content;
        max-width: 100%;
      }
      .tabs[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        padding: 11px 16px;
        font-size: 15px;
      }
      .map[_ngcontent-%COMP%] {
        height: 360px;
      }
      .types[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 8px;
      }
      .type[_ngcontent-%COMP%] {
        border-radius: 14px;
        border: 1.5px solid var(--%NS%v2-bord-carte);
        padding: 12px;
        text-align: left;
        font-size: 14px;
        font-weight: 800;
        cursor: pointer;
      }
      .type[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-gris-texte);
      }
      .type.on[_ngcontent-%COMP%] {
        border: 2px solid var(--%NS%v2-foret);
        background: var(--%NS%v2-sauge);
        padding: 11.5px;
      }`]})}};export{Oe as default};