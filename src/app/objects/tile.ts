import { Board } from './board'
import { TileContent } from './tile_content'

export class Tile{
  xPos:number;
  yPos:number;
  sidesKeys:string[] = [];
  content:TileContent;

  constructor(x:number, y:number, width:number = 11, height:number = 11){
    this.xPos = x;
    this.yPos = y;

    this.content = new TileContent();

    if(this.xPos > 0) this.sidesKeys.push(Board.getTileKey(x - 1 , y));
    if(this.xPos < width - 1) this.sidesKeys.push(Board.getTileKey(x + 1, y));
    if(this.yPos > 0) this.sidesKeys.push(Board.getTileKey(x, y - 1));
    if(this.yPos < height - 2) this.sidesKeys.push(Board.getTileKey(x, y + 1));
  }
}
