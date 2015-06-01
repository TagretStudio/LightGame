 define(function() {
    
    var _game = null;
    
//Argument Vision
    var Menu = function(game) {
        game.add.sprite(0, 504, 'menuB');
        game.add.sprite(128, 536, 'red');
        game.add.sprite(170, 536, 'green');      
        game.add.sprite(210, 536, 'blue');
	//game.physics.arcade.enable(this);
        //this.body.immovable = true;
   }
    
    Menu.prototype = Object.create(Phaser.Sprite.prototype);
    Menu.prototype.constructor = Menu;
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('menuB', 'src/media/img/simpleMenu.png');
            _game.load.image('red', 'src/media/img/filterRedMenu.png');
            _game.load.image('green', 'src/media/img/filterGreenMenu.png');
            _game.load.image('blue', 'src/media/img/filterBlueMenu.png');
			
        },
        
        create : function() {
	        return (new Menu(_game));
        }
    }
 })	
