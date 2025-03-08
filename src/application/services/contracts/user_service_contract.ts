import { UserDTO } from "@/domain/dtos/userDTO";


export interface UserServiceContract {
  create(user: UserDTO): Promise<string>;
  getByEmail(email: string): Promise<UserDTO[]>;
  getByName(name: string): Promise<UserDTO[]>;
  getByRole(role: string): Promise<UserDTO[]>;
  getByCreatedAt(createdAt: Date): Promise<UserDTO[]>;
  getByUpdatedAt(updatedAt: Date): Promise<UserDTO[]>;
}