define(['Items', 'ColorEnum', 'SteamFactory'], function(Items, ColorEnum, SteamFactory) {
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
				this.parent.add(SteamFactory.create(this.x, this.y));
				//faudrait faire quelque chose pour éviter de créer de la fumée en boucle
				//this.kill();
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
