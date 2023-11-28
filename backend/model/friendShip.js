import mongoose, { Mongoose } from "mongoose";


const friendshipSchema = mongoose.Schema({
    senderId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiverId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    status:{
        type:String,
        enum:['Pending','Accepted','Rejected'],
        default:'Pending'
    }
    
},{
    timestamps:true
})

const Friendship = mongoose.model('Friendship',friendshipSchema)
export {Friendship}