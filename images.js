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
	}

	//Set target canvas
	setCanvas(canvas) {
		this.canv = canvas;
		this.ctx = this.canv.getContext("2d");
		this.ctx.imageSmoothingEnabled = false;
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
		this.queue.push([sourceID, sX, sY, sWidth, sHeight, dX, dY, dWidth, dHeight, mirror]);
		this.queueSize += 1;
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
			if(this.queue[i][9] === 1) {
				this.ctx.scale(-1, 1);
				//-dX-dWidth
				this.ctx.drawImage(this.sources[this.queue[i][0]], this.queue[i][1], this.queue[i][2], this.queue[i][3], this.queue[i][4], -this.queue[i][5]-this.queue[i][7], this.queue[i][6], this.queue[i][7], this.queue[i][8]);
				this.ctx.setTransform(1, 0, 0, 1, 0, 0);
			}
			else {
				//this.ctx.drawImage(this.sources[this.queue[9*i]], this.queue[9*i+1], this.queue[9*i+2], this.queue[9*i+3], this.queue[9*i+4], this.queue[9*i+5], this.queue[9*i+6], this.queue[9*i+7], this.queue[9*i+8]);
				this.ctx.drawImage(this.sources[this.queue[i][0]], this.queue[i][1], this.queue[i][2], this.queue[i][3], this.queue[i][4], this.queue[i][5], this.queue[i][6], this.queue[i][7], this.queue[i][8]);
			}
		}
	}
	
}
/*
var sh = window.innerHeight;
var sw = window.innerWidth;
*/
