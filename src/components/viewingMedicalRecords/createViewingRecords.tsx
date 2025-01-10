"use client";
import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as S from "./styles";
import AddMedicalRecord from "../addMedicalRecord/addMedicalRecord";
import { ChevronLeft, ChevronRight } from 'lucide-react';

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
  familyPhone: string;
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
const generateMockRecords = (): MedicalRecord[] => {
  const records: MedicalRecord[] = [];
  const now = new Date();
  const twentyFourHoursAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);

  for (let i = 0; i < 1200; i++) {
    // Make first 5 records from today (less than 24h old)
    const isRecent = i < 5;
    const createdAt = isRecent
      ? new Date(now.getTime() - Math.random() * 12 * 60 * 60 * 1000) // Random time within last 12 hours
      : new Date(now.getTime() - (24 * 60 * 60 * 1000 * (1 + Math.random() * 30))); // Random time between 24h and 30 days ago
    
    records.push({
      id: `${i + 1}`,
      patientName: `Patient ${i + 1}`,
      patientCPF: `${Math.floor(100000000 + Math.random() * 900000000)}-${Math.floor(10 + Math.random() * 90)}`,
      dateOfBirth: `${1950 + Math.floor(Math.random() * 50)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      email: `patient${i + 1}@example.com`,
      phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      familyPhone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      doctorName: `Dr. ${['Silva', 'Santos', 'Oliveira', 'Rodrigues', 'Ferreira'][Math.floor(Math.random() * 5)]}`,
      diagnosis: ['Hipertensão', 'Diabetes Tipo 2', 'Artrite Reumatoide', 'Asma', 'Depressão'][Math.floor(Math.random() * 5)],
      treatmentPlan: {
        description: isRecent ? 'Novo paciente - Em avaliação' : 'Tratamento em andamento',
        medications: ['Medicamento A', 'Medicamento B'],
      },
      notes: isRecent ? 'Primeira consulta realizada hoje' : 'Paciente em acompanhamento regular',
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString(), // Initially same as created
    });
  }

  return records;
};

const mockMedicalRecords = generateMockRecords();

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
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false); // Added state for editing
  const recordsPerPage = 10;

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
    setCurrentPage(1);
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
    setIsEditing(true); // Set isEditing to true when editing starts
  };

  const handleSave = (updatedRecord: MedicalRecord) => {
    const updatedRecords = records.map(record =>
      record.id === updatedRecord.id ? { ...updatedRecord, updatedAt: new Date().toISOString() } : record
    );
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setEditingRecord(null);
    setIsEditing(false); // Set isEditing to false after saving
  };

  const handleCancel = () => {
    setEditingRecord(null);
    setIsEditing(false); // Set isEditing to false after canceling
  };

  const isEditable = (record: MedicalRecord) => {
    const now = new Date();
    const createdAt = new Date(record.createdAt);
    const timeDiff = now.getTime() - createdAt.getTime();
    const hoursDiff = timeDiff / (1000 * 60 * 60);
    return hoursDiff <= 24;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (editingRecord) {
      setEditingRecord(prev => prev ? { ...prev, [name]: value } as MedicalRecord : null);
    }

    if (name === 'doctorName') {
      const suggestions = ['Dr. Silva', 'Dr. Santos', 'Dr. Oliveira', 'Dr. Rodrigues', 'Dr. Ferreira']
        .filter(doctor => doctor.toLowerCase().includes(value.toLowerCase()));
      setDoctorSuggestions(suggestions);
    }
  };

  const handleDoctorSelect = (doctor: string) => {
    if (editingRecord) {
      setEditingRecord(prev => prev ? { ...prev, doctorName: doctor } as MedicalRecord : null);
    }
    setDoctorSuggestions([]);
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
      familyPhone: patient.familyPhone,
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

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(indexOfFirstRecord, indexOfLastRecord);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);  // Scroll to top when changing pages
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
          familyPhone: record.familyPhone,
          email: record.email,
        }))}
      />
    );
  }

  return (
    <S.Container>
      <S.FormWrapper $isExpanded={patientName.length > 0 || patientCPF.length > 0}>
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
        {isEditing && editingRecord && (
          <S.EditFormContainer>
            <S.FormTitle>Editar Prontuário</S.FormTitle>
            <S.EditFormGrid>
              <S.FormColumn>
                <S.FormGroup>
                  <S.FormLabel>Nome do Paciente:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={editingRecord.patientName} readOnly />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>CPF:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={editingRecord.patientCPF} readOnly />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Data de Nascimento:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={editingRecord.dateOfBirth} readOnly />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Telefone:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={editingRecord.phone} readOnly />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Telefone Familiar:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={editingRecord.familyPhone} readOnly />
                </S.FormGroup>
              </S.FormColumn>
              <S.FormColumn>
                <S.FormGroup>
                  <S.FormLabel>Nome do Médico:</S.FormLabel>
                  <S.DoctorInputWrapper>
                    <S.Input
                      type="text"
                      name="doctorName"
                      value={editingRecord.doctorName}
                      onChange={handleInputChange}
                      placeholder="Digite o nome do médico"
                    />
                    {doctorSuggestions.length > 0 && (
                      <S.DoctorSuggestions>
                        {doctorSuggestions.map((doctor, index) => (
                          <S.DoctorSuggestionItem
                            key={index}
                            onClick={() => handleDoctorSelect(doctor)}
                          >
                            {doctor}
                          </S.DoctorSuggestionItem>
                        ))}
                      </S.DoctorSuggestions>
                    )}
                  </S.DoctorInputWrapper>
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Diagnóstico:</S.FormLabel>
                  <S.Input
                    type="text"
                    name="diagnosis"
                    value={editingRecord.diagnosis}
                    onChange={handleInputChange}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Medicamentos:</S.FormLabel>
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
                  <S.FormLabel>Plano de Tratamento:</S.FormLabel>
                  <S.TextArea
                    name="description"
                    value={editingRecord.treatmentPlan.description}
                    onChange={handleTreatmentPlanChange}
                    rows={3}
                  />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Observações (obrigatório):</S.FormLabel>
                  <S.TextArea
                    name="notes"
                    value={editingRecord.notes}
                    onChange={handleInputChange}
                    required
                    rows={3}
                  />
                </S.FormGroup>
              </S.FormColumn>
            </S.EditFormGrid>
            <S.FormFooter>
              <S.FormGroup>
                <S.FormLabel>Data de Criação:</S.FormLabel>
                <S.ReadOnlyInput type="text" value={new Date(editingRecord.createdAt).toLocaleString()} readOnly />
              </S.FormGroup>
              <S.FormGroup>
                <S.FormLabel>Data de Atualização:</S.FormLabel>
                <S.ReadOnlyInput type="text" value={new Date(editingRecord.updatedAt).toLocaleString()} readOnly />
              </S.FormGroup>
              <S.ButtonGroup>
                <S.SaveButton onClick={handleSaveEdit}>Salvar</S.SaveButton>
                <S.CancelButton onClick={handleCancel}>Cancelar</S.CancelButton>
              </S.ButtonGroup>
            </S.FormFooter>
          </S.EditFormContainer>
        )}
        {!isEditing && (
          <S.TableWrapper $showDescriptions={showDescriptions}>
            {showDescriptions ? (
              <S.Table>
                <S.TableHeader>
                  <S.TableRow>
                    <S.TableHeaderCell>Nome</S.TableHeaderCell>
                    <S.TableHeaderCell>CPF</S.TableHeaderCell>
                    <S.TableHeaderCell>Nasc.</S.TableHeaderCell>
                    <S.TableHeaderCell>Email</S.TableHeaderCell>
                    <S.TableHeaderCell>Tel.</S.TableHeaderCell>
                    <S.TableHeaderCell>Tel. Familiar</S.TableHeaderCell>
                    <S.TableHeaderCell>Médico</S.TableHeaderCell>
                    <S.TableHeaderCell>Diag.</S.TableHeaderCell>
                    <S.TableHeaderCell>Trat.</S.TableHeaderCell>
                    <S.TableHeaderCell>Obs.</S.TableHeaderCell>
                    <S.TableHeaderCell>Criação</S.TableHeaderCell>
                    <S.TableHeaderCell>Atual.</S.TableHeaderCell>
                    <S.TableHeaderCell>Ações</S.TableHeaderCell>
                  </S.TableRow>
                </S.TableHeader>
                <S.TableBody>
                  {currentRecords.map((record) => (
                    <S.TableRow key={record.id}>
                      <S.TableCell>{record.patientName}</S.TableCell>
                      <S.TableCell>{record.patientCPF}</S.TableCell>
                      <S.TableCell>{new Date(record.dateOfBirth).toLocaleDateString()}</S.TableCell>
                      <S.TableCell>{record.email}</S.TableCell>
                      <S.TableCell>{record.phone}</S.TableCell>
                      <S.TableCell>{record.familyPhone}</S.TableCell>
                      <S.TableCell>{record.doctorName}</S.TableCell>
                      <S.TableCell>
                        <S.TooltipContainer>
                          <S.TruncatedText>{record.diagnosis}</S.TruncatedText>
                          <S.Tooltip>{record.diagnosis}</S.Tooltip>
                        </S.TooltipContainer>
                      </S.TableCell>
                      <S.TableCell>
                        <S.TooltipContainer>
                          <S.TreatmentCell>
                            {record.treatmentPlan.description}
                            <br />
                            Med: {record.treatmentPlan.medications.join(", ")}
                          </S.TreatmentCell>
                          <S.Tooltip>
                            {record.treatmentPlan.description}
                            <br />
                            Medicamentos: {record.treatmentPlan.medications.join(", ")}
                          </S.Tooltip>
                        </S.TooltipContainer>
                      </S.TableCell>
                      <S.TableCell>
                        <S.TooltipContainer>
                          <S.NotesCell>{record.notes}</S.NotesCell>
                          <S.Tooltip>{record.notes}</S.Tooltip>
                        </S.TooltipContainer>
                      </S.TableCell>
                      <S.TableCell>{new Date(record.createdAt).toLocaleDateString()}</S.TableCell>
                      <S.TableCell>{new Date(record.updatedAt).toLocaleDateString()}</S.TableCell>
                      <S.TableCell>
                        <S.EditButton onClick={() => handleEdit(record)}>
                          Editar
                        </S.EditButton>
                      </S.TableCell>
                    </S.TableRow>
                  ))}
                </S.TableBody>
              </S.Table>
            ) : (
              <S.EmptyTable />
            )}
          </S.TableWrapper>
        )}
        {showDescriptions && !isEditing && (
          <S.PaginationContainer>
            <S.PaginationButton
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              <ChevronLeft />
            </S.PaginationButton>
            {[...Array(Math.min(5, Math.ceil(filteredRecords.length / recordsPerPage)))].map((_, i) => (
              <S.PaginationButton
                key={i}
                onClick={() => paginate(i + 1)}
                disabled={currentPage === i + 1}
              >
                {i + 1}
              </S.PaginationButton>
            ))}
            {Math.ceil(filteredRecords.length / recordsPerPage) > 5 && (
              <S.PaginationEllipsis>...</S.PaginationEllipsis>
            )}
            {Math.ceil(filteredRecords.length / recordsPerPage) > 5 && (
              <S.PaginationButton
                onClick={() => paginate(Math.ceil(filteredRecords.length / recordsPerPage))}
                disabled={currentPage === Math.ceil(filteredRecords.length / recordsPerPage)}
              >
                {Math.ceil(filteredRecords.length / recordsPerPage)}
              </S.PaginationButton>
            )}
            <S.PaginationButton
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === Math.ceil(filteredRecords.length / recordsPerPage)}
            >
              <ChevronRight />
            </S.PaginationButton>
          </S.PaginationContainer>
        )}
      </S.FormWrapper>
    </S.Container>
  );
};

export default MedicalRecords;

