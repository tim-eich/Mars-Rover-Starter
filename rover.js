class Rover {
   // Write code here!
   constructor(position, mode = 'NORMAL', generatorWatts = 110) {
      this.position = position,
      this.mode = mode,
      this.generatorWatts = generatorWatts
   }

   receiveMessage(message) {
      let response = { name: message.name }
      let commands = message.commands;
      // console.log(commands);
      let results = [];
      // console.log(`commands.length: ${commands.length}`);
      for (let i = 0; i < commands.length; i++) {
         // console.log(i);
         if (commands[i].commandType === 'MOVE') {
            let resultReturned = {}
            if (this.mode === 'NORMAL') {
               resultReturned.completed = true;
               this.position = command.value;
               results.push(resultReturned);
            } else {
               resultReturned.completed = false;
               results.push(resultReturned);
            }
         } else if (commands[i].commandType === 'MODE_CHANGE') {
            let resultReturned = {}
            this.mode = commands[i].value;
            resultReturned.completed = true;
            results.push(resultReturned);
         } else if (commands[i].commandType === 'STATUS_CHECK') {
            let resultReturned = {}
            resultReturned.completed = true;
            resultReturned.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            }
            results.push(resultReturned);
         }
      }
      response.results = results;
      return response;
   }
}



module.exports = Rover;