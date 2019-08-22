// Declares some global constant variables.
const Word = require("./word.js");
const inquirer = require("inquirer");
const log = console.log;
const Alphabet = "abcdefghijklmnopqrstuvwxyz";
const allWords = [  "apostrophe",
                    "assassination", 
                    "amazement", 
                    "auspicious", 
                    "baseless", 
                    "bloody", 
                    "bump", 
                    "castigate", 
                    "changeful", 
                    "clangor", 
                    "control", 
                    "countless", 
                    "courtship", 
                    "critic", 
                    "critical", 
                    "dexterously", 
                    "dishearten", 
                    "dislocate", 
                    "dwindle", 
                    "eventful",
                    "exposure", 
                    "fitful", 
                    "frugal", 
                    "generous", 
                    "gnarled", 
                    "hurry",
                    "impartial",
                    "lonely",
                    "laughable",
                    "lapse",
                    "invulnerable", 
                    "inauspicious", 
                    "indistinguishable",
                    "misplaced",
                    "monumental", 
                    "multitudinous",
                    "obscene",
                    "palmy", 
                    "perusal", 
                    "pious",
                    "premeditated", 
                    "suspicious", 
                    "radiance", 
                    "reliance", 
                    "road", 
                    "sanctimonious", 
                    "seamy", 
                    "sportive", 
                    "submerge", 
                    "bandit",
                    "dauntless", 
                    "elbow", 
                    "swagger"];
const wordRandomizer = Math.floor(Math.random() * allWords.length);
const randomWord = allWords[wordRandomizer];

// Declares some global manipulated variables.
let constructorWord = new Word(randomWord);
let getNewWord = false;
let lettersNotInWord = [];
let lettersInWord = [];
let remainingGuesses = 7;

// Main game function.
function gamePlay() {
  if (getNewWord) { 
    let wordRandomizer = Math.floor(Math.random() * allWords.length);
    let randomWord = allWords[wordRandomizer];
    constructorWord = new Word(randomWord);
    getNewWord = false;
  }

  const completeWord = [];
  constructorWord.answer.forEach(completeCheck);

  if (completeWord.includes(false)) {
    inquirer
      .prompt([
        {
          type: "input",
          message: "\n Guess a letter between a-z! \n",
          name: "userInput"
        }
      ])
      .then(function(input) {
        if (
          !Alphabet.includes(input.userInput) ||
          input.userInput.length > 1
        ) {
          log(`\n Try again!\n`);
          gamePlay();
        } 
        else {
          if (
            lettersNotInWord.includes(input.userInput) ||
            lettersInWord.includes(input.userInput) ||
            input.userInput === " "
          ) {
            log(`\n Enter a LETTER that you have NOT yet guessed \n`);
            gamePlay();
          } 
          else {
            let wordChecker = [];
            constructorWord.userGuess(input.userInput);
            constructorWord.answer.forEach(wordCheck);
            if (wordChecker.join("") === completeWord.join("")) {
              log(`\n NOPE! ${input.userInput} is not in this word. \n`);

              lettersNotInWord.push(input.userInput);
              remainingGuesses--;
            } 
            else {
              log(`\n YUP! ${input.userInput} is in this word.\n`);
              lettersInWord.push(input.userInput);
            }

            constructorWord.log();

            log(`You have ${remainingGuesses} guesses left! \n\n`);

            log(
              `Letters Guessed: ${lettersNotInWord.join(" ")}\n`
            );

            if (remainingGuesses > 0) {
              gamePlay();
            } 
            else {
              log(`Sorry, you lose! The word was ${randomWord}\n`);
              restartGame();
            }

            function wordCheck(key) {
              wordChecker.push(key.guessed);
            }
          }
        }
      });
  } 
  else {
    log(`YUP! The word was ${randomWord}. \n****** YOU WIN! ******\n`);

    restartGame();
  }

  function completeCheck(key) {
    completeWord.push(key.guessed);
  }
}

function restartGame() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to:",
        choices: ["Play Again?", "Exit."],
        name: "restart"
      }
    ])
    .then(function(input) {
      if (input.restart === "Play Again?") {
        getNewWord = true;
        lettersNotInWord = [];
        lettersInWord = [];
        remainingGuesses = 7;
        gamePlay();
      } 
      else {
        return;
      }
    });
}

gamePlay();