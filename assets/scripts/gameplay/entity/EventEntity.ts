import { EventType } from "db://assets/scripts/gameplay/entity/EventType";

export type EventEntity = {
    type: EventType;
    info?: any;
};