
// ===== CORE ENGINE (same as v1) =====
// Easter algorithms (Anonymous Gregorian + Julian-to-Gregorian for Orthodox)
function calcWesternEaster(Y){const a=Y%19,b=Math.floor(Y/100),c=Y%100,d=Math.floor(b/4),e=b%4,f=Math.floor((b+8)/25),g=Math.floor((b-f+1)/3),h=(19*a+b-d-g+15)%30,i=Math.floor(c/4),k=c%4,l=(32+2*e+2*i-h-k)%7,m=Math.floor((a+11*h+22*l)/451),mo=Math.floor((h+l-7*m+114)/31),dy=((h+l-7*m+114)%31)+1;return[mo,dy];}
function calcOrthodoxEaster(Y){const a=Y%4,b=Y%7,c=Y%19,d=(19*c+15)%30,e=(2*a+4*b-d+34)%7,mo=Math.floor((d+e+114)/31),dy=((d+e+114)%31)+1;const j=new Date(Y,mo-1,dy);j.setDate(j.getDate()+13);return[j.getMonth()+1,j.getDate()];}
const YEARS=[];for(let y=2024;y<=2035;y++)YEARS.push(y);
function getWE(Y){return calcWesternEaster(Y);}
function getOE(Y){return calcOrthodoxEaster(Y);}
const p2=n=>String(n).padStart(2,'0'),dd=(m,d)=>p2(m)+'-'+p2(d);
const off=(Y,b,n)=>{const t=new Date(Y,b[0]-1,b[1]);t.setDate(t.getDate()+n);return dd(t.getMonth()+1,t.getDate());};
const fM=(Y,m)=>{let t=new Date(Y,m-1,1);while(t.getDay()!==1)t.setDate(t.getDate()+1);return dd(m,t.getDate());};
const lM=(Y,m)=>{let t=new Date(Y,m,0);while(t.getDay()!==1)t.setDate(t.getDate()-1);return dd(m,t.getDate());};
const mS=Y=>{let t=new Date(Y,5,20);while(t.getDay()!==6)t.setDate(t.getDate()+1);return dd(t.getMonth()+1,t.getDate());};
const aS=Y=>{let t=new Date(Y,9,31);while(t.getDay()!==6)t.setDate(t.getDate()+1);return dd(t.getMonth()+1,t.getDate());};
const dim=(y,m)=>new Date(y,m+1,0).getDate(),dw=(y,m,d)=>{const v=new Date(y,m,d).getDay();return v===0?6:v-1;},dk=(y,m,d)=>y+'-'+p2(m+1)+'-'+p2(d),isW=(y,m,d)=>dw(y,m,d)>=5;
const MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],DL=['Mo','Tu','We','Th','Fr','Sa','Su'];
const FME=['January','February','March','April','May','June','July','August','September','October','November','December'];
const DNE=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
const i18n={
en:{
  title:'European Holiday Calendar',sub:'Compare holidays across {n} European countries · Plan sprints · Maximize time off',
  add:'+ Add',search:'Search countries…',done:'Done',all:'All',from:'From',to:'To',year:'Year',country:'Country',back:'← Back',
  t_cal:'📅 Calendar',t_ins:'💡 Insights',t_av:'✅ Available',t_wd:'🧮 Working Days',t_bd:'🌉 Bridge Days',t_ta:'🔔 Team Alerts',t_cmp:'📊 Compare Years',
  btn_pdf:'📄 Export PDF',btn_ics:'📥 Download .ics',btn_heat:'🔥 ${t.heat_title}',btn_all:'🌍 All European Countries',
  hpc:'Holidays / Country',overlaps:'Overlaps',worst:'Worst Weeks',longwe:'Long Weekends',wk:'Wk',
  av_title:'Everyone Available',av_desc:'Full work weeks with zero holidays across selected countries.',av_found:'{n} clear weeks',av_none:'No clear weeks found.',
  wd_title:'Working Days Calculator',wd_desc:'${t.wd_desc}',
  wd_days:'working days',wd_cal:'calendar',wd_we:'weekends',wd_hol:'holidays',wd_prod:'productive',wd_per:'Per country breakdown',
  wd_combined:'Combined (any country\'s holiday = day off)',wd_shared:'shared working days',wd_info:'Days where ALL selected countries are working. {h} weekday holidays across team, {w} weekends.',
  bd_title:'Bridge Day Optimizer',bd_desc:'${t.bd_desc}',
  bd_opp:'opportunities',bd_free:'free!',bd_leave:'leave',bd_off:'off',bd_noleave:'No leave needed',bd_take:'Take leave:',bd_bridge:'Bridge leave:',
  bd_pub:'Public holiday',bd_lv:'Take leave',bd_weekend:'Weekend',
  ta_title:'${t.ta_title}',ta_desc:'${t.ta_desc}',
  cmp_title:'${t.cmp_title}',cmp_desc:'${t.cmp_desc}',
  cmp_total:'Total holidays',cmp_weekday:'Weekday holidays',cmp_longwe:'Long weekends (Mon/Fri)',cmp_mid:'Mid-week (Wed)',cmp_free:'Free 4+ day blocks',cmp_clear:'Clear work weeks',
  cmp_team:'${t.cmp_team}',cmp_anyoff:'${t.cmp_anyoff}',cmp_evweeks:'${t.cmp_evweeks}',
  heat_title:'Heat Distribution',heat_desc:'Non-working day density for {c}.',heat_all:'all {n} European countries',
  heat_weekly:'${t.heat_weekly}',heat_monthly:'Monthly Impact ({n} countries, weekdays)',
  heat_clear:t.heat_clear,heat_low:t.heat_low,heat_med:t.heat_med,heat_high:t.heat_high,
  heat_toggle_all:'🌍 Show for all {n} countries',heat_toggle_sel:'← Show selected countries only',
  ac_title:'${t.ac_title}',ac_desc:'${t.ac_desc}',
  ac_hol:'holidays',ac_in:'in',ac_pub:'Public holidays',ac_wd:'Working days',ac_bridge:'Bridge opportunities',ac_best:'Best Bridge Days',ac_list:'Holiday List',ac_calendar:'Calendar',ac_dl:'Download .ics',
  pdf_title:'European Holiday Calendar',
  mn:['January','February','March','April','May','June','July','August','September','October','November','December'],
  dn:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
},
fr:{
  title:'Calendrier des Jours Fériés Européens',sub:'Comparez les jours fériés de {n} pays européens · Planifiez · Optimisez',
  add:'+ Ajouter',search:'Rechercher…',done:'OK',all:'Tous',from:'De',to:'À',year:'Année',country:'Pays',back:'← Retour',
  t_cal:'📅 Calendrier',t_ins:'💡 Aperçus',t_av:'✅ Disponible',t_wd:'🧮 Jours Ouvrés',t_bd:'🌉 Jours Pont',t_ta:'🔔 Alertes Équipe',t_cmp:'📊 Comparaison',
  btn_pdf:'📄 Export PDF',btn_ics:'📥 Télécharger .ics',btn_heat:'🔥 Distribution',btn_all:'🌍 Tous les Pays',
  hpc:'Fériés / Pays',overlaps:'Chevauchements',worst:'Pires Semaines',longwe:'Week-ends Prolongés',wk:'Sem',
  av_title:'Tous Disponibles',av_desc:'Semaines complètes sans aucun jour férié.',av_found:'{n} semaines libres',av_none:'Aucune semaine libre.',
  wd_title:'Calculateur Jours Ouvrés',wd_desc:'Comptez les jours ouvrés entre deux dates. Détail par pays.',
  wd_days:'jours ouvrés',wd_cal:'calendrier',wd_we:'week-ends',wd_hol:'fériés',wd_prod:'productif',wd_per:'Détail par pays',
  wd_combined:'Combiné (férié d\'un pays = jour off)',wd_shared:'jours ouvrés partagés',wd_info:'Jours où TOUS les pays sélectionnés travaillent. {h} fériés en semaine, {w} week-ends.',
  bd_title:'Optimiseur Jours Pont',bd_desc:'Planification intelligente : voyez quels jours poser pour maximiser les congés consécutifs.',
  bd_opp:'opportunités',bd_free:'gratuit !',bd_leave:'congé',bd_off:'off',bd_noleave:'Sans congé',bd_take:'Poser :',bd_bridge:'Pont :',
  bd_pub:'Jour férié',bd_lv:'Poser congé',bd_weekend:'Week-end',
  ta_title:'Alertes Équipe',ta_desc:'Rapport mensuel des collisions. Rouge = 3+ pays en congé simultanément.',
  cmp_title:'Comparaison Annuelle',cmp_desc:'Comment les fériés évoluent entre les années pour chaque pays sélectionné.',
  cmp_total:'Total fériés',cmp_weekday:'Fériés en semaine',cmp_longwe:'Week-ends prolongés',cmp_mid:'Milieu de semaine',cmp_free:'Blocs 4+ jours gratuits',cmp_clear:'Semaines libres',
  cmp_team:'Vue équipe combinée',cmp_anyoff:'Jours avec membre off',cmp_evweeks:'Semaines tous disponibles',
  heat_title:'Distribution',heat_desc:'Densité des jours non ouvrés pour {c}.',heat_all:'les {n} pays européens',
  heat_weekly:'Carte de chaleur hebdo',heat_monthly:'Impact mensuel ({n} pays)',
  heat_clear:'Libre',heat_low:'Faible',heat_med:'Moyen',heat_high:'Fort',
  heat_toggle_all:'🌍 Afficher les {n} pays',heat_toggle_sel:'← Pays sélectionnés uniquement',
  ac_title:'Jours Non Ouvrés — Tous les Pays',ac_desc:'Cliquez sur un pays pour son profil complet.',
  ac_hol:'fériés',ac_in:'en',ac_pub:'Jours fériés',ac_wd:'Jours ouvrés',ac_bridge:'Opportunités pont',ac_best:'Meilleurs Jours Pont',ac_list:'Liste des Fériés',ac_calendar:'Calendrier',ac_dl:'Télécharger .ics',
  pdf_title:'Calendrier Jours Fériés Européens',
  mn:['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'],
  dn:['Lun','Mar','Mer','Jeu','Ven','Sam','Dim']
},
de:{
  title:'Europäischer Feiertagskalender',sub:'Feiertage in {n} europäischen Ländern vergleichen · Sprints planen',
  add:'+ Land',search:'Suchen…',done:'OK',all:'Alle',from:'Von',to:'Bis',year:'Jahr',country:'Land',back:'← Zurück',
  t_cal:'📅 Kalender',t_ins:'💡 Einblicke',t_av:'✅ Verfügbar',t_wd:'🧮 Arbeitstage',t_bd:'🌉 Brückentage',t_ta:'🔔 Team-Alerts',t_cmp:'📊 Vergleich',
  btn_pdf:'📄 PDF Export',btn_ics:'📥 .ics Laden',btn_heat:'🔥 Verteilung',btn_all:'🌍 Alle Länder',
  hpc:'Feiertage / Land',overlaps:'Überschneidungen',worst:'Schlimmste Wochen',longwe:'Lange Wochenenden',wk:'KW',
  av_title:'Alle Verfügbar',av_desc:'Wochen ohne Feiertage in allen gewählten Ländern.',av_found:'{n} freie Wochen',av_none:'Keine freien Wochen.',
  wd_title:'Arbeitstage-Rechner',wd_desc:'Zähle Arbeitstage zwischen zwei Daten. Aufschlüsselung pro Land.',
  wd_days:'Arbeitstage',wd_cal:'Kalender',wd_we:'Wochenenden',wd_hol:'Feiertage',wd_prod:'produktiv',wd_per:'Aufschlüsselung pro Land',
  wd_combined:'Kombiniert (Feiertag eines Landes = frei)',wd_shared:'gemeinsame Arbeitstage',wd_info:'Tage an denen ALLE Länder arbeiten. {h} Wochentags-Feiertage, {w} Wochenenden.',
  bd_title:'Brückentage-Optimierer',bd_desc:'Smarte Urlaubsplanung: Sehen Sie genau, welche Tage Sie freinehmen sollten.',
  bd_opp:'Möglichkeiten',bd_free:'frei!',bd_leave:'Urlaub',bd_off:'frei',bd_noleave:'Kein Urlaub nötig',bd_take:'Urlaub nehmen:',bd_bridge:'Brücke:',
  bd_pub:'Feiertag',bd_lv:'Urlaub nehmen',bd_weekend:'Wochenende',
  ta_title:'Team-Feiertags-Alerts',ta_desc:'Monatlicher Kollisionsbericht. Rot = 3+ Länder gleichzeitig frei.',
  cmp_title:'Jahresvergleich',cmp_desc:'Wie sich Feiertage zwischen den Jahren verschieben.',
  cmp_total:'Feiertage gesamt',cmp_weekday:'Wochentags-Feiertage',cmp_longwe:'Lange Wochenenden',cmp_mid:'Mitte der Woche',cmp_free:'Freie 4+ Tage Blöcke',cmp_clear:'Freie Wochen',
  cmp_team:'Kombinierte Team-Ansicht',cmp_anyoff:'Tage mit Teammitglied frei',cmp_evweeks:'Wochen alle verfügbar',
  heat_title:'Verteilung',heat_desc:'Dichte der freien Tage für {c}.',heat_all:'alle {n} europäischen Länder',
  heat_weekly:'Wochen-Heatmap',heat_monthly:'Monatlicher Einfluss ({n} Länder)',
  heat_clear:'Frei',heat_low:'Niedrig',heat_med:'Mittel',heat_high:'Hoch',
  heat_toggle_all:'🌍 Alle {n} Länder zeigen',heat_toggle_sel:'← Nur ausgewählte Länder',
  ac_title:'Freie Tage — Alle Europäischen Länder',ac_desc:'Klicken Sie auf ein Land für das vollständige Profil.',
  ac_hol:'Feiertage',ac_in:'in',ac_pub:'Feiertage',ac_wd:'Arbeitstage',ac_bridge:'Brücken-Möglichkeiten',ac_best:'Beste Brückentage',ac_list:'Feiertagsliste',ac_calendar:'Kalender',ac_dl:'.ics Laden',
  pdf_title:'Europäischer Feiertagskalender',
  mn:['Januar','Februar','März','April','Mai','Juni','Juli','August','September','Oktober','November','Dezember'],
  dn:['Mo','Di','Mi','Do','Fr','Sa','So']
},
es:{
  title:'Calendario Festivos Europeos',sub:'Compara festivos de {n} países europeos · Planifica sprints · Maximiza tiempo libre',
  add:'+ Añadir',search:'Buscar…',done:'Listo',all:'Todos',from:'Desde',to:'Hasta',year:'Año',country:'País',back:'← Volver',
  t_cal:'📅 Calendario',t_ins:'💡 Análisis',t_av:'✅ Disponible',t_wd:'🧮 Días Laborables',t_bd:'🌉 Días Puente',t_ta:'🔔 Alertas Equipo',t_cmp:'📊 Comparación',
  btn_pdf:'📄 Exportar PDF',btn_ics:'📥 Descargar .ics',btn_heat:'🔥 Distribución',btn_all:'🌍 Todos los Países',
  hpc:'Festivos / País',overlaps:'Coincidencias',worst:'Peores Semanas',longwe:'Fines de Semana Largos',wk:'Sem',
  av_title:'Todos Disponibles',av_desc:'Semanas laborales completas sin festivos.',av_found:'{n} semanas libres',av_none:'Sin semanas libres.',
  wd_title:'Calculadora Días Laborables',wd_desc:'Cuenta días laborables entre dos fechas. Detalle por país.',
  wd_days:'días laborables',wd_cal:'calendario',wd_we:'fines de semana',wd_hol:'festivos',wd_prod:'productivo',wd_per:'Detalle por país',
  wd_combined:'Combinado (festivo de cualquier país = día libre)',wd_shared:'días laborables compartidos',wd_info:'Días donde TODOS los países trabajan. {h} festivos entre semana, {w} fines de semana.',
  bd_title:'Optimizador Días Puente',bd_desc:'Planificación inteligente: vea exactamente qué días pedir para maximizar días libres consecutivos.',
  bd_opp:'oportunidades',bd_free:'¡gratis!',bd_leave:'libre',bd_off:'off',bd_noleave:'Sin días libres necesarios',bd_take:'Pedir:',bd_bridge:'Puente:',
  bd_pub:'Festivo',bd_lv:'Pedir libre',bd_weekend:'Fin de semana',
  ta_title:'Alertas de Equipo',ta_desc:'Informe mensual de colisiones. Rojo = 3+ países libres simultáneamente.',
  cmp_title:'Comparación Anual',cmp_desc:'Cómo cambian los festivos entre años para cada país.',
  cmp_total:'Total festivos',cmp_weekday:'Festivos entre semana',cmp_longwe:'Fines de semana largos',cmp_mid:'Mitad de semana',cmp_free:'Bloques 4+ días gratis',cmp_clear:'Semanas libres',
  cmp_team:'Vista equipo combinada',cmp_anyoff:'Días con miembro libre',cmp_evweeks:'Semanas todos disponibles',
  heat_title:'Distribución',heat_desc:'Densidad de días no laborables para {c}.',heat_all:'los {n} países europeos',
  heat_weekly:'Mapa de calor semanal',heat_monthly:'Impacto mensual ({n} países)',
  heat_clear:'Libre',heat_low:'Bajo',heat_med:'Medio',heat_high:'Alto',
  heat_toggle_all:'🌍 Mostrar {n} países',heat_toggle_sel:'← Solo países seleccionados',
  ac_title:'Días No Laborables — Todos los Países',ac_desc:'Pulse en un país para ver su perfil completo.',
  ac_hol:'festivos',ac_in:'en',ac_pub:'Festivos',ac_wd:'Días laborables',ac_bridge:'Oportunidades puente',ac_best:'Mejores Días Puente',ac_list:'Lista de Festivos',ac_calendar:'Calendario',ac_dl:'Descargar .ics',
  pdf_title:'Calendario Festivos Europeos',
  mn:['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  dn:['Lun','Mar','Mié','Jue','Vie','Sáb','Dom']
},
ro:{
  title:'Calendar Sărbători Europene',sub:'Compară zilele libere din {n} țări europene · Planifică sprinturi · Maximizează timpul liber',
  add:'+ Adaugă',search:'Caută…',done:'OK',all:'Toate',from:'De la',to:'Până la',year:'An',country:'Țară',back:'← Înapoi',
  t_cal:'📅 Calendar',t_ins:'💡 Detalii',t_av:'✅ Disponibil',t_wd:'🧮 Zile Lucrătoare',t_bd:'🌉 Zile Punte',t_ta:'🔔 Alerte Echipă',t_cmp:'📊 Comparație',
  btn_pdf:'📄 Export PDF',btn_ics:'📥 Descarcă .ics',btn_heat:'🔥 Distribuție',btn_all:'🌍 Toate Țările',
  hpc:'Sărbători / Țară',overlaps:'Suprapuneri',worst:'Cele mai proaste săptămâni',longwe:'Weekend-uri lungi',wk:'Săpt',
  av_title:'Toți Disponibili',av_desc:'Săptămâni fără nicio sărbătoare în țările selectate.',av_found:'{n} săptămâni libere',av_none:'Nicio săptămână liberă.',
  wd_title:'Calculator Zile Lucrătoare',wd_desc:'Numără zilele lucrătoare între două date. Detalii per țară.',
  wd_days:'zile lucrătoare',wd_cal:'calendar',wd_we:'weekenduri',wd_hol:'sărbători',wd_prod:'productiv',wd_per:'Detalii per țară',
  wd_combined:'Combinat (sărbătoare orice țară = zi liberă)',wd_shared:'zile lucrătoare comune',wd_info:'Zile în care TOATE țările lucrează. {h} sărbători în cursul săptămânii, {w} weekenduri.',
  bd_title:'Optimizator Zile Punte',bd_desc:'Planificare inteligentă: vezi exact ce zile să iei liber pentru a maximiza zilele consecutive libere.',
  bd_opp:'oportunități',bd_free:'gratuit!',bd_leave:'concediu',bd_off:'liber',bd_noleave:'Fără concediu necesar',bd_take:'Ia liber:',bd_bridge:'Punte:',
  bd_pub:'Sărbătoare legală',bd_lv:'Ia concediu',bd_weekend:'Weekend',
  ta_title:'Alerte Echipă',ta_desc:'Raport lunar de coliziuni. Roșu = 3+ țări libere simultan.',
  cmp_title:'Comparație An la An',cmp_desc:'Cum se schimbă sărbătorile între ani pentru fiecare țară.',
  cmp_total:'Total sărbători',cmp_weekday:'Sărbători în cursul săptămânii',cmp_longwe:'Weekend-uri lungi',cmp_mid:'Mijlocul săptămânii',cmp_free:'Blocuri 4+ zile gratuite',cmp_clear:'Săptămâni libere',
  cmp_team:'Vedere echipă combinată',cmp_anyoff:'Zile cu membru liber',cmp_evweeks:'Săptămâni toți disponibili',
  heat_title:'Distribuție',heat_desc:'Densitatea zilelor nelucrătoare pentru {c}.',heat_all:'toate cele {n} țări europene',
  heat_weekly:'Harta de căldură săptămânală',heat_monthly:'Impact lunar ({n} țări)',
  heat_clear:'Liber',heat_low:'Scăzut',heat_med:'Mediu',heat_high:'Ridicat',
  heat_toggle_all:'🌍 Arată toate {n} țările',heat_toggle_sel:'← Doar țările selectate',
  ac_title:'Zile Nelucrătoare — Toate Țările Europene',ac_desc:'Apasă pe o țară pentru profilul complet.',
  ac_hol:'sărbători',ac_in:'în',ac_pub:'Sărbători legale',ac_wd:'Zile lucrătoare',ac_bridge:'Oportunități punte',ac_best:'Cele mai bune Zile Punte',ac_list:'Lista Sărbătorilor',ac_calendar:'Calendar',ac_dl:'Descarcă .ics',
  pdf_title:'Calendar Sărbători Europene',
  mn:['Ianuarie','Februarie','Martie','Aprilie','Mai','Iunie','Iulie','August','Septembrie','Octombrie','Noiembrie','Decembrie'],
  dn:['Lun','Mar','Mie','Joi','Vin','Sâm','Dum']
}
};
const PAL=['#3b82f6','#ef4444','#10b981','#f59e0b','#8b5cf6','#ec4899','#06b6d4','#f97316','#6366f1','#14b8a6','#e11d48','#84cc16','#0ea5e9','#d946ef','#fbbf24'];

// ===== HOLIDAY DATABASE BUILDER =====
function bld(Y){
const w=getWE(Y),o=getOE(Y),R={},P=Y+'-';
const gf=off(Y,w,-2),em=off(Y,w,1),asc=off(Y,w,39),ws=off(Y,w,49),wm=off(Y,w,50),cc=off(Y,w,60),mt=off(Y,w,-3),es=dd(w[0],w[1]);
const ogf=off(Y,o,-2),oem=off(Y,o,1),oes=dd(o[0],o[1]),ops=off(Y,o,49),opm=off(Y,o,50),ocl=off(Y,o,-48),ohs=off(Y,o,-1);
const a=(o,d,n,e)=>{o[P+d]={n,e:e||n};},mk=arr=>{const r={};arr.forEach(x=>a(r,x[0],x[1],x[2]));return r;};
const kd=new Date(Y,3,27).getDay(),mid=mS(Y),als=aS(Y),ny=new Date(Y,0,1).getDay(),xd=new Date(Y,11,25).getDay();

// All 44 countries (same data as v1 — abbreviated for space, full data included)
R.AL=mk([['01-01','Viti i Ri','New Year'],['01-02','Viti i Ri 2','New Year 2'],['03-14','Dita e Verës','Summer Day'],['03-22','Dita e Nevruzit','Nowruz'],[oes,'Pashkët Ortodokse','Orth Easter'],[oem,'Pashkët Ortodokse 2','Orth Easter Mon'],[es,'Pashkët Katolike','Easter'],[em,'Pashkët Katolike 2','Easter Mon'],['05-01','Dita e Punës','Labour'],['10-19','Dita e Nënë Terezës','Mother Teresa'],['11-28','Dita e Pavarësisë','Independence'],['11-29','Dita e Çlirimit','Liberation'],['12-08','Dita Kombëtare Rinisë','Youth Day'],['12-25','Krishtlindja','Christmas']]);
R.AD=mk([['01-01','Any Nou','New Year'],['01-06','Reis','Epiphany'],['03-14','Dia de la Constitució','Constitution'],[gf,'Divendres Sant','Good Fri'],[em,'Dilluns de Pasqua','Easter Mon'],['05-01','Dia del Treball','Labour'],['06-24','Sant Joan','St John'],['08-15','Assumpció','Assumption'],['09-08','Mare de Déu de Meritxell','Meritxell Day'],['11-01','Tots Sants','All Saints'],['12-08','Immaculada Concepció','Immac Conception'],['12-25','Nadal','Christmas'],['12-26','Sant Esteve','St Stephen']]);
R.AT=mk([['01-01','Neujahr','New Year'],['01-06','Hl.Drei Könige','Epiphany'],[em,'Ostermontag','Easter Mon'],['05-01','Staatsfeiertag','Labour'],[asc,'Christi Himmelfahrt','Ascension'],[wm,'Pfingstmontag','Whit Mon'],[cc,'Fronleichnam','Corpus Christi'],['08-15','Mariä Himmelfahrt','Assumption'],['10-26','Nationalfeiertag','National Day'],['11-01','Allerheiligen','All Saints'],['12-08','Mariä Empfängnis','Immac Conception'],['12-25','Christtag','Christmas'],['12-26','Stefanitag','St Stephen']]);
R.BY=mk([['01-01','Новы год','New Year'],['01-02','Новы год 2','New Year 2'],['01-07','Каляды','Orth Christmas'],['03-08','Дзень жанчын','Women Day'],['05-01','Дзень працы','Labour'],['05-09','Дзень Перамогі','Victory'],[off(Y,o,9),'Радаўніца','Radonitsa'],['07-03','Дзень Незалежнасці','Independence'],['11-07','Кастрычніцкая рэв.','October Revolution'],['12-25','Каляды (каталіцкія)','Catholic Christmas']]);
R.BE=mk([['01-01','Nieuwjaar','New Year'],[em,'Paasmaandag','Easter Mon'],['05-01','Dag v/d Arbeid','Labour'],[asc,'Hemelvaart','Ascension'],[wm,'Pinkstermaandag','Whit Mon'],['07-21','Nationale Feestdag','National Day'],['08-15','O.L.V.Hemelvaart','Assumption'],['11-01','Allerheiligen','All Saints'],['11-11','Wapenstilstand','Armistice'],['12-25','Kerstmis','Christmas']]);
R.BA=mk([['01-01','Nova godina','New Year'],['01-02','Nova godina 2','New Year 2'],['05-01','Praznik rada','Labour'],['05-02','Praznik rada 2','Labour 2'],[ogf,'Veliki petak','Orth Good Fri'],[oem,'Uskrsni pon.','Orth Easter Mon'],[gf,'Katolički Veliki petak','Good Fri'],[em,'Katolički Uskrsni pon.','Easter Mon'],['11-25','Dan državnosti','Statehood']]);
R.BG=mk([['01-01','Нова година','New Year'],['01-02','Нова година 2','New Year 2'],['03-03','Ден Освоб.','Liberation'],[ogf,'Велики петък','Orth Good Fri'],[ohs,'Велика събота','Orth Holy Sat'],[oes,'Великден','Orth Easter'],[oem,'Великден 2','Orth Easter Mon'],['05-01','Ден труда','Labour'],['05-06','Гергьовден','St George'],['05-24','Ден културата','Culture'],['09-06','Съединение','Unification'],['09-22','Независимост','Independence'],['12-24','Бъдни вечер','Christmas Eve'],['12-25','Коледа','Christmas'],['12-26','Коледа 2','Christmas 2']]);
// BG substitute days: if fixed holiday falls on weekend, next working day is off
(function(){const bgFixed=['03-03','05-06','05-24','09-06','09-22','12-24','12-25','12-26'];bgFixed.forEach(dt=>{const ps=dt.split('-'),m=+ps[0]-1,d=+ps[1],dow=new Date(Y,m,d).getDay();if(dow===6){a(R.BG,dd(m+1,d+2),'Почивен ден (замест.)','Substitute holiday');}else if(dow===0){a(R.BG,dd(m+1,d+1),'Почивен ден (замест.)','Substitute holiday');}});})();
R.HR=mk([['01-01','Nova godina','New Year'],['01-06','Bogojavljenje','Epiphany'],[es,'Uskrs','Easter'],[em,'Uskrsni pon.','Easter Mon'],['05-01','Praznik rada','Labour'],['05-30','Dan državnosti','Statehood'],[cc,'Tijelovo','Corpus Christi'],['06-22','Dan antifaš.','Anti-Fascist'],['08-05','Dan pobjede','Victory'],['08-15','Velika Gospa','Assumption'],['11-01','Svi sveti','All Saints'],['11-18','Dan sjećanja','Remembrance'],['12-25','Božić','Christmas'],['12-26','Sv.Stjepan','St Stephen']]);
R.CY=mk([['01-01','Πρωτοχρονιά','New Year'],['01-06','Θεοφάνεια','Epiphany'],[ocl,'Καθαρά Δευτέρα','Green Monday'],['03-25','Ευαγγελισμός','Greek Indep'],['04-01','Εθν.Ημ.Κύπρου','Cyprus Nat Day'],[ogf,'Μεγ.Παρασκευή','Orth Good Fri'],[oem,'Δευτ.Πάσχα','Orth Easter Mon'],['05-01','Πρωτομαγιά','Labour'],[opm,'Κατακλυσμός','Kataklysmos'],['08-15','Κοίμηση Θεοτόκου','Assumption'],['10-01','Ανεξαρτησία','Independence'],['10-28','Ημέρα Όχι','Ohi Day'],['12-25','Χριστούγεννα','Christmas'],['12-26','Επόμ.Χριστ.','Boxing Day']]);
R.CZ=mk([['01-01','Nový rok','New Year'],[gf,'Velký pátek','Good Fri'],[em,'Velikonoční pon.','Easter Mon'],['05-01','Svátek práce','Labour'],['05-08','Den vítězství','Victory'],['07-05','Cyril a Metoděj','Cyril Methodius'],['07-06','Jan Hus','Jan Hus'],['09-28','Den státnosti','Statehood'],['10-28','Den Československa','Independence'],['11-17','Den boje','Freedom'],['12-24','Štědrý den','Christmas Eve'],['12-25','1.sv.vánoční','Christmas'],['12-26','2.sv.vánoční','St Stephen']]);
R.DK=mk([['01-01','Nytårsdag','New Year'],[mt,'Skærtorsdag','Maundy Thu'],[gf,'Langfredag','Good Fri'],[em,'Anden påskedag','Easter Mon'],[asc,'Kr.himmelfartsdag','Ascension'],[wm,'Anden pinsedag','Whit Mon'],['06-05','Grundlovsdag','Constitution'],['12-25','Juledag','Christmas'],['12-26','Anden juledag','St Stephen']]);
R.EE=mk([['01-01','Uusaasta','New Year'],['02-24','Iseseisvuspäev','Independence'],[gf,'Suur Reede','Good Fri'],['05-01','Kevadpüha','Labour'],[ws,'Nelipühade püha','Whit Sun'],['06-23','Võidupüha','Victory'],['06-24','Jaanipäev','Midsummer'],['08-20','Taasiseseisvumis.','Restoration'],['12-24','Jõululaupäev','Christmas Eve'],['12-25','1.jõulupüha','Christmas'],['12-26','2.jõulupüha','Christmas 2']]);
R.FI=mk([['01-01','Uudenvuodenpäivä','New Year'],['01-06','Loppiainen','Epiphany'],[gf,'Pitkäperjantai','Good Fri'],[em,'2.pääsiäispäivä','Easter Mon'],['05-01','Vappu','Labour'],[asc,'Helatorstai','Ascension'],[mid,'Juhannuspäivä','Midsummer'],[als,'Pyhäinpäivä','All Saints'],['12-06','Itsenäisyyspäivä','Independence'],['12-25','Joulupäivä','Christmas'],['12-26','Tapaninpäivä','St Stephen']]);
R.FR=mk([['01-01',"Jour de l'An",'New Year'],[em,'Lundi Pâques','Easter Mon'],['05-01','Fête Travail','Labour'],['05-08','Victoire 1945','Victory'],[asc,'Ascension','Ascension'],[wm,'Lundi Pentecôte','Whit Mon'],['07-14','Fête nationale','Bastille'],['08-15','Assomption','Assumption'],['11-01','Toussaint','All Saints'],['11-11','Armistice','Armistice'],['12-25','Noël','Christmas']]);
R.DE=mk([['01-01','Neujahrstag','New Year'],['01-06','Hl.Drei Könige','Epiphany'],[gf,'Karfreitag','Good Friday'],[em,'Ostermontag','Easter Mon'],['05-01','Tag der Arbeit','Labour'],[asc,'Christi Himmelfahrt','Ascension'],[wm,'Pfingstmontag','Whit Mon'],[cc,'Fronleichnam','Corpus Christi'],['08-15','Mariä Himmelfahrt','Assumption'],['10-03','Tag Dt.Einheit','German Unity'],['10-31','Reformationstag','Reformation'],['11-01','Allerheiligen','All Saints'],['12-25','1.Weihnachtstag','Christmas'],['12-26','2.Weihnachtstag','St Stephen']]);
R.GR=mk([['01-01','Πρωτοχρονιά','New Year'],['01-06','Θεοφάνεια','Epiphany'],[ocl,'Καθαρά Δευτέρα','Clean Monday'],['03-25','Ευαγγελισμός','Independence'],[ogf,'Μεγ.Παρασκευή','Orth Good Fri'],[oem,'Δευτ.Πάσχα','Orth Easter Mon'],['05-01','Πρωτομαγιά','Labour'],[opm,'Αγ.Πνεύματος','Orth Whit Mon'],['08-15','Κοίμηση Θεοτόκου','Assumption'],['10-28','Ημέρα Όχι','Ohi Day'],['12-25','Χριστούγεννα','Christmas'],['12-26','Σύναξη Θεοτόκου','Christmas 2']]);
R.HU=mk([['01-01','Újév','New Year'],['03-15','Nemzeti ünnep','Revolution'],[gf,'Nagypéntek','Good Fri'],[em,'Húsvéthétfő','Easter Mon'],['05-01','Munka ünnepe','Labour'],[wm,'Pünkösdhétfő','Whit Mon'],['08-20','Államalapítás','St Stephen'],['10-23','Nemzeti ünnep','1956 Revolution'],['11-01','Mindenszentek','All Saints'],['12-25','Karácsony','Christmas'],['12-26','Karácsony 2.','Christmas 2']]);
R.IS=mk([['01-01','Nýársdagur','New Year'],[mt,'Skírdagur','Maundy Thu'],[gf,'Föstudagurinn langi','Good Fri'],[em,'Annar í páskum','Easter Mon'],[off(Y,w,19),'Sumardagurinn fyrsti','First Day Summer'],['05-01','Verkalýðsdagurinn','Labour'],[asc,'Uppstigningardagur','Ascension'],[wm,'Annar í hvítasunnu','Whit Mon'],['06-17','Þjóðhátíðardagurinn','National Day'],['12-24','Aðfangadagur','Christmas Eve'],['12-25','Jóladagur','Christmas'],['12-26','Annar í jólum','St Stephen'],['12-31','Gamlársdagur','New Year Eve']]);
R.IE=mk([['01-01','Lá Caille','New Year'],[fM(Y,2),'Lá Fh.Bríde','St Brigid'],['03-17','Lá Fh.Pádraig','St Patrick'],[em,'Luan Cásca','Easter Mon'],[fM(Y,5),'Lá Saoire','May Hol'],[fM(Y,6),'Lá Saoire','June Hol'],[fM(Y,8),'Lá Saoire','Aug Hol'],[lM(Y,10),'Lá Saoire','Oct Hol'],['12-25','Lá Nollag','Christmas'],['12-26','Lá Fh.Stiofáin','St Stephen']]);
R.IT=mk([['01-01','Capodanno','New Year'],['01-06','Epifania','Epiphany'],[em,'Lunedì Angelo','Easter Mon'],['04-25','Liberazione','Liberation'],['05-01','Festa Lavoro','Labour'],['06-02','Repubblica','Republic'],['08-15','Ferragosto','Assumption'],['11-01','Ognissanti','All Saints'],['12-08','Immacolata','Immac Conception'],['12-25','Natale','Christmas'],['12-26','S.Stefano','St Stephen']]);
R.XK=mk([['01-01','Viti i Ri','New Year'],['01-02','Viti i Ri 2','New Year 2'],['02-17','Dita e Pavarësisë','Independence'],['04-09','Dita e Kushtetutës','Constitution'],['05-01','Dita e Punës','Labour'],['05-02','Dita e Punës 2','Labour 2'],['06-12','Dita e Paqes','Peace Day'],['12-25','Krishtlindja','Christmas']]);
R.LV=mk([['01-01','Jaunais Gads','New Year'],[gf,'Lielā Piektdiena','Good Fri'],[em,'Otrās Lieldienas','Easter Mon'],['05-01','Darba svētki','Labour'],['05-04','Neatkarības d.','Restoration'],['06-23','Līgo diena','Midsummer Eve'],['06-24','Jāņi','Midsummer'],['11-18','Proklamēšanas d.','Proclamation'],['12-24','Ziemassvētku vak.','Christmas Eve'],['12-25','Ziemassvētki','Christmas'],['12-26','Otrie Ziemassvētki','Christmas 2'],['12-31','Vecgada diena','New Year Eve']]);
R.LI=mk([['01-01','Neujahr','New Year'],['01-06','Hl.Drei Könige','Epiphany'],['02-02','Mariä Lichtmess','Candlemas'],[gf,'Karfreitag','Good Fri'],[em,'Ostermontag','Easter Mon'],['05-01','Tag der Arbeit','Labour'],[asc,'Christi Himmelfahrt','Ascension'],[wm,'Pfingstmontag','Whit Mon'],[cc,'Fronleichnam','Corpus Christi'],['08-15','Staatsfeiertag','National Day'],['09-08','Mariä Geburt','Nativity Mary'],['11-01','Allerheiligen','All Saints'],['12-08','Mariä Empfängnis','Immac Conception'],['12-25','Weihnachten','Christmas'],['12-26','Stefanstag','St Stephen']]);
R.LT=mk([['01-01','Naujieji metai','New Year'],['02-16','Valstybės atkūrimo','Restoration State'],['03-11','Nepriklausomybės','Independence'],[em,'Velykų 2-oji d.','Easter Mon'],['05-01','Darbo diena','Labour'],['06-24','Joninės','St John'],['07-06','Valstybės diena','Statehood'],['08-15','Žolinė','Assumption'],['11-01','Visų šventųjų','All Saints'],['11-02','Mirusiųjų atm.','All Souls'],['12-24','Kūčios','Christmas Eve'],['12-25','Kalėdos','Christmas'],['12-26','2.Kalėdų d.','Christmas 2']]);
R.LU=mk([['01-01','Neijoerschdag','New Year'],[em,'Ouschterméindeg','Easter Mon'],['05-01','Dag vun Aarbecht','Labour'],[asc,'Christi Himmelf.','Ascension'],[wm,'Péngschtméindeg','Whit Mon'],['06-23','Nationalfeierdag','National Day'],['08-15','Léiffrawëschdag','Assumption'],['11-01','Allerhellgen','All Saints'],['12-25','Chrëschtdag','Christmas'],['12-26','Stiefesdag','St Stephen']]);
R.MK=mk([['01-01','Нова Година','New Year'],[ocl,'Чист понеделник','Clean Monday'],['05-01','Ден на трудот','Labour'],['05-24','Св.Кирил и Методиј','Cyril Methodius'],[ogf,'Велики Петок','Orth Good Fri'],[oem,'Втор ден Велигден','Orth Easter Mon'],['08-02','Ден на Републиката','Republic'],['09-08','Ден на независноста','Independence'],['10-11','Ден на востанието','Uprising'],['10-23','Ден на рев.борбата','Revolution Day'],['12-08','Св.Климент Охридски','St Clement']]);
R.MT=mk([['01-01','L-Ewwel tas-Sena','New Year'],['02-10','San Pawl','St Paul'],['03-19','San Ġużepp','St Joseph'],['03-31','Jum il-Ħelsien','Freedom'],[gf,'Ġimgħa l-Kbira','Good Fri'],['05-01','Jum il-Ħaddiem','Labour'],['06-07','Sette Giugno','Sette Giugno'],['06-29','L-Imnarja','Sts Peter Paul'],['08-15','Santa Marija','Assumption'],['09-08','Il-Vitorja','Victory'],['09-21','Indipendenza','Independence'],['12-08','Kunċizzjoni','Immac Conception'],['12-13','Repubblika','Republic Day'],['12-25','Il-Milied','Christmas']]);
R.MD=mk([['01-01','Anul Nou','New Year'],['01-07','Crăciunul (ortodox)','Orth Christmas'],['01-08','Crăciunul 2','Orth Christmas 2'],['03-08','Ziua femeii','Women Day'],[oem,'Paștele','Orth Easter Mon'],[off(Y,o,8),'Paștele Blajinilor','Memorial Day'],['05-01','Ziua Muncii','Labour'],['05-09','Ziua Victoriei','Victory'],['06-01','Ziua Copilului','Children Day'],['08-27','Ziua Independenței','Independence'],['08-31','Limba noastră','Language Day'],['12-25','Crăciunul','Christmas']]);
R.MC=mk([['01-01',"Jour de l'An",'New Year'],['01-27','Ste Dévote','St Devota'],[em,'Lundi Pâques','Easter Mon'],['05-01','Fête du Travail','Labour'],[asc,'Ascension','Ascension'],[wm,'Lundi Pentecôte','Whit Mon'],[cc,'Fête-Dieu','Corpus Christi'],['08-15','Assomption','Assumption'],['11-01','Toussaint','All Saints'],['11-19','Fête du Prince','Prince Day'],['12-08','Immaculée Conception','Immac Conception'],['12-25','Noël','Christmas']]);
R.ME=mk([['01-01','Nova godina','New Year'],['01-02','Nova godina 2','New Year 2'],['01-07','Božić (pravoslavni)','Orth Christmas'],[ogf,'Veliki petak','Orth Good Fri'],[oem,'Uskrs pon.','Orth Easter Mon'],['05-01','Praznik rada','Labour'],['05-02','Praznik rada 2','Labour 2'],['05-21','Dan nezavisnosti','Independence'],['05-22','Dan nezavisnosti 2','Independence 2'],['07-13','Dan državnosti','Statehood']]);
R.NL=mk([['01-01','Nieuwjaar','New Year'],[es,'Eerste Paasdag','Easter'],[em,'Tweede Paasdag','Easter Mon'],[kd===0?'04-26':'04-27','Koningsdag',"King's Day"],['05-05','Bevrijdingsdag','Liberation'],[asc,'Hemelvaartsdag','Ascension'],[ws,'Eerste Pinksterdag','Whit Sun'],[wm,'Tweede Pinksterdag','Whit Mon'],['12-25','Eerste Kerstdag','Christmas'],['12-26','Tweede Kerstdag','Christmas 2']]);
R.NO=mk([['01-01','Første nyttårsdag','New Year'],[mt,'Skjærtorsdag','Maundy Thu'],[gf,'Langfredag','Good Fri'],[em,'Andre påskedag','Easter Mon'],['05-01','Arbeidernes dag','Labour'],[asc,'Kr.himmelfartsdag','Ascension'],['05-17','Grunnlovsdag','Constitution'],[wm,'Andre pinsedag','Whit Mon'],['12-25','Første juledag','Christmas'],['12-26','Andre juledag','St Stephen']]);
R.PL=mk([['01-01','Nowy Rok','New Year'],['01-06','Trzech Króli','Epiphany'],[es,'Wielkanoc','Easter'],[em,'Pon.Wielkanocny','Easter Mon'],['05-01','Święto Pracy','Labour'],['05-03','Konstytucji','Constitution'],[ws,'Zesłanie D.Ś.','Whit Sun'],[cc,'Boże Ciało','Corpus Christi'],['08-15','Wniebowzięcie','Assumption'],['11-01','Wszystkich Św.','All Saints'],['11-11','Niepodległości','Independence'],['12-25','Boże Narodzenie','Christmas'],['12-26','2.dzień B.N.','Christmas 2']]);
R.PT=mk([['01-01','Ano Novo','New Year'],[off(Y,w,-47),'Carnaval','Carnival'],[gf,'Sexta-feira Santa','Good Fri'],['04-25','Dia Liberdade','Freedom'],['05-01','Dia Trabalhador','Labour'],[cc,'Corpo de Deus','Corpus Christi'],['06-10','Dia de Portugal','Portugal Day'],['08-15','Assunção','Assumption'],['10-05','República','Republic'],['11-01','Todos Santos','All Saints'],['12-01','Rest.Independência','Restoration'],['12-08','Imaculada','Immac Conception'],['12-25','Natal','Christmas']]);
R.RO=mk([['01-01','Anul Nou','New Year'],['01-02','Anul Nou 2','New Year 2'],['01-06','Boboteaza','Epiphany'],['01-07','Sf.Ioan','St John'],['01-24','Ziua Unirii','Unification'],[ogf,'Vinerea Mare','Orth Good Fri'],[oes,'Paștele','Orth Easter'],[oem,'Paștele 2','Orth Easter Mon'],['05-01','Ziua Muncii','Labour'],[ops,'Rusalii','Orth Whit Sun'],[opm,'Ziua Copilului','Children Day'],['08-15','Adormirea M.D.','Assumption'],['11-30','Sf.Andrei','St Andrew'],['12-01','Ziua Națională','National Day'],['12-25','Crăciunul','Christmas'],['12-26','Crăciunul 2','Christmas 2']]);
R.RS=mk([['01-01','Нова година','New Year'],['01-02','Нова година 2','New Year 2'],['01-07','Божић','Orth Christmas'],['02-15','Дан државности','Statehood'],['02-16','Дан државности 2','Statehood 2'],[ogf,'Велики петак','Orth Good Fri'],[ohs,'Велика субота','Orth Holy Sat'],[oes,'Васкрс','Orth Easter'],[oem,'Васкршњи пон.','Orth Easter Mon'],['05-01','Празник рада','Labour'],['05-02','Празник рада 2','Labour 2'],['11-11','Дан примирја','Armistice']]);
R.SK=mk([['01-01','Deň vzniku SR','Republic'],['01-06','Traja králi','Epiphany'],[gf,'Veľký piatok','Good Fri'],[em,'Veľk.pondelok','Easter Mon'],['05-01','Sviatok práce','Labour'],['05-08','Deň víťazstva','Victory'],['07-05','Sv.Cyrila','Cyril Methodius'],['08-29','Výročie SNP','Slovak Uprising'],['09-01','Deň Ústavy','Constitution'],['09-15','Sedembolestná','Lady of Sorrows'],['11-01','Všetkých sv.','All Saints'],['11-17','Deň boja','Freedom'],['12-24','Štedrý deň','Christmas Eve'],['12-25','1.sv.vianočný','Christmas'],['12-26','2.sv.vianočný','St Stephen']]);
R.SI=mk([['01-01','Novo leto','New Year'],['01-02','Novo leto 2','New Year 2'],['02-08','Prešernov dan','Prešeren Day'],[em,'Velikonočni pon.','Easter Mon'],['04-27','Dan upora','Resistance'],['05-01','Praznik dela','Labour'],['05-02','Praznik dela 2','Labour 2'],['06-25','Dan državnosti','Statehood'],['08-15','Marijino vnebov.','Assumption'],['10-31','Dan reformacije','Reformation'],['11-01','Dan spomina','All Saints'],['12-25','Božič','Christmas'],['12-26','Dan samostojnosti','Independence']]);
R.ES=mk([['01-01','Año Nuevo','New Year'],['01-06','Reyes','Epiphany'],[mt,'Jueves Santo','Maundy Thu'],[gf,'Viernes Santo','Good Fri'],['05-01','Día Trabajo','Labour'],['08-15','Asunción','Assumption'],['10-12','Fiesta Nacional','National Day'],['11-01','Todos Santos','All Saints'],['12-06','Constitución','Constitution'],['12-08','Inmaculada','Immac Conception'],['12-25','Navidad','Christmas']]);
R.SE=mk([['01-01','Nyårsdagen','New Year'],['01-06','Trettondedag jul','Epiphany'],[gf,'Långfredagen','Good Fri'],[em,'Annandag påsk','Easter Mon'],['05-01','Första maj','Labour'],[asc,'Kristi himmelfärd','Ascension'],['06-06','Nationaldag','National Day'],[mid,'Midsommardagen','Midsummer'],[als,'Alla helgons dag','All Saints'],['12-25','Juldagen','Christmas'],['12-26','Annandag jul','St Stephen']]);
R.CH=mk([['01-01','Neujahrstag','New Year'],['01-02','Berchtoldstag','Berchtold'],[gf,'Karfreitag','Good Fri'],[em,'Ostermontag','Easter Mon'],[asc,'Auffahrt','Ascension'],[wm,'Pfingstmontag','Whit Mon'],['08-01','Bundesfeier','National Day'],['12-25','Weihnachtstag','Christmas'],['12-26','Stephanstag','St Stephen']]);
R.TR=mk([['01-01','Yılbaşı','New Year'],['04-23','Ulusal Egemenlik','Nat Sovereignty'],['05-01','Emek ve Dayanışma','Labour'],['05-19','Gençlik Bayramı','Youth Day'],['07-15','Demokrasi Bayramı','Democracy Day'],['08-30','Zafer Bayramı','Victory Day'],['10-29','Cumhuriyet Bayramı','Republic Day']]);
R.UA=mk([['01-01','Новий рік','New Year'],['01-07','Різдво (правосл.)','Orth Christmas'],['03-08','Міжнар. жіночий день','Women Day'],[oem,'Великдень пн','Orth Easter Mon'],['05-01','День праці','Labour'],['05-09','День перемоги','Victory'],[opm,'Трійця пн','Orth Whit Mon'],['06-28','День Конституції','Constitution'],['08-24','День Незалежності','Independence'],['10-14','День захисника','Defender Day'],['12-25','Різдво','Christmas']]);
// GB
R.GB={};const g=R.GB;a(g,ny===0?'01-02':ny===6?'01-03':'01-01',"New Year's Day",'New Year');a(g,gf,'Good Friday','Good Friday');a(g,em,'Easter Monday','Easter Mon');a(g,fM(Y,5),'Early May bank hol.','Early May');a(g,lM(Y,5),'Spring bank hol.','Spring');a(g,lM(Y,8),'Summer bank hol.','Summer');
if(xd===5){a(g,'12-25','Christmas Day','Christmas');a(g,'12-28','Boxing Day','Boxing Day');}else if(xd===6){a(g,'12-27','Christmas Day','Christmas');a(g,'12-28','Boxing Day','Boxing Day');}else if(xd===0){a(g,'12-26','Boxing Day','Boxing Day');a(g,'12-27','Christmas Day','Christmas');}else{a(g,'12-25','Christmas Day','Christmas');a(g,'12-26','Boxing Day','Boxing Day');}
return R;}
const ALL={};YEARS.forEach(y=>{ALL[y]=bld(y);});

// COUNTRIES — alphabetically sorted
const CT=[
{c:'AL',n:'Albania',f:'🇦🇱'},{c:'AD',n:'Andorra',f:'🇦🇩'},{c:'AT',n:'Austria',f:'🇦🇹'},{c:'BY',n:'Belarus',f:'🇧🇾'},
{c:'BE',n:'Belgium',f:'🇧🇪'},{c:'BA',n:'Bosnia & Herz.',f:'🇧🇦'},{c:'BG',n:'Bulgaria',f:'🇧🇬'},{c:'HR',n:'Croatia',f:'🇭🇷'},
{c:'CY',n:'Cyprus',f:'🇨🇾'},{c:'CZ',n:'Czechia',f:'🇨🇿'},{c:'DK',n:'Denmark',f:'🇩🇰'},{c:'EE',n:'Estonia',f:'🇪🇪'},
{c:'FI',n:'Finland',f:'🇫🇮'},{c:'FR',n:'France',f:'🇫🇷'},{c:'DE',n:'Germany',f:'🇩🇪'},{c:'GR',n:'Greece',f:'🇬🇷'},
{c:'HU',n:'Hungary',f:'🇭🇺'},{c:'IS',n:'Iceland',f:'🇮🇸'},{c:'IE',n:'Ireland',f:'🇮🇪'},{c:'IT',n:'Italy',f:'🇮🇹'},
{c:'XK',n:'Kosovo',f:'🇽🇰'},{c:'LV',n:'Latvia',f:'🇱🇻'},{c:'LI',n:'Liechtenstein',f:'🇱🇮'},{c:'LT',n:'Lithuania',f:'🇱🇹'},
{c:'LU',n:'Luxembourg',f:'🇱🇺'},{c:'MK',n:'N. Macedonia',f:'🇲🇰'},{c:'MT',n:'Malta',f:'🇲🇹'},{c:'MD',n:'Moldova',f:'🇲🇩'},
{c:'MC',n:'Monaco',f:'🇲🇨'},{c:'ME',n:'Montenegro',f:'🇲🇪'},{c:'NL',n:'Netherlands',f:'🇳🇱'},{c:'NO',n:'Norway',f:'🇳🇴'},
{c:'PL',n:'Poland',f:'🇵🇱'},{c:'PT',n:'Portugal',f:'🇵🇹'},{c:'RO',n:'Romania',f:'🇷🇴'},{c:'RS',n:'Serbia',f:'🇷🇸'},
{c:'SK',n:'Slovakia',f:'🇸🇰'},{c:'SI',n:'Slovenia',f:'🇸🇮'},{c:'ES',n:'Spain',f:'🇪🇸'},{c:'SE',n:'Sweden',f:'🇸🇪'},
{c:'CH',n:'Switzerland',f:'🇨🇭'},{c:'TR',n:'Turkey',f:'🇹🇷'},{c:'UA',n:'Ukraine',f:'🇺🇦'},{c:'GB',n:'United Kingdom',f:'🇬🇧'}
];

// ISO2 → our code mapping for geo detection
const ISO_MAP={'AL':'AL','AD':'AD','AT':'AT','BY':'BY','BE':'BE','BA':'BA','BG':'BG','HR':'HR','CY':'CY','CZ':'CZ','DK':'DK','EE':'EE','FI':'FI','FR':'FR','DE':'DE','GR':'GR','HU':'HU','IS':'IS','IE':'IE','IT':'IT','XK':'XK','LV':'LV','LI':'LI','LT':'LT','LU':'LU','MK':'MK','MT':'MT','MD':'MD','MC':'MC','ME':'ME','NL':'NL','NO':'NO','PL':'PL','PT':'PT','RO':'RO','RS':'RS','SK':'SK','SI':'SI','ES':'ES','SE':'SE','CH':'CH','TR':'TR','UA':'UA','GB':'GB'};

// ===== STATE =====
let state={sel:['DE','RO','FR','ES'],yr:2026,th:'dark',ln:'en',vw:'cal',sm:null,op:false,q:'',modal:null,acOpen:null,heatAll:false,
  // Working days calc
  wdFrom:'2026-01-01',wdTo:'2026-12-31',
  // Bridge day country + year
  bdCountry:'DE',bdYear:2026,
  // Compare years
  cmpFrom:2025,cmpTo:2030
};
function setState(p){Object.assign(state,p);render();}

// ===== HELPERS =====
function getHols(yr,codes){const H=ALL[yr]||{};return(y,m,d)=>{const k=dk(y,m,d);return codes.map((c,i)=>{const h=H[c]?.[k];if(!h)return null;const x=CT.find(z=>z.c===c);return{c,n:h.n,e:h.e,cl:PAL[i%PAL.length],f:x?.f,cn:x?.n};}).filter(Boolean);};}
function computeWeeks(yr,codes,gH){const wks=[];let wk=[],ws=null;for(let m=0;m<12;m++)for(let d=1;d<=dim(yr,m);d++){if(dw(yr,m,d)===0&&wk.length){wks.push({s:ws,d:[...wk]});wk=[];}if(!wk.length)ws={m,d};const hs=gH(yr,m,d);wk.push({d,m,we:isW(yr,m,d),hc:hs.length,hs});}if(wk.length)wks.push({s:ws,d:[...wk]});return wks;}
function countWorkingDays(fromStr,toStr,countryCodes){
  const from=new Date(fromStr),to=new Date(toStr);if(from>to)return{wd:0,cd:0,hol:0,we:0};
  let wd=0,hol=0,weD=0,cd=0;const holSets={};
  countryCodes.forEach(c=>{holSets[c]={};YEARS.forEach(y=>{const H=ALL[y]||{};if(H[c])Object.keys(H[c]).forEach(k=>{holSets[c][k]=true;});});});
  for(let d=new Date(from);d<=to;d.setDate(d.getDate()+1)){
    cd++;const y=d.getFullYear(),m=d.getMonth(),dy=d.getDate(),k=dk(y,m,dy);
    if(isW(y,m,dy)){weD++;continue;}
    let isHol=false;for(const c of countryCodes){if(holSets[c][k]){isHol=true;break;}}
    if(isHol)hol++;else wd++;
  }
  return{wd,cd,hol,we:weD};
}
function countWorkingDaysSingle(fromStr,toStr,cc){
  const from=new Date(fromStr),to=new Date(toStr);if(from>to)return{wd:0,cd:0,hol:0,we:0,holNames:[]};
  let wd=0,hol=0,weD=0,cd=0;const holNames=[];const holSet={};
  YEARS.forEach(y=>{const H=ALL[y]||{};if(H[cc])Object.entries(H[cc]).forEach(([k,v])=>{holSet[k]=v.n;});});
  for(let d=new Date(from);d<=to;d.setDate(d.getDate()+1)){
    cd++;const y=d.getFullYear(),m=d.getMonth(),dy=d.getDate(),k=dk(y,m,dy);
    if(isW(y,m,dy)){weD++;continue;}
    if(holSet[k]){hol++;holNames.push(k.split('-')[2]+' '+MN[+k.split('-')[1]-1]+': '+holSet[k]);}else wd++;
  }
  return{wd,cd,hol,we:weD,holNames};
}
function getBridgeDays(yr,cc){
  const H=ALL[yr]||{},hols=H[cc]||{};
  const holSet=new Set(Object.keys(hols));
  const isHol=(y,m,d)=>holSet.has(dk(y,m,d));
  const isOff=(y,m,d)=>isW(y,m,d)||isHol(y,m,d);
  const fmt=d=>d.getDate()+' '+FME[d.getMonth()];
  const dB=(a,b)=>Math.round((b-a)/86400000)+1;
  // Build day-strip data for a date range
  function dayStrip(sD,eD,leaveSet){
    const strip=[];
    for(let d=new Date(sD);d<=eD;d=new Date(d.getTime()+864e5)){
      const y=d.getFullYear(),m=d.getMonth(),dy=d.getDate();
      const key=dk(y,m,dy);
      let type='work';
      if(leaveSet&&leaveSet.has(d.getTime()))type='leave';
      else if(isHol(y,m,dy))type='hol';
      else if(isW(y,m,dy))type='we';
      strip.push({d:dy,m,type,dow:dw(y,m,dy),label:DNE[dw(y,m,dy)].slice(0,2),holName:hols[key]?.n||''});
    }
    return strip;
  }
  // Step 1: find all "off blocks"
  const blocks=[];let cur=null;
  for(let m=0;m<12;m++)for(let d=1;d<=dim(yr,m);d++){
    if(isOff(yr,m,d)){
      if(!cur)cur={start:new Date(yr,m,d),end:new Date(yr,m,d),names:[]};
      else cur.end=new Date(yr,m,d);
      if(isHol(yr,m,d))cur.names.push(hols[dk(yr,m,d)].n);
    }else{if(cur){blocks.push(cur);cur=null;}}
  }
  if(cur)blocks.push(cur);
  const hB=blocks.filter(b=>b.names.length>0);
  const results=[];
  // Step 2: base free entries
  hB.forEach(b=>{
    const days=dB(b.start,b.end);
    const label=b.names.length>2?b.names[0]+' + '+(b.names.length-1)+' more':b.names.join(' + ');
    results.push({startD:b.start,endD:b.end,dateLabel:fmt(b.start)+(days>1?' – '+fmt(b.end):''),name:label,leave:0,off:days,type:'No leave needed',strip:dayStrip(b.start,b.end,null)});
  });
  // Step 3: extend each block by 1-2 leave days
  hB.forEach(b=>{
    const days=dB(b.start,b.end);
    for(const dir of[-1,1]){
      for(let take=1;take<=2;take++){
        let lv=[],ok=true;
        for(let i=1;i<=take;i++){
          const t=new Date(dir===-1?b.start.getTime()-i*864e5:b.end.getTime()+i*864e5);
          if(isW(t.getFullYear(),t.getMonth(),t.getDate())||isHol(t.getFullYear(),t.getMonth(),t.getDate())){ok=false;break;}
          lv.push(t);
        }
        if(!ok||!lv.length)continue;
        let eS=new Date(Math.min(b.start,...lv)),eE=new Date(Math.max(b.end,...lv));
        while(true){const p=new Date(eS.getTime()-864e5);if(isOff(p.getFullYear(),p.getMonth(),p.getDate()))eS=p;else break;}
        while(true){const n=new Date(eE.getTime()+864e5);if(isOff(n.getFullYear(),n.getMonth(),n.getDate()))eE=n;else break;}
        const tot=dB(eS,eE);
        if(tot>=days+2){
          const lvSet=new Set(lv.map(l=>l.getTime()));
          const ld=lv.map(l=>DNE[dw(l.getFullYear(),l.getMonth(),l.getDate())]+' '+l.getDate()+' '+MN[l.getMonth()]).join(', ');
          results.push({startD:eS,endD:eE,dateLabel:fmt(eS)+' – '+fmt(eE),name:b.names.join(' + '),leave:take,off:tot,type:'Take leave: '+ld,strip:dayStrip(eS,eE,lvSet)});
        }
      }
    }
  });
  // Step 4: bridge gaps
  for(let i=0;i<hB.length-1;i++){
    const a=hB[i],b=hB[i+1];
    const gS=new Date(a.end.getTime()+864e5),gE=new Date(b.start.getTime()-864e5);
    if(gE<gS)continue;
    const gDays=dB(gS,gE);
    if(gDays<1||gDays>5)continue;
    let lC=0;const lDates=[];
    for(let d=new Date(gS);d<=gE;d=new Date(d.getTime()+864e5)){
      if(!isW(d.getFullYear(),d.getMonth(),d.getDate())&&!isHol(d.getFullYear(),d.getMonth(),d.getDate())){
        lC++;lDates.push(d);
      }
    }
    if(lC<1||lC>3)continue;
    let eS=new Date(a.start),eE=new Date(b.end);
    while(true){const p=new Date(eS.getTime()-864e5);if(isOff(p.getFullYear(),p.getMonth(),p.getDate()))eS=p;else break;}
    while(true){const n=new Date(eE.getTime()+864e5);if(isOff(n.getFullYear(),n.getMonth(),n.getDate()))eE=n;else break;}
    const tot=dB(eS,eE);
    const mn=[...a.names,...b.names];
    const label=mn.length>3?mn[0]+' … '+mn[mn.length-1]+' ('+mn.length+' hol)':mn.join(' + ');
    const lvSet=new Set(lDates.map(l=>l.getTime()));
    const ld=lDates.map(l=>DNE[dw(l.getFullYear(),l.getMonth(),l.getDate())]+' '+l.getDate()+' '+MN[l.getMonth()]).join(', ');
    results.push({startD:eS,endD:eE,dateLabel:fmt(eS)+' – '+fmt(eE),name:label,leave:lC,off:tot,type:'Bridge leave: '+ld,strip:dayStrip(eS,eE,lvSet)});
  }
  // Deduplicate, filter, sort
  const unique=[];const seen=new Set();
  results.forEach(r=>{const k=r.dateLabel+r.leave;if(!seen.has(k)){seen.add(k);unique.push(r);}});
  // Smart filter: leave=0→off>=4, leave=1→off>=4, leave=2→off>=5, leave=3→off>=7
  const filtered=unique.filter(r=>{
    if(r.leave===0)return r.off>=4;
    if(r.leave===1)return r.off>=4;
    if(r.leave===2)return r.off>=5;
    if(r.leave>=3)return r.off>=7;
    return false;
  });
  return filtered.sort((a,b)=>{
    if(a.leave===0&&b.leave===0)return b.off-a.off;
    if(a.leave===0)return-1;if(b.leave===0)return 1;
    return(b.off/b.leave)-(a.off/a.leave)||(b.off-a.off);
  });
}
// ===== .ICS EXPORT =====
function generateICS(codes,yr){
  const H=ALL[yr]||{};
  let ics='BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//European Holiday Calendar//EN\nCALSCALE:GREGORIAN\n';
  codes.forEach(c=>{
    const hols=H[c]||{},x=CT.find(z=>z.c===c);
    Object.entries(hols).forEach(([dt,h])=>{
      const d=dt.replace(/-/g,'');
      ics+=`BEGIN:VEVENT\nDTSTART;VALUE=DATE:${d}\nDTEND;VALUE=DATE:${d}\nSUMMARY:${x?.f} ${h.n} (${x?.n})\nDESCRIPTION:${h.e} - ${x?.n}\nTRANSP:TRANSPARENT\nEND:VEVENT\n`;
    });
  });
  ics+='END:VCALENDAR';
  const blob=new Blob([ics],{type:'text/calendar'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;a.download=`european-holidays-${yr}.ics`;a.click();
  URL.revokeObjectURL(url);
}

// ===== PDF EXPORT =====
function exportPDF(sel,yr){const H=ALL[yr]||{};const cols=sel.map((c,i)=>({...CT.find(z=>z.c===c),cl:PAL[i%PAL.length]}));let rows='';for(let m=0;m<12;m++){let cells='';const offset=dw(yr,m,1);for(let i=0;i<offset;i++)cells+='<td></td>';for(let d=1;d<=dim(yr,m);d++){const k=yr+'-'+p2(m+1)+'-'+p2(d),we=isW(yr,m,d);const hols=sel.map(c=>{const h=H[c]?.[k];return h?{n:h.n,cl:cols.find(x=>x.c===c)?.cl}:null;}).filter(Boolean);const bg=hols.length?'#eef2ff':we?'#f1f5f9':'#fff';const dots=hols.map(h=>"<span style='display:inline-block;width:6px;height:6px;border-radius:50%;background:"+h.cl+"'></span>").join('');cells+="<td style='text-align:center;padding:4px 2px;background:"+bg+";border-radius:4px;font-size:11px;"+(hols.length?'font-weight:700;':'')+(we?'color:#94a3b8;':'')+"'>"+d+(dots?"<div style='display:flex;gap:2px;justify-content:center;margin-top:1px'>"+dots+"</div>":'')+"</td>";if((offset+d)%7===0)cells+='</tr><tr>';}rows+="<div style='break-inside:avoid;margin-bottom:12px'><h3 style='font-size:13px;margin:0 0 4px;color:#1e293b'>"+FME[m]+' '+yr+"</h3><table style='width:100%;border-collapse:collapse'><tr>"+DL.map((d,i)=>"<th style='font-size:9px;padding:3px;color:"+(i>=5?'#6366f1':'#64748b')+";text-align:center;width:14.28%'>"+d+"</th>").join('')+'</tr><tr>'+cells+'</tr></table></div>';}const legend=cols.map(c=>"<span style='display:inline-flex;align-items:center;gap:4px;margin-right:12px'><span style='width:8px;height:8px;border-radius:50%;background:"+c.cl+"'></span><span style='font-size:10px'>"+c.f+' '+c.n+"</span></span>").join('');const html="<!DOCTYPE html><html><head><meta charset='utf-8'><title>European Holidays "+yr+"</title><style>@page{size:A4 landscape;margin:12mm}body{font-family:system-ui,sans-serif;color:#1e293b;margin:0;padding:20px}@media print{body{padding:0}}</style></head><body><div style='text-align:center;margin-bottom:16px'><h1 style='font-size:20px;margin:0 0 4px'>🗓️ European Holiday Calendar — "+yr+"</h1><div style='margin-bottom:8px'>"+legend+"</div></div><div style='display:grid;grid-template-columns:repeat(4,1fr);gap:10px'>"+rows+"</div></body></html>";const wn=window.open('','_blank','width=1100,height=800');if(wn){wn.document.write(html);wn.document.close();setTimeout(()=>wn.print(),500);}}

// ===== RENDER FUNCTIONS =====
function renderCalMonth(yr,m,gH,expanded){const days=dim(yr,m),offset=dw(yr,m,1);let hc=0;const cells=[];for(let i=0;i<offset;i++)cells.push('<div></div>');for(let d=1;d<=days;d++){const hs=gH(yr,m,d),we=isW(yr,m,d),sat=dw(yr,m,d)===5;if(hs.length)hc++;const ml=hs.length>=2;const cls=['day'];if(expanded)cls.push('exp');if(hs.length)cls.push('hol');else if(sat)cls.push('sat');else if(we)cls.push('sun');let bg='';if(hs.length){bg=ml?'background:linear-gradient(135deg,#ef444433,#8b5cf633)':`background:${hs[0].cl}22`;bg+=`;border-color:${ml?'#ef444444':hs[0].cl+'44'}`;}const dots=hs.length?`<div class="dots">${hs.map(h=>`<div class="dot" style="background:${h.cl}"></div>`).join('')}</div>`:'';const tip=hs.length?`<div class="tip"><div class="tip-date">${d} ${FME[m]} ${yr}</div>${hs.map(h=>`<div class="tip-row"><span class="tip-flag">${h.f}</span><div><div class="tip-cn" style="color:${h.cl}">${h.cn}</div><div class="tip-hn">${h.n}</div>${h.e!==h.n?`<div class="tip-en">${h.e}</div>`:''}</div></div>`).join('')}</div>`:'';cells.push(`<div class="${cls.join(' ')}" style="${bg}">${d}${dots}${tip}</div>`);}const tag=hc?`<span class="month-tag">${hc}</span>`:'';return`<div class="month-card"><div class="month-head"><span>${FME[m]} ${yr}</span>${tag}</div><div class="day-headers">${DL.map((d,i)=>`<div${i>=5?' class="we"':''}>${d}</div>`).join('')}</div><div class="days">${cells.join('')}</div></div>`;}

function renderWorkingDays(){const t=i18n[state.ln]||i18n.en;const FM=t.mn;
  const{wdFrom,wdTo,sel}=state;
  const combined=countWorkingDays(wdFrom,wdTo,sel);
  // Per-country results
  const perCountry=sel.map((c,i)=>{
    const x=CT.find(z=>z.c===c);
    const r=countWorkingDaysSingle(wdFrom,wdTo,c);
    return{code:c,flag:x?.f,name:x?.n,cl:PAL[i%PAL.length],...r};
  });
  const maxWd=Math.max(...perCountry.map(p=>p.wd),1);
  // Per-country rows
  const rows=perCountry.map(p=>{
    const holList=p.holNames.length?`<div style="margin-top:4px;font-size:9px;color:var(--dm)">${p.holNames.join(' · ')}</div>`:'';
    return`<div style="background:var(--dy);border-radius:10px;border:1px solid var(--bd);padding:12px;margin-bottom:6px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:6px"><span style="font-size:16px">${p.flag}</span><span style="font-size:13px;font-weight:700;color:${p.cl}">${p.name}</span><span style="margin-left:auto;font-size:18px;font-weight:800;color:var(--ac)">${p.wd}</span><span style="font-size:10px;color:var(--dm)">${t.wd_days}</span></div><div style="display:flex;gap:6px;margin-bottom:4px"><div style="flex:1;height:6px;border-radius:3px;background:var(--bd)"><div style="height:100%;border-radius:3px;background:${p.cl};width:${(p.wd/maxWd*100).toFixed(0)}%;transition:width .3s"></div></div></div><div style="display:flex;gap:12px;font-size:10px;color:var(--dm)"><span>📅 ${p.cd} calendar</span><span>🏖️ ${p.we} weekends</span><span>🎉 ${p.hol} holidays</span><span>📊 ${p.cd>0?(p.wd/p.cd*100).toFixed(0):0}% productive</span></div>${holList}</div>`;
  }).join('');
  // Combined summary (only if 2+ countries)
  const combinedHtml=sel.length>=2?`<div style="background:color-mix(in srgb,var(--ac) 8%,transparent);border-radius:10px;border:1px solid color-mix(in srgb,var(--ac) 20%,transparent);padding:14px;margin-bottom:14px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="font-size:13px;font-weight:700;color:var(--ac)">🌐 ${t.wd_combined}</span><span style="margin-left:auto;font-size:22px;font-weight:800;color:var(--ac)">${combined.wd}</span><span style="font-size:10px;color:var(--dm)">${t.wd_shared}</span></div><div style="font-size:10px;color:var(--dm)">Days where ALL selected countries are working. ${combined.hol} weekday holidays across team, ${combined.we} weekends.</div></div>`:'';
  return`<div class="tool-card" style="max-width:900px"><h2>${t.wd_title}</h2><p class="desc">Count business days between two dates, excluding weekends and holidays. Shows breakdown per country.</p><div class="tool-input"><div><label>From</label><input type="date" value="${wdFrom}" onchange="setState({wdFrom:this.value})"></div><div><label>To</label><input type="date" value="${wdTo}" onchange="setState({wdTo:this.value})"></div></div>${combinedHtml}<div style="margin-bottom:6px;font-size:11px;font-weight:700;color:var(--dm)">${t.wd_per}</div>${rows}</div>`;
}

function renderBridgeDays(){const t=i18n[state.ln]||i18n.en;const FM=t.mn;
  const{bdCountry,bdYear}=state;
  const bridges=getBridgeDays(bdYear,bdCountry);
  const cx=CT.find(z=>z.c===bdCountry);
  const countryOpts=CT.map(c=>`<option value="${c.c}"${c.c===bdCountry?' selected':''}>${c.f} ${c.n}</option>`).join('');
  const yearOpts=YEARS.map(y=>`<option value="${y}"${y===bdYear?' selected':''}>${y}</option>`).join('');
  const clrs={hol:'#10b981',we:'#64748b',leave:'#f59e0b',work:'transparent'};
  const items=bridges.map(b=>{
    const accentClr=b.leave===0?'#10b981':b.leave<=1?'#f59e0b':'#8b5cf6';
    // Day strip
    const strip=b.strip.map(s=>{
      const bg=s.type==='hol'?clrs.hol:s.type==='we'?clrs.we:s.type==='leave'?clrs.leave:clrs.work;
      const border=s.type==='leave'?'2px solid #f59e0b':s.type==='hol'?'2px solid #10b981':s.type==='we'?'2px solid #475569':'2px dashed #334155';
      const textClr=s.type==='work'?'var(--dm)':'#fff';
      const title=s.type==='hol'?s.holName:s.type==='leave'?'Take leave':s.type==='we'?'Weekend':'Working day';
      return`<div title="${title}" style="display:flex;flex-direction:column;align-items:center;min-width:32px;padding:4px 2px;border-radius:6px;background:${bg};border:${border};color:${textClr}"><span style="font-size:7px;font-weight:600;opacity:.7">${s.label}</span><span style="font-size:12px;font-weight:700">${s.d}</span></div>`;
    }).join('');
    // Badge
    const badge=b.leave===0
      ?`<span style="background:#10b98122;color:#10b981;padding:4px 12px;border-radius:8px;font-size:11px;font-weight:700">🎉 ${b.off} days free!</span>`
      :`<span style="background:${accentClr}18;color:${accentClr};padding:4px 12px;border-radius:8px;font-size:11px;font-weight:700">${b.leave}d leave → ${b.off}d off</span>`;
    return`<div style="background:var(--cd);border-radius:12px;border:1px solid var(--bd);padding:14px;margin-bottom:8px"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:6px;margin-bottom:10px"><div><div style="font-size:13px;font-weight:700;color:${accentClr}">${b.dateLabel}</div><div style="font-size:11px;color:var(--sb);margin-top:2px">${b.name}</div></div>${badge}</div><div style="display:flex;gap:3px;overflow-x:auto;padding-bottom:4px">${strip}</div><div style="margin-top:6px;font-size:10px;color:var(--dm)">${b.type}</div><div style="display:flex;gap:10px;margin-top:6px;font-size:9px;color:var(--dm)">${[['#10b981','Public holiday'],['#f59e0b','Take leave'],['#64748b','Weekend']].map(([c,l])=>`<span style="display:flex;align-items:center;gap:3px"><span style="width:10px;height:10px;border-radius:3px;background:${c}"></span>${l}</span>`).join('')}</div></div>`;
  }).join('')||'<p style="color:var(--dm);font-size:11px;text-align:center;padding:20px">No opportunities found for this country and year.</p>';
  return`<div class="tool-card" style="max-width:900px"><h2>${t.bd_title} — ${bdYear}</h2><p class="desc">Smart leave planning: see exactly which days to take off to maximize consecutive days away. Only high-value opportunities shown.</p><div class="tool-input"><div><label>Country</label><select onchange="setState({bdCountry:this.value})">${countryOpts}</select></div><div><label>Year</label><select onchange="setState({bdYear:+this.value})">${yearOpts}</select></div></div><div style="margin-bottom:12px;font-size:11px;color:var(--dm)">${cx?.f} ${cx?.n} — ${bridges.length} >${t.bd_opp}</div>${items}</div>`;
}

function renderTeamAlerts(){const t=i18n[state.ln]||i18n.en;const FM=t.mn;
  const{sel,yr}=state;const H=ALL[yr]||{};
  let html='<div class="tool-card"><h2>🔔 Team Holiday Alerts — '+yr+'</h2><p class="desc">Monthly impact report showing when team members are off. Red = multiple countries off simultaneously.</p>';
  for(let m=0;m<12;m++){
    const alerts=[];
    for(let d=1;d<=dim(yr,m);d++){
      if(isW(yr,m,d))continue;
      const k=dk(yr,m,d),affected=[];
      sel.forEach((c,i)=>{const h=H[c]?.[k];if(h){const x=CT.find(z=>z.c===c);affected.push({f:x?.f,n:x?.n,hn:h.n,cl:PAL[i%PAL.length]});}});
      if(affected.length>0)alerts.push({d,affected});
    }
    if(!alerts.length)continue;
    html+=`<div class="alert-month"><h4>${FME[m]}</h4>`;
    alerts.forEach(al=>{
      const cls=al.affected.length>=3?'danger':al.affected.length>=2?'warn':'ok';
      html+=`<div class="alert-row ${cls}"><span style="font-weight:700;min-width:24px">${al.d}</span><span style="font-size:10px;color:var(--dm)">${DNE[dw(yr,m,al.d)]}</span>${al.affected.map(a=>`<span style="font-size:10px">${a.f}<span style="color:${a.cl};font-weight:600">${a.n}</span>: ${a.hn}</span>`).join(' · ')}</div>`;
    });
    html+='</div>';
  }
  html+='</div>';
  return html;
}

function renderCompare(){const t=i18n[state.ln]||i18n.en;const FM=t.mn;
  const{sel,cmpFrom,cmpTo}=state;
  const years=YEARS.filter(y=>y>=cmpFrom&&y<=cmpTo);
  const fromOpts=YEARS.map(y=>`<option value="${y}"${y===cmpFrom?' selected':''}>${y}</option>`).join('');
  const toOpts=YEARS.map(y=>`<option value="${y}"${y===cmpTo?' selected':''}>${y}</option>`).join('');
  // Compute stats per country per year
  function yrStats(yr,cc){
    const H=ALL[yr]||{},hols=H[cc]||{};
    let total=Object.keys(hols).length,weekday=0,longWE=0,midWeek=0;
    Object.keys(hols).forEach(k=>{
      const ps=k.split('-'),y=+ps[0],m=+ps[1]-1,d=+ps[2],dow=dw(y,m,d);
      if(dow<5){weekday++;if(dow===0||dow===4)longWE++;if(dow===2)midWeek++;}
    });
    const gH=getHols(yr,[cc]);
    const wks=computeWeeks(yr,[cc],gH);
    const avWeeks=wks.filter(w=>{const wd=w.d.filter(x=>!x.we);return wd.length===5&&wd.every(x=>x.hc===0);}).length;
    const bridges=getBridgeDays(yr,cc).filter(b=>b.leave===0&&b.off>=4).length;
    return{total,weekday,longWE,midWeek,avWeeks,bridges};
  }
  // Build per-country sections
  let html='<div class="tool-card" style="max-width:1200px"><h2>📊 Year-over-Year Comparison</h2><p class="desc">How holidays shift between years for each selected country. Compare long weekends, disruptions, and clear weeks.</p><div class="tool-input"><div><label>From</label><select onchange="setState({cmpFrom:+this.value})">'+fromOpts+'</select></div><div><label>To</label><select onchange="setState({cmpTo:+this.value})">'+toOpts+'</select></div></div>';
  sel.forEach((cc,ci)=>{
    const x=CT.find(z=>z.c===cc);
    html+=`<div style="margin-bottom:16px"><div style="display:flex;align-items:center;gap:8px;margin-bottom:8px"><span style="font-size:18px">${x?.f}</span><span style="font-size:14px;font-weight:700;color:${PAL[ci%PAL.length]}">${x?.n}</span></div>`;
    // Table header
    html+=`<div style="overflow-x:auto"><table style="width:100%;border-collapse:collapse;font-size:11px"><thead><tr style="border-bottom:2px solid var(--bd)"><th style="text-align:left;padding:6px 8px;color:var(--dm);font-size:10px"></th>${years.map(y=>`<th style="text-align:center;padding:6px 8px;font-size:12px;font-weight:700;color:var(--ac)">${y}</th>`).join('')}</tr></thead><tbody>`;
    const data=years.map(y=>yrStats(y,cc));
    const rows=[
      {label:'📅 '+t.cmp_total,key:'total'},
      {label:'💼 '+t.cmp_weekday,key:'weekday'},
      {label:'🏖️ '+t.cmp_longwe,key:'longWE'},
      {label:'⚡ '+t.cmp_mid,key:'midWeek'},
      {label:'🌉 '+t.cmp_free,key:'bridges'},
      {label:'✅ '+t.cmp_clear,key:'avWeeks',green:true}
    ];
    rows.forEach(r=>{
      const vals=data.map(d=>d[r.key]);
      const max=Math.max(...vals),min=Math.min(...vals);
      html+=`<tr style="border-bottom:1px solid var(--bd)"><td style="padding:6px 8px;color:var(--sb)">${r.label}</td>`;
      vals.forEach(v=>{
        const isBest=r.green?(v===max):(r.key==='midWeek'?(v===min):(v===max));
        const clr=isBest?(r.green||r.key==='longWE'||r.key==='bridges'?'#10b981':'#f59e0b'):'var(--tx)';
        html+=`<td style="text-align:center;padding:6px 8px;font-weight:700;font-size:13px;color:${clr}">${v}${isBest&&vals.filter(x=>x===v).length===1?' ⭐':''}</td>`;
      });
      html+='</tr>';
    });
    html+=`</tbody></table></div></div>`;
  });
  // Combined summary
  if(sel.length>=2){
    html+=`<div style="margin-top:8px;padding:14px;background:color-mix(in srgb,var(--ac) 8%,transparent);border-radius:10px;border:1px solid color-mix(in srgb,var(--ac) 20%,transparent)"><div style="font-size:13px;font-weight:700;color:var(--ac);margin-bottom:8px">🌐 Combined team view</div><div class="cmp-grid">`;
    years.forEach(yr=>{
      const gH=getHols(yr,sel);
      const wks=computeWeeks(yr,sel,gH);
      const avWeeks=wks.filter(w=>{const wd=w.d.filter(x=>!x.we);return wd.length===5&&wd.every(x=>x.hc===0);}).length;
      let totalImpact=0;
      for(let m=0;m<12;m++)for(let d=1;d<=dim(yr,m);d++){if(!isW(yr,m,d)&&gH(yr,m,d).length)totalImpact++;}
      html+=`<div class="cmp-card"><h3>${yr}</h3><div class="cp-stats"><div class="cp-stat"><div class="num">${totalImpact}</div><div class="lbl">Days any team member off</div></div><div class="cp-stat"><div class="num" style="color:#10b981">${avWeeks}</div><div class="lbl">Everyone-available weeks</div></div></div></div>`;
    });
    html+='</div></div>';
  }
  html+='</div>';
  return html;
}

function renderHeatModal(yr){const L=i18n[state.ln]||i18n.en;const FM=L.mn;const{sel,heatAll}=state;const codes=heatAll?CT.map(c=>c.c):sel;const gH=getHols(yr,codes);const wks=computeWeeks(yr,codes,gH);const mx=codes.length*5;const cNames=heatAll?'all '+CT.length+' European countries':sel.map(c=>{const x=CT.find(z=>z.c===c);return x?x.f+' '+x.n:'';}).join(', ');const cells=wks.map(w=>{const wd=w.d.filter(x=>!x.we&&x.hc>0),imp=wd.reduce((s,x)=>s+x.hc,0),p=mx>0?imp/mx:0;const bg=imp===0?'var(--tb)':p>.3?`rgba(239,68,68,${(.35+p*.55).toFixed(2)})`:p>.12?`rgba(245,158,11,${(.3+p*.5).toFixed(2)})`:`rgba(34,197,94,${(.2+p*.5).toFixed(2)})`;return`<div class="heat-cell" style="width:calc(${(100/53).toFixed(2)}% - 3px);background:${bg}" title="Wk ${w.s.d} ${MN[w.s.m]}: ${imp} holiday-days"></div>`;}).join('');const mBars=[];for(let m=0;m<12;m++){let t=0;for(let d=1;d<=dim(yr,m);d++){if(!isW(yr,m,d))t+=gH(yr,m,d).length;}mBars.push({m,t});}const mxM=Math.max(...mBars.map(b=>b.t),1);const barH=mBars.map(b=>{const p=(b.t/mxM*100).toFixed(0),clr=b.t/mxM>.5?'#ef4444':b.t/mxM>.25?'#f59e0b':'#10b981';return`<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px"><span style="width:30px;font-size:11px;font-weight:600;text-align:right">${MN[b.m]}</span><div style="flex:1;height:18px;background:var(--dy);border-radius:4px;overflow:hidden"><div style="height:100%;width:${p}%;background:${clr};border-radius:4px"></div></div><span style="width:30px;font-size:10px;font-weight:700;color:${clr}">${b.t}</span></div>`;}).join('');const toggleBtn=`<button onclick="setState({heatAll:${!heatAll}})" style="padding:6px 14px;border-radius:7px;border:none;font-size:11px;font-weight:600;cursor:pointer;background:${heatAll?'var(--ab)':'#f59e0b22'};color:${heatAll?'var(--at)':'#f59e0b'};margin-bottom:12px">${heatAll?'← Show selected countries only':'🌍 Show for all '+CT.length+' countries'}</button>`;return`<div class="modal-overlay" onclick="if(event.target===this)setState({modal:null})"><div class="modal"><button class="modal-close" onclick="setState({modal:null})">✕</button><h2 style="font-size:18px;font-weight:700;margin-bottom:4px">🔥 Heat Distribution — ${yr}</h2><p style="font-size:11px;color:var(--dm);margin-bottom:8px">Non-working day density for ${cNames}.</p>${toggleBtn}<h3 style="font-size:13px;font-weight:700;margin-bottom:6px">Weekly Heatmap</h3><div style="display:flex;margin-bottom:4px">${MN.map((m,i)=>`<div style="flex:${dim(yr,i)} 0 0;font-size:8px;color:var(--dm);font-weight:600;text-align:center">${m}</div>`).join('')}</div><div class="heat-chart">${cells}</div><div style="display:flex;gap:12px;justify-content:center;font-size:10px;color:var(--dm);margin:8px 0 16px">${[['var(--tb)','Clear'],['rgba(34,197,94,.4)','Low'],['rgba(245,158,11,.5)','Medium'],['rgba(239,68,68,.7)','High']].map(([bg,l])=>`<span style="display:flex;align-items:center;gap:4px"><span style="width:12px;height:12px;border-radius:3px;background:${bg}"></span>${l}</span>`).join('')}</div><h3 style="font-size:13px;font-weight:700;margin-bottom:8px">Monthly Impact (${codes.length} countries, weekdays)</h3>${barH}</div></div>`;}

function renderAllModal(yr){const t=i18n[state.ln]||i18n.en;const FM=t.mn;const H=ALL[yr]||{},{acOpen}=state;let c2='';if(acOpen){const c=CT.find(x=>x.c===acOpen),hols=H[acOpen]||{},sorted=Object.entries(hols).sort(([a],[b])=>a.localeCompare(b));
// Enhanced country profile with stats
const bridges=getBridgeDays(yr,acOpen);const goodBridges=bridges.filter(b=>b.leave<=1);
const wdCount=countWorkingDays(yr+'-01-01',yr+'-12-31',[acOpen]);
const li=sorted.map(([dt,h])=>{const ps=dt.split('-'),m=+ps[1]-1,d=+ps[2];return`<div class="ac-list-item"><span class="date">${d} ${FME[m]}</span><span class="name">${h.n}</span><span class="eng">${h.e!==h.n?h.e:''}</span></div>`;}).join('');
let mc='';for(let m=0;m<12;m++){const days=dim(yr,m),offset=dw(yr,m,1);let cl2=DL.map(d=>`<div class="hd">${d[0]}</div>`).join('');for(let i=0;i<offset;i++)cl2+='<div></div>';for(let d=1;d<=days;d++){const k=dk(yr,m,d),we=isW(yr,m,d),isH=!!hols[k];cl2+=`<div class="${isH?'hday':we?'weday':''}" style="padding:1px">${d}</div>`;}mc+=`<div class="ac-mini-month"><h4>${MN[m]}</h4><div class="ac-mini-grid">${cl2}</div></div>`;}
const bridgeHtml=goodBridges.slice(0,5).map(b=>{return`<div class="cp-bridge"><span style="color:var(--gn);font-weight:700">${b.dateLabel}</span><span>${b.name}</span><span style="color:var(--dm)">${b.type}</span></div>`;}).join('');
c2=`<button style="background:var(--ab);color:var(--at);border:none;padding:6px 14px;border-radius:7px;font-size:11px;font-weight:600;cursor:pointer;margin-bottom:12px" onclick="setState({acOpen:null})">${t.back}</button><div style="display:flex;align-items:center;gap:10px;margin-bottom:12px"><span style="font-size:28px">${c.f}</span><div><div style="font-size:18px;font-weight:700">${c.n}</div><div style="font-size:12px;color:var(--dm)">${sorted.length} ${t.ac_hol} ${t.ac_in} ${yr}</div></div><button class="bbtn bbtn-ics" style="margin-left:auto;padding:6px 12px;font-size:10px" onclick="generateICS(['${acOpen}'],${yr})">📥 ${t.ac_dl}</button></div><div class="cp-stats"><div class="cp-stat"><div class="num">${sorted.length}</div><div class="lbl">${t.ac_pub}</div></div><div class="cp-stat"><div class="num">${wdCount.wd}</div><div class="lbl">${t.ac_wd}</div></div><div class="cp-stat"><div class="num" style="color:var(--gn)">${goodBridges.length}</div><div class="lbl">${t.ac_bridge}</div></div></div>${bridgeHtml?'<h3 style="font-size:12px;font-weight:700;margin:10px 0 4px">🌉 ${t.ac_best}</h3>'+bridgeHtml:''}<h3 style="font-size:13px;font-weight:700;margin:12px 0 6px">📋 ${t.ac_list}</h3><div class="ac-list">${li}</div><h3 style="font-size:13px;font-weight:700;margin:14px 0 6px">📅 ${t.ac_calendar}</h3><div class="ac-mini-cal">${mc}</div>`;}else{c2=CT.map(c=>{const cnt=H[c.c]?Object.keys(H[c.c]).length:0;return`<div class="ac-country" onclick="setState({acOpen:'${c.c}'})"><span class="flag">${c.f}</span><span class="cname">${c.n}</span><span class="cnt">${cnt} holidays</span></div>`;}).join('');}return`<div class="modal-overlay" onclick="if(event.target===this)setState({modal:null,acOpen:null})"><div class="modal"><button class="modal-close" onclick="setState({modal:null,acOpen:null})">✕</button><h2 style="font-size:18px;font-weight:700;margin-bottom:4px">🌍 Non-Working Days — All European Countries — ${yr}</h2><p style="font-size:11px;color:var(--dm);margin-bottom:14px">Tap any country for full profile, holiday list, calendar, and bridge days.</p>${c2}</div></div>`;}

// ===== MAIN RENDER =====
function render(){
const{sel,yr,th,ln,vw,sm,op,q,modal}=state;
const t=i18n[ln]||i18n.en;const FM=t.mn;const DLE=t.dn;
document.body.setAttribute('data-theme',th);
const gH=getHols(yr,sel),H=ALL[yr]||{};
const wks=computeWeeks(yr,sel,gH);const ov=[],tot={};sel.forEach(c=>{tot[c]=H[c]?Object.keys(H[c]).length:0;});for(let m=0;m<12;m++)for(let d=1;d<=dim(yr,m);d++){const hs=gH(yr,m,d);if(hs.length>=2)ov.push({m,d,hs});}
const wst=wks.map(w=>{const wd=w.d.filter(x=>!x.we&&x.hc>0);return{...w,imp:wd.reduce((z,x)=>z+x.hc,0)};}).filter(w=>w.imp>0).sort((a,b)=>b.imp-a.imp).slice(0,6);
const lng=[];for(let m=0;m<12;m++)for(let d=1;d<=dim(yr,m);d++){const dwd=dw(yr,m,d),hs=gH(yr,m,d);if(hs.length>0&&[0,3,4].includes(dwd))lng.push({m,d,hs,tp:dwd===4?'Fri→3d':dwd===3?'Thu→br':'Mon→3d'});}
const av=wks.filter(w=>{const wd=w.d.filter(x=>!x.we);return wd.length===5&&wd.every(x=>x.hc===0);});
const months=sm!==null?[sm]:Array.from({length:12},(_,i)=>i);const calH=months.map(m=>renderCalMonth(yr,m,gH,sm!==null)).join('');
const ft=q?CT.filter(c=>c.n.toLowerCase().includes(q.toLowerCase())||c.c.toLowerCase().includes(q.toLowerCase())):CT;

let html=`<header style="text-align:center"><h1>🗓️ ${t.title}</h1><p class="sub">${t.sub.replace('{n}',CT.length)}</p></header>`;
// Year + theme + language controls
html+=`<div class="ctrls"><select onchange="setState({yr:+this.value,sm:null})" style="padding:4px 10px;border-radius:var(--r-sm);border:1px solid var(--glass-bd);background:var(--glass);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);color:var(--ac);font-size:13px;font-weight:700;cursor:pointer;outline:none;font-family:inherit">${YEARS.map(y=>`<option value="${y}"${y===yr?' selected':''}>${y}</option>`).join('')}</select><span class="sep"></span>${[['dark','🌙'],['pink','🌸'],['light','☀️']].map(([i,l])=>`<button class="thm${th===i?' on':''}" onclick="setState({th:'${i}'})">${l}</button>`).join('')}<span class="sep"></span>${['en','fr','de','es','ro'].map(x=>`<button class="thm${ln===x?' on':''}" onclick="setState({ln:'${x}'})" style="font-size:10px!important;font-weight:700!important;text-transform:uppercase">${x}</button>`).join('')}</div>`;
// Country pills
html+=`<div class="pills">${sel.map((c,i)=>{const x=CT.find(z=>z.c===c);return`<button class="pill" style="background:${PAL[i%PAL.length]}18;color:${PAL[i%PAL.length]}" onclick="setState({sel:state.sel.filter(x=>x!=='${c}')})"><span style="font-size:13px">${x?.f}</span>${x?.n}<span class="x">✕</span></button>`;}).join('')}<button class="add-btn" onclick="setState({op:!state.op})">${t.add}</button></div>`;
if(op){html+=`<div class="picker"><input type="text" placeholder="${t.search}" value="${q}" oninput="setState({q:this.value})"><div class="picker-grid">${ft.map(c=>{const on=sel.includes(c.c);return`<button class="picker-btn${on?' on':''}" onclick="setState({sel:state.sel.includes('${c.c}')?state.sel.filter(x=>x!=='${c.c}'):[...state.sel,'${c.c}']})"><span style="font-size:12px">${c.f}</span>${c.n}${on?'✓':''}</button>`;}).join('')}</div><button class="picker-done" onclick="setState({op:false,q:''})">${t.done}</button></div>`;}
// Navigation
html+=`<div class="nav-wrap"><div class="tabs">${[['cal',t.t_cal],['ins',t.t_ins],['av',t.t_av]].map(([v,l])=>`<button class="${vw===v?'on':''}" onclick="setState({vw:'${v}'})">${l}</button>`).join('')}</div><br><div class="tabs tools">${[['wd',t.t_wd],['bd',t.t_bd],['ta',t.t_ta],['cmp',t.t_cmp]].map(([v,l])=>`<button class="${vw===v?'on':''}" onclick="setState({vw:'${v}'})">${l}</button>`).join('')}</div></div>`;
// Views
if(vw==='cal'){html+=`<div class="mf"><button class="${sm===null?'on':''}" onclick="setState({sm:null})">${t.all}</button>${MN.map((m,i)=>`<button class="${sm===i?'on':''}" onclick="setState({sm:${i}})">${m}</button>`).join('')}</div><div class="cal-grid${sm!==null?' single':''}">${calH}</div>`;}
if(vw==='ins'){const bH=sel.map((c,i)=>{const x=CT.find(z=>z.c===c),n=tot[c]||0,mx=Math.max(...Object.values(tot),1);return`<div class="bar-row"><span style="font-size:14px">${x?.f}</span><div style="flex:1"><div style="display:flex;justify-content:space-between;margin-bottom:2px"><span style="font-size:11px;font-weight:600">${x?.n}</span><span style="font-size:11px;font-weight:700;color:${PAL[i%PAL.length]}">${n}</span></div><div class="bar-track"><div class="bar-fill" style="width:${(n/mx*100)}%;background:${PAL[i%PAL.length]}"></div></div></div></div>`;}).join('');const ovH=ov.map(o=>`<div class="ov-item"><div style="font-size:10px;font-weight:700;color:var(--ac);margin-bottom:2px">${o.d} ${FM[o.m]}</div>${o.hs.map(h=>`<div style="font-size:10px;color:var(--sb)">${h.f} <span style="color:${h.cl};font-weight:600">${h.cn}</span> — ${h.n}</div>`).join('')}</div>`).join('');const wH=wst.map((w,i)=>`<div class="wst-item" style="background:${i<3?'#ef444412':'var(--dy)'};border-color:${i<3?'#ef444422':'var(--bd)'}"><span style="font-size:11px;font-weight:600;color:${i<3?'#f87171':'var(--tx)'}">${t.wk} ${w.s.d} ${MN[w.s.m]}</span><span style="padding:2px 6px;border-radius:5px;font-size:10px;font-weight:700;background:${i<3?'#ef444422':'#f59e0b18'};color:${i<3?'#f87171':'#f59e0b'}">${w.imp}</span></div>`).join('');const lH=lng.slice(0,10).map(l=>`<div class="lng-item"><div style="font-size:11px;font-weight:700;color:#10b981">${l.d} ${FM[l.m]} <span style="font-size:9px;font-weight:400;color:#6ee7b7">${l.tp}</span></div><div style="font-size:10px;color:var(--sb)">${l.hs.map(h=>h.f+' '+h.n).join(', ')}</div></div>`).join('');html+=`<div class="igrid"><div class="icard"><h3>📊 ${t.hpc} — ${yr}</h3>${bH}</div><div class="icard"><h3>🔀 ${t.overlaps} (${ov.length})</h3><div style="max-height:250px;overflow-y:auto">${ovH||'<p style="color:var(--dm);font-size:10px">—</p>'}</div></div><div class="icard"><h3>⚠️ ${t.worst}</h3>${wH}</div><div class="icard"><h3>🏖️ ${t.longwe}</h3><div style="max-height:250px;overflow-y:auto">${lH}</div></div></div>`;}
if(vw==='av'){html+=`<div class="icard" style="background:var(--cd);border-radius:12px;border:1px solid var(--bd);padding:16px"><h2 style="font-size:15px;font-weight:700;margin-bottom:3px">✅ ${t.av_title} — ${yr}</h2><p style="font-size:11px;color:var(--dm);margin-bottom:10px">${t.av_desc}</p>${av.length?`<p style="font-size:11px;color:#10b981;font-weight:700;margin-bottom:8px">${t.av_found.replace('{n}',av.length)}</p>`:`<p style="color:var(--dm);font-size:11px">${t.av_none}</p>`}<div class="av-grid">${av.map(w=>`<div class="av-card"><div>${t.wk} ${w.s.d} ${FM[w.s.m]}</div></div>`).join('')}</div></div>`;}
if(vw==='wd')html+=renderWorkingDays();
if(vw==='bd')html+=renderBridgeDays();
if(vw==='ta')html+=renderTeamAlerts();
if(vw==='cmp')html+=renderCompare();
// Bottom buttons
html+=`<div class="bottom-btns"><button class="bbtn bbtn-pdf" onclick="exportPDF(state.sel,state.yr)">${t.btn_pdf}</button><button class="bbtn bbtn-ics" onclick="generateICS(state.sel,state.yr)">${t.btn_ics}</button><button class="bbtn bbtn-heat" onclick="setState({modal:'heat'})">${t.btn_heat}</button><button class="bbtn bbtn-all" onclick="setState({modal:'all',acOpen:null})">${t.btn_all}</button></div>`;
html+=`<footer>Built by <a href="https://linkedin.com/in/stanese/" target="_blank" style="color:var(--ac);text-decoration:none;font-weight:600">Adrian Stanese</a></footer>`;
if(modal==='heat')html+=renderHeatModal(yr);
if(modal==='all')html+=renderAllModal(yr);
document.getElementById('app').innerHTML=html;
}

// ===== GEO-DETECTION =====
(async function(){
  try{
    const r=await fetch('https://ipapi.co/json/',{signal:AbortSignal.timeout(3000)});
    const d=await r.json();
    const cc=d.country_code;
    if(cc&&ISO_MAP[cc]){
      state.sel=[ISO_MAP[cc]];
      state.bdCountry=ISO_MAP[cc];
    }
  }catch(e){}
  render();
})();
