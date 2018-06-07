'use strict';
var output = document.getElementById('output');
var playerResult = 0;
var compResult = 0;
var round = 0;
var nrOfRounds = 0;

var buttonRock = document.getElementById("rock");
var buttonScissors = document.getElementById("scissors");
var buttonPaper = document.getElementById("paper");

buttonRock.addEventListener('click', function() {
userMove('rock') });
buttonScissors.addEventListener('click', function() {
userMove('scissors')});
buttonPaper.addEventListener('click', function() { 
userMove('paper') });

var disabledButtons = function(value) {
  buttonRock.disabled = value; 
  buttonPaper.disabled = value; 
  buttonScissors.disabled = value;
};

var endGame = function() {
  playerResult = 0;
  compResult = 0;
  round = 0;
  nrOfRounds = 0;
  
  output.innerHTML = ('');
  results.innerHTML = ('');
  rounds.innerHTML = ('');
  roundsNr.innerHTML = ('');
} 

var newGame = function() {
  endGame();
  disabledButtons(false);
  
  nrOfRounds = window.prompt('How many rounds would You like to play?');
  if (isNaN(nrOfRounds) || nrOfRounds ==='' || nrOfRounds === null){
    output.innerHTML = 'Wrong Value. Try one more time';
    lineBreak();
  }
  roundsNr.innerHTML = nrOfRounds;
  return nrOfRounds;
}

var whatCompMove = function() {
  var possiblePicks = ['rock', 'scissors', 'paper'];
  return possiblePicks[Math.floor(Math.random() * 3)];
}
  
var userMove = function(move) {
  var userWin = false;
  var compWin = false;
  var draw = false;
  var compMove = whatCompMove();
   switch(compMove) {
    case 'rock' :
      if (move == 'rock') {
        draw = true;
      } else if (move == 'scissors') {
        compWin = true;
      } else {
        userWin = true;
      }
    break;
    case 'scissors' :
      if (move == 'rock') {
        userWin = true;
      } else if (move == 'scissors') {
        draw = true;
      } else {
        compWin = true;
      }
    break;
    case 'paper' :
      if (move == 'rock') {
        compWin = true;
      } else if (move == 'scissors') {
        userWin = true;
      } else {
        draw = true;
      }
    break;
    }
  result(userWin, compWin, draw, move, compMove);
}
  
var result = function(userWin, compWin, draw, userMove, compMove) {
  if (draw) {
    output.insertAdjacentHTML('afterbegin', '</br>' + ('Its a draw'));
    round +=1;
  } else if (userWin) {
    output.insertAdjacentHTML('afterbegin', '</br>' + ('YOU WON!!! with ' + userMove + ' against ' +         compMove));
    playerResult += 1;
    round +=1;
  } else {
    output.insertAdjacentHTML('afterbegin', '</br>' + ('You have lost with ' + userMove + ' against ' +       compMove));
    compResult +=1;
    round +=1;
  }
  
  var overalResult = function() {
    results.insertAdjacentHTML('afterbegin', '</br>' + (playerResult + " to " + compResult));
  }

  var nrRound = function() {
    rounds.insertAdjacentHTML('afterbegin', '</br>' + (round));
  }
  
  overalResult();
  nrRound();
  
  if (round == nrOfRounds) {
    if (compResult > playerResult) {
      output.insertAdjacentHTML('afterbegin','YOU LOST! </br>');
    } else if (compResult == playerResult) {
        output.insertAdjacentHTML('afterbegin','ITs A DRAW </br>');
      } else {
        output.insertAdjacentHTML('afterbegin','YOU WON! </br>');
      }
    disabledButtons(true);
  }  
}

var btnNewGame = document.getElementById("newGame");

btnNewGame.addEventListener('click', function() {
  newGame()
} )