import { Stage } from "../models/stage";

export interface StageRepositoryContract {
    create(stage: Stage): Promise<void>;
    findByName(name: string): Promise<Stage>;
    fingByDescription(description: string): Promise<Stage>;
    update(id: string, stage: Stage): Promise<void>;
    delete(id: string): Promise<void>;
    getStateList(): Promise<Stage>;

}