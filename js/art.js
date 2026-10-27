/* SVG illustrations (inline, animated via CSS) */
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
<path class="twinkle" d="M222 40l5 13 13 5-13 5-5 13-5-13-13-5 13-5z" fill="#ffd9a8"/><path class="twinkle" d="M34 190l3 8 8 3-8 3-3 8-3-8-8-3 8-3z" fill="#a6dcef" style="animation-delay:1s"/></svg>`},
  map(){return `<svg viewBox="0 0 280 240" width="270" aria-hidden="true"><defs><linearGradient id="mp" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="rgba(255,255,255,.22)"/><stop offset="1" stop-color="rgba(255,255,255,.06)"/></linearGradient></defs>
<rect x="10" y="20" width="260" height="200" rx="28" fill="url(#mp)" stroke="rgba(255,255,255,.25)"/>
<path d="M10 120c60-30 90 30 150 0s80-10 110-20M90 20c-20 60 30 90 0 200M190 20c10 50-20 80 10 200" stroke="rgba(255,255,255,.22)" stroke-width="10" fill="none" stroke-linecap="round"/>
<g class="float"><path d="M140 40c-22 0-38 16-38 36 0 26 38 62 38 62s38-36 38-62c0-20-16-36-38-36z" fill="#ff8000"/><circle cx="140" cy="76" r="14" fill="#fff"/><path d="M134 76l4 4 8-9" stroke="#ff8000" stroke-width="4" fill="none" stroke-linecap="round"/></g>
<g fill="#66b8d9"><circle cx="60" cy="160" r="9"/><circle cx="220" cy="170" r="9"/><circle cx="210" cy="70" r="7"/></g><g fill="#fff" opacity=".8"><circle cx="60" cy="160" r="3.500"/><circle cx="220" cy="170" r="3.500"/><circle cx="210" cy="70" r="2.500"/></g></svg>`},
  bubbles(n=10){let s='<div class="bubbles">';for(let i=0;i<n;i++){const z=10+Math.random()*26;s+=`<i style="width:${z}px;height:${z}px;left:${Math.random()*100}%;bottom:${-10+Math.random()*30}%;animation-delay:${(Math.random()*6).toFixed(1)}s;animation-duration:${(5+Math.random()*5).toFixed(1)}s"></i>`}return s+'</div>'},
  confetti(){const c=['#ff8000','#66b8d9','#ffb04d','#fff','#3a7af0'];let s='<div class="confetti" style="position:absolute;inset:0;overflow:hidden;pointer-events:none">';for(let i=0;i<22;i++)s+=`<i style="left:${Math.random()*100}%;background:${c[i%5]};animation-delay:${(Math.random()*3).toFixed(1)}s"></i>`;return s+'</div>'}
};
