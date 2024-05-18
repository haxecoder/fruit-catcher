import { System } from "db://assets/scripts/gameplay/systems/System";
import { EventEntity } from "db://assets/scripts/gameplay/entity/EventEntity";
import { FruitCaughtInfo, FruitInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";
import { tween, UIOpacity, Vec3 } from "cc";

/**
 *  Система запускает твины на фруктах, которые были пойманы.
 */
export class AnimateCaughtSystem extends System {

    private disappearDuration = 0.48;
    private endScale = 1.55;

    constructor() {
        super();
        this.listen("fruitCaught", this.onFruitCaught);
        this.listen("dangerousCaught", this.onFruitCaught);
    }

    private onFruitCaught(e: EventEntity) {
        const info = e.info as FruitCaughtInfo;
        const fruit = info.fruit.view.node;
        const fruitInfo = info.fruit.info as FruitInfo;
        const opacity = fruit.getComponent(UIOpacity);

        if (!opacity) {
            throw `missing UIOpacity component`;
        }

        if (fruitInfo.isDangerous) {
            fruit.getChildByName("image").active = false;
            fruit.getChildByName("bad").active = true;
        }

        tween(opacity).to(this.disappearDuration, { opacity: 0 }).start();
        tween(fruit).to(this.disappearDuration, { scale: new Vec3(this.endScale, this.endScale), angle: 780 }).start();
    }

}