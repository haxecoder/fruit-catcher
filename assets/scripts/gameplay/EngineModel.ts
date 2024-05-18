import { Prefabs } from "db://assets/scripts/gameplay/Prefabs";
import { EntityFactory } from "db://assets/scripts/gameplay/entity/EntityFactory";
import { ViewLayers } from "db://assets/scripts/gameplay/ViewLayers";

export class EngineModel {

    public prefabs: Prefabs;
    public entities: EntityFactory;
    public layers: ViewLayers;
    public pointsPerFruit: number;
    public heartsPerGame: number;
    public seriesBonus: number;

}