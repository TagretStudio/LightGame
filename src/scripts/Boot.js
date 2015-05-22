var BasicGame = {};
var music;
BasicGame.Boot = function (game) {
};
BasicGame.Boot.prototype = {
init: function () {
// Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
this.stage.disableVisibilityChange = true;
if (this.game.device.desktop)
{
// If you have any desktop specific settings, they can go in here
this.scale.pageAlignHorizontally = true;
}
else
{
// Same goes for mobile settings.
// In this case we're saying "scale the game, no lower than 480x260 and no higher than 1024x768"
this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
this.scale.setMinMax(480, 260, 1024, 768);
this.scale.forceLandscape = true;
this.scale.pageAlignHorizontally = true;
}
},
preload: function () {
// Here we load the assets required for our preloader (in this case a background and a loading bar)
this.load.image('preloaderBackground', 'src/media/img/sky.png');
this.load.image('preloaderBackground2', 'src/media/img/skylol.png');
this.load.image('logo', 'src/media/img/Menu.png');
this.load.image('cible', 'src/media/img/cible.png');
this.load.image('tagret', 'src/media/img/tagret_studio.png');
this.load.image('presents', 'src/media/img/Presents.png');
this.load.audio('menu_music', 'src/media/audio/menu_music.ogg');
this.load.audio('game_over_music', 'src/media/audio/Digital_Native.ogg');
this.load.spritesheet('button', 'src/media/img/MenuButtons.png', 274, 71);
},
create: function () {
// By this point the preloader assets have loaded to the cache, we've set the game settings
// So now let's start the real preloader going
this.state.start('Preloader');

}
};
