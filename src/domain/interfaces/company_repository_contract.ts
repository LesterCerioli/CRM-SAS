import { CNPJ } from "@/shared/cnpj";
import { Company } from "../models/company";
import { CompanyDTO } from "../dtos/companyDTO";


export interface CompanyRepositoryContract {
    create(company: Company): Promise<void>;
    update(id: string, company: Company): Promise<CompanyDTO>;
    delete(id: string): Promise<void>;
    listByOrganization(organizationID: string): Promise<CompanyDTO[]>;
    findByCNPJ(cnpj: CNPJ): Promise<CompanyDTO>;
    getByCreatedAt(id: string): Promise<CompanyDTO>;
    getByUpdatedAt(id: string): Promise<CompanyDTO>;
    getByDeletedAt(id: string): Promise<CompanyDTO>;
}
