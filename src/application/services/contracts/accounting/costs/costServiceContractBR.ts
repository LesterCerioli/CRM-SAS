export interface ICostServiceBR {
    addCost(companyId: string, category: string, amount: number, taxType: "ICMS" | "ISS"): Promise<any>;
    getCosts(companyId: string): Promise<any>;
    calculateTaxes(companyId: string): Promise<{ icms: number; iss: number }>;
  }
  