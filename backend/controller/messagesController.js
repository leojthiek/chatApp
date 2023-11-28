import { Friendship } from "../model/friendShip.js";
import { Message } from "../model/message.js";

const sendMessage = async(req,res)=>{
    try {
        const {receiverId,content} = req.body
        const senderId = req.user._id

       
    const existingFriendShip = await Friendship.findOne({
        $or:[
            {senderId,receiverId,status:"Accepted"},
            {senderId:receiverId,receiverId:senderId,status:"Accepted"}
        ]
    })

    if(!existingFriendShip){
        return res.status(400).json({error:"you cannot send mesage unless you are friend"})
    }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            content
        })
        const message = await newMessage.save()

        if(message){
            res.status(200).json({message})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"error while sending a message"})
    }
}

export {sendMessage}