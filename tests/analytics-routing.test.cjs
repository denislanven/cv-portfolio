const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs');
const source=fs.readFileSync('docs/analytics.js','utf8');
function run(path='/cv-portfolio/waistline-strategy.html',search='',hostname='denislanven.github.io',embedded=false){
 const calls=[],handlers={},storage=new Map(),document={documentElement:{dataset:{},lang:'ru'},referrer:'',addEventListener:(name,fn)=>handlers[name]=fn,querySelectorAll:()=>[],querySelector:()=>null,getElementById:()=>null};
 const self={},location={hostname,pathname:path,search,href:'https://'+hostname+path+search};
 const ctx={document,location,navigator:{},window:{self,top:embedded?{}:self},URL,URLSearchParams,sessionStorage:{getItem:k=>storage.get(k),setItem:(k,v)=>storage.set(k,v),removeItem:k=>storage.delete(k)},matchMedia:()=>({matches:false}),MutationObserver:class{observe(){}},fetch:(_,options)=>{calls.push(JSON.parse(options.body));return Promise.resolve({ok:true})},console};
 vm.runInNewContext(source,ctx);
 function click(href){const a={href,closest:s=>s==='a'?a:null};handlers.click?.({target:{closest:()=>a}})}
 return {calls,click,document};
}
test('analytics: strategy views belong to portfolio and retain their own page and label',()=>{const {calls}=run();assert.equal(calls.length,1);assert.equal(calls[0].site,'portfolio');assert.equal(calls[0].page,'/cv-portfolio/waistline-strategy.html');assert.equal(calls[0].label,'waistline-strategy');});
test('analytics: case and current booking links each produce exactly one classified event',()=>{const p=run('/cv-portfolio/portfolio.html');p.click('https://denislanven.github.io/cv-portfolio/waistline-strategy.html?lang=ru');p.click('https://lanven-open-dialogue.denis-lanven.chatgpt.site/?lang=ru');assert.deepEqual(p.calls.map(x=>x.event),['page_view','case_open','booking_click']);assert.equal(p.calls[1].label,'waistline-strategy');});
test('analytics: owner and embedded technical views make no requests',()=>{assert.equal(run(undefined,'?analytics=off').calls.length,0);assert.equal(run(undefined,'','denislanven.github.io',true).calls.length,0);});
test('analytics: verification traffic is separated and current booking origin is recognized',()=>{const a=run(undefined,'?analytics=test');assert.equal(a.calls[0].source,'verification');const b=run('/','','lanven-open-dialogue.denis-lanven.chatgpt.site');assert.equal(b.calls[0].site,'booking');assert.equal(b.calls[0].page,'/');});
