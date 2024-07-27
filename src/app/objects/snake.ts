import { snake, coord } from './board_data_interface'
import { Board } from './board'
import { Tile, TileType } from './tile'

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
    checkSides(board:Board){
        // Check Left Side
        if(this.head.x > 0){
            let leftSideTile:Tile = board.getTile(this.head.x - 1, this.head.y);
            let canMove:boolean = leftSideTile.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('left');
            }
        }

        // Check Down Side
        if(this.head.y > 0){
            let downSideTile:Tile = board.getTile(this.head.x, this.head.y - 1);
            let canMove:boolean = downSideTile.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('down');
            }
        } 

        // Check Right Side
        if(this.head.x < board.boardWidth - 1){
            let rightSideTile:Tile = board.getTile(this.head.x + 1, this.head.y);
            let canMove:boolean = rightSideTile.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('right');
            }
        }

        // Check Up Side
        if(this.head.y < board.boardWidth - 1){
            let upSideTile:Tile = board.getTile(this.head.x, this.head.y + 1);
            let canMove:boolean = upSideTile.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('up');
            }
        }
    }
}