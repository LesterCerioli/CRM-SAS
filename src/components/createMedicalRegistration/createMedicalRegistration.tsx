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
      } else {
        alert('Error fetching doctor data');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error fetching doctor data');
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch('/api/register-doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert('Doctor registered successfully!');
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
      } else {
        const errorData = await response.json();
        alert(`Error registering doctor: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error registering doctor');
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
        <S.SubmitButton type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : 'Enviar'}
        </S.SubmitButton>
      </S.Form>
    </S.Container>
  );
};

export default CreateMedicalRegistration;

