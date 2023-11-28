import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { sendMessage } from "../controller/messagesController.js"

const router = express.Router()

router.route('/private/send').post(protect,sendMessage)

export default router