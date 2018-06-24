const gameLogic = require('./gamelogic');
var keypress = require('keypress');  //Acquire keypress package
var clear = require('clear');
clear();
keypress(process.stdin);  //Make process.stdin emit keypress events:
var gameState = [];
gameState = gameLogic.initializeGameStates(gameState);
gameState = gameLogic.addTileToArena(gameState, gameLogic.getEmptyStates(gameState));
gameState = gameLogic.addTileToArena(gameState, gameLogic.getEmptyStates(gameState));
gameLogic.printGameState(gameState);

//Process to take Keyboard inputs:
process.stdin.on('keypress', function (ch,key) {
    if (key.name == 'up' || key.name == 'down' || key.name == 'right' || key.name == 'left') {
        gameState = gameLogic.alterStates(gameState, key.name);
        clear();
        gameLogic.addTileToArena(gameState, gameLogic.getEmptyStates(gameState));
        gameLogic.printGameState(gameState);
    }
    if (key && key.ctrl && key.name == 'c') {     //This logic is to quit the operations from cmd - press - ctrl+C{
        process.stdin.pause();
    }
});

process.stdin.setRawMode(true);
process.stdin.resume();