import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { EngineModel } from "db://assets/scripts/gameplay/EngineModel";
import { Engine } from "db://assets/scripts/gameplay/Engine";
import { Node } from "cc";
import { FruitInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";
import { LinearMove } from "db://assets/scripts/gameplay/fruits/LinearMove";
import { RandomSpeedLinearMove } from "db://assets/scripts/gameplay/fruits/RandomSpeedLinearMove";
import { LinearSpeedSineMove } from "db://assets/scripts/gameplay/fruits/LinearSpeedSineMove";

export class EntityFactory {

    public list: Entity[];

    constructor(private mode: EngineModel, private engine: Engine) {}

    public createTimeWidget(node: Node): Entity {
        return  {
            type: "timeWidget",
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