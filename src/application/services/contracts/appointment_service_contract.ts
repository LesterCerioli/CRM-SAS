import { AppointmentDTO } from "@/domain/dtos/appointmentDTO";
import { PatientDTO } from "@/domain/dtos/patientDTO";

export interface AppointmentServiceContract {
    create(appointment: AppointmentDTO, acceptLanguage: string): Promise<string>;
    getAll(): Promise<AppointmentDTO[]>;
    findByName(name: string): Promise<PatientDTO[]>;
    findByDateTime(dateTime: Date, acceptLanguage: string): Promise<AppointmentDTO[]>;
    update(id: string, appointmentUpdates: Partial<AppointmentDTO>): Promise<boolean>;
    delete(id: string): Promise<boolean>; 
  }