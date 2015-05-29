define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory) {
	var _game = null;
	var _etapesuivante = null;
	var platforms = null;
	var _groupLum = null;

	var zizik = null;

	var _level1 = {
//		var zizik = null;

		preload : function(){
			//_game.load.image('platform', 'src/media/img/platform.png');
			_game.load.spritesheet('door', 'src/media/img/door_red.png', 32, 32);
			zizik = MusicFactory.create('Digital_Native', 'src/media/audio/Digital_Native.ogg');
		//	zizik.preload('src/media/audio/menu_music.ogg');
		//	Lumming.init(_game);
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
		},
		create : function(){
			zizik.play();
			Images.boot().create();
		//	Musiques.getmaintheme().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);

			platforms = _game.add.group();
			platforms.enableBody = true;
			{
				/*
				platforms.create(  0-200, 100, 'platform');
				platforms.create(300-200, 200, 'platform');
				platforms.create(600-200, 300, 'platform');
				platforms.create(900-200, 280, 'platform');
				
				platforms.forEach(function(p){p.body.immovable=true});
				*/
				platform1 = PlatformFactory.create(300-200, 200, false);
			}
			platforms.add(platform1);
			
			
			doors = this.add.group();
			doors.enableBody = true;
			var door;
			{
				door = doors.create(600-200, 270, 'door');
			}
			doors.forEach(function(door) {
				door.animations.add('anim', [], 10, true);
				door.animations.play('anim');
			});

			_groupLum = _game.add.group();

			lum1 = VisibleLummingFactory.create('blue', 0, 0, 100);
			lum2 = VisibleLummingFactory.create('red', 100, 0, -200);


			_groupLum.add(lum1);
			_groupLum.add(lum2);

			_game.startText = _game.add.text(0, 500, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;_game.startText.text = '';}},_game);
			_game.paused = true;


		},
		update : function(){

			_game.physics.arcade.collide(_groupLum, platforms);
			_groupLum.forEach(
					function(p){
						p.update();
					}
					)
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

})
