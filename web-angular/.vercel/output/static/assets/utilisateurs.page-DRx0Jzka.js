import{$t as e,Bt as t,F as n,Ft as r,Gt as i,Hn as a,It as o,Jn as s,Kt as c,Ln as ee,Lt as l,Nt as u,St as te,Vt as d,Wt as f,Yn as p,_t as m,a as ne,bn as h,en as re,fn as g,ft as _,gt as v,ln as y,mn as b,mt as x,pn as S,qt as C,rr as w,t as T,vn as E,vt as D,yn as O,zn as k}from"./_router-chunk-H0-n0SZI.js";import{n as ie}from"./rxjs-interop-U_NminAK.js";import{l as A,n as j}from"./snackbar.component-ICe8-MWg.js";import{n as M}from"./index-B8S1FFME.js";import{W as N,ft as P,h as F,lt as I,ot as L,t as R}from"./locale.service-Bf8_ncMo.js";import{O as z,T as B,a as V,n as H,o as U,s as W,t as G}from"./ui-CQhTckzj.js";import{a as K}from"./roles-CdyuUIAw.js";import{i as q,n as J,r as Y,t as ae}from"./user-role-dialog.component-CRJpr8Qc.js";import{c as X}from"./policy-DAuRtV7k.js";import{n as oe,t as Z}from"./v2-page.styles-Blvl6ZBZ.js";import{t as se}from"./app-shell.component-CR4uAChA.js";import{t as ce}from"./pager-DPeF-1nO.js";import{t as le}from"./store.service-ZF4OfoGo.js";import{t as ue}from"./technician-dialog.component-Cy8Hz7s1.js";var de=(e,t)=>({shown:e,total:t}),fe=()=>[`/dashboard/appareils`],pe=e=>({user:e}),me=(e,t)=>({active:e,total:t}),he=e=>({name:e}),ge=()=>[`/dashboard/comptes`],_e=e=>({vue:e}),ve=()=>[`/dashboard/audit`],ye=e=>({q:e}),be=(e,t)=>t.id;function xe(e,t){if(e&1&&(o(0,`p`,20),g(1),r()),e&2){let e=d();_(),S(e.t()(`utilisateurs.v2.loading`))}}function Se(e,t){e&1&&u(0,`ui-icon`,43),e&2&&f(`size`,14)}function Ce(e,t){if(e&1&&(o(0,`a`,45),u(1,`ui-icon`,53),g(2),r()),e&2){let e=d().$implicit,t=d(2);f(`routerLink`,i(4,fe))(`queryParams`,c(5,pe,e.id)),_(),f(`size`,16),_(),b(``,t.t()(`utilisateurs.devicesActive`,C(7,me,t.activeDevices(e.id),t.devicesOf(e.id).length)),` `)}}function we(e,t){if(e&1&&(o(0,`span`,46),g(1),r()),e&2){let e=d(3);_(),S(e.t()(`utilisateurs.devicesNone`))}}function Te(e,t){if(e&1&&(o(0,`span`,42),u(1,`ui-icon`,54),g(2),r()),e&2){let e=d(3);y(`background`,e.toneInfo.bg)(`color`,e.toneInfo.fg),_(),f(`size`,14),_(),S(e.t()(`utilisateurs.v2.invited`))}}function Ee(e,t){if(e&1&&(o(0,`span`,42),g(1),r()),e&2){let e=d(3);y(`background`,e.toneSuccess.bg)(`color`,e.toneSuccess.fg),_(),S(e.t()(`utilisateurs.state.active`))}}function De(e,t){if(e&1&&(o(0,`span`,42),g(1),r()),e&2){let e=d(3);y(`background`,e.toneNeutral.bg)(`color`,e.toneNeutral.fg),_(),S(e.t()(`utilisateurs.state.inactive`))}}function Oe(e,n){if(e&1){let e=l();o(0,`button`,55),t(`click`,function(){p(e);let t=d().$implicit,n=d(2);return s(n.openRole(t))}),u(1,`ui-icon`,56),r()}if(e&2){let e=d().$implicit,t=d(2);f(`title`,t.t()(`utilisateurs.v2.changeRole`)),x(`aria-label`,t.t()(`utilisateurs.v2.changeRoleFor`,c(3,he,e.name))),_(),f(`size`,18)}}function Q(e,t){if(e&1&&(o(0,`a`,51),u(1,`ui-icon`,57),r()),e&2){let e=d().$implicit,t=d(2);f(`title`,t.hasLink(e.id)?t.t()(`utilisateurs.action.linked`):t.t()(`utilisateurs.action.link`))(`routerLink`,i(5,ge))(`queryParams`,c(6,_e,t.hasLink(e.id)?`liees`:`a-rapprocher`)),x(`aria-label`,t.hasLink(e.id)?t.t()(`utilisateurs.action.linked`):t.t()(`utilisateurs.action.link`)),_(),f(`size`,18)}}function ke(e,t){if(e&1&&(o(0,`a`,51),u(1,`ui-icon`,58),r()),e&2){let e=d().$implicit,t=d(2);f(`title`,t.t()(`utilisateurs.action.audit`))(`routerLink`,i(5,ve))(`queryParams`,c(6,ye,e.name)),x(`aria-label`,t.t()(`utilisateurs.action.audit`)),_(),f(`size`,18)}}function Ae(e,t){if(e&1&&(o(0,`tr`)(1,`td`)(2,`span`,37)(3,`span`,38),g(4),r(),o(5,`span`,2)(6,`span`,39),g(7),r(),o(8,`span`,40),g(9),r(),o(10,`span`,41),g(11),r()()()(),o(12,`td`)(13,`span`,42),D(14,Se,1,1,`ui-icon`,43),g(15),r()(),o(16,`td`,44),g(17),r(),o(18,`td`),D(19,Ce,3,10,`a`,45)(20,we,2,1,`span`,46),r(),o(21,`td`),D(22,Te,3,6,`span`,47)(23,Ee,2,5,`span`,47)(24,De,2,5,`span`,47),r(),o(25,`td`,48)(26,`span`,49),D(27,Oe,2,5,`button`,50),D(28,Q,2,8,`a`,51),D(29,ke,2,8,`a`,51),u(30,`app-account-actions`,52),r()()()),e&2){let e=t.$implicit,n=d(2);_(3),y(`background`,n.tone(e.role).bg)(`color`,n.tone(e.role).fg),_(),S(n.initials(e.name)),_(3),S(e.name),_(2),S(e.email),_(),v(`zero`,!e.phone),_(),S(e.phone?n.store.phone(e.phone):n.t()(`utilisateurs.phoneNone`)),_(2),y(`background`,n.tone(e.role).bg)(`color`,n.tone(e.role).fg),_(),m(e.role===n.lockedRole?14:-1),_(),b(` `,n.store.roleLabel(e.role),` `),_(2),S(n.scopeLabel(e)),_(2),m(n.devicesOf(e.id).length?19:20),_(3),m(e.invited&&!e.active?22:e.active?23:24),_(5),m(n.canEditRole(e)?27:-1),_(),m(n.store.can(`account.manage`)?28:-1),_(),m(n.store.can(`audit.read`)?29:-1),_(),f(`user`,e)}}function je(t,n){if(t&1&&(o(0,`div`,33)(1,`table`,34)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),o(6,`th`),g(7),r(),o(8,`th`),g(9),r(),o(10,`th`),g(11),r(),o(12,`th`),g(13),r(),o(14,`th`,35),g(15),r()()(),o(16,`tbody`),re(17,Ae,31,23,`tr`,null,be),r()()(),u(19,`ui-pagination`,36)),t&2){let t=d();_(5),S(t.t()(`utilisateurs.col.name`)),_(2),S(t.t()(`utilisateurs.col.role`)),_(2),S(t.t()(`utilisateurs.col.scope`)),_(2),S(t.t()(`utilisateurs.col.devices`)),_(2),S(t.t()(`utilisateurs.col.state`)),_(2),S(t.t()(`utilisateurs.v2.col.actions`)),_(2),e(t.usersPager.items()),_(2),f(`pager`,t.usersPager)}}function Me(e,t){if(e&1&&(o(0,`div`,21)(1,`span`,59),u(2,`ui-icon`,60),r(),o(3,`p`,61),g(4),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),S(e.t()(`utilisateurs.v2.empty`))}}function Ne(e,n){if(e&1){let e=l();o(0,`ui-check-list`,64),t(`valueChange`,function(t){p(e);let n=d(2);return s(n.newScoopIds.set(t))}),r()}if(e&2){let e=d(2);f(`label`,e.t()(`roles.dialog.scoops`))(`options`,e.scoopOptions())(`value`,e.newScoopIds())(`error`,e.newErrors().scoop??``)}}function Pe(e,t){e&1&&(o(0,`p`,66),u(1,`ui-icon`,67),g(2),r()),e&2&&(_(),f(`size`,16),_(),S(t))}function Fe(e,n){if(e&1){let e=l();o(0,`div`,63)(1,`ui-select`,65),t(`valueChange`,function(t){p(e);let n=d(2);return s(n.newScoopIds.set([t]))}),r(),D(2,Pe,3,2,`p`,66),r()}if(e&2){let e,t=d(2);_(),f(`label`,t.t()(`roles.dialog.scoop`))(`options`,t.scoopOptions())(`value`,t.newScoopIds()[0]??``)(`placeholder`,t.t()(`roles.dialog.scoopPh`)),_(),m((e=t.newErrors().scoop)?2:-1,e)}}function Ie(e,t){if(e&1&&D(0,Ne,1,4,`ui-check-list`,62)(1,Fe,3,5,`div`,63),e&2){let e=d();m(+!e.newManyScoops())}}var $=`tous`,Le=class e{tone(e){return e===`superadmin`?{bg:`var(--v2-citron)`,fg:`var(--v2-foret)`}:this.store.roleScoped(e)?Z.culture:Z.info}constructor(){this.store=k(le),this.locale=k(R),this.t=this.locale.t,this.snackbar=k(j),this.router=k(ne),this.route=k(T),this.nf=N,this.lockedRole=L,this.toneInfo=Z.info,this.toneSuccess=Z.succes,this.toneNeutral=Z.neutre,this.initials=oe,this.queryFromRoute=ie(this.route.queryParamMap.pipe(w(e=>e.get(`q`)??``)),{initialValue:``}),this.query=a(``),this.roleFilter=a($),this.loading=a(F()),this.techOpen=a(!1),this.roleOpen=a(!1),this.roleUserId=a(null),this.newOpen=a(!1),this.creating=a(!1),this.newName=a(``),this.newEmail=a(``),this.newPhone=a(``),this.newRole=a(`gestionnaire`),this.newScoopIds=a([]),this.newSubmitted=a(!1),this.users=n(()=>this.store.state().users),this.shownUsers=n(()=>{let e=this.query().trim().toLowerCase(),t=this.roleFilter();return this.users().filter(n=>(t===$||n.role===t)&&(!e||`${n.name} ${n.email}`.toLowerCase().includes(e)))}),this.usersPager=ce(()=>this.shownUsers()),this.stats=n(()=>{let e=this.t(),t=this.users(),n=t.filter(e=>e.active).length,r=t.filter(e=>e.invited&&!e.active).length;return[{label:e(`utilisateurs.v2.stat.accounts`),value:N.format(t.length),sub:e(`utilisateurs.v2.stat.accountsSub`,{count:N.format(n)}),icon:`group`,bg:``,fg:``},{label:e(`utilisateurs.v2.stat.inactive`),value:N.format(t.length-n-r),sub:e(`utilisateurs.v2.stat.inactiveSub`),icon:`block`,...Z.neutre},{label:e(`utilisateurs.v2.stat.invited`),value:N.format(r),sub:e(`utilisateurs.v2.stat.invitedSub`),icon:`mark_email_unread`,...Z.info},{label:e(`utilisateurs.v2.stat.roles`),value:N.format(new Set(t.map(e=>e.role)).size),sub:e(`utilisateurs.v2.stat.rolesSub`,{count:N.format(this.store.allRoles().length)}),icon:`admin_panel_settings`,...Z.attente}]}),this.roleFilterOptions=n(()=>[{value:$,label:this.t()(`utilisateurs.v2.allRoles`),hint:N.format(this.users().length)},...this.store.allRoles().map(e=>({value:e,label:this.store.roleLabel(e),hint:N.format(this.users().filter(t=>t.role===e).length)}))]),this.assignableRoleOptions=n(()=>this.store.assignableRoleIds(this.newScoopIds()).map(e=>({value:e,label:this.store.roleLabel(e),icon:e===`superadmin`?`lock`:this.store.roleScoped(e)?`apartment`:`public`}))),this.scoopOptions=n(()=>this.store.state().scoops.filter(e=>!e.archived).map(e=>({value:e.id,label:e.name}))),this.newRoleScoped=n(()=>this.store.roleScoped(this.newRole())),this.newManyScoops=n(()=>P(this.newRole())),this.roleUser=n(()=>this.users().find(e=>e.id===this.roleUserId())??null),this.newErrors=n(()=>{if(!this.newSubmitted())return{};let e=this.t(),t={},n=this.newEmail().trim(),r=X(n);this.newName().trim().replace(/\s+/g,` `).split(` `).length<2&&(t.name=e(`utilisateurs.v2.err.name`)),!n||!r?t.email=e(`utilisateurs.err.emailInvalid`):this.users().some(e=>e.email.toLowerCase()===r)&&(t.email=e(`utilisateurs.err.emailTaken`));let i=this.newPhone().trim();return i&&!/^7[0678]\s?\d{3}\s?\d{2}\s?\d{2}$/.test(i)&&(t.phone=e(`utilisateurs.err.phone`)),this.newRoleScoped()&&!this.newScoopIds().length&&(t.scoop=e(`errors.roles.scoopRequired`)),t}),ee(()=>this.query.set(this.queryFromRoute())),F()&&this.loadFromApi()}async loadFromApi(){try{let[e,t]=await Promise.all([W(q),K()]);this.store.actions.replaceUsersFromApi(e),this.store.actions.replaceRolePermissionsFromApi(Object.fromEntries(t.items.map(e=>[e.role,e.permissions])),t.customRoles)}catch{this.snackbar.error(this.locale.tNow(`utilisateurs.v2.loadError`))}finally{this.loading.set(!1)}}onQueryChange(e){this.query.set(e),this.router.navigate([],{relativeTo:this.route,queryParams:{q:e.trim()||null},queryParamsHandling:`merge`,replaceUrl:!0})}scopeLabel(e){let t=e.scoopIds??(e.scoopId?[e.scoopId]:[]);if(!t.length)return this.t()(`utilisateurs.scopeAll`);let n=t.map(e=>this.store.state().scoops.find(t=>t.id===e)?.name??e);return n.length>2?`${n.slice(0,2).join(`, `)} +${n.length-2}`:n.join(`, `)}devicesOf(e){return this.store.state().devices.filter(t=>t.userId===e)}activeDevices(e){return this.devicesOf(e).filter(e=>e.active).length}hasLink(e){return this.store.state().links.some(t=>t.userId===e)}canEditRole(e){return!I.includes(e.role)||this.store.can(`role.configure`)}openRole(e){this.roleUserId.set(e.id),this.roleOpen.set(!0)}openNewUser(){this.newName.set(``),this.newEmail.set(``),this.newPhone.set(``),this.newRole.set(`gestionnaire`),this.newScoopIds.set([]),this.newSubmitted.set(!1),this.newOpen.set(!0)}pickNewRole(e){let t=e;this.newRole.set(t),P(t)||this.newScoopIds.update(e=>e.slice(0,1)),this.store.roleScoped(t)||this.newScoopIds.set([])}async submitNewUser(){if(this.newSubmitted.set(!0),Object.keys(this.newErrors()).length)return;let e=this.newRole(),t=this.newRoleScoped()?this.newScoopIds():[],n={name:this.newName().trim().replace(/\s+/g,` `),email:X(this.newEmail()),phone:this.newPhone().trim(),role:e};this.creating.set(!0);try{if(F()){let r=await Y({name:n.name,email:n.email,role:n.role,...t[0]?{scoopId:t[0]}:{},...n.phone?{phone:n.phone}:{}});this.store.actions.addUser({id:r.id,name:r.name,email:r.email,phone:r.phone??``,role:r.role,scoopId:r.scoopId??void 0,...P(e)&&{scoopIds:t}})}else this.store.actions.addUser({...n,scoopId:P(e)?void 0:t[0],...P(e)&&{scoopIds:t}})}catch{this.snackbar.error(this.locale.tNow(`utilisateurs.v2.apiError`));return}finally{this.creating.set(!1)}this.snackbar.success(this.locale.tNow(`utilisateurs.toast.created`)),this.newOpen.set(!1)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=te({type:e,selectors:[[`app-utilisateurs-page`]],decls:44,vars:48,consts:[[`perm`,`user.manage`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`flex`,`flex-wrap`,`gap-2`],[`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`name`,`person_add`,3,`size`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`add`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`variant`,`compact`,`leadingIcon`,`admin_panel_settings`,1,`role-filter`,3,`valueChange`,`options`,`value`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`sub`,`p-6`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[`icon`,`person_add`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`grid`,`gap-4`,`sm:grid-cols-2`],[`preset`,`firstName`,1,`sm:col-span-2`,3,`valueChange`,`label`,`placeholder`,`value`,`error`],[`preset`,`email`,3,`valueChange`,`label`,`hint`,`value`,`error`],[`preset`,`phone`,3,`valueChange`,`label`,`optional`,`value`,`error`],[`leadingIcon`,`admin_panel_settings`,1,`sm:col-span-2`,3,`valueChange`,`label`,`options`,`value`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`,`disabled`],[`name`,`check`,3,`size`],[3,`openChange`,`open`,`user`],[3,`openChange`,`open`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[860px]`],[1,`pin-right`,`text-right`],[1,`px-5`,`pb-5`,3,`pager`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`],[1,`block`,`max-w-64`,`truncate`,`font-bold`],[1,`sub`,`block`,`max-w-64`,`truncate`],[1,`sub`,`block`,`tabular`],[1,`badge`],[`name`,`lock`,3,`size`],[1,`max-w-56`,`truncate`,`font-medium`],[1,`inline-flex`,`items-center`,`gap-1.5`,`font-bold`,`underline-offset-4`,`hover:underline`,2,`color`,`var(--v2-foret)`,3,`routerLink`,`queryParams`],[1,`zero`],[1,`badge`,3,`background`,`color`],[1,`pin-right`],[1,`flex`,`justify-end`,`gap-2`],[`type`,`button`,1,`act`,3,`title`],[1,`act`,3,`title`,`routerLink`,`queryParams`],[3,`user`],[`name`,`devices`,3,`size`],[`name`,`mark_email_unread`,3,`size`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`admin_panel_settings`,3,`size`],[`name`,`link`,3,`size`],[`name`,`history`,3,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`group`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sm:col-span-2`,3,`label`,`options`,`value`,`error`],[1,`sm:col-span-2`],[1,`sm:col-span-2`,3,`valueChange`,`label`,`options`,`value`,`error`],[`leadingIcon`,`apartment`,3,`valueChange`,`label`,`options`,`value`,`placeholder`],[`role`,`alert`,1,`mt-1.5`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-bold`,2,`color`,`var(--v2-erreur-fg)`],[`name`,`warning`,3,`size`]],template:function(e,n){e&1&&(o(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),g(4),r(),o(5,`h1`,4),g(6),r(),o(7,`p`,5),g(8),r()(),o(9,`span`,6)(10,`button`,7),t(`click`,function(){return n.techOpen.set(!0)}),u(11,`ui-icon`,8),g(12),r(),o(13,`button`,9),t(`click`,function(){return n.openNewUser()}),g(14),o(15,`span`,10),u(16,`ui-icon`,11),r()()()(),u(17,`ui-stat-cards`,12),o(18,`div`,13)(19,`label`,14),u(20,`ui-icon`,15),o(21,`input`,16),t(`input`,function(e){return n.onQueryChange(e.target.value)}),r()(),o(22,`ui-select`,17),t(`valueChange`,function(e){return n.roleFilter.set(e)}),r()(),o(23,`p`,18),g(24),r(),o(25,`section`,19),D(26,xe,2,1,`p`,20)(27,je,20,7)(28,Me,5,2,`div`,21),r(),o(29,`ui-modal`,22),t(`closed`,function(){return n.newOpen.set(!1)}),o(30,`div`,23)(31,`ui-text-field`,24),t(`valueChange`,function(e){return n.newName.set(e)}),r(),o(32,`ui-text-field`,25),t(`valueChange`,function(e){return n.newEmail.set(e)}),r(),o(33,`ui-text-field`,26),t(`valueChange`,function(e){return n.newPhone.set(e)}),r(),o(34,`ui-select`,27),t(`valueChange`,function(e){return n.pickNewRole(e)}),r(),D(35,Ie,2,1),r(),o(36,`button`,28),t(`click`,function(){return n.newOpen.set(!1)}),g(37),r(),o(38,`button`,29),t(`click`,function(){return n.submitNewUser()}),g(39),o(40,`span`,10),u(41,`ui-icon`,30),r()()(),o(42,`app-user-role-dialog`,31),O(`openChange`,function(e){return E(n.roleOpen,e)||(n.roleOpen=e),e}),r(),o(43,`app-technician-dialog`,32),O(`openChange`,function(e){return E(n.techOpen,e)||(n.techOpen=e),e}),r()()),e&2&&(f(`area`,n.t()(`utilisateurs.area`)),_(4),S(n.t()(`utilisateurs.eyebrow`)),_(2),S(n.t()(`utilisateurs.title`)),_(2),S(n.t()(`utilisateurs.v2.description`)),_(3),f(`size`,18),_(),S(n.t()(`tech.add`)),_(2),b(` `,n.t()(`utilisateurs.new`)),_(2),f(`size`,20),_(),f(`stats`,n.stats()),_(3),f(`size`,20),_(),f(`placeholder`,n.t()(`utilisateurs.v2.search`))(`value`,n.query()),x(`aria-label`,n.t()(`utilisateurs.v2.search`)),_(),f(`options`,n.roleFilterOptions())(`value`,n.roleFilter()),_(2),S(n.t()(`utilisateurs.v2.count`,C(45,de,n.nf.format(n.shownUsers().length),n.nf.format(n.users().length)))),_(2),m(n.loading()?26:n.shownUsers().length?27:28),_(3),f(`open`,n.newOpen())(`title`,n.t()(`utilisateurs.new`))(`description`,n.t()(`utilisateurs.v2.newDescription`))(`width`,680)(`closeLabel`,n.t()(`common.close`)),_(2),f(`label`,n.t()(`utilisateurs.form.name`))(`placeholder`,n.t()(`utilisateurs.form.namePh`))(`value`,n.newName())(`error`,n.newErrors().name??``),_(),f(`label`,n.t()(`utilisateurs.form.email`))(`hint`,n.t()(`utilisateurs.form.emailHint`))(`value`,n.newEmail())(`error`,n.newErrors().email??``),_(),f(`label`,n.t()(`utilisateurs.form.phone`))(`optional`,n.t()(`utilisateurs.v2.optional`))(`value`,n.newPhone())(`error`,n.newErrors().phone??``),_(),f(`label`,n.t()(`utilisateurs.form.role`))(`options`,n.assignableRoleOptions())(`value`,n.newRole()),_(),m(n.newRoleScoped()?35:-1),_(2),S(n.t()(`common.cancel`)),_(),f(`disabled`,n.creating()),_(),b(` `,n.t()(`utilisateurs.create`)),_(2),f(`size`,18),_(),h(`open`,n.roleOpen),f(`user`,n.roleUser()),_(),h(`open`,n.techOpen))},dependencies:[J,se,z,A,B,V,M,U,H,ue,G,ae],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.role-filter[_ngcontent-%COMP%] {
        min-width: 240px;
      }
      
      .pin-right[_ngcontent-%COMP%] {
        position: sticky;
        right: 0;
        z-index: 1;
        background: var(--%NS%v2-blanc);
        box-shadow: -1px 0 0 var(--%NS%v2-separateur);
      }`]})}};export{Le as default};