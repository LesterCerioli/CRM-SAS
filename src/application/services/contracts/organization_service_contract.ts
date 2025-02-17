import { OrganizationDTO } from "@/domain/dtos/organizationDTO";


export interface OrganizationServiceContract {
  create(organization: OrganizationDTO): Promise<string>;
  getAll(): Promise<OrganizationDTO[]>;
  getByName(name: string): Promise<OrganizationDTO[]>;
  getBySubscription(subscriptionId: string): Promise<OrganizationDTO[]>;
  update(organization: OrganizationDTO): Promise<void>;
  delete(id: string): Promise<void>;
  getByCNPJ(cnpj: string): Promise<OrganizationDTO[]>;
}
