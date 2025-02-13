export interface MedicalRecordRequestDTO {
    patientId: string; 
    doctorId: string; 
    diagnosis: string;
    treatment?: string; 
    notes?: string; 
  }
  