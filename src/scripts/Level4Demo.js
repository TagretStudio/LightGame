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
var _button_restart = null;
var _button_menu = null;


var _level4Demo = {
  preload : function(){
    _music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
    _game.load.image('buttonDiamond', 'media/img/menuButton.png');
    _game.load.image('buttonRefresh', 'media/img/refresh.png')
    _game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
    PlatformFactory.init(_game);
    VisibleLummingFactory.init(_game);
    RadioLummingFactory.init(_game);
    MenuFactoryTest.init(_game);

  },

  create : function(){
    _nbLummingsSaved = 0;
    _music.play();
    Images.boot().create();
    _game.physics.startSystem(Phaser.Physics.ARCADE);
    _currentVision = VisionEnum.getVisionEnum().VISIBLE;
    _groupPlatforms = _game.add.group();
    _groupPlatforms.enableBody = true;
    platform1 = PlatformFactory.create(000, 300, false);
    platform2 = PlatformFactory.create(300, 300, false);
    platform3 = PlatformFactory.create(000, 400, false);
    platform4 = PlatformFactory.create(300, 400, false);
    platform5 = PlatformFactory.create(600, 400, false);

    _groupPlatforms.add(platform1);
    _groupPlatforms.add(platform2);
    _groupPlatforms.add(platform3);
    _groupPlatforms.add(platform4);
    _groupPlatforms.add(platform5);


    _groupDoors = _game.add.group();
    _groupDoors.enableBody = true;
    door2 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 600, 270);
    _groupDoors.add(door2);


    _groupLum = _game.add.group();
    lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().WHITE, 20, 200, 50);
    lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 50, 200, 50);
    lumRadio = RadioLummingFactory.create(400, 350, -90);

    _groupLum.add(lum1);
    _groupLum.add(lum2);
    _groupLum.add(lumRadio);
    _nbLummingsV = 2;
    text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});
    button_menu = _game.add.button(32,0, 'buttonDiamond', actionOnMenu, _game);
    button_restart = _game.add.button(650,0,'buttonRefresh', actionOnRestart, _game);

    _menu = MenuFactoryTest.create();
    ItemsLevel.reinit(_game);

    var cliquez = this.add.sprite(100, 300, 'cliquez');
    cliquez.scale.set(0.7, 0.7);
    _game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);
    _game.paused = true;
  },

  update : function(){
    _menu.update();
    _game.physics.arcade.collide(_groupLum, _groupPlatforms);
    _game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
    _game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), ItemsLevel.collideItem, null, _game);


    _groupLum.forEach(
      function(p){
        p.update(_currentVision);
      })
    _groupDoors.forEach(
			function(p){
				p.update();
			})

    if (_nbLummingsV == _nbLummingsSaved) {
      Transition.nextState('MainMenu', _music);
    }
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

function actionOnRestart() {
var background = _game.add.sprite(0, 0, 'transitionBackground');
var logo = _game.add.sprite(184, 265, 'logo');
if (_music != null) {
  _music.getMusic().fadeOut(700);
  _music.getMusic().onFadeComplete.dispatch();
  _music.getMusic().onFadeComplete.addOnce(function() {
_music = null;
_game.state.start('Level4Demo');
}, _game);
}
}

function actionOnMenu() {
   var background = _game.add.sprite(0, 0, 'transitionBackground');
   var logo = _game.add.sprite(184, 265, 'logo');
   if (_music != null) {
     _music.getMusic().fadeOut(700);
     _music.getMusic().onFadeComplete.dispatch();
     _music.getMusic().onFadeComplete.addOnce(function() {
     _music = null;
     _game.state.start('MainMenu');
     }, _game);
 }
}



  return{
    init : function(game, etapesuivante){
      _game = game;
      _etapesuivante = etapesuivante;
    },
    getLevel4Demo : function(){
      return _level4Demo;
    }
  }

})