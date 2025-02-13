import { HistoryRecordDTO } from "./history_recordDTO";


export interface MedicalRecordResponseDTO {
  id: string; // UUID as a string
  patientId: string;
  patientName: string; 
  doctorId: string;
  diagnosis: string;
  treatment?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
  history?: HistoryRecordDTO[]; 
}
