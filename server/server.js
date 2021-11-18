const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;

let app = express();
let server = http.createServer(app);
let io = socketIO(server);

var num_players = 0;
var config = {};

app.use(express.static(path.join(__dirname, '/../public')));
server.listen(port, ()=> {
  console.log('Starting server on port ' + port);
});

io.on('connection', (socket) => {
  client_id = socket.id;
  console.log('(s)A user just connected with id ' + client_id + '.');
 	config[client_id] = {'xPos': 100, 'yPos': 100, 'speed': 0.2, 'direction': 0};
 	
  socket.emit('createPlayerProfile', client_id);
 	num_players += 1;
  socket.on('updateConfig', (id_and_configs) => {
    //console.log(id_and_configs);
    c_id = id_and_configs['id'];
    c_config = id_and_configs['configs']

    console.log(c_id);
    //console.log(c_config);
    console.log(config[c_id]);

    if(c_id == -1){return;}
    client_configs = id_and_configs.configs;
 		config[c_id]['xPos'] = c_config['xPos'];
 		config[c_id]['yPos'] = c_config['yPos'];
 		config[c_id]['speed'] = c_config['speed'];
 		config[c_id]['direction'] = c_config['direction'];
 	});
  socket.on('disconnect', () => {
    console.log('A user has disconnected with id ' + socket.id);
    delete config[socket.id];
  });
});

// update state continuously
setInterval(function() {
  io.sockets.emit('state', config);
}, 1000 / 60);
