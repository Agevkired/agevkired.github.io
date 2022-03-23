var cowLife = new sprite();
var cowLifeWalk = [1, 3, 2, 3];
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
var shellGained = new sprite(wolfTrack.x, wolfTrack.y);
shellGained.setCoord(wolfTrack.x, wolfTrack.y);
shellGained.spriteSet = 2;
shellGained.spriteNumber = 6;
var shellSpawn = new sprite(400,400);
shellSpawn.spriteSet = 5;
var spawnFrames = [0, 1, 2, 3, 4, 5, 6];

function drawTrackSetup() {

}

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
function drawBG(img, number, x, y) {
	//sprite size * number of sprite sets
	var sy = 16 * 14;
	//8x8 BG
	img.addQueue(0, number*8, sy, 8, 8, 8*x, 8*y, 8, 8, 0);
}

function drawFence(img) {
	//sprite size * number of sprite sets + BG
	var sy = 16 * 14 + 8;
	//400x300
	img.addQueue(0, 0, sy, 400, 300, 0, 0, 400, 300, 0);
}

function drawWord(img, str, x, y, alignment=0) {
	//console.log("Draw Word: ", str, "at", x, y, "length", str.length);
	for(var i = 0; i < str.length; i++) {
		var char = str.charCodeAt(i);
		if(char > 64) {
			//convert to lower-case
			var char = (char | 0b00100000) - 87;
			drawBG(img, char, x + (i*(1-alignment)), y + (i*alignment));
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
	drawWord(img, "turn", 5, 5);
	for(var i = 0; i < wholeGrass; i++) {
		drawSprite(img, 7, 0, 48, 48 + (16*12 - 16*i));
	}
	if((turns % 3 != 0) && (wholeGrass < 13)) {
		drawSprite(img, 7, turns % 3, 48, 48 + (16*12 - 16*wholeGrass));
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

function drawShells(img, shells) {
	for(var i = 0; i < shells; i ++) {
		drawSprite(img, 1, 4, 320 + (i*16), 240);
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
		drawSprite(img, 0, 9, 0, 128+16); 
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
