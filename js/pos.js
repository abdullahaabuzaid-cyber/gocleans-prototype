/* POS / cashier — all data fake */
const P={cat:'all',cart:{},mobile:'',cust:null,reg:{name:'',plate:'',make:'لاند كروزر'},disc:{type:'pct',val:0},coupon:'',usePts:false,useSub:false,pay:'cash',done:null};
const KNOWN='50000001';
const digits=s=>s.replace(/\D/g,'');
const SV=DATA.services;
const subtotal=()=>Object.entries(P.cart).reduce((a,[id,q])=>a+SV.find(s=>s.id===id).price*q,0);
function calc(){let sub=subtotal(),lines=[];let sv=0;
  if(P.useSub&&P.cust?.sub&&P.cart.wash){sv=SV[0].price;lines.push(['غسلة من الاشتراك',-sv])}
  let after=sub-sv;let d=0;if(P.disc.val>0){d=P.disc.type==='pct'?Math.round(after*P.disc.val/100):Math.min(P.disc.val,after);lines.push([P.disc.type==='pct'?`خصم ${P.disc.val}%`:'خصم',-d])}
  if(P.coupon==='GOCLEAN10'){const c=Math.round((after-d)*.1);d+=c;lines.push(['كوبون GOCLEAN10',-c])}
  let pts=0;if(P.usePts&&P.cust?.points){pts=Math.min(Math.floor(P.cust.points/10),after-d);lines.push([`نقاط الولاء (${pts*10} نقطة)`,-pts])}
  const total=Math.max(0,after-d-pts);return {sub,lines,total,earn:Math.floor(total/10)}}
function lookup(m){P.mobile=m;const d=digits(m);P.cust=null;if(d.length>=8){P.cust=d===KNOWN?{name:'عميل تجريبي',points:420,plate:'111 222',car:'لاند كروزر',sub:{left:5,pkg:'الشهري'},known:true}:{new:true}}}
function R(){const root=document.getElementById('root'),c=calc(),items=Object.entries(P.cart);
 const list=SV.filter(s=>P.cat==='all'||(P.cat==='base'?s.base:s.extra));
 root.innerHTML=`<div class="pos-shell">
 <header class="pos-top"><div class="tile"><img src="assets/logo.png" alt=""></div><div><b style="font-size:20px">جو كلينز · نقطة البيع</b><div style="font-size:12px;opacity:.7">وردية صباحية · #SH-0412</div></div>
  <div style="margin-inline-start:auto" class="row gap-2"><span class="tg">${ic('pin',18)} فرع الدوحة الجديدة</span><span class="tg">${ic('user',18)} كاشير 1</span><span class="tg" id="clk"></span><a class="tg" href="admin.html">${ic('back',18)} الإدارة</a></div></header>
 <section class="pos-l"><div class="cats">${[['all','كل الخدمات','grid'],['base','غسيل أساسي','drop'],['extra','خدمات إضافية','sparkle']].map(x=>`<button class="cat ${P.cat===x[0]?'on':''}" data-cat="${x[0]}">${ic(x[2],20)} ${x[1]}</button>`).join('')}</div>
 <div class="svc-grid">${list.map(s=>{const q=P.cart[s.id]||0;return `<button class="svc ${s.base?'base':''} ${q?'in':''}" data-add="${s.id}">${q?`<span class="qty">×${q}</span>`:''}<div class="si">${ic(s.icon,26)}</div><b>${L(s.name)}</b><span class="xs muted">${s.base?'الخدمة الأساسية':'خدمة إضافية'}${s.id==='inside'?' · داخل السيارة':''}</span><span class="pr">${qar(s.price)}</span></button>`}).join('')}</div></section>
 <section class="pos-r">
  <div class="ppanel cust"><div class="row between"><b>العميل</b>${P.cust?`<button class="link xs" data-reset>تغيير</button>`:''}</div>
  <div class="row gap-2"><div class="input-wrap grow" style="position:relative"><input class="input" id="mob" inputmode="numeric" placeholder="رقم الجوال (8 أرقام)" value="${P.mobile}" style="height:48px;direction:ltr;text-align:start"></div></div>
  ${!P.cust?`<div class="row gap-2 xs muted">جرّب: <button class="chip info" data-demo="known">5000 0001 · عميل مشترك</button><button class="chip gray" data-demo="new">5000 0777 · عميل جديد</button></div>`:''}
  ${P.cust?.known?`<div class="known"><div class="avatar" style="width:48px;height:48px;border-radius:16px">ع</div><div class="grow"><b>${P.cust.name}</b><div class="xs muted">${plateHtml(P.cust.plate)} ${P.cust.car}</div></div><div style="text-align:end"><span class="chip ok">اشتراك ${P.cust.sub.pkg}</span><div class="xs muted mt-2">متبقي <b>${P.cust.sub.left}</b> غسلات · <b>${P.cust.points}</b> نقطة</div></div></div>`:''}
  ${P.cust?.new?`<div class="chip warn" style="align-self:flex-start">عميل جديد — تسجيل سريع</div><div class="row gap-2"><input class="input" data-reg="name" placeholder="الاسم" value="${P.reg.name}" style="height:44px"><input class="input" data-reg="plate" placeholder="رقم اللوحة" value="${P.reg.plate}" style="height:44px;max-width:130px"></div>`:''}</div>
  <div class="ppanel cart"><div class="row between"><b>الطلب</b><span class="muted xs">${items.length?items.reduce((a,x)=>a+x[1],0)+' عناصر':''}</span></div>
   ${items.length?items.map(([id,q])=>{const s=SV.find(x=>x.id===id);return `<div class="line"><div class="grow"><b class="sm">${L(s.name)}</b><div class="xs muted">${qar(s.price)}</div></div><div class="stepper"><button data-dec="${id}">−</button><b style="min-width:22px;text-align:center">${q}</b><button data-add="${id}">+</button></div><b style="min-width:62px;text-align:end">${qar(s.price*q)}</b></div>`}).join(''):`<div class="center muted" style="margin:auto;padding:20px">${ic('car',44)}<div class="sm mt-2">اختر الخدمات من القائمة</div></div>`}</div>
  <div class="ppanel"><div class="disc"><select class="sel-f" id="dt" style="height:44px"><option value="pct" ${P.disc.type==='pct'?'selected':''}>خصم %</option><option value="amt" ${P.disc.type==='amt'?'selected':''}>خصم ر.ق</option></select><input class="input" id="dv" inputmode="numeric" placeholder="0" value="${P.disc.val||''}"><input class="input" id="cp" placeholder="كوبون" value="${P.coupon}" style="text-transform:uppercase"></div>
   <div class="row gap-2 mt-3" style="flex-wrap:wrap">${P.cust?.known?`<label class="row gap-2 sm b" style="cursor:pointer"><span class="switch ${P.useSub?'on':''}" data-t="sub"></span>استخدام غسلة اشتراك</label><label class="row gap-2 sm b" style="cursor:pointer"><span class="switch ${P.usePts?'on':''}" data-t="pts"></span>استبدال النقاط</label>`:`<span class="xs muted">كوبون تجريبي: GOCLEAN10</span>`}</div>
   <div class="tot mt-3"><div class="r"><span>المجموع</span><span>${qar(c.sub)}</span></div>${c.lines.map(l=>`<div class="r" style="color:var(--ok)"><span>${l[0]}</span><span>−${qar(-l[1])}</span></div>`).join('')}<div class="r big"><span>الإجمالي</span><span>${qar(c.total)}</span></div>${c.total?`<div class="xs muted">ستحصل على <b>${c.earn}</b> نقطة ولاء</div>`:''}</div>
   <div class="pm mt-3">${[['cash','نقداً','cash'],['card','بطاقة','card'],['knet','KNET','wallet']].map(x=>`<button class="${P.pay===x[0]?'on':''}" data-pay="${x[0]}">${ic(x[2],19)}${x[1]}</button>`).join('')}</div>
   <button class="btn btn-primary pay-btn mt-3" data-checkout ${items.length&&P.cust?'':'disabled'}>${ic('check',22)} تأكيد الدفع · ${qar(c.total)}</button></div></section></div>
 ${P.done?`<div class="modal-bg" data-close><div class="rcpt" onclick="event.stopPropagation()"><div class="center"><div class="successmark" style="width:76px;height:76px;margin:0 auto 10px">${ic('check',38)}</div><h2>تمت العملية</h2><div class="muted sm">إيصال #POS-DEMO-${P.done.n}</div></div><div class="divider"></div>${P.done.items.map(i=>`<div class="r"><span>${i[0]}</span><b>${qar(i[1])}</b></div>`).join('')}${P.done.lines.map(l=>`<div class="r" style="color:var(--ok)"><span>${l[0]}</span><b>−${qar(-l[1])}</b></div>`).join('')}<div class="r" style="font-size:22px;font-weight:800;border-top:2px solid var(--navy-900);margin-top:8px;padding-top:10px"><span>الإجمالي</span><span>${qar(P.done.total)}</span></div><div class="r muted"><span>الدفع</span><span>${{cash:'نقداً',card:'بطاقة',knet:'KNET'}[P.done.pay]}</span></div><div class="r muted"><span>نقاط مكتسبة</span><span>+${P.done.earn}</span></div><div class="row gap-2 mt-4"><button class="btn btn-ghost" data-close>${ic('doc',18)} طباعة</button><button class="btn btn-primary" data-close data-new>طلب جديد</button></div></div></div>`:''}`;
 const f=document.getElementById('mob');if(f&&P.focus){f.focus();f.setSelectionRange(99,99)}
 const k=document.getElementById('clk');if(k)k.textContent=new Date().toLocaleTimeString('ar-QA',{hour:'2-digit',minute:'2-digit',numberingSystem:'latn'});
}
let seq=2048;
document.addEventListener('click',e=>{const g=a=>e.target.closest(`[${a}]`);let x;
 if(x=g('data-cat'))P.cat=x.dataset.cat;else if(x=g('data-add')){P.cart[x.dataset.add]=(P.cart[x.dataset.add]||0)+1}
 else if(x=g('data-dec')){const id=x.dataset.dec;if(--P.cart[id]<=0)delete P.cart[id]}
 else if(x=g('data-t')){x=x.dataset.t==='sub'?(P.useSub=!P.useSub):(P.usePts=!P.usePts)}
 else if(x=g('data-pay'))P.pay=x.dataset.pay;
 else if(x=g('data-demo')){lookup(x.dataset.demo==='known'?'5000 0001':'5000 0777');P.focus=0}
 else if(g('data-reset')){P.cust=null;P.mobile='';P.useSub=P.usePts=false}
 else if(g('data-checkout')){const c=calc();P.done={n:seq++,items:Object.entries(P.cart).map(([id,q])=>[L(SV.find(s=>s.id===id).name)+(q>1?' ×'+q:''),SV.find(s=>s.id===id).price*q]),lines:c.lines,total:c.total,pay:P.pay,earn:c.earn}}
 else if(g('data-close')){const nw=g('data-new');if(e.target.closest('.rcpt')&&!e.target.closest('[data-close]'))return;P.done=null;if(nw){P.cart={};P.cust=null;P.mobile='';P.disc={type:'pct',val:0};P.coupon='';P.useSub=P.usePts=false;P.reg={name:'',plate:'',make:'لاند كروزر'}}}
 else return;R()});
document.addEventListener('input',e=>{const t=e.target;
 if(t.id==='mob'){const had=!!P.cust;lookup(t.value);P.focus=1;if(had!==!!P.cust||P.cust){R()}}
 else if(t.id==='dv'){P.disc.val=+digits(t.value)||0;R();const n=document.getElementById('dv');n.focus();n.setSelectionRange(99,99)}
 else if(t.id==='cp'){P.coupon=t.value.toUpperCase();R();const n=document.getElementById('cp');n.focus();n.setSelectionRange(99,99)}
 else if(t.dataset.reg){P.reg[t.dataset.reg]=t.value}});
document.addEventListener('change',e=>{if(e.target.id==='dt'){P.disc.type=e.target.value;R()}});
R();
