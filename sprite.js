var spriteAnimationLoop = 1;
var spriteAnimationEnd = 2;

class sprite {
    constructor(x = 0, y = 0, sx = 0, sy = 0) {
        //coordinates
        this.x = x;
        this.y = y;
        //image selection
        this.spriteSet = 0;
		this.spriteNumber = 0;
		this.mirror = 0;
        //sprite size
        this.sx = sx;
        this.sy = sy;
        //animation
        this.currentFrame = 0;
		this.animationDelayCounter = 0;
        this.loopCounter = 0;
    }
    setCoord(x, y) {
		this.x = x;
		this.y = y;
	}
	//returns 1 if animation ended, 2 if looped specified amount
    animate(animation, animationDelay = 0, loopFrame = 0, loopAmount = -1) { //higher animationDelay is slower, every x frame
        var isLastFrame = 0;
		//console.log("BEFORE currentframe", this.currentFrame, "spritenumber", this.spriteNumber, "animation length", animation.length);
		//console.log("isLastFrame", isLastFrame, "loopcounter", this.loopCounter, "loopamount", loopAmount);
		if(this.animationDelayCounter >= animationDelay) {
			this.currentFrame += 1;
			if((this.currentFrame === animation.length)) {// && ((loopAmount === -1) || (this.loopCounter < loopAmount))){
				this.currentFrame = loopFrame;
				this.loopCounter += 1;
				isLastFrame += 1;
				//console.log("First If");
			}
            if((loopAmount > -1) && (this.loopCounter > loopAmount)) {
                isLastFrame += 1;
				this.currentFrame = animation.length-1;
				//console.log("Second If");
            }
			this.animationDelayCounter = 0;
		}
		else {
			this.animationDelayCounter += 1;
		}
        this.spriteNumber = animation[this.currentFrame];
        //console.log("AFTER currentframe", this.currentFrame, "spritenumber", this.spriteNumber, "animation length", animation.length);
		//console.log("isLastFrame", isLastFrame, "loopcounter", this.loopCounter, "loopamount", loopAmount);
        return isLastFrame;
	}
    stopAnimation(frame = 0) {
		this.spriteNumber = frame;
		this.currentFrame = 0;
		this.animationDelayCounter = 0;
		this.loopCounter = 0;
	}

    move1d(start, end, speed) {
		var distance = end - start;
		var current = start;
		if(distance != 0) {
			distance = distance/Math.abs(distance);
			current += distance * speed;
			if((current > end) && (distance === 1)) {
				current = end;
			}
			else if((current < end) && (distance === -1)){
				current = end;
			}
		}
		return current;
	}
	moveTo(x, y, speed) {
		if(this.x < x) {
			this.mirror = 0;
		}
		else if(this.x > x) {
			this.mirror = 1;
			//console.log("mirror");
		}
		this.x = this.move1d(this.x, x, speed);
		this.y = this.move1d(this.y, y, speed);
		//this.walkingAnimation();
		//this.animate(this.walking, 1);
		//console.log("x, y, speed, currentframe", this.x, this.y, speed, this.currentFrame);
		if((this.x === x) && (this.y === y)) {
			this.spriteNumber = 0;
			return true;
		}
		return false;
	}
}