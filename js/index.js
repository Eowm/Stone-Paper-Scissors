'use strict';
var output = document.getElementById('output');


//pobieranie przycisku
var buttonRock = document.getElementById("rock");
var buttonScissors = document.getElementById("scissors");
var buttonPaper = document.getElementById("paper");
var moves  = document.querySelectorAll('.player-move');
var playerMoveClassLength = moves.length;

buttonRock.addEventListener('click', function() {
userMove('rock') });
buttonScissors.addEventListener('click', function() {
userMove('scissors')});
buttonPaper.addEventListener('click', function() { 
userMove('paper') });






//global variables
var params = {
    playerResult: 0,
    compResult: 0,
    round: 0, 
    endGame: true,
    nrOfRounds: 0,
    progress: [] 
  } 


  for (var i = 0; i < playerMoveClassLength; i++) {
    moves[i].addEventListener('click', function () {  
        userMove(this.getAttribute('data-move'));
    });
  } 


var modalsWin = function(){
var showModal = function(event){
    event.preventDefault();
    document.querySelector('#win').classList.add('show');
  };

  showModal(event);
  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#win').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  document.querySelector('#win').addEventListener('click', hideModal);
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
     event.stopPropagation();
    });
  }
}

var modalsLost = function(){
var showModal = function(event){
    event.preventDefault();
    document.querySelector('#lost').classList.add('show');
  };

  showModal(event);
  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#lost').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  document.querySelector('#lost').addEventListener('click', hideModal);
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
     event.stopPropagation();
    });
  }
}

var modalsDraw = function(){
var showModal = function(event){
    event.preventDefault();
    document.querySelector('#draw').classList.add('show');
  };

  showModal(event);
  var hideModal = function(event){
    event.preventDefault();
    document.querySelector('#draw').classList.remove('show');
  };
  
  var closeButtons = document.querySelectorAll('.modal .close');
  
  for(var i = 0; i < closeButtons.length; i++){
    closeButtons[i].addEventListener('click', hideModal);
  }
  document.querySelector('#draw').addEventListener('click', hideModal);
  var modals = document.querySelectorAll('.modal');
  
  for(var i = 0; i < modals.length; i++){
    modals[i].addEventListener('click', function(event){
     event.stopPropagation();
    });
  }
}




//blokowanie przyciskow
var disabledButtons = function(value) {
  buttonRock.disabled = value; 
  buttonPaper.disabled = value; 
  buttonScissors.disabled = value;
};

  disabledButtons(true);

//resetowanie wynikow
var endGame = function() {
  params.playerResult = 0;
  params.compResult = 0;
  params.round = 0;
  params.nrOfRounds = 0;
  params.progress = [];
  
  params.progress = [];
  output.innerHTML = ('');
  results.innerHTML = ('');
  rounds.innerHTML = ('');
  roundsNr.innerHTML = ('');
} 

//start gry
var newGame = function() {
  endGame();
  disabledButtons(false);
  
  params.nrOfRounds = window.prompt('How many rounds would You like to play?');
  if (isNaN(params.nrOfRounds) || params.nrOfRounds ==='' || params.nrOfRounds === null){
    output.innerHTML = 'Wrong Value. Try one more time';
    lineBreak();
  }
  roundsNr.innerHTML = params.nrOfRounds;
  return params.nrOfRounds;
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
    params.round +=1;
  } else if (userWin) {
    output.insertAdjacentHTML('afterbegin', '</br>' + ('YOU WON!!! with ' + userMove + ' against ' +         compMove));
    params.playerResult += 1;
    params.round +=1;
  } else {
    output.insertAdjacentHTML('afterbegin', '</br>' + ('You have lost with ' + userMove + ' against ' +       compMove));
    params.compResult +=1;
    params.round +=1;
  }
  
  //wynik
  var overalResult = function() {
    results.insertAdjacentHTML('afterbegin', '</br>' + (params.playerResult + " to " + params.compResult));
  }

  //liczba rund
  var nrRound = function() {
    rounds.insertAdjacentHTML('afterbegin', '</br>' + (params.round));
  }
  
  overalResult();
  nrRound();

   // this object return to params.progress actuall result the game
    var object = {
        MatchRounds: params.round,
        MatchPlayerResult: params.playerResult,
        MatchComputerResult: params.compResult,
        FinallyResult: params.UserMove + ' - ' + params.compMove
    };
    params.progress.push(object);

    // this table build tr in tbody table
  
  //sprawdzanie konca gry
  if (params.round == params.nrOfRounds) {
    if (params.compResult > params.playerResult) {//
     // output.insertAdjacentHTML('afterbegin','YOU LOST! </br>');
        modalsLost();
    } else if (params.compResult == params.playerResult) {
     //   output.insertAdjacentHTML('afterbegin','ITs A DRAW </br>');
        modalsDraw();
      } else {
    //    output.insertAdjacentHTML('afterbegin','YOU WON! </br>');
        modalsWin();
      }
    disabledButtons(true);
  }  
}

//przycisk nowa gra
var btnNewGame = document.getElementById("newGame");

btnNewGame.addEventListener('click', function() {
  newGame()
} )