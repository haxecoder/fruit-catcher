import { _decorator, Component, Prefab, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Prefabs')
export class Prefabs extends Component {

    @property([SpriteFrame])
    private backgrounds: SpriteFrame[] = [];

    @property([Prefab])
    private fruits: Prefab[] = [];

    @property(Prefab)
    private pointsWidget: Prefab;

    @property(Prefab)
    private timeWidget: Prefab;

    @property(Prefab)
    private bucketWidget: Prefab;

    public getDefaultBackgroundSpriteFrame(): SpriteFrame {
        return this.backgrounds[0];
    }

    public getTimeWidget(): Prefab {
        return this.timeWidget;
    }

    public getPointsWidget(): Prefab {
        return this.pointsWidget;
    }

    public getAllFruits(): Prefab[] {
        return this.fruits;
    }

    public getYellowBananasFruits(): Prefab[] {
        return [this.fruits[0]];
    }

    public getRedFruits(): Prefab[] {
        return [
            this.fruits[1], // blackberry red
        ];
    }

    public getBucketWidget(): Prefab {
        return this.bucketWidget;
    }

}