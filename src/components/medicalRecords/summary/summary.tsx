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
            <p><strong>Patient Name:</strong> {data.patientName}</p>
            <p><strong>Date of Birth:</strong> {data.dateOfBirth}</p>
            <p><strong>Gender:</strong> {data.gender === "M" ? "Masculino" : "Feminino"}</p>
            <p><strong>Age:</strong> {data.age}</p>
            <p><strong>Medical History:</strong> {data.medicalHistory}</p>
            <p><strong>Medications:</strong> {data.medications}</p>
            <p><strong>Symptoms:</strong> {data.symptoms}</p>
            <p><strong>Diagnosis:</strong> {data.diagnosis}</p>
            <p><strong>Treatment Plan:</strong> {data.treatmentPlan}</p>
            <p><strong>Additional Plan:</strong> {data.additionalNotes}</p>
        </div>
    );
};

export default Summary;