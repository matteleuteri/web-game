function drawCanvas() {
	var c = document.getElementById("centerCanvas");
	var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
	
	// this character path is always the same
    ctx.beginPath();
    ctx.moveTo(300, 180);
    ctx.lineTo(320, 220);
    ctx.lineTo(280, 220);
    ctx.fill();

    console.log(xPos)
    // objects are drawn with respect to world coordinates that shift with arrow keys.
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos + 20, yPos + 40);
    ctx.lineTo(xPos - 20, yPos + 40);
    ctx.fill();

	ctx.stroke();
}

// function movePlayer(dir) {
// 	if (dir == 0)
// 		xPos -= incr;
// 	else if (dir == 1)
// 		yPos -= incr;
// 	else if (dir == 2)
// 		xPos += incr;
// 	else if (dir == 3)
// 		yPos += incr;
// 	drawCanvas();
// }

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41)
	    direction = e.keyCode - 37;
});


function update(progress, dir) {
  // Update the state of the world for the elapsed time since last render
	if (dir == 0)
		xPos -= progress;
		if (xPos < 0)
			xPos = 590;
	else if (dir == 1)
		yPos -= progress;
		if (yPos < 0)
			yPos = 390;
	else if (dir == 2)
		xPos += progress;
		if (xPos > 600)
			xPos = 10;
	else if (dir == 3)
		yPos += progress;
		if (yPos > 400)
			yPos = 10;
}

function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress, direction);
  drawCanvas();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

xPos = 0;
yPos = 0;
incr = 1;
direction = 0;
var lastRender = 0;


window.requestAnimationFrame(loop);
