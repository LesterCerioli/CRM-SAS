import { Pool } from "pg";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv"; 
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER as string, 
    host: process.env.DB_HOST as string,
    database: process.env.DB_NAME as string,
    password: process.env.DB_PASSWORD as string,
    port: Number(process.env.DB_PORT),
});

class LogService {
  private static instance: LogService;
  private logQueue: LogEntry[] = [];
  private isProcessing = false;

  private constructor() {}

  public static getInstance(): LogService {
    if (!LogService.instance) {
      LogService.instance = new LogService();
      LogService.instance.startProcessing();
    }
    return LogService.instance;
  }

  /**
   * Logs an entry with automatic service name detection
   * @param startTime Execution start time
   * @param status Success or Failure
   */
  public log(startTime: Date, status: "success" | "failure") {
    const serviceName = this.getCallerServiceName();
    const executionDate = new Date().toISOString().split("T")[0];
    const endTime = new Date();

    this.logQueue.push({
      id: uuidv4(),
      serviceName,
      executionDate,
      startTime,
      endTime,
      status,
    });
  }

  
  private async startProcessing() {
    if (this.isProcessing) return;
    this.isProcessing = true;

    while (true) {
      if (this.logQueue.length > 0) {
        const logEntry = this.logQueue.shift();
        if (logEntry) {
          try {
            await this.insertLogIntoDB(logEntry);
          } catch (error) {
            console.error("❌ Log insertion failed. Retrying...", error);
            this.logQueue.push(logEntry);
            await this.sleep(2000); 
          }
        }
      } else {
        await this.sleep(1000); 
      }
    }
  }

  
  private async insertLogIntoDB(logEntry: LogEntry) {
    const query = `
      INSERT INTO logs (id, service_name, execution_date, start_time, end_time, status)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    const values = [
      logEntry.id,
      logEntry.serviceName,
      logEntry.executionDate,
      logEntry.startTime,
      logEntry.endTime,
      logEntry.status,
    ];

    await pool.query(query, values);
    console.log(`✅ Log recorded for service: ${logEntry.serviceName}`);
  }
  
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  private getCallerServiceName(): string {
    try {
      const stack = new Error().stack;
      if (!stack) return "UnknownService";

      const lines = stack.split("\n");
      const callerLine = lines[3] || "UnknownService"; // Adjust index if necessary
      const match = callerLine.match(/at\s+(.*)\s+\(/);

      return match ? match[1].trim() : "UnknownService";
    } catch (error) {
      return "UnknownService";
    }
  }
}


interface LogEntry {
  id: string;
  serviceName: string;
  executionDate: string;
  startTime: Date;
  endTime: Date;
  status: "success" | "failure";
}
export const logService = LogService.getInstance();
