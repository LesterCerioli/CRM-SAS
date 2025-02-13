export function validateCPF(cpf: string): string | null {
    cpf = cpf.replace(/\D/g, ""); // Remove non-numeric characters
  
    if (cpf.length !== 11) {
      return "CPF must have 11 digits";
    }
  
    const invalidCPFs = new Set([
      "00000000000",
      "11111111111",
      "22222222222",
      "33333333333",
      "44444444444",
      "55555555555",
      "66666666666",
      "77777777777",
      "88888888888",
      "99999999999",
    ]);
  
    if (invalidCPFs.has(cpf)) {
      return "Invalid CPF";
    }
  
    let sum1 = 0;
    for (let i = 0; i < 9; i++) {
      sum1 += parseInt(cpf[i]) * (10 - i);
    }
    let digit1 = (sum1 * 10) % 11;
    if (digit1 === 10 || digit1 === 11) digit1 = 0;
    if (parseInt(cpf[9]) !== digit1) {
      return "Invalid CPF";
    }
  
    let sum2 = 0;
    for (let i = 0; i < 10; i++) {
      sum2 += parseInt(cpf[i]) * (11 - i);
    }
    let digit2 = (sum2 * 10) % 11;
    if (digit2 === 10 || digit2 === 11) digit2 = 0;
    if (parseInt(cpf[10]) !== digit2) {
      return "Invalid CPF";
    }
  
    return null;
  }
  