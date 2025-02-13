import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";


export interface AppointmentServiceContract {
    create(appointment: AppointmentDTO, acceptLanguage: string): Promise<string>;
    update(appointment: AppointmentDTO, acceptLanguage: string): Promise<void>;
    findByDateTime(dateTime: Date, acceptLanguage: string): Promise<AppointmentDTO[]>;
    getAll(acceptLanguage: string): Promise<AppointmentDTO[]>;
  }