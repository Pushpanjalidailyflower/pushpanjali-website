import { products, categories, json } from "./_shared.js";
export async function onRequestGet({env}){try{return json({products:await products(env),categories:await categories(env)});}catch{return json({error:"Could not load products."},500);}}
