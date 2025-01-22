"use client";
import React, { useState } from "react";
import * as S from "./styles"

interface MedicalRecord {
  id: string;
  patientName: string;
  diagnosis: string;
  treatmentPlan: {
    description: string;
    medications: string[];
  };
  notes: string;
  updatedAt: string;
}

interface AddMedicalRecordProps {
  medicalRecord: MedicalRecord;
  isReadOnly?: boolean;
  onSave?: (updatedRecord: MedicalRecord) => void;
}

const AddMedicalRecord: React.FC<AddMedicalRecordProps> = ({
  medicalRecord,
  isReadOnly = false,
  onSave,
}) => {
  const [formData, setFormData] = useState<MedicalRecord>({ ...medicalRecord });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (onSave) onSave(formData);
  };

  return (
    <S.Form>
      <S.Label>
        Nome do Paciente:
        <S.Input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleInputChange}
          disabled={isReadOnly}
        />
      </S.Label>
      <S.Label>
        Diagnosis:
        <S.TextArea
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleInputChange}
          disabled={isReadOnly}
        />
      </S.Label>
      <S.Label>
        Treatment Plan:
        <S.TextArea
          name="treatmentPlan.description"
          value={formData.treatmentPlan.description}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              treatmentPlan: { ...prev.treatmentPlan, description: e.target.value },
            }))
          }
          disabled={isReadOnly}
        />
      </S.Label>
      <S.Label>
        Medications:
        <S.Input
          type="text"
          name="treatmentPlan.medications"
          value={formData.treatmentPlan.medications.join(", ")}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              treatmentPlan: {
                ...prev.treatmentPlan,
                medications: e.target.value.split(", "),
              },
            }))
          }
          disabled={isReadOnly}
        />
      </S.Label>
      <S.Label>
        Notes:
        <S.TextArea
          name="notes"
          value={formData.notes}
          onChange={handleInputChange}
          disabled={isReadOnly}
        />
      </S.Label>
      {!isReadOnly && <S.Button onClick={handleSave}>Salvar</S.Button>}
    </S.Form>
  );
};

export default AddMedicalRecord;
