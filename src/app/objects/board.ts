import { Tile } from './tile'
import { TileContent, SnakeBody, SnakeHead, SnakeTail, Food } from './tile_content'
import { boardData, coord, snake } from './board_data_interface';

export class Board{
  boardWidth:number;
  boardHeight:number;
  tiles: { [coord:string]: Tile} = {};

  constructor(data:boardData){
    // Board Constants
    this.boardWidth = data.width;
    this.boardHeight = data.height;
    // Board Content
    this.generateTiles();
    this.populateFood(data.food);
    this.populateSnakes(data.snakes);
  }
  
  static getTileKey(x:number, y:number) : string{
    return `x${x}-y${y}`;
  }

  static getTileKeyFromCoord(c:coord){
    return Board.getTileKey(c.x, c.y);
  }

  getTile(x:number, y:number) : Tile{
    let key:string = Board.getTileKey(x, y);
    return this.tiles[key]
  }

  generateTiles(){
    for(let y = 0; y < this.boardHeight; y++){
      for(let x = 0; x < this.boardWidth; x++){
        let key:string = Board.getTileKey(x, y);
        let tile:Tile = new Tile(x, y, this.boardWidth, this.boardHeight);
        this.tiles[key] = tile;
      }
    }
  }

  populateFood(foodPositions:coord[]){
    foodPositions.forEach(pos => {
      let x = pos.x;
      let y = pos.y;
      let key = Board.getTileKey(x, y);
      this.tiles[key].content = new Food();
    });
  }

  populateSnakes(snakes:snake[]){
    snakes.forEach(s => {
      let len = s.length;
      
      // Populate body tiles
      s.body.forEach(b => {
        let key = Board.getTileKeyFromCoord(b);
        this.tiles[key].content = new SnakeBody(len);
      })

      // Populate tail tile
      let tailKey = Board.getTileKeyFromCoord(s.body[len - 1]);
      this.tiles[tailKey].content = new SnakeTail(len);
      
      // Populate head tile
      let headKey = Board.getTileKeyFromCoord(s.head);
      this.tiles[headKey].content = new SnakeHead(len);
    });
  }

  render(){
    for(let y = this.boardHeight - 1; y >= 0; y--){
      let line = '';
      for(let x = 0; x < this.boardWidth; x++){
        let tile:Tile = this.getTile(x, y);
        line += tile.content?.icon || '.';
      }
      console.log(line);
    }
  }
}
