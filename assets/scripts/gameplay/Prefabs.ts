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
    private heartsWidget: Prefab;

    @property(Prefab)
    private bucketWidget: Prefab;

    @property(Prefab)
    private seriesWidget: Prefab;

    public getDefaultBackgroundSpriteFrame(): SpriteFrame {
        return this.backgrounds[0];
    }

    public getHeartsWidget(): Prefab {
        return this.heartsWidget;
    }

    public getSeriesWidget(): Prefab {
        return this.seriesWidget;
    }

    public getTimeWidget(): Prefab {
        return this.timeWidget;
    }

    public getPointsWidget(): Prefab {
        return this.pointsWidget;
    }

    public getAllSafeFruits(): Prefab[] {
        return [
            this.fruits[0],
            this.fruits[1],
            this.fruits[2]
        ];
    }

    public getYellowBananasFruits(): Prefab[] {
        return [this.fruits[0]];
    }

    public getRedFruits(): Prefab[] {
        return [
            this.fruits[1], // blackberry red
        ];
    }

    public getDangerousObjects(): Prefab[] {
        return [
            this.fruits[3],
            this.fruits[4]
        ];
    }

    public getBucketWidget(): Prefab {
        return this.bucketWidget;
    }

}