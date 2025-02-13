export interface AppointmentDTO {
    id: string;
    organizationId: string;
    patientId: string;
    userId: string;
    dateTime: Date;
    status: string;
    notes?: string;
    createdAt: Date;
    updatedAt: Date;
  }