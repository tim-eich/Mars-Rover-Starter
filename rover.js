class Rover {
   // Write code here!
   constructor(position, mode = 'normal', generatorWatts = 110) {
      this.position = position,
      this.mode = mode,
      this.generatorWatts = generatorWatts
   }

   receiveMessage(message) {
      let name = message.name;
      return name;
   }
}

module.exports = Rover;