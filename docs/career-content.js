(()=>{'use strict';
 const order=[0,1,2,3,4,5,6,7];
 function sync(){const lang=document.documentElement.lang in CareerCopy?document.documentElement.lang:'ru',d=CareerCopy[lang];
 order.forEach((j,i)=>{const card=document.getElementById('job'+i);if(!card)return;const job=d.jobs[j],heading=card.querySelector('h3'),role=heading?.nextElementSibling,meta=role?.nextElementSibling;
 if(role)role.textContent=job[1].replace(/&amp;/g,'&');if(meta)meta.textContent=job[2].split(' · ').slice(1).join(' · ');if(j===1){let a=card.querySelector('.career-strategy');if(!a){a=document.createElement('a');a.className='career-strategy';card.append(a)}a.textContent=d.strategyLink;a.href='waistline-strategy.html?lang='+lang;}const list=card.querySelector('ul');if(list){list.replaceChildren(...job[3].map(text=>{const li=document.createElement('li');li.textContent=text;return li}));}
 });
 const pdf=document.querySelector('a[download]');if(pdf){pdf.href='downloads/Denis_Lanven_HR_Head_'+lang.toUpperCase()+'.pdf?v=results-r5';pdf.download='Denis_Lanven_HR_Head_'+lang.toUpperCase()+'.pdf';}
 }
 sync();new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
