import multer from "multer";
import path from "path";
import {request, response } from "express";

const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        // console.log(file);
        callBack(null,'public/images')
    },
    filename:(req,file,callBack)=>{            
        callBack(null, Date.now() + path.extname(file.originalname));
        console.log('file uploaded')
        // console.log(file.mimetype.split('/')[0]);
        // console.log( file.originalname.split('.').pop());
     
    }
}
)

const uploadFile= multer({storage:storage})
export default uploadFile
