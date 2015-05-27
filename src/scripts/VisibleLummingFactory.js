define(['LummingFactory'], function(LummingFactory) {

    var _game = null;

    var VisibleLumming = function(game, color, x, y, vitesseX) {
        this.spriteName = 'lumming_' + color;//color.name;
        this.sprite = 'src/media/img/' + this.spriteName +'.png';
        LummingFactory.Lumming.call(this, game, this.spriteName, x, y, vitesseX);
    }

    VisibleLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    VisibleLumming.prototype.constructor = VisibleLumming;

    return {
        init: function(game) {
            _game = game;
            LummingFactory.init(_game);
            _game.load.spritesheet('lumming_blue', 'src/media/img/lumming_blue.png', 32, 32, 16);
            _game.load.spritesheet('lumming_red', 'src/media/img/lumming_red.png', 32, 32, 16);


        },

        create: function(color, x, y, vitesseX) {
            return (new VisibleLumming(_game, color, x, y, vitesseX));
        }
    }
})
