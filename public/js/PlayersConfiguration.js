export function updateConfiguration(player_configs) {
    let direction = player_configs.direction;
    let xPos = player_configs.xPos;
    let yPos = player_configs.yPos;
    let speed = player_configs.speed;
    if (direction === 0) {
        xPos -= speed;
        if (xPos < -1 * 20) 
            xPos = 600;
    }
    else if (direction === 1) {
        yPos -= speed;
        if (yPos < -1 * 20) 
            yPos = 400;
    }
    else if (direction === 2) {
        xPos += speed;
        if (xPos > 600) 
            xPos = -1 * 20;
    }
    else if (direction === 3) {
        yPos += speed;
        if (yPos > 400) 
            yPos = -1 * 20;
    }
    player_configs.xPos = xPos;
    player_configs.yPos = yPos;
    return player_configs;
}

export function collide(players) {
	for(let p1 in players) {
    	for(let p2 in players) {
    		if(p1 != p2) {
	    		let c_pair = willCollide(players[p1], players[p2]);
    			players[p1] = c_pair.p1;
    			players[p2] = c_pair.p2;
    		}
    	}
    }
    return;
}


function calculateCollision(p1, p2) {
    // let p1x = p1.xPos;
    // let p1y = p1.yPos;
    // let p1d = p1.direction;
    // let p2x = p2.xPos;
    // let p2y = p2.yPos;
    // let p2d = p2.direction;// THE IF BELOW SHOULD ALSO CHECK DIRECTION!!!!!!!!!
    // if(Math.abs(p1x - p2x) <= 20 && Math.abs(p1y - p2y) <= 20) {
    //     // check if it is head to head or head to side by checking direction of both and adding them
    //     if((p1d + p2d) % 2 === 0) {
    //         p1.direction = p2d;
    //         p2.direction = p1d; 
    //         console.log('head on collision!');
    //     }
    //     else {
    //         //find the player causing the collision
    //         if(Math.abs(p1x - p2x) < Math.abs(p1y - p2y)) {
    //             //guy going in y dir gets reversed and guy going in x direction goes in other guys original direction
    //             if(p1d % 2 === 1) {
    //                 p1.direction = (p1d + 2) % 4;
    //                 p2.direction = p1d;
    //             }
    //             else {
    //                 p2.direction = (p2d + 2) % 4;
    //                 p1.direction = p2d;                    
    //             }
    //         }
    //         else {
    //             if(p1d % 2 === 0) {
    //                 p1.direction = (p1d + 2) % 4;
    //                 p2.direction = p1d;
    //             }
    //             else {
    //                 p2.direction = (p2d + 2) % 4;
    //                 p1.direction = p2d;     
    //             }
    //         }
    //     }
    // }
}

function willCollide(p1, p2) {
    let p1x = p1.xPos;
    let p1y = p1.yPos;
    let p1d = p1.direction;
    let p2x = p2.xPos;
    let p2y = p2.yPos;	
    let p2d = p2.direction;
    if(Math.abs(p1x - p2x) <= 20 && Math.abs(p1y - p2y) <= 20) {
    	if(Math.abs(p1x - p2x) < Math.abs(p1y - p2y)) {// one is on top of the other
    		if(p1y < p2y && p1d === 3 && p2d === 1) {
    			p1.direction = 1;
    			p2.direction = 3;
    		}
    		else if(p1y < p2y && p1d == 3 && (p2d === 0 || p2d === 2)) {
    			p1.direction = 1;
    			p2.direction = 3;
    		}
    		else if(p1y < p2y && p2d === 1 && (p1d === 0 || p1d === 2)) {
    			p1.direction = 1;
    			p2.direction = 3;
    		}
    		else if(p2y < p1y && p2d === 3 && p1d === 1) {
    			p1.direction = 3;
    			p2.direction = 1;
    		}
    		else if(p2y < p1y && p2d == 3 && (p1d === 0 || p1d === 2)) {
    			p1.direction = 3;
    			p2.direction = 1;
    		}
    		else if(p2y < p1y && p1d === 1 && (p2d === 0 || p2d === 2)) {
    			p1.direction = 3;
    			p2.direction = 1;
    		}
    	}
    	else {// one is on the left of the other
    		if(p1x < p2x && p1d === 2 && p2d === 0) {
    			p1.direction = 0;
    			p2.direction = 2;
    		}
    		else if(p1x < p2x && p1d === 2 && (p2d === 1 || p2d === 3)) {
    			p1.direction = 0;
    			p2.direction = 2;
    		}
    		else if(p1x < p2x && p2d === 0 && (p1d === 1 || p1d === 3)) {
    			p1.direction = 0;
    			p2.direction = 2;
    		}
    		else if(p2x < p1x && p2d === 2 && p1d === 0) {
    			p1.direction = 2;
    			p2.direction = 0;
    		}
    		else if(p2x < p1x && p2d === 2 && (p1d === 1 || p1d === 3)) {
    			p1.direction = 2;
    			p2.direction = 0;
    		}
    		else if(p2x < p1x && p1d === 0 && (p2d === 1 || p2d === 3)) {
    			p1.direction = 2;
    			p2.direction = 0;
    		}
    	}
    }
    return { p1, p2 };
}


