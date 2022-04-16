// import { io, Socket } from "/socket.io-client";
// import { drawCanvas } from '/js/Canvas.js';
let player_id = "-1";
// let socket = io()
// socket.on('createPlayerProfile', (my_client_id: string) => {
//     player_id = my_client_id;
//     console.log("my client id is set");
// });
// socket.on('state', (player_data) => {  
//drawCanvas(player_data.players);
// });
// socket.on('updatePlayerList', (players) => {
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
// });
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
document.addEventListener('keydown', function (event) {
    if (event.keyCode == 37) {
        console.log('Left was pressed');
    }
    else if (event.keyCode == 39) {
        alert('Right was pressed');
    }
});
//# sourceMappingURL=app.js.map