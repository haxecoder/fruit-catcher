import { System } from "db://assets/scripts/gameplay/systems/System";
import { FruitMissedEventInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";

/**
 *  Система удаляет сущности фрукты, которые находятся ниже границы.
 */
export class FruitWasteSystem extends System {

    private readonly threshold = -1200;

    public override update(dt: number) {
        this.engine.getEntitiesByType("fruit").forEach(it => {
            if (it.view.node.position.y <= this.threshold) {
                this.engine.remove(it);
                this.model.layers.fruits.removeChild(it.view.node);
                this.engine.emitEvent("fruitMissed", {
                    fruit: it
                } as FruitMissedEventInfo);
            }
        });
    }

}