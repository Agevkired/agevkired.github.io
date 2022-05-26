/*var grassSprites = [];
var wolfSprites = [];
var cowSprites = [];
var explosionSprites = [];*/
var bgTiles;
var bgFenceSky;
var imageAmount = 1;

var cowSprites = 0;
var arrowSprites = 1 * 16;
var grassSprites = 5 * 16;

class images {
	constructor() {
		this.canv = 0;
		this.ctx = 0;

		this.sources = [];
		this.sourcesSize = 0;
		this.queue = [];
		this.queueSize = 0;
		//this.loaded = 0;
		this.scaleFactor = 1;
		this.height = 1;
		this.width = 1;
		this.smoothing = false;
	}

	//Set target canvas
	setCanvas(canvas, w, h) {
		this.canv = canvas;
		this.ctx = this.canv.getContext("2d");
		this.ctx.imageSmoothingEnabled = this.smoothing;
		this.width = w;
		this.height = h;
		this.canv.width = w;
		this.canv.height = h;
	}

	dynamicResize() {
		var dw = Math.floor(window.innerWidth / this.width);
		var dh = Math.floor(window.innerHeight / this.height);
		//console.log("Dynamic Resize:", dw, dh);
		if(dw > dh) {
			this.scaleFactor = dh;
		}
		else {
			this.scaleFactor = dw;
		}
		if((dw === 0) || (dh === 0)) {
			this.scaleFactor = 1;
		}
		if(this.scaleFactor > 1) {
			this.scaleFactor -= 1;
		}
		this.canv.width = this.width * this.scaleFactor;
		this.canv.height = this.height * this.scaleFactor;
		this.ctx.imageSmoothingEnabled = this.smoothing;

		//this.ctx.scale(this.scaleFactor, this.scaleFactor);
		//this.scaleFactor = 1;
	}
	
	//Manage image sources
	addSource(source) {
		var lim = 0;
		this.sources[this.sourcesSize] = new Image();
		/*
		this.sources[this.sourcesSize].onload = function() {
			this.loaded = 1;
			console.log("image loaded");//, typeof(this.loaded));
		}
		*/
		this.sources[this.sourcesSize].src = source;
		console.log("image load complete", this.sources[this.sourcesSize].complete);
		console.log("naturalHeight", this.sources[this.sourcesSize].naturalHeight);
		//while((loaded < 1 )||( lim < 500)) {
		/*while(lim < 10) {
			console.log("loop", this.loaded, this.sources[this.sourcesSize].complete, this.sources[this.sourcesSize].naturalHeight);
			lim += 1;
			if(this.sources[this.sourcesSize].complete && this.sources[this.sourcesSize].naturalHeight !== 0) {
				break;
			}
		}*/
		console.log("end function", this.loaded);
		this.sourcesSize += 1;
	}
	checkLoaded() {
		var imagesLoaded = true;
		for(var i = 0; i < this.sources.length; i++) {
			imagesLoaded = imagesLoaded && this.sources[i].complete && this.sources[i].naturalHeight;
		}
		return imagesLoaded;
	}

	//Drawing Functions
	addQueue(sourceID, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight, mirror=0) {
		//       0      1   2     3       4      5   6     7       8        9
		switch(sourceID) {
			case -1:
				this.queue.push([sourceID, sX * this.scaleFactor, sY * this.scaleFactor, sWidth * this.scaleFactor, sHeight * this.scaleFactor, dX, dY, dWidth, dHeight, mirror]);
				break;
			default:
				this.queue.push([sourceID, sX, sY, sWidth, sHeight, dX * this.scaleFactor, dY * this.scaleFactor, dWidth * this.scaleFactor, dHeight * this.scaleFactor, mirror]);
				break;
		}
		this.queueSize += 1;
	}
	clearCanvas() {
		this.ctx.clearRect(0, 0, this.width * this.scaleFactor, this.height * this.scaleFactor);
		//this.ctx.clearRect(0, 0, 400, 300);
		//this.ctx.imageSmoothingEnabled = this.smoothing;
	}
	clearQueue() {
		this.queue = [];
		this.queueSize = 0;
	}
	sortQueue() {
		//sort queue by y-position for painter's algorithm, use dY
	}
	draw() {
		for(var i = 0; i < this.queueSize; i++) {
			//console.log("drawing: ", i, this.queue[i].length);
			switch(this.queue[i][0]) {
				case -1: //rectangle
					var color;
					if(typeof(this.queue[i][6]) == 'string') {
						color = this.queue[i][6];
					}
					else {
						var r = this.queue[i][6];
						var g = this.queue[i][7];
						var b = this.queue[i][8];
						//console.log(this.queue[i]);
						color = "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
						//console.log("color rgb", r, g, b, color);
					}
					this.ctx.beginPath();
					this.ctx.fillStyle = color;
					this.ctx.rect(this.queue[i][1], this.queue[i][2], this.queue[i][3], this.queue[i][4]);
					if(this.queue[i][5] === 1) {
						this.ctx.stroke();
					}
					else {
						this.ctx.fill();
					}
					break;
				default:			
					if(this.queue[i][9] === 1) { //if mirror
						this.ctx.scale(-1, 1);
						//-dX-dWidth
						this.ctx.drawImage(this.sources[this.queue[i][0]], this.queue[i][1], this.queue[i][2], this.queue[i][3], this.queue[i][4], -this.queue[i][5]-this.queue[i][7], this.queue[i][6], this.queue[i][7], this.queue[i][8]);
						this.ctx.setTransform(1, 0, 0, 1, 0, 0);
					}
					else {
						//this.ctx.drawImage(this.sources[this.queue[9*i]], this.queue[9*i+1], this.queue[9*i+2], this.queue[9*i+3], this.queue[9*i+4], this.queue[9*i+5], this.queue[9*i+6], this.queue[9*i+7], this.queue[9*i+8]);
						this.ctx.drawImage(this.sources[this.queue[i][0]], this.queue[i][1], this.queue[i][2], this.queue[i][3], this.queue[i][4], this.queue[i][5], this.queue[i][6], this.queue[i][7], this.queue[i][8]);
					}
					break;
			}
			/*

			*/
		}
	}
	
	//Draw Shapes
	drawRect(x, y, w, h, style = 0, r = 0, g = 0, b = 0) {
		//style 0=fill, 1=stroke
		//console.log("draw rect rgb", r, g, b);
		//             0  1  2  3  4    5    6  7  8  9
		this.addQueue(-1, x, y, w, h, style, r, g, b, 0);
	}
}
/*
var sh = window.innerHeight;
var sw = window.innerWidth;
*/
