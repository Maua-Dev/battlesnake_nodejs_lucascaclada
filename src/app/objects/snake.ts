import { snake, coord } from './board_data_interface'
import { Board } from './board'
import { Tile, Dangers, TileType } from './tile'

class Direction{
    name:string;
    tile:Tile;

    constructor(name:string, tile:Tile){
        this.name = name;
        this.tile = tile;
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
    checkSides(board:Board) : string[]{
        let dirs:Direction[] = [];
        // Check Left Side
        if(this.head.x > 0){
            let tile:Tile = board.getTile(this.head.x - 1, this.head.y);
            let canMove:boolean = tile.tileType < 2 || (tile.tileType != TileType.PlayerTail && this.health > 99);
            if(canMove){
                let d:Direction = new Direction('left', tile);
                dirs.push(d);
            }
        }

        // Check Down Side
        if(this.head.y > 0){
            let tile:Tile = board.getTile(this.head.x, this.head.y - 1);
            let canMove:boolean = tile.tileType < 2 || (tile.tileType != TileType.PlayerTail && this.health > 99);
            if(canMove){
                let d:Direction = new Direction('down', tile);
                dirs.push(d);
            }
        } 

        // Check Right Side
        if(this.head.x < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x + 1, this.head.y);
            let canMove:boolean = tile.tileType < 2 || (tile.tileType != TileType.PlayerTail && this.health > 99);
            if(canMove){
                let d:Direction = new Direction('right', tile);
                dirs.push(d);
            }
        }

        // Check Up Side
        if(this.head.y < board.boardWidth - 1){
            let tile:Tile = board.getTile(this.head.x, this.head.y + 1);
            let canMove:boolean = tile.tileType < 2 || (tile.tileType != TileType.PlayerTail && this.health > 99);
            if(canMove){
                let d:Direction = new Direction('up', tile);
                dirs.push(d);
            }
        }

        // Check if there are safe tiles
        dirs.forEach(d => d.tile.calculateDanger(board));
        let safeDirs = dirs.filter(d => !d.tile.dangerStats.nearHead && !d.tile.dangerStats.smallSection);
        if(safeDirs.length > 0){
            // Rank safe tiles by reward
            dirs = safeDirs;
            dirs = dirs.sort((a, b) => b.tile.rewardValue - a.tile.rewardValue);
        }
        else{
            dirs = dirs.sort((a, b) => a.tile.dangerValue - b.tile.dangerValue);
        }
        console.log(dirs);
        return dirs.map(d => d.name);
    }
}
