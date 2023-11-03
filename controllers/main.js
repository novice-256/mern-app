import {request, response } from "express";
import { users } from "../Database/schema.js";
import bcrypt from "bcrypt"
import Joi from "joi";
import  jsonwebtoken   from "jsonwebtoken";
import { unlink ,existsSync} from 'node:fs';
import { readdir } from 'node:fs/promises';
const validateUser = Joi.object({
    name: Joi.string().required(),
    token: Joi.string().required(),
    file: Joi.object().optional(),

})
console.log('i am recieving your request');
const clearStorage = async()=>{
    const pathToDelete =`public/Images/`
     const data = await  users.find({}).select(`file`)
    const file=  await readdir(pathToDelete)

    for (const dbItem of data) {
        for (const fileItem of file) {
            if(fileItem === dbItem.file.filename){
                file.splice(file.indexOf(fileItem),1)
            }
        }
        
    }    
    if(file.length >0){ 
        file.forEach(async (delItem)=>{
            await unlink(pathToDelete+delItem,(err)=>{console.log(err);})                      
        })   
}
}
// To create token 
const secret = "thisIsMySecretKey" 
export async  function createToken(request,response){
 const salt = 10 
 
 try {
     const  csrf =  await bcrypt.hash(secret,salt)
     
     
     response.status(200).json({token:csrf})
    } catch (error) {
        response.status(500).json({err:error})
        
    }
}
// To create Data 
export async  function add(request,response){
    const payLoad = request.body
const {error} =  await validateUser.validate(payLoad)
if(error){
   
   return response.status(403).json({msg:error.message})

}
const user = new users({name:payLoad.name,file:request.file})

try {
     
       await user.save()
       response.status(200).json({msg:'success'})

} catch (error) {
    response.status(500).json({err:error})
    
}
}
// To fetch Data
export async  function fetch(request,response){
    let page = request.params.page -1
  
    try {
       const count =await users.find({}).countDocuments() 
       const limit =10
       const totalPages = Math.ceil(count/limit)
       const userData =await users.find({}).skip(page*limit).limit(limit)
       if(userData){ response.status(200).json({userData,totalPages})}
       else {response.status(400).json({err:err})}
     

    } catch (error) {
        response.status(500).json({err:"server error"})

        
    }

}

// To update Data
export async  function update(request,response){
 const userId = request.params.id
 const updateData = request.body
 const prevFile = request.params.file
 const validateUser = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().required(),
    file: Joi.object().optional(),

})
  const pathToDelete =`public/Images/${prevFile}`
  const {error} = validateUser.validate(updateData)
  const isEmpty = updateData.name.trim() ==""

  if(error ){

  
 return response.status(403).json({msg:error.message})

  }else if(isEmpty){
    return response.status(403).json({msg:"name cannot be empty"})

  }
  try {
      if(request.file){
          if(existsSync(pathToDelete)){
              await unlink(pathToDelete,async(err)=>{
                  if(err){ 
                      console.log(err)
                    }
                    else{                      
                 
        await users.updateOne({_id:userId},{...updateData},{file:request.file})
        response.status(200).json({msg:'User successfully updated '})

            }
            
        }) 
    }else{
        console.log('this is running');
        await users.updateOne({_id:userId},{...updateData,file:request.file})
        response.status(200).json({msg:'User successfully updated '})

    }
    }else{

        await  users.updateOne({_id:userId},updateData)
        response.status(200).json({msg:'User successfully updated '})
    }    
        

    } catch (error) {
        response.status(500).json({err:error})
        
    }
    clearStorage()
}

// To delete Data
export async  function remove(request,response){
    const delUser = request.body 
     try {
        if(delUser.fileName[0]){

            for (const file  of delUser.fileName) {
                if(existsSync(`public/Images/${file}`)){

                    unlink(`public/Images/${file}`, (err) => {
                        if(err)  throw err
                        else console.log(`${file} deleted successully`);
                    })
                }
            }
        }else {
            console.log('no files need to be deleted');
        }
         await  users.deleteMany({_id:[...delUser.id]})

        response.status(200).json({msg:'successfully deleted'})
          
       } catch (error) {
        response.status(400).json({msg:'error while deleting item'+delUser.name})

           
       }
   }
       
    // To signIn user
export async  function login(request,response){
    const loginData = request.body.name
    const JWT =jsonwebtoken 

    
    try {
        const match = await users.findOne({name:loginData} ).select('-__v')
       
        const userId =String(match._id)
        if(match){
            if(!request.cookie){
                var jwtToken=  await JWT.sign({_id:userId,role:match.role},secret)
             
                await users.updateOne({_id:userId},{$set:{token:jwtToken}})      
                response.cookie('jwt', jwtToken,{
                    httpOnly: true,    
                    maxAge: 24*3600*1000, 
                    sameSite:'none',
                    secure:'true'
                });
            }
            response.status(200).json({data:match,token:jwtToken})
                
        }else{
            response.status(403).json({msg:'user not found'})

        }
    
          
       } catch (error) {
        response.status(403).json({msg:'Username or password is incorrect'})

           
       }
   }
   export async  function logout(request,response){       
    const JWT =jsonwebtoken        
       try {
        const cookie = await request.cookies.jwt
        const decoded=  await JWT.verify(cookie,secret)
        await users.updateOne({_id:decoded},{$set:{token:null}})      
        response.clearCookie('jwt') 
        response.send({msg:"logut successful"})
          
       } catch (error) {
           console.log(error)
           response.status(500).json({err:"server error"})


           
       }
   }
      