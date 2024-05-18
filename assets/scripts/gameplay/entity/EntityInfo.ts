import { BaseMove } from "db://assets/scripts/gameplay/fruits/BaseMove";
import { FruitFactoryState } from "db://assets/scripts/gameplay/FruitFactoryState";
import { FruitMoveType } from "db://assets/scripts/gameplay/fruits/FruitMoveType";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";

export type FruitInfo = {
    isCollected: boolean;
    isMovable: boolean;
    isDangerous?: boolean;
    move: BaseMove;
}

export type FruitCaughtEventInfo = {
    fruit: Entity;
}

export type FruitMissedEventInfo = {
    fruit: Entity;
}

export type SpawnFruitEventInfo = {
    fruitType: FruitFactoryState;
    moveType: FruitMoveType;
    speed: number;
    isDangerous?: boolean;
};