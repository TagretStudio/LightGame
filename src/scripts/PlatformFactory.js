 define(function() {
    
    var _game = null;
    
    var Platform = function(game, x, y, isPb) {
        this.isPb = isPb;
        if (isPb) {
            //this.spriteName = ''; A CHANGER une fois qu'on aura un sprite pour le plomb
        } else {
            this.spriteName = 'platform';
        }
        
    }
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('platform', 'src/media/img/platform.png');
        },
        
        create : function(x, y, isPb) {
            return (new Lumming(_game, x, y, isPb));
        }
    }
 })