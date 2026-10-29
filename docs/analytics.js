(()=>{'use strict';
const ENDPOINT='https://lanven-open-dialogue.denis-lanven.chatgpt.site/api/analytics/collect';
if(navigator.doNotTrack==='1'||navigator.globalPrivacyControl||window.top!==window.self)return;
try{const flag=new URLSearchParams(location.search).get('analytics');if(flag==='off')sessionStorage.setItem('lanven-analytics-off','1');if(flag==='on')sessionStorage.removeItem('lanven-analytics-off');if(sessionStorage.getItem('lanven-analytics-off'))return}catch{}
const booking=location.hostname==='lanven-open-dialogue.livelyprawn258.chatgpt.site';
if(booking&&location.pathname!=='/')return;
const site=booking?'booking':location.pathname.endsWith('portfolio.html')?'portfolio':'resume';
const clean=v=>typeof v==='string'&&/^[a-zA-Z0-9_.:/ -]*$/.test(v)?v.slice(0,64):'';
const params=new URLSearchParams(location.search);let ref='';try{ref=new URL(document.referrer).hostname}catch{}
const source=clean(params.get('utm_source'))||clean(ref)||'direct';
const page=booking?'/':location.pathname.endsWith('portfolio.html')?'/cv-portfolio/portfolio.html':'/cv-portfolio/';
function track(event,label=''){try{fetch(ENDPOINT,{method:'POST',mode:'cors',credentials:'omit',keepalive:true,headers:{'Content-Type':'text/plain;charset=UTF-8'},body:JSON.stringify({event,site,page,source,label:clean(label),language:document.documentElement.lang?.slice(0,2)||'other',device:matchMedia('(max-width:760px)').matches?'mobile':'desktop'})}).then(r=>{if(!r.ok)console.warn('Analytics delivery failed:',r.status)}).catch(()=>{console.warn('Analytics delivery unavailable')})}catch{}}
track('page_view');
document.addEventListener('click',e=>{const t=e.target.closest?.('a,button');if(!t)return;const a=t.closest('a');if(a){let u;try{u=new URL(a.href,location.href)}catch{return}if(/\.pdf$/i.test(u.pathname)){track('pdf_click',u.pathname.split('/').pop());return}if(u.hostname==='lanven-open-dialogue.livelyprawn258.chatgpt.site'&&!booking){track('booking_click');return}if(['t.me','www.linkedin.com','linkedin.com'].includes(u.hostname)||u.protocol==='mailto:'){track('contact_click',u.protocol==='mailto:'?'email':u.hostname);return}}const demo=t.closest('[data-demo],.demo-start');if(demo){track('demo_open',demo.dataset.demo||demo.closest('.product-dialog')?.id||'demo');return}const info=t.closest('[data-tool]');if(info)track('case_open',info.dataset.tool);},true);
document.addEventListener('toggle',e=>{if(e.target.matches?.('details')&&e.target.open){const all=[...document.querySelectorAll('details')];track('case_open','case-'+(all.indexOf(e.target)+1))}},true);
let lastLang=document.documentElement.lang;new MutationObserver(()=>{const lang=document.documentElement.lang;if(lang!==lastLang){lastLang=lang;track('language_change',lang)}}).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
if(booking){let sent=false;const step=document.getElementById('details-step');if(step)new MutationObserver(()=>{if(!step.hidden&&!sent){sent=true;track('details_open')}}).observe(step,{attributes:true,attributeFilter:['hidden']})}
})();
