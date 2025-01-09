"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as S from "./styles";
import AddMedicalRecord from "./addMedicalRecord/addMedicalRecord";

interface MedicalRecord {
  id: string;
  patientName: string;
  patientCPF: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  doctorName: string;
  diagnosis: string;
  treatmentPlan: {
    description: string;
    medications: string[];
  };
  notes: string;
  createdAt: string;
  updatedAt: string;
}

interface Patient {
  cpf: string;
  name: string;
  dateOfBirth: string;
  contactPhone: string;
  familyPhone: string;
  email: string;
}

// Generate 1200 mock medical records
const CreateViewingRecords = (): MedicalRecord[] => {
  const records: MedicalRecord[] = [];
  const now = new Date();

  for (let i = 0; i < 1200; i++) {
    const isRecent = i < 50; // Make 50 records recent (less than 24 hours old)
    const createdAt = isRecent
      ? new Date(now.getTime() - Math.random() * 24 * 60 * 60 * 1000)
      : new Date(now.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000);
    const updatedAt = new Date(createdAt.getTime() + Math.random() * (now.getTime() - createdAt.getTime()));

    records.push({
      id: `${i + 1}`,
      patientName: `Patient ${i + 1}`,
      patientCPF: `${Math.floor(100000000 + Math.random() * 900000000)}-${Math.floor(10 + Math.random() * 90)}`,
      dateOfBirth: `${1950 + Math.floor(Math.random() * 50)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      email: `patient${i + 1}@example.com`,
      phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      doctorName: `Dr. ${['Silva', 'Santos', 'Oliveira', 'Rodrigues', 'Ferreira'][Math.floor(Math.random() * 5)]}`,
      diagnosis: ['Hipertensão', 'Diabetes Tipo 2', 'Artrite Reumatoide', 'Asma', 'Depressão'][Math.floor(Math.random() * 5)],
      treatmentPlan: {
        description: 'Tratamento padrão',
        medications: ['Medicamento A', 'Medicamento B'],
      },
      notes: 'Observações iniciais do paciente.',
      createdAt: createdAt.toISOString(),
      updatedAt: updatedAt.toISOString(),
    });
  }

  return records;
};

const mockMedicalRecords = CreateViewingRecords();

const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  const debounced = (...args: Parameters<F>): Promise<ReturnType<F>> => {
    return new Promise((resolve) => {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(() => resolve(func(...args)), waitFor);
    });
  };

  debounced.cancel = () => {
    if (timeout) {
      clearTimeout(timeout);
    }
  };

  return debounced;
};

const MedicalRecords: React.FC = () => {
  const [records, setRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [patientName, setPatientName] = useState("");
  const [patientCPF, setPatientCPF] = useState("");
  const [sortField, setSortField] = useState<keyof MedicalRecord>("patientCPF");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [editingRecord, setEditingRecord] = useState<MedicalRecord | null>(null);
  const [doctorSuggestions, setDoctorSuggestions] = useState<string[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  const fetchMedicalRecords = async () => {
    try {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setRecords(mockMedicalRecords);
      setFilteredRecords(mockMedicalRecords);
    } catch (err) {
      setError('Erro ao buscar prontuários médicos. Por favor, tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = useCallback(() => {
    const filtered = records.filter(record =>
      record.patientName.toLowerCase().includes(patientName.toLowerCase()) ||
      record.patientCPF.includes(patientCPF)
    );
    setFilteredRecords(filtered);
    setShowDescriptions(patientName.length > 0 || patientCPF.length > 0);
  }, [records, patientName, patientCPF]);

  const debouncedHandleFilter = useMemo(
    () => debounce(handleFilter, 300),
    [handleFilter]
  );

  useEffect(() => {
    debouncedHandleFilter();
    return () => {
      debouncedHandleFilter.cancel();
    };
  }, [debouncedHandleFilter]);

  const handleSort = (field: keyof MedicalRecord) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    const sorted = [...filteredRecords].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === "asc" ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredRecords(sorted);
  };

  const handleEdit = (record: MedicalRecord) => {
    setEditingRecord(record);
  };

  const handleSave = (updatedRecord: MedicalRecord) => {
    const updatedRecords = records.map(record =>
      record.id === updatedRecord.id ? { ...updatedRecord, updatedAt: new Date().toISOString() } : record
    );
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setEditingRecord(null);
  };

  const handleCancel = () => {
    setEditingRecord(null);
  };

  const isEditable = (record: MedicalRecord) => {
    const now = new Date();
    const createdAt = new Date(record.createdAt);
    return now.getTime() - createdAt.getTime() <= 24 * 60 * 60 * 1000;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRecord) {
      setEditingRecord(prev => prev ? { ...prev, [name]: value } as MedicalRecord : null);
    }

    if (name === 'doctorName') {
      // Simulating doctor name suggestions
      const suggestions = ['Dr. Silva', 'Dr. Santos', 'Dr. Oliveira', 'Dr. Rodrigues', 'Dr. Ferreira']
        .filter(doctor => doctor.toLowerCase().includes(value.toLowerCase()));
      setDoctorSuggestions(suggestions);
    }
  };

  const handleTreatmentPlanChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRecord) {
      setEditingRecord(prev => prev ? {
        ...prev,
        treatmentPlan: {
          ...prev.treatmentPlan,
          [name]: name === "medications" ? (value as string).split(", ") : value,
        },
      } as MedicalRecord : null);
    }
  };

  const handleSaveEdit = () => {
    if (!editingRecord) return;
    if (editingRecord.notes.trim() === '') {
      alert('O campo de observações é obrigatório.');
      return;
    }
    handleSave(editingRecord);
  };

  const handleAddNewRecord = () => {
    setShowAddForm(true);
  };

  const handleSaveNewRecord = (patient: Patient) => {
    const newRecord: MedicalRecord = {
      id: (records.length + 1).toString(),
      patientName: patient.name,
      patientCPF: patient.cpf,
      dateOfBirth: patient.dateOfBirth,
      email: patient.email,
      phone: patient.contactPhone,
      doctorName: '',
      diagnosis: '',
      treatmentPlan: {
        description: '',
        medications: [],
      },
      notes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setRecords([...records, newRecord]);
    setFilteredRecords([...filteredRecords, newRecord]);
    setShowAddForm(false);
  };

  const handleCancelAddRecord = () => {
    setShowAddForm(false);
  };

  if (loading) return <S.LoadingMessage>Carregando prontuários médicos...</S.LoadingMessage>;
  if (error) return <S.GlobalErrorMessage>{error}</S.GlobalErrorMessage>;

  if (showAddForm) {
    return (
      <AddMedicalRecord
        onSave={handleSaveNewRecord}
        onCancel={handleCancelAddRecord}
        existingPatients={records.map(record => ({
          cpf: record.patientCPF,
          name: record.patientName,
          dateOfBirth: record.dateOfBirth,
          contactPhone: record.phone,
          familyPhone: '',
          email: record.email,
        }))}
      />
    );
  }

  return (
    <S.Container>
      <S.Header>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <S.Title>Prontuários Médicos</S.Title>
          <S.NewPatientButton onClick={handleAddNewRecord}>
            + Novo Prontuário
          </S.NewPatientButton>
        </div>
        <S.FilterContainer>
          <S.InputGroup>
            <S.Label>Nome do Paciente:</S.Label>
            <S.Input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Digite o nome do paciente"
            />
          </S.InputGroup>
          <S.InputGroup>
            <S.Label>CPF do Paciente:</S.Label>
            <S.Input
              type="text"
              value={patientCPF}
              onChange={(e) => setPatientCPF(e.target.value)}
              placeholder="Digite o CPF do paciente"
            />
          </S.InputGroup>
        </S.FilterContainer>
      </S.Header>
      {editingRecord && (
        <S.EditForm>
          <S.FormTitle>Editar Prontuário</S.FormTitle>
          <S.FormGroup>
            <S.Label>Nome do Paciente:</S.Label>
            <S.Input type="text" value={editingRecord.patientName} readOnly />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>CPF:</S.Label>
            <S.Input type="text" value={editingRecord.patientCPF} readOnly />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Data de Nascimento:</S.Label>
            <S.Input type="text" value={editingRecord.dateOfBirth} readOnly />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Data de Criação:</S.Label>
            <S.Input type="text" value={new Date(editingRecord.createdAt).toLocaleString()} readOnly />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Data de Atualização:</S.Label>
            <S.Input type="text" value={new Date(editingRecord.updatedAt).toLocaleString()} readOnly />
          </S.FormGroup>

          <S.FormGroup>
            <S.Label>Nome do Médico:</S.Label>
            <S.Input
              type="text"
              name="doctorName"
              value={editingRecord.doctorName}
              onChange={handleInputChange}
            />
            {doctorSuggestions.length > 0 && (
              <S.Suggestions>
                {doctorSuggestions.map((suggestion, index) => (
                  <S.SuggestionItem
                    key={index}
                    onClick={() => {
                      setEditingRecord(prev => prev ? { ...prev, doctorName: suggestion } as MedicalRecord : null);
                      setDoctorSuggestions([]);
                    }}
                  >
                    {suggestion}
                  </S.SuggestionItem>
                ))}
              </S.Suggestions>
            )}
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Diagnóstico:</S.Label>
            <S.Input
              type="text"
              name="diagnosis"
              value={editingRecord.diagnosis}
              onChange={handleInputChange}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Plano de Tratamento:</S.Label>
            <S.TextArea
              name="description"
              value={editingRecord.treatmentPlan.description}
              onChange={handleTreatmentPlanChange}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Medicamentos:</S.Label>
            <S.Input
              type="text"
              name="medications"
              value={editingRecord.treatmentPlan.medications.join(", ")}
              onChange={(e) => {
                const medicationsArray = e.target.value.split(", ");
                if (editingRecord) {
                  setEditingRecord(prev =>
                    prev ? {
                      ...prev,
                      treatmentPlan: {
                        ...prev.treatmentPlan,
                        medications: medicationsArray,
                      },
                    } : null
                  );
                }
              }}
            />
          </S.FormGroup>
          <S.FormGroup>
            <S.Label>Observações (obrigatório):</S.Label>
            <S.TextArea
              name="notes"
              value={editingRecord.notes}
              onChange={handleInputChange}
              required
            />
          </S.FormGroup>
          <S.ButtonGroup>
            <S.SaveButton onClick={handleSaveEdit}>Salvar</S.SaveButton>
            <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
          </S.ButtonGroup>
        </S.EditForm>
      )}
      <S.Table>
        {showDescriptions ? (
          <>
            <S.TableHeader>
              <S.TableRow>
                <S.TableHeaderCell>Nome do Paciente</S.TableHeaderCell>
                <S.TableHeaderCell>CPF</S.TableHeaderCell>
                <S.TableHeaderCell>Data de Nascimento</S.TableHeaderCell>
                <S.TableHeaderCell>Email</S.TableHeaderCell>
                <S.TableHeaderCell>Telefone</S.TableHeaderCell>
                <S.TableHeaderCell>Nome do Médico</S.TableHeaderCell>
                <S.TableHeaderCell>Diagnóstico</S.TableHeaderCell>
                <S.TableHeaderCell>Plano de Tratamento</S.TableHeaderCell>
                <S.TableHeaderCell>Observações</S.TableHeaderCell>
                <S.TableHeaderCell>Data de Criação</S.TableHeaderCell>
                <S.TableHeaderCell>Data de Atualização</S.TableHeaderCell>
                <S.TableHeaderCell>Ações</S.TableHeaderCell>
              </S.TableRow>
            </S.TableHeader>
            <S.TableBody>
              {filteredRecords.map((record) => (
                <S.TableRow key={record.id}>
                  <S.TableCell>{record.patientName}</S.TableCell>
                  <S.TableCell>{record.patientCPF}</S.TableCell>
                  <S.TableCell>{record.dateOfBirth}</S.TableCell>
                  <S.TableCell>{record.email}</S.TableCell>
                  <S.TableCell>{record.phone}</S.TableCell>
                  <S.TableCell>{record.doctorName}</S.TableCell>
                  <S.TableCell>{record.diagnosis}</S.TableCell>
                  <S.TableCell>
                    {record.treatmentPlan.description}
                    <br />
                    Medicamentos: {record.treatmentPlan.medications.join(", ")}
                  </S.TableCell>
                  <S.TableCell>{record.notes}</S.TableCell>
                  <S.TableCell>{new Date(record.createdAt).toLocaleString()}</S.TableCell>
                  <S.TableCell>{new Date(record.updatedAt).toLocaleString()}</S.TableCell>
                  <S.TableCell>
                    {isEditable(record) && (
                      <S.EditButton onClick={() => handleEdit(record)}>Editar</S.EditButton>
                    )}
                  </S.TableCell>
                </S.TableRow>
              ))}
            </S.TableBody>
          </>
        ) : (
          <S.TableBody>
            <S.TableRow>
              <S.TableCell colSpan={12}>
              </S.TableCell>
            </S.TableRow>
          </S.TableBody>
        )}
        {showDescriptions && filteredRecords.length === 0 && (
          <S.TableBody>
            <S.TableRow>
              <S.TableCell colSpan={12}>
                Nenhum prontuário encontrado para os critérios de pesquisa.
              </S.TableCell>
            </S.TableRow>
          </S.TableBody>
        )}
      </S.Table>
    </S.Container>
  );
};

export default CreateViewingRecords;

