/* Localizes existing text nodes without rebuilding interactive controls or losing focus. */
(()=>{'use strict';
 const copy=globalThis.SkyCoachStrategyCopy;if(!copy)return;
 const norm=s=>String(s).replace(/\s+/g,' ').trim(),sources=new WeakMap(),attributes=new WeakMap();
 const lookup=new Map();Object.values(copy).forEach(rows=>rows.forEach((s,i)=>lookup.set(norm(s),i)));
 const picker=document.getElementById('case-language');let lang='ru';
 try{const q=new URLSearchParams(location.search).get('lang');lang=q||localStorage.getItem('lang')||'ru'}catch{}
 if(!copy[lang])lang='ru';
 const translateText=node=>{const current=norm(node.nodeValue);if(!current)return;let index=sources.get(node);if(index===undefined||!Object.values(copy).some(rows=>norm(rows[index])===current)){index=lookup.get(current);if(index===undefined)return;sources.set(node,index)}const text=copy[lang][index];node.nodeValue=node.nodeValue.replace(/\S[\s\S]*\S|\S/,text)};
 function apply(root){
  if(root.nodeType===3){translateText(root);return}
  if(root.nodeType!==1&&root!==document)return;
  if(root.nodeType===1&&root.closest('script,style,select'))return;
  const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement?.closest('script,style,select')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});
  while(walker.nextNode())translateText(walker.currentNode);
  const els=root.querySelectorAll('[aria-label],[alt],meta[name="description"]');
  els.forEach(el=>['aria-label','alt',...(el.matches('meta[name="description"]')?['content']:[])].forEach(attr=>{const value=el.getAttribute(attr);if(!value)return;let original=attributes.get(el);if(!original){original={};attributes.set(el,original)}let i=original[attr];if(i===undefined){i=lookup.get(norm(value));if(i===undefined)return;original[attr]=i}el.setAttribute(attr,copy[lang][i])}));
 }
 const observer=new MutationObserver(records=>{observer.disconnect();const roots=new Set();for(const r of records){if(r.type==='characterData')roots.add(r.target);else if(r.type==='childList')r.addedNodes.forEach(n=>roots.add(n))}roots.forEach(apply);observe()});
 function observe(){observer.observe(document.body,{childList:true,subtree:true,characterData:true})}
 function refresh(){observer.disconnect();apply(document.body);apply(document.head);observe()}
 function select(next,save){if(!copy[next])return;lang=next;document.documentElement.lang=lang;picker.value=lang;document.title='SkyCoach · '+({ru:'HR-стратегия',en:'HR Strategy',pl:'Strategia HR',es:'Estrategia de RR. HH.',uk:'HR-стратегія'})[lang]+' / Denis Lanven';if(save){try{localStorage.setItem('lang',lang)}catch{}const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u)}document.querySelectorAll('a[data-language-link],.author,footer a[href*="index.html"]').forEach(a=>{const u=new URL(a.getAttribute('href'),location.href);u.searchParams.set('lang',lang);a.href=u.href});refresh();globalThis.dispatchEvent(new CustomEvent('case-language-change',{detail:{lang}}))}
 picker.addEventListener('change',()=>select(picker.value,true));globalThis.SkyCoachI18n={refresh,get language(){return lang}};select(lang,false);
})();
