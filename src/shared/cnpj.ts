export class CNPJ {
    private value: string;
  
    constructor(value: string) {
      if (!CNPJ.isValid(value)) {
        throw new Error("CNPJ inválido");
      }
      this.value = CNPJ.format(value);
    }
  
    static isValid(cnpj: string): boolean {
      cnpj = cnpj.replace(/[./-]/g, "");
      if (cnpj.length !== 14 || /^(\d)\1{13}$/.test(cnpj)) return false;
  
      const validate = (cnpj: string, size: number) => {
        let sum = 0, pos = size - 7;
        for (let i = 0; i < size; i++) {
          sum += Number(cnpj[i]) * pos--;
          if (pos < 2) pos = 9;
        }
        let remainder = sum % 11;
        return remainder < 2 ? 0 : 11 - remainder;
      };
  
      if (validate(cnpj, 12) !== Number(cnpj[12])) return false;
      if (validate(cnpj, 13) !== Number(cnpj[13])) return false;
      return true;
    }
  
    static format(cnpj: string): string {
      return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  
    getValue(): string {
      return this.value;
    }
  }
  