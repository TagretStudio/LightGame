define(['./Images', './Musiques', './MusicFactory' ,'./MainMenu'], function(Images, Musiques, MusicFactory, MainMenu){
	var _game = null;
	var _etapesuivante = null;
	var _space = null;
	var _music = null;


	transition = function(){
		_game.state.start(_etapesuivante);
	}

	var _chargement = {
		preload : function(){
			_music = MusicFactory.create('Menu', 'src/media/audio/menu_music.ogg');
			MainMenu.setMusic(_music);

		},

		create : function(){
			_space = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			_music.play();
			Images.boot().create();
		//	Musiques.getmaintheme().create();
		},

		update :function(){
			Images.boot().update();
			this.time.events.add(10800, transition, _game);
			if (_space.isDown) {
				transition();
			}

		}
	}

	return{
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		},
		getChargement: function(){
			return _chargement;
		}

	}

})
