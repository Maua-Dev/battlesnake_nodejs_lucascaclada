import { config } from 'dotenv';
config()
import express, { Request, Response } from 'express';
import ServerlessHttp from 'serverless-http';
import { STAGE } from './enums/stage_enum';
import { router } from './routes/snake_routes'
import { Board } from './objects/board'
import { moveRequest, boardData } from './objects/board_data_interface'

const app = express();
app.use(express.json());
app.use(router)

app.post('/start', (req: Request, res: Response) => {
    res.send("ok");
});

app.post('/move', (req: Request, res: Response) => {
    const request:moveRequest = req.body;
    const bData:boardData = request.board;
    const b = new Board(bData);

    console.log(`Turn ${request.turn} - Match ${request.game.id} `);
    b.render()
    console.log('');
    // Chose random direction
    const directions = ["up", "down", "left", "right"];
    const i = Math.floor(Math.random() * directions.length);
    const response = {
        move: directions[i],
        shout: `I'm moving ${directions[i]}!`
    };
    res.json(response);
});

app.post('/end', (req: Request, res: Response) => {
    res.send("ok");
});

console.log('process.env.STAGE: ' + process.env.STAGE)

if (process.env.STAGE === STAGE.TEST) {
    app.listen(3000, () => {console.log('Server up and running on: http://localhost:3000 🚀')})
} else {
    module.exports.handler = ServerlessHttp(app)
}
