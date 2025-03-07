export interface ICostServicePT {
    addCost(companyId: string, category: string, amount: number, includeIVA: boolean): Promise<any>;
    getCosts(companyId: string): Promise<any>;
    calculateIVA(companyId: string): Promise<number>;
  }
  