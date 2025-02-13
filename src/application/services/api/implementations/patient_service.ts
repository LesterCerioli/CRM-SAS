import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { logService } from "@/application/services/api/implementations/log_service";
import dotenv from "dotenv";


dotenv.config();

interface PatientDTO {
    id?: string;
    organizationId: string;
    cpf: string;
    name: string;
    dob: Date;
    gender: string;
    address: string;
    contact: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class PatientService {
    private readonly pool: Pool;
    private readonly serviceName = "PatientService";
    private readonly MAX_RETRIES = 5;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
    }

    /** Creates a new patient */
    async create(patient: PatientDTO): Promise<string> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Creating a new patient`);

                const patientId = uuidv4();
                const query = `
                    INSERT INTO patients (id, organization_id, cpf, name, dob, gender, address, contact, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())
                    RETURNING id
                `;

                const values = [
                    patientId,
                    patient.organizationId,
                    patient.cpf,
                    patient.name,
                    patient.dob,
                    patient.gender,
                    patient.address,
                    patient.contact,
                ];

                const result = await this.pool.query(query, values);

                console.log(`[${this.serviceName}] Patient created with ID: ${patientId}`);
                logService.log(startTime, "success");
                return result.rows[0].id;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to create patient`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets patients by name */
    async getByName(name: string): Promise<PatientDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching patients by name: ${name}`);

                const query = `SELECT * FROM patients WHERE LOWER(name) = LOWER($1)`;
                const result = await this.pool.query(query, [name]);

                console.log(`[${this.serviceName}] Fetched patients successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch patients by name`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets patients by CPF */
    async getByCPF(cpf: string): Promise<PatientDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching patients by CPF: ${cpf}`);

                const query = `SELECT * FROM patients WHERE cpf = $1`;
                const result = await this.pool.query(query, [cpf]);

                console.log(`[${this.serviceName}] Fetched patients successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch patients by CPF`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets patients by date of birth */
    async getByDOB(dob: Date): Promise<PatientDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching patients by DOB: ${dob}`);

                const query = `SELECT * FROM patients WHERE dob = $1`;
                const result = await this.pool.query(query, [dob]);

                console.log(`[${this.serviceName}] Fetched patients successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch patients by DOB`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets patients by creation date */
    async getByCreatedAt(createdAt: Date): Promise<PatientDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching patients created at: ${createdAt}`);

                const query = `SELECT * FROM patients WHERE DATE(created_at) = $1`;
                const result = await this.pool.query(query, [createdAt.toISOString().split("T")[0]]);

                console.log(`[${this.serviceName}] Fetched patients successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch patients by CreatedAt`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets all patients */
    async getPatientsList(): Promise<PatientDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching all patients`);

                const query = `SELECT * FROM patients ORDER BY created_at DESC`;
                const result = await this.pool.query(query);

                console.log(`[${this.serviceName}] Fetched all patients successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch patients`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Retries database operations in case of failure */
    private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
        let attempts = 0;

        while (attempts < this.MAX_RETRIES) {
            const startTime = new Date();
            try {
                const result = await operation();
                return result;
            } catch (error) {
                attempts++;
                console.error(`Operation failed (Attempt ${attempts}/${this.MAX_RETRIES}):`, error);

                if (attempts >= this.MAX_RETRIES) {
                    logService.log(startTime, "failure");
                    throw new Error("Database operation failed after multiple retries.");
                }

                console.warn(`Retrying operation in ${2 ** attempts} seconds...`);
                await this.sleep(2 ** attempts * 1000);
            }
        }

        throw new Error("Unexpected error in retry mechanism.");
    }

    /** Delays execution for retry mechanism */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export default new PatientService();
