"use client";
import React, { useState, useEffect } from "react";
import * as S from "./styles";

const CreateMedicalPrescription: React.FC = () => {
  const [doctorName, setDoctorName] = useState("");
  const [crmNumber, setCrmNumber] = useState("");
  const [prescriptionDate, setPrescriptionDate] = useState("");
  const [patientName, setPatientName] = useState("");
  const [medications, setMedications] = useState([{ name: "", dosage: "" }]);
  const [instructions, setInstructions] = useState("");
  const [observations, setObservations] = useState("");

  useEffect(() => {

    setDoctorName("Dr. João Silva");
    setCrmNumber("CRM 12345");
    setPrescriptionDate(new Date().toISOString().split('T')[0]);
  }, []);

  const handleAddMedication = () => {
    setMedications([...medications, { name: "", dosage: "" }]);
  };

  const handleMedicationChange = (index: number, field: string, value: string) => {
    const newMedications = [...medications];
    newMedications[index] = { ...newMedications[index], [field]: value };
    setMedications(newMedications);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Formulário enviado");
  };

  return (
    <S.Container>
      <S.Title>Formulário de Prescrição Médica</S.Title>
      <S.Form onSubmit={handleSubmit}>
        <S.Row>
          <S.Group>
            <S.Label>Nome do Médico:</S.Label>
            <S.Input type="text" value={doctorName} readOnly />
          </S.Group>
          <S.Group>
            <S.Label>Número do CRM:</S.Label>
            <S.Input type="text" value={crmNumber} readOnly />
          </S.Group>
          <S.Group>
            <S.Label>Data da Prescrição:</S.Label>
            <S.Input
              type="date"
              value={prescriptionDate}
              onChange={(e) => setPrescriptionDate(e.target.value)}
              required
            />
          </S.Group>
        </S.Row>
        <S.Row>
          <S.Group>
            <S.Label>Nome do Paciente:</S.Label>
            <S.Select
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            >
              <option value="">Selecione um paciente</option>
              <option value="Maria Santos">Maria Santos</option>
              <option value="Carlos Oliveira">Carlos Oliveira</option>
              <option value="Ana Rodrigues">Ana Rodrigues</option>
              <option value="Pedro Ferreira">Pedro Ferreira</option>
              <option value="Lúcia Costa">Lúcia Costa</option>
            </S.Select>
          </S.Group>
        </S.Row>
        {medications.map((med, index) => (
          <S.Row key={index}>
            <S.Group>
              <S.Label>Medicamento {index + 1}:</S.Label>
              <S.Input
                type="text"
                placeholder="Nome do medicamento"
                value={med.name}
                onChange={(e) => handleMedicationChange(index, "name", e.target.value)}
                required
              />
            </S.Group>
            <S.Group>
              <S.Label>Dosagem {index + 1}:</S.Label>
              <S.Input
                type="text"
                placeholder="Dosagem"
                value={med.dosage}
                onChange={(e) => handleMedicationChange(index, "dosage", e.target.value)}
                required
              />
            </S.Group>
            {index === medications.length - 1 && (
              <S.Group>
                <S.Label>&nbsp;</S.Label>
                <S.Button type="button" onClick={handleAddMedication}>
                  Adicionar Medicamento
                </S.Button>
              </S.Group>
            )}
          </S.Row>
        ))}
        <S.Row>
          <S.Group>
            <S.Label>Instruções:</S.Label>
            <S.TextArea
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
            />
          </S.Group>
          <S.Group>
            <S.Label>Observações:</S.Label>
            <S.TextArea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
            />
          </S.Group>
        </S.Row>
        <S.Row>
          <S.Group>
            <S.SubmitButton type="submit">Enviar Prescrição</S.SubmitButton>
          </S.Group>
        </S.Row>
      </S.Form>
    </S.Container>
  );
};

export default CreateMedicalPrescription;

