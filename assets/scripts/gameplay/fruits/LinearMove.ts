import { BaseMove } from "db://assets/scripts/gameplay/fruits/BaseMove";
import { Node } from "cc";

export class LinearMove extends BaseMove {

    constructor(protected node: Node, protected speedY: number = 20) {
        super(node);
    }

    public override update(dt: number) {
        this.node.setPosition(this.node.position.x, this.node.position.y - this.speedY);
    }

}