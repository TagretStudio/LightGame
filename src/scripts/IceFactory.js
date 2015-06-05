define(['Items'], function(Items) {
	var _game = null;

	var Ice = function(x, y) {
		Items.Item.call(this, 'ice', x, y);
	}

	Ice.prototype = Object.create(Items.Item.prototype);
	Ice.prototype.constructor = Ice;

	Ice.prototype.update = function(){
		//this.animations.play('???');
	}

	return {
		init : function(game){
			_game = game;
			Items.init(_game);
			_game.load.spritesheet('ice', 'media/img/Ice.png', 32, 32, 30);
		},
	
		create : function(x, y){
			return (new Ice(x, y));
		}
	}
})
