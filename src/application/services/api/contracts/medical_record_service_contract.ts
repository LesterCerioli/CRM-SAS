import { MedicalRecordRequestDTO } from "@/domain/dtos/medical_record_requestDTO";
import { MedicalRecordResponseDTO } from "@/domain/dtos/medical_record_responseDTO";


export interface MedicalRecordServiceContract {
  create(record: MedicalRecordRequestDTO): Promise<string>;
  getByPatientName(patientName: string): Promise<MedicalRecordResponseDTO[]>;
  getByCreatedAt(createdAt: Date): Promise<MedicalRecordResponseDTO[]>;
  getByUpdatedAt(updatedAt: Date): Promise<MedicalRecordResponseDTO[]>;
  getMedicalRecordList(): Promise<MedicalRecordResponseDTO[]>;
}
