define(['Items', 'ColorEnum', 'WaterFactory'], function(Items, ColorEnum, WaterFactory) {
	var _game = null;

	var Ice = function(x, y) {
		Items.Item.call(this, 'ice', x, y);
	}

	Ice.prototype = Object.create(Items.Item.prototype);
	Ice.prototype.constructor = Ice;

	Ice.prototype.update = function() {
		//this.animations.play('???');
	}

	Ice.prototype.interact = function(lum) {
		switch (lum.color) {
			case ColorEnum.getColorEnum().X:
				var water;
				this.parent.add(water = WaterFactory.create(this.x, this.y));
				water.width = this.width;
				this.kill();
				break;
		}
	}

	return {
		init : function(game) {
			_game = game;
			Items.init(_game);
			_game.load.image('ice', 'media/img/Ice.png');
		},

		create : function(x, y) {
			return (new Ice(x, y));
		}
	}
})
