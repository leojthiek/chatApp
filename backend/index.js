import express from "express"
import connectDB from "./config/DB_connection.js"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./route/authRoute.js"
import friendshipRoute from "./route/friendshipRoute.js"
import messageRoute from "./route/messageRoute.js"
import path from "path"


const app = express()

dotenv.config()
connectDB()



app.use(express.json())
app.use(cors())
app.use('/api/user',authRoute)
app.use('/api/friendship',friendshipRoute)
app.use('/api/message',messageRoute)

const __dirname = path.resolve()

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,'/frontend/build')))

    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'frontend','build','index.html'))
    })
}else{
    app.get("/",(req,res)=>{
        res.send('this is the server')
    })
}




app.listen(4000, ()=> {
    console.log('server up and running')
})