import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import { logService } from "@/application/services/api/implementations/log_service";
import dotenv from "dotenv";

dotenv.config();

interface SubscriptionDTO {
    id?: string;
    startDate: Date;
    endDate?: Date;
    status: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class SubscriptionService {
    private readonly pool: Pool;
    private readonly serviceName = "SubscriptionService";
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

    /** Creates a new subscription */
    async create(subscription: SubscriptionDTO): Promise<string> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Creating a new subscription`);

                const subscriptionId = uuidv4();
                const query = `
                    INSERT INTO subscriptions (id, start_date, end_date, status, created_at, updated_at)
                    VALUES ($1, $2, $3, $4, NOW(), NOW())
                    RETURNING id
                `;

                const values = [
                    subscriptionId,
                    subscription.startDate,
                    subscription.endDate || null,
                    subscription.status,
                ];

                const result = await this.pool.query(query, values);

                console.log(`[${this.serviceName}] Subscription created with ID: ${subscriptionId}`);
                logService.log(startTime, "success");
                return result.rows[0].id;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to create subscription`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets subscriptions by start date */
    async getByStartDate(startDate: Date): Promise<SubscriptionDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching subscriptions by start date: ${startDate}`);

                const query = `SELECT * FROM subscriptions WHERE DATE(start_date) = $1`;
                const result = await this.pool.query(query, [startDate.toISOString().split("T")[0]]);

                console.log(`[${this.serviceName}] Fetched subscriptions successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch subscriptions by start date`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets subscriptions by end date */
    async getByEndDate(endDate: Date): Promise<SubscriptionDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching subscriptions by end date: ${endDate}`);

                const query = `SELECT * FROM subscriptions WHERE end_date = $1`;
                const result = await this.pool.query(query, [endDate]);

                console.log(`[${this.serviceName}] Fetched subscriptions successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch subscriptions by end date`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets subscriptions by status */
    async getByStatus(status: string): Promise<SubscriptionDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching subscriptions by status: ${status}`);

                const query = `SELECT * FROM subscriptions WHERE status = $1`;
                const result = await this.pool.query(query, [status]);

                console.log(`[${this.serviceName}] Fetched subscriptions successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch subscriptions by status`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets subscriptions by creation date */
    async getByCreatedAt(createdAt: Date): Promise<SubscriptionDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching subscriptions created at: ${createdAt}`);

                const query = `SELECT * FROM subscriptions WHERE DATE(created_at) = $1`;
                const result = await this.pool.query(query, [createdAt.toISOString().split("T")[0]]);

                console.log(`[${this.serviceName}] Fetched subscriptions successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch subscriptions by createdAt`, error);
                logService.log(startTime, "failure");
                throw error;
            }
        });
    }

    /** Gets subscriptions by update date */
    async getByUpdatedAt(updatedAt: Date): Promise<SubscriptionDTO[]> {
        return this.retryOperation(async () => {
            const startTime = new Date();
            try {
                console.log(`[${this.serviceName}] Fetching subscriptions updated at: ${updatedAt}`);

                const query = `SELECT * FROM subscriptions WHERE DATE(updated_at) = $1`;
                const result = await this.pool.query(query, [updatedAt.toISOString().split("T")[0]]);

                console.log(`[${this.serviceName}] Fetched subscriptions successfully`);
                logService.log(startTime, "success");
                return result.rows;
            } catch (error) {
                console.error(`[${this.serviceName}] Failed to fetch subscriptions by updatedAt`, error);
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

export default new SubscriptionService();
