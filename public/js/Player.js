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
  }
  
  usePowerUp() {
    console.log(`picked up ${this.powerUp}.`);
    if(this.powerUp == "bigMode") {
      this.height *= 2;
      this.width *= 2;
    }
    if(this.powerUp == "speedBoost") {
      this.speed *= 2;
    }
  }

}

