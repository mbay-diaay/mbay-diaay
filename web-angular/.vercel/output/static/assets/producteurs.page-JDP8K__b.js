import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Ln as c,Lt as l,Nt as u,St as d,Vt as f,Wt as p,Yn as m,_t as h,a as g,en as _,fn as v,ft as y,gt as b,hn as x,ln as S,mn as C,mt as w,pn as T,rr as ee,t as E,vt as D,zn as O}from"./_router-chunk-H0-n0SZI.js";import{n as te}from"./rxjs-interop-U_NminAK.js";import{l as ne,n as re}from"./snackbar.component-ICe8-MWg.js";import{B as ie,F as ae,I as oe,L as k,R as se,U as A,W as j,gt as M,i as N,r as P,t as F,xt as I,yt as L}from"./locale.service-Bf8_ncMo.js";import{t as R}from"./app-shell.component-CR4uAChA.js";import{t as z}from"./store.service-ZF4OfoGo.js";import{t as B}from"./pager-DPeF-1nO.js";import{n as V,t as H}from"./v2-page.styles-Blvl6ZBZ.js";import{C as U,S as W,T as G,a as K,n as ce,o as le,w as q}from"./ui-CQhTckzj.js";import{t as ue}from"./global-filters.component-BaLKxEEO.js";var de=e=>({count:e}),fe=e=>({name:e}),J=(e,t)=>t.id,pe=(e,t)=>t.key;function me(e,n){if(e&1){let e=l();a(0,`button`,29),t(`click`,function(){let t=m(e).$implicit,n=f();return o(n.setFilter(`qualite`,t.id))}),v(1),a(2,`span`,30),v(3),r()()}if(e&2){let e=n.$implicit,t=f();b(`on`,t.filters().qualite===e.id),w(`aria-checked`,t.filters().qualite===e.id),y(),C(` `,e.label),y(),b(`zero`,!e.count),y(),T(t.nf.format(e.count))}}function he(e,n){if(e&1){let e=l();a(0,`ui-select`,31),t(`valueChange`,function(t){let n=m(e).$implicit,r=f();return o(r.setFilter(n.key,t))}),r()}if(e&2){let e=n.$implicit,t=f();p(`label`,e.label)(`leadingIcon`,e.icon)(`options`,e.options)(`value`,t.filters()[e.key])}}function ge(e,n){if(e&1){let e=l();a(0,`button`,32),t(`click`,function(){m(e);let t=f();return o(t.resetFilters())}),u(1,`ui-icon`,33),v(2),r()}if(e&2){let e=f();y(),p(`size`,16),y(),x(``,e.t()(`producteurs.index.reset`),` (`,e.activeCount(),`) `)}}function _e(e,n){if(e&1){let e=l();a(0,`li`)(1,`button`,43),t(`click`,function(){let t=m(e).$implicit,n=f(2);return o(n.openDetail(t.id))}),a(2,`span`,44),v(3),r(),a(4,`span`,45)(5,`span`,46),v(6),r(),a(7,`span`,47),v(8),r()(),a(9,`span`,48),v(10),r()()()}if(e&2){let e=n.$implicit,t=n.$index,r=f(2);S(`border-top`,t===0?`none`:`1px solid var(--v2-separateur)`),y(3),T(r.initials(e.firstName+` `+e.lastName)),y(3),x(``,e.firstName,` `,e.lastName),y(2),x(``,e.village,` · `,r.ageLabel(e.age)),y(),S(`background`,r.quality[e.quality].bg)(`color`,r.quality[e.quality].fg),y(),T(r.t()(r.quality[e.quality].label))}}function Y(e,n){if(e&1){let e=l();a(0,`tr`,49),t(`click`,function(){let t=m(e).$implicit,n=f(2);return o(n.openDetail(t.id))}),a(1,`td`)(2,`span`,50)(3,`span`,44),v(4),r(),a(5,`span`,2)(6,`span`,46),v(7),r(),a(8,`span`,51),v(9),r()()()(),a(10,`td`,52),v(11),a(12,`span`),v(13),r()(),a(14,`td`,53),v(15),r(),a(16,`td`,54),v(17),r(),a(18,`td`,55),v(19),r(),a(20,`td`)(21,`span`,48),v(22),r()(),a(23,`td`)(24,`span`,48),v(25),r()(),a(26,`td`)(27,`span`,56)(28,`button`,57),t(`click`,function(t){let n=m(e).$implicit,r=f(2);return t.stopPropagation(),o(r.openDetail(n.id))}),u(29,`ui-icon`,58),r()()()()}if(e&2){let e=n.$implicit,t=f(2);y(3),S(`background`,e.sex===`F`?`var(--v2-culture-bg)`:`var(--v2-sauge)`)(`color`,e.sex===`F`?`var(--v2-culture-fg)`:`var(--v2-foret)`),y(),T(t.initials(e.firstName+` `+e.lastName)),y(3),x(``,e.firstName,` `,e.lastName),y(2),T(e.code),y(2),C(` `,t.t()(e.sex===`F`?`producteurs.sex.F`:`producteurs.sex.H`),` · `),y(),b(`zero`,e.age===null),y(),T(t.ageLabel(e.age)),y(2),T(e.village),y(),b(`zero`,!t.orgName(e.orgId)),y(),C(` `,t.orgName(e.orgId)||`—`,` `),y(2),C(` `,t.store.phone(e.phone),` `),y(2),S(`background`,t.status[e.status].bg)(`color`,t.status[e.status].fg),y(),T(t.t()(t.status[e.status].label)),y(2),S(`background`,t.quality[e.quality].bg)(`color`,t.quality[e.quality].fg),y(),T(t.t()(t.quality[e.quality].label)),y(3),p(`title`,t.t()(`common.view`)),w(`aria-label`,t.t()(`producteurs.index.view`,s(30,fe,e.firstName+` `+e.lastName))),y(),p(`size`,18)}}function ve(t,n){if(t&1&&(a(0,`ul`,34),_(1,_e,11,12,`li`,35,J),r(),a(3,`div`,36)(4,`table`,37)(5,`thead`)(6,`tr`)(7,`th`),v(8),r(),a(9,`th`),v(10),r(),a(11,`th`),v(12),r(),a(13,`th`,38),v(14),r(),a(15,`th`,39),v(16),r(),a(17,`th`),v(18),r(),a(19,`th`),v(20),r(),a(21,`th`,40),v(22),r()()(),a(23,`tbody`),_(24,Y,30,32,`tr`,41,J),r()()(),u(26,`ui-pagination`,42)),t&2){let t=f();y(),e(t.pager.items()),y(7),T(t.t()(`producteurs.index.colProducer`)),y(2),T(t.t()(`producteurs.index.colSexAge`)),y(2),T(t.t()(`producteurs.col.village`)),y(2),T(t.t()(`producteurs.col.organisation`)),y(2),T(t.t()(`producteurs.col.phone`)),y(2),T(t.t()(`producteurs.col.status`)),y(2),T(t.t()(`producteurs.col.quality`)),y(2),T(t.t()(`producteurs.index.colActions`)),y(2),e(t.pager.items()),y(2),p(`pager`,t.pager)}}function ye(e,n){if(e&1){let e=l();a(0,`button`,32),t(`click`,function(){m(e);let t=f(2);return o(t.resetFilters())}),v(1),r()}if(e&2){let e=f(2);y(),C(` `,e.t()(`producteurs.index.reset`),` `)}}function be(e,t){if(e&1&&(a(0,`div`,24)(1,`span`,59),u(2,`ui-icon`,13),r(),a(3,`p`,60),v(4),r(),D(5,ye,2,1,`button`,22),r()),e&2){let e=f();y(2),p(`size`,26),y(2),C(` `,e.t()(`producteurs.index.empty`),` `),y(),h(e.activeCount()>0?5:-1)}}var X=`__all`;function Z(e){let t=t=>e.get(t);return{q:t(`q`)??``,village:t(`village`)??X,sexe:t(`sexe`)??X,age:t(`age`)??X,qualite:t(`qualite`)??X,culture:t(`culture`)??X,scoop:t(`scoop`)??``,campagne:t(`campagne`)??``}}var xe=[`validé`,`à vérifier`,`doublon`,`invalide`],Q={validé:{label:`producteurs.quality.validé`,...H.succes},"à vérifier":{label:`producteurs.quality.à vérifier`,...H.attente},doublon:{label:`producteurs.quality.doublon`,...H.info},invalide:{label:`producteurs.quality.invalide`,...H.erreur}},$={recensé:{label:`producteurs.status.recensé`,...H.neutre},membre:{label:`producteurs.status.membre`,...H.culture}},Se=class o{constructor(){this.store=O(z),this.locale=O(F),this.snackbar=O(re),this.router=O(g),this.route=O(E),this.t=this.locale.t,this.nf=j,this.maskPhone=A,this.initials=V,this.quality=Q,this.status=$,this.queryState=te(this.route.queryParamMap.pipe(ee(Z)),{initialValue:Z(this.route.snapshot.queryParamMap)}),this.q=i(this.queryState().q),this.exportOpen=i(!1),this.filters=i({village:this.queryState().village,sexe:this.queryState().sexe,age:this.queryState().age,qualite:this.queryState().qualite,culture:this.queryState().culture}),this._syncFromUrl=c(()=>{let e=this.queryState();this.q.set(e.q),this.filters.set({village:e.village,sexe:e.sexe,age:e.age,qualite:e.qualite,culture:e.culture})}),this.nominatif=n(()=>{let e=this.store.state().session;return e?N(e,`producer.export_nominatif`):!1}),this.exportDesc=n(()=>this.t()(this.nominatif()?`producteurs.index.exportNominatifDesc`:`producteurs.index.exportAnonymiseDesc`,{total:j.format(this.rows().length)})),this.filterDefs=n(()=>{let e=this.t(),t=(t,n,r,i)=>({key:t,label:n,icon:r,options:[{value:X,label:e(`producteurs.index.filterAll`,{label:n})},...i.map(([e,t])=>({value:e,label:t}))]});return[t(`village`,e(`producteurs.col.village`),`location_on`,L.map(e=>[e,e])),t(`sexe`,e(`producteurs.col.sex`),`person`,[[`F`,e(`producteurs.sex.F`)],[`H`,e(`producteurs.sex.H`)]]),t(`age`,e(`producteurs.col.age`),`calendar_today`,ae.map(t=>[t,e(`producteurs.index.ageBand`,{band:t})])),t(`culture`,e(`producteurs.col.crop`),`grass`,M.map(e=>[e,e]))]}),this.beforeQuality=n(()=>this.filterRows(!0)),this.qualityButtons=n(()=>{let e=this.t(),t=this.beforeQuality();return[{id:X,label:e(`producteurs.index.qualityAll`),count:t.length},...xe.map(n=>({id:n,label:e(Q[n].label),count:t.filter(e=>e.quality===n).length}))]}),this.stats=n(()=>{let e=this.t(),t=this.rows(),n=t.length||1,r=e=>Math.round(e/n*100),i=this.store.state().youthMaxAge,a=t.filter(e=>e.status===`membre`).length,o=t.filter(e=>e.sex===`F`).length,s=t.filter(e=>e.sex===`H`).length,c=t.filter(e=>oe(e.age,i)).length,l=t.filter(e=>e.quality===`validé`).length,u=t.filter(e=>e.quality===`à vérifier`).length;return[{label:e(`producteurs.index.stat.total`),value:j.format(t.length),sub:e(`producteurs.index.stat.totalSub`,{members:j.format(a),census:j.format(t.length-a)}),icon:`agriculture`,bg:``,fg:``},{label:e(`producteurs.index.stat.men`),value:j.format(s),sub:e(`producteurs.index.stat.shareSub`,{pct:r(s)}),icon:`person`,...H.info},{label:e(`producteurs.index.stat.women`),value:j.format(o),sub:e(`producteurs.index.stat.shareSub`,{pct:r(o)}),icon:`female`,...H.culture},{label:e(`producteurs.index.stat.youth`),value:j.format(c),sub:e(`producteurs.index.stat.youthSub`,{age:i,pct:r(c)}),icon:`grass`,...H.attente},{label:e(`producteurs.index.stat.validated`),value:`${r(l)} %`,sub:e(`producteurs.index.stat.validatedSub`,{count:j.format(u)}),icon:`task_alt`,...H.succes}]}),this.activeCount=n(()=>Object.values(this.filters()).filter(e=>e!==X).length),this.rows=n(()=>this.filterRows(!1)),this.pager=B(()=>this.rows()),this.detailId=i(null),this.detail=n(()=>{let e=this.detailId();if(!e)return null;let t=this.store.state(),n=t.producers.find(t=>t.id===e);if(!n)return null;let r=this.t(),i=t.plots.filter(e=>e.producerId===n.id),a=i.reduce((e,t)=>e+(t.measured||t.declared||0),0),o=t.scoops.find(e=>e.id===n.scoopId),s=this.orgName(n.orgId),c=[...n.crops].sort((e,t)=>t.campaign.localeCompare(e.campaign)),l=Q[n.quality],u=$[n.status];return{title:`${n.firstName} ${n.lastName}`,subtitle:[n.code,n.village].filter(Boolean).join(` · `),icon:`agriculture`,badges:[{label:r(u.label),bg:u.bg,fg:u.fg},{label:r(l.label),bg:l.bg,fg:l.fg}],kpis:[q(r(`producteurs.quick.plots`),i.length,`landscape`,H.info),q(r(`producteurs.quick.area`),a,`square_foot`,H.succes,r(`producteurs.quick.areaValue`,{area:a.toLocaleString(this.locale.locale()===`wo`?`fr-SN`:`fr-FR`,{maximumFractionDigits:2})})),q(r(`producteurs.quick.crops`),n.crops.length,`grass`,H.culture)],facts:[U(r(`producteurs.col.sex`),r(n.sex===`F`?`producteurs.sex.F`:`producteurs.sex.H`),`person`),U(r(`producteurs.col.age`),n.age===null?null:this.ageLabel(n.age),`calendar_today`),U(r(`producteurs.col.phone`),this.store.phone(n.phone)||null,`call`),U(r(`producteurs.col.village`),n.village,`location_on`),U(r(`producteurs.col.organisation`),s||null,`hub`),U(r(`producteurs.quick.cooperative`),o?.name,`apartment`),U(r(`producteurs.quick.enumerator`),n.enumerator,`badge`),U(r(`producteurs.quick.createdAt`),n.createdAt?ie(n.createdAt):null,`event_note`)],sections:[{title:r(`producteurs.quick.crops`),icon:`grass`,count:c.length,empty:r(`producteurs.quick.cropsEmpty`),items:c.slice(0,8).map(e=>({label:e.crop,sub:r(`producteurs.quick.cropSub`,{campaign:e.campaign,area:e.area.toLocaleString(`fr-FR`,{maximumFractionDigits:2})}),initials:e.crop.slice(0,2).toUpperCase()})),more:Math.max(0,c.length-8)}],link:[`/dashboard/producteurs`,n.id]}})}filterRows(e){let t=this.store.state(),n=this.q().trim().toLowerCase(),r=this.filters(),i=this.queryState();return I(t.producers.filter(e=>!e.mergedInto),t.session).filter(t=>(!n||`${t.firstName} ${t.lastName} ${t.code}`.toLowerCase().includes(n))&&(!i.scoop||t.scoopId===i.scoop)&&(!i.campagne||t.crops.some(e=>e.campaign===i.campagne))&&(r.village===X||t.village===r.village)&&(r.sexe===X||t.sex===r.sexe)&&(r.age===X||k(t.age)===r.age)&&(e||r.qualite===X||t.quality===r.qualite)&&(r.culture===X||t.crops.some(e=>e.crop===r.culture)))}ageLabel(e){return e===null?`—`:this.t()(`cooperatives.fiche.detail.ageValue`,{count:e})}openDetail(e){this.detailId.set(e)}orgName(e){return e?this.store.state().orgs.find(t=>t.id===e)?.name??``:``}patchQuery(e){this.pager.setPage(1),this.router.navigate([],{relativeTo:this.route,queryParams:e,queryParamsHandling:`merge`,replaceUrl:!0})}onSearch(e){this.patchQuery({q:e.trim()?e:null})}setFilter(e,t){this.patchQuery({[e]:t===X?null:t})}resetFilters(){this.patchQuery({village:null,sexe:null,age:null,qualite:null,culture:null})}doExport(){let e=this.rows(),t=this.store.state().scoops,n=this.nominatif(),r=n?[`Code`,`Prénom`,`Nom`,`Sexe`,`Âge`,`Village`,`SCOOP`,`Statut`,`Qualité`]:[`Code`,`Sexe`,`Tranche d'âge`,`Village`,`SCOOP`,`Statut`,`Qualité`],i=e.map(e=>{let r=t.find(t=>t.id===e.scoopId)?.name??``;return n?[e.code,e.firstName,e.lastName,e.sex,e.age??``,e.village,r,e.status,e.quality]:[e.code,e.sex,k(e.age),e.village,r,e.status,e.quality]});try{se(`producteurs${n?`_nominatif`:``}.csv`,[r,...i])}catch{this.snackbar.error(`${this.t()(`common.exportError`)} · ${this.t()(`common.exportErrorDesc`)}`);return}P.audit(n?`Export nominatif`:`Export anonymisé`,`Producteurs`,`${e.length} lignes (CSV)`),this.snackbar.success(`${this.t()(`producteurs.index.exportReady`)} · ${this.t()(`producteurs.index.exportReadyDesc`,{total:this.nf.format(e.length)})}`),this.exportOpen.set(!1)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=d({type:o,selectors:[[`app-producteurs-page`]],decls:41,vars:27,consts:[[`perm`,`producer.read`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`download`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[1,`card`,`mt-6`,`p-2`],[1,`toolbar`,`p-0`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[1,`filters`,`mt-2`],[3,`campaign`],[`variant`,`compact`,3,`label`,`leadingIcon`,`options`,`value`],[1,`mt-4`,`flex`,`min-h-6`,`flex-wrap`,`items-center`,`justify-between`,`gap-3`],[`aria-live`,`polite`,1,`sub`],[`type`,`button`,1,`reset`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`closed`,`view`],[`icon`,`download`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[`variant`,`compact`,3,`valueChange`,`label`,`leadingIcon`,`options`,`value`],[`type`,`button`,1,`reset`,3,`click`],[`name`,`close`,3,`size`],[1,`md:hidden`],[3,`border-top`],[1,`hidden`,`overflow-x-auto`,`md:block`],[1,`tbl`,`min-w-[860px]`],[1,`hidden`,`xl:table-cell`],[1,`hidden`,`lg:table-cell`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[`type`,`button`,1,`row-link`,`flex`,`w-full`,`items-center`,`gap-3`,`px-4`,`py-3.5`,`text-left`,3,`click`],[1,`avatar`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`badge`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`code`,`block`],[1,`whitespace-nowrap`,`font-medium`,`tabular-nums`],[1,`font-medium`],[1,`hidden`,`max-w-56`,`truncate`,`font-medium`,`xl:table-cell`],[1,`hidden`,`whitespace-nowrap`,`tabular-nums`,`lg:table-cell`,2,`color`,`var(--v2-gris-texte)`],[1,`flex`,`justify-end`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`text-[15px]`,`font-semibold`,2,`color`,`var(--v2-ardoise)`]],template:function(n,i){n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),v(4),r(),a(5,`h1`,4),v(6),r(),a(7,`p`,5),v(8),r()(),a(9,`button`,6),t(`click`,function(){return i.exportOpen.set(!0)}),v(10),a(11,`span`,7),u(12,`ui-icon`,8),r()()(),u(13,`ui-stat-cards`,9),a(14,`div`,10)(15,`div`,11)(16,`label`,12),u(17,`ui-icon`,13),a(18,`input`,14),t(`input`,function(e){return i.onSearch(e.target.value)}),r()(),a(19,`div`,15),_(20,me,4,7,`button`,16,J),r()(),a(22,`div`,17),u(23,`app-global-filters`,18),_(24,he,1,4,`ui-select`,19,pe),r()(),a(26,`div`,20)(27,`p`,21),v(28),r(),D(29,ge,3,3,`button`,22),r(),a(30,`section`,23),D(31,ve,27,9)(32,be,6,3,`div`,24),r(),a(33,`ui-detail-modal`,25),t(`closed`,function(){return i.detailId.set(null)}),r(),a(34,`ui-modal`,26),t(`closed`,function(){return i.exportOpen.set(!1)}),a(35,`button`,27),t(`click`,function(){return i.exportOpen.set(!1)}),v(36),r(),a(37,`button`,28),t(`click`,function(){return i.doExport()}),v(38),a(39,`span`,7),u(40,`ui-icon`,8),r()()()()),n&2&&(p(`area`,i.t()(`producteurs.area`)),y(4),C(` `,i.t()(`producteurs.index.eyebrow`),` `),y(2),C(` `,i.t()(`producteurs.index.title`),` `),y(2),C(` `,i.t()(`producteurs.index.lead`),` `),y(2),C(` `,i.t()(`producteurs.index.exportCsv`),` `),y(2),p(`size`,20),y(),p(`stats`,i.stats()),y(4),p(`size`,20),y(),p(`placeholder`,i.t()(`producteurs.index.searchPlaceholder`))(`value`,i.q()),w(`aria-label`,i.t()(`producteurs.index.searchLabel`)),y(),w(`aria-label`,i.t()(`producteurs.col.quality`)),y(),e(i.qualityButtons()),y(3),p(`campaign`,!0),y(),e(i.filterDefs()),y(4),C(` `,i.t()(i.rows().length>1?`producteurs.index.count.autre`:`producteurs.index.count.un`,s(25,de,i.nf.format(i.rows().length))),` `),y(),h(i.activeCount()>0?29:-1),y(2),h(i.rows().length?31:32),y(2),p(`view`,i.detail()),y(),p(`open`,i.exportOpen())(`title`,i.nominatif()?i.t()(`producteurs.index.exportNominatif`):i.t()(`producteurs.index.exportAnonymise`))(`description`,i.exportDesc())(`width`,520)(`closeLabel`,i.t()(`common.close`)),y(2),C(` `,i.t()(`producteurs.index.cancel`),` `),y(2),C(` `,i.t()(`producteurs.index.export`),` `),y(2),p(`size`,18))},dependencies:[ue,R,ne,G,W,K,le,ce],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.filters[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
        gap: 8px;
      }
      .reset[_ngcontent-%COMP%] {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 14px;
        font-weight: 800;
        color: var(--%NS%v2-foret);
        cursor: pointer;
      }
      .reset[_ngcontent-%COMP%]:hover {
        text-decoration: underline;
      }
      .code[_ngcontent-%COMP%] {
        font-family: var(--%NS%v2-font-mono);
        font-size: 11.5px;
        font-weight: 600;
        color: var(--%NS%v2-gris-texte);
      }`]})}};export{Se as default};