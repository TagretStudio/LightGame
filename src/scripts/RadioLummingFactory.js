define(['LummingFactory'], function(LummingFactory) {

    var _game = null;

    var RadioLumming = function(game, x, y, vitesseX) {
	this.sprite = 'src/media/img/lumming_radio';
	LummingFactory.Lumming.call(this, game, 'lumming_radio', x, y, vitesseX, 'low');
    }

    RadioLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    RadioLumming.prototype.constructor = RadioLumming;

    return {
        init: function(game) {
            _game = game;
            LummingFactory.init(_game);
	    _game.load.spritesheet('lumming_radio', 'src/media/img/lumming_radio.png', 32, 32, 16);
	},

	create: function(x, y, vitesseX, visibleLevel) {
            return (new RadioLumming(_game, x, y, vitesseX));
        }
    }
})
