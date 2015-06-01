define(['Images', 'Musiques','MusicFactory'], function(Images, Musiques, MusicFactory){
	var _game = null;
	var _etapesuivante = null;
	var _pointLogo = null;
	var _pointButtons = null;
	var _buttons = null;
	var _logo = null;
	var _buttonPlay = null;
	var _buttonCredits = null;
	var _buttonQuit = null;
	var _music = null;

	function actionPlay() {
		_buttonPlay.kill();
		background2 = _game.add.sprite(0, 0, 'preloaderBackground');
		logo = _game.add.sprite(184, 265, 'logo');
	//	_game.state.start(_etapesuivante);
		_music.stop(_etapesuivante);
	}

	function actionCredits(){
		_buttonCredits.kill();
		background2 = _game.add.sprite(0, 0, 'preloaderBackground');
		logo = _game.add.sprite(184, 265, 'logo');
		_music.stop(_etapesuivante);

	}

	function actionQuit(){
		_buttonQuit.kill();
		background2 = _game.add.sprite(0, 0, 'preloaderBackground');
	  logo = _game.add.sprite(184, 265, 'logo');
		_music.stop(_etapesuivante);

	}

	var _menu = {
		preload : function(){
			_pointLogo = new Phaser.Point(234, 234);
			_pointButtons = new Phaser.Point(380, 200);
		},

		create : function(){
			if (_music.isPlaying() == false){
				_music.play();
			}
			Images.boot().create();
			_logo = _game.add.sprite(_pointLogo.x, _pointLogo.y, 'logo');
			_logo.scale.set(800/1024, 600/768);

			_buttons = _game.add.group();
			_buttons.scale.set(800/1024, 600/768);
			_buttons.add(_buttonCredits = _game.make.button(Math.round(Math.random()*10)*-5, 460, 'button', actionCredits, _game, 3, 4, 5));
			_buttons.add(_buttonPlay = _game.make.button(Math.round(Math.random()*10)*-5, 400, 'button', actionPlay, _game, 0, 1, 2));
			_buttons.add(_buttonQuit = _game.make.button(Math.round(Math.random()*10)*-5, 520, 'button', actionQuit, _game, 6, 7, 8));


		},

		update : function(){
			_buttons.forEach(
					function(butt){
						butt.x += Math.min(30, (_pointButtons.x- butt.x)/4);
					}
					);
		}

	};

	return{
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		},

		setMusic : function(music){
			_music = music ;
		},

		getMainMenu : function(){
			return _menu;
		}

	}



})
