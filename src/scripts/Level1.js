define(['Images', 'Musiques', 'Lumming', 'Lumming2'], function(Images, Musiques, Lumming, Lumming2){
	var _game = null;
	var platforms = null;
	var _groupLum = null;

	var _level1 = {


		preload : function(){
			_game.load.image('platform', 'src/media/img/platform.png');
			_game.load.spritesheet('door', 'src/media/img/door_red.png', 32, 32);

		//	Lumming.init(_game);
			Lumming2.init(_game);
		},
		create : function(){

			Images.boot().create();
			Musiques.getmaintheme().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);

			platforms = _game.add.group();
			platforms.enableBody = true;
			{
				platforms.create(  0-200, 100, 'platform');
				platforms.create(300-200, 200, 'platform');
				platforms.create(600-200, 300, 'platform');
				platforms.create(900-200, 280, 'platform');
			}
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

			platforms.forEach(function(p){p.body.immovable=true});
			_groupLum = _game.add.group();

			lum1 = Lumming2.create('blue', 0, 0, 100);
			lum2 = Lumming2.create('red', 100, 0, -200);


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
