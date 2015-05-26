define(['Lumming'], function(Lumming) {

    var _game = null;

    var Lumming2 = function(game, color, x, y, vitesseX) {
        Lumming.objet().call(this, game, color, x, y, vitesseX);
    }

    Lumming2.prototype = Object.create(Lumming.objet().prototype);

    Lumming2.prototype.constructor = Lumming2;

    return {
        init: function(game) {
            _game = game;
            _game.load.spritesheet('lumming_red', 'src/media/img/lumming_red.png', 32, 32, 16);
            Lumming.init(_game);
        },

        create: function(color, x, y, vitesseX) {
            return (new Lumming2(_game, color, x, y, vitesseX));
        }
    }
})