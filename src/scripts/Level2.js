BasicGame.Level2 = function (game){
	this.platforms = null;
	this.white_lums = null;
	this.blue_lums = null;
	this.blue_doors = null;
	this.blue_filters = null;
};

BasicGame.Level2.prototype = {

	preload: function () {
		this.load.image('sky', 'src/media/img/sky.png');
		this.load.image('platform', 'src/media/img/platform.png');
		this.load.spritesheet('blue_door', 'src/media/img/door_blue.png', 32, 32);
		this.load.spritesheet('white_lumming', 'src/media/img/lumming_white.png', 32, 32);
		this.load.spritesheet('blue_lumming', 'src/media/img/lumming_blue.png', 32, 32);
		this.load.spritesheet('blue_filter', 'src/media/img/filter_blue.png', 32, 32);

		if (music != null && music.isPlaying == true) {
			music.fadeOut(700);
		}
		music = this.add.audio('game_over_music');
		music.loop = true;
		music.play();
	},

	create: function () {
		this.physics.startSystem(Phaser.Physics.ARCADE);

		var sky = this.add.sprite(0, 0, 'sky');
		sky.scale.set(1024/800, 768/600);

		platforms = this.add.group();
		platforms.enableBody = true;
		{
			platforms.create(  0-200, 100, 'platform');
			platforms.create(300-200, 200, 'platform');
			platforms.create(600-200, 300, 'platform');
			platforms.create(900-200, 280, 'platform');
			platforms.create(200-200, 280, 'platform');
		}
		platforms.forEach(function(p){p.body.immovable=true});

		blue_doors = this.add.group();
		blue_doors.enableBody = true;
		var door;
		{
			door = blue_doors.create(700-200, 270, 'blue_door');
		}
		blue_doors.forEach(function(door) {
			door.animations.add('anim', [], 10, true);
			door.animations.play('anim');
		});

		var lum;

		white_lums = this.add.group();
		{
			lum = white_lums.create(0, 0, 'white_lumming');
			this.physics.arcade.enable(lum); //WARNING noter que cette ligne là doit se trouver avant les accès à "body.velocity"
			lum.body.velocity.x = 100;
		}
		white_lums.forEach(function(lum) {
			lum.animations.add('left', [4, 5, 6, 7], 10, true);
			lum.animations.add('right',  [8, 9, 10, 11], 10, true);
			lum.body.gravity.y = 300;
			lum.body.bounce.x = 1;
		});

		blue_lums = this.add.group();
		//vide pour l'instant mais un lumming blanc peut devenir bleu
		
		blue_filters = this.add.group();
		blue_filters.enableBody = true;

		var filter;
		{
			filter = blue_filters.create(600-200, 270, 'blue_filter');
		}
		blue_filters.forEach(function(filter) {
			filter.animations.add('anim', [], 10, true);
			filter.animations.play('anim');
		});

	},
	
	update: function () {
		this.physics.arcade.collide(blue_lums, blue_doors, mayExit, null, this);
		this.physics.arcade.overlap(white_lums, blue_filters, toBlue, null, this);
		this.physics.arcade.collide(white_lums, platforms);
		this.physics.arcade.collide(blue_lums, platforms);

		white_lums.forEach(lumAnim);
		blue_lums.forEach(lumAnim);
	}
};

function lumAnim(lum) {
	if (lum.body.velocity.x > 0) {
		lum.animations.play('right');
	} else if (lum.body.velocity.x < 0) {
		lum.animations.play('left');
	} else {
		lum.animations.stop();
	}
}

function toBlue(lum, filter) {
	var newlum = blue_lums.create(lum.body.position.x, lum.body.position.y, 'blue_lumming');
	this.physics.arcade.enable(newlum); //WARNING noter que cette ligne là doit se trouver avant les accès à "body.velocity"
	newlum.body.velocity.x = lum.body.velocity.x;
	newlum.body.velocity.y = lum.body.velocity.y;
	newlum.animations.add('left', [4, 5, 6, 7], 10, true);
	newlum.animations.add('right',  [8, 9, 10, 11], 10, true);
	newlum.body.bounce.x = 1;
	lum.kill();
}

// TODO quand on aura des classes de lummings, la collision porte/lummming dépendra de la couleur de chacun
// ça serait bien aussi une petite animation quand on gagne, plutôt que de passer direct au niveau suivant
// ALL CAPS !!!!!11!11!1!1111!1!!!!!one!!!!!!eleven!!11!1
// LA FONCTION MAYEXIT EST DEJA DEFINIE DANS LEVEL1, D'OU CONFLITS ET PROBLEMES
//function mayExit(lum, door) {
//	lum.kill();
//	//compter les lummings restants ici et s'il n'y en a plus, passer au niveau suivant
//	this.state.start('Boot');
//}