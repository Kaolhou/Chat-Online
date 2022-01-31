const io = require('socket.io')(3001,{
    cors:{
        origin: ['http://localhost:3000']
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