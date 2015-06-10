define(['Transition', 'MainMenu', 'Images', 'MusicFactory'],
       function(Transition, MainMenu, Images, MusicFactory) {

    var _game = null;
    var _etapesuivante = null;
    var _music = null;

    var lums = null;
    var nblums = null;
    var updateFunction = null;

    var text = null;

    var _histoire = {
        preload : function(){

            _game.load.spritesheet('lumming_blue', 'media/img/lumming_blue.png', 32, 32, 32);
            _game.load.spritesheet('lumming_cyan', 'media/img/lumming_cyan.png', 32, 32, 32);
            _game.load.spritesheet('lumming_green', 'media/img/lumming_green.png', 32, 32, 32);
            _game.load.spritesheet('lumming_magenta', 'media/img/lumming_magenta.png', 32, 32, 32);
            _game.load.spritesheet('lumming_red', 'media/img/lumming_red.png', 32, 32, 32);
            _game.load.spritesheet('lumming_white', 'media/img/lumming_white.png', 32, 32, 32);
            _game.load.spritesheet('lumming_yellow', 'media/img/lumming_yellow.png', 32, 32, 32);

            _game.load.image('prisme', 'media/img/prisme.png');
  		},

  		create : function(){
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
                    l.number = i;
                    i++;
                }
            )
            nblums = i;
            updateFunction = colorsAppear;
    		text = _game.add.text(0, 0, "toaster", {wordWrap: true, wordWrapWidth: _game.world.width, fill: '#ffffff', stroke: '#000000', strokeThickness: 2});
  		},

  		update :function(){
            updateFunction();
        }
  	}

    colorsAppear = function() {
        var dy;
        lums.forEach(
            function(l) {
                dy = l.y;
                l.x += (_game.world.centerX+(l.number-nblums/2)*32 - l.x)/8;
                l.y += (_game.world.height*2/3 - l.y)/8;
                dy -= l.y;
            }
        )
        if (dy == 0) updateFunction = colorsDisappear;
    }

    colorsDisappear = function() {
        var da;
        lums.forEach(
            function(l) {
                l.alpha = Math.max(0, l.alpha-0.01);
                da = l.alpha;
            }
        )
        if (da == 0) updateFunction = endUpdateLoop;
        text.text = "lolnope";
    }

    endUpdateLoop = function() {
        lums.forEach(
            function(l) {
                l.alpha = 1;
            }
        )
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