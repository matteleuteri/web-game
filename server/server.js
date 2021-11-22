import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);
let num_players = 0;
let players = {};

app.use(express.static(path.join(__dirname, '/../public')));
server.listen(port, ()=> {
  console.log('Starting server on port ' + port);
});

io.on('connection', (socket) => {
  let client_id = socket.id;
  console.log('A user just connected with id ' + client_id + '.');
 	players[client_id] = {'xPos': 100, 'yPos': 100, 'speed': 0.2, 'direction': 0};
  socket.emit('createPlayerProfile', client_id);
 	num_players += 1;
  socket.on('updateConfig', (id_and_configs) => {
    let c_id = id_and_configs.id;
    let c_config = id_and_configs.configs;
    if(c_id == -1) return;
 		players[c_id].xPos = c_config.xPos;
 		players[c_id].yPos = c_config.yPos;
 		players[c_id].speed = c_config.speed;
 		players[c_id].direction = c_config.direction;
    socket.emit('checkCollision', players);
 	});
  socket.on('disconnect', () => {
    console.log('A user has disconnected with id ' + client_id);
    num_players--;
    delete players[client_id];
  });
});

// update state continuously
setInterval(function() {
  let player_data = {players: players, player_count: num_players};
  io.sockets.emit('state', player_data);
}, 1000 / 60);
