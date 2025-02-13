import { User } from "@/domain/models/user";

export interface UserRepositoryContract {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  delete(userID: string): Promise<void>;
  getByID(userID: string): Promise<User | null>;
  getByEmail(email: string): Promise<User | null>;
  getAll(organizationID: string): Promise<User[]>;
  getByRole(organizationID: string, role: string): Promise<User[]>;
  getByDateRange(organizationID: string, startDate: Date, endDate: Date): Promise<User[]>;
  getByCreatedAt(createdAt: Date): Promise<User[]>;
  getByUpdatedAt(updatedAt: Date): Promise<User[]>;
}
