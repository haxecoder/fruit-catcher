import { BaseMove } from "db://assets/scripts/gameplay/fruits/BaseMove";
import { Node } from "cc";

export class LinearSpeedSineMove extends BaseMove {

    private readonly speedY: number;
    private path: number = 0;
    private targetY: number = 1200;
    private randomFreq = 1 + Math.random() * 5;
    private randomWidth = 70 + Math.random() * 200;

    constructor(protected node: Node, speed: number = 10) {
        super(node);
        this.speedY = speed;
    }

    public override update(dt: number) {
        this.path += this.speedY;
        const ratio = this.path / this.targetY;
        const posX = Math.sin(Math.PI * ratio * this.randomFreq) * this.randomWidth;
        this.node.setPosition(this.startPosition.x + posX, this.node.position.y - this.speedY);
    }

}