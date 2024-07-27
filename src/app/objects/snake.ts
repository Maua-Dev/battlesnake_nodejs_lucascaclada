import { snake, coord } from './board_data_interface'
import { Board } from './board'
import { Tile, TileType } from './tile'

class Direction{
    name:string;
    danger:number;
    reward:number;

    constructor(name:string, danger:number, reward:number){
        this.name = name;
        this.danger = danger;
        this.reward = reward;
    }
}

export class Snake{
    id:string;
    length:number;
    head:coord;
    directions:string[] = [];

    constructor(snakeData:snake){
        this.id = snakeData.id;
        this.length = snakeData.length;
        this.head = snakeData.head;
    }

    // Checks available directions
    checkSides(board:Board) : string[]{
        let dirs:Direction[] = [];
        // Check Left Side
        if(this.head.x > 0){
            let tile:Tile = board.getTile(this.head.x - 1, this.head.y);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('left', tile.danger, tile.reward);
                dirs.push(d);
            }
        }

        // Check Down Side
        if(this.head.y > 0){
            let tile:Tile = board.getTile(this.head.x, this.head.y - 1);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('down', tile.danger, tile.reward);
                dirs.push(d);
            }
        } 

        // Check Right Side
        if(this.head.x < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x + 1, this.head.y);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('right', tile.danger, tile.reward);
                dirs.push(d);
            }
        }

        // Check Up Side
        if(this.head.y < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x, this.head.y + 1);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('up', tile.danger, tile.reward);
                dirs.push(d);
            }
        }

        // Rank directions by danger
        let safeDirs = dirs.filter(d => d.danger == 0);
        if(safeDirs.length > 0){
            dirs = safeDirs;
            dirs = dirs.sort((a, b) => b.reward - a.reward);
        }
        else{
            dirs = dirs.sort((a, b) => a.danger - b.danger);
        }
        console.log(dirs);
        return dirs.map(d => d.name);
    }
}