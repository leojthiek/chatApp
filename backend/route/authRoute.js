import express from 'express'
import { getAllUser, loginUser, registerUser } from '../controller/authController.js'

const router = express.Router()

router.route('/register').post(registerUser)
router.route('/login').post(loginUser)
router.route('/all-users').get(getAllUser)


export default router

