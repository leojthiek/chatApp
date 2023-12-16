import express from "express"
import { protect } from "../middleware/authMiddleware.js"
import { getMessages, sendMessage } from "../controller/messagesController.js"

const router = express.Router()

router.route('/private/send').post(protect,sendMessage)
router.route('/private/messages').get(protect,getMessages)


export default router