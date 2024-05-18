import { BaseMove } from "db://assets/scripts/gameplay/fruits/BaseMove";
import { Node } from "cc";

export class RandomSpeedLinearMove extends BaseMove {

    private speedMax: number = 30;
    private speedMin: number = 5;

    private readonly speedY: number;

    constructor(protected node: Node, speed: number) {
        super(node);
        this.speedY = Math.random() * (this.speedMax - this.speedMin) + this.speedMin;
    }

    public override update(dt: number) {
        this.node.setPosition(this.node.position.x, this.node.position.y - this.speedY);
    }

}