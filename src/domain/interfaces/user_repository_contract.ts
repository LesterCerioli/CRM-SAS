import { User } from "@/domain/models/user";
import { UserDTO } from "../dtos/userDTO";

export interface UserRepositoryContract {
  create(user: UserDTO): Promise<UserDTO>;
  update(user: User): Promise<void>;
  delete(userID: string): Promise<void>;
  getByID(userID: string): Promise<UserDTO>;
  getByEmail(email: string): Promise<UserDTO>;
  getAll(organizationID: string): Promise<UserDTO[]>;
  getByRole(organizationID: string, role: string): Promise<User[]>;
  getByDateRange(organizationID: string, startDate: Date, endDate: Date): Promise<UserDTO[]>;
  getByCreatedAt(createdAt: Date): Promise<UserDTO[]>;
  getByUpdatedAt(updatedAt: Date): Promise<UserDTO[]>;
}
