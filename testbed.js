var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
c.height = 600;
c.width = 800;

var color = "#3E9BD9";
var r = parseInt("0x"+color.slice(1,3));
var g = color.slice(3,5);
var b = color.slice(5,7);
var col = parseInt("0x" + color.slice(1,7)) + 99;
col = "#"+col.toString(16);

ctx.beginPath();
ctx.fillStyle = col;
ctx.rect(0, 0, 400, 32);
ctx.fill();

color = "#00FFFF";

let img = new images();//(document.getElementById("myCanvas"));
img.setCanvas(document.getElementById("myCanvas"), 400, 300);
//console.log("adding");
img.addSource('images.png');
console.log("done");
/*
var time = 36;
var testTime = setInterval(function(){
	time -= 1;
	if(img.checkLoaded()) {
		console.log("interval", img.checkLoaded());
	}
	if(time < 1) {
		clearInterval(testTime);
		time = 36;
	}
}, 500);
*/

inputSet("w");
//inputSet("ArrowRight");
inputSet("a");
inputSet("s");
inputSet("d");
inputSet("ArrowUp");
inputSet("ArrowDown");
inputSet("ArrowLeft");
inputSet("ArrowRight");
inputSet(" ");
inputSet("f");

function testarray(params) {
	for(var i = 0; i < params.length; i++) {
		console.log(params[i]);
	}
}

//var parameter = [4,2,3,1];
//testarray(parameter);

var test2d = [];
test2d.push([5,4,3,2,1]);

var testGrid = new grid(10, 10, 20, 8);
testGrid.initialize();
var gridX = 100, gridY = 50;
console.log("grass: ", testGrid.getGrass(1, 1));
wolfTrackOld = [...testGrid.wolfTrack];

var testCow = new cow(3,3);
testCow.moveTo(1, 1, 1);
testCow.moveTo(3, 3, 4);
testCow.moveTo(10, 4, 5);
testCow.moveTo(2, 2, 20);
testCow.setCoord(200, 160);

var testWolf = new wolf(3,3);

var testGrass = new grass(1,1);

//CREATE DEMO
var demoGridShift = new grid(3, 5);//, 20, 16);
demoGridShift.cowSet(2,1);
var demoGridShiftState = 0;
var demoGridShiftDelay = 0;
var arrowKeyPressed = 0;
//var gridX = 100, gridY = 50;
var demoGridCow = new grid(3, 5);
demoGridCow.cowSet(2,1);
demoGridCow.setGrasses([4,4,1,5,2, 6,4,1,2,2, 3,4,4,4,2]);
var demoGridCowState = 0;
var demoGridCowDelay = 0;
var WASDPressed = 0;
var SpaceBarPressed = 0;
var demoGridCowMoves = [0,1,2,4,3,3,4,2];
var demoWolf = new wolf(3,3);
var demoWolfSprite = 0;
//var demoGridCowX = 100, demoGridCowY = 300;
var demoGrid = new grid(10, 10, 20, 8);
var demoGridState = 0;

function initializeDemo() {
	//SHIFT DEMO
	demoGridShift = new grid(3, 5);//, 20, 16);
	demoGridShift.cowSet(2,1);
	demoGridShiftState = 0;
	demoGridShiftDelay = 0;
	arrowKeyPressed = 0;
	//COW MOVE AND EAT DEMO
	demoGridCow = new grid(3, 5);
	demoGridCow.cowSet(2,1);
	demoGridCow.setGrasses([4,4,1,5,2, 6,4,1,2,2, 3,4,4,4,2]);
	demoGridCowState = 0;
	demoGridCowDelay = 0;
	WASDPressed = 0;
	SpaceBarPressed = 0;
	demoGridCowMoves = [0,1,2,4,3,3,4,2];
	//WOLF SHOT DEMO
	demoWolf = new wolf(3,3);
	demoWolfSprite = 0;
	demoGrid = new grid(10, 10, 20, 8);
	demoGridState = 0;
}

//testGrid cow movement
testGrid.cowSet(3,3);

var trackActive = true;

var titleCounter = 0;
var gameState = 1000;
var moveX = 0;
var moveY = 0;
var shiftR = 0;
var shiftC = 0;
var eating = 0;
var fire = 0;

//testGrid.wolvesActive = 4;
/*
testGrid.wolves[0].spawn = 2;
testGrid.wolves[1].spawn = 2;
testGrid.wolves[2].spawn = 2;
testGrid.wolves[3].spawn = 2;
*/
function handleDemoGrid() {
	switch(demoGridState) {
		case 0: //
			break;
		default:
			break;
	}
}

var entry = setInterval(function(){
	//console.log("not loaded");
	if(img.checkLoaded()) {
		switch(gameState) {
			case 0: //input
				for(var i = 0; i < inputKeys.length; i++) {
					if(inputPushed[i] > 0) {
						switch(inputKeys[i]) {
							case "w":
								moveY = -1;
								break;
							case "a":
								moveX = -1;
								break;
							case "s":
								moveY = 1;
								break;
							case "d":
								moveX = 1;
								break;
							case "ArrowUp":
								shiftC = 1;
								break;
							case "ArrowDown":
								shiftC = 2;
								break;
							case "ArrowLeft":
								shiftR = 1;
								break;
							case "ArrowRight":
								shiftR = 2;
								break;
							case " ":
								eating = 1;
								break;
							case "f":
								fire = 1;
								break;
							default:
								break;
						}
						/*
						if(inputKeys[i] == "w") {
							moveY = -1;
						}
						else if(inputKeys[i] == "a") {
							moveX = -1;
						}
						else if(inputKeys[i] == "s") {
							moveY = 1;
						}
						else if(inputKeys[i] == "d") {
							moveX = 1;
						}
						*/
						if(moveX + moveY + shiftC + shiftR + eating + fire != 0) {
							gameState = -1;
							//testGrid.turnsDecrement(-1);
						}
						break;
					}
				}
				break;
			/*
			case 1: //check if input is valid 
			*/
			/*DEVELOPING NEW SECTION
			case 1:
				if(testGrid.checkInput(moveX, moveY, shiftC, shiftR, eating, fire)) {
					gameState = 2; //resolve input
				}
				else {
					moveX = 0;
					moveY = 0;
					shiftC = 0;
					shiftR = 0;
					eating = 0;
					fire = 0;
					gameState = 0;
				}
				break;
			*/
			case -1: //resolve input (testing)
				if((moveX + moveY) != 0){
					switch (testGrid.cowMove(testGrid.cowX + moveX, testGrid.cowY + moveY)) {
						case 0:
							moveX = 0;
							moveY = 0;
							gameState = 0;
							break;
						case 2:
							moveX = 0;
							moveY = 0;
							break;
					}
				}
				else if(shiftC != 0) {
					if(testGrid.shiftColumn(testGrid.cowX, shiftC - 1)) {
						shiftC = 0;
						gameState = 6;
					}
				}
				else if(shiftR != 0) {
					if(testGrid.shiftRow(testGrid.cowY, shiftR - 1)) {
						shiftR = 0;
						gameState = 6;
					}
				}
				else if(eating != 0) {
					if(eating === 1) {
						if(testGrid.markGrass(testGrid.cowX, testGrid.cowY)) {
							testGrid.markResolve();
							eating += 1;
						}
						else {
							eating = 0;
							gameState = 0;
							//Refund wasted turn
							//testGrid.turnsIncrement();
						}
					}
					else if (eating > 32) {
						eating = 0;
						//gameState = 2;
					}
					else {
						testGrid.cowEating();
						eating += 1;
					}
					//testGrid.cowEating();
					//gameState = 2;
				}
				else if(fire != 0) {
					console.log("fire", fire);
					if(fire === 1) {
						if(testGrid.gunFire() != -1){ //fire at closest wolf or lower number if tie
							fire = 2;
						}
						else {
							gameState = 0; //return to input to not waste player's turn
							fire = 0;
						}
					}
					else if(fire === 2) {
						var a = testGrid.wolfShot();
						console.log("fire-2", a);
						if(a > 0) {
							fire = 0;
							gameState = 0;
							//Refund wasted turn
							//testGrid.turnsIncrement();
						}
					}
				}
				if(moveX + moveY + shiftC + shiftR + eating + fire != 0) {
					if((eating > 0) || (fire > 0)) {
						//testGrid.turnsDecrement();
					}
					else if((moveX != 0) || (moveY != 0)) {
						testGrid.turnsDecrement(3);
					}
					else {
						testGrid.turnsDecrement();
					}
					gameState = 1;
				}
				break;

			case 1: //resolve input
				if(moveX + moveY + shiftC + shiftR + eating + fire === 0) {
					testGrid.wolfTrackMove();
					gameState = 2;
				}
				if((moveX + moveY) != 0){
					switch (testGrid.cowMove(testGrid.cowX + moveX, testGrid.cowY + moveY)) {
						case 0:
							moveX = 0;
							moveY = 0;
							gameState = 0;
							//Refund wasted turn
							//testGrid.turnsIncrement();
							break;
						case 2:
							moveX = 0;
							moveY = 0;
							break;
					}
				}
				else if(shiftC != 0) {
					if(testGrid.shiftColumn(testGrid.cowX, shiftC - 1)) {
						shiftC = 0;
						gameState = 6;
					}
				}
				else if(shiftR != 0) {
					if(testGrid.shiftRow(testGrid.cowY, shiftR - 1)) {
						shiftR = 0;
						gameState = 6;
					}
				}
				else if(eating != 0) {
					if(eating === 1) {
						if(testGrid.markGrass(testGrid.cowX, testGrid.cowY)) {
							testGrid.markResolve();
							eating += 1;
						}
						else {
							eating = 0;
							gameState = 0;
							//Refund wasted turn
							//testGrid.turnsIncrement();
						}
					}
					else if (eating > 32) {
						eating = 0;
						//gameState = 2;
					}
					else {
						testGrid.cowEating();
						eating += 1;
					}
					//testGrid.cowEating();
					//gameState = 2;
				}
				else if(fire != 0) {
					console.log("fire", fire);
					if(fire === 1) {
						if(testGrid.gunFire() != -1){ //fire at closest wolf or lower number if tie
							fire = 2;
						}
						else {
							gameState = 0; //return to input to not waste player's turn
							fire = 0;
						}
					}
					else if(fire === 2) {
						var a = testGrid.wolfShot();
						console.log("fire-2", a);
						if(a > 0) {
							fire = 0;
							gameState = 0;
							//Refund wasted turn
							//testGrid.turnsIncrement();
						}
					}
				}
				
				break;
			case 2:
				testGrid.cow.stopAnimation();
				if(moveTrack(testGrid.wolfTrack, testGrid.shells, testGrid.wolvesActive)){
					if(testGrid.gunAddAmmo()){
						moveGainShells();
					}
					/*
					var addShell = setInterval(function(){
						clearInterval(addShell);
					}, 25);
					*/
					gameState = 3;
				}
				break;
			case 3: //NPC behavior
				testGrid.cow.stopAnimation();
				//testGrid.grassSpawn();
				//testGrid.wolfTrackMove();
				testGrid.wolvesActivate();
				gameState = 4;
				break;
			case 4: //NPC animation
				var entitiesDone = true;
				//entitiesDone = entitiesDone && moveTrack(testGrid.wolfTrack);
				entitiesDone = entitiesDone && testGrid.wolvesMove();
				//if(moveTrack(testGrid.wolfTrack)) {
				if(entitiesDone) {
					//testGrid.gunAddAmmo();
					gameState = 5;
					if(testGrid.cowEaten()) {
						gameState = 10;
					}
				}
				//clearInterval(entry);
				break;
			case 5:
				console.log("Cow Done Moving, move again");
				moveX = 0;
				moveY = 0;
				shiftC = 0;
				shiftR = 0;
				eating = 0;
				fire = 0;
				gameState = 6;
				/*
				testGrid.manageDifficulty();
				if(testGrid.turnsDecrement()){
					titleCounter = 0;
					gameState = 50;
				}
				*/
				break;
			case 6: //
				gameState = 0;
				testGrid.grassSpawn();
				testGrid.manageDifficulty();
				if(testGrid.turnsDecrement(0)){
					titleCounter = 0;
					gameState = 50;
				}
				break;
			case 10:
				console.log("Cow Dead");
				testGrid.wolfEating();
				if(moveDeadCow()) {
					if(testGrid.turnsDecrement(10)) {
						titleCounter = 25;
						gameState = 50;
					}
					else {
						//testGrid.respawn();
						gameState = 11;
						fire = 1;
						testGrid.wolvesStopAnimation();
					}
				}
				break;
			case 11:
				if(testGrid.gunDeadCow()) {
					//testGrid.respawn();
					gameState = 12;
				}
				break;
			case 12:
				if(testGrid.cowSpawning()) {
					moveX = 0;
					moveY = 0;
					shiftC = 0;
					shiftR = 0;
					eating = 0;
					fire = 0;
					gameState = 0;
					testGrid.manageDifficulty();
					testGrid.respawn();
				}
				break;
			case 50:
				titleCounter += 1;
				if(titleCounter > 25 * 4){
					gameState = 1000;
					testGrid.initialize();
					setTrack(testGrid.wolfTrack);
					titleCounter = 0;
				}
				break;
			//TITLE STATE
			case 1000: //title appear
				testGrid = new grid(5, 3, 20, 8);
				if(spawnTitle()) {
					gameState = 1001;
				}
				for(var i = 0; i < inputKeys.length; i++) {
					if((inputPushed[i] === 1) && (inputKeys[i] == " ")) {
						//console.log("Pressed");
						gameState = 1003;
						setPuzzleScrollState(false);
					}
				}
				break;
			case 1001: //pause for a little bit after title appears
				titleCounter += 1;
				if(titleCounter > 25 * 2){
					gameState = 1002;
					titleCounter = 0;
				}
				for(var i = 0; i < inputKeys.length; i++) {
					if((inputPushed[i] === 1) && (inputKeys[i] == " ")) {
						//console.log("Pressed");
						gameState = 1003;
						setPuzzleScrollState(false);
					}
				}
				break;
			case 1002: //shift "puzzle" to correct it
				if(shiftTitlePuzzle()) {
					gameState = 1003;
				}
				for(var i = 0; i < inputKeys.length; i++) {
					if((inputPushed[i] === 1) && (inputKeys[i] == " ")) {
						//console.log("Pressed");
						gameState = 1003;
						setPuzzleScrollState(false);
					}
				}
				break;
			case 1003: //default state
				titleCounter += 1;
				if(titleCounter > 250) {
					titleCounter = 0;
					gameState = 1010; //go to demo
				}
				for(var i = 0; i < inputKeys.length; i++) {
					if((inputPushed[i] === 1) && (inputKeys[i] == " ")) {
						//console.log("Pressed");
						gameState = 1004;
						setTitleCow(144+35, 64+7);
					}
				}
				break;
			case 1004: //when space is pressed, cow exits "O" to eat "zz". start game when animation finished
				if(moveTitleCow(144+35, 64+7+22)) {
					gameState = 1005;
				}
				break;
			case 1005:
				if(eatTitleCow() === 2) {
					//testGrid.cowSet(4,4);
					testGrid = new grid(10, 10, 20, 8);
					testGrid.initialize();
					resetTitle();
					gameState = 12;
				}
				break;
			case 1010: //start demo
				if(shiftDemoScroll()) {
					//gameState = 1011;
				}
				if(demoGridShiftDelay == 0) {
					switch (demoGridShiftState) {
						case 0:
							arrowKeyPressed = 1;
							if(demoGridShift.shiftColumn(demoGridShift.cowX, 0)) {
								demoGridShiftState = 1;
								demoGridShiftDelay += 1;
							}
							break;
						case 1:
							arrowKeyPressed = 2;
							if(demoGridShift.shiftColumn(demoGridShift.cowX, 1)) {
								demoGridShiftState = 2;
								demoGridShiftDelay += 1;
							}
							break;
						case 2:
							arrowKeyPressed = 4;
							if(demoGridShift.shiftRow(demoGridShift.cowY, 0)) {
								demoGridShiftState = 3;
								demoGridShiftDelay += 1;
							}
							break;
						case 3:
							arrowKeyPressed = 8;
							if(demoGridShift.shiftRow(demoGridShift.cowY, 1)) {
								demoGridShiftState = 0;
								demoGridShiftDelay += 1;
							}
							break;
					}
				}
				else if(demoGridShiftDelay >= 15) {
					demoGridShiftDelay = 0;
				}
				else {
					demoGridShiftDelay += 1;
				}

				demoGridCow.initialize(true);
				demoGridCow.setGrasses([4,4,1,5,2, 6,4,1,2,2, 3,4,4,4,2]);
				demoGridCowState = demoGridCowState % demoGridCowMoves.length;
				if(demoGridCowDelay === 0) {
					switch (demoGridCowMoves[demoGridCowState]) {
						case 0:
							WASDPressed = 1;
							SpaceBarPressed = 0;
							if(demoGridCow.cowMove(demoGridCow.cowX, demoGridCow.cowY - 1) != 1) {
								demoGridCowState += 1;
								eating = 1;
								demoGridCowDelay += 1;
								demoGridCow.grassSpawn();
							}
							break;
						case 1:
							WASDPressed = 2;
							SpaceBarPressed = 0;
							if(demoGridCow.cowMove(demoGridCow.cowX, demoGridCow.cowY + 1) != 1) {
								demoGridCowState += 1;
								eating = 1;
								demoGridCowDelay += 1;
								demoGridCow.grassSpawn();
							}
							break;
						case 2:
							WASDPressed = 4;
							SpaceBarPressed = 0;
							if(demoGridCow.cowMove(demoGridCow.cowX - 1, demoGridCow.cowY) != 1) {
								demoGridCowState += 1;
								eating = 1;
								demoGridCowDelay += 1;
								demoGridCow.grassSpawn();
							}
							break;
						case 3:
							WASDPressed = 8;
							SpaceBarPressed = 0;
							if(demoGridCow.cowMove(demoGridCow.cowX + 1, demoGridCow.cowY) != 1) {
								demoGridCowState += 1;
								eating = 1;
								demoGridCowDelay += 1;
								demoGridCow.grassSpawn();
							}
							break;
						case 4:
							WASDPressed = 0;
							SpaceBarPressed = 1;
							if(eating != 0) {
								if(eating === 1) {
									if(demoGridCow.markGrass(demoGridCow.cowX, demoGridCow.cowY)) {
										demoGridCow.markResolve();
										eating += 1;
									}
									else {
										eating = 0;
									}
								}
								else if (eating > 32) {
									eating = 0;
									demoGridCow.cow.stopAnimation();
									demoGridCowState += 1;
								}
								else {
									demoGridCow.cowEating();
									eating += 1;
								}
							}
							break;
						case 5:
							demoGridCowState = 0;
							demoGridCow = new grid(3, 5);
							demoGridCow.cowSet(2,1);
							demoGridCow.setGrasses([4,4,1,5,2, 6,4,1,2,2, 3,4,4,4,2]);
							demoGridCowState = 0;
							demoGridCowDelay = 0;
							WASDPressed = 0;
							SpaceBarPressed = 0;
							break;
					}
				}
				else if(demoGridCowDelay >= 10) {
					demoGridCowDelay = 0;
				}
				else {
					demoGridCowDelay += 1;
				}
				
				for(var i = 0; i < inputKeys.length; i++) {
					if((inputPushed[i] === 1) && (inputKeys[i] == " ")) {
						//console.log("Pressed");
						gameState = 1003;
						setPuzzleScrollState(false);
						shiftDemoScroll(true);
					}
				}
				titleCounter += 1;
				if(titleCounter > 500) {
					titleCounter = 0;
					shiftDemoScroll(true);
					initializeDemo();
					resetTitle();
					gameState = 1000;
				}
				break;

			case 1011: //2nd demo
				break;
			case 1100: //game demo
				
				break;
			default:
				break;
		}

		//clearInterval(entry);
		//ctx.clearRect(0, 0, 400, 300);
		img.clearCanvas();
		img.clearQueue();
		img.dynamicResize();

		var x = 200;
		var width = 32;
		var height = 32;

		r = parseInt("0x"+color.slice(1,3));
		g = parseInt("0x"+color.slice(3,5));
		b = parseInt("0x"+color.slice(5,7));
		//if(g > 0) {g -= 1;}
		//if(b > 0) {b -= 1;}
		color = "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");

		/*
		ctx.beginPath();
		ctx.fillStyle = color;
		ctx.rect(0, 0, 400, 32);
		ctx.fill();
		*/
		img.drawRect(0, 0, 400, 32, 0, r, g, b);
		
		drawFence(img);
		//drawSprite(img, 0, 0, x, 100, 0);
		for(var i = 0; i < 40; i++) {
			//drawBG(img, i, i, 0);
		}
		//drawWord(img, "asd f", 1, 6);
		//drawWord(img, "asdf", 1, 7, 1);
		drawScore(img, testGrid.score, testGrid.hiscore);


		//DRAW VARIOUS UI - TESTING
		//DRAW LEVEL
		//drawLevel(img, testGrid.difficulty);
		drawBonus(img, testGrid.scoreMultiplier);
		drawTurnBonus(img, testGrid.turnsMultiplier);
		//DRAW TURNS LEFT
		drawTurnsLeft(img, testGrid.turnsLeft);
		//DRAW WOLF TRACK
		//wolfTrackScroll -= 1;
		drawTrack(img, testGrid.wolfTrack, testGrid.wolvesActive);
		//DRAW SHELLS
		/*
		drawSprite(img, 1, 4, 320, 240);
		drawSprite(img, 1, 4, 320+16, 240);
		drawSprite(img, 1, 4, 320+32, 240);
		*/
		
		//drawShells(img, testGrid.shells);
		drawShells(img, 320, 240, testGrid.shells);
		drawGainShells(img, testGrid.shells);
		drawWord(img, "ammo", 41, 29); 
		//DRAW GRASS OUT
		drawGrassOut(img, testGrid.grassesActive);
		drawWord(img, "next", 43, 5);
		/*
		drawSprite(img, 6, 0, 352, 48);
		for(var i = 0; i < 8; i++) {
			drawSprite(img, 6+i, 0, 352, 48 + (16*i));
		}
		*/
		
		
		//TEST SPRITES
		//drawSprite(img, 2, 7, 16, 16);
		/*
		testWolf.setCoord(0, 24);
		if(testWolf.spawn === 0) {
			if(testWolf.spawningAnimation() > 1) {
				testWolf.spawn = 2;
			}
		}	
		drawSprite(img, testWolf.spriteSet, testWolf.spriteNumber, testWolf.x, testWolf.y);

		drawSprite(img, 2, 5, testWolf.x, testWolf.y+16);
		drawSprite(img, 2, 6, testWolf.x, testWolf.y+32);
		drawSprite(img, 0, 8, 0, 128-16);
		drawSprite(img, 0, 9, 0, 128);
		*/
		//testGrass.setCoord(0, 24);
		//testGrass.explodingAnimation();
		//drawSprite(img, testGrass.spriteSet, testGrass.spriteNumber, testGrass.x, testGrass.y);
		/*
		for(var j = 0; j < testGrid.y; j++) {
			for(var i = 0; i < testGrid.x; i++) {
				var tempGrass = testGrid.getGrass(i, j);
				drawSprite(img, tempGrass[0]+6, 0, 48+(16*i), 48+(16*j));
			}	
		}
		*/


		

		/*
		if(testCow.moveTo(15, 30, Math.round(testGrid.space/16))) {
			console.log("move done");
			clearInterval(entry);
		}
		
		if(testGrid.shiftColumn(4, 0)) {
			console.log("shiftdone");
			//clearInterval(entry);
		}
		*/
		inputHeldReleased();
		//testCow.x += - inputPushed[1] + inputPushed[3];
		//testCow.y += - inputPushed[0] + inputPushed[2];


		/*
		if(testGrid.cowMove(1,0)) {
			console.log("cow done moving");
			clearInterval(entry);
		}
		*/
		
		//testGrid.drawGrid(img, gridX, gridY);
		if(gameState < 1000) {
			testGrid.drawGrid(img, gridX, gridY);
			drawDeadCow(img,testGrid.cow, gridX, gridY);
			if(gameState === 50) {
				img.drawRect(21*8, 19*8, 72, 8, 0, 0, 255, 0); //maybe make it fetch RGB from CSS BG value
				drawWord(img, "game over", 21, 19);
			}
		}
		if(gameState >= 1000) {
			drawTitleScreen(img, gameState);
			
			demoGridShift.drawGrid(img, gridX, gridY+300+demoScroll);
			drawArrowKeys(img, 31*8, 8*8+300+demoScroll, arrowKeyPressed);
			demoGridCow.drawGrid(img, gridX, gridY+112+300+demoScroll); //MOVEMENT DEMO HERE
			drawWASDKeys(img, 28*8, 21*8+300+demoScroll, WASDPressed);
			drawSpaceBar(img, 32*8, 25*8+300+demoScroll, SpaceBarPressed);
			drawWolfShot(img, 18*8, 30*8+300+demoScroll, 0);
			if((gameState != 1004) && (gameState != 1005)){
				if(Math.floor(titleCounter / 25) % 2 === 0) {
					drawWord(img, "press space", 19, 17, 0, 0);
				}
			}
			/*
			demoGridShift.drawGrid(img, gridX, gridY+20);
			drawWord(img, "shift rows", 28, 9);
			drawWord(img, "and columns", 28, 10);
			drawWord(img, "with arrows", 28, 11);
			drawArrowKeys(img, 31*8, 13*8, arrowKeyPressed);
			demoGridCow.drawGrid(img, gridX, gridY+130); //MOVEMENT DEMO HERE
			drawWord(img, "move with", 28, 22);
			drawWord(img, "wasd", 30, 23);
			drawWord(img, "eat with", 28, 24);
			drawWord(img, "space", 30, 25);
			drawWASDKeys(img, 28*8, 26*8, WASDPressed);
			drawSpaceBar(img, 32*8, 30*8, SpaceBarPressed);
			*/
			/* //TESTING AREA
			demoGridShift.drawGrid(img, gridX, gridY);
			//drawWord(img, "shift rows", 28, 9);
			//drawWord(img, "and columns", 28, 10);
			//drawWord(img, "with arrows", 28, 11);
			drawArrowKeys(img, 31*8, 8*8, arrowKeyPressed);
			demoGridCow.drawGrid(img, gridX, gridY+100); //MOVEMENT DEMO HERE
			//drawWord(img, "move with", 28, 22);
			//drawWord(img, "wasd", 30, 23);
			//drawWord(img, "eat with", 28, 24);
			//drawWord(img, "space", 30, 25);
			drawWASDKeys(img, 28*8, 20*8, WASDPressed);
			drawSpaceBar(img, 32*8, 24*8, SpaceBarPressed);
			drawWolfShot(img, 18*8, 30*8, 0);
			*/
		}
		/*
		if(gameState >= 1000) {
			drawTitle(img, gameState, 144, 64 + demoScroll);
		}
		if(gameState === 1003) {
			if(Math.floor(titleCounter / 25) % 2 === 0) {
				drawWord(img, "press space", 19, 19);
			}
			testGrid.drawGrid(img, gridX+50, gridY+140);
		}
		if((gameState >= 1004) && (gameState < 1010)) { //animate cow eating title
			drawTitleCow(img, 144+35, 64+7);
		}
		*/
		img.draw();
		img.clearQueue();

		//drawSprite(img, testCow.spriteSet, testCow.spriteNumber, testCow.x, testCow.y, testCow.mirror);
		//drawSprite(img, 0, 0, x, 100+16, 1);
		img.draw();
		//console.log("interval", img.checkLoaded());
		//console.log(testCow.x, testCow.y);
	}
}, 25);

/*
var x = 100;
var width = 200;

ctx.beginPath();
ctx.moveTo(x, 10);
ctx.lineTo(x, 250);
ctx.moveTo(x + width, 10);
ctx.lineTo(x + width, 250);
ctx.stroke();
ctx.scale(-1, 1);
ctx.font = '48px serif';
ctx.fillText('Hello world!', -width - x, 90, width);
//ctx.fillText('Hello world!', -200, 90, 200);
ctx.setTransform(1, 0, 0, 1, 0, 0);
//ctx.setTransform(Math.cos(Math.PI), -Math.sin(Math.PI), Math.sin(Math.PI), Math.cos(Math.PI), x+width/2, 50);
ctx.translate(x+width/2, 100);
ctx.rotate(Math.PI/2);
ctx.translate(-(x+width/2), -100);
ctx.fillText('Hello world!', x, 150, width);
*/
//invert x, subtract width
