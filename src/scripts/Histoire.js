define(['Transition', 'MainMenu', 'Images', 'MusicFactory'],
       function(Transition, MainMenu, Images, MusicFactory) {

    var _game = null;
    var _etapesuivante = null;
    var _music = null;

    var bg = null;
    var prism;
    var master = null;
    var lums = null;
    var nblums = null;
    var updateFunction = null;

    var text = null;

    var _histoire = {
        preload : function(){
            _game.load.image('bg', 'media/img/sky.png');
            _game.load.image('prism', 'media/img/prisme.png');

            _game.load.spritesheet('lumming_blue', 'media/img/lumming_blue.png', 32, 32, 32);
            _game.load.spritesheet('lumming_cyan', 'media/img/lumming_cyan.png', 32, 32, 32);
            _game.load.spritesheet('lumming_green', 'media/img/lumming_green.png', 32, 32, 32);
            _game.load.spritesheet('lumming_magenta', 'media/img/lumming_magenta.png', 32, 32, 32);
            _game.load.spritesheet('lumming_red', 'media/img/lumming_red.png', 32, 32, 32);
            _game.load.spritesheet('lumming_white', 'media/img/lumming_white.png', 32, 32, 32);
            _game.load.spritesheet('lumming_yellow', 'media/img/lumming_yellow.png', 32, 32, 32);

            _game.load.image('exclamation', 'media/img/exclamation.png');
  		},

  		create : function(){
            bg = _game.add.sprite(0, 0, 'bg');

            prism = _game.add.sprite(_game.world.width, _game.world.centerY, 'prism');
            prism.anchor.set(0, 0.5);
            prism.velocity = 10;

            master = _game.add.sprite(_game.world.centerX, 0, 'lumming_blue', 0);
            master.anchor.set(0.5, 0.5);
            master.tint = 0;
            master.animations.add('walk', [0, 1, 2, 1], 10, true);
            master.animations.play('walk');
            master.exclamation = _game.add.sprite(0, 0, 'exclamation');
            master.exclamation.anchor.set(0.5, 0.5);
            master.exclamation.alpha = 0;

            lums = _game.add.group();
            lums.create(0,0, 'lumming_blue', 0);
            lums.create(0,0, 'lumming_cyan', 0);
            lums.create(0,0, 'lumming_green', 0);
            lums.create(0,0, 'lumming_magenta', 0);
            lums.create(0,0, 'lumming_red', 0);
            lums.create(0,0, 'lumming_white', 0);
            lums.create(0,0, 'lumming_yellow', 0);
            var i = 0;
            lums.forEach(
                function(l) {
                    l.animations.add('turn', [1, 4, 15, 11], 10, true);
                    l.animations.play('turn');
                    l.x = _game.world.centerX;
                    l.y = _game.world.centerY;
                    l.anchor.set(0.5, 0.5);
                    l.number = i;
                    l.alpha = 0;
                    i++;
                }
            )
            nblums = i-1;

            updateFunction = masterWalks;
    		text = _game.add.text(_game.world.centerX, _game.world.height-96, "La lumière sous toutes ses formes régit les lois de l'univers", {wordWrap: true, wordWrapWidth: _game.world.width, fill: '#ffffff', stroke: '#000000', strokeThickness: 2});
            text.anchor.set(0.5, 0);
  		},

  		update :function(){
            updateFunction();
        }
  	}

    nextstate = function(f, s) {
        if (s == null) {
            updateFunction = f;
        } else {
            _game.time.events.add(Phaser.Timer.SECOND*s, function() {updateFunction = f});
            updateFunction = function() {};
        }
    }

    masterWalks = function() {
        master.y = Math.min(master.y+1.5, _game.world.centerY);
        if (master.y == _game.world.centerY) nextstate(metalGear);
    }

    metalGear = function() {
        master.animations.stop();
        master.frame = 9;
        master.exclamation.x = master.x;
        master.exclamation.y = master.y-master.height;
        master.exclamation.alpha = 1;
        nextstate(prismTime, 2);
    }

    prismTime = function() {
        text.text = "Mais un simple élément peut perturber ses actions...";
        text.y = 0;
        master.exclamation.kill();
        _game.add.tween(prism).to({angle: 180}, 2000, Phaser.Easing.Linear.None, true);
        prism.x -= prism.velocity;
        if (prism.x < _game.world.centerX) nextstate(colorsAppear);
    }

    colorsAppear = function() {
        master.alpha = Math.max(master.alpha-0.1, 0);
        bg.alpha = Math.max(0.5, bg.alpha-0.01);
        prism.x -= prism.velocity;
        var dy;
        lums.forEach(
            function(l) {
                l.alpha = Math.min(l.alpha+0.1, 1);
                dy = l.y;
                l.x += (_game.world.centerX+(l.number-nblums/2)*32 - l.x)/8;
                l.y += (_game.world.height*2/3 - l.y)/8;
                dy -= l.y;
            }
        )
        if (dy == 0) nextstate(colorsDisappear);
    }

    colorsDisappear = function() {
        text.text = "Et désordonnée, la lumière n'est plus aussi puissante qu'avant";
        var da;
        lums.forEach(
            function(l) {
                l.alpha = Math.max(0, l.alpha-0.01);
                da = l.alpha;
            }
        )
        if (da == 0) nextstate(endUpdateLoop, 1);
    }

    endUpdateLoop = function() {
        text.text = "Aidez la à réordonner l'univers !";
	_game.time.events.add(Phaser.Timer.SECOND*4, function() {
	    Transition.nextState('MainMenu', null)
	}, _game);
    }

    return {
        init : function(game, etapesuivante){
            _game = game;
            _etapesuivante = etapesuivante;
        },
        setMusic : function(music){
            _music = music;
        },
    
        getHistoire : function(){
            return _histoire;
        }
    
    }

})
