import { System } from "db://assets/scripts/gameplay/systems/System";
import { FruitFactory } from "db://assets/scripts/gameplay/FruitFactory";
import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { Engine } from "db://assets/scripts/gameplay/Engine";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { Vec3, Node } from "cc";
import { FruitInfo, SpawnFruitEventInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";
import { FruitMoveType } from "db://assets/scripts/gameplay/fruits/FruitMoveType";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";

/**
 *  Система отвечает за добавление сущностей фруктов в игровой мир и на сцену.
 *  Работает в связке с FruitsTimelineSystem, ожидая от неё заполненных событий `spawnFruit`.
 */
export class FruitSpawnSystem extends System {

    private factory: FruitFactory;
    private fieldWidth = 1840;

    private entityMap: Map<FruitMoveType, (node: Node, speed: number) => Entity> = new Map();

    constructor() {
        super();
        this.listen("spawnFruit", this.onSpawnFruit);
    }

    public override attach(model: EngineModel, engine: Engine): System {
        super.attach(model, engine);

        this.factory = new FruitFactory(model.prefabs);

        this.entityMap.set("linear", model.entities.createLinearMoveFruit);
        this.entityMap.set("randomSpeedLinear", model.entities.createRandomSpeedLinearMoveFruit);
        this.entityMap.set("linearSpeedSine", model.entities.createLinearSpeedSineMoveFruit);

        return this;
    }

    private onSpawnFruit(e: EventEntity) {
        const info = e.info as SpawnFruitEventInfo;
        this.factory.setState(info.fruitType);
        const node = this.factory.create();

        const entity = this.entityMap.get(info.moveType)(node, info.speed);
        const xPos = Math.floor(Math.random() * this.fieldWidth);
        node.setPosition(new Vec3(xPos, 0));
        (entity.info as FruitInfo).move.updateStartPositionX(xPos);

        node.angle = Math.floor(Math.random() * 360);

        this.model.layers.fruits.addChild(node);

        this.engine.add(entity);
    }

}