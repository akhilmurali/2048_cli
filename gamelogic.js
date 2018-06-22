var gameState = [];
var highScore = 0;

//Initialize the game:
//It further calls other two functions for the same: f{initializeGameStates} and f{addTileToArena}:
(function () {
	initializeGameStates();
	addTileToArena();
	addTileToArena();
})();

//This function initalizes the 2D array and initializes all the elements of the
//game state array to zero.
//f{initializeGameStates}
function initializeGameStates() {
	for (var i = 0; i < 4; i++) {
		gameState[i] = new Array(4);
		for (var j = 0; j < 4; j++) {
			gameState[i][j] = 0;
		}
	}
}

//Detect empty states and initialize a state to the value {2} at empty spaces:
//PSEUDO CODE FOR THE FUNCTION:
//1.PUSH ALL THE POSITIONS WHERE VALUE OF GAME-STATES IS ZERO INTO AN ARRAY
//2.RANDOMLY SELECT AN INDEX OF THIS ARRAY AND POPULATE IT WITH THE VALUE{2} 
//f{addTileToArena}
function addTileToArena() {
	var emptyPositionsArray = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (gameState[i][j] == 0) {
				emptyPositionsArray.push([i, j]);
			}
		}
	}
	if (emptyPositionsArray.length == 0) {
		Return - 1;
	} else {
		var randomPosition = Math.floor((Math.random() * emptyPositionsArray.length));
		var randomPosition_x = emptyPositionsArray[randomPosition][0];
		var randomPosition_y = emptyPositionsArray[randomPosition][1];
		gameState[randomPosition_x][randomPosition_y] = 2;
		return 1;
	}
}

//Function to detect filled states in the gameState array;
//f{detectFilledStates}
function detectFilledStates(gameStateArray){
	var positionArray = [];
	for(var i = 0; i< 4; i++){
		for(j = 0; j<4;j++){
			if(gameStateArray[i][j] != 0){
				positionArray.push([i,j]);
			}
		}
	}
	return positionArray;
}

module.exports = { addTileToArena, initializeGameStates, gameState }