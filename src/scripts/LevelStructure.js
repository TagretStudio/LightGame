define(['PlatformFactory', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'DoorsFactory'],
	   function(PlatformFactory, LummingFactory, VisibleLummingFactory, ColorEnum,
				DoorsFactory) {
	
	var _game = null;
	
	var LevelStructure = function(indexLevel) {
		this.indexLevel = indexLevel;
		
		this.groupPlatforms = _game.add.group();
		this.groupLummings = _game.add.group();
		this.groupDoors = _game.add.group();

		this.groupPlatforms.enableBody = true;
		this.groupDoors.enableBody = true;
		
		this.height = 600;
		this.width = 800;
		
		switch (_indexLevel) {
			case 1:

				break;
			
		}
	}
	
	LevelStructure.prototype.getHeigth = function() {
		return this.height;
	}
	
	LevelStructure.prototype.getWidth = function() {
		return this.width;
	}
	
	LevelStructure.prototype.getPlatforms = function() {
		return this.groupPlatforms;
	}
	
	LevelStructure.prototype.getLummings = function() {
		return this.groupLummings;
	}
	
	LevelStructure.prototype.getDoors = function() {
		return this.groupDoors;
	}
	
	return {
		init: function(game) {
			_game = game;
		},
		
		create: function(indexLevel) {
			return (new LevelStructure(indexLevel));
		}
	}
})