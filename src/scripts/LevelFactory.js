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
			LevelFactory.init(_game);
		},
		
		create: function() {
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);
			_currentVision = VisionEnum.getVisionEnum().VISIBLE;
			
			this.levelStruct = LevelStructure.create(indexLevel);	
		},
		
		update: function() {
			
		}
		
	}
	
	function changeLevel(indexLevel) {
		delete this.levelStruct;
		this.levelStruct = LevelStructure.create(indexLevel);
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