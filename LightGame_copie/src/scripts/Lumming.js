BasicGame.Lumming = function (name) {
};

BasicGame.Lumming.prototype = {
	
}

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
