import { Vec3, Node } from "cc";

export class BaseMove {

    protected startPosition: Vec3;

    constructor(protected node: Node) {
        this.startPosition = node.position.clone();
    }

    public update(dt: number) {

    }

    public updateStartPositionX(x: number) {
        this.startPosition.x = x;
    }

}