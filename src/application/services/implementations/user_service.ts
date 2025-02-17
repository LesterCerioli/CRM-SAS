import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { logService } from "@/application/services/implementations/log_service";
import dotenv from "dotenv";

dotenv.config();

interface UserDTO {
    id?: string;
    name: string;
    email: string;
    role: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class UserService {
    private readonly pool: Pool;
    private readonly serviceName = "UserService";
    private readonly MAX_RETRIES = 5;

    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASSWORD,
            port: Number(process.env.DB_PORT),
        });
    }

    /** Creates a new user */
    async create(user: UserDTO): Promise<string> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Creating a new user`);

                if (!user.name || !user.email || !user.role) {
                    throw new Error("Missing required fields: name, email, or role");
                }

                // Check if email already exists
                const checkQuery = `SELECT id FROM users WHERE email = $1`;
                const checkResult = await this.pool.query(checkQuery, [user.email]);

                if (checkResult.rows.length > 0) {
                    throw new Error("Email already exists");
                }

                const userId = uuidv4();
                const query = `
                    INSERT INTO users (id, name, email, role, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, NOW(), NOW())
                    RETURNING id
                `;

                const values = [userId, user.name, user.email, user.role];

                const result = await this.pool.query(query, values);

                console.log(`[${this.serviceName}] User created with ID: ${userId}`);
                logService.log(startTime, "success");
                return result.rows[0].id;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to create user`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets users by email */
    async getByEmail(email: string): Promise<UserDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching users by email: ${email}`);

                const query = `SELECT * FROM users WHERE email = $1`;
                const result = await this.pool.query(query, [email]);

                console.log(`[${this.serviceName}] Fetched users successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch users by email`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets users by name */
    async getByName(name: string): Promise<UserDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching users by name: ${name}`);

                const query = `SELECT * FROM users WHERE LOWER(name) = LOWER($1)`;
                const result = await this.pool.query(query, [name]);

                console.log(`[${this.serviceName}] Fetched users successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch users by name`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets users by role */
    async getByRole(role: string): Promise<UserDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching users by role: ${role}`);

                const query = `SELECT * FROM users WHERE role = $1`;
                const result = await this.pool.query(query, [role]);

                console.log(`[${this.serviceName}] Fetched users successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch users by role`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets users by creation date */
    async getByCreatedAt(createdAt: Date): Promise<UserDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching users created at: ${createdAt}`);

                const query = `SELECT * FROM users WHERE DATE(created_at) = $1`;
                const result = await this.pool.query(query, [createdAt.toISOString().split("T")[0]]);

                console.log(`[${this.serviceName}] Fetched users successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch users by createdAt`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets users by update date */
    async getByUpdatedAt(updatedAt: Date): Promise<UserDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching users updated at: ${updatedAt}`);

                const query = `SELECT * FROM users WHERE DATE(updated_at) = $1`;
                const result = await this.pool.query(query, [updatedAt.toISOString().split("T")[0]]);

                console.log(`[${this.serviceName}] Fetched users successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch users by updatedAt`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Retries database operations in case of failure */
    private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
        let attempts = 0;

        while (attempts < this.MAX_RETRIES) {
            const startTime = new Date();
            try {
                const result = await operation();
                return result;
            } catch (error) {
                attempts++;
                console.error(`Operation failed (Attempt ${attempts}/${this.MAX_RETRIES}):`, error);

                if (attempts >= this.MAX_RETRIES) {
                    logService.log(startTime, "failure");
                    throw new Error("Database operation failed after multiple retries.");
                }

                console.warn(`Retrying operation in ${2 ** attempts} seconds...`);
                await this.sleep(2 ** attempts * 1000);
            }
        }

        throw new Error("Unexpected error in retry mechanism.");
    }

    /** Delays execution for retry mechanism */
    private sleep(ms: number): Promise<void> {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }
}

export default new UserService();
