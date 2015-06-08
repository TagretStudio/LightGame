define(['./Images', './MusicFactory' ,'./MainMenu', 'Transition', 'LevelFactory'], function(Images, MusicFactory, MainMenu, Transition, LevelFactory){
	var _game = null;
	var _etapesuivante = null;
  var _currentLevel = 1;
	var _space = null;
	var _music = null;
  var _buttons = null;
  var _button = null;
  var _pointLogo =null;


  function actionPlay(){
    LevelFactory.setLevel(_currentLevel);
    Transition.nextState('LevelFactory', _music);
  }


  function actionButton(niveau){
  //  LevelFactory.setLevel(niveau);
    _currentLevel += niveau;
    //Transition.nextState('LevelFactory', _music);
  }

   	var _levelSelection = {
  		preload : function(){
        _pointLogo = new Phaser.Point(_game.world.centerX - 216, _game.world.centerY - 66);
        _pointButtons = new Phaser.Point(_game.world.centerX , _game.world.centerY - 20);
        _game.load.spritesheet('buttonplusmoins', 'media/img/buttonplusmoins.png', 38, 38);
        _game.load.spritesheet('button', 'media/img/MenuButtons.png', 274, 71);


  		},

  		create : function(){
        Images.boot().create();
        _buttons = _game.add.group();
  			_buttons.scale.set(_game.world.width/1024, _game.world.height/768);
  			_buttons.add(_buttonPlus = _game.make.button(_game.world.centerX*1024/800, _game.world.centerY, 'buttonplusmoins', function(){actionButton(1);}, _game, 0, 1, 2));
        _buttons.add(_buttonMoins = _game.make.button(_game.world.centerX*1024/800,_game.world.centerY + 150, 'buttonplusmoins', function(){actionButton(-1);}, _game, 3, 4, 5));
        _buttons.add(_buttonPlay = _game.make.button(_game.world.centerX*1024/800, _game.world.centerY + 300, 'button', actionPlay, _game, 0, 1, 2));

        _buttonPlus.anchor.set(0.5, 0.5);
        _buttonPlus.scale.set(2,2);
        _buttonMoins.anchor.set(0.5, 0.5);
        _buttonMoins.scale.set(2,2);

        text = _game.add.text(_game.world.centerX, _game.world.centerY, _currentLevel, {align: "center"});
				text.anchor.set(0.5,0.5);
        text.scale.set(2,2)

  		},

  		update :function(){
        text.setText(_currentLevel);
  		}
  	}


  	return{
  		init : function(game, etapesuivante){
  			_game = game;
  			_etapesuivante = etapesuivante;
  		},
      setMusic : function(music){
        _music = music;
      },

      getLevelSelection : function(){
        return _levelSelection;
      }

  	}

  })
