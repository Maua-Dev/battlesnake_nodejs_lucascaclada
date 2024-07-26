import { config } from 'dotenv';
config()
import express, { Request, Response } from 'express';
import ServerlessHttp from 'serverless-http';
import { STAGE } from './enums/stage_enum';
import { router } from './routes/snake_routes'
import { Board } from './objects/board'
import { moveRequest, boardData } from './objects/board_data_interface'
import { Snake } from './objects/snake';

const app = express();
app.use(express.json());
app.use(router)

app.post('/start', (req: Request, res: Response) => {
    res.send('ok');
});

app.post('/move', (req: Request, res: Response) => {
    const request:moveRequest = req.body;
    const bData:boardData = request.board;
    const b = new Board(bData);
    const s = new Snake(request.you);
    s.checkSides(b);

    console.log(`Turn ${request.turn} - Match ${request.game.id} `);
    b.render()
    console.log('');

    // Chose random direction
    const directions = s.directions;
    console.log(directions);
    const i = Math.floor(Math.random() * directions.length);
    console.log(i);
    console.log(directions[i]);
    const response = {
        move: directions[i],
        shout: `I'm moving ${directions[i]}!`
    };
    console.log(response);
    res.json(response);
});

app.post('/end', (req: Request, res: Response) => {
    res.send('ok');
});

console.log('process.env.STAGE: ' + process.env.STAGE)

if (process.env.STAGE === STAGE.TEST) {
    app.listen(3000, () => {console.log('Server up and running on: http://localhost:3000')})
} else {
    module.exports.handler = ServerlessHttp(app)
}
