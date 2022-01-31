const io = require('socket.io')(3001,{
    cors:{
        origin: '*' //['http://localhost:3000',"http://8cfb-2804-431-c7e8-15b2-9d38-994a-61ce-85d3.ngrok.io"]
    }
})

io.on('connection',(socket:any)=>{
    console.log(`User Connected ${socket.id}`)

    socket.on("join_room",(data:any)=>{
        socket.join(data)
        console.log('user connected to room '+data)
    })

    socket.on('send_message',(data:any)=>{
        socket.to(data.room).emit('receive_message',data)
    })

    socket.on('disconnect',()=>{
        console.log(`User Disconnected ${socket.id}`)
    })
})