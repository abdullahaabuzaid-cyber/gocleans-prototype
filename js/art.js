/* Art helpers: real photographs only (plus the data ring + confetti). */
let _gid=0;
const ART={
  /* REAL car photographs (Unsplash/Pexels, see img/CREDITS.txt). Replaces the old cartoon SVG cars. */
  car(opts={}){
    const src=opts.src||'img/car-lexus-lx.jpg',pos=opts.pos||'center 60%',h=opts.h?`height:${opts.h}px;`:'';
    return `<div class="carphoto ${opts.cls||''}" style="${h}${opts.w?`width:${opts.w}px;`:''}"><img src="${src}" alt="" style="object-position:${pos}" loading="eager"><i class="cp-grad"></i>${opts.fx===false?'':'<i class="cp-shine"></i>'}</div>`;
  },
  /* small car photo for lists. arg: a car object ({id,color}) */
  thumb(c){
    const byId={c1:'t-landcruiser',c2:'t-silver',c3:'t-black'},byColor={'أبيض':'t-white','فضي':'t-silver','أسود':'t-black','رمادي':'t-silver'};
    const f=(c&&(byId[c.id]||byColor[c.color]))||'t-landcruiser';
    return `<img class="carthumb" src="img/${f}.jpg" alt="">`;
  },
  mini(c){return ART.thumb(c&&typeof c==='object'?c:null)},
  /* onboarding illustrations */
  foam(){return `<img class="onb-photo" src="img/wash-foam.jpg" alt="" style="object-position:center 45%"><i class="onb-grad"></i>`},
  ring(){return `<img class="onb-photo dim" src="img/car-lexus-lx.jpg" alt="" style="object-position:center 60%"><i class="onb-grad strong"></i><svg style="position:relative;z-index:2" viewBox="0 0 260 260" width="250" aria-hidden="true"><defs><linearGradient id="orr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff8000"/><stop offset=".6" stop-color="#ffb04d"/><stop offset="1" stop-color="#66b8d9"/></linearGradient></defs>
<circle cx="130" cy="130" r="98" fill="none" stroke="rgba(255,255,255,.14)" stroke-width="22"/>
<circle cx="130" cy="130" r="98" fill="none" stroke="url(#orr)" stroke-width="22" stroke-linecap="round" stroke-dasharray="460 616" transform="rotate(-90 130 130)"/>
<text x="130" y="140" text-anchor="middle" font-family="Tajawal" font-weight="800" font-size="68" fill="#fff">5</text>
<text x="130" y="170" text-anchor="middle" font-family="Tajawal" font-weight="700" font-size="17" fill="#cfe6f3">غسلات متبقية</text>
</svg>`},
  map(){const b=DATA.branches[0];return `<img class="onb-photo" src="img/doha-aerial.jpg" alt="" style="object-position:center 55%"><i class="onb-grad"></i><div class="onb-pin"><div class="pn">${ic('pin',24)}</div><div><b>${L(b.name)}</b><small>${L(b.area)} · ${b.dist} كم</small></div></div>`},
  bubbles(){return ''}, /* removed: decorative drawn bubbles */
  confetti(){const c=['#ff8000','#66b8d9','#ffb04d','#fff','#3a7af0'];let s='<div class="confetti" style="position:absolute;inset:0;overflow:hidden;pointer-events:none">';for(let i=0;i<22;i++)s+=`<i style="left:${Math.random()*100}%;background:${c[i%5]};animation-delay:${(Math.random()*3).toFixed(1)}s"></i>`;return s+'</div>'}
};
