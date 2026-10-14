"use strict";
// Momentum calculation and research charts.
function simulate(prices,lookback,costBps){
 if(!Number.isInteger(lookback)||lookback<1||!Number.isFinite(costBps)||costBps<0||costBps>1000||prices.length<2||prices.some(p=>!Number.isFinite(p)||p<=0))throw Error('Invalid experiment input');
 const n=prices.length,positions=Array(n).fill(0),net=Array(n).fill(0),equity=Array(n).fill(1),dd=Array(n).fill(0),vol=Array(n).fill(null);
 let peak=1,changes=0;
 for(let t=1;t<n;t++){
  if(t-1>=lookback)positions[t]=prices[t-1]/prices[t-1-lookback]>1?1:0;
  const turnover=Math.abs(positions[t]-positions[t-1]);changes+=turnover>0?1:0;
  net[t]=positions[t]*(prices[t]/prices[t-1]-1)-turnover*costBps/10000;
  if(1+net[t]<=0)throw Error('Non-positive equity under this simplified convention');
  equity[t]=equity[t-1]*(1+net[t]);peak=Math.max(peak,equity[t]);dd[t]=equity[t]/peak-1;
  const window=net.slice(Math.max(1,t-lookback+1),t+1);
  if(window.length>=lookback&&window.length>=2){const mean=window.reduce((a,b)=>a+b,0)/window.length;vol[t]=Math.sqrt(window.reduce((a,b)=>a+(b-mean)**2,0)/(window.length-1)*252);}
 }
 return {equity,positions,net,dd,vol,changes};
}
if(typeof module!=='undefined'&&module.exports)module.exports={simulate};
function chart(series,colors){
 const width=900,height=235,left=45,right=15,top=15,bottom=28;
 const values=series.flat().filter(x=>x!==null),low=Math.min(...values),high=Math.max(...values),range=high-low||1;
 const y=v=>top+(high-v)/range*(height-top-bottom),x=i=>left+i/(series[0].length-1)*(width-left-right);
 let body='';
 for(let row=0;row<5;row++){const v=low+range*row/4,yy=y(v);body+=`<line x1="${left}" y1="${yy}" x2="${width-right}" y2="${yy}" stroke="#293b49"/><text x="${left-8}" y="${yy+4}" fill="#99afbe" font-size="10" text-anchor="end">${v.toFixed(1)}</text>`;}
 series.forEach((items,index)=>{const points=items.map((v,i)=>v===null?null:`${x(i)},${y(v)}`).filter(Boolean).join(' ');body+=`<polyline fill="none" stroke="${colors[index]}" stroke-width="1.8" points="${points}"/>`;});
 for(let i=0;i<=4;i++){const t=Math.round(i/4*(series[0].length-1));body+=`<text x="${x(t)}" y="${height-7}" fill="#99afbe" font-size="10" text-anchor="middle">${t}</text>`;}
 return `<svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Calculated synthetic research series by period">${body}</svg>`;
}
if(typeof document!=='undefined'){
 let prices=[];
 const $=id=>document.getElementById(id);
 function render(){
  try{
   const lookback=Number($('lookback').value),cost=Number($('cost').value),r=simulate(prices,lookback,cost);
   $('net-result').textContent=((r.equity.at(-1)-1)*100).toFixed(2)+'%';
   $('dd-result').textContent=(Math.min(...r.dd)*100).toFixed(2)+'%';$('trades-result').textContent=String(r.changes);
   $('sample-count').textContent=prices.length+' generated observations';$('cost-audit').textContent=cost+' basis points / unit turnover';
   $('equity-chart').innerHTML=chart([r.equity.map(x=>x*100),prices.map(p=>p/prices[0]*100)],['#6be0d6','#b7a2e6']);
   $('drawdown-chart').innerHTML=chart([r.dd.map(x=>x*100)],['#b7a2e6']);$('vol-chart').innerHTML=chart([r.vol.map(x=>x===null?null:x*100)],['#6be0d6']);
   $('data-table').innerHTML='<table><thead><tr><th>Period</th><th>Price</th><th>Exposure</th><th>Net return</th></tr></thead><tbody>'+prices.slice(0,12).map((p,i)=>`<tr><td>${i}</td><td>${p.toFixed(4)}</td><td>${r.positions[i]}</td><td>${(r.net[i]*100).toFixed(3)}%</td></tr>`).join('')+'</tbody></table>';
   $('error').textContent='';
  }catch(e){$('error').textContent=e.message;}
 }
 $('controls').addEventListener('submit',e=>{e.preventDefault();render();});
 document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('[data-view]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));for(const view of ['equity','risk','data'])$(view+'-view').hidden=view!==btn.dataset.view;}));
 fetch(window.QUANT_DATA_URL || 'demo-run.json').then(r=>{if(!r.ok)throw Error('Sample file unavailable');return r.json();}).then(r=>{prices=r.prices;render();}).catch(e=>{$('error').textContent='Could not load the synthetic run: '+e.message;});
}
