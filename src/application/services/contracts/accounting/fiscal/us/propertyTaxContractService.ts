export interface IPropertyTaxService {
    calculatePropertyTax(propertyValue: number, state: string): Promise<number>;
  }
  