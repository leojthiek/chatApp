import { Friendship } from "../model/friendShip.js"
import { User } from "../model/userModel.js"

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

const acceptFriendRequest = async (req, res) => {
    try {
        const receiverId = req.user._id;
        const { senderId } = req.body;

        if (!senderId) {
            return res.status(401).json({ error: "Sender ID is incorrect or not found" });
        }

        if (!receiverId) {
            return res.status(400).json({ error: "Invalid token, please log in again" });
        }

        if (receiverId.toString() === senderId.toString()) {
            return res.status(400).json({ error: "Cannot accept a friend request from yourself" });
        }

        const findFriendShipAndAccept = await Friendship.findOneAndUpdate(
            { senderId, receiverId, status: "Pending" },
            { status: "Accepted" },
            { new: true }
        );

        if (findFriendShipAndAccept) {
            res.status(200).json({ friendShip: findFriendShipAndAccept });
        } else {
            res.status(404).json({ error: "Friend request not found or already accepted" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error while accepting friend request" });
    }
};


const rejectFriendRequest = async (req,res) => {
        try {
            const receiverId = req.user._id
            const {senderId} = req.body

            if(!senderId){
                return res.status(401).json({error:"sender id incorrect or not found"})
            }

            if(!receiverId){
                return res.status(400).json({error:"invalid token, please log in again"})
            }


        
            if(receiverId.toString() == senderId.toString()){
                return res.status(400).json({error:"cannot send friend request to ypurself"})
            }
    
            const deleteFriendship = await Friendship.findOneAndDelete(
                {senderId,receiverId,status:"Pending"},
            )
    
           if(deleteFriendship){
            res.status(200).json({deleteFriendship})
           }
        } catch (error) {
            console.log(error)
            res.status(400).json({error:"error while rejecting a friend request"})
        }
    }


    const getAllFriends = async (req, res) => {
        try {
            const userId = req.user._id;
    
            const friends = await Friendship.find({
                $and: [
                    { $or: [{ senderId: userId }, { receiverId: userId }] },
                    { status: "Accepted" },
                ],
            }).populate({ path: 'senderId receiverId', select: 'name' });
    
            const friendDetails = friends.map(friendship => {
                return friendship.senderId.equals(userId) ? friendship.receiverId : friendship.senderId;
            });
    
            res.status(200).json({ friends: friendDetails });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error while getting friends." });
        }
    };
    





export {sendFriendRequest,getAllFriendRequest,acceptFriendRequest,getAllFriends,rejectFriendRequest}
