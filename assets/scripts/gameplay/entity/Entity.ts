import { EntityType } from "db://assets/scripts/gameplay/entity/EntityType";
import { EntityView } from "db://assets/scripts/gameplay/entity/EntityView";

export type Entity = {
    type: EntityType;
    view?: EntityView;
    info?: any;
}