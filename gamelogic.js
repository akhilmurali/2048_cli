var gameState = [];
var highScore = 0;

//Initialize the game:
//It further calls other two functions for the same: 
//f{initializeGameStates} and f{addTileToArena}:
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
		return false;
	} else {
		var randomPosition = Math.floor((Math.random() * emptyPositionsArray.length));
		var randomPosition_x = emptyPositionsArray[randomPosition][0];
		var randomPosition_y = emptyPositionsArray[randomPosition][1];
		gameState[randomPosition_x][randomPosition_y] = 2;
		return true;
	}
}

//Function to detect filled states in the gameState array:
//f{detectFilledStates}
function detectFilledStates(gameStateArray) {
	var positionArray = [];
	for (var i = 0; i < 4; i++) {
		for (j = 0; j < 4; j++) {
			if (gameStateArray[i][j] != 0) {
				positionArray.push([i, j]);
			}
		}
	}
	return positionArray;
}

//Function to alter states in gameState array:
//f{alterStates}
function alterStates(gameStateArray, key) {
	var positionArray = detectFilledStates(gameStateArray);
	var position_x = positionArray[0];
	var position_y = positionArray[1];
	positionArray.forEach(function (position) {
		switch (key) {
			case "left":
				gameStateArray = moveLeft(gameStateArray, position);
				break;
			case "right":
				gameStateArray = moveRight(gameStateArray, position);
				break;
			case "up":
				gameStateArray = moveUp(gameStateArray, position);
				break;
			case "down":
				gameStateArray = moveDown(gameStateArray, position);
				break;
			default:
				break;
		}
	});
	return gameStateArray;
}

//Move the tile at a given position to its left position depending on the states to its left:
//f{moveLeft}:
function moveLeft(gameStateArray, position) {
	console.log(gameStateArray);
	var pos_x = position[0];
	var pos_y = position[1];
	var flagArray = [];
	for (var i = (position[1] - 1); i >= 0; --i) {
		if (gameStateArray[pos_x][pos_y-1] == 0) {
			gameStateArray[pos_x][i] = gameStateArray[pos_x][pos_y];
			gameStateArray[pos_x][pos_y] = 0;
		} else if (gameStateArray[pos_x][pos_y-1] == gameStateArray[pos_x][pos_y]) {
			if (flagArray.indexOf([pos_x, pos_y-1]) == -1) {
				gameStateArray[pos_x][pos_y-1] *= 2;
				gameStateArray[pos_x][pos_y] = 0;
				flagArray.push([pos_x, pos_y-1]);
			}	
		}else{
			break;
		}
		pos_y = pos_y-1;
	}
	return gameStateArray;
}

module.exports= {moveLeft,addTileToArena}; //{ addTileToArena, initializeGameStates, gameState, detectFilledStates, moveLeft };

