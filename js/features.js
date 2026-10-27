/* Go Cleans — new customer features (all data FAKE / demo). Loaded after app.js.
   Screens: book, booked, track, plate, loyalty, refer, family, gift, giftsent, weather, rate, store, cart, wallet */

/* ---------- extra icons ---------- */
/* icons: see icons-more.js */

/* ---------- Dictionary ---------- */
/* (strings live in js/i18n-features.js) */

/* ---------- demo data + state ---------- */
const FD={
  q:{b1:{ahead:3,wait:12,lanes:3,free:1},b2:{ahead:6,wait:24,lanes:3,free:0},b3:{ahead:1,wait:5,lanes:2,free:1},b4:{ahead:9,wait:38,lanes:3,free:0}},
  days:[['2026-10-27'],['2026-10-28'],['2026-10-29'],['2026-10-30']],
  slots:['8:00 ص','8:30 ص','9:30 ص','10:30 ص','11:30 ص','12:30 م','2:00 م','4:00 م','5:30 م','6:30 م','7:30 م','9:00 م'],
  avail:[[4,2,0,3,5,1,6,2,0,4,3,5],[5,4,3,6,2,0,4,5,3,2,6,4],[2,0,5,4,4,3,1,6,5,0,2,3],[6,5,4,3,0,2,5,4,3,6,5,4]],
  tiers:[
    {id:'silver',from:0,mult:'1x',icon:'medal',c:'#c5cee0',c2:'#8392ad'},
    {id:'gold',from:1000,mult:'1.5x',icon:'crown',c:'#ffd27a',c2:'#e39a1f'},
    {id:'plat',from:2500,mult:'2x',icon:'sparkle',c:'#bfe6f7',c2:'#5ea3c9'}
  ],
  friends:[{n:'سعد م.',st:'done',d:'2026-10-18'},{n:'نورة ع.',st:'done',d:'2026-10-09'},{n:'فهد ك.',st:'join',d:'2026-10-24'},{n:'مريم ح.',st:'sent',d:'2026-10-26'}],
  fam:[{id:'m1',n:'عميل تجريبي',role:'owner',car:'لاند كروزر',plate:'111 222',used:3,cap:8},{id:'m2',n:'نورة (الزوجة)',role:'member',car:'لكزس ES 350',plate:'555 666',used:2,cap:8},{id:'m3',n:'خالد (الابن)',role:'member',car:'التيما',plate:'333 444',used:1,cap:8}],
  fleet:[['741 118','سائق 1','فان توصيل','today','ok'],['742 205','سائق 2','فان توصيل','3d','ok'],['743 331','سائق 3','بيك أب','9d','due'],['744 472','سائق 4','سيدان إدارة','1d','ok'],['745 560','سائق 5','فان توصيل','12d','due'],['746 689','سائق 6','بيك أب','5d','ok']],
  prods:[
    {id:'p1',n:'عطر العود الفاخر',d:'يدوم حتى 3 أسابيع',p:15,cat:'scent',i:'perfume',g:['#ff9a1f','#ff6a00']},
    {id:'p2',n:'عطر الليمون المنعش',d:'رائحة منعشة وخفيفة',p:10,cat:'scent',i:'drop',g:['#9be15d','#38b76a']},
    {id:'p3',n:'تلميع الهيكل',d:'لمعان مرآة بطبقة واقية',p:60,cat:'polish',i:'shine',g:['#66b8d9','#3a7af0']},
    {id:'p4',n:'تشميع سريع',d:'حماية من الغبار والشمس',p:40,cat:'polish',i:'sparkle',g:['#ffd27a','#e39a1f']},
    {id:'p5',n:'تنظيف داخلي عميق',d:'مقاعد وأرضيات وطبلون',p:45,cat:'inside',i:'vac',g:['#7aa7ff','#4a5fe0']},
    {id:'p6',n:'تعقيم وإزالة الروائح',d:'تعقيم بالبخار',p:35,cat:'inside',i:'bubble',g:['#6ee7d3','#12a89a']},
    {id:'p7',n:'حماية السيراميك السريعة',d:'تدوم حتى 3 أشهر',p:90,cat:'protect',i:'shield',g:['#a58bff','#6c4de0']},
    {id:'p8',n:'عناية بالجلد',d:'ترطيب وحماية المقاعد',p:40,cat:'inside',i:'heart',g:['#ff9aa8','#e5446d']},
    {id:'p9',n:'زجاج طارد للمطر',d:'رؤية أوضح تحت المطر',p:25,cat:'protect',i:'rain',g:['#8fd3ff','#2f8de8']},
    {id:'p10',n:'تلميع الإطارات',d:'لمعان أسود عميق',p:10,cat:'polish',i:'car',g:['#7c8aa5','#3a455f']}
  ],
  cats:['all','scent','polish','inside','protect'],
  events:[{d:'2026-10-25',tm:'9:15 ص',br:'b1',plate:'111 222',left:5},{d:'2026-10-22',tm:'6:40 م',br:'b2',plate:'111 222',left:6},{d:'2026-10-20',tm:'4:05 م',br:'b1',plate:'111 222',left:7}],
  forecast:[['sun','اليوم','dust',41],['wind','غداً','dust',39],['sun','الخميس','clear',38],['rain','الجمعة','rain',33],['sun','السبت','clear',35]]
};
DATA.user.tierPts=1840;
const FS={
  book:{br:'b1',day:0,slot:'10:30 ص',car:'c1',booked:null,ahead:4,notified:false},
  track:{active:true,s:2,p:62,auto:false},
  plate:{on:true,auto:{c1:true,c2:true,c3:false}},
  loy:{tier:'gold'},
  fam:{tab:'family',members:FD.fam.slice()},
  gift:{pkg:'monthly',name:'سعد',mobile:'5000 0123',occ:'eid',msg:'',sent:false},
  weather:{dust:true,rain:true,wind:false,due:true,sens:'mid',alert:true,quiet:true},
  rate:{stars:5,tags:['clean'],tip:10,comment:'',done:false},
  store:{cat:'all',cart:{p1:1,p4:1}},
  cartDone:false,
  wallet:{added:false},
  push:null
};
const TIER_PTS=()=>DATA.user.tierPts;
const curTier=()=>{let c=FD.tiers[0];FD.tiers.forEach(x=>{if(TIER_PTS()>=x.from)c=x});return c};
const nextTier=()=>FD.tiers[FD.tiers.findIndex(x=>x.id===curTier().id)+1];
const cartCount=()=>Object.values(FS.store.cart).reduce((a,b)=>a+b,0);
const cartTotal=()=>Object.entries(FS.store.cart).reduce((a,[id,q])=>a+FD.prods.find(p=>p.id===id).p*q,0);
const wd=iso=>fmtDate(iso,{weekday:'long'});
const dayLbl=i=>i===0?t('fx.today'):i===1?t('fx.tomorrow'):wd(FD.days[i][0]);
const sel=(cond,extra='')=>`card sel tap ${cond?'on':''} ${extra}`;

/* QR (decorative, deterministic — not a real code) */
function qrSvg(seed=7,n=25,px=8,fg='#0b1d45'){
  let s=seed*9301+49297;const r=()=>{s=(s*9301+49297)%233280;return s/233280};
  const fin=(x,y)=>(x<7&&y<7)||(x>=n-7&&y<7)||(x<7&&y>=n-7);
  let d='';
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){if(fin(x,y))continue;if(r()>.52)d+=`M${x} ${y}h1v1h-1z`}
  const f=(x,y)=>`<rect x="${x+.5}" y="${y+.5}" width="6" height="6" rx="1.4" fill="none" stroke="${fg}" stroke-width="1"/><rect x="${x+2}" y="${y+2}" width="3" height="3" rx=".8" fill="${fg}"/>`;
  return `<svg viewBox="0 0 ${n} ${n}" width="${n*px}" height="${n*px}" shape-rendering="crispEdges" role="img" aria-label="QR">${f(0,0)}${f(n-7,0)}${f(0,n-7)}<path d="${d}" fill="${fg}"/></svg>`}

/* header used by every new sub-screen */
const fhero=(title,sub,back='home',right='',pb=64,extra='')=>`<div class="hero" style="padding-bottom:${pb}px">${ART.bubbles(6)}<div class="row"><button class="iconbtn glass" data-go="${back}" aria-label="${t('back')}">${ic('back')}</button><div class="grow"><div class="hero-title" style="font-size:22px">${title}</div>${sub?`<div class="hero-sub">${sub}</div>`:''}</div>${right}</div>${extra}</div>`;
const fbody=(inner,pull=-44)=>`<div class="fx-body" style="margin-top:${pull}px">${inner}</div>`;
const fsec=(title,right='')=>`<div class="section-h"><h3>${title}</h3>${right}</div>`;
const demoTag=()=>`<span class="chip glass" style="height:22px;font-size:11px">${t('fx.demo')}</span>`;
const livedot=()=>`<i class="live"></i>`;

/* ---------- push notification overlay ---------- */
function pushNote(o){FS.push=Object.assign({shown:false},o);clearTimeout(pushNote._t);paint();if(!o.sticky)pushNote._t=setTimeout(()=>{FS.push=null;paint()},9000)}
function pushHtml(){const p=FS.push;if(!p)return '';const h=`<div class="push ${p.shown?'noanim':''}" data-act="pushOpen"><div class="push-ic"><img src="assets/logo192.png" alt=""></div><div class="grow"><div class="row between"><b class="xs" style="opacity:.8">${t('brand')}</b><span class="xs" style="opacity:.6">${t('fx.now')}</span></div><div class="push-t">${p.title}</div><div class="push-b">${p.body}</div>${p.actions?`<div class="row gap-2" style="margin-top:8px">${p.actions}</div>`:''}</div></div>`;p.shown=true;return h}
const _paint=paint;
paint=function(){_paint();const pc=$app.querySelector('.phone-content');if(pc&&FS.push)pc.insertAdjacentHTML('beforeend',pushHtml())};

/* extend sheetHtml */
const FSHEET={};
const _sheetHtml=sheetHtml;
sheetHtml=function(){const [n,id]=(S.sheet.n||'').split(':');if(FSHEET[n])return FSHEET[n](id,S.sheet.d);return _sheetHtml()};

/* =====================================================================
   1) Booking + live queue
   ===================================================================== */
const busyChip=b=>{const w=FD.q[b].wait;return w<=15?`<span class="chip ok">${t('fx.q.calm')}</span>`:w<=25?`<span class="chip warn">${t('fx.q.mid')}</span>`:`<span class="chip err">${t('fx.q.busy')}</span>`};
function queueCard(b,ahead){const q=FD.q[b],a=ahead??q.ahead;const cars=Array.from({length:Math.min(a,8)},(_,i)=>`<span class="qcar" style="animation-delay:${i*.15}s">${ic('car',18)}</span>`).join('');
  return `<div class="queue-card"><div class="row between"><div class="row gap-2"><span class="live"></span><b>${t('fx.q.live')}</b></div><span class="chip glass">${L(branchById(b).name)}</span></div>
  <div class="row mt-4" style="gap:0"><div class="qstat"><div class="qn"><span data-count="${a}">${a}</span></div><div class="ql">${t('fx.q.ahead')}</div></div><div class="qdiv"></div><div class="qstat"><div class="qn">~<span>${q.wait+(a-q.ahead)*4}</span><small>${t('fx.min')}</small></div><div class="ql">${t('fx.q.wait')}</div></div><div class="qdiv"></div><div class="qstat"><div class="qn"><span>${q.free}</span><small>/${q.lanes}</small></div><div class="ql">${t('fx.q.lanes')}</div></div></div>
  <div class="qlane mt-4"><div class="qroad"></div><div class="qcars">${cars}</div><div class="qgate">${ic('drop',22)}</div></div>
  <div class="xs mt-3" style="opacity:.65">${t('fx.q.refresh')}</div></div>`}

SCREENS.book={sb:'light',flush:true,html:()=>{const B=FS.book,q=FD.q[B.br];
  const av=FD.avail[B.day];
  return `${fhero(t('fx.book.t'),t('fx.book.d'),'home','',70)}
  ${fbody(`
  <div class="card" style="padding:12px"><div class="b mb-2" style="padding:2px 4px">${t('fx.book.branch')}</div>
   ${DATA.branches.map(b=>`<div class="brrow ${B.br===b.id?'on':''}" data-act="bkBranch" data-arg="${b.id}"><span class="radio"></span><div class="grow"><div class="b">${L(b.name)}</div><div class="muted xs">${t('fx.book.away',{n:b.dist})} · ${t('fx.q.carsn',{n:FD.q[b.id].ahead})}</div></div>${busyChip(b.id)}</div>`).join('')}</div>
  <div class="mt-3">${queueCard(B.br)}</div>
  ${fsec(t('fx.book.when'))}
  <div class="pills">${FD.days.map((d,i)=>`<button class="pill ${B.day===i?'on':''}" data-act="bkDay" data-arg="${i}">${dayLbl(i)}<span class="xs" style="opacity:.7;margin-inline-start:6px">${fmtDate(d[0],{day:'numeric',month:'numeric'})}</span></button>`).join('')}</div>
  <div class="slots mt-2">${FD.slots.map((s,i)=>`<button class="slot ${B.slot===s?'on':''} ${av[i]===0?'full':''}" ${av[i]===0?'disabled':''} data-act="bkSlot" data-arg="${s}"><b>${s}</b><span>${av[i]===0?t('fx.slot.full'):t('fx.slot.left',{n:av[i]})}</span></button>`).join('')}</div>
  <div class="card mt-3"><div class="row"><div class="ico-sq">${ic('car',22)}</div><div class="grow"><div class="muted xs">${t('fx.book.car')}</div><div class="b">${(c=>c.make+' '+c.model)(carById(B.car,S.cars))}</div></div>${plateHtml(carById(B.car,S.cars).plate)}</div></div>
  <div class="banner info mt-3">${ic('bell')}<div class="sm">${t('fx.book.notify')}</div></div>
  <button class="btn btn-primary mt-3" data-act="bkConfirm">${ic('calendar',20)} ${t('fx.book.confirm')}</button>`)}`},after:null};

SCREENS.booked={sb:'light',flush:true,html:()=>{const B=FS.book,br=branchById(B.br),a=B.ahead;
  return `<div class="hero" style="padding-bottom:84px;text-align:center">${ART.bubbles(8)}${ART.confetti?ART.confetti():''}<div class="successmark" style="margin:20px auto 14px">${ic('check',44)}</div><div class="hero-title">${t('fx.booked.t')}</div><div class="hero-sub mt-2">${t('fx.booked.d')}</div></div>
  ${fbody(`<div class="ticket"><div class="tk-top"><div class="row between"><div><div class="muted xs">${t('fx.tk.no')}</div><div class="tk-no"><bdi>GC-27${B.br.slice(1)}</bdi></div></div><div style="background:#fff;padding:6px;border-radius:12px;border:1px solid var(--line)">${qrSvg(3,21,4)}</div></div>
    <div class="kv mt-3"><span>${t('fx.tk.branch')}</span><b>${L(br.name)}</b></div><div class="kv"><span>${t('fx.tk.when')}</span><b>${dayLbl(B.day)} · ${B.slot}</b></div><div class="kv"><span>${t('fx.tk.car')}</span>${plateHtml(carById(B.car,S.cars).plate)}</div></div>
    <div class="tk-cut"><i></i><i></i></div>
    <div class="tk-bot"><div class="row between"><div class="b">${t('fx.booked.live')}</div><span class="chip ${a<=2?'orange':'info'}">${a<=2?t('fx.booked.near'):t('fx.booked.wait')}</span></div>
    <div class="row mt-3" style="gap:14px;align-items:center"><div class="ring-s" style="--p:${Math.max(8,100-a*18)}"><div><b>${a}</b></div></div><div class="grow"><div class="b">${t('fx.q.carsn',{n:a})}</div><div class="muted sm">${t('fx.booked.eta',{n:a*4+3})}</div></div></div></div></div>
  ${FS.cartDone?'':`<div class="card tap mt-3" data-go="store"><div class="row"><div class="ico-sq o">${ic('bag',22)}</div><div class="grow"><div class="b">${t('fx.booked.addons')}</div><div class="muted xs">${t('fx.booked.addons.d')}</div></div><span class="chev flip">${ic('next')}</span></div></div>`}
  <div class="row gap-2 mt-3"><button class="btn btn-ghost" data-act="simTurn">${ic('bell',19)} ${t('fx.booked.sim')}</button><button class="btn btn-primary" data-go="track">${ic('drop',19)} ${t('fx.booked.track')}</button></div>
  <div class="muted xs center mt-3">${t('fx.sim.note')}</div>`,-60)}`}};

/* =====================================================================
   2) Live wash tracking
   ===================================================================== */
const STEPS=[['recv','car'],['wash','bubble'],['dry','sparkle'],['ready','checkc']];
function trackProgress(){const T=FS.track;return Math.min(100,Math.round(T.s*33.3+(T.s<3?T.p/100*33.3:0)))}
SCREENS.track={sb:'light',flush:true,html:()=>{const T=FS.track,pct=trackProgress(),done=T.s===3,car=carById('c1',S.cars);
  const photo=done?`<div class="afterphoto"><img src="img/car-lexus-lx.jpg" alt=""><div class="ap-badge">${ic('sparkle',14)} ${t('fx.tr.after')}</div><div class="ap-spark s1"></div><div class="ap-spark s2"></div><div class="ap-spark s3"></div><button class="ap-save" data-act="toast" data-arg="${t('fx.tr.saved')}">${ic('download',16)} ${t('fx.tr.save')}</button></div>`:`<div class="track-art">${ART.car({src:'img/wash-foam.jpg',h:190,pos:'center 42%',cls:'inwash'})}<div class="foamline"></div></div>`;
  return `<div class="hero" style="padding-bottom:${done?150:130}px">${ART.bubbles(done?4:10)}<div class="row"><button class="iconbtn glass" data-go="home" aria-label="${t('back')}">${ic('back')}</button><div class="grow"><div class="hero-title" style="font-size:22px">${done?t('fx.tr.done'):t('fx.tr.t')}</div><div class="hero-sub">${L(branchById('b1').name)} · ${t('fx.tr.bay',{n:2})}</div></div>${done?'':`<span class="chip glass">${livedot()} ${t('fx.live')}</span>`}</div>
    <div class="mt-4">${photo}</div></div>
  ${fbody(`<div class="card" style="padding:18px">
    <div class="row between"><div class="row gap-2">${plateHtml(car.plate)}<span class="b sm">${car.make} ${car.model}</span></div><span class="chip ${done?'ok':'orange'}">${done?t('fx.tr.ready'):t('fx.tr.eta',{n:Math.max(1,Math.round((100-pct)/100*14))})}</span></div>
    <div class="vstep mt-4" style="--pp:${pct}">
      <div class="vline"><i style="height:${pct}%"></i></div>
      ${STEPS.map((s,i)=>{const st=i<T.s?'ok':i===T.s?(done?'ok':'now'):'';const tm=['9:02','9:06','9:13','9:19'][i];
        return `<div class="vs ${st}"><div class="vdot">${st==='ok'?ic('check',17):ic(s[1],19)}</div><div class="grow"><div class="b">${t('fx.st.'+s[0])}</div><div class="muted xs">${t('fx.st.'+s[0]+'.d')}</div></div><span class="xs ${st==='now'?'orange-t':'muted'}">${st==='now'?t('fx.tr.now'):(i<=T.s?tm+' '+t('fx.am'):'—')}</span></div>`}).join('')}
    </div>
    <div class="mt-3"><div class="row between xs b"><span>${t('fx.tr.prog')}</span><span class="orange-t"><bdi>${pct}%</bdi></span></div><div class="pbar mt-2"><i style="width:${pct}%"></i></div></div></div>
   <div class="card mt-3"><div class="row"><div class="avatar" style="width:46px;height:46px;border-radius:16px;font-size:18px">ي</div><div class="grow"><div class="b">${t('fx.tr.tech')}</div><div class="muted xs">${t('fx.tr.tech.d')}</div></div><span class="star">★ 4.9</span></div></div>
   ${done?`<button class="btn btn-primary mt-3" data-go="rate">${ic('star',20)} ${t('fx.tr.rate')}</button>`:`<div class="card mt-3" style="background:#f8fbff"><div class="row gap-2 b sm mb-2">${ic('settings',17)} ${t('fx.tr.demo')}</div><div class="seg">${STEPS.map((s,i)=>`<button class="${T.s===i?'on':''}" data-act="trSet" data-arg="${i}">${t('fx.st.'+s[0])}</button>`).join('')}</div><button class="btn btn-soft mt-3" data-act="trPlay">${ic('play',18)} ${t('fx.tr.play')}</button></div>`}`,-62)}`}};

ACT.trSet=a=>{FS.track.s=+a;FS.track.p=a==='3'?100:45;paint()};
ACT.trPlay=()=>{FS.track.s=0;FS.track.p=0;paint();clearInterval(ACT._tt);ACT._tt=setInterval(()=>{if(route().name!=='track'){clearInterval(ACT._tt);return}const T=FS.track;T.p+=14;if(T.p>=100){T.p=0;T.s++;if(T.s>=3){T.s=3;T.p=100;clearInterval(ACT._tt);pushNote({title:t('fx.push.ready.t'),body:t('fx.push.ready.b')})}}paint()},650)};
ACT.bkBranch=a=>{FS.book.br=a;paint()};ACT.bkDay=a=>{FS.book.day=+a;const av=FD.avail[+a];if(av[FD.slots.indexOf(FS.book.slot)]===0)FS.book.slot=FD.slots[av.findIndex(x=>x>0)];paint()};ACT.bkSlot=a=>{FS.book.slot=a;paint()};
ACT.bkConfirm=()=>{FS.book.booked=true;FS.book.ahead=FD.q[FS.book.br].ahead+1;go('booked')};
ACT.simTurn=()=>{FS.book.ahead=2;paint();pushNote({title:t('fx.push.turn.t'),body:t('fx.push.turn.b',{n:2}),actions:`<button class="btn btn-primary xs" data-go="track">${t('fx.push.turn.a')}</button>`})};
ACT.pushOpen=()=>{FS.push=null;paint()};
ACT.book=()=>go('book');

/* =====================================================================
   3) Plate recognition (customer side)
   ===================================================================== */
function camArt(){return `<div class="camphoto2"><img src="img/cam-rear.jpg" alt="" style="object-position:center 70%"><i class="cam-vig"></i><div class="cam-plate">${plateHtml('111 222')}</div><div class="scanbox"></div><i class="cc c1"></i><i class="cc c2"></i><i class="cc c3"></i><i class="cc c4"></i><i class="scanline"></i><span class="cam-rec"><i></i></span></div>`}
SCREENS.plate={sb:'light',flush:true,html:()=>{const P=FS.plate;
  return `${fhero(t('fx.pl.t'),t('fx.pl.d'),'home','',120,`<div class="mt-4 glass" style="border-radius:24px;padding:12px">${camArt()}</div>`)}
  ${fbody(`
  <div class="card"><div class="row"><div class="ico-sq o">${ic('scan',22)}</div><div class="grow"><div class="b">${t('fx.pl.enable')}</div><div class="muted xs">${t('fx.pl.enable.d')}</div></div>${sw(P.on,'plOn')}</div></div>
  ${fsec(t('fx.pl.how'))}
  <div class="card" style="padding:6px 16px">${[['camera','1'],['scan','2'],['checkc','3']].map(x=>`<div class="how"><div class="hn">${x[1]}</div><div class="ico-sq" style="width:40px;height:40px">${ic(x[0],20)}</div><div class="grow"><div class="b">${t('fx.pl.s'+x[1])}</div><div class="muted xs">${t('fx.pl.s'+x[1]+'.d')}</div></div></div>`).join('')}</div>
  ${fsec(t('fx.pl.cars'))}
  <div class="card" style="padding:4px 14px;${P.on?'':'opacity:.5;pointer-events:none'}">${S.cars.slice(0,3).map(c=>`<div class="cell" style="cursor:default"><div class="grow">${plateHtml(c.plate)}<div class="muted xs mt-2">${c.make} ${c.model}</div></div>${c.pkg?`<span class="chip ok">${t('fx.pl.elig')}</span>`:`<span class="chip gray">${t('fx.pl.paid')}</span>`}${sw(P.auto[c.id]&&!!c.pkg,'plCar',c.id)}</div>`).join('')}</div>
  ${fsec(t('fx.pl.last'))}
  <div class="card" style="padding:6px 14px">${FD.events.map(e=>`<div class="hist" style="padding:10px 0;border-bottom:1px dashed var(--line)"><div class="ic">${ic('scan',21)}</div><div class="grow"><div class="b sm">${t('fx.pl.ev',{p:e.plate})}</div><div class="muted xs">${L(branchById(e.br).name)} · ${fmtDate(e.d)} · ${e.tm}</div></div><span class="chip ok">${t('fx.pl.left',{n:e.left})}</span></div>`).join('')}</div>
  <div class="banner info mt-3">${ic('shield')}<div class="sm">${t('fx.pl.priv')}</div></div>`,-70)}`}};
ACT.plOn=()=>{FS.plate.on=!FS.plate.on;paint()};ACT.plCar=a=>{FS.plate.auto[a]=!FS.plate.auto[a];paint()};

/* =====================================================================
   4) Loyalty tiers
   ===================================================================== */
const tierBg=x=>`linear-gradient(135deg,${x.c},${x.c2})`;
function loyTierCard(){const c=curTier(),n=nextTier(),pts=TIER_PTS(),pr=n?Math.round((pts-c.from)/(n.from-c.from)*100):100;
  return `<div class="tiercard" style="--c1:${c.c};--c2:${c.c2}"><div class="tc-shine"></div><div class="row between" style="position:relative"><div class="row gap-2"><div class="tc-badge">${ic(c.icon,26)}</div><div><div class="xs" style="opacity:.7">${t('fx.loy.level')}</div><div style="font-size:24px;font-weight:800;line-height:1.1">${t('fx.tier.'+c.id)}</div></div></div><div style="text-align:end"><div style="font-size:30px;font-weight:800;line-height:1"><bdi data-count="${pts}">${num(pts)}</bdi></div><div class="xs" style="opacity:.7">${t('fx.loy.pts')}</div></div></div>
  <div class="mt-4" style="position:relative"><div class="tc-bar"><i style="width:${pr}%"></i></div><div class="row between xs mt-2" style="opacity:.85"><span>${t('fx.tier.'+c.id)}</span><b>${n?t('fx.loy.to',{n:num(n.from-pts),t:t('fx.tier.'+n.id)}):t('fx.loy.max')}</b><span>${n?t('fx.tier.'+n.id):''}</span></div></div></div>`}
function fxLoyaltyCard(){const c=curTier(),n=nextTier();return `<div class="loyalty tap" data-go="loyalty" style="cursor:pointer"><div class="row between" style="position:relative;z-index:1"><div><div style="opacity:.75;font-size:13px">${t('points')}</div><div style="font-size:30px;font-weight:800"><span data-count="${DATA.user.points}">${DATA.user.points}</span> <span style="font-size:14px;color:var(--orange-2)">${t('pt')}</span></div><div class="row gap-2 mt-2"><span class="chip tier-chip" style="background:${tierBg(c)};color:#3b2a00">${ic(c.icon,14)} ${t('fx.tier.'+c.id)}</span><span class="xs" style="opacity:.75">${n?t('fx.loy.to',{n:num(n.from-TIER_PTS()),t:t('fx.tier.'+n.id)}):''}</span></div></div><div class="pkg-ic" style="background:rgba(255,128,0,.2);color:var(--orange-2);width:56px;height:56px;font-size:30px">${ic('crown')}</div></div></div>`}
SCREENS.loyalty={sb:'light',flush:true,html:()=>{const sel_=FS.loy.tier,tr=FD.tiers.find(x=>x.id===sel_),stamps=7;
  return `${fhero(t('fx.loy.t'),t('fx.loy.d'),'home','',150,`<div class="mt-4">${loyTierCard()}</div>`)}
  ${fbody(`
  <div class="card"><div class="row between"><div><div class="b">${t('fx.loy.punch')}</div><div class="muted xs">${t('fx.loy.punch.d',{n:10})}</div></div><span class="chip orange">${stamps}/10</span></div>
   <div class="stamps mt-3">${Array.from({length:10},(_,i)=>`<div class="stamp ${i<stamps?'on':''} ${i===9?'gift':''}" style="animation-delay:${i*.06}s">${i===9?ic('gift',20):i<stamps?ic('drop',18):i+1}</div>`).join('')}</div>
   <div class="xs muted mt-3 center">${t('fx.loy.punch.n',{n:10-stamps})}</div></div>
  ${fsec(t('fx.loy.benefits'))}
  <div class="seg">${FD.tiers.map(x=>`<button class="${sel_===x.id?'on':''}" data-act="loyTier" data-arg="${x.id}">${t('fx.tier.'+x.id)}</button>`).join('')}</div>
  <div class="card mt-3 tier-ben" style="border-top:4px solid ${tr.c2}"><div class="row between mb-2"><div class="row gap-2"><div class="tc-mini" style="background:${tierBg(tr)}">${ic(tr.icon,20)}</div><div><b>${t('fx.tier.'+tr.id)}</b><div class="muted xs">${tr.from?t('fx.loy.from',{n:num(tr.from)}):t('fx.loy.start')}</div></div></div><span class="chip ${tr.id===curTier().id?'ok':'gray'}">${tr.id===curTier().id?t('fx.loy.cur'):t('fx.loy.mult',{x:tr.mult})}</span></div>
   <ul class="ben">${[1,2,3].map(i=>`<li>${ic('check')}<span>${t('fx.ben.'+tr.id+'.'+i)}</span></li>`).join('')}</ul></div>
  <div class="card mt-3"><div class="row"><div class="ico-sq o">${ic('gift',22)}</div><div class="grow"><div class="b">${t('fx.loy.redeem')}</div><div class="muted xs"><bdi>${DATA.user.points}</bdi> ${t('pt')} = ${qar(DATA.user.points/10)}</div></div><button class="btn btn-primary xs" data-act="toast" data-arg="${t('fx.loy.redeemed')}">${t('pt.redeem')}</button></div></div>
  ${fsec(t('fx.loy.hist'))}
  <div class="card" style="padding:4px 14px">${[['drop','fx.loy.h1','+35','2026-10-25'],['star','fx.loy.h2','+20','2026-10-25'],['gift','fx.loy.h3','+100','2026-10-18'],['drop','fx.loy.h1','+35','2026-10-22']].map(x=>`<div class="hist" style="padding:11px 0;border-bottom:1px dashed var(--line)"><div class="ic">${ic(x[0],20)}</div><div class="grow"><div class="b sm">${t(x[1])}</div><div class="muted xs">${fmtDate(x[3])}</div></div><b class="ok-t"><bdi>${x[2]}</bdi></b></div>`).join('')}</div>`,-120)}`}};
ACT.loyTier=a=>{FS.loy.tier=a;paint()};

/* =====================================================================
   5) Refer a friend
   ===================================================================== */
const REF_CODE='GOCLEAN-DEMO25';
SCREENS.refer={sb:'light',flush:true,html:()=>{
  return `${fhero(t('fx.ref.t'),t('fx.ref.d'),'home','',70,`<div class="center mt-3 float" style="font-size:0">${refArt()}</div>`)}
  ${fbody(`
  <div class="card refcode"><div class="muted xs center">${t('fx.ref.code')}</div><div class="code"><bdi>${REF_CODE}</bdi></div>
   <div class="row gap-2 mt-3"><button class="btn btn-ghost" data-act="refCopy">${ic('copy',19)} ${t('fx.ref.copy')}</button><button class="btn btn-wa" data-act="sheet" data-arg="waRef">${ic('chat',19)} ${t('fx.ref.wa')}</button></div></div>
  <div class="card mt-3" style="padding:8px 16px">${[1,2,3].map(i=>`<div class="how"><div class="hn">${i}</div><div class="grow"><div class="b">${t('fx.ref.s'+i)}</div><div class="muted xs">${t('fx.ref.s'+i+'.d')}</div></div></div>`).join('')}</div>
  <div class="stat3 mt-3">${[[4,t('fx.ref.invited'),'users'],[3,t('fx.ref.joined'),'user'],[2,t('fx.ref.free'),'gift']].map(x=>`<div class="card center" style="padding:14px 6px"><div class="ico-sq" style="margin:0 auto 6px;width:38px;height:38px">${ic(x[2],19)}</div><div style="font-size:24px;font-weight:800">${x[0]}</div><div class="muted xs">${x[1]}</div></div>`).join('')}</div>
  ${fsec(t('fx.ref.hist'))}
  <div class="card" style="padding:4px 14px">${FD.friends.map(f=>`<div class="hist" style="padding:11px 0;border-bottom:1px dashed var(--line)"><div class="avatar" style="width:42px;height:42px;border-radius:14px;font-size:16px">${f.n[0]}</div><div class="grow"><div class="b sm">${f.n}</div><div class="muted xs">${fmtDate(f.d)}</div></div>${({done:`<span class="chip ok">${ic('gift',13)} ${t('fx.ref.st.done')}</span>`,join:`<span class="chip warn">${t('fx.ref.st.join')}</span>`,sent:`<span class="chip gray">${t('fx.ref.st.sent')}</span>`})[f.st]}</div>`).join('')}</div>
  <div class="muted xs center mt-3">${t('fx.ref.terms')}</div>`,-50)}`}};
function refArt(){return `<svg viewBox="0 0 220 120" width="210" aria-hidden="true"><defs><linearGradient id="rg1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff9a1f"/><stop offset="1" stop-color="#ff6a00"/></linearGradient></defs>
  <g transform="translate(26 20)"><rect width="74" height="74" rx="22" fill="url(#rg1)"/><path d="M0 34h74" stroke="#fff3" stroke-width="8"/><path d="M37 0v74" stroke="#fff5" stroke-width="8"/><path d="M37 0c-14-8-26 0-20 10 5 8 20 2 20-10zM37 0c14-8 26 0 20 10-5 8-20 2-20-10z" fill="#ffd9a8"/></g>
  <g transform="translate(118 36)"><rect width="74" height="74" rx="22" fill="#66b8d9"/><path d="M0 34h74" stroke="#fff4" stroke-width="8"/><path d="M37 0v74" stroke="#fff6" stroke-width="8"/><path d="M37 0c-14-8-26 0-20 10 5 8 20 2 20-10zM37 0c14-8 26 0 20 10-5 8-20 2-20-10z" fill="#e4f6fc"/></g>
  <path class="twinkle" d="M104 10l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" fill="#ffd9a8"/><path class="twinkle" d="M200 20l3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#a6dcef" style="animation-delay:.8s"/></svg>`}
ACT.refCopy=()=>toast(t('fx.ref.copied'),'copy');
const waBubble=(txt,time='9:41 ص')=>`<div class="wa-chat"><div class="wa-head"><div class="wa-av"><img src="assets/logo192.png" alt=""></div><div><b>${t('fx.wa.name')}</b><div class="xs" style="opacity:.8">${t('fx.wa.online')}</div></div></div><div class="wa-body"><div class="wa-msg">${txt}<div class="wa-t">${time} ✓✓</div></div></div></div>`;
FSHEET.waRef=()=>`<div class="center"><div class="pkg-ic" style="margin:0 auto 12px;width:60px;height:60px;background:#e6f8ef;color:#128c5a;font-size:28px">${ic('chat')}</div><h2>${t('fx.wa.preview')}</h2><p class="muted sm mt-2">${t('fx.wa.mock')}</p></div>
  <div class="mt-3">${waBubble(t('fx.ref.msg',{c:'<bdi>'+REF_CODE+'</bdi>'}))}</div><div class="row gap-2 mt-4"><button class="btn btn-ghost" data-act="closeSheet">${t('cancel')}</button><button class="btn btn-wa" data-act="waSend">${ic('send',18)} ${t('fx.wa.send')}</button></div>`;
ACT.waSend=()=>{sheet(null);toast(t('fx.wa.sent'),'chat')};

/* =====================================================================
   6) Family / Corporate
   ===================================================================== */
SCREENS.family={sb:'light',flush:true,html:()=>{const F=FS.fam,corp=F.tab==='corp';
  const seg=`<div class="seg glass-seg mt-4"><button class="${!corp?'on':''}" data-act="famTab" data-arg="family">${ic('users',17)} ${t('fx.fam.tab.f')}</button><button class="${corp?'on':''}" data-act="famTab" data-arg="corp">${ic('briefcase',17)} ${t('fx.fam.tab.c')}</button></div>`;
  const used=F.members.reduce((a,m)=>a+m.used,0);
  const fam=`<div class="plan-dark"><div class="row between"><div><div class="xs" style="opacity:.7">${t('fx.fam.plan')}</div><div style="font-size:21px;font-weight:800">${t('fx.fam.plan.n')}</div></div><span class="chip glass">${t('fx.fam.cars',{n:F.members.length,m:5})}</span></div>
    <div class="row mt-4" style="gap:16px;align-items:center"><div class="ring-s big" style="--p:${used/24*100}"><div><b>${24-used}</b><small>${t('fx.fam.left')}</small></div></div><div class="grow"><div class="price" style="font-size:30px;font-weight:800;line-height:1"><bdi>399</bdi> <small style="font-size:14px">${t('cur')}/${t('fx.month')}</small></div><div class="save-pill mt-2" style="display:inline-block">${t('fx.fam.save',{n:138})}</div><div class="xs mt-2" style="opacity:.75">${t('fx.fam.pool')}</div></div></div></div>
   ${fsec(t('fx.fam.members'),`<button class="link" data-act="sheet" data-arg="addMember">+ ${t('fx.fam.add')}</button>`)}
   <div class="card" style="padding:4px 14px">${F.members.map(m=>`<div class="cell" style="cursor:default"><div class="avatar" style="width:44px;height:44px;border-radius:15px;font-size:17px">${m.n[0]}</div><div class="grow"><div class="b">${m.n} ${m.role==='owner'?`<span class="chip orange" style="height:20px;font-size:10.5px">${t('fx.fam.owner')}</span>`:''}</div><div class="muted xs">${m.car} · <bdi>${m.plate}</bdi></div><div class="bar mt-2" style="height:6px"><i style="width:${m.used/m.cap*100}%"></i></div></div><div style="text-align:end"><b><bdi>${m.used}</bdi></b><div class="muted xs">${t('fx.fam.used')}</div></div>${m.role==='owner'?'':`<button class="iconbtn" style="width:34px;height:34px" data-act="famRm" data-arg="${m.id}">${ic('trash',16)}</button>`}</div>`).join('')}</div>
   <button class="btn btn-primary mt-3" data-act="sheet" data-arg="addMember">${ic('plus',20)} ${t('fx.fam.add')}</button>
   <div class="card mt-3" style="background:#f8fbff"><div class="row gap-2 b sm mb-2">${ic('info',17)} ${t('fx.fam.how')}</div><ul class="ben">${[1,2,3].map(i=>`<li>${ic('check')}<span>${t('fx.fam.h'+i)}</span></li>`).join('')}</ul></div>`;
  const cor=`<div class="plan-dark corp"><div class="row between"><div class="row gap-2"><div class="tc-badge" style="background:rgba(255,255,255,.14)">${ic('briefcase',24)}</div><div><div class="xs" style="opacity:.7">${t('fx.corp.acct')}</div><div style="font-size:19px;font-weight:800">${t('fx.corp.name')}</div></div></div><span class="chip glass">${t('fx.corp.plan')}</span></div>
    <div class="stats3 mt-4">${[['24',t('fx.corp.veh')],['212',t('fx.corp.washes')],['<bdi>4,860</bdi>',t('fx.corp.inv')]].map(x=>`<div><b>${x[0]}</b><span>${x[1]}</span></div>`).join('')}</div></div>
   ${fsec(t('fx.corp.fleet'),`<span class="chip warn">${t('fx.corp.due',{n:2})}</span>`)}
   <div class="card" style="padding:4px 14px">${FD.fleet.map(v=>`<div class="cell" style="cursor:default"><div class="ico-sq" style="width:40px;height:40px">${ic('truck',20)}</div><div class="grow">${plateHtml(v[0])}<div class="muted xs mt-2">${v[2]} · ${v[1]}</div></div><div style="text-align:end"><span class="chip ${v[4]==='ok'?'ok':'warn'}">${v[4]==='ok'?t('fx.corp.clean'):t('fx.corp.need')}</span><div class="muted xs mt-2">${v[3]==='today'?t('fx.today'):t('fx.corp.ago',{n:parseInt(v[3])})}</div></div></div>`).join('')}</div>
   <div class="row gap-2 mt-3"><button class="btn btn-ghost" data-act="toast" data-arg="${t('fx.corp.up.ok')}">${ic('download',18)} ${t('fx.corp.up')}</button><button class="btn btn-primary" data-act="toast" data-arg="${t('fx.corp.inv.ok')}">${ic('doc',18)} ${t('fx.corp.invbtn')}</button></div>
   ${fsec(t('fx.corp.usage'))}
   <div class="card">${DATA.branches.map((b,i)=>`<div class="${i?'mt-3':''}"><div class="row between xs b"><span>${L(b.name)}</span><span><bdi>${[84,62,31,35][i]}</bdi> ${t('wash')}</span></div><div class="bar mt-2"><i style="width:${[84,62,31,35][i]/84*100}%"></i></div></div>`).join('')}</div>`;
  return `${fhero(corp?t('fx.corp.t'):t('fx.fam.t'),corp?t('fx.corp.d'):t('fx.fam.d'),'home','',corp?62:70,seg)}${fbody(corp?cor:fam,-44)}`}};
ACT.famTab=a=>{FS.fam.tab=a;paint()};ACT.famRm=a=>{FS.fam.members=FS.fam.members.filter(m=>m.id!==a);paint();toast(t('fx.fam.removed'),'trash')};
FSHEET.addMember=()=>`<h2>${t('fx.fam.add')}</h2><p class="muted sm mb-3">${t('fx.fam.add.d')}</p><div class="field"><label>${t('fx.fam.mname')}</label><input id="f_mn" class="input" value="أحمد (الأخ)"></div><div class="row gap-2"><div class="field grow"><label>${t('reg.plate')}</label><input id="f_mp" class="input ltr" value="777 888"></div><div class="field grow"><label>${t('car.model')}</label><input id="f_mm" class="input" value="باترول"></div></div><button class="btn btn-primary" data-act="famAdd">${ic('plus',19)} ${t('fx.fam.add')}</button>`;
ACT.famAdd=()=>{const g=i=>document.getElementById(i).value;FS.fam.members.push({id:'m'+Date.now(),n:g('f_mn'),role:'member',car:g('f_mm'),plate:g('f_mp'),used:0,cap:8});sheet(null);toast(t('fx.fam.added'))};

/* =====================================================================
   7) Gift a subscription
   ===================================================================== */
const OCC=['eid','bday','thanks','new'];
const giftMsg=o=>t('fx.gift.m.'+o);
function giftCard(g,big){const p=pk(g.pkg);return `<div class="giftcard ${big?'big':''}"><div class="gc-orb"></div><div class="gc-ribbon"></div><div class="row between" style="position:relative"><div class="row gap-2"><img src="assets/logo192.png" class="gc-logo" alt=""><b>${t('brand')}</b></div><span class="chip glass">${t('fx.gift.card')}</span></div>
  <div class="gc-photo"><img src="img/car-lexus-black.jpg" alt=""><i></i></div>
  <div style="position:relative"><div class="xs" style="opacity:.75">${t('fx.gift.to')}</div><div class="gc-name" id="gcName">${g.name||'—'}</div><div class="gc-msg" id="gcMsg">${g.msg||giftMsg(g.occ)}</div></div>
  <div class="row between mt-3" style="position:relative"><div><div class="xs" style="opacity:.7">${t('fx.gift.pkg')}</div><b>${t('pk.name',{n:L(p.name)})}</b></div><div style="text-align:end"><div class="xs" style="opacity:.7">${t('fx.gift.val')}</div><b style="font-size:20px"><bdi>${p.price}</bdi> ${t('cur')}</b></div></div><div class="xs mt-2" style="position:relative;opacity:.6">${t('fx.gift.from')} ${DATA.user.name}</div></div>`}
SCREENS.gift={sb:'light',flush:true,html:()=>{const G=FS.gift;
  return `${fhero(t('fx.gift.t'),t('fx.gift.d'),'home','',150,`<div class="mt-4">${giftCard(G)}</div>`)}
  ${fbody(`
  <div class="card"><div class="b mb-2">${t('fx.gift.s1')}</div><div class="row gap-2" style="align-items:stretch">${DATA.packages.slice().reverse().map(p=>`<div class="gpk ${G.pkg===p.id?'on':''}" data-act="gfPkg" data-arg="${p.id}">${p.featured?`<span class="gpk-b">${t('best')}</span>`:''}<div class="ico-sq" style="margin:0 auto 6px;width:38px;height:38px">${ic(p.icon,19)}</div><b class="sm">${L(p.name)}</b><div class="xs muted">${t('pk.washes',{n:p.washes})}</div><div class="b" style="margin-top:4px"><bdi>${p.price}</bdi> <small>${t('cur')}</small></div></div>`).join('')}</div></div>
  <div class="card mt-3"><div class="b mb-2">${t('fx.gift.s2')}</div><div class="field"><label>${t('fx.gift.rname')}</label><input class="input" data-gf="name" value="${G.name}"></div><div class="field" style="margin-bottom:0"><label>${t('fx.gift.rmob')}</label><div class="input-group"><div class="cc">🇶🇦 <bdi>+974</bdi></div><input class="input ltr" data-gf="mobile" value="${G.mobile}"></div></div></div>
  <div class="card mt-3"><div class="b mb-2">${t('fx.gift.s3')}</div><div class="pills">${OCC.map(o=>`<button class="pill ${G.occ===o&&!G.msg?'on':''}" data-act="gfOcc" data-arg="${o}">${t('fx.gift.o.'+o)}</button>`).join('')}</div><textarea class="input" data-gf="msg" rows="3" placeholder="${giftMsg(G.occ)}" style="height:auto;padding:12px;margin-top:8px">${G.msg}</textarea></div>
  <button class="btn btn-wa mt-4" data-act="sheet" data-arg="waGift">${ic('chat',20)} ${t('fx.gift.send')}</button><div class="muted xs center mt-2">${t('fx.gift.note')}</div>`,-120)}`}};
ACT.gfPkg=a=>{FS.gift.pkg=a;paint()};ACT.gfOcc=a=>{FS.gift.occ=a;FS.gift.msg='';paint()};
document.addEventListener('input',e=>{const k=e.target.dataset&&e.target.dataset.gf;if(!k)return;FS.gift[k]=e.target.value;const n=document.getElementById('gcName'),m=document.getElementById('gcMsg');if(k==='name'&&n)n.textContent=e.target.value||'—';if(k==='msg'&&m)m.textContent=e.target.value||giftMsg(FS.gift.occ)});
FSHEET.waGift=()=>{const G=FS.gift,p=pk(G.pkg);return `<div class="center"><div class="pkg-ic" style="margin:0 auto 12px;width:60px;height:60px;background:#e6f8ef;color:#128c5a;font-size:28px">${ic('chat')}</div><h2>${t('fx.wa.preview')}</h2><p class="muted sm mt-2">${t('fx.wa.to')} <bdi>+974 ${G.mobile}</bdi> · ${G.name}</p></div>
  <div class="mt-3">${waBubble(t('fx.gift.wa',{n:G.name,f:DATA.user.name,p:L(p.name),m:G.msg||giftMsg(G.occ)}))}</div><div class="banner info mt-3">${ic('info')}<div class="sm">${t('fx.wa.mock')}</div></div><div class="row gap-2 mt-3"><button class="btn btn-ghost" data-act="closeSheet">${t('cancel')}</button><button class="btn btn-wa" data-act="gfSend">${ic('send',18)} ${t('fx.wa.send')}</button></div>`};
ACT.gfSend=()=>{sheet(null);FS.gift.sent=true;go('giftsent')};
SCREENS.giftsent={sb:'light',flush:true,html:()=>{const G=FS.gift;
  return `<div class="hero" style="padding-bottom:80px;text-align:center">${ART.bubbles(6)}${ART.confetti?ART.confetti():''}<div class="successmark" style="margin:20px auto 14px">${ic('check',44)}</div><div class="hero-title">${t('fx.gs.t')}</div><div class="hero-sub mt-2">${t('fx.gs.d',{n:G.name})}</div></div>
  ${fbody(`${giftCard(G,true)}<div class="card mt-3"><div class="row gap-2 b sm mb-2">${ic('chat',17)} ${t('fx.gs.wa')}</div>${waBubble(t('fx.gift.wa',{n:G.name,f:DATA.user.name,p:L(pk(G.pkg).name),m:G.msg||giftMsg(G.occ)}),'9:42 ص')}</div>
  <div class="row gap-2 mt-3"><button class="btn btn-ghost" data-go="gift">${t('fx.gs.again')}</button><button class="btn btn-primary" data-go="home">${t('fx.gs.home')}</button></div>`,-60)}`}};

/* =====================================================================
   8) Weather alerts
   ===================================================================== */
const wIc={dust:'wind',rain:'rain',clear:'sun'};
SCREENS.weather={sb:'light',flush:true,html:()=>{const W=FS.weather;
  const row=(k,i,c)=>`<div class="cell" style="cursor:default"><div class="ico ${c}">${ic(i)}</div><div class="grow"><div class="b">${t('fx.w.'+k)}</div><div class="muted xs">${t('fx.w.'+k+'.d')}</div></div>${sw(W[k],'wToggle',k)}</div>`;
  return `<div class="hero weather-hero" style="padding-bottom:130px"><div class="dust">${Array.from({length:14},(_,i)=>`<i style="top:${(i*37)%100}%;animation-delay:${(i%7)*.6}s;width:${40+(i*13)%60}px"></i>`).join('')}</div>${ART.bubbles(3)}<div class="row"><button class="iconbtn glass" data-go="home" aria-label="${t('back')}">${ic('back')}</button><div class="grow"><div class="hero-title" style="font-size:22px">${t('fx.w.t')}</div><div class="hero-sub">${t('fx.w.d')}</div></div>${demoTag()}</div>
   <div class="row mt-4" style="gap:14px;align-items:center"><div style="font-size:0;color:#ffd9a8;filter:drop-shadow(0 6px 14px rgba(255,128,0,.5))">${ic('wind',64)}</div><div><div style="font-size:42px;font-weight:800;line-height:1"><bdi>41°</bdi></div><div class="b">${t('fx.w.now')}</div><div class="xs" style="opacity:.75">${t('fx.w.city')} · ${t('fx.w.vis',{n:3})}</div></div></div></div>
  ${fbody(`
  <div class="card"><div class="row between mb-2"><b>${t('fx.w.next')}</b><span class="xs muted">${t('fx.w.fake')}</span></div><div class="fc">${FD.forecast.map((f,i)=>`<div class="fcd ${f[2]!=='clear'?'bad':''} ${i===2?'best':''}">${i===2?`<span class="fcb">${t('fx.w.best')}</span>`:''}<div class="xs b">${f[1]}</div>${ic(wIc[f[2]]||'sun',24)}<div class="b sm"><bdi>${f[3]}°</bdi></div></div>`).join('')}</div></div>
  <div class="card mt-3" style="background:linear-gradient(135deg,#fff7ee,#fff);border-color:var(--orange-100)"><div class="row gap-2 mb-2"><div class="ico-sq o">${ic('bell',20)}</div><b>${t('fx.w.prev')}</b></div>
   <div class="notif-prev"><div class="push-ic"><img src="assets/logo192.png" alt=""></div><div class="grow"><div class="row between"><b class="xs">${t('brand')}</b><span class="xs muted">${t('fx.now')}</span></div><div class="push-t" style="color:var(--ink)">${t('fx.w.push.t')}</div><div class="push-b" style="color:var(--ink-2)">${t('fx.w.push.b')}</div></div></div>
   <button class="btn btn-soft mt-3" data-act="wPush">${ic('bell',18)} ${t('fx.w.try')}</button></div>
  ${fsec(t('fx.w.set'))}
  <div class="card" style="padding:4px 14px">${row('dust','wind','aq')}${row('rain','rain','')}${row('wind','bolt','rd')}${row('due','calendar','gn')}</div>
  <div class="card mt-3"><div class="b mb-2">${t('fx.w.sens')}</div><div class="seg">${['low','mid','high'].map(s=>`<button class="${W.sens===s?'on':''}" data-act="wSens" data-arg="${s}">${t('fx.w.sens.'+s)}</button>`).join('')}</div><div class="muted xs mt-2">${t('fx.w.sens.'+W.sens+'.d')}</div></div>
  <div class="card mt-3"><div class="row"><div class="grow"><div class="b">${t('fx.w.quiet')}</div><div class="muted xs">${t('fx.w.quiet.d')}</div></div>${sw(W.quiet,'wToggle','quiet')}</div></div>`,-90)}`}};
ACT.wToggle=a=>{FS.weather[a]=!FS.weather[a];paint()};ACT.wSens=a=>{FS.weather.sens=a;paint()};
ACT.wPush=()=>pushNote({title:t('fx.w.push.t'),body:t('fx.w.push.b'),actions:`<button class="btn btn-primary xs" data-go="book">${t('fx.w.push.a')}</button><button class="btn btn-glass xs" data-act="pushOpen">${t('fx.later')}</button>`});

/* =====================================================================
   9) Post-wash rating + tip
   ===================================================================== */
const RTAGS=['clean','fast','staff','shine','wait'];
SCREENS.rate={sb:'light',flush:true,html:()=>{const R=FS.rate;
  if(R.done)return `<div class="hero" style="padding-bottom:84px;text-align:center">${ART.bubbles(8)}${ART.confetti?ART.confetti():''}<div class="successmark" style="margin:20px auto 14px">${ic('check',44)}</div><div class="hero-title">${t('fx.rt.thanks')}</div><div class="hero-sub mt-2">${t('fx.rt.thanks.d')}</div></div>
   ${fbody(`<div class="card center"><div class="stars-big done">${[1,2,3,4,5].map(i=>`<span class="${i<=R.stars?'on':''}">★</span>`).join('')}</div>${R.tip?`<div class="chip ok mt-3" style="margin-inline:auto">${ic('coin',14)} ${t('fx.rt.tipsent',{n:R.tip})}</div>`:''}<div class="kv mt-3"><span>${t('fx.rt.earn')}</span><b class="ok-t">+20 ${t('pt')}</b></div></div><button class="btn btn-primary mt-3" data-go="home">${t('fx.gs.home')}</button>`,-60)}`;
  return `${fhero(t('fx.rt.t'),t('fx.rt.d'),'track','',100,`<div class="row mt-4 glass" style="border-radius:20px;padding:10px;gap:12px"><img src="img/car-lexus-lx.jpg" alt="" style="width:78px;height:58px;border-radius:14px;object-fit:cover"><div class="grow"><div class="b">${t('fx.rt.svc')}</div><div class="xs" style="opacity:.75">${L(branchById('b1').name)} · ${t('fx.today')} 9:19 ${t('fx.am')}</div></div></div>`)}
  ${fbody(`
  <div class="card center"><div class="b">${t('fx.rt.q')}</div><div class="stars-big mt-3">${[1,2,3,4,5].map(i=>`<button class="${i<=R.stars?'on':''}" data-act="rtStar" data-arg="${i}" aria-label="${i}">★</button>`).join('')}</div><div class="b mt-2" style="color:var(--orange)">${t('fx.rt.l'+R.stars)}</div>
   <div class="pills mt-3" style="flex-wrap:wrap;justify-content:center;overflow:visible">${RTAGS.map(g=>`<button class="pill ${R.tags.includes(g)?'on':''}" style="height:34px;font-size:13px" data-act="rtTag" data-arg="${g}">${t('fx.rt.tag.'+g)}</button>`).join('')}</div></div>
  <div class="card mt-3"><div class="row"><div class="avatar" style="width:44px;height:44px;border-radius:15px;font-size:17px">ي</div><div class="grow"><div class="b">${t('fx.tr.tech')}</div><div class="muted xs">${t('fx.tr.tech.d')}</div></div></div>
   <textarea class="input mt-3" rows="2" data-rc="1" placeholder="${t('fx.rt.cmt')}" style="height:auto;padding:12px">${R.comment}</textarea></div>
  <div class="card mt-3"><div class="row between mb-2"><div class="b">${t('fx.rt.tip')}</div><span class="xs muted">${t('fx.rt.tip.d')}</span></div><div class="tips">${[0,5,10,20].map(v=>`<button class="tip ${R.tip===v?'on':''}" data-act="rtTip" data-arg="${v}">${v?`<b>${v}</b><small>${t('cur')}</small>`:`<b>${t('fx.rt.notip')}</b>`}</button>`).join('')}</div></div>
  <button class="btn btn-primary mt-4" data-act="rtSend">${ic('send',19)} ${R.tip?t('fx.rt.send.tip',{n:R.tip}):t('fx.rt.send')}</button>`,-70)}`}};
ACT.rtStar=a=>{FS.rate.stars=+a;paint()};ACT.rtTag=a=>{const T=FS.rate.tags;FS.rate.tags=T.includes(a)?T.filter(x=>x!==a):T.concat(a);paint()};ACT.rtTip=a=>{FS.rate.tip=+a;paint()};
ACT.rtSend=()=>{FS.rate.done=true;paint()};
document.addEventListener('input',e=>{if(e.target.dataset&&e.target.dataset.rc)FS.rate.comment=e.target.value});

/* =====================================================================
   10) Add-ons store + cart
   ===================================================================== */
const prodTile=p=>`<div class="prod ${FS.store.cart[p.id]?'in':''}"><div class="pt" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${ic(p.i,30)}<span class="pt-gl"></span></div><div class="b sm" style="margin-top:10px">${p.n}</div><div class="muted xs" style="min-height:32px">${p.d}</div><div class="row between mt-2"><b class="orange-t"><bdi>${p.p}</bdi> <small>${t('cur')}</small></b>${FS.store.cart[p.id]?`<div class="mstep"><button data-act="stDec" data-arg="${p.id}">−</button><b>${FS.store.cart[p.id]}</b><button data-act="stAdd" data-arg="${p.id}">+</button></div>`:`<button class="addbtn" data-act="stAdd" data-arg="${p.id}" aria-label="${t('fx.st.add')}">${ic('plus',18)}</button>`}</div></div>`;
SCREENS.store={sb:'light',flush:true,html:()=>{const St=FS.store,list=FD.prods.filter(p=>St.cat==='all'||p.cat===St.cat),n=cartCount();
  return `${fhero(t('fx.store.t'),t('fx.store.d'),'home',`<button class="iconbtn glass" data-go="cart" style="position:relative" aria-label="${t('fx.cart.t')}">${ic('bag')}${n?`<span class="cbadge">${n}</span>`:''}</button>`,54,`<div class="next-wash mt-4 glass">${ic('clock',19)}<div class="grow sm"><b>${t('fx.store.next')}</b> · ${L(branchById(FS.book.br).name)} · ${dayLbl(FS.book.day)} ${FS.book.slot}</div></div>`)}
  <div style="padding:14px 18px 0"><div class="pills">${FD.cats.map(c=>`<button class="pill ${St.cat===c?'on':''}" data-act="stCat" data-arg="${c}">${t('fx.cat.'+c)}</button>`).join('')}</div>
  <div class="prods mt-2">${list.map(prodTile).join('')}</div><div style="height:${n?96:24}px"></div></div>
  ${n?`<div class="cartbar" data-go="cart"><div class="cb-n">${n}</div><div class="grow"><b>${t('fx.cart.view')}</b><div class="xs" style="opacity:.8">${t('fx.cart.bar')}</div></div><b style="font-size:18px"><bdi>${cartTotal()}</bdi> ${t('cur')}</b></div>`:''}`}};
ACT.stCat=a=>{FS.store.cat=a;paint()};ACT.stAdd=a=>{FS.store.cart[a]=(FS.store.cart[a]||0)+1;paint()};ACT.stDec=a=>{if(--FS.store.cart[a]<=0)delete FS.store.cart[a];paint()};
SCREENS.cart={sb:'light',flush:true,html:()=>{const St=FS.store,ids=Object.keys(St.cart),sub=cartTotal(),disc=Math.round(sub*.1),tot=sub-disc;
  if(FS.cartDone)return `<div class="hero" style="padding-bottom:84px;text-align:center">${ART.bubbles(8)}<div class="successmark" style="margin:20px auto 14px">${ic('check',44)}</div><div class="hero-title">${t('fx.cart.ok')}</div><div class="hero-sub mt-2">${t('fx.cart.ok.d')}</div></div>${fbody(`<div class="card"><div class="kv"><span>${t('fx.tk.branch')}</span><b>${L(branchById(FS.book.br).name)}</b></div><div class="kv"><span>${t('fx.tk.when')}</span><b>${dayLbl(FS.book.day)} · ${FS.book.slot}</b></div><div class="kv"><span>${t('fx.cart.items')}</span><b>${FS.cartSnap||0}</b></div><div class="total"><span>${t('co.total')}</span><span>${qar(FS.cartSnapTot||0)}</span></div></div><button class="btn btn-primary mt-3" data-go="booked">${t('fx.cart.ticket')}</button><button class="btn btn-ghost mt-2" data-go="home">${t('fx.gs.home')}</button>`,-60)}`;
  return `${fhero(t('fx.cart.t'),t('fx.cart.d'),'store','',70)}${fbody(ids.length?`
  <div class="card" style="padding:4px 14px">${ids.map(id=>{const p=FD.prods.find(x=>x.id===id);return `<div class="cell" style="cursor:default"><div class="pt-sm" style="background:linear-gradient(135deg,${p.g[0]},${p.g[1]})">${ic(p.i,20)}</div><div class="grow"><div class="b sm">${p.n}</div><div class="muted xs"><bdi>${p.p}</bdi> ${t('cur')}</div></div><div class="mstep"><button data-act="stDec" data-arg="${id}">−</button><b>${St.cart[id]}</b><button data-act="stAdd" data-arg="${id}">+</button></div></div>`}).join('')}</div>
  <div class="card mt-3"><div class="row"><div class="ico-sq o">${ic('clock',21)}</div><div class="grow"><div class="b">${t('fx.cart.ready')}</div><div class="muted xs">${L(branchById(FS.book.br).name)} · ${dayLbl(FS.book.day)} ${FS.book.slot}</div></div></div></div>
  <div class="card mt-3"><div class="kv"><span>${t('fx.cart.sub')}</span><b>${qar(sub)}</b></div><div class="kv"><span>${t('fx.cart.gold')}</span><b class="ok-t">- ${qar(disc)}</b></div><div class="total"><span>${t('co.total')}</span><span>${qar(tot)}</span></div></div>
  <div class="pills mt-3"><button class="pill on">${ic('card',16)} Visa •••• 0000</button><button class="pill">${t('fx.cart.arrive')}</button></div>
  <button class="btn btn-primary mt-3" data-act="cartPay">${ic('lock',19)} ${t('fx.cart.pay',{n:tot})}</button>`:`<div class="card center" style="padding:36px 20px"><div class="pkg-ic" style="margin:0 auto 12px;width:64px;height:64px;font-size:30px">${ic('bag')}</div><b>${t('fx.cart.empty')}</b><button class="btn btn-primary mt-4" data-go="store">${t('fx.cart.browse')}</button></div>`,-44)}`}};
ACT.cartPay=()=>{FS.cartSnap=cartCount();FS.cartSnapTot=cartTotal()-Math.round(cartTotal()*.1);FS.cartDone=true;FS.store.cart={};paint()};

/* =====================================================================
   11) Apple Wallet pass
   ===================================================================== */
function walletPass(sm){const c=carById('c1',S.cars),T=curTier();
  return `<div class="wpass ${sm?'sm':''}"><div class="wp-top"><div class="row gap-2"><img src="assets/logo192.png" class="wp-logo" alt=""><b>${t('brand')}</b></div><div style="text-align:end"><div class="wp-l">${t('fx.wl.left')}</div><div class="wp-v"><bdi>5</bdi></div></div></div>
   <div class="wp-photo"><img src="img/car-landcruiser.jpg" alt=""><i></i></div><div class="wp-strip"><div><div class="wp-l">${t('fx.wl.pkg')}</div><div class="wp-v2">${t('pk.name',{n:L(pk(S.sub.pkg).name)})}</div></div><div style="text-align:end"><div class="wp-l">${t('fx.loy.level')}</div><div class="wp-v2">${t('fx.tier.'+T.id)}</div></div></div>
   <div class="wp-fields"><div><div class="wp-l">${t('fx.wl.name')}</div><div class="wp-v2">${DATA.user.name}</div></div><div><div class="wp-l">${t('fx.wl.plate')}</div><div class="wp-v2"><bdi>${c.plate}</bdi></div></div><div><div class="wp-l">${t('fx.wl.renew')}</div><div class="wp-v2">${fmtDate(S.sub.renew)}</div></div></div>
   <div class="wp-qr">${qrSvg(11,25,sm?5:7)}<div class="xs" style="color:#6a7791;margin-top:6px"><bdi>GC-DEMO-0001</bdi></div></div><div class="wp-notch l"></div><div class="wp-notch r"></div></div>`}
SCREENS.wallet={sb:'light',flush:true,html:()=>{const W=FS.wallet;
  return `${fhero(t('fx.wl.t'),t('fx.wl.d'),'home','',60)}
  ${fbody(`<div class="wallet-stage">${walletPass()}</div>
  ${W.added?`<div class="btn btn-added mt-4">${ic('checkc',22)} ${t('fx.wl.added')}</div>`:`<button class="btn btn-wallet mt-4" data-act="sheet" data-arg="addWallet"><span class="wlogo">${ic('wallet',22)}</span> ${t('fx.wl.add')}</button>`}
  <div class="muted xs center mt-2">${t('fx.wl.mock')}</div>
  <div class="card mt-3" style="padding:6px 16px">${[['refresh','fx.wl.f1'],['pin','fx.wl.f2'],['qr','fx.wl.f3']].map(x=>`<div class="how"><div class="ico-sq" style="width:40px;height:40px">${ic(x[0],20)}</div><div class="grow"><div class="b">${t(x[1])}</div><div class="muted xs">${t(x[1]+'.d')}</div></div></div>`).join('')}</div>`,-30)}`}};
FSHEET.addWallet=()=>`<div class="ios-add"><div class="row between" style="margin-bottom:12px"><button class="link" data-act="closeSheet" style="font-size:16px">${t('cancel')}</button><b>${t('fx.wl.ios')}</b><button class="link" data-act="wlAdd" style="font-size:16px;font-weight:800">${t('fx.wl.addb')}</button></div><div style="display:flex;justify-content:center">${walletPass(true)}</div></div>`;
ACT.wlAdd=()=>{FS.wallet.added=true;sheet(null);toast(t('fx.wl.added.t'),'wallet')};

/* =====================================================================
   Home / profile / notifications integration
   ===================================================================== */
function fxLive(){const T=FS.track,B=FS.book;
  if(T.active){const pct=trackProgress();return `<div class="live-strip tap mt-3" data-go="track"><div class="row"><div class="ls-ic">${ic('drop',22)}<i class="live"></i></div><div class="grow"><div class="b">${t('fx.home.live')}</div><div class="xs" style="opacity:.8">${t('fx.home.live.d',{s:t('fx.st.'+STEPS[T.s][0])})}</div></div><span class="chev flip">${ic('next')}</span></div><div class="mini-steps mt-3">${STEPS.map((s,i)=>`<span class="${i<T.s?'ok':i===T.s?'now':''}"><i></i>${t('fx.st.'+s[0])}</span>`).join('')}</div><div class="pbar mt-2 light"><i style="width:${pct}%"></i></div></div>`}
  if(B.booked)return `<div class="live-strip tap mt-3" data-go="booked"><div class="row"><div class="ls-ic">${ic('hourglass',22)}</div><div class="grow"><div class="b">${t('fx.home.book')}</div><div class="xs" style="opacity:.8">${dayLbl(B.day)} ${B.slot} · ${t('fx.q.carsn',{n:B.ahead})}</div></div><span class="chev flip">${ic('next')}</span></div></div>`;
  return ''}
function fxWeather(){const W=FS.weather;if(!W.dust||!W.alert)return '';return `<div class="wx-card tap mt-3" data-go="weather"><div class="wx-ic">${ic('wind',26)}</div><div class="grow"><div class="b">${t('fx.w.push.t')}</div><div class="xs" style="opacity:.85">${t('fx.home.wx.d')}</div></div><button class="btn btn-primary xs" data-go="book">${t('fx.w.push.a')}</button></div>`}
const FX_TILES=[['book','pin','fx.tile.book',''],['track','drop','fx.tile.track','s'],['plate','scan','fx.tile.plate',''],['loyalty','crown','fx.tile.loy','o'],['refer','gift','fx.tile.ref','o'],['family','users','fx.tile.fam','s'],['gift','heart','fx.tile.gift','o'],['weather','wind','fx.tile.wx','s'],['rate','star','fx.tile.rate',''],['store','bag','fx.tile.store','o'],['wallet','wallet','fx.tile.wallet','s'],['help','help','fx.tile.help','']];
function fxGrid(){return `${fsec(t('fx.home.more'))}<div class="qa fx-grid">${FX_TILES.map(x=>`<button data-go="${x[0]}"><div class="q ${x[3]}">${ic(x[1])}</div>${t(x[2])}</button>`).join('')}</div>`}
function fxProfileCells(){return `<div class="card mt-3" style="padding:4px 14px">${cell('crown',t('fx.loy.t'),t('fx.tier.'+curTier().id)+' · '+num(TIER_PTS())+' '+t('fx.loy.pts'),'loyalty','')}${cell('gift',t('fx.ref.t'),t('fx.pr.ref.d'),'refer','gn')}${cell('users',t('fx.fam.t'),t('fx.pr.fam.d'),'family','aq')}${cell('heart',t('fx.gift.t'),t('fx.pr.gift.d'),'gift','')}${cell('scan',t('fx.pl.t'),t('fx.pr.pl.d'),'plate','aq')}${cell('wallet',t('fx.wl.t'),t('fx.pr.wl.d'),'wallet','gn')}${cell('wind',t('fx.w.t'),t('fx.pr.wx.d'),'weather','')}</div>`}
const _notif=SCREENS.notifications.html;SCREENS.notifications.html=()=>_notif()+`<div class="card mt-3" style="padding:4px 14px">${cell('wind',t('fx.w.t'),t('fx.pr.wx.d'),'weather','aq',`<span class="chip ${FS.weather.dust?'ok':'gray'}">${FS.weather.dust?t('on'):t('off')}</span>`)}${cell('hourglass',t('fx.book.t'),t('fx.book.notify'),'book','')}</div>`;
Object.assign(DATA.user,{});
