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

export function checkCollision(p1, p2) {
    // TODO
    return false;
}