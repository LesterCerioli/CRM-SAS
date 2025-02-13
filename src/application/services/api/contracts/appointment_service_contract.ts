import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";

export interface AppointmentServiceContract {
    create(appointment: AppointmentDTO, acceptLanguage: string): Promise<string>;
    findById(id: string): Promise<AppointmentDTO | null>;
    getAll(): Promise<AppointmentDTO[]>;
    findByDateTime(dateTime: Date, acceptLanguage: string): Promise<AppointmentDTO[]>;
    update(id: string, appointmentUpdates: Partial<AppointmentDTO>): Promise<boolean>;
    delete(id: string): Promise<boolean>; 
  }