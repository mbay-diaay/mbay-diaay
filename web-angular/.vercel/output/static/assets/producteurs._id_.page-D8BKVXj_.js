import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gt as v,hn as y,ln as b,mn as x,mt as S,pn as C,rr as w,t as T,vt as E,zn as D}from"./_router-chunk-H0-n0SZI.js";import{n as O}from"./rxjs-interop-U_NminAK.js";import{l as ee,n as te}from"./snackbar.component-ICe8-MWg.js";import{n as ne}from"./index-B8S1FFME.js";import{B as k,G as A,H as j,U as M,V as N,W as P,t as F,xt as I,z as L}from"./locale.service-Bf8_ncMo.js";import{t as R}from"./app-shell.component-CR4uAChA.js";import{t as z}from"./plot-map.component-DCd5n385.js";import{t as B}from"./store.service-ZF4OfoGo.js";import{n as V,t as H}from"./v2-page.styles-Blvl6ZBZ.js";import{E as U,T as W,n as G,t as K}from"./ui-CQhTckzj.js";var q=e=>({label:e,link:`/dashboard/producteurs`}),J=e=>[`/dashboard/producteurs`,e],Y=e=>[`/dashboard/organisations`,e],X=e=>({code:e}),Z=e=>({n:e}),re=(e,t)=>t.campaign+t.crop,ie=(e,t)=>t.at+t.field,ae=(e,t)=>t.id,oe=(e,t)=>t.field+t.from+t.to;function se(e,t){if(e&1&&(a(0,`div`,1)(1,`span`,2),l(2,`ui-icon`,3),r(),a(3,`h1`,4),g(4),r(),a(5,`p`,5),g(6),r(),a(7,`a`,6),g(8),r()()),e&2){let e=d(2);_(2),f(`size`,26),_(2),C(e.t()(`producteurs.detail.outOfScope`)),_(2),C(e.t()(`producteurs.detail.outOfScopeDesc`)),_(2),C(e.t()(`producteurs.index.title`))}}function ce(e,n){if(e&1){let e=c();a(0,`button`,62),t(`click`,function(){p(e);let t=d(3);return o(t.openCorrection())}),l(1,`ui-icon`,63),g(2),r()}if(e&2){let e=d(3);_(),f(`size`,18),_(),x(``,e.t()(`producteurs.detail.requestEdit`),` `)}}function le(e,t){if(e&1&&(a(0,`p`,9),l(1,`ui-icon`,64),g(2),a(3,`a`,65),g(4),r()()),e&2){let e=d(2),t=d();_(),f(`size`,18),_(),x(``,t.t()(`producteurs.detail.merged`),` `),_(),f(`routerLink`,s(4,J,e.mergedInto)),_(),C(t.t()(`producteurs.detail.seeMain`))}}function ue(e,n){if(e&1){let e=c();a(0,`button`,66),t(`click`,function(){p(e);let t=d(3);return o(t.openCniDialog())}),l(1,`ui-icon`,47),g(2),r()}if(e&2){let e=d(3);_(),f(`size`,14),_(),x(``,e.t()(`producteurs.detail.reveal`),` `)}}function de(e,n){if(e&1){let e=c();a(0,`button`,66),t(`click`,function(){p(e);let t=d(2),n=d();return o(n.revealPhone(t))}),l(1,`ui-icon`,47),g(2),r()}if(e&2){let e=d(3);_(),f(`size`,14),_(),x(``,e.t()(`producteurs.detail.reveal`),` `)}}function fe(e,t){if(e&1&&(a(0,`a`,26),g(1),r()),e&2){let e=t;f(`routerLink`,s(2,Y,e.id)),_(),C(e.name)}}function pe(e,t){e&1&&(a(0,`span`,27),g(1,`—`),r())}function me(e,t){if(e&1&&(a(0,`section`,31)(1,`div`,13)(2,`h2`)(3,`span`,14),l(4,`ui-icon`,67),r(),g(5),r()(),a(6,`div`,68),l(7,`app-plot-map`,69),r(),a(8,`p`,70),g(9),r()()),e&2){let e=d(3);_(4),f(`size`,18),_(),x(``,e.t()(`producteurs.detail.plotsMap`),` `),_(2),f(`plots`,e.plots())(`selectedId`,e.selectedPlotId()??e.plots()[0].id)(`onSelect`,e.selectPlot),_(2),C(e.t()(`producteurs.detail.plotsMapHint`))}}function he(e,n){if(e&1){let e=c();a(0,`tr`,74),t(`click`,function(){let t=p(e).$implicit,n=d(4);return o(n.selectPlot(t.id))})(`keydown.enter`,function(){let t=p(e).$implicit,n=d(4);return o(n.selectPlot(t.id))}),a(1,`td`)(2,`span`,75),g(3),r()(),a(4,`td`,76),g(5),r(),a(6,`td`,77),g(7),r(),a(8,`td`,78),g(9),r(),a(10,`td`,79),g(11),r(),a(12,`td`)(13,`span`,80),g(14),r()()()}if(e&2){let e=n.$implicit,t=d(4);v(`font-bold`,t.selectedPlotId()===e.id),S(`aria-label`,t.t()(`producteurs.v2.viewPlot`,s(13,X,e.code))),_(3),C(e.code),_(2),C(e.crop),_(2),x(``,t.nf1.format(e.declared),` ha`),_(2),x(` `,t.nf1.format(e.measured),` ha `),_(2),C(e.campaign),_(2),b(`background`,t.plotTone(e.status).bg)(`color`,t.plotTone(e.status).fg),_(),C(e.status)}}function ge(t,n){if(t&1&&(a(0,`div`,35)(1,`table`,71)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`,72),g(9),r(),a(10,`th`,72),g(11),r(),a(12,`th`),g(13),r(),a(14,`th`),g(15),r()()(),a(16,`tbody`),h(17,he,15,15,`tr`,73,ae),r()()()),t&2){let t=d(3);_(5),C(t.t()(`producteurs.v2.col.plot`)),_(2),C(t.t()(`producteurs.v2.col.crop`)),_(2),C(t.t()(`producteurs.v2.col.declared`)),_(2),C(t.t()(`producteurs.v2.col.measured`)),_(2),C(t.t()(`producteurs.v2.col.campaign`)),_(2),C(t.t()(`producteurs.v2.col.status`)),_(2),e(t.plots())}}function _e(e,t){if(e&1&&(a(0,`p`,36),g(1),r()),e&2){let e=d(3);_(),x(` `,e.t()(`producteurs.detail.plots.empty`),` `)}}function ve(e,t){if(e&1&&(a(0,`li`,39)(1,`span`,81),g(2),r(),a(3,`span`,82),g(4),r(),a(5,`span`,83),g(6),r()()),e&2){let e=t.$implicit,n=d(3);_(2),C(e.crop.slice(0,2).toUpperCase()),_(2),C(e.crop),_(2),y(``,e.campaign,` · `,n.nf1.format(e.area),` ha`)}}function ye(e,t){if(e&1&&(a(0,`li`,36),g(1),r()),e&2){let e=d(3);_(),x(` `,e.t()(`producteurs.detail.crops.empty`),` `)}}function be(e,t){if(e&1&&(a(0,`li`),l(1,`span`,84),a(2,`span`,85)(3,`span`,86),g(4),r(),a(5,`span`,87)(6,`span`,88),g(7),r(),g(8,` → `),a(9,`b`),g(10),r()(),a(11,`span`,89),g(12),r()()()),e&2){let e=t.$implicit,n=d(3);_(4),C(e.field),_(3),C(e.from||n.t()(`producteurs.notSet`)),_(3),C(e.to),_(2),y(``,n.fmtDateTime(e.at),` · `,e.by)}}function xe(e,t){if(e&1&&(a(0,`li`,5),g(1),r()),e&2){let e=d(3);_(),C(e.t()(`producteurs.detail.history.empty`))}}function Q(e,t){if(e&1&&(a(0,`p`)(1,`b`),g(2),r(),g(3,` : `),a(4,`span`,88),g(5),r(),g(6,` → `),a(7,`b`,90),g(8),r()()),e&2){let e=t.$implicit,n=d(4);_(2),C(e.field),_(3),C(n.showVal(e.field,e.from)),_(3),C(n.showVal(e.field,e.to))}}function Se(t,n){if(t&1&&(a(0,`div`,58)(1,`p`,55),g(2),r(),h(3,Q,9,3,`p`,null,oe),r()),t&2){let t=d(3);_(2),x(` `,t.t()(`producteurs.detail.correction.beforeAfter`,s(1,Z,t.correctionChanges().length)),` `),_(),e(t.correctionChanges())}}function Ce(n,i){if(n&1){let e=c();a(0,`ui-detail-hero`,7),E(1,ce,3,2,`button`,8),r(),E(2,le,5,6,`p`,9),l(3,`ui-stat-cards`,10),a(4,`div`,11)(5,`section`,12)(6,`div`,13)(7,`h2`)(8,`span`,14),l(9,`ui-icon`,15),r(),g(10),r()(),a(11,`dl`,16)(12,`div`,17)(13,`span`,18),l(14,`ui-icon`,15),r(),a(15,`div`)(16,`dt`),g(17),r(),a(18,`dd`),g(19),r()()(),a(20,`div`,17)(21,`span`,18),l(22,`ui-icon`,19),r(),a(23,`div`)(24,`dt`),g(25),r(),a(26,`dd`),g(27),r()()(),a(28,`div`,17)(29,`span`,18),l(30,`ui-icon`,20),r(),a(31,`div`)(32,`dt`),g(33),r(),a(34,`dd`,21),g(35),E(36,ue,3,2,`button`,22),r()()(),a(37,`div`,17)(38,`span`,18),l(39,`ui-icon`,23),r(),a(40,`div`)(41,`dt`),g(42),r(),a(43,`dd`,21),g(44),E(45,de,3,2,`button`,22),r()()(),a(46,`div`,17)(47,`span`,18),l(48,`ui-icon`,24),r(),a(49,`div`)(50,`dt`),g(51),r(),a(52,`dd`),g(53),r()()(),a(54,`div`,17)(55,`span`,18),l(56,`ui-icon`,25),r(),a(57,`div`)(58,`dt`),g(59),r(),a(60,`dd`),E(61,fe,2,4,`a`,26)(62,pe,2,0,`span`,27),r()()(),a(63,`div`,17)(64,`span`,18),l(65,`ui-icon`,28),r(),a(66,`div`)(67,`dt`),g(68),r(),a(69,`dd`),g(70),r()()(),a(71,`div`,17)(72,`span`,18),l(73,`ui-icon`,29),r(),a(74,`div`)(75,`dt`),g(76),r(),a(77,`dd`),g(78),r()()(),a(79,`div`,17)(80,`span`,18),l(81,`ui-icon`,20),r(),a(82,`div`)(83,`dt`),g(84),r(),a(85,`dd`),g(86),r()()(),a(87,`div`,17)(88,`span`,18),l(89,`ui-icon`,30),r(),a(90,`div`)(91,`dt`),g(92),r(),a(93,`dd`),g(94),r()()()()(),E(95,me,10,6,`section`,31),r(),a(96,`section`,32)(97,`div`,13)(98,`h2`)(99,`span`,14),l(100,`ui-icon`,33),r(),g(101),a(102,`span`,34),g(103),r()()(),E(104,ge,19,6,`div`,35)(105,_e,2,1,`p`,36),r(),a(106,`div`,37)(107,`section`,12)(108,`div`,13)(109,`h2`)(110,`span`,14),l(111,`ui-icon`,38),r(),g(112),a(113,`span`,34),g(114),r()()(),a(115,`ul`),h(116,ve,7,4,`li`,39,re,!1,ye,2,1,`li`,36),r()(),a(119,`section`,12)(120,`div`,13)(121,`h2`)(122,`span`,14),l(123,`ui-icon`,30),r(),g(124),a(125,`span`,34),g(126),r()()(),a(127,`ol`,40),h(128,be,13,5,`li`,null,ie,!1,xe,2,1,`li`,5),r()()(),a(131,`ui-modal`,41),t(`closed`,function(){p(e);let t=d(2);return o(t.closeCniDialog())}),a(132,`label`,42),g(133),r(),a(134,`textarea`,43),t(`input`,function(t){p(e);let n=d(2);return o(n.cniReason.set(t.target.value))}),r(),a(135,`button`,44),t(`click`,function(){p(e);let t=d(2);return o(t.closeCniDialog())}),g(136),r(),a(137,`button`,45),t(`click`,function(){p(e);let t=d(2);return o(t.confirmRevealCni())}),g(138),a(139,`span`,46),l(140,`ui-icon`,47),r()()(),a(141,`ui-modal`,48),t(`closed`,function(){p(e);let t=d(2);return o(t.correctionOpen.set(!1))}),a(142,`div`,49)(143,`ui-text-field`,50),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.corrFirstName.set(t))}),r(),a(144,`ui-text-field`,51),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.corrLastName.set(t))}),r(),a(145,`ui-text-field`,52),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.corrPhone.set(t))}),r(),a(146,`ui-text-field`,53),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.corrAge.set(t))}),r(),a(147,`div`,54)(148,`p`,55),g(149),r(),a(150,`div`,56)(151,`button`,57),t(`click`,function(){p(e);let t=d(2);return o(t.corrStatus.set(`recensé`))}),g(152),r(),a(153,`button`,57),t(`click`,function(){p(e);let t=d(2);return o(t.corrStatus.set(`membre`))}),g(154),r()()(),E(155,Se,5,3,`div`,58),a(156,`div`,54)(157,`label`,59),g(158),r(),a(159,`textarea`,60),t(`input`,function(t){p(e);let n=d(2);return o(n.corrMotif.set(t.target.value))}),r()()(),a(160,`button`,44),t(`click`,function(){p(e);let t=d(2);return o(t.correctionOpen.set(!1))}),g(161),r(),a(162,`button`,45),t(`click`,function(){p(e);let t=d(2);return o(t.submitCorrectionForm())}),g(163),a(164,`span`,46),l(165,`ui-icon`,61),r()()()}if(n&2){let t,n=d(),r=d();f(`crumb`,s(106,q,r.t()(`producteurs.index.title`)))(`title`,n.firstName+` `+n.lastName)(`eyebrow`,n.code)(`mono`,r.initials(n.firstName+` `+n.lastName))(`badges`,r.heroBadges())(`meta`,r.heroMeta())(`backLabel`,r.t()(`producteurs.fiche.back`)),_(),m(r.store.can(`producer.edit`)?1:-1),_(),m(n.mergedInto?2:-1),_(),f(`stats`,r.stats()),_(6),f(`size`,18),_(),x(``,r.t()(`producteurs.detail.identity`),` `),_(4),f(`size`,18),_(3),C(r.t()(`producteurs.detail.sex`)),_(2),x(` `,r.t()(n.sex===`F`?`producteurs.sex.F`:`producteurs.sex.H`),` `),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.age`)),_(),v(`zero`,n.age===null),_(),x(` `,n.age===null?`—`:r.fmtAge(n.age),` `),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.cni`)),_(2),x(` `,r.showCni()?n.cni||r.t()(`producteurs.notSet`):r.maskCni(n.cni),` `),_(),m(r.canCni()&&n.cni&&!r.showCni()?36:-1),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.phone`)),_(),v(`zero`,!n.phone),_(),x(` `,r.showPhone()||r.store.can(`contact.read`)?n.phone||`—`:r.maskPhone(n.phone),` `),_(),m(n.phone&&!r.showPhone()&&!r.store.can(`contact.read`)&&r.store.can(`producer.edit`)?45:-1),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.col.village`)),_(2),C(n.village),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.organisation`)),_(2),m((t=r.org(n.orgId))?61:62,t),_(4),f(`size`,18),_(3),C(r.t()(`producteurs.v2.coop`)),_(2),C(r.scoopName(n.scoopId)),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.handicap`)),_(2),x(` `,r.t()(n.handicap?`producteurs.detail.yes`:`producteurs.detail.no`),` `),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.enumerator`)),_(2),C(n.enumerator),_(3),f(`size`,18),_(3),C(r.t()(`producteurs.detail.createdAt`)),_(2),C(r.fmtDate(n.createdAt)),_(),m(r.plots().length&&r.store.can(`map.read`)?95:-1),_(5),f(`size`,18),_(),C(r.t()(`producteurs.detail.section.plots`)),_(2),C(r.nf.format(r.plots().length)),_(),m(r.plots().length?104:105),_(7),f(`size`,18),_(),C(r.t()(`producteurs.detail.section.crops`)),_(2),C(n.crops.length),_(2),e(n.crops),_(7),f(`size`,18),_(),C(r.t()(`producteurs.detail.section.history`)),_(2),C(n.history.length),_(2),e(n.history),_(3),f(`open`,r.cniOpen())(`title`,r.t()(`producteurs.detail.cniDialog.title`))(`description`,r.t()(`producteurs.detail.cniDialog.description`))(`width`,540)(`closeLabel`,r.t()(`common.close`)),_(2),C(r.t()(`producteurs.detail.cniDialog.reason`)),_(),f(`placeholder`,r.t()(`producteurs.detail.cniDialog.reasonPlaceholder`))(`value`,r.cniReason()),_(2),x(` `,r.t()(`common.cancel`),` `),_(),f(`disabled`,r.cniReason().trim().length<3),_(),x(` `,r.t()(`producteurs.detail.cniDialog.submit`)),_(2),f(`size`,18),_(),f(`open`,r.correctionOpen())(`title`,r.correctionDialogTitle())(`description`,r.t()(`producteurs.detail.correction.description`))(`width`,640)(`closeLabel`,r.t()(`common.close`)),_(2),f(`label`,r.t()(`producteurs.detail.correction.firstName`))(`value`,r.corrFirstName()),_(),f(`label`,r.t()(`producteurs.detail.correction.lastName`))(`value`,r.corrLastName()),_(),f(`label`,r.t()(`producteurs.detail.correction.phone`))(`value`,r.corrPhone())(`error`,r.corrPhoneErr()),_(),f(`label`,r.t()(`producteurs.detail.correction.age`))(`value`,r.corrAge())(`error`,r.corrAgeErr()),_(3),C(r.t()(`producteurs.detail.correction.status`)),_(),S(`aria-label`,r.t()(`producteurs.detail.correction.status`)),_(),v(`on`,r.corrStatus()===`recensé`),S(`aria-checked`,r.corrStatus()===`recensé`),_(),x(` `,r.t()(`producteurs.status.recensé`),` `),_(),v(`on`,r.corrStatus()===`membre`),S(`aria-checked`,r.corrStatus()===`membre`),_(),x(` `,r.t()(`producteurs.status.membre`),` `),_(),m(r.correctionChanges().length>0?155:-1),_(3),C(r.t()(`producteurs.detail.correction.motif`)),_(),f(`placeholder`,r.t()(`producteurs.detail.correction.motifPlaceholder`))(`value`,r.corrMotif()),_(2),x(` `,r.t()(`common.cancel`),` `),_(),f(`disabled`,!r.canSubmitCorrection()),_(),x(` `,r.t()(`producteurs.detail.correction.submit`)),_(2),f(`size`,18)}}function we(e,t){if(e&1&&E(0,se,9,4,`div`,1)(1,Ce,166,108),e&2){let e=d();m(+!!e.inScopeProducer())}}function Te(e,t){if(e&1&&(a(0,`div`,1)(1,`span`,2),l(2,`ui-icon`,3),r(),a(3,`h1`,4),g(4),r(),a(5,`p`,5),g(6),r(),a(7,`a`,6),g(8),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),C(e.t()(`producteurs.detail.notFound`)),_(2),C(e.t()(`producteurs.detail.notFoundDesc`)),_(2),C(e.t()(`producteurs.index.title`))}}var Ee={relevée:H.info,validée:H.succes,"à reprendre":H.attente,chevauchement:H.erreur},De={validé:{label:`producteurs.quality.validé`,...H.succes},"à vérifier":{label:`producteurs.quality.à vérifier`,...H.attente},doublon:{label:`producteurs.quality.doublon`,...H.info},invalide:{label:`producteurs.quality.invalide`,...H.erreur}},$={recensé:`producteurs.status.recensé`,membre:`producteurs.status.membre`},Oe=/^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/,ke=class e{constructor(){this.route=D(T),this.store=D(B),this.locale=D(F),this.t=this.locale.t,this.fmtAge=L,this.fmtDateTime=N,this.fmtDate=k,this.maskPhone=M,this.maskCni=j,this.nf=P,this.nf1=A,this.initials=V,this.STATUS_KEY=$,this.snackbar=D(te),this.selectedPlotId=i(void 0),this.selectPlot=e=>this.selectedPlotId.set(e),this.showCni=i(!1),this.showPhone=i(!1),this.cniOpen=i(!1),this.cniReason=i(``),this.correctionOpen=i(!1),this.corrFirstName=i(``),this.corrLastName=i(``),this.corrPhone=i(``),this.corrAge=i(``),this.corrStatus=i(`recensé`),this.corrMotif=i(``),this.id=O(this.route.paramMap.pipe(w(e=>e.get(`id`)??``)),{initialValue:``}),this.producer=n(()=>{let e=this.id();return this.store.state().producers.find(t=>t.id===e)}),this.inScopeProducer=n(()=>{let e=this.producer();return e?I([e],this.store.state().session).length===1:!1}),this.plots=n(()=>{let e=this.id();return this.store.state().plots.filter(t=>t.producerId===e)}),this.canCni=()=>this.store.can(`identity.read_full`),this.heroBadges=n(()=>{let e=this.producer();if(!e)return[];let t=this.t(),n=De[e.quality];return[{label:t($[e.status]),tone:e.status===`membre`?`citron`:`light`,icon:e.status===`membre`?`check_circle`:`person`},{label:t(n.label),tone:e.quality===`validé`?`glass`:e.quality===`invalide`?`danger`:`warn`,icon:e.quality===`validé`?`task_alt`:`warning`},...e.mergedInto?[{label:t(`producteurs.detail.merged`),tone:`warn`,icon:`info`}]:[]]}),this.heroMeta=n(()=>{let e=this.producer();if(!e)return[];let t=this.org(e.orgId);return[{icon:`location_on`,text:e.village},...t?[{icon:`hub`,text:t.name}]:[],{icon:`apartment`,text:this.scoopName(e.scoopId)}]}),this.stats=n(()=>{let e=this.producer();if(!e)return[];let t=this.t(),n=this.plots(),r=n.reduce((e,t)=>e+(t.measured||0),0),i=n.reduce((e,t)=>e+(t.declared||0),0);return[{label:t(`producteurs.v2.kpi.plots`),value:P.format(n.length),sub:t(`producteurs.v2.kpi.plotsSub`,{count:n.filter(e=>e.status===`validée`).length}),icon:`landscape`,bg:``,fg:``},{label:t(`producteurs.v2.kpi.area`),value:`${A.format(r)} ha`,sub:t(`producteurs.v2.kpi.areaSub`,{declared:A.format(i)}),icon:`square_foot`,...H.succes},{label:t(`producteurs.v2.kpi.crops`),value:P.format(e.crops.length),sub:t(`producteurs.v2.kpi.cropsSub`,{count:new Set(e.crops.map(e=>e.campaign)).size}),icon:`grass`,...H.culture},{label:t(`producteurs.v2.kpi.changes`),value:P.format(e.history.length),sub:t(`producteurs.v2.kpi.changesSub`),icon:`event_note`,...H.info}]}),this.correctionDialogTitle=n(()=>{let e=this.producer();return e?this.t()(`producteurs.detail.correction.title`,{name:`${e.firstName} ${e.lastName}`}):``})}plotTone(e){return Ee[e]??H.neutre}scoopName(e){return this.store.state().scoops.find(t=>t.id===e)?.name??e}org(e){let t=this.store.state().orgs.find(t=>t.id===e);return t?{id:t.id,name:t.name}:void 0}showVal(e,t){let n=this.t();return e===`Téléphone`?t?M(t):n(`producteurs.notSet`):e===`CNI`?t?j(t):n(`producteurs.notSet`):t||n(`producteurs.notSet`)}corrPhoneErr(){if(!this.correctionOpen())return``;let e=this.corrPhone().trim();return e?Oe.test(e)?``:this.t()(`producteurs.detail.correction.phoneError`):``}corrAgeErr(){if(!this.correctionOpen())return``;let e=this.corrAge().trim();if(e===``)return``;let t=Number(e);return!Number.isInteger(t)||t<15||t>100?this.t()(`producteurs.detail.correction.ageError`):``}correctionChanges(){let e=this.producer();if(!e||!this.correctionOpen())return[];let t=[];this.corrFirstName()!==e.firstName&&t.push({field:`Prénom`,from:e.firstName,to:this.corrFirstName()}),this.corrLastName()!==e.lastName&&t.push({field:`Nom`,from:e.lastName,to:this.corrLastName()}),this.corrPhone().trim()!==e.phone&&t.push({field:`Téléphone`,from:e.phone,to:this.corrPhone().trim()});let n=this.corrAge().trim(),r=n===``?null:Number(n);return r!==null&&r!==e.age&&t.push({field:`Âge`,from:e.age===null?``:String(e.age),to:String(r)}),this.corrStatus()!==e.status&&t.push({field:`Statut d'adhésion`,from:e.status,to:this.corrStatus()}),t}canSubmitCorrection(){return this.producer()?this.correctionChanges().length>0&&this.corrMotif().trim().length>=10&&!this.corrPhoneErr()&&!this.corrAgeErr():!1}openCniDialog(){this.cniReason.set(``),this.cniOpen.set(!0)}closeCniDialog(){this.cniOpen.set(!1),this.cniReason.set(``)}confirmRevealCni(){let e=this.producer();if(e)try{this.store.actions.revealCni(e,this.cniReason().trim()),this.showCni.set(!0),this.snackbar.info(this.t()(`producteurs.detail.revealed`)),this.closeCniDialog()}catch{this.snackbar.error(this.t()(`producteurs.detail.cniDialog.tooShort`))}}revealPhone(e){this.store.actions.revealPhone(e),this.showPhone.set(!0),this.snackbar.info(this.t()(`producteurs.detail.revealed`))}openCorrection(){let e=this.producer();e&&(this.corrFirstName.set(e.firstName),this.corrLastName.set(e.lastName),this.corrPhone.set(e.phone),this.corrAge.set(e.age===null?``:String(e.age)),this.corrStatus.set(e.status),this.corrMotif.set(``),this.correctionOpen.set(!0))}submitCorrectionForm(){let e=this.producer();e&&this.canSubmitCorrection()&&(this.store.actions.submitCorrection(e.id,this.correctionChanges(),this.corrMotif().trim()),this.correctionOpen.set(!1),this.snackbar.success(`${this.t()(`producteurs.detail.correction.sent`)} · ${this.t()(`producteurs.detail.correction.sentDesc`)}`))}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=u({type:e,selectors:[[`app-producteur-detail-page`]],decls:3,vars:2,consts:[[`perm`,`producer.read`,3,`area`],[1,`card`,`mx-auto`,`mt-16`,`flex`,`max-w-lg`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`warning`,3,`size`],[1,`text-[22px]`,`font-extrabold`],[1,`sub`],[`routerLink`,`/dashboard/producteurs`,1,`btn`,`btn-ghost`,`mt-2`],[3,`crumb`,`title`,`eyebrow`,`mono`,`badges`,`meta`,`backLabel`],[`hero-actions`,``,`type`,`button`,1,`btn`,`btn-citron`],[1,`notice`,`mt-4`,2,`background`,`var(--v2-info-bg)`,`color`,`var(--v2-info-fg)`],[1,`rise`,`mt-6`,3,`stats`],[1,`grid-main`,`mt-6`],[1,`sec-card`],[1,`sec-head`],[1,`sec-ico`],[`name`,`person`,3,`size`],[1,`facts`],[1,`fact`],[1,`fact-ico`],[`name`,`calendar_today`,3,`size`],[`name`,`badge`,3,`size`],[1,`tabular-nums`],[`type`,`button`,1,`reveal`],[`name`,`call`,3,`size`],[`name`,`location_on`,3,`size`],[`name`,`hub`,3,`size`],[1,`underline`,`decoration-[var(--v2-gris-trait)]`,`underline-offset-4`,`hover:text-[var(--v2-vert-pousse)]`,3,`routerLink`],[1,`zero`],[`name`,`apartment`,3,`size`],[`name`,`accessibility`,3,`size`],[`name`,`event_note`,3,`size`],[1,`sec-card`,`flex`,`flex-col`],[1,`sec-card`,`mt-4`],[`name`,`landscape`,3,`size`],[1,`n`],[1,`overflow-x-auto`],[1,`sub`,`border-t`,`px-5`,`py-5`,2,`border-color`,`var(--v2-separateur)`],[1,`mt-4`,`grid`,`gap-4`,`lg:grid-cols-2`],[`name`,`grass`,3,`size`],[1,`flex`,`items-center`,`gap-3`,`border-t`,`px-5`,`py-3`,2,`border-color`,`var(--v2-separateur)`],[1,`timeline`],[`icon`,`badge`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`for`,`cni-reason`,1,`lbl`],[`id`,`cni-reason`,1,`area`,`mb-5`,`mt-2`,3,`input`,`placeholder`,`value`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[1,`btn-chip`],[`name`,`visibility`,3,`size`],[`icon`,`edit`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-5`,`pb-5`,`sm:grid-cols-2`],[`preset`,`firstName`,3,`valueChange`,`label`,`value`],[`preset`,`lastName`,3,`valueChange`,`label`,`value`],[`preset`,`phone`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`age`,3,`valueChange`,`label`,`value`,`error`],[1,`sm:col-span-2`],[1,`lbl`],[`role`,`radiogroup`,1,`seg`,`seg-form`,`mt-2`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`chg`,`sm:col-span-2`],[`for`,`corr-motif`,1,`lbl`],[`id`,`corr-motif`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[`name`,`arrow_forward`,3,`size`],[`hero-actions`,``,`type`,`button`,1,`btn`,`btn-citron`,3,`click`],[`name`,`edit`,3,`size`],[`name`,`info`,3,`size`],[1,`underline`,3,`routerLink`],[`type`,`button`,1,`reveal`,3,`click`],[`name`,`map`,3,`size`],[1,`map`,`flex-1`,`border-t`,2,`border-color`,`var(--v2-separateur)`],[`basemap`,`sat`,3,`plots`,`selectedId`,`onSelect`],[1,`sub`,`px-5`,`py-3`],[1,`tbl`,`min-w-[640px]`],[1,`text-right`],[`tabindex`,`0`,1,`row-link`,3,`font-bold`],[`tabindex`,`0`,1,`row-link`,3,`click`,`keydown.enter`],[1,`mono`,2,`color`,`var(--v2-foret)`],[1,`font-semibold`],[1,`text-right`,`tabular-nums`],[1,`text-right`,`font-extrabold`,`tabular-nums`],[1,`font-medium`],[1,`badge`],[1,`avatar`,2,`height`,`32px`,`width`,`32px`,`font-size`,`11px`],[1,`min-w-0`,`flex-1`,`font-bold`],[1,`sub`,`tabular-nums`],[`aria-hidden`,`true`,1,`dot`],[1,`min-w-0`],[1,`block`,`font-bold`],[1,`block`,`text-[14px]`],[1,`line-through`,2,`color`,`var(--v2-gris-texte)`],[1,`sub`,`block`],[2,`color`,`var(--v2-vert-pousse)`]],template:function(e,t){if(e&1&&(a(0,`app-shell`,0),E(1,we,2,1)(2,Te,9,4,`div`,1),r()),e&2){let e;f(`area`,t.t()(`producteurs.detail.area`)),_(),m((e=t.producer())?1:2,e)}},dependencies:[R,U,ee,W,z,ne,G,K],styles:[`.mono[_ngcontent-%COMP%] {
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
          grid-template-columns: minmax(0, 1.35fr) minmax(0, 1fr);
        }
      }
      .map[_ngcontent-%COMP%] {
        height: 100%;
        min-height: 300px;
      }
      .timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
        position: relative;
        display: flex;
        gap: 14px;
        padding: 12px 20px;
        border-top: 1px solid var(--%NS%v2-separateur);
      }
      .dot[_ngcontent-%COMP%] {
        margin-top: 4px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--%NS%v2-foret);
        box-shadow: 0 0 0 4px var(--%NS%v2-sauge);
      }
      .chg[_ngcontent-%COMP%] {
        display: grid;
        gap: 6px;
        border-radius: 16px;
        background: var(--%NS%v2-creme);
        padding: 12px 14px;
        font-size: 14px;
      }
      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        flex: 1;
        justify-content: center;
      }`]})}};export{ke as default};