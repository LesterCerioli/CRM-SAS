import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";
import { AppointmentServiceContract } from "../contracts/appointment_service_contract";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { v4 as uuidv4 } from "uuid";
import { pool } from "@/infrastructure/db/postgres/db";
import { logService } from "./log_service";

export class AppointmentService implements AppointmentServiceContract {
  private readonly MAX_RETRIES = 5;

  /** 📌 Create a new appointment */
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
        throw new Error("Failed to create appointment: " + error);
      }
    });
  }

  /** 📌 Update an appointment */
  async update(id: string, appointmentUpdates: Partial<AppointmentDTO>): Promise<boolean> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
        if (!id || Object.keys(appointmentUpdates).length === 0) {
          logService.log(startTime, "failure");
          throw new Error("Invalid request payload or missing ID");
        }

        const fieldsToUpdate = Object.keys(appointmentUpdates)
          .map((key, index) => `${key} = $${index + 2}`)
          .join(", ");

        const values = [id, ...Object.values(appointmentUpdates)];
        const query = `
          UPDATE appointments
          SET ${fieldsToUpdate}, updated_at = NOW()
          WHERE id = $1
          RETURNING id;
        `;

        const result = await pool.query(query, values);
        if (result.rowCount === 0) {
          logService.log(startTime, "failure");
          return false;
        }

        logService.log(startTime, "success");
        return true;
      } catch (error) {
        logService.log(startTime, "failure");
        throw new Error("Failed to update appointment: " + error);
      }
    });
  }

  /** 📌 Find appointments by date */
  async findByDateTime(dateTime: Date, acceptLanguage: string): Promise<AppointmentDTO[]> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
        const formattedDate = this.formatDateForLocale(dateTime, acceptLanguage);

        const query = `SELECT * FROM appointments WHERE DATE(date_time) = $1`;
        const result = await pool.query(query, [formattedDate]);

        logService.log(startTime, "success");
        return result.rows.map((a: any) => this.mapAppointment(a));
      } catch (error) {
        logService.log(startTime, "failure");
        throw new Error("Failed to retrieve appointments by date: " + error);
      }
    });
  }

  /** 📌 Delete an appointment */
  async delete(id: string): Promise<boolean> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
        const query = `DELETE FROM appointments WHERE id = $1 RETURNING id`;
        const result = await pool.query(query, [id]);

        if (result.rowCount === 0) {
          logService.log(startTime, "failure");
          return false;
        }

        logService.log(startTime, "success");
        return true;
      } catch (error) {
        logService.log(startTime, "failure");
        throw new Error("Failed to delete appointment: " + error);
      }
    });
  }

  /** 📌 Retrieve all appointments */
  async getAll(): Promise<AppointmentDTO[]> {
    return this.retryOperation(async () => {
      const startTime = new Date();
      try {
        const query = `SELECT * FROM appointments ORDER BY created_at DESC`;
        const result = await pool.query(query);

        logService.log(startTime, "success");
        return result.rows.map((a: any) => this.mapAppointment(a));
      } catch (error) {
        logService.log(startTime, "failure");
        throw new Error("Failed to retrieve appointments: " + error);
      }
    });
  }

  /** 📌 Retrieve an appointment by ID */
  async findById(id: string): Promise<AppointmentDTO | null> {
    const startTime = new Date();
    try {
      const query = `SELECT * FROM appointments WHERE id = $1`;
      const result = await pool.query(query, [id]);

      if (result.rows.length === 0) {
        logService.log(startTime, "failure");
        return null;
      }

      logService.log(startTime, "success");
      return this.mapAppointment(result.rows[0]);
    } catch (error) {
      logService.log(startTime, "failure");
      throw new Error("Failed to retrieve appointment: " + error);
    }
  }

  /** 📌 Map raw DB results to AppointmentDTO */
  private mapAppointment(a: any): AppointmentDTO {
    return {
      id: a.id,
      organizationId: a.organization_id,
      patientId: a.patient_id,
      userId: a.user_id,
      dateTime: new Date(a.date_time),
      status: a.status,
      notes: a.notes,
      createdAt: new Date(a.created_at),
      updatedAt: new Date(a.updated_at),
    };
  }

  /** 📌 Format dates for different locales */
  private formatDateForLocale(date: Date, acceptLanguage: string): string {
    const locale = acceptLanguage?.toLowerCase().includes("pt-br") ? "pt-BR" : "en-US";
    return locale === "pt-BR"
      ? format(date, "dd/MM/yyyy", { locale: ptBR })
      : format(date, "yyyy-MM-dd");
  }

  /** 📌 Retry operation with exponential backoff */
  private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
    let attempts = 0;
    while (attempts < this.MAX_RETRIES) {
      const startTime = new Date();
      try {
        return await operation();
      } catch (error) {
        attempts++;
        console.error(`Attempt ${attempts}/${this.MAX_RETRIES} failed:`, error);
        if (attempts >= this.MAX_RETRIES) {
          logService.log(startTime, "failure");
          throw new Error("Database operation failed after multiple retries.");
        }
        await this.sleep(2 ** attempts * 1000);
      }
    }
    throw new Error("Unexpected error in retry mechanism.");
  }

  /** 📌 Helper function to delay execution */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
