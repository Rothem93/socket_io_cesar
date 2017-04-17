'use strict' 

var socket = io.connect('https://aquihaydragones.herokuapp.com/', {'forceNew': true});
// 'http://10.21.0.54:6677'
// 
socket.on('messages', (data) => {
	console.log(data)
	render(data);
});

function render(data){
	var html = data.map((message, index) => {
		return(`
			<div class="message">
				<strong>${message.nickName}</strong> dice: 
				<p>${message.text}</p>
			</div>
		`)
	}).join(' ');

	var div_msgs = document.getElementById('messages');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
	var message = {
		nickName: document.getElementById('nickname').value,
		text: document.getElementById('textoArea').value
	};

	document.getElementById('nickname').style.display ="none";
	socket.emit('add-message', message);

	document.getElementById('textoArea').value ="";

	return false;
}