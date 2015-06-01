define(function() {
   var _game = null;

   var Menu = function(){
     this.vision = null;
     regX = 64; // coordonnee X du MILIEU de la reglette
     regY = _game.world.height-64-16;
    this.barre = _game.add.sprite(0,	_game.world.height-96, 'menuB');
    this.groupVisible = _game.add.group();
    this.groupInfra = _game.add.group();
    this.groupSupra = _game.add.group();
    //infra

    //plomb
    plombCarre = _game.add.sprite(470, 536, 'plombCarre');
    this.groupInfra.add(plombCarre);
    plombVertical = _game.add.sprite(510, 536, 'plombVertical');
    this.groupInfra.add(plombVertical);
    plombHorizontal = _game.add.sprite(550, 536, 'plombHorizontal');
    this.groupInfra.add(plombHorizontal);


    //mirroirs
    miroirH = _game.add.sprite(660, 536, 'mirroirH');
  //  this.groupInfra.add(miroirH);
  //  this.groupSupra.add(miroirH);
  //  this.groupVisible.add(miroirH);


    miroirV = _game.add.sprite(700, 536, 'mirroirV');
  //  this.groupInfra.add(miroirV);
  //  this.groupSupra.add(miroirV);
  //  this.groupVisible.add(miroirV);


    //visibles

    red = _game.add.sprite(230, 536, 'red');
    this.groupVisible.add(red);
    green = _game.add.sprite(270, 536, 'green');
    this.groupVisible.add(green);
    blue = _game.add.sprite(310, 536, 'blue');
    this.groupVisible.add(blue);
    magenta = _game.add.sprite(470, 536, 'magenta');
    this.groupVisible.add(magenta);
    cyan = _game.add.sprite(510, 536, 'cyan');
    this.groupVisible.add(cyan);
    yellow = _game.add.sprite(550, 536, 'yellow');
    this.groupVisible.add(yellow);
    //supra

    //antenes
    aerialLeft = _game.add.sprite(270, 536, 'aerialLeft');
    this.groupSupra.add(aerialLeft);
    aerialRight = _game.add.sprite(310, 536, 'aerialRight');
    this.groupSupra.add(aerialRight);

    this.groupSupra.forEach(
      function(p){
        p.exists = false;
      })
    this.groupInfra.forEach(
      function(p){
        p.exists = false;
      }
    )
      this.groupVisible.forEach(
        function(p){
          p.exists = true;
        }
      )


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
