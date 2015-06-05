<<<<<<< HEAD
BasicGame.Level2 = function (game){
	this.nextState = 'Boot';
	this.platforms = null;
	this.white_lums = null;
	this.blue_lums = null;
	this.blue_doors = null;
	this.blue_filters = null;
	this.startText = null;
};

BasicGame.Level2.prototype = {

	preload: function () {
		this.load.image('sky', 'media/img/sky.png');
		this.load.image('platform', 'media/img/platform.png');
		this.load.spritesheet('blue_door', 'media/img/door_blue.png', 32, 32);
		this.load.spritesheet('white_lumming', 'media/img/lumming_white.png', 32, 32);
		this.load.spritesheet('blue_lumming', 'media/img/lumming_blue.png', 32, 32);
		this.load.spritesheet('blue_filter', 'media/img/filter_blue.png', 32, 32);
		this.load.image('cliquez', 'media/img/cliquerPourCommencer.png');
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
			platforms.create(200-200, 280, 'platform');
		}
		platforms.forEach(function(p){p.body.immovable=true});
=======
define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'Transition', 'MenuFactoryTest', 'ItemsLevel'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory, DoorsFactory, Transition, MenuFactoryTest, ItemsLevel) {
	var _game = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _etapesuivante = null;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupLol = null;
	var _groupFilter = null;
	var _groupDoors = null;
	var _music = null;
	var text = null;
	var _menuNiveau = null;

	var _level2 = {

		preload : function(){
			_music = MusicFactory.create('level2', 'media/audio/level.ogg');
			_game.load.image('cliquez', 'media/img/cliquezPourCommencer.png');
			_game.load.spritesheet('platforms', 'media/img/tiles3.png',32,32);
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
			DoorsFactory.init(_game);
			MenuFactoryTest.init(_game);

		},
		create : function(){
			_nbLummingsSaved = 0;
			_music.play();
			Images.boot().create();

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

			platform(0,0,4,300);
			platform(0,64,4,500);


			_groupDoors = _game.add.group();
			_groupDoors.enableBody = true;
			door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 0, 470);
			door2 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 600, 470);
			lol= DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 0, 270);
			_groupDoors.add(door1);
			_groupDoors.add(door2);
			_groupLum = _game.add.group();

			lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 0, 0, 200);

		    //
			lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 100, 0, -200);
			lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 0, 0);
			 _nbLummingsV = 3;
			text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});


			_groupLum.add(lum1);
			_groupLum.add(lum2);
			_groupLum.add(lum3);
			_menuNiveau = MenuFactoryTest.create();
			ItemsLevel.reinit(_game);

			// _game.startText = _game.add.text(0, 450, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			// _game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;_game.startText.text = '';}},_game);
			var cliquez = this.add.sprite(100, 300, 'cliquez');
			cliquez.scale.set(0.7, 0.7);
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;cliquez.destroy();;}},_game);

			_game.paused = true;
>>>>>>> requirejs


		},
		update : function(){
			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
	//		_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), mayExit, null, _game);
			_game.physics.arcade.overlap(_groupLum, ItemsLevel.getGroupItem(), ItemsLevel.collideItem, null, _game);


			_menuNiveau.update();
			_groupLum.forEach(
				function(p){
					p.update();
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

	function platform(x, y, h, w) {
		var dummy = _game.add.sprite(0,0,'platforms',1);
		var sw = dummy.width;
		dummy.kill();
		var p;
		for (var i=0; i< Math.floor(Math.floor(w/sw)/2)+1; i++) {
			p = _game.add.sprite(x + w/2 - i*sw, y,'platforms',6);
			p.anchor.set(0,0);
			p = _game.add.sprite(x + w/2 + i*sw, y,'platforms',6);
			p.anchor.set(1,0);
		}
		p = _game.add.sprite(x,y,'platforms',4);
		p = _game.add.sprite(x+w,y,'platforms',2);
		p.anchor.set(1,0);
	}

	function mayExit(lum, door){
		var lx = (lum.left+lum.right)/2;
		var dl = door.left;
		var dr = door.right;

		if (lx>dl && lx<dr) {
			var exit = lum.collideWithDoor(door);
			if (exit == 1){
				_nbLummingsSaved = _nbLummingsSaved +1;
				text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
			}
		}
<<<<<<< HEAD
		blue_filters.forEach(function(filter) {
			filter.animations.add('anim', [], 10, true);
			filter.animations.play('anim');
		});

		// this.startText = this.add.text(0, 0, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
		// this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;this.startText.text = '';music.play();}},this);
		// this.game.paused = true;
	 //    music = this.add.audio('level2');
		// music.loop = true;

		var cliquez = this.add.sprite(60, 500, 'cliquez');
		this.game.input.onDown.add(function () {if(this.game.paused) {this.game.paused = false;music.play();cliquez.destroy();}},this);
		this.game.paused = true;
		music = this.add.audio('level2');
		music.loop = true;
	},
	
	update: function () {
		this.physics.arcade.collide(blue_lums, blue_doors, mayExit, null, this);
		this.physics.arcade.overlap(white_lums, blue_filters, toBlue, null, this);
		this.physics.arcade.collide(white_lums, platforms);
		this.physics.arcade.collide(blue_lums, platforms);

		white_lums.forEach(lumAnim);
		blue_lums.forEach(lumAnim);
=======
>>>>>>> requirejs
	}




	return{
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		},
		getLevel2 : function(){
			return _level2;
		}
	}

})
