import { snake, coord } from './board_data_interface'
import { Board } from './board'
import { Tile, Dangers } from './tile'

class Direction{
    name:string;
    danger:number;
    reward:number;
    dangerStats:Dangers;

    constructor(name:string, tile:Tile){
        this.name = name;
        this.danger = tile.dangerValue;
        this.reward = tile.rewardValue;
        this.dangerStats = tile.dangerStats;
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
                let d:Direction = new Direction('left', tile);
                dirs.push(d);
            }
        }

        // Check Down Side
        if(this.head.y > 0){
            let tile:Tile = board.getTile(this.head.x, this.head.y - 1);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('down', tile);
                dirs.push(d);
            }
        } 

        // Check Right Side
        if(this.head.x < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x + 1, this.head.y);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('right', tile);
                dirs.push(d);
            }
        }

        // Check Up Side
        if(this.head.y < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x, this.head.y + 1);
            let canMove:boolean = tile.tileType < 2;
            if(canMove){
                let d:Direction = new Direction('up', tile);
                dirs.push(d);
            }
        }

        // Check if there are safe tiles
        let safeDirs = dirs.filter(d => !d.dangerStats.nearHead&& !d.dangerStats.smallSection);
        if(safeDirs.length > 0){
            // Rank safe tiles by reward
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
