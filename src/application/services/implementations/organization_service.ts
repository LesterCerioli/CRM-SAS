import { Pool } from "pg";
import { v4 as uuidv4, validate as isUUID } from "uuid";
import { logService } from "@/application/services/api/implementations/log_service";
import dotenv from "dotenv";

dotenv.config();

/** DTO for Organization */
interface OrganizationDTO {
    id?: string;
    name: string;
    address: string;
}

/** Interface Contract */
interface OrganizationServiceContract {
    create(dto: OrganizationDTO): Promise<string>;
    getAll(): Promise<OrganizationDTO[]>;
    getByName(name: string): Promise<OrganizationDTO[]>;
    getBySubscription(subscriptionID: string): Promise<OrganizationDTO[]>;
    update(dto: OrganizationDTO): Promise<void>;
    delete(id: string): Promise<void>;
    getByCNPJ(cnpj: string): Promise<OrganizationDTO[]>;
}

export class OrganizationService implements OrganizationServiceContract {
    private pool: Pool;
    private readonly serviceName = "OrganizationService";

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
    }

    /** Create a new Organization */
    async create(dto: OrganizationDTO): Promise<string> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Creating a new organization`);

            const organizationId = uuidv4();
            const query = `
                INSERT INTO organizations (id, name, address, created_at, updated_at)
                VALUES ($1, $2, $3, NOW(), NOW()) RETURNING id
            `;

            const result = await client.query(query, [organizationId, dto.name, dto.address]);
            console.log(`[${this.serviceName}] Organization created with ID: ${organizationId}`);

            logService.log(startTime, "success");
            return result.rows[0].id;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[${this.serviceName}] Failed to create organization`, error);

            logService.log(startTime, "failure");
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }

    /** Get all Organizations */
    async getAll(): Promise<OrganizationDTO[]> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching all organizations`);
            const query = `SELECT id, name, address FROM organizations`;
            const result = await client.query(query);

            console.log(`[${this.serviceName}] Fetched organizations successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            console.error(`[${this.serviceName}] Failed to fetch organizations`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    /** Get Organizations by Name */
    async getByName(name: string): Promise<OrganizationDTO[]> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching organizations with name: ${name}`);
            const query = `SELECT id, name, address FROM organizations WHERE LOWER(name) = LOWER($1)`;
            const result = await client.query(query, [name]);

            console.log(`[${this.serviceName}] Fetched organizations by name successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            console.error(`[${this.serviceName}] Failed to fetch organizations by name`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    /** Get Organizations by Subscription */
    async getBySubscription(subscriptionID: string): Promise<OrganizationDTO[]> {
        if (!isUUID(subscriptionID)) {
            throw new Error("Invalid subscription ID");
        }

        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching organizations for subscription ID: ${subscriptionID}`);
            const query = `
                SELECT o.id, o.name, o.address
                FROM organizations o
                JOIN subscriptions s ON s.organization_id = o.id
                WHERE s.id = $1
            `;

            const result = await client.query(query, [subscriptionID]);

            console.log(`[${this.serviceName}] Fetched organizations by subscription successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            console.error(`[${this.serviceName}] Failed to fetch organizations by subscription`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    /** Update an Organization */
    async update(dto: OrganizationDTO): Promise<void> {
        if (!dto.id || !isUUID(dto.id)) {
            throw new Error("Invalid organization ID");
        }

        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Updating organization ID: ${dto.id}`);
            const query = `
                UPDATE organizations
                SET name = $1, address = $2, updated_at = NOW()
                WHERE id = $3
            `;

            await client.query(query, [dto.name, dto.address, dto.id]);
            console.log(`[${this.serviceName}] Organization updated successfully`);

            logService.log(startTime, "success");
        } catch (error: unknown) {
            console.error(`[${this.serviceName}] Failed to update organization`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    /** Delete an Organization */
    async delete(id: string): Promise<void> {
        if (!isUUID(id)) {
            throw new Error("Invalid organization ID");
        }

        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Deleting organization ID: ${id}`);
            const query = `DELETE FROM organizations WHERE id = $1`;
            await client.query(query, [id]);

            console.log(`[${this.serviceName}] Organization deleted successfully`);
            logService.log(startTime, "success");
        } catch (error: unknown) {
            console.error(`[${this.serviceName}] Failed to delete organization`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    /** Get Organizations by CNPJ */
    async getByCNPJ(cnpj: string): Promise<OrganizationDTO[]> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching organizations with CNPJ: ${cnpj}`);
            const query = `SELECT id, name, address FROM organizations WHERE cnpj = $1`;
            const result = await client.query(query, [cnpj]);

            console.log(`[${this.serviceName}] Fetched organizations by CNPJ successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            console.error(`[${this.serviceName}] Failed to fetch organizations by CNPJ`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }
}

export default new OrganizationService();
