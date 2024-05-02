const EventEmitter = require("events");
let control = process.argv[2];

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

let myPlant = new Plant();
let validCommands = ["plantSeed", "waterPlant", "bugAttack", "harvestPlant"];

console.log(
  `Welcome to VirtualGarden\nUse the following commands: plantSeed, waterPlant, bugAttack, harvestPlant`
);

process.stdin.setEncoding("utf8");
process.stdin.on("data", (data) => {
  let command = data.trim();
  if (validCommands.includes(command)) {
    myPlant.emit(command);
  } else if ("quit" === command) {
    quit();
  } else {
    console.log(
      `${command} is not a valid command.\nUse the following commands: plantSeed, waterPlant, bugAttack, harvestPlant `
    );
  }
});

function quit() {
  console.log("Thanks for playing! Bye :)");
  process.exit();
}
