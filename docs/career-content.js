(()=>{'use strict';
 const order=[0,1,2,3,4,5,6,7];
 function sync(){const lang=document.documentElement.lang in CareerCopy?document.documentElement.lang:'ru',d=CareerCopy[lang];
 order.forEach((j,i)=>{const card=document.getElementById('job'+i);if(!card)return;const job=d.jobs[j],heading=card.querySelector('h3'),role=heading?.nextElementSibling,meta=role?.nextElementSibling;
 if(role)role.textContent=job[1].replace(/&amp;/g,'&');if(meta)meta.textContent=job[2].split(' · ').slice(1).join(' · ');if(j===1){
 const labels=({ru:['HR-стратегия Waistline','Проекты и ивенты'],en:['Waistline HR strategy','Projects & events'],pl:['Strategia HR Waistline','Projekty i wydarzenia'],es:['Estrategia de RR. HH. Waistline','Proyectos y eventos'],uk:['HR-стратегія Waistline','Проєкти та події']})[lang];
 let group=card.querySelector('.career-links');if(!group){group=document.createElement('div');group.className='career-links';card.append(group)}
 let a=card.querySelector('.career-strategy');if(!a){a=document.createElement('a');a.className='career-strategy'}a.textContent=labels[0]+' ↗';a.href='waistline-strategy.html?lang='+lang;group.append(a);
 const events=card.querySelector('a.more');if(events){events.textContent=labels[1]+' ↗';group.append(events)}
 }const list=card.querySelector('ul');if(list){list.replaceChildren(...job[3].map(text=>{const li=document.createElement('li');li.textContent=text;return li}));}
 });
 const pdf=document.querySelector('a[download]');if(pdf){pdf.href='downloads/Denis_Lanven_HR_Head_'+lang.toUpperCase()+'.pdf?v=results-r5';pdf.download='Denis_Lanven_HR_Head_'+lang.toUpperCase()+'.pdf';}
 }
 sync();new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
