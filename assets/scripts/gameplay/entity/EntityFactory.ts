import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { Node } from "cc";
import { FruitInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";
import { LinearMove } from "db://assets/scripts/gameplay/fruits/LinearMove";
import { RandomSpeedLinearMove } from "db://assets/scripts/gameplay/fruits/RandomSpeedLinearMove";
import { LinearSpeedSineMove } from "db://assets/scripts/gameplay/fruits/LinearSpeedSineMove";

export class EntityFactory {

    public createTimeWidget(node: Node): Entity {
        return  {
            type: "timeWidget",
            view: { node }
        }
    }

    public createSeriesWidget(node: Node): Entity {
        return  {
            type: "seriesWidget",
            view: { node }
        }
    }

    public createPointsWidget(node: Node): Entity {
        return  {
            type: "pointsWidget",
            view: { node }
        }
    }

    public createBucketWidget(node: Node): Entity {
        return  {
            type: "bucketWidget",
            view: { node }
        }
    }

    public createHeartsWidget(node: Node): Entity {
        return  {
            type: "heartsWidget",
            view: { node }
        }
    }

    public createLinearMoveFruit(node: Node, speed: number): Entity {
        return {
            type: "fruit",
            view: { node },
            info: {
                isMovable: true,
                isCollected: false,
                move: new LinearMove(node, speed)
            } as FruitInfo
        }
    }

    public createRandomSpeedLinearMoveFruit(node: Node, speed: number): Entity {
        return {
            type: "fruit",
            view: { node },
            info: {
                isMovable: true,
                isCollected: false,
                move: new RandomSpeedLinearMove(node, speed)
            } as FruitInfo
        }
    }

    public createLinearSpeedSineMoveFruit(node: Node, speed: number): Entity {
        return {
            type: "fruit",
            view: { node },
            info: {
                isMovable: true,
                isCollected: false,
                move: new LinearSpeedSineMove(node, speed)
            } as FruitInfo
        }
    }

}