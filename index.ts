import cors from "cors";
import express, {json} from "express";
import {handleError, ValidationError} from "./utils/errors";
import {addRouter} from "./routes/create-warrior";
import { fightRouter } from "./routes/fight-arena";
import {hallOfFameRouter} from "./routes/hall-of-fame";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.use('/create-warrior', addRouter);
app.use('/fight-arena', fightRouter);
app.use('/hall-of-fame', hallOfFameRouter);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
})