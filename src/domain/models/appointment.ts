import { v4 as uuidv4 } from 'uuid';

export class Appointment {
  id: string;
  organizationId: string;
  patientId: string;
  userId: string;
  dateTime: Date;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    organizationId: string,
    patientId: string,
    userId: string,
    dateTime: Date,
    status: string,
    notes: string
  ) {
    this.id = uuidv4(); // ✅ Auto-generates UUID
    this.organizationId = organizationId;
    this.patientId = patientId;
    this.userId = userId;
    this.dateTime = dateTime;
    this.status = status;
    this.notes = notes;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}