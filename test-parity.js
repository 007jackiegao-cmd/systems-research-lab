'use strict';
const assert=require('node:assert/strict');
const {execFileSync}=require('node:child_process');
const {simulate}=require('./research-ui.js');
const cases=[{seed:17,lookback:21,cost:5},{seed:41,lookback:10,cost:10},{seed:17,lookback:50,cost:0},{seed:9,lookback:2,cost:20}];
for(const c of cases){
 const script=`import json;from backtest import example;print(json.dumps(example(${c.seed},${c.lookback},${c.cost}),allow_nan=False))`;
 const reference=JSON.parse(execFileSync('python3',['-c',script],{cwd:__dirname,encoding:'utf8'}));
 const js=simulate(reference.prices,c.lookback,c.cost);
 for(const [a,b] of [['positions','positions'],['net','net_returns'],['equity','equity'],['dd','drawdown'],['vol','rolling_volatility']]){
  assert.equal(js[a].length,reference[b].length);
  js[a].forEach((value,i)=>{const expected=reference[b][i];if(value===null||expected===null)assert.equal(value,expected);else assert.ok(Math.abs(value-expected)<1e-12,`${a}[${i}] diverged`);});
 }
 assert.equal(js.changes,reference.metrics.exposure_changes);
 console.log(`Parity passed: seed=${c.seed}, lookback=${c.lookback}, cost=${c.cost} bps`);
}
console.log('4 Python/JavaScript parity configurations passed.');
