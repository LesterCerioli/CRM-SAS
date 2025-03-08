import { v4 as uuidv4 } from "uuid";
import { Stage } from "./stage";
export class Workflow {
    id: string;
    name: string;
    description?: string;
    stages: Stage[];
    createdAt: Date;
    updatedAt: Date;
  
    constructor(name: string, stages: Stage[], description?: string) {
      this.id = uuidv4();
      this.name = name;
      this.description = description;
      this.stages = stages;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }