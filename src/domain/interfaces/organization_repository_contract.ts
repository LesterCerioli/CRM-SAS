import { Organization } from "@/domain/models/organization";

/**
 * OrganizationRepositoryContract defines the repository interface
 * for managing organization data.
 */
export interface OrganizationRepositoryContract {
  /**
   * Create a new organization.
   * @param organization - The organization entity to create.
   * @returns The UUID of the newly created organization.
   */
  create(organization: Organization): Promise<string>;

  /**
   * Retrieve all organizations.
   * @returns A list of all registered organizations.
   */
  getAll(): Promise<Organization[]>;

  /**
   * Retrieve organizations by name.
   * @param name - The name of the organization to search for.
   * @returns A list of organizations matching the given name.
   */
  getByName(name: string): Promise<Organization[]>;

  /**
   * Retrieve organizations by subscription ID.
   * @param subscriptionID - The subscription ID associated with the organizations.
   * @returns A list of organizations under the given subscription.
   */
  getBySubscription(subscriptionID: string): Promise<Organization[]>;

  /**
   * Retrieve an organization by CNPJ.
   * @param cnpj - The CNPJ of the organization.
   * @returns The organization if found, otherwise null.
   */
  getByCNPJ(cnpj: string): Promise<Organization | null>;

  /**
   * Update an existing organization.
   * @param organization - The updated organization entity.
   * @returns A promise resolving when the update is complete.
   */
  update(organization: Organization): Promise<void>;

  /**
   * Delete an organization by its UUID.
   * @param id - The UUID of the organization to delete.
   * @returns A promise resolving when the deletion is complete.
   */
  delete(id: string): Promise<void>;
}
