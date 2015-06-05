define(['Items', 'PorteRadioFactory'], function(Items, PorteRadioFactory) {
  var _game = null;

  var PorteWithAura = function(x, y, rayon) {
    var group = _game.add.group();
    rond = _game.add.graphics(0, 0);
    rond.beginFill(0xF0FFFF, 0.1);

    rond.drawCircle(0 ,0, rayon);
    texture= rond.generateTexture();
    rond.destroy();
    Phaser.Sprite.call(this, _game, x, y, texture);
    this.anchor.set(0.5,0.5);
//    this.addChild(rond);
    this.door = PorteRadioFactory.create(x, y);
    group.add(this.door);
	}

	PorteWithAura.prototype = Object.create(Phaser.Sprite.prototype);
	PorteWithAura.prototype.constructor = PorteWithAura;

  PorteWithAura.prototype.ouvert = function(){
    this.door.ouvrir();
  }

  PorteWithAura.prototype.update = function(){
  //  this.door.fermer();
  }


	return{
		init : function(game) {
			_game = game;
      Items.init(_game);
      PorteRadioFactory.init(_game);
  //    _game.load.spritesheet('portantenne', 'media/img/porteAntenne.png', 10, 64, 2);

		}	,
		create : function(x, y, rayon) {
			return (new PorteWithAura(x,y, rayon));
		}
	}
})
