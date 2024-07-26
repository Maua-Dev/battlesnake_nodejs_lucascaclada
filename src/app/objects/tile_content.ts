// Base class
export enum TileType{
  Empty,
  Food,
  SnakeHead,
  SnakeBody,
  SnakeTail
}

export class TileContent{
  icon:string = '.';

  danger:number = 0;
  reward:number = 0;

  tileType:TileType;

  constructor(tile:TileType = TileType.Empty){
    this.tileType = tile;
  }
}