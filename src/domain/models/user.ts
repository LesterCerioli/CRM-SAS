import { v4 as uuidv4 } from "uuid";
import { Organization } from "./organization";

export class User {
  id: string;
  organizationId: string;
  organization?: Organization; 
  name: string;
  email: string;
  password: string;
  role: string; 
  createdAt: Date;
  updatedAt: Date;

  constructor(
    organizationId: string,
    name: string,
    email: string,
    password: string,
    role: string
  ) {
    this.id = uuidv4(); 
    this.organizationId = organizationId;
    this.name = name;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
