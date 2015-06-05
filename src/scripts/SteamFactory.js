define(['Items', 'ColorEnum'], function(Items, ColorEnum) {
	var _game = null;

	var Steam = function(x, y) {
		Items.Item.call(this, 'steam', x, y);
	}

	Steam.prototype = Object.create(Items.Item.prototype);
	Steam.prototype.constructor = Steam;

	Steam.prototype.update = function() {
		//this.animations.play('???');
	}

	Steam.prototype.interact = function(lum) {
		lum.body.velocity.y = Math.max(lum.body.velocity.y-10, -300);
	}

	return {
		init : function(game) {
			_game = game;
			Items.init(_game);
			_game.load.image('steam', 'media/img/Steam.png');
		},

		create : function(x, y) {
			return (new Steam(x, y));
		}
	}
})
