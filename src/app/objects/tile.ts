import { Board } from './board'

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

export class Dangers{
  snakeBody:boolean = false;
  nearHead:boolean = false;
  smallSet:boolean = false;
}

export class Tile{
  xPos:number;
  yPos:number;
  sidesKeys:string[] = [];

  tileType:TileType = TileType.Empty;
  
  dangerStats:Dangers = new Dangers();
  reward:number = 0;

  set:string;
  setSize:number = 1;

  constructor(x:number, y:number, width:number = 11, height:number = 11){
    this.xPos = x;
    this.yPos = y;
    this.set = (x + y * width).toString();

    if(this.xPos > 0) this.sidesKeys.push(Board.getTileKey(x - 1 , y));
    if(this.xPos < width - 1) this.sidesKeys.push(Board.getTileKey(x + 1, y));
    if(this.yPos > 0) this.sidesKeys.push(Board.getTileKey(x, y - 1));
    if(this.yPos < height - 2) this.sidesKeys.push(Board.getTileKey(x, y + 1));
  }

  get danger(){
    let sum = 0;
    for(let b in this.dangerStats){
      if(b) sum += .1;
    }
    return sum;
  }
}
