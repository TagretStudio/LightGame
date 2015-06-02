define(['Items', 'ColorEnum'], function(Items, ColorEnum) {
	
	var _game = null;
	
	var Filter = function(color, x, y) {
		this.color = color;
		
		this.spriteName = 'filter_' + ColorEnum.getName(color);
		Items.Item.call(this, this.spriteName, x, y);
		this.body.setSize(32, 32);
		this.animations.add('animFilter', [], 10, true);
		this.frame = 0;
	}
	
	Filter.prototype = Object.create(Items.Item.prototype);
	Filter.prototype.constructor = Filter;
	
	Filter.prototype.update = function() {
		this.animations.play('animFilter');
	}
	
	return {
		init: function(game) {
			_game = game;
			Items.init(_game);
			_game.load.spritesheet('filter_blue', 'media/img/filter_blue.png', 32, 32, 11);
			_game.load.spritesheet('filter_cyan', 'media/img/filter_cyan.png', 32, 32, 11);
			_game.load.spritesheet('filter_green', 'media/img/filter_green.png', 32, 32, 11);
			_game.load.spritesheet('filter_magenta', 'media/img/filter_magenta.png', 32, 32, 11);
			_game.load.spritesheet('filter_red', 'media/img/filter_red.png', 32, 32, 11);
			_game.load.spritesheet('filter_yellow', 'media/img/filter_yellow.png', 32, 32, 11);
		},
		
		create: function(color, x, y) {
			return (new Filter(color, x, y));
		}
	}
	
})