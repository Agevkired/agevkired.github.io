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
							gameState = 1;
						}
						break;
					}
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
						//gameState = 2;
					}
				}
				else if(shiftR != 0) {
					if(testGrid.shiftRow(testGrid.cowY, shiftR - 1)) {
						shiftR = 0;
						//gameState = 2;
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
							//gameState = 2;
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
				testGrid.grassSpawn();
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
				gameState = 0;
				testGrid.manageDifficulty();
				if(testGrid.turnsDecrement()){
					titleCounter = 0;
					gameState = 50;
				}
				break;
			case 10:
				console.log("Cow Dead");
				if(moveDeadCow()) {
					if(testGrid.turnsDecrement(10)) {
						titleCounter = 25;
						gameState = 50;
					}
					else {
						testGrid.respawn();
						gameState = 11;
					}
				}
				testGrid.wolfEating();
				break;
			case 11:
				if(testGrid.cowSpawning()) {
					gameState = 0;
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
				if(titleCounter > 1000) {
					titleCounter = 0;
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
					testGrid.initialize();
					gameState = 11;
				}
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
		
		drawShells(img, testGrid.shells);
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
		
		
		/*
		//TEST SPRITES
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
				drawWord(img, "game over", 21, 19);
			}
		}
		if(gameState >= 1000) {
			drawTitle(img, gameState, 144, 64);
		}
		if(gameState === 1003) {
			if(Math.floor(titleCounter / 25) % 2 === 0) {
				drawWord(img, "press space", 19, 19);
			}
		}
		if(gameState >= 1004) {
			drawTitleCow(img, 144+35, 64+7);
		}
		
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
