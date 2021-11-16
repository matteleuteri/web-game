let socket = io();
let canvas = document.getElementById('Canvas');

let startButton = document.getElementById('startButton');
var lastRender = 0;
var player_id = -1
var player_configs = {
    'xPos': 100,
    'yPos': 100,
    'speed': 0.2,
    'direction': 0,
}

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41)
        player_configs['direction'] = e.keyCode - 37;
});

// this does not emmit anything to server because 
// other clients do not need to respond to it immediately.
socket.on('createPlayerProfile', (num_players) => {
    console.log(num_players)
    player_id = num_players;
});

socket.on('state', (config) => {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 600, 400);
    ctx.beginPath();
    for(var player_id in config) {
        current_player = config[player_id];
        current_x = current_player['xPos'];
        current_y = current_player['yPos'];
        updateCanvas(current_x, current_y, ctx);
    }
    ctx.stroke();
});

function updateCanvas(xPos, yPos, ctx) {
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos + 20, yPos);
    ctx.lineTo(xPos + 20, yPos + 20);
    ctx.lineTo(xPos, yPos + 20)
    ctx.fill();
}




window.requestAnimationFrame(loop);
function update(progress) {
    // Update the state of the world for the elapsed time since last render
    direction = player_configs['direction']
    xPos = player_configs['xPos']
    yPos = player_configs['yPos']
    speed = player_configs['speed']


    if (direction == 0) {
        xPos -= (progress * speed);
        if (xPos < -1 * 20) {xPos = 600;}
    }
    else if (direction == 1) {
        yPos -= (progress * speed);
        if (yPos < -1 * 20) {yPos = 400;}
    }
    else if (direction == 2) {
        xPos += (progress * speed);
        if (xPos > 600) {xPos = -1 * 20;}
    }
    else if (direction == 3) {
        yPos += (progress * speed);
        if (yPos > 400) {yPos = -1 * 20;}
    }
    //send update to server
    player_configs['xPos'] = xPos
    player_configs['yPos'] = yPos
    socket.emit('updateConfig', {id: player_id, configs: player_configs});
}
function loop(timestamp) {
  var progress = timestamp - lastRender;
  update(progress);
  //drawCanvas();
  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}




