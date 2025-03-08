import { Subscription } from "@/domain/models/subscription";
import { SubscriptionDTO } from "../dtos/subscriptionDTO";

export interface SubscriptionRepositoryContract {
  create(subscription: Subscription): Promise<SubscriptionDTO>;
  update(subscription: Subscription): Promise<void>;
  delete(id: string): Promise<void>;
  findByOrganizationID(organizationId: string): Promise<SubscriptionDTO[]>;
  findActiveSubscriptions(): Promise<SubscriptionDTO[]>;
  findExpiredSubscriptions(date: Date): Promise<SubscriptionDTO[]>;
}
