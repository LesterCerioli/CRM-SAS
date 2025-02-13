import { Subscription } from "@/domain/models/subscription";

export interface SubscriptionRepositoryContract {
  create(subscription: Subscription): Promise<Subscription>;
  update(subscription: Subscription): Promise<Subscription>;
  delete(id: string): Promise<void>;
  findByOrganizationID(organizationId: string): Promise<Subscription[]>;
  findActiveSubscriptions(): Promise<Subscription[]>;
  findExpiredSubscriptions(date: Date): Promise<Subscription[]>;
}
