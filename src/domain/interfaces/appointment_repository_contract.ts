import { Appointment } from "../models/appointment";
import { v4 as uuidv4 } from "uuid";

export interface AppointmentRepositoryContract {
  create(appointment: Appointment): Promise<void>;

  update(id: string, appointment: Appointment): Promise<void>;

  delete(id: string): Promise<void>;

  listByOrganization(organizationID: string): Promise<Appointment[]>;

  findByDateTime(start: Date, end: Date): Promise<Appointment[]>;
}
