export interface coord{
  x:number;
  y:number;
}

export interface customizations{
  color:string;
  head:string;
  tail:string;
}

export interface snake{
  id:string;
  name:string;
  health:number;
  body:coord[];
  latency:string;
  head:coord;
  length:number;
  shout:string;
  squad:string;
  customizations:customizations;
}

export interface boardData{
  width:number;
  height:number;
  food:coord[];
  hazards:coord[];
  snakes:snake[];
}

export interface rules{
  name:string;
  version:string;
}

export interface gameData{
  id:string;
  ruleset:rules;
  map:string;
  timeout:number;
  source:string;
}

export interface moveRequest{
  game:gameData;
  turn:number;
  board:boardData;
  you:snake;
}
