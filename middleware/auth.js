
import {request, response } from "express";
import { users } from "../Database/schema.js";
import  jsonwebtoken   from "jsonwebtoken";

const secret = "thisIsMySecretKey"
const JWT =jsonwebtoken 

export async function authMidlWare(request, response , next){
    const cookie = request.cookies.jwt
    const role = request.params.role


try {
    if(cookie){
        const decoded=  await JWT.verify(cookie,secret)
        if(role== decoded.role){  
            // console.log('this is auth middle:'+role);
                next()
            }else{
        response.status(409).json({err:"you are not authorized to visit this page as"+role})      
                
            }
        }else{
        response.status(403).json({err:"You need to login first"})
        }
    }catch (error) {
  
        response.status(409).json({err:"Unexpected error this could due to the server is down right now"})      
    }
}