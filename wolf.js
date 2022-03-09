var wolfMoveDir = 0;
var wolves = [];
var wolfStateDead = 4;

class wolf extends sprite{
	constructor(x, y) {
		super(x, y);
		this.ox = 0;
		this.oy = 0;
		this.type = 0; //use for later
		this.spawn = 2; //0 = moving, 1 = spawned, 2 = spawning animation, 3 = dead, 4 = dying animation
		this.spriteSet = 4; //wolf
		this.spriteNumber = 0; //standing
		this.walking = [1, 3, 2, 3];
		this.dying = [0, 6, 7, 8, 10, 11];
		this.spawnFrames = [6, 5, 4, 3, 2, 1, 0];
		this.eating = [4, 0, 5];
	}
	walkingAnimation() {
		//this.currentFrame += 1;
		//this.currentFrame %= 4;
		//this.spriteNumber = this.walking[this.currentFrame];
		this.animate(this.walking, 4);
	}
	dyingAnimation() {
		var a = this.animate(this.dying, 1, 0, 0);// != 0;
		console.log("dying animation", a);
		if(a === 2) {
			console.log("if statement");
			this.stopAnimation(this.dying[this.dying.length-1]);
			this.spawning();
		}
		return a;
	}
	spawningAnimation() {
		this.spriteSet = 5; //explosion
		var a = this.animate(this.spawnFrames, 1, 0, 0);// != 0;
		console.log("spawning animation", a);
		if(a === spriteAnimationEnd) {
			console.log("spawning if statement");
			this.spriteSet = 4; //wolf
			this.stopAnimation();
			this.spawning();
		}
		return a;
	}
	eatingAnimation() {
		if(this.animate(this.eating, 4, 1, 4) === 2) {
			this.stopAnimation();
		}
	}

	init() {
		this.x = 0;
		this.y = 0;
		this.type = 0;
		this.spawn = 5;
	}
	
	spawningOld(wolfIn, id) {
		var collision = false;
		var rand;
		if(this.spawn > 0) {
			//console.log(this.spawn, this.x, this.y);
			do {
				collision = false;
				rand = Math.floor(Math.random()*4);
				console.log(rand);
				if(this.spawn > 1) { //not on map
					this.spawn -= 1;
				}
				else if(this.spawn === 1) { //on map in a corner outside grid
					//quadrant
					//var rand = Math.floor(Math.random()*4);
					//console.log(rand);
					switch(rand) {
					case 0: //upper-right
						this.x = 10;
						this.y = -1;
						break;
					case 1: //upper-left
						this.x = -1;
						this.y = -1;
						break;
					case 2: //lower-left
						this.x = -1;
						this.y = 10;
						break;
					case 3: //lower-right
						this.x = 10;
						this.y = 10;
						break;
					}
					this.spawn -= 1;
				}
				//make sure wolf does not spawn on existing wolf
				for(var i = 0; i < wolfIn.length; i++) {
					if((wolfIn[i].x === this.x) && (wolfIn[i].y === this.y) && (i != id)) {
						collision = true;
					}
				}
			} while(collision)
		}
		return this.spawn;
		//console.log("after", this.spawn, this.x, this.y);
	}	
	
	spawning() {
		if(this.spawn === 3) {
			this.stopAnimation();
		}
		if(this.spawn > 0) {
			this.spawn -= 1;
		}
		return this.spawn;
	}

	chase(x, y, dir, wolfIn, id) {
		var dx = 0, dy = 0;
		var collision = false;
		//left-right
		if(dir === 1) {
			if(this.x < x) {
				dx += 1;
			}
			else if(this.x > x) {
				dx -= 1;
			}
		}
		//up-down
		else if(dir === 2) {
			if(this.y < y) {
				dy += 1;
			}
			else if(this.y > y) {
				dy -= 1;
			}
		}
		//more directions to be added if needed
		//make sure wolf does not move on occupied space
		for(var i = 0; i < wolfIn.length; i++) {
			if((wolfIn[i].x === this.x+dx) && (wolfIn[i].y === this.y+dy) && (i != id)) {
				return;
			}
		}

	}
	
	checkCollision(wolfIn, id) {
		for(var i = 0; i < wolfIn.length; i++) {
			if((wolfIn[i].x === this.x) && (wolfIn[i].y === this.y ) && (i != id)) {
				return true;
			}
		}
	}
	
	//Setters
	setSpawnStep(n) {
		this.spawn = n;
	}
	
	setX(x) {
		this.x = x;
	}
	setY(y) {
		this.y = y;
	}

	//Getters
	getX() {
		return this.x;
	}
	getY() {
		return this.y;
	}
	getSpawnStep() {
		return this.spawn;
	}
	getSpawned() {
		return this.spawn < 0;
	}
}
/*
for (var i=0; i < 4; i++) {
	wolves.push(new wolf());
}

var wolfSteps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var wolfStepThreshold = 0;
var wolfStepCounter = 0;
var wolfMoveDir = 0;

function wolfCollision(wolfIn) {
	
}

function wolfNextStep(nextStep = -1) {
	for(var i = 0; i < 11; i++) {
		wolfSteps[i] = wolfSteps[i+1];
	}
	if(nextStep < 0) { //default behavior
		if(wolfStepCounter < wolfStepThreshold) { //always 0 until threshold is met. Threshold will change
			wolfSteps[11] = 0;
			wolfStepCounter += 1;
		}
		else { //move hor or move vert
			wolfSteps[11] = (wolfMoveDir % 2) + 1;
			wolfMoveDir += 1;
			wolfStepCounter = 0;
		}
	}
	else { //insert step manually
		wolfSteps[11] = nextStep;
	}
	//console.log(wolfSteps);
}

function wolfSetupSteps() {
	wolfSteps = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	wolfStepThreshold = 0;
	wolfStepCounter = 0;
	wolfMoveDir = 0;
}
*/
