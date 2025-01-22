import { useState } from "react";
import { string } from "zod"
import * as S from "./stykes";


interface MedicalRecord {
    id: string,
    diagnosis: string,
    treatmentPlan: {
        description: string;
        medications: string[];
    };
    notes: string;
    updatedAt: string;
}
interface AddMedicalRecordProps {
    onSave: (record: MedicalRecord) => void;
}
const AddMedicalRecord: React.FC<AddMedicalRecordProps> = ({ onSave }) => {
    const [diagnosis, setDiagnosis] = useState("");
    const [treatmentDescription, setTreatmentDescription] = useState("");
    const [medications, setMedications] = useState("");

    const handleSave = () => {
        const newRecord: MedicalRecord = {
            id: Date.now().toString(),
            diagnosis,
            treatmentPlan: {
                description: treatmentDescription,
                medications: medications.split(",").map((med) => med.trim()),
            },
            notes: "",
            updatedAt: new Date().toISOString(),
        };
        onSave(newRecord);
        setDiagnosis("");
        setTreatmentDescription("");
        setMedications("");
    };
    return(
        <S.Form>
            <S.Label>Diagnóstico:</S.Label>
            <S.TextArea
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}

            />
            <S.Label>Plano de Tratamento</S.Label>
            <S.TextArea
                value={treatmentDescription}
                onChange={(e) => setTreatmentDescription(e.target.value)}
            />
            <S.Label>Medicamentos:</S.Label>
            <S.Input
                type="text"
                value={medications}
                onChange={(e) => setMedications(e.target.value)}
                placeholder="Separe os medicamentos por vírgula"
            />
            <S.Button type="button" onClick={handleSave}>
                Salvar

            </S.Button>

        </S.Form>
    );
};
export default AddMedicalRecord;