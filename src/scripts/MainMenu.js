BasicGame.MainMenu = function (game){
this.background2 = null;
this.logo = null;

this.buttons = null;
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
	music.loop = false;
	music.stop();
	music = this.add.audio('game_over_music');
	music.loop = true;
	music.play();
	//background
	this.background2 = this.add.sprite(0, 0, 'preloaderBackground');
	this.background2.scale.set(1024/800, 768/600);

	//logo
	this.logo = this.add.sprite(pointLogo.x, pointLogo.y, 'logo');

	// buttons up to down : play, credits, quit
	this.buttons = this.add.group();
	this.buttons.add(this.buttonPlay = this.make.button(Math.round(Math.random()*10)*-5, 400, 'button', actionPlay, this, 2, 1, 0));
	this.buttons.add(this.buttonCredits = this.make.button(Math.round(Math.random()*10)*-5, 450, 'button', actionCredits, this, 2, 1, 0));
	
	},
	
	update: function () {
		this.buttons.forEach(
				function(butt) {
					butt.x += Math.min(30,(pointButtons.x - butt.x)/4);
				}
			    );
	}
};

function actionPlay() {
	this.buttonPlay.kill();
}

function actionCredits() {
	this.buttonCredits.kill();
}
