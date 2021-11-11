xPos = 0;
yPos = 0;

function drawCanvas() {
	var c = document.getElementById("centerCanvas");
	var ctx = c.getContext("2d");
	ctx.moveTo(0, 0);
	ctx.lineTo(200, 100);
	ctx.stroke();

}

function moveCanvas(dir) {
	if (dir == 0)
		xPos--;
	else if (dir == 1)
		xPos++;
	else if (dir == 2)
		yPos++;
	else if (dir == 3)
		yPos--;
	drawCanvas();
}

$(document).keydown(function(e) {
    if (e.keyCode == 37)
    	moveCanvas(0);
    else if (e.keyCode == 38) 
      	moveCanvas(1) ;         
    else if (e.keyCode == 39) 
      	moveCanvas(2);
    else if (e.keyCode == 40) 
      	moveCanvas(3);
});

drawCanvas()