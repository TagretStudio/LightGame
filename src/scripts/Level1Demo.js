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


var _level1Demo = {
  preload : function(){
    _music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
    _game.load.image('button', 'media/img/diamond.png');
    _game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
    MenuFactoryTest.init(_game);
    PlatformFactory.init(_game);
  },

  create : function(){
    _nbLummingsSaved = 0;
    _music.play();
    Images.boot().create();
    _game.physics.startSystem(Phaser.Physics.ARCADE);

    _groupPlatforms = _game.add.group();
    _groupPlatforms.enableBody = true;
    platform1 = PlatformFactory.create(100, 300, false);
    _groupPlatforms.add(platform1);


    _menu = MenuFactoryTest.create();

  },

  update : function(){
    _menu.update();

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
