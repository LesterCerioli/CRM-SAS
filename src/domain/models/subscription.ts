import { v4 as uuidv4 } from "uuid";
import { Organization } from "./organization";

export class Subscription {
  id: string;
  organizationId: string;
  organization?: Organization; // Optional to avoid initialization errors
  plan: string;
  startDate: Date;
  endDate?: Date | null;
  status: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    organizationId: string,
    plan: string,
    startDate: Date,
    status: string,
    endDate?: Date | null
  ) {
    this.id = uuidv4(); // ✅ Auto-generates UUID
    this.organizationId = organizationId;
    this.plan = plan;
    this.startDate = startDate;
    this.endDate = endDate ?? null; // ✅ Default to null if not provided
    this.status = status;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }
}
