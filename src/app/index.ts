import { config } from 'dotenv';
config()
import express, { Request, Response } from 'express';
import ServerlessHttp from 'serverless-http';
import { STAGE } from './enums/stage_enum';
import { router } from './routes/snake_routes'
import { Board } from './objects/board'
import { moveRequest, boardData } from './objects/board_data_interface'
import { Snake } from './objects/snake';
import { CalculateMovement } from './movement_manager'

const app = express();
app.use(express.json());
app.use(router)

app.post('/start', (req: Request, res: Response) => {
    res.send('ok');
});

var latestMatch:Board[] = [];
var latestMatchId:string = "";

app.post('/move', (req: Request, res: Response) => {
    const request:moveRequest = req.body;
    const bData:boardData = request.board;

    console.log(`Turn ${request.turn}`);
    console.log(`Health: ${request.you.health}`)

    const snake = new Snake(request.you);
    const board = new Board(bData, snake);

    // Calculate next player movement
    const direction = CalculateMovement(board, snake);

    // Log board for debugging
    if(process.env.STAGE === STAGE.TEST){
        if(latestMatchId != request.game.id){
            latestMatch = [];
            latestMatchId = request.game.id;
        } else{
            latestMatch.push(board);
        }
    }

    // Send response
    const response = {
        move: direction,
        shout: `I'm moving ${direction}!`
    };
    res.json(response);
});

app.post('/end', (req: Request, res: Response) => {
    res.send('ok');
});

console.log('process.env.STAGE: ' + process.env.STAGE)

if (process.env.STAGE === STAGE.TEST) {
    app.listen(3000, () => {console.log('Server up and running on: http://localhost:3000')})
    app.use('/debug', express.static(__dirname + '/debugger'));
    app.get('/latestMatch', (req: Request, res: Response) => {
        res.json(latestMatch);
    });
} else {
    module.exports.handler = ServerlessHttp(app)
}
