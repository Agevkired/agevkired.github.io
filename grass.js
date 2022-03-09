class grass extends sprite{
    constructor(x, y) {
    //constructor() {
        super(x, y);
        this.spriteSet = 5;
        this.color = 0;
        this.spawn = 0;
        this.explosion = [0, 1, 2, 3, 4, 5, 6];
    }
    //run at start, set random when eaten, maybe when new gameplay changes occur
    setColor(c) {
        this.color = c;
    }
    //set color using grid
    eaten(color = -1) {
        if(color != -1) {
            this.setColor(color);
        }
        this.spawn = 5;
    }
    //decrement spawn
    spawning() {
        if(this.spawn > 0) {
            this.spawn -= 1;
        }
        if(this.spawn === 4) {
            this.stopAnimation(this.explosion.length);
        }
    }
    //set position
    setCoord(x, y) {
        this.x = x;
        this.y = y;
    }

    explodingAnimation() {
        //console.log("called");
        var tmp;
        tmp = this.animate(this.explosion, 1, 0, 0);
        console.log("explode", tmp, this.currentFrame);
        return tmp;
    }
}