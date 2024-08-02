import { Board } from './objects/board'
import { Direction, Snake } from './objects/snake'
import { FloodFill } from './objects/floodfill'

export function CalculateMovement(board:Board, snake:Snake) : string{
  new FloodFill(board);
  let dirs:Direction[] = snake.checkSides(board);

  // No avaliable directions, go up
  if(dirs.length == 0){
    return 'up';
  }

  // Sort direction by score
  dirs.sort((a,b) => b.score - a.score);
  return dirs[0].name;
}
