import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import http from 'http';
import express from 'express';
import socketIO from 'socket.io';

import { updateConfiguration, collide } from '../public/js/PlayersConfiguration.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const port = process.env.PORT || 3000;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const powerUpTypes = ['movePerspective', 'speedBoost', 'bigMode'];
let players = {};
let powerUps = [];

app.use(express.static(path.join(__dirname, '/../public')));
server.listen(port, () => {
    console.log(`Starting server on port ${port}`);
});

// TODO: clients that have connected but not been named are visible on other client's screen but not their own. 
// it shouldn't be seen on any at all
io.on('connection', (socket) => {
	handleConnect(socket);
    socket.on('update_dir', (inp) => {
    	handleInput(inp);
    });
    socket.on('setName', (nameData) => {
    	handleSetName(nameData);
    });
    socket.on('disconnect', () => {
    	handleDisconnect(socket.id);
    });
});

function handleConnect(socket) {
    console.log(`A user just connected with id ${socket.id}.`);
    socket.emit('createPlayerProfile', socket.id);
 	players[socket.id] = {'name': '', 'xPos': 100, 'yPos': 100, 'speed': 2, 'direction': 0, 'bounces': 0, 'powerUp': ''};
 	//socket.emit('createPowerUp', powerUps); // move to 'state'
}

// TODO: expand to more types of input
function handleInput(new_dir_data) {
	let to_update = players[new_dir_data.id];
    to_update.direction = new_dir_data.new_dir;
}

/**
 * This function is called when a client enters a nickname into 
 * the start screen window. The corresponding player data in 
 * the players array is updated, and this data is later 
 * broadcasted to all other clients
 * */
function handleSetName(nameData){
	for(let p in players) {
    	if(p === nameData.id) {
   			players[p].name = nameData.name;
   			break;
    	}
    }
}

function handleDisconnect(client_id){
	console.log(`A user has disconnected with id ${client_id}`);
    delete players[client_id];
}


/**
 * this broadcasts to all clients the current state of the game,
 * incuding other client's position, and the positions of all 
 * the power ups. 
 * */
setInterval(function() {
    io.sockets.emit('state', players);
    collide(players, powerUps);
	for(let p in players)
		updateConfiguration(players[p]);
    io.sockets.emit('updatePlayerList', players);
}, 1000 / 60);

/**
 * this spawns a power up in a random location every ten seconds,
 * and updates the clients about the change
 * */
setInterval(function() {
	let powerUpData = {}; // can this creation be simplified?
	console.log();
	powerUpData.putype = powerUpTypes[ Math.floor(Math.random() * powerUpTypes.length)];
	powerUpData.x = Math.floor(Math.random() * 600);
	powerUpData.y = Math.floor(Math.random() * 400);
	powerUps.push(powerUpData);
	io.sockets.emit('createPowerUp', powerUps);
}, 10000);