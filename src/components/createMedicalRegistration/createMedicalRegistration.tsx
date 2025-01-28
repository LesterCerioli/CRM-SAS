"use client";
import React, { useState, useEffect, useCallback } from "react";
import * as S from "./styles";

const CreateMedicalRegistration: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    crm: "",
    specialty: "",
    address: "",
    identity: "",
    cpf: "",
    birthDate: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  const fetchDoctorData = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/doctor-data?crm=${formData.crm}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(prevData => ({
          ...prevData,
          ...data
        }));
        setIsDisabled(true);
      }
    } catch (error) {
      // Error handling without showing a message
    } finally {
      setIsLoading(false);
    }
  }, [formData.crm]);

  useEffect(() => {
    if (formData.crm.length === 6) {
      fetchDoctorData();
    }
  }, [formData.crm, fetchDoctorData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const validateCPF = (cpf: string) => {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    return cpfRegex.test(cpf);
  };

  const validateIdentity = (identity: string) => {
    const identityRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
    return identityRegex.test(identity);
  };

  const validateCRM = (crm: string) => {
    return crm.length === 6;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setShowMessage(true);


    if (!validateCPF(formData.cpf)) {
      setMessage("CPF inválido. Use o formato 000.000.000-00");
      setIsLoading(false);
      return;
    }

    if (!validateIdentity(formData.identity)) {
      setMessage("Identidade inválida. Use o formato 00.000.000-0");
      setIsLoading(false);
      return;
    }

    if (!validateCRM(formData.crm)) {
      setMessage("CRM inválido. Deve conter 6 dígitos.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/register-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        setMessage('Enviado com sucesso');
        setFormData({
          fullName: "",
          phone: "",
          crm: "",
          specialty: "",
          address: "",
          identity: "",
          cpf: "",
          birthDate: "",
        });
        setIsDisabled(false);
        console.log('API Response:', result);
      } else {
        const errorData = await response.json();
        setMessage(`Erro ao registrar médico: ${errorData.message}`);
      }
    } catch (error) {
      setMessage('Erro ao registrar médico');
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <S.Container>
      <S.Title>Cadastro de Médicos</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.InputGroup>
          <S.Label htmlFor="fullName">Nome completo do Médico</S.Label>
          <S.Input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="phone">Telefone de Contato</S.Label>
          <S.Input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="crm">Registro de CRM</S.Label>
          <S.Input
            type="text"
            id="crm"
            name="crm"
            value={formData.crm}
            onChange={handleChange}
            required
            maxLength={6}
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="specialty">Especialidade</S.Label>
          <S.Input
            type="text"
            id="specialty"
            name="specialty"
            value={formData.specialty}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="address">Endereço</S.Label>
          <S.Input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="identity">Identidade</S.Label>
          <S.Input
            type="text"
            id="identity"
            name="identity"
            value={formData.identity}
            onChange={handleChange}
            required
            disabled={isDisabled}
            placeholder="00.000.000-0"
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="cpf">CPF</S.Label>
          <S.Input
            type="text"
            id="cpf"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            required
            disabled={isDisabled}
            placeholder="000.000.000-00"
          />
        </S.InputGroup>
        <S.InputGroup>
          <S.Label htmlFor="birthDate">Data de nascimento</S.Label>
          <S.Input
            type="date"
            id="birthDate"
            name="birthDate"
            value={formData.birthDate}
            onChange={handleChange}
            required
            disabled={isDisabled}
          />
        </S.InputGroup>
        {showMessage && message && <S.Message>{message}</S.Message>}
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Enviar'}
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default CreateMedicalRegistration;

