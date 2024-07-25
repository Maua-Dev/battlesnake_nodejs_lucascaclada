import { TileContent } from './tile_content'

export class Tile{
  xPos:number;
  yPos:number;
  sides:number[][] = [];
  content?:TileContent = undefined;

  constructor(x:number, y:number, width:number = 11, height:number = 11){
    this.xPos = x;
    this.yPos = y;

    if(this.xPos > 0) this.sides.push([this.xPos - 1, this.yPos]);
    if(this.xPos < width - 1) this.sides.push([this.xPos + 1, this.yPos]);
    if(this.yPos > 0) this.sides.push([this.xPos, this.yPos - 1]);
    if(this.xPos < height - 1) this.sides.push([this.xPos, this.yPos + 1]);
  }
}
