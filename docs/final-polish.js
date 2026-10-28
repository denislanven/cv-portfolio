(() => {
 'use strict';
 const isCV=!!document.querySelector('.hero-grid');
 const hero=document.querySelector('.hero');
 if(isCV&&hero){
  const actions=hero.querySelector('.btns'),facts=hero.querySelector('.facts');
  if(actions&&facts){
   const quick=document.createElement('div');quick.className='hero-quicklinks';
   actions.querySelectorAll('a').forEach(a=>{if(!a.matches('[data-i="14"],[data-i="16"]')){a.className='hero-quicklink';quick.append(a)}});
   facts.before(actions);actions.after(quick);
  }
 }
 let raf=0;
 function measure(){
  const nav=document.querySelector('nav'),mobile=document.querySelector('.exec-mobile');
  const mobileVisible=mobile&&getComputedStyle(mobile).display!=='none';
  const offset=(nav?.offsetHeight||64)+(mobileVisible?mobile.offsetHeight:0)+20;
  document.documentElement.style.setProperty('--anchor-offset',offset+'px');
  const sections=[...document.querySelectorAll('section[id],footer[id]')];
  let current=null;
  for(const section of sections){const r=section.getBoundingClientRect();if(r.top<=offset+80&&r.bottom>offset+20)current=section.id}
  for(const menu of document.querySelectorAll('nav .nav-links,.exec-mobile')){
   const links=[...menu.querySelectorAll('a[href]')].filter(a=>a.getAttribute('href').startsWith('#'));
   let active=null;
   for(const a of links){if(a.hash==='#'+current){a.setAttribute('aria-current','location');active=a}else a.removeAttribute('aria-current')}
   let marker=menu.querySelector('.nav-marker');
   if(!marker){marker=document.createElement(menu.tagName==='UL'?'li':'span');marker.className='nav-marker';marker.setAttribute('aria-hidden','true');menu.append(marker)}
   if(active){const r=active.getBoundingClientRect(),p=menu.getBoundingClientRect();marker.style.setProperty('--marker-x',(r.left-p.left+menu.scrollLeft)+'px');marker.style.setProperty('--marker-width',r.width+'px');marker.style.setProperty('--marker-opacity','1')}
   else marker.style.setProperty('--marker-opacity','0');
  }
 }
 function schedule(){if(!raf)raf=requestAnimationFrame(()=>{raf=0;measure()})}
 function languageSync(){
  const lang=document.documentElement.lang;
  document.querySelectorAll('a[href]').forEach(a=>{
   const raw=a.getAttribute('href');if(raw.startsWith('#'))return;
   const u=new URL(raw,location.href);
   if(u.origin===location.origin&&/\/(index|resume|portfolio)\.html$/.test(u.pathname)){u.searchParams.set('lang',lang);a.href=u.href}
  });schedule();
 }
 new MutationObserver(()=>queueMicrotask(languageSync)).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
 addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});
 if(typeof ResizeObserver==='function'){
  const ro=new ResizeObserver(schedule);for(const n of document.querySelectorAll('nav,.exec-mobile'))ro.observe(n);
 }
 languageSync();
})();
