const EventEmitter = require("events");

class Robot extends EventEmitter {
  constructor(name) {
    super();
    this.name = name;
    this.isActive = false;
    this.addListeners();
  }
  addListeners() {
    this.once("activate", this.activateListener);
    this.on("speak", this.speakListener);
  }
  activateListener() {
    this.isActive = true;
  }
  speakListener(quote) {
    if (this.isActive) {
      console.log(`${this.name}: ${quote}`);
    }
  }
}

const myRobot = new Robot("RoboNicole");
myRobot.emit("speak", "hello");
myRobot.emit("activate");
myRobot.emit("speak", "I'm eepy");
