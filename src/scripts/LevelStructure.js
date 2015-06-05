define(['PlatformFactory', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum',
		'DoorsFactory', 'XLummingFactory', 'MicroLummingFactory', 'IceFactory'],
	   function(PlatformFactory, LummingFactory, VisibleLummingFactory, ColorEnum,
				DoorsFactory, XLummingFactory, MicroLummingFactory, IceFactory) {
	
	var _game = null;
	
	var LevelStructure = function(indexLevel) {
		this.indexLevel = indexLevel;
		
		this.groupPlatforms = _game.add.group();
		this.groupLummings = _game.add.group();
		this.groupDoors = _game.add.group();
		this.groupElements = _game.add.group();

		this.groupPlatforms.enableBody = true;
		this.groupDoors.enableBody = true;
		
		this.nbLummingsWin = 1;
		this.tabAvailableObjects = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];

		
		switch (indexLevel) {
			case 1:
				platform1 = PlatformFactory.create(100, 300, false);
				platform2 = PlatformFactory.create(300, 300, false);
				this.groupPlatforms.add(platform1);
				this.groupPlatforms.add(platform2);
	
				door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
				door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
				this.groupDoors.add(door1);
				this.groupDoors.add(door2);
	
				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);
				
				this.nbLummingsWin = 2;
				
				//X
				lumX = XLummingFactory.create(250, 200, 50);
				this.groupLummings.add(lumX);
				lumM = MicroLummingFactory.create(200, 200, 50);
				this.groupLummings.add(lumM);
				this.groupElements.add(IceFactory.create(400, 290));

				this.tabAvailableObjects = [1,2,3,4,5,6,7,8,9,10,11,12,13];
				
				break;

			case 2:
				platform(this.groupPlatforms, 100, 300, 600);
	
				door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 500, 270);
				door2 = DoorsFactory.create(ColorEnum.getColorEnum().BLUE, 400, 270);
				this.groupDoors.add(door1);
				this.groupDoors.add(door2);
	
				lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 150, 200, 50);
				lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().BLUE, 100, 200, 50);
				this.groupLummings.add(lum1);
				this.groupLummings.add(lum2);
				
				this.nbLummingsWin = 2;
				
				this.tabAvailableObjects = [1,2,3,4,5,6,7,8,9,10,11,12,13];

				break;
			
			default:
				break;
			
		}
		
		this.groupPlatforms.forEach(
			function(p) {
				p.body.immovable = true;
				p.body.immovable = true;
				p.body.checkCollision.down = false;
				p.body.checkCollision.left = false;
				p.body.checkCollision.right = false;
				p.body.checkCollision.up = true;
			}
		);
	}

	platform = function(groupPlatforms, x, y, w) {
		var dummy = _game.add.sprite(0,0,'platforms',1);
		var sw = dummy.width;
		dummy.kill();
		var p;
		for (var i=0; i< Math.floor(Math.floor(w/sw)/2)+1; i++) {
			p = _game.add.sprite(x + w/2 - i*sw, y,'platforms',6);
			groupPlatforms.add(p);
			p.anchor.set(0,0);
			p = _game.add.sprite(x + w/2 + i*sw, y,'platforms',6);
			groupPlatforms.add(p);
			p.anchor.set(1,0);
		}
		p = _game.add.sprite(x,y,'platforms',4);
		groupPlatforms.add(p);
		p = _game.add.sprite(x+w,y,'platforms',2);
		groupPlatforms.add(p);
		p.anchor.set(1,0);
	}
	
	LevelStructure.prototype.getPlatforms = function() {
		return this.groupPlatforms;
	}

	LevelStructure.prototype.getElements = function() {
		return this.groupElements;
	}
	
	LevelStructure.prototype.getLummings = function() {
		return this.groupLummings;
	}
	
	LevelStructure.prototype.getDoors = function() {
		return this.groupDoors;
	}
	
	LevelStructure.prototype.getNbLummingsWin = function() {
		return this.nbLummingsWin;
	}
	
	LevelStructure.prototype.getTabAvailableObjects = function() {
		return this.tabAvailableObjects;
	}
	
	return {
		init: function(game) {
			_game = game;
			_game.load.spritesheet('platforms', 'media/img/tiles3.png',32,32);
		},
		
		create: function(indexLevel) {
			return (new LevelStructure(indexLevel));
		}
	}
})