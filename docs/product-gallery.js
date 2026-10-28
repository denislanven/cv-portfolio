(() => {
 'use strict';
 const root=document.getElementById('tools');if(!root)return;
 const labels={ru:{details:'О решении',demo:'Попробовать демо ↗',close:'Закрыть ×'},en:{details:'About the solution',demo:'Try the demo ↗',close:'Close ×'},pl:{details:'O rozwiązaniu',demo:'Wypróbuj demo ↗',close:'Zamknij ×'},es:{details:'Sobre la solución',demo:'Probar demo ↗',close:'Cerrar ×'},uk:{details:'Про рішення',demo:'Спробувати демо ↗',close:'Закрити ×'}};
 const reduced=matchMedia('(prefers-reduced-motion: reduce)'),BUILD='20261028-polish1';
 let trigger=null;const motions=new WeakMap();
 function copy(){return labels[document.documentElement.lang]||labels.ru}
 function url(frame,embedded){const canonical=new URL(frame.dataset.src,location.href);canonical.searchParams.set('lang',document.documentElement.lang);canonical.searchParams.set('v',BUILD);if(embedded)canonical.searchParams.set('embed','1');else canonical.searchParams.delete('embed');return canonical.href}
 function sync(){
  root.querySelectorAll('[data-gallery-label]').forEach(e=>{e.textContent=copy()[e.dataset.galleryLabel]||e.textContent});
  root.querySelectorAll('.product').forEach(card=>{const title=card.querySelector('h3')?.textContent;card.querySelectorAll('.product-actions button').forEach(button=>button.setAttribute('aria-label',copy()[button.dataset.galleryLabel]+': '+title))});
  root.querySelectorAll('.tool').forEach(tool=>{
   const frame=tool.querySelector('iframe[data-src]');if(!frame)return;
   const canonical=new URL(url(frame,false));tool.querySelectorAll('a[target="_blank"]').forEach(a=>a.href=canonical.href);
   const title=tool.querySelector('.tool-info h3'),desc=tool.querySelector('.tool-info p[data-tt$="_desc"]'),poster=tool.querySelector('.fposter');
   if(poster&&title)poster.querySelector('.poster-title').textContent=title.textContent;
   if(poster&&desc)poster.querySelector('.poster-copy').textContent=desc.textContent;
   // A running demo follows the language switch, too.
   if(frame.hasAttribute('src')&&frame.src!==url(frame,true))frame.src=url(frame,true);
  });
 }
 function start(d){
  d.dataset.mode='demo';const frame=d.querySelector('iframe[data-src]');if(!frame)return;
  d.querySelectorAll('.fposter').forEach(p=>p.hidden=true);
  if(frame.getAttribute('src')!==url(frame,true)){frame.addEventListener('load',()=>{frame.focus();try{frame.contentWindow.focus()}catch{}},{once:true});frame.src=url(frame,true);}
  d.scrollTop=0;
 }
 function open(id,button,mode='info'){
  const d=document.getElementById('dialog-'+id);if(!d)return;
  motions.get(d)?.cancel();trigger=button||null;d.dataset.mode=mode;
  if(!d.open)d.showModal();document.body.classList.add('product-modal-open');d.scrollTop=0;
  if(mode==='demo')start(d);
  d.querySelector('.product-close').focus({preventScroll:true});
  if(!reduced.matches&&d.animate){const a=d.animate([{opacity:0,transform:'translateY(10px)'},{opacity:1,transform:'translateY(0)'}],{duration:220,easing:'cubic-bezier(.2,.8,.2,1)'});motions.set(d,a)}
 }
 function close(d){
  motions.get(d)?.cancel();
  if(reduced.matches||!d.animate){d.close();return}
  const a=d.animate([{opacity:1,transform:'translateY(0)'},{opacity:0,transform:'translateY(8px)'}],{duration:160,easing:'ease-in'});motions.set(d,a);a.onfinish=()=>d.close();
 }
 root.querySelectorAll('.product-dialog').forEach(d=>{
  const actions=d.querySelector('.tool-info .btns');if(actions){const launch=document.createElement('button');launch.type='button';launch.className='btn primary demo-start';launch.dataset.galleryLabel='demo';launch.addEventListener('click',()=>start(d));actions.prepend(launch)}
  d.querySelector('.product-close').addEventListener('click',()=>close(d));
  d.addEventListener('cancel',e=>{e.preventDefault();close(d)});
  d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close(d)});
  d.addEventListener('close',()=>{
   motions.get(d)?.cancel();document.body.classList.remove('product-modal-open');d.querySelectorAll('iframe').forEach(f=>f.removeAttribute('src'));d.querySelectorAll('.fposter').forEach(p=>p.hidden=false);
   if(trigger)trigger.focus({preventScroll:true});
   if(location.hash==='#'+d.querySelector('.tool').id)history.replaceState(null,'',location.pathname+location.search+'#tools');
  });
 });
 root.querySelectorAll('[data-tool]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.tool,b,'info')));
 root.querySelectorAll('[data-demo]').forEach(b=>b.addEventListener('click',()=>open(b.dataset.demo,b,'demo')));
 root.addEventListener('click',e=>{const b=e.target.closest('.fposter');if(b)start(b.closest('dialog'))});
 new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});sync();
 function hashOpen(){if(/^#tool-/.test(location.hash))open(location.hash.slice(1),null,'info')}
 addEventListener('hashchange',hashOpen);hashOpen();
})();
