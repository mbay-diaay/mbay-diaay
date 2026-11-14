import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,bn as h,en as g,fn as _,ft as v,gn as y,gt as b,hn as ee,ln as x,mn as S,mt as C,pn as w,qt as te,vn as T,vt as E,yn as D,zn as O}from"./_router-chunk-H0-n0SZI.js";import{W as k,t as A,xt as j}from"./locale.service-Bf8_ncMo.js";import{l as M,n as N}from"./snackbar.component-ICe8-MWg.js";import{t as P}from"./app-shell.component-CR4uAChA.js";import{t as F}from"./pager-DPeF-1nO.js";import{t as I}from"./store.service-ZF4OfoGo.js";import{t as L}from"./v2-page.styles-Blvl6ZBZ.js";import{n as R,t as z}from"./technician-dialog.component-Cy8Hz7s1.js";import{O as B,T as V,a as H,n as U,o as W,t as G}from"./ui-CQhTckzj.js";var ne=(e,t)=>({shown:e,total:t}),K=e=>({name:e}),q=e=>({count:e}),J=(e,t)=>t.id,Y=(e,t)=>t.user.id;function X(e,n){if(e&1){let e=c();a(0,`button`,27),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.stateFilter.set(t.id))}),_(1),a(2,`span`,28),_(3),r()()}if(e&2){let e=n.$implicit,t=d();b(`on`,t.stateFilter()===e.id),C(`aria-checked`,t.stateFilter()===e.id),v(),S(` `,t.t()(e.label)),v(),b(`zero`,!e.count),v(),w(e.count)}}function Z(e,n){if(e&1){let e=c();a(0,`ui-select`,29),t(`valueChange`,function(t){p(e);let n=d();return o(n.scoopFilter.set(t))}),r()}if(e&2){let e=d();f(`label`,e.t()(`techniciens.filter.scoop`))(`options`,e.scoopFilterOptions())(`value`,e.scoopFilter())}}function re(e,n){if(e&1){let e=c();a(0,`ui-select`,30),t(`valueChange`,function(t){p(e);let n=d();return o(n.orgFilter.set(t))}),r()}if(e&2){let e=d();f(`label`,e.t()(`techniciens.filter.org`))(`options`,e.orgFilterOptions())(`value`,e.orgFilter())}}function ie(e,t){if(e&1&&(a(0,`span`,40),_(1),r()),e&2){let e=d().$implicit,t=d(2);v(),y(``,e.user.sex===`F`?t.t()(`adherents.add.female`):e.user.sex===`H`?t.t()(`adherents.add.male`):``,``,e.user.sex&&e.user.age?` · `:``,``,e.user.age?t.t()(`tech.ageYears`,s(3,q,e.user.age)):``)}}function ae(e,n){if(e&1){let e=c();a(0,`tr`,36),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.viewing.set(t.user))}),a(1,`td`)(2,`span`,37)(3,`span`,38),_(4),r(),a(5,`span`,2)(6,`span`,39),_(7),r(),a(8,`span`,40),_(9),r(),E(10,ie,2,5,`span`,40),r()()(),a(11,`td`,41),_(12),r(),a(13,`td`,42),_(14),r(),a(15,`td`)(16,`span`,43),_(17),r()(),a(18,`td`,44),t(`click`,function(e){return e.stopPropagation()}),a(19,`span`,45)(20,`button`,46),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.viewing.set(t.user))}),l(21,`ui-icon`,47),r(),a(22,`button`,46),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.askNewCode(t.user))}),l(23,`ui-icon`,48),r(),a(24,`button`,46),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.openEdit(t.user))}),l(25,`ui-icon`,49),r(),a(26,`button`,50),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.removing.set(t.user))}),l(27,`ui-icon`,51),r()()()()}if(e&2){let e=n.$implicit,t=d(2);v(4),w(e.initials),v(3),w(e.user.name),v(2),ee(``,t.store.phone(e.user.phone),``,e.user.email?` · `+e.user.email:``),v(),m(e.user.sex||e.user.age?10:-1),v(2),w(e.scoopNames.join(`, `)),v(),b(`zero`,!e.orgNames.length),v(),w(e.orgNames.length?e.orgNames.join(`, `):t.t()(`techniciens.orgs.all`)),v(2),x(`background`,e.state===`active`?`var(--v2-culture-bg)`:e.state===`invited`?`var(--v2-attente-bg)`:`var(--v2-lin)`)(`color`,e.state===`active`?`var(--v2-culture-fg)`:e.state===`invited`?`var(--v2-attente-fg)`:`var(--v2-gris-texte)`),v(),S(` `,t.t()(t.stateLabel[e.state]),` `),v(3),f(`title`,t.t()(`common.view`)),C(`aria-label`,t.t()(`techniciens.view.aria`,s(26,K,e.user.name))),v(),f(`size`,18),v(),f(`title`,t.t()(`techniciens.newCode`)),C(`aria-label`,t.t()(`techniciens.newCode.aria`,s(28,K,e.user.name))),v(),f(`size`,18),v(),f(`title`,t.t()(`techniciens.edit`)),C(`aria-label`,t.t()(`techniciens.edit.aria`,s(30,K,e.user.name))),v(),f(`size`,18),v(),f(`title`,t.t()(`techniciens.remove.confirm`)),C(`aria-label`,t.t()(`techniciens.remove.aria`,s(32,K,e.user.name))),v(),f(`size`,18)}}function oe(t,n){if(t&1&&(a(0,`div`,31)(1,`table`,32)(2,`thead`)(3,`tr`)(4,`th`),_(5),r(),a(6,`th`),_(7),r(),a(8,`th`),_(9),r(),a(10,`th`),_(11),r(),a(12,`th`,33),_(13),r()()(),a(14,`tbody`),g(15,ae,28,34,`tr`,34,Y),r()()(),l(17,`ui-pagination`,35)),t&2){let t=d();v(5),w(t.t()(`techniciens.col.name`)),v(2),w(t.t()(`techniciens.col.scoops`)),v(2),w(t.t()(`techniciens.col.orgs`)),v(2),w(t.t()(`techniciens.col.state`)),v(2),w(t.t()(`techniciens.col.actions`)),v(2),e(t.pager.items()),v(2),f(`pager`,t.pager)}}function se(e,t){if(e&1&&(a(0,`div`,20)(1,`span`,52),l(2,`ui-icon`,53),r(),a(3,`p`,54),_(4),r(),a(5,`p`,55),_(6),r()()),e&2){let e=d();v(2),f(`size`,26),v(2),w(e.t()(`techniciens.empty.title`)),v(2),w(e.rows().length?e.t()(`techniciens.empty.filtered`):e.t()(`techniciens.empty.none`))}}function Q(e,n){if(e&1){let e=c();a(0,`ui-modal`,56),t(`closed`,function(){p(e);let t=d();return o(t.viewing.set(null))}),a(1,`dl`,57)(2,`div`)(3,`dt`),_(4),r(),a(5,`dd`),_(6),r()(),a(7,`div`)(8,`dt`),_(9),r(),a(10,`dd`),_(11),r()(),a(12,`div`)(13,`dt`),_(14),r(),a(15,`dd`),_(16),r()(),a(17,`div`)(18,`dt`),_(19),r(),a(20,`dd`),_(21),r()(),a(22,`div`,58)(23,`dt`),_(24),r(),a(25,`dd`),_(26),r()(),a(27,`div`,58)(28,`dt`),_(29),r(),a(30,`dd`),_(31),r()()(),a(32,`button`,59),t(`click`,function(){p(e);let t=d();return o(t.viewing.set(null))}),_(33),r(),a(34,`button`,59),t(`click`,function(){let t=p(e),n=d();return o(n.askNewCode(t.user))}),l(35,`ui-icon`,48),_(36),r(),a(37,`button`,60),t(`click`,function(){let t=p(e),n=d();return o(n.openEdit(t.user))}),_(38),a(39,`span`,7),l(40,`ui-icon`,49),r()()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,e.user.name)(`description`,t.t()(t.stateLabel[e.state]))(`width`,640)(`closeLabel`,t.t()(`common.close`)),v(4),w(t.t()(`tech.dialog.phone`)),v(2),w(e.user.phone?t.store.phone(e.user.phone):`—`),v(3),w(t.t()(`tech.dialog.email`)),v(2),w(e.user.email||t.t()(`techniciens.noEmail`)),v(3),w(t.t()(`adherents.add.sex`)),v(2),w(e.user.sex===`F`?t.t()(`adherents.add.female`):e.user.sex===`H`?t.t()(`adherents.add.male`):`—`),v(3),w(t.t()(`adherents.add.age`)),v(2),w(e.user.age?t.t()(`tech.ageYears`,s(22,q,e.user.age)):`—`),v(3),w(t.t()(`techniciens.col.scoops`)),v(2),w(e.scoopNames.join(`, `)),v(3),w(t.t()(`techniciens.col.orgs`)),v(2),w(e.orgNames.length?e.orgNames.join(`, `):t.t()(`techniciens.orgs.all`)),v(2),w(t.t()(`common.close`)),v(2),f(`size`,18),v(),S(``,t.t()(`techniciens.newCode`),` `),v(2),S(` `,t.t()(`techniciens.edit`)),v(2),f(`size`,18)}}function ce(e,n){if(e&1){let e=c();a(0,`ui-check-list`,69),t(`valueChange`,function(t){p(e);let n=d(2);return o(n.editOrgIds.set(t))}),r(),a(1,`p`,70),_(2),r()}if(e&2){let e=d(2);f(`label`,e.t()(`tech.dialog.section.orgs`))(`options`,e.editOrgOptions())(`value`,e.editOrgIds()),v(2),w(e.t()(`tech.dialog.orgsHint`))}}function le(e,n){if(e&1){let e=c();a(0,`ui-modal`,61),t(`closed`,function(){p(e);let t=d();return o(t.editing.set(null))}),a(1,`div`,62)(2,`ui-text-field`,63),t(`valueChange`,function(t){p(e);let n=d();return n.editName.set(t),o(n.editError.set(``))}),r(),a(3,`ui-text-field`,64),t(`valueChange`,function(t){p(e);let n=d();return o(n.editPhone.set(t))}),r(),a(4,`ui-text-field`,65),t(`valueChange`,function(t){p(e);let n=d();return o(n.editAge.set(t))}),r(),a(5,`div`)(6,`p`,66),_(7),r(),a(8,`div`,67)(9,`button`,27),t(`click`,function(){p(e);let t=d();return o(t.editSex.set(`F`))}),_(10),r(),a(11,`button`,27),t(`click`,function(){p(e);let t=d();return o(t.editSex.set(`H`))}),_(12),r()()(),E(13,ce,3,4),r(),a(14,`button`,59),t(`click`,function(){p(e);let t=d();return o(t.editing.set(null))}),_(15),r(),a(16,`button`,60),t(`click`,function(){let t=p(e),n=d();return o(n.saveEdit(t))}),_(17),a(18,`span`,7),l(19,`ui-icon`,68),r()()()}if(e&2){let e=d();f(`open`,!0)(`title`,e.t()(`techniciens.edit.title`,s(27,K,n.name)))(`description`,e.t()(`techniciens.edit.description`))(`width`,640)(`closeLabel`,e.t()(`common.close`)),v(2),f(`label`,e.t()(`techniciens.edit.name`))(`value`,e.editName())(`error`,e.editError()),v(),f(`label`,e.t()(`tech.dialog.phone`))(`value`,e.editPhone()),v(),f(`label`,e.t()(`adherents.add.age`))(`hint`,e.t()(`tech.dialog.ageHint`))(`value`,e.editAge()),v(3),w(e.t()(`adherents.add.sex`)),v(),C(`aria-label`,e.t()(`adherents.add.sex`)),v(),b(`on`,e.editSex()===`F`),C(`aria-checked`,e.editSex()===`F`),v(),w(e.t()(`adherents.add.female`)),v(),b(`on`,e.editSex()===`H`),C(`aria-checked`,e.editSex()===`H`),v(),w(e.t()(`adherents.add.male`)),v(),m(e.editOrgOptions().length?13:-1),v(2),w(e.t()(`common.cancel`)),v(2),S(` `,e.t()(`techniciens.edit.save`)),v(2),f(`size`,18)}}function ue(e,n){if(e&1){let e=c();a(0,`ui-modal`,71),t(`closed`,function(){p(e);let t=d();return o(t.renewing.set(null))}),a(1,`button`,59),t(`click`,function(){p(e);let t=d();return o(t.renewing.set(null))}),_(2),r(),a(3,`button`,72),t(`click`,function(){let t=p(e),n=d();return o(n.newCode(t))}),_(4),r()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`techniciens.renew.title`,s(7,K,e.name)))(`description`,t.t()(`techniciens.renew.text`,s(9,K,e.name)))(`width`,560)(`closeLabel`,t.t()(`common.close`)),v(2),w(t.t()(`common.cancel`)),v(2),w(t.t()(`techniciens.renew.confirm`))}}function de(e,n){if(e&1){let e=c();a(0,`ui-modal`,73),t(`closed`,function(){p(e);let t=d();return o(t.removing.set(null))}),a(1,`button`,59),t(`click`,function(){p(e);let t=d();return o(t.removing.set(null))}),_(2),r(),a(3,`button`,72),t(`click`,function(){let t=p(e),n=d();return o(n.confirmRemove(t))}),_(4),r()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`techniciens.remove.title`,s(7,K,e.name)))(`description`,t.t()(t.isOnlyHere(e)?`techniciens.remove.textAlone`:`techniciens.remove.textShared`,s(9,K,e.name)))(`width`,540)(`closeLabel`,t.t()(`common.close`)),v(2),w(t.t()(`common.cancel`)),v(2),w(t.t()(`techniciens.remove.confirm`))}}var $=`__coop__`,fe=class o{constructor(){this.store=O(I),this.locale=O(A),this.t=this.locale.t,this.snackbar=O(N),this.stateLabel={active:`techniciens.state.active`,invited:`techniciens.state.invited`,closed:`techniciens.state.closed`},this.query=i(``),this.stateFilter=i(`all`),this.scoopFilter=i(`all`),this.orgFilter=i(`all`),this.addOpen=i(!1),this.viewing=i(null),this.renewing=i(null),this.codeView=i(null),this.editing=i(null),this.removing=i(null),this.editName=i(``),this.editPhone=i(``),this.editAge=i(``),this.editSex=i(``),this.editOrgIds=i([]),this.editError=i(``),this.visibleScoopIds=n(()=>{let e=this.store.state();return j(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session).map(e=>e.id)}),this.defaultScoopId=n(()=>this.visibleScoopIds().length===1?this.visibleScoopIds()[0]:null),this.rows=n(()=>{let e=this.store.state(),t=new Set(this.visibleScoopIds());return e.users.filter(e=>e.role===`technicien`&&this.scoopIdsOf(e).some(e=>t.has(e))).sort((e,t)=>e.name.localeCompare(t.name)).map(n=>({user:n,initials:n.name.split(` `).map(e=>e[0]??``).join(``).slice(0,2).toUpperCase(),scoopIds:this.scoopIdsOf(n).filter(e=>t.has(e)),orgIds:(n.orgIds??[]).filter(n=>{let r=e.orgs.find(e=>e.id===n);return!!r&&t.has(r.scoopId)}),scoopNames:this.scoopIdsOf(n).filter(e=>t.has(e)).map(t=>e.scoops.find(e=>e.id===t)?.name??t),orgNames:(n.orgIds??[]).map(t=>e.orgs.find(e=>e.id===t)).filter(e=>!!e&&t.has(e.scoopId)).map(e=>e.name),state:n.activation?`invited`:n.active?`active`:`closed`}))}),this.shown=n(()=>{let e=this.query().trim().toLowerCase();return this.rows().filter(t=>(this.stateFilter()===`all`||t.state===this.stateFilter())&&(this.scoopFilter()===`all`||t.scoopIds.includes(this.scoopFilter()))&&(this.orgFilter()===`all`||(this.orgFilter()===$?!t.orgIds.length:t.orgIds.includes(this.orgFilter())))&&(!e||[t.user.name,t.user.email,t.user.phone,...t.scoopNames,...t.orgNames].some(t=>t.toLowerCase().includes(e))))}),this.stateFilters=n(()=>{let e=this.rows(),t=t=>e.filter(e=>e.state===t).length;return[{id:`all`,label:`techniciens.filter.all`,count:e.length},{id:`active`,label:`techniciens.state.active`,count:t(`active`)},{id:`invited`,label:`techniciens.state.invited`,count:t(`invited`)},{id:`closed`,label:`techniciens.state.closed`,count:t(`closed`)}]}),this.scoopFilterOptions=n(()=>{let e=this.rows(),t=this.store.state(),n=[...new Set(e.flatMap(e=>e.scoopIds))];return[{value:`all`,label:this.t()(`techniciens.filter.allScoops`),hint:k.format(e.length)},...n.map(n=>({value:n,label:t.scoops.find(e=>e.id===n)?.name??n,hint:k.format(e.filter(e=>e.scoopIds.includes(n)).length)})).sort((e,t)=>e.label.localeCompare(t.label))]}),this.orgFilterOptions=n(()=>{let e=this.rows(),t=this.store.state(),n=[...new Set(e.flatMap(e=>e.orgIds))];return[{value:`all`,label:this.t()(`techniciens.filter.allOrgs`),hint:k.format(e.length)},{value:$,label:this.t()(`techniciens.orgs.all`),hint:k.format(e.filter(e=>!e.orgIds.length).length)},...n.map(n=>({value:n,label:t.orgs.find(e=>e.id===n)?.name??n,hint:k.format(e.filter(e=>e.orgIds.includes(n)).length)})).sort((e,t)=>e.label.localeCompare(t.label))]}),this.stats=n(()=>{let e=this.t(),t=this.rows(),n=e=>t.filter(t=>t.state===e).length,r=new Set(t.flatMap(e=>e.scoopIds)).size,i=t.filter(e=>e.user.sex===`F`).length;return[{label:e(`techniciens.stat.total`),value:k.format(t.length),sub:e(`techniciens.stat.totalSub`,{scoops:k.format(r)}),icon:`badge`,bg:``,fg:``},{label:e(`techniciens.stat.active`),value:k.format(n(`active`)),sub:e(`techniciens.stat.activeSub`),icon:`how_to_reg`,...L.succes},{label:e(`techniciens.stat.invited`),value:k.format(n(`invited`)),sub:e(`techniciens.stat.invitedSub`),icon:`lock`,...L.info},{label:e(`techniciens.stat.closed`),value:k.format(n(`closed`)),sub:e(`techniciens.stat.closedSub`,{women:k.format(i)}),icon:`block`,...L.attente}]}),this.pager=F(()=>this.shown()),this.editOrgOptions=n(()=>{let e=this.editing();if(!e)return[];let t=this.store.state(),n=new Set(this.visibleScoopIds()),r=this.scoopIdsOf(e).filter(e=>n.has(e));return t.orgs.filter(e=>r.includes(e.scoopId)).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,...r.length>1?{hint:t.scoops.find(t=>t.id===e.scoopId)?.name??``}:{}}))}),this.viewedRow=n(()=>{let e=this.viewing();return e?this.rows().find(t=>t.user.id===e.id)??null:null})}scoopIdsOf(e){return e.scoopIds??(e.scoopId?[e.scoopId]:[])}askNewCode(e){this.viewing.set(null),e.active?this.renewing.set(e):this.newCode(e)}newCode(e){this.viewing.set(null),this.renewing.set(null);let t=this.store.actions.regenerateTechnicianCode(e.id);t.ok?this.codeView.set({userId:e.id,name:e.name,code:t.code,expiresAt:t.expiresAt,email:e.email}):this.snackbar.error(t.error)}openEdit(e){this.viewing.set(null),this.editName.set(e.name),this.editPhone.set(e.phone),this.editAge.set(e.age?String(e.age):``),this.editSex.set(e.sex??``),this.editOrgIds.set([...e.orgIds??[]]),this.editError.set(``),this.editing.set(e)}saveEdit(e){if(!this.editSex()){this.snackbar.error(this.locale.tNow(`errors.technician.sex`));return}let t=this.store.actions.updateTechnician(e.id,{name:this.editName(),phone:this.editPhone(),sex:this.editSex()||`F`,age:Number(this.editAge().trim()),orgIds:this.editOrgIds()});t.ok?(this.editing.set(null),this.snackbar.success(this.t()(`techniciens.edit.saved`,{name:this.editName().trim()}))):t.error===this.locale.tNow(`errors.technician.name`)?this.editError.set(t.error):this.snackbar.error(t.error)}scoopToLeave(e){let t=new Set(this.visibleScoopIds());return this.scoopIdsOf(e).find(e=>t.has(e))??null}isOnlyHere(e){return this.scoopIdsOf(e).length<=1}confirmRemove(e){let t=this.scoopToLeave(e);if(!t)return;let n=this.store.actions.removeTechnicianFromScoop(e.id,t);this.removing.set(null),n.ok?this.snackbar.success(this.t()(`techniciens.removed`,{name:e.name})):this.snackbar.error(this.locale.tNow(n.error))}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-techniciens-page`]],decls:34,vars:26,consts:[[`perm`,`technician.invite`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`person_add`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`leadingIcon`,`apartment`,1,`min-w-[220px]`,3,`label`,`options`,`value`],[`leadingIcon`,`hub`,1,`min-w-[220px]`,3,`label`,`options`,`value`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[3,`openChange`,`open`,`scoopId`],[3,`viewChange`,`view`],[`icon`,`person`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`edit`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`tone`,`danger`,`icon`,`lock`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`tone`,`danger`,`icon`,`delete_forever`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`n`],[`leadingIcon`,`apartment`,1,`min-w-[220px]`,3,`valueChange`,`label`,`options`,`value`],[`leadingIcon`,`hub`,1,`min-w-[220px]`,3,`valueChange`,`label`,`options`,`value`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[900px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`max-w-56`,`font-medium`],[1,`max-w-64`,`font-medium`],[1,`badge`],[3,`click`],[1,`flex`,`justify-end`,`gap-2`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[`name`,`lock`,3,`size`],[`name`,`edit`,3,`size`],[`type`,`button`,1,`act`,`act-danger`,3,`click`,`title`],[`name`,`delete_forever`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`agriculture`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[`icon`,`person`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`facts`,`pb-6`],[1,`wide`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`icon`,`edit`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`space-y-5`,`pb-6`],[3,`valueChange`,`label`,`value`,`error`],[`preset`,`phone`,3,`valueChange`,`label`,`value`],[`preset`,`age`,3,`valueChange`,`label`,`hint`,`value`],[1,`lbl`],[`role`,`radiogroup`,1,`seg`,`mt-2`],[`name`,`check`,3,`size`],[3,`valueChange`,`label`,`options`,`value`],[1,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`tone`,`danger`,`icon`,`lock`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-danger`,3,`click`],[`tone`,`danger`,`icon`,`delete_forever`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),_(4),r(),a(5,`h1`,4),_(6),r(),a(7,`p`,5),_(8),r()(),a(9,`button`,6),t(`click`,function(){return i.addOpen.set(!0)}),_(10),a(11,`span`,7),l(12,`ui-icon`,8),r()()(),l(13,`ui-stat-cards`,9),a(14,`div`,10)(15,`label`,11),l(16,`ui-icon`,12),a(17,`input`,13),t(`input`,function(e){return i.query.set(e.target.value)}),r()(),a(18,`div`,14),g(19,X,4,7,`button`,15,J),r(),E(21,Z,1,3,`ui-select`,16),E(22,re,1,3,`ui-select`,17),r(),a(23,`p`,18),_(24),r(),a(25,`section`,19),E(26,oe,18,6)(27,se,7,3,`div`,20),r(),a(28,`app-technician-dialog`,21),D(`openChange`,function(e){return T(i.addOpen,e)||(i.addOpen=e),e}),r(),a(29,`app-technician-code-dialog`,22),D(`viewChange`,function(e){return T(i.codeView,e)||(i.codeView=e),e}),r(),E(30,Q,41,24,`ui-modal`,23),E(31,le,20,29,`ui-modal`,24),E(32,ue,5,11,`ui-modal`,25),E(33,de,5,11,`ui-modal`,26),r()),n&2){let t,n,r,a;f(`area`,i.t()(`techniciens.area`)),v(4),w(i.t()(`techniciens.eyebrow`)),v(2),w(i.t()(`techniciens.title`)),v(2),w(i.t()(`techniciens.description`)),v(2),S(` `,i.t()(`techniciens.add`)),v(2),f(`size`,20),v(),f(`stats`,i.stats()),v(3),f(`size`,20),v(),f(`placeholder`,i.t()(`techniciens.search.placeholder`))(`value`,i.query()),C(`aria-label`,i.t()(`techniciens.search.aria`)),v(),C(`aria-label`,i.t()(`techniciens.col.state`)),v(),e(i.stateFilters()),v(2),m(i.scoopFilterOptions().length>2?21:-1),v(),m(i.orgFilterOptions().length>2?22:-1),v(2),w(i.t()(`techniciens.count`,te(23,ne,i.shown().length,i.rows().length))),v(2),m(i.shown().length?26:27),v(2),h(`open`,i.addOpen),f(`scoopId`,i.defaultScoopId()),v(),h(`view`,i.codeView),v(),m((t=i.viewedRow())?30:-1,t),v(),m((n=i.editing())?31:-1,n),v(),m((r=i.renewing())?32:-1,r),v(),m((a=i.removing())?33:-1,a)}},dependencies:[P,B,M,V,H,W,U,R,z,G],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.facts[_ngcontent-%COMP%] {
        display: grid;
        gap: 14px 20px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      }
      .facts[_ngcontent-%COMP%]   .wide[_ngcontent-%COMP%] {
        grid-column: 1 / -1;
      }
      .facts[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--%NS%v2-gris-texte);
      }
      .facts[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
        margin-top: 2px;
        font-size: 15px;
        font-weight: 700;
        word-break: break-word;
      }`]})}};export{fe as default};