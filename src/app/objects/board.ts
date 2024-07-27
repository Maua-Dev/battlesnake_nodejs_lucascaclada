import { Tile, TileType } from './tile'
import { boardData, coord, snake } from './board_data_interface';
import { Snake } from './snake'
import { calculateSections } from './floodfill';

export class Board{
  boardWidth:number;
  boardHeight:number;
  tiles: { [coord:string]: Tile} = {};

  playerSnake:Snake;

  constructor(data:boardData, playerSnake:Snake){
    // Board Constants
    this.boardWidth = data.width;
    this.boardHeight = data.height;
    this.playerSnake = playerSnake;
    // Board Content
    this.generateTiles();
    this.populateFood(data.food);
    this.populateSnakes(data.snakes);
    calculateSections(this);
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
      this.tiles[key].tileType = TileType.Food;
    });
  }

  populateSnakes(snakes:snake[]){
    snakes.forEach(s => {
      let len = s.length;
      
      // Populate body tiles
      s.body.forEach(b => {
        let key = Board.getTileKeyFromCoord(b);
        this.tiles[key].tileType = s.id == this.playerSnake.id ? TileType.PlayerBody : TileType.EnemyBody;
      })

      // Populate tail tile
      let tailKey = Board.getTileKeyFromCoord(s.body[len - 1]);
      this.tiles[tailKey].tileType = s.id == this.playerSnake.id ? TileType.PlayerTail : TileType.EnemyTail;
      
      // Populate head tile
      let headKey = Board.getTileKeyFromCoord(s.head);
      this.tiles[headKey].tileType = s.id == this.playerSnake.id ? TileType.PlayerHead : TileType.EnemyHead;
      
      // Increase danger/reward according enemy movement
      if(s.id != this.playerSnake.id){
        console.log(this.tiles[headKey].sidesKeys);
        this.tiles[headKey].sidesKeys.forEach(key => {
          if(this.playerSnake.length > s.length){
            // Player can kill snake
            this.tiles[key].reward += .5;
          }
          else{
            // Player can die
            this.tiles[key].dangerStats.nearHead = true;
          }
        });
      }
    });
  }

  render(){
    for(let y = this.boardHeight - 1; y >= 0; y--){
      let line = '';
      for(let x = 0; x < this.boardWidth; x++){
        let tile:Tile = this.getTile(x, y);
        line += tile.tileType;
      }
      console.log(line);
    }
  }
}
