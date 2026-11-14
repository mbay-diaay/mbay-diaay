import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,L as ee,Ln as te,Lt as c,Nt as l,St as ne,Vt as u,Wt as d,Yn as f,_t as p,en as m,fn as h,ft as g,gt as _,hn as v,ln as y,mn as b,mt as x,pn as S,t as C,tn as w,vt as T,zn as E}from"./_router-chunk-H0-n0SZI.js";import{n as D}from"./index-B8S1FFME.js";import{l as O,n as k}from"./snackbar.component-ICe8-MWg.js";import{Et as A,H as re,W as j,s as ie,t as M,xt as N,z as P}from"./locale.service-Bf8_ncMo.js";import{t as F}from"./app-shell.component-CR4uAChA.js";import{t as I}from"./plot-map.component-DCd5n385.js";import{t as L}from"./store.service-ZF4OfoGo.js";import{n as R,t as z}from"./v2-page.styles-Blvl6ZBZ.js";import{T as B,n as V}from"./ui-CQhTckzj.js";var H=e=>[`/dashboard/producteurs`,e],U=e=>({n:e}),W=(e,t)=>t.key,G=(e,t)=>t.id,K=(e,t)=>t.label,q=(e,t)=>t.phone;function J(e,n){if(e&1){let e=c();a(0,`button`,8),t(`click`,function(){let t=f(e).$implicit,n=u(2);return o(n.filter.set(t.key))}),h(1),a(2,`span`,11),h(3),r()()}if(e&2){let e=n.$implicit,t=u(2);_(`on`,t.filter()===e.key),x(`aria-checked`,t.filter()===e.key),g(),b(` `,t.t()(e.label)),g(),_(`zero`,!t.countInGroup(e.key)),g(),S(t.countInGroup(e.key))}}function Y(t,n){if(t&1&&(a(0,`div`,7),m(1,J,4,7,`button`,18,W),r()),t&2){let t=u();x(`aria-label`,t.t()(`qualite.v2.dbl.view.cases`)),g(),e(t.groups)}}function ae(e,n){if(e&1){let e=c();a(0,`button`,25),t(`click`,function(){let t=f(e).$implicit,n=u(2);return o(n.chooseCase(t.id))}),a(1,`span`,26)(2,`span`,27),h(3),r(),a(4,`span`,28),h(5),r()(),a(6,`span`,29)(7,`span`,30),h(8),r(),a(9,`span`,31),h(10),r()(),a(11,`span`,32)(12,`span`,33),h(13),r(),a(14,`span`,34),h(15),r()()()}if(e&2){let e=n.$implicit,t=u(2),r=t.producerById(e.aId),i=t.producerById(e.bId);_(`on`,t.selId()===e.id),x(`aria-pressed`,t.selId()===e.id),g(3),S(t.initials(t.name(r))),g(2),S(t.initials(t.name(i))),g(3),S(t.name(r)),g(2),v(``,r?.village,` · `,e.id.toUpperCase()),g(2),y(`color`,t.scoreColor(e.score)),g(),b(``,e.score,` %`),g(),y(`background`,t.caseTone[e.status].bg)(`color`,t.caseTone[e.status].fg),g(),S(t.t()(t.statusLabel[e.status]))}}function X(e,t){if(e&1&&(a(0,`p`,23),h(1),r()),e&2){let e=u(2);g(),S(e.t()(`qualite.doublons.noCase`))}}function oe(e,t){if(e&1&&(a(0,`span`,52),h(1),r()),e&2){let e=u(6);g(),S(e.t()(`qualite.doublons.secondarySignal`))}}function se(e,t){if(e&1&&(a(0,`span`,34),h(1),T(2,oe,2,1,`span`,52),r()),e&2){let e=t.$implicit;y(`background`,e.primary?`var(--v2-info-bg)`:`var(--v2-creme)`)(`color`,e.primary?`var(--v2-info-fg)`:`var(--v2-ardoise)`),g(),b(` `,e.label,` `),g(),p(e.primary?-1:2)}}function ce(e,t){e&1&&l(0,`ui-icon`,54),e&2&&d(`size`,14)}function le(e,t){if(e&1&&(a(0,`tr`)(1,`td`,47),h(2),r(),a(3,`td`,53),h(4),r(),a(5,`td`,53),h(6),T(7,ce,1,1,`ui-icon`,54),r()()),e&2){let e=t.$implicit;_(`diff`,e.diff),g(2),S(e.label),g(2),S(e.a),g(2),b(` `,e.b,` `),g(),p(e.diff?7:-1)}}function ue(e,n){if(e&1){let e=c();a(0,`button`,55),t(`click`,function(){f(e);let t=u(3),n=u(2);return o(n.revealCni(t.id))}),l(1,`ui-icon`,56),h(2),r()}if(e&2){let e=u(5);g(),d(`size`,14),g(),b(``,e.t()(`qualite.doublons.showCni`),` `)}}function de(e,t){if(e&1&&(a(0,`div`,57),l(1,`app-plot-map`,58),r(),a(2,`p`,59),h(3),r()),e&2){let e=u(5);g(),d(`plots`,e.casePlots()),g(2),S(e.t()(`qualite.doublons.bothPlots`))}}function fe(e,n){if(e&1){let e=c();a(0,`button`,65),t(`click`,function(){f(e);let t=u(4),n=u(2);return o(n.undoMerge(t.id))}),l(1,`ui-icon`,66),h(2),r()}if(e&2){let e=u(6);g(),d(`size`,18),g(),b(``,e.t()(`qualite.doublons.undoMerge`),` `)}}function pe(e,t){if(e&1&&(a(0,`section`,51)(1,`div`,60)(2,`span`,61),l(3,`ui-icon`,62),r(),a(4,`div`,29)(5,`p`,63),h(6),r(),a(7,`p`,47),h(8),r()(),T(9,fe,3,2,`button`,64),r()()),e&2){let e=u(3),t=u(2);g(3),d(`size`,18),g(3),S(t.t()(`qualite.doublons.merged.title`)),g(2),v(` `,t.t()(`qualite.doublons.merged.body`),` `,e.comment??``,` `),g(),p(t.merges()[e.id]&&t.store.can(`quality.merge`)?9:-1)}}function me(e,n){if(e&1){let e=c();a(0,`button`,78),t(`click`,function(){let t=f(e).$implicit,n=u(6);return o(n.classifyStatus.set(t))}),l(1,`span`,79),h(2),r()}if(e&2){let e=n.$implicit,t=u(6);_(`on`,t.classifyStatus()===e),x(`aria-checked`,t.classifyStatus()===e),g(),y(`background`,t.caseTone[e].fg),g(),b(``,t.t()(t.statusLabel[e]),` `)}}function he(e,n){if(e&1){let e=c();a(0,`button`,80),t(`click`,function(){f(e);let t=u(6);return o(t.mergeOpen.set(!0))}),l(1,`ui-icon`,81),h(2),r()}if(e&2){let e=u(6);d(`disabled`,e.comment().trim().length<3),g(),d(`size`,18),g(),b(``,e.t()(`qualite.doublons.mergeBIntoA`),` `)}}function ge(e,t){if(e&1&&(a(0,`p`,47),h(1),r()),e&2){let e=u(6);g(),S(e.t()(`qualite.doublons.mergeNeedsPerm`))}}function _e(n,i){if(n&1){let e=c();a(0,`section`,36)(1,`div`,67)(2,`h2`)(3,`span`,68),l(4,`ui-icon`,69),r(),h(5),r()(),a(6,`div`,70)(7,`div`,71),m(8,me,3,6,`button`,72,w),r(),a(10,`div`)(11,`label`,73),h(12),r(),a(13,`textarea`,74),t(`input`,function(t){f(e);let n=u(5);return o(n.comment.set(t.target.value))}),r()(),a(14,`div`,75),T(15,he,3,3,`button`,76),a(16,`button`,77),t(`click`,function(){f(e);let t=u(5);return o(t.saveClassify())}),h(17),a(18,`span`,16),l(19,`ui-icon`,17),r()()(),T(20,ge,2,1,`p`,47),r()()}if(n&2){let t=u(5);g(4),d(`size`,18),g(),b(``,t.t()(`qualite.doublons.classify.title`),` `),g(2),x(`aria-label`,t.t()(`qualite.doublons.classify.aria`)),g(),e(t.classifyStatuses),g(4),b(``,t.t()(`qualite.common.comment`),` *`),g(),d(`placeholder`,t.t()(`qualite.doublons.classify.commentPlaceholder`))(`value`,t.comment()),g(2),p(t.store.can(`quality.merge`)?15:-1),g(),d(`disabled`,!t.canSaveClassify()),g(),b(` `,t.t()(`qualite.doublons.classify.save`)),g(2),d(`size`,18),g(),p(t.store.can(`quality.merge`)?-1:20)}}function ve(t,n){if(t&1&&(a(0,`div`,35)(1,`section`,36)(2,`div`,37)(3,`span`,38),h(4),r(),a(5,`div`,29)(6,`p`,2),h(7),r(),a(8,`h2`,39),h(9),r(),a(10,`div`,40),m(11,se,3,6,`span`,41,K),r()(),a(13,`span`,34),h(14),r()(),a(15,`div`,42)(16,`table`,43)(17,`thead`)(18,`tr`)(19,`th`,44),h(20),r(),a(21,`th`),h(22),a(23,`a`,45),h(24),r()(),a(25,`th`),h(26),a(27,`a`,45),h(28),r()()()(),a(29,`tbody`),m(30,le,8,6,`tr`,46,K),a(32,`tr`)(33,`td`,47),h(34),r(),a(35,`td`,48),h(36),r(),a(37,`td`,48),h(38),r()()()()(),a(39,`div`,49)(40,`span`,47),h(41),r(),T(42,ue,3,2,`button`,50),r(),T(43,de,4,2),r(),T(44,pe,10,5,`section`,51)(45,_e,21,11,`section`,36),r()),t&2){let t=n,r=u(),i=u(),a=u(2);g(3),y(`background`,a.scoreBg(i.score))(`color`,a.scoreColor(i.score)),g(),b(``,i.score,`%`),g(3),v(` `,a.t()(`qualite.v2.dbl.score`),` · `,i.id.toUpperCase(),` `),g(2),v(` `,a.name(r),` / `,a.name(t),` `),g(2),e(i.signals),g(2),y(`background`,a.caseTone[i.status].bg)(`color`,a.caseTone[i.status].fg),g(),S(a.t()(a.statusLabel[i.status])),g(6),S(a.t()(`qualite.v2.dbl.compare`)),g(2),b(` `,a.t()(`qualite.doublons.sheetA`),` `),g(),d(`routerLink`,s(28,H,r.id)),g(),S(a.t()(`qualite.doublons.openSheet`)),g(2),b(` `,a.t()(`qualite.doublons.sheetB`),` `),g(),d(`routerLink`,s(30,H,t.id)),g(),S(a.t()(`qualite.doublons.openSheet`)),g(2),e(a.comparisonRows(r,t)),g(4),S(a.t()(`qualite.doublons.row.plots`)),g(2),S(a.nPlots(r.id)),g(2),S(a.nPlots(t.id)),g(3),S(a.t()(`qualite.v2.dbl.diff`,s(32,U,a.diffCount(r,t)))),g(),p(a.store.can(`identity.read_full`)&&!a.showCni()?42:-1),g(),p(a.casePlots().length&&a.store.can(`map.read`)?43:-1),g(),p(i.status===`fusionné`?44:45)}}function ye(e,t){if(e&1&&T(0,ve,46,34,`div`,35),e&2){let e,t=u(),n=u(2);p((e=n.producerById(t.bId))?0:-1,e)}}function be(e,t){if(e&1&&T(0,ye,1,1),e&2){let e,n=u(2);p((e=n.producerById(t.aId))?0:-1,e)}}function xe(e,t){if(e&1&&(a(0,`div`,24),h(1),r()),e&2){let e=u(2);g(),S(e.t()(`qualite.doublons.selectCase`))}}function Se(t,n){if(t&1&&(a(0,`p`,19),h(1),r(),a(2,`div`,20)(3,`section`,21),m(4,ae,16,16,`button`,22,G,!1,X,2,1,`p`,23),r(),T(7,be,1,1)(8,xe,2,1,`div`,24),r()),t&2){let t,n=u();g(),S(n.currentGroupHint()),g(2),x(`aria-label`,n.t()(`qualite.v2.dbl.view.cases`)),g(),e(n.list()),g(3),p((t=n.sel())?7:8,t)}}function Ce(e,t){if(e&1&&(a(0,`li`,87)(1,`span`,88),h(2),r(),a(3,`a`,89),h(4),r(),a(5,`span`,47),h(6),r()()),e&2){let e=t.$implicit,n=u(3);g(2),S(n.initials(e.firstName+` `+e.lastName)),g(),d(`routerLink`,s(6,H,e.id)),g(),v(``,e.firstName,` `,e.lastName),g(2),v(``,e.code,` · `,e.village)}}function we(t,n){if(t&1&&(a(0,`section`,36)(1,`div`,67)(2,`h2`)(3,`span`,68),l(4,`ui-icon`,10),r(),a(5,`span`,85),h(6),r()(),a(7,`span`,86),h(8),r()(),a(9,`ul`),m(10,Ce,7,8,`li`,87,G),r()()),t&2){let t=n.$implicit,r=u(2);g(4),d(`size`,18),g(2),S(r.store.phone(t.phone)),g(2),S(r.t()(`qualite.doublons.phones.people`,s(3,U,t.members.length))),g(2),e(t.members)}}function Te(e,t){if(e&1&&(a(0,`p`,84),h(1),r()),e&2){let e=u(2);g(),b(` `,e.t()(`qualite.doublons.phones.none`),` `)}}function Ee(t,n){if(t&1&&(a(0,`p`,82),h(1),r(),a(2,`div`,83),m(3,we,12,5,`section`,36,q,!1,Te,2,1,`p`,84),r()),t&2){let t=u();g(),S(t.t()(`qualite.doublons.phones.intro`)),g(2),e(t.phoneGroups())}}var Z=[{key:`a-traiter`,label:`qualite.doublons.group.a-traiter`,hint:`qualite.doublons.group.a-traiter.hint`,statuses:[`à examiner`]},{key:`probables`,label:`qualite.doublons.group.probables`,hint:`qualite.doublons.group.probables.hint`,statuses:[`probable`]},{key:`non-resolus`,label:`qualite.doublons.group.non-resolus`,hint:`qualite.doublons.group.non-resolus.hint`,statuses:[`non résolu`]},{key:`classes`,label:`qualite.doublons.group.classes`,hint:`qualite.doublons.group.classes.hint`,statuses:[`confirmé`,`non-doublon`,`erreur de saisie d'identité`,`fusionné`]},{key:`tous`,label:`qualite.doublons.group.tous`,hint:`qualite.doublons.group.tous.hint`,statuses:null}];function Q(e,t){let n=Z.find(e=>e.key===t);return!n.statuses||n.statuses.includes(e.status)}var De=[`à examiner`,`probable`,`confirmé`,`non-doublon`,`erreur de saisie d'identité`,`non résolu`,`fusionné`],$={"à examiner":`qualite.doublons.status.à examiner`,probable:`qualite.doublons.status.probable`,confirmé:`qualite.doublons.status.confirmé`,"non-doublon":`qualite.doublons.status.non-doublon`,"erreur de saisie d'identité":`qualite.doublons.status.erreur de saisie d'identité`,"non résolu":`qualite.doublons.status.non résolu`,fusionné:`qualite.doublons.status.fusionné`},Oe={"à examiner":z.attente,confirmé:z.erreur,probable:z.culture,"non-doublon":z.succes,"erreur de saisie d'identité":z.info,"non résolu":z.neutre,fusionné:{bg:`var(--v2-foret)`,fg:`var(--v2-citron)`}},ke=class e{constructor(){this.store=E(L),this.locale=E(M),this.t=this.locale.t,this.route=E(C),this.groups=Z,this.statusLabel=$,this.caseTone=Oe,this.classifyStatuses=De.filter(e=>e!==`fusionné`),this.initials=R,this.snackbar=E(k),this.filter=i(`a-traiter`),this.selId=i(null),this.view=i(`cas`),this.showCni=i(!1),this.classifyStatus=i(``),this.comment=i(``),this.mergeOpen=i(!1),this.stats=n(()=>{let e=this.t(),t=this.visible(),n=t.filter(e=>e.status===`à examiner`),r=n.length?Math.round(n.reduce((e,t)=>e+t.score,0)/n.length):0,i=t.filter(e=>Q(e,`classes`)),a=this.phoneGroups();return[{label:e(`qualite.v2.dbl.stat.todo`),value:j.format(n.length),sub:e(`qualite.v2.dbl.stat.todoSub`,{score:r}),icon:`group`,bg:``,fg:``},{label:e(`qualite.v2.dbl.stat.probable`),value:j.format(t.filter(e=>e.status===`probable`).length),sub:e(`qualite.v2.dbl.stat.probableSub`),icon:`warning`,...z.culture},{label:e(`qualite.v2.dbl.stat.done`),value:j.format(i.length),sub:e(`qualite.v2.dbl.stat.doneSub`,{merged:t.filter(e=>e.status===`fusionné`).length}),icon:`task_alt`,...z.succes},{label:e(`qualite.v2.dbl.stat.phones`),value:j.format(a.length),sub:e(`qualite.v2.dbl.stat.phonesSub`,{n:a.reduce((e,t)=>e+t.members.length,0)}),icon:`call`,...z.attente}]}),this.visible=n(()=>{let e=this.store.state(),t=e.session,n=this.route.snapshot.queryParamMap.get(`scoop`)??void 0,r=new Map(e.producers.map(e=>[e.id,e]));return A(e.cases,e.producers,t).filter(e=>{let i=r.get(e.aId);return!(!i||!N([i],t).length||n&&i.scoopId!==n)})}),this.list=n(()=>this.visible().filter(e=>Q(e,this.filter()))),this.sel=n(()=>{let e=this.selId();if(e)return this.visible().find(t=>t.id===e)??this.list()[0]}),this.phoneGroups=n(()=>{let e=this.store.state();return ie(N(e.producers,e.session))}),this.merges=n(()=>this.store.state().merges),this.currentGroupHint=n(()=>{let e=this.filter(),t=Z.find(t=>t.key===e);return this.t()(t.hint)}),this.mergeConfirmBody=n(()=>{let e=this.sel(),t=this.store.state();if(!e)return``;let n=t.producers.find(t=>t.id===e.aId),r=t.producers.find(t=>t.id===e.bId);return this.t()(`qualite.doublons.confirm.body`,{bCode:r?.code??``,aCode:n?.code??``,plots:r?t.plots.filter(e=>e.producerId===r.id).length:0})}),this.casePlots=n(()=>{let e=this.sel();if(!e)return[];let t=new Set([e.aId,e.bId]);return this.store.state().plots.filter(e=>t.has(e.producerId))}),te(()=>{this.list();let e=this.selId();ee(()=>{let t=this.list();e&&t.some(t=>t.id===e)||this.selId.set(t[0]?.id??null)})})}name(e){return e?`${e.firstName} ${e.lastName}`:`—`}scoreColor(e){return e>=85?`var(--v2-erreur-fg)`:e>=70?`var(--v2-attente-fg)`:`var(--v2-info-fg)`}scoreBg(e){return e>=85?`var(--v2-erreur-bg)`:e>=70?`var(--v2-attente-bg)`:`var(--v2-info-bg)`}diffCount(e,t){return this.comparisonRows(e,t).filter(e=>e.diff).length}producerById(e){return this.store.state().producers.find(t=>t.id===e)}nPlots(e){return this.store.state().plots.filter(t=>t.producerId===e).length}countInGroup(e){return this.visible().filter(t=>Q(t,e)).length}chooseCase(e){this.selId.set(e),this.classifyStatus.set(``),this.comment.set(``),this.showCni.set(!1)}comparisonRows(e,t){let n=this.store.state(),r=this.t(),i=this.showCni();return[[r(`qualite.doublons.row.name`),e=>`${e.firstName} ${e.lastName}`],[r(`qualite.doublons.row.code`),e=>e.code],[r(`qualite.doublons.row.sex`),e=>e.sex],[r(`qualite.doublons.row.age`),e=>P(e.age)],[r(`qualite.doublons.row.phone`),e=>this.store.phone(e.phone)],[r(`qualite.doublons.row.cni`),e=>i?e.cni||r(`qualite.common.notProvided`):re(e.cni)],[r(`qualite.doublons.row.village`),e=>e.village],[r(`qualite.doublons.row.scoop`),e=>n.scoops.find(t=>t.id===e.scoopId)?.name??``],[r(`qualite.doublons.row.crops`),e=>e.crops.map(e=>e.crop).join(`, `)],[r(`qualite.doublons.row.enumerator`),e=>e.enumerator]].map(([n,r])=>{let i=r(e),a=r(t);return{label:n,a:i,b:a,diff:i!==a}})}canSaveClassify(){return!!this.classifyStatus()&&this.comment().trim().length>=3}saveClassify(){let e=this.sel(),t=this.classifyStatus();e&&t&&(this.store.actions.classifyCase(e.id,t,this.comment().trim()),this.comment.set(``),this.classifyStatus.set(``),this.snackbar.success(this.t()(`qualite.v2.dbl.classified`,{status:this.t()($[t])})))}confirmMerge(){let e=this.sel();!e||this.comment().trim().length<3||(this.store.actions.mergeCase(e.id,this.comment().trim()),this.comment.set(``),this.mergeOpen.set(!1),this.snackbar.success(this.t()(`qualite.v2.dbl.merged`)))}undoMerge(e){this.store.actions.undoMerge(e),this.snackbar.info(this.t()(`qualite.v2.dbl.undone`))}revealCni(e){this.store.actions.audit(`Révélation CNI`,`Cas ${e.toUpperCase()}`,`Comparaison doublon`),this.showCni.set(!0),this.snackbar.info(this.t()(`qualite.v2.dbl.cniShown`))}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=ne({type:e,selectors:[[`app-qualite-doublons-page`]],decls:30,vars:29,consts:[[`perm`,`quality.review`,3,`area`],[1,`rise`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`click`],[`name`,`group`,3,`size`],[`name`,`call`,3,`size`],[1,`n`],[`icon`,`hub`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`aria-hidden`,`true`,1,`h-2`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`check`,3,`size`],[`type`,`button`,`role`,`radio`,3,`on`],[1,`sub`,`mt-4`],[1,`layout`,`mt-3`],[1,`sec-card`,`cases`],[`type`,`button`,1,`case`,3,`on`],[1,`sub`,`p-6`,`text-center`],[1,`card`,`sub`,`p-10`,`text-center`],[`type`,`button`,1,`case`,3,`click`],[`aria-hidden`,`true`,1,`pair`],[1,`avatar`],[1,`avatar`,`b`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`flex`,`flex-col`,`items-end`,`gap-1`],[1,`text-[15px]`,`font-extrabold`,`tabular-nums`],[1,`badge`],[1,`grid`,`gap-4`],[1,`sec-card`],[1,`flex`,`flex-wrap`,`items-center`,`gap-4`,`p-5`],[1,`score`],[1,`mt-1`,`text-[20px]`,`font-extrabold`,`tracking-[-0.01em]`],[1,`mt-2`,`flex`,`flex-wrap`,`gap-1.5`],[1,`badge`,3,`background`,`color`],[1,`overflow-x-auto`,`border-t`,2,`border-color`,`var(--v2-separateur)`],[1,`cmp`,`w-full`,`min-w-[560px]`],[1,`w-36`],[1,`underline`,`underline-offset-4`,2,`color`,`var(--v2-foret)`,3,`routerLink`],[3,`diff`],[1,`sub`],[1,`font-semibold`,`tabular-nums`],[1,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-2`,`border-t`,`px-5`,`py-3`,2,`border-color`,`var(--v2-separateur)`],[`type`,`button`,1,`reveal`],[1,`sec-card`,`p-5`],[1,`opacity-70`],[1,`v`,`font-semibold`],[`name`,`warning`,2,`color`,`var(--v2-attente-fg)`,3,`size`],[`type`,`button`,1,`reveal`,3,`click`],[`name`,`visibility`,3,`size`],[1,`map`,`border-t`,2,`border-color`,`var(--v2-separateur)`],[`basemap`,`sat`,3,`plots`],[1,`sub`,`px-5`,`py-2`],[1,`flex`,`flex-wrap`,`items-center`,`gap-4`],[1,`sec-ico`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[`name`,`task_alt`,3,`size`],[1,`font-extrabold`],[`type`,`button`,1,`btn`,`btn-ghost`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`arrow_forward`,2,`transform`,`rotate(180deg)`,3,`size`],[1,`sec-head`],[1,`sec-ico`],[`name`,`gavel`,3,`size`],[1,`grid`,`gap-4`,`border-t`,`p-5`,2,`border-color`,`var(--v2-separateur)`],[`role`,`radiogroup`,1,`choices`],[`type`,`button`,`role`,`radio`,1,`choice`,3,`on`],[`for`,`dbl-comment`,1,`lbl`],[`id`,`dbl-comment`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[1,`flex`,`flex-wrap`,`justify-end`,`gap-2`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`disabled`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[`type`,`button`,`role`,`radio`,1,`choice`,3,`click`],[1,`d`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`,`disabled`],[`name`,`hub`,3,`size`],[1,`sub`,`mt-4`,`max-w-3xl`],[1,`mt-3`,`grid`,`gap-3`,`md:grid-cols-2`],[1,`card`,`sub`,`p-10`,`text-center`,`md:col-span-2`],[1,`tabular-nums`],[1,`badge`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`flex`,`items-center`,`gap-3`,`border-t`,`px-5`,`py-2.5`,2,`border-color`,`var(--v2-separateur)`],[1,`avatar`,2,`height`,`30px`,`width`,`30px`,`font-size`,`11px`],[1,`min-w-0`,`flex-1`,`truncate`,`font-bold`,`hover:underline`,3,`routerLink`]],template:function(e,n){e&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`p`,2),h(3),r(),a(4,`h1`,3),h(5),r(),a(6,`p`,4),h(7),r()(),l(8,`ui-stat-cards`,5),a(9,`div`,6)(10,`div`,7)(11,`button`,8),t(`click`,function(){return n.view.set(`cas`)}),l(12,`ui-icon`,9),h(13),r(),a(14,`button`,8),t(`click`,function(){return n.view.set(`telephones`)}),l(15,`ui-icon`,10),h(16),a(17,`span`,11),h(18),r()()(),T(19,Y,3,1,`div`,7),r(),T(20,Se,9,4)(21,Ee,6,2),a(22,`ui-modal`,12),t(`closed`,function(){return n.mergeOpen.set(!1)}),l(23,`div`,13),a(24,`button`,14),t(`click`,function(){return n.mergeOpen.set(!1)}),h(25),r(),a(26,`button`,15),t(`click`,function(){return n.confirmMerge()}),h(27),a(28,`span`,16),l(29,`ui-icon`,17),r()()()()),e&2&&(d(`area`,n.t()(`qualite.doublons.area`)),g(3),S(n.t()(`qualite.header.title`)),g(2),b(` `,n.t()(`qualite.nav.doublons`),` `),g(2),b(` `,n.t()(`qualite.doublons.description`),` `),g(),d(`stats`,n.stats()),g(2),x(`aria-label`,n.t()(`qualite.v2.dbl.view.aria`)),g(),_(`on`,n.view()===`cas`),x(`aria-checked`,n.view()===`cas`),g(),d(`size`,18),g(),b(``,n.t()(`qualite.v2.dbl.view.cases`),` `),g(),_(`on`,n.view()===`telephones`),x(`aria-checked`,n.view()===`telephones`),g(),d(`size`,18),g(),S(n.t()(`qualite.doublons.sharedPhones`)),g(),_(`zero`,!n.phoneGroups().length),g(),S(n.phoneGroups().length),g(),p(n.view()===`cas`?19:-1),g(),p(n.view()===`cas`?20:21),g(2),d(`open`,n.mergeOpen())(`title`,n.t()(`qualite.doublons.confirm.title`))(`description`,n.mergeConfirmBody())(`width`,560)(`closeLabel`,n.t()(`common.close`)),g(3),b(` `,n.t()(`qualite.doublons.confirm.cancel`),` `),g(2),b(` `,n.t()(`qualite.doublons.confirm.action`)),g(2),d(`size`,18))},dependencies:[F,O,B,I,D,V],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.layout[_ngcontent-%COMP%] {
        display: grid;
        gap: 16px;
      }
      @media (min-width: 1100px) {
        .layout[_ngcontent-%COMP%] {
          grid-template-columns: 340px minmax(0, 1fr);
          align-items: start;
        }
      }
      .cases[_ngcontent-%COMP%] {
        max-height: 72vh;
        overflow-y: auto;
      }
      .case[_ngcontent-%COMP%] {
        display: flex;
        width: 100%;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 12px 16px;
        text-align: left;
        cursor: pointer;
        transition: background-color 0.15s ease;
      }
      .case[_ngcontent-%COMP%]:first-child {
        border-top: none;
      }
      .case[_ngcontent-%COMP%]:hover {
        background: var(--%NS%v2-creme);
      }
      .case.on[_ngcontent-%COMP%] {
        background: var(--%NS%v2-sauge);
        box-shadow: inset 4px 0 0 var(--%NS%v2-foret);
      }
      .pair[_ngcontent-%COMP%] {
        position: relative;
        height: 40px;
        width: 58px;
        flex-shrink: 0;
      }
      .pair[_ngcontent-%COMP%]   .avatar[_ngcontent-%COMP%] {
        position: absolute;
        height: 32px;
        width: 32px;
        font-size: 11px;
        border: 2px solid var(--%NS%v2-blanc);
      }
      .pair[_ngcontent-%COMP%]   .b[_ngcontent-%COMP%] {
        left: 24px;
        top: 8px;
        background: var(--%NS%v2-culture-bg);
        color: var(--%NS%v2-culture-fg);
      }
      .score[_ngcontent-%COMP%] {
        display: grid;
        height: 64px;
        width: 64px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 999px;
        font-size: 17px;
        font-weight: 800;
      }
      .cmp[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {
        font-family: var(--%NS%v2-font-mono);
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--%NS%v2-gris-texte);
        padding: 10px 14px;
        text-align: left;
      }
      .cmp[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 10px 14px;
        font-size: 14px;
      }
      .cmp[_ngcontent-%COMP%]   tr.diff[_ngcontent-%COMP%]   td.v[_ngcontent-%COMP%] {
        background: color-mix(in oklab, var(--%NS%v2-attente-bg) 55%, transparent);
        font-weight: 800;
      }
      .choices[_ngcontent-%COMP%] {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
        gap: 8px;
      }
      .choice[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 14px;
        border: 1.5px solid var(--%NS%v2-bord-carte);
        padding: 10px 12px;
        text-align: left;
        font-size: 13px;
        font-weight: 800;
        cursor: pointer;
      }
      .choice[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-gris-texte);
      }
      .choice.on[_ngcontent-%COMP%] {
        border: 2px solid var(--%NS%v2-foret);
        background: var(--%NS%v2-sauge);
        padding: 9.5px 11.5px;
      }
      .choice[_ngcontent-%COMP%]   .d[_ngcontent-%COMP%] {
        height: 10px;
        width: 10px;
        flex-shrink: 0;
        border-radius: 999px;
      }
      .map[_ngcontent-%COMP%] {
        height: 240px;
      }`]})}};export{ke as default};