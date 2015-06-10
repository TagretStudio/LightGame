define(['Transition', 'MainMenu', 'Images', 'MusicFactory'], function(Transition, MainMenu, Images, MusicFactory)) {

_var histoire = {
    preload : function(){
            _pointLogo = new Phaser.Point(_game.world.centerX - 216, _game.world.centerY - 66);
            _pointButtons = new Phaser.Point(_game.world.centerX , _game.world.centerY - 20);
            _game.load.spritesheet('buttonplusmoins', 'media/img/buttonplusmoins.png', 38, 38);
            _game.load.spritesheet('button', 'media/img/MenuButtons.png',  278, 63);
            _game.load.spritesheet('chiffres', 'media/img/chiffres.png', 47, 65);
  		},

  		create : function(){
            Images.boot().create();
            _buttons = _game.add.group();
  	    	_buttons.scale.set(_game.world.width/1024, _game.world.height/768);
  	    	_buttons.add(_buttonPlus = _game.make.button(_game.world.centerX*1024/800 + 40, _game.world.centerY, 'buttonplusmoins', function(){actionButton(0,1);}, _game, 0, 1, 2));
            _buttons.add(_buttonMoins = _game.make.button(_game.world.centerX*1024/800 + 40,_game.world.centerY + 150, 'buttonplusmoins', function(){actionButton(0,-1);}, _game, 3, 4, 5));
            _buttons.add(_buttonPlus = _game.make.button(_game.world.centerX*1024/800 - 40, _game.world.centerY, 'buttonplusmoins', function(){actionButton(1,0);}, _game, 0, 1, 2));
            _buttons.add(_buttonMoins = _game.make.button(_game.world.centerX*1024/800 - 40,_game.world.centerY + 150, 'buttonplusmoins', function(){actionButton(-1,0);}, _game, 3, 4, 5));
            _buttons.add(_buttonPlay = _game.make.button(_game.world.centerX*1024/800, _game.world.centerY + 300, 'button', actionPlay, _game, 0, 1, 2));
            _buttons.forEach(function (p){
                p.anchor.set(0.5, 0.5);
                p.scale.set(2,2);
            })


			dizaineSprite = _game.add.sprite(_game.world.centerX - 40, _game.world.centerY, 'chiffres', _dizaine);
			uniteSprite = _game.add.sprite(_game.world.centerX + 40, _game.world.centerY, 'chiffres', _unite);
			dizaineSprite.anchor.set(0.5, 0.5);
			uniteSprite.anchor.set(0.5, 0.5);

			transpaSprite = _game.add.group();

		
  		},

  		update :function(){
			transpaSprite.forEach(
				function(p) {
					p.alpha = Math.max(p.alpha-0.1,0);
					p.x += Math.cos(p.angle)*2;
					p.y += Math.sin(p.angle)*2;
					if (p.alpha == 0) p.kill();
				}
			);
            //text.setText(_unite);
            //text2.setText(_dizaine);
  		}
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
