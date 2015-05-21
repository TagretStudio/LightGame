
var space;

BasicGame.Preloader = function (game) {
this.background = null;
this.preloadBar = null;
this.ready = false;
};
BasicGame.Preloader.prototype = {
preload: function () {
// These are the assets we loaded in Boot.js
this.background = this.add.sprite(0, 0, 'preloaderBackground');
	this.background.scale.set(1024/800, 768/600);
},


create: function () {
// Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
music = this.add.audio('menu_music');
music.loop = true;
music.play();

},
update: function () {
	if (space.isDown){
		this.state.start('MainMenu');
	}
}
};
