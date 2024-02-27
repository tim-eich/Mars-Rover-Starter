class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position,
      this.mode = mode,
      this.generatorWatts = generatorWatts
   }

   receiveMessage(message) {
      let commands = [message.commands];
      let results = [];
      for (let i = 0; i < commands.length; i++) {
         if (commands[i].commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') {
               results.push({complete: false})
            } else {
               this.position = command.value;
               results.push({completed: true});
            }
         } else if (commands[i].commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            results.push({complete: true});
         } else if (commands[i].commandType === 'STATUS_CHECK') {
            results.push({
               completed: true,
               roverStatus: {
                  mode: this.mode,
                  generatorWatts: this.generatorWatts,
                  position: this.position
               }
            });
         }
      }
      let response = {
         name: message.name,
         results: results
      };
      return response;
   }
}



module.exports = Rover;