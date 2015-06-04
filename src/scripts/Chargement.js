define(['./Images', './MusicFactory' ,'./MainMenu', 'Transition'], function(Images, MusicFactory, MainMenu, Transition){
	var _game = null;
	var _etapesuivante = null;
	var _space = null;
	var _music = null;


		function transition(){
			Transition.nextState(_etapesuivante);

		}

	var _chargement = {
		preload : function(){
			_music = MusicFactory.create('Menu', 'media/audio/menu_music.ogg');
			MainMenu.setMusic(_music);

		},

		create : function(){
			_space = _game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			_music.play();
			Images.boot().create();
		},

		update :function(){
			Images.boot().update();
			this.time.events.add(10800, function() {
			    Transition.nextState(_etapesuivante);
			}, _game);
			if (_space.isDown) {
				_game.time.events.add(Phaser.Timer.SECOND * 2, transition, this);

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
