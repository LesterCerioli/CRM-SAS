import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";
import { AppointmentServiceContract } from "../contracts/appointment_service_contract";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import { pool } from "@/infrastructure/db/postgres/db";
import { logService } from "./log_service";


export class AppointmentService implements AppointmentServiceContract {
  private readonly MAX_RETRIES = 5;

  async create(appointment: AppointmentDTO, acceptLanguage: string): Promise<string> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
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
        
        logService.log(startTime, "success"); 
        return result.rows[0].id;
      } catch (error) {
        logService.log(startTime, "failure"); 
        throw error;
      }
    });
  }

  async update(appointment: AppointmentDTO, acceptLanguage: string): Promise<void> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
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
        
        logService.log(startTime, "success"); 
      } catch (error) {
        logService.log(startTime, "failure"); 
        throw error;
      }
    });
  }

  async findByDateTime(dateTime: Date, acceptLanguage: string): Promise<AppointmentDTO[]> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
        const formattedDate = this.formatDateForLocale(dateTime, acceptLanguage);

        const query = `SELECT * FROM appointments WHERE date_time = $1`;
        const result = await pool.query(query, [formattedDate]);

        logService.log(startTime, "success"); 

        return result.rows.map((a: any) => ({
          id: a.id,
          organizationId: a.organization_id,
          patientId: a.patient_id,
          userId: a.user_id,
          dateTime: new Date(a.date_time),
          status: a.status,
          notes: a.notes,
          createdAt: new Date(a.created_at),
          updatedAt: new Date(a.updated_at),
        }));
      } catch (error) {
        logService.log(startTime, "failure"); 
        throw error;
      }
    });
  }

  async getAll(acceptLanguage: string): Promise<AppointmentDTO[]> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
        const query = `SELECT * FROM appointments ORDER BY created_at DESC`;
        const result = await pool.query(query);

        logService.log(startTime, "success"); 

        return result.rows.map((a: any) => ({
          id: a.id,
          organizationId: a.organization_id,
          patientId: a.patient_id,
          userId: a.user_id,
          dateTime: new Date(a.date_time),
          status: a.status,
          notes: a.notes,
          createdAt: new Date(a.created_at),
          updatedAt: new Date(a.updated_at),
        }));
      } catch (error) {
        logService.log(startTime, "failure"); // ✅ Log failure
        throw error;
      }
    });
  }

  /**
   * Formats the date based on the user's language preference.
   */
  private formatDateForLocale(date: Date, acceptLanguage: string): string {
    const locale = acceptLanguage?.toLowerCase().includes("pt-br") ? "pt-BR" : "en-US";
    return locale === "pt-BR"
      ? format(date, "dd/MM/yyyy", { locale: ptBR })
      : format(date, "yyyy/MM/dd");
  }

  /**
   * Retries the given database operation up to MAX_RETRIES with exponential backoff.
   */
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
          logService.log(startTime, "failure"); // ✅ Log failure if max retries reached
          throw new Error("Database operation failed after multiple retries.");
        }

        // Log retry attempt
        console.warn(`Retrying operation in ${2 ** attempts} seconds...`);
        await this.sleep(2 ** attempts * 1000);
      }
    }

    throw new Error("Unexpected error in retry mechanism.");
  }

  /**
   * Delays execution for a specified time (used for retry backoff).
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
