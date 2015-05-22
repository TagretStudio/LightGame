BasicGame.Lumming = function(name) {
	this.sprite = null;
	this.direction = null;
};

BasicGame.Lumming.prototype = {
	
	preload: function(sprite) {
		this.load.spritesheet('lumming', sprite, 32, 32);
	},
	
	create: function(x, y) {
		lum = this.add.sprite(x, y, 'lumming');
		this.physics.arcade.enable(lum);
		lum.body.collideWorldBounds = true;
		lum.body.gravity.y = 500;
	},
	
	update: function() {
		lum.animations.play(direction);
	}
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
