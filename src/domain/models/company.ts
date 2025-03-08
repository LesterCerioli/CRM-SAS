import { CNPJ } from "@/shared/cnpj";
import { CPF } from "@/shared/cpf";
import { v4 as uuidv4 } from 'uuid';

export class Company {
  private id: string;
  private fantasyName: string;
  private legalName: string;
  private document: CPF | CNPJ;
  private ownerName: string;
  private phoneCompany: string;
  private address: string;
  private city: string;
  private state: string;
  private country: string;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor(
    id: string,
    fantasyName: string,
    legalName: string,
    document: string,
    ownerName: string,
    phoneCompany: string,
    address: string,
    city: string,
    state: string,
    counry: string,
    createdAt: Date,
    updatedAt: Date,
    deletedAt: Date

  ) {
    this.id = uuidv4();
    this.fantasyName = fantasyName;
    this.legalName = legalName;
    this.document = document.length === 11 ? new CPF(document) : new CNPJ(document);
    this.ownerName = ownerName;
    this.phoneCompany = phoneCompany;
    this.address = address;
    this.city = city;
    this.state = state;
    this.country = counry;
    this.createdAt = new Date(Date.now());
    this.updatedAt = new Date(Date.now());
    this.deletedAt = new Date(Date.now());
  }
  
}


