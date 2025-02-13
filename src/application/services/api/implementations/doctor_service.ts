import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { DoctorServiceContract } from "@/application/services/api/contracts/doctor_service_contract";
import { logService } from "@/application/services/api/implementations/log_service";
import { DoctorDTO } from "@/domain/dtos/doctorDTO";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER as string,
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
    port: Number(process.env.DB_PORT),
});

export class DoctorService implements DoctorServiceContract {
    async create(doctor: DoctorDTO): Promise<string> {
        const startTime = new Date();
        const client = await pool.connect();
        try {
            console.log(`[DoctorService] Creating a new doctor`);

            const doctorId = doctor.id || uuidv4();
            
            
            const existingDoctor = await client.query(
                "SELECT id FROM doctors WHERE crm_registry = $1",
                [doctor.crmRegistry]
            );

            if (existingDoctor.rows.length > 0) {
                console.log(`[DoctorService] Doctor with CRM ${doctor.crmRegistry} already exists.`);
                logService.log(startTime, "failure");
                throw new Error("Doctor with this CRM already exists.");
            }

            
            const insertQuery = `
                INSERT INTO doctors 
                (id, full_name, contact_phone, crm_registry, specialization, address, identity, cpf, date_of_birth)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
                RETURNING id;
            `;

            const result = await client.query(insertQuery, [
                doctorId,
                doctor.fullName,
                doctor.contactPhone,
                doctor.crmRegistry,
                doctor.specialization,
                doctor.address,
                doctor.identity,
                doctor.cpf,
                doctor.dateOfBirth,
            ]);

            const newDoctorId = result.rows[0].id;
            console.log(`[DoctorService] Doctor created with ID: ${newDoctorId}`);
            logService.log(startTime, "success");
            return newDoctorId;
        } catch (error) {
            console.error(`[DoctorService] Failed to create doctor`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release(); 
        }
    }

    async getByFullName(fullName: string): Promise<DoctorDTO[]> {
        return this.getByField("full_name", fullName);
    }

    async getByCRMRegistry(crmRegistry: string): Promise<DoctorDTO[]> {
        return this.getByField("crm_registry", crmRegistry);
    }

    async getBySpecialization(specialization: string): Promise<DoctorDTO[]> {
        return this.getByField("specialization", specialization);
    }

    async getByCPF(cpf: string): Promise<DoctorDTO[]> {
        return this.getByField("cpf", cpf);
    }

    async getDoctorList(): Promise<DoctorDTO[]> {
        const startTime = new Date();
        const client = await pool.connect();
        try {
            console.log(`[DoctorService] Fetching all doctors`);
            const result = await client.query("SELECT * FROM doctors");
            console.log(`[DoctorService] Fetched doctors successfully`);
            logService.log(startTime, "success");
            return result.rows.map(this.toDoctorDTO);
        } catch (error) {
            console.error(`[DoctorService] Failed to fetch doctor list`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    private async getByField(field: string, value: string): Promise<DoctorDTO[]> {
        const startTime = new Date();
        const client = await pool.connect();
        try {
            console.log(`[DoctorService] Fetching doctors by ${field}: ${value}`);
            const query = `SELECT * FROM doctors WHERE ${field} = $1`;
            const result = await client.query(query, [value]);
            console.log(`[DoctorService] Fetched doctors by ${field} successfully`);
            logService.log(startTime, "success");
            return result.rows.map(this.toDoctorDTO);
        } catch (error) {
            console.error(`[DoctorService] Failed to fetch doctors by ${field}`, error);
            logService.log(startTime, "failure");
            throw error;
        } finally {
            client.release();
        }
    }

    private toDoctorDTO(doctor: any): DoctorDTO {
        return {
            id: doctor.id,
            fullName: doctor.full_name,
            contactPhone: doctor.contact_phone,
            crmRegistry: doctor.crm_registry,
            specialization: doctor.specialization,
            address: doctor.address,
            identity: doctor.identity,
            cpf: doctor.cpf,
            dateOfBirth: doctor.date_of_birth,
        };
    }
}
