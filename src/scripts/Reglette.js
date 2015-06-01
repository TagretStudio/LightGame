define([], function() {

	var _game = null;
	var reglette;
	var regdist = 128;
	var regX = 128; // coordonnee X du MILIEU de la reglette
	var regY = 0;
	var RM1; //menu reglette 1
	var RM2;
	var RM3;
	var regBounds;

	var Reglette = function() {
		Phaser.Sprite.call(this, _game, 0, 0, 'Reg');

		reglette = _game.add.sprite(regX, regY, 'Reg');
		reglette.inputEnabled = true;
		reglette.input.enableDrag();
		reglette.input.allowVerticalDrag = false;
		reglette.held = false;
		RM1 = _game.add.group();
		{
			RM1.create(10, _game.world.height, 'Reg');
		} RM1.forEach(Reglette.prototype.hiddenPos);
		RM2 = _game.add.group();
		{
			RM2.create(50, _game.world.height, 'Reg');
		} RM2.forEach(Reglette.prototype.hiddenPos);
		RM3 = _game.add.group();
		{
			RM3.create(90, _game.world.height, 'Reg');
		} RM3.forEach(Reglette.prototype.hiddenPos);
	}

	Reglette.prototype = Object.create(Phaser.Sprite.prototype);
	Reglette.prototype.constructor = Reglette;

	Reglette.prototype.update = function() {
		var rX = reglette.x;
		if (!reglette.input.isDragged) {
			if (rX < regX-regdist/3) {
				RM1.forEach(Reglette.prototype.deployedPos);
				RM2.forEach(Reglette.prototype.hiddenPos);
				RM3.forEach(Reglette.prototype.hiddenPos);
				rX += ((regX-regdist*2/3)-rX)/4;
			} else if (rX > regX+regdist/3) {
				RM1.forEach(Reglette.prototype.hiddenPos);
				RM2.forEach(Reglette.prototype.hiddenPos);
				RM3.forEach(Reglette.prototype.deployedPos);
				rX += ((regX+regdist*2/3)-rX)/4;
			} else {
				RM1.forEach(Reglette.prototype.hiddenPos);
				RM2.forEach(Reglette.prototype.deployedPos);
				RM3.forEach(Reglette.prototype.hiddenPos);
				rX += (regX-rX)/4;
			}
		}
		reglette.x = rX;
	
		RM1.forEach(Reglette.prototype.moveIfNeeded);
		RM2.forEach(Reglette.prototype.moveIfNeeded);
		RM3.forEach(Reglette.prototype.moveIfNeeded);
		/*
		*/
	};

	Reglette.prototype.hiddenPos = function(b) {
		b.wishedPos = _game.world.height;
	}
	
	Reglette.prototype.deployedPos = function(b) {
		b.wishedPos = 0;
	}
	
	Reglette.prototype.moveIfNeeded = function(b) {
		b.y += (b.wishedPos-b.y)/4;
	}

	return {
		init: function(game) {
			_game = game;
			_game.load.image('Reg', 'src/media/img/lumming_yellow.png');
		},
	
		create: function() {
			return (new Reglette());
		}
	}
})
