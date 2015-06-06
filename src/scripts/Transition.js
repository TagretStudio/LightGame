define(['MusicFactory'],function(MusicFactory){
  var _game = null;
  var _nextstate = null;

function transition(){
  _game.state.start(_nextState);
}

return{
  init : function(game){
    _game = game;
    _game.load.image('transitionBackground', 'media/img/sky.png');
    _game.load.image('transitionLogo', 'media/img/Menu.png');
      _game.load.image('gameOver', 'media/img/gameOver.png');

 
  },
  nextState : function(nextState, musicA){
    var music = null;
    _nextState = nextState;
    if (musicA != null){
      music = musicA.getMusic();
    }
      var background = _game.add.sprite(0, 0, 'transitionBackground');
      var logo = _game.add.sprite(184, 265, 'logo');
      if (music != null) {
	  music.fadeOut(700);
	music.onFadeComplete.dispatch();
        music.onFadeComplete.addOnce(function() {
          _game.time.events.add(Phaser.Timer.SECOND * 1, transition, this);
	    music = null;
	   // _game.state.start(nextState);
	}, _game);
     } else{
       _game.time.events.add(Phaser.Timer.SECOND * 2, transition, this);

  //    _game.state.start(nextState);
    }
  },

nextStateGO : function(nextState, musicA){
    var music = null;
    _nextState = nextState;
    if (musicA != null){
      music = musicA.getMusic();
    }
    var logo = _game.add.sprite(184, 265, 'gameOver');
    if (music != null) {
	alert('lol');
       music.fadeOut(1500);
	music.onFadeComplete.dispatch();
        music.onFadeComplete.addOnce(function() {
          _game.time.events.add(Phaser.Timer.SECOND * 1.8, transition, this);
	    music = null;
	   // _game.state.start(nextState);
	}, _game);
     //} else{
       //_game.time.events.add(Phaser.Timer.SECOND * 2, transition, this);

  //    _game.state.start(nextState);
    }
  }
}
})
