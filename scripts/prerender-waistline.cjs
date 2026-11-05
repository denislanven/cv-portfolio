/* The editorial case is authored as complete static HTML. Validate it without overwriting it. */
const fs=require('node:fs'),path=require('node:path');
const file=path.resolve(__dirname,'../docs/waistline-strategy.html'),html=fs.readFileSync(file,'utf8');
for(const id of ['context','strategy','implementation','onboarding','development','culture','team','results','methodology'])if(!html.includes('id="'+id+'"'))throw Error('Incomplete static Waistline case: '+id);
if(/<script[^>]+src="waistline-strategy\.js/.test(html))throw Error('Legacy renderer must not overwrite the editorial case');
console.log('Waistline static case is complete; no prerender rewrite required.');
