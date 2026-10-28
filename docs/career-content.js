(()=>{'use strict';
 const order=[0,1,2,3,4,5,6,7];
 function sync(){const lang=document.documentElement.lang in CareerCopy?document.documentElement.lang:'ru',d=CareerCopy[lang];
 order.forEach((j,i)=>{const card=document.getElementById('job'+i);if(!card)return;const job=d.jobs[j],heading=card.querySelector('h3'),role=heading?.nextElementSibling,meta=role?.nextElementSibling;
 if(role)role.textContent=job[1].replace(/&amp;/g,'&');if(meta)meta.textContent=job[2].split(' · ').slice(1).join(' · ');const list=card.querySelector('ul');if(list){list.replaceChildren(...job[3].map(text=>{const li=document.createElement('li');li.textContent=text;return li}));}
 });
 // Keep the prominent case aligned with the full approved Iron Invest account.
 const intro={ru:'Построил HR-функцию с нуля для двух компаний и двух юридических лиц в Польше и Украине за шестимесячный контракт.',en:'Built the HR function from scratch for two companies and legal entities in Poland and Ukraine during a six-month contract.',pl:'Zbudowałem od podstaw funkcję HR dla dwóch firm i podmiotów prawnych w Polsce i Ukrainie w ramach sześciomiesięcznego kontraktu.',es:'Construí desde cero la función de RR. HH. para dos empresas y entidades jurídicas en Polonia y Ucrania durante un contrato de seis meses.',uk:'Побудував HR-функцію з нуля для двох компаній і юридичних осіб у Польщі та Україні за шестимісячний контракт.'};
 const first=document.querySelector('.exec-case');if(first){const paragraphs=first.querySelectorAll(':scope > p');if(paragraphs[1])paragraphs[1].textContent=intro[lang];}
 const pdf=document.querySelector('a[download]');if(pdf){pdf.href='downloads/Denis_Lanven_HR_Head_'+lang.toUpperCase()+'.pdf?v=expanded-r4';pdf.download='Denis_Lanven_HR_Head_'+lang.toUpperCase()+'.pdf';}
 }
 sync();new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
})();
