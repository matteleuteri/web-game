import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';
import { getHighScores } from '../server/scoreReader.js';

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
    console.log(`Starting server on port ${port}`);
});

io.on('connection', (socket) => {
    let client_id = socket.id;
    console.log(`A user just connected with socket id ${client_id}.`);
 	let client_state = {'name': '', 'xPos': 100, 'yPos': 100, 'speed': 2, 'direction': 0, 'bounces': 0};
    players[client_id] = client_state; // save all player id maps to update game state
    let client_data = {'id': client_id, 'state': client_state};
    socket.emit('createPlayer', client_data);
 	num_players++;
    socket.on('processClientChanges', (client_updates) => {
    	//console.log(client_updates.state);
    	players[client_updates.id] = client_updates.state;

    	io.sockets.emit('receiveChanges', players);
    });
    // socket.on('setName', (nameData) => {
    // 	for(let p in players) {
    // 		if(p === nameData.player_id)
    // 			players[p].name = nameData.nickname;
    // 	}
    //});
    socket.on('disconnect', () => {
        console.log(`A user has disconnected with id ${client_id}`);
        num_players--;
        delete players[client_id];
    });
});

// update state continuously
// setInterval(function() {
//     let player_data = {players: players, player_count: num_players};
//     io.sockets.emit('state', player_data);
//     collide(players);
// 	for(let p in players)
// 		updateConfiguration(players[p]);
//     io.sockets.emit('updatePlayerList', players);
// 	let highScores = getHighScores('server/scores.txt', players);
// }, 1000 / 60);




