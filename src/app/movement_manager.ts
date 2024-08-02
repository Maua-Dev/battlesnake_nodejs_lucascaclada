import { Board } from './objects/board'
import { Direction, Snake } from './objects/snake'
import { FloodFill } from './objects/floodfill'

export function CalculateMovement(board:Board, snake:Snake) : string{
  new FloodFill(board);
  let dirs:Direction[] = snake.checkSides(board);
  
  // Enable hungry mode
  if(snake.health < 30){
    let dirTiles = dirs.map(d => d.tile);
    // Get head tile section
    let headKey = Board.getTileKeyFromCoord(snake.head);
    let headTileSection = board.tiles[headKey].section;
    // Check for food on the same section
    board.foodTiles.filter(t => t.section == headTileSection)
    .forEach(f => {
        dirTiles.forEach(d => {
          let dX = d.xPos - f.xPos;
          let dY = d.yPos - f.yPos;
          let distance = Math.sqrt(dX^2 + dY^2);
          d.score -= distance;
        });
    });
  }

  // No avaliable directions, go up
  if(dirs.length == 0){
    return 'up';
  }

  // Sort direction by score
  dirs.sort((a,b) => b.score - a.score);
  return dirs[0].name;
}

