// Game scene
// -------------
// Runs the core gameplay loop
Crafty.scene('Game', function() {
  // A 2D array to keep track of all occupied tiles
  this.occupied = new Array(Game.map_grid.width);
  for (var i = 0; i < Game.map_grid.width; i++) {
    this.occupied[i] = new Array(Game.map_grid.height);
    for (var y = 0; y < Game.map_grid.height; y++) {
      this.occupied[i][y] = false;
    }
  }

  // Player character, placed at 5, 5 on our grid
  this.player = Crafty.e('PlayerCharacter').at(20, 9);

  if (this.player.x >= (Game.screen_view.width / 2))
  {
    Crafty.viewport.x = (this.player.x - (Game.screen_view.width / 2)) * -1;
  }
  if (this.player.y >= (Game.screen_view.height / 2))
  {
    Crafty.viewport.y = (this.player.y - (Game.screen_view.height / 2)) * -1;
  }


  this.occupied[this.player.at().x][this.player.at().y] = true;

  // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y)
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        // Place a bush entity at the current tile

      }
    }
  }

  // Generate five villages on the map in random locations
  // var max_villages = 5;
  // for (var x = 0; x < Game.map_grid.width; x++) {
  //   for (var y = 0; y < Game.map_grid.height; y++) {
  //     if (Math.random() < 0.03) {
  //       if (Crafty('Village').length < max_villages && !this.occupied[x][y]) {
  //         Crafty.e('Village').at(x, y);
  //       }
  //     }
  //   }
  // }

  createRoom(17,20,52,55, doorPosition = "BOTTOMLEFT") // 3243
  createRoom(21,24,52,55, doorPosition = "RIGHTBOTTOM") // My office 
  createRoom(21,24,55,58, doorPosition = "RIGHTTOP")// Micheal Office 

  createRoom(23,25,61, 64, doorPosition = 'TOPLEFT') // 3246
  createRoom(20,22,61, 64, doorPosition = 'TOPRIGHT') // 3247
  createRoom(17,19,61, 64, doorPosition = 'TOPLEFT') // 3249
  createRoom(14,16,61, 64, doorPosition = 'TOPLEFT') // 3250
  createRoom(11,13,59, 64, doorPosition = 'RIGHTTOP') // 3252 Sandys OFfice 

  createRoom(11,13,56, 59, doorPosition = 'RIGHTTOP') // 3253
  createRoom(11,13,53, 56, doorPosition = 'RIGHTBOTTOM') // 3255
  createRoom(11,13,50, 53, doorPosition = 'RIGHTTOP') // 3257


  createRoom(17,20,49, 52, doorPosition = 'LEFTBOTTOM') // 3256
  createRoom(15,18,46, 49, doorPosition = 'BOTTOMLEFT') // 3258 
  createRoom(15,18,43, 46, doorPosition = 'LEFTBOTTOM') /// 3260
  createRoom(15,18,40, 43, doorPosition = 'LEFTBOTTOM') /// 3262



  createRoom(11,12,46, 50, doorPosition = 'RIGHTTOP') // 3259
  createRoom(11,12,43, 46, doorPosition = 'RIGHTTOP') // 3259
  createRoom(11,12,39, 43, doorPosition = 'RIGHTTOP') // 3261
  createRoom(11,12,34, 39, doorPosition = 'RIGHTTOP') // 3263

  
  createRoom(15,17,34, 37, doorPosition = 'TOPRIGHT') /// 3144  
  createRoom(18,20,34, 37, doorPosition = 'TOPLEFT') /// 3142 
  createRoom(21,23,34, 37, doorPosition = 'TOPLEFT') /// 3141
  createRoom(24,26,34, 37, doorPosition = 'TOPRIGHT') /// 3138 

  /// Bottom wall of idr
  createFrontWall(0,34)
  createFrontWall(1,34)
  createFrontWall(2,34)
  createFrontWall(3,34)
  createFrontWall(4,34)
  createFrontWall(5,34)
  createFrontWall(6,34)
  createFrontWall(7,34)
  createFrontWall(8,34)
  createFrontWall(9,34)
  createFrontWall(10,34)


  createRoom(14,16,28, 31, doorPosition = 'BOTTOMLEFT') ///3145
  createRoom(17,20,25, 28, doorPosition = 'BOTTOMLEFT') ///3143
  createRoom(21,23,27, 30, doorPosition = 'BOTTOMLEFT') ///3140
  createRoom(24,26,28, 31, doorPosition = 'BOTTOMLEFT') ///3140
  createRoom(27,30,28, 31, doorPosition = 'BOTTOMLEFT') ///3140


  createRoom(8,10,28, 31, doorPosition = 'RIGHTBOTTOM') ///3147
  createRoom(5,7,28, 31, doorPosition = 'BOTTOMLEFT') ///3148
  createRoom(1,4,28, 31, doorPosition = 'BOTTOMRIGHT') ///3149
  createRoom(1,3,31, 34, doorPosition = 'RIGHTBOTTOM') ///3150



  createRoom(15,16,25, 28, doorPosition = 'LEFTTOP') ///3153
  createRoom(15,17,22, 25, doorPosition = 'LEFTBOTTOM') ///3157
  createRoom(15,17,19, 22, doorPosition = 'LEFTTOP') ///3158A
  createRoom(16,18,16, 19, doorPosition = 'LEFTBOTTOM') ///3158B
  createRoom(17,19,13, 16, doorPosition = 'LEFTBOTTOM') ///3159A
  createRoom(19,22,10, 13, doorPosition = 'LEFTBOTTOM') ///3159B



  createRoom(7,9,23, 28, doorPosition = 'TOPRIGHT') ///3154
  createRoom(3,6,25, 28, doorPosition = 'TOPRIGHT') ///3155
  createRoom(6,9,17, 20, doorPosition = 'RIGHTBOTTOM') ///3156
  createRoom(10,11,14, 18, doorPosition = 'RIGHTBOTTOM') ///B32b

  createRoom(11,13,8, 11, doorPosition = 'BOTTOMLEFT') ///3271
  createRoom(8,10,8, 11, doorPosition = 'BOTTOMLEFT') ///3269
  createRoom(5,7,7, 10, doorPosition = 'BOTTOMLEFT') ///3268
  createRoom(2,7,2, 7, doorPosition = 'BOTTOMLEFT') ///3267
  createRoom(1,2,7, 10, doorPosition = 'RIGHTBOTTOM') ///3267

  createRoom(14,16,6, 9, doorPosition = 'BOTTOMLEFT') ///3272
  createRoom(17,20,2, 7, doorPosition = 'BOTTOMRIGHT') ///3267
  createRoom(21,25,2, 7, doorPosition = 'BOTTOMRIGHT') ///3274
  createRoom(26,28,2, 7, doorPosition = 'BOTTOMRIGHT') ///3275
  createRoom(29,31,2, 7, doorPosition = 'BOTTOMLEFT') ///3276
  createRoom(32,35,2, 7, doorPosition = 'BOTTOMRIGHT') ///3277
  createRoom(36,38,2, 7, doorPosition = 'BOTTOMRIGHT') ///3278
  createRoom(39,42,2, 7, doorPosition = 'BOTTOMLEFT') ///3279
  createRoom(43,46,2, 9, doorPosition = 'LEFTBOTTOM') ///3280


  createRoom(23,25,10, 13, doorPosition = 'TOPLEFT') ///3161
  createRoom(26,28,10, 13, doorPosition = 'TOPRIGHT') ///3162
  createRoom(29,31,10, 13, doorPosition = 'TOPLEFT') ///3163
  createRoom(32,34,10, 13, doorPosition = 'TOPRIGHT') ///3164
  createRoom(35,37,10, 13, doorPosition = 'TOPLEFT') ///3165


    // Place a tree at every edge square on our grid of 16x16 tiles
  for (var x = 0; x < Game.map_grid.width; x++) {
    for (var y = 0; y < Game.map_grid.height; y++) {
      var at_edge = x == 0 || x == Game.map_grid.width - 1 || y == 0 || y == Game.map_grid.height - 1;

      if (at_edge) {
        // Place a tree entity at the current tile
        Crafty.e('Tree').at(x, y)
        this.occupied[x][y] = true;
      } else if (Math.random() < 0.06 && !this.occupied[x][y]) {
        // Place a bush entity at the current tile

      }
    }
  }


  // Play a ringing sound to indicate the start of the journey
  Crafty.audio.play('ring');

  // Show the victory screen once all villages are visisted
  this.show_victory = this.bind('VillageVisited', function() {
    if (!Crafty('Village').length) {
      Crafty.scene('Victory');
    }
  });
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('VillageVisited', this.show_victory);
});


// Victory scene
// -------------
// Tells the player when they've won and lets them start a new game
Crafty.scene('Victory', function() {
  // Display some text in celebration of the victory
  Crafty.e('2D, DOM, Text')
    .text('All villages visited!')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .textFont($text_css);

  // Give'em a round of applause!
  Crafty.audio.play('applause');

  // After a short delay, watch for the player to press a key, then restart
  // the game when a key is pressed
  var delay = true;
  setTimeout(function() { delay = false; }, 5000);
  this.restart_game = function() {
    if (!delay) {
      Crafty.scene('Game');
    }
  };
  Crafty.bind('KeyDown', this.restart_game);
}, function() {
  // Remove our event binding from above so that we don't
  //  end up having multiple redundant event watchers after
  //  multiple restarts of the game
  this.unbind('KeyDown', this.restart_game);
});

// Loading scene
// -------------
// Handles the loading of binary assets such as images and audio files
Crafty.scene('Loading', function(){
  // Draw some text for the player to see in case the file
  //  takes a noticeable amount of time to load
  Crafty.e('2D, DOM, Text')
    .text('Loading; please wait...')
    .attr({ x: 0, y: Game.height()/2 - 24, w: Game.width() })
    .textFont($text_css);

  // // Load our sprite map image
  // Crafty.load([
  //   'assets/16x16_forest_2.gif',
  //   'assets/hunter.png',
  //   'assets/door_knock_3x.mp3',
  //   'assets/door_knock_3x.ogg',
  //   'assets/door_knock_3x.aac',
  //   'assets/board_room_applause.mp3',
  //   'assets/board_room_applause.ogg',
  //   'assets/board_room_applause.aac',
  //   'assets/candy_dish_lid.mp3',
  //   'assets/candy_dish_lid.ogg',
  //   'assets/candy_dish_lid.aac'
  //   ], function(){
  //   // Once the images are loaded...

  //   // Define the individual sprites in the image
  //   // Each one (spr_tree, etc.) becomes a component
  //   // These components' names are prefixed with "spr_"
  //   //  to remind us that they simply cause the entity
  //   //  to be drawn with a certain sprite
  //   Crafty.sprite(16, 'assets/16x16_forest_2.gif', {
  //     spr_tree:    [0, 0],
  //     spr_bush:    [1, 0],
  //     spr_village: [0, 1],
  //     spr_rock:    [1, 1]
  //   });

  //   // Define the PC's sprite to be the first sprite in the third row of the
  //   //  animation sprite map
  //   Crafty.sprite(16, 'assets/hunter.png', {
  //     spr_player:  [0, 2],
  //   }, 0, 2);

  //   // Define our sounds for later use
  //   Crafty.audio.add({
  //     knock:    ['assets/door_knock_3x.mp3', 'assets/door_knock_3x.ogg', 'assets/door_knock_3x.aac'],
  //     applause: ['assets/board_room_applause.mp3', 'assets/board_room_applause.ogg', 'assets/board_room_applause.aac'],
  //     ring:     ['assets/candy_dish_lid.mp3', 'assets/candy_dish_lid.ogg', 'assets/candy_dish_lid.aac']
  //   });

  //   // Now that our sprites are ready to draw, start the game
  //   Crafty.scene('Game');
  // });
  Crafty.scene('Game');
});