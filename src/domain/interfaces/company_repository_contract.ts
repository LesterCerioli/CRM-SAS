import { CNPJ } from "@/shared/cnpj";
import { Company } from "../models/company";


export interface CompanyRepositoryContract {
    create(company: Company): Promise<void>;
    update(id: string, company: Company): Promise<void>;
    delete(id: string): Promise<void>;
    listByOrganization(organizationID: string): Promise<Company[]>;
    findByCNPJ(cnpj: CNPJ): Promise<Company>;
    getByCreatedAt(id: string): Promise<Date>;
    getByUpdatedAt(id: string): Promise<Date>;
    getByDeletedAt(id: string): Promise<Date | undefined>;
}
