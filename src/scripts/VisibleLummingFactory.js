define(['LummingFactory', 'ColorEnum', 'VisionEnum', 'DoorsFactory', 'FilterFactory'],
       function(LummingFactory, ColorEnum, VisionEnum, DoorsFactory, FilterFactory) {

    var _game = null;
    var _vision = null;

    var VisibleLumming = function(game, color, x, y, vitesseX) {
        this.color = color;
        this.spriteName = 'lumming_' + ColorEnum.getName(color);
        LummingFactory.Lumming.call(this, game, this.spriteName, x, y, vitesseX, _vision);
        this.animations.add('kill', [1, 4, 15, 11, 1], 10, true);

    }

    VisibleLumming.prototype = Object.create(LummingFactory.Lumming.prototype);

    VisibleLumming.prototype.constructor = VisibleLumming;

    VisibleLumming.prototype.collideWithDoor = function(door){
        if (this.color == door.color){
          this.body.velocity.x = 0;
          this.animations.play('kill');
          this.kill();
          return 1;
        }
        return 0;
    }
    
    VisibleLumming.prototype.collideWithFilter = function(filter) {
        if (filter.isAdditive()) {
            this.color = this.color | filter.getColorValue();
        } else {
            this.color = this.color & filter.getColorValue();
        }
        if (this.color == 0) {
            this.body.velocity.x = 0;
            this.animations.play('kill');
            this.kill();
        }
    }
    
    VisibleLumming.prototype.update = function() {
        LummingFactory.Lumming.prototype.update.call(this);
    }

    return {
        init: function(game) {
            _game = game;
            _vision = VisionEnum.getVisionEnum().VISIBLE;
            LummingFactory.init(_game);
            _game.load.spritesheet('lumming_blue', 'src/media/img/lumming_blue.png', 32, 32, 32);
            _game.load.spritesheet('lumming_cyan', 'src/media/img/lumming_cyan.png', 32, 32, 32);
            _game.load.spritesheet('lumming_green', 'src/media/img/lumming_green.png', 32, 32, 32);
            _game.load.spritesheet('lumming_magenta', 'src/media/img/lumming_magenta.png', 32, 32, 32);
            _game.load.spritesheet('lumming_red', 'src/media/img/lumming_red.png', 32, 32, 32);
            _game.load.spritesheet('lumming_white', 'src/media/img/lumming_white.png', 32, 32, 32);
            _game.load.spritesheet('lumming_yellow', 'src/media/img/lumming_yellow.png', 32, 32, 32);
        },

        create: function(color, x, y, vitesseX) {
            return (new VisibleLumming(_game, color, x, y, vitesseX, _vision));
        }
    }
})
