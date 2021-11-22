import { drawCanvas } from '/js/Canvas.js';
import { updateConfiguration, checkCollision } from '/js/PlayersConfiguration.js';

let socket = io();
let startButton = document.getElementById('startButton');

let lastRender = 0;
let player_id = -1;
let player_configs = {
    xPos: 100,
    yPos: 100,
    speed: 0.2,
    direction: 0,
};

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41)
        player_configs.direction = e.keyCode - 37;
});

socket.on('createPlayerProfile', (my_client_id) => {
    player_id = my_client_id;
});

socket.on('state', (player_data) => {
    if(player_data.player_count == 1)
        document.getElementById('playerCount').innerHTML = "Only you are connected. Share the link with yor friends!";
    else
        document.getElementById('playerCount').innerHTML = "There are " + player_data.player_count + " players. Share the link with yor friends!";        
    drawCanvas(player_data.players);
});

socket.on('checkCollision', (players) => {
    for(let player in players) {
        if(player != player_id) {
            let other_player_configs = players[player];
            let this_player_configs = player_configs;
            if(checkCollision(other_player_configs, this_player_configs)) {
                console.log('collision detected!');
            }
        }

    }
});

function update(progress) {
    player_configs = updateConfiguration(progress, player_configs);
    socket.emit('updateConfig', {id: player_id, configs: player_configs});
}

function loop(timestamp) {
  let progress = timestamp - lastRender;
  update(progress);
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
