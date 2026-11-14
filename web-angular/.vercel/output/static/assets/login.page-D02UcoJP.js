/* empty css                        */import{$t as e,At as t,Bt as n,F as r,Ft as i,Hn as a,It as o,Jn as s,Jt as ee,Kt as c,Ln as te,Lt as l,M as u,Mt as ne,Nt as d,P as f,Pn as re,St as p,Tn as ie,Vt as m,Wt as h,Xt as g,Yn as _,_t as v,a as ae,en as y,et as oe,fn as b,ft as x,gt as S,hn as C,jt as w,k as T,kt as E,ln as D,mn as O,mt as k,on as A,pn as j,tn as M,vt as N,wn as P,xn as F,zn as I}from"./_router-chunk-H0-n0SZI.js";import{n as L,r as R}from"./index-B8S1FFME.js";import{D as z,E as B,I as V,J as H,K as U,T as W,U as G,W as K,Y as q,dt as se,f as ce,g as le,n as ue,nt as de,q as fe,r as pe,st as me,x as he}from"./lucide-angular-Tekzrdar.js";import{d as ge,f as _e,n as ve,r as ye,t as be}from"./snackbar.component-ICe8-MWg.js";import{h as xe,l as Se,t as Ce}from"./locale.service-Bf8_ncMo.js";import{a as J,o as we,s as Y}from"./auth-BG-Udl8p.js";import{c as X,r as Te}from"./policy-DAuRtV7k.js";import{t as Ee}from"./auth.service-B-LCX0_g.js";import{t as De}from"./store.service-ZF4OfoGo.js";import{i as Oe}from"./ui-CQhTckzj.js";var ke=[`cell`];function Ae(e,n){if(e&1){let e=l();t(0,`input`,3,0),w(`input`,function(t){let n=_(e).$implicit,r=m();return s(r.onCellInput(n,t))})(`keydown`,function(t){let n=_(e).$implicit,r=m();return s(r.onCellKeydown(n,t))})(`paste`,function(t){_(e);let n=m();return s(n.onCellPaste(t))}),E()}if(e&2){let e=n.$implicit,t=m();ne(`disabled`,t.disabled())(`value`,t.digits()[e]),k(`id`,e===0?t.fieldId():null)}}var je=class n{constructor(){this.platformId=I(re),this.fieldId=T(`otp`),this.labelledBy=T(null),this.value=T(``),this.length=T(6),this.disabled=T(!1),this.valueChange=u(),this.complete=u(),this.cells=f(`cell`),this.indices=r(()=>Array.from({length:this.length()},(e,t)=>t)),this.digits=a(Z(6)),this._syncValueFromParent=te(()=>{let e=this.length(),t=this.value().replace(/\D/g,``).slice(0,e);if(t===this.digits().join(``))return;let n=Z(e);for(let e=0;e<t.length;e++)n[e]=t[e];this.digits.set(n)}),oe(()=>{R(this.platformId)&&queueMicrotask(()=>this.focusIndex(0))})}onCellInput(e,t){let n=t.target.value.replace(/\D/g,``).slice(-1);if(!n)this.updateSlot(e,``),this.emit();else if(this.updateSlot(e,n),this.emit(),e<this.length()-1)this.focusIndex(e+1);else{let e=this.digits().join(``);e.length===this.length()&&this.complete.emit(e)}}onCellKeydown(e,t){t.key===`Backspace`?(this.digits()[e]?(this.updateSlot(e,``),this.emit()):e>0&&(this.focusIndex(e-1),this.updateSlot(e-1,``),this.emit()),t.preventDefault()):t.key===`ArrowLeft`&&e>0?(t.preventDefault(),this.focusIndex(e-1)):t.key===`ArrowRight`&&e<this.length()-1&&(t.preventDefault(),this.focusIndex(e+1))}onCellPaste(e){e.preventDefault(),e.stopPropagation();let t=e.clipboardData?.getData(`text`)??``;this.applyPastedDigits(t)}applyPastedDigits(e){let t=e.replace(/\D/g,``).slice(0,this.length());if(!t)return;let n=Z(this.length());for(let e=0;e<t.length;e++)n[e]=t[e];this.digits.set(n),this.emit();let r=Math.min(t.length,this.length())-1;this.focusIndex(r>=0?r:0),t.length===this.length()&&this.complete.emit(t)}updateSlot(e,t){this.digits.update(n=>{let r=[...n];return r[e]=t,r})}emit(){this.valueChange.emit(this.digits().join(``))}focusIndex(e){if(!R(this.platformId))return;let t=this.cells()[e];if(!t)return;let n=t.nativeElement;n.focus(),n.select()}static{this.ɵfac=function(e){return new(e||n)}}static{this.ɵcmp=p({type:n,selectors:[[`app-otp-input`]],viewQuery:function(e,t){e&1&&F(t.cells,ke,5),e&2&&g()},hostAttrs:[`role`,`group`],hostVars:1,hostBindings:function(e,t){e&2&&k(`aria-labelledby`,t.labelledBy())},inputs:{fieldId:[1,`fieldId`],labelledBy:[1,`labelledBy`],value:[1,`value`],length:[1,`length`],disabled:[1,`disabled`]},outputs:{valueChange:`valueChange`,complete:`complete`},decls:3,vars:2,consts:[[`cell`,``],[1,`flex`,`justify-center`,`gap-2`,`max-[359px]:gap-1.5`],[`type`,`text`,`inputmode`,`numeric`,`autocomplete`,`one-time-code`,`maxlength`,`1`,1,`size-12`,`max-[359px]:size-10`,`rounded-md`,`border`,`border-input`,`bg-transparent`,`text-center`,`text-lg`,`tabular`,`shadow-sm`,`focus-visible:outline-none`,`focus-visible:ring-1`,`focus-visible:ring-ring`,`disabled:cursor-not-allowed`,`disabled:opacity-50`,3,`disabled`,`value`],[`type`,`text`,`inputmode`,`numeric`,`autocomplete`,`one-time-code`,`maxlength`,`1`,1,`size-12`,`max-[359px]:size-10`,`rounded-md`,`border`,`border-input`,`bg-transparent`,`text-center`,`text-lg`,`tabular`,`shadow-sm`,`focus-visible:outline-none`,`focus-visible:ring-1`,`focus-visible:ring-ring`,`disabled:cursor-not-allowed`,`disabled:opacity-50`,3,`input`,`keydown`,`paste`,`disabled`,`value`]],template:function(n,r){n&1&&(t(0,`div`,1),y(1,Ae,2,3,`input`,2,M),E()),n&2&&(S(`pointer-events-none`,r.disabled()),x(),e(r.indices()))},encapsulation:2})}};function Z(e){return Array.from({length:e},()=>``)}var Me=e=>({current:e,total:`02`}),Ne=(e,t,n)=>({length:e,email:t,minutes:n}),Pe=e=>({seconds:e}),Q=e=>({to:e}),$=e=>({name:e}),Fe=(e,t)=>t.email;function Ie(e,t){if(e&1){let e=l();o(0,`button`,46),n(`click`,function(){let t=_(e).$implicit,n=m();return s(n.localeService.setLocale(t))}),b(1),i()}if(e&2){let e=t.$implicit,n=m();D(`background`,n.locale()===e?`var(--v2-foret)`:`transparent`)(`color`,n.locale()===e?`var(--v2-blanc)`:`var(--v2-ardoise)`),k(`aria-checked`,n.locale()===e),x(),O(` `,n.t()(e===`fr`?`locale.fr`:`locale.wo`),` `)}}function Le(e,t){if(e&1&&(o(0,`div`,53),d(1,`lucide-angular`,59),o(2,`div`)(3,`div`,60),b(4),i(),o(5,`p`,61),b(6),o(7,`span`,62),b(8),i()()()()),e&2){let e=t,n=m(2);x(),h(`img`,n.icons.inbox)(`size`,18),x(3),O(` `,n.t()(`auth.mail.title`),` `),x(2),C(` `,n.t()(`auth.mail.line`,c(6,Q,e.to)),` `,n.t()(`auth.mail.code`),` `),x(2),j(e.code)}}function Re(e,t){if(e&1){let e=l();o(0,`h1`,47),b(1),i(),o(2,`p`,48),b(3),i(),o(4,`form`,49),n(`submit`,function(t){_(e);let n=m();return t.preventDefault(),s(n.submitOtp(n.otpCode()))}),o(5,`div`,50)(6,`label`,51),b(7),i(),o(8,`app-otp-input`,52),n(`valueChange`,function(t){_(e);let n=m();return s(n.onOtpValueChange(t))})(`complete`,function(t){_(e);let n=m();return s(n.submitOtp(t))}),i()(),N(9,Le,9,8,`div`,53),o(10,`button`,54)(11,`span`),b(12),i(),o(13,`span`,55),d(14,`lucide-angular`,19),i()(),o(15,`div`,56)(16,`button`,57),n(`click`,function(){_(e);let t=m();return s(t.resend())}),d(17,`lucide-angular`,19),b(18),i(),o(19,`button`,58),n(`click`,function(){_(e);let t=m();return s(t.backToCredentials())}),d(20,`lucide-angular`,19),b(21),i()()()}if(e&2){let e,t=m();x(),O(` `,t.t()(`auth.otp.title`),` `),x(2),O(` `,t.t()(`auth.otp.sent`,ee(19,Ne,t.OTP_LENGTH,t.sentInfo()?.maskedEmail??``,t.otpMinutes)),` `),x(4),j(t.t()(`auth.otp.code`)),x(),h(`value`,t.otpCode())(`disabled`,t.otpBusy()),x(),v((e=t.showDemoUi()&&t.demoMail())?9:-1,e),x(),h(`disabled`,t.otpBusy()||t.otpCode().length<t.OTP_LENGTH),x(2),j(t.otpBusy()?t.t()(`auth.otp.verifying`):t.t()(`auth.otp.submit`)),x(2),S(`animate-spin`,t.otpBusy()),h(`img`,t.otpBusy()?t.icons.loader:t.icons.arrowRight)(`size`,22),x(2),h(`disabled`,t.otpBusy()||t.resendWait()>0),x(),h(`img`,t.icons.resend)(`size`,16),x(),O(` `,t.resendWait()>0?t.t()(`auth.otp.resendIn`,c(23,Pe,t.resendWait())):t.t()(`auth.otp.resend`),` `),x(2),h(`img`,t.icons.arrowLeft)(`size`,16),x(),O(` `,t.t()(`auth.otp.back`),` `)}}function ze(e,t){if(e&1&&(o(0,`li`)(1,`p`),b(2),i(),o(3,`span`,76),b(4),i()()),e&2){let e=t.$implicit,n=m(3);x(2),j(n.t()(`auth.mail.invitationLine`,c(2,Q,e.email))),x(2),j(n.t()(`auth.mail.invitationOpen`,c(4,$,e.name)))}}function Be(t,n){if(t&1&&(o(0,`div`,74)(1,`div`,60),b(2),i(),o(3,`ul`,75),y(4,ze,5,6,`li`,null,Fe),i()()),t&2){let t=m(2);x(2),O(` `,t.t()(`auth.mail.invitationTitle`),` `),x(2),e(t.invitationLinks())}}function Ve(e,t){if(e&1){let e=l();o(0,`h1`,47),b(1),i(),o(2,`p`,48),b(3),i(),o(4,`form`,63),n(`submit`,function(t){_(e);let n=m();return s(n.onCredentialsSubmit(t))}),o(5,`div`,50)(6,`label`,64),b(7),i(),o(8,`div`,65)(9,`span`,66),d(10,`lucide-angular`,19),i(),o(11,`input`,67),n(`input`,function(t){_(e);let n=m();return s(n.onEmailInput(t))}),i()()(),o(12,`div`,50)(13,`div`,68)(14,`label`,69),b(15),i(),o(16,`a`,70),b(17),i()(),o(18,`div`,65)(19,`span`,66),d(20,`lucide-angular`,19),i(),o(21,`input`,71),n(`input`,function(t){_(e);let n=m();return s(n.onPasswordInput(t))}),i(),o(22,`button`,72),n(`click`,function(){_(e);let t=m();return s(t.passwordVisible.set(!t.passwordVisible()))}),d(23,`lucide-angular`,19),i()()(),o(24,`button`,73)(25,`span`),b(26),i(),o(27,`span`,55),d(28,`lucide-angular`,19),i()()(),N(29,Be,6,1,`div`,74)}if(e&2){let e=m();x(),O(` `,e.t()(`auth.login.title`),` `),x(2),O(` `,e.t()(`auth.login.description`),` `),x(4),j(e.t()(`auth.login.email`)),x(3),h(`img`,e.icons.mail)(`size`,20),x(),h(`placeholder`,e.t()(`auth.login.emailPlaceholder`))(`value`,e.email()),k(`aria-invalid`,e.emailInvalid()||null),x(4),j(e.t()(`auth.login.password`)),x(2),j(e.t()(`auth.login.forgot`)),x(3),h(`img`,e.icons.lock)(`size`,20),x(),h(`type`,e.passwordVisible()?`text`:`password`)(`placeholder`,e.t()(`auth.login.passwordPlaceholder`))(`value`,e.password()),k(`aria-invalid`,e.passwordInvalid()||null),x(),k(`aria-label`,e.passwordVisible()?e.t()(`auth.password.hide`):e.t()(`auth.password.show`))(`aria-pressed`,e.passwordVisible()),x(),h(`img`,e.passwordVisible()?e.icons.eyeOff:e.icons.eye)(`size`,20),x(),h(`disabled`,e.busy()),x(2),j(e.busy()?e.t()(`auth.login.submitting`):e.t()(`auth.login.submit`)),x(2),S(`animate-spin`,e.busy()),h(`img`,e.busy()?e.icons.loader:e.icons.arrowRight)(`size`,22),x(),v(e.invitationLinks().length>0?29:-1)}}var He=class t{constructor(){this.auth=I(Ee),this.store=I(De),this.router=I(ae),this.destroyRef=I(ie),this.snackbar=I(ve),this.document=I(P),this.localeService=I(Ce),this.cradesc=ge,this.photos=_e,this.locales=[`fr`,`wo`],this.icons={alert:le,arrowLeft:ue,arrowRight:pe,check:ce,clock:he,external:W,eye:B,eyeOff:z,inbox:V,loader:G,lock:K,mail:H,mailCheck:q,phone:de,resend:me,shield:se},this.showDemoUi=()=>Se&&!xe(),this.OTP_LENGTH=6,this.otpMinutes=Math.round(Te/6e4),this.locale=this.localeService.locale,this.t=this.localeService.t,this.invitationLinks=r(()=>(this.store.state(),this.auth.pendingInvitationLinks())),this.step=a({name:`credentials`}),this.demoAdmin=this.showDemoUi()?we.find(e=>e.role===`admin`):void 0,this.email=a(this.demoAdmin?.email??``),this.password=a(this.demoAdmin?Y:``),this.passwordVisible=a(!1),this.emailInvalid=a(!1),this.passwordInvalid=a(!1),this.busy=a(!1),this.otpCode=a(``),this.otpBusy=a(!1),this.now=a(Date.now()),this.sentInfo=r(()=>{let e=this.step();return e.name===`code`?e.sent:null}),this.resendWait=r(()=>{let e=this.sentInfo();return e?(this.now(),Math.max(0,Math.ceil((e.resendAvailableAt-Date.now())/1e3))):0}),this.demoMail=a(this.auth.mailbox.latest());let e=setInterval(()=>this.now.set(Date.now()),500);this.destroyRef.onDestroy(()=>clearInterval(e));let t=this.auth.mailbox.subscribe(()=>{this.demoMail.set(this.auth.mailbox.latest())});this.destroyRef.onDestroy(t)}onEmailInput(e){this.email.set(this.inputValue(e)),this.emailInvalid()&&X(this.email())&&(this.emailInvalid.set(!1),this.snackbar.dismiss())}onPasswordInput(e){this.password.set(this.inputValue(e)),this.passwordInvalid()&&this.password()&&(this.passwordInvalid.set(!1),this.snackbar.dismiss())}validateCredentials(){let e=X(this.email());return this.emailInvalid.set(!e),this.passwordInvalid.set(!this.password()),e?this.password()?e:(this.focus(`password`),this.snackbar.error(this.t()(`auth.login.errorPassword`)),null):(this.focus(`email`),this.snackbar.error(this.t()(`auth.login.errorEmail`)),null)}focus(e){this.document.getElementById(e)?.focus()}inputValue(e){return e.target.value}onOtpValueChange(e){this.otpCode.set(e)}onCredentialsSubmit(e){e.preventDefault(),this.submitCredentials()}async submitCredentials(){if(this.busy())return;let e=this.validateCredentials();if(e){this.busy.set(!0),this.snackbar.dismiss();try{let{challengeId:t,...n}=await this.auth.signIn(e,this.password());this.step.set({name:`code`,challengeId:t,sent:n})}catch(e){this.snackbar.error(J(e,this.t()))}finally{this.busy.set(!1)}}}async submitOtp(e){let t=this.step();if(!(t.name!==`code`||this.otpBusy())){if(e.length<6)this.snackbar.error(this.t()(`auth.otp.errorLength`,{length:6}));else{this.otpBusy.set(!0);try{let n=await this.auth.verifyOtp(t.challengeId,e);this.store.actions.login(n.name,n.email,n.role),await this.router.navigate([`/dashboard`,n.role])}catch(e){this.snackbar.error(J(e,this.t())),this.otpCode.set(``)}finally{this.otpBusy.set(!1)}}}}async resend(){let e=this.step();if(e.name===`code`){this.otpBusy.set(!0);try{let t=await this.auth.resendOtp(e.challengeId);this.step.set({name:`code`,challengeId:e.challengeId,sent:t}),this.otpCode.set(``),this.snackbar.success(this.t()(`auth.otp.resent`))}catch(e){this.snackbar.error(J(e,this.t()))}finally{this.otpBusy.set(!1)}}}backToCredentials(){this.snackbar.dismiss(),this.step.set({name:`credentials`}),this.password.set(this.demoAdmin?Y:``),this.emailInvalid.set(!1),this.passwordInvalid.set(!1),this.otpCode.set(``)}static{this.ɵfac=function(e){return new(e||t)}}static{this.ɵcmp=p({type:t,selectors:[[`app-login-page`]],decls:70,vars:47,consts:[[1,`charte-v2`,`grid`,`min-h-screen`,`grid-cols-[minmax(0,1fr)]`,`lg:h-screen`,`lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`,`lg:overflow-hidden`],[1,`lg:left-[48.8%]`,`lg:justify-start`,`lg:pl-16`,`lg:pr-[260px]`,`lg:pt-[18px]`],[1,`relative`,`hidden`,`overflow-hidden`,`lg:sticky`,`lg:top-0`,`lg:flex`,`lg:h-screen`,`lg:flex-col`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[1,`absolute`,`inset-0`,3,`photos`],[`aria-hidden`,`true`,1,`pointer-events-none`,`absolute`,`inset-0`,2,`background`,`linear-gradient(180deg, color-mix(in oklab, var(--v2-foret) 88%, transparent) 0%, color-mix(in oklab, var(--v2-foret) 35%, transparent) 42%, color-mix(in oklab, var(--v2-foret) 70%, transparent) 68%, color-mix(in oklab, var(--v2-foret) 96%, transparent) 100%)`],[1,`relative`,`flex`,`flex-1`,`flex-col`,`px-12`,`py-10`,`xl:px-16`],[`variant`,`inverse`,3,`size`],[1,`mt-auto`],[1,`max-w-[17em]`,`text-[32px]`,`font-extrabold`,`leading-[1.08]`,`tracking-[-0.03em]`,`text-balance`],[1,`mt-5`,`flex`,`max-w-xl`,`gap-4`],[1,`mt-[0.7em]`,`h-[3px]`,`w-10`,`shrink-0`,`rounded-full`,2,`background`,`var(--v2-citron)`],[1,`text-[18px]`,`font-bold`,`leading-snug`,`tracking-[-0.01em]`,`text-balance`,2,`color`,`var(--v2-citron)`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`ghost`,`mt-10`,`flex`,`max-w-md`,`items-center`,`gap-4`,`rounded-[20px]`,`p-3`,`pr-5`,2,`background`,`var(--v2-blanc)`,`color`,`var(--v2-encre)`,3,`href`],[`width`,`80`,`height`,`70`,1,`h-16`,`w-auto`,`shrink-0`,3,`src`,`alt`],[1,`min-w-0`],[1,`mono`,`block`,2,`color`,`var(--v2-foret-clair)`],[1,`block`,`text-[20px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`,2,`color`,`var(--v2-terre)`],[1,`block`,`text-xs`,`font-semibold`,`leading-snug`,2,`color`,`var(--v2-ardoise)`],[1,`link`,`mt-1.5`,`inline-flex`,`items-center`,`gap-1`,`text-[13px]`],[3,`img`,`size`],[1,`relative`,`flex`,`min-w-0`,`flex-col`,`px-6`,`pb-[max(1.25rem,env(safe-area-inset-bottom))]`,`pt-5`,`sm:px-10`,`lg:h-screen`,`lg:overflow-y-auto`,`lg:px-16`,`lg:py-6`],[1,`flex`,`items-center`,`justify-between`,`gap-3`],[`variant`,`color`,1,`lg:invisible`,3,`size`],[`role`,`radiogroup`,1,`inline-flex`,`gap-1`,`rounded-[14px]`,`border`,`p-1`,`text-[13px]`,`font-bold`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`],[`type`,`button`,`role`,`radio`,1,`ghost`,`rounded-[10px]`,`px-3.5`,`py-1.5`,`transition-colors`,3,`background`,`color`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`ghost`,`mt-5`,`flex`,`items-center`,`gap-3`,`rounded-[20px]`,`border`,`p-3`,`lg:hidden`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`,3,`href`],[`alt`,``,`width`,`60`,`height`,`52`,1,`h-11`,`w-auto`,`shrink-0`,3,`src`],[1,`mono`,`block`,2,`color`,`var(--v2-gris-texte)`],[1,`block`,`text-[15px]`,`font-extrabold`,2,`color`,`var(--v2-terre)`],[1,`block`,`truncate`,`text-xs`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`link`,`mt-0.5`,`inline-flex`,`items-center`,`gap-1`,`text-xs`],[1,`flex`,`flex-1`,`items-start`,`justify-center`,`py-8`,`lg:items-center`,`lg:py-4`],[1,`form-col`,`w-full`,`max-w-[480px]`],[1,`mono`,`inline-flex`,`items-center`,`gap-1.5`,`whitespace-nowrap`,`rounded-full`,`px-3`,`py-1.5`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`aria-hidden`,`true`,1,`mt-3`,`flex`,`max-w-[200px]`,`gap-1.5`],[1,`h-1`,`flex-1`,`rounded-full`,2,`background`,`var(--v2-foret)`],[1,`h-1`,`flex-1`,`rounded-full`,`transition-colors`],[1,`help`,`mt-8`,`flex`,`items-center`,`gap-4`,`border-t`,`pt-6`,2,`border-color`,`var(--v2-bord-carte)`],[1,`grid`,`size-12`,`shrink-0`,`place-items-center`,`rounded-[14px]`,`border`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`],[`alt`,``,`width`,`40`,`height`,`34`,1,`h-8`,`w-auto`,3,`src`],[1,`min-w-0`,`text-[15px]`],[1,`font-bold`],[1,`mt-0.5`,`flex`,`flex-wrap`,`gap-x-4`,`gap-y-1`],[1,`link`,`inline-flex`,`items-center`,`gap-1.5`,3,`href`],[1,`link`,`inline-flex`,`items-center`,`gap-1.5`,`tabular-nums`,3,`href`],[1,`session-note`,`flex`,`items-center`,`justify-center`,`gap-1.5`,`text-xs`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,`role`,`radio`,1,`ghost`,`rounded-[10px]`,`px-3.5`,`py-1.5`,`transition-colors`,3,`click`],[`id`,`auth-title`,1,`mt-7`,`text-[32px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`lg:text-[40px]`],[1,`mt-3`,`text-base`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-8`,`space-y-5`,3,`submit`],[1,`space-y-2.5`],[`id`,`otp-label`,`for`,`otp`,1,`label`],[`fieldId`,`otp`,`labelledBy`,`otp-label`,3,`valueChange`,`complete`,`value`,`disabled`],[`role`,`status`,1,`flex`,`gap-3`,`rounded-[16px]`,`border-2`,`border-dashed`,`p-3.5`,`text-sm`,2,`border-color`,`var(--v2-gris-trait)`,`background`,`var(--v2-blanc)`],[`type`,`submit`,1,`btn-primary`,3,`disabled`],[`aria-hidden`,`true`,1,`btn-chip`],[1,`flex`,`flex-wrap`,`items-center`,`justify-between`,`gap-3`,`text-[15px]`],[`type`,`button`,1,`link`,`inline-flex`,`items-center`,`gap-1.5`,`disabled:cursor-not-allowed`,`disabled:no-underline`,`disabled:opacity-60`,3,`click`,`disabled`],[`type`,`button`,1,`ghost`,`inline-flex`,`items-center`,`gap-1.5`,`font-semibold`,2,`color`,`var(--v2-gris-texte)`,3,`click`],[1,`mt-0.5`,`shrink-0`,2,`color`,`var(--v2-gris-texte)`,3,`img`,`size`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-1`,`font-medium`],[1,`font-bold`,`tracking-[0.2em]`,2,`font-family`,`var(--v2-font-mono)`],[`novalidate`,``,1,`mt-8`,`space-y-5`,3,`submit`],[`for`,`email`,1,`label`],[1,`relative`],[`aria-hidden`,`true`,1,`pointer-events-none`,`absolute`,`inset-y-0`,`left-0`,`grid`,`w-14`,`place-items-center`,2,`color`,`var(--v2-gris-texte)`],[`id`,`email`,`type`,`email`,`autocomplete`,`username`,`inputmode`,`email`,`autocapitalize`,`none`,`spellcheck`,`false`,`autofocus`,``,1,`field`,3,`input`,`placeholder`,`value`],[1,`flex`,`items-baseline`,`justify-between`,`gap-2`],[`for`,`password`,1,`label`],[`routerLink`,`/mot-de-passe-oublie`,1,`link`,`text-sm`],[`id`,`password`,`autocomplete`,`current-password`,`spellcheck`,`false`,`autocapitalize`,`none`,1,`field`,`pr-16`,3,`input`,`type`,`placeholder`,`value`],[`type`,`button`,1,`ghost`,`absolute`,`right-2`,`top-1/2`,`grid`,`size-12`,`-translate-y-1/2`,`place-items-center`,`rounded-[14px]`,`transition-colors`,`hover:bg-[var(--v2-sauge)]`,2,`color`,`var(--v2-ardoise)`,3,`click`],[`type`,`submit`,1,`btn-primary`,`!mt-7`,3,`disabled`],[`role`,`status`,1,`mt-5`,`rounded-[16px]`,`border-2`,`border-dashed`,`p-3.5`,`text-sm`,2,`border-color`,`var(--v2-gris-trait)`,`background`,`var(--v2-blanc)`],[1,`mt-1`,`space-y-2`],[1,`font-bold`,2,`color`,`var(--v2-foret-clair)`]],template:function(t,n){t&1&&(o(0,`div`,0),d(1,`ui-snackbar`,1),o(2,`aside`,2),d(3,`ui-photo-slideshow`,3)(4,`div`,4),o(5,`div`,5),d(6,`ui-brand-logo`,6),o(7,`div`,7)(8,`p`,8),b(9),i(),o(10,`div`,9),d(11,`span`,10),o(12,`p`,11),b(13),i()(),o(14,`a`,12),d(15,`img`,13),o(16,`span`,14)(17,`span`,15),b(18),i(),o(19,`span`,16),b(20),i(),o(21,`span`,17),b(22),i(),o(23,`span`,18),b(24),d(25,`lucide-angular`,19),i()()()()()(),o(26,`main`,20)(27,`header`,21),d(28,`ui-brand-logo`,22),o(29,`div`,23),y(30,Ie,2,6,`button`,24,M),i()(),o(32,`a`,25),d(33,`img`,26),o(34,`span`,14)(35,`span`,27),b(36),i(),o(37,`span`,28),b(38),i(),o(39,`span`,29),b(40),i(),o(41,`span`,30),b(42),d(43,`lucide-angular`,19),i()()(),o(44,`div`,31)(45,`div`,32)(46,`span`,33),d(47,`lucide-angular`,19),b(48),i(),o(49,`div`,34),d(50,`span`,35)(51,`span`,36),i(),N(52,Re,22,25)(53,Ve,30,27),o(54,`div`,37)(55,`span`,38),d(56,`img`,39),i(),o(57,`div`,40)(58,`p`,41),b(59),i(),o(60,`div`,42)(61,`a`,43),d(62,`lucide-angular`,19),b(63),i(),o(64,`a`,44),d(65,`lucide-angular`,19),b(66),i()()()()()(),o(67,`p`,45),d(68,`lucide-angular`,19),b(69),i()()()),t&2&&(x(3),h(`photos`,n.photos),x(3),h(`size`,56),x(3),O(` `,n.t()(`auth.layout.headline`),` `),x(4),O(` `,n.t()(`auth.layout.lead`),` `),x(),h(`href`,n.cradesc.url,A),k(`aria-label`,n.t()(`auth.cradesc.visit`)),x(),h(`src`,n.cradesc.emblem)(`alt`,n.t()(`auth.cradesc.logoAlt`)),x(3),j(n.t()(`auth.cradesc.carriedBy`)),x(2),j(n.cradesc.acronym),x(2),j(n.t()(`auth.cradesc.fullName`)),x(2),O(` `,n.cradesc.urlLabel,` `),x(),h(`img`,n.icons.external)(`size`,13),x(3),h(`size`,40),x(),k(`aria-label`,n.t()(`locale.fr`)+` / `+n.t()(`locale.wo`)),x(),e(n.locales),x(2),h(`href`,n.cradesc.url,A),k(`aria-label`,n.t()(`auth.cradesc.visit`)),x(),h(`src`,n.cradesc.emblem),x(3),j(n.t()(`auth.cradesc.carriedBy`)),x(2),j(n.cradesc.acronym),x(2),j(n.t()(`auth.cradesc.fullName`)),x(2),j(n.cradesc.urlLabel),x(),h(`img`,n.icons.external)(`size`,12),x(4),h(`img`,n.icons.shield)(`size`,14),x(),C(` `,n.t()(`auth.step.progress`,c(45,Me,n.step().name===`code`?`02`:`01`)),` · `,n.step().name===`code`?n.t()(`auth.step.code`):n.t()(`auth.step.credentials`),` `),x(3),D(`background`,n.step().name===`code`?`var(--v2-foret)`:`var(--v2-lin)`),x(),v(n.step().name===`code`?52:53),x(4),h(`src`,n.cradesc.emblem),x(3),j(n.t()(`auth.help.title`)),x(2),h(`href`,`mailto:`+n.cradesc.email,A),x(),h(`img`,n.icons.mail)(`size`,15),x(),O(``,n.cradesc.email,` `),x(),h(`href`,`tel:`+n.cradesc.phoneHref,A),x(),h(`img`,n.icons.phone)(`size`,15),x(),O(``,n.cradesc.phone,` `),x(2),h(`img`,n.icons.clock)(`size`,14),x(),O(` `,n.t()(`auth.login.footer`),` `))},dependencies:[je,L,fe,U,ye,be,Oe],styles:[`
    button[_ngcontent-%COMP%]:not(:disabled), 
   a[href][_ngcontent-%COMP%], 
   [role="radio"][_ngcontent-%COMP%] {
      cursor: pointer;
    }
    button[_ngcontent-%COMP%]:disabled {
      cursor: not-allowed;
    }
    .mono[_ngcontent-%COMP%] {
      font-family: var(--%NS%v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    .label[_ngcontent-%COMP%] {
      display: block;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--%NS%v2-ardoise);
    }
    .field[_ngcontent-%COMP%] {
      height: 60px;
      width: 100%;
      border-radius: var(--%NS%v2-radius-champ);
      
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      padding-left: 56px;
      padding-right: 16px;
      font-size: 16px;
      font-weight: 500;
      color: var(--%NS%v2-encre);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    @media (max-width: 420px) {
      [_nghost-%COMP%]     app-otp-input input {
        width: 46px;
        height: 58px;
      }
    }
    
    @media (min-width: 1024px) and (max-height: 820px) {
      .form-col[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%] {
        margin-top: 1rem;
        font-size: 34px;
      }
      .form-col[_ngcontent-%COMP%]   form[_ngcontent-%COMP%] {
        margin-top: 1.25rem;
      }
      .form-col[_ngcontent-%COMP%]   form[_ngcontent-%COMP%]    > *[_ngcontent-%COMP%]    + *[_ngcontent-%COMP%] {
        margin-top: 0.875rem;
      }
      .form-col[_ngcontent-%COMP%]   .field[_ngcontent-%COMP%] {
        height: 54px;
      }
      .form-col[_ngcontent-%COMP%]   .btn-primary[_ngcontent-%COMP%] {
        height: 58px;
        margin-top: 1.125rem !important;
      }
      .form-col[_ngcontent-%COMP%]   .help[_ngcontent-%COMP%] {
        margin-top: 1.25rem;
        padding-top: 1rem;
      }
      .session-note[_ngcontent-%COMP%] {
        display: none;
      }
    }
    .field[_ngcontent-%COMP%]::placeholder {
      color: var(--%NS%v2-gris-texte);
      opacity: 0.75;
      font-weight: 500;
    }
    .field[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .field[_ngcontent-%COMP%]:focus-visible {
      outline: none;
      border: 2px solid var(--%NS%v2-foret);
      padding-left: 55.5px;
      box-shadow: var(--%NS%v2-halo);
    }
    .field[aria-invalid="true"][_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-erreur-fg);
      padding-left: 55.5px;
    }
    .btn-primary[_ngcontent-%COMP%] {
      display: flex;
      height: 64px;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      border-radius: var(--%NS%v2-radius-champ);
      background: var(--%NS%v2-foret);
      padding: 0 8px 0 24px;
      font-size: 17px;
      font-weight: 800;
      color: var(--%NS%v2-blanc);
      transition: background-color 0.15s ease;
    }
    .btn-primary[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    .btn-primary[_ngcontent-%COMP%]:focus-visible {
      outline: none;
      box-shadow: var(--%NS%v2-halo);
    }
    .btn-primary[_ngcontent-%COMP%]:disabled {
      background: var(--%NS%v2-lin);
      color: var(--%NS%v2-gris-texte);
      pointer-events: none;
    }
    .btn-chip[_ngcontent-%COMP%] {
      display: grid;
      height: 48px;
      width: 48px;
      place-items: center;
      border-radius: 14px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }
    .btn-primary[_ngcontent-%COMP%]:disabled   .btn-chip[_ngcontent-%COMP%] {
      background: var(--%NS%v2-gris-trait);
      color: var(--%NS%v2-blanc);
    }
    .link[_ngcontent-%COMP%] {
      font-weight: 700;
      color: var(--%NS%v2-foret-clair);
      text-underline-offset: 3px;
    }
    .link[_ngcontent-%COMP%]:hover {
      text-decoration: underline;
    }
    .link[_ngcontent-%COMP%]:focus-visible, 
   .ghost[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
      border-radius: 6px;
    }
    [_nghost-%COMP%]     app-otp-input input {
      height: 64px;
      width: 56px;
      border-radius: 16px;
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      font-family: var(--%NS%v2-font-mono);
      font-size: 20px;
      font-weight: 700;
      color: var(--%NS%v2-encre);
      box-shadow: none;
    }
    [_nghost-%COMP%]     app-otp-input input:focus-visible {
      outline: none;
      border: 2px solid var(--%NS%v2-foret);
      box-shadow: var(--%NS%v2-halo);
    }
    @media (max-width: 359px) {
      [_nghost-%COMP%]     app-otp-input input {
        width: 42px;
        height: 56px;
      }
    }`]})}};export{He as default};