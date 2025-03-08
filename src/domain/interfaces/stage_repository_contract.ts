import { StageDTO } from "../dtos/stageDTO";


export interface StageRepositoryContract {
  create(stage: StageDTO): Promise<StageDTO>;
  findByName(name: string): Promise<StageDTO>;
  findByDescription(description: string): Promise<StageDTO>;
  update(id: string, stage: Partial<StageDTO>): Promise<void>;
  delete(id: string): Promise<void>;
  getStageList(): Promise<StageDTO[]>;
}
