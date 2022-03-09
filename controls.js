//0=nothing, 1=press, 2=held, 3=released

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

var inputKeys = [];
var inputPushed = [];

//Use event.key codes
function inputSet(k) {
	inputKeys.push(k);
	inputPushed.push(0);
}

function inputHeldReleased() {
	for(var i = 0; i < inputKeys.length; i++) {
		/*
		if(inputPushed[i] > 0) {
			//console.log(inputKeys[i], "held", inputPushed[i]);
			inputPushed[i] += 1;
		}
		else if(inputPushed[i] < 0) {
			//console.log(inputKeys[i], "released", inputPushed[i]);
			inputPushed[i] += 1;
		}
		*/
		if(inputPushed[i] != 0) {
			if(inputPushed[i] > 0) {
				console.log(inputKeys[i], "held", inputPushed[i]);
			}
			else if(inputPushed[i] < 0) {
				console.log(inputKeys[i], "released", inputPushed[i]);
			}
			inputPushed[i] += 1;
		}
	}
}

function inputClear() {
	for(var i = 0; i < inputKeys.length; i++) {
		inputPushed[i] = 0;
	}
}

function keyDownHandler(e) {
	for(var i = 0; i < inputKeys.length; i++) {
		if(e.key == inputKeys[i]) {
			if(inputPushed[i] < 1) {
				inputPushed[i] += 1;
			}
		}
	}
}

function keyUpHandler(e) {
	for(var i = 0; i < inputKeys.length; i++) {
		if(e.key == inputKeys[i]) {
			inputPushed[i] = -1;
		}
	}
}

/*
var inputClearKeys = setInterval(function(){
	//console.log("keys cleared");
	for(var i = 0; i < inputKeys.length; i++) {
		if(inputPushed[i] < 0) {
			inputPushed[i] = 0;
		}
	}
}, 1000);
*/