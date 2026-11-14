import{$t as e,Bt as t,F as n,Ft as r,Hn as i,It as a,Jn as o,Kt as s,L as ee,Ln as te,Lt as c,Nt as l,St as u,Vt as d,Wt as f,Yn as p,_t as m,en as h,fn as g,ft as _,gt as v,hn as y,ht as b,ln as x,mn as S,mt as C,pn as w,qt as T,vt as E,zn as D}from"./_router-chunk-H0-n0SZI.js";import{T as O,W as k,t as A,xt as j}from"./locale.service-Bf8_ncMo.js";import{l as M,n as N}from"./snackbar.component-ICe8-MWg.js";import{t as P}from"./app-shell.component-CR4uAChA.js";import{t as F}from"./pager-DPeF-1nO.js";import{t as I}from"./role-access-preview.component-D5f0INIR.js";import{t as L}from"./v2-page.styles-Blvl6ZBZ.js";import{t as R}from"./store.service-ZF4OfoGo.js";import{T as z,a as B,n as V,o as H,t as U}from"./ui-CQhTckzj.js";var W=(e,t)=>({shown:e,total:t}),G=e=>({name:e}),K=e=>({count:e}),q=e=>({email:e}),J=(e,t)=>t.id,Y=(e,t)=>t.role,X=(e,t)=>t.user.id;function Z(e,n){if(e&1){let e=c();a(0,`li`)(1,`button`,44),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.roleFilter.set(n.roleFilter()===t.role?`all`:t.role))}),g(2),a(3,`span`,45),g(4),r()()()}if(e&2){let e=n.$implicit,t=d(2);_(),v(`on`,t.roleFilter()===e.role),C(`aria-pressed`,t.roleFilter()===e.role),_(),S(` `,e.label),_(2),w(e.count)}}function Q(t,n){if(t&1&&(a(0,`section`,10)(1,`p`,30),g(2),r(),a(3,`ul`,43),h(4,Z,5,5,`li`,null,Y),r()()),t&2){let t=d();C(`aria-label`,t.t()(`personnel.breakdown.title`)),_(2),w(t.t()(`personnel.breakdown.title`)),_(2),e(t.roleBreakdown())}}function ne(e,n){if(e&1){let e=c();a(0,`button`,32),t(`click`,function(){let t=p(e).$implicit,n=d();return o(n.stateFilter.set(t.id))}),g(1),a(2,`span`,45),g(3),r()()}if(e&2){let e=n.$implicit,t=d();v(`on`,t.stateFilter()===e.id),C(`aria-checked`,t.stateFilter()===e.id),_(),S(` `,t.t()(e.label)),_(),v(`zero`,!e.count),_(),w(e.count)}}function re(e,n){if(e&1){let e=c();a(0,`ui-select`,46),t(`valueChange`,function(t){p(e);let n=d();return o(n.roleFilter.set(t))}),r()}if(e&2){let e=d();f(`label`,e.t()(`personnel.filter.role`))(`options`,e.roleFilterOptions())(`value`,e.roleFilter())}}function ie(e,n){if(e&1){let e=c();a(0,`button`,61),t(`click`,function(){p(e);let t=d().$implicit,n=d(2);return o(n.openEdit(t.user))}),l(1,`ui-icon`,63),r(),a(2,`button`,61),t(`click`,function(){p(e);let t=d().$implicit,n=d(2);return o(n.toggling.set(t.user))}),l(3,`ui-icon`,64),r()}if(e&2){let e=d().$implicit,t=d(2);f(`title`,t.t()(`personnel.edit`)),C(`aria-label`,t.t()(`personnel.edit.aria`,s(9,G,e.user.name))),_(),f(`size`,18),_(),v(`act-danger`,e.user.active),f(`title`,e.user.active?t.t()(`personnel.suspend`):t.t()(`personnel.restore`)),C(`aria-label`,(e.user.active?t.t()(`personnel.suspend`):t.t()(`personnel.restore`))+` · `+e.user.name),_(),f(`name`,e.user.active?`block`:`how_to_reg`)(`size`,18)}}function ae(e,n){if(e&1){let e=c();a(0,`tr`,52),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.viewing.set(t.user))}),a(1,`td`)(2,`span`,53)(3,`span`,54),g(4),r(),a(5,`span`,2)(6,`span`,55),g(7),r(),a(8,`span`,56),g(9),r()()()(),a(10,`td`,57),g(11),r(),a(12,`td`)(13,`span`,58),g(14),r()(),a(15,`td`,59),t(`click`,function(e){return e.stopPropagation()}),a(16,`span`,60)(17,`button`,61),t(`click`,function(){let t=p(e).$implicit,n=d(2);return o(n.viewing.set(t.user))}),l(18,`ui-icon`,62),r(),E(19,ie,4,11),r()()()}if(e&2){let e=n.$implicit,t=d(2);_(4),w(e.initials),_(3),w(e.user.name),_(2),y(``,e.user.email,``,e.user.phone?` · `+t.store.phone(e.user.phone):``),_(2),w(t.store.roleLabel(e.user.role)),_(2),x(`background`,e.state===`active`?`var(--v2-culture-bg)`:e.state===`invited`?`var(--v2-attente-bg)`:`var(--v2-lin)`)(`color`,e.state===`active`?`var(--v2-culture-fg)`:e.state===`invited`?`var(--v2-attente-fg)`:`var(--v2-gris-texte)`),_(),S(` `,t.t()(t.stateLabel[e.state]),` `),_(3),f(`title`,t.t()(`common.view`)),C(`aria-label`,t.t()(`personnel.view.aria`,s(14,G,e.user.name))),_(),f(`size`,18),_(),m(e.manageable?19:-1)}}function oe(t,n){if(t&1&&(a(0,`div`,47)(1,`table`,48)(2,`thead`)(3,`tr`)(4,`th`),g(5),r(),a(6,`th`),g(7),r(),a(8,`th`),g(9),r(),a(10,`th`,49),g(11),r()()(),a(12,`tbody`),h(13,ae,20,16,`tr`,50,X),r()()(),l(15,`ui-pagination`,51)),t&2){let t=d();_(5),w(t.t()(`personnel.col.name`)),_(2),w(t.t()(`personnel.col.role`)),_(2),w(t.t()(`personnel.col.state`)),_(2),w(t.t()(`personnel.col.actions`)),_(2),e(t.pager.items()),_(2),f(`pager`,t.pager)}}function $(e,t){if(e&1&&(a(0,`div`,20)(1,`span`,65),l(2,`ui-icon`,66),r(),a(3,`p`,67),g(4),r(),a(5,`p`,68),g(6),r()()),e&2){let e=d();_(2),f(`size`,26),_(2),w(e.t()(`personnel.empty.title`)),_(2),w(e.rows().length?e.t()(`personnel.empty.filtered`):e.t()(`personnel.empty.none`))}}function se(e,t){if(e&1&&(a(0,`p`,33),l(1,`ui-icon`,69),g(2),r()),e&2){let e=d();_(),f(`size`,16),_(),w(e.errors().sex)}}function ce(e,n){if(e&1){let e=c();a(0,`ui-select`,70),t(`valueChange`,function(t){p(e);let n=d();return n.scoopId.set(t),o(n.role.set(``))}),r()}if(e&2){let e=d();f(`label`,e.t()(`adherents.add.scoop`))(`options`,e.scoopOptions())(`value`,e.scoopId())}}function le(e,t){if(e&1&&(a(0,`p`,33),l(1,`ui-icon`,69),g(2),r()),e&2){let e=d();_(),f(`size`,16),_(),w(e.errors().role)}}function ue(e,n){if(e&1){let e=c();a(0,`button`,38),t(`click`,function(){p(e);let t=d(),n=d();return o(n.openEdit(t.user))}),g(1),a(2,`span`,7),l(3,`ui-icon`,63),r()()}if(e&2){let e=d(2);_(),S(` `,e.t()(`personnel.edit`)),_(2),f(`size`,18)}}function de(e,n){if(e&1){let e=c();a(0,`ui-modal`,71),t(`closed`,function(){p(e);let t=d();return o(t.viewing.set(null))}),a(1,`div`,22)(2,`dl`,72)(3,`div`)(4,`dt`),g(5),r(),a(6,`dd`),g(7),r()(),a(8,`div`)(9,`dt`),g(10),r(),a(11,`dd`),g(12),r()(),a(13,`div`)(14,`dt`),g(15),r(),a(16,`dd`),g(17),r()(),a(18,`div`)(19,`dt`),g(20),r(),a(21,`dd`),g(22),r()(),a(23,`div`)(24,`dt`),g(25),r(),a(26,`dd`),g(27),r()(),a(28,`div`)(29,`dt`),g(30),r(),a(31,`dd`),g(32),r()()(),l(33,`app-role-access-preview`,36),r(),a(34,`button`,37),t(`click`,function(){p(e);let t=d();return o(t.viewing.set(null))}),g(35),r(),E(36,ue,4,2,`button`,73),r()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,e.user.name)(`description`,t.store.roleLabel(e.user.role))(`width`,640)(`closeLabel`,t.t()(`common.close`)),_(5),w(t.t()(`tech.dialog.email`)),_(2),w(e.user.email),_(3),w(t.t()(`tech.dialog.phone`)),_(2),w(e.user.phone?t.store.phone(e.user.phone):`—`),_(3),w(t.t()(`adherents.add.sex`)),_(2),w(e.user.sex===`F`?t.t()(`adherents.add.female`):e.user.sex===`H`?t.t()(`adherents.add.male`):`—`),_(3),w(t.t()(`adherents.add.age`)),_(2),w(e.user.age?t.t()(`tech.ageYears`,s(24,K,e.user.age)):`—`),_(3),w(t.t()(`personnel.col.role`)),_(2),w(t.store.roleLabel(e.user.role)),_(3),w(t.t()(`personnel.col.state`)),_(2),w(t.t()(t.stateLabel[e.state])),_(),f(`bare`,!0)(`permissions`,t.permissionsOf(e.user.role))(`scoped`,!0)(`hint`,t.t()(`roles.access.hintEdit`))(`emptyText`,t.t()(`roles.access.none`)),_(2),w(t.t()(`common.close`)),_(),m(e.manageable?36:-1)}}function fe(e,t){if(e&1&&(a(0,`p`,33),l(1,`ui-icon`,69),g(2),r()),e&2){let e=d(2);_(),f(`size`,16),_(),w(e.editErrors().sex)}}function pe(e,n){if(e&1){let e=c();a(0,`ui-modal`,74),t(`closed`,function(){p(e);let t=d();return o(t.editing.set(null))}),a(1,`div`,22)(2,`div`,23)(3,`ui-text-field`,75),t(`valueChange`,function(t){p(e);let n=d();return o(n.editName.set(t))}),r(),a(4,`ui-text-field`,27),t(`valueChange`,function(t){p(e);let n=d();return o(n.editPhone.set(t))}),r(),a(5,`ui-text-field`,28),t(`valueChange`,function(t){p(e);let n=d();return o(n.editAge.set(t))}),r(),a(6,`div`,29)(7,`p`,30),g(8),r(),a(9,`div`,31)(10,`button`,32),t(`click`,function(){p(e);let t=d();return o(t.editSex.set(`F`))}),g(11),r(),a(12,`button`,32),t(`click`,function(){p(e);let t=d();return o(t.editSex.set(`H`))}),g(13),r()(),E(14,fe,3,2,`p`,33),r()(),a(15,`p`,76),g(16),r(),a(17,`ui-select`,77),t(`valueChange`,function(t){p(e);let n=d();return o(n.pickedRole.set(t))}),r(),l(18,`app-role-access-preview`,36),r(),a(19,`button`,37),t(`click`,function(){p(e);let t=d();return o(t.editing.set(null))}),g(20),r(),a(21,`button`,38),t(`click`,function(){let t=p(e),n=d();return o(n.saveEdit(t))}),g(22),a(23,`span`,7),l(24,`ui-icon`,78),r()()()}if(e&2){let e=n,t=d();f(`open`,!0)(`title`,t.t()(`personnel.edit.title`,s(38,G,e.name)))(`description`,t.t()(`personnel.edit.description`))(`width`,680)(`closeLabel`,t.t()(`common.close`)),_(3),f(`label`,t.t()(`techniciens.edit.name`))(`value`,t.editName())(`error`,t.editErrors().name??``),_(),f(`label`,t.t()(`tech.dialog.phone`))(`value`,t.editPhone())(`error`,t.editErrors().phone??``),_(),f(`label`,t.t()(`adherents.add.age`))(`hint`,t.t()(`tech.dialog.ageHint`))(`value`,t.editAge())(`error`,t.editErrors().age??``),_(3),w(t.t()(`adherents.add.sex`)),_(),C(`aria-label`,t.t()(`adherents.add.sex`)),_(),v(`on`,t.editSex()===`F`),C(`aria-checked`,t.editSex()===`F`),_(),w(t.t()(`adherents.add.female`)),_(),v(`on`,t.editSex()===`H`),C(`aria-checked`,t.editSex()===`H`),_(),w(t.t()(`adherents.add.male`)),_(),m(t.editErrors().sex?14:-1),_(2),w(t.t()(`personnel.edit.emailLocked`,s(40,q,e.email))),_(),f(`label`,t.t()(`personnel.add.role`))(`options`,t.roleOptionsFor(e))(`value`,t.pickedRole()),_(),f(`bare`,!0)(`permissions`,t.permissionsOf(t.pickedRole()))(`scoped`,!0)(`hint`,t.t()(`roles.access.hintEdit`))(`emptyText`,t.t()(`roles.access.none`)),_(2),w(t.t()(`common.cancel`)),_(2),S(` `,t.t()(`personnel.role.save`)),_(2),f(`size`,18)}}function me(e,n){if(e&1){let e=c();a(0,`ui-modal`,79),t(`closed`,function(){p(e);let t=d();return o(t.toggling.set(null))}),a(1,`button`,37),t(`click`,function(){p(e);let t=d();return o(t.toggling.set(null))}),g(2),r(),a(3,`button`,80),t(`click`,function(){let t=p(e),n=d();return o(n.confirmToggle(t))}),g(4),r()()}if(e&2){let e=n,t=d();f(`open`,!0)(`tone`,e.active?`danger`:`default`)(`title`,e.active?t.t()(`personnel.suspend.title`,s(11,G,e.name)):t.t()(`personnel.restore.title`,s(13,G,e.name)))(`description`,e.active?t.t()(`personnel.suspend.text`):t.t()(`personnel.restore.text`))(`icon`,e.active?`block`:`how_to_reg`)(`width`,540)(`closeLabel`,t.t()(`common.close`)),_(2),w(t.t()(`common.cancel`)),_(),b(e.active?`btn btn-danger`:`btn btn-primary`),_(),S(` `,e.active?t.t()(`personnel.suspend`):t.t()(`personnel.restore`),` `)}}var he=class o{constructor(){this.store=D(R),this.locale=D(A),this.t=this.locale.t,this.snackbar=D(N),this.stateLabel={active:`personnel.state.active`,invited:`personnel.state.invited`,closed:`personnel.state.closed`},this.query=i(``),this.stateFilter=i(`all`),this.roleFilter=i(`all`),this.addOpen=i(!1),this.viewing=i(null),this.editing=i(null),this.editName=i(``),this.editPhone=i(``),this.editAge=i(``),this.editSex=i(``),this.editErrors=i({}),this.toggling=i(null),this.pickedRole=i(``),this.firstName=i(``),this.lastName=i(``),this.email=i(``),this.phone=i(``),this.age=i(``),this.sex=i(``),this.role=i(``),this.scoopId=i(``),this.errors=i({}),this.scoopOptions=n(()=>{let e=this.store.state();return j(e.scoops.filter(e=>!e.archived).map(e=>({...e,scoopId:e.id})),e.session).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({value:e.id,label:e.name,...e.code?{hint:e.code}:{}}))}),this.roleOptions=n(()=>this.assignable(this.scoopId()).map(e=>({value:e,label:this.store.roleLabel(e)}))),this.previewPermissions=n(()=>this.permissionsOf(this.role())),this.rows=n(()=>{let e=this.store.state(),t=new Set(this.scoopOptions().map(e=>e.value)),n=e.session?.email.toLowerCase();return e.users.filter(e=>!!e.scoopId&&t.has(e.scoopId)&&e.role!==`technicien`).filter(e=>e.role!==`faitiere`&&e.role!==`admin`&&e.role!==`superadmin`).sort((e,t)=>e.name.localeCompare(t.name)).map(e=>({user:e,initials:e.name.split(` `).map(e=>e[0]??``).join(``).slice(0,2).toUpperCase(),state:e.invited&&!e.active?`invited`:e.active?`active`:`closed`,manageable:e.email.toLowerCase()!==n&&this.assignable(e.scoopId??``).includes(e.role)}))}),this.shown=n(()=>{let e=this.query().trim().toLowerCase();return this.rows().filter(t=>(this.stateFilter()===`all`||t.state===this.stateFilter())&&(this.roleFilter()===`all`||t.user.role===this.roleFilter())&&(!e||[t.user.name,t.user.email,this.store.roleLabel(t.user.role)].some(t=>t.toLowerCase().includes(e))))}),this.stateFilters=n(()=>{let e=this.rows(),t=t=>e.filter(e=>e.state===t).length;return[{id:`all`,label:`personnel.filter.all`,count:e.length},{id:`active`,label:`personnel.state.active`,count:t(`active`)},{id:`invited`,label:`personnel.state.invited`,count:t(`invited`)},{id:`closed`,label:`personnel.state.closed`,count:t(`closed`)}]}),this.roleBreakdown=n(()=>{let e=this.rows();return[...new Set(e.map(e=>e.user.role))].map(t=>({role:t,label:this.store.roleLabel(t),count:e.filter(e=>e.user.role===t).length})).sort((e,t)=>t.count-e.count||e.label.localeCompare(t.label))}),this.roleFilterOptions=n(()=>{let e=this.rows(),t=[...new Set(e.map(e=>e.user.role))];return[{value:`all`,label:this.t()(`personnel.filter.allRoles`),hint:k.format(e.length)},...t.map(t=>({value:t,label:this.store.roleLabel(t),hint:k.format(e.filter(e=>e.user.role===t).length)})).sort((e,t)=>e.label.localeCompare(t.label))]}),this.stats=n(()=>{let e=this.t(),t=this.rows(),n=e=>t.filter(t=>t.state===e).length,r=t.filter(e=>e.user.sex===`F`).length;return[{label:e(`personnel.stat.total`),value:k.format(t.length),sub:e(`personnel.stat.totalSub`,{roles:k.format(new Set(t.map(e=>e.user.role)).size)}),icon:`group`,bg:``,fg:``},{label:e(`personnel.stat.active`),value:k.format(n(`active`)),sub:e(`personnel.stat.activeSub`),icon:`how_to_reg`,...L.succes},{label:e(`personnel.stat.invited`),value:k.format(n(`invited`)),sub:e(`personnel.stat.invitedSub`),icon:`mark_email_unread`,...L.info},{label:e(`personnel.stat.closed`),value:k.format(n(`closed`)),sub:e(`personnel.stat.closedSub`,{women:k.format(r)}),icon:`block`,...L.attente}]}),this.pager=F(()=>this.shown()),this.viewedRow=n(()=>{let e=this.viewing();return e?this.rows().find(t=>t.user.id===e.id)??null:null}),te(()=>{let e=this.scoopOptions();ee(()=>{e.some(e=>e.value===this.scoopId())||this.scoopId.set(e[0]?.value??``)})})}assignable(e){let t=this.store.state(),n=t.session?.role;return n?O(n,t.customRoles,e).filter(e=>e!==`technicien`):[]}roleOptionsFor(e){return this.assignable(e.scoopId??``).map(e=>({value:e,label:this.store.roleLabel(e)}))}permissionsOf(e){return e?this.store.state().rolePermissions[e]??[]:[]}openAdd(){this.firstName.set(``),this.lastName.set(``),this.email.set(``),this.phone.set(``),this.age.set(``),this.sex.set(``),this.role.set(``),this.errors.set({}),this.addOpen.set(!0)}submitAdd(){let e=this.t(),t={};this.firstName().trim()||(t.firstName=e(`errors.technician.name`)),this.lastName().trim()||(t.lastName=e(`errors.technician.name`)),/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email().trim())||(t.email=e(`errors.technician.email`)),this.phone().replace(/\D/g,``).length<9&&(t.phone=e(`errors.technician.phone`));let n=Number(this.age().trim());if((!this.age().trim()||!Number.isInteger(n)||n<15||n>100)&&(t.age=e(`errors.technician.age`)),this.sex()||(t.sex=e(`errors.technician.sex`)),this.role()||(t.role=e(`personnel.add.roleRequired`)),this.errors.set(t),Object.keys(t).length)return;let r=`${this.firstName().trim()} ${this.lastName().trim()}`,i=this.store.actions.createStaff({name:r,email:this.email(),phone:this.phone(),sex:this.sex(),age:n,role:this.role(),scoopId:this.scoopId()});i.ok?(this.addOpen.set(!1),this.snackbar.success(e(`personnel.add.done`,{name:r}))):i.error===e(`errors.technician.emailTaken`)?this.errors.set({email:i.error}):this.snackbar.error(i.error)}openEdit(e){this.viewing.set(null),this.editName.set(e.name),this.editPhone.set(e.phone),this.editAge.set(e.age?String(e.age):``),this.editSex.set(e.sex??``),this.pickedRole.set(e.role),this.editErrors.set({}),this.editing.set(e)}saveEdit(e){let t=this.t(),n={};this.editName().trim().split(/\s+/).length<2&&(n.name=t(`errors.technician.name`)),this.editPhone().replace(/\D/g,``).length<9&&(n.phone=t(`errors.technician.phone`));let r=Number(this.editAge().trim());if((!this.editAge().trim()||!Number.isInteger(r)||r<15||r>100)&&(n.age=t(`errors.technician.age`)),this.editSex()||(n.sex=t(`errors.technician.sex`)),this.editErrors.set(n),Object.keys(n).length)return;let i=this.store.actions.updateStaff(e.id,{name:this.editName(),phone:this.editPhone(),sex:this.editSex(),age:r,...this.pickedRole()&&this.pickedRole()!==e.role?{role:this.pickedRole()}:{}});i.ok?(this.editing.set(null),this.snackbar.success(t(`personnel.edit.done`,{name:this.editName().trim()}))):this.snackbar.error(i.error)}confirmToggle(e){let t=this.store.actions.updateStaff(e.id,{active:!e.active});this.toggling.set(null),t.ok?this.snackbar.success(this.t()(e.active?`personnel.suspend.done`:`personnel.restore.done`,{name:e.name})):this.snackbar.error(t.error)}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-personnel-page`]],decls:58,vars:69,consts:[[`perm`,`role.assign`,3,`area`],[1,`rise`,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`max-w-2xl`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[1,`btn-chip`],[`name`,`person_add`,3,`size`],[1,`rise`,`mt-8`,3,`stats`],[1,`card`,`mt-6`,`p-5`],[1,`toolbar`,`card`,`mt-6`],[1,`search`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`role`,`radiogroup`,1,`seg`],[`type`,`button`,`role`,`radio`,3,`on`],[`leadingIcon`,`admin_panel_settings`,1,`min-w-[220px]`,3,`label`,`options`,`value`],[`aria-live`,`polite`,1,`sub`,`mt-4`],[1,`card`,`mt-3`,`overflow-hidden`],[1,`flex`,`flex-col`,`items-center`,`gap-3`,`p-10`,`text-center`],[`icon`,`person_add`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`space-y-5`,`pb-6`],[1,`grid`,`gap-5`,`sm:grid-cols-2`],[`preset`,`firstName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`lastName`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`email`,1,`sm:col-span-2`,3,`valueChange`,`label`,`hint`,`value`,`error`],[`preset`,`phone`,3,`valueChange`,`label`,`value`,`error`],[`preset`,`age`,3,`valueChange`,`label`,`hint`,`value`,`error`],[1,`sm:col-span-2`],[1,`lbl`],[`role`,`radiogroup`,1,`seg`,`mt-2`],[`type`,`button`,`role`,`radio`,3,`click`],[1,`field-err`],[`leadingIcon`,`apartment`,3,`label`,`options`,`value`],[`leadingIcon`,`admin_panel_settings`,3,`valueChange`,`label`,`placeholder`,`options`,`value`],[3,`bare`,`permissions`,`scoped`,`hint`,`emptyText`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`,3,`click`],[`name`,`mail`,3,`size`],[`icon`,`person`,3,`open`,`title`,`description`,`width`,`closeLabel`],[`icon`,`edit`,3,`open`,`title`,`description`,`width`,`closeLabel`],[3,`open`,`tone`,`title`,`description`,`icon`,`width`,`closeLabel`],[1,`mt-3`,`flex`,`flex-wrap`,`gap-2`],[`type`,`button`,1,`chip-role`,3,`click`],[1,`n`],[`leadingIcon`,`admin_panel_settings`,1,`min-w-[220px]`,3,`valueChange`,`label`,`options`,`value`],[1,`overflow-x-auto`],[1,`tbl`,`min-w-[820px]`],[1,`text-right`],[1,`row-link`],[1,`px-5`,`pb-5`,3,`pager`],[1,`row-link`,3,`click`],[1,`flex`,`items-center`,`gap-3`],[1,`avatar`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`font-medium`],[1,`badge`],[3,`click`],[1,`flex`,`justify-end`,`gap-2`],[`type`,`button`,1,`act`,3,`click`,`title`],[`name`,`visibility`,3,`size`],[`name`,`edit`,3,`size`],[3,`name`,`size`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[16px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`group`,3,`size`],[1,`text-[16px]`,`font-extrabold`],[1,`sub`,`max-w-md`],[`name`,`warning`,3,`size`],[`leadingIcon`,`apartment`,3,`valueChange`,`label`,`options`,`value`],[`icon`,`person`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`facts`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-primary`],[`icon`,`edit`,3,`closed`,`open`,`title`,`description`,`width`,`closeLabel`],[1,`sm:col-span-2`,3,`valueChange`,`label`,`value`,`error`],[1,`sub`],[`leadingIcon`,`admin_panel_settings`,3,`valueChange`,`label`,`options`,`value`],[`name`,`check`,3,`size`],[3,`closed`,`open`,`tone`,`title`,`description`,`icon`,`width`,`closeLabel`],[`modal-footer`,``,`type`,`button`,3,`click`]],template:function(n,i){if(n&1&&(a(0,`app-shell`,0)(1,`header`,1)(2,`div`,2)(3,`p`,3),g(4),r(),a(5,`h1`,4),g(6),r(),a(7,`p`,5),g(8),r()(),a(9,`button`,6),t(`click`,function(){return i.openAdd()}),g(10),a(11,`span`,7),l(12,`ui-icon`,8),r()()(),l(13,`ui-stat-cards`,9),E(14,Q,6,2,`section`,10),a(15,`div`,11)(16,`label`,12),l(17,`ui-icon`,13),a(18,`input`,14),t(`input`,function(e){return i.query.set(e.target.value)}),r()(),a(19,`div`,15),h(20,ne,4,7,`button`,16,J),r(),E(22,re,1,3,`ui-select`,17),r(),a(23,`p`,18),g(24),r(),a(25,`section`,19),E(26,oe,16,5)(27,$,7,3,`div`,20),r(),a(28,`ui-modal`,21),t(`closed`,function(){return i.addOpen.set(!1)}),a(29,`div`,22)(30,`div`,23)(31,`ui-text-field`,24),t(`valueChange`,function(e){return i.firstName.set(e)}),r(),a(32,`ui-text-field`,25),t(`valueChange`,function(e){return i.lastName.set(e)}),r(),a(33,`ui-text-field`,26),t(`valueChange`,function(e){return i.email.set(e)}),r(),a(34,`ui-text-field`,27),t(`valueChange`,function(e){return i.phone.set(e)}),r(),a(35,`ui-text-field`,28),t(`valueChange`,function(e){return i.age.set(e)}),r(),a(36,`div`,29)(37,`p`,30),g(38),r(),a(39,`div`,31)(40,`button`,32),t(`click`,function(){return i.sex.set(`F`)}),g(41),r(),a(42,`button`,32),t(`click`,function(){return i.sex.set(`H`)}),g(43),r()(),E(44,se,3,2,`p`,33),r()(),E(45,ce,1,3,`ui-select`,34),a(46,`ui-select`,35),t(`valueChange`,function(e){return i.role.set(e)}),r(),E(47,le,3,2,`p`,33),l(48,`app-role-access-preview`,36),r(),a(49,`button`,37),t(`click`,function(){return i.addOpen.set(!1)}),g(50),r(),a(51,`button`,38),t(`click`,function(){return i.submitAdd()}),g(52),a(53,`span`,7),l(54,`ui-icon`,39),r()()(),E(55,de,37,26,`ui-modal`,40),E(56,pe,25,42,`ui-modal`,41),E(57,me,5,15,`ui-modal`,42),r()),n&2){let t,n,r;f(`area`,i.t()(`personnel.area`)),_(4),w(i.t()(`personnel.eyebrow`)),_(2),w(i.t()(`personnel.title`)),_(2),w(i.t()(`personnel.description`)),_(2),S(` `,i.t()(`personnel.add`)),_(2),f(`size`,20),_(),f(`stats`,i.stats()),_(),m(i.roleBreakdown().length?14:-1),_(3),f(`size`,20),_(),f(`placeholder`,i.t()(`personnel.search.placeholder`))(`value`,i.query()),C(`aria-label`,i.t()(`personnel.search.aria`)),_(),C(`aria-label`,i.t()(`personnel.col.state`)),_(),e(i.stateFilters()),_(2),m(i.roleFilterOptions().length>2?22:-1),_(2),w(i.t()(`personnel.count`,T(66,W,i.shown().length,i.rows().length))),_(2),m(i.shown().length?26:27),_(2),f(`open`,i.addOpen())(`title`,i.t()(`personnel.add.title`))(`description`,i.t()(`personnel.add.description`))(`width`,700)(`closeLabel`,i.t()(`common.close`)),_(3),f(`label`,i.t()(`tech.dialog.firstName`))(`value`,i.firstName())(`error`,i.errors().firstName??``),_(),f(`label`,i.t()(`tech.dialog.lastName`))(`value`,i.lastName())(`error`,i.errors().lastName??``),_(),f(`label`,i.t()(`tech.dialog.email`))(`hint`,i.t()(`personnel.add.emailHint`))(`value`,i.email())(`error`,i.errors().email??``),_(),f(`label`,i.t()(`tech.dialog.phone`))(`value`,i.phone())(`error`,i.errors().phone??``),_(),f(`label`,i.t()(`adherents.add.age`))(`hint`,i.t()(`tech.dialog.ageHint`))(`value`,i.age())(`error`,i.errors().age??``),_(3),w(i.t()(`adherents.add.sex`)),_(),C(`aria-label`,i.t()(`adherents.add.sex`)),_(),v(`on`,i.sex()===`F`),C(`aria-checked`,i.sex()===`F`),_(),w(i.t()(`adherents.add.female`)),_(),v(`on`,i.sex()===`H`),C(`aria-checked`,i.sex()===`H`),_(),w(i.t()(`adherents.add.male`)),_(),m(i.errors().sex?44:-1),_(),m(i.scoopOptions().length>1?45:-1),_(),f(`label`,i.t()(`personnel.add.role`))(`placeholder`,i.t()(`personnel.add.rolePlaceholder`))(`options`,i.roleOptions())(`value`,i.role()),_(),m(i.errors().role?47:-1),_(),f(`bare`,!0)(`permissions`,i.previewPermissions())(`scoped`,!0)(`hint`,i.t()(`roles.access.hintCreate`))(`emptyText`,i.t()(`roles.access.noneCreate`)),_(2),w(i.t()(`common.cancel`)),_(2),S(` `,i.t()(`personnel.add.submit`)),_(2),f(`size`,18),_(),m((t=i.viewedRow())?55:-1,t),_(),m((n=i.editing())?56:-1,n),_(),m((r=i.toggling())?57:-1,r)}},dependencies:[P,M,z,B,I,H,V,U],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`.lbl[_ngcontent-%COMP%] {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 0.06em;
        text-transform: uppercase;
        color: var(--%NS%v2-ardoise);
      }
      .chip-role[_ngcontent-%COMP%] {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        border-radius: 999px;
        border: 1.5px solid var(--%NS%v2-gris-trait);
        background: var(--%NS%v2-blanc);
        padding: 7px 8px 7px 14px;
        font-size: 14px;
        font-weight: 700;
        color: var(--%NS%v2-encre);
        cursor: pointer;
      }
      .chip-role[_ngcontent-%COMP%]:hover {
        border-color: var(--%NS%v2-foret);
      }
      .chip-role.on[_ngcontent-%COMP%] {
        border-color: var(--%NS%v2-foret);
        background: var(--%NS%v2-foret);
        color: var(--%NS%v2-blanc);
      }
      .chip-role[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
        display: grid;
        min-width: 26px;
        height: 26px;
        place-items: center;
        border-radius: 999px;
        background: var(--%NS%v2-citron);
        color: var(--%NS%v2-foret);
        font-size: 13px;
        font-weight: 800;
      }
      .chip-role[_ngcontent-%COMP%]:focus-visible {
        outline: 2px solid var(--%NS%v2-foret);
        outline-offset: 2px;
      }
      .facts[_ngcontent-%COMP%] {
        display: grid;
        gap: 14px 20px;
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
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
      }
      .field-err[_ngcontent-%COMP%] {
        display: flex;
        align-items: center;
        gap: 6px;
        margin-top: 6px;
        font-size: 13px;
        font-weight: 700;
        color: var(--%NS%v2-erreur-fg);
      }`]})}};export{he as default};