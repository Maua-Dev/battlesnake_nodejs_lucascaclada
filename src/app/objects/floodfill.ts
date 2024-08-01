import { TimeBasedLinearTrafficRouting } from 'aws-cdk-lib/aws-codedeploy';
import { Board } from './board'
import { Tile, TileType } from './tile'

export function calculateSections(board:Board){
    new FloodFill(board);
}

class FloodFill{
    sections:{ [coord:string]: Tile[] } = {};
    board:Board;
    constructor(board:Board){
        this.board = board;
        this.initsections();
        this.floodFill();
        this.updateDanger();
    }

    initsections(){
        for(let key in this.board.tiles){
            let tile = this.board.tiles[key];
            this.sections[tile.section] = [tile];
        }
    }

    floodFill(){
        let width = this.board.boardWidth;
        let height = this.board.boardHeight;
        // Walk through every tile
        for(let y = 0; y < height; y++){
            for(let x = 0; x < width; x++){
                let tile:Tile = this.board.getTile(x, y);
                // Skip if tile is not empty or food
                if(tile.tileType > 1 && tile.tileType != TileType.EnemyTail && tile.tileType != TileType.PlayerTail) continue;
                let sides:string[] = tile.sidesKeys;
                // Check tile sides
                sides.forEach(key => {
                    let s = this.board.tiles[key];
                    // Merge if neighboor tile is empty
                    if(s.tileType < 2 && s.section != tile.section){
                        this.mergesections(tile.section, s.section);
                    }
                });
            }
        }
    }

    mergesections(firstsection:string, secondsection:string){
        // Merge secondsection into firstsection
        this.sections[secondsection].forEach(t => {
            t.section = firstsection;
            this.sections[firstsection].push(t);
        });
        delete this.sections[secondsection];
    }

    updateDanger(){
        let nextMoveTiles:Tile[] = [];
        let snakeSize:number = this.board.playerSnake.length;
        for(let key in this.sections){
            let sectionSize:number = this.sections[key].length;
            let isSectionDangerous:boolean = snakeSize > sectionSize;
            this.sections[key].forEach(tile => {
                if(tile.tileType == TileType.NextMove){
                  // Calculate danger after all tiles' dangers are calculated
                  nextMoveTiles.push(tile);
                }
                else{
                  tile.sectionSize = sectionSize;
                  if(isSectionDangerous) tile.dangerStats.smallSection = true;
                  tile.calculateDanger(this.board);
                }
            });
        }
        nextMoveTiles.forEach(t => t.calculateDanger(this.board));
    }
}
