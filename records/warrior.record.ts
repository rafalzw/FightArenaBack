import { ValidationError } from '../utils/errors';
import {WarriorEntity} from "../types";

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

}