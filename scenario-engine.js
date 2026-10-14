"use strict";
// Weighted event contributions under a scenario multiplier.
const SCENARIOS={base:1,disruption:1.6,recovery:.4};
function scenarioImpact(events,exposures,scenario='base'){
 if(!(scenario in SCENARIOS))throw Error('Unknown scenario');
 if(!Array.isArray(events)||!Array.isArray(exposures))throw Error('Arrays required');
 const seen=new Set();
 const unique=events.filter(ev=>{if(!ev.id||!Number.isFinite(ev.shock))throw Error('Invalid event');if(seen.has(ev.id))return false;seen.add(ev.id);return true;});
 return exposures.map(item=>{
  if(!item.id||!item.weights||Object.values(item.weights).some(x=>!Number.isFinite(x)))throw Error('Invalid exposure');
  const components=unique.map(ev=>({event:ev.id,contribution:(item.weights[ev.category]||0)*ev.shock*SCENARIOS[scenario]}));
  return {id:item.id,label:item.label,score:components.reduce((n,x)=>n+x.contribution,0),components,
   conflict:components.some(x=>x.contribution>0)&&components.some(x=>x.contribution<0)};
 });
}
if(typeof module!=='undefined'&&module.exports)module.exports={scenarioImpact,SCENARIOS};

if(typeof window!=='undefined')window.scenarioImpact=scenarioImpact;
