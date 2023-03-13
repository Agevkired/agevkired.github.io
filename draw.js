var cowLife = new sprite();
var cowLifeWalk = [1, 3, 2, 3];
var cowLifeEating = [4, 0, 5, 0, 6];
var cowDeathY = 0;
var wolfTrack = new sprite(320, 48);
var wolfTrackSleep = [0, 1];
var wolfTrackWalk = [1, 3, 2, 3];
var wolfTrackScroll = 0;
var wolfTrackOld = [];
var wolfZStartX = 320;
var wolfZStartY = 42;
var wolfZX = [3];
var wolfZY = [3];
var wolfZXOffset = [3];
var wolfZXDir = [3];
var wolfZDelay = 0;
//*SETUP SPRITES
for(var i = 0; i < 3; i++) {
	wolfZX[i] = 0;
	wolfZY[i] = 0;
	wolfZXOffset[i] = 0;
	wolfZXDir[i] = 1;
}
wolfTrack.spriteSet = 2;
wolfTrack.spriteNumber = 0;
//
var shellGained = new sprite(wolfTrack.x, wolfTrack.y);
shellGained.setCoord(wolfTrack.x, wolfTrack.y);
shellGained.spriteSet = 2;
shellGained.spriteNumber = 6;
//
var shellSpawn = new sprite(400,400);
shellSpawn.spriteSet = 5;
var spawnFrames = [0, 1, 2, 3, 4, 5, 6];
//
var titleCowO = new sprite(400,400);
var wolfShotDemo = new sprite(400,400);

//TEST SPRITE SET LOCATIONS
var cowSpriteSet = 0;
var playerUISpriteSet = 1;
var woflUISpriteSet = 2;
var wolfNumberSpriteSet = 3;
var wolfSpriteSet = 4;
var removalExplosionSpriteSet = 5;
var grassSpriteSet = {
	"green": 6,
	"red": 7,
	"yellow": 8,
	"blue": 9,
	"magenta": 10,
	"orange": 11,
	"blue-purple": 12,
	"gray": 13
};
var BGSet = 16*14; //Actual location on sheet. (sprite size * number of sprite sets)
var keyboardSpriteSet = 15;
var fenceBGSet = 16*16;
	/*set numbers
	*cow: 0
	*player UI: 1
	*wolf UI: 2
	*wolf number: 3
	*wolf: 4
	*removal: 5
	*grass green: 6
	*red: 7
	*yellow: 8
	*blue: 9
	*magenta: 10
	*orange: 11
	*blue-purple: 12
	*gray: 13
	*/

function drawTrackSetup() {

}

/*****GENERAL DRAW FUNCTIONS 
*
*/
//*GENERAL DRAW SPRITES FUNCTION
function drawSprite(img, set, number, x, y, mirror=0) {
	//Use for later if varied sprite size are needed
	/*
	if(set === 0) {
		img.addQueue(0, number*16, 0, 16, 16, x, y, 16, 16, mirror);
	}*/
	/*set numbers
	*cow: 0
	*player UI: 1
	*wolf UI: 2
	*wolf number: 3
	*wolf: 4
	*removal: 5
	*grass green: 6
	*red: 7
	*yellow: 8
	*blue: 9
	*magenta: 10
	*orange: 11
	*blue-purple: 12
	*gray: 13
	*/
	img.addQueue(0, number*16, set*16, 16, 16, x, y, 16, 16, mirror);
}

//*DRAW VARIOUS UI
function drawBG(img, number, x, y, set = 0) {
	//sprite size * number of sprite sets
	//var sy = 16 * 14;
	//8x8 BG
	img.addQueue(0, number*8, BGSet+(8*set), 8, 8, 8*x, 8*y, 8, 8, 0);
}
//*****END GENERAL DRAW FUNCTIONS */


//*TITLE DRAW FUNCTIONS
var puzzleScroll = -95;
var demoScroll = 0;
function drawTitle(img, state, x1 , y1, x2 = x1 - 22, y2 = y1 + 40) {
	var t1x = 16 * 6, t1y = 16 * 6; //COW position on sprite sheet
	//cow = 128x32
	var cowPosition = [0, 28, 58, 76];
	var cowLength  = [28, 30, 28, 42];
	var t2x = 16 * 6, t2y = 16 * 8; //PUZZLE position on sprite sheet
	//176x32              P   U   Z   Z   L    E
	var puzzlePosition = [0, 27, 57, 86, 115, 143, 170];
	var puzzleLength  = [27, 30, 29, 29, 28,  27, 6];

	
	//img.addQueue(0, t2x, t2y, 176, 32, x2, y2, 176, 32);
	if(state === 1000) {
		//cow
		for(var i = 0; i < cowLength.length-1; i++) {
			drawSprite(img, shellSpawn.spriteSet, shellSpawn.spriteNumber, x1 + cowPosition[i] + Math.round(cowLength[i]/2)-8, y1 + 8);
		}
		//puzzle
		for(var i = 0; i < puzzlePosition.length-1; i++) {
			var offset;
			if(puzzleScroll <= -puzzlePosition[i+1]) {
				offset = 170;
			}
			else {
				offset = 0;
			}
			drawSprite(img, shellSpawn.spriteSet, shellSpawn.spriteNumber, x2 + puzzlePosition[i] + Math.round(puzzleLength[i]/2)-8 + puzzleScroll + offset, y2 + 8);
		}
	}
	else {
		img.addQueue(0, t1x, t1y, 128, 32, x1, y1, 128, 32);
		/*
		for(var i = 0; i < cowLength.length; i++) {
			img.addQueue(0, t1x + cowPosition[i], t1y, cowLength[i], 32, x1 + cowPosition[i], y1, cowLength[i], 32);
		}
		*/
		for(var i = 0; i < puzzlePosition.length-1; i++) {
			var offset;
			if(puzzleScroll <= -puzzlePosition[i+1]) {
				offset = 170;
			}
			else {
				offset = 0;
			}
			if((i === 2 || i === 3) && (state === 1005)){
				drawSprite(img, shellSpawn.spriteSet, shellSpawn.spriteNumber, x2 + puzzlePosition[i] + Math.round(puzzleLength[i]/2)-8 + puzzleScroll + offset, y2 + 8);
			}
			else {
				img.addQueue(0, t2x + puzzlePosition[i], t2y, puzzleLength[i], 32, x2 + puzzlePosition[i] + puzzleScroll + offset, y2, puzzleLength[i], 32);
			}
		}
	}
	//P 27 x 32
	//U 30
	//Z 29
	//Z 29
	//L 28
	//E 27
	//blank 6
}
function drawTitleCow(img, x, y) {
	img.drawRect(x, y, 16, 16, 0, 255, 255, 255);
	
	drawSprite(img, cowLife.spriteSet, cowLife.spriteNumber, cowLife.x, cowLife.y);
}
function setTitleCow(x, y) {
	cowLife.x = x;
	cowLife.y = y;
}
function moveTitleCow(x, y) {
	shellSpawn.stopAnimation();
	cowLife.animate(cowLifeWalk, 4);
	return cowLife.moveTo(x, y, 1);
}
function eatTitleCow() {
	sf = spawnFrames.slice();
	sf.push(sf[sf.length-1]+1);
	shellSpawn.animate(sf, 1, 0, 0);
	if(cowLife.animate(cowLifeEating, 4, 1, 2) === 2) {
		cowLife.stopAnimation();
		return 2;
	}
	return 0;
}
function spawnTitle(img, x1 , y1, x2 = x1 - 22, y2 = y1 + 40) {

	/*
	for(var i = 0; i < puzzleLength.length-1; i++) {
		drawSprite(img, shellSpawn.spriteSet, shellSpawn.spriteNumber, x2 + puzzlePosition[i] + Math.round(puzzleLength[i]/2)-8, y2 + 8);
	}
	*/
	/*if(!shellSpawn.animate(spawnFrames, 0, 0, 0)) {
		//drawSprite(img, shellSpawn.spriteSet, shellSpawn.spriteNumber, shellSpawn.x, shellSpawn.y);
	}*/
	return shellSpawn.animate(spawnFrames.slice().reverse(), 2, 0, 0);
}
function shiftTitlePuzzle() {
	if(puzzleScroll < 0) {
		puzzleScroll += 2;
	}
	if(puzzleScroll >= 0) {
		puzzleScroll = 0;
		return true;
	}
	return false;
}
function setPuzzleScrollState(input) {
	//reset
	if(input) {
		puzzleScroll = -95;
	}
	else {
		puzzleScroll = 0;
	}
}
function resetTitle() {
	setPuzzleScrollState(true);
	shellSpawn.stopAnimation();
}
function shiftDemoScroll(reset = false) {
	if(reset) {
		demoScroll = 0;
		return true;
	}
	if(demoScroll > -300) {
		demoScroll -= 2;
	}
	else{
		demoScroll = -300;
		return true;
	}

	return false;
}
function drawTitleScreen(img, gameState) {
	var yPos = 56;
	if(gameState >= 1000) {
		drawTitle(img, gameState, 144, yPos + demoScroll);
	}
	if(gameState === 1003) {
		if(Math.floor(titleCounter / 25) % 2 === 0) {
			//drawWord(img, "press space", 19, 19);
		}
		//testGrid.drawGrid(img, gridX+50, gridY+140);
	}
	if((gameState >= 1004) && (gameState < 1010)) { //animate cow eating title
		drawTitleCow(img, 144+35, yPos+7);
	}
}
function drawArrowKeys(img, x, y, pressed) {
	var arrowKeys = 0;
	//Sprite order: up, down, left, right
	//               1    2     4     8
	drawSprite(img, keyboardSpriteSet, arrowKeys   + (4*Number((pressed & 1) > 0)), x+16, y); //UP
	drawSprite(img, keyboardSpriteSet, arrowKeys+2 + (4*Number((pressed & 4) > 0)), x   , y+11); //LEFT
	drawSprite(img, keyboardSpriteSet, arrowKeys+1 + (4*Number((pressed & 2) > 0)), x+16, y+11); //DOWN
	drawSprite(img, keyboardSpriteSet, arrowKeys+3 + (4*Number((pressed & 8) > 0)), x+32, y+11); //RIGHT
}
function drawWASDKeys(img, x, y, pressed) {
	var WASDKeys = 8;
	//Sprite order: up, down, left, right
	//               1    2     4     8
	drawSprite(img, keyboardSpriteSet, WASDKeys   + (4*Number((pressed & 1) > 0)), x+16, y); //UP
	drawSprite(img, keyboardSpriteSet, WASDKeys+2 + (4*Number((pressed & 4) > 0)), x   , y+11); //LEFT
	drawSprite(img, keyboardSpriteSet, WASDKeys+1 + (4*Number((pressed & 2) > 0)), x+16, y+11); //DOWN
	drawSprite(img, keyboardSpriteSet, WASDKeys+3 + (4*Number((pressed & 8) > 0)), x+32, y+11); //RIGHT
}
function drawSpaceBar(img, x, y, pressed) {
	var spaceBar = 18;
	drawSprite(img, keyboardSpriteSet, spaceBar   + (3*Number((pressed & 1) > 0)), x, y);
	drawSprite(img, keyboardSpriteSet, spaceBar+1 + (3*Number((pressed & 1) > 0)), x+16, y);
	drawSprite(img, keyboardSpriteSet, spaceBar+2 + (3*Number((pressed & 1) > 0)), x+32, y);
}
function drawWolfShot(img, x, y, state) {
	var dying = [0,0,0,0,0,0,0,0,0,0,0,0,0,0, 6, 6, 7, 8, 10, 11];
	wolfShotDemo.animate(dying, 1);
	drawSprite(img, wolfSpriteSet, wolfShotDemo.spriteNumber, x, y);
	drawSprite(img, playerUISpriteSet, 6, x, y);
	drawShells(img, x+16*3, y, 2-Number(wolfShotDemo.spriteNumber > 0));
	drawFKey(img, x+16*7, y, wolfShotDemo.spriteNumber);
	//drawShells(img, x+16*4, y, 2);
}
function drawFKey(img, x, y, pressed) {
	var FKey = 16;
	drawSprite(img, keyboardSpriteSet, FKey + Number(pressed > 0), x, y);
}


function drawFence(img) {
	//sprite size * number of sprite sets + BG
	var sy = 16 * 14 + 8;
	//400x300
	//img.addQueue(0, 0, sy, 400, 300, 0, 0, 400, 300, 0);
	//Fence is 300-24 pixels tall, place 24 below origin
	img.addQueue(0, 0, fenceBGSet, 400, 300-24, 0, 24, 400, 300-24, 0);

}

function drawWord(img, str, x, y, alignment=0, shaded=0) {
	//console.log("Draw Word: ", str, "at", x, y, "length", str.length);
	for(var i = 0; i < str.length; i++) {
		var char = str.charCodeAt(i);
		if(char > 64) {
			//convert to lower-case
			var char = (char | 0b00100000) - 87;
			drawBG(img, char, x + (i*(1-alignment)), y + (i*alignment), shaded);
			//console.log("draw word: ", char, x + (i*(1-alignment)), y + (i*alignment));
		}
	}
}

function drawNumber(img, num, x, y, padding=0, alignment=0) {
	//console.log("Draw Word: ", str, "at", x, y, "length", str.length);
	var numString = num.toString();
	if(padding > 0) {
		//pad zeroes to fit length
		if(numString.length < padding) {
			numString = numString.padStart(padding, '0');
		}
		//remove first digits if longer than length
		else if(numString.length > padding) {
			numString = numString.slice(numString.length - padding);
		}
	}
	for(var i = 0; i < numString.length; i++) {
		var char = numString.charCodeAt(i) - 48;
		drawBG(img, char, x + (i*(1-alignment)), y + (i*alignment));
		//console.log("draw number: ", char, x + (i*(1-alignment)), y + (i*alignment));
	}
}
function drawScore(img, score, hiscore = 0) {
	drawWord(img, "hi", 16, 1);
	drawBG(img, 38, 18, 1); //"-"
	drawWord(img, "score", 19, 1);
	drawWord(img, "score", 19, 2);
	drawNumber(img, hiscore, 26, 1, 8);
	drawNumber(img, score, 26, 2, 8);
}
function drawLevel(img, lvl) {
	drawWord(img, "lvl", 40, 1);
	drawBG(img, 38, 43, 1);
	drawNumber(img, lvl, 44, 1, 2);

	drawWord(img, "lvl", 40, 2);
	drawBG(img, 37, 43, 2);
	drawNumber(img, lvl, 44, 2, 2);
}
function drawBonus(img, bonus) {
	drawWord(img, "bonus", 40, 1);
	drawBG(img, 37, 41, 2);
	drawNumber(img, bonus, 42, 2, 2);
}
function drawTurnBonus(img, bonus) {
	drawWord(img, "turns", 5, 1);
	drawBG(img, 37, 6, 2);
	drawNumber(img, bonus, 7, 2, 2);
}
//*WOLF TRACK
function moveTrack(track, shells, active) {
	var equal = 0;
	if(active) {
		for(var i = 0; i < track.length; i++) {
			if(wolfTrackOld[i] != track[i]) {
				equal += 1;
			}
		}
		if(equal > 0) {
			wolfTrackScroll -= 2;
			wolfTrack.animate(wolfTrackWalk, 1);
		}
		console.log("equal", equal);
		if(wolfTrackScroll < -15) {
			wolfTrack.stopAnimation();
			wolfTrackScroll = 0;
			wolfTrackOld = [...track];
			equal = 0;
			if(wolfTrackOld[0] === 3) {
				//if(moveGainShells(shells)) {

				//}
				wolfTrackOld[0] = 0;
				//track[0] = 0;
			}
			
			console.log(wolfTrackOld, track);
		}
	}
	return equal === 0;
}
function setTrack(track) {
	wolfTrackOld = [...track];
}
function drawTrack(img, track, active) {
	var wolfTrackIcon = [20, 2, 3, 4];
	//Sticks/Dividers
	for(var i = 0; i < 9; i++) {
		drawSprite(img, 2, 4, 320, 48+8+(16*i) + wolfTrackScroll); //draw sticks/dividers
	}
	//Icons
	for(var i = 0; i < 10; i++) {
		if(wolfTrackOld[i] === 3) {
			drawSprite(img, 1, 4, 320, 48+(16*i) + wolfTrackScroll); //icons on track
		}
		else {
			drawSprite(img, 2, wolfTrackIcon[wolfTrackOld[i]], 320, 48+(16*i) + wolfTrackScroll); //icons on track
		}
	}
	//Wolf
	drawSprite(img, wolfTrack.spriteSet, wolfTrack.spriteNumber, wolfTrack.x, wolfTrack.y);
	if(active > 0) {
		wolfTrack.spriteSet = 4;
	}
	else {
		wolfTrack.spriteSet = 2;
		//sleeping
		if(wolfTrack.animate(wolfTrackSleep, 64)) {
			console.log("end frame");
			for(var i = 0; i < wolfZX.length; i++) {
				wolfZX[i] = 0;
				wolfZY[i] = 0;
				wolfZXOffset[i] = 0;
				wolfZXDir[i] = 1;
			}
		}
		//Handle Zs
		if(wolfZDelay > 0) {
			if(wolfZXOffset[0] === 3) {
				wolfZXDir[0] = -1;
			}
			else if(wolfZXOffset[0] === -3) {
				wolfZXDir[0] = 1;
			}
			if(wolfZY[0] >= -12) {
				wolfZXOffset[0] += wolfZXDir[0];
				wolfZX[0] += wolfZXOffset[0];
				wolfZY[0] -= .5;
				//drawSprite(img, 2, 5, wolfZStartX + wolfZX[0]+wolfZY[0], wolfZStartY + wolfZY[0]);
			}
			
			for(var i = 1; i < wolfZX.length; i++) {
				if((wolfZY[i] >= -12) && (wolfZY[i-1] < -2)){
					if(wolfZXOffset[i] === 3) {
						wolfZXDir[i] = -1;
					}
					else if(wolfZXOffset[i] === -3) {
						wolfZXDir[i] = 1;
					}
					if(wolfZY[i] >= -12) {
						wolfZXOffset[i] += wolfZXDir[i];
						wolfZX[i] += wolfZXOffset[i];
						wolfZY[i] -= .5;
						//drawSprite(img, 2, 5, wolfZStartX + wolfZX[i]+wolfZY[i], wolfZStartY + wolfZY[i]);
					}
				}
				
			}
			wolfZDelay = 0;
		}
		else {
			wolfZDelay += 1;
		}
		for(var i = 0; i < wolfZX.length; i++) {
			if((wolfZY[i] >= -12) && (wolfZY[i] != 0)) {
				drawSprite(img, 2, 5, wolfZStartX + wolfZX[i]+wolfZY[i], wolfZStartY + wolfZY[i]);
			}
		}
	}
}

function drawTurnsLeft(img, turns) {
	var wholeGrass;
	if(turns > 39) {
		wholeGrass = 13;
	}
	else {
		wholeGrass = Math.floor(turns/3);
	}
	//draw
	drawWord(img, "turns", 4, 5);
	drawWord(img, "left", 5, 6);
	for(var i = 0; i < wholeGrass; i++) {
		drawSprite(img, 7, 0, 48, 56 + (16*12 - 16*i));
	}
	if((turns % 3 != 0) && (wholeGrass < 13)) {
		drawSprite(img, 7, 3 - turns % 3, 48, 56 + (16*12 - 16*wholeGrass));
	}
	if(turns === 1) {
		drawWord(img, "last", 5, 28);
		drawWord(img, "turn", 5, 29);
	}
}

function moveGainShells() {
	var done = shellGained.moveTo(wolfTrack.x, wolfTrack.y - 16, 1);
	//shellSpawn.animate(spawnFrames, 0, 0, 0);
	if(done) {
		shellGained.setCoord(wolfTrack.x, wolfTrack.y);
		shellSpawn.stopAnimation();
	}
	return done;
}
function drawGainShells(img, shells) {
	shellSpawn.setCoord(320 + ((shells-1)*16), 240);
	//shellSpawn.animate(spawnFrames, 0, 0, 0);
	if(shellGained.y != wolfTrack.y) {
		shellGained.spriteSet = 2;
		shellGained.spriteNumber = 6;
		drawSprite(img, shellGained.spriteSet, shellGained.spriteNumber, shellGained.x, shellGained.y);
		if(!shellSpawn.animate(spawnFrames, 0, 0, 0)) {
			drawSprite(img, shellSpawn.spriteSet, shellSpawn.spriteNumber, shellSpawn.x, shellSpawn.y);
		}
		moveGainShells();
	}
}

function drawShells(img, x, y, shells) {
//function drawShells(img, shells) {
	for(var i = 0; i < shells; i ++) {
		drawSprite(img, 1, 4, x + (i*16), y);
	}
}

function moveDeadCow() {
	cowDeathY -= 1;
	if(cowDeathY < -32) {
		cowDeathY = 0;
		return true;
	}
	return false;
}
function drawDeadCow(img, cow, gx, gy) {
	if(cowDeathY != 0) {
		drawSprite(img, 0, 9, cow.x + gx, cow.y + gy + cowDeathY, cow.mirror);
		//drawSprite(img, 0, 9, 0, 128+16); //DEBUG - test if it works
	}
}

function drawGrassOut(img, grs = 1) {
	for(var i = 0; i < grs; i++) {
		drawSprite(img, 6+i, 0, 352, 48 + (16*i));
	}
}


/*
//Draw a word using sprites
void drawword(char *str, byte align, int x, int y)
{
	//left
	if(align==0)
	{
		for(byte n=0; n < strlen(str); n++)
		{
			draw_sprite((x-2)+14*n, y, FG_A_SPR + str[n]-97, 0);
			//Serial.print(str[n]);
		}
	}
	//center
	else if(align==1)
	{
		for(byte n=0; n < strlen(str); n++)
		{
			if(str[n] != ' ')
			{
				draw_sprite((x-2) - 14*((strlen(str)/2) - n) + (7*((strlen(str)+1)%2)), y, FG_A_SPR + str[n]-97, 0);
			}
			//Serial.print(str[n]);
		}
	}
	//right
	else if(align==2)
	{
		for(int n=0; n < strlen(str); n++)
		{
			draw_sprite((x-2)+14*n-(14*(strlen(str)-1)), y, FG_A_SPR + str[n]-97, 0);
			//Serial.print(str[n]);
		}
	}
}
*/
