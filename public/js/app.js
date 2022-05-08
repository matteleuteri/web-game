import { drawCanvas } from '/js/Canvas.js';
import Player from '/js/Player.js';

const socket = io();

const img = document.getElementById('playerImg');
// const url = window.location.href
let _player_id = -1;
let _players = {};
let _power_ups = [];

// TODO: add variables for player height and width, to be accessed later by the canvas. 
// this will need to be done in  multiple places until there is a class/prototype/template for player
let _player_configs = new Player(); 

//todo: adjust callback to run smooth with changes in time
function mainLoop() {
    //handleInput(); // for now it just changes direction
    drawCanvas(_players, _power_ups);
    requestAnimationFrame(mainLoop);
}

// this is called once on connection. it lets the client know the socket id that the server uses to identify it.
socket.on('assignPlayerID', (my_client_id) => {
    _player_id = my_client_id;
});

socket.on('state', (state) => {  
    _players = state.players;
    _power_ups = state.powerUps;
});

// TODO: this is all scorekeeping, move to a new file
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

$('#submit-name').click(function() {
    $('#name-form').hide();
    let nickname = document.getElementById('name').value;
    let nameData = {id: _player_id, name: nickname};
    socket.emit('setName', nameData);
    requestAnimationFrame(mainLoop);
});

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41) { // arrow keys 
        _player_configs.direction = e.keyCode - 37;
    }
    if (e.keyCode == 32) { // spacebar
        _player_configs.direction = '';        
    }
    let input = {id: _player_id, new_dir: _player_configs.direction};
    socket.emit('readInput', input);
});