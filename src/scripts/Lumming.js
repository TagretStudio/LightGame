var ColorEnum = Object.freeze({
	WHITE: 0,
	RED: 1,
	GREEN: 2,
	BLUE: 3,
	MAGENTA: 4,
	YELLOW: 5,
	CYAN: 6,
	BLACK: 7,
	properties: {
		0: {name: "white", value: 0xffffff},
		1: {name: "red", value: 0xff0000},
		2: {name: "green", value: 0x00ff00},
		3: {name: "blue", value: 0x0000ff},
		4: {name: "magenta", value: 0xff00ff},
		5: {name: "yellow", value: 0xffff00},
		6: {name: "cyan", value: 0x00ffff},
		7: {name: "black", value: 0x000000},
	}
});

function Lumming(name) {
};

function VisibleLumming(color) {
	this.color = color;
};
VisibleLumming.prototype = new Lumming;

function LowFreqLumming() {
};
LowFreqLumming.prototype = new Lumming;

function RadioLumming() {
};
RadioLumming.prototype = new LowFreqLumming;

function MicroLumming() {
};
MicroLumming.prototype = new LowFreqLumming;

function HighFreqLumming() {
};
HighFreqLumming.prototype = new Lumming;

function XRayLumming() {
};
XRayLumming.prototype = new HighFreqLumming;

function GammaLumming() {
};
GammaLumming.prototype = new HighFreqLumming;