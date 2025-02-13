import { v4 as uuidv4 } from "uuid";

export class Doctor {
  id: string;
  organizationId: string;
  fullName: string;
  contactPhone: string;
  crmRegistry: string;
  specialization: string;
  address: string;
  identity: string;
  cpf: string;
  dateOfBirth: Date;
  internalId: string;

  constructor(
    organizationId: string,
    fullName: string,
    contactPhone: string,
    crmRegistry: string,
    specialization: string,
    address: string,
    identity: string,
    cpf: string,
    dateOfBirth: Date,
    internalId: string
  ) {
    this.id = uuidv4();
    this.organizationId = organizationId;
    this.fullName = fullName;
    this.contactPhone = contactPhone;
    this.crmRegistry = crmRegistry;
    this.specialization = specialization;
    this.address = address;
    this.identity = identity;
    this.cpf = cpf;
    this.dateOfBirth = dateOfBirth;
    this.internalId = internalId;
  }
}