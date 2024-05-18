import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { Label } from "cc";
import { locale } from "db://assets/scripts/locale";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { FruitInfo, FruitMissedEventInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";

/**
 *  Система отвечает за обновление основных UI виджетов игры.
 *  Хранит основные данные игровой сессии (очки, количество жизней, бонусы за серии).
 */
export class GameUISystem extends System {

    private pointsEntity: Entity;
    private timerEntity: Entity;
    private heartsEntity: Entity;
    private seriesEntity: Entity;

    private points: number = 0;
    private roundTime: number = 30;
    private hearts: number = 0;

    private startStamp: number = 0;
    private endStamp: number = 0;

    private seriesBonus: number = 0;
    private series: number = 0;

    constructor() {
        super();

        this.listen("dangerousCaught", this.onDangerousCaught);
        this.listen("fruitCaught", this.onFruitCaught);
        this.listen("gameStarted", this.onGameStarted);
        this.listen("fruitMissed", this.onFruitMissed);
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

        if (entity.type === "heartsWidget") {
            this.heartsEntity = entity;
            this.updateHearts();
            return;
        }

        if (entity.type === "seriesWidget") {
            this.seriesEntity = entity;
            this.updateSeries();
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
        this.hearts = this.model.heartsPerGame;

        this.updateHearts();
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

    private updateHearts() {
        this.heartsEntity.view.node.getComponentInChildren(Label).string = locale.translate("Gameplay.Hearts", this.hearts);
    }

    private updateSeries() {
        this.seriesEntity.view.node.getComponentInChildren(Label).string = locale.translate("Gameplay.Series", this.seriesBonus);
    }

    private onFruitCaught() {
        this.points += this.model.pointsPerFruit + this.seriesBonus;
        this.updatePoints();

        this.series += 1;
        this.seriesBonus = this.series * this.model.seriesBonus;
        this.updateSeries();
    }

    private onFruitMissed(e: EventEntity) {
        const info = e.info as FruitMissedEventInfo;
        const fruitInfo = info.fruit.info as FruitInfo;

        if (fruitInfo.isDangerous) {
            return;
        }

        this.seriesBonus = 0;
        this.series = 0;

        this.updateSeries();
    }

    private onDangerousCaught() {
        this.hearts -= 1;
        this.updateHearts();

        if (this.hearts === 0) {
            this.engine.emitEvent("gameOver");
        }
    }
}