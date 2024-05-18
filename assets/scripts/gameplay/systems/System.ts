import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { Engine } from "db://assets/scripts/gameplay/Engine";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { EventType } from "db://assets/scripts/gameplay/entity/EventType";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";

export class System {

    protected model: EngineModel;
    protected engine: Engine;

    protected eventMap: Map<EventType, (e: EventEntity) => void>;

    constructor() {
        this.eventMap = new Map<EventType, (e: EventEntity) => void>();
    }

    public attach(model: EngineModel, engine: Engine): System {
        this.model = model;
        this.engine = engine;
        return this;
    }

    public update(dt: number) {}
    public onEntityAdded(entity: Entity) {}
    public onEntityRemoved(entity: Entity) {}
    public onEvent(e: EventEntity) {
        const listener = this.eventMap.get(e.type);

        if (!listener) {
            return;
        }

        listener(e);
    }

    protected listen(event: EventType, listener: (e: EventEntity) => void) {
        this.eventMap.set(event, listener.bind(this));
    }
}