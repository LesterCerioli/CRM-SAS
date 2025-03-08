import { StageDTO } from "@/domain/dtos/stageDTO";
import { StageRepositoryContract } from "@/domain/interfaces/stage_repository_contract";
import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export class StageRepository implements StageRepositoryContract {
  async create(stage: StageDTO): Promise<StageDTO> {
    return await prisma.stage.create({
      data: stage,
    });
  }

  async findByName(name: string): Promise<StageDTO> {
    const stage = await prisma.stage.findUnique({
      where: { name },
    });
    if (!stage) throw new Error("Stage not found");
    return stage;
  }

  async findByDescription(description: string): Promise<StageDTO> {
    const stage = await prisma.stage.findFirst({
      where: { description },
    });
    if (!stage) throw new Error("Stage not found");
    return stage;
  }

  async update(id: string, stageData: Partial<StageDTO>): Promise<void> {
    await prisma.stage.update({
      where: { id },
      data: stageData,
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.stage.delete({
      where: { id },
    });
  }

  async getStageList(): Promise<StageDTO[]> {
    return await prisma.stage.findMany();
  }
}
