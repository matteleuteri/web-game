import { drawCanvas } from '/js/Canvas.js';

let socket = io();
let player_id = -1;
let player_configs = {'name': '', 'xPos': 100, 'yPos': 100, 'speed': 2, 'direction': 0, 'bounces': 0};

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
    drawCanvas(player_data.players);
});

socket.on('updatePlayerList', (players) => {
	let player_count = Object.keys(players).length
    if(player_count === 1)
        document.getElementById('playerCount').innerHTML = `Only you are connected. Share the URL with your friends!`;
    else
        document.getElementById('playerCount').innerHTML = `There are ${player_count} players. Share the URL with your friends!`;   
	let player_list = document.querySelector('ul');
	player_list.innerHTML = '';
	for(let p in players) {
		if(players[p].name != '') {
			let player_score = players[p].bounces / 2;
			let node = document.createElement('li');
			node.appendChild(document.createTextNode(`name: ${players[p].name}, score: ${player_score}`));
			player_list.appendChild(node);
		}
	}
});

$('#submit-name').click(function(){
    $('#name-form').hide();
    // set nick name here
    let nickname = document.getElementById('name').value;
    let nameData = {player_id, nickname};
    socket.emit('setName', nameData);
});