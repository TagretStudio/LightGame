define(['MusicFactory'],function(MusicFactory){
  var _game = null;

return{
  init : function(game){
    _game = game;
    _game.load.image('transitionBackground', 'src/media/img/sky.png');
    _game.load.image('transitionLogo', 'src/media/img/Menu.png');


  },
  nextState : function(nextState, musicA){
    var music = null;
    if (musicA != null){
      music = musicA.getMusic();
    }
    var background = _game.add.sprite(0, 0, 'transitionBackground');
    var logo = _game.add.sprite(184, 265, 'logo');
    if (music != null && music.isPlaying == true) {
      //music.onFadeComplete.dispatch();
      //music.fadeOut();
       music.fadeTo(500, 0);

      _game.time.events.add(2000, function() {
            music.stop();
             _game.state.start(nextState);
           }, _game);
    }
    else{
      _game.state.start(nextState);
    }
  }
}
})
