import { Doctor } from "../models/doctor";

export interface DoctorRepositoryContract {
  create(doctor: Doctor): Promise<void>;
  getByFullName(fullName: string): Promise<Doctor[]>;
  getByCRMRegistry(crmRegistry: string): Promise<Doctor[]>;
  getBySpecialization(specialization: string): Promise<Doctor[]>;
  getByCPF(cpf: string): Promise<Doctor[]>;
  getDoctorsList(filter: Partial<Doctor>): Promise<Doctor[]>;
}
