import { PatientDTO } from "@/domain/dtos/patientDTO";


export interface PatientServiceContract {
  create(patient: PatientDTO): Promise<string>;
  getByName(name: string): Promise<PatientDTO[]>;
  getByCPF(cpf: string): Promise<PatientDTO[]>;
  getByDOB(dob: Date): Promise<PatientDTO[]>;
  getByCreatedAt(createdAt: Date): Promise<PatientDTO[]>;
  getByUpdatedAt(updatedAt: Date): Promise<PatientDTO[]>;
  getPatientsList(): Promise<PatientDTO[]>;

}