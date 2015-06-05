define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactoryTest',
		'VisionEnum', 'Transition', 'FilterFactory', 'RadioLummingFactory',
		'ItemsLevel', 'MiroirFactory', 'LevelStructure', 'XLummingFactory', 'IceFactory'],
	   function(Images, LummingFactory,	VisibleLummingFactory, ColorEnum,
				MusicFactory, PlatformFactory, DoorsFactory, MenuFactoryTest,
				VisionEnum,	Transition, FilterFactory, RadioLummingFactory,
				ItemsLevel,	MiroirFactory, LevelStructure, XLummingFactory, IceFactory) {
	
	var _game = null;
	var _currentLevel = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupElements = null;
	var _music = null;
	var _menu = null;
	var _text = null;
	var _currentVision = null;
	var _button_restart = null;
	var _button_menu = null;
	var _tabAvailableObjects = null;
	
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
			XLummingFactory.init(_game);
			IceFactory.init(_game);
		},
		
		create: function() {
			_alreadyChangeLevel = false;
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);
			_currentVision = VisionEnum.getVisionEnum().VISIBLE;
			
			this.levelStruct = LevelStructure.create(_currentLevel);
			
			_groupPlatforms = this.levelStruct.getPlatforms();
			_groupDoors = this.levelStruct.getDoors();
			_groupLum = this.levelStruct.getLummings();
			_groupElements = this.levelStruct.getElements();
			_nbLummingsV = this.levelStruct.getNbLummingsWin();
			_tabAvailableObjects = this.levelStruct.getTabAvailableObjects();
			
			if (_groupLum.total == 0) {
				_currentLevel = 1;
				_game.state.start('MainMenu');
			} else {
				text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});
				button_menu = _game.add.button(32,0, 'buttonDiamond', actionOnMenu, _game);
				button_restart = _game.add.button(650,0,'buttonRefresh', actionOnRestart, _game);

				_menu = MenuFactoryTest.create(_tabAvailableObjects);
				ItemsLevel.reinit(_game);
				var cliquez = this.add.sprite(_game.world.width/2, _game.world.height*2/3, 'cliquez');
				cliquez.anchor.set(0.5, 0.5);
				cliquez.scale.set(0.7, 0.7);
				_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);
				_game.paused = true;
			}
			
		},
		
		update: function() {
			_menu.update();
			_game.physics.arcade.overlap(_groupLum, _groupPlatforms, collidePf, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
			_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), ItemsLevel.collideItem, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupElements, elementOverlap, null, _game);

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
				if (!_alreadyChangeLevel) {
					if (_groupLum.total == 0) {
						Transition.nextState('MainMenu', _music);
					} else {
						_currentLevel++;
						Transition.nextState('LevelFactory', _music);
					}
				}
				_alreadyChangeLevel = true;
			}
		}
		
	}

	function elementOverlap(lum, element) {
		element.interact(lum);
	}

	function mayExit(lum, door){
		var lx = (lum.left+lum.right)/2;
		var dl = door.left;
		var dr = door.right;

		if (lx>dl && lx<dr) {
			var exit = lum.collideWithDoor(door);
			if (exit == 1){
				this.time.events.add(1000,
					function() {
						_nbLummingsSaved = _nbLummingsSaved +1;
						text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
					}
				, this);
				//_nbLummingsSaved = _nbLummingsSaved +1;
				//text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
			}
		}
	}
	
	function collidePf(lum, platform){
		if(lum.color == 9){
			if(platform.isPb){
			 _game.physics.arcade.collide(lum, platform, collidePf, null, _game);
			}
		} else {
		 _game.physics.arcade.collide(lum, platform, collidePf, null, _game);
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
		init: function(game) {
			_game = game;
			_currentLevel = 1;
		},
		getLevel: function() {
			return LevelFactory;
		}
	}
	
 })