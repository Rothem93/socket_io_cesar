'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server)
var port = process.env.PORT || 6677;

app.use(express.static('client'));

app.get('/test', (req, res)=> {
	res.status(200).send('Juja');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado de Socket.io y Nodejs de César M.',
	nickName: 'ro-Bot-o'
}]

io.on('connection', (socket) => {

	console.log('usuario conectado con IP ' + socket.handshake.address)
	socket.emit('messages', messages);

	socket.on('add-message', (data) => {
		messages.push(data);
		io.sockets.emit('messages', messages);
	});


});

server.listen(port, ()=>{
	console.log(`API REST FAVORITOS arrancado en http://localhost:${port}`);
});


module.exports = app;