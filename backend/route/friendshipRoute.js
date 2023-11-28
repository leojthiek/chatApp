import express from "express"
import { acceptFriendRequest, getAllFriendRequest, sendFriendRequest } from "../controller/friendshipController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/request/send').post(protect,sendFriendRequest)
router.route('/request/pending').get(protect,getAllFriendRequest)
router.route('/request/accept').put(protect,acceptFriendRequest)



export default router