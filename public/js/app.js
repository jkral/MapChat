var app = angular.module('meanMapApp', ['addCtrl', 'geolocation', 'gservice']);

var socket = io();

socket.on('user', function(data) {
	console.log(data);
})

// window lonload
$(function() {


	$('#send').click(function() {

		console.log("click");

		var name = $('#currentuser').text();
		console.log('This is the name: ', name);

		socket.emit('chat message', [name, $('#m').val()]);

	});


	socket.on('servermessage', function(msg) {

		console.log("server message: ", msg);

    	$('#messages').append($('<li>').text(msg[0] + " says: " + msg[1]));
    	$('#m').val("");

	});


});