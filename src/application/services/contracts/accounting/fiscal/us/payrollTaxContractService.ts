export interface IPayrollTaxService {
    calculatePayrollTax(salary: number): Promise<{ socialSecurity: number; medicare: number }>;
  }
  