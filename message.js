class Message {
   // Write code here!
   constructor(name, commands){
      this.name = name;
      if (!name) {
         throw Error("Error: Name is required.");
      }
      this.commands = commands;
   }
}

module.exports = Message;