export default class Player {
  constructor() {
    this.name = "";
    this.xPos = 100;
    this.yPos = 100;
    this.speed = 2;
    this.directions = 0;
    this.bounces = 0;
    this.powerUp = "";
    this.height = 20;
    this.width = 20;
    // determines whether or not the player's info should be sent ot the server.
    this.isActive = false; 
  }
  
  usePowerUp() {
    console.log(`picked up ${this.powerUp}.`);
    if(this.powerUp == "bigMode") {
        this.height *= 2;
        this.width *= 2;
        setTimeout(function(){
            console.log("set timeout entered");
            this.powerUp = "";
            this.height /= 2;
            this.width /= 2;
            // this needs to be communicated to all clients via the server
        }, 10000);
    }
    if(this.powerUp == "speedBoost") {
        this.speed *= 2;
        setTimeout(function(){
            this.powerUp = "";
            this.speed /= 2;
        }, 10000);
    }
    if(this.powerUp == "movePerspective") {
        //this.speed *= 2;
    }
  }

}

