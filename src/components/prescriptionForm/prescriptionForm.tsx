"use client";

import React, { useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import * as S from "./styles";

const PrescriptionForm: React.FC = () => {
  const signatureRef = useRef<SignatureCanvas>(null);
  const [digitalSignature, setDigitalSignature] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    patientName: "",
    patientId: "",
    cpf: "",
    clinicAddress: "",
    crm: "", 
    prescription: "",
    prescriptionDate: null as Date | null,
  });
  const [isFieldsDisabled, setIsFieldsDisabled] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [cpfError, setCpfError] = useState<string | null>(null);
  const [crmError, setCrmError] = useState<string | null>(null);

  const handleClearSignature = () => {
    if (signatureRef.current) {
      signatureRef.current.clear();
      setDigitalSignature(null);
    }
  };

  const handleSaveSignature = () => {
    if (signatureRef.current) {
      const signatureData = signatureRef.current.toDataURL();
      setDigitalSignature(signatureData);
    }
  };

  const handlePatientNameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData((prev) => ({ ...prev, patientName: name }));

    if (name.length > 2) {
      try {
        const response = await fetch(`/api/patient?name=${name}`);
        if (response.ok) {
          const data = await response.json();
          setFormData({
            ...formData,
            patientName: name,
            patientId: data.patientId,
            clinicAddress: data.clinicAddress,
          });
          setIsFieldsDisabled(true);
        } else {
          console.error("Erro ao buscar os dados do paciente");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        patientId: "",
        clinicAddress: "",
      }));
      setIsFieldsDisabled(false);
    }
  };

  const handleCrmChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const crm = e.target.value;
    setFormData((prev) => ({ ...prev, crm }));

    if (/^\d{5,6}-\d{1}$/.test(crm)) {
      setCrmError(null);

      try {
        const response = await fetch(`/api/doctor?crm=${crm}`);
        if (response.ok) {
          const data = await response.json();
          setFormData((prev) => ({
            ...prev,
            doctorName: data.doctorName,
          }));
        } else {
          console.error("Erro ao buscar os dados do médico.");
        }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    } 
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const cpf = e.target.value.replace(/\D/g, "");
    const formattedCpf = cpf
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    setFormData((prev) => ({ ...prev, cpf: formattedCpf }));
    setCpfError(null); 
  };

  const validateCpf = (cpf: string): boolean => {
    const cleanCpf = cpf.replace(/\D/g, "");
    if (cleanCpf.length !== 11) return false;

    const digits = cleanCpf.split("").map(Number);
    const calc = (slice: number) =>
      digits
        .slice(0, slice)
        .reduce((acc, num, index) => acc + num * (slice + 1 - index), 0) % 11;

    const digit1 = calc(9) < 2 ? 0 : 11 - calc(9);
    const digit2 = calc(10) < 2 ? 0 : 11 - calc(10);

    return digit1 === digits[9] && digit2 === digits[10];
  };

  const handleDateChange = (date: Date | null) => {
    setFormData((prev) => ({
      ...prev,
      prescriptionDate: date,
    }));
    setIsCalendarOpen(false); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateCpf(formData.cpf)) {
      setCpfError("CPF inválido. Por favor, verifique o valor inserido.");
      return;
    }

    const data = {
      ...formData,
      digitalSignature,
    };
    console.log(data);

    try {
      const response = await fetch("/api/prescriptions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Prescrição enviada com sucesso!");
      } else {
        console.error("Erro ao enviar prescrição.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };

  return (
    <S.Container>
      <S.Header>
        <S.CrossIcon>+</S.CrossIcon>
        <h1>Prescrição Médica</h1>
      </S.Header>

      <form onSubmit={handleSubmit}>
        <S.Section>
          <label>
            Nome do Paciente:
            <input
              type="text"
              name="patientName"
              value={formData.patientName}
              onChange={handlePatientNameChange}
              required
            />
          </label>
          <label>
            Código de Identificação do Paciente:
            <input
              type="text"
              name="patientId"
              value={formData.patientId}
              disabled={isFieldsDisabled}
              required
            />
          </label>
          <label>
            CPF do Paciente:
            <input
              type="text"
              name="cpf"
              value={formData.cpf}
              onChange={handleCpfChange}
              placeholder="000.000.000-00"
              required
            />
            {cpfError }
          </label>
          <label>
            Endereço da Clínica/Hospital:
            <input
              type="text"
              name="clinicAddress"
              value={formData.clinicAddress}
              disabled={isFieldsDisabled}
              required
            />
          </label>
        </S.Section>

        <S.Section>
          <label>
            Nome do Médico:
            <input type="text" name="doctorName" required />
          </label>
          <label>
            Registro do CRM do Médico:
            <input
              type="text"
              name="crm"
              value={formData.crm}
              onChange={handleCrmChange}
              required
            />
            {crmError && <span>{crmError}</span>}
          </label>
          <label>
            Prescrição do Medicamento:
            <textarea name="prescription" required />
          </label>
          <label>
            Data de Prescrição:
            <DatePicker
              selected={formData.prescriptionDate}
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
              placeholderText="Selecione a data"
              required
              onClickOutside={() => setIsCalendarOpen(false)} 
              onFocus={() => setIsCalendarOpen(true)} 
              open={isCalendarOpen}
              className="date"
            />
          </label>
        </S.Section>

        <S.Section>
          <S.SignatureSection>
            <label>Assinatura do Médico:</label>
            <SignatureCanvas
              ref={signatureRef}
              canvasProps={{
                className: "signature-canvas",
                width: 500,
                height: 200,
              }}
            />
            <S.SignatureButtons>
              <button type="button" onClick={handleClearSignature}>
                Limpar Assinatura
              </button>
              <button type="button" onClick={handleSaveSignature}>
                Salvar Assinatura
              </button>
            </S.SignatureButtons>
          </S.SignatureSection>
        </S.Section>

        <S.SubmitButton type="submit">Enviar</S.SubmitButton>
      </form>
    </S.Container>
  );
};

export default PrescriptionForm;

