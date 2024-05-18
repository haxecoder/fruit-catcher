import { IFruitGenerator } from "db://assets/scripts/gameplay/IFruitGenerator";
import { Prefabs } from "db://assets/scripts/gameplay/Prefabs";
import { FruitFactoryState } from "db://assets/scripts/gameplay/FruitFactoryState";
import { instantiate, Prefab, Node, Vec3, UITransform } from "cc";

export class FruitFactory implements IFruitGenerator {

    private strategies: Map<FruitFactoryState, () => Node> = new Map<FruitFactoryState, () => Node>();
    private currentStrategy: FruitFactoryState = "randomSafe";

    constructor(protected prefabs: Prefabs) {
        this.strategies.set("randomSafe", this.generateRandom.bind(this));
        this.strategies.set("dangerousObjects", this.generateDangerousObjects.bind(this));
    }

    public setState(state: FruitFactoryState) {
        this.currentStrategy = state;
    }

    public create(): Node {
        const strategy = this.strategies.get(this.currentStrategy);
        const node = strategy();
        const xScale = 100 / node.getComponentInChildren(UITransform).width;
        const yScale = 100 / node.getComponentInChildren(UITransform).height;
        const scale = Math.min(xScale, yScale);
        node.setScale(new Vec3(scale, scale));

        return node;
    }

    private generateDangerousObjects(): Node {
        return this.getRandomFruitPrefabInstanceFrom(this.prefabs.getDangerousObjects());
    }

    private generateRandom(): Node {
        return this.getRandomFruitPrefabInstanceFrom(this.prefabs.getAllSafeFruits());
    }

    private getRandomFruitPrefabInstanceFrom(it: Prefab[]): Node {
        const randomIndex = Math.floor(Math.random() * it.length);
        return instantiate(it[randomIndex]);
    }

}