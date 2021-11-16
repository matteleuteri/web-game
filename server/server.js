const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(publicPath));
server.listen(port, ()=> {
  console.log('Starting server on port '+port);
});
var num_players = 0
var config = {};


io.on('connection', (socket) => {
 	console.log('A user just connected with id ' + num_players + '.');
 	config[toString(num_players)] = {'xPos': 100, 'yPos': 100, 'speed': 0.2, 'direction': 0};
 	io.emit('createPlayerProfile', toString(num_players));
 	num_players += 1;

 	socket.on('updateConfig', (id, updated_configs) => {
 		console.log("state updated???");
 		console.log(updated_configs)
 		console.log(config)
 		console.log(config[toString(id)])
 		config[toString(id)]['xPos'] = updated_configs['xPos'];
 		config[toString(id)]['yPos'] = updated_configs['yPos'];
 		config[toString(id)]['speed'] = updated_configs['speed'];
 		config[toString(id)]['direction'] = updated_configs['direction'];

 	});


  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });
});



// update state continuously
setInterval(function() {
  io.sockets.emit('state', config);
}, 1000 / 60);






