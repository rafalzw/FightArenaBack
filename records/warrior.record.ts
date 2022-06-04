import { v4 as uuid } from 'uuid';
import { ValidationError } from '../utils/errors';
import {WarriorEntity} from "../types";
import {pool} from "../utils/db";

export class WarriorRecord implements WarriorEntity {
    id?: string;
    readonly name: string;
    power: number;
    defence: number;
    endurance: number;
    agility: number;
    wins = 0;
    hp?: number;
    dp?: number;

    constructor(obj: WarriorRecord) {
        this.id = obj.id;
        this.name = obj.name;
        this.power = obj.power;
        this.defence = obj.defence;
        this.endurance = obj.endurance;
        this.agility = obj.agility;
        this.wins = obj.wins;
        this.hp = this.endurance * 10;
        this.dp = this.defence;

        this.validation();
    }

    private validation(): void {
        if (!this.name || this.name.trim().length < 3 || this.name.length > 25) {
            throw new ValidationError('The name must be between 3 and 25 characters.');
        }
        if ((Number(this.power) + Number(this.defence) + Number(this.endurance) + Number(this.agility)) != 10) {
            throw new ValidationError('The total points to be use must be 10.');
        }
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute('INSERT INTO `warriors`(`id`, `name`, `power`, `defence`, `endurance`, `agility`) VALUES(:id, :name, :power, :defence, :endurance, :agility)', {
            id: this.id,
            name: this.name,
            power: this.power,
            defence: this.defence,
            endurance: this.endurance,
            agility: this.agility,
        });

        return this.id;
    }

    async update(): Promise<void> {
        await pool.execute('UPDATE `warriors` SET `wins` = :wins WHERE `id` = :id', {
            id: this.id,
            wins: this.wins,
        });
    }
}