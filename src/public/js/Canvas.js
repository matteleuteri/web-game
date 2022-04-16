// let canvas = document.getElementById('Canvas');
// let canvas_context = canvas.getContext("2d");
// export function drawCanvas(configs) {
//     canvas_context.clearRect(0, 0, 600, 400);
//     canvas_context.beginPath();
//     for(let player_id in configs) {
//         let current_player = configs[player_id];
//         let current_x = current_player.xPos;
//         let current_y = current_player.yPos;
//         drawPlayer(current_x, current_y, canvas_context);
//     }
//     canvas_context.stroke();
// }
// function drawPlayer(xPos, yPos, ctx) {
//     ctx.moveTo(xPos - 10, yPos - 10);
//     ctx.lineTo(xPos + 10, yPos - 10);
//     ctx.lineTo(xPos + 10, yPos + 10);
//     ctx.lineTo(xPos - 10, yPos + 10);
//     ctx.fill();
// }
//# sourceMappingURL=Canvas.js.map