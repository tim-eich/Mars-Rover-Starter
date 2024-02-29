const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {

    test("throws error if command type is NOT passed into constructor as the first parameter", function() {
        expect( function() {new Message();}).toThrow(new Error("Error: Name is required."));
      });

    test("constructor sets name", function(){
        let testName = 'name';
        let testMessage = new Message(testName, null);
        expect(testMessage.name).toBe('name');
    });

    test("contains a commands array passed into the constructor as the 2nd argument", function(){
        let testArr = ['test', 'test2', 'test3'];
        let testName = 'name';
        let testMessage = new Message(testName, testArr);
        expect(testMessage.commands).toBe(testArr);
    });

});
