var express = require('express');
var app 	= express();
var http 	= require('http').Server(app);
var io 		= require('socket.io')(http);

//Tell node where to find static files
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.on('chat message', function(msg){
		io.emit('chat message', msg);
	});

	console.log('a user connected');
	socket.on('disconnect', function(){
		console.log('user disconnected');
	});
});

http.listen(process.env.PORT || 3000, function(){
	console.log('listening on *:3000');
});