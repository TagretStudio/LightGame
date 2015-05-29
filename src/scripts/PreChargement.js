define(['./Images', './Musiques', 'MusicFactory'], function(Images, Musiques, MusicFactory){
	var _game = null;
	var _etapesuivante = null;

	var _prechargement = {

		preload : function(){
			Images.init(_game);
			Images.boot().preload();
			MusicFactory.init(_game);

			Musiques.init(_game);
			Musiques.getmaintheme().preload();
		}
				  ,
				  create : function(){
					  _game.state.start(_etapesuivante);
				  }

	}

	return {
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		}
			   ,
			   getPreChargement : function(){
				   return _prechargement;
			   }
	}
})
