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
    this.requires('Actor, Player, Fourway, Collision, SpriteAnimation, Color')
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

Crafty.c('Project_Manager', {
  init: function(){
    this.requires('Actor, Color, Tween')
    .attr({w:32/2, h: 32 - 2, z: 1})
    .color('rgb(255,0,0)')
    .bind("TweenEnd", function() {
            
            this.wonder()
            });
    
  },
          
    current_position: null,
    previous_position: null,
    speed: 4, /// 5 sqares per second 
    
    setPosition: function(posLetter){
        this.current_position = posLetter;
        this.previous_position = posLetter;
        
        /// for testing 
        Game.testManager = this
    
        position = Game.edge_map[posLetter].loc
        this.attr({x: position[0] * Game.map_grid.tile.height, y: position[1] * Game.map_grid.tile.height})  
        this.wonder()
    },
    
    wonder: function(){
        /// get edges of current and clone into list for us 
        var current_edges_og = Game.edge_map[this.current_position].edges
        var current_edges = []; // An new empty array
        for (var i = 0, len = current_edges_og.length; i < len; i++) {
            current_edges[i] = current_edges_og[i];
        }
        
        
        ///console.log(current_edges)

        /// remove the previous edge from the list of options if more than one option avalible 
        if(current_edges.length > 1){
            var pre_index = current_edges.indexOf(this.previous_position);
            
            //console.log(pre_index)
            current_edges.splice(pre_index, 1); 
        }
        
        //console.log(current_edges)
        //get a random index to move to
        index = Math.floor((Math.random()* current_edges.length))
        
        // Set the next position to jurney too
        next_edge = current_edges[index]
        //console.log(next_edge)

        /// get distance between to places
        //console.log(current_edges)
        //console.log(next_edge)
        next_pos = Game.edge_map[next_edge].loc
        this_pos = Game.edge_map[this.current_position].loc
        
        dx = next_pos[0] - this_pos[0]
        dy = next_pos[1] - this_pos[1]
        
        distance = Math.floor(Math.sqrt((dx ** 2) + (dy ** 2)))
        
        
        // Calulate the speed to get there 
        millisecs = (distance/this.speed) * 1000
        
        // Tween to the next location
        this.tween({x: next_pos[0] * Game.map_grid.tile.height, y: next_pos[1] * Game.map_grid.tile.height}, millisecs)
        this.previous_position = this.current_position;
        this.current_position = next_edge
    }, // End of wonder function
    
    a_star_search: function(current_position){
//        The function is based on the tutorial at 
//        https://www.codeproject.com/articles/9880/very-simple-a-algorithm-implementation
        solutionPathLiast = [];
        
        /// The psotion we want to path to 
        Game.rec_zone; // Why do i name shit like this????
        
        /// Create open and closed lists 
        /// Open list is the nodes to explore
        /// Closed list is the nodes already explored 
        ///Note: these list should be sorted by cost
        open_list = []
        closed_list = []
        
        /// Place Put currentPosiiiton on the open list
        open_list.push(current_position)  
        
        /// While open list is not empty 
        while(open_list.length > 0){
            /// Get the node off the open list
            // with the lowest f and call it node_current 
            node_cuurent = open_list.pop()
            
            /// If node_current i the same states as node_goal then
            // yeah er are done 
            if(node_cuurent == Game.rec_zone){
                console.log('FOUND THE END!!!!')
                ///node_goal.parentNode = node_current.parentNode ;
                break
            }
            
            // Get edges of current node
            current_edges = Game.edge_map[node_cuurent].edges
            
            /// For each edge 
            for(edge in current_edges){
                /// Set the cost of the edge to be the cost of 
                /// node_current plus  the cost to get to the edge position
                
                
            }// end of for loop for edges 
            
        }// End of while loop 
        
        
    }
    
});

// A village is a tile on the grid that the PC must visit in order to win the game
//Crafty.c('Village', {
//  init: function() {
//    this.requires('Actor, Color')
//    .color('rgb(255,0,0)');
//  },
//
//  // Process a visitation with this village
//  visit: function() {
//    this.destroy();
//    Crafty.audio.play('knock');
//    Crafty.trigger('VillageVisited', this);
//  }
//});

Crafty.c('ZoneButton', {
  init: function() {
    this.requires('2D, Canvas, Collision')
    .attr({h: 64, w:64})
    .onHit('Player', this.signal_zone)
    .setName()
    ;
  },
    

  setName: function(){
    this.name = null;  
  },
  signal_zone: function() {
      Game.rec_zone = this.name
  }, // End of singal zone
    
});