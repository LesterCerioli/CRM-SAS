export interface HistoryRecordDTO {
    id: string;
    medicalRecordId: string;
    action: string;
    details?: string;
    timestamp: Date;
  }
  