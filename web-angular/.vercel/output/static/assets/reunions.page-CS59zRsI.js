import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,Zn as m,_t as h,a as ee,bn as g,en as _,fn as v,ft as y,gt as b,hn as x,ln as S,mn as C,mt as w,pn as T,qt as E,rr as D,t as te,vn as ne,vt as O,yn as k,zn as A}from"./_router-chunk-H0-n0SZI.js";import{n as j}from"./rxjs-interop-U_NminAK.js";import{l as re,n as ie}from"./snackbar.component-ICe8-MWg.js";import{At as M,B as ae,O as oe,V as N,W as P,g as se,kt as ce,n as F,t as I,y as L}from"./locale.service-Bf8_ncMo.js";import{n as R,r as z,t as B}from"./meeting-form-dialog.component-utJyaaPO.js";import{t as V}from"./app-shell.component-CR4uAChA.js";import{t as H}from"./global-filters.component-BaLKxEEO.js";import{n as U,t as W}from"./v2-page.styles-Blvl6ZBZ.js";import{t as G}from"./pager-DPeF-1nO.js";import{t as le}from"./store.service-ZF4OfoGo.js";import{C as K,S as ue,T as de,a as fe,n as pe,p as me,w as q}from"./ui-CQhTckzj.js";var he=(e,t)=>({shown:e,total:t}),J=e=>({title:e}),ge=(e,t)=>({count:e,total:t}),_e=(e,t)=>({present:e,total:t}),Y=(e,t)=>t.id;function ve(e,n){if(e&1){let e=c();a(0,`button`,25),t(`click`,function(){p(e);let t=d();return o(t.openNewMeeting())}),v(1),a(2,`span`,26),l(3,`ui-icon`,17),r()()}if(e&2){let e=d();y(),C(` `,e.t()(`reunions.new`),` `),y(2),f(`size`,20)}}function ye(e,n){if(e&1){let e=c();a(0,`button`,13),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.filter.set(t.id))}),v(1),a(2,`span`,14),v(3),r()()}if(e&2){let e=n.$implicit,t=d();b(`on`,t.filter()===e.id),w(`aria-checked`,t.filter()===e.id),y(),C(` `,t.t()(e.label)),y(),b(`zero`,!t.countFor(e.id)),y(),T(t.nf.format(t.countFor(e.id)))}}function be(e,n){if(e&1){let e=c();a(0,`section`,19)(1,`ui-event-calendar`,27),t(`eventClick`,function(t){p(e);let n=d();return o(n.detailId.set(t.id))})(`dayCreate`,function(t){p(e);let n=d();return o(n.onCalendarDayCreate(t))}),r()()}if(e&2){let e=d();y(),f(`events`,e.calendarEvents())(`categories`,e.meetingCategories())(`dayCreateEnabled`,e.canManage())}}function xe(e,t){if(e&1&&(a(0,`span`,49),v(1),r(),a(2,`span`,50),l(3,`span`),r()),e&2){let e=d().$implicit,t=d(3),n=t.attendance(e);y(),T(t.t()(n.present>1?`reunions.attendance.autre`:`reunions.attendance.un`,E(3,ge,n.present,n.total))),y(2),S(`width`,n.rate,`%`)}}function Se(e,t){e&1&&(a(0,`span`,44),v(1,`—`),r())}function Ce(e,t){if(e&1&&(a(0,`span`,42),v(1),r()),e&2){let e=d().$implicit,t=d(3),n=t.minutes[e.minutes?.status??`none`];S(`background`,n.bg)(`color`,n.fg),y(),T(t.t()(n.label))}}function we(e,t){e&1&&(a(0,`span`,44),v(1,`—`),r())}function Te(e,n){if(e&1){let e=c();a(0,`button`,54),t(`click`,function(t){p(e);let n=d(2).$implicit,r=d(3);return t.stopPropagation(),o(r.openHold(n.id))}),l(1,`ui-icon`,55),r()}if(e&2){let e=d(2).$implicit,t=d(3);f(`title`,t.t()(`reunions.attendance.submit`)),w(`aria-label`,t.t()(`reunions.row.hold`,s(3,J,e.title))),y(),f(`size`,18)}}function Ee(e,n){if(e&1){let e=c();O(0,Te,2,5,`button`,51),a(1,`button`,52),t(`click`,function(t){p(e);let n=d().$implicit,r=d(3);return t.stopPropagation(),o(r.openCancel(n.id))}),l(2,`ui-icon`,53),r()}if(e&2){let e=d().$implicit,t=d(3);h(t.isPast(e.date)?0:-1),y(),f(`title`,t.t()(`reunions.cancel.submit`)),w(`aria-label`,t.t()(`reunions.row.cancel`,s(4,J,e.title))),y(),f(`size`,18)}}function De(e,n){if(e&1){let e=c();a(0,`tr`,35),t(`click`,function(){let t=p(e).$implicit,n=d(3);return o(n.detailId.set(t.id))}),a(1,`td`)(2,`span`,36)(3,`span`,37)(4,`span`,38),v(5),r(),a(6,`span`,39),v(7),r()(),a(8,`span`,2)(9,`span`,40),v(10),r(),a(11,`span`,41),v(12),r()()()(),a(13,`td`)(14,`span`,42),v(15),r()(),a(16,`td`,43),v(17),r(),a(18,`td`),O(19,xe,4,6)(20,Se,2,0,`span`,44),r(),a(21,`td`),O(22,Ce,2,5,`span`,45)(23,we,2,0,`span`,44),r(),a(24,`td`)(25,`span`,46),O(26,Ee,3,6),a(27,`button`,47),t(`click`,function(t){let n=p(e).$implicit,r=d(3);return t.stopPropagation(),o(r.detailId.set(n.id))}),l(28,`ui-icon`,48),r()()()()}if(e&2){let e=n.$implicit,t=d(3);y(3),S(`background`,e.status===`planifiée`?`var(--v2-foret)`:`var(--v2-creme)`)(`color`,e.status===`planifiée`?`var(--v2-blanc)`:`var(--v2-ardoise)`),y(2),T(t.day(e.date)),y(),S(`color`,e.status===`planifiée`?`var(--v2-citron)`:`var(--v2-gris-texte)`),y(),T(t.month(e.date)),y(2),f(`title`,e.title),y(),T(e.title),y(2),x(``,t.t()(t.kindLabel[e.kind]),` · `,t.fmtDateTime(e.date)),y(2),S(`background`,t.status[e.status].bg)(`color`,t.status[e.status].fg),y(),T(t.t()(t.statusLabel[e.status])),y(),f(`title`,e.place),y(),C(` `,e.place,` `),y(2),h(e.status===`tenue`?19:20),y(3),h(e.status===`tenue`?22:23),y(4),h(t.canManage()&&e.status===`planifiée`?26:-1),y(),f(`title`,t.t()(`common.view`)),w(`aria-label`,t.t()(`reunions.row.view`,s(25,J,e.title))),y(),f(`size`,18)}}function Oe(t,n){if(t&1&&(a(0,`div`,29)(1,`table`,30)(2,`thead`)(3,`tr`)(4,`th`),v(5),r(),a(6,`th`),v(7),r(),a(8,`th`),v(9),r(),a(10,`th`,31),v(11),r(),a(12,`th`),v(13),r(),a(14,`th`,32),v(15),r()()(),a(16,`tbody`),_(17,De,29,27,`tr`,33,Y),r()()(),l(19,`ui-pagination`,34)),t&2){let t=d(2);y(5),T(t.t()(`reunions.col.title`)),y(2),T(t.t()(`reunions.col.status`)),y(2),T(t.t()(`reunions.col.place`)),y(2),T(t.t()(`reunions.col.attendance`)),y(2),T(t.t()(`reunions.col.minutes`)),y(2),T(t.t()(`reunions.col.actions`)),y(2),e(t.pager.items()),y(2),f(`pager`,t.pager)}}function ke(e,t){if(e&1&&(a(0,`div`,28)(1,`span`,56),l(2,`ui-icon`,57),r(),a(3,`p`,58),v(4),r(),a(5,`p`,59),v(6),r()()),e&2){let e=d(2);y(2),f(`size`,26),y(2),T(e.t()(`reunions.empty.title`)),y(2),C(` `,e.mine().length?e.t()(`reunions.empty.filtered`):e.canManage()?e.t()(`reunions.empty.create`):e.t()(`reunions.empty.readonly`),` `)}}function Ae(e,t){if(e&1&&(a(0,`section`,20),O(1,Oe,20,7)(2,ke,7,3,`div`,28),r()),e&2){let e=d();y(),h(e.shown().length?1:2)}}function X(e,n){if(e&1){let e=c();a(0,`li`)(1,`label`,69)(2,`input`,70),t(`change`,function(t){let n=p(e).$implicit,r=d(3);return o(r.toggleHold(n.id,t))}),r(),a(3,`span`,71),v(4),r(),a(5,`span`,72),v(6),r()()()}if(e&2){let e=n.$implicit,t=d(3);y(2),f(`checked`,t.holdPresentIds().includes(e.id)),y(2),T(t.initials(e.firstName+` `+e.lastName)),y(2),x(``,e.firstName,` `,e.lastName)}}function je(e,t){if(e&1&&(a(0,`p`,61),v(1),r()),e&2){let e=d(3);y(),T(e.t()(`reunions.attendance.none`))}}function Me(n,i){if(n&1){let e=c();a(0,`div`,65)(1,`p`,66),v(2),r(),a(3,`button`,67),t(`click`,function(){p(e);let t=d(2);return o(t.toggleHoldAll())}),v(4),r()(),a(5,`ul`,68),_(6,X,7,4,`li`,null,Y),r(),O(8,je,2,1,`p`,61)}if(n&2){let t=d(2);y(2),C(` `,t.t()(`reunions.attendance.counter`,E(4,_e,t.holdPresentIds().length,t.holdMembers().length)),` `),y(2),C(` `,t.holdAllSelected()?t.t()(`reunions.attendance.uncheckAll`):t.t()(`reunions.attendance.checkAll`),` `),y(),w(`aria-label`,t.t()(`reunions.attendance.listAria`)),y(),e(t.holdMembers()),y(2),h(t.holdPresentIds().length?-1:8)}}function Ne(e,t){if(e&1&&(a(0,`p`,61),v(1),r()),e&2){let e=d(2);y(),T(e.t()(`reunions.attendance.noMembers`))}}function Pe(e,n){if(e&1){let e=c();a(0,`ui-modal`,60),t(`closed`,function(){p(e);let t=d();return o(t.closeHold())}),O(1,Me,9,7)(2,Ne,2,1,`p`,61),a(3,`button`,62),t(`click`,function(){p(e);let t=d();return o(t.closeHold())}),v(4),r(),a(5,`button`,63),t(`click`,function(){let t=p(e),n=d();return o(n.submitHold(t.id))}),v(6),a(7,`span`,26),l(8,`ui-icon`,64),r()()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`reunions.attendance.title`))(`description`,e.title+` · `+t.fmtDateTime(e.date))(`width`,600)(`closeLabel`,t.t()(`common.close`)),y(),h(t.holdMembers().length?1:2),y(3),C(` `,t.t()(`producteurs.index.cancel`),` `),y(),f(`disabled`,!t.holdPresentIds().length),y(),C(` `,t.t()(`reunions.attendance.submit`),` `),y(2),f(`size`,18)}}function Fe(e,n){if(e&1){let e=c();a(0,`ui-modal`,73),t(`closed`,function(){p(e);let t=d();return o(t.closeCancel())}),a(1,`p`,74),v(2),r(),a(3,`label`,75),v(4),r(),a(5,`textarea`,76),t(`input`,function(t){p(e);let n=d();return o(n.cancelReason.set(t.target.value))}),r(),a(6,`p`,77),v(7),r(),a(8,`button`,62),t(`click`,function(){p(e);let t=d();return o(t.closeCancel())}),v(9),r(),a(10,`button`,78),t(`click`,function(){p(e);let t=d();return o(t.submitCancel())}),v(11),r()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`reunions.cancel.title`))(`description`,t.t()(`reunions.cancel.description`))(`width`,560)(`closeLabel`,t.t()(`common.close`)),y(2),x(` `,e.title,` · `,t.fmtDateTime(e.date),` `),y(2),T(t.t()(`reunions.cancel.reason`)),y(),f(`placeholder`,t.t()(`reunions.cancel.reasonHint`))(`value`,t.cancelReason()),y(2),T(t.t()(`reunions.cancel.reasonHint`)),y(2),C(` `,t.t()(`reunions.cancel.keep`),` `),y(),f(`disabled`,t.cancelReason().trim().length<3),y(),C(` `,t.t()(`reunions.cancel.submit`),` `)}}var Z=[{id:`upcoming`,label:`reunions.filter.upcoming`,test:e=>e.status===`planifiée`},{id:`held`,label:`reunions.filter.held`,test:e=>e.status===`tenue`},{id:`cancelled`,label:`reunions.filter.cancelled`,test:e=>e.status===`annulée`},{id:`minutesTodo`,label:`reunions.filter.minutesTodo`,test:e=>e.status===`tenue`&&e.minutes?.status!==`validé`}],Q={planifiée:W.info,tenue:W.succes,annulée:W.neutre},$={none:{label:`reunions.minutes.none`,...W.neutre},brouillon:{label:`reunions.minutes.brouillon`,...W.attente},validé:{label:`reunions.minutes.validé`,...W.succes}},Ie=864e5,Le=class o{constructor(){this.store=A(le),this.locale=A(I),this.route=A(te),this.router=A(ee),this.t=this.locale.t,this.nf=P,this.fmtDateTime=N,this.initials=U,this.filters=Z,this.kindLabel=R,this.statusLabel=z,this.status=Q,this.minutes=$,this.snackbar=A(ie),this.detailId=i(null),this.vueFromUrl=j(this.route.queryParamMap.pipe(D(e=>e.get(`vue`)===`calendrier`?`calendrier`:`liste`),m(this.route.snapshot.queryParamMap.get(`vue`)===`calendrier`?`calendrier`:`liste`)),{requireSync:!0}),this.defaultScoopId=j(this.route.queryParamMap.pipe(D(e=>e.get(`scoop`)??void 0)),{initialValue:this.route.snapshot.queryParamMap.get(`scoop`)??void 0}),this.vueMode=n(()=>this.vueFromUrl()??`liste`),this.q=i(``),this.filter=i(`tous`),this.holdMeetingId=i(null),this.holdPresentIds=i([]),this.cancelMeetingId=i(null),this.cancelReason=i(``),this.meetingFormOpen=i(!1),this.meetingFormDefaultDate=i(void 0),this.mine=n(()=>L(ce(this.store.state().meetings,this.store.state().session),new Date().toISOString())),this.canManage=n(()=>this.store.can(`meeting.manage`)),this.memberCount=n(()=>{let e=new Map;for(let t of M(this.store.state().members,this.store.state().session))t.status===`membre`&&e.set(t.scoopId,(e.get(t.scoopId)??0)+1);return e}),this.shown=n(()=>{let e=Z.find(e=>e.id===this.filter()),t=this.q().trim().toLowerCase();return this.mine().filter(n=>(!e||e.test(n))&&(!t||`${n.title} ${n.place}`.toLowerCase().includes(t)))}),this.calendarEvents=n(()=>this.shown().map(e=>{let t=new Date(e.date);return{id:e.id,title:e.title,start:t,end:new Date(t.getTime()+72e5),tone:e.status===`planifiée`?`info`:e.status===`tenue`?`success`:`neutral`,category:e.kind,subtitle:e.place,muted:e.status===`annulée`}})),this.meetingCategories=n(()=>oe.map(e=>[e,this.t()(R[e])])),this.holdMeeting=n(()=>{let e=this.holdMeetingId();if(e)return this.mine().find(t=>t.id===e)}),this.holdMembers=n(()=>{let e=this.holdMeeting();if(!e)return[];let t=this.store.state().session;return[...M(this.store.state().members,t).filter(t=>t.scoopId===e.scoopId&&t.status===`membre`)].sort((e,t)=>`${e.lastName} ${e.firstName}`.localeCompare(`${t.lastName} ${t.firstName}`,`fr`))}),this.holdAllSelected=n(()=>{let e=this.holdMembers(),t=this.holdPresentIds();return e.length>0&&t.length===e.length}),this.cancelMeeting=n(()=>{let e=this.cancelMeetingId();return e?this.mine().find(t=>t.id===e)??null:null}),this.stats=n(()=>{let e=this.t(),t=this.mine(),n=new Date().toISOString(),r=t.filter(e=>e.status===`planifiée`&&e.date>=n).sort((e,t)=>e.date.localeCompare(t.date)),i=t.filter(e=>e.status===`tenue`),a=i.map(e=>this.attendance(e).rate),o=a.length?Math.round(a.reduce((e,t)=>e+t,0)/a.length):0,s=t.filter(e=>e.status===`tenue`&&e.minutes?.status!==`validé`).length;return[{label:e(`reunions.stat.total`),value:P.format(t.length),sub:e(`reunions.stat.totalSub`,{count:t.filter(e=>e.kind===`assemblée générale`).length}),icon:`event`,bg:``,fg:``},{label:e(`reunions.stat.upcoming`),value:P.format(r.length),sub:r[0]?e(`reunions.stat.upcomingSub`,{date:ae(r[0].date)}):e(`reunions.stat.upcomingNone`),icon:`event_upcoming`,...W.info},{label:e(`reunions.stat.held`),value:P.format(i.length),sub:e(`reunions.stat.heldSub`,{pct:o}),icon:`task_alt`,...W.succes},{label:e(`reunions.stat.minutes`),value:P.format(s),sub:e(`reunions.stat.minutesSub`),icon:`description`,...s?W.attente:W.succes}]}),this.detail=n(()=>{let e=this.detailId(),t=e?this.mine().find(t=>t.id===e):null;if(!t)return null;let n=this.t(),r=this.store.state(),i=this.attendance(t),a=Math.ceil((new Date(t.date).getTime()-Date.now())/Ie),o=r.members.filter(e=>t.presentIds.includes(e.id)),s=$[t.minutes?.status??`none`];return{title:t.title,subtitle:`${this.locale.formatDate(t.date,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`})} · ${t.place}`,icon:`event`,badges:[{label:n(z[t.status]),...Q[t.status]},{label:n(R[t.kind]),...W.culture},...t.status===`tenue`?[{label:`${n(`reunions.col.minutes`)} : ${n(s.label)}`,bg:s.bg,fg:s.fg}]:[]],kpis:[q(n(`reunions.quick.agenda`),t.agenda.length,`fact_check`,W.info),...t.status===`tenue`?[q(n(`reunions.quick.present`),i.present,`group`,W.succes),q(n(`reunions.quick.rate`),i.rate,`trending_up`,W.culture,`${i.rate} %`)]:t.status===`planifiée`&&a>=0?[q(n(`reunions.quick.daysLeft`),a,`calendar_today`,W.attente)]:[]],facts:[K(n(`reunions.detail.when`),N(t.date),`calendar_today`),K(n(`reunions.detail.where`),t.place,`location_on`),K(n(`reunions.detail.mode`),n(t.mode===`en ligne`?`reunions.form.mode.online`:t.mode===`mixte`?`reunions.form.mode.mixed`:`reunions.form.mode.onsite`),t.mode===`sur place`||!t.mode?`location_on`:`public`),...t.onlineUrl?[K(n(`reunions.detail.link`),t.onlineUrl,`link`,{wide:!0})]:[],K(n(`reunions.detail.convoked`),t.audience&&(t.audience.orgIds.length||t.audience.staffIds.length||t.audience.others.length)?n(`reunions.detail.convokedSummary`,{orgs:t.audience.orgIds.length,staff:t.audience.staffIds.length,others:t.audience.others.length}):n(`reunions.detail.convokedNone`),`group`,{wide:!0}),K(n(`reunions.detail.scoop`),r.scoops.find(e=>e.id===t.scoopId)?.name,`apartment`),K(n(`reunions.quick.createdBy`),t.createdBy,`badge`),...t.cancelReason?[K(n(`reunions.cancel.reason`),t.cancelReason,`warning`,{wide:!0})]:[]],sections:[{title:n(`reunions.detail.agenda`),icon:`fact_check`,count:null,empty:n(`reunions.detail.agendaNone`),items:t.agenda.map((e,t)=>({label:e,index:t+1})),more:0},...t.status===`tenue`?[{title:n(`reunions.attendance.presentList`),icon:`group`,count:o.length,empty:n(`reunions.attendance.nobody`),items:o.slice(0,8).map(e=>({label:`${e.firstName} ${e.lastName}`,sub:e.village,initials:U(`${e.firstName} ${e.lastName}`)})),more:Math.max(0,o.length-8)}]:[]],link:[`/dashboard/reunions`,t.id]}}),this.pager=G(()=>this.shown())}countFor(e){let t=Z.find(t=>t.id===e);return this.mine().filter(t.test).length}setVueMode(e){this.router.navigate([],{relativeTo:this.route,queryParams:{vue:e===`calendrier`?`calendrier`:null},queryParamsHandling:`merge`,replaceUrl:!0})}openNewMeeting(){this.meetingFormDefaultDate.set(void 0),this.meetingFormOpen.set(!0)}onCalendarDayCreate(e){this.meetingFormDefaultDate.set(e),this.meetingFormOpen.set(!0)}onMeetingFormNotify(e){this.flash(e.kind,e.text)}attendance(e){return se(e,this.memberCount().get(e.scoopId)??0)}isPast(e){return e<=new Date().toISOString()}day(e){return this.locale.formatDate(e,{day:`2-digit`})}month(e){return this.locale.formatDate(e,{month:`short`}).replace(`.`,``)}openHold(e){this.holdMeetingId.set(e),this.holdPresentIds.set([])}closeHold(){this.holdMeetingId.set(null),this.holdPresentIds.set([])}toggleHold(e,t){let n=t.target.checked;this.holdPresentIds.update(t=>{let r=new Set(t);return n?r.add(e):r.delete(e),[...r]})}toggleHoldAll(){let e=this.holdMembers();this.holdAllSelected()?this.holdPresentIds.set([]):this.holdPresentIds.set(e.map(e=>e.id))}submitHold(e){let t=this.holdPresentIds();try{let n=this.store.actions.holdMeeting(e,t);if(!n.ok){this.flash(`error`,this.locale.tNow(n.error));return}this.flash(`success`,this.t()(`reunions.attendance.done`)),this.closeHold()}catch(e){this.flash(`error`,this.errMsg(e))}}openCancel(e){this.cancelMeetingId.set(e),this.cancelReason.set(``)}closeCancel(){this.cancelMeetingId.set(null),this.cancelReason.set(``)}submitCancel(){let e=this.cancelMeetingId();if(!e)return;let t=this.cancelReason().trim();try{let n=this.store.actions.cancelMeeting(e,t);if(!n.ok){this.flash(`error`,this.locale.tNow(n.error));return}this.flash(`success`,this.t()(`reunions.cancel.done`)),this.closeCancel()}catch(e){this.flash(`error`,this.errMsg(e))}}flash(e,t){e===`success`?this.snackbar.success(t):this.snackbar.error(t)}errMsg(e){return e instanceof F?this.locale.tNow(e.key):e instanceof Error?e.message:String(e)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-reunions-page`]],decls:38,vars:40,consts:[[`perm`,`meeting.read`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[`type`,`button`,`role`,`radio`,3,`on`],[`name`,`view_list`,3,`size`],[`name`,`calendar_month`,3,`size`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`p-4`,`sm:p-5`],[1,`card`,`mt-3`,`overflow-hidden`],[3,`closed`,`view`],[`icon`,`task_alt`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`tone`,`danger`,`icon`,`close`,3,`open`,`title`,`description`,`width`,`closeLabel`],[3,`openChange`,`notify`,`open`,`defaultScoopId`,`defaultDate`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[3,`eventClick`,`dayCreate`,`events`,`categories`,`dayCreateEnabled`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[900px]`],[1,`w-[180px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`date`],[1,`text-[18px]`,`font-extrabold`,`leading-none`],[1,`mono`,`mt-1`,2,`font-size`,`10px`],[1,`block`,`max-w-[300px]`,`truncate`,`font-bold`,3,`title`],[1,`sub`,`block`,`truncate`],[1,`badge`],[1,`max-w-48`,`truncate`,`font-medium`,3,`title`],[1,`zero`],[1,`badge`,3,`background`,`color`],[1,`flex`,`justify-end`,`gap-2`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[1,`block`,`text-[13px]`,`font-bold`,`tabular-nums`],[`aria-hidden`,`true`,1,`meter`,`mt-1.5`],[`type`,`button`,1,`act`,`act-ok`,3,`title`],[`type`,`button`,1,`act`,`act-danger`,3,`click`,`title`],[`name`,`close`,3,`size`],[`type`,`button`,1,`act`,`act-ok`,3,`click`,`title`],[`name`,`task_alt`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`event`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[`icon`,`task_alt`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`sub`,`mb-4`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[`name`,`check`,3,`size`],[1,`mb-3`,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-2`],[`aria-live`,`polite`,1,`text-[14px]`,`font-extrabold`,`tabular-nums`],[`type`,`button`,1,`btn`,`btn-ghost`,2,`height`,`40px`,3,`click`],[1,`people`,`mb-4`],[1,`person`],[`type`,`checkbox`,3,`change`,`checked`],[1,`avatar`,2,`height`,`32px`,`width`,`32px`,`font-size`,`11px`],[1,`min-w-0`,`flex-1`,`truncate`],[`tone`,`danger`,`icon`,`close`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`mb-4`,`rounded-[16px]`,`px-4`,`py-3`,`text-[14px]`,`font-bold`,2,`background`,`var(--v2-creme)`],[`for`,`cancel-reason`,1,`lbl`],[`id`,`cancel-reason`,`rows`,`4`,1,`area`,`mt-2`,3,`input`,`placeholder`,`value`],[1,`sub`,`mb-4`,`mt-1.5`],[`modal-footer`,``,`type`,`button`,1,`btn`,2,`background`,`var(--v2-erreur-fg)`,`color`,`var(--v2-blanc)`,3,`click`,`disabled`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),v(4),r(),a(5,`h1`,4),v(6),r(),a(7,`p`,5),v(8),r()(),O(9,ve,4,2,`button`,6),r(),l(10,`ui-stat-cards`,7),a(11,`div`,8)(12,`label`,9),l(13,`ui-icon`,10),a(14,`input`,11),t(`input`,function(e){return i.q.set(e.target.value)}),r()(),l(15,`app-global-filters`),a(16,`div`,12)(17,`button`,13),t(`click`,function(){return i.filter.set(`tous`)}),v(18),a(19,`span`,14),v(20),r()(),_(21,ye,4,7,`button`,15,Y),r(),a(23,`div`,12)(24,`button`,13),t(`click`,function(){return i.setVueMode(`liste`)}),l(25,`ui-icon`,16),v(26),r(),a(27,`button`,13),t(`click`,function(){return i.setVueMode(`calendrier`)}),l(28,`ui-icon`,17),v(29),r()()(),a(30,`p`,18),v(31),r(),O(32,be,2,3,`section`,19)(33,Ae,3,1,`section`,20),a(34,`ui-detail-modal`,21),t(`closed`,function(){return i.detailId.set(null)}),r(),O(35,Pe,9,10,`ui-modal`,22),O(36,Fe,12,14,`ui-modal`,23),a(37,`app-meeting-form-dialog`,24),k(`openChange`,function(e){return ne(i.meetingFormOpen,e)||(i.meetingFormOpen=e),e}),t(`notify`,function(e){return i.onMeetingFormNotify(e)}),r()()),n&2){let t,n;f(`area`,i.t()(`reunions.area`)),y(4),T(i.t()(`reunions.eyebrow`)),y(2),C(` `,i.t()(`reunions.title`),` `),y(2),C(` `,i.t()(`reunions.description`),` `),y(),h(i.canManage()?9:-1),y(),f(`stats`,i.stats()),y(3),f(`size`,20),y(),f(`placeholder`,i.t()(`reunions.search.placeholder`))(`value`,i.q()),w(`aria-label`,i.t()(`reunions.search.aria`)),y(2),w(`aria-label`,i.t()(`reunions.filter.aria`)),y(),b(`on`,i.filter()===`tous`),w(`aria-checked`,i.filter()===`tous`),y(),C(` `,i.t()(`reunions.filter.all`)),y(),b(`zero`,!i.mine().length),y(),T(i.nf.format(i.mine().length)),y(),e(i.filters),y(2),w(`aria-label`,i.t()(`reunions.view.aria`)),y(),b(`on`,i.vueMode()===`liste`),w(`aria-checked`,i.vueMode()===`liste`),y(),f(`size`,18),y(),C(``,i.t()(`reunions.view.list`),` `),y(),b(`on`,i.vueMode()===`calendrier`),w(`aria-checked`,i.vueMode()===`calendrier`),y(),f(`size`,18),y(),C(``,i.t()(`reunions.view.calendar`),` `),y(2),C(` `,i.t()(`reunions.count`,E(37,he,i.nf.format(i.shown().length),i.nf.format(i.mine().length))),` `),y(),h(i.vueMode()===`calendrier`?32:33),y(2),f(`view`,i.detail()),y(),h((t=i.holdMeeting())?35:-1,t),y(),h((n=i.cancelMeeting())?36:-1,n),y(),g(`open`,i.meetingFormOpen),f(`defaultScoopId`,i.defaultScoopId())(`defaultDate`,i.meetingFormDefaultDate())}},dependencies:[V,ue,H,re,B,de,fe,pe,me],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.date[_ngcontent-%COMP%] {
        display: grid;
        width: 52px;
        flex-shrink: 0;
        place-items: center;
        border-radius: 14px;
        padding: 6px 0;
        text-align: center;
      }
      .meter[_ngcontent-%COMP%] {
        display: block;
        height: 6px;
        width: 100%;
        overflow: hidden;
        border-radius: 999px;
        background: var(--%NS%v2-lin);
      }
      .meter[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {
        display: block;
        height: 100%;
        border-radius: 999px;
        background: var(--%NS%v2-vert-pousse);
      }
      .act-ok[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-vert-pousse);
        background: var(--%NS%v2-sauge);
        color: var(--%NS%v2-vert-pousse);
      }
      .act-danger[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-erreur-fg);
        background: var(--%NS%v2-erreur-bg);
        color: var(--%NS%v2-erreur-fg);
      }
      .people[_ngcontent-%COMP%] {
        max-height: 46vh;
        overflow-y: auto;
        border-radius: 18px;
        border: 1px solid var(--%NS%v2-bord-carte);
      }
      .person[_ngcontent-%COMP%] {
        display: flex;
        min-height: 52px;
        align-items: center;
        gap: 12px;
        border-top: 1px solid var(--%NS%v2-separateur);
        padding: 8px 14px;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }
      .person[_ngcontent-%COMP%]:first-child {
        border-top: none;
      }
      .person[_ngcontent-%COMP%]:hover {
        background: var(--%NS%v2-creme);
      }
      .person[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
        height: 20px;
        width: 20px;
        accent-color: var(--%NS%v2-foret);
        cursor: pointer;
      }
      .area[_ngcontent-%COMP%] {
        width: 100%;
        min-height: 110px;
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
      .lbl[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--%NS%v2-ardoise);
      }`]})}};export{Le as default};