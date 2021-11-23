export function updateConfiguration(progress, player_configs) {
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
    return player_configs;
}

export function collide(p1, p2) {
    let p1x = p1.xPos;
    let p1y = p1.yPos;
    let p1d = p1.direction;
    let p2x = p2.xPos;
    let p2y = p2.yPos;
    let p2d = p2.direction;
    if(Math.abs(p1x - p2x) <= 20 && Math.abs(p1y - p2y) <= 20) {
        // check if it is head to head or head to side by checking direction of both and adding them
        if((p1d + p2d) % 2 === 0) {
            p1.direction = p2d;
            p2.direction = p1d; 
        }
        else {
            //find the player causing the collision
            if(Math.abs(p1x - p2x) < Math.abs(p1y - p2y)) {
                //guy going in y dir gets reversed and guy going in x direction goes in other guys original direction
                if(p1d % 2 == 1) {
                    p1.direction = (p1d + 2) % 4;
                    p2.direction = p1d;
                }
                else {
                    p2.direction = (p2d + 2) % 4;
                    p1.direction = p2d;                    
                }
            }
            else {
                if(p1d % 2 == 0) {
                    p1.direction = (p1d + 2) % 4;
                    p2.direction = p1d;
                }
                else {
                    p2.direction = (p2d + 2) % 4;
                    p1.direction = p2d;     
                }
            }
        }
    }

    return { p1, p2 };
}