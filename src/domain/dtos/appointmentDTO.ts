import { Patient } from "../models/patient";

export interface AppointmentDTO {
    id: string;
    organizationId: string;
    patientId: string;
    patientName: Patient,
    userId: string;
    dateTime: Date;
    status: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
  }