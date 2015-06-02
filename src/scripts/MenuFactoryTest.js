define(['VisionEnum','ColorEnum', 'DoorsFactory'], function(VisionEnum,ColorEnum, DoorsFactory) {
	var _game = null;
	var regX = 64; // coordonnee X du MILIEU de la reglette
	var regdist = 64;
	var regY = null;// _game.world.height-64-16;
  var _groupItem = null;

	var Menu = function(){
		this.vision = null;
		this.spriteTempo = null;
    _groupItem = _game.add.group();
    _groupItem.enableBody = true;
		this.barre = _game.add.sprite(0,	_game.world.height-96, 'menuB');
		this.reglette = _game.add.sprite(regX, regY, 'Reg');
		this.reglette.inputEnabled = true;
		this.reglette.input.enableDrag();
		this.reglette.input.allowVerticalDrag = false;
		this.reglette.held = false;

		this.groupVisible = _game.add.group();
		this.groupInfra = _game.add.group();
		this.groupSupra = _game.add.group();

		//infra

		//plomb
		plombCarre = _game.add.sprite(470, 536, 'plombCarre');
		this.groupInfra.add(plombCarre);
		plombVertical = _game.add.sprite(510, 536, 'plombVertical');
		this.groupInfra.add(plombVertical);
		plombHorizontal = _game.add.sprite(550, 536, 'plombHorizontal');
		this.groupInfra.add(plombHorizontal);


		//mirroirs
		miroirH = _game.add.sprite(660, 536, 'mirroirH');
		miroirH.inputEnabled = true;
		miroirH.input.enableDrag();
		//  this.groupInfra.add(miroirH);
		//  this.groupSupra.add(miroirH);
		//  this.groupVisible.add(miroirH);

		miroirV = _game.add.sprite(700, 536, 'mirroirV');
		miroirV.inputEnabled = true;
		miroirV.input.enableDrag();


		//  this.groupInfra.add(miroirV);
		//  this.groupSupra.add(miroirV);
		//  this.groupVisible.add(miroirV);
		//supra

		//antenes
		aerialRight = _game.add.sprite(410, 536, 'aerialRight');
		aerialLeft = _game.add.sprite(170, 536, 'aerialLeft');
		this.groupSupra.add(aerialLeft);
		this.groupSupra.add(aerialRight);



		//visibles

		red = _game.add.sprite(230, 536, 'red');
		blue = _game.add.sprite(310, 536, 'blue');
		green = _game.add.sprite(270, 536, 'green');
		magenta = _game.add.sprite(470, 536, 'magenta');
		cyan = _game.add.sprite(510, 536, 'cyan');


		yellow = _game.add.sprite(550, 536, 'yellow');
		this.groupVisible.add(red);
		this.groupVisible.add(blue);
		this.groupVisible.add(green);
		this.groupVisible.add(cyan);
		this.groupVisible.add(magenta);
		this.groupVisible.add(yellow);

		this.groupInfra.addAll('draggable', false)
		this.groupInfra.forEach(
			function(p){
				if (!p.draggable) {
					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
          dragcopy.exists = false;
					p.exists = false;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;
				}
			}
		)

		this.groupSupra.addAll('draggable', false)
		this.groupSupra.forEach(
			function(p){
				if (!p.draggable) {
					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
          dragcopy.exists = false;
					p.exists = false;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;
				}
			}
		)

		this.groupVisible.addAll('draggable', false)
		this.groupVisible.forEach(
			function(p){
				if (!p.draggable) {
					var dragcopy = _game.add.sprite(p.x, p.y, p.key);
					p.parent.add(dragcopy);
					dragcopy.draggable = true;
          dragcopy.exists = true;
					p.exists = true;
					p.inputEnabled = true;
					p.input.enableDrag();
					p.events.onDragStart.add(Menu.prototype.dragStart, this, p);
					p.events.onDragStop.add(Menu.prototype.dragStop, this, p);
					p.origX = p.x;
					p.origY = p.y;
				}
			}
		)

		this.state = 'visible';

	}
	Menu.prototype.constructor = Menu;
	Menu.prototype = Object.create(Phaser.Sprite.prototype);

	Menu.prototype.dragStart  = function(sprite){
		/*
		//this.toVisible();
		//   aux = sprite;
		this.spriteTempo = _game.add.sprite(sprite.x, sprite.y, sprite.key);
		this.spriteTempo.inputEnabled = true;
		this.spriteTempo.input.enableDrag();
		this.spriteTempo.events.onDragStart.add(Menu.prototype.dragStart, this, this.spriteTempo);
		this.spriteTempo.events.onDragStop.add(Menu.prototype.dragStop, this, this.spriteTempo);
		// this.spriteTempo.moveDown();
		sprite.bringToTop();
		// sprite = this.spriteTempo();
		// this.spriteTempo = aux;
		//sprite.destroy();
		//   this.destroy();
		*/
	}

	Menu.prototype.dragStop  = function(sprite){
		/*
		//this.toVisible();
		aux = sprite;
		sprite = this.spriteTempo;
		sprite.moveUp();
		aux.destroy();
		// this.spriteTempo = _game.add.sprite(sprite.x, sprite.y, sprite.key);
		//sprite.destroy();
		//   this.destroy();
		*/
	    if (sprite.y >= _game.world.height - 96 - 32) {
		sprite.x = sprite.origX;
		sprite.y = sprite.origY;
	    } else {
	//	created = _game.add.sprite(sprite.x, sprite.y, sprite.key);
    door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, sprite.x, sprite.y);
    _groupItem.add(door1);


		sprite.x = sprite.origX;
		sprite.y = sprite.origY;
	    }
	}

	Menu.prototype.update = function(){

		var rX = this.reglette.x;
		var oldstate = this.state;
		if (!this.reglette.input.isDragged) {
			if (rX < regX-regdist/3) {
				this.state = 'infra';
				rX += ((regX-regdist*2/3)-rX)/4;
			} else if (rX > regX+regdist/3) {
				this.state = 'supra';
				rX += ((regX+regdist*2/3)-rX)/4;
			} else {
				this.state = 'visible';
				rX += (regX-rX)/4;
			}
		}
		this.reglette.x = rX;
		if (oldstate != this.state){
			if (this.state == 'infra') {
				this.toInfra();
			    VisionEnum.setVisionCurrent(1);
			} else if (this.state == 'visible') {
				this.toVisible();
			    VisionEnum.setVisionCurrent(2);
				//code passTo le truc à le milieu
			} else {
				this.toSupra();
			    VisionEnum.setVisionCurrent(3);
				//code passTo le truc à droite
			}
		}
	}

	Menu.prototype.toInfra = function(){
		this.groupVisible.forEach(
				function(p){
					p.exists = false;
				}
				)
			this.groupSupra.forEach(
					function(p){
						p.exists = false;
					})
		this.groupInfra.forEach(
				function(p){
					p.exists = true;
				}
				)
	}

	Menu.prototype.toSupra = function(){

		this.groupVisible.forEach(
				function(p){
					p.exists = false;
				}
				)

			this.groupInfra.forEach(
					function(p){
						p.exists = false;
					}
					)
			this.groupSupra.forEach(
					function(p){
						p.exists =true;
					})
	}

	Menu.prototype.toVisible = function(){

		this.groupInfra.forEach(
				function(p){
					p.exists = false;
				}
				)

			this.groupSupra.forEach(
					function(p){
						p.exists = false;
					})
		this.groupVisible.forEach(
				function(p){
					p.exists = true;
				}
				)
	}

   return {
     init : function(game){

       _game = game;
       regY = _game.world.height-64-16;
       DoorsFactory.init(_game);

       _game.load.image('menuB', 'media/img/simpleMenu.png');

       _game.load.image('Reg', 'media/img/Reglette.png');
       //filtres aditifs
       _game.load.image('red', 'media/img/filterRedMenu.png');
       _game.load.image('green', 'media/img/filterGreenMenu.png');
       _game.load.image('blue', 'media/img/filterBlueMenu.png');

       //filtres sustractifs
       _game.load.image('magenta', 'media/img/filterMagentaMenu.png');
       _game.load.image('cyan', 'media/img/filterCyanMenu.png');
       _game.load.image('yellow', 'media/img/filterYellowMenu.png');

       //mirroirs
       _game.load.image('mirroirV', 'media/img/mirroirVertical.png');
       _game.load.image('mirroirH', 'media/img/mirroirOrizontal.png');

       //antenes
       _game.load.image('aerialLeft', 'media/img/aerialLeft.png');
       _game.load.image('aerialRight', 'media/img/aerialRight.png');

       //plomb
       _game.load.image('plombCarre', 'media/img/plombCarre.png');
       _game.load.image('plombHorizontal', 'media/img/plombOrizontal.png');
       _game.load.image('plombVertical', 'media/img/plombVertical.png');
     },
     create : function(){
       return (new Menu());
     },

     getGroupItem : function(){
       return _groupItem;
     }
   }
 })
