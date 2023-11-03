import {request, response } from "express";
import express ,{ Router } from "express";
import { add ,remove,createToken,logout, update,fetch,login} from "../controllers/main.js";
import { validateToken } from "../middleware/checkToken.js";
import { authMidlWare } from "../middleware/auth.js";
import uploadFile from "../controllers/upload.js";
import { imageValidation } from "../controllers/imgValid.js";
import { existsSync } from 'node:fs';
const router= express.Router();
router.post('/',add)
router.get('/',createToken)
router.post('/file=:size%:type%:ext', imageValidation,uploadFile.single("uplFile"),validateToken,add)
router.post('/auth=:role/delete',authMidlWare,remove)
router.get('/auth=:role/view/:page',authMidlWare,fetch)
router.post('/auth=:role/update/:id/:file',uploadFile.single("uplFile"),authMidlWare,update)
router.post('/login',login)
router.get('/logout',logout)

export default router;