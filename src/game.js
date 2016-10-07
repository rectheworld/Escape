Game = {
  // This defines our grid's size and the size of each of its tiles
  map_grid: {
    width:  93,
    height: 66,
    tile: {
      width:  32,
      height: 32
    }
  },

  screen_view: {
    width: 24 * 32,
    height: 16 * 32
  },

  // The total width of the game screen. Since our grid takes up the entire screen
  //  this is just the width of a tile times the width of the grid
  width: function() {
    return this.map_grid.width * this.map_grid.tile.width;
  },

  // The total height of the game screen. Since our grid takes up the entire screen
  //  this is just the height of a tile times the height of the grid
  height: function() {
    return this.map_grid.height * this.map_grid.tile.height;
  },

  // Initialize and start our game
  start: function() {
    // Start crafty and set a background color so that we can see it's working
    Crafty.init(Game.screen_view.width  , Game.screen_view.height );
    Crafty.background('rgb(230, 230, 255)');

    // Simply start the "Loading" scene to get things going
    Crafty.scene('Loading');
  }
};

$text_css = { 'size': '24px', 'family': 'Arial', 'color': 'red', 'text-align': 'center' };