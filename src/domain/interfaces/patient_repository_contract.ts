import { Patient } from "../models/patient";

export interface PatientRepositoryContract {
  create(patient: Patient): Promise<Patient>;
  update(patient: Patient): Promise<Patient>;
  delete(patientID: string): Promise<void>;
  getByCPF(cpf: string): Promise<Patient | null>;
  getByName(name: string): Promise<Patient[]>;
  getByDOB(dob: Date): Promise<Patient[]>;
  getAll(organizationID: string): Promise<Patient[]>;
  getByDateRange(organizationID: string, startDate: Date, endDate: Date): Promise<Patient[]>;

}