import React, { useState, useEffect } from 'react';
import * as S from './styles';

interface Patient {
  cpf: string;
  name: string;
  dateOfBirth: string;
  contactPhone: string;
  familyPhone: string;
  email: string;
}

interface AddMedicalRecordProps {
  onSave: (patient: Patient) => void;
  onCancel: () => void;
  existingPatients: Patient[];
}

const AddMedicalRecord: React.FC<AddMedicalRecordProps> = ({ onSave, onCancel, existingPatients }) => {
  const [patient, setPatient] = useState<Patient>({
    cpf: '',
    name: '',
    dateOfBirth: '',
    contactPhone: '',
    familyPhone: '',
    email: '',
  });

  const [errors, setErrors] = useState<Partial<Patient>>({});

  const validateField = (name: keyof Patient, value: string) => {
    let error = '';
    switch (name) {
      case 'cpf':
        if (!/^\d{11}$/.test(value)) {
          error = 'CPF deve conter 11 dígitos numéricos';
        }
        break;
      case 'name':
        if (value.trim().length < 3) {
          error = 'Nome deve ter pelo menos 3 caracteres';
        }
        break;
      case 'dateOfBirth':
        if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
          error = 'Data de nascimento deve estar no formato YYYY-MM-DD';
        }
        break;
      case 'contactPhone':
      case 'familyPhone':
        if (!/^\d{10,11}$/.test(value)) {
          error = 'Telefone deve conter 10 ou 11 dígitos numéricos';
        }
        break;
      case 'email':
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = 'E-mail inválido';
        }
        break;
    }
    setErrors(prev => ({ ...prev, [name]: error }));
    return error === '';
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
    validateField(name as keyof Patient, value);

    if (name === 'cpf' && value.length === 11) {
      const existingPatient = existingPatients.find(p => p.cpf === value);
      if (existingPatient) {
        setPatient(existingPatient);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = Object.keys(patient).every(key => 
      validateField(key as keyof Patient, patient[key as keyof Patient])
    );
    if (isValid) {
      onSave(patient);
    }
  };

  return (
    <S.FormContainer>
      <S.FormTitle>Adicionar Novo Prontuário</S.FormTitle>
      <S.Form onSubmit={handleSubmit}>
        <S.FormGroup>
          <S.Label htmlFor="cpf">CPF:</S.Label>
          <S.Input
            type="text"
            id="cpf"
            name="cpf"
            value={patient.cpf}
            onChange={handleChange}
            required
          />
          {errors.cpf && <S.FormErrorMessage>{errors.cpf}</S.FormErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="name">Nome do Paciente:</S.Label>
          <S.Input
            type="text"
            id="name"
            name="name"
            value={patient.name}
            onChange={handleChange}
            required
          />
          {errors.name && <S.FormErrorMessage>{errors.name}</S.FormErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="dateOfBirth">Data de Nascimento:</S.Label>
          <S.Input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={patient.dateOfBirth}
            onChange={handleChange}
            required
          />
          {errors.dateOfBirth && <S.FormErrorMessage>{errors.dateOfBirth}</S.FormErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="contactPhone">Telefone de Contato:</S.Label>
          <S.Input
            type="tel"
            id="contactPhone"
            name="contactPhone"
            value={patient.contactPhone}
            onChange={handleChange}
            required
          />
          {errors.contactPhone && <S.FormErrorMessage>{errors.contactPhone}</S.FormErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="familyPhone">Telefone de um Familiar:</S.Label>
          <S.Input
            type="tel"
            id="familyPhone"
            name="familyPhone"
            value={patient.familyPhone}
            onChange={handleChange}
            required
          />
          {errors.familyPhone && <S.FormErrorMessage>{errors.familyPhone}</S.FormErrorMessage>}
        </S.FormGroup>
        <S.FormGroup>
          <S.Label htmlFor="email">E-mail:</S.Label>
          <S.Input
            type="email"
            id="email"
            name="email"
            value={patient.email}
            onChange={handleChange}
            required
          />
          {errors.email && <S.FormErrorMessage>{errors.email}</S.FormErrorMessage>}
        </S.FormGroup>
        <S.ButtonGroup>
          <S.SubmitButton type="submit">Salvar</S.SubmitButton>
          <S.CancelButton type="button" onClick={onCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
      </S.Form>
    </S.FormContainer>
  );
};

export default AddMedicalRecord;

