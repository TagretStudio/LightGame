define(['Images', 'LummingFactory', 'VisibleLummingFactory', 'ColorEnum', 'MusicFactory', 'PlatformFactory', 'DoorsFactory'],
	   function(Images, LummingFactory, VisibleLummingFactory, ColorEnum, MusicFactory, PlatformFactory, DoorsFactory) {
	var _game = null;
	var _nbLummingsV = 0;
	var _nbLummingsSaved = 0;
	var _etapesuivante = null;
	var _groupPlatforms = null;
	var _groupLum = null;
	       var _groupLol = null;
	var _groupDoors = null;
	var zizik = null;
	var text = null;
	var _level1 = {
//		var zizik = null;

		preload : function(){

			zizik = MusicFactory.create('level1', 'src/media/audio/Level 1.ogg');
		//	Lumming.init(_game);
			VisibleLummingFactory.init(_game);
			PlatformFactory.init(_game);
			DoorsFactory.init(_game);
		},
		create : function(){
			zizik.play();
			Images.boot().create();
		//	Musiques.getmaintheme().create();
			_game.physics.startSystem(Phaser.Physics.ARCADE);

			_groupPlatforms = _game.add.group();
			_groupPlatforms.enableBody = true;
			{
				platform1 = PlatformFactory.create(-200, 100, false);
				platform2 = PlatformFactory.create(100, 200, false);
				platform3 = PlatformFactory.create(400, 300, false);
				platform4 = PlatformFactory.create(700, 280, false);
			    //TEST DRAG&DROP
			    //platform5 = PlatformFactory.create(200, 300, false);
			    //platform5.inputEnabled = true;
			    //platform5.input.enableDrag();
			    //platform5.events.onDragStart.add(startDrag, _game);
			    //platform5.events.onDragStop.add(stopDrag, _game);
			    //

			}
			_groupPlatforms.add(platform1);
			_groupPlatforms.add(platform2);
			_groupPlatforms.add(platform3);
			_groupPlatforms.add(platform4);

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

			_groupDoors = _game.add.group();
			_groupDoors.enableBody = true;
			door1 = DoorsFactory.create(ColorEnum.getColorEnum().RED, 0, 570);
			door2 = DoorsFactory.create(ColorEnum.getColorEnum().YELLOW, 600, 570);
			_groupDoors.add(door1);
			_groupDoors.add(door2);


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
			text = _game.add.text(750, 0, _nbLummingsSaved+'/'+_nbLummingsV, {
        align: "center"
    });


			_groupLum.add(lum1);
			_groupLum.add(lum2);
			_groupLum.add(lum3);




			_game.startText = _game.add.text(0, 500, 'cliquez pour commencer', { fontSize: '32px', fill: '#000' });
			_game.input.onDown.add(function () {if(_game.paused) {_game.paused = false;_game.startText.text = '';}},_game);
			_game.paused = true;


		},
		update : function(){

			_game.physics.arcade.collide(_groupLum, _groupPlatforms);
			_game.physics.arcade.overlap(_groupLum, _groupDoors, mayExit, null, _game);
			_groupLum.forEach(
					function(p){
						p.update();
					}
					)
				_groupDoors.forEach(
					function(p){
						p.update();
					}
				)

			if (_nbLummingsV == _nbLummingsSaved) {
				_etapesuivante = 'MainMenu';
				zizik.stop(_etapesuivante);
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

	       //TEST DRAG&DROP
	       function startDrag() {
		   var initial = getLocalPosition(platform5, game);
	       }

	       function stopDrag() {
		   _game.physics.arcade.overlap(lum1, _groupLol, setInitialPosition, null, _game);
	       }

	       function setInitialPosition(lum) {
		   lum.position.x = 0;
		   lum.position.y = 0;
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
