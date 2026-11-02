export const initialProducts = [
  {id:"belpata",name:"Belpata (6pc)",price:12,description:"Fresh bel leaves for daily puja.",image:""},
  {id:"kucho-phool",name:"Kucho Phool",price:39,description:"Fresh assorted flowers for puja.",image:""},
  {id:"aam-pata",name:"Aam Pata",price:5,description:"Fresh mango leaves for puja.",image:""},
  {id:"akanda-mala",name:"Akanda Mala",price:15,description:"Traditional Akanda flower garland.",image:""},
  {id:"chati-mala",name:"Chati Mala",price:19,description:"Fresh puja garland.",image:""},
  {id:"orange-gandha-mala",name:"Orange Gandha Mala",price:45,description:"Orange marigold garland.",image:""},
  {id:"yellow-gandha-mala",name:"Yellow Gandha Mala",price:59,description:"Yellow marigold garland.",image:""},
  {id:"normal-joba-mala",name:"Normal Joba Mala",price:15,description:"Fresh hibiscus garland.",image:""},
  {id:"joba-mala-108",name:"Joba Mala (108)",price:149,description:"108-flower hibiscus garland.",image:""},
  {id:"pink-lotus",name:"Pink Lotus",price:29,description:"Fresh pink lotus for puja.",image:""},
  {id:"pan-pata",name:"Pan Pata (5pcs)",price:15,description:"Fresh betel leaves.",image:""},
  {id:"rajanigandha-mala",name:"Rajanigandha Mala",price:250,description:"Fragrant tuberose garland.",image:""}
];
export const json=(data,status=200,headers={})=>new Response(JSON.stringify(data),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store",...headers}});
export async function products(env){const saved=await env.PUSHPANJALI_KV.get("products",{type:"json"});return Array.isArray(saved)?saved:initialProducts;}
export async function sign(value,secret){const key=await crypto.subtle.importKey("raw",new TextEncoder().encode(secret),{name:"HMAC",hash:"SHA-256"},false,["sign"]);const sig=await crypto.subtle.sign("HMAC",key,new TextEncoder().encode(value));return [...new Uint8Array(sig)].map(b=>b.toString(16).padStart(2,"0")).join("");}
export async function validSession(request,env){if(!env.SESSION_SECRET)return false;const cookie=request.headers.get("cookie")||"";const pair=cookie.split(";").map(x=>x.trim()).find(x=>x.startsWith("pushpanjali_admin="));if(!pair)return false;let token;try{token=decodeURIComponent(pair.split("=").slice(1).join("="));}catch{return false;}const [expires,signature]=token.split(".");if(!expires||!signature||Number(expires)<Date.now())return false;const expected=await sign(expires,env.SESSION_SECRET);return signature===expected;}
