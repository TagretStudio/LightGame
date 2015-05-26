define(['Lumming'], function(Lumming) {

    var _game = null;

    var Lumming2 = function(game, color, x, y, vitesseX) {
        this.spriteName = 'lumming_' + color;//color.name;
        this.sprite = 'src/media/img/' + this.spriteName +'.png';
        Lumming.objet().call(this, game, this.spriteName, x, y, vitesseX);
    }

    Lumming2.prototype = Object.create(Lumming.objet().prototype);

    Lumming2.prototype.constructor = Lumming2;

    return {
        init: function(game) {
            _game = game;
            Lumming.init(_game);
            _game.load.spritesheet('lumming_blue', 'src/media/img/lumming_blue.png', 32, 32, 16);
            _game.load.spritesheet('lumming_red', 'src/media/img/lumming_red.png', 32, 32, 16);


        },

        create: function(color, x, y, vitesseX) {
            return (new Lumming2(_game, color, x, y, vitesseX));
        }
    }
})
