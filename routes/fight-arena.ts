import {Router} from 'express';
import {WarriorRecord} from '../records/warrior.record';
import {Arena} from '../libs/arena';
import {ValidationError} from '../utils/errors';

export const fightRouter = Router();

fightRouter
    .get('/', async (req, res) => {
        const warriorsList = await WarriorRecord.listAll();

        res.status(201).json(warriorsList)
    })
    .post('/fight', async (req, res) => {
        try {
            const warrior1 = await WarriorRecord.getOne(req.body.warrior1);
            const warrior2 = await WarriorRecord.getOne(req.body.warrior2);

            if (warrior1.id === warrior2.id) {
                throw new ValidationError('Choose two different warriors');
            }

            const arena = new Arena(warrior1, warrior2);
            arena.fight();
            const fightDetails = arena.details;

            res.status(200).json({
                fightDetails,
                warrior1,
                warrior2,
            });
        } catch (err) {
            return res.status(400).json(err.message);
        }
    });