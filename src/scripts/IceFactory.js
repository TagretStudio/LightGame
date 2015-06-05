define(['Items', 'ColorEnum'], function(Items, ColorEnum) {
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
