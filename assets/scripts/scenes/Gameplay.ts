import { _decorator, Component } from 'cc';
import { ViewLayers } from "db://assets/scripts/gameplay/ViewLayers";
import { Prefabs } from "db://assets/scripts/gameplay/Prefabs";
import { Engine } from "db://assets/scripts/gameplay/Engine";
import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { EntityFactory } from "db://assets/scripts/gameplay/entity/EntityFactory";

const { ccclass, property } = _decorator;

@ccclass('Gameplay')
export class Gameplay extends Component {

    private engine: Engine;

    protected override start() {
        this.engine = this.createEngine();
        const model = this.createEngineModel(this.engine);
        this.engine.init(model);
        this.engine.start(this.onGameOver);
    }

    protected override update(dt: number) {
        this.engine.update(dt);
    }

    private createEngineModel(engine: Engine): EngineModel {
        const it = new EngineModel();

        it.prefabs = this.node.getComponent(Prefabs);
        it.layers = this.node.getComponent(ViewLayers);
        it.entities = new EntityFactory(it, engine);
        it.pointsPerFruit = 50;

        return it;
    }

    private onGameOver() {
        // TODO: change screen
    }

    private createEngine(): Engine {
        return new Engine();
    }
}