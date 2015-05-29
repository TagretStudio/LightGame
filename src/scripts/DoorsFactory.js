define(['Items'], function(Items) {
  var _game = null;

  return {
    init : function(game){
      _game = game;
      Items.init(_game);
      _game.load.spritesheet('door_blue', 'src/media/img/door_blue.png', 32, 32, 16);
      _game.load.spritesheet('door_cyan', 'src/media/img/door_cyan.png', 32, 32, 16);
      _game.load.spritesheet('door_green', 'src/media/img/door_green.png', 32, 32, 16);
      _game.load.spritesheet('door_magenta', 'src/media/img/door_magenta.png', 32, 32, 16);
      _game.load.spritesheet('door_red', 'src/media/img/door_red.png', 32, 32, 16);
      _game.load.spritesheet('door_white', 'src/media/img/door_white.png', 32, 32, 16);
      _game.load.spritesheet('door_yellow', 'src/media/img/door_yellow.png', 32, 32, 16);

    }
  }
}