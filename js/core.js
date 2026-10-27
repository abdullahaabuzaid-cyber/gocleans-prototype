/* Core helpers: i18n (Arabic only for now), formatting, mock data (ALL FAKE) */
const LOCALE='ar';
document.documentElement.lang=LOCALE;
document.documentElement.dir='rtl';          // switch to 'ltr' when an LTR locale is added
const t=(k,vars)=>{
  let s=(window.I18N&&I18N[LOCALE]&&I18N[LOCALE][k]);
  if(s===undefined){console.warn('[i18n] missing',k);return k}
  if(vars)for(const v in vars)s=s.replace(new RegExp('\\{'+v+'\\}','g'),vars[v]);
  return s;
};
/* Localised data field: {ar:'..', en:'..'} -> current locale */
const L=o=>typeof o==='string'?o:(o[LOCALE]||o.ar);
const nf=new Intl.NumberFormat('en-US');
const num=n=>nf.format(n);
const qar=(n,cls='')=>`<bdi class="${cls}">${num(n)}</bdi> ${t('cur')}`;
const fmtDate=(iso,opt={day:'numeric',month:'long'})=>new Intl.DateTimeFormat('ar-QA-u-nu-latn-ca-gregory',opt).format(new Date(iso));
const fmtFull=iso=>fmtDate(iso,{day:'numeric',month:'long',year:'numeric'});

/* ---------- Mock data (clearly fake) ---------- */
const DATA={
  today:'2026-10-27',
  user:{name:'عميل تجريبي',mobile:'5000 0001',points:420,email:'demo@example.test'},
  packages:[
    {id:'weekly',  name:{ar:'الأسبوعي'},  tag:{ar:'كل 7 أيام'},   days:7,  washes:2, price:55,  icon:'drop',   perks:['wash_ext','vac_basic','pick_branch']},
    {id:'biweekly',name:{ar:'نصف الشهري'},tag:{ar:'كل 14 يوماً'},days:14, washes:4, price:99,  icon:'bubble', perks:['wash_ext','vac_basic','perfume','pick_branch']},
    {id:'monthly', name:{ar:'الشهري'},     tag:{ar:'كل 30 يوماً'},days:30, washes:8, price:179, icon:'sparkle',perks:['wash_ext','vac_basic','perfume','inside_1','priority'],featured:true}
  ],
  perWash:35,
  makes:[
    {id:'toyota',name:{ar:'تويوتا'},models:['لاند كروزر','كامري','يارس','برادو']},
    {id:'nissan',name:{ar:'نيسان'},models:['باترول','التيما','صني','إكستيرا']},
    {id:'lexus', name:{ar:'لكزس'},models:['LX 600','ES 350','RX 350']},
    {id:'honda', name:{ar:'هوندا'},models:['أكورد','سيفيك','CR-V']},
    {id:'ford',  name:{ar:'فورد'},models:['إكسبلورر','إكسبيديشن','موستنج']}
  ],
  cars:[
    {id:'c1',make:'تويوتا',model:'لاند كروزر',year:2023,plate:'111 222',color:'أبيض',pkg:'monthly'},
    {id:'c2',make:'نيسان',model:'التيما',year:2021,plate:'333 444',color:'فضي',pkg:null},
    {id:'c3',make:'لكزس',model:'ES 350',year:2022,plate:'555 666',color:'أسود',pkg:null}
  ],
  branches:[
    {id:'b1',name:{ar:'فرع الدوحة الجديدة'},area:{ar:'الدوحة · شارع تجريبي 1'},hours:'6:00 ص – 11:00 م',dist:'1.8',busy:'low'},
    {id:'b2',name:{ar:'فرع لوسيل'},area:{ar:'لوسيل · شارع تجريبي 2'},hours:'7:00 ص – 12:00 م',dist:'6.4',busy:'mid'},
    {id:'b3',name:{ar:'فرع الوكرة'},area:{ar:'الوكرة · شارع تجريبي 3'},hours:'6:00 ص – 10:00 م',dist:'14.2',busy:'low'},
    {id:'b4',name:{ar:'فرع الريان'},area:{ar:'الريان · شارع تجريبي 4'},hours:'6:00 ص – 11:00 م',dist:'9.1',busy:'high'}
  ],
  services:[
    {id:'wash',name:{ar:'غسيل خارجي'},price:35,icon:'drop',base:true},
    {id:'inside',name:{ar:'تنظيف داخلي'},price:25,icon:'vac',extra:true},
    {id:'polish',name:{ar:'تلميع'},price:60,icon:'shine',extra:true},
    {id:'wax',name:{ar:'تشميع'},price:40,icon:'sparkle',extra:true},
    {id:'engine',name:{ar:'غسيل محرك'},price:30,icon:'engine',extra:true},
    {id:'foam',name:{ar:'رغوة مكثفة'},price:15,icon:'bubble',extra:true},
    {id:'perfume',name:{ar:'تعطير'},price:10,icon:'perfume',extra:true},
    {id:'tires',name:{ar:'تلميع الإطارات'},price:10,icon:'car',extra:true}
  ],
  history:[
    {id:'w1',date:'2026-10-25',time:'9:15 ص',branch:'فرع الدوحة الجديدة',car:'لاند كروزر',svc:'غسيل خارجي + تعطير',rating:5,src:'sub'},
    {id:'w2',date:'2026-10-22',time:'6:40 م',branch:'فرع لوسيل',car:'لاند كروزر',svc:'غسيل خارجي',rating:4,src:'sub'},
    {id:'w3',date:'2026-10-20',time:'4:05 م',branch:'فرع الدوحة الجديدة',car:'لاند كروزر',svc:'غسيل خارجي + تنظيف داخلي',rating:5,src:'sub'},
    {id:'w4',date:'2026-10-12',time:'10:30 ص',branch:'فرع الريان',car:'التيما',svc:'تلميع + غسيل خارجي',rating:5,src:'pay',amount:95},
    {id:'w5',date:'2026-09-28',time:'7:20 م',branch:'فرع الوكرة',car:'لاند كروزر',svc:'غسيل خارجي',rating:4,src:'sub'}
  ],
  invoices:[
    {id:'INV-DEMO-0042',date:'2026-10-20',title:'اشتراك الشهري',amount:179,status:'paid',method:'Visa •••• 0000'},
    {id:'INV-DEMO-0039',date:'2026-10-12',title:'غسلة بالدفع المباشر',amount:95,status:'paid',method:'KNET'},
    {id:'INV-DEMO-0031',date:'2026-09-20',title:'اشتراك الشهري',amount:179,status:'paid',method:'Visa •••• 0000'},
    {id:'INV-DEMO-0024',date:'2026-08-20',title:'اشتراك الشهري',amount:179,status:'failed',method:'Visa •••• 0000'}
  ],
  coupons:{GOCLEAN10:{type:'pct',v:10},WELCOME20:{type:'amt',v:20}}
};
const pkgById=id=>DATA.packages.find(p=>p.id===id);
const carById=(id,cars=DATA.cars)=>cars.find(c=>c.id===id);
const branchById=id=>DATA.branches.find(b=>b.id===id);
const plateHtml=p=>`<span class="plate"><span class="q">قطر<br>QATAR</span><span class="n">${p}</span></span>`;
