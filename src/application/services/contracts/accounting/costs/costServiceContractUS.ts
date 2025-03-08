export interface ICostServiceUS {
    addCost(companyId: string, category: string, amount: number, state: string): Promise<any>;
    getCosts(companyId: string): Promise<any>;
    calculateSalesTax(companyId: string, state: string): Promise<number>;
  }
  