function drawCanvas() {
	var c = document.getElementById("centerCanvas");
	var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos + character_width, yPos);
    ctx.lineTo(xPos + character_width, yPos + character_height);
    ctx.lineTo(xPos, yPos + character_height)
    ctx.fill();
	ctx.stroke();
}

$(document).keydown(function(e) {
    if (e.keyCode > 36 && e.keyCode < 41)
	    direction = e.keyCode - 37;
});

function update(progress, dir) {
    // Update the state of the world for the elapsed time since last render
	if (dir == 0) {
		xPos -= (progress * speed);
		if (xPos < -1 * character_width) {xPos = c_width;}
	}
	else if (dir == 1) {
		yPos -= (progress * speed);
		if (yPos < -1 * character_height) {yPos = c_height;}
	}
	else if (dir == 2) {
		xPos += (progress * speed);
		if (xPos > c_width ) {xPos = -1 * character_width;}
	}
	else if (dir == 3) {
		yPos += (progress * speed);
		if (yPos > c_height) {yPos = -1 * character_height;}
	}
}

function loop(timestamp) {
  var progress = timestamp - lastRender;

  update(progress, direction);
  drawCanvas();

  lastRender = timestamp;
  window.requestAnimationFrame(loop);
}

var xPos = 100;
var yPos = 100;
var speed = 0.2;
var c_width = 600;
var c_height = 400;
var character_width = 20;
var character_height = 20;
var direction = 0;
var lastRender = 0;

window.requestAnimationFrame(loop);
