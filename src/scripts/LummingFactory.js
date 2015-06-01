define(function(){

	var Lumming = function(game, sprite, x, y, vitesseX, vision) {

		Phaser.Sprite.call(this, game, x, y, sprite, [1]);
		game.physics.arcade.enable(this);
		this.body.setSize(32, 32);

		this.body.collideWorldBounds = true;
		this.body.gravity.y = 300;

		this.body.velocity.x = vitesseX;
		this.animations.add('left', [4, 5, 6, 7], 10, true);
		this.animations.add('right',  [8, 9, 10, 11], 10, true);
		this.body.bounce.x = 1;
		this.vision = vision;
		this.frame = 0;
	}

	Lumming.prototype = Object.create(Phaser.Sprite.prototype);
	Lumming.prototype.constructor = Lumming;

	Lumming.prototype.update = function(){
		if (this.body.velocity.x > 0) {
			this.animations.play('right');
		} else {
			this.animations.play('left');
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
			_game.load.spritesheet('lumming_invisible','src/media/img/lumming_invisible.png', 32, 32 , 16);
		}
		,
		create : function(sprite, x, y, vitesseX, vision) {
			return (new Lumming(_game, sprite, x, y, vitesseX, vision));
		},
		
		Lumming : Lumming
		
	}
})
