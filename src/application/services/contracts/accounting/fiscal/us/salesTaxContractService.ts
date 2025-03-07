export interface ISalesTaxService {
    calculateSalesTax(amount: number, state: string): Promise<number>;
  }
  