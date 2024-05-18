import { System } from "db://assets/scripts/gameplay/systems/System";
import { SpawnFruitEventInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";
import { delay } from "db://assets/scripts/utils/delay";
import { FruitFactoryState } from "db://assets/scripts/gameplay/FruitFactoryState";
import { FruitMoveType } from "db://assets/scripts/gameplay/fruits/FruitMoveType";

type QueueItem = {
    fruitType: FruitFactoryState;
    moveType: FruitMoveType;
    speed?: number;
    delay: number;
    isDangerous?: boolean;
}

/**
 *  Система генерирует сценарии генерации фруктов.
 */
export class FruitsTimelineSystem extends System {

    private gameStartDelay = 2000;

    private queue: QueueItem[] = [];

    private patterns: QueueItem[][] = [];

    constructor() {
        super();
        this.listen("gameStarted", this.onGameStarted);

        this.createPatterns();
    }

    private onGameStarted() {

        delay(this.gameStartDelay).then(() => this.spawnFruit());
    }

    private spawnFruit() {
        if (!this.engine.isActive) {
            return;
        }

        if (!this.queue.length) {
            this.generateQueue();
        }

        const next = this.queue.shift();

        this.engine.emitEvent("spawnFruit", {
            moveType: next.moveType,
            fruitType: next.fruitType,
            speed: next.speed,
            isDangerous: next.isDangerous
        } as SpawnFruitEventInfo);

        delay(next.delay).then(() => this.spawnFruit());
    }

    private generateQueue() {
        const randomPattern = this.patterns[Math.floor(Math.random() * this.patterns.length)];
        this.queue = randomPattern.slice();
    }

    private createPatterns() {
        this.patterns.push([
            { fruitType: "randomSafe", moveType: "linear", speed: 8, delay: 500 },
            { fruitType: "randomSafe", moveType: "linear", speed: 8, delay: 500 },
            { fruitType: "randomSafe", moveType: "linearSpeedSine", speed: 8, delay: 800 },
            { fruitType: "randomSafe", moveType: "linear", speed: 25, delay: 1300 },
            { fruitType: "dangerousObjects", moveType: "linear", speed: 10, delay: 900, isDangerous: true },
        ]);

        this.patterns.push([
            { fruitType: "randomSafe", moveType: "linear", speed: 8, delay: 1500 },
            { fruitType: "randomSafe", moveType: "linearSpeedSine", speed: 8, delay: 800 },
            { fruitType: "randomSafe", moveType: "linear", speed: 15, delay: 700 },
            { fruitType: "randomSafe", moveType: "randomSpeedLinear", delay: 1400 },
            { fruitType: "randomSafe", moveType: "randomSpeedLinear", delay: 1400 },
            { fruitType: "randomSafe", moveType: "randomSpeedLinear", delay: 1400 },
            { fruitType: "dangerousObjects", moveType: "linear", speed: 10, delay: 900, isDangerous: true },
        ]);

        this.patterns.push([
            { fruitType: "randomSafe", moveType: "linear", speed: 8, delay: 900 },
            { fruitType: "randomSafe", moveType: "linear", speed: 10, delay: 300 },
            { fruitType: "randomSafe", moveType: "linearSpeedSine", speed: 8, delay: 800 },
            { fruitType: "randomSafe", moveType: "linear", speed: 12, delay: 600 },
            { fruitType: "randomSafe", moveType: "linear", speed: 14, delay: 900 },
            { fruitType: "dangerousObjects", moveType: "linear", speed: 16, delay: 900, isDangerous: true },
        ]);
    }

}