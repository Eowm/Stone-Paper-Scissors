'use strict';
var output = document.getElementById('output');
var playerResult = 0;
var compResult = 0;
var round = 0;
var nrOfRounds = 0;

//pobieranie przycisku
var buttonRock = document.getElementById("rock");
var buttonScissors = document.getElementById("scissors");
var buttonPaper = document.getElementById("paper");

buttonRock.addEventListener('click', function() {
userMove('rock') });
buttonScissors.addEventListener('click', function() {
userMove('scissors')});
buttonPaper.addEventListener('click', function() { 
userMove('paper') });




var showModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.add('show');
  };
  var modalLinks = document.querySelectorAll('.show-modal');
  
  for(var i = 0; i < modalLinks.length; i++){
    modalLinks[i].addEventListener('click', showModal);
  }
  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#modal-overlay').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  document.querySelector('#modal-overlay').addEventListener('click', hideModal);
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
      event.stopPropagation();
    });
  }







var moves  = document.querySelectorAll('.player-move');

for(var i = 0; i<moves.length; i++){
  moves[i] = userMove(element.getAttribute(data-move));
}

var params = {playerResult: 0,compResult: 0,round: 0,nrOfRound: 0} 


//blokowanie przyciskow
var disabledButtons = function(value) {
  buttonRock.disabled = value; 
  buttonPaper.disabled = value; 
  buttonScissors.disabled = value;
};

  disabledButtons(true);

//resetowanie wynikow
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

//start gry
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

//ruch kompa
var whatCompMove = function() {
  var possiblePicks = ['rock', 'scissors', 'paper'];
  return possiblePicks[Math.floor(Math.random() * 3)];
}
  
//ruch gracza
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
  
  //sprawdzanie wynikow, dodawanie punkotów, wypisywanie wynikow
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
  
  //wynik
  var overalResult = function() {
    results.insertAdjacentHTML('afterbegin', '</br>' + (playerResult + " to " + compResult));
  }

  //liczba rund
  var nrRound = function() {
    rounds.insertAdjacentHTML('afterbegin', '</br>' + (round));
  }
  
  overalResult();
  nrRound();
  
  //sprawdzanie konca gry
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

//przycisk nowa gra
var btnNewGame = document.getElementById("newGame");

btnNewGame.addEventListener('click', function() {
  newGame()
} )