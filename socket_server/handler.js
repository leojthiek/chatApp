
export default function socketHandler(io,socket){
    socket.on("receiveMessage",(data)=>{
        console.log('receive message',data)
        io.emit("response",{
            data:data
        })
    })
}