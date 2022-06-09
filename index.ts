import cors from "cors";
import express, {json, Router} from "express";
import {handleError, ValidationError} from "./utils/errors";
import {addRouter} from "./routes/create-warrior";
import { fightRouter } from "./routes/fight-arena";
import {hallOfFameRouter} from "./routes/hall-of-fame";
import {config} from "./config/config";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
}));
app.use(json());

const router = Router();

router.use('/create-warrior', addRouter);
router.use('/fight-arena', fightRouter);
router.use('/hall-of-fame', hallOfFameRouter);

app.use('/api', router);

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
})