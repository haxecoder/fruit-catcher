import { System } from "db://assets/scripts/gameplay/systems/System";
import { Entity } from "db://assets/scripts/gameplay/entity/Entity";
import { BoxCollider2D, Intersection2D, PolygonCollider2D } from "cc";
import { FruitCaughtInfo, FruitInfo } from "db://assets/scripts/gameplay/entity/EntityInfo";
import { EventType } from "db://assets/scripts/gameplay/entity/EventType";

/**
 *  Система отвечает за обнаружение коллизий между коллайдером корзины и коллайдерами сущностей фруктов.
 */
export class CollisionSystem extends System {

    private bucket: Entity;

    public override onEntityAdded(entity: Entity) {
        if (entity.type === "bucketWidget") {
            this.bucket = entity;
            return;
        }
    }

    public override update(dt: number) {
        if (!this.bucket) {
            return;
        }

        const collider = this.bucket.view.node.getComponentInChildren(BoxCollider2D);
        const bucketPoints = collider.worldPoints;

        this.engine.getEntitiesByType("fruit").forEach(it => {
            const info = it.info as FruitInfo;
            if (info.isCollected) {
                return;
            }

            const fruitPoints = it.view.node.getComponentInChildren(PolygonCollider2D).worldPoints;

            if (Intersection2D.polygonPolygon(bucketPoints, fruitPoints)) {
                info.isCollected = true;
                info.isMovable = false;

                const eventType: EventType = info.isDangerous ? "dangerousCaught" : "fruitCaught";
                this.engine.emitEvent(eventType, { fruit: it } as FruitCaughtInfo);
            }
        });
    }

}