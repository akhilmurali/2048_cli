//This function initalizes the 2D array and initializes all the elements of the
//game state array to zero.
//f{initializeGameStates}
function initializeGameStates(gameState) {
	for (var i = 0; i < 4; i++) {
		gameState[i] = new Array(4);
		for (var j = 0; j < 4; j++) {
			gameState[i][j] = 0;
		}
	}
	return gameState;
}

//Detect empty states and initialize a state to the value {2} at empty spaces:
//PSEUDO CODE FOR THE FUNCTION:
//1.PUSH ALL THE POSITIONS WHERE VALUE OF GAME-STATES IS ZERO INTO AN ARRAY
//2.RANDOMLY SELECT AN INDEX OF THIS ARRAY AND POPULATE IT WITH THE VALUE{2} 
//f{addTileToArena}
function addTileToArena(gameState, emptyPositionsArray) {
	if(emptyPositionsArray.length == 0){
		//check for game over:
		return gameState;
	}
	var randomPosition = Math.floor((Math.random() * emptyPositionsArray.length));
	var randomPosition_x = emptyPositionsArray[randomPosition][0];
	var randomPosition_y = emptyPositionsArray[randomPosition][1];
	gameState[randomPosition_x][randomPosition_y] = 2;
	return gameState;
}

//Funtion tp return empty positions in a 2D array:
//f{getEmptyPositions}
function getEmptyStates(gameState) {
	var emptyPositionsArray = [];
	for (var i = 0; i < 4; i++) {
		for (var j = 0; j < 4; j++) {
			if (gameState[i][j] == 0) {
				emptyPositionsArray.push([i, j]);
			}
		}
	}
	return emptyPositionsArray;
}


//Function to get positions of filled states in the gameState array:
//f{detectFilledStates}
function detectFilledStates(gameStateArray,direction) {
	var positionArray = [];
	if(direction == 'down'){
		for (var i = 3; i >= 0; i--) {
			for (j = 3; j >= 0; j--) {
				if (gameStateArray[j][i] != 0) {
					positionArray.push([j, i]);
				}
			}
		}
	}else if(direction == 'right'){
		for (var i = 0; i < 4; i++) {
			for (j = 3; j >= 0; j--) {
				if (gameStateArray[i][j] != 0) {
					positionArray.push([i, j]);
				}
			}
		}
	}else if(direction == 'left'){
		for (var i = 0; i < 4; i++) {
			for (j = 0; j < 4; j++) {
				if (gameStateArray[i][j] != 0) {
					positionArray.push([i, j]);
				}
			}
		}
	}else{
		for (var i = 0; i <= 3; i++) {
			for (j = 0; j <= 3; j++) {
				if (gameStateArray[j][i] != 0) {
					positionArray.push([j, i]);
				}
			}
		}
	}
	
	return positionArray;
}

//Function to alter states in gameState array:
//f{alterStates}
function alterStates(gameStateArray, key) {
	var positionArray = detectFilledStates(gameStateArray,key);
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
	var pos_x = position[0];
	var pos_y = position[1];
	var flagArray = [];
	for (var i = (pos_y - 1); i >= 0; --i) {
		if (gameStateArray[pos_x][i] == 0) {
			gameStateArray[pos_x][i] = gameStateArray[pos_x][i+1];
			gameStateArray[pos_x][i+1] = 0;
		} else if (gameStateArray[pos_x][i] == gameStateArray[pos_x][i+1]) {
			if (flagArray.indexOf([pos_x, i]) == -1) {
				gameStateArray[pos_x][i] *= 2;
				gameStateArray[pos_x][i+1] = 0;
				flagArray.push([pos_x, i]);
			}
		} else {
			break;
		}
	}
	return gameStateArray;
}


//Move the tile at a given position up depending on the states of spaces above it:
//f{moveUp}:
function moveUp(gameStateArray, position) {
	var pos_x = position[0];
	var pos_y = position[1];
	var flagArray = [];
	for (var i = (position[0] - 1); i >= 0; --i) {
		if (gameStateArray[pos_x - 1][pos_y] == 0) {
			gameStateArray[i][pos_y] = gameStateArray[pos_x][pos_y];
			gameStateArray[pos_x][pos_y] = 0;
		} else if (gameStateArray[pos_x - 1][pos_y] == gameStateArray[pos_x][pos_y]) {
			if (flagArray.indexOf([pos_x - 1, pos_y]) == -1) {
				gameStateArray[pos_x - 1][pos_y] *= 2;
				gameStateArray[pos_x][pos_y] = 0;
				flagArray.push([pos_x - 1, pos_y]);
			}
		} else {
			break;
		}
		pos_x = pos_x - 1;
	}
	return gameStateArray;
}


//Move the tile at a given position to right position depending on the states at its right:
//f{moveRight}:
function moveRight(gameStateArray, position) {
	var pos_x = position[0];
	var pos_y = position[1];
	var flagArray = [];
	for (var i = (position[1] + 1); i < 4; ++i) {
		if (gameStateArray[pos_x][pos_y + 1] == 0) {
			gameStateArray[pos_x][i] = gameStateArray[pos_x][pos_y];
			gameStateArray[pos_x][pos_y] = 0;
		} else if (gameStateArray[pos_x][pos_y + 1] == gameStateArray[pos_x][pos_y]) {
			if (flagArray.indexOf([pos_x, pos_y + 1]) == -1) {
				gameStateArray[pos_x][pos_y + 1] *= 2;
				gameStateArray[pos_x][pos_y] = 0;
				flagArray.push([pos_x, pos_y + 1]);
			}
		} else {
			break;
		}
		pos_y = pos_y + 1;
	}
	return gameStateArray;
}


//Move the tile at a given position down depending on the states of spaces below it:
//f{moveDown}:
function moveDown(gameStateArray, position) {
	var pos_x = position[0];
	var pos_y = position[1];
	var flagArray = [];
	for (var i = (position[0] + 1); i <= 3; ++i) {
		if (gameStateArray[pos_x + 1][pos_y] == 0) {
			gameStateArray[i][pos_y] = gameStateArray[pos_x][pos_y];
			gameStateArray[pos_x][pos_y] = 0;
		} else if (gameStateArray[pos_x + 1][pos_y] == gameStateArray[pos_x][pos_y]) {
			if (flagArray.indexOf([pos_x + 1, pos_y]) == -1) {
				gameStateArray[pos_x + 1][pos_y] *= 2;
				gameStateArray[pos_x][pos_y] = 0;
				flagArray.push([pos_x + 1, pos_y]);
			}
		} else {
			break;
		}
		pos_x = pos_x + 1;
	}
	return gameStateArray;
}

//Function to print the gameState's Grid:gameGrid:
//f{printGameState}
function printGameState(gameState) {
    var resultGrid = '';
    gameState.forEach(array => {
        array.forEach(element => {
            if(element != 0){
                resultGrid += "  |  " + element;
            }else{
                resultGrid += "  |  " + " ";
            }
        });
        resultGrid += " | "+ "\n"
    });
    console.log(resultGrid)
}

function clearScreen(){
    console.log('\033[2J');
}

module.exports = { addTileToArena, initializeGameStates, printGameState,alterStates,
	detectFilledStates, moveLeft, moveRight, moveUp, moveDown, getEmptyStates, clearScreen };

