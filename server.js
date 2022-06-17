



const Player = require('./classes/Player');
var players = [];
var sockets = [];


var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
app.get('/home',function(req,res){
    res.json('home');
})
io.on('connection', function (socket) {

  //console.log(socket);
  var newplayer = new Player();
  var thisIdPlayer = newplayer.id;
  players[thisIdPlayer] = newplayer;
  sockets[thisIdPlayer] = socket;
  socket.emit("dangki", { id: thisIdPlayer });
  socket.emit("newplayer", newplayer);
  socket.broadcast.emit("newplayer", newplayer);


  for (var player in players) {
    if (thisIdPlayer != player) {
      socket.emit("newplayer", players[player]);
    }
  }

  socket.on('updatePosition', function (data) {
    console.log(data);
    newplayer.position.x = data.x;
    newplayer.position.z = data.z;
    socket.broadcast.emit('updatePosition', newplayer);
  });


  socket.on('disconnect', function (reason) {
    console.log("da disconnect");
    delete players[thisIdPlayer];
    delete sockets[thisIdPlayer];
    socket.broadcast.emit('disconnected', newplayer);
  });

});


http.listen(4567, function(){
  console.log('listening on *:4567');
});



