import { fileURLToPath } from 'url';
import {dirname } from 'path';
import * as path from 'path'
import { createServer } from 'http';
import express from 'express';
import Server from "socket.io";
//import { updateConfiguration, collide } from '../public/js/PlayersConfiguration.js';
//import { getHighScores } from './scoreReader.js';
import { Socket } from 'socket.io-client';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
const io = Server(server);
let num_players: number = 0;

let players: SocketIDMap = {};

server.listen(port, ()=> {
    console.log(`Starting server on port ${port}`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket: Socket) => {
    let client_id: string = socket.id;
    console.log(`A user just connected with id ${client_id}.`);
 	players[client_id] = {name: '', xPos: 100, yPos: 100, speed: 2, direction: 0, bounces: 0};
    // socket.emit('createPlayerProfile', client_id);
 	num_players++;
     console.log(`num players: ${num_players}`);
    // socket.on('update_dir', (new_dir_data) => {
    // 	let to_update = players[new_dir_data.id];
    // 	to_update.direction = new_dir_data.new_dir;
    // });
    // socket.on('setName', (nameData) => {
    // 	for(let p in players) {
    // 		if(p === nameData.player_id)
    // 			players[p].name = nameData.nickname;
    // 	}
    // });
    socket.on('disconnect', () => {
        console.log(`A user has disconnected with id ${client_id}`);
        // num_players--;
        // delete players[client_id];
    });
});

// update state continuously
// setInterval(function() {
    // let player_data = {players: players, player_count: num_players};
    // io.sockets.emit('state', player_data);
    // collide(players);
	// for(let p in players)
	// 	updateConfiguration(players[p]);
    // io.sockets.emit('updatePlayerList', players);
	//let highScores = getHighScores('server/scores.txt', players);
// }, 1000 / 60);




