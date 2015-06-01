define(['./Images', './Musiques', 'MusicFactory', 'Transition'], function(Images, Musiques, MusicFactory, Transition){
	var _game = null;
	var _etapesuivante = null;

	var _prechargement = {

		init : function(){
			_game.scale.pageAlignHorizontally = true;


		},

		preload : function(){
			Images.init(_game);
			Images.boot().preload();
			MusicFactory.init(_game);
			Transition.init(_game);
			Musiques.init(_game);
			Musiques.getmaintheme().preload();
		}
				  ,
				  create : function(){
						Transition.nextState(_etapesuivante);
					//  _game.state.start(_etapesuivante);
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
