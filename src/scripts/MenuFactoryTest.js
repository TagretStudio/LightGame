define(function() {
   var _game = null;

   var Menu = function(){
     this.vision = null;
     regX = 64; // coordonnee X du MILIEU de la reglette
     regY = _game.world.height-64-16;
    this.barre = _game.add.sprite(0,	_game.world.height-96, 'menuB');



   }
   Menu.prototype.constructor = Menu;
   Menu.prototype = Object.create(Phaser.Sprite.prototype);


   return {
     init : function(game){
       _game = game;
       _game.load.image('menuB', 'src/media/img/simpleMenu.png');

       _game.load.image('Reg', 'src/media/img/Reglette.png');
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
     create : function(){
       return (new Menu());
     }
   }
 })
