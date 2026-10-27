/* Admin — new sections (queue, plate camera, ratings, referrals, gifts, loyalty, corporate). ALL DATA FAKE. */
const T=(k,v)=>t('ad.'+k,v);
const AX={qb:'b1',pl:0,sw:{}};
const demoChip=()=>`<span class="chip gray">${T('demo')}</span>`;
const kpis=a=>`<div class="grid g4 mb-3">${a.map(k=>`<div class="panel kpi ${k[4]||''}"><div class="lbl">${k[0]}</div><div class="val">${k[1]}</div>${k[2]?`<span class="delta ${k[2][0]==='−'?'dn':'up'}">${k[2]}</span>`:''}<div class="ico">${ic(k[3])}</div></div>`).join('')}</div>`;
const stars=(v,s=15)=>{const f=Math.round(v*2)/2;return `<span class="stars" style="font-size:${s}px">${[1,2,3,4,5].map(i=>`<i class="${f>=i?'f':f>=i-.5?'h':''}">${ic('star',s)}</i>`).join('')}</span>`};
const tog=(k,on)=>`<span class="switch ${on?'on':''}" onclick="this.classList.toggle('on')"></span>`;
const setRow=(lbl,ctl)=>`<div class="set-row"><span>${lbl}</span>${ctl}</div>`;
const bfx=id=>L(branchById(id).name);
const AN=['خالد المري','فهد الكعبي','يوسف النعيمي','سعد الهاجري','ناصر الدوسري','علي البدر','سلمان الأنصاري','محمد الخليفي'];
const AF=['سارة العبدالله','نورة السليطي','مريم الكعبي','هند المري','لينا الأنصاري','فاطمة البدر'];
const CARS=['لاند كروزر','باترول','كامري','التيما','ES 350','أكورد','برادو','إكسبلورر'];

/* ---------- Queue & slots ---------- */
const QD={b1:{n:7,w:22,l:3,u:2},b2:{n:12,w:34,l:3,u:3},b3:{n:2,w:6,l:2,u:1},b4:{n:5,w:15,l:3,u:2}};
const QS=['8:00 ص','8:30 ص','9:30 ص','10:30 ص','11:30 ص','12:30 م','2:00 م','4:00 م','5:30 م','6:30 م','7:30 م','9:00 م'];
const QB={b1:[4,5,6,6,3,2,5,6,6,4,3,1],b2:[6,6,6,5,6,4,6,6,6,5,4,2],b3:[2,3,4,2,3,1,4,5,3,2,1,0],b4:[5,4,5,6,4,3,5,6,5,4,3,2]};
const qState=n=>n>=10?['err',T('q.busy')]:n>=5?['warn',T('q.mid')]:['ok',T('q.calm')];
V.queue=()=>{const ids=['b1','b2','b3','b4'],tot=ids.reduce((s,i)=>s+QD[i].n,0),cap=6;
 return kpis([[T('q.k1'),tot,'','drop','o'],[T('q.k2'),`${Math.round(ids.reduce((s,i)=>s+QD[i].w,0)/4)} <small>${T('q.min')}</small>`,'','clock','b'],[T('q.k3'),'86','+12%','calendar','g'],[T('q.k4'),'6%','−2%','warn']])+
 `<div class="grid g2"><div class="panel"><div class="row between mb-3"><div><h3>${T('q.live')}</h3><div class="muted sm">${demoChip()}</div></div><span class="chip ok"><i class="live"></i> ${T('p.live')}</span></div>
 <table class="tbl"><thead><tr><th>${T('q.thBranch')}</th><th>${T('q.thAhead')}</th><th>${T('q.thWait')}</th><th>${T('q.thLanes')}</th><th>${T('q.thState')}</th><th>${T('q.thAct')}</th></tr></thead><tbody>
 ${ids.map(i=>{const d=QD[i],s=qState(d.n);return `<tr class="${AX.qb===i?'sel':''}" data-x="qb" data-v="${i}" style="cursor:pointer"><td><b>${bfx(i)}</b></td><td><b>${d.n}</b> <span class="muted xs">${T('q.cars')}</span></td><td><b>${d.w}</b> <span class="muted xs">${T('q.min')}</span></td>
 <td><div class="lanes">${Array.from({length:d.l},(_,k)=>`<i class="${k<d.u?'on':''}"></i>`).join('')}</div></td><td><span class="chip ${s[0]}">${s[1]}</span></td><td><button class="btn btn-ghost inline sm" data-x="qpause" data-v="${i}">${AX.sw['p'+i]?T('q.open'):T('q.pause')}</button></td></tr>`}).join('')}</tbody></table></div>
 <div class="panel"><h3>${T('q.settings')}</h3><div class="muted sm mb-3">${demoChip()}</div>
 ${setRow(T('q.dur'),`<select class="sel-f"><option>30 ${T('q.min')}</option><option>45 ${T('q.min')}</option><option>60 ${T('q.min')}</option></select>`)}
 ${setRow(T('q.cap'),`<select class="sel-f"><option>6 ${T('q.cars')}</option><option>4 ${T('q.cars')}</option><option>8 ${T('q.cars')}</option></select>`)}
 ${setRow(T('q.adv'),`<select class="sel-f"><option>3 ${T('q.days')}</option><option>7 ${T('q.days')}</option></select>`)}
 ${setRow(`${T('q.notify')} 2 ${T('q.carsLeft')}`,tog('n',1))}${setRow(T('q.autoOpen'),tog('a',0))}
 <button class="btn btn-primary inline mt-3" data-x="toast" data-v="${T('q.saved')}">${T('q.save')}</button></div></div>
 <div class="grid g2e mt-4"><div class="panel"><div class="row between mb-3"><div><h3>${T('q.slots')} — ${bfx(AX.qb)}</h3><div class="muted sm">${T('q.slotsSub')}</div></div><div class="legend"><span><i style="background:#2fb36f"></i>${T('q.calm')}</span><span><i style="background:#ff8000"></i>${T('q.mid')}</span><span><i style="background:#e5484d"></i>${T('q.full')}</span></div></div>
 <div class="slot-grid">${QS.map((s,k)=>{const b=QB[AX.qb][k],p=b/cap,c=b>=cap?'err':p>.6?'warn':'ok';return `<div class="slot-c ${c}"><b>${s}</b><div class="bar-s"><i style="width:${Math.min(100,p*100)}%"></i></div><span>${b}/${cap}</span></div>`}).join('')}</div></div>
 <div class="panel"><div class="row between mb-3"><h3>${T('q.todayList')}</h3>${demoChip()}</div><table class="tbl"><thead><tr><th>${T('q.thTime')}</th><th>${T('q.thClient')}</th><th>${T('q.thCar')}</th><th>${T('q.thPkg')}</th></tr></thead><tbody>
 ${[0,1,2,3,4,5].map(k=>`<tr><td><b>${QS[k+2]}</b></td><td><div class="who"><div class="av">${AN[k][0]}</div><b>${AN[k]}</b></div></td><td>${CARS[k]}</td><td><span class="chip orange">${L(DATA.packages[k%3].name)}</span></td></tr>`).join('')}</tbody></table></div></div>`};

/* ---------- Plate camera ---------- */
function plateFeed(){const d=PD[AX.pl%PD.length],ok=d.s==='ok';
 return `<div class="cam"><div class="cam-view">${camSvg()}<div class="cam-hud"><span class="rec"><i></i> ${T('p.live')}</span><span class="cam-name">${T('p.cam')} · ${bfx('b1')}</span><span class="cam-ts" dir="ltr">2026-10-27 · 09:41:${String(12+AX.pl*7%48).padStart(2,'0')}</span></div>
 <div class="plate-box ${ok?'':'bad'}"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><span class="scanl"></span><div class="plate-in">${plateHtml(d.p)}</div></div>
 <div class="det-card ${PCH[d.s]}"><div class="row between"><span class="muted xs">${T('p.detected')}</span><b>${d.c}%</b></div><div class="det-num" dir="ltr">${d.p}</div><div class="row gap-2" style="margin-top:6px"><span class="chip ${PCH[d.s]}">${T('p.st.'+d.s)}</span></div></div></div>
 <div class="cam-info"><div class="ci"><span class="muted xs">${T('p.client')}</span><b>${d.n}</b><span class="muted xs">${d.car}</span></div><div class="ci"><span class="muted xs">${T('p.pkg')}</span><b>${d.pk<0?'—':L(DATA.packages[d.pk].name)}</b></div><div class="ci"><span class="muted xs">${T('p.left')}</span><b>${d.s==='none'?'—':ok?d.left-1:d.left}</b>${ok?`<span class="muted xs">(${d.left} ← ${d.left-1})</span>`:''}</div><div class="ci act"><span class="act-t ${PCH[d.s]}">${ic(ok?'checkc':'warn',20)} ${T('p.action.'+d.s)}</span></div></div>
 <div class="row gap-2 mt-3"><button class="btn btn-primary inline" data-x="plsim">${ic('camera',19)} ${T('p.sim')}</button></div></div>`}
V.plates=()=>kpis([[T('p.k1'),'214','+9%','camera','o'],[T('p.k2'),'91%','+3%','scan','b'],[T('p.k3'),'187','+14%','checkc','g'],[T('p.k4'),'19','−5%','warn']])+
 `<div class="grid g2"><div class="panel">${plateFeed()}</div><div class="panel"><div class="row between mb-3"><div><h3>${T('p.log')}</h3><div class="muted sm">${T('p.logSub')}</div></div>${demoChip()}</div>
 <div class="list plog">${PD.map((d,k)=>`<div class="plog-i ${AX.pl%PD.length===k?'on':''}" data-x="plsel" data-v="${k}">${plateHtml(d.p)}<div class="grow"><b>${d.n}</b><div class="muted xs">09:${String(41-k*4).padStart(2,'0')} · ${d.c}%</div></div><span class="chip ${PCH[d.s]}">${T('p.s.'+d.s)}</span></div>`).join('')}</div>
 <div class="divider"></div><h3 class="mb-2">${T('p.settings')}</h3>${setRow(T('p.s1'),tog('',1))}${setRow(T('p.s2'),tog('',1))}${setRow(T('p.s3'),tog('',1))}${setRow(T('p.s4'),tog('',0))}</div></div>
 <div class="panel mt-4"><div class="row between mb-3"><div><h3>${T('p.cams')}</h3><div class="muted sm">${T('p.camsSub')}</div></div></div><div class="grid g4">${['b1','b2','b3','b4'].map((b,i)=>`<div class="cam-mini"><div class="cm-pic">${camSvg(i)}<span class="rec sm"><i></i> ${T('p.live')}</span></div><div class="row between"><b>${bfx(b)}</b><span class="chip ok">${T('p.online')}</span></div></div>`).join('')}</div></div>`;

/* ---------- Ratings ---------- */
const RB=[['b1',4.8,412],['b2',4.6,508],['b3',4.7,276],['b4',4.4,331]];
const RE=AN.map((n,i)=>({n,b:'b'+(1+i%4),a:[4.9,4.8,4.8,4.7,4.6,4.5,4.3,4.1][i],c:[142,128,117,103,96,88,71,64][i],tip:[640,552,498,410,380,332,220,148][i],tr:[1,1,0,1,0,-1,-1,-1][i]}));
const RC=[[5,'غسلة ممتازة والسيارة لمعت!','خالد المري','b1'],[5,'سرعة وإتقان، شكراً لفريق لوسيل.','فهد الكعبي','b3'],[4,'جيد جداً لكن الانتظار كان طويلاً.','سارة العبدالله','b2'],[2,'الداخل ما انظّف بالكامل.','ناصر الدوسري','b4'],[5,'خدمة راقية والعامل محترم.','مريم الكعبي','b1']];
V.ratings=()=>kpis([[T('r.k1'),'4.7','+0.1','star','o'],[T('r.k2'),'1,527','+16%','chat','b'],[T('r.k3'),qar(5120),'+22%','coin','g'],[T('r.k4'),'72%','+4%','sparkle']])+
 `<div class="grid g2e"><div class="panel"><div class="row between mb-3"><div><h3>${T('r.byBranch')}</h3><div class="muted sm">${T('r.byBranchSub')}</div></div>${demoChip()}</div>${RB.map(r=>`<div class="mb-3"><div class="row between sm b"><span>${bfx(r[0])}</span><span class="row gap-2">${stars(r[1],14)} <b>${r[1]}</b> <span class="muted xs">(${nQ(r[2])})</span></span></div><div class="bar"><i style="width:${(r[1]-3)/2*100}%"></i></div></div>`).join('')}</div>
 <div class="panel"><h3 class="mb-3">${T('r.dist')}</h3>${[[5,72],[4,18],[3,6],[2,3],[1,1]].map(d=>`<div class="row gap-3 mb-2 sm"><b style="width:52px">${d[0]} ${ic('star',14)}</b><div class="bar grow"><i style="width:${d[1]}%;${d[0]<3?'background:#e5484d':''}"></i></div><span class="muted" style="width:40px"><bdi>${d[1]}%</bdi></span></div>`).join('')}</div></div>
 <div class="grid g2 mt-4"><div class="panel"><div class="toolbar"><div class="grow"><h3>${T('r.emp')}</h3><div class="muted sm">${T('r.empSub')}</div></div><button class="btn btn-aqua inline" data-x="toast" data-v="${T('r.exported')}">${ic('download',19)} ${T('r.export')}</button></div>
 <table class="tbl"><thead><tr><th>${T('r.thEmp')}</th><th>${T('r.thBranch')}</th><th>${T('r.thAvg')}</th><th>${T('r.thCnt')}</th><th>${T('r.thTips')}</th><th>${T('r.thTrend')}</th></tr></thead><tbody>${RE.map(e=>`<tr><td><div class="who"><div class="av">${e.n[0]}</div><b>${e.n}</b></div></td><td>${bfx(e.b)}</td><td>${stars(e.a,13)} <b>${e.a}</b>${e.a<4.4?` <span class="chip warn">${T('r.low')}</span>`:''}</td><td>${nQ(e.c)}</td><td>${qar(e.tip)}</td><td><span class="trend ${e.tr>0?'up':e.tr<0?'dn':''}">${e.tr>0?'▲':e.tr<0?'▼':'—'}</span></td></tr>`).join('')}</tbody></table></div>
 <div class="panel"><h3 class="mb-3">${T('r.latest')}</h3><div class="list">${RC.map(c=>`<div class="cmt"><div class="row between">${stars(c[0],14)}<span class="muted xs">${bfx(c[3])}</span></div><p>${c[1]}</p><span class="muted xs">${c[2]}</span></div>`).join('')}</div></div></div>`;

/* ---------- Referrals ---------- */
const RF=[['خالد المري','عبدالله الكعبي','2026-10-26','joined'],['سارة العبدالله','هند المري','2026-10-25','joined'],['فهد الكعبي','ناصر النعيمي','2026-10-24','pending'],['نورة السليطي','لينا البدر','2026-10-22','joined'],['يوسف النعيمي','سلمان الهاجري','2026-10-18','expired'],['مريم الكعبي','فاطمة الدوسري','2026-10-17','pending'],['علي البدر','محمد الأنصاري','2026-10-15','joined']];
const RS={joined:['ok','joined'],pending:['warn','pending'],expired:['gray','expired']};
V.referrals=()=>kpis([[T('f.k1'),'1,240','+21%','send','o'],[T('f.k2'),'612','+18%','users','b'],[T('f.k3'),'1,010','+25%','gift','g'],[T('f.k4'),qar(35350),'','coin']])+
 `<div class="grid g2"><div class="panel"><div class="row between mb-3"><h3>${T('f.list')}</h3>${demoChip()}</div><table class="tbl"><thead><tr><th>${T('f.thRef')}</th><th>${T('f.thFriend')}</th><th>${T('f.thDate')}</th><th>${T('f.thStat')}</th><th>${T('f.thReward')}</th></tr></thead><tbody>
 ${RF.map(r=>`<tr><td><div class="who"><div class="av">${r[0][0]}</div><b>${r[0]}</b></div></td><td>${r[1]}</td><td>${fmtDate(r[2])}</td><td><span class="chip ${RS[r[3]][0]}">${T('f.'+RS[r[3]][1])}</span></td><td>${r[3]==='joined'?`<span class="muted sm">${T('f.freeWash')}</span>`:'—'}</td></tr>`).join('')}</tbody></table></div>
 <div class="col" style="gap:18px"><div class="panel"><h3>${T('f.program')}</h3><div class="muted sm mb-3">${demoChip()}</div>${setRow(T('f.on'),tog('',1))}${setRow(T('f.reward'),`<b>${T('f.rewardTxt')}</b>`)}${setRow(T('f.cap'),`<b>10 ${T('f.washes')}</b>`)}${setRow(T('f.valid'),`<b>${T('f.daysV')}</b>`)}<button class="btn btn-primary inline mt-3" data-x="toast" data-v="${T('f.saved')}">${T('f.save')}</button></div>
 <div class="panel"><h3 class="mb-3">${T('f.top')}</h3>${[[AN[0],48],[AF[0],37],[AN[1],29],[AF[1],21]].map((x,i)=>`<div class="row gap-3 mb-2"><span class="rank">${i+1}</span><div class="who grow"><div class="av">${x[0][0]}</div><b>${x[0]}</b></div><span class="chip orange">${x[1]} ${T('f.friends')}</span></div>`).join('')}</div></div></div>`;

/* ---------- Gifts ---------- */
const GF=[['سارة العبدالله','نورة السليطي',2,'birthday','2026-10-26','redeemed'],['خالد المري','فهد الكعبي',1,'eid','2026-10-25','opened'],['هند المري','مريم الكعبي',2,'thanks','2026-10-24','sent'],['فهد الكعبي','علي البدر',0,'new','2026-10-21','redeemed'],['ناصر الدوسري','يوسف النعيمي',2,'birthday','2026-10-19','redeemed'],['لينا الأنصاري','سلمان الأنصاري',1,'thanks','2026-10-17','sent']];
const GS={redeemed:'ok',opened:'info',sent:'warn'};
V.gifts=()=>kpis([[T('g.k1'),'186','+31%','gift','o'],[T('g.k2'),qar(24640),'+28%','wallet','g'],[T('g.k3'),'71%','+5%','checkc','b'],[T('g.k4'),'54','','clock']])+
 `<div class="grid g2"><div class="panel"><div class="row between mb-3"><h3>${T('g.list')}</h3>${demoChip()}</div><table class="tbl"><thead><tr><th>${T('g.thFrom')}</th><th>${T('g.thTo')}</th><th>${T('g.thPkg')}</th><th>${T('g.thOcc')}</th><th>${T('g.thDate')}</th><th>${T('g.thVal')}</th><th>${T('g.thStat')}</th></tr></thead><tbody>
 ${GF.map(r=>`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td><span class="chip orange">${L(DATA.packages[r[2]].name)}</span></td><td>${T('g.occ.'+r[3])}</td><td>${fmtDate(r[4])}</td><td>${qar(DATA.packages[r[2]].price)}</td><td><span class="chip ${GS[r[5]]}">${T('g.'+r[5])}</span></td></tr>`).join('')}</tbody></table></div>
 <div class="col" style="gap:18px"><div class="panel"><h3>${T('g.settings')}</h3><div class="muted sm mb-3">${demoChip()}</div>${setRow(T('g.s1'),tog('',1))}${setRow(T('g.s2'),tog('',1))}${setRow(T('g.s3'),tog('',1))}${setRow(T('g.exp'),`<b>${T('g.expV')}</b>`)}<button class="btn btn-primary inline mt-3" data-x="toast" data-v="${T('g.saved')}">${T('g.save')}</button></div>
 <div class="panel"><h3 class="mb-3">${T('g.tpl')}</h3><div class="wa-prev"><div class="wa-b">${T('g.tplBody',{name:'نورة',pkg:'الشهري',from:'سارة'}).replace(/\n/g,'<br>')}<br><span class="wa-l" dir="ltr">${T('g.tplLink')}</span></div></div></div></div></div>`;

/* ---------- Loyalty settings ---------- */
const LT=[['silver',0,1,'#b9c4d6',612],['gold',1500,1.5,'#f2b01e',318],['plat',4000,2,'#7fd0e8',94]];
V.loyalty=()=>`<div class="grid g2"><div class="panel"><div class="row between mb-3"><div><h3>${T('l.tiers')}</h3><div class="muted sm">${T('l.tiersSub')}</div></div>${demoChip()}</div>
 <div class="grid g3">${LT.map(x=>`<div class="tier-c" style="--tc:${x[3]}"><div class="tier-h"><span class="medal">${ic('medal',26)}</span><b>${T('l.t.'+x[0])}</b><span class="chip gray">${nQ(x[4])} ${T('l.members')}</span></div>
 <label class="muted xs">${T('l.from')}</label><div class="input-u"><input class="input" value="${x[1]}"><span>${T('l.pts')}</span></div><label class="muted xs">${T('l.mult')}</label><div class="input-u"><input class="input" value="×${x[2]}"><span></span></div><div class="muted xs" style="margin-top:10px">${T('l.benefits')}</div><p class="sm b" style="margin:4px 0 0">${T('l.b.'+x[0])}</p></div>`).join('')}</div>
 <div class="divider"></div><h3 class="mb-3">${T('l.dist')}</h3><div class="dist-bar">${LT.map(x=>`<i style="flex:${x[4]};background:${x[3]}">${T('l.t.'+x[0])} · ${nQ(x[4])}</i>`).join('')}</div></div>
 <div class="col" style="gap:18px"><div class="panel"><h3 class="mb-3">${T('l.earn')}</h3>${[['e1',10],['e2',5],['e3',100],['e4',2]].map(e=>setRow(T('l.'+e[0]),`<div class="input-u sm"><input class="input" value="${e[1]}"><span>${T('l.pts')}</span></div>`)).join('')}
 ${setRow(T('l.redeem'),`<b>${T('l.redeemV')}</b>`)}${setRow(T('l.expiry'),`<b>${T('l.expV')}</b>`)}</div>
 <div class="panel"><h3>${T('l.punch')}</h3><div class="muted sm mb-3">${T('l.punchSub')}</div><div class="row gap-3"><div class="input-u sm"><input class="input" value="8"><span>${T('f.washes')}</span></div></div><div class="punch mt-3">${Array.from({length:8},(_,i)=>`<i class="${i<5?'on':''}">${i===7?ic('gift',16):ic('drop',16)}</i>`).join('')}</div><button class="btn btn-primary inline mt-3" data-x="toast" data-v="${T('l.saved')}">${T('l.save')}</button></div></div></div>`;

/* ---------- Family / corporate ---------- */
const CO=[['شركة الأفق للتجارة (تجريبية)',24,2,214,6720,'active'],['مؤسسة الريان للنقل (تجريبية)',16,2,131,4480,'active'],['مكتب النخبة للاستشارات (تجريبي)',6,1,46,1074,'review'],['شركة لؤلؤة للمقاولات (تجريبية)',11,2,88,3080,'active']];
const FM=[['عائلة العبدالله',4],['عائلة الكعبي',3],['عائلة المري',5],['عائلة السليطي',2]];
V.corp=()=>kpis([[T('c.k1'),'18','+3','briefcase','o'],[T('c.k2'),'214','+26','truck','b'],[T('c.k3'),'96','+11%','users','g'],[T('c.k4'),qar(15280),'+19%','receipt']])+
 `<div class="panel"><div class="toolbar"><h3 class="grow">${T('c.corp')}</h3>${demoChip()}<button class="btn btn-primary inline" data-x="toast" data-v="${T('c.added')}">${ic('plus',19)} ${T('c.addCorp')}</button></div><table class="tbl"><thead><tr><th>${T('c.thName')}</th><th>${T('c.thCars')}</th><th>${T('c.thPlan')}</th><th>${T('c.thUsed')}</th><th>${T('c.thInv')}</th><th>${T('c.thStat')}</th></tr></thead><tbody>
 ${CO.map(c=>`<tr><td><div class="who"><div class="av">${ic('briefcase',18)}</div><b>${c[0]}</b></div></td><td><b>${c[1]}</b> <span class="muted xs">${T('c.carsWord')}</span></td><td><span class="chip orange">${L(DATA.packages[c[2]].name)}</span></td><td>${nQ(c[3])}</td><td>${qar(c[4])}</td><td><span class="chip ${c[5]==='active'?'ok':'warn'}">${T('c.'+c[5])}</span></td></tr>`).join('')}</tbody></table></div>
 <div class="grid g2e mt-4"><div class="panel"><h3 class="mb-3">${T('c.fleet')} — ${CO[0][0]}</h3><table class="tbl"><thead><tr><th>${T('q.thCar')}</th><th>${T('p.thPlate')}</th><th>${T('c.thUsed')}</th></tr></thead><tbody>${[0,1,2,3,4].map(k=>`<tr><td>${CARS[k]}</td><td>${plateHtml(String(300+k*61)+' '+String(500+k*77))}</td><td><b>${6-k%3}</b>/8</td></tr>`).join('')}</tbody></table></div>
 <div class="panel"><h3 class="mb-3">${T('c.family')}</h3>${FM.map(f=>`<div class="row gap-3 mb-3"><div class="av">${f[0][5]}</div><div class="grow"><b>${f[0]}</b><div class="muted xs">${f[1]} ${T('c.carsWord')} · ${T('c.perm')}</div></div><span class="chip ok">${T('c.active')}</span></div>`).join('')}</div></div>`;

/* ---------- register tabs ---------- */
[['queue','clock','tab.queue'],['plates','camera','tab.plates'],['ratings','star','tab.ratings'],['referrals','send','tab.referrals'],['gifts','gift','tab.gifts'],['loyalty','crown','tab.loyalty'],['corp','briefcase','tab.corp']].forEach(x=>{tabs.push([x[0],x[1],T(x[2])]);tn[x[0]]=T(x[2])});
{const base=render;render=function(){base();const side=document.querySelector('.side');if(!side)return;
 const mk=(txt)=>{const d=document.createElement('div');d.className='nav-sec';d.textContent=txt;return d};
 const items=[...side.querySelectorAll('.nav-i')];const q=items.find(a=>a.getAttribute('href')==='#queue'),l=items.find(a=>a.getAttribute('href')==='#referrals');
 if(q)side.insertBefore(mk(T('nav.ops')),q);if(l)side.insertBefore(mk(T('nav.growth')),l);}}
document.addEventListener('click',e=>{const el=e.target.closest('[data-x]');if(!el)return;const a=el.dataset.x,v=el.dataset.v;
 if(a==='toast'){toastD(v)}
 else if(a==='qb'){if(e.target.closest('[data-x=qpause]'))return;AX.qb=v;render()}
 else if(a==='qpause'){AX.sw['p'+v]=!AX.sw['p'+v];render()}
 else if(a==='plsim'){AX.pl=(AX.pl+1)%PD.length;render()}
 else if(a==='plsel'){AX.pl=+v;render()}});
