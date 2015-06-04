define(['DoorsFactory','FilterFactory','ColorEnum', 'VisibleLummingFactory', 'MiroirFactory'], function(DoorsFactory, FilterFactory, ColorEnum, VisibleLummingFactory, MiroirFactory){
  var _game = null;
  var _groupItem = null;


  return{
    init : function(game){
      _game = game;
      DoorsFactory.init(game);
      FilterFactory.init(game);
      MiroirFactory.init(game);
    },
    reinit : function(game){
      _game = game;
      DoorsFactory.init(game);
      if (_groupItem != null){
       _groupItem.removeAll(true, true);
      }
      _groupItem = _game.add.group();
      _groupItem.enableBody = true;

    },
    getGroupItem : function(){
      return _groupItem;
    },
    createItem : function(key, x, y){
      var door = DoorsFactory.create(ColorEnum.getColorEnum().RED, x, y);

      switch (key) {
        case 'red' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().RED, x, y);
          _groupItem.add(filtre);
          break;
        case 'blue' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().BLUE, x, y);
          _groupItem.add(filtre);
          break;
        case 'yellow' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().YELLOW, x, y);
          _groupItem.add(filtre);
          break;
        case 'magenta' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().MAGENTA, x, y);
          _groupItem.add(filtre);
          break;
        case 'cyan' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().CYAN, x, y);
          _groupItem.add(filtre);
          break;
        case 'green' :
          filtre = FilterFactory.create(ColorEnum.getColorEnum().GREEN, x, y);
          _groupItem.add(filtre);
          break;
        case 'miroirV' :
          miroirV = MiroirFactory.create(x, y, true);
          _groupItem.add(miroirV);
          break;
        case 'miroirH' :
          miroirH = MiroirFactory.create(x, y, false);
          _groupItem.add(miroirH);
          break;

        default :
        var door = DoorsFactory.create(ColorEnum.getColorEnum().RED, x, y);
        _groupItem.add(door);
          break;
      }
    },

    collideItem : function(lum, objet){
      if (lum.defaultVision == 2){
      switch (objet.key){
        case 'filter_red' :
        case 'filter_green' :
        case 'filter_blue' :
        case 'filter_cyan' :
        case 'filter_yellow' :
        case 'filter_magenta' :
         lum.collideWithFilter(objet);
          break;
        case 'miroir_Vertical' :
          lum.collideWithMiroir(_game, objet);
          break;
        case 'miroir_Horizontal' :
          lum.collideWithMiroir(_game, objet);
          break;
        }
      }

    }

  }
})
