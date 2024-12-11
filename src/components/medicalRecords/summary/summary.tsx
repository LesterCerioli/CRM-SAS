"use client";
import React from "react";

interface SummaryProps {
    data: {
        patientName: string;
        dateOfBirth: string;
        gender: string;
        age: string;
        medicalHistory: string;
        medications: string;
        symptoms: string;
        diagnosis: string;
        treatmentPlan: string;
        additionalNotes: string;
    };
}

const Summary: React.FC<SummaryProps> = ({ data }) => {
    return (
        <div style={{
            padding: "2rem",
            backgroundColor: "#ffffff",
            borderRadius: "8px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "2rem"
        }}>
            <h2 style={{ color: "#333", marginBottom: "1rem" }}>Resumo do Prontuário</h2>
            <p><strong>Nome do Paciente:</strong> {data.patientName}</p>
            <p><strong>Data de Nascimento:</strong> {data.dateOfBirth}</p>
            <p><strong>Sexo:</strong> {data.gender === "M" ? "Masculino" : "Feminino"}</p>
            <p><strong>Idade:</strong> {data.age}</p>
            <p><strong>Histórico Médico:</strong> {data.medicalHistory}</p>
            <p><strong>Medicações:</strong> {data.medications}</p>
            <p><strong>Sintomas:</strong> {data.symptoms}</p>
            <p><strong>Diagnóstico:</strong> {data.diagnosis}</p>
            <p><strong>Plano de Tratamento:</strong> {data.treatmentPlan}</p>
            <p><strong>Notas Adicionais:</strong> {data.additionalNotes}</p>
        </div>
    );
};

export default Summary;