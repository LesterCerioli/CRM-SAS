import { v4 as uuidv4 } from "uuid";
import { HistoryRecord } from "./historyRecord";


export class MedicalRecord {
  id: string;
  patientId: string; 
  organizationId?: string;
  patientName?: string;
  doctorId: string; 
  diagnosis: string; 
  treatment?: string; 
  notes?: string; 
  createdAt: Date;
  updatedAt: Date;
  historyRecord: HistoryRecord[];

  constructor(
    patientId: string,
    doctorId: string,
    diagnosis: string,
    organizationId?: string,
    patientName?: string,
    treatment?: string,
    notes?: string,
    historyRecord: HistoryRecord[] = []
  ) {
    this.id = uuidv4();
    this.patientId = patientId;
    this.doctorId = doctorId;
    this.diagnosis = diagnosis;
    this.organizationId = organizationId;
    this.patientName = patientName;
    this.treatment = treatment;
    this.notes = notes;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.historyRecord = historyRecord;
  }
}
