import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,L as c,Ln as l,Lt as u,M as d,Nt as f,St as p,V as ee,Vt as m,Wt as h,Yn as g,_t as _,a as te,en as v,fn as y,ft as b,gt as x,j as ne,k as S,mn as C,mt as w,nn as T,pn as E,tn as D,vt as O,zn as k}from"./_router-chunk-H0-n0SZI.js";import{O as A,k as j,n as M,t as N,xt as P}from"./locale.service-Bf8_ncMo.js";import{t as F}from"./store.service-ZF4OfoGo.js";import{O as I,T as L,o as R,t as z}from"./ui-CQhTckzj.js";import{l as B}from"./snackbar.component-ICe8-MWg.js";var V={"assemblée générale":`reunions.kind.assemblée générale`,"assemblée extraordinaire":`reunions.kind.assemblée extraordinaire`,bureau:`reunions.kind.bureau`,autre:`reunions.kind.autre`},H={planifiée:`reunions.status.planifiée`,tenue:`reunions.status.tenue`,annulée:`reunions.status.annulée`},U=e=>({name:e}),W=e=>({n:e});function re(e,n){if(e&1){let e=u();a(0,`p`,4),y(1),r(),a(2,`ui-select`,22),t(`valueChange`,function(t){g(e);let n=m();return o(n.scoopId.set(t))}),r()}if(e&2){let e=m();b(),E(e.t()(`reunions.form.scoop`)),b(),h(`label`,e.t()(`reunions.form.scoop`))(`options`,e.scoopOptions())(`value`,e.scoopId())}}function G(e,n){if(e&1){let e=u();a(0,`button`,23),t(`click`,function(){let t=g(e).$implicit,n=m();return o(n.kind.set(t))}),a(1,`span`,24),f(2,`ui-icon`,25),r(),y(3),r()}if(e&2){let e=n.$implicit,t=m();x(`on`,t.kind()===e),w(`aria-checked`,t.kind()===e),b(2),h(`name`,t.kindIcon[e])(`size`,18),b(),C(` `,t.t()(t.kindLabel[e]),` `)}}function K(e,n){if(e&1){let e=u();a(0,`button`,23),t(`click`,function(){let t=g(e).$implicit,n=m();return o(n.mode.set(t))}),a(1,`span`,24),f(2,`ui-icon`,25),r(),y(3),r()}if(e&2){let e=n.$implicit,t=m();x(`on`,t.mode()===e),w(`aria-checked`,t.mode()===e),b(2),h(`name`,t.modeIcon[e])(`size`,18),b(),C(` `,t.t()(t.modeLabel[e]),` `)}}function q(e,n){if(e&1){let e=u();a(0,`ui-text-field`,26),t(`valueChange`,function(t){g(e);let n=m();return o(n.place.set(t))}),r()}if(e&2){let e=m();h(`label`,e.t()(`reunions.form.place`))(`value`,e.place())(`error`,e.tried()?e.errPlace():``)}}function J(e,n){if(e&1){let e=u();a(0,`p`,30),y(1),r(),a(2,`p`,31),y(3),r(),a(4,`button`,16),t(`click`,function(){g(e);let t=m(2);return o(t.jitsiUrl.set(t.newJitsiUrl()))}),f(5,`ui-icon`,32),y(6),r()}if(e&2){let e=m(2);b(),E(e.t()(`reunions.form.link.jitsiHelp`)),b(2),E(e.jitsiUrl()),b(2),h(`size`,18),b(),E(e.t()(`reunions.form.link.jitsiNew`))}}function Y(e,n){if(e&1){let e=u();a(0,`ui-text-field`,33),t(`valueChange`,function(t){g(e);let n=m(2);return o(n.onlineUrl.set(t))}),r()}if(e&2){let e=m(2);h(`label`,e.t()(`reunions.form.link.url`))(`value`,e.onlineUrl())(`error`,e.tried()?e.errLink():``)}}function X(e,n){if(e&1){let e=u();a(0,`p`,10),y(1),r(),a(2,`div`,11)(3,`button`,23),t(`click`,function(){g(e);let t=m();return o(t.linkKind.set(`jitsi`))}),a(4,`span`,24),f(5,`ui-icon`,27),r(),y(6),r(),a(7,`button`,23),t(`click`,function(){g(e);let t=m();return o(t.linkKind.set(`other`))}),a(8,`span`,24),f(9,`ui-icon`,28),r(),y(10),r()(),O(11,J,7,4)(12,Y,1,3,`ui-text-field`,29)}if(e&2){let e=m();b(),E(e.t()(`reunions.form.link.kind`)),b(),w(`aria-label`,e.t()(`reunions.form.link.kind`)),b(),x(`on`,e.linkKind()===`jitsi`),w(`aria-checked`,e.linkKind()===`jitsi`),b(2),h(`size`,18),b(),C(``,e.t()(`reunions.form.link.jitsi`),` `),b(),x(`on`,e.linkKind()===`other`),w(`aria-checked`,e.linkKind()===`other`),b(2),h(`size`,18),b(),C(``,e.t()(`reunions.form.link.other`),` `),b(),_(e.linkKind()===`jitsi`?11:12)}}function ie(e,n){if(e&1){let e=u();a(0,`ui-check-list`,42),t(`valueChange`,function(t){g(e);let n=m(2);return o(n.orgIds.set(t))}),r()}if(e&2){let e=m(2);h(`label`,e.t()(`reunions.form.who.orgs`))(`options`,e.orgOptions())(`value`,e.orgIds())}}function ae(e,n){if(e&1){let e=u();a(0,`ui-check-list`,43),t(`valueChange`,function(t){g(e);let n=m(2);return o(n.staffIds.set(t))}),r()}if(e&2){let e=m(2);h(`label`,e.t()(`reunions.form.who.staff`))(`options`,e.staffOptions())(`value`,e.staffIds())}}function oe(e,n){if(e&1){let e=u();a(0,`li`,44),y(1),a(2,`button`,45),t(`click`,function(){let t=g(e).$index,n=m(3);return o(n.removeOther(t))}),f(3,`ui-icon`,46),r()()}if(e&2){let e=n.$implicit,t=m(3);b(),C(` `,e,` `),b(),w(`aria-label`,t.t()(`reunions.form.who.remove`,s(3,U,e))),b(),h(`size`,14)}}function se(t,n){if(t&1&&(a(0,`ul`,38),v(1,oe,4,5,`li`,44,T),r()),t&2){let t=m(2);b(),e(t.others())}}function ce(e,n){if(e&1){let e=u();a(0,`h3`,2),f(1,`ui-icon`,34),y(2),r(),a(3,`p`,35),y(4),r(),O(5,ie,1,3,`ui-check-list`,36),O(6,ae,1,3,`ui-check-list`,37),a(7,`p`,10),y(8),r(),O(9,se,3,0,`ul`,38),a(10,`div`,39)(11,`input`,40),t(`input`,function(t){g(e);let n=m();return o(n.otherDraft.set(t.target.value))})(`keydown.enter`,function(t){g(e);let n=m();return t.preventDefault(),o(n.addOther())}),r(),a(12,`button`,41),t(`click`,function(){g(e);let t=m();return o(t.addOther())}),f(13,`ui-icon`,17),y(14),r()()}if(e&2){let e=m();b(),h(`size`,18),b(),E(e.t()(`reunions.form.section.who`)),b(2),E(e.t()(`reunions.form.who.hint`)),b(),_(e.orgOptions().length?5:-1),b(),_(e.staffOptions().length?6:-1),b(2),E(e.t()(`reunions.form.who.others`)),b(),_(e.others().length?9:-1),b(2),h(`placeholder`,e.t()(`reunions.form.who.othersPh`))(`value`,e.otherDraft()),w(`aria-label`,e.t()(`reunions.form.who.others`)),b(2),h(`size`,18),b(),E(e.t()(`reunions.form.who.add`))}}function Z(e,n){if(e&1){let e=u();a(0,`li`,47)(1,`span`,48),y(2),r(),a(3,`input`,49),t(`input`,function(t){let n=g(e).$index,r=m(2);return o(r.setPoint(n,t.target.value))})(`keydown.enter`,function(t){let n=g(e).$index,r=m(2);return t.preventDefault(),o(r.addPoint(n+1))}),r(),a(4,`button`,50),t(`click`,function(){let t=g(e).$index,n=m(2);return o(n.removePoint(t))}),f(5,`ui-icon`,46),r()()}if(e&2){let e=n.$implicit,t=n.$index,r=m(2);b(2),E(t+1),b(),h(`placeholder`,r.t()(`ui.field.ph.agendaItem`))(`value`,e),w(`aria-label`,r.t()(`reunions.form.agendaPoint`,s(6,W,t+1))),b(),w(`aria-label`,r.t()(`reunions.form.agendaRemove`,s(8,W,t+1))),b(),h(`size`,18)}}function le(t,n){if(t&1&&(a(0,`ol`,14),v(1,Z,6,10,`li`,47,T),r()),t&2){let t=m();b(),e(t.agenda())}}function ue(e,t){if(e&1&&(a(0,`p`,15),y(1),r()),e&2){let e=m();b(),E(e.t()(`reunions.form.agendaEmpty`))}}var Q=e=>String(e).padStart(2,`0`);function $(e){let t=new Date(e);return`${t.getFullYear()}-${Q(t.getMonth()+1)}-${Q(t.getDate())}T${Q(t.getHours())}:${Q(t.getMinutes())}`}var de={"assemblée générale":`group`,"assemblée extraordinaire":`gavel`,bureau:`badge`,autre:`event`},fe={"sur place":`location_on`,"en ligne":`public`,mixte:`hub`},pe={"sur place":`reunions.form.mode.onsite`,"en ligne":`reunions.form.mode.online`,mixte:`reunions.form.mode.mixed`},me=class o{constructor(){this.locale=k(N),this.store=k(F),this.router=k(te),this.t=this.locale.t,this.kindLabel=V,this.kindIcon=de,this.meetingKinds=[...A],this.meetingModes=[...j],this.modeIcon=fe,this.modeLabel=pe,this.host=k(ee),this.open=ne(!1),this.meeting=S(void 0),this.defaultScoopId=S(void 0),this.defaultDate=S(void 0),this.notify=d(),this.closed=d(),this.scoops=n(()=>{let e=this.store.state().scoops,t=this.store.state().session;return e.filter(e=>P([{scoopId:e.id}],t).length===1)}),this.titleText=n(()=>this.meeting()?this.t()(`reunions.form.editTitle`):this.t()(`reunions.form.createTitle`)),this.descriptionText=n(()=>this.meeting()?this.t()(`reunions.form.editDescription`):this.t()(`reunions.form.createDescription`)),this.submitLabel=n(()=>this.meeting()?this.t()(`reunions.form.save`):this.t()(`reunions.form.create`)),this.scoopOptions=n(()=>this.scoops().map(e=>({value:e.id,label:e.name}))),this.scoopId=i(``),this.orgOptions=n(()=>this.store.state().orgs.filter(e=>e.scoopId===this.scoopId()).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name}))),this.staffOptions=n(()=>this.store.state().users.filter(e=>(e.scoopId===this.scoopId()||e.scoopIds?.includes(this.scoopId()))&&e.role!==`faitiere`&&e.role!==`admin`&&e.role!==`superadmin`).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,hint:this.store.roleLabel(e.role)}))),this.kind=i(`assemblée générale`),this.title=i(``),this.dateLocal=i(``),this.place=i(``),this.mode=i(`sur place`),this.linkKind=i(`jitsi`),this.jitsiUrl=i(``),this.onlineUrl=i(``),this.orgIds=i([]),this.staffIds=i([]),this.others=i([]),this.otherDraft=i(``),this.agenda=i([]),this.tried=i(!1),l(()=>{this.open()&&c(()=>this.resetForm())})}resetForm(){let e=this.meeting(),t=this.defaultScoopId(),n=this.scoops(),r=new Set(n.map(e=>e.id));if(this.tried.set(!1),e){this.scoopId.set(e.scoopId),this.kind.set(e.kind),this.title.set(e.title),this.dateLocal.set($(e.date)),this.place.set(e.place),this.mode.set(e.mode??`sur place`);let t=!e.onlineUrl||e.onlineUrl.startsWith(`https://meet.jit.si/`);this.linkKind.set(t?`jitsi`:`other`),this.jitsiUrl.set(t&&e.onlineUrl?e.onlineUrl:this.newJitsiUrl()),this.onlineUrl.set(t?``:e.onlineUrl??``),this.orgIds.set([...e.audience?.orgIds??[]]),this.staffIds.set([...e.audience?.staffIds??[]]),this.others.set([...e.audience?.others??[]]),this.otherDraft.set(``),this.agenda.set([...e.agenda]);return}this.scoopId.set((t&&r.has(t)?t:n[0]?.id)??``),this.kind.set(`assemblée générale`),this.title.set(``);let i=this.defaultDate();this.dateLocal.set(i?$(new Date(i.getFullYear(),i.getMonth(),i.getDate(),9,0).toISOString()):``),this.place.set(``),this.mode.set(`sur place`),this.linkKind.set(`jitsi`),this.jitsiUrl.set(this.newJitsiUrl()),this.onlineUrl.set(``),this.orgIds.set([]),this.staffIds.set([]),this.others.set([]),this.otherDraft.set(``),this.agenda.set([``])}errTitle(){return this.title().trim()?``:this.t()(`reunions.form.errorTitle`)}errDate(){return this.dateLocal()?``:this.t()(`reunions.form.errorDate`)}errPlace(){return this.mode()===`en ligne`||this.place().trim()?``:this.t()(`reunions.form.errorPlace`)}newJitsiUrl(){let e=new Uint32Array(12);return globalThis.crypto.getRandomValues(e),`https://meet.jit.si/mbay-diaay-${Array.from(e,e=>`abcdefghjkmnpqrstuvwxyz23456789`[e%31]).join(``)}`}chosenUrl(){return this.linkKind()===`jitsi`?this.jitsiUrl():this.onlineUrl().trim()}errLink(){if(this.mode()===`sur place`||this.linkKind()===`jitsi`)return``;try{return new URL(this.onlineUrl().trim()).protocol===`https:`?``:this.t()(`errors.meeting.link`)}catch{return this.t()(`errors.meeting.link`)}}addOther(){let e=this.otherDraft().trim();e&&(this.others.update(t=>t.includes(e)?t:[...t,e]),this.otherDraft.set(``))}removeOther(e){this.others.update(t=>t.filter((t,n)=>n!==e))}setPoint(e,t){this.agenda.update(n=>n.map((n,r)=>r===e?t:n))}addPoint(e){this.agenda.update(t=>[...t.slice(0,e),``,...t.slice(e)]),setTimeout(()=>{this.host.nativeElement.ownerDocument.querySelectorAll(`ui-modal .agenda-input`)[e]?.focus()})}removePoint(e){this.agenda.update(t=>t.filter((t,n)=>n!==e))}close(){this.open.set(!1),this.closed.emit()}submit(){if(this.tried.set(!0),this.errTitle()||this.errDate()||this.errPlace()||this.errLink())return;this.addOther();let e=this.agenda().map(e=>e.trim()).filter(Boolean),t=this.meeting();try{if(t){let n=this.store.actions.updateMeeting(t.id,{kind:this.kind(),title:this.title(),date:this.dateLocal(),place:this.place(),agenda:e,mode:this.mode(),onlineUrl:this.chosenUrl(),audience:{orgIds:this.orgIds(),staffIds:this.staffIds(),others:this.others()}});if(!n.ok){this.pushError(n.error);return}this.notify.emit({kind:`success`,text:this.t()(`reunions.form.saved`)}),this.open.set(!1),this.closed.emit();return}let n=this.store.actions.createMeeting({scoopId:this.scoopId(),kind:this.kind(),title:this.title(),date:this.dateLocal(),place:this.place(),agenda:e,mode:this.mode(),onlineUrl:this.chosenUrl(),audience:{orgIds:this.orgIds(),staffIds:this.staffIds(),others:this.others()}});if(!n.ok){this.pushError(n.error);return}this.notify.emit({kind:`success`,text:this.t()(`reunions.form.created`)}),this.open.set(!1),this.closed.emit(),this.router.navigate([`/dashboard/reunions`,n.id])}catch(e){this.notify.emit({kind:`error`,text:this.exceptionText(e)})}}pushError(e){this.notify.emit({kind:`error`,text:this.locale.tNow(e)})}exceptionText(e){return e instanceof M?this.locale.tNow(e.key):e instanceof Error?e.message:String(e)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=p({type:o,selectors:[[`app-meeting-form-dialog`]],inputs:{open:[1,`open`],meeting:[1,`meeting`],defaultScoopId:[1,`defaultScoopId`],defaultDate:[1,`defaultDate`]},outputs:{open:`openChange`,notify:`notify`,closed:`closed`},decls:38,vars:31,consts:[[`icon`,`calendar_month`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`pb-6`],[1,`sec`],[`name`,`event`,3,`size`],[1,`lbl`],[`role`,`radiogroup`,1,`kinds`,`mt-2`],[`type`,`button`,`role`,`radio`,1,`kind`,3,`on`],[`preset`,`meetingTitle`,1,`mt-5`,3,`valueChange`,`label`,`value`,`error`],[`name`,`location_on`,3,`size`],[`type`,`datetime-local`,`icon`,`calendar_today`,3,`valueChange`,`label`,`value`,`error`],[1,`lbl`,`mt-5`],[`role`,`radiogroup`,1,`kinds`,`modes`,`mt-2`],[`preset`,`place`,1,`mt-5`,3,`label`,`value`,`error`],[`name`,`fact_check`,3,`size`],[1,`points`],[1,`rounded-[16px]`,`px-4`,`py-3`,`text-[13px]`,`font-medium`,2,`background`,`var(--v2-creme)`,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`add`,3,`click`],[`name`,`add`,3,`size`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`chip`],[`name`,`check`,3,`size`],[`leadingIcon`,`apartment`,1,`mb-5`,`mt-2`,`block`,3,`valueChange`,`label`,`options`,`value`],[`type`,`button`,`role`,`radio`,1,`kind`,3,`click`],[1,`ico`],[3,`name`,`size`],[`preset`,`place`,1,`mt-5`,3,`valueChange`,`label`,`value`,`error`],[`name`,`public`,3,`size`],[`name`,`link`,3,`size`],[`type`,`text`,`icon`,`link`,`placeholder`,`https://…`,1,`mt-4`,3,`label`,`value`,`error`],[1,`mt-3`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`break-all`,`rounded-[14px]`,`px-4`,`py-3`,`text-[14px]`,`font-bold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`refresh`,3,`size`],[`type`,`text`,`icon`,`link`,`placeholder`,`https://…`,1,`mt-4`,3,`valueChange`,`label`,`value`,`error`],[`name`,`group`,3,`size`],[1,`mb-3`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[3,`label`,`options`,`value`],[1,`mt-5`,`block`,3,`label`,`options`,`value`],[1,`mt-2`,`flex`,`flex-wrap`,`gap-2`],[1,`mt-2`,`flex`,`gap-2`],[`maxlength`,`80`,1,`agenda-input`,3,`input`,`keydown.enter`,`placeholder`,`value`],[`type`,`button`,1,`add`,2,`margin-top`,`0`,3,`click`],[3,`valueChange`,`label`,`options`,`value`],[1,`mt-5`,`block`,3,`valueChange`,`label`,`options`,`value`],[1,`inline-flex`,`items-center`,`gap-1.5`,`rounded-full`,`px-3`,`py-1.5`,`text-[13px]`,`font-bold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`type`,`button`,3,`click`],[`name`,`close`,3,`size`],[1,`point`],[`aria-hidden`,`true`,1,`num`],[`maxlength`,`160`,1,`agenda-input`,3,`input`,`keydown.enter`,`placeholder`,`value`],[`type`,`button`,1,`rm`,3,`click`]],template:function(n,i){n&1&&(a(0,`ui-modal`,0),t(`closed`,function(){return i.close()}),a(1,`div`,1)(2,`h3`,2),f(3,`ui-icon`,3),y(4),r(),O(5,re,3,4),a(6,`p`,4),y(7),r(),a(8,`div`,5),v(9,G,4,6,`button`,6,D),r(),a(11,`ui-text-field`,7),t(`valueChange`,function(e){return i.title.set(e)}),r(),a(12,`h3`,2),f(13,`ui-icon`,8),y(14),r(),a(15,`ui-text-field`,9),t(`valueChange`,function(e){return i.dateLocal.set(e)}),r(),a(16,`p`,10),y(17),r(),a(18,`div`,11),v(19,K,4,6,`button`,6,D),r(),O(21,q,1,3,`ui-text-field`,12),O(22,X,13,13),O(23,ce,15,12),a(24,`h3`,2),f(25,`ui-icon`,13),y(26),r(),O(27,le,3,0,`ol`,14)(28,ue,2,1,`p`,15),a(29,`button`,16),t(`click`,function(){return i.addPoint(i.agenda().length)}),f(30,`ui-icon`,17),y(31),r()(),a(32,`button`,18),t(`click`,function(){return i.close()}),y(33),r(),a(34,`button`,19),t(`click`,function(){return i.submit()}),y(35),a(36,`span`,20),f(37,`ui-icon`,21),r()()()),n&2&&(h(`open`,i.open())(`title`,i.titleText())(`description`,i.descriptionText())(`width`,720)(`closeLabel`,i.t()(`common.close`)),b(3),h(`size`,18),b(),E(i.t()(`reunions.form.section.what`)),b(),_(!i.meeting()&&i.scoops().length>1?5:-1),b(2),E(i.t()(`reunions.form.kind`)),b(),w(`aria-label`,i.t()(`reunions.form.kind`)),b(),e(i.meetingKinds),b(2),h(`label`,i.t()(`reunions.form.title`))(`value`,i.title())(`error`,i.tried()?i.errTitle():``),b(2),h(`size`,18),b(),E(i.t()(`reunions.form.section.when`)),b(),h(`label`,i.t()(`reunions.form.date`))(`value`,i.dateLocal())(`error`,i.tried()?i.errDate():``),b(2),E(i.t()(`reunions.form.mode`)),b(),w(`aria-label`,i.t()(`reunions.form.mode`)),b(),e(i.meetingModes),b(2),_(i.mode()===`en ligne`?-1:21),b(),_(i.mode()===`sur place`?-1:22),b(),_(23),b(2),h(`size`,18),b(),E(i.t()(`reunions.form.section.agenda`)),b(),_(i.agenda().length?27:28),b(3),h(`size`,18),b(),C(``,i.t()(`reunions.form.agendaAdd`),` `),b(2),E(i.t()(`producteurs.index.cancel`)),b(2),C(` `,i.submitLabel(),` `),b(2),h(`size`,18))},dependencies:[I,B,L,R,z],styles:[`.modes[_ngcontent-%COMP%] {
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)) !important;
    }
    .sec[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 24px 0 12px;
      font-size: 14px;
      font-weight: 800;
      color: var(--%NS%v2-foret);
    }
    .sec[_ngcontent-%COMP%]:first-child {
      margin-top: 4px;
    }
    .lbl[_ngcontent-%COMP%] {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--%NS%v2-ardoise);
    }
    .kinds[_ngcontent-%COMP%] {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }
    @media (min-width: 640px) {
      .kinds[_ngcontent-%COMP%] {
        grid-template-columns: repeat(4, minmax(0, 1fr));
      }
    }
    .kind[_ngcontent-%COMP%] {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      border-radius: 16px;
      border: 1.5px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      padding: 12px;
      text-align: left;
      font-size: 13px;
      font-weight: 700;
      line-height: 1.25;
      color: var(--%NS%v2-encre);
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .kind[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .kind.on[_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-foret);
      background: var(--%NS%v2-sauge);
      padding: 11.5px;
    }
    .kind[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .kind[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {
      display: grid;
      height: 32px;
      width: 32px;
      place-items: center;
      border-radius: 10px;
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-foret);
    }
    .kind.on[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .points[_ngcontent-%COMP%] {
      display: grid;
      gap: 8px;
    }
    .point[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .num[_ngcontent-%COMP%] {
      display: grid;
      height: 32px;
      width: 32px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 999px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
      font-size: 12px;
      font-weight: 800;
    }
    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
      height: 48px;
      min-width: 0;
      flex: 1;
      border-radius: 14px;
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      padding: 0 14px;
      font-size: 15px;
      font-weight: 600;
      color: var(--%NS%v2-encre);
    }
    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]::placeholder {
      color: var(--%NS%v2-gris-texte);
      font-weight: 500;
    }
    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .point[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]:focus-visible {
      outline: none;
      border: 2px solid var(--%NS%v2-foret);
      box-shadow: var(--%NS%v2-halo);
    }
    .rm[_ngcontent-%COMP%] {
      display: grid;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      color: var(--%NS%v2-ardoise);
      cursor: pointer;
    }
    .rm[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-erreur-bg);
      color: var(--%NS%v2-erreur-fg);
    }
    .rm[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
    }
    .add[_ngcontent-%COMP%] {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      border-radius: 12px;
      padding: 8px 12px;
      font-size: 14px;
      font-weight: 800;
      color: var(--%NS%v2-foret);
      cursor: pointer;
    }
    .add[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-sauge);
    }
    .add[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
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
      cursor: pointer;
    }
    .btn-primary[_ngcontent-%COMP%] {
      padding: 0 6px 0 18px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .btn-primary[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    .btn-ghost[_ngcontent-%COMP%] {
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-encre);
    }
    .btn-ghost[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .chip[_ngcontent-%COMP%] {
      display: grid;
      height: 36px;
      width: 36px;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }`]})}};export{V as n,H as r,me as t};