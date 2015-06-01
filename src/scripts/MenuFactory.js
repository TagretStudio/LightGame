 define(function() {
    
    var _game = null;
    
    var Menu = function(game, /*vision*/) {
        Phaser.Sprite.call(this, game, 0, 504, 'menu');
	//game.physics.arcade.enable(this);
        this.body.immovable = true;
   }
    
    Menu.prototype = Object.create(Phaser.Sprite.prototype);
    Menu.prototype.constructor = Menu;
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('menu', 'src/media/img/simpleMenu.png');
			
        },
        
        create : function(/*vision*/) {
	        return (new Menu(_game, /*vision*/));
        }
    }
 })	
