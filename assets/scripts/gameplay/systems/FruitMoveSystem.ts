import { System } from "db://assets/scripts/gameplay/systems/System";
import { FruitInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";

/**
 *  Система отвечает за вызов функции движения у сущностей фруктов.
 */
export class FruitMoveSystem extends System {

    public override update(dt: number) {
        this.engine.getEntitiesByType("fruit").forEach(it => {
            const info = it.info as FruitInfo;
            if (!info.isMovable) {
                return;
            }
            info.move.update(dt);
        });
    }

}