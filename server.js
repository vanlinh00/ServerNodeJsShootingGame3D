
const Player = require('./classes/Player');
var players=[];
var sockets=[];
var io = require('socket.io')(4567);
console.log('server has started');

io.on('connection', function(socket)
{
    var newplayer =new Player();
    var thisIdPlayer=newplayer.id;
    players[thisIdPlayer]=newplayer;
    sockets[thisIdPlayer]=socket;
    socket.emit("dangki",{id:thisIdPlayer});
    socket.emit("spawn",newplayer);
    socket.broadcast.emit("spawn",newplayer);

    for(var player in players)
    {
   console.log(player);
       if(thisIdPlayer!=player)
       {
         socket.emit("spawn",players[player]);
       }
    }

    socket.on('updatePosition',function(data){
    console.log(data);
    newplayer.position.x= data.x;
    newplayer.position.z=data.z;
    socket.broadcast.emit('updatePosition',newplayer);
    });


    socket.on('disconnect', function(reason){
    console.log("da disconnect");
     delete players[thisIdPlayer];
     delete sockets[thisIdPlayer];
     socket.broadcast.emit('disconnected',newplayer);
    });

});



