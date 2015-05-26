define(['Lumming'], function(Lumming) {

    var _game = null;

    var Lumming2 = function(game, color, x, y, vitesseX) {
        this.spriteName = 'lumming_' + color.name;
        this.sprite = 'src/media/img/' + spriteName +'.png';
        _game.load.spritesheet(spriteName, this.sprite, 32, 32, 16);
        Lumming.objet().call(this, game, spriteName, x, y, vitesseX);
    }

    Lumming2.prototype = Object.create(Lumming.objet().prototype);

    Lumming2.prototype.constructor = Lumming2;

    return {
        init: function(game) {
            _game = game;
            Lumming.init(_game);
        },

        create: function(color, x, y, vitesseX) {
            return (new Lumming2(_game, color, x, y, vitesseX));
        }
    }
})