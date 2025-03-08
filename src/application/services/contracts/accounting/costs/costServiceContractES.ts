export interface ICostServiceES {
    addCost(companyId: string, category: string, amount: number, applyVAT: boolean): Promise<any>;
    getCosts(companyId: string): Promise<any>;
    calculateVAT(companyId: string): Promise<number>;
  }
  