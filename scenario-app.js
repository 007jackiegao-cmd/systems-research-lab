"use strict";
const events=[
 {id:'DEMO-001',label:'Port scheduling constraint',category:'logistics',shock:3,lat:51.9,lng:4.5,note:'Reduced port scheduling capacity.'},
 {id:'DEMO-002',label:'Grid maintenance window',category:'energy',shock:2,lat:1.3,lng:103.8,note:'Planned maintenance reduces grid availability.'},
 {id:'DEMO-003',label:'Weather recovery window',category:'environment',shock:-2,lat:34,lng:-118.2,note:'Weather conditions return to baseline.'},
 {id:'DEMO-004',label:'Freight capacity recovery',category:'logistics',shock:-1,lat:-33.9,lng:151.2,note:'Freight capacity returns to service.'},
 {id:'DEMO-005',label:'Energy supply variability',category:'energy',shock:-1,lat:25.2,lng:55.3,note:'Energy supply varies within the sample scenario.'},
 {id:'DEMO-006',label:'Environmental operating constraint',category:'environment',shock:2,lat:-23.5,lng:-46.6,note:'Environmental conditions constrain operations.'}
];
const exposures=[{id:'LOGISTICS_DEMO',label:'Logistics research basket',weights:{logistics:2,energy:-.4,environment:-.5}},
 {id:'ENERGY_DEMO',label:'Energy research basket',weights:{logistics:-.2,energy:1.7,environment:-.2}},
 {id:'INFRASTRUCTURE_DEMO',label:'Infrastructure research basket',weights:{logistics:.5,energy:-.3,environment:1.1}}];
const $=id=>document.getElementById(id);let filter='all',selected=events[0].id;
const map=L.map('map',{worldCopyJump:true,minZoom:1}).setView([20,8],2);
map.attributionControl.addAttribution('Map geometry: world-atlas');
L.control.scale({imperial:false}).addTo(map);const markers=L.layerGroup().addTo(map);
function render(){
 const visible=events.filter(e=>filter==='all'||e.category===filter);markers.clearLayers();
 for(const ev of visible)L.circleMarker([ev.lat,ev.lng],{radius:ev.id===selected?9:6,color:'#9bd7e0',weight:1.5,fillColor:ev.category==='energy'?'#edba79':'#76d3e0',fillOpacity:.85}).addTo(markers).bindPopup(ev.label+'<br>Synthetic example / '+ev.id).on('click',()=>{selected=ev.id;render();});
 $('events').innerHTML=visible.map(e=>`<button class="event" data-event="${e.id}" aria-pressed="${e.id===selected}">${e.label}<span>${e.category.toUpperCase()} · ${e.id}<br>Manual shock: ${e.shock>0?'+':''}${e.shock} units</span></button>`).join('');
 document.querySelectorAll('[data-event]').forEach(b=>b.addEventListener('click',()=>{selected=b.dataset.event;render();}));
 const result=scenarioImpact(visible,exposures,$('scenario').value);
 $('exposures').innerHTML=result.map(x=>`<div class="exposure"><strong>${x.label}<span>${x.score.toFixed(2)}</span></strong><div class="track"><div class="bar" style="width:${Math.min(100,Math.abs(x.score)*12)}%"></div></div><span class="small ${x.conflict?'warning':''}">${x.conflict?'Opposing components detected':'No opposing components'} · ${x.components.length} sample inputs</span></div>`).join('');
 $('attribution-table').innerHTML='<table><thead><tr><th>Event / category</th>'+result.map(r=>'<th>'+r.label.replace(' research basket','')+'</th>').join('')+'</tr></thead><tbody>'+visible.map(e=>'<tr><td>'+e.id+' / '+e.category+'</td>'+result.map(r=>{const c=r.components.find(x=>x.event===e.id).contribution;return '<td>'+(c>0?'+':'')+c.toFixed(2)+'</td>';}).join('')+'</tr>').join('')+'</tbody></table>';
 const ev=events.find(e=>e.id===selected);$('detail').innerHTML=`<strong>${ev.label}</strong><p>${ev.note}</p><p class="small">Source: synthetic fixture<br>ID: ${ev.id}<br>Category: ${ev.category}<br>Shock: ${ev.shock} arbitrary units<br></p>`;
}
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;const visible=events.filter(e=>filter==='all'||e.category===filter);if(!visible.some(e=>e.id===selected))selected=visible[0].id;document.querySelectorAll('[data-filter]').forEach(x=>x.setAttribute('aria-pressed',String(x===b)));render();}));
$('scenario').addEventListener('change',render);render();
fetch(window.SCENARIO_MAP_URL || 'world-countries.json').then(r=>{if(!r.ok)throw Error('Map file unavailable');return r.json();}).then(world=>{
 const countries=topojson.feature(world,world.objects.countries);L.geoJSON(countries,{style:{color:'#405a6e',weight:.6,fillColor:'#1b3446',fillOpacity:.9},interactive:false}).addTo(map);markers.eachLayer(layer=>layer.bringToFront());$('map-state').textContent='World map loaded · Sample events';
}).catch(()=>{$('map-state').textContent='Map unavailable. Event controls remain usable.';});
