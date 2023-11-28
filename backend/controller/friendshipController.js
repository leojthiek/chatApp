import { Friendship } from "../model/friendShip.js"

const sendFriendRequest = async (req, res) => {
  try {
    const { receiverId} = req.body
    const senderId = req.user._id


    if(!receiverId){
        return res.status(400).json({error:"receiverId not found"})
    }

    if(!senderId){
        return res.status(401).json({error:"senderId is invalid or unauthorised"})
    }

    if(receiverId.toString() == senderId.toString()){
        return res.status(400).json({error:"cannot send friend request to ypurself"})
    }

    const existingFriendShip = await Friendship.findOne({
        $or:[
            {senderId,receiverId},
            {senderId:receiverId,receiverId:senderId}
        ]
    })

    if(existingFriendShip){
        return res.status(400).json({error:"friend request already send"})
    }

    const newFriendship = await Friendship.create({
        senderId,
        receiverId,
        status:"Pending"
    })

    const friendShip = await newFriendship.save()
    if(friendShip){
        res.status(200).json({friendShip})
    }

  } catch (error) {
    console.log(error)
    res.status(401).json({error:"error while trying to create friendship"})
  }
}

const getAllFriendRequest = async(req,res) => {
    try {
        const receiverId = req.user._id

        const friendsPending = await Friendship.find({
          receiverId,
          status:"Pending"
        }).populate('senderId','name')

        if(!friendsPending){
            return res.status(400).json({error:"no pending request"})
        }

        const extractSenderDetail = friendsPending.map((data)=>{
           return data.senderId
        })

        res.status(200).json({extractSenderDetail})
    } catch (error) {
        console.log(error)
        res.status(401).json({error:"error while getting all pending request"})
    }
}

const acceptFriendRequest = async(req,res)=>{
    try {
        const receiverId = req.user._id
        const {senderId} = req.body

        const findFriendShip = await Friendship.findOneAndUpdate(
            {senderId,receiverId,status:"Pending"},
            {status:"Accepted"},
            {new:true}
        )

       if(findFriendShip){
        res.status(200).json({findFriendShip})
       }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"error while accepting friend request"})
    }
}






export {sendFriendRequest,getAllFriendRequest,acceptFriendRequest}
