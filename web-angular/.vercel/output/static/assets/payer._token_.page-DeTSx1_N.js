/* empty css                        */import{d as e,h as t,l as n,p as r,r as i}from"./snackbar.component-ICe8-MWg.js";import{$t as a,Bt as o,F as s,Ft as c,Hn as l,It as u,Jn as d,Kt as f,Lt as p,Nt as m,Pt as h,Qt as ee,St as g,Vt as _,Wt as v,Yn as y,_t as b,dn as x,en as S,fn as C,ft as w,gt as T,hn as E,ln as D,mn as O,mt as k,on as A,pn as j,qt as M,t as N,tn as P,un as F,vt as I,zn as L}from"./_router-chunk-H0-n0SZI.js";import{W as R,t as z}from"./locale.service-Bf8_ncMo.js";import{t as B}from"./payment-provider-Bx4b7190.js";import{t as V}from"./store.service-ZF4OfoGo.js";import"./ui-CQhTckzj.js";var H=(e,t)=>({author:e,license:t}),U=e=>({period:e}),W=e=>({scoop:e}),G=(e,t)=>({amount:e,channel:t}),K=e=>({receipt:e}),q=e=>({date:e}),J=(e,t)=>t.id;function Y(e,t){if(e&1&&(u(0,`span`,58),C(1),c()),e&2){let e=_(2);w(),j(e.phone)}}function X(e,t){if(e&1&&m(0,`img`,22),e&2){let e=t.$implicit,n=_().$implicit;T(`wordmark`,n.wordmark)(`card`,n.id===`carte`),v(`src`,e)}}function Z(e,t){if(e&1&&(u(0,`span`,73),C(1),c()),e&2){let e=_().$implicit,t=_(3);w(),j(e.id===`carte`?t.t()(`pay.card`):e.label)}}function Q(e,t){e&1&&m(0,`ui-icon`,75),e&2&&v(`size`,13)}function te(e,t){if(e&1){let e=p();u(0,`button`,70),o(`click`,function(){let t=y(e).$implicit,n=_(3);return d(n.pick(t))}),u(1,`span`,71),S(2,X,1,5,`img`,72,P),c(),I(4,Z,2,1,`span`,73),u(5,`span`,74),I(6,Q,1,1,`ui-icon`,75),c()()}if(e&2){let e=t.$implicit,n=_(3);T(`on`,n.picked()?.id===e.id),k(`aria-checked`,n.picked()?.id===e.id)(`aria-label`,e.label),w(2),a(e.logos),w(2),b(e.wordmark?-1:4),w(2),b(n.picked()?.id===e.id?6:-1)}}function ne(e,t){if(e&1&&(u(0,`p`,69),m(1,`ui-icon`,76),u(2,`span`)(3,`strong`),C(4),c(),C(5),c()()),e&2){let e=_(3);w(),v(`size`,18),w(3),O(``,e.t()(`pay.notConfigured.title`),`.`),w(),O(` `,e.t()(`pay.notConfigured`))}}function re(e,t){if(e&1){let e=p();u(0,`h1`,50),C(1),c(),u(2,`p`,51),C(3),c(),u(4,`div`,52)(5,`div`,53)(6,`span`,54),m(7,`ui-icon`,55),c(),u(8,`span`,15)(9,`span`,56),C(10),c(),u(11,`span`,57),C(12),c(),I(13,Y,2,1,`span`,58),c()(),u(14,`div`,53)(15,`span`,54),m(16,`ui-icon`,59),c(),u(17,`span`,60)(18,`span`,56),C(19),c(),u(20,`span`,61),C(21),c()()()(),u(22,`p`,62),C(23),c(),u(24,`div`,63),S(25,te,7,6,`button`,64,J),c(),u(27,`button`,65),o(`click`,function(){y(e);let t=_(2);return d(t.pay())}),u(28,`span`,66),C(29),c(),u(30,`span`,67),m(31,`ui-icon`,68),c()(),I(32,ne,6,3,`p`,69)}if(e&2){let e=_(),t=_();w(),j(t.t()(`pay.title`)),w(2),j(t.t()(`pay.lead`,f(14,W,e.scoop))),w(4),v(`size`,20),w(3),j(t.t()(`pay.member`)),w(2),j(e.fullName),w(),b(e.phone?13:-1),w(3),v(`size`,20),w(3),j(t.t()(`pay.amount`)),w(2),O(``,t.nf.format(e.amount),` FCFA`),w(2),j(t.t()(`pay.method`)),w(2),a(t.channels),w(2),v(`disabled`,!t.picked()),w(2),j(t.picked()?t.t()(`pay.payWith`,M(16,G,t.nf.format(e.amount),t.picked().label)):t.t()(`pay.choose`)),w(2),v(`size`,20),w(),b(t.notConfigured()?32:-1)}}function ie(e,t){if(e&1&&(u(0,`h1`,50),C(1),c(),u(2,`p`,77),C(3),c()),e&2){let e=_(),t=_();w(),O(` `,t.t()(e.status===`payé`?`pay.paid.title`:e.expired?`pay.expired.title`:`pay.cancelled.title`),` `),w(2),O(` `,e.status===`payé`?t.t()(`pay.done`,f(2,K,t.receipt())):t.t()(e.expired?`pay.expired`:`pay.cancelled`),` `)}}function ae(e,t){if(e&1&&(u(0,`span`,48),m(1,`ui-icon`,49),C(2),c(),I(3,re,33,19)(4,ie,4,4)),e&2){let e=t,n=_();w(),v(`size`,14),w(),E(``,n.t()(`pay.eyebrowPeriod`,f(4,U,e.period)),` · `,n.t()(`pay.secureShort`),` `),w(),b(e.payable?3:4)}}function oe(e,t){if(e&1&&(u(0,`h1`,78),C(1),c(),u(2,`p`,77),C(3),c()),e&2){let e=_();w(),j(e.t()(`pay.notFound.title`)),w(2),j(e.t()(`pay.notFound.text`))}}function $(e,t){if(e&1&&(u(0,`p`,47),m(1,`ui-icon`,79),C(2),c()),e&2){let e=_();w(),v(`size`,14),w(),O(``,e.t()(`pay.validUntil`,f(2,q,e.view().expires)),` `)}}function se(e,t){if(e&1){let e=p();u(0,`button`,82),o(`click`,function(){let t=y(e).$implicit,n=_(2);return d(n.localeService.setLocale(t))}),C(1),c()}if(e&2){let e=t.$implicit,n=_(2);D(`background`,n.localeService.locale()===e?`var(--v2-foret)`:`transparent`)(`color`,n.localeService.locale()===e?`var(--v2-blanc)`:`var(--v2-ardoise)`),k(`aria-checked`,n.localeService.locale()===e),w(),O(` `,n.t()(e===`fr`?`locale.fr`:`locale.wo`),` `)}}function ce(e,t){if(e&1&&(u(0,`div`,80),S(1,se,2,6,`button`,81,P),c()),e&2){let e=_();k(`aria-label`,e.t()(`locale.fr`)+` / `+e.t()(`locale.wo`)),w(),a(e.locales)}}var le=class a{constructor(){this.store=L(V),this.localeService=L(z),this.t=this.localeService.t,this.nf=R,this.cradesc=e,this.photo=r,this.locales=[`fr`,`wo`],this.channels=B,this.picked=l(null),this.notConfigured=l(!1),this.token=L(N).snapshot.paramMap.get(`token`)??``,this.link=s(()=>this.store.state().paymentLinks.find(e=>e.token===this.token)??null),this.view=s(()=>{let e=this.link();if(!e)return null;let t=this.store.state(),n=t.members.find(t=>t.id===e.memberId),r=e.status===`en attente`&&Date.parse(e.expiresAt)<Date.now();return{amount:e.amount,period:e.period,status:e.status,expired:r,payable:e.status===`en attente`&&!r,scoop:t.scoops.find(t=>t.id===e.scoopId)?.name??``,fullName:n?`${n.firstName} ${n.lastName}`:``,phone:n?.phone??``,expires:this.localeService.formatDate(e.expiresAt,{day:`numeric`,month:`long`,year:`numeric`})}}),this.receipt=s(()=>{let e=this.link();return this.store.state().payments.find(t=>t.id===e?.paymentId)?.receipt??``})}pick(e){this.picked.set(e),this.notConfigured.set(!1)}pay(){this.notConfigured.set(!0)}static{this.ɵfac=function(e){return new(e||a)}}static{this.ɵcmp=g({type:a,selectors:[[`app-payer-page`]],decls:69,vars:47,consts:[[`localeSwitch`,``],[1,`charte-v2`,`grid`,`min-h-screen`,`grid-cols-[minmax(0,1fr)]`,`lg:h-screen`,`lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)]`,`lg:overflow-hidden`],[1,`relative`,`hidden`,`overflow-hidden`,`lg:sticky`,`lg:top-0`,`lg:flex`,`lg:h-screen`,`lg:flex-col`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[`alt`,``,1,`absolute`,`inset-0`,`h-full`,`w-full`,`object-cover`,3,`src`],[`aria-hidden`,`true`,1,`pointer-events-none`,`absolute`,`inset-0`,2,`background`,`linear-gradient(180deg, color-mix(in oklab, var(--v2-foret) 88%, transparent) 0%, color-mix(in oklab, var(--v2-foret) 35%, transparent) 42%, color-mix(in oklab, var(--v2-foret) 70%, transparent) 68%, color-mix(in oklab, var(--v2-foret) 96%, transparent) 100%)`],[1,`relative`,`flex`,`flex-1`,`flex-col`,`px-12`,`py-10`,`xl:px-16`],[`variant`,`inverse`,3,`size`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`credit`,3,`href`],[1,`mt-auto`],[1,`max-w-[17em]`,`text-[32px]`,`font-extrabold`,`leading-[1.08]`,`tracking-[-0.03em]`,`text-balance`],[1,`mt-5`,`flex`,`max-w-xl`,`gap-4`],[1,`mt-[0.7em]`,`h-[3px]`,`w-10`,`shrink-0`,`rounded-full`,2,`background`,`var(--v2-citron)`],[1,`text-[18px]`,`font-bold`,`leading-snug`,`tracking-[-0.01em]`,`text-balance`,2,`color`,`var(--v2-citron)`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`ghost`,`mt-10`,`flex`,`max-w-md`,`items-center`,`gap-4`,`rounded-[20px]`,`p-3`,`pr-5`,2,`background`,`var(--v2-blanc)`,`color`,`var(--v2-encre)`,3,`href`],[`width`,`80`,`height`,`70`,1,`h-16`,`w-auto`,`shrink-0`,3,`src`,`alt`],[1,`min-w-0`],[1,`mono`,`block`,2,`color`,`var(--v2-foret-clair)`],[1,`block`,`text-[20px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`,2,`color`,`var(--v2-terre)`],[1,`block`,`text-xs`,`font-semibold`,`leading-snug`,2,`color`,`var(--v2-ardoise)`],[1,`link`,`mt-1.5`,`inline-flex`,`items-center`,`gap-1`,`text-[13px]`],[1,`relative`,`flex`,`min-w-0`,`flex-col`,`px-6`,`pb-[max(1.25rem,env(safe-area-inset-bottom))]`,`pt-5`,`sm:px-10`,`lg:h-screen`,`lg:overflow-y-auto`,`lg:px-16`,`lg:py-6`],[1,`band`,`-mx-6`,`-mt-5`,`mb-5`,`sm:-mx-10`,`lg:hidden`],[`alt`,``,3,`src`],[`aria-hidden`,`true`,1,`band-veil`],[1,`relative`,`flex`,`h-full`,`flex-col`,`justify-between`,`px-6`,`pb-4`,`pt-5`,`sm:px-10`],[1,`flex`,`items-center`,`justify-between`,`gap-3`],[3,`ngTemplateOutlet`],[1,`max-w-[18em]`,`text-[19px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`,`text-balance`,2,`color`,`var(--v2-blanc)`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`credit`,`credit-band`,3,`href`],[1,`hidden`,`items-center`,`justify-end`,`gap-3`,`lg:flex`],[`target`,`_blank`,`rel`,`noopener noreferrer`,1,`ghost`,`flex`,`items-center`,`gap-3`,`rounded-[20px]`,`border`,`p-3`,`lg:hidden`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`,3,`href`],[`alt`,``,`width`,`60`,`height`,`52`,1,`h-11`,`w-auto`,`shrink-0`,3,`src`],[1,`mono`,`block`,2,`color`,`var(--v2-gris-texte)`],[1,`block`,`text-[15px]`,`font-extrabold`,2,`color`,`var(--v2-terre)`],[1,`block`,`truncate`,`text-xs`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`flex`,`flex-1`,`items-start`,`justify-center`,`py-7`,`lg:items-center`,`lg:py-4`],[1,`w-full`,`max-w-[480px]`],[1,`mt-8`,`flex`,`items-center`,`gap-4`,`border-t`,`pt-6`,2,`border-color`,`var(--v2-bord-carte)`],[1,`grid`,`size-12`,`shrink-0`,`place-items-center`,`rounded-[14px]`,`border`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`],[`alt`,``,`width`,`40`,`height`,`34`,1,`h-8`,`w-auto`,3,`src`],[1,`min-w-0`,`text-[15px]`],[1,`font-bold`],[1,`mt-0.5`,`flex`,`flex-wrap`,`gap-x-4`,`gap-y-1`],[1,`link`,`inline-flex`,`items-center`,`gap-1.5`,3,`href`],[`name`,`mail`,3,`size`],[1,`link`,`inline-flex`,`items-center`,`gap-1.5`,`tabular-nums`,3,`href`],[`name`,`call`,3,`size`],[1,`flex`,`items-center`,`justify-center`,`gap-1.5`,`text-xs`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`mono`,`inline-flex`,`items-center`,`gap-1.5`,`whitespace-nowrap`,`rounded-full`,`px-3`,`py-1.5`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[`name`,`lock`,3,`size`],[1,`mt-5`,`text-[32px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`lg:text-[40px]`],[1,`mt-2`,`text-[16px]`,`font-medium`,`leading-relaxed`,2,`color`,`var(--v2-gris-texte)`],[1,`recap`,`mt-6`],[1,`recap-row`],[`aria-hidden`,`true`,1,`recap-ico`],[`name`,`person`,3,`size`],[1,`label`],[1,`block`,`truncate`,`text-[16px]`,`font-extrabold`],[1,`block`,`text-[13px]`,`font-semibold`,`tabular-nums`,2,`color`,`var(--v2-gris-texte)`],[`name`,`payments`,3,`size`],[1,`min-w-0`,`flex-1`],[1,`block`,`text-[24px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`,`tabular-nums`,2,`color`,`var(--v2-foret)`],[`id`,`pay-with`,1,`label`,`mt-6`],[`role`,`radiogroup`,`aria-labelledby`,`pay-with`,1,`mt-2`,`grid`,`grid-cols-2`,`gap-2.5`],[`type`,`button`,`role`,`radio`,1,`channel`,3,`on`],[`type`,`button`,1,`btn-primary`,`mt-6`,3,`click`,`disabled`],[1,`min-w-0`,`truncate`,`text-left`],[`aria-hidden`,`true`,1,`btn-chip`],[`name`,`arrow_forward`,3,`size`],[`role`,`alert`,1,`mt-3`,`flex`,`items-start`,`gap-2.5`,`rounded-[16px]`,`px-4`,`py-3`,`text-[14px]`,`leading-snug`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[`type`,`button`,`role`,`radio`,1,`channel`,3,`click`],[`aria-hidden`,`true`,1,`logos`],[`alt`,``,3,`src`,`wordmark`,`card`],[`aria-hidden`,`true`,1,`min-w-0`,`truncate`],[`aria-hidden`,`true`,1,`radio`],[`name`,`check`,3,`size`],[`name`,`warning`,1,`mt-0.5`,`shrink-0`,3,`size`],[1,`mt-3`,`text-[16px]`,`font-medium`,`leading-relaxed`,2,`color`,`var(--v2-gris-texte)`],[1,`text-[32px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`lg:text-[40px]`],[`name`,`calendar_today`,3,`size`],[`role`,`radiogroup`,1,`inline-flex`,`gap-1`,`rounded-[14px]`,`border`,`p-1`,`text-[13px]`,`font-bold`,2,`border-color`,`var(--v2-bord-carte)`,`background`,`var(--v2-blanc)`],[`type`,`button`,`role`,`radio`,1,`ghost`,`rounded-[10px]`,`px-3.5`,`py-1.5`,`transition-colors`,3,`background`,`color`],[`type`,`button`,`role`,`radio`,1,`ghost`,`rounded-[10px]`,`px-3.5`,`py-1.5`,`transition-colors`,3,`click`]],template:function(e,t){if(e&1&&(u(0,`div`,1)(1,`aside`,2),m(2,`img`,3)(3,`div`,4),u(4,`div`,5),m(5,`ui-brand-logo`,6),u(6,`a`,7),C(7),c(),u(8,`div`,8)(9,`p`,9),C(10),c(),u(11,`div`,10),m(12,`span`,11),u(13,`p`,12),C(14),c()(),u(15,`a`,13),m(16,`img`,14),u(17,`span`,15)(18,`span`,16),C(19),c(),u(20,`span`,17),C(21),c(),u(22,`span`,18),C(23),c(),u(24,`span`,19),C(25),c()()()()()(),u(26,`main`,20)(27,`div`,21),m(28,`img`,22)(29,`div`,23),u(30,`div`,24)(31,`div`,25),m(32,`ui-brand-logo`,6),h(33,26),c(),u(34,`p`,27),C(35),c()(),u(36,`a`,28),C(37),c()(),u(38,`header`,29),h(39,26),c(),u(40,`a`,30),m(41,`img`,31),u(42,`span`,15)(43,`span`,32),C(44),c(),u(45,`span`,33),C(46),c(),u(47,`span`,34),C(48),c()()(),u(49,`div`,35)(50,`div`,36),I(51,ae,5,6)(52,oe,4,2),u(53,`div`,37)(54,`span`,38),m(55,`img`,39),c(),u(56,`div`,40)(57,`p`,41),C(58),c(),u(59,`div`,42)(60,`a`,43),m(61,`ui-icon`,44),C(62),c(),u(63,`a`,45),m(64,`ui-icon`,46),C(65),c()()()()()(),I(66,$,3,4,`p`,47),c()(),F(67,ce,3,1,`ng-template`,null,0,x)),e&2){let e,n=ee(68);w(2),D(`object-position`,t.photo.position),v(`src`,t.photo.src),w(3),v(`size`,56),w(),v(`href`,t.photo.source,A),w(),j(t.t()(`pay.photoCredit`,M(41,H,t.photo.author,t.photo.license))),w(3),j(t.t()(`pay.layout.headline`)),w(4),j(t.t()(`pay.layout.lead`)),w(),v(`href`,t.cradesc.url,A),k(`aria-label`,t.t()(`auth.cradesc.visit`)),w(),v(`src`,t.cradesc.emblem)(`alt`,t.t()(`auth.cradesc.logoAlt`)),w(3),j(t.t()(`auth.cradesc.carriedBy`)),w(2),j(t.cradesc.acronym),w(2),j(t.t()(`auth.cradesc.fullName`)),w(2),j(t.cradesc.urlLabel),w(3),D(`object-position`,t.photo.position),v(`src`,t.photo.src),w(4),v(`size`,38),w(),v(`ngTemplateOutlet`,n),w(2),j(t.t()(`pay.layout.headline`)),w(),v(`href`,t.photo.source,A),w(),j(t.t()(`pay.photoCredit`,M(44,H,t.photo.author,t.photo.license))),w(2),v(`ngTemplateOutlet`,n),w(),v(`href`,t.cradesc.url,A),k(`aria-label`,t.t()(`auth.cradesc.visit`)),w(),v(`src`,t.cradesc.emblem),w(3),j(t.t()(`auth.cradesc.carriedBy`)),w(2),j(t.cradesc.acronym),w(2),j(t.t()(`auth.cradesc.fullName`)),w(3),b((e=t.view())?51:52,e),w(4),v(`src`,t.cradesc.emblem),w(3),j(t.t()(`pay.help`)),w(2),v(`href`,`mailto:`+t.cradesc.email,A),w(),v(`size`,15),w(),j(t.cradesc.email),w(),v(`href`,`tel:`+t.cradesc.phoneHref,A),w(),v(`size`,15),w(),j(t.cradesc.phone),w(),b(t.view()?.payable?66:-1)}},dependencies:[i,n,t],styles:[`button[_ngcontent-%COMP%]:not(:disabled), 
   a[href][_ngcontent-%COMP%], 
   [role="radio"][_ngcontent-%COMP%] {
      cursor: pointer;
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
    
    .recap[_ngcontent-%COMP%] {
      border-radius: var(--%NS%v2-radius-champ);
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
    }
    .recap-row[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 14px 18px;
    }
    .recap-row[_ngcontent-%COMP%]    + .recap-row[_ngcontent-%COMP%] {
      border-top: 1px solid var(--%NS%v2-separateur);
    }
    .recap-ico[_ngcontent-%COMP%] {
      display: grid;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-sauge);
      color: var(--%NS%v2-foret);
    }
    
    .channel[_ngcontent-%COMP%] {
      position: relative;
      display: flex;
      height: 64px;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: var(--%NS%v2-radius-champ);
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      padding: 0 14px;
      font-size: 15px;
      font-weight: 700;
      color: var(--%NS%v2-encre);
      text-align: left;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    .channel[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .channel.on[_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-foret);
      padding: 0 13.5px;
      box-shadow: var(--%NS%v2-halo);
    }
    .channel[_ngcontent-%COMP%]:focus-visible {
      outline: none;
      border: 2px solid var(--%NS%v2-foret);
      padding: 0 13.5px;
      box-shadow: var(--%NS%v2-halo);
    }
    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%] {
      display: flex;
      height: 36px;
      min-width: 36px;
      flex-shrink: 0;
      align-items: center;
      justify-content: center;
      gap: 4px;
    }
    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
      height: 34px;
      width: auto;
      border-radius: 9px;
    }
    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%]   img.wordmark[_ngcontent-%COMP%] {
      height: 26px;
      border-radius: 0;
    }
    .channel[_ngcontent-%COMP%]   .logos[_ngcontent-%COMP%]   img.card[_ngcontent-%COMP%] {
      height: 16px;
      border-radius: 0;
    }
    .radio[_ngcontent-%COMP%] {
      margin-left: auto;
      display: grid;
      height: 22px;
      width: 22px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 999px;
      border: 2px solid var(--%NS%v2-gris-trait);
      color: var(--%NS%v2-citron);
    }
    .channel.on[_ngcontent-%COMP%]   .radio[_ngcontent-%COMP%] {
      border-color: var(--%NS%v2-foret);
      background: var(--%NS%v2-foret);
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
    .btn-primary[_ngcontent-%COMP%]:hover:not(:disabled) {
      background: var(--%NS%v2-foret-clair);
    }
    .btn-primary[_ngcontent-%COMP%]:focus-visible {
      outline: none;
      box-shadow: var(--%NS%v2-halo);
    }
    .btn-primary[_ngcontent-%COMP%]:disabled {
      background: var(--%NS%v2-lin);
      color: var(--%NS%v2-gris-texte);
      cursor: not-allowed;
    }
    .btn-chip[_ngcontent-%COMP%] {
      display: grid;
      height: 48px;
      width: 48px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 14px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }
    .btn-primary[_ngcontent-%COMP%]:disabled   .btn-chip[_ngcontent-%COMP%] {
      background: var(--%NS%v2-gris-trait);
      color: var(--%NS%v2-blanc);
    }
    .band[_ngcontent-%COMP%] {
      position: relative;
      height: 190px;
      overflow: hidden;
      background: var(--%NS%v2-foret);
    }
    .band[_ngcontent-%COMP%]   img[_ngcontent-%COMP%] {
      position: absolute;
      inset: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
    }
    .band-veil[_ngcontent-%COMP%] {
      position: absolute;
      inset: 0;
      background: linear-gradient(180deg, color-mix(in oklab, var(--%NS%v2-foret) 70%, transparent) 0%, color-mix(in oklab, var(--%NS%v2-foret) 25%, transparent) 45%, color-mix(in oklab, var(--%NS%v2-foret) 88%, transparent) 100%);
    }
    .credit[_ngcontent-%COMP%] {
      position: absolute;
      right: 16px;
      bottom: 10px;
      z-index: 1;
      font-size: 10.5px;
      font-weight: 600;
      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);
    }
    .credit[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-blanc);
      text-decoration: underline;
    }
    .credit-band[_ngcontent-%COMP%] {
      bottom: 8px;
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
    @media (prefers-reduced-motion: reduce) {
      .channel[_ngcontent-%COMP%], 
   .btn-primary[_ngcontent-%COMP%] {
        transition: none;
      }
    }`]})}};export{le as default};