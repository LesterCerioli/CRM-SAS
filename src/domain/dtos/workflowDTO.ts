import { Stage } from "../models/stage";

export interface  WorkflowDTO {
    id: string;
    name: string;
    description?: string;
    stages: Stage[];
    createdAt: Date;
    updatedAt: Date;

}