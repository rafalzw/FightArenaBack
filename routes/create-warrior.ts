import { Router } from 'express';
import { WarriorRecord } from '../records/warrior.record';

export const addRouter = Router();

addRouter
    .post('/', async (req, res, next) => {
        try {
            const newWarrior = new WarriorRecord(req.body);
            await newWarrior.insert();
        } catch(err) {
            return res.status(400).json(err.message);
        }
        res.status(201).json('Successfully added!')
    });