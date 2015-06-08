define(['./Images', './MusicFactory' ,'./MainMenu', 'Transition', 'LevelFactory'], function(Images, MusicFactory, MainMenu, Transition, LevelFactory){
	var _game = null;
	var _etapesuivante = null;
	var _space = null;
	var _music = null;
  var _buttons = null;
  var _buttonPlay = null;
  var _buttonCredits = null;
  var _buttonQuit = null;
  var _pointButtons = null;
  var _pointLogo =null;

   function actionPlay() {
     _buttonPlay.kill();
     LevelFactory.setLevel(1);
     Transition.nextState('LevelFactory', _music);
   }

   function actionCredits(){
     _buttonCredits.kill();
     LevelFactory.setLevel(2);
     Transition.nextState('LevelFactory', _music);
   }

   function actionQuit(){
     _buttonQuit.kill();
     LevelFactory.setLevel(3);
     Transition.nextState('LevelFactory', _music);
   }

   	var _levelSelection = {
  		preload : function(){
        _pointLogo = new Phaser.Point(_game.world.centerX - 216, _game.world.centerY - 66);
        _pointButtons = new Phaser.Point(_game.world.centerX - 20, _game.world.centerY - 100);
  		},

  		create : function(){
        Images.boot().create();

        _buttons = _game.add.group();
        _buttons.scale.set(_game.world.width/1024, _game.world.height/768);
        _buttons.add(_buttonCredits = _game.make.button(Math.round(Math.random()*10)*-5, _game.world.centerY + 160, 'button', actionCredits, _game, 3, 4, 5));
        _buttons.add(_buttonPlay = _game.make.button(Math.round(Math.random()*10)*-5, _game.world.centerY + 100, 'button', actionPlay, _game, 0, 1, 2));
        _buttons.add(_buttonQuit = _game.make.button(Math.round(Math.random()*10)*-5, _game.world.centerY + 220, 'button', actionQuit, _game, 6, 7, 8));

  		},

  		update :function(){
        _buttons.forEach(
  					function(butt){
  						butt.x += Math.min(30, (_pointButtons.x- butt.x)/4);
  					});
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
