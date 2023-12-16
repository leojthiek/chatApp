import express, { urlencoded } from "express"
import connectDB from "./config/DB_connection.js"
import dotenv from "dotenv"
import cors from "cors"
import authRoute from "./route/authRoute.js"
import friendshipRoute from "./route/friendshipRoute.js"
import messageRoute from "./route/messageRoute.js"


const app = express()

dotenv.config()
connectDB()

app.get("/",(req,res)=>{
    res.send('this is the server')
})

app.use(express.json())
app.use(cors())
app.use('/api/user',authRoute)
app.use('/api/friendship',friendshipRoute)
app.use('/api/message',messageRoute)


app.listen(4000, ()=> {
    console.log('server up and running')
})