import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { Label } from "cc";
import { locale } from "db://assets/scripts/locale";

/**
 *  Система отвечает за обновление основных UI виджетов игры.
 */
export class GameUISystem extends System {

    private pointsEntity: Entity;
    private timerEntity: Entity;

    private points: number = 0;
    private roundTime: number = 30;

    private startStamp: number = 0;
    private endStamp: number = 0;

    constructor() {
        super();

        this.listen("fruitCaught", this.onFruitCaught);
        this.listen("gameStarted", this.onGameStarted);
    }

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "pointsWidget") {
            this.pointsEntity = entity;
            this.updatePoints();
            return;
        }

        if (entity.type === "timeWidget") {
            this.timerEntity = entity;
            this.updateTimer();
            return;
        }
    }

    public override update(dt: number) {
        if (this.timerEntity) {
            this.updateTimer();
        }
    }

    private onGameStarted() {
        this.startStamp = Math.floor(Date.now() / 1000);
        this.endStamp = this.startStamp + this.roundTime;
    }

    private updateTimer() {
        let time = this.roundTime;
        if (this.startStamp !== 0) {
            time = this.endStamp - Math.floor(Date.now() / 1000);
        }

        if (time <= -1) {
            this.engine.emitEvent("gameOver");
        }

        this.timerEntity.view.node.getComponentInChildren(Label).string = locale.translate("Gameplay.Timer", Math.max(time, 0));
    }

    private updatePoints() {
        this.pointsEntity.view.node.getComponentInChildren(Label).string = locale.translate("Gameplay.Points", this.points);
    }

    private onFruitCaught() {
        this.points += this.model.pointsPerFruit;
        this.updatePoints();
    }
}