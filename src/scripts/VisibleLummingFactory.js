define(['LummingFactory', 'ColorEnum'], function(LummingFactory, ColorEnum) {

    var _game = null;

    var VisibleLumming = function(game, color, x, y, vitesseX) {
        this.color = color;
        this.spriteName = 'lumming_' + ColorEnum.getName(color);
        LummingFactory.Lumming.call(this, game, this.spriteName, x, y, vitesseX, 'visible');
    }

    VisibleLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    VisibleLumming.prototype.constructor = VisibleLumming;

    return {
        init: function(game) {
            _game = game;
            LummingFactory.init(_game);
            _game.load.spritesheet('lumming_black', 'src/media/img/lumming_black.png', 32, 32, 16);
            _game.load.spritesheet('lumming_blue', 'src/media/img/lumming_blue.png', 32, 32, 16);
            _game.load.spritesheet('lumming_cyan', 'src/media/img/lumming_cyan.png', 32, 32, 16);
            _game.load.spritesheet('lumming_green', 'src/media/img/lumming_green.png', 32, 32, 16);
            _game.load.spritesheet('lumming_magenta', 'src/media/img/lumming_magenta.png', 32, 32, 16);
            _game.load.spritesheet('lumming_red', 'src/media/img/lumming_red.png', 32, 32, 16);
            _game.load.spritesheet('lumming_white', 'src/media/img/lumming_white.png', 32, 32, 16);
            _game.load.spritesheet('lumming_yellow', 'src/media/img/lumming_yellow.png', 32, 32, 16);
        },

        create: function(color, x, y, vitesseX) {
            return (new VisibleLumming(_game, color, x, y, vitesseX));
        }
    }
})
