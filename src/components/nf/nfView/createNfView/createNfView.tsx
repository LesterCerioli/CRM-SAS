"use client";

import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";
import { format, parse } from "date-fns";
import { ptBR } from "date-fns/locale";

const CreateNfView: React.FC = () => {
  const [formData, setFormData] = useState({
    period: "",
    invoiceNumber: "",
    issueDate: null as Date | null,
    verificationCode: "",
    cep: "",
    fullAddress: "",
    city: "",
    email: "",
    companyName: "",
    tradeName: "",
    phone: "",
    uf: "",
    municipalRegistration: "",
    stateRegistration: "",
    serviceProviderName: "",
    hourlyRate: "",
    workedMonth: "",
    workedHours: "",
    cnpj: "",
    invoiceValue: "",
    serviceCode: "",
    deductions: "",
    unconditionalDiscount: "",
    calculationBase: "",
    aliquot: "",
    issValue: "",
    iptuCredit: "",
  });

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [fieldsDisabled, setFieldsDisabled] = useState(false);
  const [cnpjError, setCnpjError] = useState<string | null>(null);
  const [isCNPJLoaded, setIsCNPJLoaded] = useState(false);



  const handlePeriodChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      period: date ? format(date, "MM/yyyy") : "",
    }));
    setIsCalendarOpen(false); 
  };

  const getPeriodDate = () => {
    if (formData.period) {
      const parsedDate = parse(formData.period, "MM/yyyy", new Date());
      return !isNaN(parsedDate.getTime()) ? parsedDate : null;
    }
    return null;
  };

  const fetchInvoiceData = async (invoiceNumber: string) => {
    try {
      setIsFetching(true);
      const response = await fetch(`https://api.fakeendpoint.com/invoices/${invoiceNumber}`);
      const data = await response.json();

     
      setFormData((prev) => ({
        ...prev,
        issueDate: data.issueDate ? new Date(data.issueDate) : null,
        verificationCode: data.verificationCode || "",
        cep: data.cep || "",
        fullAddress: data.fullAddress || "",
        city: data.city || "",
        email: data.email || "",
        companyName: data.companyName || "",
        tradeName: data.tradeName || "",
        phone: data.phone || "",
        uf: data.uf || "",
        municipalRegistration: data.municipalRegistration || "",
        stateRegistration: data.stateRegistration || "",
        serviceProviderName: data.serviceProviderName || "",
        hourlyRate: data.hourlyRate || "",
        cnpj: data.cnpj || "",
        invoiceValue: data.invoiceValue || "",
        serviceCode: data.serviceCode || "",
        deductions: data.deductions || "",
        unconditionalDiscount: data.unconditionalDiscount || "",
        calculationBase: data.calculationBase || "",
        aliquot: data.aliquot || "",
        issValue: data.issValue || "",
        iptuCredit: data.iptuCredit || "",
      }));

   
      setFieldsDisabled(true);
    } catch (error) {
      console.error("Erro ao buscar dados da NF:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleInvoiceNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData((prev) => ({ ...prev, invoiceNumber: value }));

    if (value) {
      fetchInvoiceData(value);
    }
  };

  const isValidCNPJ = (cnpj: string): boolean => {
    cnpj = cnpj.replace(/[^\d]+/g, ""); 
  
    if (cnpj.length !== 14) return false;
  
   
    if (/^(\d)\1+$/.test(cnpj)) return false;
  
   
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    let digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
  
    let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    if (resultado !== +digitos.charAt(0)) return false;
  
    tamanho++;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
  
    for (let i = tamanho; i >= 1; i--) {
      soma += +numeros.charAt(tamanho - i) * pos--;
      if (pos < 2) pos = 9;
    }
  
    resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
    return resultado === +digitos.charAt(1);
  };




const validateCNPJ = (cnpj: string): boolean => {
  return isValidCNPJ(cnpj);
};


const fetchCNPJData = async (cnpj: string) => {
  try {
    const response = await fetch(`https://sua-api-url.com/cnpj/${cnpj}`);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error("Erro na busca do CNPJ");
    }
  } catch (error) {
    throw new Error("Erro ao conectar à API");
  }
};


const handleCNPJBlur = async (cnpj: string) => {
  if (!validateCNPJ(cnpj)) {
    setCnpjError("CNPJ inválido. Verifique e tente novamente.");
    return;
  }

  try {
    const data = await fetchCNPJData(cnpj);
    setFormData({
      ...formData,
      cep: data.cep || "",
      companyName: data.razaoSocial || "",
      tradeName: data.nomeFantasia || "",
      serviceProviderName: data.nomePrestador || "",
      fullAddress: data.enderecoCompleto || "",
      email: data.email || "",
      city: data.municipio || "",
      phone: data.telefone || "",
      uf: data.uf || "",
    });
    setCnpjError(null); 
  } catch (error) {
    setCnpjError("Erro ao buscar os dados do CNPJ. Tente novamente mais tarde.");
  }
};

const { cnpj } = formData;

useEffect(() => {
  if (cnpj) {
    const loadCNPJData = async () => {
      const data = await fetchCNPJData(cnpj);
      if (data) {
        setFormData((prevData) => ({ ...prevData, ...data }));
        setIsCNPJLoaded(true);
      }
    };
    loadCNPJData();
  }
}, [cnpj]); // Apenas cnpj como dependência



  
  

  const handleSubmit = async () => {
    if (formData.cnpj && !isValidCNPJ(formData.cnpj)) {
      setCnpjError("CNPJ inválido. Por favor, corrija antes de enviar.");
      return;
    }
  
    try {
      const response = await fetch("https://api.fakeendpoint.com/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error(`Erro: ${response.status}`);
      }
  
      const data = await response.json();
      alert("Formulário enviado com sucesso!");
    } catch (error) {
      alert("Houve um erro ao enviar o formulário. Tente novamente.");
    }
  };
  
  

  return (
    <S.Container>
      <S.DatePickerStyles />
      <S.FormContainer>
        <S.FieldRow>
        <S.FieldContainer>
        <label>
          Período (Mês/Ano):
          <DatePicker
            selected={getPeriodDate()} 
            onChange={handlePeriodChange} 
            showMonthYearPicker 
            dateFormat="MM/yyyy" 
            locale={ptBR} 
            placeholderText="Selecione o período" 
            className="datepicker-input" 
            onFocus={() => setIsCalendarOpen(true)} 
            onClickOutside={() => setIsCalendarOpen(false)} 
            open={isCalendarOpen} 
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
            <label>
              Número da NF:
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={handleInvoiceNumberChange}
                placeholder="Digite o número"
              />
            </label>
          </S.FieldContainer>
          <S.FieldContainer>
  <label>
    Data/Hora Emissão:
    <DatePicker
      selected={formData.issueDate}
      onChange={(date) => setFormData({ ...formData, issueDate: date })}
      dateFormat="dd/MM/yyyy HH:mm:ss"
      showTimeSelect
      timeFormat="HH:mm:ss" 
      timeIntervals={1} 
      showTimeInput 
      locale={ptBR}
      className="datepicker-input"
      placeholderText="Selecione data e hora"
    />
  </label>
</S.FieldContainer>

          <S.FieldContainer>
            <label>
              Código de Verificação:
              <input
                type="text"
                value={formData.verificationCode}
                onChange={(e) => setFormData({ ...formData, verificationCode: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          </S.FieldRow>
          <S.FieldRow>
          
           <S.FieldContainer>
            <label>
              Valor Hora (R$):
              <input
                type="number"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          <S.FieldContainer>
            <label>
              Inscrição Municipal:
              <input
                type="text"
                value={formData.municipalRegistration}
                onChange={(e) => setFormData({ ...formData, municipalRegistration: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          
          <S.FieldContainer>
            <label>
              Inscrição Estadual:
              <input
                type="text"
                value={formData.stateRegistration}
                onChange={(e) => setFormData({ ...formData, stateRegistration: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          <S.FieldContainer>
  <label>
    CNPJ (opcional):
    <input
      type="text"
      value={formData.cnpj}
      onChange={(e) => {
        const value = e.target.value;
        setFormData({ ...formData, cnpj: value });
        setCnpjError(null); 
      }}
      onBlur={() => handleCNPJBlur(formData.cnpj)} 
      placeholder="Digite o CNPJ"
    />
  </label>
  {cnpjError && <p style={{ color: "red" }}>{cnpjError}</p>}
</S.FieldContainer>
          </S.FieldRow>

          {isCNPJLoaded && (
  <>
    <S.FieldRow>
      <S.FieldContainer>
        <label>
          CEP:
          <input
            type="text"
            value={formData.cep}
            onChange={(e) => setFormData({ ...formData, cep: e.target.value })}
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
        <label>
          Razão Social:
          <input
            type="text"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
        <label>
          Nome Fantasia:
          <input
            type="text"
            value={formData.tradeName}
            onChange={(e) => setFormData({ ...formData, tradeName: e.target.value })}
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
        <label>
          Nome do Prestador de Serviço:
          <input
            type="text"
            value={formData.serviceProviderName}
            onChange={(e) => setFormData({ ...formData, serviceProviderName: e.target.value })}
          />
        </label>
      </S.FieldContainer>
    </S.FieldRow>
    <S.FieldRow>
      <S.FieldContainer>
        <label>
          Endereço Completo:
          <input
            type="text"
            value={formData.fullAddress}
            onChange={(e) => setFormData({ ...formData, fullAddress: e.target.value })}
          />
        </label>
      </S.FieldContainer>
    </S.FieldRow>
    <S.FieldRow>
      <S.FieldContainer>
        <label>
          E-mail:
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
        <label>
          Município:
          <input
            type="text"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
        <label>
          Telefone:
          <input
            type="text"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </label>
      </S.FieldContainer>

      <S.FieldContainer>
        <label>
          UF:
          <input
            type="text"
            value={formData.uf}
            onChange={(e) => setFormData({ ...formData, uf: e.target.value })}
          />
        </label>
      </S.FieldContainer>
    </S.FieldRow>
  </>
)}

        <S.FieldRow>
          </S.FieldRow>
          <S.FieldRow>
            <S.FieldContainer>
            <label>
              Valor Nota Fiscal (R$):
              <input
                type="number"
                value={formData.invoiceValue}
                onChange={(e) => setFormData({ ...formData, invoiceValue: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          <S.FieldContainer>
            <label>
              Código Serviço Prestado:
              <select
                value={formData.serviceCode}
                onChange={(e) => setFormData({ ...formData, serviceCode: e.target.value })}
              >
                <option value="">Selecione</option>
                <option value="001">Serviço 1</option>
                <option value="002">Serviço 2</option>
              </select>
            </label>
          </S.FieldContainer>
       
          <S.FieldContainer>
            <label>
              Deduções (R$):
              <input
                type="number"
                value={formData.deductions}
                onChange={(e) => setFormData({ ...formData, deductions: e.target.value })}
              />
            </label>
          </S.FieldContainer>

          <S.FieldContainer>
            <label>
              Desconto Incondicional (R$):
              <input
                type="number"
                value={formData.unconditionalDiscount}
                onChange={(e) => setFormData({ ...formData, unconditionalDiscount: e.target.value })}
              />
            </label>
          </S.FieldContainer>

          </S.FieldRow>
          <S.FieldRow> 
            <S.FieldContainer>
            <label>
              Base de Cálculo (R$):
              <input
                type="number"
                value={formData.calculationBase}
                onChange={(e) => setFormData({ ...formData, calculationBase: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          <S.FieldContainer>
            <label>
              Alíquota (%):
              <input
                type="text"
                value={formData.aliquot}
                onChange={(e) =>
                  setFormData({ ...formData, aliquot: e.target.value.replace("%", "") })
                }
                onBlur={() => {
                  if (formData.aliquot && !formData.aliquot.includes("%")) {
                    setFormData((prev) => ({ ...prev, aliquot: `${prev.aliquot}%` }));
                  }
                }}
                onFocus={() => {
                  if (formData.aliquot?.includes("%")) {
                    setFormData((prev) => ({
                      ...prev,
                      aliquot: prev.aliquot.replace("%", ""),
                    }));
                  }
                }}
                placeholder="Digite a alíquota"
              />
            </label>
          </S.FieldContainer>

          <S.FieldContainer>
            <label>
              Valor ISS (R$):
              <input
                type="number"
                value={formData.issValue}
                onChange={(e) => setFormData({ ...formData, issValue: e.target.value })}
              />
            </label>
          </S.FieldContainer>
          
          <S.FieldContainer>
            <label>
              Crédito IPTU (R$):
              <input
                type="number"
                value={formData.iptuCredit}
                onChange={(e) => setFormData({ ...formData, iptuCredit: e.target.value })}
              />
            </label>
          </S.FieldContainer>
       </S.FieldRow>

        <S.SubmitButton type="button" onClick={handleSubmit}>
          Enviar
        </S.SubmitButton>
      </S.FormContainer>
    </S.Container>
  );
};
export default CreateNfView;

