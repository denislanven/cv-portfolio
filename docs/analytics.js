(()=>{'use strict';
const ENDPOINT='https://lanven-open-dialogue.denis-lanven.chatgpt.site/api/analytics/collect';
const state=value=>{document.documentElement.dataset.analyticsState=value};state('starting');
const PREF='lanven-analytics-off',cookiePath=location.hostname==='denislanven.github.io'?'/cv-portfolio/':'/';
const read=(storage,key)=>{try{return globalThis[storage].getItem(key)}catch{return null}};
const write=(storage,key,value)=>{try{value===null?globalThis[storage].removeItem(key):globalThis[storage].setItem(key,value)}catch{}};
function excluded(){return read('localStorage',PREF)==='1'||read('sessionStorage',PREF)==='1'||/(?:^|;\s*)lanven_analytics_off=1(?:;|$)/.test(document.cookie||'')}
let testing=false;const flag=new URLSearchParams(location.search).get('analytics');
if(flag==='off'||read('sessionStorage',PREF)==='1'){write('localStorage',PREF,'1');write('sessionStorage',PREF,'1')}
if(flag==='off'){try{document.cookie='lanven_analytics_off=1; Path='+cookiePath+'; Max-Age=31536000; SameSite=Lax; Secure'}catch{}}
if(flag==='on'){write('localStorage',PREF,null);write('sessionStorage',PREF,null);try{document.cookie='lanven_analytics_off=; Path='+cookiePath+'; Max-Age=0; SameSite=Lax; Secure'}catch{}}
if(flag==='test')write('sessionStorage','lanven-analytics-test','1');if(flag==='on'||flag==='off')write('sessionStorage','lanven-analytics-test',null);testing=read('sessionStorage','lanven-analytics-test')==='1';
if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl){state('privacy-disabled');return}
if(window.top!==window.self){state('embedded-disabled');return}
if(navigator.webdriver||['localhost','127.0.0.1','terminal.local'].includes(location.hostname)){state('technical-disabled');return}
if(excluded()&&!testing){state('owner-disabled');return}
const bookingHosts=['lanven-open-dialogue.livelyprawn258.chatgpt.site','lanven-open-dialogue.denis-lanven.chatgpt.site'];const booking=bookingHosts.includes(location.hostname);const skycoach=location.pathname.endsWith('skycoach-strategy.html');const strategy=skycoach||location.pathname.endsWith('waistline-strategy.html');const strategyName=skycoach?'skycoach-strategy':'waistline-strategy';
if(booking&&location.pathname!=='/')return;
const site=booking?'booking':(strategy||location.pathname.endsWith('portfolio.html'))?'portfolio':'resume';
const clean=v=>typeof v==='string'&&/^[a-zA-Z0-9_.:/ -]*$/.test(v)?v.slice(0,64):'';
const params=new URLSearchParams(location.search);let ref='';try{ref=new URL(document.referrer).hostname}catch{}
const source=testing?'verification':clean(params.get('utm_source'))||clean(ref)||'direct';
const page=booking?'/':strategy?'/cv-portfolio/'+strategyName+'.html':location.pathname.endsWith('portfolio.html')?'/cv-portfolio/portfolio.html':'/cv-portfolio/';
function track(event,label=''){if(excluded()&&!testing){state('owner-disabled');return}try{state('sending');fetch(ENDPOINT,{method:'POST',mode:'cors',credentials:booking?'same-origin':'omit',keepalive:true,headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({event,site,page,source,label:clean(label),language:document.documentElement.lang?.slice(0,2)||'other',device:matchMedia('(max-width:760px)').matches?'mobile':'desktop'})}).then(r=>{state(r.ok?'delivered':'http-'+r.status);if(!r.ok)console.warn('Analytics delivery failed:',r.status)}).catch(()=>{state('delivery-failed');console.warn('Analytics delivery unavailable')})}catch{}}
track('page_view',strategy?strategyName:'');
document.addEventListener('click',e=>{const t=e.target.closest?.('a,button');if(!t)return;const a=t.closest('a');if(a){let u;try{u=new URL(a.href,location.href)}catch{return}if(/\.pdf$/i.test(u.pathname)){track('pdf_click',u.pathname.split('/').pop());return}if(u.pathname.endsWith('waistline-strategy.html')||u.pathname.endsWith('skycoach-strategy.html')){track('case_open',u.pathname.endsWith('skycoach-strategy.html')?'skycoach-strategy':'waistline-strategy');return}if(bookingHosts.includes(u.hostname)&&!booking){track('booking_click');return}if(['t.me','www.linkedin.com','linkedin.com'].includes(u.hostname)||u.protocol==='mailto:'){track('contact_click',u.protocol==='mailto:'?'email':u.hostname);return}}const demo=t.closest('[data-demo],.demo-start');if(demo){track('demo_open',demo.dataset.demo||demo.closest('.product-dialog')?.id||'demo');return}const info=t.closest('[data-tool]');if(info)track('case_open',info.dataset.tool);},true);
document.addEventListener('toggle',e=>{if(e.target.matches?.('details')&&e.target.open){const all=[...document.querySelectorAll('details')];track('case_open','case-'+(all.indexOf(e.target)+1))}},true);
let lastLang=document.documentElement.lang;new MutationObserver(()=>{const lang=document.documentElement.lang;if(lang!==lastLang){lastLang=lang;track('language_change',lang)}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
if(booking){let sent=false;const step=document.getElementById('details-step');if(step)new MutationObserver(()=>{if(!step.hidden&&!sent){sent=true;track('details_open')}}).observe(step,{attributes:true,attributeFilter:['hidden']})}
})();
