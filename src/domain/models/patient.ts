import { v4 as uuidv4 } from "uuid";

export class Patient {
  id: string;
  organizationId: string;
  cpf: string;
  name: string;
  dob: Date;
  gender: string;
  address: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    organizationId: string,
    cpf: string,
    name: string,
    dob: Date,
    gender: string,
    address: string,
    contact: string
  ) {
    this.id = uuidv4(); 
    this.organizationId = organizationId;
    this.cpf = cpf;
    this.name = name;
    this.dob = dob;
    this.gender = gender;
    this.address = address;
    this.contact = contact;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
