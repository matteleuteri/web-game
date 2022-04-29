let canvas = document.getElementById('Canvas');
let canvas_context = canvas.getContext("2d");

export function drawCanvas(players, power_ups) {
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    canvas_context.beginPath();
    for(let player_id in players) {
        let current_player = players[player_id];
        drawPlayer(current_player, canvas_context);
    }
    for(let p in power_ups) {
        let power_up = power_ups[p];
        drawPowerUp(power_up, canvas_context);
    }
    canvas_context.stroke();
}

function drawPlayer(current_player, ctx) {
    let xPos = current_player.xPos;
    let yPos = current_player.yPos;
    // ctx.moveTo(xPos - 10, yPos - 10);
    // ctx.lineTo(xPos + 10, yPos - 10);
    // ctx.lineTo(xPos + 10, yPos + 10);
    // ctx.lineTo(xPos - 10, yPos + 10);
    // ctx.fill();
    let img = document.getElementById('playerImg1');
    if(f) {
        // use pics that end in 1
        if(current_player.direction == 0) {//left
            img = document.getElementById('playerImg1');
        }
        else if(current_player.direction == 2) {//right
            img = document.getElementById('playerImg2');
        }
    }
    else {
        if(current_player.direction == 0) {
            img = document.getElementById('playerImg3');
        }
        else if(current_player.direction == 2) {
            img = document.getElementById('playerImg4');
        }
    }
    ctx.drawImage(img, xPos - 10, yPos - 10);
}

function drawPowerUp(pu, ctx) {
    ctx.moveTo(pu.x - 5, pu.y - 5);
    ctx.lineTo(pu.x + 5, pu.y - 5);
    ctx.lineTo(pu.x + 5, pu.y + 5);
    ctx.lineTo(pu.x - 5, pu.y + 5);
    ctx.fill();
}

// select which fraame we are in
let f = true;
setInterval(function() {
    f = !f;
}, 250);