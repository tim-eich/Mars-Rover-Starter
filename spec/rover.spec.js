const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.
const statusCheck = [new Command('STATUS_CHECK')];
const testCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
const modeNormalCommand = [new Command('MODE_CHANGE', 'NORMAL'), new Command('STATUS_CHECK')];
const modeLowPowCommand = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
const statusCheckMessage = new Message('status_check test', statusCheck);
const testMessage = new Message('test_message_name', testCommands);
const normModeMessage = new Message('Rover to NORMAL mode', modeNormalCommand);
const lowPowMessage = new Message('Rover to LOW_POWER', modeLowPowCommand);

// const response = testRover.receiveMessage(testMessage);
// const results = response.results;

describe("Rover class", function() {

  // 7 tests here!
  test("constructor sets position and default values for mode and generatorWatts", function(){
    let testRover = new Rover(12345);
    expect(testRover.mode).toBe('NORMAL') && expect(testRover.generatorWatts).toBe(110);
  });

  test("response returned by receiveMessage contains the name of the message", function(){
    let testRover = new Rover(12345);
    expect(testRover.receiveMessage(testMessage).name).toBe('test_message_name');
  });

  test("response returned by receiveMessage includes two results if two commands are sent in the message", function(){
    // console.log(Object.keys(results[0]).length);
    let testRover = new Rover(12345);
    expect(testRover.receiveMessage(testMessage).results.length).toBe(testCommands.length);
  });

  test("responds correctly to the status check command", function(){
    let testRover = new Rover(12345);
    expect(testRover.receiveMessage(statusCheckMessage).results[0].hasOwnProperty('roverStatus')).toBe(true);
    expect(testRover.receiveMessage(statusCheckMessage).results[0].roverStatus.mode).toBe('NORMAL');
    expect(testRover.receiveMessage(statusCheckMessage).results[0].roverStatus.generatorWatts).toBe(110);
    expect(testRover.receiveMessage(statusCheckMessage).results[0].roverStatus.position).toBe(12345);
  });

  test("responds correctly to the mode change command", function(){
    let testRover = new Rover(12345);
    expect(testRover.mode).toBe('NORMAL');
    expect(testRover.receiveMessage(testMessage).results[0].completed).toBe(true);

    expect(testRover.receiveMessage(testMessage).results[1].roverStatus.mode).toBe('LOW_POWER');

    expect(testRover.receiveMessage(normModeMessage).results[1].roverStatus.mode).toBe('NORMAL');
  });

  test("responds with a false completed value when attempting to move in LOW_POWER mode", function(){
    let testRover = new Rover(12345);
    let moveCommand = [new Command('MOVE', 56789), new Command('STATUS_CHECK')];
    let moveMessage = new Message('Move rover to 56789', moveCommand);

    expect(testRover.mode).toBe('NORMAL');

    testRover.receiveMessage(lowPowMessage);
    expect(testRover.mode).toBe('LOW_POWER');

    expect(testRover.receiveMessage(moveMessage).results[0].completed).toBe(false);
    expect(testRover.position).toBe(12345);
  });

  test("responds with the position for the move command", function(){
    let testRover = new Rover(12345);
    let moveCommand = [new Command('MOVE', 56789)];
    let moveMessage = new Message('Move rover to 56789', moveCommand);

    expect(testRover.position).toBe(12345);

    testRover.receiveMessage(moveMessage);
    expect(testRover.position).toBe(56789);
  });

});

