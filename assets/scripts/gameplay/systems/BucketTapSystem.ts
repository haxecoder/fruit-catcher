import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { EventTouch, NodeEventType } from "cc";

export class BucketTapSystem extends System {

    private bucket: Entity;

    private to: number = 0;
    private moveRight: boolean;
    private speed = 80;
    private angle = 30;

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "bucketWidget") {
            this.bucket = entity;
            this.model.layers.touch.on(NodeEventType.TOUCH_MOVE, this.onTouch.bind(this));
            this.model.layers.touch.on(NodeEventType.TOUCH_START, this.onTouch.bind(this));
        }
    }

    private onTouch(e: EventTouch) {
        this.to = Math.floor(e.getUILocation().x);
        const from = this.bucket.view.node.position.x;
        this.moveRight = this.to > from;
    }

    public override update(dt: number){
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