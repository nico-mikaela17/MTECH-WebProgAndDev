const { log } = require("console");
const EventEmitter = require("events");

class Plant extends EventEmitter {
  constructor(size) {
    super();
    this.size = size;
    this.hasBeenPlanted = false;
    this.addListeners();
  }
  addListeners() {
    this.once("plantSeed", this.plantSeed);
    this.on("waterPlant", this.waterPlant);
    this.on("bugAttack", this.bugAttack);
    this.on("harvestPlant", this.harvestPlant);
    this.on("error", (err) => {
      console.log("whoops! there was an error");
    });
  }
  plantSeed() {
    this.hasBeenPlanted = true;
    this.size = 1;
    console.log(`Seed has been planted and the size is ${this.size}`);
  }
  waterPlant() {
    if (this.hasBeenPlanted) {
      this.size = this.size + 1;
      console.log(`Watering plant... Size now is ${this.size}`);
    } else {
      console.log("The seed has not yet been planted");
    }
  }
  bugAttack() {
    if (this.hasBeenPlanted) {
      this.size = this.size - 1;
      console.log(`Bug attack... Size now is ${this.size}`);
    } else {
      console.log("The seed has not yet been planted");
    }
  }
  harvestPlant() {
    if (this.hasBeenPlanted) {
      console.log(`Size of the plant harvested: ${this.size}`);
      this.removeAllListeners();
    } else {
      console.log("The seed has not yet been planted");
    }
  }
}

const myPlant = new Plant();
myPlant.emit("waterPlant");
myPlant.emit("bugAttack");
myPlant.emit("plantSeed");
myPlant.emit("waterPlant");
myPlant.emit("error");
myPlant.emit("waterPlant");
myPlant.emit("waterPlant");
myPlant.emit("bugAttack");
myPlant.emit("harvestPlant");
myPlant.emit("waterPlant");
