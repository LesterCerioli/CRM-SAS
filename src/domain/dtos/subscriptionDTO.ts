

export interface SubscriptionDTO {
  id: string;
  organizationId: string;
  plan: string;
  startDate: Date;
  endDate?: Date | null; // Optional field (like omitempty in Go)
  status: string;
  createdAt: Date;
  updatedAt: Date;
}