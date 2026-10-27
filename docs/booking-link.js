(()=>{
const labels={ru:'Назначить встречу',en:'Book a meeting',pl:'Umów spotkanie',es:'Reservar una reunión',uk:'Призначити зустріч'};
const bookURL='https://lanven-open-dialogue.livelyprawn258.chatgpt.site/';
const places=[document.querySelector('.hero .btns'),document.querySelector('footer .btns')].filter(Boolean);
for(const p of places){const a=document.createElement('a');a.className='btn booking-link';a.dataset.booking='';p.prepend(a)}
const nav=document.querySelector('.nav-links');if(nav){const li=document.createElement('li');li.className='booking-nav';const a=document.createElement('a');a.dataset.booking='';li.append(a);nav.append(li)}
function sync(){document.querySelectorAll('.tool').forEach(tool=>{const name=tool.querySelector('.tool-info h3'),label=tool.querySelector('.frame-bar>span');if(name&&label)label.textContent=name.textContent;});const lang=Object.hasOwn(labels,document.documentElement.lang)?document.documentElement.lang:'ru';document.querySelectorAll('[data-booking]').forEach(a=>{a.textContent=labels[lang]+' ↗\uFE0E';a.href=bookURL+'?lang='+lang;a.setAttribute('aria-label',labels[lang]);});document.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(/^(index|resume|portfolio)\.html(?:[?#]|$)/.test(href)){const u=new URL(href,location.href);u.searchParams.set('lang',lang);a.href=u.pathname.split('/').pop()+u.search+u.hash;}})}
const observer=new MutationObserver(sync);observer.observe(document.documentElement,{attributes:true,attributeFilter:['lang']});sync();
})();
