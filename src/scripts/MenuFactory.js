 define(function() {
    
    var _game = null;
    
//Argument Vision
    var Menu = function(game) {
        game.add.sprite(0, 504, 'menuB');
	//game.physics.arcade.enable(this);
        //this.body.immovable = true;
   }
    
    Menu.prototype = Object.create(Phaser.Sprite.prototype);
    Menu.prototype.constructor = Menu;
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('menuB', 'src/media/img/simpleMenu.png');
			
        },
        
        create : function() {
	        return (new Menu(_game));
        }
    }
 })	
