import { snake, coord } from './board_data_interface'
import { Board } from './board'
import { Tile } from './tile'
import { TileContent, TileType} from './tile_content';

export class Snake{
    head:coord;
    directions:string[] = [];

    constructor(youData:snake){
        this.head = youData.head;
    }

    // Checks available directions
    checkSides(board:Board){
        // Check Left Side
        if(this.head.x > 0){
            let leftSideTile:Tile = board.getTile(this.head.x - 1, this.head.y);
            let canMove:boolean = leftSideTile.content.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('left');
            }
        }

        // Check Down Side
        if(this.head.y > 0){
            let downSideTile:Tile = board.getTile(this.head.x, this.head.y - 1);
            let canMove:boolean = downSideTile.content.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('down');
            }
        } 

        // Check Right Side
        if(this.head.x < board.boardWidth - 1){
            let rightSideTile:Tile = board.getTile(this.head.x + 1, this.head.y);
            console.log(rightSideTile.content.tileType);
            let canMove:boolean = rightSideTile.content.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('right');
            }
        }

        // Check Up Side
        if(this.head.y < board.boardWidth - 1){
            let upSideTile:Tile = board.getTile(this.head.x, this.head.y + 1);
            let canMove:boolean = upSideTile.content.tileType in [TileType.Empty, TileType.Food];
            if(canMove){
                this.directions.push('up');
            }
        }
    }
}