import { MedicalRecord } from "../models/medicalRecord";


export interface MedicalRecordRepositoryContract {
  /**
   * Create a new medical record.
   * @param medicalRecord - The medical record to be created.
   * @returns A promise resolving when the record is created.
   */
  create(medicalRecord: MedicalRecord): Promise<void>;

  /**
   * Get medical records by creation date.
   * @param createdAt - The date to filter medical records.
   * @returns A promise resolving to an array of medical records.
   */
  getByCreatedAt(createdAt: Date): Promise<MedicalRecord[]>;
}
