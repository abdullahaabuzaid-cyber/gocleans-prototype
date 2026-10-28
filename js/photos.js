/* Real-photo layer: every picture in the app is a photograph (Pexels, see img/CREDITS.txt). No drawn cars / characters. */
const PHO={
  pkg:{weekly:'wash-pressure',biweekly:'wash-interior',monthly:'wash-polish'},
  br:{b1:'doha-corniche',b2:'doha-westbay',b3:'doha-sunset',b4:'doha-aerial'},
  svc:{wash:'wash-pressure2',inside:'wash-vacuum',polish:'wash-polish',wax:'prod-polish',engine:'wash-wheel',foam:'wash-foam2',perfume:'prod-perfume',tires:'prod-tire'}
};
DATA.packages.forEach(p=>p.img=PHO.pkg[p.id]);
DATA.branches.forEach(b=>b.img=PHO.br[b.id]);
DATA.services.forEach(s=>s.img=PHO.svc[s.id]);
const imgSrc=n=>'img/'+n+'.jpg';
const svcPhoto=txt=>{txt=txt||'';return txt.includes('تلميع')?'wash-polish':txt.includes('داخلي')?'wash-interior':txt.includes('تعطير')?'wash-pressure2':'wash-pressure'};
const phImg=(n,cls,pos)=>`<img class="${cls||''}" src="img/${n}.jpg" alt=""${pos?` style="object-position:${pos}"`:''} loading="lazy">`;
/* face-cropped portraits */
const FEM=['سارة','هند','نورة','مريم','لينا','منى','فاطمة','عائشة','ريم','دانة','شيخة','موزة','جواهر','أمل'];
const FIXP={'خالد المري':'man2','فهد الكعبي':'man6','يوسف النعيمي':'man5','سعد الهاجري':'man7','ناصر الدوسري':'man1','علي البدر':'man4','سلمان الأنصاري':'man8','محمد الخليفي':'man3','عبدالله الكعبي':'man3','سلمان الهاجري':'man7','ناصر النعيمي':'man1','لينا البدر':'woman3','هند المري':'woman2','سارة العبدالله':'woman','نورة السليطي':'woman3','مريم الكعبي':'woman2'};
const MALEP=['man2','man6','man5','man7','man1','man4','man3','man8'],FEMP=['woman','woman2','woman3'];
const hashN=n=>{let h=0;for(const c of String(n))h=(h*31+c.charCodeAt(0))>>>0;return h};
const portraitOf=n=>{n=String(n||'');if(FIXP[n])return FIXP[n];const f=FEM.includes(n.split(' ')[0]);const a=f?FEMP:MALEP;return a[hashN(n)%a.length]};
const AV=n=>`<img src="img/a-${portraitOf(n)}.jpg" alt="">`;
const avatarPh=(k,w,r,extra)=>`<div class="avatar ph" style="width:${w}px;height:${w}px;border-radius:${r}px;${extra||''}"><img src="img/a-${k}.jpg" alt=""></div>`;
/* notification feed with real photos */
const nfeed=()=>{const L2=[['car-lexus-lx','سيارتك جاهزة','فرع الدوحة الجديدة · تفضل بالاستلام','الآن'],['wx-dust','تنبيه غبار في الدوحة','احجز غسلة بعد العاصفة بخصم 10%','قبل ساعتين'],['wash-polish','حان وقت التلميع','باقتك الشهرية تشمل تلميعاً واحداً','أمس']];return `<div class="nfeed">${L2.map(x=>`<div class="nf"><div class="nt"><img src="img/${x[0]}.jpg" alt=""></div><div><b>${x[1]}</b><span>${x[2]}</span></div><em>${x[3]}</em></div>`).join('')}</div>`};
const HP=(n,pos,cls)=>`<div class="hero-ph ${cls||''}"><img src="img/${n}.jpg" alt=""${pos?` style="object-position:${pos}"`:''}><i></i></div>`;

/* photo tiles (home quick-access + all-services grids, profile menu) */
const TILE_PH={packages:'wash-polish',cars:'car-landcruiser',history:'tile-receipt',branches:'doha-westbay',book:'wash-tunnel',track:'wash-foam',plate:'cam-rear',loyalty:'car-lexus-black',refer:'tile-gift2',family:'tile-family',gift:'tile-gift',weather:'wx-rain',rate:'wash-worker',store:'prod-perfume',wallet:'tile-pay',help:'tile-help2',cards:'tile-pay',notifications:'car-lexus-lx'};
const ptile=(key,icon,label,attr)=>`<button class="ptile" ${attr}><img src="img/${TILE_PH[key]}.jpg" alt="" loading="lazy"><i class="pt-ov"></i><span class="pt-b">${ic(icon,15)}</span><span class="pt-l">${label}</span></button>`;
