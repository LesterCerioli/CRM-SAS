import { Stage } from "../models/stage";

export interface WorkflowTemplateDTO {
    id: string;
    name: string;
    description?: string;
    stages: Stage[];

}