let winEl = document.querySelector(".win");
let loseEl = document.querySelector(".lose");
let timeCountEl = document.querySelector(".timer-count");
let startButtonEl = document.querySelector(".start-button");
let resetButtonEl = document.querySelector(".reset-button");
let wordEl = document.querySelector(".word-blanks");

let secondsLeft = 10;
let isGameStarted = false;
let wins;
let loses;
let timerInterval;

let questions = ["pencil","table","ruler","appointment","constant","delicious"];
let gameWord;
let userWord;
let found = [];

document.addEventListener("keydown", keydownAction);

console.log(winEl);
console.log(loseEl);
console.log(startButtonEl);

function keydownAction(event) {
    if (!isGameStarted){
        return;
    }
    let keyPress = event.key;
    let availableKeys="abcdefghijklmnopqrstuvwxyz";
    if (availableKeys.includes(keyPress)){
        console.log(keyPress+ " is included");
        replaceChars(keyPress);
    } else {
        console.log(keyPress+ " is not included"); 
    }
    if (isAllFound()){
        clearInterval(timerInterval);
        timerEnded();
    }
  }

function init(){
    wins = 0;
    loses = 0;
    localStorage.setItem("wins",0);
    localStorage.setItem("loses",0);
}

function startGame(){
    secondsLeft = 10;
    timeCountEl.textContent = secondsLeft ;
}

function displayScore (){
    let uWins = localStorage.getItem("wins");
    let uLoses = localStorage.getItem("loses");
    winEl.textContent = uWins;
    loseEl.textContent = uLoses;
}

function userWins(){
    let wins = localStorage.getItem("wins");
    wins++;
    localStorage.setItem("wins",wins);
    console.log("Wins:"+wins);
    displayScore ();
}

function userLoses(){
    let loses = localStorage.getItem("loses");
    loses++;
    localStorage.setItem("loses",loses);
    console.log("Loses:"+loses);
    displayScore ();
}

function isAllFound() {
    if (found.length===0){
        return false;
    }
    let allFound = true;
    for(let a=0; a<found.length;a++){
        if (found[a]===false){
            allFound = false;
        }
    }
    return allFound;
}

function timerEnded(){
    isGameStarted = false;
    console.log("Timer ended.");

    if (isAllFound()){
        userWins();
    } else {
        userLoses();
    }
}

function pickWord(){
    gameWord = questions[Math.floor(Math.random() * questions.length)];
    userWord = "";
    while (found.length>0){
        found.pop();
    }
    for(let a=0;a<gameWord.length;a++){
        userWord = userWord + "_";
        found.push(false);
    }
    showWord();
    console.log(gameWord);
    console.log(userWord);
    console.log(found);
}

function replaceChars(keyPressed){
    console.log("keyPressed:"+keyPressed);
    if (gameWord.includes(keyPressed)){
        console.log("Includes keyPressed:"+keyPressed);
        for(let a=0;a<gameWord.length;a++){
            if (gameWord[a]==keyPressed){
                console.log("keyPressed char:"+a);
                userWord[a] = gameWord[a];
                found[a]=true;
                console.log("found:"+found);
            }
        }
        showWord();
    }
}

function showWord(){
    userWord = "";
    for(let a=0;a<gameWord.length;a++){
        if (found[a]){
            userWord = userWord + gameWord[a];
        } else {
            userWord = userWord + '_';
        }
    }    
    console.log("userWord:"+userWord);
    wordEl.textContent = userWord;
}

function setTime() {
    // Sets interval in variable
    timerInterval = setInterval(function() {
      secondsLeft--;
      timeCountEl.textContent = secondsLeft ;
  
      if(secondsLeft === 0) {
        // Stops execution of action at set interval
        clearInterval(timerInterval);
        // Calls function to create and append image
        timerEnded();
      }
  
    }, 1000);
  }

startButtonEl.addEventListener("click", function(event) {
    event.preventDefault();
    isGameStarted = true;
    wordEl.textContent = userWord;

    startGame();
    pickWord();
    setTime();

});

resetButtonEl.addEventListener("click", function(event) {
    init();
    displayScore ();

});

init();
