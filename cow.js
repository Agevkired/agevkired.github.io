var cowx, cowy;
var cowHeld = 0;
var cowAction = 0;
var cowDeadSprite = 7;

function cowInit() {
	cowx = 4;
	cowy = 4;
}

//l, r, u, d, w, a, s, dn, space
//0, 1, 2, 3, 4, 5, 6,  7, 8c
function cowMove(buttonInput) {
	for(var i = 0; i < buttonInput.length; i++) {
		cowHeld = cowHeld || buttonInput[i];
	}
	cowx = cowx - buttonInput[0] + buttonInput[1];
	cowy = cowy - buttonInput[2] + buttonInput[3];
	return 0;
}

class cow extends sprite{
	constructor(x, y) {
		super();
		this.walking = [1, 3, 2, 3];
		this.eating = [4, 0, 5, 0, 6];
		this.spawnFrames = [6, 5, 4, 3, 2, 1, 0];
		this.gridX = 0;
		this.gridY = 0;
	}
	walkingAnimation() {
		//this.currentFrame += 1;
		//this.currentFrame %= 4;
		//this.spriteNumber = this.walking[this.currentFrame];
		this.animate(this.walking, 4);
	}
	eatingAnimation() {
		//this.currentFrame += 1;
		//this.currentFrame %= this.eating.length;
		//this.spriteNumber = this.eating[this.currentFrame];
		this.animate(this.eating, 4, 1);
	}
	spawningAnimation() {
		this.spriteSet = 5; //explosion
		var a = this.animate(this.spawnFrames, 1, 0, 0);// != 0;
		console.log("spawning animation", a);
		if(a === spriteAnimationEnd) {
			console.log("spawning if statement");
			this.spriteSet = 0; //cow
			this.stopAnimation();
		}
		return a;
	}
	//using grid
	setGridCoord(x, y, space, offset) {
		this.gridX = x;
		this.gridY = y;
		this.setCoord(this.gridX*space + offset, this.gridY*space + offset);
	}
	moveGrid(x, y, space, offset, stepSize) {
		var destX = x*space + offset;
		var destY = y*space + offset;
		if(this.moveTo(destX, destY, stepSize)){
			this.setGridCoord(x, y, space, offset);
			return true;
		}
		this.walkingAnimation();
		//console.log("Cow position: ", this.cow.x, this.cow.y);
		return false;
	}
	cowEating() {
		//console.log("EATING GRASS");
		//this.markGrass(this.cowX, this.cowY);
		for(var j = 0; j < this.y; j++) {
            for(var i = 0; i < this.x; i++) {
				if(this.grasses[j][i].spawn >= 3) {
					this.grasses[j][i].explodingAnimation();
				}
			}
		}
		//this.grasses[0][0].explodingAnimation();
		//console.log("0, 0: ", this.grasses[0][0].spriteNumber);
		return this.cow.eatingAnimation();
	}
}
/*
function cowMove(l, r, u, d, w, a, s, dn, space) {
	buttonPressed = l + r + u + d + w + a + s + dn + space;
	if(!cowHeld) {
		if((l === 1) && (cowx > 0)) {
			cowx -= 1;
		}
		else if((r === 1) && (cowx < 9)) {
			cowx += 1;
		}
		else if((u === 1) && (cowy > 0)) {
			cowy -= 1;
		}
		else if((d === 1) && (cowy < 9)) {
			cowy += 1;
		}
		else if(w === 1) { //rotate up
			cowAction = 2;
		}
		else if(a === 1) { //rotate left
			cowAction = 3;
		}
		else if(s === 1) { //rotate down
			cowAction = 4;
		}
		else if(dn === 1) { //rotate right
			cowAction = 5;
		}
		else if(space === 1) { //eat
			cowAction = 1;
		}
		if(buttonPressed > 0) {
			cowHeld = true;
			return 1;
		}
	}
	else if(buttonPressed === 0) {
		cowHeld = false;
		cowAction = 0;
	}
	return 0;
	//console.log(l, r, u, d, z, x, c, space, cowHeld, cowAction);
}
*/
