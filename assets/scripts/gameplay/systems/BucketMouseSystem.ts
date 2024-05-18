import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { EventMouse, NodeEventType } from "cc";

export class BucketMouseSystem extends System {

    private bucket: Entity;

    private to: number = 0;
    private moveRight: boolean;
    private speed = 80;
    private angle = 30;

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "bucketWidget") {
            this.bucket = entity;
            this.model.layers.touch.on(NodeEventType.MOUSE_MOVE, this.onMouseMove.bind(this));
        }
    }

    private onMouseMove(e: EventMouse) {
        this.to = Math.floor(e.getUILocationX());
        const from = this.bucket.view.node.position.x;
        this.moveRight = this.to > from;
    }

    public override update(dt: number) {
        if (!this.bucket) {
            return;
        }

        this.bucket.view.node.angle = this.angle * (this.moveRight ? -1 : 1);
        let posX = this.bucket.view.node.position.x + this.speed * (this.moveRight ? 1 : -1);
        if ((this.moveRight && posX > this.to) || (!this.moveRight && posX < this.to)) {
            posX = this.to;
            this.bucket.view.node.angle = 0;
        }

        this.bucket.view.node.setPosition(posX, 0);
    }

}