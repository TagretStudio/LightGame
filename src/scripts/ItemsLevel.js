define(['DoorsFactory','FilterFactory','ColorEnum'], function(DoorsFactory, FilterFactory, ColorEnum){
  var _game = null;
  var _groupItem = null;


  return{
    init : function(game){
      _game = game;
      DoorsFactory.init(game);
      FilterFactory.init(game);
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
        default :
        var door = DoorsFactory.create(ColorEnum.getColorEnum().RED, x, y);
        _groupItem.add(door);
          break;
      }

    }

  }
})
