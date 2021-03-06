// Dependencies
// -----------------------------------------------------
var express         = require('express');
var mongoose        = require('mongoose');
var port            = process.env.PORT || 3000;
var morgan          = require('morgan');
var bodyParser      = require('body-parser');
var methodOverride  = require('method-override');
var app             = express();


var http = require('http').Server(app);
var io = require('socket.io')(http);

// Express Configuration
// -----------------------------------------------------
// Sets the connection to MongoDB
mongoose.connect("mongodb://heroku_s7dvgm6m:u03nemqufteo8cbquhq4qo1djc@ds045475.mongolab.com:45475/heroku_s7dvgm6m");

// MONGOLAB_URI: mongodb://heroku_s7dvgm6m:u03nemqufteo8cbquhq4qo1djc@ds045475.mongolab.com:45475/heroku_s7dvgm6m

// Logging and Parsing
app.use(express.static(__dirname + '/public'));                 // sets the static files location to public
app.use('/bower_components',  express.static(__dirname + '/bower_components')); // Use BowerComponents
app.use(morgan('dev'));                                         // log with Morgan
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.urlencoded({extended: true}));               // parse application/x-www-form-urlencoded
app.use(bodyParser.text());                                     // allows bodyParser to look at raw text
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));  // parse application/vnd.api+json as json
app.use(methodOverride());

// Routes
// ------------------------------------------------------
require('./app/routes.js')(app);

// Listen
// -------------------------------------------------------
http.listen(port);
console.log('App listening on port ' + port);

//====================================
//             SOCKETS
//====================================


var connections = 0;
io.on('connection', function(socket){

  connections += 1;
  console.log('a user connected');
  console.log('connections: ', connections);

  io.emit('user', "hello new user");


  socket.on('disconnect', function() {
  	connections -= 1
  	console.log('a user disconnected');
  	console.log('connections: ', connections);
  });

  socket.on('chat message', function(msg){

		console.log('Message from the client: ', msg);

		io.emit('servermessage', msg);

		// socket.emit('chat message', function() {

  // 	console.log(msg);
  // }
		// socket.emit('servermessage', msg);

  	});




  

  // socket.on('chat message', function(msg){
  //   io.emit('chat message', msg);
  // });
});





// var connected_users = 0;

// io.on('connection', function(socket) {

// 	connected_users += 1;

// 	io.emit('user connection', connected_users);

// 	socket.on('chat message', function(msg) {
// 		io.emit('chat message', msg);
// 	});

// 	socket.on('username', function(usr) {
// 		io.emit('username', usr);
// 	});

// 	socket.on('disconnect', function() {
// 		connected_users -= 1;
// 		io.emit('user connection', connected_users);
// 	});

// });