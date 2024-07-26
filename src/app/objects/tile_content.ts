// Base class
export enum TileType{
  Empty,
  Food,
  EnemyHead,
  EnemyBody,
  EnemyTail,
  PlayerHead,
  PlayerBody,
  PlayerTail
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