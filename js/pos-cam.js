/* POS — plate recognition mode (camera detects plate, checks eligibility, auto-deducts). ALL FAKE */
const PC={open:false,i:0,done:false};
const pcT=(k,v)=>t(k,v);
function pcModal(){const d=PD[PC.i%PD.length],ok=d.s==='ok';
 return `<div class="modal-bg" data-pc="close"><div class="pc-modal" onclick="event.stopPropagation()">
 <div class="row between mb-3"><div><h2 style="margin:0">${t('pc.title')}</h2><div class="muted sm">${t('pc.sub')}</div></div><button class="iconbtn" data-pc="close">${ic('x')}</button></div>
 <div class="cam"><div class="cam-view">${camSvg()}<div class="cam-hud"><span class="rec"><i></i> ${t('ad.p.live')}</span><span class="cam-name">${t('ad.p.cam')}</span><span class="cam-ts" dir="ltr">2026-10-27 · 09:41</span></div>
 <div class="plate-box ${ok?'':'bad'}"><i class="c1"></i><i class="c2"></i><i class="c3"></i><i class="c4"></i><span class="scanl"></span><div class="plate-in">${plateHtml(d.p)}</div></div>
 <div class="det-card ${PCH[d.s]}"><div class="row between"><span class="muted xs">${t('pc.detected')}</span><b>${d.c}%</b></div><div class="det-num" dir="ltr">${d.p}</div><div style="margin-top:6px"><span class="chip ${PCH[d.s]}">${t('ad.p.st.'+d.s)}</span></div></div></div>
 <div class="cam-info"><div class="ci"><span class="muted xs">${t('ad.p.client')}</span><b>${d.n}</b><span class="muted xs">${d.car}</span></div><div class="ci"><span class="muted xs">${t('ad.p.pkg')}</span><b>${d.pk<0?'—':L(DATA.packages[d.pk].name)}</b></div><div class="ci"><span class="muted xs">${t('ad.p.left')}</span><b>${d.s==='none'?'—':(ok&&PC.done)?d.left-1:d.left}</b></div><div class="ci act"><span class="act-t ${PCH[d.s]}">${ic(ok?'checkc':'warn',20)} ${t('ad.p.action.'+d.s)}</span></div></div></div>
 <div class="row gap-2 mt-3"><button class="btn btn-primary grow" data-pc="deduct" ${ok&&!PC.done?'':'disabled'}>${ic('check',20)} ${PC.done?t('pc.deducted'):t('pc.deduct')}</button><button class="btn btn-ghost" data-pc="next">${ic('camera',19)} ${t('pc.sim')}</button></div>
 <div class="pc-recent mt-3"><span class="muted xs">${t('pc.today')}</span><div class="row gap-2" style="flex-wrap:wrap;margin-top:6px">${PD.map((x,k)=>`<button class="pc-r ${k===PC.i%PD.length?'on':''}" data-pc="sel" data-v="${k}"><span dir="ltr">${x.p}</span><i class="dotc ${PCH[x.s]}"></i></button>`).join('')}</div></div></div></div>`}
{const base=R;R=function(){base();const top=document.querySelector('.pos-top .row');if(top&&!top.querySelector('[data-pc=open]')){const b=document.createElement('button');b.className='tg tg-scan';b.dataset.pc='open';b.innerHTML=ic('camera',18)+' '+t('pc.mode.scan');top.insertBefore(b,top.firstChild)}
 if(PC.open)document.getElementById('root').insertAdjacentHTML('beforeend',pcModal())}}
document.addEventListener('click',e=>{const el=e.target.closest('[data-pc]');if(!el)return;const a=el.dataset.pc;
 if(a==='open'){PC.open=true;PC.done=false}else if(a==='close'){PC.open=false}
 else if(a==='next'){PC.i++;PC.done=false}else if(a==='sel'){PC.i=+el.dataset.v;PC.done=false}
 else if(a==='deduct'){PC.done=true;if(PD[PC.i%PD.length].s==='ok'){lookup('5000 0001');P.useSub=true;P.cart.wash=P.cart.wash||1}}
 R();e.stopPropagation()},true);
R();
