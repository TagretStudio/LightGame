define(function(){
  var _game = null;

  var Music = function(key, url) {
    this.key = key;
    this.baseURL = '';
    this.url = url;

    _game.load.audio(this.key, this.url);
    _music = null;

  }
  Music.prototype= Object.create(Music.prototype);
  Music.prototype.constructor = Music;

  Music.prototype.play = function(){
    _music = _game.add.audio(this.key);
    _music.loop  = true;
    _music.play();

  }

  Music.prototype.stop = function(nextState){
    if (_music != null && _music.isPlaying == true) {
      _music.fadeOut(700);
      _music.onFadeComplete.dispatch();
      /*music.onFadeComplete.dispatch();*/
	_music.onFadeComplete.addOnce(function() {
	    this.state.start(this.nextState);
	}, this);
    }
  }
  return {
    init : function(game){
      _game= game;
    },
    create : function(key, urls) {
      return (new Music(key, urls));
    }

  }
})
