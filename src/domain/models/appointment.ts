import { v4 as uuidv4 } from 'uuid';
import { Patient } from './patient';

export class Appointment {
  id: string;
  organizationId: string;
  patientId: string;
  patientName: string; 
  userId: string;
  dateTime: Date;
  status: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    organizationId: string,
    patient: Patient,  
    userId: string,
    dateTime: Date,
    status: string,
    notes: string
  ) {
    this.id = uuidv4();
    this.organizationId = organizationId;
    this.patientId = patient.id;  
    this.patientName = patient.name; 
    this.userId = userId;
    this.dateTime = dateTime;
    this.status = status;
    this.notes = notes;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
