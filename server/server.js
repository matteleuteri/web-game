const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
//const publicPath = path.join(__dirname, '/../public');
const port = process.env.PORT || 3000;
let app = express();
let server = http.createServer(app);
let io = socketIO(server);
app.use(express.static(path.join(__dirname, '/../public')));
server.listen(port, ()=> {
  console.log('Starting server on port '+port);
});
var num_players = 0
var config = {};

io.on('connection', (socket) => {
  console.log('A user just connected with id ' + num_players + '.');
 	config[num_players] = {'xPos': 100, 'yPos': 100, 'speed': 0.2, 'direction': 0};
 	socket.emit('createPlayerProfile', num_players);
 	num_players += 1;
  socket.on('updateConfig', (id_and_configs) => {
    id = id_and_configs.id;
    if(id == -1){return;}
    client_configs = id_and_configs.configs;
 		config[id]['xPos'] = client_configs['xPos'];
 		config[id]['yPos'] = client_configs['yPos'];
 		config[id]['speed'] = client_configs['speed'];
 		config[id]['direction'] = client_configs['direction'];
 	});
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });
});
// update state continuously
setInterval(function() {
  io.sockets.emit('state', config);
}, 1000 / 60);
