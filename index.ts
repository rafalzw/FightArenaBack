import cors from "cors";
import express, {json} from "express";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.listen(3001, '0.0.0.0', () => {
    console.log('Listening on port http://localhost:3001');
})