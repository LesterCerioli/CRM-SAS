export interface IFederalTaxService {
    calculateFederalTax(revenue: number): Promise<number>;
  }
  