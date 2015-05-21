
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
},


create: function () {
// Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

},
update: function () {
	if (space.isDown){
		this.state.start('MainMenu');
	}
}
};
