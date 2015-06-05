define(['Items', 'ColorEnum'], function(Items, ColorEnum) {
	var _game = null;

	var Water = function(x, y) {
		Items.Item.call(this, 'water', x, y);
	}

	Water.prototype = Object.create(Items.Item.prototype);
	Water.prototype.constructor = Water;

	Water.prototype.update = function() {
		//this.animations.play('???');
	}

	Water.prototype.interact = function(lum) {
		switch (lum.color) {
			case ColorEnum.getColorEnum().MICRO:
				//faire de la vapeur ici
				this.kill();
				break;
		}
	}

	return {
		init : function(game) {
			_game = game;
			Items.init(_game);
			_game.load.image('water', 'media/img/Water.png');
		},

		create : function(x, y) {
			return (new Water(x, y));
		}
	}
})
