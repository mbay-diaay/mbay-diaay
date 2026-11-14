import{a as e,c as t,h as n,i as r,l as i,o as a,s as o}from"./snackbar.component-ICe8-MWg.js";import{$t as s,At as c,Bt as l,Ct as u,Dt as d,Et as ee,F as f,Ft as p,Hn as m,Ht as h,In as g,It as _,Jn as v,K as te,Kn as ne,Kt as y,L as b,Ln as re,Lt as x,M as S,Mn as ie,Mt as C,N as ae,Nt as w,O as oe,On as se,Ot as ce,Pn as le,Pt as T,Qt as ue,Rn as E,Rt as D,S as de,St as O,Tn as fe,Ut as pe,V as me,Vt as k,Wn as he,Wt as A,Xt as ge,Yn as j,Zt as _e,_t as M,ar as ve,at as ye,bt as be,cn as xe,cr as Se,ct as Ce,dn as we,dt as N,en as P,er as Te,et as Ee,fn as F,fr as De,ft as I,gt as L,hn as Oe,ht as R,in as ke,j as Ae,jn as je,jt as Me,k as z,kt as B,ln as V,lr as Ne,lt as H,mn as U,mt as W,nn as Pe,nr as Fe,or as Ie,pn as G,qn as Le,qt as Re,rn as ze,rr as Be,sr as Ve,tn as He,tr as Ue,un as We,ur as Ge,ut as Ke,vt as K,w as qe,wn as Je,wt as Ye,xn as Xe,xt as Ze,yt as Qe,z as $e,zn as q}from"./_router-chunk-H0-n0SZI.js";import{n as et,r as tt,t as nt}from"./index-B8S1FFME.js";import{W as rt,t as it}from"./locale.service-Bf8_ncMo.js";import{K as at,h as ot,m as st,q as ct,rt as lt,wt as ut}from"./lucide-angular-Tekzrdar.js";function dt(){var e=[...arguments],t=Ve(e),n=Ue(e),r=n.args,i=n.keys,a=new Ge(function(e){var t=r.length;if(!t)e.complete();else for(var n=Array(t),a=t,o=t,s=function(t){var s=!1;Ie(r[t]).subscribe(Ne(e,function(e){s||(s=!0,o--),n[t]=e},function(){return a--},void 0,function(){a&&s||(o||e.next(i?Te(i,n):n),e.complete())}))},c=0;c<t;c++)s(c)});return t?a.pipe(Fe(t)):a}function ft(e){var t,n,r=``;if(typeof e==`string`||typeof e==`number`)r+=e;else if(typeof e==`object`){if(Array.isArray(e)){var i=e.length;for(t=0;t<i;t++)e[t]&&(n=ft(e[t]))&&(r&&(r+=` `),r+=n)}else for(n in e)e[n]&&(r&&(r+=` `),r+=n)}return r}function pt(){for(var e,t,n=0,r=``,i=arguments.length;n<i;n++)(e=arguments[n])&&(t=ft(e))&&(r&&(r+=` `),r+=t);return r}var mt=`-`,ht=e=>{let t=yt(e),{conflictingClassGroups:n,conflictingClassGroupModifiers:r}=e;return{getClassGroupId:e=>{let n=e.split(mt);return n[0]===``&&n.length!==1&&n.shift(),gt(n,t)||vt(e)},getConflictingClassGroupIds:(e,t)=>{let i=n[e]||[];return t&&r[e]?[...i,...r[e]]:i}}},gt=(e,t)=>{if(e.length===0)return t.classGroupId;let n=e[0],r=t.nextPart.get(n),i=r?gt(e.slice(1),r):void 0;if(i)return i;if(t.validators.length===0)return;let a=e.join(mt);return t.validators.find(({validator:e})=>e(a))?.classGroupId},_t=/^\[(.+)\]$/,vt=e=>{if(_t.test(e)){let t=_t.exec(e)[1],n=t?.substring(0,t.indexOf(`:`));if(n)return`arbitrary..`+n}},yt=e=>{let{theme:t,prefix:n}=e,r={nextPart:new Map,validators:[]};return Ct(Object.entries(e.classGroups),n).forEach(([e,n])=>{bt(n,r,e,t)}),r},bt=(e,t,n,r)=>{e.forEach(e=>{if(typeof e==`string`){let r=e===``?t:xt(t,e);r.classGroupId=n}else if(typeof e==`function`){if(St(e)){bt(e(r),t,n,r);return}t.validators.push({validator:e,classGroupId:n})}else Object.entries(e).forEach(([e,i])=>{bt(i,xt(t,e),n,r)})})},xt=(e,t)=>{let n=e;return t.split(mt).forEach(e=>{n.nextPart.has(e)||n.nextPart.set(e,{nextPart:new Map,validators:[]}),n=n.nextPart.get(e)}),n},St=e=>e.isThemeGetter,Ct=(e,t)=>t?e.map(([e,n])=>[e,n.map(e=>typeof e==`string`?t+e:typeof e==`object`?Object.fromEntries(Object.entries(e).map(([e,n])=>[t+e,n])):e)]):e,wt=e=>{if(e<1)return{get:()=>void 0,set:()=>{}};let t=0,n=new Map,r=new Map,i=(i,a)=>{n.set(i,a),t++,t>e&&(t=0,r=n,n=new Map)};return{get(e){let t=n.get(e);if(t!==void 0)return t;if((t=r.get(e))!==void 0)return i(e,t),t},set(e,t){n.has(e)?n.set(e,t):i(e,t)}}},Tt=`!`,Et=e=>{let{separator:t,experimentalParseClassName:n}=e,r=t.length===1,i=t[0],a=t.length,o=e=>{let n=[],o=0,s=0,c;for(let l=0;l<e.length;l++){let u=e[l];if(o===0){if(u===i&&(r||e.slice(l,l+a)===t)){n.push(e.slice(s,l)),s=l+a;continue}if(u===`/`){c=l;continue}}u===`[`?o++:u===`]`&&o--}let l=n.length===0?e:e.substring(s),u=l.startsWith(Tt);return{modifiers:n,hasImportantModifier:u,baseClassName:u?l.substring(1):l,maybePostfixModifierPosition:c&&c>s?c-s:void 0}};return n?e=>n({className:e,parseClassName:o}):o},Dt=e=>{if(e.length<=1)return e;let t=[],n=[];return e.forEach(e=>{e[0]===`[`?(t.push(...n.sort(),e),n=[]):n.push(e)}),t.push(...n.sort()),t},Ot=e=>({cache:wt(e.cacheSize),parseClassName:Et(e),...ht(e)}),kt=/\s+/,At=(e,t)=>{let{parseClassName:n,getClassGroupId:r,getConflictingClassGroupIds:i}=t,a=[],o=e.trim().split(kt),s=``;for(let e=o.length-1;e>=0;--e){let t=o[e],{modifiers:c,hasImportantModifier:l,baseClassName:u,maybePostfixModifierPosition:d}=n(t),ee=!!d,f=r(ee?u.substring(0,d):u);if(!f){if(!ee||(f=r(u),!f)){s=t+(s.length>0?` `+s:s);continue}ee=!1}let p=Dt(c).join(`:`),m=l?p+Tt:p,h=m+f;if(a.includes(h))continue;a.push(h);let g=i(f,ee);for(let e=0;e<g.length;++e){let t=g[e];a.push(m+t)}s=t+(s.length>0?` `+s:s)}return s};function jt(){let e=0,t,n,r=``;for(;e<arguments.length;)(t=arguments[e++])&&(n=Mt(t))&&(r&&(r+=` `),r+=n);return r}var Mt=e=>{if(typeof e==`string`)return e;let t,n=``;for(let r=0;r<e.length;r++)e[r]&&(t=Mt(e[r]))&&(n&&(n+=` `),n+=t);return n};function Nt(e,...t){let n,r,i,a=o;function o(o){return n=Ot(t.reduce((e,t)=>t(e),e())),r=n.cache.get,i=n.cache.set,a=s,s(o)}function s(e){let t=r(e);if(t)return t;let a=At(e,n);return i(e,a),a}return function(){return a(jt.apply(null,arguments))}}var J=e=>{let t=t=>t[e]||[];return t.isThemeGetter=!0,t},Pt=/^\[(?:([a-z-]+):)?(.+)\]$/i,Ft=/^\d+\/\d+$/,It=new Set([`px`,`full`,`screen`]),Lt=/^(\d+(\.\d+)?)?(xs|sm|md|lg|xl)$/,Rt=/\d+(%|px|r?em|[sdl]?v([hwib]|min|max)|pt|pc|in|cm|mm|cap|ch|ex|r?lh|cq(w|h|i|b|min|max))|\b(calc|min|max|clamp)\(.+\)|^0$/,zt=/^(rgba?|hsla?|hwb|(ok)?(lab|lch)|color-mix)\(.+\)$/,Bt=/^(inset_)?-?((\d+)?\.?(\d+)[a-z]+|0)_-?((\d+)?\.?(\d+)[a-z]+|0)/,Vt=/^(url|image|image-set|cross-fade|element|(repeating-)?(linear|radial|conic)-gradient)\(.+\)$/,Ht=e=>Wt(e)||It.has(e)||Ft.test(e),Ut=e=>nn(e,`length`,rn),Wt=e=>!!e&&!Number.isNaN(Number(e)),Gt=e=>nn(e,`number`,Wt),Kt=e=>!!e&&Number.isInteger(Number(e)),qt=e=>e.endsWith(`%`)&&Wt(e.slice(0,-1)),Y=e=>Pt.test(e),Jt=e=>Lt.test(e),Yt=new Set([`length`,`size`,`percentage`]),Xt=e=>nn(e,Yt,an),Zt=e=>nn(e,`position`,an),Qt=new Set([`image`,`url`]),$t=e=>nn(e,Qt,sn),en=e=>nn(e,``,on),tn=()=>!0,nn=(e,t,n)=>{let r=Pt.exec(e);return r?r[1]?typeof t==`string`?r[1]===t:t.has(r[1]):n(r[2]):!1},rn=e=>Rt.test(e)&&!zt.test(e),an=()=>!1,on=e=>Bt.test(e),sn=e=>Vt.test(e),cn=Nt(()=>{let e=J(`colors`),t=J(`spacing`),n=J(`blur`),r=J(`brightness`),i=J(`borderColor`),a=J(`borderRadius`),o=J(`borderSpacing`),s=J(`borderWidth`),c=J(`contrast`),l=J(`grayscale`),u=J(`hueRotate`),d=J(`invert`),ee=J(`gap`),f=J(`gradientColorStops`),p=J(`gradientColorStopPositions`),m=J(`inset`),h=J(`margin`),g=J(`opacity`),_=J(`padding`),v=J(`saturate`),te=J(`scale`),ne=J(`sepia`),y=J(`skew`),b=J(`space`),re=J(`translate`),x=()=>[`auto`,`contain`,`none`],S=()=>[`auto`,`hidden`,`clip`,`visible`,`scroll`],ie=()=>[`auto`,Y,t],C=()=>[Y,t],ae=()=>[``,Ht,Ut],w=()=>[`auto`,Wt,Y],oe=()=>[`bottom`,`center`,`left`,`left-bottom`,`left-top`,`right`,`right-bottom`,`right-top`,`top`],se=()=>[`solid`,`dashed`,`dotted`,`double`,`none`],ce=()=>[`normal`,`multiply`,`screen`,`overlay`,`darken`,`lighten`,`color-dodge`,`color-burn`,`hard-light`,`soft-light`,`difference`,`exclusion`,`hue`,`saturation`,`color`,`luminosity`],le=()=>[`start`,`end`,`center`,`between`,`around`,`evenly`,`stretch`],T=()=>[``,`0`,Y],ue=()=>[`auto`,`avoid`,`all`,`avoid-page`,`page`,`left`,`right`,`column`],E=()=>[Wt,Y];return{cacheSize:500,separator:`:`,theme:{colors:[tn],spacing:[Ht,Ut],blur:[`none`,``,Jt,Y],brightness:E(),borderColor:[e],borderRadius:[`none`,``,`full`,Jt,Y],borderSpacing:C(),borderWidth:ae(),contrast:E(),grayscale:T(),hueRotate:E(),invert:T(),gap:C(),gradientColorStops:[e],gradientColorStopPositions:[qt,Ut],inset:ie(),margin:ie(),opacity:E(),padding:C(),saturate:E(),scale:E(),sepia:T(),skew:E(),space:C(),translate:C()},classGroups:{aspect:[{aspect:[`auto`,`square`,`video`,Y]}],container:[`container`],columns:[{columns:[Jt]}],"break-after":[{"break-after":ue()}],"break-before":[{"break-before":ue()}],"break-inside":[{"break-inside":[`auto`,`avoid`,`avoid-page`,`avoid-column`]}],"box-decoration":[{"box-decoration":[`slice`,`clone`]}],box:[{box:[`border`,`content`]}],display:[`block`,`inline-block`,`inline`,`flex`,`inline-flex`,`table`,`inline-table`,`table-caption`,`table-cell`,`table-column`,`table-column-group`,`table-footer-group`,`table-header-group`,`table-row-group`,`table-row`,`flow-root`,`grid`,`inline-grid`,`contents`,`list-item`,`hidden`],float:[{float:[`right`,`left`,`none`,`start`,`end`]}],clear:[{clear:[`left`,`right`,`both`,`none`,`start`,`end`]}],isolation:[`isolate`,`isolation-auto`],"object-fit":[{object:[`contain`,`cover`,`fill`,`none`,`scale-down`]}],"object-position":[{object:[...oe(),Y]}],overflow:[{overflow:S()}],"overflow-x":[{"overflow-x":S()}],"overflow-y":[{"overflow-y":S()}],overscroll:[{overscroll:x()}],"overscroll-x":[{"overscroll-x":x()}],"overscroll-y":[{"overscroll-y":x()}],position:[`static`,`fixed`,`absolute`,`relative`,`sticky`],inset:[{inset:[m]}],"inset-x":[{"inset-x":[m]}],"inset-y":[{"inset-y":[m]}],start:[{start:[m]}],end:[{end:[m]}],top:[{top:[m]}],right:[{right:[m]}],bottom:[{bottom:[m]}],left:[{left:[m]}],visibility:[`visible`,`invisible`,`collapse`],z:[{z:[`auto`,Kt,Y]}],basis:[{basis:ie()}],"flex-direction":[{flex:[`row`,`row-reverse`,`col`,`col-reverse`]}],"flex-wrap":[{flex:[`wrap`,`wrap-reverse`,`nowrap`]}],flex:[{flex:[`1`,`auto`,`initial`,`none`,Y]}],grow:[{grow:T()}],shrink:[{shrink:T()}],order:[{order:[`first`,`last`,`none`,Kt,Y]}],"grid-cols":[{"grid-cols":[tn]}],"col-start-end":[{col:[`auto`,{span:[`full`,Kt,Y]},Y]}],"col-start":[{"col-start":w()}],"col-end":[{"col-end":w()}],"grid-rows":[{"grid-rows":[tn]}],"row-start-end":[{row:[`auto`,{span:[Kt,Y]},Y]}],"row-start":[{"row-start":w()}],"row-end":[{"row-end":w()}],"grid-flow":[{"grid-flow":[`row`,`col`,`dense`,`row-dense`,`col-dense`]}],"auto-cols":[{"auto-cols":[`auto`,`min`,`max`,`fr`,Y]}],"auto-rows":[{"auto-rows":[`auto`,`min`,`max`,`fr`,Y]}],gap:[{gap:[ee]}],"gap-x":[{"gap-x":[ee]}],"gap-y":[{"gap-y":[ee]}],"justify-content":[{justify:[`normal`,...le()]}],"justify-items":[{"justify-items":[`start`,`end`,`center`,`stretch`]}],"justify-self":[{"justify-self":[`auto`,`start`,`end`,`center`,`stretch`]}],"align-content":[{content:[`normal`,...le(),`baseline`]}],"align-items":[{items:[`start`,`end`,`center`,`baseline`,`stretch`]}],"align-self":[{self:[`auto`,`start`,`end`,`center`,`stretch`,`baseline`]}],"place-content":[{"place-content":[...le(),`baseline`]}],"place-items":[{"place-items":[`start`,`end`,`center`,`baseline`,`stretch`]}],"place-self":[{"place-self":[`auto`,`start`,`end`,`center`,`stretch`]}],p:[{p:[_]}],px:[{px:[_]}],py:[{py:[_]}],ps:[{ps:[_]}],pe:[{pe:[_]}],pt:[{pt:[_]}],pr:[{pr:[_]}],pb:[{pb:[_]}],pl:[{pl:[_]}],m:[{m:[h]}],mx:[{mx:[h]}],my:[{my:[h]}],ms:[{ms:[h]}],me:[{me:[h]}],mt:[{mt:[h]}],mr:[{mr:[h]}],mb:[{mb:[h]}],ml:[{ml:[h]}],"space-x":[{"space-x":[b]}],"space-x-reverse":[`space-x-reverse`],"space-y":[{"space-y":[b]}],"space-y-reverse":[`space-y-reverse`],w:[{w:[`auto`,`min`,`max`,`fit`,`svw`,`lvw`,`dvw`,Y,t]}],"min-w":[{"min-w":[Y,t,`min`,`max`,`fit`]}],"max-w":[{"max-w":[Y,t,`none`,`full`,`min`,`max`,`fit`,`prose`,{screen:[Jt]},Jt]}],h:[{h:[Y,t,`auto`,`min`,`max`,`fit`,`svh`,`lvh`,`dvh`]}],"min-h":[{"min-h":[Y,t,`min`,`max`,`fit`,`svh`,`lvh`,`dvh`]}],"max-h":[{"max-h":[Y,t,`min`,`max`,`fit`,`svh`,`lvh`,`dvh`]}],size:[{size:[Y,t,`auto`,`min`,`max`,`fit`]}],"font-size":[{text:[`base`,Jt,Ut]}],"font-smoothing":[`antialiased`,`subpixel-antialiased`],"font-style":[`italic`,`not-italic`],"font-weight":[{font:[`thin`,`extralight`,`light`,`normal`,`medium`,`semibold`,`bold`,`extrabold`,`black`,Gt]}],"font-family":[{font:[tn]}],"fvn-normal":[`normal-nums`],"fvn-ordinal":[`ordinal`],"fvn-slashed-zero":[`slashed-zero`],"fvn-figure":[`lining-nums`,`oldstyle-nums`],"fvn-spacing":[`proportional-nums`,`tabular-nums`],"fvn-fraction":[`diagonal-fractions`,`stacked-fractions`],tracking:[{tracking:[`tighter`,`tight`,`normal`,`wide`,`wider`,`widest`,Y]}],"line-clamp":[{"line-clamp":[`none`,Wt,Gt]}],leading:[{leading:[`none`,`tight`,`snug`,`normal`,`relaxed`,`loose`,Ht,Y]}],"list-image":[{"list-image":[`none`,Y]}],"list-style-type":[{list:[`none`,`disc`,`decimal`,Y]}],"list-style-position":[{list:[`inside`,`outside`]}],"placeholder-color":[{placeholder:[e]}],"placeholder-opacity":[{"placeholder-opacity":[g]}],"text-alignment":[{text:[`left`,`center`,`right`,`justify`,`start`,`end`]}],"text-color":[{text:[e]}],"text-opacity":[{"text-opacity":[g]}],"text-decoration":[`underline`,`overline`,`line-through`,`no-underline`],"text-decoration-style":[{decoration:[...se(),`wavy`]}],"text-decoration-thickness":[{decoration:[`auto`,`from-font`,Ht,Ut]}],"underline-offset":[{"underline-offset":[`auto`,Ht,Y]}],"text-decoration-color":[{decoration:[e]}],"text-transform":[`uppercase`,`lowercase`,`capitalize`,`normal-case`],"text-overflow":[`truncate`,`text-ellipsis`,`text-clip`],"text-wrap":[{text:[`wrap`,`nowrap`,`balance`,`pretty`]}],indent:[{indent:C()}],"vertical-align":[{align:[`baseline`,`top`,`middle`,`bottom`,`text-top`,`text-bottom`,`sub`,`super`,Y]}],whitespace:[{whitespace:[`normal`,`nowrap`,`pre`,`pre-line`,`pre-wrap`,`break-spaces`]}],break:[{break:[`normal`,`words`,`all`,`keep`]}],hyphens:[{hyphens:[`none`,`manual`,`auto`]}],content:[{content:[`none`,Y]}],"bg-attachment":[{bg:[`fixed`,`local`,`scroll`]}],"bg-clip":[{"bg-clip":[`border`,`padding`,`content`,`text`]}],"bg-opacity":[{"bg-opacity":[g]}],"bg-origin":[{"bg-origin":[`border`,`padding`,`content`]}],"bg-position":[{bg:[...oe(),Zt]}],"bg-repeat":[{bg:[`no-repeat`,{repeat:[``,`x`,`y`,`round`,`space`]}]}],"bg-size":[{bg:[`auto`,`cover`,`contain`,Xt]}],"bg-image":[{bg:[`none`,{"gradient-to":[`t`,`tr`,`r`,`br`,`b`,`bl`,`l`,`tl`]},$t]}],"bg-color":[{bg:[e]}],"gradient-from-pos":[{from:[p]}],"gradient-via-pos":[{via:[p]}],"gradient-to-pos":[{to:[p]}],"gradient-from":[{from:[f]}],"gradient-via":[{via:[f]}],"gradient-to":[{to:[f]}],rounded:[{rounded:[a]}],"rounded-s":[{"rounded-s":[a]}],"rounded-e":[{"rounded-e":[a]}],"rounded-t":[{"rounded-t":[a]}],"rounded-r":[{"rounded-r":[a]}],"rounded-b":[{"rounded-b":[a]}],"rounded-l":[{"rounded-l":[a]}],"rounded-ss":[{"rounded-ss":[a]}],"rounded-se":[{"rounded-se":[a]}],"rounded-ee":[{"rounded-ee":[a]}],"rounded-es":[{"rounded-es":[a]}],"rounded-tl":[{"rounded-tl":[a]}],"rounded-tr":[{"rounded-tr":[a]}],"rounded-br":[{"rounded-br":[a]}],"rounded-bl":[{"rounded-bl":[a]}],"border-w":[{border:[s]}],"border-w-x":[{"border-x":[s]}],"border-w-y":[{"border-y":[s]}],"border-w-s":[{"border-s":[s]}],"border-w-e":[{"border-e":[s]}],"border-w-t":[{"border-t":[s]}],"border-w-r":[{"border-r":[s]}],"border-w-b":[{"border-b":[s]}],"border-w-l":[{"border-l":[s]}],"border-opacity":[{"border-opacity":[g]}],"border-style":[{border:[...se(),`hidden`]}],"divide-x":[{"divide-x":[s]}],"divide-x-reverse":[`divide-x-reverse`],"divide-y":[{"divide-y":[s]}],"divide-y-reverse":[`divide-y-reverse`],"divide-opacity":[{"divide-opacity":[g]}],"divide-style":[{divide:se()}],"border-color":[{border:[i]}],"border-color-x":[{"border-x":[i]}],"border-color-y":[{"border-y":[i]}],"border-color-s":[{"border-s":[i]}],"border-color-e":[{"border-e":[i]}],"border-color-t":[{"border-t":[i]}],"border-color-r":[{"border-r":[i]}],"border-color-b":[{"border-b":[i]}],"border-color-l":[{"border-l":[i]}],"divide-color":[{divide:[i]}],"outline-style":[{outline:[``,...se()]}],"outline-offset":[{"outline-offset":[Ht,Y]}],"outline-w":[{outline:[Ht,Ut]}],"outline-color":[{outline:[e]}],"ring-w":[{ring:ae()}],"ring-w-inset":[`ring-inset`],"ring-color":[{ring:[e]}],"ring-opacity":[{"ring-opacity":[g]}],"ring-offset-w":[{"ring-offset":[Ht,Ut]}],"ring-offset-color":[{"ring-offset":[e]}],shadow:[{shadow:[``,`inner`,`none`,Jt,en]}],"shadow-color":[{shadow:[tn]}],opacity:[{opacity:[g]}],"mix-blend":[{"mix-blend":[...ce(),`plus-lighter`,`plus-darker`]}],"bg-blend":[{"bg-blend":ce()}],filter:[{filter:[``,`none`]}],blur:[{blur:[n]}],brightness:[{brightness:[r]}],contrast:[{contrast:[c]}],"drop-shadow":[{"drop-shadow":[``,`none`,Jt,Y]}],grayscale:[{grayscale:[l]}],"hue-rotate":[{"hue-rotate":[u]}],invert:[{invert:[d]}],saturate:[{saturate:[v]}],sepia:[{sepia:[ne]}],"backdrop-filter":[{"backdrop-filter":[``,`none`]}],"backdrop-blur":[{"backdrop-blur":[n]}],"backdrop-brightness":[{"backdrop-brightness":[r]}],"backdrop-contrast":[{"backdrop-contrast":[c]}],"backdrop-grayscale":[{"backdrop-grayscale":[l]}],"backdrop-hue-rotate":[{"backdrop-hue-rotate":[u]}],"backdrop-invert":[{"backdrop-invert":[d]}],"backdrop-opacity":[{"backdrop-opacity":[g]}],"backdrop-saturate":[{"backdrop-saturate":[v]}],"backdrop-sepia":[{"backdrop-sepia":[ne]}],"border-collapse":[{border:[`collapse`,`separate`]}],"border-spacing":[{"border-spacing":[o]}],"border-spacing-x":[{"border-spacing-x":[o]}],"border-spacing-y":[{"border-spacing-y":[o]}],"table-layout":[{table:[`auto`,`fixed`]}],caption:[{caption:[`top`,`bottom`]}],transition:[{transition:[`none`,`all`,``,`colors`,`opacity`,`shadow`,`transform`,Y]}],duration:[{duration:E()}],ease:[{ease:[`linear`,`in`,`out`,`in-out`,Y]}],delay:[{delay:E()}],animate:[{animate:[`none`,`spin`,`ping`,`pulse`,`bounce`,Y]}],transform:[{transform:[``,`gpu`,`none`]}],scale:[{scale:[te]}],"scale-x":[{"scale-x":[te]}],"scale-y":[{"scale-y":[te]}],rotate:[{rotate:[Kt,Y]}],"translate-x":[{"translate-x":[re]}],"translate-y":[{"translate-y":[re]}],"skew-x":[{"skew-x":[y]}],"skew-y":[{"skew-y":[y]}],"transform-origin":[{origin:[`center`,`top`,`top-right`,`right`,`bottom-right`,`bottom`,`bottom-left`,`left`,`top-left`,Y]}],accent:[{accent:[`auto`,e]}],appearance:[{appearance:[`none`,`auto`]}],cursor:[{cursor:[`auto`,`default`,`pointer`,`wait`,`text`,`move`,`help`,`not-allowed`,`none`,`context-menu`,`progress`,`cell`,`crosshair`,`vertical-text`,`alias`,`copy`,`no-drop`,`grab`,`grabbing`,`all-scroll`,`col-resize`,`row-resize`,`n-resize`,`e-resize`,`s-resize`,`w-resize`,`ne-resize`,`nw-resize`,`se-resize`,`sw-resize`,`ew-resize`,`ns-resize`,`nesw-resize`,`nwse-resize`,`zoom-in`,`zoom-out`,Y]}],"caret-color":[{caret:[e]}],"pointer-events":[{"pointer-events":[`none`,`auto`]}],resize:[{resize:[`none`,`y`,`x`,``]}],"scroll-behavior":[{scroll:[`auto`,`smooth`]}],"scroll-m":[{"scroll-m":C()}],"scroll-mx":[{"scroll-mx":C()}],"scroll-my":[{"scroll-my":C()}],"scroll-ms":[{"scroll-ms":C()}],"scroll-me":[{"scroll-me":C()}],"scroll-mt":[{"scroll-mt":C()}],"scroll-mr":[{"scroll-mr":C()}],"scroll-mb":[{"scroll-mb":C()}],"scroll-ml":[{"scroll-ml":C()}],"scroll-p":[{"scroll-p":C()}],"scroll-px":[{"scroll-px":C()}],"scroll-py":[{"scroll-py":C()}],"scroll-ps":[{"scroll-ps":C()}],"scroll-pe":[{"scroll-pe":C()}],"scroll-pt":[{"scroll-pt":C()}],"scroll-pr":[{"scroll-pr":C()}],"scroll-pb":[{"scroll-pb":C()}],"scroll-pl":[{"scroll-pl":C()}],"snap-align":[{snap:[`start`,`end`,`center`,`align-none`]}],"snap-stop":[{snap:[`normal`,`always`]}],"snap-type":[{snap:[`none`,`x`,`y`,`both`]}],"snap-strictness":[{snap:[`mandatory`,`proximity`]}],touch:[{touch:[`auto`,`none`,`manipulation`]}],"touch-x":[{"touch-pan":[`x`,`left`,`right`]}],"touch-y":[{"touch-pan":[`y`,`up`,`down`]}],"touch-pz":[`touch-pinch-zoom`],select:[{select:[`none`,`text`,`all`,`auto`]}],"will-change":[{"will-change":[`auto`,`scroll`,`contents`,`transform`,Y]}],fill:[{fill:[e,`none`]}],"stroke-w":[{stroke:[Ht,Ut,Gt]}],stroke:[{stroke:[e,`none`]}],sr:[`sr-only`,`not-sr-only`],"forced-color-adjust":[{"forced-color-adjust":[`auto`,`none`]}]},conflictingClassGroups:{overflow:[`overflow-x`,`overflow-y`],overscroll:[`overscroll-x`,`overscroll-y`],inset:[`inset-x`,`inset-y`,`start`,`end`,`top`,`right`,`bottom`,`left`],"inset-x":[`right`,`left`],"inset-y":[`top`,`bottom`],flex:[`basis`,`grow`,`shrink`],gap:[`gap-x`,`gap-y`],p:[`px`,`py`,`ps`,`pe`,`pt`,`pr`,`pb`,`pl`],px:[`pr`,`pl`],py:[`pt`,`pb`],m:[`mx`,`my`,`ms`,`me`,`mt`,`mr`,`mb`,`ml`],mx:[`mr`,`ml`],my:[`mt`,`mb`],size:[`w`,`h`],"font-size":[`leading`],"fvn-normal":[`fvn-ordinal`,`fvn-slashed-zero`,`fvn-figure`,`fvn-spacing`,`fvn-fraction`],"fvn-ordinal":[`fvn-normal`],"fvn-slashed-zero":[`fvn-normal`],"fvn-figure":[`fvn-normal`],"fvn-spacing":[`fvn-normal`],"fvn-fraction":[`fvn-normal`],"line-clamp":[`display`,`overflow`],rounded:[`rounded-s`,`rounded-e`,`rounded-t`,`rounded-r`,`rounded-b`,`rounded-l`,`rounded-ss`,`rounded-se`,`rounded-ee`,`rounded-es`,`rounded-tl`,`rounded-tr`,`rounded-br`,`rounded-bl`],"rounded-s":[`rounded-ss`,`rounded-es`],"rounded-e":[`rounded-se`,`rounded-ee`],"rounded-t":[`rounded-tl`,`rounded-tr`],"rounded-r":[`rounded-tr`,`rounded-br`],"rounded-b":[`rounded-br`,`rounded-bl`],"rounded-l":[`rounded-tl`,`rounded-bl`],"border-spacing":[`border-spacing-x`,`border-spacing-y`],"border-w":[`border-w-s`,`border-w-e`,`border-w-t`,`border-w-r`,`border-w-b`,`border-w-l`],"border-w-x":[`border-w-r`,`border-w-l`],"border-w-y":[`border-w-t`,`border-w-b`],"border-color":[`border-color-s`,`border-color-e`,`border-color-t`,`border-color-r`,`border-color-b`,`border-color-l`],"border-color-x":[`border-color-r`,`border-color-l`],"border-color-y":[`border-color-t`,`border-color-b`],"scroll-m":[`scroll-mx`,`scroll-my`,`scroll-ms`,`scroll-me`,`scroll-mt`,`scroll-mr`,`scroll-mb`,`scroll-ml`],"scroll-mx":[`scroll-mr`,`scroll-ml`],"scroll-my":[`scroll-mt`,`scroll-mb`],"scroll-p":[`scroll-px`,`scroll-py`,`scroll-ps`,`scroll-pe`,`scroll-pt`,`scroll-pr`,`scroll-pb`,`scroll-pl`],"scroll-px":[`scroll-pr`,`scroll-pl`],"scroll-py":[`scroll-pt`,`scroll-pb`],touch:[`touch-x`,`touch-y`,`touch-pz`],"touch-x":[`touch`],"touch-y":[`touch`],"touch-pz":[`touch`]},conflictingClassGroupModifiers:{"font-size":[`leading`]}}});function ln(...e){return cn(pt(e))}var un=[`*`],dn={default:`bg-primary text-primary-foreground shadow hover:bg-primary/90`,destructive:`bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90`,outline:`border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground`,secondary:`bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80`,ghost:`hover:bg-accent hover:text-accent-foreground`,link:`text-primary underline-offset-4 hover:underline`},fn={default:`h-9 px-4 py-2 pointer-coarse:h-touch`,sm:`h-8 rounded-md px-3 text-xs pointer-coarse:h-touch pointer-coarse:text-sm`,lg:`h-10 rounded-md px-8`,icon:`h-9 w-9 pointer-coarse:size-touch`},pn=class e{constructor(){this.variant=z(`default`),this.size=z(`default`),this.type=z(`button`),this.disabled=z(!1),this.className=z(``,{alias:`class`}),this.ariaLabel=z(void 0),this.classes=f(()=>ln(`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0`,dn[this.variant()],fn[this.size()],this.className()))}onClick(e){}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-button`]],hostAttrs:[1,`contents`],inputs:{variant:[1,`variant`],size:[1,`size`],type:[1,`type`],disabled:[1,`disabled`],className:[1,`class`,`className`],ariaLabel:[1,`ariaLabel`]},ngContentSelectors:un,decls:2,vars:5,consts:[[3,`click`,`type`,`disabled`]],template:function(e,t){e&1&&(pe(),c(0,`button`,0),Me(`click`,function(e){return t.onClick(e)}),h(1),B()),e&2&&(R(t.classes()),C(`type`,t.type())(`disabled`,t.disabled()),W(`aria-label`,t.ariaLabel()||null))},encapsulation:2})}},mn=[`canvas`];function hn(e,t){e&1&&(c(0,`div`,1),ce(1,`canvas`,3,0),B())}function gn(e,t){e&1&&(c(0,`div`,2),F(1,`…`),B())}var _n=class e{constructor(){this.type=z.required(),this.data=z.required(),this.options=z({}),this.browser=tt(q(le)),this.document=q(Je),this.canvas=ae(`canvas`),this.chart=null,this.ready=!1,this.browser&&(Ee(()=>{this.ready=!0,this.render()}),re(()=>{this.type(),this.data(),this.options(),this.ready&&this.render()}))}ngOnDestroy(){this.chart?.destroy(),this.chart=null}async render(){let e=this.canvas()?.nativeElement;if(!e||!this.browser)return;let{Chart:t,BarController:n,BarElement:r,CategoryScale:i,LinearScale:a,PieController:o,DoughnutController:s,ArcElement:c,Tooltip:l,Legend:u}=await nt(async()=>{let{Chart:e,BarController:t,BarElement:n,CategoryScale:r,LinearScale:i,PieController:a,DoughnutController:o,ArcElement:s,Tooltip:c,Legend:l}=await import(`./chart-Dl2tAUxF.js`);return{Chart:e,BarController:t,BarElement:n,CategoryScale:r,LinearScale:i,PieController:a,DoughnutController:o,ArcElement:s,Tooltip:c,Legend:l}},[]);t.register(n,r,i,a,o,s,c,l,u),this.chart?.destroy(),this.chart=new t(e,{type:this.type(),data:this.resolveCssColors(this.data()),options:{responsive:!0,maintainAspectRatio:!1,...this.options()}})}resolveCssColors(e){let t=e=>typeof e==`string`&&e.includes(`var(`)?vn(this.document,e):Array.isArray(e)?e.map(e=>t(e)):e;return{...e,datasets:e.datasets.map(e=>{let n={...e};for(let e of[`backgroundColor`,`borderColor`,`hoverBackgroundColor`,`hoverBorderColor`])e in n&&(n[e]=t(n[e]));return n})}}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-chart`]],viewQuery:function(e,t){e&1&&Xe(t.canvas,mn,5),e&2&&ge()},hostAttrs:[1,`block`,`h-full`,`w-full`,`min-h-0`],inputs:{type:[1,`type`],data:[1,`data`],options:[1,`options`]},decls:2,vars:1,consts:[[`canvas`,``],[1,`relative`,`h-full`,`w-full`,`min-h-0`],[1,`grid`,`h-full`,`min-h-40`,`place-items-center`,`text-xs`,`text-muted-foreground`],[1,`absolute`,`inset-0`,`!h-full`,`!w-full`]],template:function(e,t){e&1&&K(0,hn,3,0,`div`,1)(1,gn,2,0,`div`,2),e&2&&M(+!t.browser)},encapsulation:2})}};function vn(e,t){let n=t.match(/var\(\s*(--[\w-]+)\s*(?:,\s*([^)]+))?\)/);if(!n)return t;let[,r,i]=n;return getComputedStyle(e.documentElement).getPropertyValue(r).trim()||i?.trim()||t}var yn=e=>({count:e}),bn=(e,t)=>t.value;function xn(e,t){if(e&1){let e=x();_(0,`div`,3)(1,`label`,9),w(2,`ui-icon`,10),_(3,`input`,11),l(`input`,function(t){j(e);let n=k();return v(n.q.set(t.target.value))}),p()(),_(4,`button`,12),l(`click`,function(){j(e);let t=k();return v(t.toggleAll())}),F(5),p()()}if(e&2){let e=k();I(2),A(`size`,18),I(),A(`placeholder`,e.t()(`ui.checklist.search`))(`value`,e.q()),W(`aria-label`,e.t()(`ui.checklist.search`)),I(2),G(e.allVisibleOn()?e.t()(`ui.checklist.none`):e.t()(`ui.checklist.all`))}}function Sn(e,t){if(e&1&&w(0,`ui-icon`,15),e&2){let e=k().$implicit;A(`name`,e.icon)(`size`,18)}}function Cn(e,t){if(e&1&&(_(0,`span`,17),F(1),p()),e&2){let e=k().$implicit;I(),G(e.hint)}}function wn(e,t){if(e&1){let e=x();_(0,`label`,13)(1,`input`,14),l(`change`,function(t){let n=j(e).$implicit,r=k();return v(r.toggle(n.value,t.target.checked))}),p(),K(2,Sn,1,2,`ui-icon`,15),_(3,`span`,16),F(4),p(),K(5,Cn,2,1,`span`,17),p()}if(e&2){let e=t.$implicit,n=k();L(`on`,n.value().includes(e.value)),I(),A(`checked`,n.value().includes(e.value)),I(),M(e.icon?2:-1),I(2),G(e.label),I(),M(e.hint?5:-1)}}function Tn(e,t){if(e&1&&(_(0,`p`,6),F(1),p()),e&2){let e=k();I(),G(e.t()(`ui.checklist.empty`))}}function En(e,t){if(e&1&&(_(0,`p`,7),w(1,`ui-icon`,18),F(2),p()),e&2){let e=k();A(`id`,e.errorId),I(),A(`size`,16),I(),G(e.error())}}function Dn(e,t){if(e&1&&(_(0,`p`,8),F(1),p()),e&2){let e=k();I(),G(e.hint())}}var On=0,kn=class e{constructor(){this.label=z.required(),this.options=z.required(),this.value=z([]),this.hint=z(``),this.error=z(``),this.valueChange=S(),this.t=q(it).t,this.errorId=`cl-${On++}-error`,this.q=m(``),this.visible=f(()=>{let e=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),t=e(this.q().trim());return t?this.options().filter(n=>e(n.label).includes(t)):this.options()}),this.allVisibleOn=f(()=>this.visible().length>0&&this.visible().every(e=>this.value().includes(e.value)))}toggle(e,t){let n=new Set(this.value());t?n.add(e):n.delete(e),this.valueChange.emit(this.options().map(e=>e.value).filter(e=>n.has(e)))}toggleAll(){let e=new Set(this.value()),t=!this.allVisibleOn();for(let n of this.visible())t?e.add(n.value):e.delete(n.value);this.valueChange.emit(this.options().map(e=>e.value).filter(t=>e.has(t)))}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-check-list`]],hostAttrs:[1,`block`],inputs:{label:[1,`label`],options:[1,`options`],value:[1,`value`],hint:[1,`hint`],error:[1,`error`]},outputs:{valueChange:`valueChange`},decls:14,vars:12,consts:[[1,`legend`],[1,`count`],[1,`box`],[1,`tools`],[1,`list`],[1,`opt`,3,`on`],[1,`px-4`,`py-3`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`role`,`alert`,1,`error`,3,`id`],[1,`hint`],[1,`filter`],[`name`,`search`,3,`size`],[`type`,`search`,3,`input`,`placeholder`,`value`],[`type`,`button`,1,`bulk`,3,`click`],[1,`opt`],[`type`,`checkbox`,3,`change`,`checked`],[2,`color`,`var(--v2-foret)`,3,`name`,`size`],[1,`min-w-0`,`flex-1`,`truncate`],[1,`shrink-0`,`text-[12px]`,`font-bold`,2,`color`,`var(--v2-gris-texte)`],[`name`,`warning`,3,`size`]],template:function(e,t){e&1&&(_(0,`fieldset`)(1,`legend`,0)(2,`span`),F(3),p(),_(4,`span`,1),F(5),p()(),_(6,`div`,2),K(7,xn,6,5,`div`,3),_(8,`div`,4),P(9,wn,6,6,`label`,5,bn,!1,Tn,2,1,`p`,6),p()(),K(12,En,3,3,`p`,7)(13,Dn,2,1,`p`,8),p()),e&2&&(W(`aria-describedby`,t.error()?t.errorId:null),I(3),G(t.label()),I(),L(`zero`,!t.value().length),I(),G(t.t()(`ui.checklist.selected`,y(10,yn,t.value().length))),I(),L(`invalid`,!!t.error()),I(),M(t.options().length>6?7:-1),I(2),s(t.visible()),I(3),M(t.error()?12:t.hint()?13:-1))},dependencies:[i],styles:[`.legend[_ngcontent-%COMP%] {
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--%NS%v2-ardoise);
    }
    .count[_ngcontent-%COMP%] {
      border-radius: 999px;
      background: var(--%NS%v2-foret);
      padding: 2px 9px;
      font-size: 12px;
      letter-spacing: 0;
      text-transform: none;
      color: var(--%NS%v2-citron);
    }
    .count.zero[_ngcontent-%COMP%] {
      background: var(--%NS%v2-lin);
      color: var(--%NS%v2-gris-texte);
    }
    .box[_ngcontent-%COMP%] {
      margin-top: 8px;
      overflow: hidden;
      border-radius: 18px;
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
    }
    .box.invalid[_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-erreur-fg);
    }
    .tools[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 8px;
      border-bottom: 1px solid var(--%NS%v2-separateur);
      padding: 8px;
    }
    .filter[_ngcontent-%COMP%] {
      display: flex;
      min-width: 0;
      flex: 1;
      height: 40px;
      align-items: center;
      gap: 8px;
      border-radius: 12px;
      background: var(--%NS%v2-creme);
      padding: 0 12px;
      color: var(--%NS%v2-gris-texte);
    }
    .filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
      min-width: 0;
      flex: 1;
      background: transparent;
      font-size: 14px;
      font-weight: 600;
      color: var(--%NS%v2-encre);
      outline: none;
    }
    .filter[_ngcontent-%COMP%]:focus-within {
      box-shadow: inset 0 0 0 2px var(--%NS%v2-foret);
    }
    .bulk[_ngcontent-%COMP%] {
      flex-shrink: 0;
      border-radius: 10px;
      padding: 8px 10px;
      font-size: 13px;
      font-weight: 800;
      color: var(--%NS%v2-foret);
      cursor: pointer;
    }
    .bulk[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-sauge);
    }
    .bulk[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
    }
    .list[_ngcontent-%COMP%] {
      max-height: 260px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .opt[_ngcontent-%COMP%] {
      display: flex;
      min-height: 48px;
      align-items: center;
      gap: 12px;
      border-top: 1px solid var(--%NS%v2-separateur);
      padding: 8px 14px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
    }
    .opt[_ngcontent-%COMP%]:first-child {
      border-top: none;
    }
    .opt[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
    }
    .opt.on[_ngcontent-%COMP%] {
      background: color-mix(in oklab, var(--%NS%v2-sauge) 70%, transparent);
    }
    .opt[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
      height: 20px;
      width: 20px;
      flex-shrink: 0;
      accent-color: var(--%NS%v2-foret);
      cursor: pointer;
    }
    .hint[_ngcontent-%COMP%] {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    .error[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-erreur-fg);
    }`]})}},An=[`*`];(class e{static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-chip-rail`]],hostAttrs:[`role`,`group`,1,`relative`,`block`,`min-w-0`],ngContentSelectors:An,decls:2,vars:0,consts:[[1,`chip-rail-track`,`-mx-1`,`flex`,`gap-2`,`overflow-x-auto`,`overscroll-x-contain`,`px-1`,`pb-1`,`[scrollbar-width:thin]`,`snap-x`,`snap-mandatory`,`md:flex-wrap`,`md:overflow-visible`,`md:pb-0`]],template:function(e,t){e&1&&(pe(),c(0,`div`,0),h(1),B())},styles:[`[_nghost-%COMP%]::after {
      content: "";
      pointer-events: none;
      position: absolute;
      inset-block: 0;
      inset-inline-end: 0;
      width: 1.75rem;
      background: linear-gradient(to left, var(--%NS%sem-surface), transparent);
      opacity: 0.9;
    }
    @media (min-width: 768px) {
      [_nghost-%COMP%]::after {
        display: none;
      }
    }`]})}});var jn=[[[``,`collapsible-summary`,``]],`*`],Mn=[`[collapsible-summary]`,`*`];function Nn(e,t){if(e&1&&(_(0,`span`,1),w(1,`ui-icon`,12),p()),e&2){let e=k();I(),A(`name`,e.icon())(`size`,20)}}function Pn(e,t){if(e&1&&(_(0,`span`,4),F(1),p()),e&2){let e=k();I(),G(e.subtitle())}}var Fn=0,In=class e{constructor(){this.title=z.required(),this.subtitle=z(``),this.icon=z(null),this.defaultOpen=z(!0),this.storageKey=z(``),this.panelId=`collapsible-${Fn++}`,this.open=m(!0),Ee(()=>{let e=null;try{e=this.storageKey()?window.localStorage.getItem(this.storageKey()):null}catch{}this.open.set(e===null?this.defaultOpen():e===`1`)})}toggle(){let e=!this.open();if(this.open.set(e),this.storageKey())try{window.localStorage.setItem(this.storageKey(),e?`1`:`0`)}catch{}}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-collapsible`]],hostAttrs:[1,`block`],inputs:{title:[1,`title`],subtitle:[1,`subtitle`],icon:[1,`icon`],defaultOpen:[1,`defaultOpen`],storageKey:[1,`storageKey`]},ngContentSelectors:Mn,decls:17,vars:11,consts:[[`type`,`button`,1,`head`,3,`click`],[1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-[12px]`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[1,`min-w-0`,`flex-1`],[1,`block`,`text-[18px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`],[1,`mt-0.5`,`block`,`text-[13px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[`aria-hidden`,`true`,1,`toggle`],[`name`,`keyboard_arrow_down`,1,`chev`,3,`size`],[1,`summary`],[1,`clip`],[1,`pt-3`],[`role`,`region`,1,`panel`,3,`id`],[1,`pt-4`],[3,`name`,`size`]],template:function(e,t){e&1&&(pe(jn),_(0,`div`)(1,`button`,0),l(`click`,function(){return t.toggle()}),K(2,Nn,2,2,`span`,1),_(3,`span`,2)(4,`span`,3),F(5),p(),K(6,Pn,2,1,`span`,4),p(),_(7,`span`,5),w(8,`ui-icon`,6),p()(),_(9,`div`,7)(10,`div`,8)(11,`div`,9),h(12),p()()(),_(13,`div`,10)(14,`div`,8)(15,`div`,11),h(16,1),p()()()()),e&2&&(L(`open`,t.open()),I(),W(`aria-expanded`,t.open())(`aria-controls`,t.panelId),I(),M(t.icon()?2:-1),I(3),G(t.title()),I(),M(t.subtitle()?6:-1),I(2),A(`size`,22),I(),W(`aria-hidden`,t.open()),I(4),A(`id`,t.panelId),W(`inert`,t.open()?null:``))},dependencies:[i],styles:[`.head[_ngcontent-%COMP%] {
      display: flex;
      width: 100%;
      align-items: center;
      gap: 12px;
      border-radius: 18px;
      padding: 4px;
      text-align: left;
      cursor: pointer;
    }
    .head[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 4px;
    }
    .toggle[_ngcontent-%COMP%] {
      display: grid;
      height: 36px;
      width: 36px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-ardoise);
      transition:
        background-color 0.2s ease,
        color 0.2s ease;
    }
    .head[_ngcontent-%COMP%]:hover   .toggle[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .chev[_ngcontent-%COMP%] {
      transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    }
    .open[_ngcontent-%COMP%]   .chev[_ngcontent-%COMP%] {
      transform: rotate(180deg);
    }
    .summary[_ngcontent-%COMP%] {
      display: grid;
      grid-template-rows: 1fr;
      opacity: 1;
      transition:
        grid-template-rows 0.3s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.2s ease;
    }
    .open[_ngcontent-%COMP%]   .summary[_ngcontent-%COMP%] {
      grid-template-rows: 0fr;
      opacity: 0;
    }
    .panel[_ngcontent-%COMP%] {
      display: grid;
      grid-template-rows: 0fr;
      opacity: 0;
      transition:
        grid-template-rows 0.35s cubic-bezier(0.32, 0.72, 0, 1),
        opacity 0.25s ease;
    }
    .open[_ngcontent-%COMP%]   .panel[_ngcontent-%COMP%] {
      grid-template-rows: 1fr;
      opacity: 1;
    }
    .clip[_ngcontent-%COMP%] {
      min-height: 0;
      overflow: hidden;
    }
    @media (prefers-reduced-motion: reduce) {
      .chev[_ngcontent-%COMP%], 
   .summary[_ngcontent-%COMP%], 
   .panel[_ngcontent-%COMP%] {
        transition: none;
      }
    }`]})}},Ln=[[[``,`hero-actions`,``]],[[``,`hero-extra`,``]]],Rn=[`[hero-actions]`,`[hero-extra]`],zn=(e,t)=>t.label,Bn=(e,t)=>t.text;function Vn(e,t){if(e&1&&w(0,`ui-icon`,12),e&2){let e=k();A(`name`,e.icon())(`size`,32)}}function Hn(e,t){if(e&1&&F(0),e&2){let e=k();U(` `,e.mono(),` `)}}function Un(e,t){if(e&1&&(_(0,`p`,14),F(1),p()),e&2){let e=k();I(),G(e.eyebrow())}}function Wn(e,t){if(e&1&&w(0,`ui-icon`,12),e&2){let e=k().$implicit;A(`name`,e.icon)(`size`,14)}}function Gn(e,t){if(e&1&&(_(0,`span`,21),K(1,Wn,1,2,`ui-icon`,12),F(2),p()),e&2){let e=t.$implicit;R(`t-`+(e.tone??`glass`)),L(`is-mono`,e.mono),I(),M(e.icon?1:-1),I(),U(` `,e.label,` `)}}function Kn(e,t){if(e&1&&(_(0,`div`,16),P(1,Gn,3,6,`span`,20,zn),p()),e&2){let e=k();I(),s(e.badges())}}function qn(e,t){if(e&1&&(_(0,`span`,22),w(1,`ui-icon`,12),F(2),p()),e&2){let e=t.$implicit;I(),A(`name`,e.icon)(`size`,16),I(),G(e.text)}}function Jn(e,t){if(e&1&&(_(0,`p`,17),P(1,qn,3,3,`span`,22,Bn),p()),e&2){let e=k();I(),s(e.meta())}}function Yn(e,t){if(e&1&&(_(0,`a`,19),w(1,`ui-icon`,23),F(2),p()),e&2){let e=k();A(`routerLink`,e.crumb().link),I(),A(`size`,18),I(),U(``,e.backLabel(),` `)}}var Xn=class e{constructor(){this.crumb=z.required(),this.title=z.required(),this.eyebrow=z(``),this.mono=z(``),this.icon=z(null),this.badges=z([]),this.meta=z([]),this.backLabel=z(``)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-detail-hero`]],hostAttrs:[1,`block`],inputs:{crumb:[1,`crumb`],title:[1,`title`],eyebrow:[1,`eyebrow`],mono:[1,`mono`],icon:[1,`icon`],badges:[1,`badges`],meta:[1,`meta`],backLabel:[1,`backLabel`]},ngContentSelectors:Rn,decls:26,vars:12,consts:[[1,`hero`,`p-6`,`sm:p-8`],[`viewBox`,`0 0 320 220`,`aria-hidden`,`true`,1,`pointer-events-none`,`absolute`,`-right-16`,`-top-10`,`h-72`,`w-[30rem]`,`opacity-[0.06]`],[`d`,`M10 120 Q160 60 310 110`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`d`,`M30 168 Q170 108 310 156`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`d`,`M60 212 Q180 160 310 200`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`aria-label`,`Fil d'Ariane`,1,`crumb`,`relative`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-semibold`],[3,`routerLink`],[`name`,`chevron_right`,2,`opacity`,`0.5`,3,`size`],[`aria-current`,`page`,1,`truncate`,2,`color`,`var(--v2-citron)`],[1,`relative`,`mt-6`,`flex`,`flex-wrap`,`items-start`,`justify-between`,`gap-6`],[1,`flex`,`min-w-0`,`items-start`,`gap-5`],[`aria-hidden`,`true`,1,`mono`],[3,`name`,`size`],[1,`min-w-0`],[1,`text-[12px]`,`font-bold`,`uppercase`,`tracking-[0.08em]`,2,`color`,`var(--v2-citron)`,`font-family`,`var(--v2-font-mono)`],[1,`text-[26px]`,`font-extrabold`,`leading-[1.08]`,`tracking-[-0.03em]`,`sm:text-[34px]`],[1,`mt-3`,`flex`,`flex-wrap`,`gap-2`],[1,`mt-3`,`flex`,`flex-wrap`,`items-center`,`gap-x-4`,`gap-y-1`,`text-[14px]`,`font-medium`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 75%, transparent)`],[1,`flex`,`flex-wrap`,`items-center`,`gap-2`],[1,`back`,3,`routerLink`],[1,`badge`,3,`class`,`is-mono`],[1,`badge`],[1,`inline-flex`,`items-center`,`gap-1.5`],[`name`,`arrow_forward`,2,`transform`,`rotate(180deg)`,3,`size`]],template:function(e,t){e&1&&(pe(Ln),_(0,`section`,0),Le(),_(1,`svg`,1),w(2,`path`,2)(3,`path`,3)(4,`path`,4),p(),ne(),_(5,`nav`,5)(6,`a`,6),F(7),p(),w(8,`ui-icon`,7),_(9,`span`,8),F(10),p()(),_(11,`div`,9)(12,`div`,10)(13,`span`,11),K(14,Vn,1,2,`ui-icon`,12)(15,Hn,1,1),p(),_(16,`div`,13),K(17,Un,2,1,`p`,14),_(18,`h1`,15),F(19),p(),K(20,Kn,3,0,`div`,16),K(21,Jn,3,0,`p`,17),p()(),_(22,`div`,18),h(23),K(24,Yn,3,3,`a`,19),p()(),h(25,1),p()),e&2&&(I(6),A(`routerLink`,t.crumb().link),I(),G(t.crumb().label),I(),A(`size`,16),I(2),G(t.title()),I(4),M(t.icon()?14:15),I(3),M(t.eyebrow()?17:-1),I(),L(`mt-1`,!!t.eyebrow()),I(),G(t.title()),I(),M(t.badges().length?20:-1),I(),M(t.meta().length?21:-1),I(3),M(t.backLabel()?24:-1))},dependencies:[i,et],styles:[`.hero[_ngcontent-%COMP%] {
      position: relative;
      overflow: hidden;
      border-radius: 28px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
      animation: _ngcontent-%COMP%_hero-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;
    }
    .mono[_ngcontent-%COMP%] {
      display: grid;
      height: 72px;
      width: 72px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 22px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
      font-family: var(--%NS%v2-font-mono);
      font-size: 20px;
      font-weight: 700;
      transition: transform 0.3s ease;
    }
    .hero[_ngcontent-%COMP%]:hover   .mono[_ngcontent-%COMP%] {
      transform: rotate(-4deg) scale(1.04);
    }
    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%] {
      color: color-mix(in oklab, var(--%NS%v2-blanc) 70%, transparent);
      transition: color 0.15s ease;
    }
    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:hover {
      color: var(--%NS%v2-citron);
    }
    .crumb[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]:focus-visible, 
   .back[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-citron);
      outline-offset: 3px;
      border-radius: 6px;
    }
    .back[_ngcontent-%COMP%] {
      display: inline-flex;
      height: 44px;
      align-items: center;
      gap: 8px;
      border-radius: 14px;
      border: 1.5px solid color-mix(in oklab, var(--%NS%v2-blanc) 25%, transparent);
      padding: 0 14px;
      font-size: 14px;
      font-weight: 800;
      color: var(--%NS%v2-blanc);
      white-space: nowrap;
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .back[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-citron);
      background: color-mix(in oklab, var(--%NS%v2-blanc) 10%, transparent);
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
    .t-citron[_ngcontent-%COMP%] {
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }
    .t-light[_ngcontent-%COMP%] {
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-foret);
    }
    .t-glass[_ngcontent-%COMP%] {
      background: color-mix(in oklab, var(--%NS%v2-blanc) 12%, transparent);
      color: var(--%NS%v2-blanc);
    }
    .t-warn[_ngcontent-%COMP%] {
      background: var(--%NS%v2-attente-bg);
      color: var(--%NS%v2-attente-fg);
    }
    .t-danger[_ngcontent-%COMP%] {
      background: var(--%NS%v2-erreur-bg);
      color: var(--%NS%v2-erreur-fg);
    }
    .is-mono[_ngcontent-%COMP%] {
      font-family: var(--%NS%v2-font-mono);
    }
    @keyframes _ngcontent-%COMP%_hero-rise {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .hero[_ngcontent-%COMP%], 
   .mono[_ngcontent-%COMP%] {
        animation: none;
        transition: none;
      }
    }`]})}},Zn=[[[``,`modal-badges`,``]],`*`,[[``,`modal-footer`,``]]],Qn=[`[modal-badges]`,`*`,`[modal-footer]`];function $n(e,t){if(e&1&&(_(0,`span`,12),w(1,`ui-icon`,13),p()),e&2){let e=k(2);V(`background`,e.tone()===`danger`?`var(--v2-erreur-fg)`:e.tone()===`brand`?`var(--v2-citron)`:`var(--v2-foret)`)(`color`,e.tone()===`danger`?`var(--v2-erreur-bg)`:e.tone()===`brand`?`var(--v2-foret)`:`var(--v2-citron)`),I(),A(`name`,e.icon())(`size`,24)}}function er(e,t){if(e&1&&(_(0,`p`,7),F(1),p()),e&2){let e=k(2);A(`id`,e.descId),I(),G(e.description())}}function tr(e,t){if(e&1){let e=x();_(0,`div`,1),l(`click`,function(t){j(e);let n=k();return v(n.onBackdrop(t))}),_(1,`section`,2),l(`dismiss`,function(){j(e);let t=k();return v(t.closed.emit())}),_(2,`header`,3),K(3,$n,2,6,`span`,4),_(4,`div`,5)(5,`h2`,6),F(6),p(),K(7,er,2,2,`p`,7),h(8),p(),_(9,`button`,8),l(`click`,function(){j(e);let t=k();return v(t.closed.emit())}),w(10,`ui-icon`,9),p()(),_(11,`div`,10),h(12,1),p(),_(13,`footer`,11),h(14,2),p()()()}if(e&2){let e=k();I(),V(`max-width`,e.width(),`px`),L(`brand`,e.tone()===`brand`),W(`aria-labelledby`,e.titleId)(`aria-describedby`,e.description()?e.descId:null),I(2),M(e.icon()?3:-1),I(2),A(`id`,e.titleId),I(),G(e.title()),I(),M(e.description()?7:-1),I(2),W(`aria-label`,e.closeLabel()),I(),A(`size`,22),I(),L(`pt-6`,e.tone()===`brand`)}}var nr=0,rr=class e{constructor(){this.open=z(!1),this.title=z.required(),this.description=z(``),this.icon=z(null),this.tone=z(`default`),this.width=z(620),this.closeLabel=z(`Fermer`),this.closed=S(),this.uid=nr++,this.titleId=`modal-${this.uid}-title`,this.descId=`modal-${this.uid}-desc`}onBackdrop(e){e.target===e.currentTarget&&this.closed.emit()}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-modal`]],inputs:{open:[1,`open`],title:[1,`title`],description:[1,`description`],icon:[1,`icon`],tone:[1,`tone`],width:[1,`width`],closeLabel:[1,`closeLabel`]},outputs:{closed:`closed`},ngContentSelectors:Qn,decls:1,vars:1,consts:[[1,`backdrop`],[1,`backdrop`,3,`click`],[`role`,`dialog`,`aria-modal`,`true`,`uiModalA11y`,``,1,`sheet`,3,`dismiss`],[1,`head`,`flex`,`items-start`,`gap-4`,`px-6`,`pb-4`,`pt-6`,`sm:px-8`,`sm:pt-7`],[1,`grid`,`size-12`,`shrink-0`,`place-items-center`,`rounded-[14px]`,3,`background`,`color`],[1,`min-w-0`,`flex-1`],[1,`text-[22px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.02em]`,3,`id`],[1,`desc`,`mt-1.5`,`text-[14px]`,`font-medium`,`leading-relaxed`,2,`color`,`var(--v2-gris-texte)`,3,`id`],[`type`,`button`,1,`close`,`shrink-0`,3,`click`],[`name`,`close`,3,`size`],[1,`min-h-0`,`flex-1`,`overflow-y-auto`,`px-6`,`pb-2`,`sm:px-8`],[1,`flex`,`flex-wrap`,`justify-end`,`gap-3`,`border-t`,`px-6`,`py-5`,`sm:px-8`,2,`border-color`,`var(--v2-separateur)`],[1,`grid`,`size-12`,`shrink-0`,`place-items-center`,`rounded-[14px]`],[3,`name`,`size`]],template:function(e,t){e&1&&(pe(Zn),K(0,tr,15,14,`div`,0)),e&2&&M(t.open()?0:-1)},dependencies:[i,r],styles:[`.backdrop[_ngcontent-%COMP%] {
      position: fixed;
      inset: 0;
      z-index: 120;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      background: color-mix(in oklab, var(--%NS%v2-encre) 45%, transparent);
      padding: 0;
      animation: _ngcontent-%COMP%_fade 0.18s ease both;
    }
    @media (min-width: 640px) {
      .backdrop[_ngcontent-%COMP%] {
        align-items: center;
        padding: 24px;
      }
    }
    .sheet[_ngcontent-%COMP%] {
      display: flex;
      max-height: calc(100dvh - 24px);
      width: 100%;
      flex-direction: column;
      border-radius: 28px 28px 0 0;
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-encre);
      font-family: var(--%NS%v2-font);
      box-shadow: var(--%NS%v2-ombre-modale);
      animation: _ngcontent-%COMP%_rise 0.26s cubic-bezier(0.32, 0.72, 0, 1) backwards;
    }
    @media (min-width: 640px) {
      .sheet[_ngcontent-%COMP%] {
        max-height: calc(100dvh - 48px);
        border-radius: 32px;
      }
    }
    
    .sheet.brand[_ngcontent-%COMP%] {
      overflow: hidden;
    }
    .brand[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
      padding-bottom: 22px;
    }
    .brand[_ngcontent-%COMP%]   .head[_ngcontent-%COMP%]   .desc[_ngcontent-%COMP%] {
      color: color-mix(in oklab, var(--%NS%v2-blanc) 72%, transparent) !important;
    }
    .brand[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%] {
      color: var(--%NS%v2-blanc);
      background: color-mix(in oklab, var(--%NS%v2-blanc) 10%, transparent);
    }
    .brand[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }
    .brand[_ngcontent-%COMP%]   .close[_ngcontent-%COMP%]:focus-visible {
      outline-color: var(--%NS%v2-citron);
    }
    .close[_ngcontent-%COMP%] {
      display: grid;
      height: 40px;
      width: 40px;
      place-items: center;
      border-radius: 12px;
      color: var(--%NS%v2-gris-texte);
      cursor: pointer;
    }
    .close[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-encre);
    }
    .close[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    @keyframes _ngcontent-%COMP%_fade {
      from {
        opacity: 0;
      }
    }
    @keyframes _ngcontent-%COMP%_rise {
      from {
        opacity: 0;
        transform: translateY(16px) scale(0.98);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .backdrop[_ngcontent-%COMP%], 
   .sheet[_ngcontent-%COMP%] {
        animation: none;
      }
    }`]})}},ir=[[[``,`detail-body`,``]],[[``,`detail-actions`,``]]],ar=[`[detail-body]`,`[detail-actions]`],or=e=>({count:e}),sr=(e,t)=>t.label,cr=(e,t)=>t.title;function lr(e,t){if(e&1&&(_(0,`span`,11),F(1),p()),e&2){let e=t.$implicit;V(`background`,e.bg)(`color`,e.fg),I(),G(e.label)}}function ur(e,t){if(e&1&&(_(0,`div`,2),P(1,lr,2,5,`span`,10,sr),p()),e&2){let e=k();I(),s(e.badges)}}function dr(e,t){if(e&1&&(_(0,`div`,13),w(1,`ui-icon`,14),_(2,`p`,15),F(3),p(),_(4,`p`,16),F(5),p()()),e&2){let e=t.$implicit;V(`background`,e.tone.bg)(`color`,e.tone.fg),I(),A(`name`,e.icon)(`size`,64),I(),V(`opacity`,e.muted?.45:1),I(),G(e.value),I(2),G(e.label)}}function fr(e,t){if(e&1&&(_(0,`div`,3),P(1,dr,6,10,`div`,12,sr),p()),e&2){let e=k();I(),s(e.kpis)}}function pr(e,t){if(e&1&&(_(0,`span`,11),F(1),p()),e&2){let e=k().$implicit;V(`background`,e.tone.bg)(`color`,e.tone.fg),I(),G(e.value)}}function mr(e,t){if(e&1&&F(0),e&2){let e=k().$implicit;U(` `,e.value,` `)}}function hr(e,t){if(e&1&&(_(0,`div`,17)(1,`span`,18),w(2,`ui-icon`,19),p(),_(3,`div`,20)(4,`dt`),F(5),p(),_(6,`dd`,21),K(7,pr,2,5,`span`,10)(8,mr,1,1),p()()()),e&2){let e=t.$implicit;L(`wide`,e.wide),I(2),A(`name`,e.icon)(`size`,18),I(3),G(e.label),I(),L(`zero`,e.muted),I(),M(e.tone&&!e.muted?7:8)}}function gr(e,t){if(e&1&&(_(0,`span`,23),F(1),p()),e&2){let e=k().$implicit,t=k(2);I(),G(t.nf.format(e.count))}}function _r(e,t){if(e&1&&(_(0,`span`,27),F(1),p()),e&2){let e=k().$implicit;I(),G(e.initials)}}function vr(e,t){if(e&1&&(_(0,`span`,28),F(1),p()),e&2){let e=k().$implicit;I(),G(e.index)}}function yr(e,t){if(e&1&&(_(0,`span`,31),F(1),p()),e&2){let e=k().$implicit;I(),G(e.sub)}}function br(e,t){if(e&1&&(_(0,`span`,33),F(1),p()),e&2){let e=k().$implicit;V(`background`,e.badge.bg)(`color`,e.badge.fg),I(),G(e.badge.label)}}function xr(e,t){if(e&1&&(_(0,`li`),K(1,_r,2,1,`span`,27)(2,vr,2,1,`span`,28),_(3,`span`,29)(4,`span`,30),F(5),p(),K(6,yr,2,1,`span`,31),p(),K(7,br,2,5,`span`,32),p()),e&2){let e=t.$implicit;I(),M(e.initials?1:e.index?2:-1),I(4),G(e.label),I(),M(e.sub?6:-1),I(),M(e.badge?7:-1)}}function Sr(e,t){if(e&1&&(_(0,`p`,26),F(1),p()),e&2){let e=k(2).$implicit,t=k(2);I(),G(t.t()(`common.detail.more`,y(1,or,e.more)))}}function Cr(e,t){if(e&1&&(_(0,`ul`,25),P(1,xr,8,4,`li`,null,Pe),p(),K(3,Sr,2,3,`p`,26)),e&2){let e=k().$implicit;I(),s(e.items),I(2),M(e.more>0?3:-1)}}function wr(e,t){if(e&1&&(_(0,`p`,24),F(1),p()),e&2){let e=k().$implicit;I(),G(e.empty)}}function Tr(e,t){if(e&1&&(_(0,`h3`,22),w(1,`ui-icon`,19),F(2),K(3,gr,2,1,`span`,23),p(),K(4,Cr,4,1)(5,wr,2,1,`p`,24)),e&2){let e=t.$implicit;I(),A(`name`,e.icon)(`size`,18),I(),U(` `,e.title,` `),I(),M(e.count===null?-1:3),I(),M(e.items.length?4:5)}}function Er(e,t){if(e&1&&(_(0,`a`,9),F(1),_(2,`span`,34),w(3,`ui-icon`,35),p()()),e&2){let e=k(),t=k();A(`routerLink`,e.link),I(),U(` `,t.t()(`common.openFull`),` `),I(2),A(`size`,18)}}function Dr(e,t){if(e&1){let e=x();_(0,`ui-modal`,1),l(`closed`,function(){j(e);let t=k();return v(t.closed.emit())}),K(1,ur,3,0,`div`,2),K(2,fr,3,0,`div`,3),_(3,`dl`,4),P(4,hr,9,8,`div`,5,sr),p(),P(6,Tr,6,5,null,null,cr),h(8),w(9,`div`,6),_(10,`div`,7),h(11,1),p(),_(12,`button`,8),l(`click`,function(){j(e);let t=k();return v(t.closed.emit())}),F(13),p(),K(14,Er,4,3,`a`,9),p()}if(e&2){let e=t,n=k();A(`open`,!0)(`title`,e.title)(`description`,e.subtitle)(`icon`,e.icon)(`width`,n.width())(`closeLabel`,n.t()(`common.close`)),I(),M(e.badges.length?1:-1),I(),M(e.kpis.length?2:-1),I(),L(`mt-4`,e.kpis.length),I(),s(e.facts),I(2),s(e.sections),I(7),G(n.t()(`common.close`)),I(),M(e.link?14:-1)}}var Or=class e{constructor(){this.view=z(null),this.width=z(600),this.closed=S(),this.t=q(it).t,this.nf=rt}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-detail-modal`]],inputs:{view:[1,`view`],width:[1,`width`]},outputs:{closed:`closed`},ngContentSelectors:ar,decls:1,vars:1,consts:[[`tone`,`brand`,3,`open`,`title`,`description`,`icon`,`width`,`closeLabel`],[`tone`,`brand`,3,`closed`,`open`,`title`,`description`,`icon`,`width`,`closeLabel`],[`modal-badges`,``,1,`mt-3`,`flex`,`flex-wrap`,`gap-2`],[1,`kpis`],[1,`facts`],[1,`fact`,3,`wide`],[`aria-hidden`,`true`,1,`h-4`],[`modal-footer`,``,1,`contents`],[`modal-footer`,``,`type`,`button`,1,`btn`,`btn-ghost`,3,`click`],[`modal-footer`,``,1,`btn`,`btn-primary`,3,`routerLink`],[1,`badge`,3,`background`,`color`],[1,`badge`],[1,`kpi`,3,`background`,`color`],[1,`kpi`],[1,`kpi-ico`,3,`name`,`size`],[1,`kpi-value`],[1,`kpi-label`],[1,`fact`],[`aria-hidden`,`true`,1,`fact-ico`],[3,`name`,`size`],[1,`min-w-0`],[1,`tabular-nums`],[1,`sec-title`,`mb-2`,`mt-6`],[1,`n`,`tabular-nums`],[1,`sub`,`rounded-[16px]`,`px-4`,`py-3`,2,`background`,`var(--v2-creme)`],[1,`dlist`],[1,`sub`,`mt-2`],[1,`avatar`],[1,`avatar`,`step`],[1,`min-w-0`,`flex-1`],[1,`block`,`truncate`,`font-bold`],[1,`sub`,`block`,`truncate`],[1,`badge`,`shrink-0`,3,`background`,`color`],[1,`badge`,`shrink-0`],[1,`grid`,`size-9`,`place-items-center`,`rounded-[12px]`,2,`background`,`var(--v2-citron)`,`color`,`var(--v2-foret)`],[`name`,`arrow_forward`,3,`size`]],template:function(e,t){if(e&1&&(pe(ir),K(0,Dr,15,12,`ui-modal`,0)),e&2){let e;M((e=t.view())?0:-1,e)}},dependencies:[et,i,rr],styles:[`.mono[_ngcontent-%COMP%] {
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
  }`,`
  .kpis[_ngcontent-%COMP%] {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }
  .kpi[_ngcontent-%COMP%] {
    position: relative;
    overflow: hidden;
    border-radius: 18px;
    padding: 14px 16px;
  }
  .kpi[_ngcontent-%COMP%]   .kpi-ico[_ngcontent-%COMP%] {
    position: absolute;
    right: -6px;
    bottom: -10px;
    opacity: 0.14;
  }
  .kpi-value[_ngcontent-%COMP%] {
    font-size: 26px;
    font-weight: 800;
    line-height: 1;
    letter-spacing: -0.03em;
    font-variant-numeric: tabular-nums;
  }
  .kpi-label[_ngcontent-%COMP%] {
    margin-top: 6px;
    font-size: 12px;
    font-weight: 700;
  }
  .sec-title[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 800;
    color: var(--%NS%v2-encre);
  }
  .sec-title[_ngcontent-%COMP%]   .n[_ngcontent-%COMP%] {
    border-radius: 999px;
    background: var(--%NS%v2-creme);
    padding: 1px 8px;
    font-size: 12px;
    color: var(--%NS%v2-ardoise);
  }
  .facts[_ngcontent-%COMP%] {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid var(--%NS%v2-bord-carte);
  }
  .fact[_ngcontent-%COMP%] {
    display: flex;
    min-width: 0;
    align-items: center;
    gap: 12px;
    border-top: 1px solid var(--%NS%v2-separateur);
    padding: 12px 14px;
  }
  .fact[_ngcontent-%COMP%]:nth-child(-n + 2) {
    border-top: none;
  }
  .fact[_ngcontent-%COMP%]:nth-child(even) {
    border-left: 1px solid var(--%NS%v2-separateur);
  }
  .fact.wide[_ngcontent-%COMP%] {
    grid-column: 1 / -1;
    border-left: none;
  }
  .fact-ico[_ngcontent-%COMP%] {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 10px;
    background: var(--%NS%v2-sauge);
    color: var(--%NS%v2-foret);
  }
  .fact[_ngcontent-%COMP%]   dt[_ngcontent-%COMP%] {
    font-size: 12px;
    font-weight: 600;
    color: var(--%NS%v2-gris-texte);
  }
  .fact[_ngcontent-%COMP%]   dd[_ngcontent-%COMP%] {
    margin-top: 1px;
    overflow-wrap: anywhere;
    font-size: 14px;
    font-weight: 800;
  }
  .dlist[_ngcontent-%COMP%] {
    overflow: hidden;
    border-radius: 18px;
    border: 1px solid var(--%NS%v2-bord-carte);
  }
  .dlist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {
    display: flex;
    align-items: center;
    gap: 12px;
    border-top: 1px solid var(--%NS%v2-separateur);
    padding: 10px 14px;
    font-size: 14px;
  }
  .dlist[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]:first-child {
    border-top: none;
  }
  .avatar[_ngcontent-%COMP%] {
    display: grid;
    height: 32px;
    width: 32px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 999px;
    background: var(--%NS%v2-sauge);
    color: var(--%NS%v2-foret);
    font-size: 11px;
    font-weight: 800;
  }
  .step[_ngcontent-%COMP%] {
    background: var(--%NS%v2-foret);
    color: var(--%NS%v2-citron);
  }
  @media (max-width: 520px) {
    .facts[_ngcontent-%COMP%] {
      grid-template-columns: 1fr;
    }
    .fact[_ngcontent-%COMP%]:nth-child(2) {
      border-top: 1px solid var(--%NS%v2-separateur);
    }
    .fact[_ngcontent-%COMP%]:nth-child(even) {
      border-left: none;
    }
  }`]})}},kr=`—`,Ar=e=>e==null||e===``;function jr(e,t,n,r={}){return{label:e,value:Ar(t)?kr:t,icon:n,muted:Ar(t),wide:r.wide??!1,tone:r.tone}}function Mr(e,t,n,r,i){return{label:e,value:i??rt.format(t),icon:n,tone:r,muted:t===0}}var Nr=[`panel`],Pr=[`*`,[[``,`actions`,``]]],Fr=[`*`,`[actions]`];function Ir(e,t){if(e&1&&(c(0,`h2`,4),F(1),B()),e&2){let e=k(2);C(`id`,e.titleId),I(),G(e.title())}}function Lr(e,t){if(e&1){let e=x();c(0,`div`,1)(1,`div`,2),Me(`click`,function(){j(e);let t=k();return v(t.dismiss())}),B(),c(2,`div`,3,0),K(4,Ir,2,2,`h2`,4),c(5,`div`,5),h(6),B(),c(7,`div`,6),h(8,1),B()()()}if(e&2){let e=k();I(2),W(`aria-modal`,!0)(`aria-labelledby`,e.titleId),I(2),M(e.title()?4:-1)}}var Rr=class n{constructor(){this.open=Ae(!1),this.title=z(``),this.closed=S(),this.titleId=`dlg-${Math.random().toString(36).slice(2,9)}`,this.panel=ae(`panel`),this.previous=null,this.locked=!1,re(()=>{this.open()?(this.previous=document.activeElement instanceof HTMLElement?document.activeElement:null,this.locked||=(a(),!0),setTimeout(()=>{let t=this.panel()?.nativeElement;t&&e(t)},0)):this.release()})}onKeydown(e){if(!this.open())return;if(e.key===`Escape`){e.preventDefault(),this.dismiss();return}let t=this.panel()?.nativeElement;t&&o(t,e)}dismiss(){this.open.set(!1),this.closed.emit()}release(){this.locked&&=(t(),!1),this.previous?.focus({preventScroll:!0}),this.previous=null}static{this.ɵfac=function(e){return new(e||n)}}static{this.ɵcmp=O({type:n,selectors:[[`ui-dialog`]],viewQuery:function(e,t){e&1&&Xe(t.panel,Nr,5),e&2&&ge()},hostBindings:function(e,t){e&1&&l(`keydown`,function(e){return t.onKeydown(e)},ze)},inputs:{open:[1,`open`],title:[1,`title`]},outputs:{open:`openChange`,closed:`closed`},ngContentSelectors:Fr,decls:1,vars:1,consts:[[`panel`,``],[1,`fixed`,`inset-0`,`z-50`,`flex`,`items-end`,`justify-center`,`sm:items-center`],[1,`absolute`,`inset-0`,`bg-black/40`,3,`click`],[`role`,`dialog`,`tabindex`,`-1`,1,`relative`,`z-10`,`max-h-[90vh]`,`w-full`,`overflow-y-auto`,`rounded-t-lg`,`border`,`bg-card`,`p-5`,`shadow-lg`,`sm:max-w-md`,`sm:rounded-lg`],[1,`text-lg`,`font-semibold`,3,`id`],[1,`mt-3`],[1,`mt-5`,`flex`,`flex-wrap`,`justify-end`,`gap-2`]],template:function(e,t){e&1&&(pe(Pr),K(0,Lr,9,3,`div`,1)),e&2&&M(t.open()?0:-1)},encapsulation:2})}},zr=[`*`];(class e{static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-empty`]],ngContentSelectors:zr,decls:2,vars:0,consts:[[1,`px-4`,`py-10`,`text-center`,`text-muted-foreground`]],template:function(e,t){e&1&&(pe(),c(0,`div`,0),h(1),B())},encapsulation:2})}});var Br=(()=>{class e{_renderer;_elementRef;onChange=e=>{};onTouched=()=>{};constructor(e,t){this._renderer=e,this._elementRef=t}setProperty(e,t){this._renderer.setProperty(this._elementRef.nativeElement,e,t)}registerOnTouched(e){this.onTouched=e}registerOnChange(e){this.onChange=e}setDisabledState(e){this.setProperty(`disabled`,e)}static ɵfac=function(t){return new(t||e)(d(te),d(me))};static ɵdir=u({type:e})}return e})(),Vr=(()=>{class e extends Br{static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,features:[H]})}return e})(),Hr=new je(``),Ur={provide:Hr,useExisting:E(()=>Wr),multi:!0},Wr=(()=>{class e extends Vr{writeValue(e){this.setProperty(`checked`,e)}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`input`,`type`,`checkbox`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`checkbox`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`checkbox`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(e,t){e&1&&l(`change`,function(e){return t.onChange(e.target.checked)})(`blur`,function(){return t.onTouched()})},standalone:!1,features:[N([Ur]),H]})}return e})(),Gr={provide:Hr,useExisting:E(()=>Jr),multi:!0};function Kr(){let e=de()?de().getUserAgent():``;return/android (\d+)/.test(e.toLowerCase())}var qr=new je(``),Jr=(()=>{class e extends Br{_compositionMode;_composing=!1;constructor(e,t,n){super(e,t),this._compositionMode=n,this._compositionMode??=!Kr()}writeValue(e){let t=e??``;this.setProperty(`value`,t)}_handleInput(e){(!this._compositionMode||this._compositionMode&&!this._composing)&&this.onChange(e)}_compositionStart(){this._composing=!0}_compositionEnd(e){this._composing=!1,this._compositionMode&&this.onChange(e)}static ɵfac=function(t){return new(t||e)(d(te),d(me),d(qr,8))};static ɵdir=u({type:e,selectors:[[`input`,`formControlName`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`formControl`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`formControl`,``,3,`ngNoCva`,``],[`input`,`ngModel`,``,3,`type`,`checkbox`,3,`ngNoCva`,``],[`textarea`,`ngModel`,``,3,`ngNoCva`,``],[``,`ngDefaultControl`,``]],hostBindings:function(e,t){e&1&&l(`input`,function(e){return t._handleInput(e.target.value)})(`blur`,function(){return t.onTouched()})(`compositionstart`,function(){return t._compositionStart()})(`compositionend`,function(e){return t._compositionEnd(e.target.value)})},standalone:!1,features:[N([Gr]),H]})}return e})();function Yr(e){return e==null||Xr(e)===0}function Xr(e){return e==null?null:Array.isArray(e)||typeof e==`string`?e.length:e instanceof Set?e.size:null}var X=new je(``),Zr=new je(``),Qr=/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,$r=class{static min(e){return ei(e)}static max(e){return ti(e)}static required(e){return ni(e)}static requiredTrue(e){return ri(e)}static email(e){return ii(e)}static minLength(e){return ai(e)}static maxLength(e){return oi(e)}static pattern(e){return si(e)}static nullValidator(e){return ci()}static compose(e){return hi(e)}static composeAsync(e){return _i(e)}};function ei(e){return t=>{if(t.value==null||e==null)return null;let n=parseFloat(t.value);return!isNaN(n)&&n<e?{min:{min:e,actual:t.value}}:null}}function ti(e){return t=>{if(t.value==null||e==null)return null;let n=parseFloat(t.value);return!isNaN(n)&&n>e?{max:{max:e,actual:t.value}}:null}}function ni(e){return Yr(e.value)?{required:!0}:null}function ri(e){return e.value===!0?null:{required:!0}}function ii(e){return Yr(e.value)||Qr.test(e.value)?null:{email:!0}}function ai(e){return t=>{let n=t.value?.length??Xr(t.value);return n===null||n===0?null:n<e?{minlength:{requiredLength:e,actualLength:n}}:null}}function oi(e){return t=>{let n=t.value?.length??Xr(t.value);return n!==null&&n>e?{maxlength:{requiredLength:e,actualLength:n}}:null}}function si(e){if(!e)return ci;let t,n;return typeof e==`string`?(n=``,e.charAt(0)!==`^`&&(n+=`^`),n+=e,e.charAt(e.length-1)!==`$`&&(n+=`$`),t=new RegExp(n)):(n=e.toString(),t=e),e=>{if(Yr(e.value))return null;let r=e.value;return t.test(r)?null:{pattern:{requiredPattern:n,actualValue:r}}}}function ci(e){return null}function li(e){return e!=null}function ui(e){return ye(e)?ve(e):e}function di(e){let t={};return e.forEach(e=>{t=e==null?t:{...t,...e}}),Object.keys(t).length===0?null:t}function fi(e,t){return t.map(t=>t(e))}function pi(e){return!e.validate}function mi(e){return e.map(e=>pi(e)?e:t=>e.validate(t))}function hi(e){if(!e)return null;let t=e.filter(li);return t.length==0?null:function(e){return di(fi(e,t))}}function gi(e){return e==null?null:hi(mi(e))}function _i(e){if(!e)return null;let t=e.filter(li);return t.length==0?null:function(e){return dt(fi(e,t).map(ui)).pipe(Be(di))}}function vi(e){return e==null?null:_i(mi(e))}function yi(e,t){return e===null?[t]:Array.isArray(e)?[...e,t]:[e,t]}function bi(e){return e._rawValidators}function xi(e){return e._rawAsyncValidators}function Si(e){return e?Array.isArray(e)?e:[e]:[]}function Ci(e,t){return Array.isArray(e)?e.includes(t):e===t}function wi(e,t){let n=Si(t);return Si(e).forEach(e=>{Ci(n,e)||n.push(e)}),n}function Ti(e,t){return Si(t).filter(t=>!Ci(e,t))}var Ei=class{get value(){return this.control?this.control.value:null}get valid(){return this.control?this.control.valid:null}get invalid(){return this.control?this.control.invalid:null}get pending(){return this.control?this.control.pending:null}get disabled(){return this.control?this.control.disabled:null}get enabled(){return this.control?this.control.enabled:null}get errors(){return this.control?this.control.errors:null}get pristine(){return this.control?this.control.pristine:null}get dirty(){return this.control?this.control.dirty:null}get touched(){return this.control?this.control.touched:null}get status(){return this.control?this.control.status:null}get untouched(){return this.control?this.control.untouched:null}get statusChanges(){return this.control?this.control.statusChanges:null}get valueChanges(){return this.control?this.control.valueChanges:null}get path(){return null}_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators=[];_rawAsyncValidators=[];_setValidators(e){this._rawValidators=e||[],this._composedValidatorFn=gi(this._rawValidators)}_setAsyncValidators(e){this._rawAsyncValidators=e||[],this._composedAsyncValidatorFn=vi(this._rawAsyncValidators)}get validator(){return this._composedValidatorFn||null}get asyncValidator(){return this._composedAsyncValidatorFn||null}_onDestroyCallbacks=[];_registerOnDestroy(e){this._onDestroyCallbacks.push(e)}_invokeOnDestroyCallbacks(){this._onDestroyCallbacks.forEach(e=>e()),this._onDestroyCallbacks=[]}reset(e=void 0){this.control?.reset(e)}hasError(e,t){return this.control?this.control.hasError(e,t):!1}getError(e,t){return this.control?this.control.getError(e,t):null}},Di=class extends Ei{name;get formDirective(){return null}get path(){return null}},Oi=`VALID`,ki=`INVALID`,Ai=`PENDING`,ji=`DISABLED`,Mi=class{},Ni=class extends Mi{value;source;constructor(e,t){super(),this.value=e,this.source=t}},Pi=class extends Mi{pristine;source;constructor(e,t){super(),this.pristine=e,this.source=t}},Fi=class extends Mi{touched;source;constructor(e,t){super(),this.touched=e,this.source=t}},Ii=class extends Mi{status;source;constructor(e,t){super(),this.status=e,this.source=t}},Li=class extends Mi{source;constructor(e){super(),this.source=e}},Ri=class extends Mi{source;constructor(e){super(),this.source=e}};function zi(e){return(Ui(e)?e.validators:e)||null}function Bi(e){return Array.isArray(e)?gi(e):e||null}function Vi(e,t){return(Ui(t)?t.asyncValidators:e)||null}function Hi(e){return Array.isArray(e)?vi(e):e||null}function Ui(e){return e!=null&&!Array.isArray(e)&&typeof e==`object`}function Wi(e,t,n){let r=e.controls;if(!(t?Object.keys(r):r).length)throw new g(1e3,``);if(!qi(r,n))throw new g(1001,``)}function Gi(e,t,n){e._forEachChild((e,t)=>{if(n[t]===void 0)throw new g(-1002,``)})}var Ki=class{_pendingDirty=!1;_hasOwnPendingAsyncValidator=null;_pendingTouched=!1;_onCollectionChange=()=>{};_updateOn;_hasRequired=m(!1);_parent=null;_asyncValidationSubscription;_composedValidatorFn;_composedAsyncValidatorFn;_rawValidators;_rawAsyncValidators;value;constructor(e,t){this._assignValidators(e),this._assignAsyncValidators(t)}get validator(){return this._composedValidatorFn}set validator(e){this._rawValidators=this._composedValidatorFn=e,this._updateHasRequiredValidator()}get asyncValidator(){return this._composedAsyncValidatorFn}set asyncValidator(e){this._rawAsyncValidators=this._composedAsyncValidatorFn=e}get parent(){return this._parent}get status(){return b(this.statusReactive)}set status(e){b(()=>this.statusReactive.set(e))}_status=f(()=>this.statusReactive());statusReactive=m(void 0);get valid(){return this.status===Oi}get invalid(){return this.status===ki}get pending(){return this.status===Ai}get disabled(){return this.status===ji}get enabled(){return this.status!==ji}errors;get pristine(){return b(this.pristineReactive)}set pristine(e){b(()=>this.pristineReactive.set(e))}_pristine=f(()=>this.pristineReactive());pristineReactive=m(!0);get dirty(){return!this.pristine}get touched(){return b(this.touchedReactive)}set touched(e){b(()=>this.touchedReactive.set(e))}_touched=f(()=>this.touchedReactive());touchedReactive=m(!1);get untouched(){return!this.touched}_events=new Se;events=this._events.asObservable();valueChanges;statusChanges;get updateOn(){return this._updateOn?this._updateOn:this.parent?this.parent.updateOn:`change`}setValidators(e){this._assignValidators(e)}setAsyncValidators(e){this._assignAsyncValidators(e)}addValidators(e){this.setValidators(wi(e,this._rawValidators))}addAsyncValidators(e){this.setAsyncValidators(wi(e,this._rawAsyncValidators))}removeValidators(e){this.setValidators(Ti(e,this._rawValidators))}removeAsyncValidators(e){this.setAsyncValidators(Ti(e,this._rawAsyncValidators))}hasValidator(e){return Ci(this._rawValidators,e)}hasAsyncValidator(e){return Ci(this._rawAsyncValidators,e)}clearValidators(){this.validator=null}clearAsyncValidators(){this.asyncValidator=null}markAsTouched(e={}){let t=this.touched===!1;this.touched=!0;let n=e.sourceControl??this;e.onlySelf||this._parent?.markAsTouched({...e,sourceControl:n}),t&&e.emitEvent!==!1&&this._events.next(new Fi(!0,n))}markAllAsDirty(e={}){this.markAsDirty({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsDirty(e))}markAllAsTouched(e={}){this.markAsTouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:this}),this._forEachChild(t=>t.markAllAsTouched(e))}markAsUntouched(e={}){let t=this.touched===!0;this.touched=!1,this._pendingTouched=!1;let n=e.sourceControl??this;this._forEachChild(t=>{t.markAsUntouched({onlySelf:!0,emitEvent:e.emitEvent,sourceControl:n})}),e.onlySelf||this._parent?._updateTouched(e,n),t&&e.emitEvent!==!1&&this._events.next(new Fi(!1,n))}markAsDirty(e={}){let t=this.pristine===!0;this.pristine=!1;let n=e.sourceControl??this;e.onlySelf||this._parent?.markAsDirty({...e,sourceControl:n}),t&&e.emitEvent!==!1&&this._events.next(new Pi(!1,n))}markAsPristine(e={}){let t=this.pristine===!1;this.pristine=!0,this._pendingDirty=!1;let n=e.sourceControl??this;this._forEachChild(t=>{t.markAsPristine({onlySelf:!0,emitEvent:e.emitEvent})}),e.onlySelf||this._parent?._updatePristine(e,n),t&&e.emitEvent!==!1&&this._events.next(new Pi(!0,n))}markAsPending(e={}){this.status=Ai;let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Ii(this.status,t)),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.markAsPending({...e,sourceControl:t})}disable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=ji,this.errors=null,this._forEachChild(t=>{t.disable({...e,onlySelf:!0})}),this._updateValue();let n=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Ni(this.value,n)),this._events.next(new Ii(this.status,n)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),this._updateAncestors({...e,skipPristineCheck:t},this),this._onDisabledChange.forEach(e=>e(!0))}enable(e={}){let t=this._parentMarkedDirty(e.onlySelf);this.status=Oi,this._forEachChild(t=>{t.enable({...e,onlySelf:!0})}),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent}),this._updateAncestors({...e,skipPristineCheck:t},this),this._onDisabledChange.forEach(e=>e(!1))}_updateAncestors(e,t){e.onlySelf||(this._parent?.updateValueAndValidity(e),e.skipPristineCheck||this._parent?._updatePristine({},t),this._parent?._updateTouched({},t))}setParent(e){this._parent=e}getRawValue(){return this.value}updateValueAndValidity(e={}){if(this._setInitialStatus(),this._updateValue(),this.enabled){let t=this._cancelExistingSubscription();this.errors=this._runValidator(),this.status=this._calculateStatus(),(this.status===Oi||this.status===Ai)&&this._runAsyncValidator(t,e.emitEvent)}let t=e.sourceControl??this;e.emitEvent!==!1&&(this._events.next(new Ni(this.value,t)),this._events.next(new Ii(this.status,t)),this.valueChanges.emit(this.value),this.statusChanges.emit(this.status)),e.onlySelf||this._parent?.updateValueAndValidity({...e,sourceControl:t})}_updateTreeValidity(e={emitEvent:!0}){this._forEachChild(t=>t._updateTreeValidity(e)),this.updateValueAndValidity({onlySelf:!0,emitEvent:e.emitEvent})}_setInitialStatus(){this.status=this._allControlsDisabled()?ji:Oi}_runValidator(){return this.validator?this.validator(this):null}_runAsyncValidator(e,t){if(this.asyncValidator){this.status=Ai,this._hasOwnPendingAsyncValidator={emitEvent:t!==!1,shouldHaveEmitted:e!==!1};let n=ui(this.asyncValidator(this));this._asyncValidationSubscription=n.subscribe(n=>{this._hasOwnPendingAsyncValidator=null,this.setErrors(n,{emitEvent:t,shouldHaveEmitted:e})})}}_cancelExistingSubscription(){if(this._asyncValidationSubscription){this._asyncValidationSubscription.unsubscribe();let e=(this._hasOwnPendingAsyncValidator?.emitEvent||this._hasOwnPendingAsyncValidator?.shouldHaveEmitted)??!1;return this._hasOwnPendingAsyncValidator=null,e}return!1}setErrors(e,t={}){this.errors=e,this._updateControlsErrors(t.emitEvent!==!1,this,t.shouldHaveEmitted)}get(e){let t=e;return t==null||(Array.isArray(t)||(t=t.split(`.`)),t.length===0)?null:t.reduce((e,t)=>e&&e._find(t),this)}getError(e,t){let n=t?this.get(t):this;return n?.errors?n.errors[e]:null}hasError(e,t){return!!this.getError(e,t)}get root(){let e=this;for(;e._parent;)e=e._parent;return e}_updateControlsErrors(e,t,n){this.status=this._calculateStatus(),e&&this.statusChanges.emit(this.status),(e||n)&&this._events.next(new Ii(this.status,t)),this._parent&&this._parent._updateControlsErrors(e,t,n)}_initObservables(){this.valueChanges=new se,this.statusChanges=new se}_calculateStatus(){return this._allControlsDisabled()?ji:this.errors?ki:this._hasOwnPendingAsyncValidator||this._anyControlsHaveStatus(Ai)?Ai:this._anyControlsHaveStatus(ki)?ki:Oi}_anyControlsHaveStatus(e){return this._anyControls(t=>t.status===e)}_anyControlsDirty(){return this._anyControls(e=>e.dirty)}_anyControlsTouched(){return this._anyControls(e=>e.touched)}_updatePristine(e,t){let n=!this._anyControlsDirty(),r=this.pristine!==n;this.pristine=n,e.onlySelf||this._parent?._updatePristine(e,t),r&&this._events.next(new Pi(this.pristine,t))}_updateTouched(e={},t){this.touched=this._anyControlsTouched(),this._events.next(new Fi(this.touched,t)),e.onlySelf||this._parent?._updateTouched(e,t)}_onDisabledChange=[];_registerOnCollectionChange(e){this._onCollectionChange=e}_setUpdateStrategy(e){Ui(e)&&e.updateOn!=null&&(this._updateOn=e.updateOn)}_parentMarkedDirty(e){return!e&&!!this._parent?.dirty&&!this._parent._anyControlsDirty()}_find(e){return null}_assignValidators(e){this._rawValidators=Array.isArray(e)?e.slice():e,this._composedValidatorFn=Bi(this._rawValidators),this._updateHasRequiredValidator()}_assignAsyncValidators(e){this._rawAsyncValidators=Array.isArray(e)?e.slice():e,this._composedAsyncValidatorFn=Hi(this._rawAsyncValidators)}_updateHasRequiredValidator(){b(()=>this._hasRequired.set(this.hasValidator($r.required)))}};function qi(e,t){return Object.hasOwn(e,t)}function Ji(e){return e.tagName===`INPUT`||e.tagName===`SELECT`||e.tagName===`TEXTAREA`}function Yi(e,t,n,r){switch(n){case`name`:e.setAttribute(t,n,r);break;case`disabled`:case`readonly`:case`required`:r?e.setAttribute(t,n,``):e.removeAttribute(t,n);break;case`max`:case`min`:case`minLength`:case`maxLength`:r===void 0?e.removeAttribute(t,n):e.setAttribute(t,n,r.toString())}}var Xi=class{kind;context;control;message;constructor({kind:e,context:t,control:n}){this.kind=e,this.context=t,this.control=n}};function Zi(e){return typeof e==`number`?e:parseInt(e,10)}function Qi(e){return typeof e==`number`?e:parseFloat(e)}var $i=(()=>{class e{_validator=ci;_onChange;_enabled;ngOnChanges(e){if(this.inputName in e){let t=this.normalizeInput(e[this.inputName].currentValue);this._enabled=this.enabled(t),this._validator=this._enabled?this.createValidator(t):ci,this._onChange?.()}}validate(e){return this._validator(e)}registerOnValidatorChange(e){this._onChange=e}enabled(e){return e!=null}static ɵfac=function(t){return new(t||e)};static ɵdir=u({type:e,features:[Ke]})}return e})(),ea={provide:X,useExisting:E(()=>ta),multi:!0},ta=(()=>{class e extends $i{max;inputName=`max`;normalizeInput=e=>Qi(e);createValidator=e=>ti(e);static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`input`,`type`,`number`,`max`,``,`formControlName`,``],[`input`,`type`,`number`,`max`,``,`formControl`,``],[`input`,`type`,`number`,`max`,``,`ngModel`,``]],hostVars:1,hostBindings:function(e,t){e&2&&W(`max`,t._enabled?t.max:null)},inputs:{max:`max`},standalone:!1,features:[N([ea]),H]})}return e})(),na={provide:X,useExisting:E(()=>ra),multi:!0},ra=(()=>{class e extends $i{min;inputName=`min`;normalizeInput=e=>Qi(e);createValidator=e=>ei(e);static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`input`,`type`,`number`,`min`,``,`formControlName`,``],[`input`,`type`,`number`,`min`,``,`formControl`,``],[`input`,`type`,`number`,`min`,``,`ngModel`,``]],hostVars:1,hostBindings:function(e,t){e&2&&W(`min`,t._enabled?t.min:null)},inputs:{min:`min`},standalone:!1,features:[N([na]),H]})}return e})(),ia={provide:X,useExisting:E(()=>oa),multi:!0},aa={provide:X,useExisting:E(()=>sa),multi:!0},oa=(()=>{class e extends $i{required;inputName=`required`;normalizeInput=oe;createValidator=e=>ni;enabled(e){return e}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[``,`required`,``,`formControlName`,``,3,`type`,`checkbox`],[``,`required`,``,`formControl`,``,3,`type`,`checkbox`],[``,`required`,``,`ngModel`,``,3,`type`,`checkbox`]],hostVars:1,hostBindings:function(e,t){e&2&&W(`required`,t._enabled?``:null)},inputs:{required:`required`},standalone:!1,features:[N([ia]),H]})}return e})(),sa=(()=>{class e extends oa{createValidator=e=>ri;static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`input`,`type`,`checkbox`,`required`,``,`formControlName`,``],[`input`,`type`,`checkbox`,`required`,``,`formControl`,``],[`input`,`type`,`checkbox`,`required`,``,`ngModel`,``]],hostVars:1,hostBindings:function(e,t){e&2&&W(`required`,t._enabled?``:null)},standalone:!1,features:[N([aa]),H]})}return e})(),ca={provide:X,useExisting:E(()=>la),multi:!0},la=(()=>{class e extends $i{email;inputName=`email`;normalizeInput=oe;createValidator=e=>ii;enabled(e){return e}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[``,`email`,``,`formControlName`,``],[``,`email`,``,`formControl`,``],[``,`email`,``,`ngModel`,``]],inputs:{email:`email`},standalone:!1,features:[N([ca]),H]})}return e})(),ua={provide:X,useExisting:E(()=>da),multi:!0},da=(()=>{class e extends $i{minlength;inputName=`minlength`;normalizeInput=e=>Zi(e);createValidator=e=>ai(e);static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[``,`minlength`,``,`formControlName`,``],[``,`minlength`,``,`formControl`,``],[``,`minlength`,``,`ngModel`,``]],hostVars:1,hostBindings:function(e,t){e&2&&W(`minlength`,t._enabled?t.minlength:null)},inputs:{minlength:`minlength`},standalone:!1,features:[N([ua]),H]})}return e})(),fa={provide:X,useExisting:E(()=>pa),multi:!0},pa=(()=>{class e extends $i{maxlength;inputName=`maxlength`;normalizeInput=e=>Zi(e);createValidator=e=>oi(e);static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[``,`maxlength`,``,`formControlName`,``],[``,`maxlength`,``,`formControl`,``],[``,`maxlength`,``,`ngModel`,``]],hostVars:1,hostBindings:function(e,t){e&2&&W(`maxlength`,t._enabled?t.maxlength:null)},inputs:{maxlength:`maxlength`},standalone:!1,features:[N([fa]),H]})}return e})(),ma={provide:X,useExisting:E(()=>ha),multi:!0},ha=(()=>{class e extends $i{pattern;inputName=`pattern`;normalizeInput=e=>e;createValidator=e=>si(e);static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[``,`pattern`,``,`formControlName`,``],[``,`pattern`,``,`formControl`,``],[``,`pattern`,``,`ngModel`,``]],hostVars:1,hostBindings:function(e,t){e&2&&W(`pattern`,t._enabled?t.pattern:null)},inputs:{pattern:`pattern`},standalone:!1,features:[N([ma]),H]})}return e})(),ga=new je(``),_a=new je(``,{factory:()=>va}),va=`always`;function ya(e,t){return[...t.path,e]}function ba(e,t,n=va){Ca(e,t),t.valueAccessor.writeValue(e.value),(e.disabled||n===`always`)&&t.valueAccessor.setDisabledState?.(e.disabled),wa(e,t),Da(e,t),Ta(e,t),Sa(e,t)}function xa(e,t){e.forEach(e=>{e.registerOnValidatorChange&&e.registerOnValidatorChange(t)})}function Sa(e,t){if(t.valueAccessor.setDisabledState){let n=e=>{t.valueAccessor.setDisabledState(e)};e.registerOnDisabledChange(n),t._registerOnDestroy(()=>{e._unregisterOnDisabledChange(n)})}}function Ca(e,t){let n=bi(e);t.validator===null?typeof n==`function`&&e.setValidators([n]):e.setValidators(yi(n,t.validator));let r=xi(e);t.asyncValidator===null?typeof r==`function`&&e.setAsyncValidators([r]):e.setAsyncValidators(yi(r,t.asyncValidator));let i=()=>e.updateValueAndValidity();xa(t._rawValidators,i),xa(t._rawAsyncValidators,i)}function wa(e,t){t.valueAccessor.registerOnChange(n=>{e._pendingValue=n,e._pendingChange=!0,e._pendingDirty=!0,e.updateOn===`change`&&Ea(e,t)})}function Ta(e,t){t.valueAccessor.registerOnTouched(()=>{e._pendingTouched=!0,e.updateOn===`blur`&&e._pendingChange&&Ea(e,t),e.updateOn!==`submit`&&e.markAsTouched()})}function Ea(e,t){e._pendingDirty&&e.markAsDirty(),e.setValue(e._pendingValue,{emitModelToViewChange:!1}),t.viewToModelUpdate(e._pendingValue),e._pendingChange=!1}function Da(e,t){let n=(e,n)=>{t.valueAccessor.writeValue(e),n&&t.viewToModelUpdate(e)};e.registerOnChange(n),t._registerOnDestroy(()=>{e._unregisterOnChange(n)})}function Oa(e,t){Ca(e,t)}function ka(e,t){if(!Object.hasOwn(e,`model`))return!1;let n=e.model;return n.isFirstChange()?!0:!Object.is(t,n.currentValue)}function Aa(e){return Object.getPrototypeOf(e.constructor)===Vr}function ja(e,t){e._syncPendingControls(),t.forEach(e=>{let t=e.control;t.updateOn===`submit`&&t._pendingChange&&(e.viewToModelUpdate(t._pendingValue),t._pendingChange=!1)})}function Ma(e,t){if(!t)return null;let n,r,i;return t.forEach(e=>{e.constructor===Jr?n=e:Aa(e)?r=e:i=e}),i||r||n||null}var Na={provide:ga,useFactory:()=>{let e=q(Pa,{self:!0});return{setParseErrors:t=>{e.setParseErrorSource(t)},set onReset(t){e.onReset=t}}}},Pa=class extends Ei{_parent=null;name=null;valueAccessor=null;isCustomControlBased=!1;userOnReset;resetSubscription;set onReset(e){this.userOnReset=e,this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.control&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Ri&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription?.add(this.resetSubscription))}isNativeFormElement=!1;rawValueAccessors;_selectedValueAccessor=null;get selectedValueAccessor(){return this._selectedValueAccessor??=Ma(this,this.rawValueAccessors)}parseErrorsValidator=null;renderer;injector;requiredValidatorViaDi;subscription;customControlBindings=null;constructor(e,t,n){super(),this.injector=e,this.renderer=t,this.rawValueAccessors=n,this.injector?.get(fe)?.onDestroy(()=>{this.removeParseErrorsValidator(this.control),this.subscription?.unsubscribe()})}setupCustomControl(){this.subscription?.unsubscribe();let e=this.injector?.get(qe);if(!this.control||!e)return;let t=e.markForCheck.bind(e);this.subscription=new De,this.subscription.add(this.control.valueChanges.subscribe(t)),this.subscription.add(this.control.statusChanges.subscribe(t)),this.resetSubscription?.unsubscribe(),this.resetSubscription=void 0,this.userOnReset&&(this.resetSubscription=this.control.events.subscribe(e=>{e instanceof Ri&&this.control&&this.userOnReset?.(this.control.value)}),this.subscription.add(this.resetSubscription)),this.parseErrorsValidator&&this.control.addValidators(this.parseErrorsValidator)}ngControlCreate(e){!e.nativeElement.hasAttribute?.(`ngNoCva`)&&(this.rawValueAccessors&&this.rawValueAccessors.length>0||this.valueAccessor!==null)||!e.customControl||(this.isCustomControlBased=!0,e.listenToCustomControlModel(e=>{this.control?.markAsDirty(),this.control?.setValue(e,{emitModelToViewChange:!1}),this.viewToModelUpdate(e)}),e.listenToCustomControlOutput(`touch`,()=>{this.control?.markAsTouched()}),this.customControlBindings={},this.isNativeFormElement=Ji(e.nativeElement),this.requiredValidatorViaDi=this._rawValidators.find(e=>e instanceof oa))}ngControlUpdate(e,t){if(!this.isCustomControlBased)return;let n=this.control,r=this.customControlBindings;Object.is(r.value,n.value)||(r.value=n.value,e.setCustomControlModelInput(n.value)),this.bindControlProperty(e,r,`touched`,n.touched),this.bindControlProperty(e,r,`dirty`,n.dirty),this.bindControlProperty(e,r,`valid`,n.valid),this.bindControlProperty(e,r,`invalid`,n.invalid),this.bindControlProperty(e,r,`pending`,n.pending),this.bindControlProperty(e,r,`disabled`,n.disabled),this.shouldBindRequired&&this.bindControlProperty(e,r,`required`,this.isRequired);let i=n.errors;if(r.errors!==i){r.errors=i;let t=this._convertErrors(i);e.setInputOnDirectives(`errors`,t)}}get isRequired(){return(this.requiredValidatorViaDi?._enabled||this.control?._hasRequired())??!1}get shouldBindRequired(){return!0}bindControlProperty(e,t,n,r){if(t[n]===r)return;t[n]=r;let i=e.setInputOnDirectives(n,r);this.isNativeFormElement&&!i&&(n===`disabled`||n===`required`)&&this.renderer&&Yi(this.renderer,e.nativeElement,n,r)}_convertErrors(e){if(e===null)return[];let t=this.control;return Object.entries(e).map(([e,n])=>new Xi({context:n,kind:e,control:t}))}setParseErrorSource(e){if(e===void 0)return;let t=null,n=f(()=>{let t=e();return t.length===0?null:t.reduce((e,t)=>(e[t.kind]=t,e),{})});this.parseErrorsValidator=(()=>t).bind(this),re(()=>{t=n(),this.control?.updateValueAndValidity({emitEvent:!1})},{injector:this.injector})}removeParseErrorsValidator(e){this.parseErrorsValidator&&(e?.removeValidators(this.parseErrorsValidator),e?.updateValueAndValidity({emitEvent:!1}))}},Fa=class{_cd;constructor(e){this._cd=e}get isTouched(){return this._cd?.control?._touched?.(),!!this._cd?.control?.touched}get isUntouched(){return!!this._cd?.control?.untouched}get isPristine(){return this._cd?.control?._pristine?.(),!!this._cd?.control?.pristine}get isDirty(){return!!this._cd?.control?.dirty}get isValid(){return this._cd?.control?._status?.(),!!this._cd?.control?.valid}get isInvalid(){return!!this._cd?.control?.invalid}get isPending(){return!!this._cd?.control?.pending}get isSubmitted(){return this._cd?._submitted?.(),!!this._cd?.submitted}},Ia=(()=>{class e extends Fa{constructor(e){super(e)}static ɵfac=function(t){return new(t||e)(d(Pa,2))};static ɵdir=u({type:e,selectors:[[``,`formControlName`,``],[``,`ngModel`,``],[``,`formControl`,``]],hostVars:14,hostBindings:function(e,t){e&2&&L(`ng-untouched`,t.isUntouched)(`ng-touched`,t.isTouched)(`ng-pristine`,t.isPristine)(`ng-dirty`,t.isDirty)(`ng-valid`,t.isValid)(`ng-invalid`,t.isInvalid)(`ng-pending`,t.isPending)},standalone:!1,features:[H]})}return e})(),La=(()=>{class e extends Fa{constructor(e){super(e)}static ɵfac=function(t){return new(t||e)(d(Di,10))};static ɵdir=u({type:e,selectors:[[``,`formGroupName`,``],[``,`formArrayName`,``],[``,`ngModelGroup`,``],[``,`formGroup`,``],[``,`formArray`,``],[`form`,3,`ngNoForm`,``],[``,`ngForm`,``]],hostVars:16,hostBindings:function(e,t){e&2&&L(`ng-untouched`,t.isUntouched)(`ng-touched`,t.isTouched)(`ng-pristine`,t.isPristine)(`ng-dirty`,t.isDirty)(`ng-valid`,t.isValid)(`ng-invalid`,t.isInvalid)(`ng-pending`,t.isPending)(`ng-submitted`,t.isSubmitted)},standalone:!1,features:[H]})}return e})(),Ra=class extends Ki{constructor(e,t,n){super(zi(t),Vi(n,t)),this.controls=e,this._initObservables(),this._setUpdateStrategy(t),this._setUpControls(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator})}controls;registerControl(e,t){return this._find(e)||(this.controls[e]=t,t.setParent(this),t._registerOnCollectionChange(this._onCollectionChange),t)}addControl(e,t,n={}){this.registerControl(e,t),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}removeControl(e,t={}){let n=this._find(e);n&&n._registerOnCollectionChange(()=>{}),delete this.controls[e],this.updateValueAndValidity({emitEvent:t.emitEvent}),this._onCollectionChange()}setControl(e,t,n={}){let r=this._find(e);r&&r._registerOnCollectionChange(()=>{}),delete this.controls[e],t&&this.registerControl(e,t),this.updateValueAndValidity({emitEvent:n.emitEvent}),this._onCollectionChange()}contains(e){return this._find(e)?.enabled===!0}setValue(e,t={}){b(()=>{Gi(this,!0,e),Object.keys(e).forEach(n=>{Wi(this,!0,n),this.controls[n].setValue(e[n],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t)})}patchValue(e,t={}){e!=null&&(Object.keys(e).forEach(n=>{let r=this._find(n);r&&r.patchValue(e[n],{onlySelf:!0,emitEvent:t.emitEvent})}),this.updateValueAndValidity(t))}reset(e={},t={}){this._forEachChild((n,r)=>{n.reset(e?e[r]:null,{...t,onlySelf:!0})}),this._updatePristine(t,this),this._updateTouched(t,this),this.updateValueAndValidity(t),t?.emitEvent!==!1&&this._events.next(new Ri(this))}getRawValue(){return this._reduceChildren({},(e,t,n)=>(e[n]=t.getRawValue(),e))}_syncPendingControls(){let e=this._reduceChildren(!1,(e,t)=>t._syncPendingControls()?!0:e);return e&&this.updateValueAndValidity({onlySelf:!0}),e}_forEachChild(e){Object.keys(this.controls).forEach(t=>{let n=this.controls[t];n&&e(n,t)})}_setUpControls(){this._forEachChild(e=>{e.setParent(this),e._registerOnCollectionChange(this._onCollectionChange)})}_updateValue(){this.value=this._reduceValue()}_anyControls(e){for(let[t,n]of Object.entries(this.controls))if(this.contains(t)&&e(n))return!0;return!1}_reduceValue(){return this._reduceChildren({},(e,t,n)=>((t.enabled||this.disabled)&&(e[n]=t.value),e))}_reduceChildren(e,t){let n=e;return this._forEachChild((e,r)=>{n=t(n,e,r)}),n}_allControlsDisabled(){for(let e of Object.keys(this.controls))if(this.controls[e].enabled)return!1;return Object.keys(this.controls).length>0||this.disabled}_find(e){return qi(this.controls,e)?this.controls[e]:null}},za={provide:Di,useExisting:E(()=>Va)},Ba=Promise.resolve(),Va=(()=>{class e extends Di{callSetDisabledState;get submitted(){return b(this.submittedReactive)}_submitted=f(()=>this.submittedReactive());submittedReactive=m(!1);_directives=new Set;form;ngSubmit=new se;options;constructor(e,t,n){super(),this.callSetDisabledState=n,this.form=new Ra({},gi(e),vi(t))}ngAfterViewInit(){this._setUpdateStrategy()}get formDirective(){return this}get control(){return this.form}get path(){return[]}get controls(){return this.form.controls}addControl(e){Ba.then(()=>{e.control=this._findContainer(e.path).registerControl(e.name,e.control),e._setupWithForm(this.callSetDisabledState),e.control.updateValueAndValidity({emitEvent:!1}),this._directives.add(e)})}getControl(e){return this.form.get(e.path)}removeControl(e){Ba.then(()=>{this._findContainer(e.path)?.removeControl(e.name),this._directives.delete(e)})}addFormGroup(e){Ba.then(()=>{let t=this._findContainer(e.path),n=new Ra({});Oa(n,e),t.registerControl(e.name,n),n.updateValueAndValidity({emitEvent:!1})})}removeFormGroup(e){Ba.then(()=>{this._findContainer(e.path)?.removeControl?.(e.name)})}getFormGroup(e){return this.form.get(e.path)}updateModel(e,t){Ba.then(()=>{this.form.get(e.path).setValue(t)})}setValue(e){this.control.setValue(e)}onSubmit(e){return this.submittedReactive.set(!0),ja(this.form,this._directives),this.ngSubmit.emit(e),this.form._events.next(new Li(this.control)),e?.target?.method===`dialog`}onReset(){this.resetForm()}resetForm(e=void 0){this.form.reset(e),this.submittedReactive.set(!1)}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.form._updateOn=this.options.updateOn)}_findContainer(e){return e.pop(),e.length?this.form.get(e):this.form}static ɵfac=function(t){return new(t||e)(d(X,10),d(Zr,10),d(_a,8))};static ɵdir=u({type:e,selectors:[[`form`,3,`ngNoForm`,``,3,`formGroup`,``,3,`formArray`,``],[`ng-form`],[``,`ngForm`,``]],hostBindings:function(e,t){e&1&&l(`submit`,function(e){return t.onSubmit(e)})(`reset`,function(){return t.onReset()})},inputs:{options:[0,`ngFormOptions`,`options`]},outputs:{ngSubmit:`ngSubmit`},exportAs:[`ngForm`],standalone:!1,features:[N([za]),H]})}return e})();function Ha(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}function Ua(e){return typeof e==`object`&&!!e&&Object.keys(e).length===2&&`value`in e&&`disabled`in e}var Wa=class extends Ki{defaultValue=null;_onChange=[];_pendingValue;_pendingChange=!1;constructor(e=null,t,n){super(zi(t),Vi(n,t)),this._applyFormState(e),this._setUpdateStrategy(t),this._initObservables(),this.updateValueAndValidity({onlySelf:!0,emitEvent:!!this.asyncValidator}),Ui(t)&&(t.nonNullable||t.initialValueIsDefault)&&(this.defaultValue=Ua(e)?e.value:e)}setValue(e,t={}){b(()=>{this.value=this._pendingValue=e,this._onChange.length&&t.emitModelToViewChange!==!1&&this._onChange.forEach(e=>e(this.value,t.emitViewToModelChange!==!1)),this.updateValueAndValidity(t)})}patchValue(e,t={}){this.setValue(e,t)}reset(e=this.defaultValue,t={}){this._applyFormState(e),this.markAsPristine(t),this.markAsUntouched(t),this.setValue(this.value,t),t.overwriteDefaultValue&&(this.defaultValue=this.value),this._pendingChange=!1,t?.emitEvent!==!1&&this._events.next(new Ri(this))}_updateValue(){}_anyControls(e){return!1}_allControlsDisabled(){return this.disabled}registerOnChange(e){this._onChange.push(e)}_unregisterOnChange(e){Ha(this._onChange,e)}registerOnDisabledChange(e){this._onDisabledChange.push(e)}_unregisterOnDisabledChange(e){Ha(this._onDisabledChange,e)}_forEachChild(e){}_syncPendingControls(){return this.updateOn===`submit`&&(this._pendingDirty&&this.markAsDirty(),this._pendingTouched&&this.markAsTouched(),this._pendingChange)?(this.setValue(this._pendingValue,{onlySelf:!0,emitModelToViewChange:!1}),!0):!1}_applyFormState(e){Ua(e)?(this.value=this._pendingValue=e.value,e.disabled?this.disable({onlySelf:!0,emitEvent:!1}):this.enable({onlySelf:!0,emitEvent:!1})):this.value=this._pendingValue=e}},Ga=(()=>{class e extends Di{_parent;ngOnInit(){this._checkParentType(),this.formDirective.addFormGroup(this)}ngOnDestroy(){this.formDirective?.removeFormGroup(this)}get control(){return this.formDirective.getFormGroup(this)}get path(){return ya(this.name==null?this.name:this.name.toString(),this._parent)}get formDirective(){return this._parent?this._parent.formDirective:null}_checkParentType(){}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,standalone:!1,features:[H]})}return e})(),Ka={provide:Di,useExisting:E(()=>qa)},qa=(()=>{class e extends Ga{name=``;constructor(e,t,n){super(),this._parent=e,this._setValidators(t),this._setAsyncValidators(n)}_checkParentType(){!(this._parent instanceof e)&&this._parent instanceof Va}static ɵfac=function(t){return new(t||e)(d(Di,5),d(X,10),d(Zr,10))};static ɵdir=u({type:e,selectors:[[``,`ngModelGroup`,``]],inputs:{name:[0,`ngModelGroup`,`name`]},exportAs:[`ngModelGroup`],standalone:!1,features:[N([Ka]),H]})}return e})(),Ja={provide:Pa,useExisting:E(()=>Xa)},Ya=Promise.resolve(),Xa=(()=>{class e extends Pa{_changeDetectorRef;callSetDisabledState;control=new Wa;static ngAcceptInputType_isDisabled;_registered=!1;_ngModelInjector;viewModel;name=``;isDisabled;model;options;update=new se;constructor(e,t,n,r,i,a,o,s){super(o,s,r),this._changeDetectorRef=i,this.callSetDisabledState=a,this._parent=e,this._setValidators(t),this._setAsyncValidators(n)}ngOnChanges(e){if(this._registered,this._checkForErrors(),!this._registered||`name`in e){if(this._registered&&(this._checkName(),this.formDirective)){let t=e.name.previousValue;this.formDirective.removeControl({name:t,path:this._getPath(t)})}this._setUpControl()}`isDisabled`in e&&this._updateDisabled(e),ka(e,this.viewModel)&&(this._updateValue(this.model),this.viewModel=this.model)}ngOnDestroy(){this.formDirective?.removeControl(this)}ɵngControlCreate(e){super.ngControlCreate(e)}ɵngControlUpdate(e){super.ngControlUpdate(e,!1)}get shouldBindRequired(){return!1}get path(){return this._getPath(this.name)}get formDirective(){return this._parent?this._parent.formDirective:null}viewToModelUpdate(e){this.viewModel=e,this.update.emit(e)}_setUpControl(){this._setUpdateStrategy(),this._isStandalone()?this._setUpStandalone():this.formDirective.addControl(this),this._registered=!0}_setUpdateStrategy(){this.options&&this.options.updateOn!=null&&(this.control._updateOn=this.options.updateOn)}_isStandalone(){return!this._parent||!!(this.options&&this.options.standalone)}_setUpStandalone(){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,ba(this.control,this,this.callSetDisabledState)),this.control.updateValueAndValidity({emitEvent:!1})}_setupWithForm(e){this.isCustomControlBased?this.setupCustomControl():(this.valueAccessor??=this.selectedValueAccessor,ba(this.control,this,e))}_checkForErrors(){this._checkName()}_checkName(){this.options&&this.options.name&&(this.name=this.options.name),!this._isStandalone()&&this.name}_updateValue(e){Ya.then(()=>{this.control.setValue(e,{emitViewToModelChange:!1}),this._changeDetectorRef?.markForCheck()})}_updateDisabled(e){let t=e.isDisabled.currentValue,n=t!==0&&oe(t);Ya.then(()=>{n&&!this.control.disabled?this.control.disable():!n&&this.control.disabled&&this.control.enable(),this._changeDetectorRef?.markForCheck()})}_getPath(e){return this._parent?ya(e,this._parent):[e]}static ɵfac=function(t){return new(t||e)(d(Di,9),d(X,10),d(Zr,10),d(Hr,10),d(qe,8),d(_a,8),d(ie,8),d(te,8))};static ɵdir=u({type:e,selectors:[[``,`ngModel`,``,3,`formControlName`,``,3,`formControl`,``]],inputs:{name:`name`,isDisabled:[0,`disabled`,`isDisabled`],model:[0,`ngModel`,`model`],options:[0,`ngModelOptions`,`options`]},outputs:{update:`ngModelChange`},exportAs:[`ngModel`],standalone:!1,features:[N([Ja,Na]),H,Ke,Ce(null)]})}return e})(),Za=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵdir=u({type:e,selectors:[[`form`,3,`ngNoForm`,``,3,`ngNativeValidate`,``]],hostAttrs:[`novalidate`,``],standalone:!1})}return e})(),Qa={provide:Hr,useExisting:E(()=>$a),multi:!0},$a=(()=>{class e extends Vr{writeValue(e){let t=e??``;this.setProperty(`value`,t)}registerOnChange(e){this.onChange=t=>{e(t==``?null:parseFloat(t))}}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`input`,`type`,`number`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`number`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(e,t){e&1&&l(`input`,function(e){return t.onChange(e.target.value)})(`blur`,function(){return t.onTouched()})},standalone:!1,features:[N([Qa]),H]})}return e})(),eo={provide:Hr,useExisting:E(()=>no),multi:!0},to=(()=>{class e{_accessors=[];add(e,t){this._accessors.push([e,t])}remove(e){for(let t=this._accessors.length-1;t>=0;--t)if(this._accessors[t][1]===e){this._accessors.splice(t,1);return}}select(e){this._accessors.forEach(t=>{this._isSameGroup(t,e)&&t[1]!==e&&t[1].fireUncheck(e.value)})}_isSameGroup(e,t){return e[0].control?e[0]._parent===t._control._parent&&e[1].name===t.name:!1}static ɵfac=function(t){return new(t||e)};static ɵprov=ee({token:e,factory:e.ɵfac})}return e})(),no=(()=>{class e extends Vr{_registry;_injector;_state;_control;_fn;setDisabledStateFired=!1;onChange=()=>{};name;formControlName;value;callSetDisabledState=q(_a,{optional:!0})??va;constructor(e,t,n,r){super(e,t),this._registry=n,this._injector=r}ngOnChanges(e){let t=this._control?.control;e.value&&t&&this.writeValue(t.value)}ngOnInit(){this._control=this._injector.get(Pa),this._checkName(),this._registry.add(this._control,this)}ngOnDestroy(){this._registry.remove(this)}writeValue(e){this._state=e===this.value,this.setProperty(`checked`,this._state)}registerOnChange(e){this._fn=e,this.onChange=()=>{e(this.value),this._registry.select(this)}}setDisabledState(e){(this.setDisabledStateFired||e||this.callSetDisabledState===`whenDisabledForLegacyCode`)&&this.setProperty(`disabled`,e),this.setDisabledStateFired=!0}fireUncheck(e){this.writeValue(e)}_checkName(){this.name&&this.formControlName&&(this.name,this.formControlName),!this.name&&this.formControlName&&(this.name=this.formControlName)}static ɵfac=function(t){return new(t||e)(d(te),d(me),d(to),d(ie))};static ɵdir=u({type:e,selectors:[[`input`,`type`,`radio`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`radio`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`radio`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(e,t){e&1&&l(`change`,function(){return t.onChange()})(`blur`,function(){return t.onTouched()})},inputs:{name:`name`,formControlName:`formControlName`,value:`value`},standalone:!1,features:[N([eo]),H,Ke]})}return e})(),ro={provide:Hr,useExisting:E(()=>io),multi:!0},io=(()=>{class e extends Vr{writeValue(e){this.setProperty(`value`,parseFloat(e))}registerOnChange(e){this.onChange=t=>{e(t==``?null:parseFloat(t))}}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`input`,`type`,`range`,`formControlName`,``,3,`ngNoCva`,``],[`input`,`type`,`range`,`formControl`,``,3,`ngNoCva`,``],[`input`,`type`,`range`,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(e,t){e&1&&l(`change`,function(e){return t.onChange(e.target.value)})(`input`,function(e){return t.onChange(e.target.value)})(`blur`,function(){return t.onTouched()})},standalone:!1,features:[N([ro]),H]})}return e})(),ao={provide:Hr,useExisting:E(()=>co),multi:!0};function oo(e,t){return e==null?`${t}`:(t&&typeof t==`object`&&(t=`Object`),`${e}: ${t}`.slice(0,50))}function so(e){return e.split(`:`)[0]}var co=(()=>{class e extends Vr{value;_optionMap=new Map;_idCounter=0;set compareWith(e){this._compareWith=e}_compareWith=Object.is;appRefInjector=q($e).injector;destroyRef=q(fe);cdr=q(qe);_queuedWrite=!1;_writeValueAfterRender(){this._queuedWrite||this.appRefInjector.destroyed||(this._queuedWrite=!0,Ee({write:()=>{this.destroyRef.destroyed||(this._queuedWrite=!1,this.writeValue(this.value))}},{injector:this.appRefInjector}))}writeValue(e){this.cdr.markForCheck(),this.value=e;let t=oo(this._getOptionId(e),e);this.setProperty(`value`,t)}registerOnChange(e){this.onChange=t=>{this.value=this._getOptionValue(t),e(this.value)}}_registerOption(){return(this._idCounter++).toString()}_getOptionId(e){for(let t of this._optionMap.keys())if(this._compareWith(this._optionMap.get(t),e))return t;return null}_getOptionValue(e){let t=so(e);return this._optionMap.has(t)?this._optionMap.get(t):e}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`select`,`formControlName`,``,3,`multiple`,``,3,`ngNoCva`,``],[`select`,`formControl`,``,3,`multiple`,``,3,`ngNoCva`,``],[`select`,`ngModel`,``,3,`multiple`,``,3,`ngNoCva`,``]],hostBindings:function(e,t){e&1&&l(`change`,function(e){return t.onChange(e.target.value)})(`blur`,function(){return t.onTouched()})},inputs:{compareWith:`compareWith`},standalone:!1,features:[N([ao]),H]})}return e})(),lo=(()=>{class e{_element;_renderer;_select;id;constructor(e,t,n){this._element=e,this._renderer=t,this._select=n,this._select&&(this.id=this._select._registerOption())}set ngValue(e){this._select!=null&&(this._select._optionMap.set(this.id,e),this._setElementValue(oo(this.id,e)),this._select._writeValueAfterRender())}set value(e){this._setElementValue(e),this._select?._writeValueAfterRender()}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,`value`,e)}ngOnDestroy(){this._select?._optionMap.delete(this.id),this._select?._writeValueAfterRender()}static ɵfac=function(t){return new(t||e)(d(me),d(te),d(co,9))};static ɵdir=u({type:e,selectors:[[`option`]],inputs:{ngValue:`ngValue`,value:`value`},standalone:!1})}return e})(),uo=Symbol(`negativeZero`),fo={provide:Hr,useExisting:E(()=>ho),multi:!0};function po(e,t){return e==null?`${t}`:(typeof t==`string`&&(t=`'${t}'`),t&&typeof t==`object`&&(t=`Object`),`${e}: ${t}`.slice(0,50))}function mo(e){return e.split(`:`)[0]}var ho=(()=>{class e extends Vr{value;_optionMap=new Map;_idCounter=0;set compareWith(e){this._compareWith=e}_compareWith=Object.is;writeValue(e){this.value=e;let t;if(Array.isArray(e)){let n=this._getOptionIds(e);t=(e,t)=>{e._setSelected(n.has(t))}}else t=e=>{e._setSelected(!1)};this._optionMap.forEach(t)}registerOnChange(e){this.onChange=t=>{let n=[],r=t.selectedOptions;if(r!==void 0){let e=r;for(let t=0;t<e.length;t++){let r=e[t],i=this._getOptionValue(r.value);n.push(i)}}else{let e=t.options;for(let t=0;t<e.length;t++){let r=e[t];if(r.selected){let e=this._getOptionValue(r.value);n.push(e)}}}this.value=n,e(n)}}_registerOption(e){let t=(this._idCounter++).toString();return this._optionMap.set(t,e),t}_getOptionIds(e){if(this._compareWith!==Object.is||e.length<2)return new Set(e.map(e=>this._getOptionId(e)).filter(e=>e!==null));let t=new Set;e.forEach(e=>t.add(e===0&&Object.is(e,-0)?uo:e));let n=new Set;for(let[e,r]of this._optionMap){if(t.size===0)break;let i=r._value,a=i===0&&Object.is(i,-0)?uo:i;t.delete(a)&&n.add(e)}return n}_getOptionId(e){for(let t of this._optionMap.keys())if(this._compareWith(this._optionMap.get(t)._value,e))return t;return null}_getOptionValue(e){let t=mo(e);return this._optionMap.has(t)?this._optionMap.get(t)._value:e}static ɵfac=(()=>{let t;return function(n){return(t||=D(e))(n||e)}})();static ɵdir=u({type:e,selectors:[[`select`,`multiple`,``,`formControlName`,``,3,`ngNoCva`,``],[`select`,`multiple`,``,`formControl`,``,3,`ngNoCva`,``],[`select`,`multiple`,``,`ngModel`,``,3,`ngNoCva`,``]],hostBindings:function(e,t){e&1&&l(`change`,function(e){return t.onChange(e.target)})(`blur`,function(){return t.onTouched()})},inputs:{compareWith:`compareWith`},standalone:!1,features:[N([fo]),H]})}return e})(),go=(()=>{class e{_element;_renderer;_select;id;_value;constructor(e,t,n){this._element=e,this._renderer=t,this._select=n,this._select&&(this.id=this._select._registerOption(this))}set ngValue(e){this._select!=null&&(this._value=e,this._setElementValue(po(this.id,e)),this._select.writeValue(this._select.value))}set value(e){this._select?(this._value=e,this._setElementValue(po(this.id,e)),this._select.writeValue(this._select.value)):this._setElementValue(e)}_setElementValue(e){this._renderer.setProperty(this._element.nativeElement,`value`,e)}_setSelected(e){this._renderer.setProperty(this._element.nativeElement,`selected`,e)}ngOnDestroy(){this._select&&(this._select._optionMap.delete(this.id),this._select.writeValue(this._select.value))}static ɵfac=function(t){return new(t||e)(d(me),d(te),d(ho,9))};static ɵdir=u({type:e,selectors:[[`option`]],inputs:{ngValue:`ngValue`,value:`value`},standalone:!1})}return e})(),_o=(()=>{class e{static ɵfac=function(t){return new(t||e)};static ɵmod=Ye({type:e,declarations:[Za,lo,go,Jr,$a,io,Wr,co,ho,no,Ia,La,oa,da,pa,ha,sa,la,ra,ta],exports:[Za,lo,go,Jr,$a,io,Wr,co,ho,no,Ia,La,oa,da,pa,ha,sa,la,ra,ta]});static ɵinj=he({})}return e})(),vo=(()=>{class e{static withConfig(t){return{ngModule:e,providers:[{provide:_a,useValue:t.callSetDisabledState??va}]}}static ɵfac=function(t){return new(t||e)};static ɵmod=Ye({type:e,declarations:[Xa,qa,Va],exports:[_o,Xa,qa,Va]});static ɵinj=he({imports:[_o]})}return e})(),yo=6048e5,bo=864e5,xo=Symbol.for(`constructDateFrom`);function Z(e,t){return typeof e==`function`?e(t):e&&typeof e==`object`&&xo in e?e[xo](t):e instanceof Date?new e.constructor(t):new Date(t)}function Q(e,t){return Z(t||e,e)}function So(e,t,n){let r=Q(e,n?.in);return isNaN(t)?Z(n?.in||e,NaN):(t&&r.setDate(r.getDate()+t),r)}function Co(e,t,n){let r=Q(e,n?.in);if(isNaN(t))return Z(n?.in||e,NaN);if(!t)return r;let i=r.getDate(),a=Z(n?.in||e,r.getTime());return a.setMonth(r.getMonth()+t+1,0),i>=a.getDate()?a:(r.setFullYear(a.getFullYear(),a.getMonth(),i),r)}var wo={};function To(){return wo}function Eo(e,t){let n=To(),r=t?.weekStartsOn??t?.locale?.options?.weekStartsOn??n.weekStartsOn??n.locale?.options?.weekStartsOn??0,i=Q(e,t?.in),a=i.getDay(),o=(a<r?7:0)+a-r;return i.setDate(i.getDate()-o),i.setHours(0,0,0,0),i}function Do(e,t){return Eo(e,{...t,weekStartsOn:1})}function Oo(e,t){let n=Q(e,t?.in),r=n.getFullYear(),i=Z(n,0);i.setFullYear(r+1,0,4),i.setHours(0,0,0,0);let a=Do(i),o=Z(n,0);o.setFullYear(r,0,4),o.setHours(0,0,0,0);let s=Do(o);return n.getTime()>=a.getTime()?r+1:n.getTime()>=s.getTime()?r:r-1}function ko(e){let t=Q(e),n=new Date(Date.UTC(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes(),t.getSeconds(),t.getMilliseconds()));return n.setUTCFullYear(t.getFullYear()),+e-n}function Ao(e,...t){let n=Z.bind(null,e||t.find(e=>typeof e==`object`));return t.map(n)}function jo(e,t){let n=Q(e,t?.in);return n.setHours(0,0,0,0),n}function Mo(e,t,n){let[r,i]=Ao(n?.in,e,t),a=jo(r),o=jo(i),s=+a-ko(a),c=+o-ko(o);return Math.round((s-c)/bo)}function No(e,t){let n=Oo(e,t),r=Z(t?.in||e,0);return r.setFullYear(n,0,4),r.setHours(0,0,0,0),Do(r)}function Po(e,t,n){return So(e,t*7,n)}function Fo(e){return Z(e,Date.now())}function Io(e,t,n){let[r,i]=Ao(n?.in,e,t);return+jo(r)==+jo(i)}function Lo(e){return e instanceof Date||typeof e==`object`&&Object.prototype.toString.call(e)===`[object Date]`}function Ro(e){return!(!Lo(e)&&typeof e!=`number`||isNaN(+Q(e)))}function zo(e,t){let n=Q(e,t?.in);return n.setHours(23,59,59,999),n}function Bo(e,t){let n=Q(e,t?.in),r=n.getMonth();return n.setFullYear(n.getFullYear(),r+1,0),n.setHours(23,59,59,999),n}function Vo(e,t){let n=Q(e,t?.in);return n.setDate(1),n.setHours(0,0,0,0),n}function Ho(e,t){let n=Q(e,t?.in);return n.setFullYear(n.getFullYear(),0,1),n.setHours(0,0,0,0),n}var Uo={lessThanXSeconds:{one:`less than a second`,other:`less than {{count}} seconds`},xSeconds:{one:`1 second`,other:`{{count}} seconds`},halfAMinute:`half a minute`,lessThanXMinutes:{one:`less than a minute`,other:`less than {{count}} minutes`},xMinutes:{one:`1 minute`,other:`{{count}} minutes`},aboutXHours:{one:`about 1 hour`,other:`about {{count}} hours`},xHours:{one:`1 hour`,other:`{{count}} hours`},xDays:{one:`1 day`,other:`{{count}} days`},aboutXWeeks:{one:`about 1 week`,other:`about {{count}} weeks`},xWeeks:{one:`1 week`,other:`{{count}} weeks`},aboutXMonths:{one:`about 1 month`,other:`about {{count}} months`},xMonths:{one:`1 month`,other:`{{count}} months`},aboutXYears:{one:`about 1 year`,other:`about {{count}} years`},xYears:{one:`1 year`,other:`{{count}} years`},overXYears:{one:`over 1 year`,other:`over {{count}} years`},almostXYears:{one:`almost 1 year`,other:`almost {{count}} years`}},Wo=(e,t,n)=>{let r,i=Uo[e];return r=typeof i==`string`?i:t===1?i.one:i.other.replace(`{{count}}`,t.toString()),n?.addSuffix?n.comparison&&n.comparison>0?`in `+r:r+` ago`:r};function Go(e){return(t={})=>{let n=t.width?String(t.width):e.defaultWidth;return e.formats[n]||e.formats[e.defaultWidth]}}var Ko={date:Go({formats:{full:`EEEE, MMMM do, y`,long:`MMMM do, y`,medium:`MMM d, y`,short:`MM/dd/yyyy`},defaultWidth:`full`}),time:Go({formats:{full:`h:mm:ss a zzzz`,long:`h:mm:ss a z`,medium:`h:mm:ss a`,short:`h:mm a`},defaultWidth:`full`}),dateTime:Go({formats:{full:`{{date}} 'at' {{time}}`,long:`{{date}} 'at' {{time}}`,medium:`{{date}}, {{time}}`,short:`{{date}}, {{time}}`},defaultWidth:`full`})},qo={lastWeek:`'last' eeee 'at' p`,yesterday:`'yesterday at' p`,today:`'today at' p`,tomorrow:`'tomorrow at' p`,nextWeek:`eeee 'at' p`,other:`P`},Jo=(e,t,n,r)=>qo[e];function Yo(e){return(t,n)=>{let r=n?.context?String(n.context):`standalone`,i;if(r===`formatting`&&e.formattingValues){let t=e.defaultFormattingWidth||e.defaultWidth,r=n?.width?String(n.width):t;i=e.formattingValues[r]||e.formattingValues[t]}else{let t=e.defaultWidth,r=n?.width?String(n.width):e.defaultWidth;i=e.values[r]||e.values[t]}let a=e.argumentCallback?e.argumentCallback(t):t;return i[a]}}var Xo={ordinalNumber:(e,t)=>{let n=Number(e),r=n%100;if(r>20||r<10)switch(r%10){case 1:return n+`st`;case 2:return n+`nd`;case 3:return n+`rd`}return n+`th`},era:Yo({values:{narrow:[`B`,`A`],abbreviated:[`BC`,`AD`],wide:[`Before Christ`,`Anno Domini`]},defaultWidth:`wide`}),quarter:Yo({values:{narrow:[`1`,`2`,`3`,`4`],abbreviated:[`Q1`,`Q2`,`Q3`,`Q4`],wide:[`1st quarter`,`2nd quarter`,`3rd quarter`,`4th quarter`]},defaultWidth:`wide`,argumentCallback:e=>e-1}),month:Yo({values:{narrow:[`J`,`F`,`M`,`A`,`M`,`J`,`J`,`A`,`S`,`O`,`N`,`D`],abbreviated:[`Jan`,`Feb`,`Mar`,`Apr`,`May`,`Jun`,`Jul`,`Aug`,`Sep`,`Oct`,`Nov`,`Dec`],wide:[`January`,`February`,`March`,`April`,`May`,`June`,`July`,`August`,`September`,`October`,`November`,`December`]},defaultWidth:`wide`}),day:Yo({values:{narrow:[`S`,`M`,`T`,`W`,`T`,`F`,`S`],short:[`Su`,`Mo`,`Tu`,`We`,`Th`,`Fr`,`Sa`],abbreviated:[`Sun`,`Mon`,`Tue`,`Wed`,`Thu`,`Fri`,`Sat`],wide:[`Sunday`,`Monday`,`Tuesday`,`Wednesday`,`Thursday`,`Friday`,`Saturday`]},defaultWidth:`wide`}),dayPeriod:Yo({values:{narrow:{am:`a`,pm:`p`,midnight:`mi`,noon:`n`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`},abbreviated:{am:`AM`,pm:`PM`,midnight:`midnight`,noon:`noon`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`},wide:{am:`a.m.`,pm:`p.m.`,midnight:`midnight`,noon:`noon`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`}},defaultWidth:`wide`,formattingValues:{narrow:{am:`a`,pm:`p`,midnight:`mi`,noon:`n`,morning:`in the morning`,afternoon:`in the afternoon`,evening:`in the evening`,night:`at night`},abbreviated:{am:`AM`,pm:`PM`,midnight:`midnight`,noon:`noon`,morning:`in the morning`,afternoon:`in the afternoon`,evening:`in the evening`,night:`at night`},wide:{am:`a.m.`,pm:`p.m.`,midnight:`midnight`,noon:`noon`,morning:`in the morning`,afternoon:`in the afternoon`,evening:`in the evening`,night:`at night`}},defaultFormattingWidth:`wide`})};function Zo(e){return(t,n={})=>{let r=n.width,i=r&&e.matchPatterns[r]||e.matchPatterns[e.defaultMatchWidth],a=t.match(i);if(!a)return null;let o=a[0],s=r&&e.parsePatterns[r]||e.parsePatterns[e.defaultParseWidth],c=Array.isArray(s)?$o(s,e=>e.test(o)):Qo(s,e=>e.test(o)),l;l=e.valueCallback?e.valueCallback(c):c,l=n.valueCallback?n.valueCallback(l):l;let u=t.slice(o.length);return{value:l,rest:u}}}function Qo(e,t){for(let n in e)if(Object.prototype.hasOwnProperty.call(e,n)&&t(e[n]))return n}function $o(e,t){for(let n=0;n<e.length;n++)if(t(e[n]))return n}function es(e){return(t,n={})=>{let r=t.match(e.matchPattern);if(!r)return null;let i=r[0],a=t.match(e.parsePattern);if(!a)return null;let o=e.valueCallback?e.valueCallback(a[0]):a[0];o=n.valueCallback?n.valueCallback(o):o;let s=t.slice(i.length);return{value:o,rest:s}}}var ts={code:`en-US`,formatDistance:Wo,formatLong:Ko,formatRelative:Jo,localize:Xo,match:{ordinalNumber:es({matchPattern:/^(\d+)(th|st|nd|rd)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e,10)}),era:Zo({matchPatterns:{narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},defaultMatchWidth:`wide`,parsePatterns:{any:[/^b/i,/^(a|c)/i]},defaultParseWidth:`any`}),quarter:Zo({matchPatterns:{narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},defaultMatchWidth:`wide`,parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:`any`,valueCallback:e=>e+1}),month:Zo({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},defaultMatchWidth:`wide`,parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:`any`}),day:Zo({matchPatterns:{narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},defaultMatchWidth:`wide`,parsePatterns:{narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},defaultParseWidth:`any`}),dayPeriod:Zo({matchPatterns:{narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},defaultMatchWidth:`any`,parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},defaultParseWidth:`any`})},options:{weekStartsOn:0,firstWeekContainsDate:1}};function ns(e,t){let n=Q(e,t?.in);return Mo(n,Ho(n))+1}function rs(e,t){let n=Q(e,t?.in),r=+Do(n)-No(n);return Math.round(r/yo)+1}function is(e,t){let n=Q(e,t?.in),r=n.getFullYear(),i=To(),a=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??i.firstWeekContainsDate??i.locale?.options?.firstWeekContainsDate??1,o=Z(t?.in||e,0);o.setFullYear(r+1,0,a),o.setHours(0,0,0,0);let s=Eo(o,t),c=Z(t?.in||e,0);c.setFullYear(r,0,a),c.setHours(0,0,0,0);let l=Eo(c,t);return+n>=+s?r+1:+n>=+l?r:r-1}function as(e,t){let n=To(),r=t?.firstWeekContainsDate??t?.locale?.options?.firstWeekContainsDate??n.firstWeekContainsDate??n.locale?.options?.firstWeekContainsDate??1,i=is(e,t),a=Z(t?.in||e,0);return a.setFullYear(i,0,r),a.setHours(0,0,0,0),Eo(a,t)}function os(e,t){let n=Q(e,t?.in),r=+Eo(n,t)-as(n,t);return Math.round(r/yo)+1}function $(e,t){return(e<0?`-`:``)+Math.abs(e).toString().padStart(t,`0`)}var ss={y(e,t){let n=e.getFullYear(),r=n>0?n:1-n;return $(t===`yy`?r%100:r,t.length)},M(e,t){let n=e.getMonth();return t===`M`?String(n+1):$(n+1,2)},d(e,t){return $(e.getDate(),t.length)},a(e,t){let n=e.getHours()/12>=1?`pm`:`am`;switch(t){case`a`:case`aa`:return n.toUpperCase();case`aaa`:return n;case`aaaaa`:return n[0];default:return n===`am`?`a.m.`:`p.m.`}},h(e,t){return $(e.getHours()%12||12,t.length)},H(e,t){return $(e.getHours(),t.length)},m(e,t){return $(e.getMinutes(),t.length)},s(e,t){return $(e.getSeconds(),t.length)},S(e,t){let n=t.length,r=e.getMilliseconds();return $(Math.trunc(r*10**(n-3)),t.length)}},cs={am:`am`,pm:`pm`,midnight:`midnight`,noon:`noon`,morning:`morning`,afternoon:`afternoon`,evening:`evening`,night:`night`},ls={G:function(e,t,n){let r=+(e.getFullYear()>0);switch(t){case`G`:case`GG`:case`GGG`:return n.era(r,{width:`abbreviated`});case`GGGGG`:return n.era(r,{width:`narrow`});default:return n.era(r,{width:`wide`})}},y:function(e,t,n){if(t===`yo`){let t=e.getFullYear(),r=t>0?t:1-t;return n.ordinalNumber(r,{unit:`year`})}return ss.y(e,t)},Y:function(e,t,n,r){let i=is(e,r),a=i>0?i:1-i;return t===`YY`?$(a%100,2):t===`Yo`?n.ordinalNumber(a,{unit:`year`}):$(a,t.length)},R:function(e,t){return $(Oo(e),t.length)},u:function(e,t){return $(e.getFullYear(),t.length)},Q:function(e,t,n){let r=Math.ceil((e.getMonth()+1)/3);switch(t){case`Q`:return String(r);case`QQ`:return $(r,2);case`Qo`:return n.ordinalNumber(r,{unit:`quarter`});case`QQQ`:return n.quarter(r,{width:`abbreviated`,context:`formatting`});case`QQQQQ`:return n.quarter(r,{width:`narrow`,context:`formatting`});default:return n.quarter(r,{width:`wide`,context:`formatting`})}},q:function(e,t,n){let r=Math.ceil((e.getMonth()+1)/3);switch(t){case`q`:return String(r);case`qq`:return $(r,2);case`qo`:return n.ordinalNumber(r,{unit:`quarter`});case`qqq`:return n.quarter(r,{width:`abbreviated`,context:`standalone`});case`qqqqq`:return n.quarter(r,{width:`narrow`,context:`standalone`});default:return n.quarter(r,{width:`wide`,context:`standalone`})}},M:function(e,t,n){let r=e.getMonth();switch(t){case`M`:case`MM`:return ss.M(e,t);case`Mo`:return n.ordinalNumber(r+1,{unit:`month`});case`MMM`:return n.month(r,{width:`abbreviated`,context:`formatting`});case`MMMMM`:return n.month(r,{width:`narrow`,context:`formatting`});default:return n.month(r,{width:`wide`,context:`formatting`})}},L:function(e,t,n){let r=e.getMonth();switch(t){case`L`:return String(r+1);case`LL`:return $(r+1,2);case`Lo`:return n.ordinalNumber(r+1,{unit:`month`});case`LLL`:return n.month(r,{width:`abbreviated`,context:`standalone`});case`LLLLL`:return n.month(r,{width:`narrow`,context:`standalone`});default:return n.month(r,{width:`wide`,context:`standalone`})}},w:function(e,t,n,r){let i=os(e,r);return t===`wo`?n.ordinalNumber(i,{unit:`week`}):$(i,t.length)},I:function(e,t,n){let r=rs(e);return t===`Io`?n.ordinalNumber(r,{unit:`week`}):$(r,t.length)},d:function(e,t,n){return t===`do`?n.ordinalNumber(e.getDate(),{unit:`date`}):ss.d(e,t)},D:function(e,t,n){let r=ns(e);return t===`Do`?n.ordinalNumber(r,{unit:`dayOfYear`}):$(r,t.length)},E:function(e,t,n){let r=e.getDay();switch(t){case`E`:case`EE`:case`EEE`:return n.day(r,{width:`abbreviated`,context:`formatting`});case`EEEEE`:return n.day(r,{width:`narrow`,context:`formatting`});case`EEEEEE`:return n.day(r,{width:`short`,context:`formatting`});default:return n.day(r,{width:`wide`,context:`formatting`})}},e:function(e,t,n,r){let i=e.getDay(),a=(i-r.weekStartsOn+8)%7||7;switch(t){case`e`:return String(a);case`ee`:return $(a,2);case`eo`:return n.ordinalNumber(a,{unit:`day`});case`eee`:return n.day(i,{width:`abbreviated`,context:`formatting`});case`eeeee`:return n.day(i,{width:`narrow`,context:`formatting`});case`eeeeee`:return n.day(i,{width:`short`,context:`formatting`});default:return n.day(i,{width:`wide`,context:`formatting`})}},c:function(e,t,n,r){let i=e.getDay(),a=(i-r.weekStartsOn+8)%7||7;switch(t){case`c`:return String(a);case`cc`:return $(a,t.length);case`co`:return n.ordinalNumber(a,{unit:`day`});case`ccc`:return n.day(i,{width:`abbreviated`,context:`standalone`});case`ccccc`:return n.day(i,{width:`narrow`,context:`standalone`});case`cccccc`:return n.day(i,{width:`short`,context:`standalone`});default:return n.day(i,{width:`wide`,context:`standalone`})}},i:function(e,t,n){let r=e.getDay(),i=r===0?7:r;switch(t){case`i`:return String(i);case`ii`:return $(i,t.length);case`io`:return n.ordinalNumber(i,{unit:`day`});case`iii`:return n.day(r,{width:`abbreviated`,context:`formatting`});case`iiiii`:return n.day(r,{width:`narrow`,context:`formatting`});case`iiiiii`:return n.day(r,{width:`short`,context:`formatting`});default:return n.day(r,{width:`wide`,context:`formatting`})}},a:function(e,t,n){let r=e.getHours()/12>=1?`pm`:`am`;switch(t){case`a`:case`aa`:return n.dayPeriod(r,{width:`abbreviated`,context:`formatting`});case`aaa`:return n.dayPeriod(r,{width:`abbreviated`,context:`formatting`}).toLowerCase();case`aaaaa`:return n.dayPeriod(r,{width:`narrow`,context:`formatting`});default:return n.dayPeriod(r,{width:`wide`,context:`formatting`})}},b:function(e,t,n){let r=e.getHours(),i;switch(i=r===12?cs.noon:r===0?cs.midnight:r/12>=1?`pm`:`am`,t){case`b`:case`bb`:return n.dayPeriod(i,{width:`abbreviated`,context:`formatting`});case`bbb`:return n.dayPeriod(i,{width:`abbreviated`,context:`formatting`}).toLowerCase();case`bbbbb`:return n.dayPeriod(i,{width:`narrow`,context:`formatting`});default:return n.dayPeriod(i,{width:`wide`,context:`formatting`})}},B:function(e,t,n){let r=e.getHours(),i;switch(i=r>=17?cs.evening:r>=12?cs.afternoon:r>=4?cs.morning:cs.night,t){case`B`:case`BB`:case`BBB`:return n.dayPeriod(i,{width:`abbreviated`,context:`formatting`});case`BBBBB`:return n.dayPeriod(i,{width:`narrow`,context:`formatting`});default:return n.dayPeriod(i,{width:`wide`,context:`formatting`})}},h:function(e,t,n){if(t===`ho`){let t=e.getHours()%12;return t===0&&(t=12),n.ordinalNumber(t,{unit:`hour`})}return ss.h(e,t)},H:function(e,t,n){return t===`Ho`?n.ordinalNumber(e.getHours(),{unit:`hour`}):ss.H(e,t)},K:function(e,t,n){let r=e.getHours()%12;return t===`Ko`?n.ordinalNumber(r,{unit:`hour`}):$(r,t.length)},k:function(e,t,n){let r=e.getHours();return r===0&&(r=24),t===`ko`?n.ordinalNumber(r,{unit:`hour`}):$(r,t.length)},m:function(e,t,n){return t===`mo`?n.ordinalNumber(e.getMinutes(),{unit:`minute`}):ss.m(e,t)},s:function(e,t,n){return t===`so`?n.ordinalNumber(e.getSeconds(),{unit:`second`}):ss.s(e,t)},S:function(e,t){return ss.S(e,t)},X:function(e,t,n){let r=e.getTimezoneOffset();if(r===0)return`Z`;switch(t){case`X`:return ds(r);case`XXXX`:case`XX`:return fs(r);default:return fs(r,`:`)}},x:function(e,t,n){let r=e.getTimezoneOffset();switch(t){case`x`:return ds(r);case`xxxx`:case`xx`:return fs(r);default:return fs(r,`:`)}},O:function(e,t,n){let r=e.getTimezoneOffset();switch(t){case`O`:case`OO`:case`OOO`:return`GMT`+us(r,`:`);default:return`GMT`+fs(r,`:`)}},z:function(e,t,n){let r=e.getTimezoneOffset();switch(t){case`z`:case`zz`:case`zzz`:return`GMT`+us(r,`:`);default:return`GMT`+fs(r,`:`)}},t:function(e,t,n){return $(Math.trunc(e/1e3),t.length)},T:function(e,t,n){return $(+e,t.length)}};function us(e,t=``){let n=e>0?`-`:`+`,r=Math.abs(e),i=Math.trunc(r/60),a=r%60;return a===0?n+String(i):n+String(i)+t+$(a,2)}function ds(e,t){return e%60==0?(e>0?`-`:`+`)+$(Math.abs(e)/60,2):fs(e,t)}function fs(e,t=``){let n=e>0?`-`:`+`,r=Math.abs(e),i=$(Math.trunc(r/60),2),a=$(r%60,2);return n+i+t+a}var ps=(e,t)=>{switch(e){case`P`:return t.date({width:`short`});case`PP`:return t.date({width:`medium`});case`PPP`:return t.date({width:`long`});default:return t.date({width:`full`})}},ms=(e,t)=>{switch(e){case`p`:return t.time({width:`short`});case`pp`:return t.time({width:`medium`});case`ppp`:return t.time({width:`long`});default:return t.time({width:`full`})}},hs={p:ms,P:(e,t)=>{let n=e.match(/(P+)(p+)?/)||[],r=n[1],i=n[2];if(!i)return ps(e,t);let a;switch(r){case`P`:a=t.dateTime({width:`short`});break;case`PP`:a=t.dateTime({width:`medium`});break;case`PPP`:a=t.dateTime({width:`long`});break;default:a=t.dateTime({width:`full`})}return a.replace(`{{date}}`,ps(r,t)).replace(`{{time}}`,ms(i,t))}},gs=/^D+$/,_s=/^Y+$/,vs=[`D`,`DD`,`YY`,`YYYY`];function ys(e){return gs.test(e)}function bs(e){return _s.test(e)}function xs(e,t,n){let r=Ss(e,t,n);if(console.warn(r),vs.includes(e))throw RangeError(r)}function Ss(e,t,n){let r=e[0]===`Y`?`years`:`days of the month`;return`Use \`${e.toLowerCase()}\` instead of \`${e}\` (in \`${t}\`) for formatting ${r} to the input \`${n}\`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md`}var Cs=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,ws=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,Ts=/^'([^]*?)'?$/,Es=/''/g,Ds=/[a-zA-Z]/;function Os(e,t,n){let r=To(),i=n?.locale??r.locale??ts,a=n?.firstWeekContainsDate??n?.locale?.options?.firstWeekContainsDate??r.firstWeekContainsDate??r.locale?.options?.firstWeekContainsDate??1,o=n?.weekStartsOn??n?.locale?.options?.weekStartsOn??r.weekStartsOn??r.locale?.options?.weekStartsOn??0,s=Q(e,n?.in);if(!Ro(s))throw RangeError(`Invalid time value`);let c=t.match(ws).map(e=>{let t=e[0];if(t===`p`||t===`P`){let n=hs[t];return n(e,i.formatLong)}return e}).join(``).match(Cs).map(e=>{if(e===`''`)return{isToken:!1,value:`'`};let t=e[0];if(t===`'`)return{isToken:!1,value:ks(e)};if(ls[t])return{isToken:!0,value:e};if(t.match(Ds))throw RangeError("Format string contains an unescaped latin alphabet character `"+t+"`");return{isToken:!1,value:e}});i.localize.preprocessor&&(c=i.localize.preprocessor(s,c));let l={firstWeekContainsDate:a,weekStartsOn:o,locale:i};return c.map(r=>{if(!r.isToken)return r.value;let a=r.value;(!n?.useAdditionalWeekYearTokens&&bs(a)||!n?.useAdditionalDayOfYearTokens&&ys(a))&&xs(a,t,String(e));let o=ls[a[0]];return o(s,a,i.localize,l)}).join(``)}function ks(e){let t=e.match(Ts);return t?t[1].replace(Es,`'`):e}function As(e,t,n){let[r,i]=Ao(n?.in,e,t);return r.getFullYear()===i.getFullYear()&&r.getMonth()===i.getMonth()}function js(e,t){return Io(Z(t?.in||e,e),Fo(t?.in||e))}var Ms={lessThanXSeconds:{one:`moins d’une seconde`,other:`moins de {{count}} secondes`},xSeconds:{one:`1 seconde`,other:`{{count}} secondes`},halfAMinute:`30 secondes`,lessThanXMinutes:{one:`moins d’une minute`,other:`moins de {{count}} minutes`},xMinutes:{one:`1 minute`,other:`{{count}} minutes`},aboutXHours:{one:`environ 1 heure`,other:`environ {{count}} heures`},xHours:{one:`1 heure`,other:`{{count}} heures`},xDays:{one:`1 jour`,other:`{{count}} jours`},aboutXWeeks:{one:`environ 1 semaine`,other:`environ {{count}} semaines`},xWeeks:{one:`1 semaine`,other:`{{count}} semaines`},aboutXMonths:{one:`environ 1 mois`,other:`environ {{count}} mois`},xMonths:{one:`1 mois`,other:`{{count}} mois`},aboutXYears:{one:`environ 1 an`,other:`environ {{count}} ans`},xYears:{one:`1 an`,other:`{{count}} ans`},overXYears:{one:`plus d’un an`,other:`plus de {{count}} ans`},almostXYears:{one:`presqu’un an`,other:`presque {{count}} ans`}},Ns=(e,t,n)=>{let r,i=Ms[e];return r=typeof i==`string`?i:t===1?i.one:i.other.replace(`{{count}}`,String(t)),n?.addSuffix?n.comparison&&n.comparison>0?`dans `+r:`il y a `+r:r},Ps={date:Go({formats:{full:`EEEE d MMMM y`,long:`d MMMM y`,medium:`d MMM y`,short:`dd/MM/y`},defaultWidth:`full`}),time:Go({formats:{full:`HH:mm:ss zzzz`,long:`HH:mm:ss z`,medium:`HH:mm:ss`,short:`HH:mm`},defaultWidth:`full`}),dateTime:Go({formats:{full:`{{date}} 'à' {{time}}`,long:`{{date}} 'à' {{time}}`,medium:`{{date}}, {{time}}`,short:`{{date}}, {{time}}`},defaultWidth:`full`})},Fs={lastWeek:`eeee 'dernier à' p`,yesterday:`'hier à' p`,today:`'aujourd’hui à' p`,tomorrow:`'demain à' p'`,nextWeek:`eeee 'prochain à' p`,other:`P`},Is=(e,t,n,r)=>Fs[e],Ls={narrow:[`av. J.-C`,`ap. J.-C`],abbreviated:[`av. J.-C`,`ap. J.-C`],wide:[`avant Jésus-Christ`,`après Jésus-Christ`]},Rs={narrow:[`T1`,`T2`,`T3`,`T4`],abbreviated:[`1er trim.`,`2ème trim.`,`3ème trim.`,`4ème trim.`],wide:[`1er trimestre`,`2ème trimestre`,`3ème trimestre`,`4ème trimestre`]},zs={narrow:[`J`,`F`,`M`,`A`,`M`,`J`,`J`,`A`,`S`,`O`,`N`,`D`],abbreviated:[`janv.`,`févr.`,`mars`,`avr.`,`mai`,`juin`,`juil.`,`août`,`sept.`,`oct.`,`nov.`,`déc.`],wide:[`janvier`,`février`,`mars`,`avril`,`mai`,`juin`,`juillet`,`août`,`septembre`,`octobre`,`novembre`,`décembre`]},Bs={narrow:[`D`,`L`,`M`,`M`,`J`,`V`,`S`],short:[`di`,`lu`,`ma`,`me`,`je`,`ve`,`sa`],abbreviated:[`dim.`,`lun.`,`mar.`,`mer.`,`jeu.`,`ven.`,`sam.`],wide:[`dimanche`,`lundi`,`mardi`,`mercredi`,`jeudi`,`vendredi`,`samedi`]},Vs={narrow:{am:`AM`,pm:`PM`,midnight:`minuit`,noon:`midi`,morning:`mat.`,afternoon:`ap.m.`,evening:`soir`,night:`mat.`},abbreviated:{am:`AM`,pm:`PM`,midnight:`minuit`,noon:`midi`,morning:`matin`,afternoon:`après-midi`,evening:`soir`,night:`matin`},wide:{am:`AM`,pm:`PM`,midnight:`minuit`,noon:`midi`,morning:`du matin`,afternoon:`de l’après-midi`,evening:`du soir`,night:`du matin`}},Hs=(e,t)=>{let n=Number(e),r=t?.unit;if(n===0)return`0`;let i=[`year`,`week`,`hour`,`minute`,`second`],a;return a=n===1?r&&i.includes(r)?`ère`:`er`:`ème`,n+a},Us=[`MMM`,`MMMM`],Ws={code:`fr`,formatDistance:Ns,formatLong:Ps,formatRelative:Is,localize:{preprocessor:(e,t)=>e.getDate()===1||!t.some(e=>e.isToken&&Us.includes(e.value))?t:t.map(e=>e.isToken&&e.value===`do`?{isToken:!0,value:`d`}:e),ordinalNumber:Hs,era:Yo({values:Ls,defaultWidth:`wide`}),quarter:Yo({values:Rs,defaultWidth:`wide`,argumentCallback:e=>e-1}),month:Yo({values:zs,defaultWidth:`wide`}),day:Yo({values:Bs,defaultWidth:`wide`}),dayPeriod:Yo({values:Vs,defaultWidth:`wide`})},match:{ordinalNumber:es({matchPattern:/^(\d+)(ième|ère|ème|er|e)?/i,parsePattern:/\d+/i,valueCallback:e=>parseInt(e)}),era:Zo({matchPatterns:{narrow:/^(av\.J\.C|ap\.J\.C|ap\.J\.-C)/i,abbreviated:/^(av\.J\.-C|av\.J-C|apr\.J\.-C|apr\.J-C|ap\.J-C)/i,wide:/^(avant Jésus-Christ|après Jésus-Christ)/i},defaultMatchWidth:`wide`,parsePatterns:{any:[/^av/i,/^ap/i]},defaultParseWidth:`any`}),quarter:Zo({matchPatterns:{narrow:/^T?[1234]/i,abbreviated:/^[1234](er|ème|e)? trim\.?/i,wide:/^[1234](er|ème|e)? trimestre/i},defaultMatchWidth:`wide`,parsePatterns:{any:[/1/i,/2/i,/3/i,/4/i]},defaultParseWidth:`any`,valueCallback:e=>e+1}),month:Zo({matchPatterns:{narrow:/^[jfmasond]/i,abbreviated:/^(janv|févr|mars|avr|mai|juin|juill|juil|août|sept|oct|nov|déc)\.?/i,wide:/^(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)/i},defaultMatchWidth:`wide`,parsePatterns:{narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^av/i,/^ma/i,/^juin/i,/^juil/i,/^ao/i,/^s/i,/^o/i,/^n/i,/^d/i]},defaultParseWidth:`any`}),day:Zo({matchPatterns:{narrow:/^[lmjvsd]/i,short:/^(di|lu|ma|me|je|ve|sa)/i,abbreviated:/^(dim|lun|mar|mer|jeu|ven|sam)\.?/i,wide:/^(dimanche|lundi|mardi|mercredi|jeudi|vendredi|samedi)/i},defaultMatchWidth:`wide`,parsePatterns:{narrow:[/^d/i,/^l/i,/^m/i,/^m/i,/^j/i,/^v/i,/^s/i],any:[/^di/i,/^lu/i,/^ma/i,/^me/i,/^je/i,/^ve/i,/^sa/i]},defaultParseWidth:`any`}),dayPeriod:Zo({matchPatterns:{narrow:/^(a|p|minuit|midi|mat\.?|ap\.?m\.?|soir|nuit)/i,any:/^([ap]\.?\s?m\.?|du matin|de l'après[-\s]midi|du soir|de la nuit)/i},defaultMatchWidth:`any`,parsePatterns:{any:{am:/^a/i,pm:/^p/i,midnight:/^min/i,noon:/^mid/i,morning:/mat/i,afternoon:/ap/i,evening:/soir/i,night:/nuit/i}},defaultParseWidth:`any`})},options:{weekStartsOn:1,firstWeekContainsDate:4}},Gs={weekStartsOn:1};function Ks(e){let t=Eo(Vo(e),Gs);return Array.from({length:42},(e,n)=>So(t,n))}function qs(e){let t=Eo(e,Gs);return Array.from({length:7},(e,n)=>So(t,n))}function Js(e,t){let n=jo(t).getTime(),r=zo(t).getTime();return e.filter(e=>e.start.getTime()<=r&&Math.max(e.end.getTime(),e.start.getTime())>=n).sort((e,t)=>e.start.getTime()-t.start.getTime())}function Ys(e){let t=[...e].sort((e,t)=>e.start.getTime()-t.start.getTime()),n=[];for(let e of t){let t=n[n.length-1];t&&Io(t.day,e.start)?t.events.push(e):n.push({day:jo(e.start),events:[e]})}return n}function Xs(e,t,n){return t===`month`||t===`list`?Co(e,n):t===`week`?Po(e,n):So(e,n)}function Zs(e,t){if(t===`week`){let t=qs(e);return{from:jo(t[0]),to:zo(t[6])}}return t===`day`?{from:jo(e),to:zo(e)}:{from:Vo(e),to:Bo(e)}}function Qs(e,t,n){return e.filter(e=>e.start.getTime()<=n.getTime()&&e.end.getTime()>=t.getTime())}var $s=e=>({count:e}),ec=e=>({date:e}),tc=e=>({locale:e}),nc=(e,t)=>({date:e,count:t}),rc=e=>({$implicit:e,compact:!1}),ic=e=>({$implicit:e,compact:!0}),ac=(e,t)=>t[0],oc=(e,t)=>t.getTime(),sc=(e,t)=>t.toISOString(),cc=(e,t)=>t.id,lc=(e,t)=>t.day.toISOString();function uc(e,t){if(e&1){let e=x();_(0,`button`,16),l(`click`,function(){let t=j(e).$implicit,n=k();return v(n.calendarView.set(t))}),F(1),p()}if(e&2){let e=t.$implicit,n=k();L(`bg-card`,n.calendarView()===e)(`shadow-sm`,n.calendarView()===e)(`text-foreground`,n.calendarView()===e)(`text-muted-foreground`,n.calendarView()!==e),I(),U(` `,n.t()(n.labelForView(e)),` `)}}function dc(e,t){if(e&1&&(_(0,`option`,19),F(1),p()),e&2){let e=t.$implicit;A(`ngValue`,e[0]),I(),G(e[1])}}function fc(e,t){if(e&1){let e=x();_(0,`label`,15)(1,`span`,17),F(2),p(),_(3,`select`,18),be(),l(`ngModelChange`,function(t){j(e);let n=k();return v(n.category.set(t))}),_(4,`option`,19),F(5),p(),P(6,dc,2,2,`option`,19,ac),p()()}if(e&2){let e=k();I(2),G(e.t()(`calendrier.filter.label`)),I(),A(`ngModel`,e.category()),Qe(),I(),A(`ngValue`,e.allToken),I(),G(e.t()(`calendrier.filter.all`)),I(),s(e.categories())}}function pc(e,t){e&1&&T(0)}function mc(e,t){if(e&1&&We(0,pc,1,0,`ng-container`,20),e&2){k();let e=ue(22);A(`ngTemplateOutlet`,e)}}function hc(e,t){e&1&&T(0)}function gc(e,t){if(e&1&&We(0,hc,1,0,`ng-container`,20),e&2){k();let e=ue(24);A(`ngTemplateOutlet`,e)}}function _c(e,t){e&1&&T(0)}function vc(e,t){if(e&1&&We(0,_c,1,0,`ng-container`,20),e&2){k();let e=ue(26);A(`ngTemplateOutlet`,e)}}function yc(e,t){e&1&&T(0)}function bc(e,t){if(e&1&&We(0,yc,1,0,`ng-container`,20),e&2){k();let e=ue(28);A(`ngTemplateOutlet`,e)}}function xc(e,t){if(e&1&&(_(0,`div`,23),F(1),p()),e&2){let e=t.$implicit,n=k(2);I(),G(n.cap(n.format(e,`EEE`,y(1,tc,n.frLocale))))}}function Sc(e,t){if(e&1&&w(0,`span`),e&2){let e=t.$implicit,n=k(3);R(n.cn(`size-1.5 rounded-full`,n.toneStyle(e.tone).dot))}}function Cc(e,t){if(e&1&&(_(0,`span`,39),F(1),p()),e&2){let e=t.$implicit,n=k(3);R(n.cn(n.toneStyle(e.tone).card,e.muted?`opacity-60 line-through`:``)),I(),U(` `,e.title,` `)}}function wc(e,t){if(e&1&&(_(0,`span`,38),F(1),p()),e&2){let e=k().$implicit,t=k(2);I(),U(` `,t.t()(`calendrier.more`,y(1,$s,t.dayEvents(e).length-2)),` `)}}function Tc(e,t){if(e&1){let e=x();_(0,`button`,32),l(`click`,function(){let t=j(e).$implicit,n=k(2);return v(n.selected.set(t))}),_(1,`span`,33),F(2),p(),_(3,`span`,34),P(4,Sc,1,2,`span`,35,cc),p(),_(6,`span`,36),P(7,Cc,2,3,`span`,37,cc),K(9,wc,2,3,`span`,38),p()()}if(e&2){let e=t.$implicit,n=k(2);R(n.cn(`flex min-h-14 flex-col items-stretch gap-1 border-b border-r p-1 text-left transition-colors last:border-r-0 hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring md:min-h-24 md:p-1.5`,n.outOfMonth(e)?`bg-muted/40 text-muted-foreground`:``,n.isSel(e)?`bg-primary-soft`:``)),W(`aria-pressed`,n.isSameDay(e,n.selected()))(`aria-label`,n.dayEvents(e).length===0?n.t()(`calendrier.dayCell`,y(8,ec,n.fmtLong(e))):n.t()(`calendrier.dayCell.events.autre`,Re(10,nc,n.fmtLong(e),n.dayEvents(e).length))),I(),R(n.cn(n.isTodayDay(e)?`bg-primary font-semibold text-primary-foreground`:``)),I(),U(` `,e.getDate(),` `),I(2),s(n.dayEvents(e).slice(0,4)),I(3),s(n.dayEvents(e).slice(0,2)),I(2),M(n.dayEvents(e).length>2?9:-1)}}function Ec(e,t){if(e&1){let e=x();_(0,`ui-button`,40),l(`click`,function(){j(e);let t=k(2);return v(t.emitDayCreate(t.selected()))}),w(1,`lucide-angular`,9),F(2),p()}if(e&2){let e=k(2);I(),A(`img`,e.icons.plus),I(),U(` `,e.t()(`calendrier.addOnDay`),` `)}}function Dc(e,t){if(e&1&&(_(0,`p`,30),F(1),p()),e&2){let e=k(2);I(),G(e.t()(`calendrier.empty.day`))}}function Oc(e,t){e&1&&T(0)}function kc(e,t){if(e&1&&We(0,Oc,1,0,`ng-container`,41),e&2){let e=t.$implicit;k(3);let n=ue(30);A(`ngTemplateOutlet`,n)(`ngTemplateOutletContext`,y(2,rc,e))}}function Ac(e,t){if(e&1&&(_(0,`div`,31),P(1,kc,1,4,`ng-container`,null,cc),p()),e&2){let e=k(2);I(),s(e.dayEvents(e.selected()))}}function jc(e,t){if(e&1&&(_(0,`div`,21)(1,`div`,22),P(2,xc,2,3,`div`,23,oc),p(),_(4,`div`,24),P(5,Tc,10,13,`button`,25,sc),p()(),_(7,`section`,26)(8,`div`,27)(9,`h3`,28),F(10),p(),K(11,Ec,3,2,`ui-button`,29),p(),K(12,Dc,2,1,`p`,30)(13,Ac,3,0,`div`,31),p()),e&2){let e=k();I(2),s(e.weekHead()),I(3),s(e.monthCells()),I(2),W(`aria-label`,e.t()(`calendrier.selectedDay`,y(4,ec,e.fmtWeekdayDay(e.selected())))),I(3),U(` `,e.t()(`calendrier.selectedDay`,y(6,ec,e.fmtWeekdayDay(e.selected()))),` `),I(),M(e.dayCreateEnabled()?11:-1),I(),M(e.dayEvents(e.selected()).length===0?12:13)}}function Mc(e,t){if(e&1&&(_(0,`p`,46),F(1),p()),e&2){let e=k(3);I(),G(e.t()(`calendrier.empty.day`))}}function Nc(e,t){e&1&&T(0)}function Pc(e,t){if(e&1&&We(0,Nc,1,0,`ng-container`,41),e&2){let e=t.$implicit;k(4);let n=ue(30);A(`ngTemplateOutlet`,n)(`ngTemplateOutletContext`,y(2,ic,e))}}function Fc(e,t){if(e&1&&(_(0,`div`,31),P(1,Pc,1,4,`ng-container`,null,cc),p()),e&2){let e=k().$implicit,t=k(2);I(),s(t.dayEvents(e))}}function Ic(e,t){if(e&1&&(_(0,`section`,44)(1,`h3`,45),F(2),p(),K(3,Mc,2,1,`p`,46)(4,Fc,3,0,`div`,31),p()),e&2){let e=t.$implicit,n=k(2);L(`border-primary`,n.isTodayDay(e)),W(`aria-label`,n.cap(n.fmtWeekdayDay(e))),I(2),U(` `,n.cap(n.format(e,`EEE d`,y(5,tc,n.frLocale))),` `),I(),M(n.dayEvents(e).length===0?3:4)}}function Lc(e,t){if(e&1&&(_(0,`div`,42),P(1,Ic,5,7,`section`,43,sc),p()),e&2){let e=k();I(),s(e.weekCells())}}function Rc(e,t){if(e&1&&(_(0,`p`,30),F(1),p()),e&2){let e=k(2);I(),G(e.t()(`calendrier.empty.day`))}}function zc(e,t){e&1&&T(0)}function Bc(e,t){if(e&1&&We(0,zc,1,0,`ng-container`,41),e&2){let e=t.$implicit;k(3);let n=ue(30);A(`ngTemplateOutlet`,n)(`ngTemplateOutletContext`,y(2,rc,e))}}function Vc(e,t){if(e&1&&(_(0,`div`,31),P(1,Bc,1,4,`ng-container`,null,cc),p()),e&2){let e=k(2);I(),s(e.dayEvents(e.cursorDate()))}}function Hc(e,t){if(e&1&&(_(0,`section`,47),K(1,Rc,2,1,`p`,30)(2,Vc,3,0,`div`,31),p()),e&2){let e=k();I(),M(e.dayEvents(e.cursorDate()).length===0?1:2)}}function Uc(e,t){if(e&1&&(_(0,`p`,48),F(1),p()),e&2){let e=k(2);I(),G(e.t()(`calendrier.empty.period`))}}function Wc(e,t){e&1&&T(0)}function Gc(e,t){if(e&1&&We(0,Wc,1,0,`ng-container`,41),e&2){let e=t.$implicit;k(4);let n=ue(30);A(`ngTemplateOutlet`,n)(`ngTemplateOutletContext`,y(2,rc,e))}}function Kc(e,t){if(e&1&&(_(0,`section`)(1,`h3`,45),F(2),p(),_(3,`div`,31),P(4,Gc,1,4,`ng-container`,null,cc),p()()),e&2){let e=t.$implicit,n=k(3);I(2),U(` `,n.cap(n.format(e.day,`EEEE d MMMM`,y(1,tc,n.frLocale))),` `),I(2),s(e.events)}}function qc(e,t){if(e&1&&(_(0,`div`,49),P(1,Kc,6,3,`section`,null,lc),p()),e&2){let e=k(2);I(),s(e.listGroups())}}function Jc(e,t){if(e&1&&K(0,Uc,2,1,`p`,48)(1,qc,3,0,`div`,49),e&2){let e=k();M(e.listGroups().length===0?0:1)}}function Yc(e,t){if(e&1){let e=x();_(0,`button`,50),l(`click`,function(){let t=j(e).$implicit,n=k();return v(n.eventClick.emit(t))}),_(1,`span`,51),F(2),p(),_(3,`span`,52),F(4),p()()}if(e&2){let e=t.$implicit,n=t.compact,r=k();R(r.cn(n?`py-1 text-xs`:`py-2 text-sm`,r.toneStyle(e.tone).card,e.muted?`opacity-60 line-through`:``)),I(2),G(e.title),I(2),G(r.eventSubtitle(e))}}var Xc=[`month`,`week`,`day`,`list`],Zc={month:`calendrier.view.month`,week:`calendrier.view.week`,day:`calendrier.view.day`,list:`calendrier.view.list`},Qc={primary:{card:`border-l-primary bg-primary-soft text-foreground`,dot:`bg-primary`},info:{card:`border-l-info bg-info-bg text-info-fg`,dot:`bg-info`},success:{card:`border-l-success bg-success-bg text-success-fg`,dot:`bg-success`},warning:{card:`border-l-warning bg-warning-bg text-warning-fg`,dot:`bg-warning`},danger:{card:`border-l-danger bg-danger-bg text-danger-fg`,dot:`bg-danger`},neutral:{card:`border-l-border-strong bg-muted text-muted-foreground`,dot:`bg-border-strong`}},$c=`__all`,el=class e{constructor(){this.locale=q(it),this.t=this.locale.t,this.cn=ln,this.format=Os,this.frLocale=Ws,this.isSameDay=Io,this.icons={chevronLeft:st,chevronRight:ot,plus:lt},this.views=Xc,this.allToken=$c,this.events=z.required(),this.categories=z([]),this.defaultView=z(`month`),this.defaultDate=z(void 0),this.className=z(``,{alias:`class`}),this.eventClick=S(),this.dayCreateEnabled=z(!1),this.dayCreate=S(),this.calendarView=m(`month`),this.cursorDate=m(new Date),this.selected=m(new Date),this.category=m($c),this.shown=f(()=>{let e=this.category(),t=this.events();return e===$c?t:t.filter(t=>t.category===e)}),this.range=f(()=>Zs(this.cursorDate(),this.calendarView())),this.inPeriod=f(()=>Qs(this.shown(),this.range().from,this.range().to)),this.title=f(()=>{let e=this.cursorDate(),t=this.calendarView();if(t===`day`)return this.cap(Os(e,`EEEE d MMMM yyyy`,{locale:Ws}));if(t===`week`){let t=qs(e);return this.t()(`calendrier.weekOf`,{from:Os(t[0],`d MMMM`,{locale:Ws}),to:Os(t[6],`d MMMM yyyy`,{locale:Ws})})}return this.cap(Os(e,`MMMM yyyy`,{locale:Ws}))}),this.monthCells=f(()=>Ks(this.cursorDate())),this.weekHead=f(()=>qs(this.cursorDate())),this.weekCells=f(()=>qs(this.cursorDate())),this.listGroups=f(()=>Ys(this.inPeriod()))}ngOnInit(){this.calendarView.set(this.defaultView());let e=this.defaultDate();if(e){let t=new Date(e);this.cursorDate.set(t),this.selected.set(t)}}labelForView(e){return Zc[e]}toneStyle(e){return Qc[e]}cap(e){return e.charAt(0).toUpperCase()+e.slice(1)}fmtLong(e){return Os(e,`EEEE d MMMM yyyy`,{locale:Ws})}fmtWeekdayDay(e){return Os(e,`EEEE d MMMM`,{locale:Ws})}outOfMonth(e){return!As(e,this.cursorDate())}isSel(e){return Io(e,this.selected())}isTodayDay(e){return js(e)}dayEvents(e){return Js(this.shown(),e)}eventSubtitle(e){if(Io(e.start,e.end)){let t=Os(e.start,`HH:mm`,{locale:Ws}),n=e.subtitle?.trim();return n?`${t} · ${n}`:t}return this.t()(`calendrier.multiDay`,{from:Os(e.start,`d MMM`,{locale:Ws}),to:Os(e.end,`d MMM`,{locale:Ws})})}go(e){let t=Xs(this.cursorDate(),this.calendarView(),e);this.cursorDate.set(t),this.selected.set(t)}today(){let e=new Date;this.cursorDate.set(e),this.selected.set(e)}emitDayCreate(e){this.dayCreate.emit(e)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-event-calendar`]],inputs:{events:[1,`events`],categories:[1,`categories`],defaultView:[1,`defaultView`],defaultDate:[1,`defaultDate`],className:[1,`class`,`className`],dayCreateEnabled:[1,`dayCreateEnabled`]},outputs:{eventClick:`eventClick`,dayCreate:`dayCreate`},decls:31,vars:15,consts:[[`monthTpl`,``],[`weekTpl`,``],[`dayTpl`,``],[`listTpl`,``],[`eventCard`,``],[`role`,`region`],[1,`flex`,`flex-wrap`,`items-center`,`gap-2`],[1,`flex`,`items-center`,`gap-1`],[`variant`,`outline`,`size`,`icon`,3,`click`,`ariaLabel`],[1,`size-4`,3,`img`],[`variant`,`outline`,3,`click`],[`aria-live`,`polite`,1,`min-w-0`,`flex-1`,`text-lg`,`font-semibold`],[1,`ml-2`,`text-sm`,`font-normal`,`text-muted-foreground`],[`role`,`group`,1,`inline-flex`,`rounded-md`,`border`,`border-input`,`bg-muted/30`,`p-0.5`],[`type`,`button`,1,`rounded`,`px-2.5`,`py-1`,`text-xs`,`font-medium`,`transition-colors`,`focus-visible:outline-none`,`focus-visible:ring-2`,`focus-visible:ring-ring`,3,`bg-card`,`shadow-sm`,`text-foreground`,`text-muted-foreground`],[1,`flex`,`flex-col`,`gap-1`,`text-sm`,`sm:w-56`],[`type`,`button`,1,`rounded`,`px-2.5`,`py-1`,`text-xs`,`font-medium`,`transition-colors`,`focus-visible:outline-none`,`focus-visible:ring-2`,`focus-visible:ring-ring`,3,`click`],[1,`font-medium`],[1,`h-9`,`rounded-md`,`border`,`border-input`,`bg-background`,`px-3`,`text-sm`,`shadow-sm`,`focus-visible:outline-none`,`focus-visible:ring-1`,`focus-visible:ring-ring`,3,`ngModelChange`,`ngModel`],[3,`ngValue`],[4,`ngTemplateOutlet`],[1,`surface`,`overflow-hidden`],[1,`grid`,`grid-cols-7`,`border-b`,`bg-muted`,`text-center`,`text-xs`,`font-medium`,`text-muted-foreground`],[1,`py-2`],[1,`grid`,`grid-cols-7`],[`type`,`button`,3,`class`],[1,`surface`,`mt-3`,`p-4`],[1,`mb-3`,`flex`,`items-center`,`justify-between`,`gap-2`],[1,`text-sm`,`font-semibold`],[`type`,`button`,`variant`,`outline`,`size`,`sm`],[1,`text-sm`,`text-muted-foreground`],[1,`space-y-2`],[`type`,`button`,3,`click`],[1,`grid`,`size-6`,`place-items-center`,`rounded-full`,`text-xs`,`tabular`],[`aria-hidden`,`true`,1,`flex`,`flex-wrap`,`gap-0.5`,`md:hidden`],[3,`class`],[`aria-hidden`,`true`,1,`hidden`,`space-y-0.5`,`md:block`],[1,`block`,`truncate`,`rounded`,`border-l-2`,`px-1`,`text-[11px]`,3,`class`],[1,`block`,`text-[11px]`,`text-muted-foreground`],[1,`block`,`truncate`,`rounded`,`border-l-2`,`px-1`,`text-[11px]`],[`type`,`button`,`variant`,`outline`,`size`,`sm`,3,`click`],[4,`ngTemplateOutlet`,`ngTemplateOutletContext`],[1,`grid`,`gap-3`,`md:grid-cols-7`],[1,`surface`,`min-w-0`,`p-3`,3,`border-primary`],[1,`surface`,`min-w-0`,`p-3`],[1,`mb-2`,`text-xs`,`font-semibold`,`uppercase`,`tracking-wider`,`text-muted-foreground`],[1,`text-xs`,`text-muted-foreground`],[1,`surface`,`p-4`],[1,`surface`,`p-5`,`text-sm`,`text-muted-foreground`],[1,`space-y-4`],[`type`,`button`,1,`block`,`w-full`,`rounded-md`,`border-l-4`,`px-2.5`,`text-left`,`transition-colors`,`hover:brightness-95`,`focus-visible:outline-none`,`focus-visible:ring-2`,`focus-visible:ring-ring`,3,`click`],[1,`block`,`truncate`,`font-medium`],[1,`block`,`truncate`,`text-xs`,`opacity-80`]],template:function(e,t){e&1&&(_(0,`div`,5)(1,`div`,6)(2,`div`,7)(3,`ui-button`,8),l(`click`,function(){return t.go(-1)}),w(4,`lucide-angular`,9),p(),_(5,`ui-button`,10),l(`click`,function(){return t.today()}),F(6),p(),_(7,`ui-button`,8),l(`click`,function(){return t.go(1)}),w(8,`lucide-angular`,9),p()(),_(9,`h2`,11),F(10),_(11,`span`,12),F(12),p()(),_(13,`div`,13),P(14,uc,2,9,`button`,14,He),p()(),K(16,fc,8,4,`label`,15),K(17,mc,1,1,`ng-container`)(18,gc,1,1,`ng-container`)(19,vc,1,1,`ng-container`)(20,bc,1,1,`ng-container`),p(),We(21,jc,14,8,`ng-template`,null,0,we)(23,Lc,3,0,`ng-template`,null,1,we)(25,Hc,3,1,`ng-template`,null,2,we)(27,Jc,2,1,`ng-template`,null,3,we)(29,Yc,5,4,`ng-template`,null,4,we)),e&2&&(R(t.cn(`space-y-3`,t.className())),W(`aria-label`,t.t()(`calendrier.region`)),I(3),A(`ariaLabel`,t.t()(`calendrier.prev`)),I(),A(`img`,t.icons.chevronLeft),I(2),G(t.t()(`calendrier.today`)),I(),A(`ariaLabel`,t.t()(`calendrier.next`)),I(),A(`img`,t.icons.chevronRight),I(2),U(` `,t.title(),` `),I(2),U(` `,t.t()(`calendrier.count.autre`,y(13,$s,t.inPeriod().length)),` `),I(),W(`aria-label`,t.t()(`calendrier.views.aria`)),I(),s(t.views),I(2),M(t.categories().length>0?16:-1),I(),M(t.calendarView()===`month`?17:t.calendarView()===`week`?18:t.calendarView()===`day`?19:20))},dependencies:[n,vo,lo,go,co,Ia,Xa,ct,at,pn],encapsulation:2})}},tl={firstName:{placeholder:`ui.field.ph.firstName`,icon:`person`,autocomplete:`given-name`,maxlength:60},lastName:{placeholder:`ui.field.ph.lastName`,autocomplete:`family-name`,maxlength:60},age:{placeholder:`ui.field.ph.age`,icon:`calendar_today`,type:`number`,inputmode:`numeric`,maxlength:3},phone:{placeholder:`ui.field.ph.phone`,icon:`call`,type:`tel`,inputmode:`tel`,autocomplete:`tel`,maxlength:20},cni:{placeholder:`ui.field.ph.cni`,icon:`badge`,inputmode:`numeric`,autocomplete:`off`,maxlength:20},village:{placeholder:`ui.field.ph.village`,icon:`location_on`,maxlength:80},commune:{placeholder:`ui.field.ph.commune`,icon:`location_on`,maxlength:80},region:{placeholder:`ui.field.ph.region`,icon:`landscape`,maxlength:80},email:{placeholder:`ui.field.ph.email`,icon:`mail`,type:`email`,inputmode:`email`,autocomplete:`email`,maxlength:120},amount:{placeholder:`ui.field.ph.amount`,icon:`payments`,type:`number`,inputmode:`numeric`},note:{placeholder:`ui.field.ph.note`,icon:`edit`,maxlength:200},scoopName:{placeholder:`ui.field.ph.scoopName`,icon:`apartment`,maxlength:120},scoopCode:{placeholder:`ui.field.ph.scoopCode`,maxlength:5},period:{placeholder:`ui.field.ph.period`,icon:`calendar_today`,inputmode:`numeric`,maxlength:7},meetingTitle:{placeholder:`ui.field.ph.meetingTitle`,icon:`event`,maxlength:120},place:{placeholder:`ui.field.ph.place`,icon:`location_on`,maxlength:120},agendaItem:{placeholder:`ui.field.ph.agendaItem`,maxlength:160}},nl=e=>({name:e}),rl=(e,t)=>t.id,il=(e,t)=>t.key;function al(e,t){if(e&1&&(_(0,`span`,9),F(1),p()),e&2){let e=k(2);I(),G(e.t()(`ui.files.required`))}}function ol(e,t){if(e&1&&(_(0,`span`,10),F(1),p()),e&2){let e=k(2);I(),G(e.t()(`ui.files.sensitive`))}}function sl(e,t){if(e&1){let e=x();_(0,`li`,14),w(1,`ui-icon`,15),_(2,`span`,16),F(3),p(),_(4,`span`,17),F(5),p(),_(6,`button`,18),l(`click`,function(){let t=j(e).$implicit,n=k(3);return v(n.removed.emit(t.key))}),w(7,`ui-icon`,19),p()()}if(e&2){let e=t.$implicit,n=k(3);I(),A(`size`,16),I(),A(`title`,e.name),I(),G(e.name),I(2),U(``,e.sizeKb,` Ko`),I(),W(`aria-label`,n.t()(`ui.files.remove`,y(6,nl,e.name))),I(),A(`size`,16)}}function cl(e,t){if(e&1&&(_(0,`ul`,12),P(1,sl,8,8,`li`,14,il),p()),e&2){k();let e=_e(0);I(),s(e)}}function ll(e,t){if(e&1){let e=x();_(0,`label`,13),w(1,`ui-icon`,20),F(2),_(3,`input`,21),l(`change`,function(t){j(e);let n=k().$implicit,r=k();return v(r.onPick(t,n.id))}),p()()}if(e&2){let e=k().$implicit,t=_e(0),n=k();W(`for`,n.uid+e.id),I(),A(`size`,18),I(),U(` `,t.length?n.t()(`ui.files.addAnother`):n.t()(`ui.files.add`),` `),I(),A(`id`,n.uid+e.id)(`accept`,n.accept())(`multiple`,n.multiple())}}function ul(e,t){if(e&1){let e=x();Ze(0),_(1,`div`,3),l(`dragover`,function(t){let n=j(e).$implicit,r=k();return t.preventDefault(),v(r.over.set(n.id))})(`dragleave`,function(){j(e);let t=k();return v(t.over.set(null))})(`drop`,function(t){let n=j(e).$implicit,r=k();return v(r.onDrop(t,n.id))}),_(2,`div`,4)(3,`span`,5),w(4,`ui-icon`,6),p(),_(5,`div`,7)(6,`p`,8),F(7),K(8,al,2,1,`span`,9),K(9,ol,2,1,`span`,10),p(),_(10,`p`,11),F(11),p()()(),K(12,cl,3,0,`ul`,12),K(13,ll,4,6,`label`,13),p()}if(e&2){let e=t.$implicit,n=k(),r=xe(n.filesOf(e.id));I(),L(`filled`,r.length)(`over`,n.over()===e.id),I(3),A(`name`,r.length?`check_circle`:e.icon)(`size`,20),I(3),U(` `,e.label,` `),I(),M(e.required&&!r.length?8:-1),I(),M(e.sensitive?9:-1),I(2),G(e.hint),I(),M(r.length?12:-1),I(),M(n.multiple()||!r.length?13:-1)}}function dl(e,t){if(e&1&&(_(0,`p`,2),w(1,`ui-icon`,22),F(2),p()),e&2){let e=k();I(),A(`size`,16),I(),U(``,e.hint(),` `)}}var fl=0,pl=class e{constructor(){this.slots=z.required(),this.files=z([]),this.accept=z(``),this.multiple=z(!0),this.hint=z(``),this.added=S(),this.removed=S(),this.t=q(it).t,this.uid=`fs-${fl++}-`,this.over=m(null)}filesOf(e){return this.files().filter(t=>t.slot===e)}onPick(e,t){let n=e.target;n.files?.length&&this.added.emit({slot:t,files:Array.from(n.files)}),n.value=``}onDrop(e,t){e.preventDefault(),this.over.set(null);let n=e.dataTransfer?.files;n?.length&&this.added.emit({slot:t,files:Array.from(n)})}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-file-slots`]],hostAttrs:[1,`block`],inputs:{slots:[1,`slots`],files:[1,`files`],accept:[1,`accept`],multiple:[1,`multiple`],hint:[1,`hint`]},outputs:{added:`added`,removed:`removed`},decls:4,vars:1,consts:[[1,`slots`],[1,`slot`,3,`filled`,`over`],[1,`mt-3`,`flex`,`items-center`,`gap-2`,`text-[12.5px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`slot`,3,`dragover`,`dragleave`,`drop`],[1,`flex`,`items-start`,`gap-3`],[`aria-hidden`,`true`,1,`ico`],[3,`name`,`size`],[1,`min-w-0`,`flex-1`],[1,`flex`,`flex-wrap`,`items-center`,`gap-1.5`,`text-[14px]`,`font-extrabold`],[1,`tag`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`tag`,2,`background`,`var(--v2-erreur-bg)`,`color`,`var(--v2-erreur-fg)`],[1,`mt-0.5`,`text-[12.5px]`,`font-medium`,`leading-snug`,2,`color`,`var(--v2-gris-texte)`],[1,`files`],[1,`drop`],[1,`file`],[`name`,`description`,2,`color`,`var(--v2-foret)`,3,`size`],[1,`min-w-0`,`flex-1`,`truncate`,`font-bold`,3,`title`],[1,`shrink-0`,`tabular-nums`,2,`color`,`var(--v2-gris-texte)`],[`type`,`button`,1,`rm`,3,`click`],[`name`,`close`,3,`size`],[`name`,`upload_file`,3,`size`],[`type`,`file`,1,`sr-only`,3,`change`,`id`,`accept`,`multiple`],[`name`,`help`,3,`size`]],template:function(e,t){e&1&&(_(0,`div`,0),P(1,ul,14,13,`div`,1,rl),p(),K(3,dl,3,2,`p`,2)),e&2&&(I(),s(t.slots()),I(2),M(t.hint()?3:-1))},dependencies:[i],styles:[`.slots[_ngcontent-%COMP%] {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 12px;
    }
    .slot[_ngcontent-%COMP%] {
      display: flex;
      flex-direction: column;
      border-radius: 20px;
      border: 1.5px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      padding: 14px;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .slot.filled[_ngcontent-%COMP%] {
      border-color: color-mix(in oklab, var(--%NS%v2-vert-pousse) 45%, transparent);
    }
    .slot.over[_ngcontent-%COMP%] {
      border-color: var(--%NS%v2-foret);
      background: var(--%NS%v2-sauge);
    }
    .ico[_ngcontent-%COMP%] {
      display: grid;
      height: 40px;
      width: 40px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-sauge);
      color: var(--%NS%v2-foret);
    }
    .filled[_ngcontent-%COMP%]   .ico[_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
    }
    .tag[_ngcontent-%COMP%] {
      border-radius: 999px;
      padding: 2px 8px;
      font-size: 11px;
      font-weight: 800;
      white-space: nowrap;
    }
    .drop[_ngcontent-%COMP%] {
      display: flex;
      margin-top: 12px;
      min-height: 52px;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border-radius: 14px;
      border: 1.5px dashed var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-creme);
      padding: 10px 12px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-foret);
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        background-color 0.15s ease;
    }
    .drop[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-foret);
    }
    .drop[_ngcontent-%COMP%]:focus-within {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .files[_ngcontent-%COMP%] {
      margin-top: 10px;
      display: grid;
      gap: 6px;
    }
    .file[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 10px;
      border-radius: 12px;
      background: var(--%NS%v2-creme);
      padding: 6px 6px 6px 10px;
      font-size: 13px;
    }
    .rm[_ngcontent-%COMP%] {
      display: grid;
      height: 28px;
      width: 28px;
      flex-shrink: 0;
      place-items: center;
      border-radius: 8px;
      color: var(--%NS%v2-ardoise);
      cursor: pointer;
    }
    .rm[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-erreur-bg);
      color: var(--%NS%v2-erreur-fg);
    }
    .rm[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
    }`]})}};function ml(e,t){if(e&1&&ce(0,`span`,5),e&2){let e=k(2);L(`bg-warning`,e.tone()===`warning`)(`bg-danger`,e.tone()===`danger`)}}function hl(e,t){if(e&1&&(c(0,`div`),K(1,ml,1,4,`span`,4),F(2),B()),e&2){let e=k();R(e.subClass()),I(),M(e.tone()===`neutral`?-1:1),I(),U(` `,e.sub(),` `)}}var gl=class e{constructor(){this.label=z.required(),this.value=z.required(),this.sub=z(void 0),this.tone=z(`neutral`),this.subClass=f(()=>ln(`mt-1.5 flex items-center gap-1.5 text-xs`,this.tone()===`warning`?`text-warning-fg`:this.tone()===`danger`?`text-danger-fg`:`text-muted-foreground`))}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-kpi-tile`]],inputs:{label:[1,`label`],value:[1,`value`],sub:[1,`sub`],tone:[1,`tone`]},decls:6,vars:3,consts:[[1,`surface`,`p-4`],[1,`text-xs`,`text-muted-foreground`],[1,`mt-1`,`text-2xl`,`font-semibold`,`tabular`],[3,`class`],[`aria-hidden`,`true`,1,`size-1.5`,`rounded-full`,3,`bg-warning`,`bg-danger`],[`aria-hidden`,`true`,1,`size-1.5`,`rounded-full`]],template:function(e,t){e&1&&(c(0,`div`,0)(1,`div`,1),F(2),B(),c(3,`div`,2),F(4),B(),K(5,hl,3,4,`div`,3),B()),e&2&&(I(2),G(t.label()),I(2),G(t.value()),I(),M(t.sub()?5:-1))},encapsulation:2})}},_l=[[[``,`actions`,``]]],vl=[`[actions]`];function yl(e,t){if(e&1&&(c(0,`div`,2),F(1),B()),e&2){let e=k();I(),G(e.eyebrow())}}function bl(e,t){if(e&1&&(c(0,`p`,4),F(1),B()),e&2){let e=k();I(),U(` `,e.description(),` `)}}var xl=class e{constructor(){this.eyebrow=z(void 0),this.title=z.required(),this.description=z(void 0)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-page-header`]],inputs:{eyebrow:[1,`eyebrow`],title:[1,`title`],description:[1,`description`]},ngContentSelectors:vl,decls:8,vars:3,consts:[[1,`mb-8`,`flex`,`flex-col`,`gap-5`,`md:flex-row`,`md:items-end`,`md:justify-between`],[1,`min-w-0`,`max-w-3xl`],[1,`eyebrow`,`mb-2`],[1,`text-2xl`,`font-semibold`,`tracking-tight`,`text-foreground`,`md:text-[1.75rem]`],[1,`mt-2`,`max-w-2xl`,`text-sm`,`leading-relaxed`,`text-muted-foreground`,`md:text-[0.9375rem]`],[1,`flex`,`shrink-0`,`flex-wrap`,`gap-2`]],template:function(e,t){e&1&&(pe(_l),c(0,`div`,0)(1,`div`,1),K(2,yl,2,1,`div`,2),c(3,`h1`,3),F(4),B(),K(5,bl,2,1,`p`,4),B(),c(6,`div`,5),h(7),B()()),e&2&&(I(2),M(t.eyebrow()?2:-1),I(2),U(` `,t.title(),` `),I(),M(t.description()?5:-1))},encapsulation:2})}},Sl=[10,25,50,100];function Cl(e,t={},n=10){let r=Math.min(Math.max(t.limit??n,1),200),i=Math.max(1,Math.ceil(e/r)),a=Math.min(Math.max(t.page??1,1),i);return{total:e,page:a,limit:r,pages:i,skip:(a-1)*r}}function wl(e,t={},n=10){let{skip:r,...i}=Cl(e.length,t,n);return{...i,items:e.slice(r,r+i.limit)}}function Tl(e,t={}){let n=new URLSearchParams;for(let[e,r]of Object.entries(t))r!==void 0&&r!==``&&n.set(e,String(r));let r=n.toString();return r?`${e}?${r}`:e}async function El(e){let t=[];for(let n=1;;n++){let r=await e({page:n,limit:200});if(t.push(...r.items),r.page>=r.pages)return t}}var Dl=[`trigger`],Ol=[`filterInput`],kl=[`panel`],Al=(e,t)=>t.value;function jl(e,t){e&1&&w(0,`ui-icon`,4),e&2&&A(`name`,t)(`size`,20)}function Ml(e,t){if(e&1&&w(0,`ui-icon`,5),e&2){let e=k();A(`name`,e.leadingIcon())(`size`,20)}}function Nl(e,t){if(e&1){let e=x();_(0,`label`,10),w(1,`ui-icon`,14),_(2,`input`,15,2),l(`input`,function(t){j(e);let n=k(2);return v(n.onQuery(t.target.value))})(`keydown`,function(t){j(e);let n=k(2);return v(n.onListKey(t))}),p()()}if(e&2){let e=k(2);I(),A(`size`,18),I(),A(`placeholder`,e.t()(`ui.select.search`))(`value`,e.query()),W(`aria-label`,e.t()(`ui.select.search`))(`aria-controls`,e.ids.list)}}function Pl(e,t){if(e&1&&w(0,`ui-icon`,17),e&2){let e=k().$implicit;A(`name`,e.icon)(`size`,19)}}function Fl(e,t){if(e&1&&(_(0,`span`,18),F(1),p()),e&2){let e=k().$implicit;I(),G(e.hint)}}function Il(e,t){e&1&&w(0,`ui-icon`,19),e&2&&A(`size`,18)}function Ll(e,t){if(e&1){let e=x();_(0,`li`,16),l(`mouseenter`,function(){let t=j(e).$index,n=k(2);return v(n.active.set(t))})(`click`,function(){let t=j(e).$implicit,n=k(2);return v(n.choose(t))}),K(1,Pl,1,2,`ui-icon`,17),_(2,`span`,6),F(3),p(),K(4,Fl,2,1,`span`,18),K(5,Il,1,1,`ui-icon`,19),p()}if(e&2){let e=t.$implicit,n=t.$index,r=k(2);L(`active`,n===r.active())(`selected`,e.value===r.value()),A(`id`,r.ids.option+n),W(`aria-selected`,e.value===r.value()),I(),M(e.icon?1:-1),I(2),G(e.label),I(),M(e.hint?4:-1),I(),M(e.value===r.value()?5:-1)}}function Rl(e,t){if(e&1&&(_(0,`li`,13),F(1),p()),e&2){let e=k(2);I(),G(e.t()(`ui.select.empty`))}}function zl(e,t){if(e&1){let e=x();_(0,`div`,9,1),K(2,Nl,4,5,`label`,10),_(3,`ul`,11),l(`keydown`,function(t){j(e);let n=k();return v(n.onListKey(t))}),P(4,Ll,6,10,`li`,12,Al,!1,Rl,2,1,`li`,13),p()()}if(e&2){let e=k();V(`left`,e.place().left,`px`)(`width`,e.place().width,`px`)(`top`,e.place().top,`px`)(`bottom`,e.place().bottom,`px`)(`max-height`,e.place().maxHeight,`px`),I(2),M(e.searchable()?2:-1),I(),A(`id`,e.ids.list),W(`aria-labelledby`,e.ids.trigger)(`aria-activedescendant`,e.activeId()),I(),s(e.visible())}}var Bl=0,Vl=class e{constructor(){this.options=z.required(),this.value=z(``),this.label=z(``),this.placeholder=z(``),this.leadingIcon=z(null),this.variant=z(`default`),this.align=z(`left`),this.drop=z(`down`),this.searchFrom=z(8),this.valueChange=S(),this.t=q(it).t,this.host=q(me),this.destroyRef=q(fe),this.triggerRef=ae(`trigger`),this.filterRef=ae(`filterInput`),this.uid=Bl++,this.ids={trigger:`sel-${this.uid}`,list:`sel-${this.uid}-list`,option:`sel-${this.uid}-opt-`},this.open=m(!1),this.place=m({left:0,width:240,top:0,bottom:null,maxHeight:340}),this.panelRef=ae(`panel`),this.query=m(``),this.active=m(0),this.current=f(()=>this.options().find(e=>e.value===this.value())),this.searchable=f(()=>this.options().length>=this.searchFrom()),this.visible=f(()=>{let e=e=>e.normalize(`NFD`).replace(/[̀-ͯ]/g,``).toLowerCase(),t=e(this.query().trim());return t?this.options().filter(n=>e(n.label).includes(t)):this.options()}),this.activeId=f(()=>this.open()&&this.visible().length?this.ids.option+this.active():null),Ee(()=>{let e=e=>this.onScroll(e);window.addEventListener(`scroll`,e,!0),this.destroyRef.onDestroy(()=>window.removeEventListener(`scroll`,e,!0))}),re(()=>{this.open()&&b(()=>{let e=this.visible().findIndex(e=>e.value===this.value());this.active.set(Math.max(0,e)),queueMicrotask(()=>this.filterRef()?.nativeElement.focus({preventScroll:!0}))})})}toggle(){this.open()||this.measure(),this.open.update(e=>!e),this.open()||this.query.set(``)}measure(){let e=this.triggerRef()?.nativeElement;if(!e||typeof window>`u`)return;let t=e.getBoundingClientRect(),n=window.innerHeight-t.bottom-8-12,r=t.top-8-12,i=this.drop()===`up`?r>=160||r>n:n<240&&r>n,a=Math.max(t.width,240),o=Math.min(Math.max(12,this.align()===`right`?t.right-a:t.left),window.innerWidth-a-12);this.place.set({left:o,width:a,top:i?null:t.bottom+8,bottom:i?window.innerHeight-t.top+8:null,maxHeight:Math.max(160,Math.min(360,i?r:n))}),requestAnimationFrame(()=>this.correct())}correct(){let e=this.panelRef()?.nativeElement;if(!e)return;let t=this.place(),n=e.getBoundingClientRect(),r=n.left-t.left,i=t.top===null?n.bottom-(window.innerHeight-(t.bottom??0)):n.top-t.top;Math.abs(r)<1&&Math.abs(i)<1||this.place.set({...t,left:t.left-r,top:t.top===null?null:t.top-i,bottom:t.bottom===null?null:t.bottom+i})}onScroll(e){if(!this.open())return;let t=this.panelRef()?.nativeElement;t&&e.target instanceof Node&&t.contains(e.target)||this.close(!1)}choose(e){this.valueChange.emit(e.value),this.close(!0)}onQuery(e){this.query.set(e),this.active.set(0)}onTriggerKey(e){!this.open()&&(e.key===`ArrowDown`||e.key===`ArrowUp`)?(e.preventDefault(),this.measure(),this.open.set(!0)):this.open()&&this.onListKey(e)}onListKey(e){let t=this.visible().length;switch(e.key){case`ArrowDown`:e.preventDefault(),t&&this.active.update(e=>(e+1)%t);break;case`ArrowUp`:e.preventDefault(),t&&this.active.update(e=>(e-1+t)%t);break;case`Home`:e.preventDefault(),this.active.set(0);break;case`End`:e.preventDefault(),this.active.set(Math.max(0,t-1));break;case`Enter`:{e.preventDefault();let t=this.visible()[this.active()];t&&this.choose(t);break}case`Escape`:e.preventDefault(),this.close(!0);break;case`Tab`:this.close(!1)}}onDocumentClick(e){this.open()&&!this.host.nativeElement.contains(e.target)&&this.close(!1)}close(e){this.open.set(!1),this.query.set(``),e&&this.triggerRef()?.nativeElement.focus()}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-select`]],viewQuery:function(e,t){e&1&&Xe(t.triggerRef,Dl,5)(t.filterRef,Ol,5)(t.panelRef,kl,5),e&2&&ge(3)},hostAttrs:[1,`relative`,`block`],hostBindings:function(e,t){e&1&&l(`click`,function(e){return t.onDocumentClick(e)},ze)(`resize`,function(){return t.close(!1)},ke)},inputs:{options:[1,`options`],value:[1,`value`],label:[1,`label`],placeholder:[1,`placeholder`],leadingIcon:[1,`leadingIcon`],variant:[1,`variant`],align:[1,`align`],drop:[1,`drop`],searchFrom:[1,`searchFrom`]},outputs:{valueChange:`valueChange`},decls:9,vars:16,consts:[[`trigger`,``],[`panel`,``],[`filterInput`,``],[`type`,`button`,`aria-haspopup`,`listbox`,1,`trigger`,3,`click`,`keydown`,`id`],[2,`color`,`var(--v2-foret)`,3,`name`,`size`],[2,`color`,`var(--v2-gris-texte)`,3,`name`,`size`],[1,`min-w-0`,`flex-1`,`truncate`],[`name`,`keyboard_arrow_down`,1,`chevron`,3,`size`],[1,`panel`,`floating`,3,`left`,`width`,`top`,`bottom`,`max-height`],[1,`panel`,`floating`],[1,`filter`],[`role`,`listbox`,`tabindex`,`-1`,1,`list`,3,`keydown`,`id`],[`role`,`option`,1,`option`,3,`id`,`active`,`selected`],[1,`empty`],[`name`,`search`,3,`size`],[`type`,`text`,3,`input`,`keydown`,`placeholder`,`value`],[`role`,`option`,1,`option`,3,`mouseenter`,`click`,`id`],[3,`name`,`size`],[1,`hint`],[`name`,`check`,3,`size`]],template:function(e,t){if(e&1&&(_(0,`div`)(1,`button`,3,0),l(`click`,function(){return t.toggle()})(`keydown`,function(e){return t.onTriggerKey(e)}),K(3,jl,1,2,`ui-icon`,4)(4,Ml,1,2,`ui-icon`,5),_(5,`span`,6),F(6),p(),w(7,`ui-icon`,7),p(),K(8,zl,7,15,`div`,8),p()),e&2){let e;L(`compact`,t.variant()===`compact`)(`open`,t.open()),I(),L(`open`,t.open()),A(`id`,t.ids.trigger),W(`aria-expanded`,t.open())(`aria-controls`,t.ids.list)(`aria-label`,t.label()?t.label()+` : `+(t.current()?.label??(t.placeholder()||t.t()(`ui.select.placeholder`))):null),I(2),M((e=t.current()?.icon)?3:t.leadingIcon()?4:-1,e),I(2),V(`color`,t.current()?null:`var(--v2-gris-texte)`),I(),U(` `,t.current()?.label??(t.placeholder()||t.t()(`ui.select.placeholder`)),` `),I(),A(`size`,22),I(),M(t.open()?8:-1)}},dependencies:[i],styles:[`.trigger[_ngcontent-%COMP%] {
      display: flex;
      height: 52px;
      width: 100%;
      align-items: center;
      gap: 10px;
      border-radius: 16px;
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      padding: 0 12px 0 16px;
      text-align: left;
      font-size: 15px;
      font-weight: 600;
      color: var(--%NS%v2-encre);
      cursor: pointer;
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    .trigger[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .trigger[_ngcontent-%COMP%]:focus-visible, 
   .trigger.open[_ngcontent-%COMP%] {
      outline: none;
      border: 2px solid var(--%NS%v2-foret);
      padding-left: 15.5px;
      box-shadow: var(--%NS%v2-halo);
    }
    .compact[_ngcontent-%COMP%]   .trigger[_ngcontent-%COMP%] {
      height: 48px;
      border-radius: 14px;
      border-color: transparent;
      background: var(--%NS%v2-creme);
    }
    .chevron[_ngcontent-%COMP%] {
      color: var(--%NS%v2-gris-texte);
      transition: transform 0.2s ease;
    }
    .open[_ngcontent-%COMP%]   .chevron[_ngcontent-%COMP%] {
      transform: rotate(180deg);
    }
    .panel[_ngcontent-%COMP%] {
      position: absolute;
      left: 0;
      right: 0;
      top: calc(100% + 8px);
      z-index: 70;
      min-width: 240px;
      border-radius: 18px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
      padding: 6px;
      box-shadow: var(--%NS%v2-ombre-modale);
      animation: _ngcontent-%COMP%_drop 0.16s ease both;
    }
    .panel.right[_ngcontent-%COMP%] {
      left: auto;
    }
    
    .panel.up[_ngcontent-%COMP%] {
      top: auto;
      bottom: calc(100% + 8px);
    }
    @keyframes _ngcontent-%COMP%_drop {
      from {
        opacity: 0;
        transform: translateY(-4px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .filter[_ngcontent-%COMP%] {
      display: flex;
      height: 42px;
      align-items: center;
      gap: 8px;
      margin-bottom: 4px;
      border-radius: 12px;
      background: var(--%NS%v2-creme);
      padding: 0 12px;
      color: var(--%NS%v2-gris-texte);
    }
    .filter[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {
      min-width: 0;
      flex: 1;
      background: transparent;
      font-size: 14px;
      font-weight: 600;
      color: var(--%NS%v2-encre);
      outline: none;
    }
    
    .panel.floating[_ngcontent-%COMP%] {
      position: fixed;
      right: auto;
      bottom: auto;
      top: auto;
      display: flex;
      flex-direction: column;
    }
    .panel.floating[_ngcontent-%COMP%]   .list[_ngcontent-%COMP%] {
      max-height: none;
      min-height: 0;
      flex: 1;
    }
    .list[_ngcontent-%COMP%] {
      max-height: 280px;
      overflow-y: auto;
      overscroll-behavior: contain;
    }
    .option[_ngcontent-%COMP%] {
      display: flex;
      min-height: 44px;
      align-items: center;
      gap: 10px;
      border-radius: 12px;
      padding: 8px 10px;
      font-size: 14px;
      font-weight: 600;
      color: var(--%NS%v2-ardoise);
      cursor: pointer;
    }
    .option.active[_ngcontent-%COMP%] {
      background: var(--%NS%v2-sauge);
      color: var(--%NS%v2-encre);
    }
    .option.selected[_ngcontent-%COMP%] {
      color: var(--%NS%v2-foret);
      font-weight: 800;
    }
    .hint[_ngcontent-%COMP%] {
      border-radius: 999px;
      padding: 1px 8px;
      font-size: 12px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-gris-texte);
    }
    .empty[_ngcontent-%COMP%] {
      padding: 12px;
      font-size: 13px;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    @media (prefers-reduced-motion: reduce) {
      .panel[_ngcontent-%COMP%] {
        animation: none;
      }
      .chevron[_ngcontent-%COMP%] {
        transition: none;
      }
    }`]})}},Hl=e=>({page:e}),Ul=(e,t)=>t.kind===`page`?t.page:t.key;function Wl(e,t){if(e&1){let e=x();_(0,`button`,9),l(`click`,function(){j(e);let t=k().$implicit,n=k(2);return v(n.pager().setPage(t.page))}),F(1),p()}if(e&2){let e=k().$implicit,t=k(2),n=_e(0);W(`aria-current`,e.page===n.page?`page`:null)(`aria-label`,t.t()(`common.pager.page`,y(3,Hl,e.page))),I(),U(` `,e.page,` `)}}function Gl(e,t){e&1&&(_(0,`span`,8),F(1,`…`),p())}function Kl(e,t){if(e&1&&K(0,Wl,2,5,`button`,7)(1,Gl,2,0,`span`,8),e&2){let e=t.$implicit;M(e.kind===`page`?0:1)}}function ql(e,t){if(e&1){let e=x();_(0,`nav`,0)(1,`p`,1)(2,`b`),F(3),p(),F(4),_(5,`b`),F(6),p()(),_(7,`div`,2)(8,`button`,3),l(`click`,function(){j(e);let t=k(),n=_e(0);return v(t.pager().setPage(n.page-1))}),w(9,`ui-icon`,4),p(),P(10,Kl,2,1,null,null,Ul),_(12,`button`,3),l(`click`,function(){j(e);let t=k(),n=_e(0);return v(t.pager().setPage(n.page+1))}),w(13,`ui-icon`,5),p()(),_(14,`ui-select`,6),l(`valueChange`,function(t){j(e);let n=k();return v(n.pager().setSize(+t))}),p()()}if(e&2){let e=k(),t=_e(0);W(`aria-label`,e.t()(`common.pager.label`)),I(3),Oe(``,e.from(),`–`,e.to()),I(),U(` `,e.t()(`common.pager.of`),` `),I(2),G(t.total),I(2),A(`disabled`,t.page<=1),W(`aria-label`,e.t()(`common.pager.prev`)),I(),A(`size`,20),I(),s(e.slots()),I(2),A(`disabled`,t.page>=t.pages),W(`aria-label`,e.t()(`common.pager.next`)),I(),A(`size`,20),I(),A(`label`,e.t()(`common.pager.size`))(`options`,e.sizeOptions())(`value`,``+t.limit)}}var Jl=class e{constructor(){this.pager=z.required(),this.sizes=z(Sl),this.t=q(it).t,this.minSize=f(()=>Math.min(...this.sizes())),this.from=f(()=>{let e=this.pager().result();return e.total===0?0:(e.page-1)*e.limit+1}),this.to=f(()=>{let e=this.pager().result();return Math.min(e.page*e.limit,e.total)}),this.sizeOptions=f(()=>this.sizes().map(e=>({value:String(e),label:this.t()(`common.pager.sizeOption`,{size:e})}))),this.slots=f(()=>{let{page:e,pages:t}=this.pager().result(),n=new Set([1,t,e-1,e,e+1].filter(e=>e>=1&&e<=t));(n.has(3)||e<=3)&&n.add(2),(n.has(t-2)||e>=t-2)&&n.add(t-1);let r=[...n].filter(e=>e>=1&&e<=t).sort((e,t)=>e-t),i=[];return r.forEach((e,t)=>{t>0&&e-r[t-1]>1&&i.push({kind:`gap`,key:`gap-${e}`}),i.push({kind:`page`,page:e})}),i})}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-pagination`]],hostAttrs:[1,`block`],inputs:{pager:[1,`pager`],sizes:[1,`sizes`]},decls:2,vars:2,consts:[[1,`bar`],[`aria-live`,`polite`,1,`range`],[1,`nav`],[`type`,`button`,1,`btn`,3,`click`,`disabled`],[`name`,`chevron_left`,3,`size`],[`name`,`chevron_right`,3,`size`],[`variant`,`compact`,`align`,`right`,`drop`,`up`,1,`size`,3,`valueChange`,`label`,`options`,`value`],[`type`,`button`,1,`btn`],[`aria-hidden`,`true`,1,`gap`],[`type`,`button`,1,`btn`,3,`click`]],template:function(e,t){if(e&1&&(Ze(0),K(1,ql,15,14,`nav`,0)),e&2){let e=xe(t.pager().result());I(),M(e.total>t.minSize()?1:-1)}},dependencies:[i,Vl],styles:[`.bar[_ngcontent-%COMP%] {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      padding-top: 16px;
    }
    .range[_ngcontent-%COMP%] {
      font-size: 13px;
      font-weight: 600;
      color: var(--%NS%v2-gris-texte);
      font-variant-numeric: tabular-nums;
    }
    .range[_ngcontent-%COMP%]   b[_ngcontent-%COMP%] {
      color: var(--%NS%v2-encre);
      font-weight: 800;
    }
    .nav[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .btn[_ngcontent-%COMP%] {
      display: grid;
      min-width: 38px;
      height: 38px;
      place-items: center;
      border-radius: 12px;
      padding: 0 8px;
      font-size: 14px;
      font-weight: 700;
      font-variant-numeric: tabular-nums;
      color: var(--%NS%v2-ardoise);
      cursor: pointer;
      transition:
        background-color 0.15s ease,
        color 0.15s ease;
    }
    .btn[_ngcontent-%COMP%]:hover:not(:disabled):not([aria-current]) {
      background: var(--%NS%v2-creme);
      color: var(--%NS%v2-encre);
    }
    .btn[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    .btn[_ngcontent-%COMP%]:disabled {
      cursor: not-allowed;
      opacity: 0.35;
    }
    .btn[aria-current][_ngcontent-%COMP%] {
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-citron);
      cursor: default;
    }
    .gap[_ngcontent-%COMP%] {
      min-width: 24px;
      text-align: center;
      color: var(--%NS%v2-gris-texte);
    }
    .size[_ngcontent-%COMP%] {
      width: 150px;
    }`]})}},Yl=(e,t)=>({current:e,total:t}),Xl=(e,t)=>t.src;function Zl(e,t){if(e&1&&ce(0,`img`,2),e&2){let e=t.$implicit,n=t.$index,r=k();V(`object-position`,e.position),L(`active`,n===r.index()),C(`src`,e.src),W(`fetchpriority`,n===0?`high`:`low`)(`loading`,n===0?`eager`:`lazy`)}}function Ql(e,t){if(e&1){let e=x();c(0,`button`,4),Me(`click`,function(){let t=j(e).$index,n=k(2);return v(n.goTo(t))}),B()}if(e&2){let e=t.$index,n=k(2);L(`active`,e===n.index()),W(`aria-label`,n.t()(`ui.slideshow.goTo`,Re(4,Yl,e+1,n.photos().length)))(`aria-current`,e===n.index()||null)}}function $l(e,t){if(e&1&&(c(0,`div`,1),P(1,Ql,1,7,`button`,3,Xl),B()),e&2){let e=k();I(),s(e.photos())}}var eu=class e{constructor(){this.photos=z.required(),this.interval=z(7e3),this.t=q(it).t,this.index=m(0),this.document=q(Je);let e=q(fe);Ee(()=>{if(this.document.defaultView?.matchMedia(`(prefers-reduced-motion: reduce)`).matches)return;this.start();let t=()=>this.document.hidden?this.stop():this.start();this.document.addEventListener(`visibilitychange`,t),e.onDestroy(()=>{this.stop(),this.document.removeEventListener(`visibilitychange`,t)})})}goTo(e){this.index.set(e),this.timer&&(this.stop(),this.start())}start(){this.stop(),this.timer=setInterval(()=>this.index.update(e=>(e+1)%this.photos().length),this.interval())}stop(){clearInterval(this.timer),this.timer=void 0}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-photo-slideshow`]],hostAttrs:[1,`block`,`overflow-hidden`],inputs:{photos:[1,`photos`],interval:[1,`interval`]},decls:3,vars:1,consts:[[`alt`,``,`decoding`,`async`,1,`slide`,3,`active`,`src`,`object-position`],[1,`absolute`,`bottom-5`,`right-6`,`z-10`,`flex`,`items-center`,`gap-2`],[`alt`,``,`decoding`,`async`,1,`slide`,3,`src`],[`type`,`button`,1,`dot`,3,`active`],[`type`,`button`,1,`dot`,3,`click`]],template:function(e,t){e&1&&(P(0,Zl,1,7,`img`,0,Xl),K(2,$l,3,0,`div`,1)),e&2&&(s(t.photos()),I(2),M(t.photos().length>1?2:-1))},styles:[`.slide[_ngcontent-%COMP%] {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      opacity: 0;
      transform: scale(1.06);
      transition:
        opacity 1.4s ease,
        transform 9s linear;
    }
    .slide.active[_ngcontent-%COMP%] {
      opacity: 1;
      transform: scale(1);
    }
    .dot[_ngcontent-%COMP%] {
      height: 6px;
      width: 6px;
      border-radius: 999px;
      cursor: pointer;
      background: color-mix(in oklab, var(--%NS%v2-blanc, #fff) 45%, transparent);
      transition:
        width 0.3s ease,
        background-color 0.3s ease;
    }
    .dot.active[_ngcontent-%COMP%] {
      width: 22px;
      background: var(--%NS%v2-blanc, #fff);
    }
    .dot[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-blanc, #fff);
      outline-offset: 3px;
    }
    @media (prefers-reduced-motion: reduce) {
      .slide[_ngcontent-%COMP%] {
        transition: opacity 0.3s ease;
        transform: none;
      }
      .slide.active[_ngcontent-%COMP%] {
        transform: none;
      }
    }`]})}},tu=[`*`],nu={success:`bg-success-bg text-success-fg`,warning:`bg-warning-bg text-warning-fg`,danger:`bg-danger-bg text-danger-fg`,info:`bg-info-bg text-info-fg`,neutral:`bg-muted text-muted-foreground border border-border`,brand:`bg-primary-soft text-primary`,ochre:`bg-ochre-soft text-ochre-text`},ru={success:`bg-success`,warning:`bg-warning`,danger:`bg-danger`,info:`bg-info`,neutral:`bg-border-strong`,brand:`bg-primary`,ochre:`bg-ochre`},iu={validé:`success`,"à vérifier":`warning`,doublon:`info`,invalide:`danger`},au=class e{constructor(){this.tone=z(`neutral`),this.className=z(``,{alias:`class`}),this.classes=f(()=>ln(`inline-flex items-center gap-1.5 max-w-full whitespace-normal sm:whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold`,nu[this.tone()],this.className())),this.dotClass=f(()=>ln(`size-1.5 shrink-0 rounded-full`,ru[this.tone()]))}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-pill`]],inputs:{tone:[1,`tone`],className:[1,`class`,`className`]},ngContentSelectors:tu,decls:3,vars:4,consts:[[`aria-hidden`,`true`]],template:function(e,t){e&1&&(pe(),c(0,`span`),ce(1,`span`,0),h(2),B()),e&2&&(R(t.classes()),I(),R(t.dotClass()))},encapsulation:2})}};(class e{constructor(){this.q=z.required(),this.tone=f(()=>iu[this.q()])}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-quality-pill`]],inputs:{q:[1,`q`]},decls:2,vars:2,consts:[[3,`tone`]],template:function(e,t){e&1&&(_(0,`ui-pill`,0),F(1),p()),e&2&&(A(`tone`,t.tone()),I(),G(t.q()))},dependencies:[au],encapsulation:2})}});var ou=[`panel`],su=[`*`,[[``,`sheetFooter`,``]]],cu=[`*`,`[sheetFooter]`];function lu(e,t){if(e&1){let e=x();_(0,`div`,1)(1,`div`,2),l(`click`,function(){j(e);let t=k();return v(t.close())}),p(),_(2,`div`,3,0)(4,`div`,4)(5,`h2`,5),F(6),p(),_(7,`button`,6),l(`click`,function(){j(e);let t=k();return v(t.close())}),w(8,`lucide-angular`,7),p()(),_(9,`div`,8),h(10),p(),_(11,`div`,9),h(12,1),p()()()}if(e&2){let e=k();I(2),R(e.panelClasses()),W(`aria-labelledby`,e.titleId),I(3),A(`id`,e.titleId),I(),U(` `,e.title(),` `),I(),W(`aria-label`,e.t()(`common.close`)),I(),A(`img`,e.icons.x)}}(class n{constructor(){this.open=Ae(!1),this.title=z.required(),this.side=z(`right`),this.closed=S(),this.locale=q(it),this.t=this.locale.t,this.titleId=`sheet-${Math.random().toString(36).slice(2,9)}`,this.icons={x:ut},this.panel=ae(`panel`),this.previous=null,this.locked=!1,re(()=>{this.open()?(this.previous=document.activeElement instanceof HTMLElement?document.activeElement:null,this.locked||=(a(),!0),setTimeout(()=>{let t=this.panel()?.nativeElement;t&&e(t)},0)):this.release()})}onKeydown(e){if(!this.open())return;if(e.key===`Escape`){e.preventDefault(),this.close();return}let t=this.panel()?.nativeElement;t&&o(t,e)}panelClasses(){let e=this.side();return e===`bottom`?`inset-x-0 bottom-0 max-h-[90vh] w-full rounded-t-xl border-t mbay-animate-sheet-panel-bottom`:e===`left`?`inset-y-0 left-0 h-full w-full max-w-[min(100%,24rem)] border-r mbay-animate-sheet-panel-left`:`inset-y-0 right-0 h-full w-full max-w-[min(100%,24rem)] border-l mbay-animate-sheet-panel-right`}close(){this.open.set(!1),this.closed.emit()}release(){this.locked&&=(t(),!1),this.previous?.focus({preventScroll:!0}),this.previous=null}static{this.ɵfac=function(e){return new(e||n)}}static{this.ɵcmp=O({type:n,selectors:[[`ui-sheet`]],viewQuery:function(e,t){e&1&&Xe(t.panel,ou,5),e&2&&ge()},hostBindings:function(e,t){e&1&&l(`keydown`,function(e){return t.onKeydown(e)},ze)},inputs:{open:[1,`open`],title:[1,`title`],side:[1,`side`]},outputs:{open:`openChange`,closed:`closed`},ngContentSelectors:cu,decls:1,vars:1,consts:[[`panel`,``],[`role`,`presentation`,1,`fixed`,`inset-0`,`z-50`,`md:hidden`],[`aria-hidden`,`true`,1,`absolute`,`inset-0`,`bg-black/80`,`mbay-animate-sheet-overlay`,3,`click`],[`role`,`dialog`,`aria-modal`,`true`,`tabindex`,`-1`,1,`absolute`,`flex`,`max-h-[95vh]`,`flex-col`,`bg-background`,`shadow-lg`],[1,`flex`,`items-start`,`justify-between`,`gap-3`,`border-b`,`px-4`,`py-3`,`sm:px-6`],[1,`text-lg`,`font-semibold`,`text-foreground`,3,`id`],[`type`,`button`,1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-md`,`text-muted-foreground`,`hover:bg-muted`,`hover:text-foreground`,`focus-visible:outline-none`,`focus-visible:ring-2`,`focus-visible:ring-ring`,`pointer-coarse:size-10`,3,`click`],[1,`size-4`,3,`img`],[1,`min-h-0`,`flex-1`,`overflow-y-auto`,`px-4`,`py-4`,`sm:px-6`],[1,`border-t`,`px-4`,`py-4`,`sm:px-6`]],template:function(e,t){e&1&&(pe(su),K(0,lu,13,7,`div`,1)),e&2&&M(t.open()?0:-1)},dependencies:[ct,at],encapsulation:2})}});var uu=(e,t)=>t.label;function du(e,t){if(e&1&&(_(0,`div`,2)(1,`span`,3),w(2,`ui-icon`,4),p(),_(3,`div`,5)(4,`span`,6),F(5),p(),_(6,`span`,7),w(7,`ui-icon`,4),p()(),_(8,`span`,8),F(9),p(),_(10,`span`,9),F(11),p()()),e&2){let e=t.$implicit,n=t.$index;V(`background`,n===0?`var(--v2-foret)`:e.bg)(`color`,n===0?`var(--v2-blanc)`:e.fg),I(),V(`color`,n===0?`var(--v2-citron)`:e.fg),I(),A(`name`,e.icon)(`size`,120),I(2),V(`opacity`,n===0?.8:1),I(),G(e.label),I(),V(`background`,n===0?`var(--v2-citron)`:e.fg)(`color`,n===0?`var(--v2-foret)`:e.bg),I(),A(`name`,e.icon)(`size`,20),I(2),G(e.value),I(),V(`opacity`,.75),I(),G(e.sub)}}var fu=class e{constructor(){this.stats=z.required()}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-stat-cards`]],hostAttrs:[1,`block`],inputs:{stats:[1,`stats`]},decls:3,vars:2,consts:[[1,`grid`,`grid-cols-1`,`gap-4`,`sm:grid-cols-2`,`xl:grid-cols-4`],[1,`stat`,`flex`,`flex-col`,`p-5`,3,`background`,`color`],[1,`stat`,`flex`,`flex-col`,`p-5`],[`aria-hidden`,`true`,1,`watermark`],[3,`name`,`size`],[1,`relative`,`flex`,`items-center`,`justify-between`,`gap-3`],[1,`text-[14px]`,`font-bold`],[1,`grid`,`size-10`,`place-items-center`,`rounded-[12px]`],[1,`relative`,`mt-3`,`text-[34px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`relative`,`mt-2`,`text-[13px]`,`font-medium`,`leading-snug`]],template:function(e,t){e&1&&(_(0,`div`,0),P(1,du,12,21,`div`,1,uu),p()),e&2&&(L(`five`,t.stats().length===5),I(),s(t.stats()))},dependencies:[i],styles:[`.stat[_ngcontent-%COMP%] {
      position: relative;
      overflow: hidden;
      border-radius: 24px;
      border: 1px solid transparent;
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .stat[_ngcontent-%COMP%]:hover {
      transform: translateY(-2px);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .watermark[_ngcontent-%COMP%] {
      pointer-events: none;
      position: absolute;
      right: -18px;
      bottom: -26px;
      opacity: 0.12;
      transform: rotate(-12deg);
      transition: transform 0.35s ease;
    }
    .stat[_ngcontent-%COMP%]:hover   .watermark[_ngcontent-%COMP%] {
      transform: rotate(-4deg) scale(1.06);
    }
    
    @media (min-width: 1280px) {
      .five[_ngcontent-%COMP%] {
        grid-template-columns: repeat(5, minmax(0, 1fr));
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .stat[_ngcontent-%COMP%], 
   .watermark[_ngcontent-%COMP%] {
        transition: none;
      }
    }`]})}};(class e{constructor(){this.title=z.required(),this.description=z(``),this.hint=z(`Écran en cours de portage Angular — structure et droits alignés sur React ; contenu détail à suivre.`)}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-stub-page`]],inputs:{title:[1,`title`],description:[1,`description`],hint:[1,`hint`]},decls:3,vars:3,consts:[[3,`title`,`description`],[1,`surface`,`p-6`,`text-sm`,`text-muted-foreground`]],template:function(e,t){e&1&&(w(0,`ui-page-header`,0),_(1,`div`,1),F(2),p()),e&2&&(A(`title`,t.title())(`description`,t.description()),I(2),U(` `,t.hint(),` `))},dependencies:[xl],encapsulation:2})}});var pu=[`field`];function mu(e,t){if(e&1&&(_(0,`span`,2),F(1),p()),e&2){let e=k();I(),G(e.optional())}}function hu(e,t){e&1&&(_(0,`span`,4),w(1,`ui-icon`,8),p()),e&2&&(I(),A(`name`,t)(`size`,20))}function gu(e,t){if(e&1&&(_(0,`p`,6),w(1,`ui-icon`,9),F(2),p()),e&2){let e=k();A(`id`,e.errorId),I(),A(`size`,16),I(),G(e.error())}}function _u(e,t){if(e&1&&(_(0,`p`,7),F(1),p()),e&2){let e=k();A(`id`,e.hintId),I(),G(e.hint())}}var vu=0,yu=class e{constructor(){this.label=z.required(),this.value=z(``),this.placeholder=z(``),this.type=z(null),this.hint=z(``),this.error=z(``),this.optional=z(``),this.icon=z(null),this.autocomplete=z(``),this.inputmode=z(``),this.maxlength=z(null),this.preset=z(null),this.valueChange=S(),this.t=q(it).t,this.eff=f(()=>{let e=this.preset()?tl[this.preset()]:null;return{type:this.type()??e?.type??`text`,placeholder:this.placeholder()||(e?this.t()(e.placeholder):``),icon:this.icon()??e?.icon??null,autocomplete:this.autocomplete()||e?.autocomplete||``,inputmode:this.inputmode()||e?.inputmode||``,maxlength:this.maxlength()??e?.maxlength??null}}),this.uid=vu++,this.inputId=`tf-${this.uid}`,this.hintId=`tf-${this.uid}-hint`,this.errorId=`tf-${this.uid}-error`,this.describedBy=f(()=>this.error()?this.errorId:this.hint()?this.hintId:null),this.field=ae(`field`)}focus(){this.field()?.nativeElement.focus()}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=O({type:e,selectors:[[`ui-text-field`]],viewQuery:function(e,t){e&1&&Xe(t.field,pu,5),e&2&&ge()},hostAttrs:[1,`block`],inputs:{label:[1,`label`],value:[1,`value`],placeholder:[1,`placeholder`],type:[1,`type`],hint:[1,`hint`],error:[1,`error`],optional:[1,`optional`],icon:[1,`icon`],autocomplete:[1,`autocomplete`],inputmode:[1,`inputmode`],maxlength:[1,`maxlength`],preset:[1,`preset`]},outputs:{valueChange:`valueChange`},decls:9,vars:16,consts:[[`field`,``],[1,`label`,3,`for`],[1,`optional`],[1,`box`],[`aria-hidden`,`true`,1,`icon`],[3,`input`,`id`,`type`,`placeholder`,`value`],[`role`,`alert`,1,`error`,3,`id`],[1,`hint`,3,`id`],[3,`name`,`size`],[`name`,`warning`,3,`size`]],template:function(e,t){if(e&1&&(_(0,`label`,1),F(1),K(2,mu,2,1,`span`,2),p(),_(3,`div`,3),K(4,hu,2,2,`span`,4),_(5,`input`,5,0),l(`input`,function(e){return t.valueChange.emit(e.target.value)}),p()(),K(7,gu,3,3,`p`,6)(8,_u,2,2,`p`,7)),e&2){let e;A(`for`,t.inputId),I(),U(` `,t.label(),` `),I(),M(t.optional()?2:-1),I(2),M((e=t.eff().icon)?4:-1,e),I(),L(`with-icon`,!!t.eff().icon),A(`id`,t.inputId)(`type`,t.eff().type)(`placeholder`,t.eff().placeholder)(`value`,t.value()),W(`autocomplete`,t.eff().autocomplete||null)(`inputmode`,t.eff().inputmode||null)(`maxlength`,t.eff().maxlength||null)(`aria-invalid`,t.error()?!0:null)(`aria-describedby`,t.describedBy()),I(2),M(t.error()?7:t.hint()?8:-1)}},dependencies:[i],styles:[`.label[_ngcontent-%COMP%] {
      display: flex;
      align-items: baseline;
      gap: 6px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--%NS%v2-ardoise);
    }
    .optional[_ngcontent-%COMP%] {
      text-transform: none;
      letter-spacing: 0;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    .box[_ngcontent-%COMP%] {
      position: relative;
      margin-top: 8px;
    }
    .icon[_ngcontent-%COMP%] {
      pointer-events: none;
      position: absolute;
      inset: 0 auto 0 0;
      display: grid;
      width: 48px;
      place-items: center;
      color: var(--%NS%v2-gris-texte);
    }
    input[_ngcontent-%COMP%] {
      height: 52px;
      width: 100%;
      border-radius: 16px;
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      padding: 0 16px;
      font-size: 15px;
      font-weight: 600;
      color: var(--%NS%v2-encre);
      transition:
        border-color 0.15s ease,
        box-shadow 0.15s ease;
    }
    input.with-icon[_ngcontent-%COMP%] {
      padding-left: 48px;
    }
    input[_ngcontent-%COMP%]::placeholder {
      color: var(--%NS%v2-gris-texte);
      font-weight: 500;
      opacity: 0.8;
    }
    input[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    input[_ngcontent-%COMP%]:focus-visible {
      outline: none;
      border: 2px solid var(--%NS%v2-foret);
      box-shadow: var(--%NS%v2-halo);
    }
    input[aria-invalid="true"][_ngcontent-%COMP%] {
      border: 2px solid var(--%NS%v2-erreur-fg);
    }
    .hint[_ngcontent-%COMP%] {
      margin-top: 6px;
      font-size: 13px;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    .error[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 6px;
      font-size: 13px;
      font-weight: 700;
      color: var(--%NS%v2-erreur-fg);
    }`]})}};export{pn as A,jr as C,In as D,Xn as E,kn as O,Or as S,rr as T,Xa as _,Jl as a,go as b,wl as c,gl as d,pl as f,Ia as g,vo as h,eu as i,ln as j,_n as k,Tl as l,Jr as m,fu as n,Vl as o,el as p,au as r,El as s,yu as t,xl as u,lo as v,Mr as w,Rr as x,co as y};