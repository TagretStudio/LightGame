define(['Items', 'VisionEnum'], function(Items, VisionEnum) {
	
	var _game = null;
	
	var Miroir = function(x, y, isVertical) {
		this.color = color;
		if (ColorEnum.getName(color) == ColorEnum.getColorEnum().RED
			|| ColorEnum.getName(color) == ColorEnum.getColorEnum().GREEN
			|| ColorEnum.getName(color) == ColorEnum.getColorEnum().BLUE) {
			this.isAdditive = true;
		} else {
			this.isAdditive = false;
		}
		
		this.spriteName = 'filter_' + ColorEnum.getName(color);
		Items.Item.call(this, this.spriteName, x, y);
		this.body.setSize(32, 32);
		this.animations.add('animFilter', [], 10, true);
		this.frame = 0;
	}
	
	Miroir.prototype = Object.create(Items.Item.prototype);
	Miroir.prototype.constructor = Filter;
	
	Miroir.prototype.update = function() {
		this.animations.play('animFilter');
	}
	
	Miroir.prototype.isVertical = function() {
		return this.isVertical;
	}
	
	return {
		init: function(game) {
			_game = game;
			Items.init(_game);
			_game.load.spritesheet('filter_blue', 'src/media/img/filter_blue.png', 32, 32, 11);
			_game.load.spritesheet('filter_cyan', 'src/media/img/filter_cyan.png', 32, 32, 11);
			_game.load.spritesheet('filter_green', 'src/media/img/filter_green.png', 32, 32, 11);
			_game.load.spritesheet('filter_magenta', 'src/media/img/filter_magenta.png', 32, 32, 11);
			_game.load.spritesheet('filter_red', 'src/media/img/filter_red.png', 32, 32, 11);
			_game.load.spritesheet('filter_yellow', 'src/media/img/filter_yellow.png', 32, 32, 11);
		},
		
		create: function(x, y, isVertical) {
			return (new Miroir(x, y, isVertical));
		},
		
		isVertical: function() {
			return isVertical();
		},
	}
	
})
