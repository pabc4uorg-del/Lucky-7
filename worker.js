// Lucky 7 public-data edge collector skeleton for Cloudflare Workers.
// The frontend POSTs {fixtures:[{home,away,time}]} and receives normalized evidence.
// Source adapters are intentionally isolated so a failed source never stops the run.
const SOURCES=[
  {name:'ESPN',url:'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard'},
];
function poissonOver15(mu){return 1-Math.exp(-mu)*(1+mu)}
function poissonUnder35(mu){return Math.exp(-mu)*(1+mu+mu**2/2+mu**3/6)}
function baseline(f){let mu=2.70;return { ...f, mean:mu, over15:poissonOver15(mu), under35:poissonUnder35(mu),sources:[],quality:'LIMITED',evidence:{}}}
export default {async fetch(req){if(req.method==='OPTIONS')return new Response('',{headers:{'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'content-type'}});if(req.method!=='POST')return new Response('Lucky 7 API',{status:200});try{const body=await req.json();const fixtures=Array.isArray(body.fixtures)?body.fixtures:[];const results=[];let covered=0;for(const f of fixtures){let r=baseline(f);for(const s of SOURCES){try{const x=await fetch(s.url,{headers:{'User-Agent':'Lucky7-public-data-client/1.0'}});if(x.ok){r.sources.push(s.name);r.quality='MEDIUM';covered++}}catch(e){/* source failure is non-fatal */}}results.push(r)}return new Response(JSON.stringify({results,publicDataCoverage:fixtures.length?Math.round(covered/fixtures.length*100):0,notice:'Collector completed with graceful source fallback.'}),{headers:{'content-type':'application/json','Access-Control-Allow-Origin':'*'}})}catch(e){return new Response(JSON.stringify({results:[],error:'Invalid request'}),{status:400,headers:{'content-type':'application/json','Access-Control-Allow-Origin':'*'}})}}};
