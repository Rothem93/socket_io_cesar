'use strict'

var express = require('express');
var app = express();
var server = require('http').Server(app)
var io = require('socket.io')(server, {secure: true});
var port = process.env.PORT || 6677;
var fs =require('fs');
var logger = require('./logger/logger');
app.use(express.static('client'));

app.get('/test', (req, res)=> {
	res.status(200).send('Juja');
});

var messages = [{
	id: 1,
	text: 'Bienvenido al chat privado de Socket.io y Nodejs de César M. La persistencia de los mensajes es hasta que tire el servidor.',
	nickName: 'ro-Bot-o'
}]

var messages = fs.readFileSync("./server/logs/messages.txt");
messages = JSON.parse(messages);

io.on('connection', (socket) => {

	console.log('usuario conectado con IP ' + socket.handshake.address)
	socket.emit('messages', messages);

	socket.on('add-message', (data) => { 
		messages.push(data); 
		io.sockets.emit('messages', messages); 
		var msgJson = JSON.stringify(messages);		
		//logger.error(msgJson);
		try {
			fs.writeFileSync("./server/logs/messages.txt", msgJson, 'utf8');
			//logger.error("FICHERO CREADO");
		}catch(e){
			throw e;
		}
	}); 


});

server.listen(port, ()=>{
	console.log(`API REST FAVORITOS arrancado en http://localhost:${port}`);
});

module.exports = app;