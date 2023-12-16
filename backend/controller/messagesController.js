import { Friendship } from "../model/friendShip.js";
import { Message } from "../model/message.js";

const sendMessage = async(req,res)=>{
    try {
        const {content} = req.body
        const senderId = req.user._id
        const {receiverId} = req.query

       
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

const getMessages = async (req, res) => {
    try {
        const loginUserId = req.user._id
        const { friendId } = req.query

        if (!friendId) {
            return res.status(401).json({ error: "Friend ID is invalid or not found" })
        }

       

        const messages = await Message.find({
            $or: [
                { senderId: loginUserId, receiverId: friendId },
                { senderId: friendId, receiverId: loginUserId }
            ]
        })


        if (messages.length > 0) {
             res.status(200).json({ messages })
        } else {
            return res.status(201).json({ error: "Send Hi! to start a conversation" })
        }

    } catch (error) {
        console.log(error)
        return res.status(400).json({ error: "Error occur while fetching messages" })
    }
}


export {sendMessage,getMessages}