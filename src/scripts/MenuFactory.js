 define(['VisionEnum'], function(VisionEnum) {
    
    var _game = null;
    
//Argument Vision
    var Menu = function(game, vision) {

       game.add.sprite(0, 504, 'menuB');
        if (vision == 3) {
            //infra

            //plomb
            game.add.sprite(470, 536, 'plombCarre');
            game.add.sprite(510, 536, 'plombVertical');      
            game.add.sprite(550, 536, 'plombHorizontal');

            //mirroirs
            game.add.sprite(660, 536, 'mirroirO');
            game.add.sprite(700, 536, 'mirroirV');
        } else if(vision == 2) {
            //visibles
        
            game.add.sprite(230, 536, 'red');
            game.add.sprite(270, 536, 'green');      
            game.add.sprite(310, 536, 'blue');

            game.add.sprite(470, 536, 'magenta');
            game.add.sprite(510, 536, 'cyan');      
            game.add.sprite(550, 536, 'yellow');

            game.add.sprite(660, 536, 'mirroirH');
            game.add.sprite(700, 536, 'mirroirV');      
        }else if(vision == 1){

            //supra

            //antenes
            game.add.sprite(270, 536, 'aerialLeft');
            game.add.sprite(310, 536, 'aerialRight');  

            //mirroirs
            game.add.sprite(660, 536, 'mirroirH');
            game.add.sprite(700, 536, 'mirroirV');    
        }
       



	//game.physics.arcade.enable(this);
        //this.body.immovable = true;
   }
    
    Menu.prototype = Object.create(Phaser.Sprite.prototype);
    Menu.prototype.constructor = Menu;
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('menuB', 'src/media/img/simpleMenu.png');

            //filtres aditifs
            _game.load.image('red', 'src/media/img/filterRedMenu.png');
            _game.load.image('green', 'src/media/img/filterGreenMenu.png');
            _game.load.image('blue', 'src/media/img/filterBlueMenu.png');

            //filtres sustractifs
            _game.load.image('magenta', 'src/media/img/filterMagentaMenu.png');
            _game.load.image('cyan', 'src/media/img/filterCyanMenu.png');
            _game.load.image('yellow', 'src/media/img/filterYellowMenu.png');

            //mirroirs
            _game.load.image('mirroirV', 'src/media/img/mirroirVertical.png');
            _game.load.image('mirroirH', 'src/media/img/mirroirOrizontal.png');

            //antenes
            _game.load.image('aerialLeft', 'src/media/img/aerialLeft.png');
            _game.load.image('aerialRight', 'src/media/img/aerialRight.png');
			
            //plomb
            _game.load.image('plombCarre', 'src/media/img/plombCarre.png');
            _game.load.image('plombHorizontal', 'src/media/img/plombOrizontal.png');
            _game.load.image('plombVertical', 'src/media/img/plombVertical.png');
        },
        
        create : function(vision) {
	        return (new Menu(_game, vision));
        }
    }
 })	
