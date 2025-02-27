import { pool } from "@/infrastructure/db/postgres/db";
import { v4 as uuidv4 } from "uuid";
import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";

export class AppointmentService {
    async create(appointment: AppointmentDTO): Promise<string> {
        const id = uuidv4();
        const query = `
            INSERT INTO appointments (id, organization_id, patient_id, user_id, date_time, status, notes, created_at, updated_at)
            VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
            RETURNING id
        `;

        const values = [
            id,
            appointment.organizationId,
            appointment.patientId,
            appointment.patientName,
            appointment.userId,
            appointment.dateTime,
            appointment.status || "Pending"
            
        ];

        const result = await pool.query(query, values);
        return result.rows[0].id;
    }

    async findByPatient(name: string): Promise<AppointmentDTO[]> {
        const query = `
            SELECT a.id, a.organization_id, p.name AS name, d.full_name AS doctorName, 
                   a.date_time, a.status, a.notes, a.created_at, a.updated_at 
            FROM appointments a 
            JOIN patients p ON p.id = a.patient_id 
            JOIN doctors d ON d.id = a.user_id 
            WHERE LOWER(p.name) = LOWER($1)
        `;
        const result = await pool.query(query, [name]);
        return result.rows;
    }

    async findByDoctor(doctorName: string): Promise<AppointmentDTO[]> {
        const query = `
            SELECT a.id, a.organization_id, p.name AS name, d.full_name AS doctorName, 
                   a.date_time, a.status, a.notes, a.created_at, a.updated_at 
            FROM appointments a 
            JOIN patients p ON p.id = a.patient_id 
            JOIN doctors d ON d.id = a.user_id 
            WHERE LOWER(d.full_name) = LOWER($1)
        `;
        const result = await pool.query(query, [doctorName]);
        return result.rows;
    }

    async findByDate(date: string): Promise<AppointmentDTO[]> {
        const query = `
            SELECT a.id, a.organization_id, p.name AS name, d.full_name AS doctorName, 
                   a.date_time, a.status, a.notes, a.created_at, a.updated_at 
            FROM appointments a 
            JOIN patients p ON p.id = a.patient_id 
            JOIN doctors d ON d.id = a.user_id 
            WHERE DATE(a.date_time) = $1
        `;
        const result = await pool.query(query, [date]);
        return result.rows;
    }

    async getAll(): Promise<AppointmentDTO[]> {
        const query = `
            SELECT a.id, a.organization_id, p.name AS name, d.full_name AS doctorName, 
                   a.date_time, a.status, a.notes, a.created_at, a.updated_at 
            FROM appointments a 
            JOIN patients p ON p.id = a.patient_id 
            JOIN doctors d ON d.id = a.user_id
        `;
        const result = await pool.query(query);
        return result.rows;
    }
}

export const appointmentService = new AppointmentService();
