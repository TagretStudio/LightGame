define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory', 'DoorsFactory', 'MenuFactory', 'VisionEnum', 'Transition', 'Reglette', 'FilterFactory'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory, DoorsFactory, MenuFactory,VisionEnum, Transition, Reglette, FilterFactory) {
	var _game = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _etapesuivante = null;
	var _groupPlatforms = null;
	var _groupLum = null;
	var _groupLol = null;
	var _groupFilter = null;
	var _groupDoors = null;
	var _music = null;
	var text = null;
	var menuBlack = null;
	var _currentVision = null;
	var reglette;
	var _level1 = {

		preload : function(){

			_music = MusicFactory.create('level1', 'media/audio/Level 1.ogg');
		//	Lumming.init(_game);
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
			DoorsFactory.init(_game);
		    MenuFactory.init(_game);
			Reglette.init(_game);
		},
		create : function(){
			_nbLummingsSaved = 0;

			_music.play();
			Images.boot().create();
			_currentVision = VisionEnum.getVisionEnum().VISIBLE;
			_game.physics.startSystem(Phaser.Physics.ARCADE);

			_groupPlatforms = _game.add.group();
			_groupPlatforms.enableBody = true;
			{
				platform1 = PlatformFactory.create(-200, 100, false);
				platform2 = PlatformFactory.create(100, 200, false);
				platform3 = PlatformFactory.create(400, 300, false);
				platform4 = PlatformFactory.create(700, 280, false);
			    platform5 = PlatformFactory.create(0, 504, false);
			    platform6 = PlatformFactory.create(400, 504, false);

			}
			_groupPlatforms.add(platform1);
			_groupPlatforms.add(platform2);
			_groupPlatforms.add(platform3);
			_groupPlatforms.add(platform4);
		    _groupPlatforms.add(platform5);
		    _groupPlatforms.add(platform6);

		    //TEST DRAG&DROP
		    	_groupLol = _game.add.group();
			_groupLol.enableBody = true;
		    lol1 = PlatformFactory.create(-200, 100, false);
		    lol2 = PlatformFactory.create(100, 200, false);
		    lol3 = PlatformFactory.create(400, 300, false);
		    lol4 = PlatformFactory.create(700, 280, false);
		    _groupLol.add(lol1);
		    _groupLol.add(lol2);
		    _groupLol.add(lol3);
		    _groupLol.add(lol4);

		    //TEST MENU
		    menuBlack = MenuFactory.create(1);
			reglette = Reglette.create();

			_groupDoors = _game.add.group();
			_groupDoors.enableBody = true;
			door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 0, 470);
			door2 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 600, 470);
		    //TEST DRAG&DROP AVANCE
		    door3 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 620, 536);
		    door3.inputEnabled = true;
		    door3.input.enableDrag();
		    door3.events.onDragStart.add(doorDragStart, _game);
		    door3.events.onInputUp.add(doorDragStop, _game);
			_groupDoors.add(door1);
			_groupDoors.add(door2);
		    _groupDoors.add(door3);

			_groupLum = _game.add.group();

			lum1 = VisibleLummingFactory.create(ColorEnum.getColorEnum().RED, 0, 0, 0);
		    //TEST DRAG&DROP
		    lum1.inputEnabled = true;
		    lum1.input.enableDrag();
		    lum1.events.onDragStop.add(stopDrag, _game);
		    //
			lum2 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 100, 0, -200);
			lum3 = VisibleLummingFactory.create(ColorEnum.getColorEnum().YELLOW, 500, 0, -100);
			 _nbLummingsV = 3;
			text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {align: "center"});


			_groupLum.add(lum1);
			_groupLum.add(lum2);
			_groupLum.add(lum3);

			_game.startText = _game.add.text(0, 450, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;_game.startText.text = '';}},_game);
			_game.paused = true;


		},
		update : function(){

			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
			_game.physics.arcade.overlap(_groupLum, _groupFilter, changeColor, null, _game);
			_groupLum.forEach(
				function(p){
					p.update(_currentVision);
				})
			reglette.update();
			_groupDoors.forEach(
				function(p){
					p.update();
				})

			if (_nbLummingsV == _nbLummingsSaved) {
				Transition.nextState('MainMenu', _music);
			}
		}

	}

	function mayExit(lum, door){
		var exit = lum.collideWithDoor(door);
		if (exit == 1){
			_nbLummingsSaved = _nbLummingsSaved +1;
			text.setText( _nbLummingsSaved + '/'+ _nbLummingsV);
		}
	}
	
	function changeColor(lum, filter) {
		lum.collideWithFilter(filter);
	}

	       //TEST DRAG&DROP

	       function stopDrag() {
		   _game.physics.arcade.overlap(lum1, _groupLol, setInitialPosition, null, _game);
	       }

	       function setInitialPosition(lum) {
		   lum.position.x = 0;
		   lum.position.y = 0;
	       }
	       //

		    //TEST DRAG&DROP AVANCE
		    function doorDragStart(door) {
			door.body.immovable = false;
			//Diminuer le compteur
		    }
		    
		    function doorDragStop(door) {
			if (_game.physics.arcade.overlap(door, menuBlack, getBack, null, _game)) {
			    //Incrémenter le compteur
			    door.setTo(620, 536);
			} else {
			    door.body.immovable = true;
			    door.input.disableDrag();
			}
		    }
		    //

	return{
		init : function(game, etapesuivante){
			_game = game;
			_etapesuivante = etapesuivante;
		},
		getLevel1 : function(){
			return _level1;
		}
	}

})
