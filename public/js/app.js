import { drawCanvas } from '/js/Canvas.js';
import { updateState, collide } from '/js/PlayersConfiguration.js';
import InputQueue from '/js/InputQueue.js'

let socket = io();
let _delta = 0;
let _player_id = -1;
let _player_state = {};
let _input_queue = new InputQueue();
let _players = {};
// main loop is kept simple to simplify debugging
// first called on submit name below
function mainLoop() {
	//handleInput(); // for now it just changes direction
	socket.emit('processClientChanges', {id: _player_id, state: _player_state});

	//let states = socket.emit('getAllPlayerStates', {_player_id, player_state});
	updateState(_player_state); // only updates self, no other clients
	drawCanvas(_players);
	requestAnimationFrame(mainLoop);
}

// function handleInput() {
// 	let inpt = _input_queue.dequeue();
// 	_player_state.direction = inpt - 37;
// }

// TODO: improve input handling, stop using jquery
$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41) {
    	_player_state.direction = e.keyCode - 37;
    	//_input_queue.enqueue(e.keyCode);
    	//socket.emit('update_dir', {id: _player_id, new_dir: e.keyCode - 37});
    }
});

// when a player connects, this is called to set the default player state
socket.on('createPlayer', (client_data) => {
    _player_id = client_data.id;
    _player_state = client_data.state;

});

$('#submit-name').click(function(){
    $('#name-form').hide();
    //socket.emit('setName', {player_id, nickname: $('#name').val()});
    console.log("name submitted, starting loop...");
    requestAnimationFrame(mainLoop);
});

socket.on('receiveChanges', (players)=> {
	_players = players;
});














// socket.on('state', (player_data) => {  
//     drawCanvas(player_data.players);
// });

// socket.on('updatePlayerList', (players) => {
// 	// TODO: have the player list also be updated in vue.js, just like the number of players text
// 	let player_list = document.querySelector('ul');
// 	vue_pc.num_of_players = 0;
// 	player_list.innerHTML = '';
// 	for(let p in players) {
// 		if(players[p].name != '') {
// 			let player_score = players[p].bounces / 2;
// 			let node = document.createElement('li');
// 			node.appendChild(document.createTextNode(`name: ${players[p].name}, score: ${player_score}`));
// 			player_list.appendChild(node);
// 			vue_pc.incrementPlayerCount();
// 		}
// 	}
// 	vue_pc.displayPlayerCount();
// });



// let vue_pc = new Vue({
// 	el: '#playerCount',
// 	data: {
// 		num_of_players: 1
// 	},
// 	methods: {
// 		displayPlayerCount: function() {
// 			if(this.num_of_players === 1)
// 				return `You are the only player. Share the URL with your friends!`;
// 			else 
// 				return `There are ${this.num_of_players} players. Share the URL with your friends!`;
// 		},
// 		incrementPlayerCount: function() {
// 			this.num_of_players += 1;
// 		}
// 	}
// });