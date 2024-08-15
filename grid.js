class grid {
    constructor(row, column, space=20, steps=8, spriteSize=16) {
		//size of grid
        this.x = column;
        this.y = row;
		//size of space in pixels
        this.space = space;
        this.offset = (space-spriteSize)/2; //offset to center sprites in space, assumes 16x16
		//number of frames to move to a different space
		this.stepAmount = steps;
		this.stepSize = Math.round(this.space/steps);
		//setup grass
        this.grasses = [];
        var tempGrass = [];
        for(var j = 0; j < this.y; j++) {
            for(var i = 0; i < this.x; i++) {
                tempGrass.push(new grass(i*this.space+this.offset, j*this.space+this.offset));
                tempGrass[i].setColor((j*this.x + i)%8);
            }
            this.grasses.push(tempGrass);
            tempGrass = [];
        }
		this.grassEaten = 0;
        //test
        //this.shiftSwitch = 0;
        //setup cow/player
		this.cowX = 0;
		this.cowY = 0;
        this.cow = new cow(0,0);
		this.cowSet(0, 0);
		this.shells = 2;
		//setup wolves
		this.wolves = [];
		this.wolvesX = [];
		this.wolvesY = [];
		this.wolvesMax = 4;
		for(var i = 0; i < this.wolvesMax; i++) {
			this.wolves.push(new wolf(0,0));
			this.wolvesX.push(0);
			this.wolvesY.push(0);
		}
		this.wolfTrack = [0,0,1,2,3, 0,0,0,0,0]; //10
		this.wolfStateActive = 0;
		this.wolfStateSpawning = 2;
		this.wolfStateDead = 3;
		//this.
		//score
		this.score = 0
		this.hiscore = 0;
		//difficulty
		this.scoreThreshold = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]; //as score passes, difficulty increments, write what it actually does later
		this.difficulty = 0;
		this.scoreMultiplier = 1;
		this.turnsLeft = 30;
		this.turnsMultiplier = 1;
		this.trackPercent = [0, 0, 0, 0]; //percent occurrences for wolves, ammo, snake
		//****wolves
		this.wolvesActive = 0;
		this.trackPercent[0] = 0;
		this.trackPercent[1] = 1;
		this.playerActive = 0; //player idle
		this.deathPenalty = 10;
		this.grassesActive = 1;
		this.snakesActive = 0;
		this.maxSnakesActive = 2;
		//sprites
		this.cowSprites = 0;
		this.wolfNumberSprites = 3;
		this.wolfSprites = 4;
    }
	//**GRID FUNCTIONS */
    setSpace(n) {
    	this.space = n;
    }
	//draw grid of grass at position
    drawGrid(img, x, y) {

		/*
		var drawCow = true;
		var drawWolves = [];
		for(var i = 0; i < this.wolvesActive; i++) {
			drawWolves.push(true);
		}
    	for(var j = 0; j < this.y; j++) {
			if((this.grasses[j][0].y >= this.cow.y) && drawCow) {
				drawSprite(img, this.cow.spriteSet, this.cow.spriteNumber, x + this.cow.x, y + this.cow.y - 8, this.cow.mirror);
				drawCow = false;
			}
			for(var i = 0; i < this.wolvesActive; i++) {
				if((this.grasses[j][0].y >= this.wolves[i].y) && drawWolves[i]) {
					if(this.wolves[i].spawn != this.wolfStateSpawning){
						drawSprite(img, this.wolves[i].spriteSet, this.wolves[i].spriteNumber, x + this.wolves[i].x, y + this.wolves[i].y - 6, this.wolves[i].mirror);
						//drawSprite(img, this.wolfNumberSprites, i, x + this.wolves[i].x, y + this.wolves[i].y);
					}
					drawWolves[i] = false;
				}
			}
            for(var i = 0; i < this.x; i++) {
				//0 means full grown, change later
                drawSprite(img, this.grasses[j][i].color + 6, this.grasses[j][i].spawn, x + this.grasses[j][i].x, y + this.grasses[j][i].y);
				if((i === 0) && (j === 0)) {
					//drawSprite(img, this.grasses[j][i].spriteSet, this.grasses[j][i].spriteNumber, x + this.grasses[j][i].x, y + this.grasses[j][i].y);
				}
				if((i === 1) && (j === 1)) {
					//drawSprite(img, this.grasses[j][i].spriteSet, this.grasses[j][i].spriteNumber, x + this.grasses[j][i].x, y + this.grasses[j][i].y);
				}
				if(this.grasses[j][i].spawn >= 4) {
					drawSprite(img, this.grasses[j][i].spriteSet, this.grasses[j][i].spriteNumber, x + this.grasses[j][i].x, y + this.grasses[j][i].y);
					if((i === 0) && (j === 0)) {
						//console.log("0, 0: ", this.grasses[j][i].spriteNumber);
					}
				}
            }
        } 
		//drawSprite(img, this.cow.spriteSet, this.cow.spriteNumber, x + this.cow.x, y + this.cow.y, this.cow.mirror);
		*/
		//DRAW SPRITES
		var CurrentQSize = img.getQueue();
		drawSprite(img, this.cow.spriteSet, this.cow.spriteNumber, x + this.cow.x, y + this.cow.y - 8, this.cow.mirror);
		for(var i = 0; i < this.wolvesActive; i++) {
			if(this.wolves[i].spawn != this.wolfStateSpawning){
				drawSprite(img, this.wolves[i].spriteSet, this.wolves[i].spriteNumber, x + this.wolves[i].x, y + this.wolves[i].y - 6, this.wolves[i].mirror);
				//drawSprite(img, this.wolfNumberSprites, i, x + this.wolves[i].x, y + this.wolves[i].y);
			}
		}
		for(var j = 0; j < this.y; j++) {
			for(var i = 0; i < this.x; i++) {
				//0 means full grown, change later
				drawSprite(img, this.grasses[j][i].color + 6, this.grasses[j][i].spawn, x + this.grasses[j][i].x, y + this.grasses[j][i].y);
				if(this.grasses[j][i].spawn >= 4) {
					drawSprite(img, this.grasses[j][i].spriteSet, this.grasses[j][i].spriteNumber, x + this.grasses[j][i].x, y + this.grasses[j][i].y);
				}
				if(this.grasses[j][i].spawn === 0) {
					if(this.grasses[j][i].getExtra() > 0) {
						drawSprite(img, woflUISpriteSet, this.grasses[j][i].getExtra() + 6, x + this.grasses[j][i].x, y + this.grasses[j][i].y + 2);
					}
				}
			}
		}
		img.sortQueue(CurrentQSize-1);

		//DRAW ARROWS
		drawSprite(img, 1, 0, x - this.space + this.offset, y + this.cow.y);
		drawSprite(img, 1, 1, x + (this.x * this.space) + this.offset, y + this.cow.y);
		drawSprite(img, 1, 2, x + this.cow.x, y - this.space + this.offset);
		drawSprite(img, 1, 3, x + this.cow.x, y + (this.y * this.space) + this.offset);
		
		
		
		//AIM CROSSHAIR
		var closest = -1; //if no target (all wolves dead)
		var closestX = 1000, closestY = 1000;
		var diffX, diffY;
		for(var i = 0; i < this.wolvesActive; i++) {
			if(this.wolves[i].spawn <= 1) { //if wolf is on board even if outside fence
				diffX = Math.abs(this.cowX - this.wolvesX[i]);
				diffY = Math.abs(this.cowY - this.wolvesY[i]);
				if(diffX + diffY < closestX + closestY) {
					closest = i;
					closestX = diffX;
					closestY = diffY;
				}
			}
		}
		if((closest != -1) && (this.cow.spriteNumber != cowDeadSprite)) {
			drawSprite(img, 1, 5 + (this.shells > 0), x + this.wolves[closest].x, y + this.wolves[closest].y - 6); //5 = crosshair
		}

		/*
		for(var i = 0; i < this.wolvesActive; i++) {
			if(this.wolves[i].spawn != this.wolfStateSpawning){
				//drawSprite(img, this.wolves[i].spriteSet, this.wolves[i].spriteNumber, x + this.wolves[i].x, y + this.wolves[i].y, this.wolves[i].mirror);
				drawSprite(img, this.wolfNumberSprites, i, x + this.wolves[i].x, y + this.wolves[i].y - 6);
			}
		}
		*/
    }
	xToGrid(x) {
		return 1
	}
	coordFromGrid(coord) {
		return coord*this.space+this.offset;
	}
	respawn() {
		for(var i = 0; i < this.wolvesActive; i++) {
			this.wolves[i].stopAnimation();
			this.wolves[i].spawn = this.wolfStateDead-1;
		}
		//cow
		this.cow.stopAnimation();
		this.cowSet(4, 4);
		//grass
		for(var j = 0; j < this.y; j++) {
            for(var i = 0; i < this.x; i++) {
				this.grasses[i][j].spawn = 0;
            }
        }
		this.scoreMultiplier = 1;
	}
	initialize(demo = false) {
		this.score = 0;
		this.difficulty = 0;
		this.turnsLeft = 30;
		this.shells = 1;
		this.wolfTrack = [0,0,1,2,3, 0,0,0,0,0]; //10
		this.trackPercent = [0, 0, 0, 0];
		if(demo) {
			//this.hiscore -= this.score;
			if(this.hiscore < 0) {
				this.hiscore = 0;
			}
		}
		else {
			for(var j = 0; j < this.y; j++) {
				for(var i = 0; i < this.x; i++) {
					//this.grasses[i][j].setColor((j*this.x + i)%8); //CHANGE THIS TO SOMETHING ELSE
					this.grasses[i][j].setColor(Math.floor(Math.random()*100*this.grassesActive)%4);
				}
			}
			this.respawn();
		}
		this.scoreMultiplier = 1;
		this.manageDifficulty();
	}

	gridCheckValidInput(moveX, moveY, shiftC, shiftR, eating, fire) {
		//test valid movement
		var x = testGrid.cowX + moveX;
		var y = testGrid.cowY + moveY;
		if((x < 0) || (x > this.x-1) || (y < 0) || (y > this.y-1)) {
			return false;
		}
		//test valid eating
		if(this.grasses[y][x].spawn === 0) {
			if(this.grasses[y][x].getExtra() != 1) {
				return false;
			}
		}
		return true;
	}

	//**COW/PLAYER FUNCTIONS */
	cowSet(x, y) {
		this.cowX = x;
		this.cowY = y;
		this.cow.setCoord(x*this.space+this.offset, y*this.space+this.offset);
	}
	cowMove(x, y) {
		if((x < 0) || (x > this.x-1) || (y < 0) || (y > this.y-1)) {
			console.log("OUT OF BOUNDS");
			return 0;
		}
		var destX = x*this.space+this.offset;
		var destY = y*this.space+this.offset;
		if(this.cow.moveTo(destX, destY, this.stepSize)){
			this.cowSet(x, y, 1);
			return 2;
		}
		this.cow.walkingAnimation();
		//console.log("Cow position: ", this.cow.x, this.cow.y);
		return 1;
	}
	cowMoveDir(x, y) {
		//this.cowMove();
	}
	cowEating() {
		//console.log("EATING GRASS");
		//this.markGrass(this.cowX, this.cowY);
		for(var j = 0; j < this.y; j++) {
            for(var i = 0; i < this.x; i++) {
				if(this.grasses[j][i].spawn === 5) {
					if(this.grasses[j][i].explodingAnimation()) {
						this.grasses[j][i].spawning(); //should equal 4 for next call to be 3
					}
				}
			}
		}
		//this.grasses[0][0].explodingAnimation();
		//console.log("0, 0: ", this.grasses[0][0].spriteNumber);
		return this.cow.eatingAnimation();
	}
	cowEaten() {
		for(var i = 0; i < this.wolvesActive; i++) {
			if((this.cowX === this.wolvesX[i]) && (this.cowY === this.wolvesY[i])) {
				this.cow.spriteNumber = cowDeadSprite;
				//this.turnsLeft -= 10;
				return true;
			}
		}
		return false;
	}
	cowSpawning() {
		if(this.cow.spawningAnimation()) {
			return true;
		}
		return false;
	}
	gunFire() {
		var closest = -1; //if no target (all wolves dead)
		var closestX = 1000, closestY = 1000;
		var diffX, diffY;
		if(this.shells > 0) {
			for(var i = 0; i < this.wolvesActive; i++) {
				if(this.wolves[i].spawn <= this.wolfStateSpawning-1) { //if wolf is on board even if outside fence
					diffX = Math.abs(this.cowX - this.wolvesX[i]);
					console.log(this.cowX, this.wolvesX[i]);
					diffY = Math.abs(this.cowY - this.wolvesY[i]);
					if(diffX + diffY < closestX + closestY) {
						closest = i;
						closestX = diffX;
						closestY = diffY;
					}
				}
			}
		}
		console.log("closest", closest, "x", closestX, "y", closestY);
		if(closest != -1) {
			this.shells -= 1; //only reduce when a wolf is shot
			this.turnsMultiplier = this.shells;
			this.wolves[closest].spawn = this.wolfStateDead;
		}
		return closest;
		//kill wolf function
	}
	gunAddAmmo() {
		if((this.wolfTrack[0] === 3) && (this.shells < 3)){
			this.wolfTrack[0] = 0;
			this.shells += 1;
			return 1;
		}
		return 0;
	}
	gunDeadCow() {
		this.turnsMultiplier = this.shells;
		if(this.shells > 1) {
			//search for closest wolf
			var closest = -1;
			var closestX = 1000, closestY = 1000;
			var diffX, diffY;
			for(var i = 0; i < this.wolvesActive; i++) {
				if(this.wolves[i].spawn <= 1) { //if wolf is on board even if outside fence
					diffX = Math.abs(this.cowX - this.wolvesX[i]);
					diffY = Math.abs(this.cowY - this.wolvesY[i]);
					if(diffX + diffY < closestX + closestY) {
						closest = i;
						closestX = diffX;
						closestY = diffY;
					}
				}
			}
			if(closest != -1) {
				if(this.wolves[closest].dyingAnimation()) {
					this.wolves[closest].spawn = this.wolfStateSpawning;
					this.shells -= 1;
					this.score += this.scoreMultiplier;
				}
			}
			else {
				return true;
			}
			return false;
		}
		return true;
	}
	//**GRASS FUNCTIONS */
	//returns an array [color, spawn];
    getGrass(x, y) {
        return [this.grasses[y][x].color, this.grasses[y][x].spawn];
    }

	//decrement spawn state
	grassSpawn() {
		for(var j = 0; j < this.y; j++) {
            for(var i = 0; i < this.x; i++) {
				this.grasses[j][i].spawning();
			}
		}
		if(this.wolfTrack[0] === 4) {
			if(this.snakesActive < this.maxSnakesActive) {
				var clear = true;
				do {
					var row = Math.floor(Math.random() * 10);
					var col = Math.floor(Math.random() * 10);
					clear = true;
					for(var i = 0; i < this.wolvesMax; i++) {
						if((row === this.wolvesY[i]) && (col === this.wolvesX[i])) {
							clear = false;
						}
					}
					if((row === this.cowY) && (col === this.cowX)) {
						clear = false;
					}
					if(this.grasses[row][col].extra > 0) {
						clear = false;
					}
					if(clear) {
						this.grasses[row][col].extra = 1;
					}
				} while(!clear);
				console.log("Snakes placed: row: ", row, ", column: ", col);
				this.snakesActive += 1;
				//FIX HERE
			}
			this.wolfTrack[0] = 0;
		}
	}

	setGrass(x, y, color) {
		this.grasses[y][x].color = color;
	}
	setGrasses(colors) {
		var c = 0;
		for(var j = 0; j < this.y; j++) {
            for(var i = 0; i < this.x; i++) {
				if(c === colors.length) {
					return;
				}
				this.setGrass(i, j, colors[c]);
				c += 1;
			}
		}
	}
    
    //shift row
    shiftRow(row, direction) {
    	if(direction) {
    		if(this.shiftRight(row)) {
				//this.turnsDecrement();
				//testGrid.grassSpawn();
				return true;
			}
    	}
    	else {
    		if(this.shiftLeft(row)) {
				//this.turnsDecrement();
				//testGrid.grassSpawn();
				return true;
			}
    	}
		return false;
    }
    //Separate implementation for each direction, to be replaced by single function
    shiftRight(row) {
    	var tempColor;
		var tempSpawn;
		var tempExtra;
    	//var printX = this.grasses[row][0].x;
    	for(var i = 0; i < this.x; i++) {
    		this.grasses[row][i].x += this.stepSize;
		}
    	//console.log("shiftRow: ", printX, this.grasses[row][0].x);
    	//if grass halfway to next cell, shift back by cell size, shift colors to right
    	//gives the illusion of rotating row without actually moving the grass
		
		if(this.grasses[row][this.x-1].x >= (this.x-.5)*this.space+this.offset) {
			this.grasses[row][this.x-1].x = this.grasses[row][0].x - this.space;
		}
		if(this.grasses[row][0].x >= this.space+this.offset) {
			//resolve color
    		tempColor = this.grasses[row][this.x-1].color;
			tempSpawn = this.grasses[row][this.x-1].spawn;
			tempExtra = this.grasses[row][this.x-1].extra;
    		for(var i = this.x-1; i > 0; i--) {
	    		this.grasses[row][i].color = this.grasses[row][i-1].color;
				this.grasses[row][i].spawn = this.grasses[row][i-1].spawn;
				this.grasses[row][i].extra = this.grasses[row][i-1].extra;
    		}
			this.grasses[row][0].color = tempColor;
			this.grasses[row][0].spawn = tempSpawn;
			this.grasses[row][0].extra = tempExtra;
			//resolve position
			for(var i = 0; i < this.x; i++) {
				this.grasses[row][i].x = i*this.space+this.offset;
			}
    		//this.grasses[row][this.x-1].color = tempColor;
			
			console.log("FINISH");
			return true;
		}
    	return false;
    }
    shiftLeft(row) {
    	var tempColor;
		var tempSpawn;
		var tempExtra;
    	//var printX = this.grasses[row][0].x;
    	for(var i = 0; i < this.x; i++) {
    		this.grasses[row][i].x -= this.stepSize;
		}
		if(this.grasses[row][0].x <= (-this.space+this.offset)*.5) {
			this.grasses[row][0].x = this.grasses[row][this.x-1].x + this.space;
			console.log("1st if", this.grasses[row][0].x);
		}
		//if(this.grasses[row][0].x <= (this.x-1)*this.space+this.offset) {
		if(this.grasses[row][1].x <= this.offset) {
			//resolve color
    		tempColor = this.grasses[row][0].color;
			tempSpawn = this.grasses[row][0].spawn;
			tempExtra = this.grasses[row][0].extra;
    		for(var i = 0; i < this.x-1; i++) {
	    		this.grasses[row][i].color = this.grasses[row][i+1].color;
				this.grasses[row][i].spawn = this.grasses[row][i+1].spawn;
				this.grasses[row][i].extra = this.grasses[row][i+1].extra;
    		}
			this.grasses[row][this.x-1].color = tempColor;
			this.grasses[row][this.x-1].spawn = tempSpawn;
			this.grasses[row][this.x-1].extra = tempExtra;
			//resolve position
			for(var i = 0; i < this.x; i++) {
				this.grasses[row][i].x = i*this.space+this.offset;
			}
    		//this.grasses[row][this.x-1].color = tempColor;
			
			console.log("FINISH");
			return true;
		}
    	return false;
    }
    
    //shift column
    shiftColumn(column, direction) {
    	if(direction) {
    		if(this.shiftDown(column)) {
				//this.turnsDecrement();
				//testGrid.grassSpawn();
				return true;
			}
    	}
    	else {
    		if(this.shiftUp(column)) {
				//this.turnsDecrement();
				//testGrid.grassSpawn();
				return true;
			}
    	}
		return false;
    }
    //Separate implementation for each direction, to be replaced by single function
    shiftDown(column) {
		var tempColor;
		var tempSpawn;
		var tempExtra;
    	//var printX = this.grasses[0][column].x;
    	for(var j = 0; j < this.y; j++) {
			this.grasses[j][column].y += this.stepSize;
		}
    	//console.log("shiftRow: ", printX, this.grasses[0][column].x);
    	//if grass halfway to next cell, shift back by cell size, shift colors to right
    	//gives the illusion of rotating row without actually moving the grass

		if(this.grasses[this.y-1][column].y >= (this.y-.5)*this.space+this.offset) {
			this.grasses[this.y-1][column].y = this.grasses[0][column].y - this.space;
		}
		if(this.grasses[0][column].y >= this.space+this.offset) {
			//resolve color
    		tempColor = this.grasses[this.y-1][column].color;
			tempSpawn = this.grasses[this.y-1][column].spawn;
			tempExtra = this.grasses[this.y-1][column].extra
    		for(var j = this.y-1; j > 0; j--) {
	    		this.grasses[j][column].color = this.grasses[j-1][column].color;
				this.grasses[j][column].spawn = this.grasses[j-1][column].spawn;
				this.grasses[j][column].extra = this.grasses[j-1][column].extra;
    		}
			this.grasses[0][column].color = tempColor;
			this.grasses[0][column].spawn = tempSpawn;
			this.grasses[0][column].extra = tempExtra;
			//resolve position
			for(var j = 0; j < this.y; j++) {
				this.grasses[j][column].y = j*this.space+this.offset;
			}
    		//this.grasses[this.y-1][column].color = tempColor;
			
			console.log("FINISH");
			return true;
		}
    	return false;
    }
    shiftUp(column) {
    	var tempColor;
		var tempSpawn;
		var tempExtra;
		//move each grass up
		for(var j = 0; j < this.y; j++) {
    		this.grasses[j][column].y -= this.stepSize;
		}
		//move the top grass to the bottom to make it look like rotation
		if(this.grasses[0][column].y <= (-this.space+this.offset)*.5) {
			this.grasses[0][column].y = this.grasses[this.y-1][column].y + this.space;
			//console.log("1st if", this.grasses[0][column].y);
		}
		//if target position is reached, shift colors to above grass, then reset position
		//return true
		if(this.grasses[1][column].y <= this.offset) {
			//move colors and spawn status to above grass
    		tempColor = this.grasses[0][column].color;
			tempSpawn = this.grasses[0][column].spawn;
			tempExtra = this.grasses[0][column].extra;
    		for(var j = 0; j < this.y-1; j++) {
	    		this.grasses[j][column].color = this.grasses[j+1][column].color;
				this.grasses[j][column].spawn = this.grasses[j+1][column].spawn;
				this.grasses[j][column].extra = this.grasses[j+1][column].extra;
    		}
			this.grasses[this.y-1][column].color = tempColor;
			this.grasses[this.y-1][column].spawn = tempSpawn;
			this.grasses[this.y-1][column].extra = tempExtra;
			//reset position to realign with grid
			for(var j = 0; j < this.y; j++) {
				this.grasses[j][column].y = j*this.space+this.offset;
			}
			
			//console.log("FINISH");
			return true;
		}		
    	return false;
    }
    
	//*WOLF FUNCTIONS */
	wolfSet(x, y, id) {
		this.wolvesX[id] = x;
		this.wolvesY[id] = y;
		this.wolves[id].setCoord(x*this.space+this.offset, y*this.space+this.offset);
	}
	wolfMove(i) {
		//var destX = x*this.space+this.offset;
		//var destY = y*this.space+this.offset;
		var destX = this.coordFromGrid(this.wolvesX[i]);
		var destY = this.coordFromGrid(this.wolvesY[i]);
		if(this.wolves[i].spawn === this.wolfStateSpawning-1) {
			return this.wolves[i].spawningAnimation();
		}
		if(this.wolves[i].moveTo(destX, destY, this.stepSize)){
			//this.wolfSet(x, y, 1);
			return true;
		}
		this.wolves[i].walkingAnimation();
		//console.log("Cow position: ", this.cow.x, this.cow.y);
		return false;
	}
	wolfTrackMove() {
		if(this.wolvesActive > 0) {
			var selection = Math.floor((Math.random() * 10000)); // %100.00
			for(var i = 0; i < 9; i++) {
				this.wolfTrack[i] = this.wolfTrack[i+1];
			}
			//this.wolfTrack[9] = Math.floor(Math.random()*4);
			console.log(selection);
			var pTotal = 0;
			this.wolfTrack[9] = 0;
			for(var i = 0; i < this.trackPercent.length; i++) {
			//for(var i = 0; i < 3; i++) {
				pTotal += this.trackPercent[i];
				if(selection < pTotal) {
					this.wolfTrack[9] = i+1;
					break;
				}
			}
			/*
			if(selection < this.trackPercent[0]) {
				this.wolfTrack[9] = selection % 2 + 1;
			}
			else if(selection < this.trackPercent[1] + this.trackPercent[0]) {
				this.wolfTrack[9] = 3;
			}
			else {
				this.wolfTrack[9] = 0;
			}
			*/
		}
	}
	wolfSpawn(wolfIn) {
		var collision = false;
		var checkX = [-1, 10, -1, 10];
		var checkY = [-1, -1, 10, 10];
		var checkCorner = [0,0,0,0];
		//First check if corners are available
		for(var i = 0; i < this.wolvesActive; i++) {
			for(var j = 0; j < 4; j++) {
				checkCorner[j] += (this.wolvesX[i] === checkX[j]) & (this.wolvesY[i] === checkY[j]);
			}
		}
		if(checkCorner[0] + checkCorner[1] + checkCorner[2] + checkCorner[3] === 4) {
			this.wolves[wolfIn].spawn = this.wolfStateSpawning;
			return;
		}
		//Spawn in
		//for(var i = 0; i < this.wolvesActive; i++) {
			var i = wolfIn;
			do{
				collision = false;
				//spawn in a corner (-1, -1), (10, 10)
				//if(this.wolves[i].spawning() === this.wolfStateSpawning-1){
					this.wolvesX[i] = -1 + (11 * Math.floor(Math.random()*2));
					this.wolvesY[i] = -1 + (11 * Math.floor(Math.random()*2));
					this.wolfSet(this.wolvesX[i], this.wolvesY[i], i);
					console.log(this.wolvesX[i], this.wolvesY[i], i);
				//}
				//check if other wolves occupy corner
				//mark now occupied corner
				for(var j = 0; j < 4; j++) {
					if((this.wolvesX[i] === checkX[j]) && (this.wolvesY[i] === checkY[j]) && (checkCorner[j] > 0)) {
						collision = true;
						this.wolvesX[i] = 0;
						this.wolvesY[i] = 0;
						this.wolfSet(0, 0, i);
					}
					//checkCorner[j] = (this.wolvesX[i] === checkX[j]) & (this.wolvesY[i] === checkY[j]);
				}
				/*
				for(var j = 0; j < this.wolvesActive; j++) {
					if((this.wolvesX[i] === this.wolvesX[j]) && (this.wolvesY[i] === this.wolvesY[j]) && (i != j)) {
						collision = true;
					}
				}
				*/
				//exit out if all corners now occupied
				if(checkCorner[0] + checkCorner[1] + checkCorner[2] + checkCorner[3] === 4) {
					return;
				}
			} while(collision)
		//}
	}
	wolfShot() {
		var done = 0;
		for(var i = 0; i < this.wolvesActive; i++) {
			if(this.wolves[i].spawn === this.wolfStateDead) {
				console.log("WOLF SHOT", i);
				done += this.wolves[i].dyingAnimation();
				if(done > 0) {
					this.score += this.scoreMultiplier;
					this.wolvesX[i] = 20;
					this.wolvesY[i] = 20; 
				}
				console.log("done", done, i);
			}
		}
		return done;
	}
	wolfChase(i) {
		var dx = 0, dy = 0;
		var collision = false;
		switch(this.wolfTrack[0]) {
		//switch(Math.floor(Math.random()*2) + 1) {
		//switch(1) {
			case 1: //LR
				if(this.wolvesX[i] < this.cowX) {
					dx = 1;
				}
				else if(this.wolvesX[i] > this.cowX) {
					dx = -1;
				}
				break;
			case 2: //UD
				if(this.wolvesY[i] < this.cowY) {
					dy = 1;
				}
				else if(this.wolvesY[i] > this.cowY) {
					dy = -1;
				}
				break;
		}
		console.log("dx dy", dx, dy);
		//check if other wolves occupy corner
		for(var j = 0; j < this.wolvesActive; j++) {
			if((this.wolvesX[i] + dx === this.wolvesX[j]) && (this.wolvesY[i] + dy === this.wolvesY[j]) && (i != j)) {
				collision = true;
			}
		}
		if(!collision) {
			this.wolvesX[i] += dx;
			this.wolvesY[i] += dy;
		}
		//return this.wolfMove(this.wolvesX[i] + dx, this.wolvesY[i] + dy, i);
		//direction
		//collision
	}
	wolvesMove() {
		//var doneMoving = true;
		var doneMoving = [];
		var total = true;
		for(var i = 0; i < this.wolvesActive; i++) {
			doneMoving.push(true);
		}
		for(var i = 0; i < this.wolvesActive; i++) {
			doneMoving[i] = this.wolfMove(i);
			if(doneMoving[i]) {
				this.wolves[i].stopAnimation();
			}
			//doneMoving = doneMoving && this.wolfMove(i);
		}
		for(var i = 0; i < this.wolvesActive; i++) {
			total = total & doneMoving[i];
		}
		return total;
	}
	wolvesActivate() {
		var notActive = true;
		var collision = false;
		if((this.wolfTrack[0] === 1) || (this.wolfTrack[0] === 2)) {
			for(var i = 0; i < this.wolvesActive; i++) {
				switch(this.wolves[i].spawning()) {
					case this.wolfStateSpawning-1: //place on grid
						/*
							do{
								collision = false;
								//spawn in a corner (-1, -1), (10, 10)
								//if(this.wolves[i].spawn === 1){
									this.wolvesX[i] = -1 + (11 * Math.floor(Math.random()*2));
									this.wolvesY[i] = -1 + (11 * Math.floor(Math.random()*2));
									this.wolfSet(this.wolvesX[i], this.wolvesY[i], i);
								//}
								//check if other wolves occupy corner
								for(var j = 0; j < this.wolvesActive; j++) {
									if((this.wolvesX[i] === this.wolvesX[j]) && (this.wolvesY[i] === this.wolvesY[j]) && (i != j)) {
										collision = true;
									}
								}
							} while(collision)
							*/
						this.wolfSpawn(i);
						break;
					case this.wolfStateActive: //movement
						//notActive = notActive && this.wolfChase(i);
						this.wolfChase(i);
						break;
				}
			}
		}
		//return notActive;
	}
	wolfEating() {
		for(var i = 0; i < this.wolvesActive; i++) {
			if((this.cowX === this.wolvesX[i]) && (this.cowY === this.wolvesY[i])) {
				this.wolves[i].eatingAnimation();
			}
		}
	}
	wolvesStopAnimation(w = -1) {
		if(w > -1) {
			this.wolves[w].stopAnimation();
		}
		else {
			for(var i = 0; i < this.wolvesActive; i++) {
				this.wolves[i].stopAnimation();
			}
		}
	}
	//*SCORE FUNCTIONS */
    //Depth-First Search
    markGrass(x, y) {
		if(this.grasses[y][x].spawn === 0){
			this.grasses[y][x].x = -3;
			this.grasses[y][x].stopAnimation();
			//TESTING SCORE
			//this.score += 1;
			this.grassEaten += 1;
			console.log("current", x, y, this.grasses[y][x].x, this.grasses[y][x].spawn);
			var target;
			if(this.grasses[y][x].getExtra() != 1) {
				if(y > 0) { //up
					console.log("up", x, y-1, this.grasses[y-1][x].color, this.grasses[y-1][x].spawn);
					if((this.grasses[y][x].color === this.grasses[y-1][x].color) && (this.grasses[y][x].spawn === this.grasses[y-1][x].spawn) && (this.grasses[y-1][x].x != -3)) {
						this.markGrass(x, y-1);
					}
				}
				if(y < this.y-1) { //down
					console.log("down", x, y+1, this.grasses[y+1][x].color, this.grasses[y+1][x].spawn);
					if((this.grasses[y][x].color === this.grasses[y+1][x].color) && (this.grasses[y][x].spawn === this.grasses[y+1][x].spawn) && (this.grasses[y+1][x].x != -3)) {
						this.markGrass(x, y+1);
					}
				}
				if(x > 0) { //left
					console.log("left", x-1, y, this.grasses[y][x-1].color, this.grasses[y][x-1].spawn);
					if((this.grasses[y][x].color === this.grasses[y][x-1].color) && (this.grasses[y][x].spawn === this.grasses[y][x-1].spawn) && (this.grasses[y][x-1].x != -3)) {
						this.markGrass(x-1, y);
					}
				}
				if(x < this.x-1) { //right
					console.log("right", x+1, y, this.grasses[y][x+1].color, this.grasses[y][x+1].spawn);
					if((this.grasses[y][x].color === this.grasses[y][x+1].color) && (this.grasses[y][x].spawn === this.grasses[y][x+1].spawn) && (this.grasses[y][x+1].x != -3)) {
						this.markGrass(x+1, y);
					}
				}
			}
			else {
				this.snakesActive -= 1;
			}
			//this.grasses[y][x].setColor(4);
			this.grasses[y][x].eaten(Math.floor(Math.random()*100*this.grassesActive)%this.grassesActive); //SET COLOR HERE
			this.grasses[y][x].x = x*this.space+this.offset;
			//this.grasses[y][x].setColor(0);
			console.log("end", x, y, this.grasses[y][x].x, this.grasses[y][x].spawn);
			return true;
		}
		else {
			return false;
		}
	}
	markResolve() {
		var earned = 0;
		//this.score += this.grassEaten * this.scoreMultiplier;
		for(var i = 0; i <= this.grassEaten; i++) {
			earned += i;
		}
		this.score += earned * this.scoreMultiplier;
		if(this.score > this.hiscore) {
			this.hiscore = this.score;
		}
		this.turnsLeft += this.grassEaten * this.turnsMultiplier;// * this.turnsMultiplier;
		if(this.turnsLeft > 40) {
			this.turnsLeft = 40;
		}
		this.scoreMultiplier += this.grassEaten;
		if(this.scoreMultiplier > 99) {
			this.scoreMultiplier = 99;
		}
		//this.grassEaten = 0;
	}

	turnsIncrement(turnsIncrease = 1) {
		this.turnsLeft += turnsIncrease;
	}

	turnsDecrement(turnsReduce = 1) {
		//decrement without bringing up GAME OVER
		if(turnsReduce < 0) {
			this.turnsLeft -= -turnsReduce;
			return false;
		}
		this.turnsLeft -= turnsReduce;
		if(this.turnsLeft < 1) {
			console.log("GAME OVER");
			this.turnsLeft = 0;
			return true;
		}
		return false;
	}

	manageDifficultyOld(){
		if(this.score > this.scoreThreshold[this.difficulty]) {
			if(this.difficulty < this.scoreThreshold.length - 1) {
				this.difficulty += 1;
			}
		}
		switch (this.difficulty) {
			case 0:
				this.grassesActive = 1;
				break;
			case 1:
				this.grassesActive = 2;
				break;
			case 2:
				this.grassesActive = 3;
				break;
			case 3:
				this.grassesActive = 4;
				break;
			case 4:
				this.scoreMultiplier = 2;
				this.wolvesActive = 1;
				this.wolvesMovePercent = 500;
				this.gunAmmoPercent = 100;
				break;
			case 5:
				this.wolvesActive = 2;
				break;
			case 6:
				this.wolvesMovePercent = 2500;
				this.gunAmmoPercent = 1000;
				this.grassesActive = 6;
				this.scoreMultiplier = 3;
				break;						
			case 7:
				this.wolvesActive = 3;
				break;
			case 8:
				this.grassesActive = 7;
				break;
			case 9:
				this.wolvesActive = 4;
				break;
			case 10:
				this.grassesActive = 8;
				this.scoreMultiplier = 4;
				this.wolvesMovePercent = 5000;
				this.gunAmmoPercent = 1000;
				break;
			default:
				break;	
		}
	}
	manageDifficulty() {
		//WOLVES
		/*
		var wolfThreshold = 500*this.wolvesActive;
		if(this.score > wolfThreshold) {
			this.wolvesActive += 1;
		}
		*/
		var wolfThreshold = 500; //every this amount of point, wolves increase
		this.wolvesActive = Math.floor(this.score/wolfThreshold);
		if(this.wolvesActive > this.wolvesMax) {
			this.wolvesActive = this.wolvesMax;
		}
		this.trackPercent[0] = 1500 + Math.floor(this.score - wolfThreshold*this.wolvesActive)*10;
		if(this.trackPercent[0] > 3000) {
			this.trackPercent[0] = 3000;
		}
		this.trackPercent[1] = this.trackPercent[0];
		//AMMO
		this.trackPercent[2] = 500 + 125 * this.wolvesActive;
		//SNAKES
		this.trackPercent[3] = 1500;

		//GRASS
		this.grassesActive = 4 + Math.floor(this.score/300);
		if(this.grassesActive > 8) {
			this.grassesActive = 8;
		}

		//MULTIPLIERS
		//this.scoreMultiplier = 1 + this.wolvesActive * this.grassesActive;
		if((this.scoreMultiplier > 1) && (this.grassEaten === 0)){
			this.scoreMultiplier -= 1;
		}
		this.grassEaten = 0;
		//this.turnsMultiplier = Math.ceil((this.wolvesActive/2 + this.grassesActive/4));
		this.turnsMultiplier = this.shells;
	}
}
