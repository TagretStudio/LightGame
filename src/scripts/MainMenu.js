BasicGame.MainMenu = function (game){
this.background2 = null;
this.logo = null;

this.buttonPlay = null;
this.buttonCredits = null;
this.buttonQuit = null;
};

BasicGame.MainMenu.prototype = {

	preload: function (){
		pointLogo = new Phaser.Point(300, 300);
		pointButtons = new Phaser.Point(300, 200);

	},

	create: function (){
	//background
	this.background2 = this.add.sprite(0, 0, 'preloaderBackground');
	this.background2.scale.set(1024/800, 768/600);

	//logo
	this.logo = this.add.sprite(pointLogo.x, pointLogo.y, 'logo');

	// buttons up to down : play, credits, quit
	// button = game.add.button(pointButtons, 400, 'button', actionOnClick, this, 2, 1, 0);

	},

	update: function (){

	}
};

