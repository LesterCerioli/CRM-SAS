import { Stage } from "./stage";
import { v4 as uuidv4 } from "uuid";
export class WorkflowTemplate {
    id: string;
    name: string;
    description?: string;
    stages: Stage[];
  
    constructor(name: string, stages: Stage[], description?: string) {
      this.id = uuidv4();
      this.name = name;
      this.description = description;
      this.stages = stages;
    }
  }