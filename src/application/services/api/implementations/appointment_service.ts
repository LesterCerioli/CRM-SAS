import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";
import { AppointmentServiceContract } from "../contracts/appointment_service_contract";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import { pool } from "@/infrastructure/db/postgres/db";

export class AppointmentService implements AppointmentServiceContract {
  async create(appointment: AppointmentDTO, acceptLanguage: string): Promise<string> {
    const id = uuidv4();
    const formattedDate = this.formatDateForLocale(appointment.dateTime, acceptLanguage);

    const query = `
      INSERT INTO appointments (id, organization_id, patient_id, user_id, date_time, status, notes, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
      RETURNING id
    `;

    const values = [
      id,
      appointment.organizationId,
      appointment.patientId,
      appointment.userId,
      formattedDate,
      appointment.status || "Pending",
      appointment.notes || "",
    ];

    const result = await pool.query(query, values);
    return result.rows[0].id;
  }

  async update(appointment: AppointmentDTO, acceptLanguage: string): Promise<void> {
    const formattedDate = this.formatDateForLocale(appointment.dateTime, acceptLanguage);

    const query = `
      UPDATE appointments
      SET organization_id = $2, patient_id = $3, user_id = $4, date_time = $5, status = $6, notes = $7, updated_at = NOW()
      WHERE id = $1
    `;

    const values = [
      appointment.id,
      appointment.organizationId,
      appointment.patientId,
      appointment.userId,
      formattedDate,
      appointment.status,
      appointment.notes,
    ];

    await pool.query(query, values);
  }

  async findByDateTime(dateTime: Date, acceptLanguage: string): Promise<AppointmentDTO[]> {
    const formattedDate = this.formatDateForLocale(dateTime, acceptLanguage);

    const query = `SELECT * FROM appointments WHERE date_time = $1`;
    const result = await pool.query(query, [formattedDate]);

    return result.rows.map((a: any) => ({
      id: a.id,
      organizationId: a.organization_id,
      patientId: a.patient_id,
      userId: a.user_id,
      dateTime: a.date_time,
      status: a.status,
      notes: a.notes,
      createdAt: a.created_at,
      updatedAt: a.updated_at,
    }));
  }

  async getAll(acceptLanguage: string): Promise<AppointmentDTO[]> {
    const query = `SELECT * FROM appointments ORDER BY created_at DESC`;
    const result = await pool.query(query);

    return result.rows.map((a: any) => ({
        id: a.id,
        organizationId: a.organization_id,
        patientId: a.patient_id,
        userId: a.user_id,
        dateTime: new Date(a.date_time), // Convert back to Date
        status: a.status,
        notes: a.notes,
        createdAt: new Date(a.created_at), // Ensure timestamps are Date objects
        updatedAt: new Date(a.updated_at),
    }));
  }

  private formatDateForLocale(date: Date, acceptLanguage: string): string {
    const locale = acceptLanguage?.toLowerCase().includes("pt-br") ? "pt-BR" : "en-US";
    return locale === "pt-BR"
      ? format(date, "dd/MM/yyyy", { locale: ptBR })
      : format(date, "yyyy/MM/dd");
  }
}
