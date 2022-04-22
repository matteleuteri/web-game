let canvas = document.getElementById('Canvas');
let canvas_context = canvas.getContext("2d");

export function drawCanvas(players, power_ups) {
    canvas_context.clearRect(0, 0, canvas.width, canvas.height);
    canvas_context.beginPath();
    for(let player_id in players) {
        let current_player = players[player_id];
        drawPlayer(current_player, canvas_context);
    }
    for(let pus in power_ups) {
    	let pu = power_ups[pus];
    	drawPowerUp(pu, canvas_context);
    }
    canvas_context.stroke();
}

// these draw functions are temporary

function drawPlayer(current_player, ctx) {
	let xPos = current_player.xPos;
    let yPos = current_player.yPos;
    ctx.moveTo(xPos - 10, yPos - 10);
    ctx.lineTo(xPos + 10, yPos - 10);
    ctx.lineTo(xPos + 10, yPos + 10);
    ctx.lineTo(xPos - 10, yPos + 10);
    ctx.fill();
}

function drawPowerUp(pu, ctx) {
    ctx.moveTo(pu.x - 5, pu.y - 5);
    ctx.lineTo(pu.x + 5, pu.y - 5);
    ctx.lineTo(pu.x + 5, pu.y + 5);
    ctx.lineTo(pu.x - 5, pu.y + 5);
    ctx.fill();
}