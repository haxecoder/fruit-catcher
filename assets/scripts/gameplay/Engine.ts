import { System } from "db://assets/scripts/gameplay/systems/System";
import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { GameStartSystem } from "db://assets/scripts/gameplay/systems/GameStartSystem";
import { GameUISystem } from "db://assets/scripts/gameplay/systems/GameUISystem";
import { EventType } from "db://assets/scripts/gameplay/entity/EventType";
import { delay } from "db://assets/scripts/utils/delay";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { EntityType } from "db://assets/scripts/gameplay/entity/EntityType";
import { BucketMouseSystem } from "db://assets/scripts/gameplay/systems/BucketMouseSystem";
import { BucketTapSystem } from "db://assets/scripts/gameplay/systems/BucketTapSystem";
import { FruitSpawnSystem } from "db://assets/scripts/gameplay/systems/FruitSpawnSystem";
import { FruitMoveSystem } from "db://assets/scripts/gameplay/systems/FruitMoveSystem";
import { CollisionSystem } from "db://assets/scripts/gameplay/systems/CollisionSystem";
import { FruitsTimelineSystem } from "db://assets/scripts/gameplay/systems/FruitsTimelineSystem";
import { FruitWasteSystem } from "db://assets/scripts/gameplay/systems/FruitWasteSystem";
import { AnimateCaughtSystem } from "db://assets/scripts/gameplay/systems/AnimateCaughtSystem";

export class Engine {

    private model: EngineModel;
    private systems: System[];
    private entities: Entity[];

    private onGameOver: () => void;

    private stalled: boolean = false;

    public init(model: EngineModel) {
        this.model = model;
        this.systems = this.createSystems(this.model, this);
        this.entities = [];
    }

    public start(onGameOver: () => void) {
        this.onGameOver = onGameOver;
        this.emitEvent("gameStarted");
    }

    private createSystems(model: EngineModel, engine: Engine): System[] {
        const result = [
            new GameStartSystem().attach(model, engine),
            new GameUISystem().attach(model, engine),
            new FruitSpawnSystem().attach(model, engine),
            new FruitMoveSystem().attach(model, engine),
            new CollisionSystem().attach(model, engine),
            new FruitsTimelineSystem().attach(model, engine),
            new FruitWasteSystem().attach(model, engine),
            new AnimateCaughtSystem().attach(model, engine),
        ];

        if ('ontouchstart' in document.documentElement) {
            result.push(new BucketTapSystem().attach(model, engine));
        } else {
            result.push(new BucketMouseSystem().attach(model, engine));
        }

        return result;
    }

    public emitEvent(type: EventType, info?: any) {
        if (type === "gameOver") {
            this.stalled = true;

            this.emitEvent("lockInput");
            delay(1000).then(() => {
                this.onGameOver();
            });

            return;
        }
        const event = { type, info } as EventEntity;
        this.systems?.forEach(it => it.onEvent(event));
    }

    public add(entity: Entity) {
        this.entities.push(entity);
        this.systems?.forEach(it => it.onEntityAdded(entity));
    }

    public remove(entity: Entity) {
        this.entities.remove(entity);
        this.systems?.forEach(it => it.onEntityRemoved(entity));
    }

    public update(deltaTime: number) {
        if (this.isActive) {
            this.systems?.forEach(it => it.update(deltaTime));
        }
    }

    public getEntitiesByType(e: EntityType): Entity[] {
        return this.entities.filter(it => it.type === e);
    }

    public get isActive(): boolean {
        return !this.stalled;
    }

}