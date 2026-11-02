import {initialProducts,json,products,sign,validSession} from "./_shared.js";
export async function onRequest({request,env}){
 const url=new URL(request.url), action=url.searchParams.get("action");
 if(request.method==="POST"&&action==="login"){
  const body=await request.json().catch(()=>({}));
  if(!env.ADMIN_PASSWORD||typeof body.password!=="string"||body.password!==env.ADMIN_PASSWORD)return json({error:"Incorrect password."},401);
  if(!env.SESSION_SECRET)return json({error:"Admin security is not configured yet."},503);
  const expires=String(Date.now()+8*60*60*1000),token=expires+"."+await sign(expires,env.SESSION_SECRET);
  return json({ok:true},200,{"set-cookie":`pushpanjali_admin=${encodeURIComponent(token)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=28800`});
 }
 if(action==="logout"&&request.method==="POST")return json({ok:true},200,{"set-cookie":"pushpanjali_admin=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0"});
 if(!await validSession(request,env))return json({error:"Please sign in first."},401);
 if(request.method==="GET")return json({products:await products(env)});
 if(request.method==="PUT"){
  const body=await request.json().catch(()=>null);if(!body||!Array.isArray(body.products))return json({error:"Invalid product list."},400);
  if(body.products.length>100)return json({error:"Too many products."},400);
  const cleaned=body.products.map((p,i)=>({id:String(p.id||`item-${i}`).slice(0,80),name:String(p.name||"Product").slice(0,100),price:Math.max(0,Math.round(Number(p.price)||0)),description:String(p.description||"").slice(0,240),image:typeof p.image==="string"&&p.image.startsWith("data:image/")&&p.image.length<1800000?p.image:""}));
  await env.PUSHPANJALI_KV.put("products",JSON.stringify(cleaned));return json({ok:true,products:cleaned});
 }
 return json({error:"Method not allowed."},405);
}
