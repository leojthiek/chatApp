import express from 'express'
import { getAllUser, loginUser, registerUser } from '../controller/authController.js'
import { protect } from '../middleware/authMiddleware.js'
import multer from 'multer'

const storage = multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,"uploads/")
    },
  
    filename:function(req,file,cb){
      const uniqueName = Date.now()
      cb(null, uniqueName + file.originalname)
    }
  });

const upload = multer({ storage: storage });


const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/all-users',upload.single("image")).get(protect,getAllUser)


export default router

