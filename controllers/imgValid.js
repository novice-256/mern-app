import {request, response } from "express";
 
 function imgValid(size,type,ext){
    const allowedExt= ['png','jpg','jpeg','svg']
    const allowedTypes= ['image','text']
    
    if(size){
    const convToMB= size/1000000 
    if(convToMB>10 ){
        throw new Error(`size must be less than 10 mb, your file size is ${convToMB}`)
        }
    }
    if(!allowedTypes.includes(type)){
        throw new Error(`file type ${type} is not allowed`)
    }
    if(!allowedExt.includes(ext)){
        throw new Error(`file format ${format} is not allowed`)

    }
    
        return true
}

export  async  function imageValidation(request,response,next){
const {size,type,ext}= request.params


    //  const file = request.file

    try {
        
         await imgValid(size,type,ext)
            next()
    } catch (error) {
        console.log(error);
       response.status(400).json({err:error})
    }
}

