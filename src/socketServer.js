require("./db/connection"); // Run db connection

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var port = process.env.PORT || 3000; 

const Msg = require("./models/models") 
const Connections = require("./models/connectionModel") 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
}); 
io.on('connection', (socket) => {
    console.log('a user connected')
    let username = "Placeholdern"
    addConnection(socket.id, username )

    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      saveMsg(msg)
    });

    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
  });

http.listen(port, function(){
  console.log('listening on *:3000');
}); 

async function addConnection (connectionId) {
  let connection = {
    "connectionId": connectionId,
    "username": "placeholder"
  } 
  try{
    const newConnection = await Connections.create(connection)

  } catch (error) {
    console.log(error)
  }
}

async function saveMsg (msg){  

  let msgObj = {
    "msg": msg
  }

  try {
    const newMsg = await Msg.create(msgObj);
  } catch (error) {
    console.log(error)
  }
}