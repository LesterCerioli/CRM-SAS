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
                <h1>Medical Record</h1>

                <S.FieldGroup>
                    <label htmlFor="patientName">Pacient Name:</label>
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
                    <label htmlFor="dateOfBirth">Date of Birth:</label>
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
                    <label htmlFor="gender">Sex:</label>
                    <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione</option>
                        <option value="M">Masc</option>
                        <option value="F">Fem</option>
                    </select>
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="age">Age:</label>
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
                    <label htmlFor="medicalHistory">Medical History:</label>
                    <textarea
                        id="medicalHistory"
                        name="medicalHistory"
                        value={formData.medicalHistory}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="medications">Medications:</label>
                    <textarea
                        id="medications"
                        name="medications"
                        value={formData.medications}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="symptoms">Symptoms:</label>
                    <textarea
                        id="symptoms"
                        name="symptoms"
                        value={formData.symptoms}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="diagnosis">Diagnosis:</label>
                    <textarea
                        id="diagnosis"
                        name="diagnosis"
                        value={formData.diagnosis}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="treatmentPlan">Treatment Plan:</label>
                    <textarea
                        id="treatmentPlan"
                        name="treatmentPlan"
                        value={formData.treatmentPlan}
                        onChange={handleChange}
                    />
                </S.FieldGroup>

                <S.FieldGroup>
                    <label htmlFor="additionalNotes">Additional Notes :</label>
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