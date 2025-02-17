import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { logService } from "@/application/services/implementations/log_service";
import dotenv from "dotenv";

dotenv.config();

interface MedicalRecordRequestDTO {
    patientId: string;
    doctorId: string;
    diagnosis: string;
    treatment: string;
    notes: string;
}

interface MedicalRecordResponseDTO {
    id: string;
    patientId: string;
    doctorId: string;
    diagnosis: string;
    treatment: string;
    notes: string;
    createdAt: Date;
    updatedAt: Date;
    patientName?: string;
}

export class MedicalRecordService {
    private pool: Pool;
    private readonly serviceName = "MedicalRecordService";

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
    }

    /** Log user actions in the database */
    async logAction(userId: string, action: string, details: string): Promise<void> {
        const query = `
            INSERT INTO logs (id, user_id, service_name, action, details, timestamp)
            VALUES ($1, $2, $3, $4, $5, NOW())
        `;

        try {
            await this.pool.query(query, [uuidv4(), userId, this.serviceName, action, details]);
        } catch (error) {
            console.error(`[${this.serviceName}] Failed to log action:`, error);
        }
    }

    /** Create a new medical record */
    async create(medicalRecord: MedicalRecordRequestDTO): Promise<string> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Creating a new medical record`);

            const newRecordId = uuidv4();
            const query = `
                INSERT INTO medical_records (id, patient_id, doctor_id, diagnosis, treatment, notes, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, NOW(), NOW())
            `;

            await client.query(query, [
                newRecordId,
                medicalRecord.patientId,
                medicalRecord.doctorId,
                medicalRecord.diagnosis,
                medicalRecord.treatment,
                medicalRecord.notes,
            ]);

            console.log(`[${this.serviceName}] Medical record created with ID: ${newRecordId}`);
            logService.log(startTime, "success");
            await this.logAction(medicalRecord.patientId, "CreateMedicalRecordSuccess", "Record created successfully.");
            return newRecordId;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[${this.serviceName}] Failed to create medical record`, error);
            logService.log(startTime, "failure");
            await this.logAction(medicalRecord.patientId, "CreateMedicalRecordFailed", errorMessage);
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }

    /** Get medical records by created_at date */
    async getByCreatedAt(createdAt: Date): Promise<MedicalRecordResponseDTO[]> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching medical records created at: ${createdAt}`);
            const query = `
                SELECT 
                    mr.id, mr.patient_id, mr.doctor_id, mr.diagnosis, mr.treatment, mr.notes, 
                    mr.created_at, mr.updated_at, p.name AS patient_name
                FROM medical_records mr
                JOIN patients p ON mr.patient_id = p.id
                WHERE DATE(mr.created_at) = $1
            `;

            const result = await client.query(query, [createdAt.toISOString().split("T")[0]]);
            console.log(`[${this.serviceName}] Fetched medical records successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[${this.serviceName}] Failed to fetch medical records`, error);
            logService.log(startTime, "failure");
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }

    /** Get medical records by patient name */
    async getByPatientName(patientName: string): Promise<MedicalRecordResponseDTO[]> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching medical records for patient: ${patientName}`);
            const query = `
                SELECT 
                    mr.id, mr.patient_id, mr.doctor_id, mr.diagnosis, mr.treatment, mr.notes, 
                    mr.created_at, mr.updated_at, p.name AS patient_name
                FROM medical_records mr
                JOIN patients p ON mr.patient_id = p.id
                WHERE LOWER(p.name) = LOWER($1)
            `;

            const result = await client.query(query, [patientName]);
            console.log(`[${this.serviceName}] Fetched medical records successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[${this.serviceName}] Failed to fetch medical records`, error);
            logService.log(startTime, "failure");
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }

    /** Get all medical records */
    async getMedicalRecordList(): Promise<MedicalRecordResponseDTO[]> {
        const startTime = new Date();
        const client = await this.pool.connect();
        try {
            console.log(`[${this.serviceName}] Fetching all medical records`);
            const query = `
                SELECT 
                    mr.id, mr.patient_id, p.name AS patient_name, mr.doctor_id, 
                    mr.diagnosis, mr.treatment, mr.notes, mr.created_at, mr.updated_at
                FROM medical_records mr
                JOIN patients p ON mr.patient_id = p.id
            `;

            const result = await client.query(query);
            console.log(`[${this.serviceName}] Fetched medical records successfully`);
            logService.log(startTime, "success");
            return result.rows;
        } catch (error: unknown) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            console.error(`[${this.serviceName}] Failed to fetch medical records`, error);
            logService.log(startTime, "failure");
            throw new Error(errorMessage);
        } finally {
            client.release();
        }
    }
}

export default new MedicalRecordService();
