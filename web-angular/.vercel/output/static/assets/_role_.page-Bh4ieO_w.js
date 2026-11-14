import{$t as e,F as t,Ft as n,It as r,Kn as i,Kt as a,Ln as o,Nt as s,Pt as c,Qt as l,St as u,Vt as d,Wt as f,_t as p,a as m,dn as h,en as g,fn as _,ft as v,gt as y,ln as b,mn as x,mt as S,pn as C,qn as w,qt as ee,rr as te,t as T,un as E,vt as D,wn as ne,zn as O}from"./_router-chunk-H0-n0SZI.js";import{n as re}from"./rxjs-interop-U_NminAK.js";import{At as ie,B as k,Dt as A,G as j,I as M,J as N,Nt as P,V as F,bt as I,jt as L,q as R,t as z,xt as B}from"./locale.service-Bf8_ncMo.js";import{t as V}from"./store.service-ZF4OfoGo.js";import{h as H,l as U}from"./snackbar.component-ICe8-MWg.js";import{n as W}from"./index-B8S1FFME.js";import{t as G}from"./app-shell.component-CR4uAChA.js";import{k as K}from"./ui-CQhTckzj.js";var q=e=>({name:e}),J=(e,t)=>({start:e,end:t}),Y=e=>({pct:e}),ae=e=>({days:e}),X=e=>({$implicit:e}),oe=e=>[`/dashboard/cooperatives`,e],se=e=>[`/dashboard/reunions`,e],ce=e=>({user:e}),Z=(e,t)=>t.label,le=(e,t)=>t.key,Q=(e,t)=>t.id;function ue(e,t){if(e&1&&(r(0,`div`,7)(1,`a`,55),s(2,`ui-icon`,56),_(3),n(),r(4,`a`,57),_(5),r(6,`span`,58),s(7,`ui-icon`,59),n()()()),e&2){let e=d();v(2),f(`size`,20),v(),x(` `,e.t()(`dashboard.actions.export`),` `),v(2),x(` `,e.t()(`dashboard.actions.report`),` `),v(2),f(`size`,20)}}function de(e,t){if(e&1&&(r(0,`p`,17),_(1),n()),e&2){let e=d();v(),x(` `,e.t()(`dashboard.campaign.period`,ee(1,J,e.campaign().start,e.campaign().end)),` `)}}function fe(e,t){if(e&1&&(r(0,`span`),_(1),n(),r(2,`span`,66),_(3),n()),e&2){let e=d(2);v(),C(e.t()(`dashboard.campaign.elapsed`,a(2,Y,e.campaign().pct))),v(2),C(e.t()(`dashboard.campaign.remaining`,a(4,ae,e.campaign().remaining)))}}function pe(e,t){if(e&1&&(r(0,`span`,62),s(1,`ui-icon`,67),_(2),n()),e&2){let e=d(2);v(),f(`size`,15),v(),x(``,e.t()(`dashboard.campaign.ended`),` `)}}function me(e,t){if(e&1&&(r(0,`div`)(1,`dt`,68),_(2),n(),r(3,`dd`,69),_(4),n()()),e&2){let e=t.$implicit;v(2),x(` `,e.label,` `),v(2),x(` `,e.value,` `)}}function he(t,i){if(t&1&&(r(0,`div`,60)(1,`div`,61),D(2,fe,4,6)(3,pe,3,2,`span`,62),n(),r(4,`div`,63),s(5,`span`,64),n()(),r(6,`dl`,65),g(7,me,5,2,`div`,null,Z),n()),t&2){let t=d();v(2),p(t.campaign().remaining>0?2:3),v(3),b(`width`,t.campaign().pct,`%`),v(2),e(t.campaign().stats)}}function ge(e,t){if(e&1&&(r(0,`li`,31)(1,`span`,70),s(2,`span`,71),_(3),n(),r(4,`span`,72),_(5),n()()),e&2){let e=t.$implicit,n=d();v(2),b(`background`,e.color),v(),x(``,e.label,` `),v(2),C(n.localeService.formatNumber(e.n))}}function _e(e,t){if(e&1&&(r(0,`a`,32),_(1),s(2,`ui-icon`,73),n()),e&2){let e=d();v(),x(` `,e.t()(`dashboard.quality.open`),` `),v(),f(`size`,18)}}function ve(e,t){if(e&1&&(r(0,`a`,78),c(1,80),n()),e&2){let e=d().$implicit;d();let t=l(7);f(`routerLink`,e.to),v(),f(`ngTemplateOutlet`,t)(`ngTemplateOutletContext`,a(3,X,e))}}function ye(e,t){if(e&1&&(r(0,`div`,79),c(1,80),n()),e&2){let e=d().$implicit;d();let t=l(7);v(),f(`ngTemplateOutlet`,t)(`ngTemplateOutletContext`,a(2,X,e))}}function be(e,t){if(e&1&&(r(0,`li`,3),D(1,ve,2,5,`a`,78)(2,ye,2,4,`div`,79),n()),e&2){let e=t.$implicit,n=t.$index;y(`net-sep`,n>0),v(),p(e.to?1:2)}}function xe(e,t){if(e&1&&(r(0,`span`,85),s(1,`ui-icon`,88),_(2),n()),e&2){let e=d().$implicit;v(),f(`size`,13),v(),x(``,e.growth,` `)}}function Se(e,t){if(e&1&&(r(0,`span`,81),s(1,`ui-icon`,82),n(),r(2,`span`,3)(3,`span`,83)(4,`span`,84),_(5),n(),D(6,xe,3,2,`span`,85),n(),r(7,`span`,86),_(8),n(),r(9,`span`,87),_(10),n()()),e&2){let e=t.$implicit;v(),f(`name`,e.icon)(`size`,22),v(4),C(e.value),v(),p(e.growth?6:-1),v(2),C(e.label),v(2),C(e.sub)}}function Ce(t,i){if(t&1&&(r(0,`section`,74)(1,`h2`,75),_(2),n(),r(3,`ul`,76),g(4,be,3,3,`li`,77,Z),n()(),E(6,Se,11,6,`ng-template`,null,0,h)),t&2){let t=d();v(2),x(` `,t.t()(`dashboard.network.title`),` `),v(2),e(t.network())}}function we(e,t){if(e&1&&(r(0,`span`,93),_(1),n()),e&2){let e=d().$implicit;v(),C(e.unit)}}function Te(e,t){if(e&1&&(r(0,`div`,34)(1,`div`,44)(2,`span`,89),_(3),n(),r(4,`span`,90),s(5,`ui-icon`,82),n()(),r(6,`div`,91)(7,`span`,92),_(8),D(9,we,2,1,`span`,93),n(),w(),r(10,`svg`,94),s(11,`path`,95)(12,`path`,96),n()(),i(),r(13,`p`,97)(14,`span`,98),s(15,`ui-icon`,88),_(16),n(),r(17,`span`,99),_(18),n()()()),e&2){let e=t.$implicit,n=d();v(3),C(e.label),v(2),f(`name`,e.icon)(`size`,20),v(3),x(``,e.value,` `),v(),p(e.unit?9:-1),v(2),S(`d`,e.spark.area),v(),S(`d`,e.spark.line),v(3),f(`size`,14),v(),x(``,e.delta,` `),v(2),C(n.t()(`dashboard.kpi.trend`))}}function Ee(e,t){if(e&1&&(r(0,`li`)(1,`a`,100)(2,`span`,101),s(3,`ui-icon`,82),n(),r(4,`span`,102)(5,`span`,103),_(6),n(),r(7,`span`,104),_(8),n()(),r(9,`span`,105),_(10),n(),s(11,`ui-icon`,106),n()()),e&2){let e=t.$implicit,n=d();v(),f(`routerLink`,e.to),v(),b(`background`,e.bg)(`color`,e.fg),v(),f(`name`,e.icon)(`size`,22),v(3),C(n.t()(e.key)),v(2),C(e.sub),v(2),C(n.localeService.formatNumber(e.value)),v(),f(`size`,20)}}function De(e,t){if(e&1&&(r(0,`span`,121),_(1),n()),e&2){let e=d().$implicit;v(),C(e.commune)}}function $(e,t){if(e&1&&(r(0,`tr`,116)(1,`td`,117)(2,`span`,118)(3,`span`,119),_(4),n(),r(5,`span`,3)(6,`span`,120),_(7),n(),D(8,De,2,1,`span`,121),n()()(),r(9,`td`,122),_(10),n(),r(11,`td`,123),_(12),n(),r(13,`td`,117)(14,`span`,118)(15,`span`,124),s(16,`span`),n(),r(17,`span`,125),_(18),n()()()()),e&2){let e=t.$implicit,n=t.$index,r=d(2);f(`routerLink`,a(11,oe,e.id)),v(4),C(n+1),v(3),C(e.name),v(),p(e.commune&&e.commune!==e.name?8:-1),v(2),x(` `,r.localeService.formatNumber(e.producers),` `),v(2),x(` `,e.women,` % `),v(4),b(`width`,e.quality,`%`)(`background`,e.quality>=70?`var(--v2-vert-pousse)`:`var(--v2-soleil)`),v(2),x(``,e.quality,` %`)}}function Oe(t,i){if(t&1&&(r(0,`section`,42)(1,`div`,107)(2,`div`)(3,`h2`,108),_(4),n(),r(5,`p`,109),_(6),n()(),r(7,`a`,110),_(8),s(9,`ui-icon`,73),n()(),r(10,`div`,111)(11,`table`,112)(12,`thead`)(13,`tr`,4)(14,`th`,113),_(15),n(),r(16,`th`,114),_(17),n(),r(18,`th`,114),_(19),n(),r(20,`th`,115),_(21),n()()(),r(22,`tbody`),g(23,$,19,13,`tr`,116,Q),n()()()()),t&2){let t=d();v(4),C(t.t()(`dashboard.ranking.title`)),v(2),C(t.t()(`dashboard.ranking.sub`)),v(2),x(``,t.t()(`dashboard.ranking.all`),` `),v(),f(`size`,18),v(6),C(t.t()(`dashboard.ranking.scoop`)),v(2),x(` `,t.t()(`dashboard.ranking.producers`),` `),v(2),x(` `,t.t()(`dashboard.ranking.women`),` `),v(2),x(` `,t.t()(`dashboard.ranking.quality`),` `),v(2),e(t.ranking())}}function ke(e,t){if(e&1&&(r(0,`li`)(1,`a`,100)(2,`span`,126)(3,`span`,127),_(4),n(),r(5,`span`,128),_(6),n()(),r(7,`span`,102)(8,`span`,129),_(9),n(),r(10,`span`,130),s(11,`ui-icon`,131),_(12),n(),r(13,`span`,104),_(14),n()()()()),e&2){let e=t.$implicit;v(),f(`routerLink`,a(7,se,e.id)),v(3),C(e.day),v(2),C(e.month),v(3),C(e.title),v(2),f(`size`,14),v(),C(e.place),v(2),C(e.scoop)}}function Ae(e,t){if(e&1&&(r(0,`li`,48),_(1),n()),e&2){let e=d();v(),x(` `,e.t()(`dashboard.meetings.empty`),` `)}}function je(e,t){if(e&1&&(r(0,`a`,49),_(1),s(2,`ui-icon`,73),n()),e&2){let e=d();v(),x(``,e.t()(`dashboard.meetings.all`),` `),v(),f(`size`,18)}}function Me(e,t){if(e&1&&(r(0,`a`,52),_(1),s(2,`ui-icon`,73),n()),e&2){let e=d();v(),x(``,e.t()(`dashboard.activity.all`),` `),v(),f(`size`,18)}}function Ne(e,t){e&1&&s(0,`span`,132)}function Pe(e,t){if(e&1&&(r(0,`li`,54),D(1,Ne,1,0,`span`,132),r(2,`span`,133),_(3),n(),r(4,`span`,134)(5,`span`,135)(6,`span`,136),_(7),n(),r(8,`span`,137),_(9),n()(),r(10,`span`,138),_(11),n()(),r(12,`span`,139),_(13),n()()),e&2){let e=t.$implicit,n=t.$index,r=t.$count,i=d();v(),p(n===r-1?-1:1),v(2),C(i.initialsOf(e.user)),v(4),C(e.action),v(2),x(` · `,e.entity),v(2),C(i.t()(`dashboard.activity.by`,a(6,ce,e.user))),v(2),C(i.fmtDateTime(e.at))}}function Fe(e,t){return Array.from({length:8},(n,r)=>{let i=Math.sin((r+t)*1.7)*.035;return Math.max(0,e*(.74+r*.037+i))}).map((t,n,r)=>n===r.length-1?e:t)}function Ie(e){let t=Math.max(...e),n=Math.min(...e),r=t-n||1,i=e.map((t,i)=>[i/(e.length-1)*120,36-(t-n)/r*30]).map(([e,t],n)=>`${n?`L`:`M`}${e.toFixed(1)} ${t.toFixed(1)}`).join(` `);return{line:i,area:`${i} L120 40 L0 40 Z`}}var Le=class o{constructor(){this.store=O(V),this.localeService=O(z),this.t=this.localeService.t,this.fmtDateTime=F,this.document=O(ne),this.firstName=t(()=>this.store.state().session?.name.split(` `)[0]??``),this.today=t(()=>this.localeService.formatDate(new Date,{weekday:`long`,day:`numeric`,month:`long`,year:`numeric`})),this.data=t(()=>{let e=this.store.state(),t=e.session,n=new Date().toISOString(),r=B(e.producers.filter(e=>!e.mergedInto),t),i=ie(e.members,t),a=R(i),o=new Set(r.map(e=>e.id)),s=r.filter(e=>e.sex===`F`),c=r.filter(t=>M(t.age,e.youthMaxAge)),l=e.plots.filter(e=>o.has(e.producerId)),u=A(e.dossiers,t).filter(e=>e.status===`soumis`||e.status===`en examen`).sort((e,t)=>e.updatedAt.localeCompare(t.updatedAt)),d=u[0]?Math.max(0,Math.floor((Date.now()-new Date(u[0].updatedAt).getTime())/864e5)):0,f=new Map(r.map(e=>[e.id,e])),p=new Map(e.plots.map(e=>[e.id,e])),m=e.alerts.filter(e=>{if(e.status!==`ouvert`)return!1;let t=e.entity===`producteur`?f.get(e.entityId):f.get(p.get(e.entityId)?.producerId??``);return!!t&&o.has(t.id)}),h=m.filter(e=>e.severity===`élevée`).length,g=P(e.contributionRules,t),_=L(e.payments,t),v=i.filter(e=>{if(e.status!==`membre`)return!1;let t=g.find(t=>t.scoopId===e.scoopId),r=N(e,t,_,n).state;return r===`en retard`||r===`jamais payé`}).length;return{producers:r.length,activeMembers:a.active,womenPct:r.length?s.length/r.length*100:0,youthCount:c.length,pendingDossiers:u.length,oldestDays:d,openAlerts:m.length,criticalAlerts:h,lateDues:v,producersInScope:r,plotsInScope:l,measuredHa:l.reduce((e,t)=>e+(t.measured||0),0),recentAudit:e.audit.slice(0,6)}}),this.layout=t(()=>{let e=this.store.state().session?.scope.kind===`consolidé`,t=this.ranking().length>1,n=e=>[,,,,,,].fill(e).join(` `),r=e?[`campaign campaign campaign campaign meetings meetings`,...this.network().length?[n(`network`)]:[],n(`kpis`),`quality quality todo todo todo todo`,...t?[n(`ranking`)]:[],`chart chart chart activity activity activity`]:[`todo todo todo todo quality quality`,n(`kpis`),`campaign campaign campaign campaign meetings meetings`,...t?[n(`ranking`)]:[],n(`chart`),n(`activity`)],i=r.flatMap(e=>[...new Set(e.split(` `))]);return{ranking:t,lg:r.map(e=>`"${e}"`).join(` `),sm:[...new Set(i)].map(e=>`"${e}"`).join(` `)}}),this.network=t(()=>{let e=this.store.state();if(e.session?.scope.kind!==`consolidé`)return[];let t=this.t(),n=e=>this.localeService.formatNumber(e),r=e.scoops.filter(e=>!e.archived),i=Date.now()-7776e6,a=r.filter(e=>e.createdAt&&new Date(e.createdAt).getTime()>=i).sort((e,t)=>(t.createdAt??``).localeCompare(e.createdAt??``)),o=e.orgs.filter(e=>e.type===`GIE`).length,s=e.users.filter(e=>e.role===`technicien`&&e.active),c=e.users.filter(e=>e.active).length,l=e.users.filter(e=>!e.active&&e.invited).length,u=e.plots.filter(e=>e.status===`validée`).length,d=this.store.can(`org.read`),f=this.store.can(`user.manage`);return[{icon:`diversity_3`,value:n(r.length),label:t(`dashboard.network.scoops`),sub:a.length?t(`dashboard.network.latest`,{name:a[0].name}):t(`dashboard.network.scoopsSub`,{count:new Set(r.map(e=>e.commune)).size}),growth:a.length?t(`dashboard.network.joined`,{count:a.length}):void 0,to:d?`/dashboard/cooperatives`:null},{icon:`hub`,value:n(e.orgs.length),label:t(`dashboard.network.orgs`),sub:t(`dashboard.network.orgsSub`,{count:n(o)}),to:d?`/dashboard/organisations`:null},{icon:`person`,value:n(s.length),label:t(`dashboard.network.technicians`),sub:t(`dashboard.network.techniciansSub`),to:f?`/dashboard/utilisateurs`:null},{icon:`account_circle`,value:n(c),label:t(`dashboard.network.accounts`),sub:t(`dashboard.network.accountsSub`,{count:l}),to:f?`/dashboard/utilisateurs`:null},{icon:`pin_drop`,value:n(e.plots.length),label:t(`dashboard.network.plots`),sub:t(`dashboard.network.plotsSub`,{count:n(u)}),to:null}]}),this.campaign=t(()=>{let e=[...this.store.state().campaigns].sort((e,t)=>t.start.localeCompare(e.start)),t=e.find(e=>e.status===`en cours`)??e[0],n={name:null,start:``,end:``,pct:0,remaining:0,stats:[]};if(!t)return n;let r=new Date(t.start).getTime(),i=new Date(t.end).getTime(),a=Math.round(Math.min(1,Math.max(0,(Date.now()-r)/Math.max(1,i-r)))*100),o=Math.max(0,Math.ceil((i-Date.now())/864e5)),s=this.data().plotsInScope.filter(e=>e.campaign===t.name),c=this.t(),l=e=>this.localeService.formatNumber(e);return{name:t.name,start:k(t.start),end:k(t.end),pct:a,remaining:o,stats:[{label:c(`dashboard.campaign.plots`),value:l(s.length)},{label:c(`dashboard.campaign.validated`),value:l(s.filter(e=>e.status===`validée`).length)},{label:c(`dashboard.campaign.area`),value:c(`dashboard.kpi.unitHa`,{value:j.format(s.reduce((e,t)=>e+(t.measured||0),0))})}]}}),this.quality=t(()=>{let e=this.data().producersInScope,t=this.t(),n=[{label:t(`dashboard.quality.validated`),n:e.filter(e=>e.quality===`validé`).length,color:`var(--v2-vert-pousse)`},{label:t(`dashboard.quality.toVerify`),n:e.filter(e=>e.quality===`à vérifier`).length,color:`var(--v2-soleil)`},{label:t(`dashboard.quality.duplicate`),n:e.filter(e=>e.quality===`doublon`).length,color:`var(--v2-info-fg)`},{label:t(`dashboard.quality.invalid`),n:e.filter(e=>e.quality===`invalide`).length,color:`var(--v2-erreur-fg)`}],r=e.length||1,i=0,a=n.map(e=>{let t=i/r*100;return i+=e.n,`${e.color} ${t}% ${i/r*100}%`});return{rows:n,pct:Math.round(n[0].n/r*100),ring:e.length?`conic-gradient(${a.join(`, `)})`:`var(--v2-lin)`}}),this.kpis=t(()=>{let e=this.data(),t=this.t(),n=e=>this.localeService.formatNumber(e);return[{label:t(`dashboard.kpi.producers`),icon:`agriculture`,raw:e.producers,value:n(e.producers),unit:``,delta:`+6,4 %`},{label:t(`dashboard.kpi.activeMembers`),icon:`group`,raw:e.activeMembers,value:n(e.activeMembers),unit:``,delta:`+3,1 %`},{label:t(`dashboard.kpi.area`),icon:`square_foot`,raw:e.measuredHa,value:j.format(e.measuredHa),unit:`ha`,delta:`+8,9 %`},{label:t(`dashboard.kpi.women`),icon:`female`,raw:e.womenPct,value:j.format(e.womenPct),unit:`%`,delta:`+1,2 pt`}].map((e,t)=>({...e,spark:Ie(Fe(e.raw,t+1))}))}),this.todos=t(()=>{let e=this.data(),t=this.t();return[{key:`dashboard.todo.dossiers`,to:`/dashboard/dossiers`,icon:`folder_shared`,value:e.pendingDossiers,sub:e.pendingDossiers?t(`dashboard.todo.dossiersSub`,{days:e.oldestDays}):t(`dashboard.todo.empty`),bg:`var(--v2-info-bg)`,fg:`var(--v2-info-fg)`},{key:`dashboard.todo.alerts`,to:`/dashboard/qualite/alertes`,icon:`warning`,value:e.openAlerts,sub:t(`dashboard.todo.alertsSub`,{critical:e.criticalAlerts}),bg:e.criticalAlerts?`var(--v2-erreur-bg)`:`var(--v2-attente-bg)`,fg:e.criticalAlerts?`var(--v2-erreur-fg)`:`var(--v2-attente-fg)`},{key:`dashboard.todo.dues`,to:`/dashboard/cotisations`,icon:`payments`,value:e.lateDues,sub:t(`dashboard.todo.duesSub`),bg:`var(--v2-attente-bg)`,fg:`var(--v2-attente-fg)`}]}),this.ranking=t(()=>{let e=this.store.state(),t=this.data().producersInScope;return e.scoops.filter(e=>!e.archived).map(e=>{let n=t.filter(t=>t.scoopId===e.id),r=n.length||1;return{id:e.id,name:e.name,commune:e.commune,producers:n.length,women:Math.round(n.filter(e=>e.sex===`F`).length/r*100),quality:Math.round(n.filter(e=>e.quality===`validé`).length/r*100)}}).filter(e=>e.producers>0).sort((e,t)=>t.producers-e.producers).slice(0,6)}),this.meetings=t(()=>{let e=this.store.state();if(!this.store.can(`meeting.read`))return[];let t=new Date().toISOString(),n=new Map(e.scoops.map(e=>[e.id,e.name]));return B(e.meetings,e.session).filter(e=>e.status===`planifiée`&&e.date>=t).sort((e,t)=>e.date.localeCompare(t.date)).slice(0,3).map(e=>({id:e.id,title:e.title,place:e.place,scoop:n.get(e.scoopId)??``,day:this.localeService.formatDate(e.date,{day:`2-digit`}),month:this.localeService.formatDate(e.date,{month:`short`}).replace(`.`,``)}))}),this.byScoopChart=t(()=>{let e=this.store.state(),t=this.data().producersInScope,n={family:`Plus Jakarta Sans, system-ui, sans-serif`,size:12},r=this.token(`--v2-encre`),i=this.token(`--v2-gris-texte`),a=this.token(`--v2-separateur`),o=e.scoops.map(e=>{let n=t.filter(t=>t.scoopId===e.id);return{name:e.commune,F:n.filter(e=>e.sex===`F`).length,H:n.filter(e=>e.sex===`H`).length}}).filter(e=>e.F+e.H>0);return{type:`bar`,data:{labels:o.map(e=>e.name),datasets:[{label:this.t()(`dashboard.chart.women`),data:o.map(e=>e.F),backgroundColor:`var(--v2-chart-2)`,borderRadius:6,borderSkipped:!1,barThickness:12},{label:this.t()(`dashboard.chart.men`),data:o.map(e=>e.H),backgroundColor:`var(--v2-chart-1)`,borderRadius:6,borderSkipped:!1,barThickness:12}]},options:{indexAxis:`y`,plugins:{legend:{position:`bottom`,labels:{usePointStyle:!0,pointStyle:`rectRounded`,padding:18,color:r,font:{...n,weight:600}}}},scales:{x:{stacked:!0,beginAtZero:!0,grid:{color:a},border:{display:!1},ticks:{color:i,font:n}},y:{stacked:!0,grid:{display:!1},border:{display:!1},ticks:{color:r,font:{...n,weight:600}}}}}}})}token(e){try{return getComputedStyle(this.document.documentElement).getPropertyValue(e).trim()||void 0}catch{return}}initialsOf(e){return e.split(` `).filter(Boolean).map(e=>e[0]).slice(0,2).join(``).toUpperCase()}static{this.ɵfac=function(e){return new(e||o)}}static{this.ɵcmp=u({type:o,selectors:[[`app-index-page`]],decls:79,vars:37,consts:[[`netItem`,``],[`perm`,`dashboard.read`,3,`area`],[1,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-x-6`,`gap-y-4`],[1,`min-w-0`],[1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-2`,`text-[30px]`,`font-extrabold`,`leading-[1.05]`,`tracking-[-0.03em]`,`sm:text-[38px]`],[1,`mt-2`,`text-[16px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`flex`,`flex-wrap`,`gap-3`],[1,`board`,`mt-8`],[`aria-labelledby`,`campaign-title`,1,`relative`,`overflow-hidden`,`rounded-[28px]`,`p-6`,`sm:p-8`,2,`grid-area`,`campaign`,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[`viewBox`,`0 0 320 220`,`aria-hidden`,`true`,1,`pointer-events-none`,`absolute`,`-right-10`,`-top-6`,`h-56`,`w-80`,`opacity-[0.07]`],[`d`,`M10 120 Q160 60 310 110`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`d`,`M30 168 Q170 108 310 156`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[`d`,`M60 212 Q180 160 310 200`,`fill`,`none`,`stroke`,`currentColor`,`stroke-width`,`22`,`stroke-linecap`,`round`],[1,`relative`,`flex`,`flex-wrap`,`items-start`,`justify-between`,`gap-4`],[1,`mono`,2,`color`,`var(--v2-citron)`],[`id`,`campaign-title`,1,`mt-2`,`text-[28px]`,`font-extrabold`,`leading-tight`,`tracking-[-0.03em]`],[1,`mt-1`,`text-[14px]`,`font-medium`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 70%, transparent)`],[1,`grid`,`size-14`,`place-items-center`,`rounded-[18px]`,2,`background`,`color-mix(in oklab, var(--v2-blanc) 10%, transparent)`],[`name`,`grass`,2,`color`,`var(--v2-citron)`,3,`size`],[`aria-labelledby`,`quality-title`,1,`card`,`flex`,`flex-col`,`p-6`,2,`grid-area`,`quality`],[1,`flex`,`items-start`,`justify-between`,`gap-3`],[`id`,`quality-title`,1,`h2`],[`name`,`verified`,2,`color`,`var(--v2-vert-pousse)`,3,`size`],[1,`mt-5`,`flex`,`items-center`,`gap-6`],[`role`,`img`,1,`relative`,`grid`,`size-[132px]`,`shrink-0`,`place-items-center`,`rounded-full`],[1,`grid`,`size-[100px]`,`place-items-center`,`rounded-full`,`text-center`,2,`background`,`var(--v2-blanc)`],[1,`block`,`text-[28px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`],[1,`text-[16px]`],[1,`mt-1`,`block`,`text-[11px]`,`font-semibold`,2,`color`,`var(--v2-gris-texte)`],[1,`min-w-0`,`flex-1`,`space-y-2.5`],[1,`flex`,`items-center`,`justify-between`,`gap-2`,`text-[14px]`],[`routerLink`,`/dashboard/qualite`,1,`link`,`mt-auto`,`pt-5`],[1,`grid`,`grid-cols-1`,`gap-4`,`sm:grid-cols-2`,`xl:grid-cols-4`,2,`grid-area`,`kpis`],[1,`card`,`kpi`,`flex`,`flex-col`,`p-5`],[`aria-labelledby`,`todo-title`,1,`card`,`p-4`,`sm:p-5`,2,`grid-area`,`todo`],[`id`,`todo-title`,1,`h2`,`px-2`,`pt-1`],[1,`mt-3`,`space-y-1`],[1,`card`,`flex`,`flex-col`,`p-5`,`sm:p-6`,2,`grid-area`,`chart`],[1,`h2`],[1,`relative`,`mt-4`,`h-72`,`w-full`,`min-h-0`,`overflow-hidden`],[`type`,`bar`,3,`data`,`options`],[`aria-labelledby`,`ranking-title`,1,`card`,`overflow-hidden`,2,`grid-area`,`ranking`],[`aria-labelledby`,`meetings-title`,1,`card`,`flex`,`flex-col`,`p-6`,2,`grid-area`,`meetings`],[1,`flex`,`items-center`,`justify-between`,`gap-3`],[`id`,`meetings-title`,1,`h2`],[`name`,`event_upcoming`,2,`color`,`var(--v2-foret-clair)`,3,`size`],[1,`mt-4`,`space-y-2`],[1,`sub`,`rounded-[16px]`,`p-4`,2,`background`,`var(--v2-creme)`],[`routerLink`,`/dashboard/reunions`,1,`link`,`mt-auto`,`pt-4`],[`aria-labelledby`,`activity-title`,1,`card`,`p-6`,2,`grid-area`,`activity`],[`id`,`activity-title`,1,`h2`],[`routerLink`,`/dashboard/audit`,1,`link`],[1,`relative`,`mt-5`,`space-y-5`,`pl-1`],[1,`relative`,`flex`,`gap-4`],[`routerLink`,`/dashboard/rapports`,1,`btn`,`btn-ghost`],[`name`,`file_export`,3,`size`],[`routerLink`,`/dashboard/rapports`,1,`btn`,`btn-primary`],[1,`chip`],[`name`,`add`,3,`size`],[1,`relative`,`mt-6`],[1,`flex`,`items-baseline`,`justify-between`,`gap-3`,`text-[13px]`,`font-semibold`],[1,`inline-flex`,`items-center`,`gap-1.5`,`rounded-full`,`px-2.5`,`py-1`,2,`background`,`var(--v2-attente-bg)`,`color`,`var(--v2-attente-fg)`],[1,`mt-2`,`h-2.5`,`overflow-hidden`,`rounded-full`,2,`background`,`color-mix(in oklab, var(--v2-blanc) 14%, transparent)`],[1,`block`,`h-full`,`rounded-full`,2,`background`,`var(--v2-citron)`],[1,`relative`,`mt-7`,`grid`,`grid-cols-3`,`gap-4`],[2,`color`,`color-mix(in oklab, var(--v2-blanc) 70%, transparent)`],[`name`,`schedule`,3,`size`],[1,`text-[13px]`,`font-semibold`,2,`color`,`color-mix(in oklab, var(--v2-blanc) 70%, transparent)`],[1,`mt-1`,`text-[26px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`flex`,`items-center`,`gap-2`,`font-semibold`],[`aria-hidden`,`true`,1,`size-2.5`,`rounded-full`],[1,`font-extrabold`,`tabular-nums`],[`name`,`arrow_forward`,3,`size`],[`aria-labelledby`,`network-title`,1,`card`,`p-5`,`sm:p-6`,2,`grid-area`,`network`],[`id`,`network-title`,1,`mono`,2,`color`,`var(--v2-gris-texte)`],[1,`mt-4`,`grid`,`grid-cols-2`,`gap-x-4`,`gap-y-5`,`md:grid-cols-3`,`xl:grid-cols-5`],[1,`min-w-0`,3,`net-sep`],[1,`net`,3,`routerLink`],[1,`net`,`net-static`],[3,`ngTemplateOutlet`,`ngTemplateOutletContext`],[1,`grid`,`size-11`,`shrink-0`,`place-items-center`,`rounded-[14px]`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-citron)`],[3,`name`,`size`],[1,`flex`,`items-center`,`gap-2`],[1,`text-[26px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`inline-flex`,`items-center`,`gap-0.5`,`rounded-full`,`px-2`,`py-0.5`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-succes-bg)`,`color`,`var(--v2-succes-fg)`],[1,`mt-1`,`block`,`text-[14px]`,`font-bold`,`leading-snug`],[1,`sub`,`block`,`leading-snug`],[`name`,`north_east`,3,`size`],[1,`text-[14px]`,`font-semibold`,2,`color`,`var(--v2-ardoise)`],[1,`grid`,`size-10`,`place-items-center`,`rounded-[12px]`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`mt-3`,`flex`,`items-end`,`justify-between`,`gap-3`],[1,`whitespace-nowrap`,`text-[32px]`,`font-extrabold`,`leading-none`,`tracking-[-0.03em]`,`tabular-nums`],[1,`ml-1`,`text-[16px]`,`font-bold`,2,`color`,`var(--v2-gris-texte)`],[`viewBox`,`0 0 120 40`,`preserveAspectRatio`,`none`,`aria-hidden`,`true`,1,`h-10`,`w-28`,`shrink-0`],[`fill`,`var(--v2-chart-2)`,`fill-opacity`,`0.18`],[`fill`,`none`,`stroke`,`var(--v2-vert-pousse)`,`stroke-width`,`2.2`,`stroke-linejoin`,`round`,`stroke-linecap`,`round`,`vector-effect`,`non-scaling-stroke`],[1,`mt-3`,`flex`,`items-center`,`gap-1.5`,`text-[13px]`,`font-semibold`],[1,`inline-flex`,`items-center`,`gap-0.5`,`rounded-full`,`px-2`,`py-0.5`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-vert-pousse)`],[2,`color`,`var(--v2-gris-texte)`],[1,`task`,3,`routerLink`],[1,`grid`,`size-12`,`shrink-0`,`place-items-center`,`rounded-[14px]`],[1,`min-w-0`,`flex-1`],[1,`block`,`text-[15px]`,`font-bold`,`leading-snug`],[1,`sub`,`block`,`truncate`],[1,`text-[24px]`,`font-extrabold`,`tracking-[-0.03em]`,`tabular-nums`],[`name`,`arrow_forward`,1,`arrow`,3,`size`],[1,`flex`,`flex-wrap`,`items-end`,`justify-between`,`gap-3`,`px-6`,`pt-6`],[`id`,`ranking-title`,1,`h2`],[1,`sub`,`mt-0.5`],[`routerLink`,`/dashboard/cooperatives`,1,`link`],[1,`mt-4`,`overflow-x-auto`],[1,`w-full`,`min-w-[560px]`,`text-left`,`text-[14px]`],[1,`px-6`,`py-2.5`,`font-bold`],[1,`px-3`,`py-2.5`,`text-right`,`font-bold`],[1,`w-[32%]`,`px-6`,`py-2.5`,`font-bold`],[`tabindex`,`0`,1,`row-link`,2,`border-top`,`1px solid var(--v2-separateur)`,3,`routerLink`],[1,`px-6`,`py-3.5`],[1,`flex`,`items-center`,`gap-3`],[1,`grid`,`size-9`,`shrink-0`,`place-items-center`,`rounded-[10px]`,`text-[13px]`,`font-extrabold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`block`,`truncate`,`font-bold`],[1,`block`,`truncate`,`text-[12px]`,`font-medium`,2,`color`,`var(--v2-gris-texte)`],[1,`px-3`,`py-3.5`,`text-right`,`font-extrabold`,`tabular-nums`],[1,`px-3`,`py-3.5`,`text-right`,`font-semibold`,`tabular-nums`],[1,`bar`,`flex-1`],[1,`w-10`,`text-right`,`text-[13px]`,`font-bold`,`tabular-nums`],[1,`grid`,`w-14`,`shrink-0`,`place-items-center`,`rounded-[14px]`,`py-2`,`text-center`,2,`background`,`var(--v2-foret)`,`color`,`var(--v2-blanc)`],[1,`text-[20px]`,`font-extrabold`,`leading-none`],[1,`mono`,`mt-1`,2,`color`,`var(--v2-citron)`,`font-size`,`10px`],[1,`block`,`truncate`,`text-[15px]`,`font-bold`],[1,`sub`,`flex`,`items-center`,`gap-1`,`truncate`],[`name`,`location_on`,3,`size`],[`aria-hidden`,`true`,1,`absolute`,`left-[19px]`,`top-11`,`h-[calc(100%-12px)]`,`w-px`,2,`background`,`var(--v2-lin)`],[`aria-hidden`,`true`,1,`grid`,`size-10`,`shrink-0`,`place-items-center`,`rounded-full`,`text-[12px]`,`font-extrabold`,2,`background`,`var(--v2-sauge)`,`color`,`var(--v2-foret)`],[1,`min-w-0`,`flex-1`,`pt-0.5`],[1,`block`,`text-[14px]`],[1,`font-bold`],[2,`color`,`var(--v2-ardoise)`],[1,`sub`,`block`],[1,`mono`,`shrink-0`,`pt-1`,`normal-case`,`tracking-normal`,2,`color`,`var(--v2-gris-texte)`]],template:function(t,o){t&1&&(r(0,`app-shell`,1)(1,`header`,2)(2,`div`,3)(3,`p`,4),_(4),n(),r(5,`h1`,5),_(6),n(),r(7,`p`,6),_(8),n()(),D(9,ue,8,4,`div`,7),n(),r(10,`div`,8)(11,`section`,9),w(),r(12,`svg`,10),s(13,`path`,11)(14,`path`,12)(15,`path`,13),n(),i(),r(16,`div`,14)(17,`div`)(18,`p`,15),_(19),n(),r(20,`h2`,16),_(21),n(),D(22,de,2,4,`p`,17),n(),r(23,`span`,18),s(24,`ui-icon`,19),n()(),D(25,he,9,3),n(),r(26,`section`,20)(27,`div`,21)(28,`h2`,22),_(29),n(),s(30,`ui-icon`,23),n(),r(31,`div`,24)(32,`div`,25)(33,`div`,26)(34,`span`)(35,`span`,27),_(36),r(37,`span`,28),_(38,` %`),n()(),r(39,`span`,29),_(40),n()()()(),r(41,`ul`,30),g(42,ge,6,4,`li`,31,Z),n()(),D(44,_e,3,2,`a`,32),n(),D(45,Ce,8,1),r(46,`section`,33),g(47,Te,19,10,`div`,34,Z),n(),r(49,`section`,35)(50,`h2`,36),_(51),n(),r(52,`ul`,37),g(53,Ee,12,11,`li`,null,le),n()(),r(55,`section`,38)(56,`h2`,39),_(57),n(),r(58,`div`,40),s(59,`ui-chart`,41),n()(),D(60,Oe,25,8,`section`,42),r(61,`section`,43)(62,`div`,44)(63,`h2`,45),_(64),n(),s(65,`ui-icon`,46),n(),r(66,`ul`,47),g(67,ke,15,9,`li`,null,Q,!1,Ae,2,1,`li`,48),n(),D(70,je,3,2,`a`,49),n(),r(71,`section`,50)(72,`div`,44)(73,`h2`,51),_(74),n(),D(75,Me,3,2,`a`,52),n(),r(76,`ol`,53),g(77,Pe,14,8,`li`,54,Q),n()()()()),t&2&&(f(`area`,o.t()(`dashboard.area`)),v(4),C(o.today()),v(2),x(` `,o.t()(`dashboard.greeting`,a(35,q,o.firstName())),` `),v(2),x(` `,o.t()(`dashboard.subtitle`),` `),v(),p(o.store.can(`report.generate`)||o.store.can(`report.read`)?9:-1),v(),b(`--%NS%areas`,o.layout().lg)(`--%NS%areas-sm`,o.layout().sm),v(9),x(` `,o.t()(`dashboard.campaign.eyebrow`),` `),v(2),x(` `,o.campaign().name??o.t()(`dashboard.campaign.none`),` `),v(),p(o.campaign().name?22:-1),v(2),f(`size`,30),v(),p(o.campaign().name?25:-1),v(4),C(o.t()(`dashboard.quality.title`)),v(),f(`size`,24),v(2),b(`background`,o.quality().ring),S(`aria-label`,o.quality().pct+` % `+o.t()(`dashboard.quality.ring`)),v(4),C(o.quality().pct),v(4),C(o.t()(`dashboard.quality.ring`)),v(2),e(o.quality().rows),v(2),p(o.store.can(`quality.review`)||o.store.can(`alert.manage`)?44:-1),v(),p(o.network().length?45:-1),v(),S(`aria-label`,o.t()(`dashboard.overview`)),v(),e(o.kpis()),v(4),C(o.t()(`dashboard.todo.title`)),v(2),e(o.todos()),v(4),C(o.t()(`dashboard.chart.byScoop`)),v(2),f(`data`,o.byScoopChart().data)(`options`,o.byScoopChart().options),v(),p(o.layout().ranking?60:-1),v(4),C(o.t()(`dashboard.meetings.title`)),v(),f(`size`,24),v(2),e(o.meetings()),v(3),p(o.store.can(`meeting.read`)?70:-1),v(4),C(o.t()(`dashboard.activity.title`)),v(),p(o.store.can(`audit.read`)||o.store.can(`audit.read.scoop`)?75:-1),v(2),e(o.data().recentAudit))},dependencies:[W,H,G,K,U],styles:[`.mono[_ngcontent-%COMP%] {
      font-family: var(--%NS%v2-font-mono);
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
    
    .board[_ngcontent-%COMP%] {
      display: grid;
      gap: 16px;
      grid-template-columns: minmax(0, 1fr);
      grid-template-areas: var(--%NS%areas-sm);
    }
    @media (min-width: 1024px) {
      .board[_ngcontent-%COMP%] {
        grid-template-columns: repeat(6, minmax(0, 1fr));
        grid-template-areas: var(--%NS%areas);
      }
    }
    .net[_ngcontent-%COMP%] {
      display: flex;
      align-items: flex-start;
      gap: 14px;
      border-radius: 16px;
      padding: 6px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .net[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
    }
    .net-static[_ngcontent-%COMP%], 
   .net-static[_ngcontent-%COMP%]:hover {
      cursor: default;
      background: none;
    }
    .net[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    @media (min-width: 1280px) {
      .net-sep[_ngcontent-%COMP%] {
        border-left: 1px solid var(--%NS%v2-separateur);
        padding-left: 16px;
      }
    }
    .card[_ngcontent-%COMP%] {
      border-radius: 24px;
      border: 1px solid var(--%NS%v2-bord-carte);
      background: var(--%NS%v2-blanc);
    }
    .h2[_ngcontent-%COMP%] {
      font-size: 18px;
      font-weight: 800;
      letter-spacing: -0.02em;
    }
    .sub[_ngcontent-%COMP%] {
      font-size: 13px;
      font-weight: 500;
      color: var(--%NS%v2-gris-texte);
    }
    .link[_ngcontent-%COMP%] {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 14px;
      font-weight: 700;
      color: var(--%NS%v2-foret-clair);
      cursor: pointer;
      text-underline-offset: 3px;
    }
    .link[_ngcontent-%COMP%]:hover {
      text-decoration: underline;
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
      transition:
        background-color 0.15s ease,
        border-color 0.15s ease;
    }
    .btn-ghost[_ngcontent-%COMP%] {
      border: 1.5px solid var(--%NS%v2-gris-trait);
      background: var(--%NS%v2-blanc);
      color: var(--%NS%v2-encre);
    }
    .btn-ghost[_ngcontent-%COMP%]:hover {
      border-color: var(--%NS%v2-gris-texte);
    }
    .btn-primary[_ngcontent-%COMP%] {
      padding: 0 6px 0 18px;
      background: var(--%NS%v2-foret);
      color: var(--%NS%v2-blanc);
    }
    .btn-primary[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-foret-clair);
    }
    .chip[_ngcontent-%COMP%] {
      display: grid;
      height: 36px;
      width: 36px;
      place-items: center;
      border-radius: 12px;
      background: var(--%NS%v2-citron);
      color: var(--%NS%v2-foret);
    }
    .task[_ngcontent-%COMP%] {
      display: flex;
      align-items: center;
      gap: 14px;
      border-radius: 18px;
      padding: 12px;
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .task[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
    }
    .task[_ngcontent-%COMP%]:hover   .arrow[_ngcontent-%COMP%] {
      transform: translateX(3px);
      color: var(--%NS%v2-foret);
    }
    .arrow[_ngcontent-%COMP%] {
      color: var(--%NS%v2-gris-trait);
      transition:
        transform 0.2s ease,
        color 0.2s ease;
    }
    .kpi[_ngcontent-%COMP%] {
      transition:
        transform 0.2s ease,
        box-shadow 0.2s ease;
    }
    .kpi[_ngcontent-%COMP%]:hover {
      transform: translateY(-2px);
      box-shadow: var(--%NS%v2-ombre-flottant);
    }
    .bar[_ngcontent-%COMP%] {
      height: 8px;
      overflow: hidden;
      border-radius: 999px;
      background: var(--%NS%v2-lin);
    }
    .bar[_ngcontent-%COMP%]    > span[_ngcontent-%COMP%] {
      display: block;
      height: 100%;
      border-radius: 999px;
    }
    .row-link[_ngcontent-%COMP%] {
      cursor: pointer;
      transition: background-color 0.15s ease;
    }
    .row-link[_ngcontent-%COMP%]:hover {
      background: var(--%NS%v2-creme);
    }
    .btn[_ngcontent-%COMP%]:focus-visible, 
   .task[_ngcontent-%COMP%]:focus-visible, 
   .link[_ngcontent-%COMP%]:focus-visible, 
   .row-link[_ngcontent-%COMP%]:focus-visible {
      outline: 2px solid var(--%NS%v2-foret);
      outline-offset: 2px;
    }
    @media (prefers-reduced-motion: reduce) {
      .kpi[_ngcontent-%COMP%], 
   .kpi[_ngcontent-%COMP%]:hover, 
   .arrow[_ngcontent-%COMP%] {
        transition: none;
        transform: none;
      }
    }`]})}},Re=class e{constructor(){this.store=O(V),this.router=O(m),this.role=re(O(T).paramMap.pipe(te(e=>e.get(`role`)))),this.sessionRole=t(()=>this.store.state().session?.role??null),o(()=>{let e=I(this.store.state().session);e&&this.router.navigate([`/dashboard/cooperatives`,e],{replaceUrl:!0})}),o(()=>{let e=this.sessionRole();e&&this.role()!==e&&this.router.navigate([`/dashboard`,e],{replaceUrl:!0})})}static{this.ɵfac=function(t){return new(t||e)}}static{this.ɵcmp=u({type:e,selectors:[[`app-dashboard-role-page`]],decls:1,vars:0,template:function(e,t){e&1&&s(0,`app-index-page`)},dependencies:[Le],encapsulation:2})}};export{Re as default};