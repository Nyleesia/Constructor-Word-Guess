const letter = require("./letter.js");
const log = console.log;

function Word(word) {
  this.answer = [];

  for (var i = 0; i < word.length; i++) {
    var newletter = new letter(word[i]);
    this.answer.push(newletter);
  }

  this.log = function() {
    answerLog = " ";
    for (var i = 0; i < this.answer.length; i++) {
      answerLog += this.answer[i] + " ";
    }
    log(`\n********************************\nWORD: ${answerLog}\n********************************\n`);
  };

  this.userGuess = function(input) {
    for (var i = 0; i < this.answer.length; i++) {
      this.answer[i].guess(input);
    }
  };
}

module.exports = Word; //To be required by index.js


