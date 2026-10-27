(()=>{
'use strict';

const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const LG=['en','ru','pl','es','uk'],LB={en:'EN',ru:'RU',pl:'PL',es:'ES',uk:'UA'},D={};
[['live','Live','В сети','Online','En vivo','Онлайн'],
['t1','Zero-UI bot','Zero-UI бот','Bot Zero-UI','Bot Zero-UI','Zero-UI бот'],
['t2','Risk radar','Радар рисков','Radar ryzyka','Radar de riesgos','Радар ризиків'],
['t3','Architecture','Архитектура','Architektura','Arquitectura','Архітектура'],
['sc1','Vacation','Отпуск','Urlop','Vacaciones','Відпустка'],
['sc2','Weekly pulse','Пульс недели','Puls tygodnia','Pulso semanal','Пульс тижня'],
['sc3','1:1 with HRBP','1:1 с HRBP','1:1 z HRBP','1:1 con HRBP','1:1 з HRBP'],
['you','You','Вы','Ty','Tú','Ви'],
['dow','Mon,Tue,Wed,Thu,Fri','Пн,Вт,Ср,Чт,Пт','Pn,Wt,Śr,Cz,Pt','Lun,Mar,Mié,Jue,Vie','Пн,Вт,Ср,Чт,Пт'],
['u1','I need a vacation next week','Хочу в отпуск на следующей неделе','Chcę wziąć urlop w przyszłym tygodniu','Quiero vacaciones la semana que viene','Хочу у відпустку наступного тижня'],
['b1a','Checking your team calendar…','Проверяю календарь команды…','Sprawdzam kalendarz zespołu…','Revisando el calendario del equipo…','Перевіряю календар команди…'],
['b1b','One overlap: Anna is out Wed–Thu. Coverage is fine. Confirm?','Одно пересечение: Анна в отпуске в ср–чт. Покрытие в норме. Подтвердить?','Jedno nakładanie: Anna nieobecna śr–cz. Zastępstwo zapewnione. Potwierdzić?','Un solapamiento: Anna está fuera mié–jue. La cobertura es suficiente. ¿Confirmo?','Один збіг: Анна у відпустці ср–чт. Покриття достатнє. Підтвердити?'],
['cf','Confirm vacation','Подтвердить отпуск','Potwierdź urlop','Confirmar vacaciones','Підтвердити відпустку'],
['b1c','Done! Vacation approved and added to the team calendar ✓','Готово! Отпуск согласован и добавлен в календарь команды ✓','Gotowe! Urlop zatwierdzony i dodany do kalendarza zespołu ✓','¡Listo! Vacaciones aprobadas y añadidas al calendario del equipo ✓','Готово! Відпустку погоджено й додано до календаря команди ✓'],
['b2a','Weekly pulse, 20 seconds. How are you doing?','Пульс недели, 20 секунд. Как ты?','Puls tygodnia, 20 sekund. Jak się masz?','Pulso semanal, 20 segundos. ¿Cómo vas?','Пульс тижня, 20 секунд. Як ти?'],
['en','Energy','Энергия','Energia','Energía','Енергія'],
['op','OKR progress','Прогресс по OKR','Postęp OKR','Progreso de OKR','Прогрес за OKR'],
['mood','Mood this week','Настроение недели','Nastrój tygodnia','Ánimo de la semana','Настрій тижня'],
['send','Send','Отправить','Wyślij','Enviar','Надіслати'],
['b2ok','+20 XP! Streak: {s} weeks 🔥','+20 XP! Серия: {s} нед. 🔥','+20 XP! Seria: {s} tyg. 🔥','+20 XP. Racha: {s} semanas 🔥','+20 XP! Серія: {s} тиж. 🔥'],
['b2l','Your energy is low. I quietly flagged it to your manager: they get a meeting agenda, never your answers.','Энергия низкая. Я тихо сообщил руководителю: он получит только повестку встречи, но не твои ответы.','Twoja energia jest niska. Dyskretnie powiadomiłem managera: dostaje tylko agendę spotkania, nie Twoje odpowiedzi.','Tu energía está baja. Avisé de forma confidencial a tu manager: recibe solo una agenda, nunca tus respuestas.','Енергія низька. Я непомітно повідомив керівника: він отримає лише порядок денний зустрічі, а не твої відповіді.'],
['coi','Listening for risk signals. Set energy below 40 in the weekly pulse to see it fire.','Слушаю сигналы риска. Опусти энергию ниже 40 в пульсе недели, чтобы увидеть срабатывание.','Nasłuchuję sygnałów ryzyka. Zjedź z energią poniżej 40 w pulsie tygodnia, aby zobaczyć alert.','Atento a señales de riesgo. Baja la energía por debajo de 40 en el pulso semanal para verlo disparar.','Слухаю сигнали ризику. Опусти енергію нижче 40 у пульсі тижня, щоб побачити спрацювання.'],
['cof','Confidential webhook sent to the manager','Конфиденциальный вебхук отправлен руководителю','Poufny webhook wysłany do managera','Webhook confidencial enviado al manager','Конфіденційний вебхук надіслано керівнику'],
['ag','Suggested 1:1 agenda','Повестка 1:1 (черновик)','Proponowana agenda 1:1','Agenda 1:1 sugerida','Порядок денний 1:1 (чернетка)'],
['agl','Workload and priorities|What would ease the pressure this week|Rest and recovery plan','Нагрузка и приоритеты|Что снизит давление на этой неделе|План отдыха и восстановления','Obciążenie i priorytety|Co zmniejszy presję w tym tygodniu|Plan odpoczynku i regeneracji','Carga y prioridades|Qué aliviaría la presión esta semana|Plan de descanso y recuperación','Навантаження й пріоритети|Що знизить тиск цього тижня|План відпочинку та відновлення'],
['b3a','Pick a 1:1 slot with your HRBP.','Выбери слот для 1:1 с HRBP.','Wybierz termin 1:1 z HRBP.','Elige un horario para tu 1:1 con HRBP.','Обери слот для 1:1 з HRBP.'],
['pick','Choose a slot','Выбрать слот','Wybierz termin','Elegir horario','Обрати слот'],
['b3b','Booked: {s}. Invite sent ✓','Записал: {s}. Приглашение отправлено ✓','Zapisane: {s}. Zaproszenie wysłane ✓','Reservado: {s}. Invitación enviada ✓','Записав: {s}. Запрошення надіслано ✓'],
['hint','Move the sliders: departments over a threshold light up and a trigger fires.','Двигай ползунки: отделы выше порога подсвечиваются, и срабатывает триггер.','Przesuwaj suwaki: działy powyżej progu zapalają się i uruchamiają alert.','Mueve los controles: los departamentos que superan el umbral se iluminan y se dispara un aviso.','Рухай повзунки: відділи вище порога підсвічуються, і спрацьовує тригер.'],
['lt','OKR lag threshold','Порог отставания по OKR','Próg opóźnienia OKR','Umbral de retraso en OKR','Поріг відставання за OKR'],
['bt','Burnout threshold','Порог выгорания','Próg wypalenia','Umbral de agotamiento','Поріг вигорання'],
['bo','Burnout','Выгорание','Wypalenie','Agotamiento','Вигорання'],
['s_ok','Healthy','В норме','W normie','Estable','У нормі'],
['s_warn','Watch','Внимание','Uwaga','Atención','Увага'],
['s_bad','At risk','Риск','Ryzyko','En riesgo','Ризик'],
['tg','⚡ Trigger sent to the {d} lead via Slack/Telegram','⚡ Триггер отправлен руководителю {d} в Slack/Telegram','⚡ Alert wysłany do lidera {d} przez Slack/Telegram','⚡ Aviso enviado al responsable de {d} por Slack/Telegram','⚡ Тригер надіслано керівнику {d} у Slack/Telegram'],
['demo','Illustrative demo data','Демонстрационные данные','Dane demonstracyjne','Datos de demostración','Демонстраційні дані'],
['c1','Turnover, %','Текучесть, %','Rotacja, %','Rotación, %','Плинність, %'],
['c2','Team time saved, h/week','Экономия времени команды, ч/нед','Zaoszczędzony czas zespołu, h/tydz.','Tiempo ahorrado del equipo, h/sem','Економія часу команди, год/тиж'],
['dh','Employees, org chart, leave balances','Сотрудники, оргструктура, остатки отпусков','Pracownicy, struktura, saldo urlopów','Empleados, organigrama, saldos de vacaciones','Працівники, оргструктура, залишки відпусток'],
['dc','Risk model, rules engine, event bus','Модель рисков, правила, шина событий','Model ryzyka, reguły, magistrala zdarzeń','Modelo de riesgo, reglas, bus de eventos','Модель ризиків, правила, шина подій'],
['dt','Zero-UI for employees','Zero-UI для сотрудников','Zero-UI dla pracowników','Zero-UI para empleados','Zero-UI для працівників'],
['ds','Alerts for managers','Алерты для руководителей','Alerty dla managerów','Alertas para managers','Алерти для керівників'],
['in','Incoming','Входящий','Przychodzący','Entrante','Вхідний'],
['out','Outgoing trigger','Исходящий триггер','Wychodzący alert','Aviso saliente','Вихідний тригер'],
['cp','Copy payload','Копировать payload','Kopiuj payload','Copiar payload','Копіювати payload'],
['cd','Copied ✓','Скопировано ✓','Skopiowano ✓','Copiado ✓','Скопійовано ✓'],
['tw','Test webhook','Тест вебхука','Testuj webhook','Probar webhook','Тест вебхука'],
['sn','Sending…','Отправка…','Wysyłanie…','Enviando…','Надсилання…'],
['typ','is typing…','печатает…','pisze…','está escribiendo…','друкує…'],
['fd','Dates','Даты','Daty','Fechas','Дати'],
['fo','Overlap','Пересечение','Nakładanie','Solapamiento','Збіг'],
['fc','Coverage','Покрытие','Zastępstwo','Cobertura','Покриття']
].forEach(r=>D[r[0]]=r.slice(1));
const R=$('#pl');let lang='en',tab=0,sc=0,plat='tg',LT=40,BT=70,pi=0,xp=1240,st=6,prevBad=new Set(),run=0;
const t=k=>D[k][LG.indexOf(lang)];
const rg=(k,lb,v,mn=0,mx=100,u='')=>`<label class="pl-lb"><span>${lb}</span><b>${v}${u}</b></label><input class="pl-rg" type="range" data-k="${k}" data-u="${u}" min="${mn}" max="${mx}" value="${v}" aria-label="${lb}" style="--v:${(v-mn)/(mx-mn)*100}%">`;
function setLang(l){if(!LG.includes(l))return;lang=l;document.documentElement.lang=l;try{localStorage.setItem('lang',l)}catch(e){}render()}
function render(){
 run++;R.innerHTML=`<div class="pl-top"><div class="pl-brand"><span class="pl-logo">◉</span><div>PulseLink<small>Autonomous People Ops &amp; OKR Intelligence</small></div></div><div class="pl-right"><span class="pl-live"><span class="pl-dot"></span>${t('live')}</span><div class="pl-lang" role="group" aria-label="Language">${LG.map(l=>`<button data-l="${l}" aria-pressed="${l==lang}">${LB[l]}</button>`).join('')}</div></div></div>
 <div class="pl-tabs" role="tablist">${['t1','t2','t3'].map((k,i)=>`<button role="tab" data-tab="${i}" aria-selected="${i==tab}">${t(k)}</button>`).join('')}</div><div class="pl-panel" id="pn"></div><div class="pl-toasts" id="ts" aria-live="polite"></div>`;
 [t1,t2,t3][tab]();
}
/* ---------- Tab 1: Zero-UI simulator ---------- */
const xpUpd=b=>{const x=$('#xp');if(!x)return;x.textContent=`⭐ ${xp} XP · 🔥 ${st}`;if(b){x.classList.remove('bump');void x.offsetWidth;x.classList.add('bump')}};
const ICO={tg:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="#2AABEE"/><path d="M5.5 11.8l12-4.7-2 10-3.4-2.5-1.7 1.6-.3-3.5z" fill="#fff"/></svg>',sl:'<svg viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="6" fill="#4a154b"/><path d="M9.5 6.5l-1 11M15.5 6.5l-1 11M6.5 9.8h11M6.5 14.2h11" stroke="#ecb22e" stroke-width="1.8" stroke-linecap="round"/></svg>'};
function t1(){
 const S=plat=='sl';
 $('#pn').innerHTML=`<div class="pl-grid2"><div><div class="pl-plat" role="group" aria-label="Platform">${[['tg','Telegram','#2AABEE'],['sl','Slack','#ecb22e']].map(p=>`<button data-pf="${p[0]}" aria-pressed="${plat==p[0]}" style="--pc:${p[2]}">${ICO[p[0]]}${p[1]}</button>`).join('')}</div>
 <div class="pl-chat${S?' sl':''}"><div class="pl-chh">${S?'<span class="sl-av">P</span><div><b>PulseLink <span class="sl-app">APP</span></b><small><span class="pl-dot"></span>Slack</small></div>':'<span class="pl-av">P</span><div><b>PulseLink</b><small><span class="pl-dot"></span>Telegram</small></div>'}<span class="pl-xp" id="xp"></span></div>
 <div class="pl-sc">${['sc1','sc2','sc3'].map((k,i)=>`<button data-sc="${i}" aria-pressed="${i==sc}">${t(k)}</button>`).join('')}</div><div class="pl-log" id="lg" aria-live="polite"></div></div></div><aside class="pl-co" id="co"></aside></div>`;
 xpUpd();play();
}
function coIdle(){const c=$('#co');c.className='pl-co';c.innerHTML=`<h3>Manager Co-Pilot</h3><p><span class="pl-dot"></span>${t('coi')}</p>`}
function coFire(e){const c=$('#co');c.className='pl-co fired';c.innerHTML=`<h3>Manager Co-Pilot</h3><p><span class="pl-dot bad"></span>${t('cof')}</p><code class="pl-hook">POST /api/v1/triggers/burnout-risk → 202 · energy ${e}<br>↳ ${plat=='sl'?'slack chat.postMessage':'telegram sendMessage'} → ok:true</code><h4>${t('ag')}</h4><ol>${t('agl').split('|').map((x,i)=>`<li style="--i:${i}">${x}</li>`).join('')}</ol>`}
async function play(){
 const id=++run,lg=$('#lg'),w=ms=>new Promise(r=>setTimeout(r,ms)),ok=()=>id===run&&lg.isConnected,dw=t('dow').split(',');
 const S=plat=='sl',tm=()=>new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});
 const add=(h,c='')=>{const m=document.createElement('div');
  if(S&&c=='ty'){m.className='sl-ty';m.innerHTML=`<b>PulseLink</b> ${t('typ')} <i></i><i></i><i></i>`}
  else if(S){const u=c=='u';m.className='sl-m';m.innerHTML=`<span class="sl-av${u?' u':''}">${u?t('you')[0]:'P'}</span><div class="sl-b"><div class="sl-h"><b>${u?t('you'):'PulseLink'}</b>${u?'':'<span class="sl-app">APP</span>'}<time>${tm()}</time></div>${h}</div>`}
  else{m.className='pl-m '+c;m.innerHTML=h}
  lg.append(m);lg.scrollTop=lg.scrollHeight;return m};
 const B=async(h,ms=900)=>{const ty=add('<i></i><i></i><i></i>','ty');await w(ms);if(!ok())throw 0;ty.remove();return add(h)};
 const safe=f=>async(...a)=>{try{await f(...a)}catch(e){}};
 coIdle();
 try{
  if(sc==0){
   add(t('u1'),'u');await B(t('b1a'),800);await w(500);
   const row=(l,f)=>`<span>${l}</span>`+dw.map((_,i)=>`<i class="c ${f(i)}" style="--i:${i}"></i>`).join('');
   const tl=`<div class="pl-tl"><span></span>${dw.map(d=>`<b>${d}</b>`).join('')}${row(t('you'),()=>'me')}${row('Anna',i=>i==2||i==3?'ov':'')}</div>`;
   const m=await B(S?`<div class="sl-card"><b>🏖 ${t('sc1')}</b><div class="sl-f"><div><b>${t('fd')}</b>${dw[0]}–${dw[4]}</div><div><b>${t('fo')}</b>Anna · ${dw[2]}–${dw[3]}</div><div><b>${t('fc')}</b>OK ✅</div></div>${tl}<p>${t('b1b')}</p><div class="sl-act"><button class="sl-btn p" id="cf">${t('cf')}</button></div></div>`:`${tl}<p>${t('b1b')}</p><button class="pl-btn" id="cf">${t('cf')}</button>`,1300);
   $('#cf',m).onclick=safe(async e=>{e.target.disabled=true;add('✓ '+t('cf'),'u');await B(t('b1c'),900)});
  }else if(sc==1){
   await B(t('b2a'),800);
   const op=(a,x,f)=>a.map(v=>`<option value="${v}"${v==x?' selected':''}>${f(v)}</option>`).join(''),em=['😫','😕','😐','🙂','🤩'];
   const m=await B(S?`<div class="sl-card"><b>📊 ${t('sc2')}</b><label class="sl-l">${t('en')}</label><select class="sl-sel" id="se">${op([90,70,50,30,10],70,v=>'🔋 '+v)}</select><label class="sl-l">${t('op')}</label><select class="sl-sel" id="so">${op([25,50,75,100],50,v=>'🎯 '+v+'%')}</select><label class="sl-l">${t('mood')}</label><div class="sl-act">${em.map((e,i)=>`<button class="sl-btn" data-m="${i}" aria-label="${i+1}/5">${e}</button>`).join('')}</div><div class="sl-act"><button class="sl-btn p" id="sd">${t('send')}</button></div></div>`:`${rg('e',t('en'),70)}${rg('o',t('op'),55,0,100,'%')}<div class="pl-lb"><span>${t('mood')}</span></div><div class="pl-em">${['😫','😕','😐','🙂','🤩'].map((e,i)=>`<button data-m="${i}" aria-label="${i+1}/5">${e}</button>`).join('')}</div><button class="pl-btn" id="sd">${t('send')}</button>`,900);
   $('#sd',m).onclick=safe(async e=>{const [en,o]=S?[+$('#se',m).value,+$('#so',m).value]:$$('.pl-rg',m).map(x=>+x.value),md=$('[data-m].on',m);e.target.disabled=true;
    add(`⚡ ${en} · 🎯 ${o}% · ${md?md.textContent:'—'}`,'u');xp+=20;st++;xpUpd(true);
    await B(t('b2ok').replace('{s}',st),800);
    if(en<40){await B(t('b2l'),1000);coFire(en)}});
  }else{
   await B(t('b3a'),800);
   const sl=['10:00','14:00','16:30'].map(h=>[1,2,3].map(d=>`<button class="pl-slot" data-s="${dw[d]} ${12+d} · ${h}">${dw[d]} ${12+d}<br>${h}</button>`).join('')).join('');
   if(S){const all=['10:00','14:00','16:30'].flatMap(h=>[1,2,3].map(d=>`${dw[d]} ${12+d} · ${h}`));
    const m=await B(`<div class="sl-card"><b>📅 ${t('sc3')}</b><label class="sl-l">${t('pick')}</label><select class="sl-sel" id="ss"><option value="" disabled selected>${t('pick')}…</option>${all.map(x=>`<option>${x}</option>`).join('')}</select></div>`,900);
    $('#ss',m).onchange=safe(async e=>{const v=e.target.value;e.target.disabled=true;add('📅 '+v,'u');await B(t('b3b').replace('{s}',v),900)});return}
   const m=await B(`<button class="pl-btn g" id="pk" aria-expanded="false">${t('pick')} ▾</button><div class="pl-pop">${sl}</div>`,900);
   $('#pk',m).onclick=e=>{const o=$('.pl-pop',m).classList.toggle('open');e.currentTarget.setAttribute('aria-expanded',o);setTimeout(()=>lg.scrollTop=lg.scrollHeight,420)};
   $$('.pl-slot',m).forEach(s=>s.onclick=safe(async()=>{$('.pl-pop',m).classList.remove('open');$$('.pl-slot',m).forEach(x=>x.disabled=true);add('📅 '+s.dataset.s,'u');await B(t('b3b').replace('{s}',s.dataset.s),900)}));
  }
 }catch(e){}
}
/* ---------- Tab 2: Risk radar ---------- */
const DP=[['Marketing',72,38],['IT',64,61],['Finance',88,27],['Product',58,72],['Sales',66,55],['Support',80,66]];
const lv=(x,T)=>x>=T?'bad':x>=T-10?'warn':'';
const stat=d=>{const a=lv(100-d[1],LT),b=lv(d[2],BT);return a=='bad'||b=='bad'?'bad':a||b||'ok'};
const bar=(l,v,w,c)=>`<div class="pl-bl"><span>${l}</span><b>${v}</b></div><div class="pl-bar ${c}"><i style="--w:0%" data-w="${w}%"></i></div>`;
function t2(){
 $('#pn').innerHTML=`<p class="mut">${t('hint')}</p><div class="pl-sim"><div>${rg('lt',t('lt'),LT,10,60,'%')}</div><div>${rg('bt',t('bt'),BT,40,95)}</div></div><div class="pl-hm">${DP.map(d=>{const s=stat(d);return `<div class="pl-d ${s}"><div class="pl-dh"><b>${d[0]}</b><span class="pl-st"><span class="pl-dot ${s=='ok'?'':s}"></span>${t('s_'+s)}</span></div>${bar('OKR',d[1]+'%',d[1],lv(100-d[1],LT))}${bar(t('bo'),d[2],d[2],lv(d[2],BT))}</div>`}).join('')}</div><p class="mut sm">${t('demo')}</p><div class="pl-ch2">${ch(t('c1'),[18,17,15,14,12,11],'%',0)}${ch(t('c2'),[4,9,15,22,28,34],'h',1)}</div>`;
 prevBad=new Set(DP.filter(d=>stat(d)=='bad').map(d=>d[0]));
 requestAnimationFrame(()=>requestAnimationFrame(()=>$$('.pl-bar i').forEach(i=>i.style.setProperty('--w',i.dataset.w))));
}
function upd(){const nb=new Set();$$('.pl-d').forEach((c,i)=>{const d=DP[i],s=stat(d);c.className='pl-d '+s;$('.pl-st',c).innerHTML=`<span class="pl-dot ${s=='ok'?'':s}"></span>${t('s_'+s)}`;const b=$$('.pl-bar',c);b[0].className='pl-bar '+lv(100-d[1],LT);b[1].className='pl-bar '+lv(d[2],BT);if(s=='bad'){nb.add(d[0]);if(!prevBad.has(d[0]))toast(t('tg').replace('{d}',d[0]))}});prevBad=nb}
function toast(m){const e=document.createElement('div');e.className='pl-toast';e.textContent=m;$('#ts').append(e);setTimeout(()=>{e.classList.add('out');setTimeout(()=>e.remove(),400)},3600)}
function ch(title,v,u,k){const W=300,H=110,mx=Math.max(...v)*1.1,P=v.map((y,i)=>[10+i*(W-20)/(v.length-1),H-8-y/mx*(H-24)]),p=P.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join('');
 return `<div class="pl-cc"><div class="pl-bl" style="margin:0"><span>${title}</span><b>${v[0]}${u} → ${v[v.length-1]}${u}</b></div><svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${title}"><defs><linearGradient id="g${k}" x1="0" x2="1"><stop offset="0" stop-color="#6f8dff"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs><path d="${p}L${W-10} ${H-8}L10 ${H-8}Z" fill="url(#g${k})" opacity=".13"/><path class="ln" pathLength="1" d="${p}" stroke="url(#g${k})"/>${P.map(q=>`<circle cx="${q[0]}" cy="${q[1]}" r="3.5"/>`).join('')}</svg></div>`}
/* ---------- Tab 3: Architecture ---------- */
const PH=['POST https://api.pulselink.app/hooks/telegram','POST https://api.pulselink.app/hooks/slack','POST /api/v1/triggers/burnout-risk'];
const PJ=[{update_id:718204113,callback_query:{from:{id:5120934,language_code:'uk'},data:'pulse:energy=35;okr=60;mood=2',message:{chat:{id:5120934}}}},
{type:'block_actions',team:{id:'T01HR'},user:{id:'U02PL7K'},actions:[{action_id:'pulse_submit',value:'energy=35;okr=60;mood=2'}]},
{team:'product',risk:{burnout_index:72,okr_lag_pct:42,confidence:0.87},notify:{channel:'slack',to:'head_of_product'},copilot:{agenda:['Workload and priorities','Recovery plan'],share_raw_answers:false},idempotency_key:'3f9c1a7e'}];
const hl=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/("(?:[^"\\]|\\.)*")(\s*:)?|\b\d+(?:\.\d+)?\b/g,(m,a,b)=>a?`<span class="${b?'k':'s'}">${a}</span>${b||''}`:`<span class="n">${m}</span>`);
const js=()=>JSON.stringify(PJ[pi],null,2);
function t3(){
 const n=(i,nm,d)=>`<button class="pl-n ${pi==i?'on':''}" data-pl="${i}"><b>${nm}</b><span>${d}</span></button>`;
 $('#pn').innerHTML=`<div class="pl-arch">${n(2,'HRIS',t('dh')).replace('pl-n ','pl-n ').replace(/ on"/,'"')}<span class="pl-link"><em>⇄</em></span>${n(2,'PulseLink Core',t('dc'))}<span class="pl-link"><em>⇄</em></span><div class="pl-stk">${n(0,'Telegram Bot API',t('dt'))}${n(1,'Slack Bolt SDK',t('ds'))}</div></div>
 <div class="pl-pt">${[`${t('in')}: Telegram`,`${t('in')}: Slack`,t('out')].map((l,i)=>`<button data-pl="${i}" aria-pressed="${i==pi}">${l}</button>`).join('')}</div>
 <pre class="pl-code" id="cd">${PH[pi]}\n${hl(js())}</pre><div class="pl-act"><button class="pl-btn" id="cp">${t('cp')}</button><button class="pl-btn g" id="tw">${t('tw')}</button></div><pre class="pl-code resp" id="rs" hidden></pre>`;
}
async function copy(b){const x=js();try{await navigator.clipboard.writeText(x)}catch(e){const a=document.createElement('textarea');a.value=x;document.body.append(a);a.select();try{document.execCommand('copy')}catch(_){}a.remove()}
 b.textContent=t('cd');b.classList.remove('done');void b.offsetWidth;b.classList.add('done');setTimeout(()=>{b.textContent=t('cp');b.classList.remove('done')},1800)}
function test(b){const r=$('#rs');b.disabled=true;b.textContent=t('sn');r.hidden=true;
 setTimeout(()=>{const ms=90+Math.round(Math.random()*90);r.hidden=false;r.style.animation='none';void r.offsetWidth;r.style.animation='';
  r.innerHTML=`<span class="s">HTTP 202 Accepted</span> · ${ms} ms\n${hl(JSON.stringify({status:'queued',trigger_id:'trg_8f31c2',delivered_to:pi==2?'slack:head_of_product':'pulselink-core'},null,2))}`;b.disabled=false;b.textContent=t('tw')},900)}
/* ---------- Events ---------- */
R.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;const d=b.dataset;
 if(d.l)setLang(d.l);else if(d.pf){plat=d.pf;t1()}else if(d.tab!=null){tab=+d.tab;render()}
 else if(d.sc!=null){sc=+d.sc;$$('.pl-sc button').forEach(x=>x.setAttribute('aria-pressed',x==b));play()}
 else if(d.m!=null)$$('button',b.parentElement).forEach(x=>x.classList.toggle('on',x==b));
 else if(d.pl!=null){pi=+d.pl;t3()}
 else if(b.id=='cp')copy(b);else if(b.id=='tw')test(b)});
R.addEventListener('input',e=>{const r=e.target;if(!r.classList.contains('pl-rg'))return;const mn=+r.min,mx=+r.max;
 r.style.setProperty('--v',(r.value-mn)/(mx-mn)*100+'%');r.previousElementSibling.querySelector('b').textContent=r.value+(r.dataset.u||'');
 if(r.dataset.k=='lt'){LT=+r.value;upd()}if(r.dataset.k=='bt'){BT=+r.value;upd()}});
addEventListener('message',e=>{if(e.data&&e.data.type==='lang')setLang(e.data.l)});
if(new URLSearchParams(location.search).get('embed'))document.documentElement.classList.add('emb');
(()=>{let l='en';try{const q=new URLSearchParams(location.search).get('lang'),sv=localStorage.getItem('lang'),n=(navigator.language||'en').slice(0,2);l=q||sv||n}catch(e){}
 lang=LG.includes(l)?l:'en';document.documentElement.lang=lang;render()})();

})();
