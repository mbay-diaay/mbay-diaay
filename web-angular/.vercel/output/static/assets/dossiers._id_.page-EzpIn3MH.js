import{$t as e,Bt as t,F as n,Ft as r,Gt as i,Hn as ee,It as a,Jn as o,Kt as s,Ln as te,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gt as v,hn as y,mn as b,mt as x,pn as S,qt as C,rr as w,t as ne,vt as T,zn as E}from"./_router-chunk-H0-n0SZI.js";import{n as D}from"./rxjs-interop-U_NminAK.js";import{l as O,n as k}from"./snackbar.component-ICe8-MWg.js";import{n as A}from"./index-B8S1FFME.js";import{t as j}from"./dossier-labels-DBBTp4HU.js";import{B as M,Dt as N,E as P,H as F,U as I,V as L,j as R,t as z,tt as B}from"./locale.service-Bf8_ncMo.js";import{t as V}from"./app-shell.component-CR4uAChA.js";import{t as H}from"./store.service-ZF4OfoGo.js";import{n as U}from"./v2-page.styles-Blvl6ZBZ.js";import{E as W,T as G,f as K,o as q,t as J}from"./ui-CQhTckzj.js";var Y=e=>({label:e,link:`/dashboard/dossiers`}),X=e=>({id:e}),re=e=>({name:e}),ie=(e,t)=>({name:e,code:t}),ae=e=>({age:e}),oe=()=>({mb:5}),se=(e,t)=>t.key,ce=(e,t)=>t.at+t.action,le=(e,t)=>t.id;function ue(e,t){e&1&&l(0,`ui-icon`,27),e&2&&f(`size`,14)}function de(e,t){if(e&1&&g(0),e&2){let e=d().$index;b(` `,e+1,` `)}}function fe(e,t){if(e&1&&(a(0,`div`,38)(1,`span`,39),T(2,ue,1,1,`ui-icon`,27)(3,de,1,1),r(),a(4,`span`,40),g(5),r()()),e&2){let e=t.$implicit,n=t.$index,r=d(2);v(`done`,n<r.step())(`now`,n===r.step()),x(`aria-current`,n===r.step()?`step`:null),_(2),m(n<r.step()?2:3),_(3),S(e.label)}}function pe(e,n){if(e&1){let e=c();a(0,`button`,44),t(`click`,function(){p(e);let t=d(3);return o(t.startReview())}),l(1,`ui-icon`,52),g(2),r()}if(e&2){let e=d(3);_(),f(`size`,18),_(),b(``,e.t()(`dossiers.detail.decision.startReview`),` `)}}function me(e,t){if(e&1&&(a(0,`p`,51),l(1,`ui-icon`,53),g(2),r()),e&2){let e=d(3);_(),f(`size`,18),_(),b(``,e.decisionError(),` `)}}function he(e,n){if(e&1){let e=c();a(0,`section`,5)(1,`div`,9)(2,`h2`)(3,`span`,10),l(4,`ui-icon`,41),r(),g(5),r(),a(6,`div`,42),T(7,pe,3,2,`button`,43),a(8,`button`,44),t(`click`,function(){p(e);let t=d(2);return o(t.openComplement())}),l(9,`ui-icon`,45),g(10),r(),a(11,`button`,46),t(`click`,function(){p(e);let t=d(2);return o(t.openRefuse())}),l(12,`ui-icon`,47),g(13),r(),a(14,`button`,48),t(`click`,function(){p(e);let t=d(2);return o(t.dialog.set(`approve`))}),g(15),a(16,`span`,49),l(17,`ui-icon`,27),r()()()(),a(18,`p`,50),g(19),r(),T(20,me,3,2,`p`,51),r()}if(e&2){let e=d(),t=d();_(4),f(`size`,18),_(),b(``,t.t()(`dossiers.v2.decision.title`),` `),_(2),m(e.status===`soumis`?7:-1),_(2),f(`size`,18),_(),b(``,t.t()(`dossiers.detail.decision.askComplement`),` `),_(2),f(`size`,18),_(),b(``,t.t()(`dossiers.detail.decision.refuse`),` `),_(),f(`disabled`,!t.decisionOk()),_(),b(` `,t.t()(`dossiers.detail.decision.approve`)),_(2),f(`size`,18),_(2),b(` `,t.t()(`dossiers.v2.decision.hint`),` `),_(),m(!t.decisionOk()&&t.decisionError()?20:-1)}}function ge(e,t){if(e&1&&(a(0,`p`,6),l(1,`ui-icon`,53),g(2),r()),e&2){let e=t,n=d(2);_(),f(`size`,18),_(),b(``,n.t()(`dossiers.detail.approve.existing`,C(2,ie,n.producerLabel(e),e)),` `)}}function _e(e,n){if(e&1){let e=c();a(0,`div`,12)(1,`ui-text-field`,54),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editFirst=t)}),r(),a(2,`ui-text-field`,55),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editLast=t)}),r(),a(3,`div`)(4,`p`,33),g(5),r(),a(6,`div`,56)(7,`button`,57),t(`click`,function(){p(e);let t=d(2);return o(t.editSex=`F`)}),g(8),r(),a(9,`button`,57),t(`click`,function(){p(e);let t=d(2);return o(t.editSex=`H`)}),g(10),r()()(),a(11,`ui-text-field`,58),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editAge=t)}),r(),a(12,`ui-text-field`,59),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editPhone=t)}),r(),a(13,`ui-text-field`,60),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editCni=t)}),r(),a(14,`ui-text-field`,61),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editVillage=t)}),r(),a(15,`div`)(16,`p`,33),g(17),r(),a(18,`ui-select`,62),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editOrgId=t)}),r()(),a(19,`label`,63)(20,`input`,23),t(`change`,function(t){p(e);let n=d(2);return o(n.editCreateMember=t.target.checked)}),r(),a(21,`span`),g(22),r()(),a(23,`div`,64)(24,`button`,65),t(`click`,function(){p(e);let t=d(2);return o(t.saveDraft())}),g(25),r(),a(26,`button`,66),t(`click`,function(){p(e);let t=d(2);return o(t.saveAndSubmit())}),g(27),a(28,`span`,26),l(29,`ui-icon`,31),r()()()()}if(e&2){let e=d(2);_(),f(`label`,e.t()(`dossiers.detail.edit.firstName`))(`value`,e.editFirst),_(),f(`label`,e.t()(`dossiers.detail.edit.lastName`))(`value`,e.editLast),_(3),S(e.t()(`dossiers.detail.info.sex`)),_(),x(`aria-label`,e.t()(`dossiers.detail.info.sex`)),_(),v(`on`,e.editSex===`F`),x(`aria-checked`,e.editSex===`F`),_(),b(` `,e.t()(`dossiers.detail.info.female`),` `),_(),v(`on`,e.editSex===`H`),x(`aria-checked`,e.editSex===`H`),_(),b(` `,e.t()(`dossiers.detail.info.male`),` `),_(),f(`label`,e.t()(`dossiers.detail.info.age`))(`value`,e.editAge),_(),f(`label`,e.t()(`dossiers.detail.info.phone`))(`value`,e.editPhone),_(),f(`label`,e.t()(`dossiers.detail.info.cni`))(`hint`,e.t()(`dossiers.detail.edit.cniHint`))(`value`,e.editCni),_(),f(`label`,e.t()(`dossiers.detail.info.village`))(`value`,e.editVillage),_(3),S(e.t()(`dossiers.detail.info.org`)),_(),f(`label`,e.t()(`dossiers.detail.info.org`))(`options`,e.orgOptions())(`value`,e.editOrgId),_(2),f(`checked`,e.editCreateMember),_(2),S(e.t()(`dossiers.detail.edit.createMember`)),_(2),f(`disabled`,!e.dirty()),_(),b(` `,e.t()(`dossiers.detail.edit.saveDraft`),` `),_(2),b(` `,e.t()(`dossiers.detail.edit.submit`)),_(2),f(`size`,18)}}function ve(e,t){if(e&1&&(a(0,`dl`,13)(1,`div`,67)(2,`span`,68),l(3,`ui-icon`,11),r(),a(4,`div`)(5,`dt`),g(6),r(),a(7,`dd`),g(8),r()()(),a(9,`div`,67)(10,`span`,68),l(11,`ui-icon`,69),r(),a(12,`div`)(13,`dt`),g(14),r(),a(15,`dd`),g(16),r()()(),a(17,`div`,67)(18,`span`,68),l(19,`ui-icon`,70),r(),a(20,`div`)(21,`dt`),g(22),r(),a(23,`dd`,71),g(24),r()()(),a(25,`div`,67)(26,`span`,68),l(27,`ui-icon`,72),r(),a(28,`div`)(29,`dt`),g(30),r(),a(31,`dd`,71),g(32),r()()(),a(33,`div`,67)(34,`span`,68),l(35,`ui-icon`,73),r(),a(36,`div`)(37,`dt`),g(38),r(),a(39,`dd`),g(40),r()()(),a(41,`div`,67)(42,`span`,68),l(43,`ui-icon`,74),r(),a(44,`div`)(45,`dt`),g(46),r(),a(47,`dd`),g(48),r()()(),a(49,`div`,67)(50,`span`,68),l(51,`ui-icon`,75),r(),a(52,`div`)(53,`dt`),g(54),r(),a(55,`dd`),g(56),r()()(),a(57,`div`,67)(58,`span`,68),l(59,`ui-icon`,76),r(),a(60,`div`)(61,`dt`),g(62),r(),a(63,`dd`),g(64),r()()()()),e&2){let e=d(),t=d();_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.sex`)),_(2),b(` `,e.draft.sex===`F`?t.t()(`dossiers.detail.info.female`):t.t()(`dossiers.detail.info.male`),` `),_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.age`)),_(),v(`zero`,e.draft.age===null),_(),b(` `,e.draft.age===null?`—`:t.t()(`dossiers.detail.info.ageYears`,s(32,ae,e.draft.age)),` `),_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.phone`)),_(),v(`zero`,!e.draft.phone),_(),b(` `,t.store.phone(e.draft.phone)||`—`,` `),_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.cni`)),_(),v(`zero`,!e.draft.cni),_(),b(` `,e.draft.cni?t.maskCni(e.draft.cni):`—`,` `),_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.village`)),_(),v(`zero`,!e.draft.village),_(),b(` `,e.draft.village||`—`,` `),_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.org`)),_(2),S(t.orgName(e.draft.orgId)),_(3),f(`size`,18),_(3),S(t.t()(`dossiers.detail.info.member`)),_(2),b(` `,e.draft.createMember?t.t()(`dossiers.detail.info.willBeMember`):t.t()(`dossiers.detail.info.producerOnly`),` `),_(3),f(`size`,18),_(3),S(t.t()(`reunions.detail.scoop`)),_(2),S(t.scoopName(e.scoopId))}}function ye(e,n){if(e&1){let e=c();a(0,`div`,17)(1,`ui-file-slots`,77),t(`added`,function(t){p(e);let n=d(2);return o(n.addFiles(t.slot,t.files))})(`removed`,function(t){p(e);let n=d(2);return o(n.removeDoc(t))}),r()()}if(e&2){let e=d(2);_(),f(`slots`,e.slots())(`files`,e.slotFiles())(`hint`,e.t()(`dossiers.v2.piecesHint`,i(3,oe)))}}function be(e,t){if(e&1&&(a(0,`span`,84),g(1),r()),e&2){let e=d(4);_(),S(e.t()(`documents.sensitive.pill`))}}function xe(e,t){if(e&1&&(a(0,`li`,78)(1,`span`,10),l(2,`ui-icon`,80),r(),a(3,`span`,81)(4,`span`,82),g(5),r(),a(6,`span`,83),g(7),r()(),T(8,be,2,1,`span`,84),r()),e&2){let e=t.$implicit,n=d(3);_(2),f(`name`,n.kindIcon(e.kind))(`size`,18),_(3),S(e.name),_(2),y(``,n.t()(n.kindKey[e.kind]??`dossiers.kind.autre`),` · `,e.sizeKb,` Ko`),_(),m(e.sensitive?8:-1)}}function Se(e,t){if(e&1&&(a(0,`li`,79),g(1),r()),e&2){let e=d(3);_(),b(` `,e.t()(`dossiers.detail.pieces.none`),` `)}}function Z(t,n){if(t&1&&(a(0,`ul`),h(1,xe,9,6,`li`,78,le,!1,Se,2,1,`li`,79),r()),t&2){let t=d(2);_(),e(t.docs())}}function Ce(e,t){if(e&1&&(a(0,`span`,88),g(1),r()),e&2){let e=d().$implicit;_(),b(`« `,e.comment,` »`)}}function we(e,t){if(e&1&&(a(0,`li`),l(1,`span`,85),a(2,`span`,86)(3,`span`,87),g(4),r(),T(5,Ce,2,1,`span`,88),a(6,`span`,89),g(7),r()()()),e&2){let e=t.$implicit,n=d(2);_(4),S(n.t()(n.eventKey(e.action))),_(),m(e.comment?5:-1),_(2),y(``,n.fmtDateTime(e.at),` · `,e.by)}}function Te(e,n){if(e&1){let e=c();a(0,`p`,90),l(1,`ui-icon`,53),g(2),r(),a(3,`div`,91)(4,`button`,57),t(`click`,function(){p(e);let t=d(2);return o(t.duplicateChoice=`lié`)}),g(5),r(),a(6,`button`,57),t(`click`,function(){p(e);let t=d(2);return o(t.duplicateChoice=`distinct`)}),g(7),r()()}if(e&2){let e=d(2);_(),f(`size`,18),_(),b(``,e.t()(`dossiers.detail.approve.descriptionDuplicate`),` `),_(2),v(`on`,e.duplicateChoice===`lié`),x(`aria-checked`,e.duplicateChoice===`lié`),_(),b(` `,e.t()(`dossiers.detail.approve.same`),` `),_(),v(`on`,e.duplicateChoice===`distinct`),x(`aria-checked`,e.duplicateChoice===`distinct`),_(),b(` `,e.t()(`dossiers.detail.approve.other`),` `)}}function Ee(n,i){if(n&1){let e=c();a(0,`ui-detail-hero`,2)(1,`div`,3),h(2,fe,6,7,`div`,4,se),r()(),T(4,he,21,12,`section`,5),T(5,ge,3,5,`p`,6),a(6,`div`,7)(7,`section`,8)(8,`div`,9)(9,`h2`)(10,`span`,10),l(11,`ui-icon`,11),r(),g(12),r()(),T(13,_e,30,33,`div`,12)(14,ve,65,34,`dl`,13),r(),a(15,`div`,14)(16,`section`,8)(17,`div`,9)(18,`h2`)(19,`span`,10),l(20,`ui-icon`,15),r(),g(21),a(22,`span`,16),g(23),r()()(),T(24,ye,2,4,`div`,17)(25,Z,4,1,`ul`),r(),a(26,`section`,8)(27,`div`,9)(28,`h2`)(29,`span`,10),l(30,`ui-icon`,18),r(),g(31),a(32,`span`,16),g(33),r()()(),a(34,`ol`,19),h(35,we,8,4,`li`,null,ce),r()()()(),a(37,`ui-modal`,20),t(`closed`,function(){p(e);let t=d();return o(t.dialog.set(null))}),a(38,`div`,21),T(39,Te,8,10),a(40,`label`,22)(41,`input`,23),t(`change`,function(t){p(e);let n=d();return o(n.createMember=t.target.checked)}),r(),a(42,`span`),g(43),r()()(),a(44,`button`,24),t(`click`,function(){p(e);let t=d();return o(t.dialog.set(null))}),g(45),r(),a(46,`button`,25),t(`click`,function(){p(e);let t=d();return o(t.approve())}),g(47),a(48,`span`,26),l(49,`ui-icon`,27),r()()(),a(50,`ui-modal`,28),t(`closed`,function(){p(e);let t=d();return o(t.dialog.set(null))}),a(51,`label`,29),g(52),r(),a(53,`textarea`,30),t(`input`,function(t){p(e);let n=d();return o(n.comment=t.target.value)}),r(),a(54,`button`,24),t(`click`,function(){p(e);let t=d();return o(t.dialog.set(null))}),g(55),r(),a(56,`button`,25),t(`click`,function(){p(e);let t=d();return o(t.complement())}),g(57),a(58,`span`,26),l(59,`ui-icon`,31),r()()(),a(60,`ui-modal`,32),t(`closed`,function(){p(e);let t=d();return o(t.dialog.set(null))}),a(61,`div`,21)(62,`div`)(63,`p`,33),g(64),r(),a(65,`ui-select`,34),t(`valueChange`,function(t){p(e);let n=d();return o(n.refuseReason=t)}),r()(),a(66,`div`)(67,`label`,35),g(68),r(),a(69,`textarea`,36),t(`input`,function(t){p(e);let n=d();return o(n.comment=t.target.value)}),r()()(),a(70,`button`,24),t(`click`,function(){p(e);let t=d();return o(t.dialog.set(null))}),g(71),r(),a(72,`button`,37),t(`click`,function(){p(e);let t=d();return o(t.refuse())}),g(73),r()()}if(n&2){let t,n=i,r=d();f(`crumb`,s(56,Y,r.t()(`dossiers.title`)))(`title`,r.name(n))(`eyebrow`,r.t()(`dossiers.detail.eyebrow`,s(58,X,n.id)))(`mono`,r.initials(r.name(n)))(`badges`,r.heroBadges())(`meta`,r.heroMeta())(`backLabel`,r.t()(`dossiers.detail.back`)),_(),x(`aria-label`,r.t()(`dossiers.v2.steps.aria`)),_(),e(r.steps()),_(2),m(r.canReview()&&(n.status===`soumis`||n.status===`en examen`)?4:-1),_(),m((t=n.possibleDuplicateOf)?5:-1,t),_(6),f(`size`,18),_(),b(``,r.t()(`dossiers.detail.info.title`),` `),_(),m(r.editable()?13:14),_(7),f(`size`,18),_(),S(r.t()(`dossiers.detail.pieces.title`)),_(2),S(r.docs().length),_(),m(r.editable()?24:25),_(6),f(`size`,18),_(),S(r.t()(`dossiers.v2.history`)),_(2),S(n.history.length),_(2),e(r.history()),_(2),f(`open`,r.dialog()===`approve`)(`title`,r.t()(`dossiers.detail.approve.title`))(`description`,r.t()(`dossiers.detail.approve.description`,s(60,re,n.draft.firstName)))(`width`,560)(`closeLabel`,r.t()(`common.close`)),_(2),m(n.possibleDuplicateOf?39:-1),_(2),f(`checked`,r.createMember),_(2),S(r.t()(`dossiers.detail.approve.member`)),_(2),b(` `,r.t()(`common.cancel`),` `),_(2),b(` `,r.t()(`dossiers.detail.approve.submit`)),_(2),f(`size`,18),_(),f(`open`,r.dialog()===`complement`)(`title`,r.t()(`dossiers.detail.complementDialog.title`))(`description`,r.t()(`dossiers.detail.complementDialog.description`))(`width`,560)(`closeLabel`,r.t()(`common.close`)),_(2),S(r.t()(`dossiers.detail.complementDialog.label`)),_(),f(`placeholder`,r.t()(`dossiers.detail.complementDialog.placeholder`))(`value`,r.comment),_(2),b(` `,r.t()(`common.cancel`),` `),_(2),b(` `,r.t()(`dossiers.detail.complementDialog.submit`)),_(2),f(`size`,18),_(),f(`open`,r.dialog()===`refuse`)(`title`,r.t()(`dossiers.detail.refuseDialog.title`))(`description`,r.t()(`dossiers.detail.refuseDialog.description`))(`width`,560)(`closeLabel`,r.t()(`common.close`)),_(4),S(r.t()(`dossiers.detail.refuseDialog.reason`)),_(),f(`label`,r.t()(`dossiers.detail.refuseDialog.reason`))(`options`,r.refusalOptions)(`value`,r.refuseReason),_(3),S(r.t()(`dossiers.detail.refuseDialog.detail`)),_(),f(`placeholder`,r.t()(`dossiers.detail.refuseDialog.detailHint`))(`value`,r.comment),_(2),b(` `,r.t()(`common.cancel`),` `),_(2),b(` `,r.t()(`dossiers.detail.refuseDialog.submit`),` `)}}function De(e,t){if(e&1&&(a(0,`div`,1)(1,`span`,92),l(2,`ui-icon`,93),r(),a(3,`h1`,94),g(4),r(),a(5,`p`,83),g(6),r(),a(7,`a`,95),g(8),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),S(e.t()(`dossiers.detail.notFound.title`)),_(2),S(e.t()(`dossiers.detail.notFound.text`)),_(2),S(e.t()(`dossiers.detail.back`))}}var Oe={brouillon:0,"complément demandé":0,soumis:1,"en examen":2,approuvé:3,refusé:3},Q={cni:`badge`,photo:`account_circle`,justificatif:`description`,autre:`folder_open`},$=5120,ke=class e{constructor(){this.route=E(ne),this.store=E(H),this.locale=E(z),this.t=this.locale.t,this.maskPhone=I,this.maskCni=F,this.perms=[`dossier.create`,`dossier.review`],this.fmtDateTime=L,this.initials=U,this.snackbar=E(k),this.refusalReasons=R,this.refusalOptions=R.map(e=>({value:e,label:e})),this.kindKey=j,this.dialog=ee(null),this.comment=``,this.createMember=!0,this.duplicateChoice=`distinct`,this.refuseReason=`informations incohérentes`,this.editFirst=``,this.editLast=``,this.editSex=`F`,this.editAge=``,this.editPhone=``,this.editCni=``,this.editVillage=``,this.editOrgId=``,this.editCreateMember=!0,this.id=D(this.route.paramMap.pipe(w(e=>e.get(`id`)??``)),{initialValue:``}),this.dossier=n(()=>{let e=this.id(),t=this.store.state(),n=t.dossiers.find(t=>t.id===e);if(n)return N([n],t.session).length===1?n:void 0}),this.editable=n(()=>{let e=this.dossier();return!!e&&this.store.can(`dossier.create`)&&(e.status===`brouillon`||e.status===`complément demandé`)}),this.docs=n(()=>{let e=this.dossier();if(!e)return[];let t=new Set(e.documentIds);return this.store.state().documents.filter(e=>t.has(e.id))}),this.orgsForScoop=n(()=>{let e=this.dossier();return e?this.store.state().orgs.filter(t=>t.scoopId===e.scoopId):[]}),this.canReview=n(()=>this.store.can(`dossier.review`)),this.who=n(()=>{let e=this.store.state().session;return e?{email:e.email,role:e.role}:null}),this.decisionOk=n(()=>{let e=this.dossier(),t=this.who();return!e||!t?!1:B(e,t).ok}),this.decisionError=n(()=>{let e=this.dossier(),t=this.who();if(!e||!t)return``;let n=B(e,t);return n.ok?``:n.error}),this.step=n(()=>{let e=this.dossier();return e?Oe[e.status]:0}),this.steps=n(()=>{let e=this.t(),t=this.dossier(),n=t?.status===`approuvé`||t?.status===`refusé`?e(this.statusKey(t.status)):e(`dossiers.v2.step.decision`);return[{key:`b`,label:t?.status===`complément demandé`?e(this.statusKey(t.status)):e(`dossiers.v2.step.brouillon`)},{key:`s`,label:e(`dossiers.v2.step.soumis`)},{key:`e`,label:e(`dossiers.v2.step.examen`)},{key:`d`,label:n}]}),this.history=n(()=>[...this.dossier()?.history??[]].sort((e,t)=>t.at.localeCompare(e.at))),this.heroBadges=n(()=>{let e=this.dossier();if(!e)return[];let t=this.t();return[{label:t(this.statusKey(e.status)),tone:{brouillon:`light`,soumis:`warn`,"en examen":`light`,"complément demandé":`warn`,approuvé:`citron`,refusé:`danger`}[e.status]},...e.possibleDuplicateOf?[{label:t(`dossiers.row.duplicate`),tone:`danger`,icon:`warning`}]:[]]}),this.heroMeta=n(()=>{let e=this.dossier();return e?[{icon:`apartment`,text:this.scoopName(e.scoopId)},{icon:`badge`,text:e.createdBy},{icon:`calendar_today`,text:this.t()(`dossiers.v2.created`,{date:M(e.createdAt)})}]:[]}),this.orgOptions=n(()=>this.orgsForScoop().map(e=>({value:e.id,label:e.name,...e.village?{hint:e.village}:{}})).sort((e,t)=>e.label.localeCompare(t.label))),this.slots=n(()=>P.map(e=>({id:e,label:this.t()(j[e]),hint:this.t()(`dossiers.new.kindHint.${e}`),icon:Q[e]??`description`,sensitive:e===`cni`}))),this.slotFiles=n(()=>this.docs().map(e=>({key:e.id,name:e.name,sizeKb:e.sizeKb,slot:e.kind}))),te(()=>{let e=this.dossier();e&&(this.editFirst=e.draft.firstName,this.editLast=e.draft.lastName,this.editSex=e.draft.sex,this.editAge=e.draft.age===null?``:String(e.draft.age),this.editPhone=e.draft.phone,this.editCni=e.draft.cni,this.editVillage=e.draft.village,this.editOrgId=e.draft.orgId,this.editCreateMember=e.draft.createMember,this.createMember=e.draft.createMember)})}scoopName(e){return this.store.state().scoops.find(t=>t.id===e)?.name??``}orgName(e){return this.store.state().orgs.find(t=>t.id===e)?.name??this.t()(`dossiers.detail.info.notSet`)}producerLabel(e){let t=this.store.state().producers.find(t=>t.id===e);return t?`${t.firstName} ${t.lastName}`:e}errMsg(e){return this.locale.tNow(e)}statusKey(e){return`dossiers.status.${e}`}draftFromForm(){let e=this.editAge.trim()===``?null:Number(this.editAge);return{firstName:this.editFirst.trim(),lastName:this.editLast.trim(),sex:this.editSex,age:Number.isFinite(e)?e:null,phone:this.editPhone.trim(),cni:this.editCni.trim(),village:this.editVillage.trim(),orgId:this.editOrgId,createMember:this.editCreateMember}}dirty(){let e=this.dossier();if(!e)return!1;let t=this.draftFromForm();return Object.keys(t).some(n=>t[n]!==e.draft[n])}patch(){let e=this.dossier();if(!e)return{};let t=this.draftFromForm(),n={};for(let r of Object.keys(t))t[r]!==e.draft[r]&&(n[r]=t[r]);return n}saveDraft(){let e=this.dossier();if(!e)return;let t=this.patch();if(!Object.keys(t).length)return;let n=this.store.actions.updateDossier(e.id,t);this.say(n.ok,n.ok?this.t()(`dossiers.detail.edit.saved`):this.errMsg(n.error))}saveAndSubmit(){let e=this.dossier();if(!e)return;let t=this.patch();if(Object.keys(t).length){let n=this.store.actions.updateDossier(e.id,t);if(!n.ok){this.say(!1,this.errMsg(n.error));return}}let n=this.store.actions.submitDossier(e.id);this.say(n.ok,n.ok?n.possibleDuplicateOf?`${this.t()(`dossiers.detail.edit.submitted`)} · ${this.t()(`dossiers.detail.edit.duplicateFlagged`)}`:this.t()(`dossiers.detail.edit.submitted`):this.errMsg(n.error))}addFiles(e,t){let n=this.dossier();if(n)for(let r of t){let t=Math.ceil(r.size/1024);if(t>$){this.snackbar.error(this.t()(`dossiers.new.tooBig`,{name:r.name,mb:$/1024}));continue}let i=this.store.actions.addDocument(n.id,{kind:e,name:r.name,sizeKb:t,mime:r.type||`application/octet-stream`});this.say(i.ok,i.ok?this.t()(`dossiers.detail.pieces.added`):this.errMsg(i.error))}}removeDoc(e){let t=this.store.actions.removeDocument(e);this.say(t.ok,t.ok?this.t()(`dossiers.detail.pieces.removed`):this.errMsg(t.error))}openComplement(){this.comment=``,this.dialog.set(`complement`)}openRefuse(){this.comment=``,this.refuseReason=`informations incohérentes`,this.dialog.set(`refuse`)}startReview(){let e=this.dossier();if(!e)return;let t=this.store.actions.startReview(e.id);this.say(t.ok,t.ok?this.t()(`dossiers.detail.decision.startedToast`):this.errMsg(t.error))}approve(){let e=this.dossier();if(!e)return;let t=this.store.actions.approveDossier(e.id,{...e.possibleDuplicateOf?{duplicate:this.duplicateChoice}:{},createMember:this.createMember});this.dialog.set(null),this.say(t.ok,t.ok?t.selfApproved?this.t()(`dossiers.detail.approve.doneSelf`):this.t()(`dossiers.detail.approve.done`):this.errMsg(t.error))}complement(){let e=this.dossier();if(!e)return;let t=this.store.actions.requestComplement(e.id,this.comment);this.dialog.set(null),this.say(t.ok,t.ok?this.t()(`dossiers.detail.complementDialog.done`):this.errMsg(t.error))}refuse(){let e=this.dossier();if(!e)return;let t=this.store.actions.refuseDossier(e.id,this.refuseReason,this.comment);this.dialog.set(null),this.say(t.ok,t.ok?this.t()(`dossiers.detail.refuseDialog.done`):this.errMsg(t.error))}say(e,t){e?this.snackbar.success(t):this.snackbar.error(t)}name(e){return`${e.draft.firstName||this.t()(`dossiers.row.noFirstName`)} ${e.draft.lastName||this.t()(`dossiers.row.noLastName`)}`}kindIcon(e){return Q[e]??`description`}eventKey(e){return`dossiers.event.${e}`}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=u({type:e,selectors:[[`app-dossier-detail-page`]],decls:3,vars:3,consts:[[3,`perm`,`area`],[1,`card`,`mx-auto`,`mt-16`,`flex`,`max-w-lg`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`crumb`,`title`,`eyebrow`,`mono`,`badges`,`meta`,`backLabel`],[`hero-extra`,``,`role`,`list`,1,`steps`,`relative`,`mt-6`],[`role`,`listitem`,1,`step`,3,`done`,`now`],[1,`sec-card`,`mt-4`],[1,`notice`,`mt-4`,2,`background`,`var(--v2-bloquant-bg)`,`color`,`var(--v2-bloquant-fg)`],[1,`grid-main`,`mt-4`],[1,`sec-card`],[1,`sec-head`],[1,`sec-ico`],[`name`,`person`,3,`size`],[1,`grid`,`gap-5`,`border-t`,`p-5`,`sm:grid-cols-2`,2,`border-color`,`var(--v2-separateur)`],[1,`facts`],[1,`grid`,`gap-4`],[`name`,`upload_file`,3,`size`],[1,`n`],[1,`border-t`,`p-5`,2,`border-color`,`var(--v2-separateur)`],[`name`,`event_note`,3,`size`],[1,`timeline`],[`icon`,`task_alt`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-4`,`pb-5`],[1,`check`],[`type`,`checkbox`,3,`change`,`checked`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`icon`,`mark_email_unread`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`for`,`complement`,1,`lbl`],[`id`,`complement`,1,`area`,`mb-5`,`mt-2`,3,`input`,`placeholder`,`value`],[`name`,`arrow_forward`,3,`size`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`lbl`],[`leadingIcon`,`warning`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[`for`,`refuse-detail`,1,`lbl`],[`id`,`refuse-detail`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`],[`role`,`listitem`,1,`step`],[1,`b`],[1,`truncate`],[`name`,`gavel`,3,`size`],[1,`flex`,`flex-wrap`,`gap-2`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`44px`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`44px`,3,`click`],[`name`,`mark_email_unread`,3,`size`],[`type`,`button`,1,`btn`,`btn-ghost`,`act-danger`,2,`height`,`44px`,3,`click`],[`name`,`close`,3,`size`],[`type`,`button`,1,`btn`,`btn-primary`,2,`height`,`44px`,3,`click`,`disabled`],[1,`btn-chip`,2,`height`,`32px`,`width`,`32px`],[1,`sub`,`border-t`,`px-5`,`py-3`,2,`border-color`,`var(--v2-separateur)`],[1,`notice`,`mx-5`,`mb-4`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`visibility`,3,`size`],[`name`,`warning`,3,`size`],[`preset`,`firstName`,3,`valueChange`,`label`,`value`],[`preset`,`lastName`,3,`valueChange`,`label`,`value`],[`role`,`radiogroup`,1,`seg`,`seg-form`,`mt-2`],[`type`,`button`,`role`,`radio`,3,`click`],[`preset`,`age`,3,`valueChange`,`label`,`value`],[`preset`,`phone`,3,`valueChange`,`label`,`value`],[`preset`,`cni`,3,`valueChange`,`label`,`hint`,`value`],[`preset`,`village`,3,`valueChange`,`label`,`value`],[`leadingIcon`,`hub`,1,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[1,`check`,`sm:col-span-2`],[1,`flex`,`flex-wrap`,`justify-end`,`gap-2`,`sm:col-span-2`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`,`disabled`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`fact`],[1,`fact-ico`],[`name`,`calendar_today`,3,`size`],[`name`,`call`,3,`size`],[1,`tabular-nums`],[`name`,`badge`,3,`size`],[`name`,`location_on`,3,`size`],[`name`,`hub`,3,`size`],[`name`,`group`,3,`size`],[`name`,`apartment`,3,`size`],[`accept`,`image/*,application/pdf`,3,`added`,`removed`,`slots`,`files`,`hint`],[1,`doc-row`],[1,`sub`,`border-t`,`px-5`,`py-5`,2,`border-color`,`var(--v2-separateur)`],[3,`name`,`size`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`font-bold`],[1,`sub`],[1,`badge`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[`aria-hidden`,`true`,1,`dot`],[1,`min-w-0`],[1,`block`,`font-bold`],[1,`block`,`text-[14px]`],[1,`sub`,`block`],[1,`notice`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`role`,`radiogroup`,1,`seg`,`seg-form`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`name`,`folder_open`,3,`size`],[1,`text-[22px]`,`font-extrabold`],[`routerLink`,`/dashboard/dossiers`,1,`btn`,`btn-ghost`,`mt-2`]],template:function(e,t){if(e&1&&(a(0,`app-shell`,0),T(1,Ee,74,62)(2,De,9,4,`div`,1),r()),e&2){let e;f(`perm`,t.perms)(`area`,t.t()(`dossiers.detail.area`)),_(),m((e=t.dossier())?1:2,e)}},dependencies:[V,W,K,O,G,A,q,J],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.steps[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 6px;
      }
      .step[_ngcontent-%COMP%] {
        display: flex;
        min-width: 0;
        align-items: center;
        gap: 8px;
        border-radius: 14px;
        background: color-mix(in oklab, var(--%NS%v2-blanc) 8%, transparent);
        padding: 10px 12px;
        font-size: 13px;
        font-weight: 800;
        color: color-mix(in oklab, var(--%NS%v2-blanc) 60%, transparent);
      }
      .step[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {
        display: grid;
        height: 24px;
        width: 24px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 999px;
        border: 1.5px solid currentColor;
        font-size: 12px;
      }
      .step.done[_ngcontent-%COMP%] {
        color: var(--%NS%v2-blanc);
      }
      .step.done[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {
        border-color: var(--%NS%v2-citron);
        background: var(--%NS%v2-citron);
        color: var(--%NS%v2-foret);
      }
      .step.now[_ngcontent-%COMP%] {
        background: var(--%NS%v2-citron);
        color: var(--%NS%v2-foret);
      }
      .step.now[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {
        border-color: var(--%NS%v2-foret);
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-citron);
      }
      @media (max-width: 640px) {
        .steps[_ngcontent-%COMP%] {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
      .grid-main[_ngcontent-%COMP%] {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .grid-main[_ngcontent-%COMP%] {
          grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
          align-items: start;
        }
      }
      .timeline[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
        display: flex;
        gap: 14px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 20px;
      }
      .dot[_ngcontent-%COMP%] {
        margin-top: 5px;
        height: 12px;
        width: 12px;
        flex-shrink: 0;
        border-radius: 999px;
        background: var(--%NS%v2-foret);
        box-shadow: 0 0 0 4px var(--%NS%v2-sauge);
      }
      .seg-form[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {
        flex: 1;
        justify-content: center;
      }
      .doc-row[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 20px;
        font-size: 14px;
      }`]})}};export{ke as default};