const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
const testCommands = [new Command('MODE', 'LOW_POWER'), new Command('STATUS_CHECK')];
const singleMoveCommand = new Command('MOVE', 56789);
const lowPowModeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
const normalModeCommand = new Command('MODE_CHANGE', 'NORMAL');
const testMessage = new Message('test_message_name', testCommands);
const testRover = new Rover(12345);
const response = testRover.receiveMessage(testMessage);
const results = response.results[0];

describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function(){
    expect(testRover.mode).toBe('NORMAL') && expect(testRover.generatorWatts).toBe(110);
  });

  test("response returned by receiveMessage contains the name of the message", function(){
    expect(response.name).toBe('test_message_name');
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    // console.log(Object.keys(results[0]).length);
    expect(Object.keys(results).length).toBe(testCommands.length);
  });

  test("responds correctly to the status check command", function(){
    // console.log(results);
    expect(results.hasOwnProperty('roverStatus')).toBe(true);
    expect(results.roverStatus.mode).toBe('NORMAL');
    expect(results.roverStatus.generatorWatts).toBe(110);
    expect(results.roverStatus.position).toBe(12345);
  });

  test("responds correctly to the mode change command", function(){
    // const lowPowMessage = new Message('MODE to LOW_POWER', lowPowModeCommand);
    // const normalModeMessage = new Message('MODE to NORMAL', normalModeCommand);
    // const modeTestRover = new Rover(54321);
    console.log(testRover.receiveMessage(testCommands));
    expect(results.completed).toBe(true) && expect(testRover.mode).toBe('NORMAL');
    // expect(testRover.receiveMessage(lowPowModeCommand).results[0])
    // expect(modeTestRover.receiveMessage(lowPowMessage).results[0].completed).toBe(true);
  });

});
