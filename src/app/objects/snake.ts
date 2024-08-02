import { snake, coord } from './board_data_interface'
import { Board } from './board'
import { Tile, Dangers, TileType } from './tile'

export class Direction{
    name:string;
    tile:Tile;
    score:number;

    constructor(name:string, tile:Tile){
        this.name = name;
        this.tile = tile;
        this.score = tile.rewardValue - tile.dangerValue;
    }
}

export class Snake{
    id:string;
    length:number;
    head:coord;
    directions:string[] = [];
    health:number;

    constructor(snakeData:snake){
        this.id = snakeData.id;
        this.length = snakeData.length;
        this.head = snakeData.head;
        this.health = snakeData.health;
    }

    // Checks available directions
    checkSides(board:Board) : Direction[]{
        let dirs:Direction[] = [];
        // Check Left Side
        if(this.head.x > 0){
            let tile:Tile = board.getTile(this.head.x - 1, this.head.y);
            let canMove = [TileType.Food, TileType.Empty, TileType.NextMove].includes(tile.tileType);
            if(canMove){
                let d:Direction = new Direction('left', tile);
                dirs.push(d);
            }
        }

        // Check Down Side
        if(this.head.y > 0){
            let tile:Tile = board.getTile(this.head.x, this.head.y - 1);
            let canMove = [TileType.Food, TileType.Empty, TileType.NextMove].includes(tile.tileType);
            if(canMove){
                let d:Direction = new Direction('down', tile);
                dirs.push(d);
            }
        } 

        // Check Right Side
        if(this.head.x < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x + 1, this.head.y);
            let canMove = [TileType.Food, TileType.Empty, TileType.NextMove].includes(tile.tileType);
            if(canMove){
                let d:Direction = new Direction('right', tile);
                dirs.push(d);
            }
        }

        // Check Up Side
        if(this.head.y < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x, this.head.y + 1);
            let canMove = [TileType.Food, TileType.Empty, TileType.NextMove].includes(tile.tileType);
            if(canMove){
                let d:Direction = new Direction('up', tile);
                dirs.push(d);
            }
        }
        return dirs;
        
    }
}
