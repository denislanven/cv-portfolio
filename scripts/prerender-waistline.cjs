/* Keep the default case fully readable before JavaScript and without a network waterfall. */
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base=path.resolve(__dirname,'../docs');
const root={dataset:{},innerHTML:''},dummy={};
const document={documentElement:{},getElementById:id=>id==='main'?root:null,querySelector:()=>dummy,querySelectorAll:()=>[]};
const c={document,location:{search:'',href:'https://denislanven.github.io/cv-portfolio/waistline-strategy.html'},URL,URLSearchParams,localStorage:{getItem:()=>null},console};vm.createContext(c);
for(const file of ['waistline-strategy-copy.js','waistline-strategy.js'])vm.runInContext(fs.readFileSync(path.join(base,file),'utf8'),c);
if(!root.innerHTML.includes('id="evidence"'))throw Error('Incomplete prerender');
const file=path.join(base,'waistline-strategy.html');let html=fs.readFileSync(file,'utf8');html=html.replace(/<main id="main"[^>]*>[\s\S]*?<\/main>/,'<main id="main" data-rendered-lang="ru">'+root.innerHTML+'</main>');fs.writeFileSync(file,html);
console.log('Waistline default case prerendered.');
