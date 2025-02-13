import { HistoryRecord } from "../models/historyRecord";


// HistoryMedicalRepositoryContract defines the repository interface for managing medical record histories.
export interface HistoryMedicalRepositoryContract {
  /**
   * Create inserts a new history record for a medical record.
   * @param historyRecord - The history record to insert.
   */
  create(historyRecord: HistoryRecord): Promise<void>;

  /**
   * GetByMedicalRecordID retrieves all history records for a given medical record ID.
   * @param medicalRecordID - The ID of the medical record.
   * @returns A list of history records.
   */
  getByMedicalRecordID(medicalRecordID: string): Promise<HistoryRecord[]>;

  /**
   * GetByTimestamp retrieves history records created within a specific timestamp range.
   * @param start - The start timestamp.
   * @param end - The end timestamp.
   * @returns A list of history records within the time range.
   */
  getByTimestamp(start: Date, end: Date): Promise<HistoryRecord[]>;

  /**
   * DeleteByMedicalRecordID deletes all history records for a specific medical record ID.
   * @param medicalRecordID - The ID of the medical record to delete history records for.
   */
  deleteByMedicalRecordID(medicalRecordID: string): Promise<void>;
}
