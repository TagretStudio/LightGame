define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactoryTest',
'VisionEnum', 'Transition', 'FilterFactory', 'RadioLummingFactory',
 'ItemsLevel', 'MiroirFactory'], function(Images, LummingFactory,
   VisibleLummingFactory, ColorEnum,
       MusicFactory, PlatformFactory, DoorsFactory, MenuFactoryTest, VisionEnum,
        Transition, FilterFactory, RadioLummingFactory, ItemsLevel,
        MiroirFactory) {

var _game;
var _nbLummingsV = 0;
var _nbLummingsSaved = 0;
var _etapesuivante = null;
var _groupPlatforms = null;
var _groupLum = null;
var _music = null;
var _menu = null;
var _text = null;
var _currentVision = null;


var _level1Demo = {
  preload : function(){
    _music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
    _game.load.image('button', 'media/img/diamond.png');
    _game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
    MenuFactoryTest.init(_game);
    PlatformFactory.init(_game);
    VisibleLummingFactory.init(_game);
  },

  create : function(){
    _nbLummingsSaved = 0;
    _music.play();
    Images.boot().create();
    _game.physics.startSystem(Phaser.Physics.ARCADE);
    _currentVision = VisionEnum.getVisionEnum().VISIBLE;
    _groupPlatforms = _game.add.group();
    _groupPlatforms.enableBody = true;
    platform1 = PlatformFactory.create(100, 300, false);
    platform2 = PlatformFactory.create(300, 300, false);

    _groupPlatforms.add(platform1);
    _groupPlatforms.add(platform2);


    _groupDoors = _game.add.group();
    _groupDoors.enableBody = true;
    door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
    door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
    _groupDoors.add(door1);
    _groupDoors.add(door2);


    _groupLum = _game.add.group();
    lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
    lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
    _groupLum.add(lum1);
    _groupLum.add(lum2);

    _nbLummingsV = 2;
    text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});


    _menu = MenuFactoryTest.create();
    var cliquez = this.add.sprite(100, 300, 'cliquez');
    cliquez.scale.set(0.7, 0.7);
    _game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);
    _game.paused = true;
  },

  update : function(){
    _menu.update();
    _game.physics.arcade.collide(_groupLum, _groupPlatforms);
    _game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);


    _groupLum.forEach(
      function(p){
        p.update(_currentVision);
      })
  }

}

function mayExit(lum, door){
    if (lum.getDefautVision() == 2) {
    var exit = lum.collideWithDoor(door);
      if (exit == 1){
        _nbLummingsSaved = _nbLummingsSaved +1;
        text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
      }
    }
}


  return{
    init : function(game, etapesuivante){
      _game = game;
      _etapesuivante = etapesuivante;
    },
    getLevel1Demo : function(){
      return _level1Demo;
    }
  }

})