export interface CompanyDTO {
  id: string;
  fantasyName: string;
  legalName: string;
  document: string;
  ownerName: string;
  phoneCompany: string;
  address: string;
  city: string;
  state: string;
  country: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}