require("./db/connection"); // Run db connection

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000; 
const Msg = require("./models/models") 

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

async function handleSave (sentMsg){ 
  try {
    const newMsg = await Msg.create(sentMsg);
  } catch (error) {
    console.log(error)
  }
}
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', function(msg){
      io.emit('chat message', msg);
      let msgObj = {
        "msg": msg
      }
      handleSave(msgObj)
    });
    socket.on('disconnect', () => {
    console.log('user disconnected');
    });
  });

http.listen(port, function(){
  console.log('listening on *:3000');
});