define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory', 'DoorsFactory'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory, DoorsFactory) {
	var _game = null;
	var _etapesuivante = null;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupdoors = null;
	var zizik = null;

	var _level1 = {
//		var zizik = null;

		preload : function(){
			//_game.load.image('platform', 'src/media/img/platform.png');
			_game.load.spritesheet('door', 'src/media/img/door_red.png', 32, 32);
			zizik = MusicFactory.create('level1', 'src/media/audio/Level 1.ogg');
		//	zizik.preload('src/media/audio/menu_music.ogg');
		//	Lumming.init(_game);
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
			DoorsFactory.init(_game);
		},
		create : function(){
			zizik.play();
			Images.boot().create();
		//	Musiques.getmaintheme().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);

			_groupPlatforms = _game.add.group();
			_groupPlatforms.enableBody = true;
			{
				platform1 = PlatformFactory.create(-200, 100, false);
				platform2 = PlatformFactory.create(100, 200, false);
				platform3 = PlatformFactory.create(400, 300, false);
				platform4 = PlatformFactory.create(700, 280, false);
			}
			_groupPlatforms.add(platform1);
			_groupPlatforms.add(platform2);
			_groupPlatforms.add(platform3);
			_groupPlatforms.add(platform4);




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
			lum3 = VisibleLummingFactory.create('yellow', 500, 0, -100);
			_groupdoors = this.add.group();
			door1 = DoorsFactory.create('red', 400, 100);
			door2 = DoorsFactory.create('yellow', 0, 400);
			_groupdoors.add(door1);
			_groupdoors.add(door2);
			_groupLum.add(lum1);
			_groupLum.add(lum2);
			_groupLum.add(lum3);

			_game.startText = _game.add.text(0, 500, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;_game.startText.text = '';}},_game);
			_game.paused = true;


		},
		update : function(){

			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_groupLum.forEach(
					function(p){
						p.update();
					}
					)
				_groupdoors.forEach(
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
