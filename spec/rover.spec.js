const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(null);
    expect(testRover.mode).toBe('normal') && expect(testRover.generatorWatts).toBe(110);
  });

  test("response returned by receiveMessage contains the name of the message", function(){
    let testMessage = new Message('message test string', null);
    let testRover = new Rover('12345')
    expect(testRover.receiveMessage(testMessage)).toBe('message test string');
  });

});
