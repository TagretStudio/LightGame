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
				
				platform1 = PlatformFactory.create(100, 300, false);
				platform2 = PlatformFactory.create(300, 300, false);
				_groupPlatforms.add(platform1);
				_groupPlatforms.add(platform2);
	
				door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
				door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
				_groupDoors.add(door1);
				_groupDoors.add(door2);
	
				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
				_groupLum.add(lum1);
				_groupLum.add(lum2);
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