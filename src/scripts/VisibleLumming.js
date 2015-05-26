define(['Lumming', 'ColorEnum'], function(Lumming, ColorEnum) {
        
    var VisibleLumming = function(game, color, x, y, vitesseX) {
        
        this.color = color;
        this.sprite = 'src/media/img/lumming_' + color.name + '.png';
        
        this.lum = Lumming.create(this.sprite, x, y, vitesseX);
        
    }
    
    VisibleLumming.prototype = Object.create(Lumming.prototype);
    VisibleLumming.prototype.constructor = VisibleLumming;
    
    return {   
        create : function(game, color, x, y, vitesseX) {
            return (new VisibleLumming(game, color, x, y, vitesseX));
        }
    }
})