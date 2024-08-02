import { Tile, TileType } from './tile'
import { boardData, coord, snake } from './board_data_interface';
import { Snake } from './snake'

export class Board{
  boardWidth:number;
  boardHeight:number;
  tiles: { [coord:string]: Tile} = {};
  foodTiles:Tile[] = [];

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
  }
  
  static getTileKey(x:number, y:number) : string{
    return `x${x}-y${y}`;
  }

  static getTileKeyFromCoord(c:coord){
    return Board.getTileKey(c.x, c.y);
  }

  get tileCount(){
    return this.boardWidth * this.boardHeight;
  }

  getTile(x:number, y:number) : Tile{
    let key:string = Board.getTileKey(x, y);
    return this.tiles[key]
  }

  generateTiles(){
    for(let y = 0; y < this.boardHeight; y++){
      for(let x = 0; x < this.boardWidth; x++){
        let key:string = Board.getTileKey(x, y);
        let tile:Tile = new Tile(x, y, this);
        this.tiles[key] = tile;
      }
    }
  }

  populateFood(foodPositions:coord[]){
    foodPositions.forEach(pos => {
      let x = pos.x;
      let y = pos.y;
      let key = Board.getTileKey(x, y);
      let tile = this.tiles[key];
      tile.tileType = TileType.Food;
      tile.rewardStats.food = true;
      tile.rewardValue = this.tiles[key].reward;
      this.foodTiles.push(tile);
    });
  }

  populateSnakes(snakes:snake[]){
    snakes.forEach(s => {
      let len = s.length;
      
      // Populate body tiles
      s.body.forEach(b => {
        let key = Board.getTileKeyFromCoord(b);
        let bodyType:TileType = s.id == this.playerSnake.id ? TileType.PlayerBody : TileType.EnemyBody;
        this.tiles[key].tileType = bodyType;
        this.tiles[key].dangerStats.snakeBody = true;
      })

      // Populate tail tile
      let tailKey = Board.getTileKeyFromCoord(s.body[len - 1]);
      let tailType:TileType = s.id == this.playerSnake.id ? TileType.PlayerTail : TileType.EnemyTail;
      this.tiles[tailKey].tileType = tailType;
      
      // Populate head tile
      let headKey = Board.getTileKeyFromCoord(s.head);
      let headType:TileType = s.id == this.playerSnake.id ? TileType.PlayerHead : TileType.EnemyHead;
      this.tiles[headKey].tileType = headType;
      
      // Increase danger/reward according enemy movement
      if(s.id != this.playerSnake.id){
        this.tiles[headKey].sidesKeys.forEach(key => {
          let tile:Tile = this.tiles[key];
          if(this.playerSnake.length <= s.length){
            // Player can die
            tile.dangerStats.nearHead = true;
            if(tile.tileType < 2) tile.tileType = TileType.NextMove;
          }
          else{
            // Player can kill snake
            tile.rewardStats.nearKillableHead = true;
            tile.rewardValue = tile.reward;
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
