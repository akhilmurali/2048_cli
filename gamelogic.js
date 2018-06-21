var gameState = [];
var highScore = 0;
//Initialize the game:
(function (){
	initializeGameStates();
	addTileToArena();
	addTileToArena();
})();


function initializeGameStates(){
	for(var i = 0; i < 4; i++){
	gameState[i] = new Array(4);
	for(var j = 0; j < 4; j++){
		gameState[i][j] = 0;
	}
}

//The function add a block to a random space in the arena:
function addTileToArena(){
	var randomPosition_x = Math.floor(Math.random() * 3);
	var randomPosition_y = Math.floor(Math.random() * 3);
	gameState[randomPosition_x][randomPosition_y] = 2;
}

