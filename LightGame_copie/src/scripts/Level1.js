BasicGame.Level1 = function (game){
	this.platforms = null;
	this.lums = null;
	this.doors = null;
};

BasicGame.Level1.prototype = {

	preload: function () {
		this.load.image('sky', 'src/media/img/sky.png');
		this.load.image('platform', 'src/media/img/platform.png');
		this.load.spritesheet('door', 'src/media/img/luming_cyan.png', 32, 32);
		this.load.spritesheet('lumming', 'src/media/img/luming_magenta.png', 32, 32);
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var sky = this.add.sprite(0, 0, 'sky');
		sky.scale.set(1024/800, 768/600);

		platforms = this.add.group();
		platforms.enableBody = true;
		{
			platforms.create(  0, 100, 'platform');
			platforms.create(300, 200, 'platform');
			platforms.create(600, 300, 'platform');
			platforms.create(900, 280, 'platform');
		}
		platforms.forEach(function(p){p.body.immovable=true});

		doors = this.add.group();
		doors.enableBody = true;
		var door;
		{
			door = doors.create(600, 270, 'door');
		}
		doors.forEach(function(door) {
			door.animations.add('anim', [8, 9, 10, 11], 10, true);
			door.animations.play('anim');
		});

		lums = this.add.group();
		var lum;
		{
			lum = lums.create(0, 0, 'lumming');
			this.physics.arcade.enable(lum); //WARNING noter que cette ligne là doit se trouver avant les accès à "body.velocity"
			lum.body.velocity.x = 100;
		}
		lums.forEach(function(lum) {
			lum.animations.add('left', [4, 5, 6, 7], 10, true);
			lum.animations.add('right',  [8, 9, 10, 11], 10, true);
			lum.body.gravity.y = 300;
			lum.body.bounce.x = 1;
		});

	},
	
	update: function () {
		this.physics.arcade.collide(lums, doors, mayExit, null, this);
		this.physics.arcade.collide(lums, platforms);

		lums.forEach(
			function(lum) {
				if (lum.body.velocity.x > 0) {
					lum.animations.play('right');
				} else if (lum.body.velocity.x < 0) {
					lum.animations.play('left');
				} else {
					lum.animations.stop();
				}
			}
		);

	}
};

// TODO quand on aura des classes de lummings, la collision porte/lummming dépendra de la couleur de chacun
// ça serait bien aussi une petite animation quand on gagne, plutôt que de passer direct au niveau suivant
function mayExit(lum, door) {
	lum.kill();
	//compter les lummings restants ici et s'il n'y en a plus, passer au niveau suivant
	this.state.start('Level2');
}