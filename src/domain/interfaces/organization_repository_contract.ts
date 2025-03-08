import { Organization } from "@/domain/models/organization";
import { OrganizationDTO } from "../dtos/organizationDTO";

/**
 * OrganizationRepositoryContract defines the repository interface
 * for managing organization data.
 */
export interface OrganizationRepositoryContract {
  
  create(organization: OrganizationDTO): Promise<OrganizationDTO>;

  
  getAll(): Promise<OrganizationDTO[]>;

  
  getByName(name: string): Promise<OrganizationDTO[]>;

  
  getBySubscription(subscriptionID: string): Promise<OrganizationDTO[]>;

  
  getByCNPJ(cnpj: string): Promise<OrganizationDTO>;

  
  update(organization: Organization): Promise<void>;

  
  delete(id: string): Promise<void>;
}
