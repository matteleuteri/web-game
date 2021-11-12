function drawCanvas() {
	var c = document.getElementById("centerCanvas");
	var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.beginPath();
    ctx.moveTo(xPos, yPos);
    ctx.lineTo(xPos + 20, yPos + 40);
    ctx.lineTo(xPos - 20, yPos + 40);
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
		xPos -= progress;
		if (xPos < 0) {xPos = 590;}
	}
	else if (dir == 1) {
		yPos -= progress;
		if (yPos < 0) {yPos = 390;}
	}
	else if (dir == 2) {
		xPos += progress;
		if (xPos > 600) {xPos = 10;}
	}
	else if (dir == 3) {
		yPos += progress;
		if (yPos > 400) {yPos = 10;}
	}
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
c_width = 600;
c_height = 400;
character_width = 20;
character_height = 20;

direction = 0;
var lastRender = 0;

window.requestAnimationFrame(loop);
