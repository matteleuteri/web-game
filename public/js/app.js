import { drawCanvas } from '/js/Canvas.js';

let socket = io();
let startButton = document.getElementById('startButton');

let lastRender = 0;
let player_id = -1;
const player_configs = {
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

socket.on('state', (players) => {
    drawCanvas(players);
});

function update(progress) {
    // Update the state of the world for the elapsed time since last render
    let direction = player_configs.direction;
    let xPos = player_configs.xPos;
    let yPos = player_configs.yPos;
    let speed = player_configs.speed;
    if (direction == 0) {
        xPos -= (progress * speed);
        if (xPos < -1 * 20) 
            xPos = 600;
    }
    else if (direction == 1) {
        yPos -= (progress * speed);
        if (yPos < -1 * 20) 
            yPos = 400;
    }
    else if (direction == 2) {
        xPos += (progress * speed);
        if (xPos > 600) 
            xPos = -1 * 20;
    }
    else if (direction == 3) {
        yPos += (progress * speed);
        if (yPos > 400) 
            yPos = -1 * 20;
    }
    player_configs.xPos = xPos;
    player_configs.yPos = yPos;
    socket.emit('updateConfig', {id: player_id, configs: player_configs});
}

function loop(timestamp) {
  var progress = timestamp - lastRender;
  update(progress);
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}
window.requestAnimationFrame(loop);
