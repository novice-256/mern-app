import multer from "multer";
import path from "path";
import {request, response } from "express";

const storage = multer.diskStorage({
    destination:(req,file,callBack)=>{
        const dest = path.resolve('public/images')
         console.log(file);
         console.log(dest);
        
        callBack(null,dest )
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
