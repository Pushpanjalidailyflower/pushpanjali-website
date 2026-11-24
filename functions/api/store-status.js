import {storeStatus,json} from "./_shared.js";
export async function onRequestGet({env}){try{return json(await storeStatus(env));}catch{return json({isOpen:false,message:"We are temporarily unable to accept orders. Please try again later."},500);}}
