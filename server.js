const express=require('express');
const app=express();
const http=require('http');
const server=http.createServer(app);

const {Server}=require("socket.io")
const io=new Server(server);
console.log(__dirname);
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/public"+"/index.html")
})
//io.on create a connection and give a personalized socket to everyone who tries to connect to it 
//socket.on listen to the event emitter which is 'chat message;(server listens to a specific user)
//socket.emit emit to the event eemitter (server to specific-user / or vice-versa)
//io.emit:- take the message from emit emitter and display it to the server(server to all user)
io.on('connection',(socket)=>{ 
console.log("a user connected")
console.log(socket.id);
socket.on('join room',(room)=>{ //act as a connector to a room(create a set of different socket)
    socket.join(room);
})
socket.on('chat message', (msg) => {
    io.to(msg.room).emit('chat message',msg.text) //act as a sender to (a set of socket)
    console.log("user",socket.id,'message: ' + msg.text);
  });
  
})

server.listen(3000,()=>{
    console.log("Server is running");
})