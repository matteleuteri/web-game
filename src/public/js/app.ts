// import { drawCanvas } from '/js/Canvas.js';
import io from "socket.io-client"
let socket = io();
let player_id = -1;

// $(document).keydown(function(e) {
//     if (e.keyCode > 36 && e.keyCode < 41)
//     	socket.emit('update_dir', {id: player_id, new_dir: e.keyCode - 37});
// });

socket.on('createPlayerProfile', (my_client_id) => {
    player_id = my_client_id;
});

socket.on('state', (player_data) => {  
    //drawCanvas(player_data.players);
});

socket.on('updatePlayerList', (players) => {
	// TODO: have the player list also be updated in vue.js, just like the number of players text
	// let player_list = document.querySelector('ul');
	// vue_pc.num_of_players = 0;
	// player_list.innerHTML = '';
	// for(let p in players) {
	// 	if(players[p].name != '') {
	// 		let player_score = players[p].bounces / 2;
	// 		let node = document.createElement('li');
	// 		node.appendChild(document.createTextNode(`name: ${players[p].name}, score: ${player_score}`));
	// 		player_list.appendChild(node);
	// 		vue_pc.incrementPlayerCount();
	// 	}
	// }
	// vue_pc.displayPlayerCount();
});

// $('#submit-name').click(function(){
//     $('#name-form').hide();
//     socket.emit('setName', {player_id, nickname: $('#name').val()});
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