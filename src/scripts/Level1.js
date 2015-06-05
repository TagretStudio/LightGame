<<<<<<< HEAD
BasicGame.Level1 = function (game) {
	this.nextState = 'Level2';
	this.platforms = null;
	this.lums = null;
	this.doors = null;
};

BasicGame.Level1.prototype = {

	preload: function () {
		this.load.image('sky', 'media/img/sky.png');
	    this.load.image('logo', 'media/img/Menu.png');
		this.load.image('platform', 'media/img/platform.png');
		this.load.spritesheet('door', 'media/img/door_red.png', 32, 32);
		this.load.image('cliquez', 'media/img/cliquerPourCommencer.png');
		// this.load.spritesheet('lumming', 'src/media/img/lumming_magenta.png', 32, 32);
		this.load.spritesheet('lumming', 'media/img/gamma.png', 32, 32);
	    var sky = this.add.sprite(0, 0, 'sky');
	    sky.scale.set(1024/800, 768/600);
	    this.add.sprite(184, 265, 'logo');
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var sky = this.add.sprite(0, 0, 'sky');
		sky.scale.set(1024/800, 768/600);

		platforms = this.add.group();
		platforms.enableBody = true;
		{
			platforms.create(  0-200, 100, 'platform');
			platforms.create(300-200, 200, 'platform');
			platforms.create(600-200, 300, 'platform');
			platforms.create(900-200, 280, 'platform');
=======
define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactoryTest', 'VisionEnum', 'Transition', 'FilterFactory', 'RadioLummingFactory', 'ItemsLevel', 'MiroirFactory'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory, DoorsFactory, MenuFactoryTest, VisionEnum, Transition, FilterFactory, RadioLummingFactory, ItemsLevel, MiroirFactory) {
	var _game = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _etapesuivante = null;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupLol = null;
	var _groupFilter = null;
	var _groupDoors = null;
	var _groupMiroir = null;
	var _music = null;
	var text = null;
	var menuBlack = null;
	var _currentVision = null;
	var button_restart;
	var button_menu;
	var _level1 = {

		preload : function(){

			_music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
		    _game.load.image('buttonDiamond', 'media/img/diamond.png');
		    _game.load.image('buttonRefresh', 'media/img/refresh.png');
		    _game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
		//	Lumming.init(_game);
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
			DoorsFactory.init(_game);
		    MenuFactoryTest.init(_game);
			FilterFactory.init(_game);
			MiroirFactory.init(_game);
		    RadioLummingFactory.init(_game);
		},
		create : function(){
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();
			_currentVision = VisionEnum.getVisionEnum().VISIBLE;
			_game.physics.startSystem(Phaser.Physics.ARCADE);

			_groupPlatforms = _game.add.group();
			_groupPlatforms.enableBody = true;
			{
				platform1 = PlatformFactory.create(-200, 100, false);
				platform2 = PlatformFactory.create(100, 200, false);
				platform3 = PlatformFactory.create(400, 300, false);
				platform4 = PlatformFactory.create(700, 280, false);
			    platform5 = PlatformFactory.create(0, 504, false);
			    platform6 = PlatformFactory.create(400, 504, false);

			}
			_groupPlatforms.add(platform1);
			_groupPlatforms.add(platform2);
			_groupPlatforms.add(platform3);
			_groupPlatforms.add(platform4);
		    _groupPlatforms.add(platform5);
		    _groupPlatforms.add(platform6);

		    //TEST DRAG&DROP
		    	_groupLol = _game.add.group();
			_groupLol.enableBody = true;
		    lol1 = PlatformFactory.create(-200, 100, false);
		    lol2 = PlatformFactory.create(100, 200, false);
		    lol3 = PlatformFactory.create(400, 300, false);
		    lol4 = PlatformFactory.create(700, 280, false);
		    _groupLol.add(lol1);
		    _groupLol.add(lol2);
		    _groupLol.add(lol3);
		    _groupLol.add(lol4);

		    //TEST MENU
		    menuBlack = MenuFactoryTest.create();

			_groupDoors = _game.add.group();
			_groupDoors.enableBody = true;
			door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 0, 470);
			door2 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 600, 470);
			_groupDoors.add(door1);
			_groupDoors.add(door2);

			_groupLum = _game.add.group();

			lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 0, 0, 0);
		    //TEST DRAG&DROP
		    lum1.inputEnabled = true;
		    lum1.input.enableDrag();
		    lum1.events.onDragStop.add(stopDrag, _game);
		    //
			lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 100, 0, -200);
			lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 0, -100);
		    lumRadio = RadioLummingFactory.create(200, 0, -90);
			 _nbLummingsV = 3;
			text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});


			_groupLum.add(lum1);
			_groupLum.add(lum2);
			_groupLum.add(lum3);
		    _groupLum.add(lumRadio);


			// TEST FILTRE
			_groupFilter = _game.add.group();
			_groupFilter.enableBody = true;
			filter1 = FilterFactory.create(ColorEnum.getColorEnum().GREEN, 200, 400);
			filter2 = FilterFactory.create(ColorEnum.getColorEnum().MAGENTA, 300, 470);
			_groupFilter.add(filter1);

			_groupFilter.add(filter2);

			// TEST MIROIR
			_groupMiroir = _game.add.group();
			_groupMiroir.enableBody = true;
			miroir1 = MiroirFactory.create(100, 470, true);
			_groupMiroir.add(miroir1);

		    button_menu = _game.add.button(32,0, 'buttonDiamond', actionOnMenu, _game);
		    button_restart = _game.add.button(650,0,'buttonRefresh', actionOnRestart, _game);
			ItemsLevel.reinit(_game);

			var cliquez = this.add.sprite(100, 300, 'cliquez');
			cliquez.scale.set(0.7, 0.7);
			// _game.startText = _game.add.text(0, 450, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);
			_game.paused = true;
			ItemsLevel.setgroup(_groupLum);


		},
		update : function(){

			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_game.physics.arcade.collide(_groupLum, _groupMiroir);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
			_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), ItemsLevel.collideItem, null, _game);

			_game.physics.arcade.overlap(_groupLum, _groupFilter, changeColor, null, _game);
		    menuBlack.update();
			_groupLum.forEach(
				function(p){
					p.update(_currentVision);
				})
			_groupDoors.forEach(
				function(p){
					p.update();
				})

			if (_nbLummingsV == _nbLummingsSaved) {
				Transition.nextState('Level2', _music);
			}
>>>>>>> requirejs
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

	function changeColor(lum, filter) {
	    if (lum.getDefaultVision == 2) {
		lum.collideWithFilter(filter);
	    }
	}

	       //TEST DRAG&DROP

	       function stopDrag() {
		   _game.physics.arcade.overlap(lum1, _groupLol, setInitialPosition, null, _game);
	       }

	       function setInitialPosition(lum) {
		   lum.position.x = 0;
		   lum.position.y = 0;
	       }
	       //
	    function actionOnRestart() {
		var background = _game.add.sprite(0, 0, 'transitionBackground');
		var logo = _game.add.sprite(184, 265, 'logo');
		if (_music != null) {
		    _music.getMusic().fadeOut(700);
		    _music.getMusic().onFadeComplete.dispatch();
		    _music.getMusic().onFadeComplete.addOnce(function() {
			_music = null;
			_game.state.start('Level1');
			}, _game);
		}
<<<<<<< HEAD
		lums.forEach(function(lum) {
			lum.animations.add('left', [4, 5, 6, 7], 10, true);
			lum.animations.add('right',  [8, 9, 10, 11], 10, true);
			lum.body.gravity.y = 1200;
			lum.body.bounce.x = 1;
		});

		// this.startText = this.add.text(150, 500, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
		// this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;this.startText.text = '';music.play();}},this);
		// this.game.paused = true;
		// music = this.add.audio('level');
		// music.loop = true;

		var cliquez = this.add.sprite(60, 500, 'cliquez');

		// this.startText = this.add.text(150, 500, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
		this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;music.play();cliquez.destroy();}},this);
		this.game.paused = true;
		music = this.add.audio('level');
		music.loop = true;
	},

	update: function () {
		this.physics.arcade.collide(lums, doors, mayExit, null, this);
		this.physics.arcade.collide(lums, platforms);

		lums.forEach(
			function(lum) {
				if (lum.body.velocity.x > 0) {
					lum.animations.play('right');
				} else if (lum.body.velocity.x < 0) {
					lum.animations.play('left');
				} else {
					lum.animations.stop();
				}
			}
		);
	    //Gestion Menu

	    //var space;
	    //var menuOpened = false;
	    //space = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	    //if (space.isDown || this.pointer.isDown) {
		//	this.add.text(200, 500, 'LOOOOOOOOOOL', { fontSize: '32px', fill: '#000' });
	    //}
=======
	    }
>>>>>>> requirejs

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
		getLevel1 : function(){
			return _level1;
		}
	}
<<<<<<< HEAD
};

// TODO quand on aura des classes de lummings, la collision porte/lummming dépendra de la couleur de chacun
// ça serait bien aussi une petite animation quand on gagne, plutôt que de passer direct au niveau suivant
function mayExit(lum, door) {
	lum.kill();
	//compter les lummings restants ici et s'il n'y en a plus, passer au niveau suivant
    this.add.sprite(0, 0, 'sky');
    this.add.sprite(184, 265, 'logo');
    if (music != null && music.isPlaying == true) {
	music.fadeOut(700);
	music.onFadeComplete.dispatch();
	music.onFadeComplete.addOnce(function() {
	    this.state.start(this.nextState);
	}, this);
    }
}
=======

})
>>>>>>> requirejs
