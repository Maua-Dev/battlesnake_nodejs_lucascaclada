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

class Dangers{
  snakeBody:boolean = false;
  nearHead:boolean = false;
  smallSection:boolean = false;
}

class Rewards{
  food:boolean = false;
  foodDist:number = 0;
}

export class Tile{
  xPos:number;
  yPos:number;
  sidesKeys:string[] = [];

  tileType:TileType = TileType.Empty;
  
  dangerStats:Dangers = new Dangers();
  dangerValue:number = 0;

  rewardStats:Rewards = new Rewards();
  rewardValue:number = 0;

  section:string;
  sectionSize:number = 1;

  constructor(x:number, y:number, width:number = 11, height:number = 11){
    this.xPos = x;
    this.yPos = y;
    this.section = (x + y * width).toString();

    if(this.xPos > 0) this.sidesKeys.push(Board.getTileKey(x - 1 , y));
    if(this.xPos < width - 1) this.sidesKeys.push(Board.getTileKey(x + 1, y));
    if(this.yPos > 0) this.sidesKeys.push(Board.getTileKey(x, y - 1));
    if(this.yPos < height - 2) this.sidesKeys.push(Board.getTileKey(x, y + 1));
  }

  get danger(){
    if(this.dangerStats.snakeBody){
      this.dangerValue = 9999;
      return this.dangerValue;
    }
    this.dangerValue = 0;
    if(this.dangerStats.nearHead) this.dangerValue += 1;
    if(this.dangerStats.smallSection) this.dangerValue += 1;
    return this.dangerValue;
  }

  get reward(){
    this.rewardValue = 0;
    if(this.rewardStats.food) this.rewardValue += 1;
    return this.rewardValue;
  }
}
