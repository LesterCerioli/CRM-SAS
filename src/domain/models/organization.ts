import { v4 as uuidv4 } from "uuid";

export class Organization {
  id: string;
  name: string;
  address: string;
  cnpj: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(name: string, address: string, cnpj: string) {
    this.id = uuidv4();
    this.name = name;
    this.address = address;
    this.cnpj = cnpj;
    this.createdAt = new Date();
    this.updatedAt = new Date();

    const validationError = Organization.validateCNPJ(cnpj);
    if (validationError) {
      throw new Error(validationError);
    }
  }

  /**
   * Validate CNPJ format.
   * @param cnpj - The CNPJ to validate.
   * @returns Error message if invalid, otherwise null.
   */
  static validateCNPJ(cnpj: string): string | null {
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$|^\d{14}$/;
    if (!cnpjRegex.test(cnpj)) {
      return "Invalid CNPJ format: must be XX.XXX.XXX/XXXX-XX or 14 numeric digits.";
    }
    return null;
  }
}
