import { User } from "../model/userModel.js";
import bcrypt from "bcrypt"
import { generateToken } from "../utils/generateToken.js";


const registerUser = async(req,res)=> {
    try {
        const {name,email,password} = req.body

        const userAlreadyExist = await User.findOne({email})
        if(userAlreadyExist){
          return  res.status(400).json({error:"user already exists"})   
        }

        const usernameExist = await User.findOne({name})
        if(usernameExist){
            return res.status(400).json({error:"username already taken"})
        }

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password,salt)
       
        const newUser = await User.create({
            name,
            email,
            password:hashPassword
        })

        if(newUser){
            const user = await newUser.save()
            res.status(200).json({user:user})
        }


    } catch (error) {
        console.log('error while creating user',error)
        throw new Error('Error while creating user')
    }
}


const loginUser = async(req,res)=>{
    try {
        const {email,password} = req.body

        const emailExist = await User.findOne({email})
        if(!emailExist){
            return res.status(400).json({error:"user has not yet register"})
        }else{
            const comparePassword = await bcrypt.compare(password,emailExist.password)
            if(comparePassword){
                const user = {
                    id:emailExist._id,
                    name:emailExist.name,
                    email:emailExist.email,
                    token:generateToken(emailExist._id)
                }
                res.status(200).json(user)
            }else{
                return res.status(401).json({error:"invalid email or password"})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"error while logging in user"})
    }
}

const getAllUser = async(req,res)=>{
    try {
        const users = await User.find()
        if(users){
            res.status(200).json({users})
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"error while fetching all users"})
    }
}


export {registerUser,loginUser,getAllUser}
