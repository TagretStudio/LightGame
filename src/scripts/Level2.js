BasicGame.Level2 = function (game){

};

BasicGame.Level2.prototype = {

	preload: function () {
		this.stage.backgroundColor = '85b5e5';
		this.load.image('platform', 'src/media/img/platform.png');
		this.load.spritesheet('lumming', 'src/media/img/lumming_magenta.png', 32, 32);
	    if (music != null && music.isPlaying == true) {
		music.fadeOut(700);
	    }
	    music = this.add.audio('game_over_music');
	    music.loop = true;
	    music.play();

	},

	create: function () {
		var platforms;
		this.physics.startSystem(Phaser.Physics.ARCADE);
		platforms=this.add.group();
		platforms.enableBody = true;
		platforms.create(0, this.world.height - 200, 'platform');
		platforms.create(200, this.world.height - 200, 'platform');
		platforms.setAll('body.immovable', true);
		lums = this.add.group();
		this.physics.arcade.enable(lums);
		lum1 = lums.create(0, this.world.height -300, 'lumming');
		this.physics.arcade.enable(lum1);

		lum1.body.gravity.y = 500;

	//	this.physics.arcade.enable(lum1);
		lum1.animations.add('left', [4, 5, 6, 7], 10, true);
		lum1.animations.add('right', [8, 9, 10, 11], 10, true);
	},

	update: function () {
		lum1.animations.play('right');
	}
};
