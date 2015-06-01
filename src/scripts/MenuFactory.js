 define(function() {
    
    var _game = null;
    
//Argument Vision
    var Menu = function(game) {
        Phaser.Sprite.call(this, game, 0, 504, 'menuBlack');
	game.physics.arcade.enable(this);
        this.body.immovable = true;
   }
    
    Menu.prototype = Object.create(Phaser.Sprite.prototype);
    Menu.prototype.constructor = Menu;
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('menuBlack', 'src/media/img/simpleMenu.png');
			
        },
        
        create : function() {
	        return (new Menu(_game));
        }
    }
 })	
