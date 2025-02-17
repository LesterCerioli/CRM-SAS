import { DoctorDTO } from "@/domain/dtos/doctorDTO";


export interface DoctorServiceContract {
  create(doctor: DoctorDTO): Promise<string>;
  getByFullName(fullName: string): Promise<DoctorDTO[]>;
  getByCRMRegistry(crmRegistry: string): Promise<DoctorDTO[]>;
  getBySpecialization(specialization: string): Promise<DoctorDTO[]>;
  getByCPF(cpf: string): Promise<DoctorDTO[]>;
  getDoctorList(): Promise<DoctorDTO[]>;
}