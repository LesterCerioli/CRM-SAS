import { Request, Response } from "express";
import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";
import { logService } from "@/application/services/api/implementations/log_service";
import { AppointmentServiceContract } from "@/application/services/api/contracts/appointment_service_contract";

export class AppointmentController {
  private appointmentService: AppointmentServiceContract;
  private readonly serviceName = "AppointmentController";

  constructor(appointmentService: AppointmentServiceContract) {
    this.appointmentService = appointmentService;
  }

  /** 📌 Create a new appointment */
  async createAppointment(req: Request, res: Response): Promise<Response> {
    const startTime = new Date();
    try {
      const appointment: AppointmentDTO = req.body;
      const acceptLanguage = req.headers["accept-language"] || "en-US";

      if (!appointment) {
        logService.log(startTime, "failure");
        return res.status(400).json({ error: "Invalid request payload" });
      }

      if (!req.headers.authorization) {
        logService.log(startTime, "failure");
        return res.status(401).json({ error: "Unauthorized" });
      }

      if (!this.isAuthorized(req)) {
        logService.log(startTime, "failure");
        return res.status(403).json({ error: "Forbidden" });
      }

      const result = await this.appointmentService.create(appointment, acceptLanguage);

      if (typeof result === "string") {
        logService.log(startTime, "success");
        return res.status(201).json({
          message: "Appointment created successfully",
          id: result,
        });
      }

      const { id, existing } = result;
      logService.log(startTime, "success");

      return res.status(existing ? 200 : 201).json({
        message: existing ? "Appointment already exists" : "Appointment created successfully",
        id,
      });

    } catch (error) {
      logService.log(startTime, "failure");
      return res.status(500).json({ error: "Failed to create appointment" });
    }
  }

  /** 📌 Retrieve an appointment by its ID */
  async getAppointmentById(req: Request, res: Response): Promise<Response> {
    const startTime = new Date();
    try {
      const { id } = req.params;

      if (!id) {
        logService.log(startTime, "failure");
        return res.status(400).json({ error: "Missing appointment ID" });
      }

      const appointment = await this.appointmentService.findById(id);
      if (!appointment) {
        logService.log(startTime, "failure");
        return res.status(404).json({ error: "Appointment not found" });
      }

      logService.log(startTime, "success");
      return res.status(200).json(appointment);
    } catch (error) {
      logService.log(startTime, "failure");
      return res.status(500).json({ error: "Failed to retrieve appointment" });
    }
  }

  /** 📌 Retrieve all appointments */
  async getAllAppointments(req: Request, res: Response): Promise<Response> {
    const startTime = new Date();
    try {
      const appointments = await this.appointmentService.getAll();
      if (!appointments.length) {
        logService.log(startTime, "failure");
        return res.status(404).json({ error: "No appointments found" });
      }

      logService.log(startTime, "success");
      return res.status(200).json(appointments);
    } catch (error) {
      logService.log(startTime, "failure");
      return res.status(500).json({ error: "Failed to retrieve appointments" });
    }
  }

  /** 📌 Retrieve appointments by date */
  async getAppointmentsByDate(req: Request, res: Response): Promise<Response> {
    const startTime = new Date();
    try {
      const { date } = req.query;
      const acceptLanguage = req.headers["accept-language"] || "en-US";

      if (!date) {
        logService.log(startTime, "failure");
        return res.status(400).json({ error: "Missing required date parameter" });
      }

      const formattedDate = new Date(date as string);
      if (isNaN(formattedDate.getTime())) {
        logService.log(startTime, "failure");
        return res.status(400).json({ error: "Invalid date format" });
      }

      const appointments = await this.appointmentService.findByDateTime(formattedDate, acceptLanguage as string);

      if (!appointments.length) {
        logService.log(startTime, "failure");
        return res.status(404).json({ error: "No appointments found for the given date" });
      }

      logService.log(startTime, "success");
      return res.status(200).json(appointments);
    } catch (error) {
      logService.log(startTime, "failure");
      return res.status(500).json({ error: "Failed to retrieve appointments by date" });
    }
  }

  /** 📌 Delete an appointment */
  async deleteAppointment(req: Request, res: Response): Promise<Response> {
    const startTime = new Date();
    try {
      const { id } = req.params;

      if (!id) {
        logService.log(startTime, "failure");
        return res.status(400).json({ error: "Missing appointment ID" });
      }

      const deleted = await this.appointmentService.delete(id);
      if (!deleted) {
        logService.log(startTime, "failure");
        return res.status(404).json({ error: "Appointment not found" });
      }

      logService.log(startTime, "success");
      return res.status(200).json({ message: "Appointment deleted successfully" });
    } catch (error) {
      logService.log(startTime, "failure");
      return res.status(500).json({ error: "Failed to delete appointment" });
    }
  }

  /** 📌 Simulate authorization logic */
  private isAuthorized(req: Request): boolean {
    return !!req.headers.authorization;
  }
}
