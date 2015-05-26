define(['Images', 'Musiques', 'Lumming'], function(Images, Musiques, Lumming){
	var _game = null;
	var platforms = null;
	var _groupLum = null;

	var _level1 = {


		preload : function(){
			_game.load.image('platform', 'src/media/img/platform.png');
			_game.load.spritesheet('door', 'src/media/img/door_red.png', 32, 32);

			Lumming.init(_game);
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
			platforms.forEach(function(p){p.body.immovable=true});
			_groupLum = _game.add.group();

			lum1 = Lumming.create('blue', 0, 0, 100);
			lum2 = Lumming.create('red', 100, 0, -200);


			_groupLum.add(lum1);
			_groupLum.add(lum2);



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
