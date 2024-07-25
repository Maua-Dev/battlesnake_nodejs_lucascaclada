// Base class
export class TileContent{
  name:string
  icon:string = '.';
  constructor(tileName:string){
    this.name = tileName;
  }
}

// Enemy Snake
export class SnakeBody extends TileContent{
  size:number;
  constructor(size:number){ 
    super('Snake');
    this.size = size;
    this.icon = 'S';
  }
}

export class SnakeTail extends SnakeBody{
  constructor(size:number){
    super(size);
    this.icon = 'T';
  }
}
export class SnakeHead extends SnakeBody{
  constructor(size:number){
    super(size);
    this.icon = 'H';
  }
}

// Food
export class Food extends TileContent{
  constructor(){
    super('Food');
    this.icon = 'F'
  }
}
