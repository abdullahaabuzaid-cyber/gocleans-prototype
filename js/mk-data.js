/* Go Cleans Marketplace — shared example data + localStorage store (market / vendor / platform) */
const MK_KEY='gcm_store_v1';
const AREAS=['الدفنة','الخليج الغربي','اللؤلؤة','لوسيل','الوكرة','الريان','السد','مشيرب','المطار القديم','الغرافة','الدحيل','الخور','عين خالد','المنتزه'];
const CATS=[
 {id:'ext',name:'غسيل خارجي',img:'img/wash-pressure.jpg'},
 {id:'int',name:'غسيل داخلي',img:'img/wash-interior.jpg'},
 {id:'pol',name:'تلميع',img:'img/wash-polish.jpg'},
 {id:'nano',name:'نانو سيراميك',img:'img/prod-ceramic.jpg'},
 {id:'mob',name:'غسيل متنقل',img:'img/fleet-vans.jpg'},
 {id:'full',name:'غسيل شامل',img:'img/wash-foam.jpg'},
 {id:'rim',name:'جنوط وإطارات',img:'img/wash-wheel.jpg'},
 {id:'ster',name:'تعقيم وتعطير',img:'img/prod-perfume.jpg'}];
const SIZES={s:'سيدان',m:'SUV متوسط',l:'SUV كبير'};
const CAT_IMG={ext:['wash-pressure','wash-pressure2','wash-suv'],int:['wash-interior','wash-vacuum'],pol:['wash-polish','wash-polish2','prod-polish'],nano:['prod-ceramic','wash-microfiber'],mob:['fleet-vans','wash-worker'],full:['wash-foam','wash-foam2','wash-tunnel'],rim:['wash-wheel','prod-tire'],ster:['prod-perfume','prod-perfume2','prod-dash']};
function _svc(vid,i,cat,name,desc,dur,p){const im=CAT_IMG[cat];return {id:vid+'-s'+i,cat,name,desc,dur,prices:{s:p,m:Math.round(p*1.25),l:Math.round(p*1.5)},img:'img/'+im[i%im.length]+'.jpg',on:true};}
function _seedVendors(){
 const V=[
  ['gocleans','جو كلينز','الخليج الغربي','wash-rangerover','#FF8000',4.9,1840,'06:00','24:00',['موثّق','اشتراكات'],62,28,1.2],
  ['pearl','لمعة اللؤلؤة','اللؤلؤة','wash-foam','#66B8D9',4.8,962,'07:00','23:00',['الأعلى تقييماً'],78,22,3.4],
  ['foam','فوم برو الوكرة','الوكرة','wash-foam2','#0B1D45',4.6,511,'06:30','22:00',['عرض اليوم'],70,75,14.8],
  ['lusail','واحة لوسيل للعناية','لوسيل','wash-tunnel','#2A9D8F',4.7,733,'08:00','24:00',['جديد'],60,12,8.1],
  ['rayyan','ديتيلنغ الريان','الريان','wash-polish','#7B2CBF',4.5,402,'08:00','22:00',[],22,40,9.6],
  ['sadd','سبيد واش السد','السد','wash-pressure','#E63946',4.3,1210,'00:00','24:00',['24 ساعة'],44,42,4.2],
  ['msheireb','نخبة مشيرب','مشيرب','wash-microfiber','#C9A227',4.9,288,'09:00','21:00',['فاخر'],52,48,2.9],
  ['dafna','كريستال الدفنة','الدفنة','wash-suv','#118AB2',4.4,640,'07:00','23:30',[],56,30,0.8],
  ['gharafa','الغرافة كار سبا','الغرافة','wash-pressure2','#06D6A0',4.2,215,'08:00','20:00',['خصم 20%'],38,30,11.3],
  ['mobile','موج المتنقل','الدحيل','wash-worker','#F4A261',4.7,890,'07:00','23:00',['يجيك لين البيت'],40,20,6.5],
  ['khor','سحاب الخور','الخور','wash-vacuum','#264653',4.1,96,'08:00','21:00',[],60,4,42.0],
  ['ainkhaled','نجمة عين خالد','عين خالد','wash-interior','#EF476F',4.5,330,'07:30','22:30',['عرض اليوم'],34,60,10.2]];
 return V.map((v,k)=>{const [id,name,area,cover,color,rating,rc,open,close,badges,x,y,dist]=v;
  const base=[25,30,22,35,40,20,55,28,18,45,24,26][k];
  const svcs=[
   _svc(id,0,'ext','غسيل خارجي سريع','غسيل بالرغوة والضغط العالي مع تجفيف بالمايكروفايبر',20,base),
   _svc(id,1,'int','تنظيف داخلي','شفط كامل، تنظيف الطبلون والأبواب والزجاج من الداخل',35,base+15),
   _svc(id,2,'full','غسيل شامل داخلي وخارجي','الباقة الأكثر طلباً: خارجي + داخلي + تلميع إطارات',50,base+30),
   _svc(id,3,'pol','تلميع وحماية واكس','تلميع يدوي بالواكس يعطي لمعة تدوم أسابيع',90,base*4),
   _svc(id,4,'nano','نانو سيراميك','طبقة حماية سيراميك 9H تدوم حتى سنتين',240,base*30),
   _svc(id,5,'rim','تنظيف الجنوط والإطارات','إزالة الغبار والفرامل وتلميع الإطارات',25,base),
   _svc(id,6,'ster','تعقيم بالبخار وتعطير','تعقيم المقاعد والمكيف بالبخار مع عطر فاخر',30,base+20)];
  if(id==='mobile'){svcs.unshift(_svc(id,7,'mob','غسيل متنقل عند البيت','نجيك لين بيتك أو مكتبك بفان مجهّز بالماء والكهرباء',45,base+20));}
  if(id==='gocleans'){svcs.unshift(_svc(id,8,'mob','غسيل متنقل جو كلينز','فريق جو كلينز يوصلك وين ما كنت في الدوحة',40,base+15));}
  const cats=[...new Set(svcs.map(s=>s.cat))];
  const revs=[['محمد الكعبي','a-man1',5,'خدمة ممتازة والتزام بالموعد، السيارة طلعت جديدة'],['نورة المهندي','a-woman',5,'تعامل راقي وسرعة، أنصح فيهم'],['خالد السليطي','a-man3',4,'شغل نظيف بس الانتظار كان شوي'],['عبدالله المري','a-man5',5,'أفضل تلميع جربته في قطر'],['سارة النعيمي','a-woman2',4,'الأسعار مناسبة والمكان مرتب']].map((r,i)=>({id:id+'-r'+i,n:r[0],av:'img/'+r[1]+'.jpg',r:r[2],t:r[3],d:['قبل يومين','قبل 4 أيام','قبل أسبوع','قبل أسبوعين','قبل شهر'][i],reply:i===0?'شكراً لك، نتشرف بخدمتك دائماً':''}));
  return {id,name,area,cover:'img/'+cover+'.jpg',color,rating,reviewsCount:rc,open,close,badges,x,y,dist,cats,
   mobile:id==='mobile'||id==='gocleans',status:id==='ainkhaled'?'pending':'approved',cr:'CR-'+(140000+k*737),phone:'+974 4'+(4400000+k*1173),iban:'QA00 QNBA 0000 0000 0000 '+(1000+k),
   owner:['أحمد','فهد','سالم','علي','حمد','يوسف','ناصر','جاسم','راشد','مبارك','سعود','ماجد'][k]+' ' +['الكواري','المري','الهاجري','العطية','الدوسري','المناعي','الخليفي','البوعينين','المهندي','النعيمي','السليطي','الكعبي'][k],
   services:svcs,
   addons:[{id:id+'-a1',name:'تعطير فاخر',price:10},{id:id+'-a2',name:'تلميع الإطارات',price:8},{id:id+'-a3',name:'تنظيف المحرك',price:30},{id:id+'-a4',name:'شمع سريع',price:20},{id:id+'-a5',name:'إزالة الحشرات والقطران',price:15}],
   branches:[{id:id+'-b1',name:'الفرع الرئيسي – '+area,area,bays:4},{id:id+'-b2',name:'فرع '+AREAS[(k+5)%AREAS.length],area:AREAS[(k+5)%AREAS.length],bays:2}].slice(0,k%3===2?1:2),
   staff:[{n:'رامي',role:'مشرف',av:'img/p-man2.jpg',on:true},{n:'جون',role:'فني غسيل',av:'img/p-man4.jpg',on:true},{n:'أرجون',role:'فني تلميع',av:'img/p-man6.jpg',on:true},{n:'كريم',role:'كاشير',av:'img/p-man7.jpg',on:false}],
   coupons:[{code:id.toUpperCase().slice(0,5)+'20',pct:20,on:true,uses:37}],
   reviews:revs,joined:'2025-0'+(1+k%9)+'-1'+k%9};
 });
}
function _seedBookings(vs){
 const names=[['حمد العبدالله','a-man2'],['مريم الأنصاري','a-woman3'],['فيصل الشمري','a-man4'],['جاسم الهاجري','a-man6'],['لولوة الكواري','a-woman'],['تميم البنعلي','a-man7'],['راشد المري','a-man8'],['عائشة السادة','a-woman2']];
 const cars=['لاند كروزر أبيض','لكزس LX أسود','رنج روفر رمادي','نيسان باترول','مرسيدس G','تويوتا كامري','لكزس ES','جي إم سي يوكن'];
 const st=['pending','confirmed','arrived','washing','ready','completed','completed','completed','confirmed','pending','completed','cancelled'];
 const out=[];let n=0;const today=new Date().toISOString().slice(0,10);
 vs.forEach((v,vi)=>{const cnt=vi<2?12:6;for(let i=0;i<cnt;i++){const s=v.services[(i+vi)%v.services.length];const size=['s','m','l'][(i+vi)%3];const c=names[(i+vi)%names.length];
  const past=st[i%st.length]==='completed'&&i>6;const d=new Date(Date.now()-(past?(i-5)*86400000:0));
  out.push({id:'B'+(10200+n),code:'GC-'+(48210+n++),vendorId:v.id,branchId:v.branches[0].id,serviceId:s.id,serviceName:s.name,size,addons:i%3===0?[v.addons[0].name]:[],
   date:d.toISOString().slice(0,10),slot:String(8+(i*1.5|0)%13).padStart(2,'0')+':'+(i%2?'30':'00'),car:cars[(i+vi)%cars.length],plate:String(100000+((i*7919+vi*31)%899999)),
   customer:c[0],cav:'img/'+c[1]+'.jpg',phone:'+974 55'+String(100000+i*4431+vi*97).slice(0,6),pay:['branch','card','apple'][i%3],
   total:s.prices[size]+(i%3===0?v.addons[0].price:0),discount:0,status:st[i%st.length],created:Date.now()-i*3600000,rating:st[i%st.length]==='completed'?(4+i%2):0,tip:0,notes:'',mine:false,
   timeline:[{s:'pending',t:'09:0'+i%10}]});}});
 return out;
}
function mkSeed(){const vendors=_seedVendors();return {v:1,vendors,bookings:_seedBookings(vendors),commission:12,
 banners:[{id:'bn1',title:'خصم 30% على النانو سيراميك',sub:'لدى لمعة اللؤلؤة حتى نهاية الشهر',img:'img/wash-polish2.jpg',vendor:'pearl',on:true},
  {id:'bn2',title:'أول غسلة علينا!',sub:'استخدم كود WELCOME للعملاء الجدد',img:'img/wash-foam.jpg',vendor:'',on:true},
  {id:'bn3',title:'اشتراكات جو كلينز',sub:'غسيل غير محدود من 199 ر.ق شهرياً',img:'img/wash-rangerover.jpg',vendor:'gocleans',on:true},
  {id:'bn4',title:'الغسيل المتنقل وصل الوكرة',sub:'موج المتنقل يجيك لين البيت',img:'img/fleet-vans.jpg',vendor:'mobile',on:true}],
 categories:CATS.map(c=>({...c,on:true})),
 platformCoupons:[{code:'WELCOME',pct:100,max:40,on:true},{code:'DOHA15',pct:15,max:30,on:true}],
 user:{name:'عبدالله',phone:'',logged:false,points:1250,wallet:85,favs:['pearl','msheireb'],
  cars:[{id:'c1',name:'تويوتا لاند كروزر',color:'أبيض',plate:'123456',size:'l',img:'img/car-lc-white.jpg'},{id:'c2',name:'لكزس LX',color:'أسود',plate:'778899',size:'l',img:'img/car-lexus-black.jpg'},{id:'c3',name:'مرسيدس EQS',color:'فضي',plate:'45120',size:'s',img:'img/car-eqs.jpg'}]},
 notifs:[{t:'مرحباً بك في سوق جو كلينز 🎉',b:'اكتشف أكثر من 12 مغسلة في قطر واحجز خلال ثوانٍ',d:'الآن',img:'img/doha-westbay.jpg'},{t:'عرض نهاية الأسبوع',b:'خصم 20% لدى الغرافة كار سبا',d:'قبل ساعة',img:'img/wash-pressure2.jpg'}],
 disputes:[{id:'D-301',booking:'GC-48213',vendor:'sadd',customer:'فيصل الشمري',reason:'تأخر في الموعد 40 دقيقة',status:'open',amount:35},{id:'D-302',booking:'GC-48219',vendor:'foam',customer:'مريم الأنصاري',reason:'خدش بسيط بعد التلميع',status:'review',amount:110},{id:'D-298',booking:'GC-48190',vendor:'pearl',customer:'حمد العبدالله',reason:'طلب استرجاع لإلغاء متأخر',status:'closed',amount:25}],
 customers:null};}
const MK={
 get(){try{const s=JSON.parse(localStorage.getItem(MK_KEY));if(s&&s.v===1)return s;}catch(e){}const s=mkSeed();localStorage.setItem(MK_KEY,JSON.stringify(s));return s;},
 save(s){localStorage.setItem(MK_KEY,JSON.stringify(s));},
 update(fn){const s=MK.get();fn(s);MK.save(s);return s;},
 reset(){localStorage.removeItem(MK_KEY);return MK.get();},
 vendor(id,s){return (s||MK.get()).vendors.find(v=>v.id===id);},
 priceFrom(v){const p=v.services.filter(x=>x.on).map(x=>x.prices.s);return p.length?Math.min(...p):0;},
 isOpen(v){if(v.open==='00:00'&&v.close==='24:00')return true;const d=new Date(),m=d.getHours()*60+d.getMinutes();const t=x=>{const[a,b]=x.split(':');return +a*60+ +b};return m>=t(v.open)&&m<t(v.close);},
 statusName:{pending:'بانتظار القبول',confirmed:'مؤكد',arrived:'وصلت السيارة',washing:'جاري الغسيل',ready:'جاهزة للاستلام',completed:'مكتمل',cancelled:'ملغي',rejected:'مرفوض'},
 flow:['pending','confirmed','arrived','washing','ready','completed'],
 payName:{branch:'الدفع في الفرع',card:'بطاقة بنكية',apple:'Apple Pay',wallet:'المحفظة'},
 money(n){return (Math.round(n*100)/100).toLocaleString('en-US')+' ر.ق';},
 esc(t){return String(t==null?'':t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));},
 qr(seed,size=180){let h=0;for(const c of seed)h=(h*31+c.charCodeAt(0))>>>0;const n=25,c=size/n;let r='';const rnd=()=>{h^=h<<13;h^=h>>>17;h^=h<<5;return (h>>>0)%100;};
  const fin=(x,y)=>[[0,0],[n-7,0],[0,n-7]].some(([a,b])=>x>=a&&x<a+7&&y>=b&&y<b+7);
  for(let y=0;y<n;y++)for(let x=0;x<n;x++){if(fin(x,y))continue;if(rnd()<48)r+=`<rect x="${x*c}" y="${y*c}" width="${c}" height="${c}"/>`;}
  const f=(a,b)=>`<rect x="${a*c}" y="${b*c}" width="${7*c}" height="${7*c}" fill="none" stroke="#0B1D45" stroke-width="${c}" transform="translate(${c/2},${c/2}) scale(.857)" /><rect x="${(a+2)*c}" y="${(b+2)*c}" width="${3*c}" height="${3*c}"/>`;
  return `<svg viewBox="0 0 ${size} ${size}" width="${size}" height="${size}" fill="#0B1D45">${r}${f(0,0)}${f(n-7,0)}${f(0,n-7)}</svg>`;},
 slots(v,date,s){const st=MK.get();const t=x=>+x.split(':')[0];let a=Math.max(t(v.open),7),b=Math.min(t(v.close)||24,23);const out=[];
  const now=new Date();const isToday=date===now.toISOString().slice(0,10);
  for(let h=a;h<b;h++)for(const m of['00','30']){const sl=String(h).padStart(2,'0')+':'+m;const taken=(s||st).bookings.filter(x=>x.vendorId===v.id&&x.date===date&&x.slot===sl&&!['cancelled','rejected'].includes(x.status)).length;
   const cap=v.branches.reduce((a,b)=>a+(+b.bays||1),0);const past=isToday&&(h<now.getHours()||(h===now.getHours()&&m==='00'&&now.getMinutes()>0));
   out.push({sl,left:Math.max(0,cap-taken-((h*7+v.id.length)%3===0?cap-1:0)),past});}return out;}
};
