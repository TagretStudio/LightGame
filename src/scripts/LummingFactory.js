define(['VisionEnum'], function(VisionEnum) {

//	var _defaultVision = null;

	var Lumming = function(game, sprite, x, y, vitesseX, vision) {

		this.defaultVision = vision;
		Phaser.Sprite.call(this, game, x, y, sprite, [1]);
		game.physics.arcade.enable(this);
		this.body.setSize(32, 32);

		this.body.collideWorldBounds = true;
		this.body.gravity.y = 300;

		this.body.velocity.x = vitesseX;
		this.animations.add('left', [4, 5, 6, 7], 10, true);
		this.animations.add('right',  [8, 9, 10, 11], 10, true);
		this.animations.add('left_invisible', [20, 21, 22, 23], 10, true);
		this.animations.add('right_invisible', [24, 25, 26, 27], 10, true);
		this.body.bounce.x = 1;
		this.frame = 0;
	}

	Lumming.prototype = Object.create(Phaser.Sprite.prototype);
	Lumming.prototype.constructor = Lumming;

	Lumming.prototype.getDefautVision = function(){
		return this.defaultVision;
	}
	

	Lumming.prototype.update = function() {
		if (VisionEnum.getVisionCurrent() == this.defaultVision) {

			if (this.body.velocity.x > 0) {
				this.animations.play('right');
			} else {
				this.animations.play('left');
			}
		} else {
			if (this.body.velocity.x > 0) {
				this.animations.play('right_invisible');
			} else {
				this.animations.play('left_invisible');
			}
		}
	    if (this.position.y > 504) {
		this.kill();
	    }
	}

	Lumming.prototype.collide = function(game, objet) {
		game.physics.arcade.collide(this, objet);
	}

	return{
		init : function(game) {
			_game = game;
		}
		,
		create : function(sprite, x, y, vitesseX, vision) {
			return (new Lumming(_game, sprite, x, y, vitesseX, vision));
		},

		Lumming : Lumming

	}
})
