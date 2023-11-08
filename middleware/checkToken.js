import {request, response  } from "express";
import bcrypt from "bcrypt"
// To create Data 
const secret = "thisIsMySecretKey"
export async  function validateToken(request,response,next){
 const salt = 10 
 let validateCsrf
const token = request.body.token
 if(!validateCsrf){
 try {
        validateCsrf=  await bcrypt.compare(secret,token)
        if(validateCsrf){
         console.log('token validation successful')
            next()
        }else{
            response.status(409).json({err:'csrf token is not valid'})
            
        }
    } catch (error) {
        validateCsrf=false
    }
}
   

    }
