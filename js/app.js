/* Go Cleans customer app — single-page prototype (hash router) */
const S={
  status:'active',            // active | expired | pending | failed
  autoRenew:true, paused:false,
  sub:{pkg:'monthly',total:8,used:3,start:'2026-10-20',renew:'2026-11-19',car:'c1',branch:'b1'},
  cars:JSON.parse(JSON.stringify(DATA.cars)),
  co:{pkg:'monthly',car:'c1',branch:'b1',coupon:null,step:1,method:'card'},
  histTab:'wash', onb:0, otp:'', pay:'form', sheet:null, toast:null,
  notif:{wa:true,renew:true,wash:true,offers:false,pay:true},
  cards:[{id:'k1',brand:'Visa',last:'0000',exp:'12/29',def:true},{id:'k2',brand:'Mastercard',last:'1111',exp:'03/28',def:false}],
  carColors:{'أبيض':'#e8eef7','فضي':'#aab4c4','أسود':'#1b2233','أحمر':'#d63a3a','أزرق':'#2f6ae0','رمادي':'#6b7589'}
};
const $app=document.getElementById('app');
const go=r=>{location.hash='#/'+r};
const route=()=>{const h=(location.hash||'#/splash').slice(2).split('/');return{name:h[0]||'splash',arg:h[1]}};
const toast=(m,i='checkc')=>{S.toast={m,i};paint();clearTimeout(toast._t);toast._t=setTimeout(()=>{S.toast=null;paint()},2300)};
const sheet=(n,d)=>{S.sheet=n?{n,d}:null;paint()};

/* ---------- small components ---------- */
const topbar=(title,back,right='')=>`<div class="topbar">${back?`<button class="iconbtn" data-go="${back}" aria-label="${t('back')}">${ic('back')}</button>`:''}<h2>${title}</h2>${right}</div>`;
const sw=(on,act,arg='')=>`<button class="switch ${on?'on':''}" data-act="${act}" data-arg="${arg}" role="switch" aria-checked="${on}"></button>`;
const cell=(icon,title,sub,go_,cls='',tail='')=>`<div class="cell" data-go="${go_}"><div class="ico ${cls}">${ic(icon)}</div><div class="grow"><div class="b">${title}</div>${sub?`<div class="muted sm">${sub}</div>`:''}</div>${tail}<span class="chev flip">${ic('next')}</span></div>`;
const subBg=car=>`<div class="sc-bg"><img src="img/${car&&car.id==='c3'?'car-lexus-black':car&&car.id==='c2'?'car-gclass':'car-landcruiser'}.jpg" alt=""><i></i></div>`;
const carColor=c=>S.carColors[c]||'#2f6ae0';
const pk=id=>pkgById(id);
const saving=p=>p.washes*DATA.perWash-p.price;
const perk=k=>`<li>${ic('check')}<span>${t('perk.'+k)}</span></li>`;
const statusChip=s=>({paid:`<span class="chip ok">${t('inv.paid')}</span>`,failed:`<span class="chip err">${t('inv.failed')}</span>`,pending:`<span class="chip warn">${t('inv.pending')}</span>`})[s];
const couponCalc=(price)=>{const c=S.co.coupon&&DATA.coupons[S.co.coupon];if(!c)return 0;return c.type==='pct'?Math.round(price*c.v)/100:c.v};
const counters=()=>document.querySelectorAll('[data-count]').forEach(el=>{const to=+el.dataset.count,t0=performance.now();const f=n=>{const p=Math.min(1,(n-t0)/900);el.textContent=Math.round(to*(1-Math.pow(1-p,3)));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});

/* ---------- screens ---------- */
const SCREENS={};

SCREENS.splash={sb:'light',cls:'splash',html:()=>`
  <div class="splash-photo"><img src="img/car-suv-studio.jpg" alt=""><i></i></div>
  <div class="bubbles-wrap" style="position:absolute;inset:0">${ART.bubbles(14)}</div>
  <div class="grow" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px;position:relative">
    <div class="logo-ring"><img src="assets/logo.png" alt="Go Cleans"></div>
    <div><div style="font-size:44px;font-weight:800;line-height:1.1">${t('brand')}</div><div style="opacity:.75;margin-top:6px;font-size:16px">${t('tagline')}</div></div>
  </div>
  <div style="padding:0 30px 54px;position:relative"><div class="spin" style="width:34px;height:34px;border-width:3px;border-color:rgba(255,255,255,.2);border-top-color:var(--orange)"></div></div>`,
  after(){clearTimeout(SCREENS.splash._t);SCREENS.splash._t=setTimeout(()=>{if(route().name==='splash')go('onboarding')},2400)}};

SCREENS.onboarding={sb:'dark',html:()=>{
  const sl=[{a:ART.foam(),k:'1'},{a:ART.ring(),k:'2'},{a:ART.map(),k:'3'}][S.onb];
  return `<div class="view" style="display:flex;flex-direction:column">
  <div class="row between"><div class="brand-tile"><img src="assets/logo.png" alt=""></div><button class="link" data-go="login">${t('skip')}</button></div>
  <div class="onb-art mt-4" style="position:relative;color:#fff">${ART.bubbles(7)}${sl.a}</div>
  <div class="center" style="margin-top:28px;flex:1"><h1>${t('onb.t'+sl.k)}</h1><p class="muted mt-3" style="font-size:15.5px;padding:0 6px">${t('onb.d'+sl.k)}</p></div>
  <div class="dots mt-4">${[0,1,2].map(i=>`<i class="${i===S.onb?'on':''}"></i>`).join('')}</div>
  <div class="mt-5">${S.onb<2?`<button class="btn btn-primary" data-act="onbNext">${t('next')}</button>`:`<button class="btn btn-primary" data-go="login">${t('start')}</button>`}</div></div>`}};

SCREENS.login={sb:'light',flush:true,html:()=>`
  <div class="login-top">${ART.bubbles(8)}<div class="brand-tile" style="margin:0 auto 14px;width:76px;height:76px;border-radius:24px"><img src="assets/logo.png" style="width:56px;height:56px" alt=""></div><h1>${t('login.t')}</h1><p style="opacity:.78;margin-top:6px">${t('login.d')}</p></div>
  <div class="login-card">
    <div class="field"><label>${t('mobile')}</label><div class="input-group"><div class="cc">🇶🇦 <bdi>+974</bdi></div><input class="input ltr" inputmode="numeric" value="5000 0001" aria-label="${t('mobile')}"></div></div>
    <button class="btn btn-primary" data-go="otp">${t('login.send')}</button>
    <div class="divider"></div>
    <p class="muted sm center">${t('login.terms')}</p>
  </div>
  <div class="center muted sm" style="margin-top:22px;display:flex;gap:6px;justify-content:center;align-items:center">${ic('shield')} ${t('login.secure')}</div>`};

SCREENS.otp={sb:'dark',html:()=>`${topbar('', 'login')}
  <div class="center"><div class="pkg-ic" style="margin:0 auto 16px;width:72px;height:72px;border-radius:24px;background:var(--orange-50);color:var(--orange);font-size:34px">${ic('chat')}</div><h1>${t('otp.t')}</h1><p class="muted mt-2">${t('otp.d')} <bdi class="b" style="color:var(--ink)">+974 5000 0001</bdi></p></div>
  <div class="otp mt-5" id="otp">${[0,1,2,3].map(i=>`<input maxlength="1" inputmode="numeric" data-otp="${i}" value="${S.otp[i]||''}" aria-label="${t('otp.digit')} ${i+1}">`).join('')}</div>
  <p class="center muted sm mt-4">${t('otp.resend')} <bdi class="b blue-t">00:42</bdi></p>
  <div class="mt-5"><button class="btn btn-primary" data-go="register">${t('verify')}</button></div>
  <p class="center muted xs mt-4">${t('otp.hint')}</p>`,
  after(el){const ins=[...el.querySelectorAll('[data-otp]')];ins.forEach((inp,i)=>{inp.addEventListener('input',()=>{inp.value=inp.value.replace(/\D/,'');S.otp=ins.map(x=>x.value).join('');if(inp.value&&ins[i+1])ins[i+1].focus()});inp.addEventListener('keydown',e=>{if(e.key==='Backspace'&&!inp.value&&ins[i-1])ins[i-1].focus()})});if(!S.otp){S.otp='1234';ins.forEach((x,i)=>x.value='1234'[i])}}};

SCREENS.register={sb:'dark',html:()=>`${topbar(t('reg.t'),'otp')}
  <div class="steps"><i class="on"></i><i class="on"></i><i></i></div>
  <p class="muted mb-3">${t('reg.d')}</p>
  <div class="center mb-3"><div class="avatar" style="width:84px;height:84px;border-radius:30px;font-size:34px;margin:0 auto;position:relative">ع<span style="position:absolute;bottom:-6px;inset-inline-end:-6px;width:30px;height:30px;border-radius:50%;background:#fff;color:var(--navy-900);display:grid;place-items:center;font-size:16px;box-shadow:var(--sh-1)">${ic('edit')}</span></div></div>
  <div class="field"><label>${t('reg.name')}</label><input class="input" value="${DATA.user.name}"></div>
  <div class="field"><label>${t('reg.email')}</label><input class="input ltr" value="${DATA.user.email}"></div>
  <div class="field"><label>${t('reg.plate')}</label><input class="input ltr" value="111 222"></div>
  <div class="field"><label>${t('reg.car')}</label><div class="row gap-2"><select class="input"><option>تويوتا</option><option>نيسان</option></select><select class="input"><option>لاند كروزر</option><option>باترول</option></select></div></div>
  <div class="mt-4"><button class="btn btn-primary" data-act="finishReg">${t('reg.done')}</button></div>`};

/* ----- Home ----- */
function subCard(){
  const s=S.sub,p=pk(s.pkg),left=s.total-s.used,car=carById(s.car,S.cars),st=S.status;
  if(st!=='active'){
    const m={expired:['gray','expired',t('st.expired'),t('home.expired.d'),'refresh',t('renew.now'),'renew'],
      pending:['warn','pending',t('st.pending'),t('home.pending.d'),'card',t('pay.now'),'payPending'],
      failed:['err','failed',t('st.failed'),t('home.failed.d'),'warn',t('pay.retry'),'retry']}[st];
    return `<div class="subcard">${subBg(car)}<div class="row between"><span class="chip ${m[0]==='gray'?'glass':m[0]}">${ic(m[4],14)} ${m[2]}</span><span class="chip glass">${L(p.name)}</span></div>
    <div class="row mt-4" style="gap:16px"><div class="ring" style="--p:0"><div><b>${st==='expired'?0:left}</b><small>${t('left')}</small></div></div><div class="grow"><h2 style="font-size:20px">${m[3]}</h2><p style="opacity:.75;font-size:13.5px;margin-top:6px">${plateHtml(car?car.plate:'—')}</p></div></div>
    <button class="btn btn-primary mt-4" data-act="${m[6]}">${m[5]}</button></div>`;
  }
  return `<div class="subcard">${subBg(car)}<div class="row between"><div class="row gap-2"><span class="chip glass"><i class="live"></i> ${t('st.active')}</span></div><span class="chip glass">${ic('sparkle',14)} ${L(p.name)}</span></div>
  <div class="row mt-4" style="gap:18px">
    <div class="ring" style="--p:${left/s.total*100}"><div><b data-count="${left}">${left}</b><small>${t('left')}</small></div></div>
    <div class="grow"><div style="opacity:.7;font-size:12.5px">${t('home.car')}</div><div class="b" style="font-size:17px;margin:2px 0 8px">${car.make} ${car.model}</div>${plateHtml(car.plate)}
    <div class="row gap-2 mt-3" style="font-size:12.5px;opacity:.85">${ic('pin',15)} ${L(branchById(s.branch).name)}</div></div></div>
  <div class="stats"><div><b>${s.used}</b><span>${t('used')}</span></div><div><b>${left}</b><span>${t('left')}</span></div><div><b>${s.total}</b><span>${t('total')}</span></div></div>
  <div class="renew-row"><div>${ic('calendar',17)} ${S.paused?t('home.paused'):t('home.renews')} <b>${fmtDate(s.renew)}</b></div><span style="opacity:.8;font-size:12.5px"><bdi>${t('home.days',{n:23})}</bdi></span></div>
  <div class="glass row between" style="border-radius:18px;padding:11px 14px;margin-top:12px"><div class="row gap-2">${ic('refresh',20)}<div><div class="b" style="font-size:14px">${t('autorenew')}</div><div style="font-size:11.5px;opacity:.75">${S.autoRenew?t('autorenew.on'):t('autorenew.off')}</div></div></div>${sw(S.autoRenew,'toggleRenew')}</div>
  <div class="row gap-2 mt-3"><button class="btn btn-glass sm grow" style="width:auto;flex:1" data-act="togglePause">${ic(S.paused?'play':'pause',18)} ${S.paused?t('resume'):t('pause')}</button><button class="btn btn-glass sm" style="flex:1;width:auto" data-go="subscription">${ic('settings',18)} ${t('manage')}</button></div></div>`;
}
SCREENS.home={nav:'home',sb:'light',flush:true,html:()=>{
  const p=pk(S.sub.pkg),paid=S.sub.used*DATA.perWash,subCost=p.price,projected=saving(p);
  const banner={failed:`<div class="banner err">${ic('warn')}<div class="grow"><b>${t('bn.failed')}</b><div class="sm">${t('bn.failed.d')}</div></div><button class="btn btn-danger xs" data-go="cards">${t('update')}</button></div>`,
    pending:`<div class="banner warn">${ic('clock')}<div class="grow"><b>${t('bn.pending')}</b><div class="sm">${t('bn.pending.d')}</div></div></div>`,expired:'',active:''}[S.status];
  return `<div class="hero" style="padding-bottom:150px">${ART.bubbles(8)}
    <div class="row"><div class="avatar">ع</div><div class="grow"><div class="hero-sub">${t('home.hello')}</div><div class="hero-title">${DATA.user.name} 👋</div></div>
    <button class="iconbtn glass" data-go="notifications" aria-label="${t('notifs')}">${ic('bell')}<i class="dot-badge" style="border-color:#12306f"></i></button></div></div>
  <div style="padding:0 18px;margin-top:-130px;position:relative;z-index:3">${subCard()}
    ${fxLive()}${fxWeather()}<div class="mt-4">${banner}</div>
    <div class="card savebox mt-3"><div class="row between"><div><div class="muted sm b">${t('save.t')}</div><div class="big mt-2"><span data-count="${projected}">${projected}</span> <span style="font-size:16px">${t('cur')}</span></div><div class="muted xs mt-2">${t('save.d')}</div></div><div class="pkg-ic" style="background:var(--orange-100);color:var(--orange);width:54px;height:54px;font-size:28px">${ic('percent')}</div></div>
      <div class="mt-4 col" style="gap:10px"><div><div class="row between xs b"><span>${t('save.ppw')}</span><span><bdi>${p.washes*DATA.perWash}</bdi> ${t('cur')}</span></div><div class="bar gray mt-2"><i style="width:100%"></i></div></div>
      <div><div class="row between xs b"><span>${t('save.sub')}</span><span class="aqua-t"><bdi>${subCost}</bdi> ${t('cur')}</span></div><div class="bar mt-2"><i style="width:${subCost/(p.washes*DATA.perWash)*100}%"></i></div></div></div></div>
    <div class="section-h"><h3>${t('quick')}</h3></div>
    <div class="qa"><button data-go="packages"><div class="q o">${ic('tag')}</div>${t('q.packages')}</button><button data-go="cars"><div class="q">${ic('car')}</div>${t('q.cars')}</button><button data-go="history"><div class="q s">${ic('receipt')}</div>${t('q.invoices')}</button><button data-act="book"><div class="q">${ic('pin')}</div>${t('q.branches')}</button></div>
    ${fxGrid()}
    <div class="section-h"><h3>${t('lastwash')}</h3><button class="link" data-go="history">${t('all')}</button></div>
    <div class="card tap" data-go="history"><div class="hist"><div class="ic">${ic('drop')}</div><div class="grow"><div class="b">${DATA.history[0].svc}</div><div class="muted sm">${DATA.history[0].branch} · ${fmtDate(DATA.history[0].date)}</div></div><div class="star">${'★'.repeat(DATA.history[0].rating)}</div></div></div>
    <div class="mt-4">${fxLoyaltyCard()}</div>
  </div>`}};

/* ----- Packages ----- */
SCREENS.packages={nav:'packages',sb:'dark',html:()=>`
  <div class="topbar"><h1 style="font-size:26px" class="grow">${t('pk.t')}</h1><button class="iconbtn" data-go="notifications">${ic('bell')}</button></div>
  <p class="muted" style="margin:-8px 0 16px">${t('pk.d')}</p>
  <div class="list">${DATA.packages.slice().reverse().map(p=>`
    <div class="pkg ${p.featured?'feat':''} card-tap" data-go="package/${p.id}" style="cursor:pointer">
      <div class="row"><div class="pkg-ic">${ic(p.icon)}</div><div class="grow"><h3 style="font-size:20px">${L(p.name)}</h3><div class="sm" style="opacity:.7">${L(p.tag)}</div></div>${p.featured?`<span class="crown">${t('best')}</span>`:''}</div>
      <div class="row between mt-4" style="align-items:flex-end"><div class="price"><bdi>${p.price}</bdi> <small>${t('cur')}</small></div><span class="save-pill">${t('pk.save',{n:saving(p)})}</span></div>
      <ul>${p.perks.slice(0,3).map(perk).join('')}</ul>
      <div class="row between mt-4"><span class="sm b" style="opacity:.8">${t('pk.washes',{n:p.washes})} · <bdi>${(p.price/p.washes).toFixed(1)}</bdi> ${t('cur')}/${t('wash')}</span><span class="b" style="color:${p.featured?'var(--orange-2)':'var(--orange)'}">${t('details')} <span class="flip" style="display:inline-block">${ic('next',14)}</span></span></div>
    </div>`).join('')}</div>
  <div class="banner info mt-4" style="margin-top:18px">${ic('info')}<div class="sm">${t('pk.note',{n:DATA.perWash})}</div></div>`};

SCREENS.package={sb:'light',flush:true,html:(id)=>{const p=pk(id)||DATA.packages[2];return `
  <div class="hero" style="padding-bottom:40px">${ART.bubbles(6)}<div class="row"><button class="iconbtn glass" data-go="packages" aria-label="${t('back')}">${ic('back')}</button><div class="grow"></div>${p.featured?`<span class="crown">${t('best')}</span>`:''}</div>
    <div class="mt-3">${ART.car({src:'img/car-lexus-lx.jpg',h:176,pos:'center 62%'})}</div></div>
  <div style="padding:20px 18px 120px">
    <div class="row between"><div><h1>${L(p.name)}</h1><div class="muted">${L(p.tag)} · ${t('pk.washes',{n:p.washes})}</div></div><div class="price" style="font-size:34px;font-weight:800;text-align:end"><bdi>${p.price}</bdi><div class="sm muted">${t('cur')}</div></div></div>
    <div class="card savebox mt-4 row between"><div><div class="b">${t('pk.savebig',{n:saving(p)})}</div><div class="muted sm">${t('pk.vs',{a:p.washes*DATA.perWash,b:p.price})}</div></div><span class="pkg-ic" style="background:var(--orange-100);color:var(--orange)">${ic('percent')}</span></div>
    <div class="section-h"><h3>${t('pk.incl')}</h3></div>
    <div class="card"><ul class="col" style="list-style:none;gap:12px">${p.perks.map(k=>`<li class="row" style="gap:10px"><span class="pkg-ic" style="width:32px;height:32px;border-radius:10px;font-size:17px;background:var(--orange-50);color:var(--orange)">${ic('check')}</span><span class="b" style="font-size:14.5px">${t('perk.'+k)}</span></li>`).join('')}</ul></div>
    <div class="section-h"><h3>${t('pk.how')}</h3></div>
    <div class="card col" style="gap:14px">${[1,2,3].map(i=>`<div class="row" style="align-items:flex-start"><span class="avatar" style="width:34px;height:34px;border-radius:12px;font-size:15px">${i}</span><div><div class="b">${t('how.'+i)}</div><div class="muted sm">${t('how.'+i+'d')}</div></div></div>`).join('')}</div>
  </div>
  <div class="stickybar" style="position:absolute;bottom:0;inset-inline:0;margin:0;padding:14px 18px 22px;background:linear-gradient(transparent,var(--bg) 30%)"><button class="btn btn-primary" data-act="subscribe" data-arg="${p.id}">${t('pk.sub')} · ${qar(p.price)}</button></div>`}};

/* ----- Checkout ----- */
function coSteps(){return `<div class="steps">${[1,2,3].map(i=>`<i class="${i<=S.co.step?'on':''}"></i>`).join('')}</div>`}
SCREENS.checkout={sb:'dark',html:()=>{
  const c=S.co,p=pk(c.pkg),disc=couponCalc(p.price),total=p.price-disc,car=carById(c.car,S.cars);
  const title=[t('co.t1'),t('co.t2'),t('co.t3')][c.step-1];
  let body='';
  if(c.step===1) body=`<div class="list">${S.cars.map(x=>`<div class="card sel tap ${c.car===x.id?'on':''}" data-act="coCar" data-arg="${x.id}"><div class="row"><div class="carimg">${ART.thumb(x)}</div><div class="grow"><div class="b">${x.make} ${x.model}</div><div class="muted sm mt-2">${plateHtml(x.plate)}</div></div><span class="radio"></span></div></div>`).join('')}
    <button class="btn btn-ghost" data-act="sheet" data-arg="addCar">${ic('plus')} ${t('cars.add')}</button></div>`;
  if(c.step===2) body=`<div class="list">${DATA.branches.map(b=>`<div class="card sel tap ${c.branch===b.id?'on':''}" data-act="coBranch" data-arg="${b.id}"><div class="row"><div class="pkg-ic">${ic('pin')}</div><div class="grow"><div class="b">${L(b.name)}</div><div class="muted sm">${L(b.area)}</div><div class="row gap-2 mt-2 xs"><span class="chip ${b.busy==='low'?'ok':b.busy==='mid'?'warn':'err'}">${t('busy.'+b.busy)}</span><span class="muted"><bdi>${b.dist}</bdi> ${t('km')}</span></div></div><span class="radio"></span></div></div>`).join('')}</div>`;
  if(c.step===3) body=`<div class="card"><div class="row"><div class="pkg-ic">${ic(p.icon)}</div><div class="grow"><div class="b">${t('pk.name',{n:L(p.name)})}</div><div class="muted sm">${t('pk.washes',{n:p.washes})} · ${L(p.tag)}</div></div><b>${qar(p.price)}</b></div><div class="divider"></div>
    <div class="kv"><span>${t('co.car')}</span><b>${car.make} ${car.model}</b></div><div class="kv"><span>${t('co.plate')}</span><b><bdi>${car.plate}</bdi></b></div><div class="kv"><span>${t('co.branch')}</span><b>${L(branchById(c.branch).name)}</b></div></div>
    <div class="card mt-3"><div class="b mb-2">${t('co.coupon')}</div>${c.coupon?`<div class="banner ok" style="margin:0"><span>${ic('checkc')}</span><div class="grow"><b><bdi>${c.coupon}</bdi></b><div class="sm">${t('co.coupon.ok',{n:disc})}</div></div><button data-act="rmCoupon" class="iconbtn" style="width:32px;height:32px">${ic('x',16)}</button></div>`:`<div class="row gap-2"><input id="couponIn" class="input ltr" placeholder="${t('co.coupon.ph')}" style="text-transform:uppercase"><button class="btn btn-dark sm" style="height:52px" data-act="applyCoupon">${t('apply')}</button></div><p class="muted xs mt-2">${t('co.coupon.hint')}</p>`}</div>
    <div class="card mt-3"><div class="kv"><span>${t('co.sub')}</span><b>${qar(p.price)}</b></div><div class="kv"><span>${t('co.disc')}</span><b class="${disc?'ok-t':''}">${disc?'− ':''}${qar(disc)}</b></div><div class="kv"><span>${t('co.vat')}</span><b>${qar(0)}</b></div><div class="total"><span>${t('co.total')}</span><span style="color:var(--orange)">${qar(total)}</span></div></div>
    <div class="card mt-3"><div class="b mb-2">${t('co.method')}</div>${[['card','Visa / Mastercard','card'],['knet','KNET / NAPS','wallet'],['apple','Apple Pay','phone']].map(m=>`<div class="pay-method sel ${c.method===m[0]?'on':''}" data-act="coMethod" data-arg="${m[0]}" style="margin-bottom:8px"><div class="pm-logo">${ic(m[2],18)}</div><div class="grow b">${m[1]}</div><span class="radio"></span></div>`).join('')}
    <div class="row gap-2 xs muted mt-2">${ic('lock',14)} ${t('co.secure')}</div></div>`;
  return `${topbar(title, c.step>1?null:'package/'+c.pkg)}${c.step>1?'':''}${coSteps()}${body}
  <div class="stickybar">${c.step<3?`<button class="btn btn-primary" data-act="coNext">${t('continue')}</button>`:`<button class="btn btn-primary" data-act="toPay">${t('co.pay')} · ${qar(total)}</button>`}${c.step>1?`<button class="btn btn-soft mt-2" data-act="coBack" style="height:46px">${t('back')}</button>`:''}</div>`},
  nofix:true};

SCREENS.pay={sb:'dark',cls:'',html:()=>{
  const p=pk(S.co.pkg),total=p.price-couponCalc(p.price);
  if(S.pay==='processing')return `<div class="center" style="margin-top:150px"><div class="spin"></div><h2 class="mt-5">${t('pay.processing')}</h2><p class="muted mt-2">${t('pay.processing.d')}</p></div>`;
  return `<div class="mf-head" style="margin:-56px -18px 18px"><div class="row between" style="margin-top:0"><button class="iconbtn" data-go="checkout">${ic('back')}</button><div class="chip gray">${ic('lock',13)} ${t('pay.secure')}</div></div>
    <div class="muted sm mt-4">${t('pay.gateway')}</div><div style="font-size:25px;font-weight:800;letter-spacing:-.5px;color:#0d47c4;margin:2px 0 12px">MyFatoorah <span class="chip warn" style="vertical-align:middle">${t('pay.demo')}</span></div>
    <div style="font-size:38px;font-weight:800;color:var(--navy-900)">${qar(total)}</div><div class="muted sm">Go Cleans · ${t('pk.name',{n:L(p.name)})}</div></div>
  <div class="seg mb-3"><button class="on">${t('pay.card')}</button><button data-act="toast" data-arg="KNET">KNET</button><button data-act="toast" data-arg="Apple Pay">Apple Pay</button></div>
  <div class="card"><div class="field"><label>${t('pay.num')}</label><input class="input ltr" value="4000 0000 0000 0000"></div><div class="row gap-2"><div class="field grow"><label>${t('pay.exp')}</label><input class="input ltr" value="12/29"></div><div class="field grow"><label>CVV</label><input class="input ltr" value="123"></div></div>
  <div class="field" style="margin:0"><label>${t('pay.holder')}</label><input class="input ltr" value="DEMO CUSTOMER"></div></div>
  <div class="row between card mt-3"><div><div class="b">${t('pay.save')}</div><div class="muted xs">${t('pay.save.d')}</div></div>${sw(true,'noop')}</div>
  <div class="mt-4"><button class="btn btn-primary" data-act="doPay">${ic('lock',18)} ${t('pay.btn')} ${qar(total)}</button><button class="btn btn-soft mt-2" style="height:44px" data-act="failPay">${t('pay.simfail')}</button></div>
  <p class="center muted xs mt-4">${t('pay.footer')}</p>`}};

SCREENS.success={sb:'light',cls:'splash',html:()=>{const p=pk(S.co.pkg),total=p.price-couponCalc(p.price);return `${ART.confetti()}
  <div class="grow" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:18px;padding:0 24px;text-align:center;position:relative">
    <div class="successmark">${ic('check')}</div><h1 style="margin-top:14px">${t('ok.t')}</h1><p style="opacity:.8">${t('ok.d',{n:L(p.name)})}</p>
    <div class="glass" style="width:100%;border-radius:24px;padding:16px;text-align:start;margin-top:8px"><div class="kv" style="border-color:rgba(255,255,255,.15)"><span style="color:#b9d7e8">${t('ok.ref')}</span><b><bdi>GC-DEMO-2048</bdi></b></div><div class="kv" style="border-color:rgba(255,255,255,.15)"><span style="color:#b9d7e8">${t('ok.paid')}</span><b>${qar(total)}</b></div><div class="kv"><span style="color:#b9d7e8">${t('ok.start')}</span><b>${fmtDate(DATA.today)}</b></div></div></div>
  <div style="padding:0 22px 40px;position:relative"><button class="btn btn-primary" data-act="finishPurchase">${t('ok.home')}</button><button class="btn btn-glass mt-2" data-go="history" style="height:48px">${ic('receipt',18)} ${t('ok.invoice')}</button></div>`}};

/* ----- Cars ----- */
SCREENS.cars={nav:'cars',sb:'dark',html:()=>`
  ${topbar(t('cars.t'),null,`<button class="btn btn-primary sm" data-act="sheet" data-arg="addCar">${ic('plus',18)} ${t('add')}</button>`)}
  <div class="list">${S.cars.map(c=>{const p=c.pkg&&pk(c.pkg);return `<div class="card"><div class="row"><div class="carimg">${ART.thumb(c)}</div><div class="grow"><div class="b" style="font-size:16.5px">${c.make} ${c.model}</div><div class="muted sm"><bdi>${c.year}</bdi> · ${c.color}</div><div class="mt-2">${plateHtml(c.plate)}</div></div></div>
  <div class="divider"></div><div class="row between">${p?`<span class="chip orange">${ic('sparkle',13)} ${t('pk.name',{n:L(p.name)})}</span>`:`<span class="chip gray">${t('cars.nopkg')}</span>`}
  <div class="row gap-2"><button class="btn btn-soft xs" data-act="sheet" data-arg="assign:${c.id}">${p?t('cars.change'):t('cars.assign')}</button><button class="iconbtn" style="width:34px;height:34px;border-radius:11px;color:var(--err)" data-act="sheet" data-arg="rmCar:${c.id}" aria-label="${t('remove')}">${ic('trash',17)}</button></div></div></div>`}).join('')}</div>
  ${S.cars.length===0?`<div class="center muted" style="margin-top:60px">${ic('car',60)}<p class="mt-3">${t('cars.empty')}</p></div>`:''}`};

/* ----- Subscription management ----- */
SCREENS.subscription={nav:'home',sb:'dark',html:()=>{
  const s=S.sub,p=pk(s.pkg),st=S.status,car=carById(s.car,S.cars)||S.cars[0];
  const stChip={active:`<span class="chip ok">${t('st.active')}</span>`,expired:`<span class="chip gray">${t('st.expired')}</span>`,pending:`<span class="chip warn">${t('st.pending')}</span>`,failed:`<span class="chip err">${t('st.failed')}</span>`}[st];
  const alert={expired:`<div class="banner info">${ic('info')}<div class="grow"><b>${t('sm.expired')}</b><div class="sm">${t('sm.expired.d')}</div></div></div>`,pending:`<div class="banner warn">${ic('clock')}<div class="grow"><b>${t('sm.pending')}</b><div class="sm">${t('sm.pending.d',{n:p.price})}</div></div></div>`,failed:`<div class="banner err">${ic('warn')}<div class="grow"><b>${t('sm.failed')}</b><div class="sm">${t('sm.failed.d')}</div></div></div>`,active:''}[st];
  const cta={expired:`<button class="btn btn-primary" data-act="renewExpired">${ic('refresh',20)} ${t('renew.now')} · ${qar(p.price)}</button>`,pending:`<button class="btn btn-primary" data-act="payPending">${ic('card',20)} ${t('pay.now')} · ${qar(p.price)}</button>`,failed:`<button class="btn btn-primary" data-act="retry">${ic('refresh',20)} ${t('pay.retry')}</button><button class="btn btn-ghost mt-2" data-go="cards">${ic('card',20)} ${t('card.update')}</button>`,active:''}[st];
  return `${topbar(t('sm.t'),'home')}
  <div class="seg mb-3" style="margin-top:-4px;font-size:12px">${['active','expired','pending','failed'].map(x=>`<button class="${st===x?'on':''}" data-act="setStatus" data-arg="${x}" style="font-size:12.5px">${t('st.'+x)}</button>`).join('')}</div>
  <div class="xs muted center mb-3" style="margin-top:-6px">${t('sm.demo')}</div>
  ${alert}
  <div class="card"><div class="row between"><div class="row"><div class="pkg-ic" style="background:var(--orange-50);color:var(--orange)">${ic(p.icon)}</div><div><div class="b" style="font-size:17px">${t('pk.name',{n:L(p.name)})}</div><div class="muted sm">${qar(p.price)} / ${L(p.tag)}</div></div></div>${stChip}</div><div class="divider"></div>
   <div class="kv"><span>${t('sm.car')}</span><b>${car.make} ${car.model}</b></div><div class="kv"><span>${t('sm.start')}</span><b>${fmtDate(s.start)}</b></div><div class="kv"><span>${t('sm.renew')}</span><b>${st==='expired'?'—':fmtDate(s.renew)}</b></div><div class="kv"><span>${t('sm.washes')}</span><b><bdi>${s.total-s.used}</bdi> / <bdi>${s.total}</bdi></b></div>
   <div class="kv"><span>${t('sm.card')}</span><b><bdi>Visa •••• 0000</bdi></b></div></div>
  <div class="mt-3">${cta}</div>
  ${st==='active'?`<div class="card mt-3"><div class="row between"><div class="row">${ic('refresh',22)}<div><div class="b">${t('autorenew')}</div><div class="muted xs">${t('sm.auto.d')}</div></div></div>${sw(S.autoRenew,'toggleRenew')}</div><div class="divider"></div><div class="row between"><div class="row">${ic('pause',22)}<div><div class="b">${t('sm.pause')}</div><div class="muted xs">${t('sm.pause.d')}</div></div></div>${sw(S.paused,'togglePause')}</div></div>`:''}
  <div class="card mt-3" style="padding:4px 14px">${cell('card',t('card.update'),'Visa •••• 0000','cards')}${cell('tag',t('sm.change'),t('sm.change.d'),'packages','aq')}${cell('receipt',t('q.invoices'),'','history','gn')}</div>
  ${st==='active'||st==='pending'?`<button class="btn btn-danger mt-4" data-act="sheet" data-arg="cancel">${t('sm.cancel')}</button>`:''}`}};

SCREENS.cards={sb:'dark',html:()=>`${topbar(t('card.t'),'subscription')}
  <div class="banner info">${ic('shield')}<div class="sm">${t('card.d')}</div></div>
  <div class="list">${S.cards.map((k,i)=>`<div class="card" style="${i===0?'background:var(--grad-brand);color:#fff;border:0;box-shadow:0 18px 38px rgba(7,20,51,.35)':''}"><div class="row between"><b style="font-size:18px;font-style:italic">${k.brand}</b>${k.def?`<span class="chip ${i===0?'glass':'ok'}">${t('card.def')}</span>`:`<button class="link" data-act="defCard" data-arg="${k.id}">${t('card.mkdef')}</button>`}</div><div style="font-size:22px;letter-spacing:3px;margin:18px 0 10px;direction:ltr;text-align:start;font-weight:700">•••• •••• •••• ${k.last}</div><div class="row between sm" style="opacity:.8"><span>${t('pay.exp')} <bdi>${k.exp}</bdi></span><span>DEMO CUSTOMER</span></div></div>`).join('')}</div>
  <button class="btn btn-primary mt-4" data-act="sheet" data-arg="addCard">${ic('plus')} ${t('card.add')}</button>`};

/* ----- History & invoices ----- */
SCREENS.history={nav:'history',sb:'dark',html:()=>{const tab=S.histTab;return `
  <div class="topbar"><h1 style="font-size:26px" class="grow">${t('hist.t')}</h1></div>
  <div class="seg mb-3"><button class="${tab==='wash'?'on':''}" data-act="histTab" data-arg="wash">${t('hist.washes')}</button><button class="${tab==='inv'?'on':''}" data-act="histTab" data-arg="inv">${t('hist.invoices')}</button></div>
  ${tab==='wash'?`<div class="row gap-2 mb-3"><div class="card grow center" style="padding:12px"><div class="xb" style="font-size:24px;color:var(--orange)">${DATA.history.length}</div><div class="muted xs">${t('hist.total')}</div></div><div class="card grow center" style="padding:12px"><div class="xb" style="font-size:24px;color:var(--blue-600)">4.6</div><div class="muted xs">${t('hist.rate')}</div></div><div class="card grow center" style="padding:12px"><div class="xb" style="font-size:24px;color:var(--ok)">${qar(41)}</div><div class="muted xs">${t('hist.saved')}</div></div></div>
  <div class="list">${DATA.history.map(h=>`<div class="card"><div class="hist"><div class="ic">${ic('drop')}</div><div class="grow"><div class="b">${h.svc}</div><div class="muted sm">${h.branch} · ${h.car}</div><div class="muted xs mt-2">${fmtDate(h.date)} · ${h.time}</div></div><div style="text-align:end"><div class="star">${'★'.repeat(h.rating)}</div>${h.src==='sub'?`<span class="chip aqua mt-2">${t('hist.sub')}</span>`:`<b class="sm">${qar(h.amount)}</b>`}</div></div></div>`).join('')}</div>`
  :`<div class="list">${DATA.invoices.map(v=>`<div class="card tap" data-act="sheet" data-arg="inv:${v.id}"><div class="row"><div class="pkg-ic" style="background:var(--blue-50);color:var(--blue-600)">${ic('receipt')}</div><div class="grow"><div class="b">${v.title}</div><div class="muted xs"><bdi>${v.id}</bdi> · ${fmtDate(v.date)}</div></div><div style="text-align:end"><b>${qar(v.amount)}</b><div class="mt-2">${statusChip(v.status)}</div></div></div></div>`).join('')}</div>`}`}};

/* ----- Profile ----- */
SCREENS.profile={nav:'profile',sb:'light',flush:true,html:()=>`
  <div class="hero" style="padding-bottom:84px;text-align:center">${ART.bubbles(6)}<div class="avatar" style="width:86px;height:86px;border-radius:30px;font-size:36px;margin:8px auto 12px">ع</div><div class="hero-title">${DATA.user.name}</div><div class="hero-sub mt-2"><bdi>+974 ${DATA.user.mobile}</bdi></div></div>
  <div style="padding:0 18px 20px;margin-top:-52px;position:relative;z-index:2">
   ${fxLoyaltyCard()}
   ${fxProfileCells()}
   <div class="card mt-3" style="padding:4px 14px">${cell('user',t('pr.info'),DATA.user.email,'register')}${cell('phone',t('pr.mobile'),'+974 '+DATA.user.mobile,'mobile','aq')}${cell('car',t('cars.t'),t('pr.cars',{n:S.cars.length}),'cars')}${cell('card',t('card.t'),'Visa •••• 0000','cards','gn')}</div>
   <div class="card mt-3" style="padding:4px 14px">${cell('bell',t('notifs'),t('pr.notif.d'),'notifications','aq',`<span class="chip ok">${t('wa')}</span>`)}${cell('help',t('pr.help'),t('pr.help.d'),'help','gn')}${cell('doc',t('pr.terms'),'','terms')}</div>
   <button class="btn btn-danger mt-4" data-go="login">${ic('logout',20)} ${t('pr.logout')}</button><p class="center muted xs mt-4"><bdi>Go Cleans v0.1 · Prototype</bdi></p></div>`};

SCREENS.mobile={sb:'dark',html:()=>`${topbar(t('pr.mobile'),'profile')}
  <div class="banner info">${ic('info')}<div class="sm">${t('mob.d')}</div></div>
  <div class="field"><label>${t('mob.cur')}</label><input class="input ltr" value="+974 ${DATA.user.mobile}" disabled></div>
  <div class="field"><label>${t('mob.new')}</label><div class="input-group"><div class="cc">🇶🇦 <bdi>+974</bdi></div><input class="input ltr" placeholder="5000 0002"></div></div>
  <button class="btn btn-primary" data-act="sheet" data-arg="mobOtp">${t('login.send')}</button>`};

SCREENS.notifications={sb:'dark',html:()=>{const n=S.notif;const row=(k,ic_,key)=>`<div class="cell" style="cursor:default"><div class="ico ${key==='wa'?'gn':'aq'}">${ic(ic_)}</div><div class="grow"><div class="b">${t('nt.'+key)}</div><div class="muted xs">${t('nt.'+key+'.d')}</div></div>${sw(n[key],'toggleNotif',key)}</div>`;return `${topbar(t('notifs'),'profile')}
  <div class="card" style="background:linear-gradient(135deg,#0b3d2c,#128c5a);color:#fff;border:0"><div class="row"><div class="pkg-ic" style="background:rgba(255,255,255,.18);color:#fff">${ic('chat')}</div><div class="grow"><b style="font-size:16.5px">${t('nt.wa.t')}</b><div class="sm" style="opacity:.85">${t('nt.wa.d2')}</div></div>${sw(n.wa,'toggleNotif','wa')}</div></div>
  <div class="card mt-3" style="padding:4px 14px;${n.wa?'':'opacity:.5;pointer-events:none'}">${row('renew','calendar','renew')}${row('wash','drop','wash')}${row('pay','card','pay')}${row('offers','gift','offers')}</div>
  <div class="card mt-3"><div class="b mb-2">${t('nt.time')}</div><div class="pills">${['9:00 ص','12:00 م','5:00 م','8:00 م'].map((x,i)=>`<button class="pill ${i===1?'on':''}">${x}</button>`).join('')}</div></div>
  <div class="card mt-3"><div class="b mb-2">${t('nt.preview')}</div><div style="background:#e7ffdb;border-radius:16px 16px 4px 16px;padding:12px 14px;font-size:14px;color:#102a12;line-height:1.7">${t('nt.sample')}<div class="xs" style="opacity:.55;text-align:start;margin-top:4px">12:00 م ✓✓</div></div></div>`}};

SCREENS.help={sb:'dark',html:()=>`${topbar(t('pr.help'),'profile')}<div class="card center"><div class="pkg-ic" style="margin:0 auto 12px;width:64px;height:64px;font-size:30px;background:var(--ok-bg);color:var(--ok)">${ic('chat')}</div><h3>${t('help.t')}</h3><p class="muted sm mt-2">${t('help.d')}</p><button class="btn btn-primary mt-4" data-act="toast" data-arg="${t('help.open')}">${t('help.btn')}</button></div>`};
SCREENS.terms=SCREENS.help;

/* ---------- sheets ---------- */
function sheetHtml(){
  const [n,id]=(S.sheet.n||'').split(':');
  if(n==='addCar'){const mk=DATA.makes;const sel=S.sheet.d||{};const cur=mk.find(m=>m.id===(sel.make||'toyota'));
    return `<h2>${t('cars.add')}</h2><p class="muted sm mb-3">${t('cars.add.d')}</p>
    <div class="field"><label>${t('reg.plate')}</label><input id="f_plate" class="input ltr" placeholder="123 456"></div>
    <div class="row gap-2"><div class="field grow"><label>${t('car.make')}</label><select id="f_make" class="input" data-act-change="addCarMake">${mk.map(m=>`<option value="${m.id}" ${m.id===cur.id?'selected':''}>${L(m.name)}</option>`).join('')}</select></div><div class="field grow"><label>${t('car.model')}</label><select id="f_model" class="input">${cur.models.map(x=>`<option>${x}</option>`).join('')}</select></div></div>
    <div class="row gap-2"><div class="field grow"><label>${t('car.year')}</label><select id="f_year" class="input">${[2026,2025,2024,2023,2022,2021,2020,2019].map(y=>`<option>${y}</option>`).join('')}</select></div><div class="field grow"><label>${t('car.color')}</label><select id="f_color" class="input">${Object.keys(S.carColors).map(c=>`<option>${c}</option>`).join('')}</select></div></div>
    <button class="btn btn-primary" data-act="saveCar">${t('save')}</button>`}
  if(n==='assign'){const c=carById(id,S.cars);return `<h2>${t('cars.assign.t')}</h2><p class="muted sm mb-3">${c.make} ${c.model}</p><div class="list">${DATA.packages.map(p=>`<div class="card sel tap ${c.pkg===p.id?'on':''}" data-act="assignPkg" data-arg="${id}|${p.id}"><div class="row"><div class="pkg-ic">${ic(p.icon)}</div><div class="grow"><div class="b">${t('pk.name',{n:L(p.name)})}</div><div class="muted xs">${t('pk.washes',{n:p.washes})} · ${L(p.tag)}</div></div><b>${qar(p.price)}</b></div></div>`).join('')}<button class="btn btn-ghost" data-act="assignPkg" data-arg="${id}|">${t('cars.unassign')}</button></div>`}
  if(n==='rmCar'){const c=carById(id,S.cars);return `<div class="center"><div class="pkg-ic" style="margin:0 auto 14px;width:68px;height:68px;background:var(--err-bg);color:var(--err);font-size:30px">${ic('trash')}</div><h2>${t('cars.rm.t')}</h2><p class="muted mt-2">${t('cars.rm.d',{n:c.make+' '+c.model})}</p></div><div class="row gap-2 mt-5"><button class="btn btn-ghost" data-act="closeSheet">${t('cancel')}</button><button class="btn btn-danger" style="background:var(--err);color:#fff" data-act="rmCar" data-arg="${id}">${t('remove')}</button></div>`}
  if(n==='cancel')return `<div class="center"><div class="pkg-ic" style="margin:0 auto 14px;width:68px;height:68px;background:var(--err-bg);color:var(--err);font-size:30px">${ic('warn')}</div><h2>${t('cancel.t')}</h2><p class="muted mt-2">${t('cancel.d',{d:fmtDate(S.sub.renew)})}</p></div>
    <div class="list mt-4">${['r1','r2','r3','r4'].map((r,i)=>`<div class="card sel tap ${i===0?'on':''}" style="padding:12px"><div class="row"><span class="radio"></span><span class="b sm">${t('cancel.'+r)}</span></div></div>`).join('')}</div>
    <div class="col mt-5" style="gap:8px"><button class="btn btn-primary" data-act="closeSheet">${t('cancel.keep')}</button><button class="btn btn-danger" data-act="doCancel">${t('cancel.confirm')}</button></div>`;
  if(n==='inv'){const v=DATA.invoices.find(x=>x.id===id);return `<div class="center"><div class="pkg-ic" style="margin:0 auto 12px;background:var(--blue-50);color:var(--blue-600)">${ic('receipt')}</div><h2>${t('inv.t')}</h2><div class="muted sm"><bdi>${v.id}</bdi></div></div><div class="card mt-4" style="box-shadow:none;background:#f8fafd"><div class="kv"><span>${t('inv.item')}</span><b>${v.title}</b></div><div class="kv"><span>${t('inv.date')}</span><b>${fmtFull(v.date)}</b></div><div class="kv"><span>${t('inv.method')}</span><b><bdi>${v.method}</bdi></b></div><div class="kv"><span>${t('inv.status')}</span>${statusChip(v.status)}</div><div class="total"><span>${t('co.total')}</span><span>${qar(v.amount)}</span></div></div>
    <div class="row gap-2 mt-4">${v.status==='failed'?`<button class="btn btn-primary" data-act="payPending">${t('pay.now')}</button>`:`<button class="btn btn-primary" data-act="dlInv">${ic('download',19)} ${t('inv.pdf')}</button>`}<button class="btn btn-ghost" data-act="closeSheet">${t('close')}</button></div>`}
  if(n==='mobOtp')return `<div class="center"><h2>${t('otp.t')}</h2><p class="muted mt-2 mb-4">${t('otp.d')} <bdi class="b" style="color:var(--ink)">+974 5000 0002</bdi></p></div><div class="otp">${['1','2','3','4'].map(x=>`<input maxlength="1" value="${x}">`).join('')}</div><button class="btn btn-primary mt-5" data-act="mobDone">${t('verify')}</button>`;
  if(n==='addCard')return `<h2>${t('card.add')}</h2><div class="field mt-3"><label>${t('pay.num')}</label><input class="input ltr" placeholder="0000 0000 0000 0000"></div><div class="row gap-2"><div class="field grow"><label>${t('pay.exp')}</label><input class="input ltr" placeholder="MM/YY"></div><div class="field grow"><label>CVV</label><input class="input ltr" placeholder="000"></div></div><p class="muted xs mb-3">${ic('lock',13)} ${t('co.secure')}</p><button class="btn btn-primary" data-act="saveCard">${t('card.save')}</button>`;
  return '';
}

/* ---------- actions ---------- */
const ACT={
  noop(){}, closeSheet(){sheet(null)}, sheet(a){sheet(a)}, toast(a){toast(a)},
  onbNext(){S.onb=Math.min(2,S.onb+1);paint()},
  finishReg(){toast(t('reg.ok'));go('home')},
  toggleRenew(){S.autoRenew=!S.autoRenew;paint();toast(S.autoRenew?t('autorenew.on.t'):t('autorenew.off.t'))},
  togglePause(){S.paused=!S.paused;paint();toast(S.paused?t('paused.t'):t('resumed.t'),S.paused?'pause':'play')},
  toggleNotif(a){S.notif[a]=!S.notif[a];paint()},
  setStatus(a){S.status=a;paint()},
  book(){go('book')},
  subscribe(a){S.co={pkg:a,car:S.cars[0]?S.cars[0].id:null,branch:'b1',coupon:null,step:1,method:'card'};go('checkout')},
  coCar(a){S.co.car=a;paint()}, coBranch(a){S.co.branch=a;paint()}, coMethod(a){S.co.method=a;paint()},
  coNext(){if(S.co.step===1&&!S.co.car)return toast(t('co.pickcar'),'warn');S.co.step++;paint()},
  coBack(){S.co.step--;paint()},
  applyCoupon(){const v=(document.getElementById('couponIn').value||'').trim().toUpperCase();if(DATA.coupons[v]){S.co.coupon=v;paint();toast(t('co.coupon.applied'))}else toast(t('co.coupon.bad'),'warn')},
  rmCoupon(){S.co.coupon=null;paint()},
  toPay(){S.pay='form';go('pay')},
  doPay(){S.pay='processing';paint();setTimeout(()=>{S.pay='form';go('success')},1900)},
  failPay(){S.status='failed';sheet(null);toast(t('pay.failed'),'warn');go('subscription')},
  finishPurchase(){S.status='active';S.paused=false;S.sub={...S.sub,pkg:S.co.pkg,total:pk(S.co.pkg).washes,used:0,car:S.co.car,branch:S.co.branch,start:DATA.today,renew:'2026-11-26'};go('home')},
  renewExpired(){S.co={pkg:S.sub.pkg,car:S.sub.car,branch:S.sub.branch,coupon:null,step:3,method:'card'};go('checkout')},
  payPending(){sheet(null);S.co={pkg:S.sub.pkg,car:S.sub.car,branch:S.sub.branch,coupon:null,step:3,method:'card'};S.pay='form';go('pay')},
  retry(){ACT.payPending()},
  doCancel(){sheet(null);S.status='expired';S.autoRenew=false;toast(t('cancel.done'),'x');go('subscription')},
  histTab(a){S.histTab=a;paint()},
  dlInv(){sheet(null);toast(t('inv.dl'),'download')},
  mobDone(){sheet(null);toast(t('mob.ok'));go('profile')},
  defCard(a){S.cards.forEach(k=>k.def=k.id===a);paint();toast(t('card.def.ok'))},
  saveCard(){S.cards.push({id:'k'+Date.now(),brand:'Visa',last:'4242',exp:'01/30',def:false});sheet(null);toast(t('card.saved'))},
  addCarMake(a){S.sheet.d={make:a};paint()},
  saveCar(){const g=i=>document.getElementById(i).value;const m=DATA.makes.find(x=>x.id===g('f_make'));S.cars.push({id:'c'+Date.now(),make:L(m.name),model:g('f_model'),year:+g('f_year'),plate:g('f_plate')||'777 888',color:g('f_color'),pkg:null});sheet(null);toast(t('cars.added'))},
  rmCar(a){S.cars=S.cars.filter(c=>c.id!==a);sheet(null);toast(t('cars.removed'),'trash')},
  assignPkg(a){const [cid,pid]=a.split('|');carById(cid,S.cars).pkg=pid||null;sheet(null);toast(pid?t('cars.assigned'):t('cars.unassigned'))}
};

/* ---------- render ---------- */
let lastRoute='';
function paint(){
  const r=route(),sc=SCREENS[r.name]||SCREENS.home;
  const keep=$app.querySelector('.view');const top=lastRoute===r.name&&keep?keep.scrollTop:0;
  const inner=sc.html(r.arg);
  const hasWrap=/class="view|class="splash/.test(inner.slice(0,60));
  const viewCls=['view',sc.flush?'flush':'',sc.nav?'pad-nav':''].join(' ');
  const body=sc.cls==='splash'?`<div class="screen splash" style="display:flex;flex-direction:column">${inner}</div>`:
   `<div class="screen"><div class="${hasWrap?'':viewCls}" ${hasWrap?'':''}>${inner}</div>${sc.nav?tabbar(sc.nav):''}</div>`;
  const first=lastRoute!==r.name;
  $app.querySelector('.phone').dataset.sb=sc.sb||'dark';
  $app.querySelector('.phone-content').innerHTML=body+(S.sheet?`<div class="overlay" data-act="closeSheetBg"><div class="sheet">${sheetHtml()}</div></div>`:'')+(S.toast?`<div class="toast">${ic(S.toast.i,20)}<span>${S.toast.m}</span></div>`:'');
  const v=$app.querySelector('.view');if(v&&!first){v.scrollTop=top;v.classList.add('noanim')}
  if(first){lastRoute=r.name;if(sc.after)sc.after($app.querySelector('.view')||$app);window.scrollTo(0,0)}
  else if(sc.after&&r.name==='otp'){}
  document.title=t('brand')+' · '+(t('route.'+r.name)||'');
  if(first)counters();
}
function tabbar(on){const items=[['home','home',t('nav.home')],['packages','tag',t('nav.packages')],['cars','car',t('nav.cars')],['history','receipt',t('nav.history')],['profile','user',t('nav.profile')]];
  return `<nav class="tabbar">${items.map(i=>`<button class="tab ${on===i[0]?'on':''}" data-go="${i[0]}">${ic(i[1])}<span>${i[2]}</span></button>`).join('')}</nav>`}

document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act],[data-go]');if(!el)return;
  if(el.dataset.act){
    if(el.dataset.act==='closeSheetBg'){if(e.target===el)sheet(null);return}
    const f=ACT[el.dataset.act];if(f)f(el.dataset.arg);return}
  S.sheet=null;go(el.dataset.go);
});
document.addEventListener('change',e=>{const a=e.target.dataset.actChange;if(a&&ACT[a])ACT[a](e.target.value)});
window.addEventListener('hashchange',()=>{S.sheet=null;paint()});
function boot(){
  const native=matchMedia('(max-width:500px)').matches&&('ontouchstart' in window);if(native)document.body.classList.add('native');
  $app.innerHTML=`<div class="stage"><div class="phone" data-sb="dark"><div class="statusbar"><span>9:41</span><span style="display:flex;gap:6px;align-items:center"><svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect y="8" width="3" height="4" rx="1"/><rect x="5" y="5" width="3" height="7" rx="1"/><rect x="10" y="2.500" width="3" height="9.500" rx="1"/><rect x="15" width="3" height="12" rx="1"/></svg><svg width="26" height="12" viewBox="0 0 26 12"><rect x=".5" y=".5" width="22" height="11" rx="3.500" fill="none" stroke="currentColor" opacity=".5"/><rect x="2" y="2" width="16" height="8" rx="2" fill="currentColor"/><rect x="24" y="4" width="2" height="4" rx="1" fill="currentColor" opacity=".5"/></svg></span></div><div class="phone-content" style="position:absolute;inset:0"></div></div></div>`;
  if(!location.hash)location.hash='#/splash';
  paint();
}
document.addEventListener('DOMContentLoaded',boot);
