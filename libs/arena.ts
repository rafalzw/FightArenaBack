import { WarriorRecord } from '../records/warrior.record';
import { random } from '../utils/random';

export class Arena {
    private attackingWarrior = random(1, 2);

    private winner: WarriorRecord;

    private fightDetails: string[] = [];

    constructor(
        public warrior1: WarriorRecord,
        public warrior2: WarriorRecord,
    ) { }

    get details(): string[] {
        return this.fightDetails;
    }

    fight(): void {
        do {
            this.winner = this.fightRound();
        } while (this.winner === null);
    }

    fightRound(): WarriorRecord | null {
        const attacker = this.attackingWarrior === 1 ? this.warrior1 : this.warrior2;
        const defender = this.attackingWarrior === 1 ? this.warrior2 : this.warrior1;

        this.attackingWarrior = this.attackingWarrior === 1 ? 2 : 1;

        if (defender.dp > attacker.power) {
            defender.dp -= attacker.power;
            this.fightDetails.push(`Warrior ${attacker.name} attacks... 🗡️ Warrior ${defender.name} get ${attacker.power} damages. (${defender.name} 🛡️ DP: ${defender.dp} ❤️ HP: ${defender.hp})`);
        } else {
            defender.hp += defender.dp - attacker.power;
            defender.dp = 0;
            this.fightDetails.push(`Warrior ${attacker.name} attacks... 🗡️ Warrior ${defender.name} get ${attacker.power} damages. (${defender.name} 🛡️ DP: ${defender.dp} ❤️ HP: ${defender.hp})`);
        }
        if (defender.hp <= 0) {
            this.fightDetails.push(`${defender.name} lost... The winner is ${attacker.name} 🏅`);
            attacker.wins++;
            attacker.update();
            return attacker;
        }
        return null;
    }
}
