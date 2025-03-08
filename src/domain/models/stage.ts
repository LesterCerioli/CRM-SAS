import { v4 as uuidv4 } from 'uuid';
export class Stage {
    private id: string;
    private name: string;
    private order: number;
    private description: string;
  
    constructor(
        name: string,
        order: number, 
        description: string
    ) {
      this.id = uuidv4();
      this.name = name;
      this.order = order;
      this.description = description;
    }
  }