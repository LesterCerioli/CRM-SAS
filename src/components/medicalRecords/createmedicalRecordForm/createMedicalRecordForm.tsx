"use client";
import React, { useState } from "react";
import * as S from "./styles";

const CreateMedicalRecordForm: React.FC = () => {
    const [formData, setFormData] = useState({
        patientName: "",
        dateOfBirth: "",
        gender: "",
        age: "",
        medicalHistory: "",
        medications: "",
        symptoms: "",
        diagnosis: "",
        treatmentPlan: "",
        additionalNotes: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form Data Submitted:", formData);
    };

    return (
        <S.Container>
            <S.Form onSubmit={handleSubmit}>
                <h1>Prontuário Médico</h1>

                <S.FieldGroup>
                    <label htmlFor="patientName">Nome do Paciente:</label>
                    <input
                        type="text"
                        id="patientName"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleChange}
                        required
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="dateOfBirth">Data de Nascimento:</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="gender">Sexo:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masculino</option>
                        <option value="F">Feminino</option>
                    </select>
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="age">Idade:</label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="medicalHistory">Histórico Médico:</label>
                    <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="medications">Medicações:</label>
                    <textarea
                        id="medications"
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="symptoms">Sintomas:</label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="diagnosis">Diagnóstico:</label>
                    <textarea
                        id="diagnosis"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="treatmentPlan">Plano de Tratamento:</label>
                    <textarea
                        id="treatmentPlan"
                        name="treatmentPlan"
                        value={formData.treatmentPlan}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="additionalNotes">Notas Adicionais:</label>
                    <textarea
                        id="additionalNotes"
                        name="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.Button type="submit">Salvar Prontuário</S.Button>
            </S.Form>
        </S.Container>
    );
};

export default CreateMedicalRecordForm;