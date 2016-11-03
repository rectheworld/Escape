// The Grid component allows an element to be located
//  on a grid of tiles
Crafty.c('Grid', {
  init: function() {
    this.attr({
      w: Game.map_grid.tile.width,
      h: Game.map_grid.tile.height
    });
  },

  // Locate this entity at the given position on the grid
  at: function(x, y) {
    if (x === undefined && y === undefined) {
      return { x: this.x/Game.map_grid.tile.width, y: this.y/Game.map_grid.tile.height };
    } else {
      this.attr({ x: x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height });
      return this;
    }
  }
});

// An "Actor" is an entity that is drawn in 2D on canvas
//  via our logical coordinate grid
Crafty.c('Actor', {
  init: function() {
    this.requires('2D, Canvas, Grid');
  },
});

// A Tree is just an Actor with a certain sprite
Crafty.c('Tree', {
  init: function() {
    this.requires('Actor, Solid, Color')
    .color('rgb(50,50,50)');
  },
});



createFrontWall = function(x,y){

  top_wall = Crafty.e('FrontWall_Top').at(x,y)
  bottom_wall = Crafty.e('FrontWall_Bottom').attr({x:x * Game.map_grid.tile.width, y: y * Game.map_grid.tile.height + 32/2})

  top_wall.bottom_wall = bottom_wall
  bottom_wall.top_wall = top_wall
};




createRoom = function( xStart,xEnd, yStart, yEnd, doorPosition){



  // Top Wall Options 
  if(doorPosition === 'TOPLEFT'){
    for(i = xStart; i <= xEnd; i ++){
        createFrontWall(i,yEnd)
      }

      //createFrontWall(xStart,yStart) // this is the wall at the first position on the bottom
      for(i = xStart + 1; i <= xEnd; i ++){
        createFrontWall(i,yStart)
      }

    Crafty.e('CornerWall').at(xEnd +1,yEnd)
    Crafty.e('CornerWall').at(xEnd +1,yEnd +1).attr({h:32/2})
  }


  if(doorPosition === 'TOPRIGHT'){
    for(i = xStart; i <= xEnd; i ++){
        createFrontWall(i,yEnd)
      }

      createFrontWall(xStart,yStart) // this is the wall at the first position on the bottom
      for(i = xStart; i <= xEnd - 1; i ++){
        createFrontWall(i,yStart)
      }

    Crafty.e('CornerWall').at(xEnd +1,yEnd)
    Crafty.e('CornerWall').at(xEnd +1,yEnd +1).attr({h:32/2})
  }



  /// Left Wall Options 
  if(doorPosition === 'LEFTTOP'){

      for(i = yStart; i < yEnd - 1; i ++){
        createVirticalWall(xEnd + 1,i)
      }
      Crafty.e('VerticalWall_Bottom_Filler').attr({x:(xEnd + 1) * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})

      for(i = yStart + 2; i < yEnd; i ++){
        createVirticalWall(xStart,i)
      }
      //Crafty.e('VerticalWall_Bottom_Filler').attr({x:xStart * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})
  }

  if(doorPosition === 'LEFTBOTTOM'){
      for(i = yStart; i < yEnd - 1 ; i ++){
        createVirticalWall(xEnd + 1,i)
      }
      Crafty.e('VerticalWall_Bottom_Filler').attr({x:(xEnd + 1) * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})

      for(i = yStart; i < yEnd - 1; i ++){
        createVirticalWall(xStart,i)
      }
  }

  /// Right wall options 
  if(doorPosition === 'RIGHTTOP'){

      for(i = yStart; i < yEnd - 1; i ++){
        createVirticalWall(xStart,i)
      }
      Crafty.e('VerticalWall_Bottom_Filler').attr({x:xStart * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})


      for(i = yStart + 2; i < yEnd - 1; i ++){
        createVirticalWall(xEnd + 1,i)
      }
      Crafty.e('VerticalWall_Bottom_Filler').attr({x:(xEnd + 1) * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})
  }

  if(doorPosition === 'RIGHTBOTTOM'){
      for(i = yStart; i < yEnd - 1; i ++){
        createVirticalWall(xStart,i)
      }
      Crafty.e('VerticalWall_Bottom_Filler').attr({x:xStart * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})

      for(i = yStart; i < yEnd - 1; i ++){
        createVirticalWall(xEnd + 1,i)
      }
  }


  // Bottom Wall Options 

  if(doorPosition === 'BOTTOMLEFT'){
    for(i = xStart; i <= xEnd; i ++){
        createFrontWall(i,yStart)
      }

      createFrontWall(xStart,yEnd) // this is the wall at the first position on the bottom
      for(i = xStart + 2; i <= xEnd; i ++){
        createFrontWall(i,yEnd)
      }

    Crafty.e('CornerWall').at(xEnd +1,yEnd)
    Crafty.e('CornerWall').at(xEnd +1,yEnd +1).attr({h:32/2})

  }




  if(doorPosition === 'BOTTOMRIGHT'){
    for(i = xStart; i <= xEnd; i ++){
        createFrontWall(i,yStart)
      }

      for(i = xStart; i <= xEnd - 1; i ++){
        createFrontWall(i,yEnd)
      }

    Crafty.e('CornerWall').at(xEnd +1,yEnd)
    Crafty.e('CornerWall').at(xEnd +1,yEnd +1).attr({h:32/2})
  }





  /// If the Door is not on the sides ofthe room 
  if(doorPosition != 'LEFTTOP' && doorPosition != 'LEFTBOTTOM' && doorPosition != 'RIGHTTOP' && doorPosition != 'RIGHTBOTTOM' ){
      for(i = yStart; i < yEnd -1 ; i ++){
        createVirticalWall(xStart,i)
        createVirticalWall(xEnd + 1,i)
      }

      Crafty.e('VerticalWall_Bottom_Filler').attr({x:(xEnd + 1) * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})
      Crafty.e('VerticalWall_Bottom_Filler').attr({x:xStart * Game.map_grid.tile.width, y: (yEnd * Game.map_grid.tile.height) - 32/2})

  }

  /// If the Door is not on the top or bottom  ofthe room 
  if(doorPosition != 'TOPLEFT' && doorPosition != 'TOPRIGHT' && doorPosition != 'BOTTOMLEFT' && doorPosition != 'BOTTOMRIGHT' ){
      for(i = xStart; i <= xEnd; i ++){
        createFrontWall(i,yStart)
        createFrontWall(i,yEnd)
      }

      Crafty.e('CornerWall').at(xEnd +1,yEnd)
      Crafty.e('CornerWall').at(xEnd +1,yEnd +1).attr({h:32/2})
  }


};

Crafty.c('FrontWall_Top', {
  init: function(){
    this.requires('Actor, Color, TopWall, Wall')
    .attr({h: 32/2, z: -1})
    .color('rgb(179, 204, 230)')
  }
})



Crafty.c('FrontWall_Bottom', {
  init: function(){
    this.requires('Actor, BottomWall, Color, Wall')
    .attr({h:32, z: -1})
    .color('rgb(179, 204, 230)')
  }
})


createVirticalWall = function(x,y){
  top_wall = Crafty.e('VerticalWall_Top').at(x,y)
  bottom_wall = Crafty.e('VerticalWall_Bottom').attr({x:x * Game.map_grid.tile.width, y: (y * Game.map_grid.tile.height) + 32/2})

  top_wall.bottom_wall = bottom_wall
  bottom_wall.top_wall = top_wall
};


Crafty.c('VerticalWall_Top', {
  init: function(){
    this.requires('Actor, Color, TopWall, Wall')
    .attr({h: 32/2, w: 5, z:2})
    .color('rgb(50, 64, 128)')
    
  }
})

Crafty.c('VerticalWall_Bottom', {
  init: function(){
    this.requires('Actor, Color, BottomWall, TopWall,  Wall')
    .attr({h: 32, w: 5, z:2})
    .color('rgb(0, 64, 128)')
    
  }
})

Crafty.c('VerticalWall_Bottom_Filler', {
  init: function(){
    this.requires('Actor, Color, TopWall, BottomWall,Wall')
    .attr({h: 32/2, w: 5, z:2})
    .color('rgb(50, 64, 128)')
    
  }
})
Crafty.c('CornerWall', {
  init: function(){
    this.requires('Actor, Wall, Color')
    .attr({w: 5})
    .color('rgb(179, 204, 230)')
    
  }
})


Crafty.c('Door', {
  init: function(){
    this.requires('Actor, Color, Door')
    .attr({h: 32, w: 5})
    .origin("bottom right")
    .color('rgb(0, 0, 0)')
    
  }
})

Crafty.c('path_linear', {
  init: function(){
    this.requires('Actor, Color')
    .color('rgb(250, 252, 194)')
    
  }
})

Crafty.c('path_agora', {
  init: function(){
    this.requires('Actor, Color')
    .attr({z:-1})
    .color('rgb(233, 237, 125)')
    
  }
})


// Crafty.c('WallFace', {
//     init: function(){
//     this.requires('Actor, Wall, Color')
//     .attr({h: 32 + 32/2})
//     .color('rgb(0, 64, 128)')
    
//   }
// })

// This is the player-controlled character
Crafty.c('PlayerCharacter', {
  init: function() {
    this.requires('Actor, Fourway, Collision, SpriteAnimation, Color')
      .color('rgb(0,0,255)')
      .fourway(4)
      .stopOnSolids()
      .attr({w:32/2, h: 32 - 2})
      .onHit('Village', this.visitVillage)
      .onHit('Wall', this.wallHit)
      // These next lines define our four animations
      //  each call to .animate specifies:
      //  - the name of the animation
      //  - the x and y coordinates within the sprite
      //     map at which the animation set begins
      //  - the number of animation frames *in addition to* the first one
    //   .reel('PlayerMovingUp',    600, 0, 0, 3)
    //   .reel('PlayerMovingRight', 600, 0, 1, 3)
    //   .reel('PlayerMovingDown',  600, 0, 2, 3)
    //   .reel('PlayerMovingLeft',  600, 0, 3, 3);

    // // Watch for a change of direction and switch animations accordingly
    // var animation_speed = 4;
    // this.bind('NewDirection', function(data) {
    //   if (data.x > 0) {
    //     this.animate('PlayerMovingRight', -1);
    //   } else if (data.x < 0) {
    //     this.animate('PlayerMovingLeft', -1);
    //   } else if (data.y > 0) {
    //     this.animate('PlayerMovingDown', -1);
    //   } else if (data.y < 0) {
    //     this.animate('PlayerMovingUp', -1);
    //   } else {
    //     this.pauseAnimation();
    //   }
    // });

.bind("Moved", function(oldPos){

          // console.log('oldPos', oldPos.x, oldPos.y)
          // console.log('current pos', this.x, this.y)



          
          /// Set Viewpoint 

          if (this.x >= (Game.screen_view.width / 2))
          {
            Crafty.viewport.x = (this.x - (Game.screen_view.width / 2)) * -1;
          }
          if (this.y >= (Game.screen_view.height / 2))
          {
            Crafty.viewport.y = (this.y - (Game.screen_view.height / 2)) * -1;
          }

          document.getElementById('_position').innerHTML = String(this.at().x).concat(" , ",  String(this.at().y))
        });
  },

  // Registers a stop-movement function to be called when
  //  this entity hits an entity with the "Solid" component
  stopOnSolids: function() {
    this.onHit('Solid', this.stopMovement);

    return this;
  },

  // Stops the movement
  stopMovement: function() {
    this._speed = 0;
    if (this._movement) {
      this.x -= this._movement.x;
      this.y -= this._movement.y;
    }
  },

  // Respond to this player visiting a village
  visitVillage: function(data) {
    villlage = data[0].obj;
    villlage.visit();
  },

  wallHit: function(data) {
    //console.log(data[0].obj)
    this_wall = data[0].obj;

    /// If walking neither in front or behind a wall 
    if(this.hit('BottomWall') && this.hit('TopWall')){
          this.stopMovement()

    }else{


    // this will make it so it appear like you are in front of a wall 
    if(this.hit('BottomWall')){
      for(i = 0; i < data.length; i++){
        data[i].obj.attr({z:-1})
      }
      if(this._movement.y < 0){ 
        if(this.hit('TopWall')){
          this.stopMovement()
        } 
      }
    }

    // this will make it so it appear like you are in behind a wall 
    if(this.hit('TopWall')){
      for(i = 0; i < data.length; i++){
        data[i].obj.attr({z:1})
      }
      if(this._movement.y > 0){
        if(this.hit('BottomWall')){

          this.stopMovement()
        }
      }
    }

  }


    // if(this._movement.y > 0){ // going down
    //   //this_wall.bottom_wall.requires('Solid')
    //   if(this.hit('BottomWall')){
    //     this.stopMovement()
    //   } 
    // }else if(this._movement.y < 0){ 
    //   this_wall.attr({z:-1})
    //   if(this.hit('TopWall')){
    //     this.stopMovement()
    //     //this.y -= this._movement.y;
    //     //this._movement.y = 0
    //   }
    // } 
  }
});

// A village is a tile on the grid that the PC must visit in order to win the game
Crafty.c('Village', {
  init: function() {
    this.requires('Actor, Color')
    .color('rgb(255,0,0)');
  },

  // Process a visitation with this village
  visit: function() {
    this.destroy();
    Crafty.audio.play('knock');
    Crafty.trigger('VillageVisited', this);
  }
});