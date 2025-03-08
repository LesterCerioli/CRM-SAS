/* CPF.ts */
export class CPF {
    private value: string;
  
    constructor(value: string) {
      if (!CPF.isValid(value)) {
        throw new Error("CPF inválido");
      }
      this.value = CPF.format(value);
    }
  
    static isValid(cpf: string): boolean {
      cpf = cpf.replace(/[.-]/g, "");
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;
  
      let sum = 0;
      for (let i = 0; i < 9; i++) sum += Number(cpf[i]) * (10 - i);
      let remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      if (remainder !== Number(cpf[9])) return false;
  
      sum = 0;
      for (let i = 0; i < 10; i++) sum += Number(cpf[i]) * (11 - i);
      remainder = (sum * 10) % 11;
      if (remainder === 10 || remainder === 11) remainder = 0;
      return remainder === Number(cpf[10]);
    }
  
    static format(cpf: string): string {
      return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    }
  
    getValue(): string {
      return this.value;
    }
  }
  
  