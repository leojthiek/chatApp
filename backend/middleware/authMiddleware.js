import jwt from 'jsonwebtoken'
import { User } from '../model/userModel.js'


const protect = async(req,res,next)=>{
    let token

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(" ")[1]
            const decoded = jwt.verify(token,process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select(-'password')
            next()
        } catch (error) {
            if(error.name === "TokenExpiredError"){
               return res.status(401).json({error:"token expired please login again"})
            }
            console.log(error)
            res.status(401).json({error:"not authorised,token failed"})
        }
    }
    if(!token){
        res.status(401).json({error:"unauthorised,invalid token"})
    }
}

export {protect}