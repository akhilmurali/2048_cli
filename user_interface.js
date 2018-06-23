const gameLogic = require('./gamelogic');
var keypress = require('keypress');  //Acquire keypress package
keypress(process.stdin);  //Make process.stdin emit keypress events:
var gameState = [];
gameState = initializeGameStates(gameState);

function printGameState(gameState) {
    var resultGrid = '';
    gameState.forEach(array => {
        array.forEach(element => {
            resultGrid += "| " + element;
        });
        resultGrid += " |"+ "\n"
    });
    console.log(resultGrid)
}

//Process to take Keyboard inputs
process.stdin.on('keypress', function (ch, key) {
    console.log(key.name);
    switch(key.name){

    }
    if (key && key.ctrl && key.name == 'c')     //This logic is to quit the operations from cmd - press - ctrl+C
    {
        process.stdin.pause();
    }

});

process.stdin.setRawMode(true);
process.stdin.resume();