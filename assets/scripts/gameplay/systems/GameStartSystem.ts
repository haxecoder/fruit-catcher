import { System } from "db://assets/scripts/gameplay/systems/System";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { instantiate, Sprite } from "cc";

/**
 *  Система инстанцирует стартовые игровые сущности и элементы интерфейса.
 */
export class GameStartSystem extends System {

    constructor() {
        super();
        this.listen("gameStarted", this.onGameStarted);
    }

    private onGameStarted(e: EventEntity) {
        const { layers, prefabs, entities} = this.model;
        layers.background.getComponent(Sprite).spriteFrame = prefabs.getDefaultBackgroundSpriteFrame();

        const timeWidget = instantiate(prefabs.getTimeWidget());
        const pointsWidget = instantiate(prefabs.getPointsWidget());
        const bucketsWidget = instantiate(prefabs.getBucketWidget());

        layers.ui.addChild(timeWidget);
        layers.ui.addChild(pointsWidget);
        layers.bucket.addChild(bucketsWidget);

        this.engine.add(entities.createTimeWidget(timeWidget));
        this.engine.add(entities.createPointsWidget(pointsWidget));
        this.engine.add(entities.createBucketWidget(bucketsWidget));
    }

}