 define(function() {
    
    var _game = null;
    
    var Platform = function(game, x, y, isPb) {
        
        
    }
    
    return {
        init : function(game) {
            _game = game;
            _game.load.image('platform', 'src/media/img/platform.png');
        }
    }
 })