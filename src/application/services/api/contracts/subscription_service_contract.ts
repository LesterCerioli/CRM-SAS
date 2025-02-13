import { SubscriptionDTO } from "@/domain/dtos/subscriptionDTO";

export interface SubscriptionServiceContract {
  create(subscription: SubscriptionDTO): Promise<string>;
  getByStartDate(startDate: Date): Promise<SubscriptionDTO[]>;
  getByEndDate(endDate: Date): Promise<SubscriptionDTO[]>;
  getByStatus(status: string): Promise<SubscriptionDTO[]>;
  getByCreatedAt(createdAt: Date): Promise<SubscriptionDTO[]>;
  getByUpdatedAt(updatedAt: Date): Promise<SubscriptionDTO[]>;
}
