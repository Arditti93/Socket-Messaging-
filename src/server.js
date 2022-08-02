require("./db/connection"); // Run db connection

var express = require('express');
const app = express();
const userRouter = require("./login/routes")
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000;  

app.use(express.json()); 
app.use(userRouter)

const { addConnection, removeConnection, listConnections, saveMsg } = require("./socketControllers")

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
}); 

io.on('connection', (socket) => {
    console.log("connect " + socket.id)
    let username = "Placeholder"
    addConnection(socket.id, username )
    listConnections()

    socket.on('chat message', function(msg){ß
      io.emit('chat message', msg);
      saveMsg(msg, socket.id, username)
    });

    socket.on('disconnect', () => {
      console.log("disconnect " + socket.id)
      removeConnection(socket.id)
    });
  });

http.listen(port, function(){
  console.log('listening on *:3000');
}); 