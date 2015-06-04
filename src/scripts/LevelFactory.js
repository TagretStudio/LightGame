 define(['LevelStructure'], function(LevelStructure) {
	
	var _game = null;
	
	var LevelFactory = function() {
		
		this.levelStruct = LevelStructure.create(indexLevel);
		
	}
	
	LevelFactory.prototype.changeLevel = function(indexLevel) {
		delete this.levelStruct;
		this.levelStruct = LevelStructure.create(indexLevel);
	}
	
	return {
		init: function(game) {
			_game = game;
			LevelFactory.init(_game);
		}
	}
	
 })