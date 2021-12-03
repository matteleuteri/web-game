import { drawCanvas } from '/js/Canvas.js';

let socket = io();
let player_id = -1;
let player_configs = {'xPos': 100, 'yPos': 100, 'speed': 2.5, 'direction': 0, 'bounces': 0};

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41)
        player_configs.direction = e.keyCode - 37;
    let new_dir_data = {id: player_id, new_dir: player_configs.direction};
    socket.emit('update_dir', new_dir_data);
});

socket.on('createPlayerProfile', (my_client_id) => {
    player_id = my_client_id;
});

socket.on('state', (player_data) => {
    if(player_data.player_count === 1)
        document.getElementById('playerCount').innerHTML = `Only you are connected. Share the URL with your friends!`;
    else
        document.getElementById('playerCount').innerHTML = `There are ${player_data.player_count} players. Share the URL with your friends!`;     
    drawCanvas(player_data.players);
});

socket.on('updatePlayerList', (new_id) => {
	//need a way to get player nickname from id
	//need to append previously joined players to list too
	let node = document.createElement('li');
	node.appendChild(document.createTextNode(new_id));
	document.querySelector('ol').appendChild(node);
});