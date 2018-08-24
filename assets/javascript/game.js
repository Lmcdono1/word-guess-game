const maxTries = 12;

// Array____________________
var wordChoice = [

    "piston",
    "rotor",
    "caliper",
    "transmission",
    "battery",
    "starter",
    "engine",
    "turbo",
    "crankshaft",
    "exhaust",
]

//Parameters_________________
var gameStarted = false;    //Game begins
var gameOver = false;       //user maxes out tries and game ends 
var wins = 0;               //user total wins 
var letterGuess = [];       //Letters user has guessed
var currentWord;            //Current word chosen from array to guess
var guessWord = [];         //Building letters for word match
var remainingGuess = 0;     //How many tries user has left 

//HTML Link
function updateDisplay(){
    document.getElementById("wins").innerText = wins;
    document.getElementById("letterGuess").innerText = letterGuess;
    document.getElementById("remainingGuess").innerText = remainingGuess;
    
    document.getElementById("currentWord").innerText = " ";
        for (var i = 0; i < guessWord.length; i++){
            document.getElementById("currentWord").innerText += guessWord [i];
        }
}

//Lost Game__________________
function resetGameLost() {
    remainingGuess = maxTries;
    gameStarted = false;
    //gaveOver = true;
    document.getElementById("currentWord").innerText = " ";
    guessWord = [];
    letterGuess = [];
    document.getElementById("header").innerText = "Booo, you lost. Press any key to try again.";
}

//Win Game__________________

function resetGameWin() {
    remainingGuess = maxTries;
    wins++;
    guessWord = [];
    letterGuess = [];
    gameStarted = false;
    document.getElementById("header").innerText = "You won- huzzah! Press any key to keep playing.";
}


//Key to start
document.onkeyup = function(event){
    var userStart = event.key;
    console.log(userStart);
    if (gameStarted == false || gameOver == true){
        console.log("gameNotStarted");
        startGame();
    } else {
        console.log("gameStarted");
        lettersGuessed(userStart);
        validateCheck();
        updateDisplay();
    }

};



//Game Start___________________________________________
function startGame(){
    //pick a word
    pickWord();
    console.log(currentWord);
    //set win count to 0
    //wins = 0;
    //number of guesses remaining to 12
    remainingGuess = maxTries;
    //Underscores for letters

    //gameStarted true
    gameStarted = true;

    //update display
    updateDisplay();
    document.getElementById("header").innerText = "Guess the letter!";
}

//pick a word
function pickWord(){
    currentWord = wordChoice[Math.floor(Math.random() * wordChoice.length)];
    for (var i = 0; i < currentWord.length; i++) {
        guessWord.push("_\xa0");
    };
}
//User maxes out tries and game ends/resets
//function endGame(){
    //remainingGuess = maxTries ;
   // gameOver = true;
//}

//Total number of wins by user


//Letters user has guessed
function lettersGuessed(userStart){
    //var indexOfLetter = currentWord.indexOf(userStart);
    var found = false;
    var arr = currentWord.split('');
    console.log(arr);
    for (var i = 0; i < arr.length; i++) {
        var indexOfLetter = arr[i].indexOf(userStart);
        if (indexOfLetter >= 0){
            guessWord [i] = userStart;
            found = true;
            }
    };
    //console.log(indexOfLetter);
    if (!found){
        letterGuess.push(userStart);
        remainingGuess--;
    } 
    
    
}

function validateCheck() {
    var hasWon = true;
    for (var i = 0; i < guessWord.length; i++) {
        var indexOfLetter = guessWord[i].indexOf("_");
        if (indexOfLetter >= 0){
            hasWon = false;
        }
    };
    if (hasWon == true){
        resetGameWin();
    } else {
        if (remainingGuess == 0){
        resetGameLost();
        }
        
    }
}

