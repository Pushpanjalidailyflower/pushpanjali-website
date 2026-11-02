import { products, json } from "./_shared.js";
export async function onRequestGet({env}){try{return json({products:await products(env)});}catch{return json({error:"Could not load products."},500);}}
