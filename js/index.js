'use strict';
var output = document.getElementById('output');




//pobieranie przycisku
var buttonRock = document.getElementById("rock");
var buttonScissors = document.getElementById("scissors");
var buttonPaper = document.getElementById("paper");
var moves = document.querySelectorAll('.player-move');
var playerMoveClassLength = moves.length;

/*buttonRock.addEventListener('click', function() {
userMove('rock') });
buttonScissors.addEventListener('click', function() {
userMove('scissors')});
buttonPaper.addEventListener('click', function() { 
userMove('paper') });*/

for (var i = 0; i < playerMoveClassLength; i++) {
    moves[i].addEventListener('click', function() {
        userMove(this.getAttribute('data-move'));
    });
}



//global variables
var params = {
    playerResult: 0,
    compResult: 0,
    round: 0,
    endGame: true,
    nrOfRounds: 0,
    progress: []
}

var showModal = function(selector) {
    document.querySelector('#'+selector).classList.add('show');
    buildTable(selector);
};

var hideModal = function(selector) {
    document.querySelector(selector).classList.remove('show');
};

var closeButtons = document.querySelectorAll('.modal');

for (var i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener('click', function(event) {
        hideModal('#' + event.currentTarget.className.split(' ')[1]);
    });
}

//blokowanie przyciskow
var disabledButtons = function(isDisabled) {
    buttonRock.disabled = isDisabled;
    buttonPaper.disabled = isDisabled;
    buttonScissors.disabled = isDisabled;
};

disabledButtons(true);

//resetowanie wynikow
var endGame = function() {
    params.playerResult = 0;
    params.compResult = 0;
    params.round = 0;
    params.nrOfRounds = 0;

    params.progress = [];
    output.innerHTML = '';
    results.innerHTML = '';
    rounds.innerHTML = '';
    roundsNr.innerHTML = '';
}

//start gry
var newGame = function() {

    endGame();
    disabledButtons(false);

    params.nrOfRounds = window.prompt('How many rounds would You like to play?');
    if (isNaN(params.nrOfRounds) || params.nrOfRounds === '' || params.nrOfRounds === null || params.nrOfRounds < 1) {
        return output.innerHTML = 'Wrong Value. Try one more time';
    }
}

var buildTable = function(selector) {
    var tbody = document.querySelector('#tbody-' + selector);
    params.progress.forEach(function(progressResult) {
        var row = document.createElement('tr');
        tbody.appendChild(row);
        for (var key in progressResult) {
            buildTableTd(progressResult[key], row);
        }
    })
};

// this function build td in table
var buildTableTd = function(value, row) {
    var td = document.createElement('td');
    td.innerHTML = value;
    row.appendChild(td);
};

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
    switch (compMove) {
        case 'rock':
            if (move == 'rock') {
                draw = true;
            } else if (move == 'scissors') {
                compWin = true;
            } else {
                userWin = true;
            }
            break;
        case 'scissors':
            if (move == 'rock') {
                userWin = true;
            } else if (move == 'scissors') {
                draw = true;
            } else {
                compWin = true;
            }
            break;
        case 'paper':
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

//wynik
    var overalResult = function() {
    }
    //liczba rund
    var nrRound = function() {
    }

//sprawdzanie wynikow, dodawanie punkotów, wypisywanie wynikow
var result = function(userWin, compWin, draw, userMove, compMove) {
    var outputRound = params.round + 1;
    if (draw) {
        output.insertAdjacentHTML('afterbegin', '</br>' + 'Its a draw Round: ' +  outputRound + '  Result: ' + params.playerResult + ' - ' + params.compResult);
        params.round += 1;
    } else if (userWin) {
        
        output.insertAdjacentHTML('afterbegin', '</br>' + 'YOU WON!!! with ' + userMove + ' against ' + compMove + ' Round: ' + outputRound + '  Result: ' + params.playerResult + ' - ' + params.compResult);
        params.playerResult += 1;
        params.round += 1;
    } else {
        output.insertAdjacentHTML('afterbegin', '</br>' + 'You have lost with ' + userMove + ' against ' + compMove  + ' Round: ' + outputRound + '  Result: ' + params.playerResult + ' - ' + params.compResult);
        params.compResult += 1;
        params.round += 1;
    }

    overalResult();
    nrRound();

    // this object return to params.progress actuall result the gam
    params.progress.push({
        gameRounds: params.round,
        gamePlayerMove: userMove,
        gameComputerMove: compMove,
        finalResult: params.playerResult + ' - ' + params.compResult
    });


    //sprawdzanie konca gry
    if (params.round == params.nrOfRounds) {
        if (params.compResult > params.playerResult) { //
            // output.insertAdjacentHTML('afterbegin','YOU LOST! </br>');
            showModal('lost');
        } else if (params.compResult == params.playerResult) {
            //   output.insertAdjacentHTML('afterbegin','ITs A DRAW </br>');
            showModal('draw');
        } else {
            //    output.insertAdjacentHTML('afterbegin','YOU WON! </br>');
            showModal('win');
        }
        disabledButtons(true);
    }
}

//przycisk nowa gra
var btnNewGame = document.getElementById("newGame");

btnNewGame.addEventListener('click', function() {
    newGame()
})