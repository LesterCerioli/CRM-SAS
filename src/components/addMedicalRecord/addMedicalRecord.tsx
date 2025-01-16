"use client";
import React, { useState, useEffect } from 'react';
import * as S from './styles';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  selectedPatient?: Patient | null;
}

const patientSchema = z.object({
  cpf: z.string().regex(/^\d{11}$/, { message: "CPF deve conter 11 dígitos numéricos" }),
  name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Data de nascimento deve estar no formato YYYY-MM-DD" }),
  contactPhone: z.string().regex(/^\d{10,11}$/, { message: "Telefone deve conter 10 ou 11 dígitos numéricos" }),
  familyPhone: z.string().regex(/^\d{10,11}$/, { message: "Telefone deve conter 10 ou 11 dígitos numéricos" }),
  email: z.string().email({ message: "E-mail inválido" }),
});

type PatientFormData = z.infer<typeof patientSchema>;

const AddMedicalRecord: React.FC<AddMedicalRecordProps> = ({ onSave, onCancel, existingPatients, selectedPatient }) => {
  const [saveError, setSaveError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors }, setValue, watch, reset } = useForm<PatientFormData>({
    resolver: zodResolver(patientSchema),
    defaultValues: selectedPatient || {}
  });

  useEffect(() => {
    if (selectedPatient) {
      Object.entries(selectedPatient).forEach(([key, value]) => {
        setValue(key as keyof PatientFormData, value);
      });
    }
  }, [selectedPatient, setValue]);

  const cpf = watch('cpf');

  useEffect(() => {
    if (cpf && cpf.length === 11) {
      fetchPatientData(cpf);
    }
  }, [cpf]);

  const fetchPatientData = async (cpf: string) => {
    try {
      const response = await fetch(`/api/patient/${cpf}`);
      if (response.ok) {
        const data = await response.json();
        setValue('name', data.name);
        setValue('dateOfBirth', data.dateOfBirth);
        setValue('email', data.email);
        setValue('contactPhone', data.contactPhone);
        setValue('familyPhone', data.familyPhone);
      }
    } catch (error) {
      console.error('Error fetching patient data:', error);
    }
  };

  const onSubmit: SubmitHandler<PatientFormData> = async (data) => {
    try {
      const response = await fetch('/api/patient', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        onSave(data);
        reset(); // Reset the form after successful save
        setSaveError(null);
      } else {
        setSaveError('Erro ao salvar o prontuário. Por favor, tente novamente.');
      }
    } catch (error) {
      console.error('Error saving patient data:', error);
      setSaveError('Erro ao salvar o prontuário. Por favor, tente novamente.');
    }
  };

  return (
    <S.FormContainer>
      <S.FormTitle>Adicionar Novo Prontuário</S.FormTitle>
      <S.Form onSubmit={handleSubmit(onSubmit)}>
        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="cpf">CPF:</S.Label>
            <S.Input
              type="text"
              id="cpf"
              {...register('cpf')}
            />
            {errors.cpf && <S.FormErrorMessage>{errors.cpf.message}</S.FormErrorMessage>}
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="name">Nome do Paciente:</S.Label>
            <S.Input
              type="text"
              id="name"
              {...register('name')}
            />
            {errors.name && <S.FormErrorMessage>{errors.name.message}</S.FormErrorMessage>}
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="dateOfBirth">Data de Nascimento:</S.Label>
            <S.Input
              type="date"
              id="dateOfBirth"
              {...register('dateOfBirth')}
            />
            {errors.dateOfBirth && <S.FormErrorMessage>{errors.dateOfBirth.message}</S.FormErrorMessage>}
          </S.FormGroup>
        </S.FormRow>
        <S.FormRow>
          <S.FormGroup>
            <S.Label htmlFor="contactPhone">Telefone de Contato:</S.Label>
            <S.Input
              type="tel"
              id="contactPhone"
              {...register('contactPhone')}
            />
            {errors.contactPhone && <S.FormErrorMessage>{errors.contactPhone.message}</S.FormErrorMessage>}
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="familyPhone">Telefone de um Familiar:</S.Label>
            <S.Input
              type="tel"
              id="familyPhone"
              {...register('familyPhone')}
            />
            {errors.familyPhone && <S.FormErrorMessage>{errors.familyPhone.message}</S.FormErrorMessage>}
          </S.FormGroup>
          <S.FormGroup>
            <S.Label htmlFor="email">E-mail:</S.Label>
            <S.Input
              type="email"
              id="email"
              {...register('email')}
            />
            {errors.email && <S.FormErrorMessage>{errors.email.message}</S.FormErrorMessage>}
          </S.FormGroup>
        </S.FormRow>
        <S.ButtonGroup>
          <S.SubmitButton type="submit">Salvar</S.SubmitButton>
          <S.CancelButton type="button" onClick={onCancel}>Cancelar</S.CancelButton>
        </S.ButtonGroup>
        {saveError && <S.FormErrorMessage>{saveError}</S.FormErrorMessage>}
      </S.Form>
    </S.FormContainer>
  );
};

export default AddMedicalRecord;

