import { v4 as uuidv4 } from "uuid";

export class HistoryRecord {
  id: string;
  medicalRecordId: string;
  action: string;
  details?: string;
  timestamp: Date;

  constructor(
    medicalRecordId: string,
    action: string,
    details?: string,
    timestamp: Date = new Date()
  ) {
    this.id = uuidv4(); // Generate a UUID automatically
    this.medicalRecordId = medicalRecordId;
    this.action = action;
    this.details = details;
    this.timestamp = timestamp;
  }
}
