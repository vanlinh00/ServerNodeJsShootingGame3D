const { Console } = require('console');
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
  var newplayer = new Player();
  var thisIdPlayer = newplayer.id;
  players[thisIdPlayer] = newplayer;
  sockets[thisIdPlayer] = socket;
  socket.emit("dangki", { id: thisIdPlayer });    // gui dang ki de lay id cua user moi
  socket.emit("newplayer", newplayer);            // tao 1 player - (Player dang nhap)
  socket.broadcast.emit("newplayer", newplayer);  // tao 1 player cho cac thanh vien trong mang

  for (var player in players) {
    if (thisIdPlayer != player) {
      socket.emit("newplayer", players[player]);   // tao lai tat ca player cho - (Player dang nhap)
    }
  }

  socket.on('updatePosition', function (data) {
    newplayer.position.x = data.x;
     newplayer.position.z = data.z;
    socket.broadcast.emit('updatePosition', newplayer);
  });

  // socket.on('updateRotation', function (data) {
  //   newplayer.rotation.x = data.x;
  //   newplayer.rotation.y = data.y;
  //   newplayer.rotation.z = data.z;
  //   socket.broadcast.emit('updateRotation', newplayer);
  //   });

  socket.on('disconnect', function (reason) {
    delete players[thisIdPlayer];
    delete sockets[thisIdPlayer];
    socket.broadcast.emit('disconnected', newplayer);
  });

});


http.listen(process.env.PORT||4567, function(){
  console.log('listening on *:4567');
});



