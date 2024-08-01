import { Board } from './board'

export enum TileType{
  Empty,
  Food,
  EnemyHead,
  EnemyBody,
  EnemyTail,
  PlayerHead,
  PlayerBody,
  PlayerTail,
  NextMove
}

export class Dangers{
  snakeBody:boolean = false;
  nearHead:boolean = false;
  smallSection:boolean = false;
}

export class Rewards{
  food:boolean = false;
  foodDist:number = 0;
}

export class Tile{
  xPos:number;
  yPos:number;

  sidesKeys:string[] = [];
  sides:Tile[] = []

  tileType:TileType = TileType.Empty;
  
  dangerStats:Dangers = new Dangers();
  dangerValue:number = 0;

  rewardStats:Rewards = new Rewards();
  rewardValue:number = 0;

  section:string;
  sectionSize:number = 1;

  constructor(x:number, y:number, board:Board){
    this.xPos = x;
    this.yPos = y;
    this.section = (x + y * board.boardWidth).toString();

    if(this.xPos > 0) this.sidesKeys.push(Board.getTileKey(x - 1 , y));
    if(this.xPos < board.boardWidth - 1) this.sidesKeys.push(Board.getTileKey(x + 1, y));
    if(this.yPos > 0) this.sidesKeys.push(Board.getTileKey(x, y - 1));
    if(this.yPos < board.boardHeight - 2) this.sidesKeys.push(Board.getTileKey(x, y + 1));
  }

  static sectionDanger(width:number, height:number, sectionSize:number){
    return (width * height) / sectionSize;
  }

  calculateDanger(board:Board){
    if(this.dangerStats.snakeBody){
      this.dangerValue = 9999;
      return this.dangerValue;
    }

    if(this.tileType == TileType.NextMove){
      this.sides = this.sidesKeys.map(k => board.tiles[k])
        .filter(t => t.tileType == TileType.Empty)
        .sort((a, b) => b.sectionSize - a.sectionSize)
      if(this.sides.length > 0) this.sectionSize = this.sides[0].sectionSize;
    }

    this.dangerValue = Tile.sectionDanger(board.boardWidth, board.boardHeight, this.sectionSize);

    if(this.dangerStats.nearHead) this.dangerValue += 1;
    if(this.dangerStats.smallSection){
      this.dangerValue += 1;
    }
    this.dangerValue = Math.round(this.dangerValue * 1000) / 1000;
  }

  get reward(){
    this.rewardValue = 0;
    if(this.rewardStats.food) this.rewardValue += 1;
    return this.rewardValue;
  }
}
