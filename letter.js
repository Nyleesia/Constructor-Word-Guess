function Input(letter) { 
    this.input = letter;
    this.guessed = false;
    
    this.toString = function() {
        if (this.input === " ") {
            this.guessed = true; 
            return " ";
        }

        if (this.guessed === false) { 
          return "_"; 
        }

        else {
          return this.input;
        }
    };

    this.guess = function(guess) {
      if (guess === this.input) {
        this.guessed = true;
      }
    };
}
  
  module.exports = Input; //To be required by word.js