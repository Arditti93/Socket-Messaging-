require("./db/connection"); // Run db connection

const express = require('express');
const app = express();
const cors = require("cors");
const http = require('http').Server(app);
const port = process.env.PORT || 4000; 

const io = require('socket.io')(http,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors())

const { addConnection, removeConnection, saveMsg, listConnections, findConnection } = require("./socketControllers") 

io.on('connection', async (socket) => {

  console.log("connect " + socket.id)
  io.emit('connected', socket.id) 
  
  socket.on('username', async (sub) => {
    await addConnection(socket.id, sub)
    let connections = await listConnections() 
    io.emit('connected_clients', connections)
  })
  
  socket.on('receive_msg', function(msg, username){
    io.emit('broadcast_message', msg, username);
  });

  socket.on('disconnect', async () => {
    console.log("disconnect " + socket.id)
    let response = await findConnection('connectionId', socket.id)
    console.log(response)
    io.emit('remove_user', response.username)
    await removeConnection(socket.id)
  }); 

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

http.listen(port, function(){
  console.log('listening on port ' + port);
}); 

app.get('/api', function(req, res){
  res.json({
    message: 'Hello world',
  });
}); 


