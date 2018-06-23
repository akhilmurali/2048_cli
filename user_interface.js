const gameLogic = require('./gamelogic');
var keypress = require('keypress');  //Acquire keypress package
keypress(process.stdin);  //Make process.stdin emit keypress events:
    var gameState = [];
gameState = gameLogic.initializeGameStates(gameState);
gameState = gameLogic.addTileToArena(gameState, gameLogic.getEmptyStates(gameState));
gameState = gameLogic.addTileToArena(gameState, gameLogic.getEmptyStates(gameState));
printGameState(gameState);

function printGameState(gameState) {
    var resultGrid = '';
    gameState.forEach(array => {
        array.forEach(element => {
            if(element != 0){
                resultGrid += " | " + element;
            }else{
                resultGrid += " | " + " ";
            }
        });
        resultGrid += " |"+ "\n"
    });
    console.log(resultGrid)
}

function clearScreen(){
    console.log('\033[2J');
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