define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactoryTest',
		'VisionEnum', 'Transition', 'FilterFactory', 'RadioLummingFactory',
		'ItemsLevel', 'MiroirFactory', 'LevelStructure'],
	   function(Images, LummingFactory,	VisibleLummingFactory, ColorEnum,
				MusicFactory, PlatformFactory, DoorsFactory, MenuFactoryTest,
				VisionEnum,	Transition, FilterFactory, RadioLummingFactory,
				ItemsLevel,	MiroirFactory, LevelStructure) {
	
	var _game = null;
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

	
	var LevelFactory = {
		
		preload: function() {
			_music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
			_game.load.image('buttonDiamond', 'media/img/menuButton.png');
			_game.load.image('buttonRefresh', 'media/img/refresh.png')
			_game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
			MenuFactoryTest.init(_game);
			PlatformFactory.init(_game);
			VisibleLummingFactory.init(_game);
			LevelStructure.init(_game);
		},
		
		create: function() {
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);
			_currentVision = VisionEnum.getVisionEnum().VISIBLE;
			
			this.levelStruct = LevelStructure.create(1);
			
			_groupPlatforms = this.levelStruct.getPlatforms();
			_groupDoors = this.levelStruct.getDoors();
			_groupLum = this.levelStruct.getLummings();
			
			
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
		
		update: function() {
			_menu.update();
			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);

			_groupLum.forEach(
				function(p){
					p.update(_currentVision);
				}
			)
			
			_groupDoors.forEach(
				function(p){
					p.update();
				}
			)
			
			if (_nbLummingsV == _nbLummingsSaved) {
				Transition.nextState('MainMenu', _music);
			}
		}
		
	}
	
	function changeLevel(indexLevel) {
		delete this.levelStruct;
		this.levelStruct = LevelStructure.create(indexLevel);
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
				_currentVision = VisionEnum.getVisionEnum().VISIBLE;
				_game.state.start('LevelFactory');
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
	
	return {
		init: function(game, nextState) {
			_game = game;
			_etapesuivante = nextState;
		},
		getLevel: function() {
			return LevelFactory;
		}
	}
	
 })