"use client";
import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import * as S from "./styles";
import AddMedicalRecord from "../../addMedicalRecord/addMedicalRecord";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LaboratoryModule from '../../laboratoryModule/laboratoryModule';
import CreateNewAppointmentButton from "../button-create-appointment/createAppointmentButton";

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
  doctorSignature?: string;
}

interface Patient {
  cpf: string;
  name: string;
  dateOfBirth: string;
  contactPhone: string;
  familyPhone: string;
  email: string;
}


const generateMockRecords = (): MedicalRecord[] => {
  const records: MedicalRecord[] = [];
  const now = new Date();

  const firstNames = ['Carlos', 'Maria', 'João', 'Ana', 'Pedro', 'Luisa', 'Fernando', 'Mariana', 'Ricardo', 'Camila', 'José', 'Beatriz', 'Antônio', 'Isabela', 'Francisco', 'Laura', 'Paulo', 'Juliana', 'Lucas', 'Fernanda'];
  const lastNames = ['Silva', 'Santos', 'Oliveira', 'Pereira', 'Ferreira', 'Rodrigues', 'Almeida', 'Costa', 'Carvalho', 'Gomes', 'Martins', 'Araújo', 'Melo', 'Barbosa', 'Sousa', 'Ribeiro', 'Alves', 'Monteiro', 'Mendes', 'Cardoso'];

  for (let i = 0; i < 1200; i++) {
    const isRecent = i < 5;
    const createdAt = isRecent
      ? new Date(now.getTime() - Math.random() * 12 * 60 * 60 * 1000)
      : new Date(now.getTime() - (24 * 60 * 60 * 1000 * (1 + Math.random() * 30)));

    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName1 = lastNames[Math.floor(Math.random() * lastNames.length)];
    const lastName2 = lastNames[Math.floor(Math.random() * lastNames.length)];
    const fullName = `${firstName} ${lastName1} ${lastName2}`;

    records.push({
      id: `${i + 1}`,
      patientName: fullName,
      patientCPF: `${Math.floor(100000000 + Math.random() * 900000000)}-${Math.floor(10 + Math.random() * 90)}`,
      dateOfBirth: `${1950 + Math.floor(Math.random() * 50)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      email: `${firstName.toLowerCase()}.${lastName1.toLowerCase()}@example.com`,
      phone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      familyPhone: `(${Math.floor(Math.random() * 90) + 10}) 9${Math.floor(Math.random() * 9000) + 1000}-${Math.floor(Math.random() * 9000) + 1000}`,
      doctorName: `Dr. ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      diagnosis: ['Hipertensão', 'Diabetes Tipo 2', 'Artrite Reumatoide', 'Asma', 'Depressão'][Math.floor(Math.random() * 5)],
      treatmentPlan: {
        description: isRecent ? 'Novo paciente - Em avaliação' : 'Tratamento em andamento',
        medications: ['Medicamento A', 'Medicamento B'],
      },
      notes: isRecent ? 'Primeira consulta realizada hoje' : 'Paciente em acompanhamento regular',
      createdAt: createdAt.toISOString(),
      updatedAt: createdAt.toISOString(),
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
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const recordsPerPage = 10;
  const [signature, setSignature] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

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
    const searchTerm = (patientName + patientCPF).toLowerCase();
    const filtered = records.filter(record =>
      record.patientName.toLowerCase().includes(searchTerm) ||
      record.patientCPF.includes(searchTerm) ||
      record.email.toLowerCase().includes(searchTerm) ||
      record.phone.includes(searchTerm) ||
      record.familyPhone.includes(searchTerm) ||
      record.doctorName.toLowerCase().includes(searchTerm)
    );
    setFilteredRecords(filtered);
    setShowDescriptions(searchTerm.length > 0);
    setCurrentPage(1);
  }, [records, patientName, patientCPF]);

  const debouncedHandleFilter = useMemo(
    () => debounce(handleFilter, 300),
    [handleFilter]
  );

  useEffect(() => {
    if (patientName.length > 0 || patientCPF.length > 0) {
      handleFilter();
    } else {
      setFilteredRecords([]);
      setShowDescriptions(false);
    }
  }, [handleFilter, patientName, patientCPF]);

  const handleSort = (field: keyof MedicalRecord) => {
    setSortField(field);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    const sorted = [...filteredRecords].sort((a, b) => {

      return 0;
    });
    setFilteredRecords(sorted);
  };

  const handleEdit = (record: MedicalRecord) => {
    setEditingRecord(record);
    setIsEditing(true);
  };

  const handleSave = (updatedRecord: MedicalRecord) => {
    const updatedRecords = records.map(record =>
      record.id === updatedRecord.id ? { ...updatedRecord, updatedAt: new Date().toISOString() } : record
    );
    setRecords(updatedRecords);
    setFilteredRecords(updatedRecords);
    setEditingRecord(null);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditingRecord(null);
    setIsEditing(false);
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
    if (!signature) {
      alert('A assinatura do médico é obrigatória.');
      return;
    }
    handleSave({ ...editingRecord, doctorSignature: signature });
    setSignature(null);
  };

  const handleAddNewRecord = (patient?: Patient) => {
    setSelectedPatient(patient || null);
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
    window.scrollTo(0, 0);
  };

  const MobileRecordCard: React.FC<{ record: MedicalRecord }> = ({ record }) => (
    <S.MobileCard>
      <S.MobileCardHeader>
        <S.MobileCardTitle onClick={() => handleAddNewRecord({
          cpf: record.patientCPF,
          name: record.patientName,
          dateOfBirth: record.dateOfBirth,
          contactPhone: record.phone,
          familyPhone: record.familyPhone,
          email: record.email,
        })}>
          {record.patientName}
        </S.MobileCardTitle>
        <S.MobileCardSubtitle>CPF/SSID: {record.patientCPF}</S.MobileCardSubtitle>
      </S.MobileCardHeader>
      <S.MobileCardContent>
        <S.MobileCardItem>
          <S.MobileCardLabel>Date of Birth:</S.MobileCardLabel>
          <S.MobileCardValue>{new Date(record.dateOfBirth).toLocaleDateString()}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Email:</S.MobileCardLabel>
          <S.MobileCardValue>{record.email}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Telephone:</S.MobileCardLabel>
          <S.MobileCardValue>{record.phone}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Family Telephone:</S.MobileCardLabel>
          <S.MobileCardValue>{record.familyPhone}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Doctor:</S.MobileCardLabel>
          <S.MobileCardValue>{record.doctorName}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Diagnosis:</S.MobileCardLabel>
          <S.MobileCardValue>{record.diagnosis}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Treatmentt Plan:</S.MobileCardLabel>
          <S.MobileCardValue>{record.treatmentPlan.description}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Medications:</S.MobileCardLabel>
          <S.MobileCardValue>{record.treatmentPlan.medications.join(", ")}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Notes:</S.MobileCardLabel>
          <S.MobileCardValue>{record.notes}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Creation Date:</S.MobileCardLabel>
          <S.MobileCardValue>{new Date(record.createdAt).toLocaleString()}</S.MobileCardValue>
        </S.MobileCardItem>
        <S.MobileCardItem>
          <S.MobileCardLabel>Last Update:</S.MobileCardLabel>
          <S.MobileCardValue>{new Date(record.updatedAt).toLocaleString()}</S.MobileCardValue>
        </S.MobileCardItem>
      </S.MobileCardContent>
      <S.MobileCardFooter>
        <S.EditButton onClick={() => handleEdit(record)} disabled={!isEditable(record)}>
          {isEditable(record) ? 'Edit' : 'Not editable'}
        </S.EditButton>
      </S.MobileCardFooter>
    </S.MobileCard>
  );

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
        ctx.beginPath();
        ctx.moveTo(x, y);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const rect = canvas.getBoundingClientRect();
        const x = ('touches' in e ? e.touches[0].clientX : e.clientX) - rect.left;
        const y = ('touches' in e ? e.touches[0].clientY : e.clientY) - rect.top;
        ctx.lineTo(x, y);
        ctx.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    setSignature(null);
  };

  const saveSignature = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const dataUrl = canvas.toDataURL();
      setSignature(dataUrl);
    }
  };

  if (loading) return <S.LoadingMessage>Loading medical records...</S.LoadingMessage>;
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
        selectedPatient={selectedPatient}
      />
    );
  }

  return (
    <S.Container>
      <div style={{ display: 'flex', width: '100%' }}>
        <S.FormWrapper $isExpanded={patientName.length > 0 || patientCPF.length > 0}>
          <S.Header>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <S.Title>Medical Records</S.Title>

            </div>
            <S.FilterContainer>
              <S.InputGroup>
                <S.Label>Paciente Name:</S.Label>
                <S.Input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="Enter patient name"
                />
              </S.InputGroup>
              <S.InputGroup>
                <S.Label>Pacient CPF/SSN:</S.Label>
                <S.Input
                  type="text"
                  value={patientCPF}
                  onChange={(e) => setPatientCPF(e.target.value)}
                  placeholder="Enter the patient's CPF or SSN"
                />
              </S.InputGroup>
            </S.FilterContainer>
          </S.Header>
          {isEditing && editingRecord && (
            <S.EditFormContainer>
              <S.FormTitle>Edit Medical Record</S.FormTitle>
              <S.EditFormGrid>
                <S.FormColumn>
                  <S.FormGroup>
                    <S.FormLabel>Patient Name:</S.FormLabel>
                    <S.ReadOnlyInput type="text" value={editingRecord.patientName} readOnly />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>CPF/SSID:</S.FormLabel>
                    <S.ReadOnlyInput type="text" value={editingRecord.patientCPF} readOnly />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Date of Birth:</S.FormLabel>
                    <S.ReadOnlyInput type="text" value={editingRecord.dateOfBirth} readOnly />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Telephone:</S.FormLabel>
                    <S.ReadOnlyInput type="text" value={editingRecord.phone} readOnly />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Family Telephone:</S.FormLabel>
                    <S.ReadOnlyInput type="text" value={editingRecord.familyPhone} readOnly />
                  </S.FormGroup>
                </S.FormColumn>
                <S.FormColumn>
                  <S.FormGroup>
                    <S.FormLabel>Doctor Name:</S.FormLabel>
                    <S.DoctorInputWrapper>
                      <S.Input
                        type="text"
                        name="doctorName"
                        value={editingRecord.doctorName}
                        onChange={handleInputChange}
                        placeholder="Enter doctor name"
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
                    <S.FormLabel>Diagnosis:</S.FormLabel>
                    <S.Input
                      type="text"
                      name="diagnosis"
                      value={editingRecord.diagnosis}
                      onChange={handleInputChange}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Medications:</S.FormLabel>
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
                    <S.FormLabel>Treatment Plan:</S.FormLabel>
                    <S.TextArea
                      name="description"
                      value={editingRecord.treatmentPlan.description}
                      onChange={handleTreatmentPlanChange}
                      rows={3}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Notes (optional):</S.FormLabel>
                    <S.TextArea
                      name="notes"
                      value={editingRecord.notes}
                      onChange={handleInputChange}
                      required
                      rows={3}
                    />
                  </S.FormGroup>
                  <S.FormGroup>
                    <S.FormLabel>Doctor Signature :</S.FormLabel>
                    <S.SignatureCanvas
                      ref={canvasRef}
                      width={400}
                      height={200}
                      onMouseDown={startDrawing}
                      onMouseMove={draw}
                      onMouseUp={stopDrawing}
                      onMouseLeave={stopDrawing}
                      onTouchStart={startDrawing}
                      onTouchMove={draw}
                      onTouchEnd={stopDrawing}
                    />
                    <S.SignatureButtonGroup>
                      <S.SignatureButton onClick={clearSignature}>Clear</S.SignatureButton>
                      <S.SignatureButton onClick={saveSignature}>Save</S.SignatureButton>
                    </S.SignatureButtonGroup>
                    {signature && <S.SignatureSaved>Signature saved</S.SignatureSaved>}
                  </S.FormGroup>
                </S.FormColumn>
              </S.EditFormGrid>
              <S.FormFooter>
                <S.FormGroup>
                  <S.FormLabel>Creation Date:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={new Date(editingRecord.createdAt).toLocaleString()} readOnly />
                </S.FormGroup>
                <S.FormGroup>
                  <S.FormLabel>Update Date:</S.FormLabel>
                  <S.ReadOnlyInput type="text" value={new Date(editingRecord.updatedAt).toLocaleString()} readOnly />
                </S.FormGroup>
                <S.ButtonWrapper>
                  <CreateNewAppointmentButton
                    onAddNewAppointment={() => {
                      setShowAddForm(true);
                    }}

                  />
                </S.ButtonWrapper>
                <S.ButtonGroup>
                  <S.SaveButton onClick={handleSaveEdit}>Save</S.SaveButton>
                  <S.CancelButton onClick={handleCancel}>Cancel</S.CancelButton>
                </S.ButtonGroup>
              </S.FormFooter>
            </S.EditFormContainer>
          )}
          {!isEditing && (
            <S.TableWrapper $showDescriptions={showDescriptions}>
              <S.DesktopView>
                {(patientName.length > 0 || patientCPF.length > 0) && (
                  filteredRecords.length > 0 ? (
                    <S.Table>
                      <S.TableHeader>
                        <S.TableRow>
                          <S.TableHeaderCell>Name</S.TableHeaderCell>
                          <S.TableHeaderCell>CPF/SSN</S.TableHeaderCell>
                          <S.TableHeaderCell>Birth.</S.TableHeaderCell>
                          <S.TableHeaderCell>Email</S.TableHeaderCell>
                          <S.TableHeaderCell>Tel.</S.TableHeaderCell>
                          <S.TableHeaderCell>Family Tel.</S.TableHeaderCell>
                          <S.TableHeaderCell>Doctor</S.TableHeaderCell>
                          <S.TableHeaderCell>Diag.</S.TableHeaderCell>
                          <S.TableHeaderCell>Treat.</S.TableHeaderCell>
                          <S.TableHeaderCell>Notes.</S.TableHeaderCell>
                          <S.TableHeaderCell>Creation</S.TableHeaderCell>
                          <S.TableHeaderCell>Update.</S.TableHeaderCell>
                          <S.TableHeaderCell>Actions</S.TableHeaderCell>
                        </S.TableRow>
                      </S.TableHeader>
                      <S.TableBody>
                        {currentRecords.map((record) => (
                          <S.TableRow key={record.id}>
                            <S.ClickableTableCell 
                              onClick={() => handleAddNewRecord({
                                cpf: record.patientCPF,
                                name: record.patientName,
                                dateOfBirth: record.dateOfBirth,
                                contactPhone: record.phone,
                                familyPhone: record.familyPhone,
                                email: record.email,
                              })}
                            >
                              {record.patientName}
                            </S.ClickableTableCell>
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
                                  Doctor: {record.treatmentPlan.medications.join(", ")}
                                </S.TreatmentCell>
                                <S.Tooltip>
                                  {record.treatmentPlan.description}
                                  <br />
                                  Medications: {record.treatmentPlan.medications.join(", ")}
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
                                Edit
                              </S.EditButton>
                            </S.TableCell>
                          </S.TableRow>
                        ))}
                      </S.TableBody>
                    </S.Table>
                  ) : (
                    <S.EmptyMessage>No medical records found.</S.EmptyMessage>
                  )
                )}
              </S.DesktopView>
              <S.MobileView>
                {(patientName.length > 0 || patientCPF.length > 0) && (
                  filteredRecords.length > 0 ? (
                    currentRecords.map((record) => (
                      <MobileRecordCard key={record.id} record={record} />
                    ))
                  ) : (
                    <S.EmptyMessage>No medical records found.</S.EmptyMessage>
                  )
                )}
              </S.MobileView>
            </S.TableWrapper>
          )}

        </S.FormWrapper>
        {(patientName.length > 0 || patientCPF.length > 0) && (
          <LaboratoryModule
            patientId={editingRecord?.id}
            onUpload={async (file, type) => {
              
              console.log('Uploading file:', file, 'type:', type);
            }}
          />
        )}
      </div>
    </S.Container>
  );
};

export default MedicalRecords;

