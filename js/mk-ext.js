/* Go Cleans Marketplace v2 — shared data extensions (Plus, loyalty, ads, off-peak, products, fleet, claims, photos) */
const PRODUCTS=[
 {id:'p1',name:'معطّر سيارة فاخر',desc:'عطر عود يدوم 30 يوماً',price:25,img:'img/prod-perfume.jpg',on:true},
 {id:'p2',name:'شمع حماية سريع',desc:'بخاخ واكس 500 مل',price:45,img:'img/prod-polish.jpg',on:true},
 {id:'p3',name:'ملمّع الإطارات',desc:'لمعان أسود يدوم أسبوعين',price:30,img:'img/prod-tire.jpg',on:true},
 {id:'p4',name:'طقم نانو سيراميك منزلي',desc:'حماية 6 أشهر',price:120,img:'img/prod-ceramic.jpg',on:true},
 {id:'p5',name:'منظّف التابلو',desc:'مضاد للأشعة فوق البنفسجية',price:28,img:'img/prod-dash.jpg',on:true},
 {id:'p6',name:'إسفنجة ومايكروفايبر',desc:'طقم 3 قطع',price:18,img:'img/prod-sponge.jpg',on:true},
 {id:'p7',name:'معطّر بخاخ ورد',desc:'100 مل',price:22,img:'img/prod-perfume2.jpg',on:true}];
const PHOTO_BEFORE=['img/car-lc-desert.jpg','img/car-suv-desert.jpg','img/wash-foam2.jpg','img/wash-pressure.jpg'];
const PHOTO_AFTER=['img/car-lc-white.jpg','img/car-suv-studio.jpg','img/car-rangerover.jpg','img/wash-polish2.jpg'];
const WAIT={gocleans:0,pearl:0,foam:10,lusail:0,rayyan:25,sadd:5,msheireb:0,dafna:15,gharafa:0,mobile:0,khor:20,ainkhaled:30};
function mkExt(s){if(s.x2)return s;s.x2=1;
 s.products=PRODUCTS.map(p=>({...p}));
 s.loyalty={earn:1,rate:20,maxPct:50,min:200,bonusPlus:2,welcome:100};
 s.plus={price:149,pct:15,freeMobile:true,members:3240};
 s.user.plus=null;s.user.pointsLog=[{t:'نقاط ترحيبية',p:100,d:'2026-10-01'},{t:'حجز لدى لمعة اللؤلؤة',p:120,d:'2026-10-14'}];
 s.claims=[{id:'G-118',booking:'GC-48177',vendor:'sadd',customer:'سارة المري',reason:'بقع ماء على الزجاج بعد الغسيل',want:'rewash',amount:45,status:'open',d:'2026-10-27'}];
 s.ads=[{id:'ad1',vendor:'foam',type:'search',title:'الأول في نتائج البحث',budget:600,days:14,spent:244,imp:18420,clicks:1290,books:86,on:true,start:'2026-10-20'},
  {id:'ad2',vendor:'lusail',type:'banner',title:'بنر الصفحة الرئيسية',budget:900,days:10,spent:510,imp:41200,clicks:2240,books:131,on:true,start:'2026-10-22'},
  {id:'ad3',vendor:'pearl',type:'search',title:'الأول في نتائج البحث',budget:300,days:7,spent:300,imp:9100,clicks:610,books:40,on:false,start:'2026-10-05'}];
 s.vendors.forEach(v=>{v.wait=WAIT[v.id]??10;v.offpeak=v.id==='pearl'?{on:true,from:13,to:16,pct:20}:v.id==='foam'?{on:true,from:7,to:10,pct:15}:{on:false,from:13,to:16,pct:15};});
 s.fleet={on:false,company:'شركة الدوحة للتجارة والمقاولات',cr:'CR-88213',plan:'شهري · دفع آجل 30 يوم',limit:6000,
  cars:[{id:'f1',name:'تويوتا هايلكس',plate:'48213',img:'img/car-lc-desert.jpg',driver:'محمد إقبال',size:'l',washes:6},{id:'f2',name:'نيسان باترول',plate:'51290',img:'img/car-landcruiser.jpg',driver:'سنيل كومار',size:'l',washes:4},{id:'f3',name:'تويوتا كامري',plate:'33017',img:'img/car-lexus-black.jpg',driver:'أحمد رشيد',size:'s',washes:8},{id:'f4',name:'مرسيدس فان',plate:'60442',img:'img/fleet-vans.jpg',driver:'جون ماثيو',size:'l',washes:3}],
  drivers:[{n:'محمد إقبال',ph:'+974 5531 2201',av:'img/p-man3.jpg'},{n:'سنيل كومار',ph:'+974 5531 2202',av:'img/p-man4.jpg'},{n:'أحمد رشيد',ph:'+974 5531 2203',av:'img/p-man1.jpg'},{n:'جون ماثيو',ph:'+974 5531 2204',av:'img/p-man6.jpg'}],
  invoices:[{m:'أكتوبر 2026',n:21,amt:1890,st:'open'},{m:'سبتمبر 2026',n:26,amt:2340,st:'paid'},{m:'أغسطس 2026',n:19,amt:1710,st:'paid'}]};
 const v=s.vendors.find(x=>x.id==='pearl'),sv=v.services[3]||v.services[0];const d=new Date(Date.now()-15*86400000).toISOString().slice(0,10);
 s.bookings.push({id:'BPAST1',code:'GC-47702',vendorId:'pearl',branchId:v.branches[0].id,serviceId:sv.id,serviceName:sv.name,size:'l',addons:[v.addons[0].name],date:d,slot:'17:30',car:'تويوتا لاند كروزر أبيض',plate:'123456',customer:'عبدالله (أنت)',cav:'img/a-man5.jpg',phone:'+974 5512 3456',pay:'card',total:sv.prices.l+v.addons[0].price,discount:0,status:'completed',created:Date.now()-15*86400000,rating:5,tip:10,notes:'',mine:true,
  timeline:[{s:'pending',t:'16:02'},{s:'confirmed',t:'16:05'},{s:'arrived',t:'17:28'},{s:'washing',t:'17:31'},{s:'ready',t:'18:40'},{s:'completed',t:'18:52'}],photos:{before:['img/car-lc-desert.jpg'],after:['img/car-lc-white.jpg']},products:[{id:'p1',name:'معطّر سيارة فاخر',price:25}]});
 s.notifs.unshift({t:'🌪️ غبار متوقع بكرة',b:'الأرصاد تتوقع رياح مثيرة للغبار. احجز غسيلك بعد بكرة أو فعّل حماية السيراميك',d:'قبل 10 د',img:'img/wx-dust.jpg',act:'repeat'},
  {t:'مرّ أسبوعان على آخر غسيل 🚗',b:'سيارتك تستاهل لمعة! كرّر طلبك الأخير لدى لمعة اللؤلؤة بضغطة',d:'اليوم',img:'img/car-lc-desert.jpg',act:'repeat'});
 return s;}
(function(){const g=MK.get.bind(MK);MK.get=function(){const s=g();if(!s.x2){mkExt(s);MK.save(s);}return s;};
 const sl=MK.slots.bind(MK);MK.slots=function(v,date,s){return sl(v,date,s).map(x=>{const o=v.offpeak;const h=+x.sl.split(':')[0];if(o&&o.on&&h>=o.from&&h<o.to)x.off=o.pct;return x;});};
 MK.sponsored=(id,s)=>(s||MK.get()).ads.some(a=>a.vendor===id&&a.on);
 MK.offPct=(v,slot)=>{const o=v.offpeak;if(!o||!o.on||!slot)return 0;const h=+slot.split(':')[0];return h>=o.from&&h<o.to?o.pct:0;};
})();
