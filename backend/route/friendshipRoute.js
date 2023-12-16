import express from "express"
import { acceptFriendRequest, getAllFriendRequest, getAllFriends, rejectFriendRequest, sendFriendRequest } from "../controller/friendshipController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route('/request/send').post(protect,sendFriendRequest)
router.route('/request/pending').get(protect,getAllFriendRequest)
router.route('/request/reject').delete(protect,rejectFriendRequest)
router.route('/request/accept').put(protect,acceptFriendRequest)
router.route('/all-friends').get(protect,getAllFriends)




export default router