export interface IStateTaxService {
    calculateStateTax(revenue: number, state: string): Promise<number>;
  }
  